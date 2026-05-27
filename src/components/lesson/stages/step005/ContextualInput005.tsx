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
    kr: '여기 있습니다', audio: '여기 있습니다', es: 'Aquí tiene',
    highlight: '있습니다', color: '#6c63ff',
    question: 'David ya usó 있어요 en episodios anteriores. Aquí usa 있습니다. ¿Qué crees que cambia?',
    options: ['El nivel de formalidad — 있습니다 es más formal que 있어요', 'El tiempo verbal — 있습니다 es pasado', 'El sujeto — 있습니다 es para objetos, 있어요 para personas'],
    correct: 'El nivel de formalidad — 있습니다 es más formal que 있어요',
    explanation: '있습니다 (formal -습니다) y 있어요 (casual -어요) significan lo mismo, pero David usa la forma más formal con los clientes. -습니다 = nivel de servicio profesional.',
  },
  {
    kr: '맛있게 드세요', audio: '맛있게 드세요', es: '¡Que lo disfrutes!',
    highlight: '드세요', color: '#8b5cf6',
    question: '맛있게 드세요 usa 드세요 en vez de 먹어요. ¿Qué crees que hace 드세요?',
    options: ['Es la forma honorífica de 먹어요 — respetar al que come', 'Es un verbo completamente diferente que no tiene relación', 'Indica que la comida está caliente'],
    correct: 'Es la forma honorífica de 먹어요 — respetar al que come',
    explanation: '드다 es el honorífico de 먹다 (comer). 드세요 = "coma usted" con máximo respeto. 맛있게 = deliciosamente (adverbio de 맛있다). Juntos: "coma deliciosamente" = ¡bon appétit!',
  },
  {
    kr: '커피 잘 먹었습니다', audio: '잘 먹었습니다', es: 'Gracias por el café',
    highlight: '잘', color: '#f59e0b',
    question: '잘 aparece antes del verbo comer. ¿Qué función cumple 잘 en coreano?',
    options: ['Adverbio: indica que algo se hizo bien o de forma satisfactoria', 'Partícula de objeto directo', 'Marcador de tiempo pasado'],
    correct: 'Adverbio: indica que algo se hizo bien o de forma satisfactoria',
    explanation: '잘 = bien, satisfactoriamente. 잘 먹었습니다 = "comí bien" → agradece el esfuerzo de quien preparó/sirvió. También: 잘 자요(duerme bien), 잘 모르겠어요(no lo sé bien).',
  },
  {
    kr: '잠시만요. 칠천 원이에요.', audio: '칠천 원이에요', es: 'Un momento. Son 7.000 wones.',
    highlight: '칠천', color: '#22c55e',
    question: '칠천 es "7.000". Pero en step004 aprendiste 하나/둘/셋 para contar. ¿Por qué aquí se usa 칠?',
    options: ['Los precios usan el sistema sino-coreano (일/이/삼…칠), no el nativo (하나/둘/셋)', 'Es un error del barista', '칠 y 일곱 son lo mismo en cualquier contexto'],
    correct: 'Los precios usan el sistema sino-coreano (일/이/삼…칠), no el nativo (하나/둘/셋)',
    explanation: 'Regla de oro: PRECIOS, fechas y minutos → sistema sino-coreano (일이삼사오육칠팔구십). OBJETOS físicos y horas → sistema nativo (하나둘셋넷다섯). Nunca se mezclan.',
  },
  {
    kr: '실례합니다. 잘 모르겠어요. 화장실 있어요?', audio: '화장실 있어요?', es: 'Disculpe. No estoy seguro. ¿Hay un baño?',
    highlight: '실례합니다', color: '#e879f9',
    question: 'El cliente usa 실례합니다 antes de preguntar. ¿Cuándo se usa vs 저기요 del paso anterior?',
    options: ['실례합니다 = interrumpir a alguien ocupado (formal) · 저기요 = llamar al mesero (más casual)', '실례합니다 = solo con desconocidos · 저기요 = con conocidos', 'Son completamente intercambiables en cualquier situación'],
    correct: '실례합니다 = interrumpir a alguien ocupado (formal) · 저기요 = llamar al mesero (más casual)',
    explanation: '저기요 levanta la mano para llamar a un mesero. 실례합니다 reconoce que vas a interrumpir el trabajo o conversación de alguien — carga más peso de cortesía y respeto.',
  },
  {
    kr: '안쪽 오른쪽에 있어요', audio: '안쪽 오른쪽에 있어요', es: 'Está al fondo a la derecha',
    highlight: '-에', color: '#06b6d4',
    question: '오른쪽에 usa la partícula -에 que ya viste en step001 (학교에 가요). ¿Qué hace -에 aquí?',
    options: ['Marca el lugar donde algo se encuentra — "en/a la derecha"', 'Indica movimiento hacia la derecha', 'Es una partícula de respeto como -요'],
    correct: 'Marca el lugar donde algo se encuentra — "en/a la derecha"',
    explanation: '-에 con 있어요 = ubicación estática ("está EN"). -에 con 가요 = destino ("voy A"). Mismo -에, dos lecturas según el verbo. 오른쪽에 있어요 = "está en la derecha".',
  },
];

export default function ContextualInput005({ onComplete }: Props) {
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
      <p style={{ margin: '0 0 24px', color: 'var(--muted)', fontSize: 14 }}>Dedujiste los patrones antes de que te los explicaran. Así funciona la adquisición natural.</p>
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
