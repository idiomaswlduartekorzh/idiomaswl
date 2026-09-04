// Diagnostic only: does not modify questions, keys, audio, or release gates.
// Run from the USB worktree with the existing tests/ts-paths-loader.mjs.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { getMock } from '../src/data/mocks/index.ts';
import { TOEFL_FIXED_LISTENING_BY_SET as fixed } from '../src/data/toefl/listening-fixed-registry.ts';
import { legacyFixedListeningItemId, fixedListeningOptionId } from '../src/data/toefl/listening-fixed-types.ts';

const root = new URL('../', import.meta.url);
const sourceHashes = [];
function readSource(path) {
  const source = readFileSync(new URL(path, root), 'utf8');
  sourceHashes.push({ path, sha256: createHash('sha256').update(source).digest('hex') });
  return source;
}
const labels = new Map();
for (const batch of ['1-5', '6-10', '11-15', '16-20']) {
  const source = readSource(`src/server/toefl/listening-fixed-sets-${batch}.ts`);
  readSource(`src/data/toefl/listening-fixed-sets-${batch}.ts`);
  const block = source.slice(source.indexOf('const KEY_LABELS'), source.indexOf('function orderedItems'));
  for (const match of block.matchAll(/^\s*(\d+): \[([^\]]+)\]/gm)) {
    labels.set(Number(match[1]), Array.from(match[2].matchAll(/'([^']+)'/g), entry => entry[1]));
  }
}
const rows = [];
export const auditItems = [];
for (let set = 1; set <= 20; set++) {
  readSource(`src/data/mocks/toefl-set-${set}.ts`);
  const raw = (await import(`../src/data/mocks/toefl-set-${set}.ts`)).default;
  const sections = raw.sections.filter(s => s.skill === 'listening');
  const keys = new Map();
  // Mirrors the private registry's explicit legacy selection, without importing
  // server-only code into a browser or changing its runtime boundary.
  for (const [index, limit] of [[0, 5], [1, 4], [2, 2], [3, 4]]) {
    for (const q of sections[index].questions.filter(q => q.type === 'mcq' || q.type === 'dialog').slice(0, limit)) {
      const id = legacyFixedListeningItemId(q.id);
      keys.set(id, { id: fixedListeningOptionId(id, q.answer), origin: 'legacy' });
    }
  }
  assert.equal(keys.size, 15);
  const f = fixed[set];
  const added = [...f.module1ChooseAdditions.map(e => e.item), ...f.module2.choose.map(e => e.item),
    ...f.module2.conversation.items, ...f.module2.announcement.items, ...f.module2.academic.items];
  assert.equal(added.length, 19);
  assert.equal(labels.get(set)?.length, 19);
  added.forEach((q, i) => keys.set(q.id, {
    id: fixedListeningOptionId(q.id, labels.get(set)[i].charCodeAt(0) - 65), origin: 'expansion',
  }));
  const normalized = getMock('toefl', `set-${set}`).sections.filter(s => s.skill === 'listening');
  for (const [sectionIndex, section] of normalized.entries()) {
    const family = ['response', 'conversation', 'announcement', 'academic'][sectionIndex % 4];
    for (const q of section.questions) {
      const key = keys.get(q.id);
      assert.ok(key, q.id);
      assert.equal(q.options.length, 4);
      const correct = q.options.findIndex(o => o.id === key.id);
      assert.ok(correct >= 0);
      auditItems.push({ set, family, id: q.id, correct, options: q.options.map(o => o.text), optionIds: q.options.map(o => o.id), prompt: q.text, audioUrl: q.audioUrl ?? section.audioUrl });
      const words = q.options.map(o => (o.text.match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g) ?? []).length);
      const chars = q.options.map(o => Array.from(o.text.normalize('NFC').trim()).length);
      const summarize = lengths => ({
        unique: lengths[correct] > Math.max(...lengths.filter((_, i) => i !== correct)),
        tied: lengths[correct] === Math.max(...lengths) && lengths.filter(x => x === lengths[correct]).length > 1,
        firstLongestWins: lengths.indexOf(Math.max(...lengths)) === correct,
      });
      const distractorMean = words.filter((_, i) => i !== correct).reduce((a, b) => a + b, 0) / 3;
      // No option text, key, or per-option lengths are emitted in this report.
      rows.push({ set, id: q.id, origin: key.origin, family, module: section.moduleId,
        words: summarize(words), chars: summarize(chars),
        largeAdvantage: words[correct] / distractorMean >= 2 && words[correct] - distractorMean >= 3 });
    }
  }
}
assert.equal(rows.length, 680);
assert.equal(new Set(rows.map(r => r.id)).size, 680);
function stats(group) {
  return { questions: group.length,
    uniqueWords: group.filter(r => r.words.unique).length,
    tiedWords: group.filter(r => r.words.tied).length,
    uniqueChars: group.filter(r => r.chars.unique).length,
    tiedChars: group.filter(r => r.chars.tied).length,
    firstLongestWordsWins: group.filter(r => r.words.firstLongestWins).length,
    firstLongestCharsWins: group.filter(r => r.chars.firstLongestWins).length,
    largeAdvantage: group.filter(r => r.largeAdvantage).length };
}
for (const path of ['src/server/toefl/listening-registry.ts', 'src/data/mocks/toefl-fixed-form.ts',
  'src/data/toefl/sectional-listening-adapter.ts', 'scripts/check-toefl-fixed-listening.mjs']) readSource(path);
export const report = { status: 'diagnostic-draft-not-human-approval',
  scope: 'Current USB branch; 20 normalized Listening sets, 34 items each; not verified deployed production.',
  definitions: { unique: 'Correct option strictly longer than all distractors; ties excluded.',
    words: 'English alphabetic tokens with optional straight/curly apostrophes.',
    chars: 'NFC Unicode code points in trimmed text, including internal spaces and punctuation.',
    heuristic: 'Choose longest; break ties by first displayed option. Deterministic calculation, not learner results.' },
  overall: stats(rows), bySet: Array.from({ length: 20 }, (_, i) => ({ set: i + 1, ...stats(rows.filter(r => r.set === i + 1)) })),
  byOrigin: ['legacy', 'expansion'].map(origin => ({ origin, ...stats(rows.filter(r => r.origin === origin)) })),
  byFamily: ['response', 'conversation', 'announcement', 'academic'].map(family => ({ family, ...stats(rows.filter(r => r.family === family)) })),
  firstFiveSet1: stats(rows.filter(r => r.set === 1).slice(0, 5)),
  firstTenAuditRows: rows.slice(0, 10), sourceHashes };
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) console.log(JSON.stringify(report, null, 2));
