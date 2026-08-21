import type { ToeflBuildSentenceItem } from '@/data/toefl/build-sentence-set-1';
import type { ToeflBuildSentenceQuestion } from './types';

export function toToeflBuildSentenceQuestion(
  objectId: string,
  item: ToeflBuildSentenceItem,
  part: number,
): ToeflBuildSentenceQuestion {
  return {
    type: 'toefl-build-sentence',
    id: item.id,
    sourceItemId: item.legacyId,
    objectId,
    contentVersion: item.contentVersion,
    serverScoring: 'toefl-build-sentence',
    alignment: item.alignment,
    part,
    context: item.context,
    replyPrefix: item.replyPrefix,
    replySuffix: item.replySuffix,
    tiles: item.tiles,
    blankCount: item.blankCount,
  };
}
