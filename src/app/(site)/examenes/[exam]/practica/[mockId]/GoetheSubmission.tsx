'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { saveLead } from '@/lib/actions/saveLead'
import { isPlausibleWhatsapp } from '@/lib/leads/contact'
import type { IeltsSpeakingRecording } from '@/components/exam-runner/IELTSSpeakingRecorder'
import {
  GOETHE_A1_CONTENT_VERSION,
  GOETHE_SPEAKING_BUCKET,
  GOETHE_SUBMISSION_CONSENT_VERSION,
  type GoetheCompleteResponse,
  type GoethePrepareResponse,
  type GoetheSubmissionReceipt,
} from '@/lib/goethe/submission'
import styles from './goethe-a1.module.css'

interface Props {
  mockId: string
  answers: Record<string, number>
  formValues: Record<number, string>
  writing: string
  cardOrders: Record<number, number[]>
  recordings: Record<string, IeltsSpeakingRecording | undefined>
  objectiveMissing: number
  formMissing: number
  onBack: () => void
  onSuccess: (receipt: GoetheSubmissionReceipt) => void
}

type SubmitState = 'idle' | 'capturing' | 'preparing' | 'uploading' | 'confirming'

function readResponse<T>(response: Response): Promise<T & { error?: string }> {
  return response.json().catch(() => { throw new Error('El servidor no respondió correctamente. Inténtalo de nuevo.') })
}

function formatDuration(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

export default function GoetheSubmission({
  mockId,
  answers,
  formValues,
  writing,
  cardOrders,
  recordings,
  objectiveMissing,
  formMissing,
  onBack,
  onSuccess,
}: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [consent, setConsent] = useState(false)
  const [state, setState] = useState<SubmitState>('idle')
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [error, setError] = useState('')
  const leadSaved = useRef(false)

  const audioEntries = Object.entries(recordings).flatMap(([questionId, recording]) => recording ? [{ questionId, recording }] : [])
  const missingAudio = 3 - audioEntries.length
  const openCount = objectiveMissing + formMissing + (writing.trim() ? 0 : 1)
  const busy = state !== 'idle'
  const status = state === 'capturing' ? 'Guardando los datos del estudiante…'
    : state === 'preparing' ? 'Validando respuestas y preparando la entrega privada…'
      : state === 'uploading' ? `Subiendo audio ${progress.current} de ${progress.total}…`
        : state === 'confirming' ? 'Verificando que respuestas y audios llegaron completos…' : ''

  function fail(message: string) {
    setError(message)
    setState('idle')
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()
    if (cleanName.length < 2) return fail('Escribe el nombre completo del estudiante.')
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) return fail('Escribe un correo electrónico válido.')
    if (!isPlausibleWhatsapp(whatsapp)) return fail('Escribe un WhatsApp válido de 10 a 15 dígitos.')
    if (missingAudio > 0) return fail('Graba las tres partes de Sprechen antes de enviar el examen.')
    if (!consent) return fail('Debes autorizar el envío y la evaluación académica.')

    try {
      if (!leadSaved.current) {
        setState('capturing')
        const lead = await saveLead({ name: cleanName, email: cleanEmail, whatsapp, examSlug: 'goethe', examScore: 'Simulacro A1 enviado · evaluación pendiente', source: 'goethe-practica' })
        if (!lead.ok) throw new Error(lead.error ?? 'No pudimos guardar los datos de contacto.')
        leadSaved.current = true
      }
      const payload = {
        contentVersion: GOETHE_A1_CONTENT_VERSION,
        consentVersion: GOETHE_SUBMISSION_CONSENT_VERSION,
        name: cleanName,
        email: cleanEmail,
        answers,
        formValues: Object.fromEntries(Object.entries(formValues).map(([key, value]) => [String(key), value])),
        writing,
        cardOrders: Object.fromEntries(Object.entries(cardOrders).map(([key, value]) => [String(key), value])),
        audio: audioEntries.map(({ questionId, recording }) => ({ questionId, mimeType: recording.mimeType, size: recording.blob.size, durationSeconds: recording.durationSeconds })),
      }
      const endpoint = `/api/goethe/${encodeURIComponent(mockId)}/submissions`
      setState('preparing')
      const prepareRequest = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'prepare', payload }) })
      const prepared = await readResponse<GoethePrepareResponse>(prepareRequest)
      if (!prepareRequest.ok || !prepared.ok) throw new Error(prepared.error || 'No pudimos preparar la entrega.')

      const supabase = createClient()
      if (!supabase) throw new Error('La conexión segura de archivos no está configurada.')
      setState('uploading')
      setProgress({ current: 0, total: prepared.uploads.length })
      for (let index = 0; index < prepared.uploads.length; index += 1) {
        const upload = prepared.uploads[index]
        const recording = recordings[upload.questionId]
        if (!recording) throw new Error(`Falta la grabación ${upload.questionId}.`)
        setProgress({ current: index + 1, total: prepared.uploads.length })
        const { error: uploadError } = await supabase.storage.from(GOETHE_SPEAKING_BUCKET)
          .uploadToSignedUrl(upload.path, upload.token, recording.blob, { contentType: recording.mimeType, upsert: false })
        if (uploadError) throw new Error(`No pudimos subir el audio ${index + 1}. Revisa la conexión e inténtalo de nuevo.`)
      }

      setState('confirming')
      const completeRequest = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'complete', submissionId: prepared.submissionId, completionToken: prepared.completionToken }) })
      const completed = await readResponse<GoetheCompleteResponse>(completeRequest)
      if (!completeRequest.ok || !completed.ok) throw new Error(completed.error || 'No pudimos confirmar la entrega.')
      try {
        localStorage.setItem('wl_lead_captured', '1')
        window.dataLayer?.push({ event: 'goethe_submission', exam_slug: 'goethe', mock_id: mockId, audio_count: audioEntries.length })
      } catch {}
      onSuccess({ submissionId: completed.submissionId, completionToken: completed.completionToken, automatic: completed.automatic })
    } catch (caught) {
      fail(caught instanceof Error ? caught.message : 'No pudimos enviar la entrega. Tus respuestas siguen guardadas en esta pantalla.')
    }
  }

  return (
    <section className={styles.delivery} aria-labelledby="goethe-delivery-title">
      <p className={styles.deliveryEyebrow}>Letzter Schritt · entrega segura</p>
      <h2 id="goethe-delivery-title">Envía el examen para recibir el resultado</h2>
      <p>La corrección automática queda confirmada al instante. Schreiben Teil 2 y Sprechen pasan al panel privado para revisión.</p>

      <div className={styles.deliverySummary}>
        <article><strong>Hören + Lesen</strong><span>{objectiveMissing ? `${objectiveMissing} sin responder` : '30 respuestas registradas'}</span></article>
        <article><strong>Schreiben</strong><span>{formMissing ? `${formMissing} campos del formulario vacíos` : writing.trim() ? 'Formulario y mensaje registrados' : 'Mensaje sin responder'}</span></article>
        <article className={missingAudio ? styles.deliveryMissing : styles.deliveryReady}><strong>Sprechen</strong><span>{audioEntries.length}/3 grabaciones {missingAudio ? '· faltan audios' : '· listas'}</span></article>
      </div>

      {audioEntries.length > 0 && <ul className={styles.deliveryAudioList}>{audioEntries.map(({ questionId, recording }) => <li key={questionId}><span>{questionId.replace('g-a1-1-sp', 'Sprechen Teil ')}</span><strong>{formatDuration(recording.durationSeconds)}</strong></li>)}</ul>}
      {openCount > 0 && <p className={styles.deliveryWarning}>Puedes entregar respuestas escritas incompletas; los campos vacíos cuentan como cero. Los tres audios sí son necesarios para que administración pueda evaluar Sprechen.</p>}

      <form className={styles.deliveryForm} onSubmit={submit} noValidate>
        <label>Nombre completo<input value={name} onChange={event => setName(event.target.value)} autoComplete="name" disabled={busy} /></label>
        <label>Correo electrónico<input type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" disabled={busy} /></label>
        <label>WhatsApp<input type="tel" value={whatsapp} onChange={event => setWhatsapp(event.target.value)} autoComplete="tel" placeholder="Ej. 3001234567" disabled={busy} /></label>
        <label className={styles.deliveryConsent}><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} disabled={busy} /><span>Autorizo el almacenamiento privado de mis respuestas y audios para evaluación académica y el contacto relacionado con este simulacro.</span></label>
        {error && <p className={styles.deliveryError} role="alert">{error}</p>}
        {status && <p className={styles.deliveryStatus} role="status" aria-live="polite">{status}</p>}
        <div className={styles.deliveryActions}><button type="button" className={styles.secondary} onClick={onBack} disabled={busy}>Volver a Sprechen</button><button type="submit" className={styles.primary} disabled={busy}>{busy ? 'Enviando…' : 'Entregar y ver resultado'}</button></div>
      </form>
    </section>
  )
}
