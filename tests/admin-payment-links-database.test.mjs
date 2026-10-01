import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { PGlite } from '../.local-tools/node_modules/@electric-sql/pglite/dist/index.js';

const adminId = '12345678-1234-4234-8234-123456789012';

test('payment-link ledger validates amounts, is idempotent and protects terminal states', async () => {
  const db = new PGlite();
  try {
    await db.exec(`
      create role anon;
      create role authenticated;
      create role service_role bypassrls;
      create schema auth;
      create table auth.users(id uuid primary key);
      insert into auth.users values('${adminId}');

      create table public.wompi_transactions(
        id uuid primary key default gen_random_uuid(), reference text not null,
        wompi_transaction_id text, environment text, plan_id text, language text,
        billing_period text, amount_in_cents bigint, currency text, status text,
        payment_method_type text, last_event_at timestamptz,
        created_at timestamptz default now(), updated_at timestamptz default now()
      );
      create table public.course_orders(
        id uuid primary key default gen_random_uuid(), reference text, contact jsonb,
        purchaser_email text, amount_in_cents bigint, currency text, environment text,
        classes int, sessions int, created_at timestamptz default now()
      );
      create table public.course_payment_transactions(
        provider_id text, order_id uuid, status text, observed_at timestamptz
      );
      create table public.xpress_orders(
        id uuid primary key default gen_random_uuid(), reference text, purchaser_email text,
        exam_slug text, offer_id text, order_kind text, amount_in_cents bigint,
        currency text, environment text, created_at timestamptz default now()
      );
      create table public.xpress_payment_transactions(
        provider_id text, order_id uuid, status text, observed_at timestamptz
      );
      create table public.icfes_pass_orders(
        id uuid primary key default gen_random_uuid(), reference text,
        wompi_transaction_id text, amount_in_cents bigint, currency text,
        status text, environment text, created_at timestamptz default now(),
        updated_at timestamptz default now(), paid_at timestamptz
      );
      grant select on public.wompi_transactions, public.course_orders,
        public.course_payment_transactions, public.xpress_orders,
        public.xpress_payment_transactions, public.icfes_pass_orders to service_role;
    `);

    await db.exec(await readFile(
      new URL('../supabase/migrations/20261001043031_admin_payment_links_and_ledger.sql', import.meta.url),
      'utf8',
    ));
    await db.exec(await readFile(
      new URL('../supabase/migrations/20261001044506_admin_payment_links_hardening.sql', import.meta.url),
      'utf8',
    ));

    await db.exec('set role service_role');
    const inserted = await db.query(`
      insert into public.admin_payment_links(
        wompi_payment_link_id, payment_url, environment, amount_in_cents, title,
        status, created_by, created_by_email, expires_at
      ) values(
        '3Z0Cfi', 'https://checkout.wompi.co/l/3Z0Cfi', 'sandbox', 35000000,
        'Saldo curso', 'ACTIVE', $1, 'admin@example.com', now() + interval '7 days'
      ) returning id
    `, [adminId]);
    const linkId = inserted.rows[0].id;
    const observed = new Date().toISOString();

    const fingerprints = { PENDING: 'a'.repeat(64), APPROVED: 'b'.repeat(64) };
    const record = (status, amount = 35_000_000, fingerprint = fingerprints[status] ?? 'd'.repeat(64)) => db.query(
      `select public.record_admin_payment_link_transaction($1,$2,$3,$4,$5,$6,$7,$8,$9) as link_id`,
      ['3Z0Cfi', 'sandbox', 'transaction-123', amount, 'COP', status, 'PSE', observed, fingerprint],
    );

    await assert.rejects(record('APPROVED', 1), /payment_mismatch/);
    await record('PENDING');
    assert.equal((await db.query('select status from public.admin_payment_links where id=$1', [linkId])).rows[0].status, 'ACTIVE');
    await record('APPROVED');
    await record('APPROVED');
    assert.equal((await db.query('select status from public.admin_payment_links where id=$1', [linkId])).rows[0].status, 'PAID');
    assert.equal((await db.query('select count(*)::int as count from public.admin_payment_link_transactions')).rows[0].count, 1);
    assert.equal((await db.query('select count(*)::int as count from public.admin_payment_link_events')).rows[0].count, 2);

    await record('PENDING', 35_000_000, 'c'.repeat(64));
    assert.equal((await db.query('select status from public.admin_payment_link_transactions')).rows[0].status, 'APPROVED');
    assert.equal((await db.query("select status from public.admin_payment_ledger where source='custom_link' and provider_id='transaction-123'")).rows[0].status, 'APPROVED');

    await db.exec('set role anon');
    await assert.rejects(db.query('select * from public.admin_payment_links'), /permission denied/);
    await assert.rejects(db.query('select * from public.admin_payment_ledger'), /permission denied/);
    await db.exec('set role authenticated');
    await assert.rejects(db.query('select * from public.admin_payment_links'), /permission denied/);
  } finally {
    await db.close();
  }
});
