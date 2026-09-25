import type {
  CefrLevel,
  DiagnosticExposure,
  DiagnosticItemStatus,
  DiagnosticPublicItem,
  DiagnosticReviewStatus,
} from '@/lib/diagnostic/types';

export type DiagnosticScoringKey =
  | { kind: 'single-choice'; optionId: string }
  | { kind: 'multiple-choice'; optionIds: readonly string[] }
  | { kind: 'short-text'; accepted: readonly string[] };

export interface DiagnosticItemParameters {
  sampleSize: number;
  difficulty?: number;
  discrimination?: number;
  omissionRate?: number;
  medianResponseMs?: number;
  calibratedAt?: string;
}

/** Server-only bank record. Never serialize this object as an API response. */
export interface DiagnosticBankRecord {
  publicItem: DiagnosticPublicItem;
  status: DiagnosticItemStatus;
  exposure: DiagnosticExposure;
  review: {
    status: DiagnosticReviewStatus;
    reviewerId?: string;
    reviewedAt?: string;
    contentSha256?: string;
  };
  scoring: DiagnosticScoringKey;
  rationale: {
    key: string;
    distractors?: Readonly<Record<string, string>>;
  };
  source: {
    kind: 'welearn-original' | 'welearn-legacy' | 'adapted-practice';
    reference: string;
  };
  levelRange: readonly [CefrLevel, CefrLevel];
  parameters?: DiagnosticItemParameters;
  warnings?: readonly string[];
}
