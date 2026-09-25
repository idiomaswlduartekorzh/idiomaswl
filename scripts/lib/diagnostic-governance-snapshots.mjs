import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const DIAGNOSTIC_WRITING_GOVERNANCE_PATHS = [
  'docs/diagnostic-writing-provider-runbook.md',
  'src/lib/diagnostic/writing.ts',
  'src/lib/diagnostic/admin-review.ts',
  'src/server/diagnostic/writing.ts',
  'src/server/diagnostic/writing-automation.ts',
  'src/server/diagnostic/writing-provider.ts',
  'src/server/diagnostic/finalize-core.ts',
  'src/server/diagnostic/repository.server.ts',
  'src/lib/diagnostic/result-language.ts',
  'src/app/api/admin/diagnostic/attempts/[attemptId]/finalize/route.ts',
  'src/app/(site)/dashboard/admin/nivel-radar/page.tsx',
  'src/app/(site)/dashboard/admin/nivel-radar/DiagnosticWritingReviewClient.tsx',
  'src/app/(site)/nivel-radar/AdaptiveNivelRadarClient.tsx',
  'supabase/migrations/20260925030000_diagnostic_writing_automation.sql',
  'supabase/migrations/20260925031500_diagnostic_human_writing_review.sql',
  'supabase/migrations/20260925033000_diagnostic_human_only_writing.sql',
];

export const DIAGNOSTIC_DELIVERY_GOVERNANCE_PATHS = [
  '.env.example',
  'config/diagnostic/audio-check.json',
  'config/diagnostic/delivery-policy.json',
  'config/diagnostic/item-controls.json',
  'supabase/migrations/20260925050000_diagnostic_delivery_policy.sql',
  'supabase/migrations/20260925051500_diagnostic_pilot_retests.sql',
  'src/server/diagnostic/delivery-policy.ts',
  'src/server/diagnostic/bank/controls.ts',
  'src/server/diagnostic/start-core.ts',
  'src/server/diagnostic/start.server.ts',
  'src/server/diagnostic/production-rollout.ts',
  'src/server/diagnostic/release-runtime-core.ts',
  'src/server/diagnostic/release-runtime.ts',
  'src/server/diagnostic/pilot-analytics.ts',
  'src/server/diagnostic/observability.ts',
  'src/server/diagnostic/resume.server.ts',
  'src/server/diagnostic/privacy.server.ts',
  'src/server/diagnostic/submit.server.ts',
  'src/server/diagnostic/finalize-core.ts',
  'src/server/diagnostic/measurement.ts',
  'src/server/diagnostic/repository.server.ts',
  'src/lib/diagnostic/result-language.ts',
  'src/app/api/admin/diagnostic/pilot-enrollments/route.ts',
  'src/app/api/admin/diagnostic/pilot-report/route.ts',
  'src/app/api/admin/diagnostic/attempts/[attemptId]/finalize/route.ts',
  'src/app/api/diagnostic/attempts/route.ts',
  'src/app/api/diagnostic/attempts/[attemptId]/route.ts',
  'src/app/api/diagnostic/attempts/[attemptId]/stages/[stageId]/route.ts',
  'src/app/api/diagnostic/media/[mediaId]/route.ts',
  'src/app/(site)/dashboard/admin/nivel-radar/PilotEnrollmentAdminClient.tsx',
  'src/app/(site)/dashboard/admin/nivel-radar/DiagnosticPilotHealthClient.tsx',
  'src/app/(site)/nivel-radar/AdaptiveNivelRadarClient.tsx',
  'scripts/check-diagnostic-production-rollout.mjs',
  'scripts/check-diagnostic-release-readiness.mjs',
  'scripts/lib/diagnostic-release-readiness.mjs',
  'docs/diagnostic-interpretation-guide.md',
  'docs/diagnostic-release-operations-runbook.md',
];

export const DIAGNOSTIC_PILOT_CRITERIA_GOVERNANCE_PATHS = [
  'config/diagnostic/pilot-publication-criteria.json',
  'src/lib/diagnostic/blueprint.ts',
  'docs/diagnostic-bank-readiness.json',
  'docs/diagnostic-mst-simulation-baseline.json',
  'docs/diagnostic-pilot-recruitment-plan.json',
  'scripts/lib/diagnostic-pilot-recruitment.mjs',
];

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function diagnosticReviewableDocumentSha256(value) {
  const reviewable = { ...value };
  delete reviewable.status;
  delete reviewable.approval;
  return createHash('sha256').update(canonical(reviewable)).digest('hex');
}

function reviewableDocumentSha256(root, path) {
  return diagnosticReviewableDocumentSha256(JSON.parse(readFileSync(resolve(root, path), 'utf8')));
}

export function diagnosticDeliveryGovernanceSnapshot(root) {
  const delivery = createHash('sha256');
  for (const path of DIAGNOSTIC_DELIVERY_GOVERNANCE_PATHS) {
    const bytes = path === 'config/diagnostic/delivery-policy.json'
      ? diagnosticReviewableDocumentSha256(JSON.parse(readFileSync(resolve(root, path), 'utf8')))
      : readFileSync(resolve(root, path));
    delivery.update(path).update('\0').update(bytes).update('\0');
  }
  return delivery.digest('hex');
}

export function diagnosticPilotCriteriaGovernanceSnapshot(root) {
  const pilot = createHash('sha256');
  for (const path of DIAGNOSTIC_PILOT_CRITERIA_GOVERNANCE_PATHS) {
    const bytes = path === 'config/diagnostic/pilot-publication-criteria.json'
      ? diagnosticReviewableDocumentSha256(JSON.parse(readFileSync(resolve(root, path), 'utf8')))
      : readFileSync(resolve(root, path));
    pilot.update(path).update('\0').update(bytes).update('\0');
  }
  return pilot.digest('hex');
}

export function diagnosticWritingGovernanceSnapshot(root) {
  const writing = createHash('sha256');
  for (const path of DIAGNOSTIC_WRITING_GOVERNANCE_PATHS) {
    writing.update(path).update('\0').update(readFileSync(resolve(root, path))).update('\0');
  }
  return writing.digest('hex');
}

export function diagnosticGovernanceSnapshots(root) {
  return {
    'writing-operations': diagnosticWritingGovernanceSnapshot(root),
    'retention-policy': reviewableDocumentSha256(root, 'config/diagnostic/data-retention-policy.json'),
    'pilot-criteria': diagnosticPilotCriteriaGovernanceSnapshot(root),
    'delivery-policy': diagnosticDeliveryGovernanceSnapshot(root),
  };
}
