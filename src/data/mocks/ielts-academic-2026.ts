import type { MockExam } from './types';

export const IELTS_ACADEMIC_2026_DISCLOSURE =
  'Simulacro académico original de WeLearn, alineado con la estructura pública de IELTS Academic consultada el 25 de agosto de 2026. No es material oficial de IELTS, no reproduce preguntas oficiales y no ofrece equivalencia psicométrica.';

/**
 * Makes the public product contract explicit without mutating the authored set.
 * Content and media release integrity are enforced separately by the IELTS audit.
 */
export function withIeltsAcademic2026Blueprint(mock: MockExam): MockExam {
  const setNumber = Number(mock.id.replace(/^set-/, ''));
  const listeningReady = setNumber >= 4 && setNumber <= 12;
  return {
    ...mock,
    sections: mock.sections.map((section) => section.skill === 'listening' && !listeningReady
      ? {
          ...section,
          audioUrl: undefined,
          mediaStatus: 'script-ready-audio-blocked' as const,
          comingSoon: true,
        }
      : section),
    format: 'ielts-academic-2026',
    timeMinutes: 164,
    ieltsAcademic2026Blueprint: {
      delivery: 'computer',
      contentOrigin: 'original-welearn',
      disclosure: IELTS_ACADEMIC_2026_DISCLOSURE,
      sourceAsOf: '2026-08-25',
      sections: [
        {
          skill: 'listening',
          timeLimitSeconds: 30 * 60,
          navigation: 'within-section',
          targetResponses: 40,
        },
        {
          skill: 'reading',
          timeLimitSeconds: 60 * 60,
          navigation: 'within-section',
          targetResponses: 40,
        },
        {
          skill: 'writing',
          timeLimitSeconds: 60 * 60,
          navigation: 'within-section',
          targetResponses: 2,
        },
        {
          skill: 'speaking',
          timeLimitSeconds: 14 * 60,
          navigation: 'within-section',
          targetResponses: 'human-assessed',
        },
      ],
      readingTargetWords: [2150, 2750],
      listeningPlayback: 'once',
      listeningMediaStatus: listeningReady ? 'ready-existing' : 'script-ready-audio-blocked',
      speakingMode: 'recorded-welearn-simulation',
    },
  };
}
