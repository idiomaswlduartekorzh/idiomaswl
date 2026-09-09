import assert from 'node:assert/strict';
import test from 'node:test';

import {
  parseRegistrationIntent,
  registrationPurchasePath,
} from '../src/lib/student-onboarding/catalog.ts';

test('registration rejects an incomplete student category', () => {
  assert.equal(parseRegistrationIntent({ path: 'welearn' }), null);
  assert.equal(parseRegistrationIntent({ path: 'exam', exam: 'ielts' }), null);
  assert.equal(parseRegistrationIntent({}), null);
});

test('language students continue to packages with their language selected', () => {
  const intent = parseRegistrationIntent({ path: 'welearn', language: 'frances' });
  assert.deepEqual(intent, { path: 'welearn', language: 'frances' });
  assert.equal(registrationPurchasePath(intent), '/precios?idioma=frances');
});

test('exam students continue to the matching subscription checkout', () => {
  const intent = parseRegistrationIntent({ path: 'exam', exam: 'ielts', plan: 'exam-teacher' });
  assert.deepEqual(intent, { path: 'exam', exam: 'ielts', plan: 'exam-teacher' });
  assert.equal(registrationPurchasePath(intent), '/suscripcion/examenes');
});
