import { redirect } from 'next/navigation';
import {
  mayInitializeRegistrationProfile,
  parseRegistrationIntent,
  registrationCompletionPath,
  registrationIntentMetadata,
  registrationPurchasePath,
  safeStudentReturnPath,
} from '@/lib/student-onboarding/catalog';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { claimFreeExamAccess } from '@/lib/xpress-commerce/access.server';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const fields = 'student_path,language,subject,target_exam,xpress_plan_interest,onboarding_completed_at';

export const metadata = { title: 'Completando registro', robots: { index: false, follow: false } };

export default async function CompleteRegistrationPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const intent = parseRegistrationIntent(params);
  if (!intent) redirect('/registro?error=seleccion');
  const destination = safeStudentReturnPath(typeof params.return === 'string' ? params.return : registrationPurchasePath(intent));

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email_confirmed_at) {
    const next = registrationCompletionPath(intent, destination);
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }

  // The learner can edit presentation fields. Initial enrolment is a server write bound to the verified identity.
  const admin = createAdminClient();
  const readProfile = () => admin.from('profiles').select(fields).eq('id', user.id).single();
  const { data: previous, error: readError } = await readProfile();
  if (readError || !previous) redirect('/registro?error=guardar');
  let profile = previous;
  let initializedAt: string | null = null;
  if (mayInitializeRegistrationProfile(previous, intent)) {
    const now = new Date().toISOString();
    const { data: initialized, error } = await admin.from('profiles')
      .update({ ...registrationIntentMetadata(intent), onboarding_completed_at: now })
      .eq('id', user.id).is('student_path', null).is('onboarding_completed_at', null)
      .select(fields).maybeSingle();
    if (error) redirect('/registro?error=guardar');
    if (initialized) {
      profile = initialized;
      initializedAt = now;
    } else {
      // Another callback or a staff assignment initialized the profile first.
      const refreshed = await readProfile();
      if (refreshed.error || !refreshed.data) redirect('/registro?error=guardar');
      profile = refreshed.data;
    }
  }

  if (intent.path === 'exam' && intent.plan === 'exam-free' && profile.student_path === 'exam'
    && profile.target_exam === intent.exam && profile.xpress_plan_interest === 'exam-free') {
    try {
      await claimFreeExamAccess(user.id, intent.exam);
    } catch (error) {
      const code = error instanceof Error ? error.message : 'free_exam_claim_failed';
      if (initializedAt && (code === 'free_exam_already_claimed' || code === 'free_exam_requires_first_access')) {
        // A previous entitlement won the claim. Restore only this callback's provisional selection.
        const reverted = await admin.from('profiles').update(previous).eq('id', user.id)
          .eq('onboarding_completed_at', initializedAt).eq('target_exam', intent.exam).eq('xpress_plan_interest', 'exam-free');
        if (reverted.error) redirect('/registro?error=guardar');
      }
      redirect(`/dashboard/student?error=${encodeURIComponent(code)}`);
    }
  }
  redirect(destination);
}
