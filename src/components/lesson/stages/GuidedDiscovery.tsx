'use client';

import { useEffect, useRef, useState } from 'react';
import { playAudio, KR_VIDEO } from '@/lib/storage';

const VIDEO_SRC = KR_VIDEO.sovPattern;

interface Comparison {
  id: string;
  spanishNatural: string;
  spanishOrder: string;
  korean: string;
  audioKey: string;
  note?: string;
}

const COMPARISONS: Comparison[] = [
  {
    id: 'kr001-gd-1',
    spanishNatural: 'Español natural: Yo voy a la escuela.',
    spanishOrder: 'Orden coreano: Yo a la escuela voy.',
    korean: '저는 학교에 가요.',
    audioKey: '학교에 가요',
  },
  {
    id: 'kr001-gd-2',
    spanishNatural: 'Español natural: Yo voy a la universidad.',
    spanishOrder: 'Orden coreano: Yo a la universidad voy.',
    korean: '저는 대학교에 가요.',
    audioKey: '저는 대학교에 가요',
  },
  {
    id: 'kr001-gd-3',
    spanishNatural: 'Español natural: Yo voy a casa.',
    spanishOrder: 'Orden coreano: Yo a casa voy.',
    korean: '나는 집에 가요.',
    note: '나는 suena más casual.',
    audioKey: '집에 가요',
  },
];

const NOTICING_QUESTION = {
  prompt: '¿Qué aparece al final en las tres frases coreanas?',
  expectedAnswer: '가요',
  explanation: 'En estas frases la acción (가요) aparece al final.',
};

const NOTICING_OPTIONS = [
  { key: 'A', value: '저는', desc: 'el ejecutor' },
  { key: 'B', value: '학교에', desc: 'el lugar' },
  { key: 'C', value: '가요', desc: 'la acción' },
];

function renderKoreanWithHighlight(text: string) {
  const cleanText = text.replace('.', '');
  const parts = cleanText.split(' ');
  return (
    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 20 }}>
      {parts.map((word) => {
        const isVerb = word.includes('가요');
        return (
          <span
            key={`${text}-${word}`}
            style={{
              color: isVerb ? '#2d9b4e' : '#1a1a2e',
              fontWeight: isVerb ? 700 : 500,
              background: isVerb ? 'rgba(45,155,78,0.1)' : 'transparent',
              borderRadius: 6,
              padding: isVerb ? '2px 8px' : 0,
              marginRight: 8,
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}

interface Props {
  onComplete?: () => void;
}

export default function GuidedDiscovery({ onComplete }: Props) {
  const [phase, setPhase] = useState<'comparisons' | 'video' | 'noticing' | 'complete'>('comparisons');
  const [selectedOption, setSelectedOption] = useState('');
  const [checked, setChecked] = useState(false);
  const [hasWatchedVideo, setHasWatchedVideo] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const correct = selectedOption === NOTICING_QUESTION.expectedAnswer;
  const progressWidth = videoDuration > 0 ? `${Math.max(0, Math.min(100, (videoCurrentTime / videoDuration) * 100))}%` : '0%';

  useEffect(() => {
    if (phase !== 'noticing') return;
    setSelectedOption('');
    setChecked(false);
    setShuffledOptions(['저는', '학교에', '가요'].sort(() => Math.random() - 0.5));
  }, [phase]);

  function formatTime(seconds: number) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  }

  function handleVideoProgressClick(event: React.MouseEvent<HTMLButtonElement>) {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const nextTime = ratio * video.duration;
    video.currentTime = nextTime;
    setVideoCurrentTime(nextTime);
  }

  function handleVideoReplay() {
    const video = videoRef.current;
    if (!video) return;
    setHasWatchedVideo(false);
    video.currentTime = 0;
    setVideoCurrentTime(0);
    video.play().catch(() => { /* noop */ });
  }

  if (phase === 'comparisons') {
    return (
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1rem' }}>
        <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--wl-on-panel-link, #6c63ff)', fontWeight: 700 }}>
          SECCIÓN 6 DE 11
        </p>
        <h3 style={{ margin: '0 0 10px', fontSize: 24, fontWeight: 700, color: 'var(--wl-on-panel, #1a1a2e)' }}>Descubre el patrón</h3>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--wl-on-panel-soft, #6c757d)' }}>
          Compara las frases en español y en coreano. ¿Qué aparece siempre al final en coreano?
        </p>

        <article
          style={{
            background: 'rgba(108,99,255,0.05)',
            border: '1px solid rgba(108,99,255,0.15)',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            textAlign: 'center',
            fontSize: 14,
            color: 'var(--wl-on-panel-link, #6c63ff)',
            fontWeight: 500,
          }}
        >
          Observa las 3 frases. No memorices. Solo nota qué tienen en común.
        </article>

        {COMPARISONS.map((comparison, index) => (
          <article key={comparison.id} style={{ background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
            <header style={{ background: 'var(--wl-panel-raised, #f8f9fa)', borderBottom: '1px solid #e9ecef', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 10, color: 'var(--wl-on-panel-soft, #6c757d)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Frase {index + 1}</span>
              <button
                type="button"
                onClick={() => playAudio(comparison.audioKey, 1)}
                style={{ background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderRadius: 100, padding: '3px 10px', fontSize: 11, color: 'var(--wl-on-panel-soft, #6c757d)', cursor: 'pointer' }}
              >
                🔊 Escuchar
              </button>
            </header>
            <div style={{ padding: 16 }}>
              <div style={{ marginBottom: 12 }}>
                <p style={{ margin: '0 0 4px', fontSize: 9, color: 'var(--wl-on-panel-soft, #6c757d)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Español</p>
                <p style={{ margin: 0, fontSize: 14, color: 'var(--wl-on-panel-soft, #6c757d)' }}>{comparison.spanishNatural}</p>
              </div>
              <div style={{ marginBottom: 12 }}>
                <p style={{ margin: '0 0 4px', fontSize: 9, color: '#e6930a', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Orden coreano</p>
                <p style={{ margin: 0, fontSize: 14, color: '#e6930a', fontWeight: 500 }}>{comparison.spanishOrder}</p>
              </div>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: 9, color: 'var(--wl-on-panel-link, #6c63ff)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Coreano</p>
                {renderKoreanWithHighlight(comparison.korean)}
                {comparison.note ? (
                  <p style={{ margin: '8px 0 0', display: 'inline-block', background: 'rgba(108,99,255,0.06)', borderRadius: 100, padding: '3px 10px', fontSize: 11, color: 'var(--wl-on-panel-link, #6c63ff)' }}>
                    {comparison.note}
                  </p>
                ) : null}
              </div>
            </div>
          </article>
        ))}

        <article
          style={{
            background: 'linear-gradient(rgba(45,155,78,0.06), var(--wl-panel-raised, #fff))',
            border: '1px solid rgba(45,155,78,0.2)',
            borderRadius: 12,
            padding: 16,
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          <p style={{ margin: '0 0 8px', fontSize: 24 }}>💡</p>
          <p style={{ margin: '0 0 4px', fontSize: 14, color: 'var(--wl-on-panel-ok, #2d9b4e)', fontWeight: 600 }}>
            ¿Lo notaste? En las tres frases, 가요 siempre aparece al final.
          </p>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--wl-on-panel-soft, #6c757d)' }}>
            Eso no es coincidencia. Es la regla más importante del coreano.
          </p>
        </article>

        <button
          type="button"
          onClick={() => setPhase('video')}
          style={{ width: '100%', padding: 12, background: '#6c63ff', border: 'none', borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          Ya lo noté — escuchar en vivo →
        </button>
      </section>
    );
  }

  if (phase === 'video') {
    return (
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1rem' }}>
        <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--wl-on-panel-link, #6c63ff)', fontWeight: 700 }}>
          SECCIÓN 6 DE 11
        </p>
        <h3 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: 'var(--wl-on-panel, #1a1a2e)' }}>Ahora escúchalo en vivo.</h3>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--wl-on-panel-soft, #6c757d)' }}>Las mismas 3 frases. Sin subtítulos. Solo escucha.</p>

        <article style={{ background: '#000', borderRadius: 14, overflow: 'hidden', marginBottom: 0, position: 'relative' }}>
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            playsInline
            style={{ width: '100%', display: 'block', maxHeight: 380, objectFit: 'cover' }}
            onLoadedMetadata={(event) => {
              const duration = Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0;
              setVideoDuration(duration);
            }}
            onTimeUpdate={(event) => {
              setVideoCurrentTime(event.currentTarget.currentTime || 0);
            }}
            onEnded={() => { setHasWatchedVideo(true); setIsVideoPlaying(false); }}
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
          />
        </article>

        <div
          style={{
            background: 'var(--wl-panel-raised, #fff)',
            border: '1px solid #e9ecef',
            borderRadius: '0 0 14px 14px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <button
            type="button"
            onClick={() => {
              const video = videoRef.current;
              if (!video) return;
              if (isVideoPlaying) video.pause();
              else video.play().catch(() => { /* noop */ });
            }}
            style={{ width: 36, height: 36, borderRadius: '50%', background: '#6c63ff', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
          >
            {isVideoPlaying ? '⏸' : '▶'}
          </button>

          <button
            type="button"
            onClick={handleVideoProgressClick}
            style={{ flex: 1, height: 4, background: 'var(--wl-panel-raised, #e9ecef)', borderRadius: 2, cursor: 'pointer', position: 'relative', border: 'none', padding: 0 }}
          >
            <span style={{ display: 'block', height: '100%', background: '#6c63ff', borderRadius: 2, width: progressWidth }} />
          </button>

          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--wl-on-panel-soft, #6c757d)', flexShrink: 0 }}>
            {`${formatTime(videoCurrentTime)} / ${formatTime(videoDuration)}`}
          </span>

          <button
            type="button"
            onClick={handleVideoReplay}
            style={{ fontSize: 11, color: 'var(--wl-on-panel-soft, #6c757d)', background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderRadius: 100, padding: '4px 10px', cursor: 'pointer' }}
          >
            🔁 Repetir
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: 11, color: '#adb5bd', marginTop: 10 }}>
          ¿Qué palabra escuchaste al final de cada frase?
        </p>

        <button
          type="button"
          onClick={() => { if (!hasWatchedVideo) return; setPhase('noticing'); }}
          style={{
            marginTop: 16,
            width: '100%',
            padding: '12px',
            background: hasWatchedVideo ? '#6c63ff' : '#e9ecef',
            color: hasWatchedVideo ? '#fff' : '#adb5bd',
            border: 'none',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            cursor: hasWatchedVideo ? 'pointer' : 'not-allowed',
          }}
        >
          {hasWatchedVideo ? 'Responder →' : 'Mira el video completo primero'}
        </button>
      </section>
    );
  }

  if (phase === 'noticing') {
    return (
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1rem' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700, color: 'var(--wl-on-panel, #1a1a2e)' }}>¿Qué aparece al final?</h3>

        <div style={{ marginBottom: 16 }}>
          {COMPARISONS.map((comparison) => (
            <p
              key={comparison.id}
              style={{ margin: '0 0 6px', fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: 'var(--wl-on-panel-soft, #6c757d)', padding: '8px 12px', background: 'var(--wl-panel-raised, #f8f9fa)', borderRadius: 8 }}
            >
              {comparison.korean.replace('가요', '')}
              <span style={{ color: 'var(--wl-on-panel-ok, #2d9b4e)', fontWeight: 700 }}>가요</span>.
            </p>
          ))}
        </div>

        <article style={{ background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderRadius: 14, padding: 20, marginBottom: 16 }}>
          <p style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: 'var(--wl-on-panel, #1a1a2e)' }}>{NOTICING_QUESTION.prompt}</p>

          {NOTICING_OPTIONS
            .filter((option) => shuffledOptions.includes(option.value))
            .sort((a, b) => shuffledOptions.indexOf(a.value) - shuffledOptions.indexOf(b.value))
            .map((option) => {
              const selected = selectedOption === option.value;
              const isCorrectOption = option.value === NOTICING_QUESTION.expectedAnswer;
              const showCorrect = checked && isCorrectOption;
              const showWrong = checked && selected && !isCorrectOption;

              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => { if (checked) return; setSelectedOption(option.value); }}
                  style={{
                    width: '100%',
                    marginBottom: 8,
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: 18,
                    padding: 14,
                    borderRadius: 10,
                    border: `1.5px solid ${showCorrect ? '#2d9b4e' : showWrong ? '#dc3545' : selected ? '#6c63ff' : '#e9ecef'}`,
                    background: showCorrect ? 'rgba(45,155,78,0.06)' : showWrong ? 'rgba(220,53,69,0.05)' : selected ? 'rgba(108,99,255,0.06)' : '#fff',
                    color: showCorrect ? '#2d9b4e' : showWrong ? '#dc3545' : '#1a1a2e',
                    textAlign: 'left',
                    cursor: checked ? 'default' : 'pointer',
                  }}
                  disabled={checked}
                >
                  <span>{option.value}</span>
                  <span style={{ marginLeft: 8, fontFamily: 'inherit', fontSize: 12, color: 'var(--wl-on-panel-soft, #6c757d)' }}>({option.desc})</span>
                </button>
              );
            })}

          {checked ? (
            <div
              style={{
                marginTop: 10,
                padding: '10px 12px',
                borderRadius: 8,
                fontSize: 12,
                lineHeight: 1.6,
                background: correct ? 'rgba(45,155,78,0.06)' : 'rgba(220,53,69,0.05)',
                border: `1px solid ${correct ? 'rgba(45,155,78,0.2)' : 'rgba(220,53,69,0.15)'}`,
                color: correct ? '#2d9b4e' : '#dc3545',
              }}
            >
              {correct ? `✅ ${NOTICING_QUESTION.explanation}` : `❌ La respuesta es: ${NOTICING_QUESTION.expectedAnswer}. ${NOTICING_QUESTION.explanation}`}
            </div>
          ) : null}

          {checked && correct ? (
            <div style={{ textAlign: 'center', padding: 20 }}>
              <p style={{ margin: 0, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 56, fontWeight: 700, color: 'var(--wl-on-panel-ok, #2d9b4e)' }}>가요</p>
            </div>
          ) : null}

          <div style={{ marginTop: 12 }}>
            {!checked ? (
              <button
                type="button"
                onClick={() => setChecked(true)}
                disabled={!selectedOption}
                style={{ width: '100%', padding: 12, background: selectedOption ? '#6c63ff' : '#e9ecef', color: selectedOption ? '#fff' : '#adb5bd', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: selectedOption ? 'pointer' : 'not-allowed' }}
              >
                Verificar
              </button>
            ) : (
              <button
                type="button"
                onClick={() => { setPhase('complete'); onComplete?.(); }}
                style={{ width: '100%', padding: 12, background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                Ver el resumen →
              </button>
            )}
          </div>
        </article>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
      <article
        style={{
          background: 'linear-gradient(rgba(45,155,78,0.06), var(--wl-panel-raised, #fff))',
          border: '1px solid rgba(45,155,78,0.2)',
          borderRadius: 16,
          padding: '2rem',
          marginBottom: 20,
        }}
      >
        <p style={{ margin: '0 0 4px', fontFamily: "'Noto Sans KR', sans-serif", fontSize: 64, fontWeight: 700, color: 'var(--wl-on-panel-ok, #2d9b4e)' }}>가요</p>
        <p style={{ margin: '0 0 16px', fontSize: 16, color: 'var(--wl-on-panel-soft, #6c757d)' }}>siempre al final</p>
        <p style={{ margin: 0, background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderRadius: 10, padding: '12px 16px', textAlign: 'left', fontSize: 13, color: 'var(--wl-on-panel, #1a1a2e)', lineHeight: 1.7 }}>
          En coreano la acción va siempre al final de la frase. No importa qué tan larga sea. El verbo siempre cierra.
        </p>
      </article>

      <div style={{ marginBottom: 12 }}>
        {COMPARISONS.map((comparison) => (
          <div
            key={comparison.id}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderRadius: 10, padding: '8px 14px', marginBottom: 6, textAlign: 'left', gap: 10 }}
          >
            <div style={{ flex: 1, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16, color: 'var(--wl-on-panel, #1a1a2e)' }}>
              {comparison.korean.replace('가요', '')}
              <span style={{ color: 'var(--wl-on-panel-ok, #2d9b4e)', fontWeight: 700 }}>가요</span>.
            </div>
            <button
              type="button"
              onClick={() => playAudio(comparison.audioKey, 1)}
              style={{ border: 'none', background: 'none', fontSize: 14, color: 'var(--wl-on-panel-link, #6c63ff)', cursor: 'pointer' }}
            >
              ▶
            </button>
          </div>
        ))}
      </div>

      <p style={{ margin: '16px 0 0', padding: '12px 14px', background: 'rgba(108,99,255,0.05)', border: '1px solid rgba(108,99,255,0.12)', borderRadius: 8, fontSize: 12, color: 'var(--wl-on-panel-link, #6c63ff)', textAlign: 'left' }}>
        Conectar bloques de frase con situación comunicativa.
      </p>
    </section>
  );
}
