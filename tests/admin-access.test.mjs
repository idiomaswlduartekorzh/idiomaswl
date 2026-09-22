import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
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

test('Zhanna production email is a verified administrator', () => {
  const email = '  ZHANNA.DUARTE@MAIL.RU  ';
  const confirmedUser = { email, email_confirmed_at: '2026-09-21T00:00:00Z' };

  assert.equal(isAdminEmail(email), true);
  assert.equal(isJoseAdminEmail(email), false);
  assert.equal(isZhannaAdminEmail(email), true);
  assert.equal(isVerifiedJoseAdminUser(confirmedUser), false);
  assert.equal(isVerifiedZhannaAdminUser(confirmedUser), true);
});

test('all verified admins use the same operational dashboard without demo students', () => {
  const adminDir = new URL('../src/app/(site)/dashboard/admin/', import.meta.url);
  const pageSource = readFileSync(new URL('page.tsx', adminDir), 'utf8');
  const dashboardSource = readFileSync(new URL('JoseDashboard.tsx', adminDir), 'utf8');

  assert.match(pageSource, /isVerifiedAdminUser/);
  assert.match(pageSource, /<JoseDashboardServer/);
  assert.doesNotMatch(pageSource, /ZhannaDashboardServer/);
  assert.equal(existsSync(new URL('ZhannaDashboard.tsx', adminDir)), false);
  assert.equal(existsSync(new URL('ZhannaDashboardServer.tsx', adminDir)), false);
  assert.doesNotMatch(dashboardSource, /María García|Carlos Ramírez|IELTS Prep/);
});

test('private admin review routes require an admin and disable caching', () => {
  const routePaths = [
    '../src/app/api/admin/ielts/submissions/[submissionId]/audio/route.ts',
    '../src/app/api/admin/ielts/submissions/[submissionId]/delegated-reviews/route.ts',
    '../src/app/api/admin/toefl/submissions/[submissionId]/audio/route.ts',
  ];

  for (const routePath of routePaths) {
    const source = readFileSync(new URL(routePath, import.meta.url), 'utf8');
    assert.match(source, /await requireAdmin\(\)/);
    assert.match(source, /private, no-store/);
  }

  for (const routePath of routePaths.filter(path => path.endsWith('/audio/route.ts'))) {
    const source = readFileSync(new URL(routePath, import.meta.url), 'utf8');
    assert.match(source, /submission_status.*submitted/s);
  }
});
