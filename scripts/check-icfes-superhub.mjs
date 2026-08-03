import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');
const questions = read('src/data/icfes/questions.ts');
const guided = read('src/data/icfes/guided-workbooks.ts');
const mocks = read('src/data/mocks/icfes-simulacros.ts');
const sitemap = read('src/app/sitemap.ts');
const migration = read('supabase/migrations/20260803_icfes_practice_engine.sql');
const partOneLesson = read('src/data/icfes/part-one-lesson.ts');

for (let part = 1; part <= 7; part += 1) {
  const count = (questions.match(new RegExp(`officialPart: ${part}`, 'g')) ?? []).length;
  assert.ok(count >= 3, `Parte ${part}: se esperaban al menos 3 preguntas revisadas; encontradas ${count}`);
}

for (let question = 1; question <= 25; question += 1) {
  assert.match(guided, new RegExp(`^  ${question}:`, 'm'), `Falta revisión del cuadernillo 2023, pregunta ${question}`);
}
assert.match(guided, /return exam\.questions\.map/, 'El modo guiado debe convertir el cuadernillo completo');
assert.doesNotMatch(guided, /questions\.slice\(0,\s*5\)/, 'El modo guiado volvió a ser un piloto de cinco preguntas');

const mockIds = mocks.match(/id: 'icfes-[^']+'/g) ?? [];
const explicitRanges = mocks.match(/partRanges:\s*\[/g) ?? [];
assert.equal(explicitRanges.length, mockIds.length, 'Cada simulacro debe tener partRanges explícitos');

for (const route of ['diagnostico', 'plan-de-estudio', 'pregunta-del-dia', 'vocabulario', 'examenes/icfes-2023-g11/guiado']) {
  assert.ok(sitemap.includes(route), `Falta ${route} en sitemap`);
}

for (const table of ['icfes_practice_sessions', 'icfes_practice_attempts', 'icfes_skill_mastery', 'icfes_error_queue']) {
  assert.match(migration, new RegExp(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY`), `${table} debe habilitar RLS`);
}
assert.match(migration, /REVOKE ALL ON FUNCTION record_icfes_practice_attempt[\s\S]+FROM PUBLIC/, 'La función RPC no debe quedar ejecutable por anon/public');

assert.equal((partOneLesson.match(/decisiveClue:/g) ?? []).length - 1, 20, 'La Parte 1 debe conservar 20 ejemplos guiados');
assert.equal((partOneLesson.match(/id: 'p1-/g) ?? []).length, 8, 'La Parte 1 debe conservar 8 ejercicios adicionales para progresión');
for (const stage of ['category', 'clue', 'distractors']) {
  assert.match(partOneLesson, new RegExp(`id: '${stage}'`), `Falta el nivel progresivo ${stage} de la Parte 1`);
}

const publicTruth = [
  read('src/data/examGuides.ts'),
  read('src/app/(site)/dashboard/student/StudentDashboardClient.tsx'),
  read('src/app/(site)/practica/icfes-saber-11/layout.tsx'),
].join('\n');
assert.doesNotMatch(publicTruth, /La prueba de Inglés del ICFES Saber 11 tiene 45 preguntas/i);
assert.doesNotMatch(publicTruth, /ICFES Nivel C1/i);
assert.doesNotMatch(publicTruth, /solo evalúa comprensión de lectura/i);

console.log('Superhub ICFES íntegro: 7 partes, Parte 1 progresiva, 25 revisiones guiadas, rangos explícitos, SEO y RLS verificados.');
