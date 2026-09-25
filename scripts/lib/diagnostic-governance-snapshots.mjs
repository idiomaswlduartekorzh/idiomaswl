import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const DIAGNOSTIC_WRITING_GOVERNANCE_PATHS = [
  'src/server/diagnostic/writing.ts',
  'src/server/diagnostic/finalize-core.ts',
  'src/app/api/admin/diagnostic/attempts/[attemptId]/finalize/route.ts',
  'src/app/(site)/dashboard/admin/nivel-radar/page.tsx',
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

export function diagnosticGovernanceSnapshots(root) {
  const writing = createHash('sha256');
  for (const path of DIAGNOSTIC_WRITING_GOVERNANCE_PATHS) {
    writing.update(path).update('\0').update(readFileSync(resolve(root, path))).update('\0');
  }
  return {
    'writing-operations': writing.digest('hex'),
    'retention-policy': reviewableDocumentSha256(root, 'config/diagnostic/data-retention-policy.json'),
    'pilot-criteria': reviewableDocumentSha256(root, 'config/diagnostic/pilot-publication-criteria.json'),
    'delivery-policy': reviewableDocumentSha256(root, 'config/diagnostic/delivery-policy.json'),
  };
}
