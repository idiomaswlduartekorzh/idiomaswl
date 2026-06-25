import type { Metadata } from 'next';
import Link from 'next/link';
import TTSPlayer from '@/components/practica/TTSPlayer';

export const metadata: Metadata = {
  title: 'Alemán B1 Escucha — Próximamente | Idiomas WeLearn',
  description: 'Ejercicios de comprensión auditiva B1 de alemán. Diálogos con vocabulario intermedio en preparación.',
  alternates: { canonical: 'https://idiomaswl.com/practica/aleman/b1/escucha' },
};

const COLOR = '#0369a1';

const PLANNED = [
  {
    id: 1, title: 'Ein Vorstellungsgespräch (Entrevista de trabajo)',
    desc: 'Diálogo formal de entrevista de trabajo. Practica Konjunktiv II, Passiv y vocabulario profesional B1.',
    script: '"Guten Tag! Bitte nehmen Sie Platz. — Danke schön. — Erzählen Sie mir etwas über Ihren beruflichen Werdegang. — Gerne. Ich habe vier Jahre im Marketing gearbeitet und kürzlich einen Projektmanagement-Kurs abgeschlossen. — Haben Sie schon einmal ein Team geleitet? — Ja, ich habe zwei Jahre lang ein Team von fünf Personen geführt. — Warum möchten Sie Ihre aktuelle Stelle verlassen? — Ich suche neue Herausforderungen. Wenn ich hier arbeiten würde, könnte ich mich professionell weiterentwickeln. — Was würden Sie in den ersten drei Monaten tun? — Ich würde zunächst das Team kennenlernen und dann neue Strategien vorschlagen. — Gut. Welche Gehaltsvorstellungen haben Sie? — Ich würde mir ein Jahresgehalt von 45.000 Euro vorstellen. — Wir werden uns bis Ende der Woche bei Ihnen melden. — Vielen Dank. Auf Wiedersehen."',
    questions: ['¿Cuántos años trabajó en marketing?', '¿Qué curso completó recientemente?', '¿Ha liderado un equipo? ¿Cuántas personas?', '¿Por qué quiere cambiar de trabajo?', '¿Qué haría en los primeros tres meses?', '¿Cuándo recibirá respuesta?'],
    duration: '~65 seg', accent: 'Alemán estándar (Hochdeutsch)', wpm: 95,
  },
  {
    id: 2, title: 'Diskussion über den Klimawandel (Debate sobre el clima)',
    desc: 'Dos amigos debaten sobre el cambio climático. Practica Konjunktiv II, Passiv y vocabulario medioambiental.',
    script: '"Hast du die Nachrichten über die Überschwemmungen in Deutschland gesehen? Es wird jedes Jahr schlimmer. — Ja, das ist wirklich besorgniserregend. Wenn die Regierungen früher gehandelt hätten, wären wir nicht in dieser Situation. — Glaubst du, dass individuelle Maßnahmen wirklich helfen? — Ich denke schon, aber ehrlich gesagt: Wenn Unternehmen ihre CO2-Emissionen reduzieren würden, wäre der Effekt viel größer als jede individuelle Veränderung. — Das stimmt. Ich versuche, öffentliche Verkehrsmittel zu nutzen und weniger Plastik zu kaufen. — Jede Aktion zählt, aber die echte Veränderung muss durch Politik kommen. Es müssten strengere Umweltgesetze eingeführt werden. — Einverstanden. Aber solange wir auf die Regierungen warten, sollten wir alle tun, was wir können. — Genau. Ich glaube, wir brauchen beides: individuelle Verantwortung und starke politische Maßnahmen."',
    questions: ['¿Qué desastre ambiental mencionan?', '¿Qué crítica hacen a los gobiernos?', '¿Qué acciones individuales toma uno de ellos?', '¿Qué tendría más impacto según ellos?', '¿En qué están de acuerdo al final?'],
    duration: '~65 seg', accent: 'Alemán conversacional', wpm: 92,
  },
  {
    id: 3, title: 'Eine Reise planen (Planear un viaje)',
    desc: 'Dos amigos planean un viaje a Austria usando Konjunktiv II y vocabulario de viajes B1.',
    script: '"Ich würde gerne diesen Sommer verreisen. Hast du Lust? — Auf jeden Fall! Ich hatte an Österreich gedacht. Was meinst du? — Tolle Idee! Wenn wir jetzt buchen würden, wären die Flüge günstiger. — Ich würde Wien und Salzburg besuchen wollen. Welche Unterkunft würdest du bevorzugen? — Ich würde lieber in einem Apartment wohnen als im Hotel. Es wäre günstiger und authentischer. — Einverstanden. Wir müssten anfangen zu sparen. Wie viele Tage planst du? — Ich denke, zehn Tage würden reichen. Wir könnten fünf Tage in Wien und fünf in Salzburg verbringen. — Perfekt. Wenn wir im August fahren würden, wäre das Wetter ideal. — Dann ist es entschieden! Ich buche die Flüge diese Woche."',
    questions: ['¿A qué país quieren viajar?', '¿Por qué conviene reservar ya?', '¿Qué tipo de alojamiento prefieren?', '¿Cuántos días en total?', '¿Cuándo quieren ir?', '¿Quién reservará los vuelos?'],
    duration: '~65 seg', accent: 'Alemán informal estándar', wpm: 90,
  },
];

export default function EscuchaAlemanB1() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/aleman/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇩🇪 Alemán B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 Escucha</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Hörverstehen · Alemán B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escucha B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          3 diálogos B1 en preparación. Los audios se grabarán con hablantes nativos alemanes. <strong style={{ color: 'var(--ink)' }}>Los scripts y preguntas ya están listos.</strong>
        </p>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `rgba(3,105,161,0.08)`, border: `1px solid rgba(3,105,161,0.2)`, marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎙️ <strong style={{ color: 'var(--ink)' }}>Mientras tanto:</strong> Puedes leer los scripts en voz alta para practicar la pronunciación, o pedirle a David que los lea en clase. Los diálogos incluyen Konjunktiv II, Passiv y vocabulario B1 esencial.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {PLANNED.map(ex => (
            <div key={ex.id} style={{ border: `1.5px solid rgba(3,105,161,0.2)`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', background: `rgba(3,105,161,0.04)` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🎧</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, color: 'var(--ink)' }}>Dialog {ex.id}: {ex.title}</span>
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
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Skript (Text für die Aufnahme)</div>
                <p style={{ margin: '0 0 0.85rem', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.65, fontStyle: 'italic', borderLeft: `3px solid rgba(3,105,161,0.3)`, paddingLeft: '0.75rem' }}>
                  {ex.script}
                <TTSPlayer text={ex.script} lang="de-DE" label="Dialog anhören" />
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
          <strong style={{ color: 'var(--ink)' }}>¿Quieres practicar escucha en alemán ahora?</strong> Practica con los textos de{' '}
          <Link href="/practica/aleman/b1/lectura" style={{ color: COLOR, fontWeight: 700 }}>Lectura B1</Link>{' '}
          o trabaja las frases de{' '}
          <Link href="/practica/aleman/b1/habla" style={{ color: COLOR, fontWeight: 700 }}>Expresión oral B1</Link>{' '}
          que ya están disponibles.
        </div>
      </div>
    </section>
  );
}
