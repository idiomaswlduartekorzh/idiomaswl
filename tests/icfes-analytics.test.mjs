import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  ICFES_ANALYTICS_EVENTS,
  trackIcfesEvent,
} from '../src/lib/analytics/icfes.ts';

const read = (path) => readFileSync(path, 'utf8');

test('the ICFES event contract covers value and future paid-detail milestones', () => {
  for (const event of [
    'icfes_hub_view',
    'icfes_cta_click',
    'icfes_practice_start',
    'icfes_practice_complete',
    'icfes_guided_simulator_start',
    'icfes_guided_simulator_complete',
    'icfes_mock_start',
    'icfes_mock_complete',
    'icfes_report_view',
    'icfes_study_plan_generated',
    'icfes_lead_submit',
    'icfes_whatsapp_click',
    'icfes_offer_view',
    'icfes_paid_detail_intent',
    'icfes_checkout_start',
    'icfes_purchase_complete',
  ]) assert.ok(ICFES_ANALYTICS_EVENTS.includes(event), `Missing ${event}`);
});

test('the client tracker strips contact data and answer payloads', () => {
  const previousWindow = globalThis.window;
  globalThis.window = { dataLayer: [], location: { pathname: '/examenes/icfes' } };
  try {
    trackIcfesEvent('icfes_lead_submit', {
      mock_id: 'mock-01',
      email: 'student@example.com',
      user_email: 'student@example.com',
      whatsapp: '3001234567',
      name: 'Student Name',
      selected_answer: 'A',
      page_path: '/forged-path',
    });
    assert.deepEqual(globalThis.window.dataLayer, [{
      event: 'icfes_lead_submit',
      exam: 'icfes-saber-11',
      event_schema_version: 1,
      page_path: '/examenes/icfes',
      mock_id: 'mock-01',
    }]);
  } finally {
    globalThis.window = previousWindow;
  }
});

test('the primary and learning hubs install the lightweight analytics scope', () => {
  const examHub = read('src/app/(site)/examenes/[exam]/page.tsx');
  const learningLayout = read('src/app/(site)/practica/icfes-saber-11/layout.tsx');
  assert.match(examHub, /exam\.mocks\.length \+ 1/);
  assert.match(examHub, /hasGuidedMock\(mock\.id\) \|\| hasGuidedWorkbook\(mock\.id\)/);
  assert.match(examHub, /IcfesAnalyticsScope viewKind="exam-hub" resourceCount=\{icfesResourceCount\} modeCount=\{icfesModeCount\}/);
  assert.match(learningLayout, /IcfesAnalyticsScope viewKind="learning-cluster"/);
});

test('real ICFES milestones call the shared event contract', () => {
  const practiceEngine = read('src/app/(site)/practica/icfes-saber-11/_components/IcfesPartPracticeEngine.tsx');
  const examRunner = read('src/app/(site)/examenes/[exam]/practica/[mockId]/PracticeClient.tsx');
  const plan = read('src/app/(site)/practica/icfes-saber-11/plan-de-estudio/StudyPlanClient.tsx');
  const whatsapp = read('src/components/WhatsAppAttribution.tsx');

  assert.match(practiceEngine, /trackIcfesEvent\(context === 'guided-simulator' \? 'icfes_guided_simulator_start' : 'icfes_practice_start'/);
  assert.match(practiceEngine, /trackIcfesEvent\('icfes_report_view'/);
  for (const event of ['icfes_mock_start', 'icfes_mock_complete', 'icfes_lead_submit', 'icfes_report_view']) {
    assert.ok(examRunner.includes(`trackIcfesEvent('${event}'`), `Exam runner is missing ${event}`);
  }
  assert.match(plan, /trackIcfesEvent\('icfes_study_plan_generated'/);
  assert.match(whatsapp, /trackIcfesEvent\('icfes_whatsapp_click'/);
});

test('commercial events are documented as verified and PII-free', () => {
  const guide = read('docs/icfes-analytics-instrumentation.md');
  assert.match(guide, /ICFES_PASE_ENABLED=true/);
  assert.match(guide, /endpoint privado confirma una orden `APPROVED` y su entitlement/);
  assert.match(guide, /No se envían email, teléfono, respuestas/);
});

test('the reusable report cannot label an ICFES result above B1', () => {
  const report = read('src/components/ExamReport.tsx');
  const icfesBranch = report.match(/if \(slug === 'icfes'\) \{[\s\S]*?\n  \}/)?.[0] ?? '';
  assert.match(icfesBranch, /Nivel B1/);
  assert.doesNotMatch(icfesBranch, /Nivel B2|Nivel C1|Nivel C2/);
});
