'use client';

import { useEffect, useMemo, useState } from 'react';
import { KR_AUDIO_002 } from '@/lib/storage';
import { useSound } from '@/components/lesson/engine/useSound';
import StreakBar from '@/components/lesson/engine/StreakBar';

// ─── Vocab pool ───────────────────────────────────────────────────────────────
// Step001 review (4) + Step002 new (6) = 10 items
interface VocabEntry {
  id: string;
  hangul: string;
  romanization: string;
  translation: string;
  audio: string;          // key in KR_AUDIO_002
  isNew?: boolean;
  distractors_es: string[];
  distractors_kr: string[];
}

const VOCAB: VocabEntry[] = [
  // ── repaso step001 ─────────────────────────────────────────────────────────
  {
    id: 'R1', hangul: '학교', romanization: 'hak-gyo', translation: 'escuela',
    audio: '학교',
    distractors_es: ['casa', 'ayer', 'un poco'],
    distractors_kr: ['집', '어제', '조금'],
  },
  {
    id: 'R2', hangul: '집', romanization: 'jip', translation: 'casa',
    audio: '집',
    distractors_es: ['escuela', 'hoy', 'tú'],
    distractors_kr: ['학교', '오늘', '너'],
  },
  {
    id: 'R3', hangul: '가요', romanization: 'ga-yo', translation: 'voy / vas / va',
    audio: '가요',
    distractors_es: ['se ve', 'ayer', 'yo (formal)'],
    distractors_kr: ['보여요', '어제', '저는'],
  },
  {
    id: 'R4', hangul: '저는', romanization: 'jeo-neun', translation: 'yo (formal)',
    audio: '저는',
    distractors_es: ['yo (informal)', 'ahora', 'letras'],
    distractors_kr: ['나', '이제', '글자'],
  },
  // ── nuevo step002 ──────────────────────────────────────────────────────────
  {
    id: 'N1', hangul: '어제', romanization: 'eo-je', translation: 'ayer',
    audio: '어제', isNew: true,
    distractors_es: ['hoy', 'ahora', 'casa'],
    distractors_kr: ['오늘', '이제', '집'],
  },
  {
    id: 'N2', hangul: '오늘', romanization: 'o-neul', translation: 'hoy',
    audio: '오늘', isNew: true,
    distractors_es: ['ayer', 'un poco', 'escuela'],
    distractors_kr: ['어제', '조금', '학교'],
  },
  {
    id: 'N3', hangul: '이제', romanization: 'i-je', translation: 'ahora / ya',
    audio: '이제', isNew: true,
    distractors_es: ['ayer', 'letras', 'se ve'],
    distractors_kr: ['어제', '글자', '보여요'],
  },
  {
    id: 'N4', hangul: '글자', romanization: 'geul-ja', translation: 'letras / caracteres',
    audio: '글자', isNew: true,
    distractors_es: ['ahora', 'un poco', 'casa'],
    distractors_kr: ['이제', '조금', '집'],
  },
  {
    id: 'N5', hangul: '조금', romanization: 'jo-geum', translation: 'un poco',
    audio: '조금', isNew: true,
    distractors_es: ['letras', 'hoy', 'voy / vas'],
    distractors_kr: ['글자', '오늘', '가요'],
  },
  {
    id: 'N6', hangul: '보여요', romanization: 'bo-yeo-yo', translation: 'se ve / puedo ver',
    audio: '보여요', isNew: true,
    distractors_es: ['ahora', 'yo (informal)', 'ayer'],
    distractors_kr: ['이제', '나', '어제'],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function playWord(audio: string, rate = 1) {
  const src = KR_AUDIO_002[audio];
  if (src) { const a = new Audio(src); a.playbackRate = rate; a.play().catch(() => tts(audio, rate)); return; }
  tts(audio, rate);
}
function tts(text: string, rate = 1) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text); u.lang = 'ko-KR'; u.rate = rate;
  window.speechSynthesis.speak(u);
}

// ─── Level config ─────────────────────────────────────────────────────────────
// L1: Ves Hangul + oyes → elige traducción en español
// L2: Ves Hangul + oyes → elige romanización
// L3: Solo oyes (sin pistas visuales de audio) → elige Hangul
// L4: Ves Hangul → elige traducción (puro reconocimiento visual)
const LEVEL_LABELS = [
  '', // 0 unused
  'Hangul + audio → español',
  'Hangul + audio → romanización',
  'Solo audio → Hangul',
  'Hangul → español',
];

interface Props { onComplete?: () => void; }

export default function Recognition002({ onComplete }: Props) {
  const [level, setLevel]               = useState(1);
  const [idx, setIdx]                   = useState(0);
  const [selected, setSelected]         = useState<string | null>(null);
  const [checked, setChecked]           = useState(false);
  const [levelDone, setLevelDone]       = useState(false);
  const [scores, setScores]             = useState({ L1: 0, L2: 0, L3: 0, L4: 0 });
  const [allDone, setAllDone]           = useState(false);
  const [streak, setStreak]             = useState(0);
  const { correct: playCorrect, wrong: playWrong, complete: playComplete } = useSound();

  const vocab = VOCAB[idx] as VocabEntry | undefined;
  const lk    = `L${level}` as keyof typeof scores;
  const score = scores[lk];

  const options = useMemo(() => {
    if (!vocab) return [];
    if (level === 1 || level === 4) {
      return shuffle([vocab.translation, ...vocab.distractors_es]).map(v => ({ value: v, label: v }));
    }
    if (level === 2) {
      // romanization options — build from sibling romanizations as distractors
      const distractors = VOCAB.filter(v => v.id !== vocab.id).map(v => v.romanization).slice(0, 3);
      return shuffle([vocab.romanization, ...distractors]).map(v => ({ value: v, label: v }));
    }
    // level 3: Hangul options
    return shuffle([vocab.hangul, ...vocab.distractors_kr]).map(v => ({ value: v, label: v }));
  }, [level, vocab]);

  const correct = useMemo(() => {
    if (!vocab) return '';
    if (level === 1 || level === 4) return vocab.translation;
    if (level === 2) return vocab.romanization;
    return vocab.hangul;
  }, [level, vocab]);

  // Auto-play audio
  useEffect(() => {
    setSelected(null); setChecked(false);
    if (!vocab) return;
    if (level === 1 || level === 2 || level === 3) {
      const t = window.setTimeout(() => playWord(vocab.audio, level === 3 ? 0.85 : 1), 500);
      return () => window.clearTimeout(t);
    }
  }, [level, idx, vocab]);

  function verify() {
    if (!selected || checked || !vocab) return;
    setChecked(true);
    if (selected === correct) {
      playCorrect();
      setStreak(s => s + 1);
      setScores(p => ({ ...p, [lk]: p[lk] + 1 }));
    } else {
      playWrong();
      setStreak(0);
    }
  }

  function next() {
    if (!checked) return;
    if (idx < VOCAB.length - 1) { setIdx(i => i + 1); return; }
    setLevelDone(true);
  }

  function advanceLevel() {
    if (level >= 4) { playComplete(); setAllDone(true); setLevelDone(false); onComplete?.(); return; }
    setLevel(l => l + 1);
    setIdx(0); setSelected(null); setChecked(false); setLevelDone(false);
  }

  function repeatLevel() {
    setScores(p => ({ ...p, [lk]: 0 }));
    setIdx(0); setSelected(null); setChecked(false); setLevelDone(false);
  }

  // ── Level summary ──────────────────────────────────────────────────────────
  if (levelDone) {
    const passed = score >= Math.ceil(VOCAB.length * 0.7); // 70%
    if (level === 4) {
      return (
        <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🎯</div>
          <h3 style={{ margin: '0 0 8px', fontSize: 22, color: 'var(--ink)' }}>¡Reconocimiento completado!</h3>
          <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
            Reconociste {VOCAB.length} palabras en 4 modos distintos. El cerebro ya las tiene mapeadas.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 20 }}>
            {VOCAB.map(v => (
              <span key={v.id} style={{ fontSize: 14, padding: '4px 12px', borderRadius: 100, background: v.isNew ? 'rgba(52,211,153,0.1)' : 'rgba(108,99,255,0.08)', border: `1px solid ${v.isNew ? 'rgba(52,211,153,0.25)' : 'rgba(108,99,255,0.2)'}`, color: v.isNew ? '#059669' : '#6c63ff' }}>
                {v.hangul}
              </span>
            ))}
          </div>
          <button type="button" onClick={() => { playComplete(); setAllDone(true); onComplete?.(); }} style={{ width: '100%', background: '#2d9b4e', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            ✅ Continuar →
          </button>
        </section>
      );
    }
    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
        <p style={{ margin: '0 0 4px', fontSize: 48, fontWeight: 700, color: '#6c63ff' }}>{score}/{VOCAB.length}</p>
        <p style={{ margin: '0 0 20px', fontSize: 14, color: 'var(--muted)' }}>{passed ? '¡Bien! Sigue al siguiente modo.' : 'Un poco más de práctica.'}</p>
        {passed
          ? <button type="button" onClick={advanceLevel} style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Siguiente modo →</button>
          : <>
              <button type="button" onClick={repeatLevel} style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 8 }}>Repetir este modo</button>
              <button type="button" onClick={advanceLevel} style={{ background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: 12, textDecoration: 'underline', cursor: 'pointer' }}>Continuar de todas formas →</button>
            </>
        }
      </section>
    );
  }

  if (!vocab) return null;

  // ── Active exercise ────────────────────────────────────────────────────────
  return (
    <section style={{ maxWidth: 520, margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Level indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        {[1,2,3,4].map(l => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, background: l < level ? '#2d9b4e' : l === level ? '#6c63ff' : 'var(--line-soft)', color: l <= level ? '#fff' : 'var(--muted)' }}>{l}</span>
            {l < 4 && <span style={{ width: 20, height: 2, background: l < level ? '#2d9b4e' : 'var(--line-soft)', borderRadius: 1 }} />}
          </div>
        ))}
        <span style={{ marginLeft: 4, fontSize: 11, color: 'var(--muted)' }}>{LEVEL_LABELS[level]}</span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: 'var(--line-soft)', borderRadius: 2, marginBottom: 16 }}>
        <div style={{ height: '100%', background: '#6c63ff', borderRadius: 2, width: `${(idx / VOCAB.length) * 100}%`, transition: 'width 0.3s' }} />
      </div>

      {/* Word counter + streak + new badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{idx + 1} / {VOCAB.length}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <StreakBar streak={streak} />
          {vocab.isNew && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 100, background: 'rgba(52,211,153,0.1)', color: '#059669', fontWeight: 600 }}>Nueva</span>}
        </div>
      </div>

      {/* Card — typography-only, no images */}
      <article style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 16, padding: '32px 24px 24px', marginBottom: 16, textAlign: 'center' }}>
        {/* Large Hangul character — always visible */}
        <p style={{ margin: '0 0 6px', fontSize: 64, fontWeight: 800, lineHeight: 1, color: '#6c63ff', fontFamily: "'Noto Sans KR', sans-serif" }}>
          {vocab.hangul}
        </p>

        {/* Level 1 & 2: romanization hint + audio button */}
        {(level === 1 || level === 2) && (
          <div style={{ marginBottom: 20 }}>
            <p style={{ margin: '0 0 14px', fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--muted)' }}>{vocab.romanization}</p>
            <button type="button" onClick={() => playWord(vocab.audio)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', border: '1px solid var(--line-soft)', borderRadius: 100, padding: '6px 16px', color: 'var(--muted)', fontSize: 12, cursor: 'pointer' }}>
              Escuchar
            </button>
          </div>
        )}

        {/* Level 3: audio cue only (Hangul shown, no romanization) */}
        {level === 3 && (
          <div style={{ marginBottom: 20 }}>
            <p style={{ margin: '0 0 12px', fontSize: 12, color: 'var(--muted)' }}>Identifica el carácter que escuchas</p>
            <button type="button" onClick={() => playWord(vocab.audio, 0.85)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 100, padding: '10px 20px', color: '#6c63ff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              Escuchar de nuevo
            </button>
          </div>
        )}

        {/* Level 4: romanization hint, no audio */}
        {level === 4 && (
          <p style={{ margin: '0 0 20px', fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--muted)' }}>{vocab.romanization}</p>
        )}

        {/* Question prompt */}
        <p style={{ margin: '0 0 16px', fontSize: 12, color: 'var(--muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          {level === 1 ? '¿Qué significa?' : level === 2 ? '¿Cuál es la romanización?' : level === 3 ? '¿Cuál Hangul escuchas?' : '¿Qué significa?'}
        </p>

        {/* Options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {options.map(opt => {
            const isSel = selected === opt.value;
            const isCorr = opt.value === correct;
            let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', color = 'var(--ink)';
            if (!checked && isSel) { bg = 'rgba(108,99,255,0.06)'; border = '1.5px solid #6c63ff'; }
            if (checked && isCorr) { bg = 'rgba(45,155,78,0.06)'; border = '1.5px solid #2d9b4e'; color = '#2d9b4e'; }
            if (checked && isSel && !isCorr) { bg = 'rgba(220,53,69,0.05)'; border = '1.5px solid #dc3545'; color = '#dc3545'; }
            const isKr = level === 3;
            return (
              <button key={opt.value} type="button" onClick={() => !checked && setSelected(opt.value)} style={{ padding: '12px 14px', background: bg, border, borderRadius: 10, fontSize: isKr ? 18 : 13, textAlign: 'center', cursor: checked ? 'default' : 'pointer', color, fontFamily: isKr ? "'Noto Sans KR', sans-serif" : 'inherit', transition: 'all 0.12s' }}>
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {checked && (
          <div style={{ marginTop: 12, padding: '9px 12px', borderRadius: 8, fontSize: 12, lineHeight: 1.6, background: selected === correct ? 'rgba(45,155,78,0.06)' : 'rgba(220,53,69,0.05)', border: `1px solid ${selected === correct ? 'rgba(45,155,78,0.2)' : 'rgba(220,53,69,0.15)'}`, color: selected === correct ? '#2d9b4e' : '#dc3545', textAlign: 'left' }}>
            {selected === correct
              ? `Correcto — ${vocab.hangul} = ${vocab.translation}`
              : `Era: ${correct}${level === 1 || level === 4 ? ` (${vocab.hangul})` : ''}`}
          </div>
        )}
      </article>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 10 }}>
        {!checked
          ? <button type="button" onClick={verify} disabled={!selected} style={{ flex: 1, padding: '12px', background: selected ? '#6c63ff' : 'var(--line-soft)', color: selected ? '#fff' : 'var(--muted)', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: selected ? 'pointer' : 'default' }}>Verificar</button>
          : <button type="button" onClick={next} style={{ flex: 1, padding: '12px', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              {idx < VOCAB.length - 1 ? 'Siguiente →' : 'Ver resultados →'}
            </button>
        }
      </div>
    </section>
  );
}
