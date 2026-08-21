import { createClient } from '@/lib/supabase/server';
import { parseRegistrationSelection } from '@/lib/registration/catalog';
import { createRegistrationCheckout } from '@/lib/registration/orders.server';
import { isRegistrationCheckoutEnabled } from '@/lib/registration/payment-config.server';
import { WompiConfigurationError } from '@/lib/wompi/validation';

export const runtime = 'nodejs';

const NO_STORE_HEADERS = { 'Cache-Control': 'private, no-store, max-age=0' } as const;
const PRODUCTION_ORIGIN = 'https://www.idiomaswl.com';

function json(body: unknown, status: number): Response {
  return Response.json(body, { status, headers: NO_STORE_HEADERS });
}

function resolveOrigin(request: Request): string {
  const url = new URL(request.url);
  const hostname = url.hostname.toLowerCase();
  const knownHttpsHost = url.protocol === 'https:' && (
    hostname === 'idiomaswl.com'
    || hostname === 'www.idiomaswl.com'
    || hostname.endsWith('.vercel.app')
  );
  const localDevelopment = process.env.NODE_ENV !== 'production'
    && (hostname === 'localhost' || hostname === '127.0.0.1');
  return knownHttpsHost || localDevelopment ? url.origin : PRODUCTION_ORIGIN;
}

export async function POST(request: Request): Promise<Response> {
  if (!isRegistrationCheckoutEnabled()) {
    return json({ code: 'pilot_disabled', message: 'El piloto de cobro todavía no está habilitado.' }, 503);
  }

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

  const selection = parseRegistrationSelection(body);
  if (!selection) {
    return json({ code: 'invalid_selection', message: 'El tipo de cuenta o el plan no es válido.' }, 400);
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return json({ code: 'unauthorized', message: 'Inicia sesión para continuar con el pago.' }, 401);

  try {
    const redirectUrl = new URL('/dashboard/planes?payment=return', resolveOrigin(request)).toString();
    const checkout = await createRegistrationCheckout({
      userId: user.id,
      selection,
      redirectUrl,
    });
    return json(checkout, 201);
  } catch (error) {
    if (error instanceof WompiConfigurationError) {
      return json({ code: 'wompi_not_configured', message: 'El checkout está temporalmente fuera de servicio.' }, 503);
    }
    console.error('[registration-checkout] No se pudo preparar el pago:', error instanceof Error ? error.message : 'unknown');
    return json({ code: 'checkout_unavailable', message: error instanceof Error ? error.message : 'No pudimos abrir el pago.' }, 503);
  }
}
