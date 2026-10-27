'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { StudentDashboardData } from '@/lib/student-dashboard/types';
import styles from './student-dashboard.module.css';

type Period = 'all' | '30' | '90';

export default function StudentInsights({ data, asOf }: { data: StudentDashboardData; asOf: string }) {
  const [exam, setExam] = useState('all');
  const [period, setPeriod] = useState<Period>('all');
  const exams = useMemo(() => Array.from(new Map(data.attempts.map((attempt) => [attempt.examSlug, attempt.examName])).entries()), [data.attempts]);
  const attempts = useMemo(() => data.attempts.filter((attempt) => {
    if (exam !== 'all' && attempt.examSlug !== exam) return false;
    if (period === 'all') return true;
    return new Date(attempt.createdAt).getTime() >= new Date(asOf).getTime() - Number(period) * 86_400_000;
  }), [data.attempts, exam, period, asOf]);
  const scored = attempts.filter((attempt) => attempt.score !== null);
  const average = scored.length ? Math.round(scored.reduce((sum, attempt) => sum + (attempt.score ?? 0), 0) / scored.length) : null;
  const best = scored.length ? Math.max(...scored.map((attempt) => attempt.score ?? 0)) : null;
  const chronological = [...scored].reverse().slice(-8);
  const points = chronological.map((attempt, index) => ({
    ...attempt,
    x: chronological.length === 1 ? 310 : 38 + index * 540 / (chronological.length - 1),
    y: 148 - (attempt.score ?? 0) * 1.2,
  }));
  const delta = scored.length > 1 ? (scored[0].score ?? 0) - (scored[scored.length - 1].score ?? 0) : null;
  const skillMap = new Map<string, { total: number; count: number }>();
  for (const attempt of attempts) for (const skill of attempt.skills) {
    const entry = skillMap.get(skill.name) ?? { total: 0, count: 0 };
    skillMap.set(skill.name, { total: entry.total + skill.percentage, count: entry.count + 1 });
  }
  const skills = Array.from(skillMap, ([name, value]) => ({ name, score: Math.round(value.total / value.count) })).sort((a, b) => a.score - b.score);

  return <section className={`${styles.section} ${styles.insightsSection}`} id="progreso" aria-labelledby="insights-title">
    <div className={styles.insightsHeader}>
      <div><p className={styles.eyebrow}>Análisis de aprendizaje</p><h2 id="insights-title">Así vas avanzando</h2><p>Explora tus resultados guardados y elige qué practicar después.</p></div>
      <div className={styles.insightsFilters}>
        <label>Examen<select value={exam} onChange={(event) => setExam(event.target.value)}><option value="all">Todos</option>{exams.map(([slug, name]) => <option value={slug} key={slug}>{name}</option>)}</select></label>
        <label>Periodo<select value={period} onChange={(event) => setPeriod(event.target.value as Period)}><option value="all">Todo el historial</option><option value="30">Últimos 30 días</option><option value="90">Últimos 90 días</option></select></label>
      </div>
    </div>
    <div className={styles.insightMetrics}>
      <article><span>Intentos del periodo</span><strong>{attempts.length}</strong><small>resultados guardados</small></article>
      <article><span>Promedio</span><strong>{average === null ? '—' : `${average}%`}</strong><small>intentos con puntuación</small></article>
      <article><span>Mejor resultado</span><strong>{best === null ? '—' : `${best}%`}</strong><small>en el periodo elegido</small></article>
      <article><span>Cambio</span><strong>{delta === null ? '—' : `${delta > 0 ? '+' : ''}${delta} pts`}</strong><small>primero a más reciente</small></article>
    </div>
    <div className={styles.insightsGrid}>
      <div className={styles.insightsChart}>
        <div className={styles.insightsCardHead}><strong>Resultados en el tiempo</strong><span>{scored.length} medibles</span></div>
        {points.length ? <svg viewBox="0 0 620 180" role="img" aria-label={`Evolución de ${points.length} resultados, de 0 a 100 por ciento`}>
          {[25, 50, 75, 100].map((value) => <g key={value}><line x1="36" x2="590" y1={148 - value * 1.2} y2={148 - value * 1.2} /><text x="4" y={152 - value * 1.2}>{value}</text></g>)}
          {points.length > 1 ? <polyline points={points.map((point) => `${point.x},${point.y}`).join(' ')} /> : null}
          {points.map((point) => <g key={point.id}><circle cx={point.x} cy={point.y} r="6"><title>{`${point.examName}: ${point.score}%`}</title></circle><text className={styles.pointLabel} x={point.x} y={point.y - 13}>{point.score}%</text></g>)}
        </svg> : <div className={styles.progressEmpty}>Aún no hay resultados con puntuación para estos filtros.</div>}
        <p className={styles.insightsNote}>Cada punto es un simulacro completado. Los exámenes se muestran en escala de porcentaje para poder compararlos.</p>
      </div>
      <div className={styles.skillsCard}>
        <div className={styles.insightsCardHead}><strong>Habilidades medidas</strong><span>promedio</span></div>
        {skills.length ? skills.map((skill) => <div className={styles.skillRow} key={skill.name}><div><span>{skill.name}</span><strong>{skill.score}%</strong></div><div className={styles.skillTrack}><span style={{ width: `${skill.score}%` }} /></div></div>) : <p>Los resultados detallados por habilidad aparecerán después de completar secciones compatibles.</p>}
        {skills.length ? <p className={styles.skillAdvice}>Prioridad sugerida: <strong>{skills[0].name}</strong>. Revisa tu último reporte para elegir una práctica concreta.</p> : null}
      </div>
    </div>
    {attempts[0] ? <div className={styles.insightsFooter}><span>Último resultado: <strong>{attempts[0].examName} · {attempts[0].scoreLabel}</strong></span><Link href={attempts[0].reportHref}>{attempts[0].reportAvailable ? 'Abrir reporte' : 'Abrir examen'} →</Link></div> : null}
  </section>;
}
