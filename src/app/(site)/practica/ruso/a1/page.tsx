import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';

export const metadata: Metadata = {
  title: 'Ruso A1 — Elige una habilidad | Idiomas WeLearn',
  description: 'Ruso A1: alfabeto cirílico, gramática (casos, conjugaciones), escritura, frases esenciales y vocabulario con transliteración.',
  alternates: { canonical: 'https://idiomaswl.com/practica/ruso/a1' },
};

const COLOR = '#cc0000';

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Чтение', eng: 'Lectura', desc: '5 textos A1 en cirílico con transliteración y vocabulario interactivo. Priviet! Знакомство, семья, дом, еда.', count: '5 textos · 25 preguntas', href: '/practica/ruso/a1/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Грамматика', eng: 'Gramática', desc: 'Alfabeto, pronombres, caso nominativo, conjugación presente (1ª y 2ª conjugación), números y adjetivos.', count: '5 temas · 40+ ejercicios', href: '/practica/ruso/a1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Письмо', eng: 'Escritura', desc: '5 tareas guiadas: presentarse, describir la familia, tu ciudad, actividades y gustos. En cirílico o transliteración.', count: '5 prompts guiados', href: '/practica/ruso/a1/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Разговор', eng: 'Expresión oral', desc: '12 frases esenciales de supervivencia en ruso: cirílico + transliteración + pronunciación para hispanohablantes.', count: '12 frases esenciales', href: '/practica/ruso/a1/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Словарь', eng: 'Vocabulario', desc: '6 sets temáticos con cirílico + transliteración + español: семья, цвета, еда, дни, тело, числа.', count: '6 sets · 60+ palabras', href: '/practica/ruso/a1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Аудирование', eng: 'Escucha', desc: '3 ejercicios de comprensión auditiva A1. Audios de voz nativa rusa en preparación.', count: '3 audios próximamente', href: '/practica/ruso/a1/escucha' },
];

const COLORS: Record<string, string> = { lectura: '#cc0000', gramatica: '#7c3aed', escritura: '#059669', habla: '#d97706', vocabulario: '#e11d48', escucha: '#0369a1' };

export default function RusoA1Page() {
  return (
    <>
    <CourseSchema
      name="Ruso A1 — Lectura, Gramática, Vocabulario y más"
      description="Practica Ruso nivel A1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
      url="https://idiomaswl.com/practica/ruso/a1"
      educationalLevel="A1"
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
          <span style={{ color: COLOR, fontWeight: 800 }}>A1</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>A1</div>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />Ruso A1 — Начинающий</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Elige una habilidad</h1>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0.5rem 0 2.5rem' }}>
          Seis habilidades para un ruso sólido desde cero. Cada palabra en cirílico incluye su transliteración latina.
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
        <div style={{ marginTop: '2rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(204,0,0,0.06)', border: '1px solid rgba(204,0,0,0.15)', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Совет (Soviet — consejo):</strong> Empieza por <strong style={{ color: COLOR }}>Грамматика · Gramática</strong> para aprender el alfabeto cirílico primero. Luego usa <strong style={{ color: '#cc0000' }}>Чтение · Lectura</strong> para practicar textos reales.
        </div>
      </div>
    </section>
    <PracticaWABanner
      idioma="ruso"
      color="#cc0000"
      msg="Hola, estoy practicando ruso en WeLearn y me gustaría agendar una clase de diagnóstico gratis."
    />
    </>
  );
}
