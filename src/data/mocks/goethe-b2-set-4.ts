import type { MockExam } from './types';

// Goethe-Zertifikat B2 — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/b2-4/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'b2-4',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat B2 – Übungstest 4',
  subtitle: 'Lesen · Hören · Schreiben · Sprechen',
  timeMinutes: 190,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Lesen – Teil 1: Standpunkte',
      instructions: 'Lesen Sie den Text zum Thema "Konsum" und beantworten Sie die Fragen.',
      passage: `Weniger ist mehr? Über den Trend zum Minimalismus\n\nImmer mehr Menschen entscheiden sich bewusst dafür, weniger zu besitzen. Der sogenannte Minimalismus ist längst kein Nischenphänomen mehr, sondern ein wachsender Trend, der Bücher, Blogs und ganze Lebensstile prägt. Die Idee dahinter ist einfach: Wer sich von überflüssigem Besitz trennt, gewinnt Zeit, Geld und innere Ruhe.\n\nTatsächlich berichten viele Menschen, die ausmisten, von einem Gefühl der Befreiung. In einer Konsumgesellschaft, die uns ständig einredet, wir bräuchten immer mehr, ist der Verzicht ein bewusster Gegenentwurf. Statt sich über den Kauf neuer Dinge zu definieren, konzentriert man sich auf Erlebnisse, Beziehungen und persönliche Ziele.\n\nKritiker warnen allerdings davor, den Minimalismus zu idealisieren. Für manche sei er ein Luxus, den sich nur leisten könne, wer ohnehin genug habe. Und mancher Minimalismus, so der Vorwurf, sei selbst wieder nur ein neuer Trend, bei dem teure, "reduzierte" Designerprodukte gekauft werden.\n\nUnabhängig von der Kritik enthält der Grundgedanke jedoch etwas Wertvolles: die Frage, was wir wirklich brauchen, um zufrieden zu sein. Vielleicht liegt die eigentliche Botschaft weniger im Wegwerfen als im bewussteren Umgang mit dem, was wir haben – und mit dem, was wir kaufen.`,
      passageTitle: 'Text: Minimalismus',
      questions: [
        { type: 'mcq', id: 'g-b2-4-l1', part: 1, text: 'Was ist die Grundidee des Minimalismus?', options: ['Durch weniger Besitz Zeit, Geld und Ruhe zu gewinnen', 'Nur teure Dinge zu kaufen', 'Möglichst viel zu besitzen'], answer: 0 },
        { type: 'mcq', id: 'g-b2-4-l2', part: 1, text: 'Wovon berichten viele Menschen, die ausmisten?', options: ['Von einem Gefühl der Befreiung', 'Von Langeweile', 'Von finanziellen Verlusten'], answer: 0 },
        { type: 'mcq', id: 'g-b2-4-l3', part: 1, text: 'Was werfen Kritiker dem Minimalismus vor?', options: ['Dass niemand mitmacht', 'Dass er zu billig ist', 'Dass er teilweise ein Luxus ist oder selbst zum Trend wird'], answer: 2 },
        { type: 'mcq', id: 'g-b2-4-l4', part: 1, text: 'Worin liegt laut Text die eigentliche Botschaft?', options: ['Im bewussteren Umgang mit dem, was wir haben und kaufen', 'Im Kaufen neuer Produkte', 'Im Wegwerfen von allem'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lesen – Teil 2: Bericht',
      instructions: 'Lesen Sie den Text zum Thema "Wohnen in der Stadt" und beantworten Sie die Fragen.',
      passage: `Wohnungsnot in den Großstädten: Ursachen und mögliche Lösungen\n\nIn vielen deutschen Großstädten ist bezahlbarer Wohnraum zur Mangelware geworden. Wer eine Wohnung sucht, steht oft mit Dutzenden anderen Bewerbern bei der Besichtigung, und die Mieten steigen seit Jahren schneller als die Einkommen. Für Familien mit mittlerem oder geringem Einkommen wird das Wohnen in der Stadt zunehmend unerschwinglich.\n\nDie Ursachen sind vielfältig. Immer mehr Menschen zieht es in die Städte, weil dort die Arbeitsplätze sind. Gleichzeitig wurde über Jahre zu wenig gebaut. Auch der Trend zu kleineren Haushalten – mehr Menschen leben allein – erhöht die Nachfrage nach Wohnungen. Hinzu kommt, dass Wohnraum für manche zur Geldanlage geworden ist, statt zum Lebensmittelpunkt.\n\nÜber die Lösungen wird heftig gestritten. Die einen fordern, mehr und schneller zu bauen. Andere setzen auf eine Begrenzung der Mieten, um Mieter zu schützen. Kritiker warnen jedoch, dass zu strenge Regeln Investoren abschrecken und langfristig das Angebot verringern könnten. Experten sind sich einig, dass es keine einzelne Lösung gibt. Nötig sei ein Bündel von Maßnahmen: mehr sozialer Wohnungsbau, kluge Stadtplanung und eine bessere Anbindung des Umlands, damit nicht alle in die überfüllten Zentren drängen.`,
      passageTitle: 'Bericht: Wohnungsnot',
      questions: [
        { type: 'mcq', id: 'g-b2-4-l5', part: 2, text: 'Was ist ein Problem bei der Wohnungssuche?', options: ['Es gibt zu viele Wohnungen', 'Die Mieten steigen schneller als die Einkommen', 'Niemand will in die Stadt'], answer: 1 },
        { type: 'mcq', id: 'g-b2-4-l6', part: 2, text: 'Welche Ursache wird genannt?', options: ['Wohnungen sind zu groß', 'Es wurde über Jahre zu wenig gebaut', 'Es leben zu wenige Menschen in Städten'], answer: 1 },
        { type: 'mcq', id: 'g-b2-4-l7', part: 2, text: 'Wovor warnen Kritiker einer Mietbegrenzung?', options: ['Dass zu strenge Regeln Investoren abschrecken könnten', 'Dass niemand mehr mietet', 'Dass die Mieten zu niedrig werden'], answer: 0 },
        { type: 'mcq', id: 'g-b2-4-l8', part: 2, text: 'Worüber sind sich die Experten einig?', options: ['Dass es keine einzelne Lösung gibt', 'Dass man gar nichts tun sollte', 'Dass nur Bauen hilft'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Lesen – Teil 3: Meinungen zuordnen',
      instructions: 'Vier Personen äußern sich zum Thema "Freiwilliges soziales Jahr". Ordnen Sie die Fragen den Personen zu.',
      passage: `Person A (Tim): Mein freiwilliges soziales Jahr in einem Altenheim war die wichtigste Zeit meines Lebens. Ich habe gelernt, Verantwortung zu übernehmen und mit schwierigen Situationen umzugehen. Das prägt einen fürs Leben.\n\nPerson B (Hana): Ich fand es gut, aber ich hätte mir mehr Bezahlung gewünscht. Man arbeitet fast Vollzeit für sehr wenig Geld. Ohne die Unterstützung meiner Eltern hätte ich es mir nicht leisten können.\n\nPerson C (Ömer): Für mich war es vor allem eine Orientierungshilfe. Ich wusste nach der Schule nicht, was ich studieren soll. Durch das Jahr im Krankenhaus habe ich gemerkt, dass ich Medizin studieren möchte.\n\nPerson D (Clara): Ich sehe es kritisch. Manche Einrichtungen nutzen die Freiwilligen als billige Arbeitskräfte und geben ihnen Aufgaben, für die eigentlich bezahlte Fachkräfte nötig wären.`,
      passageTitle: 'Meinungen: Freiwilliges soziales Jahr',
      questions: [
        { type: 'mcq', id: 'g-b2-4-l9', part: 3, text: 'Für wen war das Jahr vor allem eine Orientierungshilfe für das Studium?', options: ['Person D (Clara)', 'Person A (Tim)', 'Person B (Hana)', 'Person C (Ömer)'], answer: 3 },
        { type: 'mcq', id: 'g-b2-4-l10', part: 3, text: 'Wer kritisiert, dass Freiwillige als billige Arbeitskräfte genutzt werden?', options: ['Person C (Ömer)', 'Person D (Clara)', 'Person A (Tim)', 'Person B (Hana)'], answer: 1 },
        { type: 'mcq', id: 'g-b2-4-l11', part: 3, text: 'Wer hätte sich mehr Bezahlung gewünscht?', options: ['Person B (Hana)', 'Person C (Ömer)', 'Person D (Clara)', 'Person A (Tim)'], answer: 0 },
        { type: 'mcq', id: 'g-b2-4-l12', part: 3, text: 'Wer betont vor allem den persönlichen Reifeprozess?', options: ['Person A (Tim)', 'Person B (Hana)', 'Person C (Ömer)', 'Person D (Clara)'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'listening', title: 'Hören – Teil 1: Gespräch',
      instructions: 'Sie hören ein Gespräch zwischen zwei Personen. Wählen Sie zu jeder Aufgabe die richtige Antwort.',
      audioUrl: '/audio/goethe/b2-4/hoeren-teil1.mp3',
      transcript: `Nina: Markus, du wolltest doch mit dem Rauchen aufhören. Wie läuft es?\nMarkus: Tatsächlich rauche ich seit drei Monaten nicht mehr! Ich kann es selbst kaum glauben.\nNina: Wow, herzlichen Glückwunsch! Wie hast du das geschafft?\nMarkus: Also, allein hätte ich es nie geschafft. Ich habe an einem Kurs teilgenommen, zusammen mit anderen, die auch aufhören wollten. Diese Gruppe hat mir sehr geholfen.\nNina: Und die ersten Wochen? Ich habe gehört, die sollen furchtbar sein.\nMarkus: Ja, das waren sie auch. Ich war nervös und gereizt. Aber der Kursleiter hat uns Techniken gezeigt, wie man mit dem Verlangen umgeht. Und wenn es schwer wurde, konnte ich jemanden aus der Gruppe anrufen.\nNina: Das klingt, als wäre die Unterstützung das Wichtigste gewesen.\nMarkus: Absolut. Der Wille allein reicht oft nicht. Man braucht Menschen, die einen verstehen und motivieren. Ich würde jedem, der aufhören will, so eine Gruppe empfehlen.\nNina: Danke für den Tipp. Vielleicht sollte ich das auch mal versuchen.`,
      questions: [
        { type: 'mcq', id: 'g-b2-4-h1', part: 4, text: 'Wie lange raucht Markus schon nicht mehr?', options: ['Seit drei Wochen', 'Seit einem Jahr', 'Seit drei Monaten'], answer: 2 },
        { type: 'mcq', id: 'g-b2-4-h2', part: 4, text: 'Was hat ihm besonders geholfen?', options: ['Ein Medikament', 'Ein Kurs mit einer Gruppe', 'Nichts Besonderes'], answer: 1 },
        { type: 'mcq', id: 'g-b2-4-h3', part: 4, text: 'Wie waren die ersten Wochen für Markus?', options: ['Ganz normal', 'Leicht', 'Furchtbar, er war nervös und gereizt'], answer: 2 },
        { type: 'mcq', id: 'g-b2-4-h4', part: 4, text: 'Was ist laut Markus das Wichtigste?', options: ['Die Unterstützung durch andere Menschen', 'Viel Geld', 'Der Wille allein'], answer: 0 },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Hören – Teil 2: Vortrag',
      instructions: 'Sie hören einen kurzen Vortrag. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/b2-4/hoeren-teil2.mp3',
      transcript: `Liebe Zuhörerinnen und Zuhörer, ich spreche heute über das Thema Zeitmanagement. Viele Menschen klagen, sie hätten zu wenig Zeit. Doch oft ist nicht die Zeit das Problem, sondern der Umgang mit ihr.\n\nEin häufiger Fehler ist, dass wir versuchen, alles gleichzeitig zu tun. Studien zeigen jedoch, dass sogenanntes Multitasking uns nicht produktiver macht, sondern im Gegenteil langsamer und fehleranfälliger. Besser ist es, sich auf eine Aufgabe zu konzentrieren und diese abzuschließen, bevor man die nächste beginnt.\n\nEin weiterer wichtiger Punkt ist das Setzen von Prioritäten. Nicht alles, was dringend erscheint, ist auch wirklich wichtig. Es lohnt sich, morgens kurz zu überlegen: Was sind heute die zwei oder drei wichtigsten Dinge? Wenn ich diese erledige, war der Tag erfolgreich.\n\nUnd schließlich: Pausen sind kein Zeichen von Faulheit, sondern notwendig. Wer ohne Pause arbeitet, wird müde und ineffizient. Kurze Pausen laden die Batterien wieder auf. Mein wichtigster Tipp lautet daher: Planen Sie nicht nur Ihre Aufgaben, sondern auch Ihre Erholung. Gutes Zeitmanagement bedeutet nicht, mehr zu arbeiten, sondern klüger.`,
      questions: [
        { type: 'mcq', id: 'g-b2-4-h5', part: 5, text: 'Laut Vortrag ist meist die Zeit selbst das Problem.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-b2-4-h6', part: 5, text: 'Multitasking macht laut Studien produktiver.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-b2-4-h7', part: 5, text: 'Der Redner empfiehlt, Prioritäten zu setzen.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-b2-4-h8', part: 5, text: 'Pausen sind laut Vortrag ein Zeichen von Faulheit.', options: ['Richtig', 'Falsch'], answer: 1 },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Schreiben – Teil 1: Meinungsäußerung im Forum',
      instructions: 'Schreiben Sie einen argumentativen Beitrag in einem Online-Forum (ca. 150 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-b2-4-s1', part: 6, taskNumber: 1,
          stimulusLabel: 'Forumsbeitrag (argumentativ)',
          stimulus: 'In einem Online-Forum wird diskutiert: "Ist es sinnvoll, nach der Schule ein freiwilliges soziales Jahr zu machen, oder sollte man lieber direkt studieren oder arbeiten?" Nehmen Sie Stellung.',
          text: 'Schreiben Sie einen argumentativen Forumsbeitrag (ca. 150 Wörter): 1) Führen Sie in das Thema ein, 2) nennen Sie Argumente für und gegen ein soziales Jahr, 3) vertreten Sie klar Ihre Position, 4) schließen Sie mit einem Fazit. Achten Sie auf Konnektoren und Struktur.',
          minWords: 150,
        },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 2: Formeller Brief',
      instructions: 'Schreiben Sie eine formelle Nachricht (ca. 100 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-b2-4-s2', part: 7, taskNumber: 2,
          stimulusLabel: 'Formelle Anfrage an die Stadt',
          stimulus: 'Situation: In Ihrem Wohnviertel gibt es zu wenige sichere Radwege. Sie möchten sich an die Stadtverwaltung wenden und eine Verbesserung anregen.',
          text: 'Schreiben Sie einen formellen Brief an die Stadtverwaltung (ca. 100 Wörter): 1) beschreiben Sie das Problem konkret, 2) begründen Sie, warum eine Lösung wichtig ist, 3) machen Sie einen konkreten Vorschlag, 4) bitten Sie um eine Rückmeldung. Achten Sie auf sachliche, formelle Sprache.',
          minWords: 100,
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Sprechen – Teil 1: Vortrag',
      instructions: 'Halten Sie einen kurzen Vortrag zu einem Thema und präsentieren Sie Ihre Position.',
      questions: [
        {
          type: 'speak', id: 'g-b2-4-sp1', part: 8, partNumber: 1,
          text: 'Halten Sie einen Vortrag (ca. 3–4 Minuten) zum Thema "Sollte man in der Stadt oder auf dem Land leben?".',
          cueCard: 'Thema: Stadt oder Land\n\nStruktur:\n• Einleitung: aktuelle Bedeutung (Wohnungsnot, Umzug in Städte)\n• Vorteile des Stadtlebens\n• Vorteile des Landlebens\n• Ihre eigene Position mit Begründung\n• Abschluss und Ausblick',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 2: Diskussion',
      instructions: 'Diskutieren Sie mit Ihrem Partner über ein Thema und finden Sie eine gemeinsame Lösung.',
      questions: [
        {
          type: 'speak', id: 'g-b2-4-sp2', part: 9, partNumber: 2,
          text: 'Diskutieren Sie: Sie und Ihre Freunde möchten gemeinsam etwas für die Umwelt in Ihrem Viertel tun. Diskutieren Sie verschiedene Ideen und einigen Sie sich auf ein Projekt.',
          cueCard: 'Situation: Umweltprojekt im Viertel.\n\nMögliche Optionen (diskutieren und abwägen):\n• eine Müllsammelaktion\n• Bäume pflanzen\n• einen Tauschmarkt organisieren\n• eine Informationskampagne\n\nRedemittel: "Ich schlage vor, dass wir ..." – "Das halte ich für problematisch, weil ..." – "Wir könnten uns darauf einigen, dass ..."',
        },
      ],
    },
  ],
};

export default mock;
