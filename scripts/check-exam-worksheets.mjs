import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

import { getMock } from '../src/data/mocks/index.ts';
import { examWorksheetSections, worksheetForMock } from '../src/lib/pdf/examWorksheetContent.ts';
import { goethePracticeSections } from '../src/lib/goethe/practice.ts';
import { CURRENT_LISTENING_ORDER, LEGACY_LISTENING_ORDER, listeningDisplayOptions } from '../src/data/toefl/listening-option-order.ts';

const root = path.resolve(import.meta.dirname, '..');
const skills = ['listening', 'reading', 'writing', 'speaking'];
let checked = 0;

for (const [exam, ids] of [
  ['goethe', Array.from({ length: 7 }, (_, index) => `a1-${index + 1}`)],
  ['toefl', Array.from({ length: 20 }, (_, index) => `set-${index + 1}`)],
]) {
  for (const id of ids) {
    const mock = getMock(exam, id);
    assert.ok(mock, `${exam} ${id} is missing`);
    const sections = worksheetForMock(mock);
    assert.equal(sections.length, mock.sections.length, `${exam} ${id}: section count`);
    for (const [index, section] of mock.sections.entries()) {
      assert.equal(sections[index].questions.length, section.questions.length, `${exam} ${id}: ${section.title} question count`);
      assert.equal(sections[index].instructions, section.instructions, `${exam} ${id}: section instructions`);
      assert.equal(sections[index].passage, section.passage, `${exam} ${id}: reading material`);
      for (const [questionIndex, question] of section.questions.entries()) {
        const printable = sections[index].questions[questionIndex].lines.join('\n');
        if (question.type === 'mcq' || question.type === 'toefl-reading-single' || question.type === 'toefl-reading-multi' || question.type === 'toefl-listening-single') {
          assert.ok(printable.includes(question.text), `${exam} ${id}: prompt missing (${question.id})`);
          for (const option of question.options) {
            assert.ok(printable.includes(typeof option === 'string' ? option : option.text), `${exam} ${id}: option missing (${question.id})`);
          }
        }
        if (question.type === 'wordcomplete') {
          for (const blank of question.blanks) assert.ok(printable.includes(`[${blank.num}]`), `${id}: missing word blank ${blank.num}`);
        }
        if (question.type === 'toefl-build-sentence') {
          for (const tile of question.tiles) assert.ok(printable.includes(tile.text), `${id}: missing sentence tile ${tile.text}`);
        }
        if (question.type === 'formgroup') {
          for (const blank of question.blanks) assert.ok(printable.includes(`[${blank.num}]`), `${id}: missing form field ${blank.num}`);
        }
      }
    }
    if (exam === 'goethe') {
      assert.equal(sections.length, 11, `${id}: full Goethe set must have eleven Teile`);
      for (const skill of skills) {
        for (const section of goethePracticeSections(mock, skill)) {
          const focused = examWorksheetSections(goethePracticeSections(mock, skill, section.part <= 3 ? section.part : section.part <= 6 ? section.part - 3 : section.part <= 8 ? section.part - 6 : section.part - 8), 'goethe');
          assert.equal(focused.length, 1, `${id}: focused ${skill} PDF includes another Teil`);
          assert.equal(focused[0].questions.length, section.questions.length, `${id}: focused ${skill} question count`);
        }
      }
      for (let number = 1; number <= 6; number += 1) {
        const suffixes = id === 'a1-1' ? ['jacke', 'uhrzeit', 'essen', 'flaschen', 'bibliothek', 'reise'] : id === 'a1-2' ? ['rucksack', 'uhrzeit', 'getraenk', 'postkarten', 'apotheke', 'flughafen'] : [];
        const image = path.join(root, 'public/images/goethe', id, `hoeren-teil1-${String(number).padStart(2, '0')}${suffixes[number - 1] ? `-${suffixes[number - 1]}` : ''}.png`);
        await access(image);
      }
    } else {
      assert.equal(sections.length, 21, `${id}: fixed TOEFL set must have 21 sections`);
      assert.equal(mock.sections.filter(section => section.skill === 'listening').flatMap(section => section.questions).length, 34, `${id}: focused Listening worksheet must contain 34 questions`);
    }
    checked += 1;
  }
}

const example = getMock('goethe', 'a1-1');
const poisoned = { ...example, sections: example.sections.map((section, index) => index === 0 ? {
  ...section,
  transcript: 'PRIVATE_TEACHER_TRANSCRIPT_CANARY',
  questions: section.questions.map((question, questionIndex) => questionIndex === 0 ? { ...question, answer: 'PRIVATE_KEY_CANARY', rationale: 'PRIVATE_SOLUTION_CANARY' } : question),
} : section) };
const studentText = JSON.stringify(worksheetForMock(poisoned));
for (const token of ['PRIVATE_TEACHER_TRANSCRIPT_CANARY', 'PRIVATE_KEY_CANARY', 'PRIVATE_SOLUTION_CANARY']) {
  assert.ok(!studentText.includes(token), `student worksheet leaked ${token}`);
}
const toefl = getMock('toefl', 'set-1');
const reordered = toefl.sections.flatMap(section => section.questions).find(question => question.type === 'toefl-listening-single' && question.id === 'item:t1-l-cr4-fixed-v1');
assert.ok(reordered, 'the approved TOEFL Listening permutation must remain in the source set');
for (const order of [CURRENT_LISTENING_ORDER, LEGACY_LISTENING_ORDER]) {
  const section = toefl.sections.find(item => item.questions.includes(reordered));
  const printable = examWorksheetSections([section], 'toefl', order).at(0).questions[section.questions.indexOf(reordered)];
  assert.deepEqual(printable.lines.slice(-4), listeningDisplayOptions(reordered, order).map(option => `${option.label}. ${option.text}`), `Listening worksheet order mismatch: ${order}`);
}
const repeat = toefl.sections.flatMap(section => section.questions).find(question => question.type === 'repeat');
assert.ok(repeat);
assert.ok(!JSON.stringify(worksheetForMock(toefl)).includes(repeat.targetSentence), 'TOEFL Listen and Repeat editorial sentence leaked');

for (const [file, expected] of [
  ['src/app/(site)/examenes/[exam]/practica/[mockId]/GoetheA1PracticeClient.tsx', 'generateExamWorksheetPdf(deliveryMock'],
  ['src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx', 'generateExamWorksheetPdf(mock'],
  ['src/app/(site)/practica/toefl/listening/simulacros/practica/[mockId]/ToeflListeningSectionRunner.tsx', 'generateExamWorksheetPdf({'],
]) {
  const source = await readFile(path.join(root, file), 'utf8');
  assert.ok(source.includes(expected), `${file}: download does not use the current mock`);
  assert.ok(source.includes('PdfDownloadButton'), `${file}: download button is missing`);
}

console.log(`✓ Student PDF contract: ${checked} sets, Goethe Teil scopes, TOEFL 34-item Listening, materials and key isolation`);
