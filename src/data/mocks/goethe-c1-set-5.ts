import type { MockExam } from './types';

// Goethe-Zertifikat C1 — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/c1-5/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'c1-5',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat C1 – Übungstest 5',
  subtitle: 'Lesen · Hören · Schreiben · Sprechen',
  timeMinutes: 190,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Lesen – Teil 1: Sachtext',
      instructions: 'Lesen Sie den Text zum Thema "Konsum und Glück" und beantworten Sie die Fragen.',
      passage: `Die Tretmühle des Konsums\n\nEs ist eine Erfahrung, die viele kennen: Der lang ersehnte Kauf – ein neues Auto, das neueste Smartphone – bereitet zunächst große Freude. Doch schon nach kurzer Zeit verblasst das Glücksgefühl, und ein neues Verlangen tritt an seine Stelle. Die Psychologie nennt dieses Phänomen "hedonistische Adaptation": Wir gewöhnen uns erstaunlich schnell an neue Umstände, seien sie gut oder schlecht.\n\nDiese Anpassungsfähigkeit ist evolutionär durchaus sinnvoll, führt im Kontext der modernen Konsumgesellschaft jedoch in eine Art Tretmühle. Wir laufen immer schneller, um dasselbe Glücksniveau zu halten, erreichen aber nie einen dauerhaften Zustand der Zufriedenheit. Die Werbung nutzt und verstärkt diesen Mechanismus, indem sie unaufhörlich neue Bedürfnisse weckt.\n\nInteressant ist, dass die Forschung deutliche Unterschiede zwischen dem Kauf von Dingen und dem von Erlebnissen feststellt. Materielle Güter unterliegen der Adaptation besonders stark – das neue Auto wird bald zur Selbstverständlichkeit. Erlebnisse hingegen, etwa eine Reise oder ein gemeinsames Konzert, stiften oft nachhaltigeres Glück. Der Grund: Sie werden Teil unserer Erinnerung und unserer Identität, und sie sind meist mit sozialen Beziehungen verbunden.\n\nDaraus lässt sich eine praktische Konsequenz ziehen. Wer sein Wohlbefinden steigern möchte, sollte weniger in Dinge und mehr in Erfahrungen und Beziehungen investieren. Die eigentliche Erkenntnis aber reicht tiefer: Dauerhaftes Glück lässt sich nicht kaufen, weil es nicht im Besitzen liegt, sondern im Erleben, im Verbinden und im Sinnfinden. Die Tretmühle zu verlassen bedeutet nicht, auf allen Konsum zu verzichten, sondern zu erkennen, dass er nur begrenzt glücklich macht.`,
      passageTitle: 'Text: Die Tretmühle des Konsums',
      questions: [
        { type: 'mcq', id: 'g-c1-5-l1', part: 1, text: 'Wie nennt die Psychologie das Verblassen des Glücksgefühls nach einem Kauf?', options: ['Kaufreue', 'Hedonistische Adaptation', 'Konsumrausch'], answer: 1 },
        { type: 'mcq', id: 'g-c1-5-l2', part: 1, text: 'Wozu führt diese Anpassungsfähigkeit in der Konsumgesellschaft?', options: ['In eine Art Tretmühle ohne dauerhaftes Glück', 'Zu weniger Konsum', 'Zu dauerhafter Zufriedenheit'], answer: 0 },
        { type: 'mcq', id: 'g-c1-5-l3', part: 1, text: 'Welchen Unterschied stellt die Forschung fest?', options: ['Zwischen teuren und billigen Dingen', 'Zwischen dem Kauf von Dingen und dem von Erlebnissen', 'Es gibt keinen Unterschied'], answer: 1 },
        { type: 'mcq', id: 'g-c1-5-l4', part: 1, text: 'Warum stiften Erlebnisse oft nachhaltigeres Glück?', options: ['Weil man sie besitzen kann', 'Weil sie teurer sind', 'Weil sie Teil der Erinnerung und Identität werden und mit Beziehungen verbunden sind'], answer: 2 },
        { type: 'mcq', id: 'g-c1-5-l5', part: 1, text: 'Was bedeutet laut Schluss "die Tretmühle zu verlassen"?', options: ['Zu erkennen, dass Konsum nur begrenzt glücklich macht', 'Mehr zu kaufen', 'Auf allen Konsum zu verzichten'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lesen – Teil 2: Kommentar',
      instructions: 'Lesen Sie den Kommentar zum Thema "Meinungsfreiheit" und beantworten Sie die Fragen.',
      passage: `Die Grenzen der Meinungsfreiheit\n\nDie Meinungsfreiheit gehört zu den kostbarsten Errungenschaften demokratischer Gesellschaften. Ohne sie wäre keine offene Debatte, kein wissenschaftlicher Fortschritt, keine Kritik an der Macht denkbar. Umso wichtiger ist es, sie zu verteidigen. Doch gerade weil sie so wichtig ist, verdient sie eine differenzierte Betrachtung.\n\nEin verbreitetes Missverständnis besteht darin, Meinungsfreiheit mit Folgenlosigkeit zu verwechseln. Wer eine Meinung äußert, hat das Recht, dies ohne staatliche Verfolgung zu tun. Er hat jedoch nicht das Recht, vor Widerspruch, Kritik oder gesellschaftlicher Ablehnung geschützt zu werden. "Ich darf das sagen" bedeutet nicht "niemand darf mir widersprechen". Freiheit der Rede schließt die Freiheit der Gegenrede ein.\n\nZudem war die Meinungsfreiheit noch nie grenzenlos. Aufruf zu Gewalt, Verleumdung oder Volksverhetzung sind in den meisten Rechtsordnungen zu Recht verboten. Die schwierige Frage ist stets, wo genau die Grenze verläuft – und diese Frage muss in einer Demokratie immer wieder neu ausgehandelt werden.\n\nEine besondere Herausforderung stellt das digitale Zeitalter dar. Nie zuvor konnten Meinungen so schnell und weit verbreitet werden, im Guten wie im Schlechten. Die Debatte über die Verantwortung von Plattformen ist Ausdruck dieser neuen Realität. Letztlich gilt: Die Meinungsfreiheit zu schützen bedeutet nicht, jede Äußerung gutzuheißen, sondern das Recht auf freie Rede und das Recht auf Widerspruch gleichermaßen ernst zu nehmen – und die Debatte darüber, wo Freiheit in Schaden umschlägt, mit Augenmaß zu führen.`,
      passageTitle: 'Kommentar: Grenzen der Meinungsfreiheit',
      questions: [
        { type: 'mcq', id: 'g-c1-5-l6', part: 2, text: 'Worin besteht laut Text ein verbreitetes Missverständnis?', options: ['Meinungsfreiheit mit Folgenlosigkeit zu verwechseln', 'Meinungsfreiheit zu verteidigen', 'Zu widersprechen'], answer: 0 },
        { type: 'mcq', id: 'g-c1-5-l7', part: 2, text: 'Was schließt die Freiheit der Rede laut Autor ein?', options: ['Den Schutz vor Widerspruch', 'Die Freiheit der Gegenrede', 'Das Verbot von Kritik'], answer: 1 },
        { type: 'mcq', id: 'g-c1-5-l8', part: 2, text: 'Was sagt der Text über die Grenzen der Meinungsfreiheit?', options: ['Sie war noch nie grenzenlos (z. B. Aufruf zu Gewalt ist verboten)', 'Es gibt keine Grenzen', 'Sie war schon immer grenzenlos'], answer: 0 },
        { type: 'mcq', id: 'g-c1-5-l9', part: 2, text: 'Welche besondere Herausforderung nennt der Autor?', options: ['Das digitale Zeitalter mit seiner schnellen Verbreitung', 'Das Fehlen von Meinungen', 'Zu wenig Debatte'], answer: 0 },
        { type: 'mcq', id: 'g-c1-5-l10', part: 2, text: 'Was bedeutet laut Schluss der Schutz der Meinungsfreiheit?', options: ['Widerspruch zu verbieten', 'Jede Äußerung gutzuheißen', 'Recht auf freie Rede und Recht auf Widerspruch gleichermaßen ernst zu nehmen'], answer: 2 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Lesen – Teil 3: Meinungen zuordnen',
      instructions: 'Vier Personen äußern sich zum Thema "Zukunft der Städte". Ordnen Sie die Fragen zu.',
      passage: `Person A (Verkehrsplaner Herr Schulz): Die Zukunft gehört der kompakten Stadt der kurzen Wege. Wenn Wohnen, Arbeiten und Einkaufen nah beieinander liegen, reduziert das den Verkehr drastisch und steigert die Lebensqualität. Das Auto verliert seine dominante Rolle.\n\nPerson B (Soziologin Frau Peters): Ich warne vor einer rein technokratischen Sicht. Man kann Städte nicht am Reißbrett planen und dabei die Menschen vergessen. Entscheidend ist, dass Bewohner mitgestalten können. Sonst entstehen zwar effiziente, aber seelenlose Orte.\n\nPerson C (Ökonom Dr. Brandt): Wir dürfen die Kostenfrage nicht ausblenden. Der Umbau von Städten ist enorm teuer. Ich plädiere für pragmatische, schrittweise Lösungen statt für teure Utopien, die am Ende an der Finanzierung scheitern.\n\nPerson D (Aktivistin Frau Öztürk): Für mich ist die soziale Frage zentral. Jede Aufwertung von Stadtvierteln droht, ärmere Bewohner zu verdrängen. Eine gute Stadt der Zukunft muss vor allem eine gerechte Stadt sein, in der auch Menschen mit wenig Geld einen Platz haben.`,
      passageTitle: 'Meinungen: Zukunft der Städte',
      questions: [
        { type: 'mcq', id: 'g-c1-5-l11', part: 3, text: 'Wer stellt die soziale Gerechtigkeit und die Gefahr der Verdrängung in den Mittelpunkt?', options: ['Person B (Frau Peters)', 'Person C (Dr. Brandt)', 'Person D (Frau Öztürk)', 'Person A (Herr Schulz)'], answer: 2 },
        { type: 'mcq', id: 'g-c1-5-l12', part: 3, text: 'Wer betont die Kostenfrage und plädiert für pragmatische, schrittweise Lösungen?', options: ['Person A (Herr Schulz)', 'Person B (Frau Peters)', 'Person C (Dr. Brandt)', 'Person D (Frau Öztürk)'], answer: 2 },
        { type: 'mcq', id: 'g-c1-5-l13', part: 3, text: 'Wer setzt auf die kompakte "Stadt der kurzen Wege"?', options: ['Person D (Frau Öztürk)', 'Person A (Herr Schulz)', 'Person B (Frau Peters)', 'Person C (Dr. Brandt)'], answer: 1 },
        { type: 'mcq', id: 'g-c1-5-l14', part: 3, text: 'Wer warnt vor einer rein technokratischen Planung ohne Beteiligung der Bewohner?', options: ['Person C (Dr. Brandt)', 'Person D (Frau Öztürk)', 'Person A (Herr Schulz)', 'Person B (Frau Peters)'], answer: 3 },
      ],
    },
    {
      part: 4, skill: 'listening', title: 'Hören – Teil 1: Diskussion',
      instructions: 'Sie hören eine Diskussion. Wählen Sie zu jeder Aufgabe die richtige Antwort.',
      audioUrl: '/audio/goethe/c1-5/hoeren-teil1.mp3',
      transcript: `Moderator: Heute diskutieren wir über die Frage: Brauchen wir noch Bibliotheken im digitalen Zeitalter? Frau Dr. Ahrens, Sie leiten eine Stadtbibliothek.\nDr. Ahrens: Absolut brauchen wir sie – vielleicht mehr denn je. Aber ihre Rolle hat sich gewandelt. Bibliotheken sind längst nicht mehr nur Bücherlager. Sie sind Orte des Lernens, der Begegnung, der Teilhabe. Für viele Menschen ohne eigenen Internetzugang sind sie das Tor zur digitalen Welt.\nModerator: Herr Vogel, Sie sind da skeptischer.\nHerr Vogel: Nicht grundsätzlich. Aber ich stelle die Kostenfrage. In Zeiten knapper Kassen muss man fragen, ob teure Gebäude noch zeitgemäß sind, wenn Wissen zunehmend digital verfügbar ist. Vielleicht wären digitale Angebote effizienter.\nDr. Ahrens: Dieser Einwand verkennt die soziale Funktion. Wer sagt, alles sei digital verfügbar, denkt aus der Perspektive der Privilegierten. Gerade die Bibliothek ist ein Ort, der allen offensteht, unabhängig vom Geldbeutel. Diesen offenen, kostenlosen Raum durch rein digitale Angebote zu ersetzen, würde viele ausschließen.\nHerr Vogel: Da ist etwas dran. Vielleicht sollte man nicht zwischen analog und digital entscheiden, sondern beides klug verbinden.\nDr. Ahrens: Genau das tun moderne Bibliotheken bereits.`,
      questions: [
        { type: 'mcq', id: 'g-c1-5-h1', part: 4, text: 'Wie hat sich laut Dr. Ahrens die Rolle der Bibliotheken gewandelt?', options: ['Sie sind reine Bücherlager geworden', 'Sie sind Orte des Lernens, der Begegnung und Teilhabe', 'Sie sind überflüssig geworden'], answer: 1 },
        { type: 'mcq', id: 'g-c1-5-h2', part: 4, text: 'Was ist Herrn Vogels Haupteinwand?', options: ['Dass Bibliotheken zu klein sind', 'Die Kostenfrage angesichts knapper Kassen', 'Dass niemand mehr liest'], answer: 1 },
        { type: 'mcq', id: 'g-c1-5-h3', part: 4, text: 'Welche Funktion betont Dr. Ahrens besonders?', options: ['Die soziale Funktion als offener, kostenloser Raum für alle', 'Die dekorative Funktion', 'Die kommerzielle Funktion'], answer: 0 },
        { type: 'mcq', id: 'g-c1-5-h4', part: 4, text: 'Worauf einigen sich beide am Ende in etwa?', options: ['Bibliotheken abzuschaffen', 'Analog und digital klug zu verbinden', 'Nur noch digital anzubieten'], answer: 1 },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Hören – Teil 2: Vortrag',
      instructions: 'Sie hören einen Vortrag. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/c1-5/hoeren-teil2.mp3',
      transcript: `Sehr geehrte Damen und Herren, mein heutiger Vortrag gilt einem oft übersehenen Aspekt des menschlichen Zusammenlebens: der Bedeutung von Ritualen. In einer zunehmend rationalisierten Welt gelten Rituale manchen als überholt, als bloße Relikte einer vergangenen Zeit. Ich möchte für eine Neubewertung plädieren.\n\nRituale – ob religiöse Feste, familiäre Gewohnheiten oder gesellschaftliche Zeremonien – erfüllen wichtige Funktionen. Sie geben unserem Leben Struktur und Orientierung. Sie markieren Übergänge: Geburt, Erwachsenwerden, Heirat, Tod. Ohne solche Markierungen verschwimmen die Phasen des Lebens zu einem gestaltlosen Kontinuum.\n\nZudem stiften Rituale Gemeinschaft. Wer gemeinsam feiert, trauert oder gedenkt, erlebt Zugehörigkeit. Das gemeinsame Tun verbindet, oft stärker als Worte es könnten. Nicht zufällig entwickeln auch Gruppen ohne religiösen Hintergrund eigene Rituale.\n\nGewiss können Rituale auch erstarren und zur leeren Hülle werden, zur bloßen Pflichtübung ohne inneren Gehalt. Diese Gefahr besteht. Doch die Antwort darauf kann nicht die Abschaffung aller Rituale sein, sondern ihre bewusste Gestaltung und Erneuerung. Der moderne Mensch, der glaubt, ohne Rituale auszukommen, täuscht sich meist – er hat sie nur durch andere ersetzt, oft weniger bewusste. Die Frage ist daher nicht, ob wir Rituale brauchen, sondern welche Rituale wir uns geben wollen.`,
      questions: [
        { type: 'mcq', id: 'g-c1-5-h5', part: 5, text: 'Der Redner plädiert für eine Neubewertung von Ritualen.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-c1-5-h6', part: 5, text: 'Laut Vortrag markieren Rituale wichtige Übergänge im Leben.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-c1-5-h7', part: 5, text: 'Der Redner sagt, Rituale könnten niemals erstarren.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-c1-5-h8', part: 5, text: 'Laut Redner kommt der moderne Mensch meist ganz ohne Rituale aus.', options: ['Falsch', 'Richtig'], answer: 0 },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Schreiben – Teil 1: Erörterung',
      instructions: 'Schreiben Sie einen argumentativen Text zu einer kontroversen Frage (ca. 230 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-c1-5-s1', part: 6, taskNumber: 1,
          stimulusLabel: 'Erörterung',
          stimulus: 'Zum Thema "Sollten öffentliche Bibliotheken und Kultureinrichtungen auch in Zeiten knapper Kassen finanziert werden?" gibt es geteilte Meinungen. Verfassen Sie einen argumentativen Text, in dem Sie das Für und Wider differenziert abwägen und zu einer begründeten Position gelangen.',
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
          type: 'write', id: 'g-c1-5-s2', part: 7, taskNumber: 2,
          stimulusLabel: 'Formelle Stellungnahme',
          stimulus: 'Situation: Ihre Stadt erwägt, aus Spargründen mehrere Stadtteilbibliotheken zu schließen. Als engagierte/r Bürger/in möchten Sie sich schriftlich an die Stadtverwaltung wenden.',
          text: 'Schreiben Sie eine formelle Stellungnahme an die Stadtverwaltung (ca. 120 Wörter): 1) beziehen Sie Position zur geplanten Schließung, 2) legen Sie Ihre Argumente dar, 3) gehen Sie auf das Spar-Argument der Stadt ein, 4) formulieren Sie eine klare Forderung oder Alternative. Achten Sie auf einen sachlichen, überzeugenden und formellen Stil.',
          minWords: 110,
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Sprechen – Teil 1: Vortrag',
      instructions: 'Halten Sie einen strukturierten Vortrag zu einem abstrakten Thema.',
      questions: [
        {
          type: 'speak', id: 'g-c1-5-sp1', part: 8, partNumber: 1,
          text: 'Halten Sie einen Vortrag (ca. 4 Minuten) zum Thema "Individuum und Gemeinschaft". Präsentieren Sie das Thema differenziert und beziehen Sie eine begründete Position.',
          cueCard: 'Thema: Individuum und Gemeinschaft\n\nStruktur:\n• Einleitung: Spannung zwischen individueller Freiheit und Gemeinwohl\n• Wert der Selbstverwirklichung des Einzelnen\n• Bedeutung von Solidarität und Gemeinschaft\n• Beispiele für den Konflikt (z. B. in Krisen)\n• Ihre eigene, begründete Position\n• Abschluss und Ausblick',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 2: Diskussion',
      instructions: 'Diskutieren Sie kontrovers mit Ihrem Partner und verteidigen Sie Ihren Standpunkt.',
      questions: [
        {
          type: 'speak', id: 'g-c1-5-sp2', part: 9, partNumber: 2,
          text: 'Diskutieren Sie die These: "Kunst und Kultur sind ein Luxus, den sich eine Gesellschaft in Krisenzeiten nicht leisten sollte." Vertreten Sie einen Standpunkt und gehen Sie auf die Argumente Ihres Partners ein.',
          cueCard: 'These: "Kunst und Kultur sind ein Luxus in Krisenzeiten."\n\nAspekte:\n• wirtschaftliche Prioritäten in der Krise\n• gesellschaftliche und psychologische Bedeutung von Kultur\n• Kultur als Wirtschaftsfaktor und Identitätsstifter\n• Frage der Verteilungsgerechtigkeit\n\nRedemittel (C1): "Auf den ersten Blick mag es einleuchten, dass ..., bei genauerem Hinsehen jedoch ..." – "Ich möchte dem entgegenhalten, dass ..." – "Letztlich stellt sich die grundsätzliche Frage, was eine Gesellschaft ausmacht."',
        },
      ],
    },
  ],
};

export default mock;
