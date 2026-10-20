'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState, type MouseEvent, type ReactNode } from 'react';
import type { ExamAccessDecision } from '@/lib/xpress-commerce/access';
import { AUTODIDACTA_PLANS } from '@/lib/xpress-commerce/catalog';
import type { WelearnLanguage, XpressExamSlug } from '@/lib/student-onboarding/catalog';
import styles from './ExamAccessGate.module.css';

function registrationHref(examSlug: XpressExamSlug, language: WelearnLanguage, plan: string, next: string) {
  return `/registro?${new URLSearchParams({ path: 'exam', language, exam: examSlug, plan, next }).toString()}`;
}

export default function ExamAccessGate({
  access,
  authenticated,
  freeClaimAvailable,
  examLabel,
  language,
  children,
}: {
  access: ExamAccessDecision;
  authenticated: boolean;
  freeClaimAvailable: boolean;
  examLabel: string;
  language: WelearnLanguage;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [gate, setGate] = useState<'start' | 'download' | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [message, setMessage] = useState('');
  const mayStart = !['anonymous', 'locked'].includes(access.level);
  const mayDownload = ['essential', 'autodidacta', 'pro', 'welearn-full'].includes(access.level);
  const next = `${pathname}${searchParams.size ? `?${searchParams.toString()}` : ''}`;

  function capture(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    const start = target.closest<HTMLElement>('[data-exam-start="true"]');
    const download = target.closest<HTMLElement>('[data-exam-download="true"]');
    if ((!start || mayStart) && (!download || mayDownload)) return;
    event.preventDefault();
    event.stopPropagation();
    setMessage('');
    setGate(download ? 'download' : 'start');
  }

  async function claimFree() {
    if (claiming) return;
    setClaiming(true);
    setMessage('');
    try {
      const response = await fetch('/api/exam-access', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'claim-free', exam: access.examSlug }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'free_exam_claim_failed');
      window.location.reload();
    } catch (error) {
      const code = error instanceof Error ? error.message : 'free_exam_claim_failed';
      setMessage(code === 'free_exam_already_claimed'
        ? 'Tu acceso gratuito ya está ligado a otro examen. Puedes añadir este con uno de los planes pagos.'
        : 'No pudimos activar el acceso gratuito en este momento. Inténtalo nuevamente.');
      setClaiming(false);
    }
  }

  return <div onClickCapture={capture}>
    {children}
    {gate && <div className={styles.backdrop} role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) setGate(null);
    }}>
      <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="exam-access-title">
        <button type="button" className={styles.close} onClick={() => setGate(null)} aria-label="Cerrar">×</button>
        <p className={styles.eyebrow}>{gate === 'download' ? 'MATERIAL PROTEGIDO' : 'TU PRIMER PASO ES GRATIS'}</p>
        <h2 id="exam-access-title">{gate === 'download' ? `Descarga los materiales de ${examLabel}` : `Empieza a preparar ${examLabel}`}</h2>
        <p className={styles.lede}>{gate === 'download'
          ? 'Las descargas y los informes detallados están incluidos desde Autodidacta Esencial.'
          : 'Crea tu cuenta para guardar el intento y ver tu puntaje total. No necesitas pagar para elegir tu primer examen.'}</p>

        {!authenticated ? <div className={styles.journeys}>
          <article>
            <span>ESTUDIANTE AUTÓNOMO</span>
            <h3>Practica a tu ritmo</h3>
            <p>Elige este examen como tu acceso gratuito. Verás tu puntaje total; los detalles y las descargas se desbloquean desde $15.900.</p>
            <Link className={styles.primary} href={registrationHref(access.examSlug as XpressExamSlug, language, 'exam-free', next)}>Crear cuenta gratis</Link>
          </article>
          <article>
            <span>ESTUDIANTE WELEARN</span>
            <h3>Prepárate con profesor</h3>
            <p>Tu plan de clases incluye prácticas, simulacros, explicaciones y seguimiento del examen asignado.</p>
            <Link className={styles.secondary} href={`/registro?${new URLSearchParams({ path: 'welearn', language, exam: access.examSlug, plan: 'esencial', next }).toString()}`}>Ver ruta WeLearn</Link>
          </article>
        </div> : freeClaimAvailable && gate === 'start' ? <button type="button" className={styles.primaryButton} disabled={claiming} onClick={() => void claimFree()}>{claiming ? 'Activando…' : `Activar ${examLabel} gratis`}</button> : null}

        {(authenticated || gate === 'download') && <div className={styles.plans}>
          {AUTODIDACTA_PLANS.filter((plan) => plan.id !== 'exam-free').map((plan) => {
            const href = authenticated
              ? `/suscripcion/examenes?${new URLSearchParams({ exam: access.examSlug, plan: plan.id }).toString()}`
              : registrationHref(access.examSlug as XpressExamSlug, language, plan.id, next);
            return <Link key={plan.id} href={href}>
              <span>{plan.name}</span>
              <strong>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(plan.amountInCents / 100)}</strong>
              <small>{plan.description}</small>
            </Link>;
          })}
        </div>}
        {message && <p className={styles.error} role="alert">{message}</p>}
        <p className={styles.note}>Cada acceso cubre un solo examen. Un segundo examen se añade en la misma cuenta con un plan pago.</p>
      </section>
    </div>}
  </div>;
}
