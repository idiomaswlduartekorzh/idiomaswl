'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ICFES_PARTS } from '@/data/icfes/parts';
import styles from '../icfes-learning.module.css';

interface MasteryRow { official_part: number; skill: string; total_attempts: number; correct_attempts: number; accuracy: number; last_attempt_at: string }
interface SessionRow { client_session_id: string; context: string; official_part: number | null; question_count: number; correct_count: number | null; elapsed_seconds: number | null; started_at: string; completed_at: string | null }
interface ProgressData { anonymous?: boolean; mastery: MasteryRow[]; errors: unknown[]; sessions: SessionRow[] }

export default function ProgressDashboardClient() {
  const [state, setState] = useState<'loading' | 'anonymous' | 'error' | 'ready'>('loading');
  const [data, setData] = useState<ProgressData>({ mastery: [], errors: [], sessions: [] });

  useEffect(() => {
    void fetch('/api/icfes/practice-progress').then(async (response) => {
      if (!response.ok) { setState('error'); return; }
      const progress = await response.json() as ProgressData;
      if (progress.anonymous) { setState('anonymous'); return; }
      setData(progress);
      setState('ready');
    }).catch(() => setState('error'));
  }, []);

  if (state === 'loading') return <div className={styles.progressEmpty}>Cargando tu progreso…</div>;
  if (state === 'anonymous') return (
    <div className={styles.progressEmpty}><span aria-hidden="true">↻</span><h2>Tu práctica local sigue guardada</h2><p>Inicia sesión desde este dispositivo y visita una práctica para sincronizar los intentos locales de forma idempotente.</p><Link href="/login" className={styles.primaryButton}>Iniciar sesión</Link></div>
  );
  if (state === 'error') return <div className={styles.progressEmpty}><h2>No pudimos cargar el historial</h2><p>La práctica local continúa disponible. Inténtalo nuevamente cuando tengas conexión.</p></div>;

  const byPart = ICFES_PARTS.map((part) => {
    const rows = data.mastery.filter((row) => row.official_part === part.part);
    const attempts = rows.reduce((sum, row) => sum + row.total_attempts, 0);
    const correct = rows.reduce((sum, row) => sum + row.correct_attempts, 0);
    return { part, rows, attempts, accuracy: attempts ? Math.round((correct / attempts) * 100) : 0 };
  });

  return (
    <div className={styles.progressDashboard}>
      <div className={styles.progressOverview}><div><strong>{data.sessions.filter((session) => session.completed_at).length}</strong><span>sesiones recientes</span></div><div><strong>{data.mastery.reduce((sum, row) => sum + row.total_attempts, 0)}</strong><span>respuestas sincronizadas</span></div><div><strong>{data.errors.length}</strong><span>errores por repasar</span></div></div>
      <section><div className={styles.sectionHeading}><p className={styles.kicker}>Dominio por parte</p><h2>Precisión acumulada por habilidad</h2></div><div className={styles.masteryGrid}>{byPart.map(({ part, rows, attempts, accuracy }) => <article key={part.part} style={{ '--mastery-color': part.color } as React.CSSProperties}><div><span>Parte {part.part}</span><strong>{accuracy}%</strong></div><h3>{part.shortTitle}</h3><div className={styles.masteryBar}><span style={{ width: `${accuracy}%` }} /></div><p>{attempts ? `${attempts} intentos en ${rows.length} habilidad${rows.length === 1 ? '' : 'es'}.` : 'Todavía sin intentos sincronizados.'}</p><Link href={`/practica/icfes-saber-11/${part.slug}`}>Practicar →</Link></article>)}</div></section>
      <section><div className={styles.sectionHeading}><p className={styles.kicker}>Historial</p><h2>Tus últimas sesiones</h2></div>{data.sessions.length ? <div className={styles.sessionList}>{data.sessions.map((session) => <article key={session.client_session_id}><div><strong>{session.context === 'guided-simulator' ? 'Cuadernillo guiado' : session.official_part ? `Parte ${session.official_part}` : 'Práctica ICFES'}</strong><span>{new Date(session.started_at).toLocaleDateString('es-CO')}</span></div><p>{session.completed_at ? `${session.correct_count ?? 0}/${session.question_count} correctas` : 'Sesión iniciada, pendiente por terminar'}</p></article>)}</div> : <div className={styles.progressEmpty}><p>Completa una práctica para iniciar tu historial.</p></div>}</section>
      <div className={styles.actionRow}><Link href="/practica/icfes-saber-11/repaso-errores" className={styles.primaryButton}>Repasar errores</Link><Link href="/practica/icfes-saber-11/plan-de-estudio" className={styles.secondaryButton}>Ver mi plan</Link></div>
    </div>
  );
}
