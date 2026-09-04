import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { auditObjectiveKey, mockFromPublicHtml } from './lib/ielts-answer-key-audit.mjs';
import { getIeltsReviewBlueprint } from '../src/lib/ielts/review-blueprint.ts';

const args = Object.fromEntries(process.argv.slice(2).map(a => { const [k,...v] = a.replace(/^--/,'').split('='); return [k,v.join('=')]; }));
for (const key of Object.keys(args)) assert.ok(['set','url','html'].includes(key), `Unknown flag: ${key}`);
const mockId = `set-${args.set ?? '1'}`;
// Extend only after a separate content audit; never derive a new fixture from the live key being tested.
const registry = { 'set-1': { version:'ielts-set-1-v2', sha256:'d0df0d94e2e39bdf4af4ec8281bee039f5219db261b73a3dcc9cd9a90b069f1e' } };
const approved = registry[mockId];
assert.ok(approved, `${mockId}: NOT_AUDITED — independent evidence and approval required`);
const bytes = fs.readFileSync(new URL(`../tests/fixtures/ielts/${mockId}-approved.json`, import.meta.url));
assert.equal(createHash('sha256').update(bytes).digest('hex'), approved.sha256, 'Pinned evidence changed; do not regenerate it to silence the guard');
const fixture = JSON.parse(bytes);
assert.equal(getIeltsReviewBlueprint(mockId)?.contentVersion, approved.version);
let mock;
assert.ok(!(args.html && args.url), 'Choose --html or --url');
if (args.url || args.html) {
  let html;
  if (args.html) html = fs.readFileSync(args.html, 'utf8');
  else {
    const url = new URL(args.url);
    assert.ok(['http:','https:'].includes(url.protocol));
    const response = await fetch(url, { cache:'no-store', signal:AbortSignal.timeout(30000) });
    assert.ok(response.ok, `HTTP ${response.status}`);
    html = await response.text();
  }
  mock = mockFromPublicHtml(html, mockId);
} else mock = (await import(`../src/data/mocks/ielts-${mockId}.ts`)).default;
const rows = auditObjectiveKey(mock, fixture);
console.log(`PASS ${mockId}: ${rows.length} response blocks, 80 points; approved key, options, numbering and visible blanks match (${args.url || args.html || 'local'}).`);
console.log('This verifies the pinned key contract, not official IELTS certification or an audit of other sets.');
