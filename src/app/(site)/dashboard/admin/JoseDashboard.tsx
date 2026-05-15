'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  Settings,
  TrendingUp,
  TrendingDown,
  Search,
  Activity,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { motion } from 'framer-motion'

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  navy: '#0f172a',
  navyLight: '#1e293b',
  navyMid: '#334155',
  red: '#c8202e',
  redHover: '#a31a24',
  text: '#f1f5f9',
  muted: '#94a3b8',
  border: '#1e293b',
  cardBg: '#1e293b',
  success: '#22c55e',
  warning: '#f59e0b',
}

// ─── Placeholder data ────────────────────────────────────────────────────────
const generateActivityData = () => {
  const days = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15',
                 '16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']
  const weekendDays = new Set([6,7,13,14,20,21,27,28])
  return days.map((d, i) => ({
    day: d,
    usuarios: weekendDays.has(i + 1)
      ? Math.floor(Math.random() * 11) + 15
      : Math.floor(Math.random() * 21) + 40,
  }))
}

const activityData = generateActivityData()

const examDistribution = [
  { name: 'IELTS', value: 38 },
  { name: 'ICFES', value: 28 },
  { name: 'TOEFL', value: 18 },
  { name: 'Goethe', value: 9 },
  { name: 'DELF', value: 7 },
]

const PIE_COLORS = ['#c8202e', '#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b']

const recentStudents = [
  { nombre: 'María García', email: 'maria.g@email.com', rol: 'Estudiante', examen: 'IELTS', acceso: 'Hace 2h', estado: 'Activo' },
  { nombre: 'Carlos Ramírez', email: 'carlos.r@email.com', rol: 'Estudiante', examen: 'ICFES', acceso: 'Hace 3h', estado: 'Activo' },
  { nombre: 'Ana Martínez', email: 'ana.m@email.com', rol: 'Estudiante', examen: 'TOEFL', acceso: 'Hace 5h', estado: 'Activo' },
  { nombre: 'Luis Herrera', email: 'luis.h@email.com', rol: 'Estudiante', examen: 'Goethe', acceso: 'Ayer', estado: 'Inactivo' },
  { nombre: 'Sofía López', email: 'sofia.l@email.com', rol: 'Estudiante', examen: 'IELTS', acceso: 'Ayer', estado: 'Activo' },
  { nombre: 'Diego Torres', email: 'diego.t@email.com', rol: 'Estudiante', examen: 'DELF', acceso: 'Hace 2 días', estado: 'Inactivo' },
]

const realtimeFeed = [
  { msg: 'María G. completó IELTS Set 2', time: 'hace 3 min', color: C.success },
  { msg: 'Carlos R. se registró en la plataforma', time: 'hace 7 min', color: C.red },
  { msg: 'Ana M. inició simulacro TOEFL', time: 'hace 12 min', color: C.warning },
  { msg: 'Luis H. completó lección Goethe B1', time: 'hace 18 min', color: C.success },
  { msg: 'Sofía L. obtuvo 8.5 en IELTS Mock', time: 'hace 25 min', color: '#3b82f6' },
  { msg: 'Diego T. reinició sesión', time: 'hace 31 min', color: C.muted },
  { msg: 'Valentina R. completó ICFES Set 3', time: 'hace 40 min', color: C.success },
  { msg: 'Pedro S. se registró en la plataforma', time: 'hace 52 min', color: C.red },
]

// ─── Nav items ───────────────────────────────────────────────────────────────
type NavTab = 'overview' | 'estudiantes' | 'examenes' | 'ingresos' | 'configuracion'

const navItems: { id: NavTab; label: string; Icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', Icon: LayoutDashboard },
  { id: 'estudiantes', label: 'Estudiantes', Icon: Users },
  { id: 'examenes', label: 'Exámenes', Icon: FileText },
  { id: 'ingresos', label: 'Ingresos', Icon: DollarSign },
  { id: 'configuracion', label: 'Configuración', Icon: Settings },
]

// ─── Sub-components ──────────────────────────────────────────────────────────
function KpiCard({
  icon: Icon,
  label,
  value,
  trend,
  trendLabel,
  positive = true,
}: {
  icon: React.ElementType
  label: string
  value: string
  trend?: string
  trendLabel?: string
  positive?: boolean
}) {
  return (
    <motion.div
      className="dash-jose-kpi-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        background: C.cardBg,
        borderRadius: 12,
        padding: '20px 24px',
        flex: 1,
        minWidth: 0,
        border: `1px solid ${C.navyMid}`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: 6, fontWeight: 500 }}>{label}</p>
          <p style={{ color: C.text, fontSize: 32, fontWeight: 700, lineHeight: 1 }}>{value}</p>
          {trend && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
              {positive ? (
                <TrendingUp size={14} color={C.success} />
              ) : (
                <TrendingDown size={14} color={C.red} />
              )}
              <span style={{ color: positive ? C.success : C.red, fontSize: 12, fontWeight: 600 }}>
                {trend}
              </span>
              {trendLabel && (
                <span style={{ color: C.muted, fontSize: 12 }}>{trendLabel}</span>
              )}
            </div>
          )}
        </div>
        <div
          style={{
            background: `${C.red}22`,
            borderRadius: 10,
            padding: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={22} color={C.red} />
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function JoseDashboard() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview')
  const [search, setSearch] = useState('')

  const filtered = recentStudents.filter(
    (s) =>
      s.nombre.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div
      className="dash-jose-root"
      style={{ display: 'flex', height: '100vh', background: C.navy, color: C.text, fontFamily: 'system-ui, sans-serif', overflow: 'hidden' }}
    >
      {/* ── Sidebar ── */}
      <aside
        className="dash-jose-sidebar"
        style={{
          width: 220,
          minWidth: 220,
          background: C.navyLight,
          display: 'flex',
          flexDirection: 'column',
          borderRight: `1px solid ${C.navyMid}`,
          padding: '0',
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div style={{ padding: '28px 24px 20px', borderBottom: `1px solid ${C.navyMid}` }}>
          <span style={{ color: C.red, fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px' }}>
            Idiomas
          </span>
          <span style={{ color: C.text, fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px' }}>
            {' '}WeLearn
          </span>
          <p style={{ color: C.muted, fontSize: 11, marginTop: 2, fontWeight: 500 }}>Panel de Director</p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {navItems.map(({ id, label, Icon }) => {
            const active = activeTab === id
            return (
              <button
                key={id}
                className="dash-jose-nav-btn"
                onClick={() => setActiveTab(id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: 'none',
                  background: active ? `${C.red}22` : 'transparent',
                  color: active ? C.red : C.muted,
                  fontWeight: active ? 600 : 400,
                  fontSize: 14,
                  cursor: 'pointer',
                  marginBottom: 4,
                  textAlign: 'left',
                  transition: 'background 0.15s, color 0.15s',
                }}
              >
                <Icon size={18} />
                {label}
              </button>
            )
          })}
        </nav>

        {/* User info */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: `1px solid ${C.navyMid}`,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: C.red,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            JD
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: 0 }}>Jose David</p>
            <p style={{ fontSize: 11, color: C.muted, margin: 0 }}>Director</p>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main
        className="dash-jose-main"
        style={{ flex: 1, overflowY: 'auto', padding: '28px 28px 40px', display: 'flex', gap: 24 }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Page header */}
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: C.text }}>
              {navItems.find((n) => n.id === activeTab)?.label}
            </h1>
            <p style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>
              Bienvenido, Jose David — Panel de operaciones en tiempo real
            </p>
          </div>

          {activeTab === 'overview' && (
            <>
              {/* KPI row */}
              <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                <KpiCard icon={Users} label="Total estudiantes" value="147" trend="+12" trendLabel="este mes" positive />
                <KpiCard icon={Activity} label="Sesiones hoy" value="38" trend="+5" trendLabel="vs ayer" positive />
                <KpiCard icon={FileText} label="Simulacros completados" value="1,204" trend="+87" trendLabel="este mes" positive />
                <KpiCard icon={TrendingUp} label="Tasa de retención" value="87%" trend="+2%" trendLabel="vs mes anterior" positive />
              </div>

              {/* Charts row */}
              <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
                {/* Area chart */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{
                    flex: 2,
                    background: C.cardBg,
                    borderRadius: 12,
                    padding: 20,
                    border: `1px solid ${C.navyMid}`,
                  }}
                >
                  <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, color: C.text }}>
                    Usuarios activos — últimos 30 días
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={activityData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                      <defs>
                        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={C.red} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={C.red} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.navyMid} />
                      <XAxis dataKey="day" stroke={C.muted} tick={{ fontSize: 11 }} />
                      <YAxis stroke={C.muted} tick={{ fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{ background: C.navy, border: `1px solid ${C.navyMid}`, borderRadius: 8, color: C.text }}
                        labelStyle={{ color: C.muted }}
                      />
                      <Area type="monotone" dataKey="usuarios" stroke={C.red} strokeWidth={2} fill="url(#areaGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Pie chart */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  style={{
                    flex: 1,
                    background: C.cardBg,
                    borderRadius: 12,
                    padding: 20,
                    border: `1px solid ${C.navyMid}`,
                  }}
                >
                  <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, color: C.text }}>
                    Distribución de exámenes
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={examDistribution}
                        cx="50%"
                        cy="45%"
                        outerRadius={70}
                        dataKey="value"
                        label={({ name, value }) => `${name} ${value}%`}
                        labelLine={false}
                        fontSize={11}
                      >
                        {examDistribution.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend
                        formatter={(value) => (
                          <span style={{ color: C.muted, fontSize: 12 }}>{value}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>

              {/* Students table */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  background: C.cardBg,
                  borderRadius: 12,
                  padding: 20,
                  border: `1px solid ${C.navyMid}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: C.text }}>
                    Estudiantes recientes
                  </h3>
                  <div style={{ position: 'relative' }}>
                    <Search size={14} color={C.muted} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar..."
                      style={{
                        background: C.navy,
                        border: `1px solid ${C.navyMid}`,
                        borderRadius: 8,
                        color: C.text,
                        fontSize: 13,
                        padding: '7px 12px 7px 30px',
                        outline: 'none',
                        width: 200,
                      }}
                    />
                  </div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr>
                      {['Nombre', 'Email', 'Rol', 'Examen activo', 'Último acceso', 'Estado'].map((h) => (
                        <th
                          key={h}
                          style={{
                            textAlign: 'left',
                            color: C.muted,
                            fontWeight: 500,
                            padding: '8px 12px',
                            borderBottom: `1px solid ${C.navyMid}`,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((s, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.navyMid}` }}>
                        <td style={{ padding: '10px 12px', fontWeight: 600, color: C.text }}>{s.nombre}</td>
                        <td style={{ padding: '10px 12px', color: C.muted }}>{s.email}</td>
                        <td style={{ padding: '10px 12px', color: C.muted }}>{s.rol}</td>
                        <td style={{ padding: '10px 12px' }}>
                          <span
                            style={{
                              background: `${C.red}22`,
                              color: C.red,
                              borderRadius: 6,
                              padding: '2px 8px',
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            {s.examen}
                          </span>
                        </td>
                        <td style={{ padding: '10px 12px', color: C.muted }}>{s.acceso}</td>
                        <td style={{ padding: '10px 12px' }}>
                          <span
                            style={{
                              background: s.estado === 'Activo' ? `${C.success}22` : `${C.muted}22`,
                              color: s.estado === 'Activo' ? C.success : C.muted,
                              borderRadius: 6,
                              padding: '2px 8px',
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            {s.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </>
          )}

          {activeTab !== 'overview' && (
            <div
              style={{
                background: C.cardBg,
                borderRadius: 12,
                padding: 40,
                border: `1px solid ${C.navyMid}`,
                textAlign: 'center',
                color: C.muted,
              }}
            >
              <p style={{ fontSize: 16 }}>Sección en construcción</p>
            </div>
          )}
        </div>

        {/* ── Real-time sidebar ── */}
        <aside
          className="dash-jose-rt-sidebar"
          style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: C.cardBg,
              borderRadius: 12,
              padding: 20,
              border: `1px solid ${C.navyMid}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Activity size={16} color={C.red} />
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: C.text }}>
                Actividad en tiempo real
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {realtimeFeed.map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: item.color,
                        marginTop: 4,
                        flexShrink: 0,
                      }}
                    />
                    <p style={{ margin: 0, fontSize: 12, color: C.text, lineHeight: 1.4 }}>{item.msg}</p>
                  </div>
                  <p style={{ margin: 0, fontSize: 11, color: C.muted, paddingLeft: 16 }}>{item.time}</p>
                  {i < realtimeFeed.length - 1 && (
                    <div style={{ height: 1, background: C.navyMid, marginTop: 4 }} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </aside>
      </main>
    </div>
  )
}
