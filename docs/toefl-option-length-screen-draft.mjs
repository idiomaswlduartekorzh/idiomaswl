// Editorial screening proposal, not an ETS standard or an academic approval.
import assert from 'node:assert/strict';

export function screen(items) {
  assert.ok(items.length > 0, 'No items to screen');
  const totals = {};
  for (const metric of ['words', 'chars']) {
    for (const direction of ['longest', 'shortest']) {
      let unique = 0, tied = 0, expectedWins = 0, firstWins = 0;
      for (const item of items) {
        assert.equal(item.options.length, 4, item.id);
        assert.equal(new Set(item.options.map(s => s.trim().toLowerCase())).size, 4, item.id);
        assert.ok(item.options.every(s => s.trim().length > 0), item.id);
        assert.ok(Number.isInteger(item.correct) && item.correct >= 0 && item.correct < 4, item.id);
        const lengths = item.options.map(s => metric === 'words'
          ? (s.match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g) ?? []).length
          : Array.from(s.normalize('NFC').trim()).length);
        const extreme = direction === 'longest' ? Math.max(...lengths) : Math.min(...lengths);
        const matches = lengths.flatMap((n, i) => n === extreme ? [i] : []);
        if (matches.includes(item.correct)) {
          if (matches.length === 1) unique++; else tied++;
          expectedWins += 1 / matches.length;
        }
        if (matches[0] === item.correct) firstWins++;
      }
      const expectedRate = expectedWins / items.length;
      const firstRate = firstWins / items.length;
      totals[`${metric}_${direction}`] = { unique, tied, expectedRate, firstRate,
        flagged: items.length >= 16 && Math.max(expectedRate, firstRate) > 0.45 };
    }
  }
  return { questions: items.length, automaticScreenEligible: items.length >= 16,
    academicReviewRequired: true, totals };
}

export function selfTest() {
  const rows = (correct, options = ['a', 'bb cc', 'ddd eee fff', 'gggg hhhh iiii jjjj']) =>
    Array.from({ length: 20 }, (_, i) => ({ id: `test-${i}`, options, correct: typeof correct === 'function' ? correct(i) : correct }));
  assert.equal(screen(rows(3)).totals.words_longest.flagged, true);
  assert.equal(screen(rows(0)).totals.words_shortest.flagged, true);
  assert.equal(screen(rows(i => i % 4)).totals.words_longest.flagged, false);
  assert.equal(screen(rows(i => i % 4)).totals.words_shortest.flagged, false);
  const ties = screen(rows(i => i % 4, ['aa bb', 'cc dd', 'ee ff', 'gg hh']));
  assert.equal(ties.totals.words_longest.unique, 0);
  assert.equal(ties.totals.words_longest.expectedRate, 0.25);
  assert.equal(ties.totals.words_longest.flagged, false);
  assert.equal(screen(rows(0, ['aa bb', 'cc dd', 'ee ff', 'gg hh'])).totals.words_longest.flagged, true);
  assert.equal(screen(rows(3).slice(0, 15)).totals.words_longest.flagged, false);
  assert.throws(() => screen([]));
  assert.throws(() => screen(rows(4)));
  assert.throws(() => screen(rows(0, ['a', 'a', 'b', 'c'])));
  assert.throws(() => screen(rows(0, ['', 'a', 'b', 'c'])));
  assert.throws(() => screen(rows(0, ['a', 'b', 'c'])));
  return 'passed';
}
