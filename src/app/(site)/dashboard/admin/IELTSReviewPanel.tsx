'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ClipboardCheck } from 'lucide-react'
import { scoreSubmission } from '@/lib/actions/scoreSubmission'
import { calculateIeltsWritingBand } from '@/lib/ielts/scoring'
import type { FullAssessment } from '@/lib/labs/types'
import type { ExamSubmission } from './JoseDashboardServer'

const A = '#c87941'
const BG = '#f5f0eb'
const CARD = '#ffffff'
const TEXT = '#1a1a2e'
const MUTED = '#6b7280'
const BORDER = '#e8ddd4'
const BAND_OPTIONS = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9] as const

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

  return (
    <section style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <div>
          <h4 style={{ margin: 0, fontSize: 12, color: TEXT }}>{title}</h4>
          <p style={{ margin: '2px 0 0', fontSize: 10, color: MUTED }}>{report.wordCount} palabras · motor {report.engineUsed ?? 'IA'}</p>
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

function BandPicker({ label, value, onChange }: { label: string; value: number; onChange: (band: number) => void }) {
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
            style={{ padding: '4px 8px', borderRadius: 6, border: `1px solid ${value === band ? A : BORDER}`, background: value === band ? A : 'transparent', color: value === band ? '#fff' : TEXT, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
          >
            {band}
          </button>
        ))}
      </div>
    </div>
  )
}

function suggestedWritingBand(item: ExamSubmission): number {
  if (item.writing_band != null) return item.writing_band
  if (item.writing_task1_assessment && item.writing_task2_assessment) {
    return calculateIeltsWritingBand(
      item.writing_task1_assessment.overallBand,
      item.writing_task2_assessment.overallBand,
    )
  }
  return 5.5
}

export default function IELTSReviewPanel({ items }: { items: ExamSubmission[] }) {
  const router = useRouter()
  const initialItem = items.find(item => !item.reviewed_at) ?? items[0]
  const [filter, setFilter] = useState<Filter>('pending')
  const [selected, setSelected] = useState<string | null>(initialItem?.id ?? null)
  const [writingBand, setWritingBand] = useState(() => initialItem ? suggestedWritingBand(initialItem) : 5.5)
  const [speakingBand, setSpeakingBand] = useState(() => initialItem?.speaking_band ?? 5.5)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const visibleItems = useMemo(() => items.filter(item => {
    if (filter === 'pending') return !item.reviewed_at
    if (filter === 'reviewed') return Boolean(item.reviewed_at)
    return true
  }), [filter, items])
  const active = visibleItems.find(item => item.id === selected) ?? visibleItems[0] ?? null

  function selectItem(item: ExamSubmission) {
    setSelected(item.id)
    setWritingBand(suggestedWritingBand(item))
    setSpeakingBand(item.speaking_band ?? 5.5)
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

      {visibleItems.length === 0 ? (
        <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>No hay evaluaciones en este estado.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: active ? 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' : '1fr', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 720, overflowY: 'auto' }}>
            {visibleItems.map(item => {
              const status = statusFor(item)
              return (
                <button type="button" key={item.id} onClick={() => selectItem(item)}
                  style={{ textAlign: 'left', padding: '11px 13px', borderRadius: 10, border: `1px solid ${selected === item.id ? A : BORDER}`, background: selected === item.id ? `${A}14` : CARD, cursor: 'pointer' }}>
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
                <Score label="Writing" value={active.writing_band} source={active.reviewed_at ? 'Banda final del profesor' : active.writing_band != null ? 'Sugerencia de IA' : undefined} />
                <Score label="Speaking" value={active.speaking_band} source={active.reviewed_at ? 'Banda final del profesor' : undefined} />
              </div>

              <Essay title="Writing Task 1" value={active.writing_task1_answer} />
              <AssessmentReport title="Reporte IA · Task 1" report={active.writing_task1_assessment} />
              <Essay title="Writing Task 2" value={active.writing_task2_answer} />
              <AssessmentReport title="Reporte IA · Task 2" report={active.writing_task2_assessment} />

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

              {active.speaking_audio_files && active.speaking_audio_files.length > 0 && (
                <section>
                  <h4 style={{ margin: '0 0 6px', fontSize: 11, color: TEXT, textTransform: 'uppercase' }}>Speaking · audios privados</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8 }}>
                    {active.speaking_audio_files.map(audio => (
                      <div key={audio.questionId} style={{ background: CARD, borderRadius: 8, padding: 10, border: `1px solid ${BORDER}` }}>
                        <p style={{ margin: '0 0 5px', fontSize: 10, fontWeight: 800, color: TEXT }}>{audio.questionId.toUpperCase()}</p>
                        <audio controls preload="metadata" src={audio.signedUrl} aria-label={`Respuesta ${audio.questionId.toUpperCase()} de ${active.user_name ?? 'la estudiante'}`} style={{ width: '100%' }} />
                      </div>
                    ))}
                  </div>
                  <p style={{ margin: '5px 0 0', fontSize: 10, color: MUTED }}>Enlaces privados válidos durante 1 hora.</p>
                </section>
              )}

              <section style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>
                <p style={{ margin: '0 0 10px', fontSize: 11, color: MUTED }}>La IA sugiere Writing; el profesor confirma Writing y asigna Speaking. Al guardar se recalcula el Overall con L/R/W/S.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(235px, 1fr))', gap: 12 }}>
                  <BandPicker label="Writing Band final" value={writingBand} onChange={setWritingBand} />
                  <BandPicker label="Speaking Band final" value={speakingBand} onChange={setSpeakingBand} />
                </div>
                <button type="button" onClick={handleSave} disabled={saving}
                  style={{ width: '100%', marginTop: 12, padding: '10px 12px', borderRadius: 9, border: 'none', background: A, color: '#fff', fontSize: 12, fontWeight: 800, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
                  {saving ? 'Guardando revisión…' : `Guardar revisión · W ${writingBand} · S ${speakingBand}`}
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
