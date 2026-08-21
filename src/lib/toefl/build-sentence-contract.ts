export type ToeflBuildSentenceOutcomeStatus = 'not_presented' | 'unanswered' | 'scored' | 'invalidated';

export interface ToeflBuildSentenceScoringItem {
  itemId: string;
  tileIds: string[];
  expectedTileCount: number;
  acceptedOrders: string[][];
  maxRawPoints: 1;
}

export interface ToeflBuildSentenceScoreInput {
  attemptId: string;
  closeId: string;
  responses: Record<string, string[] | null | undefined>;
  presentedItemIds: string[];
}

export interface ToeflBuildSentenceOutcome {
  itemId: string;
  status: ToeflBuildSentenceOutcomeStatus;
  selectedTileIds: string[];
  rawPoints?: 0 | 1;
  maxRawPoints?: 1;
  reasonCode?: 'not_presented' | 'unanswered' | 'incomplete_order' | 'invalid_configuration' | 'invalid_tile' | 'duplicate_tile';
}

export interface ToeflBuildSentenceScoreResult {
  scoringVersion: string;
  attemptId: string;
  closeId: string;
  sourceItems: number;
  reportedItems: number;
  correct: number;
  denominator: number;
  outcomes: ToeflBuildSentenceOutcome[];
  disclosure: string;
}

function hasDuplicates(values: string[]) {
  return new Set(values).size !== values.length;
}

function sameOrder(left: string[], right: string[]) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function configurationIsValid(item: ToeflBuildSentenceScoringItem) {
  return Boolean(
    item.itemId
      && !hasDuplicates(item.tileIds)
      && item.expectedTileCount >= 1
      && item.expectedTileCount < item.tileIds.length
      && item.acceptedOrders.length >= 1
      && item.acceptedOrders.every((order) => order.length === item.expectedTileCount
        && !hasDuplicates(order)
        && order.every((tileId) => item.tileIds.includes(tileId))),
  );
}

export function scoreToeflBuildSentenceAttempt(
  config: {
    scoringVersion: string;
    disclosure: string;
    items: ToeflBuildSentenceScoringItem[];
  },
  input: ToeflBuildSentenceScoreInput,
): ToeflBuildSentenceScoreResult {
  const presented = new Set(input.presentedItemIds);
  const outcomes = config.items.map<ToeflBuildSentenceOutcome>((item) => {
    if (!configurationIsValid(item)) {
      return { itemId: item.itemId, status: 'invalidated', selectedTileIds: [], reasonCode: 'invalid_configuration' };
    }
    if (!presented.has(item.itemId)) {
      return { itemId: item.itemId, status: 'not_presented', selectedTileIds: [], reasonCode: 'not_presented' };
    }

    const raw = input.responses[item.itemId];
    const selected = Array.isArray(raw) ? raw.filter((value): value is string => typeof value === 'string' && Boolean(value)) : [];
    if (hasDuplicates(selected)) {
      return { itemId: item.itemId, status: 'invalidated', selectedTileIds: selected, reasonCode: 'duplicate_tile' };
    }
    if (selected.some((tileId) => !item.tileIds.includes(tileId))) {
      return { itemId: item.itemId, status: 'invalidated', selectedTileIds: selected, reasonCode: 'invalid_tile' };
    }
    if (selected.length === 0) {
      return { itemId: item.itemId, status: 'unanswered', selectedTileIds: [], rawPoints: 0, maxRawPoints: 1, reasonCode: 'unanswered' };
    }
    if (selected.length !== item.expectedTileCount) {
      return { itemId: item.itemId, status: 'unanswered', selectedTileIds: selected, rawPoints: 0, maxRawPoints: 1, reasonCode: 'incomplete_order' };
    }
    const correct = item.acceptedOrders.some((accepted) => sameOrder(selected, accepted));
    return { itemId: item.itemId, status: 'scored', selectedTileIds: selected, rawPoints: correct ? 1 : 0, maxRawPoints: 1 };
  });

  return {
    scoringVersion: config.scoringVersion,
    attemptId: input.attemptId,
    closeId: input.closeId,
    sourceItems: config.items.length,
    reportedItems: outcomes.filter((outcome) => outcome.status !== 'not_presented').length,
    correct: outcomes.reduce((sum, outcome) => sum + (outcome.rawPoints ?? 0), 0),
    denominator: outcomes.filter((outcome) => outcome.maxRawPoints === 1).length,
    outcomes,
    disclosure: config.disclosure,
  };
}
