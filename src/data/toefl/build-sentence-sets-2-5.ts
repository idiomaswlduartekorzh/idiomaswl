import type { ToeflBuildSentenceItem } from './build-sentence-set-1';

export type PublicDefinition = readonly [
  context: string,
  replyPrefix: string,
  replySuffix: string,
  shuffledTiles: readonly [string, string, string, string, string],
];

export interface ToeflBuildSentencePublicObject {
  id: string;
  objectId: string;
  contentVersion: string;
  interactionDisclosure: string;
  items: ToeflBuildSentenceItem[];
}

const CONTENT_VERSION = '2026-08-14.w4';
const INTERACTION_DISCLOSURE = 'ETS usa movimiento de fragmentos. Esta práctica ofrece botones equivalentes para que también sea operable con teclado, tacto y lector de pantalla.';

export function createPublicSet(
  setNumber: number,
  definitions: readonly PublicDefinition[],
  contentVersion = CONTENT_VERSION,
): ToeflBuildSentencePublicObject {
  const id = `toefl-build-sentence-set${setNumber}-v2`;
  return {
    id,
    objectId: `object:${id}`,
    contentVersion,
    interactionDisclosure: INTERACTION_DISCLOSURE,
    items: definitions.map(([context, replyPrefix, replySuffix, shuffledTiles], index) => {
      const number = index + 1;
      const itemId = `item:t${setNumber}-w-bs${number}-v2`;
      return {
        type: 'toefl-build-sentence',
        id: itemId,
        legacyId: number <= 6 ? `t${setNumber}-w-bs${number}` : undefined,
        contentVersion,
        context,
        replyPrefix,
        replySuffix,
        tiles: shuffledTiles.map((text, tileIndex) => ({
          id: `${itemId}:tile-${tileIndex + 1}`,
          text,
        })),
        blankCount: 4,
        alignment: 'official-family-pilot',
      };
    }),
  };
}

export const TOEFL_BUILD_SENTENCE_SET2_V2 = createPublicSet(2, [
  ['Where does Nora volunteer?', 'She', '.', ['local families', 'volunteers', 'volunteering', 'at a shelter', 'that supports']],
  ['The room feels warm. Can you help?', 'Could', '?', ['the window', 'opened', 'you', 'a little', 'open']],
  ['Was the advice useful?', 'The advice', '.', ['you gave me', 'helpful', 'that', 'were', 'was']],
  ['When should we leave for the station?', 'We', '.', ['were ready', 'when', 'is ready', 'will leave', 'the taxi']],
  ['How does this model compare with the old one?', 'This model', '.', ['than', 'is', 'the older one', 'lighter', 'are']],
  ['When did Maya hear the good news?', 'She', '.', ['she answered the phone', 'heard', 'hearing', 'the good news', 'when']],
  ['Can you meet the Friday deadline?', 'I', '.', ['before', 'finishing', 'will finish', 'Friday', 'the report']],
  ['Why could you not buy the novel?', 'The book', '.', ['you recommended', 'sold out', 'that', 'were', 'was']],
  ['Why did the committee change the meeting time?', 'They', '.', ['although', 'the meeting', 'the room was unavailable', 'moved', 'because']],
  ['Why was the package late?', 'The package', '.', ['if', 'would have arrived', 'the address had been correct', 'on time', 'unless']],
]);

export const TOEFL_BUILD_SENTENCE_SET3_V2 = createPublicSet(3, [
  ['What are you doing for the new students?', 'We', '.', ['that welcomes', 'are hosting', 'new students', 'a dinner', 'hosted']],
  ['I left my key inside. Can you help?', 'Could', '?', ['for me', 'you', 'unlocked', 'unlock', 'the door']],
  ['Did the suggested route save time?', 'The route', '.', ['was', 'were', 'that', 'much faster', 'you suggested']],
  ['When are you planning to leave?', 'We', '.', ['when', 'stops', 'will go home', 'stopping', 'the music']],
  ['How does your new job compare?', 'This job', '.', ['are', 'harder', 'my last one', 'is', 'than']],
  ['What did Omar do after reading the letter?', 'He', '.', ['after', 'reached for', 'he read the letter', 'the phone', 'reaching']],
  ['What did the administrator say about your certificate?', 'The administrator', '.', ['would arrive soon', 'said', 'saying', 'that', 'my certificate']],
  ['Why did you apply for the lab position?', 'I', '.', ['even though', 'because of', 'decided', 'I lacked experience', 'to apply']],
  ['Who tends to improve most quickly?', 'Students', '.', ['attend regularly', 'more likely to improve', 'who', 'is', 'are']],
  ['Could the project have succeeded without cooperation?', 'It', '.', ['unless', 'if', 'had not cooperated', 'would have failed', 'the team']],
]);

export const TOEFL_BUILD_SENTENCE_SET4_V2 = createPublicSet(4, [
  ['What is the club launching?', 'They', '.', ['launched', 'a new website', 'club members', 'are launching', 'that will serve']],
  ['Where should I add my signature?', 'Could', '?', ['the form', 'you', 'at the bottom', 'sign', 'signed']],
  ['What did you think of the guest lecture?', 'The talk', '.', ['inspiring', 'that', 'were', 'she gave', 'was']],
  ['When will the program begin?', 'We', '.', ['the guest', 'arriving', 'will begin', 'arrives', 'when']],
  ['Is the new method difficult?', 'This method', '.', ['simpler', 'the old one', 'is', 'are', 'than']],
  ['What did Lina do after the meeting?', 'She', '.', ['sending', 'a message', 'she left the meeting', 'sent', 'after']],
  ['Where may visitors park?', 'You', '.', ['unless', 'can park', 'it is full', 'in the east lot', 'although']],
  ['Why is the application still open?', 'The committee', '.', ['many students requested it', 'extended', 'extending', 'the deadline', 'because']],
  ['Which study habit tends to help?', 'Students', '.', ['tend', 'tends', 'who', 'to remember more', 'review a little each day']],
  ['Why did you confirm the reservation?', 'It', '.', ['if', 'had not confirmed it', 'would have been canceled', 'unless', 'we']],
]);

export const TOEFL_BUILD_SENTENCE_SET5_V2 = createPublicSet(5, [
  ['How long has Elena lived in Madrid?', 'She', '.', ['in Madrid', 'five years', 'has lived', 'living', 'for']],
  ['What should I do before the meeting?', 'Please', '.', ['sending', 'the report', 'the meeting', 'send me', 'before']],
  ['Which book did you mean?', 'This', '.', ['that', 'is', 'I recommended', 'the book', 'are']],
  ['Can we still catch the train?', 'We', '.', ['we leave now', 'can catch', 'unless', 'the train', 'if']],
  ['Was the museum quiet?', 'The museum', '.', ['than', 'were', 'was', 'we had expected', 'more crowded']],
  ['What did Ana do after completing her degree?', 'She', '.', ['a job abroad', 'finishing her degree', 'found', 'finding', 'after']],
  ['Why did you contact the workshop coordinator?', 'I', '.', ['although', 'to transfer', 'a family event came up', 'asked', 'because']],
  ['Was the workshop leader effective?', 'The instructor', '.', ['was', 'who', 'very helpful', 'led the workshop', 'were']],
  ['Who usually leaves campus earlier?', 'Students', '.', ['leave earlier', 'who', 'lives', 'live off campus', 'often']],
  ['What happens if the coordinator accepts the request?', 'The payment', '.', ['the coordinator', 'unless', 'would be transferred', 'approved my request', 'if']],
]);
