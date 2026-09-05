const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Conserva un formato legible para el panel, pero exige suficientes dígitos
 * para que el contacto pueda usarse de verdad. El máximo de 15 viene del
 * formato telefónico internacional; 10 cubre los celulares colombianos.
 */
export function normalizeWhatsapp(value: unknown): string | null {
  if (typeof value !== 'string') return null

  const cleaned = value.replace(/[^\d+\s\-()]/g, '').trim()
  const digits = cleaned.replace(/\D/g, '')

  if (digits.length < 10 || digits.length > 15) return null
  if (/^(\d)\1+$/.test(digits)) return null

  return cleaned.slice(0, 24)
}

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null

  const email = value.trim().toLowerCase().slice(0, 254)
  return EMAIL_PATTERN.test(email) ? email : null
}

export function isPlausibleWhatsapp(value: unknown): boolean {
  return normalizeWhatsapp(value) !== null
}

export function isPlausibleEmail(value: unknown): boolean {
  return normalizeEmail(value) !== null
}
