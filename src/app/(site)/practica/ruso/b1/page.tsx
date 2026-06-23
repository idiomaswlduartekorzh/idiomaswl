import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';

export const metadata: Metadata = {
  title: 'Ruso B1 — Elige una habilidad | Idiomas WeLearn',
  description: 'Ruso B1: aspectos verbales (совершенный/несовершенный), caso instrumental, genitivo plural, condicionales con бы y participios. 6 habilidades interactivas.',
  alternates: { canonical: 'https://idiomaswl.com/practica/ruso/b1' },
};

const COLOR = '#cc0000';

const HABILIDADES = [
  {
    id: 'lectura', emoji: '📖', name: 'Чтение (Chteniye)', eng: 'Lectura',
    desc: '5 textos B1 (120-150 palabras): actualidad, cultura, ciencia. Aspectos verbales y casos en contexto.',
    count: '5 textos · 30 preguntas', href: '/practica/ruso/b1/lectura', available: true,
  },
  {
    id: 'gramatica', emoji: '📐', name: 'Грамматика (Grammatika)', eng: 'Gramática',
    desc: 'Виды глагола (aspectos), Творительный падеж, Родительный мн.ч., Условные предложения y Причастия.',
    count: '5 temas · 50+ ejercicios', href: '/practica/ruso/b1/gramatica', available: true,
  },
  {
    id: 'escritura', emoji: '✍️', name: 'Письмо (Pismo)', eng: 'Escritura',
    desc: '5 tareas B1 con cirílico + transliteración: cartas, opiniones, comparaciones.',
    count: '5 prompts guiados', href: '/practica/ruso/b1/escritura', available: true,
  },
  {
    id: 'habla', emoji: '🗣️', name: 'Разговор (Razgovor)', eng: 'Expresión oral',
    desc: '20 frases B1 con cirílico, transliteración y fonética para debates y situaciones formales.',
    count: '20 frases esenciales', href: '/practica/ruso/b1/habla', available: true,
  },
  {
    id: 'vocabulario', emoji: '📚', name: 'Словарь (Slovar)', eng: 'Vocabulario',
    desc: '8 sets temáticos × 10 palabras con transliteración. Flashcard, MCQ y escritura.',
    count: '8 sets · 80+ palabras', href: '/practica/ruso/b1/vocabulario', available: true,
  },
  {
    id: 'escucha', emoji: '🎧', name: 'Аудирование (Audirovaniye)', eng: 'Escucha',
    desc: '3 diálogos B1 con scripts en cirílico + transliteración. Audios en preparación.',
    count: '3 diálogos próximamente', href: '/practica/ruso/b1/escucha', available: true,
  },
];

const COLORS: Record<string, string> = {
  lectura: '#cc0000', gramatica: '#7c3aed', escritura: '#059669',
  habla: '#d97706', vocabulario: '#e11d48', escucha: '#0369a1',
};

export default function RusoB1Page() {
  return (
    <>
    <CourseSchema
      name="Ruso B1 — Lectura, Gramática, Vocabulario y más"
      description="Practica Ruso nivel B1: lectura, gramática, vocabulario, escritura, habla y escucha. Aspectos verbales, caso instrumental y oraciones condicionales con feedback inmediato."
      url="https://idiomaswl.com/practica/ruso/b1"
      educationalLevel="B1"
      teaches="Ruso, habilidades MCER"
      inLanguage="ru"
    />
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ruso" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>B1</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>B1</div>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />Русский B1 — Промежуточный (Promezhutochny)</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Elige una habilidad</h1>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0.5rem 0 2.5rem' }}>
          Seis habilidades para el ruso intermedio. Practica los aspectos verbales, el caso instrumental y las oraciones condicionales.
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

        <div style={{ marginTop: '2rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(204,0,0,0.06)', border: '1px solid rgba(204,0,0,0.15)', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Совет (Sovet — consejo):</strong> Empieza con <strong style={{ color: '#7c3aed' }}>Грамматика · Gramática</strong> para dominar los aspectos verbales (<strong>совершенный/несовершенный</strong>), luego practica en <strong style={{ color: COLOR }}>Чтение · Lectura</strong>.
        </div>
      </div>
    </section>
    <PracticaWABanner
      idioma="ruso"
      color="#cc0000"
      msg="Hola, estoy practicando ruso B1 en WeLearn y me gustaría agendar una clase."
    />
    </>
  );
}
