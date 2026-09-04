'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { createAdminClient } from '@/lib/supabase/admin';
import { CONTACT_REF_PATTERN } from '@/lib/whatsapp/attribution';

export async function confirmContact(_state: { message: string }, form: FormData) {
  let admin;
  try { admin = await requireAdmin(); } catch { return { message: 'No tienes permisos para confirmar contactos.' }; }
  if (process.env.NEXT_PUBLIC_WHATSAPP_ATTRIBUTION_ENABLED !== 'true') return { message: 'La atribución aún no está activada.' };
  const reference = String(form.get('reference') ?? '').trim().toUpperCase();
  const operation = form.get('operation');
  if (!CONTACT_REF_PATTERN.test(reference) || !['confirm', 'undo'].includes(String(operation))) {
    return { message: 'Pega la referencia WL completa que aparece en el mensaje de WhatsApp.' };
  }
  try {
    const { error } = await createAdminClient().from('whatsapp_contact_manual_events').insert({
      reference, actor_id: admin.id, confirmed: operation === 'confirm',
    }).abortSignal(AbortSignal.timeout(8000));
    if (error?.code === '23503') return { message: 'No encontramos esa referencia. Comprueba el código; el registro del clic puede no haber llegado todavía.' };
    if (error) return { message: 'No se pudo guardar la confirmación. Inténtalo de nuevo.' };
  } catch { return { message: 'El servicio no está disponible. La confirmación no se guardó.' }; }
  revalidatePath('/dashboard/admin/contactos');
  return { message: operation === 'confirm' ? 'Contacto confirmado por asesor. No se ha enviado ningún mensaje.' : 'Confirmación manual retirada; el historial se conserva.' };
}
