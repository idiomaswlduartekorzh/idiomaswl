import type { ReactNode } from 'react';
import { createClient } from '@/lib/supabase/server';
import {
  hasClaimedFreeExamAccess,
  resolveExamAccessForUser,
} from '@/lib/xpress-commerce/access.server';
import type { ExamAccessDecision } from '@/lib/xpress-commerce/access';
import type { WelearnLanguage, XpressExamSlug } from '@/lib/student-onboarding/catalog';
import ExamAccessGate from './ExamAccessGate';

export default async function ExamAccessBoundary({
  examSlug,
  examLabel,
  language,
  children,
  lockedFallback,
  redactLockedChildren = false,
}: {
  examSlug: XpressExamSlug;
  examLabel: string;
  language: WelearnLanguage;
  children: ReactNode;
  /** Optional server-rendered shell that contains no protected assessment payload. */
  lockedFallback?: ReactNode;
  /** Discard protected children from the returned RSC tree unless this user may start. */
  redactLockedChildren?: boolean;
}) {
  let user: { id: string; email_confirmed_at?: string | null } | null = null;
  try {
    const supabase = await createClient();
    const result = await supabase.auth.getUser();
    user = result.data.user;
  } catch {
    // Public discovery remains available; protected actions stay closed.
  }
  const authenticated = Boolean(user?.email_confirmed_at);
  let access: ExamAccessDecision = {
    examSlug,
    level: authenticated ? 'locked' : 'anonymous',
    planId: null,
    source: authenticated ? 'none' : 'anonymous',
    expiresAt: null,
  };
  let freeClaimAvailable = false;

  if (authenticated && user) {
    try {
      const [resolved, alreadyClaimed] = await Promise.all([
        resolveExamAccessForUser(user.id, examSlug),
        hasClaimedFreeExamAccess(user.id),
      ]);
      access = resolved;
      freeClaimAvailable = !alreadyClaimed;
    } catch {
      // Fail closed when the entitlement service is unavailable.
    }
  }

  const mayStart = !['anonymous', 'locked'].includes(access.level);
  const visibleChildren = redactLockedChildren && !mayStart ? lockedFallback ?? null : children;

  return <ExamAccessGate
    access={access}
    authenticated={authenticated}
    freeClaimAvailable={freeClaimAvailable}
    examLabel={examLabel}
    language={language}
  >{visibleChildren}</ExamAccessGate>;
}
