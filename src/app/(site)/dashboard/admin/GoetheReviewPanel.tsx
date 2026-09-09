'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ClipboardCheck } from 'lucide-react'
import { completeGoetheReview } from '@/lib/actions/completeGoetheReview'
import { getGoetheSubmissionAudio } from '@/lib/actions/getGoetheSubmissionAudio'
import type { ExamSubmission } from './JoseDashboardServer'

const A = '#d4a017'
const BG = '#fffbeb'
const CARD = '#fff'
const TEXT = '#172033'
const MUTED = '#667085'
const BORDER = '#ddd6b8'

interface SnapshotQuestion { id: string; skill: string; part: number; text: string; options: string[]; answer: number }
interface SnapshotForm { blanks?: { num: number; answers: string[] }[] }
interface GoetheSnapshot { objective?: SnapshotQuestion[]; form?: SnapshotForm }
interface GoetheAnswers { answers?: Record<string, number>; formValues?: Record<string, string> }
interface StoredWritingReview { content1?: number; content2?: number; content3?: number; conventions?: number; evidenceNotes?: string }
interface StoredSpeakingReview { part1?: number; part2?: number; part3?: number }

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function Picker({ label, values, value, onChange }: { label: string; values: number[]; value: number | null; onChange: (value: number) => void }) {
  return <div><p style={{ margin: '0 0 5px', fontSize: 11, fontWeight: 800 }}>{label}</p><div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>{values.map(score => <button key={score} type="button" aria-pressed={value === score} onClick={() => onChange(score)} style={{ minWidth: 43, minHeight: 42, borderRadius: 8, border: `1px solid ${value === score ? A : BORDER}`, background: value === score ? A : CARD, color: value === score ? '#fff' : TEXT, fontWeight: 800, cursor: 'pointer' }}>{String(score).replace('.', ',')}</button>)}</div></div>
}

function studentAnswer(question: SnapshotQuestion, answers: GoetheAnswers) {
  const selected = answers.answers?.[question.id]
  return selected == null ? 'Sin respuesta' : `${String.fromCharCode(65 + selected)} · ${question.options[selected] ?? 'Opción inválida'}`
}

export default function GoetheReviewPanel({ items }: { items: ExamSubmission[] }) {
  const router = useRouter()
  const [showReviewed, setShowReviewed] = useState(false)
  const visible = useMemo(() => items.filter(item => showReviewed || !item.reviewed_at), [items, showReviewed])
  const [selectedId, setSelectedId] = useState<string | null>(() => visible[0]?.id ?? items[0]?.id ?? null)
  const active = visible.find(item => item.id === selectedId) ?? visible[0] ?? null
  const [scores, setScores] = useState<Record<string, number | null>>({ content1: null, content2: null, content3: null, conventions: null, part1: null, part2: null, part3: null })
  const [notes, setNotes] = useState('')
  const [audio, setAudio] = useState<{ id: string; files: { questionId: string; signedUrl: string }[]; error: string } | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const snapshot = (active?.assignment_snapshot ?? {}) as GoetheSnapshot
  const responses = (active?.objective_answers ?? {}) as GoetheAnswers
  const writingStored = (active?.writing_task1_assessment ?? {}) as unknown as StoredWritingReview
  const audioSignature = Object.keys(active?.speaking_audio_paths ?? {}).sort().join('|')

  useEffect(() => {
    let cancelled = false
    if (!active?.id || !audioSignature) return
    getGoetheSubmissionAudio(active.id).then(result => {
      if (!cancelled) setAudio({ id: active.id, files: result.ok ? result.files : [], error: result.ok ? '' : result.error })
    }).catch(() => { if (!cancelled) setAudio({ id: active.id, files: [], error: 'No pudimos preparar los audios privados.' }) })
    return () => { cancelled = true }
  }, [active?.id, audioSignature])

  function choose(item: ExamSubmission) {
    const writing = (item.writing_task1_assessment ?? {}) as unknown as StoredWritingReview
    const speaking = (item.speaking_assessment ?? {}) as unknown as StoredSpeakingReview
    setSelectedId(item.id)
    setScores({ content1: writing.content1 ?? null, content2: writing.content2 ?? null, content3: writing.content3 ?? null, conventions: writing.conventions ?? null, part1: speaking.part1 ?? null, part2: speaking.part2 ?? null, part3: speaking.part3 ?? null })
    setNotes(writing.evidenceNotes ?? '')
    setMessage('')
  }

  function setScore(key: string, value: number) { setScores(previous => ({ ...previous, [key]: value })) }

  async function save() {
    if (!active || Object.values(scores).some(value => value == null)) return setMessage('Completa los siete criterios de la rúbrica.')
    if (notes.trim().length < 20) return setMessage('Escribe al menos 20 caracteres de evidencia y retroalimentación.')
    if (!window.confirm('¿Cerrar esta revisión Goethe A1 y publicar su score final?')) return
    setSaving(true); setMessage('')
    try {
      await completeGoetheReview({
        submissionId: active.id,
        writing: { content1: scores.content1!, content2: scores.content2!, content3: scores.content3!, conventions: scores.conventions! },
        speaking: { part1: scores.part1!, part2: scores.part2!, part3: scores.part3! },
        evidenceNotes: notes,
      })
      setMessage('Revisión cerrada y score Goethe guardado.')
      router.refresh()
    } catch (error) { setMessage(error instanceof Error ? error.message : 'No pudimos cerrar la revisión.') } finally { setSaving(false) }
  }

  const activeAudio = audio?.id === active?.id ? audio : null
  const automaticSkills = Array.isArray(active?.skills) ? active.skills as { skill?: string; label?: string }[] : []
  const writingText = active?.writing_task2_answer ?? ''
  const points = snapshot.objective ?? []
  return (
    <section style={{ background: CARD, border: `2px solid ${A}`, borderRadius: 16, padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,.06)' }} aria-labelledby="goethe-review-heading">
      <header style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
        <div><div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><ClipboardCheck size={17} color={A} /><h3 id="goethe-review-heading" style={{ margin: 0 }}>Correcciones Goethe A1</h3></div><p style={{ margin: '4px 0 0 25px', color: MUTED, fontSize: 11 }}>Hoja digital completa: 30 respuestas, formulario, mensaje, tres audios y score final sobre 100.</p></div>
        <button type="button" onClick={() => setShowReviewed(value => !value)} style={{ border: `1px solid ${A}`, borderRadius: 8, background: showReviewed ? A : CARD, color: showReviewed ? '#fff' : '#806000', padding: '7px 10px', fontWeight: 750, cursor: 'pointer' }}>{showReviewed ? 'Ocultar revisadas' : 'Mostrar revisadas'}</button>
      </header>
      {visible.length === 0 ? <p style={{ color: MUTED }}>No hay entregas pendientes.</p> : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, maxHeight: 850, overflowY: 'auto' }}>{visible.map(item => <button key={item.id} type="button" onClick={() => choose(item)} aria-pressed={active?.id === item.id} style={{ textAlign: 'left', border: `1px solid ${active?.id === item.id ? A : BORDER}`, background: active?.id === item.id ? BG : CARD, borderRadius: 9, padding: 10, cursor: 'pointer' }}><strong>{item.user_name ?? item.user_email ?? 'Estudiante'}</strong><p style={{ margin: '3px 0', color: MUTED, fontSize: 10 }}>{item.mock_title} · {formatDate(item.created_at)}</p><span style={{ color: item.reviewed_at ? '#166534' : '#806000', fontSize: 10, fontWeight: 800 }}>{item.reviewed_at ? item.total_label : 'Pendiente de revisión humana'}</span></button>)}</div>
        {active && <div style={{ background: BG, borderRadius: 12, padding: 14, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><h4 style={{ margin: 0 }}>{active.user_name ?? 'Estudiante'}</h4><p style={{ margin: '3px 0', color: MUTED, fontSize: 10 }}>{active.user_email} · {active.total_label}</p></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{automaticSkills.map(skill => <span key={skill.skill} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 999, padding: '5px 8px', fontSize: 10 }}><strong>{skill.skill}:</strong> {skill.label}</span>)}</div>
          <details><summary style={{ cursor: 'pointer', fontSize: 11, fontWeight: 800 }}>30 respuestas objetivas</summary><div style={{ maxHeight: 320, overflowY: 'auto', marginTop: 7 }}>{points.map(question => { const selected = responses.answers?.[question.id]; const correct = selected === question.answer; return <div key={question.id} style={{ padding: '7px 8px', borderBottom: `1px solid ${BORDER}`, background: CARD, fontSize: 10 }}><strong style={{ color: correct ? '#166534' : '#b91c1c' }}>{question.id} · {correct ? 'Correcta' : 'Incorrecta/abierta'}</strong><p style={{ margin: '3px 0' }}>{question.text}</p><span>Marcó: {studentAnswer(question, responses)} · Clave: {String.fromCharCode(65 + question.answer)} · {question.options[question.answer]}</span></div> })}</div></details>
          <details open><summary style={{ cursor: 'pointer', fontSize: 11, fontWeight: 800 }}>Schreiben · formulario y mensaje</summary><div style={{ marginTop: 7, display: 'grid', gap: 6 }}>{(snapshot.form?.blanks ?? []).map(blank => <div key={blank.num} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 7, padding: 7, fontSize: 10 }}><strong>{blank.num}.</strong> {responses.formValues?.[String(blank.num)] || 'Sin respuesta'} <span style={{ color: MUTED }}>· aceptada: {blank.answers[0]}</span></div>)}<div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 10, whiteSpace: 'pre-wrap', fontSize: 11, lineHeight: 1.5 }}>{writingText || 'Sin respuesta'}</div></div></details>
          <section><h4 style={{ margin: '0 0 6px', fontSize: 11 }}>Sprechen · evidencia privada</h4>{!activeAudio && <p style={{ color: MUTED, fontSize: 10 }}>Preparando enlaces temporales…</p>}{activeAudio?.error && <p style={{ color: '#b91c1c', fontSize: 10 }}>{activeAudio.error}</p>}<div style={{ display: 'grid', gap: 7 }}>{activeAudio?.files.map(file => <div key={file.questionId} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 8 }}><strong style={{ fontSize: 10 }}>{file.questionId.replace('g-a1-1-sp', 'Sprechen Teil ')}</strong><audio controls preload="metadata" src={file.signedUrl} style={{ width: '100%', marginTop: 5 }} /></div>)}</div></section>
          {!active.reviewed_at && <section style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12, display: 'grid', gap: 10 }}><div><strong style={{ fontSize: 11 }}>Schreiben Teil 2 · 10 Rohpunkte</strong><p style={{ margin: '3px 0', color: MUTED, fontSize: 10 }}>Cada contenido: 0 / 1,5 / 3. Anrede und Gruß: 0 / 0,5 / 1.</p></div><Picker label="Motivo del mensaje" values={[0, 1.5, 3]} value={scores.content1} onChange={value => setScore('content1', value)} /><Picker label="Zimmer für zwei" values={[0, 1.5, 3]} value={scores.content2} onChange={value => setScore('content2', value)} /><Picker label="Preis mit Frühstück" values={[0, 1.5, 3]} value={scores.content3} onChange={value => setScore('content3', value)} /><Picker label="Anrede und Gruß" values={[0, 0.5, 1]} value={scores.conventions} onChange={value => setScore('conventions', value)} /><div><strong style={{ fontSize: 11 }}>Sprechen · 15 Rohpunkte</strong></div><Picker label="Teil 1 · Sich vorstellen" values={[0, .5, 1, 1.5, 2, 2.5, 3]} value={scores.part1} onChange={value => setScore('part1', value)} /><Picker label="Teil 2 · Fragen/Antworten" values={Array.from({ length: 13 }, (_, i) => i / 2)} value={scores.part2} onChange={value => setScore('part2', value)} /><Picker label="Teil 3 · Bitten/Reaktionen" values={Array.from({ length: 13 }, (_, i) => i / 2)} value={scores.part3} onChange={value => setScore('part3', value)} /><label style={{ fontSize: 11, fontWeight: 800 }}>Evidencia y feedback<textarea value={notes} onChange={event => setNotes(event.target.value)} rows={5} style={{ display: 'block', width: '100%', marginTop: 4, padding: 9, border: `1px solid ${BORDER}`, borderRadius: 8 }} /></label><button type="button" onClick={save} disabled={saving} style={{ border: 0, borderRadius: 8, background: A, color: '#fff', padding: 10, fontWeight: 800, cursor: 'pointer', opacity: saving ? .65 : 1 }}>{saving ? 'Guardando…' : 'Cerrar revisión y calcular score Goethe'}</button></section>}
          {active.reviewed_at && <section style={{ background: '#ecfdf3', border: '1px solid #86c9a3', borderRadius: 9, padding: 10 }}><strong style={{ color: '#166534' }}>{active.total_label}</strong><p style={{ margin: '5px 0 0', fontSize: 10, color: TEXT }}>{writingStored.evidenceNotes || 'Revisión cerrada.'}</p></section>}
          <p role="status" aria-live="polite" style={{ margin: 0, color: message.includes('guardado') ? '#166534' : '#b91c1c', fontSize: 10 }}>{message}</p>
        </div>}
      </div>}
    </section>
  )
}
