import { ENGLISH_DIAGNOSTIC_BLUEPRINT } from '../../lib/diagnostic/blueprint.ts';
import { DIAGNOSTIC_ENGINE_VERSION } from '../../lib/diagnostic/delivery.ts';
import type { DiagnosticWritingPrompt } from '../../lib/diagnostic/writing.ts';
import type { DiagnosticObjectiveSkill } from '../../lib/diagnostic/types.ts';
import {
  buildDiagnosticCompositeResult,
  ENGLISH_PILOT_CALIBRATION,
  estimateObjectiveSkillEvidence,
  integrateWritingLanguageUseEvidence,
  type DiagnosticObjectiveObservation,
} from './measurement.ts';
import type { DiagnosticBankRecord } from './types.ts';
import {
  consolidateWritingEvidence,
  type DiagnosticAutomatedWritingEvaluation,
  type DiagnosticHumanWritingEvaluation,
  validateDiagnosticWritingEvaluation,
} from './writing.ts';
import {
  reproduceDiagnosticStoredResponse,
  type DiagnosticStoredResponseEvidence,
} from './scoring.ts';

export interface DiagnosticScoringAttempt {
  id: string;
  userId: string;
  version: number;
  status: string;
  bankVersion: string;
  blueprintVersion: string;
  engineVersion: string;
  resultValidityDays: number;
}

export interface PersistDiagnosticFinalizationInput {
  attempt: DiagnosticScoringAttempt;
  automated: DiagnosticAutomatedWritingEvaluation | null;
  human: DiagnosticHumanWritingEvaluation;
  finalEvidence: {
    writing: ReturnType<typeof consolidateWritingEvidence>;
    languageUse: readonly ReturnType<typeof integrateWritingLanguageUseEvidence>[];
    adjudicatedEvaluation: DiagnosticHumanWritingEvaluation | null;
  };
  resultProfile: ReturnType<typeof buildDiagnosticCompositeResult>;
}

export async function finalizeEnglishDiagnostic(input: {
  authenticatedAdminId: string;
  attempt: DiagnosticScoringAttempt;
  prompt: DiagnosticWritingPrompt;
  responseText: string;
  responses: readonly DiagnosticStoredResponseEvidence[];
  automated?: DiagnosticAutomatedWritingEvaluation;
  human: DiagnosticHumanWritingEvaluation;
  adjudicated?: DiagnosticHumanWritingEvaluation;
}, dependencies: {
  objectiveBank: readonly DiagnosticBankRecord[];
  objectiveBankVersion: string;
  now: () => Date;
  persist: (input: PersistDiagnosticFinalizationInput) => Promise<{ replayed: boolean; version: number }>;
}): Promise<{ replayed: boolean; version: number; resultProfile: ReturnType<typeof buildDiagnosticCompositeResult> }> {
  if (!input.authenticatedAdminId) throw new Error('diagnostic administrator identity is required');
  if (input.attempt.status !== 'scoring') throw new Error('diagnostic attempt is not awaiting scoring');
  if (!Number.isInteger(input.attempt.resultValidityDays)
    || input.attempt.resultValidityDays < 1 || input.attempt.resultValidityDays > 730) {
    throw new Error('diagnostic result validity policy is invalid');
  }
  if (input.attempt.bankVersion !== dependencies.objectiveBankVersion
    || input.attempt.blueprintVersion !== ENGLISH_DIAGNOSTIC_BLUEPRINT.id
    || input.attempt.engineVersion !== DIAGNOSTIC_ENGINE_VERSION) {
    throw new Error('diagnostic version unavailable');
  }
  const reviewerBindingInvalid = input.adjudicated
    ? input.adjudicated.reviewerId !== input.authenticatedAdminId
      || input.adjudicated.reviewerId === input.human.reviewerId
    : input.human.reviewerId !== input.authenticatedAdminId;
  if (reviewerBindingInvalid) {
    throw new Error('diagnostic reviewer identity mismatch');
  }
  for (const evaluation of [...(input.automated ? [input.automated] : []), input.human, ...(input.adjudicated ? [input.adjudicated] : [])]) {
    const errors = validateDiagnosticWritingEvaluation(evaluation, input.prompt, input.responseText);
    if (errors.length) throw new Error(`invalid diagnostic writing evaluation: ${errors.join('; ')}`);
  }
  const writing = consolidateWritingEvidence({
    automated: input.automated, human: input.human, adjudicated: input.adjudicated,
  });
  if (writing.reviewStatus === 'awaiting-adjudication' || writing.reviewStatus === 'awaiting-human') {
    throw new Error('diagnostic writing adjudication required');
  }
  if (writing.reviewStatus !== 'human-reviewed' && writing.reviewStatus !== 'excluded') {
    throw new Error('diagnostic writing evidence is not publishable');
  }
  const bankById = new Map(dependencies.objectiveBank.map(record => [record.publicItem.id, record]));
  if (input.responses.length < 1
    || new Set(input.responses.map(response => response.itemId)).size !== input.responses.length
    || input.responses.some(response => !bankById.has(response.itemId))) {
    throw new Error('diagnostic objective evidence does not match the versioned bank');
  }
  const observations: DiagnosticObjectiveObservation[] = input.responses.map(response => {
    const record = bankById.get(response.itemId);
    if (!record) throw new Error('diagnostic objective evidence does not match the versioned bank');
    const reproduced = reproduceDiagnosticStoredResponse({
      record,
      evidence: response,
      identity: `diagnostic response ${response.itemId}`,
    });
    return { itemId: response.itemId, outcome: reproduced.outcome };
  });
  const objectiveSkills: readonly DiagnosticObjectiveSkill[] = ['reading', 'listening', 'grammar', 'vocabulary'];
  const objectiveEvidence = objectiveSkills.map(skill => estimateObjectiveSkillEvidence(
    skill,
    dependencies.objectiveBank,
    observations.filter(observation => bankById.get(observation.itemId)?.publicItem.skill === skill),
    ENGLISH_PILOT_CALIBRATION,
  ));
  const finalWritingEvaluation = input.adjudicated ?? input.human;
  const integratedObjectiveEvidence = writing.reviewStatus === 'human-reviewed'
    ? objectiveEvidence.map(evidence => evidence.skill === 'grammar' || evidence.skill === 'vocabulary'
      ? integrateWritingLanguageUseEvidence({
        objective: { ...evidence, skill: evidence.skill },
        finalWritingEvaluation,
      })
      : evidence)
    : objectiveEvidence;
  const languageUse = integratedObjectiveEvidence.filter(
    (evidence): evidence is ReturnType<typeof integrateWritingLanguageUseEvidence> =>
      (evidence.skill === 'grammar' || evidence.skill === 'vocabulary')
      && evidence.languageUseIntegration !== undefined,
  );
  const generatedAt = dependencies.now();
  // Historical attempts may still reach this admin-only finalizer. Preserve
  // their human writing evidence in the audit payload, but do not relabel one
  // free response as calibrated evidence for the new closed-task construct.
  const legacyWrittenDiscourseEvidence = {
    skill: 'written-discourse' as const,
    decisions: 1,
    distinctStimuli: 1,
    attempted: 0,
    omitted: 1,
    observedAccuracy: null,
    status: 'not-estimated' as const,
  };
  const resultProfile = buildDiagnosticCompositeResult({
    attemptId: input.attempt.id,
    blueprintVersion: input.attempt.blueprintVersion,
    bankVersion: input.attempt.bankVersion,
    skills: [...integratedObjectiveEvidence, legacyWrittenDiscourseEvidence],
    generatedAt: generatedAt.toISOString(),
    validUntil: new Date(generatedAt.getTime() + input.attempt.resultValidityDays * 24 * 60 * 60 * 1_000).toISOString(),
  });
  const persisted = await dependencies.persist({
    attempt: input.attempt,
    automated: input.automated ?? null,
    human: input.human,
    finalEvidence: { writing, languageUse, adjudicatedEvaluation: input.adjudicated ?? null },
    resultProfile,
  });
  return { ...persisted, resultProfile };
}
