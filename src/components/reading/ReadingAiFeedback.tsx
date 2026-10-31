'use client'

import { useState } from 'react'
import type { AiFeedback } from '@/lib/reading/ai-feedback'
import styles from './reading.module.css'

export function ReadingAiFeedback({ text }: { text: string }) {
  const [loading, setLoading] = useState(false)
  const [submittedText, setSubmittedText] = useState('')
  const [feedback, setFeedback] = useState<AiFeedback | null>(null)
  const [error, setError] = useState('')
  const words = text.trim().split(/\s+/u).filter(Boolean).length
  const phrases = text.trim().split(/(?<=[.!?])\s+|\n+/u).map((part) => part.trim()).filter(Boolean).length
  const ready = phrases >= 5 && phrases <= 7 && words >= 25 && words <= 60 && text.trim().length <= 700
  const currentFeedback = submittedText === text ? feedback : null
  const currentError = submittedText === text ? error : ''

  async function review() {
    if (!ready || loading) return
    setLoading(true)
    setSubmittedText(text)
    setFeedback(null)
    setError('')
    try {
      const response = await fetch('/api/practica/aleman/a1/lectura/ai-feedback', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exerciseId: 'de-a1-der-weg-zur-arbeit', text }),
      })
      const result = await response.json() as { feedback?: AiFeedback; message?: string }
      if (!response.ok || !result.feedback) {
        setError(result.message || 'La revisión no está disponible ahora. Tu texto sigue aquí.')
      } else setFeedback(result.feedback)
    } catch {
      setError('No hay conexión con la revisión. Tu texto sigue aquí; inténtalo más tarde.')
    } finally { setLoading(false) }
  }

  return (
    <div className={styles.aiReview}>
      <p><strong>Revisión opcional con IA.</strong> Al pulsar «Revisar mi texto con IA», enviaremos solo tu texto escrito a OpenAI para darte comentarios. Las grabaciones de audio permanecen en este dispositivo y no se envían.</p>
      <button type="button" className={styles.secondaryButton} onClick={review} disabled={!ready || loading}>
        {loading ? 'Revisando…' : 'Revisar mi texto con IA'}
      </button>
      {!ready && <p className={styles.aiHint}>Escribe 5–7 frases y 25–60 palabras (máximo 700 caracteres) para activar la revisión.</p>}
      <div aria-live="polite">
        {currentError && <p className={styles.aiError}>{currentError}</p>}
        {currentFeedback && (
          <div className={styles.aiResult}>
            <h3>Comentarios para practicar</h3>
            <p>Orientación automática, no una calificación oficial.</p>
            {currentFeedback.errores.length ? <ol>{currentFeedback.errores.map((item, index) => (
              <li key={index}><strong>{item.fragmento}</strong>: {item.explicacion} <span>{item.sugerencia}</span></li>
            ))}</ol> : <p>No encontré un error prioritario. Revisa la versión propuesta y sigue practicando las preposiciones.</p>}
            <h4>Versión corregida</h4><p lang="de">{currentFeedback.version_corregida}</p>
            <h4>Ahora te toca</h4><p>{currentFeedback.reescribe}</p>
          </div>
        )}
      </div>
    </div>
  )
}
