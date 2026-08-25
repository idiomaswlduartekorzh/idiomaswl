import type { MCQQuestion, MockExam, MockSection } from './types';
import {
  IELTS_READING_AUDIT_CODAS,
  IELTS_READING_PASSAGE_3_SUPPLEMENTS,
} from './ielts-reading-supplements.ts';

export const IELTS_ACADEMIC_2026_DISCLOSURE =
  'Simulacro académico original de WeLearn, alineado con la estructura pública de IELTS Academic consultada el 25 de agosto de 2026. No es material oficial de IELTS, no reproduce preguntas oficiales y no ofrece equivalencia psicométrica.';

const DISTRACTOR_REVISIONS: Readonly<Record<string, Readonly<{ from: string; to: string }>>> = {
  '4:l3q21': {
    from: 'It used a much larger sample group.',
    to: 'It used a much larger sample group overall.',
  },
  '4:l3q22': {
    from: 'It is very large and clearly significant.',
    to: 'It is very large and clearly significant for most teenagers.',
  },
  '4:l3q25': {
    from: 'Because social media use is much lower among adults.',
    to: 'Because social media use is much lower among adults in every country included in the research sample.',
  },
  '4:l3q27': {
    from: 'Because screen time data is required by ethics approval.',
    to: 'Because screen time data alone is required by ethics approval.',
  },
  '4:l4q39': {
    from: 'Most species are migrating later in the spring.',
    to: 'Most species are migrating later in the spring as the climate becomes steadily warmer.',
  },
  '5:l3q25': {
    from: 'divide into teams',
    to: 'divide into smaller teams',
  },
  '7:l3q25': {
    from: 'run a small pilot study',
    to: 'run a small pilot study first',
  },
  '8:l3q22': {
    from: 'too few people were surveyed',
    to: 'too few people were surveyed to represent the intended customer base',
  },
  '8:l3q23': {
    from: 'charge less than his competitors',
    to: 'charge less than his established local competitors',
  },
  '8:l3q24': {
    from: 'selling spare parts more cheaply than them',
    to: 'selling spare parts more cheaply than the established repair shops in town',
  },
  '4:r1q11': {
    from: 'Agriculture was invented in a single location and spread from there.',
    to: 'Agriculture was invented in a single location and spread from there through migration and trade.',
  },
  '4:r1q12': {
    from: 'They were traded with neighbouring regions for tools.',
    to: 'They were traded with neighbouring regions for tools and seed grain.',
  },
  '4:r1q13': {
    from: 'Nomadic',
    to: 'Nomadic, moving regularly between seasonal camps',
  },
  '4:r2q18': {
    from: 'That people solve problems faster when they work continuously without breaks.',
    to: 'That people solve problems faster when they work continuously without breaks or periods of sleep.',
  },
};

function withAuditedDistractors(item: MCQQuestion, setNumber: number): MCQQuestion {
  const revision = DISTRACTOR_REVISIONS[`${setNumber}:${item.id}`];
  if (!revision) return item;
  const optionIndex = item.options.indexOf(revision.from);
  if (optionIndex < 0 || optionIndex === item.answer) return item;
  const options = [...item.options];
  options[optionIndex] = revision.to;
  return { ...item, options };
}

function withBalancedMcqPositions(sections: MockSection[], setNumber: number): MockSection[] {
  const counters = { listening: 0, reading: 0 };

  return sections.map((section) => {
    if (section.skill !== 'listening' && section.skill !== 'reading') return section;
    const skill = section.skill;
    return {
      ...section,
      questions: section.questions.map((question) => {
        if ((question.type !== 'mcq' && question.type !== 'dialog') || question.options.length < 2) {
          return question;
        }
        const item = withAuditedDistractors(question as MCQQuestion, setNumber);
        const desiredAnswer = (setNumber + counters[skill]) % item.options.length;
        counters[skill] += 1;
        if (desiredAnswer === item.answer) return item;

        const correct = item.options[item.answer];
        const options = item.options.filter((_, index) => index !== item.answer);
        options.splice(desiredAnswer, 0, correct);
        return { ...item, options, answer: desiredAnswer };
      }),
    };
  });
}

function withAuditedReadingLength(sections: MockSection[], setNumber: number): MockSection[] {
  const supplement = IELTS_READING_PASSAGE_3_SUPPLEMENTS[setNumber];
  if (!supplement) return sections;
  const coda = IELTS_READING_AUDIT_CODAS[setNumber];
  const readingSections = sections.filter((section) => section.skill === 'reading');
  const finalReadingPart = readingSections.at(-1)?.part;
  return sections.map((section) => section.skill === 'reading' && section.part === finalReadingPart
    ? { ...section, passage: `${section.passage?.trim() ?? ''}\n\n${supplement.trim()}${coda ? `\n\n${coda.trim()}` : ''}` }
    : section);
}

/**
 * Makes the public product contract explicit without mutating the authored set.
 * Content and media release integrity are enforced separately by the IELTS audit.
 */
export function withIeltsAcademic2026Blueprint(mock: MockExam): MockExam {
  const setNumber = Number(mock.id.replace(/^set-/, ''));
  const hasLegacyListeningAudio = setNumber >= 4 && setNumber <= 12;
  const expandedSections = withAuditedReadingLength(mock.sections, setNumber);
  const balancedSections = withBalancedMcqPositions(expandedSections, setNumber);
  return {
    ...mock,
    sections: balancedSections.map((section) => {
      if (section.skill !== 'listening') return section;
      if (hasLegacyListeningAudio) {
        return { ...section, mediaStatus: 'legacy-audio-under-review' as const };
      }
      return {
        ...section,
        audioUrl: undefined,
        mediaStatus: 'script-ready-audio-blocked' as const,
        comingSoon: true,
      };
    }),
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
      listeningMediaStatus: hasLegacyListeningAudio ? 'legacy-audio-under-review' : 'script-ready-audio-blocked',
      speakingMode: 'recorded-welearn-simulation',
    },
  };
}
