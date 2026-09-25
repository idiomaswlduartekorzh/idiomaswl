import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  DIAGNOSTIC_AUTH_FLOW_CONFIRMATION_PREFIX,
  DIAGNOSTIC_AUTH_FLOW_CONSENT_VERSION,
  verifyDiagnosticAuthenticatedFlow,
} from '../scripts/lib/diagnostic-auth-flow.mjs';

const deliverySource = readFileSync(new URL('../src/lib/diagnostic/delivery.ts', import.meta.url), 'utf8');

const userId = '00000000-0000-4000-8000-000000000001';
const attemptId = '00000000-0000-4000-8000-000000000002';
const stageIds = [
  '00000000-0000-4000-8000-000000000003',
  '00000000-0000-4000-8000-000000000004',
  '00000000-0000-4000-8000-000000000005',
];

function json(payload, status = 200, headers = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });
}

function objectiveDelivery(stageIndex, kind) {
  const listening = stageIndex === 0;
  return {
    attemptId,
    attemptVersion: stageIndex + 1,
    stage: {
      stageId: stageIds[stageIndex], kind, routeId: stageIndex ? 'low-a1-a2' : null,
      itemIds: [`item-${stageIndex}`], contentVersions: { [`item-${stageIndex}`]: 'v1' },
    },
    items: [{
      id: `item-${stageIndex}`, contentVersion: 'v1',
      response: { kind: 'single-choice', optionIds: ['a', 'b'] },
      stimulus: listening
        ? { kind: 'audio', src: '/api/diagnostic/media/en-a1-fixture' }
        : { kind: 'none' },
    }],
  };
}

const writingDelivery = {
  attemptId,
  attemptVersion: 3,
  stage: { stageId: stageIds[2], kind: 'writing' },
  prompt: {
    id: 'writing-a1-fixture', contentVersion: 'v1', levelCandidate: 'A1',
    minimumWords: 20, maximumWords: 40,
  },
};

function completeFlowFetch({ failStart = false } = {}) {
  let objectiveSubmissions = 0;
  let resumeCalls = 0;
  return async (url, options = {}) => {
    const path = new URL(url).pathname;
    const method = options.method ?? 'GET';
    if (path === '/api/admin/diagnostic/pilot-enrollments') return json({ receipt: { status: 'ok' } }, 201);
    if (path === '/api/diagnostic/attempts' && method === 'DELETE') {
      return json({ receipt: { remainingAttempts: 0 } });
    }
    if (path === '/api/diagnostic/attempts' && method === 'POST') {
      return failStart
        ? json({ code: 'BANK_NOT_READY' }, 503)
        : json({ delivery: objectiveDelivery(0, 'locator') }, 201);
    }
    if (path === '/api/diagnostic/media/en-a1-fixture' && method === 'HEAD') {
      return new Response(null, {
        status: 206,
        headers: { 'content-type': 'audio/mpeg', 'cache-control': 'private, no-store, max-age=0' },
      });
    }
    if (path.includes('/stages/') && method === 'POST') {
      const body = JSON.parse(options.body);
      if ('responseText' in body) return json({ submission: { status: 'scoring' } }, 202);
      objectiveSubmissions += 1;
      return json({ delivery: objectiveSubmissions === 1 ? objectiveDelivery(1, 'precision') : writingDelivery });
    }
    if (path.endsWith('/finalize') && method === 'POST') return json({ result: { ok: true } });
    if (path === `/api/diagnostic/attempts/${attemptId}` && method === 'GET') {
      resumeCalls += 1;
      if (resumeCalls === 1) return json({ resume: { kind: 'objective-stage', delivery: objectiveDelivery(0, 'locator') } });
      if (resumeCalls === 2) return json({ resume: { kind: 'processing' } });
      if (resumeCalls === 3) {
        return json({ resume: { kind: 'result', resultProfile: { skills: Array.from({ length: 5 }, () => ({})) } } });
      }
      return json({ code: 'NOT_FOUND' }, 404);
    }
    throw new Error(`Unexpected ${method} ${path}`);
  };
}

test('authenticated flow covers pilot enrollment, resume, private audio, writing, result and verified deletion', async () => {
  const receipt = await verifyDiagnosticAuthenticatedFlow({
    appUrl: 'https://preview.example.test',
    userCookie: 'user-session=secret',
    adminCookie: 'admin-session=secret',
    fixtureUserId: userId,
    destructiveConfirmation: `${DIAGNOSTIC_AUTH_FLOW_CONFIRMATION_PREFIX}${userId}`,
    fetchImpl: completeFlowFetch(),
    now: () => new Date('2026-09-25T12:00:00.000Z'),
    newId: () => 'receipt-001',
  });
  assert.equal(receipt.decision, 'PASS');
  assert.equal(receipt.checks.objectiveStages, 2);
  assert.equal(receipt.checks.fiveSkillResult, true);
  assert.equal(receipt.checks.deletion, true);
  assert.equal(receipt.checks.postDeletionNotFound, true);
  const serialized = JSON.stringify(receipt);
  assert.doesNotMatch(serialized, /user-session|admin-session|00000000-0000-4000/);
});

test('failed flow remains HOLD and still attempts fixture cleanup', async () => {
  const receipt = await verifyDiagnosticAuthenticatedFlow({
    appUrl: 'https://preview.example.test',
    userCookie: 'user-session=secret',
    adminCookie: 'admin-session=secret',
    fixtureUserId: userId,
    destructiveConfirmation: `${DIAGNOSTIC_AUTH_FLOW_CONFIRMATION_PREFIX}${userId}`,
    fetchImpl: completeFlowFetch({ failStart: true }),
  });
  assert.equal(receipt.decision, 'HOLD');
  assert.match(receipt.failure, /diagnostic start failed \(503\/BANK_NOT_READY\)/);
  assert.equal(receipt.safeguards.cleanupAttempted, true);
  assert.equal(receipt.checks.deletion, true);
});

test('destructive fixture confirmation must be bound to the exact UUID', async () => {
  await assert.rejects(() => verifyDiagnosticAuthenticatedFlow({
    appUrl: 'https://preview.example.test',
    userCookie: 'user-session=secret',
    adminCookie: 'admin-session=secret',
    fixtureUserId: userId,
    destructiveConfirmation: `${DIAGNOSTIC_AUTH_FLOW_CONFIRMATION_PREFIX}wrong-user`,
    fetchImpl: completeFlowFetch(),
  }), /does not match the user UUID/);
});

test('live runner consent remains pinned to the application contract', () => {
  assert.match(deliverySource, new RegExp(`DIAGNOSTIC_CONSENT_VERSION = '${DIAGNOSTIC_AUTH_FLOW_CONSENT_VERSION}'`));
});
