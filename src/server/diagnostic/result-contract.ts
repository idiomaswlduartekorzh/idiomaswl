import {
  CEFR_LEVELS,
  DIAGNOSTIC_SKILLS,
  type CefrLevel,
  type DiagnosticLanguageUseIntegration,
  type DiagnosticObjectiveSkill,
  type DiagnosticSkill,
  type DiagnosticSkillEvidence,
} from '../../lib/diagnostic/types.ts';
import {
  buildDiagnosticCompositeResult,
  type DiagnosticCompositeResult,
  type DiagnosticMeasuredSkillEvidence,
} from './measurement.ts';
import type { DiagnosticWritingAgreement, DiagnosticWritingSkillEvidence } from './writing.ts';

const OBJECTIVE_SKILLS: readonly DiagnosticObjectiveSkill[] = ['reading', 'listening', 'grammar', 'vocabulary'];
const STATUSES = ['not-estimated', 'provisional', 'calibrated'] as const;
const WRITING_REVIEW_STATUSES = ['human-reviewed', 'excluded'] as const;
const WRITING_EXCLUSION_REASONS = [
  'partially-off-task', 'off-task', 'prompt-copy', 'suspected-external-text', 'reviewer-excluded',
] as const;

function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function boundedString(value: unknown, maximum = 200): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maximum;
}

function finiteBetween(value: unknown, minimum: number, maximum: number): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= minimum && value <= maximum;
}

function integerBetween(value: unknown, minimum: number, maximum: number): value is number {
  return Number.isInteger(value) && Number(value) >= minimum && Number(value) <= maximum;
}

function cefr(value: unknown): value is CefrLevel {
  return CEFR_LEVELS.includes(value as CefrLevel);
}

function parseRange(value: unknown): readonly [CefrLevel, CefrLevel] | null {
  if (!Array.isArray(value) || value.length !== 2 || !cefr(value[0]) || !cefr(value[1])) return null;
  if (CEFR_LEVELS.indexOf(value[0]) > CEFR_LEVELS.indexOf(value[1])) return null;
  return [value[0], value[1]];
}

function parseAgreement(value: unknown): DiagnosticWritingAgreement | null {
  const candidate = record(value);
  if (!candidate
    || !finiteBetween(candidate.exactAgreement, 0, 1)
    || !finiteBetween(candidate.meanAbsoluteLevelDifference, 0, 5)
    || !integerBetween(candidate.maximumLevelDifference, 0, 5)
    || typeof candidate.requiresAdjudication !== 'boolean') return null;
  return {
    exactAgreement: candidate.exactAgreement,
    meanAbsoluteLevelDifference: candidate.meanAbsoluteLevelDifference,
    maximumLevelDifference: candidate.maximumLevelDifference,
    requiresAdjudication: candidate.requiresAdjudication,
  };
}

function parseLanguageUseIntegration(
  value: unknown,
  skill: 'grammar' | 'vocabulary',
  decisions: number,
  attempted: number,
): DiagnosticLanguageUseIntegration | null {
  const candidate = record(value);
  const objective = record(candidate?.objective);
  const productive = record(candidate?.productiveWriting);
  if (!candidate || !objective || !productive
    || !boundedString(candidate.policyVersion, 100)
    || !['objective-insufficient', 'corroborated', 'adjacent', 'divergent'].includes(String(candidate.outcome))
    || candidate.automaticLevelShift !== false
    || !STATUSES.includes(objective.status as typeof STATUSES[number])
    || objective.decisions !== decisions || objective.attempted !== attempted
    || productive.criterion !== (skill === 'grammar' ? 'grammar-control' : 'vocabulary-control')
    || !cefr(productive.level)
    || !finiteBetween(productive.confidence, 0, 1)
    || !boundedString(productive.rubricVersion, 100)) return null;
  const objectiveRange = objective.plausibleRange === undefined ? undefined : parseRange(objective.plausibleRange);
  if ((objective.estimatedLevel !== undefined && !cefr(objective.estimatedLevel))
    || (objective.plausibleRange !== undefined && !objectiveRange)
    || (objective.confidence !== undefined && !finiteBetween(objective.confidence, 0, 1))
    || (candidate.levelDifference !== undefined && !integerBetween(candidate.levelDifference, 0, 5))) return null;
  const outcome = candidate.outcome as DiagnosticLanguageUseIntegration['outcome'];
  if (outcome === 'objective-insufficient') {
    if (objective.status !== 'not-estimated'
      || objective.estimatedLevel !== undefined
      || objectiveRange
      || objective.confidence !== undefined
      || candidate.levelDifference !== undefined) return null;
  } else {
    if (objective.status === 'not-estimated'
      || !cefr(objective.estimatedLevel)
      || !objectiveRange
      || !finiteBetween(objective.confidence, 0, 1)
      || !integerBetween(candidate.levelDifference, 0, 5)) return null;
    const expectedDifference = Math.abs(
      CEFR_LEVELS.indexOf(objective.estimatedLevel) - CEFR_LEVELS.indexOf(productive.level as CefrLevel),
    );
    if (candidate.levelDifference !== expectedDifference
      || (outcome === 'corroborated' && expectedDifference !== 0)
      || (outcome === 'adjacent' && expectedDifference !== 1)
      || (outcome === 'divergent' && expectedDifference < 2)) return null;
  }
  return {
    policyVersion: candidate.policyVersion,
    outcome,
    objective: {
      status: objective.status as DiagnosticSkillEvidence['status'],
      decisions,
      attempted,
      ...(objective.estimatedLevel !== undefined ? { estimatedLevel: objective.estimatedLevel as CefrLevel } : {}),
      ...(objectiveRange ? { plausibleRange: objectiveRange } : {}),
      ...(objective.confidence !== undefined ? { confidence: objective.confidence as number } : {}),
    },
    productiveWriting: {
      criterion: productive.criterion as DiagnosticLanguageUseIntegration['productiveWriting']['criterion'],
      level: productive.level as CefrLevel,
      confidence: productive.confidence as number,
      rubricVersion: productive.rubricVersion,
    },
    ...(candidate.levelDifference !== undefined ? { levelDifference: Number(candidate.levelDifference) } : {}),
    automaticLevelShift: false,
  };
}

function parseSkillEvidence(value: unknown): DiagnosticSkillEvidence | null {
  const candidate = record(value);
  if (!candidate
    || !DIAGNOSTIC_SKILLS.includes(candidate.skill as DiagnosticSkill)
    || !STATUSES.includes(candidate.status as typeof STATUSES[number])
    || !integerBetween(candidate.decisions, 0, 100)
    || !integerBetween(candidate.distinctStimuli, 0, Number(candidate.decisions))) return null;
  const skill = candidate.skill as DiagnosticSkill;
  const status = candidate.status as DiagnosticSkillEvidence['status'];
  const estimatedLevel = candidate.estimatedLevel === undefined ? undefined : candidate.estimatedLevel;
  const plausibleRange = candidate.plausibleRange === undefined ? undefined : parseRange(candidate.plausibleRange);
  const confidence = candidate.confidence === undefined ? undefined : candidate.confidence;
  if (status === 'not-estimated') {
    if (estimatedLevel !== undefined || candidate.plausibleRange !== undefined || confidence !== undefined) return null;
  } else if (!cefr(estimatedLevel) || !plausibleRange || !finiteBetween(confidence, 0, 1)
    || CEFR_LEVELS.indexOf(estimatedLevel) < CEFR_LEVELS.indexOf(plausibleRange[0])
    || CEFR_LEVELS.indexOf(estimatedLevel) > CEFR_LEVELS.indexOf(plausibleRange[1])) return null;
  const base: DiagnosticSkillEvidence = {
    skill,
    decisions: Number(candidate.decisions),
    distinctStimuli: Number(candidate.distinctStimuli),
    status,
    ...(estimatedLevel !== undefined ? { estimatedLevel: estimatedLevel as CefrLevel } : {}),
    ...(plausibleRange ? { plausibleRange } : {}),
    ...(confidence !== undefined ? { confidence: confidence as number } : {}),
  };
  if (skill === 'writing') {
    if (!WRITING_REVIEW_STATUSES.includes(candidate.reviewStatus as typeof WRITING_REVIEW_STATUSES[number])) return null;
    const exclusions = candidate.exclusionReasons === undefined ? undefined : candidate.exclusionReasons;
    if (exclusions !== undefined && (!Array.isArray(exclusions)
      || exclusions.length < 1 || exclusions.length > WRITING_EXCLUSION_REASONS.length
      || exclusions.some(reason => !WRITING_EXCLUSION_REASONS.includes(reason as typeof WRITING_EXCLUSION_REASONS[number]))
      || new Set(exclusions).size !== exclusions.length)) return null;
    const agreement = candidate.agreement === undefined ? undefined : parseAgreement(candidate.agreement);
    if (candidate.agreement !== undefined && !agreement) return null;
    if (candidate.reviewStatus === 'human-reviewed' && status === 'not-estimated') return null;
    if (candidate.reviewStatus === 'excluded' && (status !== 'not-estimated' || !exclusions)) return null;
    return {
      ...base,
      skill,
      reviewStatus: candidate.reviewStatus as DiagnosticWritingSkillEvidence['reviewStatus'],
      ...(exclusions ? { exclusionReasons: exclusions as DiagnosticWritingSkillEvidence['exclusionReasons'] } : {}),
      ...(agreement ? { agreement } : {}),
    } as DiagnosticWritingSkillEvidence;
  }
  if (!OBJECTIVE_SKILLS.includes(skill as DiagnosticObjectiveSkill)
    || !integerBetween(candidate.attempted, 0, Number(candidate.decisions))
    || !integerBetween(candidate.omitted, 0, Number(candidate.decisions))
    || Number(candidate.attempted) + Number(candidate.omitted) !== Number(candidate.decisions)
    || (Number(candidate.attempted) === 0 && candidate.observedAccuracy !== null)
    || (Number(candidate.attempted) > 0 && !finiteBetween(candidate.observedAccuracy, 0, 1))) return null;
  const objective: DiagnosticMeasuredSkillEvidence = {
    ...base,
    skill: skill as DiagnosticObjectiveSkill,
    attempted: Number(candidate.attempted),
    omitted: Number(candidate.omitted),
    observedAccuracy: candidate.observedAccuracy as number | null,
  };
  if (status !== 'not-estimated') {
    if (!finiteBetween(candidate.theta, -10, 10)
      || !finiteBetween(candidate.standardError, 0, 10)
      || candidate.standardError === 0
      || !boundedString(candidate.calibrationVersion, 100)) return null;
    objective.theta = candidate.theta;
    objective.standardError = candidate.standardError;
    objective.calibrationVersion = candidate.calibrationVersion;
  }
  if ((skill === 'grammar' || skill === 'vocabulary') && candidate.languageUseIntegration !== undefined) {
    const integration = parseLanguageUseIntegration(
      candidate.languageUseIntegration,
      skill,
      objective.decisions,
      objective.attempted,
    );
    if (!integration) return null;
    objective.languageUseIntegration = integration;
  }
  return objective;
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  const candidate = record(value);
  if (candidate) return `{${Object.keys(candidate).sort().map(key => `${JSON.stringify(key)}:${canonical(candidate[key])}`).join(',')}}`;
  return JSON.stringify(value);
}

/** Validates and re-derives every public aggregate before a stored result crosses the API boundary. */
export function parseDiagnosticPersistedResultProfile(input: {
  value: unknown;
  attemptId: string;
  blueprintVersion: string;
  bankVersion: string;
}): DiagnosticCompositeResult | null {
  const candidate = record(input.value);
  if (!candidate
    || candidate.attemptId !== input.attemptId
    || candidate.blueprintVersion !== input.blueprintVersion
    || candidate.bankVersion !== input.bankVersion
    || !boundedString(candidate.generatedAt, 50)
    || !boundedString(candidate.validUntil, 50)
    || !Array.isArray(candidate.skills)
    || candidate.skills.length !== DIAGNOSTIC_SKILLS.length) return null;
  const skills = candidate.skills.map(parseSkillEvidence);
  if (skills.some(skill => !skill)) return null;
  const resolved = skills as DiagnosticSkillEvidence[];
  if (new Set(resolved.map(skill => skill.skill)).size !== DIAGNOSTIC_SKILLS.length
    || DIAGNOSTIC_SKILLS.some(skill => !resolved.some(evidence => evidence.skill === skill))) return null;
  let rebuilt: DiagnosticCompositeResult;
  try {
    rebuilt = buildDiagnosticCompositeResult({
      attemptId: input.attemptId,
      blueprintVersion: input.blueprintVersion,
      bankVersion: input.bankVersion,
      skills: resolved,
      generatedAt: candidate.generatedAt,
      validUntil: candidate.validUntil,
    });
  } catch {
    return null;
  }
  const persistedDerived = {
    globalLevel: candidate.globalLevel,
    globalRange: candidate.globalRange,
    overallStatus: candidate.overallStatus,
    profileIsUneven: candidate.profileIsUneven,
    warnings: candidate.warnings,
    recommendations: candidate.recommendations,
  };
  const rebuiltDerived = {
    globalLevel: rebuilt.globalLevel,
    globalRange: rebuilt.globalRange,
    overallStatus: rebuilt.overallStatus,
    profileIsUneven: rebuilt.profileIsUneven,
    warnings: rebuilt.warnings,
    recommendations: rebuilt.recommendations,
  };
  return canonical(persistedDerived) === canonical(rebuiltDerived) ? rebuilt : null;
}
