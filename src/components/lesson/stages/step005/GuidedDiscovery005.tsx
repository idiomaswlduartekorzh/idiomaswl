'use client';

import { useState } from 'react';
import { playAudio } from '@/lib/storage';

interface Props { onComplete?: () => void }

const GREEN  = '#2d9b4e';
const PURPLE = '#6c63ff';
const AMBER  = '#f59e0b';

type BlockStep =
  | { kind: 'intro';    section: string; color: string; title: string; body: string }
  | { kind: 'ejemplos'; section: string; color: string; items: { kr: string; es: string; audio: string; highlight: string }[] }
  | { kind: 'ejercicio'; section: string; color: string; question: string; options: { text: string; correct: boolean }[]; feedback: string }
  | { kind: 'tabla';    section: string; color: string; rows: { kr: string; rom: string; value: string; es: string }[] }
  | { kind: 'fill';     section: string; color: string; prefix: string; suffix: string; options: string[]; correct: string; es: string; audio: string };

const STEPS: BlockStep[] = [
  // ── Bloque A: 잘 + verbo ────────────────────────────────────────────────────
  {
    kind: 'intro', section: 'A', color: GREEN,
    title: '잘 — el adverbio comodín',
    body: '잘 significa "bien" o "de forma satisfactoria". Va siempre antes del verbo y aparece en muchas frases del episodio de hoy. Descubre el patrón en los ejemplos.',
  },
  {
    kind: 'ejemplos', section: 'A', color: GREEN,
    items: [
      { kr: '잘 먹었습니다',   es: 'Comí bien — gracias por la comida',      audio: '잘 먹었습니다',   highlight: '잘' },
      { kr: '잘 모르겠어요',   es: 'No lo sé bien — no estoy seguro',        audio: '잘 모르겠어요',   highlight: '잘' },
      { kr: '잘 잤어요?',      es: '¿Dormiste bien?',                         audio: '잘 잤어요?',       highlight: '잘' },
      { kr: '잘 지내요',       es: 'Estoy bien / todo bien (saludo)',         audio: '잘 지내요',        highlight: '잘' },
    ],
  },
  {
    kind: 'ejercicio', section: 'A', color: GREEN,
    question: 'Quieres decir "no lo sé bien" para suavizar una pregunta. ¿Cuál es la frase?',
    options: [
      { text: '잘 모르겠어요', correct: true },
      { text: '모르겠어요 잘', correct: false },
      { text: '잘이에요 모르겠어요', correct: false },
    ],
    feedback: '¡Correcto! 잘 siempre va ANTES del verbo. El orden es: 잘 + [verbo].',
  },
  // ── Bloque B: -습니다 formal ─────────────────────────────────────────────────
  {
    kind: 'intro', section: 'B', color: PURPLE,
    title: '-습니다 vs -어요 — dos registros',
    body: 'En coreano el mismo mensaje puede sonar casual o profesional según la terminación verbal. David usa -습니다 con los clientes porque es el nivel de servicio formal.',
  },
  {
    kind: 'ejemplos', section: 'B', color: PURPLE,
    items: [
      { kr: '있어요 → 있습니다',    es: 'casual → formal (hay / existe)',     audio: '여기 있습니다',   highlight: '있습니다' },
      { kr: '먹었어요 → 먹었습니다', es: 'casual → formal (comí)',            audio: '잘 먹었습니다',   highlight: '먹었습니다' },
      { kr: '이에요 → 입니다',       es: 'casual → formal (es / son)',        audio: '칠천 원이에요',   highlight: '이에요' },
      { kr: '감사해요 → 감사합니다', es: 'casual → formal (gracias)',          audio: '감사합니다',      highlight: '감사합니다' },
    ],
  },
  {
    kind: 'ejercicio', section: 'B', color: PURPLE,
    question: 'Trabajas en una cafetería y quieres decir "son 5.000 wones" de forma profesional. ¿Cuál usas?',
    options: [
      { text: '오천 원이에요', correct: false },
      { text: '오천 원입니다', correct: true },
      { text: '오천 원이었어요', correct: false },
    ],
    feedback: '✅ 오천 원입니다 — forma formal de 원이에요. En una tienda o cafetería el nivel -습니다/ㅂ니다 proyecta profesionalismo.',
  },
  // ── Bloque C: Números sino-coreanos para precios ─────────────────────────────
  {
    kind: 'intro', section: 'C', color: AMBER,
    title: 'Sino-coreano para precios — 칠천 원',
    body: 'Los precios en coreano usan SIEMPRE el sistema sino-coreano. En step004 aprendiste los números nativos (하나/둘/셋) para contar objetos físicos. Ahora el otro sistema.',
  },
  {
    kind: 'tabla', section: 'C', color: AMBER,
    rows: [
      { kr: '일',  rom: 'il',   value: '1',      es: '(sino-coreano)' },
      { kr: '이',  rom: 'i',    value: '2',      es: '' },
      { kr: '삼',  rom: 'sam',  value: '3',      es: '' },
      { kr: '사',  rom: 'sa',   value: '4',      es: '' },
      { kr: '오',  rom: 'o',    value: '5',      es: '' },
      { kr: '육',  rom: 'yuk',  value: '6',      es: '' },
      { kr: '칠',  rom: 'chil', value: '7',      es: '← del episodio' },
      { kr: '천',  rom: 'cheon', value: '1.000', es: 'multiplicador' },
      { kr: '만',  rom: 'man',  value: '10.000', es: 'multiplicador' },
    ],
  },
  {
    kind: 'fill', section: 'C', color: AMBER,
    prefix: '', suffix: '천 원이에요 (son 4.000 wones)',
    options: ['사', '네', '넷', '사이'],
    correct: '사',
    es: '사천 원이에요 — son 4.000 wones',
    audio: '칠천 원이에요',
  },
  {
    kind: 'ejercicio', section: 'C', color: AMBER,
    question: 'Un café cuesta 4.500₩. ¿Cómo se dice?',
    options: [
      { text: '네다섯백 원이에요', correct: false },
      { text: '사천오백 원이에요', correct: true },
      { text: '하나네오백 원이에요', correct: false },
    ],
    feedback: '✅ 사천오백 원이에요 — sa(4) + cheon(1000) + o(5) + baek(100). Los precios siempre usan sino-coreano de principio a fin.',
  },
];

export default function GuidedDiscovery005({ onComplete }: Props) {
  const [stepIdx,  setStepIdx]  = useState(0);
  const [picked,   setPicked]   = useState<number | null>(null);
  const [correct,  setCorrect]  = useState(0);
  const [fillAns,  setFillAns]  = useState<string | null>(null);

  const step = STEPS[stepIdx];
  const isLast = stepIdx === STEPS.length - 1;

  function advance() { setPicked(null); setFillAns(null); setStepIdx(i => i + 1); }

  function highlightItem(kr: string, hl: string, color: string) {
    const parts = kr.split(hl);
    return parts.map((p, i) => (
      <span key={i}>{p}{i < parts.length - 1 && <strong style={{ color, background: `${color}22`, borderRadius: 4, padding: '0 2px' }}>{hl}</strong>}</span>
    ));
  }

  return (
    <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--foreground)' }}>
      <p style={{ margin: '0 0 8px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>ETAPA 06 DE 11 · Descubre el patrón</p>
      <div style={{ height: 4, borderRadius: 2, background: 'var(--line-soft)', marginBottom: 20 }}>
        <div style={{ height: '100%', width: `${((stepIdx + 1) / STEPS.length) * 100}%`, background: step.color, borderRadius: 2, transition: 'width 0.3s' }} />
      </div>

      {/* INTRO */}
      {step.kind === 'intro' && (
        <div style={{ background: `${step.color}0d`, border: `1px solid ${step.color}33`, borderRadius: 14, padding: '20px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: step.color, letterSpacing: '0.1em' }}>BLOQUE {step.section}</span>
          <h3 style={{ margin: '8px 0 10px', fontSize: 18, fontWeight: 800, fontFamily: "'Noto Sans KR', sans-serif" }}>{step.title}</h3>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--foreground)' }}>{step.body}</p>
        </div>
      )}

      {/* EJEMPLOS */}
      {step.kind === 'ejemplos' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {step.items.map((ex, i) => (
            <button key={i} onClick={() => playAudio(ex.audio)}
              style={{ background: 'var(--bg)', border: `1px solid ${step.color}33`, borderRadius: 12, padding: '14px 16px', textAlign: 'left', cursor: 'pointer' }}>
              <p style={{ margin: '0 0 4px', fontSize: 20, fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700 }}>
                {highlightItem(ex.kr, ex.highlight, step.color)}
              </p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>{ex.es} <span style={{ fontSize: 11 }}>🔊</span></p>
            </button>
          ))}
        </div>
      )}

      {/* TABLA */}
      {step.kind === 'tabla' && (
        <div style={{ background: 'var(--bg)', border: `1px solid ${step.color}33`, borderRadius: 14, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: `${step.color}15` }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: step.color }}>한글</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--muted)' }}>Rom.</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700, color: step.color }}>Valor</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--muted)', fontSize: 12 }}>Nota</th>
              </tr>
            </thead>
            <tbody>
              {step.rows.map((r, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--line-soft)', background: r.es.includes('←') ? `${step.color}08` : undefined }}>
                  <td style={{ padding: '9px 14px', fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700, fontSize: 18, color: r.es.includes('←') ? step.color : 'var(--ink)' }}>{r.kr}</td>
                  <td style={{ padding: '9px 14px', fontFamily: 'var(--mono)', color: 'var(--muted)', fontSize: 13 }}>{r.rom}</td>
                  <td style={{ padding: '9px 14px', textAlign: 'right', fontWeight: 700 }}>{r.value}</td>
                  <td style={{ padding: '9px 14px', color: 'var(--muted)', fontSize: 12 }}>{r.es}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* FILL */}
      {step.kind === 'fill' && (
        <div style={{ background: 'var(--bg)', border: `1px solid ${step.color}33`, borderRadius: 14, padding: '20px' }}>
          <p style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, fontFamily: "'Noto Sans KR', sans-serif" }}>
            {step.prefix}<span style={{ borderBottom: `2px solid ${step.color}`, minWidth: 32, display: 'inline-block', textAlign: 'center' }}>{fillAns ?? '___'}</span>{step.suffix}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {step.options.map(opt => (
              <button key={opt} onClick={() => { setFillAns(opt); playAudio(step.audio); }}
                style={{ background: fillAns === opt ? (opt === step.correct ? 'rgba(45,155,78,0.15)' : 'rgba(239,68,68,0.1)') : 'var(--bg-2,#f5f5f7)', border: fillAns === opt ? (opt === step.correct ? '1px solid #2d9b4e' : '1px solid #ef4444') : '1px solid var(--line-soft)', borderRadius: 10, padding: '10px 18px', fontSize: 16, fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700, cursor: 'pointer' }}>
                {opt}
              </button>
            ))}
          </div>
          {fillAns && (
            <p style={{ marginTop: 12, fontSize: 13, color: fillAns === step.correct ? GREEN : '#ef4444', fontWeight: 600 }}>
              {fillAns === step.correct ? `✅ ${step.es}` : `❌ Intenta con otra opción`}
            </p>
          )}
        </div>
      )}

      {/* EJERCICIO */}
      {step.kind === 'ejercicio' && (
        <div style={{ background: 'var(--bg)', border: `1px solid ${step.color}33`, borderRadius: 14, padding: '20px' }}>
          <p style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 600 }}>🧩 {step.question}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {step.options.map((opt, i) => {
              const isCorrect = opt.correct;
              const isPicked  = picked === i;
              const bg = picked === null ? 'var(--bg-2,#f5f5f7)' : isCorrect ? 'rgba(45,155,78,0.15)' : isPicked ? 'rgba(239,68,68,0.1)' : 'var(--bg-2,#f5f5f7)';
              const border = picked === null ? '1px solid var(--line-soft)' : isCorrect ? '1px solid #2d9b4e' : isPicked ? '1px solid #ef4444' : '1px solid var(--line-soft)';
              return (
                <button key={i} onClick={() => { if (picked !== null) return; setPicked(i); if (isCorrect) setCorrect(c => c + 1); }}
                  style={{ background: bg, border, borderRadius: 10, padding: '12px 16px', textAlign: 'left', fontSize: 14, fontFamily: "'Noto Sans KR', sans-serif", cursor: picked !== null ? 'default' : 'pointer', transition: 'all 0.2s' }}>
                  {isPicked && !isCorrect ? '❌ ' : isCorrect && picked !== null ? '✅ ' : ''}{opt.text}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <p style={{ marginTop: 12, fontSize: 13, background: `${step.color}11`, borderRadius: 8, padding: '10px 14px', lineHeight: 1.5 }}>
              {step.feedback}
            </p>
          )}
        </div>
      )}

      {/* Navigation */}
      <div style={{ marginTop: 20 }}>
        {isLast ? (
          <button onClick={() => onComplete?.()} style={{ width: '100%', background: '#2d9b4e', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            Completado — continuar →
          </button>
        ) : (
          <button
            onClick={advance}
            disabled={
              (step.kind === 'ejercicio' && picked === null) ||
              (step.kind === 'fill' && (fillAns === null || fillAns !== step.correct))
            }
            style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14, fontWeight: 600, cursor: 'pointer', opacity: (step.kind === 'ejercicio' && picked === null) || (step.kind === 'fill' && (fillAns === null || fillAns !== step.correct)) ? 0.5 : 1 }}>
            Siguiente →
          </button>
        )}
      </div>
    </section>
  );
}
