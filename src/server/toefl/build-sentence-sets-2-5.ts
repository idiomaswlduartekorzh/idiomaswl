import 'server-only';

import { TOEFL_BUILD_SENTENCE_SET1 } from '@/data/toefl/build-sentence-set-1';
import {
  TOEFL_BUILD_SENTENCE_SET2_V2,
  TOEFL_BUILD_SENTENCE_SET3_V2,
  TOEFL_BUILD_SENTENCE_SET4_V2,
  TOEFL_BUILD_SENTENCE_SET5_V2,
} from '@/data/toefl/build-sentence-sets-2-5';
import type { ToeflBuildSentencePublicObject } from '@/data/toefl/build-sentence-sets-2-5';
import { TOEFL_BUILD_SENTENCE_SET1_SCORING } from '@/server/toefl/build-sentence-set-1';
import type { ToeflBuildSentenceScoringItem } from '@/lib/toefl/build-sentence-contract';

export interface SourceDefinition {
  context: string;
  replyPrefix: string;
  replySuffix: string;
  parts: [string, string, string, string];
  distractor: string;
}

const PATTERNS = [
  [2, 4, 0, 3, 1],
  [4, 1, 3, 0, 2],
  [3, 0, 4, 1, 2],
  [1, 3, 0, 4, 2],
  [2, 0, 3, 1, 4],
] as const;

export function createScoring(
  setNumber: number,
  publicObject: ToeflBuildSentencePublicObject,
  definitions: readonly SourceDefinition[],
  contentVersion = '2026-08-14.w4',
) {
  if (publicObject.items.length !== definitions.length) {
    throw new Error(`Build a Sentence Set ${setNumber}: public/scoring item counts differ.`);
  }
  const scoringItems: ToeflBuildSentenceScoringItem[] = [];
  definitions.forEach((definition, index) => {
    const number = index + 1;
    const id = `item:t${setNumber}-w-bs${number}-v2`;
    const sourceTiles = [...definition.parts, definition.distractor];
    const pattern = PATTERNS[(setNumber * 2 + number * 3) % PATTERNS.length];
    const publicItem = publicObject.items[index];
    const expectedPublicTexts = pattern.map((sourceIndex) => sourceTiles[sourceIndex]);
    if (publicItem.id !== id || publicItem.tiles.map((tile) => tile.text).join('\u0000') !== expectedPublicTexts.join('\u0000')) {
      throw new Error(`Build a Sentence Set ${setNumber}, item ${number}: public tiles differ from the private canonical source.`);
    }
    const acceptedOrder = definition.parts.map((_, sourceIndex) => {
      const publicIndex = pattern.indexOf(sourceIndex as 0 | 1 | 2 | 3 | 4);
      return `${id}:tile-${publicIndex + 1}`;
    });
    scoringItems.push({
      itemId: id,
      tileIds: publicItem.tiles.map((tile) => tile.id),
      expectedTileCount: 4,
      acceptedOrders: [acceptedOrder],
      maxRawPoints: 1,
    });
  });
  return {
    scoringVersion: `toefl-build-sentence-local-exact-set${setNumber}@${contentVersion}`,
    disclosure: `Práctica fija WeLearn con 10 ítems originales de Build a Sentence para el Set ${setNumber}. La corrección local no equivale a una puntuación oficial de ETS.`,
    items: scoringItems,
  };
}

const SET2_SOURCES = [
  { context: 'Where does Nora volunteer?', replyPrefix: 'She', replySuffix: '.', parts: ['volunteers', 'at a shelter', 'that supports', 'local families'], distractor: 'volunteering' },
  { context: 'The room feels warm. Can you help?', replyPrefix: 'Could', replySuffix: '?', parts: ['you', 'open', 'the window', 'a little'], distractor: 'opened' },
  { context: 'Was the advice useful?', replyPrefix: 'The advice', replySuffix: '.', parts: ['that', 'you gave me', 'was', 'helpful'], distractor: 'were' },
  { context: 'When should we leave for the station?', replyPrefix: 'We', replySuffix: '.', parts: ['will leave', 'when', 'the taxi', 'is ready'], distractor: 'were ready' },
  { context: 'How does this model compare with the old one?', replyPrefix: 'This model', replySuffix: '.', parts: ['is', 'lighter', 'than', 'the older one'], distractor: 'are' },
  { context: 'When did Maya hear the good news?', replyPrefix: 'She', replySuffix: '.', parts: ['heard', 'the good news', 'when', 'she answered the phone'], distractor: 'hearing' },
  { context: 'Can you meet the Friday deadline?', replyPrefix: 'I', replySuffix: '.', parts: ['will finish', 'the report', 'before', 'Friday'], distractor: 'finishing' },
  { context: 'Why could you not buy the novel?', replyPrefix: 'The book', replySuffix: '.', parts: ['that', 'you recommended', 'was', 'sold out'], distractor: 'were' },
  { context: 'Why did the committee change the meeting time?', replyPrefix: 'They', replySuffix: '.', parts: ['moved', 'the meeting', 'because', 'the room was unavailable'], distractor: 'although' },
  { context: 'Why was the package late?', replyPrefix: 'The package', replySuffix: '.', parts: ['would have arrived', 'on time', 'if', 'the address had been correct'], distractor: 'unless' },
] satisfies readonly SourceDefinition[];

const SET3_SOURCES = [
  { context: 'What are you doing for the new students?', replyPrefix: 'We', replySuffix: '.', parts: ['are hosting', 'a dinner', 'that welcomes', 'new students'], distractor: 'hosted' },
  { context: 'I left my key inside. Can you help?', replyPrefix: 'Could', replySuffix: '?', parts: ['you', 'unlock', 'the door', 'for me'], distractor: 'unlocked' },
  { context: 'Did the suggested route save time?', replyPrefix: 'The route', replySuffix: '.', parts: ['that', 'you suggested', 'was', 'much faster'], distractor: 'were' },
  { context: 'When are you planning to leave?', replyPrefix: 'We', replySuffix: '.', parts: ['will go home', 'when', 'the music', 'stops'], distractor: 'stopping' },
  { context: 'How does your new job compare?', replyPrefix: 'This job', replySuffix: '.', parts: ['is', 'harder', 'than', 'my last one'], distractor: 'are' },
  { context: 'What did Omar do after reading the letter?', replyPrefix: 'He', replySuffix: '.', parts: ['reached for', 'the phone', 'after', 'he read the letter'], distractor: 'reaching' },
  { context: 'What did the administrator say about your certificate?', replyPrefix: 'The administrator', replySuffix: '.', parts: ['said', 'that', 'my certificate', 'would arrive soon'], distractor: 'saying' },
  { context: 'Why did you apply for the lab position?', replyPrefix: 'I', replySuffix: '.', parts: ['decided', 'to apply', 'even though', 'I lacked experience'], distractor: 'because of' },
  { context: 'Who tends to improve most quickly?', replyPrefix: 'Students', replySuffix: '.', parts: ['who', 'attend regularly', 'are', 'more likely to improve'], distractor: 'is' },
  { context: 'Could the project have succeeded without cooperation?', replyPrefix: 'It', replySuffix: '.', parts: ['would have failed', 'if', 'the team', 'had not cooperated'], distractor: 'unless' },
] satisfies readonly SourceDefinition[];

const SET4_SOURCES = [
  { context: 'What is the club launching?', replyPrefix: 'They', replySuffix: '.', parts: ['are launching', 'a new website', 'that will serve', 'club members'], distractor: 'launched' },
  { context: 'Where should I add my signature?', replyPrefix: 'Could', replySuffix: '?', parts: ['you', 'sign', 'the form', 'at the bottom'], distractor: 'signed' },
  { context: 'What did you think of the guest lecture?', replyPrefix: 'The talk', replySuffix: '.', parts: ['that', 'she gave', 'was', 'inspiring'], distractor: 'were' },
  { context: 'When will the program begin?', replyPrefix: 'We', replySuffix: '.', parts: ['will begin', 'when', 'the guest', 'arrives'], distractor: 'arriving' },
  { context: 'Is the new method difficult?', replyPrefix: 'This method', replySuffix: '.', parts: ['is', 'simpler', 'than', 'the old one'], distractor: 'are' },
  { context: 'What did Lina do after the meeting?', replyPrefix: 'She', replySuffix: '.', parts: ['sent', 'a message', 'after', 'she left the meeting'], distractor: 'sending' },
  { context: 'Where may visitors park?', replyPrefix: 'You', replySuffix: '.', parts: ['can park', 'in the east lot', 'unless', 'it is full'], distractor: 'although' },
  { context: 'Why is the application still open?', replyPrefix: 'The committee', replySuffix: '.', parts: ['extended', 'the deadline', 'because', 'many students requested it'], distractor: 'extending' },
  { context: 'Which study habit tends to help?', replyPrefix: 'Students', replySuffix: '.', parts: ['who', 'review a little each day', 'tend', 'to remember more'], distractor: 'tends' },
  { context: 'Why did you confirm the reservation?', replyPrefix: 'It', replySuffix: '.', parts: ['would have been canceled', 'if', 'we', 'had not confirmed it'], distractor: 'unless' },
] satisfies readonly SourceDefinition[];

const SET5_SOURCES = [
  { context: 'How long has Elena lived in Madrid?', replyPrefix: 'She', replySuffix: '.', parts: ['has lived', 'in Madrid', 'for', 'five years'], distractor: 'living' },
  { context: 'What should I do before the meeting?', replyPrefix: 'Please', replySuffix: '.', parts: ['send me', 'the report', 'before', 'the meeting'], distractor: 'sending' },
  { context: 'Which book did you mean?', replyPrefix: 'This', replySuffix: '.', parts: ['is', 'the book', 'that', 'I recommended'], distractor: 'are' },
  { context: 'Can we still catch the train?', replyPrefix: 'We', replySuffix: '.', parts: ['can catch', 'the train', 'if', 'we leave now'], distractor: 'unless' },
  { context: 'Was the museum quiet?', replyPrefix: 'The museum', replySuffix: '.', parts: ['was', 'more crowded', 'than', 'we had expected'], distractor: 'were' },
  { context: 'What did Ana do after completing her degree?', replyPrefix: 'She', replySuffix: '.', parts: ['found', 'a job abroad', 'after', 'finishing her degree'], distractor: 'finding' },
  { context: 'Why did you contact the workshop coordinator?', replyPrefix: 'I', replySuffix: '.', parts: ['asked', 'to transfer', 'because', 'a family event came up'], distractor: 'although' },
  { context: 'Was the workshop leader effective?', replyPrefix: 'The instructor', replySuffix: '.', parts: ['who', 'led the workshop', 'was', 'very helpful'], distractor: 'were' },
  { context: 'Who usually leaves campus earlier?', replyPrefix: 'Students', replySuffix: '.', parts: ['who', 'live off campus', 'often', 'leave earlier'], distractor: 'lives' },
  { context: 'What happens if the coordinator accepts the request?', replyPrefix: 'The payment', replySuffix: '.', parts: ['would be transferred', 'if', 'the coordinator', 'approved my request'], distractor: 'unless' },
] satisfies readonly SourceDefinition[];

const SET2_SCORING = createScoring(2, TOEFL_BUILD_SENTENCE_SET2_V2, SET2_SOURCES);
const SET3_SCORING = createScoring(3, TOEFL_BUILD_SENTENCE_SET3_V2, SET3_SOURCES);
const SET4_SCORING = createScoring(4, TOEFL_BUILD_SENTENCE_SET4_V2, SET4_SOURCES);
const SET5_SCORING = createScoring(5, TOEFL_BUILD_SENTENCE_SET5_V2, SET5_SOURCES);

export const TOEFL_BUILD_SENTENCE_SCORING_BY_OBJECT_ID = Object.fromEntries([
  [TOEFL_BUILD_SENTENCE_SET1.objectId, TOEFL_BUILD_SENTENCE_SET1_SCORING],
  [TOEFL_BUILD_SENTENCE_SET2_V2.objectId, SET2_SCORING],
  [TOEFL_BUILD_SENTENCE_SET3_V2.objectId, SET3_SCORING],
  [TOEFL_BUILD_SENTENCE_SET4_V2.objectId, SET4_SCORING],
  [TOEFL_BUILD_SENTENCE_SET5_V2.objectId, SET5_SCORING],
]) as Readonly<Record<string, {
  scoringVersion: string;
  disclosure: string;
  items: ToeflBuildSentenceScoringItem[];
}>>;

export const TOEFL_BUILD_SENTENCE_SETS_2_TO_5_LEGACY_SOURCES = [
  { set: 2, items: [
    { id: 't2-w-bs1', tiles: ['She', 'volunteers', 'at', 'a shelter', 'on weekends'], answer: ['She', 'volunteers', 'at', 'a shelter', 'on weekends'] },
    { id: 't2-w-bs2', tiles: ['the window', 'you', 'open', 'Could', 'a little'], answer: ['Could', 'you', 'open', 'the window', 'a little'] },
    { id: 't2-w-bs3', tiles: ['gave', 'The advice', 'you', 'me', 'was', 'helpful'], answer: ['The advice', 'you', 'gave', 'me', 'was', 'helpful'] },
    { id: 't2-w-bs4', tiles: ['ready,', 'is', 'When', "we'll", 'the taxi', 'leave'], answer: ['When', 'the taxi', 'is', 'ready,', "we'll", 'leave'] },
    { id: 't2-w-bs5', tiles: ['is', 'This model', 'the older one', 'than', 'lighter'], answer: ['This model', 'is', 'lighter', 'than', 'the older one'] },
    { id: 't2-w-bs6', tiles: ['the phone,', 'Answering', 'she', 'the good news', 'heard'], answer: ['Answering', 'the phone,', 'she', 'heard', 'the good news'] },
  ] },
  { set: 3, items: [
    { id: 't3-w-bs1', tiles: ['We', 'are', 'hosting', 'a dinner', 'on Saturday'], answer: ['We', 'are', 'hosting', 'a dinner', 'on Saturday'] },
    { id: 't3-w-bs2', tiles: ['the door', 'you', 'unlock', 'Could', 'for me'], answer: ['Could', 'you', 'unlock', 'the door', 'for me'] },
    { id: 't3-w-bs3', tiles: ['suggested', 'The route', 'you', 'was', 'much faster'], answer: ['The route', 'you', 'suggested', 'was', 'much faster'] },
    { id: 't3-w-bs4', tiles: ['stops,', 'the music', 'When', "we'll", 'go home'], answer: ['When', 'the music', 'stops,', "we'll", 'go home'] },
    { id: 't3-w-bs5', tiles: ['is', 'This job', 'my last one', 'than', 'harder'], answer: ['This job', 'is', 'harder', 'than', 'my last one'] },
    { id: 't3-w-bs6', tiles: ['the letter,', 'Reading', 'he', 'the phone', 'reached for'], answer: ['Reading', 'the letter,', 'he', 'reached for', 'the phone'] },
  ] },
  { set: 4, items: [
    { id: 't4-w-bs1', tiles: ['They', 'are', 'launching', 'a new website', 'next month'], answer: ['They', 'are', 'launching', 'a new website', 'next month'] },
    { id: 't4-w-bs2', tiles: ['the form', 'you', 'sign', 'Could', 'at the bottom'], answer: ['Could', 'you', 'sign', 'the form', 'at the bottom'] },
    { id: 't4-w-bs3', tiles: ['gave', 'The talk', 'she', 'was', 'inspiring'], answer: ['The talk', 'she', 'gave', 'was', 'inspiring'] },
    { id: 't4-w-bs4', tiles: ['arrives,', 'the guest', 'When', "we'll", 'begin'], answer: ['When', 'the guest', 'arrives,', "we'll", 'begin'] },
    { id: 't4-w-bs5', tiles: ['is', 'This method', 'the old one', 'than', 'simpler'], answer: ['This method', 'is', 'simpler', 'than', 'the old one'] },
    { id: 't4-w-bs6', tiles: ['the meeting,', 'Leaving', 'she', 'a message', 'sent'], answer: ['Leaving', 'the meeting,', 'she', 'sent', 'a message'] },
  ] },
  { set: 5, items: [
    { id: 't5-w-bs1', tiles: ['She', 'has', 'lived', 'in', 'Madrid', 'for', 'five years'], answer: ['She', 'has', 'lived', 'in', 'Madrid', 'for', 'five years'] },
    { id: 't5-w-bs2', tiles: ['the report', 'before', 'Please', 'the meeting', 'send', 'me'], answer: ['Please', 'send', 'me', 'the report', 'before', 'the meeting'] },
    { id: 't5-w-bs3', tiles: ['is', 'the book', 'that', 'I', 'This', 'recommended'], answer: ['This', 'is', 'the book', 'that', 'I', 'recommended'] },
    { id: 't5-w-bs4', tiles: ['we', 'If', 'leave', 'now,', 'catch', 'we can', 'the train'], answer: ['If', 'we', 'leave', 'now,', 'we can', 'catch', 'the train'] },
    { id: 't5-w-bs5', tiles: ['was', 'The museum', 'than', 'more crowded', 'expected', 'we had'], answer: ['The museum', 'was', 'more crowded', 'than', 'we had', 'expected'] },
    { id: 't5-w-bs6', tiles: ['finishing', 'she', 'After', 'her degree,', 'a job', 'found', 'abroad'], answer: ['After', 'finishing', 'her degree,', 'she', 'found', 'a job', 'abroad'] },
  ] },
] as const;
