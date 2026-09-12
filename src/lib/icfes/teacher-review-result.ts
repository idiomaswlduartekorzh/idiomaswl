import { canonicalJson, type JsonValue } from './attempt-evidence.ts';
import { createHash } from 'node:crypto';
import { ICFES_TEACHER_RUBRIC_VERSION } from './teacher-rubric-v1.ts';

export const ICFES_TEACHER_REVIEW_RESULT_VERSION = 'icfes-teacher-review-result-2026-09-09-v1' as const;

export type IcfesTeacherReviewResult = Readonly<{
  version: typeof ICFES_TEACHER_REVIEW_RESULT_VERSION;
  rubricVersion: typeof ICFES_TEACHER_RUBRIC_VERSION;
  summary: string;
  strengths: readonly string[];
  priorities: readonly string[];
  itemFeedback: readonly Readonly<{ questionId: string; feedback: string }>[];
}>;

function safeText(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const text = value.trim();
  return text.length >= 1 && text.length <= max && !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text) ? text : null;
}

function safeList(value: unknown, maxItems: number): string[] | null {
  if (!Array.isArray(value) || value.length > maxItems) return null;
  const result = value.map((item) => safeText(item, 500));
  return result.every((item): item is string => item !== null) ? result : null;
}

export function parseIcfesTeacherReviewResult(value: unknown): IcfesTeacherReviewResult | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  if (Object.keys(input).some((key) => !['version', 'rubricVersion', 'summary', 'strengths', 'priorities', 'itemFeedback'].includes(key))) return null;
  if (input.version !== ICFES_TEACHER_REVIEW_RESULT_VERSION
    || input.rubricVersion !== ICFES_TEACHER_RUBRIC_VERSION) return null;
  const summary = safeText(input.summary, 2_000);
  const strengths = safeList(input.strengths, 10);
  const priorities = safeList(input.priorities, 10);
  if (!summary || !strengths || !priorities || !Array.isArray(input.itemFeedback) || input.itemFeedback.length > 100) return null;
  const itemFeedback = input.itemFeedback.map((item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return null;
    const row = item as Record<string, unknown>;
    if (Object.keys(row).some((key) => !['questionId', 'feedback'].includes(key))) return null;
    const questionId = safeText(row.questionId, 120);
    const feedback = safeText(row.feedback, 1_000);
    return questionId && feedback ? { questionId, feedback } : null;
  });
  if (itemFeedback.some((item) => item === null)) return null;
  return Object.freeze({ version: input.version, rubricVersion: input.rubricVersion, summary,
    strengths: Object.freeze(strengths), priorities: Object.freeze(priorities),
    itemFeedback: Object.freeze(itemFeedback as { questionId: string; feedback: string }[]) });
}

export function hashIcfesTeacherReviewResult(result: IcfesTeacherReviewResult): string {
  return createHash('sha256').update(canonicalJson(result as unknown as JsonValue), 'utf8').digest('hex');
}
