export type ToeflReadingResponseKind = 'selected_option_id' | 'selected_option_ids';
export type ToeflReadingOutcomeStatus = 'not_presented' | 'unanswered' | 'scored' | 'invalidated';

export interface ToeflReadingScoringItem {
  itemId: string;
  responseKind: ToeflReadingResponseKind;
  optionIds: string[];
  correctOptionIds: string[];
  selectCount: number;
  maxRawPoints: 1;
}

export interface ToeflReadingScoreInput {
  attemptId: string;
  closeId: string;
  responses: Record<string, string | string[] | null | undefined>;
  presentedItemIds: string[];
}

export interface ToeflReadingOutcome {
  itemId: string;
  responseKind: ToeflReadingResponseKind;
  status: ToeflReadingOutcomeStatus;
  selectedOptionIds: string[];
  correctOptionIds?: string[];
  rawPoints?: 0 | 1;
  maxRawPoints?: 1;
  reasonCode?: 'not_presented' | 'unanswered' | 'incomplete_selection' | 'invalid_configuration' | 'invalid_option';
}

export interface ToeflReadingScoreResult {
  scoringVersion: string;
  attemptId: string;
  closeId: string;
  sourceItems: number;
  reportedItems: number;
  correct: number;
  denominator: number;
  outcomes: ToeflReadingOutcome[];
  disclosure: string;
}

function unique(values: string[]) {
  return [...new Set(values)];
}

function sameSet(left: string[], right: string[]) {
  if (left.length !== right.length) return false;
  const rightSet = new Set(right);
  return left.every((value) => rightSet.has(value));
}

function configurationIsValid(item: ToeflReadingScoringItem) {
  const optionIds = unique(item.optionIds);
  const correctIds = unique(item.correctOptionIds);
  return Boolean(
    item.itemId
      && optionIds.length === item.optionIds.length
      && correctIds.length === item.correctOptionIds.length
      && item.selectCount >= 1
      && item.selectCount <= optionIds.length
      && correctIds.length === item.selectCount
      && correctIds.every((id) => optionIds.includes(id))
      && (item.responseKind === 'selected_option_id' ? item.selectCount === 1 : item.selectCount > 1),
  );
}

export function scoreToeflReadingAttempt(
  config: {
    scoringVersion: string;
    disclosure: string;
    items: ToeflReadingScoringItem[];
  },
  input: ToeflReadingScoreInput,
): ToeflReadingScoreResult {
  const presented = new Set(input.presentedItemIds);
  const outcomes = config.items.map<ToeflReadingOutcome>((item) => {
    if (!configurationIsValid(item)) {
      return {
        itemId: item.itemId,
        responseKind: item.responseKind,
        status: 'invalidated',
        selectedOptionIds: [],
        reasonCode: 'invalid_configuration',
      };
    }

    if (!presented.has(item.itemId)) {
      return {
        itemId: item.itemId,
        responseKind: item.responseKind,
        status: 'not_presented',
        selectedOptionIds: [],
        reasonCode: 'not_presented',
      };
    }

    const raw = input.responses[item.itemId];
    const selected = item.responseKind === 'selected_option_id'
      ? (typeof raw === 'string' && raw ? [raw] : [])
      : (Array.isArray(raw) ? unique(raw.filter((value): value is string => typeof value === 'string' && Boolean(value))) : []);

    if (selected.some((id) => !item.optionIds.includes(id))) {
      return {
        itemId: item.itemId,
        responseKind: item.responseKind,
        status: 'invalidated',
        selectedOptionIds: selected,
        reasonCode: 'invalid_option',
      };
    }

    if (selected.length === 0) {
      return {
        itemId: item.itemId,
        responseKind: item.responseKind,
        status: 'unanswered',
        selectedOptionIds: [],
        correctOptionIds: item.correctOptionIds,
        rawPoints: 0,
        maxRawPoints: 1,
        reasonCode: 'unanswered',
      };
    }

    if (selected.length !== item.selectCount) {
      return {
        itemId: item.itemId,
        responseKind: item.responseKind,
        status: 'unanswered',
        selectedOptionIds: selected,
        correctOptionIds: item.correctOptionIds,
        rawPoints: 0,
        maxRawPoints: 1,
        reasonCode: 'incomplete_selection',
      };
    }

    const isCorrect = sameSet(selected, item.correctOptionIds);
    return {
      itemId: item.itemId,
      responseKind: item.responseKind,
      status: 'scored',
      selectedOptionIds: selected,
      correctOptionIds: item.correctOptionIds,
      rawPoints: isCorrect ? 1 : 0,
      maxRawPoints: 1,
    };
  });

  return {
    scoringVersion: config.scoringVersion,
    attemptId: input.attemptId,
    closeId: input.closeId,
    sourceItems: config.items.length,
    reportedItems: outcomes.length,
    correct: outcomes.reduce((sum, item) => sum + (item.rawPoints ?? 0), 0),
    denominator: outcomes.filter((item) => item.maxRawPoints === 1).length,
    outcomes,
    disclosure: config.disclosure,
  };
}
