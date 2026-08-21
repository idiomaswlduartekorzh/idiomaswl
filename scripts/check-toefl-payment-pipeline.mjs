#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const errors = [];
const requireText = (relative, phrases) => {
  const content = read(relative);
  for (const phrase of phrases) {
    if (!content.includes(phrase)) errors.push(`${relative} no contiene: ${phrase}`);
  }
  return content;
};

requireText('supabase/migrations/20260821190614_toefl_report_payments.sql', [
  'CREATE TABLE IF NOT EXISTS public.toefl_report_orders',
  'ALTER TABLE public.toefl_report_orders ENABLE ROW LEVEL SECURITY',
  'REVOKE ALL ON TABLE public.toefl_report_orders FROM anon, authenticated',
  "WHERE status = 'PENDING'",
  "WHERE status = 'APPROVED'",
  'access_token_hash',
]);
requireText('src/app/api/toefl/reports/checkout/route.ts', [
  'verifyToeflSubmissionToken',
  'httpOnly: true',
  "sameSite: 'lax'",
  'isToeflReportPaywallEnabled',
]);
requireText('src/app/api/toefl/reports/[submissionId]/route.ts', [
  'toeflReportCookieName',
  "'cache-control': 'private, no-store, max-age=0'",
]);
requireText('src/app/api/payments/wompi/events/route.ts', [
  'signature.properties',
  'buildWompiEventChecksum',
  'amount_in_cents',
  'order.environment !== config.environment',
  "order.status === 'APPROVED' ? 'APPROVED' : status",
]);
requireText('src/app/(site)/examenes/toefl/resultado/[submissionId]/page.tsx', [
  'index: false',
  'noarchive: true',
  'nosnippet: true',
]);
const config = requireText('src/lib/wompi/config.server.ts', [
  "process.env.TOEFL_REPORT_PAYWALL_ENABLED !== 'true'",
  "required('WOMPI_INTEGRITY_SECRET')",
  "required('WOMPI_EVENTS_SECRET')",
  "positiveInteger('TOEFL_REPORT_PRICE_COP'",
  "positiveInteger('TOEFL_SPEAKING_REVIEW_SLA_HOURS'",
]);
if (/NEXT_PUBLIC_(?:WOMPI|TOEFL_REPORT_PRICE|TOEFL_SPEAKING)/.test(config)) {
  errors.push('Los secretos o decisiones comerciales Wompi no pueden usar NEXT_PUBLIC_.');
}

if (errors.length) {
  console.error('TOEFL payment pipeline guard failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('TOEFL payment pipeline guard passed: DB, checkout, webhook and private report checked.');
