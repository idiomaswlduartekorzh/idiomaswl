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
  const [bands, setBands] = useState<Record<string, number>>(() => Object.fromEntries(review.rubric.criteria.map(item => [item.key, 6])))
  const [reasons, setReasons] = useState<Record<string, string>>(() => Object.fromEntries(review.rubric.criteria.map(item => [item.key, ''])))
  const [summary, setSummary] = useState('')
  const [strengths, setStrengths] = useState('')
  const [priorities, setPriorities] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<{ listeningBand: number | null; readingBand: number | null; writingBand: number | null; speakingBand: number | null; overallBand: number | null } | null>(null)

  const overallBand = useMemo(() => {
    const scores = review.rubric.criteria.map(criterion => bands[criterion.key])
    return Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 2) / 2
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
  }), [bands, evaluatorModel, evaluatorName, overallBand, priorities, reasons, review.rubric.criteria, strengths, summary])

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
          <input required minLength={2} maxLength={120} value={evaluatorName} onChange={event => setEvaluatorName(event.target.value)} placeholder="ChatGPT, Claude o nombre humano" />
        </label>
        <label>
          Modelo y versión
          <input required minLength={2} maxLength={120} value={evaluatorModel} onChange={event => setEvaluatorModel(event.target.value)} placeholder="Ej. Claude Sonnet 4.5" />
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
                  <select value={bands[criterion.key]} onChange={event => setBands(current => ({ ...current, [criterion.key]: Number(event.target.value) }))}>
                    {BAND_OPTIONS.map(band => <option value={band} key={band}>{band}</option>)}
                  </select>
                </label>
              </div>
              <label>
                Justificación basada en evidencia
                <textarea required minLength={20} maxLength={1500} rows={4} value={reasons[criterion.key]} onChange={event => setReasons(current => ({ ...current, [criterion.key]: event.target.value }))} />
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      <div className={styles.bandLabel}>
        <span>Banda estimada de la tarea</span>
        <strong>{overallBand}</strong>
        <small>Promedio automático de los cuatro criterios.</small>
      </div>

      <label>
        Resumen de evaluación
        <textarea required minLength={40} maxLength={3000} rows={5} value={summary} onChange={event => setSummary(event.target.value)} placeholder="Explica la banda y cita evidencia de la respuesta." />
      </label>
      <div className={styles.twoColumns}>
        <label>
          Fortalezas · una por línea
          <textarea required rows={5} value={strengths} onChange={event => setStrengths(event.target.value)} />
        </label>
        <label>
          Prioridades · una por línea
          <textarea required rows={5} value={priorities} onChange={event => setPriorities(event.target.value)} />
        </label>
      </div>

      <button className={styles.submit} type="submit" disabled={submitting}>
        {submitting ? 'Guardando evaluación…' : 'Añadir evaluación al reporte consolidado'}
      </button>
      <p className={styles.formNotice}>Al enviar, este enlace de un solo uso queda cerrado.</p>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </form>
  )
}
