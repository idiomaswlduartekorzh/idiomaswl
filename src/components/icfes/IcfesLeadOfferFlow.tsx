'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type {
  IcfesFreeSummaryDto,
  IcfesGradeReceiptDto,
  IcfesLeadAcceptedDto,
  IcfesOfferCatalogDto,
  IcfesOfferProductDto,
} from '@/lib/icfes/attempt-contract';
import { trackIcfesEvent } from '@/lib/analytics/icfes';
import { isPlausibleEmail, isPlausibleWhatsapp } from '@/lib/leads/contact';
import {
  ICFES_LEAD_CONSENT_VERSION,
  ICFES_PRIVACY_NOTICE,
  ICFES_PRIVACY_VERSION,
  ICFES_PURCHASE_CONSENT,
  ICFES_PURCHASE_CONSENT_VERSION,
  ICFES_TERMS,
  ICFES_TERMS_VERSION,
} from '@/lib/icfes/terms';
import styles from './IcfesLeadOfferFlow.module.css';

function formatCop(amountInCents: number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
    .format(amountInCents / 100).replace('$', 'COP ');
}

export default function IcfesLeadOfferFlow({
  receipt,
  onRetry,
}: {
  receipt: IcfesGradeReceiptDto;
  onRetry: () => void;
}) {
  const [step, setStep] = useState<'lead' | 'offer' | 'free'>('lead');
  const [catalog, setCatalog] = useState<IcfesOfferCatalogDto | null>(null);
  const [freeResult, setFreeResult] = useState<IcfesFreeSummaryDto | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [leadConsent, setLeadConsent] = useState(false);
  const [legalConsent, setLegalConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (step === 'offer') trackIcfesEvent('icfes_offer_view', { mock_id: receipt.examId, offer_variant: catalog?.version });
  }, [catalog?.version, receipt.examId, step]);

  async function submitLead(event: React.FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2 || !isPlausibleEmail(email) || !isPlausibleWhatsapp(whatsapp) || !leadConsent) {
      setMessage('Completa nombre, correo y WhatsApp, y acepta el consentimiento para continuar.');
      return;
    }
    setBusy(true); setMessage('');
    try {
      const response = await fetch(`/api/icfes/attempts/${receipt.attemptId}/lead`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(), email: email.trim(), whatsapp: whatsapp.trim(),
          consentVersion: ICFES_LEAD_CONSENT_VERSION,
        }),
      });
      const data = await response.json() as IcfesLeadAcceptedDto | { error?: string };
      if (!response.ok || !('ok' in data) || !data.ok) throw new Error('error' in data ? data.error : 'No pudimos guardar tus datos.');
      setCatalog(data.offer);
      setStep('offer');
      trackIcfesEvent('icfes_lead_submit', { mock_id: receipt.examId, lead_context: 'post_exam_gate' });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No pudimos guardar tus datos.');
    } finally { setBusy(false); }
  }

  async function continueFree() {
    setBusy(true); setMessage('');
    trackIcfesEvent('icfes_free_continue', { mock_id: receipt.examId, offer_variant: catalog?.version });
    try {
      const response = await fetch(`/api/icfes/attempts/${receipt.attemptId}/free-summary`, { cache: 'no-store' });
      const data = await response.json() as { ok?: boolean; result?: IcfesFreeSummaryDto; error?: string };
      if (!response.ok || !data.ok || !data.result) throw new Error(data.error ?? 'No pudimos abrir el resumen gratuito.');
      setFreeResult(data.result);
      setStep('free');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No pudimos abrir el resumen gratuito.');
    } finally { setBusy(false); }
  }

  async function selectOffer(offer: IcfesOfferProductDto) {
    const eventName = offer.code === 'icfes-single-report-v1'
      ? 'icfes_single_report_select'
      : offer.code === 'icfes-membership-v1' ? 'icfes_pass_select' : 'icfes_intensive_select';
    trackIcfesEvent(eventName, { mock_id: receipt.examId, product_code: offer.code, amount_cop: offer.amountInCents / 100 });
    if (!offer.checkoutEnabled) {
      setMessage('El pago ICFES está cerrado por configuración. No se creó ninguna orden ni se realizó ningún cobro.');
      return;
    }
    if (offer.offerId !== 'exam-single') {
      try { window.sessionStorage.setItem('wl_icfes_pending_attempt', receipt.attemptId); } catch { /* URL carries the same non-secret attempt id. */ }
      const completion = new URLSearchParams({
        path: 'exam', language: 'ingles', exam: 'icfes', plan: offer.offerId,
        return: `/suscripcion/examenes?icfes_intento=${encodeURIComponent(receipt.attemptId)}`,
      });
      window.location.assign(`/registro/completar?${completion.toString()}`);
      return;
    }
    if (!legalConsent) {
      setMessage('Acepta las condiciones, la privacidad y la confirmación de compra antes de abrir Wompi.');
      return;
    }
    setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/icfes/pass/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          attemptId: receipt.attemptId,
          acceptedTerms: ICFES_TERMS_VERSION,
          acceptedPrivacy: ICFES_PRIVACY_VERSION,
          acceptedConsent: ICFES_PURCHASE_CONSENT_VERSION,
        }),
      });
      const data = await response.json() as { ok?: boolean; checkoutUrl?: string | null; resultUrl?: string; amountInCents?: number; error?: string };
      if (!response.ok || !data.ok || !data.resultUrl) throw new Error(data.error ?? 'No pudimos abrir Wompi.');
      trackIcfesEvent('icfes_checkout_start', {
        mock_id: receipt.examId, product_code: offer.code, amount_cop: (data.amountInCents ?? offer.amountInCents) / 100,
      });
      window.location.assign(data.checkoutUrl ?? data.resultUrl);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No pudimos abrir Wompi.');
      setBusy(false);
    }
  }

  if (step === 'lead') return <main className={styles.shell} data-testid="icfes-lead-gate" data-active-practice="true">
    <section className={styles.card}>
      <p className={styles.eyebrow}>Examen completado · Resultado protegido</p>
      <h1 className={styles.title}>Tu examen ya fue calificado</h1>
      <p className={styles.lede}>Guarda tus datos para ver las opciones de análisis. El puntaje permanece oculto hasta que el registro termine correctamente.</p>
      <form className={styles.form} onSubmit={submitLead} noValidate>
        <label htmlFor="icfes-lead-name">Nombre completo</label>
        <input id="icfes-lead-name" type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} disabled={busy} />
        <label htmlFor="icfes-lead-email">Correo electrónico</label>
        <input id="icfes-lead-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} disabled={busy} />
        <label htmlFor="icfes-lead-whatsapp">WhatsApp</label>
        <input id="icfes-lead-whatsapp" type="tel" inputMode="tel" autoComplete="tel" value={whatsapp} onChange={(event) => setWhatsapp(event.target.value)} disabled={busy} />
        <label className={styles.check} htmlFor="icfes-lead-consent"><input id="icfes-lead-consent" type="checkbox" checked={leadConsent} onChange={(event) => setLeadConsent(event.target.checked)} /><span>{ICFES_PRIVACY_NOTICE}</span></label>
        {message && <p className={styles.error} role="alert">{message}</p>}
        <button className={styles.button} disabled={busy}>{busy ? 'Guardando…' : 'Guardar y ver opciones'}</button>
      </form>
    </section>
  </main>;

  if (step === 'free' && freeResult) return <main className={styles.shell} data-testid="icfes-free-result" data-active-practice="true">
    <section className={`${styles.card} ${styles.summary}`}>
      <p className={styles.eyebrow}>Resumen gratuito · Resultado no oficial</p>
      <h1 className={styles.title}>Tu resultado general</h1>
      <div className={styles.score}>{freeResult.correct}<span>/{freeResult.total}</span></div>
      <p>{freeResult.percentage}% de aciertos. {freeResult.disclaimer}</p>
      <button className={styles.button} onClick={() => setStep('offer')}>Ver opciones de análisis</button>
      <div className={styles.free}><button className={`${styles.button} ${styles.secondary}`} onClick={onRetry}>Intentar de nuevo</button> <Link href="/examenes/icfes">Volver a ICFES</Link></div>
    </section>
  </main>;

  return <main className={styles.shell} data-testid="icfes-offer-screen" data-active-practice="true">
    <section className={`${styles.card} ${styles.wide}`}>
      <p className={styles.eyebrow}>Registro guardado · Elige cómo continuar</p>
      <h1 className={styles.title}>Tres alcances claros</h1>
      <p className={styles.lede}>El informe individual es un pago único. Las dos membresías se renuevan cada 30 días y se pueden cancelar desde el panel.</p>
      <div className={styles.grid}>{catalog?.offers.map((offer) => <article className={styles.offer} key={offer.code}>
        <h2>{offer.title}</h2><p className={styles.price}>{formatCop(offer.amountInCents)}</p><span className={styles.billing}>{offer.billingLabel}</span>
        <ul>{offer.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
        <button className={styles.button} disabled={busy} onClick={() => void selectOffer(offer)}>Elegir {offer.title}</button>
      </article>)}</div>
      <div className={styles.locked}>
        {ICFES_TERMS.map((term) => <p key={term.title}><strong>{term.title}:</strong> {term.text}</p>)}
        <label className={styles.check}><input type="checkbox" checked={legalConsent} onChange={(event) => setLegalConsent(event.target.checked)} /><span>{ICFES_PRIVACY_NOTICE} {ICFES_PURCHASE_CONSENT}</span></label>
      </div>
      {message && <p className={message.includes('cerrado') ? styles.notice : styles.error} role="status">{message}</p>}
      <div className={styles.free}><button className={`${styles.button} ${styles.secondary}`} disabled={busy} onClick={() => void continueFree()}>Continuar con resumen gratuito</button><p>Solo puntaje bruto y porcentaje, sin diagnóstico ni respuestas.</p></div>
    </section>
  </main>;
}
