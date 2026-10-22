import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('student operations are server-authorized and cover the full lifecycle', () => {
  const actions = read('src/lib/actions/studentOperations.ts');
  for (const action of ['createManagedStudent', 'updateStudentAcademicProfile', 'grantStudentExamAccess', 'revokeStudentExamAccess', 'addStudentNote', 'sendStudentMessage', 'resendStudentAccess']) {
    assert.match(actions, new RegExp(`function ${action}`));
  }
  assert.ok((actions.match(/requireAdmin\(\)/g) ?? []).length >= 7);
  assert.match(actions, /auth\.admin\.createUser/);
  assert.match(actions, /email_confirm: true/);
  assert.match(actions, /temporaryPassword\(\)/);
  assert.match(actions, /sendTrackedStudentEmail/);
  assert.doesNotMatch(actions, /bodyText:[^\n]*password/);
});

test('private operational data is protected by RLS and service-role-only grants', () => {
  const migration = read('supabase/migrations/20261022175516_student_operations_center.sql');
  for (const table of ['student_communications', 'student_notes']) {
    assert.match(migration, new RegExp(`alter table public\\.${table} enable row level security`));
    assert.match(migration, new RegExp(`revoke all on public\\.${table} from public, anon, authenticated, service_role`));
  }
  assert.match(migration, /grant select, insert on public\.student_communications to service_role/);
  assert.match(migration, /grant select, insert, update, delete on public\.student_notes to service_role/);
  assert.match(migration, /security invoker/g);
  assert.match(migration, /student_id = \(select auth\.uid\(\)\)/);
  assert.match(migration, /revoke all on function public\.submit_student_assignment/);
  assert.match(migration, /revoke all on function public\.revoke_welearn_exam_access/);
});

test('assignment delivery and feedback stay tied to the authenticated student', () => {
  const actions = read('src/lib/actions/studentAssignments.ts');
  const loader = read('src/lib/student-dashboard/data.server.ts');
  const view = read('src/components/student-dashboard/StudentDashboardView.tsx');
  assert.match(actions, /rpc\('submit_student_assignment'/);
  assert.match(actions, /auth\.getUser\(\)/);
  assert.match(actions, /giveStudentAssignmentFeedback/);
  assert.match(actions, /relatedAssignmentId/);
  assert.match(loader, /submission_text,submission_url,submitted_at,teacher_feedback,feedback_at/);
  assert.match(view, /Entregar tarea/);
  assert.match(view, /Retroalimentación de tu profesor/);
});

test('the administrator UI exposes profile, access, communication, notes, and assignment controls', () => {
  const list = read('src/app/(site)/dashboard/admin/StudentList.tsx');
  const detail = read('src/app/(site)/dashboard/admin/estudiantes/[studentId]/page.tsx');
  assert.match(list, /createManagedStudent/);
  assert.match(list, /Crear y enviar acceso/);
  assert.match(list, /finally \{/);
  assert.match(list, /student_creation_timeout/);
  assert.match(list, /Abrir la ficha del estudiante/);
  assert.match(detail, /Perfil académico/);
  assert.match(detail, /Accesos a exámenes/);
  assert.match(detail, /Enviar mensaje/);
  assert.match(detail, /Notas privadas/);
  assert.match(detail, /Guardar y notificar/);
});

test('student creation is recoverable and reports partial completion', () => {
  const actions = read('src/lib/actions/studentOperations.ts');
  assert.doesNotMatch(actions, /auth\.admin\.listUsers/);
  assert.match(actions, /isExistingAccountError/);
  assert.match(actions, /existingProfile/);
  assert.match(actions, /logCreationFailure/);
  assert.match(actions, /La cuenta quedó creada, pero Resend no pudo entregar el correo/);
});

test('students can replace temporary credentials from their private profile', () => {
  const action = read('src/lib/actions/updatePassword.ts');
  const profile = read('src/app/(site)/dashboard/student/perfil/PerfilClient.tsx');
  assert.match(action, /auth\.getUser\(\)/);
  assert.match(action, /auth\.updateUser\(\{ password \}\)/);
  assert.match(action, /password\.length < 12/);
  assert.match(profile, /Cambiar contraseña/);
  assert.match(profile, /autoComplete="new-password"/);
});

test('Resend delivery is idempotent and every attempt has an auditable status', () => {
  const email = read('src/lib/student-operations/email.server.ts');
  const transport = read('src/lib/course-pricing/email.server.ts');
  assert.match(email, /status: 'sent'/);
  assert.match(email, /provider_message_id/);
  assert.match(email, /status: 'failed'/);
  assert.match(transport, /'Idempotency-Key':input\.idempotencyKey/);
  assert.match(transport, /RESEND_API_KEY/);
});
