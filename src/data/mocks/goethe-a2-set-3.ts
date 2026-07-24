import type { MockExam } from './types';

// Goethe-Zertifikat A2 — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/a2-3/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'a2-3',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat A2 – Übungstest 3',
  subtitle: 'Hören · Lesen · Schreiben · Sprechen',
  timeMinutes: 90,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Hören – Teil 1: Ansagen und Gespräche',
      instructions: 'Sie hören fünf kurze Texte. Wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a2-3/hoeren-teil1.mp3',
      transcript: `Text 1 — Im Zug: Nächster Halt: Köln Hauptbahnhof. Fahrgäste nach Bonn steigen bitte hier um in die Linie S12.\n\nText 2 — Anrufbeantworter: Hallo, hier ist die Reinigung. Ihre Kleidung ist fertig. Sie können sie ab Donnerstag abholen. Wir haben bis 18 Uhr geöffnet.\n\nText 3 — Zwei Freunde: "Hast du den neuen Film schon gesehen?" – "Nein, noch nicht. Sollen wir am Freitag zusammen ins Kino gehen?"\n\nText 4 — Durchsage im Schwimmbad: Liebe Gäste, das Schwimmbad schließt heute ausnahmsweise schon um 19 Uhr. Bitte verlassen Sie das Becken bis 18:45 Uhr.\n\nText 5 — Radiowerbung: Nur diese Woche: Beim Kauf von zwei Paar Schuhen bekommen Sie das dritte Paar gratis! Kommen Sie ins Schuhhaus Müller.`,
      questions: [
        { type: 'mcq', id: 'g-a2-3-h1', part: 1, text: 'Was sollen Fahrgäste nach Bonn tun?', options: ['Im Zug bleiben', 'Aussteigen und mit dem Bus fahren', 'In die Linie S12 umsteigen'], answer: 2 },
        { type: 'mcq', id: 'g-a2-3-h2', part: 1, text: 'Ab wann ist die Kleidung fertig?', options: ['Ab Donnerstag', 'Ab morgen', 'Ab Montag'], answer: 0 },
        { type: 'mcq', id: 'g-a2-3-h3', part: 1, text: 'Wann wollen die Freunde ins Kino gehen?', options: ['Am Freitag', 'Am Samstag', 'Heute'], answer: 0 },
        { type: 'mcq', id: 'g-a2-3-h4', part: 1, text: 'Wann schließt das Schwimmbad heute?', options: ['Um 21 Uhr', 'Um 18 Uhr', 'Um 19 Uhr'], answer: 2 },
        { type: 'mcq', id: 'g-a2-3-h5', part: 1, text: 'Was ist das Angebot im Schuhhaus?', options: ['Alles halber Preis', 'Ein Paar geschenkt', 'Drittes Paar gratis'], answer: 2 },
      ],
    },
    {
      part: 2, skill: 'listening', title: 'Hören – Teil 2: Gespräch im Alltag',
      instructions: 'Sie hören ein Gespräch. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/a2-3/hoeren-teil2.mp3',
      transcript: `Ärztin: Guten Tag, Herr Klein. Was fehlt Ihnen denn?\nPatient: Guten Tag, Frau Doktor. Ich habe seit drei Tagen Kopfschmerzen und fühle mich sehr müde.\nÄrztin: Haben Sie auch Fieber?\nPatient: Ja, gestern Abend hatte ich 38,5 Grad.\nÄrztin: Trinken Sie genug? Und schlafen Sie gut?\nPatient: Trinken ja, aber ich schlafe schlecht, weil ich viel Stress bei der Arbeit habe.\nÄrztin: Das ist wahrscheinlich eine Erkältung, aber der Stress macht es schlimmer. Ich verschreibe Ihnen ein Medikament. Nehmen Sie es dreimal täglich. Und bleiben Sie zwei Tage zu Hause und ruhen Sie sich aus.\nPatient: Vielen Dank, Frau Doktor.`,
      questions: [
        { type: 'mcq', id: 'g-a2-3-h6', part: 2, text: 'Der Patient hat seit drei Tagen Kopfschmerzen.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a2-3-h7', part: 2, text: 'Der Patient hat kein Fieber.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a2-3-h8', part: 2, text: 'Der Patient schläft gut.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a2-3-h9', part: 2, text: 'Der Patient soll das Medikament dreimal täglich nehmen.', options: ['Richtig', 'Falsch'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'listening', title: 'Hören – Teil 3: Kurze Gespräche',
      instructions: 'Sie hören vier kurze Gespräche. Wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a2-3/hoeren-teil3.mp3',
      transcript: `Gespräch 1 — "Wohin fahrt ihr in den Sommerferien?" – "Wir fahren ans Meer, nach Italien. Die Kinder lieben den Strand."\n\nGespräch 2 — "Entschuldigung, ist dieser Platz noch frei?" – "Nein, tut mir leid, hier sitzt schon jemand. Aber der Platz dort drüben ist frei."\n\nGespräch 3 — "Was kochst du heute Abend?" – "Ich weiß noch nicht. Vielleicht Nudeln mit Gemüse. Etwas Schnelles."\n\nGespräch 4 — "Wann fängt der Deutschkurs an?" – "Um 18 Uhr. Aber komm lieber ein bisschen früher, dann bekommst du einen guten Platz."`,
      questions: [
        { type: 'mcq', id: 'g-a2-3-h10', part: 3, text: 'Wohin fährt die Familie in den Ferien?', options: ['In eine Stadt', 'In die Berge', 'Ans Meer nach Italien'], answer: 2 },
        { type: 'mcq', id: 'g-a2-3-h11', part: 3, text: 'Ist der erste Platz frei?', options: ['Nein', 'Vielleicht', 'Ja'], answer: 0 },
        { type: 'mcq', id: 'g-a2-3-h12', part: 3, text: 'Was kocht die Person vielleicht?', options: ['Fisch', 'Nudeln mit Gemüse', 'Pizza'], answer: 1 },
        { type: 'mcq', id: 'g-a2-3-h13', part: 3, text: 'Wann fängt der Deutschkurs an?', options: ['Um 19 Uhr', 'Um 17 Uhr', 'Um 18 Uhr'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Lesen – Teil 1: Zeitungstext',
      instructions: 'Lesen Sie den Text. Kreuzen Sie an: richtig oder falsch?',
      passage: `Freiwillige helfen im Stadtpark\n\nJeden ersten Samstag im Monat treffen sich in unserer Stadt freiwillige Helfer, um den Stadtpark sauber zu halten. Sie sammeln Müll, pflegen die Blumenbeete und reparieren kaputte Bänke. Die Aktion begann vor drei Jahren mit nur fünf Personen. Heute machen über fünfzig Menschen jeden Alters mit.\n\n"Es macht Spaß und man lernt nette Leute kennen", sagt Herr Braun, einer der Organisatoren. Wer mitmachen möchte, muss sich nicht anmelden. Man kommt einfach um neun Uhr zum Haupteingang. Handschuhe und Werkzeug werden gestellt. Nach der Arbeit gibt es für alle Kaffee und Kuchen.`,
      passageTitle: 'Zeitungsartikel',
      questions: [
        { type: 'mcq', id: 'g-a2-3-l1', part: 4, text: 'Die Helfer treffen sich jeden Samstag.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-a2-3-l2', part: 4, text: 'Man muss sich vorher anmelden.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a2-3-l3', part: 4, text: 'Nach der Arbeit gibt es Kaffee und Kuchen.', options: ['Falsch', 'Richtig'], answer: 1 },
      ],
    },
    {
      part: 5, skill: 'reading', title: 'Lesen – Teil 2: Anzeigen zuordnen',
      instructions: 'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt?',
      passage: `Anzeige A — Babysitter gesucht! Nette Familie sucht Betreuung für zwei Kinder (4 und 6 Jahre), zweimal pro Woche am Nachmittag.\n\nAnzeige B — Fahrrad zu verkaufen: Gut erhaltenes Damenrad, wenig gefahren. 120 Euro. Bei Interesse anrufen.\n\nAnzeige C — Computerkurs für Senioren: Lernen Sie E-Mail, Internet und Videoanrufe. Geduldige Lehrer. Kleine Gruppen.\n\nAnzeige D — Restaurant sucht Kellner/in für das Wochenende. Erfahrung nicht nötig, wir lernen Sie an. Gute Bezahlung.`,
      passageTitle: 'Anzeigen',
      questions: [
        { type: 'mcq', id: 'g-a2-3-l4', part: 5, text: 'Sie suchen einen Nebenjob am Wochenende. Welche Anzeige passt?', options: ['Anzeige B', 'Anzeige C', 'Anzeige D', 'Anzeige A'], answer: 2 },
        { type: 'mcq', id: 'g-a2-3-l5', part: 5, text: 'Ihre Großmutter möchte den Computer lernen. Welche Anzeige passt?', options: ['Anzeige A', 'Anzeige B', 'Anzeige C', 'Anzeige D'], answer: 2 },
        { type: 'mcq', id: 'g-a2-3-l6', part: 5, text: 'Sie suchen ein günstiges Fahrrad. Welche Anzeige passt?', options: ['Anzeige D', 'Anzeige A', 'Anzeige B', 'Anzeige C'], answer: 2 },
      ],
    },
    {
      part: 6, skill: 'reading', title: 'Lesen – Teil 3: E-Mail',
      instructions: 'Lesen Sie die E-Mail. Kreuzen Sie an: richtig oder falsch?',
      passage: `Liebe Kollegen,\n\nwie Sie wissen, verlässt unsere Kollegin Frau Richter Ende des Monats die Firma. Sie geht in Rente. Deshalb möchten wir sie am Freitag, den 28., mit einer kleinen Feier verabschieden. Die Feier beginnt um 16 Uhr im Pausenraum.\n\nWir sammeln Geld für ein gemeinsames Geschenk. Wer sich beteiligen möchte, gibt bitte bis Mittwoch einen Beitrag bei mir ab. Über zahlreiches Erscheinen freuen wir uns!\n\nViele Grüße\nHerr Peters`,
      passageTitle: 'E-Mail an die Kollegen',
      questions: [
        { type: 'mcq', id: 'g-a2-3-l7', part: 6, text: 'Frau Richter geht in Rente.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a2-3-l8', part: 6, text: 'Die Feier ist am Morgen.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a2-3-l9', part: 6, text: 'Man kann Geld für ein Geschenk geben.', options: ['Falsch', 'Richtig'], answer: 1 },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 1: Kurze Nachricht',
      instructions: 'Schreiben Sie eine kurze Mitteilung.',
      questions: [
        {
          type: 'write', id: 'g-a2-3-s1', part: 7, taskNumber: 1,
          stimulusLabel: 'Nachricht an eine Freundin',
          stimulus: 'Situation: Sie sind krank und können morgen nicht zum Sport mit Ihrer Freundin Nadia kommen. Schreiben Sie ihr eine Nachricht.',
          text: 'Schreiben Sie an Nadia: 1) sagen Sie ab, 2) Grund (Sie sind krank), 3) machen Sie einen Vorschlag für nächste Woche. Ca. 20–30 Wörter mit Anrede und Gruß.',
          minWords: 25,
        },
      ],
    },
    {
      part: 8, skill: 'writing', title: 'Schreiben – Teil 2: E-Mail',
      instructions: 'Schreiben Sie eine E-Mail (ca. 40 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-a2-3-s2', part: 8, taskNumber: 2,
          stimulusLabel: 'E-Mail an ein Hotel',
          stimulus: 'Situation: Sie möchten in einem Hotel ein Zimmer reservieren. Schreiben Sie eine E-Mail an das Hotel.',
          text: 'Schreiben Sie: 1) Sie möchten ein Zimmer reservieren (Datum, wie viele Nächte), 2) eine Frage (z. B. Frühstück oder Parkplatz), 3) bitten Sie um eine Bestätigung. Ca. 40 Wörter, mit Anrede und Gruß.',
          minWords: 40,
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 1: Fragen zur Person',
      instructions: 'Stellen Sie Ihrem Partner Fragen und antworten Sie.',
      questions: [
        {
          type: 'speak', id: 'g-a2-3-sp1', part: 9, partNumber: 1,
          text: 'Stellen Sie zu den Stichwörtern je eine Frage und beantworten Sie die Fragen Ihres Partners.',
          cueCard: 'Stichwörter (Fragen zur Person):\n• Wohnort\n• Einkaufen\n• Musik\n• Freunde\n• Feiertage\n\nBeispiel: "Wo kaufst du normalerweise ein?"',
        },
      ],
    },
    {
      part: 10, skill: 'speaking', title: 'Sprechen – Teil 2: Über sich sprechen',
      instructions: 'Sprechen Sie zusammenhängend über ein Thema.',
      questions: [
        {
          type: 'speak', id: 'g-a2-3-sp2', part: 10, partNumber: 2,
          text: 'Erzählen Sie über das Thema "Meine Freizeit". Sprechen Sie etwa 1–2 Minuten.',
          cueCard: 'Thema: Meine Freizeit\n\nPunkte:\n• Was machen Sie gern in der Freizeit?\n• Allein oder mit anderen?\n• Wie oft?\n• Was möchten Sie gern einmal machen?\n• Warum ist Freizeit wichtig?',
        },
      ],
    },
    {
      part: 11, skill: 'speaking', title: 'Sprechen – Teil 3: Etwas gemeinsam planen',
      instructions: 'Planen Sie gemeinsam mit Ihrem Partner etwas.',
      questions: [
        {
          type: 'speak', id: 'g-a2-3-sp3', part: 11, partNumber: 3,
          text: 'Planen Sie zusammen einen gemeinsamen Kochabend. Machen Sie Vorschläge und einigen Sie sich.',
          cueCard: 'Situation: Sie möchten mit Freunden zusammen kochen.\n\nPunkte zu klären:\n• Wann und wo?\n• Was kochen? (Gericht)\n• Wer kauft was ein?\n• Getränke?\n• Wer kommt noch?',
        },
      ],
    },
  ],
};

export default mock;
