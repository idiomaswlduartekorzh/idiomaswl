'use client';

import { useState } from 'react';
import { playAudio } from '@/lib/storage';
import { useSound } from '@/components/lesson/engine/useSound';

interface Phrase {
  kr: string;
  rom: string;
  es: string;
  audio: string;
}

const PHRASES: Phrase[] = [
  { kr: '어서 오세요',              rom: 'eo-seo o-se-yo',                              es: 'Bienvenido/a',                     audio: '어서 오세요' },
  { kr: '안녕하세요',               rom: 'an-nyeong-ha-se-yo',                          es: 'Hola (formal)',                    audio: '안녕하세요' },
  { kr: '아메리카노 한 잔 주세요',   rom: 'a-me-ri-ka-no han jan ju-se-yo',              es: 'Un americano, por favor',          audio: '아메리카노 한 잔 주세요' },
  { kr: '네, 금방 준비해 드릴게요',  rom: 'ne, geum-bang jun-bi-hae deu-ril-ge-yo',     es: 'Sí, lo preparo enseguida',         audio: '네, 금방 준비해 드릴게요' },
  { kr: '사이즈 뭐로 드릴까요',     rom: 'sa-i-jeu mwo-ro deu-ril-kka-yo',             es: '¿Qué tamaño le pongo?',            audio: '사이즈 뭐로 드릴까요' },
  { kr: '글자가 조금 작아요',       rom: 'geul-ja-ga jo-geum ja-ga-yo',                es: 'Las letras son un poco pequeñas',  audio: '글자가 조금 작아요' },
  { kr: '스몰, 미디엄, 라지 있어요', rom: 'seu-mol, mi-di-eom, la-ji i-sseo-yo',        es: 'Tenemos pequeño, mediano, grande', audio: '스몰, 미디엄, 라지 있어요' },
  { kr: '여기 있습니다',            rom: 'yeo-gi it-seum-ni-da',                        es: 'Aquí tiene',                       audio: '여기 있습니다' },
  { kr: '감사합니다',               rom: 'gam-sa-ham-ni-da',                            es: 'Gracias',                          audio: '감사합니다' },
  { kr: '이름이 뭐예요',            rom: 'i-reu-mi mwo-ye-yo',                          es: '¿Cómo te llamas?',                 audio: '이름이 뭐예요' },
  { kr: '저는 하은이에요',          rom: 'jeo-neun ha-eu-ni-e-yo',                      es: 'Me llamo Haeun',                   audio: '저는 하은이에요' },
];

const QUIZ_COUNT = 5;

function getQuizQuestions(phrases: Phrase[]) {
  // Pick 5 random phrases, shuffle
  const shuffled = [...phrases].sort(() => Math.random() - 0.5).slice(0, QUIZ_COUNT);
  return shuffled.map(target => {
    const distractors = phrases.filter(p => p.kr !== target.kr).sort(() => Math.random() - 0.5).slice(0, 2);
    const options = [target, ...distractors].sort(() => Math.random() - 0.5).map(p => p.es);
    return { kr: target.kr, audio: target.audio, correct: target.es, options };
  });
}

interface QuizQuestion {
  kr: string;
  audio: string;
  correct: string;
  options: string[];
}

interface Props {
  onComplete?: () => void;
}

export default function Recognition003({ onComplete }: Props) {
  const [phase, setPhase] = useState<'cards' | 'quiz' | 'complete'>('cards');
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [cardIndex, setCardIndex] = useState(0);

  // Quiz state
  const [quizQuestions] = useState<QuizQuestion[]>(() => getQuizQuestions(PHRASES));
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const { correct: playCorrect, wrong: playWrong, complete: playComplete } = useSound();

  const allFlipped = flipped.size === PHRASES.length;
  const currentPhrase = PHRASES[cardIndex];
  const isFlipped = flipped.has(cardIndex);
  const progressPct = (flipped.size / PHRASES.length) * 100;

  function flipCard() {
    if (!isFlipped) {
      setFlipped(prev => new Set([...prev, cardIndex]));
      playAudio(currentPhrase.audio);
    }
  }

  function goToCard(next: number) {
    setCardIndex(Math.max(0, Math.min(PHRASES.length - 1, next)));
  }

  function selectQuizAnswer(opt: string) {
    const q = quizQuestions[quizIndex];
    if (quizAnswers[quizIndex] !== undefined) return;
    setQuizAnswers(prev => ({ ...prev, [quizIndex]: opt }));
    const isCorrect = opt === q.correct;
    if (isCorrect) {
      playCorrect();
      setQuizScore(s => s + 1);
    } else {
      playWrong();
    }

    // Advance after brief pause
    setTimeout(() => {
      if (quizIndex < QUIZ_COUNT - 1) {
        setQuizIndex(i => i + 1);
      } else {
        setQuizDone(true);
      }
    }, 900);
  }

  // ── Cards phase ────────────────────────────────────────────────────────────
  if (phase === 'cards') {
    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
          ETAPA 03 DE 11 · Reconocimiento
        </p>
        <h3 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>
          Frases de supervivencia — toca para revelar
        </h3>

        {/* Progress bar */}
        <div style={{ height: 5, background: 'var(--line-soft)', borderRadius: 3, marginBottom: 20 }}>
          <div style={{ height: '100%', width: `${progressPct}%`, background: '#6c63ff', borderRadius: 3, transition: 'width 0.3s' }} />
        </div>

        {/* Card */}
        <article
          style={{ background: 'var(--bg)', border: `1.5px solid ${isFlipped ? '#6c63ff' : 'var(--line-soft)'}`, borderRadius: 16, minHeight: 240, cursor: isFlipped ? 'default' : 'pointer', transition: 'all 0.2s', marginBottom: 16, overflow: 'hidden' }}
          onClick={!isFlipped ? flipCard : undefined}
        >
          {/* Front */}
          {!isFlipped && (
            <div style={{ padding: '40px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 240 }}>
              <p style={{ margin: '0 0 16px', fontSize: 36, fontWeight: 700, fontFamily: "'Noto Sans KR', sans-serif", color: 'var(--ink)', lineHeight: 1.2 }}>
                {currentPhrase.kr}
              </p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)', border: '1px solid var(--line-soft)', borderRadius: 100, padding: '4px 14px' }}>
                Toca para revelar
              </p>
            </div>
          )}

          {/* Back */}
          {isFlipped && (
            <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ margin: 0, fontSize: 32, fontWeight: 700, fontFamily: "'Noto Sans KR', sans-serif", color: '#6c63ff', lineHeight: 1.2 }}>
                {currentPhrase.kr}
              </p>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                {currentPhrase.rom}
              </p>
              <p style={{ margin: 0, fontSize: 18, fontWeight: 600, color: 'var(--ink)' }}>
                {currentPhrase.es}
              </p>
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <button
                  type="button"
                  onClick={() => playAudio(currentPhrase.audio, 1)}
                  style={{ background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 100, padding: '6px 14px', fontSize: 13, color: '#6c63ff', cursor: 'pointer' }}
                >
                  &#x1F50A; Escuchar
                </button>
                <button
                  type="button"
                  onClick={() => playAudio(currentPhrase.audio, 0.75)}
                  style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 100, padding: '6px 14px', fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}
                >
                  &#x1F422; Lento
                </button>
              </div>
            </div>
          )}
        </article>

        {/* Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <button
            type="button"
            onClick={() => goToCard(cardIndex - 1)}
            disabled={cardIndex === 0}
            style={{ background: cardIndex === 0 ? 'var(--bg-2)' : '#6c63ff', color: cardIndex === 0 ? 'var(--muted)' : '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: cardIndex === 0 ? 'not-allowed' : 'pointer' }}
          >
            ← Anterior
          </button>

          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            {cardIndex + 1} / {PHRASES.length} · {flipped.size} vistas
          </span>

          <button
            type="button"
            onClick={() => goToCard(cardIndex + 1)}
            disabled={cardIndex === PHRASES.length - 1}
            style={{ background: cardIndex === PHRASES.length - 1 ? 'var(--bg-2)' : '#6c63ff', color: cardIndex === PHRASES.length - 1 ? 'var(--muted)' : '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: cardIndex === PHRASES.length - 1 ? 'not-allowed' : 'pointer' }}
          >
            Siguiente →
          </button>
        </div>

        {/* Mini-quiz CTA */}
        {allFlipped && (
          <button
            type="button"
            onClick={() => setPhase('quiz')}
            style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            Mini-test de 5 preguntas →
          </button>
        )}
      </section>
    );
  }

  // ── Quiz phase ─────────────────────────────────────────────────────────────
  if (phase === 'quiz') {
    const q = quizQuestions[quizIndex];
    const picked = quizAnswers[quizIndex];

    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
          MINI-TEST · {quizIndex + 1} de {QUIZ_COUNT}
        </p>

        {/* Quiz progress */}
        <div style={{ height: 5, background: 'var(--line-soft)', borderRadius: 3, marginBottom: 20 }}>
          <div style={{ height: '100%', width: `${((quizIndex + (quizDone ? 1 : 0)) / QUIZ_COUNT) * 100}%`, background: '#6c63ff', borderRadius: 3, transition: 'width 0.3s' }} />
        </div>

        <article style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 16, padding: '24px 20px', marginBottom: 16 }}>
          {/* Korean phrase */}
          <p style={{ margin: '0 0 16px', fontSize: 28, fontWeight: 700, fontFamily: "'Noto Sans KR', sans-serif", color: 'var(--ink)', textAlign: 'center', lineHeight: 1.3 }}>
            {q.kr}
          </p>

          <button
            type="button"
            onClick={() => playAudio(q.audio)}
            style={{ display: 'block', margin: '0 auto 20px', background: 'rgba(108,99,255,0.07)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 100, padding: '5px 14px', fontSize: 12, color: '#6c63ff', cursor: 'pointer' }}
          >
            &#x1F50A; Escuchar
          </button>

          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>
            ¿Qué significa?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {q.options.map(opt => {
              const selected = picked === opt;
              const isCorrect = opt === q.correct;
              const showCorrect = picked !== undefined && isCorrect;
              const showWrong = picked !== undefined && selected && !isCorrect;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => selectQuizAnswer(opt)}
                  disabled={picked !== undefined}
                  style={{
                    padding: '12px 16px',
                    background: showCorrect ? 'rgba(45,155,78,0.08)' : showWrong ? 'rgba(220,53,69,0.06)' : selected ? 'rgba(108,99,255,0.07)' : 'var(--bg)',
                    border: `1.5px solid ${showCorrect ? '#2d9b4e' : showWrong ? '#dc3545' : selected ? '#6c63ff' : 'var(--line-soft)'}`,
                    borderRadius: 10,
                    fontSize: 14,
                    textAlign: 'left',
                    cursor: picked !== undefined ? 'default' : 'pointer',
                    color: showCorrect ? '#2d9b4e' : showWrong ? '#dc3545' : 'var(--ink)',
                    fontWeight: (showCorrect || showWrong) ? 600 : 400,
                    transition: 'all 0.12s',
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </article>

        {/* Final result */}
        {quizDone && (
          <div style={{ background: quizScore >= 4 ? 'rgba(45,155,78,0.07)' : 'rgba(108,99,255,0.06)', border: `1px solid ${quizScore >= 4 ? 'rgba(45,155,78,0.25)' : 'rgba(108,99,255,0.2)'}`, borderRadius: 12, padding: '16px', marginBottom: 12, textAlign: 'center' }}>
            <p style={{ margin: '0 0 4px', fontSize: 32, fontWeight: 800, color: quizScore >= 4 ? '#2d9b4e' : '#6c63ff' }}>{quizScore}/{QUIZ_COUNT}</p>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
              {quizScore === QUIZ_COUNT ? 'Perfecto. Reconoces todas las frases.' : quizScore >= 3 ? 'Muy bien. Ya te suenan.' : 'Sigue practicando — van a quedar.'}
            </p>
          </div>
        )}

        {quizDone && (
          <button
            type="button"
            onClick={() => { playComplete(); setPhase('complete'); onComplete?.(); }}
            style={{ width: '100%', padding: '13px', background: '#6c63ff', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            Continuar →
          </button>
        )}
      </section>
    );
  }

  // ── Complete ───────────────────────────────────────────────────────────────
  return (
    <section style={{ maxWidth: 520, margin: '0 auto', padding: '3rem 1rem', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>&#x2713;</div>
      <h3 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>
        Reconocimiento completado
      </h3>
      <p style={{ margin: '0 0 28px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
        Las 11 frases del café ya tienen forma en tu memoria. A por el video.
      </p>
      <button
        type="button"
        onClick={onComplete}
        style={{ width: '100%', padding: '14px', background: '#6c63ff', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
      >
        Siguiente etapa →
      </button>
    </section>
  );
}
