import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Optional isolated PostgreSQL engine. Never connects to a Supabase project.
const { PGlite } = await import(process.env.PGLITE_MODULE ?? '@electric-sql/pglite');
const migration = await readFile(new URL('../supabase/migrations/20260904163657_whatsapp_contact_attribution.sql', import.meta.url), 'utf8');
const ref = n => `WL-${n.toString(16).toUpperCase().padStart(24, '0')}`;
const intent = n => ({ reference: ref(n), source_page: '/examenes/ielts', landing_page: '/blog/ielts',
  referrer_host: 'www.google.com', utm_source: null, channel: 'Buscador (inferido)', interaction: 'click' });

test('real SQL: service-only access, immutable retries, quota, late arrival, manual audit and full-cohort totals', async () => {
  const db = new PGlite();
  try {
    await db.exec('create role anon; create role authenticated; create role service_role bypassrls; grant usage on schema public to service_role;');
    await db.exec(migration);
    for (const role of ['anon', 'authenticated']) {
      await db.exec(`set role ${role}`);
      await assert.rejects(db.query('select * from public.whatsapp_contact_intents'), /permission denied/);
      await assert.rejects(db.query("select public.whatsapp_contact_report(now()-interval '1 day', now())"), /permission denied/);
      await assert.rejects(db.query("select public.record_whatsapp_contact_intent('{}'::jsonb, repeat('a',64))"), /permission denied/);
      await db.exec('reset role');
    }
    await db.exec('set role service_role');
    const record = async (n, key = 'a', override = {}) => (await db.query('select public.record_whatsapp_contact_intent($1::jsonb, $2) as ok', [JSON.stringify({ ...intent(n), ...override }), key.repeat(64)])).rows[0].ok;
    const report = async (page = 1, reference = null) => (await db.query("select public.whatsapp_contact_report(now()-interval '1 day', now()+interval '1 minute', $1, $2) as result", [page, reference])).rows[0].result;
    assert.equal(await record(1), true);
    assert.equal(await record(1, 'a', { source_page: '/tampered' }), true);
    assert.equal((await report()).rows[0].source_page, '/examenes/ielts');
    for (let n = 2; n <= 30; n++) assert.equal(await record(n), true);
    assert.equal(await record(31), false);
    assert.equal(await record(1), true); // Existing retry does not consume quota.
    for (let n = 31; n <= 60; n++) assert.equal(await record(n, 'b'), true);
    await db.query('insert into public.whatsapp_contact_messages(message_id,wa_id,occurred_at,reference) values($1,$2,now(),$3)', ['wamid.local.1', '573000000001', ref(61)]);
    assert.equal((await report()).unattributed_messages, 1);
    await record(61, 'c'); // Browser arrives after webhook.
    assert.equal((await report()).unattributed_messages, 0);
    await db.query("insert into public.whatsapp_contact_messages(message_id,wa_id,occurred_at) values('wamid.local.2','573000000001',now()+interval '1 second'),('wamid.local.3','573000000002',now())");
    await db.query("insert into public.whatsapp_contact_messages(message_id,wa_id,occurred_at) values('wamid.local.2','573000000001',now()) on conflict(message_id) do nothing");
    await db.query('insert into public.whatsapp_contact_manual_events(reference,actor_id,confirmed) values($1,$2,true),($1,$2,false),($1,$2,true)', [ref(1), '00000000-0000-4000-8000-000000000001']);
    const r = await report();
    assert.equal(r.total, 61);
    assert.equal(r.rows.length, 50);
    assert.equal((await report(2)).rows.length, 11);
    assert.equal(r.confirmed, 2);
    assert.equal(r.messages, 3);
    assert.equal(r.unattributed_messages, 1);
    assert.equal(r.sources[0].intents, 61);
    assert.equal(r.recent_messages.find(m => m.message_id === 'wamid.local.2').method, 'conversation');
    assert.equal((await report(1, ref(1))).total, 1);
    assert.equal((await db.query('select count(*)::int as n from public.whatsapp_contact_manual_events')).rows[0].n, 3);
    await assert.rejects(db.query('update public.whatsapp_contact_intents set source_page=$1', ['/tampered']), /permission denied/);
    await assert.rejects(db.query("select setval('public.whatsapp_contact_manual_events_id_seq', 99)"), /permission denied/);
  } finally { await db.close(); }
});
