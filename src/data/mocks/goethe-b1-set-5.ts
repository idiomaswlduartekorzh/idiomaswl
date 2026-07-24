import type { MockExam } from './types';

// Goethe-Zertifikat B1 — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/b1-5/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'b1-5',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat B1 – Übungstest 5',
  subtitle: 'Lesen · Hören · Schreiben · Sprechen',
  timeMinutes: 190,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Lesen – Teil 1: Blogeintrag',
      instructions: 'Lesen Sie den Text und die Aufgaben. Kreuzen Sie an: richtig oder falsch?',
      passage: `Mein erster Marathon – Blog von Daniel\n\nVor einem Jahr hätte ich nie gedacht, dass ich einmal einen Marathon laufen würde. Ich war unsportlich und übergewichtig und wurde beim Treppensteigen außer Atem. Doch dann las ich die Geschichte eines Mannes, der mit 50 seinen ersten Marathon lief, und dachte: Wenn er das kann, kann ich das auch.\n\nIch begann klein: erst nur zehn Minuten gehen, dann joggen, langsam mehr. Am Anfang tat alles weh und ich wollte oft aufgeben. Aber ich hatte mir ein festes Ziel gesetzt und trainierte drei- bis viermal pro Woche, bei jedem Wetter.\n\nLetzten Sonntag war es so weit: 42 Kilometer. Die letzten zehn Kilometer waren die härtesten meines Lebens. Mein Körper schrie "Stopp!", aber mein Kopf sagte "Weiter!". Als ich ins Ziel kam, weinte ich vor Glück. Ich habe nicht nur einen Marathon geschafft, sondern auch gelernt, dass man mit Willen fast alles erreichen kann. Was ist Ihr nächstes Ziel?`,
      passageTitle: 'Blog: Mein erster Marathon',
      questions: [
        { type: 'mcq', id: 'g-b1-5-l1', part: 1, text: 'Daniel war früher sehr sportlich.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-b1-5-l2', part: 1, text: 'Die Geschichte eines anderen Mannes hat ihn motiviert.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-b1-5-l3', part: 1, text: 'Am Anfang war das Training leicht für ihn.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-b1-5-l4', part: 1, text: 'Die letzten zehn Kilometer waren am schwersten.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-b1-5-l5', part: 1, text: 'Daniel hat gelernt, dass man mit Willen viel erreichen kann.', options: ['Falsch', 'Richtig'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lesen – Teil 2: Zeitungsartikel',
      instructions: 'Lesen Sie den Artikel und wählen Sie zu jeder Aufgabe die richtige Antwort.',
      passage: `Warum Lesen so wichtig ist\n\nIn Zeiten von Videos und sozialen Medien lesen viele Menschen immer weniger Bücher. Dabei hat Lesen zahlreiche Vorteile, die durch Studien belegt sind. Menschen, die regelmäßig lesen, haben einen größeren Wortschatz, können sich besser konzentrieren und schneiden in vielen Bereichen besser ab.\n\nBesonders wichtig ist das Lesen für Kinder. Kinder, denen früh vorgelesen wird und die selbst gern lesen, haben es später in der Schule oft leichter. Sie verstehen Texte besser und können sich klarer ausdrücken. Experten empfehlen deshalb, Kindern von klein auf vorzulesen und Bücher zu Hause zugänglich zu machen.\n\nAber auch für Erwachsene ist Lesen ein Gewinn. Es entspannt, reduziert Stress und regt die Fantasie an. Ein Buch nimmt uns mit in andere Welten und lässt uns die Perspektive anderer Menschen verstehen. Die gute Nachricht: Es ist nie zu spät, mit dem Lesen anzufangen. Schon zwanzig Minuten am Tag machen einen Unterschied. Man muss nur ein Buch finden, das einen wirklich interessiert.`,
      passageTitle: 'Zeitungsartikel: Warum Lesen wichtig ist',
      questions: [
        { type: 'mcq', id: 'g-b1-5-l6', part: 2, text: 'Was haben Menschen, die regelmäßig lesen?', options: ['Einen größeren Wortschatz', 'Weniger Zeit', 'Mehr Geld'], answer: 0 },
        { type: 'mcq', id: 'g-b1-5-l7', part: 2, text: 'Warum ist Lesen für Kinder besonders wichtig?', options: ['Es kostet nichts', 'Es macht sie müde', 'Sie haben es später in der Schule oft leichter'], answer: 2 },
        { type: 'mcq', id: 'g-b1-5-l8', part: 2, text: 'Was empfehlen Experten für Kinder?', options: ['Ihnen von klein auf vorzulesen', 'Nur digitale Bücher', 'Weniger vorzulesen'], answer: 0 },
        { type: 'mcq', id: 'g-b1-5-l9', part: 2, text: 'Was ist die "gute Nachricht" am Ende des Textes?', options: ['Lesen ist teuer', 'Es ist nie zu spät, mit dem Lesen anzufangen', 'Kinder müssen nicht lesen'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Lesen – Teil 3: Anzeigen',
      instructions: 'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt?',
      passage: `Anzeige A — Lesekreis sucht neue Mitglieder: Wir treffen uns einmal im Monat und sprechen über ein Buch. Bei Kaffee und Kuchen.\n\nAnzeige B — Umzugskartons kostenlos abzugeben. Etwa 20 Stück, stabil. Nur Selbstabholung, diese Woche.\n\nAnzeige C — Computerhilfe für zu Hause: Ich richte Ihren PC ein, installiere Programme und erkläre alles in Ruhe. Günstig.\n\nAnzeige D — Schwimmkurs für Erwachsene: Auch für Anfänger, die noch gar nicht schwimmen können. Freundliche Trainerin, kleine Gruppe.\n\nAnzeige E — Suche gebrauchtes Klavier für meine Tochter. Zahle fairen Preis. Transport organisiere ich selbst.`,
      passageTitle: 'Kleinanzeigen',
      questions: [
        { type: 'mcq', id: 'g-b1-5-l10', part: 3, text: 'Sie lesen gern und möchten sich mit anderen austauschen.', options: ['Anzeige A', 'Anzeige B', 'Anzeige C', 'Anzeige D'], answer: 0 },
        { type: 'mcq', id: 'g-b1-5-l11', part: 3, text: 'Sie können nicht schwimmen und möchten es lernen.', options: ['Anzeige E', 'Anzeige B', 'Anzeige C', 'Anzeige D'], answer: 3 },
        { type: 'mcq', id: 'g-b1-5-l12', part: 3, text: 'Sie ziehen um und brauchen Kartons.', options: ['Anzeige D', 'Anzeige E', 'Anzeige B', 'Anzeige C'], answer: 2 },
        { type: 'mcq', id: 'g-b1-5-l13', part: 3, text: 'Sie haben Probleme mit Ihrem Computer.', options: ['Anzeige C', 'Anzeige D', 'Anzeige E', 'Anzeige B'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'listening', title: 'Hören – Teil 1: Kurze Texte',
      instructions: 'Sie hören fünf kurze Texte. Wählen Sie zu jedem Text die richtige Antwort.',
      audioUrl: '/audio/goethe/b1-5/hoeren-teil1.mp3',
      transcript: `Text 1 — Anrufbeantworter: Hallo, hier ist das Kino Astor. Der Film um 20 Uhr ist leider ausverkauft. Es gibt aber noch Karten für die Vorstellung um 22:30 Uhr.\n\nText 2 — Durchsage im Zug: Meine Damen und Herren, in wenigen Minuten erreichen wir Stuttgart. Bitte denken Sie beim Aussteigen an Ihr Gepäck.\n\nText 3 — Nachricht: Hi Tom, wir treffen uns doch nicht im Café, sondern direkt im Park am Eingang. Es ist so schönes Wetter!\n\nText 4 — Radiowerbung: Sie suchen ein neues Hobby? Im Sportzentrum Aktiv beginnen nächste Woche neue Kurse: Yoga, Klettern und Tanzen. Melden Sie sich jetzt an!\n\nText 5 — Bahnhofsansage: Reisende nach Hamburg werden gebeten, zum Gleis 12 zu gehen. Der Zug fährt in fünf Minuten ab.`,
      questions: [
        { type: 'mcq', id: 'g-b1-5-h1', part: 4, text: 'Für welche Vorstellung gibt es noch Karten?', options: ['Um 22:30 Uhr', 'Für keine', 'Um 20 Uhr'], answer: 0 },
        { type: 'mcq', id: 'g-b1-5-h2', part: 4, text: 'Woran sollen die Fahrgäste beim Aussteigen denken?', options: ['An ihre Fahrkarte', 'An ihr Gepäck', 'An das Umsteigen'], answer: 1 },
        { type: 'mcq', id: 'g-b1-5-h3', part: 4, text: 'Wo treffen sich die Freunde jetzt?', options: ['Zu Hause', 'Im Café', 'Im Park am Eingang'], answer: 2 },
        { type: 'mcq', id: 'g-b1-5-h4', part: 4, text: 'Welcher Kurs wird NICHT genannt?', options: ['Kochen', 'Klettern', 'Yoga'], answer: 0 },
        { type: 'mcq', id: 'g-b1-5-h5', part: 4, text: 'Von welchem Gleis fährt der Zug nach Hamburg?', options: ['Gleis 10', 'Gleis 12', 'Gleis 5'], answer: 1 },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Hören – Teil 2: Radiogespräch',
      instructions: 'Sie hören ein Gespräch. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/b1-5/hoeren-teil2.mp3',
      transcript: `Moderatorin: Heute sprechen wir über das Thema "Freundschaft im digitalen Zeitalter". Mein Gast ist der Soziologe Herr Dr. Neumann. Herr Neumann, haben wir heute mehr oder weniger Freunde als früher?\nHerr Neumann: Das ist eine interessante Frage. Auf sozialen Medien haben viele Menschen Hunderte von "Freunden". Aber echte, enge Freundschaften sind selten geworden. Studien zeigen: Die meisten Menschen haben nur zwei bis fünf wirklich enge Freunde.\nModeratorin: Ersetzen die Online-Kontakte echte Freundschaften?\nHerr Neumann: Nein, sie können sie ergänzen, aber nicht ersetzen. Über das Internet bleibt man leicht in Kontakt, auch über große Entfernungen. Aber echte Nähe entsteht durch gemeinsame Zeit, durch Gespräche von Angesicht zu Angesicht.\nModeratorin: Was raten Sie?\nHerr Neumann: Man sollte in echte Freundschaften investieren – Zeit, Aufmerksamkeit, Ehrlichkeit. Lieber wenige gute Freunde als viele oberflächliche Kontakte. Und man sollte das Handy auch mal weglegen, wenn man mit Freunden zusammen ist.\nModeratorin: Ein wichtiger Hinweis. Vielen Dank, Herr Neumann.`,
      questions: [
        { type: 'mcq', id: 'g-b1-5-h6', part: 5, text: 'Laut Studien haben die meisten Menschen nur zwei bis fünf enge Freunde.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-b1-5-h7', part: 5, text: 'Herr Neumann sagt, Online-Kontakte ersetzen echte Freundschaften.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-b1-5-h8', part: 5, text: 'Er empfiehlt, in echte Freundschaften zu investieren.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-b1-5-h9', part: 5, text: 'Er rät, das Handy immer dabei zu haben, wenn man Freunde trifft.', options: ['Falsch', 'Richtig'], answer: 0 },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Schreiben – Teil 1: Forumsbeitrag',
      instructions: 'Schreiben Sie einen Beitrag in einem Internetforum.',
      questions: [
        {
          type: 'write', id: 'g-b1-5-s1', part: 6, taskNumber: 1,
          stimulusLabel: 'Forumsbeitrag',
          stimulus: 'In einem Internetforum wird diskutiert: "Machen soziale Medien einsam oder verbinden sie die Menschen?" Schreiben Sie Ihre Meinung.',
          text: 'Schreiben Sie einen Forumsbeitrag (ca. 80 Wörter): 1) Nennen Sie Ihre Meinung, 2) geben Sie mindestens zwei Gründe, 3) nennen Sie ein Beispiel aus Ihrer Erfahrung. Achten Sie auf einen passenden Anfang und Schluss.',
          minWords: 80,
        },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 2: Formelle E-Mail',
      instructions: 'Schreiben Sie eine formelle E-Mail.',
      questions: [
        {
          type: 'write', id: 'g-b1-5-s2', part: 7, taskNumber: 2,
          stimulusLabel: 'Formelle E-Mail',
          stimulus: 'Situation: Sie haben in einem Fitnessstudio einen Vertrag, möchten aber kündigen, weil Sie umziehen. Schreiben Sie an das Fitnessstudio.',
          text: 'Schreiben Sie eine formelle E-Mail an das Fitnessstudio (ca. 80 Wörter): 1) teilen Sie Ihre Kündigung mit, 2) nennen Sie den Grund (Umzug), 3) fragen Sie nach den Formalitäten (Kündigungsfrist), 4) bitten Sie um eine Bestätigung. Achten Sie auf höfliche, formelle Sprache.',
          minWords: 80,
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Sprechen – Teil 1: Gemeinsam planen',
      instructions: 'Planen Sie gemeinsam mit Ihrem Partner etwas.',
      questions: [
        {
          type: 'speak', id: 'g-b1-5-sp1', part: 8, partNumber: 1,
          text: 'Ihre Deutschlehrerin hat bald Geburtstag. Planen Sie zusammen eine Überraschung. Machen Sie Vorschläge und einigen Sie sich.',
          cueCard: 'Situation: Überraschung für die Deutschlehrerin.\n\nPunkte zu klären:\n• Was für eine Überraschung? (Geschenk, Feier)\n• Wann und wo?\n• Wer organisiert was?\n• Wie viel Geld?\n• Wie halten Sie es geheim?',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 2: Präsentation',
      instructions: 'Halten Sie eine kurze Präsentation zu einem Thema.',
      questions: [
        {
          type: 'speak', id: 'g-b1-5-sp2', part: 9, partNumber: 2,
          text: 'Halten Sie eine kurze Präsentation (2–3 Minuten) zum Thema "Fremdsprachen lernen".',
          cueCard: 'Thema: Fremdsprachen lernen\n\nStruktur:\n• Einleitung: Warum lernen Menschen Fremdsprachen?\n• Wie lernen Sie am besten?\n• Vorteile von Fremdsprachenkenntnissen\n• Schwierigkeiten beim Lernen\n• Abschluss: Ihr Tipp für andere Lernende',
        },
      ],
    },
    {
      part: 10, skill: 'speaking', title: 'Sprechen – Teil 3: Über die Präsentation sprechen',
      instructions: 'Reagieren Sie auf die Präsentation Ihres Partners und beantworten Sie Fragen.',
      questions: [
        {
          type: 'speak', id: 'g-b1-5-sp3', part: 10, partNumber: 3,
          text: 'Geben Sie Ihrem Partner eine Rückmeldung zu seiner Präsentation und stellen Sie eine Frage. Beantworten Sie auch die Fragen zu Ihrer eigenen Präsentation.',
          cueCard: 'Redemittel:\n• Rückmeldung: "Ich fand deine Präsentation gut strukturiert. Besonders interessant war ..."\n• Frage: "Welche Sprache möchtest du als Nächstes lernen?"\n• Antwort: "Das ist eine gute Frage. Ich denke ..."',
        },
      ],
    },
  ],
};

export default mock;
