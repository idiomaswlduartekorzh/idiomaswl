import type { Metadata } from 'next';
import Link from 'next/link';
import TTSPlayer from '@/components/practica/TTSPlayer';

export const metadata: Metadata = {
  title: 'Italiano A1 Ascolto — Próximamente | Idiomas WeLearn',
  description: 'Ejercicios de comprensión auditiva A1 de italiano. Scripts con voz nativa italiana en preparación.',
  alternates: { canonical: 'https://idiomaswl.com/practica/italiano/a1/escucha' },
};

const COLOR = '#0369a1';

const PLANNED = [
  {
    id: 1, title: 'Presentarsi a scuola',
    desc: 'Escucha a Sofia presentarse en clase el primer día. Identifica nombre, edad, ciudad y gustos.',
    script: '"Ciao a tutti! Mi chiamo Sofia. Ho ventidue anni. Sono di Napoli ma adesso abito a Milano. Studio lingue all\'università. Mi piace molto la musica e il cinema. Sono molto contenta di essere qui con voi!"',
    questions: ['¿Cómo se llama?', '¿Cuántos años tiene?', '¿De qué ciudad es originalmente?', '¿Dónde vive ahora?', '¿Qué estudia?'],
    duration: '~25 seg', accent: 'Italiano estándar (milanese)', wpm: 95,
  },
  {
    id: 2, title: 'Al bar — ordinare un caffè',
    desc: 'Escucha una conversación típica en un bar italiano para pedir café. Identifica la bebida, el precio y la despedida.',
    script: '"Buongiorno! — Buongiorno! Cosa prende? — Un caffè, per favore. — Con zucchero? — No, grazie, lo prendo amaro. — Subito. Ecco il suo caffè. Sono ottanta centesimi. — Grazie mille! — Prego! Buona giornata!"',
    questions: ['¿Qué pide el cliente?', '¿Cómo quiere el café?', '¿Cuánto cuesta?', '¿Qué dice el barista al final?'],
    duration: '~40 seg', accent: 'Italiano estándar', wpm: 100,
  },
  {
    id: 3, title: 'Una telefonata — dove sei?',
    desc: 'Escucha un diálogo telefónico breve entre dos amigos que quedan para encontrarse.',
    script: '"Pronto? — Ciao Marco! Dove sei? — Sono in piazza, vicino alla fontana. E tu? — Sto arrivando, sono sul bus. Ci vediamo tra dieci minuti? — Sì, perfetto! Ci vediamo lì. Ciao! — Ciao, a dopo!"',
    questions: ['¿Dónde está Marco?', '¿Cómo va el otro amigo?', '¿En cuánto tiempo se verán?', '¿Cómo se despiden?'],
    duration: '~35 seg', accent: 'Italiano informal (giovani)', wpm: 105,
  },
];

export default function EscuchaItalianoA1() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/italiano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 Escucha</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Ascolto · Italiano A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Ascolto A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          3 ejercicios de comprensión auditiva en preparación. Los audios se grabarán con hablantes nativos italianos. <strong style={{ color: 'var(--ink)' }}>Scripts y preguntas ya listos.</strong>
        </p>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `rgba(3,105,161,0.08)`, border: `1px solid rgba(3,105,161,0.2)`, marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎙️ <strong style={{ color: 'var(--ink)' }}>Mientras tanto:</strong> Lee los scripts en voz alta practicando la pronunciación italiana. Los sonidos claves: "c" antes de e/i → [ch]; "gl" → [ly]; "gn" → [ny] (como ñ).
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {PLANNED.map(ex => (
            <div key={ex.id} style={{ border: `1.5px solid rgba(3,105,161,0.2)`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', background: `rgba(3,105,161,0.04)` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🎧</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, color: 'var(--ink)' }}>Esercizio {ex.id}: {ex.title}</span>
                      <span style={{ fontSize: '0.62rem', fontWeight: 700, background: 'var(--line-soft)', color: 'var(--muted)', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>PROSSIMAMENTE</span>
                    </div>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.5 }}>{ex.desc}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {[`⏱ ${ex.duration}`, `🗣 ${ex.accent}`, `~${ex.wpm} wpm`].map(tag => (
                        <span key={tag} style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(3,105,161,0.08)', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 600 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--line-soft)' }}>
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>Script (per praticare la lettura ad alta voce)</p>
                <p style={{ margin: '0 0 0.75rem', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.65, fontStyle: 'italic' }}>{ex.script}</p>
                <TTSPlayer text={ex.script} lang="it-IT" label="Ascolta lo script" />
                <p style={{ margin: '0 0 0.35rem', fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>Domande di comprensione</p>
                <ol style={{ margin: 0, padding: '0 0 0 1.2rem', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.8 }}>
                  {ex.questions.map((q, i) => <li key={i}>{q}</li>)}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
