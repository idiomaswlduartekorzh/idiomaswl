import assert from 'node:assert/strict';
import test from 'node:test';

import {
  availableAutodidactaPlans,
  examCan,
  freeExamClaimDecision,
  resolveExamAccess,
} from '../src/lib/xpress-commerce/access.ts';

const NOW = new Date('2026-10-20T15:00:00.000Z');

test('a visitor may discover an exam but cannot start it', () => {
  const access = resolveExamAccess({ authenticated: false, examSlug: 'ielts', now: NOW });
  assert.equal(access.level, 'anonymous');
  assert.equal(examCan(access.level, 'discover-public-content'), true);
  assert.equal(examCan(access.level, 'start-exam'), false);
});

test('free access is isolated to the claimed exam and exposes only the total score', () => {
  const freeClaim = { examSlug: 'ielts', status: 'active' };
  const ielts = resolveExamAccess({ authenticated: true, examSlug: 'ielts', freeClaim, now: NOW });
  const toefl = resolveExamAccess({ authenticated: true, examSlug: 'toefl', freeClaim, now: NOW });

  assert.equal(ielts.level, 'free');
  assert.equal(examCan(ielts.level, 'start-exam'), true);
  assert.equal(examCan(ielts.level, 'view-total-score'), true);
  assert.equal(examCan(ielts.level, 'view-detailed-results'), false);
  assert.equal(examCan(ielts.level, 'download-materials'), false);
  assert.equal(toefl.level, 'locked');
});

test('a second exam never offers another free claim', () => {
  assert.deepEqual(availableAutodidactaPlans(false), ['exam-free', 'exam-basic', 'exam-auto', 'exam-teacher']);
  assert.deepEqual(availableAutodidactaPlans(true), ['exam-basic', 'exam-auto', 'exam-teacher']);
  assert.equal(freeExamClaimDecision(null, 'ielts'), 'available');
  assert.equal(freeExamClaimDecision({ examSlug: 'ielts', status: 'active' }, 'ielts'), 'already-active');
  assert.equal(freeExamClaimDecision({ examSlug: 'ielts', status: 'active' }, 'goethe'), 'already-used');
  assert.equal(freeExamClaimDecision({ examSlug: 'ielts', status: 'revoked' }, 'ielts'), 'already-used');
});

test('paid memberships are resolved independently for each exam', () => {
  const memberships = [
    { examSlug: 'ielts', offerId: 'exam-basic', status: 'active', startsAt: '2026-10-01T00:00:00Z', endsAt: '2026-11-01T00:00:00Z' },
    { examSlug: 'goethe', offerId: 'exam-auto', status: 'active', startsAt: '2026-10-10T00:00:00Z', endsAt: '2026-11-10T00:00:00Z' },
  ];
  const ielts = resolveExamAccess({ authenticated: true, examSlug: 'ielts', memberships, now: NOW });
  const goethe = resolveExamAccess({ authenticated: true, examSlug: 'goethe', memberships, now: NOW });
  const toefl = resolveExamAccess({ authenticated: true, examSlug: 'toefl', memberships, now: NOW });

  assert.equal(ielts.level, 'essential');
  assert.equal(goethe.level, 'autodidacta');
  assert.equal(examCan(goethe.level, 'human-review'), true);
  assert.equal(toefl.level, 'locked');
});

test('expired or revoked paid access never unlocks an exam', () => {
  const memberships = [
    { examSlug: 'ielts', offerId: 'exam-teacher', status: 'active', startsAt: '2026-09-01T00:00:00Z', endsAt: '2026-10-01T00:00:00Z' },
    { examSlug: 'ielts', offerId: 'exam-auto', status: 'revoked', startsAt: '2026-10-01T00:00:00Z', endsAt: '2026-11-01T00:00:00Z' },
  ];
  assert.equal(resolveExamAccess({ authenticated: true, examSlug: 'ielts', memberships, now: NOW }).level, 'locked');
});

test('a WeLearn assignment grants full access only to its assigned exam', () => {
  const welearnAssignments = [{ examSlug: 'ielts', status: 'active' }];
  const ielts = resolveExamAccess({ authenticated: true, examSlug: 'ielts', welearnAssignments, now: NOW });
  const goethe = resolveExamAccess({ authenticated: true, examSlug: 'goethe', welearnAssignments, now: NOW });

  assert.equal(ielts.level, 'welearn-full');
  assert.equal(examCan(ielts.level, 'view-detailed-results'), true);
  assert.equal(examCan(ielts.level, 'download-materials'), true);
  assert.equal(goethe.level, 'locked');
});

test('WeLearn access takes precedence over an autonomous plan for the same exam', () => {
  const access = resolveExamAccess({
    authenticated: true,
    examSlug: 'ielts',
    now: NOW,
    freeClaim: { examSlug: 'ielts', status: 'active' },
    memberships: [{
      examSlug: 'ielts', offerId: 'exam-basic', status: 'active',
      startsAt: '2026-10-01T00:00:00Z', endsAt: '2026-11-01T00:00:00Z',
    }],
    welearnAssignments: [{ examSlug: 'ielts', status: 'active' }],
  });
  assert.equal(access.level, 'welearn-full');
  assert.equal(access.source, 'welearn');
});

