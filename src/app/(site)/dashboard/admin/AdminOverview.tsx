'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowRight, ClipboardCheck, MessageCircle, RefreshCw, UserRoundSearch } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { AdminViewer, DashboardData } from './JoseDashboardServer'
import TrafficOverview from './TrafficOverview'
import LivePresenceCard from './LivePresenceCard'
import styles from './admin-overview.module.css'

type Period = 7 | 30 | 90
const bogotaDay = (value: string | Date) => {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date(value))
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? ''
  return `${get('year')}-${get('month')}-${get('day')}`
}

export default function AdminOverview({ data, viewer, onTabChange }: {
  data: DashboardData
  viewer: AdminViewer
  onTabChange: (tab: 'students' | 'leads' | 'reviews') => void
}) {
  const [period, setPeriod] = useState<Period>(30)
  const [exam, setExam] = useState('all')
  const router = useRouter()
  const exams = useMemo(() => Array.from(new Map(data.submissions.map((submission) => [submission.exam_slug, submission.exam_name])).entries()).sort((a, b) => a[1].localeCompare(b[1])), [data.submissions])
  const cutoff = new Date(data.generatedAt).getTime() - period * 86_400_000
  const filtered = data.submissions.filter((submission) => new Date(submission.created_at).getTime() >= cutoff && (exam === 'all' || submission.exam_slug === exam))
  const periodLeads = data.leads.filter((lead) => new Date(lead.created_at).getTime() >= cutoff && (exam === 'all'
    || lead.exam_slug === exam
    || lead.source === `${exam}-practica`
    || (exam === 'icfes' && lead.source === 'icfes-post-result-gate-v1')
    || lead.exam_label === exams.find(([slug]) => slug === exam)?.[1]))
  const examLabel = exam === 'all' ? 'Todos los exámenes' : exams.find(([slug]) => slug === exam)?.[1] ?? exam
  const knownScores = filtered.filter((submission) => submission.total_score !== null && submission.total_max !== null && submission.total_max > 0)
  const average = knownScores.length ? Math.round(knownScores.reduce((sum, submission) => sum + ((submission.total_score ?? 0) / (submission.total_max ?? 1)) * 100, 0) / knownScores.length) : null
  const people = new Set(filtered.map((submission) => submission.user_id || submission.user_email).filter(Boolean)).size
  const chart = Array.from({ length: period }, (_, index) => {
    const day = new Date(new Date(data.generatedAt).getTime() - (period - index - 1) * 86_400_000)
    return { key: bogotaDay(day), label: day.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', timeZone: 'America/Bogota' }), count: 0 }
  })
  const chartByDay = new Map(chart.map((day) => [day.key, day]))
  for (const submission of filtered) {
    const key = bogotaDay(submission.created_at)
    const day = chartByDay.get(key)
    if (day) day.count += 1
  }
  const byExam = Array.from(filtered.reduce((counts, submission) => counts.set(submission.exam_name, (counts.get(submission.exam_name) ?? 0) + 1), new Map<string, number>())).sort((a, b) => b[1] - a[1]).slice(0, 5)
  const pendingReviews = [...data.ieltsReviews, ...data.toeflReviews, ...data.goetheReviews].filter((item) => !item.reviewed_at).length
  const newLeads = data.leads.filter((lead) => lead.lead_status === 'new' && Boolean(lead.whatsapp)).length
  const followUpCutoff = new Date(data.generatedAt).getTime() - 14 * 86_400_000
  const followUp = data.students.filter((student) => student.last_active
    ? new Date(student.last_active).getTime() < followUpCutoff
    : Boolean(student.enrolled_at && new Date(student.enrolled_at).getTime() < followUpCutoff)).length

  return <div className={styles.overview}>
    <div className={styles.heading}>
      <div><p className={styles.kicker}>WeLearn · panel de control</p><h1>Centro operativo</h1><p>Hola, {viewer.displayName}. Revisa actividad, oportunidades y tareas desde un mismo lugar.</p></div>
      <button type="button" onClick={() => router.refresh()} className={styles.refresh}><RefreshCw size={15} /> Actualizar datos</button>
    </div>
    <div className={styles.filters} aria-label="Filtros del resumen">
      <label>Periodo<select value={period} onChange={(event) => setPeriod(Number(event.target.value) as Period)}><option value={7}>Últimos 7 días</option><option value={30}>Últimos 30 días</option><option value={90}>Últimos 90 días</option></select></label>
      <label>Examen<select value={exam} onChange={(event) => setExam(event.target.value)}><option value="all">Todos los exámenes</option>{exams.map(([slug, name]) => <option key={slug} value={slug}>{name}</option>)}</select></label>
      <span>{examLabel} · {filtered.length} registros en el periodo</span>
    </div>
    <div className={styles.kpis}>
      <article><span>Simulacros completados</span><strong>{filtered.length}</strong><small>en {period} días</small></article>
      <article><span>Personas evaluadas</span><strong>{people}</strong><small>con identidad registrada</small></article>
      <article><span>Puntuación media</span><strong>{average === null ? '—' : `${average}%`}</strong><small>{knownScores.length} resultados medibles</small></article>
      <article><span>Leads de simulacros</span><strong>{periodLeads.length}</strong><small>en {period} días</small></article>
    </div>
    <div className={styles.priorityGrid} aria-label="Prioridades operativas">
      <button type="button" onClick={() => onTabChange('reviews')}><span className={styles.priorityIcon}><ClipboardCheck size={18} /></span><span><strong>{pendingReviews} correcciones pendientes</strong><small>IELTS, TOEFL y Goethe</small></span><ArrowRight size={16} /></button>
      <button type="button" onClick={() => onTabChange('leads')}><span className={styles.priorityIcon}><MessageCircle size={18} /></span><span><strong>{newLeads} leads nuevos con WhatsApp</strong><small>Listos para contacto</small></span><ArrowRight size={16} /></button>
      <button type="button" onClick={() => onTabChange('students')}><span className={styles.priorityIcon}><UserRoundSearch size={18} /></span><span><strong>{followUp} estudiantes por revisar</strong><small>Sin actividad en 14 días o más</small></span><ArrowRight size={16} /></button>
    </div>
    <div className={styles.chartGrid}>
      <section className={styles.panel} aria-labelledby="activity-title"><div className={styles.panelHead}><div><h2 id="activity-title">Actividad de exámenes</h2><p>Simulacros completados por día</p></div><strong>{filtered.length}</strong></div>
        {filtered.length ? <div className={styles.chart}><ResponsiveContainer width="100%" height={230} minWidth={0}><AreaChart data={chart} margin={{ top: 12, right: 10, left: -25, bottom: 0 }}><defs><linearGradient id="adminArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3971c7" stopOpacity={0.28}/><stop offset="100%" stopColor="#3971c7" stopOpacity={0.01}/></linearGradient></defs><CartesianGrid stroke="#e6ebf2" vertical={false} strokeDasharray="3 4"/><XAxis dataKey="label" tick={{ fill: '#718098', fontSize: 10 }} tickLine={false} axisLine={false} minTickGap={25}/><YAxis allowDecimals={false} tick={{ fill: '#718098', fontSize: 10 }} tickLine={false} axisLine={false}/><Tooltip formatter={(value) => [value, 'Simulacros']}/><Area type="monotone" dataKey="count" stroke="#3971c7" strokeWidth={2.5} fill="url(#adminArea)" /></AreaChart></ResponsiveContainer></div> : <div className={styles.emptyChart}>No hay simulacros para los filtros elegidos.</div>}
      </section>
      <section className={styles.panel} aria-labelledby="mix-title"><div className={styles.panelHead}><div><h2 id="mix-title">Exámenes más usados</h2><p>Distribución del periodo</p></div></div>{byExam.length ? <div className={styles.examList}>{byExam.map(([name, count]) => <div key={name}><span>{name}</span><div><i style={{ width: `${Math.max(4, count / filtered.length * 100)}%` }}/></div><strong>{count}</strong></div>)}</div> : <p className={styles.emptyText}>Aparecerán cuando haya actividad.</p>}</section>
    </div>
    <section className={styles.panel} aria-labelledby="recent-title"><div className={styles.panelHead}><div><h2 id="recent-title">Actividad reciente</h2><p>Últimos resultados según los filtros</p></div><button type="button" onClick={() => onTabChange('students')}>Ver estudiantes <ArrowRight size={14}/></button></div>
      {filtered.length ? <div className={styles.tableScroll}><table><thead><tr><th>Estudiante</th><th>Examen</th><th>Resultado</th><th>Fecha</th><th>Acción</th></tr></thead><tbody>{filtered.slice(0, 8).map((submission) => <tr key={submission.id}><td>{submission.user_name || submission.user_email || 'Sin identificar'}{submission.user_name && submission.user_email ? <small>{submission.user_email}</small> : null}</td><td>{submission.exam_name}</td><td><strong>{submission.total_label || '—'}</strong></td><td>{new Date(submission.created_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'America/Bogota' })}</td><td>{submission.user_id ? <Link href={`/dashboard/admin/estudiantes/${submission.user_id}`}>Abrir ficha →</Link> : '—'}</td></tr>)}</tbody></table></div> : <p className={styles.emptyText}>Sin resultados en este periodo.</p>}
    </section>
    <LivePresenceCard />
    <TrafficOverview traffic={data.traffic} completedExams7d={data.completedExams7d} examLeads7d={data.examLeads7d} />
    <p className={styles.scopeNote}>Resumen calculado a partir de los registros disponibles. El panel de tráfico conserva su propio periodo de 7 días.</p>
  </div>
}
