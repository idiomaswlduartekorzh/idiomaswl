import type { Metadata } from 'next';
import Link from 'next/link';
import TTSPlayer from '@/components/practica/TTSPlayer';

export const metadata: Metadata = {
  title: 'Inglés B1 Escucha — Próximamente | Idiomas WeLearn',
  description: 'Ejercicios de comprensión auditiva B1 de inglés. Diálogos con vocabulario intermedio en preparación.',
  alternates: { canonical: 'https://idiomaswl.com/practica/ingles/b1/escucha' },
};

const COLOR = '#0369a1';

const PLANNED = [
  {
    id: 1, title: 'A Job Interview',
    desc: 'Diálogo formal de entrevista de trabajo entre un candidato y un entrevistador. Practica vocabulario profesional, present perfect y preguntas sobre experiencia.',
    script: '"Good morning. Please, take a seat. — Thank you. — So, can you tell me a little about your professional background? — Of course. I have worked in marketing for five years, and I have recently completed a project management course. — Impressive. Have you ever managed a team before? — Yes, I have. I led a team of six people for two years at my previous company. — And why have you decided to leave? — I am looking for new challenges and a company with more opportunities for growth. — I see. What would you say is your biggest professional achievement? — I developed a social media campaign that increased our sales by 40% in three months. — That\'s excellent. We will be in touch by the end of the week. — Thank you very much. I look forward to hearing from you."',
    questions: ['¿Cuántos años de experiencia en marketing tiene el candidato?', '¿Qué curso completó recientemente?', '¿Ha liderado un equipo antes? ¿Por cuánto tiempo?', '¿Por qué quiere dejar su trabajo actual?', '¿Cuál fue su logro más importante?', '¿Cuándo recibirá respuesta?'],
    duration: '~60 seg', accent: 'Inglés británico', wpm: 110,
  },
  {
    id: 2, title: 'Discussing Environmental Issues',
    desc: 'Dos amigos debaten sobre el cambio climático y las acciones individuales vs. políticas gubernamentales. Practica condicionales y vocabulario ambiental.',
    script: '"Did you see the news about the floods in Europe? It\'s getting worse every year. — I know. It\'s really worrying. If governments had acted sooner, we wouldn\'t be in this situation. — Do you think individual actions make a difference, though? — I believe they do, but honestly, if companies reduced their carbon emissions, it would have a much bigger impact than any individual change. — That\'s true. I have been trying to use public transport more and buy less plastic. — Every action counts, but the real change needs to come from policy. If stricter environmental laws were introduced, businesses would be forced to change their practices. — Agreed. But while we wait for governments to act, we should all do what we can. — Absolutely. I think we need both — individual responsibility and strong government action."',
    questions: ['¿Qué evento climático mencionan?', '¿Qué crítica hace el amigo a los gobiernos?', '¿Qué acciones individuales ha tomado uno de ellos?', '¿Qué creen que tendría más impacto: acciones individuales o cambios en empresas?', '¿En qué están de acuerdo al final?'],
    duration: '~65 seg', accent: 'Inglés americano', wpm: 108,
  },
  {
    id: 3, title: 'Planning a Trip Abroad',
    desc: 'Una pareja planea un viaje internacional discutiendo itinerario, alojamiento y presupuesto. Practica condicionales, present perfect y vocabulario de viajes.',
    script: '"I have been researching flights to Japan. Have you decided when you want to go? — I was thinking about April, when the cherry blossoms are in bloom. If we book now, we will get much better prices. — Good point. I have also been looking at accommodation. If we stayed in a traditional ryokan, it would be a more authentic experience, but hotels are cheaper. — I think we should try both — a couple of nights in a ryokan and the rest in a hotel. — That sounds perfect. Have you looked at the itinerary? — Yes. If we spend three days in Tokyo and then travel to Kyoto by bullet train, we will have time to visit both cities properly. — What about the budget? — If we save around five hundred dollars a month for the next four months, we will have enough. — Let\'s do it. This is going to be an amazing trip!"',
    questions: ['¿A qué destino planean viajar?', '¿Por qué eligen el mes de abril?', '¿Cuál es la diferencia entre un ryokan y un hotel?', '¿Cuántos días planean en Tokio?', '¿Cómo van a viajar entre ciudades?', '¿Cuánto necesitan ahorrar mensualmente?'],
    duration: '~65 seg', accent: 'Inglés australiano', wpm: 106,
  },
];

export default function EscuchaInglesB1() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ingles/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 Escucha</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Listening · Inglés B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escucha B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          3 diálogos B1 en preparación. Los audios se grabarán con hablantes nativos profesionales. <strong style={{ color: 'var(--ink)' }}>Los scripts y preguntas ya están listos.</strong>
        </p>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `rgba(3,105,161,0.08)`, border: `1px solid rgba(3,105,161,0.2)`, marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎙️ <strong style={{ color: 'var(--ink)' }}>Mientras tanto:</strong> Puedes leer los scripts en voz alta para practicar la pronunciación, o pedirle a David que los lea en clase. Los diálogos incluyen present perfect, condicionales y vocabulario B1 esencial.
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
                <TTSPlayer text={ex.script} lang="en-GB" label="Listen to dialogue" />
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
