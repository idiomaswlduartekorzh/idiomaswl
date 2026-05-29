'use server';

import { createClient } from '@/lib/supabase/server';

export interface LeadInput {
  name:        string;
  whatsapp:    string;
  email?:      string;
  examSlug?:   string;
  examScore?:  string;
  source:      string;
  utmSource?:  string;
  utmMedium?:  string;
  utmCampaign?:string;
}

function sanitize(v: unknown, max = 256): string | null {
  if (typeof v !== 'string' || !v.trim()) return null;
  return v.trim().slice(0, max);
}

function sanitizePhone(v: unknown): string | null {
  if (typeof v !== 'string') return null;
  // Keep only digits, +, spaces, hyphens — then strip to digits for storage
  const cleaned = v.replace(/[^\d+\s\-()]/g, '').trim();
  return cleaned.length >= 7 ? cleaned.slice(0, 20) : null;
}

export async function saveLead(input: LeadInput): Promise<{ ok: boolean; error?: string }> {
  const whatsapp = sanitizePhone(input.whatsapp);
  if (!whatsapp) return { ok: false, error: 'WhatsApp requerido' };

  const supabase = await createClient();

  const { error } = await supabase.from('leads').insert({
    name:         sanitize(input.name),
    whatsapp,
    email:        sanitize(input.email),
    exam_slug:    sanitize(input.examSlug, 64),
    exam_score:   sanitize(input.examScore, 128),
    source:       sanitize(input.source, 64) ?? 'unknown',
    utm_source:   sanitize(input.utmSource, 128),
    utm_medium:   sanitize(input.utmMedium, 128),
    utm_campaign: sanitize(input.utmCampaign, 128),
  });

  if (error) {
    console.error('[saveLead]', error.message);
    return { ok: false, error: 'Error al guardar. Intenta de nuevo.' };
  }

  return { ok: true };
}
