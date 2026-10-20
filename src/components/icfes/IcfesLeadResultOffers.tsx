'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { saveLead } from '@/lib/actions/saveLead';
import { trackIcfesEvent } from '@/lib/analytics/icfes';
import type { IcfesTotalResultDto } from '@/lib/icfes/attempt-contract';
import { isPlausibleEmail, isPlausibleWhatsapp } from '@/lib/leads/contact';
import { getXpressOffer, XPRESS_OFFERS, type XpressMembershipOfferId } from '@/lib/xpress-commerce/catalog';
import { redeemExamAccessCodeFromBrowser } from '@/lib/exam-access-codes/client';
import styles from './IcfesLeadResultOffers.module.css';

type OfferCopy = Readonly<{
  eyebrow: string;
  title: string;
  billing: string;
  benefits: readonly string[];
  action: string;
  featured?: boolean;
}>;

const OFFER_COPY: Record<XpressMembershipOfferId, OfferCopy> = {
  'exam-basic': {
    eyebrow: 'ESENCIAL · 30 DÍAS',
    title: 'Autodidacta Esencial',
    billing: 'renovación cada 30 días',
    benefits: [
      'Todo el ecosistema ICFES',
      'Revisión pregunta por pregunta',
      'Descargas y retroalimentación automática',
    ],
    action: 'Elegir Esencial',
  },
  'exam-auto': {
    eyebrow: 'XPRESS · 30 DÍAS',
    title: 'Autodidacta',
    billing: 'renovación cada 30 días',
    benefits: [
      'Todo lo incluido en Esencial',
      '5 revisiones humanas por periodo',
      'Writing o Speaking',
    ],
    action: 'Elegir Autodidacta',
    featured: true,
  },
  'exam-teacher': {
    eyebrow: 'XPRESS + TUTOR · 30 DÍAS',
    title: 'Autodidacta Pro',
    billing: 'renovación cada 30 días',
    benefits: [
      'Revisiones humanas',
      'Retroalimentación integral',
      'Plan de mejora personalizado',
    ],
    action: 'Elegir Pro',
  },
};

function formatCop(amountInCents: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amountInCents / 100);
}

function registrationHref(offerId: XpressMembershipOfferId) {
  const params = new URLSearchParams({
    path: 'exam',
    language: 'ingles',
    exam: 'icfes',
    plan: offerId,
    next: '/suscripcion/examenes',
  });
  return `/registro?${params.toString()}`;
}

export default function IcfesLeadResultOffers({
  result,
  offerEnabled,
  onRetry,
  leadCaptured = false,
}: {
  result: IcfesTotalResultDto;
  offerEnabled: boolean;
  onRetry: () => void;
  leadCaptured?: boolean;
}) {
  const [step, setStep] = useState<'lead' | 'offers'>(leadCaptured ? 'offers' : 'lead');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [leadConsent, setLeadConsent] = useState(false);
  const [savingLead, setSavingLead] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const [busyOffer, setBusyOffer] = useState<XpressMembershipOfferId | null>(null);
  const [message, setMessage] = useState('');
  const leadSavedRef = useRef(false);

  const codeReportAvailable = result.premiumEligible && !result.officialResource;

  useEffect(() => {
    if (step !== 'offers') return;
    trackIcfesEvent('icfes_report_view', { mock_id: result.examId, report_type: 'score_only' });
    trackIcfesEvent('icfes_offer_view', { mock_id: result.examId, offer_variant: 'xpress-2026-09-12-v5' });
  }, [result.examId, step]);

  async function submitLead(event: React.FormEvent) {
    event.preventDefault();
    setMessage('');
    if (name.trim().length < 2) {
      setMessage('Ingresa tu nombre completo.');
      return;
    }
    if (!isPlausibleEmail(email)) {
      setMessage('Ingresa un correo electrónico válido.');
      return;
    }
    if (!isPlausibleWhatsapp(whatsapp)) {
      setMessage('Ingresa un WhatsApp válido de 10 a 15 dígitos.');
      return;
    }
    if (!leadConsent) {
      setMessage('Autoriza el guardado de tus datos para continuar.');
      return;
    }

    setSavingLead(true);
    try {
      if (!leadSavedRef.current) {
        const saved = await saveLead({
          name: name.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          examSlug: 'icfes',
          examScore: `${result.correct}/${result.total} correctas (${result.percentage}%)`,
          source: 'icfes-practica',
        });
        if (!saved.ok || !saved.id) throw new Error(saved.error ?? 'No pudimos guardar tus datos.');
        leadSavedRef.current = true;
        setLeadSaved(true);
        trackIcfesEvent('icfes_lead_submit', { mock_id: result.examId, lead_context: 'post_exam_required' });
        window.dataLayer = window.dataLayer ?? [];
        window.dataLayer.push({
          event: 'lead_simulacro',
          exam_slug: 'icfes',
          exam_score: `${result.correct}/${result.total} correctas (${result.percentage}%)`,
        });
      }
      if (accessCode.trim() && codeReportAvailable) {
        const access = await redeemExamAccessCodeFromBrowser({ code: accessCode, examSlug: 'icfes', attemptRef: result.attemptId });
        if (!access.unlocked) {
          setMessage(access.message ?? 'El código no es válido.');
          return;
        }
        window.location.assign(`/practica/icfes-saber-11/resultados/${encodeURIComponent(result.attemptId)}`);
        return;
      }
      setStep('offers');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No pudimos guardar tus datos. Intenta nuevamente.');
    } finally {
      setSavingLead(false);
    }
  }

  async function redeemCode(event: React.FormEvent) {
    event.preventDefault();
    setMessage('');
    if (!accessCode.trim()) return;
    setSavingLead(true);
    try {
      const access = await redeemExamAccessCodeFromBrowser({ code: accessCode, examSlug: 'icfes', attemptRef: result.attemptId });
      if (!access.unlocked) throw new Error(access.message ?? 'El código no es válido.');
      window.location.assign(`/practica/icfes-saber-11/resultados/${encodeURIComponent(result.attemptId)}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No pudimos validar el código.');
      setSavingLead(false);
    }
  }

  function continueToRegistration(offerId: XpressMembershipOfferId) {
    try {
      window.sessionStorage.setItem('wl_icfes_pending_attempt', result.attemptId);
    } catch {
      // The registration path still carries the selected product when storage is unavailable.
    }
    window.location.assign(registrationHref(offerId));
  }

  function selectOffer(offerId: XpressMembershipOfferId) {
    const selectedOffer = getXpressOffer(offerId);
    setMessage('');
    setBusyOffer(offerId);
    trackIcfesEvent('icfes_paid_detail_intent', {
      mock_id: result.examId,
      product_code: offerId,
      amount_cop: selectedOffer.amountInCents / 100,
    });

    continueToRegistration(offerId);
  }

  if (step === 'lead') {
    return (
      <main className={styles.shell} data-testid="icfes-lead-gate" data-active-practice="true">
        <section className={styles.leadCard} aria-labelledby="icfes-lead-title">
          <div className={styles.answerMark} aria-hidden="true"><span>A</span><span>B</span><span>C</span><span>D</span></div>
          <p className={styles.eyebrow}>SIMULACRO TERMINADO · RESULTADO PROTEGIDO</p>
          <h1 id="icfes-lead-title">Tu examen ya fue calificado</h1>
          <p className={styles.lede}>Guarda tus datos para consultar tu puntaje básico y elegir el nivel de análisis. El resultado no se muestra hasta confirmar el registro.</p>
          <form className={styles.form} onSubmit={submitLead} noValidate>
            <label htmlFor="icfes-result-name">Nombre completo</label>
            <input id="icfes-result-name" name="name" type="text" autoComplete="name" required minLength={2} value={name} onChange={(event) => setName(event.target.value)} disabled={savingLead} autoFocus />
            <label htmlFor="icfes-result-email">Correo electrónico</label>
            <input id="icfes-result-email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} disabled={savingLead} />
            <label htmlFor="icfes-result-whatsapp">WhatsApp</label>
            <input id="icfes-result-whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" required value={whatsapp} onChange={(event) => setWhatsapp(event.target.value)} disabled={savingLead} />
            {codeReportAvailable && <>
              <label htmlFor="icfes-result-access-code">Código de acceso <span className={styles.optional}>(opcional)</span></label>
              <input id="icfes-result-access-code" name="accessCode" type="text" autoComplete="one-time-code" placeholder="WL-ABCD-EFGH-JKLM-NP" maxLength={24} value={accessCode} onChange={(event) => setAccessCode(event.target.value.toUpperCase())} disabled={savingLead} />
              <p className={styles.codeHelp}>Si tu profesor o institución te dio un código, úsalo para abrir el informe completo sin pasar por el pago.</p>
            </>}
            <label className={styles.consent} htmlFor="icfes-result-consent">
              <input id="icfes-result-consent" type="checkbox" required checked={leadConsent} onChange={(event) => setLeadConsent(event.target.checked)} disabled={savingLead} />
              <span>Autorizo a WeLearn a guardar estos datos y contactarme sobre mi resultado y preparación ICFES. Puedo retirar mi autorización.</span>
            </label>
            {message && <p className={styles.error} role="alert">{message}</p>}
            <button className={styles.primaryButton} disabled={savingLead}>{savingLead ? 'Validando acceso…' : accessCode.trim() ? 'Guardar y validar código' : 'Guardar y ver mi puntaje'}</button>
            {leadSaved && message && <button type="button" className={styles.textButton} onClick={() => setStep('offers')}>Continuar sin código</button>}
          </form>
          <p className={styles.privacy}>Tus respuestas permanecen privadas. Nunca enviamos respuestas ni datos personales a herramientas de analítica.</p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.shell} data-testid="icfes-result-offers" data-active-practice="true">
      <section className={styles.resultsPanel} aria-labelledby="icfes-result-title">
        <header className={styles.resultHeader}>
          <div>
            <p className={styles.eyebrow}>RESULTADO BÁSICO · NO OFICIAL</p>
            <h1 id="icfes-result-title">Tu marcador</h1>
            <p>Este es el único dato incluido gratuitamente.</p>
          </div>
          <div className={styles.scoreTicket} aria-label={`${result.correct} aciertos de ${result.total}`}>
            <strong>{result.correct}<span>/{result.total}</span></strong>
            <small>aciertos</small>
          </div>
        </header>

        <section className={styles.lockedPreview} aria-labelledby="locked-result-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>TU INFORME ESTÁ LISTO</p>
            <h2 id="locked-result-title">Lo que todavía no muestra el marcador</h2>
          </div>
          <div className={styles.lockedGrid}>
            <div><span>01</span><strong>Desglose por partes</strong><small>Informe individual</small><b aria-label="Bloqueado">🔒</b></div>
            <div><span>02</span><strong>Respuesta por respuesta</strong><small>Informe individual</small><b aria-label="Bloqueado">🔒</b></div>
            <div><span>03</span><strong>Historial y ruta de estudio</strong><small>Xpress</small><b aria-label="Bloqueado">🔒</b></div>
            <div><span>04</span><strong>Revisión personalizada</strong><small>Xpress + tutor</small><b aria-label="Bloqueado">🔒</b></div>
          </div>
        </section>

        {leadCaptured && codeReportAvailable && <form className={styles.form} onSubmit={redeemCode}>
          <label htmlFor="icfes-offer-access-code">¿Ya tienes un código de acceso?</label>
          <input id="icfes-offer-access-code" type="text" autoComplete="one-time-code" placeholder="WL-ABCD-EFGH-JKLM-NP" maxLength={24} value={accessCode} onChange={event => setAccessCode(event.target.value.toUpperCase())} disabled={savingLead} />
          <button className={styles.secondaryButton} disabled={savingLead || !accessCode.trim()}>{savingLead ? 'Validando…' : 'Abrir informe con código'}</button>
        </form>}

        <section className={styles.offers} aria-labelledby="icfes-offers-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>ELIGE EL ALCANCE</p>
            <h2 id="icfes-offers-title">Continúa con todo el ecosistema ICFES</h2>
            <p>Los tres planes desbloquean práctica, simulacros cronometrados y explicaciones de ICFES durante 30 días.</p>
          </div>
          <div className={styles.offerGrid}>
            {XPRESS_OFFERS.map((offer) => {
              const copy = OFFER_COPY[offer.id];
              return (
                <article key={offer.id} className={`${styles.offerCard} ${copy.featured ? styles.featured : ''}`}>
                  {copy.featured && <span className={styles.featuredBadge}>RECOMENDADO</span>}
                  <p className={styles.offerEyebrow}>{copy.eyebrow}</p>
                  <h3>{copy.title}</h3>
                  <p className={styles.price}>{formatCop(offer.amountInCents)} <small>COP</small></p>
                  <p className={styles.billing}>{copy.billing}</p>
                  <ul>{copy.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
                  <button type="button" className={copy.featured ? styles.primaryButton : styles.secondaryButton} disabled={busyOffer !== null} onClick={() => void selectOffer(offer.id)}>
                    {busyOffer === offer.id ? 'Continuando…' : copy.action}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {!offerEnabled && <p className={styles.notice}>Los planes se activarán desde tu cuenta; este intento conserva únicamente el marcador básico.</p>}
        {message && <p className={styles.error} role="alert">{message}</p>}
        {result.officialResource && <p className={styles.notice}>{result.premiumUnavailableReason ?? 'Este cuadernillo histórico conserva únicamente el marcador gratuito. Los productos pagos aplican a simulacros propios de WeLearn.'}</p>}

        <footer className={styles.footer}>
          <button type="button" className={styles.textButton} onClick={onRetry}>Hacer otro intento</button>
          <Link href="/examenes/icfes">Volver a ICFES</Link>
        </footer>
      </section>
    </main>
  );
}
