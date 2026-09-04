import assert from 'node:assert/strict';

// Independent projection of the questions actually served to the browser.
export function objectiveRows(mock) {
  const rows = [];
  for (const section of mock.sections.filter(s => ['listening', 'reading'].includes(s.skill))) {
    assert.ok(!section.comingSoon, `${section.skill}: incomplete section`);
    for (const q of section.questions) {
      const add = (number, kind, key, accepted, weight = 1, options) => rows.push({
        skill: section.skill, number, kind, key, accepted, weight, ...(options ? { options } : {}),
      });
      const optionMap = options => Object.fromEntries(options.map(o => [o.letter, `${o.letter}. ${o.text}`]));
      if (q.type === 'formgroup') {
        const markers = [...q.template.matchAll(/\{\{(\d+)\}\}/g)].map(m => Number(m[1]));
        assert.deepEqual(markers.slice().sort((a,b) => a-b), q.blanks.map(b => b.num).sort((a,b) => a-b), `${q.id}: visible blanks mismatch`);
        q.blanks.forEach(b => add(b.num, 'fill', `${q.id}__${b.num}`, b.answers));
      } else if (q.type === 'tablegroup') {
        q.rows.flat().filter(c => typeof c !== 'string').forEach(c => add(c.num, 'fill', `${q.id}__${c.num}`, c.answers));
      } else if (q.type === 'multiselect') {
        assert.equal(q.selectCount, q.qRange[1] - q.qRange[0] + 1, `${q.id}: point count`);
        assert.equal(q.answers.length, q.selectCount, `${q.id}: key count`);
        assert.equal(new Set(q.answers).size, q.selectCount, `${q.id}: duplicate key`);
        add(q.qRange[0], 'multiselect', q.id, q.answers, q.selectCount, optionMap(q.options));
      } else if (q.type === 'matching') {
        q.items.forEach(i => add(i.num, 'match', `${q.id}__${i.num}`, [i.answer], 1, optionMap(q.endings)));
      } else if (q.type === 'mcq' || q.type === 'dialog') {
        add(Number(q.id.match(/q(\d+)$/i)?.[1]), 'mcq', q.id, [q.answer], 1, q.options);
      } else assert.fail(`Unsupported objective type: ${q.type}`);
    }
  }
  return rows;
}

export function auditObjectiveKey(mock, fixture) {
  assert.equal(mock.id, fixture.mockId);
  const rows = objectiveRows(mock);
  const expected = fixture.questions.map(q => ({ skill: q.skill, number: q.sortNumber,
    kind: q.responseKind, key: q.responseKey, accepted: q.acceptedAnswers, weight: q.weight,
    ...(q.options || q.optionMap ? { options: q.options ?? q.optionMap } : {}),
  }));
  assert.deepEqual(rows, expected, 'Live question identities, accepted answers, weights or option ordering differ from approved evidence');
  for (const skill of ['listening', 'reading']) {
    const numbers = rows.filter(r => r.skill === skill).flatMap(r => Array.from({length:r.weight}, (_,i) => r.number + i));
    assert.deepEqual(numbers, Array.from({length:40}, (_,i) => i+1), `${skill}: Q1-Q40 exactly once and in order`);
  }
  return rows;
}

// Parse JSON from Next's public RSC stream; never evaluate page scripts.
export function mockFromPublicHtml(html, mockId) {
  const stream = [...html.matchAll(/self\.__next_f\.push\((\[.*?\])\)<\/script>/gs)]
    .map(m => JSON.parse(m[1])).filter(c => c[0] === 1).map(c => c[1]).join('');
  const marker = '"mock":{"id":"' + mockId + '"';
  const start = stream.indexOf(marker);
  assert.ok(start >= 0, `Public RSC mock missing: ${mockId}`);
  const offset = start + '"mock":'.length;
  let depth = 0, quoted = false, escape = false;
  for (let i = offset; i < stream.length; i++) {
    const ch = stream[i];
    if (quoted) {
      if (escape) escape = false;
      else if (ch === '\\') escape = true;
      else if (ch === '"') quoted = false;
    } else if (ch === '"') quoted = true;
    else if (ch === '{') depth++;
    else if (ch === '}' && --depth === 0) return JSON.parse(stream.slice(offset, i+1));
  }
  assert.fail('Incomplete public mock JSON');
}
