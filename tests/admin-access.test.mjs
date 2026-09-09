import assert from 'node:assert/strict';
import test from 'node:test';

import {
  isAdminEmail,
  isJoseAdminEmail,
  isZhannaAdminEmail,
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
});
