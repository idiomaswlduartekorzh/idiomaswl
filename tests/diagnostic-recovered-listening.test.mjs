import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const audit = JSON.parse(readFileSync(new URL('../config/diagnostic/recovered-listening-content-audit.json', import.meta.url)));

test('all sixty recovered English audios remain bound to immutable source evidence', () => {
  assert.equal(audit.summary.items, 60);
  assert.equal(audit.summary.audioPresent, 60);
  assert.equal(new Set(audit.items.map((item) => item.id)).size, 60);
  for (const item of audit.items) {
    assert.match(item.audio.sha256, /^[a-f0-9]{64}$/);
    assert.match(item.source.gitCommit, /^[a-f0-9]{40}$/);
    assert.match(item.source.exerciseContentSha256, /^[a-f0-9]{64}$/);
    assert.ok(item.audio.durationSeconds > 5 && item.audio.durationSeconds < 180);
  }
});

test('A1 and B1 can proceed to target-language question rewrite, but A2 cannot skip transcription', () => {
  assert.equal(audit.summary.byLevel.A1.readyForQuestionRewrite, 20);
  assert.equal(audit.summary.byLevel.B1.readyForQuestionRewrite, 20);
  assert.equal(audit.summary.byLevel.A2.transcriptionRequired, 20);
  assert.equal(audit.summary.byLevel.A2.completeTranscripts, 0);
});

test('legacy Spanish response text is never approved as listening evidence', () => {
  assert.equal(audit.policy.operationalUseAllowed, false);
  assert.equal(audit.policy.oldSpanishQuestionsReusable, false);
  assert.ok(audit.items.every((item) => item.evidence.promptLanguage === 'es'));
  assert.ok(audit.items.every((item) => item.requiredActions.includes('independent-linguistic-review')));
});

