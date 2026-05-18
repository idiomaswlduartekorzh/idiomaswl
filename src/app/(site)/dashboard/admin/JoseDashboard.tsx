'use client'

import { useState } from 'react'
import {
  LayoutDashboard, Users, FileText, DollarSign, Settings,
  Bell, MessageCircle, Globe, ArrowUpRight, Download,
  Calendar, ChevronDown, BookOpen, GraduationCap,
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { motion } from 'framer-motion'

// ─── Palette ─────────────────────────────────────────────────────────────────
const A  = '#c87941'   // accent orange
const A2 = '#d4904f'
const A3 = '#e8b080'
const BG   = '#f5f0eb'
const CARD = '#ffffff'
const TEXT = '#1a1a2e'
const MUTED  = '#9ca3af'
const BORDER = '#e8ddd4'
const GRID   = '#f0ebe4'

// ─── Data ────────────────────────────────────────────────────────────────────
const reportsData = [
  { day: 'Lun', ingresos: 320, gastos: 160 },
  { day: 'Mar', ingresos: 290, gastos: 200 },
  { day: 'Mié', ingresos: 460, gastos: 170 },
  { day: 'Jue', ingresos: 390, gastos: 220 },
  { day: 'Vie', ingresos: 530, gastos: 185 },
  { day: 'Sáb', ingresos: 620, gastos: 250 },
  { day: 'Dom', ingresos: 490, gastos: 210 },
]

const occupationData = [
  { day: 'Dom', pct: 28 },
  { day: 'Lun', pct: 62 },
  { day: 'Mar', pct: 48 },
  { day: 'Mié', pct: 83 },
  { day: 'Jue', pct: 56 },
  { day: 'Vie', pct: 42 },
  { day: 'Sáb', pct: 33 },
]

const weeklyData = [
  { day: 'Dom', a: 320, b: 460 },
  { day: 'Lun', a: 510, b: 390 },
  { day: 'Mar', a: 430, b: 530 },
  { day: 'Mié', a: 690, b: 500 },
  { day: 'Jue', a: 550, b: 620 },
  { day: 'Vie', a: 730, b: 590 },
  { day: 'Sáb', a: 660, b: 710 },
]

const EXAM_BARS = [
  { label: 'IELTS',  val: '38', color: A,  flex: 3 },
  { label: 'TOEFL',  val: '28', color: A2, flex: 2 },
  { label: 'ICFES',  val: '23', color: A3, flex: 1.5 },
]

// ─── Hexagonal bubble chart ───────────────────────────────────────────────────
const HEX_ROWS: (number | null)[][] = [
  [null, 0.9, 0.85, 0.8, 0.7, null],
  [0.95, 0.88, 0.82, 0.75, 0.65, 0.5],
  [null, 0.85, 0.78, 0.65, 0.55, null],
  [0.7,  0.72, 0.65, 0.5,  0.4,  0.35],
  [null, 0.6,  0.55, 0.45, 0.35, null],
  [0.4,  0.38, 0.3,  0.25, 0.2,  0.15],
]

function HexBubbles() {
  const r = 13, colW = r * 2 + 5, rowH = r * 1.78
  return (
    <svg width="100%" viewBox="0 0 218 140" style={{ display: 'block' }}>
      {HEX_ROWS.map((row, ri) =>
        row.map((val, ci) => {
          if (val === null) return null
          const x = ci * colW + (ri % 2 === 1 ? colW / 2 : 0) + r + 2
          const y = ri * rowH + r + 2
          return <circle key={`${ri}-${ci}`} cx={x} cy={y} r={r} fill={`rgba(200,121,65,${val})`} />
        })
      )}
    </svg>
  )
}

// ─── Shared components ────────────────────────────────────────────────────────
function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: CARD, borderRadius: 16, padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', ...style }}>
      {children}
    </div>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <p style={{ margin: '0 0 3px', fontSize: 11, color: MUTED, fontWeight: 500 }}>{label}</p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: TEXT, letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</span>
        <span style={{ fontSize: 11, color: MUTED, whiteSpace: 'nowrap' }}>{sub}</span>
      </div>
    </div>
  )
}

function IconBtn({ icon: Icon, active }: { icon: React.ElementType; active?: boolean }) {
  return (
    <button style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: active ? A : 'transparent', color: active ? '#fff' : MUTED, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
      <Icon size={17} />
    </button>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function JoseDashboard() {
  const [_tab, setTab] = useState('overview')

  const now = new Date()
  const dateStr = now.toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  return (
    <div style={{ display: 'flex', height: '100vh', background: BG, fontFamily: "system-ui,-apple-system,'Segoe UI',sans-serif", overflow: 'hidden', color: TEXT }}>

      {/* ── LEFT SIDEBAR — icon only ── */}
      <aside style={{ width: 62, background: CARD, borderRight: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 18, gap: 6, flexShrink: 0 }}>
        {/* Logo mark */}
        <div style={{ width: 36, height: 36, background: A, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
          <GraduationCap size={18} color="#fff" />
        </div>
        {[
          { Icon: LayoutDashboard, active: true },
          { Icon: Users },
          { Icon: BookOpen },
          { Icon: MessageCircle },
          { Icon: FileText },
          { Icon: DollarSign },
          { Icon: Settings },
          { Icon: Globe },
        ].map(({ Icon, active }, i) => (
          <IconBtn key={i} icon={Icon} active={active} />
        ))}
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* TOP BAR */}
        <header style={{ background: CARD, borderBottom: `1px solid ${BORDER}`, padding: '0 20px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexShrink: 0 }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 16, flexShrink: 0 }}>
            <span style={{ fontWeight: 800, fontSize: 15, color: TEXT, letterSpacing: '-0.3px' }}>
              <span style={{ color: A }}>Idiomas</span> WeLearn
            </span>
          </div>

          {/* Nav pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1, overflow: 'hidden' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 20, border: 'none', background: TEXT, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
              <LayoutDashboard size={13} /> Dashboard
            </button>
            {[Users, BookOpen, FileText, MessageCircle, DollarSign, Settings, Bell].map((Icon, i) => (
              <button key={i} style={{ width: 32, height: 32, borderRadius: 9, border: 'none', background: 'transparent', color: MUTED, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <Icon size={15} />
              </button>
            ))}
          </div>

          {/* Date + avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: MUTED }}>
              <Calendar size={12} />
              <span style={{ whiteSpace: 'nowrap' }}>{dateStr}</span>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: A, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
              JD
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Title + filters */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: TEXT, letterSpacing: '-0.03em' }}>Overview</h1>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { icon: Globe, label: 'Filtrar región' },
                { icon: Calendar, label: 'Filtrar fecha' },
              ].map(({ icon: Icon, label }) => (
                <button key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 13px', borderRadius: 20, border: `1px solid ${BORDER}`, background: CARD, fontSize: 11, color: TEXT, cursor: 'pointer', fontWeight: 500, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <Icon size={12} /> {label} <ChevronDown size={11} />
                </button>
              ))}
            </div>
          </div>

          {/* KPI strip */}
          <Card style={{ padding: '16px 24px' }}>
            <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
              <Stat label="Ingresos / día" value="$1,240" sub="8 cobros" />
              <div style={{ width: 1, background: BORDER, margin: '0 20px' }} />
              <Stat label="Simulacros" value="32" sub="★ 4.9" />
              <div style={{ width: 1, background: BORDER, margin: '0 20px' }} />
              <Stat label="Lecciones activas" value="89" sub="24 en curso" />
              <div style={{ width: 1, background: BORDER, margin: '0 20px' }} />
              <Stat label="Conexiones" value="43" sub="15 activos" />
            </div>
          </Card>

          {/* Row 2: Reports + Exam Status */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>

            {/* Reports */}
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <h3 style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 700 }}>Reportes</h3>
                  <div style={{ display: 'flex', gap: 20 }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 10, color: MUTED }}>Ingresos</p>
                      <p style={{ margin: 0, fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>$48,620</p>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: 10, color: MUTED }}>Egresos</p>
                      <p style={{ margin: 0, fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>$6,820</p>
                    </div>
                  </div>
                </div>
                <button style={{ padding: '5px 12px', borderRadius: 20, border: `1px solid ${BORDER}`, background: 'transparent', fontSize: 11, color: MUTED, cursor: 'pointer' }}>
                  Semanal <ChevronDown size={10} style={{ display: 'inline' }} />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={155}>
                <AreaChart data={reportsData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradIng" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={A} stopOpacity={0.18} />
                      <stop offset="95%" stopColor={A} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: TEXT, border: 'none', borderRadius: 8, color: '#fff', fontSize: 11, padding: '8px 12px' }}
                    labelStyle={{ color: '#ccc', marginBottom: 4 }}
                  />
                  <Area type="monotone" dataKey="ingresos" stroke={A} strokeWidth={2} fill="url(#gradIng)" dot={false} />
                  <Area type="monotone" dataKey="gastos" stroke={MUTED} strokeWidth={1.5} fill="transparent" strokeDasharray="4 2" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Exam status */}
            <Card style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>Estado exámenes</h3>
                <button style={{ width: 26, height: 26, borderRadius: 7, border: `1px solid ${BORDER}`, background: 'transparent', color: MUTED, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ArrowUpRight size={13} />
                </button>
              </div>
              <p style={{ margin: '0 0 10px', fontSize: 11, color: MUTED }}>
                Nuevos estudiantes: <strong style={{ color: TEXT, fontWeight: 700 }}>45</strong>
              </p>
              {/* Color bars */}
              <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>
                {EXAM_BARS.map(b => (
                  <div key={b.label} style={{ flex: b.flex, height: 58, background: b.color, borderRadius: 10 }} />
                ))}
              </div>
              {/* Legend */}
              <div style={{ display: 'flex', gap: 0 }}>
                {EXAM_BARS.map(b => (
                  <div key={b.label} style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: b.color }} />
                      <span style={{ fontSize: 10, color: MUTED }}>{b.label}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: TEXT }}>{b.val}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Row 3: Students + Occupation + Weekly */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>

            {/* Students hex */}
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>Estudiantes</h3>
                <button style={{ width: 26, height: 26, borderRadius: 7, border: `1px solid ${BORDER}`, background: 'transparent', color: MUTED, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ArrowUpRight size={13} />
                </button>
              </div>
              <HexBubbles />
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[
                  { city: 'Bogotá',   val: '6,100', color: A  },
                  { city: 'Medellín', val: '1,600', color: A2 },
                  { city: 'Cali',     val: '400',   color: A3 },
                ].map(({ city, val, color }) => (
                  <div key={city} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                      <span style={{ fontSize: 11, color: MUTED }}>{city}</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: TEXT }}>{val}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Occupation */}
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>Ocupación</h3>
                <button style={{ width: 26, height: 26, borderRadius: 7, border: `1px solid ${BORDER}`, background: 'transparent', color: MUTED, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={13} />
                </button>
              </div>
              <p style={{ margin: '0 0 2px', fontSize: 10, color: MUTED }}>Promedio</p>
              <p style={{ margin: '0 0 10px', fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em' }}>45%</p>
              <ResponsiveContainer width="100%" height={115}>
                <BarChart data={occupationData} margin={{ top: 0, right: 0, left: -28, bottom: 0 }} barSize={20}>
                  <XAxis dataKey="day" tick={{ fontSize: 9, fill: MUTED }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: TEXT, border: 'none', borderRadius: 8, color: '#fff', fontSize: 11 }}
                    cursor={false}
                  />
                  <Bar dataKey="pct" radius={[5,5,0,0]}>
                    {occupationData.map((entry, i) => (
                      <Cell key={i} fill={entry.pct >= 75 ? A : '#ede8e2'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Weekly summary */}
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>Resumen semanal</h3>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button style={{ width: 26, height: 26, borderRadius: 7, border: `1px solid ${BORDER}`, background: 'transparent', color: MUTED, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar size={13} />
                  </button>
                  <button style={{ width: 26, height: 26, borderRadius: 7, border: `1px solid ${BORDER}`, background: 'transparent', color: MUTED, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Download size={13} />
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2 }}>
                <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em' }}>$3,397</span>
                <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 700 }}>▲ +4.2%</span>
              </div>
              <p style={{ margin: '0 0 8px', fontSize: 10, color: MUTED }}>Abr 28 – May 4</p>
              <ResponsiveContainer width="100%" height={105}>
                <LineChart data={weeklyData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                  <XAxis dataKey="day" tick={{ fontSize: 9, fill: MUTED }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: TEXT, border: 'none', borderRadius: 8, color: '#fff', fontSize: 11 }}
                  />
                  <Line type="monotone" dataKey="a" stroke={A} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="b" stroke="#d4c472" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

          </div>
        </main>
      </div>
    </div>
  )
}
