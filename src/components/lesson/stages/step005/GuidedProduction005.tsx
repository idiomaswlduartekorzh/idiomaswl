'use client';

import { useState, CSSProperties } from 'react';
import { playAudio } from '@/lib/storage';

interface Props { onComplete?: () => void }
interface Tile { ko: string; role: 'subject' | 'object' | 'verb' | 'particle' }
interface BuildEx { type: 'build'; hint: string; tiles: Tile[]; correctOrder: string[]; audio: string; translation: string }
interface ChoiceEx { type: 'choice'; prompt: string; options: string[]; correct: string; feedback: string; audio?: string }
type Exercise = BuildEx | ChoiceEx;

const TILE_COLORS: Record<Tile['role'], { bg: string; border: string; color: string }> = {
  subject:  { bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.4)',  color: 'var(--wl-on-panel-link, #3b82f6)' },
  object:   { bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.4)',  color: 'var(--wl-on-panel-warn, #d97706)' },
  verb:     { bg: 'rgba(34,197,94,0.12)',   border: 'rgba(34,197,94,0.4)',   color: '#22c55e' },
  particle: { bg: 'rgba(139,92,246,0.12)',  border: 'rgba(139,92,246,0.4)', color: 'var(--wl-on-panel-link, #8b5cf6)' },
};

const EXERCISES: Exercise[] = [
  {
    type: 'build',
    hint: 'David entrega el pedido al cliente',
    tiles: [{ ko: '여기', role: 'subject' }, { ko: '있습니다', role: 'verb' }],
    correctOrder: ['여기', '있습니다'],
    audio: '여기 있습니다',
    translation: 'Aquí tiene',
  },
  {
    type: 'build',
    hint: 'David desea buen provecho ANTES de que el cliente coma',
    tiles: [{ ko: '맛있게', role: 'particle' }, { ko: '드세요', role: 'verb' }],
    correctOrder: ['맛있게', '드세요'],
    audio: '맛있게 드세요',
    translation: '¡Que lo disfrutes! / Bon appétit',
  },
  {
    type: 'build',
    hint: 'David pide un momento antes de decir el precio',
    tiles: [{ ko: '잠시만요', role: 'verb' }],
    correctOrder: ['잠시만요'],
    audio: '잠시만요',
    translation: 'Un momento, por favor',
  },
  {
    type: 'build',
    hint: 'David dice el precio: 7.000 wones',
    tiles: [{ ko: '칠천', role: 'object' }, { ko: '원이에요', role: 'verb' }],
    correctOrder: ['칠천', '원이에요'],
    audio: '칠천 원이에요',
    translation: 'Son 7.000 wones',
  },
  {
    type: 'build',
    hint: 'El cliente pregunta si hay baño',
    tiles: [{ ko: '화장실', role: 'subject' }, { ko: '있어요?', role: 'verb' }],
    correctOrder: ['화장실', '있어요?'],
    audio: '화장실 있어요?',
    translation: '¿Hay un baño?',
  },
  {
    type: 'build',
    hint: 'David indica la dirección del baño: al fondo a la derecha',
    tiles: [{ ko: '안쪽', role: 'subject' }, { ko: '오른쪽에', role: 'particle' }, { ko: '있어요', role: 'verb' }],
    correctOrder: ['안쪽', '오른쪽에', '있어요'],
    audio: '안쪽 오른쪽에 있어요',
    translation: 'Está al fondo a la derecha',
  },
  {
    type: 'choice',
    prompt: 'David trabaja en un café con clientes. ¿Cuál forma usa para ser más formal?',
    options: ['있습니다', '있어요', '있다', '있잖아'],
    correct: '있습니다',
    feedback: '✅ 있습니다 = forma -습니다 (formal/profesional). 있어요 es correcto pero más casual. Con clientes desconocidos siempre usa -습니다.',
    audio: '여기 있습니다',
  },
  {
    type: 'choice',
    prompt: 'Un transeúnte está hablando por teléfono. Necesitas preguntarle por una calle. ¿Cómo lo abordas?',
    options: ['실례합니다', '저기요', '잠시만요', '여기요'],
    correct: '실례합니다',
    feedback: '✅ 실례합니다 = reconocer que interrumpes la actividad de alguien. 저기요 es para llamar al personal de servicio (mesero). 잠시만요 lo dice quien necesita tiempo.',
    audio: '실례합니다',
  },
];

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function GuidedProduction005({ onComplete }: Props) {
  const [exIdx,   setExIdx]   = useState(0);
  const [correct, setCorrect] = useState(0);
  const [done,    setDone]    = useState(false);

  const [placed,  setPlaced]  = useState<string[]>([]);
  const [avail,   setAvail]   = useState<string[]>(() => {
    const first = EXERCISES[0];
    return first.type === 'build' ? shuffle((first as BuildEx).tiles.map(t => t.ko)) : [];
  });
  const [result,  setResult]  = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [picked,  setPicked]  = useState<string | null>(null);

  const ex = EXERCISES[exIdx];

  function initBuild(e: BuildEx) {
    setPlaced([]);
    setAvail(shuffle(e.tiles.map(t => t.ko)));
    setResult('idle');
  }

  function initExercise(idx: number) {
    const next = EXERCISES[idx];
    if (next?.type === 'build') initBuild(next as BuildEx);
    else { setPicked(null); }
  }

  function tapAvail(token: string) {
    if (result !== 'idle') return;
    setAvail(a => { const n = [...a]; n.splice(n.indexOf(token), 1); return n; });
    setPlaced(p => [...p, token]);
  }
  function tapPlaced(i: number) {
    if (result !== 'idle') return;
    const token = placed[i];
    setPlaced(p => p.filter((_, idx) => idx !== i));
    setAvail(a => [...a, token]);
  }
  function checkBuild() {
    const e = ex as BuildEx;
    const ok = placed.join('') === e.correctOrder.join('');
    setResult(ok ? 'correct' : 'wrong');
    if (ok) { setCorrect(c => c + 1); playAudio(e.audio); }
  }
  function handleChoice(opt: string) {
    if (picked) return;
    setPicked(opt);
    const e = ex as ChoiceEx;
    if (opt === e.correct) { setCorrect(c => c + 1); if (e.audio) playAudio(e.audio); }
  }
  function next() {
    const nextIdx = exIdx + 1;
    if (nextIdx >= EXERCISES.length) { setDone(true); return; }
    setExIdx(nextIdx);
    initExercise(nextIdx);
  }

  if (done) return (
    <section style={{ maxWidth: 480, margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 8 }}>{correct >= 6 ? '🏆' : '⭐'}</div>
      <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 700 }}>{correct}/{EXERCISES.length} correctas</h2>
      <p style={{ margin: '0 0 24px', color: 'var(--muted)', fontSize: 14 }}>¡Construiste frases reales del café coreano!</p>
      <button onClick={() => onComplete?.()} style={{ background: '#2d9b4e', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Continuar →</button>
    </section>
  );

  const tileStyle = (role: Tile['role'], size: 'sm' | 'lg' = 'lg'): CSSProperties => ({
    ...TILE_COLORS[role],
    borderWidth: 1, borderStyle: 'solid',
    borderRadius: 8, padding: size === 'lg' ? '10px 16px' : '6px 12px',
    fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700,
    fontSize: size === 'lg' ? 16 : 14,
    cursor: 'pointer', userSelect: 'none' as const,
  });

  return (
    <section style={{ maxWidth: 540, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--foreground)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <p style={{ margin: 0, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>ETAPA 08 DE 11 · Producción guiada</p>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>{exIdx + 1}/{EXERCISES.length}</span>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: 'var(--line-soft)', marginBottom: 20 }}>
        <div style={{ height: '100%', width: `${(exIdx / EXERCISES.length) * 100}%`, background: '#6c63ff', borderRadius: 2 }} />
      </div>

      {ex.type === 'build' && (() => {
        const e = ex as BuildEx;
        return (
          <div>
            <p style={{ margin: '0 0 6px', fontSize: 13, color: 'var(--muted)' }}>Construye la frase:</p>
            <p style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 600 }}>{e.hint}</p>

            <div style={{ minHeight: 56, border: `2px dashed ${result === 'correct' ? '#2d9b4e' : result === 'wrong' ? '#ef4444' : 'var(--line-soft)'}`, borderRadius: 12, padding: '10px 12px', display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16, background: result === 'correct' ? 'rgba(45,155,78,0.06)' : result === 'wrong' ? 'rgba(239,68,68,0.04)' : 'var(--bg)' }}>
              {placed.map((t, i) => {
                const role = e.tiles.find(ti => ti.ko === t)?.role ?? 'object';
                return <button key={i} onClick={() => tapPlaced(i)} style={{ ...tileStyle(role), border: `1px solid ${TILE_COLORS[role].border}` }}>{t}</button>;
              })}
              {placed.length === 0 && <span style={{ color: 'var(--muted)', fontSize: 13, alignSelf: 'center' }}>Tap las palabras para construir la frase</span>}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {avail.map((t, i) => {
                const role = e.tiles.find(ti => ti.ko === t)?.role ?? 'object';
                return <button key={i} onClick={() => tapAvail(t)} style={{ ...tileStyle(role, 'sm'), border: `1px solid ${TILE_COLORS[role].border}` }}>{t}</button>;
              })}
            </div>

            {result === 'idle' && placed.length === e.tiles.length && (
              <button onClick={checkBuild} style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Comprobar ✓</button>
            )}
            {result === 'correct' && (
              <div>
                <div style={{ background: 'rgba(45,155,78,0.12)', border: '1px solid #2d9b4e', borderRadius: 10, padding: '10px 14px', marginBottom: 12 }}>
                  <p style={{ margin: 0, fontSize: 13 }}>✅ ¡Correcto! — {e.translation}</p>
                </div>
                <button onClick={next} style={{ width: '100%', background: '#2d9b4e', color: '#fff', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Siguiente →</button>
              </div>
            )}
            {result === 'wrong' && (
              <div>
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid #ef4444', borderRadius: 10, padding: '10px 14px', marginBottom: 12 }}>
                  <p style={{ margin: 0, fontSize: 13 }}>❌ Orden incorrecto. Respuesta: <strong style={{ fontFamily: "'Noto Sans KR',sans-serif" }}>{e.correctOrder.join(' ')}</strong></p>
                </div>
                <button onClick={() => initBuild(e)} style={{ marginBottom: 8, width: '100%', background: 'var(--bg-2,var(--wl-panel-raised, #f5f5f7))', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '10px', fontSize: 13, cursor: 'pointer' }}>Intentar de nuevo</button>
                <button onClick={next} style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '10px', fontSize: 13, cursor: 'pointer' }}>Siguiente →</button>
              </div>
            )}
          </div>
        );
      })()}

      {ex.type === 'choice' && (() => {
        const e = ex as ChoiceEx;
        return (
          <div>
            <p style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600 }}>{e.prompt}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {e.options.map(opt => {
                const isCorrect = opt === e.correct;
                const isPicked  = picked === opt;
                const bg = !picked ? 'var(--bg-2,#f5f5f7)' : isCorrect ? 'rgba(45,155,78,0.15)' : isPicked ? 'rgba(239,68,68,0.1)' : 'var(--bg-2,#f5f5f7)';
                const border = !picked ? '1px solid var(--line-soft)' : isCorrect ? '1px solid #2d9b4e' : isPicked ? '1px solid #ef4444' : '1px solid var(--line-soft)';
                return (
                  <button key={opt} onClick={() => handleChoice(opt)}
                    style={{ background: bg, border, borderRadius: 10, padding: '12px 16px', textAlign: 'left', fontSize: 15, fontFamily: "'Noto Sans KR',sans-serif", cursor: picked ? 'default' : 'pointer', transition: 'all 0.2s' }}>
                    {isPicked && !isCorrect ? '❌ ' : isCorrect && picked ? '✅ ' : ''}{opt}
                  </button>
                );
              })}
            </div>
            {picked && (
              <>
                <div style={{ marginTop: 12, background: `${picked === e.correct ? 'rgba(45,155,78,0.1)' : 'rgba(239,68,68,0.08)'}`, border: `1px solid ${picked === e.correct ? '#2d9b4e' : '#ef4444'}`, borderRadius: 10, padding: '10px 14px' }}>
                  <p style={{ margin: 0, fontSize: 13 }}>{e.feedback}</p>
                </div>
                <button onClick={next} style={{ marginTop: 12, width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Siguiente →</button>
              </>
            )}
          </div>
        );
      })()}
    </section>
  );
}
