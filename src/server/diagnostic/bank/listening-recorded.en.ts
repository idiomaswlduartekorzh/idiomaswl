import publications from '../../../../config/diagnostic/english-listening-audio-publications.json' with { type: 'json' };
import preproductionApprovals from '../../../../config/diagnostic/english-listening-preproduction-approvals.json' with { type: 'json' };
import type { DiagnosticBankRecord } from '../types.ts';
import { diagnosticListeningPreproductionContentSha256 } from './listening-preproduction-hash.ts';
import {
  ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS,
  diagnosticListeningTranscriptSha256,
  type DiagnosticListeningProductionBrief,
} from './listening-production-lower.en.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_BRIEFS } from './listening-production-mid.en.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_BRIEFS } from './listening-production-advanced.en.ts';

export interface DiagnosticListeningAudioPublication {
  mediaId: string;
  productionVersion: string;
  audioSha256: string;
  transcriptSha256: string;
  durationSeconds: number;
  transcriptReviewerId: string;
  alignmentReviewerId: string;
  reviewedAt: string;
}

export interface DiagnosticListeningAudioPublicationManifest {
  manifestVersion: string;
  updatedAt: string | null;
  publications: readonly DiagnosticListeningAudioPublication[];
}

export interface DiagnosticListeningPreproductionApprovalManifest {
  manifestVersion: string;
  updatedAt: string | null;
  approvals: readonly {
    mediaId: string;
    productionVersion: string;
    contentSha256: string;
    reviewedAt: string;
    reviewers: readonly { id: string; role: string; receiptSha256: string }[];
  }[];
}

function validatePreproductionApproval(
  brief: DiagnosticListeningProductionBrief,
  manifest: DiagnosticListeningPreproductionApprovalManifest,
): string[] {
  const errors: string[] = [];
  if (manifest.manifestVersion !== 'english-diagnostic-listening-preproduction-approvals-v1') {
    errors.push('preproduction manifest version mismatch');
  }
  const matches = manifest.approvals.filter(approval => approval.mediaId === brief.audioArtifact.mediaId);
  if (matches.length !== 1) return [...errors, 'exactly one preproduction approval is required'];
  const [approval] = matches;
  if (approval.productionVersion !== brief.productionVersion) errors.push('preproduction version mismatch');
  if (approval.contentSha256 !== diagnosticListeningPreproductionContentSha256(brief)) {
    errors.push('preproduction content hash mismatch');
  }
  if (Number.isNaN(Date.parse(approval.reviewedAt))) errors.push('invalid preproduction review date');
  const roles = approval.reviewers?.map(reviewer => reviewer.role) ?? [];
  const ids = approval.reviewers?.map(reviewer => reviewer.id.trim()) ?? [];
  if (approval.reviewers?.length !== 2
    || roles.filter(role => role === 'linguistic-reviewer').length !== 1
    || roles.filter(role => role === 'assessment-reviewer').length !== 1) {
    errors.push('linguistic and assessment preproduction reviews are required');
  }
  if (ids.some(id => !id) || new Set(ids).size !== 2) errors.push('preproduction reviewers must be independent');
  if (approval.reviewers?.some(reviewer => !/^[a-f0-9]{64}$/u.test(reviewer.receiptSha256)) ?? true) {
    errors.push('preproduction review receipt hash missing');
  }
  return errors;
}

function validatePublication(
  brief: DiagnosticListeningProductionBrief,
  publication: DiagnosticListeningAudioPublication,
): string[] {
  const errors: string[] = [];
  if (publication.productionVersion !== brief.productionVersion) errors.push('production version mismatch');
  if (!/^[a-f0-9]{64}$/.test(publication.audioSha256)) errors.push('invalid audio hash');
  if (!/^[a-f0-9]{64}$/.test(publication.transcriptSha256)) errors.push('invalid transcript hash');
  else if (publication.transcriptSha256 !== diagnosticListeningTranscriptSha256(brief)) errors.push('transcript hash mismatch');
  const [minimumDuration, maximumDuration] = brief.recording.targetDurationSeconds;
  if (!Number.isFinite(publication.durationSeconds)
    || publication.durationSeconds < minimumDuration
    || publication.durationSeconds > maximumDuration) errors.push('duration outside production envelope');
  if (!publication.transcriptReviewerId.trim() || !publication.alignmentReviewerId.trim()) errors.push('audio reviewers are required');
  if (publication.transcriptReviewerId.trim() === publication.alignmentReviewerId.trim()) errors.push('audio reviewers must be independent');
  if (Number.isNaN(Date.parse(publication.reviewedAt))) errors.push('invalid audio review date');
  return errors;
}

function optionId(brief: DiagnosticListeningProductionBrief, question: number, option: number): string {
  return `${brief.id}-q${question}-o${option + 1}`;
}

export function materializeRecordedListeningCandidates(
  briefs: readonly DiagnosticListeningProductionBrief[],
  manifest: DiagnosticListeningAudioPublicationManifest,
  preproductionManifest: DiagnosticListeningPreproductionApprovalManifest,
): readonly DiagnosticBankRecord[] {
  if (!manifest.manifestVersion.trim()) throw new Error('listening publication manifest version is required');
  if (new Set(manifest.publications.map(publication => publication.mediaId)).size !== manifest.publications.length) {
    throw new Error('listening publication media ids must be unique');
  }
  const briefsById = new Map(briefs.map(brief => [brief.audioArtifact.mediaId, brief]));
  return manifest.publications.flatMap(publication => {
    const brief = briefsById.get(publication.mediaId);
    if (!brief) throw new Error(`${publication.mediaId}: publication has no production brief`);
    const errors = [
      ...validatePreproductionApproval(brief, preproductionManifest),
      ...validatePublication(brief, publication),
    ];
    if (errors.length) throw new Error(`${publication.mediaId}: ${errors.join('; ')}`);
    return brief.questions.map((question, questionIndex): DiagnosticBankRecord => {
      const questionNumber = questionIndex + 1;
      const id = `${brief.id}-q${questionNumber}`;
      const optionIds = question.options.map((_, optionIndex) => optionId(brief, questionNumber, optionIndex));
      const distractorIndexes = [0, 1, 2].filter(index => index !== question.correctIndex);
      return {
        publicItem: {
          id,
          contentVersion: `audio-${publication.audioSha256.slice(0, 12)}`,
          language: 'en', skill: 'listening', subdomain: question.subdomain,
          levelCandidate: brief.level, prompt: question.prompt,
          stimulus: {
            kind: 'audio', mediaId: brief.audioArtifact.mediaId,
            src: `/api/diagnostic/media/${brief.audioArtifact.mediaId}`,
            startMs: 0, endMs: Math.ceil(publication.durationSeconds * 1_000), maxPlays: 2,
          },
          response: { kind: 'single-choice', optionIds },
          displayOptions: question.options.map((text, optionIndex) => ({ id: optionIds[optionIndex], text })),
        },
        status: 'reserved', exposure: 'reserved', review: { status: 'draft' },
        scoring: { kind: 'single-choice', optionId: optionIds[question.correctIndex] },
        rationale: {
          key: question.rationale,
          distractors: Object.fromEntries(distractorIndexes.map((optionIndex, rationaleIndex) => [
            optionIds[optionIndex], question.distractorRationales[rationaleIndex],
          ])),
        },
        source: {
          kind: 'welearn-original',
          reference: `${manifest.manifestVersion}:${publication.mediaId}:audio-sha256:${publication.audioSha256}:transcript-sha256:${publication.transcriptSha256}`,
        },
        levelRange: [brief.level, brief.level],
        warnings: [
          'PENDING_INDEPENDENT_LINGUISTIC_REVIEW',
          'PENDING_INDEPENDENT_ASSESSMENT_REVIEW',
          'PENDING_RELEASE_AUDIO_ALIGNMENT_SIGNATURE',
          'PENDING_PILOT_CALIBRATION',
        ],
      };
    });
  });
}

export const ENGLISH_DIAGNOSTIC_RECORDED_LISTENING_CANDIDATES = materializeRecordedListeningCandidates(
  [
    ...ENGLISH_DIAGNOSTIC_LISTENING_LOWER_PRODUCTION_BRIEFS,
    ...ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_BRIEFS,
    ...ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_BRIEFS,
  ],
  publications as DiagnosticListeningAudioPublicationManifest,
  preproductionApprovals as DiagnosticListeningPreproductionApprovalManifest,
);
