import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import set1 from '../src/data/mocks/goethe-a1-set-1.ts';
import set2 from '../src/data/mocks/goethe-a1-set-2.ts';
import set3 from '../src/data/mocks/goethe-a1-set-3.ts';
import set4 from '../src/data/mocks/goethe-a1-set-4.ts';
import set5 from '../src/data/mocks/goethe-a1-set-5.ts';
import set6 from '../src/data/mocks/goethe-a1-set-6.ts';
import set7 from '../src/data/mocks/goethe-a1-set-7.ts';
import { GOETHE_PRACTICE_TEILE, goethePracticeHref, goethePracticeSections, nextGoethePractice, parseGoethePracticeTeil } from '../src/lib/goethe/practice.ts';

const root = path.resolve(import.meta.dirname, '..');
const sets = [set1, set2, set3, set4, set5, set6, set7];
const expectedQuestionCounts = {
  listening: [6, 4, 5],
  reading: [5, 5, 5],
  writing: [1, 1],
  speaking: [1, 1, 1],
};

for (const [skill, expectedCounts] of Object.entries(expectedQuestionCounts)) {
  assert.equal(GOETHE_PRACTICE_TEILE[skill].length, expectedCounts.length, `${skill}: catálogo de Teile incompleto`);
  assert.equal(parseGoethePracticeTeil(skill, String(expectedCounts.length + 1)), undefined, `${skill}: acepta un Teil inexistente`);
}

for (const mock of sets) {
  for (const [skill, expectedCounts] of Object.entries(expectedQuestionCounts)) {
    const completeSections = goethePracticeSections(mock, skill);
    assert.equal(completeSections.length, expectedCounts.length, `${mock.id} ${skill}: cantidad de Teile incorrecta`);
    const followingSet = sets.find(candidate => Number(candidate.id.split('-')[1]) === Number(mock.id.split('-')[1]) + 1);
    assert.equal(
      nextGoethePractice(mock.id, skill)?.href,
      followingSet ? goethePracticeHref(followingSet.id, skill) : undefined,
      `${mock.id} ${skill}: continuidad de destreza completa incorrecta`,
    );
    expectedCounts.forEach((questionCount, index) => {
      const teil = index + 1;
      const sections = goethePracticeSections(mock, skill, teil);
      assert.equal(sections.length, 1, `${mock.id} ${skill} Teil ${teil}: debe aislar una sola sección`);
      assert.equal(sections[0].questions.length, questionCount, `${mock.id} ${skill} Teil ${teil}: cantidad de tareas incorrecta`);
      const nextHref = teil < expectedCounts.length
        ? goethePracticeHref(mock.id, skill, teil + 1)
        : followingSet ? goethePracticeHref(followingSet.id, skill, 1) : undefined;
      assert.equal(nextGoethePractice(mock.id, skill, teil)?.href, nextHref, `${mock.id} ${skill} Teil ${teil}: continuidad incorrecta`);
    });
  }
}

assert.equal(
  goethePracticeHref('a1-2', 'reading', 3),
  '/examenes/goethe/practica/a1-2?mode=practice&skill=reading&teil=3',
  'La navegación contextual no conserva set, destreza y Teil',
);
assert.deepEqual(nextGoethePractice('a1-2', 'reading', 1), {
  href: goethePracticeHref('a1-2', 'reading', 2),
  label: 'Continuar con Teil 2',
});
assert.deepEqual(nextGoethePractice('a1-2', 'writing', 2), {
  href: goethePracticeHref('a1-3', 'writing', 1),
  label: 'Continuar con Set 3 · Teil 1',
});
assert.deepEqual(nextGoethePractice('a1-2', 'listening'), {
  href: goethePracticeHref('a1-3', 'listening'),
  label: 'Continuar con Set 3',
});
assert.equal(nextGoethePractice('a1-7', 'speaking', 3), undefined, 'El último Teil no debe enlazar a Set 8');
assert.equal(nextGoethePractice('a1-7', 'speaking'), undefined, 'La última destreza completa no debe enlazar a Set 8');

const librarySource = fs.readFileSync(path.join(root, 'src/app/(site)/practica/goethe/[skill]/page.tsx'), 'utf8');
const routeSource = fs.readFileSync(path.join(root, 'src/app/(site)/examenes/[exam]/practica/[mockId]/page.tsx'), 'utf8');
const runnerSource = fs.readFileSync(path.join(root, 'src/app/(site)/examenes/[exam]/practica/[mockId]/GoetheA1PracticeClient.tsx'), 'utf8');

assert.match(librarySource, /&teil=\$\{teil\.teil\}/, 'La biblioteca no enlaza cada Teil');
assert.match(routeSource, /parseGoethePracticeTeil\(skill, query\.teil\)/, 'La ruta no valida el Teil solicitado');
assert.match(routeSource, /key=\{`\$\{mock\.id\}:\$\{skill \?\? 'exam'\}:\$\{practicePart \?\? 'all'\}`\}/, 'La navegación entre Teile debe reiniciar el estado del runner');
assert.match(runnerSource, /goethePracticeSections\(mock, practiceSkill, practicePart\)/, 'El runner no filtra el material del Teil');
assert.match(runnerSource, /no equivale a un puntaje oficial Goethe/, 'Falta distinguir el resultado parcial del puntaje oficial');
assert.match(runnerSource, /showListeningEvidence/, 'La práctica de Hören perdió la evidencia posterior a la entrega');
assert.match(runnerSource, /nextGoethePractice\(mock\.id, practiceSkill, practicePart\)/, 'El runner no ofrece continuidad contextual');

console.log('Práctica Goethe íntegra: 7 sets × 4 destrezas, 11 Teile aislables y feedback posterior protegido.');
