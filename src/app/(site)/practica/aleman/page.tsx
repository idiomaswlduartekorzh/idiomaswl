import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'Práctica de Alemán — Elige tu nivel MCER | Idiomas WeLearn',
  description: 'Ejercicios interactivos de alemán por nivel: A1 disponible con lectura, gramática, escritura, habla, vocabulario y escucha.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/aleman' },
};

const COLOR = '#dd0000';

const NIVELES = [
  {
    nivel: 'A1', name: 'Anfänger',
    desc: 'Erste Wörter, Präsens, Alltagsvokabular und Überlebensphrasen.',
    href: '/practica/aleman/a1', available: true,
    count: '6 habilidades · 40+ ejercicios',
  },
  { nivel: 'A2', name: 'Grundkenntnisse', desc: 'Perfekt, Dativ, Modalverben im Präteritum, trennbare Verben und Komparativ.', href: '/practica/aleman/a2', available: true, count: '6 habilidades · 50+ ejercicios' },
  { nivel: 'B1', name: 'Mittelstufe', desc: 'Konjunktiv II, Futur, schriftliche Produktion, Hörverstehen.', href: '/practica/aleman/b1', available: true, count: '5 Themen · 50+ Übungen' },
  { nivel: 'B2', name: 'Gehobene Mittelstufe', desc: 'Passiv, Goethe B2-Vorbereitung, akademisches Vokabular.', available: false },
  { nivel: 'C1', name: 'Fortgeschritten', desc: 'Komplexe Grammatik, Kollokationen, Goethe C1-Vorbereitung.', available: false },
];

export default function AlemanPage() {
  return (
    <>
    <CourseSchema
      name="Práctica de Alemán — Ejercicios interactivos MCER"
      description="Ejercicios de alemán por nivel MCER: A1 y A2 disponibles. Vocabulario, gramática, escritura, habla y escucha."
      url="https://www.idiomaswl.com/practica/aleman"
      educationalLevel="A1,A2"
      teaches="Alemán, Goethe-Zertifikat"
      inLanguage="de"
    />
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 840 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <span style={{ color: 'var(--ink)' }}>🇩🇪 Alemán</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
          <span className="ink-line" />🇩🇪 Alemán
        </p>
        <h1 style={{ fontSize: '2.2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Elige tu nivel</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: 520, margin: '0 0 2.25rem' }}>
          Übungen nach GER-Niveau geordnet. Fang mit A1 an und lerne in deinem Tempo.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {NIVELES.map(n => {
            const inner = (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.2rem 1.5rem',
                border: `1.5px solid ${n.available ? 'rgba(221,0,0,0.25)' : 'var(--line-soft)'}`,
                borderRadius: 16,
                background: n.available ? 'linear-gradient(135deg, rgba(221,0,0,0.05) 0%, transparent 100%)' : 'var(--bg)',
                opacity: n.available ? 1 : 0.55,
              }}>
                <div style={{ width: 58, height: 58, borderRadius: 14, flexShrink: 0, background: n.available ? COLOR : 'var(--line-soft)', color: n.available ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--mono)' }}>{n.nivel}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>{n.nivel} — {n.name}</span>
                    {n.available ? <span style={{ fontSize: '0.6rem', fontWeight: 800, background: COLOR, color: '#fff', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>VERFÜGBAR</span>
                      : <span style={{ fontSize: '0.6rem', fontWeight: 700, background: 'var(--line-soft)', color: 'var(--muted)', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>DEMNÄCHST</span>}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.5 }}>{n.desc}</p>
                  {n.available && n.count && <p style={{ margin: '0.25rem 0 0', fontSize: '0.73rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{n.count}</p>}
                </div>
                {n.available && <span style={{ fontSize: '1.2rem', color: COLOR, fontWeight: 700, flexShrink: 0 }}>→</span>}
              </div>
            );
            return n.available && n.href
              ? <Link key={n.nivel} href={n.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>{inner}</Link>
              : <div key={n.nivel}>{inner}</div>;
          })}
        </div>
      </div>
    </section>
    </>
  );
}
