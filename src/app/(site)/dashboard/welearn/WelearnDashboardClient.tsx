'use client'

import Link from 'next/link'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Props {
  name: string
  language: string
  level: string
}

// ---------------------------------------------------------------------------
// Placeholder data
// ---------------------------------------------------------------------------
const STATS = [
  { label: 'Lecciones completadas', value: '22', icon: '📚' },
  { label: 'Racha actual', value: '7 días', icon: '🔥' },
  { label: 'Próximo examen', value: '18 jun', icon: '📆' },
  { label: 'Horas de estudio', value: '31 h', icon: '⏱️' },
]

const COURSE_PROGRESS = 34 // percent

const LESSON_STAGES = Array.from({ length: 11 }, (_, i) => ({
  num: String(i + 1).padStart(2, '0'),
  done: i < 7,
  current: i === 7,
}))

const MOCK_SCORES = [
  { name: 'IELTS S1', score: 68 },
  { name: 'ICFES M2', score: 74 },
  { name: 'IELTS S2', score: 72 },
  { name: 'ICFES M4', score: 81 },
  { name: 'TOEFL S1', score: 77 },
]

const WL_BLUE = '#1a2ecc'

// Mon=0 … Sun=6  (today = Thursday index 3 in demo; we compute the real day)
const WEEK_DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const CLASSES = [
  { dayIdx: 0, time: '6:00 pm', subject: 'Inglés' },
  { dayIdx: 2, time: '6:00 pm', subject: 'Inglés' },
  { dayIdx: 4, time: '6:00 pm', subject: 'Inglés' },
]

// js getDay(): 0=Sun,1=Mon…6=Sat → convert to Mon=0 index
function todayIndex(): number {
  const d = new Date().getDay()
  return d === 0 ? 6 : d - 1
}

const CERTS = [
  { name: 'IELTS', flag: '🇬🇧', target: '7.0', progress: 55, color: '#c8202e' },
  { name: 'ICFES', flag: '🇨🇴', target: '85', progress: 70, color: '#14215c' },
  { name: 'TOEFL', flag: '🇺🇸', target: '90', progress: 40, color: '#1a6e3c' },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function WelearnDashboardClient({ name, language, level }: Props) {
  const todayIdx = todayIndex()

  return (
    <div className="dash-wl-shell">
      <div className="wrap" style={{ paddingTop: 40, paddingBottom: 64 }}>

        {/* ── Header ── */}
        <div className="dash-wl-header" style={{ marginBottom: 32 }}>
          <div>
            <h1
              className="serif"
              style={{ fontSize: 30, margin: 0, color: 'var(--ink)' }}
            >
              Bienvenido/a, {name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
              <span className="dash-wl-badge">
                Estudiante WeLearn
              </span>
              <span className="dash-wl-badge dash-wl-badge--level">
                {language} · {level}
              </span>
            </div>
          </div>
          <Link href={`/courses/english/step/23`} className="btn btn-primary btn-sm">
            Continuar lección
          </Link>
        </div>

        {/* ── Progress bar ── */}
        <div className="dash-wl-card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <h2 className="dash-wl-card-title" style={{ margin: 0 }}>Progreso del curso</h2>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 22,
                fontWeight: 700,
                color: WL_BLUE,
                letterSpacing: '-0.03em',
              }}
            >
              {COURSE_PROGRESS}%
            </span>
          </div>
          <div className="dash-wl-progress-track">
            <div
              className="dash-wl-progress-fill"
              style={{ width: `${COURSE_PROGRESS}%` }}
            />
          </div>
          <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
            22 de 65 lecciones completadas
          </p>
        </div>

        {/* ── Quick stats ── */}
        <div className="dash-wl-stats-row" style={{ marginBottom: 28 }}>
          {STATS.map((s) => (
            <div key={s.label} className="dash-wl-stat-card">
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <p className="dash-wl-stat-value">{s.value}</p>
              <p className="dash-wl-stat-label">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Two-column ── */}
        <div className="dash-wl-grid-2" style={{ marginBottom: 28 }}>

          {/* Hoy toca */}
          <div className="dash-wl-card">
            <h2 className="dash-wl-card-title">Hoy toca</h2>
            <div
              style={{
                background: 'linear-gradient(135deg, #f0f3ff 0%, #e8ecff 100%)',
                borderRadius: 10,
                padding: '16px 18px',
                marginBottom: 18,
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  color: WL_BLUE,
                  margin: '0 0 4px',
                  letterSpacing: '-0.01em',
                }}
              >
                Lección 23 — Vocabulario de viajes
              </p>
              <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, fontFamily: 'var(--mono)' }}>
                Inglés · Nivel B1
              </p>
            </div>

            {/* Stage mini-icons */}
            <div className="dash-wl-stages">
              {LESSON_STAGES.map((stage) => (
                <div
                  key={stage.num}
                  className={`dash-wl-stage${stage.done ? ' dash-wl-stage--done' : ''}${stage.current ? ' dash-wl-stage--current' : ''}`}
                  title={`Etapa ${stage.num}`}
                >
                  {stage.done ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span style={{ fontSize: 8, fontFamily: 'var(--mono)', fontWeight: 700 }}>
                      {stage.num}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <Link
              href="/courses/english/step/23"
              className="btn btn-sm"
              style={{ marginTop: 18, background: WL_BLUE, borderColor: WL_BLUE, color: '#fff' }}
            >
              Continuar
              <span className="arrow">→</span>
            </Link>
          </div>

          {/* Rendimiento en simulacros */}
          <div className="dash-wl-card">
            <h2 className="dash-wl-card-title">Rendimiento en simulacros</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={MOCK_SCORES}
                layout="vertical"
                margin={{ top: 4, right: 28, bottom: 4, left: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--line-soft)" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: 'var(--muted)', fontFamily: 'var(--mono)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={60}
                  tick={{ fontSize: 11, fill: 'var(--ink)', fontFamily: 'var(--mono)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg)',
                    border: '1px solid var(--line-soft)',
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [`${value} pts`, 'Puntaje']}
                />
                <Bar dataKey="score" radius={[0, 6, 6, 0]} maxBarSize={18}>
                  {MOCK_SCORES.map((entry, idx) => (
                    <Cell
                      key={idx}
                      fill={entry.score >= 80 ? '#1a6e3c' : entry.score >= 70 ? WL_BLUE : '#c8202e'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Calendario de la semana ── */}
        <div className="dash-wl-card" style={{ marginBottom: 28 }}>
          <h2 className="dash-wl-card-title">Calendario de la semana</h2>
          <div className="dash-wl-week">
            {WEEK_DAYS.map((day, idx) => {
              const classToday = CLASSES.find((c) => c.dayIdx === idx)
              const isToday = idx === todayIdx
              return (
                <div
                  key={day}
                  className={`dash-wl-day${isToday ? ' dash-wl-day--today' : ''}`}
                >
                  <p className="dash-wl-day-name">{day}</p>
                  {classToday ? (
                    <div className="dash-wl-class-slot">
                      <span style={{ fontSize: 11, fontWeight: 600, color: WL_BLUE }}>
                        {classToday.time}
                      </span>
                      <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                        {classToday.subject}
                      </span>
                    </div>
                  ) : (
                    <div className="dash-wl-day-empty" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Mis certificaciones ── */}
        <div className="dash-wl-card">
          <h2 className="dash-wl-card-title">Mis certificaciones</h2>
          <div className="dash-wl-certs-row">
            {CERTS.map((cert) => (
              <div key={cert.name} className="dash-wl-cert-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 26 }}>{cert.flag}</span>
                  <div>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: cert.color,
                        margin: 0,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {cert.name}
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--muted)', margin: 0, fontFamily: 'var(--mono)' }}>
                      Meta: {cert.target}
                    </p>
                  </div>
                </div>

                {/* Progress ring-style with bar */}
                <div style={{ marginBottom: 8 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 11,
                      color: 'var(--muted)',
                      fontFamily: 'var(--mono)',
                      marginBottom: 4,
                    }}
                  >
                    <span>Progreso</span>
                    <span style={{ fontWeight: 600, color: cert.color }}>{cert.progress}%</span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      background: 'var(--bg-2)',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${cert.progress}%`,
                        background: cert.color,
                        borderRadius: 3,
                        transition: 'width 0.7s ease',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        .dash-wl-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .dash-wl-badge {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          font-family: var(--mono);
          letter-spacing: 0.04em;
          background: ${WL_BLUE}18;
          color: ${WL_BLUE};
          border: 1px solid ${WL_BLUE}30;
        }
        .dash-wl-badge--level {
          background: var(--bg-2);
          color: var(--muted);
          border-color: var(--line-soft);
        }

        .dash-wl-progress-track {
          height: 10px;
          background: var(--bg-2);
          border-radius: 5px;
          overflow: hidden;
        }
        .dash-wl-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, ${WL_BLUE} 0%, #5b6ef5 100%);
          border-radius: 5px;
          transition: width 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .dash-wl-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 768px) {
          .dash-wl-stats-row { grid-template-columns: repeat(2, 1fr); }
        }

        .dash-wl-stat-card {
          background: var(--bg);
          border: 1px solid var(--line-soft);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          border-top: 3px solid ${WL_BLUE};
        }
        .dash-wl-stat-value {
          font-size: 24px;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
          letter-spacing: -0.03em;
        }
        .dash-wl-stat-label {
          font-size: 11px;
          color: var(--muted);
          margin: 0;
          font-family: var(--mono);
        }

        .dash-wl-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 860px) {
          .dash-wl-grid-2 { grid-template-columns: 1fr; }
        }

        .dash-wl-card {
          background: var(--bg);
          border: 1px solid var(--line-soft);
          border-radius: 14px;
          padding: 24px;
        }
        .dash-wl-card-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 16px;
          letter-spacing: -0.01em;
        }

        .dash-wl-stages {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .dash-wl-stage {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-2);
          color: var(--muted);
          border: 1px solid var(--line-soft);
          font-size: 9px;
        }
        .dash-wl-stage--done {
          background: #16a34a;
          border-color: #16a34a;
          color: #fff;
        }
        .dash-wl-stage--current {
          background: ${WL_BLUE};
          border-color: ${WL_BLUE};
          color: #fff;
          box-shadow: 0 0 0 3px ${WL_BLUE}30;
        }

        .dash-wl-week {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }
        @media (max-width: 640px) {
          .dash-wl-week { grid-template-columns: repeat(4, 1fr); }
        }
        .dash-wl-day {
          border-radius: 10px;
          border: 1px solid var(--line-soft);
          padding: 10px 6px;
          min-height: 72px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          background: var(--bg-2);
        }
        .dash-wl-day--today {
          border-color: ${WL_BLUE};
          background: ${WL_BLUE}08;
          box-shadow: 0 0 0 1px ${WL_BLUE}30;
        }
        .dash-wl-day-name {
          font-size: 11px;
          font-weight: 600;
          font-family: var(--mono);
          color: var(--muted);
          margin: 0;
          text-align: center;
        }
        .dash-wl-day--today .dash-wl-day-name {
          color: ${WL_BLUE};
        }
        .dash-wl-class-slot {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          background: ${WL_BLUE}12;
          border-radius: 6px;
          padding: 4px 6px;
          width: 100%;
          text-align: center;
        }
        .dash-wl-day-empty {
          flex: 1;
        }

        .dash-wl-certs-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 680px) {
          .dash-wl-certs-row { grid-template-columns: 1fr; }
        }
        .dash-wl-cert-card {
          background: var(--bg-2);
          border-radius: 12px;
          padding: 18px;
        }
      `}</style>
    </div>
  )
}
