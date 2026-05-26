import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

// ── Input constraints ──────────────────────────────────────────────────────────
const MAX_AUDIO_BYTES = 10 * 1024 * 1024; // 10 MB — enough for any recording session

/** Extensions we'll actually accept; keeps storage clean and blocks disguised uploads. */
const ALLOWED_EXTENSIONS = new Set(['webm', 'mp3', 'mp4', 'wav', 'm4a', 'ogg']);

/** Corresponding MIME types. Browser MediaRecorder typically sends audio/webm. */
const ALLOWED_MIME_TYPES = new Set([
  'audio/webm',
  'audio/mpeg',
  'audio/mp3',
  'audio/mp4',
  'audio/wav',
  'audio/x-wav',
  'audio/x-m4a',
  'audio/m4a',
  'audio/ogg',
  'video/mp4',  // some iOS devices send video/mp4 for audio recordings
]);

/** Valid difficulty levels that the Korean cycle exposes. */
const ALLOWED_NIVELES = new Set(['A1', 'A2', 'B1', 'B2', 'C1']);

// ── Simple in-memory rate limiter ──────────────────────────────────────────────
// NOTE: Vercel spins up multiple serverless instances so this only throttles
// bursts within a single warm instance. For cross-instance limiting use Upstash
// Redis with the @upstash/ratelimit package.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT    = 5;       // max submissions per window
const RATE_WINDOW   = 60_000;  // 1 minute

function isRateLimited(key: string): boolean {
  const now    = Date.now();
  const record = rateLimitMap.get(key);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  if (record.count >= RATE_LIMIT) return true;
  record.count += 1;
  return false;
}

// ── Helpers ────────────────────────────────────────────────────────────────────
/** Sanitize a string so it is safe to embed in a storage path. */
function sanitizePath(s: string): string {
  return s.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 64);
}

/**
 * Validate the `respuestas` JSON field.
 * We only accept a plain object or array of plain objects — no primitives.
 * Returns the parsed value on success, or null if the input is empty.
 * Throws on invalid JSON or unexpected shape.
 */
function parseRespuestas(raw: string | null): Record<string, unknown> | unknown[] | null {
  if (!raw) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('respuestas: JSON inválido');
  }
  if (parsed === null || typeof parsed !== 'object') {
    throw new Error('respuestas: debe ser un objeto o arreglo');
  }
  return parsed as Record<string, unknown> | unknown[];
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    // ── Rate limiting (use IP from forwarded header if available) ────────────
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Espera un momento e intenta de nuevo.' },
        { status: 429 },
      );
    }

    const form = await request.formData();
    const audio     = form.get('audio') as File | null;
    const username  = form.get('username') as string | null;
    const email     = form.get('email') as string | null;
    const nivel     = form.get('nivel') as string | null;
    const textoId   = form.get('texto_id') as string | null;
    const quizLevel = form.get('quiz_level') as string | null;
    const respuestas = form.get('respuestas') as string | null;

    // ── Required field check ─────────────────────────────────────────────────
    if (!audio || !username || !nivel || !textoId) {
      return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 });
    }

    // ── File size guard ──────────────────────────────────────────────────────
    if (audio.size > MAX_AUDIO_BYTES) {
      return NextResponse.json(
        { error: 'El archivo de audio supera el tamaño máximo permitido (10 MB).' },
        { status: 413 },
      );
    }

    // ── Extension whitelist ──────────────────────────────────────────────────
    const ext = (audio.name.split('.').pop() ?? '').toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: 'Formato de audio no permitido.' },
        { status: 415 },
      );
    }

    // ── MIME type check ──────────────────────────────────────────────────────
    // Strip codec params (e.g. "audio/webm;codecs=opus" → "audio/webm")
    const contentType = audio.type.split(';')[0].toLowerCase() || 'audio/webm';
    if (!ALLOWED_MIME_TYPES.has(contentType)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no permitido.' },
        { status: 415 },
      );
    }

    // ── nivel allowlist ──────────────────────────────────────────────────────
    if (!ALLOWED_NIVELES.has(nivel)) {
      return NextResponse.json({ error: 'Nivel inválido.' }, { status: 400 });
    }

    // ── textoId: only alphanumeric + dashes/underscores, max 64 chars ────────
    if (!/^[a-zA-Z0-9_-]{1,64}$/.test(textoId)) {
      return NextResponse.json({ error: 'ID de texto inválido.' }, { status: 400 });
    }

    // ── respuestas schema validation ─────────────────────────────────────────
    let parsedRespuestas: Record<string, unknown> | unknown[] | null;
    try {
      parsedRespuestas = parseRespuestas(respuestas);
    } catch (e) {
      return NextResponse.json({ error: (e as Error).message }, { status: 400 });
    }

    // ── Build safe storage path ──────────────────────────────────────────────
    const supabase  = createAdminClient();
    const timestamp = Date.now();
    const path      = `${timestamp}_${sanitizePath(username)}_${nivel}_${textoId}.${ext}`;

    // Upload audio to Supabase Storage
    const arrayBuffer = await audio.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from('cycle-audio')
      .upload(path, arrayBuffer, { contentType, upsert: false });

    if (uploadError) {
      console.error('[submit-audio] storage error:', uploadError);
      return NextResponse.json({ error: 'Error al subir el audio.' }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage.from('cycle-audio').getPublicUrl(path);

    // ── Save metadata to DB ──────────────────────────────────────────────────
    const { error: dbError } = await supabase.from('cycle_submissions').insert({
      username,
      email:     email || null,
      nivel,
      texto_id:  textoId,
      quiz_level: quizLevel,
      audio_url: publicUrl,
      audio_path: path,
      respuestas: parsedRespuestas,
    });

    if (dbError) {
      console.error('[submit-audio] db error:', dbError);
      // Audio was uploaded; still return success to the user so they are not
      // prompted to re-record — the teacher can still access the audio directly.
    }

    return NextResponse.json({ success: true, message: 'Audio enviado correctamente.' });
  } catch (err) {
    console.error('[submit-audio] unexpected:', err);
    return NextResponse.json({ error: 'Error inesperado del servidor.' }, { status: 500 });
  }
}
