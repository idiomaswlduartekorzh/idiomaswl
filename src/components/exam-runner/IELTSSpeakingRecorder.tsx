'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface IeltsSpeakingRecording {
  blob: Blob;
  mimeType: string;
  durationSeconds: number;
}

interface Props {
  questionId: string;
  recording?: IeltsSpeakingRecording;
  maxSeconds?: number;
  onChange: (recording: IeltsSpeakingRecording | undefined) => void;
  onRecordingStateChange?: (recording: boolean) => void;
}

type RecorderState = 'idle' | 'requesting' | 'recording' | 'processing' | 'done';

function selectMimeType(): string | undefined {
  if (typeof MediaRecorder === 'undefined') return undefined;
  return [
    'audio/webm;codecs=opus',
    'audio/mp4',
    'audio/webm',
    'audio/ogg;codecs=opus',
  ].find(type => MediaRecorder.isTypeSupported(type));
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${String(remainder).padStart(2, '0')}`;
}

function microphoneError(error: unknown): string {
  if (error instanceof DOMException && (error.name === 'NotAllowedError' || error.name === 'SecurityError')) {
    return 'El navegador bloqueó el micrófono. Permite el acceso en la barra de direcciones e inténtalo otra vez.';
  }
  if (error instanceof DOMException && error.name === 'NotFoundError') {
    return 'No se encontró un micrófono. Conecta uno o revisa la entrada de audio del dispositivo.';
  }
  return 'No pudimos iniciar la grabación. Revisa el micrófono e inténtalo otra vez.';
}

export function IELTSSpeakingRecorder({
  questionId,
  recording,
  maxSeconds = 180,
  onChange,
  onRecordingStateChange,
}: Props) {
  const [state, setState] = useState<RecorderState>(recording ? 'done' : 'idle');
  const [elapsed, setElapsed] = useState(recording?.durationSeconds ?? 0);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const elapsedRef = useRef(elapsed);
  const mountedRef = useRef(true);
  const recordingStateCallbackRef = useRef(onRecordingStateChange);

  useEffect(() => {
    recordingStateCallbackRef.current = onRecordingStateChange;
  }, [onRecordingStateChange]);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (!recording) {
      const timer = window.setTimeout(() => setPreviewUrl(''), 0);
      return () => window.clearTimeout(timer);
    }
    const url = URL.createObjectURL(recording.blob);
    const timer = window.setTimeout(() => setPreviewUrl(url), 0);
    return () => {
      window.clearTimeout(timer);
      URL.revokeObjectURL(url);
    };
  }, [recording]);

  useEffect(() => {
    if (state !== 'recording') return;
    const timer = window.setInterval(() => {
      setElapsed(previous => {
        const next = previous + 1;
        elapsedRef.current = next;
        if (next >= maxSeconds && recorderRef.current?.state === 'recording') {
          recorderRef.current.stop();
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [maxSeconds, state]);

  const stopTracks = useCallback(() => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => () => {
    const recorder = recorderRef.current;
    if (recorder?.state === 'recording') recorder.stop();
    stopTracks();
    recordingStateCallbackRef.current?.(false);
  }, [stopTracks]);

  async function startRecording() {
    setError('');
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setError('Este navegador no permite grabar audio. Abre el simulacro en Safari, Chrome, Edge o Firefox actualizado.');
      return;
    }

    setState('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
        },
      });
      streamRef.current = stream;
      chunksRef.current = [];
      elapsedRef.current = 0;
      setElapsed(0);

      const preferredMimeType = selectMimeType();
      const recorder = new MediaRecorder(stream, {
        ...(preferredMimeType ? { mimeType: preferredMimeType } : {}),
        audioBitsPerSecond: 64_000,
      });
      recorderRef.current = recorder;

      recorder.ondataavailable = event => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onerror = () => {
        setError('La grabación se interrumpió. Conservamos tus textos; vuelve a grabar esta respuesta.');
        if (mountedRef.current) setState('idle');
        recordingStateCallbackRef.current?.(false);
        stopTracks();
      };
      recorder.onstop = () => {
        const mimeType = (recorder.mimeType || preferredMimeType || 'audio/webm').split(';')[0];
        const blob = new Blob(chunksRef.current, { type: mimeType });
        stopTracks();
        recordingStateCallbackRef.current?.(false);
        if (blob.size === 0) {
          setError('La grabación quedó vacía. Revisa el micrófono y vuelve a intentarlo.');
          if (mountedRef.current) setState('idle');
          return;
        }
        onChange({
          blob,
          mimeType,
          durationSeconds: Math.max(1, elapsedRef.current),
        });
        if (mountedRef.current) setState('done');
      };

      recorder.start(1000);
      setState('recording');
      recordingStateCallbackRef.current?.(true);
    } catch (caught) {
      stopTracks();
      recordingStateCallbackRef.current?.(false);
      setState(recording ? 'done' : 'idle');
      setError(microphoneError(caught));
    }
  }

  function stopRecording() {
    const recorder = recorderRef.current;
    if (!recorder || recorder.state !== 'recording') return;
    setState('processing');
    recorder.stop();
  }

  function removeRecording() {
    onChange(undefined);
    setElapsed(0);
    elapsedRef.current = 0;
    setState('idle');
    setError('');
  }

  return (
    <div className="ielts-recorder" aria-label={`Grabación de ${questionId}`}>
      <div className="ielts-speak__record-row">
        {state === 'recording' ? (
          <button type="button" className="ielts-speak__rec-btn ielts-speak__rec-btn--recording" onClick={stopRecording}>
            <span className="ielts-speak__rec-dot ielts-speak__rec-dot--live" aria-hidden="true" />
            Detener · {formatDuration(elapsed)}
          </button>
        ) : (
          <button
            type="button"
            className={`ielts-speak__rec-btn${recording ? ' ielts-speak__rec-btn--done' : ''}`}
            onClick={startRecording}
            disabled={state === 'requesting' || state === 'processing'}
          >
            <span className={`ielts-speak__rec-dot${recording ? ' ielts-speak__rec-dot--done' : ''}`} aria-hidden="true" />
            {state === 'requesting' ? 'Solicitando micrófono…' : state === 'processing' ? 'Procesando…' : recording ? 'Volver a grabar' : 'Grabar respuesta'}
          </button>
        )}

        {recording && state !== 'recording' ? (
          <span className="ielts-speak__rec-status">Audio listo · {formatDuration(recording.durationSeconds)}</span>
        ) : state === 'idle' ? (
          <span className="ielts-speak__rec-hint">Máximo {Math.floor(maxSeconds / 60)} minutos</span>
        ) : null}
      </div>

      {previewUrl && state !== 'recording' && (
        <div className="ielts-recorder__preview">
          <audio controls preload="metadata" src={previewUrl} aria-label={`Escuchar respuesta ${questionId}`} />
          <button type="button" className="ielts-recorder__remove" onClick={removeRecording}>Eliminar audio</button>
        </div>
      )}

      <p className="ielts-recorder__message" role="status" aria-live="polite">
        {error || (state === 'recording' ? 'Grabando. Habla con claridad y detén la grabación al terminar.' : '')}
      </p>
    </div>
  );
}
