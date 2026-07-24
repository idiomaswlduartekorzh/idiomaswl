import type { MockExam } from './types';

// Goethe-Zertifikat B1 — formato oficial Modellsatz (Lesen · Hören · Schreiben · Sprechen).
// Conteúdo ORIGINAL WeLearn. Áudio sob /audio/goethe/b1-2/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'b1-2',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat B1 – Übungstest 2',
  subtitle: 'Lesen · Hören · Schreiben · Sprechen',
  timeMinutes: 190,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Lesen – Teil 1: Blogeintrag',
      instructions: 'Lesen Sie den Text und die Aufgaben. Kreuzen Sie an: richtig oder falsch?',
      passage: `Mein Jahr im Ausland – Blog von Jana\n\nVor einem Jahr bin ich für ein Auslandsjahr nach Spanien gegangen, und ich kann sagen: Es war die beste Entscheidung meines Lebens. Am Anfang war alles neu und ein bisschen beängstigend. Ich sprach kaum Spanisch und kannte niemanden. In den ersten Wochen fühlte ich mich oft einsam und wollte manchmal einfach nach Hause.\n\nAber dann wurde alles besser. Ich fand eine WG mit netten Mitbewohnern aus verschiedenen Ländern, und wir wurden schnell Freunde. Mein Spanisch verbesserte sich Woche für Woche, vor allem, weil ich mich traute zu sprechen, auch wenn ich Fehler machte. Nach drei Monaten konnte ich mich schon gut unterhalten.\n\nDas Wichtigste, was ich gelernt habe, ist Selbstständigkeit. Ich musste alles allein organisieren: Wohnung, Behörden, Uni. Zu Hause hatten meine Eltern immer geholfen. Jetzt weiß ich, dass ich vieles allein schaffe. Wer die Chance auf ein Auslandsjahr hat, sollte sie unbedingt nutzen – auch wenn der Anfang schwer ist.`,
      passageTitle: 'Blog: Mein Jahr im Ausland',
      questions: [
        { type: 'mcq', id: 'g-b1-2-l1', part: 1, text: 'Am Anfang fühlte sich Jana in Spanien wohl.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-b1-2-l2', part: 1, text: 'Jana wohnte allein in einer Wohnung.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-b1-2-l3', part: 1, text: 'Ihr Spanisch wurde besser, weil sie sich traute zu sprechen.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-b1-2-l4', part: 1, text: 'Jana hat vor allem gelernt, selbstständig zu sein.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-b1-2-l5', part: 1, text: 'Jana empfiehlt ein Auslandsjahr nicht.', options: ['Richtig', 'Falsch'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lesen – Teil 2: Zeitungsartikel',
      instructions: 'Lesen Sie den Artikel und wählen Sie zu jeder Aufgabe die richtige Antwort.',
      passage: `Weniger Autos in der Innenstadt\n\nImmer mehr deutsche Städte wollen die Zahl der Autos in ihren Zentren reduzieren. Das Ziel ist eine sauberere Luft, weniger Lärm und mehr Platz für Menschen. In einigen Städten dürfen bestimmte Straßen nur noch von Bussen, Fahrrädern und Fußgängern benutzt werden.\n\nDie Reaktionen sind gemischt. Viele Bewohner und Geschäftsleute freuen sich über die ruhigeren Straßen und die neuen Cafés und Grünflächen. Sie sagen, die Innenstadt sei jetzt viel angenehmer. Andere, vor allem Menschen, die auf das Auto angewiesen sind, kritisieren die neuen Regeln. Handwerker klagen, dass sie ihre Werkzeuge schlechter transportieren können, und ältere Menschen finden die längeren Wege beschwerlich.\n\nExperten betonen, dass solche Veränderungen Zeit brauchen. Wichtig sei ein gutes Angebot an öffentlichen Verkehrsmitteln, damit niemand benachteiligt wird. Studien aus anderen europäischen Städten zeigen: Nach einigen Jahren sind die meisten Bewohner mit autofreien Zentren zufrieden – aber nur, wenn es gute Alternativen gibt.`,
      passageTitle: 'Zeitungsartikel: Weniger Autos',
      questions: [
        { type: 'mcq', id: 'g-b1-2-l6', part: 2, text: 'Warum wollen Städte weniger Autos im Zentrum?', options: ['Um Geld zu sparen', 'Für sauberere Luft und mehr Platz für Menschen', 'Weil es zu wenige Autos gibt'], answer: 1 },
        { type: 'mcq', id: 'g-b1-2-l7', part: 2, text: 'Wer kritisiert die neuen Regeln vor allem?', options: ['Kinder', 'Touristen', 'Menschen, die auf das Auto angewiesen sind'], answer: 2 },
        { type: 'mcq', id: 'g-b1-2-l8', part: 2, text: 'Was ist laut Experten besonders wichtig?', options: ['Mehr Parkplätze', 'Höhere Strafen', 'Ein gutes Angebot an öffentlichen Verkehrsmitteln'], answer: 2 },
        { type: 'mcq', id: 'g-b1-2-l9', part: 2, text: 'Was zeigen Studien aus anderen Städten?', options: ['Die Bewohner sind immer unzufrieden', 'Die meisten sind nach einigen Jahren zufrieden, wenn es gute Alternativen gibt', 'Autofreie Zentren funktionieren nie'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Lesen – Teil 3: Anzeigen',
      instructions: 'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Person?',
      passage: `Anzeige A — Sprachtandem gesucht: Ich (Deutsch) suche jemanden für Englisch. Wir treffen uns und sprechen abwechselnd beide Sprachen.\n\nAnzeige B — Umzugsfirma "Schnell & Sicher": Wir transportieren Ihre Möbel in der ganzen Stadt. Faire Preise, auch kurzfristig.\n\nAnzeige C — Volkshochschule: Neuer Kurs "Gesund kochen" ab September. Jeden Montagabend. Zutaten inklusive.\n\nAnzeige D — Fahrgemeinschaft: Ich fahre täglich von Bonn nach Köln zur Arbeit und suche Mitfahrer. Kosten werden geteilt.\n\nAnzeige E — Hundebetreuung: Ich gehe mit Ihrem Hund spazieren, wenn Sie arbeiten. Zuverlässig und tierlieb.`,
      passageTitle: 'Kleinanzeigen',
      questions: [
        { type: 'mcq', id: 'g-b1-2-l10', part: 3, text: 'Sie möchten Ihr Englisch verbessern und dafür Deutsch anbieten.', options: ['Anzeige C', 'Anzeige D', 'Anzeige A', 'Anzeige B'], answer: 2 },
        { type: 'mcq', id: 'g-b1-2-l11', part: 3, text: 'Sie fahren jeden Tag nach Köln und möchten Geld sparen.', options: ['Anzeige C', 'Anzeige D', 'Anzeige E', 'Anzeige A'], answer: 1 },
        { type: 'mcq', id: 'g-b1-2-l12', part: 3, text: 'Sie ziehen um und brauchen Hilfe mit den Möbeln.', options: ['Anzeige B', 'Anzeige C', 'Anzeige D', 'Anzeige E'], answer: 0 },
        { type: 'mcq', id: 'g-b1-2-l13', part: 3, text: 'Sie möchten lernen, gesünder zu kochen.', options: ['Anzeige E', 'Anzeige A', 'Anzeige C', 'Anzeige D'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'listening', title: 'Hören – Teil 1: Kurze Texte',
      instructions: 'Sie hören fünf kurze Texte. Wählen Sie zu jedem Text die richtige Antwort.',
      audioUrl: '/audio/goethe/b1-2/hoeren-teil1.mp3',
      transcript: `Text 1 — Ansage am Bahnhof: Der Regionalexpress nach Frankfurt fährt heute von Gleis 4 statt Gleis 2. Grund ist eine Bauarbeit.\n\nText 2 — Nachricht: Hallo Max, hier ist Julia. Können wir das Treffen morgen auf 16 Uhr verschieben? Ich habe vorher noch einen Termin.\n\nText 3 — Radio-Verkehr: Auf der A3 zwischen Köln und Frankfurt hat sich ein Unfall ereignet. Es gibt einen langen Stau. Fahren Sie über die A61.\n\nText 4 — Durchsage im Kaufhaus: Liebe Kunden, wir suchen die Eltern eines kleinen Jungen namens Felix. Bitte kommen Sie zur Information.\n\nText 5 — Wettervorhersage: Am Wochenende wird es wechselhaft. Am Samstag scheint die Sonne, aber am Sonntag müssen Sie mit Regen rechnen.`,
      questions: [
        { type: 'mcq', id: 'g-b1-2-h1', part: 4, text: 'Von welchem Gleis fährt der Zug nach Frankfurt?', options: ['Gleis 4', 'Gleis 6', 'Gleis 2'], answer: 0 },
        { type: 'mcq', id: 'g-b1-2-h2', part: 4, text: 'Auf wann möchte Julia das Treffen verschieben?', options: ['Auf 14 Uhr', 'Auf 16 Uhr', 'Auf morgen früh'], answer: 1 },
        { type: 'mcq', id: 'g-b1-2-h3', part: 4, text: 'Was empfiehlt der Verkehrsfunk?', options: ['Den Zug zu nehmen', 'Über die A61 zu fahren', 'Zu Hause zu bleiben'], answer: 1 },
        { type: 'mcq', id: 'g-b1-2-h4', part: 4, text: 'Wen sucht das Kaufhaus?', options: ['Die Eltern eines Jungen', 'Einen Mitarbeiter', 'Ein verlorenes Kind'], answer: 0 },
        { type: 'mcq', id: 'g-b1-2-h5', part: 4, text: 'Wie wird das Wetter am Sonntag?', options: ['Sonnig', 'Regnerisch', 'Neblig'], answer: 1 },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Hören – Teil 2: Radiogespräch',
      instructions: 'Sie hören ein Gespräch. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/b1-2/hoeren-teil2.mp3',
      transcript: `Moderator: Heute spreche ich mit der Ernährungsberaterin Frau Dr. Wagner über das Thema Frühstück. Frau Wagner, ist Frühstück wirklich so wichtig?\nFrau Wagner: Das kommt darauf an. Lange Zeit hieß es, Frühstück sei die wichtigste Mahlzeit des Tages. Heute wissen wir: Wichtiger als die Uhrzeit ist, WAS man isst.\nModerator: Also ist es nicht schlimm, wenn man morgens nichts isst?\nFrau Wagner: Nein, wenn jemand morgens keinen Hunger hat, muss er nicht zwingend frühstücken. Aber viele Menschen essen dann später ungesunde Snacks. Deshalb empfehle ich ein leichtes, gesundes Frühstück.\nModerator: Was wäre ein gutes Frühstück?\nFrau Wagner: Zum Beispiel Vollkornbrot, Obst, Joghurt oder Haferflocken. Wichtig ist, wenig Zucker zu essen. Süße Cerealien und Marmeladenbrötchen geben nur kurz Energie, danach wird man schnell wieder müde.\nModerator: Und Kaffee?\nFrau Wagner: Kaffee ist in Maßen okay. Aber trinken Sie auch genug Wasser.`,
      questions: [
        { type: 'mcq', id: 'g-b1-2-h6', part: 5, text: 'Frau Wagner sagt, die Uhrzeit des Frühstücks ist am wichtigsten.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-b1-2-h7', part: 5, text: 'Wer morgens keinen Hunger hat, muss nicht unbedingt frühstücken.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-b1-2-h8', part: 5, text: 'Sie empfiehlt ein Frühstück mit viel Zucker.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-b1-2-h9', part: 5, text: 'Kaffee ist in Maßen in Ordnung.', options: ['Richtig', 'Falsch'], answer: 0 },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Schreiben – Teil 1: Forumsbeitrag',
      instructions: 'Schreiben Sie einen Beitrag in einem Internetforum.',
      questions: [
        {
          type: 'write', id: 'g-b1-2-s1', part: 6, taskNumber: 1,
          stimulusLabel: 'Forumsbeitrag',
          stimulus: 'In einem Internetforum diskutieren die Menschen über die Frage: "Sollten Handys in der Schule verboten werden?" Schreiben Sie Ihre Meinung.',
          text: 'Schreiben Sie einen Forumsbeitrag (ca. 80 Wörter): 1) Nennen Sie Ihre Meinung zum Thema, 2) geben Sie mindestens zwei Gründe, 3) nennen Sie ein Beispiel aus Ihrer Erfahrung. Achten Sie auf Anrede und einen passenden Schluss.',
          minWords: 80,
        },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 2: Formelle E-Mail',
      instructions: 'Schreiben Sie eine formelle E-Mail.',
      questions: [
        {
          type: 'write', id: 'g-b1-2-s2', part: 7, taskNumber: 2,
          stimulusLabel: 'Formelle E-Mail',
          stimulus: 'Situation: Sie haben einen Sprachkurs bei einer Sprachschule gebucht, können aber aus gesundheitlichen Gründen nicht teilnehmen. Sie möchten das Geld zurück oder den Kurs verschieben.',
          text: 'Schreiben Sie eine formelle E-Mail an die Sprachschule (ca. 80 Wörter): 1) Erklären Sie Ihr Anliegen, 2) nennen Sie den Grund, 3) machen Sie einen Vorschlag (Rückerstattung oder Verschiebung), 4) bitten Sie um eine Antwort. Achten Sie auf eine höfliche, formelle Sprache.',
          minWords: 80,
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Sprechen – Teil 1: Gemeinsam planen',
      instructions: 'Planen Sie gemeinsam mit Ihrem Partner etwas.',
      questions: [
        {
          type: 'speak', id: 'g-b1-2-sp1', part: 8, partNumber: 1,
          text: 'Planen Sie zusammen einen Abschiedsabend für eine Kollegin, die die Firma verlässt. Machen Sie Vorschläge, reagieren Sie und einigen Sie sich.',
          cueCard: 'Situation: Abschiedsabend für eine Kollegin.\n\nPunkte zu klären:\n• Wann und wo? (Datum, Ort)\n• Wen einladen?\n• Essen und Getränke?\n• Geschenk?\n• Wer organisiert was?',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 2: Präsentation',
      instructions: 'Halten Sie eine kurze Präsentation zu einem Thema.',
      questions: [
        {
          type: 'speak', id: 'g-b1-2-sp2', part: 9, partNumber: 2,
          text: 'Halten Sie eine kurze Präsentation (2–3 Minuten) zum Thema "Leben in der Stadt oder auf dem Land".',
          cueCard: 'Thema: Stadt oder Land\n\nStruktur Ihrer Präsentation:\n• Einleitung: Situation in Ihrem Heimatland\n• Vorteile des Stadtlebens\n• Nachteile / Vorteile des Landlebens\n• Ihre eigene Erfahrung / Meinung\n• Abschluss: Was ziehen Sie vor und warum?',
        },
      ],
    },
    {
      part: 10, skill: 'speaking', title: 'Sprechen – Teil 3: Über die Präsentation sprechen',
      instructions: 'Reagieren Sie auf die Präsentation Ihres Partners und beantworten Sie Fragen.',
      questions: [
        {
          type: 'speak', id: 'g-b1-2-sp3', part: 10, partNumber: 3,
          text: 'Geben Sie Ihrem Partner eine Rückmeldung zu seiner Präsentation und stellen Sie eine Frage. Beantworten Sie auch die Fragen zu Ihrer eigenen Präsentation.',
          cueCard: 'Redemittel:\n• Rückmeldung: "Deine Präsentation hat mir gut gefallen, weil ..."\n• Frage stellen: "Du hast gesagt, dass ... Kannst du das genauer erklären?"\n• Auf Fragen antworten: "Das ist eine gute Frage. Ich denke, ..."',
        },
      ],
    },
  ],
};

export default mock;
