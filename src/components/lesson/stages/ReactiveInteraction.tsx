'use client';

import { useEffect, useMemo, useState } from 'react';
import { playAudio, KR_IMG } from '@/lib/storage';

interface ScenarioOption {
  text: string;
  correct: boolean;
}

interface Scenario {
  id: string;
  img: string;
  contextES: string;
  speaker: string;
  speakerRegister: string;
  speakerAvatar: string;
  question: string;
  questionAudio: string | null;
  questionTranslation: string | null;
  isYouAsk?: boolean;
  options: ScenarioOption[];
  correctAudio: string;
  explanation: string;
  whyWrong: Record<string, string>;
  correctTranslation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'S1',
    img: KR_IMG.school,
    contextES: 'Tu amigo te pregunta adónde vas.',
    speaker: 'Amigo',
    speakerRegister: 'casual',
    speakerAvatar: '👦',
    question: '어디 가요?',
    questionAudio: '어디 가요?',
    questionTranslation: '¿Adónde vas?',
    options: [
      { text: '저는 학교에 가요.', correct: true },
      { text: '어디', correct: false },
      { text: '학교', correct: false },
    ],
    correctAudio: '어디 가요?',
    explanation: 'Una respuesta completa tiene lugar + acción. ¡Bien usado el formal!',
    whyWrong: {
      '어디': 'Solo repetir "dónde" no responde la pregunta.',
      '학교': 'Falta la partícula 에 y el verbo. Sin ellos la frase está incompleta.',
    },
    correctTranslation: 'Yo voy a la escuela.',
  },
  {
    id: 'S2',
    img: KR_IMG.university,
    contextES: 'Alguien que acabas de conocer te pregunta adónde vas.',
    speaker: 'Desconocido',
    speakerRegister: 'formal',
    speakerAvatar: '🧑',
    question: '어디 가요?',
    questionAudio: '어디 가요?',
    questionTranslation: '¿Adónde vas?',
    options: [
      { text: '집에', correct: false },
      { text: '저는 대학교에 가요.', correct: true },
      { text: '어디 가요?', correct: false },
    ],
    correctAudio: '저는 대학교에 가요',
    explanation: 'Usaste la forma formal (저는). Perfecto para alguien que acabas de conocer.',
    whyWrong: {
      '집에': 'Solo el lugar sin verbo. La respuesta queda incompleta.',
      '어디 가요?': 'Eso es una pregunta, no una respuesta.',
    },
    correctTranslation: 'Yo voy a la universidad.',
  },
  {
    id: 'S3',
    img: KR_IMG.home,
    contextES: 'Tu amigo íntimo te pregunta adónde vas.',
    speaker: 'Amigo íntimo',
    speakerRegister: 'casual',
    speakerAvatar: '😄',
    question: '어디 가요?',
    questionAudio: '어디 가요?',
    questionTranslation: '¿Adónde vas?',
    options: [
      { text: '나는 집에 가요.', correct: true },
      { text: '저는 집에 가요.', correct: false },
      { text: '집', correct: false },
    ],
    correctAudio: '집에 가요',
    explanation: '나는 es la forma casual. Con amigos íntimos suena más natural que 저는.',
    whyWrong: {
      '저는 집에 가요.': 'Correcto gramaticalmente, pero 저는 suena muy formal con un amigo íntimo.',
      '집': 'Solo la palabra sin partícula ni verbo. No es una respuesta completa.',
    },
    correctTranslation: 'Yo voy a casa. (casual)',
  },
  {
    id: 'S4',
    img: KR_IMG.whereGoing,
    contextES: 'Una persona mayor te pregunta adónde vas. Debes ser respetuoso.',
    speaker: 'Persona mayor',
    speakerRegister: 'formal',
    speakerAvatar: '👴',
    question: '어디 가요?',
    questionAudio: '어디 가요?',
    questionTranslation: '¿Adónde vas?',
    options: [
      { text: '대학교에', correct: false },
      { text: '나는 대학교에 가요.', correct: false },
      { text: '저는 대학교에 가요.', correct: true },
    ],
    correctAudio: '저는 대학교에 가요',
    explanation: 'Con una persona mayor siempre usas 저는 (formal). Nunca 나는 en este contexto.',
    whyWrong: {
      '대학교에': 'Falta el ejecutor y el verbo. Respuesta incompleta.',
      '나는 대학교에 가요.': '나는 es casual. Con una persona mayor siempre usas 저는.',
    },
    correctTranslation: 'Yo voy a la universidad. (formal — con respeto)',
  },
  {
    id: 'S5',
    img: KR_IMG.going,
    contextES: 'Ves a tu amigo caminando rápido. Quieres preguntarle adónde va.',
    speaker: 'Tú preguntas',
    speakerRegister: 'tú',
    speakerAvatar: '🙋',
    question: '¿Cómo le preguntas adónde va?',
    questionAudio: null,
    questionTranslation: null,
    isYouAsk: true,
    options: [
      { text: '어디 가요?', correct: true },
      { text: '저는 가요.', correct: false },
      { text: '학교에?', correct: false },
    ],
    correctAudio: '어디 가요?',
    explanation: '어디 가요? es literalmente "¿Adónde vas?" — la primera pregunta que puedes hacer en coreano.',
    whyWrong: {
      '저는 가요.': 'Eso dice "yo voy" — estás respondiendo, no preguntando.',
      '학교에?': 'Subir la entonación no funciona igual que en español. Necesitas 어디 para preguntar.',
    },
    correctTranslation: '¿Adónde vas?',
  },
];

function scoreMessage(score: number) {
  if (score === 5) return '🏆 Perfecto. Reaccionas como un hablante nativo.';
  if (score === 4) return '⭐ Casi perfecto. Ya manejas el contexto social.';
  if (score === 3) return '👍 Bien. El registro formal/casual se instala con práctica.';
  return '💪 Sigue practicando. El contexto social es lo más sutil del idioma.';
}

interface Props {
  onComplete?: () => void;
}

export default function ReactiveInteraction({ onComplete }: Props) {
  const [phase, setPhase] = useState<'intro' | 'scenarios' | 'complete'>('intro');
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [autoPlayedQuestion, setAutoPlayedQuestion] = useState<Set<number>>(() => new Set());

  const scenario = SCENARIOS[currentScenario] ?? null;
  const correctOption = useMemo(() => scenario?.options.find((option) => option.correct)?.text ?? '', [scenario?.id]);
  const isAnswerCorrect = isChecked && selectedOption === correctOption;

  useEffect(() => {
    if (phase !== 'scenarios' || !scenario || scenario.isYouAsk || !scenario.questionAudio) return;
    if (autoPlayedQuestion.has(currentScenario)) return;
    const timer = setTimeout(() => {
      if (scenario.questionAudio) playAudio(scenario.questionAudio, 1);
      setAutoPlayedQuestion((prev) => { const next = new Set(prev); next.add(currentScenario); return next; });
    }, 600);
    return () => clearTimeout(timer);
  }, [phase, currentScenario, scenario?.id, scenario?.questionAudio, scenario?.isYouAsk, autoPlayedQuestion]);

  useEffect(() => {
    setSelectedOption(null);
    setIsChecked(false);
  }, [currentScenario, phase]);

  function handleVerify() {
    if (!selectedOption || isChecked || !scenario) return;
    const isCorrectChoice = selectedOption === correctOption;
    setIsChecked(true);
    if (isCorrectChoice) setScore((prev) => prev + 1);
  }

  function handleNext() {
    if (!scenario) return;
    if (currentScenario >= SCENARIOS.length - 1) { setPhase('complete'); onComplete?.(); return; }
    setCurrentScenario((prev) => prev + 1);
  }

  if (phase === 'intro') {
    return (
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1rem', animation: 'fadeIn 0.3s ease' }}>
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--wl-on-panel-link, #6c63ff)', fontWeight: 700 }}>
          SECCIÓN 9 DE 11
        </p>
        <h3 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 700, color: 'var(--wl-on-panel, #1a1a2e)' }}>Interacción reactiva</h3>
        <p style={{ margin: '0 0 24px', fontSize: 13, color: 'var(--wl-on-panel-soft, #6c757d)', lineHeight: 1.7 }}>
          Responde como si estuvieras en una conversación real y breve. Una respuesta completa tiene lugar + acción.
        </p>

        <div style={{ marginBottom: 18 }}>
          {[
            { icon: '💬', text: 'Escucha la pregunta antes de responder.' },
            { icon: '🎯', text: 'Una respuesta completa tiene lugar + acción.' },
            { icon: '👥', text: 'El registro cambia según con quién hablas: formal o casual.' },
          ].map((rule) => (
            <article key={rule.text} style={{ display: 'flex', gap: 10, alignItems: 'center', background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderRadius: 10, padding: '10px 14px', marginBottom: 8 }}>
              <span style={{ fontSize: 16 }}>{rule.icon}</span>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--wl-on-panel, #1a1a2e)' }}>{rule.text}</p>
            </article>
          ))}
        </div>

        <p style={{ margin: '0 0 20px', textAlign: 'center', fontSize: 12, color: 'var(--wl-on-panel-soft, #6c757d)' }}>5 conversaciones</p>

        <button
          type="button"
          onClick={() => setPhase('scenarios')}
          style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          Comenzar →
        </button>
      </section>
    );
  }

  if (phase === 'scenarios' && scenario) {
    return (
      <section key={`scenario-${scenario.id}`} style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1rem', animation: 'fadeIn 0.3s ease' }}>
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }`}</style>
        <p style={{ margin: '0 0 4px', fontSize: 11, color: 'var(--wl-on-panel-soft, #6c757d)', textAlign: 'right' }}>{`${currentScenario + 1} de ${SCENARIOS.length}`}</p>
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, justifyContent: 'center' }}>
          {SCENARIOS.map((item, index) => {
            const done = index < currentScenario;
            const active = index === currentScenario;
            return (
              <div
                key={item.id}
                style={{ width: 10, height: 10, borderRadius: '50%', background: done ? '#2d9b4e' : active ? '#6c63ff' : '#e9ecef', transition: 'all 0.2s' }}
              />
            );
          })}
        </div>

        <article style={{ background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
            <img src={scenario.img} alt={scenario.contextES} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.65) 100%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100, padding: '4px 10px', marginBottom: 6 }}>
                <span style={{ fontSize: 16 }}>{scenario.speakerAvatar}</span>
                <span style={{ fontSize: 11, color: '#fff', fontWeight: 500 }}>{scenario.speaker}</span>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.75)' }}>
                  {scenario.speakerRegister === 'formal' ? '(formal)' : scenario.speakerRegister === 'casual' ? '(casual)' : '(tú hablas)'}
                </span>
              </span>
              <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{scenario.contextES}</p>
            </div>
          </div>

          <div style={{ padding: '16px 16px 0' }}>
            {!scenario.isYouAsk ? (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 4 }}>
                <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--wl-panel-raised, #f1f3f5)', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {scenario.speakerAvatar}
                </span>
                <div style={{ background: 'var(--wl-panel-raised, #f8f9fa)', borderRadius: '0 12px 12px 12px', padding: '10px 14px', flex: 1 }}>
                  <p style={{ margin: '0 0 2px', fontFamily: "'Noto Sans KR', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--wl-on-panel, #1a1a2e)' }}>
                    {scenario.question}
                    {scenario.questionAudio ? (
                      <button
                        type="button"
                        onClick={() => playAudio(scenario.questionAudio!, 1)}
                        style={{ marginLeft: 6, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 16 }}
                      >
                        🔊
                      </button>
                    ) : null}
                  </p>
                  <p style={{ margin: 0, fontSize: 11, color: 'var(--wl-on-panel-soft, #6c757d)' }}>{scenario.questionTranslation}</p>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, flexDirection: 'row-reverse', marginBottom: 4 }}>
                <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--wl-panel-raised, #f1f3f5)', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  🙋
                </span>
                <div style={{ background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.15)', borderRadius: '12px 0 12px 12px', padding: '10px 14px' }}>
                  <p style={{ margin: 0, fontSize: 14, color: 'var(--wl-on-panel, #1a1a2e)', fontWeight: 500 }}>{scenario.question}</p>
                </div>
              </div>
            )}
          </div>

          <div style={{ padding: '12px 16px 16px' }}>
            <p style={{ margin: '0 0 10px', fontSize: 10, color: 'var(--wl-on-panel-soft, #6c757d)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Tu respuesta:</p>

            <div>
              {scenario.options.map((option) => {
                const selected = selectedOption === option.text;
                const correct = isChecked && option.correct;
                const wrongSelected = isChecked && selected && !option.correct;
                const revealCorrect = isChecked && !selected && option.correct && !isAnswerCorrect;
                return (
                  <div key={`${scenario.id}-${option.text}`} style={{ marginBottom: 8 }}>
                    <div
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: correct ? 'rgba(45,155,78,0.06)' : wrongSelected ? 'rgba(220,53,69,0.05)' : selected ? 'rgba(108,99,255,0.06)' : revealCorrect ? 'rgba(45,155,78,0.04)' : '#fff',
                        border: `1.5px ${revealCorrect ? 'dashed' : 'solid'} ${correct ? '#2d9b4e' : wrongSelected ? '#dc3545' : selected ? '#6c63ff' : revealCorrect ? '#2d9b4e' : '#e9ecef'}`,
                        borderRadius: 10,
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        color: correct ? '#2d9b4e' : wrongSelected ? '#dc3545' : '#1a1a2e',
                        fontFamily: option.text.match(/[가-힣]/) ? "'Noto Sans KR', sans-serif" : 'inherit',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => { if (isChecked) return; setSelectedOption(option.text); }}
                        style={{ flex: 1, border: 'none', background: 'transparent', textAlign: 'left', padding: 0, cursor: isChecked ? 'default' : 'pointer', color: 'inherit', fontFamily: 'inherit', fontSize: 16, display: 'flex', alignItems: 'center', gap: 10 }}
                        disabled={isChecked}
                      >
                        <span style={{ fontSize: 12, color: 'var(--wl-on-panel-soft, #6c757d)' }}>→</span>
                        <span style={{ flex: 1 }}>{option.text}</span>
                      </button>
                      {!scenario.isYouAsk ? (
                        <button
                          type="button"
                          onClick={() => playAudio(option.text, 1)}
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 14, color: 'var(--wl-on-panel-soft, #6c757d)' }}
                        >
                          🔊
                        </button>
                      ) : null}
                      {correct ? <span style={{ color: 'var(--wl-on-panel-ok, #2d9b4e)', fontWeight: 700 }}>✓</span> : null}
                      {wrongSelected ? <span style={{ color: 'var(--wl-on-panel-alert, #dc3545)', fontWeight: 700 }}>✗</span> : null}
                    </div>
                  </div>
                );
              })}
            </div>

            {isChecked ? (
              <div style={{ background: isAnswerCorrect ? 'rgba(45,155,78,0.06)' : 'rgba(220,53,69,0.05)', border: `1px solid ${isAnswerCorrect ? 'rgba(45,155,78,0.2)' : 'rgba(220,53,69,0.15)'}`, borderRadius: 12, padding: 16, marginBottom: 12, animation: 'fadeIn 0.3s ease' }}>
                {isAnswerCorrect ? (
                  <>
                    <p style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 700, color: 'var(--wl-on-panel-ok, #2d9b4e)' }}>✅ ¡Correcto!</p>
                    <p style={{ margin: '0 0 10px', fontSize: 13, color: 'var(--wl-on-panel, #1a1a2e)', lineHeight: 1.6 }}>{scenario.explanation}</p>
                    <p style={{ margin: '0 0 2px', fontFamily: "'Noto Sans KR', sans-serif", fontSize: 20, color: 'var(--wl-on-panel-ok, #2d9b4e)', fontWeight: 700 }}>{correctOption}</p>
                    <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--wl-on-panel-soft, #6c757d)' }}>{scenario.correctTranslation}</p>
                    <button
                      type="button"
                      onClick={() => playAudio(scenario.correctAudio, 1)}
                      style={{ background: 'rgba(45,155,78,0.1)', border: '1px solid rgba(45,155,78,0.2)', borderRadius: 100, padding: '4px 12px', fontSize: 11, color: 'var(--wl-on-panel-ok, #2d9b4e)', cursor: 'pointer' }}
                    >
                      🔊 Escuchar de nuevo
                    </button>
                  </>
                ) : (
                  <>
                    <p style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 700, color: 'var(--wl-on-panel-alert, #dc3545)' }}>❌ No exactamente</p>
                    <div style={{ background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderRadius: 8, padding: '8px 12px', marginBottom: 8 }}>
                      <p style={{ margin: '0 0 4px', fontSize: 10, color: 'var(--wl-on-panel-soft, #6c757d)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Por qué no:</p>
                      <p style={{ margin: 0, fontSize: 12, color: 'var(--wl-on-panel-alert, #dc3545)' }}>{selectedOption ? (scenario.whyWrong[selectedOption] ?? 'No es la forma más funcional en este contexto.') : ''}</p>
                    </div>
                    <p style={{ margin: '0 0 4px', fontSize: 10, color: 'var(--wl-on-panel-soft, #6c757d)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>La respuesta completa es:</p>
                    <p style={{ margin: '0 0 2px', fontFamily: "'Noto Sans KR', sans-serif", fontSize: 20, color: 'var(--wl-on-panel-ok, #2d9b4e)', fontWeight: 700 }}>{correctOption}</p>
                    <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--wl-on-panel-soft, #6c757d)' }}>{scenario.correctTranslation}</p>
                    <button
                      type="button"
                      onClick={() => playAudio(scenario.correctAudio, 1)}
                      style={{ background: 'rgba(45,155,78,0.1)', border: '1px solid rgba(45,155,78,0.2)', borderRadius: 100, padding: '4px 12px', fontSize: 11, color: 'var(--wl-on-panel-ok, #2d9b4e)', cursor: 'pointer' }}
                    >
                      🔊 Escuchar respuesta correcta
                    </button>
                  </>
                )}
              </div>
            ) : null}

            {!isChecked ? (
              <button
                type="button"
                onClick={handleVerify}
                disabled={!selectedOption}
                style={{ width: '100%', background: selectedOption ? '#6c63ff' : '#e9ecef', color: selectedOption ? '#fff' : '#adb5bd', border: 'none', borderRadius: 8, padding: 12, fontSize: 13, fontWeight: 600, cursor: selectedOption ? 'pointer' : 'not-allowed' }}
              >
                Verificar
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                {currentScenario >= SCENARIOS.length - 1 ? 'Ver resultado →' : 'Siguiente →'}
              </button>
            )}
          </div>
        </article>
      </section>
    );
  }

  const sweep = (score / SCENARIOS.length) * 360;
  return (
    <section style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', padding: '2rem 1rem', animation: 'fadeIn 0.3s ease' }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <article style={{ background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderRadius: 20, padding: '2.5rem 2rem', marginBottom: 20 }}>
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            border: '6px solid #e9ecef',
            position: 'relative',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `conic-gradient(#6c63ff ${sweep}deg, #e9ecef 0deg)`,
          }}
        >
          <span style={{ width: 74, height: 74, borderRadius: '50%', background: 'var(--wl-panel-raised, #fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: 'var(--wl-on-panel-link, #6c63ff)' }}>
            {`${score}/5`}
          </span>
        </div>
        <p style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600, color: 'var(--wl-on-panel, #1a1a2e)' }}>{scoreMessage(score)}</p>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--wl-on-panel-soft, #6c757d)', lineHeight: 1.6 }}>
          Elegiste respuestas según contexto social real. Eso es conversación funcional.
        </p>
      </article>

      <article style={{ background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.15)', borderRadius: 12, padding: '14px 16px', marginBottom: 20, textAlign: 'left' }}>
        <p style={{ margin: '0 0 8px', fontSize: 11, color: 'var(--wl-on-panel-link, #6c63ff)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>💡 Lo que practicaste:</p>
        <div>
          {[
            'Responder 어디 가요? con lugar + acción',
            'Elegir entre 저는 (formal) y 나는 (casual) según el contexto',
            'Usar 어디 가요? como tu primera pregunta en coreano',
          ].map((item) => (
            <p key={item} style={{ margin: '0 0 4px', fontSize: 12, color: 'var(--wl-on-panel, #1a1a2e)', display: 'flex', gap: 8 }}>
              <span style={{ color: 'var(--wl-on-panel-ok, #2d9b4e)' }}>✓</span>
              <span>{item}</span>
            </p>
          ))}
        </div>
      </article>

      <div style={{ marginBottom: 10 }}>
        {SCENARIOS.map((item) => {
          const answer = item.options.find((opt) => opt.correct)?.text ?? '';
          return (
            <div key={item.id} style={{ background: 'var(--wl-panel-raised, #fff)', border: '1px solid #e9ecef', borderRadius: 10, padding: '10px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>{item.speakerAvatar}</span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <p style={{ margin: '0 0 2px', fontSize: 10, color: 'var(--wl-on-panel-soft, #6c757d)' }}>{item.contextES}</p>
                <p style={{ margin: 0, fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, color: 'var(--wl-on-panel-ok, #2d9b4e)' }}>{answer}</p>
              </div>
              <button
                type="button"
                onClick={() => playAudio(item.correctAudio, 1)}
                style={{ border: 'none', background: 'transparent', fontSize: 14, color: 'var(--wl-on-panel-ok, #2d9b4e)', cursor: 'pointer' }}
              >
                🔊
              </button>
            </div>
          );
        })}
      </div>

      <p style={{ margin: '12px 0 0', fontSize: 11, color: 'var(--wl-on-panel-link, #6c63ff)', textAlign: 'center' }}>
        Elegir una respuesta funcional según contexto.
      </p>
    </section>
  );
}
