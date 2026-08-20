'use client';

import { useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  IELTS_MOCK4_SPEAKING_IDS,
  IELTS_SPEAKING_BUCKET,
  type IeltsMock4CompleteResponse,
  type IeltsMock4PrepareResponse,
  type IeltsMock4SubmissionPayload,
} from '@/lib/ielts/mock4-submission';
import type { IeltsSpeakingRecording } from './IELTSSpeakingRecorder';
import type { IeltsSubmissionReceipt } from '@/lib/ielts/review-blueprint';

interface Props {
  readingBand: number;
  listeningBand: number | null;
  writingTask1: string;
  writingTask2: string;
  speakingNotes: Record<string, string>;
  recordings: Record<string, IeltsSpeakingRecording>;
  onBack: () => void;
  onSuccess: (receipt: IeltsSubmissionReceipt) => void;
}

type SubmitState = 'idle' | 'preparing' | 'uploading' | 'confirming';

function countWords(value: string): number {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${String(remainder).padStart(2, '0')}`;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'No pudimos enviar la entrega. Tus respuestas siguen en esta pantalla; inténtalo otra vez.';
}

async function readResponse<T>(response: Response): Promise<T & { ok?: boolean; error?: string }> {
  try {
    return await response.json() as T & { ok?: boolean; error?: string };
  } catch {
    throw new Error('El servidor no respondió correctamente. Inténtalo otra vez en unos segundos.');
  }
}

export function IELTSMock4Submission({
  readingBand,
  listeningBand,
  writingTask1,
  writingTask2,
  speakingNotes,
  recordings,
  onBack,
  onSuccess,
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<SubmitState>('idle');
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const [error, setError] = useState('');
  const errorRef = useRef<HTMLParagraphElement>(null);

  const task1Words = countWords(writingTask1);
  const task2Words = countWords(writingTask2);
  const recordedEntries = IELTS_MOCK4_SPEAKING_IDS.flatMap(questionId => {
    const recording = recordings[questionId];
    return recording ? [{ questionId, recording }] : [];
  });
  const isSubmitting = state !== 'idle';
  const statusText = state === 'preparing'
    ? 'Preparando tu entrega privada…'
    : state === 'uploading'
      ? `Subiendo audio ${uploadProgress.current} de ${uploadProgress.total}…`
      : state === 'confirming'
        ? 'Confirmando que todo llegó correctamente…'
        : '';

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedName.length < 2) {
      setError('Escribe el nombre completo de la estudiante.');
      requestAnimationFrame(() => errorRef.current?.focus());
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setError('Escribe un correo válido, por ejemplo estudiante@correo.com.');
      requestAnimationFrame(() => errorRef.current?.focus());
      return;
    }
    if (!consent) {
      setError('Debes autorizar el envío de los textos y audios para evaluación.');
      requestAnimationFrame(() => errorRef.current?.focus());
      return;
    }

    const payload: IeltsMock4SubmissionPayload = {
      name: trimmedName,
      email: trimmedEmail,
      readingBand,
      listeningBand,
      writingTask1,
      writingTask2,
      speakingNotes,
      audio: recordedEntries.map(({ questionId, recording }) => ({
        questionId,
        mimeType: recording.mimeType,
        size: recording.blob.size,
        durationSeconds: recording.durationSeconds,
      })),
    };

    try {
      setState('preparing');
      const prepareResponse = await fetch('/api/ielts/mock-4/submissions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'prepare', payload }),
      });
      const prepared = await readResponse<IeltsMock4PrepareResponse>(prepareResponse);
      if (!prepareResponse.ok || !prepared.ok) {
        throw new Error(prepared.error || 'No pudimos preparar la entrega. Inténtalo otra vez.');
      }

      const supabase = createClient();
      if (!supabase) throw new Error('La conexión segura de archivos no está configurada.');

      setState('uploading');
      setUploadProgress({ current: 0, total: prepared.uploads.length });
      for (let index = 0; index < prepared.uploads.length; index += 1) {
        const upload = prepared.uploads[index];
        const recording = recordings[upload.questionId];
        if (!recording) throw new Error(`Falta la grabación ${upload.questionId}. Vuelve al examen y grábala otra vez.`);

        setUploadProgress({ current: index + 1, total: prepared.uploads.length });
        const { error: uploadError } = await supabase.storage
          .from(IELTS_SPEAKING_BUCKET)
          .uploadToSignedUrl(upload.path, upload.token, recording.blob, {
            contentType: recording.mimeType,
            upsert: false,
          });
        if (uploadError) throw new Error(`No pudimos subir el audio ${index + 1}. Revisa tu conexión e inténtalo otra vez.`);
      }

      setState('confirming');
      const completeResponse = await fetch('/api/ielts/mock-4/submissions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          action: 'complete',
          submissionId: prepared.submissionId,
          completionToken: prepared.completionToken,
        }),
      });
      const completed = await readResponse<IeltsMock4CompleteResponse>(completeResponse);
      if (!completeResponse.ok || !completed.ok) {
        throw new Error(completed.error || 'Los archivos subieron, pero no pudimos confirmar la entrega. Inténtalo otra vez.');
      }

      try {
        localStorage.setItem('wl_lead_captured', '1');
        window.dataLayer?.push({
          event: 'ielts_mock4_submission',
          exam_slug: 'ielts',
          mock_id: 'set-4',
          audio_count: recordedEntries.length,
        });
      } catch {}
      onSuccess({
        submissionId: prepared.submissionId,
        completionToken: prepared.completionToken,
      });
    } catch (caught) {
      setState('idle');
      setError(errorMessage(caught));
      requestAnimationFrame(() => errorRef.current?.focus());
    }
  }

  return (
    <div className="ielts-submit">
      <section className="ielts-submit__card" aria-labelledby="ielts-submit-title">
        <div className="ielts-submit__eyebrow">IELTS Academic · Mock 4</div>
        <h1 id="ielts-submit-title">Envía tu simulacro para evaluación</h1>
        <p className="ielts-submit__intro">
          Escribe los datos de la estudiante. Sus textos y grabaciones llegarán juntos al panel privado del profesor.
        </p>

        <div className="ielts-submit__summary" aria-label="Resumen de la entrega">
          <div className={task1Words >= 150 ? 'ielts-submit__summary-item is-ready' : 'ielts-submit__summary-item is-missing'}>
            <strong>Writing Task 1</strong>
            <span>{task1Words} palabras {task1Words >= 150 ? '· Lista' : '· Mínimo recomendado: 150'}</span>
          </div>
          <div className={task2Words >= 250 ? 'ielts-submit__summary-item is-ready' : 'ielts-submit__summary-item is-missing'}>
            <strong>Writing Task 2</strong>
            <span>{task2Words} palabras {task2Words >= 250 ? '· Lista' : '· Mínimo recomendado: 250'}</span>
          </div>
          <div className={recordedEntries.length === IELTS_MOCK4_SPEAKING_IDS.length ? 'ielts-submit__summary-item is-ready' : 'ielts-submit__summary-item is-missing'}>
            <strong>Speaking</strong>
            <span>{recordedEntries.length} de {IELTS_MOCK4_SPEAKING_IDS.length} audios listos</span>
          </div>
        </div>

        {recordedEntries.length > 0 && (
          <ul className="ielts-submit__audio-list" aria-label="Audios incluidos">
            {recordedEntries.map(({ questionId, recording }) => (
              <li key={questionId}>
                <span>{questionId.toUpperCase()}</span>
                <span>{formatDuration(recording.durationSeconds)}</span>
              </li>
            ))}
          </ul>
        )}

        <form className="ielts-submit__form" onSubmit={handleSubmit} noValidate>
          <div className="ielts-submit__field">
            <label htmlFor="ielts-student-name">Nombre completo</label>
            <input
              id="ielts-student-name"
              name="student_name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={event => setName(event.target.value)}
              placeholder="Ej.: Ana García…"
              maxLength={120}
              required
            />
          </div>
          <div className="ielts-submit__field">
            <label htmlFor="ielts-student-email">Correo electrónico</label>
            <input
              id="ielts-student-email"
              name="student_email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="Ej.: estudiante@correo.com…"
              maxLength={254}
              required
            />
          </div>

          <label className="ielts-submit__consent">
            <input type="checkbox" name="evaluation_consent" checked={consent} onChange={event => setConsent(event.target.checked)} required />
            <span>Autorizo el envío y almacenamiento privado de estos textos y audios para su evaluación académica.</span>
          </label>

          <p className="ielts-submit__privacy">
            Los audios no serán públicos. Solo se habilitan mediante enlaces temporales dentro del panel admin.
          </p>

          <p ref={errorRef} className="ielts-submit__error" role="alert" tabIndex={-1} aria-live="assertive">
            {error}
          </p>
          <p className="ielts-submit__status" role="status" aria-live="polite">{statusText}</p>

          <div className="ielts-submit__actions">
            <button type="button" className="btn btn-ghost" onClick={onBack} disabled={isSubmitting}>Volver al examen</button>
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando…' : 'Enviar a evaluación'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}
