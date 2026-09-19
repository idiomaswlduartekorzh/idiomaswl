export const ICFES_EXAM_SLUG = 'icfes' as const;
export const ICFES_COMMERCIAL_VERSION = 'icfes-2026-09-12-v2' as const;
export const ICFES_AVAILABLE_MOCK_COUNT = 20 as const;
export const ICFES_DRAFT_BANK_MOCK_COUNT = 23 as const;

export const ICFES_PERSONALIZED_FEEDBACK_BENEFIT =
  'Feedback pedagógico personalizado de WeLearn, generado automáticamente a partir de tus resultados' as const;

export type IcfesCommercialOfferId = 'exam-single' | 'exam-auto' | 'exam-teacher';
export type IcfesCommercialProductCode =
  | 'icfes-single-report-v1'
  | 'icfes-membership-v1'
  | 'icfes-intensive-v1';

export type IcfesCommercialEntitlement =
  | 'detailed-report'
  | 'question-review'
  | 'focus-areas'
  | 'unlimited-mocks'
  | 'progress-history'
  | 'study-route'
  | 'personalized-feedback';

export type IcfesCommercialOffer = Readonly<{
  id: IcfesCommercialOfferId;
  productCode: IcfesCommercialProductCode;
  name: string;
  amountInCents: number;
  currency: 'COP';
  billing: 'single-exam' | 'recurring-30-days';
  entitlementScope: 'attempt' | 'exam';
  entitlements: readonly IcfesCommercialEntitlement[];
  benefits: readonly string[];
}>;

const ATTEMPT_ENTITLEMENTS = [
  'detailed-report',
  'question-review',
  'focus-areas',
] as const satisfies readonly IcfesCommercialEntitlement[];

const MEMBERSHIP_ENTITLEMENTS = [
  ...ATTEMPT_ENTITLEMENTS,
  'unlimited-mocks',
  'progress-history',
  'study-route',
] as const satisfies readonly IcfesCommercialEntitlement[];

export const ICFES_COMMERCIAL_OFFERS = Object.freeze([
  {
    id: 'exam-single',
    productCode: 'icfes-single-report-v1',
    name: 'Informe de un intento',
    amountInCents: 1_290_000,
    currency: 'COP',
    billing: 'single-exam',
    entitlementScope: 'attempt',
    entitlements: ATTEMPT_ENTITLEMENTS,
    benefits: [
      'Detalle pregunta por pregunta del intento terminado',
      'Tu respuesta frente a la respuesta correcta',
      'Explicaciones disponibles y áreas prioritarias',
    ],
  },
  {
    id: 'exam-auto',
    productCode: 'icfes-membership-v1',
    name: 'Membresía ICFES',
    amountInCents: 4_990_000,
    currency: 'COP',
    billing: 'recurring-30-days',
    entitlementScope: 'exam',
    entitlements: MEMBERSHIP_ENTITLEMENTS,
    benefits: [
      'Simulacros propios disponibles durante cada periodo',
      'Informes detallados e historial de progreso',
      'Ruta de estudio basada en tus resultados',
    ],
  },
  {
    // The persisted identifier is kept for compatibility with the deployed
    // Xpress schema. For ICFES it never represents a teacher or human queue.
    id: 'exam-teacher',
    productCode: 'icfes-intensive-v1',
    name: 'Membresía ICFES Intensiva',
    amountInCents: 9_990_000,
    currency: 'COP',
    billing: 'recurring-30-days',
    entitlementScope: 'exam',
    entitlements: [...MEMBERSHIP_ENTITLEMENTS, 'personalized-feedback'],
    benefits: [
      'Todo lo incluido en la Membresía ICFES',
      ICFES_PERSONALIZED_FEEDBACK_BENEFIT,
      'Acciones y meta verificable para el siguiente simulacro',
    ],
  },
] as const satisfies readonly IcfesCommercialOffer[]);

export function getIcfesCommercialOffer(id: IcfesCommercialOfferId): IcfesCommercialOffer {
  const offer = ICFES_COMMERCIAL_OFFERS.find((candidate) => candidate.id === id);
  if (!offer) throw new Error('unknown_icfes_offer');
  return offer;
}

export function icfesOfferIncludes(
  offerId: IcfesCommercialOfferId,
  entitlement: IcfesCommercialEntitlement,
): boolean {
  return getIcfesCommercialOffer(offerId).entitlements.includes(entitlement);
}

export function assertIcfesWompiEnvironment(environment: 'sandbox' | 'production'): void {
  const sandboxOnly = process.env.ICFES_WOMPI_SANDBOX_ONLY !== 'false';
  if (sandboxOnly && environment !== 'sandbox') throw new Error('icfes_wompi_sandbox_only');
}
