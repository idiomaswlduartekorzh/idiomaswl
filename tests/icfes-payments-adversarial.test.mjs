import assert from 'node:assert/strict';
import test from 'node:test';
import {
  applyIcfesLocalProviderEvent,
  createIcfesLocalPaymentLedger,
  hasIcfesLocalEntitlement,
  isIcfesAdversarialPaymentModelEnabled,
  prepareIcfesLocalPaymentOrder,
} from '../src/lib/icfes/payment-adversarial-model.ts';

const runtime = Object.freeze({ ICFES_ADVERSARIAL_PAYMENTS_ENABLED: 'true', NODE_ENV: 'test', VERCEL_ENV: 'preview' });
const ownerId = 'student-001';
const instant = '2026-09-09T12:00:00.000Z';

function detailOrder(id = 'order-detail') {
  return prepareIcfesLocalPaymentOrder({
    ledger: createIcfesLocalPaymentLedger(runtime), runtime, id,
    reference: `LOCAL-ICFES-${id}`, ownerId,
    requestedOfferId: 'icfes-detail-attempt-v1', createdAt: instant,
  });
}

function providerEvent(order, overrides = {}) {
  return {
    eventId: `event-${order.id}-${overrides.status ?? overrides.kind ?? 'pending'}`,
    providerTransactionId: `transaction-${order.id}`,
    reference: order.reference,
    environment: 'sandbox',
    amountInCents: order.amountInCents,
    currency: 'COP',
    observedAt: instant,
    kind: 'TRANSACTION',
    status: 'PENDING',
    ...overrides,
  };
}

function apply(ledger, order, overrides) {
  return applyIcfesLocalProviderEvent({ ledger, runtime, event: providerEvent(order, overrides) });
}

function approvedDetail(id = 'order-detail') {
  const prepared = detailOrder(id);
  return apply(prepared.ledger, prepared.order, { status: 'APPROVED' });
}

test('the adversarial model is off by default and cannot run for production', () => {
  assert.equal(isIcfesAdversarialPaymentModelEnabled({ NODE_ENV: 'test' }), false);
  assert.equal(isIcfesAdversarialPaymentModelEnabled(runtime), true);
  assert.equal(isIcfesAdversarialPaymentModelEnabled({ ...runtime, NODE_ENV: 'production' }), false);
  assert.equal(isIcfesAdversarialPaymentModelEnabled({ ...runtime, VERCEL_ENV: 'production' }), false);
  assert.throws(() => createIcfesLocalPaymentLedger({ NODE_ENV: 'test' }), /model_disabled/);
});

test('pending, declined and error payments never grant access; a later authoritative approval does', () => {
  const prepared = detailOrder();
  const pending = apply(prepared.ledger, prepared.order, { status: 'PENDING' });
  assert.equal(pending.outcome, 'APPLIED');
  assert.equal(hasIcfesLocalEntitlement(pending.ledger.orders[prepared.order.id]), false);
  const declined = apply(pending.ledger, prepared.order, { eventId: 'event-declined', status: 'DECLINED' });
  assert.equal(hasIcfesLocalEntitlement(declined.ledger.orders[prepared.order.id]), false);
  const errored = apply(declined.ledger, prepared.order, { eventId: 'event-error', status: 'ERROR' });
  assert.equal(hasIcfesLocalEntitlement(errored.ledger.orders[prepared.order.id]), false);
  const approved = apply(errored.ledger, prepared.order, { eventId: 'event-approved', status: 'APPROVED' });
  assert.equal(hasIcfesLocalEntitlement(approved.ledger.orders[prepared.order.id]), true);
});

test('duplicates and exact event replays cannot grant twice or regress an approval', () => {
  const prepared = detailOrder();
  const firstEvent = providerEvent(prepared.order, { eventId: 'event-approved', status: 'APPROVED' });
  const approved = applyIcfesLocalProviderEvent({ ledger: prepared.ledger, runtime, event: firstEvent });
  const replay = applyIcfesLocalProviderEvent({ ledger: approved.ledger, runtime, event: firstEvent });
  assert.equal(replay.outcome, 'REPLAY');
  assert.strictEqual(replay.ledger, approved.ledger);
  const duplicate = apply(approved.ledger, prepared.order, { eventId: 'event-approved-duplicate', status: 'APPROVED' });
  assert.equal(duplicate.outcome, 'IGNORED');
  const latePending = apply(duplicate.ledger, prepared.order, { eventId: 'event-late-pending', status: 'PENDING' });
  assert.equal(latePending.ledger.orders[prepared.order.id].status, 'APPROVED');
  assert.equal(Object.values(latePending.ledger.orders).filter(hasIcfesLocalEntitlement).length, 1);
});

test('tampered amount, currency, environment and provider transaction are rejected', () => {
  const prepared = detailOrder();
  for (const [reason, overrides] of [
    ['AMOUNT_MISMATCH', { eventId: 'event-bad-amount', amountInCents: 1 }],
    ['CURRENCY_MISMATCH', { eventId: 'event-bad-currency', currency: 'USD' }],
    ['ENVIRONMENT_MISMATCH', { eventId: 'event-bad-environment', environment: 'production' }],
  ]) {
    const result = apply(prepared.ledger, prepared.order, overrides);
    assert.equal(result.outcome, 'REJECTED');
    assert.equal(result.reason, reason);
    assert.equal(result.ledger.orders[prepared.order.id].status, 'CREATED');
  }
  const pending = apply(prepared.ledger, prepared.order, { eventId: 'event-binding', status: 'PENDING' });
  const mismatched = apply(pending.ledger, prepared.order, {
    eventId: 'event-other-transaction', providerTransactionId: 'transaction-attacker', status: 'APPROVED',
  });
  assert.equal(mismatched.reason, 'TRANSACTION_MISMATCH');
  assert.equal(mismatched.ledger.orders[prepared.order.id].status, 'PENDING');
  for (const overrides of [
    { eventId: 'event-bad-kind', kind: 'UNKNOWN', status: undefined },
    { eventId: 'event-bad-status', status: 'UNKNOWN' },
  ]) {
    const invalid = apply(prepared.ledger, prepared.order, overrides);
    assert.equal(invalid.outcome, 'REJECTED');
    assert.equal(invalid.reason, 'INVALID_EVENT');
  }
});

for (const reversal of ['REFUND', 'CHARGEBACK']) {
  test(`${reversal.toLowerCase()} revokes access and an approval replay cannot reopen it`, () => {
    const prepared = detailOrder(`order-${reversal.toLowerCase()}`);
    const approved = apply(prepared.ledger, prepared.order, { eventId: `event-${reversal}-approved`, status: 'APPROVED' });
    const reversed = apply(approved.ledger, prepared.order, {
      eventId: `event-${reversal}`, kind: reversal, status: undefined,
    });
    assert.equal(reversed.outcome, 'APPLIED');
    assert.equal(reversed.ledger.orders[prepared.order.id].status, 'REVOKED');
    assert.equal(reversed.ledger.orders[prepared.order.id].reversalReason, reversal);
    assert.equal(hasIcfesLocalEntitlement(reversed.ledger.orders[prepared.order.id]), false);
    const replayedApproval = apply(reversed.ledger, prepared.order, {
      eventId: `event-${reversal}-late-approval`, status: 'APPROVED',
    });
    assert.equal(replayedApproval.ledger.orders[prepared.order.id].status, 'REVOKED');
  });
}

test('12k detail upgrades to 49k or 99k only once, for the same owner and within seven days', () => {
  for (const [target, expectedAmount] of [['exam-auto', 3_700_000], ['exam-teacher', 8_700_000]]) {
    const approved = approvedDetail(`source-${target}`);
    const source = approved.ledger.orders[`source-${target}`];
    const upgrade = prepareIcfesLocalPaymentOrder({
      ledger: approved.ledger, runtime, id: `upgrade-${target}`,
      reference: `LOCAL-ICFES-upgrade-${target}`, ownerId, requestedOfferId: target,
      createdAt: '2026-09-16T12:00:00.000Z', upgradeSourceOrderId: source.id,
    });
    assert.equal(upgrade.order.amountInCents, expectedAmount);
    assert.throws(() => prepareIcfesLocalPaymentOrder({
      ledger: upgrade.ledger, runtime, id: `second-${target}`,
      reference: `LOCAL-ICFES-second-${target}`, ownerId, requestedOfferId: target,
      createdAt: '2026-09-16T12:00:00.000Z', upgradeSourceOrderId: source.id,
    }), /upgrade_source_ineligible/);
    assert.throws(() => prepareIcfesLocalPaymentOrder({
      ledger: approved.ledger, runtime, id: `attacker-${target}`,
      reference: `LOCAL-ICFES-attacker-${target}`, ownerId: 'student-002', requestedOfferId: target,
      createdAt: '2026-09-16T12:00:00.000Z', upgradeSourceOrderId: source.id,
    }), /upgrade_source_ineligible/);
  }
  const approved = approvedDetail('expired-detail');
  assert.throws(() => prepareIcfesLocalPaymentOrder({
    ledger: approved.ledger, runtime, id: 'expired-upgrade', reference: 'LOCAL-ICFES-expired-upgrade', ownerId,
    requestedOfferId: 'exam-auto', createdAt: '2026-09-16T12:00:00.001Z', upgradeSourceOrderId: 'expired-detail',
  }), /upgrade_source_ineligible/);
});

test('49k upgrades to 99k for 50k and preserves the original period end', () => {
  const initial = prepareIcfesLocalPaymentOrder({
    ledger: createIcfesLocalPaymentLedger(runtime), runtime, id: 'order-auto', reference: 'LOCAL-ICFES-order-auto', ownerId,
    requestedOfferId: 'exam-auto', createdAt: instant,
  });
  const approved = apply(initial.ledger, initial.order, { eventId: 'event-auto-approved', status: 'APPROVED' });
  const source = approved.ledger.orders['order-auto'];
  const upgrade = prepareIcfesLocalPaymentOrder({
    ledger: approved.ledger, runtime, id: 'order-teacher-upgrade', reference: 'LOCAL-ICFES-order-teacher-upgrade', ownerId,
    requestedOfferId: 'exam-teacher', createdAt: '2026-09-10T12:00:00.000Z', upgradeSourceOrderId: source.id,
  });
  assert.equal(upgrade.order.amountInCents, 5_000_000);
  assert.equal(upgrade.order.periodEndsAt, source.periodEndsAt);
  const upgraded = apply(upgrade.ledger, upgrade.order, { eventId: 'event-teacher-approved', status: 'APPROVED', observedAt: '2026-09-10T12:01:00.000Z' });
  assert.equal(upgraded.ledger.orders[upgrade.order.id].periodEndsAt, source.periodEndsAt);
});

test('a late approval cannot reuse upgrade credit released and reserved by another order', () => {
  const approved = approvedDetail('source-reassigned');
  const source = approved.ledger.orders['source-reassigned'];
  const first = prepareIcfesLocalPaymentOrder({
    ledger: approved.ledger, runtime, id: 'upgrade-first', reference: 'LOCAL-ICFES-upgrade-first', ownerId,
    requestedOfferId: 'exam-auto', createdAt: '2026-09-10T12:00:00.000Z', upgradeSourceOrderId: source.id,
  });
  const declined = apply(first.ledger, first.order, { eventId: 'event-first-declined', status: 'DECLINED' });
  const second = prepareIcfesLocalPaymentOrder({
    ledger: declined.ledger, runtime, id: 'upgrade-second', reference: 'LOCAL-ICFES-upgrade-second', ownerId,
    requestedOfferId: 'exam-teacher', createdAt: '2026-09-10T12:01:00.000Z', upgradeSourceOrderId: source.id,
  });
  const lateApproval = apply(second.ledger, first.order, { eventId: 'event-first-late-approved', status: 'APPROVED' });
  assert.equal(lateApproval.outcome, 'REJECTED');
  assert.equal(lateApproval.reason, 'UPGRADE_SOURCE_INVALID');
  assert.equal(lateApproval.ledger.orders[first.order.id].status, 'DECLINED');
  const secondApproval = apply(second.ledger, second.order, { eventId: 'event-second-approved', status: 'APPROVED' });
  assert.equal(hasIcfesLocalEntitlement(secondApproval.ledger.orders[second.order.id]), true);
});

test('refund or chargeback of an upgrade source revokes every dependent entitlement', () => {
  const approved = approvedDetail('source-cascade');
  const source = approved.ledger.orders['source-cascade'];
  const upgrade = prepareIcfesLocalPaymentOrder({
    ledger: approved.ledger, runtime, id: 'upgrade-cascade', reference: 'LOCAL-ICFES-upgrade-cascade', ownerId,
    requestedOfferId: 'exam-auto', createdAt: '2026-09-10T12:00:00.000Z', upgradeSourceOrderId: source.id,
  });
  const upgraded = apply(upgrade.ledger, upgrade.order, { eventId: 'event-upgrade-approved', status: 'APPROVED' });
  const reversed = apply(upgraded.ledger, source, { eventId: 'event-source-chargeback', kind: 'CHARGEBACK', status: undefined });
  assert.equal(reversed.ledger.orders[source.id].status, 'REVOKED');
  assert.equal(reversed.ledger.orders[upgrade.order.id].status, 'REVOKED');
  assert.equal(reversed.ledger.orders[upgrade.order.id].reversalReason, 'SOURCE_REVERSAL');
  assert.equal(Object.values(reversed.ledger.orders).some(hasIcfesLocalEntitlement), false);
});
