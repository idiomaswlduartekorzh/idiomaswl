'use client';

import { useState } from 'react';
import { useSound } from '@/components/lesson/engine/useSound';

// ── Completion002 — Hangul Day ─────────────────────────────────────────────────
// Objetivo: al terminar esta etapa, el usuario sabe qué es el Hangul,
// cómo funciona el sistema de bloques, y está listo para empezar a leer y escribir.

interface CheckItem {
  kr: string;
  label: string;
  note: string;
  color: string;
}

const WHAT_YOU_KNOW: CheckItem[] = [
  { kr: '한글', label: 'El nombre correcto es Hangul, no "coreano"', note: '세종대왕 lo diseñó en 1446 — científicamente, no al azar.', color: 'var(--wl-on-panel-link, #6c63ff)' },
  { kr: '아이', label: 'Las letras se agrupan en bloques silábicos cuadrados', note: 'Cada bloque = una sílaba. El coreano no se lee letra a letra como el español.', color: 'var(--wl-on-panel-ok, #059669)' },
  { kr: 'ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ', label: '6 vocales core', note: 'ㅡ es la única sin equivalente en español. Las demás ya las tienes.', color: '#e6930a' },
  { kr: 'ㄴ ㅁ ㄹ ㅇ', label: 'Nasales y sonorantes', note: 'ㄹ = "r" de "pero". Tu ventaja más grande sobre angloparlantes.', color: 'var(--wl-on-panel-teal, #0891b2)' },
  { kr: 'ㄱ ㄷ ㅂ → ㅋ ㅌ ㅍ → ㄲ ㄸ ㅃ', label: 'Familias tripartitas de consonantes', note: 'Simple → Aspirada (con aire) → Tensa (seca). Aprendes 3 a la vez.', color: 'var(--wl-on-panel-alert, #dc2626)' },
  { kr: '글자', label: 'Consonante final (받침) debajo del bloque', note: '글 = ㄱ+ㅡ+ㄹ. El 받침 va debajo de la vocal. Lo viste en 글자, 오늘, 조금.', color: 'var(--wl-on-panel-purple, #7c3aed)' },
];

const VOCAB_DAY2 = [
  { kr: '어제', es: 'ayer' },
  { kr: '오늘', es: 'hoy' },
  { kr: '이제', es: 'ahora / ya' },
  { kr: '글자', es: 'letras' },
  { kr: '조금', es: 'un poco' },
  { kr: '보여요', es: 'se ve' },
  { kr: '뭐', es: '¿qué?' },
  { kr: '나', es: 'yo (informal)' },
  { kr: '너', es: 'tú' },
];

const KEY_SENTENCE = {
  kr: '이제 글자가 조금 보여요.',
  es: 'Ahora las letras se ven un poco.',
  breakdown: [
    { kr: '이제', es: 'ahora' },
    { kr: '글자가', es: 'las letras (+ partícula sujeto)' },
    { kr: '조금', es: 'un poco' },
    { kr: '보여요', es: 'se ven' },
  ],
};

interface Props { onComplete?: () => void }

export default function Completion002({ onComplete }: Props) {
  const [phase, setPhase] = useState<'summary' | 'vocab' | 'sentence' | 'ready'>('summary');
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [sentenceRevealed, setSentenceRevealed] = useState(false);
  const { korean, complete: playComplete, assemble: playAssemble } = useSound();

  function toggleCheck(i: number) {
    playAssemble();
    setCheckedItems(prev => {
      const s = new Set(prev);
      if (s.has(i)) s.delete(i); else s.add(i);
      return s;
    });
  }

  const allChecked = checkedItems.size === WHAT_YOU_KNOW.length;

  if (phase === 'summary') {
    return (
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>🏗️</div>
          <p style={{ margin: '0 0 6px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
            ETAPA 11 · Cierre del Día 2
          </p>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            El Hangul ya no es un misterio
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: '0 auto' }}>
            Completa la lista de verificación — confirma lo que tienes claro antes de pasar al Día 3.
          </p>
        </div>

        {/* Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {WHAT_YOU_KNOW.map((item, i) => (
            <div
              key={i}
              onClick={() => toggleCheck(i)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px',
                borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s',
                border: `1.5px solid ${checkedItems.has(i) ? item.color : 'var(--line-soft)'}`,
                background: checkedItems.has(i) ? `${item.color}08` : 'var(--bg)',
              }}
            >
              {/* Check circle */}
              <div style={{
                width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                border: `2px solid ${checkedItems.has(i) ? item.color : 'var(--line-soft)'}`,
                background: checkedItems.has(i) ? item.color : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}>
                {checkedItems.has(i) && <span style={{ color: '#fff', fontSize: 13, fontWeight: 900 }}>✓</span>}
              </div>
              <div style={{ flex: 1 }}>
                {/* Korean example */}
                <div style={{ fontSize: 20, fontFamily: "'Noto Sans KR', sans-serif", color: item.color, fontWeight: 700, marginBottom: 3, lineHeight: 1.2 }}>
                  {item.kr}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.4 }}>
                  {item.note}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress message */}
        {checkedItems.size > 0 && !allChecked && (
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}>
            {checkedItems.size} / {WHAT_YOU_KNOW.length} — sigue marcando lo que tienes claro
          </p>
        )}

        <button
          type="button"
          onClick={() => setPhase('vocab')}
          disabled={!allChecked}
          style={{
            width: '100%', borderRadius: 10, padding: '14px',
            fontSize: 15, fontWeight: 700, cursor: allChecked ? 'pointer' : 'not-allowed',
            border: 'none',
            background: allChecked ? '#6c63ff' : 'var(--bg-2)',
            color: allChecked ? '#fff' : 'var(--muted)',
            transition: 'all 0.2s',
          }}
        >
          {allChecked ? 'Revisar vocabulario del día →' : `Marca los ${WHAT_YOU_KNOW.length - checkedItems.size} conceptos restantes`}
        </button>
      </section>
    );
  }

  if (phase === 'vocab') {
    return (
      <section style={{ maxWidth: 580, margin: '0 auto', padding: '2rem 1rem' }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 6px', letterSpacing: '-0.01em' }}>
          Vocabulario del Día 2
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20, lineHeight: 1.5 }}>
          {VOCAB_DAY2.length} palabras nuevas. Tócalas para escuchar la pronunciación.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8, marginBottom: 24 }}>
          {VOCAB_DAY2.map((v, i) => (
            <button
              key={v.kr}
              type="button"
              onClick={() => korean(v.kr, 0.85)}
              style={{
                background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 10,
                padding: '14px 10px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s',
              }}
            >
              <div style={{ fontSize: 26, fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700, color: 'var(--ink)', marginBottom: 6, lineHeight: 1 }}>
                {v.kr}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{v.es}</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4, opacity: 0.6 }}>🔊 toca</div>
            </button>
          ))}
        </div>

        {/* Step001 review reminder */}
        <div style={{ background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 20 }}>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--wl-on-panel-link, #6c63ff)', fontWeight: 700, marginBottom: 4 }}>📘 También repasaste del Día 1:</p>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>
            학교 · 집 · 가요 · 저는 · 어디
          </p>
        </div>

        <button type="button" onClick={() => setPhase('sentence')} style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
          Ver la frase clave del día →
        </button>
      </section>
    );
  }

  if (phase === 'sentence') {
    return (
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700 }}>
          FRASE CLAVE · Día 2
        </p>
        <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 20px' }}>
          La frase que David dice al final del video
        </h3>

        {/* Sentence */}
        <div style={{ background: 'var(--bg-2)', borderRadius: 14, padding: '24px 20px', marginBottom: 16, textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => korean(KEY_SENTENCE.kr, 0.85)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'block', width: '100%' }}
          >
            <div style={{ fontSize: 32, fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 800, color: 'var(--wl-on-panel-link, #6c63ff)', marginBottom: 8, lineHeight: 1.3 }}>
              {KEY_SENTENCE.kr}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>🔊 toca para escuchar</div>
          </button>

          {sentenceRevealed && (
            <div style={{ marginTop: 16, borderTop: '1px solid var(--line-soft)', paddingTop: 16 }}>
              <div style={{ fontSize: 16, fontStyle: 'italic', color: 'var(--ink)', marginBottom: 14 }}>
                "{KEY_SENTENCE.es}"
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                {KEY_SENTENCE.breakdown.map((b, i) => (
                  <div key={i} style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 8, padding: '8px 12px', textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700, color: 'var(--wl-on-panel-link, #6c63ff)', marginBottom: 2 }}>{b.kr}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{b.es}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {!sentenceRevealed ? (
          <button type="button" onClick={() => setSentenceRevealed(true)} style={{ width: '100%', background: 'var(--bg-2)', color: 'var(--ink)', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 10 }}>
            Revelar traducción y análisis →
          </button>
        ) : (
          <button type="button" onClick={() => setPhase('ready')} style={{ width: '100%', background: '#059669', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 10 }}>
            Estoy listo — Ver mi progreso →
          </button>
        )}
      </section>
    );
  }

  // phase === 'ready'
  return (
    <section style={{ maxWidth: 560, margin: '0 auto', padding: '2.5rem 1rem', textAlign: 'center' }}>
      {/* Hero */}
      <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
      <h2 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 10px', letterSpacing: '-0.02em' }}>
        Día 2 completado
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 28, maxWidth: 420, margin: '0 auto 28px' }}>
        Hoy aprendiste el sistema completo del Hangul — cómo funciona, por qué es así, y cómo leer los primeros bloques silábicos. Eso es lo que muchos estudiantes tardan semanas en entender.
      </p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 28 }}>
        {[
          { num: '40', label: 'Caracteres\nexplorados', color: 'var(--wl-on-panel-link, #6c63ff)' },
          { num: '9', label: 'Palabras\nnuevas', color: 'var(--wl-on-panel-ok, #059669)' },
          { num: '6', label: 'Familias\narticulatorias', color: '#e6930a' },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--bg-2)', borderRadius: 12, padding: '16px 10px' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6, lineHeight: 1.3, whiteSpace: 'pre-line' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* What you can do now */}
      <div style={{ background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.2)', borderRadius: 12, padding: '16px 20px', marginBottom: 24, textAlign: 'left' }}>
        <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, color: 'var(--wl-on-panel-ok, #059669)' }}>✅ Ahora puedes:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[
            '🧱 Reconocer la estructura de un bloque silábico coreano',
            '🔤 Identificar las 6 vocales core y sus sonidos',
            '👨‍👩‍👧 Entender el sistema tripartito de consonantes (simple / aspirada / tensa)',
            '🇪🇸 Usar tus anclas en español — ㄴ, ㅁ, ㄹ, ㅅ, ㅎ ya los tienes',
            '📖 Leer palabras simples como 나, 가, 아, 오, 이제, 어제',
            '✍️ Entender cómo se escribiría cualquier sílaba nueva',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--muted)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next day teaser */}
      <div style={{ background: 'var(--bg-2)', borderRadius: 12, padding: '14px 18px', marginBottom: 24, textAlign: 'left' }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>DÍA 3 — Lo que viene</p>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>
          Empezamos a <strong>usar el Hangul en frases reales</strong> — leerás tus primeras oraciones completas en coreano sin depender de romanización.
        </p>
      </div>

      <button
        type="button"
        onClick={() => { playComplete(); onComplete?.(); }}
        style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 12, padding: '16px', fontSize: 16, fontWeight: 800, cursor: 'pointer', letterSpacing: '-0.01em' }}
      >
        한글 완성 · Hangul completado →
      </button>
    </section>
  );
}
