import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  ICFES_COMMERCIAL_OFFERS,
  ICFES_PERSONALIZED_FEEDBACK_BENEFIT,
  icfesOfferIncludes,
} from '../src/lib/icfes/commercial-contract.ts';
import { getXpressOffersForExam } from '../src/lib/xpress-commerce/catalog.ts';
import {
  ICFES_LEAD_CONSENT_VERSION,
  ICFES_PRIVACY_VERSION,
  ICFES_TERMS_VERSION,
} from '../src/lib/icfes/terms.ts';

const read = (file) => readFileSync(file, 'utf8');

test('ICFES has exactly the reviewed three-tier contract', () => {
  assert.deepEqual(ICFES_COMMERCIAL_OFFERS.map((offer) => ({
    code: offer.productCode,
    amountInCents: offer.amountInCents,
    billing: offer.billing,
  })), [
    { code: 'icfes-single-report-v1', amountInCents: 1_290_000, billing: 'single-exam' },
    { code: 'icfes-membership-v1', amountInCents: 4_990_000, billing: 'recurring-30-days' },
    { code: 'icfes-intensive-v1', amountInCents: 9_990_000, billing: 'recurring-30-days' },
  ]);
  assert.equal(ICFES_COMMERCIAL_OFFERS[2].benefits.includes(ICFES_PERSONALIZED_FEEDBACK_BENEFIT), true);
});

test('personalized feedback entitlement is exclusive and fail-closed', () => {
  assert.equal(icfesOfferIncludes('exam-single', 'personalized-feedback'), false);
  assert.equal(icfesOfferIncludes('exam-auto', 'personalized-feedback'), false);
  assert.equal(icfesOfferIncludes('exam-teacher', 'personalized-feedback'), true);
  const detail = read('src/app/api/icfes/attempts/[attemptId]/detail/route.ts');
  assert.match(detail, /productCode === 'icfes-intensive-v1'/);
  assert.doesNotMatch(detail, /personalizedFeedback:\s*buildIcfesPersonalizedFeedback/);
  const feedback = read('src/lib/icfes/personalized-feedback.server.ts');
  assert.match(feedback, /if \(!icfesOfferIncludes\(input\.offerId, 'personalized-feedback'\)\) return null/);
  assert.match(feedback, /inputDigest/);
  assert.match(feedback, /feedbackId/);
});

test('ICFES overrides do not mutate the generic Xpress catalog', () => {
  assert.deepEqual(getXpressOffersForExam('icfes').map(({ amountInCents }) => amountInCents), [1_290_000, 4_990_000, 9_990_000]);
  assert.deepEqual(getXpressOffersForExam('ielts').map(({ amountInCents }) => amountInCents), [1_290_000, 4_990_000, 9_990_000]);
  assert.ok(getXpressOffersForExam('icfes')[2].entitlements.includes('personalized-feedback'));
  assert.ok(!getXpressOffersForExam('icfes')[2].entitlements.includes('teacher-feedback-24h'));
});

test('post-exam DTOs minimize free data and keep grade response opaque', () => {
  const contract = read('src/lib/icfes/attempt-contract.ts');
  const grade = read('src/app/api/icfes/attempts/grade/route.ts');
  const free = read('src/app/api/icfes/attempts/[attemptId]/free-summary/route.ts');
  assert.match(grade, /const receipt: IcfesGradeReceiptDto/);
  assert.match(grade, /freeSummary: toIcfesFreeSummary\(result\)/);
  assert.doesNotMatch(grade, /json\(\{ ok: true, result \}\)/);
  assert.match(contract, /toIcfesFreeSummary/);
  assert.match(free, /toIcfesFreeSummary\(attempt\.result\)/);
  assert.doesNotMatch(read('src/components/icfes/IcfesLeadOfferFlow.tsx'), /freeResult\.byPart|freeResult\.bySkill|freeResult\.recommendation/);
});

test('private detail requires the lead capability and never returns results before entitlement', () => {
  const detail = read('src/app/api/icfes/attempts/[attemptId]/detail/route.ts');
  assert.match(detail, /verifyIcfesLeadToken/);
  assert.match(detail, /const entitled = paymentStatus === 'APPROVED' && productCode !== null/);
  assert.match(detail, /result: entitled \? attempt\.result : null/);
});

test('lead and purchase consent are versioned and recorded without PII in the consent ledger', () => {
  assert.match(ICFES_LEAD_CONSENT_VERSION, /^icfes-lead-contact-/);
  assert.match(ICFES_PRIVACY_VERSION, /^icfes-privacy-/);
  assert.match(ICFES_TERMS_VERSION, /^icfes-terms-/);
  const lead = read('src/app/api/icfes/attempts/[attemptId]/lead/route.ts');
  const migration = read('supabase/migrations/20260912194500_icfes_lead_consent_ledger.sql');
  assert.match(lead, /icfes_lead_consents/);
  assert.match(lead, /notice_sha256/);
  assert.match(lead, /contact_sha256/);
  assert.doesNotMatch(migration, /\bemail\b|\bwhatsapp\b/i);
  assert.match(migration, /BEFORE UPDATE/);
  assert.match(migration, /ENABLE ROW LEVEL SECURITY/);
});

test('privacy and payment configuration fail closed and default to Sandbox', () => {
  const env = read('.env.example');
  const config = read('src/lib/icfes/product-config.server.ts');
  assert.match(env, /^ICFES_PERSISTENCE_ENABLED=false$/m);
  assert.match(env, /^ICFES_PRIVACY_POLICY_VERSION=$/m);
  assert.match(env, /^ICFES_PASE_ENABLED=false$/m);
  assert.match(env, /^ICFES_WOMPI_SANDBOX_ONLY=true$/m);
  assert.match(config, /ICFES_PRIVACY_POLICY_VERSION === ICFES_PRIVACY_VERSION/);
  assert.match(read('src/lib/icfes/commercial-contract.ts'), /icfes_wompi_sandbox_only/);
  const subscriptions = read('src/lib/xpress-commerce/subscriptions.server.ts');
  assert.match(subscriptions, /if \(!isIcfesPassEnabled\(\)\) throw new Error\('icfes_commerce_disabled'\)/);
});

test('private commercial UI is noindex, responsive, and uses the exact automated benefit', () => {
  const page = read('src/app/(site)/suscripcion/examenes/page.tsx');
  const flow = read('src/components/icfes/IcfesLeadOfferFlow.tsx');
  const membership = read('src/app/(site)/suscripcion/examenes/XpressMembershipClient.tsx');
  const css = read('src/components/icfes/IcfesLeadOfferFlow.module.css');
  assert.match(page, /robots: \{ index: false, follow: false \}/);
  assert.ok(membership.includes(ICFES_PERSONALIZED_FEEDBACK_BENEFIT));
  assert.doesNotMatch(flow, /24 horas|profesor|docente/i);
  assert.match(css, /@media \(max-width:/);
});
