'use client';

import QuestEngine from '@/components/practica/QuestEngine';
import type { QuestLevel, QuestGuide } from '@/components/practica/QuestEngine';

const guide: QuestGuide = {
  title: 'Gramática Alemán A2 — Guía de referencia',
  body: 'Los 5 temas clave del A2: Perfekt (pasado hablado), Dativ (objeto indirecto), Modalverben en Präteritum (konnte/musste/durfte), verbos separables (aufstehen, anrufen) y Komparativ/Superlativ (größer als / am größten).\nProgresión desde A1: en A1 usabas Präsens y artículos básicos. En A2 narras eventos pasados con el Perfekt y comprendes los 3 casos principales: Nominativ, Akkusativ y Dativ.',
  tip: 'Regla de oro para el Perfekt: ¿el verbo tiene objeto acusativo? → HABEN. ¿Es de movimiento o cambio de estado? → SEIN. Excepciones: bleiben, sein, werden → siempre SEIN. Para Modalverben en pasado: usa Präteritum (konnte), nunca el Perfekt (hat gekonnt).',
  tableHead: ['Tema', 'Forma clave', 'Ejemplo'],
  tableRows: [
    ['Perfekt', 'haben/sein + Partizip II', 'Ich bin gegangen · Er hat gesehen'],
    ['Dativ', 'dem / der / einem / einer', 'mit dem Zug · Ich helfe dem Kind'],
    ['Modal Prät.', 'konnte · musste · durfte · wollte', 'Als Kind durfte ich nicht...'],
    ['Trennb. Verben', 'Präfix ans Ende im Hauptsatz', 'Ich stehe um 7 auf · Er ruft an'],
    ['Komp./Superl.', 'Adj.+-er+als · am...sten', 'Berlin ist größer · am liebsten'],
  ],
};

const levels: QuestLevel[] = [
  {
    type: 'choice',
    icon: '⏰',
    title: 'Das Perfekt — haben vs. sein',
    desc: 'Perfekt = Hilfsverb (haben/sein) + Partizip II. Bewegungsverben y Zustandsveränderung → sein. Verben con objeto acusativo → haben. Excepciones: bleiben/sein/werden → siempre sein. Partizip II regular: ge- + Stamm + -(e)t (gemacht). Irregular: ge- + Stamm + -en (gegangen, gesehen).',
    items: [
      { text: 'Wir ___ heute Morgen sehr früh aufgewacht.', opts: ['sind', 'haben', 'seid', 'habt'], ans: 'sind', hint: "'Aufwachen' = Zustandsveränderung → SEIN. 'Wir SIND aufgewacht.'" },
      { text: 'Er ___ gestern einen alten Freund getroffen.', opts: ['hat', 'ist', 'hatte', 'war'], ans: 'hat', hint: "'Treffen' hat Akkusativobjekt (einen Freund) → HABEN. 'Er HAT getroffen.'" },
      { text: 'Sie ___ letzten Sommer nach Berlin gefahren.', opts: ['ist', 'hat', 'seid', 'habt'], ans: 'ist', hint: "'Fahren' = Bewegungsverb → SEIN. 'Sie IST gefahren.'" },
      { text: 'Ich ___ gestern Abend einen guten Film gesehen.', opts: ['habe', 'bin', 'hatte', 'war'], ans: 'habe', hint: "'Sehen' hat Akkusativobjekt (einen Film) → HABEN. 'Ich HABE gesehen.'" },
      { text: 'Die Kinder ___ den ganzen Tag im Park geblieben.', opts: ['sind', 'haben', 'waren', 'hatten'], ans: 'sind', hint: "'Bleiben' → SEIN (Ausnahme!). 'Die Kinder SIND geblieben.'" },
      { text: 'Bilde das Perfekt — Er geht heute ins Fitnessstudio. (gestern)', opts: ['Er ist gestern ins Fitnessstudio gegangen.', 'Er hat gestern ins Fitnessstudio gegangen.', 'Er ist gestern ins Fitnessstudio gegangt.', 'Er geht gestern ins Fitnessstudio.'], ans: 'Er ist gestern ins Fitnessstudio gegangen.', hint: 'gehen = Bewegungsverb → SEIN + gegangen (irreg. Partizip II).' },
      { text: 'Verneinung im Perfekt — Sie hat die Hausaufgaben gemacht.', opts: ['Sie hat die Hausaufgaben nicht gemacht.', 'Sie ist die Hausaufgaben nicht gemacht.', 'Sie hat nicht die Hausaufgaben gemacht.', 'Sie hat die Hausaufgaben kein gemacht.'], ans: 'Sie hat die Hausaufgaben nicht gemacht.', hint: 'Verneinung im Perfekt: haben/sein + nicht + Partizip II am Satzende.' },
      { text: 'W-Frage im Perfekt — Du bist nach München gefahren. (Wohin?)', opts: ['Wohin bist du gefahren?', 'Wohin hast du gefahren?', 'Wohin du bist gefahren?', 'Wohin bist du gefahrt?'], ans: 'Wohin bist du gefahren?', hint: 'W-Frage: W-Wort + Hilfsverb + Subjekt + ... + Partizip II. fahren → sein.' },
      { text: 'Fehler finden: "Ich habe gestern nach Hause gegangen." — Was ist falsch?', opts: ["'habe' muss 'bin' sein (gehen → sein)", "'gegangen' muss 'gegangt' sein", "'gestern' muss am Ende stehen", 'Kein Fehler'], ans: "'habe' muss 'bin' sein (gehen → sein)", hint: "Gehen = Bewegungsverb → SEIN. Richtig: 'Ich BIN gestern nach Hause gegangen.'" },
      { text: 'Fehler finden: "Wir haben letztes Jahr in München geblieben." — Was ist falsch?', opts: ["'haben' muss 'sind' sein (bleiben → sein)", "'geblieben' muss 'gebliebt' sein", "'letztes Jahr' ist falsch positioniert", 'Kein Fehler'], ans: "'haben' muss 'sind' sein (bleiben → sein)", hint: "Bleiben → SEIN (Ausnahme!). Richtig: 'Wir SIND letztes Jahr in München geblieben.'" },
    ],
  },
  {
    type: 'choice',
    icon: '🔗',
    title: 'Der Dativ — Kasus und Präpositionen',
    desc: 'Dativ = objeto indirecto (¿a quién?). Preposiciones que siempre rigen Dativ: aus, bei, mit, nach, seit, von, zu, gegenüber. Dativartikel: der/das → dem; die → der; Plural → den. Pronombres Dativ: mir/dir/ihm/ihr/uns/euch/ihnen.',
    items: [
      { text: 'Ich schenke ___ Mutter Blumen zum Geburtstag.', opts: ['meiner', 'meine', 'meinem', 'meines'], ans: 'meiner', hint: "Schenken + Dativ (¿a quién?). Mutter = feminin → Dativ = 'der/meiner'. 'MEINER Mutter.'" },
      { text: 'Er fährt mit ___ Fahrrad zur Arbeit.', opts: ['dem', 'den', 'der', 'des'], ans: 'dem', hint: "'Mit' = Dativpräposition. Fahrrad = Neutrum → Dativ = DEM." },
      { text: 'Sie wohnt bei ___ Freundin.', opts: ['ihrer', 'ihren', 'ihrem', 'ihre'], ans: 'ihrer', hint: "'Bei' = Dativpräposition. Freundin = Feminin → Dativ = der/ihrer." },
      { text: 'Ich helfe ___ alten Mann.', opts: ['dem', 'den', 'der', 'des'], ans: 'dem', hint: "'Helfen' verlangt Dativ (¿a quién?). Mann = Maskulin → Dativ = DEM." },
      { text: 'Seit ___ Wochen lerne ich Deutsch.', opts: ['drei', 'dreier', 'drem', 'dreien'], ans: 'drei', hint: "'Seit' = Dativpräposition. Con numerales sin artículo, la cifra no cambia: 'seit DREI Wochen'." },
      { text: "Dativpronomen einsetzen — Ich gebe dem Kind ein Spielzeug.", opts: ['Ich gebe ihm ein Spielzeug.', 'Ich gebe es ein Spielzeug.', 'Ich gebe ihn ein Spielzeug.', 'Ich gebe der ein Spielzeug.'], ans: 'Ich gebe ihm ein Spielzeug.', hint: 'Kind = Neutrum → Dativ = ihm. Pronombre Dativ maskulin/neutrum.' },
      { text: "Dativpräposition 'zu' — Ich fahre. Ziel: der Arzt.", opts: ['Ich fahre zum Arzt.', 'Ich fahre zu den Arzt.', 'Ich fahre zu der Arzt.', 'Ich fahre dem Arzt.'], ans: 'Ich fahre zum Arzt.', hint: "'Zu' + Dativ. Arzt = Maskulin → zu + dem = ZUM. 'Ich fahre ZUM Arzt.'" },
      { text: 'Dativartikel wählen — Ich spreche mit ___ Lehrerin. (die Lehrerin)', opts: ['der', 'die', 'den', 'dem'], ans: 'der', hint: "'Mit' = Dativpräposition. Lehrerin = Feminin → Dativartikel = DER." },
      { text: 'Fehler finden: "Ich gebe den Kind ein Buch." — Was ist falsch?', opts: ["'den' muss 'dem' sein (Kind = Neutrum, Dativ = dem)", "'den' muss 'die' sein", "'ein Buch' muss 'einen Buch' sein", 'Kein Fehler'], ans: "'den' muss 'dem' sein (Kind = Neutrum, Dativ = dem)", hint: "Kind = Neutrum → Dativ = DEM. Richtig: 'Ich gebe DEM Kind ein Buch.'" },
      { text: 'Fehler finden: "Er wohnt bei seiner Bruder." — Was ist falsch?', opts: ["'seiner' muss 'seinem' sein (Bruder = Maskulin, Dativ = -em)", "'bei' muss 'mit' sein", "'wohnt' muss 'lebt' sein", 'Kein Fehler'], ans: "'seiner' muss 'seinem' sein (Bruder = Maskulin, Dativ = -em)", hint: "Bruder = Maskulin → Dativ Possessivpronomen = SEINEM. Richtig: 'bei SEINEM Bruder.'" },
    ],
  },
  {
    type: 'choice',
    icon: '🎯',
    title: 'Modalverben im Präteritum',
    desc: 'Modalverben usan Präteritum (no Perfekt) en el habla: konnte (können), musste (müssen), durfte (dürfen), wollte (wollen), sollte (sollen), mochte (mögen). Formación: raíz sin Umlaut + -te/-test/-te/-ten/-tet/-ten.',
    items: [
      { text: 'Als Kind ___ ich nicht so spät aufbleiben.', opts: ['durfte', 'darf', 'dürfte', 'durfte nicht'], ans: 'durfte', hint: "'Dürfen' → Präteritum = 'durfte'. 'Als Kind' = Vergangenheit. 'Ich DURFTE nicht aufbleiben.'" },
      { text: 'Gestern ___ er nicht zur Arbeit kommen — er war krank.', opts: ['konnte', 'kann', 'könnte', 'hat gekonnt'], ans: 'konnte', hint: "'Können' → Präteritum = 'konnte'. 'Er KONNTE nicht kommen.'" },
      { text: 'Sie ___ letztes Jahr unbedingt nach Japan reisen.', opts: ['wollte', 'will', 'würde', 'hat gewollt'], ans: 'wollte', hint: "'Wollen' → Präteritum = 'wollte'. 'Letztes Jahr' = Vergangenheit." },
      { text: 'Wir ___ den ganzen Abend warten — das Konzert fing erst um 22 Uhr an.', opts: ['mussten', 'müssen', 'sollten', 'haben gemusst'], ans: 'mussten', hint: "'Müssen' → Präteritum = musste; wir = mussten. 'Wir MUSSTEN warten.'" },
      { text: 'Er ___ früher kein Gemüse — jetzt isst er es jeden Tag.', opts: ['mochte', 'mag', 'möchte', 'hat gemocht'], ans: 'mochte', hint: "'Mögen' → Präteritum = 'mochte'. 'Früher MOCHTE er kein Gemüse.'" },
      { text: 'Präteritum bilden — Ich kann nicht schlafen. (gestern Nacht)', opts: ['Gestern Nacht konnte ich nicht schlafen.', 'Gestern Nacht habe ich nicht schlafen gekonnt.', 'Gestern Nacht kann ich nicht schlafen.', 'Gestern Nacht könnte ich nicht schlafen.'], ans: 'Gestern Nacht konnte ich nicht schlafen.', hint: 'können → konnte (Präteritum). El Präteritum es más natural que el Perfekt con Modalverben.' },
      { text: 'Verneinung — Er durfte das Zimmer verlassen.', opts: ['Er durfte das Zimmer nicht verlassen.', 'Er darf das Zimmer nicht verlassen.', 'Er hat das Zimmer nicht verlassen dürfen.', 'Er durfte kein Zimmer verlassen.'], ans: 'Er durfte das Zimmer nicht verlassen.', hint: 'Verneinung: Modalverb im Präteritum + nicht + Infinitiv am Ende.' },
      { text: 'W-Frage bilden — Du musstest früh aufstehen. (Warum?)', opts: ['Warum musstest du früh aufstehen?', 'Warum musste du früh aufstehen?', 'Warum du musstest früh aufstehen?', 'Warum hast du früh aufstehen gemusst?'], ans: 'Warum musstest du früh aufstehen?', hint: 'W-Frage + Modalverb im Prät.: W-Wort + Modalverb + Subjekt + ... + Infinitiv.' },
      { text: 'Fehler finden: "Gestern konnte er nicht kommen können." — Was ist falsch?', opts: ["'kommen können' ist falsch — nur 'kommen' (kein Doppelinfintiv im Präteritum)", "'konnte' muss 'könnte' sein", "'gestern' muss am Ende stehen", 'Kein Fehler'], ans: "'kommen können' ist falsch — nur 'kommen' (kein Doppelinfintiv im Präteritum)", hint: "Im Präteritum: Modalverb + Infinitiv (kein Doppelinfintiv). Richtig: 'konnte er nicht kommen.'" },
      { text: 'Fehler finden: "Als ich jung war, ich wollte Pilot werden." — Was ist falsch?', opts: ["Wortstellung: 'wollte' muss vor 'ich' kommen (Verb an 2. Position)", "'wollte' muss 'wollte gern' sein", "'jung' muss 'junger' sein", 'Kein Fehler'], ans: "Wortstellung: 'wollte' muss vor 'ich' kommen (Verb an 2. Position)", hint: "El subordinado temporal ocupa la posición 1 → el verbo (wollte) va antes que el sujeto (ich). Richtig: '...WOLLTE ich Pilot werden.'" },
    ],
  },
  {
    type: 'choice',
    icon: '✂️',
    title: 'Trennbare Verben im Satz',
    desc: 'Verbos separables: prefijo + verbo. En Hauptsatz (oración principal): ¡prefijo al final! En Nebensatz: van unidos al final. Prefijos comunes: ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-. Perfekt: Präfix + ge- + Stamm (aufgestanden, angerufen).',
    items: [
      { text: 'Ich ___ jeden Morgen um 6 Uhr ___. (aufstehen)', opts: ['stehe / auf', 'aufstehe / —', 'stehe / aufstehe', 'bin / aufgestanden'], ans: 'stehe / auf', hint: "Trennbares Verb im Präsens: konjugiertes Verb an Pos. 2 + Präfix ans Ende. 'Ich STEHE ... AUF.'" },
      { text: 'Er ___ seine Mutter jeden Abend ___. (anrufen)', opts: ['ruft / an', 'anruft / —', 'rufft / an', 'hat / angerufen'], ans: 'ruft / an', hint: "'Anrufen' trennbar. 'Er RUFT ... AN.' (Präfix 'an' ans Ende)." },
      { text: 'Wir ___ alle unsere Freunde zur Party ___. (einladen)', opts: ['laden / ein', 'einladen / —', 'läden / ein', 'haben / eingeladen'], ans: 'laden / ein', hint: "'Einladen' trennbar. 'Wir LADEN ... EIN.' (Umlaut nur im Singular: du lädst)." },
      { text: 'Der Film ___ um 20 Uhr ___. (anfangen)', opts: ['fängt / an', 'anfängt / —', 'fängt / anfangen', 'hat / angefangen'], ans: 'fängt / an', hint: "'Anfangen' trennbar. 3. Person Sing. (Umlaut a→ä): 'Der Film FÄNGT ... AN.'" },
      { text: 'Ich ___ morgen mit dem Deutschkurs ___. (aufhören)', opts: ['höre / auf', 'aufhöre / —', 'höre auf / —', 'habe / aufgehört'], ans: 'höre / auf', hint: "'Aufhören' trennbar. 'Ich HÖRE ... AUF.'" },
      { text: "Nebensatz bilden (dass) — Sie steht früh auf. Ich weiß es.", opts: ['Ich weiß, dass sie früh aufsteht.', 'Ich weiß, dass sie aufsteht früh.', 'Ich weiß, dass sie steht früh auf.', 'Ich weiß, sie steht früh auf.'], ans: 'Ich weiß, dass sie früh aufsteht.', hint: "Nebensatz: Verb (con prefijo, juntos) al final. 'dass sie früh AUFsteht.'" },
      { text: 'Perfekt bilden — Sie ruft ihren Freund an. (gestern)', opts: ['Gestern hat sie ihren Freund angerufen.', 'Gestern ist sie ihren Freund angerufen.', 'Gestern hat sie ihren Freund angeruft.', 'Gestern hat sie ihren Freund aufgerufen.'], ans: 'Gestern hat sie ihren Freund angerufen.', hint: 'Perfekt trennb. Verb: Präfix + ge- + Stamm. anrufen → angerufen.' },
      { text: 'Verb trennen — Du (mitkommen) morgen?', opts: ['Kommst du morgen mit?', 'Du kommst morgen mit?', 'Mitkommst du morgen?', 'Du mitkommst morgen?'], ans: 'Kommst du morgen mit?', hint: "Pregunta sin W-Wort: Verb an Pos. 1. 'KOMMST du morgen MIT?'" },
      { text: 'Fehler finden: "Ich aufstehe jeden Morgen um 7 Uhr." — Was ist falsch?', opts: ["'aufstehe' muss getrennt werden: 'stehe ... auf'", "'aufstehe' muss 'aufstand' sein", "'um 7 Uhr' muss am Anfang stehen", 'Kein Fehler'], ans: "'aufstehe' muss getrennt werden: 'stehe ... auf'", hint: "Richtig: 'Ich STEHE jeden Morgen um 7 Uhr AUF.'" },
      { text: 'Fehler finden: "Ich weiß, dass er ruft mich nicht an." — Was ist falsch?', opts: ["Wortstellung im Nebensatz: Verb ans Ende — 'dass er mich nicht anruft'", "'weiß' muss 'wüsste' sein", "'nicht' muss vor 'mich' stehen", 'Kein Fehler'], ans: "Wortstellung im Nebensatz: Verb ans Ende — 'dass er mich nicht anruft'", hint: "Nebensatz: todo el verbo (Präfix + Stamm) al final. Richtig: '...mich nicht ANRUFT.'" },
    ],
  },
  {
    type: 'choice',
    icon: '⚖️',
    title: 'Komparativ und Superlativ',
    desc: 'Komparativ: Adjektiv + -er + als. Superlativ predicativo: am + Adj. + -sten. Superlativ atributivo: der/die/das + Adj. + -ste. Irregulares: gut→besser→am besten; viel→mehr→am meisten; gern→lieber→am liebsten. Muchos monosílabos toman Umlaut: groß→größer, alt→älter.',
    items: [
      { text: 'München ist ___ Berlin, aber kleiner als Hamburg.', opts: ['kleiner als', 'kleiner wie', 'am kleinsten als', 'kleiner von'], ans: 'kleiner als', hint: "Komparativ: Adjektiv + -er + ALS (nunca 'wie'). 'München ist KLEINER ALS Berlin.'" },
      { text: 'Von allen meinen Kursen mag ich Deutsch ___.', opts: ['am liebsten', 'lieber', 'das liebste', 'am besten'], ans: 'am liebsten', hint: "Superlativ adverbial de 'gern' → 'am liebsten'. 'Von allen... am LIEBSTEN.'" },
      { text: 'Dieses Hotel ist ___ als das letzte — und es kostet auch mehr.', opts: ['besser', 'mehr gut', 'am besten', 'gut'], ans: 'besser', hint: "Komparativ de 'gut' = BESSER (irregular). 'BESSER als' = Komparativ." },
      { text: 'Der Eiffelturm ist ___ Bauwerk Frankreichs.', opts: ['das bekannteste', 'am bekanntesten', 'bekannteste', 'bekannter'], ans: 'das bekannteste', hint: "Superlativ atributivo: DAS + Adj. + -ste. Neutrum, Nominativ → 'das bekannteste'." },
      { text: 'Je ___ ich übe, desto ___ spreche ich.', opts: ['mehr / besser', 'viel / gut', 'am meisten / am besten', 'mehr / gut'], ans: 'mehr / besser', hint: "Construcción 'je...desto' = je + Komparativ + desto + Komparativ. 'Je MEHR... desto BESSER.'" },
      { text: 'Komparativ bilden — Ein Elefant ist schwer. Eine Maus ist leicht.', opts: ['Ein Elefant ist schwerer als eine Maus.', 'Ein Elefant ist mehr schwer als eine Maus.', 'Ein Elefant ist schwerer wie eine Maus.', 'Ein Elefant ist am schwersten.'], ans: 'Ein Elefant ist schwerer als eine Maus.', hint: "Komparativ: schwer → schwerer. Siempre 'ALS' (no 'wie'). 'SCHWERER ALS eine Maus.'" },
      { text: 'Superlativ bilden — Das Matterhorn (höchster Berg der Schweiz)', opts: ['Das Matterhorn ist der höchste Berg der Schweiz.', 'Das Matterhorn ist am höchsten Berg der Schweiz.', 'Das Matterhorn ist höchste Berg der Schweiz.', 'Das Matterhorn ist am höchsten von der Schweiz.'], ans: 'Das Matterhorn ist der höchste Berg der Schweiz.', hint: "Superlativ atributivo: DER höchste Berg. Maskulin Nominativ → '-ste'." },
      { text: 'Richtiger Komparativ — Ich trinke gern Kaffee, aber Tee trinke ich noch ___.', opts: ['lieber', 'mehr gern', 'am liebsten', 'lieber als'], ans: 'lieber', hint: "Komparativ de 'gern' = LIEBER. 'Ich trinke Tee noch LIEBER (als Kaffee).'" },
      { text: 'Fehler finden: "Berlin ist mehr groß als München." — Was ist falsch?', opts: ["'mehr groß' muss 'größer' sein (Komparativ durch Endung, nicht 'mehr')", "'als' muss 'wie' sein", "'ist' muss 'ist größer' sein", 'Kein Fehler'], ans: "'mehr groß' muss 'größer' sein (Komparativ durch Endung, nicht 'mehr')", hint: "En alemán el Komparativ SIEMPRE se forma con la terminación (-er). Richtig: 'Berlin ist GRÖSSER als München.'" },
      { text: 'Fehler finden: "Dieser Wein schmeckt am gut." — Was ist falsch?', opts: ["'am gut' muss 'am besten' sein (Superlativ von gut = am besten)", "'Wein' muss 'Weins' sein", "'schmeckt' muss 'schmecke' sein", 'Kein Fehler'], ans: "'am gut' muss 'am besten' sein (Superlativ von gut = am besten)", hint: "Superlativ de 'gut' = AM BESTEN (irregular). Richtig: 'Dieser Wein schmeckt AM BESTEN.'" },
    ],
  },
  {
    type: 'sprint',
    icon: '⚡',
    title: 'Sprint — alle Themen!',
    desc: 'Mix de los 5 temas A2. Schreibe ohne zu zögern.',
    inputWidth: 80,
    items: [
      { text: 'Wir ___ früh aufgewacht. (Perfekt, aufwachen)', ans: 'sind', hint: 'aufwachen → sein (Zustandsveränderung)' },
      { text: 'Ich ___ einen Film gesehen. (Perfekt, sehen)', ans: 'habe', hint: 'sehen hat Akkusativobjekt → haben' },
      { text: 'Er fährt mit ___ Fahrrad. (Neutrum, Dativ)', ans: 'dem', hint: 'mit + Neutrum → dem' },
      { text: 'Ich helfe ___ Kind. (Neutrum, Dativ)', ans: 'dem', hint: 'helfen + Neutrum Dativ → dem' },
      { text: 'Als Kind ___ ich nicht aufbleiben. (dürfen, Prät.)', ans: 'durfte', hint: 'dürfen → durfte (Präteritum)' },
      { text: 'Sie ___ nach Japan reisen. (wollen, Prät.)', ans: 'wollte', hint: 'wollen → wollte (Präteritum)' },
      { text: 'Ich stehe jeden Morgen um 6 Uhr ___. (aufstehen)', ans: 'auf', hint: 'aufstehen: Präfix ans Satzende → auf' },
      { text: 'Der Film fängt um 20 Uhr ___. (anfangen)', ans: 'an', hint: 'anfangen: Präfix ans Satzende → an' },
      { text: 'Berlin ist ___ als München. (groß, Komparativ)', ans: 'größer', hint: 'groß → größer (Umlaut)' },
      { text: 'Ich mag Deutsch am ___. (gern, Superlativ)', ans: 'liebsten', hint: 'gern → lieber → am liebsten' },
    ],
  },
];

export default function GramaticaAlemanA2() {
  return (
    <QuestEngine
      color="#dd0000"
      flag="🇩🇪"
      storageKey="quest-de-a2-grammatik"
      guide={guide}
      levels={levels}
      backHref="/practica/aleman/a2"
      backLabel="Deutsch A2"
      title="Grammatik A2"
      subtitle="Alemán A2 — Gramática"
    />
  );
}
