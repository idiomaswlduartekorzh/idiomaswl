import type { Metadata } from 'next';
import { randomUUID } from 'node:crypto';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { XPRESS_EXAM_OPTIONS, xpressClassPurchasePath, type XpressExamSlug } from '@/lib/student-onboarding/catalog';
import { activeXpressMembership } from '@/lib/xpress-commerce/payments.server';
import { currentXpressSubscription, wompiAcceptanceLinks } from '@/lib/xpress-commerce/subscriptions.server';
import { getWompiServerConfig } from '@/lib/wompi/server';
import type { XpressOfferId } from '@/lib/xpress-commerce/catalog';
import { getIcfesMembershipOfferReadiness, getIcfesTeacherOfferReadiness } from '@/lib/icfes/teacher-offer-readiness.server';
import { ICFES_TEACHER_ADDENDUM } from '@/lib/icfes/teacher-ops-v1';
import XpressMembershipClient from './XpressMembershipClient';

export const metadata: Metadata = {
  title: 'Membresía de exámenes | WeLearn',
  description: 'Elige un examen individual o una suscripción recurrente y añade clases con docente si las necesitas.',
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function XpressMembershipPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const requestedIcfesAttempt = typeof params.attempt === 'string'
    && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(params.attempt)
    ? params.attempt.toLowerCase() : null;
  const requestedOffer = params.plan === 'exam-teacher' ? 'exam-teacher' : 'exam-auto';
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const next = `/suscripcion/examenes${requestedIcfesAttempt
      ? `?attempt=${encodeURIComponent(requestedIcfesAttempt)}&plan=${requestedOffer}` : ''}`;
    redirect(requestedIcfesAttempt
      ? `/registro?path=exam&language=ingles&exam=icfes&plan=${requestedOffer}&next=${encodeURIComponent(next)}`
      : `/login?next=${encodeURIComponent(next)}`);
  }

  const { data: profile } = await supabase.from('profiles')
    .select('student_path,target_exam,xpress_plan_interest').eq('id', user.id).single();
  if (profile?.student_path !== 'exam' && !requestedIcfesAttempt) redirect('/precios');
  const exam = XPRESS_EXAM_OPTIONS.find((item) => item.id === (requestedIcfesAttempt ? 'icfes' : profile?.target_exam));
  if (!exam) redirect('/registro?error=seleccion');

  const orderId = typeof params.orden === 'string' ? params.orden : null;
  const transactionId = typeof params.id === 'string' ? params.id : null;
  const [membership, subscription, wompiDocuments, icfesMembershipReadiness, icfesTeacherReadiness] = await Promise.all([
    activeXpressMembership(user.id),
    currentXpressSubscription(user.id),
    wompiAcceptanceLinks().catch(() => null),
    exam.id === 'icfes' ? getIcfesMembershipOfferReadiness() : Promise.resolve(null),
    exam.id === 'icfes' ? getIcfesTeacherOfferReadiness() : Promise.resolve(null),
  ]);
  const icfesAttemptId = exam.id === 'icfes' ? requestedIcfesAttempt : null;
  const preferredOfferId: XpressOfferId = requestedIcfesAttempt
    ? requestedOffer
    : ['exam-single', 'exam-auto', 'exam-teacher'].includes(String(profile?.xpress_plan_interest))
      ? profile?.xpress_plan_interest as XpressOfferId
    : 'exam-auto';
  const initialOfferId: XpressOfferId = exam.id === 'icfes'
    && (preferredOfferId === 'exam-single'
      || (preferredOfferId === 'exam-teacher' && !icfesTeacherReadiness?.purchasable))
    ? 'exam-auto'
    : preferredOfferId;

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
    icfesAttemptId={icfesAttemptId}
    icfesMembershipReadiness={icfesMembershipReadiness ? {
      purchasable: icfesMembershipReadiness.purchasable,
      message: icfesMembershipReadiness.message,
    } : null}
    icfesTeacherReadiness={icfesTeacherReadiness ? {
      purchasable: icfesTeacherReadiness.purchasable,
      message: icfesTeacherReadiness.message,
    } : null}
    icfesTeacherAddendum={exam.id === 'icfes' ? {
      version: ICFES_TEACHER_ADDENDUM.version,
      supersedesSection: ICFES_TEACHER_ADDENDUM.supersedesSection,
    } : null}
  />;
}

function subscriptionMessage(params: Record<string, string | string[] | undefined>) {
  if (params.activada === '1') return 'Pago confirmado. Tu suscripción y el acceso ya están activos.';
  if (params.programada === '1') return 'La renovación quedó programada. No cobramos nada hoy.';
  const error = typeof params.error === 'string' ? params.error : '';
  if (error === 'ya-activa') return 'Ya tienes una suscripción abierta. Adminístrala desde esta página.';
  if (error === 'tarjeta') return 'Wompi no pudo guardar ese medio de pago. No se realizó ningún cobro.';
  if (error === 'condiciones') return 'Completa todas las aceptaciones antes de suscribirte.';
  if (error === 'icfes-cerrado') return 'Los planes ICFES están temporalmente cerrados. No se realizó ningún cobro.';
  if (error === 'capacidad') return 'El plan de feedback personalizado no tiene capacidad disponible. No se realizó ningún cobro; puedes elegir el plan automático.';
  if (error) return 'No pudimos crear la suscripción. No se realizó ningún cobro.';
  return '';
}
