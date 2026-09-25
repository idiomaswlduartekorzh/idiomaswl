import type { CefrLevel } from './types';
import type {
  DiagnosticWritingCriterion,
  DiagnosticWritingResponseQuality,
  DiagnosticWritingResponseScreening,
} from './writing';

export interface DiagnosticReviewCriterionView {
  criterion: DiagnosticWritingCriterion;
  level: CefrLevel;
  confidence: number;
  evidence: readonly string[];
  rationale: string;
}

export interface DiagnosticReviewEvaluationView {
  reviewerId?: string;
  model?: string;
  criteria: readonly DiagnosticReviewCriterionView[];
  warnings?: readonly string[];
  responseQuality?: DiagnosticWritingResponseQuality;
  decision?: 'accept' | 'revise' | 'exclude';
}

export interface DiagnosticWritingReviewView {
  attemptId: string;
  attemptVersion: number;
  routeId: string | null;
  status: 'pending' | 'automated-scored' | 'human-review' | 'adjudication';
  createdAt: string;
  prompt: {
    id: string;
    contentVersion: string;
    title: string;
    situation: string;
    instructions: readonly string[];
    levelCandidate: CefrLevel;
  };
  responseText: string;
  responseSha256: string;
  wordCount: number;
  responseScreening: DiagnosticWritingResponseScreening;
  rubricVersion: string;
  automated?: DiagnosticReviewEvaluationView;
  human?: DiagnosticReviewEvaluationView;
}
