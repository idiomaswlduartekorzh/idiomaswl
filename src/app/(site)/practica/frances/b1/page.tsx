import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';

export const metadata: Metadata = {
  title: 'Francés B1 — Elige una habilidad | Idiomas WeLearn',
  description: 'Francés B1: lectura, gramática (subjonctif, conditionnel, pronoms relatifs, plus-que-parfait, discours indirect), escritura, expresión oral, vocabulario y escucha.',
  alternates: { canonical: 'https://idiomaswl.com/practica/frances/b1' },
};

const COLOR = '#003189';

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Lecture', eng: 'Lectura', desc: '5 textos B1 (120-150 palabras): actualidad, cultura y ciencia. Subjonctif y conditionnel en contexto.', count: '5 textes · 30 questions', href: '/practica/frances/b1/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Grammaire', eng: 'Gramática', desc: 'Subjonctif présent, Conditionnel, Pronoms relatifs, Plus-que-parfait y Discours indirect.', count: '5 thèmes · 50+ exercices', href: '/practica/frances/b1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Écriture', eng: 'Escritura', desc: "5 tareas B1: emails formales, essais d'opinion, descriptions.", count: '5 prompts guidés', href: '/practica/frances/b1/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Expression orale', eng: 'Habla', desc: '20 phrases B1 pour débats, opinions et conversations formelles.', count: '20 phrases essentielles', href: '/practica/frances/b1/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Vocabulaire', eng: 'Vocabulario', desc: '8 sets thématiques × 10 mots. Flashcard, QCM et écriture.', count: '8 sets · 80+ mots', href: '/practica/frances/b1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Compréhension orale', eng: 'Escucha', desc: '3 dialogues B1 avec scripts. Audios en préparation.', count: '3 dialogues bientôt', href: '/practica/frances/b1/escucha' },
];

const COLORS: Record<string, string> = { lectura: '#003189', gramatica: '#7c3aed', escritura: '#059669', habla: '#d97706', vocabulario: '#e11d48', escucha: '#0369a1' };

export default function FrancesB1Page() {
  return (
    <>
    <CourseSchema
      name="Francés B1 — Lectura, Gramática, Vocabulario y más"
      description="Practica Francés nivel B1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con subjonctif, conditionnel y feedback inmediato."
      url="https://idiomaswl.com/practica/frances/b1"
      educationalLevel="B1"
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
          <span style={{ color: COLOR, fontWeight: 800 }}>B1</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>B1</div>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.2rem' }}><span className="ink-line" />Francés B1 — Intermédiaire</p>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: 0, fontWeight: 700 }}>Elige una habilidad</h1>
          </div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0.5rem 0 2.5rem' }}>
          Seis habilidades para el francés intermedio. Practica le subjonctif, le conditionnel y les pronoms relatifs.
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
          💡 <strong style={{ color: 'var(--ink)' }}>Conseil:</strong> Empieza con <strong style={{ color: '#7c3aed' }}>Gramática</strong> para dominar el subjonctif, luego practica con <strong style={{ color: COLOR }}>Lectura</strong> y <strong style={{ color: '#059669' }}>Escritura</strong>.
        </div>
      </div>
    </section>
    <PracticaWABanner
      idioma="francés"
      color="#003189"
      msg="Hola, estoy practicando francés B1 en WeLearn y me gustaría agendar una clase."
    />
    </>
  );
}
