import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = path => readFileSync(path, 'utf8');

test('Nivel Radar publica una promesa SEO verificable y FAQ visible con schema', () => {
  const page = read('src/app/(site)/nivel-radar/page.tsx');
  assert.match(page, /Test de nivel de inglés gratis A1–C2/);
  assert.match(page, /'@type': 'WebApplication'/);
  assert.match(page, /'@type': 'FAQPage'/);
  assert.match(page, /FAQ\.map\(item => <details/);
  assert.match(page, /No sustituye IELTS, TOEFL, Cambridge ni otro certificado oficial/);
  assert.match(page, /href="\/practica\/ingles"/);
});

test('la captura del diagnóstico ocurre después del resultado y preserva atribución y consentimiento', () => {
  const legacy = read('src/app/(site)/nivel-radar/NivelRadarClient.tsx');
  const adaptive = read('src/app/(site)/nivel-radar/AdaptiveNivelRadarClient.tsx');
  const capture = read('src/app/(site)/nivel-radar/NivelRadarLeadCapture.tsx');

  assert.match(legacy, /<NivelRadarLeadCapture/);
  assert.match(adaptive, /!reviewMode && <NivelRadarLeadCapture/);
  assert.match(capture, /source: 'nivel-radar'/);
  assert.match(capture, /utmContent: params\.get\('utm_content'\)/);
  assert.match(capture, /contactConsent/);
  assert.match(capture, /marketingConsent/);
  assert.match(capture, /event: 'nivel_radar_lead_captured'/);
  assert.match(capture, /Tu resultado ya es visible y descargable/);
});

test('la persistencia de leads es server-only, limitada y deduplicada', () => {
  const action = read('src/lib/actions/saveLead.ts');
  const migration = read('supabase/migrations/20260928040639_nivel_radar_lead_capture.sql');

  assert.match(action, /createAdminClient/);
  assert.match(action, /createHmac\('sha256'/);
  assert.match(action, /capture_public_lead/);
  assert.match(migration, /drop policy if exists "leads_insert_anon"/);
  assert.match(migration, /revoke insert on table public\.leads from anon, authenticated/);
  assert.match(migration, /lead_rate_limit/);
  assert.match(migration, /interval '24 hours'/);
  assert.match(migration, /grant execute on function public\.capture_public_lead\(jsonb, text\) to service_role/);
});

test('el admin incluye Nivel Radar, adquisición, consentimiento y estado', () => {
  const server = read('src/app/(site)/dashboard/admin/JoseDashboardServer.tsx');
  const client = read('src/app/(site)/dashboard/admin/JoseDashboard.tsx');

  assert.match(server, /source\.eq\.nivel-radar/);
  assert.match(server, /if \(slug === 'nivel-radar'\) return 'Nivel Radar'/);
  assert.match(server, /utm_campaign, utm_content, utm_term/);
  assert.match(client, /Leads de diagnósticos y simulacros/);
  assert.match(client, /Contact(?:o|o:)/);
  assert.match(client, /Marketing:/);
  assert.match(client, /LEAD_STATUS_LABELS/);
});
