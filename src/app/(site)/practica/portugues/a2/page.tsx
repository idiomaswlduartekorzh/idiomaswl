import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Portugués A2 — Elige una habilidad | Idiomas WeLearn',
  description: 'Portugués A2: pretérito perfeito vs imperfeito, pronomes oblíquos, ser vs estar, comparativo, futuro e vocabulário temático.',
  alternates: { canonical: 'https://idiomaswl.com/practica/portugues/a2' },
};

const COLOR = '#009c3b';

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Leitura', eng: 'Lectura', desc: '5 textos A2 (80-120 palavras) sobre viagens, trabalho, opiniões. Vocabulário clicável, 6 perguntas por texto.', count: '5 textos · 30 perguntas', href: '/practica/portugues/a2/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Gramática', eng: 'Gramática', desc: 'Pretérito perfeito vs imperfeito, pronomes oblíquos, ser vs estar, comparativo e futuro. 10 exercícios por tema.', count: '5 temas · 50+ exercícios', href: '/practica/portugues/a2/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Escrita', eng: 'Escritura', desc: '5 tarefas de escrita A2 com gramática integrada, modelo e lista de verificação.', count: '5 redações guiadas', href: '/practica/portugues/a2/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Expressão oral', eng: 'Expresión oral', desc: '20 expressões A2 com contexto situacional, pronúncia e variantes formais/informais.', count: '20 expressões essenciais', href: '/practica/portugues/a2/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Vocabulário', eng: 'Vocabulario', desc: '8 temas × 10 palavras. 3 modos de prática: flashcard, QCM e escrita.', count: '8 temas · 80+ palavras', href: '/practica/portugues/a2/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Compreensão auditiva', eng: 'Escucha', desc: '3 diálogos A2 completos com scripts. Áudios em preparação.', count: '3 diálogos em breve', href: '/practica/portugues/a2/escucha' },
];

const COLORS: Record<string, string> = { lectura: '#009c3b', gramatica: '#7c3aed', escritura: '#059669', habla: '#d97706', vocabulario: '#e11d48', escucha: '#0369a1' };

export default function PortuguesA2Page() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/portugues" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇧🇷 Portugués</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>A2</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>A2</div>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />Portugués A2 — Elementar</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Elige una habilidad</h1>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0.5rem 0 2.5rem' }}>
          Seis habilidades para consolidar o português elementar. Pratique-as na ordem que quiser.
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
        <div style={{ marginTop: '2rem', padding: '1rem 1.25rem', borderRadius: 14, background: `${COLOR}08`, border: `1px solid ${COLOR}22`, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Dica de estudo:</strong> Comece pela <strong style={{ color: '#7c3aed' }}>Gramática</strong> para dominar o pretérito perfeito vs imperfeito, depois pratique com <strong style={{ color: COLOR }}>Leitura</strong> usando textos autênticos.
        </div>
      </div>
    </section>
  );
}
