import type { MockExam } from './types';

// Goethe-Zertifikat B2 — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/b2-5/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'b2-5',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat B2 – Übungstest 5',
  subtitle: 'Lesen · Hören · Schreiben · Sprechen',
  timeMinutes: 190,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Lesen – Teil 1: Standpunkte',
      instructions: 'Lesen Sie den Text zum Thema "Elektroautos" und beantworten Sie die Fragen.',
      passage: `Elektroautos: Die Lösung für den Verkehr der Zukunft?\n\nElektroautos gelten vielen als Schlüssel zu einer umweltfreundlicheren Mobilität. Sie fahren lokal emissionsfrei, sind leiser als Benzinfahrzeuge und ihre Technik entwickelt sich rasant. Regierungen fördern den Umstieg mit Prämien, und immer mehr Hersteller kündigen an, in Zukunft nur noch Elektroautos zu bauen.\n\nDoch so eindeutig, wie es zunächst scheint, ist die Sache nicht. Kritiker weisen darauf hin, dass ein Elektroauto nur dann wirklich klimafreundlich ist, wenn der Strom aus erneuerbaren Quellen stammt. Wird er aus Kohle gewonnen, verschiebt sich das Problem nur. Zudem ist die Herstellung der Batterien energieintensiv und erfordert seltene Rohstoffe, deren Abbau ökologische und soziale Probleme mit sich bringt.\n\nHinzu kommen praktische Fragen: Die Reichweite vieler Modelle ist begrenzt, das Laden dauert länger als das Tanken, und in vielen Regionen fehlt es noch an Ladestationen. Für Menschen ohne eigene Garage ist das Laden oft schwierig.\n\nDie meisten Fachleute sind sich einig: Das Elektroauto ist ein wichtiger Baustein, aber allein wird es die Verkehrsprobleme nicht lösen. Ebenso wichtig seien ein besserer öffentlicher Nahverkehr, mehr Radwege und insgesamt ein Umdenken – hin zu weniger und intelligenterer Mobilität.`,
      passageTitle: 'Text: Elektroautos',
      questions: [
        { type: 'mcq', id: 'g-b2-5-l1', part: 1, text: 'Welchen Vorteil von Elektroautos nennt der Text?', options: ['Sie brauchen keinen Strom', 'Sie fahren lokal emissionsfrei und sind leiser', 'Sie sind immer billiger'], answer: 1 },
        { type: 'mcq', id: 'g-b2-5-l2', part: 1, text: 'Wann ist ein Elektroauto laut Kritikern wirklich klimafreundlich?', options: ['Wenn der Strom aus erneuerbaren Quellen stammt', 'Nie', 'Immer'], answer: 0 },
        { type: 'mcq', id: 'g-b2-5-l3', part: 1, text: 'Welches praktische Problem wird genannt?', options: ['Es fehlt oft an Ladestationen', 'Elektroautos sind zu schnell', 'Sie sind zu laut'], answer: 0 },
        { type: 'mcq', id: 'g-b2-5-l4', part: 1, text: 'Worin sind sich die meisten Fachleute einig?', options: ['Elektroautos sind sinnlos', 'Elektroautos lösen alle Probleme allein', 'Das Elektroauto ist ein wichtiger Baustein, reicht aber allein nicht'], answer: 2 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lesen – Teil 2: Bericht',
      instructions: 'Lesen Sie den Text zum Thema "Glück" und beantworten Sie die Fragen.',
      passage: `Was macht uns wirklich glücklich? Erkenntnisse der Forschung\n\nGlück ist ein Ziel, das fast alle Menschen teilen – doch was bedeutet es eigentlich, und wie erreicht man es? Die Glücksforschung, ein noch junger Wissenschaftszweig, liefert erstaunliche Antworten, die vielen verbreiteten Annahmen widersprechen.\n\nEine der wichtigsten Erkenntnisse lautet: Ab einem gewissen Punkt macht mehr Geld nicht mehr glücklicher. Wer seine Grundbedürfnisse decken kann, gewinnt durch zusätzlichen Reichtum kaum mehr Zufriedenheit. Viel entscheidender sind soziale Beziehungen. Menschen mit engen Freundschaften und einer stabilen Familie sind nachweislich glücklicher und leben sogar länger.\n\nEbenfalls wichtig ist das Gefühl, etwas Sinnvolles zu tun. Wer eine Aufgabe hat, die er als bedeutsam empfindet – sei es im Beruf, in der Familie oder im Ehrenamt –, ist zufriedener als jemand, dem ein solcher Sinn fehlt. Interessanterweise macht auch das Geben glücklicher als das Nehmen: Wer anderen hilft, tut damit auch sich selbst etwas Gutes.\n\nSchließlich zeigt die Forschung, dass Dankbarkeit ein Schlüssel zum Glück ist. Menschen, die sich regelmäßig bewusst machen, wofür sie dankbar sind, empfinden mehr Zufriedenheit. Glück, so die vielleicht überraschendste Botschaft, ist weniger eine Frage der äußeren Umstände als der inneren Haltung.`,
      passageTitle: 'Bericht: Glücksforschung',
      questions: [
        { type: 'mcq', id: 'g-b2-5-l5', part: 2, text: 'Was sagt die Forschung über Geld und Glück?', options: ['Ab einem gewissen Punkt macht mehr Geld nicht mehr glücklicher', 'Geld hat keine Bedeutung', 'Mehr Geld macht immer glücklicher'], answer: 0 },
        { type: 'mcq', id: 'g-b2-5-l6', part: 2, text: 'Was ist laut Text besonders entscheidend für das Glück?', options: ['Soziale Beziehungen', 'Ein großes Haus', 'Ein teures Auto'], answer: 0 },
        { type: 'mcq', id: 'g-b2-5-l7', part: 2, text: 'Was macht laut Forschung glücklicher?', options: ['Alleinsein', 'Das Nehmen', 'Das Geben und anderen helfen'], answer: 2 },
        { type: 'mcq', id: 'g-b2-5-l8', part: 2, text: 'Welche überraschende Botschaft nennt der Text?', options: ['Glück ist weniger eine Frage der äußeren Umstände als der inneren Haltung', 'Glück ist unmöglich', 'Glück hängt nur vom Geld ab'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Lesen – Teil 3: Meinungen zuordnen',
      instructions: 'Vier Personen äußern sich zum Thema "Fernstudium". Ordnen Sie die Fragen den Personen zu.',
      passage: `Person A (Julia): Ohne Fernstudium hätte ich nie studieren können. Ich habe zwei kleine Kinder und arbeite Teilzeit. Nur weil ich lernen kann, wann ich will, ist es überhaupt möglich.\n\nPerson B (Ahmed): Mir fehlt beim Fernstudium der direkte Kontakt. Man sitzt allein zu Hause vor dem Bildschirm. Der Austausch mit Kommilitonen und Professoren, der an einer normalen Uni selbstverständlich ist, geht mir sehr ab.\n\nPerson C (Petra): Das größte Problem ist für mich die Selbstdisziplin. Niemand kontrolliert dich, es gibt keine festen Vorlesungszeiten. Man muss sich selbst enorm motivieren, sonst schiebt man alles auf.\n\nPerson D (Leon): Beruflich war das Fernstudium ideal für mich. Ich konnte weiterarbeiten und mich gleichzeitig qualifizieren. So hatte ich am Ende einen Abschluss UND mehrere Jahre Berufserfahrung – ein großer Vorteil.`,
      passageTitle: 'Meinungen: Fernstudium',
      questions: [
        { type: 'mcq', id: 'g-b2-5-l9', part: 3, text: 'Wer betont, dass die Selbstdisziplin das größte Problem ist?', options: ['Person D (Leon)', 'Person A (Julia)', 'Person B (Ahmed)', 'Person C (Petra)'], answer: 3 },
        { type: 'mcq', id: 'g-b2-5-l10', part: 3, text: 'Wem fehlt vor allem der direkte Kontakt?', options: ['Person C (Petra)', 'Person D (Leon)', 'Person A (Julia)', 'Person B (Ahmed)'], answer: 3 },
        { type: 'mcq', id: 'g-b2-5-l11', part: 3, text: 'Wer konnte durch das Fernstudium Arbeit und Studium verbinden?', options: ['Person B (Ahmed)', 'Person C (Petra)', 'Person D (Leon)', 'Person A (Julia)'], answer: 2 },
        { type: 'mcq', id: 'g-b2-5-l12', part: 3, text: 'Für wen war das Fernstudium wegen der Kinder die einzige Möglichkeit?', options: ['Person A (Julia)', 'Person B (Ahmed)', 'Person C (Petra)', 'Person D (Leon)'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'listening', title: 'Hören – Teil 1: Gespräch',
      instructions: 'Sie hören ein Gespräch zwischen zwei Personen. Wählen Sie zu jeder Aufgabe die richtige Antwort.',
      audioUrl: '/audio/goethe/b2-5/hoeren-teil1.mp3',
      transcript: `Tom: Sarah, du bist doch letztes Jahr mit deiner Familie aufs Land gezogen. Wie ist es so?\nSarah: Insgesamt sind wir sehr zufrieden. Die Kinder haben viel Platz zum Spielen, die Luft ist besser, und wir haben ein großes Haus mit Garten, das wir uns in der Stadt nie hätten leisten können.\nTom: Das klingt fast perfekt. Gibt es denn auch Nachteile?\nSarah: Oh ja, durchaus. Am Anfang haben wir unterschätzt, wie abhängig man vom Auto ist. Ohne Auto geht hier gar nichts – zum Einkaufen, zur Schule, zum Arzt. Öffentliche Verkehrsmittel gibt es kaum.\nTom: Und vermisst ihr die Stadt nicht? Das kulturelle Angebot?\nSarah: Manchmal schon. Kino, Theater, Restaurants – das fehlt uns hin und wieder. Aber wir fahren dafür ab und zu am Wochenende in die Stadt. Und ehrlich gesagt: Die Ruhe und die Natur wiegen das für uns bei weitem auf.\nTom: Würdest du die Entscheidung wieder so treffen?\nSarah: Auf jeden Fall. Man muss sich nur bewusst sein, dass es kein Paradies ist, sondern ein Kompromiss mit Vor- und Nachteilen.`,
      questions: [
        { type: 'mcq', id: 'g-b2-5-h1', part: 4, text: 'Was schätzt Sarah am Leben auf dem Land?', options: ['Die guten öffentlichen Verkehrsmittel', 'Viel Platz, bessere Luft, großes Haus mit Garten', 'Das kulturelle Angebot'], answer: 1 },
        { type: 'mcq', id: 'g-b2-5-h2', part: 4, text: 'Was hat die Familie am Anfang unterschätzt?', options: ['Wie abhängig man vom Auto ist', 'Das Wetter', 'Die Kosten'], answer: 0 },
        { type: 'mcq', id: 'g-b2-5-h3', part: 4, text: 'Was vermisst die Familie manchmal?', options: ['Den Garten', 'Das kulturelle Angebot der Stadt', 'Die frische Luft'], answer: 1 },
        { type: 'mcq', id: 'g-b2-5-h4', part: 4, text: 'Wie bewertet Sarah die Entscheidung insgesamt?', options: ['Sie will zurück in die Stadt', 'Sie bereut sie', 'Sie würde es wieder tun, sieht es aber als Kompromiss'], answer: 2 },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Hören – Teil 2: Vortrag',
      instructions: 'Sie hören einen kurzen Vortrag. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/b2-5/hoeren-teil2.mp3',
      transcript: `Sehr geehrte Damen und Herren, ich möchte heute über ein Thema sprechen, das uns alle betrifft: den Umgang mit Stress. Stress ist zu einem ständigen Begleiter unseres Alltags geworden – im Beruf, im Studium, sogar in der Freizeit.\n\nZunächst eine wichtige Unterscheidung: Nicht jeder Stress ist schädlich. Kurzfristiger Stress kann uns sogar zu Höchstleistungen anspornen. Problematisch wird es erst, wenn Stress dauerhaft wird und wir keine Erholung mehr finden. Dann drohen ernste gesundheitliche Folgen, von Schlafstörungen bis zum Burnout.\n\nWas kann man tun? Ein wichtiger Schritt ist, die eigenen Grenzen zu erkennen und zu akzeptieren. Viele Menschen nehmen sich zu viel vor und können nicht "Nein" sagen. Hier hilft es, Prioritäten zu setzen und auch mal Aufgaben abzugeben.\n\nEbenso wichtig sind bewusste Pausen und Ausgleich. Sport, Zeit in der Natur, Hobbys oder einfach Zeit mit Menschen, die uns guttun – all das hilft, Stress abzubauen. Und schließlich: Sprechen Sie über Ihre Belastung. Wer Probleme mit sich allein trägt, verstärkt sie oft nur. Stress ist kein Zeichen von Schwäche, und Hilfe zu suchen ist ein Zeichen von Stärke.`,
      questions: [
        { type: 'mcq', id: 'g-b2-5-h5', part: 5, text: 'Laut Vortrag ist jeder Stress schädlich.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-b2-5-h6', part: 5, text: 'Dauerhafter Stress kann zu ernsten gesundheitlichen Folgen führen.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-b2-5-h7', part: 5, text: 'Der Redner rät, sich möglichst viel vorzunehmen und nie "Nein" zu sagen.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-b2-5-h8', part: 5, text: 'Über die eigene Belastung zu sprechen, hilft laut Vortrag.', options: ['Richtig', 'Falsch'], answer: 0 },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Schreiben – Teil 1: Meinungsäußerung im Forum',
      instructions: 'Schreiben Sie einen argumentativen Beitrag in einem Online-Forum (ca. 150 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-b2-5-s1', part: 6, taskNumber: 1,
          stimulusLabel: 'Forumsbeitrag (argumentativ)',
          stimulus: 'In einem Online-Forum wird diskutiert: "Macht Geld glücklich?" Nehmen Sie Stellung.',
          text: 'Schreiben Sie einen argumentativen Forumsbeitrag (ca. 150 Wörter): 1) Führen Sie in das Thema ein, 2) nennen Sie Argumente für und gegen die These, 3) vertreten Sie klar Ihre eigene Position mit Begründung und Beispiel, 4) schließen Sie mit einem Fazit. Achten Sie auf Konnektoren und Struktur.',
          minWords: 150,
        },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 2: Formeller Brief',
      instructions: 'Schreiben Sie eine formelle Nachricht (ca. 100 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-b2-5-s2', part: 7, taskNumber: 2,
          stimulusLabel: 'Formelle Bewerbung / Anfrage',
          stimulus: 'Situation: Sie haben eine Stellenanzeige für einen Nebenjob gelesen, der gut zu Ihnen passt. Sie möchten sich bewerben und Ihr Interesse zeigen.',
          text: 'Schreiben Sie eine formelle Bewerbungsmail (ca. 100 Wörter): 1) beziehen Sie sich auf die Anzeige, 2) stellen Sie sich kurz vor (Erfahrung, Kenntnisse), 3) erklären Sie, warum Sie geeignet sind, 4) bitten Sie um ein Gespräch. Achten Sie auf höfliche, formelle Sprache.',
          minWords: 100,
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Sprechen – Teil 1: Vortrag',
      instructions: 'Halten Sie einen kurzen Vortrag zu einem Thema und präsentieren Sie Ihre Position.',
      questions: [
        {
          type: 'speak', id: 'g-b2-5-sp1', part: 8, partNumber: 1,
          text: 'Halten Sie einen Vortrag (ca. 3–4 Minuten) zum Thema "Ist lebenslanges Lernen heute notwendig?".',
          cueCard: 'Thema: Lebenslanges Lernen\n\nStruktur:\n• Einleitung: Warum ist das Thema aktuell?\n• Argumente dafür (schneller Wandel, Beruf, geistige Fitness)\n• Mögliche Schwierigkeiten (Zeit, Kosten, Motivation)\n• Ihre eigene Position und Erfahrung\n• Abschluss und Empfehlung',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 2: Diskussion',
      instructions: 'Diskutieren Sie mit Ihrem Partner über ein Thema und finden Sie eine gemeinsame Lösung.',
      questions: [
        {
          type: 'speak', id: 'g-b2-5-sp2', part: 9, partNumber: 2,
          text: 'Diskutieren Sie: Eine Firma möchte ihren Mitarbeitern helfen, Stress abzubauen. Diskutieren Sie verschiedene Maßnahmen und einigen Sie sich auf einen Vorschlag.',
          cueCard: 'Situation: Maßnahmen gegen Stress am Arbeitsplatz.\n\nMögliche Optionen (diskutieren und abwägen):\n• flexible Arbeitszeiten\n• ein Ruheraum im Büro\n• Sport- und Entspannungskurse\n• weniger Meetings\n\nRedemittel: "Ich bin der Meinung, dass ..." – "Da stimme ich dir nur teilweise zu ..." – "Als Kompromiss könnten wir ..."',
        },
      ],
    },
  ],
};

export default mock;
