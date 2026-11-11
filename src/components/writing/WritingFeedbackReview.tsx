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

const REVIEW_COPY = {
  es: {
    aria: 'Comentarios sobre tu texto', optional: 'Revisión opcional.', notice: 'Al pulsar el botón, enviaremos únicamente tu texto y el contexto de esta tarea a {provider} para recibir comentarios. Esta revisión no envía grabaciones de audio.',
    loading: 'Revisando…', action: 'Revisar mi texto', unavailable: 'La revisión no está disponible ahora. Tu ejercicio sigue intacto.', offline: 'No hay conexión con la revisión. Tu texto sigue aquí; inténtalo más tarde.',
    tooLong: 'El texto supera el tamaño permitido; acórtalo antes de solicitar comentarios.', short: 'Escribe un texto de al menos 12 caracteres para activar la revisión.',
    title: 'Comentarios para practicar', disclaimer: 'Orientación automática; no es una calificación oficial.', freeTier: 'Google puede usar el contenido enviado a su API gratuita para mejorar sus productos.', correction: 'Corrección:', noErrors: 'No hay errores prioritarios. Relee tu versión corregida y sigue practicando el objetivo de esta tarea.', version: 'Versión corregida', next: 'Ahora te toca', words: 'palabras', sentences: 'frases', maximum: 'máximo', requirement: 'Para esta tarea, escribe', beforeReview: 'antes de solicitar comentarios.',
  },
  en: {
    aria: 'Feedback on your writing', optional: 'Optional review.', notice: 'When you press the button, only your text and this task’s context are sent to {provider} for feedback. No audio recording is sent.',
    loading: 'Reviewing…', action: 'Review my writing', unavailable: 'Review is unavailable right now. Your draft is still here.', offline: 'Could not connect to the review service. Your draft is still here; try again later.',
    tooLong: 'Your text is too long. Shorten it before requesting feedback.', short: 'Write at least 12 characters to enable the review.',
    title: 'Feedback for practice', disclaimer: 'Automated guidance, not an official grade.', freeTier: 'Google may use content sent through its free API to improve its products.', correction: 'Correction:', noErrors: 'No priority errors found. Read the corrected version and keep practising this task.', version: 'Corrected version', next: 'Your turn', words: 'words', sentences: 'sentences', maximum: 'maximum', requirement: 'For this task, write', beforeReview: 'before requesting feedback.',
  },
} as const

export function WritingFeedbackReview({ text, assignment, requirements, locale = 'es', endpoint = '/api/writing/feedback', provider = 'OpenAI' }: { text: string; assignment: WritingAssignmentContext; requirements?: WritingDraftRequirements; locale?: 'es' | 'en'; endpoint?: string; provider?: string }) {
  const copy = REVIEW_COPY[locale]
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
      ? `${requirements.minSentences ?? 1}–${requirements.maxSentences ?? '∞'} ${copy.sentences}` : '',
    requirements.minWords !== undefined || requirements.maxWords !== undefined
      ? `${requirements.minWords ?? 1}–${requirements.maxWords ?? '∞'} ${copy.words}` : '',
    requirements.maxCharacters !== undefined ? `${copy.maximum} ${requirements.maxCharacters} ${locale === 'es' ? 'caracteres' : 'characters'}` : '',
    requirements.minCharacters !== undefined ? `${requirements.minCharacters}+ ${locale === 'es' ? 'caracteres' : 'characters'}` : '',
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
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consent: true, text: normalizedText, assignment }),
      })
      const result = await response.json() as { feedback?: WritingFeedback; message?: string }
      if (!response.ok || !result.feedback) setError(locale === 'en' ? copy.unavailable : result.message || copy.unavailable)
      else setFeedback(result.feedback)
    } catch {
      setError(copy.offline)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={styles.review} aria-label={copy.aria}>
      <p className={styles.notice}>
        <strong>{copy.optional}</strong> {copy.notice.replace('{provider}', provider)} {provider === 'Google Gemini' && copy.freeTier}
      </p>
      <button type="button" className="btn btn-ghost" onClick={review} disabled={!ready || loading}>
        {loading ? copy.loading : copy.action}
      </button>
      {!ready && <p className={styles.hint}>{!withinSize ? copy.tooLong : requirements && !meetsRequirements ? `${copy.requirement} ${requirementHint} ${copy.beforeReview}` : copy.short}</p>}
      <div aria-live="polite">
        {currentError && <p className={styles.error} role="alert">{currentError}</p>}
        {currentFeedback && (
          <div className={styles.result}>
            <h3>{copy.title}</h3>
            <p>{copy.disclaimer}</p>
            {currentFeedback.errores.length ? <ol>{currentFeedback.errores.map((issue, index) => (
              <li key={`${issue.fragmento}-${index}`}>
                <strong>{issue.fragmento}</strong> — {issue.explicacion} <span>{copy.correction} {issue.correccion}</span>
              </li>
            ))}</ol> : <p>{copy.noErrors}</p>}
            <h4>{copy.version}</h4>
            <p lang={languageTag}>{currentFeedback.version_corregida}</p>
            <h4>{copy.next}</h4>
            <p>{currentFeedback.reescribe}</p>
          </div>
        )}
      </div>
    </section>
  )
}
