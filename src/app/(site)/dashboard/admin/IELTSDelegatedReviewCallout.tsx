'use client'

import { useMemo, useState } from 'react'
import { Bot, Copy, Link2, ShieldCheck, XCircle } from 'lucide-react'
import {
  createIeltsDelegatedReviewInvite,
  revokeIeltsDelegatedReviewInvite,
  type CreateIeltsDelegatedReviewResult,
} from '@/lib/actions/ieltsDelegatedReview'
import type { IeltsDelegatedReviewTask } from '@/lib/ielts/delegated-review'
import type { ExamSubmission } from './JoseDashboardServer'

const A = '#c87941'
const TEXT = '#1a1a2e'
const MUTED = '#6b7280'
const BORDER = '#e8ddd4'

type CreatedInvite = Extract<CreateIeltsDelegatedReviewResult, { ok: true }>

export default function IELTSDelegatedReviewCallout({ submission }: { submission: ExamSubmission }) {
  const [creating, setCreating] = useState<IeltsDelegatedReviewTask | null>(null)
  const [invite, setInvite] = useState<CreatedInvite | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const available: Record<IeltsDelegatedReviewTask, boolean> = {
    writing_task_1: Boolean(submission.writing_task1_answer?.trim()),
    writing_task_2: Boolean(submission.writing_task2_answer?.trim()),
    speaking: Boolean(submission.speaking_audio_paths && Object.keys(submission.speaking_audio_paths).length > 0),
  }
  const speakingAudioCount = submission.speaking_audio_paths ? Object.keys(submission.speaking_audio_paths).length : 0

  const fullUrl = invite?.url ?? ''
  const prompt = useMemo(() => {
    if (!invite || !fullUrl) return ''
    const speakingProtocol = invite.task === 'speaking'
      ? `\nProtocolo auditivo obligatorio: escucha todas las grabaciones antes de puntuar. Evalúa Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy y Pronunciation. Para pronunciación usa únicamente evidencia audible: inteligibilidad, sonidos, acento léxico, ritmo, entonación y connected speech. No deduzcas pronunciación desde notas o transcripciones y no penalices un acento solo por no ser nativo. Si algún audio no se reproduce o no contiene voz evaluable, no envíes una banda y avísame.`
      : ''
    return `Necesito que evalúes una tarea IELTS mediante un llamado delegado de WeLearn.

Código del llamado: ${invite.callCode}
Código único del intento: ${submission.id}
Tarea: ${invite.taskLabel}
Rúbrica: ${invite.rubricVersion}
Fuente oficial: ${invite.rubricUrl}
Enlace privado de un solo uso: ${fullUrl}
${speakingProtocol}

Abre el enlace. Revisa primero la consigna, la respuesta o los audios y los descriptores oficiales enlazados. Evalúa los cuatro criterios, justifica cada banda con evidencia, registra fortalezas y prioridades y envía el reporte desde la misma página. No solicites credenciales de administrador y no intentes acceder a otros estudiantes. La banda es una estimación pedagógica, no un resultado oficial de IELTS.`
  }, [fullUrl, invite, submission.id])

  async function create(task: IeltsDelegatedReviewTask) {
    setCreating(task)
    setInvite(null)
    setMessage('')
    setError('')
    setCopied(false)
    const result = await createIeltsDelegatedReviewInvite(submission.id, task)
    if (result.ok) {
      setInvite(result)
      setMessage('Llamado creado. Si generas otro para la misma tarea, este se revoca automáticamente.')
    } else {
      setError(result.error)
    }
    setCreating(null)
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setMessage('Llamado copiado. Ya puedes pegarlo en ChatGPT o Claude.')
    } catch {
      setError('No pudimos copiar automáticamente. Selecciona el texto y cópialo manualmente.')
    }
  }

  async function revoke() {
    if (!invite) return
    const result = await revokeIeltsDelegatedReviewInvite(invite.inviteId)
    if (result.ok) {
      setInvite(null)
      setMessage('Llamado revocado. El enlace ya no permite evaluar.')
      setCopied(false)
    } else {
      setError(result.error ?? 'No pudimos revocar el llamado.')
    }
  }

  return (
    <section style={{ border: `1px solid ${BORDER}`, borderRadius: 12, background: '#fff', padding: 13 }} aria-labelledby={`delegated-review-${submission.id}`}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
        <Bot size={18} color={A} aria-hidden="true" />
        <div>
          <h4 id={`delegated-review-${submission.id}`} style={{ margin: 0, color: TEXT, fontSize: 12 }}>Llamado para ChatGPT, Claude o evaluador externo</h4>
          <p style={{ margin: '4px 0 0', color: MUTED, fontSize: 10, lineHeight: 1.45 }}>Crea un enlace de 24 horas y un solo uso. Solo abre la tarea elegida; nunca comparte tu sesión admin ni el correo de la estudiante.</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
        {([
          ['writing_task_1', 'Crear llamado · Task 1'],
          ['writing_task_2', 'Crear llamado · Task 2'],
          ['speaking', 'Crear llamado · Speaking'],
        ] as [IeltsDelegatedReviewTask, string][]).map(([task, label]) => (
          <button
            type="button"
            key={task}
            disabled={!available[task] || creating !== null}
            onClick={() => create(task)}
            style={{ border: `1px solid ${BORDER}`, borderRadius: 8, background: creating === task ? `${A}18` : '#fff', color: available[task] ? TEXT : MUTED, padding: '7px 9px', fontSize: 10, fontWeight: 750, cursor: available[task] && !creating ? 'pointer' : 'not-allowed', opacity: available[task] ? 1 : 0.55 }}
          >
            {creating === task ? 'Creando…' : label}
          </button>
        ))}
      </div>
      <p style={{ margin: '7px 0 0', color: MUTED, fontSize: 9 }}>
        Speaking: {speakingAudioCount > 0 ? `${speakingAudioCount} audios detectados; se validarán contra todas las consignas antes de crear el llamado.` : 'sin grabaciones disponibles.'}
      </p>

      {invite && (
        <div style={{ marginTop: 11, padding: 11, borderRadius: 10, background: '#f8f4f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
            <div>
              <p style={{ margin: 0, color: A, fontSize: 10, fontWeight: 850 }}>{invite.callCode}</p>
              <p style={{ margin: '3px 0 0', color: MUTED, fontSize: 9 }}>Vence {new Date(invite.expiresAt).toLocaleString('es-CO')}</p>
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#166534', fontSize: 9, fontWeight: 750 }}><ShieldCheck size={13} /> Un solo uso</span>
          </div>
          <textarea readOnly value={prompt} aria-label="Llamado listo para copiar" style={{ boxSizing: 'border-box', width: '100%', minHeight: 205, marginTop: 8, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 9, resize: 'vertical', color: TEXT, background: '#fff', fontSize: 10, lineHeight: 1.5 }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 7 }}>
            <button type="button" onClick={copyPrompt} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, border: 0, borderRadius: 8, padding: '7px 9px', background: A, color: '#fff', fontSize: 10, fontWeight: 800, cursor: 'pointer' }}><Copy size={13} /> {copied ? 'Copiado' : 'Copiar llamado'}</button>
            <a href={invite.path} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, border: `1px solid ${BORDER}`, borderRadius: 8, padding: '7px 9px', color: TEXT, textDecoration: 'none', fontSize: 10, fontWeight: 750 }}><Link2 size={13} /> Probar enlace</a>
            <button type="button" onClick={revoke} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, border: 0, background: 'transparent', color: '#b91c1c', fontSize: 10, fontWeight: 750, cursor: 'pointer' }}><XCircle size={13} /> Revocar</button>
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" style={{ minHeight: 15, margin: '7px 0 0', color: error ? '#b91c1c' : message ? '#166534' : MUTED, fontSize: 10 }}>{error || message}</p>
    </section>
  )
}
