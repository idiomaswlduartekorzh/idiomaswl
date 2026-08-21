import 'server-only';

import { getWompiServerConfig } from '@/lib/wompi/server';

export function isRegistrationCheckoutEnabled(): boolean {
  if (process.env.REGISTRATION_CHECKOUT_ENABLED !== 'true') return false;
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || !process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) {
    return false;
  }
  try {
    getWompiServerConfig();
    return true;
  } catch {
    return false;
  }
}
