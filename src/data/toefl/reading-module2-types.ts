import type { ToeflReadingExpansionSingleItem } from './reading-sets-2-5.ts';

export const TOEFL_FIXED_READING_M2_VERSION = '2026-08-31.m2-v2';
export const TOEFL_FIXED_READING_DISCLOSURE =
  'Práctica fija WeLearn basada en la composición publicada del TOEFL iBT 2026. No es adaptativa, no replica el banco ETS y no produce una puntuación oficial.';

export interface ToeflFixedReadingPassage {
  id: string;
  title: string;
  instructions: string;
  text: string;
  items: readonly ToeflReadingExpansionSingleItem[];
}

export interface ToeflFixedReadingModule2Set {
  setNumber: number;
  readingObjectId: string;
  completeWords: {
    id: string;
    objectId: string;
    version: number;
    title: string;
    instructions: string;
    template: string;
    blanks: readonly {
      id: string;
      num: number;
      prefix: string;
      missingLength: number;
    }[];
  };
  dailyLife: readonly [ToeflFixedReadingPassage, ToeflFixedReadingPassage];
  academic: ToeflFixedReadingPassage;
}

export function fixedReadingItem(
  setNumber: number,
  code: string,
  prompt: string,
  options: readonly string[],
): ToeflReadingExpansionSingleItem {
  const id = `item:t${setNumber}-r-m2-${code}-v1`;
  return {
    type: 'single-select',
    id,
    legacyId: `t${setNumber}-r-m2-${code}`,
    contentVersion: TOEFL_FIXED_READING_M2_VERSION,
    prompt,
    alignment: 'official-family-pilot',
    options: options.map((text, index) => {
      const label = String.fromCharCode(65 + index);
      return { id: `${id}:option-${label.toLowerCase()}`, label, text };
    }),
  };
}

export function fixedCtwBlanks(
  setNumber: number,
  specs: readonly (readonly [prefix: string, missingLength: number])[],
) {
  return specs.map(([prefix, missingLength], index) => ({
    id: `item:t${setNumber}-r-m2-ctw-v1:blank-${String(index + 1).padStart(2, '0')}`,
    num: index + 1,
    prefix,
    missingLength,
  }));
}

export function fixedReadingModule2(
  setNumber: number,
  content: Omit<ToeflFixedReadingModule2Set, 'setNumber' | 'readingObjectId'>,
): ToeflFixedReadingModule2Set {
  return {
    setNumber,
    readingObjectId: `object:toefl-reading-set${setNumber}-v2`,
    ...content,
  };
}
