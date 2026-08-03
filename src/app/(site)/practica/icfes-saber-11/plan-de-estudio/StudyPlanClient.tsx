'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ICFES_PARTS } from '@/data/icfes/parts';
import styles from '../icfes-learning.module.css';

const KEY = 'wl:icfes:study-plan:v1';
const WEEK_LABELS = { 2: 'Plan urgente · 2 semanas', 4: '30 días · 4 semanas', 8: '60 días · 8 semanas', 12: '90 días · 12 semanas' } as const;

export default function StudyPlanClient() {
  const [weeks, setWeeks] = useState<2 | 4 | 8 | 12>(8);
  const [minutes, setMinutes] = useState<20 | 40 | 60>(40);
  const [generated, setGenerated] = useState(false);

  const schedule = useMemo(() => Array.from({ length: weeks }, (_, index) => {
    const primary = ICFES_PARTS[(index * 2) % ICFES_PARTS.length];
    const secondary = ICFES_PARTS[(index * 2 + 1) % ICFES_PARTS.length];
    const reviewWeek = (index + 1) % 4 === 0 || index === weeks - 1;
    return {
      week: index + 1,
      primary,
      secondary,
      days: minutes === 20 ? 4 : minutes === 40 ? 5 : 6,
      mission: reviewWeek ? 'Repaso de errores + bloque de cuadernillo' : `${primary.shortTitle} + ${secondary.shortTitle}`,
    };
  }), [minutes, weeks]);

  function generate() {
    setGenerated(true);
    try { window.localStorage.setItem(KEY, JSON.stringify({ weeks, minutes, generatedAt: new Date().toISOString() })); } catch { /* el plan sigue visible */ }
    void fetch('/api/icfes/study-plan', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ weeks, minutes }),
      keepalive: true,
    }).catch(() => { /* el plan local es la fuente de respaldo */ });
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: 'icfes_study_plan_generated', weeks, minutes_per_day: minutes });
  }

  return (
    <div className={styles.planBuilder}>
      <div className={styles.planControls}>
        <fieldset><legend>¿Cuánto tiempo tienes?</legend><div>{([2, 4, 8, 12] as const).map((value) => <button type="button" aria-pressed={weeks === value} onClick={() => setWeeks(value)} key={value}>{WEEK_LABELS[value]}</button>)}</div></fieldset>
        <fieldset><legend>¿Cuántos minutos por día?</legend><div>{([20, 40, 60] as const).map((value) => <button type="button" aria-pressed={minutes === value} onClick={() => setMinutes(value)} key={value}>{value} min</button>)}</div></fieldset>
        <button type="button" className={styles.primaryButton} onClick={generate}>Crear mi plan</button>
      </div>

      {generated && (
        <div className={styles.planResult} aria-live="polite">
          <div className={styles.planResultHeader}><div><p className={styles.kicker}>Tu ruta de {weeks} semanas</p><h2>{minutes} minutos al día · progresión + repaso</h2></div><Link href="/practica/icfes-saber-11/diagnostico">Ajustar con diagnóstico →</Link></div>
          <div className={styles.planTimeline}>
            {schedule.map((item) => (
              <article key={item.week} style={{ '--plan-color': item.primary.color } as React.CSSProperties}>
                <span>Semana {item.week}</span><strong>{item.mission}</strong><p>{item.days} días: estrategia, práctica guiada, vocabulario y una sesión de repaso.</p>
                <div><Link href={`/practica/icfes-saber-11/${item.primary.slug}`}>Parte {item.primary.part}</Link><Link href={`/practica/icfes-saber-11/${item.secondary.slug}`}>Parte {item.secondary.part}</Link></div>
              </article>
            ))}
          </div>
          <div className={styles.planNext}><strong>Regla semanal</strong><p>No avances por calendario si quedas debajo de 70%: revisa errores, repite una sesión corta y vuelve a medir.</p><Link href="/practica/icfes-saber-11/repaso-errores" className={styles.secondaryButton}>Abrir repaso de errores</Link></div>
        </div>
      )}
    </div>
  );
}
