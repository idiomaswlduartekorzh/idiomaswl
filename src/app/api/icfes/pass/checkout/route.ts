import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * The COP 12.900 one-time report was retired on 2026-10-20. Historical orders
 * remain verifiable by the payment webhook, but no request can create or reopen
 * a charge through this endpoint.
 */
export async function POST(): Promise<Response> {
  const response = NextResponse.json({
    ok: false,
    error: 'Este producto ya no está disponible. Elige un plan para tu examen desde tu cuenta.',
    code: 'legacy_icfes_pass_retired',
  }, { status: 410 });
  response.headers.set('cache-control', 'private, no-store, max-age=0');
  return response;
}
