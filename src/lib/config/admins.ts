/**
 * Central admin-email registry.
 *
 * Keep a single source of truth here so access-control checks across
 * Server Actions, API routes, and page-level redirects stay in sync.
 *
 * This server-owned allowlist is the authorization source of truth. Never
 * accept the user-editable `profiles.role` field as a substitute.
 */

/** Platform-owner administrators — receive the owner dashboard and every admin action. */
export const JOSE_EMAILS = [
  'josedavidduartesilva@gmail.com',
  'david.duartes182@gmail.com',
  // Legacy work email kept for backward compat
  'jose@welearn.com',
] as const;

/** Zhanna's academic-admin accounts — receive the limited academic dashboard. */
export const ZHANNA_EMAILS = [
  'zhanna.duarte@mail.ru',
  'zhanna.korzh@gmail.com',
  // Legacy work email kept for backward compat
  'zhanna@welearn.com',
] as const;

/** All admins combined — use for simple "is this an admin?" checks. */
export const ALL_ADMIN_EMAILS: readonly string[] = [
  ...JOSE_EMAILS,
  ...ZHANNA_EMAILS,
];

export function normalizeAdminEmail(email: string | null | undefined): string {
  return email?.trim().toLowerCase() ?? '';
}

export function isJoseAdminEmail(email: string | null | undefined): boolean {
  return JOSE_EMAILS.some((adminEmail) => adminEmail === normalizeAdminEmail(email));
}

export function isZhannaAdminEmail(email: string | null | undefined): boolean {
  return ZHANNA_EMAILS.some((adminEmail) => adminEmail === normalizeAdminEmail(email));
}

export function isAdminEmail(email: string | null | undefined): boolean {
  return isJoseAdminEmail(email) || isZhannaAdminEmail(email);
}

type AuthIdentity = { email?: string | null; email_confirmed_at?: string | null } | null | undefined;

export function isVerifiedAdminUser(user: AuthIdentity): boolean {
  return Boolean(user?.email_confirmed_at) && isAdminEmail(user?.email);
}

export function isVerifiedJoseAdminUser(user: AuthIdentity): boolean {
  return Boolean(user?.email_confirmed_at) && isJoseAdminEmail(user?.email);
}

export function isVerifiedZhannaAdminUser(user: AuthIdentity): boolean {
  return Boolean(user?.email_confirmed_at) && isZhannaAdminEmail(user?.email);
}
