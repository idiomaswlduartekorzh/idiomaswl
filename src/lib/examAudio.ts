// Resolvedor de URL de audio de exámenes.
//
// Los audios de los simulacros (IELTS, TOEFL, CILS, CELPE-Bras, TOPIK, Goethe, DELF)
// pesan cientos de MB en total — demasiado para commitear en el repo/deploy (mismo
// criterio que los assets coreanos, excluidos en .vercelignore). En su lugar se alojan
// en un bucket público (Supabase Storage, como ya se hace con `cycle-audio`).
//
// - Si `NEXT_PUBLIC_EXAM_AUDIO_BASE` está definida, los paths locales `/audio/…` se
//   sirven desde ese bucket/CDN. Sube el árbol `public/audio/<familia>/…` al bucket
//   preservando la estructura y apunta la env var a la raíz pública del bucket
//   (p. ej. `https://<proj>.supabase.co/storage/v1/object/public/exam-audio`).
// - Sin la env var, cae al archivo local `/audio/…` (desarrollo) sin romper nada.
// - Las URLs absolutas (http/https, p. ej. embeds de YouTube) pasan sin tocar.
const BASE = (process.env.NEXT_PUBLIC_EXAM_AUDIO_BASE || '').replace(/\/+$/, '');

export function resolveAudioUrl(src?: string): string | undefined {
  if (!src) return src;
  if (/^https?:\/\//i.test(src)) return src;          // YouTube / URL absoluta
  if (BASE && src.startsWith('/audio/')) return BASE + src.slice('/audio'.length);
  return src;                                          // fallback local
}
