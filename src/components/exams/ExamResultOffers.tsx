'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { redeemExamAccessCodeFromBrowser } from '@/lib/exam-access-codes/client';
import type { ExamAccessCodeExam } from '@/lib/exam-access-codes/config';
import { XPRESS_OFFERS, type XpressOfferId } from '@/lib/xpress-commerce/catalog';
import styles from './ExamResultOffers.module.css';

const OFFER_COPY: Record<XpressOfferId, { eyebrow: string; title: string; billing: string; benefits: string[]; action: string; featured?: boolean }> = {
  'exam-single': {
    eyebrow: 'UN SOLO EXAMEN',
    title: 'Examen con informe',
    billing: 'pago único',
    benefits: ['Un nuevo simulacro completo', 'Revisión pregunta por pregunta', 'Explicaciones y áreas prioritarias'],
    action: 'Elegir examen individual',
  },
  'exam-auto': {
    eyebrow: 'XPRESS · 30 DÍAS',
    title: 'Preparación automática',
    billing: 'renovación cada 30 días',
    benefits: ['Simulacros del examen disponibles', 'Informes detallados e historial', 'Progreso y ruta de estudio'],
    action: 'Elegir Xpress',
    featured: true,
  },
  'exam-teacher': {
    eyebrow: 'XPRESS + TUTOR · 30 DÍAS',
    title: 'Feedback personalizado',
    billing: 'renovación cada 30 días',
    benefits: ['Todo lo incluido en Xpress', 'Revisión personalizada de un tutor', 'Entrega en el panel dentro de 24 horas'],
    action: 'Elegir Xpress + tutor',
  },
};

function formatCop(amountInCents: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amountInCents / 100);
}

function registrationHref(examSlug: ExamAccessCodeExam, offerId: XpressOfferId): string {
  const params = new URLSearchParams({
    path: 'exam',
    language: examSlug === 'goethe' ? 'aleman' : 'ingles',
    exam: examSlug,
    plan: offerId,
    next: '/suscripcion/examenes',
  });
  return `/registro?${params.toString()}`;
}

export default function ExamResultOffers({
  examSlug,
  examName,
  attemptRef,
  score,
  scoreLabel = 'aciertos',
  initialUnlocked = false,
  initialCodeMessage = '',
  fullResult,
  onUnlocked,
  onRetry,
}: {
  examSlug: ExamAccessCodeExam;
  examName: string;
  attemptRef: string;
  score: string;
  scoreLabel?: string;
  initialUnlocked?: boolean;
  initialCodeMessage?: string;
  fullResult: ReactNode;
  onUnlocked?: () => void;
  onRetry: () => void;
}) {
  const [locallyUnlocked, setLocallyUnlocked] = useState(false);
  const unlocked = initialUnlocked || locallyUnlocked;
  const [code, setCode] = useState('');
  const [message, setMessage] = useState(initialCodeMessage);
  const [checking, setChecking] = useState(false);

  async function validateCode(event: React.FormEvent) {
    event.preventDefault();
    setChecking(true);
    setMessage('');
    const outcome = await redeemExamAccessCodeFromBrowser({ code, examSlug, attemptRef });
    setChecking(false);
    if (!outcome.unlocked) {
      setMessage(outcome.message ?? 'El código no es válido.');
      return;
    }
    setLocallyUnlocked(true);
    onUnlocked?.();
  }

  function chooseOffer(offerId: XpressOfferId) {
    try { window.sessionStorage.setItem('wl_xpress_pending_submission', `${examSlug}:${attemptRef}`); } catch {}
    window.location.assign(registrationHref(examSlug, offerId));
  }

  if (unlocked) {
    return <>
      <div className={styles.unlocked} role="status"><strong>Acceso institucional verificado</strong><span>Informe completo habilitado sin interfaz de pago.</span></div>
      {fullResult}
    </>;
  }

  return (
    <main className={styles.shell} data-testid={`${examSlug}-result-offers`}>
      <section className={styles.panel} aria-labelledby={`${examSlug}-basic-result-title`}>
        <header className={styles.resultHeader}>
          <div>
            <p className={styles.eyebrow}>RESULTADO BÁSICO · {examName.toUpperCase()}</p>
            <h1 id={`${examSlug}-basic-result-title`}>Tu marcador</h1>
            <p>Este es el único dato incluido gratuitamente.</p>
          </div>
          <div className={styles.score}><strong>{score}</strong><small>{scoreLabel}</small></div>
        </header>

        <section className={styles.codeBox} aria-labelledby={`${examSlug}-code-title`}>
          <div><p className={styles.eyebrow}>¿VIENES CON TU PROFESOR?</p><h2 id={`${examSlug}-code-title`}>Usa tu código de acceso</h2><p>Si tu institución te dio un código, valida aquí el informe completo. No aparecerá ninguna opción de pago.</p></div>
          <form onSubmit={validateCode}>
            <label htmlFor={`${examSlug}-result-code`}>Código</label>
            <div><input id={`${examSlug}-result-code`} value={code} onChange={event => setCode(event.target.value.toUpperCase())} placeholder="WL-ABCD-EFGH-JKLM-NP" autoComplete="one-time-code" maxLength={24} required disabled={checking} /><button disabled={checking}>{checking ? 'Validando…' : 'Validar'}</button></div>
            {message && <p className={styles.error} role="alert">{message}</p>}
          </form>
        </section>

        <section className={styles.locked}>
          <div><span>01</span><strong>Desglose por secciones</strong><b>🔒</b></div>
          <div><span>02</span><strong>Respuesta por respuesta</strong><b>🔒</b></div>
          <div><span>03</span><strong>Feedback y ruta de estudio</strong><b>🔒</b></div>
        </section>

        <section className={styles.offers} aria-labelledby={`${examSlug}-offers-title`}>
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>ELIGE EL ALCANCE</p><h2 id={`${examSlug}-offers-title`}>Un examen completo o preparación continua</h2><p>El primero habilita un nuevo intento completo en tu cuenta. Los planes Xpress se renuevan cada 30 días.</p></div>
          <div className={styles.offerGrid}>{XPRESS_OFFERS.map(offer => {
            const copy = OFFER_COPY[offer.id];
            return <article key={offer.id} className={`${styles.offer} ${copy.featured ? styles.featured : ''}`}>
              {copy.featured && <span className={styles.badge}>RECOMENDADO</span>}
              <p className={styles.offerEyebrow}>{copy.eyebrow}</p><h3>{copy.title}</h3>
              <p className={styles.price}>{formatCop(offer.amountInCents)} <small>COP</small></p><p className={styles.billing}>{copy.billing}</p>
              <ul>{copy.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul>
              <button type="button" onClick={() => chooseOffer(offer.id)}>{copy.action}</button>
            </article>;
          })}</div>
        </section>

        <footer className={styles.footer}><button type="button" onClick={onRetry}>Hacer otro intento</button><Link href={`/examenes/${examSlug}`}>Volver a {examName}</Link></footer>
      </section>
    </main>
  );
}
