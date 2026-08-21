import { createAdminClient } from '@/lib/supabase/admin';
import type {
  ConversationSnapshot,
  ConversationStage,
  ConversationStatus,
  ConversationUpdates,
} from './chatbot';
import type { InboundWhatsAppMessage } from './payload';

export interface StoredConversation extends ConversationSnapshot {
  waId: string;
  profileName: string | null;
}

interface ConversationRow {
  wa_id: string;
  profile_name: string | null;
  stage: ConversationStage;
  status: ConversationStatus;
  language: string | null;
  goal: string | null;
  level: string | null;
}

function assertSupabaseConfiguration(): void {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()) {
    throw new Error('Missing server environment variable: NEXT_PUBLIC_SUPABASE_URL');
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) {
    throw new Error('Missing server environment variable: SUPABASE_SERVICE_ROLE_KEY');
  }
}

function toStoredConversation(row: ConversationRow): StoredConversation {
  return {
    waId: row.wa_id,
    profileName: row.profile_name,
    stage: row.stage,
    status: row.status,
    language: row.language,
    goal: row.goal,
    level: row.level,
  };
}

export async function getOrCreateConversation(
  message: InboundWhatsAppMessage,
): Promise<StoredConversation> {
  assertSupabaseConfiguration();
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const values: Record<string, string> = {
    wa_id: message.from,
    last_message_at: message.timestamp ?? now,
    updated_at: now,
  };
  if (message.profileName) values.profile_name = message.profileName;

  const { data, error } = await supabase
    .from('whatsapp_conversations')
    .upsert(values, { onConflict: 'wa_id' })
    .select('wa_id,profile_name,stage,status,language,goal,level')
    .single();

  if (error || !data) {
    throw new Error(`Could not load WhatsApp conversation: ${error?.message ?? 'missing row'}`);
  }

  return toStoredConversation(data as ConversationRow);
}

export async function claimInboundMessage(message: InboundWhatsAppMessage): Promise<boolean> {
  assertSupabaseConfiguration();
  const supabase = createAdminClient();
  const { error } = await supabase.from('whatsapp_messages').insert({
    id: message.id,
    wa_id: message.from,
    direction: 'inbound',
    message_type: message.type,
    body: message.text,
    created_at: message.timestamp ?? new Date().toISOString(),
  });

  if (!error) return true;
  if (error.code === '23505') return false;
  throw new Error(`Could not claim WhatsApp message: ${error.message}`);
}

export async function releaseInboundMessage(messageId: string): Promise<void> {
  assertSupabaseConfiguration();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('whatsapp_messages')
    .delete()
    .eq('id', messageId)
    .eq('direction', 'inbound');

  if (error) console.error('[whatsapp] could not release failed inbound message', error.message);
}

export async function applyConversationUpdates(
  waId: string,
  updates: ConversationUpdates,
): Promise<void> {
  assertSupabaseConfiguration();
  const supabase = createAdminClient();
  const values = {
    ...updates,
    updated_at: new Date().toISOString(),
    last_message_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('whatsapp_conversations')
    .update(values)
    .eq('wa_id', waId);

  if (error) throw new Error(`Could not update WhatsApp conversation: ${error.message}`);
}

export async function recordOutboundMessage(
  id: string,
  waId: string,
  body: string,
): Promise<void> {
  assertSupabaseConfiguration();
  const supabase = createAdminClient();
  const { error } = await supabase.from('whatsapp_messages').insert({
    id,
    wa_id: waId,
    direction: 'outbound',
    message_type: 'text',
    body,
  });

  if (error && error.code !== '23505') {
    throw new Error(`Could not store outbound WhatsApp message: ${error.message}`);
  }
}
