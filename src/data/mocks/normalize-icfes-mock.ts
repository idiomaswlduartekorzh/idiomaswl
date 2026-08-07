import type { MockExam, MockSection, Question } from './types';
import { CURRENT_PART_SEVEN } from './icfes-current-part-seven';

const OFFICIAL_PART_BY_STYLE: Partial<Record<NonNullable<MockSection['sectionStyle']>, 1 | 2>> = {
  'matching-grid': 1,
  'notices-grid': 2,
};

const OFFICIAL_TITLE = {
  1: 'Parte 1 — Descripciones y palabras',
  2: 'Parte 2 — Avisos, propósito y lugar',
} as const;

function remapInstruction(instructions: string, officialPart: 1 | 2) {
  if (officialPart === 1) {
    return instructions
      .replace(/6\s*(?:to|–|-)\s*10/gi, '1 to 5')
      .replace(/questions 6\s*(?:to|–|-)\s*10/gi, 'questions 1 to 5');
  }

  return instructions
    .replace(/1\s*(?:to|–|-)\s*5/gi, '6 to 10')
    .replace(/questions 1\s*(?:to|–|-)\s*5/gi, 'questions 6 to 10');
}

function remapQuestion(question: Question, officialPart: 1 | 2): Question {
  return {
    ...question,
    id: question.id.replace(/^p[12]/, `p${officialPart}`),
    part: officialPart,
  };
}

/**
 * The 23 legacy practice sets were authored with Parts 1 and 2 reversed.
 * Normalize them at the registry boundary so every consumer receives the
 * current seven-part taxonomy without mutating the archived question banks.
 */
export function normalizeIcfesMock(mock: MockExam): MockExam {
  const currentPartSeven = CURRENT_PART_SEVEN[mock.id];
  const sourceSections = currentPartSeven
    ? mock.sections.map((section) => section.part === 7 ? currentPartSeven : section)
    : mock.sections;
  const sections = sourceSections
    .map((section) => {
      const officialPart = section.sectionStyle
        ? OFFICIAL_PART_BY_STYLE[section.sectionStyle]
        : undefined;

      if (!officialPart) return section;

      return {
        ...section,
        part: officialPart,
        title: OFFICIAL_TITLE[officialPart],
        instructions: remapInstruction(section.instructions, officialPart),
        questions: section.questions.map((question) => remapQuestion(question, officialPart)),
      };
    })
    .sort((left, right) => left.part - right.part);

  return {
    ...mock,
    subtitle: 'Práctica propia abreviada · 45 preguntas · 60 minutos',
    sections,
  };
}
