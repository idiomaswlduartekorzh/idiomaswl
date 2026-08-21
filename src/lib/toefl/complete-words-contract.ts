import type {
  CompleteWordsItemOutcome,
  CompleteWordsScoreResult,
} from '@/data/toefl/complete-the-words-set-1';

export interface CompleteWordsScoringBlank {
  id: string;
  num: number;
  prefix: string;
  missingLength: number;
  expectedMissing: string;
}

export interface CompleteWordsScoringRequest {
  objectId: string;
  attemptId: string;
  closeId: string;
  responses: Record<string, string>;
  presentedBlankIds: string[];
  technicalFailureIds?: string[];
  invalidatedBlankIds?: string[];
}

export type MissingLettersValidation =
  | { valid: true; normalized: string }
  | { valid: false; normalized: string; reason: 'characters' | 'length' };

export function validateMissingLetters(value: string, expectedLength: number): MissingLettersValidation {
  const normalized = value.normalize('NFC').trim().toLowerCase();
  if (!/^[a-z]*$/.test(normalized)) return { valid: false, normalized, reason: 'characters' };
  if (normalized.length !== expectedLength) return { valid: false, normalized, reason: 'length' };
  return { valid: true, normalized };
}

export function scoreCompleteWords(
  blanks: readonly CompleteWordsScoringBlank[],
  request: CompleteWordsScoringRequest,
): CompleteWordsScoreResult {
  const presented = new Set(request.presentedBlankIds);
  const technicalFailures = new Set(request.technicalFailureIds ?? []);
  const invalidated = new Set(request.invalidatedBlankIds ?? []);

  const outcomes: CompleteWordsItemOutcome[] = blanks.map((blank) => {
    if (
      !Number.isInteger(blank.missingLength)
      || blank.missingLength < 1
      || !/^[a-z]+$/.test(blank.expectedMissing)
      || blank.expectedMissing.length !== blank.missingLength
    ) {
      return {
        blankId: blank.id,
        num: blank.num,
        outcome: 'invalidated',
        score: 0,
        maxScore: 0,
        reason: 'configuration',
      };
    }
    if (!presented.has(blank.id)) {
      return { blankId: blank.id, num: blank.num, outcome: 'not_presented', score: 0, maxScore: 0 };
    }
    if (technicalFailures.has(blank.id)) {
      return { blankId: blank.id, num: blank.num, outcome: 'technical_failure', score: 0, maxScore: 0 };
    }
    if (invalidated.has(blank.id)) {
      return { blankId: blank.id, num: blank.num, outcome: 'invalidated', score: 0, maxScore: 0 };
    }

    const raw = request.responses[blank.id] ?? '';
    if (!raw.normalize('NFC').trim()) {
      return {
        blankId: blank.id,
        num: blank.num,
        outcome: 'unanswered',
        score: 0,
        maxScore: 1,
        expectedMissing: blank.expectedMissing,
        completedWord: `${blank.prefix}${blank.expectedMissing}`,
      };
    }

    const validation = validateMissingLetters(raw, blank.missingLength);
    if (!validation.valid) {
      return {
        blankId: blank.id,
        num: blank.num,
        outcome: 'invalid_input',
        score: 0,
        maxScore: 1,
        expectedMissing: blank.expectedMissing,
        completedWord: `${blank.prefix}${blank.expectedMissing}`,
        reason: validation.reason,
      };
    }

    const correct = validation.normalized === blank.expectedMissing;
    return {
      blankId: blank.id,
      num: blank.num,
      outcome: correct ? 'scored' : 'mismatch',
      score: correct ? 1 : 0,
      maxScore: 1,
      expectedMissing: blank.expectedMissing,
      completedWord: `${blank.prefix}${blank.expectedMissing}`,
    };
  });

  return {
    objectId: request.objectId,
    attemptId: request.attemptId,
    closeId: request.closeId,
    status: 'closed',
    correct: outcomes.reduce((sum, item) => sum + item.score, 0),
    denominator: outcomes.reduce((sum, item) => sum + item.maxScore, 0),
    presented: outcomes.filter((item) => item.outcome !== 'not_presented').length,
    outcomes,
    disclosure: 'Resultado local de práctica WeLearn. No es una puntuación oficial de ETS ni una equivalencia de escala TOEFL.',
  };
}
