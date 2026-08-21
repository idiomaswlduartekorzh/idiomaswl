import 'server-only';

import { createClient } from '@/lib/supabase/server';
import { ALL_ADMIN_EMAILS } from '@/lib/config/admins';

export interface AuthorizedAdmin {
  id: string;
  email: string;
}

/**
 * Strong server-side admin authorization.
 *
 * `profiles.role` is deliberately not accepted here: it is application data,
 * while the allowlist is server-owned and shared by every sensitive action.
 */
export async function requireAdmin(): Promise<AuthorizedAdmin> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const email = user?.email?.trim().toLowerCase() ?? '';

  if (!user || !ALL_ADMIN_EMAILS.includes(email)) {
    throw new Error('No tienes permisos de administrador.');
  }

  return { id: user.id, email };
}
