import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '../.local-tools/node_modules/@electric-sql/pglite/dist/index.js';

const user = '12345678-1234-4234-8234-123456789012';
const singleUser = '92345678-1234-4234-8234-123456789012';
const subscriptionUser = '72345678-1234-4234-8234-123456789012';
const migration = new URL('../supabase/migrations/20260909000500_xpress_memberships_wompi.sql', import.meta.url);
const singleMigration = new URL('../supabase/migrations/20260909160000_xpress_single_exam_purchase.sql', import.meta.url);
const recurringMigration = new URL('../supabase/migrations/20260912110000_xpress_recurring_subscriptions.sql', import.meta.url);
const recurringIndexesMigration = new URL('../supabase/migrations/20260912113000_xpress_recurring_indexes.sql', import.meta.url);
const recurringFinalizationMigration = new URL('../supabase/migrations/20260912114500_xpress_finalize_cancellations.sql', import.meta.url);
const recurringCancelGuardMigration = new URL('../supabase/migrations/20260912115500_xpress_cancel_guard.sql', import.meta.url);

test('Xpress ledger prevents duplicate charges and grants access only after an approved payment', async () => {
  const db = new PGlite();
  try {
    await db.exec(`
      create role anon; create role authenticated; create role service_role bypassrls;
      create schema auth;
      create table auth.users(id uuid primary key);
      insert into auth.users values('${user}'),('${singleUser}'),('${subscriptionUser}');
      create table public.exam_submissions(id uuid primary key default gen_random_uuid());
      create table public.profiles(
        id uuid primary key references auth.users(id), name text, full_name text, email text, avatar_url text,
        enrolled_at timestamptz, student_path text, language text, subject text, target_exam text,
        xpress_plan_interest text, onboarding_completed_at timestamptz
      );
      grant insert,select on public.exam_submissions to service_role;
    `);
    await db.exec(await readFile(migration, 'utf8'));
    await db.exec(await readFile(singleMigration, 'utf8'));
    await db.exec(await readFile(recurringMigration, 'utf8'));
    await db.exec(await readFile(recurringIndexesMigration, 'utf8'));
    await db.exec(await readFile(recurringFinalizationMigration, 'utf8'));
    await db.exec(await readFile(recurringCancelGuardMigration, 'utf8'));
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
    const submission = (await db.query('insert into exam_submissions default values returning id')).rows[0].id;
    const consumed = (await db.query('select public.consume_xpress_exam_credit($1,$2,$3) as id', [singleUser, 'ielts', submission])).rows[0].id;
    assert.ok(consumed);
    assert.equal((await db.query('select status from xpress_exam_credits where id=$1', [consumed])).rows[0].status, 'consumed');
    assert.equal((await db.query('select public.consume_xpress_exam_credit($1,$2,$3) as id', [singleUser, 'ielts', submission])).rows[0].id, consumed);

    const subscription = (await db.query(
      'select * from public.prepare_xpress_subscription($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)',
      [subscriptionUser, 'recurring@example.com', subscriptionUser, 'sandbox', 'xpress-2026-09-12-v4', 'exam-auto', 'toefl', 4_900_000, new Date().toISOString(), 'xpress-20260912-v3', 'xpress-privacy-20260908-v1', 'xpress-recurring-30d-20260912-v1', { recurring: true }],
    )).rows[0];
    assert.equal(subscription.status, 'creating_source');
    const attached = (await db.query(
      'select * from public.attach_xpress_subscription_source($1,$2,$3,$4,$5)',
      [subscription.id, subscriptionUser, 'sandbox', '3891', 'AVAILABLE'],
    )).rows[0];
    assert.equal(attached.status, 'pending_initial');
    const firstCharge = (await db.query('select * from public.prepare_xpress_subscription_charge($1)', [subscription.id])).rows[0];
    assert.equal(firstCharge.order_kind, 'subscription_start');
    assert.equal(firstCharge.amount_in_cents, 4_900_000);
    assert.equal((await db.query('select public.start_xpress_recurring_charge($1) as started', [firstCharge.id])).rows[0].started, true);
    assert.equal((await db.query('select public.start_xpress_recurring_charge($1) as started', [firstCharge.id])).rows[0].started, false);
    const firstPayment = (status, fingerprint) => db.query(
      'select public.record_xpress_payment($1,$2,$3,$4,$5,$6,$7,$8)',
      [firstCharge.reference, 'sandbox', 'subscription-transaction', 4_900_000, 'COP', status, new Date().toISOString(), fingerprint],
    );
    await firstPayment('PENDING', 'subscription-pending');
    assert.equal((await db.query('select count(*)::int as count from xpress_memberships where subscription_id=$1', [subscription.id])).rows[0].count, 0);
    await firstPayment('APPROVED', 'subscription-approved');
    assert.equal((await db.query('select status from xpress_subscriptions where id=$1', [subscription.id])).rows[0].status, 'active');
    assert.equal((await db.query('select count(*)::int as count from xpress_memberships where subscription_id=$1', [subscription.id])).rows[0].count, 1);

    await db.query('update xpress_subscriptions set next_charge_at=now() where id=$1', [subscription.id]);
    const lease = '82345678-1234-4234-8234-123456789012';
    assert.equal((await db.query('select count(*)::int as count from public.claim_due_xpress_subscriptions($1,$2)', [lease, 10])).rows[0].count, 1);
    const renewal = (await db.query('select * from public.prepare_xpress_subscription_charge($1)', [subscription.id])).rows[0];
    assert.equal(renewal.order_kind, 'renewal');
    await db.query(
      'select public.record_xpress_payment($1,$2,$3,$4,$5,$6,$7,$8)',
      [renewal.reference, 'sandbox', 'subscription-declined', 4_900_000, 'COP', 'DECLINED', new Date().toISOString(), 'subscription-declined'],
    );
    assert.equal((await db.query('select payment_failure_count from xpress_subscriptions where id=$1', [subscription.id])).rows[0].payment_failure_count, 1);
    assert.equal((await db.query('select count(*)::int as count from xpress_memberships where subscription_id=$1 and status=$2', [subscription.id, 'active'])).rows[0].count, 1);
    assert.equal((await db.query('select count(*)::int as count from xpress_subscription_notifications where subscription_id=$1', [subscription.id])).rows[0].count, 1);

    const canceled = (await db.query('select * from public.cancel_xpress_subscription($1,$2,$3)', [subscription.id, subscriptionUser, 'sandbox'])).rows[0];
    assert.equal(canceled.status, 'cancel_at_period_end');
    assert.equal(canceled.next_charge_at, null);
    const reactivated = (await db.query('select * from public.reactivate_xpress_subscription($1,$2,$3)', [subscription.id, subscriptionUser, 'sandbox'])).rows[0];
    assert.equal(reactivated.status, 'active');

    const pendingCancellation = (await db.query(
      'select * from public.prepare_xpress_subscription($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)',
      [singleUser, 'single@example.com', '62345678-1234-4234-8234-123456789012', 'sandbox', 'xpress-2026-09-12-v4', 'exam-teacher', 'ielts', 9_900_000, new Date().toISOString(), 'xpress-20260912-v3', 'xpress-privacy-20260908-v1', 'xpress-recurring-30d-20260912-v1', { recurring: true }],
    )).rows[0];
    await db.query('select public.attach_xpress_subscription_source($1,$2,$3,$4,$5)', [pendingCancellation.id, singleUser, 'sandbox', '4891', 'AVAILABLE']);
    const pendingOrder = (await db.query('select * from public.prepare_xpress_subscription_charge($1)', [pendingCancellation.id])).rows[0];
    await db.query('select public.record_xpress_payment($1,$2,$3,$4,$5,$6,$7,$8)', [pendingOrder.reference, 'sandbox', 'pending-cancel-transaction', 9_900_000, 'COP', 'PENDING', new Date().toISOString(), 'pending-cancel']);
    assert.equal((await db.query('select * from public.cancel_xpress_subscription($1,$2,$3)', [pendingCancellation.id, singleUser, 'sandbox'])).rows[0].status, 'cancel_at_period_end');
    await db.query('select public.record_xpress_payment($1,$2,$3,$4,$5,$6,$7,$8)', [pendingOrder.reference, 'sandbox', 'pending-cancel-transaction', 9_900_000, 'COP', 'DECLINED', new Date().toISOString(), 'pending-cancel-declined']);
    assert.equal((await db.query('select status from xpress_subscriptions where id=$1', [pendingCancellation.id])).rows[0].status, 'canceled');

    await db.exec('set role anon');
    await assert.rejects(db.query('select * from xpress_orders'), /permission denied/);
    await assert.rejects(db.query('select * from xpress_memberships'), /permission denied/);
    await assert.rejects(db.query('select * from xpress_exam_credits'), /permission denied/);
    await assert.rejects(db.query('select * from xpress_subscriptions'), /permission denied/);
    await db.exec('set role authenticated');
    await assert.rejects(db.query('select * from xpress_payment_transactions'), /permission denied/);
  } finally {
    await db.close();
  }
});
