import { createHash, randomUUID, timingSafeEqual } from 'node:crypto';

import {
  getWompiCheckoutDetails,
  isWompiBillingPeriod,
  isWompiLanguageSlug,
  isWompiPlanId,
  type WompiBillingPeriod,
  type WompiCheckoutSelection,
} from './catalog.ts';

type WompiEventSignature = Readonly<{
  properties: readonly string[];
  checksum: string;
}>;

export type WompiEventEnvelope = Readonly<{
  data: Record<string, unknown>;
  signature: WompiEventSignature;
  timestamp: number;
}>;

export type WompiWebhookEvent = WompiEventEnvelope &
  Readonly<{
    event: string;
    environment: 'test' | 'prod';
    sentAt: string | null;
  }>;

const REFERENCE_PREFIX = 'WL';
const REFERENCE_TIMESTAMP = /^[0-9a-z]{8,12}$/;
const REFERENCE_NONCE = /^[0-9a-f]{12,24}$/;
const FORBIDDEN_PROPERTY_SEGMENTS = new Set(['__proto__', 'prototype', 'constructor']);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function parseWompiWebhookEvent(value: unknown): WompiWebhookEvent | null {
  if (!isRecord(value) || !isRecord(value.data) || !isRecord(value.signature)) {
    return null;
  }

  const event = value.event;
  const environment = value.environment;
  const timestamp = value.timestamp;
  const sentAt = value.sent_at;
  const properties = value.signature.properties;
  const checksum = value.signature.checksum;

  if (
    typeof event !== 'string' ||
    event.length === 0 ||
    event.length > 100 ||
    (environment !== 'test' && environment !== 'prod') ||
    typeof timestamp !== 'number' ||
    !Number.isSafeInteger(timestamp) ||
    timestamp <= 0 ||
    !Array.isArray(properties) ||
    properties.length === 0 ||
    properties.length > 30 ||
    properties.some((property) => typeof property !== 'string') ||
    typeof checksum !== 'string' ||
    !/^[0-9a-f]{64}$/i.test(checksum) ||
    (sentAt !== undefined && sentAt !== null && typeof sentAt !== 'string')
  ) {
    return null;
  }

  return Object.freeze({
    event,
    data: value.data,
    environment,
    signature: Object.freeze({
      properties: Object.freeze([...properties]) as readonly string[],
      checksum,
    }),
    timestamp,
    sentAt: typeof sentAt === 'string' ? sentAt : null,
  });
}

export function sha256(value: string): string {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

export function createWompiReference(
  selection: WompiCheckoutSelection,
  options: Readonly<{ timestamp?: number; nonce?: string }> = {},
): string {
  const timestamp = options.timestamp ?? Date.now();
  const nonce = (options.nonce ?? randomUUID()).replaceAll('-', '').toLowerCase().slice(0, 16);
  const billingCode = selection.billingPeriod === 'annual' ? 'a' : 'm';

  if (!Number.isSafeInteger(timestamp) || timestamp <= 0 || !REFERENCE_NONCE.test(nonce)) {
    throw new Error('No fue posible generar una referencia de pago válida.');
  }

  return [
    REFERENCE_PREFIX,
    selection.planId,
    selection.language,
    billingCode,
    timestamp.toString(36),
    nonce,
  ].join('-');
}

export function parseWompiReference(reference: unknown): WompiCheckoutSelection | null {
  if (typeof reference !== 'string' || reference.length > 255) return null;

  const [prefix, planId, language, billingCode, timestamp, nonce, extra] = reference.split('-');
  const billingPeriod: WompiBillingPeriod | null =
    billingCode === 'a' ? 'annual' : billingCode === 'm' ? 'monthly' : null;

  if (
    extra !== undefined ||
    prefix !== REFERENCE_PREFIX ||
    !isWompiPlanId(planId) ||
    !isWompiLanguageSlug(language) ||
    !isWompiBillingPeriod(billingPeriod) ||
    typeof timestamp !== 'string' ||
    !REFERENCE_TIMESTAMP.test(timestamp) ||
    typeof nonce !== 'string' ||
    !REFERENCE_NONCE.test(nonce)
  ) {
    return null;
  }

  return Object.freeze({ planId, language, billingPeriod });
}

export function createWompiIntegritySignature(input: Readonly<{
  reference: string;
  amountInCents: number;
  currency: string;
  integritySecret: string;
  expirationTime?: string;
}>): string {
  if (!Number.isSafeInteger(input.amountInCents) || input.amountInCents <= 0) {
    throw new Error('El monto del checkout debe ser un entero positivo en centavos.');
  }

  return sha256(
    `${input.reference}${input.amountInCents}${input.currency}${input.expirationTime ?? ''}${input.integritySecret}`,
  );
}

function getSignedProperty(data: Record<string, unknown>, property: string): string {
  if (!property || property.length > 200) {
    throw new Error('Propiedad de firma inválida.');
  }

  let current: unknown = data;
  for (const segment of property.split('.')) {
    if (
      !segment ||
      FORBIDDEN_PROPERTY_SEGMENTS.has(segment) ||
      typeof current !== 'object' ||
      current === null ||
      !Object.hasOwn(current, segment)
    ) {
      throw new Error('Propiedad de firma inexistente.');
    }

    current = (current as Record<string, unknown>)[segment];
  }

  if (
    typeof current !== 'string' &&
    typeof current !== 'number' &&
    typeof current !== 'boolean'
  ) {
    throw new Error('Valor de firma no escalar.');
  }

  return String(current);
}

export function createWompiEventChecksum(
  event: WompiEventEnvelope,
  eventsSecret: string,
): string {
  if (
    !Number.isSafeInteger(event.timestamp) ||
    event.timestamp <= 0 ||
    event.signature.properties.length === 0 ||
    event.signature.properties.length > 30
  ) {
    throw new Error('Firma de evento inválida.');
  }

  const signedValues = event.signature.properties
    .map((property) => getSignedProperty(event.data, property))
    .join('');

  return sha256(`${signedValues}${event.timestamp}${eventsSecret}`);
}

function safeHashEquals(expected: string, provided: string): boolean {
  const normalizedExpected = expected.trim().toLowerCase();
  const normalizedProvided = provided.trim().toLowerCase();
  if (!/^[0-9a-f]{64}$/.test(normalizedExpected) || !/^[0-9a-f]{64}$/.test(normalizedProvided)) {
    return false;
  }

  return timingSafeEqual(Buffer.from(normalizedExpected, 'hex'), Buffer.from(normalizedProvided, 'hex'));
}

export function verifyWompiEventChecksum(
  event: WompiEventEnvelope,
  eventsSecret: string,
  headerChecksum?: string | null,
): boolean {
  try {
    if (
      headerChecksum &&
      !safeHashEquals(event.signature.checksum, headerChecksum)
    ) {
      return false;
    }

    const expected = createWompiEventChecksum(event, eventsSecret);
    return safeHashEquals(expected, headerChecksum || event.signature.checksum);
  } catch {
    return false;
  }
}

export function validateReferenceAmount(reference: string, amountInCents: number): boolean {
  const selection = parseWompiReference(reference);
  if (!selection) return false;
  return getWompiCheckoutDetails(selection).amountInCents === amountInCents;
}
