import type { ToeflSubmissionReceipt } from './review-blueprint';

export const TOEFL_SPEAKING_BUCKET = 'toefl-speaking-audio';
export const TOEFL_SUBMISSION_CONSENT_VERSION = 'toefl-2026-review-consent-v1';

export interface ToeflObjectiveAnswers {
  word: Record<string, Record<number, string>>;
  single: Record<string, string>;
  multi: Record<string, string[]>;
  listening: Record<string, string>;
  build: Record<string, string[]>;
}

export interface ToeflAudioDescriptor {
  questionId: string;
  mimeType: string;
  size: number;
  durationSeconds: number;
}

export interface ToeflSpeakingPromptRef {
  questionId: string;
  taskType: 'repeat' | 'interview';
  label: string;
}

export interface ToeflSubmissionPayload {
  name: string;
  email: string;
  consentVersion: typeof TOEFL_SUBMISSION_CONSENT_VERSION;
  attemptId: string;
  objectiveAnswers: ToeflObjectiveAnswers;
  writingEmail: string;
  writingDiscussion: string;
  audio: ToeflAudioDescriptor[];
}

export interface ToeflPreparedUpload {
  questionId: string;
  path: string;
  token: string;
}

export interface ToeflPrepareResponse extends ToeflSubmissionReceipt {
  ok: true;
  uploads: ToeflPreparedUpload[];
}

export interface ToeflCompleteResponse {
  ok: true;
  submissionId: string;
}

export function countToeflWords(value: string): number {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

/** Technical evidence checks only; these are not ETS timing or scoring rules. */
export function toeflSpeakingEvidenceIssues(
  prompts: readonly ToeflSpeakingPromptRef[],
  audio: readonly ToeflAudioDescriptor[],
): string[] {
  const issues: string[] = [];
  const expectedIds = new Set(prompts.map(prompt => prompt.questionId));
  const descriptors = new Map(audio.map(item => [item.questionId, item]));

  for (const prompt of prompts) {
    const descriptor = descriptors.get(prompt.questionId);
    if (!descriptor) issues.push(`Falta la grabación ${prompt.label}.`);
    else if (descriptor.durationSeconds < 1) issues.push(`La grabación ${prompt.label} está vacía o es demasiado corta para verificarse.`);
  }
  for (const descriptor of audio) {
    if (!expectedIds.has(descriptor.questionId)) issues.push(`La grabación ${descriptor.questionId} no pertenece a este simulacro.`);
  }
  if (new Set(audio.map(item => item.questionId)).size !== audio.length) {
    issues.push('Hay grabaciones repetidas en la entrega.');
  }
  return issues;
}
