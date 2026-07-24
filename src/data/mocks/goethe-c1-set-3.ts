import type { MockExam } from './types';

// Goethe-Zertifikat C1 — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/c1-3/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'c1-3',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat C1 – Übungstest 3',
  subtitle: 'Lesen · Hören · Schreiben · Sprechen',
  timeMinutes: 190,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Lesen – Teil 1: Sachtext',
      instructions: 'Lesen Sie den Text zum Thema "Zeit" und beantworten Sie die Fragen.',
      passage: `Die Beschleunigung des Lebens\n\nWir leben schneller als je zuvor. Kommunikation erfolgt in Echtzeit, Waren werden binnen Stunden geliefert, und selbst die Freizeit wird zunehmend nach Effizienzkriterien organisiert. Der Soziologe Hartmut Rosa hat für dieses Phänomen den Begriff der "sozialen Beschleunigung" geprägt. Doch was bedeutet es für den Menschen, wenn sich das Tempo des Lebens unaufhörlich steigert?\n\nParadox ist zunächst, dass wir trotz aller zeitsparenden Technologien nicht etwa mehr freie Zeit gewonnen haben, sondern uns im Gegenteil oft gehetzter fühlen. Der Grund liegt darin, dass die eingesparte Zeit nicht in Muße investiert, sondern mit zusätzlichen Aktivitäten gefüllt wird. Jede Effizienzsteigerung erhöht die Erwartung, in derselben Zeit noch mehr zu leisten.\n\nDiese permanente Beschleunigung hat ihren Preis. Das Gefühl, ständig hinterherzuhinken, nie genug zu tun, erzeugt einen chronischen Stress, der krank machen kann. Zudem, so die Kritik, geht durch die Hektik etwas Wesentliches verloren: die Fähigkeit zur vertieften Auseinandersetzung, zum Innehalten, zur echten Begegnung.\n\nAls Gegenbewegung entstehen Phänomene wie die "Entschleunigung" oder die "Slow"-Bewegungen, von Slow Food bis Slow Travel. Sie sind Ausdruck einer wachsenden Sehnsucht nach einem anderen Verhältnis zur Zeit. Ob es sich dabei um eine echte Alternative oder lediglich um ein Nischenphänomen für Privilegierte handelt, bleibt umstritten. Klar aber ist: Die Frage, wie wir mit unserer Zeit umgehen wollen, ist eine der zentralen Fragen unserer Gegenwart.`,
      passageTitle: 'Text: Die Beschleunigung des Lebens',
      questions: [
        { type: 'mcq', id: 'g-c1-3-l1', part: 1, text: 'Welchen Begriff hat der Soziologe Hartmut Rosa geprägt?', options: ['Digitale Revolution', 'Freie Zeit', 'Soziale Beschleunigung'], answer: 2 },
        { type: 'mcq', id: 'g-c1-3-l2', part: 1, text: 'Welches Paradox nennt der Text?', options: ['Trotz zeitsparender Technik fühlen wir uns gehetzter', 'Wir haben viel mehr Freizeit', 'Technik verlangsamt alles'], answer: 0 },
        { type: 'mcq', id: 'g-c1-3-l3', part: 1, text: 'Warum haben wir laut Text nicht mehr freie Zeit gewonnen?', options: ['Weil niemand arbeitet', 'Weil Technik nicht funktioniert', 'Weil eingesparte Zeit mit zusätzlichen Aktivitäten gefüllt wird'], answer: 2 },
        { type: 'mcq', id: 'g-c1-3-l4', part: 1, text: 'Was geht laut Kritik durch die Hektik verloren?', options: ['Das Geld', 'Die Technik', 'Die Fähigkeit zur vertieften Auseinandersetzung und zum Innehalten'], answer: 2 },
        { type: 'mcq', id: 'g-c1-3-l5', part: 1, text: 'Wie bewertet der Text die "Slow"-Bewegungen?', options: ['Als eindeutig überlegen', 'Es bleibt umstritten, ob sie echte Alternative oder Nischenphänomen sind', 'Als völlig sinnlos'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lesen – Teil 2: Kommentar',
      instructions: 'Lesen Sie den Kommentar zum Thema "Reisen" und beantworten Sie die Fragen.',
      passage: `Vom Sinn und Unsinn des Reisens\n\nReisen gilt als eines der höchsten Güter unserer Zeit. Es verspricht Erholung, Horizonterweiterung, das Erleben des Fremden. Kaum jemand würde offen bestreiten, dass Reisen bildet und bereichert. Doch bei näherem Hinsehen verdient dieses Ideal eine kritische Betrachtung.\n\nZunächst stellt sich die Frage, ob das moderne Massentourismus-Reisen dem hehren Anspruch überhaupt gerecht wird. Wer im Schnelldurchlauf zwölf Länder in zehn Tagen "abhakt", der sammelt Fotos und Vorzeigemomente, doch von echter Begegnung mit einer fremden Kultur kann kaum die Rede sein. Das Fremde wird zur Kulisse, das Reisen zum Konsum.\n\nHinzu kommt die ökologische Dimension. Der Tourismus, insbesondere der Flugverkehr, trägt erheblich zum Klimawandel bei. Ausgerechnet die Sehnsucht, unberührte Natur und ferne Kulturen zu erleben, beschleunigt deren Zerstörung – ein tragischer Widerspruch.\n\nDoch wäre es voreilig, das Reisen pauschal zu verurteilen. Der Fehler liegt nicht im Reisen selbst, sondern in einer bestimmten Art zu reisen. Wer sich Zeit nimmt, sich einlässt, die Sprache zu lernen versucht und mit Menschen ins Gespräch kommt, für den kann Reisen tatsächlich das Bewusstsein erweitern. Vielleicht liegt die Zukunft des Reisens im "Weniger, aber Intensiver": seltener, dafür bewusster und respektvoller. Reisen als Haltung, nicht als bloßer Konsum – darin läge sein eigentlicher, bleibender Wert.`,
      passageTitle: 'Kommentar: Sinn des Reisens',
      questions: [
        { type: 'mcq', id: 'g-c1-3-l6', part: 2, text: 'Was verdient laut Autor eine kritische Betrachtung?', options: ['Nichts am Reisen', 'Das Ideal des Reisens', 'Nur das Fliegen'], answer: 1 },
        { type: 'mcq', id: 'g-c1-3-l7', part: 2, text: 'Was kritisiert der Autor am Massentourismus?', options: ['Das Fremde wird zur Kulisse, echtes Erleben fehlt', 'Er ist zu teuer', 'Er ist zu langsam'], answer: 0 },
        { type: 'mcq', id: 'g-c1-3-l8', part: 2, text: 'Welchen "tragischen Widerspruch" nennt der Text?', options: ['Reisen macht müde', 'Die Sehnsucht nach unberührter Natur beschleunigt deren Zerstörung', 'Reisen ist verboten'], answer: 1 },
        { type: 'mcq', id: 'g-c1-3-l9', part: 2, text: 'Worin liegt laut Autor der Fehler?', options: ['In den Reisezielen', 'Im Reisen selbst', 'In einer bestimmten Art zu reisen'], answer: 2 },
        { type: 'mcq', id: 'g-c1-3-l10', part: 2, text: 'Worin sieht der Autor die Zukunft des Reisens?', options: ['Im noch schnelleren Reisen', 'Im völligen Verzicht', 'Im "Weniger, aber Intensiver"'], answer: 2 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Lesen – Teil 3: Meinungen zuordnen',
      instructions: 'Vier Personen äußern sich zum Thema "Gleichberechtigung im Beruf". Ordnen Sie die Fragen zu.',
      passage: `Person A (Personalchefin Frau Roth): Wir haben feste Quoten eingeführt, und ich bin überzeugt, dass das nötig war. Ohne solche verbindlichen Regeln ändert sich in der Praxis zu wenig. Freiwilligkeit allein reicht nicht, das hat die Erfahrung gezeigt.\n\nPerson B (Berater Herr Fuchs): Quoten halte ich für den falschen Weg. Sie erzeugen den Verdacht, jemand habe eine Position nicht wegen seiner Leistung, sondern wegen seines Geschlechts bekommen. Das schadet am Ende gerade denen, die man fördern will.\n\nPerson C (Wissenschaftlerin Dr. Bauer): Die Debatte greift oft zu kurz, weil sie sich auf Führungspositionen konzentriert. Das eigentliche Problem liegt tiefer: in der ungleichen Verteilung der unbezahlten Sorgearbeit, die noch immer überwiegend Frauen leisten. Solange sich das nicht ändert, bleiben alle anderen Maßnahmen Symbolpolitik.\n\nPerson D (Unternehmer Herr Weiß): Ich sehe das aus praktischer Sicht: Vielfalt in Teams zahlt sich schlicht aus. Studien zeigen, dass gemischte Teams bessere Entscheidungen treffen. Für mich ist Gleichberechtigung deshalb nicht nur eine Frage der Gerechtigkeit, sondern auch des wirtschaftlichen Erfolgs.`,
      passageTitle: 'Meinungen: Gleichberechtigung im Beruf',
      questions: [
        { type: 'mcq', id: 'g-c1-3-l11', part: 3, text: 'Wer sieht das eigentliche Problem in der ungleichen Verteilung der Sorgearbeit?', options: ['Person B (Herr Fuchs)', 'Person C (Dr. Bauer)', 'Person D (Herr Weiß)', 'Person A (Frau Roth)'], answer: 1 },
        { type: 'mcq', id: 'g-c1-3-l12', part: 3, text: 'Wer lehnt Quoten ab, weil sie einen falschen Verdacht erzeugen?', options: ['Person A (Frau Roth)', 'Person B (Herr Fuchs)', 'Person C (Dr. Bauer)', 'Person D (Herr Weiß)'], answer: 1 },
        { type: 'mcq', id: 'g-c1-3-l13', part: 3, text: 'Wer argumentiert vor allem mit dem wirtschaftlichen Nutzen von Vielfalt?', options: ['Person D (Herr Weiß)', 'Person A (Frau Roth)', 'Person B (Herr Fuchs)', 'Person C (Dr. Bauer)'], answer: 0 },
        { type: 'mcq', id: 'g-c1-3-l14', part: 3, text: 'Wer hält verbindliche Quoten für notwendig?', options: ['Person C (Dr. Bauer)', 'Person D (Herr Weiß)', 'Person A (Frau Roth)', 'Person B (Herr Fuchs)'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'listening', title: 'Hören – Teil 1: Diskussion',
      instructions: 'Sie hören eine Diskussion. Wählen Sie zu jeder Aufgabe die richtige Antwort.',
      audioUrl: '/audio/goethe/c1-3/hoeren-teil1.mp3',
      transcript: `Moderatorin: Unser Thema heute ist das Verhältnis von Stadt und Natur. Herr Architekt Sommer, Sie plädieren für mehr Grün in den Städten. Warum?\nHerr Sommer: Weil unsere Städte krank machen, wenn wir sie nur als Wohn- und Verkehrsmaschinen begreifen. Grünflächen, Parks, begrünte Dächer – das ist kein Luxus, sondern eine Notwendigkeit für die physische und psychische Gesundheit der Menschen. Zudem kühlen Pflanzen die aufgeheizten Städte und binden Schadstoffe.\nModeratorin: Frau Stadtplanerin Weber, Sie sehen auch Grenzen.\nFrau Weber: Ich teile das Ziel vollkommen. Aber wir müssen ehrlich sein: In dicht bebauten Städten konkurriert jede Grünfläche mit dem dringend benötigten Wohnraum. Wenn wir mehr Parks anlegen und gleichzeitig die Mieten bezahlbar halten wollen, geraten wir in einen echten Zielkonflikt.\nHerr Sommer: Das stimmt, aber ich halte das für einen Scheinwiderspruch. Kluge Planung kann beides verbinden – etwa durch vertikale Begrünung oder die Umnutzung versiegelter Flächen wie alter Parkplätze.\nFrau Weber: Solche Lösungen sind gut, aber sie sind teuer und nicht überall umsetzbar. Ich warne davor, die Sache zu einfach darzustellen.\nModeratorin: Es bleibt also ein Abwägen zwischen verschiedenen berechtigten Interessen.\nFrau Weber: Genau. Und diese Abwägung sollte transparent und demokratisch erfolgen.`,
      questions: [
        { type: 'mcq', id: 'g-c1-3-h1', part: 4, text: 'Warum plädiert Herr Sommer für mehr Grün in den Städten?', options: ['Um Wohnraum zu reduzieren', 'Aus rein ästhetischen Gründen', 'Wegen der Gesundheit der Menschen und der Kühlung der Städte'], answer: 2 },
        { type: 'mcq', id: 'g-c1-3-h2', part: 4, text: 'Welchen Zielkonflikt nennt Frau Weber?', options: ['Es gibt zu viele Parks', 'Pflanzen sind ungesund', 'Grünflächen konkurrieren mit dringend benötigtem Wohnraum'], answer: 2 },
        { type: 'mcq', id: 'g-c1-3-h3', part: 4, text: 'Wie bezeichnet Herr Sommer diesen Konflikt?', options: ['Als unlösbar', 'Als Scheinwiderspruch, den kluge Planung lösen kann', 'Als unwichtig'], answer: 1 },
        { type: 'mcq', id: 'g-c1-3-h4', part: 4, text: 'Wovor warnt Frau Weber?', options: ['Vor demokratischen Entscheidungen', 'Vor zu viel Grün', 'Davor, die Sache zu einfach darzustellen'], answer: 2 },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Hören – Teil 2: Vortrag',
      instructions: 'Sie hören einen Vortrag. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/c1-3/hoeren-teil2.mp3',
      transcript: `Sehr geehrte Damen und Herren, ich spreche heute über ein scheinbar simples Wort mit tiefgreifender Bedeutung: Vertrauen. Vertrauen ist der unsichtbare Kitt, der Gesellschaften zusammenhält. Ohne ein Mindestmaß an Vertrauen wäre kaum eine menschliche Kooperation denkbar.\n\nBetrachten wir den Alltag: Wir vertrauen darauf, dass die Ampel funktioniert, dass das Geld auf unserem Konto sicher ist, dass die Nachrichten, die wir lesen, nicht frei erfunden sind. Dieses Vertrauen erscheint uns selbstverständlich – bis es erschüttert wird.\n\nUnd genau hier liegt eine Herausforderung unserer Zeit. In vielen Gesellschaften ist ein Vertrauensverlust zu beobachten: Vertrauen in Institutionen, in die Politik, in die Medien, ja sogar in die Wissenschaft. Die Gründe sind vielfältig – Skandale, das Gefühl, nicht gehört zu werden, und nicht zuletzt die gezielte Verbreitung von Desinformation, die bewusst Zweifel sät.\n\nDer Wiederaufbau von Vertrauen ist mühsam, denn Vertrauen wird langsam aufgebaut und schnell zerstört. Er erfordert vor allem eines: Transparenz und Verlässlichkeit. Institutionen müssen Fehler eingestehen, statt sie zu vertuschen. Und jeder Einzelne trägt Verantwortung, etwa indem er Informationen prüft, bevor er sie weiterverbreitet. Eine Gesellschaft ohne Vertrauen zerfällt in misstrauische Einzelne. Vertrauen zu pflegen ist deshalb keine naive Gutgläubigkeit, sondern eine zivilisatorische Errungenschaft, die es zu schützen gilt.`,
      questions: [
        { type: 'mcq', id: 'g-c1-3-h5', part: 5, text: 'Der Redner bezeichnet Vertrauen als den unsichtbaren Kitt der Gesellschaft.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-c1-3-h6', part: 5, text: 'Laut Vortrag ist in vielen Gesellschaften ein Vertrauensgewinn zu beobachten.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-c1-3-h7', part: 5, text: 'Vertrauen wird laut Redner langsam aufgebaut und schnell zerstört.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-c1-3-h8', part: 5, text: 'Der Redner hält das Pflegen von Vertrauen für naive Gutgläubigkeit.', options: ['Falsch', 'Richtig'], answer: 0 },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Schreiben – Teil 1: Erörterung',
      instructions: 'Schreiben Sie einen argumentativen Text zu einer kontroversen Frage (ca. 230 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-c1-3-s1', part: 6, taskNumber: 1,
          stimulusLabel: 'Erörterung',
          stimulus: 'Zum Thema "Sollte man den Autoverkehr in Innenstädten zugunsten von Grünflächen und Fußgängern stark zurückdrängen?" gibt es geteilte Meinungen. Verfassen Sie einen argumentativen Text, in dem Sie das Für und Wider differenziert abwägen und zu einer begründeten Position gelangen.',
          text: 'Schreiben Sie eine Erörterung (ca. 230 Wörter): 1) Führen Sie differenziert in die Problematik ein, 2) stellen Sie Argumente dafür dar, 3) stellen Sie Gegenargumente dar, 4) entwickeln Sie eine begründete eigene Position, 5) schließen Sie mit einem Fazit. Achten Sie auf gehobenen Stil und geeignete Konnektoren.',
          minWords: 200,
        },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 2: Formeller Brief',
      instructions: 'Schreiben Sie eine formelle Stellungnahme (ca. 120 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-c1-3-s2', part: 7, taskNumber: 2,
          stimulusLabel: 'Formelle Stellungnahme',
          stimulus: 'Situation: Ihre Stadt plant, einen zentralen Platz komplett autofrei zu machen und zu begrünen. Als Vertreter/in einer Bürgerinitiative möchten Sie sich schriftlich an den Stadtrat wenden.',
          text: 'Schreiben Sie eine formelle Stellungnahme an den Stadtrat (ca. 120 Wörter): 1) beziehen Sie Position zum geplanten Projekt, 2) legen Sie Ihre Argumente dar, 3) gehen Sie auf mögliche Einwände ein, 4) formulieren Sie eine klare Forderung oder Empfehlung. Achten Sie auf einen sachlichen, überzeugenden und formellen Stil.',
          minWords: 110,
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Sprechen – Teil 1: Vortrag',
      instructions: 'Halten Sie einen strukturierten Vortrag zu einem abstrakten Thema.',
      questions: [
        {
          type: 'speak', id: 'g-c1-3-sp1', part: 8, partNumber: 1,
          text: 'Halten Sie einen Vortrag (ca. 4 Minuten) zum Thema "Tradition und Moderne". Präsentieren Sie das Thema differenziert und beziehen Sie eine begründete Position.',
          cueCard: 'Thema: Tradition und Moderne\n\nStruktur:\n• Einleitung: Was bedeuten Tradition und Moderne?\n• Wert von Traditionen (Identität, Zusammenhalt)\n• Notwendigkeit von Wandel und Erneuerung\n• Spannungen und mögliche Versöhnung beider\n• Ihre eigene, begründete Position\n• Abschluss und Ausblick',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 2: Diskussion',
      instructions: 'Diskutieren Sie kontrovers mit Ihrem Partner und verteidigen Sie Ihren Standpunkt.',
      questions: [
        {
          type: 'speak', id: 'g-c1-3-sp2', part: 9, partNumber: 2,
          text: 'Diskutieren Sie die These: "In Zeiten von Desinformation sollten Plattformen wie soziale Netzwerke stärker für Inhalte haften." Vertreten Sie einen Standpunkt und gehen Sie auf die Argumente Ihres Partners ein.',
          cueCard: 'These: "Plattformen sollten stärker für Inhalte haften."\n\nAspekte:\n• Schutz vor Desinformation und Hass\n• Meinungsfreiheit und Zensurgefahr\n• technische und praktische Umsetzbarkeit\n• Verantwortung von Plattformen versus Nutzern\n\nRedemittel (C1): "Zwar ... , doch ..." – "Man müsste hier differenzieren zwischen ..." – "Im Kern geht es um die Frage, wie ..."',
        },
      ],
    },
  ],
};

export default mock;
