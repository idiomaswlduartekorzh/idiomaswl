import type {
  DiagnosticPublicItem,
  DiagnosticStageReceipt,
  DiagnosticSubmittedResponse,
} from './types.ts';

export const DIAGNOSTIC_CONSENT_VERSION = 'diagnostic-pilot-2026-09-24';
export const DIAGNOSTIC_ENGINE_VERSION = 'mst-engine-v1';

export interface DiagnosticStageDelivery {
  attemptId: string;
  attemptVersion: number;
  expiresAt: string;
  stage: DiagnosticStageReceipt;
  items: readonly DiagnosticPublicItem[];
}

export type DiagnosticStartRequest = {
  language: 'en';
  audioCheckPassed: true;
  consentVersion: typeof DIAGNOSTIC_CONSENT_VERSION;
};

export interface DiagnosticItemSubmission {
  itemId: string;
  contentVersion: string;
  response: DiagnosticSubmittedResponse;
  responseMs: number | null;
  audioPlayCount: number | null;
}

export interface DiagnosticObjectiveStageSubmitRequest {
  attemptVersion: number;
  responses: readonly DiagnosticItemSubmission[];
}
