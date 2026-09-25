import { createHash } from 'node:crypto';

import type { DiagnosticWritingStageSubmitRequest } from '../../lib/diagnostic/delivery.ts';
import type { DiagnosticWritingPrompt } from '../../lib/diagnostic/writing.ts';
import type { DiagnosticStageReceipt } from '../../lib/diagnostic/types.ts';
import { assertDiagnosticAttemptAccess } from './attempt.ts';
import type { DiagnosticAttemptSnapshot } from './continue-core.ts';
import { validateDiagnosticWritingResponse } from './writing.ts';

export interface PersistWritingSubmissionInput {
  attempt: DiagnosticAttemptSnapshot;
  stage: DiagnosticStageReceipt;
  prompt: DiagnosticWritingPrompt;
  responseText: string;
  responseSha256: string;
  wordCount: number;
}

export interface SubmitWritingDependencies {
  now: () => Date;
  persist: (input: PersistWritingSubmissionInput) => Promise<{ replayed: boolean; version: number }>;
}

function countWords(value: string): number {
  const normalized = value.normalize('NFC').trim();
  return normalized ? normalized.split(/\s+/u).length : 0;
}

export async function submitEnglishDiagnosticWriting(input: {
  authenticatedUserId: string;
  attempt: DiagnosticAttemptSnapshot;
  stage: DiagnosticStageReceipt;
  prompt: DiagnosticWritingPrompt;
  submission: DiagnosticWritingStageSubmitRequest;
}, dependencies: SubmitWritingDependencies): Promise<{
  attemptId: string;
  attemptVersion: number;
  status: 'scoring';
  replayed: boolean;
  writingStatus: 'pending';
}> {
  assertDiagnosticAttemptAccess(input.attempt, input.authenticatedUserId, dependencies.now());
  const firstSubmission = input.attempt.status === 'writing' && !input.stage.completedAt;
  const idempotentReplay = input.attempt.status === 'scoring' && Boolean(input.stage.completedAt);
  const versionMatches = firstSubmission
    ? input.submission.attemptVersion === input.attempt.version
    : idempotentReplay && input.submission.attemptVersion === input.attempt.version - 1;
  if ((!firstSubmission && !idempotentReplay)
    || !versionMatches
    || input.stage.kind !== 'writing'
    || input.stage.itemIds.length !== 1
    || input.stage.itemIds[0] !== input.prompt.id
    || input.stage.contentVersions[input.prompt.id] !== input.prompt.contentVersion) {
    throw new Error('diagnostic writing stage is out of order or version conflict');
  }
  const responseText = input.submission.responseText.normalize('NFC').trim();
  const validationErrors = validateDiagnosticWritingResponse(input.prompt, responseText);
  if (validationErrors.length) throw new Error(`diagnostic writing response invalid: ${validationErrors.join('; ')}`);
  const responseSha256 = createHash('sha256').update(responseText).digest('hex');
  const persisted = await dependencies.persist({
    attempt: input.attempt,
    stage: input.stage,
    prompt: input.prompt,
    responseText,
    responseSha256,
    wordCount: countWords(responseText),
  });
  return {
    attemptId: input.attempt.id,
    attemptVersion: persisted.version,
    status: 'scoring',
    replayed: persisted.replayed,
    writingStatus: 'pending',
  };
}
