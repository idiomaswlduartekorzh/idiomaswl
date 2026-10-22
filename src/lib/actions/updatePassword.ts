'use server';

import { createClient } from '@/lib/supabase/server';

export type UpdatePasswordResult = { ok: true } | { ok: false; error: string };

export async function updatePassword(form: FormData): Promise<UpdatePasswordResult> {
  const password = String(form.get('password') ?? '');
  const confirmation = String(form.get('confirmation') ?? '');
  if (password.length < 12) return { ok: false, error: 'Usa una contraseña de al menos 12 caracteres.' };
  if (password !== confirmation) return { ok: false, error: 'Las contraseñas no coinciden.' };
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
    return { ok: false, error: 'Incluye mayúsculas, minúsculas y números.' };
  }
  const db = await createClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return { ok: false, error: 'Inicia sesión nuevamente.' };
  const { error } = await db.auth.updateUser({ password });
  if (error) return { ok: false, error: 'No pudimos cambiar la contraseña. Inténtalo de nuevo.' };
  return { ok: true };
}
