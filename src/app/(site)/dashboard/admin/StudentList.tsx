'use client'

import { useState, useTransition, useCallback } from 'react'
import { assignPlan } from '@/lib/actions/assignPlan'
import { assignSubject } from '@/lib/actions/assignSubject'
import type { StudentSubject } from '@/lib/actions/inviteStudent'
import { inviteStudent, SUBJECT_LABELS } from '@/lib/actions/inviteStudent'
import type { StudentPlan } from '@/lib/actions/assignPlan'
import type { ExamSubmission } from './JoseDashboardServer'

export interface StudentRow {
  id: string
  email: string
  full_name: string | null
  plan: StudentPlan
  subject: string | null
  enrolled_at: string | null
  simulacro_count: number
  completed_steps: number
  active_days: number
  last_active: string | null
  progress: StudentProgressRow[]
}

export interface StudentProgressRow {
  course_slug: string
  step_id: string
  last_stage: string | null
  completed_at: string
}

const PLAN_OPTS: { value: StudentPlan; label: string; color: string }[] = [
  { value: 'autodidacta', label: 'Autodidacta', color: '#6b7280' },
  { value: 'preparacion', label: 'Preparación', color: '#1a2ecc' },
  { value: 'intensivo',   label: 'Intensivo',   color: '#c8202e' },
]

const SUBJECT_OPTS: { value: StudentSubject; label: string }[] = Object.entries(SUBJECT_LABELS).map(
  ([value, label]) => ({ value: value as StudentSubject, label })
)

const A      = '#c87941'
const CARD   = '#ffffff'
const TEXT   = '#1a1a2e'
const MUTED  = '#9ca3af'
const BORDER = '#e8ddd4'
const BG     = '#f5f0eb'

function formatDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
}

function activityStatus(lastActive: string | null): { label: string; color: string; bg: string } {
  if (!lastActive) return { label: 'Sin actividad', color: '#6b7280', bg: '#f3f4f6' }
  const days = Math.floor((Date.now() - new Date(lastActive).getTime()) / 86400000)
  if (days <= 7)  return { label: 'Activo',    color: '#16a34a', bg: '#dcfce7' }
  if (days <= 30) return { label: 'En riesgo', color: '#d97706', bg: '#fef3c7' }
  return             { label: 'Inactivo',   color: '#dc2626', bg: '#fee2e2' }
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

// ─── Invite modal ─────────────────────────────────────────────────────────────
function InviteModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (name: string) => void }) {
  const [email,   setEmail]   = useState('')
  const [name,    setName]    = useState('')
  const [subject, setSubject] = useState<StudentSubject>('icfes')
  const [plan,    setPlan]    = useState<StudentPlan>('preparacion')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  async function handleSubmit() {
    if (!email.trim() || !name.trim()) { setError('Email y nombre son requeridos'); return }
    setLoading(true)
    setError(null)
    const result = await inviteStudent(email.trim(), name.trim(), subject, plan)
    setLoading(false)
    if (result.ok) {
      onSuccess(name.trim())
    } else {
      setError(result.error)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        background: CARD, borderRadius: 18, padding: 28, width: 420, maxWidth: '95vw',
        boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
      }}>
        <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 800, color: TEXT }}>
          Invitar estudiante
        </h3>
        <p style={{ margin: '0 0 20px', fontSize: 12, color: MUTED }}>
          Le llegará un correo de Supabase para crear su contraseña.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: TEXT }}>Email *</span>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="estudiante@correo.com"
              style={{ padding: '8px 12px', borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 13, outline: 'none', color: TEXT, background: BG }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: TEXT }}>Nombre completo *</span>
            <input
              type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="Ana García"
              style={{ padding: '8px 12px', borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 13, outline: 'none', color: TEXT, background: BG }}
            />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: TEXT }}>Materia</span>
              <select
                value={subject} onChange={e => setSubject(e.target.value as StudentSubject)}
                style={{ padding: '8px 12px', borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 12, color: TEXT, background: BG, outline: 'none' }}
              >
                {SUBJECT_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: TEXT }}>Plan</span>
              <select
                value={plan} onChange={e => setPlan(e.target.value as StudentPlan)}
                style={{ padding: '8px 12px', borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 12, color: TEXT, background: BG, outline: 'none' }}
              >
                {PLAN_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
          </div>

          {error && (
            <p style={{ margin: 0, fontSize: 12, color: '#dc2626', background: '#fee2e2', padding: '8px 12px', borderRadius: 8 }}>
              {error}
            </p>
          )}

          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button onClick={onClose}
              style={{ flex: 1, padding: '9px 0', borderRadius: 8, border: `1px solid ${BORDER}`, background: 'transparent', color: MUTED, fontSize: 13, cursor: 'pointer' }}>
              Cancelar
            </button>
            <button onClick={handleSubmit} disabled={loading}
              style={{ flex: 2, padding: '9px 0', borderRadius: 8, border: 'none', background: A, color: '#fff', fontSize: 13, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Enviando…' : 'Enviar invitación'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Student detail panel ─────────────────────────────────────────────────────
function StudentDetail({ student, submissions }: { student: StudentRow; submissions: ExamSubmission[] }) {
  const exams = submissions.filter(s => s.user_id === student.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <div style={{ padding: '14px 16px', background: BG, borderRadius: 12, margin: '0 4px 4px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
        <div>
          <p style={{ margin: 0, fontSize: 11, color: MUTED }}>Simulacros realizados</p>
          <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: TEXT }}>{exams.length}</p>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 11, color: MUTED }}>Pasos completados</p>
          <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: TEXT }}>{student.completed_steps}</p>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 11, color: MUTED }}>Días activos</p>
          <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: TEXT }}>{student.active_days}</p>
        </div>
        {student.enrolled_at && (
          <div>
            <p style={{ margin: 0, fontSize: 11, color: MUTED }}>Inscrito</p>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: TEXT }}>{formatDate(student.enrolled_at)}</p>
          </div>
        )}
        <a
          href={`https://wa.me/573005004253?text=${encodeURIComponent(`Hola ${student.full_name ?? student.email}, ¿cómo vas con tu preparación en WeLearn?`)}`}
          target="_blank" rel="noopener noreferrer"
          style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 8, background: '#dcfce7', color: '#16a34a', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
          💬 Escribir por WhatsApp
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
        <section>
          <p style={{ margin: '0 0 7px', color: TEXT, fontSize: 11, fontWeight: 800 }}>Lecciones y pasos completados</p>
          {student.progress.length === 0 ? (
            <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>Aún no ha completado pasos de curso.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr>
                    {['Curso', 'Paso', 'Última etapa', 'Fecha'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '4px 8px', color: MUTED, fontWeight: 600, fontSize: 10, borderBottom: `1px solid ${BORDER}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {student.progress.slice(0, 20).map(item => (
                    <tr key={`${item.course_slug}-${item.step_id}`} style={{ borderBottom: `1px solid ${BORDER}` }}>
                      <td style={{ padding: '6px 8px', color: TEXT, textTransform: 'capitalize' }}>{item.course_slug}</td>
                      <td style={{ padding: '6px 8px', color: TEXT, fontWeight: 700 }}>{item.step_id}</td>
                      <td style={{ padding: '6px 8px', color: MUTED }}>{item.last_stage ?? '—'}</td>
                      <td style={{ padding: '6px 8px', color: MUTED, whiteSpace: 'nowrap' }}>{formatDate(item.completed_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section>
          <p style={{ margin: '0 0 7px', color: TEXT, fontSize: 11, fontWeight: 800 }}>Simulacros realizados</p>
          {exams.length === 0 ? (
            <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>Sin simulacros registrados aún.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr>
                    {['Examen', 'Resultado', 'Fecha'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '4px 8px', color: MUTED, fontWeight: 600, fontSize: 10, borderBottom: `1px solid ${BORDER}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {exams.map(s => (
                    <tr key={s.id} style={{ borderBottom: `1px solid ${BORDER}` }}>
                      <td style={{ padding: '6px 8px', color: TEXT }}>{s.exam_name} {s.mock_title ? `· ${s.mock_title}` : ''}</td>
                      <td style={{ padding: '6px 8px', fontWeight: 700, color: A }}>{s.total_label ?? '—'}</td>
                      <td style={{ padding: '6px 8px', color: MUTED, whiteSpace: 'nowrap' }}>
                        {new Date(s.created_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function StudentList({
  students,
  submissions = [],
}: {
  students: StudentRow[]
  submissions?: ExamSubmission[]
}) {
  const [list,       setList]       = useState<StudentRow[]>(students)
  const [search,     setSearch]     = useState('')
  const [filter,     setFilter]     = useState<StudentPlan | 'todos'>('todos')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showInvite, setShowInvite] = useState(false)
  const [pending,    startTransition] = useTransition()
  const [saving,     setSaving]     = useState<string | null>(null)
  const [toast,      setToast]      = useState<string | null>(null)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }, [])

  const copyEmail = useCallback((email: string) => {
    navigator.clipboard.writeText(email).then(() => showToast(`Email copiado: ${email}`))
  }, [showToast])

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
        showToast(`Plan → ${PLAN_OPTS.find(o => o.value === newPlan)?.label}`)
      } catch (e) {
        showToast('Error: ' + String(e))
      } finally {
        setSaving(null)
      }
    })
  }

  function handleSubjectChange(studentId: string, newSubject: StudentSubject) {
    setSaving(studentId)
    startTransition(async () => {
      try {
        await assignSubject(studentId, newSubject)
        setList(prev => prev.map(s => s.id === studentId ? { ...s, subject: newSubject } : s))
        showToast(`Materia → ${(SUBJECT_LABELS as Record<string, string>)[newSubject]}`)
      } catch (e) {
        showToast('Error: ' + String(e))
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

      {/* Invite modal */}
      {showInvite && (
        <InviteModal
          onClose={() => setShowInvite(false)}
          onSuccess={name => {
            setShowInvite(false)
            showToast(`✓ Invitación enviada a ${name}`)
          }}
        />
      )}

      {/* Header row: filters + invite button */}
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
          {filtered.length} de {list.length}
          {' · '}
          <span style={{ color: '#d97706', fontWeight: 600 }}>
            {list.filter(s => activityStatus(s.last_active).label === 'En riesgo').length} riesgo
          </span>
        </span>
        <button
          onClick={() => setShowInvite(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '7px 14px', borderRadius: 8, border: 'none',
            background: A, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
            whiteSpace: 'nowrap', flexShrink: 0,
          }}
        >
          + Invitar estudiante
        </button>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <p style={{ color: MUTED, fontSize: 13, textAlign: 'center', padding: '32px 0' }}>
          Sin estudiantes. Usa &ldquo;Invitar estudiante&rdquo; para agregar el primero.
        </p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr>
                {['', 'Estudiante', 'Estado', 'Materia', 'Plan', 'Pasos', 'Sims', 'Último acceso', 'Cambiar plan', 'Materia', ''].map((h, i) => (
                  <th key={i} style={{
                    textAlign: 'left', padding: '6px 8px',
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
                <>
                  <tr
                    key={student.id}
                    style={{ borderBottom: expandedId === student.id ? 'none' : `1px solid ${BORDER}`, cursor: 'pointer' }}
                  >
                    {/* Expand toggle */}
                    <td style={{ padding: '10px 4px 10px 8px' }}>
                      <button
                        onClick={() => setExpandedId(expandedId === student.id ? null : student.id)}
                        style={{
                          width: 20, height: 20, borderRadius: 5,
                          border: `1px solid ${BORDER}`, background: expandedId === student.id ? TEXT : 'transparent',
                          color: expandedId === student.id ? '#fff' : MUTED,
                          fontSize: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}
                      >
                        {expandedId === student.id ? '▲' : '▼'}
                      </button>
                    </td>

                    {/* Name / email */}
                    <td style={{ padding: '10px 8px' }} onClick={() => setExpandedId(expandedId === student.id ? null : student.id)}>
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
                    <td style={{ padding: '10px 8px' }}>
                      {(() => {
                        const st = activityStatus(student.last_active)
                        return (
                          <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 100, background: st.bg, color: st.color }}>
                            {st.label}
                          </span>
                        )
                      })()}
                    </td>

                    {/* Subject badge */}
                    <td style={{ padding: '10px 8px' }}>
                      {student.subject ? (
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 6, background: 'rgba(200,121,65,0.12)', color: A, border: `1px solid ${A}33` }}>
                          {(SUBJECT_LABELS as Record<string, string>)[student.subject] ?? student.subject}
                        </span>
                      ) : (
                        <span style={{ color: MUTED, fontSize: 11 }}>—</span>
                      )}
                    </td>

                    {/* Current plan */}
                    <td style={{ padding: '10px 8px' }}>
                      <PlanBadge plan={student.plan} />
                    </td>

                    {/* Completed steps */}
                    <td style={{ padding: '10px 8px', fontWeight: 700, color: TEXT, fontFamily: 'monospace' }}>
                      {student.completed_steps}
                    </td>

                    {/* Simulacro count */}
                    <td style={{ padding: '10px 8px', fontWeight: 700, color: TEXT, fontFamily: 'monospace' }}>
                      {student.simulacro_count}
                    </td>

                    {/* Last active */}
                    <td style={{ padding: '10px 8px', color: MUTED, whiteSpace: 'nowrap' }}>
                      {formatDate(student.last_active)}
                    </td>

                    {/* Plan selector */}
                    <td style={{ padding: '10px 8px' }}>
                      <div style={{ display: 'flex', gap: 3 }}>
                        {PLAN_OPTS.map(opt => (
                          <button
                            key={opt.value}
                            disabled={saving === student.id || pending}
                            onClick={() => handlePlanChange(student.id, opt.value)}
                            style={{
                              padding: '2px 6px', borderRadius: 5,
                              border: `1px solid ${student.plan === opt.value ? opt.color : BORDER}`,
                              background: student.plan === opt.value ? opt.color : BG,
                              color: student.plan === opt.value ? '#fff' : MUTED,
                              fontSize: 9, fontWeight: 700, cursor: saving === student.id ? 'not-allowed' : 'pointer',
                              opacity: saving === student.id ? 0.6 : 1,
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </td>

                    {/* Subject selector */}
                    <td style={{ padding: '10px 8px' }}>
                      <select
                        value={student.subject ?? ''}
                        disabled={saving === student.id || pending}
                        onChange={e => handleSubjectChange(student.id, e.target.value as StudentSubject)}
                        style={{
                          padding: '3px 6px', borderRadius: 6,
                          border: `1px solid ${BORDER}`, background: BG, color: TEXT,
                          fontSize: 10, outline: 'none', cursor: 'pointer',
                          opacity: saving === student.id ? 0.6 : 1,
                        }}
                      >
                        <option value="">— materia —</option>
                        {SUBJECT_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </td>

                    {/* Copy email */}
                    <td style={{ padding: '10px 6px' }}>
                      <button
                        onClick={() => copyEmail(student.email)}
                        title={`Copiar: ${student.email}`}
                        style={{
                          padding: '3px 7px', borderRadius: 6, border: `1px solid ${BORDER}`,
                          background: 'transparent', color: MUTED, fontSize: 10,
                          fontWeight: 700, cursor: 'pointer',
                        }}
                      >
                        ✉
                      </button>
                    </td>
                  </tr>

                  {/* Expanded detail row */}
                  {expandedId === student.id && (
                    <tr key={`${student.id}-detail`} style={{ borderBottom: `1px solid ${BORDER}` }}>
                      <td colSpan={11} style={{ padding: '0 0 8px' }}>
                        <StudentDetail student={student} submissions={submissions} />
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
