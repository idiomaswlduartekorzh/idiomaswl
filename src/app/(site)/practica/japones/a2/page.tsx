import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

const ESCUCHA = listeningCard(
  'japones',
  'a2',
  "20 episodios narrativos A2: «二十年目のスタンプ», temporada 2. Guion dialogado con romaji, vocabulario, preguntas y transcripción bilingüe.",
);

export const metadata: Metadata = {
  title: 'Japonés A2 — Elige una habilidad',
  description: 'Japonés A2: て-form, た-form, ～ています, ～たいです, ～ことができます, ～なければなりません. Lectura, gramática, vocabulario, escritura, habla y escucha.',
  alternates: { canonical: 'https://idiomaswl.com/practica/japones/a2' },
};

const COLOR = '#bc002d';

const HABILIDADES = [
  {
    id: 'lectura', emoji: '📖', name: '読む (Yomu)', eng: 'Lectura',
    desc: '5 textos A2 en japonés (80-120 palabras) con romaji. Vocabulario interactivo clickeable, 6 preguntas por texto.',
    count: '5 textos · 30 preguntas', href: '/practica/japones/a2/lectura', available: true,
  },
  {
    id: 'gramatica', emoji: '📐', name: '文法 (Bunpō)', eng: 'Gramática',
    desc: 'て-form, た-form (pasado), ～ています, ～たいです (querer), ～ことができます (poder) y ～なければなりません (deber).',
    count: '5 temas · 50+ ejercicios', href: '/practica/japones/a2/gramatica', available: true,
  },
  {
    id: 'escritura', emoji: '✍️', name: '書く (Kaku)', eng: 'Escritura',
    desc: '5 tareas A2 guiadas: emails, relatos, comparaciones. Acepta romaji o hiragana/katakana.',
    count: '5 prompts guiados', href: '/practica/japones/a2/escritura', available: true,
  },
  {
    id: 'habla', emoji: '🗣️', name: '話す (Hanasu)', eng: 'Expresión oral',
    desc: '20 frases A2 con contexto situacional, romaji y guía de pronunciación para hispanohablantes.',
    count: '20 frases esenciales', href: '/practica/japones/a2/habla', available: true,
  },
  {
    id: 'vocabulario', emoji: '📚', name: '語彙 (Goi)', eng: 'Vocabulario',
    desc: '8 sets temáticos × 10 palabras. Script japonés + romaji + español. 3 modos de práctica.',
    count: '8 sets · 80+ palabras', href: '/practica/japones/a2/vocabulario', available: true,
  },
  {
    id: 'escucha', emoji: '🎧', name: '聞く (Kiku)', eng: 'Escucha',
    desc: ESCUCHA.desc,
    count: ESCUCHA.count, href: '/practica/japones/a2/escucha', available: true,
  },
];

const COLORS: Record<string, string> = {
  lectura: '#bc002d', gramatica: '#7c3aed', escritura: '#059669',
  habla: '#d97706', vocabulario: '#e11d48', escucha: '#0369a1',
};

export default function JaponesA2Page() {
  return (
    <>
    <CourseSchema
      name="Japonés A2 — Lectura, Gramática, Vocabulario y más"
      description="Practica Japonés nivel A2: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
      url="https://idiomaswl.com/practica/japones/a2"
      educationalLevel="A2"
      teaches="Japonés, habilidades MCER"
      inLanguage="ja"
    />
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/japones" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>A2</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>A2</div>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />Japonés A2 — 初級</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Elige una habilidad</h1>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0.5rem 0 2.5rem' }}>
          Seis habilidades para consolidar el japonés elemental. Practica て-form, た-form, ～ています y más.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {HABILIDADES.map(h => {
            const c = COLORS[h.id] ?? COLOR;
            const card = (
              <div style={{
                padding: '1.4rem 1.5rem',
                border: `1.5px solid ${h.available ? `${c}33` : 'var(--line-soft)'}`,
                borderRadius: 18,
                background: h.available ? `linear-gradient(135deg, ${c}0a 0%, transparent 100%)` : 'var(--bg)',
                borderTop: h.available ? `3px solid ${c}` : undefined,
                height: '100%', boxSizing: 'border-box',
                display: 'flex', flexDirection: 'column', gap: '0.6rem',
                transition: 'box-shadow 0.18s, border-color 0.18s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>{h.emoji}</span>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink)' }}>{h.name}</div>
                    <div style={{ fontSize: '0.72rem', color: c, fontFamily: 'var(--mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h.eng}</div>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.55, flex: 1 }}>{h.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontSize: '0.7rem', color: c, fontFamily: 'var(--mono)', fontWeight: 700 }}>{h.count}</span>
                  <span style={{ fontSize: '1rem', color: c, fontWeight: 700 }}>→</span>
                </div>
              </div>
            );
            return (
              <Link key={h.id} href={h.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                {card}
              </Link>
            );
          })}
        </div>

        <div style={{ marginTop: '2rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(188,0,45,0.06)', border: '1px solid rgba(188,0,45,0.15)', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>ヒント (consejo):</strong> Empieza por <strong style={{ color: '#7c3aed' }}>文法 · Gramática</strong> para aprender la て-form — la llave de la gramática A2. Luego combínala con <strong style={{ color: COLOR }}>読む · Lectura</strong> para textos reales.
        </div>
      </div>
    </section>
    <PracticaWABanner
      idioma="japonés"
      color="#bc002d"
      msg="Hola, estoy practicando japonés A2 en WeLearn y me gustaría agendar una clase de diagnóstico gratis."
    />
    </>
  );
}
