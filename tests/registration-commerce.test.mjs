import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  REGISTRATION_PRODUCTS,
  getRegistrationAmountInCents,
  parseRegistrationSelection,
} from '../src/lib/registration/catalog.ts';
import { parseRegistrationWompiTransaction } from '../src/lib/registration/payment-event.ts';

const EXPECTED_PRICES = {
  'platform-unlimited-30d': 49_900,
  'english-8h': 320_000,
  'english-16h': 580_000,
  'english-24h': 820_000,
  'english-32h': 1_040_000,
  'english-40h': 1_270_000,
  'english-80h': 2_540_000,
};

test('the pilot catalog keeps the approved class prices and provisional autonomous price', () => {
  assert.equal(Object.keys(REGISTRATION_PRODUCTS).length, 7);
  for (const [productId, expectedCop] of Object.entries(EXPECTED_PRICES)) {
    assert.equal(REGISTRATION_PRODUCTS[productId].amountCop, expectedCop);
    assert.equal(getRegistrationAmountInCents(productId), expectedCop * 100);
  }
  assert.equal(REGISTRATION_PRODUCTS['platform-unlimited-30d'].provisional, true);
  assert.equal(REGISTRATION_PRODUCTS['english-8h'].provisional, false);
});

test('registration selection accepts only a product from the chosen account path', () => {
  assert.deepEqual(parseRegistrationSelection({
    accountType: 'platform',
    productId: 'platform-unlimited-30d',
  }), {
    accountType: 'platform',
    productId: 'platform-unlimited-30d',
  });
  assert.deepEqual(parseRegistrationSelection({
    accountType: 'student',
    productId: 'english-24h',
  }), {
    accountType: 'student',
    productId: 'english-24h',
  });
  assert.equal(parseRegistrationSelection({
    accountType: 'platform',
    productId: 'english-24h',
  }), null);
  assert.equal(parseRegistrationSelection({
    accountType: 'student',
    productId: 'made-up-plan',
  }), null);
});

test('registration webhook parser owns only WL-REG transactions with safe scalar fields', () => {
  const reference = 'WL-REG-0d4b5d8e-1228-4f2a-8bd7-caa25b77cc86-a1b2c3d4';
  assert.deepEqual(parseRegistrationWompiTransaction({
    id: 'wompi-transaction-id',
    reference,
    amount_in_cents: 32_000_000,
    currency: 'COP',
    status: 'APPROVED',
    payment_method_type: 'CARD',
  }), {
    id: 'wompi-transaction-id',
    reference,
    amountInCents: 32_000_000,
    currency: 'COP',
    status: 'APPROVED',
    paymentMethodType: 'CARD',
  });
  assert.equal(parseRegistrationWompiTransaction({
    id: 'wompi-transaction-id',
    reference: 'WL-TOEFL-0d4b5d8e-1228-4f2a-8bd7-caa25b77cc86-a1b2c3d4',
    amount_in_cents: 1_000_000,
    currency: 'COP',
    status: 'APPROVED',
  }), null);
  assert.equal(parseRegistrationWompiTransaction({
    id: 'wompi-transaction-id',
    reference,
    amount_in_cents: 32_000_000.5,
    currency: 'COP',
    status: 'APPROVED',
  }), null);
});

test('migration keeps payment authorization server-only and metadata non-privileged', async () => {
  const migration = await readFile(
    new URL('../supabase/migrations/20260821210509_registration_commerce_pilot.sql', import.meta.url),
    'utf8',
  );
  assert.match(migration, /ENABLE ROW LEVEL SECURITY/i);
  assert.match(migration, /REVOKE ALL ON TABLE public\.registration_orders FROM anon, authenticated, service_role/i);
  assert.match(migration, /GRANT SELECT, INSERT, UPDATE ON TABLE public\.registration_orders TO service_role/i);
  assert.match(migration, /Payment approval, not this field, grants access/i);
  assert.doesNotMatch(migration, /GRANT .*registration_orders TO authenticated/i);
});
