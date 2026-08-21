import 'server-only';

import { getWompiServerConfig } from '@/lib/wompi/server';
import type { WompiEnvironment } from '@/lib/wompi/validation';

export interface ToeflReportPaymentConfig {
  publicKey: string;
  integritySecret: string;
  environment: WompiEnvironment;
  amountInCents: number;
  currency: 'COP';
  speakingReviewSlaHours: number;
  origin: string;
}

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function positiveInteger(name: string, min: number, max: number): number {
  const value = Number(required(name));
  if (!Number.isSafeInteger(value) || value < min || value > max) throw new Error(`Invalid ${name}`);
  return value;
}

function reportOrigin(environment: WompiEnvironment): string {
  const value = process.env.TOEFL_REPORT_ORIGIN?.trim() || 'https://www.idiomaswl.com';
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error('Invalid TOEFL_REPORT_ORIGIN');
  }
  if ((url.protocol !== 'https:' && url.protocol !== 'http:')
    || (environment === 'production' && url.protocol !== 'https:')) {
    throw new Error('Invalid TOEFL_REPORT_ORIGIN');
  }
  return url.origin;
}

export function getToeflReportPaymentConfig(): ToeflReportPaymentConfig {
  const wompi = getWompiServerConfig();
  const priceCop = positiveInteger('TOEFL_REPORT_PRICE_COP', 1_000, 2_000_000);
  return {
    publicKey: wompi.publicKey,
    integritySecret: wompi.integritySecret,
    environment: wompi.environment,
    amountInCents: priceCop * 100,
    currency: 'COP',
    speakingReviewSlaHours: positiveInteger('TOEFL_SPEAKING_REVIEW_SLA_HOURS', 1, 168),
    origin: reportOrigin(wompi.environment),
  };
}

export function isToeflReportPaywallEnabled(): boolean {
  if (process.env.TOEFL_REPORT_PAYWALL_ENABLED !== 'true') return false;
  try {
    getToeflReportPaymentConfig();
    return true;
  } catch {
    return false;
  }
}

export function getToeflReportOffer(): Readonly<{
  enabled: boolean;
  priceCop: number;
  speakingReviewSlaHours: number;
}> {
  const parsedPrice = Number(process.env.TOEFL_REPORT_PRICE_COP ?? 10_000);
  const parsedSla = Number(process.env.TOEFL_SPEAKING_REVIEW_SLA_HOURS ?? 48);
  return Object.freeze({
    enabled: isToeflReportPaywallEnabled(),
    priceCop: Number.isSafeInteger(parsedPrice) && parsedPrice >= 1_000 && parsedPrice <= 2_000_000
      ? parsedPrice
      : 10_000,
    speakingReviewSlaHours: Number.isSafeInteger(parsedSla) && parsedSla >= 1 && parsedSla <= 168
      ? parsedSla
      : 48,
  });
}
