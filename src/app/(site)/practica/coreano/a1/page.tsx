import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';

export const metadata: Metadata = {
  title: 'Coreano A1 — Elige una habilidad | Idiomas WeLearn',
  description: 'Coreano A1: Hangul, 이에요/예요, partículas (은/는 이/가 을/를), números y verbos -아/어요. Todo con romanización.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/coreano/a1' },
};

const COLOR = '#534AB7';

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: '읽기 (Ilgi)', eng: 'Lectura', desc: '5 textos A1 en Hangul con romanización y vocabulario interactivo. 안녕하세요! Familia, casa, comida.', count: '5 textos · 25 preguntas', href: '/practica/coreano/a1/lectura' },
  { id: 'gramatica', emoji: '📐', name: '문법 (Munbeop)', eng: 'Gramática', desc: 'Hangul, 이에요/예요, partículas (은/는 이/가 을/를 에/에서), presente, números, negación, pasado, -고 싶어요 y más. Con romanización.', count: '15 temas · 190+ ejercicios', href: '/practica/coreano/a1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: '쓰기 (Sseugi)', eng: 'Escritura', desc: '5 tareas guiadas: presentarse en coreano, familia, gustos. Acepta Hangul o romanización.', count: '5 prompts guiados', href: '/practica/coreano/a1/escritura' },
  { id: 'habla', emoji: '🗣️', name: '말하기 (Malhagi)', eng: 'Expresión oral', desc: '12 frases esenciales en coreano: Hangul + romanización + guía de pronunciación para hispanohablantes.', count: '12 frases esenciales', href: '/practica/coreano/a1/habla' },
  { id: 'vocabulario', emoji: '📚', name: '어휘 (Eohwi)', eng: 'Vocabulario', desc: '6 sets temáticos: 가족, 색깔, 음식, 요일, 신체, 숫자. Hangul + romanización + español.', count: '6 sets · 60+ palabras', href: '/practica/coreano/a1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: '듣기 (Deutgi)', eng: 'Escucha', desc: '3 ejercicios de comprensión auditiva A1. Audios de voz nativa coreana en preparación.', count: '3 audios próximamente', href: '/practica/coreano/a1/escucha' },
];

const COLORS: Record<string, string> = { lectura: '#534AB7', gramatica: '#7c3aed', escritura: '#059669', habla: '#d97706', vocabulario: '#e11d48', escucha: '#0369a1' };

export default function CoreanoA1Page() {
  return (
    <>
    <CourseSchema
      name="Coreano A1 — Lectura, Gramática, Vocabulario y más"
      description="Practica Coreano nivel A1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
      url="https://www.idiomaswl.com/practica/coreano/a1"
      educationalLevel="A1"
      teaches="Coreano, habilidades MCER"
      inLanguage="co"
    />
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/coreano" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>A1</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>A1</div>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />Coreano A1 — 초급</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Elige una habilidad</h1>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0.5rem 0 2.5rem' }}>
          Seis habilidades para un coreano sólido desde cero. Cada palabra en Hangul incluye su romanización (pronunciación en letras latinas).
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
        <div style={{ marginTop: '2rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(83,74,183,0.06)', border: '1px solid rgba(83,74,183,0.15)', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>팁 (tip):</strong> Empieza por <strong style={{ color: '#7c3aed' }}>문법 · Gramática</strong> para aprender el Hangul primero. Luego usa <strong style={{ color: COLOR }}>읽기 · Lectura</strong> para leer textos reales. Las flashcards de <strong style={{ color: '#e11d48' }}>어휘 · Vocabulario</strong> consolidan el aprendizaje.
        </div>
      </div>
    </section>
    <PracticaWABanner
      idioma="coreano"
      color="#534AB7"
      msg="Hola, estoy practicando coreano en WeLearn y me gustaría agendar mi clase de diagnóstico gratis."
    />
    </>
  );
}
