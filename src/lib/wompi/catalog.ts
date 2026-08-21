export const WOMPI_CURRENCY = 'COP' as const;

export const WOMPI_LANGUAGE_LABELS = {
  ingles: 'Inglés',
  coreano: 'Coreano',
  frances: 'Francés',
  aleman: 'Alemán',
  italiano: 'Italiano',
  portugues: 'Portugués',
  japones: 'Japonés',
  ruso: 'Ruso',
} as const;

export type WompiLanguageSlug = keyof typeof WOMPI_LANGUAGE_LABELS;

export const WOMPI_PLANS = {
  autodidacta: {
    label: 'Autodidacta',
    monthlyAmountCop: 50_000,
  },
  preparacion: {
    label: 'Preparación',
    monthlyAmountCop: 180_000,
  },
  intensivo2: {
    label: 'Intensivo · 2 sesiones por semana',
    monthlyAmountCop: 280_000,
  },
  intensivo4: {
    label: 'Intensivo · 4 sesiones por semana',
    monthlyAmountCop: 480_000,
  },
} as const;

export type WompiPlanId = keyof typeof WOMPI_PLANS;
export type WompiBillingPeriod = 'monthly' | 'annual';

export type WompiCheckoutSelection = Readonly<{
  planId: WompiPlanId;
  language: WompiLanguageSlug;
  billingPeriod: WompiBillingPeriod;
}>;

export type WompiCheckoutDetails = WompiCheckoutSelection &
  Readonly<{
    planLabel: string;
    languageLabel: string;
    billingLabel: string;
    amountInCents: number;
    currency: typeof WOMPI_CURRENCY;
  }>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isWompiPlanId(value: unknown): value is WompiPlanId {
  return typeof value === 'string' && Object.hasOwn(WOMPI_PLANS, value);
}

export function isWompiLanguageSlug(value: unknown): value is WompiLanguageSlug {
  return typeof value === 'string' && Object.hasOwn(WOMPI_LANGUAGE_LABELS, value);
}

export function isWompiBillingPeriod(value: unknown): value is WompiBillingPeriod {
  return value === 'monthly' || value === 'annual';
}

export function parseWompiCheckoutSelection(value: unknown): WompiCheckoutSelection | null {
  if (!isRecord(value)) return null;

  const { planId, language, billingPeriod } = value;
  if (
    !isWompiPlanId(planId) ||
    !isWompiLanguageSlug(language) ||
    !isWompiBillingPeriod(billingPeriod)
  ) {
    return null;
  }

  return Object.freeze({ planId, language, billingPeriod });
}

export function getWompiCheckoutDetails(
  selection: WompiCheckoutSelection,
): WompiCheckoutDetails {
  const plan = WOMPI_PLANS[selection.planId];
  const amountCop =
    selection.billingPeriod === 'annual'
      ? plan.monthlyAmountCop * 10
      : plan.monthlyAmountCop;

  return Object.freeze({
    ...selection,
    planLabel: plan.label,
    languageLabel: WOMPI_LANGUAGE_LABELS[selection.language],
    billingLabel: selection.billingPeriod === 'annual' ? 'Plan anual' : 'Un mes',
    amountInCents: amountCop * 100,
    currency: WOMPI_CURRENCY,
  });
}
