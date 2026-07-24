import type { MockExam } from './types';

// Goethe-Zertifikat A2 — formato oficial Modellsatz (Hören · Lesen · Schreiben · Sprechen).
// Conteúdo ORIGINAL WeLearn. Áudio sob /audio/goethe/a2-1/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'a2-1',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat A2 – Übungstest 1',
  subtitle: 'Hören · Lesen · Schreiben · Sprechen',
  timeMinutes: 90,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Hören – Teil 1: Ansagen und Gespräche',
      instructions: 'Sie hören fünf kurze Texte. Zu jedem Text gibt es eine Aufgabe. Wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a2-1/hoeren-teil1.mp3',
      transcript: `Text 1 — Am Bahnhof: Der ICE nach Hamburg fährt heute nicht von Gleis 7, sondern von Gleis 9. Der Zug hat außerdem fünf Minuten Verspätung.\n\nText 2 — Anrufbeantworter: Hallo, hier ist die Praxis Dr. Hoffmann. Wir haben diese Woche wegen Urlaub geschlossen. In Notfällen wenden Sie sich bitte an Dr. Krause.\n\nText 3 — Zwei Freundinnen: "Sollen wir am Wochenende wandern gehen?" – "Gute Idee, aber der Wetterbericht sagt Regen für Samstag. Lass uns lieber am Sonntag gehen."\n\nText 4 — Im Radio: Und jetzt zum Verkehr: Auf der Autobahn A9 gibt es zwischen München und Nürnberg einen Stau von zehn Kilometern.\n\nText 5 — Im Supermarkt: Liebe Kunden, an der Käsetheke gibt es heute ein besonderes Angebot: Kaufen Sie zwei Stück Käse und bezahlen Sie nur eines.`,
      questions: [
        { type: 'mcq', id: 'g-a2-1-h1', part: 1, text: 'Von welchem Gleis fährt der ICE nach Hamburg?', options: ['Gleis 9', 'Gleis 5', 'Gleis 7'], answer: 0 },
        { type: 'mcq', id: 'g-a2-1-h2', part: 1, text: 'Warum ist die Praxis geschlossen?', options: ['Wegen Krankheit', 'Wegen Urlaub', 'Wegen Umzug'], answer: 1 },
        { type: 'mcq', id: 'g-a2-1-h3', part: 1, text: 'Wann wollen die Freundinnen wandern gehen?', options: ['Gar nicht', 'Am Samstag', 'Am Sonntag'], answer: 2 },
        { type: 'mcq', id: 'g-a2-1-h4', part: 1, text: 'Wie lang ist der Stau auf der A9?', options: ['10 Kilometer', '15 Kilometer', '5 Kilometer'], answer: 0 },
        { type: 'mcq', id: 'g-a2-1-h5', part: 1, text: 'Was ist das Angebot an der Käsetheke?', options: ['Zwei kaufen, eines bezahlen', 'Alles halber Preis', 'Käse gratis'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'listening', title: 'Hören – Teil 2: Gespräch im Alltag',
      instructions: 'Sie hören ein Gespräch. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/a2-1/hoeren-teil2.mp3',
      transcript: `Verkäuferin: Guten Tag, kann ich Ihnen helfen?\nKunde: Ja, ich suche eine Jacke für den Winter. Etwas Warmes.\nVerkäuferin: Welche Größe haben Sie?\nKunde: Größe 52. Und die Farbe sollte dunkel sein, am besten schwarz oder dunkelblau.\nVerkäuferin: Hier habe ich eine schwarze Jacke in Größe 52. Sie kostet 89 Euro.\nKunde: Die gefällt mir. Kann ich sie anprobieren?\nVerkäuferin: Natürlich, die Umkleidekabine ist dort hinten rechts.\nKunde: Danke. ... Sie passt gut. Ich nehme sie. Kann ich mit Karte bezahlen?\nVerkäuferin: Ja, gern. Bitte hier an der Kasse.`,
      questions: [
        { type: 'mcq', id: 'g-a2-1-h6', part: 2, text: 'Der Kunde sucht eine Sommerjacke.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a2-1-h7', part: 2, text: 'Der Kunde hat Größe 52.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a2-1-h8', part: 2, text: 'Die Jacke kostet 89 Euro.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a2-1-h9', part: 2, text: 'Der Kunde bezahlt mit Bargeld.', options: ['Falsch', 'Richtig'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'listening', title: 'Hören – Teil 3: Kurze Gespräche',
      instructions: 'Sie hören vier kurze Gespräche. Wählen Sie zu jedem Gespräch die richtige Antwort.',
      audioUrl: '/audio/goethe/a2-1/hoeren-teil3.mp3',
      transcript: `Gespräch 1 — "Wann hast du morgen Zeit?" – "Am Vormittag habe ich einen Termin, aber ab 14 Uhr bin ich frei."\n\nGespräch 2 — "Wie war dein Wochenende?" – "Toll! Ich war mit Freunden am See. Wir haben gegrillt und gebadet."\n\nGespräch 3 — "Entschuldigung, wie komme ich zum Museum?" – "Nehmen Sie die U-Bahn Linie 2 bis zur Station Marktplatz. Von dort sind es fünf Minuten zu Fuß."\n\nGespräch 4 — "Was machst du beruflich?" – "Ich bin Lehrerin. Ich unterrichte Mathematik an einer Schule."`,
      questions: [
        { type: 'mcq', id: 'g-a2-1-h10', part: 3, text: 'Ab wann hat die Person morgen Zeit?', options: ['Am Vormittag', 'Gar nicht', 'Ab 14 Uhr'], answer: 2 },
        { type: 'mcq', id: 'g-a2-1-h11', part: 3, text: 'Was hat die Person am Wochenende gemacht?', options: ['Gearbeitet', 'Gegrillt und gebadet am See', 'Zu Hause geblieben'], answer: 1 },
        { type: 'mcq', id: 'g-a2-1-h12', part: 3, text: 'Wie kommt man zum Museum?', options: ['Zu Fuß in 30 Minuten', 'Mit dem Bus', 'Mit der U-Bahn Linie 2'], answer: 2 },
        { type: 'mcq', id: 'g-a2-1-h13', part: 3, text: 'Was ist die Person von Beruf?', options: ['Lehrerin', 'Verkäuferin', 'Ärztin'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Lesen – Teil 1: Zeitungstext',
      instructions: 'Lesen Sie den Text. Kreuzen Sie an: richtig oder falsch?',
      passage: `Neues Fahrradverleihsystem in der Stadt\n\nSeit letztem Monat gibt es in unserer Stadt ein neues Fahrradverleihsystem. An über fünfzig Stationen kann man Fahrräder ausleihen und an einer beliebigen anderen Station wieder abgeben. Die Nutzung ist einfach: Man lädt eine App auf das Handy, registriert sich und scannt einen Code am Fahrrad.\n\nDie erste halbe Stunde ist kostenlos, danach kostet jede Stunde einen Euro. Studenten und Senioren bekommen einen Rabatt. Die Stadt hofft, dass viele Menschen das Auto stehen lassen und stattdessen mit dem Fahrrad fahren. Das ist gut für die Umwelt und für die Gesundheit.`,
      passageTitle: 'Zeitungsartikel',
      questions: [
        { type: 'mcq', id: 'g-a2-1-l1', part: 4, text: 'Man kann das Fahrrad an einer beliebigen Station abgeben.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a2-1-l2', part: 4, text: 'Die erste Stunde ist kostenlos.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a2-1-l3', part: 4, text: 'Studenten bekommen einen Rabatt.', options: ['Richtig', 'Falsch'], answer: 0 },
      ],
    },
    {
      part: 5, skill: 'reading', title: 'Lesen – Teil 2: Anzeigen zuordnen',
      instructions: 'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt?',
      passage: `Anzeige A — Umzugshilfe gesucht? Wir helfen beim Tragen und Transportieren. Günstige Preise, auch am Wochenende.\n\nAnzeige B — Deutschkurs A2/B1: Kleine Gruppen, erfahrene Lehrer. Prüfungsvorbereitung. Beginn nächste Woche.\n\nAnzeige C — Tierpension "Fellnase": Wir kümmern uns um Ihren Hund oder Ihre Katze, wenn Sie im Urlaub sind.\n\nAnzeige D — Gebrauchte Möbel günstig! Sofa, Tisch, Stühle und Schrank in gutem Zustand. Abholung.`,
      passageTitle: 'Anzeigen',
      questions: [
        { type: 'mcq', id: 'g-a2-1-l4', part: 5, text: 'Sie fahren in den Urlaub und haben eine Katze. Welche Anzeige passt?', options: ['Anzeige B', 'Anzeige C', 'Anzeige D', 'Anzeige A'], answer: 1 },
        { type: 'mcq', id: 'g-a2-1-l5', part: 5, text: 'Sie brauchen Hilfe beim Umzug. Welche Anzeige passt?', options: ['Anzeige A', 'Anzeige B', 'Anzeige C', 'Anzeige D'], answer: 0 },
        { type: 'mcq', id: 'g-a2-1-l6', part: 5, text: 'Sie möchten sich auf eine Deutschprüfung vorbereiten. Welche Anzeige passt?', options: ['Anzeige D', 'Anzeige A', 'Anzeige B', 'Anzeige C'], answer: 2 },
      ],
    },
    {
      part: 6, skill: 'reading', title: 'Lesen – Teil 3: E-Mail',
      instructions: 'Lesen Sie die E-Mail. Kreuzen Sie an: richtig oder falsch?',
      passage: `Liebe Frau Schneider,\n\nvielen Dank für Ihre Anfrage zu unserem Sprachkurs. Der Kurs A2 findet montags und mittwochs von 18 bis 20 Uhr statt und beginnt am 5. September. Der Preis für den ganzen Kurs (12 Wochen) beträgt 240 Euro. Die Bücher sind nicht im Preis enthalten und kosten etwa 30 Euro.\n\nWenn Sie sich anmelden möchten, füllen Sie bitte das Formular auf unserer Website aus. Bei Fragen können Sie mich gern anrufen.\n\nMit freundlichen Grüßen\nMartina Vogel, Sprachschule Aktiv`,
      passageTitle: 'E-Mail der Sprachschule',
      questions: [
        { type: 'mcq', id: 'g-a2-1-l7', part: 6, text: 'Der Kurs findet zweimal pro Woche statt.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a2-1-l8', part: 6, text: 'Die Bücher sind im Preis enthalten.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a2-1-l9', part: 6, text: 'Man meldet sich über die Website an.', options: ['Richtig', 'Falsch'], answer: 0 },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 1: SMS / kurze Nachricht',
      instructions: 'Schreiben Sie eine kurze Mitteilung.',
      questions: [
        {
          type: 'write', id: 'g-a2-1-s1', part: 7, taskNumber: 1,
          stimulusLabel: 'Nachricht an einen Freund',
          stimulus: 'Situation: Sie wollten heute Abend mit Ihrem Freund Lukas ins Kino gehen, aber Sie müssen länger arbeiten. Schreiben Sie Lukas eine Nachricht.',
          text: 'Schreiben Sie an Lukas: 1) Entschuldigen Sie sich, 2) Grund (Sie müssen länger arbeiten), 3) machen Sie einen neuen Vorschlag (anderer Tag). Schreiben Sie ca. 20–30 Wörter mit Anrede und Gruß.',
          minWords: 25,
        },
      ],
    },
    {
      part: 8, skill: 'writing', title: 'Schreiben – Teil 2: E-Mail',
      instructions: 'Schreiben Sie eine E-Mail (ca. 40 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-a2-1-s2', part: 8, taskNumber: 2,
          stimulusLabel: 'E-Mail an die Sprachschule',
          stimulus: 'Situation: Sie möchten sich für einen Deutschkurs anmelden. Schreiben Sie eine E-Mail an die Sprachschule.',
          text: 'Schreiben Sie: 1) Warum schreiben Sie? (Interesse am Kurs), 2) eine Frage (z. B. Preis oder Uhrzeit), 3) Ihre Deutschkenntnisse (welches Niveau). Ca. 40 Wörter, mit Anrede und Gruß.',
          minWords: 40,
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 1: Fragen zur Person',
      instructions: 'Stellen Sie Ihrem Partner Fragen und antworten Sie.',
      questions: [
        {
          type: 'speak', id: 'g-a2-1-sp1', part: 9, partNumber: 1,
          text: 'Stellen Sie zu den Stichwörtern je eine Frage und beantworten Sie die Fragen Ihres Partners.',
          cueCard: 'Stichwörter (Fragen zur Person):\n• Sprachen\n• Familie\n• Tagesablauf\n• Verkehrsmittel\n• Wochenende\n\nBeispiel: "Welche Sprachen sprichst du?"',
        },
      ],
    },
    {
      part: 10, skill: 'speaking', title: 'Sprechen – Teil 2: Über sich sprechen',
      instructions: 'Sprechen Sie zusammenhängend über ein Thema.',
      questions: [
        {
          type: 'speak', id: 'g-a2-1-sp2', part: 10, partNumber: 2,
          text: 'Erzählen Sie über das Thema "Mein Wohnort". Sprechen Sie zusammenhängend etwa 1–2 Minuten.',
          cueCard: 'Thema: Mein Wohnort\n\nPunkte:\n• Wo wohnen Sie?\n• Wie ist es dort?\n• Was gefällt Ihnen / was nicht?\n• Was kann man dort machen?\n• Möchten Sie dort bleiben?',
        },
      ],
    },
    {
      part: 11, skill: 'speaking', title: 'Sprechen – Teil 3: Etwas gemeinsam planen',
      instructions: 'Planen Sie gemeinsam mit Ihrem Partner etwas.',
      questions: [
        {
          type: 'speak', id: 'g-a2-1-sp3', part: 11, partNumber: 3,
          text: 'Planen Sie zusammen einen Ausflug. Machen Sie Vorschläge, reagieren Sie und einigen Sie sich.',
          cueCard: 'Situation: Ein Freund aus dem Ausland besucht Sie. Planen Sie einen gemeinsamen Tag.\n\nPunkte zu klären:\n• Wann treffen? (Uhrzeit)\n• Wohin gehen? (Aktivität)\n• Wie hinkommen? (Verkehrsmittel)\n• Wo essen?\n• Was mitbringen?',
        },
      ],
    },
  ],
};

export default mock;
