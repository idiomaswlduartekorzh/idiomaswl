import type { StudentExamWorkspace, StudentProductKind } from './catalog';

export type StudentAttempt = Readonly<{
  id: string;
  mockId: string | null;
  title: string;
  createdAt: string;
  score: number | null;
  scoreLabel: string;
  reportHref: string;
  feedbackState: 'not-included' | 'available' | 'processing' | 'delivered';
}>;

export type StudentCourse = Readonly<{
  id: string;
  language: string;
  objective: string;
  plan: string;
  classes: number;
  sessions: number;
  purchasedAt: string;
}>;

export type StudentAccess = Readonly<{
  state: 'active' | 'consumed' | 'expired' | 'none';
  product: StudentProductKind | null;
  exam: StudentExamWorkspace | null;
  startsAt: string | null;
  endsAt: string | null;
  singleAttemptAvailable: boolean;
}>;

export type StudentSubscription = Readonly<{
  id: string;
  status: 'creating_source' | 'pending_initial' | 'scheduled' | 'active' | 'past_due' | 'cancel_at_period_end' | 'canceled';
  nextChargeAt: string | null;
  periodEndsAt: string | null;
  cancelRequestedAt: string | null;
}>;

export type StudentDashboardData = Readonly<{
  name: string;
  email: string;
  access: StudentAccess;
  subscription: StudentSubscription | null;
  attempts: readonly StudentAttempt[];
  courses: readonly StudentCourse[];
  dataAvailable: boolean;
}>;

