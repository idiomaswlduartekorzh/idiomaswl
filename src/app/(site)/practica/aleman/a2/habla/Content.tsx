'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#d97706';

interface Phrase {
  id: number; phrase: string; phonetic: string; es: string;
  note: string; category: string; formal?: string; informal?: string;
}

const PHRASES: Phrase[] = [
  {
    id: 1, phrase: 'Meiner Meinung nach, ___.',
    phonetic: '[MY-ner MY-nung nach]',
    es: 'En mi opinión, ___.',
    note: '"Meiner Meinung nach" es una expresión fija para dar opiniones. Viene seguida del verbo y luego el resto: "Meiner Meinung nach ist Deutsch schwierig." El verbo va en posición 2 porque "Meiner Meinung nach" ocupa la posición 1.',
    category: 'Meinungen',
    formal: 'Meiner Meinung nach...',
    informal: 'Ich glaube, dass... / Ich finde, dass...',
  },
  {
    id: 2, phrase: 'Ich stimme zu / Ich stimme nicht zu.',
    phonetic: '[ich SHTIM-me tsoo]',
    es: 'Estoy de acuerdo / No estoy de acuerdo.',
    note: '"Stimmen" = estar de acuerdo / coincidir. Con "zu": separable — "zu" al final. Formal: "Ich bin damit einverstanden." [IN-fer-shtan-den]. También: "Da haben Sie Recht." (usted tiene razón, formal).',
    category: 'Meinungen',
    formal: 'Ich bin damit einverstanden.',
    informal: 'Genau! / Stimmt! / Nein, das sehe ich anders.',
  },
  {
    id: 3, phrase: 'Das ist ein guter Punkt.',
    phonetic: '[das ist yn GOO-ter POONKT]',
    es: 'Ese es un buen punto.',
    note: '"Punkt" (punto) — masculino: "ein guter Punkt" (Nominativ, Adjektivendung -er después de "ein"). Muy usado en debates y discusiones. Alternativa: "Das ist interessant." / "Darüber habe ich noch nicht nachgedacht."',
    category: 'Meinungen',
  },
  {
    id: 4, phrase: 'Könnten Sie das bitte wiederholen?',
    phonetic: '[KER-nten zee das BI-te VEE-der-ho-len]',
    es: '¿Podría repetir eso, por favor?',
    note: '"Könnten" = Konjunktiv II de können — más educado que "Können". "Sie" (formal). Informal con amigos: "Kannst du das noch mal sagen?" La "V" en "wiederholen" suena como "F": [VEE-der-ho-len].',
    category: 'Verstehen',
    formal: 'Könnten Sie das bitte wiederholen?',
    informal: 'Kannst du das nochmal sagen?',
  },
  {
    id: 5, phrase: 'Was bedeutet ___?',
    phonetic: '[vas be-DOY-tet]',
    es: '¿Qué significa ___?',
    note: '"Bedeuten" = significar. La "W" suena [v]. Alternativa: "Was heißt ___ auf Deutsch?" [vas hyst] = ¿Cómo se dice ___ en alemán? Muy útil en clase o conversaciones con nativos.',
    category: 'Verstehen',
  },
  {
    id: 6, phrase: 'Ich suche ___.',
    phonetic: '[ich ZOO-che]',
    es: 'Estoy buscando ___.',
    note: '"Suchen" = buscar. "Ich suche die Bahnhofstraße." / "Ich suche ein Hotel in der Nähe." Para pedir dirección también puedes decir: "Entschuldigung, ich suche..." — siempre amable empezar con "Entschuldigung".',
    category: 'Reisen',
  },
  {
    id: 7, phrase: 'Wie komme ich zu ___?',
    phonetic: '[vee KO-me ich tsoo]',
    es: '¿Cómo llego a ___?',
    note: '"Wie komme ich zum Bahnhof?" (zum = zu + dem, para masculino/neutro). "Wie komme ich zur Post?" (zur = zu + der, para femenino). La "W" = [v]. Respuesta típica: "Gehen Sie geradeaus." / "Biegen Sie links ab."',
    category: 'Reisen',
    formal: 'Wie komme ich zum Bahnhof, bitte?',
    informal: 'Wo ist der Bahnhof?',
  },
  {
    id: 8, phrase: 'Ist das weit von hier?',
    phonetic: '[ist das vyt fon heer]',
    es: '¿Está lejos de aquí?',
    note: '"Weit" = lejos. Respuestas: "Das ist fünf Minuten zu Fuß." [tsoo FOOS] (5 min a pie) / "Das ist mit der U-Bahn besser." (mejor en metro). "Von hier" = desde aquí — von siempre lleva Dativ.',
    category: 'Reisen',
  },
  {
    id: 9, phrase: 'Ich möchte einen Tisch reservieren.',
    phonetic: '[ich MERCH-te I-nen TISH re-zer-VEER-en]',
    es: 'Quisiera reservar una mesa.',
    note: '"Möchte" = Konjunktiv II de mögen — más educado que "will". "Einen Tisch" = Akkusativ masculino (Tisch = der). "Reservieren" es un cognado con "reservar". También: "Haben Sie noch einen Tisch frei?" (¿Tienen mesa disponible?)',
    category: 'Reisen',
    formal: 'Ich möchte einen Tisch für zwei Personen reservieren.',
    informal: 'Haben Sie noch einen Tisch frei?',
  },
  {
    id: 10, phrase: 'Wann öffnet/schließt es?',
    phonetic: '[van ERF-net / SHLEEST es]',
    es: '¿Cuándo abre/cierra?',
    note: '"Öffnen" (abrir) y "schließen" (cerrar). "Öffnet" tiene la "ö" redondeada: labios en "o", sonido en "e". "Wann hat das Geschäft geöffnet?" (¿cuándo abrió?) — usa Perfekt para preguntar sobre el pasado.',
    category: 'Reisen',
  },
  {
    id: 11, phrase: 'Ich arbeite hier seit ___.',
    phonetic: '[ich AR-by-te heer zyt]',
    es: 'Trabajo aquí desde hace ___.',
    note: '"Seit" + Dativ para duración hasta el presente (Präsens en alemán, no Perfekt como en español). "Ich arbeite hier seit drei Jahren." (Llevo 3 años trabajando aquí). "Seit" lleva siempre Dativ: seit drei Jahren, seit einem Monat.',
    category: 'Beruf',
  },
  {
    id: 12, phrase: 'Zu meinen Aufgaben gehört ___.',
    phonetic: '[tsoo MY-nen OWF-ga-ben ge-HERT]',
    es: 'Entre mis tareas está ___.',
    note: '"Aufgaben" (tareas, plural) con Dativpräposition "zu" → "meinen Aufgaben" (Dativ plural). "Gehören" = pertenecer/corresponder. Muy usado en entrevistas: "Zu meinen Aufgaben gehört die Kundenbetreuung."',
    category: 'Beruf',
  },
  {
    id: 13, phrase: 'Kann ich mit dem Manager sprechen?',
    phonetic: '[kan ich mit dem MA-na-djer SHPRE-chen]',
    es: '¿Puedo hablar con el gerente?',
    note: '"Mit dem Manager" — Dativpräposition "mit" + Datilartikel "dem" (Manager = masculino). Formal: "Könnte ich bitte mit dem Verantwortlichen sprechen?" [fer-ANT-vort-li-chen]. "Sprechen" = hablar (más formal que "reden").',
    category: 'Beruf',
    formal: 'Könnte ich bitte mit dem Verantwortlichen sprechen?',
    informal: 'Kann ich kurz mit dir/Ihnen reden?',
  },
  {
    id: 14, phrase: 'Er/Sie ist größer als ___.',
    phonetic: '[er/zee ist GRERS-ser als]',
    es: 'Él/Ella es más alto/a que ___.',
    note: '"Größer" = Komparativ de "groß" (con Umlaut). La comparación: Adjektiv + -er + als. "Er ist größer als ich." Siempre "als" en comparaciones (¡nunca "wie"!). "Wie" solo para igualdad: "Er ist genauso groß wie ich."',
    category: 'Beschreibungen',
  },
  {
    id: 15, phrase: 'Er/Sie ist der/die ___-ste Person, die ich kenne.',
    phonetic: '[er/zee ist der/dee ... ste PER-zon dee ich KE-ne]',
    es: 'Él/Ella es la persona más ___ que conozco.',
    note: 'Superlativ atributivo con artículo definido: "der/die/das + Adjektiv + -ste". "Sie ist die intelligenteste Person, die ich kenne." Cláusula relativa: "die ich kenne" — verbo al final del Nebensatz. "Kenne" de "kennen" (conocer a alguien).',
    category: 'Beschreibungen',
  },
  {
    id: 16, phrase: 'Wie sieht er/sie aus?',
    phonetic: '[vee zeet er/zee ows]',
    es: '¿Cómo es él/ella físicamente?',
    note: '"Aussehen" = verbo trennbar (separable): "sieht...aus". "Wie sieht er aus?" — el Präfix "aus" va al final. Respuesta: "Er ist groß und hat braune Haare. Er sieht freundlich aus." (tiene cara amigable). "Haare" = plural de Haar.',
    category: 'Beschreibungen',
  },
  {
    id: 17, phrase: 'Früher habe ich ___.',
    phonetic: '[FRÜ-her HA-be ich]',
    es: 'Antes yo ___.',
    note: '"Früher" = antes (adverbio temporal). Con Perfekt: "Früher habe ich oft Sport gemacht." / "Früher bin ich viel gereist." La posición de "früher" al inicio de oración causa inversión: "Früher habe ich..." (no "Früher ich habe...").',
    category: 'Gesellschaft',
  },
  {
    id: 18, phrase: 'Lange nicht gesehen!',
    phonetic: '[LANG-e nicht ge-ZEY-en]',
    es: '¡Mucho tiempo sin verte!',
    note: 'Expresión coloquial para reencontrarse con alguien. Forma completa: "Ich habe dich/Sie lange nicht gesehen!" Respuestas: "Stimmt! Wie geht es dir?" / "Ja, eine Ewigkeit!" (¡una eternidad!). Muy natural en alemán cotidiano.',
    category: 'Gesellschaft',
  },
  {
    id: 19, phrase: 'Möchten Sie sich uns anschließen?',
    phonetic: '[MERCH-ten zee sich oons AN-shlee-sen]',
    es: '¿Le gustaría unirse a nosotros?',
    note: '"Anschließen" = trennbar (separable): anschließen → schließt...an. "Sich anschließen" = unirse (reflexivo). Formal con "Sie". Informal: "Willst du mitkommen?" [VIL-st doo MIT-ko-men]. "Möchten" (Konjunktiv II) hace la invitación más educada.',
    category: 'Gesellschaft',
    formal: 'Möchten Sie sich uns anschließen?',
    informal: 'Willst du mitkommen?',
  },
  {
    id: 20, phrase: 'Ich lade ein!',
    phonetic: '[ich LA-de yn]',
    es: '¡Yo invito! / ¡La cuenta corre por mi cuenta!',
    note: '"Einladen" = trennbar: lade...ein. "Ich lade dich ein" (te invito). Para pagar en restaurante: "Das geht auf mich!" [das gayt owf mich] o "Ich schmeiße eine Runde!" (invito una ronda). Muy común entre amigos.',
    category: 'Gesellschaft',
    informal: 'Das geht auf mich! / Ich schmeiße eine Runde!',
  },
];

const CATEGORIES = ['Alle', 'Meinungen', 'Verstehen', 'Reisen', 'Beruf', 'Beschreibungen', 'Gesellschaft'];
const CAT_ES: Record<string, string> = {
  'Alle': 'Todas',
  'Meinungen': 'Opiniones',
  'Verstehen': 'Comprensión',
  'Reisen': 'Viajes',
  'Beruf': 'Trabajo',
  'Beschreibungen': 'Descripciones',
  'Gesellschaft': 'Social',
};

export default function HablaAlemanA2() {
  const [filter, setFilter] = useState('Alle');
  const [practiced, setPracticed] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(null);

  const shown = filter === 'Alle' ? PHRASES : PHRASES.filter(p => p.category === filter);
  const pct = Math.round((practiced.size / PHRASES.length) * 100);

  function mark(id: number, val: boolean) {
    setPracticed(prev => { const next = new Set(prev); if (val) next.add(id); else next.delete(id); return next; });
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/aleman/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇩🇪 Deutsch A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🗣️ Sprechen</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Sprechen · Deutsch A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Redemittel A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 0.75rem' }}>
          20 expresiones clave A2 con fonética, notas gramaticales y variantes formal/informal.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, height: 7, background: 'var(--line-soft)', borderRadius: 4 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: COLOR, borderRadius: 4, transition: 'width 0.5s' }} />
          </div>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: pct === 100 ? COLOR : 'var(--muted)', flexShrink: 0 }}>{practiced.size}/{PHRASES.length}</span>
        </div>

        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={filter === cat ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ fontSize: '0.78rem', ...(filter === cat ? { background: COLOR, borderColor: COLOR } : {}) }}>
              {CAT_ES[cat]}
            </button>
          ))}
        </div>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `${COLOR}0a`, border: `1px solid ${COLOR}22`, marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🔑 <strong style={{ color: 'var(--ink)' }}>Sie vs. du:</strong> En alemán formal (trabajo, desconocidos) siempre usa <strong style={{ color: 'var(--ink)' }}>Sie</strong> (mayúscula). Con amigos, familia y niños: <strong style={{ color: 'var(--ink)' }}>du</strong>. Cambiar de Sie a du se llama &quot;duzen&quot; — solo cuando ambas partes lo proponen.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {shown.map(p => {
            const done = practiced.has(p.id);
            const isExpanded = expanded === p.id;
            return (
              <div key={p.id} style={{ border: `1.5px solid ${done ? `${COLOR}44` : 'var(--line-soft)'}`, borderRadius: 16, background: done ? `${COLOR}06` : 'var(--bg)', overflow: 'hidden' }}>
                <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: done ? COLOR : 'var(--line-soft)', color: done ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{p.id}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.97rem', marginBottom: '0.12rem' }}>{p.phrase}</div>
                    <div style={{ fontSize: '0.78rem', color: COLOR, fontFamily: 'var(--mono)', fontStyle: 'italic', marginBottom: '0.12rem' }}>{p.phonetic}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{p.es}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    <button onClick={() => setExpanded(isExpanded ? null : p.id)}
                      style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem', borderRadius: 6, border: '1px solid var(--line-soft)', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                      {isExpanded ? '▲ nota' : '▼ nota'}
                    </button>
                    <button onClick={() => mark(p.id, !done)}
                      style={{ fontSize: '0.82rem', padding: '0.3rem 0.75rem', borderRadius: 8, border: `1.5px solid ${done ? COLOR : 'var(--line-soft)'}`, background: done ? COLOR : 'transparent', color: done ? '#fff' : 'var(--muted)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
                      {done ? '✓ Gelernt' : 'Geschafft ✓'}
                    </button>
                  </div>
                </div>
                {isExpanded && (
                  <div style={{ padding: '0.7rem 1.25rem 0.85rem 4.5rem', borderTop: '1px solid var(--line-soft)', background: `${COLOR}04` }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>Aussprache & Grammatik</div>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.55 }}>{p.note}</p>
                    {(p.formal || p.informal) && (
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                        {p.formal && <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 5, background: 'rgba(37,99,235,0.1)', color: 'var(--wl-on-panel-link, #2563eb)', fontFamily: 'var(--mono)', fontWeight: 600 }}>Formal: {p.formal}</span>}
                        {p.informal && <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 5, background: `${COLOR}12`, color: COLOR, fontFamily: 'var(--mono)', fontWeight: 600 }}>Informal: {p.informal}</span>}
                      </div>
                    )}
                    <div style={{ marginTop: '0.4rem', display: 'inline-block', fontSize: '0.68rem', padding: '0.12rem 0.45rem', borderRadius: 5, background: `${COLOR}15`, color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{p.category}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {practiced.size === PHRASES.length && (
          <div style={{ marginTop: '2rem', padding: '1.25rem 1.5rem', borderRadius: 16, background: `${COLOR}0a`, border: `2px solid ${COLOR}33`, textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>🎉</div>
            <p style={{ margin: 0, fontWeight: 800, color: COLOR, fontSize: '1.1rem' }}>Ausgezeichnet! Alle 20 Redemittel beherrscht.</p>
            <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: 'var(--muted)' }}>Jetzt in echten Gesprächen benutzen — übe mit David oder Zhanna.</p>
          </div>
        )}
      </div>
    </section>
  );
}
