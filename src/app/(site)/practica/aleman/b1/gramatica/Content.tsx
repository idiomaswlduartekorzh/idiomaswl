'use client';
import { useState } from 'react';
import Link from 'next/link';

const C = '#7c3aed';

interface FQ { s: string; opts: string[]; a: number; fb: string; }
interface TQ { prompt: string; s: string; opts: string[]; a: number; fb: string; }
interface EQ { s: string; q: string; opts: string[]; a: number; fb: string; }
interface Topic {
  id: string; title: string; icon: string;
  rule: string; tip: string;
  table: { headers: string[]; rows: string[][] };
  b1note: string; examples: string[];
  fills: FQ[]; transforms: TQ[]; errors: EQ[]; production: string;
}

const TOPICS: Topic[] = [
  {
    id: 'konjunktiv2',
    title: 'Konjunktiv II',
    icon: '💭',
    rule: "Konjunktiv II drückt Irrealität, Wünsche, höfliche Bitten und hypothetische Situationen aus. Bildung: würde + Infinitiv (Umschreibung, am häufigsten) ODER starke Formen: wäre (sein), hätte (haben), könnte (können), müsste (müssen), dürfte (dürfen), sollte (sollen), wollte (wollen). Wenn-Satz: 'Wenn ich Zeit hätte, würde ich reisen.' — Verb-end im Nebensatz, würde im Hauptsatz.",
    tip: "Merke: 'würde + Infinitiv' funktioniert immer. Starke Formen (wäre, hätte, könnte) klingen natürlicher und eleganter. Bei sein, haben und Modalverben IMMER die starken Formen benutzen — nie 'würde sein/würde haben'. 'Wenn ich du wäre...' (nicht 'würde sein').",
    table: {
      headers: ['Verb', 'Konjunktiv II', 'Beispiel'],
      rows: [
        ['sein', 'wäre', 'Wenn ich reich wäre, ...'],
        ['haben', 'hätte', 'Wenn ich Zeit hätte, ...'],
        ['können', 'könnte', 'Ich könnte dir helfen.'],
        ['müssen', 'müsste', 'Du müsstest mehr üben.'],
        ['werden', 'würde + Inf.', 'Ich würde gerne reisen.'],
        ['gehen', 'würde gehen', 'Er würde gehen, wenn...'],
      ]
    },
    b1note: "Im A2 hast du Konjunktiv II nur für höfliche Bitten gelernt: 'Könnten Sie...? / Würden Sie...?' Im B1 erweiterst du das auf hypothetische Situationen: 'Wenn ich mehr Geld hätte, würde ich ein neues Auto kaufen.' Der wenn-Satz mit Konjunktiv II ist zentral für Diskussionen und Aufsätze.",
    examples: [
      "Wenn ich mehr Zeit hätte, würde ich täglich Deutsch üben. (Irrealer Bedingungssatz B1)",
      "An deiner Stelle würde ich den Arzt anrufen. (Ratschlag mit 'an deiner Stelle')",
      "Es wäre schön, wenn wir uns öfter sehen könnten. (Wunsch mit wäre + könnten)",
    ],
    fills: [
      { s: "Wenn ich mehr Geld ___, ___ ich eine Weltreise machen.", opts: ["hätte / würde", "habe / werde", "hatte / würde", "hätte / werde"], a: 0, fb: "Irrealer Bedingungssatz: 'Wenn'-Satz mit Konjunktiv II (hätte = Konj. II von haben) + Hauptsatz mit würde + Infinitiv. 'Wenn ich mehr Geld HÄTTE, WÜRDE ich eine Weltreise machen.'" },
      { s: "An deiner Stelle ___ ich den Chef persönlich ansprechen.", opts: ["würde", "werde", "bin", "hätte"], a: 0, fb: "'An deiner Stelle' (en tu lugar) + Konjunktiv II. 'Ich WÜRDE den Chef ansprechen.' — Ratschlag mit würde + Infinitiv." },
      { s: "Es ___ schön, wenn wir mehr Zeit zusammen hätten.", opts: ["wäre", "war", "ist", "würde"], a: 0, fb: "'Es wäre schön, wenn...' — Wunsch mit Konjunktiv II. 'wäre' = Konj. II von 'sein'. Der wenn-Satz ('hätten') ist ebenfalls Konj. II." },
      { s: "Ohne deinen Rat ___ ich diesen Fehler gemacht.", opts: ["hätte ... gemacht", "hatte ... gemacht", "würde ... machen", "habe ... gemacht"], a: 0, fb: "Irreale Vergangenheit: 'hätte + Partizip II' = Konj. II Perfekt. 'Hätte ich gemacht' = Ich hätte es getan (aber ich habe es nicht getan, weil du mir geholfen hast)." },
      { s: "Wenn du früher aufstehen ___, ___ du den Zug nicht verpassen.", opts: ["würdest / würdest", "würdest / wärdest", "wärst / würdest", "wärst / wärst"], a: 0, fb: "Aufstehen = regelmäßiges Verb → würde-Form. 'Wenn du früher aufstehen WÜRDEST, WÜRDEST du den Zug nicht verpassen.' (2 würde-Formen bei schwachen Verben — grammatisch korrekt)." },
    ],
    transforms: [
      { prompt: "Forme einen irrealen Bedingungssatz mit Konjunktiv II:", s: "Ich lerne mehr. Dann spreche ich besser Deutsch.", opts: ["Wenn ich mehr lernen würde, würde ich besser Deutsch sprechen.", "Wenn ich mehr lerne, spreche ich besser Deutsch.", "Wenn ich mehr lernte, spräche ich besser Deutsch.", "Wenn ich mehr lernen würde, spreche ich besser Deutsch."], a: 0, fb: "Irrealer Bedingungssatz: Wenn + Konj. II (würde lernen) + Hauptsatz mit Konj. II (würde sprechen). Beide Teile im Konjunktiv II." },
      { prompt: "Formuliere einen Ratschlag mit 'An deiner Stelle':", s: "Ich würde mehr schlafen. (Ratschlag an eine Person)", opts: ["An deiner Stelle würde ich mehr schlafen.", "An deiner Stelle ich würde mehr schlafen.", "An ihrer Stelle würde ich mehr schlafen.", "An deiner Stelle werde ich mehr schlafen."], a: 0, fb: "'An deiner Stelle' = Ratschlag (en tu lugar). Wortstellung: 'An deiner Stelle' + Verb (würde) + Subjekt (ich) + Rest. 'An deiner Stelle WÜRDE ich mehr schlafen.'" },
      { prompt: "Schreibe als irrealen Wunsch (Gegenwart):", s: "Ich habe kein Auto. (Ich wünschte, ich hätte eines.)", opts: ["Ich hätte gerne ein Auto.", "Ich würde gerne ein Auto haben.", "Ich hatte gerne ein Auto.", "Ich hätte gern ein Auto gehabt."], a: 0, fb: "Wunsch in der Gegenwart: 'hätte gerne' = Konj. II von haben. 'Ich HÄTTE gerne ein Auto.' (nicht 'gehabt' — das wäre Vergangenheit)." },
    ],
    errors: [
      { s: "Wenn ich mehr Geld würde haben, würde ich reisen.", q: "Was ist falsch?", opts: ["'würde haben' ist falsch — 'hätte' verwenden (haben → hätte im Konj. II)", "'reisen' muss am Ende stehen", "'mehr' muss 'viele' heißen", "Kein Fehler"], a: 0, fb: "Bei 'haben' immer die starke Konjunktiv II-Form: 'hätte' (nie 'würde haben'). Richtig: 'Wenn ich mehr Geld HÄTTE, würde ich reisen.'" },
      { s: "An deiner Stelle ich würde mehr Sport treiben.", q: "Was ist falsch?", opts: ["Wortstellung: Verb vor Subjekt — 'würde ich' (nicht 'ich würde')", "'treiben' muss 'machen' heißen", "'mehr' muss 'viel' heißen", "Kein Fehler"], a: 0, fb: "'An deiner Stelle' = Position 1 → Verb (würde) an Position 2, Subjekt (ich) danach. Richtig: 'An deiner Stelle WÜRDE ICH mehr Sport treiben.'" },
      { s: "Wenn er reicher wäre, er würde ein Haus kaufen.", q: "Was ist falsch?", opts: ["Im Hauptsatz nach 'wenn'-Satz: Verb vor Subjekt — 'würde er'", "'reicher' muss 'reich' heißen", "'wäre' muss 'würde sein' heißen", "Kein Fehler"], a: 0, fb: "Nach einem Nebensatz (wenn...) steht das finite Verb VOR dem Subjekt. Richtig: '...WÜRDE ER ein Haus kaufen.' (Inversion: Verb-Subjekt im Hauptsatz nach Nebensatz)." },
      { s: "Ich würde sein glücklicher, wenn ich mehr Freizeit hätte.", q: "Was ist falsch?", opts: ["'würde sein' muss 'wäre' sein (sein → wäre im Konj. II)", "'glücklicher' muss 'glücklich' sein", "'hätte' muss 'habe' sein", "Kein Fehler"], a: 0, fb: "Sein im Konjunktiv II = 'wäre' (NICHT 'würde sein'). Richtig: 'Ich WÄRE glücklicher, wenn ich mehr Freizeit hätte.'" },
      { s: "Wenn du mir geholfen hättest, ich hätte es geschafft.", q: "Was ist falsch?", opts: ["Wortstellung: 'hätte ich' nach dem wenn-Satz (Inversion)", "'geholfen' muss 'helfen' heißen", "'geschafft' muss 'schaffen' heißen", "Kein Fehler"], a: 0, fb: "Nach 'wenn'-Satz: Inversion im Hauptsatz. Richtig: '...HÄTTE ICH es geschafft.' (hätte vor ich, weil wenn-Satz = Position 1)." },
    ],
    production: "Schreib 3 irreale Bedingungssätze mit Konjunktiv II über dein Leben: (1) Wenn ich [mehr Zeit/Geld/...] hätte, ... (2) An [deiner/meiner/seiner] Stelle würde ich ... (3) Es wäre schön, wenn ... Jeder Satz sollte eine andere Form zeigen.",
  },
  {
    id: 'relativsaetze',
    title: 'Relativsätze',
    icon: '🔗',
    rule: "Relativsätze beschreiben ein Nomen genauer. Das Relativpronomen richtet sich nach Genus/Numerus des Bezugsnomens und nach Kasus im Relativsatz. Nominativ: der/die/das/die. Akkusativ: den/die/das/die. Dativ: dem/der/dem/denen. Genitiv (B2): dessen/deren. Der Relativsatz steht direkt nach dem Bezugsnomen. Verb am Ende des Relativsatzes.",
    tip: "Faustregel: 1) Finde das Bezugsnomen (Genus + Numerus). 2) Bestimme die Funktion im Relativsatz (Nominativ/Akkusativ/Dativ?). 3) Wähle das Relativpronomen wie der bestimmte Artikel — nur 'den' (Akk. Mask.) und 'denen' (Dat. Pl.) sind anders.",
    table: {
      headers: ['Kasus', 'Maskulin', 'Neutrum', 'Feminin', 'Plural'],
      rows: [
        ['Nominativ', 'der', 'das', 'die', 'die'],
        ['Akkusativ', 'den', 'das', 'die', 'die'],
        ['Dativ', 'dem', 'dem', 'der', 'denen'],
      ]
    },
    b1note: "Im A2 hast du einfache Relativsätze mit Nominativ geübt: 'Das ist der Mann, der Deutsch spricht.' Im B1 übst du alle Kasus: 'Der Mann, dem ich geholfen habe...' (Dativ) und 'Das Buch, das ich lese...' (Akkusativ, Neutrum). Das Genus des Relativpronomens = Genus des Bezugsnomens, der Kasus = Funktion im Relativsatz.",
    examples: [
      "Das Buch, das ich gerade lese, ist sehr spannend. (das = Neutrum, Nominativ-Subjekt des Relativsatzes)",
      "Der Mann, dem ich gestern geholfen habe, ist mein Nachbar. (dem = Maskulin, Dativ nach 'helfen')",
      "Die Studentin, die ich in der Bibliothek getroffen habe, studiert Medizin. (die = Feminin, Akkusativ-Objekt)",
    ],
    fills: [
      { s: "Das ist der Film, ___ ich letzte Woche gesehen habe.", opts: ["den", "der", "dem", "das"], a: 0, fb: "Film = Maskulin. Im Relativsatz: 'ich habe ihn gesehen' → Akkusativ. Maskulin Akkusativ = 'den'. 'Der Film, DEN ich gesehen habe...'" },
      { s: "Die Frau, ___ wir gestern geholfen haben, ist Ärztin.", opts: ["der", "die", "den", "dem"], a: 0, fb: "Frau = Feminin. 'Helfen' verlangt Dativ (wem?). Feminin Dativ = 'der'. 'Die Frau, DER wir geholfen haben...'" },
      { s: "Das Haus, ___ wir kaufen möchten, kostet sehr viel.", opts: ["das", "den", "die", "dem"], a: 0, fb: "Haus = Neutrum. Im Relativsatz: 'wir möchten es kaufen' → Akkusativ. Neutrum Akkusativ = 'das'. 'Das Haus, DAS wir kaufen möchten...'" },
      { s: "Die Kinder, ___ die Lehrerin unterrichtet, sind sehr fleißig.", opts: ["die", "der", "den", "denen"], a: 0, fb: "Kinder = Plural. 'unterrichten' = Akkusativ (wen?). Plural Akkusativ = 'die'. 'Die Kinder, DIE die Lehrerin unterrichtet...' (Plural-Akk = die, wie Nominativ)." },
      { s: "Der Kollege, ___ ich täglich zusammenarbeite, ist sehr kompetent.", opts: ["mit dem", "mit der", "mit den", "mit dem"], a: 0, fb: "Mit = Dativpräposition. Kollege = Maskulin → Dativ = 'dem'. Präposition + Relativpronomen: 'MIT DEM'. 'Der Kollege, mit dem ich zusammenarbeite...'" },
    ],
    transforms: [
      { prompt: "Verbinde die Sätze mit einem Relativsatz:", s: "Das ist das Restaurant. Wir haben dort gegessen. (Nominativ)", opts: ["Das ist das Restaurant, in dem wir gegessen haben.", "Das ist das Restaurant, das wir gegessen haben.", "Das ist das Restaurant wo wir gegessen haben.", "Das ist das Restaurant, dem wir gegessen haben."], a: 0, fb: "Restaurant + Ort → Präposition 'in' + Dativ. 'Restaurant' = Neutrum → Dativ = 'dem'. Richtig: '...Restaurant, IN DEM wir gegessen haben.' (Lokalangabe braucht 'in dem' oder 'wo')." },
      { prompt: "Schreibe als Relativsatz (Dativ):", s: "Ich habe einem Mann geholfen. Der Mann ist Lehrer.", opts: ["Der Mann, dem ich geholfen habe, ist Lehrer.", "Der Mann, den ich geholfen habe, ist Lehrer.", "Der Mann, der ich geholfen habe, ist Lehrer.", "Der Mann, dem ich helfe, ist Lehrer."], a: 0, fb: "'Helfen' = Dativ (wem?). Mann = Maskulin → Dativ = 'dem'. 'Der Mann, DEM ich geholfen habe, ist Lehrer.' (Perfekt im Relativsatz, weil die Aktion abgeschlossen ist)." },
      { prompt: "Forme einen Relativsatz (Akkusativ):", s: "Ich suche einen Job. Der Job macht Spaß und ist gut bezahlt.", opts: ["Ich suche einen Job, der Spaß macht und gut bezahlt ist.", "Ich suche einen Job, den Spaß macht und gut bezahlt ist.", "Ich suche einen Job, dem Spaß macht und gut bezahlt wird.", "Ich suche einen Job, was Spaß macht und gut bezahlt ist."], a: 0, fb: "'Job' = Maskulin. Im Relativsatz ist Job das Subjekt ('der Job macht') → Nominativ = 'der'. 'Einen Job, DER Spaß macht und gut bezahlt ist.' (war, was in der A2-Analyse falsch — Job ist Subjekt des Relativsatzes, also Nominativ 'der')." },
    ],
    errors: [
      { s: "Das ist die Frau, den ich in Paris getroffen habe.", q: "Was ist falsch?", opts: ["'den' muss 'die' sein (Frau = Feminin, Akkusativ = die)", "'getroffen' muss 'treffen' heißen", "'Paris' muss mit Artikel stehen", "Kein Fehler"], a: 0, fb: "Frau = Feminin. Akkusativ Feminin = 'die' (nicht 'den' = Maskulin-Akkusativ). Richtig: 'die Frau, DIE ich getroffen habe.'" },
      { s: "Ich mag die Menschen, denen sind immer ehrlich.", q: "Was ist falsch?", opts: ["'denen' muss 'die' sein — Nominativ Plural braucht 'die'", "'denen' ist korrekt", "'ehrlich' muss 'ehrliche' heißen", "Kein Fehler"], a: 0, fb: "'Menschen' = Plural. Im Relativsatz ist 'sie' (=Menschen) Subjekt → Nominativ Plural = 'die'. 'denen' = Dativ Plural. Richtig: '...Menschen, DIE immer ehrlich sind.'" },
      { s: "Das Buch das ich lese ist interessant.", q: "Was ist falsch?", opts: ["Komma fehlt: 'Das Buch, das ich lese, ist interessant.'", "'das' muss 'den' heißen", "'lese' muss 'gelesen' heißen", "Kein Fehler"], a: 0, fb: "Relativsatz braucht Kommas: vor und (falls vorhanden) nach dem Relativsatz. Richtig: 'Das Buch, das ich lese, ist interessant.' (Komma vor dem Relativpronomen und nach dem Relativsatz)." },
      { s: "Der Lehrer, der ich lerne, ist sehr gut.", q: "Was ist falsch?", opts: ["'der' muss 'bei dem' sein — 'bei' + Dativ für 'lernen bei'", "'Lehrer' muss 'Lehrerin' heißen", "'gut' muss 'gute' heißen", "Kein Fehler"], a: 0, fb: "'Bei einem Lehrer lernen' = Dativpräposition 'bei'. Relativpronomen: 'bei dem' (Maskulin Dativ). Richtig: 'Der Lehrer, BEI DEM ich lerne, ist sehr gut.'" },
      { s: "Die Stadt, wo ich wohne ist sehr schön.", q: "Was ist falsch?", opts: ["Komma fehlt nach 'wohne': '...wohne, ist sehr schön'", "'wo' muss 'die' heißen", "'schön' muss 'schöne' heißen", "Kein Fehler"], a: 0, fb: "Komma nach dem Relativsatz fehlt. Richtig: 'Die Stadt, wo ich wohne, ist sehr schön.' (Komma schließt den Relativsatz ab). 'Wo' statt Relativpronomen + Präposition ist umgangssprachlich akzeptabel." },
    ],
    production: "Schreib 4 Sätze mit Relativsätzen: (1) Beschreibe eine Person mit Dativ ('Der/Die ..., dem/der ich ... geholfen habe'). (2) Beschreibe ein Objekt mit Akkusativ. (3) Beschreibe einen Ort mit 'in dem / wo'. (4) Beschreibe eine Situation (Plural: '...Menschen, die...').",
  },
  {
    id: 'passiv',
    title: 'Passiv Präsens',
    icon: '🔄',
    rule: "Passiv Präsens = werden (konjugiert) + Partizip II. Betonung auf die Handlung, nicht auf den Handelnden. Das Subjekt des Aktivsatzes wird zum 'von + Dativ' im Passivsatz (optional). Das Objekt des Aktivsatzes wird Subjekt im Passivsatz. Formen: ich werde ... gemacht; du wirst ... gemacht; er/sie/es wird ... gemacht; wir/sie werden ... gemacht; ihr werdet ... gemacht.",
    tip: "Merke: Passiv = werden + Partizip II (am Satzende). 'Das Buch wird gelesen.' (von wem?) kann weggelassen werden wenn unklar/unwichtig. Typische Passivsätze: 'Hier wird Deutsch gesprochen.' / 'Das Paket wird morgen geliefert.' — oft ohne Agens (von wem).",
    table: {
      headers: ['Person', 'Aktiv (Präsens)', 'Passiv (Präsens)'],
      rows: [
        ['ich', 'Ich lese das Buch.', 'Das Buch wird (von mir) gelesen.'],
        ['du', 'Du schreibst den Brief.', 'Der Brief wird (von dir) geschrieben.'],
        ['er/sie', 'Er baut das Haus.', 'Das Haus wird (von ihm) gebaut.'],
        ['wir', 'Wir reparieren das Auto.', 'Das Auto wird (von uns) repariert.'],
        ['sie', 'Sie verkaufen die Produkte.', 'Die Produkte werden (von ihnen) verkauft.'],
      ]
    },
    b1note: "Im A2 hast du 'werden' für das Futur gelernt: 'Ich werde reisen.' Im B1 lernst du 'werden' + Partizip II für das Passiv: 'Das Auto wird repariert.' Die Struktur sieht ähnlich aus, aber der Unterschied ist: Futur = werden + Infinitiv; Passiv = werden + Partizip II (ge-...t/-en).",
    examples: [
      "In Deutschland wird viel Bier getrunken. (Passiv ohne Agens — allgemeine Aussage)",
      "Das Projekt wird gerade von unserem Team bearbeitet. (Passiv mit Agens 'von + Dativ')",
      "Die neuen Regeln werden ab nächsten Monat eingeführt. (Passiv Präsens mit Zeitangabe)",
    ],
    fills: [
      { s: "Das Paket ___ morgen ___.", opts: ["wird / geliefert", "ist / geliefert", "werde / geliefert", "wird / liefern"], a: 0, fb: "Passiv Präsens = werden + Partizip II. 'Das Paket WIRD morgen GELIEFERT.' (liefern → geliefert). 'wird' = 3. Person Singular von werden." },
      { s: "In dieser Schule ___ Englisch und Französisch ___.", opts: ["werden / unterrichtet", "wird / unterrichtet", "werden / unterrichten", "wird / unterrichten"], a: 0, fb: "Subjekt = 'Englisch und Französisch' = Plural → 'werden'. Partizip II = 'unterrichtet'. 'WERDEN unterrichtet.'" },
      { s: "Der Bericht ___ von der Sekretärin ___.", opts: ["wird / geschrieben", "ist / geschrieben", "wird / schreiben", "wirst / geschrieben"], a: 0, fb: "Passiv: werden + Partizip II. Agens mit 'von + Dativ': 'von der Sekretärin'. 'Der Bericht WIRD von der Sekretärin GESCHRIEBEN.'" },
      { s: "Die Tür ___ täglich um 18 Uhr ___.", opts: ["wird / geschlossen", "wird / schließen", "ist / geschlossen", "werde / geschlossen"], a: 0, fb: "Passiv Präsens: 'die Tür' = Singular → 'wird'. 'schließen' → Partizip II = 'geschlossen'. 'Die Tür WIRD täglich um 18 Uhr GESCHLOSSEN.'" },
      { s: "Diese Produkte ___ in vielen Ländern ___.", opts: ["werden / verkauft", "wird / verkauft", "werden / verkaufen", "werden / geverkauft"], a: 0, fb: "Produkte = Plural → 'werden'. 'verkaufen' → Partizip II = 'verkauft' (regelmäßig: ge- + stamm + -t). 'WERDEN verkauft' — kein 'ge-' im Partizip II bei untrennbaren Verben mit -ver, aber 'verkaufen' → 'verkauft' (ver- = untrennbar, kein ge-)." },
    ],
    transforms: [
      { prompt: "Forme den Aktivsatz in Passiv um:", s: "Der Mechaniker repariert das Auto.", opts: ["Das Auto wird vom Mechaniker repariert.", "Das Auto ist vom Mechaniker repariert.", "Das Auto wird den Mechaniker repariert.", "Das Auto werde vom Mechaniker repariert."], a: 0, fb: "Aktiv → Passiv: Objekt (das Auto) wird Subjekt. Subjekt (der Mechaniker) → 'vom Mechaniker' (von + Dativ: dem Mechaniker = vom). 'Das Auto WIRD vom Mechaniker REPARIERT.'" },
      { prompt: "Forme Passiv in Aktiv um:", s: "Die Straße wird gerade von der Stadt gebaut.", opts: ["Die Stadt baut gerade die Straße.", "Die Straße baut gerade die Stadt.", "Die Stadt wird gerade die Straße bauen.", "Von der Stadt baut die Straße gerade."], a: 0, fb: "Passiv → Aktiv: 'von der Stadt' wird Subjekt → 'die Stadt'. 'die Straße' (Passivsub.) wird Objekt. 'Die Stadt BAUT gerade die Straße.' (Präsens Aktiv)." },
      { prompt: "Forme in Passiv ohne Agens:", s: "Man spricht in Österreich Deutsch.", opts: ["In Österreich wird Deutsch gesprochen.", "In Österreich ist Deutsch gesprochen.", "Deutsch wird in Österreich sprechen.", "In Österreich spricht Deutsch."], a: 0, fb: "'Man' + Aktiv → Passiv ohne Agens. 'Deutsch' (Objekt) wird Subjekt. 'In Österreich WIRD Deutsch GESPROCHEN.' (sprechen → gesprochen, irreg. Partizip II)." },
    ],
    errors: [
      { s: "Das Essen wird von dem Koch kocht.", q: "Was ist falsch?", opts: ["'kocht' muss 'gekocht' sein — Passiv braucht Partizip II", "'von dem Koch' muss 'vom Koch' sein", "'Das Essen' muss am Ende stehen", "Kein Fehler"], a: 0, fb: "Passiv = werden + PARTIZIP II (nicht Infinitiv oder konjugiertes Verb). 'kochen' → Partizip II = 'gekocht'. Richtig: 'Das Essen wird vom Koch GEKOCHT.'" },
      { s: "Die Briefe wird täglich sortiert.", q: "Was ist falsch?", opts: ["'wird' muss 'werden' sein (Briefe = Plural)", "'sortiert' muss 'sortieren' sein", "'täglich' muss 'jeden Tag' heißen", "Kein Fehler"], a: 0, fb: "Passiv: werden richtet sich nach dem Subjekt. 'Die Briefe' = Plural → 'werden'. Richtig: 'Die Briefe WERDEN täglich sortiert.'" },
      { s: "Das Fenster ist von Maria geöffnet worden.", q: "Was ist falsch?", opts: ["Das ist grammatisch korrekt — Passiv Perfekt", "'geöffnet' muss 'öffnen' heißen", "'von Maria' muss ans Ende", "Kein Fehler"], a: 0, fb: "'Das Fenster ist von Maria geöffnet worden.' = RICHTIG! Das ist das Passiv Perfekt (Vorgangspassiv). 'worden' = Partizip II von 'werden' im Passivkomplex. Diese Konstruktion ist grammatisch korrekt." },
    ],
    production: "Schreib 4 Passivsätze über deinen Alltag oder deine Stadt: (1) Ein Passivsatz ohne Agens (Was wird gemacht?). (2) Ein Passivsatz mit Agens 'von + Dativ'. (3) Passiv mit Zeitangabe (täglich, morgen, gerade). (4) Passiv Plural (werden + Partizip II).",
  },
  {
    id: 'temporale_konjunktionen',
    title: 'Temporale Konjunktionen',
    icon: '⏰',
    rule: "Temporale Konjunktionen verbinden Haupt- und Nebensatz zeitlich. Wichtige B1-Konjunktionen: als (einmalig in der Vergangenheit), wenn (wiederholte Handlungen / Futur), nachdem (nachdem + Perfekt/Plusquamperfekt, Hauptsatz im Präteritum/Perfekt), bevor (bevor = antes de que), während (gleichzeitig: während = mientras), seitdem (seitdem = desde que, bis heute). Nebensatz: Verb ans Ende!",
    tip: "Als vs. wenn: 'Als ich jung war...' (einmalig, Vergangenheit). 'Wenn ich jung war/bin...' (wiederholt). 'Wenn ich groß bin, werde ich...' (Zukunft). Nachdem: Zeitversatz erfordert unterschiedliche Zeiten: 'Nachdem er gegessen hatte (Plusq.), ging er (Präteritum) schlafen.'",
    table: {
      headers: ['Konjunktion', 'Bedeutung', 'Tempus', 'Beispiel'],
      rows: [
        ['als', 'cuando (única vez, pasado)', 'Präteritum/Perfekt', 'Als ich 10 war, lernte ich Gitarre.'],
        ['wenn', 'cuando (repetido) / si (futuro)', 'Präsens/Futur', 'Wenn es regnet, bleibe ich zu Hause.'],
        ['nachdem', 'después de que', 'Perf.→Präs. / Plusq.→Prät.', 'Nachdem er gegessen hat, schläft er.'],
        ['bevor', 'antes de que', 'Präsens/Futur', 'Bevor ich schlafe, lese ich.'],
        ['während', 'mientras', 'Gleichzeitig', 'Während er schläft, arbeite ich.'],
        ['seitdem', 'desde que (hasta ahora)', 'Präsens (aktuell)', 'Seitdem ich in Berlin wohne, spreche ich besser.'],
      ]
    },
    b1note: "Im A2 hast du einfache Konjunktionen gelernt: 'weil', 'dass', 'obwohl', 'wenn'. Im B1 erweiterst du auf temporale Konjunktionen. Der wichtigste Unterschied: 'als' (nur einmalige Vergangenheit) vs. 'wenn' (Wiederholung oder Zukunft). 'Wenn ich ein Kind war' (= jedes Mal als ich jung war) vs. 'Als ich ein Kind war' (= die gesamte Zeit meiner Kindheit).",
    examples: [
      "Als ich in Spanien war, habe ich viel Spanisch gesprochen. (als = einmalig, Vergangenheit)",
      "Nachdem er die Prüfung bestanden hatte, machte er eine große Party. (nachdem + Plusquamperfekt)",
      "Bevor sie das Haus verlässt, überprüft sie immer ihren Schlüssel. (bevor = routinierte Handlung)",
    ],
    fills: [
      { s: "_____ ich klein war, wollte ich Astronaut werden.", opts: ["Als", "Wenn", "Nachdem", "Bevor"], a: 0, fb: "'Als' = einmalige Situation in der Vergangenheit. 'Als ich klein war' = die Kindheitszeit (nicht wiederholt). 'ALS ich klein war, wollte ich...' (Präteritum)." },
      { s: "_____ es regnet, nehme ich immer einen Regenschirm mit.", opts: ["Wenn", "Als", "Nachdem", "Seitdem"], a: 0, fb: "'Wenn' = wiederholte Handlung (immer wenn). 'WENN es regnet, nehme ich immer...' (regelmäßige Reaktion auf Regen — nicht einmalig)." },
      { s: "_____ er sein Studium abgeschlossen hatte, fand er sofort einen Job.", opts: ["Nachdem", "Bevor", "Als", "Seitdem"], a: 0, fb: "'Nachdem' = nach Abschluss einer Handlung. 'NACHDEM er sein Studium abgeschlossen hatte (Plusquamperfekt), fand er (Präteritum) sofort einen Job.' Zeitversatz: Plusq. → Prät." },
      { s: "_____ sie schläft, lese ich Bücher.", opts: ["Während", "Als", "Bevor", "Nachdem"], a: 0, fb: "'Während' = Gleichzeitigkeit (zwei Handlungen gleichzeitig). 'WÄHREND sie schläft, lese ich.' = beides passiert gleichzeitig jetzt oder regelmäßig." },
      { s: "_____ ich Deutsch lerne, fühle ich mich selbstsicherer.", opts: ["Seitdem", "Bevor", "Als", "Während"], a: 0, fb: "'Seitdem' = von einem Punkt in der Vergangenheit bis jetzt (andauernd). 'SEITDEM ich Deutsch lerne, fühle ich mich selbstsicherer.' = seit dem Beginn des Deutschlernens." },
    ],
    transforms: [
      { prompt: "Verbinde mit der richtigen Konjunktion:", s: "Er kommt nach Hause. Dann isst er. (nacheinander, Vergangenheit)", opts: ["Nachdem er nach Hause gekommen war, aß er.", "Als er nach Hause gekommen war, aß er.", "Bevor er nach Hause kam, aß er.", "Während er nach Hause kam, aß er."], a: 0, fb: "'Nachdem' = nach einer Handlung kommt die nächste. Zeitversatz: 'Nachdem er ... gekommen WAR (Plusquamperfekt), Aß er (Präteritum).' Zuerst nach Hause kommen, dann essen." },
      { prompt: "Forme mit 'bevor':", s: "Ich lerne die Vokabeln. Dann mache ich die Prüfung.", opts: ["Bevor ich die Prüfung mache, lerne ich die Vokabeln.", "Bevor ich die Vokabeln lerne, mache ich die Prüfung.", "Als ich die Vokabeln lernte, machte ich die Prüfung.", "Nachdem ich die Vokabeln lerne, mache ich die Prüfung."], a: 0, fb: "'Bevor' = antes de que. Zuerst: Vokabeln lernen, dann: Prüfung. 'BEVOR ich die Prüfung mache, LERNE ich die Vokabeln.' (Verb ans Ende im Bevor-Satz: 'mache')." },
      { prompt: "Wähle 'als' oder 'wenn':", s: "Ich war nervös. (nur bei meiner ersten Prüfung)", opts: ["Als ich meine erste Prüfung hatte, war ich nervös.", "Wenn ich meine erste Prüfung hatte, war ich nervös.", "Seitdem ich meine erste Prüfung hatte, war ich nervös.", "Nachdem ich meine erste Prüfung hatte, war ich nervös."], a: 0, fb: "'Als' = einmaliges Ereignis in der Vergangenheit (die erste Prüfung = nur einmal). 'ALS ich meine erste Prüfung hatte, war ich nervös.' 'Wenn' wäre für jede Prüfung (Wiederholung)." },
    ],
    errors: [
      { s: "Als es regnet, nehme ich immer einen Schirm.", q: "Was ist falsch?", opts: ["'Als' muss 'Wenn' sein — wiederholte Handlung (immer) braucht 'wenn'", "'regnet' muss 'regnete' heißen", "'nehme ich' muss 'nehme ich immer' heißen", "Kein Fehler"], a: 0, fb: "'Immer' = Wiederholung → 'wenn', nicht 'als'. 'Als' = einmaliges Ereignis. Richtig: 'WENN es regnet, nehme ich immer einen Schirm.'" },
      { s: "Nachdem er gegessen hat, er schläft.", q: "Was ist falsch?", opts: ["Wortstellung: Verb vor Subjekt — 'schläft er' (Inversion nach Nebensatz)", "'gegessen' muss 'essen' heißen", "'Nachdem' muss 'Bevor' heißen", "Kein Fehler"], a: 0, fb: "Nach einem Nebensatz (nachdem er... hat) kommt Inversion: Verb + Subjekt. Richtig: 'Nachdem er gegessen hat, SCHLÄFT ER.' (nicht 'er schläft')." },
      { s: "Bevor ich das Haus verlasse, ich überprüfe den Schlüssel.", q: "Was ist falsch?", opts: ["Wortstellung im Hauptsatz: 'überprüfe ich' (Inversion nach Nebensatz)", "'verlasse' muss am Ende stehen (es steht bereits richtig)", "'Bevor' muss 'Wenn' heißen", "Kein Fehler"], a: 0, fb: "Nach 'Bevor'-Satz (Nebensatz) kommt Inversion: Verb vor Subjekt. Richtig: '...verlasse, ÜBERPRÜFE ICH den Schlüssel.' (nicht 'ich überprüfe')." },
    ],
    production: "Schreib 4 Sätze mit verschiedenen temporalen Konjunktionen: (1) 'Als' — einmaliges Erlebnis in deiner Vergangenheit. (2) 'Wenn' — eine regelmäßige Gewohnheit. (3) 'Nachdem' — zwei aufeinanderfolgende Handlungen. (4) 'Seitdem' — eine anhaltende Situation seit einem Punkt.",
  },
  {
    id: 'indirekte_rede',
    title: 'Indirekte Rede',
    icon: '💬',
    rule: "Indirekte Rede = Wiedergabe von Gesagtem ohne direkte Zitate. Zwei Optionen: (1) Konjunktiv I (offiziell, Presse/Berichte): er sagt, dass er komme / er sagte, er komme. (2) Konjunktiv II wenn Konjunktiv I = Indikativ aussieht: sie sagen, sie hätten... Einleitungsverben: sagen, berichten, erklären, behaupten, fragen, antworten. Indirekte Frage mit 'ob' (Ja/Nein-Fragen) oder W-Wort.",
    tip: "Für B1 genügt oft: sagen + dass + Konjunktiv I ODER Konjunktiv II. 'Er sagt, dass er kommt' (Indikativ, umgangssprachlich akzeptabel) vs. 'Er sagt, dass er komme' (Konjunktiv I, formell). Indirekte Ja/Nein-Fragen: 'ob' statt ob. 'Kommst du?' → 'Er fragt, ob ich komme.'",
    table: {
      headers: ['Direkte Rede', 'Indirekte Rede (Konj. I)', 'Indirekte Rede (Konj. II)'],
      rows: [
        ['Er sagt: „Ich komme."', 'Er sagt, er komme.', 'Er sagt, er würde kommen.'],
        ['Sie sagt: „Ich habe Zeit."', 'Sie sagt, sie habe Zeit.', 'Sie sagt, sie hätte Zeit.'],
        ['Er fragt: „Kommst du?"', 'Er fragt, ob ich komme.', 'Er fragt, ob ich kommen würde.'],
        ['Sie erklärt: „Das ist falsch."', 'Sie erklärt, das sei falsch.', 'Sie erklärt, das wäre falsch.'],
        ['Er behauptet: „Ich war dort."', 'Er behauptet, er sei dort gewesen.', 'Er behauptet, er wäre dort gewesen.'],
      ]
    },
    b1note: "Im A2 hast du gelernt, Aussagen mit 'dass' zu berichten: 'Er sagt, dass er müde ist.' Im B1 lernst du die korrekte Form der indirekten Rede mit Konjunktiv I/II. Für indirekte Fragen: Ja/Nein-Fragen → 'ob'; W-Fragen → das W-Wort bleibt. Das Verb wandert ans Ende des indirekten Fragesatzes.",
    examples: [
      "Direkt: 'Ich bin krank.' → Indirekt: Er sagt, er sei krank. / Er sagt, er wäre krank. (Konj. I / Konj. II)",
      "Direkt: 'Kommst du morgen?' → Indirekt: Sie fragt, ob ich morgen komme. (ob + Verb ans Ende)",
      "Direkt: 'Warum hast du das gemacht?' → Indirekt: Er fragt, warum ich das gemacht habe. (W-Wort + ind. Fragesatz)",
    ],
    fills: [
      { s: "Er sagt, er ___ morgen nicht kommen.", opts: ["könne", "kann", "konnte", "würde können"], a: 0, fb: "Indirekte Rede mit Konjunktiv I: können → 'könne' (3. Person Singular, Konj. I). 'Er sagt, er KÖNNE morgen nicht kommen.' Im Deutschen bevorzugt man Konj. I für elegante indirekte Rede." },
      { s: "Sie fragt, ___ ich Zeit ___.", opts: ["ob / hätte", "dass / habe", "ob / habe", "wenn / hätte"], a: 0, fb: "Indirekte Ja/Nein-Frage: 'ob' + Konjunktiv. 'Hast du Zeit?' → 'Sie fragt, OB ich Zeit HÄTTE.' (Konjunktiv II von haben: hätte — weil 'habe' Konj. I = Indikativ)." },
      { s: "Der Zeuge berichtete, er ___ den Mann in der Bank ___.", opts: ["habe / gesehen", "hat / gesehen", "hätte / gesehen", "sei / gesehen"], a: 0, fb: "Indirekte Rede Perfekt: Konjunktiv I von haben = 'habe' + Partizip II. 'Er berichtete, er HABE den Mann gesehen.' (formelles Berichten)." },
      { s: "Sie erklärt, das Problem ___ sehr kompliziert.", opts: ["sei", "ist", "wäre", "sind"], a: 0, fb: "Konjunktiv I von 'sein': 3. Person Singular = 'sei'. 'Sie erklärt, das Problem SEI sehr kompliziert.' (nicht 'ist' = Indikativ)." },
      { s: "Er fragt, ___ ich ihm helfen ___.", opts: ["ob / könne", "ob / kann", "dass / könne", "wenn / kann"], a: 0, fb: "Indirekte Ja/Nein-Frage: 'ob' + Verb ans Ende. 'Er fragt, OB ich ihm helfen KÖNNE.' (Konjunktiv I von können: könne = 1./3. Person)." },
    ],
    transforms: [
      { prompt: "Forme in indirekte Rede (Konjunktiv I):", s: "Maria sagt: 'Ich lerne täglich Deutsch.'", opts: ["Maria sagt, sie lerne täglich Deutsch.", "Maria sagt, sie lernt täglich Deutsch.", "Maria sagt, dass sie täglich Deutsch lernt.", "Maria sagt, sie würde täglich Deutsch lernen."], a: 0, fb: "Indirekte Rede: Konjunktiv I. lernen → lerne (3. Person: sie lerne). 'Maria sagt, sie LERNE täglich Deutsch.' (ohne 'dass' ist auch möglich und oft eleganter)." },
      { prompt: "Forme eine indirekte Ja/Nein-Frage:", s: "Er fragt: 'Hast du das Buch gelesen?'", opts: ["Er fragt, ob ich das Buch gelesen habe.", "Er fragt, dass ich das Buch gelesen habe.", "Er fragt, ob ich das Buch gelesen hat.", "Er fragt ob ich das Buch gelesen habe."], a: 0, fb: "Indirekte Ja/Nein-Frage: 'ob' + Subjekt + ... + Verb am Ende. 'Er fragt, OB ich das Buch gelesen HABE.' (Perfekt in ind. Rede: habe = Konj. I). Komma vor 'ob'." },
      { prompt: "Forme eine indirekte W-Frage:", s: "Sie fragt: 'Warum bist du nicht gekommen?'", opts: ["Sie fragt, warum ich nicht gekommen sei.", "Sie fragt, warum bin ich nicht gekommen.", "Sie fragt, dass ich warum nicht gekommen sei.", "Sie fragt ob warum ich nicht gekommen sei."], a: 0, fb: "Indirekte W-Frage: W-Wort + Subjekt + ... + Verb am Ende. Konjunktiv I: 'sei gekommen'. 'Sie fragt, warum ich nicht gekommen SEI.' (Verb ans Ende der indirekten Frage)." },
    ],
    errors: [
      { s: "Er sagt, dass er morgen kommt.", q: "Was ist in der formellen indirekten Rede falsch?", opts: ["'kommt' muss 'komme' sein (Konjunktiv I für formelle ind. Rede)", "'morgen' muss am Ende stehen", "'dass' muss 'ob' heißen", "Kein Fehler — umgangssprachlich ist 'kommt' akzeptabel"], a: 0, fb: "In formeller indirekter Rede (Presse, Berichte) benutzt man Konjunktiv I: 'komme'. Richtig: 'Er sagt, dass er morgen KOMME.' Umgangssprachlich ist 'kommt' akzeptabel, aber im B1-Schreiben bevorzugt man Konjunktiv." },
      { s: "Sie fragt ob ich Zeit habe.", q: "Was fehlt?", opts: ["Komma vor 'ob': 'Sie fragt, ob ich Zeit habe.'", "'ob' muss 'dass' heißen", "'habe' muss 'hätte' heißen", "Kein Fehler"], a: 0, fb: "Komma vor einleitenden Konjunktionen ('ob', 'dass', 'wenn'...) in Nebensätzen ist im Deutschen obligatorisch. Richtig: 'Sie fragt, OB ich Zeit habe.' (Komma vor 'ob')." },
      { s: "Er berichtet, er ist gestern dort gewesen.", q: "Was ist in der indirekten Rede falsch?", opts: ["'ist' muss 'sei' sein (Konjunktiv I von sein = sei)", "'gestern' muss am Ende stehen", "'berichtet' muss 'berichtete' heißen", "Kein Fehler"], a: 0, fb: "Indirekte Rede Perfekt mit sein: Konjunktiv I von sein = 'sei'. 'Er berichtet, er SEI gestern dort gewesen.' (nicht 'ist' = Indikativ)." },
    ],
    production: "Schreib 4 Sätze in indirekter Rede: (1) Berichte, was eine Person gesagt hat (Konjunktiv I). (2) Formuliere eine indirekte Ja/Nein-Frage mit 'ob'. (3) Formuliere eine indirekte W-Frage. (4) Berichte in Vergangenheit (Konjunktiv I Perfekt: habe/sei + Partizip II).",
  },
];

export default function GramaticaAlemanB1() {
  const [topicIdx, setTopicIdx] = useState(0);
  const [fillAns, setFillAns] = useState<Record<number, number>>({});
  const [transAns, setTransAns] = useState<Record<number, number>>({});
  const [errAns, setErrAns] = useState<Record<number, number>>({});
  const [prodText, setProdText] = useState('');
  const [prodDone, setProdDone] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const t = TOPICS[topicIdx];

  function reset() {
    setFillAns({}); setTransAns({}); setErrAns({});
    setProdText(''); setProdDone(false); setShowResult(false);
  }

  function bs(done: boolean, ok: boolean, sel: boolean) {
    if (!done) return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--ink)' };
    if (ok) return { background: 'rgba(5,150,105,0.1)', border: '1px solid #059669', color: '#059669' };
    if (sel) return { background: 'rgba(220,38,38,0.1)', border: '1px solid #dc2626', color: '#dc2626' };
    return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--muted)' };
  }

  const allFill = t.fills.every((_, i) => fillAns[i] !== undefined);
  const allTrans = t.transforms.every((_, i) => transAns[i] !== undefined);
  const allErr = t.errors.every((_, i) => errAns[i] !== undefined);
  const allMCQ = allFill && allTrans && allErr;
  const correct = t.fills.filter((q, i) => fillAns[i] === q.a).length
    + t.transforms.filter((q, i) => transAns[i] === q.a).length
    + t.errors.filter((q, i) => errAns[i] === q.a).length;
  const total = t.fills.length + t.transforms.length + t.errors.length;

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 860 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/aleman" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇩🇪 Alemán</Link>
          <span>/</span>
          <Link href="/practica/aleman/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>B1</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>Grammatik</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.3rem' }}><span className="ink-line" />Alemán B1</p>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.4rem', color: 'var(--ink)' }}>
          Grammatik B1 — 5 wesentliche Themen
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: '0 0 2rem', lineHeight: 1.6, maxWidth: 560 }}>
          Konjunktiv II, Relativsätze, Passiv Präsens, temporale Konjunktionen und Indirekte Rede. Visuelle Tabellen + progressive Übungen.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {TOPICS.map((tp, i) => (
            <button key={tp.id} onClick={() => { setTopicIdx(i); reset(); }}
              style={{ padding: '0.45rem 0.9rem', borderRadius: 20, fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
                background: topicIdx === i ? C : 'var(--bg-2)',
                border: `1.5px solid ${topicIdx === i ? C : 'var(--line-soft)'}`,
                color: topicIdx === i ? '#fff' : 'var(--muted)' }}>
              {tp.icon} {tp.title}
            </button>
          ))}
        </div>

        <div style={{ padding: '1.25rem 1.4rem', borderRadius: 14, background: `${C}08`, border: `1.5px solid ${C}22`, marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '1.4rem' }}>{t.icon}</span>
            <h2 style={{ margin: 0, fontWeight: 800, fontSize: '1.15rem', color: 'var(--ink)' }}>{t.title}</h2>
          </div>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.7 }}>{t.rule}</p>
          <div style={{ fontSize: '0.82rem', color: C, padding: '0.4rem 0.7rem', borderRadius: 8, background: `${C}10`, border: `1px solid ${C}30`, marginBottom: '0.9rem', lineHeight: 1.6 }}>
            💡 {t.tip}
          </div>
          <div style={{ overflowX: 'auto', marginBottom: '0.85rem' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 400, fontSize: '0.84rem' }}>
              <thead>
                <tr>{t.table.headers.map((h, hi) => (
                  <th key={hi} style={{ padding: '0.4rem 0.7rem', background: `${C}15`, border: '1px solid var(--line-soft)', fontWeight: 800, color: C, textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {t.table.rows.map((row, ri) => (
                  <tr key={ri}>{row.map((cell, ci) => (
                    <td key={ci} style={{ padding: '0.4rem 0.7rem', border: '1px solid var(--line-soft)', color: 'var(--ink)', lineHeight: 1.45, background: ri % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)' }}>{cell}</td>
                  ))}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', padding: '0.5rem 0.75rem', borderRadius: 8, background: 'rgba(0,0,0,0.04)', borderLeft: '3px solid var(--muted)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
            📌 <strong style={{ color: 'var(--ink)' }}>vs A2:</strong> {t.b1note}
          </div>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Beispiele im echten Kontext</div>
          {t.examples.map((ex, ei) => (
            <p key={ei} style={{ margin: '0 0 0.3rem', fontSize: '0.84rem', color: 'var(--ink)', lineHeight: 1.6, borderLeft: '2px solid var(--line-soft)', paddingLeft: '0.6rem' }}>
              &ldquo;{ex}&rdquo;
            </p>
          ))}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>📝</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Ergänze die Lücken</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.fills.filter((_, i) => fillAns[i] !== undefined).length}/{t.fills.length}
            </span>
          </div>
          {t.fills.map((q, qi) => {
            const ans = fillAns[qi]; const done = ans !== undefined;
            const parts = q.s.split('___');
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <p style={{ margin: '0 0 0.7rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {qi + 1}.{' '}
                  {parts.map((part, pi) => (
                    <span key={pi}>{part}{pi < parts.length - 1 && (
                      <span style={{ display: 'inline-block', minWidth: 72, borderBottom: `2px solid ${C}`, margin: '0 3px', textAlign: 'center', verticalAlign: 'bottom' }}>
                        {done && <span style={{ fontSize: '0.85rem', fontWeight: 800, color: ans === q.a ? '#059669' : '#dc2626' }}>{q.opts[ans]}</span>}
                      </span>
                    )}</span>
                  ))}
                </p>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setFillAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.4rem 0.9rem', borderRadius: 7, fontSize: '0.88rem', fontWeight: 700, ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ Richtig. ' : `✗ Antwort: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>🔄</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Transformiere die Sätze</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.transforms.filter((_, i) => transAns[i] !== undefined).length}/{t.transforms.length}
            </span>
          </div>
          {t.transforms.map((q, qi) => {
            const ans = transAns[qi]; const done = ans !== undefined;
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#d97706', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔄 {q.prompt}</div>
                <p style={{ margin: '0 0 0.7rem', fontSize: '0.92rem', color: 'var(--ink)', fontStyle: 'italic', borderLeft: '3px solid var(--line-soft)', paddingLeft: '0.5rem', fontWeight: 600 }}>
                  &ldquo;{q.s}&rdquo;
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setTransAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.5rem 0.9rem', borderRadius: 8, fontSize: '0.87rem', ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.12s', lineHeight: 1.45 }}>
                        <span style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', opacity: 0.6, marginRight: '0.4rem' }}>{['A', 'B', 'C', 'D'][oi]}.</span>
                        {opt}{done && oi === q.a && ' ✓'}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ ' : `✗ Richtig: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>🔍</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Finde den Fehler</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.errors.filter((_, i) => errAns[i] !== undefined).length}/{t.errors.length}
            </span>
          </div>
          {t.errors.map((q, qi) => {
            const ans = errAns[qi]; const done = ans !== undefined;
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔍 Fehler finden</div>
                <p style={{ margin: '0 0 0.25rem', fontWeight: 700, color: '#dc2626', fontSize: '0.93rem', fontFamily: 'var(--mono)', borderLeft: '3px solid #dc2626', paddingLeft: '0.5rem', lineHeight: 1.5 }}>{q.s}</p>
                <p style={{ margin: '0 0 0.65rem', fontSize: '0.83rem', color: 'var(--muted)' }}>{q.q}</p>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setErrAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.4rem 0.85rem', borderRadius: 7, fontSize: '0.85rem', fontWeight: 600, ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ Richtig. ' : `✗ Antwort: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>✍️</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Freie Produktion</span>
          </div>
          <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1.5px solid rgba(5,150,105,0.2)', marginBottom: '0.85rem' }}>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.7 }}>{t.production}</p>
          </div>
          {!allMCQ && (
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic' }}>
              🔒 Mach alle Übungen oben fertig, um die freie Produktion freizuschalten.
            </p>
          )}
          {allMCQ && !prodDone && (
            <>
              <textarea value={prodText} onChange={e => setProdText(e.target.value)} rows={5}
                placeholder="Schreibe deine Antwort hier..."
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 10, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.92rem', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.7 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                  {prodText.trim() ? prodText.trim().split(/\s+/).length : 0} Wörter
                </span>
                <button className="btn btn-sm"
                  onClick={() => { if (prodText.trim().split(/\s+/).filter(Boolean).length >= 10) setProdDone(true); }}
                  disabled={prodText.trim().split(/\s+/).filter(Boolean).length < 10}
                  style={{ background: '#059669', borderColor: '#059669', opacity: prodText.trim().split(/\s+/).filter(Boolean).length >= 10 ? 1 : 0.5 }}>
                  Fertig →
                </button>
              </div>
            </>
          )}
          {prodDone && (
            <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1.5px solid rgba(5,150,105,0.25)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Deine Produktion</div>
              <p style={{ margin: '0 0 0.7rem', fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{prodText}</p>
              <button className="btn btn-ghost btn-sm" onClick={() => { setProdText(''); setProdDone(false); }} style={{ fontSize: '0.78rem' }}>Bearbeiten</button>
            </div>
          )}
        </div>

        {allMCQ && prodDone && !showResult && (
          <button className="btn btn-sm" onClick={() => setShowResult(true)} style={{ background: C, borderColor: C, marginBottom: '1rem' }}>
            Ergebnis anzeigen →
          </button>
        )}

        {showResult && (
          <div style={{ padding: '1.75rem', borderRadius: 18, border: `2px solid ${C}33`, background: `${C}06`, textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {correct === total ? '🏆' : correct >= Math.ceil(total * 0.7) ? '⭐' : '📖'}
            </div>
            <h2 style={{ margin: '0 0 0.25rem', fontWeight: 800, color: 'var(--ink)', fontSize: '1.3rem' }}>
              {correct} / {total} Übungen richtig
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: '0 0 1.25rem', lineHeight: 1.6 }}>
              {correct === total
                ? 'Perfekt! Du beherrschst dieses B1-Thema.'
                : correct >= Math.ceil(total * 0.7)
                ? 'Sehr gut! Schaue dir die mit ✗ markierten Übungen nochmal an.'
                : 'Lies die Erklärung oben noch einmal und versuche es erneut.'}
            </p>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={reset} style={{ background: C, borderColor: C }}>Nochmal versuchen</button>
              {topicIdx < TOPICS.length - 1 && (
                <button className="btn btn-ghost btn-sm" onClick={() => { setTopicIdx(topicIdx + 1); reset(); }}>
                  Nächstes Thema →
                </button>
              )}
              <Link href="/practica/aleman/b1" className="btn btn-ghost btn-sm">Zurück zu B1</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
