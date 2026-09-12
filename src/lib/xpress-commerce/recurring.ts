import { createWompiIntegritySignature } from '../wompi/security.ts';

export function buildXpressRecurringTransaction(input: Readonly<{
  amountInCents: number;
  reference: string;
  email: string;
  paymentSourceId: number;
  integritySecret: string;
  acceptanceToken: string;
  personalDataToken: string;
}>) {
  if (!Number.isSafeInteger(input.amountInCents) || input.amountInCents <= 0) throw new Error('invalid_recurring_amount');
  if (!/^WX-[0-9a-f-]{36}$/.test(input.reference)) throw new Error('invalid_recurring_reference');
  if (!Number.isSafeInteger(input.paymentSourceId) || input.paymentSourceId <= 0) throw new Error('invalid_payment_source');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email) || input.email.length > 254) throw new Error('invalid_recurring_email');
  if (!input.acceptanceToken || !input.personalDataToken) throw new Error('missing_wompi_acceptance');
  return {
    amount_in_cents: input.amountInCents,
    currency: 'COP' as const,
    signature: createWompiIntegritySignature({
      reference: input.reference,
      amountInCents: input.amountInCents,
      currency: 'COP',
      integritySecret: input.integritySecret,
    }),
    customer_email: input.email,
    payment_method: { installments: 1 },
    reference: input.reference,
    payment_source_id: input.paymentSourceId,
    recurrent: true as const,
    acceptance_token: input.acceptanceToken,
    accept_personal_auth: input.personalDataToken,
  };
}
