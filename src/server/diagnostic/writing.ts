import { createHash } from 'node:crypto';

import {
  DIAGNOSTIC_WRITING_CRITERIA,
  type DiagnosticWritingCriterion,
  type DiagnosticWritingPrompt,
  type DiagnosticWritingPromptRecord,
} from '../../lib/diagnostic/writing.ts';
import { CEFR_LEVELS, type CefrLevel } from '../../lib/diagnostic/types.ts';
import type { DiagnosticSkillEvidence } from '../../lib/diagnostic/types.ts';

export interface DiagnosticWritingCriterionEvaluation {
  criterion: DiagnosticWritingCriterion;
  level: CefrLevel;
  confidence: number;
  evidence: readonly string[];
  rationale: string;
}

export interface DiagnosticAutomatedWritingEvaluation {
  evaluator: 'automated';
  model: string;
  rubricVersion: string;
  promptId: string;
  promptContentVersion: string;
  responseSha256: string;
  criteria: readonly DiagnosticWritingCriterionEvaluation[];
  warnings: readonly string[];
  evaluatedAt: string;
}

export interface DiagnosticHumanWritingEvaluation {
  evaluator: 'human';
  reviewerId: string;
  rubricVersion: string;
  promptId: string;
  promptContentVersion: string;
  responseSha256: string;
  criteria: readonly DiagnosticWritingCriterionEvaluation[];
  decision: 'accept' | 'revise' | 'exclude';
  evaluatedAt: string;
}

export interface DiagnosticWritingAgreement {
  exactAgreement: number;
  meanAbsoluteLevelDifference: number;
  maximumLevelDifference: number;
  requiresAdjudication: boolean;
}

export interface DiagnosticWritingSkillEvidence extends DiagnosticSkillEvidence {
  skill: 'writing';
  reviewStatus: 'awaiting-human' | 'awaiting-adjudication' | 'excluded' | 'human-reviewed';
  agreement?: DiagnosticWritingAgreement;
}

function boundedString(value: unknown, maximum: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maximum;
}

/** Parses evaluator output at a privileged network boundary without trusting its declared shape. */
export function parseDiagnosticWritingEvaluation(
  value: unknown,
  evaluator: 'automated' | 'human',
): DiagnosticAutomatedWritingEvaluation | DiagnosticHumanWritingEvaluation | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const candidate = value as Record<string, unknown>;
  if (candidate.evaluator !== evaluator
    || !boundedString(candidate.rubricVersion, 100)
    || !boundedString(candidate.promptId, 160)
    || !boundedString(candidate.promptContentVersion, 100)
    || typeof candidate.responseSha256 !== 'string'
    || !/^[a-f0-9]{64}$/.test(candidate.responseSha256)
    || !boundedString(candidate.evaluatedAt, 50)
    || Number.isNaN(Date.parse(candidate.evaluatedAt))
    || !Array.isArray(candidate.criteria)
    || candidate.criteria.length !== DIAGNOSTIC_WRITING_CRITERIA.length) return null;
  const criteria: DiagnosticWritingCriterionEvaluation[] = [];
  for (const raw of candidate.criteria) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
    const item = raw as Record<string, unknown>;
    if (!DIAGNOSTIC_WRITING_CRITERIA.includes(item.criterion as DiagnosticWritingCriterion)
      || !CEFR_LEVELS.includes(item.level as CefrLevel)
      || typeof item.confidence !== 'number'
      || !Number.isFinite(item.confidence)
      || item.confidence < 0 || item.confidence > 1
      || !boundedString(item.rationale, 2_400)
      || !Array.isArray(item.evidence)
      || item.evidence.length < 1 || item.evidence.length > 5
      || item.evidence.some(excerpt => !boundedString(excerpt, 500))) return null;
    criteria.push({
      criterion: item.criterion as DiagnosticWritingCriterion,
      level: item.level as CefrLevel,
      confidence: item.confidence,
      evidence: item.evidence as string[],
      rationale: item.rationale,
    });
  }
  const shared = {
    evaluator, rubricVersion: candidate.rubricVersion, promptId: candidate.promptId,
    promptContentVersion: candidate.promptContentVersion, responseSha256: candidate.responseSha256,
    evaluatedAt: candidate.evaluatedAt, criteria,
  } as const;
  if (evaluator === 'automated') {
    if (!boundedString(candidate.model, 160)
      || !Array.isArray(candidate.warnings)
      || candidate.warnings.length > 20
      || candidate.warnings.some(warning => typeof warning !== 'string' || warning.length > 500)) return null;
    return { ...shared, evaluator, model: candidate.model, warnings: candidate.warnings as string[] };
  }
  if (!boundedString(candidate.reviewerId, 160)
    || !['accept', 'revise', 'exclude'].includes(String(candidate.decision))) return null;
  return {
    ...shared, evaluator, reviewerId: candidate.reviewerId,
    decision: candidate.decision as DiagnosticHumanWritingEvaluation['decision'],
  };
}

export function diagnosticWritingResponseSha256(response: string): string {
  return createHash('sha256').update(response.normalize('NFC')).digest('hex');
}

export function validateDiagnosticWritingResponse(prompt: DiagnosticWritingPrompt, response: string): string[] {
  const errors: string[] = [];
  const normalized = response.normalize('NFC').trim();
  const words = normalized ? normalized.split(/\s+/u).length : 0;
  if (words < prompt.minimumWords) errors.push(`writing response requires at least ${prompt.minimumWords} words`);
  if (words > prompt.maximumWords) errors.push(`writing response exceeds ${prompt.maximumWords} words`);
  if (normalized.length > 12_000) errors.push('writing response exceeds the storage limit');
  return errors;
}

function stableRank(seed: string, promptId: string): string {
  return createHash('sha256').update(`${seed}\u0000${promptId}`).digest('hex');
}

export function selectDiagnosticWritingPrompt(
  bank: readonly DiagnosticWritingPromptRecord[],
  language: string,
  level: CefrLevel,
  seed: string,
  excludedPromptIds: ReadonlySet<string> = new Set(),
): DiagnosticWritingPrompt {
  if (!seed) throw new Error('writing prompt selection seed is required');
  const candidates = bank
    .filter(record => record.publicPrompt.language === language
      && record.publicPrompt.levelCandidate === level
      && (record.status === 'pilot' || record.status === 'operational')
      && record.exposure === 'reserved'
      && record.review.status === 'approved'
      && !excludedPromptIds.has(record.publicPrompt.id))
    .sort((a, b) => stableRank(seed, a.publicPrompt.id).localeCompare(stableRank(seed, b.publicPrompt.id)));
  if (!candidates.length) throw new Error(`diagnostic writing bank exhausted for ${language}/${level}`);
  return { ...candidates[0].publicPrompt, instructions: [...candidates[0].publicPrompt.instructions] };
}

export function validateDiagnosticWritingEvaluation(
  evaluation: DiagnosticAutomatedWritingEvaluation | DiagnosticHumanWritingEvaluation,
  prompt: DiagnosticWritingPrompt,
  response: string,
): string[] {
  const errors: string[] = [];
  const expectedHash = diagnosticWritingResponseSha256(response);
  if (evaluation.promptId !== prompt.id || evaluation.promptContentVersion !== prompt.contentVersion) {
    errors.push('evaluation does not match the server-resolved prompt version');
  }
  if (evaluation.responseSha256 !== expectedHash) errors.push('evaluation does not match the submitted writing response');
  if (!evaluation.rubricVersion.trim()) errors.push('rubric version is required');
  const seen = new Set<DiagnosticWritingCriterion>();
  for (const criterion of evaluation.criteria) {
    if (!DIAGNOSTIC_WRITING_CRITERIA.includes(criterion.criterion)) {
      errors.push(`unknown writing criterion: ${criterion.criterion}`);
      continue;
    }
    if (seen.has(criterion.criterion)) errors.push(`duplicate writing criterion: ${criterion.criterion}`);
    seen.add(criterion.criterion);
    if (!CEFR_LEVELS.includes(criterion.level)) errors.push(`${criterion.criterion} has an invalid CEFR level`);
    if (!Number.isFinite(criterion.confidence) || criterion.confidence < 0 || criterion.confidence > 1) {
      errors.push(`${criterion.criterion} confidence must be between 0 and 1`);
    }
    if (!criterion.rationale.trim()) errors.push(`${criterion.criterion} rationale is required`);
    if (criterion.evidence.length < 1 || criterion.evidence.length > 5) {
      errors.push(`${criterion.criterion} must cite between one and five response excerpts`);
    }
    for (const excerpt of criterion.evidence) {
      if (!excerpt.trim() || !response.includes(excerpt)) errors.push(`${criterion.criterion} cites evidence absent from the response`);
    }
  }
  for (const expected of DIAGNOSTIC_WRITING_CRITERIA) {
    if (!seen.has(expected)) errors.push(`missing writing criterion: ${expected}`);
  }
  return errors;
}

export function compareWritingEvaluations(
  automated: DiagnosticAutomatedWritingEvaluation,
  human: DiagnosticHumanWritingEvaluation,
): DiagnosticWritingAgreement {
  if (automated.promptId !== human.promptId
    || automated.promptContentVersion !== human.promptContentVersion
    || automated.responseSha256 !== human.responseSha256
    || automated.rubricVersion !== human.rubricVersion) {
    throw new Error('writing evaluations are not comparable');
  }
  const automatedByCriterion = new Map(automated.criteria.map(item => [item.criterion, item]));
  const differences = human.criteria.map(item => {
    const counterpart = automatedByCriterion.get(item.criterion);
    if (!counterpart) throw new Error(`automated evaluation is missing ${item.criterion}`);
    return Math.abs(CEFR_LEVELS.indexOf(counterpart.level) - CEFR_LEVELS.indexOf(item.level));
  });
  const exact = differences.filter(value => value === 0).length;
  const maximumLevelDifference = Math.max(...differences);
  return {
    exactAgreement: exact / DIAGNOSTIC_WRITING_CRITERIA.length,
    meanAbsoluteLevelDifference: differences.reduce((sum, value) => sum + value, 0) / differences.length,
    maximumLevelDifference,
    requiresAdjudication: human.decision !== 'accept' || maximumLevelDifference >= 2,
  };
}

export function consolidateWritingEvidence(input: {
  automated?: DiagnosticAutomatedWritingEvaluation;
  human?: DiagnosticHumanWritingEvaluation;
  adjudicated?: DiagnosticHumanWritingEvaluation;
}): DiagnosticWritingSkillEvidence {
  const base = { skill: 'writing' as const, decisions: 1, distinctStimuli: 1 };
  if (!input.human) return { ...base, status: 'not-estimated', reviewStatus: 'awaiting-human' };
  if (input.human.decision === 'exclude') return { ...base, status: 'not-estimated', reviewStatus: 'excluded' };
  const agreement = input.automated ? compareWritingEvaluations(input.automated, input.human) : undefined;
  const requiresAdjudication = input.human.decision !== 'accept' || agreement?.requiresAdjudication === true;
  if (requiresAdjudication && !input.adjudicated) {
    return {
      ...base, status: 'not-estimated', reviewStatus: 'awaiting-adjudication',
      ...(agreement ? { agreement } : {}),
    };
  }
  const finalEvaluation = input.adjudicated ?? input.human;
  if (finalEvaluation.decision !== 'accept') {
    return { ...base, status: 'not-estimated', reviewStatus: finalEvaluation.decision === 'exclude' ? 'excluded' : 'awaiting-adjudication', agreement };
  }
  const indexes = finalEvaluation.criteria.map(criterion => CEFR_LEVELS.indexOf(criterion.level)).sort((a, b) => a - b);
  if (indexes.length !== DIAGNOSTIC_WRITING_CRITERIA.length || indexes.some(index => index < 0)) {
    throw new Error('final writing evaluation does not cover the complete rubric');
  }
  const estimatedLevel = CEFR_LEVELS[indexes[Math.floor(indexes.length / 2)]];
  const confidence = Math.min(0.75, finalEvaluation.criteria.reduce((sum, criterion) => sum + criterion.confidence, 0) / indexes.length);
  return {
    ...base,
    status: 'provisional',
    reviewStatus: 'human-reviewed',
    estimatedLevel,
    plausibleRange: [CEFR_LEVELS[indexes[0]], CEFR_LEVELS[indexes[indexes.length - 1]]],
    confidence: Number(confidence.toFixed(3)),
    ...(agreement ? { agreement } : {}),
  };
}
