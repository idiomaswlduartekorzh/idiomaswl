'use client'

import { useState } from 'react'
import {
  LayoutDashboard, Users, FileText, DollarSign, Settings,
  Bell, MessageCircle, Globe, ArrowUpRight, Download,
  Calendar, ChevronDown, BookOpen, GraduationCap, ClipboardCheck,
} from 'lucide-react'
import { scoreSubmission } from '@/lib/actions/scoreSubmission'
import { signOut } from '@/lib/actions/signOut'
import {
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { motion } from 'framer-motion'
import type { DashboardData, LeadRow } from './JoseDashboardServer'
import StudentList from './StudentList'

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

const EXAM_COLORS: Record<string, string> = {
  ielts: A,
  toefl: A2,
  icfes: A3,
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

function weekTrend(thisWeek: number, lastWeek: number): string {
  if (lastWeek === 0) return thisWeek > 0 ? '▲ nuevo' : '—'
  const delta = ((thisWeek - lastWeek) / lastWeek) * 100
  const sign = delta >= 0 ? '▲' : '▼'
  return `${sign} ${Math.abs(delta).toFixed(0)}% vs sem. ant.`
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

// ─── IELTS Pending Panel ─────────────────────────────────────────────────────

const BAND_OPTS = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9] as const;

function IELTSPendingPanel({ items }: { items: import('./JoseDashboardServer').ExamSubmission[] }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [wBand, setWBand] = useState<number>(5.5)
  const [sBand, setSBand] = useState<number>(5.5)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState<Set<string>>(new Set())

  const active = items.find(i => i.id === selected)

  async function handleSave() {
    if (!selected) return
    setSaving(true)
    try {
      await scoreSubmission(selected, wBand, sBand)
      setSaved(p => new Set([...p, selected]))
      setSelected(null)
    } catch (e) {
      alert('Error al guardar: ' + String(e))
    } finally {
      setSaving(false)
    }
  }

  const pending = items.filter(i => !saved.has(i.id))

  return (
    <Card style={{ border: `2px solid ${A}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <ClipboardCheck size={16} color={A} />
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: A }}>
          Correcciones pendientes — todos los exámenes ({pending.length})
        </h3>
      </div>

      {pending.length === 0 ? (
        <p style={{ color: MUTED, fontSize: 13 }}>¡Todo al día! Sin correcciones pendientes.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: 16 }}>
          {/* List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {pending.map(item => (
              <button key={item.id}
                onClick={() => { setSelected(item.id); setWBand(5.5); setSBand(5.5); }}
                style={{
                  textAlign: 'left', padding: '10px 14px', borderRadius: 10,
                  border: `1px solid ${selected === item.id ? A : BORDER}`,
                  background: selected === item.id ? `${A}18` : CARD,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}>
                <p style={{ margin: '0 0 2px', fontSize: 12, fontWeight: 700, color: TEXT }}>
                  {item.user_name ?? item.user_email ?? 'Anónimo'}
                </p>
                <p style={{ margin: 0, fontSize: 11, color: MUTED }}>
                  {item.exam_name} · {item.mock_title} · {formatDate(item.created_at)}
                </p>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          {active && (
            <div style={{ background: BG, borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Writing Task 1</p>
                <div style={{ background: CARD, borderRadius: 8, padding: 10, fontSize: 12, color: TEXT, maxHeight: 120, overflowY: 'auto', whiteSpace: 'pre-wrap', lineHeight: 1.5, border: `1px solid ${BORDER}` }}>
                  {active.writing_task1_answer || <span style={{ color: MUTED }}>Sin respuesta</span>}
                </div>
              </div>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Writing Task 2</p>
                <div style={{ background: CARD, borderRadius: 8, padding: 10, fontSize: 12, color: TEXT, maxHeight: 120, overflowY: 'auto', whiteSpace: 'pre-wrap', lineHeight: 1.5, border: `1px solid ${BORDER}` }}>
                  {active.writing_task2_answer || <span style={{ color: MUTED }}>Sin respuesta</span>}
                </div>
              </div>
              {active.speaking_answers && Object.values(active.speaking_answers).some(Boolean) && (
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Speaking — notas</p>
                  <div style={{ background: CARD, borderRadius: 8, padding: 10, fontSize: 12, color: TEXT, maxHeight: 80, overflowY: 'auto', border: `1px solid ${BORDER}` }}>
                    {Object.entries(active.speaking_answers).map(([k, v]) => v ? (
                      <p key={k} style={{ margin: '0 0 4px' }}><strong>{k}:</strong> {v}</p>
                    ) : null)}
                  </div>
                </div>
              )}
              {/* Band inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: TEXT }}>Writing Band</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {BAND_OPTS.map(b => (
                      <button key={b} onClick={() => setWBand(b)}
                        style={{ padding: '3px 8px', borderRadius: 6, border: `1px solid ${wBand===b?A:BORDER}`, background: wBand===b?A:'transparent', color: wBand===b?'#fff':TEXT, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: TEXT }}>Speaking Band</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {BAND_OPTS.map(b => (
                      <button key={b} onClick={() => setSBand(b)}
                        style={{ padding: '3px 8px', borderRadius: 6, border: `1px solid ${sBand===b?A:BORDER}`, background: sBand===b?A:'transparent', color: sBand===b?'#fff':TEXT, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setSelected(null)}
                  style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: `1px solid ${BORDER}`, background: 'transparent', color: MUTED, fontSize: 12, cursor: 'pointer' }}>
                  Cancelar
                </button>
                <button onClick={handleSave} disabled={saving}
                  style={{ flex: 2, padding: '8px 0', borderRadius: 8, border: 'none', background: A, color: '#fff', fontSize: 12, fontWeight: 700, cursor: saving?'not-allowed':'pointer', opacity: saving?0.7:1 }}>
                  {saving ? 'Guardando...' : `Guardar W:${wBand} S:${sBand}`}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function JoseDashboard({ data }: { data: DashboardData }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'leads'>('overview')

  const now = new Date()
  const dateStr = now.toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  const trend = weekTrend(data.thisWeekCount, data.lastWeekCount)
  const trendColor = data.thisWeekCount >= data.lastWeekCount ? '#16a34a' : '#dc2626'

  // Bar chart data for per-exam breakdown
  const examBarData = data.perExam.map(e => ({
    name: e.exam_name,
    count: e.count,
    slug: e.exam_slug,
  }))

  return (
    <div style={{ display: 'flex', height: '100vh', background: BG, fontFamily: "system-ui,-apple-system,'Segoe UI',sans-serif", overflow: 'hidden', color: TEXT }}>

      {/* ── LEFT SIDEBAR — icon only ── */}
      <aside style={{ width: 62, background: CARD, borderRight: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 18, gap: 6, flexShrink: 0 }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 16, flexShrink: 0 }}>
            <span style={{ fontWeight: 800, fontSize: 15, color: TEXT, letterSpacing: '-0.3px' }}>
              <span style={{ color: A }}>Idiomas</span> WeLearn
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, overflow: 'hidden' }}>
            <button
              onClick={() => setActiveTab('overview')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 20, border: 'none', background: activeTab === 'overview' ? TEXT : 'transparent', color: activeTab === 'overview' ? '#fff' : MUTED, fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
              <LayoutDashboard size={13} /> Overview
            </button>
            <button
              onClick={() => setActiveTab('students')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 20, border: 'none', background: activeTab === 'students' ? TEXT : 'transparent', color: activeTab === 'students' ? '#fff' : MUTED, fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
              <Users size={13} /> Estudiantes
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 20, border: 'none', background: activeTab === 'leads' ? '#14215c' : 'transparent', color: activeTab === 'leads' ? '#fff' : MUTED, fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
              <MessageCircle size={13} /> Leads ICFES {data.icfesLeads.length > 0 && <span style={{ background: A, color: '#fff', borderRadius: 10, fontSize: 10, fontWeight: 800, padding: '1px 6px', marginLeft: 2 }}>{data.icfesLeads.length}</span>}
            </button>
            <a
              href="/dashboard/admin/live/create"
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 20, border: 'none', background: 'rgba(99,60,180,0.25)', color: '#a78bfa', fontSize: 12, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', flexShrink: 0 }}>
              🎬 Live Quiz
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: MUTED }}>
              <Calendar size={12} />
              <span style={{ whiteSpace: 'nowrap' }}>{dateStr}</span>
            </div>
            <form action={signOut} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: A, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                JD
              </div>
              <button type="submit" style={{
                padding: '5px 12px', borderRadius: 8, border: `1px solid ${BORDER}`,
                background: 'transparent', color: MUTED, fontSize: 11, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}>
                Salir
              </button>
            </form>
          </div>
        </header>

        {/* CONTENT */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* ── STUDENTS TAB ── */}
          {activeTab === 'students' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: TEXT, letterSpacing: '-0.03em' }}>
                  Estudiantes
                </h1>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  {(['autodidacta', 'preparacion', 'intensivo'] as const).map(p => {
                    const count = data.students.filter(s => s.plan === p).length
                    const color = p === 'intensivo' ? '#c8202e' : p === 'preparacion' ? '#1a2ecc' : '#6b7280'
                    return (
                      <div key={p} style={{ textAlign: 'center' }}>
                        <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: TEXT }}>{count}</p>
                        <p style={{ margin: 0, fontSize: 10, color, fontWeight: 700, textTransform: 'capitalize' }}>{p}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
              <Card>
                <StudentList students={data.students} />
              </Card>
            </div>
          )}

          {/* ── LEADS ICFES TAB ── */}
          {activeTab === 'leads' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: TEXT, letterSpacing: '-0.03em' }}>
                  Leads ICFES 🇨🇴
                </h1>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: MUTED }}>{data.icfesLeads.length} registros</span>
                  <a
                    href={`data:text/csv;charset=utf-8,${encodeURIComponent(
                      ['Nombre', 'WhatsApp', 'Email', 'Puntaje', 'Fecha'].join(',') + '\n' +
                      data.icfesLeads.map((l: LeadRow) =>
                        [l.name ?? '', l.whatsapp ?? '', l.email ?? '', l.exam_score ?? '', new Date(l.created_at).toLocaleString('es-CO')].map(v => `"${v}"`).join(',')
                      ).join('\n')
                    )}`}
                    download="leads-icfes.csv"
                    style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 8, border: `1px solid ${BORDER}`, background: CARD, fontSize: 11, color: TEXT, textDecoration: 'none', fontWeight: 600 }}>
                    <Download size={12} /> Exportar CSV
                  </a>
                </div>
              </div>
              <Card>
                {data.icfesLeads.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ fontSize: 32, marginBottom: 8 }}>📋</p>
                    <p style={{ color: MUTED, fontSize: 14 }}>Aún no hay leads. Cuando alguien complete un simulacro ICFES y deje sus datos, aparecerán aquí.</p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr style={{ borderBottom: `2px solid ${BORDER}` }}>
                          {['Nombre', 'WhatsApp', 'Email', 'Puntaje', 'Fecha'].map(h => (
                            <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                          <th style={{ padding: '8px 12px' }} />
                        </tr>
                      </thead>
                      <tbody>
                        {data.icfesLeads.map((lead: LeadRow, i: number) => (
                          <tr key={lead.id} style={{ borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? CARD : BG, transition: 'background 0.1s' }}>
                            <td style={{ padding: '10px 12px', fontWeight: 600, color: TEXT }}>{lead.name ?? <span style={{ color: MUTED }}>—</span>}</td>
                            <td style={{ padding: '10px 12px' }}>
                              {lead.whatsapp ? (
                                <a
                                  href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${lead.name ?? ''}, vi que completaste el simulacro ICFES en WeLearn. ¿Te puedo ayudar a prepararte?`)}`}
                                  target="_blank" rel="noopener noreferrer"
                                  style={{ color: '#16a34a', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                                  💬 {lead.whatsapp}
                                </a>
                              ) : <span style={{ color: MUTED }}>—</span>}
                            </td>
                            <td style={{ padding: '10px 12px', color: MUTED, fontSize: 12 }}>{lead.email ?? '—'}</td>
                            <td style={{ padding: '10px 12px' }}>
                              {lead.exam_score ? (
                                <span style={{ fontWeight: 700, color: A, fontSize: 13 }}>{lead.exam_score}</span>
                              ) : <span style={{ color: MUTED }}>—</span>}
                            </td>
                            <td style={{ padding: '10px 12px', color: MUTED, fontSize: 11, whiteSpace: 'nowrap' }}>
                              {new Date(lead.created_at).toLocaleString('es-CO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td style={{ padding: '10px 12px' }}>
                              <a
                                href={`https://wa.me/${(lead.whatsapp ?? '').replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${lead.name ?? ''}, vi que completaste el simulacro ICFES en WeLearn. ¿Te puedo ayudar a prepararte?`)}`}
                                target="_blank" rel="noopener noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 8, background: '#dcfce7', color: '#16a34a', fontSize: 11, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                                Escribir →
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* ── OVERVIEW TAB ── */}
          {activeTab === 'overview' && <>

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
          {(() => {
            const oneWeekAgo = new Date(now.getTime() - 7 * 86400000)
            const newStudentsThisWeek = data.students.filter(s => {
              if (!s.enrolled_at) return false
              return new Date(s.enrolled_at) >= oneWeekAgo
            }).length
            return (
              <Card style={{ padding: '16px 24px' }}>
                <div style={{ display: 'flex', gap: 0, alignItems: 'stretch', flexWrap: 'wrap' }}>
                  <Stat label="Simulacros totales" value={String(data.totalCount)} sub="enviados" />
                  <div style={{ width: 1, background: BORDER, margin: '0 20px' }} />
                  <Stat label="Esta semana" value={String(data.thisWeekCount)} sub="simulacros" />
                  <div style={{ width: 1, background: BORDER, margin: '0 20px' }} />
                  <Stat label="Semana anterior" value={String(data.lastWeekCount)} sub="simulacros" />
                  <div style={{ width: 1, background: BORDER, margin: '0 20px' }} />
                  <Stat label="Exámenes distintos" value={String(data.perExam.length)} sub="tipos" />
                  <div style={{ width: 1, background: BORDER, margin: '0 20px' }} />
                  <Stat label="Estudiantes" value={String(data.students.length)} sub="registrados" />
                  {newStudentsThisWeek > 0 && (
                    <>
                      <div style={{ width: 1, background: BORDER, margin: '0 20px' }} />
                      <Stat label="Nuevos esta semana" value={String(newStudentsThisWeek)} sub="estudiantes" />
                    </>
                  )}
                </div>
              </Card>
            )
          })()}

          {/* Row 2: Exam breakdown + Top users */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>

            {/* Exam bar chart */}
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <h3 style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 700 }}>Simulacros por examen</h3>
                  <div style={{ display: 'flex', gap: 20 }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 10, color: MUTED }}>Total</p>
                      <p style={{ margin: 0, fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>{data.totalCount}</p>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: 10, color: MUTED }}>Esta semana</p>
                      <p style={{ margin: 0, fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: trendColor }}>{data.thisWeekCount}</p>
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: 11, color: trendColor, fontWeight: 700, paddingTop: 4 }}>{trend}</span>
              </div>
              {examBarData.length > 0 ? (
                <ResponsiveContainer width="100%" height={155}>
                  <BarChart data={examBarData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ background: TEXT, border: 'none', borderRadius: 8, color: '#fff', fontSize: 11, padding: '8px 12px' }}
                      labelStyle={{ color: '#ccc', marginBottom: 4 }}
                      formatter={(v) => [v, 'Simulacros']}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {examBarData.map((d, i) => (
                        <Cell key={i} fill={EXAM_COLORS[d.slug] ?? A} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ height: 155, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUTED, fontSize: 13 }}>
                  Sin datos aún
                </div>
              )}
            </Card>

            {/* Estado exámenes — per-exam summary */}
            <Card style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>Estado exámenes</h3>
                <button style={{ width: 26, height: 26, borderRadius: 7, border: `1px solid ${BORDER}`, background: 'transparent', color: MUTED, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ArrowUpRight size={13} />
                </button>
              </div>
              <p style={{ margin: '0 0 10px', fontSize: 11, color: MUTED }}>
                Estudiantes únicos: <strong style={{ color: TEXT, fontWeight: 700 }}>{data.topUsers.length}</strong>
              </p>
              {/* Color bars */}
              {data.perExam.length > 0 && (
                <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>
                  {data.perExam.slice(0, 3).map(e => (
                    <div key={e.exam_slug} style={{ flex: e.count, height: 58, background: EXAM_COLORS[e.exam_slug] ?? A, borderRadius: 10 }} />
                  ))}
                </div>
              )}
              {/* Legend */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {data.perExam.slice(0, 3).map(e => (
                  <div key={e.exam_slug} style={{ flex: 1, minWidth: 60 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: EXAM_COLORS[e.exam_slug] ?? A }} />
                      <span style={{ fontSize: 10, color: MUTED }}>{e.exam_name}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: TEXT }}>{e.count}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* IELTS Pending Review Panel */}
          {data.pendingIelts.length > 0 && (
            <IELTSPendingPanel items={data.pendingIelts} />
          )}

          {/* Row 3: Recent submissions + Top users */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>

            {/* Recent submissions table */}
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>Últimos simulacros</h3>
                <button style={{ width: 26, height: 26, borderRadius: 7, border: `1px solid ${BORDER}`, background: 'transparent', color: MUTED, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Download size={13} />
                </button>
              </div>
              {data.recentSubmissions.length === 0 ? (
                <p style={{ color: MUTED, fontSize: 13, textAlign: 'center', padding: '20px 0' }}>Sin simulacros registrados aún</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                    <thead>
                      <tr>
                        {['Email', 'Examen', 'Resultado', 'Fecha'].map(h => (
                          <th key={h} style={{ textAlign: 'left', padding: '4px 8px', color: MUTED, fontWeight: 600, fontSize: 10, borderBottom: `1px solid ${BORDER}`, whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.recentSubmissions.map((s, i) => (
                        <motion.tr
                          key={s.id}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03 }}
                          style={{ borderBottom: `1px solid ${BORDER}` }}
                        >
                          <td style={{ padding: '7px 8px', color: TEXT, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {s.user_email ?? <span style={{ color: MUTED }}>anónimo</span>}
                          </td>
                          <td style={{ padding: '7px 8px', color: TEXT }}>{s.exam_name}</td>
                          <td style={{ padding: '7px 8px', fontWeight: 700, color: A }}>{s.total_label ?? '—'}</td>
                          <td style={{ padding: '7px 8px', color: MUTED, whiteSpace: 'nowrap' }}>{formatDate(s.created_at)}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>

            {/* Top users */}
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>Top estudiantes</h3>
              </div>
              {data.topUsers.length === 0 ? (
                <p style={{ color: MUTED, fontSize: 13, textAlign: 'center', padding: '20px 0' }}>Sin datos aún</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {data.topUsers.map((u, i) => (
                    <div key={u.user_email} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: i === 0 ? A : BORDER, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: i === 0 ? '#fff' : MUTED, flexShrink: 0 }}>
                        {i + 1}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: 11, color: TEXT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {u.user_email}
                        </p>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 800, color: TEXT }}>{u.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          </>}

        </main>
      </div>
    </div>
  )
}
