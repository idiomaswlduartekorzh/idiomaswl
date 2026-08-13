import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

const ESCUCHA = listeningCard(
  'coreano',
  'b1',
  '20 episodios narrativos B1: «별 카페의 마지막 여름», temporada 3. Guion dialogado en hangul con romanización, vocabulario, preguntas y transcripción bilingüe.',
);

export const metadata: Metadata = {
  title: 'Coreano B1 — Elige una habilidad',
  description: 'Coreano B1: -(으)면 (condicional), -아/어야 하다 (obligación), -(으)ㄹ 수 있다 (capacidad), -기 때문에 (razón), -는데 (contexto/contraste). 6 habilidades interactivas.',
  alternates: { canonical: 'https://idiomaswl.com/practica/coreano/b1' },
};

const COLOR = '#534AB7';

const HABILIDADES = [
  {
    id: 'lectura', emoji: '📖', name: '읽기 (Ilgi)', eng: 'Lectura',
    desc: '5 textos B1 (120-150 palabras): noticias, cultura, sociedad. Condicionales y expresiones complejas en contexto.',
    count: '5 textos · 30 preguntas', href: '/practica/coreano/b1/lectura', available: true,
  },
  {
    id: 'gramatica', emoji: '📐', name: '문법 (Munbeop)', eng: 'Gramática',
    desc: '-(으)면, -아/어야 하다, -(으)ㄹ 수 있다, -기 때문에, -는데. 10 ejercicios por tema.',
    count: '5 temas · 50+ ejercicios', href: '/practica/coreano/b1/gramatica', available: true,
  },
  {
    id: 'escritura', emoji: '✍️', name: '쓰기 (Sseugi)', eng: 'Escritura',
    desc: '5 tareas B1 con Hangul + romanización: cartas, opiniones, comparaciones.',
    count: '5 prompts guiados', href: '/practica/coreano/b1/escritura', available: true,
  },
  {
    id: 'habla', emoji: '🗣️', name: '말하기 (Malhagi)', eng: 'Expresión oral',
    desc: '20 frases B1 con Hangul, romaja y fonética para debates y situaciones formales.',
    count: '20 frases esenciales', href: '/practica/coreano/b1/habla', available: true,
  },
  {
    id: 'vocabulario', emoji: '📚', name: '어휘 (Eohwi)', eng: 'Vocabulario',
    desc: '8 sets temáticos × 10 palabras con romaja. Flashcard, MCQ y escritura.',
    count: '8 sets · 80+ palabras', href: '/practica/coreano/b1/vocabulario', available: true,
  },
  {
    id: 'escucha', emoji: '🎧', name: '듣기 (Deutgi)', eng: 'Escucha',
    desc: ESCUCHA.desc,
    count: ESCUCHA.count, href: '/practica/coreano/b1/escucha', available: true,
  },
];

const COLORS: Record<string, string> = {
  lectura: '#534AB7', gramatica: '#7c3aed', escritura: '#059669',
  habla: '#d97706', vocabulario: '#e11d48', escucha: '#0369a1',
};

export default function CoreanoB1Page() {
  return (
    <>
    <CourseSchema
      name="Coreano B1 — Lectura, Gramática, Vocabulario y más"
      description="Practica Coreano nivel B1 (Intermedio): lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
      url="https://idiomaswl.com/practica/coreano/b1"
      educationalLevel="B1"
      teaches="Coreano, habilidades MCER"
      inLanguage="ko"
    />
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/coreano" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>B1</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>B1</div>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />한국어 B1 — Intermedio (Junggup)</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Elige una habilidad</h1>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0.5rem 0 2.5rem' }}>
          Seis habilidades para el coreano intermedio. Practica condicionales, obligación, capacidad y expresiones de razón.
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

        <div style={{ marginTop: '2rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(83,74,183,0.06)', border: '1px solid rgba(83,74,183,0.15)', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>팁 (tip):</strong> Empieza con <strong style={{ color: '#7c3aed' }}>문법 · Gramática</strong> para dominar <strong>-(으)면</strong> (condicional), luego practica en <strong style={{ color: COLOR }}>읽기 · Lectura</strong> y <strong style={{ color: '#d97706' }}>말하기 · Habla</strong>.
        </div>
      </div>
    </section>
    <PracticaWABanner
      idioma="coreano"
      color="#534AB7"
      msg="Hola, estoy practicando coreano B1 en WeLearn y me gustaría agendar una clase."
    />
    </>
  );
}
