'use server';

import { randomBytes } from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { escapeEmailHtml } from '@/lib/course-pricing/email.server';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { createAdminClient } from '@/lib/supabase/admin';
import { XPRESS_EXAM_OPTIONS, WELEARN_LANGUAGE_OPTIONS, type WelearnLanguage, type XpressExamSlug } from '@/lib/student-onboarding/catalog';
import { sendTrackedStudentEmail, studentEmailShell, type StudentCommunicationKind } from '@/lib/student-operations/email.server';
import type { StudentPlan } from './assignPlan';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_PLANS = new Set<StudentPlan>(['autodidacta', 'preparacion', 'intensivo']);
const VALID_LANGUAGES = new Set<string>(WELEARN_LANGUAGE_OPTIONS.map((item) => item.id));
const VALID_EXAMS = new Set<string>(XPRESS_EXAM_OPTIONS.map((item) => item.id));

export type ManagedStudentInput = Readonly<{
  email: string;
  fullName: string;
  language: WelearnLanguage;
  level: string;
  plan: StudentPlan;
  subject: string;
  examSlug: XpressExamSlug | null;
}>;

export type StudentOperationResult =
  | { ok: true; message: string; studentId?: string }
  | { ok: false; error: string; studentId?: string };

function cleanText(value: unknown, max: number): string {
  return String(value ?? '').trim().slice(0, max);
}

function requiredUuid(value: unknown): string {
  const id = cleanText(value, 36);
  if (!UUID.test(id)) throw new Error('Estudiante inválido.');
  return id;
}

function temporaryPassword(): string {
  return `Wl!${randomBytes(18).toString('base64url')}7a`;
}

function displayExam(examSlug: string): string {
  return XPRESS_EXAM_OPTIONS.find((item) => item.id === examSlug)?.label ?? examSlug;
}

function dashboardPath(studentId: string): string {
  return `/dashboard/admin/estudiantes/${studentId}`;
}

export async function createManagedStudent(input: ManagedStudentInput): Promise<StudentOperationResult> {
  const actor = await requireAdmin();
  const email = cleanText(input.email, 320).toLowerCase();
  const fullName = cleanText(input.fullName, 100);
  const language = cleanText(input.language, 40);
  const level = cleanText(input.level, 30);
  const plan = input.plan;
  const subject = cleanText(input.subject, 100);
  const examSlug = input.examSlug ? cleanText(input.examSlug, 40) : null;
  if (!EMAIL.test(email) || fullName.length < 2) return { ok: false, error: 'Revisa el nombre y el correo.' };
  if (!VALID_LANGUAGES.has(language) || !VALID_PLANS.has(plan) || !level || !subject) return { ok: false, error: 'Revisa el plan, idioma, nivel y materia.' };
  if (examSlug && !VALID_EXAMS.has(examSlug)) return { ok: false, error: 'El examen seleccionado no es válido.' };

  const db = createAdminClient();
  const { data: usersPage, error: usersError } = await db.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (usersError) return { ok: false, error: 'No pudimos comprobar si la cuenta ya existe.' };
  const existing = usersPage.users.find((user) => user.email?.trim().toLowerCase() === email);
  if (existing) return { ok: false, error: 'Ya existe una cuenta con ese correo.', studentId: existing.id };

  const password = temporaryPassword();
  const { data: created, error: createError } = await db.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });
  if (createError || !created.user) return { ok: false, error: createError?.message ?? 'No pudimos crear la cuenta.' };
  const studentId = created.user.id;

  const now = new Date().toISOString();
  const { error: profileError } = await db.from('profiles').upsert({
    id: studentId,
    email,
    name: fullName,
    full_name: fullName,
    language,
    level,
    subject,
    plan,
    role: 'user',
    student_path: 'welearn',
    target_exam: null,
    xpress_plan_interest: null,
    onboarding_completed_at: now,
    enrolled_at: now,
    updated_at: now,
  }, { onConflict: 'id' });
  if (profileError) return { ok: false, error: 'La cuenta existe, pero no pudimos completar el perfil.', studentId };

  if (examSlug) {
    const { error: grantError } = await db.rpc('grant_welearn_exam_access', {
      p_user: studentId,
      p_exam: examSlug,
      p_source_reference: `admin-center:new-student:${studentId}`,
      p_created_by: actor.id,
    });
    if (grantError) return { ok: false, error: 'La cuenta fue creada, pero no pudimos asignar el examen.', studentId };
  }

  const examCopy = examSlug ? `<p>Tu acceso incluye <strong>${escapeEmailHtml(displayExam(examSlug))}</strong> con los simulacros y recursos correspondientes a tu programa.</p>` : '';
  const body = `<p>Hola ${escapeEmailHtml(fullName)},</p><p>Tu cuenta de estudiante en IdiomasWL ya está lista.</p><div style="background:#f4f6fb;border-radius:12px;padding:16px 18px;margin:20px 0"><p style="margin:0 0 8px"><strong>Usuario:</strong> ${escapeEmailHtml(email)}</p><p style="margin:0"><strong>Contraseña temporal:</strong> ${escapeEmailHtml(password)}</p></div>${examCopy}<p>Al entrar, cambia la contraseña temporal desde <strong>Mi perfil</strong>.</p>`;
  try {
    await sendTrackedStudentEmail({
      studentId,
      createdBy: actor.id,
      kind: 'welcome',
      subject: 'Tu cuenta de estudiante en IdiomasWL',
      bodyText: `Cuenta creada para ${fullName}. Credenciales y enlace de ingreso enviados por correo.`,
      html: studentEmailShell({
        preheader: 'Tu cuenta de estudiante ya está lista.',
        title: `Bienvenido/a, ${fullName}`,
        body,
        cta: { href: 'https://www.idiomaswl.com/login', label: 'Entrar a IdiomasWL' },
      }),
      idempotencyKey: `student-welcome/${studentId}`,
    });
  } catch {
    revalidatePath('/dashboard/admin');
    return { ok: false, error: 'La cuenta quedó creada, pero Resend no pudo entregar el correo. Abre la ficha para reenviar el acceso.', studentId };
  }

  revalidatePath('/dashboard/admin');
  revalidatePath(dashboardPath(studentId));
  return { ok: true, message: 'Cuenta creada, acceso asignado y correo enviado.', studentId };
}

export async function updateStudentAcademicProfile(form: FormData): Promise<void> {
  await requireAdmin();
  const studentId = requiredUuid(form.get('studentId'));
  const plan = cleanText(form.get('plan'), 30) as StudentPlan;
  const language = cleanText(form.get('language'), 40);
  const level = cleanText(form.get('level'), 30);
  const subject = cleanText(form.get('subject'), 100);
  if (!VALID_PLANS.has(plan) || !VALID_LANGUAGES.has(language) || !level || !subject) throw new Error('Revisa los datos académicos.');
  const { error } = await createAdminClient().from('profiles').update({ plan, language, level, subject, updated_at: new Date().toISOString() }).eq('id', studentId);
  if (error) throw new Error('No pudimos actualizar el perfil académico.');
  revalidatePath('/dashboard/admin');
  revalidatePath(dashboardPath(studentId));
  revalidatePath('/dashboard/student');
}

export async function grantStudentExamAccess(form: FormData): Promise<void> {
  const actor = await requireAdmin();
  const studentId = requiredUuid(form.get('studentId'));
  const examSlug = cleanText(form.get('examSlug'), 40);
  if (!VALID_EXAMS.has(examSlug)) throw new Error('Examen inválido.');
  const db = createAdminClient();
  const { error: profileError } = await db.from('profiles').update({ student_path: 'welearn', target_exam: null, xpress_plan_interest: null, updated_at: new Date().toISOString() }).eq('id', studentId);
  if (profileError) throw new Error('No pudimos preparar el perfil para el acceso.');
  const { error } = await db.rpc('grant_welearn_exam_access', {
    p_user: studentId,
    p_exam: examSlug,
    p_source_reference: `admin-center:grant:${studentId}:${examSlug}`,
    p_created_by: actor.id,
  });
  if (error) throw new Error('No pudimos conceder el acceso.');
  revalidatePath('/dashboard/admin');
  revalidatePath(dashboardPath(studentId));
  revalidatePath('/dashboard/student');
}

export async function revokeStudentExamAccess(form: FormData): Promise<void> {
  const actor = await requireAdmin();
  const studentId = requiredUuid(form.get('studentId'));
  const examSlug = cleanText(form.get('examSlug'), 40);
  const reason = cleanText(form.get('reason'), 500);
  if (!VALID_EXAMS.has(examSlug) || reason.length < 3) throw new Error('Indica el examen y el motivo de revocación.');
  const { data, error } = await createAdminClient().rpc('revoke_welearn_exam_access', {
    p_user: studentId,
    p_exam: examSlug,
    p_reason: reason,
    p_revoked_by: actor.id,
  });
  if (error || data !== true) throw new Error('No encontramos un acceso activo para revocar.');
  revalidatePath('/dashboard/admin');
  revalidatePath(dashboardPath(studentId));
  revalidatePath('/dashboard/student');
}

export async function addStudentNote(form: FormData): Promise<void> {
  const actor = await requireAdmin();
  const studentId = requiredUuid(form.get('studentId'));
  const note = cleanText(form.get('note'), 4000);
  if (!note) throw new Error('Escribe una nota.');
  const { error } = await createAdminClient().from('student_notes').insert({ student_id: studentId, created_by: actor.id, note, pinned: String(form.get('pinned') ?? '') === 'on' });
  if (error) throw new Error('No pudimos guardar la nota.');
  revalidatePath(dashboardPath(studentId));
}

export async function sendStudentMessage(form: FormData): Promise<void> {
  const actor = await requireAdmin();
  const studentId = requiredUuid(form.get('studentId'));
  const kind = cleanText(form.get('kind'), 30) as StudentCommunicationKind;
  const subject = cleanText(form.get('subject'), 180);
  const bodyText = cleanText(form.get('body'), 12000);
  if (!['follow_up', 'general'].includes(kind) || subject.length < 3 || !bodyText) throw new Error('Revisa el asunto y el mensaje.');
  const body = `<p>${bodyText.split(/\n{2,}/).map((paragraph) => escapeEmailHtml(paragraph).replace(/\n/g, '<br>')).join('</p><p>')}</p>`;
  await sendTrackedStudentEmail({
    studentId,
    createdBy: actor.id,
    kind,
    subject,
    bodyText,
    html: studentEmailShell({
      preheader: subject,
      title: subject,
      body,
      cta: { href: 'https://www.idiomaswl.com/dashboard/student', label: 'Abrir mi espacio de estudiante' },
    }),
    idempotencyKey: `student-message/${studentId}/${randomBytes(12).toString('hex')}`,
  });
  revalidatePath(dashboardPath(studentId));
}

export async function resendStudentAccess(form: FormData): Promise<void> {
  const actor = await requireAdmin();
  const studentId = requiredUuid(form.get('studentId'));
  const db = createAdminClient();
  const [{ data: userResult, error: userError }, { data: profile, error: profileError }] = await Promise.all([
    db.auth.admin.getUserById(studentId),
    db.from('profiles').select('email,full_name').eq('id', studentId).maybeSingle(),
  ]);
  if (userError || profileError || !userResult.user || !profile?.email) throw new Error('No pudimos cargar la cuenta.');
  const password = temporaryPassword();
  const { error: passwordError } = await db.auth.admin.updateUserById(studentId, { password });
  if (passwordError) throw new Error('No pudimos renovar la contraseña temporal.');
  const name = profile.full_name?.trim() || 'estudiante';
  await sendTrackedStudentEmail({
    studentId,
    createdBy: actor.id,
    kind: 'welcome',
    subject: 'Nuevo acceso temporal a IdiomasWL',
    bodyText: 'Se renovó la contraseña temporal y se enviaron nuevas credenciales.',
    html: studentEmailShell({
      preheader: 'Tus nuevas credenciales temporales están listas.',
      title: 'Nuevo acceso temporal',
      body: `<p>Hola ${escapeEmailHtml(name)},</p><p>Generamos una nueva contraseña temporal para tu cuenta.</p><div style="background:#f4f6fb;border-radius:12px;padding:16px 18px;margin:20px 0"><p style="margin:0 0 8px"><strong>Usuario:</strong> ${escapeEmailHtml(profile.email)}</p><p style="margin:0"><strong>Contraseña temporal:</strong> ${escapeEmailHtml(password)}</p></div><p>Cámbiala desde <strong>Mi perfil</strong> después de entrar.</p>`,
      cta: { href: 'https://www.idiomaswl.com/login', label: 'Entrar a IdiomasWL' },
    }),
    idempotencyKey: `student-access/${studentId}/${Date.now()}`,
  });
  revalidatePath(dashboardPath(studentId));
}
