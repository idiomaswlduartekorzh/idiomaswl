import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const ROOT = path.resolve(import.meta.dirname, '..');
const STAGING = path.join(ROOT, 'staging/ielts-guided-evidence-21-40');

const TARGETED_SUPPORT = new Map([
  ['31:3', 'Water must migrate slowly through the outer wall before it can evaporate, so a glazed vessel performs poorly even if the sand inside remains wet. At the other extreme, clay with very large pores may leak faster than evaporation can use the water.'],
  ['31:28', 'Neither pattern is a guarantee. Tightly clustered members can share a model error, so low spread sometimes gives false confidence.'],
  ['33:10', 'If a label was unclear, the safest response was not to guess but to divert the carrier for manual checking.'],
  ['34:7', 'Yet the cylinder box remains instructive because its programme is visible.'],
  ['34:27', 'Its legitimacy depends on the stage at which it is used. Random admission before basic screening raises a different issue from random selection among candidates already judged suitable.'],
  ['35:15', 'Yet handmade samples varied, and pigments changed with age. A reference could stabilise a discussion while slowly becoming less like the colour it was supposed to preserve.'],
  ['35:29', 'Different objectives produce different queues.'],
  ['36:38', 'The aim is not to suppress communication but to keep one narrative from consuming all attention.'],
  ['36:40', 'They cannot guarantee recovery, because the evidence may never be present or observable.'],
  ['37:19', 'Even so, the beam samples selected locations rather than the entire three-dimensional structure.'],
  ['39:7', 'Street sweepers illustrate a wider point about municipal technology: successive patents improve components, while the public outcome still depends on routing, staffing and the definition of an acceptably clean street.'],
  ['39:20', 'These positions are not resolved by laboratory measurements alone.'],
  ['39:26', 'Spatial pattern is therefore not a clock unless exposure has been measured independently.'],
  ['39:32', 'The equality is moral and administrative; it does not mean that every task demands identical training or effort.'],
  ['40:18', 'They are separated, washed and dried before grading. A consistent particle size simplifies storage and application, while laboratory analysis confirms nutrient content.'],
]);

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, stableValue(value[key])]));
  }
  return value;
}

function payloadSha256(value) {
  return crypto.createHash('sha256').update(JSON.stringify(stableValue(value))).digest('hex');
}

function normalized(value) {
  return String(value ?? '').normalize('NFKC').replace(/\s+/g, ' ').trim();
}

test('Sets 21-40 stage question-specific, literal and fail-closed Reading rationales', () => {
  const rationales = new Set();
  let rowCount = 0;
  let notGivenCount = 0;

  for (let setNumber = 21; setNumber <= 40; setNumber += 1) {
    const file = path.join(STAGING, `set-${setNumber}-guided-evidence-staging.json`);
    const artifact = JSON.parse(fs.readFileSync(file, 'utf8'));
    const { integrity, ...payload } = artifact;
    assert.equal(integrity.payloadSha256, payloadSha256(payload), `Set ${setNumber}: payload hash drift`);
    assert.equal(artifact.status, 'PENDING_INDEPENDENT_REVIEW');
    assert.equal(artifact.releaseAuthorized, false);
    assert.equal(artifact.runtimeIntegration.connected, false);
    assert.equal(artifact.reading.rows.length, 40);

    for (const row of artifact.reading.rows) {
      rowCount += 1;
      const rationale = normalized(row.rationale);
      const binding = row.responseBinding;
      assert.ok(rationale.length > 180, `Set ${setNumber} Q${row.question}: rationale too short`);
      assert.ok(!rationale.includes('The keyed response is stated or logically entailed'),
        `Set ${setNumber} Q${row.question}: legacy verdict-only rationale survived`);
      assert.ok(!rationales.has(rationale), `Set ${setNumber} Q${row.question}: duplicated rationale`);
      rationales.add(rationale);
      assert.ok(rationale.includes(`«${normalized(binding.questionText)}»`),
        `Set ${setNumber} Q${row.question}: canonical proposition missing from rationale`);

      const quoted = [...rationale.matchAll(/«([^»]+)»/g)].map(match => normalized(match[1]));
      assert.ok(quoted.some(value => normalized(row.sourceExcerpt).includes(value)),
        `Set ${setNumber} Q${row.question}: no literal source sentence in rationale`);

      if (binding.responseType === 'fill') {
        assert.ok(binding.acceptedResponses.some(answer => rationale.includes(`«${answer}»`)),
          `Set ${setNumber} Q${row.question}: accepted response absent from rationale`);
      } else {
        assert.ok(rationale.includes(binding.correctOptionText),
          `Set ${setNumber} Q${row.question}: keyed option absent from rationale`);
        if (/^NOT (?:GIVEN|STATED)$/i.test(binding.correctOptionText)) {
          notGivenCount += 1;
          assert.match(rationale, /La proposición ausente es/);
          assert.match(rationale, /texto completo no especifica/);
        }
      }

      const targetedSupport = TARGETED_SUPPORT.get(`${setNumber}:${row.question}`);
      if (targetedSupport) {
        assert.ok(normalized(row.sourceExcerpt).includes(normalized(targetedSupport)),
          `Set ${setNumber} Q${row.question}: targeted support left the bound excerpt`);
        assert.ok(rationale.includes(`«${normalized(targetedSupport)}»`),
          `Set ${setNumber} Q${row.question}: targeted support not selected in rationale`);
      }
    }
  }

  assert.equal(rowCount, 800);
  assert.equal(rationales.size, 800);
  assert.equal(notGivenCount, 40);
  assert.equal(TARGETED_SUPPORT.size, 15);
});
