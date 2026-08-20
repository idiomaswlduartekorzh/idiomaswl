export const IELTS_MOCK4_ID = 'set-4';
export const IELTS_SPEAKING_BUCKET = 'ielts-speaking-audio';
export const IELTS_MOCK4_SPEAKING_IDS = ['sp1', 'sp2', 'sp3', 'sp4'] as const;

export type IeltsMock4SpeakingId = (typeof IELTS_MOCK4_SPEAKING_IDS)[number];

export interface IeltsMock4AudioDescriptor {
  questionId: IeltsMock4SpeakingId;
  mimeType: string;
  size: number;
  durationSeconds: number;
}

export interface IeltsMock4SubmissionPayload {
  name: string;
  email: string;
  readingBand: number;
  listeningBand: number | null;
  writingTask1: string;
  writingTask2: string;
  speakingNotes: Record<string, string>;
  audio: IeltsMock4AudioDescriptor[];
}

export interface IeltsMock4PreparedUpload {
  questionId: IeltsMock4SpeakingId;
  path: string;
  token: string;
}

export interface IeltsMock4PrepareResponse extends IeltsSubmissionReceipt {
  ok: true;
  uploads: IeltsMock4PreparedUpload[];
}

export interface IeltsMock4CompleteResponse {
  ok: true;
  submissionId: string;
}
import type { IeltsSubmissionReceipt } from './review-blueprint';
