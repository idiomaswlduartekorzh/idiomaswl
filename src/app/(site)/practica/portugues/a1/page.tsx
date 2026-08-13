import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { audioReady } from '@/data/practica/series/audio-ready';

export const metadata: Metadata = {
  title: 'Portugués A1 — Elige una habilidad',
  description: 'Portugués A1: leitura, gramática (artigos, ser/estar, verbos -AR), escritura, expressão oral, vocabulário e escuta.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/portugues/a1' },
};

const COLOR = '#009c3b';

const AUDIO_LISTO = audioReady('portugues');

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Leitura', eng: 'Lectura', desc: '5 textos A1: Carlos em São Paulo, a família, a casa, a comida e a escola. Cada palavra com tradução ao clique.', count: '5 textos · 25 perguntas', href: '/practica/portugues/a1/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Gramática', eng: 'Gramática', desc: 'Los 15 temas del A1: artículos, ser, estar, ter, verbos -ar/-er/-ir, você, negación, contracciones (do/no/ao), posesivos, há/tem y más. Con explicación, tablas y contraste español→portugués.', count: '15 temas · 200+ ejercicios', href: '/practica/portugues/a1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Escrita', eng: 'Escritura', desc: '5 tarefas guiadas: apresentar-se, descrever a família, a casa, as atividades e as preferências.', count: '5 prompts guiados', href: '/practica/portugues/a1/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Expressão oral', eng: 'Expresión oral', desc: '15 frases de sobrevivência em português com pronúncia e notas para hispanohablantes.', count: '15 frases esenciales', href: '/practica/portugues/a1/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Vocabulário', eng: 'Vocabulario', desc: '6 conjuntos temáticos: família, cores, comida, dias, corpo, números. Flashcards + 3 modos.', count: '6 sets · 60+ palabras', href: '/practica/portugues/a1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Compreensão auditiva', eng: 'Escucha', desc: `20 episódios narrativos A1: «O áudio no grupo errado». Roteiro dialogado, vocabulário, perguntas e transcrição bilíngue.${AUDIO_LISTO ? '' : ' Áudio em produção.'}`, count: AUDIO_LISTO ? '20 episódios · 100 perguntas' : '20 episódios · áudio em produção', href: '/practica/portugues/a1/escucha' },
];

const COLORS: Record<string, string> = { lectura: '#009c3b', gramatica: '#7c3aed', escritura: '#059669', habla: '#d97706', vocabulario: '#e11d48', escucha: '#0369a1' };

export default function PortuguesA1Page() {
  return (
    <>
    <CourseSchema
      name="Portugués A1 — Lectura, Gramática, Vocabulario y más"
      description="Practica Portugués nivel A1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
      url="https://www.idiomaswl.com/practica/portugues/a1"
      educationalLevel="A1"
      teaches="Portugués, habilidades MCER"
      inLanguage="po"
    />
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/portugues" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇧🇷 Portugués</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>A1</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>A1</div>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />Portugués A1 — Iniciante</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Elige una habilidad</h1>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0.5rem 0 2.5rem' }}>
          Seis habilidades para um português sólido do zero. Pratique-as na ordem que quiser.
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
      </div>
    </section>
    <PracticaWABanner
      idioma="portugués"
      color="#009c3b"
      msg="Hola, estoy practicando portugués en WeLearn y me gustaría agendar una clase de diagnóstico gratis."
    />
    </>
  );
}
