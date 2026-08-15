import type {
  MCQQuestion,
  MockExam,
  MockSection,
  Question,
  RepeatQuestion,
  SpeakQuestion,
  ToeflListeningSingleQuestion,
} from './types';
import { toToeflCompleteWordsQuestion } from './toefl-complete-words-adapter';
import { toToeflReadingQuestion } from './toefl-reading-adapter';
import { TOEFL_READING_MODULE2_SETS_1_TO_5 } from '@/data/toefl/reading-module2-sets-1-5';
import { TOEFL_READING_MODULE2_SETS_6_TO_10 } from '@/data/toefl/reading-module2-sets-6-10';
import { TOEFL_READING_MODULE2_SETS_11_TO_15 } from '@/data/toefl/reading-module2-sets-11-15';
import { TOEFL_READING_MODULE2_SETS_16_TO_20 } from '@/data/toefl/reading-module2-sets-16-20';
import type { ToeflFixedReadingModule2Set } from '@/data/toefl/reading-module2-types';
import {
  TOEFL_FIXED_LISTENING_BY_SET,
  TOEFL_RELEASED_FIXED_LISTENING_MEDIA_IDS,
} from '@/data/toefl/listening-fixed-registry';
import {
  TOEFL_FIXED_LISTENING_DISCLOSURE,
  TOEFL_FIXED_LISTENING_VERSION,
  fixedListeningOptionId,
  legacyFixedListeningItemId,
  type ToeflFixedListeningItem,
  type ToeflFixedListeningLongStimulus,
  type ToeflListeningTask,
} from '@/data/toefl/listening-fixed-types';
import {
  TOEFL_FIXED_REPEAT_BY_SET,
  TOEFL_RELEASED_FIXED_INTERVIEW_MEDIA_IDS,
  TOEFL_RELEASED_FIXED_REPEAT_MEDIA_IDS,
} from '@/data/toefl/speaking-fixed-repeat';

const READING_MODULE2_BY_SET = Object.fromEntries(
  [
    ...TOEFL_READING_MODULE2_SETS_1_TO_5,
    ...TOEFL_READING_MODULE2_SETS_6_TO_10,
    ...TOEFL_READING_MODULE2_SETS_11_TO_15,
    ...TOEFL_READING_MODULE2_SETS_16_TO_20,
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

function legacyListeningQuestions(section: MockSection) {
  return section.questions.filter((question): question is MCQQuestion =>
    question.type === 'mcq' || question.type === 'dialog');
}

function legacyListeningQuestion(
  question: MCQQuestion,
  objectId: string,
  task: ToeflListeningTask,
  part: number,
  mediaId: string,
): ToeflListeningSingleQuestion {
  const id = legacyFixedListeningItemId(question.id);
  return {
    type: 'toefl-listening-single',
    id,
    sourceItemId: question.id,
    objectId,
    contentVersion: TOEFL_FIXED_LISTENING_VERSION,
    serverScoring: 'toefl-listening',
    alignment: 'official-family-pilot',
    task,
    part,
    text: question.text,
    options: question.options.map((text, index) => ({
      id: fixedListeningOptionId(id, index),
      label: String.fromCharCode(65 + index),
      text,
    })),
    mediaId,
    mediaStatus: 'ready-existing',
    audioUrl: question.audioUrl,
  };
}

function expansionListeningQuestion(
  item: ToeflFixedListeningItem,
  objectId: string,
  task: ToeflListeningTask,
  part: number,
  mediaId: string,
  plannedAudioUrl: string,
): ToeflListeningSingleQuestion {
  const released = TOEFL_RELEASED_FIXED_LISTENING_MEDIA_IDS.has(mediaId);
  return {
    type: 'toefl-listening-single',
    id: item.id,
    sourceItemId: item.legacyId,
    objectId,
    contentVersion: item.contentVersion,
    serverScoring: 'toefl-listening',
    alignment: item.alignment,
    task,
    part,
    text: item.prompt,
    options: item.options.map((option) => ({ ...option })),
    mediaId,
    mediaStatus: released ? 'ready-existing' : 'script-ready-audio-blocked',
    audioUrl: released ? plannedAudioUrl : undefined,
  };
}

function newLongListeningSection(
  stimulus: ToeflFixedListeningLongStimulus,
  objectId: string,
  moduleId: 'listening-1' | 'listening-2',
): MockSection {
  const released = TOEFL_RELEASED_FIXED_LISTENING_MEDIA_IDS.has(stimulus.mediaId);
  return {
    part: 0,
    skill: 'listening',
    moduleId,
    title: `Listening Módulo 2 — ${stimulus.title}`,
    instructions: stimulus.instructions,
    sectionNote: released
      ? 'Audio aprobado e incorporado al lote fijo.'
      : 'Vista previa editorial: el guion está auditado, pero el MP3 sigue bloqueado hasta aprobación del owner.',
    audioUrl: released ? stimulus.plannedAudioUrl : undefined,
    mediaId: stimulus.mediaId,
    mediaStatus: released ? 'ready-existing' : 'script-ready-audio-blocked',
    questions: stimulus.items.map((item) => expansionListeningQuestion(
      item,
      objectId,
      stimulus.task,
      0,
      stimulus.mediaId,
      stimulus.plannedAudioUrl,
    )),
  };
}

function fixedListeningSections(mock: MockExam): MockSection[] | null {
  const setNumber = Number(mock.id.replace(/^set-/, ''));
  const expansion = TOEFL_FIXED_LISTENING_BY_SET[setNumber];
  const legacy = mock.sections.filter((section) => section.skill === 'listening');
  if (!expansion || legacy.length < 4) return null;

  const [chooseSection, conversationSection, announcementSection, academicSection] = legacy;
  const objectId = expansion.scoringObjectId;
  const existingChooseMedia = (question: MCQQuestion) =>
    `media:toefl:set-${setNumber}:listening-m1-${question.id}`;
  const conversationMediaId = `media:toefl:set-${setNumber}:listening-m1-conversation-existing`;
  const announcementMediaId = `media:toefl:set-${setNumber}:listening-m1-announcement-existing`;
  const academicMediaId = `media:toefl:set-${setNumber}:listening-m1-academic-talk-existing`;

  const module1Choose: MockSection = {
    part: 0,
    skill: 'listening',
    moduleId: 'listening-1',
    title: 'Listening Módulo 1 — Listen and Choose a Response',
    instructions: 'Listen to each short exchange once. Choose the best response.',
    sectionNote: 'Cinco MP3 existentes se conservan. Los tres guiones añadidos muestran su estado real hasta que el lote de audio sea aprobado.',
    questions: [
      ...legacyListeningQuestions(chooseSection).slice(0, 5).map((question) => legacyListeningQuestion(
        question,
        objectId,
        'choose-response',
        0,
        existingChooseMedia(question),
      )),
      ...expansion.module1ChooseAdditions.map((entry) => expansionListeningQuestion(
        entry.item,
        objectId,
        entry.task,
        0,
        entry.mediaId,
        entry.plannedAudioUrl,
      )),
    ],
  };

  const module1Conversation: MockSection = {
    part: 0,
    skill: 'listening',
    moduleId: 'listening-1',
    title: 'Listening Módulo 1 — Listen to Conversations',
    instructions: conversationSection.instructions,
    sectionNote: 'Se preserva el MP3 original con cuatro preguntas. La revisión auditiva posterior decidirá si admite dos cortes naturales de dos preguntas sin regenerarlo.',
    audioUrl: conversationSection.audioUrl,
    mediaId: conversationMediaId,
    mediaStatus: 'ready-existing',
    questions: legacyListeningQuestions(conversationSection).slice(0, 4).map((question) => legacyListeningQuestion(
      question,
      objectId,
      'conversation',
      0,
      conversationMediaId,
    )),
  };

  const module1Announcement: MockSection = {
    part: 0,
    skill: 'listening',
    moduleId: 'listening-1',
    title: 'Listening Módulo 1 — Listen to an Announcement',
    instructions: announcementSection.instructions,
    sectionNote: 'Las primeras dos preguntas entran en la forma fija; la tercera se conserva en la fuente como práctica suplementaria.',
    audioUrl: announcementSection.audioUrl,
    mediaId: announcementMediaId,
    mediaStatus: 'ready-existing',
    questions: legacyListeningQuestions(announcementSection).slice(0, 2).map((question) => legacyListeningQuestion(
      question,
      objectId,
      'announcement',
      0,
      announcementMediaId,
    )),
  };

  const module1Academic: MockSection = {
    part: 0,
    skill: 'listening',
    moduleId: 'listening-1',
    title: 'Listening Módulo 1 — Listen to an Academic Talk',
    instructions: academicSection.instructions,
    sectionNote: 'Las primeras cuatro preguntas entran en la forma fija; la quinta se conserva en la fuente como práctica suplementaria.',
    audioUrl: academicSection.audioUrl,
    mediaId: academicMediaId,
    mediaStatus: 'ready-existing',
    questions: legacyListeningQuestions(academicSection).slice(0, 4).map((question) => legacyListeningQuestion(
      question,
      objectId,
      'academic-talk',
      0,
      academicMediaId,
    )),
  };

  const module2Choose: MockSection = {
    part: 0,
    skill: 'listening',
    moduleId: 'listening-2',
    title: 'Listening Módulo 2 — Listen and Choose a Response',
    instructions: 'Listen to each short exchange once. Choose the best response.',
    sectionNote: 'Vista previa editorial: ocho guiones y preguntas listos; sus MP3 siguen bloqueados hasta aprobación del owner.',
    questions: expansion.module2.choose.map((entry) => expansionListeningQuestion(
      entry.item,
      objectId,
      entry.task,
      0,
      entry.mediaId,
      entry.plannedAudioUrl,
    )),
  };

  return [
    module1Choose,
    module1Conversation,
    module1Announcement,
    module1Academic,
    module2Choose,
    newLongListeningSection(expansion.module2.conversation, objectId, 'listening-2'),
    newLongListeningSection(expansion.module2.announcement, objectId, 'listening-2'),
    newLongListeningSection(expansion.module2.academic, objectId, 'listening-2'),
  ];
}

/**
 * Builds the fixed 18 + 16 Listening composition while preserving every source
 * item and existing MP3. Missing media remains explicitly blocked in preview.
 */
export function withToefl2026FixedListening(mock: MockExam): MockExam {
  const listening = fixedListeningSections(mock);
  if (!listening) return mock;
  const reading = mock.sections.filter((section) => section.skill === 'reading');
  const remaining = mock.sections.filter((section) => section.skill !== 'reading' && section.skill !== 'listening');
  return {
    ...mock,
    timeMinutes: 90,
    toefl2026Blueprint: {
      delivery: 'fixed-official-practice-shape',
      adaptive: false,
      disclosure: `${TOEFL_FIXED_LISTENING_DISCLOSURE} Reading y Listening usan una ruta fija declarada, no enrutamiento adaptativo.`,
      sourceAsOf: '2026-08-14',
      targetInteractions: { reading: 40, listening: 34, writing: 12, speaking: 11 },
      modules: [
        { id: 'reading-1', skill: 'reading', interactionCount: 20, timeLimitSeconds: 1260, navigation: 'within-module' },
        { id: 'reading-2', skill: 'reading', interactionCount: 20, timeLimitSeconds: 540, navigation: 'within-module' },
        { id: 'listening-1', skill: 'listening', interactionCount: 18, timeLimitSeconds: 1080, navigation: 'forward-only' },
        { id: 'listening-2', skill: 'listening', interactionCount: 16, timeLimitSeconds: 660, navigation: 'forward-only' },
        { id: 'writing', skill: 'writing', interactionCount: 12, timeLimitSeconds: 1380, navigation: 'within-module' },
        { id: 'speaking', skill: 'speaking', interactionCount: 11, timeLimitSeconds: 480, navigation: 'forward-only' },
      ],
    },
    sections: renumberSections([...reading, ...listening, ...remaining]),
  };
}

/** Adds Repeat items 6–7 without changing or overwriting the five existing MP3s. */
export function withToefl2026FixedSpeaking(mock: MockExam): MockExam {
  const setNumber = Number(mock.id.replace(/^set-/, ''));
  const additions = TOEFL_FIXED_REPEAT_BY_SET[setNumber];
  if (!additions || additions.length !== 2) return mock;

  const sections = mock.sections.map((section): MockSection => {
    if (section.skill !== 'speaking') return section;
    const repeats = section.questions.filter((question): question is RepeatQuestion => question.type === 'repeat');
    if (repeats.length === 0) {
      return {
        ...section,
        moduleId: 'speaking',
        sectionNote: 'Las cuatro preguntas forman Take an Interview. Sus guiones se conservan, pero los prompts de audio siguen bloqueados hasta aprobación del owner.',
        questions: section.questions.map((question): Question => {
          if (question.type !== 'speak') return question;
          const interview = question as SpeakQuestion;
          const mediaId = `media:toefl:set-${setNumber}:speaking-interview-${interview.partNumber}`;
          const released = TOEFL_RELEASED_FIXED_INTERVIEW_MEDIA_IDS.has(mediaId);
          return {
            ...interview,
            audioUrl: released ? `/audio/toefl/set-${setNumber}/interview-${interview.partNumber}.mp3` : undefined,
            mediaId,
            mediaStatus: released ? 'ready-existing' : 'script-ready-audio-blocked',
          };
        }),
      };
    }

    const existing = repeats.slice(0, 5).map<RepeatQuestion>((question) => ({
      ...question,
      mediaId: `media:toefl:set-${setNumber}:speaking-repeat-${question.itemNumber}-existing`,
      mediaStatus: 'ready-existing',
    }));
    const expanded = additions.map<RepeatQuestion>((entry) => {
      const released = TOEFL_RELEASED_FIXED_REPEAT_MEDIA_IDS.has(entry.mediaId);
      return {
        type: 'repeat',
        id: entry.id,
        part: section.part,
        itemNumber: entry.itemNumber,
        audioUrl: released ? entry.plannedAudioUrl : undefined,
        mediaId: entry.mediaId,
        mediaStatus: released ? 'ready-existing' : 'script-ready-audio-blocked',
        targetSentence: entry.targetSentence,
      };
    });
    return {
      ...section,
      moduleId: 'speaking',
      sectionNote: 'Siete Listen and Repeat forman la práctica fija. Los dos guiones añadidos permanecen bloqueados hasta que el owner apruebe y valide sus audios.',
      questions: [...existing, ...expanded],
    };
  });

  return { ...mock, sections: renumberSections(sections) };
}

export function withToefl2026FixedForm(mock: MockExam): MockExam {
  return withToefl2026FixedSpeaking(
    withToefl2026FixedListening(withToefl2026ReadingModule2(mock)),
  );
}
