'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard, Users, FileText, DollarSign,
  MessageCircle, Globe, BookOpen, GraduationCap,
  Calendar, Download,
  KeyRound,
  ClipboardCheck,
} from 'lucide-react'
import type React from 'react'
import { signOut } from '@/lib/actions/signOut'
import type { AdminViewer, DashboardData, LeadRow } from './JoseDashboardServer'
import StudentList from './StudentList'
import IELTSReviewPanel from './IELTSReviewPanel'
import TOEFLReviewPanel from './TOEFLReviewPanel'
import GoetheReviewPanel from './GoetheReviewPanel'
import AdminOverview from './AdminOverview'
import { updateLeadStatus, type LeadStatus } from './lead-actions'
import styles from './admin-navigation.module.css'

// ─── Palette ─────────────────────────────────────────────────────────────────
const A  = '#c87941'   // accent orange
const BG   = '#f5f0eb'
const CARD = '#ffffff'
const TEXT = '#1a1a2e'
const MUTED  = '#9ca3af'
const BORDER = '#e8ddd4'
// ─── Shared components ────────────────────────────────────────────────────────
function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: CARD, borderRadius: 16, padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', ...style }}>
      {children}
    </div>
  )
}

// ─── Leads de simulacros ──────────────────────────────────────────────────────
// El panel recibe leads de TODOS los simulacros (ICFES, SAT, IELTS, TOPIK...).
// Sin la columna «Examen» un «63/100» del SAT se lee como un puntaje ICFES.
const LEAD_EXAM_UNKNOWN = 'Sin identificar'

// Las claves son los `name` de src/data/exams.ts, que es de donde sale la
// etiqueta. Un examen sin color aquí se pinta gris: se ve, no se rompe.
const LEAD_EXAM_COLORS: Record<string, string> = {
  ICFES:                '#14215c',
  SAT:                  '#6d28d9',
  IELTS:                '#c8202e',
  'TOEFL iBT':          '#2563eb',
  'TOPIK I':            '#0f766e',
  'Cambridge B2 First': '#b45309',
  'Goethe-Zertifikat':  '#d4a017',
  'DELF / DALF':        '#1a2ecc',
  'CILS / CELI':        '#166534',
  'CELPE-BRAS':         '#15803d',
  'Nivel Radar':        '#e73e4e',
}

function leadExamName(lead: LeadRow): string {
  return lead.exam_label ?? LEAD_EXAM_UNKNOWN
}

function leadExamColor(lead: LeadRow): string {
  return LEAD_EXAM_COLORS[leadExamName(lead)] ?? '#6b7280'
}

/** El mensaje de WhatsApp nombra el examen que hizo el lead. Antes le decía
 *  «simulacro ICFES» a todo el mundo, incluido quien había hecho el SAT. */
function leadWaHref(lead: LeadRow): string | null {
  const digits = (lead.whatsapp ?? '').replace(/\D/g, '')
  if (!digits) return null
  const saludo = lead.name ? `Hola ${lead.name}` : 'Hola'
  const examen = lead.exam_label === 'Nivel Radar'
    ? 'tu diagnóstico Nivel Radar'
    : lead.exam_label ? `el simulacro ${lead.exam_label}` : 'un simulacro'
  const priority = typeof lead.profile_data?.priority === 'string' ? ` Tu prioridad fue ${lead.profile_data.priority}.` : ''
  const msg = `${saludo}, vi que completaste ${examen} en WeLearn.${priority} ¿Te puedo ayudar a construir tu ruta de estudio?`
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`
}

const LEAD_STATUS_LABELS: Record<LeadRow['lead_status'], string> = {
  new: 'Nuevo',
  contacted: 'Contactado',
  qualified: 'Calificado',
  converted: 'Convertido',
  discarded: 'Descartado',
}

function leadAcquisition(lead: LeadRow): string {
  const campaign = lead.utm_campaign?.trim()
  const channel = [lead.utm_source, lead.utm_medium].filter(Boolean).join(' / ')
  return campaign ? `${channel || 'Campaña'} · ${campaign}` : channel || lead.referrer_host || 'Directo / sin UTM'
}

function csvCell(v: string): string {
  return `"${v.replace(/"/g, '""')}"`
}

function leadsCsv(leads: LeadRow[]): string {
  const head = ['Nombre', 'WhatsApp', 'Email', 'Examen', 'Puntaje', 'Origen', 'Campaña', 'Estado', 'Consentimiento contacto', 'Marketing', 'Landing', 'Fecha']
  const rows = leads.map(l => [
    l.name ?? '',
    l.whatsapp ?? '',
    l.email ?? '',
    leadExamName(l),
    l.exam_score ?? '',
    [l.utm_source, l.utm_medium].filter(Boolean).join(' / ') || l.referrer_host || 'directo',
    l.utm_campaign ?? '',
    LEAD_STATUS_LABELS[l.lead_status],
    l.contact_consent_at ? 'sí' : 'no registrado',
    l.marketing_consent ? 'sí' : 'no',
    l.landing_page ?? '',
    new Date(l.created_at).toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
  ])
  return [head, ...rows].map(r => r.map(csvCell).join(',')).join('\n')
}

// ─── Main ─────────────────────────────────────────────────────────────────────
type Tab = 'overview' | 'students' | 'leads' | 'reviews'

const SIDEBAR_ITEMS: { Icon: React.ElementType; tab: Tab | null; href?: string; label: string; highlight?: boolean }[] = [
  { Icon: LayoutDashboard, tab: 'overview', label: 'Centro operativo' },
  { Icon: Users,           tab: 'students', label: 'Estudiantes' },
  { Icon: ClipboardCheck,  tab: 'reviews', label: 'Corrección de exámenes' },
  { Icon: FileText,        tab: null, href: '/dashboard/admin/revisiones-xpress', label: 'Revisiones Xpress' },
  { Icon: KeyRound,        tab: null, href: '/dashboard/admin/claves', label: 'Claves de exámenes', highlight: true },
  { Icon: KeyRound,        tab: null, href: '/dashboard/admin/codigos-examen', label: 'Códigos de examen' },
  { Icon: MessageCircle,   tab: 'leads', label: 'Leads' },
  { Icon: DollarSign,      tab: null, href: '/dashboard/admin/pagos', label: 'Pagos y finanzas' },
  { Icon: Globe,           tab: null, href: '/dashboard/admin/contactos', label: 'Origen de contactos' },
  { Icon: BookOpen,        tab: null, href: '/dashboard/admin/live/create', label: 'Live Quiz' },
]

export default function JoseDashboard({ data, viewer }: { data: DashboardData; viewer: AdminViewer }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [leadExam, setLeadExam] = useState<string>('todos')
  const [leadStatus, setLeadStatus] = useState<LeadStatus | 'todos'>('todos')
  const [leadSearch, setLeadSearch] = useState('')
  const [leadStatuses, setLeadStatuses] = useState<Record<string, LeadStatus>>({})
  const [savingLead, setSavingLead] = useState<string | null>(null)
  const [leadError, setLeadError] = useState<string | null>(null)

  // Exámenes presentes en los leads, de más a menos. Se calcula de los datos:
  // cuando entre un examen nuevo aparece solo, sin tocar este archivo.
  const leadExamOptions = Array.from(
    data.leads.reduce(
      (m, l) => m.set(leadExamName(l), (m.get(leadExamName(l)) ?? 0) + 1),
      new Map<string, number>(),
    ),
  ).sort((a, b) => b[1] - a[1])

  const visibleLeads = data.leads.map(lead => ({ ...lead, lead_status: leadStatuses[lead.id] ?? lead.lead_status })).filter(lead => {
    if (leadExam !== 'todos' && leadExamName(lead) !== leadExam) return false
    if (leadStatus !== 'todos' && lead.lead_status !== leadStatus) return false
    const query = leadSearch.trim().toLowerCase()
    return !query || [lead.name, lead.email, lead.whatsapp].some(value => value?.toLowerCase().includes(query))
  })

  async function changeLeadStatus(lead: LeadRow, status: LeadStatus) {
    setSavingLead(lead.id)
    setLeadError(null)
    try {
      const result = await updateLeadStatus(lead.id, status)
      if (!result.ok) { setLeadError(result.error ?? 'No se pudo guardar el estado.'); return }
      setLeadStatuses(current => ({ ...current, [lead.id]: status }))
      router.refresh()
    } catch {
      setLeadError('No se pudo guardar el estado. Comprueba la conexión e intenta de nuevo.')
    } finally {
      setSavingLead(null)
    }
  }

  const now = new Date(data.generatedAt)
  const dateStr = now.toLocaleDateString('es-CO', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
    timeZone: 'America/Bogota',
  })

  const pendingReviewCount = [...data.ieltsReviews, ...data.toeflReviews, ...data.goetheReviews].filter(submission => !submission.reviewed_at).length

  return (
    <div className={styles.adminShell} style={{ display: 'flex', height: '100vh', background: '#f3f6fb', fontFamily: "system-ui,-apple-system,'Segoe UI',sans-serif", overflow: 'hidden', color: TEXT }}>

      {/* ── LEFT SIDEBAR ── */}
      <aside className={styles.sidebar} aria-label="Navegación del administrador">
        <div className={styles.brand}>
          <GraduationCap size={18} color="#fff" />
          <span>Administración</span>
        </div>
        {SIDEBAR_ITEMS.map(({ Icon, tab, href, label, highlight }, i) => (
          href ? <Link key={i} href={href} className={`${styles.item} ${highlight ? styles.highlight : ''}`} title={label}><Icon size={17} /><span>{label}</span></Link>
            : <button key={i} type="button" onClick={() => tab && setActiveTab(tab)} className={`${styles.item} ${tab === activeTab ? styles.active : ''}`} title={label} aria-current={tab === activeTab ? 'page' : undefined}><Icon size={17} /><span>{label}</span></button>
        ))}
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* TOP BAR */}
        <header style={{ background: CARD, borderBottom: '1px solid #dce5f0', padding: '0 20px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 16, flexShrink: 0 }}>
            <span style={{ fontWeight: 800, fontSize: 15, color: TEXT, letterSpacing: '-0.3px' }}>
              <span style={{ color: A }}>Idiomas</span> WeLearn
            </span>
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <div className={styles.dateStamp} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: MUTED }}>
              <Calendar size={12} />
              <span style={{ whiteSpace: 'nowrap' }}>{dateStr}</span>
            </div>
            <form action={signOut} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: A, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                {viewer.initials}
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
        <main style={{ flex: 1, overflowY: 'auto', padding: '26px clamp(15px, 2.5vw, 34px)', display: 'flex', flexDirection: 'column', gap: 14 }}>
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
                <StudentList students={data.students} submissions={data.submissions} />
              </Card>
            </div>
          )}

          {/* ── LEADS TAB (todos los simulacros: ICFES, SAT, IELTS, TOPIK...) ── */}
          {activeTab === 'leads' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
                <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: TEXT, letterSpacing: '-0.03em' }}>
                  Leads de diagnósticos y simulacros
                </h1>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                  {leadExamOptions.length > 1 && (
                    <select
                      value={leadExam}
                      onChange={e => setLeadExam(e.target.value)}
                      aria-label="Filtrar leads por examen"
                      style={{ padding: '6px 10px', borderRadius: 8, border: `1px solid ${BORDER}`, background: CARD, fontSize: 11, color: TEXT, fontWeight: 600, cursor: 'pointer' }}>
                      <option value="todos">Todos los exámenes ({data.leads.length})</option>
                      {leadExamOptions.map(([name, count]) => (
                        <option key={name} value={name}>{name} ({count})</option>
                      ))}
                    </select>
                  )}
                  <select value={leadStatus} onChange={e => setLeadStatus(e.target.value as LeadStatus | 'todos')} aria-label="Filtrar leads por estado" style={{ padding: '7px 10px', borderRadius: 7, border: '1px solid #cbd6e5', background: CARD, fontSize: 11, color: TEXT }}>
                    <option value="todos">Todos los estados</option>
                    {Object.entries(LEAD_STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                  <input type="search" value={leadSearch} onChange={e => setLeadSearch(e.target.value)} placeholder="Buscar nombre, correo o WhatsApp" aria-label="Buscar leads" style={{ padding: '7px 10px', minWidth: 210, borderRadius: 7, border: '1px solid #cbd6e5', background: CARD, fontSize: 11, color: TEXT }} />
                  <span style={{ fontSize: 12, color: MUTED }}>{visibleLeads.length} registros</span>
                  <a
                    href={`data:text/csv;charset=utf-8,${encodeURIComponent(leadsCsv(visibleLeads))}`}
                    download={leadExam === 'todos' ? 'leads-simulacros.csv' : `leads-${leadExam.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`}
                    style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 8, border: `1px solid ${BORDER}`, background: CARD, fontSize: 11, color: TEXT, textDecoration: 'none', fontWeight: 600 }}>
                    <Download size={12} /> Exportar CSV
                  </a>
                </div>
              </div>
              {leadError ? <p role="alert" style={{ color: '#b42318', fontSize: 12, margin: '0 0 12px' }}>{leadError}</p> : null}
              <Card>
                {visibleLeads.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ fontSize: 32, marginBottom: 8 }}>📋</p>
                    <p style={{ color: MUTED, fontSize: 14 }}>
                      {data.leads.length === 0
                        ? 'Aún no hay leads. Cuando alguien complete un diagnóstico o simulacro y deje sus datos, aparecerá aquí.'
                        : `Ningún lead de ${leadExam} por ahora.`}
                    </p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr style={{ borderBottom: `2px solid ${BORDER}` }}>
                          {['Nombre', 'WhatsApp', 'Email', 'Producto', 'Resultado', 'Adquisición', 'Estado', 'Fecha'].map(h => (
                            <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                          <th style={{ padding: '8px 12px' }} />
                        </tr>
                      </thead>
                      <tbody>
                        {visibleLeads.map((lead: LeadRow, i: number) => {
                          const waHref = leadWaHref(lead)
                          return (
                          <tr key={lead.id} style={{ borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? CARD : BG, transition: 'background 0.1s' }}>
                            <td style={{ padding: '10px 12px', fontWeight: 600, color: TEXT }}>{lead.name ?? <span style={{ color: MUTED }}>—</span>}</td>
                            <td style={{ padding: '10px 12px' }}>
                              {waHref ? (
                                <a
                                  href={waHref}
                                  target="_blank" rel="noopener noreferrer"
                                  style={{ color: '#16a34a', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                                  💬 {lead.whatsapp}
                                </a>
                              ) : <span style={{ color: MUTED }}>—</span>}
                            </td>
                            <td style={{ padding: '10px 12px', color: MUTED, fontSize: 12 }}>{lead.email ?? '—'}</td>
                            <td style={{ padding: '10px 12px' }}>
                              <span style={{ display: 'inline-block', padding: '3px 9px', borderRadius: 20, background: `${leadExamColor(lead)}1a`, color: leadExamColor(lead), fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap' }}>
                                {leadExamName(lead)}
                              </span>
                            </td>
                            <td style={{ padding: '10px 12px' }}>
                              {lead.exam_score ? (
                                <span style={{ fontWeight: 700, color: A, fontSize: 13 }}>{lead.exam_score}</span>
                              ) : <span style={{ color: MUTED }}>—</span>}
                            </td>
                            <td style={{ padding: '10px 12px', color: MUTED, fontSize: 11, minWidth: 150 }}>
                              {leadAcquisition(lead)}
                              <div style={{ marginTop: 3, color: lead.marketing_consent ? '#16a34a' : MUTED }}>
                                Contacto: {lead.contact_consent_at ? 'sí' : 'histórico'} · Marketing: {lead.marketing_consent ? 'sí' : 'no'}
                              </div>
                            </td>
                            <td style={{ padding: '10px 12px' }}>
                              {lead.id.startsWith('submission-') ? <span title="Contacto histórico sin registro editable" style={{ color: MUTED, fontSize: 10 }}>Histórico</span> : <select aria-label={`Estado de ${lead.name ?? lead.email ?? 'lead'}`} value={lead.lead_status} disabled={savingLead === lead.id} onChange={event => void changeLeadStatus(lead, event.target.value as LeadStatus)} style={{ padding: '5px 8px', borderRadius: 6, border: '1px solid #cbd6e5', background: '#f3f7fc', color: '#244d8b', fontSize: 10, fontWeight: 750 }}>
                                {Object.entries(LEAD_STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                              </select>}
                            </td>
                            <td style={{ padding: '10px 12px', color: MUTED, fontSize: 11, whiteSpace: 'nowrap' }}>
                              {new Date(lead.created_at).toLocaleString('es-CO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota' })}
                            </td>
                            <td style={{ padding: '10px 12px' }}>
                              {waHref ? (
                                <a
                                  href={waHref}
                                  target="_blank" rel="noopener noreferrer"
                                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 8, background: '#dcfce7', color: '#16a34a', fontSize: 11, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                                  Escribir →
                                </a>
                              ) : <span style={{ color: MUTED, fontSize: 11 }}>Sin WhatsApp</span>}
                            </td>
                          </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* ── EXAM REVIEWS ── */}
          {activeTab === 'reviews' && <>
            <div><h1 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>Corrección de exámenes</h1><p style={{ color: MUTED, fontSize: 12 }}>Entregas pendientes e historial de revisión académica.</p></div>
            <div id="review-queues" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Card>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div><h3 style={{ margin: 0, fontSize: 14 }}>Nivel Radar · revisión diagnóstica</h3><p style={{ margin: '4px 0 0', color: MUTED, fontSize: 11 }}>Calificación ciega MCER y adjudicación independiente.</p></div>
                  <Link href="/dashboard/admin/nivel-radar" style={{ background: A, color: '#fff', borderRadius: 9, padding: '9px 12px', fontSize: 11, fontWeight: 800, textDecoration: 'none' }}>Abrir cola</Link>
                </div>
              </Card>
              {data.ieltsReviews.length > 0 && <IELTSReviewPanel items={data.ieltsReviews} />}
              {data.toeflReviews.length > 0 && <TOEFLReviewPanel items={data.toeflReviews} />}
              {data.goetheReviews.length > 0 && <GoetheReviewPanel items={data.goetheReviews} />}
              {pendingReviewCount === 0 && data.ieltsReviews.length + data.toeflReviews.length + data.goetheReviews.length === 0 && <Card><p style={{ margin: 0, color: MUTED, fontSize: 12 }}>No hay entregas abiertas para revisión académica.</p></Card>}
            </div>
          </>}

          {activeTab === 'overview' && <AdminOverview data={data} viewer={viewer} onTabChange={setActiveTab} />}

        </main>
      </div>
    </div>
  )
}
