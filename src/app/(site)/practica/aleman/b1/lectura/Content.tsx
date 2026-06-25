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
    title: 'Homeoffice in Deutschland',
    subtitle: 'Chancen und Herausforderungen der modernen Arbeitswelt',
    topic: 'Arbeit und Gesellschaft',
    grammar: 'Konjunktiv II + Passiv',
    text: 'Seit der Pandemie wird Homeoffice in Deutschland immer beliebter. Viele Unternehmen haben erkannt, dass produktiver gearbeitet werden kann, wenn Mitarbeiter von zu Hause aus tätig sind. Laut einer aktuellen Studie würden 65 Prozent der deutschen Arbeitnehmer gerne dauerhaft im Homeoffice bleiben, wenn es ihnen erlaubt würde. Gleichzeitig berichten viele Arbeitnehmer von Herausforderungen: Die Grenze zwischen Arbeit und Freizeit verschwimmt, und das soziale Miteinander im Büro wird vermisst. Experten sind der Meinung, dass ein hybrides Modell — also eine Kombination aus Büro und Homeoffice — am sinnvollsten wäre. Dabei würden wichtige Meetings persönlich stattfinden, während Routineaufgaben bequem von zu Hause aus erledigt werden könnten.',
    vocab: {
      'Pandemie': 'pandemia',
      'Unternehmen': 'empresa',
      'Arbeitnehmer': 'trabajador / empleado',
      'dauerhaft': 'permanentemente',
      'verschwimmt': 'se difumina / se desdibuja',
      'vermisst': 'se echa de menos',
      'hybrides Modell': 'modelo híbrido',
      'Routineaufgaben': 'tareas rutinarias',
      'erledigt': 'realizadas / completadas',
      'Miteinander': 'convivencia / compañerismo',
    },
    preQ: '¿Prefieres trabajar desde casa o en la oficina? ¿Cuáles son las ventajas y desventajas?',
    preA: 'El texto usa el Passiv (wird gearbeitet, wird vermisst, könnten erledigt werden) y el Konjunktiv II (würden bleiben, würde erlaubt, wäre sinnvoll) para expresar condiciones hipotéticas y situaciones generales.',
    mcqs: [
      { q: 'Wann begann der Trend zum Homeoffice in Deutschland?', opts: ['Vor 10 Jahren', 'Seit der Pandemie', 'Seit letztem Jahr', 'Im 21. Jahrhundert'], answer: 1, label: 'comprensión' },
      { q: 'Was würden 65% der deutschen Arbeitnehmer bevorzugen?', opts: ['Mehr Urlaub', 'Ein höheres Gehalt', 'Dauerhaft im Homeoffice bleiben', 'Flexiblere Arbeitszeiten'], answer: 2, label: 'comprensión' },
      { q: 'Welches Passivkonstruktion erscheint im Text?', opts: ['Das Homeoffice macht produktiv', 'Produktiver gearbeitet werden kann', 'Man arbeitet produktiver', 'Die Arbeit ist produktiver geworden'], answer: 1, label: 'gramática' },
      { q: 'Was wird laut Text im Homeoffice vermisst?', opts: ['Die Ausrüstung', 'Der Chef', 'Das soziale Miteinander im Büro', 'Die Meetings'], answer: 2, label: 'comprensión' },
      { q: 'Was empfehlen Experten als beste Lösung?', opts: ['Vollständiges Homeoffice', 'Vollständige Büroarbeit', 'Ein hybrides Modell', 'Kürzere Arbeitszeiten'], answer: 2, label: 'comprensión' },
      { q: 'Welcher Konjunktiv II erscheint im letzten Satz?', opts: ['würde stattfinden / könnten', 'wären / würden', 'müssten / könnten', 'hätten / würden'], answer: 0, label: 'gramática' },
    ],
    openQs: [
      { q: '¿Cuál es la diferencia entre "würden ... bleiben" y "blieben" en el texto? ¿Por qué se usa Konjunktiv II?', tip: 'Konjunktiv II expresa condición hipotética: "si se les permitiera" — algo que aún no es real.' },
      { q: '¿Cómo reformularías "produktiver gearbeitet werden kann" en voz activa?', tip: 'Voz activa: "Man kann produktiver arbeiten" — el sujeto activo vuelve a ser "man".' },
    ],
    production: 'Schreibe 4–5 Sätze auf Deutsch: Beschreibe deine ideale Arbeitssituation. Benutze Konjunktiv II (würde, wäre, könnte) und mindestens eine Passivkonstruktion.',
  },
  {
    id: 2,
    title: 'Klimaschutz in Europa',
    subtitle: 'Maßnahmen und Herausforderungen auf dem Weg zur Klimaneutralität',
    topic: 'Umwelt und Politik',
    grammar: 'Passiv Präsens + Konjunktiv II',
    text: 'Europa hat sich ehrgeizige Klimaziele gesetzt: Bis 2050 soll die EU klimaneutral sein. Dafür werden verschiedene Maßnahmen ergriffen. Erneuerbare Energien werden stark gefördert, und der Ausbau von Windkraft- und Solaranlagen wird beschleunigt. Gleichzeitig wird der CO2-Ausstoß von Industrie und Verkehr durch neue Gesetze begrenzt. Viele Bürger unterstützen diese Maßnahmen, obwohl sie im Alltag spürbar sind — zum Beispiel durch höhere Energiepreise. Kritiker argumentieren, dass wirtschaftliche Schäden vermieden werden könnten, wenn die Umstellung langsamer vollzogen würde. Befürworter hingegen betonen, dass ohne entschlossenes Handeln noch größere wirtschaftliche Schäden entstehen würden.',
    vocab: {
      'ehrgeizige': 'ambiciosas',
      'Klimaziele': 'objetivos climáticos',
      'klimaneutral': 'climáticamente neutro',
      'Maßnahmen': 'medidas',
      'ergriffen': 'tomadas',
      'Ausbau': 'expansión / desarrollo',
      'Windkraftanlagen': 'parques eólicos',
      'CO2-Ausstoß': 'emisiones de CO2',
      'begrenzt': 'limitadas',
      'entschlossenes Handeln': 'acción decidida',
      'Befürworter': 'partidarios',
    },
    preQ: '¿Qué medidas climáticas conoces? ¿Crees que son suficientes?',
    preA: 'El texto combina Passiv (werden gefördert, wird beschleunigt, werden ergriffen) con Konjunktiv II en frases condicionales (könnten vermieden werden, würde vollzogen, würden entstehen).',
    mcqs: [
      { q: 'Was ist das Klimaziel der EU bis 2050?', opts: ['50% weniger CO2', 'Klimaneutralität', 'Mehr erneuerbare Energien', 'Weniger Autos'], answer: 1, label: 'comprensión' },
      { q: 'Was wird laut Text gefördert?', opts: ['Kohlekraftwerke', 'Erdgas', 'Erneuerbare Energien', 'Die Autoindustrie'], answer: 2, label: 'comprensión' },
      { q: 'Welche Passivform erscheint im zweiten Absatz?', opts: ['wird gefördert', 'fördert man', 'wurde gefördert', 'hat man gefördert'], answer: 0, label: 'gramática' },
      { q: 'Was sagen die Kritiker laut Text?', opts: ['Die Klimaziele sind zu niedrig', 'Die Umstellung sollte langsamer sein', 'Die EU tut zu wenig', 'Bürger sollten mehr zahlen'], answer: 1, label: 'comprensión' },
      { q: 'Was betonen die Befürworter?', opts: ['Klimaschutz ist zu teuer', 'Ohne Handeln entstehen größere Schäden', 'Erneuerbare Energien sind günstig', 'Die EU-Ziele sind zu ehrgeizig'], answer: 1, label: 'comprensión' },
      { q: 'Welcher Konjunktiv II drückt eine Bedingung aus?', opts: ['soll sein', 'werden begrenzt', 'könnten vermieden werden', 'haben gesetzt'], answer: 2, label: 'gramática' },
    ],
    openQs: [
      { q: '¿Cuántas construcciones de Passiv puedes identificar en el texto? Escríbelas.', tip: 'Busca: werden + Partizip II (z.B. werden ergriffen, wird gefördert, wird beschleunigt, wird begrenzt...).' },
      { q: '¿Qué expresa "wenn die Umstellung langsamer vollzogen würde"? ¿Es real o hipotético?', tip: 'Konjunktiv II = hipotético. La condición aún no se cumple — los críticos especulan sobre lo que podría pasar.' },
    ],
    production: 'Schreibe 4–5 Sätze über eine Umweltmaßnahme, die du für wichtig hältst. Benutze Passiv (wird ... gemacht/gefördert/begrenzt) und erkläre, was passieren würde, wenn diese Maßnahme nicht ergriffen wird.',
  },
  {
    id: 3,
    title: 'Deutsche Küche weltweit',
    subtitle: 'Wie traditionelle Gerichte internationale Bekanntheit erlangten',
    topic: 'Kultur und Essen',
    grammar: 'Relativsätze + Passiv',
    text: 'Die deutsche Küche, die früher international wenig bekannt war, erlebt heute eine Renaissance. Gerichte wie Schnitzel, Sauerkraut und Bratwurst, die ursprünglich als einfache Hausmannskost galten, werden weltweit in Restaurants serviert. Besonders die Berliner Dönerkebab-Variante, die von türkischen Einwanderern entwickelt wurde, ist inzwischen in vielen Ländern beliebt. Auch deutsches Bier, das in über 150 Länder exportiert wird, genießt internationales Ansehen. Interessanterweise werden in Deutschland selbst immer mehr internationale Gerichte gegessen: Sushi, Pasta und Curry gehören heute zum deutschen Alltag. Diese kulinarische Öffnung zeigt, dass Esskultur nie statisch ist — sie wird ständig von Menschen geprägt, die ihre Traditionen mitbringen.',
    vocab: {
      'Renaissance': 'renacimiento / resurgimiento',
      'Hausmannskost': 'comida casera simple',
      'serviert': 'servidos',
      'Einwanderer': 'inmigrantes',
      'genießt': 'goza de / disfruta de',
      'Ansehen': 'prestigio / reconocimiento',
      'kulinarische Öffnung': 'apertura culinaria',
      'statisch': 'estática',
      'geprägt': 'moldeada / marcada',
      'Traditionen': 'tradiciones',
    },
    preQ: '¿Conoces algún plato alemán? ¿Qué comida de tu país ha tenido éxito en otros lugares?',
    preA: 'El texto combina Relativsätze (die früher international wenig bekannt war, die ursprünglich als einfache Hausmannskost galten, das in über 150 Länder exportiert wird) con Passiv (werden serviert, wurde entwickelt, wird exportiert, wird geprägt).',
    mcqs: [
      { q: 'Wie gilt die deutsche Küche heute im Vergleich zur Vergangenheit?', opts: ['Schlechter bekannt', 'Genauso bekannt', 'Sie erlebt eine Renaissance', 'Weniger beliebt'], answer: 2, label: 'comprensión' },
      { q: 'Wer hat die Berliner Dönerkebab-Variante entwickelt?', opts: ['Deutsche Köche', 'Türkische Einwanderer', 'Berliner Restaurants', 'Internationale Touristen'], answer: 1, label: 'comprensión' },
      { q: 'In welchen Relativsatz steht das Relativpronomen im Dativ?', opts: ["'die früher international wenig bekannt war'", "'die von türkischen Einwanderern entwickelt wurde'", "'das in über 150 Länder exportiert wird'", "'die ursprünglich als einfache Hausmannskost galten'"], answer: 2, label: 'gramática' },
      { q: 'Was wird laut Text in über 150 Länder exportiert?', opts: ['Bratwurst', 'Sauerkraut', 'Deutsches Bier', 'Schnitzel'], answer: 2, label: 'comprensión' },
      { q: 'Was essen Deutsche heute neben traditionellen Gerichten?', opts: ['Nur traditionelle Küche', 'Sushi, Pasta und Curry', 'Nur französische Gerichte', 'Mehr Vegetarisches'], answer: 1, label: 'comprensión' },
      { q: 'Was zeigt die kulinarische Öffnung laut Text?', opts: ['Deutsche Küche ist besser', 'Essen ist immer traditionell', 'Esskultur ist nie statisch', 'Internationale Gerichte sind gesünder'], answer: 2, label: 'comprensión' },
    ],
    openQs: [
      { q: '¿Cuántos Relativsätze puedes identificar? Escribe el pronombre relativo y explica su caso (Nominativ/Akkusativ/Dativ).', tip: '"die früher bekannt war" = Nominativ (sie = Küche, Subjekt). "die galten" = Nominativ Plural. "die entwickelt wurde" = Nominativ (Passiv, Subjekt). "das exportiert wird" = Nominativ (Passiv, Subjekt).' },
      { q: '¿Por qué se usa Passiv en "von türkischen Einwanderern entwickelt wurde"? ¿Qué efecto tiene?', tip: 'Passiv destaca que el kebab fue desarrollado (sin enfatizar quién exactamente). "von + Dativ" indica el agente cuando es relevante.' },
    ],
    production: 'Beschreibe in 4–5 Sätzen ein Gericht aus deinem Land, das du magst. Benutze einen Relativsatz (Das Gericht, das/das/die...) und eine Passivkonstruktion (Es wird ... zubereitet/gegessen/serviert).',
  },
  {
    id: 4,
    title: 'Vorteile des Sprachenlernens',
    subtitle: 'Was Wissenschaft und Praxis über Mehrsprachigkeit sagen',
    topic: 'Bildung und Sprachen',
    grammar: 'Passiv + Konjunktiv II + Relativsätze',
    text: 'Das Erlernen einer Fremdsprache wird von Wissenschaftlern als äußerst vorteilhaft beschrieben. Studien zeigen, dass das Gehirn, das regelmäßig in mehreren Sprachen trainiert wird, länger jung und flexibel bleibt. Mehrsprachige Menschen, die zwischen Sprachen wechseln können, entwickeln eine bessere Konzentrationsfähigkeit. Darüber hinaus wird argumentiert, dass der Erwerb einer neuen Sprache die Empathie fördert, weil man lernt, die Welt durch eine andere kulturelle Linse zu sehen. Wenn mehr Menschen Fremdsprachen lernen würden, könnten interkulturelle Missverständnisse reduziert werden. Experten betonen, dass je früher mit dem Sprachenlernen begonnen wird, desto besser die Ergebnisse sein werden. Auch im Beruf werden mehrsprachige Kandidaten oft bevorzugt eingestellt.',
    vocab: {
      'äußerst': 'sumamente / extremadamente',
      'vorteilhaft': 'ventajoso / beneficioso',
      'Gehirn': 'cerebro',
      'regelmäßig': 'regularmente',
      'Konzentrationsfähigkeit': 'capacidad de concentración',
      'Empathie': 'empatía',
      'fördert': 'fomenta / promueve',
      'Linse': 'lente / perspectiva',
      'interkulturell': 'intercultural',
      'Missverständnisse': 'malentendidos',
      'bevorzugt': 'preferentemente',
    },
    preQ: '¿Cuántos idiomas hablas? ¿Qué ventajas has notado al aprender otro idioma?',
    preA: 'El texto combina tres estructuras B1: Passiv (wird beschrieben, wird trainiert, wird argumentiert, werden bevorzugt eingestellt), Konjunktiv II (würden lernen, könnten reduziert werden) y Relativsätze (das regelmäßig trainiert wird, die zwischen Sprachen wechseln können).',
    mcqs: [
      { q: 'Wie beschreiben Wissenschaftler das Sprachenlernen?', opts: ['Als schwierig und zeitaufwendig', 'Als äußerst vorteilhaft', 'Als unnötig für den Beruf', 'Als genetisch bestimmt'], answer: 1, label: 'comprensión' },
      { q: 'Was entwickeln mehrsprachige Menschen laut Text?', opts: ['Mehr Kreativität', 'Bessere Konzentrationsfähigkeit', 'Höhere Intelligenz', 'Mehr Geduld'], answer: 1, label: 'comprensión' },
      { q: 'Welche Passivform mit Konjunktiv II erscheint im Text?', opts: ['wird beschrieben', 'könnten reduziert werden', 'werden eingestellt', 'wird argumentiert'], answer: 1, label: 'gramática' },
      { q: 'Was fördert das Erlernen einer Sprache laut Experten?', opts: ['Höheres Gehalt', 'Besseres Gedächtnis', 'Empathie durch kulturelle Perspektive', 'Schnelleres Lesen'], answer: 2, label: 'comprensión' },
      { q: 'Was sagen Experten über den besten Zeitpunkt?', opts: ['Im Erwachsenenalter ist es am besten', 'Je früher, desto besser', 'Im Schulalter ist es zu spät', 'Das Alter spielt keine Rolle'], answer: 1, label: 'comprensión' },
      { q: 'Welchen Relativsatz enthält ein Passiv-Relativpronomen?', opts: ["'die zwischen Sprachen wechseln können'", "'das regelmäßig trainiert wird'", "'die die Welt sehen'", "'die Empathie fördert'"], answer: 1, label: 'gramática' },
    ],
    openQs: [
      { q: '¿Cómo explicarías la diferencia entre "wird trainiert" (Passiv Präsens) y "wird beschrieben" (Passiv Präsens) en términos de estructura?', tip: 'Ambos = werden + Partizip II. "Trainiert" de "trainieren" (regelmäßig); "beschrieben" de "beschreiben" (unregelm.).' },
      { q: 'El texto dice "könnten interkulturelle Missverständnisse reduziert werden". ¿Cuántas capas gramaticales hay en esta construcción?', tip: 'könnten = Konjunktiv II (pueden/podrían); reduziert werden = Passiv Infinitiv. Juntos: Konjunktiv II + Passiv Infinitiv.' },
    ],
    production: 'Schreibe 4–5 Sätze über die Vorteile des Deutschlernens für dich persönlich. Benutze eine Passivkonstruktion und einen Relativsatz.',
  },
  {
    id: 5,
    title: 'Die Stadt der Zukunft',
    subtitle: 'Wie könnten unsere Städte im Jahr 2050 aussehen?',
    topic: 'Zukunft und Technologie',
    grammar: 'Konjunktiv II + Passiv',
    text: 'Wie würde eine Stadt der Zukunft aussehen? Experten sind sich einig, dass viele Veränderungen notwendig wären. Autos, die mit fossilen Brennstoffen betrieben werden, würden durch elektrische Fahrzeuge und öffentliche Verkehrsmittel ersetzt. Parks und Grünflächen würden ausgebaut, damit das Stadtklima verbessert werden kann. Gebäude würden nicht mehr aus herkömmlichen Materialien gebaut, sondern aus nachhaltigen und energieeffizienten Stoffen. Energie würde ausschließlich durch erneuerbare Quellen erzeugt. Wenn Städte so umgebaut würden, könnte die Lebensqualität der Stadtbewohner erheblich verbessert werden. Allerdings wäre dafür eine massive Investition nötig, die von Regierungen, Unternehmen und Bürgern gemeinsam getragen werden müsste.',
    vocab: {
      'fossile Brennstoffe': 'combustibles fósiles',
      'betrieben': 'impulsados / alimentados',
      'ersetzt': 'reemplazados',
      'Grünflächen': 'zonas verdes',
      'herkömmlichen': 'convencionales / tradicionales',
      'nachhaltigen': 'sostenibles',
      'energieeffizienten': 'energéticamente eficientes',
      'ausschließlich': 'exclusivamente',
      'erneuerbare Quellen': 'fuentes renovables',
      'erheblich': 'considerablemente',
      'Investition': 'inversión',
    },
    preQ: '¿Cómo imaginas la ciudad del futuro? ¿Qué cambiaría en tu ciudad si tuvieras poder para cambiarla?',
    preA: 'Este texto está dominado por el Konjunktiv II (würde aussehen, würden ersetzt, wäre nötig, müsste getragen werden) combinado con construcciones de Passiv (verbessert werden kann, umgebaut würden, erzeugt werden). Es el ejemplo perfecto de texto hipotético B1.',
    mcqs: [
      { q: 'Wodurch würden fossile Autos in der Zukunftsstadt ersetzt?', opts: ['Durch Fahrräder', 'Durch Elektrofahrzeuge und öffentliche Verkehrsmittel', 'Durch Fußgängerzonen', 'Durch autonome Drohnen'], answer: 1, label: 'comprensión' },
      { q: 'Wozu würden Parks und Grünflächen ausgebaut?', opts: ['Für Touristen', 'Zur Verbesserung des Stadtklimas', 'Für Sportereignisse', 'Für landwirtschaftliche Nutzung'], answer: 1, label: 'comprensión' },
      { q: 'Welcher Konjunktiv II + Passiv erscheint im Text?', opts: ['würden ersetzt', 'wäre ersetzt', 'werden ersetzt', 'wurden ersetzt'], answer: 0, label: 'gramática' },
      { q: 'Aus welchen Materialien würden Gebäude gebaut?', opts: ['Herkömmlichen Materialien', 'Nur Holz', 'Nachhaltigen und energieeffizienten Stoffen', 'Recyceltem Plastik'], answer: 2, label: 'comprensión' },
      { q: 'Was wäre für den Umbau der Städte nötig?', opts: ['Nur Regierungsmaßnahmen', 'Eine massive gemeinsame Investition', 'Neue Technologien', 'Internationales Abkommen'], answer: 1, label: 'comprensión' },
      { q: 'Was könnte verbessert werden, wenn Städte umgebaut würden?', opts: ['Das Wirtschaftswachstum', 'Die Lebensqualität der Stadtbewohner', 'Die Schulen', 'Die Staatsfinanzen'], answer: 1, label: 'comprensión' },
    ],
    openQs: [
      { q: '¿Cuántos Konjunktiv II encuentras en el texto? Escríbelos con el verbo base.', tip: 'Busca: würde aussehen (aussehen), wären (sein), würden ersetzt (ersetzen/Passiv), würden ausgebaut (ausbauen/Passiv), würden gebaut (bauen/Passiv), würde erzeugt (erzeugen), wäre nötig (sein), müsste getragen (müssen/Passiv).' },
      { q: '¿Cómo cambiaría el significado de "würden durch elektrische Fahrzeuge ersetzt" si lo pusieras en Passiv Präsens sin Konjunktiv?', tip: 'Con Passiv Präsens (sin Konj. II): "werden durch elektrische Fahrzeuge ersetzt" = Se reemplazan ahora, es realidad. Con Konjunktiv II = hipotético futuro.' },
    ],
    production: 'Schreibe 4–5 Sätze darüber, wie deine Stadt oder dein Land in 50 Jahren aussehen würde, wenn du Bürgermeister wärst. Benutze Konjunktiv II und mindestens eine Passivkonstruktion.',
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
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.82rem', padding: 0 }}>📖 Lesen B1</button>
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
            <span style={{ fontSize: '0.68rem', padding: '0.18rem 0.55rem', borderRadius: 6, background: 'rgba(124,58,237,0.1)', color: '#7c3aed', fontFamily: 'var(--mono)', fontWeight: 700 }}>Grammatik: {data.grammar}</span>
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
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Produktion — Schreib auf Deutsch</div>
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

export default function LecturaAlemanB1() {
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
          <Link href="/practica/aleman/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇩🇪 Deutsch B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 Lesen</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Lesen · Deutsch B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Leseverstehen B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>5 textos auténticos B1 (120-150 palabras) con vocabulario interactivo, 6 preguntas por texto y tarea de producción.</p>
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
                    <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: 5, background: 'rgba(124,58,237,0.1)', color: '#7c3aed', fontFamily: 'var(--mono)', fontWeight: 700 }}>{t.grammar}</span>
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
