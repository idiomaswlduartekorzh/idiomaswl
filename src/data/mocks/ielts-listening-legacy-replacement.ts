import type { MockExam } from './types';
import { expandIeltsListeningLegacyTranscript } from './ielts-listening-legacy-expansions-5-6.ts';
import { ieltsListeningLegacyExpansion } from './ielts-listening-legacy-expansions-7-8.ts';
import { expandIeltsLegacyTranscriptForSets10To12 } from './ielts-listening-legacy-expansions-10-12.ts';

export const IELTS_LISTENING_LEGACY_REPLACEMENT_SETS = new Set([5, 6, 7, 8, 10, 11, 12]);

export function expandIeltsListeningLegacyReplacement(
  setNumber: number,
  part: number,
  transcript: string,
): string {
  if (setNumber === 5 || setNumber === 6) {
    return expandIeltsListeningLegacyTranscript(setNumber, part, transcript);
  }
  if (setNumber === 7 || setNumber === 8) {
    return ieltsListeningLegacyExpansion(setNumber, part as 1 | 2 | 3 | 4);
  }
  if (setNumber === 10 || setNumber === 11 || setNumber === 12) {
    return expandIeltsLegacyTranscriptForSets10To12(setNumber, part, transcript);
  }
  return transcript.trim();
}

export function withIeltsListeningLegacyReplacementTranscript(mock: MockExam): MockExam {
  const setNumber = Number(mock.id.replace(/^set-/, ''));
  if (!IELTS_LISTENING_LEGACY_REPLACEMENT_SETS.has(setNumber)) return mock;
  return {
    ...mock,
    sections: mock.sections.map(section => section.skill === 'listening' && section.transcript
      ? { ...section, transcript: expandIeltsListeningLegacyReplacement(setNumber, section.part, section.transcript) }
      : section),
  };
}
