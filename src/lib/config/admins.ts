/**
 * Central admin-email registry.
 *
 * Keep a single source of truth here so access-control checks across
 * Server Actions, API routes, and page-level redirects stay in sync.
 *
 * This server-owned allowlist is the authorization source of truth. Never
 * accept the user-editable `profiles.role` field as a substitute.
 */

/** Full administrators — both receive the owner dashboard and every admin action. */
export const JOSE_EMAILS = [
  'welearninstitute@gmail.com',
  'zhanna.duarte@mail.ru',
  'josedavidduartesilva@gmail.com',
  'david.duartes182@gmail.com',
  // Legacy work email kept for backward compat
  'jose@welearn.com',
] as const;

/** Legacy teacher accounts kept for backward-compatible limited access. */
export const ZHANNA_EMAILS = [
  'zhanna.korzh@gmail.com',
  // Legacy work email kept for backward compat
  'zhanna@welearn.com',
] as const;

/** All admins combined — use for simple "is this an admin?" checks. */
export const ALL_ADMIN_EMAILS: readonly string[] = [
  ...JOSE_EMAILS,
  ...ZHANNA_EMAILS,
];
