export interface ToeflBuildSentenceTile {
  id: string;
  text: string;
}

export interface ToeflBuildSentenceItem {
  type: 'toefl-build-sentence';
  id: string;
  legacyId?: string;
  contentVersion: string;
  context: string;
  replyPrefix: string;
  replySuffix: string;
  tiles: ToeflBuildSentenceTile[];
  blankCount: number;
  alignment: 'official-family-pilot';
}

function tile(itemId: string, position: number, text: string): ToeflBuildSentenceTile {
  return { id: `${itemId}:tile-${position}`, text };
}

function item(
  number: number,
  input: Omit<ToeflBuildSentenceItem, 'type' | 'id' | 'contentVersion' | 'alignment' | 'tiles'> & {
    legacyId?: string;
    tiles: string[];
  },
): ToeflBuildSentenceItem {
  const id = `item:t1-w-bs${number}-v2`;
  return {
    type: 'toefl-build-sentence',
    id,
    contentVersion: '2026-08-14.v1',
    alignment: 'official-family-pilot',
    ...input,
    tiles: input.tiles.map((text, index) => tile(id, index + 1, text)),
  };
}

export const TOEFL_BUILD_SENTENCE_SET1: {
  id: string;
  objectId: string;
  contentVersion: string;
  scoringVersion: string;
  officialRegistryVersion: string;
  disclosure: string;
  interactionDisclosure: string;
  items: ToeflBuildSentenceItem[];
} = {
  id: 'toefl-build-sentence-set1-v2',
  objectId: 'object:toefl-build-sentence-set1-v2',
  contentVersion: '2026-08-14.v1',
  scoringVersion: 'toefl-build-sentence-local-exact@2026-08-14.v1',
  officialRegistryVersion: 'toefl-ibt-2026@2026-08-14.t16',
  disclosure:
    'Práctica fija WeLearn con 10 ítems originales de la familia Build a Sentence. La corrección es local y no equivale a una puntuación oficial de ETS.',
  interactionDisclosure:
    'ETS usa movimiento de fragmentos. Esta práctica ofrece botones equivalentes para que también sea operable con teclado, tacto y lector de pantalla.',
  items: [
    item(1, {
      legacyId: 't1-w-bs1',
      context: 'Where is Mia meeting us?',
      replyPrefix: 'She',
      replySuffix: '.',
      blankCount: 4,
      tiles: ['outside', 'is', 'are', 'the library', 'meeting us'],
    }),
    item(2, {
      legacyId: 't1-w-bs2',
      context: 'Do you know when the campus store closes?',
      replyPrefix: 'I',
      replySuffix: '.',
      blankCount: 4,
      tiles: ['at six', 'it', 'thinking', 'think', 'closes'],
    }),
    item(3, {
      legacyId: 't1-w-bs3',
      context: 'Why did Leo miss the workshop?',
      replyPrefix: 'He',
      replySuffix: '.',
      blankCount: 4,
      tiles: ['his train', 'missed it', 'although', 'was delayed', 'because'],
    }),
    item(4, {
      legacyId: 't1-w-bs4',
      context: 'Which tutor helped you with the application?',
      replyPrefix: 'The tutor',
      replySuffix: 'was very patient.',
      blankCount: 3,
      tiles: ['helped me', 'has', 'prepare the form', 'who'],
    }),
    item(5, {
      legacyId: 't1-w-bs5',
      context: 'Could you tell me where I can submit this form?',
      replyPrefix: 'You',
      replySuffix: '.',
      blankCount: 3,
      tiles: ['near the main entrance', 'submitted', 'can submit it', 'at the service desk'],
    }),
    item(6, {
      legacyId: 't1-w-bs6',
      context: 'Will the outdoor concert still happen?',
      replyPrefix: 'The organizers',
      replySuffix: '.',
      blankCount: 4,
      tiles: ['it rains', 'will move it', 'unless', 'if', 'indoors'],
    }),
    item(7, {
      context: 'Why was the lecture hall empty when you arrived?',
      replyPrefix: 'The event',
      replySuffix: '.',
      blankCount: 3,
      tiles: ['by the time', 'has', 'I got there', 'had already ended'],
    }),
    item(8, {
      context: 'What did the survey reveal about evening classes?',
      replyPrefix: 'Students',
      replySuffix: '.',
      blankCount: 4,
      tiles: ['more likely', 'who work during the day', 'is', 'to prefer them', 'are'],
    }),
    item(9, {
      context: 'Why did the committee postpone the vote?',
      replyPrefix: 'They',
      replySuffix: '.',
      blankCount: 4,
      tiles: ['the research team had submitted', 'the evidence', 'has', 'wanted to review', 'that'],
    }),
    item(10, {
      context: 'Would the project have succeeded without the extra funding?',
      replyPrefix: 'It',
      replySuffix: '.',
      blankCount: 4,
      tiles: ['the alumni association', 'would probably have failed', 'unless', 'had not contributed', 'if'],
    }),
  ],
};
