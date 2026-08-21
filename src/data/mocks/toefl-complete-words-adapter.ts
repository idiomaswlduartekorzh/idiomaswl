import type { WordCompleteQuestion } from './types';

interface CompleteWordsPublicObject {
  id: string;
  objectId: string;
  version: number;
  instructions: string;
  template: string;
  blanks: readonly {
    id: string;
    num: number;
    prefix: string;
    missingLength: number;
  }[];
}

export function toToeflCompleteWordsQuestion(
  object: CompleteWordsPublicObject,
  part: number,
): WordCompleteQuestion {
  return {
    type: 'wordcomplete',
    id: object.id,
    part,
    qRange: [1, 10],
    objectId: object.objectId,
    contentVersion: String(object.version),
    serverScoring: 'toefl-complete-words',
    alignment: 'official-family-pilot',
    instructions: object.instructions,
    template: object.template,
    blanks: object.blanks.map((blank) => ({ ...blank })),
  };
}
