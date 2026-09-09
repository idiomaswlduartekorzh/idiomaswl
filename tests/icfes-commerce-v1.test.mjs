import assert from 'node:assert/strict';
import test from 'node:test';
import { getXpressOffer } from '../src/lib/xpress-commerce/catalog.ts';
import {
  ICFES_COMMERCE_OFFERS,
  ICFES_COMMERCE_VERSION,
  quoteIcfesCommercePurchase,
} from '../src/lib/icfes/commerce-v1.ts';

test('publishes the versioned ICFES offer facade with exact COP prices', () => {
  assert.equal(ICFES_COMMERCE_VERSION, 'icfes-commerce-2026-09-09-v1');
  assert.deepEqual(
    ICFES_COMMERCE_OFFERS.map(({ id, amountInCents, billing }) => [id, amountInCents, billing]),
    [
      ['icfes-detail-attempt-v1', 1_200_000, 'one-time'],
      ['exam-auto', 4_900_000, '30-day-membership'],
      ['exam-teacher', 9_900_000, '30-day-membership'],
    ],
  );
});

test('derives monthly prices and entitlements from the Xpress catalog', () => {
  const automatic = ICFES_COMMERCE_OFFERS[1];
  const teacher = ICFES_COMMERCE_OFFERS[2];

  assert.equal(automatic.amountInCents, getXpressOffer('exam-auto').amountInCents);
  assert.equal(teacher.amountInCents, getXpressOffer('exam-teacher').amountInCents);
  assert.strictEqual(automatic.entitlements, getXpressOffer('exam-auto').entitlements);
  assert.strictEqual(teacher.entitlements, getXpressOffer('exam-teacher').entitlements);
  assert.equal(teacher.teacherReviewCreditsPerPeriod, 1);
  assert.equal(teacher.teacherFeedbackTargetHours, 24);
});

test('charges COP 12,000 once for the detail of one attempt', () => {
  const quote = quoteIcfesCommercePurchase({ requestedOfferId: 'icfes-detail-attempt-v1' });

  assert.equal(quote.action, 'checkout');
  assert.equal(quote.amountInCents, 1_200_000);
  assert.equal(quote.offer.entitlementScope, 'attempt');
  assert.equal(quote.offer.entitlements.includes('attempt-detailed-answers'), true);
});

test('credits the detail purchase toward either membership during seven days', () => {
  const purchasedDetailAt = new Date('2026-09-01T12:00:00.000Z');
  const now = new Date('2026-09-08T12:00:00.000Z');
  const automatic = quoteIcfesCommercePurchase({
    requestedOfferId: 'exam-auto',
    purchasedDetailAt,
    now,
  });
  const teacher = quoteIcfesCommercePurchase({
    requestedOfferId: 'exam-teacher',
    purchasedDetailAt,
    now,
  });

  assert.equal(automatic.amountInCents, 3_700_000);
  assert.equal(teacher.amountInCents, 8_700_000);
  assert.equal(automatic.creditInCents, 1_200_000);
  assert.equal(teacher.creditInCents, 1_200_000);
  assert.equal(automatic.reason, 'detail-upgrade');
});

test('does not apply the detail credit after the seven-day window', () => {
  const quote = quoteIcfesCommercePurchase({
    requestedOfferId: 'exam-auto',
    purchasedDetailAt: new Date('2026-09-01T12:00:00.000Z'),
    now: new Date('2026-09-08T12:00:00.001Z'),
  });

  assert.equal(quote.amountInCents, 4_900_000);
  assert.equal(quote.creditInCents, 0);
  assert.equal(quote.reason, 'new-purchase');
});

test('reuses the monthly upgrade quote and preserves the existing period end', () => {
  const periodEndsAt = new Date('2026-10-01T08:30:00.000Z');
  const quote = quoteIcfesCommercePurchase({
    requestedOfferId: 'exam-teacher',
    activeMembership: { offerId: 'exam-auto', periodEndsAt },
  });

  assert.equal(quote.action, 'checkout');
  assert.equal(quote.amountInCents, 5_000_000);
  assert.equal(quote.creditInCents, 4_900_000);
  assert.equal(quote.reason, 'membership-upgrade');
  assert.equal(quote.periodEndsAt, periodEndsAt.toISOString());
});

test('does not create overlapping access for included offers or downgrades', () => {
  const periodEndsAt = new Date('2026-10-01T08:30:00.000Z');
  const detail = quoteIcfesCommercePurchase({
    requestedOfferId: 'icfes-detail-attempt-v1',
    activeMembership: { offerId: 'exam-auto', periodEndsAt },
  });
  const downgrade = quoteIcfesCommercePurchase({
    requestedOfferId: 'exam-auto',
    activeMembership: { offerId: 'exam-teacher', periodEndsAt },
  });

  assert.equal(detail.action, 'already-included');
  assert.equal(detail.amountInCents, 0);
  assert.equal(downgrade.action, 'schedule-change');
  assert.equal(downgrade.amountInCents, 0);
  assert.equal(downgrade.periodEndsAt, periodEndsAt.toISOString());
});
