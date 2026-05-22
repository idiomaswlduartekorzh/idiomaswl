'use client';

import { useState, CSSProperties } from 'react';
import { playAudio } from '@/lib/storage';

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

type Phase = 'intro' | 'pattern1' | 'pattern2' | 'compare';

const BLUE   = '#3b82f6';
const PURPLE = '#8b5cf6';
const ACCENT = '#6c63ff';

/* ─── Data ───────────────────────────────────────────────────────────────── */
const INTRO_CHIPS = [
  { ko: '이 대학교에서 공부해요', audio: '이 대학교에서 공부해요', color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.35)', highlight: '에서' },
  { ko: '카페에서 일해요',       audio: '카페에서 일해요',        color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.35)', highlight: '에서' },
  { ko: '매일 카페에 가요',      audio: '매일 카페에 가요',       color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.35)',  highlight: '에' },
  { ko: '한국 좋아해요',         audio: '한국 좋아해요',          color: '#ec4899', bg: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.35)', highlight: '' },
];

const P1_CARDS = [
  { ko: '이 대학교에서 공부해요', suffix: '에서', es: 'Estudio en esta universidad', audio: '이 대학교에서 공부해요' },
  { ko: '카페에서 일해요',       suffix: '에서', es: 'Trabajo en el café',           audio: '카페에서 일해요' },
  { ko: '집에서 쉬어요',         suffix: '에서', es: 'Descanso en casa',             audio: '집에서 쉬어요' },
];

const P2_CARDS = [
  { ko: '매일 카페에 가요', suffix: '에', es: 'Voy al café todos los días', audio: '매일 카페에 가요' },
  { ko: '대학교에 가요',   suffix: '에', es: 'Voy a la universidad',        audio: '대학교에 가요' },
  { ko: '집에 와요',       suffix: '에', es: 'Vengo a casa',                audio: '집에 와요' },
];

interface SortExercise {
  ko: string;
  audio: string;
  answer: 'eseo' | 'e';
  explanation: string;
}

const SORT_EXERCISES: SortExercise[] = [
  { ko: '도서관에서 공부해요', audio: '도서관에서 공부해요', answer: 'eseo', explanation: '공부해요 es una acción — ocurre EN la biblioteca → 에서.' },
  { ko: '학교에 가요',         audio: '학교에 가요',         answer: 'e',    explanation: '가요 es movimiento hacia un destino → 에.' },
  { ko: '카페에서 커피 마셔요', audio: '카페에서 커피 마셔요', answer: 'eseo', explanation: '마셔요 es una acción que ocurre EN el café → 에서.' },
  { ko: '집에 와요',           audio: '집에 와요',           answer: 'e',    explanation: '와요 es movimiento — volver a casa como destino → 에.' },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function splitSuffix(full: string, suffix: string): [string, string, string] {
  const idx = full.indexOf(suffix);
  if (idx === -1) return [full, '', ''];
  return [full.slice(0, idx), suffix, full.slice(idx + suffix.length)];
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function GuidedDiscovery007({ onComplete }: Props) {
  const [phase,       setPhase]       = useState<Phase>('intro');
  const [sortIdx,     setSortIdx]     = useState(0);
  const [sortPicked,  setSortPicked]  = useState<string | null>(null);
  const [streak,      setStreak]      = useState(0);
  const [sortCorrect, setSortCorrect] = useState(0);

  const base: CSSProperties = {
    fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif',
    color: 'var(--foreground)',
  };

  const currentSort = SORT_EXERCISES[sortIdx];

  function handleSort(choice: 'eseo' | 'e') {
    if (sortPicked) return;
    setSortPicked(choice);
    if (choice === currentSort.answer) {
      setStreak(s => s + 1);
      setSortCorrect(s => s + 1);
    } else {
      setStreak(0);
    }
  }

  function nextSort() {
    setSortPicked(null);
    if (sortIdx === SORT_EXERCISES.length - 1) {
      onComplete?.();
    } else {
      setSortIdx(i => i + 1);
    }
  }

  /* ── INTRO ──────────────────────────────────────────────────────────────── */
  if (phase === 'intro') {
    return (
      <div style={{ ...base, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <style>{`
          @keyframes gd5-in  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
          @keyframes gd5-pop { from{opacity:0;transform:scale(0.88) translateY(16px)} to{opacity:1;transform:none} }
        `}</style>

        <div style={{ animation: 'gd5-in 0.4s ease both' }}>
          <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT }}>
            Descubrimiento guiado
          </p>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--foreground)' }}>
            Viste estas frases en las escenas
          </h2>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
            ¿Notas algo diferente entre estas frases? Hay un patrón que se repite...
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, animation: 'gd5-in 0.4s 0.1s ease both' }}>
          {INTRO_CHIPS.map((chip, i) => {
            const parts = chip.highlight
              ? chip.ko.split(chip.highlight)
              : [chip.ko];
            return (
              <button
                key={i}
                type="button"
                onClick={() => playAudio(chip.audio)}
                style={{
                  padding: '11px 18px', borderRadius: 100, cursor: 'pointer',
                  background: chip.bg, border: `1.5px solid ${chip.border}`,
                  fontSize: 15, fontWeight: 700, color: chip.color,
                  fontFamily: '"Noto Sans KR",sans-serif',
                  transition: 'all 0.18s ease',
                  animation: `gd5-in 0.45s ${0.05 * i}s ease both`,
                  boxShadow: `0 2px 12px ${chip.bg}`,
                  display: 'inline-flex', alignItems: 'center', gap: 0,
                }}
              >
                {chip.highlight ? (
                  <>
                    <span style={{ color: 'var(--foreground)' }}>{parts[0]}</span>
                    <span style={{ color: chip.color, fontWeight: 900, textDecoration: 'underline', textDecorationColor: chip.color }}>{chip.highlight}</span>
                    <span style={{ color: 'var(--foreground)' }}>{parts[1]}</span>
                  </>
                ) : chip.ko}
                <span style={{ marginLeft: 6, fontSize: 11 }}>🔊</span>
              </button>
            );
          })}
        </div>

        <div style={{
          padding: '14px 16px', borderRadius: 14,
          background: `rgba(108,99,255,0.07)`, border: `1px solid rgba(108,99,255,0.2)`,
          animation: 'gd5-in 0.4s 0.15s ease both',
        }}>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--foreground)', lineHeight: 1.65 }}>
            💜 <strong>No hay nada que memorizar.</strong> Solo observa las partículas y deja que el contraste aparezca solo.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPhase('pattern1')}
          style={{
            padding: '14px', borderRadius: 14, cursor: 'pointer', width: '100%',
            background: `rgba(108,99,255,0.12)`, border: `1px solid rgba(108,99,255,0.35)`,
            fontSize: 14, fontWeight: 800, color: ACCENT,
            animation: 'gd5-in 0.4s 0.2s ease both',
          }}
        >
          Descubrir los grupos →
        </button>
      </div>
    );
  }

  /* ── PATTERN 1 (에서) ────────────────────────────────────────────────────── */
  if (phase === 'pattern1') {
    return (
      <div style={{ ...base, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <style>{`
          @keyframes gd5-in  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        `}</style>

        <div style={{ animation: 'gd5-in 0.4s ease both' }}>
          <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: PURPLE }}>
            Grupo 1
          </p>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--foreground)' }}>
            에서 ★ — donde vive la acción
          </h2>
        </div>

        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, animation: 'gd5-in 0.4s 0.1s ease both' }}>
          {P1_CARDS.map((c, i) => {
            const [before, suf, after] = splitSuffix(c.ko, c.suffix);
            return (
              <div key={i} style={{
                flexShrink: 0, width: 190,
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 16, padding: '16px 14px',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)', lineHeight: 1.35 }}>
                  {before}
                  <span style={{ color: PURPLE, background: `rgba(139,92,246,0.15)`, padding: '0 3px', borderRadius: 5 }}>
                    {suf}
                  </span>
                  {after}
                </p>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>{c.es}</p>
                <button
                  type="button"
                  onClick={() => playAudio(c.audio)}
                  style={{ alignSelf: 'flex-start', padding: '5px 12px', borderRadius: 100, cursor: 'pointer', background: `rgba(139,92,246,0.1)`, border: `1px solid rgba(139,92,246,0.3)`, fontSize: 11, fontWeight: 600, color: PURPLE, display: 'flex', alignItems: 'center', gap: 5 }}
                >
                  🔊 Escuchar
                </button>
              </div>
            );
          })}
        </div>

        <div style={{ padding: '16px 18px', borderRadius: 16, background: `rgba(139,92,246,0.08)`, border: `1.5px solid rgba(139,92,246,0.3)`, animation: 'gd5-in 0.4s 0.15s ease both' }}>
          <p style={{ margin: '0 0 6px', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: PURPLE }}>
            Patrón extraído
          </p>
          <p style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 900, color: PURPLE, fontFamily: '"Noto Sans KR",sans-serif' }}>
            [lugar] + 에서 + [acción]
          </p>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--foreground)', lineHeight: 1.6 }}>
            La acción sucede en ese lugar. 에서 = la escena donde el verbo ocurre.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPhase('pattern2')}
          style={{ padding: '14px', borderRadius: 14, cursor: 'pointer', width: '100%', background: `rgba(139,92,246,0.12)`, border: `1px solid rgba(139,92,246,0.35)`, fontSize: 14, fontWeight: 800, color: PURPLE }}
        >
          ¡Lo vi! →
        </button>
      </div>
    );
  }

  /* ── PATTERN 2 (에) ─────────────────────────────────────────────────────── */
  if (phase === 'pattern2') {
    return (
      <div style={{ ...base, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <style>{`
          @keyframes gd5-in  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        `}</style>

        <div style={{ animation: 'gd5-in 0.4s ease both' }}>
          <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: BLUE }}>
            Grupo 2
          </p>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--foreground)' }}>
            에 → — el destino del movimiento
          </h2>
        </div>

        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, animation: 'gd5-in 0.4s 0.1s ease both' }}>
          {P2_CARDS.map((c, i) => {
            const [before, suf, after] = splitSuffix(c.ko, c.suffix);
            return (
              <div key={i} style={{
                flexShrink: 0, width: 190,
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 16, padding: '16px 14px',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)', lineHeight: 1.35 }}>
                  {before}
                  <span style={{ color: BLUE, background: `rgba(59,130,246,0.15)`, padding: '0 3px', borderRadius: 5 }}>
                    {suf}
                  </span>
                  {after}
                </p>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>{c.es}</p>
                <button
                  type="button"
                  onClick={() => playAudio(c.audio)}
                  style={{ alignSelf: 'flex-start', padding: '5px 12px', borderRadius: 100, cursor: 'pointer', background: `rgba(59,130,246,0.1)`, border: `1px solid rgba(59,130,246,0.3)`, fontSize: 11, fontWeight: 600, color: BLUE, display: 'flex', alignItems: 'center', gap: 5 }}
                >
                  🔊 Escuchar
                </button>
              </div>
            );
          })}
        </div>

        <div style={{ padding: '16px 18px', borderRadius: 16, background: `rgba(59,130,246,0.08)`, border: `1.5px solid rgba(59,130,246,0.3)`, animation: 'gd5-in 0.4s 0.15s ease both' }}>
          <p style={{ margin: '0 0 6px', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: BLUE }}>
            Patrón extraído
          </p>
          <p style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 900, color: BLUE, fontFamily: '"Noto Sans KR",sans-serif' }}>
            [lugar] + 에 + 가다/오다
          </p>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--foreground)', lineHeight: 1.6 }}>
            Movimiento hacia ese lugar como destino. 에 = la dirección del movimiento.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPhase('compare')}
          style={{ padding: '14px', borderRadius: 14, cursor: 'pointer', width: '100%', background: `rgba(59,130,246,0.12)`, border: `1px solid rgba(59,130,246,0.35)`, fontSize: 14, fontWeight: 800, color: BLUE }}
        >
          ¡Lo vi! →
        </button>
      </div>
    );
  }

  /* ── COMPARE ────────────────────────────────────────────────────────────── */
  const isLast    = sortIdx === SORT_EXERCISES.length - 1;
  const isCorrect = sortPicked === currentSort.answer;

  return (
    <div style={{ ...base, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <style>{`
        @keyframes gd5-in  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes gd5-pop { from{opacity:0;transform:scale(0.88) translateY(16px)} to{opacity:1;transform:none} }
      `}</style>

      <div style={{ animation: 'gd5-in 0.4s ease both' }}>
        <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT }}>
          Comparación
        </p>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--foreground)' }}>
          Los dos patrones juntos
        </h2>
      </div>

      {/* Side by side */}
      <div style={{ display: 'flex', gap: 10, animation: 'gd5-in 0.4s 0.1s ease both' }}>
        <div style={{ flex: 1, padding: '14px', borderRadius: 14, background: `rgba(139,92,246,0.08)`, border: `1.5px solid rgba(139,92,246,0.3)`, textAlign: 'center' }}>
          <p style={{ margin: '0 0 2px', fontSize: 20, fontWeight: 900, color: PURPLE, fontFamily: '"Noto Sans KR",sans-serif' }}>에서 ★</p>
          <p style={{ margin: 0, fontSize: 11.5, color: 'var(--foreground)', lineHeight: 1.5 }}>La acción ocurre AQUÍ</p>
        </div>
        <div style={{ flex: 1, padding: '14px', borderRadius: 14, background: `rgba(59,130,246,0.08)`, border: `1.5px solid rgba(59,130,246,0.3)`, textAlign: 'center' }}>
          <p style={{ margin: '0 0 2px', fontSize: 20, fontWeight: 900, color: BLUE, fontFamily: '"Noto Sans KR",sans-serif' }}>에 →</p>
          <p style={{ margin: 0, fontSize: 11.5, color: 'var(--foreground)', lineHeight: 1.5 }}>Me muevo HACIA aquí</p>
        </div>
      </div>

      <div style={{ padding: '12px 16px', borderRadius: 12, background: 'var(--secondary)', border: '1px solid var(--border)', animation: 'gd5-in 0.4s 0.15s ease both' }}>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--foreground)', lineHeight: 1.65 }}>
          Truco: ¿El verbo es 가다/오다? → <strong style={{ color: BLUE }}>에</strong>. ¿El verbo es cualquier otra acción? → <strong style={{ color: PURPLE }}>에서</strong>.
        </p>
      </div>

      {/* Sort exercise */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, display: 'flex', gap: 5 }}>
          {SORT_EXERCISES.map((_, i) => (
            <div key={i} style={{ height: 6, borderRadius: 3, flex: 1, background: i < sortIdx ? ACCENT : i === sortIdx ? 'rgba(108,99,255,0.4)' : 'var(--border)', transition: 'all 0.3s ease' }} />
          ))}
        </div>
        {streak >= 2 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 100, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.35)', flexShrink: 0 }}>
            <span style={{ fontSize: 11 }}>🔥</span>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#f59e0b' }}>{streak}</span>
          </div>
        )}
      </div>

      <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)' }}>
        Clasifica — ¿에서 ★ acción o 에 → destino? ({sortIdx + 1}/{SORT_EXERCISES.length})
      </p>

      <div key={sortIdx} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 18, padding: '20px 16px', textAlign: 'center', animation: 'gd5-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both' }}>
        <p style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 800, color: 'var(--foreground)', fontFamily: '"Noto Sans KR",sans-serif' }}>
          {currentSort.ko}
        </p>
        <button
          type="button"
          onClick={() => playAudio(currentSort.audio)}
          style={{ padding: '7px 18px', borderRadius: 100, cursor: 'pointer', background: 'var(--secondary)', border: '1px solid var(--border)', fontSize: 12, fontWeight: 600, color: 'var(--foreground)', display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          🔊 Escuchar
        </button>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          type="button"
          disabled={!!sortPicked}
          onClick={() => handleSort('eseo')}
          style={{
            flex: 1, padding: '13px', borderRadius: 14, cursor: sortPicked ? 'default' : 'pointer',
            background: sortPicked === 'eseo' ? (isCorrect ? 'rgba(139,92,246,0.18)' : 'rgba(239,68,68,0.12)') : `rgba(139,92,246,0.1)`,
            border: sortPicked === 'eseo' ? (isCorrect ? '1.5px solid rgba(139,92,246,0.5)' : '1.5px solid rgba(239,68,68,0.4)') : `1.5px solid rgba(139,92,246,0.3)`,
            fontSize: 13, fontWeight: 800, color: PURPLE, transition: 'all 0.18s ease',
          }}
        >
          에서 ★ acción
          <br />
          <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--muted-foreground)' }}>la acción ocurre aquí</span>
        </button>
        <button
          type="button"
          disabled={!!sortPicked}
          onClick={() => handleSort('e')}
          style={{
            flex: 1, padding: '13px', borderRadius: 14, cursor: sortPicked ? 'default' : 'pointer',
            background: sortPicked === 'e' ? (isCorrect ? 'rgba(59,130,246,0.18)' : 'rgba(239,68,68,0.12)') : `rgba(59,130,246,0.1)`,
            border: sortPicked === 'e' ? (isCorrect ? '1.5px solid rgba(59,130,246,0.5)' : '1.5px solid rgba(239,68,68,0.4)') : `1.5px solid rgba(59,130,246,0.3)`,
            fontSize: 13, fontWeight: 800, color: BLUE, transition: 'all 0.18s ease',
          }}
        >
          에 → destino
          <br />
          <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--muted-foreground)' }}>me muevo hacia aquí</span>
        </button>
      </div>

      {sortPicked && (
        <div style={{
          padding: '13px 16px', borderRadius: 12, animation: 'gd5-in 0.3s ease both',
          background: isCorrect ? 'rgba(34,197,94,0.08)' : 'rgba(245,158,11,0.08)',
          border: `1px solid ${isCorrect ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.3)'}`,
        }}>
          <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: isCorrect ? '#22c55e' : '#f59e0b' }}>
            {isCorrect ? '✓ ¡Correcto!' : `→ Era: ${currentSort.answer === 'eseo' ? '에서 ★ (acción)' : '에 → (destino)'}`}
          </p>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--foreground)', lineHeight: 1.6 }}>
            {currentSort.explanation}
          </p>
        </div>
      )}

      {sortPicked && (
        <button
          type="button"
          onClick={nextSort}
          style={{ padding: '13px', borderRadius: 14, cursor: 'pointer', width: '100%', background: `rgba(108,99,255,0.12)`, border: `1px solid rgba(108,99,255,0.35)`, fontSize: 14, fontWeight: 800, color: ACCENT }}
        >
          {isLast ? `¡Patrón dominado! (${sortCorrect + (isCorrect ? 1 : 0) > sortCorrect ? sortCorrect + 1 : sortCorrect}/${SORT_EXERCISES.length}) →` : 'Siguiente →'}
        </button>
      )}
    </div>
  );
}
