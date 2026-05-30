'use client'

import { useState, useTransition } from 'react'
import { assignPlan } from '@/lib/actions/assignPlan'
import type { StudentPlan } from '@/lib/actions/assignPlan'

export interface StudentRow {
  id: string
  email: string
  full_name: string | null
  plan: StudentPlan
  enrolled_at: string | null
  simulacro_count: number
  last_active: string | null
}

const PLAN_OPTS: { value: StudentPlan; label: string; color: string }[] = [
  { value: 'autodidacta', label: 'Autodidacta', color: '#6b7280' },
  { value: 'preparacion', label: 'Preparación', color: '#1a2ecc' },
  { value: 'intensivo',   label: 'Intensivo',   color: '#c8202e' },
]

const A = '#c87941'
const CARD = '#ffffff'
const TEXT = '#1a1a2e'
const MUTED = '#9ca3af'
const BORDER = '#e8ddd4'
const BG = '#f5f0eb'

function formatDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
}

function activityStatus(lastActive: string | null): { label: string; color: string; bg: string } {
  if (!lastActive) return { label: 'Sin actividad', color: '#6b7280', bg: '#f3f4f6' }
  const days = Math.floor((Date.now() - new Date(lastActive).getTime()) / 86400000)
  if (days <= 7)  return { label: 'Activo',     color: '#16a34a', bg: '#dcfce7' }
  if (days <= 30) return { label: 'En riesgo',  color: '#d97706', bg: '#fef3c7' }
  return             { label: 'Inactivo',    color: '#dc2626', bg: '#fee2e2' }
}

function PlanBadge({ plan }: { plan: StudentPlan }) {
  const opt = PLAN_OPTS.find(o => o.value === plan)!
  return (
    <span style={{
      fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em',
      padding: '2px 8px', borderRadius: 100,
      background: opt.color + '18', color: opt.color, border: `1px solid ${opt.color}44`,
    }}>
      {opt.label}
    </span>
  )
}

export default function StudentList({ students }: { students: StudentRow[] }) {
  const [list, setList]     = useState<StudentRow[]>(students)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<StudentPlan | 'todos'>('todos')
  const [pending, startTransition] = useTransition()
  const [saving, setSaving] = useState<string | null>(null)
  const [toast, setToast]   = useState<string | null>(null)

  const filtered = list.filter(s => {
    const matchSearch = !search || s.email.includes(search) || (s.full_name ?? '').toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'todos' || s.plan === filter
    return matchSearch && matchFilter
  })

  function handlePlanChange(studentId: string, newPlan: StudentPlan) {
    setSaving(studentId)
    startTransition(async () => {
      try {
        await assignPlan(studentId, newPlan)
        setList(prev => prev.map(s => s.id === studentId ? { ...s, plan: newPlan } : s))
        setToast(`Plan actualizado a ${PLAN_OPTS.find(o => o.value === newPlan)?.label}`)
        setTimeout(() => setToast(null), 3000)
      } catch (e) {
        setToast('Error al guardar: ' + String(e))
        setTimeout(() => setToast(null), 4000)
      } finally {
        setSaving(null)
      }
    })
  }

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 16, right: 16, zIndex: 999,
          background: TEXT, color: '#fff', padding: '10px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        }}>
          {toast}
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Buscar por nombre o email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: 200, padding: '7px 12px', borderRadius: 8,
            border: `1px solid ${BORDER}`, fontSize: 12, outline: 'none', background: CARD, color: TEXT,
          }}
        />
        <div style={{ display: 'flex', gap: 6 }}>
          {(['todos', ...PLAN_OPTS.map(o => o.value)] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as StudentPlan | 'todos')}
              style={{
                padding: '6px 12px', borderRadius: 20, border: `1px solid ${filter === f ? A : BORDER}`,
                background: filter === f ? A : 'transparent', color: filter === f ? '#fff' : MUTED,
                fontSize: 11, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize',
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <span style={{ fontSize: 11, color: MUTED, whiteSpace: 'nowrap' }}>
          {filtered.length} de {list.length} · {list.filter(s => !s.last_active).length} sin actividad
        </span>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <p style={{ color: MUTED, fontSize: 13, textAlign: 'center', padding: '32px 0' }}>
          Sin estudiantes registrados aún.
        </p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr>
                {['Estudiante', 'Estado', 'Plan', 'Simulacros', 'Último acceso', 'Inscrito', 'Cambiar plan'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '6px 10px',
                    color: MUTED, fontWeight: 600, fontSize: 10,
                    borderBottom: `1px solid ${BORDER}`, whiteSpace: 'nowrap',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(student => (
                <tr key={student.id} style={{ borderBottom: `1px solid ${BORDER}` }}>
                  {/* Name / email */}
                  <td style={{ padding: '10px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: A + '33', color: A,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 800, fontSize: 11, flexShrink: 0,
                      }}>
                        {(student.full_name ?? student.email)[0].toUpperCase()}
                      </div>
                      <div>
                        <p style={{ margin: 0, fontWeight: 600, color: TEXT, fontSize: 12 }}>
                          {student.full_name ?? <span style={{ color: MUTED }}>Sin nombre</span>}
                        </p>
                        <p style={{ margin: 0, color: MUTED, fontSize: 11 }}>{student.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Activity status */}
                  <td style={{ padding: '10px 10px' }}>
                    {(() => {
                      const st = activityStatus(student.last_active)
                      return (
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 100, background: st.bg, color: st.color }}>
                          {st.label}
                        </span>
                      )
                    })()}
                  </td>

                  {/* Current plan */}
                  <td style={{ padding: '10px 10px' }}>
                    <PlanBadge plan={student.plan} />
                  </td>

                  {/* Simulacro count */}
                  <td style={{ padding: '10px 10px', fontWeight: 700, color: TEXT, fontFamily: 'monospace' }}>
                    {student.simulacro_count}
                  </td>

                  {/* Last active */}
                  <td style={{ padding: '10px 10px', color: MUTED, whiteSpace: 'nowrap' }}>
                    {formatDate(student.last_active)}
                  </td>

                  {/* Enrolled */}
                  <td style={{ padding: '10px 10px', color: MUTED, whiteSpace: 'nowrap' }}>
                    {formatDate(student.enrolled_at)}
                  </td>

                  {/* Plan selector */}
                  <td style={{ padding: '10px 10px' }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {PLAN_OPTS.map(opt => (
                        <button
                          key={opt.value}
                          disabled={saving === student.id || pending}
                          onClick={() => handlePlanChange(student.id, opt.value)}
                          style={{
                            padding: '3px 8px', borderRadius: 6,
                            border: `1px solid ${student.plan === opt.value ? opt.color : BORDER}`,
                            background: student.plan === opt.value ? opt.color : BG,
                            color: student.plan === opt.value ? '#fff' : MUTED,
                            fontSize: 10, fontWeight: 700, cursor: saving === student.id ? 'not-allowed' : 'pointer',
                            opacity: saving === student.id ? 0.6 : 1,
                            transition: 'all 0.15s',
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
