'use client';

import { useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  TOEFL_SPEAKING_BUCKET,
  TOEFL_SUBMISSION_CONSENT_VERSION,
  countToeflWords,
  toeflSpeakingEvidenceIssues,
  type ToeflCompleteResponse,
  type ToeflObjectiveAnswers,
  type ToeflPrepareResponse,
  type ToeflSpeakingPromptRef,
  type ToeflSubmissionPayload,
} from '@/lib/toefl/submission';
import type { ToeflSubmissionReceipt } from '@/lib/toefl/review-blueprint';
import type { IeltsSpeakingRecording } from './IELTSSpeakingRecorder';

interface Props {
  mockId: string;
  mockTitle: string;
  attemptId: string;
  objectiveAnswers: ToeflObjectiveAnswers;
  writingEmail: string;
  writingDiscussion: string;
  speakingPrompts: ToeflSpeakingPromptRef[];
  recordings: Record<string, IeltsSpeakingRecording>;
  onBack: () => void;
  onSuccess: (receipt: ToeflSubmissionReceipt) => void;
}

type SubmitState = 'idle' | 'preparing' | 'uploading' | 'confirming';

function readError(error: unknown): string {
  return error instanceof Error ? error.message : 'No pudimos enviar la entrega. Tus respuestas siguen en esta pantalla.';
}

async function readResponse<T>(response: Response): Promise<T & { ok?: boolean; error?: string }> {
  try {
    return await response.json() as T & { ok?: boolean; error?: string };
  } catch {
    throw new Error('El servidor no respondió correctamente. Inténtalo otra vez en unos segundos.');
  }
}

function formatDuration(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

export function TOEFLSubmission({
  mockId,
  mockTitle,
  attemptId,
  objectiveAnswers,
  writingEmail,
  writingDiscussion,
  speakingPrompts,
  recordings,
  onBack,
  onSuccess,
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<SubmitState>('idle');
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [error, setError] = useState('');
  const errorRef = useRef<HTMLParagraphElement>(null);

  const recordedEntries = speakingPrompts.flatMap(prompt => {
    const recording = recordings[prompt.questionId];
    return recording ? [{ prompt, recording }] : [];
  });
  const descriptors = recordedEntries.map(({ prompt, recording }) => ({
    questionId: prompt.questionId,
    mimeType: recording.mimeType,
    size: recording.blob.size,
    durationSeconds: recording.durationSeconds,
  }));
  const speakingIssues = toeflSpeakingEvidenceIssues(speakingPrompts, descriptors);
  const emailWords = countToeflWords(writingEmail);
  const discussionWords = countToeflWords(writingDiscussion);
  const writingReady = writingEmail.trim().length >= 150 && writingDiscussion.trim().length >= 150;
  const isSubmitting = state !== 'idle';
  const statusText = state === 'preparing'
    ? 'Verificando respuestas y preparando la entrega privada…'
    : state === 'uploading'
      ? `Subiendo audio ${progress.current} de ${progress.total}…`
      : state === 'confirming'
        ? 'Confirmando que textos y audios llegaron completos…'
        : '';

  function showError(message: string) {
    setError(message);
    requestAnimationFrame(() => errorRef.current?.focus());
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    if (cleanName.length < 2) return showError('Escribe el nombre completo de la estudiante.');
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) return showError('Escribe un correo válido.');
    if (writingEmail.trim().length < 150) return showError('Write an Email necesita al menos 150 caracteres para entrar al corrector. No es un mínimo oficial de ETS.');
    if (writingDiscussion.trim().length < 150) return showError('Academic Discussion necesita al menos 150 caracteres para entrar al corrector.');
    if (speakingIssues.length > 0) return showError(speakingIssues[0]);
    if (!consent) return showError('Debes autorizar el almacenamiento privado y la evaluación académica.');

    const payload: ToeflSubmissionPayload = {
      name: cleanName,
      email: cleanEmail,
      consentVersion: TOEFL_SUBMISSION_CONSENT_VERSION,
      attemptId,
      objectiveAnswers,
      writingEmail,
      writingDiscussion,
      audio: descriptors,
    };
    const endpoint = `/api/toefl/${encodeURIComponent(mockId)}/submissions`;
    try {
      setState('preparing');
      const prepareResponse = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'prepare', payload }),
      });
      const prepared = await readResponse<ToeflPrepareResponse>(prepareResponse);
      if (!prepareResponse.ok || !prepared.ok) throw new Error(prepared.error || 'No pudimos preparar la entrega.');

      const supabase = createClient();
      if (!supabase) throw new Error('La conexión segura de archivos no está configurada.');
      setState('uploading');
      setProgress({ current: 0, total: prepared.uploads.length });
      for (let index = 0; index < prepared.uploads.length; index += 1) {
        const upload = prepared.uploads[index];
        const recording = recordings[upload.questionId];
        if (!recording) throw new Error(`Falta la grabación ${upload.questionId}.`);
        setProgress({ current: index + 1, total: prepared.uploads.length });
        const { error: uploadError } = await supabase.storage
          .from(TOEFL_SPEAKING_BUCKET)
          .uploadToSignedUrl(upload.path, upload.token, recording.blob, {
            contentType: recording.mimeType,
            upsert: false,
          });
        if (uploadError) throw new Error(`No pudimos subir el audio ${index + 1}. Revisa tu conexión e inténtalo otra vez.`);
      }

      setState('confirming');
      const completeResponse = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          action: 'complete',
          submissionId: prepared.submissionId,
          completionToken: prepared.completionToken,
        }),
      });
      const completed = await readResponse<ToeflCompleteResponse>(completeResponse);
      if (!completeResponse.ok || !completed.ok) throw new Error(completed.error || 'No pudimos confirmar la entrega.');
      try {
        window.dataLayer?.push({ event: 'toefl_submission', exam_slug: 'toefl', mock_id: mockId, audio_count: descriptors.length });
      } catch {}
      onSuccess({ submissionId: prepared.submissionId, completionToken: prepared.completionToken });
    } catch (caught) {
      setState('idle');
      showError(readError(caught));
    }
  }

  return (
    <div className="ielts-submit">
      <section className="ielts-submit__card" aria-labelledby="toefl-submit-title">
        <div className="ielts-submit__eyebrow">{mockTitle}</div>
        <h1 id="toefl-submit-title">Envía el simulacro para corrección</h1>
        <p className="ielts-submit__intro">Reading, Listening y Build se verifican en el servidor. Los dos textos y los 11 audios entran a la misma ficha privada.</p>

        <div className="ielts-submit__summary" aria-label="Resumen de la entrega">
          <div className={writingEmail.trim().length >= 150 ? 'ielts-submit__summary-item is-ready' : 'ielts-submit__summary-item is-missing'}>
            <strong>Write an Email</strong><span>{emailWords} palabras · {writingEmail.trim().length} caracteres</span>
          </div>
          <div className={writingDiscussion.trim().length >= 150 ? 'ielts-submit__summary-item is-ready' : 'ielts-submit__summary-item is-missing'}>
            <strong>Academic Discussion</strong><span>{discussionWords} palabras · {writingDiscussion.trim().length} caracteres</span>
          </div>
          <div className={speakingIssues.length === 0 ? 'ielts-submit__summary-item is-ready' : 'ielts-submit__summary-item is-missing'}>
            <strong>Speaking</strong><span>{recordedEntries.length}/{speakingPrompts.length} audios · {speakingIssues[0] ?? 'Listos'}</span>
          </div>
        </div>
        {!writingReady && <p className="ielts-submit__privacy">Los 150 caracteres son un control técnico para generar feedback útil; no se presentan como mínimo oficial de ETS.</p>}

        {recordedEntries.length > 0 && (
          <ul className="ielts-submit__audio-list" aria-label="Audios incluidos">
            {recordedEntries.map(({ prompt, recording }) => (
              <li key={prompt.questionId}><span>{prompt.label}</span><span>{formatDuration(recording.durationSeconds)}</span></li>
            ))}
          </ul>
        )}

        <form className="ielts-submit__form" onSubmit={submit} noValidate>
          <div className="ielts-submit__field">
            <label htmlFor="toefl-student-name">Nombre completo</label>
            <input id="toefl-student-name" name="studentName" type="text" autoComplete="name" value={name} onChange={event => setName(event.target.value)} maxLength={120} required />
          </div>
          <div className="ielts-submit__field">
            <label htmlFor="toefl-student-email">Correo electrónico</label>
            <input id="toefl-student-email" name="studentEmail" type="email" inputMode="email" autoComplete="email" spellCheck={false} value={email} onChange={event => setEmail(event.target.value)} maxLength={254} required />
          </div>
          <label className="ielts-submit__consent">
            <input name="reviewConsent" type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} required />
            <span>Autorizo el almacenamiento privado de textos y audios para evaluación académica. Entiendo que las notas de tarea son estimaciones pedagógicas, no resultados oficiales de ETS.</span>
          </label>
          <p className="ielts-submit__privacy">Los audios no son públicos; el profesor accede mediante enlaces temporales y puedes solicitar su eliminación.</p>
          <p ref={errorRef} className="ielts-submit__error" role="alert" tabIndex={-1} aria-live="assertive">{error}</p>
          <p className="ielts-submit__status" role="status" aria-live="polite">{statusText}</p>
          <div className="ielts-submit__actions">
            <button type="button" className="btn btn-ghost" onClick={onBack} disabled={isSubmitting}>Volver al examen</button>
            <button type="submit" className="btn" disabled={isSubmitting}>{isSubmitting ? 'Enviando…' : 'Enviar a corrección'}</button>
          </div>
        </form>
      </section>
    </div>
  );
}

declare global { interface Window { dataLayer?: Record<string, unknown>[] } }
