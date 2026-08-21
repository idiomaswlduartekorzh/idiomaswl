'use client';

import { useState, useRef, useEffect } from 'react';
import { resolveAudioUrl } from '@/lib/examAudio';

// ── Shared string/answer helpers ───────────────────────────────────────────────
// Extraídos de IELTSPracticeClient/TOEFLPracticeClient, donde estaban duplicados
// byte a byte. Usados por los distintos "exam runner" clients bajo
// src/app/(site)/examenes/[exam]/practica/[mockId]/.

export function formatTime(secs: number) {
  return `${Math.floor(secs / 60).toString().padStart(2, '0')}:${(secs % 60).toString().padStart(2, '0')}`;
}

export function countWords(t: string) {
  return t.trim().split(/\s+/).filter(Boolean).length;
}

export function norm(s: string) {
  return s.trim().toLowerCase().replace(/[.,!?;:'"]/g, '');
}

export function isCorrect(input: string, accepted: string[]) {
  return accepted.some(a => norm(a) === norm(input));
}

export function blankKey(groupId: string, num: number) {
  return `${groupId}__${num}`;
}

// ── Timer ─────────────────────────────────────────────────────────────────────

export function Timer({ totalSecs, onExpire }: { totalSecs: number; onExpire: () => void }) {
  const [secs, setSecs] = useState(totalSecs);
  const ref = useRef(onExpire);
  useEffect(() => {
    ref.current = onExpire;
  }, [onExpire]);
  useEffect(() => {
    const id = setInterval(() => setSecs(p => {
      if (p <= 1) { clearInterval(id); ref.current(); return 0; }
      return p - 1;
    }), 1000);
    return () => clearInterval(id);
  }, []);
  const urgent = secs < 300;
  return (
    <div className={`prac-timer${urgent ? ' prac-timer--urgent' : ''}`}>
      <span className="prac-timer__label">Tiempo</span>
      <span className="prac-timer__val">{formatTime(secs)}</span>
      <div className="prac-timer__bar">
        <div className="prac-timer__fill" style={{ width: `${(secs / totalSecs) * 100}%`, background: urgent ? '#c8202e' : 'var(--accent)' }} />
      </div>
    </div>
  );
}

// ── Audio player ──────────────────────────────────────────────────────────────

export function AudioPlayer({
  src,
  label = 'Listening',
  alreadyPlayed = false,
  onPlaybackStart,
  onEnded,
  onPlaybackError,
}: {
  src?: string;
  label?: string;
  alreadyPlayed?: boolean;
  onPlaybackStart?: () => void;
  onEnded?: () => void;
  onPlaybackError?: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  function play() {
    if (!audioRef.current || started || alreadyPlayed) return;
    void audioRef.current.play().then(() => {
      setStarted(true);
      onPlaybackStart?.();
    }).catch(() => {
      onPlaybackError?.();
    });
  }

  const pct = duration > 0 ? (current / duration) * 100 : 0;

  if (!src) return null;

  if (alreadyPlayed && !started) {
    return (
      <div className="ielts-audio" role="status">
        <div className="ielts-audio__player">
          <span className="ielts-audio__btn ielts-audio__btn--done" aria-hidden="true">✓</span>
          <div className="ielts-audio__info">
            <span className="ielts-audio__label">{label} — reproducción única completada</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ielts-audio">
      <audio
        ref={audioRef}
        src={resolveAudioUrl(src)}
        onTimeUpdate={() => setCurrent(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => {
          setDone(true);
          onEnded?.();
        }}
        onError={onPlaybackError}
      />
      <div className="ielts-audio__player">
        <button
          className={`ielts-audio__btn${started ? ' ielts-audio__btn--done' : ''}`}
          onClick={play}
          aria-label="Play"
          disabled={started || alreadyPlayed}
        >
          {done ? '✓' : '▶'}
        </button>
        <div className="ielts-audio__info">
          <span className="ielts-audio__label">
            {done ? `${label} — completed` : started ? `${label} — playing…` : `${label} — press play to begin`}
          </span>
          <div className="ielts-audio__progress-wrap">
            <div
              className="ielts-audio__progress-bar"
              style={{ '--pct': `${pct}%` } as React.CSSProperties}
            />
            <span className="ielts-audio__time">{formatTime(Math.floor(current))} / {formatTime(Math.floor(duration))}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Skill tabs ────────────────────────────────────────────────────────────────

export function SkillTabs({ skills, active, onSelect, progress, comingSoon, labels }: {
  skills: string[];
  active: string;
  onSelect: (s: string) => void;
  progress: Record<string, { done: number; total: number }>;
  comingSoon?: Set<string>;
  labels: Record<string, string>;
}) {
  const cs = comingSoon ?? new Set<string>();
  return (
    <div className="ielts-skill-tabs">
      {skills.map(skill => {
        const isCS = cs.has(skill);
        const p = progress[skill];
        return (
          <button key={skill}
            onClick={() => { if (!isCS) onSelect(skill); }}
            disabled={isCS}
            className={`ielts-skill-tab${active === skill ? ' ielts-skill-tab--active' : ''}${isCS ? ' ielts-skill-tab--coming-soon' : ''}`}>
            <span>{labels[skill] ?? skill}</span>
            {isCS
              ? <span className="ielts-skill-tab__badge">🔨 Próximamente</span>
              : p && <span className="ielts-skill-tab__count">{p.done}/{p.total}</span>}
          </button>
        );
      })}
    </div>
  );
}
