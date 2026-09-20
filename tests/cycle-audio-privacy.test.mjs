import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('lesson audio only signs known lesson IDs', () => {
  const route = read('src/app/api/practica/lesson-audio/[textId]/route.ts');
  const player = read('src/app/(site)/practica/KoreanCycle.tsx');
  assert.match(route, /new Set\(CYCLE_TEXTS\.map/);
  assert.match(route, /LESSON_IDS\.has\(id\)/);
  assert.match(route, /createSignedUrl\(`textos\/\$\{id\}\.mp3`, 60\)/);
  assert.match(player, /const AUDIO_BASE = '\/api\/practica\/lesson-audio'/);
  assert.doesNotMatch(player, /object\/public\/cycle-audio/);
});

test('student recordings require verified admin and never use public URLs', () => {
  const route = read('src/app/api/admin/cycle-audio/[submissionId]/route.ts');
  const upload = read('src/app/api/practica/submit-audio/route.ts');
  const panel = read('src/app/(site)/dashboard/admin/audios/AudiosAdmin.tsx');
  assert.match(route, /isVerifiedAdminUser\(user\)/);
  assert.match(route, /\.select\('audio_path'\)/);
  assert.match(route, /createSignedUrl\(/);
  assert.match(upload, /crypto\.randomUUID\(\)/);
  assert.match(upload, /submissions\/\$\{submissionId\}/);
  assert.doesNotMatch(upload, /getPublicUrl/);
  assert.doesNotMatch(panel, /s\.audio_url/);
  assert.match(panel, /\/api\/admin\/cycle-audio\/\$\{s\.id\}/);
});

test('migration closes public Storage and direct table inserts', () => {
  const migration = read('supabase/migrations/20260920032155_private_cycle_audio.sql');
  assert.match(migration, /SET public = false/);
  assert.match(migration, /DROP POLICY IF EXISTS "Public read cycle audio"/);
  assert.match(migration, /DROP POLICY IF EXISTS "Public upload cycle audio"/);
  assert.match(migration, /DROP POLICY IF EXISTS "Anyone can submit audio"/);
  assert.match(migration, /REVOKE INSERT ON public\.cycle_submissions FROM anon, authenticated/);
});
