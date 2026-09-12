'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { formatCOP } from '@/lib/course-pricing/catalog';
import { XPRESS_OFFERS, type XpressMembershipOfferId, type XpressOfferId } from '@/lib/xpress-commerce/catalog';
import { XPRESS_PRIVACY_NOTICE, XPRESS_PRIVACY_VERSION, XPRESS_TERMS, XPRESS_TERMS_VERSION } from '@/lib/xpress-commerce/terms';
import type { XpressExamSlug } from '@/lib/student-onboarding/catalog';
import guardStyles from './xpress-offer-guard.module.css';
import styles from './xpress-membership.module.css';

type ActiveMembership = {
  offerId: XpressMembershipOfferId;
  examSlug: string;
  startsAt: string;
  endsAt: string;
};
type OrderResult = {
  order?: { id: string; reference: string; offerId: XpressOfferId; examSlug: string; amountInCents: number; expiresAt: string; resultUrl?: string | null };
  status?: 'created' | 'pending' | 'paid' | 'review' | 'not_completed';
  membership?: { ends_at?: string } | null;
  credit?: { status?: string; consumed_at?: string | null } | null;
};
type IcfesTeacherReadiness = {
  purchasable: boolean;
  message: string | null;
};
type IcfesTeacherAddendum = {
  version: string;
  supersedesSection: string;
};

export default function XpressMembershipClient({
  examSlug, examLabel, initialOfferId, activeMembership, classPurchasePath, orderId, transactionId,
  icfesMembershipReadiness, icfesTeacherReadiness, icfesTeacherAddendum, icfesAttemptId,
}: {
  examSlug: XpressExamSlug;
  examLabel: string;
  initialOfferId: XpressOfferId;
  activeMembership: ActiveMembership | null;
  classPurchasePath: string;
  orderId: string | null;
  transactionId: string | null;
  icfesAttemptId: string | null;
  icfesMembershipReadiness: IcfesTeacherReadiness | null;
  icfesTeacherReadiness: IcfesTeacherReadiness | null;
  icfesTeacherAddendum: IcfesTeacherAddendum | null;
}) {
  const [offerId, setOfferId] = useState<XpressOfferId>(initialOfferId);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedIcfesTeacherAddendum, setAcceptedIcfesTeacherAddendum] = useState(false);
  const [busy, setBusy] = useState(Boolean(orderId));
  const [message, setMessage] = useState(orderId ? 'Comprobando tu pago…' : '');
  const [result, setResult] = useState<OrderResult>({});
  const [attemptClaim, setAttemptClaim] = useState<'idle' | 'claiming' | 'claimed' | 'error'>(icfesAttemptId ? 'claiming' : 'idle');
  const verified = useRef(false);
  const isIcfesTeacherSelected = examSlug === 'icfes' && offerId === 'exam-teacher';
  const isIcfesMembershipUnavailable = examSlug === 'icfes' && !icfesMembershipReadiness?.purchasable;
  const isIcfesTeacherUnavailable = isIcfesTeacherSelected && !icfesTeacherReadiness?.purchasable;
  const hasRequiredAcceptances = acceptedTerms
    && acceptedPrivacy
    && (!isIcfesTeacherSelected || (acceptedIcfesTeacherAddendum && Boolean(icfesTeacherAddendum)));
  const visibleOffers = examSlug === 'icfes'
    ? XPRESS_OFFERS.filter((offer) => offer.id !== 'exam-single')
    : XPRESS_OFFERS;

  const loadOrder = useCallback(async () => {
    if (!orderId) return;
    try {
      if (transactionId && !verified.current) {
        const verification = await fetch(`/api/xpress-orders/${encodeURIComponent(orderId)}/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transactionId }),
        });
        if (verification.ok) verified.current = true;
      }
      const response = await fetch(`/api/xpress-orders/${encodeURIComponent(orderId)}`, { cache: 'no-store' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'No pudimos consultar la compra.');
      setResult(data);
      setMessage(data.status === 'pending' ? 'Wompi todavía está procesando el pago. No vuelvas a pagar.' : '');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No pudimos consultar el pago. No pagues nuevamente.');
    } finally {
      setBusy(false);
    }
  }, [orderId, transactionId]);

  // The effect synchronizes the Wompi redirect with the durable server record.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void loadOrder(); }, [loadOrder]);

  useEffect(() => {
    if (!icfesAttemptId) return;
    let active = true;
    fetch('/api/icfes/attempts/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attemptId: icfesAttemptId }),
    }).then((response) => {
      if (!active) return;
      setAttemptClaim(response.ok ? 'claimed' : 'error');
    }).catch(() => active && setAttemptClaim('error'));
    return () => { active = false; };
  }, [icfesAttemptId]);

  async function openCheckout(id: string) {
    const response = await fetch(`/api/xpress-orders/${encodeURIComponent(id)}/checkout`, { method: 'POST' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'No pudimos abrir Wompi.');
    if (data.checkoutUrl) {
      window.location.assign(data.checkoutUrl);
      return;
    }
    if (data.status === 'paid') throw new Error('Ese pago ya fue confirmado.');
    if (data.status === 'pending' || data.status === 'review') throw new Error('Ese pago ya está en verificación. No vuelvas a pagar.');
    if (data.status === 'expired') throw new Error('La orden venció. Crea una nueva para continuar.');
  }

  async function purchase() {
    if (busy || !hasRequiredAcceptances || isIcfesMembershipUnavailable || isIcfesTeacherUnavailable || attemptClaim === 'claiming' || attemptClaim === 'error') return;
    setBusy(true);
    setMessage('Guardando la compra antes de abrir Wompi…');
    try {
      const storageKey = `wl-xpress-order:${examSlug}:${offerId}`;
      let idempotencyKey: string | null = null;
      try { idempotencyKey = localStorage.getItem(storageKey); } catch {}
      idempotencyKey ??= crypto.randomUUID();
      try { localStorage.setItem(storageKey, idempotencyKey); } catch {}
      const response = await fetch('/api/xpress-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idempotencyKey,
          examSlug,
          offerId,
          acceptedTerms: XPRESS_TERMS_VERSION,
          acceptedPrivacy: XPRESS_PRIVACY_VERSION,
          ...(isIcfesTeacherSelected && icfesTeacherAddendum
            ? { acceptedIcfesTeacherAddendum: icfesTeacherAddendum.version }
            : {}),
          ...(icfesAttemptId ? { icfesAttemptId } : {}),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.existingOrderId) {
          window.location.assign(`/suscripcion/examenes?orden=${encodeURIComponent(data.existingOrderId)}`);
          return;
        }
        throw new Error(data.message || 'No pudimos guardar la compra.');
      }
      try { localStorage.removeItem(storageKey); } catch {}
      await openCheckout(data.orderId);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se abrió ningún cobro. Inténtalo nuevamente.');
      setBusy(false);
    }
  }

  const selectedOffer = visibleOffers.find((offer) => offer.id === offerId)!;
  const isUpgrade = activeMembership?.offerId === 'exam-auto' && offerId === 'exam-teacher';
  const singleIncluded = Boolean(activeMembership && offerId === 'exam-single');
  const displayedAmount = isUpgrade ? 50_000 : selectedOffer.amountInCents / 100;
  const paid = result.status === 'paid';
  const displayedTerms = examSlug === 'icfes'
    ? XPRESS_TERMS.filter((term) => term.title !== (icfesTeacherAddendum?.supersedesSection ?? 'Correcciones'))
    : XPRESS_TERMS;

  return <main className={styles.page}>
    <div className={styles.shell}>
      <header className={styles.hero}>
        <Link href="/dashboard/student" className={styles.back}>← Volver al panel</Link>
        <p className={styles.eyebrow}>WELEARN · XPRESS</p>
        <h1>Tu preparación para <span>{examLabel}</span></h1>
        <p>{examSlug === 'icfes'
          ? 'El detalle de un solo intento se compra desde su resultado. Aquí puedes elegir acceso a todos los simulacros por 30 días.'
          : 'Elige un examen individual o un acceso de 30 días. También puedes añadir clases con docente.'}</p>
      </header>

      {activeMembership && <section className={styles.active}>
        <div><p className={styles.eyebrow}>MEMBRESÍA ACTIVA</p><h2>{XPRESS_OFFERS.find((item) => item.id === activeMembership.offerId)?.name}</h2></div>
        <p>Disponible hasta <strong>{new Date(activeMembership.endsAt).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>.</p>
      </section>}

      {orderId && <section className={styles.status} aria-live="polite">
        <p className={styles.eyebrow}>ESTADO DEL PAGO</p>
        <h2>{paid ? 'Pago confirmado' : result.status === 'pending' ? 'Pago en proceso' : result.status === 'review' ? 'Pago en revisión' : 'Compra guardada'}</h2>
        {result.order && <p>{XPRESS_OFFERS.find((item) => item.id === result.order?.offerId)?.name} · {formatCOP(result.order.amountInCents / 100)} COP<br /><small>Referencia {result.order.reference}</small></p>}
        {paid && <p>Tu acceso ya está activo. Puedes entrar a tus exámenes.</p>}
        {paid && result.order?.resultUrl && <Link href={result.order.resultUrl}>Ver el detalle de este resultado →</Link>}
        {result.status && ['created', 'not_completed'].includes(result.status) && <button disabled={busy} onClick={() => void openCheckout(orderId)}>Pagar con Wompi</button>}
        {(result.status === 'pending' || result.status === 'review') && <p>No hagas un segundo pago mientras confirmamos el actual.</p>}
        <button className={styles.textButton} disabled={busy} onClick={() => void loadOrder()}>Actualizar estado</button>
      </section>}

      <section className={styles.plans} aria-labelledby="plans-heading">
        <p className={styles.eyebrow}>1 · ELIGE TU PLAN</p>
        <h2 id="plans-heading">Elige cuánto quieres practicar</h2>
        <div className={styles.planGrid}>
          {visibleOffers.map((offer) => {
            const active = activeMembership?.offerId === offer.id;
            const blockedDowngrade = activeMembership?.offerId === 'exam-teacher' && offer.id === 'exam-auto';
            const includedByMembership = Boolean(activeMembership && offer.id === 'exam-single');
            const isIcfesTeacherOffer = examSlug === 'icfes' && offer.id === 'exam-teacher';
            const membershipUnavailable = examSlug === 'icfes' && !icfesMembershipReadiness?.purchasable;
            const teacherUnavailable = isIcfesTeacherOffer && !icfesTeacherReadiness?.purchasable;
            const descriptionId = isIcfesTeacherOffer ? 'icfes-teacher-offer-description' : undefined;
            return <label
              key={offer.id}
              className={`${styles.planCard} ${offerId === offer.id ? styles.selected : ''} ${active ? styles.current : ''} ${teacherUnavailable ? guardStyles.unavailable : ''}`}
              aria-disabled={membershipUnavailable || teacherUnavailable || undefined}
            >
              <input
                type="radio"
                name="xpress-plan"
                value={offer.id}
                checked={offerId === offer.id}
                disabled={active || blockedDowngrade || includedByMembership || membershipUnavailable || teacherUnavailable}
                aria-describedby={teacherUnavailable
                  ? `${descriptionId} icfes-teacher-availability`
                  : descriptionId}
                onChange={() => setOfferId(offer.id)}
              />
              <span className={styles.planName}>{offer.name}</span>
              <strong>{active ? 'Plan actual' : includedByMembership ? 'Incluido en tu membresía' : isUpgrade && offer.id === 'exam-teacher' ? '$50.000 para subir' : `${formatCOP(offer.amountInCents / 100)} COP`}</strong>
              <span>{offer.id === 'exam-single' ? 'Un simulacro para realizar una vez.' : 'Simulacros disponibles sin límite durante 30 días.'}</span>
              <span id={descriptionId}>{offer.id === 'exam-teacher'
                ? isIcfesTeacherOffer
                  ? 'Incluye un solo crédito de revisión humana durante los 30 días. Objetivo de entrega en 12 horas, sujeto a capacidad disponible.'
                  : 'Corrección automática y feedback docente según las condiciones del examen.'
                : 'Corrección automática, reporte y áreas de atención.'}</span>
              {teacherUnavailable && <span className={guardStyles.unavailableMessage} role="status">
                No disponible para compra. El plan automático sigue disponible.
              </span>}
            </label>;
          })}
        </div>
        {examSlug === 'icfes' && !icfesMembershipReadiness?.purchasable && <p className={guardStyles.availabilityNotice} role="status">
          {icfesMembershipReadiness?.message ?? 'Los planes ICFES no están disponibles para compra en este momento.'}
        </p>}
        {examSlug === 'icfes' && !icfesTeacherReadiness?.purchasable && <p
          className={guardStyles.availabilityNotice}
          id="icfes-teacher-availability"
          role="status"
        >
          {icfesTeacherReadiness?.message ?? 'El plan docente ICFES no está disponible para compra en este momento.'}
        </p>}
      </section>

      {attemptClaim === 'claiming' && <p className={styles.message} role="status">Asociando este resultado con tu cuenta…</p>}
      {attemptClaim === 'error' && <p className={styles.message} role="alert">No pudimos asociar el resultado con tu cuenta. Vuelve al resultado original antes de pagar.</p>}

      <section className={styles.classes}>
        <div>
          <p className={styles.eyebrow}>2 · CLASES OPCIONALES</p>
          <h2>¿Quieres trabajar tus errores con un docente?</h2>
          <p>Compra un ciclo de clases desde aquí. El selector ya abrirá el idioma y el objetivo de {examLabel}. Las clases tienen pago y reglamento separados.</p>
        </div>
        <Link href={classPurchasePath}>Ver clases desde $320.000 →</Link>
      </section>

      {!activeMembership || isUpgrade ? <section className={styles.terms}>
        <p className={styles.eyebrow}>3 · ANTES DEL PAGO</p>
        <h2>Condiciones claras</h2>
        <div className={styles.termGrid}>
          {displayedTerms.map((term) => <article key={term.title}><h3>{term.title}</h3><p>{term.text}</p></article>)}
          {examSlug === 'icfes' && !isIcfesTeacherSelected && <article>
            <h3>Correcciones</h3>
            <p>El plan automático incluye reporte y áreas de atención generadas por el sistema. No incluye revisión docente.</p>
          </article>}
          {isIcfesTeacherSelected && <article>
            <h3>Condición específica del plan docente ICFES</h3>
            <p>Un solo crédito de revisión humana durante los 30 días. La entrega en 12 horas es un objetivo operativo sujeto a capacidad disponible, no una garantía.</p>
          </article>}
        </div>
        <label className={styles.check}><input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} /><span><strong>Leí y acepto las condiciones de esta compra.</strong></span></label>
        <label className={styles.check}><input type="checkbox" checked={acceptedPrivacy} onChange={(event) => setAcceptedPrivacy(event.target.checked)} /><span>{XPRESS_PRIVACY_NOTICE}</span></label>
        {isIcfesTeacherSelected && <label className={styles.check}>
          <input
            type="checkbox"
            checked={acceptedIcfesTeacherAddendum}
            disabled={isIcfesTeacherUnavailable}
            aria-describedby="icfes-teacher-addendum-copy"
            onChange={(event) => setAcceptedIcfesTeacherAddendum(event.target.checked)}
          />
          <span id="icfes-teacher-addendum-copy">
            <strong>Acepto la condición específica ICFES:</strong> un crédito de revisión humana durante 30 días y objetivo de entrega en 12 horas sujeto a capacidad disponible.
          </span>
        </label>}
        <div className={styles.checkout}>
          <div><span>{isUpgrade ? 'Valor del cambio' : selectedOffer.billing === 'single-exam' ? 'Total por un examen' : 'Total por 30 días'}</span><strong>{formatCOP(displayedAmount)} COP</strong></div>
          <button
            disabled={busy || !hasRequiredAcceptances || isIcfesMembershipUnavailable || isIcfesTeacherUnavailable || attemptClaim === 'claiming' || attemptClaim === 'error'}
            onClick={() => void purchase()}
          >
            {isIcfesTeacherUnavailable ? 'Plan docente no disponible' : busy ? 'Preparando…' : 'Pagar con Wompi'}
          </button>
        </div>
        <p className={styles.note}>No almacenamos datos de tarjeta. El acceso se activa únicamente cuando Wompi confirma el pago.</p>
      </section> : null}

      {singleIncluded && <p className={styles.message} role="status">Tu membresía ya incluye todos los simulacros de este examen.</p>}
      {!singleIncluded && <p className={styles.message} role="status">{message}</p>}
    </div>
  </main>;
}
