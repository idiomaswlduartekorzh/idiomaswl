'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#dd0000';

type Phase = 'pre' | 'read' | 'questions' | 'done';

interface MCQ { q: string; opts: string[]; answer: number; label?: string; }
interface OpenQ { q: string; tip: string; }
interface TextData {
  id: number; title: string; subtitle: string; topic: string; grammar: string; text: string;
  vocab: Record<string, string>;
  preQ: string; preA: string;
  mcqs: MCQ[];
  openQs: OpenQ[];
  production: string;
}

const TEXTS: TextData[] = [
  {
    id: 1,
    title: 'Ein Wochenendausflug nach Dresden',
    subtitle: 'Markus und Lisa berichten über ihre Reise',
    topic: 'Reisen und Tourismus',
    grammar: 'Perfekt',
    text: 'Am letzten Wochenende sind Markus und seine Freundin Lisa nach Dresden gefahren. Sie haben den Frühzug um 7 Uhr genommen und sind gegen 10 Uhr angekommen. Am Vormittag haben sie die Semperoper und den Zwinger besichtigt. Die Architektur hat sie sehr beeindruckt. Mittags haben sie in einem gemütlichen Café in der Altstadt gegessen und eine Dresdner Eierschecke probiert — ein typisches Dessert aus Sachsen. Nachmittags sind sie am Elbufer spazieren gegangen und haben viele Fotos gemacht. Am Abend haben sie ein Konzert besucht. Es war ein wunderschöner Tag. Sie möchten bald wiederkommen.',
    vocab: {
      'Frühzug': 'tren temprano',
      'angekommen': 'llegado (Partizip II)',
      'Vormittag': 'mañana (hasta el mediodía)',
      'besichtigt': 'visitado/recorrido',
      'Architektur': 'arquitectura',
      'beeindruckt': 'impresionado',
      'Altstadt': 'casco antiguo',
      'Eierschecke': 'pastel típico de Dresde',
      'Sachsen': 'Sajonia (estado alemán)',
      'Elbufer': 'orilla del río Elba',
      'spazieren gegangen': 'paseado',
      'wunderschön': 'maravilloso',
      'wiederkommen': 'volver',
    },
    preQ: '¿Has viajado alguna vez a una ciudad que te impresionó por su arquitectura? ¿Qué visitaste?',
    preA: 'En el texto se usa el Perfekt para narrar eventos pasados: "sind gefahren", "haben genommen", "haben gegessen". Nota que los verbos de movimiento usan "sein" como auxiliar.',
    mcqs: [
      { q: 'Wie sind Markus und Lisa nach Dresden gereist?', opts: ['Mit dem Auto', 'Mit dem Frühzug um 7 Uhr', 'Mit dem Bus', 'Mit dem Flugzeug'], answer: 1, label: 'comprensión' },
      { q: 'Was haben sie am Vormittag besichtigt?', opts: ['Den Zoo und das Museum', 'Den Zwinger und den Fluss', 'Die Semperoper und den Zwinger', 'Die Kirche und die Brücke'], answer: 2, label: 'comprensión' },
      { q: 'Was ist eine Dresdner Eierschecke?', opts: ['Eine Suppe aus Sachsen', 'Ein typisches Dessert aus Sachsen', 'Ein Getränk aus der Altstadt', 'Ein bekanntes Gericht aus Bayern'], answer: 1, label: 'vocabulario' },
      { q: 'Welches Verb hat im Text SEIN als Hilfsverb?', opts: ['haben gemacht', 'haben gegessen', 'haben besichtigt', 'sind gefahren'], answer: 3, label: 'gramática' },
      { q: 'Was haben sie nachmittags gemacht?', opts: ['Ein Konzert besucht', 'In einem Café gegessen', 'Am Elbufer spaziert und Fotos gemacht', 'Die Semperoper besichtigt'], answer: 2, label: 'comprensión' },
      { q: 'Was möchten Markus und Lisa in Zukunft tun?', opts: ['Nach Hamburg fahren', 'Noch einmal nach Dresden kommen', 'In Dresden wohnen', 'Öfter ins Konzert gehen'], answer: 1, label: 'comprensión' },
    ],
    openQs: [
      { q: '¿Por qué "gefahren" usa "sein" y "gemacht" usa "haben"? Explica con la regla del texto.', tip: 'Fahren = verbo de movimiento → sein. Machen = verbo con objeto directo → haben.' },
      { q: '¿Cómo dirías "El fin de semana pasado fui al centro" en alemán? Usa el Perfekt.', tip: 'Letzte Woche... bin ich ... gefahren / gegangen.' },
    ],
    production: 'Beschreibe deinen letzten Ausflug oder Urlaub in 4–5 Sätzen auf Deutsch. Benutze das Perfekt.',
  },
  {
    id: 2,
    title: 'Ein Vorstellungsgespräch',
    subtitle: 'Lena bewirbt sich um eine Stelle',
    topic: 'Beruf und Arbeit',
    grammar: 'Perfekt + Komparativ',
    text: 'Lena hat sich letzten Montag bei einer Marketingfirma in Frankfurt vorgestellt. Das Gespräch hat zwei Stunden gedauert. Zuerst hat sie ihren Lebenslauf erklärt: Sie hat drei Jahre als Assistentin gearbeitet und danach ein Masterstudium abgeschlossen. Dann hat der Chef sie gefragt, warum sie die Stelle wechseln möchte. Lena hat geantwortet: "Ich suche eine Stelle, die interessanter und herausfordernder ist als meine aktuelle. Außerdem ist das Gehalt bei Ihrer Firma besser als bei meiner jetzigen Arbeitgeberin." Der Chef hat gelächelt. Am Ende des Gesprächs hat er gesagt: "Wir melden uns nächste Woche."',
    vocab: {
      'vorgestellt': 'presentado (reflexivo)',
      'Lebenslauf': 'currículum vitae',
      'Assistentin': 'asistente (f)',
      'abgeschlossen': 'terminado/completado',
      'Stelle': 'puesto de trabajo',
      'wechseln': 'cambiar',
      'herausfordernd': 'desafiante',
      'aktuelle': 'actual',
      'Gehalt': 'salario',
      'Arbeitgeberin': 'empleadora (f)',
      'gelächelt': 'sonreído',
      'melden uns': 'nos comunicamos',
    },
    preQ: '¿Has tenido alguna vez una entrevista de trabajo? ¿Qué preguntas te hicieron?',
    preA: 'En una entrevista de trabajo alemana se usa el Perfekt para hablar de la experiencia pasada y el Komparativ para comparar condiciones: "besser als", "interessanter als".',
    mcqs: [
      { q: 'Wo hat Lena das Gespräch geführt?', opts: ['In Berlin', 'In München', 'In Frankfurt', 'In Hamburg'], answer: 2, label: 'comprensión' },
      { q: 'Wie lange hat das Gespräch gedauert?', opts: ['Eine Stunde', 'Zwei Stunden', 'Drei Stunden', 'Eine halbe Stunde'], answer: 1, label: 'comprensión' },
      { q: 'Welche Ausbildung hat Lena?', opts: ['Nur Abitur', 'Bachelor und 2 Jahre Arbeit', 'Masterstudium + 3 Jahre Erfahrung', 'Doktortitel in Marketing'], answer: 2, label: 'comprensión' },
      { q: 'Welcher Komparativ erscheint im Text?', opts: ['am interessantesten', 'interessanter als / besser als', 'mehr interessant', 'die beste Stelle'], answer: 1, label: 'gramática' },
      { q: 'Was ist Lenas Hauptgrund für den Stellenwechsel?', opts: ['Der Chef ist netter', 'Das Büro ist größer', 'Die Stelle ist interessanter und das Gehalt besser', 'Sie mag Frankfurt lieber'], answer: 2, label: 'comprensión' },
      { q: 'Was sagt der Chef am Ende?', opts: ['Sie ist angenommen', 'Sie bekommt die Stelle nicht', 'Er ruft nächste Woche an', 'Er will ein zweites Gespräch'], answer: 2, label: 'comprensión' },
    ],
    openQs: [
      { q: '¿Cuáles son los dos comparativos que usa Lena para justificar su cambio? Escríbelos.', tip: 'Busca "als" en el discurso de Lena.' },
      { q: '¿Cómo se forma el Perfekt de "abschließen" (verbo separable)? ¿Por qué "hat" y no "ist"?', tip: 'abschließen = trennbares Verb. Partizip II: abgeschlossen. Transitivo → haben.' },
    ],
    production: 'Schreib in 4–5 Sätzen: Was hast du in deiner Arbeit oder in deinem Studium bis jetzt gemacht? Benutze das Perfekt.',
  },
  {
    id: 3,
    title: 'Zwei Freunde, zwei Meinungen',
    subtitle: 'Marco und Julia diskutieren über ihre Freizeit',
    topic: 'Meinungen und Freizeit',
    grammar: 'Komparativ + trennbare Verben',
    text: 'Marco und Julia sind seit der Schulzeit befreundet, aber sie haben sehr unterschiedliche Interessen. Marco steht am Wochenende früh auf und geht laufen. "Sport macht mich glücklicher als alles andere", sagt er. Julia schläft lieber aus und liest bis mittags. "Bücher lesen ist entspannender als Sport", antwortet sie. Abends laden sie oft Freunde ein und machen zusammen etwas. Manchmal sehen sie einen Film an oder spielen Brettspiele. Marco findet Brettspiele langweiliger als Filme. Julia ist anderer Meinung: "Brettspiele sind viel interaktiver und geselliger als Filme." Am Ende des Abends räumen sie immer zusammen auf. Obwohl sie so verschieden sind, verstehen sie sich sehr gut.',
    vocab: {
      'befreundet': 'amigos desde (hacer amistad)',
      'unterschiedlich': 'diferente',
      'laufen': 'correr',
      'glücklich': 'feliz',
      'ausschlafen': 'dormir hasta tarde',
      'entspannend': 'relajante',
      'einladen': 'invitar',
      'Brettspiele': 'juegos de mesa',
      'langweilig': 'aburrido',
      'interaktiv': 'interactivo',
      'gesellig': 'sociable/amigable',
      'aufräumen': 'ordenar/recoger',
      'obwohl': 'aunque',
      'verschieden': 'diferente',
    },
    preQ: '¿Prefieres los deportes o leer? ¿Cómo defiendes tu preferencia?',
    preA: 'El texto usa el Komparativ para comparar actividades ("glücklicher als", "entspannender als") y verbos trennbares como "aufstehen", "einladen", "anschauen", "aufräumen".',
    mcqs: [
      { q: 'Was macht Marco am Wochenende morgens?', opts: ['Er schläft aus', 'Er liest Bücher', 'Er steht früh auf und geht laufen', 'Er spielt Brettspiele'], answer: 2, label: 'comprensión' },
      { q: 'Welches trennbare Verb wird benutzt, wenn sie Freunde einladen?', opts: ['aufräumen', 'einladen', 'anschauen', 'aufstehen'], answer: 1, label: 'gramática' },
      { q: 'Was findet Julia entspannender als Sport?', opts: ['Brettspiele', 'Filme', 'Bücher lesen', 'Freunde einladen'], answer: 2, label: 'comprensión' },
      { q: 'Wer findet Brettspiele interaktiver als Filme?', opts: ['Marco', 'Julia', 'Beide', 'Keiner von beiden'], answer: 1, label: 'comprensión' },
      { q: 'Was machen sie am Ende des Abends?', opts: ['Sie gehen laufen', 'Sie schlafen aus', 'Sie räumen zusammen auf', 'Sie laden mehr Freunde ein'], answer: 2, label: 'vocabulario' },
      { q: 'Wie lange sind Marco und Julia schon befreundet?', opts: ['Seit der Universität', 'Seit der Schulzeit', 'Seit drei Jahren', 'Seit dem Beruf'], answer: 1, label: 'comprensión' },
    ],
    openQs: [
      { q: '¿Cuántos verbos trennbares puedes identificar en el texto? Escríbelos en infinitivo.', tip: 'Busca verbos con prefijo separado al final: aufstehen, ausschlafen, einladen, anschauen, aufräumen.' },
      { q: 'Marco y Julia tienen opiniones opuestas. ¿Cómo expresan cada una su argumento con Komparativ?', tip: '"Sport macht mich glücklicher als..." / "Bücher lesen ist entspannender als..."' },
    ],
    production: 'Vergleiche zwei Aktivitäten, die du magst oder nicht magst. Benutze den Komparativ (... ist ... als ...) und mindestens ein trennbares Verb.',
  },
  {
    id: 4,
    title: 'Tipps zum Deutschlernen',
    subtitle: 'Ein Sprachlehrer gibt Ratschläge',
    topic: 'Sprachenlernen',
    grammar: 'Modalverben im Präteritum + Dativ',
    text: 'Herr Weber ist seit zwanzig Jahren Deutschlehrer. Als junger Mann musste er selbst viele Fremdsprachen lernen. Er wollte Französisch und Englisch sprechen, konnte aber nicht nach Frankreich fahren. Mit Sprachkassetten und Brieffreunden übte er täglich. Später durfte er an einem Austauschprogramm teilnehmen — das hat ihm sehr geholfen. Heute gibt er seinen Schülern folgende Tipps: "Schreib täglich mit einem Muttersprachler. Sprich mit Kollegen auf Deutsch. Hör mit deinen Ohren zu — Radio, Podcasts, Filme. Geh mit deinen Freunden zu deutschsprachigen Veranstaltungen." Seiner Meinung nach ist Geduld der Schlüssel zum Erfolg. "Wer von Anfang an täglich übt, lernt viel schneller als jemand, der nur ein paarmal pro Woche lernt."',
    vocab: {
      'Fremdsprachen': 'idiomas extranjeros',
      'Sprachkassetten': 'casetes de idiomas',
      'Brieffreunden': 'amigos por correspondencia',
      'täglich': 'diariamente',
      'Austauschprogramm': 'programa de intercambio',
      'teilnehmen': 'participar',
      'Muttersprachler': 'hablante nativo',
      'Kollegen': 'colegas',
      'Veranstaltungen': 'eventos',
      'Geduld': 'paciencia',
      'Schlüssel zum Erfolg': 'clave del éxito',
      'von Anfang an': 'desde el principio',
    },
    preQ: '¿Cuándo y cómo empezaste a aprender alemán? ¿Qué método funcionó mejor para ti?',
    preA: 'El texto usa los Modalverben im Präteritum para narrar el pasado: "musste lernen", "wollte sprechen", "konnte nicht fahren", "durfte teilnehmen". También aparecen Dativkonstruktionen: "mit einem Muttersprachler", "mit Kollegen", "mit deinen Freunden".',
    mcqs: [
      { q: 'Wie lange ist Herr Weber schon Deutschlehrer?', opts: ['Seit zehn Jahren', 'Seit fünfzehn Jahren', 'Seit zwanzig Jahren', 'Seit dreißig Jahren'], answer: 2, label: 'comprensión' },
      { q: 'Welches Modalverb im Präteritum bedeutet "no podía"?', opts: ['musste nicht', 'wollte nicht', 'konnte nicht', 'durfte nicht'], answer: 2, label: 'gramática' },
      { q: 'Wie hat Herr Weber früher Fremdsprachen gelernt?', opts: ['Mit einem Lehrer und Büchern', 'Mit Sprachkassetten und Brieffreunden', 'Mit einem Austausch in England', 'Mit Filmen und Serien'], answer: 1, label: 'comprensión' },
      { q: 'Welche Dativpräposition erscheint in "Schreib mit einem Muttersprachler"?', opts: ['nach', 'bei', 'mit', 'von'], answer: 2, label: 'gramática' },
      { q: 'Was ist laut Herrn Weber der Schlüssel zum Erfolg?', opts: ['Reisen ins Ausland', 'Einen guten Lehrer haben', 'Geduld und tägliches Üben', 'Viel Grammatik lernen'], answer: 2, label: 'comprensión' },
      { q: 'Wer lernt laut Text schneller?', opts: ['Wer nur am Wochenende lernt', 'Wer täglich von Anfang an übt', 'Wer im Ausland wohnt', 'Wer einen Kurs besucht'], answer: 1, label: 'comprensión' },
    ],
    openQs: [
      { q: '¿Cuántos Modalverben im Präteritum aparecen en el texto? Escríbelos con su sujeto.', tip: 'Busca: musste, wollte, konnte, durfte — cada uno con su sujeto (er / er / er / er).' },
      { q: 'Herr Weber da 4 consejos. Escríbelos en alemán (oraciones cortas del texto).', tip: 'Schreib / Sprich / Hör / Geh — son imperativos del texto.' },
    ],
    production: 'Schreib 4–5 Sätze über eine Situation in deiner Vergangenheit, in der du etwas musstest, wolltest oder konntest. Benutze Modalverben im Präteritum.',
  },
  {
    id: 5,
    title: 'Eine Nachricht aus dem Ausland',
    subtitle: 'Sara schreibt ihrer Familie aus Wien',
    topic: 'Kommunikation',
    grammar: 'Perfekt + Präsens + trennbare Verben',
    text: 'Liebe Familie, ich schreibe euch aus Wien! Ich bin vor einer Woche hier angekommen und habe mich schon gut eingelebt. Die Stadt ist wunderschön — ich habe den Stephansdom besucht und bin mit der U-Bahn durch die Innenstadt gefahren. Gestern habe ich in einem Wiener Kaffeehaus einen Melange getrunken — das ist ein typischer österreichischer Kaffee mit Milchschaum. Ich habe auch neue Freunde kennengelernt: meine Mitbewohner kommen aus Deutschland, der Türkei und Japan. Wir kochen zusammen ab und zu. Heute Abend gehen wir aus. Das Leben hier ist entspannt und aufregend zugleich. Ich vermisse euch sehr, aber ich fühle mich wohl. Bald schreibe ich wieder!',
    vocab: {
      'Ausland': 'extranjero',
      'angekommen': 'llegado',
      'eingelebt': 'adaptado/instalado',
      'Stephansdom': 'Catedral de San Esteban',
      'Innenstadt': 'centro de la ciudad',
      'Melange': 'café con leche vienés',
      'Milchschaum': 'espuma de leche',
      'Mitbewohner': 'compañeros de piso',
      'ab und zu': 'de vez en cuando',
      'ausgehen': 'salir (de fiesta)',
      'entspannt': 'relajado',
      'aufregend': 'emocionante',
      'zugleich': 'a la vez',
      'vermissen': 'echar de menos',
      'sich wohlfühlen': 'sentirse bien',
    },
    preQ: '¿Has vivido alguna vez en otro país o ciudad? ¿Cómo fue la experiencia de adaptarte?',
    preA: 'La carta mezcla Perfekt (acciones pasadas terminadas: "habe besucht", "bin gefahren") con Präsens (situación actual: "Das Leben hier ist", "Ich vermisse"). Los verbos trennbares aparecen en varios tiempos: "eingelebt", "kennengelernt", "ausgehen".',
    mcqs: [
      { q: 'Wo ist Sara gerade?', opts: ['In Berlin', 'In München', 'In Wien', 'In Zürich'], answer: 2, label: 'comprensión' },
      { q: 'Wie lange ist sie schon dort?', opts: ['Einen Tag', 'Drei Tage', 'Eine Woche', 'Einen Monat'], answer: 2, label: 'comprensión' },
      { q: 'Was ist ein Melange?', opts: ['Ein typisches Essen aus Wien', 'Ein österreichischer Kaffee mit Milchschaum', 'Ein Bier aus Österreich', 'Ein Kuchen mit Sahne'], answer: 1, label: 'vocabulario' },
      { q: 'Welches trennbare Verb bedeutet "salir de fiesta"?', opts: ['einleben', 'kennenlernen', 'ausgehen', 'abkochen'], answer: 2, label: 'gramática' },
      { q: 'Woher kommen Saras Mitbewohner?', opts: ['Aus Frankreich, Italien und Spanien', 'Aus Deutschland, der Türkei und Japan', 'Aus Österreich, der Schweiz und Polen', 'Aus England, China und Mexiko'], answer: 1, label: 'comprensión' },
      { q: 'Wie fühlt sich Sara in Wien?', opts: ['Sehr allein und traurig', 'Gut, aber sehr müde', 'Sie vermisst die Familie, fühlt sich aber wohl', 'Sie will sofort zurückkommen'], answer: 2, label: 'comprensión' },
    ],
    openQs: [
      { q: '¿Cuántos verbos en Perfekt con "sein" encuentras en el texto? Escríbelos.', tip: 'Busca "bin ... angekommen", "bin ... gefahren" — verbos de movimiento usan sein.' },
      { q: 'Sara escribe "ab und zu kochen wir zusammen". ¿Por qué no dice "wir kochen ab und zu zusammen"? ¿Qué cambia?', tip: 'En alemán, si un elemento que no es el sujeto está al inicio de la oración, el sujeto y verbo invierten. "Ab und zu" al inicio → "kochen wir".' },
    ],
    production: 'Schreib eine kurze Nachricht (4–5 Sätze) an deine Familie oder Freunde, als ob du gerade in Deutschland bist. Benutze Perfekt und mindestens ein trennbares Verb.',
  },
];

function tokenize(text: string, vocab: Record<string, string>) {
  return text.split(/(\s+)/).map((token, i) => {
    const clean = token.replace(/[^a-zA-ZäöüÄÖÜß\-]/g, '');
    const trans = vocab[token.trim()] || vocab[clean];
    if (trans && clean) return (
      <span key={i} title={trans} style={{ borderBottom: `1.5px dashed ${COLOR}77`, cursor: 'pointer', color: COLOR, fontWeight: 600 }}
        onClick={e => { e.stopPropagation(); alert(`"${token.trim()}" = ${trans}`); }}>
        {token}
      </span>
    );
    return <span key={i}>{token}</span>;
  });
}

function TextExercise({ data, onBack }: { data: TextData; onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>('pre');
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  const [openAnswers, setOpenAnswers] = useState<Record<number, string>>({});
  const [showTips, setShowTips] = useState<Record<number, boolean>>({});
  const [prodText, setProdText] = useState('');

  const mcqScore = data.mcqs.filter((q, i) => mcqAnswers[i] === q.answer).length;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.82rem', padding: 0 }}>📖 Lesen A2</button>
        <span>/</span>
        <span style={{ color: COLOR, fontWeight: 800 }}>{data.title}</span>
      </div>

      <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {(['pre', 'read', 'questions', 'done'] as Phase[]).map((p, i) => {
          const labels = ['Activación', 'Lectura', 'Preguntas', 'Resultado'];
          const done = (['pre', 'read', 'questions', 'done'] as Phase[]).indexOf(phase) > i;
          const active = phase === p;
          return <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ padding: '0.25rem 0.65rem', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700, fontFamily: 'var(--mono)', background: active ? COLOR : done ? `${COLOR}22` : 'var(--line-soft)', color: active ? '#fff' : done ? COLOR : 'var(--muted)' }}>{labels[i]}</span>
            {i < 3 && <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>›</span>}
          </div>;
        })}
      </div>

      {phase === 'pre' && (
        <div>
          <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />Vor dem Lesen</p>
          <h2 style={{ fontSize: '1.75rem', margin: '0 0 0.5rem', fontWeight: 700 }}>{data.title}</h2>
          <p style={{ margin: '0 0 1rem', fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic' }}>{data.subtitle}</p>
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.68rem', padding: '0.18rem 0.55rem', borderRadius: 6, background: `${COLOR}12`, color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{data.topic}</span>
            <span style={{ fontSize: '0.68rem', padding: '0.18rem 0.55rem', borderRadius: 6, background: 'rgba(124,58,237,0.1)', color: 'var(--wl-on-panel-purple, #7c3aed)', fontFamily: 'var(--mono)', fontWeight: 700 }}>Grammatik: {data.grammar}</span>
          </div>
          <div style={{ padding: '1.1rem 1.3rem', borderRadius: 14, background: `${COLOR}08`, border: `1.5px solid ${COLOR}25`, marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Pregunta de activación</div>
            <p style={{ margin: '0 0 0.75rem', color: 'var(--ink)', lineHeight: 1.6, fontWeight: 600 }}>{data.preQ}</p>
            <details>
              <summary style={{ fontSize: '0.82rem', color: COLOR, cursor: 'pointer', fontWeight: 700 }}>💡 Ver orientación gramatical</summary>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.55 }}>{data.preA}</p>
            </details>
          </div>
          <button className="btn btn-sm" onClick={() => setPhase('read')} style={{ background: COLOR, borderColor: COLOR }}>Zum Text →</button>
        </div>
      )}

      {phase === 'read' && (
        <div>
          <h2 style={{ fontSize: '1.6rem', margin: '0 0 0.25rem', fontWeight: 700 }}>{data.title}</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: '0 0 0.75rem', fontStyle: 'italic' }}>{data.subtitle}</p>
          <div style={{ padding: '0.75rem 1rem', borderRadius: 10, background: `${COLOR}08`, border: `1px solid ${COLOR}22`, fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '0.85rem' }}>
            💡 Haz clic en las palabras <span style={{ color: COLOR, fontWeight: 700 }}>resaltadas</span> para ver la traducción.
          </div>
          <div style={{ padding: '1.4rem 1.5rem', borderRadius: 16, background: 'var(--bg)', border: '1.5px solid var(--line-soft)', fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '1.25rem', color: 'var(--ink)' }}>
            {tokenize(data.text, data.vocab)}
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Glosario</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {Object.entries(data.vocab).map(([w, t]) => (
                <span key={w} style={{ fontSize: '0.75rem', padding: '0.18rem 0.5rem', borderRadius: 6, background: `${COLOR}0d`, color: COLOR, border: `1px solid ${COLOR}22`, fontFamily: 'var(--mono)' }}>{w} = {t}</span>
              ))}
            </div>
          </div>
          <button className="btn btn-sm" onClick={() => setPhase('questions')} style={{ background: COLOR, borderColor: COLOR }}>Zu den Fragen →</button>
        </div>
      )}

      {phase === 'questions' && (
        <div>
          <h2 style={{ fontSize: '1.5rem', margin: '0 0 1.25rem', fontWeight: 700 }}>Verständnisfragen</h2>
          {data.mcqs.map((q, i) => (
            <div key={i} style={{ marginBottom: '1.25rem', padding: '1rem 1.25rem', borderRadius: 14, border: '1.5px solid var(--line-soft)', background: 'var(--bg)' }}>
              {q.label && <div style={{ fontSize: '0.62rem', fontWeight: 700, background: `${COLOR}15`, color: COLOR, borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)', display: 'inline-block', marginBottom: '0.4rem' }}>{q.label}</div>}
              <p style={{ margin: '0 0 0.65rem', fontWeight: 700, color: 'var(--ink)', fontSize: '0.95rem' }}>{i + 1}. {q.q}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {q.opts.map((o, j) => {
                  const sel = mcqAnswers[i] === j;
                  const ans = mcqAnswers[i] !== undefined;
                  let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', color = 'var(--ink)';
                  if (ans && j === q.answer) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
                  else if (ans && sel) { bg = 'rgba(220,38,38,0.08)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
                  return <button key={j} onClick={() => !ans && setMcqAnswers(p => ({ ...p, [i]: j }))} disabled={ans}
                    style={{ padding: '0.55rem 0.9rem', borderRadius: 9, border, background: bg, color, fontSize: '0.9rem', cursor: ans ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.15s' }}>
                    {o}
                  </button>;
                })}
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '1.25rem', marginBottom: '1.25rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontWeight: 700 }}>Offene Fragen</h3>
            {data.openQs.map((oq, i) => (
              <div key={i} style={{ marginBottom: '1rem' }}>
                <p style={{ margin: '0 0 0.45rem', fontWeight: 700, color: 'var(--ink)', fontSize: '0.92rem' }}>{i + 1}. {oq.q}</p>
                <textarea value={openAnswers[i] || ''} onChange={e => setOpenAnswers(p => ({ ...p, [i]: e.target.value }))} rows={2} placeholder="Tu respuesta..."
                  style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: 9, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.9rem', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical', lineHeight: 1.5 }} />
                <button onClick={() => setShowTips(p => ({ ...p, [i]: !p[i] }))} style={{ fontSize: '0.72rem', color: COLOR, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--mono)', padding: 0, marginTop: '0.25rem' }}>
                  {showTips[i] ? '▲ ocultar pista' : '💡 pista'}
                </button>
                {showTips[i] && <p style={{ margin: '0.3rem 0 0', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>{oq.tip}</p>}
              </div>
            ))}
          </div>
          <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.2)', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--wl-on-panel-ok, #059669)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Produktion — Schreib auf Deutsch</div>
            <p style={{ margin: '0 0 0.65rem', fontSize: '0.88rem', color: 'var(--ink)', fontWeight: 600 }}>{data.production}</p>
            <textarea value={prodText} onChange={e => setProdText(e.target.value)} rows={4} placeholder="Dein Text auf Deutsch..."
              style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: 9, border: '1.5px solid rgba(5,150,105,0.3)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.9rem', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical', lineHeight: 1.6 }} />
          </div>
          <button className="btn btn-sm" onClick={() => setPhase('done')} style={{ background: COLOR, borderColor: COLOR }}>Ergebnis ansehen →</button>
        </div>
      )}

      {phase === 'done' && (
        <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{mcqScore === data.mcqs.length ? '🏆' : mcqScore >= 4 ? '⭐' : '📖'}</div>
          <h2 style={{ margin: '0 0 0.5rem', color: COLOR }}>{mcqScore}/{data.mcqs.length} Fragen richtig</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: '0 0 1.5rem' }}>
            {mcqScore === data.mcqs.length ? 'Ausgezeichnet! Perfektes Ergebnis!' : mcqScore >= 4 ? 'Sehr gut! Lies den Text noch einmal für die restlichen Fragen.' : 'Lies den Text noch einmal — klicke auf die Wörter!'}
          </p>
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('pre'); setMcqAnswers({}); setOpenAnswers({}); setShowTips({}); setProdText(''); }} style={{ background: COLOR, borderColor: COLOR }}>Noch einmal</button>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← Andere Texte</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LecturaAlemanA2() {
  const [textId, setTextId] = useState<number | null>(null);
  const text = TEXTS.find(t => t.id === textId);

  if (text) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <TextExercise data={text} onBack={() => setTextId(null)} />
      </div>
    </section>
  );

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/aleman/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇩🇪 Deutsch A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 Lesen</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Lesen · Deutsch A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Leseverstehen A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>5 textos auténticos A2 con vocabulario interactivo, 6 preguntas por texto y tarea de producción.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TEXTS.map(t => (
            <button key={t.id} onClick={() => setTextId(t.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}05`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${COLOR}18`; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}44`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{t.id}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.15rem' }}>{t.title}</div>
                  <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: 'var(--muted)' }}>{t.subtitle} · {t.mcqs.length} Fragen</p>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: 5, background: `${COLOR}10`, color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{t.topic}</span>
                    <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: 5, background: 'rgba(124,58,237,0.1)', color: 'var(--wl-on-panel-purple, #7c3aed)', fontFamily: 'var(--mono)', fontWeight: 700 }}>{t.grammar}</span>
                  </div>
                </div>
                <span style={{ color: COLOR, fontSize: '1.1rem', fontWeight: 700, flexShrink: 0 }}>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
