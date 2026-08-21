import { getWompiCheckoutDetails, parseWompiCheckoutSelection } from '@/lib/wompi/catalog';
import { persistWompiCheckoutStarted } from '@/lib/wompi/persistence';
import { createWompiIntegritySignature, createWompiReference } from '@/lib/wompi/security';
import { getWompiServerConfig } from '@/lib/wompi/server';
import { WompiConfigurationError } from '@/lib/wompi/validation';

export const runtime = 'nodejs';

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, max-age=0' } as const;
const PRODUCTION_ORIGIN = 'https://www.idiomaswl.com';

function json(body: unknown, status: number): Response {
  return Response.json(body, { status, headers: NO_STORE_HEADERS });
}

function resolveCheckoutOrigin(request: Request): string {
  const url = new URL(request.url);
  const hostname = url.hostname.toLowerCase();
  const isKnownHttpsHost =
    url.protocol === 'https:' &&
    (hostname === 'idiomaswl.com' ||
      hostname === 'www.idiomaswl.com' ||
      hostname.endsWith('.vercel.app'));
  const isLocalDevelopment =
    process.env.NODE_ENV !== 'production' &&
    (hostname === 'localhost' || hostname === '127.0.0.1');

  if (isKnownHttpsHost || isLocalDevelopment) return url.origin;
  return PRODUCTION_ORIGIN;
}

export async function POST(request: Request): Promise<Response> {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(contentLength) && contentLength > 4_096) {
    return json({ code: 'payload_too_large', message: 'La solicitud es demasiado grande.' }, 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ code: 'invalid_json', message: 'La solicitud no contiene JSON válido.' }, 400);
  }

  const selection = parseWompiCheckoutSelection(body);
  if (!selection) {
    return json(
      { code: 'invalid_selection', message: 'El plan, idioma o periodo no es válido.' },
      400,
    );
  }

  try {
    const config = getWompiServerConfig();
    const details = getWompiCheckoutDetails(selection);
    const reference = createWompiReference(selection);
    const integrity = createWompiIntegritySignature({
      reference,
      amountInCents: details.amountInCents,
      currency: details.currency,
      integritySecret: config.integritySecret,
    });
    const persistence = await persistWompiCheckoutStarted({
      reference,
      environment: config.environment,
      details,
    });

    if (config.environment === 'production' && persistence !== 'saved') {
      return json(
        {
          code: 'payment_ledger_unavailable',
          message: 'Los pagos están temporalmente en mantenimiento. Intenta de nuevo en unos minutos.',
        },
        503,
      );
    }

    const redirectUrl = new URL('/pagos/resultado', resolveCheckoutOrigin(request)).toString();

    return json(
      {
        checkout: {
          currency: details.currency,
          amountInCents: details.amountInCents,
          reference,
          publicKey: config.publicKey,
          signature: { integrity },
          redirectUrl,
        },
        purchase: {
          planLabel: details.planLabel,
          languageLabel: details.languageLabel,
          billingLabel: details.billingLabel,
        },
        environment: config.environment,
      },
      201,
    );
  } catch (error) {
    if (error instanceof WompiConfigurationError) {
      return json(
        {
          code: 'wompi_not_configured',
          message: 'El checkout está temporalmente fuera de servicio.',
        },
        503,
      );
    }

    console.error('[wompi] No fue posible preparar el checkout.');
    return json(
      { code: 'checkout_unavailable', message: 'No pudimos abrir el pago. Intenta nuevamente.' },
      500,
    );
  }
}
