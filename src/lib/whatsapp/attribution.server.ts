import 'server-only';
import { createAdminClient } from '@/lib/supabase/admin';
import { referenceFromText } from './attribution';
import type { InboundWhatsAppMessage } from './payload';

/** After signature verification, before bot deduplication. */
export async function recordMessageAttribution(message: InboundWhatsAppMessage) {
  if (process.env.NEXT_PUBLIC_WHATSAPP_ATTRIBUTION_ENABLED !== 'true') return;
  const { error } = await createAdminClient().from('whatsapp_contact_messages').upsert({
    message_id: message.id, wa_id: message.from,
    occurred_at: message.timestamp ?? new Date().toISOString(),
    reference: referenceFromText(message.text),
  }, { onConflict: 'message_id', ignoreDuplicates: true }).abortSignal(AbortSignal.timeout(8000));
  if (error) throw new Error('WhatsApp attribution persistence failed.');
}
