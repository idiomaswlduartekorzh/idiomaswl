import type { ExamSubmissionReceipt } from '@/lib/exam-review/submission-receipt';
import type { FullAssessment } from '@/lib/labs/types';

export type ToeflReportPaymentStatus = 'PENDING' | 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR';

export interface ToeflCheckoutResponse {
  ok: true;
  paymentStatus: ToeflReportPaymentStatus;
  amountInCents: number;
  currency: 'COP';
  speakingReviewSlaHours: number;
  checkoutUrl: string | null;
  reportUrl: string;
}

export interface ToeflReportSkill {
  skill: string;
  score: number;
  max: number;
  label: string;
  raw?: string;
}

export interface ToeflPaidReport {
  ok: true;
  paymentStatus: 'APPROVED';
  amountInCents: number;
  currency: 'COP';
  paidAt: string;
  speakingReviewSlaHours: number;
  assessmentReceipt: ExamSubmissionReceipt;
  submission: {
    id: string;
    mockId: string;
    mockTitle: string;
    studentName: string;
    skills: ToeflReportSkill[];
    writingEmail: string;
    writingDiscussion: string;
    writingEmailAssessment: FullAssessment | null;
    writingDiscussionAssessment: FullAssessment | null;
    speakingRepeatAssessment: { score: number; evidenceNotes: string; reviewedAt: string } | null;
    speakingInterviewAssessment: { score: number; evidenceNotes: string; reviewedAt: string } | null;
    reviewedAt: string | null;
    totalLabel: string | null;
  };
}

export interface ToeflPendingReport {
  ok: true;
  paymentStatus: Exclude<ToeflReportPaymentStatus, 'APPROVED'>;
  amountInCents: number;
  currency: 'COP';
  speakingReviewSlaHours: number;
}

export type ToeflReportResponse = ToeflPaidReport | ToeflPendingReport;

export function toeflReportCookieName(submissionId: string): string {
  return `wl_toefl_report_${submissionId.replaceAll('-', '')}`;
}
