'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { formatCOP } from '@/lib/course-pricing/catalog';
import { XPRESS_OFFERS, type XpressMembershipOfferId, type XpressOfferId } from '@/lib/xpress-commerce/catalog';
import {
  XPRESS_PRIVACY_NOTICE,
  XPRESS_PRIVACY_VERSION,
  XPRESS_RECURRING_CONSENT,
  XPRESS_RECURRING_CONSENT_VERSION,
  XPRESS_TERMS,
  XPRESS_TERMS_VERSION,
} from '@/lib/xpress-commerce/terms';
import type { XpressExamSlug } from '@/lib/student-onboarding/catalog';
import styles from './xpress-membership.module.css';

type ActiveMembership = { offerId: XpressMembershipOfferId; examSlug: string; startsAt: string; endsAt: string };
type Subscription = {
  id: string;
  offerId: XpressMembershipOfferId;
  examSlug: string;
  amountInCents: number;
  status: 'creating_source' | 'pending_initial' | 'scheduled' | 'active' | 'past_due' | 'cancel_at_period_end' | 'canceled';
  initialChargeAt: string;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  nextChargeAt: string | null;
  paymentFailureCount: number;
};
type OrderResult = {
  order?: { id: string; reference: string; offerId: XpressOfferId; examSlug: string; amountInCents: number; expiresAt: string };
  status?: 'created' | 'pending' | 'paid' | 'review' | 'not_completed';
  membership?: { ends_at?: string } | null;
  credit?: { status?: string; consumed_at?: string | null } | null;
};

function dateLabel(value: string) {
  return new Date(value).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Bogota' });
}

export default function XpressMembershipClient({
  examSlug, examLabel, initialOfferId, activeMembership, initialSubscription, classPurchasePath,
  orderId, transactionId, wompiPublicKey, wompiDocuments, subscriptionIdempotencyKey, setupMessage,
}: {
  examSlug: XpressExamSlug;
  examLabel: string;
  initialOfferId: XpressOfferId;
  activeMembership: ActiveMembership | null;
  initialSubscription: Subscription | null;
  classPurchasePath: string;
  orderId: string | null;
  transactionId: string | null;
  wompiPublicKey: string;
  wompiDocuments: { policy: string; personalData: string } | null;
  subscriptionIdempotencyKey: string;
  setupMessage: string;
}) {
  const [offerId, setOfferId] = useState<XpressOfferId>(initialSubscription?.offerId ?? initialOfferId);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedRecurring, setAcceptedRecurring] = useState(false);
  const [acceptedWompi, setAcceptedWompi] = useState(false);
  const [subscription, setSubscription] = useState(initialSubscription);
  const [busy, setBusy] = useState(Boolean(orderId));
  const [message, setMessage] = useState(orderId ? 'Comprobando tu pago…' : setupMessage);
  const [result, setResult] = useState<OrderResult>({});
  const formRef = useRef<HTMLFormElement>(null);
  const verified = useRef(false);

  const selectedOffer = XPRESS_OFFERS.find((offer) => offer.id === offerId)!;
  const recurring = selectedOffer.billing === 'recurring-30-days';
  const completingSource = subscription?.status === 'creating_source';
  const legacyCoverage = Boolean(activeMembership && (!subscription || completingSource) && activeMembership.examSlug === examSlug);
  const recurringReady = recurring && (!subscription || completingSource) && Boolean(wompiDocuments) && acceptedTerms && acceptedPrivacy && acceptedRecurring && acceptedWompi;

  useEffect(() => {
    const form = formRef.current;
    if (!form || !recurringReady) return;
    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.dataset.render = 'button';
    script.dataset.widgetOperation = 'tokenize';
    script.dataset.publicKey = wompiPublicKey;
    script.async = true;
    const observer = new MutationObserver(() => {
      const button = form.querySelector<HTMLButtonElement>('button.waybox-button');
      if (button) {
        button.innerHTML = 'Suscribirme con <strong>Wompi</strong>';
        button.setAttribute('aria-label', `Suscribirme por ${formatCOP(selectedOffer.amountInCents / 100)} COP cada 30 días`);
      }
    });
    observer.observe(form, { childList: true });
    form.appendChild(script);
    return () => {
      observer.disconnect();
      form.querySelectorAll('script[src="https://checkout.wompi.co/widget.js"], button.waybox-button').forEach((node) => node.remove());
    };
  }, [recurringReady, selectedOffer.amountInCents, wompiPublicKey]);

  const loadOrder = useCallback(async () => {
    if (!orderId) return;
    try {
      if (transactionId && !verified.current) {
        const verification = await fetch(`/api/xpress-orders/${encodeURIComponent(orderId)}/verify`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ transactionId }),
        });
        if (verification.ok) verified.current = true;
      }
      const response = await fetch(`/api/xpress-orders/${encodeURIComponent(orderId)}`, { cache: 'no-store' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'No pudimos consultar la compra.');
      setResult(data);
      if (data.status === 'paid' && data.order?.offerId !== 'exam-single') {
        window.location.replace('/suscripcion/examenes?activada=1');
        return;
      }
      setMessage(data.status === 'pending' ? 'Wompi todavía está procesando el pago. No vuelvas a pagar.' : '');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No pudimos consultar el pago. No pagues nuevamente.');
    } finally { setBusy(false); }
  }, [orderId, transactionId]);

  // The effect synchronizes the Wompi redirect with the durable server record.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void loadOrder(); }, [loadOrder]);

  async function openCheckout(id: string) {
    const response = await fetch(`/api/xpress-orders/${encodeURIComponent(id)}/checkout`, { method: 'POST' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'No pudimos abrir Wompi.');
    if (data.checkoutUrl) return window.location.assign(data.checkoutUrl);
    if (data.status === 'paid') throw new Error('Ese pago ya fue confirmado.');
    if (data.status === 'pending' || data.status === 'review') throw new Error('Ese pago ya está en verificación. No vuelvas a pagar.');
    if (data.status === 'expired') throw new Error('La orden venció. Crea una nueva para continuar.');
  }

  async function purchaseSingle() {
    if (busy || recurring || !acceptedTerms || !acceptedPrivacy) return;
    setBusy(true);
    setMessage('Guardando la compra antes de abrir Wompi…');
    try {
      const storageKey = `wl-xpress-order:${examSlug}:${offerId}`;
      let key = '';
      try { key = localStorage.getItem(storageKey) || ''; } catch {}
      if (!key) key = crypto.randomUUID();
      try { localStorage.setItem(storageKey, key); } catch {}
      const response = await fetch('/api/xpress-orders', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idempotencyKey: key, examSlug, offerId, acceptedTerms: XPRESS_TERMS_VERSION, acceptedPrivacy: XPRESS_PRIVACY_VERSION }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.existingOrderId) return window.location.assign(`/suscripcion/examenes?orden=${encodeURIComponent(data.existingOrderId)}`);
        throw new Error(data.message || 'No pudimos guardar la compra.');
      }
      try { localStorage.removeItem(storageKey); } catch {}
      await openCheckout(data.orderId);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se abrió ningún cobro. Inténtalo nuevamente.');
      setBusy(false);
    }
  }

  async function manage(action: 'cancel' | 'reactivate') {
    if (!subscription || busy) return;
    setBusy(true);
    setMessage(action === 'cancel' ? 'Cancelando futuras renovaciones…' : 'Reactivando la renovación…');
    try {
      const response = await fetch(`/api/xpress-subscriptions/${subscription.id}/${action}`, { method: 'POST' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'No pudimos actualizar la suscripción.');
      setSubscription((current) => current ? { ...current, status: data.subscription.status, currentPeriodEnd: data.subscription.currentPeriodEnd } : current);
      setMessage(action === 'cancel' ? 'La renovación quedó cancelada. Tu acceso pagado sigue vigente hasta la fecha indicada.' : 'La renovación automática quedó activa nuevamente.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'No pudimos actualizar la suscripción.'); }
    finally { setBusy(false); }
  }

  const singleIncluded = Boolean(activeMembership && offerId === 'exam-single');
  const paid = result.status === 'paid';
  const firstChargeDate = legacyCoverage ? activeMembership!.endsAt : new Date().toISOString();

  return <main className={styles.page}><div className={styles.shell}>
    <header className={styles.hero}>
      <Link href="/dashboard/student" className={styles.back}>← Volver al panel</Link>
      <p className={styles.eyebrow}>WELEARN · XPRESS</p>
      <h1>Tu preparación para <span>{examLabel}</span></h1>
      <p>Elige un examen individual o una suscripción que se renueva cada 30 días. También puedes añadir clases con docente.</p>
    </header>

    {activeMembership && <section className={styles.active}>
      <div><p className={styles.eyebrow}>ACCESO DISPONIBLE</p><h2>{XPRESS_OFFERS.find((item) => item.id === activeMembership.offerId)?.name}</h2></div>
      <p>Disponible hasta <strong>{dateLabel(activeMembership.endsAt)}</strong>.</p>
    </section>}

    {subscription && <section className={`${styles.subscription} ${subscription.status === 'past_due' ? styles.subscriptionWarning : ''}`}>
      <div>
        <p className={styles.eyebrow}>SUSCRIPCIÓN</p>
        <h2>{subscription.status === 'creating_source' ? 'Completa el medio de pago' : subscription.status === 'scheduled' ? 'Renovación programada' : subscription.status === 'pending_initial' ? 'Primer pago en proceso' : subscription.status === 'cancel_at_period_end' ? 'Renovación cancelada' : subscription.status === 'past_due' ? 'Pago pendiente' : 'Renovación automática activa'}</h2>
        <p>{XPRESS_OFFERS.find((item) => item.id === subscription.offerId)?.name} · <strong>{formatCOP(subscription.amountInCents / 100)} COP</strong> por cada 30 días.</p>
        {subscription.status === 'scheduled' && <p>Primer cobro automático: <strong>{dateLabel(subscription.initialChargeAt)}</strong>.</p>}
        {subscription.currentPeriodEnd && <p>Acceso pagado hasta: <strong>{dateLabel(subscription.currentPeriodEnd)}</strong>.</p>}
        {subscription.status === 'past_due' && <p>El último cobro no fue aprobado. Nunca generamos dos cobros para una misma orden.</p>}
      </div>
      <div className={styles.subscriptionActions}>
        {subscription.status === 'cancel_at_period_end'
          ? <button disabled={busy} onClick={() => void manage('reactivate')}>Reactivar renovación</button>
          : ['scheduled', 'active', 'past_due', 'pending_initial'].includes(subscription.status)
            ? <button disabled={busy} className={styles.cancelButton} onClick={() => void manage('cancel')}>Cancelar renovación</button>
            : null}
      </div>
    </section>}

    {orderId && <section className={styles.status} aria-live="polite">
      <p className={styles.eyebrow}>ESTADO DEL PAGO</p>
      <h2>{paid ? 'Pago confirmado' : result.status === 'pending' ? 'Pago en proceso' : result.status === 'review' ? 'Pago en revisión' : 'Compra guardada'}</h2>
      {result.order && <p>{XPRESS_OFFERS.find((item) => item.id === result.order?.offerId)?.name} · {formatCOP(result.order.amountInCents / 100)} COP<br /><small>Referencia {result.order.reference}</small></p>}
      {paid && <p>Tu acceso ya está activo. Puedes entrar a tus exámenes.</p>}
      {result.status && ['created', 'not_completed'].includes(result.status) && result.order?.offerId === 'exam-single' && <button disabled={busy} onClick={() => void openCheckout(orderId)}>Pagar con Wompi</button>}
      {(result.status === 'pending' || result.status === 'review') && <p>No hagas un segundo pago mientras confirmamos el actual.</p>}
      <button className={styles.textButton} disabled={busy} onClick={() => void loadOrder()}>Actualizar estado</button>
    </section>}

    <section className={styles.plans} aria-labelledby="plans-heading">
      <p className={styles.eyebrow}>1 · ELIGE TU PLAN</p><h2 id="plans-heading">Elige cuánto quieres practicar</h2>
      <div className={styles.planGrid}>{XPRESS_OFFERS.map((offer) => {
        const disabled = Boolean(subscription) || Boolean(activeMembership && offer.id === 'exam-single');
        return <label key={offer.id} className={`${styles.planCard} ${offerId === offer.id ? styles.selected : ''} ${activeMembership?.offerId === offer.id ? styles.current : ''}`}>
          <input type="radio" name="xpress-plan" value={offer.id} checked={offerId === offer.id} disabled={disabled}
            onChange={() => { setOfferId(offer.id); setAcceptedTerms(false); setAcceptedPrivacy(false); setAcceptedRecurring(false); setAcceptedWompi(false); }} />
          <span className={styles.planName}>{offer.name}</span>
          <strong>{activeMembership && offer.id === 'exam-single' ? 'Incluido en tu acceso' : `${formatCOP(offer.amountInCents / 100)} COP`}</strong>
          <span>{offer.id === 'exam-single' ? 'Pago único para realizar un simulacro una vez.' : 'Suscripción por periodos de 30 días, con cancelación desde tu panel.'}</span>
          <span>{offer.id === 'exam-teacher' ? 'Corrección automática y retroalimentación docente en máximo 24 horas.' : 'Corrección automática, reporte y áreas de atención.'}</span>
        </label>;
      })}</div>
    </section>

    <section className={styles.classes}><div>
      <p className={styles.eyebrow}>2 · CLASES OPCIONALES</p><h2>¿Quieres trabajar tus errores con un docente?</h2>
      <p>Las clases se compran por separado y muestran su propio reglamento antes del pago. Las condiciones de abajo pertenecen solo a Xpress.</p>
    </div><Link href={classPurchasePath}>Ver clases desde $320.000 →</Link></section>

    {(!subscription || completingSource) && !singleIncluded && <section className={styles.terms}>
      <p className={styles.eyebrow}>3 · ANTES DEL PAGO</p><h2>Condiciones claras</h2>
      <div className={styles.termGrid}>{XPRESS_TERMS.map((term) => <article key={term.title}><h3>{term.title}</h3><p>{term.text}</p></article>)}</div>
      <label className={styles.check}><input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} /><span><strong>Leí y acepto las condiciones de Xpress.</strong></span></label>
      <label className={styles.check}><input type="checkbox" checked={acceptedPrivacy} onChange={(event) => setAcceptedPrivacy(event.target.checked)} /><span>{XPRESS_PRIVACY_NOTICE}</span></label>

      {recurring && <>
        <label className={styles.check}><input type="checkbox" checked={acceptedRecurring} onChange={(event) => setAcceptedRecurring(event.target.checked)} /><span><strong>{XPRESS_RECURRING_CONSENT}</strong></span></label>
        {wompiDocuments ? <label className={styles.check}><input type="checkbox" checked={acceptedWompi} onChange={(event) => setAcceptedWompi(event.target.checked)} /><span>Leí y acepto la <a href={wompiDocuments.policy} target="_blank" rel="noreferrer">política para usuarios de Wompi</a> y su <a href={wompiDocuments.personalData} target="_blank" rel="noreferrer">autorización de datos personales</a>.</span></label>
          : <p className={styles.providerUnavailable}>Wompi no está disponible en este momento. No se abrirá ningún cobro hasta recuperar sus documentos vigentes.</p>}
      </>}

      <div className={styles.checkout}><div>
        <span>{recurring ? legacyCoverage ? 'Hoy' : 'Primer cobro' : 'Total por un examen'}</span>
        <strong>{recurring && legacyCoverage ? '$0 COP' : `${formatCOP(selectedOffer.amountInCents / 100)} COP`}</strong>
        {recurring && <small>{legacyCoverage ? `Primer cobro de ${formatCOP(selectedOffer.amountInCents / 100)} COP el ${dateLabel(firstChargeDate)}.` : `Luego, ${formatCOP(selectedOffer.amountInCents / 100)} COP por cada periodo de 30 días hasta cancelar.`}</small>}
      </div>
        {!recurring && <button disabled={busy || !acceptedTerms || !acceptedPrivacy} onClick={() => void purchaseSingle()}>{busy ? 'Preparando…' : 'Pagar una vez con Wompi'}</button>}
        {recurring && <form ref={formRef} method="POST" action="/api/xpress-subscriptions" className={styles.wompiForm}>
          <input type="hidden" name="idempotency_key" value={subscriptionIdempotencyKey} />
          <input type="hidden" name="exam_slug" value={examSlug} />
          <input type="hidden" name="offer_id" value={offerId} />
          <input type="hidden" name="accepted_terms" value={acceptedTerms ? XPRESS_TERMS_VERSION : ''} />
          <input type="hidden" name="accepted_privacy" value={acceptedPrivacy ? XPRESS_PRIVACY_VERSION : ''} />
          <input type="hidden" name="accepted_recurring" value={acceptedRecurring ? XPRESS_RECURRING_CONSENT_VERSION : ''} />
          <input type="hidden" name="accepted_wompi" value={acceptedWompi ? 'yes' : ''} />
          {!recurringReady && <button type="button" disabled>Completa las aceptaciones para suscribirte</button>}
        </form>}
      </div>
      <p className={styles.note}>La tarjeta se captura y almacena en Wompi. WeLearn solo guarda el identificador técnico necesario para las renovaciones.</p>
    </section>}

    {singleIncluded && <p className={styles.message} role="status">Tu acceso ya incluye todos los simulacros de este examen.</p>}
    <p className={styles.message} role="status">{message}</p>
  </div></main>;
}
