/** Normalize a WhatsApp number for storage while keeping Colombian entry simple. */
export function normalizeWhatsAppPhone(value: unknown): string | null {
  if (typeof value !== 'string') return null;

  const input = value.normalize('NFKC').trim();
  if (!input || /[\x00-\x1f\x7f]/.test(input) || !/^\+?[\d\s().-]+$/.test(input)) return null;

  const digits = input.replace(/\D/g, '');
  if (/^\d{10}$/.test(digits)) return `+57${digits}`;
  if (/^57\d{10}$/.test(digits)) return `+${digits}`;
  if (input.startsWith('+') && /^[1-9]\d{7,14}$/.test(digits)) return `+${digits}`;

  return null;
}
