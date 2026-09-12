import 'server-only';

import { getWompiServerConfig } from '@/lib/wompi/server';
import {
  ICFES_DETAIL_AMOUNT_IN_CENTS,
  ICFES_DETAIL_PRICE_COP,
} from '@/lib/icfes/commerce-v1';

export const ICFES_PASS_PRICE_COP = ICFES_DETAIL_PRICE_COP;
export const ICFES_PASS_AMOUNT_IN_CENTS = ICFES_DETAIL_AMOUNT_IN_CENTS;

export interface IcfesProductConfig {
  enabled: true;
  amountInCents: number;
  currency: 'COP';
  publicKey: string;
  integritySecret: string;
  environment: 'sandbox' | 'production';
  origin: string;
}

export function isIcfesPersistenceEnabled(): boolean {
  return process.env.ICFES_PERSISTENCE_ENABLED === 'true'
    && Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim())
    && Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim())
    && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());
}

export function getIcfesProductConfig(): IcfesProductConfig {
  if (process.env.ICFES_PASE_ENABLED !== 'true') throw new Error('Pase ICFES disabled');
  if (!isIcfesPersistenceEnabled()) throw new Error('ICFES persistence disabled');
  const configuredPrice = process.env.ICFES_PASE_PRICE_COP?.trim();
  if (configuredPrice && Number(configuredPrice) !== ICFES_PASS_PRICE_COP) {
    throw new Error('ICFES_PASE_PRICE_COP must match the reviewed COP 12.900 offer');
  }
  const wompi = getWompiServerConfig();
  const originValue = process.env.ICFES_PASE_ORIGIN?.trim() || 'https://www.idiomaswl.com';
  const origin = new URL(originValue);
  if (!['http:', 'https:'].includes(origin.protocol)
    || (wompi.environment === 'production' && origin.protocol !== 'https:')) throw new Error('Invalid ICFES_PASE_ORIGIN');
  return {
    enabled: true,
    amountInCents: ICFES_PASS_AMOUNT_IN_CENTS,
    currency: 'COP',
    publicKey: wompi.publicKey,
    integritySecret: wompi.integritySecret,
    environment: wompi.environment,
    origin: origin.origin,
  };
}

export function isIcfesPassEnabled(): boolean {
  try {
    getIcfesProductConfig();
    return true;
  } catch {
    return false;
  }
}
