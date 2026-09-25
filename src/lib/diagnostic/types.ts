export const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

export type CefrLevel = (typeof CEFR_LEVELS)[number];

export const DIAGNOSTIC_SKILLS = [
  'reading',
  'listening',
  'writing',
  'grammar',
  'vocabulary',
] as const;

export type DiagnosticSkill = (typeof DIAGNOSTIC_SKILLS)[number];
export type DiagnosticObjectiveSkill = Exclude<DiagnosticSkill, 'writing'>;

export type DiagnosticItemStatus = 'reserved' | 'pilot' | 'operational' | 'retired';
export type DiagnosticReviewStatus = 'draft' | 'linguistic-reviewed' | 'approved';
export type DiagnosticExposure = 'reserved' | 'public-practice' | 'previously-public';

export type DiagnosticResponseContract =
  | { kind: 'single-choice'; optionIds: readonly string[] }
  | { kind: 'multiple-choice'; optionIds: readonly string[]; selectCount: number }
  | { kind: 'short-text'; maxWords: number };

export type DiagnosticStimulus =
  | { kind: 'none' }
  | { kind: 'text'; stimulusId: string; title?: string; body: string }
  | {
      kind: 'audio';
      mediaId: string;
      src: string;
      startMs: number;
      endMs: number;
      maxPlays: number;
    };

/**
 * Safe payload delivered to the browser. Answer keys, rationales and empirical
 * item parameters deliberately do not belong to this interface.
 */
export interface DiagnosticPublicItem {
  id: string;
  contentVersion: string;
  language: string;
  skill: DiagnosticObjectiveSkill;
  subdomain: string;
  levelCandidate: CefrLevel;
  prompt: string;
  stimulus: DiagnosticStimulus;
  response: DiagnosticResponseContract;
  displayOptions?: readonly { id: string; text: string }[];
}

export type DiagnosticSubmittedResponse =
  | { kind: 'single-choice'; optionId: string | null }
  | { kind: 'multiple-choice'; optionIds: readonly string[] }
  | { kind: 'short-text'; value: string };

export type DiagnosticRouteId = 'low-a1-a2' | 'mid-b1-b2' | 'high-c1-c2';
export type DiagnosticStageKind = 'locator' | 'precision' | 'confirmation' | 'writing';

export interface DiagnosticStageReceipt {
  stageId: string;
  kind: DiagnosticStageKind;
  routeId: DiagnosticRouteId | null;
  itemIds: readonly string[];
  contentVersions: Readonly<Record<string, string>>;
  issuedAt: string;
  completedAt?: string;
}

export interface DiagnosticSkillEvidence {
  skill: DiagnosticSkill;
  decisions: number;
  distinctStimuli: number;
  status: 'not-estimated' | 'provisional' | 'calibrated';
  estimatedLevel?: CefrLevel;
  plausibleRange?: readonly [CefrLevel, CefrLevel];
  confidence?: number;
}

export interface DiagnosticResultProfile {
  attemptId: string;
  blueprintVersion: string;
  bankVersion: string;
  globalLevel: CefrLevel | null;
  globalRange: readonly [CefrLevel, CefrLevel] | null;
  skills: readonly DiagnosticSkillEvidence[];
  generatedAt: string;
  validUntil: string;
}
