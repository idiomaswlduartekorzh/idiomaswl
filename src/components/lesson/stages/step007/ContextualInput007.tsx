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
    kr: '한국 생활 어때요?', audio: '한국 생활 어때요?', es: '¿Qué tal la vida en Corea?',
    highlight: '생활', color: '#6c63ff',
    question: 'Minsu pregunta "한국 생활 어때요?". ¿Qué significa 생활 en este contexto?',
    options: [
      'vida cotidiana / rutina — el tejido del día a día en un lugar',
      'fiesta / celebración especial',
      'trabajo de tiempo completo',
    ],
    correct: 'vida cotidiana / rutina — el tejido del día a día en un lugar',
    explanation: '생활 = vida cotidiana, rutina. No es "vida" en abstracto — es la actividad continua y habitual en un lugar. 한국 생활 어때요? pregunta por todo el ritmo del día a día de David en Corea.',
  },
  {
    kr: '이 대학교에서 공부해요', audio: '이 대학교에서 공부해요', es: 'Estudio en esta universidad',
    highlight: '에서', color: '#8b5cf6',
    question: 'David dice 대학교에서 공부해요. ¿Por qué usa 에서 y no 에?',
    options: [
      '에서 marca el lugar donde ocurre una acción. 에 se usa con verbos de movimiento (가요, 와요).',
      '에서 es simplemente una forma más larga de 에 — son intercambiables',
      '에서 se usa solo con lugares grandes como universidades',
    ],
    correct: '에서 marca el lugar donde ocurre una acción. 에 se usa con verbos de movimiento (가요, 와요).',
    explanation: 'Regla de oro: 에서 = escena donde el VERBO sucede (공부해요, 일해요). 에 = destino del movimiento (가요, 와요). Mismo lugar, distinta partícula: 대학교에 가요 (voy a la universidad) vs 대학교에서 공부해요 (estudio en la universidad).',
  },
  {
    kr: '카페에서 일해요', audio: '카페에서 일해요', es: 'Trabajo en el café',
    highlight: '일해요', color: '#22c55e',
    question: '일해요 viene de 일하다. ¿Cuál es el patrón que genera verbos como 일해요 o 공부해요?',
    options: [
      '[sustantivo] + 하다 → [sustantivo]해요. 일(trabajo) + 하다 → 일해요',
      'Los verbos coreanos se forman añadiendo -요 directamente al sustantivo',
      '일해요 y 공부해요 no tienen relación — son raíces completamente distintas',
    ],
    correct: '[sustantivo] + 하다 → [sustantivo]해요. 일(trabajo) + 하다 → 일해요',
    explanation: 'Los verbos con 하다 son los más comunes del coreano. Solo cambia el sustantivo delante: 공부(estudio) + 하다 → 공부해요, 일(trabajo) + 하다 → 일해요. El sufijo -해요 es siempre el mismo. ¡Un patrón que desbloquea cientos de verbos!',
  },
  {
    kr: '한국 좋아해요', audio: '한국 좋아해요', es: 'Me gusta Corea',
    highlight: '좋아해요', color: '#f59e0b',
    question: 'David dice 한국 좋아해요, NO 한국 좋아요. ¿Cuál es la diferencia?',
    options: [
      '좋아해요 = "me gusta" (verbo de preferencia) · 좋아요 = "está bien / qué bueno" (evaluación)',
      '좋아해요 es más formal que 좋아요',
      'Son completamente intercambiables — es solo preferencia personal',
    ],
    correct: '좋아해요 = "me gusta" (verbo de preferencia) · 좋아요 = "está bien / qué bueno" (evaluación)',
    explanation: '좋아요 viene de 좋다 (ser bueno) — evalúa: "está bien". 좋아해요 viene de 좋아하다 (gustar) — expresa preferencia: "me gusta". Para decir que algo te GUSTA → siempre 좋아해요. 좋아요 acepta propuestas o evalúa situaciones.',
  },
  {
    kr: '민수 씨는 뭐해요?', audio: '민수 씨는 뭐해요?', es: '¿Y tú qué haces, Minsu?',
    highlight: '씨', color: '#e879f9',
    question: 'David dice "민수 씨는 뭐해요?". ¿Qué hace 씨 después del nombre?',
    options: [
      '씨 = tratamiento de respeto equivalente a "Sr./Sra. + nombre" — cortés sin ser rígido',
      '씨 es un diminutivo que se usa con amigos íntimos',
      '씨 es el equivalente coreano de "oye" — para llamar la atención',
    ],
    correct: '씨 = tratamiento de respeto equivalente a "Sr./Sra. + nombre" — cortés sin ser rígido',
    explanation: '씨 adjuntado al nombre muestra respeto sin excesiva formalidad. 민수 씨 = "Minsu-ssi". Se usa con el nombre de pila, no con el apellido. Perfecto entre conocidos que quieren ser corteses sin distancia.',
  },
  {
    kr: '저도 이 대학교에서 공부해요', audio: '저도 이 대학교에서 공부해요', es: 'Yo también estudio en esta universidad',
    highlight: '도', color: '#06b6d4',
    question: 'Minsu dice "저도 이 대학교에서 공부해요". ¿Qué hace el 도 después de 저?',
    options: [
      '도 adjuntado a un sustantivo añade "también". 저도 = "yo también"',
      '도 es el marcador de sujeto estándar en coreano formal',
      '도 indica que la acción ocurre con frecuencia',
    ],
    correct: '도 adjuntado a un sustantivo añade "también". 저도 = "yo también"',
    explanation: '도 = también. Se adjunta a cualquier sustantivo o pronombre: 저도 (yo también), 커피도 (también café), 친구도 (también el amigo). Minsu confirma que comparte la misma situación que David — une la conversación.',
  },
  {
    kr: '매일 카페에 가요', audio: '매일 카페에 가요', es: 'Voy al café todos los días',
    highlight: '에', color: '#f97316',
    question: 'David dice 카페에 가요 con 에, no con 에서. ¿Por qué?',
    options: [
      '에 con verbos de movimiento (가요/와요) indica el destino. 에서 indica dónde ocurre la acción.',
      '에 se usa cuando el lugar es pequeño como un café. 에서 para lugares grandes.',
      'Son intercambiables con 가요 — ambos funcionan igual.',
    ],
    correct: '에 con verbos de movimiento (가요/와요) indica el destino. 에서 indica dónde ocurre la acción.',
    explanation: 'El contraste 에 vs 에서 es fundamental: 카페에 가요 (voy al café → destino). 카페에서 일해요 (trabajo en el café → acción). Truco: si el verbo es 가다/오다 (ir/venir) → usa 에. Cualquier otra acción → usa 에서.',
  },
];

export default function ContextualInput007({ onComplete }: Props) {
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
      <p style={{ margin: '0 0 24px', color: 'var(--muted)', fontSize: 14 }}>Dedujiste los patrones del coreano universitario antes de que te los explicaran. Así funciona la adquisición natural.</p>
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
