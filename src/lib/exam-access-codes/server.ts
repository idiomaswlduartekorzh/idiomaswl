import 'server-only';

import { createHash, randomBytes } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  formatExamAccessCode,
  isExamAccessCodeExam,
  isExamAccessCodeKind,
  normalizeExamAccessCode,
  type ExamAccessCodeExam,
  type ExamAccessCodeKind,
} from './config';

const CODE_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const ATTEMPT_REF_PATTERN = /^[A-Za-z0-9:_-]{8,160}$/;

export interface ExamAccessCodeRow {
  id: string;
  code_hint: string;
  kind: ExamAccessCodeKind;
  exam_slug: ExamAccessCodeExam;
  label: string | null;
  created_by_email: string | null;
  created_at: string;
  activated_at: string | null;
  expires_at: string | null;
  redemption_count: number;
  last_redeemed_at: string | null;
}

function digestCode(normalizedCode: string): string {
  return createHash('sha256').update(normalizedCode, 'utf8').digest('hex');
}

function randomCode(): string {
  const bytes = randomBytes(14);
  let body = '';
  for (let index = 0; index < 14; index += 1) body += CODE_ALPHABET[bytes[index] % CODE_ALPHABET.length];
  return formatExamAccessCode(`WL${body}`);
}

function cleanLabel(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  return value.trim().slice(0, 120);
}

export async function cleanupExpiredExamAccessCodes(): Promise<void> {
  const { error } = await createAdminClient()
    .from('exam_access_codes')
    .delete()
    .eq('kind', 'classroom_5h')
    .lte('expires_at', new Date().toISOString());
  if (error) console.error('[exam-access-codes] cleanup failed', error.message);
}

export async function listExamAccessCodes(): Promise<ExamAccessCodeRow[]> {
  await cleanupExpiredExamAccessCodes();
  const { data, error } = await createAdminClient()
    .from('exam_access_codes')
    .select('id, code_hint, kind, exam_slug, label, created_by_email, created_at, activated_at, expires_at, redemption_count, last_redeemed_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error('No pudimos consultar los códigos activos.');
  return (data ?? []) as ExamAccessCodeRow[];
}

export async function createExamAccessCode(input: {
  kind: unknown;
  examSlug: unknown;
  label?: unknown;
  adminId: string;
  adminEmail: string;
}): Promise<{ code: string; row: ExamAccessCodeRow }> {
  if (!isExamAccessCodeKind(input.kind) || !isExamAccessCodeExam(input.examSlug)) {
    throw new Error('Selecciona un examen y un tipo de código válidos.');
  }

  const admin = createAdminClient();
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const code = randomCode();
    const normalized = normalizeExamAccessCode(code);
    const { data, error } = await admin.from('exam_access_codes').insert({
      code_hash: digestCode(normalized),
      code_hint: code.slice(-4),
      kind: input.kind,
      exam_slug: input.examSlug,
      label: cleanLabel(input.label),
      created_by: input.adminId,
      created_by_email: input.adminEmail,
    }).select('id, code_hint, kind, exam_slug, label, created_by_email, created_at, activated_at, expires_at, redemption_count, last_redeemed_at').single();

    if (!error && data) return { code, row: data as ExamAccessCodeRow };
    if (error?.code !== '23505') {
      console.error('[exam-access-codes] create failed', error?.message);
      throw new Error('No pudimos generar el código. Inténtalo nuevamente.');
    }
  }
  throw new Error('No pudimos generar un código único. Inténtalo nuevamente.');
}

export async function revokeExamAccessCode(id: string): Promise<void> {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    throw new Error('Código inválido.');
  }
  const { error } = await createAdminClient().from('exam_access_codes').delete().eq('id', id);
  if (error) throw new Error('No pudimos revocar el código.');
}

export async function redeemExamAccessCode(input: {
  code: unknown;
  examSlug: unknown;
  attemptRef: unknown;
}): Promise<{ ok: true; kind: ExamAccessCodeKind | 'existing_grant'; activeUntil: string | null } | { ok: false; reason: 'invalid' | 'expired' }> {
  const normalized = normalizeExamAccessCode(input.code);
  if (normalized.length !== 16 || !normalized.startsWith('WL') || !isExamAccessCodeExam(input.examSlug)
    || typeof input.attemptRef !== 'string' || !ATTEMPT_REF_PATTERN.test(input.attemptRef)) {
    return { ok: false, reason: 'invalid' };
  }

  await cleanupExpiredExamAccessCodes();
  const { data, error } = await createAdminClient().rpc('redeem_exam_access_code', {
    p_code_hash: digestCode(normalized),
    p_exam_slug: input.examSlug,
    p_attempt_ref: input.attemptRef,
  });
  if (error) {
    console.error('[exam-access-codes] redeem failed', error.message);
    return { ok: false, reason: 'invalid' };
  }
  const result = Array.isArray(data) ? data[0] : data;
  if (!result?.accepted) return { ok: false, reason: result?.reason === 'expired' ? 'expired' : 'invalid' };
  return {
    ok: true,
    kind: result.code_kind as ExamAccessCodeKind | 'existing_grant',
    activeUntil: typeof result.active_until === 'string' ? result.active_until : null,
  };
}
