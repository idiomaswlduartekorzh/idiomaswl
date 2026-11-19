import { validOrderId } from '@/lib/course-pricing/http.server';
export const runtime = 'nodejs';
export async function GET(request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  if (!validOrderId(orderId)) return new Response('Not found', { status: 404 });
  const url = new URL('/inscripcion', request.url);
  url.searchParams.set('orden', orderId);
  url.searchParams.set('epayco_retorno', '1');
  const reference = new URL(request.url).searchParams.get('ref_payco');
  if (reference && /^[A-Za-z0-9_-]{6,100}$/.test(reference)) url.searchParams.set('ref_payco', reference);
  return Response.redirect(url, 303);
}
