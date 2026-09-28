import { createHash } from 'node:crypto';

import { LOCATOR_OBJECTIVE_SKILLS, routeEnglishLocator, type LocatorScorecard } from '../../lib/diagnostic/mst.ts';
import type {
  DiagnosticItemSubmission,
} from '../../lib/diagnostic/delivery.ts';
import type {
  DiagnosticStageKind,
  DiagnosticStageReceipt,
  DiagnosticSubmittedResponse,
} from '../../lib/diagnostic/types.ts';
import {
  scoreDiagnosticResponse,
  validateDiagnosticResponseForRecord,
  type DiagnosticObjectiveOutcome,
} from './scoring.ts';
import type { DiagnosticBankRecord } from './types.ts';

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
  precision: ['confirmation', 'completed', 'expired', 'abandoned'],
  confirmation: ['completed', 'expired', 'abandoned'],
  writing: ['scoring', 'expired', 'abandoned'],
  scoring: ['completed'],
  completed: [],
  expired: [],
  abandoned: [],
};

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
    validateDiagnosticResponseForRecord({
      record,
      response: submission.response,
      responseMs: submission.responseMs,
      audioPlayCount: submission.audioPlayCount,
    });
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
  options: { allowCompleted?: boolean } = {},
): void {
  if (!authenticatedUserId || attempt.userId !== authenticatedUserId) throw new Error('diagnostic attempt does not belong to the authenticated user');
  if (new Date(attempt.expiresAt).getTime() <= now.getTime()) throw new Error('diagnostic attempt has expired');
  if (['expired', 'abandoned'].includes(attempt.status)
    || (attempt.status === 'completed' && options.allowCompleted !== true)) {
    throw new Error(`diagnostic attempt is ${attempt.status}`);
  }
}

export function expectedStageKind(status: DiagnosticAttemptStatus): DiagnosticStageKind | null {
  if (status === 'locator' || status === 'precision' || status === 'confirmation' || status === 'writing') return status;
  return null;
}
