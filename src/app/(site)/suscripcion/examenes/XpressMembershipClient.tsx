'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { formatCOP } from '@/lib/course-pricing/catalog';
import { XPRESS_OFFERS, type XpressOfferId } from '@/lib/xpress-commerce/catalog';
import { XPRESS_PRIVACY_NOTICE, XPRESS_PRIVACY_VERSION, XPRESS_TERMS, XPRESS_TERMS_VERSION } from '@/lib/xpress-commerce/terms';
import type { XpressExamSlug } from '@/lib/student-onboarding/catalog';
import styles from './xpress-membership.module.css';

type ActiveMembership = {
  offerId: XpressOfferId;
  examSlug: string;
  startsAt: string;
  endsAt: string;
};
type OrderResult = {
  order?: { id: string; reference: string; offerId: XpressOfferId; examSlug: string; amountInCents: number; expiresAt: string };
  status?: 'created' | 'pending' | 'paid' | 'review' | 'not_completed';
  membership?: { ends_at?: string } | null;
};

export default function XpressMembershipClient({
  examSlug, examLabel, initialOfferId, activeMembership, classPurchasePath, orderId, transactionId,
}: {
  examSlug: XpressExamSlug;
  examLabel: string;
  initialOfferId: XpressOfferId;
  activeMembership: ActiveMembership | null;
  classPurchasePath: string;
  orderId: string | null;
  transactionId: string | null;
}) {
  const [offerId, setOfferId] = useState<XpressOfferId>(initialOfferId);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [busy, setBusy] = useState(Boolean(orderId));
  const [message, setMessage] = useState(orderId ? 'Comprobando tu pago…' : '');
  const [result, setResult] = useState<OrderResult>({});
  const verified = useRef(false);

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
    if (busy || !acceptedTerms || !acceptedPrivacy) return;
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

  const selectedOffer = XPRESS_OFFERS.find((offer) => offer.id === offerId)!;
  const isUpgrade = activeMembership?.offerId === 'exam-auto' && offerId === 'exam-teacher';
  const displayedAmount = isUpgrade ? 50_000 : selectedOffer.amountInCents / 100;
  const paid = result.status === 'paid';

  return <main className={styles.page}>
    <div className={styles.shell}>
      <header className={styles.hero}>
        <Link href="/dashboard/student" className={styles.back}>← Volver al panel</Link>
        <p className={styles.eyebrow}>WELEARN · XPRESS</p>
        <h1>Tu preparación para <span>{examLabel}</span></h1>
        <p>Elige el tipo de corrección. Si necesitas acompañamiento en vivo, puedes añadir clases sin cambiar tu membresía.</p>
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
        {result.status && ['created', 'not_completed'].includes(result.status) && <button disabled={busy} onClick={() => void openCheckout(orderId)}>Pagar con Wompi</button>}
        {(result.status === 'pending' || result.status === 'review') && <p>No hagas un segundo pago mientras confirmamos el actual.</p>}
        <button className={styles.textButton} disabled={busy} onClick={() => void loadOrder()}>Actualizar estado</button>
      </section>}

      <section className={styles.plans} aria-labelledby="plans-heading">
        <p className={styles.eyebrow}>1 · ELIGE TU PLAN</p>
        <h2 id="plans-heading">30 días para practicar a tu ritmo</h2>
        <div className={styles.planGrid}>
          {XPRESS_OFFERS.map((offer) => {
            const active = activeMembership?.offerId === offer.id;
            const blockedDowngrade = activeMembership?.offerId === 'exam-teacher' && offer.id === 'exam-auto';
            return <label key={offer.id} className={`${styles.planCard} ${offerId === offer.id ? styles.selected : ''} ${active ? styles.current : ''}`}>
              <input type="radio" name="xpress-plan" value={offer.id} checked={offerId === offer.id} disabled={active || blockedDowngrade} onChange={() => setOfferId(offer.id)} />
              <span className={styles.planName}>{offer.name}</span>
              <strong>{active ? 'Plan actual' : isUpgrade && offer.id === 'exam-teacher' ? '$50.000 para subir' : `${formatCOP(offer.amountInCents / 100)} COP`}</strong>
              <span>Simulacros disponibles sin límite durante el periodo.</span>
              <span>{offer.id === 'exam-teacher' ? 'Corrección automática y feedback docente en máximo 24 horas.' : 'Corrección automática, reporte y áreas de atención.'}</span>
            </label>;
          })}
        </div>
      </section>

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
        <div className={styles.termGrid}>{XPRESS_TERMS.map((term) => <article key={term.title}><h3>{term.title}</h3><p>{term.text}</p></article>)}</div>
        <label className={styles.check}><input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} /><span><strong>Leí y acepto las condiciones de la membresía.</strong></span></label>
        <label className={styles.check}><input type="checkbox" checked={acceptedPrivacy} onChange={(event) => setAcceptedPrivacy(event.target.checked)} /><span>{XPRESS_PRIVACY_NOTICE}</span></label>
        <div className={styles.checkout}>
          <div><span>{isUpgrade ? 'Valor del cambio' : 'Total por 30 días'}</span><strong>{formatCOP(displayedAmount)} COP</strong></div>
          <button disabled={busy || !acceptedTerms || !acceptedPrivacy} onClick={() => void purchase()}>{busy ? 'Preparando…' : 'Pagar con Wompi'}</button>
        </div>
        <p className={styles.note}>No almacenamos datos de tarjeta. El acceso se activa únicamente cuando Wompi confirma el pago.</p>
      </section> : null}

      <p className={styles.message} role="status">{message}</p>
    </div>
  </main>;
}
