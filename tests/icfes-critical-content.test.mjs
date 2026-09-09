import assert from 'node:assert/strict';
import test from 'node:test';

import mock06 from '../src/data/mocks/icfes-mock-06.ts';
import mock13 from '../src/data/mocks/icfes-mock-13.ts';
import mock15 from '../src/data/mocks/icfes-mock-15.ts';
import mock21 from '../src/data/mocks/icfes-mock-21.ts';
import {
  ICFES_EDITORIAL_HOLDS,
  SIMULACROS,
  getIcfesPaidDetailAvailability,
  getSimulacroForPaidDetail,
} from '../src/data/mocks/icfes-simulacros.ts';

function section(mock, part) {
  const result = mock.sections.find((candidate) => candidate.part === part);
  assert.ok(result, `${mock.id}: missing Part ${part}`);
  return result;
}

function question(mock, part, id) {
  const result = section(mock, part).questions.find((candidate) => candidate.id === id);
  assert.ok(result, `${mock.id}: missing ${id}`);
  return result;
}

test('mock-06 water cloze has valid keyed completions', () => {
  const part = section(mock06, 4);
  const freshWater = question(mock06, 4, 'p4q2');
  const waterQuality = question(mock06, 4, 'p4q3');

  assert.equal(freshWater.options[freshWater.answer], 'water');
  assert.equal(waterQuality.options[waterQuality.answer], 'water');
  assert.match(part.passage, /provide fresh \(17\) ___ for millions of people to drink/);
  assert.match(part.passage, /quality of \(18\) ___/);
});

test('mock-13 and mock-15 cloze keys produce the intended phrases', () => {
  const musicalHistory = question(mock13, 4, 'p4q1');
  const timesADay = question(mock15, 4, 'p4q7');

  assert.equal(musicalHistory.options[musicalHistory.answer], 'history');
  assert.equal(timesADay.options[timesADay.answer], 'day');
});

test('mock-21 Taj Mahal passage preserves every key and corrected UNESCO facts', () => {
  const part = section(mock21, 4);
  const expectedKeys = ['by', 'used', 'At', 'who', 'several', 'later', 'around', 'While'];
  const actualKeys = part.questions.map((item) => item.options[item.answer]);

  assert.deepEqual(actualKeys, expectedKeys);
  assert.match(part.passage, /Shah Jahan/);
  assert.match(part.passage, /Mumtaz Mahal/);
  assert.match(part.passage, /Construction began in 1632/);
  assert.match(part.passage, /finished in 1648/);
  assert.match(part.passage, /completed \(21\) ___, in 1653/);
  assert.match(part.passage, /Ustad Ahmad Lahori/);
  assert.doesNotMatch(part.passage, /emperor Jahan|his wife, Mahal|started in 1623|finished by 1638|include a lake/);
});

test('mock-21 art inference uses the answer supported by paragraph 2', () => {
  const respectForVariety = question(mock21, 6, 'p6q3');
  assert.equal(respectForVariety.answer, 1);
  assert.equal(respectForVariety.options[respectForVariety.answer], 'A sense of respect towards variety.');
});

test('all official criticals are blocked from verified paid detail with exact scope', () => {
  const expected = {
    'icfes-2021-ex2': [4, 5, 6],
    'icfes-2016': [1, 2, 3],
    'icfes-tyt': [6, 7, 8, 9, 10],
    'icfes-2012': [20],
  };
  assert.deepEqual(Object.keys(ICFES_EDITORIAL_HOLDS).sort(), Object.keys(expected).sort());

  for (const [examId, questionNumbers] of Object.entries(expected)) {
    const availability = getIcfesPaidDetailAvailability(examId);
    assert.equal(availability.eligible, false, `${examId} must not expose paid detail`);
    assert.equal(availability.scope, 'resource');
    assert.deepEqual([...availability.questionNumbers], questionNumbers);
    assert.match(availability.reason, /no disponible|retirad[ao] temporalmente/i);
    assert.equal(getSimulacroForPaidDetail(examId), undefined);
  }
});

test('all official resources remain blocked from paid detail pending provenance and legal review', () => {
  for (const exam of SIMULACROS) {
    const availability = getIcfesPaidDetailAvailability(exam.id);
    assert.equal(availability.eligible, false);
    assert.equal(availability.scope, 'resource');
    assert.match(availability.reason, /verificación independiente.*revisión jurídica/i);
    assert.equal(exam.licenseStatus, 'legal-review-required-paid-detail-blocked');
    assert.equal(getSimulacroForPaidDetail(exam.id), undefined);
  }
});
