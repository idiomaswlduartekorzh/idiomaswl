import type { Metadata } from 'next';
import Link from 'next/link';
import TTSPlayer from '@/components/practica/TTSPlayer';

export const metadata: Metadata = {
  title: 'Italiano A2 Escucha — Próximamente | Idiomas WeLearn',
  description: 'Ejercicios de comprensión auditiva A2 de italiano. Diálogos con voz nativa en preparación.',
  alternates: { canonical: 'https://idiomaswl.com/practica/italiano/a2/escucha' },
};

const COLOR = '#0369a1';

const PLANNED = [
  {
    id: 1, title: "All'aeroporto",
    desc: 'Diálogo en el aeropuerto entre un viajero y el agente de check-in. Practica vocabulario de viajes, passato prossimo y preguntas formales en italiano.',
    script: '"Buongiorno! Vorrei fare il check-in per il volo per Milano. — Buongiorno! Posso vedere il passaporto, per favore? — Eccolo. — Grazie. Ha fatto lei le valigie? — Sì, le ho fatte io. — Ha qualche liquido nel bagaglio a mano? — Solo una bottiglietta d\'acqua. — Va bene. Preferisce il finestrino o il corridoio? — Il finestrino, per favore. — Perfetto. Il suo volo parte alle 15:45 dall\'uscita C12. Buon viaggio! — Grazie mille!"',
    questions: ['¿A qué ciudad viaja el pasajero?', '¿Qué documento presenta?', '¿Él mismo hizo las maletas?', '¿Qué asiento prefiere?', '¿A qué hora sale el vuelo?', '¿De qué puerta sale?'],
    duration: '~50 seg', accent: 'Italiano estándar', wpm: 100,
  },
  {
    id: 2, title: 'Un colloquio di lavoro',
    desc: 'Entrevista de trabajo entre una candidata y un entrevistador. Escucha el uso del passato prossimo, comparativos y el lenguaje profesional italiano.',
    script: '"Buon pomeriggio, signorina Ferretti. Prego, si accomodi. — Grazie. — Allora, mi parli un po\' di lei. — Certo. Ho lavorato come assistente marketing per tre anni. Ho imparato molto, ma cercavo qualcosa di più stimolante. — Perché è interessata a questa posizione? — Perché la vostra azienda è più innovativa delle altre nel settore e offre maggiori opportunità di crescita. — Capisco. Può raccontarmi del suo progetto più importante? — Ho sviluppato una campagna che ha aumentato le vendite del 25%. — Ottimo. Da quando potrebbe iniziare? — Sono disponibile dalla prossima settimana."',
    questions: ['¿Cuánto tiempo trabajó como asistente?', '¿Por qué dejó su trabajo anterior?', '¿Por qué quiere trabajar en esa empresa?', '¿Cuál fue su logro más importante?', '¿Cuándo puede empezar?'],
    duration: '~55 seg', accent: 'Italiano del norte', wpm: 100,
  },
  {
    id: 3, title: 'Pianificare una vacanza',
    desc: 'Dos amigos planean un viaje usando el futuro semplice. Escucha cómo expresan planes, toman decisiones y se emocionan con el viaje.',
    script: '"Sei libera il mese prossimo? Sto pensando di andare in Sardegna. — In Sardegna? Che bella idea! Ho sempre voluto vedere il mare lì. — Anch\'io. Prenoto i voli questo weekend — costano meno se li compri in anticipo. — Io cerco un albergo vicino alla spiaggia mentre tu prenoti i voli. — Perfetto! Quanto tempo rimarremo? — Penso che dieci giorni saranno sufficienti. E il cibo? — Ho sentito che la cucina sarda è buonissima — mangeremo porceddu e culurgiones ogni giorno! — Non vedo l\'ora! Sarà la vacanza più bella dell\'estate!"',
    questions: ['¿Adónde planean ir?', '¿Cuándo comprará los vuelos?', '¿Quién buscará el hotel?', '¿Cuánto tiempo planean quedarse?', '¿Qué comidas quieren probar?'],
    duration: '~50 seg', accent: 'Italiano meridional', wpm: 100,
  },
];

export default function EscuchaItalianoA2() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/italiano/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 Escucha</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Ascolto · Italiano A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escucha A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          3 diálogos A2 en preparación. Los audios se grabarán con hablantes nativos profesionales. <strong style={{ color: 'var(--ink)' }}>Los scripts y preguntas ya están listos.</strong>
        </p>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `rgba(3,105,161,0.08)`, border: `1px solid rgba(3,105,161,0.2)`, marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎙️ <strong style={{ color: 'var(--ink)' }}>Mientras tanto:</strong> Puedes leer los scripts en voz alta para practicar la pronunciación italiana, o pedirle a David que los lea en clase. Los diálogos incluyen passato prossimo, comparativos y futuro semplice.
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
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Script (testo che verrà registrato)</div>
                <p style={{ margin: '0 0 0.85rem', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.65, fontStyle: 'italic', borderLeft: `3px solid rgba(3,105,161,0.3)`, paddingLeft: '0.75rem' }}>
                  {ex.script}
                <TTSPlayer text={ex.script} lang="it-IT" label="Ascoltare script" />
                </p>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Domande che verranno poste</div>
                {ex.questions.map((q, i) => (
                  <p key={i} style={{ margin: '0 0 0.2rem', fontSize: '0.82rem', color: 'var(--muted)' }}>{i + 1}. {q}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '1.1rem 1.3rem', borderRadius: 14, background: 'rgba(3,105,161,0.06)', border: '1px solid rgba(3,105,161,0.18)', fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>¿Quieres practicar escucha en italiano ahora?</strong> Practica la lectura en voz alta con los textos de{' '}
          <Link href="/practica/italiano/a2/lectura" style={{ color: COLOR, fontWeight: 700 }}>Lectura A2</Link>{' '}
          o trabaja las frases de{' '}
          <Link href="/practica/italiano/a2/habla" style={{ color: COLOR, fontWeight: 700 }}>Expresión oral A2</Link>{' '}
          que ya están disponibles.
        </div>
      </div>
    </section>
  );
}
