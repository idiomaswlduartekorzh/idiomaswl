/**
 * Freno de cuota para el free tier.
 *
 * NOTA (mismo caveat que api/practica/submit-audio): Vercel levanta varias
 * instancias serverless, así que este Map solo limita ráfagas dentro de una
 * instancia caliente. Es suficiente para validar el blueprint. Antes de
 * inyectar esto a producción con tráfico real, mover a Upstash Redis
 * (@upstash/ratelimit) — de lo contrario un pico agota la cuota diaria de
 * Gemini y la herramienta se cae para todos.
 */

const buckets = new Map<string, { count: number; resetAt: number }>();

export interface RateLimitRule {
  /** Peticiones permitidas por ventana. */
  limit:    number;
  /** Duración de la ventana en ms. */
  windowMs: number;
}

/** Gemini free tier: 10 req/min. Dejamos margen: 6/min por IP. */
export const WRITING_RULE: RateLimitRule = { limit: 6, windowMs: 60_000 };

export function checkRateLimit(key: string, rule: RateLimitRule): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + rule.windowMs });
    return true;
  }
  if (bucket.count >= rule.limit) return false;

  bucket.count += 1;
  return true;
}

/** Evita que el Map crezca sin techo en una instancia de larga vida. */
export function pruneExpired(): void {
  const now = Date.now();
  for (const [k, v] of buckets) {
    if (now > v.resetAt) buckets.delete(k);
  }
}
