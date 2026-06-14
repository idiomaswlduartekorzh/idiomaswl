import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Inglés A2 Escucha — Próximamente | Idiomas WeLearn',
  description: 'Ejercicios de comprensión auditiva A2 de inglés. Diálogos con voz nativa en preparación.',
  alternates: { canonical: 'https://idiomaswl.com/practica/ingles/a2/escucha' },
};

const COLOR = '#0369a1';

const PLANNED = [
  {
    id: 1, title: 'At the Airport',
    desc: 'Diálogo en el aeropuerto entre una viajera y el agente de check-in. Practica vocabulario de viajes, preguntas en pasado y futuro.',
    script: '"Good morning! I\'d like to check in for my flight to Madrid. — Of course! Can I see your passport, please? — Here you go. — Thank you. Did you pack this bag yourself? — Yes, I did. — Do you have any liquids in your hand luggage? — Just a water bottle. — That\'s fine. Would you like a window or aisle seat? — A window seat, please. — Perfect. Your flight departs at 14:30 from Gate B7. Have a good flight! — Thank you very much!"',
    questions: ['¿A qué ciudad viaja la pasajera?', '¿Qué documento presenta?', '¿Ella hizo las maletas sola?', '¿Qué asiento prefiere?', '¿A qué hora sale el vuelo?', '¿De qué puerta?'],
    duration: '~50 seg', accent: 'Inglés americano', wpm: 110,
  },
  {
    id: 2, title: 'A Job Interview',
    desc: 'Entrevista de trabajo entre una candidata y un entrevistador. Escucha el uso de tiempos pasados, comparativos y modales.',
    script: '"Good afternoon, Ms. García. Please, take a seat. — Thank you. — So, tell me a little about yourself. — Well, I worked as a marketing assistant for two years. I enjoyed it, but I decided to look for a more challenging position. — Why are you interested in this job specifically? — Because your company is more innovative than others in the sector, and the role offers better opportunities for growth. — That\'s good to hear. Could you tell me about your biggest professional achievement? — I developed a campaign that increased sales by 30%. — Impressive. When could you start? — I\'m available from next Monday."',
    questions: ['¿Cuánto tiempo trabajó como asistente?', '¿Por qué dejó su trabajo anterior?', '¿Por qué quiere trabajar en esta empresa?', '¿Cuál fue su logro más grande?', '¿Cuándo puede empezar?'],
    duration: '~55 seg', accent: 'Inglés británico', wpm: 105,
  },
  {
    id: 3, title: 'Planning a Trip Together',
    desc: 'Dos amigos planean un viaje usando "going to" y "will". Escucha cómo expresan planes y toman decisiones espontáneas.',
    script: '"Are you free next month? I\'m thinking of going to Peru. — Peru? That sounds amazing! I\'ve always wanted to visit Machu Picchu. — Me too. I\'m going to book the flights this weekend — they\'re cheaper if you buy early. — I\'ll look for a hotel near Cusco while you book the flights. — Great! How long are we going to stay? — I think two weeks will be enough. What about food? — I\'ve heard the food there is much better than I expected. I\'ll definitely try ceviche! — Perfect. This is going to be the best trip ever!"',
    questions: ['¿A dónde planean ir?', '¿Cuándo va a comprar los vuelos?', '¿Quién busca el hotel?', '¿Cuánto tiempo van a quedarse?', '¿Qué comida quiere probar?'],
    duration: '~50 seg', accent: 'Inglés australiano', wpm: 108,
  },
];

export default function EscuchaInglesA2() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ingles/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 Escucha</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Listening · Inglés A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escucha A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          3 diálogos A2 en preparación. Los audios se grabarán con hablantes nativos profesionales. <strong style={{ color: 'var(--ink)' }}>Los scripts y preguntas ya están listos.</strong>
        </p>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `rgba(3,105,161,0.08)`, border: `1px solid rgba(3,105,161,0.2)`, marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎙️ <strong style={{ color: 'var(--ink)' }}>Mientras tanto:</strong> Puedes leer los scripts en voz alta para practicar la pronunciación, o pedirle a David que los lea en clase. Los diálogos incluyen pasado simple, comparativos y modales.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {PLANNED.map(ex => (
            <div key={ex.id} style={{ border: `1.5px solid rgba(3,105,161,0.2)`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', background: `rgba(3,105,161,0.04)` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🎧</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, color: 'var(--ink)' }}>Diálogo {ex.id}: {ex.title}</span>
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
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Script (texto que se grabará)</div>
                <p style={{ margin: '0 0 0.85rem', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.65, fontStyle: 'italic', borderLeft: `3px solid rgba(3,105,161,0.3)`, paddingLeft: '0.75rem' }}>
                  {ex.script}
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
          <strong style={{ color: 'var(--ink)' }}>¿Quieres practicar escucha ahora?</strong> Visita los ejercicios de{' '}
          <Link href="/examenes/ielts" style={{ color: COLOR, fontWeight: 700 }}>IELTS Academic</Link>{' '}
          o el simulacro de{' '}
          <Link href="/practica/ielts" style={{ color: COLOR, fontWeight: 700 }}>IELTS Reading</Link>{' '}
          que ya están disponibles.
        </div>
      </div>
    </section>
  );
}
