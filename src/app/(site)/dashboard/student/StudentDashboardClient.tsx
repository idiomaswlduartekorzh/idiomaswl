'use client'

import Link from 'next/link'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Props {
  name: string
}

// ---------------------------------------------------------------------------
// Placeholder data
// ---------------------------------------------------------------------------
const STATS = [
  { label: 'Exámenes practicados', value: '12', icon: '📋' },
  { label: 'Preguntas respondidas', value: '847', icon: '✏️' },
  { label: 'Mejor puntaje', value: '85 pts', icon: '🏆' },
  { label: 'Días activo', value: '18', icon: '📅' },
]

const RECENT_EXAMS = [
  { name: 'IELTS Set 1', score: 72, max: 100, date: '10 may', color: '#c8202e' },
  { name: 'ICFES Mock 3', score: 85, max: 100, date: '6 may', color: '#14215c' },
  { name: 'TOEFL Set 1', score: 68, max: 120, date: '2 may', color: '#1a6e3c' },
]

const RADAR_DATA = [
  { skill: 'Listening', value: 72 },
  { skill: 'Reading', value: 80 },
  { skill: 'Writing', value: 58 },
  { skill: 'Speaking', value: 65 },
  { skill: 'Vocabulary', value: 74 },
]

const AVAILABLE_EXAMS = [
  {
    slug: 'ielts',
    name: 'IELTS',
    flag: '🇬🇧',
    desc: 'International English Language Testing System',
    color: '#c8202e',
    href: '/examenes/ielts',
  },
  {
    slug: 'icfes',
    name: 'ICFES',
    flag: '🇨🇴',
    desc: 'Examen de Estado de Colombia',
    color: '#14215c',
    href: '/examenes/icfes',
  },
  {
    slug: 'toefl',
    name: 'TOEFL',
    flag: '🇺🇸',
    desc: 'Test of English as a Foreign Language',
    color: '#1a6e3c',
    href: '/examenes/toefl',
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function StudentDashboardClient({ name }: Props) {
  return (
    <div className="dash-student">
      <div className="wrap" style={{ paddingTop: 40, paddingBottom: 64 }}>

        {/* ── Header ── */}
        <div className="dash-header" style={{ marginBottom: 36 }}>
          <div>
            <h1
              className="serif"
              style={{ fontSize: 30, margin: 0, color: 'var(--ink)' }}
            >
              Bienvenido/a, {name}
            </h1>
            <p
              className="eyebrow"
              style={{ marginTop: 6, marginBottom: 0 }}
            >
              Estudiante · Plataforma
            </p>
          </div>
          <Link href="/examenes" className="btn btn-primary btn-sm">
            Explorar exámenes
          </Link>
        </div>

        {/* ── Quick stats ── */}
        <div className="dash-stats-row" style={{ marginBottom: 36 }}>
          {STATS.map((s) => (
            <div key={s.label} className="dash-stat-card">
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <p className="dash-stat-value">{s.value}</p>
              <p className="dash-stat-label">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Two-column grid ── */}
        <div className="dash-grid-2" style={{ marginBottom: 36 }}>

          {/* Exámenes recientes */}
          <div className="dash-card">
            <h2 className="dash-card-title">Exámenes recientes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {RECENT_EXAMS.map((exam) => (
                <div key={exam.name} className="dash-exam-row">
                  <span
                    className="dash-exam-dot"
                    style={{ background: exam.color }}
                  />
                  <div style={{ flex: 1 }}>
                    <p className="dash-exam-name">{exam.name}</p>
                    <p className="dash-exam-date">{exam.date}</p>
                  </div>
                  <div className="dash-exam-score-wrap">
                    <div
                      className="dash-exam-score-bar-track"
                    >
                      <div
                        className="dash-exam-score-bar-fill"
                        style={{
                          width: `${(exam.score / exam.max) * 100}%`,
                          background: exam.color,
                        }}
                      />
                    </div>
                    <span
                      className="dash-exam-score-num"
                      style={{ color: exam.color }}
                    >
                      {exam.score} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progreso por habilidad */}
          <div className="dash-card">
            <h2 className="dash-card-title">Progreso por habilidad</h2>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={RADAR_DATA} margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
                <PolarGrid stroke="var(--line-soft)" />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{ fontSize: 11, fill: 'var(--muted)', fontFamily: 'var(--mono)' }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fontSize: 9, fill: 'var(--muted)' }}
                />
                <Radar
                  name="Habilidad"
                  dataKey="value"
                  stroke="#c8202e"
                  fill="#c8202e"
                  fillOpacity={0.18}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg)',
                    border: '1px solid var(--line-soft)',
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Exámenes disponibles ── */}
        <div className="dash-card" style={{ marginBottom: 36 }}>
          <h2 className="dash-card-title">Exámenes disponibles</h2>
          <div className="dash-exams-grid">
            {AVAILABLE_EXAMS.map((exam) => (
              <div
                key={exam.slug}
                className="dash-exam-card"
                style={{ borderTop: `3px solid ${exam.color}` }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <span style={{ fontSize: 24 }}>{exam.flag}</span>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 18,
                      color: exam.color,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {exam.name}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--muted)',
                    marginBottom: 16,
                    lineHeight: 1.4,
                  }}
                >
                  {exam.desc}
                </p>
                <Link
                  href={exam.href}
                  className="btn btn-sm"
                  style={{
                    background: exam.color,
                    borderColor: exam.color,
                    color: '#fff',
                  }}
                >
                  Practicar
                  <span className="arrow">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ── Upgrade banner ── */}
        <div className="dash-upgrade-banner">
          <div>
            <p className="dash-upgrade-title">
              ¿Estudias en WeLearn? Activa tu cuenta institucional para acceso completo.
            </p>
            <p className="dash-upgrade-sub">
              Accede a lecciones, seguimiento de progreso, clases en vivo y más.
            </p>
          </div>
          <Link href="/activar" className="btn btn-sm" style={{ whiteSpace: 'nowrap' }}>
            Activar cuenta
            <span className="arrow">→</span>
          </Link>
        </div>

      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        .dash-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .dash-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 768px) {
          .dash-stats-row { grid-template-columns: repeat(2, 1fr); }
        }

        .dash-stat-card {
          background: var(--bg);
          border: 1px solid var(--line-soft);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .dash-stat-value {
          font-size: 26px;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
          letter-spacing: -0.03em;
        }
        .dash-stat-label {
          font-size: 12px;
          color: var(--muted);
          margin: 0;
          font-family: var(--mono);
        }

        .dash-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 860px) {
          .dash-grid-2 { grid-template-columns: 1fr; }
        }

        .dash-card {
          background: var(--bg);
          border: 1px solid var(--line-soft);
          border-radius: 14px;
          padding: 24px;
        }
        .dash-card-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 18px;
          letter-spacing: -0.01em;
        }

        .dash-exam-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid var(--line-soft);
        }
        .dash-exam-row:last-child { border-bottom: none; }
        .dash-exam-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dash-exam-name {
          font-size: 14px;
          font-weight: 500;
          color: var(--ink);
          margin: 0;
        }
        .dash-exam-date {
          font-size: 11px;
          color: var(--muted);
          margin: 0;
          font-family: var(--mono);
        }
        .dash-exam-score-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          min-width: 90px;
        }
        .dash-exam-score-bar-track {
          width: 80px;
          height: 4px;
          background: var(--line-soft);
          border-radius: 2px;
          overflow: hidden;
        }
        .dash-exam-score-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.6s ease;
        }
        .dash-exam-score-num {
          font-size: 12px;
          font-weight: 600;
          font-family: var(--mono);
        }

        .dash-exams-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 720px) {
          .dash-exams-grid { grid-template-columns: 1fr; }
        }
        .dash-exam-card {
          background: var(--bg-2);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .dash-upgrade-banner {
          background: linear-gradient(135deg, #14215c 0%, #1a2ecc 100%);
          border-radius: 14px;
          padding: 28px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
          color: #fff;
        }
        .dash-upgrade-title {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 4px;
          letter-spacing: -0.01em;
        }
        .dash-upgrade-sub {
          font-size: 13px;
          margin: 0;
          opacity: 0.75;
        }
      `}</style>
    </div>
  )
}
