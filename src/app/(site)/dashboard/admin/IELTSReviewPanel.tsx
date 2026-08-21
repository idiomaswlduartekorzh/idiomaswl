'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ClipboardCheck } from 'lucide-react'
import { scoreSubmission } from '@/lib/actions/scoreSubmission'
import { getIeltsSubmissionAudio } from '@/lib/actions/getIeltsSubmissionAudio'
import { calculateIeltsWritingBand } from '@/lib/ielts/scoring'
import type { FullAssessment } from '@/lib/labs/types'
import type { IeltsDelegatedReviewMetadata, IeltsSpeakingAssessment } from '@/lib/ielts/delegated-review'
import type { ExamSubmission } from './JoseDashboardServer'
import IELTSDelegatedReviewCallout from './IELTSDelegatedReviewCallout'

const A = '#8f461f'
const BG = '#f5f0eb'
const CARD = '#ffffff'
const TEXT = '#1a1a2e'
const MUTED = '#6b7280'
const BORDER = '#e8ddd4'
const BAND_OPTIONS = Array.from({ length: 19 }, (_, index) => index / 2)

type Filter = 'pending' | 'reviewed' | 'all'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function statusFor(item: ExamSubmission): { label: string; color: string; background: string } {
  if (item.reviewed_at) return { label: 'Revisado', color: '#166534', background: '#dcfce7' }
  if (item.writing_band != null) return { label: 'IA lista · falta revisión', color: '#92400e', background: '#fef3c7' }
  return { label: 'Reporte IA pendiente', color: '#991b1b', background: '#fee2e2' }
}

function Score({ label, value, source }: { label: string; value: number | null | undefined; source?: string }) {
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '10px 12px' }}>
      <p style={{ margin: 0, color: MUTED, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
      <p style={{ margin: '3px 0 0', color: value == null ? MUTED : TEXT, fontSize: 22, fontWeight: 800 }}>
        {value == null ? 'Pendiente' : `Band ${value}`}
      </p>
      {source && <p style={{ margin: '2px 0 0', color: MUTED, fontSize: 10 }}>{source}</p>}
    </div>
  )
}

function Essay({ title, value }: { title: string; value?: string | null }) {
  const words = value?.trim() ? value.trim().split(/\s+/).length : 0
  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 5 }}>
        <h4 style={{ margin: 0, fontSize: 11, fontWeight: 800, color: TEXT, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</h4>
        <span style={{ color: MUTED, fontSize: 10 }}>{words} palabras</span>
      </div>
      <div style={{ background: CARD, borderRadius: 8, padding: 12, fontSize: 12, color: TEXT, maxHeight: 180, overflowY: 'auto', whiteSpace: 'pre-wrap', lineHeight: 1.55, border: `1px solid ${BORDER}` }}>
        {value || <span style={{ color: MUTED }}>Sin respuesta</span>}
      </div>
    </section>
  )
}

function AssessmentReport({ title, report }: { title: string; report?: FullAssessment | null }) {
  if (!report) {
    return (
      <section style={{ background: CARD, border: `1px dashed ${BORDER}`, borderRadius: 10, padding: 12 }}>
        <h4 style={{ margin: 0, fontSize: 12, color: TEXT }}>{title}</h4>
        <p style={{ margin: '4px 0 0', fontSize: 11, color: MUTED }}>El reporte automático todavía no se ha generado.</p>
      </section>
    )
  }

  const delegated = (report as FullAssessment & { delegatedReview?: IeltsDelegatedReviewMetadata }).delegatedReview

  return (
    <section style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <div>
          <h4 style={{ margin: 0, fontSize: 12, color: TEXT }}>{title}</h4>
          <p style={{ margin: '2px 0 0', fontSize: 10, color: MUTED }}>
            {report.wordCount} palabras · {delegated ? `${delegated.evaluatorName} · ${delegated.evaluatorModel}` : `motor ${report.engineUsed ?? 'IA'}`}
          </p>
        </div>
        <strong style={{ color: A, fontSize: 20 }}>Band {report.overallBand}</strong>
      </div>

      {delegated && (
        <div style={{ marginTop: 10, padding: 10, borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <p style={{ margin: 0, color: '#166534', fontSize: 10, fontWeight: 850 }}>Evaluación delegada · {delegated.callCode}</p>
          <p style={{ margin: '5px 0 0', color: TEXT, fontSize: 10, lineHeight: 1.45 }}>{delegated.summary}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8, marginTop: 8 }}>
            <div><strong style={{ fontSize: 10, color: '#166534' }}>Fortalezas</strong><ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 10, color: MUTED }}>{delegated.strengths.map(item => <li key={item}>{item}</li>)}</ul></div>
            <div><strong style={{ fontSize: 10, color: '#9a3412' }}>Prioridades</strong><ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 10, color: MUTED }}>{delegated.priorities.map(item => <li key={item}>{item}</li>)}</ul></div>
          </div>
          <a href={delegated.officialRubricUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 7, color: A, fontSize: 9, fontWeight: 750 }}>Rúbrica oficial · {delegated.officialRubricVersion} ↗</a>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))', gap: 6, marginTop: 10 }}>
        {report.criteria.map(criterion => (
          <div key={criterion.criterion} style={{ background: BG, borderRadius: 8, padding: 8 }}>
            <p style={{ margin: 0, color: TEXT, fontSize: 10, fontWeight: 800 }}>{criterion.criterion} · {criterion.band}</p>
            <p style={{ margin: '3px 0 0', color: MUTED, fontSize: 10, lineHeight: 1.35 }}>{criterion.reason}</p>
          </div>
        ))}
      </div>

      {report.allIssues.length > 0 && (
        <details style={{ marginTop: 10 }}>
          <summary style={{ color: TEXT, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Errores detectados ({report.allIssues.length})</summary>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 7 }}>
            {report.allIssues.map((issue, index) => (
              <div key={`${issue.quote}-${index}`} style={{ borderLeft: `3px solid ${issue.severity === 'critica' ? '#dc2626' : issue.severity === 'moderada' ? '#d97706' : '#64748b'}`, paddingLeft: 8 }}>
                <p style={{ margin: 0, fontSize: 10, color: TEXT }}><strong>“{issue.quote}”</strong> → {issue.suggestion}</p>
                <p style={{ margin: '2px 0 0', fontSize: 10, color: MUTED }}>{issue.explanation}</p>
              </div>
            ))}
          </div>
        </details>
      )}

      {report.rewritten && (
        <details style={{ marginTop: 8 }}>
          <summary style={{ color: TEXT, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Versión corregida</summary>
          <p style={{ margin: '7px 0 0', whiteSpace: 'pre-wrap', fontSize: 11, color: MUTED, lineHeight: 1.5 }}>{report.rewritten}</p>
        </details>
      )}
    </section>
  )
}

function SpeakingAssessmentReport({ report }: { report?: IeltsSpeakingAssessment | null }) {
  if (!report) return null
  return (
    <section style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div>
          <h4 style={{ margin: 0, fontSize: 12, color: TEXT }}>Reporte delegado · Speaking</h4>
          <p style={{ margin: '2px 0 0', fontSize: 10, color: MUTED }}>{report.delegatedReview.evaluatorName} · {report.delegatedReview.evaluatorModel}</p>
        </div>
        <strong style={{ color: A, fontSize: 20 }}>Band {report.overallBand}</strong>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))', gap: 6, marginTop: 10 }}>
        {report.criteria.map(criterion => (
          <div key={criterion.criterion} style={{ background: BG, borderRadius: 8, padding: 8 }}>
            <p style={{ margin: 0, color: TEXT, fontSize: 10, fontWeight: 800 }}>{criterion.criterion} · {criterion.band}</p>
            <p style={{ margin: '3px 0 0', color: MUTED, fontSize: 10, lineHeight: 1.35 }}>{criterion.reason}</p>
          </div>
        ))}
      </div>
      <p style={{ margin: '10px 0 0', color: TEXT, fontSize: 10, lineHeight: 1.45 }}>{report.delegatedReview.summary}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8, marginTop: 8 }}>
        <div><strong style={{ fontSize: 10, color: '#166534' }}>Fortalezas</strong><ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 10, color: MUTED }}>{report.delegatedReview.strengths.map(item => <li key={item}>{item}</li>)}</ul></div>
        <div><strong style={{ fontSize: 10, color: '#9a3412' }}>Prioridades</strong><ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 10, color: MUTED }}>{report.delegatedReview.priorities.map(item => <li key={item}>{item}</li>)}</ul></div>
      </div>
    </section>
  )
}

function BandPicker({ label, value, onChange }: { label: string; value: number | null; onChange: (band: number) => void }) {
  return (
    <div>
      <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 800, color: TEXT }}>{label}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {BAND_OPTIONS.map(band => (
          <button
            type="button"
            key={band}
            onClick={() => onChange(band)}
            aria-pressed={value === band}
            style={{ minWidth: 44, minHeight: 44, padding: '8px 10px', borderRadius: 7, border: `1px solid ${value === band ? A : BORDER}`, background: value === band ? A : 'transparent', color: value === band ? '#fff' : TEXT, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
          >
            {band}
          </button>
        ))}
      </div>
    </div>
  )
}

function suggestedWritingBand(item: ExamSubmission): number | null {
  if (item.writing_band != null) return item.writing_band
  if (item.writing_task1_assessment && item.writing_task2_assessment) {
    return calculateIeltsWritingBand(
      item.writing_task1_assessment.overallBand,
      item.writing_task2_assessment.overallBand,
    )
  }
  return null
}

export default function IELTSReviewPanel({ items }: { items: ExamSubmission[] }) {
  const router = useRouter()
  const initialItem = items.find(item => !item.reviewed_at) ?? items[0]
  const [filter, setFilter] = useState<Filter>('pending')
  const [search, setSearch] = useState('')
  const [mockFilter, setMockFilter] = useState('all')
  const [selected, setSelected] = useState<string | null>(initialItem?.id ?? null)
  const [writingBand, setWritingBand] = useState<number | null>(() => initialItem ? suggestedWritingBand(initialItem) : null)
  const [speakingBand, setSpeakingBand] = useState<number | null>(() => initialItem?.speaking_band ?? null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [audioResult, setAudioResult] = useState<{
    submissionId: string
    files: { questionId: string; signedUrl: string }[]
    error: string
  } | null>(null)

  const mockOptions = useMemo(() => [...new Set(items.map(item => item.mock_title).filter(Boolean) as string[])].sort(), [items])
  const visibleItems = useMemo(() => items.filter(item => {
    if (filter === 'pending' && item.reviewed_at) return false
    if (filter === 'reviewed' && !item.reviewed_at) return false
    if (mockFilter !== 'all' && item.mock_title !== mockFilter) return false
    const query = search.trim().toLowerCase()
    if (query && ![item.id, item.user_name, item.user_email, item.mock_title].some(value => value?.toLowerCase().includes(query))) return false
    return true
  }), [filter, items, mockFilter, search])
  const active = visibleItems.find(item => item.id === selected) ?? visibleItems[0] ?? null
  const activeId = active?.id ?? null
  const activeAudioSignature = Object.keys(active?.speaking_audio_paths ?? {}).sort().join('|')

  useEffect(() => {
    let cancelled = false
    if (!activeId || !activeAudioSignature) return
    getIeltsSubmissionAudio(activeId).then(result => {
      if (cancelled) return
      setAudioResult({
        submissionId: activeId,
        files: result.ok ? result.files : [],
        error: result.ok ? '' : result.error,
      })
    }).catch(() => {
      if (!cancelled) {
        setAudioResult({ submissionId: activeId, files: [], error: 'No fue posible preparar los audios privados.' })
      }
    })
    return () => { cancelled = true }
  }, [activeAudioSignature, activeId])

  const activeAudioResult = audioResult?.submissionId === activeId ? audioResult : null
  const audioFiles = activeAudioResult?.files ?? []
  const audioLoading = Boolean(activeAudioSignature && !activeAudioResult)

  function selectItem(item: ExamSubmission) {
    setSelected(item.id)
    setWritingBand(suggestedWritingBand(item))
    setSpeakingBand(item.speaking_band ?? null)
    setMessage('')
    setError('')
  }

  function changeFilter(nextFilter: Filter) {
    setFilter(nextFilter)
    const nextItems = items.filter(item => {
      if (nextFilter === 'pending') return !item.reviewed_at
      if (nextFilter === 'reviewed') return Boolean(item.reviewed_at)
      return true
    })
    const nextActive = nextItems.find(item => item.id === selected) ?? nextItems[0]
    if (nextActive) selectItem(nextActive)
  }

  async function handleSave() {
    if (!active) return
    if (writingBand == null || speakingBand == null) {
      setError('Selecciona explícitamente las bandas finales de Writing y Speaking.')
      return
    }
    if (active.reviewed_at) {
      setError('Esta entrega ya tiene una evaluación final y no se puede sobrescribir desde esta acción.')
      return
    }
    if (!window.confirm(`Confirmar evaluación final de ${active.user_name ?? 'la estudiante'}: Writing ${writingBand}, Speaking ${speakingBand}. Esta acción cierra los llamados pendientes.`)) return
    setSaving(true)
    setMessage('')
    setError('')
    try {
      const result = await scoreSubmission(active.id, writingBand, speakingBand)
      setMessage(`Revisión guardada. Overall Band ${result.overall ?? '—'} con Listening, Reading, Writing y Speaking.`)
      setFilter('reviewed')
      router.refresh()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'No pudimos guardar la revisión.')
    } finally {
      setSaving(false)
    }
  }

  const pendingCount = items.filter(item => !item.reviewed_at).length
  const reviewedCount = items.length - pendingCount

  return (
    <section style={{ background: CARD, borderRadius: 16, padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', border: `2px solid ${A}` }} aria-labelledby="ielts-review-heading">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ClipboardCheck size={17} color={A} />
            <h3 id="ielts-review-heading" style={{ margin: 0, fontSize: 15, fontWeight: 800, color: TEXT }}>Evaluaciones IELTS</h3>
          </div>
          <p style={{ margin: '4px 0 0 25px', color: MUTED, fontSize: 11 }}>Resultados L/R, textos, reportes de IA y audios privados en una sola ficha.</p>
        </div>
        <div role="group" aria-label="Filtrar evaluaciones" style={{ display: 'flex', gap: 5 }}>
          {([
            ['pending', `Pendientes ${pendingCount}`],
            ['reviewed', `Revisadas ${reviewedCount}`],
            ['all', `Todas ${items.length}`],
          ] as [Filter, string][]).map(([value, label]) => (
            <button type="button" key={value} onClick={() => changeFilter(value)} aria-pressed={filter === value}
              style={{ border: `1px solid ${filter === value ? A : BORDER}`, background: filter === value ? A : CARD, color: filter === value ? '#fff' : TEXT, borderRadius: 8, padding: '6px 9px', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 1fr) minmax(180px, 260px)', gap: 8, marginBottom: 14 }}>
        <label style={{ color: TEXT, fontSize: 11, fontWeight: 700 }}>
          Buscar estudiante, correo, UUID o mock
          <input type="search" name="ielts_review_search" value={search} onChange={event => setSearch(event.target.value)}
            placeholder="Buscar…" style={{ width: '100%', minHeight: 44, marginTop: 4, border: `1px solid ${BORDER}`, borderRadius: 8, padding: '8px 10px', background: CARD, color: TEXT }} />
        </label>
        <label style={{ color: TEXT, fontSize: 11, fontWeight: 700 }}>
          Simulacro
          <select name="ielts_mock_filter" value={mockFilter} onChange={event => setMockFilter(event.target.value)}
            style={{ width: '100%', minHeight: 44, marginTop: 4, border: `1px solid ${BORDER}`, borderRadius: 8, padding: '8px 10px', background: CARD, color: TEXT }}>
            <option value="all">Todos los sets</option>
            {mockOptions.map(title => <option key={title} value={title}>{title}</option>)}
          </select>
        </label>
      </div>

      {visibleItems.length === 0 ? (
        <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>No hay evaluaciones en este estado.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: active ? 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' : '1fr', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 720, overflowY: 'auto' }}>
            {visibleItems.map(item => {
              const status = statusFor(item)
              return (
                <button type="button" key={item.id} onClick={() => selectItem(item)} aria-pressed={active?.id === item.id}
                  style={{ textAlign: 'left', padding: '11px 13px', borderRadius: 10, border: `1px solid ${active?.id === item.id ? A : BORDER}`, background: active?.id === item.id ? `${A}14` : CARD, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: TEXT }}>{item.user_name ?? item.user_email ?? 'Anónimo'}</p>
                    <span style={{ borderRadius: 999, padding: '2px 6px', color: status.color, background: status.background, fontSize: 9, fontWeight: 800, whiteSpace: 'nowrap' }}>{status.label}</span>
                  </div>
                  {item.user_email && <p style={{ margin: '3px 0', fontSize: 10, color: MUTED, overflowWrap: 'anywhere' }}>{item.user_email}</p>}
                  <p style={{ margin: 0, fontSize: 10, color: MUTED }}>{item.mock_title} · {formatDate(item.created_at)}</p>
                  <p style={{ margin: '5px 0 0', fontSize: 10, fontWeight: 700, color: A }}>
                    L {item.listening_band ?? '—'} · R {item.reading_band ?? '—'} · W {item.writing_band ?? '—'} · S {item.speaking_band ?? '—'}
                  </p>
                </button>
              )
            })}
          </div>

          {active && (
            <div style={{ background: BG, borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
              <header>
                <h4 style={{ margin: 0, color: TEXT, fontSize: 16 }}>{active.user_name ?? 'Estudiante'}</h4>
                <p style={{ margin: '3px 0 0', color: MUTED, fontSize: 11 }}>{active.user_email} · {active.mock_title}</p>
              </header>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(125px, 1fr))', gap: 7 }}>
                <Score label="Listening" value={active.listening_band} source="Resultado automático" />
                <Score label="Reading" value={active.reading_band} source="Resultado automático" />
                <Score label="Writing" value={active.writing_band} source={active.reviewed_at ? 'Banda final del profesor' : active.writing_task1_delegated_assessment || active.writing_task2_delegated_assessment ? 'Evaluación delegada' : active.writing_band != null ? 'Sugerencia de IA' : undefined} />
                <Score label="Speaking" value={active.speaking_band} source={active.reviewed_at ? 'Banda final del profesor' : active.speaking_assessment ? 'Evaluación delegada' : undefined} />
              </div>

              <Essay title="Writing Task 1" value={active.writing_task1_answer} />
              <AssessmentReport title="Reporte IA · Task 1" report={active.writing_task1_assessment} />
              {active.writing_task1_delegated_assessment && <AssessmentReport title="Reporte delegado · Task 1" report={active.writing_task1_delegated_assessment} />}
              <Essay title="Writing Task 2" value={active.writing_task2_answer} />
              <AssessmentReport title="Reporte IA · Task 2" report={active.writing_task2_assessment} />
              {active.writing_task2_delegated_assessment && <AssessmentReport title="Reporte delegado · Task 2" report={active.writing_task2_delegated_assessment} />}

              {active.speaking_answers && Object.values(active.speaking_answers).some(Boolean) && (
                <section>
                  <h4 style={{ margin: '0 0 5px', fontSize: 11, color: TEXT, textTransform: 'uppercase' }}>Speaking · notas</h4>
                  <div style={{ background: CARD, borderRadius: 8, padding: 10, border: `1px solid ${BORDER}` }}>
                    {Object.entries(active.speaking_answers).map(([questionId, answer]) => answer ? (
                      <p key={questionId} style={{ margin: '0 0 5px', fontSize: 11, color: TEXT }}><strong>{questionId.toUpperCase()}:</strong> {answer}</p>
                    ) : null)}
                  </div>
                </section>
              )}

              {active.speaking_audio_paths && Object.keys(active.speaking_audio_paths).length > 0 && (
                <section>
                  <h4 style={{ margin: '0 0 6px', fontSize: 11, color: TEXT, textTransform: 'uppercase' }}>Speaking · audios privados</h4>
                  {audioLoading && <p style={{ color: MUTED, fontSize: 11 }}>Preparando enlaces privados…</p>}
                  {activeAudioResult?.error && <p role="alert" style={{ color: '#b91c1c', fontSize: 11 }}>{activeAudioResult.error}</p>}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8 }}>
                    {audioFiles.map(audio => (
                      <div key={audio.questionId} style={{ background: CARD, borderRadius: 8, padding: 10, border: `1px solid ${BORDER}` }}>
                        <p style={{ margin: '0 0 5px', fontSize: 10, fontWeight: 800, color: TEXT }}>{audio.questionId.toUpperCase()}</p>
                        <audio controls preload="metadata" src={audio.signedUrl} aria-label={`Respuesta ${audio.questionId.toUpperCase()} de ${active.user_name ?? 'la estudiante'}`} style={{ width: '100%' }} />
                      </div>
                    ))}
                  </div>
                  <p style={{ margin: '5px 0 0', fontSize: 10, color: MUTED }}>Enlaces privados válidos durante 5 minutos; se renuevan al volver a abrir el intento.</p>
                </section>
              )}

              <SpeakingAssessmentReport report={active.speaking_assessment} />

              <IELTSDelegatedReviewCallout key={active.id} submission={active} />

              <section style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>
                <p style={{ margin: '0 0 10px', fontSize: 11, color: MUTED }}>La IA sugiere Writing; el profesor confirma Writing y asigna Speaking. Al guardar se recalcula el Overall con L/R/W/S.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(235px, 1fr))', gap: 12 }}>
                  <BandPicker label="Writing Band final" value={writingBand} onChange={setWritingBand} />
                  <BandPicker label="Speaking Band final" value={speakingBand} onChange={setSpeakingBand} />
                </div>
                <button type="button" onClick={handleSave} disabled={saving || writingBand == null || speakingBand == null || Boolean(active.reviewed_at)}
                  style={{ width: '100%', marginTop: 12, padding: '10px 12px', borderRadius: 9, border: 'none', background: A, color: '#fff', fontSize: 12, fontWeight: 800, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
                  {saving ? 'Guardando revisión…' : writingBand == null || speakingBand == null ? 'Selecciona W y S para cerrar' : `Guardar revisión final · W ${writingBand} · S ${speakingBand}`}
                </button>
                <p role="status" aria-live="polite" style={{ minHeight: 18, margin: '7px 0 0', color: message ? '#166534' : error ? '#b91c1c' : MUTED, fontSize: 11 }}>
                  {message || error}
                </p>
                {active.reviewed_at && <p style={{ margin: 0, color: MUTED, fontSize: 10 }}>Última revisión: {formatDate(active.reviewed_at)} · {active.reviewed_by ?? 'admin'}</p>}
              </section>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
