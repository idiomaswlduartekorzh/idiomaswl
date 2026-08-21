import type { IeltsSubmissionReceipt } from './review-blueprint';

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
