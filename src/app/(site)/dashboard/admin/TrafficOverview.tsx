'use client'

import Link from 'next/link'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { AdminTrafficData } from '@/lib/admin-traffic/server'
import styles from './traffic-overview.module.css'

type Props = {
  traffic: AdminTrafficData
  completedExams7d: number
  examLeads7d: number
}

function labelDay(day: string): string {
  const [, month, date] = day.split('-')
  return `${date}/${month}`
}

function PagesList({ title, detail, pages, limited }: {
  title: string
  detail: string
  pages: AdminTrafficData['topPages']
  limited?: boolean
}) {
  return <section className={styles.pagesPanel}>
    <div className={styles.panelHead}><h3>{title}</h3><span>{detail}</span></div>
    {pages.length === 0
      ? <p className={styles.empty}>Aún no hay páginas registradas.</p>
      : <ol className={styles.pageList}>{pages.map(page => <li key={page.path}>
        <Link href={page.path} title={page.path}>{page.path}</Link>
        <strong>{limited ? '≥' : ''}{page.visitors}</strong>
      </li>)}</ol>}
  </section>
}

export default function TrafficOverview({ traffic, completedExams7d, examLeads7d }: Props) {
  return <section className={styles.shell} aria-labelledby="traffic-title">
    <div className={styles.heading}>
      <div><h2 id="traffic-title">Tráfico del sitio</h2><p>Personas, páginas y exámenes · últimos 7 días · hora de Colombia</p></div>
      <span className={styles.source}>Medición propia · navegadores identificados como personas</span>
    </div>

    {!traffic.available ? <div className={styles.notice} role="status">
      El registro de tráfico aún no está disponible. La actividad en vivo y las entregas de exámenes siguen visibles por separado.
    </div> : <>
      {(traffic.observedSince === null || traffic.daily.some(day => day.visitors === null)) && <div className={styles.notice} role="status">
        El historial de páginas empieza con esta versión del panel. Los días anteriores quedan sin dato, no como cero visitas.
      </div>}
      {traffic.limited && <div className={styles.notice} role="status">
        Se alcanzó el límite de lectura; las cifras de páginas pueden estar incompletas.
      </div>}
      <div className={styles.statGrid}>
        <article><span>Visitantes únicos</span><strong>{traffic.limited ? '≥' : ''}{traffic.visitors7d}</strong><small>Al menos una página pública en 7 días</small></article>
        <article><span>Llegaron en 15 min</span><strong>{traffic.arrived15m}</strong><small>Primera visita registrada hoy</small></article>
        <article><span>Dejaron de estar activos</span><strong>{traffic.inactive15m}</strong><small>Sin señal por más de 90 s, vistos en 15 min</small></article>
        <article><span>Abrieron un examen</span><strong>{traffic.limited ? '≥' : ''}{traffic.examPageVisitors7d}</strong><small>Personas en páginas de simulacros</small></article>
      </div>
      <div className={styles.middleGrid}>
        <section className={styles.chartPanel}>
          <div className={styles.panelHead}><h3>Visitantes por día</h3><span>Un navegador cuenta una vez por día</span></div>
          <div className={styles.chart} role="img" aria-label={`Visitantes diarios: ${traffic.daily.map(day => `${labelDay(day.day)}: ${day.visitors ?? 'sin dato'}`).join(', ')}`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={traffic.daily.map(day => ({ ...day, label: labelDay(day.day) }))} margin={{ top: 12, right: 8, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 5" vertical={false} stroke="#ebe5df" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={11} stroke="#728090" />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={11} stroke="#728090" />
                <Tooltip formatter={value => [Number(value), 'Visitantes']} cursor={{ fill: '#f7eee7' }} />
                <Bar dataKey="visitors" fill="#c87941" radius={[5, 5, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className={styles.examPanel}>
          <div className={styles.panelHead}><h3>Actividad de exámenes</h3><span>Últimos 7 días</span></div>
          <div className={styles.examRows}>
            <div><span>En una página de examen ahora</span><strong>{traffic.examPageActiveNow}</strong></div>
            <div><span>Personas que abrieron una página de examen</span><strong>{traffic.limited ? '≥' : ''}{traffic.examPageVisitors7d}</strong></div>
            <div><span>Exámenes entregados</span><strong>{completedExams7d}</strong></div>
            <div><span>Leads registrados</span><strong>{examLeads7d}</strong></div>
          </div>
          <p>Son pasos distintos: abrir una página no significa empezar ni entregar el examen. Las entregas pueden incluir varios intentos de una persona.</p>
        </section>
      </div>
      <div className={styles.pagesGrid}>
        <PagesList title="Páginas más visitadas" detail="Personas únicas por página" pages={traffic.topPages} limited={traffic.limited} />
        <PagesList title="Páginas con menos tráfico" detail="Entre las páginas que tuvieron visitas" pages={traffic.quietPages} limited={traffic.limited} />
      </div>
      <p className={styles.footnote}>Datos desde {traffic.observedSince ? new Date(traffic.observedSince).toLocaleString('es-CO', { timeZone: 'America/Bogota', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'la activación del registro'}. Los bloqueadores de seguimiento y las pestañas inactivas pueden reducir el conteo.</p>
    </>}
  </section>
}
