import type { ExamAccessCodeExam, ExamAccessCodeKind } from './config';

export type ExamAccessOutcome = Readonly<{
  unlocked: boolean;
  message?: string;
  kind?: ExamAccessCodeKind | 'existing_grant';
  activeUntil?: string | null;
}>;

export async function redeemExamAccessCodeFromBrowser(input: {
  code: string;
  examSlug: ExamAccessCodeExam;
  attemptRef: string;
}): Promise<ExamAccessOutcome> {
  if (!input.code.trim()) return { unlocked: false };
  try {
    const response = await fetch('/api/exam-access-codes/redeem', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(input),
    });
    const body = await response.json() as { ok?: boolean; error?: string; kind?: ExamAccessOutcome['kind']; activeUntil?: string | null };
    if (!response.ok || !body.ok) return { unlocked: false, message: body.error ?? 'El código no es válido o ya venció.' };
    return { unlocked: true, kind: body.kind, activeUntil: body.activeUntil ?? null };
  } catch {
    return { unlocked: false, message: 'No pudimos validar el código. Puedes reintentarlo en la pantalla de resultado.' };
  }
}
