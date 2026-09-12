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
import { GOETHE_PRACTICE_TEILE, goethePracticeSections, parseGoethePracticeTeil } from '../src/lib/goethe/practice.ts';

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
    expectedCounts.forEach((questionCount, index) => {
      const teil = index + 1;
      const sections = goethePracticeSections(mock, skill, teil);
      assert.equal(sections.length, 1, `${mock.id} ${skill} Teil ${teil}: debe aislar una sola sección`);
      assert.equal(sections[0].questions.length, questionCount, `${mock.id} ${skill} Teil ${teil}: cantidad de tareas incorrecta`);
    });
  }
}

const librarySource = fs.readFileSync(path.join(root, 'src/app/(site)/practica/goethe/[skill]/page.tsx'), 'utf8');
const routeSource = fs.readFileSync(path.join(root, 'src/app/(site)/examenes/[exam]/practica/[mockId]/page.tsx'), 'utf8');
const runnerSource = fs.readFileSync(path.join(root, 'src/app/(site)/examenes/[exam]/practica/[mockId]/GoetheA1PracticeClient.tsx'), 'utf8');

assert.match(librarySource, /&teil=\$\{teil\.teil\}/, 'La biblioteca no enlaza cada Teil');
assert.match(routeSource, /parseGoethePracticeTeil\(skill, query\.teil\)/, 'La ruta no valida el Teil solicitado');
assert.match(runnerSource, /goethePracticeSections\(mock, practiceSkill, practicePart\)/, 'El runner no filtra el material del Teil');
assert.match(runnerSource, /no equivale a un puntaje oficial Goethe/, 'Falta distinguir el resultado parcial del puntaje oficial');
assert.match(runnerSource, /showListeningEvidence/, 'La práctica de Hören perdió la evidencia posterior a la entrega');

console.log('Práctica Goethe íntegra: 7 sets × 4 destrezas, 11 Teile aislables y feedback posterior protegido.');
