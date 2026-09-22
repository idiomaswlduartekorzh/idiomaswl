import assert from 'node:assert/strict';
import test from 'node:test';

import {
  isAdminEmail,
  isJoseAdminEmail,
  isZhannaAdminEmail,
  isVerifiedAdminUser,
  isVerifiedJoseAdminUser,
  isVerifiedZhannaAdminUser,
} from '../src/lib/config/admins.ts';

test('the institutional student account is never treated as an administrator', () => {
  assert.equal(isAdminEmail('welearninstitute@gmail.com'), false);
  assert.equal(isJoseAdminEmail('welearninstitute@gmail.com'), false);
  assert.equal(isZhannaAdminEmail('welearninstitute@gmail.com'), false);
});

test('unknown accounts cannot enter the administrator panel', () => {
  assert.equal(isAdminEmail('estudiante@example.com'), false);
  assert.equal(isAdminEmail(undefined), false);
});

test('approved admin emails are normalized consistently', () => {
  assert.equal(isJoseAdminEmail('  DAVID.DUARTES182@GMAIL.COM  '), true);
  assert.equal(isVerifiedAdminUser({ email: 'david.duartes182@gmail.com', email_confirmed_at: null }), false);
  assert.equal(isVerifiedJoseAdminUser({ email: 'david.duartes182@gmail.com', email_confirmed_at: '2026-09-12T00:00:00Z' }), true);
  assert.equal(isVerifiedAdminUser({ email: 'welearninstitute@gmail.com', email_confirmed_at: '2026-09-12T00:00:00Z' }), false);
});

test('Zhanna production email receives the academic dashboard, not the owner dashboard', () => {
  const email = '  ZHANNA.DUARTE@MAIL.RU  ';
  const confirmedUser = { email, email_confirmed_at: '2026-09-21T00:00:00Z' };

  assert.equal(isAdminEmail(email), true);
  assert.equal(isJoseAdminEmail(email), false);
  assert.equal(isZhannaAdminEmail(email), true);
  assert.equal(isVerifiedJoseAdminUser(confirmedUser), false);
  assert.equal(isVerifiedZhannaAdminUser(confirmedUser), true);
});
