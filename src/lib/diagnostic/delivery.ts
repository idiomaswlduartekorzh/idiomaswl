import type {
  DiagnosticPublicItem,
  DiagnosticStageReceipt,
  DiagnosticSubmittedResponse,
} from './types.ts';
import type { DiagnosticWritingPrompt } from './writing.ts';

export const DIAGNOSTIC_CONSENT_VERSION = 'diagnostic-pilot-2026-09-24';
export const DIAGNOSTIC_ENGINE_VERSION = 'mst-engine-v1';

export interface DiagnosticStageDelivery {
  attemptId: string;
  attemptVersion: number;
  expiresAt: string;
  stage: DiagnosticStageReceipt;
  items: readonly DiagnosticPublicItem[];
}

/** Writing delivery is a separate shape so objective answer contracts cannot be confused with free production. */
export interface DiagnosticWritingStageDelivery {
  attemptId: string;
  attemptVersion: number;
  expiresAt: string;
  stage: DiagnosticStageReceipt & { kind: 'writing' };
  prompt: DiagnosticWritingPrompt;
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

export interface DiagnosticWritingStageSubmitRequest {
  attemptVersion: number;
  responseText: string;
}

function boundedString(value: unknown, maximum: number): value is string {
  return typeof value === 'string' && value.length > 0 && value.length <= maximum;
}

function parseSubmittedResponse(value: unknown): DiagnosticSubmittedResponse | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const candidate = value as Record<string, unknown>;
  if (candidate.kind === 'single-choice') {
    if (candidate.optionId !== null && !boundedString(candidate.optionId, 180)) return null;
    return { kind: 'single-choice', optionId: candidate.optionId as string | null };
  }
  if (candidate.kind === 'multiple-choice') {
    if (!Array.isArray(candidate.optionIds) || candidate.optionIds.length > 10
      || candidate.optionIds.some((item) => !boundedString(item, 180))
      || new Set(candidate.optionIds).size !== candidate.optionIds.length) return null;
    return { kind: 'multiple-choice', optionIds: candidate.optionIds as string[] };
  }
  if (candidate.kind === 'short-text') {
    if (typeof candidate.value !== 'string' || candidate.value.length > 500) return null;
    return { kind: 'short-text', value: candidate.value };
  }
  return null;
}

/** Strict network-boundary parser; scoring still validates each response against the served bank record. */
export function parseDiagnosticObjectiveStageSubmitRequest(
  value: unknown,
): DiagnosticObjectiveStageSubmitRequest | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const candidate = value as Record<string, unknown>;
  if (!Number.isInteger(candidate.attemptVersion)
    || Number(candidate.attemptVersion) < 1
    || Number(candidate.attemptVersion) > 2_147_483_647
    || !Array.isArray(candidate.responses)
    || candidate.responses.length < 1
    || candidate.responses.length > 24) return null;

  const responses: DiagnosticItemSubmission[] = [];
  const itemIds = new Set<string>();
  for (const raw of candidate.responses) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
    const item = raw as Record<string, unknown>;
    if (!boundedString(item.itemId, 160)
      || !boundedString(item.contentVersion, 100)
      || itemIds.has(item.itemId)
      || (item.responseMs !== null && (!Number.isInteger(item.responseMs) || Number(item.responseMs) < 0 || Number(item.responseMs) > 3_600_000))
      || (item.audioPlayCount !== null && (!Number.isInteger(item.audioPlayCount) || Number(item.audioPlayCount) < 0 || Number(item.audioPlayCount) > 20))) {
      return null;
    }
    const response = parseSubmittedResponse(item.response);
    if (!response) return null;
    itemIds.add(item.itemId);
    responses.push({
      itemId: item.itemId,
      contentVersion: item.contentVersion,
      response,
      responseMs: item.responseMs as number | null,
      audioPlayCount: item.audioPlayCount as number | null,
    });
  }
  return { attemptVersion: Number(candidate.attemptVersion), responses };
}

export function parseDiagnosticWritingStageSubmitRequest(
  value: unknown,
): DiagnosticWritingStageSubmitRequest | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const candidate = value as Record<string, unknown>;
  if (!Number.isInteger(candidate.attemptVersion)
    || Number(candidate.attemptVersion) < 1
    || Number(candidate.attemptVersion) > 2_147_483_647
    || typeof candidate.responseText !== 'string'
    || candidate.responseText.length < 1
    || candidate.responseText.length > 12_000) return null;
  return {
    attemptVersion: Number(candidate.attemptVersion),
    responseText: candidate.responseText,
  };
}
