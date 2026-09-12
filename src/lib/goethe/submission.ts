import type { GoetheAutomaticScore } from './scoring'

export const GOETHE_SPEAKING_BUCKET = 'goethe-speaking-audio'
export const GOETHE_SUBMISSION_CONSENT_VERSION = 'goethe-a1-review-consent-v1'
export const GOETHE_A1_CONTENT_VERSIONS = {
  'a1-1': 'goethe-a1-1-2026-09-12-r2',
  'a1-2': 'goethe-a1-2-2026-09-12-r2',
} as const
export const GOETHE_A1_CONTENT_VERSION = GOETHE_A1_CONTENT_VERSIONS['a1-1']

export function getGoetheA1ContentVersion(mockId: string): string | null {
  return GOETHE_A1_CONTENT_VERSIONS[mockId as keyof typeof GOETHE_A1_CONTENT_VERSIONS] ?? null
}

export interface GoetheAudioDescriptor {
  questionId: string
  mimeType: string
  size: number
  durationSeconds: number
}

export interface GoetheSubmissionPayload {
  contentVersion: string
  name: string
  email: string
  consentVersion: typeof GOETHE_SUBMISSION_CONSENT_VERSION
  answers: Record<string, number>
  formValues: Record<string, string>
  writing: string
  cardOrders: Record<string, number[]>
  audio: GoetheAudioDescriptor[]
}

export interface GoethePreparedUpload {
  questionId: string
  path: string
  token: string
}

export interface GoethePrepareResponse {
  ok: true
  submissionId: string
  completionToken: string
  uploads: GoethePreparedUpload[]
}

export interface GoetheCompleteResponse {
  ok: true
  submissionId: string
  completionToken: string
  automatic: GoetheAutomaticScore
}

export interface GoetheSubmissionReceipt {
  submissionId: string
  completionToken: string
  automatic: GoetheAutomaticScore
}

export interface GoetheResultStatus {
  ok: true
  status: 'pending' | 'reviewed'
  totalScore: number | null
  totalLabel: string
  skills: { skill: string; score: number; max: number; label: string }[]
  feedback: string | null
  reviewedAt: string | null
}

export interface GoetheReviewPayload {
  writing: {
    content1: number
    content2: number
    content3: number
    conventions: number
    raw: number
  }
  speaking: {
    part1: number
    part2: number
    part3: number
    raw: number
  }
  evidenceNotes: string
  totalRaw: number
  totalScore: number
  passed: boolean
  band: string
  reviewedAt: string
  reviewedBy: string
}
