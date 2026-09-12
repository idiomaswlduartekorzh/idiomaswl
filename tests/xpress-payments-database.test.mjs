import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '../.local-tools/node_modules/@electric-sql/pglite/dist/index.js';

const user = '12345678-1234-4234-8234-123456789012';
const singleUser = '92345678-1234-4234-8234-123456789012';
const teacherUser = '82345678-1234-4234-8234-123456789012';
const reviewerUser = '72345678-1234-4234-8234-123456789012';
const migration = new URL('../supabase/migrations/20260909000500_xpress_memberships_wompi.sql', import.meta.url);
const singleMigration = new URL('../supabase/migrations/20260909160000_xpress_single_exam_purchase.sql', import.meta.url);
const deliveryMigration = new URL('../supabase/migrations/20260909183000_icfes_teacher_review_delivery.sql', import.meta.url);
const operationsMigration = new URL('../supabase/migrations/20260912160504_icfes_teacher_12h_operational_loop.sql', import.meta.url);

test('Xpress ledger prevents duplicate charges and grants access only after an approved payment', async () => {
  const db = new PGlite();
  try {
    await db.exec(`
      create role anon; create role authenticated; create role service_role bypassrls;
      create schema extensions;
      create function extensions.digest(text,text) returns bytea language sql immutable
        as $$ select decode(repeat('00',32),'hex') $$;
      grant usage on schema extensions to service_role;
      grant execute on function extensions.digest(text,text) to service_role;
      create schema auth;
      create table auth.users(id uuid primary key);
      insert into auth.users values('${user}'),('${singleUser}'),('${teacherUser}'),('${reviewerUser}');
      create table public.exam_submissions(id uuid primary key default gen_random_uuid());
      create table public.icfes_attempts(
        id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id), exam_id text not null,
        answers jsonb not null default '{}'::jsonb, basic_result jsonb not null default '{}'::jsonb,
        question_snapshot jsonb not null default '{}'::jsonb
      );
      grant select on public.icfes_attempts to service_role;
      create table public.icfes_entitlements(
        id uuid primary key default gen_random_uuid(),
        attempt_id uuid not null unique references public.icfes_attempts(id) on delete cascade,
        order_id uuid unique,
        product_code text not null default 'icfes-detail-attempt-v1',
        granted_at timestamptz not null default now(),
        created_at timestamptz not null default now()
      );
      create table public.profiles(
        id uuid primary key references auth.users(id), name text, full_name text, email text, avatar_url text,
        enrolled_at timestamptz, student_path text, language text, subject text, target_exam text,
        xpress_plan_interest text, onboarding_completed_at timestamptz
      );
    `);
    await db.exec(await readFile(migration, 'utf8'));
    await db.exec(await readFile(singleMigration, 'utf8'));
    await db.exec(await readFile(deliveryMigration, 'utf8'));
    await db.exec(await readFile(operationsMigration, 'utf8'));
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

    await db.query(`insert into public.xpress_teacher_reviewers(
      reviewer_id,status,rubric_version,productive_minutes_per_day,p75_review_minutes,calibrated_at,calibration_expires_at
    ) values($1,'active','icfes-teacher-rubric-2026-09-09-v1',240,30,now()-interval '1 day',now()+interval '30 days')`, [reviewerUser]);
    const teacherKey = '62345678-1234-4234-8234-123456789012';
    const reservation = (await db.query(
      'select * from public.reserve_xpress_teacher_capacity($1,$2,$3,$4,$5)',
      [teacherUser, 'sandbox', teacherKey, 'icfes-teacher-rubric-2026-09-09-v1', 'icfes-teacher-addendum-2026-09-12-v2'],
    )).rows[0];
    const teacherOrder = (await db.query(
      'select * from public.prepare_xpress_order($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)',
      [teacherUser, 'teacher@example.com', teacherKey, 'sandbox', 'xpress-2026-09-12-v4', 'exam-teacher', 'icfes', 'new', 0, 9_900_000, null, 'xpress-20260912-v3', 'xpress-privacy-20260908-v1', { version: 'xpress-20260912-v3' }],
    )).rows[0];
    assert.equal((await db.query('select status,order_id from xpress_teacher_capacity_reservations where id=$1', [reservation.id])).rows[0].status, 'order_linked');
    await db.query(
      'select public.record_xpress_payment($1,$2,$3,$4,$5,$6,$7,$8)',
      [teacherOrder.reference, 'sandbox', 'transaction-teacher', 9_900_000, 'COP', 'APPROVED', new Date().toISOString(), 'teacher-approved'],
    );
    const teacherMembership = (await db.query('select id from xpress_memberships where source_order_id=$1', [teacherOrder.id])).rows[0];
    assert.ok(teacherMembership?.id);
    assert.equal((await db.query('select status,membership_id from xpress_teacher_capacity_reservations where id=$1', [reservation.id])).rows[0].status, 'consumed');

    await db.exec('reset role');
    const attempt = (await db.query(`insert into public.icfes_attempts(user_id,exam_id,answers,basic_result,question_snapshot)
      values($1,'icfes-mock-01',$2,$3,$4) returning id`, [teacherUser, { 'q-1': 0 }, { percentage: 50 }, {
      exam: { sections: [{ questions: [{ id: 'q-1' }] }] },
    }])).rows[0];
    await db.exec('set role service_role');
    const reviewKey = '52345678-1234-4234-8234-123456789012';
    const review = (await db.query(
      'select * from public.request_xpress_teacher_review($1,$2,$3,$4,$5,$6)',
      [teacherUser, teacherMembership.id, attempt.id, reviewKey, 'icfes-teacher-rubric-2026-09-09-v1', { version: 'icfes-teacher-rubric-2026-09-09-v1' }],
    )).rows[0];
    assert.equal((new Date(review.due_at).getTime() - new Date(review.requested_at).getTime()) / 3_600_000, 12);
    assert.equal((await db.query('select count(*)::int as count from xpress_teacher_review_notifications where review_id=$1', [review.id])).rows[0].count, 5);
    const lease = '42345678-1234-4234-8234-123456789012';
    assert.equal((await db.query('select public.claim_xpress_teacher_review($1,$2,$3) as claimed', [review.id, reviewerUser, lease])).rows[0].claimed, true);
    const payload = (await db.query('select * from public.get_xpress_teacher_review_payload($1,$2,$3)', [review.id, reviewerUser, lease])).rows[0];
    assert.equal(payload.review_id, review.id);
    const result = {
      version: 'icfes-teacher-review-result-2026-09-09-v1', rubricVersion: 'icfes-teacher-rubric-2026-09-09-v1',
      summary: 'Retroalimentación pedagógica no oficial.', strengths: ['Comprensión literal'],
      priorities: ['Practicar inferencias'], itemFeedback: [{ questionId: 'q-1', feedback: 'Revisa la evidencia textual.' }],
    };
    const resultHash = (await db.query("select encode(extensions.digest($1,'sha256'),'hex') as hash", [JSON.stringify(result)])).rows[0].hash;
    assert.equal((await db.query(
      'select public.finish_xpress_teacher_review_v2($1,$2,$3,$4,$5,$6,$7,$8) as finished',
      [review.id, reviewerUser, lease, '32345678-1234-4234-8234-123456789012', 'completed', result, resultHash, null],
    )).rows[0].finished, true);
    assert.equal((await db.query("select count(*)::int as count from xpress_teacher_review_notifications where review_id=$1 and kind='student_completed'", [review.id])).rows[0].count, 1);

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
