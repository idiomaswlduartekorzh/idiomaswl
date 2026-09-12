import assert from 'node:assert/strict';
import test from 'node:test';

import {
  guidedLanguagePurchasePath,
  parseRegistrationIntent,
  registrationPurchasePath,
} from '../src/lib/student-onboarding/catalog.ts';

test('registration rejects an incomplete student category', () => {
  assert.equal(parseRegistrationIntent({ path: 'welearn' }), null);
  assert.equal(parseRegistrationIntent({ path: 'welearn', language: 'frances' }), null);
  assert.equal(parseRegistrationIntent({ path: 'exam', language: 'ingles', exam: 'ielts' }), null);
  assert.equal(parseRegistrationIntent({ path: 'exam', language: 'frances', exam: 'ielts', plan: 'exam-auto' }), null);
  assert.equal(parseRegistrationIntent({}), null);
});

test('general-language students continue to their selected class package', () => {
  const intent = parseRegistrationIntent({ path: 'welearn', language: 'frances', plan: 'impulso' });
  assert.deepEqual(intent, { path: 'welearn', language: 'frances', plan: 'impulso' });
  assert.equal(registrationPurchasePath(intent), '/precios?idioma=frances&objetivo=general&plan=impulso&nivel=No+s%C3%A9+mi+nivel');
  assert.equal(guidedLanguagePurchasePath('frances','impulso'), '/precios?idioma=frances&objetivo=general&plan=impulso&nivel=No+s%C3%A9+mi+nivel&paso=reglamento');
});

test('exam students continue to the matching subscription checkout', () => {
  const intent = parseRegistrationIntent({ path: 'exam', language: 'ingles', exam: 'ielts', plan: 'exam-single' });
  assert.deepEqual(intent, { path: 'exam', language: 'ingles', exam: 'ielts', plan: 'exam-single' });
  assert.equal(registrationPurchasePath(intent), '/suscripcion/examenes');
});
