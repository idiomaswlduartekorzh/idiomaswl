import 'server-only';

export type WompiEnvironment = 'sandbox' | 'production';

export interface ToeflReportPaymentConfig {
  publicKey: string;
  integritySecret: string;
  eventsSecret: string;
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

function expectedPrefix(environment: WompiEnvironment, kind: 'public' | 'integrity' | 'events'): string {
  const stage = environment === 'sandbox' ? 'test' : 'prod';
  if (kind === 'public') return `pub_${stage}_`;
  return `${stage}_${kind}_`;
}

export function getToeflReportPaymentConfig(): ToeflReportPaymentConfig {
  const environment = required('WOMPI_ENVIRONMENT') as WompiEnvironment;
  if (environment !== 'sandbox' && environment !== 'production') throw new Error('Invalid WOMPI_ENVIRONMENT');
  const publicKey = required('WOMPI_PUBLIC_KEY');
  const integritySecret = required('WOMPI_INTEGRITY_SECRET');
  const eventsSecret = required('WOMPI_EVENTS_SECRET');
  if (!publicKey.startsWith(expectedPrefix(environment, 'public'))) throw new Error('WOMPI_PUBLIC_KEY does not match environment');
  if (!integritySecret.startsWith(expectedPrefix(environment, 'integrity'))) throw new Error('WOMPI_INTEGRITY_SECRET does not match environment');
  if (!eventsSecret.startsWith(expectedPrefix(environment, 'events'))) throw new Error('WOMPI_EVENTS_SECRET does not match environment');
  const priceCop = positiveInteger('TOEFL_REPORT_PRICE_COP', 1_000, 2_000_000);
  const origin = (process.env.TOEFL_REPORT_ORIGIN ?? 'https://www.idiomaswl.com').replace(/\/$/, '');
  if (!/^https?:\/\//.test(origin)) throw new Error('Invalid TOEFL_REPORT_ORIGIN');
  return {
    publicKey,
    integritySecret,
    eventsSecret,
    environment,
    amountInCents: priceCop * 100,
    currency: 'COP',
    speakingReviewSlaHours: positiveInteger('TOEFL_SPEAKING_REVIEW_SLA_HOURS', 1, 168),
    origin,
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
