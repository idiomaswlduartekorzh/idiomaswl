import type { IeltsSubmissionReceipt } from './review-blueprint';
import type { MockExam } from '@/data/mocks/types';

export const IELTS_SPEAKING_BUCKET = 'ielts-speaking-audio';
export const IELTS_SUBMISSION_CONSENT_VERSION = 'ielts-review-consent-v2';

export interface IeltsObjectiveAnswers {
  fills: Record<string, string>;
  mcq: Record<string, number>;
  ms: Record<string, string[]>;
  match: Record<string, string>;
}

export interface IeltsAudioDescriptor {
  questionId: string;
  mimeType: string;
  size: number;
  durationSeconds: number;
}

export interface IeltsSpeakingPromptRef {
  questionId: string;
  partNumber: number;
}

export interface IeltsSubmissionPayload {
  contentVersion?: string;
  name: string;
  email: string;
  consentVersion: typeof IELTS_SUBMISSION_CONSENT_VERSION;
  objectiveAnswers: IeltsObjectiveAnswers;
  writingTask1: string;
  writingTask2: string;
  speakingNotes: Record<string, string>;
  audio: IeltsAudioDescriptor[];
}

export interface IeltsPreparedUpload {
  questionId: string;
  path: string;
  token: string;
}

export interface IeltsPrepareResponse extends IeltsSubmissionReceipt {
  ok: true;
  uploads: IeltsPreparedUpload[];
}

export interface IeltsCompleteResponse {
  ok: true;
  submissionId: string;
  reviewMock: MockExam | null;
  basicScore: string;
  xpressAccess: 'membership' | 'single-credit' | 'welearn' | 'public' | 'free-sample' | 'access-code';
}

export const IELTS_SPEAKING_MIN_PART_SECONDS: Readonly<Record<number, number>> = {
  1: 30,
  2: 60,
  3: 45,
};
export const IELTS_SPEAKING_MIN_TOTAL_SECONDS = 150;

export function countEssayWords(value: string): number {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

/** The combined count is available only when both objective skills have a recorded numerator and denominator. */
export function ieltsObjectiveScoreLabel(skills: unknown): string | null {
  if (!Array.isArray(skills)) return null;
  const counts = new Map<string, { correct: number; total: number }>();
  for (const entry of skills) {
    if (!entry || typeof entry !== 'object') continue;
    const name = typeof entry.skill === 'string' ? entry.skill : typeof entry.name === 'string' ? entry.name : '';
    const skill = name.trim().toLowerCase();
    if (skill !== 'listening' && skill !== 'reading') continue;
    if (counts.has(skill)) return null;

    const raw = typeof entry.raw === 'string' ? entry.raw.trim().match(/^(\d+)\s*\/\s*(\d+)(?:\s+(?:correct|aciertos?))?$/i) : null;
    // Older records sometimes store the objective points directly on the 40-point scale.
    // A score out of 9 is a band and does not uniquely identify a number of correct answers.
    const legacyPoints = entry.raw == null && (entry.max === 40 || entry.max === '40')
      && (typeof entry.score === 'number' || (typeof entry.score === 'string' && /^\d+$/.test(entry.score.trim())));
    if (!raw && !legacyPoints) return null;
    const correct = Number(raw ? raw[1] : entry.score);
    const total = raw ? Number(raw[2]) : 40;
    if (!Number.isSafeInteger(correct) || !Number.isSafeInteger(total) || total <= 0 || total > 40 || correct < 0 || correct > total) return null;
    counts.set(skill, { correct, total });
  }
  const listening = counts.get('listening');
  const reading = counts.get('reading');
  return listening && reading ? `${listening.correct + reading.correct}/${listening.total + reading.total}` : null;
}

export function ieltsSpeakingEvidenceIssues(
  prompts: readonly IeltsSpeakingPromptRef[],
  audio: readonly IeltsAudioDescriptor[],
): string[] {
  const issues: string[] = [];
  const descriptors = new Map(audio.map(item => [item.questionId, item]));
  const expectedIds = new Set(prompts.map(prompt => prompt.questionId));

  for (const prompt of prompts) {
    const descriptor = descriptors.get(prompt.questionId);
    if (!descriptor) issues.push(`Falta la grabación ${prompt.questionId.toUpperCase()}.`);
    else if (descriptor.durationSeconds < 2) issues.push(`La grabación ${prompt.questionId.toUpperCase()} es demasiado corta.`);
  }
  for (const descriptor of audio) {
    if (!expectedIds.has(descriptor.questionId)) issues.push(`La grabación ${descriptor.questionId.toUpperCase()} no pertenece a este simulacro.`);
  }

  const parts = new Map<number, number>();
  for (const prompt of prompts) {
    const duration = descriptors.get(prompt.questionId)?.durationSeconds ?? 0;
    parts.set(prompt.partNumber, (parts.get(prompt.partNumber) ?? 0) + duration);
  }
  for (const partNumber of [1, 2, 3]) {
    const required = IELTS_SPEAKING_MIN_PART_SECONDS[partNumber];
    if ((parts.get(partNumber) ?? 0) < required) {
      issues.push(`Speaking Part ${partNumber} necesita al menos ${required} segundos de muestra audible.`);
    }
  }

  const total = audio.reduce((sum, item) => sum + item.durationSeconds, 0);
  if (total < IELTS_SPEAKING_MIN_TOTAL_SECONDS) {
    issues.push(`Speaking necesita al menos ${IELTS_SPEAKING_MIN_TOTAL_SECONDS} segundos de muestra total.`);
  }
  return issues;
}
