import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  disableIcfesPremiumAfterPersistenceFailure,
  hasSensitiveResultFields,
  ICFES_PREMIUM_PERSISTENCE_UNAVAILABLE_REASON,
  toIcfesPublicResult,
  validateIcfesAnswers,
} from '../src/lib/icfes/attempt-contract.ts';
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

test('the public result omits diagnostic breakdowns reserved for paid feedback', () => {
  const publicResult = toIcfesPublicResult({
    attemptId: '123e4567-e89b-42d3-a456-426614174000', examId: 'mock-01',
    correct: 2, total: 3, percentage: 67, byPart: [], bySkill: [],
    recommendation: { label: 'Reforzar', href: '/reforzar' }, officialResource: false, premiumEligible: true,
  });
  assert.equal('byPart' in publicResult, false);
  assert.equal('bySkill' in publicResult, false);
  assert.equal('recommendation' in publicResult, false);
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
  assert.match(route, /json\(\{ ok: true, result: responseResult \}\)/);
  assert.doesNotMatch(route, /json\([^\n]*(answers|rationale|explanation)/i);
});

test('a persistence outage preserves the basic result and explicitly disables premium', () => {
  const result = {
    attemptId: '123e4567-e89b-42d3-a456-426614174000',
    examId: 'mock-1',
    correct: 2,
    total: 3,
    percentage: 67,
    byPart: [],
    bySkill: [],
    recommendation: { label: 'Seguir practicando', href: '/practica/icfes-saber-11' },
    officialResource: false,
    premiumEligible: true,
  };
  const degraded = disableIcfesPremiumAfterPersistenceFailure(result);
  assert.notEqual(degraded, result);
  assert.equal(degraded.correct, result.correct);
  assert.equal(degraded.percentage, result.percentage);
  assert.equal(degraded.premiumEligible, false);
  assert.equal(degraded.premiumUnavailableReason, ICFES_PREMIUM_PERSISTENCE_UNAVAILABLE_REASON);
  assert.equal(result.premiumEligible, true, 'the original graded DTO must remain immutable');

  const alreadyUnavailable = { ...result, premiumEligible: false, premiumUnavailableReason: 'Revisión jurídica pendiente.' };
  assert.equal(disableIcfesPremiumAfterPersistenceFailure(alreadyUnavailable), alreadyUnavailable);
});

test('the grade route fails open only for the basic result and does not mint a premium capability', () => {
  const route = read('src/app/api/icfes/attempts/grade/route.ts');
  const runner = read('src/app/(site)/examenes/[exam]/practica/[mockId]/PracticeClient.tsx');
  assert.match(route, /persisted = await persistIcfesAttempt/);
  assert.match(route, /persisted \? publicResult : disableIcfesPremiumAfterPersistenceFailure\(publicResult\)/);
  assert.match(route, /toIcfesPublicResult\(result\)/);
  assert.match(route, /if \(persisted\) \{\s*response\.cookies\.set\(icfesAttemptCookieName\(payload\.attemptId\), resultAccessToken/);
  assert.doesNotMatch(route, /secure persistence failed:[\s\S]{0,180}return json\(/);
  assert.match(runner, /data-testid="icfes-premium-unavailable"/);
  assert.match(runner, /<p>\{result\.premiumUnavailableReason\}<\/p>/);
});

test('commercial persistence records the approved privacy contract and age assurance', () => {
  const grade = read('src/app/api/icfes/attempts/grade/route.ts');
  const persistence = read('src/lib/icfes/grading.server.ts');
  const runner = read('src/app/(site)/examenes/[exam]/practica/[mockId]/PracticeClient.tsx');
  assert.match(grade, /ADULT_ATTESTED/);
  assert.match(grade, /MINOR_GUARDIAN_ATTESTED/);
  assert.match(grade, /if \(!ageAssurance\) throw new Error/);
  assert.match(persistence, /from\('icfes_privacy_contracts'\)[\s\S]+\.eq\('status', 'APPROVED'\)\.limit\(2\)/);
  assert.match(persistence, /contracts\.length !== 1/);
  assert.match(persistence, /privacy_contract_version: contracts\[0\]\.version/);
  assert.match(persistence, /guardian_attested_at:/);
  assert.match(runner, /FREE_ONLY/);
  assert.match(runner, /ageAssurance: icfesPrivacyChoice/);
});

test('private ICFES results use layered noindex, noarchive and no-store controls', () => {
  const page = read('src/app/(site)/practica/icfes-saber-11/resultados/[attemptId]/page.tsx');
  const detail = read('src/app/api/icfes/attempts/[attemptId]/detail/route.ts');
  const nextConfig = read('next.config.ts');
  assert.match(page, /robots: \{ index: false, follow: false, noarchive: true \}/);
  assert.match(detail, /'cache-control': 'private, no-store, max-age=0'/);
  assert.match(detail, /'x-robots-tag': 'noindex, nofollow, noarchive'/);
  assert.match(nextConfig, /source: '\/practica\/icfes-saber-11\/resultados\/:attemptId'[\s\S]{0,360}X-Robots-Tag'[\s\S]{0,80}'noindex, nofollow, noarchive'/);
});

test('score is shown before an explicitly optional, consented lead form', () => {
  const runner = read('src/app/(site)/examenes/[exam]/practica/[mockId]/PracticeClient.tsx');
  const score = runner.indexOf('data-testid="icfes-free-result"');
  const lead = runner.indexOf('Tu resultado ya está visible. Dejar tus datos es opcional.');
  assert.ok(score >= 0 && lead > score);
  assert.match(runner, /checked=\{consent\}/);
  assert.match(runner, /if \(!consent/);
  assert.match(runner, /data-testid="icfes-free-result" data-active-practice="true"/);
  assert.doesNotMatch(runner, /Desglose por parte|Habilidades observadas/);
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
  assert.match(config, /ICFES_PASS_PRICE_COP = ICFES_DETAIL_PRICE_COP/);
  assert.match(read('src/lib/icfes/commerce-v1.ts'), /ICFES_DETAIL_PRICE_COP = 12_900/);
  assert.match(config, /ICFES_PASE_ENABLED !== 'true'/);
  assert.match(config, /ICFES_PERSISTENCE_ENABLED === 'true'/);
  assert.match(checkout, /icfesAttemptCookieName\(attemptId\)/);
  assert.match(checkout, /attempt\.user_id && attempt\.user_id !== user\?\.id/);
  assert.match(checkout, /claimIcfesAttemptForUser\(\{ attemptId, token, userId: user\.id \}\)/);
  assert.match(checkout, /createWompiIntegritySignature/);
  assert.doesNotMatch(checkout, /status:\s*'APPROVED'/);
  assert.match(read('src/app/(site)/examenes/[exam]/practica/[mockId]/PracticeClient.tsx'), /amount_cop: data\.amountInCents \/ 100/);
});

test('post-result commercial ladder exposes the three reviewed choices with recurring membership disclosure', () => {
  const runner = read('src/app/(site)/examenes/[exam]/practica/[mockId]/PracticeClient.tsx');
  const register = read('src/app/(auth)/registro/page.tsx');
  assert.match(runner, /ICFES_DETAIL_OFFER\.amountInCents/);
  assert.match(runner, /ICFES_AUTO_OFFER\.amountInCents/);
  assert.match(runner, /ICFES_TEACHER_OFFER\.amountInCents/);
  assert.match(runner, /feedback pedagógico personalizado de WeLearn con asistencia de IA por periodo/);
  assert.match(runner, /RENOVACIÓN AUTOMÁTICA/);
  assert.match(runner, /plan=exam-auto/);
  assert.match(runner, /plan=exam-teacher/);
  assert.match(register, /parseRegistrationIntent\(await searchParams\)/);
  assert.match(register, /initialIntent=\{initialIntent\}/);
});

test('an active ICFES membership includes owned attempt detail and prevents a second one-time charge', () => {
  const detail = read('src/app/api/icfes/attempts/[attemptId]/detail/route.ts');
  const checkout = read('src/app/api/icfes/pass/checkout/route.ts');
  for (const source of [detail, checkout]) {
    assert.match(source, /activeXpressMembership/);
    assert.match(source, /membership\?\.exam_slug === 'icfes'|active\?\.exam_slug === 'icfes'/);
    assert.match(source, /xpressOfferIncludes\([^\n]+, 'question-review'\)/);
  }
  assert.match(detail, /userOwnsAttempt/);
  assert.match(detail, /productCode: membership\.offer_id/);
  assert.doesNotMatch(detail, /if \(!capabilityMatches\) \{[\s\S]{0,180}membresía activa/);
  assert.match(detail, /icfes_entitlements/);
  assert.match(checkout, /amountInCents: 0/);
  assert.match(checkout, /paymentStatus: 'APPROVED'/);
});

test('persisted attempts receive separate 30-day result capabilities instead of one six-hour shared cookie', () => {
  const tokens = read('src/lib/icfes/attempt-token.server.ts');
  const grade = read('src/app/api/icfes/attempts/grade/route.ts');
  assert.match(tokens, /ICFES_RESULT_ACCESS_DAYS = 30/);
  assert.match(tokens, /return `wl_icfes_attempt_\$\{attemptId\}`/);
  assert.match(grade, /createIcfesResultAccessToken\(payload\.attemptId, examId\)/);
  assert.match(grade, /maxAge: ICFES_RESULT_ACCESS_DAYS \* 24 \* 60 \* 60/);
  assert.match(grade, /token: resultAccessToken/);
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
  const base = read('supabase/migrations/20260908170000_icfes_secure_attempts_and_pass.sql');
  const foundation = read('supabase/migrations/20260909170000_icfes_privacy_foundation.sql');
  const migration = `${base}\n${foundation}`;
  for (const table of [
    'icfes_privacy_contracts', 'icfes_attempts', 'icfes_pass_orders', 'icfes_entitlements',
    'icfes_data_subject_requests',
  ]) {
    assert.match(migration, new RegExp(`alter table public\\.${table} enable row level security`, 'i'));
    assert.doesNotMatch(migration, new RegExp(`CREATE POLICY[\\s\\S]{0,160}(?:ON )?public\\.${table}`, 'i'));
  }
  assert.match(base, /GRANT SELECT, INSERT, UPDATE ON TABLE public\.icfes_attempts, public\.icfes_pass_orders TO service_role/);
  assert.match(foundation, /revoke update on table public\.icfes_attempts from service_role/i);
  assert.match(foundation, /grant update\s*\(\s*user_id\s*,\s*updated_at\s*\)\s+on table public\.icfes_attempts to service_role/i);
  assert.match(base, /GRANT SELECT, INSERT ON TABLE public\.icfes_entitlements TO service_role/);
  assert.doesNotMatch(migration, /GRANT[^;]+TO (?:anon|authenticated)/i);
  const repair = read('supabase/migrations/20260912170000_icfes_detail_price_reconciliation.sql');
  assert.match(repair, /check \(amount_in_cents = 1290000\) not valid/);
  assert.match(foundation, /check\s*\(\s*product_code\s*=\s*'icfes-detail-attempt-v1'\s*\)\s+not valid/i);
});

test('Wompi parser rejects wrong references, amount types, and statuses', () => {
  const reference = 'WL-ICFES-123e4567-e89b-42d3-a456-426614174000-deadbeef';
  const good = { id: 'wompi-1', reference, amount_in_cents: 1290000, currency: 'COP', status: 'APPROVED' };
  assert.equal(parseIcfesWompiTransaction(good)?.attemptId, '123e4567-e89b-42d3-a456-426614174000');
  assert.equal(parseIcfesWompiTransaction({ ...good, reference: 'WL-TOEFL-x' }), null);
  assert.equal(parseIcfesWompiTransaction({ ...good, amount_in_cents: '1290000' }), null);
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
  assert.ok(
    persistence.indexOf("rpc('queue_icfes_payment_reconciliation'") < persistence.indexOf('apiBaseUrl}/transactions/'),
    'the signed result redirect must durably queue reconciliation before the provider fetch',
  );
  assert.match(persistence, /wompiPrivateAuthorization\(input\.config\)/);
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
