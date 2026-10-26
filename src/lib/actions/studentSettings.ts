'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

type Result = { ok: true; avatarUrl?: string | null } | { ok: false; error: string };

function refreshProfile() {
  revalidatePath('/dashboard/student');
  revalidatePath('/dashboard/student/perfil');
}

async function removeOwnedAvatar(db: Awaited<ReturnType<typeof createClient>>, userId: string, url: string | null) {
  if (!url) return;
  const marker = `/storage/v1/object/public/student-avatars/${userId}/`;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.endsWith('.supabase.co') && parsed.pathname.startsWith(marker)) {
      const filename = parsed.pathname.slice(marker.length);
      if (/^[a-f0-9-]+\.(jpg|png|webp)$/.test(filename)) {
        await db.storage.from('student-avatars').remove([`${userId}/${filename}`]);
      }
    }
  } catch { /* An older external avatar does not belong to our bucket. */ }
}

export async function updateStudentDetails(form: FormData): Promise<Result> {
  const db = await createClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return { ok: false, error: 'Inicia sesión nuevamente.' };
  const fullName = String(form.get('full_name') ?? '').trim();
  const phone = String(form.get('phone') ?? '').trim();
  const city = String(form.get('city') ?? '').trim();
  if (fullName.length < 2 || fullName.length > 80) return { ok: false, error: 'El nombre debe tener entre 2 y 80 caracteres.' };
  if (phone && !/^\+?[0-9\s()-]{7,25}$/.test(phone)) return { ok: false, error: 'Revisa el número de teléfono.' };
  if (city.length > 80) return { ok: false, error: 'La ciudad no puede superar 80 caracteres.' };
  const { data, error } = await db.from('profiles')
    .update({ full_name: fullName, phone: phone || null, city: city || null })
    .eq('id', user.id).select('id').maybeSingle();
  if (error || !data) return { ok: false, error: 'No pudimos guardar tus datos. Inténtalo de nuevo.' };
  refreshProfile();
  return { ok: true };
}

export async function requestStudentEmailChange(form: FormData): Promise<Result> {
  const db = await createClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return { ok: false, error: 'Inicia sesión nuevamente.' };
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Escribe un correo electrónico válido.' };
  }
  if (email === user.email?.toLowerCase()) return { ok: false, error: 'Ese ya es tu correo de acceso.' };
  const { error } = await db.auth.updateUser({ email }, { emailRedirectTo: 'https://www.idiomaswl.com/auth/callback?next=/dashboard/student/perfil' });
  if (error) return { ok: false, error: 'No pudimos solicitar el cambio. Verifica el correo o inténtalo más tarde.' };
  return { ok: true };
}

export async function updateStudentNotifications(form: FormData): Promise<Result> {
  const db = await createClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return { ok: false, error: 'Inicia sesión nuevamente.' };
  const frequency = String(form.get('frequency') ?? 'weekly');
  const weekday = Number(form.get('weekday'));
  if (!['daily', 'weekly'].includes(frequency) || !Number.isInteger(weekday) || weekday < 1 || weekday > 7) {
    return { ok: false, error: 'Revisa la frecuencia del recordatorio.' };
  }
  const values = {
    study_reminders_enabled: form.get('reminders') === 'on',
    study_reminder_frequency: frequency,
    study_reminder_weekday: weekday,
    correction_emails_enabled: form.get('corrections') === 'on',
    updated_at: new Date().toISOString(),
  };
  const { data: existing, error: readError } = await db.from('student_notification_preferences')
    .select('student_id').eq('student_id', user.id).maybeSingle();
  if (readError) return { ok: false, error: 'No pudimos leer tus preferencias.' };
  const { error } = existing
    ? await db.from('student_notification_preferences').update(values).eq('student_id', user.id)
    : await db.from('student_notification_preferences').insert({ student_id: user.id, ...values });
  if (error) return { ok: false, error: 'No pudimos guardar tus notificaciones.' };
  refreshProfile();
  return { ok: true };
}

export async function updateStudentAvatar(form: FormData): Promise<Result> {
  const db = await createClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return { ok: false, error: 'Inicia sesión nuevamente.' };
  const file = form.get('avatar');
  if (!(file instanceof File)) return { ok: false, error: 'Selecciona una imagen.' };
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 2 * 1024 * 1024 || file.size === 0) {
    return { ok: false, error: 'Usa una imagen JPG, PNG o WebP de hasta 2 MB.' };
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const isPng = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  const isWebp = String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP';
  if (!((file.type === 'image/jpeg' && isJpeg) || (file.type === 'image/png' && isPng) || (file.type === 'image/webp' && isWebp))) {
    return { ok: false, error: 'El archivo no es una imagen válida.' };
  }
  const extension = file.type === 'image/jpeg' ? 'jpg' : file.type === 'image/png' ? 'png' : 'webp';
  const { data: previous } = await db.from('profiles').select('avatar_url').eq('id', user.id).maybeSingle();
  const path = `${user.id}/${crypto.randomUUID()}.${extension}`;
  const { error: uploadError } = await db.storage.from('student-avatars').upload(path, bytes, { contentType: file.type, upsert: false });
  if (uploadError) return { ok: false, error: 'No pudimos subir la foto.' };
  const { data: { publicUrl } } = db.storage.from('student-avatars').getPublicUrl(path);
  const { data, error } = await db.from('profiles').update({ avatar_url: publicUrl }).eq('id', user.id).select('id').maybeSingle();
  if (error || !data) {
    await db.storage.from('student-avatars').remove([path]);
    return { ok: false, error: 'No pudimos guardar la foto.' };
  }
  await removeOwnedAvatar(db, user.id, previous?.avatar_url ?? null);
  refreshProfile();
  return { ok: true, avatarUrl: publicUrl };
}

export async function removeStudentAvatar(): Promise<Result> {
  const db = await createClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return { ok: false, error: 'Inicia sesión nuevamente.' };
  const { data: previous } = await db.from('profiles').select('avatar_url').eq('id', user.id).maybeSingle();
  const { data, error } = await db.from('profiles').update({ avatar_url: null }).eq('id', user.id).select('id').maybeSingle();
  if (error || !data) return { ok: false, error: 'No pudimos quitar la foto.' };
  await removeOwnedAvatar(db, user.id, previous?.avatar_url ?? null);
  refreshProfile();
  return { ok: true, avatarUrl: null };
}
