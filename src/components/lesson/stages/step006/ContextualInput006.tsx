'use client';

import { useState } from 'react';
import { playAudio } from '@/lib/storage';

interface Props { onComplete?: () => void }

interface Sentence {
  kr: string; audio: string; es: string;
  highlight: string; color: string;
  question: string; options: string[]; correct: string; explanation: string;
}

const SENTENCES: Sentence[] = [
  {
    kr: '새로 왔어요?', audio: '새로 왔어요?', es: '¿Eres nuevo/a aquí?',
    highlight: '왔어요', color: '#6c63ff',
    question: 'Minsu dice 새로 왔어요?. ¿Qué hace 왔어요 en esta frase?',
    options: [
      'Es el pasado de 오다 (venir) — "llegaste"',
      'Es un saludo informal equivalente a 안녕',
      'Es el presente de 가다 (ir)',
    ],
    correct: 'Es el pasado de 오다 (venir) — "llegaste"',
    explanation: '왔어요 = pasado de 오다 (venir). 새로 = recién / nuevo. La pregunta completa: "¿Eres recién llegado/a?" — la apertura social más natural del coreano universitario.',
  },
  {
    kr: '콜롬비아 사람이에요', audio: '콜롬비아 사람이에요', es: 'Soy colombiano/a',
    highlight: '사람이에요', color: '#8b5cf6',
    question: 'David dice 콜롬비아 사람이에요. ¿Qué función cumple la fórmula [país] + 사람이에요?',
    options: [
      '[País] + 사람이에요 = "Soy de [País]" — fórmula universal de nacionalidad',
      '사람 = ciudad, no país',
      'La fórmula solo funciona con países asiáticos',
    ],
    correct: '[País] + 사람이에요 = "Soy de [País]" — fórmula universal de nacionalidad',
    explanation: '사람 = persona. 이에요 = soy / es (cópula). La estructura [país] + 사람이에요 es la forma estándar para indicar tu origen: 미국 사람이에요 (soy de EE.UU.), 한국 사람이에요 (soy coreano/a).',
  },
  {
    kr: '커피 마실래요?', audio: '커피 마실래요?', es: '¿Quieres tomar un café?',
    highlight: '마실래요', color: '#22c55e',
    question: 'David invita a Minsu con 커피 마실래요?. ¿Qué hace el sufijo -ㄹ래요?',
    options: [
      'Convierte el verbo en una invitación o propuesta suave — "¿quieres...?"',
      'Indica que la acción ya ocurrió',
      'Marca una pregunta de información, como "¿dónde?"',
    ],
    correct: 'Convierte el verbo en una invitación o propuesta suave — "¿quieres...?"',
    explanation: '-ㄹ래요 = proponer hacer algo juntos. 마시다 (beber) → 마실래요? (¿quieres beber?). Solo se usa entre personas de confianza. Funciona con cualquier verbo: 갈래요? (¿vamos?), 먹을래요? (¿comemos?).',
  },
  {
    kr: '저는 민수예요', audio: '저는 민수예요', es: 'Soy Minsu',
    highlight: '예요', color: '#f59e0b',
    question: 'Minsu usa 예요, pero David antes dijo 사람이에요. ¿Por qué son diferentes?',
    options: [
      'Después de vocal → 예요. Después de consonante → 이에요. 민수 termina en vocal (수).',
      '예요 es más formal que 이에요',
      'Son completamente intercambiables — es solo una cuestión de preferencia',
    ],
    correct: 'Después de vocal → 예요. Después de consonante → 이에요. 민수 termina en vocal (수).',
    explanation: 'La cópula tiene dos formas: 이에요 (después de consonante: 사람이에요) y 예요 (después de vocal: 민수예요, 데이비드예요). La última letra del nombre decide cuál usar. ¡No es elección, es fonología!',
  },
  {
    kr: '대학교 어때요?', audio: '대학교 어때요?', es: '¿Cómo es la universidad?',
    highlight: '어때요', color: '#e879f9',
    question: 'Minsu pregunta "대학교 어때요?". ¿Cuál es el patrón que usa 어때요?',
    options: [
      '[Cualquier sustantivo] + 어때요? = ¿Cómo es [eso]? / ¿Qué tal [eso]?',
      '어때요 solo se usa con lugares',
      '어때요 requiere un verbo antes, no un sustantivo',
    ],
    correct: '[Cualquier sustantivo] + 어때요? = ¿Cómo es [eso]? / ¿Qué tal [eso]?',
    explanation: '어때요 es la pregunta de opinión más versátil del coreano. 날씨 어때요? (¿qué tal el tiempo?), 커피 어때요? (¿qué tal el café?), 한국 어때요? (¿qué te parece Corea?). Solo añade cualquier cosa delante.',
  },
  {
    kr: '좋아요', audio: '좋아요', es: 'Está bien / Me gusta',
    highlight: '좋아요', color: '#06b6d4',
    question: 'David responde con 좋아요. ¿En qué situaciones se puede usar 좋아요?',
    options: [
      'En cualquier situación positiva: "está bien", "me gusta", "de acuerdo"',
      'Solo para hablar del tiempo',
      'Solo como respuesta a preguntas de sí/no',
    ],
    correct: 'En cualquier situación positiva: "está bien", "me gusta", "de acuerdo"',
    explanation: '좋아요 viene de 좋다 (ser bueno). Es la respuesta positiva más versátil: evalúa (está bien), expresa preferencia (me gusta) y acepta propuestas (de acuerdo). Una palabra, mil usos.',
  },
  {
    kr: '커피도 있어요', audio: '커피도 있어요', es: 'También hay café',
    highlight: '도', color: '#f97316',
    question: '커피도 있어요 usa 도 en lugar de 가/이 (marcador de sujeto). ¿Qué añade 도?',
    options: [
      '도 = "también / encima" — suma información adicional al contexto anterior',
      '도 es simplemente el marcador de sujeto estándar',
      '도 indica que hay poca cantidad de café',
    ],
    correct: '도 = "también / encima" — suma información adicional al contexto anterior',
    explanation: '도 adjuntada a un sustantivo añade "también". Sin 도: 커피 있어요 (hay café). Con 도: 커피도 있어요 (además hay café). David ya mencionó algo más — con 도 suma este detalle. ¡Hace el coreano más rico y natural!',
  },
];

export default function ContextualInput006({ onComplete }: Props) {
  const [idx,     setIdx]     = useState(0);
  const [picked,  setPicked]  = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done,    setDone]    = useState(false);

  const s = SENTENCES[idx];

  function highlightLine(text: string, hl: string, color: string) {
    const parts = text.split(hl);
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {i < parts.length - 1 && (
          <strong style={{ color, background: `${color}22`, borderRadius: 4, padding: '0 3px' }}>{hl}</strong>
        )}
      </span>
    ));
  }

  function handlePick(opt: string) {
    if (picked) return;
    setPicked(opt);
    if (opt === s.correct) setCorrect(c => c + 1);
    playAudio(s.audio);
  }

  function next() {
    if (idx + 1 >= SENTENCES.length) { setDone(true); return; }
    setIdx(idx + 1);
    setPicked(null);
  }

  if (done) return (
    <section style={{ maxWidth: 480, margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 8 }}>🔍</div>
      <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700 }}>{correct}/{SENTENCES.length} descubrimientos correctos</h2>
      <p style={{ margin: '0 0 24px', color: 'var(--muted)', fontSize: 14 }}>Dedujiste los patrones del campus antes de que te los explicaran. Así funciona la adquisición natural.</p>
      <button onClick={() => onComplete?.()} style={{ background: '#2d9b4e', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Continuar →</button>
    </section>
  );

  return (
    <section style={{ maxWidth: 520, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--foreground)' }}>
      <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>ETAPA 05 DE 11 · Contexto primero</p>
      <div style={{ height: 4, borderRadius: 2, background: 'var(--line-soft)', marginBottom: 20 }}>
        <div style={{ height: '100%', width: `${(idx / SENTENCES.length) * 100}%`, background: '#6c63ff', borderRadius: 2 }} />
      </div>

      <div style={{ background: 'var(--bg-2,#f5f5f7)', borderRadius: 14, padding: '24px', marginBottom: 16, textAlign: 'center' }}>
        <button onClick={() => playAudio(s.audio)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'block', margin: '0 auto 8px' }}>
          <p style={{ margin: 0, fontSize: 26, fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700, lineHeight: 1.4 }}>
            {highlightLine(s.kr, s.highlight, s.color)}
          </p>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>🔊 tap para escuchar</span>
        </button>
        <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--muted)' }}>{s.es}</p>
      </div>

      <div style={{ background: 'var(--bg)', border: `1px solid ${s.color}44`, borderRadius: 14, padding: '16px 20px' }}>
        <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600 }}>🔍 {s.question}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {s.options.map(opt => {
            const isCorrect = opt === s.correct;
            const isPicked  = picked === opt;
            const bg     = !picked ? 'var(--bg-2,#f5f5f7)' : isCorrect ? 'rgba(45,155,78,0.15)' : isPicked ? 'rgba(239,68,68,0.1)' : 'var(--bg-2,#f5f5f7)';
            const border = !picked ? '1px solid var(--line-soft)' : isCorrect ? '1px solid #2d9b4e' : isPicked ? '1px solid #ef4444' : '1px solid var(--line-soft)';
            return (
              <button key={opt} onClick={() => handlePick(opt)}
                style={{ background: bg, border, borderRadius: 10, padding: '10px 14px', textAlign: 'left', fontSize: 13, cursor: picked ? 'default' : 'pointer', transition: 'all 0.2s' }}>
                {isPicked && !isCorrect ? '❌ ' : isCorrect && picked ? '✅ ' : ''}{opt}
              </button>
            );
          })}
        </div>
        {picked && (
          <div style={{ marginTop: 12, padding: '10px 14px', background: `${s.color}11`, border: `1px solid ${s.color}33`, borderRadius: 10 }}>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--foreground)', lineHeight: 1.5 }}>
              <strong style={{ color: s.color }}>💡</strong> {s.explanation}
            </p>
          </div>
        )}
      </div>

      {picked && (
        <button onClick={next} style={{ marginTop: 16, width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          {idx + 1 < SENTENCES.length ? 'Siguiente frase →' : 'Ver resultado →'}
        </button>
      )}
    </section>
  );
}
