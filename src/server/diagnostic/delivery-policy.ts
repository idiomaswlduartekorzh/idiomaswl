export type DiagnosticAccessMode = 'pilot' | 'production';

export interface DiagnosticDeliveryChannelPolicy {
  maximumConcurrentActiveAttempts: number;
  minimumDaysBetweenCompletedAttempts: number;
  exposureLookbackDays: number;
  resultValidityDays: number;
  scheduledRetestAllowed: boolean;
}

export interface DiagnosticDeliveryPolicy {
  policyVersion: string;
  status: 'provisional-pending-academic-and-product-approval' | 'approved';
  language: 'en';
  pilot: DiagnosticDeliveryChannelPolicy;
  production: DiagnosticDeliveryChannelPolicy;
  approval: null | {
    manifestSha256: string;
    snapshotSha256: string;
    approvedAt: string;
    approvedBy: readonly string[];
    appliedBy: string;
  };
  notes: readonly string[];
}

const POLICY_KEYS = ['approval', 'language', 'notes', 'pilot', 'policyVersion', 'production', 'status'];
const CHANNEL_KEYS = [
  'exposureLookbackDays', 'maximumConcurrentActiveAttempts', 'minimumDaysBetweenCompletedAttempts',
  'resultValidityDays', 'scheduledRetestAllowed',
];
const APPROVAL_KEYS = ['appliedBy', 'approvedAt', 'approvedBy', 'manifestSha256', 'snapshotSha256'];
const SHA256 = /^[a-f0-9]{64}$/u;
const IDENTITY = /^[A-Za-z0-9][A-Za-z0-9._@+-]{2,159}$/u;

function integerInRange(value: unknown, minimum: number, maximum: number): value is number {
  return Number.isInteger(value) && Number(value) >= minimum && Number(value) <= maximum;
}

export function validateDiagnosticDeliveryPolicy(policy: DiagnosticDeliveryPolicy): string[] {
  const errors: string[] = [];
  if (!policy || typeof policy !== 'object' || Array.isArray(policy)
    || Object.keys(policy).sort().join('|') !== POLICY_KEYS.join('|')) {
    return ['delivery policy has unexpected fields'];
  }
  if (!/^english-diagnostic-delivery-policy-v[1-9][0-9]*$/u.test(policy.policyVersion ?? '')) {
    errors.push('delivery policy version is invalid');
  }
  if (!['provisional-pending-academic-and-product-approval', 'approved'].includes(policy.status)) {
    errors.push('delivery policy status is invalid');
  }
  if (policy.language !== 'en') errors.push('delivery policy language is invalid');
  if (!Array.isArray(policy.notes) || policy.notes.length < 1
    || policy.notes.some(note => typeof note !== 'string' || note.trim().length < 10)) {
    errors.push('delivery policy notes are incomplete');
  }
  for (const mode of ['pilot', 'production'] as const) {
    const channel = policy[mode];
    if (!channel || typeof channel !== 'object' || Array.isArray(channel)
      || Object.keys(channel).sort().join('|') !== CHANNEL_KEYS.join('|')) {
      errors.push(`${mode} delivery policy has unexpected fields`);
      continue;
    }
    if (!integerInRange(channel.maximumConcurrentActiveAttempts, 1, 3)) {
      errors.push(`${mode} maximum concurrent attempts must be between 1 and 3`);
    }
    if (!integerInRange(channel.minimumDaysBetweenCompletedAttempts, 0, 365)) {
      errors.push(`${mode} cooldown must be between 0 and 365 days`);
    }
    if (!integerInRange(channel.exposureLookbackDays, 1, 730)) {
      errors.push(`${mode} exposure lookback must be between 1 and 730 days`);
    }
    if (!integerInRange(channel.resultValidityDays, 1, 730)) {
      errors.push(`${mode} result validity must be between 1 and 730 days`);
    }
    if (typeof channel.scheduledRetestAllowed !== 'boolean') errors.push(`${mode} retest flag must be boolean`);
  }
  if (policy.pilot?.minimumDaysBetweenCompletedAttempts !== 0 || policy.pilot?.scheduledRetestAllowed !== true) {
    errors.push('pilot policy must permit scheduled reliability retests');
  }
  if ((policy.production?.minimumDaysBetweenCompletedAttempts ?? 0) < 1
    || policy.production?.scheduledRetestAllowed !== false) {
    errors.push('production policy must enforce a cooldown without retest override');
  }
  if (policy.status === 'approved' && !policy.approval) errors.push('approved delivery policy requires bound approval');
  if (policy.status === 'approved' && policy.approval) {
    const approval = policy.approval;
    const references = Array.isArray(approval.approvedBy) ? approval.approvedBy : [];
    const reviewers = references.map(reference => reference.slice(reference.indexOf(':') + 1));
    if (Object.keys(approval).sort().join('|') !== APPROVAL_KEYS.join('|')
      || !SHA256.test(approval.manifestSha256 ?? '')
      || !SHA256.test(approval.snapshotSha256 ?? '')
      || typeof approval.approvedAt !== 'string' || Number.isNaN(Date.parse(approval.approvedAt))
      || new Date(Date.parse(approval.approvedAt)).toISOString() !== approval.approvedAt
      || references.length !== 2
      || !references.some(reference => reference.startsWith('academic-lead:'))
      || !references.some(reference => reference.startsWith('product-owner:'))
      || new Set(reviewers).size !== 2
      || reviewers.some(reviewer => !IDENTITY.test(reviewer))
      || !IDENTITY.test(approval.appliedBy ?? '')) {
      errors.push('delivery policy approval is invalid');
    }
  }
  if (policy.status !== 'approved' && policy.approval !== null) errors.push('provisional delivery policy cannot contain approval');
  return errors;
}

export function diagnosticDeliveryRules(
  policy: DiagnosticDeliveryPolicy,
  accessMode: DiagnosticAccessMode,
): DiagnosticDeliveryChannelPolicy {
  const errors = validateDiagnosticDeliveryPolicy(policy);
  if (errors.length) throw new Error(errors.join('; '));
  if (accessMode === 'production' && policy.status !== 'approved') {
    throw new Error('diagnostic production delivery policy is not approved');
  }
  return policy[accessMode];
}
