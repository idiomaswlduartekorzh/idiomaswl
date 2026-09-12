'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function requiredText(form: FormData, key: string, max: number): string {
  const value = String(form.get(key) ?? '').trim();
  if (!value || value.length > max) throw new Error(`Revisa el campo ${key}.`);
  return value;
}

function optionalUrl(form: FormData): string | null {
  const value = String(form.get('resourceUrl') ?? '').trim();
  if (!value) return null;
  if (!value.startsWith('/') && !value.startsWith('https://')) throw new Error('El enlace debe ser interno o HTTPS.');
  return value;
}

export async function createStudentAssignment(form: FormData): Promise<void> {
  const admin = await requireAdmin();
  const studentId = requiredText(form, 'studentId', 36);
  if (!UUID.test(studentId)) throw new Error('Estudiante inválido.');
  const title = requiredText(form, 'title', 140);
  const instructions = String(form.get('instructions') ?? '').trim();
  if (instructions.length > 4000) throw new Error('Las instrucciones son demasiado largas.');
  const dueValue = String(form.get('dueAt') ?? '').trim();
  const dueAt = dueValue ? new Date(dueValue) : null;
  if (dueAt && Number.isNaN(dueAt.getTime())) throw new Error('Fecha de entrega inválida.');

  const db = createAdminClient();
  const { data: student, error: studentError } = await db.from('profiles').select('id,plan').eq('id', studentId).maybeSingle();
  if (studentError || !student) throw new Error('No encontramos al estudiante.');
  if (student.plan === 'autodidacta') throw new Error('Las asignaciones son para estudiantes con acompañamiento.');
  const { error } = await db.from('student_assignments').insert({
    student_id: studentId,
    created_by: admin.id,
    title,
    instructions,
    resource_url: optionalUrl(form),
    due_at: dueAt?.toISOString() ?? null,
  });
  if (error) throw new Error('No pudimos crear la asignación.');
  revalidatePath(`/dashboard/admin/estudiantes/${studentId}`);
  revalidatePath('/dashboard/student');
}

export async function cancelStudentAssignment(form: FormData): Promise<void> {
  await requireAdmin();
  const assignmentId = requiredText(form, 'assignmentId', 36);
  const studentId = requiredText(form, 'studentId', 36);
  if (!UUID.test(assignmentId) || !UUID.test(studentId)) throw new Error('Asignación inválida.');
  const { error } = await createAdminClient().from('student_assignments').update({ status: 'canceled', updated_at: new Date().toISOString() }).eq('id', assignmentId).eq('student_id', studentId);
  if (error) throw new Error('No pudimos cancelar la asignación.');
  revalidatePath(`/dashboard/admin/estudiantes/${studentId}`);
  revalidatePath('/dashboard/student');
}

export async function setStudentAssignmentCompleted(form: FormData): Promise<void> {
  const assignmentId = requiredText(form, 'assignmentId', 36);
  if (!UUID.test(assignmentId)) throw new Error('Asignación inválida.');
  const completed = String(form.get('completed') ?? '') === 'true';
  const db = await createClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) throw new Error('Inicia sesión para actualizar la tarea.');
  const { data, error } = await db.rpc('set_student_assignment_completed', { p_assignment_id: assignmentId, p_completed: completed });
  if (error || data !== true) throw new Error('No pudimos actualizar la tarea.');
  revalidatePath('/dashboard/student');
}
