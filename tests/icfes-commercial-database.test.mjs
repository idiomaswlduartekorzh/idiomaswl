import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '../.local-tools/node_modules/@electric-sql/pglite/dist/index.js';

const baseMigration = new URL('../supabase/migrations/20260908170000_icfes_secure_attempts_and_pass.sql', import.meta.url);
const contractMigration = new URL('../supabase/migrations/20260912193000_icfes_commercial_contract_v2.sql', import.meta.url);
const consentMigration = new URL('../supabase/migrations/20260912194500_icfes_lead_consent_ledger.sql', import.meta.url);
const attemptId = '12345678-1234-4234-8234-123456789abc';

test('ICFES database enforces the v2 one-time quote and immutable consent evidence', async () => {
  const db = new PGlite();
  try {
    await db.exec(`
      create role anon; create role authenticated; create role service_role bypassrls;
      create schema auth;
      create table auth.users(id uuid primary key);
    `);
    await db.exec(await readFile(baseMigration, 'utf8'));
    await db.exec(await readFile(contractMigration, 'utf8'));
    await db.exec(await readFile(consentMigration, 'utf8'));
    await db.exec('set role service_role');
    await db.query(
      'insert into public.icfes_attempts(id,exam_id,access_token_hash,answers,basic_result) values($1,$2,$3,$4,$5)',
      [attemptId, 'mock-01', 'a'.repeat(64), {}, { correct: 31, total: 45 }],
    );
    await assert.rejects(
      db.query(
        'insert into public.icfes_pass_orders(attempt_id,reference,amount_in_cents,environment) values($1,$2,$3,$4)',
        [attemptId, 'WL-ICFES-invalid', 1_290_000, 'sandbox'],
      ),
      /icfes_pass_orders_v2_legal_snapshot_check/,
    );
    const order = (await db.query(
      `insert into public.icfes_pass_orders(
        attempt_id,reference,amount_in_cents,environment,terms_version,privacy_version,consent_version,legal_snapshot,accepted_at
      ) values($1,$2,$3,$4,$5,$6,$7,$8,now()) returning *`,
      [attemptId, 'WL-ICFES-v2', 1_290_000, 'sandbox', 'icfes-terms-2026-09-12-v2', 'icfes-privacy-2026-09-12-v2', 'icfes-purchase-2026-09-12-v1', { accepted: true }],
    )).rows[0];
    assert.equal(order.amount_in_cents, 1_290_000);
    await assert.rejects(
      db.query('update public.icfes_pass_orders set amount_in_cents=$1 where id=$2', [1, order.id]),
      /icfes_pass_orders_amount_in_cents_check/,
    );

    await db.query(
      `insert into public.icfes_lead_consents(
        attempt_id,consent_version,privacy_version,notice_snapshot,notice_sha256,contact_sha256,accepted_at
      ) values($1,$2,$3,$4,$5,$6,now())`,
      [attemptId, 'icfes-lead-contact-2026-09-12-v1', 'icfes-privacy-2026-09-12-v2', 'notice', 'b'.repeat(64), 'c'.repeat(64)],
    );
    await assert.rejects(
      db.query('update public.icfes_lead_consents set notice_snapshot=$1 where attempt_id=$2', ['changed', attemptId]),
      /permission denied/,
    );
    await db.exec('reset role');
    await assert.rejects(
      db.query('update public.icfes_lead_consents set notice_snapshot=$1 where attempt_id=$2', ['changed', attemptId]),
      /icfes_lead_consent_is_immutable/,
    );
    await db.exec('set role anon');
    await assert.rejects(db.query('select * from public.icfes_attempts'), /permission denied/);
    await assert.rejects(db.query('select * from public.icfes_pass_orders'), /permission denied/);
    await assert.rejects(db.query('select * from public.icfes_entitlements'), /permission denied/);
    await assert.rejects(db.query('select * from public.icfes_lead_consents'), /permission denied/);
  } finally {
    await db.close();
  }
});
