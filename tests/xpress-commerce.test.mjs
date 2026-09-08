import assert from 'node:assert/strict';
import test from 'node:test';
import {
  XPRESS_OFFERS,
  quoteXpressPurchase,
  xpressAccessEndsAt,
  xpressOfferIncludes,
} from '../src/lib/xpress-commerce/catalog.ts';
import {
  parseRegistrationIntent,
  registrationCompletionPath,
  registrationIntentMetadata,
} from '../src/lib/student-onboarding/catalog.ts';

test('publishes the two exam memberships in COP cents', () => {
  assert.deepEqual(XPRESS_OFFERS.map(({ id, amountInCents }) => [id, amountInCents]), [
    ['exam-auto', 4_900_000],
    ['exam-teacher', 9_900_000],
  ]);
  assert.equal(XPRESS_OFFERS[1].teacherFeedbackTargetHours, 24);
});

test('an active membership cannot charge twice for the same exam', () => {
  const quote = quoteXpressPurchase({
    requestedOfferId: 'exam-auto',
    requestedExamSlug: 'ielts',
    activeMembership: { offerId: 'exam-auto', examSlug: 'ielts' },
  });
  assert.equal(quote.action, 'already-included');
  assert.equal(quote.amountInCents, 0);
});

test('charges only COP 50,000 when upgrading the same exam', () => {
  const quote = quoteXpressPurchase({
    requestedOfferId: 'exam-teacher',
    requestedExamSlug: 'toefl',
    activeMembership: { offerId: 'exam-auto', examSlug: 'toefl' },
  });
  assert.equal(quote.amountInCents, 5_000_000);
  assert.equal(quote.reason, 'membership-upgrade');
});

test('schedules plan or exam changes instead of creating overlapping access', () => {
  const downgrade = quoteXpressPurchase({
    requestedOfferId: 'exam-auto',
    requestedExamSlug: 'ielts',
    activeMembership: { offerId: 'exam-teacher', examSlug: 'ielts' },
  });
  const examChange = quoteXpressPurchase({
    requestedOfferId: 'exam-auto',
    requestedExamSlug: 'sat',
    activeMembership: { offerId: 'exam-auto', examSlug: 'ielts' },
  });
  assert.equal(downgrade.reason, 'downgrade');
  assert.equal(examChange.reason, 'different-exam');
  assert.equal(examChange.action, 'schedule-change');
});

test('a membership lasts 30 days and teacher access includes the 24-hour entitlement', () => {
  assert.equal(xpressAccessEndsAt(new Date('2026-09-08T12:00:00Z')).toISOString(), '2026-10-08T12:00:00.000Z');
  assert.equal(xpressOfferIncludes('exam-teacher', 'teacher-feedback-24h'), true);
  assert.equal(xpressOfferIncludes('exam-auto', 'teacher-feedback-24h'), false);
});

test('validates and normalizes both registration paths', () => {
  const welearn = parseRegistrationIntent({ path: 'welearn', language: 'coreano' });
  const exam = parseRegistrationIntent({ path: 'exam', exam: 'ielts', plan: 'exam-teacher' });
  assert.deepEqual(welearn, { path: 'welearn', language: 'coreano' });
  assert.deepEqual(registrationIntentMetadata(exam), {
    student_path: 'exam',
    language: 'ingles',
    subject: 'ielts',
    target_exam: 'ielts',
    xpress_plan_interest: 'exam-teacher',
  });
  assert.equal(parseRegistrationIntent({ path: 'exam', exam: 'otro', plan: 'exam-auto' }), null);
  assert.equal(parseRegistrationIntent({}), null);
  assert.equal(
    registrationCompletionPath(exam, '/dashboard'),
    '/registro/completar?path=exam&return=%2Fdashboard&exam=ielts&plan=exam-teacher',
  );
});
