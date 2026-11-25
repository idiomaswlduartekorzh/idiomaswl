import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { strFromU8, unzipSync } from 'fflate';
import { PGlite } from '../.local-tools/node_modules/@electric-sql/pglite/dist/index.js';
import { btree_gist } from '../.local-tools/node_modules/@electric-sql/pglite/dist/contrib/btree_gist.js';
import { googleCalendarDraft, parseLessonForm, weekOf } from '../src/lib/admin-operations/agenda.ts';
import { parseHistoricalPayments, parseManualPayment } from '../src/lib/admin-operations/recorded-payments.ts';
import { makePaymentWorkbook } from '../src/lib/admin-operations/payment-workbook.ts';
import { summarizePaymentYears } from '../src/lib/admin-payments/metrics.ts';
import { needsDistinctReceipt, parseNumbersReviewPayment } from '../src/lib/admin-operations/numbers-payment-review.ts';

const ownerId = '12345678-1234-4234-8234-123456789012';

test('agenda preserves Bogotá local time, repeats weekly and keeps personal data out of Calendar drafts', () => {
  const fields = new FormData();
  for (const [key, value] of Object.entries({
    title: 'Clase de prueba', participant: 'Estudiante ficticio', teacher: 'jose',
    startsAt: '2026-11-29T22:00', duration: '60', weeks: '2',
  })) fields.set(key, value);

  const { lessons } = parseLessonForm(fields);
  assert.deepEqual(lessons.map(lesson => lesson.starts_at), ['2026-11-30T03:00:00.000Z', '2026-12-07T03:00:00.000Z']);
  assert.equal(weekOf('2026-11-29').first, '2026-11-23');
  const draft = new URL(googleCalendarDraft(lessons[0]));
  assert.equal(draft.hostname, 'calendar.google.com');
  assert.equal(draft.searchParams.get('dates'), '20261130T030000Z/20261130T040000Z');
  assert.doesNotMatch(draft.href, /ficticio|prueba/);
  fields.set('startsAt', '2026-02-30T09:00');
  assert.ok(parseLessonForm(fields).error);
  fields.set('startsAt', '2026-11-29T23:30');
  assert.ok(parseLessonForm(fields).error);
});

test('direct payments preserve cents and Numbers history validates dates and source references', () => {
  const fields = new FormData();
  for (const [key, value] of Object.entries({
    requestId: ownerId, paidOn: '2026-11-09', amountInCop: '48000.05',
    customerName: ' Cliente ficticio ', description: 'Clase de prueba', method: 'Nequi',
  })) fields.set(key, value);

  assert.equal(parseManualPayment(fields, '2026-11-24').amount_in_cents, 4_800_005);
  assert.equal(parseManualPayment(fields, '2026-11-08'), null);
  fields.set('amountInCop', '48,000.05');
  assert.equal(parseManualPayment(fields, '2026-11-24'), null);
  const row = {
    id: 'NUMBERS-2021-09-P3', paid_on: null, amount_in_cents: 100_000,
    customer_name: 'Estudiante ficticio', description: 'Clase de prueba',
  };
  assert.equal(parseHistoricalPayments([row])[0].period, '2021-09-01');
  assert.throws(() => parseHistoricalPayments([row, row]), /registro 2/);
  assert.throws(() => parseHistoricalPayments([{ ...row, paid_on: '2021-10-01' }]), /registro 1/);
});

test('Excel exports numbers as numeric cells and preserves input text without formulas', async () => {
  const workbook = makePaymentWorkbook([['Cliente', 'Valor COP'], ['=1+1 < prueba & control', 1000.25]]);
  const files = unzipSync(new Uint8Array(await workbook.arrayBuffer()));
  const sheet = strFromU8(files['xl/worksheets/pagos.xml']);
  assert.match(sheet, /r="A2" t="inlineStr".*?=1\+1 &lt; prueba &amp; control/);
  assert.match(sheet, /<c r="B2"><v>1000\.25<\/v><\/c>/);
  assert.doesNotMatch(sheet, /<f[> ]/);
});

test('Numbers review keeps the cell reference when the receipt confirms a different month', () => {
  const fields = new FormData();
  for (const [key, value] of Object.entries({
    id: 'NUMBERS-2024-01-D6', amountInCop: '48000.05', paidOn: '2024-02-29',
    customerName: ' Cliente ficticio ', description: 'Comprobante de prueba', receipt: ' Ref de prueba ',
  })) fields.set(key, value);
  const payment = parseNumbersReviewPayment(fields, '2026-11-24');
  assert.deepEqual([payment.id, payment.numbers_review_id, payment.period, payment.amount_in_cents, payment.external_reference],
    ['NUMBERS-2024-01-D6', 'NUMBERS-2024-01-D6', '2024-02-01', 4_800_005, 'Ref de prueba']);
  assert.equal(parseNumbersReviewPayment(fields, '2024-02-28'), null);
  fields.set('id', ownerId);
  assert.equal(parseNumbersReviewPayment(fields, '2026-11-24'), null);
  assert.equal(needsDistinctReceipt('posible_duplicado'), true);
  assert.equal(needsDistinctReceipt('coincidencia_de_nombre_e_importe_en_el_mes'), true);
  assert.equal(needsDistinctReceipt('fecha_fuera_del_mes'), false);
});

test('monthly payment totals use the historical month and Bogotá dates without counting unpaid or voided rows', () => {
  const history = {
    source: 'historical', status: 'APPROVED', sourcePeriod: '2024-02-01', paidOn: null,
    paidAt: null, observedAt: '2026-11-24T16:00:00Z', amountInCents: 15_025,
  };
  const online = {
    source: 'courses', status: 'APPROVED', sourcePeriod: null, paidOn: null,
    paidAt: '2025-01-01T04:59:59Z', observedAt: '2025-01-01T05:00:00Z', amountInCents: 22_075,
  };
  const manual = {
    ...history, source: 'manual', sourcePeriod: '2025-01-01', paidOn: '2025-01-26', amountInCents: 10_150,
  };
  const rows = [history, online, manual, { ...history, status: 'VOIDED' }, { ...online, status: 'PENDING' }];
  const [recent, older] = summarizePaymentYears(rows, 'all');
  assert.deepEqual([recent.year, recent.amountInCents, recent.count], [2025, 10_150, 1]);
  assert.deepEqual([older.year, older.amountInCents, older.count], [2024, 37_100, 2]);
  assert.equal(older.months.length, 12);
  assert.deepEqual(older.months[0], { amountInCents: 0, count: 0 });
  assert.deepEqual(older.months[1], { amountInCents: 15_025, count: 1 });
  assert.deepEqual(older.months[11], { amountInCents: 22_075, count: 1 });
  assert.equal(summarizePaymentYears(rows, 'historical')[0].amountInCents, 15_025);
  assert.equal(summarizePaymentYears(rows, 'online')[0].amountInCents, 22_075);
  assert.equal(summarizePaymentYears(rows, 'manual')[0].amountInCents, 10_150);
});

test('database prevents teacher collisions, keeps direct records private and exposes verified TOEFL payments', async () => {
  const db = new PGlite({ extensions: { btree_gist } });
  try {
    await db.exec(`
      create role anon;
      create role authenticated;
      create role service_role bypassrls;
      create schema auth;
      create table auth.users(id uuid primary key);
      insert into auth.users values('${ownerId}');
      create table public.exam_submissions(id uuid primary key, user_name text, user_email text);
      grant select on public.exam_submissions to service_role;
      create view public.admin_payment_ledger as select
        'plans'::text as source, 'plan:test'::text as record_id, 'TEST-WOMPI'::text as reference,
        null::text as provider_id, 'Cliente Wompi ficticio'::text as customer_name, null::text as customer_email,
        null::text as customer_phone, null::text as description, 100000::bigint as amount_in_cents,
        'COP'::text as currency, 'APPROVED'::text as status, null::text as payment_method_type,
        'production'::text as environment,
        null::timestamptz as created_at, null::timestamptz as observed_at,
        null::timestamptz as paid_at, null::text as payment_url;
      grant select on public.admin_payment_ledger to service_role;
    `);
    await db.exec(await readFile(new URL('../supabase/migrations/20261124161345_admin_agenda_and_recorded_payments.sql', import.meta.url), 'utf8'));
    await db.exec(await readFile(new URL('../supabase/migrations/20261124181510_admin_numbers_payment_review.sql', import.meta.url), 'utf8'));
    await db.exec(`insert into public.admin_numbers_payment_review(id, reported_amount_in_cents, reason) values
      ('NUMBERS-2024-01-D6', 450000, 'fecha_fuera_del_mes'),
      ('NUMBERS-2024-01-D7', null, 'posible_duplicado')`);
    await db.exec('set role service_role');
    assert.deepEqual((await db.query('select source, reference from public.admin_online_payment_ledger')).rows, [
      { source: 'plans', reference: 'TEST-WOMPI' },
    ]);
    await db.exec('reset role');
    await db.exec(await readFile(new URL('../supabase/migrations/20260821190614_toefl_report_payments.sql', import.meta.url), 'utf8'));
    await db.exec(`
      insert into public.exam_submissions values ('${ownerId}', 'Estudiante TOEFL ficticio', 'student@example.test');
      insert into public.toefl_report_orders(submission_id, reference, amount_in_cents, status, environment, access_token_hash, paid_at)
      values ('${ownerId}', 'TEST-TOEFL', 600000, 'APPROVED', 'production', repeat('a', 64), '2026-11-09T14:00Z');
      set role service_role;
    `);
    const addLesson = (teacher, start, end, occurrence) => db.query(`
      insert into public.admin_lessons(series_id, occurrence, title, participant, teacher, starts_at, ends_at, created_by, updated_by)
      values($1,$2,'Clase de prueba','Grupo ficticio',$3,$4,$5,$1,$1)
      on conflict (series_id, occurrence) do nothing returning id
    `, [ownerId, occurrence, teacher, start, end]);

    const first = await addLesson('jose', '2026-11-24T15:00Z', '2026-11-24T16:00Z', 0);
    assert.equal((await addLesson('jose', '2026-11-24T15:00Z', '2026-11-24T16:00Z', 0)).rows.length, 0);
    await assert.rejects(addLesson('jose', '2026-11-24T15:30Z', '2026-11-24T16:30Z', 1), { code: '23P01' });
    await addLesson('zhanna', '2026-11-24T15:30Z', '2026-11-24T16:30Z', 2);
    await addLesson('jose', '2026-11-24T16:00Z', '2026-11-24T17:00Z', 3);
    await db.query("update public.admin_lessons set status='cancelled' where id=$1", [first.rows[0].id]);
    await addLesson('jose', '2026-11-24T15:00Z', '2026-11-24T16:00Z', 1);

    const manual = `
      insert into public.admin_recorded_payments(id, source, period, paid_on, amount_in_cents, customer_name, description, method, external_reference, created_by)
      values($1, 'manual', '2026-11-01', '2026-11-09', 100000, 'Cliente ficticio', 'Pago de prueba', 'Nequi', 'REF-1', $2)
      on conflict (id) do nothing
    `;
    await db.query(manual, [ownerId, ownerId]);
    await db.query(manual, [ownerId, ownerId]);
    await assert.rejects(db.query(manual, ['38345678-1234-4234-8234-123456789012', ownerId]), { code: '23505' });
    await db.exec(`
      insert into public.admin_recorded_payments(id, source, period, amount_in_cents, customer_name, description)
      values ('NUMBERS-2021-02-D3', 'historical', '2021-02-01', 100000, 'Cliente histórico ficticio', 'Prueba');
    `);
    assert.deepEqual((await db.query('select source, customer_name from public.admin_online_payment_ledger order by source')).rows, [
      { source: 'plans', customer_name: 'Cliente Wompi ficticio' },
      { source: 'toefl', customer_name: 'Estudiante TOEFL ficticio' },
    ]);
    assert.deepEqual((await db.query('select source, status from public.admin_full_payment_ledger order by source')).rows, [
      { source: 'historical', status: 'APPROVED' }, { source: 'manual', status: 'APPROVED' },
      { source: 'plans', status: 'APPROVED' }, { source: 'toefl', status: 'APPROVED' },
    ]);
    const historical = (await db.query("select paid_on, paid_at from public.admin_full_payment_ledger where source='historical'")).rows[0];
    assert.deepEqual(historical, { paid_on: null, paid_at: null });
    await assert.rejects(db.query('update public.admin_recorded_payments set amount_in_cents=2'), { code: '42501' });
    await db.query("update public.admin_recorded_payments set voided_at=now(), voided_by=$1::uuid, void_reason='Registro duplicado' where id=$1", [ownerId]);
    assert.equal((await db.query("select status from public.admin_full_payment_ledger where source='manual'")).rows[0].status, 'VOIDED');

    const reviewedInsert = `insert into public.admin_recorded_payments
      (id, source, period, paid_on, amount_in_cents, customer_name, description, external_reference, numbers_review_id)
      values ($1, 'historical', '2024-02-01', '2024-02-12', 450000, 'Cliente ficticio', 'Prueba', $2, $3)`;
    assert.equal((await db.query('select * from public.admin_numbers_payment_review')).rows.length, 2);
    await assert.rejects(db.query('update public.admin_numbers_payment_review set reported_amount_in_cents=2'), { code: '42501' });
    await assert.rejects(db.query(reviewedInsert, ['NUMBERS-2024-01-D6', 'TEST-RECIBO', null]), { code: '23514' });
    await assert.rejects(db.query(reviewedInsert, ['NUMBERS-2024-01-D8', 'TEST-RECIBO', 'NUMBERS-2024-01-D8']), { code: '23503' });
    await db.query(reviewedInsert, ['NUMBERS-2024-01-D6', 'TEST-RECIBO', 'NUMBERS-2024-01-D6']);
    await assert.rejects(db.query(reviewedInsert, ['NUMBERS-2024-01-D6', 'OTRO', 'NUMBERS-2024-01-D6']), { code: '23505' });
    await assert.rejects(db.query(reviewedInsert, ['NUMBERS-2024-01-D7', 'test-recibo', 'NUMBERS-2024-01-D7']), { code: '23505' });
    const reviewed = await db.query("select source_period::text, paid_on::text from public.admin_full_payment_ledger where record_id='historical:NUMBERS-2024-01-D6'");
    assert.deepEqual(reviewed.rows, [{ source_period: '2024-02-01', paid_on: '2024-02-12' }]);

    for (const role of ['anon', 'authenticated']) {
      await db.exec(`set role ${role}`);
      for (const table of ['admin_lessons', 'admin_recorded_payments', 'admin_full_payment_ledger', 'admin_online_payment_ledger', 'admin_numbers_payment_review']) {
        await assert.rejects(db.query(`select * from public.${table}`), { code: '42501' });
      }
      await assert.rejects(db.query('select * from public.admin_toefl_payment_entries()'), { code: '42501' });
    }
  } finally {
    await db.close();
  }
});
