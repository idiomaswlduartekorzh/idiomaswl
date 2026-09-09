import audioScript from './goethe-a1-set-1-audio.json';
import type { MockExam } from './types';

const transcriptFor = (partId: number) => {
  const part = audioScript.parts.find(item => item.id === partId);
  if (!part) return '';
  return part.items
    .map(item => `Nummer ${item.number}\n${item.turns.map(turn => turn.text).join('\n')}`)
    .join('\n\n');
};

// Goethe-Zertifikat A1 (Start Deutsch 1): contenido ORIGINAL de WeLearn,
// alineado con la arquitectura pública de Modellsatz/Übungssatz (febrero de 2024).
const mock: MockExam = {
  id: 'a1-1',
  examSlug: 'goethe',
  title: 'A1 – Simulacro 1 · formato Start Deutsch 1',
  subtitle: 'Hören · Lesen · Schreiben · Sprechen · contenido original WeLearn',
  timeMinutes: 80,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Hören – Teil 1: Kurze Gespräche',
      instructions: 'Was ist richtig? Wählen Sie A, B oder C. Sie hören jeden Text zweimal.',
      audioUrl: '/audio/goethe/a1-1/hoeren-teil1.mp3?v=20260908-signal', transcript: transcriptFor(1),
      questions: [
        { type: 'mcq', id: 'g-a1-1-h1', part: 1, text: 'Was kostet die Jacke heute?', options: ['18,90 €', '28,90 €', '38,90 €'], answer: 0 },
        { type: 'mcq', id: 'g-a1-1-h2', part: 1, text: 'Wann treffen sie sich?', options: ['16:30 Uhr', '16:45 Uhr', '17:15 Uhr'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-h3', part: 1, text: 'Was nimmt die Frau?', options: ['Tomatensuppe', 'Salat', 'Käsebrot'], answer: 2 },
        { type: 'mcq', id: 'g-a1-1-h4', part: 1, text: 'Wie viele Flaschen kaufen sie?', options: ['2', '4', '10'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-h5', part: 1, text: 'Wo sind die Kinderbücher?', options: ['im ersten Stock', 'im zweiten Stock', 'im dritten Stock'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-h6', part: 1, text: 'Wie lange bleibt die Frau in Köln?', options: ['zwei Nächte', 'drei Nächte', 'eine Woche'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'listening', title: 'Hören – Teil 2: Ansagen',
      instructions: 'Kreuzen Sie an: Richtig oder Falsch. Sie hören jeden Text einmal.',
      audioUrl: '/audio/goethe/a1-1/hoeren-teil2.mp3?v=20260908-signal', transcript: transcriptFor(2),
      questions: [
        { type: 'mcq', id: 'g-a1-1-h7', part: 2, text: 'Der Zug nach Bonn fährt von Gleis 4.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-h8', part: 2, text: 'Der Bus fährt um 14:30 Uhr weiter.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-1-h9', part: 2, text: 'Die Möbelabteilung ist heute geöffnet.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-h10', part: 2, text: 'Frau García soll zu Ausgang B12 kommen.', options: ['Richtig', 'Falsch'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'listening', title: 'Hören – Teil 3: Telefonische Nachrichten',
      instructions: 'Was ist richtig? Wählen Sie A, B oder C. Sie hören jeden Text zweimal.',
      audioUrl: '/audio/goethe/a1-1/hoeren-teil3.mp3?v=20260908-signal', transcript: transcriptFor(3),
      questions: [
        { type: 'mcq', id: 'g-a1-1-h11', part: 3, text: 'Wann ist der neue Termin?', options: ['Dienstag, 10 Uhr', 'Mittwoch, 10 Uhr', 'Mittwoch, 12 Uhr'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-h12', part: 3, text: 'Wo treffen sich Lea und Ben?', options: ['im Café', 'vor dem Kino', 'vor der Apotheke'], answer: 2 },
        { type: 'mcq', id: 'g-a1-1-h13', part: 3, text: 'Wann soll Jonas sein Fahrrad holen?', options: ['heute vor 17 Uhr', 'morgen vor 12 Uhr', 'morgen nach 17 Uhr'], answer: 0 },
        { type: 'mcq', id: 'g-a1-1-h14', part: 3, text: 'Was möchte Paul?', options: ['einen Drucker benutzen', 'Tickets kaufen', 'einen Computer reparieren'], answer: 0 },
        { type: 'mcq', id: 'g-a1-1-h15', part: 3, text: 'Was soll David kaufen?', options: ['Brot und Milch', 'Brot und Äpfel', 'Milch und Äpfel'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Lesen – Teil 1: Nachrichten',
      instructions: 'Lesen Sie die beiden Texte und die Aufgaben 1 bis 5. Kreuzen Sie an: Richtig oder Falsch.',
      passageTitle: 'Zwei persönliche Nachrichten',
      passage: `TEXT A — Nachricht von Nora\n\nHallo Luis,\nmein Bus aus Leipzig kommt am Freitag um 13:20 Uhr in Dresden an. Kannst du mich am ZOB abholen? Ich warte am Eingang neben dem Bäcker. Wenn der Bus später kommt, schreibe ich dir. Abends möchte ich gern mit dir und Jana essen gehen.\n\nLiebe Grüße\nNora\n\nTEXT B — Nachricht von Tim\n\nLiebe Freunde,\nam Sonntag machen wir ein Picknick am See. Wir treffen uns um elf Uhr vor dem Bahnhof und fahren zusammen mit dem Fahrrad. Bitte bringt etwas zu trinken mit. Essen und Kuchen habe ich schon. Bei Regen treffen wir uns bei mir zu Hause. Gebt mir bitte bis Freitag Bescheid.\n\nViele Grüße\nTim`,
      questions: [
        { type: 'mcq', id: 'g-a1-1-l1', part: 4, stimulusLabel: 'Text A', text: 'Nora kommt am Freitag mit dem Bus.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-1-l2', part: 4, stimulusLabel: 'Text A', text: 'Luis soll vor dem Bäcker warten.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-l3', part: 4, stimulusLabel: 'Text B', text: 'Das Picknick ist am Samstag.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-l4', part: 4, stimulusLabel: 'Text B', text: 'Die Freunde sollen Getränke mitbringen.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-1-l5', part: 4, stimulusLabel: 'Text B', text: 'Bei Regen fällt das Treffen aus.', options: ['Richtig', 'Falsch'], answer: 1 },
      ],
    },
    {
      part: 5, skill: 'reading', title: 'Lesen – Teil 2: Anzeigen und Internetseiten',
      instructions: 'Wo finden Sie die richtige Information? Lesen Sie die Situation und wählen Sie A oder B.',
      questions: [
        { type: 'mcq', id: 'g-a1-1-l6', part: 5, stimulus: 'A — Radhaus: Fahrräder kaufen und reparieren. Mo–Sa 9–18 Uhr.\n\nB — City-Rad: Fahrradtouren mit Guide. Jeden Sonntag um 10 Uhr.', stimulusLabel: 'Sie möchten am Wochenende eine Fahrradtour machen.', stimulusStyle: 'notice', text: 'Welche Anzeige passt?', options: ['A', 'B'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-l7', part: 5, stimulus: 'A — Sprachpunkt: Deutschkurse A1 am Vormittag und am Abend.\n\nB — Bücherwelt: Wörterbücher und Lernbücher. Heute 20 % Rabatt.', stimulusLabel: 'Sie möchten abends Deutsch lernen.', stimulusStyle: 'notice', text: 'Welche Anzeige passt?', options: ['A', 'B'], answer: 0 },
        { type: 'mcq', id: 'g-a1-1-l8', part: 5, stimulus: 'A — Pension Wald: Zimmer ab 45 Euro, Frühstück inklusive.\n\nB — Restaurant Wald: Frühstücksbuffet sonntags, 18 Euro pro Person.', stimulusLabel: 'Sie suchen ein günstiges Zimmer mit Frühstück.', stimulusStyle: 'notice', text: 'Welche Anzeige passt?', options: ['A', 'B'], answer: 0 },
        { type: 'mcq', id: 'g-a1-1-l9', part: 5, stimulus: 'A — Ticketbüro: Karten für Theater und Konzerte.\n\nB — Reisebüro Sonnig: Flug- und Zugtickets, Hotels und Ausflüge.', stimulusLabel: 'Sie möchten eine Zugfahrt buchen.', stimulusStyle: 'notice', text: 'Welche Anzeige passt?', options: ['A', 'B'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-l10', part: 5, stimulus: 'A — Praxis Dr. Koch: Termine telefonisch von 8 bis 12 Uhr.\n\nB — Apotheke am Ring: Nacht- und Notdienst, täglich geöffnet.', stimulusLabel: 'Sie brauchen am Sonntagabend Medikamente.', stimulusStyle: 'notice', text: 'Welche Anzeige passt?', options: ['A', 'B'], answer: 1 },
      ],
    },
    {
      part: 6, skill: 'reading', title: 'Lesen – Teil 3: Schilder und Hinweise',
      instructions: 'Lesen Sie die Texte und die Aufgaben 11 bis 15. Kreuzen Sie an: Richtig oder Falsch.',
      questions: [
        { type: 'mcq', id: 'g-a1-1-l11', part: 6, stimulus: 'RUHETAG\nDienstag geschlossen', stimulusLabel: 'Am Restaurant', stimulusStyle: 'sign', text: 'Am Dienstag kann man hier nicht essen.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-1-l12', part: 6, stimulus: 'FAHRSTUHL AUSSER BETRIEB\nBitte benutzen Sie die Treppe.', stimulusLabel: 'Im Hotel', stimulusStyle: 'sign', text: 'Man muss die Treppe nehmen.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-1-l13', part: 6, stimulus: 'Bibliothek\nRückgabe von Büchern auch am Automaten', stimulusLabel: 'An der Bibliothek', stimulusStyle: 'sign', text: 'Bücher kann man nur bei einer Person zurückgeben.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-l14', part: 6, stimulus: 'Bitte keine Fahrräder vor dem Eingang abstellen.', stimulusLabel: 'Vor einem Geschäft', stimulusStyle: 'sign', text: 'Fahrräder dürfen hier stehen.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-l15', part: 6, stimulus: 'Bus 24\nHeute nur bis Marktplatz.\nWeiterfahrt mit Bus 8.', stimulusLabel: 'An der Haltestelle', stimulusStyle: 'sign', text: 'Der Bus 24 fährt heute nicht weiter als bis zum Marktplatz.', options: ['Richtig', 'Falsch'], answer: 0 },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 1: Formular',
      instructions: 'Ihr Freund Samuel möchte einen Deutschkurs besuchen. Helfen Sie ihm und schreiben Sie die fünf fehlenden Informationen in das Formular.',
      questions: [{
        type: 'formgroup', id: 'g-a1-1-s1', part: 7, qRange: [1, 5],
        groupLabel: 'Informationen: Samuel Okafor, 27 Jahre, aus Nigeria, wohnt in Köln, Telefon 0157 408 92 31. Er möchte ab 14. Oktober einen Abendkurs besuchen und bar bezahlen.',
        title: 'SPRACHHAUS KÖLN · Anmeldung Deutschkurs', example: 'Familienname, Vorname: Okafor, Samuel',
        template: 'Alter: {{1}}\nWohnort: {{2}}\nTelefon: {{3}}\nKursbeginn: {{4}}\nZahlungsweise: {{5}}',
        blanks: [
          { num: 1, answers: ['27', '27 Jahre'], maxWords: 2 },
          { num: 2, answers: ['Köln', 'Koeln'], maxWords: 1 },
          { num: 3, answers: ['0157 408 92 31', '01574089231'], maxWords: 4 },
          { num: 4, answers: ['14. Oktober', '14 Oktober', '14.10.'], maxWords: 2 },
          { num: 5, answers: ['bar', 'Bar'], maxWords: 1 }
        ]
      }],
    },
    {
      part: 8, skill: 'writing', title: 'Schreiben – Teil 2: Kurze Mitteilung',
      instructions: 'Schreiben Sie einen kurzen Text. Schreiben Sie zu jedem Punkt ein bis zwei Sätze sowie eine Anrede und einen Gruß.',
      questions: [{
        type: 'write', id: 'g-a1-1-s2', part: 8, taskNumber: 1,
        stimulusLabel: 'Nachricht an das Gästehaus Linden',
        stimulus: 'Sie möchten im November ein Wochenende in Freiburg verbringen. Schreiben Sie an das Gästehaus Linden.',
        text: '• Warum schreiben Sie?\n• Fragen Sie nach einem Zimmer für zwei Personen.\n• Fragen Sie nach dem Preis mit Frühstück.\n\nSchreiben Sie circa 30 Wörter. Schreiben Sie auch eine Anrede und einen Gruß.',
        minWords: 30
      }],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 1: Sich vorstellen',
      instructions: 'Stellen Sie sich vor. Buchstabieren Sie danach Ihren Familiennamen und nennen Sie eine Telefonnummer.',
      questions: [{ type: 'speak', id: 'g-a1-1-sp1', part: 9, partNumber: 1, text: 'Name · Alter · Land · Wohnort · Sprachen · Beruf · Hobby\n\nDanach: Familienname buchstabieren und Telefonnummer nennen.' }],
    },
    {
      part: 10, skill: 'speaking', title: 'Sprechen – Teil 2: Um Informationen bitten und Informationen geben',
      instructions: 'Formulieren Sie zu jeder Karte eine Frage. Antworten Sie auf die Frage Ihrer Partnerin oder Ihres Partners.',
      questions: [{ type: 'speak', id: 'g-a1-1-sp2', part: 10, partNumber: 2, text: 'Runde 1: Freizeit · Runde 2: Arbeit', cueCard: 'FREIZEIT\nWochenende · Musik · Freunde · Sport · Kino · Urlaub\n\nARBEIT\nBeruf · Arbeitszeit · Pause · Kolleginnen · Büro · Urlaub' }],
    },
    {
      part: 11, skill: 'speaking', title: 'Sprechen – Teil 3: Bitten formulieren und darauf reagieren',
      instructions: 'Formulieren Sie zwei höfliche Bitten. Reagieren Sie auf zwei Bitten Ihrer Partnerin oder Ihres Partners.',
      questions: [{ type: 'speak', id: 'g-a1-1-sp3', part: 11, partNumber: 3, text: 'Benutzen Sie die Bildkarten. Beispiel: „Können Sie mir bitte das Wasser geben?“ – „Ja, gern.“', cueCard: 'Wasser · Fenster · Bleistift · Stuhl · Apfel · Uhr\nnicht rauchen · Radio · Buch · Tasche · Löffel · Tür' }],
    }
  ],
};

export default mock;
