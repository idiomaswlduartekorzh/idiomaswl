'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { createAdminClient } from '@/lib/supabase/admin';
import { AGENDA_PATH, isRecordId, parseDay, parseLessonForm, weekOf } from '@/lib/admin-operations/agenda';
import { GOOGLE_LESSON_FIELDS, isGoogleCalendarConfigured, mirrorGoogleCalendar, type GoogleCalendarLesson } from '@/lib/admin-operations/google-calendar.server';

async function savedLessonMessage(rows: GoogleCalendarLesson[] | null, message: string) {
  if (!isGoogleCalendarConfigured()) return message;
  const issues = !rows?.length || await mirrorGoogleCalendar(rows) > 0;
  return issues ? `${message} Quedó pendiente la copia en Google Calendar. Puedes reintentar la semana.` : `${message} Google Calendar actualizado.`;
}

export async function changeLesson(
  _state: { message: string; ok: boolean },
  form: FormData,
): Promise<{ message: string; ok: boolean }> {
  let admin;
  try {
    admin = await requireAdmin();
  } catch {
    return { ok: false, message: 'Inicia sesión con una cuenta de administración.' };
  }

  const mode = String(form.get('mode') ?? '');
  const db = createAdminClient();
  if (mode === 'syncWeek') {
    const day = String(form.get('week') ?? '');
    if (!parseDay(day) || !isGoogleCalendarConfigured()) {
      return { ok: false, message: 'La conexión de Google Calendar aún requiere configuración.' };
    }
    const week = weekOf(day);
    const { data, error } = await db.from('admin_lessons').select(GOOGLE_LESSON_FIELDS)
      .gte('starts_at', `${week.first}T00:00:00-05:00`)
      .lt('starts_at', `${week.next}T00:00:00-05:00`)
      .order('starts_at').order('id').returns<GoogleCalendarLesson[]>();
    if (error || !data) return { ok: false, message: 'No se pudo consultar la agenda para sincronizar.' };
    if (!data.length) return { ok: true, message: 'Esta semana no tiene clases para sincronizar.' };
    const failed = await mirrorGoogleCalendar(data);
    return failed
      ? { ok: false, message: `Google Calendar no confirmó ${failed} de ${data.length} clases. Vuelve a intentar.` }
      : { ok: true, message: 'Semana sincronizada con Google Calendar.' };
  }

  if (mode === 'create') {
    const seriesId = String(form.get('requestId') ?? '');
    if (!isRecordId(seriesId)) return { ok: false, message: 'Recarga la agenda e inténtalo de nuevo.' };
    const parsed = parseLessonForm(form);
    if (parsed.error) return { ok: false, message: parsed.error };
    const { error } = await db.from('admin_lessons').upsert(
      parsed.lessons.map(lesson => ({ ...lesson, series_id: seriesId, created_by: admin.id, updated_by: admin.id })),
      { onConflict: 'series_id,occurrence', ignoreDuplicates: true },
    );
    if (error) {
      return { ok: false, message: error.code === '23P01' ? 'El profesor ya tiene una clase en uno de esos horarios.' : 'No se pudo guardar la programación.' };
    }
    revalidatePath(AGENDA_PATH);
    const message = parsed.lessons.length === 1 ? 'Clase programada.' : 'Clases programadas.';
    if (!isGoogleCalendarConfigured()) return { ok: true, message };
    const { data } = await db.from('admin_lessons').select(GOOGLE_LESSON_FIELDS)
      .eq('series_id', seriesId).order('occurrence').returns<GoogleCalendarLesson[]>();
    return { ok: true, message: await savedLessonMessage(data, message) };
  }

  const id = String(form.get('id') ?? '');
  const version = String(form.get('version') ?? '');
  if (!isRecordId(id) || !Number.isFinite(Date.parse(version)) || !['edit', 'complete', 'cancel'].includes(mode)) {
    return { ok: false, message: 'Actualiza la agenda e inténtalo de nuevo.' };
  }

  const patch: Record<string, string> = {};
  if (mode === 'edit') {
    const parsed = parseLessonForm(form);
    if (parsed.error) return { ok: false, message: parsed.error };
    if (parsed.lessons.length !== 1) return { ok: false, message: 'Edita cada clase por separado.' };
    const { title, participant, teacher, starts_at, ends_at } = parsed.lessons[0];
    Object.assign(patch, { title, participant, teacher, starts_at, ends_at });
  }
  if (mode === 'complete') patch.status = 'completed';
  if (mode === 'cancel') patch.status = 'cancelled';

  const { data, error } = await db.from('admin_lessons')
    .update({ ...patch, updated_by: admin.id, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('updated_at', version)
    .eq('status', 'scheduled')
    .select(GOOGLE_LESSON_FIELDS)
    .returns<GoogleCalendarLesson[]>()
    .maybeSingle();

  if (error?.code === '23P01') return { ok: false, message: 'El profesor ya tiene una clase en ese horario.' };
  if (error) return { ok: false, message: 'No se pudo actualizar la clase.' };
  if (!data) return { ok: false, message: 'La clase ya cambió. Actualiza la agenda.' };
  revalidatePath(AGENDA_PATH);
  const message = { edit: 'Clase actualizada.', complete: 'Clase marcada como realizada.', cancel: 'Clase cancelada.' }[mode]!;
  return { ok: true, message: await savedLessonMessage([data], message) };
}
