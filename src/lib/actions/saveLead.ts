'use server';

import { createHmac } from 'node:crypto';
import { headers } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/admin';
import { normalizeEmail, normalizeWhatsapp } from '@/lib/leads/contact';

export interface LeadInput {
  name: string;
  whatsapp: string;
  email?: string;
  examSlug?: string;
  examScore?: string;
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  landingPage?: string;
  referrer?: string;
  contactConsent?: boolean;
  marketingConsent?: boolean;
  consentVersion?: string;
  profileData?: Record<string, unknown>;
  /** Invisible field for bot detection. Human-facing forms leave it empty. */
  company?: string;
}

function sanitize(v: unknown, max = 256): string | null {
  if (typeof v !== 'string' || !v.trim()) return null;
  return v.trim().replace(/[\u0000-\u001f\u007f]/g, '').slice(0, max) || null;
}

function sanitizeReferrer(value: unknown): string | null {
  const raw = sanitize(value, 512);
  if (!raw) return null;
  try {
    return new URL(raw).hostname.slice(0, 253) || null;
  } catch {
    return sanitize(raw, 253);
  }
}

function sanitizeProfile(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  try {
    const serialized = JSON.stringify(value);
    if (serialized.length > 8_000) return {};
    return JSON.parse(serialized) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export async function saveLead(input: LeadInput): Promise<{ ok: boolean; id?: string; error?: string }> {
  // Honeypots receive a successful-looking response so bots do not learn how to bypass it.
  if (sanitize(input.company, 120)) return { ok: true };

  const whatsapp = normalizeWhatsapp(input.whatsapp);
  if (!whatsapp) return { ok: false, error: 'Ingresa un WhatsApp válido de 10 a 15 dígitos.' };

  const rawEmail = sanitize(input.email, 254);
  const email = rawEmail ? normalizeEmail(rawEmail) : null;
  if (rawEmail && !email) return { ok: false, error: 'Ingresa un correo electrónico válido.' };

  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim();
  const clientFingerprint = `${forwardedFor ?? 'unknown'}|${requestHeaders.get('user-agent') ?? 'unknown'}`;
  const hashKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!hashKey) {
    console.error('[saveLead] SUPABASE_SERVICE_ROLE_KEY is not configured');
    return { ok: false, error: 'No pudimos guardar tus datos. Intenta de nuevo.' };
  }
  const rateKey = createHmac('sha256', hashKey).update(clientFingerprint).digest('hex');
  const supabase = createAdminClient();

  const { data, error } = await supabase.rpc('capture_public_lead', {
    p_lead: {
      name: sanitize(input.name, 100),
      whatsapp,
      email,
      exam_slug: sanitize(input.examSlug, 64),
      exam_score: sanitize(input.examScore, 128),
      source: sanitize(input.source, 64) ?? 'unknown',
      utm_source: sanitize(input.utmSource, 128),
      utm_medium: sanitize(input.utmMedium, 128),
      utm_campaign: sanitize(input.utmCampaign, 128),
      utm_content: sanitize(input.utmContent, 128),
      utm_term: sanitize(input.utmTerm, 128),
      landing_page: sanitize(input.landingPage, 512),
      referrer_host: sanitizeReferrer(input.referrer),
      contact_consent: input.contactConsent === true,
      marketing_consent: input.marketingConsent === true,
      consent_version: sanitize(input.consentVersion, 64),
      profile_data: sanitizeProfile(input.profileData),
    },
    p_rate_key: rateKey,
  });

  if (error) {
    console.error('[saveLead]', error.message);
    if (error.message.includes('lead_rate_limit')) {
      return { ok: false, error: 'Recibimos varios envíos seguidos. Espera unos minutos e inténtalo de nuevo.' };
    }
    return { ok: false, error: 'No pudimos guardar tus datos. Intenta de nuevo.' };
  }

  return { ok: true, id: typeof data === 'string' ? data : undefined };
}
