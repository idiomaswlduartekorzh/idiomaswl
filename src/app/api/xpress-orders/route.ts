import { json, readBody, sameOrigin } from '@/lib/course-pricing/http.server';
import { parseXpressOrderInput } from '@/lib/xpress-commerce/payment';
import { prepareXpressOrder, xpressUser } from '@/lib/xpress-commerce/payments.server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ message: 'Solicitud no permitida.' }, 403);
  const user = await xpressUser();
  if (!user) return json({ message: 'Inicia sesión para comprar una membresía.' }, 401);
  let input;
  try { input = parseXpressOrderInput(await readBody(request)); }
  catch { return json({ message: 'Revisa la selección.' }, 400); }
  if (!input) return json({ message: 'Selecciona un plan y acepta las condiciones.' }, 400);
  try {
    const order = await prepareXpressOrder(user, input);
    return json({ orderId: order.id }, 201);
  } catch (error) {
    const code = error instanceof Error ? error.message : 'xpress_order_prepare_failed';
    if (code === 'xpress_already_included') return json({ message: 'Ese plan ya está activo en tu cuenta.' }, 409);
    if (code === 'xpress_change_next_period') return json({ message: 'El cambio de examen o la reducción de plan se aplica al siguiente periodo.' }, 409);
    if (code === 'xpress_exam_mismatch') return json({ message: 'El examen no coincide con el que elegiste al registrarte.' }, 403);
    if (code === 'xpress_order_pending') {
      const { createAdminClient } = await import('@/lib/supabase/admin');
      const config = (await import('@/lib/wompi/server')).getWompiServerConfig();
      const { data } = await createAdminClient().from('xpress_orders').select('id').eq('user_id', user.id)
        .eq('environment', config.environment).gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false }).limit(1).maybeSingle();
      return json({ message: 'Ya tienes un pago abierto. Continúa con esa orden para evitar un cobro duplicado.', existingOrderId: data?.id ?? null }, 409);
    }
    console.error('[xpress-orders] unable to prepare order', { code });
    return json({ message: 'No pudimos guardar la compra. No se abrió ningún cobro.' }, 503);
  }
}

export async function GET() {
  const user = await xpressUser();
  if (!user) return json({ message: 'Inicia sesión para ver tus pagos.' }, 401);
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin');
    const { data, error } = await createAdminClient().from('xpress_orders')
      .select('id,created_at,amount_in_cents,offer_id,exam_slug').eq('user_id', user.id)
      .order('created_at', { ascending: false }).limit(30).abortSignal(AbortSignal.timeout(8000));
    if (error) throw error;
    return json({ orders: data });
  } catch {
    return json({ message: 'No podemos consultar tus pagos en este momento.' }, 503);
  }
}
