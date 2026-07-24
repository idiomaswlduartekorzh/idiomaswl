import type { MockExam } from './types';

// Goethe-Zertifikat C1 — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/c1-2/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'c1-2',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat C1 – Übungstest 2',
  subtitle: 'Lesen · Hören · Schreiben · Sprechen',
  timeMinutes: 190,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Lesen – Teil 1: Sachtext',
      instructions: 'Lesen Sie den Text zum Thema "Erinnerung und Geschichte" und beantworten Sie die Fragen.',
      passage: `Das Gedächtnis der Gesellschaft\n\nWie eine Gesellschaft mit ihrer Vergangenheit umgeht, sagt viel über ihre Gegenwart aus. Denkmäler, Gedenktage, Museen und Schulbücher sind keine neutralen Aufbewahrungsorte der Geschichte, sondern Ausdruck bewusster Entscheidungen darüber, woran erinnert werden soll – und woran nicht.\n\nDas kollektive Gedächtnis ist stets selektiv. Es hebt bestimmte Ereignisse hervor und lässt andere in Vergessenheit geraten. Diese Auswahl ist keineswegs willkürlich, sondern folgt den Interessen und Werten der jeweiligen Zeit. Was einer Generation als heroisch gilt, kann einer späteren als problematisch erscheinen. So werden etwa Denkmäler, die einst selbstverständlich errichtet wurden, heute kontrovers diskutiert oder entfernt.\n\nGerade diese Debatten sind jedoch kein Zeichen von Geschichtsvergessenheit, wie manche behaupten, sondern im Gegenteil Ausdruck einer lebendigen Auseinandersetzung mit der Vergangenheit. Eine Gesellschaft, die über ihre Erinnerung streitet, nimmt Geschichte ernst.\n\nProblematisch wird der Umgang mit der Vergangenheit erst dort, wo er der Verklärung dient – wo unbequeme Wahrheiten verdrängt und Mythen gepflegt werden, die dem eigenen Selbstbild schmeicheln. Eine reife Erinnerungskultur zeichnet sich nicht dadurch aus, dass sie nur der Ruhmestaten gedenkt, sondern dass sie auch die dunklen Kapitel nicht verschweigt. Denn nur wer der Vergangenheit ehrlich ins Auge blickt, kann aus ihr lernen. Das Erinnern ist somit keine bloße Rückwärtsgewandtheit, sondern eine Voraussetzung für eine verantwortungsvolle Gestaltung der Zukunft.`,
      passageTitle: 'Text: Das Gedächtnis der Gesellschaft',
      questions: [
        { type: 'mcq', id: 'g-c1-2-l1', part: 1, text: 'Wie beschreibt der Autor Denkmäler und Museen?', options: ['Als bedeutungslos', 'Als neutrale Aufbewahrungsorte', 'Als Ausdruck bewusster Entscheidungen, woran erinnert wird'], answer: 2 },
        { type: 'mcq', id: 'g-c1-2-l2', part: 1, text: 'Was kennzeichnet das kollektive Gedächtnis laut Text?', options: ['Es erinnert an alles gleich', 'Es ist völlig objektiv', 'Es ist stets selektiv'], answer: 2 },
        { type: 'mcq', id: 'g-c1-2-l3', part: 1, text: 'Wie bewertet der Autor Debatten über Denkmäler?', options: ['Als Geschichtsvergessenheit', 'Als Ausdruck einer lebendigen Auseinandersetzung mit der Vergangenheit', 'Als überflüssig'], answer: 1 },
        { type: 'mcq', id: 'g-c1-2-l4', part: 1, text: 'Wann wird der Umgang mit der Vergangenheit laut Text problematisch?', options: ['Wenn man streitet', 'Wenn man zu viel erinnert', 'Wenn er der Verklärung dient und unbequeme Wahrheiten verdrängt'], answer: 2 },
        { type: 'mcq', id: 'g-c1-2-l5', part: 1, text: 'Als was versteht der Autor das Erinnern letztlich?', options: ['Als Voraussetzung für eine verantwortungsvolle Gestaltung der Zukunft', 'Als reine Nostalgie', 'Als bloße Rückwärtsgewandtheit'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lesen – Teil 2: Kommentar',
      instructions: 'Lesen Sie den Kommentar zum Thema "Sprache" und beantworten Sie die Fragen.',
      passage: `Sprache im Wandel: Verfall oder Entwicklung?\n\nKaum ein Thema erhitzt die Gemüter so verlässlich wie der Zustand der Sprache. Regelmäßig beklagen Kulturkritiker den angeblichen Verfall des Deutschen: zu viele Anglizismen, eine verarmte Jugendsprache, nachlässige Grammatik. Der Untergang der Sprachkultur, so scheint es, steht unmittelbar bevor.\n\nEin Blick in die Geschichte relativiert diese Sorge jedoch erheblich. Sprache war zu keinem Zeitpunkt statisch. Was heute als korrekt gilt, war einst eine Neuerung, die von den Sprachhütern der jeweiligen Epoche ebenso beklagt wurde. Die Klage über den Sprachverfall ist selbst uralt und begleitet die Sprachentwicklung seit jeher wie ein Schatten.\n\nAus linguistischer Sicht ist Wandel kein Verfall, sondern das Wesen lebendiger Sprache. Eine Sprache, die sich nicht mehr veränderte, wäre eine tote Sprache. Anglizismen etwa sind nichts grundsätzlich Neues; das Deutsche hat sich immer schon aus anderen Sprachen bereichert. Die Jugendsprache wiederum ist kreativ und dynamisch – und die meisten ihrer Ausdrücke verschwinden ohnehin nach wenigen Jahren wieder.\n\nDies bedeutet freilich nicht, dass jede Nachlässigkeit begrüßenswert wäre. Klarheit und Präzision im Ausdruck bleiben wichtige Ziele, gerade in einer Zeit der schnellen Kommunikation. Doch man sollte Wandel nicht mit Verfall verwechseln. Wer die Sprache liebt, sollte sie nicht wie ein Museumsstück behandeln, sondern als das lebendige, sich stets erneuernde Werkzeug schätzen, das sie ist.`,
      passageTitle: 'Kommentar: Sprache im Wandel',
      questions: [
        { type: 'mcq', id: 'g-c1-2-l6', part: 2, text: 'Was beklagen Kulturkritiker laut Text regelmäßig?', options: ['Den angeblichen Verfall der deutschen Sprache', 'Dass es zu wenige Anglizismen gibt', 'Dass sich die Sprache nicht verändert'], answer: 0 },
        { type: 'mcq', id: 'g-c1-2-l7', part: 2, text: 'Was zeigt ein Blick in die Geschichte laut Autor?', options: ['Früher gab es keine Kritik', 'Die Sprache war immer statisch', 'Die Klage über den Sprachverfall ist selbst uralt'], answer: 2 },
        { type: 'mcq', id: 'g-c1-2-l8', part: 2, text: 'Wie bewertet die Linguistik den Sprachwandel?', options: ['Als das Wesen lebendiger Sprache', 'Als Katastrophe', 'Als Verfall'], answer: 0 },
        { type: 'mcq', id: 'g-c1-2-l9', part: 2, text: 'Was räumt der Autor trotz seiner Position ein?', options: ['Dass jede Nachlässigkeit gut ist', 'Dass Klarheit und Präzision wichtige Ziele bleiben', 'Dass Sprache egal ist'], answer: 1 },
        { type: 'mcq', id: 'g-c1-2-l10', part: 2, text: 'Wie soll man laut Schluss die Sprache behandeln?', options: ['Man soll sie nicht verändern', 'Wie ein Museumsstück', 'Als lebendiges, sich erneuerndes Werkzeug'], answer: 2 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Lesen – Teil 3: Meinungen zuordnen',
      instructions: 'Vier Personen äußern sich zum Thema "Künstliche Intelligenz und Kreativität". Ordnen Sie die Fragen zu.',
      passage: `Person A (Künstlerin Vera): Ich sehe KI nicht als Bedrohung, sondern als neues Werkzeug. So wie einst die Fotografie die Malerei nicht ersetzt, sondern erweitert hat, kann KI neue kreative Möglichkeiten eröffnen. Entscheidend bleibt die menschliche Idee dahinter.\n\nPerson B (Musiker Jonas): Mich beunruhigt vor allem die rechtliche und wirtschaftliche Seite. Wenn KI mit den Werken echter Künstler trainiert wird und dann ähnliche Werke produziert, wer verdient dann daran? Die Urheber gehen oft leer aus. Das ist ein grundlegendes Gerechtigkeitsproblem.\n\nPerson C (Philosophin Dr. Amann): Die eigentliche Frage ist für mich philosophischer Natur: Kann eine Maschine überhaupt kreativ sein? Kreativität setzt meines Erachtens Absicht, Erfahrung und ein Bewusstsein voraus. Eine KI kombiniert nur Vorhandenes, ohne etwas zu "meinen".\n\nPerson D (Unternehmer Berg): Ich bin da pragmatisch. Ob wir es gutheißen oder nicht, die Technologie ist da und wird bleiben. Statt zu lamentieren, sollten wir lernen, sie sinnvoll zu nutzen. Wer sich verweigert, wird schlicht abgehängt.`,
      passageTitle: 'Meinungen: KI und Kreativität',
      questions: [
        { type: 'mcq', id: 'g-c1-2-l11', part: 3, text: 'Wer stellt die philosophische Frage, ob eine Maschine überhaupt kreativ sein kann?', options: ['Person D (Berg)', 'Person A (Vera)', 'Person B (Jonas)', 'Person C (Dr. Amann)'], answer: 3 },
        { type: 'mcq', id: 'g-c1-2-l12', part: 3, text: 'Wer betont vor allem die rechtlichen und wirtschaftlichen Probleme?', options: ['Person C (Dr. Amann)', 'Person D (Berg)', 'Person A (Vera)', 'Person B (Jonas)'], answer: 3 },
        { type: 'mcq', id: 'g-c1-2-l13', part: 3, text: 'Wer vergleicht KI mit der Fotografie als neues Werkzeug?', options: ['Person B (Jonas)', 'Person C (Dr. Amann)', 'Person D (Berg)', 'Person A (Vera)'], answer: 3 },
        { type: 'mcq', id: 'g-c1-2-l14', part: 3, text: 'Wer argumentiert am pragmatischsten ("die Technologie ist da")?', options: ['Person A (Vera)', 'Person B (Jonas)', 'Person C (Dr. Amann)', 'Person D (Berg)'], answer: 3 },
      ],
    },
    {
      part: 4, skill: 'listening', title: 'Hören – Teil 1: Diskussion',
      instructions: 'Sie hören eine Diskussion. Wählen Sie zu jeder Aufgabe die richtige Antwort.',
      audioUrl: '/audio/goethe/c1-2/hoeren-teil1.mp3',
      transcript: `Moderator: Unser heutiges Thema ist die Vier-Tage-Woche. Frau Berg, Sie haben in Ihrem Unternehmen die Vier-Tage-Woche eingeführt. Wie sind Ihre Erfahrungen?\nFrau Berg: Durchweg positiv. Wir haben die Arbeitszeit reduziert, ohne den Lohn zu kürzen. Zu unserer Überraschung ist die Produktivität nicht gesunken, sondern sogar leicht gestiegen. Die Mitarbeiter sind erholter, motivierter und weniger krank.\nModerator: Herr Klein, Sie sind skeptisch.\nHerr Klein: Ich freue mich für Frau Berg, aber ich warne vor voreiligen Verallgemeinerungen. Was in einem Kreativunternehmen funktioniert, lässt sich nicht ohne Weiteres auf andere Branchen übertragen. In der Pflege oder im Einzelhandel, wo Präsenz gefragt ist, sieht die Rechnung ganz anders aus.\nFrau Berg: Da haben Sie recht, ein Patentrezept ist es nicht. Aber gerade in Branchen mit Fachkräftemangel könnte eine attraktivere Arbeitszeit ein entscheidender Vorteil sein.\nHerr Klein: Das mag sein. Mein Einwand ist eher, dass wir die zusätzlichen Kosten nicht ignorieren dürfen. Wenn Präsenz nötig ist und die Arbeitszeit sinkt, muss man mehr Personal einstellen – und das kostet.\nModerator: Es kommt also stark auf die jeweilige Branche an.\nFrau Berg: Absolut. Pauschale Antworten führen hier nicht weiter.`,
      questions: [
        { type: 'mcq', id: 'g-c1-2-h1', part: 4, text: 'Wie waren die Erfahrungen von Frau Berg mit der Vier-Tage-Woche?', options: ['Durchweg positiv, die Produktivität stieg sogar leicht', 'Sehr negativ', 'Die Produktivität sank stark'], answer: 0 },
        { type: 'mcq', id: 'g-c1-2-h2', part: 4, text: 'Wovor warnt Herr Klein?', options: ['Vor zu wenig Arbeit', 'Vor voreiligen Verallgemeinerungen auf alle Branchen', 'Vor zu langen Pausen'], answer: 1 },
        { type: 'mcq', id: 'g-c1-2-h3', part: 4, text: 'Was ist Herrn Kleins Haupteinwand bei Präsenzberufen?', options: ['Man muss mehr Personal einstellen, was Kosten verursacht', 'Es gibt kein Problem', 'Die Mitarbeiter sind faul'], answer: 0 },
        { type: 'mcq', id: 'g-c1-2-h4', part: 4, text: 'Worin sind sich am Ende beide einig?', options: ['Dass es stark auf die jeweilige Branche ankommt', 'Dass die Vier-Tage-Woche überall gleich funktioniert', 'Dass sie unmöglich ist'], answer: 0 },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Hören – Teil 2: Vortrag',
      instructions: 'Sie hören einen Vortrag. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/c1-2/hoeren-teil2.mp3',
      transcript: `Meine sehr verehrten Damen und Herren, ich möchte heute über ein oft missverstandenes Phänomen sprechen: das Scheitern. In unserer Leistungsgesellschaft gilt Scheitern als Makel, als etwas, das um jeden Preis zu vermeiden ist. Ich möchte für eine differenziertere Sicht plädieren.\n\nZunächst: Scheitern ist unvermeidlich. Wer nie scheitert, hat vermutlich nie etwas riskiert. Innovation und Fortschritt sind ohne die Bereitschaft zum Scheitern schlechterdings undenkbar. Jede bedeutende Erfindung, jedes gelungene Unternehmen ist in aller Regel von zahllosen gescheiterten Versuchen begleitet.\n\nInteressant ist der kulturelle Unterschied im Umgang mit dem Scheitern. In manchen Kulturen, etwa in den USA, wird Scheitern eher als Lernerfahrung betrachtet. Ein gescheiterter Unternehmer hat "Erfahrung gesammelt". In anderen Kulturen hingegen haftet dem Scheitern ein dauerhaftes Stigma an, das Menschen davon abhält, überhaupt ein Risiko einzugehen.\n\nDamit will ich das Scheitern keineswegs romantisieren. Es tut weh, und nicht jedes Scheitern führt zu Erkenntnis. Entscheidend ist, wie wir damit umgehen: ob wir daran zerbrechen oder daraus lernen. Eine Kultur, die konstruktives Scheitern zulässt, ist letztlich innovativer und menschlicher als eine, die um jeden Preis Fehler vermeidet. Denn wer das Scheitern fürchtet, wagt am Ende gar nichts mehr.`,
      questions: [
        { type: 'mcq', id: 'g-c1-2-h5', part: 5, text: 'Der Redner plädiert für eine differenziertere Sicht auf das Scheitern.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-c1-2-h6', part: 5, text: 'Laut Vortrag ist Innovation ohne die Bereitschaft zum Scheitern gut möglich.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-c1-2-h7', part: 5, text: 'Der Redner nennt kulturelle Unterschiede im Umgang mit dem Scheitern.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-c1-2-h8', part: 5, text: 'Der Redner romantisiert das Scheitern und sagt, es tue nicht weh.', options: ['Richtig', 'Falsch'], answer: 1 },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Schreiben – Teil 1: Erörterung',
      instructions: 'Schreiben Sie einen argumentativen Text zu einer kontroversen Frage (ca. 230 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-c1-2-s1', part: 6, taskNumber: 1,
          stimulusLabel: 'Erörterung',
          stimulus: 'Zum Thema "Sollte die Vier-Tage-Woche zum Standard werden?" gibt es geteilte Meinungen. Verfassen Sie einen argumentativen Text, in dem Sie das Für und Wider differenziert abwägen und zu einer begründeten eigenen Position gelangen.',
          text: 'Schreiben Sie eine Erörterung (ca. 230 Wörter): 1) Führen Sie differenziert in die Problematik ein, 2) stellen Sie Argumente der Befürworter dar, 3) stellen Sie Gegenargumente dar, 4) entwickeln Sie eine begründete eigene Position, 5) schließen Sie mit einem Fazit. Achten Sie auf gehobenen Stil, komplexe Strukturen und geeignete Konnektoren.',
          minWords: 200,
        },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 2: Formeller Brief',
      instructions: 'Schreiben Sie eine formelle Stellungnahme (ca. 120 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-c1-2-s2', part: 7, taskNumber: 2,
          stimulusLabel: 'Formelle Stellungnahme',
          stimulus: 'Situation: Ein Verlag hat Sie gebeten, als Fachperson eine Stellungnahme zu einem geplanten Ratgeber über "Erfolgreich scheitern" zu verfassen, weil das Konzept intern umstritten ist.',
          text: 'Schreiben Sie eine formelle Stellungnahme an den Verlag (ca. 120 Wörter): 1) nehmen Sie Bezug auf das geplante Buchprojekt, 2) legen Sie Ihre Einschätzung dar (Chancen und Risiken des Konzepts), 3) begründen Sie diese, 4) geben Sie eine klare Empfehlung. Achten Sie auf einen sachlichen, differenzierten und formellen Stil.',
          minWords: 110,
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Sprechen – Teil 1: Vortrag',
      instructions: 'Halten Sie einen strukturierten Vortrag zu einem abstrakten Thema.',
      questions: [
        {
          type: 'speak', id: 'g-c1-2-sp1', part: 8, partNumber: 1,
          text: 'Halten Sie einen Vortrag (ca. 4 Minuten) zum Thema "Freiheit und Verantwortung". Präsentieren Sie das Thema differenziert und beziehen Sie eine begründete Position.',
          cueCard: 'Thema: Freiheit und Verantwortung\n\nStruktur:\n• Einleitung: Was bedeutet Freiheit?\n• Freiheit als Wert und ihre Grenzen\n• Der Zusammenhang von Freiheit und Verantwortung\n• Beispiele (z. B. Meinungsfreiheit, individuelle Entscheidungen)\n• Ihre eigene, begründete Position\n• Abschluss und Ausblick',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 2: Diskussion',
      instructions: 'Diskutieren Sie kontrovers mit Ihrem Partner und verteidigen Sie Ihren Standpunkt.',
      questions: [
        {
          type: 'speak', id: 'g-c1-2-sp2', part: 9, partNumber: 2,
          text: 'Diskutieren Sie die These: "Der Staat sollte ungesundes Verhalten (z. B. durch Steuern auf Zucker oder Tabak) aktiv steuern." Vertreten Sie einen Standpunkt und gehen Sie auf die Argumente Ihres Partners ein.',
          cueCard: 'These: "Der Staat sollte ungesundes Verhalten aktiv steuern."\n\nAspekte:\n• Schutz der Gesundheit und Entlastung des Gesundheitssystems\n• individuelle Freiheit und Eigenverantwortung\n• soziale Gerechtigkeit (wen treffen solche Steuern?)\n• Wirksamkeit solcher Maßnahmen\n\nRedemittel (C1): "Es lässt sich kaum bestreiten, dass ..." – "Dagegen spricht allerdings ..." – "Bei aller Berechtigung dieses Arguments ..."',
        },
      ],
    },
  ],
};

export default mock;
