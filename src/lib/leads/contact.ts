import { normalizeWhatsAppPhone } from '../course-pricing/phone.ts'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Match the contact-capture RPC's E.164 contract while accepting a local Colombian number. */
export function normalizeLeadWhatsapp(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const input = value.normalize('NFKC').trim().replace(/^00[ ]*(?=[1-9])/, '+')
  if (/^(\d)\1+$/.test(input.replace(/\D/g, ''))) return null
  const phone = normalizeWhatsAppPhone(input)
  return phone && /^\+[1-9]\d{9,14}$/.test(phone) ? phone : null
}

/** Keep a readable phone label for callers that display the user's input. */
export function normalizeWhatsapp(value: unknown): string | null {
  if (typeof value !== 'string' || !normalizeLeadWhatsapp(value)) return null
  return value.normalize('NFKC').trim().slice(0, 24)
}

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null

  const email = value.trim().toLowerCase().slice(0, 254)
  return EMAIL_PATTERN.test(email) ? email : null
}

export function isPlausibleWhatsapp(value: unknown): boolean {
  return normalizeLeadWhatsapp(value) !== null
}

export function isPlausibleEmail(value: unknown): boolean {
  return normalizeEmail(value) !== null
}
