export interface InboundWhatsAppMessage {
  id: string;
  from: string;
  profileName: string | null;
  text: string | null;
  type: string;
  timestamp: string | null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function safeString(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed && trimmed.length <= maxLength ? trimmed : null;
}

function messageText(message: Record<string, unknown>): string | null {
  const text = asRecord(message.text);
  const textBody = safeString(text?.body, 4096);
  if (textBody) return textBody;

  const interactive = asRecord(message.interactive);
  const buttonReply = asRecord(interactive?.button_reply);
  const buttonTitle = safeString(buttonReply?.title, 256);
  if (buttonTitle) return buttonTitle;

  const listReply = asRecord(interactive?.list_reply);
  const listTitle = safeString(listReply?.title, 256);
  if (listTitle) return listTitle;

  const legacyButton = asRecord(message.button);
  return safeString(legacyButton?.text, 256);
}

function isoTimestamp(value: unknown): string | null {
  const seconds = typeof value === 'string' ? Number(value) : Number.NaN;
  if (!Number.isFinite(seconds) || seconds <= 0) return null;

  const date = new Date(seconds * 1000);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function extractInboundMessages(payload: unknown): InboundWhatsAppMessage[] {
  const root = asRecord(payload);
  if (!root || root.object !== 'whatsapp_business_account') return [];

  const inbound: InboundWhatsAppMessage[] = [];

  for (const rawEntry of asArray(root.entry)) {
    const entry = asRecord(rawEntry);
    if (!entry) continue;

    for (const rawChange of asArray(entry.changes)) {
      const change = asRecord(rawChange);
      const value = asRecord(change?.value);
      if (!value) continue;

      const profileNames = new Map<string, string>();
      for (const rawContact of asArray(value.contacts)) {
        const contact = asRecord(rawContact);
        const waId = safeString(contact?.wa_id, 32);
        const profile = asRecord(contact?.profile);
        const name = safeString(profile?.name, 160);
        if (waId && name) profileNames.set(waId, name);
      }

      for (const rawMessage of asArray(value.messages)) {
        const message = asRecord(rawMessage);
        if (!message) continue;

        const id = safeString(message.id, 512);
        const from = safeString(message.from, 32);
        if (!id || !from || !/^\d{7,32}$/.test(from)) continue;

        inbound.push({
          id,
          from,
          profileName: profileNames.get(from) ?? null,
          text: messageText(message),
          type: safeString(message.type, 64) ?? 'unknown',
          timestamp: isoTimestamp(message.timestamp),
        });
      }
    }
  }

  return inbound;
}
