'use client';

// ─── Motor de Historias ───────────────────────────────────────────────────────
//
// Un solo componente para todas las historias de todos los idiomas. Nació de
// LockedPhoneClient y GrandmothersLedgerClient, que eran el mismo archivo con
// los textos cambiados. Aquí el contenido entra como dato (`Historia`) y la
// interfaz sale de un paquete de etiquetas (`STORY_UI`).
//
// Dos cosas que conviene no romper:
//
// 1. El tokenizador es Unicode (`\p{L}`), no `[a-zA-Z]`. Sin eso, «Größvater»,
//    «déjà», «дедушка» o «할아버지» se parten mal y el clic-para-traducir deja de
//    encontrar la palabra en el diccionario.
// 2. `audioSrc: null` no es un fallo: es «grabación pendiente». El alumno hace
//    el ejercicio completo por escrito y el audio se enchufa después.

import { useState, useRef, type Dispatch, type SetStateAction } from 'react';
import Link from 'next/link';
import type { Historia, StoryQuestion, StoryVoice, VoiceKey } from '@/data/practica/historias/types';
import { totalParts, totalQuestions } from '@/data/practica/historias/types';
import { STORY_UI } from '@/data/practica/historias/ui';

/**
 * Cada voz recorre los mismos cinco pasos, en este orden. La fase se compone
 * como `<clave de la voz>-<paso>`: `a-listen`, `c-compare`…
 *
 * Antes estaban escritas una a una para las voces `a` y `b`. Con tres voces esa
 * lista se volvía inmanejable, así que se genera.
 */
const VOICE_STEPS = ['listen', 'write1', 'transcript', 'compare', 'quiz'] as const;
type VoiceStep = (typeof VOICE_STEPS)[number];

type Phase =
  | 'intro'
  | 'narrator' | 'narrator-quiz'
  | `${VoiceKey}-${VoiceStep}`
  | 'final-quiz' | 'results';

/** Estado de escritura y palabras marcadas, una entrada por voz. */
interface VoiceState { write1: string; write2: string; unknown: Set<string> }
const emptyVoiceState = (): VoiceState => ({ write1: '', write2: '', unknown: new Set() });

const NARRATOR_COLOR = '#6b7280';
const FINAL_COLOR = '#059669';

/** Normaliza una palabra a la forma que usan las claves del diccionario. */
export function dictKey(token: string): string {
  return token.replace(/[^\p{L}\p{M}]/gu, '').toLowerCase();
}

// ─── AudioPlayer ──────────────────────────────────────────────────────────────

function AudioPlayer({ src, label, color }: { src: string; label: string; color: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  function toggle() {
    if (!ref.current) return;
    if (playing) { ref.current.pause(); setPlaying(false); }
    else { ref.current.play(); setPlaying(true); }
  }

  function fmt(s: number) {
    if (!Number.isFinite(s)) return '0:00';
    return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
  }

  return (
    <div style={{ background: `${color}0d`, border: `1.5px solid ${color}33`, borderRadius: 16, padding: '1.25rem 1.5rem' }}>
      <audio ref={ref} src={src} preload="metadata"
        onTimeUpdate={() => setProgress(ref.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(ref.current?.duration ?? 0)}
        onEnded={() => { setPlaying(false); setProgress(0); }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={toggle} aria-label={playing ? 'Pausa' : 'Reproducir'}
          style={{ width: 48, height: 48, borderRadius: '50%', background: color, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#fff', flexShrink: 0, boxShadow: `0 4px 16px ${color}44` }}>
          {playing ? '⏸' : '▶'}
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color, marginBottom: '0.4rem', fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}>🎙 {label}</div>
          <div style={{ position: 'relative', height: 6, background: 'var(--line-soft)', borderRadius: 4, overflow: 'hidden', cursor: 'pointer' }}
            onClick={e => {
              if (!ref.current || !duration) return;
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              ref.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
            }}
          >
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: duration ? `${(progress / duration) * 100}%` : '0%', background: color, borderRadius: 4, transition: 'width 0.1s linear' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--muted)', marginTop: '0.3rem', fontFamily: 'var(--mono)' }}>
            <span>{fmt(progress)}</span><span>{fmt(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AudioPending ─────────────────────────────────────────────────────────────
// Lo que ve el alumno cuando el mp3 todavía no existe. Dice la verdad y no
// bloquea: el ejercicio se puede hacer entero por escrito.

function AudioPending({ label, color, title, body }: { label: string; color: string; title: string; body: string }) {
  return (
    <div style={{ background: 'rgba(245,158,11,0.06)', border: '1.5px dashed rgba(245,158,11,0.45)', borderRadius: 16, padding: '1.25rem 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(245,158,11,0.14)', border: '1.5px solid rgba(245,158,11,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>🎙</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color, marginBottom: '0.25rem', fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}>{label}</div>
          <p style={{ margin: '0 0 0.35rem', fontSize: '0.92rem', fontWeight: 800, color: '#d97706' }}>{title}</p>
          <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>{body}</p>
        </div>
      </div>
    </div>
  );
}

// ─── ClickableText ────────────────────────────────────────────────────────────

function ClickableText({ paragraphs, dict, unknown, onToggle, hintLabel, noTranslationLabel }: {
  paragraphs: string[];
  dict: Record<string, string>;
  unknown: Set<string>;
  onToggle: (w: string) => void;
  hintLabel: string;
  noTranslationLabel: string;
}) {
  const [lastWord, setLastWord] = useState<string | null>(null);

  return (
    <div>
      <div style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--ink)' }}>
        {paragraphs.map((para, pi) => {
          const tokens = para.split(/(\s+)/);
          return (
            <p key={pi} style={{ margin: '0 0 0.8rem' }}>
              {tokens.map((tok, ti) => {
                if (/^\s+$/.test(tok)) return <span key={ti}>{tok}</span>;
                const clean = dictKey(tok);
                if (!clean) return <span key={ti}>{tok}</span>;
                const pre = tok.match(/^[^\p{L}\p{M}]*/u)?.[0] ?? '';
                const post = tok.match(/[^\p{L}\p{M}]*$/u)?.[0] ?? '';
                const word = tok.slice(pre.length, tok.length - post.length);
                const isUnknown = unknown.has(clean);
                const hasDict = !!dict[clean];
                return (
                  <span key={ti}>
                    {pre}
                    <span
                      onClick={() => { onToggle(clean); setLastWord(clean); }}
                      title={hasDict ? dict[clean] : undefined}
                      style={{
                        cursor: 'pointer',
                        textDecoration: isUnknown ? 'underline' : 'none',
                        textDecorationColor: '#f59e0b',
                        textDecorationThickness: '2px',
                        color: isUnknown ? '#d97706' : 'inherit',
                        borderBottom: !isUnknown && hasDict ? '1px dashed rgba(107,114,128,0.22)' : 'none',
                        transition: 'color 0.12s',
                      }}
                    >{word}</span>
                    {post}
                  </span>
                );
              })}
            </p>
          );
        })}
      </div>

      <div style={{ marginTop: '0.6rem', padding: '0.55rem 1rem', borderRadius: 10, background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', fontSize: '0.82rem', minHeight: 36, display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        {lastWord ? (
          <>
            <span style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: '#d97706' }}>{lastWord}</span>
            <span style={{ color: 'var(--muted)' }}>→</span>
            <span style={{ color: 'var(--ink)' }}>{dict[lastWord] ?? noTranslationLabel}</span>
          </>
        ) : (
          <span style={{ color: 'var(--muted)' }}>{hintLabel}</span>
        )}
      </div>
    </div>
  );
}

// ─── WriteBox ─────────────────────────────────────────────────────────────────

function WriteBox({ prompt, value, onChange, onSubmit, submitLabel, color, hint, placeholder }: {
  prompt: string; value: string; onChange: (v: string) => void; onSubmit: () => void;
  submitLabel: string; color: string; hint?: string; placeholder: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.55 }}>{prompt}</p>
      {hint && <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5 }}>{hint}</p>}
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        style={{ width: '100%', padding: '0.85rem 1rem', fontSize: '0.95rem', borderRadius: 12, border: `1.5px solid ${color}33`, background: 'var(--bg)', color: 'var(--ink)', fontFamily: 'inherit', lineHeight: 1.6, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
        onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = `${color}88`; }}
        onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = `${color}33`; }}
      />
      <button onClick={onSubmit} disabled={!value.trim()} className="btn"
        style={{ fontSize: '0.95rem', padding: '0.9rem 1.75rem', opacity: value.trim() ? 1 : 0.45, cursor: value.trim() ? 'pointer' : 'default' }}>
        {submitLabel}
      </button>
    </div>
  );
}

// ─── CompareView ──────────────────────────────────────────────────────────────

function CompareView({ write1, write2, unknown, dict, color, onContinue, labels }: {
  write1: string; write2: string; unknown: Set<string>; dict: Record<string, string>;
  color: string; onContinue: () => void;
  labels: { without: string; with: string; marked: (n: number) => string; cta: string };
}) {
  const list = Array.from(unknown);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${color}22`, borderRadius: 16, padding: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem' }}>
        <div>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.66rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>
            🎧 {labels.without}
          </p>
          <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.65, color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>{write1}</p>
        </div>
        <div style={{ borderLeft: `1.5px solid ${color}22`, paddingLeft: '1rem' }}>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.66rem', fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>
            📄 {labels.with}
          </p>
          <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.65, color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>{write2}</p>
        </div>
      </div>

      {list.length > 0 && (
        <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 12, padding: '1rem 1.25rem' }}>
          <p style={{ margin: '0 0 0.65rem', fontSize: '0.66rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>
            {labels.marked(list.length)}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {list.map(w => (
              <span key={w} style={{ fontSize: '0.8rem', padding: '0.2rem 0.7rem', borderRadius: 20, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#d97706', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                {w}{dict[w] ? <span style={{ color: 'var(--muted)', fontWeight: 400 }}> → {dict[w]}</span> : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      <button onClick={onContinue} className="btn" style={{ fontSize: '0.95rem', padding: '0.9rem 1.75rem' }}>
        {labels.cta}
      </button>
    </div>
  );
}

// ─── QuizBlock ────────────────────────────────────────────────────────────────

function QuizBlock({ questions, color, onComplete, labels }: {
  questions: StoryQuestion[]; color: string; onComplete: (s: boolean[]) => void;
  labels: { correct: string; notQuite: string; next: string; done: string };
}) {
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);

  const q = questions[idx];
  const answered = chosen !== null;

  function pick(i: number) {
    if (answered) return;
    setChosen(i);
    setResults(prev => [...prev, i === q.correct]);
  }

  function next() {
    if (idx + 1 < questions.length) { setIdx(idx + 1); setChosen(null); }
    else onComplete([...results]);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        {questions.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < idx ? color : i === idx ? `${color}66` : 'var(--line-soft)' }} />
        ))}
      </div>

      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${color}33`, borderRadius: 16, padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: 6, background: `${color}18`, color, border: `1px solid ${color}33`, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{q.type}</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{idx + 1} / {questions.length}</span>
        </div>
        <p style={{ margin: '0 0 1.25rem', fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.55 }}>{q.q}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
          {q.opts.map((opt, i) => {
            const isCorrect = i === q.correct, isChosen = chosen === i;
            let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', clr = 'var(--ink)';
            if (answered) {
              if (isCorrect) { bg = 'rgba(5,150,105,0.08)'; border = '1.5px solid #059669'; clr = '#059669'; }
              else if (isChosen) { bg = 'rgba(220,38,38,0.07)'; border = '1.5px solid #dc2626'; clr = '#dc2626'; }
            }
            return (
              <button key={i} onClick={() => pick(i)}
                style={{ textAlign: 'left', padding: '0.85rem 1rem', borderRadius: 12, border, background: bg, color: clr, cursor: answered ? 'default' : 'pointer', fontFamily: 'inherit', fontSize: '0.9rem', lineHeight: 1.45, fontWeight: 500, transition: 'all 0.15s', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', border: `1.5px solid ${answered ? (isCorrect ? '#059669' : isChosen ? '#dc2626' : 'var(--line-soft)') : 'currentColor'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, background: answered && isCorrect ? '#059669' : answered && isChosen ? '#dc2626' : 'transparent', color: answered && (isCorrect || isChosen) ? '#fff' : 'currentColor' }}>
                  {answered && isCorrect ? '✓' : answered && isChosen ? '✗' : String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <div style={{ marginTop: '1rem', padding: '0.9rem 1rem', borderRadius: 12, background: chosen === q.correct ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.06)', border: `1px solid ${chosen === q.correct ? '#05966933' : '#dc262633'}` }}>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--ink)', lineHeight: 1.6 }}>
              <strong style={{ color: chosen === q.correct ? '#059669' : '#dc2626' }}>{chosen === q.correct ? labels.correct : labels.notQuite}</strong>
              {' — '}{q.explanation}
            </p>
          </div>
        )}
      </div>

      {answered && (
        <button onClick={next} className="btn" style={{ fontSize: '0.95rem', padding: '0.9rem' }}>
          {idx + 1 < questions.length ? labels.next : labels.done}
        </button>
      )}
    </div>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────

function SectionHeader({ n, part, title, color }: { n: string; part: string; title: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
      <span style={{ width: 32, height: 32, borderRadius: '50%', background: `${color}18`, border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color, fontFamily: 'var(--mono)', flexShrink: 0 }}>{n}</span>
      <div>
        <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{part}</p>
        <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>{title}</h2>
      </div>
    </div>
  );
}

// ─── Motor ────────────────────────────────────────────────────────────────────

export default function StoryEngine({ historia, hubHref, hubLabel }: {
  historia: Historia; hubHref: string; hubLabel: string;
}) {
  const t = STORY_UI[historia.ui];
  const voices = historia.voices;
  const parts = totalParts(historia);

  const [phase, setPhase] = useState<Phase>('intro');
  const [scores, setScores] = useState<Record<string, boolean[]>>({});

  const [narratorUnknown, setNarratorUnknown] = useState<Set<string>>(new Set());
  const [voiceState, setVoiceState] = useState<Record<string, VoiceState>>(
    () => Object.fromEntries(voices.map(v => [v.key, emptyVoiceState()])),
  );

  function saveScore(key: string, s: boolean[]) { setScores(prev => ({ ...prev, [key]: s })); }

  const vs = (key: string) => voiceState[key] ?? emptyVoiceState();

  function patchVoice(key: string, patch: Partial<VoiceState>) {
    setVoiceState(prev => ({ ...prev, [key]: { ...(prev[key] ?? emptyVoiceState()), ...patch } }));
  }

  function toggleUnknown(setter: Dispatch<SetStateAction<Set<string>>>, word: string) {
    setter(prev => {
      const next = new Set(prev);
      if (next.has(word)) next.delete(word); else next.add(word);
      return next;
    });
  }

  function toggleVoiceUnknown(key: string, word: string) {
    setVoiceState(prev => {
      const cur = prev[key] ?? emptyVoiceState();
      const next = new Set(cur.unknown);
      if (next.has(word)) next.delete(word); else next.add(word);
      return { ...prev, [key]: { ...cur, unknown: next } };
    });
  }

  /** La fase que sigue al terminar la voz `i`: la siguiente voz, o la final. */
  const afterVoice = (i: number): Phase =>
    i + 1 < voices.length ? `${voices[i + 1].key}-listen` : 'final-quiz';

  const totalQs = totalQuestions(historia);
  const totalRight = Object.values(scores).flat().filter(Boolean).length;
  const pct = totalQs > 0 ? Math.round((totalRight / totalQs) * 100) : 0;
  const band = pct >= 90 ? t.bands.advanced : pct >= 75 ? t.bands.upper : pct >= 55 ? t.bands.intermediate : t.bands.keepGoing;
  const bandColor = pct >= 90 ? '#059669' : pct >= 75 ? '#0f3d8c' : pct >= 55 ? '#d97706' : '#dc2626';

  const compareLabels = { without: t.withoutTranscript, with: t.withTranscript, marked: t.markedWords, cta: t.continueQuestions };
  const quizLabels = { correct: t.correct, notQuite: t.notQuite, next: t.nextQuestion, done: t.continueLabel };
  const textLabels = { hintLabel: t.clickAnyWord, noTranslationLabel: t.noTranslation };

  // Un bloque de escucha (listen / write1 / transcript / compare / quiz) es
  // idéntico para todas las voces; solo cambian el estado y la fase siguiente.
  // `i` es el índice de la voz: de él salen el número de sección y el «parte N
  // de M», que antes iban escritos a mano.
  function renderListen(v: StoryVoice, n: string, partIdx: number, nextPhase: Phase) {
    return (
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <SectionHeader n={n} part={t.partOf(partIdx, parts, t.listening)} title={t.voiceNote(v.name)} color={v.color} />
        <div style={{ background: `${v.color}07`, border: `1px solid ${v.color}22`, borderRadius: 12, padding: '0.85rem 1.1rem', marginBottom: '1.25rem', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎧 <strong style={{ color: 'var(--ink)' }}>{t.step1}</strong> {v.listenHint}
        </div>
        {v.audioSrc
          ? <AudioPlayer src={v.audioSrc} label={`${v.name} — ${v.role}`} color={v.color} />
          : <AudioPending label={`${v.name} — ${v.role}`} color={v.color} title={t.audioPendingTitle} body={t.audioPendingBody} />}
        <div style={{ height: '1.25rem' }} />
        <button onClick={() => setPhase(nextPhase)} className="btn" style={{ fontSize: '0.95rem', padding: '0.9rem 1.75rem' }}>
          {v.audioSrc ? t.listenedNext : t.audioPendingCta}
        </button>
      </div>
    );
  }

  function renderWrite1(v: StoryVoice, n: string, partIdx: number, value: string, setValue: (s: string) => void, nextPhase: Phase) {
    return (
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <SectionHeader n={n} part={`${t.partOf(partIdx, parts, t.listening)} · ${t.step2}`} title={t.whatDidYouUnderstand} color={v.color} />
        <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${v.color}22`, borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem' }}>
          <WriteBox
            prompt={v.write1Prompt}
            hint={v.write1Hint}
            value={value}
            onChange={setValue}
            onSubmit={() => setPhase(nextPhase)}
            submitLabel={t.submitWithTranscript}
            color={v.color}
            placeholder={t.writePlaceholder}
          />
        </div>
      </div>
    );
  }

  function renderTranscript(
    v: StoryVoice, n: string, partIdx: number,
    unknown: Set<string>, onToggleWord: (w: string) => void,
    value: string, setValue: (s: string) => void, nextPhase: Phase,
  ) {
    return (
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <SectionHeader n={n} part={`${t.partOf(partIdx, parts, t.listening)} · ${t.step3}`} title={t.listenAgainTranscript} color={v.color} />
        <div style={{ background: `${v.color}07`, border: `1px solid ${v.color}22`, borderRadius: 12, padding: '0.85rem 1.1rem', marginBottom: '1.25rem', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          📄 <strong style={{ color: 'var(--ink)' }}>{t.clickUnknown}</strong> — {v.transcriptHint}
        </div>
        {v.audioSrc
          ? <AudioPlayer src={v.audioSrc} label={`${v.name} — ${v.role}`} color={v.color} />
          : <AudioPending label={`${v.name} — ${v.role}`} color={v.color} title={t.audioPendingTitle} body={t.audioPendingBody} />}
        <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${v.color}22`, borderRadius: 20, padding: '1.75rem', margin: '1.25rem 0' }}>
          <p style={{ margin: '0 0 1rem', fontSize: '0.72rem', fontWeight: 800, color: v.color, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t.transcript}</p>
          <ClickableText
            paragraphs={v.paragraphs}
            dict={historia.dict}
            unknown={unknown}
            onToggle={onToggleWord}
            {...textLabels}
          />
        </div>
        <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${v.color}22`, borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem' }}>
          <WriteBox
            prompt={v.write2Prompt}
            value={value}
            onChange={setValue}
            onSubmit={() => setPhase(nextPhase)}
            submitLabel={t.compareVersions}
            color={v.color}
            placeholder={t.writePlaceholder}
          />
        </div>
      </div>
    );
  }

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (phase === 'intro') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <Link href={hubHref} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--muted)', textDecoration: 'none', marginBottom: '1.75rem' }}>← {hubLabel}</Link>
      <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />{historia.icon} {hubLabel} · {historia.level}</p>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.5rem', lineHeight: 1.1 }}>{historia.title}</h1>
      <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem', lineHeight: 1.65 }}>{historia.intro}</p>

      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line-soft)', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>{t.structure}</p>
        {[
          { n: '01', label: t.readNarrator, sub: `${historia.narrator.questions.length} · ${t.readNarratorSub}`, color: NARRATOR_COLOR },
          ...voices.map((v, i) => ({
            n: String(i + 2).padStart(2, '0'),
            label: t.listenTo(v.name),
            sub: `${v.questions.length} · ${t.listenToSub}`,
            color: v.color,
          })),
          { n: String(parts).padStart(2, '0'), label: t.overallTitle, sub: t.overallSub(historia.finalQuestions.length), color: FINAL_COLOR },
        ].map(step => (
          <div key={step.n} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.6rem 0', borderBottom: '1px solid var(--line-soft)' }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: `${step.color}18`, border: `1.5px solid ${step.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, color: step.color, fontFamily: 'var(--mono)', flexShrink: 0 }}>{step.n}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>{step.label}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--muted)', marginLeft: '0.5rem' }}>{step.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setPhase('narrator')} className="btn" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>{t.begin}</button>
    </div>
  );

  // ── NARRADOR ──────────────────────────────────────────────────────────────
  if (phase === 'narrator') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <button onClick={() => setPhase('intro')} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '0.82rem', cursor: 'pointer', marginBottom: '1.5rem', padding: 0 }}>{t.back}</button>
      <SectionHeader n="01" part={t.partOf(1, parts, t.reading)} title={t.narrator} color={NARRATOR_COLOR} />

      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${NARRATOR_COLOR}33`, borderRadius: 20, padding: '2rem', marginBottom: '1rem' }}>
        <p style={{ margin: '0 0 1rem', fontSize: '0.68rem', fontWeight: 800, color: NARRATOR_COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{historia.title}</p>
        <ClickableText
          paragraphs={historia.narrator.paragraphs}
          dict={historia.dict}
          unknown={narratorUnknown}
          onToggle={w => toggleUnknown(setNarratorUnknown, w)}
          {...textLabels}
        />
      </div>

      <div style={{ background: 'rgba(107,114,128,0.06)', border: '1px solid rgba(107,114,128,0.2)', borderRadius: 12, padding: '0.85rem 1.1rem', marginBottom: '1.5rem', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        💡 <strong style={{ color: 'var(--ink)' }}>{t.tip}</strong> {historia.narrator.tip}
      </div>

      <button onClick={() => setPhase('narrator-quiz')} className="btn" style={{ fontSize: '0.95rem', padding: '0.9rem 1.75rem' }}>{t.readDone}</button>
    </div>
  );

  if (phase === 'narrator-quiz') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="01" part={`${t.partOf(1, parts, t.reading)} · ${t.questionsLabel}`} title={t.narratorComprehension} color={NARRATOR_COLOR} />
      <QuizBlock questions={historia.narrator.questions} color={NARRATOR_COLOR} labels={quizLabels}
        onComplete={s => { saveScore('narrator', s); setPhase(`${voices[0].key}-listen`); }} />
    </div>
  );

  // ── VOCES ─────────────────────────────────────────────────────────────────
  // Un solo despachador para todas. La voz `i` es la parte `i + 2` (después del
  // narrador) y su sección se numera `02`, `03`, `04`…
  for (let i = 0; i < voices.length; i++) {
    const v = voices[i];
    if (!phase.startsWith(`${v.key}-`)) continue;

    const n = String(i + 2).padStart(2, '0');
    const partIdx = i + 2;
    const st = vs(v.key);
    const step = phase.slice(v.key.length + 1) as VoiceStep;

    if (step === 'listen') return renderListen(v, n, partIdx, `${v.key}-write1`);
    if (step === 'write1') {
      return renderWrite1(v, n, partIdx, st.write1, s => patchVoice(v.key, { write1: s }), `${v.key}-transcript`);
    }
    if (step === 'transcript') {
      return renderTranscript(v, n, partIdx, st.unknown, w => toggleVoiceUnknown(v.key, w),
        st.write2, s => patchVoice(v.key, { write2: s }), `${v.key}-compare`);
    }
    if (step === 'compare') return (
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <SectionHeader n={n} part={`${t.partOf(partIdx, parts, t.listening)} · ${t.comparison}`} title={t.comparisonTitle} color={v.color} />
        <CompareView write1={st.write1} write2={st.write2} unknown={st.unknown} dict={historia.dict}
          color={v.color} labels={compareLabels} onContinue={() => setPhase(`${v.key}-quiz`)} />
      </div>
    );
    if (step === 'quiz') return (
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <SectionHeader n={n} part={`${t.partOf(partIdx, parts, t.listening)} · ${t.questionsLabel}`} title={t.comprehensionOf(v.name)} color={v.color} />
        <QuizBlock questions={v.questions} color={v.color} labels={quizLabels}
          onComplete={s => { saveScore(v.key, s); setPhase(afterVoice(i)); }} />
      </div>
    );
  }

  // ── FINAL ─────────────────────────────────────────────────────────────────
  if (phase === 'final-quiz') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n={String(parts).padStart(2, "0")} part={t.partOf(parts, parts, t.overall)} title={t.bigPicture} color={FINAL_COLOR} />
      {historia.finalIntro.map((p, i) => (
        <p key={i} style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>{p}</p>
      ))}
      <QuizBlock questions={historia.finalQuestions} color={FINAL_COLOR} labels={quizLabels}
        onComplete={s => { saveScore('final', s); setPhase('results'); }} />
    </div>
  );

  // ── RESULTADOS ────────────────────────────────────────────────────────────
  const sections = [
    { key: 'narrator', label: t.narrator, color: NARRATOR_COLOR, total: historia.narrator.questions.length },
    ...voices.map(v => ({ key: v.key, label: v.name, color: v.color, total: v.questions.length })),
    { key: 'final', label: t.overall, color: FINAL_COLOR, total: historia.finalQuestions.length },
  ];
  const allUnknown = Array.from(new Set([
    ...narratorUnknown,
    ...voices.flatMap(v => Array.from(vs(v.key).unknown)),
  ]));

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />{t.results}</p>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.35rem', letterSpacing: '-0.03em' }}>{historia.title}</h2>
      <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.75rem' }}>{t.completedAll}</p>

      <div style={{ background: `linear-gradient(135deg, ${bandColor}11 0%, ${bandColor}06 100%)`, border: `2px solid ${bandColor}44`, borderRadius: 20, padding: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3.5rem', fontWeight: 900, color: bandColor, lineHeight: 1 }}>{totalRight}<span style={{ fontSize: '1.5rem', color: 'var(--muted)' }}>/{totalQs}</span></div>
        <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0.35rem 0' }}>{t.correctAnswers}</div>
        <div style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 800, color: bandColor, background: `${bandColor}15`, border: `1.5px solid ${bandColor}44`, borderRadius: 10, padding: '0.4rem 1.1rem', fontFamily: 'var(--mono)' }}>{band}</div>
        <div style={{ marginTop: '1rem', height: 8, background: 'var(--line-soft)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${bandColor}, ${bandColor}cc)`, borderRadius: 4, transition: 'width 1s ease' }} />
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.35rem', fontFamily: 'var(--mono)' }}>{pct}%</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {sections.map(sec => {
          const s = scores[sec.key] ?? [];
          const right = s.filter(Boolean).length;
          const pctS = sec.total > 0 ? Math.round((right / sec.total) * 100) : 0;
          return (
            <div key={sec.key} style={{ background: 'var(--bg-1)', border: `1.5px solid ${sec.color}33`, borderRadius: 14, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: sec.color }}>{right}<span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>/{sec.total}</span></div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: sec.color, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0.2rem 0 0.5rem' }}>{sec.label}</div>
              <div style={{ height: 4, background: 'var(--line-soft)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pctS}%`, background: sec.color, borderRadius: 2 }} />
              </div>
            </div>
          );
        })}
      </div>

      {allUnknown.length > 0 && (
        <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 0.75rem', fontSize: '0.72rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>
            {t.vocabList(allUnknown.length)}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {allUnknown.map(w => (
              <span key={w} style={{ fontSize: '0.8rem', padding: '0.2rem 0.7rem', borderRadius: 20, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#d97706', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                {w}{historia.dict[w] ? <span style={{ color: 'var(--muted)', fontWeight: 400 }}> → {historia.dict[w]}</span> : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line-soft)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>{t.discussionPrompt}</p>
        <p style={{ margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.5 }}>{historia.discussion.question}</p>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>{historia.discussion.note}</p>
      </div>

      <div style={{ background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.15)', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
        <p style={{ margin: '0 0 0.85rem', fontSize: '0.72rem', fontWeight: 800, color: '#0f3d8c', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>{t.keyLanguage}</p>
        {historia.keyLanguage.map(item => (
          <div key={item.phrase} style={{ display: 'flex', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid rgba(15,61,140,0.1)', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f3d8c', fontFamily: 'var(--mono)', flexShrink: 0, minWidth: 160 }}>{item.phrase}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{item.meaning}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => {
            setPhase('intro'); setScores({});
            setNarratorUnknown(new Set());
            setVoiceState(Object.fromEntries(voices.map(v => [v.key, emptyVoiceState()])));
          }}
          className="btn" style={{ fontSize: '0.9rem' }}>
          {t.tryAgain}
        </button>
        <Link href={hubHref} className="btn btn-ghost" style={{ fontSize: '0.9rem' }}>{t.backToSection}</Link>
      </div>
    </div>
  );
}
