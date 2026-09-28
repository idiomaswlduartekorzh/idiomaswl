import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const report = JSON.parse(readFileSync(new URL('../docs/diagnostic-bank-readiness.json', import.meta.url)));

test('readiness report distinguishes authored drafts from operational capacity', () => {
  assert.equal(report.reportVersion, 'diagnostic-bank-readiness-v2');
  assert.equal(report.releaseReady, false);
  assert.equal(report.summary.requiredObjectiveDecisions, 360);
  assert.equal(report.summary.reservedDraftObjectiveDecisions, 288);
  assert.equal(report.summary.nonReservedDraftObjectiveDecisions, 24);
  assert.equal(report.summary.operationalObjectiveDecisions, 0);
  assert.equal(report.summary.approvedSelectableObjectiveDecisions, 0);
  assert.equal(report.summary.objectiveCellsRequired, 30);
  assert.equal(report.summary.objectiveCellsWithDraftCapacity, 24);
});

test('readiness report carries a privacy-safe cue audit for every reserved objective draft', () => {
  assert.equal(report.cueAudit.auditVersion, 'diagnostic-item-cue-audit-v2');
  assert.equal(report.summary.cueAuditReviewedReservedDrafts, 288);
  assert.equal(report.summary.cueAuditBlockingDefects, 0);
  assert.deepEqual(report.cueAudit.totals, {
    items: 288,
    flaggedItems: report.summary.cueAuditFlaggedForHumanReview,
    blockingItems: 0,
  });
  assert.equal(report.cueAudit.cells.length, 24);
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

test('written discourse has full objective draft cells while legacy writing remains unapproved', () => {
  for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) {
    const cell = report.objectiveCells.find((candidate) => candidate.level === level && candidate.skill === 'written-discourse');
    assert.equal(cell.authoringGap, 0);
    assert.equal(cell.operationalGap, 12);
  }
  assert.equal(report.summary.legacyWritingDraftPrompts, 24);
  assert.equal(report.summary.legacyWritingApprovedPrompts, 0);
  assert.ok(report.legacyWriting.every((row) => row.reservedDraftPrompts === 4 && row.approvedPrompts === 0));
});
