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
  a1note: string; examples: string[];
  fills: FQ[]; transforms: TQ[]; errors: EQ[]; production: string;
}

const TOPICS: Topic[] = [
  {
    id: 'perfekt',
    title: 'Das Perfekt: haben vs. sein',
    icon: '⏰',
    rule: "Das Perfekt = Hilfsverb (haben ODER sein) + Partizip II. Verben mit SEIN: Bewegungsverben (gehen, fahren, fliegen, kommen, laufen) + Zustandsveränderung (aufwachen, einschlafen, sterben, wachsen) + bleiben, sein, werden. Partizip II: regelmäßig = ge- + Stamm + -(e)t (gemacht, geredet); unregelmäßig = ge- + Stamm + -en (gegessen, getrunken, gesehen, gegangen).",
    tip: "Test für sein: Hat das Verb ein Akkusativ-Objekt? → Ja = haben. 'Ich habe einen Film gesehen' (Akkusativobjekt: einen Film) → haben. 'Er ist nach Hause gegangen' (kein Akkusativobjekt) → sein. Ausnahmen: bleiben + sein/werden → immer sein.",
    table: {
      headers: ['', 'haben + Partizip II', 'sein + Partizip II'],
      rows: [
        ['ich', 'ich habe gemacht', 'ich bin gegangen'],
        ['du', 'du hast gemacht', 'du bist gegangen'],
        ['er/sie/es', 'er hat gemacht', 'er ist gegangen'],
        ['wir', 'wir haben gemacht', 'wir sind gegangen'],
        ['ihr', 'ihr habt gemacht', 'ihr seid gegangen'],
        ['sie/Sie', 'sie haben gemacht', 'sie sind gegangen'],
      ]
    },
    a1note: "Im A1 hast du das Präsens gelernt: 'Ich mache Sport.' (jetzt/regelmäßig). Im A2 benutzt du das Perfekt für vergangene Ereignisse: 'Gestern habe ich Sport gemacht.' Im Deutschen ist das Perfekt die Hauptform für die gesprochene Vergangenheit — nicht das Präteritum (außer sein/haben/Modalverben).",
    examples: [
      "Gestern bin ich ins Kino gegangen und habe einen tollen Film gesehen. (gehen → sein; sehen → haben)",
      "Sie ist aufgewacht, hat gefrühstückt und dann zur Arbeit gefahren. (aufwachen→sein; frühstücken→haben; fahren→sein)",
      "Wir haben das ganze Wochenende zu Hause geblieben. FALSCH → Wir sind zu Hause geblieben. (bleiben → immer sein!)",
    ],
    fills: [
      { s: "Wir ___ heute Morgen sehr früh aufgewacht.", opts: ["sind", "haben", "seid", "habt"], a: 0, fb: "'Aufwachen' = Zustandsveränderung (vom Schlafen zum Wachsein) → SEIN. 'Wir SIND aufgewacht.'" },
      { s: "Er ___ gestern einen alten Freund getroffen.", opts: ["hat", "ist", "hatte", "war"], a: 0, fb: "'Treffen' hat ein Akkusativobjekt (einen alten Freund) → HABEN. 'Er HAT getroffen.'" },
      { s: "Sie ___ letzten Sommer nach Berlin gefahren.", opts: ["ist", "hat", "seid", "habt"], a: 0, fb: "'Fahren' = Bewegungsverb → SEIN. 'Sie IST gefahren.'" },
      { s: "Ich ___ gestern Abend einen guten Film gesehen.", opts: ["habe", "bin", "hatte", "war"], a: 0, fb: "'Sehen' hat Akkusativobjekt (einen Film) → HABEN. 'Ich HABE gesehen.'" },
      { s: "Die Kinder ___ den ganzen Tag im Park geblieben.", opts: ["sind", "haben", "waren", "hatten"], a: 0, fb: "'Bleiben' → SEIN (Ausnahme: kein Bewegungsverb, aber gehört zur sein-Gruppe). 'Kinder SIND geblieben.'" },
    ],
    transforms: [
      { prompt: "Bilde das Perfekt:", s: "Er geht heute ins Fitnessstudio. (gestern)", opts: ["Er ist gestern ins Fitnessstudio gegangen.", "Er hat gestern ins Fitnessstudio gegangen.", "Er ist gestern ins Fitnessstudio gegangt.", "Er geht gestern ins Fitnessstudio."], a: 0, fb: "Gehen = Bewegungsverb → SEIN + gegangen (irreg. Partizip II). 'Er IST gegangen.'" },
      { prompt: "Bilde die Verneinung im Perfekt:", s: "Sie hat die Hausaufgaben gemacht.", opts: ["Sie hat die Hausaufgaben nicht gemacht.", "Sie ist die Hausaufgaben nicht gemacht.", "Sie hat nicht die Hausaufgaben gemacht.", "Sie hat die Hausaufgaben kein gemacht."], a: 0, fb: "Verneinung im Perfekt: haben/sein + nicht + Partizip II. 'Sie hat ... NICHT gemacht.' (nicht kommt vor dem Partizip am Satzende)." },
      { prompt: "Formuliere die Frage im Perfekt (W-Frage):", s: "Du bist nach München gefahren. (Wohin?)", opts: ["Wohin bist du gefahren?", "Wohin hast du gefahren?", "Wohin du bist gefahren?", "Wohin bist du gefahrt?"], a: 0, fb: "W-Frage im Perfekt: W-Wort + Hilfsverb + Subjekt + ... + Partizip II. 'Wohin BIST du gefahren?' (fahren → sein)." },
    ],
    errors: [
      { s: "Ich habe gestern nach Hause gegangen.", q: "Was ist falsch?", opts: ["'habe' muss 'bin' sein (gehen → sein)", "'gegangen' muss 'gegangen' sein (richtig)", "'gestern' muss am Ende stehen", "Kein Fehler"], a: 0, fb: "Gehen = Bewegungsverb → SEIN. Richtig: 'Ich BIN gestern nach Hause gegangen.' Nie 'habe gegangen'." },
      { s: "Wir haben letztes Jahr in München geblieben.", q: "Was ist falsch?", opts: ["'haben' muss 'sind' sein (bleiben → sein)", "'geblieben' muss 'gebliebt' sein", "'letztes Jahr' ist falsch positioniert", "Kein Fehler"], a: 0, fb: "Bleiben → SEIN (Ausnahme!). Richtig: 'Wir SIND letztes Jahr in München geblieben.'" },
    ],
    production: "Erzähle was du gestern gemacht hast — Schreibe 4-5 Sätze im Perfekt. Benutze mindestens 2 Verben mit SEIN und 2 mit HABEN. Beispiel: 'Gestern bin ich früh aufgewacht und habe...'",
  },
  {
    id: 'dativ',
    title: 'Der Dativ: Kasus und Präpositionen',
    icon: '🔗',
    rule: "Der Dativ = indirektes Objekt (Wem?). Dativpräpositionen: aus, bei, mit, nach, seit, von, zu, gegenüber — IMMER Dativ! Dativartikel: der/das → dem; die → der; Plural → den (+ Nomen +n wenn möglich). Dativpronomen: mir, dir, ihm/ihr/ihm, uns, euch, ihnen/Ihnen.",
    tip: "Eselsbrücke Dativpräpositionen: 'Aus, bei, mit, nach, seit, von, zu, gegenüber — diese Wörter haben immer Dativ.' Merke: 'Ich schenke DIR (Dativ) ein Buch.' = Wem? = DIR (indirektes Objekt). 'Das Buch' = Akkusativ (direkt).",
    table: {
      headers: ['', 'Maskulin', 'Neutrum', 'Feminin', 'Plural'],
      rows: [
        ['Nominativ', 'der Mann', 'das Kind', 'die Frau', 'die Männer'],
        ['Akkusativ', 'den Mann', 'das Kind', 'die Frau', 'die Männer'],
        ['Dativ', 'dem Mann', 'dem Kind', 'der Frau', 'den Männern'],
        ['Indef. Dativ', 'einem Mann', 'einem Kind', 'einer Frau', '— Männern'],
      ]
    },
    a1note: "Im A1 hast du Nominativ (Subjekt) und Akkusativ (direktes Objekt) gelernt: 'Der Mann kauft einen Kaffee.' Im A2 kommt der Dativ hinzu: 'Er gibt der Frau den Kaffee.' (der Frau = Dativ; den Kaffee = Akkusativ). Drei Kasus, drei verschiedene Rollen im Satz.",
    examples: [
      "Ich gebe dem Kind (Dativ: wem?) einen Apfel (Akkusativ: was?). (Kind = maskulin/neutrum → dem)",
      "Sie wohnt bei ihrer Schwester (Dativ nach 'bei'). (Schwester = feminin → ihrer)",
      "Mit dem Zug (Dativ nach 'mit') fahre ich nach Berlin. (Zug = maskulin → dem)",
    ],
    fills: [
      { s: "Ich schenke ___ Mutter Blumen zum Geburtstag.", opts: ["meiner", "meine", "meinem", "meines"], a: 0, fb: "'Schenken' = Dativ (wem? der Mutter). Mutter = feminin → Dativ = 'der/meiner'. 'Ich schenke MEINER Mutter...' " },
      { s: "Er fährt mit ___ Fahrrad zur Arbeit.", opts: ["dem", "den", "der", "des"], a: 0, fb: "'Mit' = immer Dativ. Fahrrad = Neutrum → Dativ = DEM. 'Er fährt mit DEM Fahrrad.'" },
      { s: "Sie wohnt bei ___ Freundin.", opts: ["ihrer", "ihren", "ihrem", "ihre"], a: 0, fb: "'Bei' = immer Dativ. Freundin = Feminin → Dativ = der/ihrer. 'Sie wohnt bei IHRER Freundin.'" },
      { s: "Ich helfe ___ alten Mann.", opts: ["dem", "den", "der", "des"], a: 0, fb: "'Helfen' verlangt Dativ (wem?). Mann = Maskulin → Dativ = DEM. 'Ich helfe DEM alten Mann.'" },
      { s: "Seit ___ Wochen lerne ich Deutsch.", opts: ["drei", "dreier", "drem", "dreien"], a: 0, fb: "'Seit' = immer Dativ. Bei Zahlen ohne Artikel bleibt die Zahl unverändert: 'seit DREI Wochen'. Keine Flexion bei nackten Zahlwörtern nach Dativpräpositionen." },
    ],
    transforms: [
      { prompt: "Ersetze durch das Dativpronomen:", s: "Ich gebe dem Kind ein Spielzeug.", opts: ["Ich gebe ihm ein Spielzeug.", "Ich gebe es ein Spielzeug.", "Ich gebe ihn ein Spielzeug.", "Ich gebe der ein Spielzeug."], a: 0, fb: "Kind = Neutrum → Dativ = ihm. 'Ich gebe IHM ein Spielzeug.' (ihm = Dativpronomen maskulin/neutrum)." },
      { prompt: "Formuliere mit Dativpräposition 'zu':", s: "Ich fahre. Ziel: der Arzt.", opts: ["Ich fahre zum Arzt.", "Ich fahre zu den Arzt.", "Ich fahre zu der Arzt.", "Ich fahre dem Arzt."], a: 0, fb: "'Zu' + Dativ. Arzt = Maskulin → Dativ = dem. Kontraktion: zu + dem = ZUM. 'Ich fahre ZUM Arzt.'" },
      { prompt: "Setze den richtigen Dativartikel ein:", s: "Ich spreche mit ___ Lehrerin. (die Lehrerin)", opts: ["der", "die", "den", "dem"], a: 0, fb: "'Mit' = Dativ. Lehrerin = Feminin → Dativartikel = DER. 'Ich spreche mit DER Lehrerin.'" },
    ],
    errors: [
      { s: "Ich gebe den Kind ein Buch.", q: "Was ist falsch?", opts: ["'den' muss 'dem' sein (Kind = Neutrum, Dativ = dem)", "'den' muss 'die' sein", "'ein Buch' muss 'einen Buch' sein", "Kein Fehler"], a: 0, fb: "Kind = Neutrum → Dativ = DEM (nicht den!). 'den' = Akkusativ Maskulin oder Dativ Plural. Richtig: 'Ich gebe DEM Kind ein Buch.'" },
      { s: "Er wohnt bei seiner Bruder.", q: "Was ist falsch?", opts: ["'seiner' muss 'seinem' sein (Bruder = Maskulin, Dativ = -em)", "'bei' muss 'mit' sein", "'wohnt' muss 'lebt' sein", "Kein Fehler"], a: 0, fb: "Bruder = Maskulin → Dativ Possessivpronomen = SEINEM. 'Er wohnt bei SEINEM Bruder.' (nicht 'seiner' = Feminin-Dativ)." },
    ],
    production: "Beschreibe deinen Alltag mit mindestens 4 Dativstrukturen: 2 Sätze mit Dativpräpositionen (mit, bei, zu, nach, seit, von, aus) und 2 Sätze mit indirektem Objekt (jemandem etwas geben/schreiben/sagen). (4-5 Sätze)",
  },
  {
    id: 'modalverben_praeteritum',
    title: 'Modalverben im Präteritum',
    icon: '🎯',
    rule: "Modalverben benutzen im mündlichen Gebrauch PRÄTERITUM (nicht Perfekt): konnte (können), musste (müssen), durfte (dürfen), wollte (wollen), sollte (sollen), mochte (mögen). Bildung: Infinitiv-Stamm ohne Umlaut + Präteritumendungen: -te/-test/-te/-ten/-tet/-ten. Verneinung: nicht + Modalverb im Präteritum (konnte nicht, musste nicht).",
    tip: "Merke: Im Deutschen sagt man 'Ich konnte nicht kommen' (Präteritum), NICHT 'Ich habe nicht kommen gekonnt' (Perfekt ist möglich aber unnatürlich). Modalverben im Präteritum sind viel häufiger als ihr Perfekt. Lerne die 6 Formen auswendig!",
    table: {
      headers: ['Infinitiv', 'Präteritum', 'Bedeutung A1 (Präsens)', 'Bedeutung A2 (Vergangenheit)'],
      rows: [
        ['können', 'konnte', 'can / ich kann', 'could / ich konnte'],
        ['müssen', 'musste', 'must / ich muss', 'had to / ich musste'],
        ['dürfen', 'durfte', 'may / ich darf', 'was allowed / ich durfte'],
        ['wollen', 'wollte', 'want to / ich will', 'wanted to / ich wollte'],
        ['sollen', 'sollte', 'should / ich soll', 'was supposed to / ich sollte'],
        ['mögen', 'mochte', 'like / ich mag', 'liked / ich mochte'],
      ]
    },
    a1note: "Im A1 hast du Modalverben im Präsens: 'Ich kann schwimmen. Ich muss lernen.' Im A2 erzählst du in der Vergangenheit: 'Gestern konnte ich nicht schwimmen (Schwimmbad war zu). Ich musste stattdessen lernen.' Der Unterschied: Präsens = jetzt; Präteritum = damals.",
    examples: [
      "Gestern konnte ich nicht schlafen, weil es so laut war. (können → konnte: past ability/inability)",
      "Als Kind durfte ich nicht bis Mitternacht aufbleiben. (dürfen → durfte: past permission)",
      "Sie wollte Ärztin werden, aber das Studium war zu teuer. (wollen → wollte: past wish/intention)",
    ],
    fills: [
      { s: "Als Kind ___ ich nicht so spät aufbleiben.", opts: ["durfte", "darf", "durfte nicht", "dürfte"], a: 0, fb: "'Dürfen' (Erlaubnis) → Präteritum = 'durfte'. 'Als Kind' = Vergangenheit → Präteritum. 'Ich DURFTE nicht aufbleiben.'" },
      { s: "Gestern ___ er nicht zur Arbeit kommen — er war krank.", opts: ["konnte", "kann", "könnte", "konnte nicht"], a: 0, fb: "'Können' (Fähigkeit/Möglichkeit) → Präteritum = 'konnte'. 'Er KONNTE nicht kommen.' (die Verneinung 'nicht' kommt separat)" },
      { s: "Sie ___ letztes Jahr unbedingt nach Japan reisen.", opts: ["wollte", "will", "wollte gern", "würde"], a: 0, fb: "'Wollen' (Wunsch) → Präteritum = 'wollte'. 'Letztes Jahr' = Vergangenheit. 'Sie WOLLTE nach Japan reisen.'" },
      { s: "Wir ___ den ganzen Abend warten — das Konzert fing erst um 22 Uhr an.", opts: ["mussten", "müssen", "mussten nicht", "sollten"], a: 0, fb: "'Müssen' (Notwendigkeit) → Präteritum = 'musste' (wir = 'mussten'). 'Wir MUSSTEN den ganzen Abend warten.'" },
      { s: "Er ___ früher kein Gemüse — jetzt isst er es jeden Tag.", opts: ["mochte", "mag", "möchte", "mögte"], a: 0, fb: "'Mögen' (mögen/möchten) → Präteritum = 'mochte'. 'Früher' = Vergangenheit. 'Er MOCHTE kein Gemüse.' (jetzt geändert)" },
    ],
    transforms: [
      { prompt: "Schreibe im Präteritum (Vergangenheit):", s: "Ich kann nicht schlafen. (gestern Nacht)", opts: ["Gestern Nacht konnte ich nicht schlafen.", "Gestern Nacht habe ich nicht schlafen gekonnt.", "Gestern Nacht kann ich nicht schlafen.", "Gestern Nacht könnte ich nicht schlafen."], a: 0, fb: "Können → konnte (Präteritum). 'Gestern KONNTE ich nicht schlafen.' Das Präteritum ist natürlicher als das Perfekt bei Modalverben." },
      { prompt: "Verneine im Präteritum:", s: "Er durfte das Zimmer verlassen.", opts: ["Er durfte das Zimmer nicht verlassen.", "Er darf das Zimmer nicht verlassen.", "Er hat das Zimmer nicht verlassen dürfen.", "Er durfte kein Zimmer verlassen."], a: 0, fb: "Verneinung: Modalverb im Präteritum + nicht + Infinitiv am Ende. 'Er durfte das Zimmer NICHT verlassen.'" },
      { prompt: "Bilde die W-Frage mit Modalverb:", s: "Du musstest früh aufstehen. (Warum?)", opts: ["Warum musstest du früh aufstehen?", "Warum musste du früh aufstehen?", "Warum du musstest früh aufstehen?", "Warum hast du früh aufstehen gemusst?"], a: 0, fb: "W-Frage mit Modalverb im Präteritum: W-Wort + Modalverb + Subjekt + ... + Infinitiv. 'Warum MUSSTEST du früh aufstehen?'" },
    ],
    errors: [
      { s: "Gestern konnte er nicht kommen können.", q: "Was ist falsch?", opts: ["'kommen können' ist falsch — nur 'kommen' (kein Doppelinfintiv im Präteritum)", "'konnte' muss 'könnte' sein", "'gestern' muss am Ende stehen", "Kein Fehler"], a: 0, fb: "Im Präteritum: Modalverb im Prät. + Infinitiv (KEIN Doppelinfintiv). Richtig: 'Gestern KONNTE er nicht kommen.' (nicht 'kommen können')" },
      { s: "Als ich jung war, ich wollte Pilot werden.", q: "Was ist falsch?", opts: ["Wortstellung: 'wollte' muss vor 'ich' kommen (Verb an 2. Position)", "'wollte' muss 'wollte gern' sein", "'jung' muss 'junger' sein", "Kein Fehler"], a: 0, fb: "Im deutschen Hauptsatz: Verb steht immer an Position 2. Temporal-Nebensatz zählt als Position 1 → Verb (wollte) kommt vor Subjekt (ich). Richtig: 'Als ich jung war, WOLLTE ich Pilot werden.'" },
    ],
    production: "Erzähle von deiner Kindheit mit Modalverben im Präteritum (4-5 Sätze). Was durftest du nicht? Was musstest du tun? Was wolltest du werden? Beispiel: 'Als ich klein war, wollte ich...'",
  },
  {
    id: 'trennbare_verben',
    title: 'Trennbare Verben im Satz',
    icon: '✂️',
    rule: "Trennbare Verben = Präfix + Verb. Im Hauptsatz (Präsens/Präteritum): Präfix ans Satzende! Im Nebensatz oder Infinitivkonstruktion: zusammen. Häufige trennbare Präfixe: ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-, nach-, los-. Untrennbare Präfixe (bleiben am Verb): be-, ge-, er-, ver-, zer-, ent-, miss-.",
    tip: "Faustregel: Ist das Präfix betont, wenn du das Wort allein sagst? 'AUFstehen' (betont: auf) → trennbar. 'beSTELLen' (betont: stel) → untrennbar. Im Perfekt: Partizip II = Präfix + ge- + Stamm + -(e)t/-en: aufgestanden, angekommen, mitgekommen.",
    table: {
      headers: ['Infinitiv', 'Präsens (Hauptsatz)', 'Präsens (Nebensatz)', 'Perfekt'],
      rows: [
        ['aufstehen', 'Ich stehe um 7 auf.', '...weil ich um 7 aufstehe.', 'Ich bin aufgestanden.'],
        ['anrufen', 'Er ruft sie an.', '...weil er sie anruft.', 'Er hat sie angerufen.'],
        ['einladen', 'Wir laden sie ein.', '...weil wir sie einladen.', 'Wir haben sie eingeladen.'],
        ['mitkommen', 'Kommst du mit?', '...ob du mitkommst.', 'Bist du mitgekommen?'],
        ['anfangen', 'Der Film fängt an.', '...wenn der Film anfängt.', 'Der Film hat angefangen.'],
      ]
    },
    a1note: "Im A1 hast du Verben ohne Präfix gelernt: 'kommen, gehen, machen.' Im A2 lernst du die trennbaren Varianten: 'mitkommen, ausgehen, mitmachen' — und die wichtige Regel: das Präfix wandert bei Konjugation ans Satzende! Das ist eine der typischsten Eigenschaften des Deutschen.",
    examples: [
      "Ich stehe jeden Morgen um 6 Uhr auf. Heute bin ich um 7 aufgestanden. (aufstehen: trennbar in Präsens + Perfekt)",
      "Ruf mich an, wenn du angekommen bist! (anrufen + ankommen: trennbar; Nebensatz: wenn du angekommen bist = zusammen)",
      "Der Kurs fängt um 9 an. Kommst du mit? (anfangen + mitkommen: Präfix ans Ende im Hauptsatz)",
    ],
    fills: [
      { s: "Ich ___ jeden Morgen um 6 Uhr ___. (aufstehen)", opts: ["stehe / auf", "aufstehe / —", "stehe / aufstehe", "bin / aufgestanden"], a: 0, fb: "Trennbares Verb im Präsens: Konjugiertes Verb an Pos. 2 + Präfix ans Ende. 'Ich STEHE ... AUF.'" },
      { s: "Er ___ seine Mutter jeden Abend ___. (anrufen)", opts: ["ruft / an", "anruft / —", "rufft / an", "hat / angerufen"], a: 0, fb: "'Anrufen' = trennbar. Im Präsens: 'Er RUFT ... AN.' (Präfix 'an' ans Ende). 'hat angerufen' wäre Perfekt." },
      { s: "Wir ___ alle unsere Freunde zur Party ___. (einladen)", opts: ["laden / ein", "einladen / —", "läden / ein", "haben / eingeladen"], a: 0, fb: "'Einladen' = trennbar. Präsens: 'Wir LADEN ... EIN.' Umlaut! (laden → lädt im Singular, aber 'wir laden' ohne Umlaut)" },
      { s: "Der Film ___ um 20 Uhr ___. (anfangen)", opts: ["fängt / an", "anfängt / —", "fängt / anfangen", "hat / angefangen"], a: 0, fb: "'Anfangen' = trennbar. 3. Person Singular: 'Der Film FÄNGT ... AN.' (Umlaut: a→ä im Singular: ich fange, du fängst, er fängt)" },
      { s: "Ich ___ morgen mit dem Deutschkurs ___. (aufhören)", opts: ["höre / auf", "aufhöre / —", "höre auf / —", "habe / aufgehört"], a: 0, fb: "'Aufhören' = trennbar. Präsens: 'Ich HÖRE ... AUF.' Das Präfix 'auf' wandert ans Satzende." },
    ],
    transforms: [
      { prompt: "Schreibe im Nebensatz (Präfix bleibt am Verb):", s: "Sie steht früh auf. Ich weiß es.", opts: ["Ich weiß, dass sie früh aufsteht.", "Ich weiß, dass sie aufsteht früh.", "Ich weiß, dass sie steht früh auf.", "Ich weiß, sie steht früh auf."], a: 0, fb: "Nebensatz mit 'dass': Verb (mit Präfix) ans Ende. 'dass sie früh AUFsteht.' Im Nebensatz bleibt das Verb zusammen und kommt ans Ende." },
      { prompt: "Schreibe im Perfekt (ge- zwischen Präfix und Stamm):", s: "Sie ruft ihren Freund an. (gestern)", opts: ["Gestern hat sie ihren Freund angerufen.", "Gestern ist sie ihren Freund angerufen.", "Gestern hat sie ihren Freund angeruft.", "Gestern hat sie ihren Freund aufgerufen."], a: 0, fb: "Perfekt trennbares Verb: Präfix + ge- + Stamm + -en/-t. anrufen → ANG(e)rufen. 'Hat sie ... ANGERUFEN.'" },
      { prompt: "Trenne das Verb korrekt:", s: "Du (mitkommen) morgen?", opts: ["Kommst du morgen mit?", "Du kommst morgen mit?", "Mitkkommst du morgen?", "Du mitkommst morgen?"], a: 0, fb: "Frage ohne W-Wort: Verb an Position 1. 'KOMMST du morgen MIT?' (Präfix 'mit' ans Ende, Verb 'kommst' an Pos. 1)" },
    ],
    errors: [
      { s: "Ich aufstehe jeden Morgen um 7 Uhr.", q: "Was ist falsch?", opts: ["'aufstehe' muss getrennt werden: 'stehe ... auf' (Präfix ans Satzende)", "'aufstehe' muss 'aufstand' sein", "'um 7 Uhr' muss am Anfang stehen", "Kein Fehler"], a: 0, fb: "Trennbares Verb im Hauptsatz: konjugiertes Verb an Pos. 2, Präfix ans Ende. Richtig: 'Ich STEHE jeden Morgen um 7 Uhr AUF.'" },
      { s: "Ich weiß, dass er ruft mich nicht an.", q: "Was ist falsch?", opts: ["Wortstellung im Nebensatz: Verb muss ans Ende — 'dass er mich nicht anruft'", "'weiß' muss 'wüsste' sein", "'nicht' muss vor 'mich' stehen", "Kein Fehler"], a: 0, fb: "Nebensatz: alle Verbeile (Präfix + Verb) ans Ende. Richtig: 'Ich weiß, dass er mich nicht ANRUFT.' (anrufen bleibt zusammen am Ende)." },
    ],
    production: "Beschreibe deinen Tagesablauf mit mindestens 4 trennbaren Verben (aufstehen, anfangen, aufhören, anrufen, einkaufen, ausgehen, fernsehen, mitnehmen...). Schreibe 4-5 Sätze im Präsens und dann 2 im Perfekt.",
  },
  {
    id: 'komparativ_superlativ',
    title: 'Komparativ und Superlativ',
    icon: '⚖️',
    rule: "Komparativ: Adjektiv + -er + als. Superlativ: am + Adjektiv + -sten (prädikativ) ODER der/die/das + Adjektiv + -ste/-sten (attributiv). Unregelmäßige Formen: gut → besser → am besten; viel → mehr → am meisten; gern → lieber → am liebsten; hoch → höher → am höchsten; groß → größer → am größten.",
    tip: "Achtung: Viele kurze Adjektive haben Umlaut im Komparativ/Superlativ: alt→älter/am ältesten; jung→jünger/am jüngsten; groß→größer/am größten; kalt→kälter/am kältesten; lang→länger/am längsten; warm→wärmer/am wärmsten. Merke auch: gut/besser/am besten und viel/mehr/am meisten — irreguläre Formen.",
    table: {
      headers: ['Adjektiv', 'Komparativ', 'Superlativ (prädik.)', 'Superlativ (attrib.)'],
      rows: [
        ['groß', 'größer als', 'am größten', 'der/die/das größte'],
        ['gut', 'besser als', 'am besten', 'der/die/das beste'],
        ['viel', 'mehr als', 'am meisten', 'der/die/das meiste'],
        ['gern', 'lieber (als)', 'am liebsten', '—'],
        ['hoch', 'höher als', 'am höchsten', 'der/die/das höchste'],
        ['schnell (regular)', 'schneller als', 'am schnellsten', 'der/die/das schnellste'],
      ]
    },
    a1note: "Im A1 hast du Adjektive beschreibend benutzt: 'Das Auto ist schnell. Der Zug ist schnell auch.' Im A2 vergleichst du: 'Der Zug ist schneller als das Auto, aber das Flugzeug ist am schnellsten.' Du gehst von einfacher Beschreibung zu nuanciertem Vergleich über.",
    examples: [
      "Berlin ist größer als München, aber kleiner als London. (Komparativ: größer/kleiner + als)",
      "Der Sommer in Spanien ist heißer als in Deutschland — aber ich finde Herbst am schönsten. (Komparativ + Superlativ prädikativ)",
      "Das beste Restaurant in der Stadt ist leider auch das teuerste. (Superlativ attributiv: das beste / das teuerste)",
    ],
    fills: [
      { s: "München ist ___ Berlin, aber kleiner als Hamburg.", opts: ["kleiner als", "kleiner wie", "am kleinsten als", "kleiner von"], a: 0, fb: "Komparativ: Adjektiv + -er + ALS (nicht 'wie'). 'München ist KLEINER ALS Berlin.' Im Deutschen IMMER 'als' beim Komparativ." },
      { s: "Von allen meinen Kursen mag ich Deutsch ___.", opts: ["am liebsten", "lieber", "das liebste", "am besten"], a: 0, fb: "Superlativ von 'gern' → 'am liebsten'. Frage 'Was machst du am liebsten?' 'Am liebsten' = Superlativ des Adverbs 'gern'." },
      { s: "Dieses Hotel ist ___ als das letzte — und es kostet auch mehr.", opts: ["besser", "mehr gut", "am besten", "gut"], a: 0, fb: "Komparativ von 'gut' = BESSER (irregulär). 'Mehr gut' existiert nicht. 'Am besten' wäre Superlativ (ohne Vergleich). 'BESSER als' = Komparativ." },
      { s: "Der Eiffelturm ist ___ Bauwerk Frankreichs.", opts: ["das bekannteste", "am bekanntesten", "bekannteste", "bekannter"], a: 0, fb: "Superlativ attributiv (vor Nomen): DER/DIE/DAS + Adjektiv + -ste/-sten. 'Das bekannteste Bauwerk' (Neutrum, Nominativ → -e). 'Am bekanntesten' wäre prädikativ (ohne Nomen)." },
      { s: "Je ___ ich übe, desto ___ spreche ich.", opts: ["mehr / besser", "viel / gut", "am meisten / am besten", "mehr / gut"], a: 0, fb: "Konstruktion 'je...desto' = je + Komparativ..., desto + Komparativ. 'Je MEHR... desto BESSER.' (Komparativ von viel/gut)." },
    ],
    transforms: [
      { prompt: "Bilde den Komparativ mit 'als':", s: "Ein Elefant ist schwer. Eine Maus ist leicht. (vergleichen)", opts: ["Ein Elefant ist schwerer als eine Maus.", "Ein Elefant ist mehr schwer als eine Maus.", "Ein Elefant ist schwerer wie eine Maus.", "Ein Elefant ist am schwersten als eine Maus."], a: 0, fb: "Komparativ: schwer → schwerer. Immer 'ALS' (nicht 'wie'). 'Ein Elefant ist SCHWERER ALS eine Maus.'" },
      { prompt: "Bilde den Superlativ (prädikativ):", s: "Das Matterhorn ist sehr hoch. (höchster Berg der Schweiz)", opts: ["Das Matterhorn ist der höchste Berg der Schweiz.", "Das Matterhorn ist am höchsten Berg der Schweiz.", "Das Matterhorn ist höchste Berg der Schweiz.", "Das Matterhorn ist am höchsten von der Schweiz."], a: 0, fb: "Attributiver Superlativ (vor Nomen): DER höchste Berg. Berg = Maskulin, Nominativ → '-ste'. 'Das Matterhorn ist DER HÖCHSTE Berg der Schweiz.'" },
      { prompt: "Ergänze mit dem richtigen Komparativ:", s: "Ich trinke gern Kaffee, aber Tee trinke ich noch ___.", opts: ["lieber", "mehr gern", "am liebsten", "lieber als"], a: 0, fb: "Komparativ von 'gern' = LIEBER. 'Ich trinke Tee noch LIEBER (als Kaffee).' Keine Angabe von 'als' wenn der Vergleichspunkt schon klar ist." },
    ],
    errors: [
      { s: "Berlin ist mehr groß als München.", q: "Was ist falsch?", opts: ["'mehr groß' muss 'größer' sein (Komparativ durch Endung, nicht 'mehr')", "'als' muss 'wie' sein", "'ist' muss 'ist größer' sein", "Kein Fehler"], a: 0, fb: "Im Deutschen bildet man den Komparativ IMMER durch Endung (-er), nie durch 'mehr'. 'Mehr' = Komparativ von 'viel', nicht von anderen Adjektiven. Richtig: 'Berlin ist GRÖSSER als München.'" },
      { s: "Dieser Wein schmeckt am gut.", q: "Was ist falsch?", opts: ["'am gut' muss 'am besten' sein (Superlativ von gut = am besten)", "'Wein' muss 'Weins' sein", "'schmeckt' muss 'schmecke' sein", "Kein Fehler"], a: 0, fb: "Superlativ von 'gut' = AM BESTEN (irregulär). 'Am gut' existiert nicht. Richtig: 'Dieser Wein schmeckt AM BESTEN.'" },
    ],
    production: "Vergleiche zwei Städte, Länder oder Transportmittel. Schreibe 4-5 Sätze mit: 1 Komparativ, 1 Superlativ prädikativ (am + -sten) und 1 Superlativ attributiv (der/die/das + -ste). Benutze auch mindestens eine unregelmäßige Form (gut/besser, groß/größer, viel/mehr).",
  },
];

export default function GramaticaAlemanA2() {
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
          <Link href="/practica/aleman/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>A2</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>Grammatik</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.3rem' }}><span className="ink-line" />Alemán A2</p>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.4rem', color: 'var(--ink)' }}>
          Grammatik A2 — 5 wesentliche Themen
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: '0 0 2rem', lineHeight: 1.6, maxWidth: 560 }}>
          Perfekt, Dativ, Modalverben, trennbare Verben und Komparativ. Visuelle Tabellen + progressive Übungen.
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
            📌 <strong style={{ color: 'var(--ink)' }}>vs A1:</strong> {t.a1note}
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
                ? 'Perfekt! Du beherrschst dieses A2-Thema.'
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
              <Link href="/practica/aleman/a2" className="btn btn-ghost btn-sm">Zurück zu A2</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
