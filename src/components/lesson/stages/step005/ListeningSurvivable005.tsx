'use client';

import { useRef, useState } from 'react';
import { KR_VIDEO_005, playAudio } from '@/lib/storage';

interface Chapter { startSec: number; emoji: string; labelEs: string; line?: string; speaker?: string }
interface Question { id: string; q: string; options: string[]; correct: string; audio: string }
interface Props { onComplete?: () => void }

const CHAPTERS: Chapter[] = [
  { startSec:  0,  emoji: '🎬', labelEs: 'Intro · David entrega el pedido',       line: '(David tiene el pedido listo para entregar)' },
  { startSec:  8,  emoji: '🧾', labelEs: '여기 있습니다 — Aquí tiene',             line: '여기 있습니다.', speaker: 'David' },
  { startSec: 18,  emoji: '😊', labelEs: '맛있게 드세요 — Bon appétit',           line: '맛있게 드세요.', speaker: 'David' },
  { startSec: 28,  emoji: '💰', labelEs: '얼마예요? — La cuenta',                 line: '커피 잘 먹었습니다. 얼마예요?', speaker: 'Cliente' },
  { startSec: 42,  emoji: '🏷', labelEs: '칠천 원이에요 — El precio',             line: '잠시만요. 칠천 원이에요.', speaker: 'David' },
  { startSec: 62,  emoji: '🚻', labelEs: '화장실 있어요? — El baño',              line: '실례합니다. 잘 모르겠어요. 화장실 있어요?', speaker: 'Cliente' },
  { startSec: 78,  emoji: '➡️', labelEs: '안쪽 오른쪽에 있어요 — Las indicaciones', line: '네, 안쪽 오른쪽에 있어요.', speaker: 'David' },
];
const TOTAL_SEC = 95;

const QUESTIONS: Question[] = [
  {
    id: 'Q1',
    q: 'David dice "여기 있습니다" al entregar el pedido. ¿Qué diferencia a 있습니다 de 있어요 que ya conoces?',
    options: [
      '있습니다 es la forma formal/-습니다, 있어요 es casual/-어요',
      '있습니다 solo se usa con objetos, 있어요 con personas',
      'Son idénticas — cualquiera sirve en esta situación',
      '있습니다 es pasado, 있어요 es presente',
    ],
    correct: '있습니다 es la forma formal/-습니다, 있어요 es casual/-어요',
    audio: '여기 있습니다',
  },
  {
    id: 'Q2',
    q: 'El cliente dice "맛있게 드세요" antes de comer y "잘 먹었습니다" después. ¿Quién dice cada frase?',
    options: [
      'David dice 맛있게 드세요 (antes) · el cliente dice 잘 먹었습니다 (después)',
      'El cliente dice ambas frases',
      'David dice ambas frases',
      'Cualquiera puede decir cualquiera de las dos',
    ],
    correct: 'David dice 맛있게 드세요 (antes) · el cliente dice 잘 먹었습니다 (después)',
    audio: '맛있게 드세요',
  },
  {
    id: 'Q3',
    q: '칠천 원이에요 usa 칠(7) + 천(1.000). ¿A qué sistema numérico pertenece 칠?',
    options: [
      'Sistema sino-coreano — el mismo que se usa para precios, fechas y minutos',
      'Sistema nativo coreano — el mismo que usaste para contar hodduks (하나/둘)',
      'Es un número especial solo para precios',
      'No importa — 칠 y 일곱 son intercambiables en precios',
    ],
    correct: 'Sistema sino-coreano — el mismo que se usa para precios, fechas y minutos',
    audio: '칠천',
  },
  {
    id: 'Q4',
    q: 'El cliente dice "실례합니다. 잘 모르겠어요." antes de preguntar por el baño. ¿Qué función cumple esa secuencia?',
    options: [
      'Disculparse por interrumpir y admitir que no sabe — suaviza la petición',
      'Es un saludo formal antes de cualquier pregunta',
      '실례합니다 es obligatorio al hablar con un desconocido en Corea',
      'Solo sirve para preguntas sobre el baño',
    ],
    correct: 'Disculparse por interrumpir y admitir que no sabe — suaviza la petición',
    audio: '실례합니다',
  },
  {
    id: 'Q5',
    q: 'David dice "안쪽 오른쪽에 있어요". ¿Qué indica la partícula -에 en "오른쪽에"?',
    options: [
      'Marca el lugar donde algo existe (dirección/destino) — "a la derecha"',
      'Indica movimiento hacia otro lugar',
      'Indica que hay más de un baño',
      'Es un marcador de respeto, como -요',
    ],
    correct: 'Marca el lugar donde algo existe (dirección/destino) — "a la derecha"',
    audio: '안쪽 오른쪽에 있어요',
  },
];

function fmt(sec: number) { return `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`; }

export default function ListeningSurvivable005({ onComplete }: Props) {
  const videoRef      = useRef<HTMLVideoElement | null>(null);
  const [elapsed,  setElapsed]  = useState(0);
  const [qIdx,     setQIdx]     = useState(0);
  const [picked,   setPicked]   = useState<string | null>(null);
  const [correct,  setCorrect]  = useState(0);
  const [phase,    setPhase]    = useState<'video' | 'quiz' | 'done'>('video');

  const activeChapter = [...CHAPTERS].reverse().find(c => elapsed >= c.startSec) ?? CHAPTERS[0];

  function seekTo(sec: number) {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = sec;
    v.play();
  }

  function handleAnswer(opt: string) {
    if (picked) return;
    setPicked(opt);
    if (opt === QUESTIONS[qIdx].correct) {
      setCorrect(c => c + 1);
      playAudio(QUESTIONS[qIdx].audio);
    }
  }

  function nextQ() {
    const next = qIdx + 1;
    if (next >= QUESTIONS.length) setPhase('done');
    else { setQIdx(next); setPicked(null); }
  }

  return (
    <section style={{ maxWidth: 640, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--foreground)' }}>
      <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
        ETAPA 04 DE 11 · Escucha sobrevivible
      </p>

      {phase === 'video' && (
        <>
          <div style={{ borderRadius: 14, overflow: 'hidden', marginBottom: 16, background: '#000' }}>
            <video ref={videoRef} src={KR_VIDEO_005} controls playsInline
              style={{ width: '100%', display: 'block', maxHeight: 360 }}
              onTimeUpdate={e => setElapsed(Math.floor((e.target as HTMLVideoElement).currentTime))} />
          </div>

          <div style={{ background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.25)', borderRadius: 12, padding: '12px 16px', marginBottom: 16 }}>
            <span style={{ fontSize: 11, color: '#6c63ff', fontWeight: 700 }}>{activeChapter.emoji} {activeChapter.labelEs}</span>
            {activeChapter.line && (
              <div style={{ marginTop: 6 }}>
                {activeChapter.speaker && <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 2 }}>{activeChapter.speaker}:</span>}
                <p style={{ margin: 0, fontSize: 18, fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 600 }}>{activeChapter.line}</p>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 20 }}>
            {CHAPTERS.map(ch => (
              <button key={ch.startSec} onClick={() => seekTo(ch.startSec)}
                style={{ background: elapsed >= ch.startSec && ch.startSec === activeChapter.startSec ? 'rgba(108,99,255,0.15)' : 'var(--bg-2,#f5f5f7)', border: elapsed >= ch.startSec && ch.startSec === activeChapter.startSec ? '1px solid #6c63ff' : '1px solid var(--line-soft)', borderRadius: 10, padding: '8px 12px', textAlign: 'left', cursor: 'pointer', fontSize: 12 }}>
                <span>{ch.emoji} {fmt(ch.startSec)}</span>
                <span style={{ display: 'block', color: 'var(--muted)', fontSize: 11, marginTop: 2 }}>{ch.labelEs}</span>
              </button>
            ))}
          </div>

          <div style={{ height: 4, borderRadius: 2, background: 'var(--line-soft)', marginBottom: 16 }}>
            <div style={{ height: '100%', width: `${Math.min((elapsed / TOTAL_SEC) * 100, 100)}%`, background: '#6c63ff', borderRadius: 2 }} />
          </div>

          <button onClick={() => setPhase('quiz')}
            style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Responder preguntas de comprensión →
          </button>
        </>
      )}

      {phase === 'quiz' && (
        <div style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 14, padding: '20px 24px' }}>
          <p style={{ margin: '0 0 4px', fontSize: 11, color: 'var(--muted)' }}>Pregunta {qIdx + 1} de {QUESTIONS.length}</p>
          <div style={{ height: 4, borderRadius: 2, background: 'var(--line-soft)', marginBottom: 16 }}>
            <div style={{ height: '100%', width: `${(qIdx / QUESTIONS.length) * 100}%`, background: '#6c63ff', borderRadius: 2 }} />
          </div>
          <p style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600 }}>{QUESTIONS[qIdx].q}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {QUESTIONS[qIdx].options.map(opt => {
              const isCorrect = opt === QUESTIONS[qIdx].correct;
              const isPicked  = picked === opt;
              const bg     = !picked ? 'var(--bg-2,#f5f5f7)' : isCorrect ? 'rgba(45,155,78,0.15)' : isPicked ? 'rgba(239,68,68,0.1)' : 'var(--bg-2,#f5f5f7)';
              const border = !picked ? '1px solid var(--line-soft)' : isCorrect ? '1px solid #2d9b4e' : isPicked ? '1px solid #ef4444' : '1px solid var(--line-soft)';
              return (
                <button key={opt} onClick={() => handleAnswer(opt)}
                  style={{ background: bg, border, borderRadius: 10, padding: '12px 16px', textAlign: 'left', fontSize: 13, cursor: picked ? 'default' : 'pointer', transition: 'all 0.2s' }}>
                  {isPicked && !isCorrect ? '❌ ' : isCorrect && picked ? '✅ ' : ''}{opt}
                </button>
              );
            })}
          </div>
          {picked && (
            <button onClick={nextQ} style={{ marginTop: 16, width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              {qIdx + 1 < QUESTIONS.length ? 'Siguiente →' : 'Ver resultado →'}
            </button>
          )}
          <button onClick={() => setPhase('video')} style={{ marginTop: 8, width: '100%', background: 'none', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '10px', fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}>
            ← Volver al video
          </button>
        </div>
      )}

      {phase === 'done' && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{correct >= 4 ? '🎯' : '📺'}</div>
          <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 700 }}>{correct}/{QUESTIONS.length} respuestas correctas</h2>
          <p style={{ margin: '0 0 24px', color: 'var(--muted)', fontSize: 14 }}>
            {correct >= 4 ? '¡Comprensión excelente! Captaste los detalles clave del episodio.' : 'Vuelve al video y presta atención a 맛있게 드세요, 칠천 원 y las indicaciones del baño.'}
          </p>
          {correct < 4 && (
            <button onClick={() => { setPhase('video'); setQIdx(0); setPicked(null); setCorrect(0); }}
              style={{ marginBottom: 12, background: 'var(--bg-2,#f5f5f7)', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '12px 24px', fontSize: 14, cursor: 'pointer' }}>
              Revisar video de nuevo
            </button>
          )}
          <button onClick={() => onComplete?.()}
            style={{ display: 'block', width: '100%', background: '#2d9b4e', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            Continuar →
          </button>
        </div>
      )}
    </section>
  );
}
