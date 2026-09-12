import type { StudentExamWorkspace, StudentProductKind } from './catalog';

export type StudentAttempt = Readonly<{
  id: string;
  examSlug: string;
  examName: string;
  examFlag: string;
  examHubHref: string;
  mockId: string | null;
  title: string;
  createdAt: string;
  score: number | null;
  scoreLabel: string;
  reportHref: string;
  feedbackState: 'not-included' | 'available' | 'processing' | 'delivered' | 'failed';
  skills: readonly StudentSkillScore[];
}>;

export type StudentSkillScore = Readonly<{
  name: string;
  score: number;
  maximum: number;
  percentage: number;
}>;

export type StudentProgressPoint = Readonly<{
  id: string;
  title: string;
  createdAt: string;
  score: number;
}>;

export type StudentSkillInsight = Readonly<{
  name: string;
  percentage: number;
  measurements: number;
}>;

export type StudentProgressSummary = Readonly<{
  examSlug: string | null;
  examName: string | null;
  points: readonly StudentProgressPoint[];
  averageScore: number | null;
  trendPoints: number | null;
  strengths: readonly StudentSkillInsight[];
  improvements: readonly StudentSkillInsight[];
  activeDaysLast30: number;
  currentStreak: number;
  lastActiveAt: string | null;
}>;

export type StudentAssignment = Readonly<{
  id: string;
  title: string;
  instructions: string;
  resourceUrl: string | null;
  dueAt: string | null;
  status: 'assigned' | 'completed' | 'canceled';
  assignedAt: string;
  completedAt: string | null;
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
  assignments: readonly StudentAssignment[];
  progress: StudentProgressSummary;
  dataAvailable: boolean;
}>;
