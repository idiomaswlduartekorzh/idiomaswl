import type { MockExam } from './types';

// Goethe-Zertifikat B1 — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/b1-3/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'b1-3',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat B1 – Übungstest 3',
  subtitle: 'Lesen · Hören · Schreiben · Sprechen',
  timeMinutes: 190,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Lesen – Teil 1: Blogeintrag',
      instructions: 'Lesen Sie den Text und die Aufgaben. Kreuzen Sie an: richtig oder falsch?',
      passage: `Vom Büro aufs Land – Blog von Thomas\n\nZwei Jahre lang habe ich in einer großen Stadt gearbeitet, in einem Büro im 15. Stock. Ich verdiente gut, aber ich war ständig gestresst und müde. Jeden Morgen stand ich lange im Stau, und abends kam ich erschöpft nach Hause. Ich hatte kaum Zeit für meine Familie und meine Hobbys.\n\nLetztes Jahr habe ich eine mutige Entscheidung getroffen: Ich habe gekündigt und bin mit meiner Familie aufs Land gezogen. Jetzt arbeite ich von zu Hause aus, als Grafikdesigner. Am Anfang hatte ich Angst, dass ich weniger Geld verdienen würde – und das stimmt auch. Aber die Lebensqualität ist viel besser geworden.\n\nNatürlich gibt es auch Nachteile. Auf dem Land ist alles weiter weg: der Supermarkt, die Schule, das Krankenhaus. Und manchmal fehlt mir das kulturelle Angebot der Stadt. Aber wenn ich morgens aus dem Fenster schaue und die Natur sehe, statt grauer Häuser, weiß ich: Es war die richtige Entscheidung.`,
      passageTitle: 'Blog: Vom Büro aufs Land',
      questions: [
        { type: 'mcq', id: 'g-b1-3-l1', part: 1, text: 'In der Stadt war Thomas oft gestresst.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-b1-3-l2', part: 1, text: 'Thomas verdient jetzt mehr Geld als vorher.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-b1-3-l3', part: 1, text: 'Er arbeitet jetzt von zu Hause aus.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-b1-3-l4', part: 1, text: 'Auf dem Land ist alles ganz nah.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-b1-3-l5', part: 1, text: 'Thomas bereut seine Entscheidung nicht.', options: ['Falsch', 'Richtig'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lesen – Teil 2: Zeitungsartikel',
      instructions: 'Lesen Sie den Artikel und wählen Sie zu jeder Aufgabe die richtige Antwort.',
      passage: `Ehrenamt: Wenn Helfen glücklich macht\n\nIn Deutschland engagieren sich Millionen Menschen ehrenamtlich – das heißt, sie arbeiten freiwillig und ohne Bezahlung für andere. Sie trainieren Kinder im Sportverein, helfen älteren Menschen, betreuen Flüchtlinge oder schützen die Umwelt. Warum tun sie das?\n\nStudien zeigen: Ehrenamtliche Arbeit macht zufrieden. Wer anderen hilft, fühlt sich gebraucht und gehört zu einer Gemeinschaft. Viele Ehrenamtliche berichten, dass sie durch ihr Engagement neue Freunde gefunden und wichtige Fähigkeiten gelernt haben. Besonders für junge Menschen kann das Ehrenamt auch beim Berufseinstieg helfen.\n\nAllerdings gibt es auch Probleme. Manche Organisationen finden nicht genug Freiwillige, weil viele Menschen wenig Zeit haben. Experten fordern deshalb, dass Ehrenamt besser anerkannt wird – zum Beispiel durch flexible Arbeitszeiten oder eine Bescheinigung, die man im Lebenslauf verwenden kann. Denn eine Gesellschaft, in der sich Menschen füreinander einsetzen, ist für alle besser.`,
      passageTitle: 'Zeitungsartikel: Ehrenamt',
      questions: [
        { type: 'mcq', id: 'g-b1-3-l6', part: 2, text: 'Was bedeutet ehrenamtliche Arbeit?', options: ['Man arbeitet nur am Wochenende', 'Man arbeitet freiwillig und ohne Bezahlung', 'Man arbeitet für viel Geld'], answer: 1 },
        { type: 'mcq', id: 'g-b1-3-l7', part: 2, text: 'Was zeigen Studien über das Ehrenamt?', options: ['Es macht zufrieden', 'Es ist zu anstrengend', 'Es macht die Menschen krank'], answer: 0 },
        { type: 'mcq', id: 'g-b1-3-l8', part: 2, text: 'Welches Problem gibt es?', options: ['Es gibt zu viele Freiwillige', 'Manche Organisationen finden nicht genug Freiwillige', 'Das Ehrenamt ist verboten'], answer: 1 },
        { type: 'mcq', id: 'g-b1-3-l9', part: 2, text: 'Was fordern Experten?', options: ['Dass Ehrenamt abgeschafft wird', 'Dass Ehrenamt besser anerkannt wird', 'Dass man für Ehrenamt bezahlt'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Lesen – Teil 3: Anzeigen',
      instructions: 'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt?',
      passage: `Anzeige A — Nachhilfe angeboten: Studentin gibt Nachhilfe in Deutsch und Englisch, für Schüler aller Klassen. Auch online.\n\nAnzeige B — Wohnungstausch: Wir (Familie mit 2 Kindern) suchen eine größere Wohnung und bieten unsere 3-Zimmer-Wohnung im Zentrum.\n\nAnzeige C — Chor sucht neue Mitglieder: Sie singen gern? Unser Chor probt jeden Mittwoch. Keine Vorkenntnisse nötig.\n\nAnzeige D — Reparaturservice: Wir reparieren Ihre Elektrogeräte schnell und günstig. Kostenloser Kostenvoranschlag.\n\nAnzeige E — Kinderbetreuung in den Ferien: Buntes Programm mit Basteln, Ausflügen und Sport. Für Kinder von 6 bis 12 Jahren.`,
      passageTitle: 'Kleinanzeigen',
      questions: [
        { type: 'mcq', id: 'g-b1-3-l10', part: 3, text: 'Ihr Kind braucht Hilfe in Englisch.', options: ['Anzeige A', 'Anzeige B', 'Anzeige C', 'Anzeige D'], answer: 0 },
        { type: 'mcq', id: 'g-b1-3-l11', part: 3, text: 'Sie singen gern und suchen eine Gruppe.', options: ['Anzeige E', 'Anzeige B', 'Anzeige C', 'Anzeige D'], answer: 2 },
        { type: 'mcq', id: 'g-b1-3-l12', part: 3, text: 'Ihre Waschmaschine ist kaputt.', options: ['Anzeige D', 'Anzeige E', 'Anzeige B', 'Anzeige C'], answer: 0 },
        { type: 'mcq', id: 'g-b1-3-l13', part: 3, text: 'Sie brauchen in den Ferien eine Betreuung für Ihr Kind.', options: ['Anzeige C', 'Anzeige D', 'Anzeige E', 'Anzeige B'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'listening', title: 'Hören – Teil 1: Kurze Texte',
      instructions: 'Sie hören fünf kurze Texte. Wählen Sie zu jedem Text die richtige Antwort.',
      audioUrl: '/audio/goethe/b1-3/hoeren-teil1.mp3',
      transcript: `Text 1 — Anrufbeantworter: Hallo, hier ist die Fahrschule. Ihre Theorieprüfung ist am Freitag um 9 Uhr. Bitte kommen Sie pünktlich und bringen Sie Ihren Ausweis mit.\n\nText 2 — Durchsage im Supermarkt: Liebe Kunden, wegen Inventur schließen wir heute bereits um 18 Uhr. Wir bitten um Ihr Verständnis.\n\nText 3 — Nachricht: Hi Sarah, ich schaffe es heute nicht zum Sport. Mein Chef hat mich gebeten, länger zu bleiben. Gehen wir morgen?\n\nText 4 — Bahnhofsansage: Der ICE 578 nach Berlin hat leider 20 Minuten Verspätung. Grund ist ein technisches Problem.\n\nText 5 — Radio: Für alle Autofahrer: Wegen eines Konzerts ist die Innenstadt heute Abend gesperrt. Nutzen Sie bitte die Parkhäuser am Stadtrand.`,
      questions: [
        { type: 'mcq', id: 'g-b1-3-h1', part: 4, text: 'Was soll die Person zur Prüfung mitbringen?', options: ['Ihren Ausweis', 'Ein Foto', 'Geld'], answer: 0 },
        { type: 'mcq', id: 'g-b1-3-h2', part: 4, text: 'Warum schließt der Supermarkt früher?', options: ['Wegen einer Reparatur', 'Wegen eines Feiertags', 'Wegen Inventur'], answer: 2 },
        { type: 'mcq', id: 'g-b1-3-h3', part: 4, text: 'Warum kommt die Person nicht zum Sport?', options: ['Sie muss länger arbeiten', 'Sie hat keine Lust', 'Sie ist krank'], answer: 0 },
        { type: 'mcq', id: 'g-b1-3-h4', part: 4, text: 'Wie viel Verspätung hat der ICE nach Berlin?', options: ['10 Minuten', '20 Minuten', '30 Minuten'], answer: 1 },
        { type: 'mcq', id: 'g-b1-3-h5', part: 4, text: 'Warum ist die Innenstadt gesperrt?', options: ['Wegen eines Unfalls', 'Wegen einer Baustelle', 'Wegen eines Konzerts'], answer: 2 },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Hören – Teil 2: Radiogespräch',
      instructions: 'Sie hören ein Gespräch. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/b1-3/hoeren-teil2.mp3',
      transcript: `Moderatorin: Heute geht es um das Thema "Weniger Plastik im Alltag". Bei mir ist der Umweltexperte Herr Fischer. Herr Fischer, warum ist Plastik so ein Problem?\nHerr Fischer: Plastik verrottet nur sehr langsam – oft dauert es Hunderte von Jahren. Ein großer Teil landet im Meer und schadet Tieren und der Umwelt.\nModeratorin: Was kann jeder Einzelne tun?\nHerr Fischer: Viel! Zum Beispiel eine Stofftasche zum Einkaufen mitnehmen, statt jedes Mal eine Plastiktüte zu kaufen. Oder eine eigene Trinkflasche benutzen, statt Wasser in Plastikflaschen zu kaufen.\nModeratorin: Manche sagen, das bringt doch nichts, wenn die Industrie so viel Plastik produziert.\nHerr Fischer: Das stimmt nur teilweise. Natürlich muss auch die Industrie handeln. Aber wenn viele Menschen weniger Plastik kaufen, ändert sich auch das Angebot. Jeder Beitrag zählt.\nModeratorin: Ein letzter Tipp?\nHerr Fischer: Kaufen Sie Obst und Gemüse ohne Verpackung, zum Beispiel auf dem Markt. Das ist oft frischer und ganz ohne Plastik.`,
      questions: [
        { type: 'mcq', id: 'g-b1-3-h6', part: 5, text: 'Plastik verrottet sehr schnell.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-b1-3-h7', part: 5, text: 'Herr Fischer empfiehlt, eine Stofftasche zum Einkaufen mitzunehmen.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-b1-3-h8', part: 5, text: 'Er sagt, nur die Industrie muss handeln, nicht die Einzelnen.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-b1-3-h9', part: 5, text: 'Er empfiehlt, Obst und Gemüse ohne Verpackung zu kaufen.', options: ['Falsch', 'Richtig'], answer: 1 },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Schreiben – Teil 1: Forumsbeitrag',
      instructions: 'Schreiben Sie einen Beitrag in einem Internetforum.',
      questions: [
        {
          type: 'write', id: 'g-b1-3-s1', part: 6, taskNumber: 1,
          stimulusLabel: 'Forumsbeitrag',
          stimulus: 'In einem Internetforum wird diskutiert: "Ist es besser, in einer Stadt oder auf dem Land zu leben?" Schreiben Sie Ihre Meinung.',
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
          type: 'write', id: 'g-b1-3-s2', part: 7, taskNumber: 2,
          stimulusLabel: 'Formelle E-Mail',
          stimulus: 'Situation: Sie haben in einem Online-Shop eine Kaffeemaschine bestellt, aber das Gerät funktioniert nicht richtig. Sie möchten sich beschweren.',
          text: 'Schreiben Sie eine formelle E-Mail an den Kundenservice (ca. 80 Wörter): 1) Beschreiben Sie das Problem, 2) nennen Sie Ihre Bestellnummer (denken Sie sich eine aus), 3) fordern Sie eine Lösung (Umtausch oder Rückerstattung), 4) setzen Sie eine Frist. Achten Sie auf höfliche, formelle Sprache.',
          minWords: 80,
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Sprechen – Teil 1: Gemeinsam planen',
      instructions: 'Planen Sie gemeinsam mit Ihrem Partner etwas.',
      questions: [
        {
          type: 'speak', id: 'g-b1-3-sp1', part: 8, partNumber: 1,
          text: 'Planen Sie zusammen einen gemeinsamen Wochenendausflug mit Ihrer Deutschklasse. Machen Sie Vorschläge, reagieren Sie und einigen Sie sich.',
          cueCard: 'Situation: Ausflug mit der Deutschklasse.\n\nPunkte zu klären:\n• Wohin? (Ziel)\n• Wann? (Datum, Uhrzeit)\n• Wie hinkommen? (Verkehrsmittel)\n• Was mitnehmen?\n• Kosten und Organisation?',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 2: Präsentation',
      instructions: 'Halten Sie eine kurze Präsentation zu einem Thema.',
      questions: [
        {
          type: 'speak', id: 'g-b1-3-sp2', part: 9, partNumber: 2,
          text: 'Halten Sie eine kurze Präsentation (2–3 Minuten) zum Thema "Soziale Medien im Alltag".',
          cueCard: 'Thema: Soziale Medien\n\nStruktur:\n• Einleitung: Wie verbreitet sind soziale Medien in Ihrem Land?\n• Vorteile (z. B. Kontakt, Information)\n• Nachteile (z. B. Zeit, Privatsphäre)\n• Ihre eigene Erfahrung / Meinung\n• Abschluss: Ihre Empfehlung',
        },
      ],
    },
    {
      part: 10, skill: 'speaking', title: 'Sprechen – Teil 3: Über die Präsentation sprechen',
      instructions: 'Reagieren Sie auf die Präsentation Ihres Partners und beantworten Sie Fragen.',
      questions: [
        {
          type: 'speak', id: 'g-b1-3-sp3', part: 10, partNumber: 3,
          text: 'Geben Sie Ihrem Partner eine Rückmeldung zu seiner Präsentation und stellen Sie eine Frage. Beantworten Sie auch die Fragen zu Ihrer eigenen Präsentation.',
          cueCard: 'Redemittel:\n• Rückmeldung: "Ich fand deine Präsentation interessant, besonders den Teil über ..."\n• Frage: "Wie ist das bei dir persönlich?"\n• Antwort: "Danke für die Frage. Meiner Meinung nach ..."',
        },
      ],
    },
  ],
};

export default mock;
