/**
 * Central admin-email registry.
 *
 * Keep a single source of truth here so access-control checks across
 * Server Actions, API routes, and page-level redirects stay in sync.
 *
 * NOTE: Long-term these checks should be replaced entirely by reading
 * the `role` column on the `profiles` table (which Supabase RLS can also
 * enforce), so that adding a new admin does not require a code change.
 */

/** José — platform owner / head admin */
export const JOSE_EMAILS = [
  'josedavidduartesilva@gmail.com',
  'david.duartes182@gmail.com',
  // Legacy work email kept for backward compat
  'jose@welearn.com',
] as const;

/** Zhanna — teacher / second admin */
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
