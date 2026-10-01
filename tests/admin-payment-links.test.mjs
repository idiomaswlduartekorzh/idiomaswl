import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { parseAdminPaymentLinkForm } from '../src/lib/admin-payments/validation.ts';
import {
  parseCreatedWompiPaymentLink,
  parseWompiPaymentLinkTransaction,
} from '../src/lib/wompi/payment-links.ts';

test('normalizes a fixed-value payment ticket and converts COP to cents', () => {
  const form = new FormData();
  form.set('amountInCop', '350000');
  form.set('title', '  Saldo   curso intensivo  ');
  form.set('description', 'Mensualidad final');
  form.set('customerEmail', '  CLIENTE@EXAMPLE.COM ');
  form.set('expiresInDays', '7');

  const result = parseAdminPaymentLinkForm(form);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.value.amountInCents, 35_000_000);
  assert.equal(result.value.title, 'Saldo curso intensivo');
  assert.equal(result.value.customerEmail, 'cliente@example.com');
});

test('rejects unsafe or ambiguous ticket values', () => {
  const decimal = new FormData();
  decimal.set('amountInCop', '10.5');
  decimal.set('title', 'Cobro válido');
  decimal.set('expiresInDays', '7');
  assert.equal(parseAdminPaymentLinkForm(decimal).ok, false);

  const invalidExpiry = new FormData();
  invalidExpiry.set('amountInCop', '10000');
  invalidExpiry.set('title', 'Cobro válido');
  invalidExpiry.set('expiresInDays', '365');
  assert.equal(parseAdminPaymentLinkForm(invalidExpiry).ok, false);
});

test('accepts only a single-use Wompi link with the exact requested amount', () => {
  const response = {
    data: {
      id: '3Z0Cfi',
      currency: 'COP',
      amount_in_cents: 35_000_000,
      single_use: true,
    },
  };
  assert.equal(
    parseCreatedWompiPaymentLink(response, 35_000_000)?.url,
    'https://checkout.wompi.co/l/3Z0Cfi',
  );
  assert.equal(parseCreatedWompiPaymentLink(response, 1), null);
  assert.equal(parseCreatedWompiPaymentLink({ data: { ...response.data, single_use: false } }, 35_000_000), null);
});

test('parses provider transactions only when they belong to a payment link', () => {
  const transaction = {
    id: '1234-1610641025-49201',
    payment_link_id: '3Z0Cfi',
    status: 'APPROVED',
    amount_in_cents: 35_000_000,
    currency: 'COP',
    payment_method_type: 'PSE',
  };
  assert.equal(parseWompiPaymentLinkTransaction(transaction)?.paymentLinkId, '3Z0Cfi');
  assert.equal(parseWompiPaymentLinkTransaction({ ...transaction, payment_link_id: null }), null);
  assert.equal(parseWompiPaymentLinkTransaction({ ...transaction, currency: 'USD' }), null);
});

test('admin navigation and webhook include the protected payment workflow', () => {
  const dashboard = readFileSync(new URL('../src/app/(site)/dashboard/admin/JoseDashboard.tsx', import.meta.url), 'utf8');
  const page = readFileSync(new URL('../src/app/(site)/dashboard/admin/pagos/page.tsx', import.meta.url), 'utf8');
  const action = readFileSync(new URL('../src/app/(site)/dashboard/admin/pagos/actions.ts', import.meta.url), 'utf8');
  const webhook = readFileSync(new URL('../src/app/api/wompi/events/route.ts', import.meta.url), 'utf8');

  assert.match(dashboard, /\/dashboard\/admin\/pagos/);
  assert.match(page, /requireAdmin/);
  assert.match(action, /await requireAdmin\(\)/);
  assert.match(webhook, /persistVerifiedAdminPaymentLinkTransaction/);
  assert.match(webhook, /transaction\.id/);
});
