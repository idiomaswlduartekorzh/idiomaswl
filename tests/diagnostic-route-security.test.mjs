import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const route = await readFile(new URL('../src/app/api/diagnostic/attempts/route.ts', import.meta.url), 'utf8');
const handler = await readFile(new URL('../src/server/diagnostic/start.server.ts', import.meta.url), 'utf8');
const repository = await readFile(new URL('../src/server/diagnostic/repository.server.ts', import.meta.url), 'utf8');
const submitRoute = await readFile(new URL('../src/app/api/diagnostic/attempts/[attemptId]/stages/[stageId]/route.ts', import.meta.url), 'utf8');
const submitHandler = await readFile(new URL('../src/server/diagnostic/submit.server.ts', import.meta.url), 'utf8');
const resumeRoute = await readFile(new URL('../src/app/api/diagnostic/attempts/[attemptId]/route.ts', import.meta.url), 'utf8');
const resumeHandler = await readFile(new URL('../src/server/diagnostic/resume.server.ts', import.meta.url), 'utf8');
const finalizeRoute = await readFile(new URL('../src/app/api/admin/diagnostic/attempts/[attemptId]/finalize/route.ts', import.meta.url), 'utf8');

test('diagnostic start route uses Node runtime and delegates to a server-only handler', () => {
  assert.match(route, /export const runtime = 'nodejs'/);
  assert.match(route, /handleDiagnosticAttemptStart\(request\)/);
  assert.match(handler, /import 'server-only'/);
  assert.match(repository, /import 'server-only'/);
});

test('attempt resume is authenticated, owner-scoped and returns no-store payloads', () => {
  assert.match(resumeRoute, /export const runtime = 'nodejs'/);
  assert.match(resumeRoute, /handleDiagnosticAttemptResume/);
  assert.match(resumeHandler, /import 'server-only'/);
  assert.match(resumeHandler, /auth\.getUser\(\)/);
  assert.match(resumeHandler, /loadDiagnosticAttemptForResume/);
  assert.match(resumeHandler, /'Cache-Control': 'private, no-store, max-age=0'/);
  assert.match(repository, /loadDiagnosticAttemptForResume/);
  assert.match(repository, /\.eq\('id', input\.attemptId\)\.eq\('user_id', input\.userId\)/);
});

test('objective submission route delegates through an authenticated server-only boundary', () => {
  assert.match(submitRoute, /export const runtime = 'nodejs'/);
  assert.match(submitRoute, /handleDiagnosticStageSubmission/);
  assert.match(submitHandler, /import 'server-only'/);
  assert.match(submitHandler, /request\.headers\.get\('origin'\)/);
  assert.match(submitHandler, /auth\.getUser\(\)/);
  assert.match(submitHandler, /parseDiagnosticObjectiveStageSubmitRequest/);
  assert.match(submitHandler, /parseDiagnosticWritingStageSubmitRequest/);
  assert.match(submitHandler, /loadDiagnosticObjectiveSubmissionContext/);
  assert.match(submitHandler, /persistDiagnosticObjectiveStage/);
  assert.match(submitHandler, /persistDiagnosticWritingSubmission/);
  assert.match(submitHandler, /ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK\.length === 0/);
});

test('submission handler binds current versions and never trusts client scoring', () => {
  assert.match(submitHandler, /submissionVersion !== context\.attempt\.version/);
  assert.match(submitHandler, /context\.bankVersion !== ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK_VERSION/);
  assert.match(submitHandler, /context\.stage\.itemIds\.map/);
  assert.doesNotMatch(submitHandler, /isCorrect|correctAnswer|correctOption/);
  assert.match(repository, /\.eq\('user_id', input\.userId\)/);
});


test('start handler verifies feature flag, origin, JSON, consent, audio and authenticated user', () => {
  assert.match(handler, /DIAGNOSTIC_ADAPTIVE_ENABLED !== 'true'/);
  assert.match(handler, /DIAGNOSTIC_ACCESS_MODE/);
  assert.match(handler, /hasDiagnosticPilotEnrollment/);
  assert.match(handler, /getDiagnosticProductionReleaseReadiness/);
  assert.match(handler, /evaluateDiagnosticProductionRollout/);
  assert.match(handler, /ROLLOUT_NOT_ELIGIBLE/);
  assert.match(handler, /requestHasSameOrigin\(request\)/);
  assert.match(handler, /startsWith\('application\/json'\)/);
  assert.match(handler, /audioCheckPassed !== true/);
  assert.match(handler, /DIAGNOSTIC_CONSENT_VERSION/);
  assert.match(handler, /auth\.getUser\(\)/);
  assert.match(handler, /consumeExamReviewRateLimit/);
});

test('browser response is private and bank readiness fails closed', () => {
  assert.match(handler, /'Cache-Control': 'private, no-store, max-age=0'/);
  assert.match(handler, /ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK\.length === 0/);
  assert.match(handler, /BANK_NOT_READY/);
  assert.match(repository, /rpc\('create_diagnostic_attempt'/);
});

test('diagnostic finalization is admin-only, same-origin and server-scored', () => {
  assert.match(finalizeRoute, /requireAdmin\(\)/);
  assert.match(finalizeRoute, /sameOrigin\(request\)/);
  assert.match(finalizeRoute, /parseDiagnosticWritingEvaluation/);
  assert.match(finalizeRoute, /loadDiagnosticFinalizationContext/);
  assert.match(finalizeRoute, /finalization\.automatedEvaluation/);
  assert.match(finalizeRoute, /responses: finalization\.responses/);
  assert.match(finalizeRoute, /OBJECTIVE_EVIDENCE_INVALID/);
  assert.match(repository, /submitted_response,outcome,response_ms,audio_play_count/);
  assert.doesNotMatch(finalizeRoute, /candidate\.automated/);
  assert.match(finalizeRoute, /persistDiagnosticHumanWritingEvaluation/);
  assert.match(finalizeRoute, /INDEPENDENT_ADJUDICATOR_REQUIRED/);
  assert.match(finalizeRoute, /finalizeEnglishDiagnostic/);
  assert.match(finalizeRoute, /persistDiagnosticFinalization/);
  assert.match(finalizeRoute, /reviewerId: admin\.id/);
  assert.match(finalizeRoute, /'Cache-Control': 'private, no-store, max-age=0'/);
});
