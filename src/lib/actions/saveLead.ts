'use server';

import { createClient } from '@/lib/supabase/server';
import { normalizeEmail, normalizeWhatsapp } from '@/lib/leads/contact';

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

export async function saveLead(input: LeadInput): Promise<{ ok: boolean; error?: string }> {
  const whatsapp = normalizeWhatsapp(input.whatsapp);
  if (!whatsapp) return { ok: false, error: 'Ingresa un WhatsApp válido de 10 a 15 dígitos.' };

  const rawEmail = sanitize(input.email, 254);
  const email = rawEmail ? normalizeEmail(rawEmail) : null;
  if (rawEmail && !email) return { ok: false, error: 'Ingresa un correo electrónico válido.' };

  const supabase = await createClient();

  const { error } = await supabase.from('leads').insert({
    name:         sanitize(input.name),
    whatsapp,
    email,
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
