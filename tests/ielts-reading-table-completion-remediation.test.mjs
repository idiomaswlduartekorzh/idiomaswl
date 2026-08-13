import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { IELTS_TABLE_COMPLETION_REMEDIATED_PASSAGES } from '../src/data/practica-exams/ielts-table-completion-remediated.ts';
import { IELTS_READING_RIGHTS_REGISTRY } from '../src/data/practica-exams/ielts-reading-rights-registry.ts';
import { assessIeltsReadingRights } from '../src/lib/ielts/academic-reading-rights.ts';

const pageSource = readFileSync(
  new URL('../src/app/(site)/practica/ielts/reading/tipos-de-preguntas/table-completion/page.tsx', import.meta.url),
  'utf8',
);
const engineSource = readFileSync(
  new URL('../src/components/exam-practice/TableCompletionEngine.tsx', import.meta.url),
  'utf8',
);

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value === null || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.keys(value).sort().map((key) => [key, stableValue(value[key])]),
  );
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function assetIdentity(passage) {
  return {
    assetId: `formative:table-completion:${passage.id}`,
    sourceObjectSha256: sha256(JSON.stringify(stableValue(passage))),
    passageSha256: sha256(passage.passage.normalize('NFKC').replace(/\s+/gu, ' ').trim()),
  };
}

function blankById(questionId) {
  for (const passage of IELTS_TABLE_COMPLETION_REMEDIATED_PASSAGES) {
    for (const row of passage.rows) {
      for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex += 1) {
        const cell = row.cells[cellIndex];
        if (cell.type === 'blank' && `${row.id}-${cellIndex}` === questionId) return cell;
      }
    }
  }
  throw new Error(`Missing Table blank: ${questionId}`);
}

test('the four material findings have explicit candidate remediations', () => {
  const coolingDirection = blankById('table-cooling-01-2');
  assert.deepEqual(
    { before: coolingDirection.before, after: coolingDirection.after, answer: coolingDirection.answer },
    {
      before: 'Openings should face the correct ',
      after: ' for effective airflow.',
      answer: 'direction',
    },
  );

  const coolingGlass = blankById('table-cooling-03-1');
  assert.equal(coolingGlass.before, 'External shade stops heat before it enters window ');
  assert.equal(coolingGlass.answer, 'glass');

  const museumMeaning = blankById('table-museum-inventory-01-1');
  assert.equal(museumMeaning.before, "Records explain an object's identity, origin and why it ");
  assert.equal(museumMeaning.answer, 'matters');

  const museumPictures = blankById('table-museum-inventory-01-2');
  const museum = IELTS_TABLE_COMPLETION_REMEDIATED_PASSAGES.find((passage) =>
    passage.id === 'table-museum-inventory-v2');
  assert.equal(museumPictures.answer, 'pictures');
  assert.ok(museum);
  assert.doesNotMatch(museum.passage, /\bphotographs\b/iu);
  assert.match(museum.passage, /\bpostcards\b/iu);
});

test('all three current source identities have guided-practice authorization', () => {
  const decisions = IELTS_TABLE_COMPLETION_REMEDIATED_PASSAGES.map((passage) =>
    assessIeltsReadingRights(IELTS_READING_RIGHTS_REGISTRY, assetIdentity(passage)),
  );

  assert.equal(decisions.length, 3);
  assert.ok(IELTS_TABLE_COMPLETION_REMEDIATED_PASSAGES.every((passage) => passage.id.endsWith('-v2')));
  for (const decision of decisions) {
    assert.equal(decision.disposition, 'quarantine');
    assert.equal(decision.eligibleForPublicationPipeline, false);
    assert.equal(decision.rightsBasis, 'licensed');
    assert.doesNotMatch(decision.reasonCodes.join(','), /content-hash-mismatch/u);
    assert.ok(decision.reasonCodes.includes('authorship-unresolved'));
    assert.ok(!decision.reasonCodes.includes('rights-unresolved'));
    assert.ok(!decision.reasonCodes.includes('rights-evidence-incomplete'));
    assert.ok(decision.reasonCodes.includes('factual-review-incomplete'));
    assert.ok(decision.reasonCodes.includes('human-review-pending'));
    assert.deepEqual([...decision.reasonCodes].sort(), [
      'authorship-unresolved',
      'factual-review-incomplete',
      'human-review-pending',
    ]);
  }
});

test('the public route allows only the authorized guided-practice state', () => {
  assert.match(pageSource, /getTableCompletionPublicationState/u);
  assert.match(pageSource, /publicationState\.eligibleForGuidedPractice/u);
  assert.match(pageSource, /data-testid="table-completion-quarantine"/u);
  assert.match(pageSource, /los pasajes, preguntas y claves no se entregan al navegador/u);
  assert.match(pageSource, /No es un simulador Exam oficial/u);
  assert.doesNotMatch(pageSource, /textos originales de WeLearn|Banco original WeLearn|sin copiar preguntas oficiales/iu);
});

test('the guided runtime enforces its limit, supports repair and exposes accessible state', () => {
  assert.match(engineSource, /wordCount\(answers\[id\] \?\? ''\) > passage\.maxWords/u);
  assert.match(engineSource, /disabled=\{isChecked && isCorrect\}/u);
  assert.match(engineSource, /window\.localStorage\.setItem/u);
  assert.match(engineSource, /window\.confirm/u);
  assert.match(engineSource, /role="progressbar"/u);
  assert.match(engineSource, /aria-live="polite"/u);
  assert.match(engineSource, /aria-expanded=\{Boolean\(showHints\[id\]\)\}/u);
  assert.match(engineSource, /scope="row"/u);
  assert.match(engineSource, /<article lang="en"/u);
});
