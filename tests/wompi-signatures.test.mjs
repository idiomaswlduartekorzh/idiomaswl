import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildWompiCheckoutIntegrity,
  buildWompiEventChecksum,
  safeHexEqual,
} from '../src/lib/wompi/signatures.ts';

test('checkout integrity signs reference + amount + currency + integrity secret', () => {
  assert.equal(buildWompiCheckoutIntegrity({
    reference: 'WL-TEST-1',
    amountInCents: 4_950_000,
    currency: 'COP',
    integritySecret: 'test_integrity_demo',
  }), '817322b4c81ab463b3ea6636a8fd8b6d6be17fa729e82aa8e2d67243367a185b');
});

test('event checksum follows Wompi dynamic property order', () => {
  const checksum = buildWompiEventChecksum({
    data: { transaction: { id: '1234-1610641025-49201', status: 'APPROVED', amount_in_cents: 4_490_000 } },
    properties: ['transaction.id', 'transaction.status', 'transaction.amount_in_cents'],
    timestamp: 1_530_291_411,
    eventsSecret: 'prod_events_OcHnIzeBl5socpwByQ4hA52Em3USQ93Z',
  });
  assert.equal(checksum, '5a18ec5e8fdb7df463e9f94774cba8f583ba21bd04a09ceff2ea68a4bc0aefbe');
});

test('event checksum rejects missing or unsafe properties', () => {
  assert.equal(buildWompiEventChecksum({
    data: { transaction: { id: 'tx' } },
    properties: ['transaction.status'],
    timestamp: 1,
    eventsSecret: 'test_events_secret',
  }), null);
  assert.equal(buildWompiEventChecksum({
    data: { transaction: { id: 'tx' } },
    properties: ['transaction.__proto__.polluted'],
    timestamp: 1,
    eventsSecret: 'test_events_secret',
  }), null);
});

test('checksum comparison accepts case but rejects malformed values', () => {
  const expected = 'a'.repeat(64);
  assert.equal(safeHexEqual('A'.repeat(64), expected), true);
  assert.equal(safeHexEqual('a'.repeat(63), expected), false);
  assert.equal(safeHexEqual(null, expected), false);
});
