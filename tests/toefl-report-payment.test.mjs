import assert from 'node:assert/strict';
import test from 'node:test';
import { parseToeflWompiTransaction } from '../src/lib/toefl/report-payment-event.ts';
import { createWompiIntegritySignature } from '../src/lib/wompi/security.ts';

const REFERENCE = 'WL-TOEFL-0d4b5d8e-1228-4f2a-8bd7-caa25b77cc86-a1b2c3d4';

test('TOEFL checkout uses the shared Wompi integrity implementation', () => {
  assert.equal(createWompiIntegritySignature({
    reference: 'WL-TEST-1',
    amountInCents: 4_950_000,
    currency: 'COP',
    integritySecret: 'test_integrity_demo',
  }), '817322b4c81ab463b3ea6636a8fd8b6d6be17fa729e82aa8e2d67243367a185b');
});

test('accepts only a complete TOEFL transaction owned by this product', () => {
  assert.deepEqual(parseToeflWompiTransaction({
    id: 'wompi-transaction-id',
    reference: REFERENCE,
    amount_in_cents: 4_950_000,
    currency: 'COP',
    status: 'APPROVED',
  }), {
    id: 'wompi-transaction-id',
    reference: REFERENCE,
    amountInCents: 4_950_000,
    currency: 'COP',
    status: 'APPROVED',
  });
});

test('rejects another product, an unsafe amount or an unknown status', () => {
  const valid = {
    id: 'wompi-transaction-id',
    reference: REFERENCE,
    amount_in_cents: 4_950_000,
    currency: 'COP',
    status: 'APPROVED',
  };
  assert.equal(parseToeflWompiTransaction({ ...valid, reference: 'WL-preparacion-ingles-m-abcdef12-a1b2c3d4e5f6' }), null);
  assert.equal(parseToeflWompiTransaction({ ...valid, amount_in_cents: 49.5 }), null);
  assert.equal(parseToeflWompiTransaction({ ...valid, status: 'PAID' }), null);
});
