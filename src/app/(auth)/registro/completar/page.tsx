import { redirect } from 'next/navigation';
import { safeCourseReturnPath } from '@/lib/course-pricing/payment';
import {
  parseRegistrationIntent,
  registrationIntentMetadata,
} from '@/lib/student-onboarding/catalog';
import { createClient } from '@/lib/supabase/server';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const metadata = { title: 'Completando registro', robots: { index: false, follow: false } };

export default async function CompleteRegistrationPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const intent = parseRegistrationIntent(params);
  if (!intent) redirect('/registro?error=seleccion');

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === 'string') query.set(key, value);
    }
    redirect(`/login?next=${encodeURIComponent(`/registro/completar?${query.toString()}`)}`);
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      ...registrationIntentMetadata(intent),
      onboarding_completed_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) redirect('/registro?error=guardar');
  const returnValue = typeof params.return === 'string' ? params.return : null;
  redirect(safeCourseReturnPath(returnValue));
}
