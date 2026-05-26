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
    kr: '이거 뭐예요?', audio: '이거 뭐예요?', es: '¿Qué es esto?',
    highlight: '이거', color: '#6c63ff',
    question: 'El cliente usa 이거. ¿Qué crees que significa?',
    options: ['algo cercano al hablante', 'algo lejano a todos', 'cualquier objeto sin especificar'],
    correct: 'algo cercano al hablante',
    explanation: '이거 = esto. El cliente señala algo que está CERCA de él. La distancia al hablante importa en coreano.',
  },
  {
    kr: '그거는 호떡이에요', audio: '호떡', es: 'Eso es hodduk',
    highlight: '그거', color: '#8b5cf6',
    question: 'David usa 그거 para el MISMO objeto. ¿Por qué cambia?',
    options: ['Porque para David está más lejos', 'Porque 그거 es más educado', 'Por error — deberían ser iguales'],
    correct: 'Porque para David está más lejos',
    explanation: 'Mismo hodduk, pronombre diferente. 그거 = eso (lejos del hablante). La perspectiva de quien habla determina el pronombre.',
  },
  {
    kr: '호떡 하나 주세요', audio: '호떡 하나 주세요', es: 'Un hodduk, por favor',
    highlight: '하나', color: '#f59e0b',
    question: 'El cliente usa 하나 para pedir "uno". ¿Notás algo diferente al español?',
    options: ['Usa un sistema numérico distinto al de los precios', 'Es un error — debería decir 일', 'No hay diferencia con el sistema de precios'],
    correct: 'Usa un sistema numérico distinto al de los precios',
    explanation: '하나 es el sistema NATIVO para contar objetos físicos. Para el dinero (precios en ₩) se usa el sistema sino-coreano (일, 이, 삼...).',
  },
  {
    kr: '호떡 한 개 주세요', audio: '호떡 하나 주세요', es: 'Un hodduk, por favor (con contador)',
    highlight: '한 개', color: '#f59e0b',
    question: 'Aquí dice 한 개, arriba decía 하나. ¿Qué cambió?',
    options: ['하나 se contrae a 한 cuando va antes de un contador', 'Son formas completamente diferentes', 'han 개 es más formal que hana'],
    correct: 'hana se contrae a han cuando va antes de un contador',
    explanation: 'Regla de oro: 하나→한, 둘→두, 셋→세, 넷→네 antes de un contador. 개 = contador genérico para objetos.',
  },
  {
    kr: '커피 한 잔 주세요', audio: '한 잔', es: 'Un café, por favor',
    highlight: '잔', color: '#22c55e',
    question: 'Aquí el contador es 잔 (no 개). ¿Para qué crees que se usa 잔?',
    options: ['Para bebidas y tazas', 'Para cualquier objeto', 'Para alimentos sólidos'],
    correct: 'Para bebidas y tazas',
    explanation: '잔 (jan) = contador específico para bebidas en taza o vaso. 개 es genérico, 잔 es para líquidos servidos.',
  },
  {
    kr: '커피도 주세요', audio: '커피', es: 'Un café también, por favor',
    highlight: '도', color: '#e879f9',
    question: 'La sílaba -도 se pega a 커피. ¿Qué agrega a la frase?',
    options: ['El significado "también" — el cliente ya pidió algo más', 'El significado "por favor"', 'El significado "solo" — pide únicamente café'],
    correct: 'El significado "también" — el cliente ya pidió algo más',
    explanation: '-도 = también. Se pega a la palabra y REEMPLAZA partículas como -를/을. El cliente ya pidió el hodduk y ahora agrega el café.',
  },
];

export default function ContextualInput004({ onComplete }: Props) {
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
      <p style={{ margin: '0 0 24px', color: 'var(--muted)', fontSize: 14 }}>Descubriste los patrones antes de que te los explicaran. Así funciona la adquisición natural.</p>
      <button onClick={() => onComplete?.()} style={{ background: '#2d9b4e', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Continuar →</button>
    </section>
  );

  return (
    <section style={{ maxWidth: 520, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--foreground)' }}>
      <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>ETAPA 05 DE 11 · Contexto primero</p>
      <div style={{ height: 4, borderRadius: 2, background: 'var(--line-soft)', marginBottom: 20 }}>
        <div style={{ height: '100%', width: `${(idx / SENTENCES.length) * 100}%`, background: '#6c63ff', borderRadius: 2 }} />
      </div>

      {/* Sentence card */}
      <div style={{ background: 'var(--bg-2,#f5f5f7)', borderRadius: 14, padding: '24px', marginBottom: 16, textAlign: 'center' }}>
        <button onClick={() => playAudio(s.audio)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'block', margin: '0 auto 8px' }}>
          <p style={{ margin: 0, fontSize: 32, fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700 }}>
            {highlightLine(s.kr, s.highlight, s.color)}
          </p>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>🔊 tap para escuchar</span>
        </button>
        <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--muted)' }}>{s.es}</p>
      </div>

      {/* Discovery question */}
      <div style={{ background: 'var(--bg)', border: `1px solid ${s.color}44`, borderRadius: 14, padding: '16px 20px' }}>
        <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600 }}>🔍 {s.question}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {s.options.map(opt => {
            const isCorrect = opt === s.correct;
            const isPicked  = picked === opt;
            const bg = !picked ? 'var(--bg-2,#f5f5f7)' : isCorrect ? 'rgba(45,155,78,0.15)' : isPicked ? 'rgba(239,68,68,0.1)' : 'var(--bg-2,#f5f5f7)';
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
