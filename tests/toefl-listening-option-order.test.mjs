import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import test from 'node:test';
import { auditItems } from '../docs/toefl-listening-length-audit-draft.mjs';
import { getMock } from '../src/data/mocks/index.ts';
import { selectToeflListeningPractice } from '../src/data/toefl/sectional-listening-adapter.ts';
import { buildToeflFixedStages } from '../src/lib/toefl/fixed-session.ts';
import { scoreToeflListeningAttempt } from '../src/lib/toefl/listening-contract.ts';
import { CURRENT_LISTENING_ORDER, LEGACY_LISTENING_ORDER, listeningDisplayOptions, restoreListeningOrderVersion } from '../src/data/toefl/listening-option-order.ts';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const candidateText = read('docs/toefl-listening-set1-order-candidate.json');
const candidate = JSON.parse(candidateText);
const mock = getMock('toefl', 'set-1');
const questions = mock.sections.filter(s => s.skill === 'listening').flatMap(s => s.questions);
const snapshot = JSON.stringify(mock);
const keys = new Map(auditItems.map(q => [q.id, q.optionIds[q.correct]]));

test('display order matches the exact three permutations approved by both reviewers', () => {
  const digest = createHash('sha256').update(candidateText).digest('hex');
  assert.equal(digest, '25cb54f3f6610376520904f4eb7ed549430bfb27f7fb276135f6e2a788219f42');
  const reviews = JSON.parse(read('docs/toefl-sectional-review-log.json')).reviews;
  for (const [gateId, reviewer] of [['HR-06-SET1-ORDER-PRODUCT', 'David Duarte'], ['HR-06-SET1-ORDER-ACADEMIC', 'Zhanna Korzh']]) {
    const review = reviews.find(r => r.gateId === gateId);
    assert.equal(review?.decision, 'approved');
    assert.equal(review.reviewer, reviewer);
    assert.equal(review.contentDigest, digest);
    for (const e of review.supportingEvidence) assert.equal(createHash('sha256').update(read(e.path)).digest('hex'), e.sha256);
  }
  for (const q of questions) {
    const projected = listeningDisplayOptions(q, CURRENT_LISTENING_ORDER);
    const change = candidate.items.find(r => r.itemId === q.id);
    assert.deepEqual(projected.map(o => o.id), change?.proposedOptionIds ?? q.options.map(o => o.id));
    assert.deepEqual(projected.map(o => o.label), ['A', 'B', 'C', 'D']);
    assert.deepEqual(projected.map(o => [o.id, o.text]).sort(), q.options.map(o => [o.id, o.text]).sort());
    assert.deepEqual(listeningDisplayOptions(q, LEGACY_LISTENING_ORDER), q.options);
  }
  assert.equal(JSON.stringify(mock), snapshot);
});

test('new full and sectional attempts share the approved positions; other sets are untouched', () => {
  const full = buildToeflFixedStages(mock).filter(s => s.skill === 'listening').flatMap(s => s.sections.flatMap(s => s.questions));
  const sectional = selectToeflListeningPractice(mock).sections.flatMap(s => s.questions);
  const present = qs => qs.map(q => listeningDisplayOptions(q, CURRENT_LISTENING_ORDER));
  assert.deepEqual(present(full), present(sectional));
  const labels = questions.map(q => listeningDisplayOptions(q, CURRENT_LISTENING_ORDER).find(o => o.id === keys.get(q.id)).label);
  const counts = ls => ['A', 'B', 'C', 'D'].map(letter => ls.filter(x => x === letter).length);
  assert.deepEqual(counts(labels.slice(0, 8)), [2, 2, 2, 2]);
  assert.deepEqual(counts(labels), [8, 8, 9, 9]);
  for (let n = 2; n <= 20; n++) {
    for (const q of getMock('toefl', `set-${n}`).sections.filter(s => s.skill === 'listening').flatMap(s => s.questions)) {
      assert.strictEqual(listeningDisplayOptions(q, CURRENT_LISTENING_ORDER), q.options);
    }
  }
});

test('existing snapshots remain legacy; new snapshots keep their order and selected IDs on roundtrip', () => {
  for (const schemaVersion of [1, 2, 3, 4]) {
    for (const orderVersion of [undefined, LEGACY_LISTENING_ORDER, CURRENT_LISTENING_ORDER]) {
      const saved = JSON.parse(JSON.stringify({ version: schemaVersion, attemptId: 'preserved', listeningOrderVersion: orderVersion,
        answers: { 'item:t1-l-cr4-fixed-v1': 'item:t1-l-cr4-fixed-v1:option-a' } }));
      const restored = restoreListeningOrderVersion(saved.listeningOrderVersion);
      assert.equal(restored, orderVersion === CURRENT_LISTENING_ORDER ? CURRENT_LISTENING_ORDER : LEGACY_LISTENING_ORDER);
      const displayed = listeningDisplayOptions(questions[3], restored);
      const selected = displayed.find(o => o.id === saved.answers[questions[3].id]);
      assert.equal(selected.text, "Of course—I'll email you the details.");
      assert.equal(selected.label, restored === CURRENT_LISTENING_ORDER ? 'D' : 'A');
      const resaved = JSON.parse(JSON.stringify({ ...saved, listeningOrderVersion: restored }));
      assert.equal(restoreListeningOrderVersion(resaved.listeningOrderVersion), restored);
      assert.deepEqual(resaved.answers, saved.answers);
    }
  }
  for (const invalid of [null, 2, {}, 'future-version']) assert.equal(restoreListeningOrderVersion(invalid), LEGACY_LISTENING_ORDER);
});

test('all 136 selected option IDs retain their score; malformed permutations fail closed', () => {
  for (const q of questions) {
    const displayed = listeningDisplayOptions(q, CURRENT_LISTENING_ORDER);
    const config = options => ({ scoringVersion: 'test', disclosure: 'test', items: [{itemId:q.id, optionIds:options.map(o => o.id), correctOptionId:keys.get(q.id), maxRawPoints:1}] });
    for (const option of q.options) {
      const input = {attemptId:'test', closeId:'test', presentedItemIds:[q.id], responses:{[q.id]:option.id}};
      assert.deepEqual(scoreToeflListeningAttempt(config(q.options), input), scoreToeflListeningAttempt(config(displayed), input));
    }
  }
  const q = questions[3];
  for (const options of [q.options.slice(0, 3), Array(4).fill(q.options[0]), questions[0].options]) {
    assert.throws(() => listeningDisplayOptions({ ...q, options }, CURRENT_LISTENING_ORDER), /Invalid approved/);
  }
});

test('both runners persist/restore the version and select new order only at guarded start', () => {
  for (const path of [
    'src/app/(site)/practica/toefl/listening/simulacros/practica/[mockId]/ToeflListeningSectionRunner.tsx',
    'src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx',
  ]) {
    const code = read(path);
    assert.match(code, /useState<ListeningOrderVersion>\(LEGACY_LISTENING_ORDER\)/);
    assert.match(code, /setListeningOrderVersion\(restoreListeningOrderVersion\(saved.listeningOrderVersion\)\)/);
    assert.match(code, /JSON.stringify\(\{\s*version: [14],\s*listeningOrderVersion,/);
    assert.match(code, /if \(!hydrated\) return;\s*setListeningOrderVersion\(CURRENT_LISTENING_ORDER\)/);
    assert.match(code, /disabled=\{!hydrated\}/);
  }
});
