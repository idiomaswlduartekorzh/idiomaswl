import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { hasSensitiveResultFields, validateIcfesAnswers } from '../src/lib/icfes/attempt-contract.ts';
import { parseIcfesWompiTransaction } from '../src/lib/icfes/payment-event.ts';

const read = (path) => readFileSync(path, 'utf8');

test('free result DTO rejects answer-key and rationale fields', () => {
  const safe = { correct: 2, total: 3, percentage: 67, byPart: [{ correct: 2, total: 3 }] };
  assert.equal(hasSensitiveResultFields(safe), false);
  for (const unsafe of [
    { answer: 1 }, { correctAnswer: 'B' }, { nested: { answers: { q1: 1 } } },
    { rationale: 'because' }, { explanation: 'because' },
  ]) assert.equal(hasSensitiveResultFields(unsafe), true);
});

test('response validation rejects unknown questions and manipulated choices', () => {
  const questions = [{ id: 'q1', options: ['A', 'B', 'C'] }, { id: 'q2', options: ['A', 'B'] }];
  assert.deepEqual(validateIcfesAnswers({ q1: 2, q2: 0 }, questions), { q1: 2, q2: 0 });
  assert.equal(validateIcfesAnswers({ forged: 0 }, questions), null);
  assert.equal(validateIcfesAnswers({ q1: 3 }, questions), null);
  assert.equal(validateIcfesAnswers({ q1: '1' }, questions), null);
});

test('public ICFES pages sanitize mock payloads before client rendering', () => {
  const ownPage = read('src/app/(site)/examenes/[exam]/practica/[mockId]/page.tsx');
  const officialPage = read('src/app/(site)/practica/icfes-saber-11/examenes/[examId]/page.tsx');
  const sanitizer = read('src/lib/icfes/exam-registry.server.ts');
  assert.match(ownPage, /mock=\{sanitizeIcfesMock\(mock\)\}/);
  assert.match(officialPage, /sanitizeIcfesMock\(simulacroToMockExam\(sim\)\)/);
  assert.match(sanitizer, /delete publicQuestion\.answer/);
  assert.match(sanitizer, /insights: undefined/);
});

test('secure grade route validates signed attempt, exam binding, and returns only basic DTO', () => {
  const route = read('src/app/api/icfes/attempts/grade/route.ts');
  assert.match(route, /verifyIcfesAttemptToken\(body\.attemptToken, examId\)/);
  assert.match(route, /validateIcfesAnswers\(body\.responses, questions\)/);
  assert.match(route, /json\(\{ ok: true, result \}\)/);
  assert.doesNotMatch(route, /json\([^\n]*(answers|rationale|explanation)/i);
});

test('score is shown before an explicitly optional, consented lead form', () => {
  const runner = read('src/app/(site)/examenes/[exam]/practica/[mockId]/PracticeClient.tsx');
  const score = runner.indexOf('data-testid="icfes-free-result"');
  const lead = runner.indexOf('Tu resultado ya está visible. Dejar tus datos es opcional.');
  assert.ok(score >= 0 && lead > score);
  assert.match(runner, /checked=\{consent\}/);
  assert.match(runner, /if \(!consent/);
  assert.match(runner, /data-testid="icfes-free-result" data-active-practice="true"/);
});

test('official resources cannot reach checkout or premium detail', () => {
  const registry = read('src/lib/icfes/exam-registry.server.ts');
  const checkout = read('src/app/api/icfes/pass/checkout/route.ts');
  const detail = read('src/app/api/icfes/attempts/[attemptId]/detail/route.ts');
  assert.match(registry, /getIcfesPaidDetailAvailability\(examId\)/);
  assert.match(registry, /getSimulacroForPaidDetail\(examId\)/);
  assert.match(checkout, /if \(!availability\.eligible\)/);
  assert.match(detail, /!availability\.eligible \|\| !getIcfesPaidExam/);
});

test('checkout uses server price, signed cookie capability, user ownership, and no fake success', () => {
  const checkout = read('src/app/api/icfes/pass/checkout/route.ts');
  const config = read('src/lib/icfes/product-config.server.ts');
  assert.match(config, /ICFES_PASS_PRICE_COP = 49_900/);
  assert.match(config, /ICFES_PASE_ENABLED !== 'true'/);
  assert.match(config, /ICFES_PERSISTENCE_ENABLED === 'true'/);
  assert.match(checkout, /ICFES_ATTEMPT_COOKIE/);
  assert.match(checkout, /attempt\.user_id && attempt\.user_id !== user\?\.id/);
  assert.match(checkout, /createWompiIntegritySignature/);
  assert.doesNotMatch(checkout, /status:\s*'APPROVED'/);
  assert.match(read('src/app/(site)/examenes/[exam]/practica/[mockId]/PracticeClient.tsx'), /amount_cop: data\.amountInCents \/ 100/);
});

test('feature flags default off and private ownership never comes from the client', () => {
  const env = read('.env.example');
  const api = [
    'src/app/api/icfes/attempts/start/route.ts',
    'src/app/api/icfes/attempts/grade/route.ts',
    'src/app/api/icfes/attempts/[attemptId]/detail/route.ts',
    'src/app/api/icfes/pass/checkout/route.ts',
    'src/app/api/icfes/practice-progress/route.ts',
    'src/app/api/icfes/study-plan/route.ts',
  ].map(read).join('\n');
  assert.match(env, /^ICFES_PERSISTENCE_ENABLED=false$/m);
  assert.match(env, /^ICFES_PASE_ENABLED=false$/m);
  assert.doesNotMatch(api, /(?:body|payload|input)\.(?:user_id|userId)/);
  assert.match(api, /auth\.getUser\(\)/);
});

test('ICFES private tables have RLS and no browser-role grants or policies', () => {
  const migration = read('supabase/migrations/20260908170000_icfes_secure_attempts_and_pass.sql');
  for (const table of ['icfes_attempts', 'icfes_pass_orders', 'icfes_entitlements']) {
    assert.match(migration, new RegExp(`ALTER TABLE public\\.${table} ENABLE ROW LEVEL SECURITY`));
    assert.doesNotMatch(migration, new RegExp(`CREATE POLICY[\\s\\S]{0,160}(?:ON )?public\\.${table}`, 'i'));
  }
  assert.match(migration, /REVOKE ALL ON TABLE public\.icfes_attempts, public\.icfes_pass_orders, public\.icfes_entitlements FROM anon, authenticated, service_role/);
  assert.match(migration, /GRANT SELECT, INSERT, UPDATE ON TABLE public\.icfes_attempts, public\.icfes_pass_orders TO service_role/);
  assert.match(migration, /GRANT SELECT, INSERT ON TABLE public\.icfes_entitlements TO service_role/);
  assert.doesNotMatch(migration, /GRANT[^;]+TO (?:anon|authenticated)/i);
  assert.match(migration, /amount_in_cents bigint NOT NULL CHECK \(amount_in_cents = 4990000\)/);
});

test('Wompi parser rejects wrong references, amount types, and statuses', () => {
  const reference = 'WL-ICFES-123e4567-e89b-42d3-a456-426614174000-deadbeef';
  const good = { id: 'wompi-1', reference, amount_in_cents: 4990000, currency: 'COP', status: 'APPROVED' };
  assert.equal(parseIcfesWompiTransaction(good)?.attemptId, '123e4567-e89b-42d3-a456-426614174000');
  assert.equal(parseIcfesWompiTransaction({ ...good, reference: 'WL-TOEFL-x' }), null);
  assert.equal(parseIcfesWompiTransaction({ ...good, amount_in_cents: '4990000' }), null);
  assert.equal(parseIcfesWompiTransaction({ ...good, status: 'SUCCESS' }), null);
});

test('verified webhook is signature-bound, amount-bound and idempotently grants one entitlement', () => {
  const webhook = read('src/app/api/wompi/events/route.ts');
  const persistence = read('src/lib/icfes/payment-events.server.ts');
  const migration = read('supabase/migrations/20260908170000_icfes_secure_attempts_and_pass.sql');
  assert.match(webhook, /verifyWompiEventChecksum/);
  assert.match(webhook, /signature\.properties\.includes\('transaction\.id'\)/);
  assert.match(webhook, /persistVerifiedIcfesTransaction/);
  assert.match(persistence, /apiBaseUrl.*transactions/);
  assert.match(persistence, /Authorization: `Bearer \$\{input\.config\.publicKey\}`/);
  assert.match(persistence, /transaction\.amountInCents !== ICFES_PASS_AMOUNT_IN_CENTS/);
  assert.match(persistence, /order\.status === 'APPROVED' \? 'APPROVED'/);
  assert.match(persistence, /upsert\(/);
  assert.match(migration, /attempt_id uuid NOT NULL UNIQUE/);
});

test('commercial analytics use centralized names and exclude PII/answers', () => {
  const runner = read('src/app/(site)/examenes/[exam]/practica/[mockId]/PracticeClient.tsx');
  const paid = read('src/app/(site)/practica/icfes-saber-11/resultados/[attemptId]/IcfesPaidResultClient.tsx');
  for (const event of ['icfes_offer_view', 'icfes_paid_detail_intent', 'icfes_checkout_start']) assert.ok(runner.includes(`trackIcfesEvent('${event}'`));
  assert.ok(paid.includes("trackIcfesEvent('icfes_purchase_complete'"));
  assert.doesNotMatch(runner.match(/trackIcfesEvent\('icfes_(offer_view|paid_detail_intent|checkout_start)'[\s\S]{0,180}/g)?.join('') ?? '', /email|whatsapp|answer/);
});
