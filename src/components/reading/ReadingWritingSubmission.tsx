'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { ReadingExercise } from '@/lib/reading/types'
import styles from './reading.module.css'

export function ReadingWritingSubmission({ exercise, text }: { exercise: ReadingExercise; text: string }) {
  const [loading, setLoading] = useState(false)
  const [submittedText, setSubmittedText] = useState('')
  const [error, setError] = useState('')
  const [needsSignIn, setNeedsSignIn] = useState(false)
  const normalized = text.trim()
  const units = exercise.language === 'ja' ? Array.from(normalized.replace(/\s+/gu, '')).length : normalized.split(/\s+/u).filter(Boolean).length
  const ready = units >= exercise.production.minWords && units <= exercise.production.maxWords && new TextEncoder().encode(normalized).byteLength <= 8_000

  async function submit() {
    if (!ready || loading || submittedText === normalized) return
    setLoading(true)
    setError('')
    setNeedsSignIn(false)
    try {
      const response = await fetch('/api/reading/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exerciseId: exercise.id, text: normalized, consent: true }),
      })
      const result = await response.json() as { code?: string }
      if (response.ok) setSubmittedText(normalized)
      else if (response.status === 401) { setNeedsSignIn(true); setError('Sign in in a new tab, then return here to send your writing.') }
      else setError(result.code === 'invalid_length' ? 'Check the required length before submitting.' : 'Could not save your writing. It is still in the editor; please try again.')
    } catch { setError('Could not connect. Your writing is still in the editor; please try again.') }
    finally { setLoading(false) }
  }

  return <section className={styles.submissionBox} aria-label="Send writing to your tutor">
    <p><strong>Share with your tutor</strong> Your writing will be saved privately with this reading and your account. Your tutor can review it in the WeLearn admin panel. Sending is optional and does not change your score.</p>
    <button type="button" className={styles.secondaryButton} onClick={submit} disabled={!ready || loading || submittedText === normalized}>
      {loading ? 'Sending…' : submittedText === normalized && normalized ? 'Sent to your tutor' : 'Send my writing'}
    </button>
    {!ready && <p className={styles.submissionHint}>Write {exercise.production.minWords}–{exercise.production.maxWords} {exercise.language === 'ja' ? 'characters' : 'words'} to send your response.</p>}
    {error && <p className={styles.submissionError} role="alert">{error} {needsSignIn && <Link href="/login" target="_blank" rel="noopener noreferrer">Sign in</Link>}</p>}
    {submittedText === normalized && normalized && <p className={styles.submissionSuccess} role="status">Saved. Your tutor can now see this version.</p>}
  </section>
}
