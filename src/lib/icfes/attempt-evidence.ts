import { createHash } from 'node:crypto';
import type { MockExam } from '@/data/mocks/types';
import type { IcfesAnswerMap, IcfesBasicResultDto } from './attempt-contract';

export const ICFES_QUESTION_SNAPSHOT_VERSION = 'icfes-question-snapshot-2026-09-09-v1' as const;

type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export interface IcfesQuestionSnapshot {
  version: typeof ICFES_QUESTION_SNAPSHOT_VERSION;
  examId: string;
  exam: JsonValue;
}

function jsonValue(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}

export function canonicalJson(value: JsonValue): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  return `{${Object.entries(value).sort(([a], [b]) => a.localeCompare(b))
    .map(([key, child]) => `${JSON.stringify(key)}:${canonicalJson(child)}`).join(',')}}`;
}

export function buildIcfesQuestionSnapshot(exam: MockExam): IcfesQuestionSnapshot {
  return {
    version: ICFES_QUESTION_SNAPSHOT_VERSION,
    examId: exam.id,
    // Preserve the complete rendered bank (stimuli, options, answer keys and
    // rationales), not a pointer to mutable runtime content.
    exam: jsonValue(exam),
  };
}

export function hashIcfesQuestionSnapshot(snapshot: IcfesQuestionSnapshot): string {
  return createHash('sha256').update(canonicalJson(snapshot as unknown as JsonValue), 'utf8').digest('hex');
}

export type IcfesAttemptEvidence = {
  exam_id: string;
  access_token_hash: string;
  answers: IcfesAnswerMap;
  basic_result: IcfesBasicResultDto;
  question_snapshot_version: string;
  question_snapshot_hash: string;
  question_snapshot: IcfesQuestionSnapshot;
};

export function isSameIcfesAttemptEvidence(existing: IcfesAttemptEvidence, incoming: IcfesAttemptEvidence): boolean {
  return existing.exam_id === incoming.exam_id
    && existing.access_token_hash === incoming.access_token_hash
    && existing.question_snapshot_version === incoming.question_snapshot_version
    && existing.question_snapshot_hash === incoming.question_snapshot_hash
    && canonicalJson(existing.answers as unknown as JsonValue) === canonicalJson(incoming.answers as unknown as JsonValue)
    && canonicalJson(existing.basic_result as unknown as JsonValue) === canonicalJson(incoming.basic_result as unknown as JsonValue)
    && canonicalJson(existing.question_snapshot as unknown as JsonValue) === canonicalJson(incoming.question_snapshot as unknown as JsonValue);
}

export function classifyIcfesAttemptClaim(storedUserId: string | null, authenticatedUserId: string) {
  if (!storedUserId) return 'CLAIM' as const;
  return storedUserId === authenticatedUserId ? 'REPLAY' as const : 'REJECT_TAKEOVER' as const;
}
