import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '../.local-tools/node_modules/@electric-sql/pglite/dist/index.js';

const user = '12345678-1234-4234-8234-123456789012';
const singleUser = '92345678-1234-4234-8234-123456789012';
const migration = new URL('../supabase/migrations/20260909000500_xpress_memberships_wompi.sql', import.meta.url);
const singleMigration = new URL('../supabase/migrations/20260909160000_xpress_single_exam_purchase.sql', import.meta.url);

test('Xpress ledger prevents duplicate charges and grants access only after an approved payment', async () => {
  const db = new PGlite();
  try {
    await db.exec(`
      create role anon; create role authenticated; create role service_role bypassrls;
      create schema auth;
      create table auth.users(id uuid primary key);
      insert into auth.users values('${user}'),('${singleUser}');
      create table public.exam_submissions(id uuid primary key default gen_random_uuid());
      create table public.profiles(
        id uuid primary key references auth.users(id), name text, full_name text, email text, avatar_url text,
        enrolled_at timestamptz, student_path text, language text, subject text, target_exam text,
        xpress_plan_interest text, onboarding_completed_at timestamptz
      );
    `);
    await db.exec(await readFile(migration, 'utf8'));
    await db.exec(await readFile(singleMigration, 'utf8'));
    await db.exec('set role service_role');
    const legal = { version: 'xpress-20260908-v1' };
    const prepare = async ({ key = user, offer = 'exam-auto', kind = 'new', credit = 0, amount = 4_900_000, coverage = null } = {}) =>
      (await db.query(
        'select * from public.prepare_xpress_order($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)',
        [user, 'student@example.com', key, 'sandbox', 'xpress-2026-09-08-v2', offer, 'ielts', kind, credit, amount, coverage, 'xpress-20260908-v1', 'xpress-privacy-20260908-v1', legal],
      )).rows[0];

    const order = await prepare();
    assert.equal(order.amount_in_cents, 4_900_000);
    assert.equal((await prepare()).id, order.id);
    await assert.rejects(prepare({ amount: 1 }), /idempotency_conflict|invalid_quote/);
    await assert.rejects(prepare({ key: '22345678-1234-4234-8234-123456789012', offer: 'exam-teacher', amount: 9_900_000 }), /xpress_order_pending/);

    const queued = await db.query('select public.queue_xpress_payment_reconciliation($1,$2,$3) as order_id', [order.reference, 'sandbox', 'transaction-one']);
    assert.equal(queued.rows[0].order_id, order.id);
    await db.query('select public.queue_xpress_payment_reconciliation($1,$2,$3)', [order.reference, 'sandbox', 'transaction-one']);
    assert.equal((await db.query('select * from xpress_payment_reconciliation_queue')).rows.length, 1);

    const record = (status, id = 'transaction-one', amount = 4_900_000, fingerprint = `${id}-${status}`) =>
      db.query('select public.record_xpress_payment($1,$2,$3,$4,$5,$6,$7,$8)', [order.reference, 'sandbox', id, amount, 'COP', status, new Date().toISOString(), fingerprint]);
    await assert.rejects(record('APPROVED', 'wrong-amount', 1), /payment_mismatch/);
    await record('PENDING');
    assert.equal((await db.query('select * from xpress_memberships')).rows.length, 0);
    await record('APPROVED');
    await record('APPROVED', 'transaction-one', 4_900_000, 'duplicate-approved');
    assert.equal((await db.query('select * from xpress_memberships')).rows.length, 1);
    assert.equal((await db.query('select offer_id from xpress_memberships')).rows[0].offer_id, 'exam-auto');
    await record('PENDING', 'transaction-one', 4_900_000, 'late-pending');
    assert.equal((await db.query('select status from xpress_payment_transactions')).rows[0].status, 'APPROVED');

    const membershipEnd = (await db.query('select ends_at from xpress_memberships')).rows[0].ends_at;
    const upgrade = await prepare({
      key: '32345678-1234-4234-8234-123456789012',
      offer: 'exam-teacher', kind: 'upgrade', credit: 4_900_000, amount: 5_000_000, coverage: membershipEnd,
    });
    const upgradeRecord = (status) => db.query(
      'select public.record_xpress_payment($1,$2,$3,$4,$5,$6,$7,$8)',
      [upgrade.reference, 'sandbox', 'transaction-upgrade', 5_000_000, 'COP', status, new Date().toISOString(), `upgrade-${status}`],
    );
    await upgradeRecord('APPROVED');
    const memberships = (await db.query('select offer_id,ends_at from xpress_memberships order by offer_id')).rows;
    assert.equal(memberships.length, 2);
    assert.equal(memberships.find((item) => item.offer_id === 'exam-teacher').ends_at.toISOString(), membershipEnd.toISOString());
    assert.equal((await db.query("select count(*)::int as count from xpress_fulfillment_jobs where kind in ('student_receipt','owner_notification')")).rows[0].count, 4);

    const single = (await db.query(
      'select * from public.prepare_xpress_order($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)',
      [singleUser, 'single@example.com', singleUser, 'sandbox', 'xpress-2026-09-09-v3', 'exam-single', 'ielts', 'single', 0, 1_200_000, null, 'xpress-20260909-v2', 'xpress-privacy-20260908-v1', legal],
    )).rows[0];
    await db.query(
      'select public.record_xpress_payment($1,$2,$3,$4,$5,$6,$7,$8)',
      [single.reference, 'sandbox', 'transaction-single', 1_200_000, 'COP', 'APPROVED', new Date().toISOString(), 'single-approved'],
    );
    assert.equal((await db.query('select count(*)::int as count from xpress_exam_credits where user_id=$1 and status=$2', [singleUser, 'active'])).rows[0].count, 1);
    assert.equal((await db.query('select count(*)::int as count from xpress_memberships where user_id=$1', [singleUser])).rows[0].count, 0);
    await assert.rejects(db.query('insert into exam_submissions default values returning id'), /permission denied/);
    await db.exec('reset role');
    const submission = (await db.query('insert into exam_submissions default values returning id')).rows[0].id;
    await db.exec('set role service_role');
    const consumed = (await db.query('select public.consume_xpress_exam_credit($1,$2,$3) as id', [singleUser, 'ielts', submission])).rows[0].id;
    assert.ok(consumed);
    assert.equal((await db.query('select status from xpress_exam_credits where id=$1', [consumed])).rows[0].status, 'consumed');
    assert.equal((await db.query('select public.consume_xpress_exam_credit($1,$2,$3) as id', [singleUser, 'ielts', submission])).rows[0].id, consumed);

    await db.exec('set role anon');
    await assert.rejects(db.query('select * from xpress_orders'), /permission denied/);
    await assert.rejects(db.query('select * from xpress_memberships'), /permission denied/);
    await assert.rejects(db.query('select * from xpress_exam_credits'), /permission denied/);
    await db.exec('set role authenticated');
    await assert.rejects(db.query('select * from xpress_payment_transactions'), /permission denied/);
  } finally {
    await db.close();
  }
});
