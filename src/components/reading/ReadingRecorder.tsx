'use client'

import { useEffect, useRef, useState } from 'react'
import { Mic, ShieldCheck, Square, Trash2 } from 'lucide-react'
import type { TutorLocale } from '@/lib/reading/types'
import styles from './reading.module.css'

const DB_NAME = 'welearn-reading-local'
const STORE_NAME = 'recordings'

const COPY = {
  es: {
    title: 'Grábate leyendo',
    description: 'Escucha tu lectura y compárala con el texto. El audio se guarda únicamente en este dispositivo y nunca se sube a WeLearn.',
    start: 'Grabar mi lectura', stop: 'Detener', replace: 'Grabar de nuevo', remove: 'Borrar audio', saved: 'Guardado en este dispositivo',
    unsupported: 'Este navegador no permite grabar audio.',
    denied: 'No pudimos usar el micrófono. Revisa el permiso del navegador e inténtalo otra vez.',
  },
  en: {
    title: 'Record yourself reading',
    description: 'Listen back and compare your reading with the text. The audio stays on this device and is never uploaded to WeLearn.',
    start: 'Record my reading', stop: 'Stop', replace: 'Record again', remove: 'Delete audio', saved: 'Saved on this device',
    unsupported: 'This browser cannot record audio.',
    denied: 'We could not use the microphone. Check the browser permission and try again.',
  },
} as const

function openRecordingDb() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) request.result.createObjectStore(STORE_NAME)
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function readRecording(key: string) {
  const db = await openRecordingDb()
  return new Promise<Blob | null>((resolve, reject) => {
    const request = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(key)
    request.onsuccess = () => { db.close(); resolve(request.result instanceof Blob ? request.result : null) }
    request.onerror = () => { db.close(); reject(request.error) }
  })
}

async function saveRecording(key: string, blob: Blob) {
  const db = await openRecordingDb()
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    transaction.objectStore(STORE_NAME).put(blob, key)
    transaction.oncomplete = () => { db.close(); resolve() }
    transaction.onerror = () => { db.close(); reject(transaction.error) }
  })
}

async function removeRecording(key: string) {
  const db = await openRecordingDb()
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    transaction.objectStore(STORE_NAME).delete(key)
    transaction.oncomplete = () => { db.close(); resolve() }
    transaction.onerror = () => { db.close(); reject(transaction.error) }
  })
}

function preferredMimeType() {
  return ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm'].find((type) => MediaRecorder.isTypeSupported(type))
}

export function ReadingRecorder({ exerciseId, locale }: { exerciseId: string; locale: TutorLocale }) {
  const copy = COPY[locale]
  const storageKey = `reading-recording:${exerciseId}`
  const [status, setStatus] = useState<'loading' | 'idle' | 'recording' | 'ready'>('loading')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [seconds, setSeconds] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const urlRef = useRef<string | null>(null)

  function replaceAudioUrl(next: string | null) {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    urlRef.current = next
    setAudioUrl(next)
  }

  function releaseMicrophone() {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
  }

  useEffect(() => {
    let active = true
    readRecording(storageKey)
      .then((blob) => {
        if (!active) return
        if (blob) {
          replaceAudioUrl(URL.createObjectURL(blob))
          setStatus('ready')
        } else setStatus('idle')
      })
      .catch(() => { if (active) { setError(copy.unsupported); setStatus('idle') } })
    return () => {
      active = false
      releaseMicrophone()
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    }
  // The exercise ID defines the local recording slot; localized copy does not change persistence.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey])

  async function startRecording() {
    setError(null)
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setError(copy.unsupported)
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })
      streamRef.current = stream
      chunksRef.current = []
      const mimeType = preferredMimeType()
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined)
      recorderRef.current = recorder
      recorder.ondataavailable = (event) => { if (event.data.size > 0) chunksRef.current.push(event.data) }
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
        releaseMicrophone()
        if (!blob.size) { setError(copy.unsupported); setStatus(audioUrl ? 'ready' : 'idle'); return }
        try {
          await saveRecording(storageKey, blob)
          replaceAudioUrl(URL.createObjectURL(blob))
          setStatus('ready')
        } catch {
          setError(copy.unsupported)
          setStatus(audioUrl ? 'ready' : 'idle')
        }
      }
      setSeconds(0)
      setStatus('recording')
      recorder.start(250)
      timerRef.current = setInterval(() => setSeconds((current) => current + 1), 1000)
    } catch {
      releaseMicrophone()
      setError(copy.denied)
      setStatus(audioUrl ? 'ready' : 'idle')
    }
  }

  function stopRecording() {
    if (recorderRef.current?.state === 'recording') recorderRef.current.stop()
  }

  async function deleteRecording() {
    await removeRecording(storageKey)
    replaceAudioUrl(null)
    setSeconds(0)
    setStatus('idle')
    setError(null)
  }

  return (
    <aside className={styles.recorder} aria-labelledby="reading-recorder-title">
      <div className={styles.recorderHeading}>
        <span className={styles.recorderIcon}><Mic size={18} /></span>
        <div><h3 id="reading-recorder-title">{copy.title}</h3><p>{copy.description}</p></div>
      </div>
      {status === 'recording' ? (
        <button type="button" className={styles.recordingButton} onClick={stopRecording}><Square size={15} /> {copy.stop} · {seconds}s</button>
      ) : (
        <button type="button" className={styles.secondaryButton} onClick={startRecording} disabled={status === 'loading'}><Mic size={16} /> {audioUrl ? copy.replace : copy.start}</button>
      )}
      {audioUrl && (
        <div className={styles.localPlayback}>
          <audio controls preload="metadata" src={audioUrl} />
          <span><ShieldCheck size={14} /> {copy.saved}</span>
          <button type="button" onClick={deleteRecording}><Trash2 size={14} /> {copy.remove}</button>
        </div>
      )}
      {error && <p className={styles.recorderError} role="alert">{error}</p>}
    </aside>
  )
}
