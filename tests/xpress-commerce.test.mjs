import assert from 'node:assert/strict';
import test from 'node:test';
import {
  XPRESS_OFFERS,
  quoteXpressPurchase,
  xpressAccessEndsAt,
  xpressOfferIncludes,
} from '../src/lib/xpress-commerce/catalog.ts';
import {
  parseRegistrationIntent,
  registrationCompletionPath,
  registrationIntentMetadata,
  xpressClassPurchasePath,
} from '../src/lib/student-onboarding/catalog.ts';
import { parseXpressOrderInput, parseXpressProviderPayment, parseXpressSubscriptionForm } from '../src/lib/xpress-commerce/payment.ts';
import { XPRESS_PRIVACY_VERSION, XPRESS_RECURRING_CONSENT_VERSION, XPRESS_TERMS_VERSION } from '../src/lib/xpress-commerce/terms.ts';
import { buildXpressRecurringTransaction } from '../src/lib/xpress-commerce/recurring.ts';

test('publishes one exam purchase and two memberships in COP cents', () => {
  assert.deepEqual(XPRESS_OFFERS.map(({ id, amountInCents }) => [id, amountInCents]), [
    ['exam-single', 1_290_000],
    ['exam-auto', 4_990_000],
    ['exam-teacher', 9_990_000],
  ]);
  assert.equal(XPRESS_OFFERS[2].name, 'Exámenes + feedback personalizado');
  assert.equal(XPRESS_OFFERS[0].billing, 'single-exam');
  assert.deepEqual(XPRESS_OFFERS.slice(1).map((offer) => offer.billing), ['recurring-30-days', 'recurring-30-days']);
});

test('accepts recurring consent and only Wompi card tokens for memberships', () => {
  const form = new FormData();
  form.set('idempotency_key', '12345678-1234-4234-8234-123456789012');
  form.set('exam_slug', 'ielts');
  form.set('offer_id', 'exam-auto');
  form.set('accepted_terms', XPRESS_TERMS_VERSION);
  form.set('accepted_privacy', XPRESS_PRIVACY_VERSION);
  form.set('accepted_recurring', XPRESS_RECURRING_CONSENT_VERSION);
  form.set('accepted_wompi', 'yes');
  form.set('payment_source_token', 'tok_test_1234567890');
  form.set('payment_source_type', 'CARD');
  assert.equal(parseXpressSubscriptionForm(form)?.offerId, 'exam-auto');
  form.set('offer_id', 'exam-single');
  assert.equal(parseXpressSubscriptionForm(form), null);
  form.set('offer_id', 'exam-auto');
  form.set('accepted_recurring', 'no');
  assert.equal(parseXpressSubscriptionForm(form), null);
  form.set('accepted_recurring', XPRESS_RECURRING_CONSENT_VERSION);
  form.set('payment_source_token', '4242424242424242');
  assert.equal(parseXpressSubscriptionForm(form), null);
});

test('builds a server-side Wompi renewal without card data', () => {
  const payload = buildXpressRecurringTransaction({
    amountInCents: 4_900_000,
    reference: 'WX-12345678-1234-4234-8234-123456789012',
    email: 'student@example.com',
    paymentSourceId: 3891,
    integritySecret: 'test_integrity_secret',
    acceptanceToken: 'acceptance',
    personalDataToken: 'personal',
  });
  assert.equal(payload.recurrent, true);
  assert.equal(payload.payment_source_id, 3891);
  assert.deepEqual(payload.payment_method, { installments: 1 });
  assert.equal(payload.signature.length, 64);
  assert.equal('token' in payload.payment_method, false);
  assert.equal(JSON.stringify(payload).includes('card_number'), false);
});

test('opens the existing class checkout with the exam objective preselected', () => {
  assert.equal(
    xpressClassPurchasePath('toefl'),
    '/precios?idioma=ingles&objetivo=TOEFL+iBT&plan=esencial&nivel=No+s%C3%A9+mi+nivel',
  );
  assert.match(xpressClassPurchasePath('topik'), /idioma=coreano/);
  assert.match(xpressClassPurchasePath('topik'), /objetivo=TOPIK\+I/);
  assert.match(xpressClassPurchasePath('ielts', { plan: 'impulso', startAtRules: true }), /plan=impulso.*paso=reglamento/);
});

test('accepts only versioned Xpress orders and strict Wompi transactions', () => {
  const input = {
    idempotencyKey: '12345678-1234-4234-8234-123456789012',
    examSlug: 'ielts',
    offerId: 'exam-auto',
    acceptedTerms: XPRESS_TERMS_VERSION,
    acceptedPrivacy: XPRESS_PRIVACY_VERSION,
  };
  assert.deepEqual(parseXpressOrderInput(input), input);
  assert.equal(parseXpressOrderInput({ ...input, offerId: 'inventado' }), null);
  assert.equal(parseXpressOrderInput({ ...input, acceptedTerms: 'viejos' }), null);
  const payment = { id: 'transaction-1', reference: 'WX-12345678-1234-4234-8234-123456789012', amount_in_cents: 4_900_000, currency: 'COP', status: 'APPROVED' };
  assert.deepEqual(parseXpressProviderPayment(payment), payment);
  assert.equal(parseXpressProviderPayment({ ...payment, reference: 'WC-12345678-1234-4234-8234-123456789012' }), null);
  assert.equal(parseXpressProviderPayment({ ...payment, amount_in_cents: 49.5 }), null);
});

test('an active membership cannot charge twice for the same exam', () => {
  const quote = quoteXpressPurchase({
    requestedOfferId: 'exam-auto',
    requestedExamSlug: 'ielts',
    activeMembership: { offerId: 'exam-auto', examSlug: 'ielts' },
  });
  assert.equal(quote.action, 'already-included');
  assert.equal(quote.amountInCents, 0);
});

test('a single self-study exam charges COP 12,900 and creates no membership period', () => {
  const quote = quoteXpressPurchase({ requestedOfferId: 'exam-single', requestedExamSlug: 'ielts' });
  assert.equal(quote.action, 'checkout');
  assert.equal(quote.amountInCents, 1_290_000);
  assert.equal(quote.reason, 'single-purchase');
  assert.equal(quote.offer.billing, 'single-exam');
});

test('charges only COP 50,000 when upgrading the same exam', () => {
  const quote = quoteXpressPurchase({
    requestedOfferId: 'exam-teacher',
    requestedExamSlug: 'toefl',
    activeMembership: { offerId: 'exam-auto', examSlug: 'toefl' },
  });
  assert.equal(quote.amountInCents, 5_000_000);
  assert.equal(quote.reason, 'membership-upgrade');
});

test('schedules plan or exam changes instead of creating overlapping access', () => {
  const downgrade = quoteXpressPurchase({
    requestedOfferId: 'exam-auto',
    requestedExamSlug: 'ielts',
    activeMembership: { offerId: 'exam-teacher', examSlug: 'ielts' },
  });
  const examChange = quoteXpressPurchase({
    requestedOfferId: 'exam-auto',
    requestedExamSlug: 'sat',
    activeMembership: { offerId: 'exam-auto', examSlug: 'ielts' },
  });
  assert.equal(downgrade.reason, 'downgrade');
  assert.equal(examChange.reason, 'different-exam');
  assert.equal(examChange.action, 'schedule-change');
});

test('a membership lasts 30 days and only the top plan includes personalized feedback', () => {
  assert.equal(xpressAccessEndsAt(new Date('2026-09-08T12:00:00Z')).toISOString(), '2026-10-08T12:00:00.000Z');
  assert.equal(xpressOfferIncludes('exam-teacher', 'personalized-feedback'), true);
  assert.equal(xpressOfferIncludes('exam-auto', 'personalized-feedback'), false);
});

test('validates and normalizes both registration paths', () => {
  const welearn = parseRegistrationIntent({ path: 'welearn', language: 'coreano', plan: 'constancia' });
  const exam = parseRegistrationIntent({ path: 'exam', language: 'ingles', exam: 'ielts', plan: 'exam-teacher' });
  assert.deepEqual(welearn, { path: 'welearn', language: 'coreano', plan: 'constancia' });
  assert.deepEqual(registrationIntentMetadata(exam), {
    student_path: 'exam',
    language: 'ingles',
    subject: 'ielts',
    target_exam: 'ielts',
    xpress_plan_interest: 'exam-teacher',
  });
  assert.equal(parseRegistrationIntent({ path: 'exam', exam: 'otro', plan: 'exam-auto' }), null);
  assert.equal(parseRegistrationIntent({}), null);
  assert.equal(
    registrationCompletionPath(exam, '/dashboard'),
    '/registro/completar?path=exam&return=%2Fdashboard&language=ingles&exam=ielts&plan=exam-teacher',
  );
});
