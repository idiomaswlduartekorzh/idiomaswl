'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from 'recharts'

interface Props { name: string }

/* ── Data ──────────────────────────────────────────────────────────────────── */
const NAV = [
  {
    group: 'Menú',
    items: [
      { label: 'Inicio',          href: '/dashboard/student', icon: '⊞', active: true  },
      { label: 'Mis exámenes',    href: '/examenes',          icon: '📋', active: false },
      { label: 'Mi progreso',     href: '#',                  icon: '📈', active: false },
      { label: 'Marcadores',      href: '#',                  icon: '🏅', active: false },
    ],
  },
  {
    group: 'Practicar',
    items: [
      { label: 'Inglés',    href: '/examenes/ielts',     icon: '🇬🇧', active: false },
      { label: 'Alemán',    href: '/examenes/goethe',    icon: '🇩🇪', active: false },
      { label: 'Francés',   href: '/examenes/delf-dalf', icon: '🇫🇷', active: false },
      { label: 'Italiano',  href: '/examenes/cils-celi', icon: '🇮🇹', active: false },
      { label: 'Portugués', href: '/examenes/celpe-bras',icon: '🇧🇷', active: false },
    ],
  },
  {
    group: 'Cuenta',
    items: [
      { label: 'Mi perfil',      href: '#', icon: '👤', active: false },
      { label: 'Configuración',  href: '#', icon: '⚙️', active: false },
    ],
  },
]

const IN_PROGRESS = [
  { name: 'IELTS Academic', subtitle: 'Set 3 · Listening', pct: 65, color: '#c8202e',    slug: 'ielts',     mockId: 'set-3' },
  { name: 'Goethe B1',      subtitle: 'Set 1 · Lesen',     pct: 40, color: '#1a2ecc',    slug: 'goethe',    mockId: 'set-1' },
  { name: 'ICFES',          subtitle: 'Mock 5 · Inglés',   pct: 80, color: '#0f7c3e',    slug: 'icfes',     mockId: 'mock-05' },
]

const RECOMMENDED = [
  { name: 'TOEFL iBT',  lang: 'Inglés · Academic', badge: 'ACADEMIC',        color: '#1a6e3c', slug: 'toefl',      mocks: '1 simulacro' },
  { name: 'DELF B1',    lang: 'Francés · B1',      badge: 'OFFICIEL',        color: '#1a2ecc', slug: 'delf-dalf',  mocks: '1 simulacro' },
  { name: 'CILS B1',    lang: 'Italiano · B1',     badge: 'CERTIFICAZIONE',  color: '#b45309', slug: 'cils-celi',  mocks: '1 simulacro' },
  { name: 'CELPE-BRAS', lang: 'Portugués',          badge: 'BRASIL',          color: '#166534', slug: 'celpe-bras', mocks: '1 simulacro' },
]

const RESOURCES = [
  { label: 'Exámenes',       icon: '📚', href: '/examenes' },
  { label: 'Iniciar sesión', icon: '🔑', href: '/login' },
  { label: 'Método WeLearn', icon: '🧠', href: '/home#metodo' },
  { label: 'Comunidad',      icon: '💬', href: '#' },
  { label: 'Certificaciones',icon: '🎓', href: '/home#examenes' },
  { label: 'Pedir ayuda',    icon: '🙋', href: '#' },
]

const RADAR_DATA = [
  { skill: 'Listening', value: 72 },
  { skill: 'Reading',   value: 80 },
  { skill: 'Writing',   value: 58 },
  { skill: 'Speaking',  value: 65 },
  { skill: 'Vocab',     value: 74 },
]

const STATS = [
  { num: '12',   label: 'Simulacros',     icon: '📋' },
  { num: '847',  label: 'Preguntas',      icon: '✏️' },
  { num: '85',   label: 'Mejor score',    icon: '🏆' },
  { num: '18',   label: 'Días activo',    icon: '🔥' },
]

/* ── Component ─────────────────────────────────────────────────────────────── */
export default function StudentDashboardClient({ name }: Props) {
  const [sideOpen, setSideOpen] = useState(false)
  const initial = name[0]?.toUpperCase() ?? 'E'

  return (
    <div className="std-shell">

      {/* ── Sidebar ──────────────────────────────────────────────────────────── */}
      <aside className={`std-sidebar${sideOpen ? ' std-sidebar--open' : ''}`}>
        <div className="std-sidebar__brand">
          <span className="std-sidebar__logo">W</span>
          <span className="std-sidebar__brand-name">WeLearn</span>
        </div>

        <nav className="std-sidebar__nav">
          {NAV.map(({ group, items }) => (
            <div key={group} className="std-nav-group">
              <p className="std-nav-group__label">{group}</p>
              {items.map(item => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`std-nav-item${item.active ? ' std-nav-item--active' : ''}`}
                >
                  <span className="std-nav-item__icon">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="std-sidebar__footer">
          <div className="std-sidebar__user">
            <div className="std-sidebar__avatar">{initial}</div>
            <div className="std-sidebar__user-info">
              <p className="std-sidebar__user-name">{name}</p>
              <p className="std-sidebar__user-role">Estudiante</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main area ────────────────────────────────────────────────────────── */}
      <main className="std-main">

        {/* Mobile topbar */}
        <div className="std-topbar">
          <button className="std-topbar__toggle" onClick={() => setSideOpen(o => !o)} aria-label="Menú">
            <span /><span /><span />
          </button>
          <span className="std-topbar__title">WeLearn</span>
          <div className="std-topbar__avatar">{initial}</div>
        </div>

        <div className="std-content">

          {/* ── Greeting ── */}
          <div className="std-greeting">
            <div>
              <h1 className="std-greeting__h1">Bienvenido/a, {name} 👋</h1>
              <p className="std-greeting__sub">Tienes 3 simulacros en progreso · Continúa donde lo dejaste</p>
            </div>
            <Link href="/examenes" className="btn btn-sm std-greeting__cta">
              + Nuevo examen
            </Link>
          </div>

          {/* ── KPI strip ── */}
          <div className="std-kpi-row">
            {STATS.map(s => (
              <div key={s.label} className="std-kpi-card">
                <span className="std-kpi-card__icon">{s.icon}</span>
                <p className="std-kpi-card__num">{s.num}</p>
                <p className="std-kpi-card__label">{s.label}</p>
              </div>
            ))}
          </div>

          {/* ── Two-column layout ── */}
          <div className="std-body-grid">

            {/* LEFT COLUMN */}
            <div className="std-col-main">

              {/* Continue practicing */}
              <section className="std-section">
                <div className="std-section__head">
                  <h2 className="std-section__title">Continúa practicando</h2>
                  <Link href="/examenes" className="std-section__link">Ver todos →</Link>
                </div>
                <div className="std-progress-list">
                  {IN_PROGRESS.map(ex => (
                    <Link
                      key={ex.name}
                      href={`/examenes/${ex.slug}/practica/${ex.mockId}`}
                      className="std-progress-card"
                    >
                      <div className="std-progress-card__top">
                        <div>
                          <p className="std-progress-card__name">{ex.name}</p>
                          <p className="std-progress-card__sub">{ex.subtitle}</p>
                        </div>
                        <span className="std-progress-card__pct" style={{ color: ex.color }}>
                          {ex.pct}%
                        </span>
                      </div>
                      <div className="std-progress-track">
                        <div
                          className="std-progress-fill"
                          style={{ width: `${ex.pct}%`, background: ex.color }}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Recommended */}
              <section className="std-section">
                <div className="std-section__head">
                  <h2 className="std-section__title">Recomendado para ti</h2>
                </div>
                <div className="std-rec-grid">
                  {RECOMMENDED.map(ex => (
                    <Link key={ex.name} href={`/examenes/${ex.slug}`} className="std-rec-card">
                      <span className="std-rec-card__badge" style={{ color: ex.color, borderColor: ex.color }}>
                        {ex.badge}
                      </span>
                      <p className="std-rec-card__name">{ex.name}</p>
                      <p className="std-rec-card__lang">{ex.lang}</p>
                      <p className="std-rec-card__mocks">{ex.mocks} disponible</p>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Resources */}
              <section className="std-section">
                <div className="std-section__head">
                  <h2 className="std-section__title">Recursos</h2>
                </div>
                <div className="std-resources-grid">
                  {RESOURCES.map(r => (
                    <Link key={r.label} href={r.href} className="std-resource-card">
                      <span className="std-resource-card__icon">{r.icon}</span>
                      <span className="std-resource-card__label">{r.label}</span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="std-col-side">

              {/* Streak */}
              <div className="std-widget std-streak">
                <div className="std-streak__header">
                  <span className="std-streak__fire">🔥</span>
                  <div>
                    <p className="std-streak__num">18 días</p>
                    <p className="std-streak__label">racha activa</p>
                  </div>
                </div>
                <p className="std-streak__hint">¡Practica hoy para no perder tu racha!</p>
                <div className="std-streak__days">
                  {['L','M','M','J','V','S','D'].map((d, i) => (
                    <div key={i} className={`std-streak__day${i < 5 ? ' std-streak__day--done' : ''}`}>
                      <div className="std-streak__day-dot" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rank */}
              <div className="std-widget std-rank">
                <div className="std-rank__header">
                  <span className="std-rank__badge">🏅</span>
                  <div>
                    <p className="std-rank__label">Tu posición</p>
                    <p className="std-rank__num">Rango #42</p>
                  </div>
                </div>
                <div className="std-rank__bar-track">
                  <div className="std-rank__bar-fill" style={{ width: '68%' }} />
                </div>
                <p className="std-rank__hint">+15 pts para subir al Rango #41</p>
              </div>

              {/* Skills radar */}
              <div className="std-widget">
                <p className="std-widget__title">Habilidades</p>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={RADAR_DATA} margin={{ top: 8, right: 20, bottom: 8, left: 20 }}>
                    <PolarGrid stroke="var(--line-soft)" />
                    <PolarAngleAxis
                      dataKey="skill"
                      tick={{ fontSize: 10, fill: 'var(--muted)', fontFamily: 'var(--mono)' }}
                    />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
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
                        fontSize: 12,
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Upgrade CTA */}
              <div className="std-widget std-upgrade">
                <p className="std-upgrade__eyebrow">¿Estudias en WeLearn?</p>
                <p className="std-upgrade__title">Activa tu cuenta institucional</p>
                <p className="std-upgrade__desc">
                  Lecciones diarias, clases en vivo, seguimiento personalizado y más.
                </p>
                <Link href="/activar" className="std-upgrade__btn">
                  Activar acceso completo →
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* ── Styles ──────────────────────────────────────────────────────────── */}
      <style>{`
        /* Shell */
        .std-shell {
          display: flex;
          min-height: 100vh;
          background: var(--bg-2);
        }

        /* ── Sidebar ── */
        .std-sidebar {
          width: 220px;
          min-width: 220px;
          background: var(--bg);
          border-right: 1px solid var(--line-soft);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          z-index: 40;
        }
        .std-sidebar__brand {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 20px 18px 16px;
          border-bottom: 1px solid var(--line-soft);
        }
        .std-sidebar__logo {
          width: 30px;
          height: 30px;
          background: #c8202e;
          border-radius: 8px;
          color: #fff;
          font-weight: 900;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .std-sidebar__brand-name {
          font-weight: 700;
          font-size: 15px;
          color: var(--ink);
          letter-spacing: -0.02em;
        }
        .std-sidebar__nav {
          flex: 1;
          padding: 12px 10px;
          overflow-y: auto;
        }
        .std-nav-group {
          margin-bottom: 20px;
        }
        .std-nav-group__label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
          padding: 0 8px;
          margin: 0 0 6px;
        }
        .std-nav-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 8px 10px;
          border-radius: 8px;
          font-size: 13.5px;
          color: var(--muted);
          font-weight: 500;
          transition: background 0.15s, color 0.15s;
          text-decoration: none;
          margin-bottom: 2px;
        }
        .std-nav-item:hover {
          background: var(--bg-2);
          color: var(--ink);
        }
        .std-nav-item--active {
          background: #fff0f0;
          color: #c8202e;
          font-weight: 600;
        }
        @media (prefers-color-scheme: dark) {
          .std-nav-item--active { background: rgba(200,32,46,0.12); }
        }
        .std-nav-item__icon { font-size: 14px; width: 18px; text-align: center; }
        .std-sidebar__footer {
          padding: 14px 14px 18px;
          border-top: 1px solid var(--line-soft);
        }
        .std-sidebar__user {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .std-sidebar__avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #c8202e;
          color: #fff;
          font-weight: 800;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .std-sidebar__user-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 130px;
        }
        .std-sidebar__user-role {
          font-size: 11px;
          color: var(--muted);
          margin: 0;
        }

        /* ── Main ── */
        .std-main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .std-topbar {
          display: none;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          background: var(--bg);
          border-bottom: 1px solid var(--line-soft);
          position: sticky;
          top: 0;
          z-index: 30;
        }
        .std-topbar__toggle {
          display: flex;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
        }
        .std-topbar__toggle span {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--ink);
          border-radius: 1px;
        }
        .std-topbar__title {
          font-weight: 700;
          font-size: 15px;
          color: var(--ink);
          flex: 1;
        }
        .std-topbar__avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #c8202e;
          color: #fff;
          font-weight: 800;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .std-content {
          padding: 28px 28px 48px;
          max-width: 1100px;
          width: 100%;
        }

        /* ── Greeting ── */
        .std-greeting {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .std-greeting__h1 {
          font-size: 22px;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 4px;
          letter-spacing: -0.02em;
        }
        .std-greeting__sub {
          font-size: 13px;
          color: var(--muted);
          margin: 0;
        }
        .std-greeting__cta {
          white-space: nowrap;
          background: var(--ink);
          color: #fff;
          border-color: var(--ink);
        }

        /* ── KPI strip ── */
        .std-kpi-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .std-kpi-card {
          background: var(--bg);
          border: 1px solid var(--line-soft);
          border-radius: 12px;
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .std-kpi-card__icon { font-size: 18px; margin-bottom: 4px; }
        .std-kpi-card__num {
          font-size: 24px;
          font-weight: 800;
          color: var(--ink);
          letter-spacing: -0.04em;
          margin: 0;
          line-height: 1;
        }
        .std-kpi-card__label {
          font-size: 11px;
          color: var(--muted);
          margin: 0;
          font-family: var(--mono);
        }

        /* ── Body grid ── */
        .std-body-grid {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 20px;
          align-items: start;
        }

        /* ── Sections ── */
        .std-section { margin-bottom: 24px; }
        .std-section__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .std-section__title {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .std-section__link {
          font-size: 12px;
          color: var(--muted);
          font-weight: 500;
        }

        /* ── Progress cards ── */
        .std-progress-list { display: flex; flex-direction: column; gap: 10px; }
        .std-progress-card {
          background: var(--bg);
          border: 1px solid var(--line-soft);
          border-radius: 12px;
          padding: 16px 18px;
          text-decoration: none;
          display: block;
          transition: box-shadow 0.15s, border-color 0.15s;
        }
        .std-progress-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          border-color: #c8202e;
        }
        .std-progress-card__top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .std-progress-card__name {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 2px;
        }
        .std-progress-card__sub {
          font-size: 11px;
          color: var(--muted);
          margin: 0;
          font-family: var(--mono);
        }
        .std-progress-card__pct {
          font-size: 13px;
          font-weight: 700;
          font-family: var(--mono);
        }
        .std-progress-track {
          height: 5px;
          background: var(--line-soft);
          border-radius: 3px;
          overflow: hidden;
        }
        .std-progress-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.8s ease;
        }

        /* ── Recommended grid ── */
        .std-rec-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .std-rec-card {
          background: var(--bg);
          border: 1px solid var(--line-soft);
          border-radius: 12px;
          padding: 16px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: box-shadow 0.15s, border-color 0.15s;
        }
        .std-rec-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          border-color: rgba(200,32,46,0.3);
        }
        .std-rec-card__badge {
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          border: 1px solid;
          padding: 2px 6px;
          border-radius: 4px;
          width: fit-content;
          margin-bottom: 6px;
        }
        .std-rec-card__name {
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
          letter-spacing: -0.02em;
        }
        .std-rec-card__lang {
          font-size: 11px;
          color: var(--muted);
          margin: 0;
        }
        .std-rec-card__mocks {
          font-size: 11px;
          color: var(--muted);
          margin: 4px 0 0;
          font-family: var(--mono);
        }

        /* ── Resources ── */
        .std-resources-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .std-resource-card {
          background: var(--bg);
          border: 1px solid var(--line-soft);
          border-radius: 10px;
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: background 0.15s, box-shadow 0.15s;
        }
        .std-resource-card:hover {
          background: var(--bg-2);
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .std-resource-card__icon { font-size: 20px; }
        .std-resource-card__label {
          font-size: 11px;
          font-weight: 600;
          color: var(--muted);
          text-align: center;
        }

        /* ── Widgets (right column) ── */
        .std-col-side { display: flex; flex-direction: column; gap: 14px; }
        .std-widget {
          background: var(--bg);
          border: 1px solid var(--line-soft);
          border-radius: 14px;
          padding: 18px;
        }
        .std-widget__title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--muted);
          margin: 0 0 12px;
        }

        /* Streak widget */
        .std-streak__header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .std-streak__fire { font-size: 28px; }
        .std-streak__num {
          font-size: 20px;
          font-weight: 800;
          color: var(--ink);
          margin: 0;
          letter-spacing: -0.03em;
        }
        .std-streak__label {
          font-size: 11px;
          color: var(--muted);
          margin: 0;
        }
        .std-streak__hint {
          font-size: 12px;
          color: var(--muted);
          margin: 0 0 14px;
          line-height: 1.4;
        }
        .std-streak__days {
          display: flex;
          justify-content: space-between;
        }
        .std-streak__day {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          color: var(--muted);
          font-family: var(--mono);
          font-weight: 600;
        }
        .std-streak__day-dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--line-soft);
        }
        .std-streak__day--done .std-streak__day-dot {
          background: #f97316;
        }
        .std-streak__day--done {
          color: #f97316;
        }

        /* Rank widget */
        .std-rank__header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .std-rank__badge { font-size: 24px; }
        .std-rank__label {
          font-size: 11px;
          color: var(--muted);
          margin: 0;
        }
        .std-rank__num {
          font-size: 16px;
          font-weight: 800;
          color: var(--ink);
          margin: 0;
          letter-spacing: -0.02em;
        }
        .std-rank__bar-track {
          height: 6px;
          background: var(--line-soft);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .std-rank__bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #1a2ecc, #c8202e);
          border-radius: 3px;
        }
        .std-rank__hint {
          font-size: 11px;
          color: var(--muted);
          margin: 0;
        }

        /* Upgrade widget */
        .std-upgrade {
          background: linear-gradient(135deg, #14215c 0%, #1a2ecc 100%);
          border: none;
          color: #fff;
        }
        .std-upgrade__eyebrow {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.6);
          margin: 0 0 6px;
        }
        .std-upgrade__title {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 8px;
          letter-spacing: -0.01em;
        }
        .std-upgrade__desc {
          font-size: 12px;
          color: rgba(255,255,255,0.72);
          margin: 0 0 16px;
          line-height: 1.5;
        }
        .std-upgrade__btn {
          display: inline-block;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.3);
          color: #fff;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.15s;
        }
        .std-upgrade__btn:hover { background: rgba(255,255,255,0.25); }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .std-body-grid { grid-template-columns: 1fr; }
          .std-col-side {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .std-sidebar { display: none; }
          .std-sidebar--open {
            display: flex;
            position: fixed;
            top: 0; left: 0;
            height: 100vh;
            box-shadow: 4px 0 24px rgba(0,0,0,0.12);
          }
          .std-topbar { display: flex; }
          .std-content { padding: 16px 16px 40px; }
          .std-kpi-row { grid-template-columns: repeat(2, 1fr); }
          .std-rec-grid { grid-template-columns: 1fr; }
          .std-col-side { grid-template-columns: 1fr; }
          .std-resources-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .std-kpi-row { grid-template-columns: repeat(2, 1fr); }
          .std-resources-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </div>
  )
}
