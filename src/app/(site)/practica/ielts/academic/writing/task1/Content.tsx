'use client';

import Link from 'next/link';

const SKILLS = [
  {
    id: 'introduccion',
    n: 1,
    label: 'Introducción',
    icon: '🔁',
    desc: 'Parafrasear el enunciado sin copiar. Cambia vocabulario, clase gramatical y estructura.',
    href: '/practica/ielts/academic/writing/task1/introduccion',
    tag: 'Paraphrasing',
  },
  {
    id: 'overview',
    n: 2,
    label: 'Overview',
    icon: '🔭',
    desc: 'El párrafo más importante. 2 oraciones, sin números, tendencia principal. Donde más banda se pierde.',
    href: '/practica/ielts/academic/writing/task1/overview',
    tag: 'Tendencia global',
  },
  {
    id: 'tendencias',
    n: 3,
    label: 'Tendencias',
    icon: '📈',
    desc: 'Lee gráficas reales de IELTS e identifica cuáles son las 2–3 tendencias más relevantes para mencionar. Aprende a distinguir lo esencial de lo accesorio.',
    href: '/practica/ielts/academic/writing/task1/tendencias',
    tag: 'Line graphs · Bar charts',
  },
  {
    id: 'comparaciones',
    n: 4,
    label: 'Comparaciones',
    icon: '⚖️',
    desc: 'Comparar categorías con precisión: higher/lower, while, approximation language.',
    href: '/practica/ielts/academic/writing/task1/comparaciones',
    tag: 'Bar · Pie · Table',
  },
  {
    id: 'procesos',
    n: 5,
    label: 'Procesos',
    icon: '⚙️',
    desc: 'Voz pasiva y secuenciadores para describir diagramas de proceso paso a paso.',
    href: '/practica/ielts/academic/writing/task1/procesos',
    tag: 'Process diagrams',
  },
  {
    id: 'mapas',
    n: 6,
    label: 'Mapas',
    icon: '🗺️',
    desc: 'Lenguaje de ubicación (to the north of, adjacent to) y cambio (was replaced by, was demolished).',
    href: '/practica/ielts/academic/writing/task1/mapas',
    tag: 'Maps',
  },
  {
    id: 'vocabulario',
    n: 7,
    label: 'Vocabulario de datos',
    icon: '📚',
    desc: 'Elige el verbo (rise/fall/peak) y adverbio (sharply/gradually) correctos para describir un cambio numérico. La oración se ensambla en tiempo real.',
    href: '/practica/ielts/academic/writing/task1/vocabulario',
    tag: 'Verb · Adverb · Structure',
  },
  {
    id: 'tarea-completa',
    n: 8,
    label: 'Tarea Completa',
    icon: '⏱️',
    desc: 'Práctica real: 20 minutos, contador de palabras, auto-evaluación con rúbrica Band 1–9.',
    href: '/practica/ielts/academic/writing/task1/tarea-completa',
    tag: 'Full Task · 20 min',
  },
];

export default function Task1HubPage() {
  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Writing</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>IELTS / Academic / Writing / Task 1</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />📊 IELTS Academic Writing Task 1</p>
          <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>
            Writing Task 1
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', margin: '0 0 0.5rem', lineHeight: 1.6 }}>
            Describe datos visuales en 150+ palabras en 20 minutos. Domina las 8 sub-habilidades que separan
            Band 5 de Band 7+.
          </p>

          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {['Line graphs','Bar charts','Pie charts','Tables','Processes','Maps','Mixed'].map(t => (
              <span key={t} style={{ fontSize: '0.72rem', padding: '0.2rem 0.65rem', borderRadius: 20, background: 'rgba(15,61,140,0.07)', color: '#0f3d8c', border: '1px solid rgba(15,61,140,0.2)', fontFamily: 'var(--mono)', fontWeight: 600 }}>{t}</span>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {SKILLS.map(sk => (
              <Link key={sk.id} href={sk.href}
                style={{ textDecoration: 'none' }}
              >
                <div className="wl-card" style={{ padding: '1.25rem', height: '100%', borderTop: '3px solid #0f3d8c', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{sk.icon}</span>
                    <span style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', fontWeight: 800, color: '#0f3d8c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Sub-habilidad {sk.n}
                    </span>
                  </div>
                  <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)' }}>{sk.label}</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.6, flex: 1 }}>{sk.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 10, background: 'rgba(15,61,140,0.07)', color: '#0f3d8c', border: '1px solid rgba(15,61,140,0.15)', fontFamily: 'var(--mono)', fontWeight: 600 }}>{sk.tag}</span>
                    <span style={{ fontSize: '0.82rem', color: '#0f3d8c', fontWeight: 700 }}>Practicar →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
