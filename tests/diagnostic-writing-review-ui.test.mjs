import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const page = await readFile(new URL('../src/app/(site)/dashboard/admin/nivel-radar/page.tsx', import.meta.url), 'utf8');
const client = await readFile(new URL('../src/app/(site)/dashboard/admin/nivel-radar/DiagnosticWritingReviewClient.tsx', import.meta.url), 'utf8');
const route = await readFile(new URL('../src/app/api/admin/diagnostic/attempts/[attemptId]/finalize/route.ts', import.meta.url), 'utf8');
const repository = await readFile(new URL('../src/server/diagnostic/repository.server.ts', import.meta.url), 'utf8');

test('review queue is admin-only and hides automated judgments during first blind review', () => {
  assert.ok(page.indexOf('await requireAdmin()') < page.indexOf('loadDiagnosticWritingReviewQueue()'));
  assert.match(page, /const adjudication = row\.status === 'adjudication'/);
  assert.match(page, /row\.automatedEvaluation \? \{ automated:/);
  assert.match(repository, /\.in\('status', \['pending', 'automated-scored', 'human-review', 'adjudication'\]\)/);
  assert.doesNotMatch(repository, /user_email|full_name/);
  assert.match(page, /getDiagnosticWritingProviderReadiness\(\)/);
  assert.match(page, /No se enviará ninguna respuesta/);
});

test('client submits only human evidence and enforces literal citations before sending', () => {
  assert.doesNotMatch(client, /automated:\s*active\.automated/);
  assert.match(client, /active\.responseText\.includes\(item\.evidence\[0\]\)/);
  assert.match(client, /adjudicating \? \{ adjudicated: evaluation \} : \{ human: evaluation \}/);
  assert.match(client, /active\.human\?\.reviewerId === currentReviewerId/);
  assert.match(client, /item\.status === 'pending' \? 'Revisión humana'/);
  assert.match(client, /item\.status === 'human-review' \? 'Listo para publicar'/);
  assert.match(client, /JSON\.stringify\(reviewed \? \{\}/);
  assert.match(client, /Reintenta la publicación sin volver a calificar/);
  assert.match(page, /screenDiagnosticWritingResponse\(prompt, row\.responseText\)/);
  assert.match(client, /Esto no prueba plagio/);
  assert.match(client, /responseQuality\.taskRelevance !== 'on-task'/);
  assert.match(client, /responseQuality:\s*\{/);
});

test('server validates human evidence before its first immutable persistence', () => {
  const validation = route.indexOf('validateDiagnosticWritingEvaluation(human');
  const persistence = route.indexOf('persistDiagnosticHumanWritingEvaluation({');
  assert.ok(validation > 0 && persistence > validation);
  assert.match(route, /RUBRIC_VERSION_CONFLICT/);
  assert.match(route, /INDEPENDENT_ADJUDICATOR_REQUIRED/);
  assert.match(route, /finalization\.automatedEvaluation === null/);
  assert.match(route, /human\.decision !== 'accept'/);
});
