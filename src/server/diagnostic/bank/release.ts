import { createHash } from 'node:crypto';

import type { DiagnosticWritingPromptRecord } from '../../../lib/diagnostic/writing.ts';
import type { DiagnosticBankRecord } from '../types.ts';
import { auditDiagnosticItemCues, diagnosticReviewBasisSha256 } from './cue-audit.ts';

export type DiagnosticReviewRole = 'linguistic-reviewer' | 'assessment-reviewer' | 'audio-alignment-reviewer';

export interface DiagnosticApproval {
  itemId: string;
  contentVersion: string;
  contentSha256: string;
  reviewBasisSha256: string;
  reviewedAt: string;
  reviewers: readonly { id: string; role: DiagnosticReviewRole }[];
}

export interface DiagnosticApprovalManifest {
  manifestVersion: string;
  updatedAt: string | null;
  objectiveApprovals: readonly DiagnosticApproval[];
  writingApprovals: readonly DiagnosticApproval[];
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, canonicalize(child)]));
  }
  return value;
}

function sha256(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(canonicalize(value))).digest('hex');
}

export function diagnosticObjectiveContentSha256(record: DiagnosticBankRecord): string {
  return sha256({ publicItem: record.publicItem, scoring: record.scoring, rationale: record.rationale, source: record.source });
}

export function diagnosticWritingContentSha256(record: DiagnosticWritingPromptRecord): string {
  return sha256({ publicPrompt: record.publicPrompt, source: record.source });
}

export function diagnosticObjectiveReviewBasisSha256(record: DiagnosticBankRecord): string {
  return diagnosticReviewBasisSha256(
    diagnosticObjectiveContentSha256(record),
    'objective',
    auditDiagnosticItemCues(record),
  );
}

export function diagnosticWritingReviewBasisSha256(record: DiagnosticWritingPromptRecord): string {
  return diagnosticReviewBasisSha256(diagnosticWritingContentSha256(record), 'writing');
}

function validateApproval(
  approval: DiagnosticApproval,
  requiredRoles: readonly DiagnosticReviewRole[],
): string[] {
  const errors: string[] = [];
  if (!approval.itemId || !approval.contentVersion) errors.push('item and content version are required');
  if (!/^[a-f0-9]{64}$/.test(approval.contentSha256)) errors.push(`${approval.itemId}: invalid content hash`);
  if (!/^[a-f0-9]{64}$/.test(approval.reviewBasisSha256)) errors.push(`${approval.itemId}: invalid review basis hash`);
  if (Number.isNaN(Date.parse(approval.reviewedAt))) errors.push(`${approval.itemId}: invalid review date`);
  if (new Set(approval.reviewers.map(reviewer => reviewer.id)).size !== approval.reviewers.length) {
    errors.push(`${approval.itemId}: reviewers must be independent identities`);
  }
  for (const role of requiredRoles) {
    if (!approval.reviewers.some(reviewer => reviewer.role === role && reviewer.id.trim())) {
      errors.push(`${approval.itemId}: missing ${role}`);
    }
  }
  return errors;
}

export function releaseApprovedObjectiveBank(
  candidates: readonly DiagnosticBankRecord[],
  manifest: DiagnosticApprovalManifest,
): readonly DiagnosticBankRecord[] {
  if (!manifest.manifestVersion.trim()) throw new Error('diagnostic approval manifest version is required');
  if (new Set(manifest.objectiveApprovals.map(approval => approval.itemId)).size !== manifest.objectiveApprovals.length) {
    throw new Error('diagnostic objective approval ids must be unique');
  }
  const candidatesById = new Map(candidates.map(record => [record.publicItem.id, record]));
  return manifest.objectiveApprovals.map(approval => {
    const record = candidatesById.get(approval.itemId);
    if (!record) throw new Error(`${approval.itemId}: approved objective candidate is unavailable`);
    const requiredRoles: DiagnosticReviewRole[] = record.publicItem.skill === 'listening'
      ? ['linguistic-reviewer', 'assessment-reviewer', 'audio-alignment-reviewer']
      : ['linguistic-reviewer', 'assessment-reviewer'];
    const errors = validateApproval(approval, requiredRoles);
    if (record.exposure !== 'reserved') errors.push(`${approval.itemId}: exposed content cannot enter the reserved bank`);
    if (record.status !== 'reserved' || record.review.status !== 'draft') errors.push(`${approval.itemId}: candidate is not an unapproved reserved draft`);
    if (record.publicItem.contentVersion !== approval.contentVersion) errors.push(`${approval.itemId}: content version mismatch`);
    if (diagnosticObjectiveContentSha256(record) !== approval.contentSha256) errors.push(`${approval.itemId}: content hash mismatch`);
    if (diagnosticObjectiveReviewBasisSha256(record) !== approval.reviewBasisSha256) errors.push(`${approval.itemId}: review basis mismatch`);
    if (errors.length) throw new Error(errors.join('; '));
    return {
      ...record,
      status: 'pilot' as const,
      review: {
        status: 'approved' as const,
        reviewerId: approval.reviewers.map(reviewer => `${reviewer.role}:${reviewer.id}`).join(','),
        reviewedAt: new Date(approval.reviewedAt).toISOString(),
        contentSha256: approval.contentSha256,
      },
    };
  });
}

export function releaseApprovedWritingBank(
  candidates: readonly DiagnosticWritingPromptRecord[],
  manifest: DiagnosticApprovalManifest,
): readonly DiagnosticWritingPromptRecord[] {
  if (new Set(manifest.writingApprovals.map(approval => approval.itemId)).size !== manifest.writingApprovals.length) {
    throw new Error('diagnostic writing approval ids must be unique');
  }
  const candidatesById = new Map(candidates.map(record => [record.publicPrompt.id, record]));
  return manifest.writingApprovals.map(approval => {
    const record = candidatesById.get(approval.itemId);
    if (!record) throw new Error(`${approval.itemId}: approved writing candidate is unavailable`);
    const errors = validateApproval(approval, ['linguistic-reviewer', 'assessment-reviewer']);
    if (record.exposure !== 'reserved') errors.push(`${approval.itemId}: exposed prompt cannot enter the reserved bank`);
    if (record.status !== 'reserved' || record.review.status !== 'draft') errors.push(`${approval.itemId}: prompt is not an unapproved reserved draft`);
    if (record.publicPrompt.contentVersion !== approval.contentVersion) errors.push(`${approval.itemId}: content version mismatch`);
    if (diagnosticWritingContentSha256(record) !== approval.contentSha256) errors.push(`${approval.itemId}: content hash mismatch`);
    if (diagnosticWritingReviewBasisSha256(record) !== approval.reviewBasisSha256) errors.push(`${approval.itemId}: review basis mismatch`);
    if (errors.length) throw new Error(errors.join('; '));
    return {
      ...record,
      status: 'pilot' as const,
      review: {
        status: 'approved' as const,
        reviewerId: approval.reviewers.map(reviewer => `${reviewer.role}:${reviewer.id}`).join(','),
        reviewedAt: new Date(approval.reviewedAt).toISOString(),
        contentSha256: approval.contentSha256,
      },
    };
  });
}
