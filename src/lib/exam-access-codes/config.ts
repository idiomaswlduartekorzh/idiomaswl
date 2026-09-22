export const EXAM_ACCESS_CODE_KINDS = ['single_use', 'classroom_5h'] as const;
export const EXAM_ACCESS_CODE_EXAMS = ['icfes', 'ielts', 'toefl', 'goethe'] as const;

export type ExamAccessCodeKind = typeof EXAM_ACCESS_CODE_KINDS[number];
export type ExamAccessCodeExam = typeof EXAM_ACCESS_CODE_EXAMS[number];

export const EXAM_ACCESS_CODE_LABELS: Record<ExamAccessCodeKind, string> = {
  single_use: 'Un solo uso',
  classroom_5h: 'Grupo · 5 horas',
};

export const EXAM_ACCESS_EXAM_LABELS: Record<ExamAccessCodeExam, string> = {
  icfes: 'ICFES Saber 11',
  ielts: 'IELTS Academic',
  toefl: 'TOEFL iBT',
  goethe: 'Goethe-Zertifikat',
};

export function isExamAccessCodeKind(value: unknown): value is ExamAccessCodeKind {
  return typeof value === 'string' && EXAM_ACCESS_CODE_KINDS.includes(value as ExamAccessCodeKind);
}

export function isExamAccessCodeExam(value: unknown): value is ExamAccessCodeExam {
  return typeof value === 'string' && EXAM_ACCESS_CODE_EXAMS.includes(value as ExamAccessCodeExam);
}

/** Codes are case-insensitive and tolerate spaces or dashes when pasted. */
export function normalizeExamAccessCode(value: unknown): string {
  return typeof value === 'string' ? value.toUpperCase().replace(/[^A-Z0-9]/g, '') : '';
}

export function formatExamAccessCode(normalized: string): string {
  const value = normalizeExamAccessCode(normalized);
  if (!value.startsWith('WL') || value.length !== 16) return value;
  return `WL-${value.slice(2).match(/.{1,4}/g)?.join('-') ?? value.slice(2)}`;
}
