import assert from 'node:assert/strict';
import test from 'node:test';

import { buildDiagnosticCompositeResult } from '../src/server/diagnostic/measurement.ts';
import { buildEnglishDiagnosticResumeDelivery } from '../src/server/diagnostic/resume-core.ts';
import { toDiagnosticPublicItem } from '../src/server/diagnostic/scoring.ts';

const item = {
  publicItem: {
    id: 'en-b1-reading-01-q1', contentVersion: 'pilot-1', language: 'en', skill: 'reading',
    subdomain: 'main-idea', levelCandidate: 'B1', prompt: 'What is the main idea?',
    stimulus: { kind: 'text', stimulusId: 'text-1', body: 'A sufficiently long fixture text for a diagnostic item.' },
    response: { kind: 'single-choice', optionIds: ['a', 'b', 'c'] },
    displayOptions: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }, { id: 'c', text: 'C' }],
  },
  status: 'pilot', exposure: 'reserved', review: { status: 'approved' },
  scoring: { kind: 'single-choice', optionId: 'b' }, rationale: { key: 'Private key rationale.' },
  source: { kind: 'welearn-original', reference: 'fixture' }, levelRange: ['B1', 'B1'],
};
const promptRecord = {
  publicPrompt: {
    id: 'en-b1-writing-01', contentVersion: 'pilot-1', language: 'en', levelCandidate: 'B1',
    title: 'A proposal', situation: 'Write about a practical proposal for your community.',
    instructions: ['Describe it.', 'Explain its effects.', 'Recommend a next step.'],
    minimumWords: 100, maximumWords: 160, recommendedMinutes: 18,
  },
  status: 'pilot', exposure: 'reserved', review: { status: 'approved' },
  source: { kind: 'welearn-original', reference: 'fixture' },
};
const attempt = {
  id: 'attempt-1', userId: 'user-1', version: 2, status: 'precision', routeId: 'mid-b1-b2',
  expiresAt: '2026-09-24T15:00:00.000Z',
};
const base = {
  authenticatedUserId: 'user-1', objectiveBank: [item], objectiveBankVersion: 'objective-v1',
  writingBank: [promptRecord], writingBankVersion: 'writing-v1', blueprintVersion: 'blueprint-v1',
  engineVersion: 'engine-v1', now: new Date('2026-09-24T13:00:00.000Z'),
};

function completedResultProfile() {
  const objective = ['reading', 'listening', 'grammar', 'vocabulary'].map(skill => ({
    skill, decisions: 6, distinctStimuli: skill === 'reading' || skill === 'listening' ? 3 : 6,
    attempted: 6, omitted: 0, observedAccuracy: 0.67,
    status: 'provisional', estimatedLevel: 'B1', plausibleRange: ['A2', 'B2'], confidence: 0.61,
    theta: -0.35, standardError: 0.78, calibrationVersion: 'fixture-calibration-v1',
  }));
  return buildDiagnosticCompositeResult({
    attemptId: attempt.id,
    blueprintVersion: base.blueprintVersion,
    bankVersion: base.objectiveBankVersion,
    skills: [...objective, {
      skill: 'writing', decisions: 1, distinctStimuli: 1, status: 'provisional',
      reviewStatus: 'human-reviewed', estimatedLevel: 'B1', plausibleRange: ['B1', 'B1'], confidence: 0.7,
    }],
    generatedAt: '2026-09-24T13:00:00.000Z',
    validUntil: '2026-10-24T13:00:00.000Z',
  });
}

test('rehydrates the exact objective stage without private scoring fields', () => {
  const resumeInput = {
    ...base,
    snapshot: {
      attempt,
      stage: {
        stageId: 'stage-1', kind: 'precision', routeId: 'mid-b1-b2', itemIds: [item.publicItem.id],
        contentVersions: { [item.publicItem.id]: item.publicItem.contentVersion }, issuedAt: '2026-09-24T12:00:00.000Z',
      },
      stageStatus: 'issued', selectionReceipt: {}, bankVersion: 'objective-v1', blueprintVersion: 'blueprint-v1',
      engineVersion: 'engine-v1', writingStatus: null, resultProfile: null,
    },
  };
  const resume = buildEnglishDiagnosticResumeDelivery(resumeInput);
  assert.equal(resume.kind, 'objective-stage');
  assert.equal(resume.delivery.items[0].id, item.publicItem.id);
  assert.deepEqual(resume.delivery.items[0], toDiagnosticPublicItem(item, 'stage-1'));
  assert.deepEqual(resume, buildEnglishDiagnosticResumeDelivery(resumeInput));
  const serialized = JSON.stringify(resume);
  assert.equal(serialized.includes('Private key rationale'), false);
  assert.equal(serialized.includes('scoring'), false);
});

test('rehydrates the listening accommodation from the private stage receipt', () => {
  const resume = buildEnglishDiagnosticResumeDelivery({
    ...base,
    snapshot: {
      attempt,
      stage: {
        stageId: 'stage-1', kind: 'precision', routeId: 'mid-b1-b2', itemIds: [item.publicItem.id],
        contentVersions: { [item.publicItem.id]: item.publicItem.contentVersion }, issuedAt: '2026-09-24T12:00:00.000Z',
      },
      stageStatus: 'issued', selectionReceipt: { listeningAccommodation: true },
      bankVersion: 'objective-v1', blueprintVersion: 'blueprint-v1', engineVersion: 'engine-v1',
      writingStatus: null, resultProfile: null,
    },
  });
  assert.equal(resume.kind, 'objective-stage');
  assert.equal(resume.delivery.listeningAccommodation, true);
});

test('rehydrates writing only from the pinned prompt-bank version', () => {
  const snapshot = {
    attempt: { ...attempt, version: 3, status: 'writing' },
    stage: {
      stageId: 'stage-writing', kind: 'writing', routeId: 'mid-b1-b2', itemIds: [promptRecord.publicPrompt.id],
      contentVersions: { [promptRecord.publicPrompt.id]: promptRecord.publicPrompt.contentVersion }, issuedAt: '2026-09-24T12:30:00.000Z',
    },
    stageStatus: 'issued', selectionReceipt: { writingBankVersion: 'writing-v1' }, bankVersion: 'objective-v1',
    blueprintVersion: 'blueprint-v1', engineVersion: 'engine-v1', writingStatus: null, resultProfile: null,
  };
  const resume = buildEnglishDiagnosticResumeDelivery({ ...base, snapshot });
  assert.equal(resume.kind, 'writing-stage');
  assert.equal(resume.delivery.prompt.id, promptRecord.publicPrompt.id);
  assert.throws(
    () => buildEnglishDiagnosticResumeDelivery({ ...base, snapshot: { ...snapshot, selectionReceipt: { writingBankVersion: 'old' } } }),
    /writing version unavailable/,
  );
});

test('returns processing, completed and closed states without inventing missing results', () => {
  const common = {
    stage: null, stageStatus: null, selectionReceipt: null, bankVersion: 'objective-v1',
    blueprintVersion: 'blueprint-v1', engineVersion: 'engine-v1', writingStatus: 'human-review', resultProfile: null,
  };
  const processing = buildEnglishDiagnosticResumeDelivery({
    ...base, snapshot: { ...common, attempt: { ...attempt, version: 4, status: 'scoring' } },
  });
  assert.deepEqual(processing, {
    kind: 'processing', attemptId: 'attempt-1', attemptVersion: 4, status: 'scoring', writingStatus: 'human-review',
  });
  const resultProfile = completedResultProfile();
  const result = buildEnglishDiagnosticResumeDelivery({
    ...base, snapshot: { ...common, attempt: { ...attempt, version: 5, status: 'completed' }, resultProfile },
  });
  assert.equal(result.kind, 'result');
  assert.deepEqual(result.resultProfile, resultProfile);
  const expired = buildEnglishDiagnosticResumeDelivery({
    ...base, now: new Date('2026-09-24T16:00:00.000Z'),
    snapshot: { ...common, attempt: { ...attempt, status: 'precision' } },
  });
  assert.equal(expired.status, 'expired');
  assert.throws(
    () => buildEnglishDiagnosticResumeDelivery({ ...base, snapshot: { ...common, attempt: { ...attempt, status: 'completed' } } }),
    /no result profile/,
  );
  assert.throws(
    () => buildEnglishDiagnosticResumeDelivery({
      ...base,
      snapshot: {
        ...common,
        attempt: { ...attempt, version: 5, status: 'completed' },
        resultProfile: { ...resultProfile, globalLevel: 'C2' },
      },
    }),
    /invalid result profile/,
  );
  assert.throws(
    () => buildEnglishDiagnosticResumeDelivery({
      ...base,
      snapshot: {
        ...common,
        attempt: { ...attempt, version: 5, status: 'completed' },
        resultProfile: {
          ...resultProfile,
          skills: resultProfile.skills.map((skill, index) => index === 0 ? { ...skill, confidence: 2 } : skill),
        },
      },
    }),
    /invalid result profile/,
  );
});

test('rejects foreign ownership and unavailable attempt versions', () => {
  const snapshot = {
    attempt, stage: null, stageStatus: null, selectionReceipt: null, bankVersion: 'objective-v1',
    blueprintVersion: 'blueprint-v1', engineVersion: 'engine-v1', writingStatus: null, resultProfile: null,
  };
  assert.throws(() => buildEnglishDiagnosticResumeDelivery({ ...base, authenticatedUserId: 'user-2', snapshot }), /does not belong/);
  assert.throws(() => buildEnglishDiagnosticResumeDelivery({ ...base, snapshot: { ...snapshot, bankVersion: 'old' } }), /version unavailable/);
});
