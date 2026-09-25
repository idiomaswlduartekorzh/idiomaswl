import { ENGLISH_DIAGNOSTIC_BLUEPRINT } from '../../lib/diagnostic/blueprint.ts';
import { DIAGNOSTIC_ENGINE_VERSION } from '../../lib/diagnostic/delivery.ts';
import type { DiagnosticWritingPrompt } from '../../lib/diagnostic/writing.ts';
import type { DiagnosticObjectiveSkill } from '../../lib/diagnostic/types.ts';
import {
  buildDiagnosticCompositeResult,
  ENGLISH_PILOT_CALIBRATION,
  estimateObjectiveSkillEvidence,
  type DiagnosticObjectiveObservation,
} from './measurement.ts';
import type { DiagnosticBankRecord } from './types.ts';
import {
  consolidateWritingEvidence,
  type DiagnosticAutomatedWritingEvaluation,
  type DiagnosticHumanWritingEvaluation,
  validateDiagnosticWritingEvaluation,
} from './writing.ts';

export interface DiagnosticScoringAttempt {
  id: string;
  userId: string;
  version: number;
  status: string;
  bankVersion: string;
  blueprintVersion: string;
  engineVersion: string;
}

export interface PersistDiagnosticFinalizationInput {
  attempt: DiagnosticScoringAttempt;
  automated: DiagnosticAutomatedWritingEvaluation;
  human: DiagnosticHumanWritingEvaluation;
  finalEvidence: {
    writing: ReturnType<typeof consolidateWritingEvidence>;
    adjudicatedEvaluation: DiagnosticHumanWritingEvaluation | null;
  };
  resultProfile: ReturnType<typeof buildDiagnosticCompositeResult>;
}

export async function finalizeEnglishDiagnostic(input: {
  authenticatedAdminId: string;
  attempt: DiagnosticScoringAttempt;
  prompt: DiagnosticWritingPrompt;
  responseText: string;
  observations: readonly DiagnosticObjectiveObservation[];
  automated: DiagnosticAutomatedWritingEvaluation;
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
  for (const evaluation of [input.automated, input.human, ...(input.adjudicated ? [input.adjudicated] : [])]) {
    const errors = validateDiagnosticWritingEvaluation(evaluation, input.prompt, input.responseText);
    if (errors.length) throw new Error(`invalid diagnostic writing evaluation: ${errors.join('; ')}`);
  }
  const writing = consolidateWritingEvidence({
    automated: input.automated, human: input.human, adjudicated: input.adjudicated,
  });
  if (writing.status === 'not-estimated' || writing.reviewStatus !== 'human-reviewed') {
    throw new Error(writing.reviewStatus === 'awaiting-adjudication'
      ? 'diagnostic writing adjudication required'
      : 'diagnostic writing evidence is not publishable');
  }
  const bankById = new Map(dependencies.objectiveBank.map(record => [record.publicItem.id, record]));
  if (input.observations.length < 1
    || new Set(input.observations.map(observation => observation.itemId)).size !== input.observations.length
    || input.observations.some(observation => !bankById.has(observation.itemId))) {
    throw new Error('diagnostic objective evidence does not match the versioned bank');
  }
  const objectiveSkills: readonly DiagnosticObjectiveSkill[] = ['reading', 'listening', 'grammar', 'vocabulary'];
  const objectiveEvidence = objectiveSkills.map(skill => estimateObjectiveSkillEvidence(
    skill,
    dependencies.objectiveBank,
    input.observations.filter(observation => bankById.get(observation.itemId)?.publicItem.skill === skill),
    ENGLISH_PILOT_CALIBRATION,
  ));
  const resultProfile = buildDiagnosticCompositeResult({
    attemptId: input.attempt.id,
    blueprintVersion: input.attempt.blueprintVersion,
    bankVersion: input.attempt.bankVersion,
    skills: [...objectiveEvidence, writing],
    generatedAt: dependencies.now().toISOString(),
  });
  const persisted = await dependencies.persist({
    attempt: input.attempt,
    automated: input.automated,
    human: input.human,
    finalEvidence: { writing, adjudicatedEvaluation: input.adjudicated ?? null },
    resultProfile,
  });
  return { ...persisted, resultProfile };
}
