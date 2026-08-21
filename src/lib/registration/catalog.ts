export const REGISTRATION_CURRENCY = 'COP' as const;

export type RegistrationAccountType = 'platform' | 'student';

type BaseProduct = Readonly<{
  label: string;
  eyebrow: string;
  description: string;
  accountType: RegistrationAccountType;
  amountCop: number;
  billingLabel: string;
  provisional: boolean;
}>;

type PlatformProduct = BaseProduct & Readonly<{
  accountType: 'platform';
  accessDays: number;
  hours: null;
  classesPerWeek: null;
}>;

type StudentProduct = BaseProduct & Readonly<{
  accountType: 'student';
  accessDays: null;
  hours: number;
  classesPerWeek: number;
}>;

export const REGISTRATION_PRODUCTS = {
  'platform-unlimited-30d': {
    label: 'Autodidacta ilimitado',
    eyebrow: 'Plataforma completa',
    description: 'Practica todos los idiomas y exámenes disponibles durante 30 días.',
    accountType: 'platform',
    amountCop: 49_900,
    billingLabel: 'Pago único por 30 días',
    provisional: true,
    accessDays: 30,
    hours: null,
    classesPerWeek: null,
  },
  'english-8h': {
    label: 'Curso de 8 horas',
    eyebrow: '1 clase semanal',
    description: 'Una clase de 2 horas cada semana durante 4 semanas.',
    accountType: 'student',
    amountCop: 320_000,
    billingLabel: 'Paquete de 4 semanas',
    provisional: false,
    accessDays: null,
    hours: 8,
    classesPerWeek: 1,
  },
  'english-16h': {
    label: 'Curso de 16 horas',
    eyebrow: '2 clases semanales',
    description: 'Dos clases de 2 horas cada semana durante 4 semanas.',
    accountType: 'student',
    amountCop: 580_000,
    billingLabel: 'Paquete de 4 semanas',
    provisional: false,
    accessDays: null,
    hours: 16,
    classesPerWeek: 2,
  },
  'english-24h': {
    label: 'Curso de 24 horas',
    eyebrow: '3 clases semanales',
    description: 'Tres clases de 2 horas cada semana durante 4 semanas.',
    accountType: 'student',
    amountCop: 820_000,
    billingLabel: 'Paquete de 4 semanas',
    provisional: false,
    accessDays: null,
    hours: 24,
    classesPerWeek: 3,
  },
  'english-32h': {
    label: 'Curso de 32 horas',
    eyebrow: '4 clases semanales',
    description: 'Cuatro clases de 2 horas cada semana durante 4 semanas.',
    accountType: 'student',
    amountCop: 1_040_000,
    billingLabel: 'Paquete de 4 semanas',
    provisional: false,
    accessDays: null,
    hours: 32,
    classesPerWeek: 4,
  },
  'english-40h': {
    label: 'Curso de 40 horas',
    eyebrow: '5 clases semanales',
    description: 'Cinco clases de 2 horas cada semana durante 4 semanas.',
    accountType: 'student',
    amountCop: 1_270_000,
    billingLabel: 'Paquete de 4 semanas',
    provisional: false,
    accessDays: null,
    hours: 40,
    classesPerWeek: 5,
  },
  'english-80h': {
    label: 'Curso de 80 horas',
    eyebrow: '10 clases semanales',
    description: 'Diez clases de 2 horas cada semana durante 4 semanas.',
    accountType: 'student',
    amountCop: 2_540_000,
    billingLabel: 'Paquete de 4 semanas',
    provisional: false,
    accessDays: null,
    hours: 80,
    classesPerWeek: 10,
  },
} as const satisfies Record<string, PlatformProduct | StudentProduct>;

export type RegistrationProductId = keyof typeof REGISTRATION_PRODUCTS;
export type RegistrationProduct = (typeof REGISTRATION_PRODUCTS)[RegistrationProductId];
export type RegistrationOrderStatus = 'PENDING' | 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR';
export type RegistrationFulfillmentStatus = 'PENDING' | 'ACTIVE' | 'AWAITING_SCHEDULE' | 'EXPIRED';

export interface RegistrationOrderSummary {
  id: string;
  productId: RegistrationProductId;
  productLabel: string;
  accountType: RegistrationAccountType;
  amountInCents: number;
  status: RegistrationOrderStatus;
  fulfillmentStatus: RegistrationFulfillmentStatus;
  paidAt: string | null;
  accessEndsAt: string | null;
  createdAt: string;
}

export type RegistrationSelection = Readonly<{
  accountType: RegistrationAccountType;
  productId: RegistrationProductId;
}>;

export const DEFAULT_REGISTRATION_SELECTION: RegistrationSelection = Object.freeze({
  accountType: 'platform',
  productId: 'platform-unlimited-30d',
});

export const PLATFORM_PRODUCT_IDS = Object.freeze(
  (Object.keys(REGISTRATION_PRODUCTS) as RegistrationProductId[])
    .filter((id) => REGISTRATION_PRODUCTS[id].accountType === 'platform'),
);

export const STUDENT_PRODUCT_IDS = Object.freeze(
  (Object.keys(REGISTRATION_PRODUCTS) as RegistrationProductId[])
    .filter((id) => REGISTRATION_PRODUCTS[id].accountType === 'student'),
);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isRegistrationAccountType(value: unknown): value is RegistrationAccountType {
  return value === 'platform' || value === 'student';
}

export function isRegistrationProductId(value: unknown): value is RegistrationProductId {
  return typeof value === 'string' && Object.hasOwn(REGISTRATION_PRODUCTS, value);
}

export function parseRegistrationSelection(value: unknown): RegistrationSelection | null {
  if (!isRecord(value)) return null;
  const { accountType, productId } = value;
  if (!isRegistrationAccountType(accountType) || !isRegistrationProductId(productId)) return null;
  if (REGISTRATION_PRODUCTS[productId].accountType !== accountType) return null;
  return Object.freeze({ accountType, productId });
}

export function getRegistrationProduct(productId: RegistrationProductId): RegistrationProduct {
  return REGISTRATION_PRODUCTS[productId];
}

export function getRegistrationAmountInCents(productId: RegistrationProductId): number {
  return REGISTRATION_PRODUCTS[productId].amountCop * 100;
}
