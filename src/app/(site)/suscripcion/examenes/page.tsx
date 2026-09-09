import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { XPRESS_EXAM_OPTIONS, xpressClassPurchasePath, type XpressExamSlug } from '@/lib/student-onboarding/catalog';
import { activeXpressMembership } from '@/lib/xpress-commerce/payments.server';
import type { XpressOfferId } from '@/lib/xpress-commerce/catalog';
import XpressMembershipClient from './XpressMembershipClient';

export const metadata: Metadata = {
  title: 'Membresía de exámenes | WeLearn',
  description: 'Elige tu pase de simulacros y añade clases con docente si las necesitas.',
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function XpressMembershipPage({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent('/suscripcion/examenes')}`);

  const { data: profile } = await supabase.from('profiles')
    .select('student_path,target_exam,xpress_plan_interest').eq('id', user.id).single();
  if (profile?.student_path !== 'exam') redirect('/precios');
  const exam = XPRESS_EXAM_OPTIONS.find((item) => item.id === profile.target_exam);
  if (!exam) redirect('/registro?error=seleccion');

  const params = await searchParams;
  const orderId = typeof params.orden === 'string' ? params.orden : null;
  const transactionId = typeof params.id === 'string' ? params.id : null;
  const membership = await activeXpressMembership(user.id);
  const initialOfferId: XpressOfferId = ['exam-single', 'exam-auto', 'exam-teacher'].includes(String(profile.xpress_plan_interest))
    ? profile.xpress_plan_interest as XpressOfferId
    : 'exam-auto';

  return <XpressMembershipClient
    examSlug={exam.id as XpressExamSlug}
    examLabel={exam.label}
    initialOfferId={initialOfferId}
    activeMembership={membership ? {
      offerId: membership.offer_id,
      examSlug: membership.exam_slug,
      startsAt: membership.starts_at,
      endsAt: membership.ends_at,
    } : null}
    classPurchasePath={xpressClassPurchasePath(exam.id as XpressExamSlug)}
    orderId={orderId}
    transactionId={transactionId}
  />;
}
