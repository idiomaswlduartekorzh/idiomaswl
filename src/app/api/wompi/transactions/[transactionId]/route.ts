import { fetchVerifiedWompiTransaction } from '@/lib/wompi/api';
import { persistVerifiedWompiTransaction } from '@/lib/wompi/persistence';
import { getWompiServerConfig } from '@/lib/wompi/server';
import { WompiConfigurationError } from '@/lib/wompi/validation';

export const runtime = 'nodejs';

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, max-age=0' } as const;

function json(body: unknown, status: number): Response {
  return Response.json(body, { status, headers: NO_STORE_HEADERS });
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ transactionId: string }> },
): Promise<Response> {
  const { transactionId } = await context.params;

  try {
    const config = getWompiServerConfig();
    const lookup = await fetchVerifiedWompiTransaction(transactionId, config);

    if (lookup.kind === 'not_found') {
      return json(
        { code: 'transaction_not_found', message: 'No encontramos un pago válido con ese identificador.' },
        404,
      );
    }

    if (lookup.kind === 'upstream_error') {
      return json(
        { code: 'wompi_unavailable', message: 'Wompi no respondió. Vuelve a comprobar en unos segundos.' },
        502,
      );
    }

    const { transaction } = lookup;
    await persistVerifiedWompiTransaction({
      transaction,
      environment: config.environment,
    });

    return json(
      {
        transaction: {
          id: transaction.id,
          status: transaction.status,
          reference: transaction.reference,
          amountInCents: transaction.amountInCents,
          currency: transaction.currency,
          paymentMethodType: transaction.paymentMethodType,
          planLabel: transaction.details.planLabel,
          languageLabel: transaction.details.languageLabel,
          billingLabel: transaction.details.billingLabel,
        },
        environment: config.environment,
      },
      200,
    );
  } catch (error) {
    if (error instanceof WompiConfigurationError) {
      return json(
        { code: 'wompi_not_configured', message: 'No podemos consultar el pago en este momento.' },
        503,
      );
    }

    return json(
      { code: 'transaction_lookup_failed', message: 'No pudimos comprobar el pago.' },
      500,
    );
  }
}
