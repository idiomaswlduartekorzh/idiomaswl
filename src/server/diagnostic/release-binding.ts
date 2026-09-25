const SHA256 = /^[a-f0-9]{64}$/u;
const COMMIT_SHA = /^[a-f0-9]{40}$/u;

function normalized(value: string | undefined): string | null {
  const result = value?.trim() ?? '';
  return result || null;
}

function supabaseProject(endpoint: string | undefined): string | null {
  try {
    const hostname = new URL(endpoint ?? '').hostname;
    if (!hostname) return null;
    return hostname.endsWith('.supabase.co') ? hostname.split('.')[0] : hostname;
  } catch {
    return null;
  }
}

export interface DiagnosticLiveReleaseBinding {
  bindingVersion: 'diagnostic-live-release-binding-v1';
  ready: boolean;
  blockers: readonly string[];
  accessMode: 'pilot' | 'production' | null;
  sourceSha256: string | null;
  bankSnapshotSha256: string;
  commitSha: string | null;
  supabaseProject: string | null;
  releaseId: string | null;
}

/**
 * Non-secret identity of the running diagnostic deployment.
 *
 * A live verifier must compare every value with the checkout it intends to
 * release. The application never treats this self-report as release approval.
 */
export function buildDiagnosticLiveReleaseBinding(input: {
  env: Readonly<Record<string, string | undefined>>;
  currentBankSha256: string;
}): DiagnosticLiveReleaseBinding {
  const accessModeValue = normalized(input.env.DIAGNOSTIC_ACCESS_MODE);
  const accessMode = accessModeValue === 'pilot' || accessModeValue === 'production'
    ? accessModeValue : null;
  const sourceSha256 = normalized(input.env.DIAGNOSTIC_RELEASE_SOURCE_SHA256);
  const commitSha = normalized(input.env.DIAGNOSTIC_RELEASE_COMMIT_SHA)
    ?? normalized(input.env.VERCEL_GIT_COMMIT_SHA)
    ?? normalized(input.env.GITHUB_SHA);
  const project = supabaseProject(input.env.NEXT_PUBLIC_SUPABASE_URL);
  const blockers: string[] = [];
  if (!accessMode) blockers.push('access-mode-invalid');
  if (!sourceSha256 || !SHA256.test(sourceSha256)) blockers.push('source-fingerprint-invalid');
  if (!SHA256.test(input.currentBankSha256)) blockers.push('bank-snapshot-invalid');
  if (!commitSha || !COMMIT_SHA.test(commitSha)) blockers.push('commit-sha-invalid');
  if (!project) blockers.push('supabase-project-invalid');

  return {
    bindingVersion: 'diagnostic-live-release-binding-v1',
    ready: blockers.length === 0,
    blockers,
    accessMode,
    sourceSha256,
    bankSnapshotSha256: input.currentBankSha256,
    commitSha,
    supabaseProject: project,
    releaseId: normalized(input.env.DIAGNOSTIC_RELEASE_ID),
  };
}
