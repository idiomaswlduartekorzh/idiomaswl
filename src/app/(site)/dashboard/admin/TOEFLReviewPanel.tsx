'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ClipboardCheck } from 'lucide-react'
import { getToeflSubmissionAudio } from '@/lib/actions/getToeflSubmissionAudio'
import { completeToeflReview } from '@/lib/actions/completeToeflReview'
import type { FullAssessment } from '@/lib/labs/types'
import type { ExamSubmission } from './JoseDashboardServer'

const A = '#2563eb'
const CARD = '#fff'
const BG = '#eff6ff'
const TEXT = '#172033'
const MUTED = '#667085'
const BORDER = '#cbd5e1'
const TASK_GUIDE = 'https://www.ets.org/pdfs/toefl/toefl-ibt-test-overview.pdf'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function Report({ label, report }: { label: string; report?: FullAssessment | null }) {
  return (
    <section style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <h4 style={{ margin: 0, fontSize: 12 }}>{label}</h4>
        <strong style={{ color: A }}>{report ? `${report.overallBand}/5` : 'Pendiente'}</strong>
      </div>
      {report ? (
        <>
          <p style={{ margin: '4px 0', color: MUTED, fontSize: 10 }}>{report.wordCount} palabras · motor {report.engineUsed ?? 'IA'} · estimación pedagógica</p>
          {report.criteria.map(row => <p key={row.criterion} style={{ margin: '5px 0', fontSize: 10, lineHeight: 1.45 }}><strong>{row.criterion} {row.band}:</strong> {row.reason}</p>)}
        </>
      ) : <p style={{ color: MUTED, fontSize: 10 }}>El texto está guardado aunque el motor automático todavía no haya respondido.</p>}
    </section>
  )
}

function Essay({ label, text }: { label: string; text?: string | null }) {
  return <section><h4 style={{ margin: '0 0 5px', fontSize: 11 }}>{label}</h4><div style={{ maxHeight: 180, overflowY: 'auto', whiteSpace: 'pre-wrap', background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 10, fontSize: 11, lineHeight: 1.55 }}>{text || 'Sin respuesta'}</div></section>
}

function ScorePicker({ label, value, onChange }: { label: string; value: number | null; onChange: (value: number) => void }) {
  return (
    <div><p style={{ margin: '0 0 5px', fontSize: 11, fontWeight: 800 }}>{label}</p><div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
      {[0, 1, 2, 3, 4, 5].map(score => <button key={score} type="button" aria-pressed={value === score} onClick={() => onChange(score)} style={{ minWidth: 44, minHeight: 44, borderRadius: 8, border: `1px solid ${value === score ? A : BORDER}`, background: value === score ? A : CARD, color: value === score ? '#fff' : TEXT, fontWeight: 800, cursor: 'pointer' }}>{score}</button>)}
    </div></div>
  )
}

export default function TOEFLReviewPanel({ items }: { items: ExamSubmission[] }) {
  const router = useRouter()
  const [showReviewed, setShowReviewed] = useState(false)
  const visible = useMemo(() => items.filter(item => showReviewed || !item.reviewed_at), [items, showReviewed])
  const [selectedId, setSelectedId] = useState<string | null>(() => visible[0]?.id ?? items[0]?.id ?? null)
  const active = visible.find(item => item.id === selectedId) ?? visible[0] ?? null
  const [repeatScore, setRepeatScore] = useState<number | null>(null)
  const [interviewScore, setInterviewScore] = useState<number | null>(null)
  const [notes, setNotes] = useState('')
  const [audio, setAudio] = useState<{ id: string; files: { questionId: string; signedUrl: string }[]; error: string } | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const audioSignature = Object.keys(active?.speaking_audio_paths ?? {}).sort().join('|')
  useEffect(() => {
    let cancelled = false
    if (!active?.id || !audioSignature) return
    getToeflSubmissionAudio(active.id).then(result => {
      if (!cancelled) setAudio({ id: active.id, files: result.ok ? result.files : [], error: result.ok ? '' : result.error })
    }).catch(() => { if (!cancelled) setAudio({ id: active.id, files: [], error: 'No pudimos preparar los audios privados.' }) })
    return () => { cancelled = true }
  }, [active?.id, audioSignature])

  function choose(item: ExamSubmission) {
    setSelectedId(item.id)
    setRepeatScore(item.toefl_speaking_repeat_assessment?.score ?? null)
    setInterviewScore(item.toefl_speaking_interview_assessment?.score ?? null)
    setNotes(item.toefl_speaking_repeat_assessment?.evidenceNotes ?? '')
    setMessage('')
  }

  async function save() {
    if (!active || repeatScore == null || interviewScore == null) return setMessage('Selecciona las dos estimaciones orales.')
    if (notes.trim().length < 20) return setMessage('Escribe al menos una observación breve basada en los audios.')
    if (!window.confirm('¿Cerrar esta revisión TOEFL? Los resultados seguirán rotulados como estimaciones pedagógicas.')) return
    setSaving(true); setMessage('')
    try {
      await completeToeflReview({ submissionId: active.id, repeatScore, interviewScore, evidenceNotes: notes })
      setMessage('Revisión cerrada correctamente.')
      router.refresh()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No pudimos cerrar la revisión.')
    } finally { setSaving(false) }
  }

  const activeAudio = audio?.id === active?.id ? audio : null
  return (
    <section style={{ background: CARD, border: `2px solid ${A}`, borderRadius: 16, padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,.06)' }} aria-labelledby="toefl-review-heading">
      <header style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
        <div><div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><ClipboardCheck size={17} color={A} aria-hidden="true" /><h3 id="toefl-review-heading" style={{ margin: 0 }}>Correcciones TOEFL 2026</h3></div><p style={{ margin: '4px 0 0 25px', color: MUTED, fontSize: 11 }}>Resultados brutos, dos reportes de Writing y 11 audios privados. Sin fabricar un score oficial 1–6.</p></div>
        <button type="button" onClick={() => setShowReviewed(value => !value)} style={{ border: `1px solid ${A}`, borderRadius: 8, background: showReviewed ? A : CARD, color: showReviewed ? '#fff' : A, padding: '7px 10px', fontWeight: 750, cursor: 'pointer' }}>{showReviewed ? 'Ocultar revisadas' : 'Mostrar revisadas'}</button>
      </header>
      {visible.length === 0 ? <p style={{ color: MUTED }}>No hay entregas pendientes.</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, maxHeight: 760, overflowY: 'auto' }}>
            {visible.map(item => <button key={item.id} type="button" onClick={() => choose(item)} aria-pressed={active?.id === item.id} style={{ textAlign: 'left', border: `1px solid ${active?.id === item.id ? A : BORDER}`, background: active?.id === item.id ? BG : CARD, borderRadius: 9, padding: 10, cursor: 'pointer' }}><strong style={{ color: TEXT }}>{item.user_name ?? item.user_email ?? 'Estudiante'}</strong><p style={{ margin: '3px 0', color: MUTED, fontSize: 10 }}>{item.mock_title} · {formatDate(item.created_at)}</p><span style={{ color: item.reviewed_at ? '#166534' : A, fontSize: 10, fontWeight: 800 }}>{item.reviewed_at ? 'Revisada' : item.writing_task1_assessment && item.writing_task2_assessment ? 'Writing listo · Speaking pendiente' : 'Writing automático en proceso'}</span></button>)}
          </div>
          {active && <div style={{ background: BG, borderRadius: 12, padding: 14, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div><h4 style={{ margin: 0 }}>{active.user_name ?? 'Estudiante'}</h4><p style={{ margin: '3px 0', color: MUTED, fontSize: 10 }}>{active.user_email} · {active.total_label}</p></div>
            <Essay label="Write an Email" text={active.writing_task1_answer} />
            <Report label="Reporte automático · Email" report={active.writing_task1_assessment} />
            <Essay label="Academic Discussion" text={active.writing_task2_answer} />
            <Report label="Reporte automático · Discussion" report={active.writing_task2_assessment} />
            <section><h4 style={{ margin: '0 0 6px', fontSize: 11 }}>Speaking · evidencia privada</h4>{!activeAudio && <p style={{ color: MUTED, fontSize: 10 }}>Preparando enlaces temporales…</p>}{activeAudio?.error && <p role="alert" style={{ color: '#b91c1c', fontSize: 10 }}>{activeAudio.error}</p>}<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 7 }}>{activeAudio?.files.map(file => <div key={file.questionId} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 8 }}><strong style={{ fontSize: 10 }}>{file.questionId}</strong><audio controls preload="metadata" src={file.signedUrl} aria-label={`Escuchar respuesta ${file.questionId}`} style={{ width: '100%', marginTop: 5 }} /></div>)}</div></section>
            <a href={TASK_GUIDE} target="_blank" rel="noreferrer" style={{ color: A, fontSize: 10, fontWeight: 750 }}>Guías públicas TOEFL 2026 de Writing y Speaking (ETS) ↗</a>
            {!active.reviewed_at && <section style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}><p style={{ color: MUTED, fontSize: 10 }}>Asigna una estimación agregada 0–5 por familia oral después de escuchar toda la evidencia. No se convierte a 1–6.</p><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 10 }}><ScorePicker label="Listen and Repeat" value={repeatScore} onChange={setRepeatScore} /><ScorePicker label="Take an Interview" value={interviewScore} onChange={setInterviewScore} /></div><label style={{ display: 'block', marginTop: 10, fontSize: 11, fontWeight: 750 }}>Evidencia y observaciones<textarea value={notes} onChange={event => setNotes(event.target.value)} rows={5} style={{ display: 'block', width: '100%', marginTop: 4, padding: 9, border: `1px solid ${BORDER}`, borderRadius: 8 }} /></label><button type="button" onClick={save} disabled={saving || repeatScore == null || interviewScore == null} style={{ width: '100%', marginTop: 10, border: 0, borderRadius: 8, background: A, color: '#fff', padding: 10, fontWeight: 800, cursor: 'pointer', opacity: saving ? .65 : 1 }}>{saving ? 'Guardando…' : 'Cerrar revisión TOEFL'}</button></section>}
            <p role="status" aria-live="polite" style={{ margin: 0, color: message.includes('correctamente') ? '#166534' : '#b91c1c', fontSize: 10 }}>{message}</p>
          </div>}
        </div>
      )}
    </section>
  )
}
