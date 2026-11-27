import assert from 'node:assert/strict';
import test from 'node:test';

import {
  guidedLanguagePurchasePath,
  mayInitializeRegistrationProfile,
  parseRegistrationIntent,
  registrationCompletionPath,
  registrationIntentMetadata,
  safeStudentReturnPath,
  registrationPurchasePath,
  xpressExamForClassSelection,
} from '../src/lib/student-onboarding/catalog.ts';

test('registration rejects an incomplete student category', () => {
  assert.equal(parseRegistrationIntent({ path: 'welearn' }), null);
  assert.equal(parseRegistrationIntent({ path: 'welearn', language: 'frances' }), null);
  assert.equal(parseRegistrationIntent({ path: 'exam', language: 'ingles', exam: 'ielts' }), null);
  assert.equal(parseRegistrationIntent({ path: 'exam', language: 'frances', exam: 'ielts', plan: 'exam-auto' }), null);
  assert.equal(parseRegistrationIntent({}), null);
});

test('every approved WeLearn exam objective maps to its exact exam access', () => {
  assert.equal(xpressExamForClassSelection('ingles', 'Cambridge B2 First'), 'cambridge-b2');
  assert.equal(xpressExamForClassSelection('ingles', 'IELTS General Training'), 'ielts');
  assert.equal(xpressExamForClassSelection('frances', 'DALF'), 'delf-dalf');
  assert.equal(xpressExamForClassSelection('italiano', 'CELI'), 'cils-celi');
  assert.equal(xpressExamForClassSelection('coreano', 'TOPIK II'), 'topik');
  assert.equal(xpressExamForClassSelection('aleman', 'IELTS Academic'), null);
});

test('general-language students continue to their selected class package', () => {
  const intent = parseRegistrationIntent({ path: 'welearn', language: 'frances', plan: 'impulso' });
  assert.deepEqual(intent, { path: 'welearn', language: 'frances', plan: 'impulso' });
  assert.equal(registrationPurchasePath(intent), '/precios?idioma=frances&objetivo=general&plan=impulso&nivel=No+s%C3%A9+mi+nivel');
  assert.equal(guidedLanguagePurchasePath('frances','impulso'), '/precios?idioma=frances&objetivo=general&plan=impulso&nivel=No+s%C3%A9+mi+nivel&paso=reglamento');
});

test('exam students continue to the matching free or paid destination', () => {
  const free = parseRegistrationIntent({ path: 'exam', language: 'ingles', exam: 'ielts', plan: 'exam-free' });
  const paid = parseRegistrationIntent({ path: 'exam', language: 'ingles', exam: 'ielts', plan: 'exam-basic' });
  assert.deepEqual(free, { path: 'exam', language: 'ingles', exam: 'ielts', plan: 'exam-free' });
  assert.equal(registrationPurchasePath(free), '/dashboard/student');
  assert.equal(registrationPurchasePath(paid), '/suscripcion/examenes?exam=ielts&plan=exam-basic');
  assert.equal(parseRegistrationIntent({ path: 'exam', language: 'ingles', exam: 'ielts', plan: 'exam-single' }), null);
});

test('email confirmation, OAuth and sign-in preserve the selected mock and safe purchase routes', () => {
  const intent = { path: 'exam', language: 'ingles', exam: 'ielts', plan: 'exam-free' };
  for (const route of ['/examenes/ielts/practica/set-2', '/examenes/ielts/practica/set-4/guiado', '/examenes/ielts/practica/set-1?mode=practice&skill=reading', '/dashboard/student', '/suscripcion/examenes?exam=ielts&plan=exam-basic', '/precios?idioma=frances']) {
    assert.equal(safeStudentReturnPath(route), route);
    const completion = registrationCompletionPath(intent, route);
    assert.equal(safeStudentReturnPath(completion, true), completion);
    assert.equal(safeStudentReturnPath(completion), '/dashboard');
  }
  for (const target of ['https://other.example/examenes/ielts/practica/set-2','//other.example','/\\other.example/examenes/ielts/practica/set-2','/dashboard/admin','/examenes/otro/practica/set-2','/registro/completar?path=exam&exam=ielts&language=frances&plan=exam-free']) {
    assert.equal(safeStudentReturnPath(target, true), '/dashboard');
  }
  assert.equal(safeStudentReturnPath(registrationCompletionPath(intent, '//other.example'), true), registrationCompletionPath(intent, '/dashboard'));
});

test('initialization recovers an incomplete password or OAuth profile and preserves previous assignments', () => {
  const exam = { path: 'exam', language: 'ingles', exam: 'ielts', plan: 'exam-free' };
  const blank = { student_path: null, language: null, subject: null, target_exam: null, xpress_plan_interest: null, onboarding_completed_at: null };
  assert.equal(mayInitializeRegistrationProfile(blank, exam), true);
  assert.equal(mayInitializeRegistrationProfile({ ...blank, language: 'ingles', subject: 'ingles' }, exam), true);
  assert.equal(mayInitializeRegistrationProfile({ ...blank, target_exam: 'ielts', subject: 'ielts', xpress_plan_interest: 'exam-free' }, exam), true);
  assert.equal(mayInitializeRegistrationProfile({ ...blank, student_path: 'welearn' }, exam), false);
  assert.equal(mayInitializeRegistrationProfile({ ...blank, onboarding_completed_at: '2026-08-10T12:00:00Z' }, exam), false);
  assert.equal(mayInitializeRegistrationProfile({ ...blank, language: 'frances', subject: 'frances' }, exam), false);
  assert.equal(mayInitializeRegistrationProfile({ ...blank, target_exam: 'toefl' }, exam), false);
  assert.equal(mayInitializeRegistrationProfile({ ...blank, xpress_plan_interest: 'exam-auto' }, exam), false);
  assert.equal(mayInitializeRegistrationProfile({ ...blank, subject: 'icfes' }, exam), false);
});

test('a tutor-led registration retains the exam objective without setting autonomous exam fields', () => {
  const tutor = parseRegistrationIntent({ path: 'welearn', language: 'ingles', exam: 'ielts', plan: 'impulso' });
  assert.deepEqual(registrationIntentMetadata(tutor), { student_path: 'welearn', language: 'ingles', subject: 'ielts', target_exam: null, xpress_plan_interest: null });
  assert.match(registrationPurchasePath(tutor), /objetivo=IELTS\+Academic/);
});
