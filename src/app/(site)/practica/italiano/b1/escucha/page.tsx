import type { Metadata } from 'next';
import Link from 'next/link';
import TTSPlayer from '@/components/practica/TTSPlayer';

export const metadata: Metadata = {
  title: 'Italiano B1 Escucha — Próximamente | Idiomas WeLearn',
  description: 'Ejercicios de comprensión auditiva B1 de italiano. Diálogos con vocabulario intermedio en preparación.',
  alternates: { canonical: 'https://idiomaswl.com/practica/italiano/b1/escucha' },
};

const COLOR = '#0369a1';

const PLANNED = [
  {
    id: 1, title: 'Un colloquio di lavoro (Entrevista de trabajo)',
    desc: 'Diálogo formal de entrevista de trabajo. Practica il congiuntivo, il condizionale y vocabulario profesional B1.',
    script: '"Buongiorno! Si accomodi, prego. — Grazie. — Mi parli del suo percorso professionale. — Certo. Ho lavorato nel marketing per quattro anni e ho recentemente conseguito un diploma in gestione dei progetti. — Ha mai diretto un team? — Sì, ho guidato un team di cinque persone per due anni. — Perché vuole lasciare il suo lavoro attuale? — Cerco nuove sfide. Credo che questa azienda possa offrirmi opportunità di crescita professionale. — Cosa farebbe nei primi tre mesi? — Vorrei conoscere il team e poi proporrei nuove strategie di comunicazione. — Quali sono le sue aspettative salariali? — Mi aspetterei uno stipendio di circa 30.000 euro lordi annui. — La contatteremo entro la fine della settimana. Grazie della sua visita. — Grazie a lei. Arrivederci."',
    questions: ['¿Cuántos años trabajó en marketing?', '¿Qué título obtuvo recientemente?', '¿Ha dirigido un equipo? ¿Cuántas personas?', '¿Por qué quiere cambiar de trabajo?', '¿Qué haría en los primeros tres meses?', '¿Cuándo recibirá respuesta?'],
    duration: '~65 seg', accent: 'Italiano estándar (toscano)', wpm: 100,
  },
  {
    id: 2, title: 'Discussione sull\'ambiente (Debate ambiental)',
    desc: 'Dos amigos debaten sobre el cambio climático. Practica il congiuntivo, il condizionale y vocabulario medioambiental.',
    script: '"Hai visto le notizie sulle alluvioni in Italia? È sempre peggio ogni anno. — Sì, è davvero preoccupante. Se i governi avessero agito prima, non saremmo in questa situazione. — Credi che le azioni individuali abbiano un effetto? — Penso di sì, ma onestamente, se le aziende riducessero le loro emissioni di carbonio, l\'impatto sarebbe molto maggiore di qualsiasi cambiamento individuale. — È vero. Cerco di usare i mezzi pubblici e di comprare meno plastica. — Ogni azione conta, ma il vero cambiamento deve venire dalle politiche. Bisognerebbe che venissero introdotte leggi ambientali più severe. — D\'accordo. Ma nell\'attesa che i governi agiscano, dobbiamo tutti fare quello che possiamo. — Assolutamente. Credo che ci voglia sia la responsabilità individuale sia l\'azione governativa forte."',
    questions: ['¿Qué desastre ambiental mencionan?', '¿Qué crítica hacen a los gobiernos?', '¿Qué acciones individuales toma uno de ellos?', '¿Qué tendría más impacto?', '¿En qué están de acuerdo al final?'],
    duration: '~65 seg', accent: 'Italiano conversacional', wpm: 98,
  },
  {
    id: 3, title: 'Pianificare un viaggio (Planear un viaje)',
    desc: 'Dos amigos planean un viaje a Sicilia usando il condizionale y vocabulario de viajes B1.',
    script: '"Ho voglia di viaggiare questa estate. Che ne pensi? — Anch\'io! Ho pensato alla Sicilia. Ti andrebbe? — Ottima idea! Se prenotassimo adesso, i biglietti costerebbero meno. — Vorrei visitare Palermo e la Valle dei Templi. Che tipo di alloggio preferiresti? — Preferirei stare in un appartamento piuttosto che in un hotel. Sarebbe meno caro e più autentico. — Sono d\'accordo. Dovremmo iniziare a risparmiare. Quanti giorni pensi? — Credo che dieci giorni sarebbero sufficienti. Potremmo passare cinque giorni a Palermo e cinque in giro per la Sicilia. — Perfetto. Se partissimo a luglio, il tempo sarebbe ideale. — Allora è deciso! Prenoto i biglietti questa settimana."',
    questions: ['¿A qué destino quieren ir?', '¿Por qué conviene reservar ya?', '¿Qué tipo de alojamiento prefieren?', '¿Cuántos días en total?', '¿Cuándo quieren partir?', '¿Quién reservará los billetes?'],
    duration: '~65 seg', accent: 'Italiano informal estándar', wpm: 100,
  },
];

export default function EscuchaItalianoB1() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/italiano/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 Escucha</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Comprensione orale · Italiano B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escucha B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          3 diálogos B1 en preparación. Los audios se grabarán con hablantes nativos italianos. <strong style={{ color: 'var(--ink)' }}>Los scripts y preguntas ya están listos.</strong>
        </p>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `rgba(3,105,161,0.08)`, border: `1px solid rgba(3,105,161,0.2)`, marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎙️ <strong style={{ color: 'var(--ink)' }}>Mientras tanto:</strong> Puedes leer los scripts en voz alta para practicar la pronunciación, o pedirle a David que los lea en clase. Los diálogos incluyen congiuntivo, condizionale y vocabulario B1 esencial.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {PLANNED.map(ex => (
            <div key={ex.id} style={{ border: `1.5px solid rgba(3,105,161,0.2)`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', background: `rgba(3,105,161,0.04)` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🎧</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, color: 'var(--ink)' }}>Dialogo {ex.id}: {ex.title}</span>
                      <span style={{ fontSize: '0.62rem', fontWeight: 700, background: 'var(--line-soft)', color: 'var(--muted)', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>PRÓXIMAMENTE</span>
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
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Script (testo da registrare)</div>
                <p style={{ margin: '0 0 0.85rem', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.65, fontStyle: 'italic', borderLeft: `3px solid rgba(3,105,161,0.3)`, paddingLeft: '0.75rem' }}>
                  {ex.script}
                <TTSPlayer text={ex.script} lang="it-IT" label="Ascolta il dialogo" />
                </p>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Preguntas que se harán</div>
                {ex.questions.map((q, i) => (
                  <p key={i} style={{ margin: '0 0 0.2rem', fontSize: '0.82rem', color: 'var(--muted)' }}>{i + 1}. {q}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '1.1rem 1.3rem', borderRadius: 14, background: 'rgba(3,105,161,0.06)', border: '1px solid rgba(3,105,161,0.18)', fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>¿Quieres practicar escucha en italiano ahora?</strong> Practica con los textos de{' '}
          <Link href="/practica/italiano/b1/lectura" style={{ color: COLOR, fontWeight: 700 }}>Lectura B1</Link>{' '}
          o trabaja las frases de{' '}
          <Link href="/practica/italiano/b1/habla" style={{ color: COLOR, fontWeight: 700 }}>Expresión oral B1</Link>{' '}
          que ya están disponibles.
        </div>
      </div>
    </section>
  );
}
