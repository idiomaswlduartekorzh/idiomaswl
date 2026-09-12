import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { IELTS_ANALYTICS_EVENTS, trackIeltsEvent } from '../src/lib/analytics/ielts.ts';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('IELTS analytics covers the current report and future paid-report funnel', () => {
  for (const event of [
    'ielts_mock_start', 'ielts_mock_complete', 'ielts_lead_submit', 'ielts_report_view',
    'ielts_human_review_pending', 'ielts_offer_view', 'ielts_paid_report_intent',
    'ielts_checkout_start', 'ielts_purchase_complete',
  ]) assert.ok(IELTS_ANALYTICS_EVENTS.includes(event));
});

test('IELTS analytics strips contact data, answers, essays and audio fields', () => {
  const previousWindow = globalThis.window;
  globalThis.window = { dataLayer: [], location: { pathname: '/examenes/ielts/practica/set-8' } };
  try {
    trackIeltsEvent('ielts_lead_submit', {
      mock_id: 'set-8', email: 'student@example.com', whatsapp: '3001234567',
      answer_payload: 'A', essay_text: 'private', audio_url: 'private', page_path: '/forged',
    });
    assert.deepEqual(globalThis.window.dataLayer, [{
      event: 'ielts_lead_submit', exam: 'ielts-academic', event_schema_version: 1,
      page_path: '/examenes/ielts/practica/set-8', mock_id: 'set-8',
    }]);
  } finally {
    globalThis.window = previousWindow;
  }
});

test('the shared IELTS runner captures the lead before showing the band report', () => {
  const runner = read('src/app/(site)/examenes/[exam]/practica/[mockId]/IELTSPracticeClient.tsx');
  const submission = read('src/components/exam-runner/IELTSSubmission.tsx');
  assert.match(submission, /await saveLead\(/u);
  assert.match(submission, /if \(!leadResult\.ok\)[\s\S]*throw new Error/u);
  assert.match(runner, /setPhase\('results'\)/u);
  assert.match(runner, /trackIeltsEvent\('ielts_lead_submit'[\s\S]{0,800}setPhase\('results'\)/u);
  assert.match(runner, /<IELTSSummaryReport/u);
  assert.match(runner, /studentName=\{studentName\}/u);
  assert.match(runner, /overallBand=\{null\}/u);
});
