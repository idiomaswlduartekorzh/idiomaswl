import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'Francés A2 — Elige una habilidad | Idiomas WeLearn',
  description: 'Francés A2: lectura, gramática (passé composé, imparfait, pronoms COD/COI, comparatif/superlatif, futur), escritura, expresión oral, vocabulario y escucha.',
  alternates: { canonical: 'https://idiomaswl.com/practica/frances/a2' },
};

const COLOR = '#003189';

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Lecture', eng: 'Lectura', desc: '5 textos A2 (80-120 mots) sur les voyages, le travail, les opinions. Vocabulaire cliquable, 6 questions par texte.', count: '5 textes · 30 questions', href: '/practica/frances/a2/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Grammaire', eng: 'Gramática', desc: 'Passé composé, imparfait, pronoms COD/COI, comparatif/superlatif, futur proche vs futur simple. 10 exercices par thème.', count: '5 thèmes · 50+ exercices', href: '/practica/frances/a2/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Écriture', eng: 'Escritura', desc: "5 tâches d'écriture A2 avec grammaire intégrée, modèle et liste de vérification.", count: '5 rédactions guidées', href: '/practica/frances/a2/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Expression orale', eng: 'Habla', desc: '20 expressions A2 avec contexte situationnel, prononciation et variantes formelles/informelles.', count: '20 expressions essentielles', href: '/practica/frances/a2/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Vocabulaire', eng: 'Vocabulario', desc: '8 thèmes × 10 mots. 3 modes de pratique : flashcards, QCM et écriture.', count: '8 thèmes · 80+ mots', href: '/practica/frances/a2/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Compréhension orale', eng: 'Escucha', desc: '3 dialogues A2 complets avec scripts. Audios en préparation.', count: '3 dialogues bientôt', href: '/practica/frances/a2/escucha' },
];

const COLORS: Record<string, string> = { lectura: '#003189', gramatica: '#7c3aed', escritura: '#059669', habla: '#d97706', vocabulario: '#e11d48', escucha: '#0369a1' };

export default function FrancesA2Page() {
  return (
    <>
    <CourseSchema
      name="Francés A2 — Lectura, Gramática, Vocabulario y más"
      description="Practica Francés nivel A2: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
      url="https://idiomaswl.com/practica/frances/a2"
      educationalLevel="A2"
      teaches="Francés, habilidades MCER"
      inLanguage="fr"
    />
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/frances" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 Francés</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>A2</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>A2</div>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />Francés A2 — Élémentaire</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Elige una habilidad</h1>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0.5rem 0 2.5rem' }}>
          Six compétences pour consolider ton français et aller au-delà des bases. Pratique à ton rythme.
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
        <div style={{ marginTop: '2rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(0,49,137,0.06)', border: '1px solid rgba(0,49,137,0.15)', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Conseil:</strong> Commence par <strong style={{ color: '#7c3aed' }}>Grammaire</strong> pour maîtriser le passé composé, puis pratique avec <strong style={{ color: COLOR }}>Lecture</strong> en utilisant des textes authentiques.
        </div>
      </div>
    </section>
    </>
  );
}
