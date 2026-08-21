import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getWompiCheckoutDetails,
  parseWompiCheckoutSelection,
} from '../src/lib/wompi/catalog.ts';
import {
  createWompiEventChecksum,
  createWompiIntegritySignature,
  createWompiReference,
  parseWompiReference,
  verifyWompiEventChecksum,
} from '../src/lib/wompi/security.ts';
import { parseAndVerifyWompiTransaction } from '../src/lib/wompi/transactions.ts';

const selection = {
  planId: 'preparacion',
  language: 'ingles',
  billingPeriod: 'annual',
};

test('el servidor calcula el total anual desde el catalogo y no desde el cliente', () => {
  const parsed = parseWompiCheckoutSelection({
    ...selection,
    amountInCents: 1,
  });

  assert.deepEqual(parsed, selection);
  assert.equal(getWompiCheckoutDetails(parsed).amountInCents, 180_000_000);
  assert.equal(parseWompiCheckoutSelection({ ...selection, planId: 'inventado' }), null);
});

test('genera y recupera una referencia unica con la seleccion permitida', () => {
  const reference = createWompiReference(selection, {
    timestamp: 1_700_000_000_000,
    nonce: '0123456789abcdef0123456789abcdef',
  });

  assert.equal(reference, 'WL-preparacion-ingles-a-loyw3v28-0123456789abcdef');
  assert.deepEqual(parseWompiReference(reference), selection);
  assert.equal(parseWompiReference(`${reference}-extra`), null);
});

test('reproduce la firma de integridad publicada por Wompi', () => {
  const signature = createWompiIntegritySignature({
    reference: 'sk8-438k4-xmxm392-sn2m',
    amountInCents: 2_490_000,
    currency: 'COP',
    integritySecret: 'prod_integrity_Z5mMke9x0k8gpErbDqwrJXMqsI6SFli6',
  });

  assert.equal(signature, '37c8407747e595535433ef8f6a811d853cd943046624a0ec04662b17bbf33bf5');
});

test('verifica propiedades dinamicas del webhook y rechaza checksums alterados', () => {
  const event = {
    data: {
      transaction: {
        id: '1234-1610641025-49201',
        status: 'APPROVED',
        amount_in_cents: 4_490_000,
      },
    },
    signature: {
      properties: [
        'transaction.id',
        'transaction.status',
        'transaction.amount_in_cents',
      ],
      checksum: '5A18EC5E8FDB7DF463E9F94774CBA8F583BA21BD04A09CEFF2EA68A4BC0AEFBE',
    },
    timestamp: 1_530_291_411,
  };
  const secret = 'prod_events_OcHnIzeBl5socpwByQ4hA52Em3USQ93Z';

  assert.equal(
    createWompiEventChecksum(event, secret),
    event.signature.checksum.toLowerCase(),
  );
  assert.equal(verifyWompiEventChecksum(event, secret), true);
  assert.equal(verifyWompiEventChecksum(event, secret, '0'.repeat(64)), false);
});

test('solo acepta transacciones cuyo monto coincide con la referencia firmada', () => {
  const reference = createWompiReference(selection, {
    timestamp: 1_700_000_000_000,
    nonce: 'fedcba9876543210fedcba9876543210',
  });
  const transaction = {
    id: '1234-1610641025-49201',
    reference,
    status: 'APPROVED',
    amount_in_cents: 180_000_000,
    currency: 'COP',
    payment_method_type: 'CARD',
  };

  assert.equal(parseAndVerifyWompiTransaction(transaction)?.status, 'APPROVED');
  assert.equal(
    parseAndVerifyWompiTransaction({ ...transaction, amount_in_cents: 1 }),
    null,
  );
});
