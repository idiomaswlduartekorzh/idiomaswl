import type { MockExam, MockSection, Question } from './types';
import { toToeflCompleteWordsQuestion } from './toefl-complete-words-adapter';
import { toToeflReadingQuestion } from './toefl-reading-adapter';
import { TOEFL_READING_MODULE2_SETS_1_TO_5 } from '@/data/toefl/reading-module2-sets-1-5';
import { TOEFL_READING_MODULE2_SETS_6_TO_10 } from '@/data/toefl/reading-module2-sets-6-10';
import { TOEFL_READING_MODULE2_SETS_11_TO_15 } from '@/data/toefl/reading-module2-sets-11-15';
import type { ToeflFixedReadingModule2Set } from '@/data/toefl/reading-module2-types';

const READING_MODULE2_BY_SET = Object.fromEntries(
  [
    ...TOEFL_READING_MODULE2_SETS_1_TO_5,
    ...TOEFL_READING_MODULE2_SETS_6_TO_10,
    ...TOEFL_READING_MODULE2_SETS_11_TO_15,
  ]
    .map((set) => [set.setNumber, set]),
) as Readonly<Record<number, ToeflFixedReadingModule2Set>>;

function renumberSections(sections: readonly MockSection[]): MockSection[] {
  return sections.map((section, index) => {
    const part = index + 1;
    return {
      ...section,
      part,
      questions: section.questions.map((question) => ({ ...question, part }) as Question),
    };
  });
}

function moduleOneReading(section: MockSection): MockSection {
  const questions = section.questions.filter((question) => {
    if (question.type === 'wordcomplete') {
      return question.serverScoring === 'toefl-complete-words';
    }
    if (question.type === 'toefl-reading-single' || question.type === 'toefl-reading-multi') {
      return question.alignment === 'official-family-pilot';
    }
    return true;
  });
  return {
    ...section,
    moduleId: 'reading-1',
    title: section.title.replace(/^Reading\s+[—-]\s+/, 'Reading Módulo 1 — '),
    sectionNote: section.title.includes('Academic')
      ? 'Cinco preguntas de selección única de la familia oficial. El ejercicio suplementario se conserva fuera de la sesión fija.'
      : section.sectionNote,
    questions,
  };
}

function moduleTwoReading(set: ToeflFixedReadingModule2Set): MockSection[] {
  return [
    {
      part: 0,
      skill: 'reading',
      moduleId: 'reading-2',
      title: 'Reading Módulo 2 — Complete the Words',
      instructions: set.completeWords.instructions,
      questions: [toToeflCompleteWordsQuestion(set.completeWords, 0)],
    },
    ...set.dailyLife.map<MockSection>((block) => ({
      part: 0,
      skill: 'reading',
      moduleId: 'reading-2',
      title: `Reading Módulo 2 — Read in Daily Life (${block.title})`,
      instructions: block.instructions,
      passage: block.text,
      passageTitle: block.title,
      questions: block.items.map((item) => toToeflReadingQuestion(set.readingObjectId, item, 0)),
    })),
    {
      part: 0,
      skill: 'reading',
      moduleId: 'reading-2',
      title: 'Reading Módulo 2 — Read an Academic Passage',
      instructions: set.academic.instructions,
      passage: set.academic.text,
      passageTitle: set.academic.title,
      questions: set.academic.items.map((item) => toToeflReadingQuestion(set.readingObjectId, item, 0)),
    },
  ];
}

/**
 * Adds the second published-practice Reading module without mutating the base
 * mock. Existing supplementary items remain in their source files for reuse.
 */
export function withToefl2026ReadingModule2(mock: MockExam): MockExam {
  const setNumber = Number(mock.id.replace(/^set-/, ''));
  const module2 = READING_MODULE2_BY_SET[setNumber];
  if (!module2) return mock;

  const reading = mock.sections.filter((section) => section.skill === 'reading').map(moduleOneReading);
  const remaining = mock.sections.filter((section) => section.skill !== 'reading');
  return {
    ...mock,
    sections: renumberSections([...reading, ...moduleTwoReading(module2), ...remaining]),
  };
}
