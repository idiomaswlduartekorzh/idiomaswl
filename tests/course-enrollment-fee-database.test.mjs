import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '../.local-tools/node_modules/@electric-sql/pglite/dist/index.js';

test('enrollment and one-time exam platform fees are frozen and verified', async () => {
  const db = new PGlite();
  try {
    await db.exec('create role anon; create role authenticated; create role service_role bypassrls; create schema auth; create table auth.users(id uuid primary key)');
    for (const file of ['20260907202922_course_orders_wompi.sql','20261031172547_course_enrollment_fee.sql','20261031174346_course_exam_platform_fee.sql']) {
      await db.exec(await readFile(new URL(`../supabase/migrations/${file}`, import.meta.url), 'utf8'));
    }
    await db.exec("create table public.profiles(id uuid primary key,email text); create table public.exam_access_grants(user_id uuid,source text,status text); grant select on public.profiles,public.exam_access_grants to service_role");
    await db.exec('set role service_role');
    let counter = 0;
    const create = async ({key=`12345678-1234-4234-8234-${String(++counter).padStart(12,'0')}`,amount=32000000,objective='general',email='student@example.com'}={}) =>
      (await db.query('select * from public.prepare_course_order_with_fee($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',
        [null,email,'a'.repeat(64),key,'sandbox','classes-4w-20260906',{language:'ingles',plan:'esencial',objective},{studentEmail:email},amount,4,'course-20261031-v4'])).rows[0];
    const approve = (order,id,amount=Number(order.amount_in_cents)) => db.query('select public.record_course_payment($1,$2,$3,$4,$5,$6,$7,$8)',
      [order.reference,'sandbox',id,amount,'COP','APPROVED',new Date().toISOString(),`approved-${id}`]);

    const first = await create();
    assert.equal(Number(first.enrollment_fee_in_cents),4420000);
    assert.equal(Number(first.platform_fee_in_cents),0);
    assert.equal(Number(first.amount_in_cents),36420000);
    assert.equal(first.enrollment_fee_reason,'first_enrollment');
    assert.equal(first.platform_fee_reason,'not_exam');
    assert.equal((await create({key:first.idempotency_key})).id,first.id);
    await assert.rejects(create(),/open_order_exists/);
    await assert.rejects(approve(first,'wrong-amount',32000000),/payment_mismatch/);
    await approve(first,'payment-one');

    const continuous = await create();
    assert.equal(Number(continuous.enrollment_fee_in_cents),0);
    assert.equal(Number(continuous.platform_fee_in_cents),0);
    assert.equal(continuous.enrollment_fee_reason,'continuous_cycle');
    await approve(continuous,'payment-two');
    await db.query("update public.course_payment_transactions set observed_at=now()-interval '43 days'");

    const exam = await create({objective:'IELTS Academic'});
    assert.equal(Number(exam.enrollment_fee_in_cents),4420000);
    assert.equal(Number(exam.platform_fee_in_cents),9900000);
    assert.equal(exam.platform_fee_reason,'first_exam');
    assert.equal(Number(exam.amount_in_cents),46320000);
    await assert.rejects(approve(exam,'wrong-exam-amount',36420000),/payment_mismatch/);
    await approve(exam,'payment-three');

    const otherExam = await create({objective:'TOEFL iBT'});
    assert.equal(Number(otherExam.enrollment_fee_in_cents),0);
    assert.equal(Number(otherExam.platform_fee_in_cents),0);
    assert.equal(otherExam.platform_fee_reason,'previous_exam_course');
    assert.equal(Number(otherExam.amount_in_cents),32000000);

    const japanese = await create({objective:'JLPT',email:'japanese@example.com'});
    assert.equal(Number(japanese.platform_fee_in_cents),9900000,'every listed exam objective is eligible');

    const legacy=(await db.query('select * from public.prepare_course_order($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',
      [null,'legacy@example.com','a'.repeat(64),'52345678-1234-4234-8234-123456789012','sandbox','old-offer',{objective:'TOPIK I'},{studentEmail:'legacy@example.com'},32000000,4,'old-terms'])).rows[0];
    await approve(legacy,'legacy-payment');
    const grandfathered=await create({objective:'DELF',email:'legacy@example.com'});
    assert.equal(Number(grandfathered.platform_fee_in_cents),0);
    assert.equal(grandfathered.platform_fee_reason,'previous_exam_course');

    await db.exec('reset role');
    await db.exec("insert into auth.users values ('62345678-1234-4234-8234-123456789012'); insert into public.profiles values ('62345678-1234-4234-8234-123456789012','assigned@example.com'); insert into public.exam_access_grants values ('62345678-1234-4234-8234-123456789012','welearn','active')");
    await db.exec('set role service_role');
    const assigned=await create({objective:'Goethe',email:'assigned@example.com'});
    assert.equal(Number(assigned.platform_fee_in_cents),0);
    assert.equal(assigned.platform_fee_reason,'existing_welearn_access');

    await db.exec('set role anon');
    await assert.rejects(create({email:'anon@example.com'}),/permission denied/);
  } finally { await db.close(); }
});
