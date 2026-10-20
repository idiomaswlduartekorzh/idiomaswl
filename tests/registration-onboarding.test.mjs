import assert from 'node:assert/strict';
import test from 'node:test';

import {
  guidedLanguagePurchasePath,
  parseRegistrationIntent,
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
