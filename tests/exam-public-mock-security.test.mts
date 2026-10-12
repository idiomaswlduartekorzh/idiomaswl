import assert from 'node:assert/strict';
import { test } from 'node:test';

import { EXAMS } from '../src/data/exams.ts';
import { getGoetheA2PracticeMock, getGoetheB1PracticeMock, getMock } from '../src/data/mocks/index.ts';
import { sanitizeExamMock } from '../src/lib/ielts/public-mock.ts';
import { createExamLeadReceipt, verifyExamLeadReceipt } from '../src/lib/exams/lead-receipt.server.ts';
import { hasExamScoreAccess } from '../src/lib/exams/score-access.server.ts';
import { createHmac } from 'node:crypto';
import GOETHE_A1_PUBLIC_VISUALS from '../src/data/mocks/goethe-a1-public-visuals.json' with { type: 'json' };

test('all published exam mocks remove objective keys and review insights before browser delivery', () => {
  let checked = 0;
  for (const exam of Object.values(EXAMS)) {
    for (const listed of exam.mocks) {
      const mock = getMock(exam.slug, listed.id)
        ?? (exam.slug === 'goethe' && listed.id.startsWith('a2-') ? getGoetheA2PracticeMock(listed.id, 'reading') : null)
        ?? (exam.slug === 'goethe' && listed.id.startsWith('b1-') ? getGoetheB1PracticeMock(listed.id, 'reading') : null);
      if (!mock && listed.href) continue; // Separate legacy ICFES runner.
      assert.ok(mock, `${exam.slug}/${listed.id} must resolve`);
      const publicMock = sanitizeExamMock(mock);
      assert.equal(publicMock.sections.length, mock.sections.length);
      for (const section of publicMock.sections) {
        assert.equal('transcript' in section, false, `${exam.slug}/${listed.id} transcript`);
        assert.equal('insights' in section, false, `${exam.slug}/${listed.id} insights`);
        for (const question of section.questions) {
          assert.equal('answer' in question, false, `${exam.slug}/${listed.id}/${question.id} answer`);
          assert.equal('answers' in question, false, `${exam.slug}/${listed.id}/${question.id} answers`);
          if (question.type === 'formgroup') {
            for (const blank of question.blanks) assert.equal('answers' in blank, false, `${question.id} blank`);
          }
          if (question.type === 'wordcomplete') {
            for (const blank of question.blanks) assert.equal('answer' in blank, false, `${question.id} word`);
          }
          if (question.type === 'matching') {
            for (const item of question.items) assert.equal('answer' in item, false, `${question.id} match`);
          }
          if (question.type === 'tablegroup') {
            for (const cell of question.rows.flat()) if (typeof cell !== 'string') assert.equal('answers' in cell, false, `${question.id} table`);
          }
        }
      }
      checked += 1;
    }
  }
  assert.ok(checked >= 100, `expected broad catalog, checked ${checked}`);
});

test('Goethe A1 client visuals carry only example answers', () => {
  for (const [set, content] of Object.entries(GOETHE_A1_PUBLIC_VISUALS)) {
    assert.ok(content.listening1.length > 0, `A1 set ${set} has listening visuals`);
    assert.ok(content.readingAds.length > 0, `A1 set ${set} has reading visuals`);
    const { listeningExample: _example, ...examVisuals } = content;
    assert.equal(/"(?:answer|answers|correct|transcript)"/i.test(JSON.stringify(examVisuals)), false, `A1 set ${set} does not carry scored keys`);
  }
});

test('lead receipts bind a persisted id to the exact exam and set', () => {
  const previous = process.env.SUPABASE_SERVICE_ROLE_KEY;
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-signing-key';
  try {
    const receipt = createExamLeadReceipt('12345678-1234-1234-1234-123456789abc', 'cambridge-b2', 'set-3');
    assert.equal(verifyExamLeadReceipt(receipt, 'cambridge-b2', 'set-3'), true);
    assert.equal(verifyExamLeadReceipt(receipt, 'cambridge-b2', 'set-4'), false);
    assert.equal(verifyExamLeadReceipt(receipt, 'toefl', 'set-3'), false);
    assert.equal(verifyExamLeadReceipt(`${receipt.slice(0, -1)}${receipt.endsWith('0') ? '1' : '0'}`, 'cambridge-b2', 'set-3'), false);
  } finally {
    if (previous === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    else process.env.SUPABASE_SERVICE_ROLE_KEY = previous;
  }
});

test('score routes reject missing, malformed, and cross-exam cookies', async () => {
  const previous = process.env.SUPABASE_SERVICE_ROLE_KEY;
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-signing-key';
  try {
    const id = '12345678-1234-1234-1234-123456789abc';
    const signature = createHmac('sha256', 'test-signing-key').update(`exam-score-v1:${id}:ielts`).digest('hex');
    const cookie = `wl_exam_score_ielts=${id}.${signature}`;
    assert.equal(await hasExamScoreAccess('ielts', new Request('http://localhost/api')), false);
    assert.equal(await hasExamScoreAccess('ielts', new Request('http://localhost/api', { headers: { cookie } })), true);
    assert.equal(await hasExamScoreAccess('toefl', new Request('http://localhost/api', { headers: { cookie } })), false);
    assert.equal(await hasExamScoreAccess('ielts', new Request('http://localhost/api', { headers: { cookie: `${cookie}0` } })), false);
  } finally {
    if (previous === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    else process.env.SUPABASE_SERVICE_ROLE_KEY = previous;
  }
});
