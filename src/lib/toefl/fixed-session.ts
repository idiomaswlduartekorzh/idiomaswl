import type { MockExam, MockSection, Question } from '@/data/mocks/types';

export type ToeflFixedStageId =
  | 'reading-1'
  | 'reading-2'
  | 'listening-1'
  | 'listening-2'
  | 'writing-build'
  | 'writing-email'
  | 'writing-discussion'
  | 'speaking';

export type ToeflFixedTimingSource =
  | 'official-practice-clock'
  | 'official-task-clock'
  | 'welearn-derived-clock'
  | 'not-public-per-item';

export interface ToeflFixedStage {
  id: ToeflFixedStageId;
  label: string;
  skill: 'reading' | 'listening' | 'writing' | 'speaking';
  navigation: 'within-module' | 'forward-only';
  timeLimitSeconds?: number;
  timingSource: ToeflFixedTimingSource;
  timingDisclosure: string;
  sections: MockSection[];
}

export interface ToeflForwardItem {
  section: MockSection;
  question: Question;
  position: number;
  total: number;
}

function filteredSections(
  mock: MockExam,
  predicate: (section: MockSection) => boolean,
  questionPredicate?: (question: Question) => boolean,
): MockSection[] {
  return mock.sections
    .filter(predicate)
    .map((section) => questionPredicate
      ? { ...section, questions: section.questions.filter(questionPredicate) }
      : section)
    .filter((section) => section.questions.length > 0);
}

export function buildToeflFixedStages(mock: MockExam): ToeflFixedStage[] {
  const stages: ToeflFixedStage[] = [
    {
      id: 'reading-1',
      label: 'Reading · Módulo 1',
      skill: 'reading',
      navigation: 'within-module',
      timeLimitSeconds: 1260,
      timingSource: 'official-practice-clock',
      timingDisclosure: '21 minutos en la forma fija de práctica publicada por ETS.',
      sections: filteredSections(mock, (section) => section.moduleId === 'reading-1'),
    },
    {
      id: 'reading-2',
      label: 'Reading · Módulo 2',
      skill: 'reading',
      navigation: 'within-module',
      timeLimitSeconds: 540,
      timingSource: 'official-practice-clock',
      timingDisclosure: '9 minutos en la forma fija de práctica publicada por ETS.',
      sections: filteredSections(mock, (section) => section.moduleId === 'reading-2'),
    },
    {
      id: 'listening-1',
      label: 'Listening · Módulo 1',
      skill: 'listening',
      navigation: 'forward-only',
      timingSource: 'not-public-per-item',
      timingDisclosure: 'ETS no publica segundos exactos por pregunta; este preview no inventa un reloj por ítem.',
      sections: filteredSections(mock, (section) => section.moduleId === 'listening-1'),
    },
    {
      id: 'listening-2',
      label: 'Listening · Módulo 2',
      skill: 'listening',
      navigation: 'forward-only',
      timingSource: 'not-public-per-item',
      timingDisclosure: 'ETS no publica segundos exactos por pregunta; este preview no inventa un reloj por ítem.',
      sections: filteredSections(mock, (section) => section.moduleId === 'listening-2'),
    },
    {
      id: 'writing-build',
      label: 'Writing · Build a Sentence',
      skill: 'writing',
      navigation: 'within-module',
      timeLimitSeconds: 360,
      timingSource: 'welearn-derived-clock',
      timingDisclosure: '6 minutos derivados por WeLearn del total publicado; no se presenta como reloj oficial independiente.',
      sections: filteredSections(
        mock,
        (section) => section.skill === 'writing',
        (question) => question.type === 'sentencebuild' || question.type === 'toefl-build-sentence',
      ),
    },
    {
      id: 'writing-email',
      label: 'Writing · Write an Email',
      skill: 'writing',
      navigation: 'within-module',
      timeLimitSeconds: 420,
      timingSource: 'official-task-clock',
      timingDisclosure: '7 minutos publicados para Write an Email.',
      sections: filteredSections(
        mock,
        (section) => section.skill === 'writing',
        (question) => question.type === 'write' && question.taskNumber === 1,
      ).map((section) => ({
        ...section,
        sectionNote: 'Reloj de 7 minutos aplicado en esta sesión. El texto se guarda, pero permanece not_evaluated.',
      })),
    },
    {
      id: 'writing-discussion',
      label: 'Writing · Academic Discussion',
      skill: 'writing',
      navigation: 'within-module',
      timeLimitSeconds: 600,
      timingSource: 'official-task-clock',
      timingDisclosure: '10 minutos publicados para Write for an Academic Discussion.',
      sections: filteredSections(
        mock,
        (section) => section.skill === 'writing',
        (question) => question.type === 'write' && question.taskNumber === 2,
      ).map((section) => ({
        ...section,
        sectionNote: 'Reloj de 10 minutos aplicado en esta sesión. El texto se guarda, pero permanece not_evaluated.',
      })),
    },
    {
      id: 'speaking',
      label: 'Speaking',
      skill: 'speaking',
      navigation: 'forward-only',
      timingSource: 'not-public-per-item',
      timingDisclosure: 'Sin preparación. ETS publica una duración aproximada de sección, no segundos exactos por respuesta.',
      sections: filteredSections(mock, (section) => section.moduleId === 'speaking'),
    },
  ];

  return stages.filter((stage) => stage.sections.length > 0);
}

export function flattenForwardItems(stage: ToeflFixedStage): ToeflForwardItem[] {
  const entries = stage.sections.flatMap((section) => section.questions.map((question) => ({ section, question })));
  return entries.map((entry, index) => ({ ...entry, position: index + 1, total: entries.length }));
}

export function countStageInteractions(stage: ToeflFixedStage): number {
  return stage.sections.reduce((stageTotal, section) => stageTotal + section.questions.reduce((total, question) => {
    if (question.type === 'wordcomplete') return total + question.blanks.length;
    return total + 1;
  }, 0), 0);
}
