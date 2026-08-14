export const TOEFL_FIXED_LISTENING_VERSION = '2026-08-14.fixed-v1';
export const TOEFL_FIXED_LISTENING_DISCLOSURE =
  'Práctica fija WeLearn basada en la composición publicada del TOEFL iBT 2026. No es adaptativa, no replica el banco ETS y no produce una puntuación oficial.';

export function legacyFixedListeningItemId(legacyId: string) {
  return `item:${legacyId}-fixed-v1`;
}

export function fixedListeningOptionId(itemId: string, optionIndex: number) {
  return `${itemId}:option-${String.fromCharCode(97 + optionIndex)}`;
}

export type ToeflListeningTask = 'choose-response' | 'conversation' | 'announcement' | 'academic-talk';
export type ToeflListeningVoiceRole = 'woman' | 'man' | 'student' | 'professor' | 'announcer' | 'narrator';

export interface ToeflFixedListeningOption {
  id: string;
  label: string;
  text: string;
}

export interface ToeflFixedListeningItem {
  type: 'single-select';
  id: string;
  legacyId: string;
  contentVersion: typeof TOEFL_FIXED_LISTENING_VERSION;
  prompt: string;
  alignment: 'official-family-pilot';
  options: readonly ToeflFixedListeningOption[];
}

export interface ToeflPlannedListeningAudio {
  mediaId: string;
  plannedAudioUrl: string;
  mediaStatus: 'script-ready-audio-blocked';
  script: string;
  voiceRoles: readonly ToeflListeningVoiceRole[];
}

export interface ToeflFixedListeningChoose extends ToeflPlannedListeningAudio {
  task: 'choose-response';
  item: ToeflFixedListeningItem;
}

export interface ToeflFixedListeningLongStimulus extends ToeflPlannedListeningAudio {
  task: 'conversation' | 'announcement' | 'academic-talk';
  title: string;
  instructions: string;
  items: readonly ToeflFixedListeningItem[];
}

export interface ToeflFixedListeningExpansionSet {
  setNumber: number;
  scoringObjectId: string;
  module1ChooseAdditions: readonly ToeflFixedListeningChoose[];
  module2: {
    choose: readonly ToeflFixedListeningChoose[];
    conversation: ToeflFixedListeningLongStimulus;
    announcement: ToeflFixedListeningLongStimulus;
    academic: ToeflFixedListeningLongStimulus;
  };
}

export function fixedListeningItem(
  setNumber: number,
  code: string,
  prompt: string,
  options: readonly string[],
): ToeflFixedListeningItem {
  const id = `item:t${setNumber}-l-${code}-v1`;
  return {
    type: 'single-select',
    id,
    legacyId: `t${setNumber}-l-${code}`,
    contentVersion: TOEFL_FIXED_LISTENING_VERSION,
    prompt,
    alignment: 'official-family-pilot',
    options: options.map((text, index) => {
      const label = String.fromCharCode(65 + index);
      return { id: fixedListeningOptionId(id, index), label, text };
    }),
  };
}

export function fixedListeningChoose(
  setNumber: number,
  moduleCode: 'm1' | 'm2',
  itemNumber: number,
  voiceRole: 'woman' | 'man',
  script: string,
  options: readonly string[],
): ToeflFixedListeningChoose {
  const code = `${moduleCode}-cr${itemNumber}`;
  return {
    task: 'choose-response',
    mediaId: `media:toefl:set-${setNumber}:listening-${moduleCode}-choose-${itemNumber}`,
    plannedAudioUrl: `/audio/toefl/set-${setNumber}/listening-${moduleCode}-choose-${itemNumber}.mp3`,
    mediaStatus: 'script-ready-audio-blocked',
    script,
    voiceRoles: [voiceRole],
    item: fixedListeningItem(
      setNumber,
      code,
      'Choose the best response to what you heard.',
      options,
    ),
  };
}

export function fixedListeningStimulus(
  setNumber: number,
  code: 'm2-conversation' | 'm2-announcement' | 'm2-academic-talk',
  task: ToeflFixedListeningLongStimulus['task'],
  title: string,
  instructions: string,
  script: string,
  voiceRoles: readonly ToeflListeningVoiceRole[],
  items: readonly ToeflFixedListeningItem[],
): ToeflFixedListeningLongStimulus {
  return {
    task,
    title,
    instructions,
    mediaId: `media:toefl:set-${setNumber}:listening-${code}`,
    plannedAudioUrl: `/audio/toefl/set-${setNumber}/listening-${code}.mp3`,
    mediaStatus: 'script-ready-audio-blocked',
    script,
    voiceRoles,
    items,
  };
}

export function fixedListeningSet(
  setNumber: number,
  content: Omit<ToeflFixedListeningExpansionSet, 'setNumber' | 'scoringObjectId'>,
): ToeflFixedListeningExpansionSet {
  return {
    setNumber,
    scoringObjectId: `object:toefl-listening-set${setNumber}-v1`,
    ...content,
  };
}
