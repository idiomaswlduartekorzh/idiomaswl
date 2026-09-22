import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  formatExamAccessCode,
  isExamAccessCodeExam,
  isExamAccessCodeKind,
  normalizeExamAccessCode,
} from '../src/lib/exam-access-codes/config.ts';

const read = path => readFileSync(path, 'utf8');

test('access codes normalize pasted separators without weakening the format', () => {
  assert.equal(normalizeExamAccessCode(' wl-abcd efgh jklm np '), 'WLABCDEFGHJKLMNP');
  assert.equal(formatExamAccessCode('WLABCDEFGHJKLMNP'), 'WL-ABCD-EFGH-JKLM-NP');
  assert.equal(isExamAccessCodeExam('icfes'), true);
  assert.equal(isExamAccessCodeExam('sat'), false);
  assert.equal(isExamAccessCodeKind('single_use'), true);
  assert.equal(isExamAccessCodeKind('classroom_5h'), true);
  assert.equal(isExamAccessCodeKind('unlimited'), false);
});

test('migration stores only hashes and keeps both tables server-only', () => {
  const migration = read('supabase/migrations/20260922004219_exam_access_codes.sql');
  assert.match(migration, /code_hash text not null unique/);
  assert.doesNotMatch(migration, /plain(?:text)?_code/i);
  assert.match(migration, /enable row level security/g);
  assert.match(migration, /revoke all on table public\.exam_access_codes from public, anon, authenticated/);
  assert.match(migration, /revoke all on table public\.exam_access_code_redemptions from public, anon, authenticated/);
  assert.match(migration, /grant execute on function public\.redeem_exam_access_code\(text, text, text\)\s+to service_role/);
});

test('single-use consumption and five-hour classroom activation are atomic', () => {
  const migration = read('supabase/migrations/20260922004219_exam_access_codes.sql');
  assert.match(migration, /for update/);
  assert.match(migration, /delete from public\.exam_access_codes where id = selected_code\.id/);
  assert.match(migration, /expires_at = request_time \+ interval '5 hours'/);
  assert.match(migration, /unique \(exam_slug, attempt_ref\)/);
  assert.match(migration, /cleanup-expired-exam-access-codes/);
});

test('admin mutations authenticate on the server and never return stored secrets', () => {
  const actions = read('src/app/(site)/dashboard/admin/codigos-examen/actions.ts');
  const server = read('src/lib/exam-access-codes/server.ts');
  assert.match(actions, /await requireAdmin\(\)/g);
  assert.match(server, /createHash\('sha256'\)/);
  assert.match(server, /code_hint: code\.slice\(-4\)/);
  assert.doesNotMatch(server, /\.insert\(\{[^}]*\bcode:/s);
});

test('ICFES, IELTS, TOEFL and Goethe expose the code path before paid results', () => {
  const sources = [
    'src/components/icfes/IcfesLeadResultOffers.tsx',
    'src/components/exam-runner/IELTSSubmission.tsx',
    'src/components/exam-runner/TOEFLSubmission.tsx',
    'src/app/(site)/examenes/[exam]/practica/[mockId]/GoetheSubmission.tsx',
    'src/components/LeadCaptureModal.tsx',
  ].map(read).join('\n');
  for (const slug of ['icfes', 'ielts', 'toefl', 'goethe']) assert.match(sources, new RegExp(`examSlug: '${slug}'`));
  assert.match(sources, /Código de acceso/);
  assert.match(read('src/components/LeadCaptureModal.tsx'), /mandatory \? '🔒 Simulacro terminado · resultado protegido' : `🎯 Tu resultado: \$\{examScore\}`/);
  assert.match(read('src/components/exams/ExamResultOffers.tsx'), /XPRESS_OFFERS\.map/);
});

test('an ICFES institutional grant unlocks detail without faking purchase analytics', () => {
  const detail = read('src/app/api/icfes/attempts/[attemptId]/detail/route.ts');
  const client = read('src/app/(site)/practica/icfes-saber-11/resultados/[attemptId]/IcfesPaidResultClient.tsx');
  assert.match(detail, /exam_access_code_redemptions/);
  assert.match(detail, /accessSource: 'access-code'/);
  assert.match(client, /body\.accessSource !== 'access-code'/);
});

test('existing Xpress memberships and single-exam credits unlock results without consuming a code', () => {
  for (const serverFile of [
    'src/lib/ielts/submission.server.ts',
    'src/lib/toefl/submission.server.ts',
    'src/lib/goethe/submission.server.ts',
  ]) assert.match(read(serverFile), /xpressAccess: xpressAccess\.access/);

  for (const clientFile of [
    'src/components/exam-runner/IELTSSubmission.tsx',
    'src/components/exam-runner/TOEFLSubmission.tsx',
    'src/app/(site)/examenes/[exam]/practica/[mockId]/GoetheSubmission.tsx',
  ]) {
    const source = read(clientFile);
    assert.match(source, /completed\.xpressAccess !== 'public'/);
    assert.match(source, /if \(!access\.unlocked && accessCode\.trim\(\)\)/);
  }
});
