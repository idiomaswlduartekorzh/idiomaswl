import type { MockExam } from './types';

// Goethe-Zertifikat A1 (Start Deutsch 1): contenido ORIGINAL de WeLearn.
// Replica la arquitectura pública del Modellsatz/Übungssatz sin copiar sus estímulos.
// Audio original WeLearn producido después de cerrar la auditoría editorial y visual.
const mock: MockExam = {
  id: 'a1-2', examSlug: 'goethe',
  title: 'A1 – Simulacro 2 · formato Start Deutsch 1',
  subtitle: 'Hören · Lesen · Schreiben · Sprechen · contenido original WeLearn',
  timeMinutes: 80,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Hören – Teil 1: Kurze Gespräche',
      instructions: 'Was ist richtig? Wählen Sie A, B oder C. Sie hören jeden Text zweimal.',
      audioUrl: '/audio/goethe/a1-2/hoeren-teil1.mp3?v=20260912',
      questions: [
        { type: 'mcq', id: 'g-a1-2-h1', part: 1, text: 'Was kostet der Rucksack heute?', options: ['24,90 €', '34,90 €', '44,90 €'], answer: 2 },
        { type: 'mcq', id: 'g-a1-2-h2', part: 1, text: 'Wann fährt der Bus ab?', options: ['8:15 Uhr', '8:30 Uhr', '8:45 Uhr'], answer: 0 },
        { type: 'mcq', id: 'g-a1-2-h3', part: 1, text: 'Was trinkt die Frau?', options: ['eine Tasse Kaffee', 'ein Glas Orangensaft', 'eine Tasse Tee'], answer: 1 },
        { type: 'mcq', id: 'g-a1-2-h4', part: 1, text: 'Wie viele Postkarten kauft der Mann?', options: ['drei', 'fünf', 'acht'], answer: 2 },
        { type: 'mcq', id: 'g-a1-2-h5', part: 1, text: 'Wo ist die Apotheke?', options: ['im Erdgeschoss', 'im ersten Stock', 'im zweiten Stock'], answer: 0 },
        { type: 'mcq', id: 'g-a1-2-h6', part: 1, text: 'Wie fährt die Frau zum Flughafen?', options: ['mit dem Bus', 'mit dem Zug', 'mit dem Taxi'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'listening', title: 'Hören – Teil 2: Ansagen',
      instructions: 'Kreuzen Sie an: Richtig oder Falsch. Sie hören jeden Text einmal.',
      audioUrl: '/audio/goethe/a1-2/hoeren-teil2.mp3?v=20260912',
      questions: [
        { type: 'mcq', id: 'g-a1-2-h7', part: 2, text: 'Der Eingang zum Museum ist links.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-2-h8', part: 2, text: 'Die Bäckerei schließt heute um 18:30 Uhr.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-2-h9', part: 2, text: 'Das Schwimmbad ist heute geschlossen.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-2-h10', part: 2, text: 'Der Flug nach Madrid geht von Ausgang B8.', options: ['Richtig', 'Falsch'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'listening', title: 'Hören – Teil 3: Telefonische Nachrichten',
      instructions: 'Was ist richtig? Wählen Sie A, B oder C. Sie hören jeden Text zweimal.',
      audioUrl: '/audio/goethe/a1-2/hoeren-teil3.mp3?v=20260912',
      questions: [
        { type: 'mcq', id: 'g-a1-2-h11', part: 3, text: 'Wann ist der Termin?', options: ['Montag um 15 Uhr', 'Dienstag um 15 Uhr', 'Dienstag um 17 Uhr'], answer: 0 },
        { type: 'mcq', id: 'g-a1-2-h12', part: 3, text: 'Wo wartet Mila?', options: ['vor dem Bankgebäude', 'an der Bushaltestelle', 'im kleinen Stadtcafé'], answer: 1 },
        { type: 'mcq', id: 'g-a1-2-h13', part: 3, text: 'Wann kann Frau Klein das Paket abholen?', options: ['heute bis 18 Uhr', 'morgen ab 8 Uhr', 'morgen ab 10 Uhr'], answer: 2 },
        { type: 'mcq', id: 'g-a1-2-h14', part: 3, text: 'Was soll Leo mitbringen?', options: ['seinen Schlüssel', 'seinen Laptop', 'seine Kamera'], answer: 0 },
        { type: 'mcq', id: 'g-a1-2-h15', part: 3, text: 'Warum kommt Anna später?', options: ['Ihr Bus fällt aus.', 'Ihr Zug hat Verspätung.', 'Ihr Fahrrad ist kaputt.'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Lesen – Teil 1: Nachrichten',
      instructions: 'Lesen Sie zuerst Text A und die Aufgaben 1 bis 2. Lesen Sie danach Text B und die Aufgaben 3 bis 5. Kreuzen Sie an: Richtig oder Falsch.',
      passageTitle: 'Persönliche Nachrichten',
      passage: `TEXT A — Nachricht von Lea

Hallo Karim,
mein Zug aus Hannover kommt am Donnerstag um 17:40 Uhr in Bremen an. Kannst du mich am Bahnhof abholen? Ich warte vor der Information. Mein Koffer ist sehr schwer. Am Abend möchte ich nur etwas Kleines essen, denn am Freitag beginnt mein Computerkurs schon um acht Uhr.

Liebe Grüße
Lea

TEXT B — Nachricht von Jana

Hallo zusammen,
am Sonntag ist der Flohmarkt in unserem Stadtteil. Wir treffen uns um neun Uhr vor der Schule und bauen dort zwei Tische auf. Bitte bringt eure alten Bücher, Kleidung und kleine Sachen mit. Getränke kaufe ich. Um 15 Uhr räumen wir alles wieder weg. Bei starkem Regen findet der Flohmarkt in der Sporthalle statt.

Viele Grüße
Jana`,
      questions: [
        { type: 'mcq', id: 'g-a1-2-l1', part: 4, stimulusLabel: 'Text A', text: 'Lea kommt am Donnerstag mit dem Zug.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-2-l2', part: 4, stimulusLabel: 'Text A', text: 'Karim soll am Freitagmorgen zum Bahnhof kommen.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-2-l3', part: 4, stimulusLabel: 'Text B', text: 'Die Gruppe trifft sich vor der Schule.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-2-l4', part: 4, stimulusLabel: 'Text B', text: 'Jana bittet die anderen, Getränke mitzubringen.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-2-l5', part: 4, stimulusLabel: 'Text B', text: 'Der Flohmarkt endet um 15 Uhr.', options: ['Richtig', 'Falsch'], answer: 0 },
      ],
    },
    {
      part: 5, skill: 'reading', title: 'Lesen – Teil 2: Anzeigen und Internetseiten',
      instructions: 'Wo finden Sie die richtige Information? Lesen Sie die Situation und wählen Sie A oder B.',
      questions: [
        { type: 'mcq', id: 'g-a1-2-l6', part: 5, stimulusLabel: 'Sie suchen einen Raum für eine Geburtstagsfeier mit 25 Personen.', stimulus: 'A — Ferienwohnung Rosa: Ruhige Wohnung für zwei Personen. Keine Feiern, keine Haustiere.\n\nB — Café Rosenhof: Heller Feierraum für 20 bis 40 Personen. Essen und Getränke nach Wunsch. Freitag und Samstag bis 24 Uhr.', stimulusStyle: 'notice', text: 'Welche Anzeige passt?', options: ['A', 'B'], answer: 1 },
        { type: 'mcq', id: 'g-a1-2-l7', part: 5, stimulusLabel: 'Sie müssen am Sonntagmorgen sehr früh zum Flughafen fahren.', stimulus: 'A — Airport-Express: Erste Fahrt täglich um 4:30 Uhr. Direkt vom Hauptbahnhof zum Flughafen. Fahrzeit 28 Minuten.\n\nB — Parkhaus Flughafen: Sicher parken ab 8 Euro pro Tag. Reservierung im Internet.', stimulusStyle: 'notice', text: 'Welche Anzeige passt?', options: ['A', 'B'], answer: 0 },
        { type: 'mcq', id: 'g-a1-2-l8', part: 5, stimulusLabel: 'Sie arbeiten tagsüber und möchten am Abend Deutsch lernen.', stimulus: 'A — Lernladen: Wörterbücher, Übungsbücher und Lernkarten für Deutsch A1 bis C1. Montag bis Samstag geöffnet.\n\nB — Sprachforum: Deutsch A1 am Montag und Mittwoch von 19 bis 21 Uhr. Kleine Gruppen, Start im Oktober.', stimulusStyle: 'notice', text: 'Welche Anzeige passt?', options: ['A', 'B'], answer: 1 },
        { type: 'mcq', id: 'g-a1-2-l9', part: 5, stimulusLabel: 'Sie möchten eine Zugfahrt und ein Hotel zusammen buchen.', stimulus: 'A — Reisewelt online: Bahnfahrkarten, Hotels und Wochenendreisen in einem Paket. Beratung auch per Telefon.\n\nB — Kulturkasse: Tickets für Konzerte, Kino und Theater. Keine Reisebuchungen.', stimulusStyle: 'notice', text: 'Welche Anzeige passt?', options: ['A', 'B'], answer: 0 },
        { type: 'mcq', id: 'g-a1-2-l10', part: 5, stimulusLabel: 'Sie brauchen am Wochenende jemanden für Ihren Hund.', stimulus: 'A — Tierarztzentrum Nord: Untersuchung und Operation nach Termin. Notfälle nur nachts.\n\nB — Hundeglück: Spaziergänge und Betreuung bei Ihnen zu Hause. Auch samstags und sonntags.', stimulusStyle: 'notice', text: 'Welche Anzeige passt?', options: ['A', 'B'], answer: 1 },
      ],
    },
    {
      part: 6, skill: 'reading', title: 'Lesen – Teil 3: Schilder und Hinweise',
      instructions: 'Lesen Sie die Texte und die Aufgaben 11 bis 15. Kreuzen Sie an: Richtig oder Falsch.',
      questions: [
        { type: 'mcq', id: 'g-a1-2-l11', part: 6, stimulusLabel: 'In der Postfiliale', stimulus: 'PAKETE ABHOLEN\nMontag bis Freitag: 14–18 Uhr\nBitte Ausweis und Abholschein mitbringen.\nSamstags bleibt die Filiale geschlossen.', stimulusStyle: 'sign', text: 'Für ein Paket braucht man einen Ausweis.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-2-l12', part: 6, stimulusLabel: 'Vor einem Geschäft', stimulus: 'Fahrradparkplatz hinter dem Haus\nBitte den Eingang freihalten.', stimulusStyle: 'sign', text: 'Fahrräder sollen direkt vor dem Eingang stehen.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-2-l13', part: 6, stimulusLabel: 'In einem Café', stimulus: 'Heute keine Kartenzahlung möglich.\nWir bitten um Barzahlung.\nDer nächste Geldautomat ist gegenüber.', stimulusStyle: 'sign', text: 'Heute kann man hier nur mit Bargeld bezahlen.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-2-l14', part: 6, stimulusLabel: 'Im Aufzug', stimulus: 'MAXIMAL 4 PERSONEN\nBitte nicht mehr gemeinsam einsteigen.', stimulusStyle: 'sign', text: 'Vier Personen dürfen zusammen den Aufzug benutzen.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-2-l15', part: 6, stimulusLabel: 'An der Bushaltestelle', stimulus: 'HALTESTELLE RATHAUS HEUTE GESCHLOSSEN\nBus 16 hält bis Freitag am Marktplatz vor der Apotheke.\nAb Samstag hält er wieder hier.', stimulusStyle: 'sign', text: 'Der Bus 16 hält heute am Rathaus.', options: ['Richtig', 'Falsch'], answer: 1 },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 1: Formular',
      instructions: 'In dem Formular fehlen fünf Informationen. Helfen Sie Ihrem Freund und schreiben Sie die fünf fehlenden Informationen in das Formular.',
      questions: [{
        type: 'formgroup', id: 'g-a1-2-s1', part: 7, qRange: [1, 5],
        groupLabel: 'Ihr Freund Amir Nasser ist 30 Jahre alt und kommt aus Ägypten. Er wohnt in Hamburg, in der Reeperbahn 42, und arbeitet als Reiseleiter. Ab dem 18. September möchte er im Kochstudio Hafen einen Abendkurs besuchen. Amir kann keine Nüsse essen. Seine Telefonnummer ist 0176 529 18 40. Er bezahlt den Kurs per Banküberweisung.',
        title: 'KOCHSTUDIO HAFEN · Anmeldung zum Abendkurs', example: 'Familienname, Vorname: Nasser, Amir',
        template: 'Herkunftsland: Ägypten\nAlter: {{1}}\nStraße, Hausnummer: Reeperbahn 42\nWohnort: {{2}}\nTelefon: 0176 529 18 40\nBeruf: {{3}}\nKurs: Abendkurs\nKursbeginn: {{4}}\nWichtige Information zum Essen: {{5}}\nZahlungsweise: Banküberweisung\nUnterschrift: Amir Nasser',
        blanks: [
          { num: 1, answers: ['30', '30 Jahre'], maxWords: 2 }, { num: 2, answers: ['Hamburg'], maxWords: 1 },
          { num: 3, answers: ['Reiseleiter'], maxWords: 1 }, { num: 4, answers: ['18. September', '18 September', '18.09.'], maxWords: 2 },
          { num: 5, answers: ['keine Nüsse', 'keine Nuesse', 'Nussallergie'], maxWords: 2 },
        ],
      }],
    },
    {
      part: 8, skill: 'writing', title: 'Schreiben – Teil 2: Kurze Mitteilung',
      instructions: 'Schreiben Sie einen kurzen Text. Schreiben Sie zu jedem Punkt ein bis zwei Sätze sowie eine Anrede und einen Gruß.',
      questions: [{
        type: 'write', id: 'g-a1-2-s2', part: 8, taskNumber: 1, stimulusLabel: 'Nachricht an Frau Brandt',
        stimulus: 'Sie möchten am Freitag bei Ihrer Hausmeisterin Frau Brandt den Schlüssel für Ihre neue Wohnung abholen. Sie haben 16 Uhr vereinbart, kommen aber später.',
        text: '• Warum schreiben Sie?\n• Sagen Sie: Sie kommen um 17:30 Uhr.\n• Fragen Sie: Wo ist der Schlüssel, wenn Frau Brandt nicht da ist?\n\nSchreiben Sie circa 30 Wörter. Schreiben Sie auch eine Anrede und einen Gruß.', minWords: 30,
      }],
    },
    { part: 9, skill: 'speaking', title: 'Sprechen – Teil 1: Sich vorstellen', instructions: 'Stellen Sie sich vor. Buchstabieren Sie danach Ihren Familiennamen und nennen Sie eine Telefonnummer.', questions: [{ type: 'speak', id: 'g-a1-2-sp1', part: 9, partNumber: 1, text: 'Name · Alter · Land · Wohnort · Sprachen · Beruf · Hobby\n\nDanach: Familienname buchstabieren und Telefonnummer nennen.' }] },
    { part: 10, skill: 'speaking', title: 'Sprechen – Teil 2: Um Informationen bitten und Informationen geben', instructions: 'Formulieren Sie zu jeder Karte eine Frage. Antworten Sie auf die Frage Ihrer Partnerin oder Ihres Partners.', questions: [{ type: 'speak', id: 'g-a1-2-sp2', part: 10, partNumber: 2, text: 'Runde 1: Wohnen · Runde 2: Reisen', cueCard: 'WOHNEN\nZimmer · Miete · Balkon · Nachbarn · Küche · Stadtteil\n\nREISEN\nZiel · Zug · Koffer · Hotel · Dauer · Urlaub' }] },
    { part: 11, skill: 'speaking', title: 'Sprechen – Teil 3: Bitten formulieren und darauf reagieren', instructions: 'Formulieren Sie zwei höfliche Bitten. Reagieren Sie auf zwei Bitten Ihrer Partnerin oder Ihres Partners.', questions: [{ type: 'speak', id: 'g-a1-2-sp3', part: 11, partNumber: 3, text: 'Benutzen Sie die Bildkarten. Beispiel: „Können Sie mir bitte das Salz geben?“ – „Ja, gern.“', cueCard: 'Salz · Glas · Schlüssel · Lampe · Teller · Jacke\nFenster · Handy · Fahrkarte · Kamera · Tür · Taxi' }] },
  ],
};

export default mock;
