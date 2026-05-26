'use client';

import { useRef, useState } from 'react';
import { KR_VIDEO_004, playAudio } from '@/lib/storage';

interface Chapter { startSec: number; emoji: string; labelEs: string; line?: string; speaker?: string }
interface Question { id: string; q: string; options: string[]; correct: string }
interface Props { onComplete?: () => void }

const CHAPTERS: Chapter[] = [
  { startSec:  0,   emoji: '🎬', labelEs: 'Intro · David en el café',             line: '(David está detrás del mostrador, listo para atender)' },
  { startSec:  13,  emoji: '❓', labelEs: '이거 뭐예요? — El cliente pregunta',   line: '이거 뭐예요?', speaker: 'Cliente' },
  { startSec:  55,  emoji: '🍡', labelEs: '그거는 호떡이에요 — David explica',    line: '그거는 호떡이에요.', speaker: 'David' },
  { startSec: 125,  emoji: '😋', labelEs: 'El pedido — 하나 주세요',              line: '호떡 맛있어요. 그럼 하나 주세요.', speaker: 'Cliente' },
  { startSec: 302,  emoji: '☕', labelEs: '커피도 주세요 — Y también café',        line: '커피도 주세요.', speaker: 'Cliente' },
  { startSec: 360,  emoji: '✅', labelEs: '금방 준비해 드릴게요 — David prepara',  line: '네, 금방 준비해 드릴게요.', speaker: 'David' },
];
const TOTAL_SEC = 424;

const QUESTIONS: Question[] = [
  {
    id: 'Q1',
    q: '¿Qué usa el cliente para preguntar por el hodduk y por qué no usa 그거?',
    options: [
      '이거, porque el hodduk está cerca de él',
      '그거, porque es más formal',
      '저거, porque está lejos de ambos',
      'No pregunta — señala con la mano sin hablar',
    ],
    correct: '이거, porque el hodduk está cerca de él',
  },
  {
    id: 'Q2',
    q: 'David dice "그거는 호떡이에요". ¿Por qué usa 그거 y no 이거?',
    options: [
      'Porque para David el hodduk está más lejos (detrás del mostrador)',
      'Porque 그거 es más formal que 이거',
      'Porque el hodduk es el tema de la frase',
      '그거 e 이거 son intercambiables en este contexto',
    ],
    correct: 'Porque para David el hodduk está más lejos (detrás del mostrador)',
  },
  {
    id: 'Q3',
    q: 'El cliente dice "호떡 맛있어요. 그럼 하나 주세요." ¿Qué número usa y por qué?',
    options: [
      '하나 (número nativo) porque está contando un objeto físico',
      '일 (sino-coreano) porque es más formal en una tienda',
      '한 (forma contraída) porque usa el contador 개',
      'No importa — 일 y 하나 son idénticos',
    ],
    correct: '하나 (número nativo) porque está contando un objeto físico',
  },
  {
    id: 'Q4',
    q: '¿Qué expresa la partícula -도 en "커피도 주세요"?',
    options: [
      'Que el café es adicional a lo ya pedido (también)',
      'Que el café es urgente',
      'Que el cliente quiere pagar por separado',
      'Que el café es el único pedido',
    ],
    correct: 'Que el café es adicional a lo ya pedido (también)',
  },
  {
    id: 'Q5',
    q: 'David responde "금방 준비해 드릴게요". ¿Por qué usa 드릴게요 y no 줄게요?',
    options: [
      'Porque 드릴게요 es la forma cortés/formal, apropiada con un cliente',
      'Porque 줄게요 significa "ya lo tengo listo"',
      'Porque el hodduk requiere más preparación que el café',
      'No hay diferencia entre las dos formas',
    ],
    correct: 'Porque 드릴게요 es la forma cortés/formal, apropiada con un cliente',
  },
];

function fmt(sec: number) { return `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`; }

export default function ListeningSurvivable004({ onComplete }: Props) {
  const videoRef       = useRef<HTMLVideoElement | null>(null);
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
      playAudio(QUESTIONS[qIdx].correct.substring(0, 6));
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
          {/* Video */}
          <div style={{ borderRadius: 14, overflow: 'hidden', marginBottom: 16, background: '#000' }}>
            <video ref={videoRef} src={KR_VIDEO_004} controls playsInline
              style={{ width: '100%', display: 'block', maxHeight: 360 }}
              onTimeUpdate={e => setElapsed(Math.floor((e.target as HTMLVideoElement).currentTime))} />
          </div>

          {/* Active chapter */}
          <div style={{ background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.25)', borderRadius: 12, padding: '12px 16px', marginBottom: 16 }}>
            <span style={{ fontSize: 11, color: '#6c63ff', fontWeight: 700 }}>{activeChapter.emoji} {activeChapter.labelEs}</span>
            {activeChapter.line && (
              <div style={{ marginTop: 6 }}>
                {activeChapter.speaker && <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 2 }}>{activeChapter.speaker}:</span>}
                <p style={{ margin: 0, fontSize: 18, fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 600 }}>{activeChapter.line}</p>
              </div>
            )}
          </div>

          {/* Chapter buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 20 }}>
            {CHAPTERS.map(ch => (
              <button key={ch.startSec} onClick={() => seekTo(ch.startSec)}
                style={{ background: elapsed >= ch.startSec && ch.startSec === activeChapter.startSec ? 'rgba(108,99,255,0.15)' : 'var(--bg-2,#f5f5f7)', border: elapsed >= ch.startSec && ch.startSec === activeChapter.startSec ? '1px solid #6c63ff' : '1px solid var(--line-soft)', borderRadius: 10, padding: '8px 12px', textAlign: 'left', cursor: 'pointer', fontSize: 12 }}>
                <span>{ch.emoji} {fmt(ch.startSec)}</span>
                <span style={{ display: 'block', color: 'var(--muted)', fontSize: 11, marginTop: 2 }}>{ch.labelEs}</span>
              </button>
            ))}
          </div>

          {/* Progress */}
          <div style={{ height: 4, borderRadius: 2, background: 'var(--line-soft)', marginBottom: 16 }}>
            <div style={{ height: '100%', width: `${(elapsed / TOTAL_SEC) * 100}%`, background: '#6c63ff', borderRadius: 2 }} />
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
          <button onClick={() => { setPhase('video'); }} style={{ marginTop: 8, width: '100%', background: 'none', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '10px', fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}>
            ← Volver al video
          </button>
        </div>
      )}

      {phase === 'done' && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{correct >= 4 ? '🎯' : '📺'}</div>
          <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 700 }}>{correct}/{QUESTIONS.length} respuestas correctas</h2>
          <p style={{ margin: '0 0 24px', color: 'var(--muted)', fontSize: 14 }}>
            {correct >= 4 ? '¡Comprensión excelente! Captaste los detalles clave.' : 'Vuelve al video y presta atención a 이거/그거 y la partícula -도.'}
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
