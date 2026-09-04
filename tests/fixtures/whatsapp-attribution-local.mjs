/** Local QA adapter, never imported by the application or connected to a real account.
 * PGLITE_MODULE=/path/to/pglite/dist/index.js node tests/fixtures/whatsapp-attribution-local.mjs
 * Bindings: 127.0.0.1:54329; credentials and people below are test fixtures only.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const { PGlite } = await import(process.env.PGLITE_MODULE ?? '@electric-sql/pglite');
const db = new PGlite();
await db.exec('create role anon; create role authenticated; create role service_role bypassrls; grant usage on schema public to service_role;');
await db.exec(await readFile(new URL('../../supabase/migrations/20260904163657_whatsapp_contact_attribution.sql', import.meta.url), 'utf8'));
await db.exec('set role service_role');
const ref = n => `WL-${String(n).padStart(24, '0')}`;
for (const [n, page, source] of [[1, '/examenes/ielts', 'instagram'], [2, '/clases-de-coreano', null], [3, '/blog/ielts', 'newsletter']]) {
  await db.query('select public.record_whatsapp_contact_intent($1::jsonb,$2)', [JSON.stringify({ reference: ref(n), source_page: page,
    landing_page: '/blog/ielts', utm_source: source, utm_medium: source ? 'social' : null,
    utm_campaign: source ? 'qa-septiembre' : null, channel: source ? 'Campaña etiquetada' : 'Directo / desconocido', interaction: 'click' }), 'a'.repeat(64)]);
}
await db.query('insert into public.whatsapp_contact_messages(message_id,wa_id,occurred_at,reference) values($1,$2,now(),$3)', ['wamid.fixture.1', '573000000001', ref(1)]);
await db.query("insert into public.whatsapp_contact_messages(message_id,wa_id,occurred_at) values('wamid.fixture.2','573000000002',now())");
let offline = false;
const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1:54329');
  const reply = (status, data) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(data === undefined ? '' : JSON.stringify(data)); };
  if (url.pathname === '/__test/offline') { offline = url.searchParams.get('value') === 'true'; return reply(200, { offline }); }
  if (url.pathname === '/auth/v1/user') {
    let claims;
    try { claims = JSON.parse(Buffer.from((req.headers.authorization ?? '').split('.')[1], 'base64url')); } catch { return reply(401, { message: 'Local QA: invalid token' }); }
    if (!['qa-admin', 'qa-student'].includes(claims.test_role)) return reply(401, { message: 'Local QA only' });
    return reply(200, { id: '00000000-0000-4000-8000-000000000001', aud: 'authenticated', role: 'authenticated',
      email: claims.test_role === 'qa-admin' ? 'jose@welearn.com' : 'student@example.invalid',
      app_metadata: {}, user_metadata: { role: 'admin' }, created_at: new Date().toISOString() });
  }
  if (offline) return reply(503, { code: 'LOCAL_QA_OFFLINE', message: 'Simulated local outage' });
  if (!url.pathname.startsWith('/rest/v1/')) return reply(404, {});
  if (req.headers.apikey !== 'local-attribution-service-only') return reply(403, { code: '42501' });
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  let data;
  try { data = JSON.parse(Buffer.concat(chunks).toString() || '{}'); } catch { return reply(400, {}); }
  try {
    if (url.pathname === '/rest/v1/rpc/record_whatsapp_contact_intent') {
      const result = await db.query('select public.record_whatsapp_contact_intent($1::jsonb,$2) as result', [JSON.stringify(data.p_intent), data.p_rate_key]);
      return reply(200, result.rows[0].result);
    }
    if (url.pathname === '/rest/v1/rpc/whatsapp_contact_report') {
      const result = await db.query('select public.whatsapp_contact_report($1,$2,$3,$4) as result', [data.p_start, data.p_end, data.p_page, data.p_reference]);
      return reply(200, result.rows[0].result);
    }
    if (url.pathname === '/rest/v1/whatsapp_contact_manual_events') {
      await db.query('insert into public.whatsapp_contact_manual_events(reference,actor_id,confirmed) values($1,$2,$3)', [data.reference, data.actor_id, data.confirmed]);
      return reply(201);
    }
    if (url.pathname === '/rest/v1/whatsapp_contact_messages') {
      await db.query('insert into public.whatsapp_contact_messages(message_id,wa_id,occurred_at,reference) values($1,$2,$3,$4) on conflict(message_id) do nothing', [data.message_id, data.wa_id, data.occurred_at, data.reference]);
      return reply(201);
    }
    return reply(404, { message: 'Not supported by local QA adapter' });
  } catch (error) { return reply(400, { code: error.code, message: 'Local QA SQL error' }); }
});
server.listen(54329, '127.0.0.1', () => console.log('Local-only attribution QA database ready: 127.0.0.1:54329 (synthetic fixtures)'));
process.on('SIGTERM', () => server.close(() => db.close().then(() => process.exit(0))));
