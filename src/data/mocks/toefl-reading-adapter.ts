import type {
  ToeflReadingMultiQuestion,
  ToeflReadingSingleQuestion,
} from './types';
import type { ToeflReadingExpansionItem } from '@/data/toefl/reading-sets-2-5';

export function toToeflReadingQuestion(
  objectId: string,
  item: ToeflReadingExpansionItem,
  part: number,
): ToeflReadingSingleQuestion | ToeflReadingMultiQuestion {
  return item.type === 'single-select'
    ? {
      type: 'toefl-reading-single', id: item.id, sourceItemId: item.legacyId, objectId,
      contentVersion: item.contentVersion, serverScoring: 'toefl-reading', alignment: item.alignment,
      part, text: item.prompt, options: item.options,
    }
    : {
      type: 'toefl-reading-multi', id: item.id, sourceItemId: item.legacyId, objectId,
      contentVersion: item.contentVersion, serverScoring: 'toefl-reading', alignment: item.alignment,
      part, text: item.prompt, options: item.options, selectCount: item.selectCount,
    };
}
