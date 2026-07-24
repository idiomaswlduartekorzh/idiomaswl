import type { MockExam } from './types';

// Goethe-Zertifikat A2 — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/a2-2/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'a2-2',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat A2 – Übungstest 2',
  subtitle: 'Hören · Lesen · Schreiben · Sprechen',
  timeMinutes: 90,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Hören – Teil 1: Ansagen und Gespräche',
      instructions: 'Sie hören fünf kurze Texte. Wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a2-2/hoeren-teil1.mp3',
      transcript: `Text 1 — Wetterbericht: Am Wochenende wird es warm und sonnig. Die Temperaturen steigen auf 25 Grad. Perfekt für einen Ausflug!\n\nText 2 — Am Flughafen: Die Passagiere des Fluges LH 402 nach Wien werden gebeten, sofort zum Gate B12 zu kommen. Der Flug schließt in wenigen Minuten.\n\nText 3 — Zwei Kollegen: "Gehen wir heute Mittag zusammen essen?" – "Gute Idee, aber nicht wieder Pizza. Lass uns mal etwas Gesundes essen, vielleicht Salat."\n\nText 4 — Im Kaufhaus: Sehr geehrte Kunden, unsere Spielzeugabteilung finden Sie ab sofort im dritten Stock, nicht mehr im Erdgeschoss.\n\nText 5 — Anrufbeantworter: Hallo, hier ist Tom. Ich habe meinen Schlüssel bei dir vergessen. Kann ich ihn morgen abholen?`,
      questions: [
        { type: 'mcq', id: 'g-a2-2-h1', part: 1, text: 'Wie wird das Wetter am Wochenende?', options: ['Kalt und regnerisch', 'Warm und sonnig', 'Windig'], answer: 1 },
        { type: 'mcq', id: 'g-a2-2-h2', part: 1, text: 'Wohin fliegt der Flug LH 402?', options: ['Nach Zürich', 'Nach Wien', 'Nach Berlin'], answer: 1 },
        { type: 'mcq', id: 'g-a2-2-h3', part: 1, text: 'Was wollen die Kollegen essen?', options: ['Etwas Gesundes', 'Nichts', 'Pizza'], answer: 0 },
        { type: 'mcq', id: 'g-a2-2-h4', part: 1, text: 'Wo ist die Spielzeugabteilung jetzt?', options: ['Im Erdgeschoss', 'Im dritten Stock', 'Im ersten Stock'], answer: 1 },
        { type: 'mcq', id: 'g-a2-2-h5', part: 1, text: 'Was hat Tom vergessen?', options: ['Sein Handy', 'Seine Jacke', 'Seinen Schlüssel'], answer: 2 },
      ],
    },
    {
      part: 2, skill: 'listening', title: 'Hören – Teil 2: Gespräch im Alltag',
      instructions: 'Sie hören ein Gespräch. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/a2-2/hoeren-teil2.mp3',
      transcript: `Mann: Guten Tag, ich möchte ein Zimmer reservieren, für zwei Nächte.\nRezeptionistin: Gern. Für wann?\nMann: Vom 10. bis zum 12. Mai. Ein Einzelzimmer, bitte.\nRezeptionistin: Einen Moment... Ja, wir haben ein Einzelzimmer frei. Es kostet 70 Euro pro Nacht, mit Frühstück.\nMann: Gibt es im Zimmer WLAN?\nRezeptionistin: Ja, kostenlos. Und wir haben auch einen Parkplatz, aber der kostet 8 Euro pro Tag.\nMann: Gut, ich brauche keinen Parkplatz, ich komme mit dem Zug. Ich nehme das Zimmer.\nRezeptionistin: Auf welchen Namen darf ich reservieren?\nMann: Auf den Namen Berger, Thomas Berger.`,
      questions: [
        { type: 'mcq', id: 'g-a2-2-h6', part: 2, text: 'Der Mann möchte ein Doppelzimmer.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-a2-2-h7', part: 2, text: 'Das Zimmer kostet 70 Euro pro Nacht.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a2-2-h8', part: 2, text: 'Das WLAN ist kostenlos.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a2-2-h9', part: 2, text: 'Der Mann braucht einen Parkplatz.', options: ['Falsch', 'Richtig'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'listening', title: 'Hören – Teil 3: Kurze Gespräche',
      instructions: 'Sie hören vier kurze Gespräche. Wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a2-2/hoeren-teil3.mp3',
      transcript: `Gespräch 1 — "Was hast du am Samstag vor?" – "Ich gehe zum Geburtstag meiner Schwester. Sie wird dreißig."\n\nGespräch 2 — "Warum bist du so müde?" – "Ich konnte letzte Nacht nicht schlafen. Die Nachbarn haben bis zwei Uhr Musik gehört."\n\nGespräch 3 — "Wie viel kostet die Reparatur?" – "Etwa 120 Euro. Das Fahrrad ist in zwei Tagen fertig."\n\nGespräch 4 — "Kannst du mir helfen? Ich verstehe diese Aufgabe nicht." – "Klar, zeig mal her. Ach, das ist nicht so schwer."`,
      questions: [
        { type: 'mcq', id: 'g-a2-2-h10', part: 3, text: 'Was macht die Person am Samstag?', options: ['Sie arbeitet', 'Sie geht zum Geburtstag ihrer Schwester', 'Sie bleibt zu Hause'], answer: 1 },
        { type: 'mcq', id: 'g-a2-2-h11', part: 3, text: 'Warum ist die Person müde?', options: ['Sie war krank', 'Sie hat zu viel gearbeitet', 'Die Nachbarn haben Musik gehört'], answer: 2 },
        { type: 'mcq', id: 'g-a2-2-h12', part: 3, text: 'Wann ist das Fahrrad fertig?', options: ['Heute', 'In einer Woche', 'In zwei Tagen'], answer: 2 },
        { type: 'mcq', id: 'g-a2-2-h13', part: 3, text: 'Worum bittet die erste Person?', options: ['Um Geld', 'Um Hilfe bei einer Aufgabe', 'Um ein Buch'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Lesen – Teil 1: Zeitungstext',
      instructions: 'Lesen Sie den Text. Kreuzen Sie an: richtig oder falsch?',
      passage: `Ein Café nur für Bücher\n\nIn der Innenstadt hat ein besonderes Café eröffnet. Es heißt "Seitenweise" und verbindet Kaffee mit Büchern. An jedem Tisch stehen Regale voller Bücher, die die Gäste kostenlos lesen können. Wer möchte, kann ein Buch auch kaufen oder ein eigenes Buch mitbringen und tauschen.\n\nDie Besitzerin, Frau Lehmann, hatte die Idee während der Pandemie. "Viele Menschen fühlten sich einsam. Ich wollte einen Ort schaffen, wo man in Ruhe lesen und trotzdem unter Menschen sein kann", sagt sie. Das Café ist von Dienstag bis Sonntag geöffnet. Montags ist Ruhetag. Besonders beliebt sind die Lesungen am Freitagabend.`,
      passageTitle: 'Zeitungsartikel',
      questions: [
        { type: 'mcq', id: 'g-a2-2-l1', part: 4, text: 'Die Gäste können die Bücher im Café kostenlos lesen.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a2-2-l2', part: 4, text: 'Das Café ist jeden Tag geöffnet.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-a2-2-l3', part: 4, text: 'Am Freitagabend gibt es Lesungen.', options: ['Richtig', 'Falsch'], answer: 0 },
      ],
    },
    {
      part: 5, skill: 'reading', title: 'Lesen – Teil 2: Anzeigen zuordnen',
      instructions: 'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt?',
      passage: `Anzeige A — Nachhilfe in Mathe und Physik. Erfahrener Student hilft Schülern. 15 Euro pro Stunde, auch online.\n\nAnzeige B — Wohnung zu vermieten: 2 Zimmer, Küche, Bad, 60 m². Zentral, ab sofort frei. 800 Euro warm.\n\nAnzeige C — Yoga-Kurs für Anfänger: Dienstags und donnerstags, 19 Uhr. Erste Stunde gratis. Bringen Sie bequeme Kleidung mit.\n\nAnzeige D — Flohmarkt am Sonntag auf dem Marktplatz. Von 8 bis 16 Uhr. Kleidung, Bücher, Spielzeug und mehr.`,
      passageTitle: 'Anzeigen',
      questions: [
        { type: 'mcq', id: 'g-a2-2-l4', part: 5, text: 'Ihr Sohn hat Probleme in Mathematik. Welche Anzeige passt?', options: ['Anzeige D', 'Anzeige A', 'Anzeige B', 'Anzeige C'], answer: 1 },
        { type: 'mcq', id: 'g-a2-2-l5', part: 5, text: 'Sie suchen eine neue Wohnung. Welche Anzeige passt?', options: ['Anzeige C', 'Anzeige D', 'Anzeige A', 'Anzeige B'], answer: 3 },
        { type: 'mcq', id: 'g-a2-2-l6', part: 5, text: 'Sie möchten günstig gebrauchte Sachen kaufen. Welche Anzeige passt?', options: ['Anzeige B', 'Anzeige C', 'Anzeige D', 'Anzeige A'], answer: 2 },
      ],
    },
    {
      part: 6, skill: 'reading', title: 'Lesen – Teil 3: E-Mail',
      instructions: 'Lesen Sie die E-Mail. Kreuzen Sie an: richtig oder falsch?',
      passage: `Hallo Julia,\n\nendlich habe ich Zeit, dir zu schreiben! Wie du weißt, habe ich vor zwei Monaten eine neue Stelle in Stuttgart begonnen. Die Arbeit gefällt mir sehr gut, die Kollegen sind nett. Nur die Wohnungssuche war schwierig — die Mieten sind hier sehr hoch! Zum Glück habe ich jetzt eine kleine Wohnung gefunden.\n\nHast du Lust, mich bald zu besuchen? Im Juni habe ich Urlaub, da könnten wir zusammen die Stadt erkunden. Sag mir bitte, ob das für dich passt.\n\nLiebe Grüße\nSandra`,
      passageTitle: 'E-Mail von Sandra',
      questions: [
        { type: 'mcq', id: 'g-a2-2-l7', part: 6, text: 'Sandra arbeitet seit zwei Monaten in Stuttgart.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a2-2-l8', part: 6, text: 'Die Wohnungssuche war leicht.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-a2-2-l9', part: 6, text: 'Sandra möchte, dass Julia sie besucht.', options: ['Falsch', 'Richtig'], answer: 1 },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 1: Kurze Nachricht',
      instructions: 'Schreiben Sie eine kurze Mitteilung.',
      questions: [
        {
          type: 'write', id: 'g-a2-2-s1', part: 7, taskNumber: 1,
          stimulusLabel: 'Nachricht an eine Nachbarin',
          stimulus: 'Situation: Sie haben am Wochenende eine Feier und möchten Ihre Nachbarin Frau Wolf informieren. Schreiben Sie ihr eine Nachricht.',
          text: 'Schreiben Sie an Frau Wolf: 1) informieren Sie über die Feier (Samstagabend), 2) entschuldigen Sie sich für den möglichen Lärm, 3) laden Sie sie ein. Ca. 20–30 Wörter mit Anrede und Gruß.',
          minWords: 25,
        },
      ],
    },
    {
      part: 8, skill: 'writing', title: 'Schreiben – Teil 2: E-Mail',
      instructions: 'Schreiben Sie eine E-Mail (ca. 40 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-a2-2-s2', part: 8, taskNumber: 2,
          stimulusLabel: 'E-Mail an einen Kollegen',
          stimulus: 'Situation: Ein Kollege hat Sie zu einem Abendessen bei ihm zu Hause eingeladen. Antworten Sie auf die Einladung.',
          text: 'Schreiben Sie: 1) danken Sie für die Einladung, 2) sagen Sie zu oder ab (mit Grund), 3) fragen Sie etwas (z. B. ob Sie etwas mitbringen sollen). Ca. 40 Wörter, mit Anrede und Gruß.',
          minWords: 40,
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 1: Fragen zur Person',
      instructions: 'Stellen Sie Ihrem Partner Fragen und antworten Sie.',
      questions: [
        {
          type: 'speak', id: 'g-a2-2-sp1', part: 9, partNumber: 1,
          text: 'Stellen Sie zu den Stichwörtern je eine Frage und beantworten Sie die Fragen Ihres Partners.',
          cueCard: 'Stichwörter (Fragen zur Person):\n• Beruf\n• Hobbys\n• Essen\n• Urlaub\n• Sport\n\nBeispiel: "Was machst du gern in deiner Freizeit?"',
        },
      ],
    },
    {
      part: 10, skill: 'speaking', title: 'Sprechen – Teil 2: Über sich sprechen',
      instructions: 'Sprechen Sie zusammenhängend über ein Thema.',
      questions: [
        {
          type: 'speak', id: 'g-a2-2-sp2', part: 10, partNumber: 2,
          text: 'Erzählen Sie über das Thema "Mein Arbeitstag / Mein Schultag". Sprechen Sie etwa 1–2 Minuten.',
          cueCard: 'Thema: Mein Arbeitstag / Schultag\n\nPunkte:\n• Wann stehen Sie auf?\n• Was machen Sie am Vormittag?\n• Mittagspause?\n• Was am Nachmittag?\n• Wie ist Ihr Feierabend?',
        },
      ],
    },
    {
      part: 11, skill: 'speaking', title: 'Sprechen – Teil 3: Etwas gemeinsam planen',
      instructions: 'Planen Sie gemeinsam mit Ihrem Partner etwas.',
      questions: [
        {
          type: 'speak', id: 'g-a2-2-sp3', part: 11, partNumber: 3,
          text: 'Planen Sie zusammen eine Geburtstagsfeier für einen gemeinsamen Freund. Machen Sie Vorschläge und einigen Sie sich.',
          cueCard: 'Situation: Ihr Freund Max hat bald Geburtstag. Planen Sie die Feier.\n\nPunkte zu klären:\n• Wann und wo? (Datum, Ort)\n• Wen einladen?\n• Was zu essen und trinken?\n• Geschenk?\n• Wer macht was?',
        },
      ],
    },
  ],
};

export default mock;
