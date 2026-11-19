import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';
import { epaycoLedgerId, epaycoPesosToCents, parseEpaycoPayment, rawEpaycoReference, verifyEpaycoSignature } from '../src/lib/course-pricing/epayco.ts';

const customerId = '123456';
const pKey = 'secret-key';
const orderId = '9b042327-86d9-4ebf-8947-74d3292f8324';
function signed(overrides: Record<string, unknown> = {}) {
  const event = {
    x_cust_id_cliente: customerId, x_ref_payco: 206381484, x_transaction_id: 48771920271208,
    x_id_invoice: `WC-${orderId}`, x_amount: 85900, x_currency_code: 'COP',
    x_response: 'Aceptada', x_test_request: 'TRUE', ...overrides,
  };
  const x_signature = createHash('sha256').update(`${customerId}^${pKey}^${event.x_ref_payco}^${event.x_transaction_id}^${event.x_amount}^${event.x_currency_code}`).digest('hex');
  return { ...event, x_signature };
}

test('ePayco peso conversion is exact and rejects rounding or unsafe values', () => {
  assert.equal(epaycoPesosToCents('85900'), 8590000);
  assert.equal(epaycoPesosToCents('85900.25'), 8590025);
  for (const value of ['85900.259', '-1', '0', '85,900', '1e5', '9999999999999']) assert.equal(epaycoPesosToCents(value), null);
});

test('signed ePayco validation accepts numeric provider fields and normalizes the payment', () => {
  const event = signed();
  assert.equal(verifyEpaycoSignature(event, customerId, pKey), true);
  assert.deepEqual(parseEpaycoPayment(event, customerId, pKey), {
    reference: `WC-${orderId}`, providerReference: '206381484', transactionId: '48771920271208',
    amountInCents: 8590000, currency: 'COP', status: 'APPROVED', environment: 'sandbox',
  });
  assert.equal(epaycoLedgerId('206381484'), 'epayco:206381484');
  assert.equal(rawEpaycoReference('epayco:206381484'), '206381484');
  assert.equal(rawEpaycoReference('wompi:206381484'), null);
});

test('ePayco rejects altered signed amount, merchant, invalid invoice, currency and environment', () => {
  assert.equal(verifyEpaycoSignature({ ...signed(), x_amount: 1 }, customerId, pKey), false);
  assert.equal(verifyEpaycoSignature(signed(), 'another-merchant', pKey), false);
  assert.equal(parseEpaycoPayment(signed({ x_id_invoice: 'another-order' }), customerId, pKey), null);
  assert.equal(parseEpaycoPayment(signed({ x_currency_code: 'USD' }), customerId, pKey), null);
  assert.equal(parseEpaycoPayment(signed({ x_test_request: 'unknown' }), customerId, pKey), null);
  assert.equal(parseEpaycoPayment(signed({ x_response: 'unknown' }), customerId, pKey), null);
});
