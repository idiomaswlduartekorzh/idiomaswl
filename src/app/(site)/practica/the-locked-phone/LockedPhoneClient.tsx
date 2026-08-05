'use client';

import { useState, useRef, type Dispatch, type SetStateAction } from 'react';
import Link from 'next/link';
import {
  DICT,
  NARRATOR_PARAGRAPHS,
  GF_PARAGRAPHS,
  BF_PARAGRAPHS,
  NARRATOR_QS,
  GF_QS,
  BF_QS,
  FINAL_QS,
  ALL_SECTIONS,
  KEY_LANGUAGE,
  TOTAL_QUESTIONS,
  type Question,
} from './locked-phone-data';

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase =
  | 'intro'
  | 'narrator' | 'narrator-quiz'
  | 'gf-listen' | 'gf-write1' | 'gf-transcript' | 'gf-write2' | 'gf-compare' | 'gf-quiz'
  | 'bf-listen' | 'bf-write1' | 'bf-transcript' | 'bf-write2' | 'bf-compare' | 'bf-quiz'
  | 'final-quiz' | 'results';

const AUDIO_GF = '/audio/locked-phone/girlfriend.mp3';
const AUDIO_BF = '/audio/locked-phone/boyfriend.mp3';

// ─── AudioPlayer ──────────────────────────────────────────────────────────────

function AudioPlayer({ src, label, color, onEnded }: { src: string; label: string; color: string; onEnded?: () => void }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);

  function toggle() {
    if (!ref.current || failed) return;
    if (playing) { ref.current.pause(); setPlaying(false); }
    else { ref.current.play().catch(() => setFailed(true)); setPlaying(true); }
  }

  function fmt(s: number) {
    return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
  }

  return (
    <div style={{ background: `${color}0d`, border: `1.5px solid ${color}33`, borderRadius: 16, padding: '1.25rem 1.5rem' }}>
      <audio ref={ref} src={src}
        onTimeUpdate={() => setProgress(ref.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(ref.current?.duration ?? 0)}
        onError={() => { setFailed(true); setPlaying(false); }}
        onEnded={() => { setPlaying(false); setProgress(0); onEnded?.(); }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={toggle} aria-label={playing ? 'Pausar audio' : 'Reproducir audio'}
          style={{ width: 48, height: 48, borderRadius: '50%', background: failed ? 'var(--line-soft)' : color, border: 'none', cursor: failed ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#fff', flexShrink: 0, boxShadow: failed ? 'none' : `0 4px 16px ${color}44` }}>
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
      {failed && (
        <p style={{ margin: '0.75rem 0 0', fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.5 }}>
          ⚠️ El audio aún no está disponible. Puedes continuar con el ejercicio y leer la transcripción en el siguiente paso.
        </p>
      )}
    </div>
  );
}

// ─── ClickableText ────────────────────────────────────────────────────────────

function ClickableText({ paragraphs, unknown, onToggle }: {
  paragraphs: string[];
  unknown: Set<string>;
  onToggle: (w: string) => void;
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
                const clean = tok.replace(/[^a-zA-Z]/g, '').toLowerCase();
                if (!clean) return <span key={ti}>{tok}</span>;
                const pre  = tok.match(/^[^a-zA-Z]*/)?.[0] ?? '';
                const post = tok.match(/[^a-zA-Z]*$/)?.[0] ?? '';
                const word = tok.slice(pre.length, tok.length - post.length);
                const isUnknown = unknown.has(clean);
                const hasDict   = !!DICT[clean];
                return (
                  <span key={ti}>
                    {pre}
                    <span
                      onClick={() => { onToggle(clean); setLastWord(clean); }}
                      title={hasDict ? DICT[clean] : undefined}
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

      {/* Translation bar */}
      <div style={{ marginTop: '0.6rem', padding: '0.55rem 1rem', borderRadius: 10, background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', fontSize: '0.82rem', minHeight: 36, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {lastWord ? (
          <>
            <span style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: '#d97706' }}>{lastWord}</span>
            <span style={{ color: 'var(--muted)' }}>→</span>
            <span style={{ color: 'var(--ink)' }}>{DICT[lastWord] ?? '(no translation — add to your vocabulary list)'}</span>
          </>
        ) : (
          <span style={{ color: 'var(--muted)' }}>👆 Click any word to see its translation · Click again to mark as unknown</span>
        )}
      </div>
      {unknown.size > 0 && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
          {unknown.size} word{unknown.size > 1 ? 's' : ''} marked: {Array.from(unknown).join(', ')}
        </div>
      )}
    </div>
  );
}

// ─── WriteBox ─────────────────────────────────────────────────────────────────

function WriteBox({ prompt, value, onChange, onSubmit, submitLabel = 'Submit →', color = '#0f3d8c', hint }: {
  prompt: string; value: string; onChange: (v: string) => void; onSubmit: () => void;
  submitLabel?: string; color?: string; hint?: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.55 }}>{prompt}</p>
      {hint && <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5 }}>{hint}</p>}
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Write here… (English or Spanish, both are fine)"
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

function CompareView({ write1, write2, unknown, color, onContinue }: {
  write1: string; write2: string; unknown: Set<string>; color: string; onContinue: () => void;
}) {
  const list = Array.from(unknown);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${color}22`, borderRadius: 16, padding: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <div>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.66rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>
            🎧 Sin transcripción
          </p>
          <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.65, color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>{write1}</p>
        </div>
        <div style={{ borderLeft: `1.5px solid ${color}22`, paddingLeft: '1rem' }}>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.66rem', fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>
            📄 Con transcripción
          </p>
          <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.65, color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>{write2}</p>
        </div>
      </div>

      {list.length > 0 && (
        <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 12, padding: '1rem 1.25rem' }}>
          <p style={{ margin: '0 0 0.65rem', fontSize: '0.66rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>
            Palabras que marcaste como desconocidas ({list.length})
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {list.map(w => (
              <span key={w} style={{ fontSize: '0.8rem', padding: '0.2rem 0.7rem', borderRadius: 20, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#d97706', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                {w}{DICT[w] ? <span style={{ color: 'var(--muted)', fontWeight: 400 }}> → {DICT[w]}</span> : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      <button onClick={onContinue} className="btn" style={{ fontSize: '0.95rem', padding: '0.9rem 1.75rem' }}>
        Continue to questions →
      </button>
    </div>
  );
}

// ─── QuizBlock ────────────────────────────────────────────────────────────────

const SECTION_COLORS: Record<string, string> = { narrator: '#6b7280', gf: '#be185d', bf: '#0f766e', final: '#059669' };

function QuizBlock({ questions, sectionKey, onComplete }: {
  questions: Question[]; sectionKey: string; onComplete: (s: boolean[]) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);

  const q = questions[idx];
  const answered = chosen !== null;
  const color = SECTION_COLORS[sectionKey] ?? '#0f3d8c';

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
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
              <strong style={{ color: chosen === q.correct ? '#059669' : '#dc2626' }}>{chosen === q.correct ? '✅ Correct' : '❌ Not quite'}</strong>
              {' — '}{q.explanation}
            </p>
          </div>
        )}
      </div>

      {answered && (
        <button onClick={next} className="btn" style={{ fontSize: '0.95rem', padding: '0.9rem' }}>
          {idx + 1 < questions.length ? 'Next question →' : 'Continue →'}
        </button>
      )}
    </div>
  );
}

// ─── Section header helper ────────────────────────────────────────────────────

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

// ─── Main component ───────────────────────────────────────────────────────────

export default function LockedPhoneClient() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [scores, setScores] = useState<Record<string, boolean[]>>({});

  // Narrator unknown words
  const [narratorUnknown, setNarratorUnknown] = useState<Set<string>>(new Set());

  // Girlfriend state
  const [gfWrite1, setGfWrite1] = useState('');
  const [gfWrite2, setGfWrite2] = useState('');
  const [gfUnknown, setGfUnknown] = useState<Set<string>>(new Set());

  // Boyfriend state
  const [bfWrite1, setBfWrite1] = useState('');
  const [bfWrite2, setBfWrite2] = useState('');
  const [bfUnknown, setBfUnknown] = useState<Set<string>>(new Set());

  function saveScore(key: string, s: boolean[]) { setScores(prev => ({ ...prev, [key]: s })); }

  function toggleUnknown(setter: Dispatch<SetStateAction<Set<string>>>, word: string) {
    setter(prev => {
      const next = new Set(prev);
      if (next.has(word)) next.delete(word); else next.add(word);
      return next;
    });
  }

  const allScores  = Object.values(scores).flat();
  const totalRight = allScores.filter(Boolean).length;
  const totalQs    = NARRATOR_QS.length + GF_QS.length + BF_QS.length + FINAL_QS.length;
  const pct        = totalQs > 0 ? Math.round((totalRight / totalQs) * 100) : 0;
  const band       = pct >= 90 ? 'C1 · Advanced' : pct >= 75 ? 'B2 · Upper-Intermediate' : pct >= 55 ? 'B1 · Intermediate' : 'A2–B1 · Keep Practising';
  const bandColor  = pct >= 90 ? '#059669' : pct >= 75 ? '#0f3d8c' : pct >= 55 ? '#d97706' : '#dc2626';

  const C = SECTION_COLORS;

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (phase === 'intro') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <Link href="/practica" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--muted)', textDecoration: 'none', marginBottom: '1.75rem' }}>← Práctica</Link>
      <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />🇬🇧 English Comprehension · B1–B2</p>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.5rem', lineHeight: 1.1 }}>The Locked Phone</h1>
      <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem', lineHeight: 1.65 }}>
        She asked to see his phone. He said no. Nobody read a single message — and they haven&apos;t spoken since. Read the narrator&apos;s account, listen to both voice notes, and answer {TOTAL_QUESTIONS} comprehension questions on vocabulary, inference, tone and critical thinking.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
        {[
          { icon: '📖', label: 'Reading', desc: 'Narrator text' },
          { icon: '🎙', label: 'Listening', desc: '2 voice notes' },
          { icon: '🔤', label: 'Vocabulary', desc: 'In-context meaning' },
          { icon: '🔍', label: 'Inference', desc: 'Read between the lines' },
          { icon: '🎭', label: 'Tone & register', desc: 'Sarcasm, scare quotes' },
          { icon: '🧠', label: 'Critical thinking', desc: 'Two versions, one night' },
        ].map(item => (
          <div key={item.label} style={{ background: 'var(--bg-1)', border: '1px solid var(--line-soft)', borderRadius: 14, padding: '1rem' }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>{item.icon}</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.15rem' }}>{item.label}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line-soft)', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>Structure</p>
        {[
          { n: '01', label: 'Read the narrator', sub: `${NARRATOR_QS.length} questions · click words to look up`, color: C.narrator },
          { n: '02', label: 'Listen: Jess (girlfriend)', sub: `${GF_QS.length} questions · write → transcript → compare`, color: C.gf },
          { n: '03', label: 'Listen: Tom (boyfriend)', sub: `${BF_QS.length} questions · write → transcript → compare`, color: C.bf },
          { n: '04', label: 'Overall comprehension', sub: `${FINAL_QS.length} questions`, color: C.final },
        ].map(step => (
          <div key={step.n} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.6rem 0', borderBottom: '1px solid var(--line-soft)' }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: `${step.color}18`, border: `1.5px solid ${step.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, color: step.color, fontFamily: 'var(--mono)', flexShrink: 0 }}>{step.n}</span>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>{step.label}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--muted)', marginLeft: '0.5rem' }}>{step.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setPhase('narrator')} className="btn" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>Begin →</button>
    </div>
  );

  // ── NARRATOR ──────────────────────────────────────────────────────────────
  if (phase === 'narrator') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <button onClick={() => setPhase('intro')} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '0.82rem', cursor: 'pointer', marginBottom: '1.5rem', padding: 0 }}>← Back</button>
      <SectionHeader n="01" part="Part 1 of 4 · Reading" title="Narrator" color={C.narrator} />

      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${C.narrator}33`, borderRadius: 20, padding: '2rem', marginBottom: '1rem' }}>
        <p style={{ margin: '0 0 1rem', fontSize: '0.68rem', fontWeight: 800, color: C.narrator, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>The Locked Phone</p>
        <ClickableText
          paragraphs={NARRATOR_PARAGRAPHS}
          unknown={narratorUnknown}
          onToggle={w => toggleUnknown(setNarratorUnknown, w)}
        />
      </div>

      <div style={{ background: 'rgba(107,114,128,0.06)', border: '1px solid rgba(107,114,128,0.2)', borderRadius: 12, padding: '0.85rem 1.1rem', marginBottom: '1.5rem', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        💡 <strong style={{ color: 'var(--ink)' }}>Tip:</strong> Notice how little actually happened — nobody read a message, nobody was caught doing anything. The whole argument is built out of small details and the meaning each person gives them. Watch the words the narrator chooses: they are not neutral either.
      </div>

      <button onClick={() => setPhase('narrator-quiz')} className="btn" style={{ fontSize: '0.95rem', padding: '0.9rem 1.75rem' }}>
        I&apos;ve read it — Answer questions →
      </button>
    </div>
  );

  if (phase === 'narrator-quiz') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="01" part="Part 1 · Questions" title="Narrator — Comprehension" color={C.narrator} />
      <QuizBlock questions={NARRATOR_QS} sectionKey="narrator" onComplete={s => { saveScore('narrator', s); setPhase('gf-listen'); }} />
    </div>
  );

  // ── GIRLFRIEND — LISTEN ──────────────────────────────────────────────────
  if (phase === 'gf-listen') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="02" part="Part 2 of 4 · Listening" title="Jess's Voice Note" color={C.gf} />
      <div style={{ background: `${C.gf}07`, border: `1px solid ${C.gf}22`, borderRadius: 12, padding: '0.85rem 1.1rem', marginBottom: '1.25rem', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        🎧 <strong style={{ color: 'var(--ink)' }}>Step 1 of 3:</strong> Listen carefully. There is <strong style={{ color: 'var(--ink)' }}>no transcript yet</strong> — just focus on what you can understand.
      </div>
      <AudioPlayer src={AUDIO_GF} label="Jess — Girlfriend" color={C.gf} />
      <div style={{ height: '1.25rem' }} />
      <button onClick={() => setPhase('gf-write1')} className="btn" style={{ fontSize: '0.95rem', padding: '0.9rem 1.75rem' }}>
        I&apos;ve listened — Write what you understood →
      </button>
    </div>
  );

  // ── GIRLFRIEND — WRITE 1 ─────────────────────────────────────────────────
  if (phase === 'gf-write1') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="02" part="Part 2 · Step 2 of 3" title="What did you understand?" color={C.gf} />
      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${C.gf}22`, borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem' }}>
        <WriteBox
          prompt="Without looking at any transcript, write in your own words what you understood from Jess's voice note."
          hint="Don't worry about being perfect — this is a first impression. Write in English or Spanish."
          value={gfWrite1}
          onChange={setGfWrite1}
          onSubmit={() => setPhase('gf-transcript')}
          submitLabel="Submit — now listen with the transcript →"
          color={C.gf}
        />
      </div>
    </div>
  );

  // ── GIRLFRIEND — TRANSCRIPT ──────────────────────────────────────────────
  if (phase === 'gf-transcript') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="02" part="Part 2 · Step 3 of 3" title="Listen again — with the transcript" color={C.gf} />
      <div style={{ background: `${C.gf}07`, border: `1px solid ${C.gf}22`, borderRadius: 12, padding: '0.85rem 1.1rem', marginBottom: '1.25rem', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        📄 <strong style={{ color: 'var(--ink)' }}>Click words you don&apos;t know</strong> to mark them and see their translation. Then write again what you understood.
      </div>
      <AudioPlayer src={AUDIO_GF} label="Jess — Girlfriend" color={C.gf} />
      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${C.gf}22`, borderRadius: 20, padding: '1.75rem', margin: '1.25rem 0' }}>
        <p style={{ margin: '0 0 1rem', fontSize: '0.72rem', fontWeight: 800, color: C.gf, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Transcript</p>
        <ClickableText
          paragraphs={GF_PARAGRAPHS}
          unknown={gfUnknown}
          onToggle={w => toggleUnknown(setGfUnknown, w)}
        />
      </div>
      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${C.gf}22`, borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem' }}>
        <WriteBox
          prompt="Now write again what you understood — you can be more detailed this time."
          value={gfWrite2}
          onChange={setGfWrite2}
          onSubmit={() => setPhase('gf-compare')}
          submitLabel="Compare my two versions →"
          color={C.gf}
        />
      </div>
    </div>
  );

  // ── GIRLFRIEND — COMPARE ─────────────────────────────────────────────────
  if (phase === 'gf-compare') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="02" part="Part 2 · Comparison" title="See how your understanding evolved" color={C.gf} />
      <CompareView write1={gfWrite1} write2={gfWrite2} unknown={gfUnknown} color={C.gf} onContinue={() => setPhase('gf-quiz')} />
    </div>
  );

  if (phase === 'gf-quiz') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="02" part="Part 2 · Questions" title="Jess — Comprehension" color={C.gf} />
      <QuizBlock questions={GF_QS} sectionKey="gf" onComplete={s => { saveScore('gf', s); setPhase('bf-listen'); }} />
    </div>
  );

  // ── BOYFRIEND — LISTEN ───────────────────────────────────────────────────
  if (phase === 'bf-listen') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="03" part="Part 3 of 4 · Listening" title="Tom's Voice Note" color={C.bf} />
      <div style={{ background: `${C.bf}07`, border: `1px solid ${C.bf}22`, borderRadius: 12, padding: '0.85rem 1.1rem', marginBottom: '1.25rem', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        🎧 <strong style={{ color: 'var(--ink)' }}>Step 1 of 3:</strong> Listen without the transcript first. Tom repeats one detail Jess also mentioned — listen for it. Then write what you understood, and compare with the transcript.
      </div>
      <AudioPlayer src={AUDIO_BF} label="Tom — Boyfriend" color={C.bf} />
      <div style={{ height: '1.25rem' }} />
      <button onClick={() => setPhase('bf-write1')} className="btn" style={{ fontSize: '0.95rem', padding: '0.9rem 1.75rem' }}>
        I&apos;ve listened — Write what you understood →
      </button>
    </div>
  );

  // ── BOYFRIEND — WRITE 1 ──────────────────────────────────────────────────
  if (phase === 'bf-write1') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="03" part="Part 3 · Step 2 of 3" title="What did you understand?" color={C.bf} />
      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${C.bf}22`, borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem' }}>
        <WriteBox
          prompt="Without the transcript, write in your own words what you understood from Tom's voice note."
          hint="This is the other side of the story. What is he saying happened? Write in English or Spanish."
          value={bfWrite1}
          onChange={setBfWrite1}
          onSubmit={() => setPhase('bf-transcript')}
          submitLabel="Submit — now listen with the transcript →"
          color={C.bf}
        />
      </div>
    </div>
  );

  // ── BOYFRIEND — TRANSCRIPT ───────────────────────────────────────────────
  if (phase === 'bf-transcript') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="03" part="Part 3 · Step 3 of 3" title="Listen again — with the transcript" color={C.bf} />
      <div style={{ background: `${C.bf}07`, border: `1px solid ${C.bf}22`, borderRadius: 12, padding: '0.85rem 1.1rem', marginBottom: '1.25rem', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        📄 <strong style={{ color: 'var(--ink)' }}>Click words you don&apos;t know</strong> to mark them. Compare Tom&apos;s account with Jess&apos;s — which details do they both report? Where do they contradict each other?
      </div>
      <AudioPlayer src={AUDIO_BF} label="Tom — Boyfriend" color={C.bf} />
      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${C.bf}22`, borderRadius: 20, padding: '1.75rem', margin: '1.25rem 0' }}>
        <p style={{ margin: '0 0 1rem', fontSize: '0.72rem', fontWeight: 800, color: C.bf, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Transcript</p>
        <ClickableText
          paragraphs={BF_PARAGRAPHS}
          unknown={bfUnknown}
          onToggle={w => toggleUnknown(setBfUnknown, w)}
        />
      </div>
      <div style={{ background: 'var(--bg-1)', border: `1.5px solid ${C.bf}22`, borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem' }}>
        <WriteBox
          prompt="Now write again what you understood from Tom's perspective."
          value={bfWrite2}
          onChange={setBfWrite2}
          onSubmit={() => setPhase('bf-compare')}
          submitLabel="Compare my two versions →"
          color={C.bf}
        />
      </div>
    </div>
  );

  // ── BOYFRIEND — COMPARE ──────────────────────────────────────────────────
  if (phase === 'bf-compare') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="03" part="Part 3 · Comparison" title="See how your understanding evolved" color={C.bf} />
      <CompareView write1={bfWrite1} write2={bfWrite2} unknown={bfUnknown} color={C.bf} onContinue={() => setPhase('bf-quiz')} />
    </div>
  );

  if (phase === 'bf-quiz') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="03" part="Part 3 · Questions" title="Tom — Comprehension" color={C.bf} />
      <QuizBlock questions={BF_QS} sectionKey="bf" onComplete={s => { saveScore('bf', s); setPhase('final-quiz'); }} />
    </div>
  );

  // ── FINAL QUIZ ───────────────────────────────────────────────────────────
  if (phase === 'final-quiz') return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <SectionHeader n="04" part="Part 4 of 4 · Overall" title="Big Picture — Both Perspectives" color={C.final} />
      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Now you know something neither of them knows: you have heard both accounts. These questions ask you to hold them side by side — which details survive in both versions, where each person is right, and where being right is not the same as being fair.
      </p>
      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Pay attention to the words both of them reach for. When two people use the same image to defend opposite positions, that is usually where the real disagreement is hiding.
      </p>
      <QuizBlock questions={FINAL_QS} sectionKey="final" onComplete={s => { saveScore('final', s); setPhase('results'); }} />
    </div>
  );

  // ── RESULTS ──────────────────────────────────────────────────────────────
  const sectionLabels: Record<string, string> = { narrator: 'Narrator', gf: 'Jess', bf: 'Tom', final: 'Overall' };
  const allUnknown = Array.from(new Set([...narratorUnknown, ...gfUnknown, ...bfUnknown]));

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Results</p>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.35rem', letterSpacing: '-0.03em' }}>The Locked Phone</h2>
      <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.75rem' }}>You&apos;ve completed all four sections.</p>

      <div style={{ background: `linear-gradient(135deg, ${bandColor}11 0%, ${bandColor}06 100%)`, border: `2px solid ${bandColor}44`, borderRadius: 20, padding: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3.5rem', fontWeight: 900, color: bandColor, lineHeight: 1 }}>{totalRight}<span style={{ fontSize: '1.5rem', color: 'var(--muted)' }}>/{totalQs}</span></div>
        <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0.35rem 0' }}>Correct answers</div>
        <div style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 800, color: bandColor, background: `${bandColor}15`, border: `1.5px solid ${bandColor}44`, borderRadius: 10, padding: '0.4rem 1.1rem', fontFamily: 'var(--mono)' }}>{band}</div>
        <div style={{ marginTop: '1rem', height: 8, background: 'var(--line-soft)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${bandColor}, ${bandColor}cc)`, borderRadius: 4, transition: 'width 1s ease' }} />
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.35rem', fontFamily: 'var(--mono)' }}>{pct}%</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {ALL_SECTIONS.map(({ key, questions }) => {
          const s = scores[key] ?? [];
          const right = s.filter(Boolean).length, total = questions.length;
          const pctS = total > 0 ? Math.round((right / total) * 100) : 0;
          const clr = SECTION_COLORS[key];
          return (
            <div key={key} style={{ background: 'var(--bg-1)', border: `1.5px solid ${clr}33`, borderRadius: 14, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: clr }}>{right}<span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>/{total}</span></div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: clr, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0.2rem 0 0.5rem' }}>{sectionLabels[key]}</div>
              <div style={{ height: 4, background: 'var(--line-soft)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pctS}%`, background: clr, borderRadius: 2 }} />
              </div>
            </div>
          );
        })}
      </div>

      {allUnknown.length > 0 && (
        <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 0.75rem', fontSize: '0.72rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>
            Vocabulary list — words you marked across all sections ({allUnknown.length})
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {allUnknown.map(w => (
              <span key={w} style={{ fontSize: '0.8rem', padding: '0.2rem 0.7rem', borderRadius: 20, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#d97706', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                {w}{DICT[w] ? <span style={{ color: 'var(--muted)', fontWeight: 400 }}> → {DICT[w]}</span> : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line-soft)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>Discussion Prompt</p>
        <p style={{ margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.5 }}>Is refusing the same as hiding? And can a request be reasonable and still be unfair?</p>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>
          There is no single correct answer. The skill being tested is <strong style={{ color: 'var(--ink)' }}>defending your position with evidence from the texts</strong> — specific words, phrases and details from each account. That is exactly what B2–C1 English requires.
        </p>
      </div>

      <div style={{ background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.15)', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
        <p style={{ margin: '0 0 0.85rem', fontSize: '0.72rem', fontWeight: 800, color: '#0f3d8c', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>Key Language from this Story</p>
        {KEY_LANGUAGE.map(item => (
          <div key={item.phrase} style={{ display: 'flex', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid rgba(15,61,140,0.1)', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f3d8c', fontFamily: 'var(--mono)', flexShrink: 0, minWidth: 160 }}>{item.phrase}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{item.meaning}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={() => { setPhase('intro'); setScores({}); setNarratorUnknown(new Set()); setGfWrite1(''); setGfWrite2(''); setGfUnknown(new Set()); setBfWrite1(''); setBfWrite2(''); setBfUnknown(new Set()); }} className="btn" style={{ fontSize: '0.9rem' }}>
          Try again →
        </button>
        <Link href="/practica/the-grandmothers-ledger" className="btn btn-ghost" style={{ fontSize: '0.9rem' }}>Next story: The Grandmother&apos;s Ledger →</Link>
        <Link href="/practica" className="btn btn-ghost" style={{ fontSize: '0.9rem' }}>← Back to Practice</Link>
      </div>
    </div>
  );
}
