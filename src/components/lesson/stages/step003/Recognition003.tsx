'use client';

import { useEffect, useMemo, useState } from 'react';
import { playAudio } from '@/lib/storage';

// ── Vocab ─────────────────────────────────────────────────────────────────────
// 4 recicladas del step002 + 7 nuevas del step003
interface VocabEntry {
  id: string;
  hangul: string;
  romanization: string;
  translation: string;
  isNew: boolean;
  distractors_es: string[];
  distractors_kr: string[];
  distractors_rom: string[];
}

const VOCAB: VocabEntry[] = [
  // ── Recicladas del step002 ──────────────────────────────────────────────────
  {
    id: 'R1',
    hangul: '안녕하세요',
    romanization: 'an-nyeong-ha-se-yo',
    translation: 'Hola (formal)',
    isNew: false,
    distractors_es: ['Gracias', 'Aquí tiene', 'Bienvenido/a'],
    distractors_kr: ['감사합니다', '여기 있습니다', '어서 오세요'],
    distractors_rom: ['gam-sa-ham-ni-da', 'yeo-gi it-seum-ni-da', 'eo-seo o-se-yo'],
  },
  {
    id: 'R2',
    hangul: '감사합니다',
    romanization: 'gam-sa-ham-ni-da',
    translation: 'Gracias',
    isNew: false,
    distractors_es: ['Hola (formal)', 'Bienvenido/a', '¿Cómo te llamas?'],
    distractors_kr: ['안녕하세요', '어서 오세요', '이름이 뭐예요'],
    distractors_rom: ['an-nyeong-ha-se-yo', 'eo-seo o-se-yo', 'i-reu-mi mwo-ye-yo'],
  },
  {
    id: 'R3',
    hangul: '이름이 뭐예요',
    romanization: 'i-reu-mi mwo-ye-yo',
    translation: '¿Cómo te llamas?',
    isNew: false,
    distractors_es: ['Me llamo Haeun', 'Un americano, por favor', 'Gracias'],
    distractors_kr: ['저는 하은이에요', '아메리카노 한 잔 주세요', '감사합니다'],
    distractors_rom: ['jeo-neun ha-eu-ni-e-yo', 'a-me-ri-ka-no han jan ju-se-yo', 'gam-sa-ham-ni-da'],
  },
  {
    id: 'R4',
    hangul: '여기 있습니다',
    romanization: 'yeo-gi it-seum-ni-da',
    translation: 'Aquí tiene',
    isNew: false,
    distractors_es: ['Hola (formal)', 'Gracias', '¿Qué tamaño le pongo?'],
    distractors_kr: ['안녕하세요', '감사합니다', '사이즈 뭐로 드릴까요'],
    distractors_rom: ['an-nyeong-ha-se-yo', 'gam-sa-ham-ni-da', 'sa-i-jeu mwo-ro deu-ril-kka-yo'],
  },
  // ── Nuevas del step003 ──────────────────────────────────────────────────────
  {
    id: 'N1',
    hangul: '어서 오세요',
    romanization: 'eo-seo o-se-yo',
    translation: 'Bienvenido/a',
    isNew: true,
    distractors_es: ['Hola (formal)', 'Gracias', 'Aquí tiene'],
    distractors_kr: ['안녕하세요', '감사합니다', '여기 있습니다'],
    distractors_rom: ['an-nyeong-ha-se-yo', 'gam-sa-ham-ni-da', 'yeo-gi it-seum-ni-da'],
  },
  {
    id: 'N2',
    hangul: '아메리카노 한 잔 주세요',
    romanization: 'a-me-ri-ka-no han jan ju-se-yo',
    translation: 'Un americano, por favor',
    isNew: true,
    distractors_es: ['Sí, lo preparo enseguida', '¿Qué tamaño le pongo?', 'Aquí tiene'],
    distractors_kr: ['네, 금방 준비해 드릴게요', '사이즈 뭐로 드릴까요', '여기 있습니다'],
    distractors_rom: ['ne, geum-bang jun-bi-hae deu-ril-ge-yo', 'sa-i-jeu mwo-ro deu-ril-kka-yo', 'yeo-gi it-seum-ni-da'],
  },
  {
    id: 'N3',
    hangul: '네, 금방 준비해 드릴게요',
    romanization: 'ne, geum-bang jun-bi-hae deu-ril-ge-yo',
    translation: 'Sí, lo preparo enseguida',
    isNew: true,
    distractors_es: ['Un americano, por favor', '¿Qué tamaño le pongo?', 'Tenemos pequeño, mediano, grande'],
    distractors_kr: ['아메리카노 한 잔 주세요', '사이즈 뭐로 드릴까요', '스몰, 미디엄, 라지 있어요'],
    distractors_rom: ['a-me-ri-ka-no han jan ju-se-yo', 'sa-i-jeu mwo-ro deu-ril-kka-yo', 'seu-mol, mi-di-eom, la-ji i-sseo-yo'],
  },
  {
    id: 'N4',
    hangul: '사이즈 뭐로 드릴까요',
    romanization: 'sa-i-jeu mwo-ro deu-ril-kka-yo',
    translation: '¿Qué tamaño le pongo?',
    isNew: true,
    distractors_es: ['Sí, lo preparo enseguida', 'Tenemos pequeño, mediano, grande', 'Un americano, por favor'],
    distractors_kr: ['네, 금방 준비해 드릴게요', '스몰, 미디엄, 라지 있어요', '아메리카노 한 잔 주세요'],
    distractors_rom: ['ne, geum-bang jun-bi-hae deu-ril-ge-yo', 'seu-mol, mi-di-eom, la-ji i-sseo-yo', 'a-me-ri-ka-no han jan ju-se-yo'],
  },
  {
    id: 'N5',
    hangul: '스몰, 미디엄, 라지 있어요',
    romanization: 'seu-mol, mi-di-eom, la-ji i-sseo-yo',
    translation: 'Tenemos pequeño, mediano, grande',
    isNew: true,
    distractors_es: ['¿Qué tamaño le pongo?', 'Aquí tiene', 'Gracias'],
    distractors_kr: ['사이즈 뭐로 드릴까요', '여기 있습니다', '감사합니다'],
    distractors_rom: ['sa-i-jeu mwo-ro deu-ril-kka-yo', 'yeo-gi it-seum-ni-da', 'gam-sa-ham-ni-da'],
  },
  {
    id: 'N6',
    hangul: '저는 하은이에요',
    romanization: 'jeo-neun ha-eu-ni-e-yo',
    translation: 'Me llamo Haeun',
    isNew: true,
    distractors_es: ['¿Cómo te llamas?', 'Hola (formal)', 'Bienvenido/a'],
    distractors_kr: ['이름이 뭐예요', '안녕하세요', '어서 오세요'],
    distractors_rom: ['i-reu-mi mwo-ye-yo', 'an-nyeong-ha-se-yo', 'eo-seo o-se-yo'],
  },
  {
    id: 'N7',
    hangul: '글자가 조금 작아요',
    romanization: 'geul-ja-ga jo-geum ja-ga-yo',
    translation: 'Las letras son un poco pequeñas',
    isNew: true,
    distractors_es: ['Un americano, por favor', 'Sí, lo preparo enseguida', 'Me llamo Haeun'],
    distractors_kr: ['아메리카노 한 잔 주세요', '네, 금방 준비해 드릴게요', '저는 하은이에요'],
    distractors_rom: ['a-me-ri-ka-no han jan ju-se-yo', 'ne, geum-bang jun-bi-hae deu-ril-ge-yo', 'jeo-neun ha-eu-ni-e-yo'],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function levelKey(level: number) {
  return `L${level}` as const;
}

interface Props {
  onComplete?: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Recognition003({ onComplete }: Props) {
  const [currentLevel, setCurrentLevel]               = useState(1);
  const [currentItemIndex, setCurrentItemIndex]       = useState(0);
  const [selectedOption, setSelectedOption]           = useState<string | null>(null);
  const [isChecked, setIsChecked]                     = useState(false);
  const [levelComplete, setLevelComplete]             = useState(false);
  const [scoreByLevel, setScoreByLevel]               = useState<Record<string, number>>({ L1: 0, L2: 0, L3: 0, L4: 0 });
  const [finalComplete, setFinalComplete]             = useState(false);

  const vocab          = VOCAB[currentItemIndex] as VocabEntry | undefined;
  const activeLevelKey = levelKey(currentLevel);
  const currentScore   = scoreByLevel[activeLevelKey] ?? 0;
  const total          = VOCAB.length;

  // ── Build shuffled options ──────────────────────────────────────────────────
  const optionSet = useMemo(() => {
    if (!vocab) return [];
    if (currentLevel === 1) {
      return shuffle([vocab.translation, ...vocab.distractors_es]).map((v) => ({ value: v, label: v }));
    }
    if (currentLevel === 2 || currentLevel === 3) {
      return shuffle([vocab.hangul, ...vocab.distractors_kr]).map((v) => ({ value: v, label: v }));
    }
    // L4 — romanization options in 2×2 grid
    return shuffle([vocab.romanization, ...vocab.distractors_rom]).map((v) => ({ value: v, label: v }));
  }, [currentLevel, vocab]);

  const correctValue = useMemo(() => {
    if (!vocab) return '';
    return currentLevel === 1 ? vocab.translation
      : currentLevel === 4     ? vocab.romanization
      :                          vocab.hangul;
  }, [currentLevel, vocab]);

  // Auto-play on L1 and L3
  useEffect(() => {
    setSelectedOption(null);
    setIsChecked(false);
    if (!vocab) return undefined;
    if (currentLevel === 1 || currentLevel === 3) {
      const t = window.setTimeout(() => playAudio(vocab.hangul, 1), 600);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [currentLevel, currentItemIndex, vocab]);

  // ── Actions ────────────────────────────────────────────────────────────────
  function handleVerify() {
    if (!selectedOption || isChecked || !vocab) return;
    setIsChecked(true);
    if (selectedOption === correctValue) {
      setScoreByLevel((prev) => ({ ...prev, [activeLevelKey]: (prev[activeLevelKey] ?? 0) + 1 }));
    }
  }

  function handleNextItem() {
    if (!isChecked) return;
    if (currentItemIndex < total - 1) {
      setCurrentItemIndex((i) => i + 1);
      return;
    }
    setLevelComplete(true);
  }

  function resetLevel() {
    setCurrentItemIndex(0);
    setSelectedOption(null);
    setIsChecked(false);
    setLevelComplete(false);
  }

  function handleAdvanceLevel() {
    if (currentLevel >= 4) { setFinalComplete(true); setLevelComplete(false); onComplete?.(); return; }
    setCurrentLevel((l) => l + 1);
    resetLevel();
  }

  function handleRepeatLevel() {
    setScoreByLevel((prev) => ({ ...prev, [activeLevelKey]: 0 }));
    resetLevel();
  }

  function skipLevel() {
    if (currentLevel >= 4) { setFinalComplete(true); setLevelComplete(false); onComplete?.(); return; }
    setCurrentLevel((l) => l + 1);
    resetLevel();
  }

  // ── Level dot color ────────────────────────────────────────────────────────
  function levelDotColor(n: number) {
    if (finalComplete)    return '#2d9b4e';
    if (n < currentLevel) return '#2d9b4e';
    if (n === currentLevel) return '#6c63ff';
    return '#e9ecef';
  }

  // ── Feedback panel ─────────────────────────────────────────────────────────
  function renderFeedback() {
    if (!isChecked || !vocab) return null;
    const ok = selectedOption === correctValue;
    return (
      <div style={{
        marginTop: 12, padding: '10px 14px', borderRadius: 8, fontSize: 12, lineHeight: 1.6,
        background: ok ? 'rgba(45,155,78,0.06)' : 'rgba(220,53,69,0.05)',
        border: `1px solid ${ok ? 'rgba(45,155,78,0.2)' : 'rgba(220,53,69,0.15)'}`,
        color: ok ? '#2d9b4e' : '#dc3545',
      }}>
        {ok
          ? `✅ ¡Correcto! — ${vocab.romanization}`
          : `❌ La respuesta correcta es: ${correctValue}`}
      </div>
    );
  }

  // ── Option style ───────────────────────────────────────────────────────────
  function optionStyle(option: { value: string }): React.CSSProperties {
    const isSelected = selectedOption === option.value;
    const isCorrect  = option.value === correctValue;
    const base: React.CSSProperties = {
      padding: '12px 16px', background: 'var(--bg)', border: '1.5px solid var(--line-soft)',
      borderRadius: 10, fontSize: 13, textAlign: 'left', cursor: isChecked ? 'default' : 'pointer',
      color: 'var(--ink)', transition: 'all 0.15s',
      fontFamily: (currentLevel === 2 || currentLevel === 3) ? "'Noto Sans KR', sans-serif" : 'inherit',
    };
    if (!isChecked && isSelected)              { base.border = '1.5px solid #6c63ff'; base.background = 'rgba(108,99,255,0.06)'; }
    if (isChecked && isSelected && !isCorrect) { base.border = '1.5px solid #dc3545'; base.background = 'rgba(220,53,69,0.05)'; base.color = '#dc3545'; }
    if (isChecked && isCorrect)                { base.border = '1.5px solid #2d9b4e'; base.background = 'rgba(45,155,78,0.06)'; base.color = '#2d9b4e'; }
    return base;
  }

  // ── Level summary screen ───────────────────────────────────────────────────
  function renderLevelSummary() {
    if (!levelComplete) return null;
    if (currentLevel === 4 || finalComplete) {
      return (
        <article style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 16, padding: '2.5rem 2rem', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🎯</div>
          <h3 style={{ margin: '0 0 8px', fontSize: 22, color: 'var(--ink)' }}>¡Reconocimiento completado!</h3>
          <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
            Reconociste las {total} frases en los 4 modos. Tu cerebro ya las tiene.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
            {VOCAB.map((v) => (
              <span key={v.id} style={{
                background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.15)',
                borderRadius: 100, padding: '4px 12px', fontFamily: "'Noto Sans KR', sans-serif",
                color: 'var(--wl-on-panel-link, #6c63ff)', fontSize: 14,
              }}>
                {v.hangul}
              </span>
            ))}
          </div>
          <button type="button" onClick={onComplete} style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Siguiente etapa →
          </button>
        </article>
      );
    }

    const passed = currentScore >= Math.ceil(total * 0.6);
    return (
      <article style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 16, padding: '2.5rem 2rem', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 48, fontWeight: 800, color: 'var(--wl-on-panel-link, #6c63ff)' }}>{currentScore}/{total}</p>
        <p style={{ margin: '8px 0 24px', fontSize: 14, color: 'var(--muted)' }}>
          {passed ? '¡Buen resultado! Puedes continuar.' : 'Repasemos un poco más.'}
        </p>
        {passed ? (
          <button type="button" onClick={handleAdvanceLevel} style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Siguiente nivel →
          </button>
        ) : (
          <>
            <button type="button" onClick={handleRepeatLevel} style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 10 }}>
              Repetir nivel
            </button>
            <button type="button" onClick={handleAdvanceLevel} style={{ background: 'transparent', border: 'none', color: '#adb5bd', fontSize: 12, textDecoration: 'underline', cursor: 'pointer' }}>
              Continuar de todas formas →
            </button>
          </>
        )}
      </article>
    );
  }

  // ── Guards ─────────────────────────────────────────────────────────────────
  if (!vocab && !levelComplete) {
    return <section style={{ padding: '1rem' }}><p style={{ margin: 0 }}>No hay contenido disponible.</p></section>;
  }

  if (finalComplete) {
    return (
      <section style={{ width: '100%', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>{renderLevelSummary()}</div>
      </section>
    );
  }

  const isL1 = currentLevel === 1;
  const isL2 = currentLevel === 2;
  const isL3 = currentLevel === 3;
  const isL4 = currentLevel === 4;

  // ── Prompt text per level ──────────────────────────────────────────────────
  const promptText = isL1 ? '¿Qué significa esta frase?'
    : isL2 ? '¿Cómo se dice en coreano?'
    : isL3 ? 'Escucha y elige la frase correcta en coreano'
    : '¿Cuál es la pronunciación correcta?';

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <section style={{ width: '100%', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* Header */}
        <header style={{ marginBottom: 20 }}>
          <p style={{ margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>
            Etapa 03 de 11 · Reconocimiento
          </p>
        </header>

        {/* Level dots */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, justifyContent: 'center' }}>
          {[1, 2, 3, 4].map((n) => (
            <span key={n} aria-hidden="true" style={{ width: 36, height: 4, borderRadius: 2, background: levelDotColor(n) }} />
          ))}
        </div>

        {!levelComplete ? (
          <>
            {/* Item counter + progress bar */}
            <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'right', marginBottom: 4 }}>
              {currentItemIndex + 1} de {total}
            </div>
            <div style={{ height: 3, background: 'var(--line-soft)', borderRadius: 2, marginBottom: 16 }}>
              <div style={{ width: `${(currentItemIndex / total) * 100}%`, height: '100%', background: '#6c63ff', borderRadius: 2, transition: 'width 0.2s ease' }} />
            </div>

            <article style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>

              {/* ── L1: show Korean phrase ──────────────────────────────────── */}
              {vocab && isL1 && (
                <div style={{ padding: '28px 24px 0', textAlign: 'center' }}>
                  {vocab.isNew && (
                    <span style={{ display: 'inline-block', marginBottom: 10, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', background: '#6c63ff', borderRadius: 100, padding: '3px 10px' }}>
                      Nueva
                    </span>
                  )}
                  <p style={{ margin: '0 0 4px', fontSize: 30, fontWeight: 700, fontFamily: "'Noto Sans KR', sans-serif", color: 'var(--ink)', lineHeight: 1.3 }}>
                    {vocab.hangul}
                  </p>
                  <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                    {vocab.romanization}
                  </p>
                </div>
              )}

              {/* ── L2: show Spanish phrase ─────────────────────────────────── */}
              {vocab && isL2 && (
                <div style={{ padding: '28px 24px 0', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>
                    {vocab.translation}
                  </p>
                </div>
              )}

              {/* ── L3: audio only ──────────────────────────────────────────── */}
              {isL3 && (
                <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: 'var(--bg-2)', gap: 8 }}>
                  <span style={{ fontSize: 56 }} aria-hidden="true">🔊</span>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>Escucha la frase</p>
                </div>
              )}

              {/* ── L4: Korean phrase → pick romanization ──────────────────── */}
              {vocab && isL4 && (
                <div style={{ padding: '2rem 2rem 0', textAlign: 'center', background: 'var(--bg-2)' }}>
                  <p style={{ margin: '0 0 4px', fontSize: 36, fontWeight: 700, fontFamily: "'Noto Sans KR', sans-serif", color: 'var(--wl-on-panel-link, #6c63ff)', lineHeight: 1.3 }}>
                    {vocab.hangul}
                  </p>
                </div>
              )}

              {/* ── Audio buttons (L1, L2, L3) ─────────────────────────────── */}
              {vocab && !isL4 && (
                <div style={{ padding: '12px 20px', display: 'flex', gap: 8, borderBottom: '1px solid var(--line-soft)' }}>
                  <button type="button" onClick={() => playAudio(vocab.hangul, 1)}
                    style={{ fontSize: 12, color: 'var(--muted)', background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 100, padding: '4px 12px', cursor: 'pointer' }}>
                    🔊 Escuchar
                  </button>
                  <button type="button" onClick={() => playAudio(vocab.hangul, 0.65)}
                    style={{ fontSize: 12, color: 'var(--muted)', background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 100, padding: '4px 12px', cursor: 'pointer' }}>
                    🐢 Lento
                  </button>
                </div>
              )}

              {/* ── Options ────────────────────────────────────────────────── */}
              <div style={{ padding: 20 }}>
                <p style={{ margin: '0 0 14px', fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>
                  {promptText}
                </p>

                {/* L4 uses 2×2 romanization grid */}
                {isL4 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {optionSet.map((opt, idx) => {
                      const isSel  = selectedOption === opt.value;
                      const isCorr = opt.value === correctValue;
                      return (
                        <button key={opt.value} type="button" disabled={isChecked}
                          onClick={() => { if (isChecked) return; setSelectedOption(opt.value); }}
                          style={{
                            padding: '14px 10px', background: 'var(--bg)', borderRadius: 12,
                            border: `2px solid ${isChecked && isCorr ? '#2d9b4e' : isChecked && isSel && !isCorr ? '#dc3545' : isSel ? '#6c63ff' : 'var(--line-soft)'}`,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                            cursor: isChecked ? 'default' : 'pointer', transition: 'all 0.15s',
                          }}>
                          <span style={{ fontSize: 11, color: isChecked ? (isCorr ? '#2d9b4e' : isSel ? '#dc3545' : 'var(--muted)') : 'var(--muted)', fontFamily: 'var(--mono)', textAlign: 'center', lineHeight: 1.5 }}>
                            {isChecked ? opt.label : `Opción ${idx + 1}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {optionSet.map((opt) => (
                      <button key={opt.value} type="button" style={optionStyle(opt)} disabled={isChecked}
                        onClick={() => { if (isChecked) return; setSelectedOption(opt.value); }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {renderFeedback()}
              </div>

              {/* ── Verify / Siguiente / Saltar ────────────────────────────── */}
              <div style={{ padding: '0 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button type="button" onClick={skipLevel}
                  style={{ fontSize: 11, color: '#adb5bd', cursor: 'pointer', textDecoration: 'underline', background: 'none', border: 'none', padding: 0 }}>
                  Saltar nivel
                </button>
                {!isChecked ? (
                  <button type="button" onClick={handleVerify} disabled={!selectedOption}
                    style={{ background: selectedOption ? '#6c63ff' : 'var(--line-soft)', color: selectedOption ? '#fff' : '#adb5bd', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: selectedOption ? 'pointer' : 'not-allowed' }}>
                    Verificar
                  </button>
                ) : (
                  <button type="button" onClick={handleNextItem}
                    style={{ background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                    Siguiente →
                  </button>
                )}
              </div>

            </article>
          </>
        ) : (
          renderLevelSummary()
        )}
      </div>
    </section>
  );
}
