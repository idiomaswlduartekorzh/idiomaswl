import type { Metadata } from 'next';
import Link from 'next/link';
import TTSPlayer from '@/components/practica/TTSPlayer';

export const metadata: Metadata = {
  title: 'Francés B1 Escucha — Próximamente | Idiomas WeLearn',
  description: 'Ejercicios de comprensión auditiva B1 de francés. Diálogos con vocabulario intermedio en preparación.',
  alternates: { canonical: 'https://idiomaswl.com/practica/frances/b1/escucha' },
};

const COLOR = '#0369a1';

const PLANNED = [
  {
    id: 1, title: 'Un entretien d\'embauche',
    desc: 'Diálogo formal de entrevista de trabajo entre un candidato y una directora de recursos humanos. Practica el subjonctif, le conditionnel y vocabulario profesional B1.',
    script: '"Bonjour, asseyez-vous. — Merci. — Parlez-moi de votre parcours professionnel. — Bien sûr. J\'ai travaillé dans le marketing pendant quatre ans. J\'ai récemment obtenu un diplôme en gestion de projet. — Avez-vous déjà managé une équipe? — Oui, j\'ai dirigé une équipe de cinq personnes pendant deux ans. — Pourquoi voulez-vous quitter votre poste actuel? — Je cherche de nouveaux défis et je voudrais évoluer dans une entreprise plus innovante. — Que feriez-vous si vous étiez sélectionné? — Je m\'investirais pleinement dans l\'équipe et je proposerais de nouvelles stratégies dès le premier mois. — Bien. Quelles sont vos prétentions salariales? — Je souhaiterais un salaire autour de 35 000 euros bruts annuels. — Nous vous contacterons dans la semaine. Merci de votre visite. — Merci beaucoup. Au revoir."',
    questions: ['¿Cuántos años de experiencia tiene el candidato en marketing?', '¿Qué diploma obtuvo recientemente?', '¿Ha gestionado un equipo? ¿Cuántas personas?', '¿Por qué quiere cambiar de trabajo?', '¿Qué haría si fuera seleccionado?', '¿Cuándo recibirá respuesta?'],
    duration: '~60 seg', accent: 'Francés parisino estándar', wpm: 100,
  },
  {
    id: 2, title: 'Débat sur l\'environnement',
    desc: 'Dos amigos debaten sobre el cambio climático y las responsabilidades individuales vs. gubernamentales. Practica le subjonctif, le conditionnel y vocabulario medioambiental.',
    script: '"Tu as vu les nouvelles sur les incendies en Méditerranée? C\'est inquiétant. — Oui, c\'est effrayant. Si les gouvernements avaient agi plus tôt, nous ne serions pas dans cette situation. — Tu crois que les actions individuelles servent à quelque chose? — Je pense que oui, mais honnêtement, si les entreprises réduisaient leurs émissions de carbone, l\'impact serait bien plus grand. — C\'est vrai. J\'essaie de prendre les transports en commun et d\'acheter moins de plastique. — Toutes les actions comptent, mais le vrai changement doit venir des politiques. Il faudrait que des lois environnementales plus strictes soient imposées. — D\'accord, mais en attendant que les gouvernements agissent, chacun doit faire ce qu\'il peut. — Absolument. Il faut que tout le monde s\'y mette, citoyens et gouvernements."',
    questions: ['¿Qué desastre ambiental mencionan?', '¿Qué crítica hacen a los gobiernos?', '¿Qué acciones individuales ha tomado uno de los amigos?', '¿Qué creen que tendría más impacto?', '¿En qué están de acuerdo al final?'],
    duration: '~65 seg', accent: 'Francés conversacional', wpm: 98,
  },
  {
    id: 3, title: 'Planifier un voyage',
    desc: 'Dos amigos planean un viaje a Italia usando le conditionnel, le subjonctif y vocabulario de viajes B1.',
    script: '"J\'ai envie de partir en voyage cet été. Et toi? — Moi aussi! J\'ai pensé à l\'Italie. Tu serais partant? — Bonne idée! Si on réservait maintenant, les billets seraient moins chers. — Je voudrais qu\'on visite Rome et Florence. Tu as des préférences pour l\'hébergement? — Je préférerais qu\'on reste dans un appartement plutôt qu\'à l\'hôtel. Ce serait moins cher et plus authentique. — Je suis d\'accord. Il faudrait qu\'on commence à économiser. Combien de jours tu prévois? — Je pense que dix jours suffiraient. On pourrait passer cinq jours à Rome et cinq à Florence. — Parfait. Si on partait en juillet, ce serait idéal. — Alors, c\'est décidé! Je réserve les billets cette semaine."',
    questions: ['¿A qué país quieren ir de viaje?', '¿Por qué prefieren reservar ya?', '¿Qué tipo de alojamiento prefieren?', '¿Cuántos días planean en total?', '¿Cuándo quieren partir?', '¿Quién va a reservar los billetes?'],
    duration: '~65 seg', accent: 'Francés informal estándar', wpm: 102,
  },
];

export default function EscuchaFrancesB1() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/frances/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 Francés B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 Escucha</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Compréhension orale · Francés B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escucha B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          3 diálogos B1 en preparación. Los audios se grabarán con hablantes nativos franceses. <strong style={{ color: 'var(--ink)' }}>Los scripts y preguntas ya están listos.</strong>
        </p>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `rgba(3,105,161,0.08)`, border: `1px solid rgba(3,105,161,0.2)`, marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎙️ <strong style={{ color: 'var(--ink)' }}>Mientras tanto:</strong> Puedes leer los scripts en voz alta para practicar la pronunciación, o pedirle a David que los lea en clase. Los diálogos incluyen subjonctif, conditionnel y vocabulario B1 esencial.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {PLANNED.map(ex => (
            <div key={ex.id} style={{ border: `1.5px solid rgba(3,105,161,0.2)`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', background: `rgba(3,105,161,0.04)` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🎧</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, color: 'var(--ink)' }}>Dialogue {ex.id}: {ex.title}</span>
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
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Script (texte à enregistrer)</div>
                <p style={{ margin: '0 0 0.85rem', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.65, fontStyle: 'italic', borderLeft: `3px solid rgba(3,105,161,0.3)`, paddingLeft: '0.75rem' }}>
                  {ex.script}
                <TTSPlayer text={ex.script} lang="fr-FR" label="Écouter le script" />
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
          <strong style={{ color: 'var(--ink)' }}>¿Quieres practicar escucha en francés ahora?</strong> Practica con los textos de{' '}
          <Link href="/practica/frances/b1/lectura" style={{ color: COLOR, fontWeight: 700 }}>Lectura B1</Link>{' '}
          o trabaja las frases de{' '}
          <Link href="/practica/frances/b1/habla" style={{ color: COLOR, fontWeight: 700 }}>Expresión oral B1</Link>{' '}
          que ya están disponibles.
        </div>
      </div>
    </section>
  );
}
