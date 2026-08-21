import assert from 'node:assert/strict';
import test from 'node:test';

import {
  TOEFL_REVIEW_BLUEPRINTS,
  getToeflReviewBlueprint,
  getToeflReviewBlueprintByTitle,
} from '../src/lib/toefl/review-blueprint.ts';
import { toeflSpeakingEvidenceIssues } from '../src/lib/toefl/submission.ts';

test('all 20 fixed sets have task-specific, versioned review blueprints', () => {
  assert.equal(Object.keys(TOEFL_REVIEW_BLUEPRINTS).length, 20);
  for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
    const mockId = `set-${setNumber}`;
    const blueprint = getToeflReviewBlueprint(mockId);
    assert.ok(blueprint);
    assert.equal(blueprint.mockTitle, `TOEFL iBT Set ${setNumber} (Formato 2026)`);
    assert.equal(blueprint.writingTasks[1].taskId, 'write-email');
    assert.equal(blueprint.writingTasks[2].taskId, 'academic-discussion');
    assert.equal(getToeflReviewBlueprintByTitle(blueprint.mockTitle)?.mockId, mockId);
  }
});

test('speaking evidence requires one non-empty descriptor for every exact prompt', () => {
  const prompts = [
    { questionId: 'repeat-1', taskType: 'repeat', label: 'Listen and Repeat 1' },
    { questionId: 'interview-1', taskType: 'interview', label: 'Take an Interview 1' },
  ];
  const complete = prompts.map((prompt) => ({
    questionId: prompt.questionId,
    mimeType: 'audio/webm',
    size: 2048,
    durationSeconds: 2,
  }));

  assert.deepEqual(toeflSpeakingEvidenceIssues(prompts, complete), []);
  assert.match(toeflSpeakingEvidenceIssues(prompts, complete.slice(0, 1))[0], /Falta la grabación/);
  assert.match(toeflSpeakingEvidenceIssues(prompts, [complete[0], complete[0]])[0], /Falta la grabación|repetidas/);
  assert.match(toeflSpeakingEvidenceIssues(prompts, [{ ...complete[0], durationSeconds: 0 }, complete[1]])[0], /vacía|corta/);
  assert.match(toeflSpeakingEvidenceIssues(prompts, [...complete, { ...complete[0], questionId: 'foreign' }])[0], /no pertenece/);
});
