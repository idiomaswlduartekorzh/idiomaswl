'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { createAdminClient } from '@/lib/supabase/admin';
import { AGENDA_PATH, isRecordId, parseLessonForm } from '@/lib/admin-operations/agenda';

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
    return { ok: true, message: parsed.lessons.length === 1 ? 'Clase programada.' : 'Clases programadas.' };
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
    .select('id')
    .maybeSingle();

  if (error?.code === '23P01') return { ok: false, message: 'El profesor ya tiene una clase en ese horario.' };
  if (error) return { ok: false, message: 'No se pudo actualizar la clase.' };
  if (!data) return { ok: false, message: 'La clase ya cambió. Actualiza la agenda.' };
  revalidatePath(AGENDA_PATH);
  return { ok: true, message: { edit: 'Clase actualizada.', complete: 'Clase marcada como realizada.', cancel: 'Clase cancelada.' }[mode]! };
}
