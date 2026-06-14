import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Japonés A1 — Elige una habilidad | Idiomas WeLearn',
  description: 'Japonés A1: Hiragana, Katakana, ～は～です, あります/います, números y vocabulario esencial. Todo con romaji.',
  alternates: { canonical: 'https://idiomaswl.com/practica/japones/a1' },
};

const COLOR = '#bc002d';

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: '読む (Yomu)', eng: 'Lectura', desc: '5 textos A1 en japonés con romaji y vocabulario interactivo. はじめまして！Familia, casa, comida.', count: '5 textos · 25 preguntas', href: '/practica/japones/a1/lectura' },
  { id: 'gramatica', emoji: '📐', name: '文法 (Bunpō)', eng: 'Gramática', desc: 'Hiragana (46 chars), Katakana, ～は～です, あります/います, números + 時 + 円.', count: '5 temas · 40+ ejercicios', href: '/practica/japones/a1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: '書く (Kaku)', eng: 'Escritura', desc: '5 tareas guiadas: presentarse, describir objetos, la familia, el horario y los gustos.', count: '5 prompts guiados', href: '/practica/japones/a1/escritura' },
  { id: 'habla', emoji: '🗣️', name: '話す (Hanasu)', eng: 'Expresión oral', desc: '12 frases de supervivencia en japonés: script + romaji + guía de pronunciación para hispanohablantes.', count: '12 frases esenciales', href: '/practica/japones/a1/habla' },
  { id: 'vocabulario', emoji: '📚', name: '語彙 (Goi)', eng: 'Vocabulario', desc: '6 sets temáticos: 家族, 色, 食べ物, 曜日, 体, 数字. Script japonés + romaji + español.', count: '6 sets · 60+ palabras', href: '/practica/japones/a1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: '聞く (Kiku)', eng: 'Escucha', desc: '3 ejercicios de comprensión auditiva A1. Audios de voz nativa japonesa en preparación.', count: '3 audios próximamente', href: '/practica/japones/a1/escucha' },
];

const COLORS: Record<string, string> = { lectura: '#bc002d', gramatica: '#7c3aed', escritura: '#059669', habla: '#d97706', vocabulario: '#e11d48', escucha: '#0369a1' };

export default function JaponesA1Page() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/japones" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>A1</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>A1</div>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />Japonés A1 — 初心者</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Elige una habilidad</h1>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0.5rem 0 2.5rem' }}>
          Seis habilidades para un japonés sólido desde cero. Cada texto japonés incluye romaji (pronunciación en letras latinas).
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {HABILIDADES.map(h => {
            const c = COLORS[h.id] ?? COLOR;
            return (
              <Link key={h.id} href={h.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div style={{ padding: '1.4rem 1.5rem', border: `1.5px solid ${c}33`, borderRadius: 18, background: `linear-gradient(135deg, ${c}0a 0%, transparent 100%)`, borderTop: `3px solid ${c}`, height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '1.8rem' }}>{h.emoji}</span>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink)' }}>{h.name}</div>
                      <div style={{ fontSize: '0.72rem', color: c, fontFamily: 'var(--mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h.eng}</div>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.55, flex: 1 }}>{h.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: c, fontFamily: 'var(--mono)', fontWeight: 700 }}>{h.count}</span>
                    <span style={{ fontSize: '1rem', color: c, fontWeight: 700 }}>→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div style={{ marginTop: '2rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(188,0,45,0.06)', border: '1px solid rgba(188,0,45,0.15)', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>ヒント (hinto — consejo):</strong> Empieza por <strong style={{ color: '#7c3aed' }}>文法 · Gramática</strong> para aprender ひらがな primero. Luego usa <strong style={{ color: COLOR }}>読む · Lectura</strong> para textos reales. El vocabulario sin ひらがな es aprendizaje a medias.
        </div>
      </div>
    </section>
  );
}
