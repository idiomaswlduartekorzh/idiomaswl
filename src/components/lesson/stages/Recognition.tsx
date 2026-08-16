'use client';

import { useEffect, useMemo, useState } from 'react';
import { playAudio, KR_IMG } from '@/lib/storage';

interface VocabEntry {
  id: string;
  hangul: string;
  romanization: string;
  translation: string;
  img: string;
  distractors_es: string[];
  distractors_kr: string[];
}

const RECOGNITION_VOCAB: VocabEntry[] = [
  {
    id: 'V1',
    hangul: '학교',
    romanization: 'hak-gyo',
    translation: 'escuela',
    img: KR_IMG.school,
    distractors_es: ['universidad', 'casa', '¿a dónde vas?'],
    distractors_kr: ['대학교', '집', '어디 가요?'],
  },
  {
    id: 'V2',
    hangul: '대학교',
    romanization: 'dae-hak-gyo',
    translation: 'universidad',
    img: KR_IMG.university,
    distractors_es: ['escuela', 'casa', 'voy / vas'],
    distractors_kr: ['학교', '집', '가요'],
  },
  {
    id: 'V3',
    hangul: '집',
    romanization: 'jib',
    translation: 'casa',
    img: KR_IMG.home,
    distractors_es: ['escuela', 'universidad', 'yo (formal)'],
    distractors_kr: ['학교', '대학교', '저는'],
  },
  {
    id: 'V4',
    hangul: '가요',
    romanization: 'ga-yo',
    translation: 'voy / vas',
    img: KR_IMG.going,
    distractors_es: ['escuela', 'casa', '¿a dónde vas?'],
    distractors_kr: ['학교', '집', '어디 가요?'],
  },
  {
    id: 'V5',
    hangul: '저는',
    romanization: 'jeo-neun',
    translation: 'yo (formal)',
    img: KR_IMG.iFormal,
    distractors_es: ['voy / vas', 'casa', 'escuela'],
    distractors_kr: ['가요', '집', '학교'],
  },
  {
    id: 'V6',
    hangul: '어디 가요?',
    romanization: 'eo-di ga-yo?',
    translation: '¿a dónde vas?',
    img: KR_IMG.whereGoing,
    distractors_es: ['yo (formal)', 'universidad', 'voy / vas'],
    distractors_kr: ['저는', '대학교', '가요'],
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function levelKey(level: number) {
  return `L${level}` as const;
}

function progressPercent(currentItemIndex: number) {
  return `${Math.max(0, Math.min(100, (currentItemIndex / 6) * 100))}%`;
}

interface Props {
  onComplete?: () => void;
}

export default function Recognition({ onComplete }: Props) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  const [scoreByLevel, setScoreByLevel] = useState<Record<string, number>>({ L1: 0, L2: 0, L3: 0, L4: 0 });
  const [finalComplete, setFinalComplete] = useState(false);

  const vocab = RECOGNITION_VOCAB[currentItemIndex] as VocabEntry | undefined;
  const activeLevelKey = levelKey(currentLevel);
  const currentScore = scoreByLevel[activeLevelKey] ?? 0;

  const optionSet = useMemo(() => {
    if (!vocab) return [];
    if (currentLevel === 1) {
      return shuffle([vocab.translation, ...vocab.distractors_es]).map((value) => ({ value, label: value }));
    }
    if (currentLevel === 2 || currentLevel === 3) {
      return shuffle([vocab.hangul, ...vocab.distractors_kr]).map((value) => ({ value, label: value }));
    }
    const distractorCandidates = RECOGNITION_VOCAB
      .filter((item) => item.id !== vocab.id)
      .map((item) => item.hangul);
    const distractors = shuffle(distractorCandidates).slice(0, 3);
    return shuffle([vocab.hangul, ...distractors]).map((value) => ({ value, label: value }));
  }, [currentLevel, vocab]);

  const correctValue = useMemo(() => {
    if (!vocab) return '';
    if (currentLevel === 1) return vocab.translation;
    return vocab.hangul;
  }, [currentLevel, vocab]);

  useEffect(() => {
    setSelectedOption(null);
    setIsChecked(false);
    if (!vocab) return undefined;
    if (currentLevel === 1 || currentLevel === 3) {
      const timer = window.setTimeout(() => {
        playAudio(vocab.hangul, 1);
      }, 600);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [currentLevel, currentItemIndex, vocab]);

  function handleVerify() {
    if (!selectedOption || isChecked || !vocab) return;
    setIsChecked(true);
    if (selectedOption === correctValue) {
      setScoreByLevel((previous) => ({
        ...previous,
        [activeLevelKey]: (previous[activeLevelKey] ?? 0) + 1,
      }));
    }
  }

  function handleNextItem() {
    if (!isChecked) return;
    if (currentItemIndex < RECOGNITION_VOCAB.length - 1) {
      setCurrentItemIndex((previous) => previous + 1);
      return;
    }
    setLevelComplete(true);
  }

  function resetLevelState() {
    setCurrentItemIndex(0);
    setSelectedOption(null);
    setIsChecked(false);
    setLevelComplete(false);
  }

  function handleAdvanceLevel() {
    if (currentLevel >= 4) {
      setFinalComplete(true);
      setLevelComplete(false);
      onComplete?.();
      return;
    }
    setCurrentLevel((previous) => previous + 1);
    resetLevelState();
  }

  function handleRepeatLevel() {
    setScoreByLevel((previous) => ({
      ...previous,
      [activeLevelKey]: 0,
    }));
    resetLevelState();
  }

  function skipLevel() {
    if (currentLevel >= 4) {
      setFinalComplete(true);
      setLevelComplete(false);
      onComplete?.();
      return;
    }
    setCurrentLevel((previous) => previous + 1);
    resetLevelState();
  }

  function levelDotColor(levelNumber: number) {
    if (finalComplete) return '#2d9b4e';
    if (levelNumber < currentLevel) return '#2d9b4e';
    if (levelNumber === currentLevel) return '#6c63ff';
    return '#e9ecef';
  }

  function renderFeedback() {
    if (!isChecked || !vocab) return null;
    const isCorrect = selectedOption === correctValue;
    if (isCorrect) {
      return (
        <div
          style={{
            marginTop: 12,
            padding: '10px 14px',
            borderRadius: 8,
            fontSize: 12,
            lineHeight: 1.6,
            background: 'rgba(45,155,78,0.06)',
            border: '1px solid rgba(45,155,78,0.2)',
            color: 'var(--wl-on-panel-ok, #2d9b4e)',
          }}
        >
          {`✅ ¡Correcto! ${vocab.hangul} = ${vocab.translation}`}
        </div>
      );
    }
    return (
      <div
        style={{
          marginTop: 12,
          padding: '10px 14px',
          borderRadius: 8,
          fontSize: 12,
          lineHeight: 1.6,
          background: 'rgba(220,53,69,0.05)',
          border: '1px solid rgba(220,53,69,0.15)',
          color: 'var(--wl-on-panel-alert, #dc3545)',
        }}
      >
        {`❌ La respuesta correcta es: ${correctValue}`}
      </div>
    );
  }

  function optionStyle(option: { value: string; label: string }): React.CSSProperties {
    const isSelected = selectedOption === option.value;
    const isCorrect = option.value === correctValue;

    const style: React.CSSProperties = {
      padding: '12px 16px',
      background: 'var(--wl-panel-raised, #fff)',
      border: '1.5px solid #e9ecef',
      borderRadius: 10,
      fontSize: 14,
      textAlign: 'left',
      cursor: isChecked ? 'default' : 'pointer',
      color: 'var(--wl-on-panel, #1a1a2e)',
      transition: 'all 0.15s',
    };

    if (!isChecked && isSelected) {
      style.border = '1.5px solid #6c63ff';
      style.background = 'rgba(108,99,255,0.06)';
    }
    if (isChecked && isSelected && !isCorrect) {
      style.border = '1.5px solid #dc3545';
      style.background = 'rgba(220,53,69,0.05)';
      style.color = '#dc3545';
    }
    if (isChecked && isCorrect) {
      style.border = '1.5px solid #2d9b4e';
      style.background = 'rgba(45,155,78,0.06)';
      style.color = '#2d9b4e';
    }
    if (currentLevel === 2 || currentLevel === 3) {
      style.fontFamily = "'Noto Sans KR', sans-serif";
      style.fontSize = 16;
    }
    return style;
  }

  function renderLevelSummary() {
    if (!levelComplete) return null;

    if (currentLevel === 4) {
      return (
        <article
          style={{
            background: 'var(--wl-panel-raised, #fff)',
            border: '1px solid #e9ecef',
            borderRadius: 16,
            padding: '2.5rem 2rem',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 8 }}>🎯</div>
          <h3 style={{ margin: '0 0 8px', fontSize: 24, color: 'var(--wl-on-panel, #1a1a2e)' }}>¡Reconocimiento completado!</h3>
          <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--wl-on-panel-soft, #6c757d)', lineHeight: 1.7 }}>
            Reconociste las 6 palabras en los 4 modos. Tu cerebro ya las tiene.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {RECOGNITION_VOCAB.map((item) => (
              <span
                key={item.id}
                style={{
                  background: 'rgba(108,99,255,0.08)',
                  border: '1px solid rgba(108,99,255,0.15)',
                  borderRadius: 100,
                  padding: '4px 12px',
                  fontFamily: "'Noto Sans KR', sans-serif",
                  color: 'var(--wl-on-panel-link, #6c63ff)',
                  fontSize: 15,
                }}
              >
                {item.hangul}
              </span>
            ))}
          </div>
        </article>
      );
    }

    const passed = currentScore >= 4;

    return (
      <article
        style={{
          background: 'var(--wl-panel-raised, #fff)',
          border: '1px solid #e9ecef',
          borderRadius: 16,
          padding: '2.5rem 2rem',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: 0, fontSize: 48, fontWeight: 700, color: 'var(--wl-on-panel-link, #6c63ff)' }}>{`${currentScore}/6`}</p>
        <p style={{ margin: '8px 0 24px', fontSize: 14, color: 'var(--wl-on-panel-soft, #6c757d)' }}>
          {passed ? '¡Bien hecho! Puedes continuar.' : 'Repasemos un poco más.'}
        </p>
        {passed ? (
          <button
            type="button"
            onClick={handleAdvanceLevel}
            style={{
              width: '100%',
              background: '#6c63ff',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 20px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Siguiente nivel →
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleRepeatLevel}
              style={{
                width: '100%',
                background: '#6c63ff',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 20px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Repetir nivel
            </button>
            <button
              type="button"
              onClick={handleAdvanceLevel}
              style={{
                marginTop: 12,
                background: 'transparent',
                border: 'none',
                color: '#adb5bd',
                fontSize: 12,
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Continuar de todas formas →
            </button>
          </>
        )}
      </article>
    );
  }

  if (!vocab && !levelComplete) {
    return (
      <section style={{ padding: '1rem' }}>
        <p style={{ margin: 0 }}>No hay contenido disponible para esta sección.</p>
      </section>
    );
  }

  if (finalComplete) {
    return (
      <section style={{ width: '100%', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>{renderLevelSummary()}</div>
      </section>
    );
  }

  const isLevelOne = currentLevel === 1;
  const isLevelTwo = currentLevel === 2;
  const isLevelThree = currentLevel === 3;
  const isLevelFour = currentLevel === 4;

  return (
    <section style={{ width: '100%', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <header style={{ marginBottom: 24 }}>
          <p
            style={{
              margin: '0 0 12px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontSize: 11,
              color: 'var(--wl-on-panel-soft, #6c757d)',
              fontWeight: 600,
            }}
          >
            Sección 3 de 11 · Reconocimiento
          </p>
        </header>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center' }}>
          {[1, 2, 3, 4].map((level) => (
            <span
              key={level}
              style={{ width: 32, height: 4, borderRadius: 2, background: levelDotColor(level) }}
              aria-hidden="true"
            />
          ))}
        </div>

        {!levelComplete ? (
          <>
            <div style={{ fontSize: 11, color: 'var(--wl-on-panel-soft, #6c757d)', textAlign: 'right', marginBottom: 6 }}>
              {`${currentItemIndex + 1} de 6`}
            </div>
            <div style={{ height: 3, background: 'var(--wl-panel-raised, #e9ecef)', borderRadius: 2, marginBottom: 16 }}>
              <div
                style={{
                  width: progressPercent(currentItemIndex),
                  height: '100%',
                  background: '#6c63ff',
                  borderRadius: 2,
                  transition: 'width 0.2s ease',
                }}
              />
            </div>

            <article
              style={{
                background: 'var(--wl-panel-raised, #fff)',
                border: '1px solid #e9ecef',
                borderRadius: 16,
                overflow: 'hidden',
                marginBottom: 16,
              }}
            >
              {vocab && (isLevelOne || isLevelTwo) && (
                <div style={{ height: 260, overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={vocab.img}
                    alt={vocab.translation}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(event) => { event.currentTarget.style.display = 'none'; }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 'auto 0 0 0',
                      height: 120,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.35))',
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px' }}>
                    {isLevelOne ? (
                      <>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 28,
                            fontWeight: 700,
                            color: '#fff',
                            fontFamily: "'Noto Sans KR', sans-serif",
                          }}
                        >
                          {vocab.hangul}
                        </p>
                        <p
                          style={{
                            margin: '2px 0 0',
                            fontSize: 12,
                            color: 'rgba(255,255,255,0.7)',
                            fontFamily: 'var(--mono)',
                          }}
                        >
                          {vocab.romanization}
                        </p>
                      </>
                    ) : (
                      <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff' }}>{vocab.translation}</p>
                    )}
                  </div>
                </div>
              )}

              {isLevelThree ? (
                <div
                  style={{
                    height: 180,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    background: 'var(--wl-panel-raised, #f8f9fa)',
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 64 }} aria-hidden="true">🔊</span>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--wl-on-panel-soft, #6c757d)' }}>Escucha la palabra</p>
                </div>
              ) : null}

              {isLevelFour && vocab ? (
                <div style={{ padding: '2.5rem 2rem', textAlign: 'center', background: 'var(--wl-panel-raised, #f8f9fa)' }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 52,
                      fontWeight: 700,
                      color: 'var(--wl-on-panel-link, #6c63ff)',
                      fontFamily: "'Noto Sans KR', sans-serif",
                    }}
                  >
                    {vocab.hangul}
                  </p>
                  <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--wl-on-panel-soft, #6c757d)' }}>{vocab.romanization}</p>
                </div>
              ) : null}

              {vocab && (isLevelOne || isLevelTwo || isLevelThree) && (
                <div
                  style={{
                    padding: '12px 20px',
                    display: 'flex',
                    gap: 8,
                    borderBottom: '1px solid #e9ecef',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => playAudio(vocab.hangul, 1)}
                    style={{
                      fontSize: 12,
                      color: 'var(--wl-on-panel-soft, #6c757d)',
                      background: 'var(--wl-panel-raised, #fff)',
                      border: '1px solid #e9ecef',
                      borderRadius: 100,
                      padding: '4px 12px',
                      cursor: 'pointer',
                    }}
                  >
                    🔊 Escuchar
                  </button>
                  <button
                    type="button"
                    onClick={() => playAudio(vocab.hangul, 0.5)}
                    style={{
                      fontSize: 12,
                      color: 'var(--wl-on-panel-soft, #6c757d)',
                      background: 'var(--wl-panel-raised, #fff)',
                      border: '1px solid #e9ecef',
                      borderRadius: 100,
                      padding: '4px 12px',
                      cursor: 'pointer',
                    }}
                  >
                    🐢 Lento
                  </button>
                </div>
              )}

              <div style={{ padding: 20 }}>
                <p style={{ margin: '0 0 14px', fontSize: 13, color: 'var(--wl-on-panel-soft, #6c757d)', fontWeight: 500 }}>
                  {isLevelOne && '¿Qué significa esta palabra?'}
                  {isLevelTwo && '¿Cómo se dice en coreano?'}
                  {isLevelThree && 'Escucha y elige la palabra correcta en coreano'}
                  {isLevelFour && '¿Cuál es la pronunciación correcta?'}
                </p>

                {!isLevelFour ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {optionSet.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        style={optionStyle(option)}
                        onClick={() => {
                          if (isChecked) return;
                          setSelectedOption(option.value);
                        }}
                        disabled={isChecked}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {optionSet.map((option, optIdx) => {
                      const isSelected = selectedOption === option.value;
                      const isCorrect = option.value === correctValue;

                      const audioStyle: React.CSSProperties = {
                        padding: '16px 12px',
                        background: 'var(--wl-panel-raised, #fff)',
                        border: `2px solid ${isChecked && isCorrect ? '#2d9b4e' : isChecked && isSelected && !isCorrect ? '#dc3545' : isSelected ? '#6c63ff' : '#e9ecef'}`,
                        borderRadius: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 6,
                        cursor: isChecked ? 'default' : 'pointer',
                        transition: 'all 0.15s',
                      };

                      return (
                        <button
                          key={option.value}
                          type="button"
                          style={audioStyle}
                          onClick={() => {
                            if (isChecked) return;
                            setSelectedOption(option.value);
                            playAudio(option.value, 1);
                          }}
                          disabled={isChecked}
                        >
                          <span style={{ fontSize: 24 }} aria-hidden="true">🔊</span>
                          <span
                            style={{
                              fontSize: isChecked ? 16 : 11,
                              color: isChecked
                                ? (isCorrect ? '#2d9b4e' : (isSelected && !isCorrect ? '#dc3545' : '#6c757d'))
                                : '#adb5bd',
                              fontFamily: isChecked ? "'Noto Sans KR', sans-serif" : 'inherit',
                            }}
                          >
                            {isChecked ? option.label : `Opción ${optIdx + 1}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {renderFeedback()}
              </div>

              <div style={{ padding: '0 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={skipLevel}
                  style={{
                    fontSize: 11,
                    color: '#adb5bd',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                  }}
                >
                  Saltar nivel
                </button>

                {!isChecked ? (
                  <button
                    type="button"
                    onClick={handleVerify}
                    disabled={!selectedOption}
                    style={{
                      background: selectedOption ? '#6c63ff' : '#e9ecef',
                      color: selectedOption ? '#fff' : '#adb5bd',
                      border: 'none',
                      borderRadius: 8,
                      padding: '10px 20px',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: selectedOption ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Verificar
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextItem}
                    style={{
                      background: '#6c63ff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '10px 20px',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
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
