import assert from 'node:assert/strict';
import test from 'node:test';

import { DIAGNOSTIC_CONSENT_VERSION } from '../src/lib/diagnostic/delivery.ts';
import {
  DiagnosticWritingProviderError,
  getDiagnosticWritingProviderReadiness,
  requestDiagnosticWritingEvaluation,
} from '../src/server/diagnostic/writing-provider.ts';

const prompt = {
  id: 'en-b1-writing-original-01', contentVersion: 'fixture-v1', language: 'en', levelCandidate: 'B1',
  title: 'Community proposal', situation: 'Write to a local coordinator.',
  instructions: ['Explain the problem.', 'Suggest a practical response.'],
  minimumWords: 80, maximumWords: 180, recommendedMinutes: 20,
};
const responseText = 'The library closes too early for students who work. I suggest opening until eight on Tuesdays because many of us finish work at six. Volunteers could cover the final hour, and the council could review attendance after one month.';
const rawOutput = {
  criteria: [
    { criterion: 'task-fulfilment', level: 'B1', confidence: 0.72, evidence: ['I suggest opening until eight on Tuesdays'], rationale: 'The response explains the problem and supplies a relevant practical proposal.' },
    { criterion: 'organisation', level: 'B1', confidence: 0.68, evidence: ['because many of us finish work at six'], rationale: 'The short response links its proposal to a clear reason and then adds implementation detail.' },
    { criterion: 'grammar-control', level: 'B1', confidence: 0.7, evidence: ['Volunteers could cover the final hour'], rationale: 'The learner controls frequent clause patterns and a modal construction without obscuring meaning.' },
    { criterion: 'vocabulary-control', level: 'B1', confidence: 0.66, evidence: ['the council could review attendance'], rationale: 'The lexical choices are suitable for a familiar civic proposal and communicate the intended action.' },
  ],
  warnings: ['Short sample; confidence remains provisional.'],
};

function readyEnv(provider = 'groq') {
  return {
    DIAGNOSTIC_WRITING_AUTOMATION_ENABLED: 'true',
    DIAGNOSTIC_EXTERNAL_WRITING_PROCESSING_APPROVED: 'true',
    DIAGNOSTIC_WRITING_PROVIDER_POLICY_APPROVED: 'true',
    DIAGNOSTIC_WRITING_PROVIDER: provider,
    DIAGNOSTIC_WRITING_MODEL: provider === 'groq' ? 'openai/gpt-oss-120b' : 'gemini-3.5-flash',
    DIAGNOSTIC_EXTERNAL_WRITING_CONSENT_VERSION: 'diagnostic-external-writing-2026-09-25',
    DIAGNOSTIC_WRITING_PROVIDER_POLICY_VERSION: 'provider-dpa-2026-09-25',
    GROQ_API_KEY: 'test-groq-key',
    GEMINI_API_KEY: 'test-gemini-key',
  };
}

const authorization = {
  externalProcessingConsent: true,
  consentVersion: 'diagnostic-external-writing-2026-09-25',
  providerPolicyVersion: 'provider-dpa-2026-09-25',
  consentedAt: '2026-09-23T17:00:00.000Z',
};

function providerResponse(provider, output = rawOutput, status = 200) {
  return new Response(JSON.stringify(provider === 'groq'
    ? { choices: [{ message: { content: JSON.stringify(output) } }] }
    : { candidates: [{ content: { parts: [{ text: JSON.stringify(output) }] } }] }), {
    status, headers: { 'content-type': 'application/json' },
  });
}

test('readiness fails closed and the current pilot consent cannot authorize external processing', () => {
  const disabled = getDiagnosticWritingProviderReadiness({});
  assert.equal(disabled.ready, false);
  assert.ok(disabled.blockers.includes('automation-disabled'));
  assert.ok(disabled.blockers.includes('external-processing-not-approved'));
  assert.ok(disabled.blockers.includes('provider-policy-not-approved'));
  assert.ok(disabled.blockers.includes('api-key-missing'));

  const reusedConsent = getDiagnosticWritingProviderReadiness({
    ...readyEnv(), DIAGNOSTIC_EXTERNAL_WRITING_CONSENT_VERSION: DIAGNOSTIC_CONSENT_VERSION,
  });
  assert.equal(reusedConsent.ready, false);
  assert.ok(reusedConsent.blockers.includes('external-consent-version-not-distinct'));
  const unsupportedGroq = getDiagnosticWritingProviderReadiness({
    ...readyEnv(), DIAGNOSTIC_WRITING_MODEL: 'unreviewed/model',
  });
  assert.ok(unsupportedGroq.blockers.includes('provider-model-not-supported'));
});

test('no request leaves the server when either operational approval or attempt authorization is missing', async () => {
  let fetchCount = 0;
  const fetch = async () => { fetchCount += 1; return providerResponse('groq'); };
  await assert.rejects(requestDiagnosticWritingEvaluation({ prompt, responseText, authorization }, {
    env: { ...readyEnv(), DIAGNOSTIC_EXTERNAL_WRITING_PROCESSING_APPROVED: 'false' }, fetch,
  }), error => error instanceof DiagnosticWritingProviderError && error.code === 'PROVIDER_NOT_READY');
  await assert.rejects(requestDiagnosticWritingEvaluation({
    prompt, responseText,
    authorization: { ...authorization, consentVersion: 'wrong-consent' },
  }, { env: readyEnv(), fetch }), error => error instanceof DiagnosticWritingProviderError && error.code === 'PROCESSING_NOT_AUTHORIZED');
  await assert.rejects(requestDiagnosticWritingEvaluation({
    prompt, responseText: 'x'.repeat(12_001), authorization,
  }, {
    env: readyEnv(), fetch, now: () => new Date('2026-09-25T18:00:00.000Z'),
  }), error => error instanceof DiagnosticWritingProviderError && error.code === 'REQUEST_INVALID');
  await assert.rejects(requestDiagnosticWritingEvaluation({
    prompt, responseText,
    authorization: { ...authorization, consentedAt: '2026-09-26T00:00:00.000Z' },
  }, {
    env: readyEnv(), fetch, now: () => new Date('2026-09-25T18:00:00.000Z'),
  }), error => error instanceof DiagnosticWritingProviderError && error.code === 'PROCESSING_NOT_AUTHORIZED');
  assert.equal(fetchCount, 0);
});

test('Groq transport sends the CEFR-native contract and server-seals provider evidence', async () => {
  let requestBody;
  const evaluation = await requestDiagnosticWritingEvaluation({ prompt, responseText, authorization }, {
    env: readyEnv('groq'),
    now: () => new Date('2026-09-25T18:00:00.000Z'),
    fetch: async (url, init) => {
      assert.equal(url, 'https://api.groq.com/openai/v1/chat/completions');
      assert.equal(init.headers.authorization, 'Bearer test-groq-key');
      requestBody = JSON.parse(init.body);
      return providerResponse('groq');
    },
  });
  assert.match(requestBody.messages[0].content, /WeLearn CEFR writing diagnostic rubric/);
  assert.doesNotMatch(JSON.stringify(requestBody), /overallBand|IELTS band|TOEFL score/iu);
  assert.equal(requestBody.response_format.type, 'json_schema');
  assert.equal(requestBody.response_format.json_schema.strict, true);
  assert.equal(requestBody.response_format.json_schema.schema.type, 'object');
  assert.equal(evaluation.model, 'groq/openai/gpt-oss-120b');
  assert.equal(evaluation.promptId, prompt.id);
  assert.equal(evaluation.evaluatedAt, '2026-09-25T18:00:00.000Z');
});

test('Gemini transport uses schema-constrained JSON without exposing its API key in the URL', async () => {
  let requestBody;
  const evaluation = await requestDiagnosticWritingEvaluation({ prompt, responseText, authorization }, {
    env: readyEnv('gemini'),
    fetch: async (url, init) => {
      assert.equal(url, 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent');
      assert.equal(String(url).includes('test-gemini-key'), false);
      assert.equal(init.headers['x-goog-api-key'], 'test-gemini-key');
      requestBody = JSON.parse(init.body);
      return providerResponse('gemini');
    },
  });
  assert.equal(requestBody.generationConfig.responseFormat.text.mimeType, 'application/json');
  assert.equal(requestBody.generationConfig.responseFormat.text.schema.type, 'object');
  assert.equal(evaluation.model, 'gemini/gemini-3.5-flash');
});

test('provider failures and malformed or ungrounded output fail closed', async () => {
  for (const [response, expectedCode] of [
    [new Response('', { status: 429 }), 'RATE_LIMITED'],
    [new Response('unavailable', { status: 503 }), 'PROVIDER_UNAVAILABLE'],
    [new Response('{', { status: 200 }), 'PROVIDER_RESPONSE_INVALID'],
    [providerResponse('groq', { ...rawOutput, criteria: rawOutput.criteria.map((criterion, index) => index === 0
      ? { ...criterion, evidence: ['Invented sentence.'] } : criterion) }), 'PROVIDER_RESPONSE_INVALID'],
  ]) {
    await assert.rejects(requestDiagnosticWritingEvaluation({ prompt, responseText, authorization }, {
      env: readyEnv(), fetch: async () => response,
    }), error => error instanceof DiagnosticWritingProviderError && error.code === expectedCode);
  }
});
