'use client'

import { useEffect, useRef, useState } from 'react'
import { Mic, RotateCcw, Square } from 'lucide-react'
import type { GuidedRecordingPrompt } from '@/data/practica/advanced-guided-topics'
import styles from './GuidedAdvancedLesson.module.css'

type RecorderStatus = 'idle' | 'recording' | 'ready' | 'error'

function formatDuration(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
}

export default function LocalVoiceRecorder({ prompt }: { prompt: GuidedRecordingPrompt }) {
  const [status, setStatus] = useState<RecorderStatus>('idle')
  const [seconds, setSeconds] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState('')
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const audioUrlRef = useRef<string | null>(null)

  const releaseStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }

  const releaseAudioUrl = () => {
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current)
    audioUrlRef.current = null
  }

  useEffect(() => {
    if (status !== 'recording') return
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000)
    return () => window.clearInterval(timer)
  }, [status])

  useEffect(() => () => {
    if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop()
    releaseStream()
    releaseAudioUrl()
  }, [])

  const startRecording = async () => {
    setError('')
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setStatus('error')
      setError('Este navegador no permite grabar desde esta página. Puedes responder en vivo y conservar tus notas.')
      return
    }

    try {
      releaseAudioUrl()
      setAudioUrl(null)
      setSeconds(0)
      chunksRef.current = []
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      streamRef.current = stream
      mediaRecorderRef.current = recorder
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data)
      }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
        const nextUrl = URL.createObjectURL(blob)
        audioUrlRef.current = nextUrl
        setAudioUrl(nextUrl)
        setStatus('ready')
        releaseStream()
      }
      recorder.onerror = () => {
        setStatus('error')
        setError('La grabación se interrumpió. Revisa el permiso del micrófono e inténtalo de nuevo.')
        releaseStream()
      }
      recorder.start(250)
      setStatus('recording')
    } catch {
      setStatus('error')
      setError('No se pudo abrir el micrófono. Revisa el permiso del navegador o responde en vivo.')
      releaseStream()
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop()
  }

  const resetRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop()
    releaseStream()
    releaseAudioUrl()
    chunksRef.current = []
    setAudioUrl(null)
    setSeconds(0)
    setError('')
    setStatus('idle')
  }

  return (
    <section className={styles.recorder} aria-labelledby={`${prompt.id}-recorder-title`}>
      <div className={styles.recorderPrompt}>
        <span>{prompt.targetSeconds}</span>
        <h3 id={`${prompt.id}-recorder-title`}>{prompt.label}</h3>
        <p>{prompt.prompt}</p>
      </div>

      <div className={styles.recorderControls}>
        <div className={styles.recorderClock} aria-live="polite">
          <span className={status === 'recording' ? styles.recordingDot : ''} aria-hidden="true" />
          <strong>{formatDuration(seconds)}</strong>
          <small>{status === 'recording' ? 'Recording' : status === 'ready' ? 'Ready to review' : 'Local voice note'}</small>
        </div>

        {status !== 'recording' ? (
          <button className={styles.recordButton} onClick={startRecording} type="button">
            <Mic size={18} aria-hidden="true" />
            {status === 'ready' ? 'Record another take' : 'Start recording'}
          </button>
        ) : (
          <button className={styles.stopButton} onClick={stopRecording} type="button">
            <Square size={16} fill="currentColor" aria-hidden="true" /> Stop and review
          </button>
        )}

        {(status === 'ready' || status === 'error') && (
          <button className={styles.discardButton} onClick={resetRecording} type="button">
            <RotateCcw size={15} aria-hidden="true" /> Discard
          </button>
        )}
      </div>

      {audioUrl && (
        <div className={styles.localPlayback}>
          <audio controls src={audioUrl}>
            Tu navegador no puede reproducir esta grabación local.
          </audio>
          <p>No hay botón de entrega: este piloto no sube ni comparte el audio.</p>
        </div>
      )}
      {error && <p className={styles.recorderError} role="alert">{error}</p>}
      <p className={styles.privacyNote}>{prompt.privacyNote}</p>
    </section>
  )
}
