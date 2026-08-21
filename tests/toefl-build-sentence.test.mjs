import assert from 'node:assert/strict';
import test from 'node:test';
import { TOEFL_BUILD_SENTENCE_SET1 } from '../src/data/toefl/build-sentence-set-1.ts';
import {
  TOEFL_BUILD_SENTENCE_SET2_V2,
  TOEFL_BUILD_SENTENCE_SET3_V2,
  TOEFL_BUILD_SENTENCE_SET4_V2,
  TOEFL_BUILD_SENTENCE_SET5_V2,
} from '../src/data/toefl/build-sentence-sets-2-5.ts';
import {
  TOEFL_BUILD_SENTENCE_SET6_V2,
  TOEFL_BUILD_SENTENCE_SET7_V2,
  TOEFL_BUILD_SENTENCE_SET8_V2,
  TOEFL_BUILD_SENTENCE_SET9_V2,
  TOEFL_BUILD_SENTENCE_SET10_V2,
} from '../src/data/toefl/build-sentence-sets-6-10.ts';
import {
  TOEFL_BUILD_SENTENCE_SET11_V2,
  TOEFL_BUILD_SENTENCE_SET12_V2,
  TOEFL_BUILD_SENTENCE_SET13_V2,
  TOEFL_BUILD_SENTENCE_SET14_V2,
  TOEFL_BUILD_SENTENCE_SET15_V2,
} from '../src/data/toefl/build-sentence-sets-11-15.ts';
import {
  TOEFL_BUILD_SENTENCE_SET16_V2,
  TOEFL_BUILD_SENTENCE_SET17_V2,
  TOEFL_BUILD_SENTENCE_SET18_V2,
  TOEFL_BUILD_SENTENCE_SET19_V2,
  TOEFL_BUILD_SENTENCE_SET20_V2,
} from '../src/data/toefl/build-sentence-sets-16-20.ts';
import { scoreToeflBuildSentenceAttempt } from '../src/lib/toefl/build-sentence-contract.ts';

const answerPositions = [
  [2, 5, 1, 4],
  [4, 2, 5, 1],
  [2, 5, 1, 4],
  [4, 1, 3],
  [3, 4, 1],
  [2, 5, 4, 1],
  [4, 1, 3],
  [2, 5, 1, 4],
  [4, 2, 5, 1],
  [2, 5, 1, 4],
];

const items = TOEFL_BUILD_SENTENCE_SET1.items.map((item, index) => ({
  itemId: item.id,
  tileIds: item.tiles.map((tile) => tile.id),
  expectedTileCount: item.blankCount,
  acceptedOrders: [answerPositions[index].map((position) => `${item.id}:tile-${position}`)],
  maxRawPoints: 1,
}));
const config = {
  scoringVersion: 'test-build-sentence-v1',
  disclosure: 'Local test result.',
  items,
};

function allCorrect() {
  return Object.fromEntries(items.map((item) => [item.itemId, item.acceptedOrders[0]]));
}

function request(responses, overrides = {}) {
  return {
    attemptId: 'attempt:test',
    closeId: 'close:attempt:test:build',
    responses,
    presentedItemIds: items.map((item) => item.itemId),
    ...overrides,
  };
}

test('the public pilot contains ten contextual items and no answer property', () => {
  assert.equal(TOEFL_BUILD_SENTENCE_SET1.items.length, 10);
  assert.ok(TOEFL_BUILD_SENTENCE_SET1.items.every((item) => item.context && item.replyPrefix && item.replySuffix));
  assert.ok(TOEFL_BUILD_SENTENCE_SET1.items.every((item) => item.tiles.length === item.blankCount + 1));
  assert.ok(TOEFL_BUILD_SENTENCE_SET1.items.every((item) => !('answer' in item) && !('acceptedOrders' in item)));
  assert.ok(TOEFL_BUILD_SENTENCE_SET1.items.every((item) => new Set(item.tiles.map((tile) => tile.id)).size === item.tiles.length));
});

test('Sets 2–20 expose 190 contextual items with one distractor and no scoring key', () => {
  const expansionSets = [
    TOEFL_BUILD_SENTENCE_SET2_V2,
    TOEFL_BUILD_SENTENCE_SET3_V2,
    TOEFL_BUILD_SENTENCE_SET4_V2,
    TOEFL_BUILD_SENTENCE_SET5_V2,
    TOEFL_BUILD_SENTENCE_SET6_V2,
    TOEFL_BUILD_SENTENCE_SET7_V2,
    TOEFL_BUILD_SENTENCE_SET8_V2,
    TOEFL_BUILD_SENTENCE_SET9_V2,
    TOEFL_BUILD_SENTENCE_SET10_V2,
    TOEFL_BUILD_SENTENCE_SET11_V2,
    TOEFL_BUILD_SENTENCE_SET12_V2,
    TOEFL_BUILD_SENTENCE_SET13_V2,
    TOEFL_BUILD_SENTENCE_SET14_V2,
    TOEFL_BUILD_SENTENCE_SET15_V2,
    TOEFL_BUILD_SENTENCE_SET16_V2,
    TOEFL_BUILD_SENTENCE_SET17_V2,
    TOEFL_BUILD_SENTENCE_SET18_V2,
    TOEFL_BUILD_SENTENCE_SET19_V2,
    TOEFL_BUILD_SENTENCE_SET20_V2,
  ];
  assert.equal(new Set(expansionSets.map((set) => set.objectId)).size, 19);
  for (const set of expansionSets) {
    assert.equal(set.items.length, 10);
    assert.ok(set.items.every((item) => item.context && item.replyPrefix && item.replySuffix));
    assert.ok(set.items.every((item) => item.tiles.length === item.blankCount + 1));
    assert.ok(set.items.every((item) => !('answer' in item) && !('acceptedOrders' in item)));
    assert.ok(set.items.every((item) => new Set(item.tiles.map((tile) => tile.id)).size === item.tiles.length));
  }
});

test('the 190 canonical expansion orders reconcile to 10/10 per set', () => {
  const patterns = [
    [2, 4, 0, 3, 1],
    [4, 1, 3, 0, 2],
    [3, 0, 4, 1, 2],
    [1, 3, 0, 4, 2],
    [2, 0, 3, 1, 4],
  ];
  const expansionSets = [
    TOEFL_BUILD_SENTENCE_SET2_V2,
    TOEFL_BUILD_SENTENCE_SET3_V2,
    TOEFL_BUILD_SENTENCE_SET4_V2,
    TOEFL_BUILD_SENTENCE_SET5_V2,
    TOEFL_BUILD_SENTENCE_SET6_V2,
    TOEFL_BUILD_SENTENCE_SET7_V2,
    TOEFL_BUILD_SENTENCE_SET8_V2,
    TOEFL_BUILD_SENTENCE_SET9_V2,
    TOEFL_BUILD_SENTENCE_SET10_V2,
    TOEFL_BUILD_SENTENCE_SET11_V2,
    TOEFL_BUILD_SENTENCE_SET12_V2,
    TOEFL_BUILD_SENTENCE_SET13_V2,
    TOEFL_BUILD_SENTENCE_SET14_V2,
    TOEFL_BUILD_SENTENCE_SET15_V2,
    TOEFL_BUILD_SENTENCE_SET16_V2,
    TOEFL_BUILD_SENTENCE_SET17_V2,
    TOEFL_BUILD_SENTENCE_SET18_V2,
    TOEFL_BUILD_SENTENCE_SET19_V2,
    TOEFL_BUILD_SENTENCE_SET20_V2,
  ];
  for (const [setIndex, set] of expansionSets.entries()) {
    const setNumber = setIndex + 2;
    const scoringItems = set.items.map((item, index) => {
      const pattern = patterns[(setNumber * 2 + (index + 1) * 3) % patterns.length];
      const acceptedOrder = [0, 1, 2, 3].map((sourceIndex) =>
        `${item.id}:tile-${pattern.indexOf(sourceIndex) + 1}`);
      return {
        itemId: item.id,
        tileIds: item.tiles.map((tile) => tile.id),
        expectedTileCount: item.blankCount,
        acceptedOrders: [acceptedOrder],
        maxRawPoints: 1,
      };
    });
    const expansionConfig = {
      scoringVersion: `test-build-sentence-set${setNumber}`,
      disclosure: 'Local test result.',
      items: scoringItems,
    };
    const responses = Object.fromEntries(scoringItems.map((item) => [item.itemId, item.acceptedOrders[0]]));
    const result = scoreToeflBuildSentenceAttempt(expansionConfig, {
      attemptId: `attempt:set${setNumber}`,
      closeId: `close:attempt:set${setNumber}:build`,
      responses,
      presentedItemIds: scoringItems.map((item) => item.itemId),
    });
    assert.equal(result.correct, 10, `Set ${setNumber} should score 10/10.`);
    assert.equal(result.denominator, 10, `Set ${setNumber} should retain all ten items.`);
  }
});

test('all ten canonical orders reconcile to 10/10', () => {
  const result = scoreToeflBuildSentenceAttempt(config, request(allCorrect()));
  assert.equal(result.correct, 10);
  assert.equal(result.denominator, 10);
  assert.ok(result.outcomes.every((outcome) => outcome.status === 'scored' && outcome.rawPoints === 1));
});

test('a grammatical-order mismatch receives zero without changing the denominator', () => {
  const responses = allCorrect();
  responses[items[0].itemId] = [...responses[items[0].itemId]].reverse();
  const result = scoreToeflBuildSentenceAttempt(config, request(responses));
  assert.equal(result.correct, 9);
  assert.equal(result.denominator, 10);
  assert.equal(result.outcomes[0].rawPoints, 0);
});

test('an incomplete response remains unanswered and receives zero', () => {
  const responses = allCorrect();
  responses[items[1].itemId] = responses[items[1].itemId].slice(0, -1);
  const outcome = scoreToeflBuildSentenceAttempt(config, request(responses)).outcomes[1];
  assert.equal(outcome.status, 'unanswered');
  assert.equal(outcome.reasonCode, 'incomplete_order');
  assert.equal(outcome.rawPoints, 0);
});

test('unknown and duplicate tile identities fail closed', () => {
  const unknown = allCorrect();
  unknown[items[2].itemId] = ['unknown', ...unknown[items[2].itemId].slice(1)];
  const unknownResult = scoreToeflBuildSentenceAttempt(config, request(unknown));
  assert.equal(unknownResult.outcomes[2].reasonCode, 'invalid_tile');
  assert.equal(unknownResult.denominator, 9);

  const duplicate = allCorrect();
  duplicate[items[3].itemId] = Array(items[3].expectedTileCount).fill(items[3].tileIds[0]);
  const duplicateResult = scoreToeflBuildSentenceAttempt(config, request(duplicate));
  assert.equal(duplicateResult.outcomes[3].reasonCode, 'duplicate_tile');
  assert.equal(duplicateResult.denominator, 9);
});

test('not-presented and invalid configurations are reconciled, never guessed', () => {
  const partial = scoreToeflBuildSentenceAttempt(config, request(allCorrect(), {
    presentedItemIds: items.slice(0, 4).map((item) => item.itemId),
  }));
  assert.equal(partial.correct, 4);
  assert.equal(partial.denominator, 4);
  assert.equal(partial.outcomes.filter((outcome) => outcome.status === 'not_presented').length, 6);

  const broken = {
    ...config,
    items: items.map((item, index) => index === 0 ? { ...item, acceptedOrders: [['unknown']] } : item),
  };
  const invalid = scoreToeflBuildSentenceAttempt(broken, request(allCorrect()));
  assert.equal(invalid.outcomes[0].reasonCode, 'invalid_configuration');
  assert.equal(invalid.denominator, 9);
});

test('closing the same attempt twice is deterministic', () => {
  const first = scoreToeflBuildSentenceAttempt(config, request(allCorrect()));
  const second = scoreToeflBuildSentenceAttempt(config, request(allCorrect()));
  assert.deepEqual(second, first);
});
