import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const report = JSON.parse(readFileSync(new URL('../docs/diagnostic-bank-readiness.json', import.meta.url)));

test('readiness report distinguishes authored drafts from operational capacity', () => {
  assert.equal(report.reportVersion, 'diagnostic-bank-readiness-v2');
  assert.equal(report.releaseReady, false);
  assert.equal(report.summary.requiredObjectiveDecisions, 288);
  assert.equal(report.summary.reservedDraftObjectiveDecisions, 216);
  assert.equal(report.summary.nonReservedDraftObjectiveDecisions, 24);
  assert.equal(report.summary.operationalObjectiveDecisions, 0);
  assert.equal(report.summary.approvedSelectableObjectiveDecisions, 0);
  assert.equal(report.summary.objectiveCellsRequired, 24);
  assert.equal(report.summary.objectiveCellsWithDraftCapacity, 18);
});

test('readiness report carries a privacy-safe cue audit for every reserved objective draft', () => {
  assert.equal(report.cueAudit.auditVersion, 'diagnostic-item-cue-audit-v1');
  assert.equal(report.summary.cueAuditReviewedReservedDrafts, 216);
  assert.equal(report.summary.cueAuditFlaggedForHumanReview, 0);
  assert.equal(report.summary.cueAuditBlockingDefects, 0);
  assert.deepEqual(report.cueAudit.totals, {
    items: 216,
    flaggedItems: 0,
    blockingItems: 0,
  });
  assert.equal(report.cueAudit.cells.length, 18);
  assert.ok(report.cueAudit.cells.every((cell) => !Object.hasOwn(cell, 'keyPositions')));
  assert.ok(!JSON.stringify(report.cueAudit).includes('optionId'));
  assert.ok(!JSON.stringify(report.cueAudit).includes('publicItem'));
});

test('A1 through C2 reading, grammar and vocabulary have complete draft cells', () => {
  for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) {
    for (const skill of ['reading', 'grammar', 'vocabulary']) {
      const cell = report.objectiveCells.find((candidate) => candidate.level === level && candidate.skill === skill);
      assert.equal(cell.authoringGap, 0, `${skill}/${level} authoring gap`);
      assert.equal(cell.operationalGap, 12, `${skill}/${level} must remain non-operational`);
      if (skill === 'reading') assert.equal(cell.stimulusAuthoringGap, 0);
    }
  }
});

test('recycled listening drafts do not count as reserved authoring capacity', () => {
  for (const level of ['A1', 'B1']) {
    const cell = report.objectiveCells.find((candidate) => candidate.level === level && candidate.skill === 'listening');
    assert.equal(cell.authored.nonReservedDraftDecisions, 12);
    assert.equal(cell.authored.reservedDraftDecisions, 0);
    assert.equal(cell.authoringGap, 12);
  }
});

test('writing has parallel drafts at every level but no false approvals', () => {
  assert.equal(report.summary.writingDraftPrompts, 24);
  assert.equal(report.summary.writingApprovedPrompts, 0);
  assert.ok(report.writing.every((row) => row.reservedDraftPrompts === 4 && row.approvedPrompts === 0));
});
