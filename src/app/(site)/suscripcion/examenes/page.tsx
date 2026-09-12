import type { Metadata } from 'next';
import { randomUUID } from 'node:crypto';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { XPRESS_EXAM_OPTIONS, xpressClassPurchasePath, type XpressExamSlug } from '@/lib/student-onboarding/catalog';
import { activeXpressMembership } from '@/lib/xpress-commerce/payments.server';
import { currentXpressSubscription, wompiAcceptanceLinks } from '@/lib/xpress-commerce/subscriptions.server';
import { getWompiServerConfig } from '@/lib/wompi/server';
import type { XpressOfferId } from '@/lib/xpress-commerce/catalog';
import XpressMembershipClient from './XpressMembershipClient';

export const metadata: Metadata = {
  title: 'Membresía de exámenes | WeLearn',
  description: 'Elige un examen individual o una suscripción recurrente y añade clases con docente si las necesitas.',
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
  const [membership, subscription, wompiDocuments] = await Promise.all([
    activeXpressMembership(user.id),
    currentXpressSubscription(user.id),
    wompiAcceptanceLinks().catch(() => null),
  ]);
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
    initialSubscription={subscription ? {
      id: subscription.id,
      offerId: subscription.offer_id,
      examSlug: subscription.exam_slug,
      amountInCents: subscription.amount_in_cents,
      status: subscription.status,
      initialChargeAt: subscription.initial_charge_at,
      currentPeriodStart: subscription.current_period_start,
      currentPeriodEnd: subscription.current_period_end,
      nextChargeAt: subscription.next_charge_at,
      paymentFailureCount: subscription.payment_failure_count,
    } : null}
    classPurchasePath={xpressClassPurchasePath(exam.id as XpressExamSlug)}
    orderId={orderId}
    transactionId={transactionId}
    wompiPublicKey={getWompiServerConfig().publicKey}
    wompiDocuments={wompiDocuments}
    subscriptionIdempotencyKey={randomUUID()}
    setupMessage={subscriptionMessage(params)}
  />;
}

function subscriptionMessage(params: Record<string, string | string[] | undefined>) {
  if (params.activada === '1') return 'Pago confirmado. Tu suscripción y el acceso ya están activos.';
  if (params.programada === '1') return 'La renovación quedó programada. No cobramos nada hoy.';
  const error = typeof params.error === 'string' ? params.error : '';
  if (error === 'ya-activa') return 'Ya tienes una suscripción abierta. Adminístrala desde esta página.';
  if (error === 'tarjeta') return 'Wompi no pudo guardar ese medio de pago. No se realizó ningún cobro.';
  if (error === 'condiciones') return 'Completa todas las aceptaciones antes de suscribirte.';
  if (error) return 'No pudimos crear la suscripción. No se realizó ningún cobro.';
  return '';
}
