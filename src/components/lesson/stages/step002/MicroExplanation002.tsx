'use client';

import { useState } from 'react';
import MicroChallenge from '@/components/lesson/engine/MicroChallenge';
import StreakBar from '@/components/lesson/engine/StreakBar';
import { useSound } from '@/components/lesson/engine/useSound';

interface Props { onComplete?: () => void; }

// ── Capsule accent colors ───────────────────────────────────────────────────────
const ACCENTS = ['#6c63ff', '#e6930a', '#a78bfa', '#059669', '#7c3aed'];

// ── Visual blocks (JSX returned from factory functions, not stored in data) ─────

function Visual1() {
  return (
    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', margin: '12px 0' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Español</p>
        <div style={{ display: 'flex', gap: 4 }}>
          {['c', 'a', '-', 's', 'a'].map((ch, i) =>
            ch === '-'
              ? <span key={i} style={{ fontSize: 18, color: 'var(--muted)', alignSelf: 'center' }}>·</span>
              : <span key={i} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, border: '1.5px solid var(--line-soft)', borderRadius: 6, fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{ch}</span>
          )}
        </div>
        <p style={{ margin: '4px 0 0', fontSize: 11, color: 'var(--muted)' }}>letras en línea</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: 18, color: 'var(--muted)' }}>→</div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Coreano</p>
        <div style={{ display: 'flex', gap: 6 }}>
          {['가', '사'].map((ch, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, border: '2px solid rgba(108,99,255,0.35)', borderRadius: 8, fontSize: 26, fontWeight: 700, color: '#6c63ff', fontFamily: "'Noto Sans KR', sans-serif", background: 'rgba(108,99,255,0.05)' }}>{ch}</span>
          ))}
        </div>
        <p style={{ margin: '4px 0 0', fontSize: 11, color: 'var(--muted)' }}>bloques cuadrados</p>
      </div>
    </div>
  );
}

function Visual2() {
  return (
    <div style={{ overflowX: 'auto', margin: '12px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            {['Simple', '+ Aire (aspirada)', 'Seca (tensa)'].map(h => (
              <th key={h} style={{ padding: '8px 10px', background: 'var(--bg-2)', border: '1px solid var(--line-soft)', fontWeight: 700, color: 'var(--ink)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['ㅂ /b/', 'ㅍ /p/', 'ㅃ /pp/'],
            ['ㄷ /d/', 'ㅌ /t/', 'ㄸ /tt/'],
            ['ㄱ /g/', 'ㅋ /k/', 'ㄲ /kk/'],
          ].map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: '10px', border: '1px solid var(--line-soft)', textAlign: 'center', color: ci === 0 ? '#0ea5e9' : ci === 1 ? '#f59e0b' : '#ef4444', fontFamily: "'Noto Sans KR', sans-serif", fontSize: 15, fontWeight: 700 }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Visual3() {
  const rows = [
    { jamo: 'ㅏ', desc: 'como \'a\' en "casa"', ok: true },
    { jamo: 'ㅣ', desc: 'como \'i\' en "sí"', ok: true },
    { jamo: 'ㅗ', desc: 'como \'o\' cerrada', ok: true },
    { jamo: 'ㅜ', desc: 'como \'u\' en "luna"', ok: true },
    { jamo: 'ㅡ', desc: 'NO existe en español — "dientes juntos, sin redondear labios"', ok: false },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '12px 0' }}>
      {rows.map(({ jamo, desc, ok }) => (
        <div key={jamo} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, background: ok ? 'rgba(45,155,78,0.04)' : 'rgba(245,158,11,0.06)', border: `1px solid ${ok ? 'rgba(45,155,78,0.15)' : 'rgba(245,158,11,0.25)'}` }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: ok ? '#2d9b4e' : '#d97706', fontFamily: "'Noto Sans KR', sans-serif", minWidth: 28, textAlign: 'center' }}>{jamo}</span>
          <span style={{ fontSize: 12, color: 'var(--ink)', lineHeight: 1.5 }}>{desc}</span>
          <span style={{ marginLeft: 'auto', fontSize: 14 }}>{ok ? '✅' : '⚠️'}</span>
        </div>
      ))}
    </div>
  );
}

function Visual4() {
  const items = [
    { combo: 'ㄹ+ㅏ = 라', note: 'como "ra" en "cara"' },
    { combo: 'ㄹ+ㅣ = 리', note: 'como "ri" en "mira"' },
    { combo: '오늘', note: 'o-neul — la ㄹ final suena como "l" española' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '12px 0' }}>
      {items.map(({ combo, note }) => (
        <div key={combo} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, background: 'rgba(45,155,78,0.04)', border: '1px solid rgba(45,155,78,0.15)' }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#2d9b4e', fontFamily: "'Noto Sans KR', sans-serif" }}>{combo}</span>
          <span style={{ fontSize: 12, color: 'var(--ink)', lineHeight: 1.5 }}>{note}</span>
          <span style={{ marginLeft: 'auto', fontSize: 14 }}>✅</span>
        </div>
      ))}
    </div>
  );
}

function Visual5() {
  return (
    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', margin: '12px 0' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>CV — sin batchim</p>
        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', border: '2px solid rgba(108,99,255,0.3)', borderRadius: 8, padding: '6px 14px', background: 'rgba(108,99,255,0.04)' }}>
          <div style={{ display: 'flex', gap: 2, fontSize: 13, color: '#0ea5e9', fontFamily: "'Noto Sans KR', sans-serif" }}>
            <span>ㄱ</span><span style={{ color: '#6c63ff' }}>ㅏ</span>
          </div>
          <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', fontFamily: "'Noto Sans KR', sans-serif" }}>가</span>
        </div>
        <p style={{ margin: '4px 0 0', fontSize: 10, color: 'var(--muted)' }}>ㄱ arriba + ㅏ derecha</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: 18, color: 'var(--muted)' }}>→</div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>CVC — con batchim</p>
        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', border: '2px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '6px 14px', background: 'rgba(239,68,68,0.04)' }}>
          <div style={{ display: 'flex', gap: 2, fontSize: 13, color: '#0ea5e9', fontFamily: "'Noto Sans KR', sans-serif" }}>
            <span>ㄱ</span><span style={{ color: '#6c63ff' }}>ㅏ</span>
          </div>
          <span style={{ fontSize: 13, color: '#ef4444', fontFamily: "'Noto Sans KR', sans-serif" }}>ㄱ</span>
          <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', fontFamily: "'Noto Sans KR', sans-serif" }}>각</span>
        </div>
        <p style={{ margin: '4px 0 0', fontSize: 10, color: 'var(--muted)' }}>ㄱ+ㅏ+ㄱ (abajo)</p>
      </div>
      <div style={{ width: '100%', display: 'flex', gap: 10, justifyContent: 'center', marginTop: 4 }}>
        {[['글', 'ㄱ+ㅡ+ㄹ'], ['늘', 'ㄴ+ㅡ+ㄹ'], ['금', 'ㄱ+ㅡ+ㅁ']].map(([ch, parts]) => (
          <div key={ch} style={{ textAlign: 'center', padding: '6px 10px', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
            <span style={{ display: 'block', fontSize: 22, fontWeight: 700, color: '#6c63ff', fontFamily: "'Noto Sans KR', sans-serif" }}>{ch}</span>
            <span style={{ fontSize: 10, color: 'var(--muted)' }}>{parts}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Capsule data ────────────────────────────────────────────────────────────────

interface CapsuleData {
  icon: string;
  title: string;
  body: string;
  visual: React.ReactNode;
  note: string;
  challenge: {
    question: string;
    options: Array<{ label: string; sublabel?: string; isKorean?: boolean }>;
    correctIndex: number;
    explanation: string;
    accent: string;
  };
}

const CAPSULES: CapsuleData[] = [
  {
    icon: '🧱',
    title: 'Hangul se escribe en bloques, no en línea',
    body: 'En español escribimos letra por letra en línea: c-a-s-a. En coreano, las letras se agrupan en bloques cuadrados que representan sílabas. Cada bloque es una sílaba completa.',
    visual: <Visual1 />,
    note: 'El coreano siempre tiene al menos una consonante inicial + una vocal. Si la sílaba empieza con vocal, se usa ㅇ como marcador mudo.',
    challenge: {
      question: '¿Cuál es la unidad básica de escritura en coreano?',
      options: [
        { label: 'Una letra suelta' },
        { label: 'Un bloque silábico', sublabel: 'consonante + vocal' },
        { label: 'Una palabra completa' },
      ],
      correctIndex: 1,
      explanation: 'En coreano cada sílaba forma un cuadrado visual. 가 es una sílaba = un bloque. No se lee letra por letra.',
      accent: '#6c63ff',
    },
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Cada consonante tiene una familia',
    body: 'Las consonantes coreanas vienen en tríos: simple, aspirada (con aire) y tensa (seca/explosiva). Si aprendes una, aprendes las tres.',
    visual: <Visual2 />,
    note: 'Para pronunciar las aspiradas (ㅍ ㅌ ㅋ): sopla aire, como si apagaras una vela. Para las tensas (ㅃ ㄸ ㄲ): tensa la garganta, sin aire.',
    challenge: {
      question: '¿Cuál es la versión aspirada (con aire) de ㅂ?',
      options: [
        { label: 'ㅃ', isKorean: true, sublabel: 'tensa' },
        { label: 'ㅍ', isKorean: true, sublabel: 'aspirada' },
        { label: 'ㅁ', isKorean: true, sublabel: 'nasal' },
      ],
      correctIndex: 1,
      explanation: 'ㅍ es la aspirada — suenas como \'p\' con aire. Familia: ㅂ(simple) → ㅍ(aspirada) → ㅃ(tensa).',
      accent: '#e6930a',
    },
  },
  {
    icon: '😬',
    title: 'ㅡ no existe en español',
    body: 'El español tiene 5 vocales claras. El coreano tiene una más: ㅡ. Para pronunciarla, pon la boca como si fueras a decir "o" o "u", pero sin redondear los labios. Es una vocal trasera no-redondeada.',
    visual: <Visual3 />,
    note: 'Aparece en 글자, 이제, 조금. Practica: di "u" y luego estira los labios sin moverlos.',
    challenge: {
      question: '¿Cuál de estas vocales NO existe en español?',
      options: [
        { label: 'ㅏ', isKorean: true, sublabel: 'como "a"' },
        { label: 'ㅗ', isKorean: true, sublabel: 'como "o"' },
        { label: 'ㅡ', isKorean: true, sublabel: 'sin equivalente' },
      ],
      correctIndex: 2,
      explanation: 'ㅡ /ɯ/ es la única vocal sin equivalente directo en español. Aparece en 글자, 이제, 조금.',
      accent: '#a78bfa',
    },
  },
  {
    icon: '🎉',
    title: '¡Ya sabes pronunciar ㄹ!',
    body: 'Los hispanohablantes tienen una ventaja enorme: ㄹ en coreano suena exactamente como la "r" suave española — la de "pero", "cara", "loro". No es la "rr" fuerte de "perro". Es el tap.',
    visual: <Visual4 />,
    note: 'Los angloparlantes tienen dificultad enorme con ㄹ. Tú ya la tienes. Esto te da semanas de ventaja.',
    challenge: {
      question: 'ㄹ entre vocales suena como...',
      options: [
        { label: 'la "rr" de "perro"' },
        { label: 'la "r" de "pero"', sublabel: 'tap suave' },
        { label: 'la "l" de "libro"' },
      ],
      correctIndex: 1,
      explanation: '¡Exacto! ㄹ entre vocales = tap /ɾ/ como en \'pero\'. Al final de sílaba → /l/ como en \'sol\'. Ventaja enorme para hispanohablantes.',
      accent: '#059669',
    },
  },
  {
    icon: '🏗️',
    title: 'Consonantes que van abajo del bloque',
    body: 'Un bloque silábico puede tener una consonante al final, debajo de todo. Se llama 받침 (batchim). La sílaba pasa de CV a CVC.',
    visual: <Visual5 />,
    note: 'En step002 ya viste 받침: 글자, 오늘. En el siguiente paso aprenderemos a leerlos con fluidez.',
    challenge: {
      question: 'En la sílaba 글, ¿dónde va la consonante ㄹ?',
      options: [
        { label: 'Al inicio del bloque', sublabel: 'arriba' },
        { label: 'Al final, abajo del bloque', sublabel: '받침' },
        { label: 'A la derecha de la vocal' },
      ],
      correctIndex: 1,
      explanation: 'ㄹ es el 받침 (batchim) de 글 — va debajo de ㄱ+ㅡ para cerrar la sílaba. 글자 = [글]+[자] → \'letras\'.',
      accent: '#7c3aed',
    },
  },
];

// ── Component ───────────────────────────────────────────────────────────────────

export default function MicroExplanation002({ onComplete }: Props) {
  const [current, setCurrent] = useState(0);
  const [passed, setPassed] = useState(false);  // has current capsule's challenge been passed?
  const [streak, setStreak] = useState(0);
  const { complete } = useSound();

  const capsule = CAPSULES[current];
  const isLast = current === CAPSULES.length - 1;
  const accent = ACCENTS[current];

  function handlePass() {
    setStreak(s => s + 1);
    complete();
    setPassed(true);
  }

  function handleNext() {
    if (isLast) {
      setTimeout(() => {
        complete();
        onComplete?.();
      }, 300);
    } else {
      setCurrent(c => c + 1);
      setPassed(false);
    }
  }

  return (
    <section style={{ maxWidth: 600, margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Top row: progress bar + streak */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 4, flex: 1 }}>
          {CAPSULES.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: i < current ? '#6c63ff' : i === current ? accent : 'var(--line-soft)',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>
        <StreakBar streak={streak} />
      </div>

      {/* Capsule counter */}
      <p style={{ margin: '0 0 16px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, fontWeight: 700 }}>
        CÁPSULA {current + 1} DE {CAPSULES.length} · ~90 seg
      </p>

      {/* Card */}
      <article style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 16, padding: '24px 20px', marginBottom: 14 }}>
        {/* Icon */}
        <div style={{ fontSize: '4rem', lineHeight: 1, marginBottom: 12, textAlign: 'center' }}>
          {capsule.icon}
        </div>

        {/* Title */}
        <h3 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3, textAlign: 'center' }}>
          {capsule.title}
        </h3>

        {/* Body */}
        <p style={{ margin: '0 0 4px', fontSize: 15, color: 'var(--ink)', lineHeight: 1.6 }}>
          {capsule.body}
        </p>

        {/* Visual */}
        {capsule.visual}

        {/* Note */}
        <div style={{ marginTop: 14, padding: '12px 14px', background: `${accent}10`, border: `1px solid ${accent}30`, borderRadius: 10 }}>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--ink)', lineHeight: 1.6 }}>
            <strong style={{ color: accent }}>Nota: </strong>
            {capsule.note}
          </p>
        </div>

        {/* Divider */}
        <div style={{ margin: '20px 0 16px', height: 1, background: 'var(--line-soft)' }} />

        {/* MicroChallenge */}
        <MicroChallenge
          question={capsule.challenge.question}
          options={capsule.challenge.options}
          correctIndex={capsule.challenge.correctIndex}
          explanation={capsule.challenge.explanation}
          accent={capsule.challenge.accent}
          onPass={handlePass}
          allowRetry
          autoAdvanceMs={0}
        />
      </article>

      {/* Next button — only shown after challenge passed */}
      {passed && (
        <button
          type="button"
          onClick={handleNext}
          style={{
            width: '100%',
            padding: '14px',
            background: isLast ? '#2d9b4e' : accent,
            border: 'none',
            borderRadius: 12,
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'background 0.25s',
          }}
        >
          {isLast ? '✅ Entendido — Continuar →' : 'Siguiente →'}
        </button>
      )}
    </section>
  );
}
