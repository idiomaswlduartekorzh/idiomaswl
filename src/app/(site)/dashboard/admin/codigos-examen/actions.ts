'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import {
  createExamAccessCode,
  revokeExamAccessCode,
  type ExamAccessCodeRow,
} from '@/lib/exam-access-codes/server';

type ActionResult =
  | { ok: true; code?: string; row?: ExamAccessCodeRow }
  | { ok: false; error: string };

export async function generateExamCodeAction(input: {
  kind: unknown;
  examSlug: unknown;
  label?: unknown;
}): Promise<ActionResult> {
  try {
    const admin = await requireAdmin();
    const created = await createExamAccessCode({
      ...input,
      adminId: admin.id,
      adminEmail: admin.email,
    });
    revalidatePath('/dashboard/admin/codigos-examen');
    return { ok: true, code: created.code, row: created.row };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'No pudimos generar el código.' };
  }
}
export async function revokeExamCodeAction(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await revokeExamAccessCode(id);
    revalidatePath('/dashboard/admin/codigos-examen');
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'No pudimos revocar el código.' };
  }
}
