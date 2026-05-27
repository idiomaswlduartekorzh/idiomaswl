'use client';

import { useState, useEffect, useRef, CSSProperties } from 'react';
import { playAudio } from '@/lib/storage';

/* ─── Data ───────────────────────────────────────────────────────────────── */
const SKILLS = [
  {
    icon: '🎩',
    title: '-습니다 formal — nivel de servicio profesional',
    color: '#6c63ff',
    items: [
      '-습니다 = formal / profesional',
      '-어요 = casual / cotidiano',
      '여기 있습니다 con clientes',
      'Mismo significado, distinto registro',
    ],
  },
  {
    icon: '🍽',
    title: '맛있게 드세요 — protocolo de mesa',
    color: '#8b5cf6',
    items: [
      'Se dice ANTES de comer',
      '드세요 = honorífico de 먹어요',
      '잘 먹겠습니다 = respuesta opcional',
      '잘 먹었습니다 = después de comer',
    ],
  },
  {
    icon: '🔢',
    title: 'Sino-coreano — para precios y fechas',
    color: '#f59e0b',
    items: [
      'Precios → 일/이/삼/사/오/육/칠/팔/구/십',
      '칠천 원 = 7.000 wones',
      'Objetos/horas → nativo (하나/둘)',
      'Nunca mezclar los dos sistemas',
    ],
  },
  {
    icon: '🗺️',
    title: 'Direcciones — -에 + 있어요',
    color: '#06b6d4',
    items: [
      '안쪽 = al fondo / hacia adentro',
      '오른쪽 = a la derecha',
      '-에 + 있어요 = "está en"',
      '-에 + 가요 = "voy a"',
    ],
  },
];

const PHRASES = [
  { ko: '여기 있습니다',              es: 'Aquí tiene (formal)',                   audio: '여기 있습니다' },
  { ko: '맛있게 드세요',              es: '¡Que lo disfrutes! (antes de comer)',    audio: '맛있게 드세요' },
  { ko: '잘 먹었습니다',              es: 'Gracias por la comida (después)',         audio: '잘 먹었습니다' },
  { ko: '잠시만요. 칠천 원이에요.',   es: 'Un momento. Son 7.000 wones.',           audio: '잠시만요' },
  { ko: '실례합니다',                 es: 'Disculpe (al interrumpir)',               audio: '실례합니다' },
  { ko: '안쪽 오른쪽에 있어요',       es: 'Está al fondo a la derecha',             audio: '안쪽 오른쪽에 있어요' },
];

/* ─── Confetti ───────────────────────────────────────────────────────────── */
interface Particle { id: number; x: number; size: number; color: string; delay: number; duration: number; shape: 'circle' | 'rect' }
const CONFETTI_COLORS = ['#6c63ff', '#22c55e', '#f59e0b', '#e879f9', '#06b6d4', '#8b5cf6'];

function useConfetti(active: boolean) {
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    if (!active) return;
    const ps: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 6 + Math.random() * 8,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: Math.random() * 1.2,
      duration: 2.2 + Math.random() * 1.4,
      shape: Math.random() > 0.5 ? 'circle' : 'rect',
    }));
    setParticles(ps);
    const t = setTimeout(() => setParticles([]), 5000);
    return () => clearTimeout(t);
  }, [active]);
  return particles;
}

/* ─── Component ───────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

export default function Completion005({ onComplete }: Props) {
  const [visible,   setVisible]   = useState(0);
  const [challenge, setChallenge] = useState(false);
  const [confetti,  setConfetti]  = useState(false);
  const startRef = useRef(Date.now());
  const particles = useConfetti(confetti);

  useEffect(() => {
    onComplete?.();
    const ct = setTimeout(() => setConfetti(true), 400);
    let n = 0;
    function step() {
      if (n > 14) return;
      const delay = n === 0 ? 300 : 160;
      setTimeout(() => { setVisible(v => v + 1); n++; step(); }, delay);
    }
    step();
    return () => clearTimeout(ct);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const elapsed = Math.max(1, Math.round((Date.now() - startRef.current) / 60000));

  const base: CSSProperties = {
    fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif',
    color: 'var(--foreground)',
  };

  return (
    <div style={{ ...base, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 18, position: 'relative' }}>
      <style>{`
        @keyframes cl5-pop   { from{opacity:0;transform:scale(0.78) translateY(22px)} to{opacity:1;transform:none} }
        @keyframes cl5-in    { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        @keyframes cl5-badge { 0%{opacity:0;transform:scale(0.6) rotate(-8deg)} 60%{transform:scale(1.12) rotate(2deg)} 100%{opacity:1;transform:scale(1) rotate(0deg)} }
        @keyframes cl5-fall  { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(110vh) rotate(720deg);opacity:0} }
        @keyframes cl5-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        .cl5-btn:hover   { filter:brightness(1.07); transform:translateY(-1px); transition:all 0.18s ease; }
        .cl5-skill:hover { transform:translateY(-2px); transition:transform 0.18s ease; }
      `}</style>

      {/* Confetti overlay */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'fixed', top: '-24px',
          left: `${p.x}vw`,
          width: p.shape === 'rect' ? p.size * 1.6 : p.size,
          height: p.size,
          borderRadius: p.shape === 'circle' ? '50%' : 3,
          background: p.color,
          opacity: 0,
          animation: `cl5-fall ${p.duration}s ${p.delay}s ease-in forwards`,
          zIndex: 9999, pointerEvents: 'none',
        }} />
      ))}

      {/* 1 — Badge */}
      {visible >= 1 && (
        <div style={{ textAlign: 'center', animation: 'cl5-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 12 }}>
            <div style={{ fontSize: 64, animation: 'cl5-pulse 2.5s 1s ease-in-out infinite' }}>🧾</div>
            <div style={{
              position: 'absolute', bottom: -4, right: -4, width: 26, height: 26, borderRadius: '50%',
              background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, animation: 'cl5-badge 0.6s 0.5s ease both', boxShadow: '0 0 0 3px var(--bg)',
            }}>✓</div>
          </div>
          <h2 style={{ margin: '0 0 6px', fontSize: 24, fontWeight: 800 }}>Step 005 completado</h2>
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6, maxWidth: 300, marginInline: 'auto' }}>
            Ya puedes cerrar una transacción completa en coreano — pagar, agradecer y orientar.
          </p>
        </div>
      )}

      {/* 2 — Stats chips */}
      {visible >= 2 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', animation: 'cl5-in 0.4s 0.1s ease both' }}>
          {[
            { label: `${elapsed} min`, sub: 'invertidos',   icon: '⏱️', color: '#06b6d4' },
            { label: '-습니다',         sub: 'nivel formal',  icon: '🎩', color: '#6c63ff' },
            { label: '칠천 원',         sub: 'sino-coreano', icon: '🔢', color: '#f59e0b' },
            { label: 'Steps 001–005',  sub: 'integrados',   icon: '🔄', color: '#22c55e' },
          ].map(({ label, sub, icon, color }) => (
            <div key={label} style={{ padding: '10px 14px', borderRadius: 14, textAlign: 'center', minWidth: 74, background: `${color}10`, border: `1px solid ${color}28` }}>
              <p style={{ margin: '0 0 2px', fontSize: 18 }}>{icon}</p>
              <p style={{ margin: '0 0 1px', fontSize: 13, fontWeight: 800, color }}>{label}</p>
              <p style={{ margin: 0, fontSize: 10, color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* 3 — Achievement badges */}
      {visible >= 3 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'center', animation: 'cl5-in 0.4s 0.12s ease both' }}>
          {[
            '🎩 -습니다 formal',
            '🍽 Bon appétit protocol',
            '🔢 Números sino-coreanos',
            '🗺️ Dar direcciones',
            '🧾 Transacción completa',
          ].map((badge, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 700, padding: '5px 13px', borderRadius: 100,
              background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#16a34a',
            }}>
              ✓ {badge}
            </span>
          ))}
        </div>
      )}

      {/* 4–7 — Skills breakdown */}
      {SKILLS.map((skill, si) => visible >= si + 4 && (
        <div key={si} className="cl5-skill" style={{
          background: 'var(--bg)', border: `1px solid ${skill.color}25`,
          borderRadius: 16, padding: '14px 16px', borderLeft: `3px solid ${skill.color}`,
          animation: 'cl5-in 0.4s ease both',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 17 }}>{skill.icon}</span>
            <p style={{ margin: 0, fontSize: 13.5, fontWeight: 800, color: 'var(--foreground)', flex: 1 }}>{skill.title}</p>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100,
              background: `${skill.color}15`, border: `1px solid ${skill.color}30`, color: skill.color,
            }}>✓ dominado</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            {skill.items.map((item, ii) => (
              <p key={ii} style={{ margin: 0, fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.5, paddingLeft: 10, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: skill.color, fontWeight: 800 }}>·</span>
                {item}
              </p>
            ))}
          </div>
        </div>
      ))}

      {/* 8 — Lo que puedes decir */}
      {visible >= 8 && (
        <div style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 16, padding: '16px', animation: 'cl5-in 0.4s ease both' }}>
          <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>
            🗣️ Frases que ya puedes usar
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PHRASES.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)', lineHeight: 1.3 }}>{p.ko}</p>
                  <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)' }}>{p.es}</p>
                </div>
                <button type="button" onClick={() => playAudio(p.audio)}
                  style={{ width: 34, height: 34, borderRadius: '50%', cursor: 'pointer', flexShrink: 0, background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>
                  🔊
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9 — Step006 preview */}
      {visible >= 9 && (
        <div style={{ background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.22)', borderRadius: 16, padding: '16px', animation: 'cl5-in 0.4s ease both' }}>
          <p style={{ margin: '0 0 3px', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.09em', color: '#6c63ff' }}>Próximamente</p>
          <p style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 800, color: 'var(--foreground)' }}>Step 006 — La universidad</p>
          <p style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--muted)' }}>David llega a la universidad. Nuevas situaciones: preguntar por aulas, horarios y compañeros.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['어디예요?', '몇 시예요?', '학생이에요', '교실', '도서관'].map(item => (
              <span key={item} style={{
                fontSize: 12, fontWeight: 500, fontFamily: '"Noto Sans KR",sans-serif',
                padding: '4px 12px', borderRadius: 100,
                background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.22)', color: 'var(--foreground)',
              }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 10 — Desafío real */}
      {visible >= 10 && !challenge && (
        <button type="button" className="cl5-btn" onClick={() => setChallenge(true)}
          style={{
            padding: '15px', borderRadius: 14, cursor: 'pointer', width: '100%',
            background: 'rgba(245,158,11,0.14)', border: '1px solid rgba(245,158,11,0.4)',
            fontSize: 13.5, fontWeight: 800, color: '#f59e0b',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            animation: 'cl5-in 0.4s ease both',
          }}>
          🎯 Acepta el desafío de la semana →
        </button>
      )}

      {visible >= 10 && challenge && (
        <div style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 14, padding: '18px', animation: 'cl5-in 0.4s ease both' }}>
          <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.07em' }}>🎯 Tu misión esta semana</p>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>
            En cualquier situación real o imaginada, practica la secuencia completa en voz alta:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { n: '1', ko: '여기 있습니다',              hint: 'Entrega algo a alguien' },
              { n: '2', ko: '맛있게 드세요',              hint: 'Antes de que alguien coma' },
              { n: '3', ko: '잠시만요. [precio] 원이에요', hint: 'Da el precio en sino-coreano' },
              { n: '4', ko: '안쪽 오른쪽에 있어요',       hint: 'Indica una dirección' },
            ].map(({ n, ko, hint }) => (
              <div key={n} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0',
                borderBottom: n !== '4' ? '1px solid rgba(245,158,11,0.15)' : 'none',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', background: 'rgba(245,158,11,0.2)',
                  border: '1px solid rgba(245,158,11,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, color: '#f59e0b', flexShrink: 0,
                }}>{n}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>{ko}</p>
                  <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)' }}>{hint}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ margin: '14px 0 0', fontSize: 12, color: 'var(--muted)', lineHeight: 1.55, fontStyle: 'italic' }}>
            Con Steps 001–005 ya tienes una conversación completa de café. Repítela en voz alta — cada repetición consolida la memoria muscular.
          </p>
        </div>
      )}
    </div>
  );
}
