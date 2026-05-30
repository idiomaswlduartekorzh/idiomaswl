'use client'

import { useState } from 'react'
import { signOut } from '@/lib/actions/signOut'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { motion } from 'framer-motion'
import { BookOpen, Users, CheckSquare, Calendar, TrendingUp } from 'lucide-react'

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  blue: '#1a2ecc',
  blueLight: '#e8ebff',
  blueMid: '#c7cdf9',
  amber: '#f59e0b',
  amberLight: '#fef3c7',
  bg: '#f8fafc',
  cardBg: '#ffffff',
  text: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
  success: '#16a34a',
  successLight: '#dcfce7',
  danger: '#dc2626',
  dangerLight: '#fee2e2',
  warning: '#d97706',
  warningLight: '#fef3c7',
}

// ─── Data ────────────────────────────────────────────────────────────────────
const grupos = [
  {
    nombre: 'Inglés A2',
    horario: 'Mar / Jue 6pm',
    estudiantes: 12,
    promedio: 67,
    color: C.blue,
  },
  {
    nombre: 'Inglés B1',
    horario: 'Lun / Mié / Vie 6pm',
    estudiantes: 9,
    promedio: 74,
    color: '#8b5cf6',
  },
  {
    nombre: 'Coreano A1',
    horario: 'Sáb 10am',
    estudiantes: 7,
    promedio: 58,
    color: C.amber,
  },
  {
    nombre: 'IELTS Prep',
    horario: 'Lun / Mié 7:30pm',
    estudiantes: 6,
    promedio: 81,
    color: '#22c55e',
  },
]

const grupoBarData = [
  { grupo: 'Inglés A2', simulacros: 67, lecciones: 72 },
  { grupo: 'Inglés B1', simulacros: 74, lecciones: 79 },
  { grupo: 'Coreano A1', simulacros: 58, lecciones: 63 },
  { grupo: 'IELTS Prep', simulacros: 81, lecciones: 85 },
]

const estudiantesData = [
  { nombre: 'María García', grupo: 'IELTS Prep', lecciones: 24, promedio: 84, racha: 12, estado: 'Al día' },
  { nombre: 'Carlos Ramírez', grupo: 'Inglés B1', lecciones: 18, promedio: 71, racha: 5, estado: 'Al día' },
  { nombre: 'Ana Martínez', grupo: 'Inglés A2', lecciones: 10, promedio: 55, racha: 0, estado: 'Atrasado' },
  { nombre: 'Luis Herrera', grupo: 'Coreano A1', lecciones: 15, promedio: 62, racha: 3, estado: 'En riesgo' },
  { nombre: 'Sofía López', grupo: 'IELTS Prep', lecciones: 22, promedio: 79, racha: 8, estado: 'Al día' },
  { nombre: 'Diego Torres', grupo: 'Inglés B1', lecciones: 8, promedio: 48, racha: 0, estado: 'Atrasado' },
  { nombre: 'Valentina Ríos', grupo: 'Inglés A2', lecciones: 20, promedio: 73, racha: 6, estado: 'Al día' },
  { nombre: 'Pedro Salazar', grupo: 'Coreano A1', lecciones: 13, promedio: 59, racha: 2, estado: 'En riesgo' },
]

type WeekEvent = { grupo: string; hora: string; color: string }
type WeekSchedule = Record<string, WeekEvent[]>

const weekSchedule: WeekSchedule = {
  Lun: [
    { grupo: 'Inglés B1', hora: '6:00pm', color: '#8b5cf6' },
    { grupo: 'IELTS Prep', hora: '7:30pm', color: '#22c55e' },
  ],
  Mar: [{ grupo: 'Inglés A2', hora: '6:00pm', color: C.blue }],
  Mié: [
    { grupo: 'Inglés B1', hora: '6:00pm', color: '#8b5cf6' },
    { grupo: 'IELTS Prep', hora: '7:30pm', color: '#22c55e' },
  ],
  Jue: [{ grupo: 'Inglés A2', hora: '6:00pm', color: C.blue }],
  Vie: [{ grupo: 'Inglés B1', hora: '6:00pm', color: '#8b5cf6' }],
  Sáb: [{ grupo: 'Coreano A1', hora: '10:00am', color: C.amber }],
}

const initialTasks = [
  { id: 1, label: 'Revisar ensayos IELTS grupo B1', done: false },
  { id: 2, label: 'Preparar material semana 8 — Inglés A2', done: false },
  { id: 3, label: 'Enviar retroalimentación a Coreano A1', done: true },
  { id: 4, label: 'Actualizar banco de preguntas IELTS Prep', done: false },
  { id: 5, label: 'Reunión de seguimiento con Jose David', done: false },
]

// ─── Estado badge ─────────────────────────────────────────────────────────────
function EstadoBadge({ estado }: { estado: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    'Al día': { bg: C.successLight, color: C.success },
    Atrasado: { bg: C.dangerLight, color: C.danger },
    'En riesgo': { bg: C.warningLight, color: C.warning },
  }
  const style = map[estado] ?? { bg: C.border, color: C.muted }
  return (
    <span
      style={{
        background: style.bg,
        color: style.color,
        borderRadius: 6,
        padding: '3px 9px',
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {estado}
    </span>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ZhannaDashboard() {
  const [tasks, setTasks] = useState(initialTasks)

  const toggleTask = (id: number) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const todayStr = new Date().toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div
      className="dash-zh-root"
      style={{ background: C.bg, minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: C.text }}
    >
      {/* ── Header ── */}
      <header
        className="dash-zh-header"
        style={{
          background: C.cardBg,
          borderBottom: `1px solid ${C.border}`,
          padding: '20px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: C.text }}>
              Panel Académico — Zhanna Korzh
            </h1>
            <span
              style={{
                background: C.blueLight,
                color: C.blue,
                borderRadius: 20,
                padding: '3px 12px',
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              Coordinadora Académica
            </span>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: C.muted, textTransform: 'capitalize' }}>
            {todayStr}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: C.blue, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 15,
            }}
          >
            ZK
          </div>
          <form action={signOut}>
            <button type="submit" style={{
              padding: '6px 14px', borderRadius: 8,
              border: `1px solid ${C.border}`, background: 'transparent',
              color: C.muted, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>
              Cerrar sesión
            </button>
          </form>
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{ padding: '28px 32px', maxWidth: 1280, margin: '0 auto' }}>

        {/* ── Resumen del día ── */}
        <section className="dash-zh-summary" style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 14px', color: C.text }}>
            Resumen del día
          </h2>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { icon: BookOpen, label: 'Clases hoy', value: '3', color: C.blue },
              { icon: Users, label: 'Estudiantes activos', value: '28', color: '#8b5cf6' },
              { icon: CheckSquare, label: 'Tareas pendientes', value: '5', color: C.amber },
            ].map(({ icon: Icon, label, value, color }) => (
              <motion.div
                key={label}
                className="dash-zh-summary-card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  flex: 1,
                  background: C.cardBg,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    background: `${color}18`,
                    borderRadius: 10,
                    padding: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={24} color={color} />
                </div>
                <div>
                  <p style={{ margin: 0, color: C.muted, fontSize: 13, fontWeight: 500 }}>{label}</p>
                  <p style={{ margin: 0, fontSize: 30, fontWeight: 700, color: C.text }}>{value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Mis grupos ── */}
        <section className="dash-zh-groups" style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 14px', color: C.text }}>
            Mis grupos
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {grupos.map((g) => (
              <motion.div
                key={g.nombre}
                className="dash-zh-group-card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: C.cardBg,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: 20,
                  borderTop: `4px solid ${g.color}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.text }}>{g.nombre}</h3>
                    <p style={{ margin: '3px 0 0', fontSize: 12, color: C.muted }}>{g.horario}</p>
                  </div>
                  <span
                    style={{
                      background: `${g.color}18`,
                      color: g.color,
                      borderRadius: 20,
                      padding: '3px 10px',
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {g.estudiantes} estudiantes
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <TrendingUp size={14} color={C.muted} />
                  <span style={{ fontSize: 13, color: C.muted }}>Promedio:</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: g.color }}>{g.promedio}%</span>
                  <div
                    style={{
                      flex: 1,
                      height: 6,
                      background: C.border,
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${g.promedio}%`,
                        height: '100%',
                        background: g.color,
                        borderRadius: 3,
                      }}
                    />
                  </div>
                </div>
                <button
                  className="dash-zh-ver-btn"
                  style={{
                    background: g.color,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 16px',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: '100%',
                  }}
                >
                  Ver grupo
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Two-column row: table + bar chart ── */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
          {/* Progreso de estudiantes */}
          <motion.section
            className="dash-zh-students"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              flex: 3,
              background: C.cardBg,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 14px', color: C.text }}>
              Progreso de estudiantes
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr>
                  {['Nombre', 'Grupo', 'Lecciones', 'Promedio sim.', 'Racha', 'Estado'].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        color: C.muted,
                        fontWeight: 500,
                        padding: '8px 10px',
                        borderBottom: `1px solid ${C.border}`,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {estudiantesData.map((s, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: '9px 10px', fontWeight: 600, color: C.text }}>{s.nombre}</td>
                    <td style={{ padding: '9px 10px', color: C.muted }}>{s.grupo}</td>
                    <td style={{ padding: '9px 10px', color: C.text }}>{s.lecciones}</td>
                    <td style={{ padding: '9px 10px', color: C.text }}>{s.promedio}%</td>
                    <td style={{ padding: '9px 10px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        🔥 <span style={{ color: C.text }}>{s.racha}d</span>
                      </span>
                    </td>
                    <td style={{ padding: '9px 10px' }}>
                      <EstadoBadge estado={s.estado} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.section>

          {/* Bar chart */}
          <motion.section
            className="dash-zh-barchart"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              flex: 2,
              background: C.cardBg,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 14px', color: C.text }}>
              Rendimiento por grupo
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={grupoBarData} margin={{ top: 4, right: 4, bottom: 30, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis
                  dataKey="grupo"
                  tick={{ fontSize: 11, fill: C.muted }}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis tick={{ fontSize: 11, fill: C.muted }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 8 }}
                />
                <Legend formatter={(v) => <span style={{ fontSize: 12, color: C.muted }}>{v}</span>} />
                <Bar dataKey="simulacros" name="Prom. simulacros" fill={C.blue} radius={[4, 4, 0, 0]} />
                <Bar dataKey="lecciones" name="Prom. lecciones" fill={C.amber} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.section>
        </div>

        {/* ── Calendario + Tareas ── */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
          {/* Calendario */}
          <motion.section
            className="dash-zh-calendar"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              flex: 3,
              background: C.cardBg,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Calendar size={16} color={C.blue} />
              <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: C.text }}>
                Calendario esta semana
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
              {Object.entries(weekSchedule).map(([day, events]) => (
                <div key={day} className="dash-zh-cal-col">
                  <p
                    style={{
                      margin: '0 0 8px',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      color: C.muted,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {day}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {events.map((ev, i) => (
                      <div
                        key={i}
                        style={{
                          background: `${ev.color}18`,
                          borderLeft: `3px solid ${ev.color}`,
                          borderRadius: 6,
                          padding: '6px 8px',
                        }}
                      >
                        <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: ev.color }}>
                          {ev.grupo}
                        </p>
                        <p style={{ margin: 0, fontSize: 10, color: C.muted }}>{ev.hora}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Tareas pendientes */}
          <motion.section
            className="dash-zh-tasks"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              flex: 2,
              background: C.cardBg,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <CheckSquare size={16} color={C.amber} />
              <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: C.text }}>
                Tareas pendientes
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tasks.map((task) => (
                <label
                  key={task.id}
                  className="dash-zh-task-item"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    cursor: 'pointer',
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: task.done ? C.successLight : C.bg,
                    border: `1px solid ${task.done ? '#bbf7d0' : C.border}`,
                    transition: 'background 0.15s',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    style={{ marginTop: 1, accentColor: C.success, width: 15, height: 15, flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontSize: 13,
                      color: task.done ? C.success : C.text,
                      textDecoration: task.done ? 'line-through' : 'none',
                      fontWeight: task.done ? 400 : 500,
                    }}
                  >
                    {task.label}
                  </span>
                </label>
              ))}
            </div>
            <p style={{ margin: '14px 0 0', fontSize: 12, color: C.muted }}>
              {tasks.filter((t) => t.done).length} de {tasks.length} completadas
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  )
}
