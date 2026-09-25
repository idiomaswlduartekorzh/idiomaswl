import type { DiagnosticWritingPromptRecord } from '../../../lib/diagnostic/writing.ts';
import type { DiagnosticBankRecord } from '../types.ts';

const CONTROL_REASONS = [
  'content-defect',
  'fairness-risk',
  'media-defect',
  'psychometric-anomaly',
  'security-exposure',
] as const;
const CONTROL_ROLES = ['academic-lead', 'measurement-lead'] as const;
const IDENTITY = /^[A-Za-z0-9][A-Za-z0-9._@+-]{2,159}$/u;
const REFERENCE = /^[A-Za-z0-9][A-Za-z0-9._:/+-]{2,199}$/u;

export type DiagnosticItemControlReason = (typeof CONTROL_REASONS)[number];
export type DiagnosticItemControlRole = (typeof CONTROL_ROLES)[number];

export interface DiagnosticItemRetirementControl {
  kind: 'objective' | 'writing';
  itemId: string;
  contentVersion: string;
  action: 'retire';
  reason: DiagnosticItemControlReason;
  retiredAt: string;
  decisionReference: string;
  reviewers: readonly { id: string; role: DiagnosticItemControlRole }[];
}

export interface DiagnosticItemControlManifest {
  manifestVersion: string;
  updatedAt: string | null;
  controls: readonly DiagnosticItemRetirementControl[];
}

const iso = (value: unknown): value is string => typeof value === 'string'
  && !Number.isNaN(Date.parse(value))
  && new Date(Date.parse(value)).toISOString() === value;

function validateControlShape(control: DiagnosticItemRetirementControl, manifestUpdatedAt: string): void {
  const allowedKeys = ['action', 'contentVersion', 'decisionReference', 'itemId', 'kind', 'reason', 'retiredAt', 'reviewers'];
  if (Object.keys(control).sort().join('|') !== allowedKeys.join('|')) throw new Error('diagnostic item control has unexpected fields');
  if (!['objective', 'writing'].includes(control.kind) || control.action !== 'retire') {
    throw new Error('diagnostic item control action is invalid');
  }
  if (!control.itemId?.trim() || !control.contentVersion?.trim()) throw new Error('diagnostic item control identity is required');
  if (!CONTROL_REASONS.includes(control.reason)) throw new Error(`${control.itemId}: diagnostic item control reason is invalid`);
  if (!iso(control.retiredAt) || Date.parse(control.retiredAt) > Date.parse(manifestUpdatedAt)) {
    throw new Error(`${control.itemId}: diagnostic item retirement timestamp is invalid`);
  }
  if (!REFERENCE.test(control.decisionReference)) throw new Error(`${control.itemId}: diagnostic item decision reference is invalid`);
  if (!Array.isArray(control.reviewers) || control.reviewers.length !== CONTROL_ROLES.length
    || new Set(control.reviewers.map(reviewer => reviewer.id)).size !== CONTROL_ROLES.length
    || control.reviewers.some(reviewer => Object.keys(reviewer).sort().join('|') !== 'id|role'
      || !IDENTITY.test(reviewer.id))) {
    throw new Error(`${control.itemId}: diagnostic item retirement requires independent reviewers`);
  }
  for (const role of CONTROL_ROLES) {
    if (!control.reviewers.some(reviewer => reviewer.role === role)) {
      throw new Error(`${control.itemId}: diagnostic item retirement is missing ${role}`);
    }
  }
}

/**
 * A retirement changes only future selection eligibility. Records remain in
 * the server bank so an already-issued stage can still be resumed and scored
 * against its exact item/content version.
 */
export function applyDiagnosticItemControls(input: {
  objectiveBank: readonly DiagnosticBankRecord[];
  writingBank: readonly DiagnosticWritingPromptRecord[];
  manifest: DiagnosticItemControlManifest;
}): {
  objectiveBank: readonly DiagnosticBankRecord[];
  writingBank: readonly DiagnosticWritingPromptRecord[];
} {
  const { manifest } = input;
  if (!manifest || Object.keys(manifest).sort().join('|') !== 'controls|manifestVersion|updatedAt') {
    throw new Error('diagnostic item control manifest has unexpected fields');
  }
  if (!/^english-diagnostic-item-controls-v[1-9][0-9]*$/u.test(manifest?.manifestVersion ?? '')) {
    throw new Error('diagnostic item control manifest version is invalid');
  }
  if (!Array.isArray(manifest.controls)) throw new Error('diagnostic item controls must be an array');
  if (manifest.controls.length === 0 && manifest.updatedAt !== null) {
    throw new Error('empty diagnostic item controls cannot claim an update');
  }
  if (manifest.controls.length > 0 && !iso(manifest.updatedAt)) {
    throw new Error('diagnostic item control update timestamp is required');
  }
  const identities = manifest.controls.map(control => `${control.kind}:${control.itemId}`);
  if (new Set(identities).size !== identities.length) throw new Error('diagnostic item controls must be unique');

  const objectiveById = new Map(input.objectiveBank.map(record => [record.publicItem.id, record]));
  const writingById = new Map(input.writingBank.map(record => [record.publicPrompt.id, record]));
  for (const control of manifest.controls) {
    validateControlShape(control, manifest.updatedAt ?? '');
    const record = control.kind === 'objective' ? objectiveById.get(control.itemId) : writingById.get(control.itemId);
    const contentVersion = record && ('publicItem' in record
      ? record.publicItem.contentVersion
      : record.publicPrompt.contentVersion);
    if (!record || contentVersion !== control.contentVersion) {
      throw new Error(`${control.itemId}: diagnostic item control does not match the released bank`);
    }
    if (record.exposure !== 'reserved' || record.review.status !== 'approved'
      || !['pilot', 'operational'].includes(record.status)) {
      throw new Error(`${control.itemId}: only an approved selectable item can be retired`);
    }
  }

  const retired = new Set(identities);
  return {
    objectiveBank: input.objectiveBank.map(record => retired.has(`objective:${record.publicItem.id}`)
      ? { ...record, status: 'retired' as const }
      : record),
    writingBank: input.writingBank.map(record => retired.has(`writing:${record.publicPrompt.id}`)
      ? { ...record, status: 'retired' as const }
      : record),
  };
}
