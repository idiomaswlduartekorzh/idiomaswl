import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Deutsch A2 Hörverstehen — Próximamente | Idiomas WeLearn',
  description: 'Ejercicios de comprensión auditiva A2 en alemán. Diálogos A2 con scripts completos, preguntas y vocabulario.',
  alternates: { canonical: 'https://idiomaswl.com/practica/aleman/a2/escucha' },
};

const COLOR = '#0369a1';

const PLANNED = [
  {
    id: 1,
    title: 'Am Flughafen',
    desc: 'Escucha un diálogo en el aeropuerto. Identifica trámites de check-in, equipaje y puerta de embarque.',
    topic: 'Reisen und Transport',
    grammar: 'Trennbare Verben (einchecken, abfliegen, aufgeben)',
    script: `Mitarbeiterin: Guten Morgen! Darf ich bitte Ihren Reisepass und Ihre Bordkarte sehen?
Stefan: Guten Morgen. Hier, bitte.
Mitarbeiterin: Danke. Möchten Sie Ihr Gepäck aufgeben?
Stefan: Ja, ich habe einen Koffer. Er ist 22 Kilo schwer.
Mitarbeiterin: Kein Problem. Das Freigepäck beträgt 23 Kilo. Wo möchten Sie sitzen — Fenster oder Gang?
Stefan: Fenster, bitte. Und wann fliegt das Flugzeug ab?
Mitarbeiterin: Der Abflug ist um 10:45 Uhr. Bitte gehen Sie bis 10:15 Uhr zu Gate B7.
Stefan: Vielen Dank! Ist Gate B7 weit von hier?
Mitarbeiterin: Nein, nur fünf Minuten. Den Gang entlang und dann links abbiegen.
Stefan: Verstanden. Auf Wiedersehen!`,
    questions: [
      '¿Qué documentos pide la empleada al inicio?',
      '¿Cuánto pesa el equipaje de Stefan?',
      '¿Qué asiento elige Stefan?',
      '¿A qué hora sale el vuelo?',
      '¿A qué gate debe ir Stefan?',
      '¿Cuánto tiempo le tomará llegar al gate?',
    ],
    vocab: { 'aufgeben': 'facturar (equipaje)', 'Freigepäck': 'franquicia de equipaje', 'Abflug': 'salida/despegue', 'Gang': 'pasillo (en avión) / corredor', 'abbiegen': 'girar/doblar' },
    duration: '~50 seg',
    accent: 'Hochdeutsch estándar (norte de Alemania)',
    wpm: 100,
  },
  {
    id: 2,
    title: 'Ein Vorstellungsgespräch',
    desc: 'Escucha una entrevista de trabajo. Identifica experiencia, habilidades y expectativas del candidato.',
    topic: 'Beruf und Karriere',
    grammar: 'Perfekt + Komparativ + Dativpräpositionen',
    script: `Herr Braun: Guten Tag, Frau Müller. Setzen Sie sich bitte. Also — erzählen Sie mir von Ihrer bisherigen Erfahrung.
Frau Müller: Gerne. Ich habe fünf Jahre bei einer Marketingfirma in Hamburg gearbeitet. Dort habe ich Kampagnen geleitet und mit internationalen Kunden zusammengearbeitet.
Herr Braun: Sehr interessant. Warum möchten Sie die Stelle wechseln?
Frau Müller: Ich suche eine Position, die herausfordernder ist als meine aktuelle. Bei Ihrer Firma sind die Projekte globaler und das Team ist größer — das finde ich attraktiver.
Herr Braun: Gut. Können Sie mit digitalen Marketingtools arbeiten?
Frau Müller: Ja, ich habe viel Erfahrung mit verschiedenen Tools gesammelt. Ich bin auch bereit, neue Programme zu lernen.
Herr Braun: Was sind Ihre Gehaltsvorstellungen?
Frau Müller: Ich stelle mir ein Gehalt zwischen 55.000 und 60.000 Euro vor.
Herr Braun: Das klingt vernünftig. Wir melden uns bis Ende der Woche.`,
    questions: [
      '¿Cuántos años trabajó Frau Müller en su empresa anterior?',
      '¿En qué ciudad trabajaba antes?',
      '¿Cuál es la principal razón para querer cambiar de trabajo?',
      '¿Qué comparativo usa para describir la nueva empresa?',
      '¿Qué expectativa salarial tiene Frau Müller?',
      '¿Cuándo le avisarán sobre la decisión?',
    ],
    vocab: { 'bisherige Erfahrung': 'experiencia hasta ahora', 'Kampagnen': 'campañas', 'herausfordernd': 'desafiante', 'Gehaltsvorstellungen': 'expectativa salarial', 'vernünftig': 'razonable' },
    duration: '~55 seg',
    accent: 'Hochdeutsch (acento suave del sur)',
    wpm: 105,
  },
  {
    id: 3,
    title: 'Eine Reise planen',
    desc: 'Escucha a dos amigos planeando un viaje. Identifica destino, transporte, alojamiento y actividades.',
    topic: 'Freizeit und Reisen',
    grammar: 'Modalverben im Präteritum + werden (Futur) + Komparativ',
    script: `Lena: Also, wohin wollen wir dieses Jahr fahren?
Tom: Ich würde gern nach Wien fahren. Ich war noch nie dort.
Lena: Wien? Das ist eine gute Idee! Wir könnten mit dem Zug fahren — das ist entspannter als Fliegen.
Tom: Stimmt. Und der Zug ist oft günstiger als das Flugzeug. Wie lange wollen wir bleiben?
Lena: Fünf Tage? Wir werden genug Zeit haben, die Stadt zu erkunden.
Tom: Super. Wo sollen wir wohnen? Ein Hotel oder eine Ferienwohnung?
Lena: Eine Ferienwohnung ist praktischer — wir können selbst kochen und es ist billiger.
Tom: Einverstanden. Was wollen wir in Wien machen?
Lena: Wir sollten unbedingt den Stephansdom besuchen und ein Konzert im Musikverein hören. Das wäre wunderschön!
Tom: Und natürlich Kaffee trinken in einem echten Wiener Kaffeehaus!
Lena: Natürlich! Also, wann fahren wir am besten?
Tom: Im Oktober — dann ist es nicht so heiß und es gibt weniger Touristen.`,
    questions: [
      '¿A qué ciudad quieren viajar?',
      '¿Qué medio de transporte prefieren y por qué?',
      '¿Cuántos días planean quedarse?',
      '¿Qué tipo de alojamiento eligen y cuál es la razón?',
      '¿Qué actividades culturales mencionan?',
      '¿En qué mes planean ir y por qué?',
    ],
    vocab: { 'Ferienwohnung': 'apartamento vacacional', 'erkunden': 'explorar', 'unbedingt': 'sin falta / definitivamente', 'Musikverein': 'Sala de Música de Viena', 'Einverstanden': 'de acuerdo' },
    duration: '~60 seg',
    accent: 'Hochdeutsch con acento vienés suave (Tom)',
    wpm: 100,
  },
];

export default function EscuchaAlemanA2() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/aleman/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇩🇪 Deutsch A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 Hörverstehen</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Hörverstehen · Deutsch A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Hörverstehen A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          3 diálogos A2 en preparación con voces nativas. <strong style={{ color: 'var(--ink)' }}>Scripts completos, vocabulario y preguntas ya listos.</strong>
        </p>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `rgba(3,105,161,0.06)`, border: `1px solid rgba(3,105,161,0.18)`, marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎙️ <strong style={{ color: 'var(--ink)' }}>Mientras tanto:</strong> Lee los scripts en voz alta para practicar pronunciación A2. Escucha <strong style={{ color: 'var(--ink)' }}>Slow German</strong> (podcast gratuito), <strong style={{ color: 'var(--ink)' }}>DW Deutsch lernen</strong> o <strong style={{ color: 'var(--ink)' }}>Extra auf Deutsch</strong> (serie didáctica) — perfectos para A2.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {PLANNED.map(ex => (
            <div key={ex.id} style={{ border: `1.5px solid rgba(3,105,161,0.18)`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', background: `rgba(3,105,161,0.03)` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🎧</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, color: 'var(--ink)' }}>Übung {ex.id}: {ex.title}</span>
                      <span style={{ fontSize: '0.62rem', fontWeight: 700, background: 'var(--line-soft)', color: 'var(--muted)', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>PRÓXIMAMENTE</span>
                    </div>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.5 }}>{ex.desc}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {[`⏱ ${ex.duration}`, `🗣 ${ex.accent}`, `~${ex.wpm} wpm`].map(tag => (
                        <span key={tag} style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(3,105,161,0.07)', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 600 }}>{tag}</span>
                      ))}
                      <span style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(124,58,237,0.08)', color: '#7c3aed', fontFamily: 'var(--mono)', fontWeight: 600 }}>{ex.grammar}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--line-soft)' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Script</div>
                <p style={{ margin: '0 0 0.85rem', fontSize: '0.86rem', color: 'var(--ink)', lineHeight: 1.75, borderLeft: `3px solid rgba(3,105,161,0.25)`, paddingLeft: '0.75rem', whiteSpace: 'pre-line' }}>
                  {ex.script}
                </p>
                <div style={{ marginBottom: '0.85rem' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Vokabular</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {Object.entries(ex.vocab).map(([w, t]) => (
                      <span key={w} style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: `rgba(3,105,161,0.08)`, color: COLOR, border: `1px solid rgba(3,105,161,0.2)`, fontFamily: 'var(--mono)' }}>{w} = {t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Fragen zum Hörtext</div>
                {ex.questions.map((q, i) => (
                  <p key={i} style={{ margin: '0 0 0.2rem', fontSize: '0.82rem', color: 'var(--muted)' }}>{i + 1}. {q}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
