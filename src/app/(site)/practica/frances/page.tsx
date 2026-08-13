import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'Práctica de Francés — Elige tu nivel MCER',
  description: 'Ejercicios interactivos de francés por nivel: A1 disponible con lectura, gramática, escritura, habla, vocabulario y escucha.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/frances' },
};

const COLOR = '#003189';

const NIVELES = [
  {
    nivel: 'A1', name: 'Débutant',
    desc: "Premiers mots, présent de l'indicatif, vocabulaire quotidien et phrases de survie.",
    href: '/practica/frances/a1', available: true,
    count: '6 habilidades · 40+ ejercicios',
  },
  { nivel: 'A2', name: 'Élémentaire', desc: 'Passé composé, imparfait, pronoms COD/COI, comparatif/superlatif et futur.', href: '/practica/frances/a2', available: true, count: '6 habilidades · 50+ ejercicios' },
  { nivel: 'B1', name: 'Intermédiaire', desc: 'Subjonctif, futur simple, production écrite, compréhension orale.', href: '/practica/frances/b1', available: true, count: '20 temas de gramática' },
  { nivel: 'B2', name: 'Intermédiaire avancé', desc: 'Conditionnel, préparation DELF B2, vocabulaire soutenu.', available: false },
  { nivel: 'C1', name: 'Avancé', desc: 'Style formel, préparation DALF C1, nuances grammaticales.', available: false },
];

export default function FrancesPage() {
  return (
    <>
    <CourseSchema
      name="Práctica de Francés — Ejercicios interactivos MCER"
      description="Ejercicios de francés por nivel MCER: A1 y A2 disponibles. Vocabulario, gramática, escritura, habla y escucha."
      url="https://www.idiomaswl.com/practica/frances"
      educationalLevel="A1,A2"
      teaches="Francés, DELF, DALF"
      inLanguage="fr"
    />
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 840 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <span style={{ color: 'var(--ink)' }}>🇫🇷 Francés</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
          <span className="ink-line" />🇫🇷 Francés
        </p>
        <h1 style={{ fontSize: '2.2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Elige tu nivel</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: 520, margin: '0 0 2.25rem' }}>
          Exercices organisés par niveau CECR. Commence par A1 et progresse à ton rythme.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {NIVELES.map(n => {
            const inner = (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.2rem 1.5rem',
                border: `1.5px solid ${n.available ? 'rgba(0,49,137,0.28)' : 'var(--line-soft)'}`,
                borderRadius: 16,
                background: n.available ? 'linear-gradient(135deg, rgba(0,49,137,0.06) 0%, transparent 100%)' : 'var(--bg)',
                opacity: n.available ? 1 : 0.55,
              }}>
                <div style={{ width: 58, height: 58, borderRadius: 14, flexShrink: 0, background: n.available ? COLOR : 'var(--line-soft)', color: n.available ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--mono)' }}>{n.nivel}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>{n.nivel} — {n.name}</span>
                    {n.available ? <span style={{ fontSize: '0.6rem', fontWeight: 800, background: COLOR, color: '#fff', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>DISPONIBLE</span>
                      : <span style={{ fontSize: '0.6rem', fontWeight: 700, background: 'var(--line-soft)', color: 'var(--muted)', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>BIENTÔT</span>}
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
