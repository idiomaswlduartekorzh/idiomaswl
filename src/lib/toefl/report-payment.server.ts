import 'server-only';

import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { createWompiIntegritySignature } from '@/lib/wompi/security';
import { getToeflReportPaymentConfig } from './report-payment-config.server';
import { createToeflSubmissionToken } from './submission-token.server';
import {
  toeflReportCookieName,
  type ToeflCheckoutResponse,
  type ToeflReportPaymentStatus,
  type ToeflReportResponse,
  type ToeflReportSkill,
} from './report-payment';

interface OrderRow {
  id: string;
  submission_id: string;
  reference: string;
  amount_in_cents: number;
  currency: 'COP';
  status: ToeflReportPaymentStatus;
  environment: 'sandbox' | 'production';
  paid_at: string | null;
}

export interface CheckoutSession {
  response: ToeflCheckoutResponse;
  cookieName: string;
  accessToken: string;
}

function newAccessToken(): string {
  return randomBytes(32).toString('base64url');
}

function sha256Hex(value: string): string {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

function reportUrl(origin: string, submissionId: string): string {
  return `${origin}/examenes/toefl/resultado/${submissionId}`;
}

function checkoutUrl(order: OrderRow, payerEmail: string, config: ReturnType<typeof getToeflReportPaymentConfig>): string {
  const url = new URL('https://checkout.wompi.co/p/');
  url.searchParams.set('public-key', config.publicKey);
  url.searchParams.set('currency', order.currency);
  url.searchParams.set('amount-in-cents', String(order.amount_in_cents));
  url.searchParams.set('reference', order.reference);
  url.searchParams.set('signature:integrity', createWompiIntegritySignature({
    reference: order.reference,
    amountInCents: order.amount_in_cents,
    currency: order.currency,
    integritySecret: config.integritySecret,
  }));
  url.searchParams.set('redirect-url', reportUrl(config.origin, order.submission_id));
  url.searchParams.set('customer-data:email', payerEmail);
  return url.toString();
}

function toCheckoutResponse(order: OrderRow, checkout: string | null): ToeflCheckoutResponse {
  const config = getToeflReportPaymentConfig();
  return {
    ok: true,
    paymentStatus: order.status,
    amountInCents: order.amount_in_cents,
    currency: order.currency,
    speakingReviewSlaHours: config.speakingReviewSlaHours,
    checkoutUrl: checkout,
    reportUrl: reportUrl(config.origin, order.submission_id),
  };
}

async function rotateAccess(order: OrderRow, accessTokenHash: string): Promise<OrderRow> {
  const { data, error } = await createAdminClient()
    .from('toefl_report_orders')
    .update({ access_token_hash: accessTokenHash, updated_at: new Date().toISOString() })
    .eq('id', order.id)
    .select('id, submission_id, reference, amount_in_cents, currency, status, environment, paid_at')
    .single();
  if (error || !data) throw new Error('No pudimos proteger el acceso al reporte.');
  return data as OrderRow;
}

export async function createToeflCheckoutSession(submissionId: string): Promise<CheckoutSession> {
  const config = getToeflReportPaymentConfig();
  const admin = createAdminClient();
  const { data: submission, error: submissionError } = await admin
    .from('exam_submissions')
    .select('id, user_email, submission_status')
    .eq('id', submissionId)
    .eq('exam_slug', 'toefl')
    .eq('submission_status', 'submitted')
    .maybeSingle();
  if (submissionError || !submission) throw new Error('No encontramos una entrega TOEFL confirmada.');

  const accessToken = newAccessToken();
  const accessTokenHash = sha256Hex(accessToken);
  const select = 'id, submission_id, reference, amount_in_cents, currency, status, environment, paid_at';
  const { data: approved, error: approvedError } = await admin
    .from('toefl_report_orders')
    .select(select)
    .eq('submission_id', submissionId)
    .eq('status', 'APPROVED')
    .maybeSingle();
  if (approvedError) throw new Error('No pudimos consultar el estado del pago.');
  if (approved) {
    const order = await rotateAccess(approved as OrderRow, accessTokenHash);
    return {
      response: toCheckoutResponse(order, null),
      cookieName: toeflReportCookieName(submissionId),
      accessToken,
    };
  }

  const { data: pending, error: pendingError } = await admin
    .from('toefl_report_orders')
    .select(select)
    .eq('submission_id', submissionId)
    .eq('status', 'PENDING')
    .maybeSingle();
  if (pendingError) throw new Error('No pudimos consultar el intento de pago.');

  let order: OrderRow;
  if (pending) {
    const existing = pending as OrderRow;
    if (existing.amount_in_cents !== config.amountInCents || existing.environment !== config.environment) {
      throw new Error('El precio o el ambiente cambió mientras había un pago abierto. Escríbenos para renovarlo.');
    }
    order = await rotateAccess(existing, accessTokenHash);
  } else {
    const reference = `WL-TOEFL-${submissionId}-${randomUUID().slice(0, 8)}`;
    const { data: inserted, error: insertError } = await admin
      .from('toefl_report_orders')
      .insert({
        submission_id: submissionId,
        reference,
        amount_in_cents: config.amountInCents,
        currency: config.currency,
        status: 'PENDING',
        environment: config.environment,
        access_token_hash: accessTokenHash,
      })
      .select(select)
      .single();
    if (insertError || !inserted) {
      const { data: raced } = await admin
        .from('toefl_report_orders')
        .select(select)
        .eq('submission_id', submissionId)
        .eq('status', 'PENDING')
        .maybeSingle();
      if (!raced) throw new Error('No pudimos crear la referencia de pago.');
      order = await rotateAccess(raced as OrderRow, accessTokenHash);
    } else {
      order = inserted as OrderRow;
    }
  }

  return {
    response: toCheckoutResponse(order, checkoutUrl(order, submission.user_email, config)),
    cookieName: toeflReportCookieName(submissionId),
    accessToken,
  };
}

export async function readToeflReport(submissionId: string, accessToken: string): Promise<ToeflReportResponse | null> {
  const config = getToeflReportPaymentConfig();
  const admin = createAdminClient();
  const accessTokenHash = sha256Hex(accessToken);
  const { data: order, error: orderError } = await admin
    .from('toefl_report_orders')
    .select('id, submission_id, amount_in_cents, currency, status, paid_at')
    .eq('submission_id', submissionId)
    .eq('access_token_hash', accessTokenHash)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (orderError || !order) return null;
  if (order.status !== 'APPROVED') {
    return {
      ok: true,
      paymentStatus: order.status as Exclude<ToeflReportPaymentStatus, 'APPROVED'>,
      amountInCents: Number(order.amount_in_cents),
      currency: 'COP',
      speakingReviewSlaHours: config.speakingReviewSlaHours,
    };
  }

  const { data: submission, error: submissionError } = await admin
    .from('exam_submissions')
    .select('id, mock_id, mock_title, user_name, skills, writing_task1_answer, writing_task2_answer, writing_task1_assessment, writing_task2_assessment, toefl_speaking_repeat_assessment, toefl_speaking_interview_assessment, reviewed_at, total_label')
    .eq('id', submissionId)
    .eq('exam_slug', 'toefl')
    .eq('submission_status', 'submitted')
    .maybeSingle();
  if (submissionError || !submission) return null;

  return {
    ok: true,
    paymentStatus: 'APPROVED',
    amountInCents: Number(order.amount_in_cents),
    currency: 'COP',
    paidAt: order.paid_at ?? new Date().toISOString(),
    speakingReviewSlaHours: config.speakingReviewSlaHours,
    assessmentReceipt: { submissionId, completionToken: createToeflSubmissionToken(submissionId) },
    submission: {
      id: submission.id,
      mockId: submission.mock_id,
      mockTitle: submission.mock_title,
      studentName: submission.user_name ?? 'Estudiante',
      skills: Array.isArray(submission.skills) ? submission.skills as ToeflReportSkill[] : [],
      writingEmail: submission.writing_task1_answer ?? '',
      writingDiscussion: submission.writing_task2_answer ?? '',
      writingEmailAssessment: submission.writing_task1_assessment ?? null,
      writingDiscussionAssessment: submission.writing_task2_assessment ?? null,
      speakingRepeatAssessment: submission.toefl_speaking_repeat_assessment ?? null,
      speakingInterviewAssessment: submission.toefl_speaking_interview_assessment ?? null,
      reviewedAt: submission.reviewed_at,
      totalLabel: submission.total_label,
    },
  };
}
