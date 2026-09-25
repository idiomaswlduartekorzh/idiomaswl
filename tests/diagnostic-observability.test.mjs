import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  logDiagnosticInternalFailure,
  observeDiagnosticRoute,
} from '../src/server/diagnostic/observability.ts';

async function captureLogs(run) {
  const info = [];
  const errors = [];
  const originalInfo = console.info;
  const originalError = console.error;
  console.info = value => info.push(String(value));
  console.error = value => errors.push(String(value));
  try {
    const result = await run();
    return { result, info, errors };
  } finally {
    console.info = originalInfo;
    console.error = originalError;
  }
}

test('structured diagnostic logs contain only fixed route metadata, status and duration', async () => {
  const times = [1_000, 1_042];
  const { result, info, errors } = await captureLogs(() => observeDiagnosticRoute(
    { route: '/api/diagnostic/attempts/[attemptId]', method: 'GET' },
    async () => Response.json({ privateAttemptId: 'never-log-this' }, { status: 200 }),
    () => times.shift(),
  ));
  assert.equal(result.status, 200);
  assert.equal(info.length, 2);
  assert.equal(errors.length, 0);
  const started = JSON.parse(info[0]);
  const completed = JSON.parse(info[1]);
  assert.deepEqual(started, {
    schemaVersion: 'diagnostic-operational-log-v1', service: 'nivel-radar', level: 'info',
    event: 'request.started', route: '/api/diagnostic/attempts/[attemptId]', method: 'GET',
  });
  assert.equal(completed.status, 200);
  assert.equal(completed.durationMs, 42);
  assert.equal(completed.outcome, 'success');
  assert.equal(`${info}${errors}`.includes('never-log-this'), false);
});

test('server responses and unhandled failures emit safe error records without raw errors', async () => {
  const serviceFailure = await captureLogs(() => observeDiagnosticRoute(
    { route: '/api/diagnostic/media/[mediaId]', method: 'GET' },
    async () => new Response(null, { status: 503 }),
    (() => { const times = [5_000, 5_125]; return () => times.shift(); })(),
  ));
  assert.equal(serviceFailure.errors.length, 1);
  assert.deepEqual(JSON.parse(serviceFailure.errors[0]), {
    schemaVersion: 'diagnostic-operational-log-v1', service: 'nivel-radar', level: 'error',
    event: 'request.completed', route: '/api/diagnostic/media/[mediaId]', method: 'GET',
    durationMs: 125, status: 503, outcome: 'failure',
  });

  const privateError = new Error('private-user@example.test private-attempt-id');
  const info = [];
  const errors = [];
  const originalInfo = console.info;
  const originalError = console.error;
  console.info = value => info.push(String(value));
  console.error = value => errors.push(String(value));
  try {
    const times = [9_000, 9_005];
    await assert.rejects(observeDiagnosticRoute(
      { route: '/api/diagnostic/attempts', method: 'POST' },
      async () => { throw privateError; },
      () => times.shift(),
    ), error => error === privateError);
  } finally {
    console.info = originalInfo;
    console.error = originalError;
  }
  assert.equal(errors.length, 1);
  assert.equal(`${info}${errors}`.includes('private-user@example.test'), false);
  assert.deepEqual(JSON.parse(errors[0]), {
    schemaVersion: 'diagnostic-operational-log-v1', service: 'nivel-radar', level: 'error',
    event: 'request.failed', route: '/api/diagnostic/attempts', method: 'POST',
    durationMs: 5, outcome: 'failure',
  });
});

test('observability rejects dynamic route metadata and every user-facing route is wrapped', async () => {
  await assert.rejects(observeDiagnosticRoute(
    { route: '/api/diagnostic/attempts/private-user-id', method: 'GET' },
    async () => new Response(null, { status: 200 }),
  ), /metadata_invalid/);

  const sources = [
    '../src/app/api/diagnostic/attempts/route.ts',
    '../src/app/api/diagnostic/attempts/[attemptId]/route.ts',
    '../src/app/api/diagnostic/attempts/[attemptId]/stages/[stageId]/route.ts',
    '../src/app/api/diagnostic/media/[mediaId]/route.ts',
    '../src/app/api/admin/diagnostic/attempts/[attemptId]/finalize/route.ts',
    '../src/app/api/admin/diagnostic/pilot-report/route.ts',
  ].map(path => readFileSync(new URL(path, import.meta.url), 'utf8'));
  assert.ok(sources.every(source => source.includes('observeDiagnosticRoute')));
  assert.ok(sources.every(source => !/route:\s*[`'"]\/api\/diagnostic\/.*\$\{/u.test(source)));
});

test('internal failures are allowlisted and instrumented handlers never log raw errors directly', async () => {
  const { errors } = await captureLogs(async () => {
    logDiagnosticInternalFailure({ component: 'private-user-id', reason: 'secret database message' });
    return new Response(null, { status: 200 });
  });
  assert.deepEqual(JSON.parse(errors[0]), {
    schemaVersion: 'diagnostic-operational-log-v1', service: 'nivel-radar', level: 'error',
    event: 'internal.failure', component: 'persistence', reason: 'unclassified',
  });
  assert.equal(errors[0].includes('private-user-id'), false);
  assert.equal(errors[0].includes('secret database message'), false);

  const sources = [
    '../src/server/diagnostic/start.server.ts',
    '../src/server/diagnostic/resume.server.ts',
    '../src/server/diagnostic/submit.server.ts',
    '../src/server/diagnostic/privacy.server.ts',
    '../src/server/diagnostic/repository.server.ts',
    '../src/app/api/diagnostic/media/[mediaId]/route.ts',
    '../src/app/api/admin/diagnostic/attempts/[attemptId]/finalize/route.ts',
    '../src/app/api/admin/diagnostic/pilot-report/route.ts',
  ].map(path => readFileSync(new URL(path, import.meta.url), 'utf8'));
  assert.ok(sources.every(source => !source.includes('console.error')));
});
