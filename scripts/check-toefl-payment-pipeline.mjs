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
requireText('src/app/api/wompi/events/route.ts', [
  'verifyWompiEventChecksum',
  'persistVerifiedToeflReportTransaction',
  "toeflPersistence === 'failed'",
]);
requireText('src/app/(site)/examenes/toefl/resultado/[submissionId]/page.tsx', [
  'index: false',
  'noarchive: true',
  'nosnippet: true',
]);
const freeRunner = requireText('src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx', [
  'ToeflReportCheckout',
  'La revisión humana comienza al desbloquear el informe.',
  'displayPriceCop={reportOffer.priceCop}',
]);
requireText('src/app/(site)/dashboard/admin/JoseDashboardServer.tsx', [
  'listApprovedToeflSubmissionIdsForReview',
  'paidToeflSubmissionIds.has(r.id)',
]);
const config = requireText('src/lib/toefl/report-payment-config.server.ts', [
  "process.env.TOEFL_REPORT_PAYWALL_ENABLED !== 'true'",
  'getWompiServerConfig',
  "positiveInteger('TOEFL_REPORT_PRICE_COP'",
  "positiveInteger('TOEFL_SPEAKING_REVIEW_SLA_HOURS'",
]);
requireText('src/lib/toefl/report-payment-events.server.ts', [
  'parseToeflWompiTransaction',
  'order.environment !== input.environment',
  "order.status === 'APPROVED' ? 'APPROVED' : transaction.status",
  "return 'failed'",
]);
if (/process\.env\.(?:WOMPI|NEXT_PUBLIC_WOMPI)/.test(config)) {
  errors.push('TOEFL debe reutilizar la configuración Wompi central, no leer otra copia de sus llaves.');
}
if (freeRunner.includes('useWritingAssessment')) {
  errors.push('El resultado gratuito TOEFL no debe ejecutar la retroalimentación detallada de Writing.');
}
if (fs.existsSync(path.join(root, 'src/app/api/payments/wompi/events/route.ts'))) {
  errors.push('No puede existir un segundo webhook Wompi para TOEFL.');
}

if (errors.length) {
  console.error('TOEFL payment pipeline guard failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('TOEFL payment pipeline guard passed: DB, checkout, webhook and private report checked.');
