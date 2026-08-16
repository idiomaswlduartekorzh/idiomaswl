'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSound } from '@/components/lesson/engine/useSound';
import StreakBar from '@/components/lesson/engine/StreakBar';

interface Props { onComplete?: () => void }

const CHIP_STYLE_BASE: React.CSSProperties = {
  padding: '12px 20px',
  border: '1.5px solid var(--line-soft)',
  borderRadius: 8,
  background: 'var(--bg)',
  fontSize: 17,
  fontFamily: "'Noto Sans KR', sans-serif",
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.15s',
  color: 'var(--ink)',
};

function chipStyle(state: 'idle' | 'selected' | 'correct' | 'wrong'): React.CSSProperties {
  if (state === 'selected') return { ...CHIP_STYLE_BASE, borderColor: '#6c63ff', background: 'rgba(108,99,255,0.08)', color: 'var(--wl-on-panel-link, #6c63ff)' };
  if (state === 'correct') return { ...CHIP_STYLE_BASE, borderColor: '#2d9b4e', background: 'rgba(45,155,78,0.08)', color: 'var(--wl-on-panel-ok, #2d9b4e)' };
  if (state === 'wrong') return { ...CHIP_STYLE_BASE, borderColor: '#dc3545', background: 'rgba(220,53,69,0.06)', color: 'var(--wl-on-panel-alert, #dc3545)' };
  return CHIP_STYLE_BASE;
}

// ─── Exercise 1: Sentence reorder ───────────────────────────────────────────

const EX1_CHIPS = ['가요', '오늘', '저는', '학교에'];
const EX1_CORRECT = ['저는', '오늘', '학교에', '가요'];

function Ex1({ onDone }: { onDone: () => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const { correct: playCorrect, wrong: playWrong, assemble: playAssemble } = useSound();

  const isCorrect = checked && JSON.stringify(selected) === JSON.stringify(EX1_CORRECT);
  const isWrong = checked && !isCorrect;

  function toggleChip(word: string) {
    if (checked) return;
    playAssemble();
    setSelected(prev => {
      if (prev.includes(word)) return prev.filter(w => w !== word);
      if (prev.length >= EX1_CHIPS.length) return prev;
      return [...prev, word];
    });
  }

  function verify() {
    if (selected.length < EX1_CHIPS.length) return;
    const ok = JSON.stringify(selected) === JSON.stringify(EX1_CORRECT);
    if (ok) playCorrect(); else playWrong();
    setChecked(true);
  }

  function reset() {
    setSelected([]);
    setChecked(false);
  }

  return (
    <article style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 14, padding: 20 }}>
      <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: 'var(--wl-on-panel-link, #6c63ff)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ejercicio 1 · Reordena la frase</p>
      <p style={{ margin: '0 0 14px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
        Tu amigo te pregunta: <em>"¿Cuándo vas a la escuela?"</em><br />
        Pon las palabras en orden correcto (coreano SOV):
      </p>

      {/* Answer slots */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, minHeight: 52, padding: '10px 12px', background: 'var(--bg-2)', borderRadius: 10, border: '1.5px dashed var(--line-soft)', marginBottom: 14, alignItems: 'center' }}>
        {selected.length === 0
          ? <span style={{ fontSize: 12, color: 'var(--muted)' }}>Toca las palabras en orden…</span>
          : selected.map((word, i) => (
            <button key={i} type="button" onClick={() => !checked && setSelected(prev => prev.filter((_, idx) => idx !== i))}
              style={chipStyle(checked ? (EX1_CORRECT[i] === word ? 'correct' : 'wrong') : 'selected')}>
              {word}
            </button>
          ))
        }
      </div>

      {/* Available chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {EX1_CHIPS.map(word => {
          const used = selected.includes(word);
          return (
            <button key={word} type="button" onClick={() => toggleChip(word)}
              style={{ ...chipStyle(used ? 'selected' : 'idle'), opacity: used ? 0.4 : 1 }}
              disabled={used && checked}>
              {word}
            </button>
          );
        })}
      </div>

      {!checked && (
        <button type="button" onClick={verify} disabled={selected.length < EX1_CHIPS.length}
          style={{ width: '100%', padding: '12px', background: selected.length === EX1_CHIPS.length ? '#6c63ff' : 'var(--line-soft)', color: selected.length === EX1_CHIPS.length ? '#fff' : 'var(--muted)', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: selected.length === EX1_CHIPS.length ? 'pointer' : 'default' }}>
          Verificar
        </button>
      )}

      {isWrong && (
        <div style={{ marginTop: 10, padding: '12px 14px', background: 'rgba(220,53,69,0.06)', border: '1px solid rgba(220,53,69,0.2)', borderRadius: 10, marginBottom: 8 }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--wl-on-panel-alert, #dc3545)' }}>No es exactamente eso — el orden coreano es: Sujeto → Tiempo → Lugar → Verbo</p>
          <button type="button" onClick={reset} style={{ padding: '8px 16px', background: '#6c63ff', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Intentar de nuevo</button>
        </div>
      )}

      {isCorrect && (
        <div style={{ marginTop: 10, padding: '14px', background: 'rgba(45,155,78,0.06)', border: '1px solid rgba(45,155,78,0.2)', borderRadius: 10, marginBottom: 10 }}>
          <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, color: 'var(--wl-on-panel-ok, #2d9b4e)' }}>✅ ¡Perfecto!</p>
          <p style={{ margin: '0 0 6px', fontSize: 13, color: 'var(--ink)', lineHeight: 1.6 }}>
            저는 오늘 학교에 가요<br />
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>Yo hoy a la escuela voy → Hoy voy a la escuela</span>
          </p>
          <div style={{ padding: '8px 12px', background: 'rgba(108,99,255,0.06)', borderRadius: 8, marginTop: 8 }}>
            <span style={{ fontSize: 11, color: 'var(--wl-on-panel-link, #6c63ff)' }}>
              💡 <strong>오늘</strong> (hoy) es de tu nuevo vocabulario del Día 2 — ¡ya lo puedes usar!
            </span>
          </div>
          <button type="button" onClick={onDone} style={{ width: '100%', marginTop: 12, padding: '12px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Siguiente →
          </button>
        </div>
      )}
    </article>
  );
}

// ─── Exercise 2: Fill in the blank ──────────────────────────────────────────

const EX2_OPTIONS = ['보여요', '가요', '학교'];

function Ex2({ onDone }: { onDone: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const { correct: playCorrect, wrong: playWrong, assemble: playAssemble } = useSound();

  const isCorrect = checked && selected === '보여요';

  return (
    <article style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 14, padding: 20 }}>
      <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: 'var(--wl-on-panel-link, #6c63ff)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ejercicio 2 · Completa la frase</p>
      <p style={{ margin: '0 0 14px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
        Alguien dice esta frase del video. ¿Qué palabra falta?
      </p>

      <div style={{ textAlign: 'center', marginBottom: 20, padding: '16px', background: 'rgba(108,99,255,0.04)', borderRadius: 12, border: '1px solid rgba(108,99,255,0.12)' }}>
        <span style={{ fontSize: 20, fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700, color: 'var(--ink)', letterSpacing: 2 }}>
          이제 글자가 조금{' '}
          <span style={{ display: 'inline-block', minWidth: 70, borderBottom: '2px solid #6c63ff', color: checked && selected ? (isCorrect ? '#2d9b4e' : '#dc3545') : '#6c63ff', fontWeight: 900 }}>
            {selected || '　　　'}
          </span>
        </span>
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 16 }}>
        {EX2_OPTIONS.map(opt => {
          const isSelected = selected === opt;
          const correct = checked && opt === '보여요';
          const wrong = checked && isSelected && opt !== '보여요';
          return (
            <button key={opt} type="button" onClick={() => { if (!checked) { playAssemble(); setSelected(opt); } }}
              style={chipStyle(correct ? 'correct' : wrong ? 'wrong' : isSelected ? 'selected' : 'idle')}>
              {opt}
            </button>
          );
        })}
      </div>

      {!checked && (
        <button type="button" onClick={() => { if (selected) { const ok = selected === '보여요'; if (ok) playCorrect(); else playWrong(); setChecked(true); } }} disabled={!selected}
          style={{ width: '100%', padding: '12px', background: selected ? '#6c63ff' : 'var(--line-soft)', color: selected ? '#fff' : 'var(--muted)', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: selected ? 'pointer' : 'default' }}>
          Verificar
        </button>
      )}

      {checked && !isCorrect && (
        <div style={{ marginTop: 10, padding: '12px 14px', background: 'rgba(220,53,69,0.06)', border: '1px solid rgba(220,53,69,0.2)', borderRadius: 10, marginBottom: 8 }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--wl-on-panel-alert, #dc3545)' }}>No es esa. Piensa: ¿qué verbo significa "se ve"?</p>
          <button type="button" onClick={() => { setSelected(null); setChecked(false); }} style={{ padding: '8px 16px', background: '#6c63ff', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Intentar de nuevo</button>
        </div>
      )}

      {isCorrect && (
        <div style={{ marginTop: 10, padding: '14px', background: 'rgba(45,155,78,0.06)', border: '1px solid rgba(45,155,78,0.2)', borderRadius: 10, marginBottom: 10 }}>
          <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, color: 'var(--wl-on-panel-ok, #2d9b4e)' }}>✅ ¡Esta es exactamente la frase del video de David!</p>
          <p style={{ margin: '0 0 10px', fontSize: 13, color: 'var(--ink)', lineHeight: 1.7 }}>
            "Ahora las letras se ven un poco"
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
            {[
              { kr: '이제', es: 'ahora' },
              { kr: '글자', es: 'letras' },
              { kr: '가', es: 'partícula' },
              { kr: '조금', es: 'un poco' },
              { kr: '보여요', es: 'se ven' },
            ].map(item => (
              <span key={item.kr} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 100, background: 'rgba(108,99,255,0.08)', color: 'var(--wl-on-panel-link, #6c63ff)', fontWeight: 600 }}>
                <span style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>{item.kr}</span>({item.es})
              </span>
            ))}
          </div>
          <button type="button" onClick={onDone} style={{ width: '100%', padding: '12px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Siguiente →
          </button>
        </div>
      )}
    </article>
  );
}

// ─── Exercise 3: Build Hangul syllable ──────────────────────────────────────

const JAMOS = ['ㄴ', 'ㅏ', 'ㄹ', 'ㅗ', 'ㄴ', 'ㅓ'];

function SyllableBuilder({
  target,
  meaning,
  correctConsonant,
  correctVowel,
  allJamos,
  onDone,
}: {
  target: string;
  meaning: string;
  correctConsonant: string;
  correctVowel: string;
  allJamos: string[];
  onDone: () => void;
}) {
  const [consonant, setConsonant] = useState<string | null>(null);
  const [vowel, setVowel] = useState<string | null>(null);
  const [assembled, setAssembled] = useState(false);
  const [wrong, setWrong] = useState(false);
  const { correct: playCorrect, wrong: playWrong, assemble: playAssemble } = useSound();

  const isVowel = (j: string) => ['ㅏ', 'ㅓ', 'ㅗ', 'ㅜ', 'ㅣ', 'ㅡ', 'ㅔ', 'ㅐ'].includes(j);

  function selectJamo(j: string) {
    if (assembled) return;
    setWrong(false);
    if (isVowel(j)) {
      if (!consonant) return; // need consonant first
      const correct = j === correctVowel && consonant === correctConsonant;
      if (correct) {
        playCorrect();
        setVowel(j);
        setTimeout(() => setAssembled(true), 300);
      } else {
        playWrong();
        setVowel(j);
        setWrong(true);
        setTimeout(() => { setConsonant(null); setVowel(null); setWrong(false); }, 1000);
      }
    } else {
      playAssemble();
      setConsonant(j);
      setVowel(null);
    }
  }

  // Deduplicate display jamos for buttons (keep unique values)
  const uniqueJamos = Array.from(new Set(allJamos));

  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ margin: '0 0 10px', fontSize: 13, color: 'var(--ink)', lineHeight: 1.7 }}>
        Toca la consonante inicial y luego la vocal para construir{' '}
        <strong style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 17, color: 'var(--wl-on-panel-link, #6c63ff)' }}>{target}</strong>{' '}
        <span style={{ color: 'var(--muted)' }}>({meaning})</span>
      </p>

      {/* Assembly preview */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, border: `2px solid ${assembled ? '#2d9b4e' : wrong ? '#dc3545' : 'var(--line-soft)'}`, background: assembled ? 'rgba(45,155,78,0.06)' : wrong ? 'rgba(220,53,69,0.06)' : 'var(--bg-2)', transition: 'all 0.3s' }}>
          {assembled
            ? <span style={{ fontSize: 44, fontFamily: "'Noto Sans KR', sans-serif", color: 'var(--wl-on-panel-ok, #2d9b4e)', fontWeight: 900 }}>{target}</span>
            : <span style={{ fontSize: 36, fontFamily: "'Noto Sans KR', sans-serif", color: wrong ? '#dc3545' : 'var(--muted)' }}>
                {consonant && !vowel ? consonant : consonant && vowel ? `${consonant}${vowel}` : '?'}
              </span>
          }
        </div>
        {assembled && (
          <div style={{ fontSize: 13, color: 'var(--wl-on-panel-ok, #2d9b4e)', lineHeight: 1.6 }}>
            <strong style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 20 }}>{target}</strong> = {correctConsonant} + {correctVowel}<br />
            <span style={{ color: 'var(--muted)', fontSize: 12 }}>Significa: <strong>"{meaning}"</strong></span>
          </div>
        )}
      </div>

      {/* Jamo picker */}
      {!assembled && (
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {uniqueJamos.map(j => {
            const isV = isVowel(j);
            const isSel = consonant === j || vowel === j;
            return (
              <button key={j} type="button" onClick={() => selectJamo(j)}
                style={{
                  ...chipStyle(isSel ? 'selected' : 'idle'),
                  fontSize: 22,
                  minWidth: 52,
                  color: isV ? '#6c63ff' : '#0ea5e9',
                  borderColor: isV ? 'rgba(108,99,255,0.3)' : 'rgba(14,165,233,0.3)',
                }}>
                {j}
              </button>
            );
          })}
        </div>
      )}

      {wrong && <p style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: 'var(--wl-on-panel-alert, #dc3545)' }}>Combinación incorrecta — intenta de nuevo</p>}

      {assembled && (
        <button type="button" onClick={onDone} style={{ width: '100%', marginTop: 14, padding: '12px', background: '#2d9b4e', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          Siguiente →
        </button>
      )}
    </div>
  );
}

function Ex3({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState<'na' | 'neo' | 'done'>('na');

  return (
    <article style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 14, padding: 20 }}>
      <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: 'var(--wl-on-panel-link, #6c63ff)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ejercicio 3 · Construye un bloque Hangul</p>
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
        Cada sílaba coreana es un bloque cuadrado. Vamos a construir dos bloques del vocabulario de hoy.
      </p>

      {/* Step indicators */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {(['나', '너'] as const).map((syl, i) => {
          const isDone = (syl === '나' && step !== 'na') || step === 'done';
          const isCurrent = (syl === '나' && step === 'na') || (syl === '너' && step === 'neo');
          return (
            <div key={syl} style={{ flex: 1, padding: '8px', borderRadius: 9, textAlign: 'center', border: `1.5px solid ${isDone ? '#2d9b4e' : isCurrent ? '#6c63ff' : 'var(--line-soft)'}`, background: isDone ? 'rgba(45,155,78,0.06)' : isCurrent ? 'rgba(108,99,255,0.06)' : 'var(--bg)', color: isDone ? '#2d9b4e' : isCurrent ? '#6c63ff' : 'var(--muted)', fontSize: 12, fontWeight: 600 }}>
              {isDone ? '✓ ' : ''}<span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 16 }}>{syl}</span>
            </div>
          );
        })}
      </div>

      {step === 'na' && (
        <SyllableBuilder
          target="나"
          meaning="yo (informal)"
          correctConsonant="ㄴ"
          correctVowel="ㅏ"
          allJamos={['ㄴ', 'ㅏ', 'ㄹ', 'ㅗ']}
          onDone={() => setStep('neo')}
        />
      )}

      {step === 'neo' && (
        <SyllableBuilder
          target="너"
          meaning="tú"
          correctConsonant="ㄴ"
          correctVowel="ㅓ"
          allJamos={['ㄴ', 'ㅓ', 'ㄹ', 'ㅗ']}
          onDone={() => setStep('done')}
        />
      )}

      {step === 'done' && (
        <div style={{ padding: '14px', background: 'rgba(45,155,78,0.06)', border: '1px solid rgba(45,155,78,0.2)', borderRadius: 10 }}>
          <p style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 700, color: 'var(--wl-on-panel-ok, #2d9b4e)' }}>¡Construiste tus primeros bloques Hangul!</p>
          <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
            {[
              { syl: '나', roman: 'na', es: 'yo (informal)', parts: 'ㄴ + ㅏ' },
              { syl: '너', roman: 'neo', es: 'tú', parts: 'ㄴ + ㅓ' },
            ].map(item => (
              <div key={item.syl} style={{ flex: 1, textAlign: 'center', padding: '12px', background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 10 }}>
                <p style={{ margin: '0 0 4px', fontSize: 40, fontFamily: "'Noto Sans KR', sans-serif", color: 'var(--wl-on-panel-link, #6c63ff)', fontWeight: 900 }}>{item.syl}</p>
                <p style={{ margin: '0 0 2px', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{item.parts}</p>
                <p style={{ margin: '0 0 2px', fontSize: 11, color: 'var(--muted)' }}>[{item.roman}]</p>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{item.es}</p>
              </div>
            ))}
          </div>
          <button type="button" onClick={onDone} style={{ width: '100%', padding: '14px', background: '#2d9b4e', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            Continuar →
          </button>
        </div>
      )}
    </article>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function GuidedProduction002({ onComplete }: Props) {
  const [exercise, setExercise] = useState(0);
  const [streak, setStreak] = useState(0);
  const { complete: playComplete } = useSound();

  function nextExercise(next: number) {
    setStreak(s => s + 1);
    setExercise(next);
  }

  function finish() {
    setStreak(s => s + 1);
    playComplete();
    onComplete?.();
  }

  return (
    <section style={{ maxWidth: 620, margin: '0 auto', padding: '1.5rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <p style={{ margin: 0, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--wl-on-panel-link, #6c63ff)', fontWeight: 700 }}>PRODUCCIÓN GUIADA</p>
        <StreakBar streak={streak} />
      </div>
      <h3 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>Usa lo que sabes</h3>
      <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
        Combina el vocabulario del Día 1 y el Día 2 para construir frases reales.
      </p>

      {/* Progress tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {['Ejercicio 1', 'Ejercicio 2', 'Ejercicio 3'].map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => i < exercise ? setExercise(i) : undefined}
            style={{ flex: 1, padding: '8px', borderRadius: 9, border: `1.5px solid ${exercise === i ? '#6c63ff' : i < exercise ? '#2d9b4e' : 'var(--line-soft)'}`, background: exercise === i ? 'rgba(108,99,255,0.08)' : i < exercise ? 'rgba(45,155,78,0.06)' : 'var(--bg)', color: exercise === i ? '#6c63ff' : i < exercise ? '#2d9b4e' : 'var(--muted)', fontSize: 12, fontWeight: 600, cursor: i < exercise ? 'pointer' : 'default' }}
          >
            {i < exercise ? '✓ ' : ''}{label}
          </button>
        ))}
      </div>

      {exercise === 0 && <Ex1 onDone={() => nextExercise(1)} />}
      {exercise === 1 && <Ex2 onDone={() => nextExercise(2)} />}
      {exercise === 2 && <Ex3 onDone={finish} />}
    </section>
  );
}
