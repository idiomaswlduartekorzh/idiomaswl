import type { Metadata } from 'next';
import Link from 'next/link';
import KoreanToolsClient from './KoreanToolsClient';
import { CourseSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'Práctica de Coreano — Elige tu nivel TOPIK | Idiomas WeLearn',
  description: 'Ejercicios interactivos de coreano por nivel. A1 disponible: Hangul, partículas, verbos básicos y vocabulario esencial.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/coreano' },
};

const COLOR = '#534AB7';

const NIVELES = [
  {
    nivel: 'A1', name: '초급 · Principiante',
    desc: 'Hangul, 이에요/예요, partículas (은/는 이/가 을/를), números y verbos -아/어요.',
    href: '/practica/coreano/a1', available: true,
    count: '6 habilidades · 40+ ejercicios',
  },
  {
    nivel: 'A2', name: '초급+',
    desc: '과거형 (-았/었어요), verbos irregulares, expresiones de tiempo y negación.',
    href: '/practica/coreano/a2', available: true,
    count: '6 habilidades · 50+ ejercicios',
  },
  { nivel: 'B1', name: '중급', desc: 'Conectores (-고, -지만, -아서), honoríficos y vocabulario TOPIK II.', available: false },
  { nivel: 'B2', name: '중급+', desc: 'Patrones causales y condicionales, registro formal/informal.', available: false },
  { nivel: 'C1', name: '고급', desc: 'Gramática avanzada, vocabulario académico y nivel TOPIK II 5–6.', available: false },
];

const HERRAMIENTAS = [
  { name: '🔊 Lector Hangul', desc: 'Ciclo de lectura A1–B1 con descomposición de sílabas Hangul y romanización.', href: '/practica/coreano#herramientas', tag: 'En esta página' },
  { name: '🎤 Expresión Oral 1', desc: 'Introducción en coreano: 자기소개 (jagi sogae) con frases guiadas.', href: '/practica/korean-speaking-1', tag: 'Actividad' },
  { name: '📚 Vocabulario', desc: 'Palabras esenciales en coreano organizadas por tema con tarjetas de memoria.', href: '/practica/vocabulario-coreano', tag: 'Actividad' },
];

export default function CoreanoPage() {
  return (
    <>
    <CourseSchema
      name="Práctica de Coreano — Hangul y gramática TOPIK"
      description="Ejercicios interactivos de coreano por nivel TOPIK. Hangul, partículas, verbos y vocabulario esencial."
      url="https://www.idiomaswl.com/practica/coreano"
      educationalLevel="A1,A2,B1"
      teaches="Coreano, Hangul, TOPIK"
      inLanguage="es"
    />
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 840 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <span style={{ color: 'var(--ink)' }}>🇰🇷 Coreano</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />🇰🇷 Coreano / 한국어</p>
        <h1 style={{ fontSize: '2.2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Elige tu nivel</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: 560, margin: '0 0 2.25rem' }}>
          El coreano usa el alfabeto Hangul (한글), diseñado científicamente en 1443. Aprenderás a leerlo en menos de una semana.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {NIVELES.map(n => {
            const inner = (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.2rem 1.5rem',
                border: `1.5px solid ${n.available ? 'rgba(83,74,183,0.28)' : 'var(--line-soft)'}`,
                borderRadius: 16,
                background: n.available ? 'linear-gradient(135deg, rgba(83,74,183,0.06) 0%, transparent 100%)' : 'var(--bg)',
                opacity: n.available ? 1 : 0.55,
              }}>
                <div style={{ width: 58, height: 58, borderRadius: 14, flexShrink: 0, background: n.available ? COLOR : 'var(--line-soft)', color: n.available ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)' }}>{n.nivel}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>{n.nivel} — {n.name}</span>
                    {n.available
                      ? <span style={{ fontSize: '0.6rem', fontWeight: 800, background: COLOR, color: '#fff', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>DISPONIBLE</span>
                      : <span style={{ fontSize: '0.6rem', fontWeight: 700, background: 'var(--line-soft)', color: 'var(--muted)', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>PRÓXIMAMENTE</span>
                    }
                  </div>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.5 }}>{n.desc}</p>
                  {'count' in n && n.available && (
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.73rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{(n as { count: string }).count}</p>
                  )}
                </div>
                {n.available && <span style={{ fontSize: '1.2rem', color: COLOR, fontWeight: 700, flexShrink: 0 }}>→</span>}
              </div>
            );
            return n.available && n.href
              ? <Link key={n.nivel} href={n.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>{inner}</Link>
              : <div key={n.nivel}>{inner}</div>;
          })}
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="ink-line" />Herramientas adicionales</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem' }}>
          {HERRAMIENTAS.map(h => (
            <Link key={h.href} href={h.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ padding: '1.1rem 1.25rem', border: `1.5px solid rgba(83,74,183,0.2)`, borderRadius: 14, background: 'rgba(83,74,183,0.04)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.97rem', color: 'var(--ink)' }}>{h.name}</div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5 }}>{h.desc}</p>
                <span style={{ fontSize: '0.65rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{h.tag} →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
    <KoreanToolsClient />
    </>
  );
}
