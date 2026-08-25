'use client'

import Link from 'next/link'
import type { ExamEntry, KoreanStep, ActivityDay } from './page'

interface Props {
  name: string
  exams: ExamEntry[]
  koreanSteps: KoreanStep[]
  activityDays: ActivityDay[]
  totalActive: number
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CO', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

export default function ProgresoClient({ name, exams, koreanSteps, activityDays, totalActive }: Props) {
  const koreanDone = koreanSteps.filter(s => s.done).length
  const koreanPct  = koreanSteps.length > 0 ? Math.round((koreanDone / koreanSteps.length) * 100) : 0
  const completedScores = exams.flatMap(exam => exam.pct == null ? [] : [exam.pct])
  const bestScore  = completedScores.length > 0 ? Math.max(...completedScores) : 0
  const avgScore   = completedScores.length > 0
    ? Math.round(completedScores.reduce((acc, score) => acc + score, 0) / completedScores.length)
    : 0

  // Group activityDays into weeks of 7
  const weeks: ActivityDay[][] = []
  for (let i = 0; i < activityDays.length; i += 7) {
    weeks.push(activityDays.slice(i, i + 7))
  }

  const dayLabels = ['L','M','X','J','V','S','D']

  return (
    <div className="pg-shell">
      <div className="wrap" style={{ paddingTop: 40, paddingBottom: 64 }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
          <div>
            <Link href="/dashboard/student" style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
              ← Volver al inicio
            </Link>
            <h1 className="serif" style={{ margin: 0, fontSize: 28, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
              Mi progreso
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted)' }}>
              {name} · Resumen de tu actividad en WeLearn
            </p>
          </div>
          <Link href="/examenes" className="btn btn-sm" style={{ background: 'var(--ink-bg)', color: '#fff', borderColor: 'var(--ink-bg)' }}>
            + Nuevo simulacro
          </Link>
        </div>

        {/* ── KPI strip ── */}
        <div className="pg-kpis">
          {[
            { num: String(exams.length),   label: 'Simulacros hechos',   color: '#1a2ecc' },
            { num: bestScore ? `${bestScore}%`  : '—', label: 'Mejor puntaje',        color: '#c8202e' },
            { num: avgScore  ? `${avgScore}%`   : '—', label: 'Promedio general',      color: '#1a6e3c' },
            { num: `${totalActive}`,              label: 'Días activo en total',  color: '#f97316' },
            { num: `${koreanDone}/${koreanSteps.length}`, label: 'Lecciones coreano',   color: '#c8202e' },
          ].map(k => (
            <div key={k.label} className="pg-kpi">
              <p className="pg-kpi__num" style={{ color: k.color }}>{k.num}</p>
              <p className="pg-kpi__label">{k.label}</p>
            </div>
          ))}
        </div>

        {/* ── Activity grid ── */}
        <div className="pg-card" style={{ marginBottom: 24 }}>
          <h2 className="pg-card__title">Actividad — últimas 10 semanas</h2>
          <div className="pg-activity-grid">
            {/* Day labels */}
            <div className="pg-activity-labels">
              {dayLabels.map(d => (
                <span key={d} className="pg-activity-label">{d}</span>
              ))}
            </div>
            {/* Weeks */}
            <div className="pg-weeks">
              {weeks.map((week, wi) => (
                <div key={wi} className="pg-week">
                  {week.map(day => (
                    <div
                      key={day.date}
                      className={`pg-day${day.active ? ' pg-day--on' : ''}`}
                      title={day.active ? `Activo el ${formatDate(day.date)}` : day.date}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p style={{ margin: '10px 0 0', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
            {totalActive} día{totalActive !== 1 ? 's' : ''} activo en total
          </p>
        </div>

        {/* ── Two column ── */}
        <div className="pg-grid2">

          {/* Historial de simulacros */}
          <div className="pg-card">
            <h2 className="pg-card__title">Historial de simulacros</h2>
            {exams.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 16px' }}>
                  Aún no has hecho ningún simulacro.
                </p>
                <Link href="/examenes" className="btn btn-sm">
                  Hacer mi primer simulacro →
                </Link>
              </div>
            ) : (
              <div className="pg-exam-list">
                {exams.map(ex => (
                  <Link key={ex.id} href={ex.slug === 'ielts'
                    ? `/dashboard/student/resultados/ielts/${ex.id}`
                    : `/examenes/${ex.slug}`} className="pg-exam-row">
                    <div className="pg-exam-row__dot" style={{ background: ex.color }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="pg-exam-row__name">{ex.name} · {ex.mockTitle}</p>
                      <p className="pg-exam-row__date">{formatDate(ex.date)}</p>
                    </div>
                    <div className="pg-exam-row__score" style={{ color: ex.pending ? 'var(--muted)' : (ex.pct ?? 0) >= 70 ? '#16a34a' : (ex.pct ?? 0) >= 50 ? '#d97706' : '#dc2626' }}>
                      {ex.scoreLabel}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Korean progress */}
          <div className="pg-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 className="pg-card__title" style={{ margin: 0 }}>🇰🇷 Lecciones de coreano</h2>
              <Link href="/leccion" style={{ fontSize: 11, color: 'var(--muted)', textDecoration: 'none' }}>Ver todas →</Link>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)', marginBottom: 6 }}>
                <span>Progreso</span>
                <span style={{ fontWeight: 700, color: '#c8202e' }}>{koreanDone}/{koreanSteps.length} lecciones</span>
              </div>
              <div style={{ height: 8, background: 'var(--bg-2)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${koreanPct}%`, background: 'linear-gradient(90deg, #c8202e, #e05a6a)', borderRadius: 4, transition: 'width 0.8s ease' }} />
              </div>
            </div>

            {koreanSteps.map(step => (
              <Link
                key={step.day}
                href={`/courses/korean/step/${step.day}`}
                className={`pg-lesson-row${step.done ? ' pg-lesson-row--done' : ''}`}
              >
                <div className="pg-lesson-row__check">
                  {step.done ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span style={{ fontSize: 9, fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--muted)' }}>{step.day}</span>
                  )}
                </div>
                <div>
                  <p className="pg-lesson-row__title">{step.title}</p>
                  <p className="pg-lesson-row__sub">{step.sub}</p>
                </div>
                {!step.done && <span style={{ marginLeft: 'auto', fontSize: 11, color: '#1a2ecc', fontWeight: 600 }}>Empezar →</span>}
              </Link>
            ))}

            {koreanDone === koreanSteps.length && koreanSteps.length > 0 && (
              <div style={{ marginTop: 16, background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#0369a1' }}>
                  🎉 ¡Completaste todas las lecciones disponibles!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Score trends ── */}
        {completedScores.length >= 2 && (
          <div className="pg-card" style={{ marginTop: 24 }}>
            <h2 className="pg-card__title">Evolución de puntajes</h2>
            <div className="pg-trend">
              {[...exams].filter(ex => ex.pct != null).reverse().map((ex, i) => (
                <div key={ex.id} className="pg-trend-col">
                  <div
                    className="pg-trend-bar"
                    style={{
                      height: `${Math.max(ex.pct ?? 0, 4)}%`,
                      background: ex.color,
                    }}
                    title={`${ex.name}: ${ex.scoreLabel}`}
                  />
                  <span className="pg-trend-label">{i + 1}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              {[...new Set(exams.map(e => e.slug))].map(slug => (
                <span key={slug} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: exams.find(e => e.slug === slug)?.color ?? '#ccc', display: 'inline-block' }} />
                  {exams.find(e => e.slug === slug)?.name ?? slug}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── Styles ── */}
      <style>{`
        .pg-shell {
          background: var(--bg-2);
          min-height: 100vh;
        }

        /* KPIs */
        .pg-kpis {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        @media (max-width: 768px) {
          .pg-kpis { grid-template-columns: repeat(2, 1fr); }
        }
        .pg-kpi {
          background: var(--bg);
          border: 1px solid var(--line-soft);
          border-radius: 14px;
          padding: 16px 14px;
          text-align: center;
        }
        .pg-kpi__num {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin: 0 0 4px;
          line-height: 1;
        }
        .pg-kpi__label {
          font-size: 10px;
          color: var(--muted);
          font-family: var(--mono);
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        /* Card */
        .pg-card {
          background: var(--bg);
          border: 1px solid var(--line-soft);
          border-radius: 16px;
          padding: 24px;
        }
        .pg-card__title {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 16px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        /* Activity grid */
        .pg-activity-grid {
          display: flex;
          gap: 8px;
          align-items: flex-start;
          overflow-x: auto;
        }
        .pg-activity-labels {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding-top: 2px;
        }
        .pg-activity-label {
          width: 12px;
          height: 12px;
          font-size: 9px;
          font-family: var(--mono);
          color: var(--muted);
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pg-weeks { display: flex; gap: 3px; }
        .pg-week  { display: flex; flex-direction: column; gap: 3px; }
        .pg-day {
          width: 12px;
          height: 12px;
          border-radius: 3px;
          background: var(--bg-2);
          border: 1px solid var(--line-soft);
        }
        .pg-day--on {
          background: #c8202e;
          border-color: #c8202e;
        }

        /* 2-col grid */
        .pg-grid2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 768px) {
          .pg-grid2 { grid-template-columns: 1fr; }
        }

        /* Exam list */
        .pg-exam-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: 380px;
          overflow-y: auto;
        }
        .pg-exam-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid var(--line-soft);
          background: var(--bg);
          text-decoration: none;
          transition: border-color 0.15s, background 0.15s;
        }
        .pg-exam-row:hover { background: var(--bg-2); border-color: rgba(26,46,204,0.25); }
        .pg-exam-row__dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
        }
        .pg-exam-row__name {
          font-size: 13px; font-weight: 600; color: var(--ink); margin: 0 0 2px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .pg-exam-row__date {
          font-size: 10px; color: var(--muted); margin: 0; font-family: var(--mono);
        }
        .pg-exam-row__score {
          font-size: 15px; font-weight: 800; letter-spacing: -0.02em; flex-shrink: 0;
        }

        /* Korean lessons */
        .pg-lesson-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid var(--line-soft);
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .pg-lesson-row:last-child { border-bottom: none; }
        .pg-lesson-row:hover { opacity: 0.8; }
        .pg-lesson-row__check {
          width: 24px; height: 24px; border-radius: 7px;
          background: var(--bg-2); border: 1px solid var(--line-soft);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .pg-lesson-row--done .pg-lesson-row__check {
          background: #16a34a; border-color: #16a34a;
        }
        .pg-lesson-row__title {
          font-size: 13px; font-weight: 600; color: var(--ink); margin: 0 0 2px;
        }
        .pg-lesson-row__sub {
          font-size: 10px; color: var(--muted); margin: 0; font-family: var(--mono);
        }

        /* Score trend bars */
        .pg-trend {
          height: 120px;
          display: flex;
          align-items: flex-end;
          gap: 6px;
          padding: 8px 0 0;
          overflow-x: auto;
        }
        .pg-trend-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          min-width: 28px;
          flex: 1;
        }
        .pg-trend-bar {
          width: 100%;
          border-radius: 4px 4px 0 0;
          min-height: 4px;
          transition: height 0.5s ease;
        }
        .pg-trend-label {
          font-size: 9px;
          font-family: var(--mono);
          color: var(--muted);
          font-weight: 700;
        }
      `}</style>
    </div>
  )
}
