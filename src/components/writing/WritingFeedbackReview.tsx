'use client'

import { useState } from 'react'
import { meetsWritingDraftRequirements } from '@/lib/writing-feedback-shared'
import type { WritingAssignmentContext, WritingDraftRequirements, WritingFeedback } from '@/lib/writing-feedback-shared'
import styles from './WritingFeedbackReview.module.css'

const LANGUAGE_TAGS: Record<string, string> = {
  alemán: 'de', aleman: 'de', deutsch: 'de', inglés: 'en', ingles: 'en', english: 'en', español: 'es', espanol: 'es', spanish: 'es', francés: 'fr', frances: 'fr', français: 'fr',
  italiano: 'it', portugués: 'pt', portugues: 'pt', ruso: 'ru', japonés: 'ja', japones: 'ja', coreano: 'ko',
  german: 'de', french: 'fr', italian: 'it', portuguese: 'pt', russian: 'ru', japanese: 'ja', korean: 'ko',
}

export function WritingFeedbackReview({ text, assignment, requirements }: { text: string; assignment: WritingAssignmentContext; requirements?: WritingDraftRequirements }) {
  const [loading, setLoading] = useState(false)
  const [submittedKey, setSubmittedKey] = useState('')
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null)
  const [error, setError] = useState('')
  const normalizedText = text.trim()
  const withinSize = new TextEncoder().encode(normalizedText).byteLength <= 8_000
  const meetsRequirements = meetsWritingDraftRequirements(normalizedText, requirements)
  const ready = normalizedText.length >= 12 && withinSize && meetsRequirements
  const requirementHint = requirements ? [
    requirements.minSentences !== undefined || requirements.maxSentences !== undefined
      ? `${requirements.minSentences ?? 1}–${requirements.maxSentences ?? '∞'} frases` : '',
    requirements.minWords !== undefined || requirements.maxWords !== undefined
      ? `${requirements.minWords ?? 1}–${requirements.maxWords ?? '∞'} palabras` : '',
    requirements.maxCharacters !== undefined ? `máximo ${requirements.maxCharacters} caracteres` : '',
  ].filter(Boolean).join(', ') : ''
  const currentKey = `${normalizedText}\n${JSON.stringify(assignment)}`
  const languageName = assignment.language.toLocaleLowerCase()
  const languageTag = LANGUAGE_TAGS[languageName]
    ?? (/^[a-z]{2}(-[a-z]{2})?$/i.test(assignment.language.trim()) ? assignment.language.trim() : 'und')
  const currentFeedback = submittedKey === currentKey ? feedback : null
  const currentError = submittedKey === currentKey ? error : ''

  async function review() {
    if (!ready || loading) return
    setLoading(true)
    setSubmittedKey(currentKey)
    setFeedback(null)
    setError('')
    try {
      const response = await fetch('/api/writing/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consent: true, text: normalizedText, assignment }),
      })
      const result = await response.json() as { feedback?: WritingFeedback; message?: string }
      if (!response.ok || !result.feedback) setError(result.message || 'La revisión no está disponible ahora. Tu ejercicio sigue intacto.')
      else setFeedback(result.feedback)
    } catch {
      setError('No hay conexión con la revisión. Tu texto sigue aquí; inténtalo más tarde.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={styles.review} aria-label="Comentarios sobre tu texto">
      <p className={styles.notice}>
        <strong>Revisión opcional.</strong> Al pulsar el botón, enviaremos únicamente tu texto y el contexto de esta tarea a OpenAI para recibir comentarios. Esta revisión no envía grabaciones de audio.
      </p>
      <button type="button" className="btn btn-ghost" onClick={review} disabled={!ready || loading}>
        {loading ? 'Revisando…' : 'Revisar mi texto'}
      </button>
      {!ready && <p className={styles.hint}>{!withinSize ? 'El texto supera el tamaño permitido; acórtalo antes de solicitar comentarios.' : requirements && !meetsRequirements ? `Para esta tarea, escribe ${requirementHint} antes de solicitar comentarios.` : 'Escribe un texto de al menos 12 caracteres para activar la revisión.'}</p>}
      <div aria-live="polite">
        {currentError && <p className={styles.error} role="alert">{currentError}</p>}
        {currentFeedback && (
          <div className={styles.result}>
            <h3>Comentarios para practicar</h3>
            <p>Orientación automática; no es una calificación oficial.</p>
            {currentFeedback.errores.length ? <ol>{currentFeedback.errores.map((issue, index) => (
              <li key={`${issue.fragmento}-${index}`}>
                <strong>{issue.fragmento}</strong> — {issue.explicacion} <span>Corrección: {issue.correccion}</span>
              </li>
            ))}</ol> : <p>No hay errores prioritarios. Relee tu versión corregida y sigue practicando el objetivo de esta tarea.</p>}
            <h4>Versión corregida</h4>
            <p lang={languageTag}>{currentFeedback.version_corregida}</p>
            <h4>Ahora te toca</h4>
            <p>{currentFeedback.reescribe}</p>
          </div>
        )}
      </div>
    </section>
  )
}
