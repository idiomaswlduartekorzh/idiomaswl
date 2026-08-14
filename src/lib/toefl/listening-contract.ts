export type ToeflListeningOutcomeStatus = 'not_presented' | 'unanswered' | 'scored' | 'invalidated';

export interface ToeflListeningScoringItem {
  itemId: string;
  optionIds: string[];
  correctOptionId: string;
  maxRawPoints: 1;
}

export interface ToeflListeningScoreInput {
  attemptId: string;
  closeId: string;
  responses: Record<string, string | null | undefined>;
  presentedItemIds: string[];
}

export interface ToeflListeningOutcome {
  itemId: string;
  status: ToeflListeningOutcomeStatus;
  selectedOptionId?: string;
  correctOptionId?: string;
  rawPoints?: 0 | 1;
  maxRawPoints?: 1;
  reasonCode?: 'not_presented' | 'unanswered' | 'invalid_configuration' | 'invalid_option';
}

export interface ToeflListeningScoreResult {
  scoringVersion: string;
  attemptId: string;
  closeId: string;
  sourceItems: number;
  reportedItems: number;
  correct: number;
  denominator: number;
  outcomes: ToeflListeningOutcome[];
  disclosure: string;
}

function configurationIsValid(item: ToeflListeningScoringItem) {
  return Boolean(
    item.itemId
      && item.optionIds.length === 4
      && new Set(item.optionIds).size === item.optionIds.length
      && item.optionIds.includes(item.correctOptionId),
  );
}

export function scoreToeflListeningAttempt(
  config: {
    scoringVersion: string;
    disclosure: string;
    items: ToeflListeningScoringItem[];
  },
  input: ToeflListeningScoreInput,
): ToeflListeningScoreResult {
  const presented = new Set(input.presentedItemIds);
  const outcomes = config.items.map<ToeflListeningOutcome>((item) => {
    if (!configurationIsValid(item)) {
      return {
        itemId: item.itemId,
        status: 'invalidated',
        reasonCode: 'invalid_configuration',
      };
    }
    if (!presented.has(item.itemId)) {
      return {
        itemId: item.itemId,
        status: 'not_presented',
        reasonCode: 'not_presented',
      };
    }
    const selected = input.responses[item.itemId];
    if (!selected) {
      return {
        itemId: item.itemId,
        status: 'unanswered',
        correctOptionId: item.correctOptionId,
        rawPoints: 0,
        maxRawPoints: 1,
        reasonCode: 'unanswered',
      };
    }
    if (!item.optionIds.includes(selected)) {
      return {
        itemId: item.itemId,
        status: 'invalidated',
        selectedOptionId: selected,
        reasonCode: 'invalid_option',
      };
    }
    return {
      itemId: item.itemId,
      status: 'scored',
      selectedOptionId: selected,
      correctOptionId: item.correctOptionId,
      rawPoints: selected === item.correctOptionId ? 1 : 0,
      maxRawPoints: 1,
    };
  });

  return {
    scoringVersion: config.scoringVersion,
    attemptId: input.attemptId,
    closeId: input.closeId,
    sourceItems: config.items.length,
    reportedItems: outcomes.length,
    correct: outcomes.reduce((sum, outcome) => sum + (outcome.rawPoints ?? 0), 0),
    denominator: outcomes.filter((outcome) => outcome.maxRawPoints === 1).length,
    outcomes,
    disclosure: config.disclosure,
  };
}
