import assert from 'node:assert/strict';
import test from 'node:test';
import { validateHarness } from '../scripts/lib/icfes-launch-harness-core.mjs';

test('ICFES launch harness rejects a board tied to a different content hash', async () => {
  await assert.rejects(() => validateHarness(process.cwd()), (error) => {
    assert.equal(error.code, 'ERR_ASSERTION');
    assert.equal(error.actual?.path, 'src/data/icfes/own-mock-expansion-manifest.json');
    assert.equal(error.expected?.path, error.actual?.path);
    assert.notEqual(error.actual?.sha256, error.expected?.sha256);
    return true;
  });
});
