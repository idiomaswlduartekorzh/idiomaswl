import assert from 'node:assert/strict';
import test from 'node:test';

import { parseDiagnosticObjectiveStageSubmitRequest } from '../src/lib/diagnostic/delivery.ts';

function validResponse(overrides = {}) {
  return {
    itemId: 'en-a1-reading-01-q1',
    contentVersion: 'pilot-1',
    response: { kind: 'single-choice', optionId: 'option-b' },
    responseMs: 1200,
    audioPlayCount: null,
    ...overrides,
  };
}

test('parses bounded objective submissions without interpreting their keys', () => {
  const result = parseDiagnosticObjectiveStageSubmitRequest({ attemptVersion: 1, responses: [validResponse()] });
  assert.deepEqual(result, { attemptVersion: 1, responses: [validResponse()] });
});

test('rejects duplicate ids, invalid timing, oversized text and malformed response variants', () => {
  assert.equal(parseDiagnosticObjectiveStageSubmitRequest({ attemptVersion: 1, responses: [validResponse(), validResponse()] }), null);
  assert.equal(parseDiagnosticObjectiveStageSubmitRequest({ attemptVersion: 1, responses: [validResponse({ responseMs: -1 })] }), null);
  assert.equal(parseDiagnosticObjectiveStageSubmitRequest({ attemptVersion: 1, responses: [validResponse({ audioPlayCount: 21 })] }), null);
  assert.equal(parseDiagnosticObjectiveStageSubmitRequest({ attemptVersion: 1, responses: [validResponse({ response: { kind: 'short-text', value: 'x'.repeat(501) } })] }), null);
  assert.equal(parseDiagnosticObjectiveStageSubmitRequest({ attemptVersion: 0, responses: [validResponse()] }), null);
  assert.equal(parseDiagnosticObjectiveStageSubmitRequest({ attemptVersion: 1, responses: [] }), null);
});

test('allows omissions and unique multi-select ids for server-side contract validation', () => {
  assert.ok(parseDiagnosticObjectiveStageSubmitRequest({
    attemptVersion: 3,
    responses: [validResponse({ response: { kind: 'single-choice', optionId: null }, responseMs: null })],
  }));
  assert.ok(parseDiagnosticObjectiveStageSubmitRequest({
    attemptVersion: 3,
    responses: [validResponse({ response: { kind: 'multiple-choice', optionIds: ['a', 'c'] } })],
  }));
  assert.equal(parseDiagnosticObjectiveStageSubmitRequest({
    attemptVersion: 3,
    responses: [validResponse({ response: { kind: 'multiple-choice', optionIds: ['a', 'a'] } })],
  }), null);
});

