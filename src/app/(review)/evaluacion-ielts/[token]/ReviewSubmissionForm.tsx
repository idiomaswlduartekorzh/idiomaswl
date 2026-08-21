'use client'

import { useMemo, useState } from 'react'
import type { IeltsDelegatedReviewCase } from '@/lib/ielts/delegated-review'
import styles from './review.module.css'

const BAND_OPTIONS = Array.from({ length: 19 }, (_, index) => index / 2)

function lines(value: string): string[] {
  return value.split('\n').map(item => item.trim()).filter(Boolean)
}

export default function ReviewSubmissionForm({ review }: { review: IeltsDelegatedReviewCase }) {
  const [evaluatorName, setEvaluatorName] = useState('')
  const [evaluatorModel, setEvaluatorModel] = useState('')
  const [bands, setBands] = useState<Record<string, number | null>>(() => Object.fromEntries(review.rubric.criteria.map(item => [item.key, null])))
  const [reasons, setReasons] = useState<Record<string, string>>(() => Object.fromEntries(review.rubric.criteria.map(item => [item.key, ''])))
  const [summary, setSummary] = useState('')
  const [strengths, setStrengths] = useState('')
  const [priorities, setPriorities] = useState('')
  const [audioEvidenceAttested, setAudioEvidenceAttested] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<{ listeningBand: number | null; readingBand: number | null; writingBand: number | null; speakingBand: number | null; overallBand: number | null } | null>(null)

  const overallBand = useMemo(() => {
    const scores = review.rubric.criteria.map(criterion => bands[criterion.key])
    if (scores.some((score): score is null => score == null)) return null
    return Math.round((scores.reduce<number>((sum, score) => sum + Number(score), 0) / scores.length) * 2) / 2
  }, [bands, review.rubric.criteria])

  const payload = useMemo(() => ({
    evaluatorName,
    evaluatorModel,
    overallBand,
    criteria: review.rubric.criteria.map(criterion => ({
      criterion: criterion.key,
      band: bands[criterion.key],
      reason: reasons[criterion.key],
    })),
    summary,
    strengths: lines(strengths),
    priorities: lines(priorities),
    ...(review.taskType === 'speaking' ? { audioEvidenceAttested } : {}),
  }), [audioEvidenceAttested, bands, evaluatorModel, evaluatorName, overallBand, priorities, reasons, review.rubric.criteria, review.taskType, strengths, summary])

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const response = await fetch(review.submissionEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const body = await response.json() as {
        ok?: boolean
        error?: string
        consolidated?: { listeningBand: number | null; readingBand: number | null; writingBand: number | null; speakingBand: number | null; overallBand: number | null }
      }
      if (!response.ok || !body.ok || !body.consolidated) throw new Error(body.error || 'No se pudo guardar la evaluación.')
      setResult(body.consolidated)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'No se pudo guardar la evaluación.')
    } finally {
      setSubmitting(false)
    }
  }

  if (result) {
    return (
      <section className={styles.success} aria-live="polite">
        <span className={styles.successIcon}>✓</span>
        <div>
          <h2>Evaluación añadida al consolidado</h2>
          <p>Listening: {result.listeningBand ?? 'pendiente'} · Reading: {result.readingBand ?? 'pendiente'} · Writing: {result.writingBand ?? 'pendiente'} · Speaking: {result.speakingBand ?? 'pendiente'} · Overall: {result.overallBand ?? 'pendiente'}</p>
          <p>El llamado {review.callCode} quedó cerrado y no puede volver a utilizarse.</p>
        </div>
      </section>
    )
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.twoColumns}>
        <label>
          Evaluador
          <input name="evaluator_name" autoComplete="off" required minLength={2} maxLength={120} value={evaluatorName} onChange={event => setEvaluatorName(event.target.value)} placeholder="ChatGPT, Claude o nombre humano…" />
        </label>
        <label>
          Modelo y versión
          <input name="evaluator_model" autoComplete="off" required minLength={2} maxLength={120} value={evaluatorModel} onChange={event => setEvaluatorModel(event.target.value)} placeholder="Ej.: Claude Sonnet 4.5…" />
        </label>
      </div>

      <fieldset>
        <legend>Criterios de la rúbrica oficial</legend>
        <div className={styles.criteriaGrid}>
          {review.rubric.criteria.map(criterion => (
            <div className={styles.criterion} key={criterion.key}>
              <div className={styles.criterionHeader}>
                <strong>{criterion.label}</strong>
                <label>
                  Band
                  <select name={`band_${criterion.key}`} required value={bands[criterion.key] ?? ''} onChange={event => setBands(current => ({ ...current, [criterion.key]: event.target.value === '' ? null : Number(event.target.value) }))}>
                    <option value="">Seleccionar…</option>
                    {BAND_OPTIONS.map(band => <option value={band} key={band}>{band}</option>)}
                  </select>
                </label>
              </div>
              <label>
                Justificación basada en evidencia
                <textarea name={`reason_${criterion.key}`} required minLength={20} maxLength={1500} rows={4} value={reasons[criterion.key]} onChange={event => setReasons(current => ({ ...current, [criterion.key]: event.target.value }))} />
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      <div className={styles.bandLabel}>
        <span>Banda estimada de la tarea</span>
        <strong>{overallBand ?? 'Pendiente'}</strong>
        <small>Promedio automático de los cuatro criterios.</small>
      </div>

      <label>
        Resumen de evaluación
        <textarea name="summary" required minLength={40} maxLength={3000} rows={5} value={summary} onChange={event => setSummary(event.target.value)} placeholder="Explica la banda y cita evidencia de la respuesta…" />
      </label>
      <div className={styles.twoColumns}>
        <label>
          Fortalezas · una por línea
          <textarea name="strengths" required rows={5} value={strengths} onChange={event => setStrengths(event.target.value)} />
        </label>
        <label>
          Prioridades · una por línea
          <textarea name="priorities" required rows={5} value={priorities} onChange={event => setPriorities(event.target.value)} />
        </label>
      </div>

      {review.taskType === 'speaking' && (
        <label>
          <input type="checkbox" name="audio_evidence_attested" required checked={audioEvidenceAttested}
            onChange={event => setAudioEvidenceAttested(event.target.checked)} />
          Escuché todas las grabaciones, confirmé que contienen voz evaluable y basé Pronunciation únicamente en evidencia audible.
        </label>
      )}

      <button className={styles.submit} type="submit" disabled={submitting}>
        {submitting ? 'Guardando evaluación…' : 'Añadir evaluación al reporte consolidado'}
      </button>
      <p className={styles.formNotice}>Al enviar, este enlace de un solo uso queda cerrado.</p>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </form>
  )
}
