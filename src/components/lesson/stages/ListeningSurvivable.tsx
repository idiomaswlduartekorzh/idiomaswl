'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { playAudio, KR_VIDEO } from '@/lib/storage';

interface Question {
  id: string;
  time: string;
  scene: string;
  question: string;
  options: string[];
  correct: string;
  isKorean?: boolean;
}

interface RecapSentence {
  id: string;
  scene: string;
  korean: string;
  translation: string;
  audioKey: string;
}

const VIDEO_SRC = KR_VIDEO.sovPattern;

const QUESTIONS: Question[] = [
  {
    id: 'Q1',
    time: '0:00–2:05',
    scene: 'Escena 1',
    question: '¿A dónde va David en la primera escena?',
    options: ['A la escuela', 'A la universidad', 'A casa'],
    correct: 'A la escuela',
  },
  {
    id: 'Q2',
    time: '2:05–5:02',
    scene: 'Escena 2',
    question: '¿Qué frase escuchaste en la segunda escena?',
    options: ['저는 학교에 가요', '저는 대학교에 가요', '저는 집에 가요'],
    correct: '저는 대학교에 가요',
    isKorean: true,
  },
  {
    id: 'Q3',
    time: 'Todo el video',
    scene: 'Video completo',
    question: '¿Cuántas frases diferentes escuchaste en total?',
    options: ['1 frase', '2 frases', '3 frases'],
    correct: '3 frases',
  },
];

const RECAP_SENTENCES: RecapSentence[] = [
  { id: 'S1', scene: '1', korean: '저는 학교에 가요.', translation: 'Yo voy a la escuela.', audioKey: '학교에 가요' },
  { id: 'S2', scene: '2', korean: '저는 대학교에 가요.', translation: 'Yo voy a la universidad.', audioKey: '대학교에 가요' },
  { id: 'S3', scene: '3', korean: '저는 집에 가요.', translation: 'Yo voy a casa.', audioKey: '집에 가요' },
];

function formatVideoTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

function getSceneLabel(currentTime: number) {
  if (currentTime < 2.5) return 'Escena 1 · 학교';
  if (currentTime < 5.2) return 'Escena 2 · 대학교';
  return 'Escena 3 · 집';
}

function getActiveSceneIndex(currentTime: number) {
  if (currentTime < 2.5) return 0;
  if (currentTime < 5.2) return 1;
  return 2;
}

interface Props {
  onComplete?: () => void;
}

export default function ListeningSurvivable({ onComplete }: Props) {
  const [phase, setPhase] = useState<'intro' | 'watching' | 'questions' | 'complete'>('intro');
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(8);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasWatched, setHasWatched] = useState(false);
  const [pendingPlay, setPendingPlay] = useState(false);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  const sceneLabel = useMemo(() => getSceneLabel(currentVideoTime), [currentVideoTime]);
  const activeSceneIndex = useMemo(() => getActiveSceneIndex(currentVideoTime), [currentVideoTime]);
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  useEffect(() => {
    if (phase !== 'watching' || !pendingPlay) return;
    const video = videoRef.current;
    if (!video) return;
    const timer = setTimeout(() => {
      video.play().catch(() => { /* autoplay restrictions */ });
      setPendingPlay(false);
    }, 60);
    return () => clearTimeout(timer);
  }, [phase, pendingPlay]);

  useEffect(() => {
    if (phase !== 'watching') {
      const video = videoRef.current;
      if (video && !video.paused) video.pause();
      setIsVideoPlaying(false);
    }
  }, [phase]);

  function goToWatchingAndPlay(fromStart = false) {
    setPhase('watching');
    setPendingPlay(true);
    const video = videoRef.current;
    if (video && fromStart) {
      video.currentTime = 0;
      setCurrentVideoTime(0);
    }
  }

  function handlePlayPause() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => { /* noop */ });
    } else {
      video.pause();
    }
  }

  function handleReplay() {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setCurrentVideoTime(0);
    video.play().catch(() => { /* noop */ });
  }

  function handleJumpTo(timeSec: number) {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = timeSec;
    setCurrentVideoTime(timeSec);
  }

  function handleProgressClick(event: React.MouseEvent<HTMLButtonElement>) {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const seekTo = ratio * video.duration;
    video.currentTime = seekTo;
    setCurrentVideoTime(seekTo);
  }

  function handleSelectAnswer(questionId: string, option: string) {
    if (checked) return;
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  }

  function handleCheckAnswers() {
    if (!allAnswered || checked) return;
    const nextScore = QUESTIONS.reduce((acc, question) => {
      return acc + (answers[question.id] === question.correct ? 1 : 0);
    }, 0);
    setScore(nextScore);
    setChecked(true);
    if (nextScore === 3) {
      setTimeout(() => {
        setPhase('complete');
        onComplete?.();
      }, 800);
    }
  }

  const progressWidth = videoDuration > 0 ? `${Math.max(0, Math.min(100, (currentVideoTime / videoDuration) * 100))}%` : '0%';

  if (phase === 'intro') {
    return (
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '2rem' }}>
        <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--wl-on-panel-link, #6c63ff)', fontWeight: 700 }}>
          SECCIÓN 4 DE 11
        </p>
        <h3 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: 'var(--wl-on-panel, #1a1a2e)' }}>Escucha sobrevivible</h3>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--wl-on-panel-soft, #6c757d)', lineHeight: 1.7 }}>
          No traduzcas. No analices. Solo observa a David caminar por Seúl y escucha. Tu cerebro va a hacer el resto.
        </p>
        <div style={{ background: 'rgba(108,99,255,0.07)', border: '1px solid rgba(108,99,255,0.15)', borderRadius: 10, padding: '10px 14px', marginBottom: 20, fontSize: 12, color: 'var(--wl-on-panel-link, #6c63ff)' }}>
          📌 Nota: El video de escucha completo estará disponible pronto. Por ahora verás el video de patrón SOV como referencia.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {[
            { icon: '🎧', text: 'El video no tiene subtítulos. Eso es intencional.' },
            { icon: '🧠', text: 'Ya conoces estas palabras. Confía en tu oído.' },
            { icon: '🔁', text: 'Puedes verlo las veces que quieras antes de responder.' },
          ].map((item) => (
            <article
              key={item.text}
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
                background: 'var(--wl-panel-raised, #f8f9fa)',
                border: '1px solid #e9ecef',
                borderRadius: 10,
                padding: '12px 14px',
              }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'rgba(108,99,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </span>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--wl-on-panel, #1a1a2e)', lineHeight: 1.55 }}>{item.text}</p>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goToWatchingAndPlay(true)}
          style={{ width: '100%', padding: '14px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 4 }}
        >
          ▶ Ver el video
        </button>
      </section>
    );
  }

  if (phase === 'watching') {
    return (
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '1rem 0' }}>
        <article style={{ background: '#000', borderRadius: 14, overflow: 'hidden', marginBottom: 16, position: 'relative' }}>
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            playsInline
            style={{ width: '100%', display: 'block', maxHeight: 380, objectFit: 'cover' }}
            onLoadedMetadata={(event) => {
              const duration = Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 8;
              setVideoDuration(duration);
            }}
            onTimeUpdate={(event) => {
              setCurrentVideoTime(event.currentTarget.currentTime || 0);
            }}
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
            onEnded={(event) => {
              setIsVideoPlaying(false);
              setHasWatched(true);
              setCurrentVideoTime(event.currentTarget.duration || 8);
            }}
          />
          <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', borderRadius: 100, padding: '4px 12px', fontSize: 11, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.05em' }}>
            {sceneLabel}
          </div>
        </article>

        <div style={{ background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderRadius: '0 0 14px 14px', padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              type="button"
              onClick={handlePlayPause}
              style={{ width: 36, height: 36, borderRadius: '50%', background: '#6c63ff', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
            >
              {isVideoPlaying ? '❚❚' : '▶'}
            </button>

            <button
              type="button"
              onClick={handleProgressClick}
              style={{ flex: 1, height: 4, background: 'var(--wl-panel-raised, #e9ecef)', borderRadius: 2, cursor: 'pointer', position: 'relative', border: 'none', padding: 0 }}
            >
              <span style={{ display: 'block', height: '100%', background: '#6c63ff', borderRadius: 2, width: progressWidth }} />
            </button>

            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--wl-on-panel-soft, #6c757d)', flexShrink: 0 }}>
              {`${formatVideoTime(currentVideoTime)} / ${formatVideoTime(videoDuration)}`}
            </span>

            <button
              type="button"
              onClick={handleReplay}
              style={{ fontSize: 11, color: 'var(--wl-on-panel-soft, #6c757d)', background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderRadius: 100, padding: '4px 10px', cursor: 'pointer' }}
            >
              🔁 Repetir
            </button>
          </div>

          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {[
              { label: '① 학교', at: 0, index: 0 },
              { label: '② 대학교', at: 2.5, index: 1 },
              { label: '③ 집', at: 5.2, index: 2 },
            ].map((scene) => {
              const isActive = activeSceneIndex === scene.index;
              return (
                <button
                  key={scene.label}
                  type="button"
                  onClick={() => handleJumpTo(scene.at)}
                  style={{
                    background: isActive ? 'rgba(108,99,255,0.08)' : '#f8f9fa',
                    border: isActive ? '1px solid rgba(108,99,255,0.3)' : '1px solid #e9ecef',
                    borderRadius: 100,
                    padding: '5px 12px',
                    fontSize: 11,
                    color: isActive ? '#6c63ff' : '#6c757d',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {scene.label}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!hasWatched) return;
            setPhase('questions');
            setChecked(false);
            setAnswers({});
            setScore(0);
          }}
          style={{
            marginTop: 16,
            width: '100%',
            padding: '12px',
            background: hasWatched ? '#6c63ff' : '#e9ecef',
            color: hasWatched ? '#fff' : '#adb5bd',
            border: 'none',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            cursor: hasWatched ? 'pointer' : 'not-allowed',
          }}
        >
          {hasWatched ? 'Responder preguntas →' : 'Mira el video completo primero'}
        </button>
        <p style={{ textAlign: 'center', fontSize: 11, color: '#adb5bd', marginTop: 8 }}>
          Puedes volver a ver el video después de responder
        </p>
      </section>
    );
  }

  if (phase === 'questions') {
    return (
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '1rem 0' }}>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--wl-on-panel-soft, #6c757d)' }}>
          3 preguntas sobre lo que escuchaste. Sin trampa.
        </p>

        <article
          style={{
            background: 'var(--wl-panel-raised, #f8f9fa)',
            border: '1px solid #e9ecef',
            borderRadius: 10,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20,
          }}
        >
          <div style={{ width: 60, height: 40, borderRadius: 6, overflow: 'hidden', background: '#000', flexShrink: 0 }}>
            <video src={VIDEO_SRC} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--wl-on-panel-soft, #6c757d)' }}>¿Quieres volver a verlo?</p>
          </div>
          <button
            type="button"
            onClick={() => goToWatchingAndPlay(true)}
            style={{ fontSize: 12, color: 'var(--wl-on-panel-link, #6c63ff)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Ver de nuevo
          </button>
        </article>

        {QUESTIONS.map((question) => (
          <article
            key={question.id}
            style={{ background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderRadius: 12, padding: 16, marginBottom: 12 }}
          >
            <span
              style={{
                display: 'inline-block',
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                background: 'rgba(108,99,255,0.08)',
                border: '1px solid rgba(108,99,255,0.15)',
                borderRadius: 100,
                padding: '2px 8px',
                color: 'var(--wl-on-panel-link, #6c63ff)',
                marginBottom: 10,
              }}
            >
              {question.scene} · {question.time}
            </span>

            <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: 'var(--wl-on-panel, #1a1a2e)', lineHeight: 1.5 }}>
              {question.question}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {question.options.map((option) => {
                const selected = answers[question.id] === option;
                const correct = checked && option === question.correct;
                const wrong = checked && selected && option !== question.correct;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelectAnswer(question.id, option)}
                    style={{
                      padding: '10px 14px',
                      background: correct ? 'rgba(45,155,78,0.06)' : wrong ? 'rgba(220,53,69,0.05)' : selected ? 'rgba(108,99,255,0.06)' : '#fff',
                      border: `1.5px solid ${correct ? '#2d9b4e' : wrong ? '#dc3545' : selected ? '#6c63ff' : '#e9ecef'}`,
                      borderRadius: 8,
                      fontSize: question.isKorean ? 15 : 13,
                      textAlign: 'left',
                      cursor: checked ? 'default' : 'pointer',
                      color: correct ? '#2d9b4e' : wrong ? '#dc3545' : '#1a1a2e',
                      transition: 'all 0.15s',
                      fontFamily: question.isKorean ? "'Noto Sans KR', sans-serif" : 'inherit',
                    }}
                    disabled={checked}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </article>
        ))}

        {allAnswered && !checked ? (
          <button
            type="button"
            onClick={handleCheckAnswers}
            style={{ width: '100%', padding: '13px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            Verificar respuestas
          </button>
        ) : null}

        {checked && score < 3 ? (
          <button
            type="button"
            onClick={() => { setPhase('complete'); onComplete?.(); }}
            style={{ width: '100%', padding: '13px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 10 }}
          >
            Ver resultado →
          </button>
        ) : null}
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 580, margin: '0 auto', textAlign: 'center', padding: '2.5rem 1rem' }}>
      <p style={{ margin: '0 0 4px', fontSize: 52, fontWeight: 700, color: 'var(--wl-on-panel-link, #6c63ff)' }}>{`${score}/3`}</p>
      <p style={{ margin: '0 0 24px', fontSize: 14, color: 'var(--wl-on-panel-soft, #6c757d)', lineHeight: 1.6 }}>
        {score === 3
          ? 'Entendiste todo. Tu oído coreano está despertando.'
          : score === 2
            ? 'Casi todo. El oído se entrena con repetición.'
            : 'Normal para la primera vez. El siguiente paso lo refuerza.'}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28, textAlign: 'left' }}>
        {RECAP_SENTENCES.map((sentence) => (
          <article
            key={sentence.id}
            style={{ background: 'var(--wl-panel-raised, #f8f9fa)', border: '1px solid #e9ecef', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <span
              style={{ width: 24, height: 24, borderRadius: '50%', background: '#6c63ff', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            >
              {sentence.scene}
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 2px', fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: 'var(--wl-on-panel-link, #6c63ff)' }}>{sentence.korean}</p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--wl-on-panel-soft, #6c757d)' }}>{sentence.translation}</p>
            </div>
            <button
              type="button"
              onClick={() => playAudio(sentence.audioKey, 1)}
              style={{ fontSize: 14, color: 'var(--wl-on-panel-link, #6c63ff)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ▶
            </button>
          </article>
        ))}
      </div>

      <p style={{ fontSize: 13, color: 'var(--wl-on-panel-soft, #6c757d)', lineHeight: 1.7, marginBottom: 24 }}>
        Acabas de escuchar coreano real. Sin traducir, sin pausar, sin ayuda. Eso es exactamente lo que hace que el idioma se instale de verdad.
      </p>
    </section>
  );
}
