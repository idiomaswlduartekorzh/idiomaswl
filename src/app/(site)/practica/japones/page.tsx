import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'Práctica de Japonés — Elige tu nivel JLPT | Idiomas WeLearn',
  description: 'Ejercicios interactivos de japonés por nivel: A1/N5, A2/N4 y B1/N3 disponibles. Hiragana, Katakana, gramática N3 y vocabulario esencial.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/japones' },
};

const COLOR = '#bc002d';

const NIVELES = [
  {
    nivel: 'A1', name: 'N5 · Principiante',
    desc: 'Hiragana, Katakana, ～は～です, あります/います, números y vocabulario cotidiano.',
    href: '/practica/japones/a1', available: true,
    count: '6 habilidades · 40+ ejercicios',
  },
  {
    nivel: 'A2', name: 'N4',
    desc: 'て形、～ている、adjetivos い/な, verbos de movimiento, partículas avanzadas.',
    href: '/practica/japones/a2', available: true,
    count: '6 habilidades · 50+ ejercicios',
  },
  {
    nivel: 'B1', name: 'N3',
    desc: 'てしまう, 〜ばかり, 〜べき, 〜ために, 〜のに, 〜かもしれない y otras 15 estructuras clave N3.',
    href: '/practica/japones/b1', available: true,
    count: '20 temas · 120+ ejercicios',
  },
  { nivel: 'B2', name: 'N2', desc: 'Gramática compleja, kanji N2 (~1000 chars), escritura formal.', available: false },
  { nivel: 'C1', name: 'N1', desc: 'Registro keigo, kanji N1 (~2000 chars), nivel JLPT N1.', available: false },
];

export default function JaponesPage() {
  return (
    <>
    <CourseSchema
      name="Práctica de Japonés — Ejercicios interactivos JLPT"
      description="Ejercicios de japonés por nivel JLPT: A1/N5, A2/N4 y B1/N3 disponibles. Hiragana, Katakana, vocabulario y gramática."
      url="https://www.idiomaswl.com/practica/japones"
      educationalLevel="A1,A2,B1,N5,N4,N3"
      teaches="Japonés, JLPT, Hiragana, Katakana"
      inLanguage="ja"
    />
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 840 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <span style={{ color: 'var(--ink)' }}>🇯🇵 Japonés</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />🇯🇵 Japonés / 日本語</p>
        <h1 style={{ fontSize: '2.2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Elige tu nivel</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: 560, margin: '0 0 2.25rem' }}>
          El japonés usa 3 sistemas de escritura: ひらがな (hiragana), カタカナ (katakana) y 漢字 (kanji). Aquí empezamos con los dos primeros.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {NIVELES.map(n => {
            const inner = (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.2rem 1.5rem',
                border: `1.5px solid ${n.available ? 'rgba(188,0,45,0.28)' : 'var(--line-soft)'}`,
                borderRadius: 16,
                background: n.available ? 'linear-gradient(135deg, rgba(188,0,45,0.06) 0%, transparent 100%)' : 'var(--bg)',
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
      </div>
    </section>
    </>
  );
}
