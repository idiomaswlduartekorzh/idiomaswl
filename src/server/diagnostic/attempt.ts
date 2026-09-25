import { createHash } from 'node:crypto';

import { LOCATOR_OBJECTIVE_SKILLS, routeEnglishLocator, type LocatorScorecard } from '../../lib/diagnostic/mst.ts';
import type {
  DiagnosticStageKind,
  DiagnosticStageReceipt,
  DiagnosticSubmittedResponse,
} from '../../lib/diagnostic/types.ts';
import { scoreDiagnosticResponse, type DiagnosticObjectiveOutcome } from './scoring.ts';
import type { DiagnosticBankRecord } from './types.ts';

export interface DiagnosticItemSubmission {
  itemId: string;
  contentVersion: string;
  response: DiagnosticSubmittedResponse;
  responseMs: number | null;
  audioPlayCount: number | null;
}

export interface DiagnosticScoredSubmission extends DiagnosticItemSubmission {
  skill: DiagnosticBankRecord['publicItem']['skill'];
  outcome: DiagnosticObjectiveOutcome;
}

export type DiagnosticAttemptStatus =
  | 'locator'
  | 'precision'
  | 'confirmation'
  | 'writing'
  | 'scoring'
  | 'completed'
  | 'expired'
  | 'abandoned';

const STATUS_TRANSITIONS: Readonly<Record<DiagnosticAttemptStatus, readonly DiagnosticAttemptStatus[]>> = {
  locator: ['precision', 'expired', 'abandoned'],
  precision: ['confirmation', 'writing', 'expired', 'abandoned'],
  confirmation: ['writing', 'expired', 'abandoned'],
  writing: ['scoring', 'expired', 'abandoned'],
  scoring: ['completed'],
  completed: [],
  expired: [],
  abandoned: [],
};

function wordCount(value: string): number {
  const trimmed = value.trim();
  return trimmed ? trimmed.split(/\s+/u).length : 0;
}

function validateResponse(record: DiagnosticBankRecord, submission: DiagnosticItemSubmission): void {
  const contract = record.publicItem.response;
  const response = submission.response;
  if (contract.kind !== response.kind) throw new Error(`${record.publicItem.id}: response kind mismatch`);
  if (!Number.isInteger(submission.responseMs) && submission.responseMs !== null) {
    throw new Error(`${record.publicItem.id}: responseMs must be an integer or null`);
  }
  if (submission.responseMs !== null && (submission.responseMs < 0 || submission.responseMs > 3_600_000)) {
    throw new Error(`${record.publicItem.id}: responseMs is outside the accepted range`);
  }

  if (response.kind === 'single-choice' && contract.kind === 'single-choice'
    && response.optionId !== null && !contract.optionIds.includes(response.optionId)) {
    throw new Error(`${record.publicItem.id}: unknown option`);
  }
  if (response.kind === 'multiple-choice' && contract.kind === 'multiple-choice') {
    if (new Set(response.optionIds).size !== response.optionIds.length) throw new Error(`${record.publicItem.id}: duplicate option`);
    if (response.optionIds.some(optionId => !contract.optionIds.includes(optionId))) throw new Error(`${record.publicItem.id}: unknown option`);
    if (response.optionIds.length !== 0 && response.optionIds.length !== contract.selectCount) {
      throw new Error(`${record.publicItem.id}: unexpected selection count`);
    }
  }
  if (response.kind === 'short-text' && contract.kind === 'short-text' && wordCount(response.value) > contract.maxWords) {
    throw new Error(`${record.publicItem.id}: short response exceeds its word limit`);
  }

  const playCount = submission.audioPlayCount;
  if (!Number.isInteger(playCount) && playCount !== null) throw new Error(`${record.publicItem.id}: audioPlayCount must be an integer or null`);
  if (record.publicItem.stimulus.kind === 'audio') {
    if (playCount === null || playCount < 0 || playCount > record.publicItem.stimulus.maxPlays) {
      throw new Error(`${record.publicItem.id}: audio play count is outside the served limit`);
    }
  } else if (playCount !== null && playCount !== 0) {
    throw new Error(`${record.publicItem.id}: non-audio response reported audio playback`);
  }
}

export function scoreDiagnosticStage(
  stage: DiagnosticStageReceipt,
  bankRecords: readonly DiagnosticBankRecord[],
  submissions: readonly DiagnosticItemSubmission[],
): DiagnosticScoredSubmission[] {
  if (stage.kind === 'writing') throw new Error('writing stages require the writing evaluation pipeline');
  const records = new Map(bankRecords.map(record => [record.publicItem.id, record]));
  const expected = new Set(stage.itemIds);
  if (expected.size !== stage.itemIds.length) throw new Error('served stage contains duplicate item IDs');
  if (submissions.length !== stage.itemIds.length) throw new Error('stage submission must explicitly answer or omit every served item');

  const seen = new Set<string>();
  return submissions.map(submission => {
    if (!expected.has(submission.itemId)) throw new Error(`item ${submission.itemId} was not served in this stage`);
    if (seen.has(submission.itemId)) throw new Error(`item ${submission.itemId} was submitted more than once`);
    seen.add(submission.itemId);
    const record = records.get(submission.itemId);
    if (!record) throw new Error(`server bank cannot resolve ${submission.itemId}`);
    const servedVersion = stage.contentVersions[submission.itemId];
    if (submission.contentVersion !== servedVersion || submission.contentVersion !== record.publicItem.contentVersion) {
      throw new Error(`${submission.itemId}: content version mismatch`);
    }
    validateResponse(record, submission);
    return {
      ...submission,
      skill: record.publicItem.skill,
      outcome: scoreDiagnosticResponse(record.scoring, submission.response),
    };
  });
}

export function locatorDecisionFromResponses(
  records: readonly DiagnosticBankRecord[],
  scored: readonly DiagnosticScoredSubmission[],
) {
  const recordById = new Map(records.map(record => [record.publicItem.id, record]));
  const scorecard = Object.fromEntries(LOCATOR_OBJECTIVE_SKILLS.map(skill => [skill, {
    correct: 0,
    decisions: 0,
    omitted: 0,
  }])) as Record<(typeof LOCATOR_OBJECTIVE_SKILLS)[number], { correct: number; decisions: number; omitted: number }>;

  for (const response of scored) {
    const record = recordById.get(response.itemId);
    if (!record) throw new Error(`locator record missing for ${response.itemId}`);
    const bucket = scorecard[record.publicItem.skill];
    bucket.decisions += 1;
    if (response.outcome === 'correct') bucket.correct += 1;
    if (response.outcome === 'omitted') bucket.omitted += 1;
  }
  return routeEnglishLocator(scorecard satisfies LocatorScorecard);
}

function canonicalResponse(response: DiagnosticSubmittedResponse): DiagnosticSubmittedResponse {
  return response.kind === 'multiple-choice'
    ? { ...response, optionIds: [...response.optionIds].sort() }
    : response;
}

export function diagnosticSubmissionDigest(submissions: readonly DiagnosticItemSubmission[]): string {
  const canonical = submissions
    .map(submission => ({ ...submission, response: canonicalResponse(submission.response) }))
    .sort((a, b) => a.itemId.localeCompare(b.itemId));
  return createHash('sha256').update(JSON.stringify(canonical)).digest('hex');
}

export function assertDiagnosticStatusTransition(
  current: DiagnosticAttemptStatus,
  next: DiagnosticAttemptStatus,
): void {
  if (!STATUS_TRANSITIONS[current].includes(next)) throw new Error(`invalid diagnostic transition: ${current} -> ${next}`);
}

export function assertDiagnosticAttemptAccess(
  attempt: { userId: string; expiresAt: string; status: DiagnosticAttemptStatus },
  authenticatedUserId: string,
  now = new Date(),
): void {
  if (!authenticatedUserId || attempt.userId !== authenticatedUserId) throw new Error('diagnostic attempt does not belong to the authenticated user');
  if (new Date(attempt.expiresAt).getTime() <= now.getTime()) throw new Error('diagnostic attempt has expired');
  if (['completed', 'expired', 'abandoned'].includes(attempt.status)) throw new Error(`diagnostic attempt is ${attempt.status}`);
}

export function expectedStageKind(status: DiagnosticAttemptStatus): DiagnosticStageKind | null {
  if (status === 'locator' || status === 'precision' || status === 'confirmation' || status === 'writing') return status;
  return null;
}
