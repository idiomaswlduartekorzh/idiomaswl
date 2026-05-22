'use client';

import { useEffect, useMemo, useState } from 'react';
import { playAudio } from '@/lib/storage';

// ── Vocab ─────────────────────────────────────────────────────────────────────
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
  // ── Recicladas del step001 ──────────────────────────────────────────────────
  {
    id: 'R0',
    hangul: '안녕하세요',
    romanization: 'an-nyeong-ha-se-yo',
    translation: 'Hola (formal)',
    isNew: false,
    distractors_es: ['Gracias', 'Encantado/a', '¿Qué tal?'],
    distractors_kr: ['감사합니다', '반갑습니다', '어때요?'],
    distractors_rom: ['gam-sa-ham-ni-da', 'ban-gap-seum-ni-da', 'eo-ttae-yo'],
  },
  {
    id: 'R0b',
    hangul: '감사합니다',
    romanization: 'gam-sa-ham-ni-da',
    translation: 'Gracias',
    isNew: false,
    distractors_es: ['Hola (formal)', 'Encantado/a', 'Está bien'],
    distractors_kr: ['안녕하세요', '반갑습니다', '좋아요'],
    distractors_rom: ['an-nyeong-ha-se-yo', 'ban-gap-seum-ni-da', 'jo-a-yo'],
  },
  // ── Recicladas del step002 ──────────────────────────────────────────────────
  {
    id: 'R0c',
    hangul: '없어요',
    romanization: 'eop-sseo-yo',
    translation: 'no hay / no tiene',
    isNew: false,
    distractors_es: ['hay / tiene', 'es / soy', 'también'],
    distractors_kr: ['있어요', '이에요', '도'],
    distractors_rom: ['i-sseo-yo', 'i-e-yo', 'do'],
  },
  // ── Recicladas del step003 ──────────────────────────────────────────────────
  {
    id: 'R1',
    hangul: '이에요 / 예요',
    romanization: 'i-e-yo / ye-yo',
    translation: 'soy / es (cópula)',
    isNew: false,
    distractors_es: ['hay / existe', 'no hay', '¿Qué tal?'],
    distractors_kr: ['있어요', '없어요', '어때요?'],
    distractors_rom: ['i-sseo-yo', 'eop-sseo-yo', 'eo-ttae-yo'],
  },
  {
    id: 'R2',
    hangul: '커피',
    romanization: 'keo-pi',
    translation: 'café (la bebida)',
    isNew: false,
    distractors_es: ['universidad', 'persona', 'también'],
    distractors_kr: ['대학교', '사람', '도'],
    distractors_rom: ['dae-hak-gyo', 'sa-ram', 'do'],
  },
  {
    id: 'R3',
    hangul: '있어요',
    romanization: 'i-sseo-yo',
    translation: 'hay / tiene / existe',
    isNew: false,
    distractors_es: ['no hay / no tiene', 'soy / es', '¿Cómo es?'],
    distractors_kr: ['없어요', '이에요', '어때요?'],
    distractors_rom: ['eop-sseo-yo', 'i-e-yo', 'eo-ttae-yo'],
  },
  {
    id: 'R4',
    hangul: '저는',
    romanization: 'jeo-neun',
    translation: 'yo (modesto/formal)',
    isNew: false,
    distractors_es: ['él / ella', 'tú (formal)', 'nosotros'],
    distractors_kr: ['그는', '당신은', '우리는'],
    distractors_rom: ['geu-neun', 'dang-sin-eun', 'u-ri-neun'],
  },
  // ── Nuevas del step006 ──────────────────────────────────────────────────────
  {
    id: 'N1',
    hangul: '새로 왔어요?',
    romanization: 'sae-ro wa-sseo-yo?',
    translation: '¿Eres nuevo/a?',
    isNew: true,
    distractors_es: ['Encantado de conocerte', '¿De dónde eres?', '¿Cómo estás?'],
    distractors_kr: ['반갑습니다', '어느 나라 사람이에요?', '어떻게 지내요?'],
    distractors_rom: ['ban-gap-seum-ni-da', 'eo-neu na-ra sa-ra-mi-e-yo', 'eo-tteo-ke ji-nae-yo'],
  },
  {
    id: 'N2',
    hangul: '사람',
    romanization: 'sa-ram',
    translation: 'persona / gente',
    isNew: true,
    distractors_es: ['universidad', 'café', 'amigo'],
    distractors_kr: ['대학교', '커피', '친구'],
    distractors_rom: ['dae-hak-gyo', 'keo-pi', 'chin-gu'],
  },
  {
    id: 'N3',
    hangul: '반갑습니다',
    romanization: 'ban-gap-seum-ni-da',
    translation: 'Encantado/a de conocerte',
    isNew: true,
    distractors_es: ['Hola (formal)', 'Gracias', '¿Eres nuevo/a?'],
    distractors_kr: ['안녕하세요', '감사합니다', '새로 왔어요?'],
    distractors_rom: ['an-nyeong-ha-se-yo', 'gam-sa-ham-ni-da', 'sae-ro wa-sseo-yo'],
  },
  {
    id: 'N4',
    hangul: '커피 마실래요?',
    romanization: 'keo-pi ma-sil-rae-yo?',
    translation: '¿Quieres tomar un café?',
    isNew: true,
    distractors_es: ['¿Cómo es el café?', 'Un café por favor', '¿Hay café?'],
    distractors_kr: ['카페 어때요?', '아메리카노 주세요', '커피 있어요?'],
    distractors_rom: ['ka-pe eo-ttae-yo', 'a-me-ri-ka-no ju-se-yo', 'keo-pi i-sseo-yo'],
  },
  {
    id: 'N5',
    hangul: '어때요?',
    romanization: 'eo-ttae-yo?',
    translation: '¿Cómo es? / ¿Qué tal?',
    isNew: true,
    distractors_es: ['¿Quieres beber?', 'Está bien', '¿Eres nuevo?'],
    distractors_kr: ['마실래요?', '좋아요', '새로 왔어요?'],
    distractors_rom: ['ma-sil-rae-yo', 'jo-a-yo', 'sae-ro wa-sseo-yo'],
  },
  {
    id: 'N6',
    hangul: '많아요',
    romanization: 'ma-na-yo',
    translation: 'hay muchos/as',
    isNew: true,
    distractors_es: ['no hay', 'está bien', 'es amable'],
    distractors_kr: ['없어요', '좋아요', '친절해요'],
    distractors_rom: ['eop-sseo-yo', 'jo-a-yo', 'chin-jeol-hae-yo'],
  },
  {
    id: 'N7',
    hangul: '좋아요',
    romanization: 'jo-a-yo',
    translation: 'está bien / me gusta',
    isNew: true,
    distractors_es: ['hay muchos', 'encantado', '¿Qué tal?'],
    distractors_kr: ['많아요', '반갑습니다', '어때요?'],
    distractors_rom: ['ma-na-yo', 'ban-gap-seum-ni-da', 'eo-ttae-yo'],
  },
  {
    id: 'N8',
    hangul: '저는 민수예요',
    romanization: 'jeo-neun min-su-ye-yo',
    translation: 'Soy Minsu',
    isNew: true,
    distractors_es: ['Soy colombiano/a', 'Me llamo David', '¿Cómo te llamas?'],
    distractors_kr: ['콜롬비아 사람이에요', '저는 데이비드예요', '이름이 뭐예요?'],
    distractors_rom: ['kol-lom-bi-a sa-ra-mi-e-yo', 'jeo-neun de-i-bi-deu-ye-yo', 'i-reu-mi mwo-ye-yo'],
  },
  {
    id: 'N9',
    hangul: '콜롬비아 사람이에요',
    romanization: 'kol-lom-bi-a sa-ra-mi-e-yo',
    translation: 'Soy colombiano/a',
    isNew: true,
    distractors_es: ['Soy coreano/a', 'Soy nuevo/a', 'Encantado/a'],
    distractors_kr: ['한국 사람이에요', '새로 왔어요', '반갑습니다'],
    distractors_rom: ['han-guk sa-ra-mi-e-yo', 'sae-ro wa-sseo-yo', 'ban-gap-seum-ni-da'],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

type QuestionType = 'kr→es' | 'es→kr';

interface Question {
  vocab: VocabEntry;
  type: QuestionType;
  options: string[];
  correct: string;
}

function buildQuestions(): Question[] {
  return VOCAB.map((vocab) => {
    const type: QuestionType = Math.random() < 0.5 ? 'kr→es' : 'es→kr';
    if (type === 'kr→es') {
      return {
        vocab,
        type,
        options: shuffle([vocab.translation, ...vocab.distractors_es]),
        correct: vocab.translation,
      };
    }
    return {
      vocab,
      type,
      options: shuffle([vocab.hangul, ...vocab.distractors_kr]),
      correct: vocab.hangul,
    };
  });
}

interface Props {
  onComplete?: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Recognition006({ onComplete }: Props) {
  const [questions] = useState<Question[]>(() => buildQuestions());
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);

  const total = questions.length;
  const question = questions[questionIndex] as Question | undefined;

  // Auto-play audio when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsChecked(false);
    setShake(false);
    if (!question) return undefined;
    const t = window.setTimeout(() => playAudio(question.vocab.hangul, 1), 500);
    return () => window.clearTimeout(t);
  }, [questionIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Option style ───────────────────────────────────────────────────────────
  const optionStyle = useMemo(() => {
    return (opt: string): React.CSSProperties => {
      const isSelected = selectedOption === opt;
      const isCorrect = question ? opt === question.correct : false;
      const base: React.CSSProperties = {
        padding: '12px 16px',
        background: 'var(--bg)',
        border: '1.5px solid var(--line-soft)',
        borderRadius: 10,
        fontSize: 13,
        textAlign: 'left',
        cursor: isChecked ? 'default' : 'pointer',
        color: 'var(--ink)',
        transition: 'all 0.15s',
        fontFamily: question?.type === 'es→kr' ? "'Noto Sans KR', sans-serif" : 'inherit',
      };
      if (!isChecked && isSelected) { base.border = '1.5px solid #6c63ff'; base.background = 'rgba(108,99,255,0.06)'; }
      if (isChecked && isSelected && !isCorrect) { base.border = '1.5px solid #dc3545'; base.background = 'rgba(220,53,69,0.05)'; base.color = '#dc3545'; }
      if (isChecked && isCorrect) { base.border = '1.5px solid #2d9b4e'; base.background = 'rgba(45,155,78,0.06)'; base.color = '#2d9b4e'; }
      return base;
    };
  }, [selectedOption, isChecked, question]);

  // ── Actions ────────────────────────────────────────────────────────────────
  function handleSelect(opt: string) {
    if (isChecked) return;
    setSelectedOption(opt);
  }

  function handleVerify() {
    if (!selectedOption || isChecked || !question) return;
    setIsChecked(true);
    if (selectedOption === question.correct) {
      setScore(s => s + 1);
      // Auto-advance after 700ms on correct
      window.setTimeout(() => {
        if (questionIndex < total - 1) {
          setQuestionIndex(i => i + 1);
        } else {
          setDone(true);
        }
      }, 700);
    } else {
      // Shake and stay
      setShake(true);
      window.setTimeout(() => {
        setShake(false);
        setIsChecked(false);
        setSelectedOption(null);
      }, 800);
    }
  }

  // ── Final screen ───────────────────────────────────────────────────────────
  if (done) {
    const tierMsg = score >= 11
      ? '¡Listo para las escenas! 🎬'
      : score >= 8
      ? '¡Muy bien! Estás preparado'
      : 'Buen intento — el oído se entrena';

    return (
      <section style={{ width: '100%', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <article style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 16, padding: '2.5rem 2rem', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🎬</div>
            <p style={{ margin: '0 0 4px', fontSize: 36, fontWeight: 800, color: '#6c63ff' }}>{score}/{total}</p>
            <p style={{ margin: '0 0 20px', fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
              {tierMsg}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
              {VOCAB.map((v) => (
                <span key={v.id} style={{
                  background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.15)',
                  borderRadius: 100, padding: '4px 12px', fontFamily: "'Noto Sans KR', sans-serif",
                  color: '#6c63ff', fontSize: 14,
                }}>
                  {v.hangul}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={onComplete}
              style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              Ver las escenas →
            </button>
          </article>
        </div>
      </section>
    );
  }

  if (!question) return null;

  const promptText = question.type === 'kr→es'
    ? '¿Qué significa esta frase?'
    : '¿Cómo se dice en coreano?';

  return (
    <section style={{ width: '100%', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>

        {/* Header */}
        <header style={{ marginBottom: 16 }}>
          <p style={{ margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: 10, color: 'var(--muted)', fontWeight: 700 }}>
            ETAPA 03 DE 11 · Reconocimiento
          </p>
          <h2 style={{ margin: '0 0 2px', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>
            Prepárate para entender las escenas
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
            Estas palabras aparecen en los videos del día
          </p>
        </header>

        {/* Score chip + progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>
            {questionIndex + 1} de {total}
          </span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#6c63ff', background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.15)', borderRadius: 100, padding: '2px 10px' }}>
            {score} correctas
          </span>
        </div>
        <div style={{ height: 3, background: 'var(--line-soft)', borderRadius: 2, marginBottom: 16 }}>
          <div style={{ width: `${(questionIndex / total) * 100}%`, height: '100%', background: '#6c63ff', borderRadius: 2, transition: 'width 0.2s ease' }} />
        </div>

        {/* Question card */}
        <article
          className={shake ? 'recognition-shake' : undefined}
          style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}
        >
          {/* Stimulus */}
          <div style={{ padding: '28px 24px 0', textAlign: 'center' }}>
            {/* Badge */}
            {question.vocab.isNew ? (
              <span style={{ display: 'inline-block', marginBottom: 10, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', background: '#6c63ff', borderRadius: 100, padding: '3px 10px' }}>
                Nuevo
              </span>
            ) : (
              <span style={{ display: 'inline-block', marginBottom: 10, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2d9b4e', background: 'rgba(45,155,78,0.1)', border: '1px solid rgba(45,155,78,0.25)', borderRadius: 100, padding: '3px 10px' }}>
                Reciclado
              </span>
            )}

            {question.type === 'kr→es' ? (
              <>
                <p style={{ margin: '0 0 4px', fontSize: 30, fontWeight: 700, fontFamily: "'Noto Sans KR', sans-serif", color: 'var(--ink)', lineHeight: 1.3 }}>
                  {question.vocab.hangul}
                </p>
                <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                  {question.vocab.romanization}
                </p>
              </>
            ) : (
              <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>
                {question.vocab.translation}
              </p>
            )}
          </div>

          {/* Audio buttons */}
          <div style={{ padding: '12px 20px', display: 'flex', gap: 8, borderBottom: '1px solid var(--line-soft)' }}>
            <button
              type="button"
              onClick={() => playAudio(question.vocab.hangul, 1)}
              style={{ fontSize: 12, color: 'var(--muted)', background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 100, padding: '4px 12px', cursor: 'pointer' }}
            >
              🔊 Escuchar
            </button>
            <button
              type="button"
              onClick={() => playAudio(question.vocab.hangul, 0.65)}
              style={{ fontSize: 12, color: 'var(--muted)', background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 100, padding: '4px 12px', cursor: 'pointer' }}
            >
              🐢 Lento
            </button>
          </div>

          {/* Options */}
          <div style={{ padding: 20 }}>
            <p style={{ margin: '0 0 14px', fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>
              {promptText}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {question.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  style={optionStyle(opt)}
                  disabled={isChecked}
                  onClick={() => handleSelect(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Feedback */}
            {isChecked && selectedOption === question.correct && (
              <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, fontSize: 12, lineHeight: 1.6, background: 'rgba(45,155,78,0.06)', border: '1px solid rgba(45,155,78,0.2)', color: '#2d9b4e' }}>
                ✅ ¡Correcto! — {question.vocab.romanization}
              </div>
            )}
          </div>

          {/* Verify button */}
          <div style={{ padding: '0 20px 20px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={handleVerify}
              disabled={!selectedOption || isChecked}
              style={{ background: selectedOption && !isChecked ? '#6c63ff' : 'var(--line-soft)', color: selectedOption && !isChecked ? '#fff' : '#adb5bd', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: selectedOption && !isChecked ? 'pointer' : 'not-allowed' }}
            >
              Verificar
            </button>
          </div>
        </article>

        <style>{`
          @keyframes recognition-shake {
            0%,100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-6px); }
            80% { transform: translateX(6px); }
          }
          .recognition-shake { animation: recognition-shake 0.4s ease; }
        `}</style>
      </div>
    </section>
  );
}
