import type { MockExam } from './types';
import { expandIeltsListeningTranscript } from './ielts-listening-expansions.ts';

export const IELTS_LISTENING_PRODUCTION_SETS = new Set([2, 3, 4, 13, 14, 15, 16, 17, 18, 19, 20]);

/**
 * Returns the canonical transcript used by both the product and TTS production.
 * The authored question-bearing text is preserved verbatim; added discourse
 * supplies realistic pacing, signposting and review time without adding keys.
 */
export function withIeltsListeningProductionTranscript(mock: MockExam): MockExam {
  const setNumber = Number(mock.id.replace(/^set-/, ''));
  if (!IELTS_LISTENING_PRODUCTION_SETS.has(setNumber)) return mock;
  return {
    ...mock,
    sections: mock.sections.map(section => section.skill === 'listening' && section.transcript
      ? { ...section, transcript: expandIeltsListeningTranscript(setNumber, section.part, section.transcript) }
      : section),
  };
}
