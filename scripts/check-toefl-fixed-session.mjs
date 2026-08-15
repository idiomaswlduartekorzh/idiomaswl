import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const [client, session, composer] = await Promise.all([
  read('src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx'),
  read('src/lib/toefl/fixed-session.ts'),
  read('src/data/mocks/toefl-fixed-form.ts'),
]);

assert.doesNotMatch(client, /<SkillTabs\b/, 'the fixed runner has no free skill tabs');
assert.doesNotMatch(client, /<ExamReport\b|Overall Band|pctToBand|speakBands/, 'the fixed runner does not invent score conversions');
assert.doesNotMatch(client, /Notas de preparación|Apunta ideas/, 'Interview has no preparation notes');
assert.match(client, /version:\s*4/, 'the irreversible stage state is persisted');
assert.match(client, /startedMediaIds/, 'one-play media starts are persisted');
assert.match(client, /completedMediaIds/, 'completed media is persisted');
assert.match(client, /new MediaRecorder\(stream\)/, 'Speaking captures a real local microphone response');
assert.match(client, /No se sube, no se guarda al recargar y no recibe una nota/, 'Speaking capture privacy and evaluation limits are explicit');
assert.match(client, /Cerrar .*no podrás volver|no podrás volver a este bloque/, 'module closure is explicit');
assert.match(session, /'reading-1'[\s\S]*'reading-2'[\s\S]*'listening-1'[\s\S]*'listening-2'[\s\S]*'writing-build'[\s\S]*'writing-email'[\s\S]*'writing-discussion'[\s\S]*'speaking'/, 'all eight stages are ordered');
assert.match(session, /not-public-per-item/, 'unpublished per-item clocks stay undisclosed');
assert.match(composer, /There is no preparation time/, 'Interview runtime overrides the legacy prep instruction');

const changedPaths = execFileSync('git', ['status', '--porcelain=v1', '--untracked-files=all'], {
  cwd: new URL('.', root), encoding: 'utf8',
}).trim().split('\n').filter(Boolean).flatMap((entry) => {
  const path = entry.slice(3).replace(/^"|"$/g, '');
  return path.includes(' -> ') ? path.split(' -> ') : [path];
});
assert.ok(changedPaths.every((path) => !path.startsWith('public/audio/') && !/\.(mp3|wav|m4a|ogg)$/i.test(path)), 'runtime changes no audio asset');

console.log('✓ TOEFL fixed session: 8 irreversible stages, honest clocks/results, no audio changes');
