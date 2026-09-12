export const ICFES_ATTEMPT_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export type IcfesAnswerMap = Record<string, number>;

export interface IcfesBreakdownRow {
  key: string;
  label: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface IcfesBasicResultDto {
  attemptId: string;
  examId: string;
  correct: number;
  total: number;
  percentage: number;
  byPart: IcfesBreakdownRow[];
  bySkill: IcfesBreakdownRow[];
  recommendation: { label: string; href: string };
  officialResource: boolean;
  premiumEligible: boolean;
  premiumUnavailableReason?: string;
}

export const ICFES_PREMIUM_PERSISTENCE_UNAVAILABLE_REASON =
  'El resultado básico está disponible, pero el detalle premium no se habilitó porque no pudimos guardar este intento.';

/**
 * A correct basic score must survive an optional persistence outage, but an
 * unpersisted attempt can never be sold or presented as recoverable later.
 */
export function disableIcfesPremiumAfterPersistenceFailure(
  result: IcfesBasicResultDto,
): IcfesBasicResultDto {
  if (!result.premiumEligible) return result;
  return {
    ...result,
    premiumEligible: false,
    premiumUnavailableReason: ICFES_PREMIUM_PERSISTENCE_UNAVAILABLE_REASON,
  };
}

export type IcfesPaymentStatus = 'PENDING' | 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR';

export interface IcfesCheckoutDto {
  ok: true;
  paymentStatus: IcfesPaymentStatus;
  amountInCents: number;
  currency: 'COP';
  checkoutUrl: string | null;
  resultUrl: string;
}

export interface IcfesPremiumQuestionDto {
  id: string;
  number: number;
  part: number;
  prompt: string;
  selectedOption: string | null;
  correctOption: string;
  correct: boolean;
  rationale: string;
}

export interface IcfesPremiumDetailDto {
  ok: true;
  paymentStatus: IcfesPaymentStatus;
  amountInCents: number;
  currency: 'COP';
  productCode: 'icfes-detail-attempt-v1' | 'exam-auto' | 'exam-teacher';
  result: IcfesBasicResultDto | null;
  questions?: IcfesPremiumQuestionDto[];
  teacherReview?: {
    canRequest: boolean;
    status: string | null;
    requestedAt: string | null;
    dueAt: string | null;
    completedAt: string | null;
    result: import('./teacher-review-result').IcfesTeacherReviewResult | null;
  };
}

export function hasSensitiveResultFields(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false;
  if (Array.isArray(value)) return value.some(hasSensitiveResultFields);
  return Object.entries(value as Record<string, unknown>).some(([key, nested]) => {
    const normalized = key.toLowerCase();
    return normalized === 'answers'
      || normalized === 'answer'
      || normalized === 'correctanswer'
      || normalized === 'rationale'
      || normalized === 'explanation'
      || hasSensitiveResultFields(nested);
  });
}

export function validateIcfesAnswers(
  value: unknown,
  questions: ReadonlyArray<{ id: string; options: readonly unknown[] }>,
): IcfesAnswerMap | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const candidate = value as Record<string, unknown>;
  const ids = new Set(questions.map((question) => question.id));
  if (Object.keys(candidate).some((id) => !ids.has(id))) return null;

  const result: IcfesAnswerMap = {};
  for (const question of questions) {
    const selected = candidate[question.id];
    if (selected === undefined) continue;
    if (!Number.isSafeInteger(selected) || Number(selected) < 0 || Number(selected) >= question.options.length) {
      return null;
    }
    result[question.id] = Number(selected);
  }
  return result;
}
