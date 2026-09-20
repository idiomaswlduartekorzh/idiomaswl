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

export interface IcfesFreeSummaryDto {
  attemptId: string;
  examId: string;
  correct: number;
  total: number;
  percentage: number;
  disclaimer: string;
  officialResource: boolean;
  premiumEligible: boolean;
}

export type IcfesOfferProductCode =
  | 'icfes-single-report-v1'
  | 'icfes-membership-v1'
  | 'icfes-intensive-v1';

export interface IcfesOfferProductDto {
  offerId: 'exam-single' | 'exam-auto' | 'exam-teacher';
  code: IcfesOfferProductCode;
  title: string;
  amountInCents: number;
  currency: 'COP';
  billingLabel: 'pago único' | 'renovable cada 30 días';
  benefits: readonly string[];
  checkoutEnabled: boolean;
}

export interface IcfesOfferCatalogDto {
  version: 'icfes-2026-09-12-v2';
  offers: readonly IcfesOfferProductDto[];
  checkoutMode: 'disabled' | 'sandbox' | 'production';
}

export interface IcfesGradeReceiptDto {
  ok: true;
  attemptId: string;
  examId: string;
  leadRequired: true;
  officialResource: boolean;
  premiumEligible: boolean;
}

export interface IcfesUnavailableCommerceGradeDto {
  ok: true;
  attemptId: string;
  examId: string;
  leadRequired: false;
  commerceAvailable: false;
  freeSummary: IcfesFreeSummaryDto;
}

export interface IcfesLeadAcceptedDto {
  ok: true;
  offer: IcfesOfferCatalogDto;
  premiumEligible: boolean;
  officialResource: boolean;
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

export interface IcfesPersonalizedFeedbackDto {
  version: 'icfes-personalized-feedback-v1';
  feedbackId: string;
  headline: string;
  executiveReading: string;
  strength: { label: string; evidence: string; action: string } | null;
  priority: { label: string; evidence: string; action: string } | null;
  nextMockGoal: string;
  sevenDayPlan: readonly { day: number; focus: string; task: string }[];
  traceability: {
    attemptId: string;
    examId: string;
    inputDigest: string;
    resultVersion: string;
    evidenceKeys: readonly string[];
  };
}

export interface IcfesPremiumDetailDto {
  ok: true;
  paymentStatus: IcfesPaymentStatus;
  amountInCents: number;
  currency: 'COP';
  productCode: IcfesOfferProductCode;
  result: IcfesBasicResultDto | null;
  questions?: IcfesPremiumQuestionDto[];
  personalizedFeedback?: IcfesPersonalizedFeedbackDto;
}

export function toIcfesFreeSummary(result: IcfesBasicResultDto): IcfesFreeSummaryDto {
  return {
    attemptId: result.attemptId,
    examId: result.examId,
    correct: result.correct,
    total: result.total,
    percentage: result.percentage,
    disclaimer: 'Resultado pedagógico no oficial; no predice el puntaje ICFES.',
    officialResource: result.officialResource,
    premiumEligible: result.premiumEligible,
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
