import type { MockExam } from './types';

// Goethe-Zertifikat A1 (Start Deutsch 1) — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/a1-3/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'a1-3',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat A1 – Übungstest 3',
  subtitle: 'Hören · Lesen · Schreiben · Sprechen',
  timeMinutes: 65,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Hören – Teil 1: Kurze Gespräche',
      instructions: 'Was ist richtig? Hören Sie jedes Gespräch einmal und wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a1-3/hoeren-teil1.mp3',
      transcript: `Gespräch 1 — Mann: Wann öffnet die Apotheke? Frau: Um halb neun am Morgen.\n\nGespräch 2 — Frau: Wie kommst du zur Arbeit? Mann: Mit dem Fahrrad, das dauert nur zehn Minuten.\n\nGespräch 3 — Kind: Wo sind meine Schuhe? Vater: Sie sind unter dem Bett.\n\nGespräch 4 — Verkäuferin: Möchten Sie noch etwas? Kunde: Ja, ein Kilo Äpfel, bitte.`,
      questions: [
        { type: 'mcq', id: 'g-a1-3-h1', part: 1, text: 'Wann öffnet die Apotheke?', options: ['Um 9:30 Uhr', 'Um 8:00 Uhr', 'Um 8:30 Uhr'], answer: 2 },
        { type: 'mcq', id: 'g-a1-3-h2', part: 1, text: 'Wie kommt der Mann zur Arbeit?', options: ['Mit dem Bus', 'Mit dem Auto', 'Mit dem Fahrrad'], answer: 2 },
        { type: 'mcq', id: 'g-a1-3-h3', part: 1, text: 'Wo sind die Schuhe?', options: ['Neben der Tür', 'Unter dem Bett', 'Im Schrank'], answer: 1 },
        { type: 'mcq', id: 'g-a1-3-h4', part: 1, text: 'Was kauft der Kunde noch?', options: ['Ein Kilo Äpfel', 'Ein Kilo Bananen', 'Ein Kilo Birnen'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'listening', title: 'Hören – Teil 2: Durchsagen',
      instructions: 'Kreuzen Sie an: richtig oder falsch? Sie hören jede Durchsage einmal.',
      audioUrl: '/audio/goethe/a1-3/hoeren-teil2.mp3',
      transcript: `Durchsage 1 — Liebe Gäste, das Frühstück gibt es von sieben bis zehn Uhr im Restaurant im ersten Stock.\n\nDurchsage 2 — Achtung: Der Aufzug ist heute kaputt. Bitte benutzen Sie die Treppe.\n\nDurchsage 3 — Guten Tag, hier spricht der Kapitän. In zwanzig Minuten landen wir in Frankfurt.`,
      questions: [
        { type: 'mcq', id: 'g-a1-3-h5', part: 2, text: 'Das Frühstück ist im ersten Stock.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a1-3-h6', part: 2, text: 'Der Aufzug funktioniert heute.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-3-h7', part: 2, text: 'Das Flugzeug landet in Frankfurt.', options: ['Falsch', 'Richtig'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'listening', title: 'Hören – Teil 3: Telefonansagen',
      instructions: 'Was ist richtig? Hören Sie jede Ansage einmal und wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a1-3/hoeren-teil3.mp3',
      transcript: `Ansage 1 — Hallo Maria, hier ist der Zahnarzt Dr. Klein. Ihr Termin morgen um 10 Uhr fällt leider aus. Wir rufen Sie an.\n\nAnsage 2 — Hi Jonas, hier ist Emma. Vergiss nicht, morgen bringst du das Deutschbuch mit, ja? Danke!\n\nAnsage 3 — Guten Abend, hier ist das Kino Central. Der Film beginnt heute nicht um 20 Uhr, sondern um 21 Uhr.`,
      questions: [
        { type: 'mcq', id: 'g-a1-3-h8', part: 3, text: 'Der Termin beim Zahnarzt findet morgen statt.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-3-h9', part: 3, text: 'Was soll Jonas mitbringen?', options: ['Einen Stift', 'Ein Wörterbuch', 'Das Deutschbuch'], answer: 2 },
        { type: 'mcq', id: 'g-a1-3-h10', part: 3, text: 'Wann beginnt der Film heute?', options: ['Um 21 Uhr', 'Um 19 Uhr', 'Um 20 Uhr'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Lesen – Teil 1: E-Mails',
      instructions: 'Lesen Sie die E-Mail. Kreuzen Sie an: richtig oder falsch?',
      passage: `Liebe Frau Berger,\n\nich kann leider am Montag nicht zum Deutschkurs kommen. Ich habe einen Termin beim Arzt um 10 Uhr. Können Sie mir bitte die Hausaufgaben per E-Mail schicken? Am Mittwoch bin ich wieder da.\n\nVielen Dank und viele Grüße\nAmir Hassan`,
      passageTitle: 'E-Mail von Amir',
      questions: [
        { type: 'mcq', id: 'g-a1-3-l1', part: 4, text: 'Amir kommt am Montag nicht zum Kurs.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a1-3-l2', part: 4, text: 'Amir hat einen Termin beim Friseur.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-3-l3', part: 4, text: 'Amir möchte die Hausaufgaben per E-Mail.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a1-3-l4', part: 4, text: 'Am Mittwoch kommt Amir wieder.', options: ['Richtig', 'Falsch'], answer: 0 },
      ],
    },
    {
      part: 5, skill: 'reading', title: 'Lesen – Teil 2: Anzeigen',
      instructions: 'Lesen Sie die Situationen und die Anzeigen. Wählen Sie die richtige Anzeige.',
      passage: `Anzeige A — Tanzschule Rhythmus: Salsa, Tango und mehr. Kurse für Anfänger jeden Dienstag um 19 Uhr.\n\nAnzeige B — Zahnarztpraxis Dr. Sommer: Neue Patienten willkommen. Termine auch am Samstag.\n\nAnzeige C — Café am See: Kaffee, Kuchen und Eis. Schöner Blick auf den See. Täglich 10–20 Uhr.`,
      passageTitle: 'Anzeigen',
      questions: [
        { type: 'mcq', id: 'g-a1-3-l5', part: 5, text: 'Sie möchten tanzen lernen. Welche Anzeige passt?', options: ['Anzeige C', 'Anzeige A', 'Anzeige B'], answer: 1 },
        { type: 'mcq', id: 'g-a1-3-l6', part: 5, text: 'Ihr Zahn tut weh. Welche Anzeige passt?', options: ['Anzeige B', 'Anzeige C', 'Anzeige A'], answer: 0 },
        { type: 'mcq', id: 'g-a1-3-l7', part: 5, text: 'Sie möchten Kaffee mit Aussicht trinken. Welche Anzeige passt?', options: ['Anzeige A', 'Anzeige B', 'Anzeige C'], answer: 2 },
      ],
    },
    {
      part: 6, skill: 'reading', title: 'Lesen – Teil 3: Schilder und Hinweise',
      instructions: 'Lesen Sie die Schilder. Kreuzen Sie an: richtig oder falsch?',
      passage: `Schild 1 (im Zug): "Diese Plätze sind für Familien mit Kindern reserviert."\n\nSchild 2 (im Museum): "Fotografieren ohne Blitz erlaubt."\n\nSchild 3 (am Strand): "Baden nur bis 18 Uhr. Danach kein Rettungsschwimmer."`,
      passageTitle: 'Schilder',
      questions: [
        { type: 'mcq', id: 'g-a1-3-l8', part: 6, text: 'Die Plätze sind für Familien mit Kindern.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-3-l9', part: 6, text: 'Im Museum darf man mit Blitz fotografieren.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-3-l10', part: 6, text: 'Man darf am Strand bis 18 Uhr baden.', options: ['Richtig', 'Falsch'], answer: 0 },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 1: Formular',
      instructions: 'Ihr Freund Carlos möchte ein Bankkonto eröffnen. Schreiben Sie die Informationen in Sätzen.',
      questions: [
        {
          type: 'write', id: 'g-a1-3-s1', part: 7, taskNumber: 1,
          stimulusLabel: 'Formular Bank',
          stimulus: 'Informationen über Carlos:\n• Name: Carlos Mendes\n• Aus: Portugal, wohnt in München\n• Alter: 31 Jahre\n• Beruf: Koch\n• Möchte: ein neues Konto, mit Bankkarte',
          text: 'Schreiben Sie 5 kurze Sätze mit den Informationen über Carlos (Name, Herkunft, Wohnort, Alter, Beruf, Wunsch).',
          minWords: 20,
        },
      ],
    },
    {
      part: 8, skill: 'writing', title: 'Schreiben – Teil 2: Kurze Mitteilung',
      instructions: 'Schreiben Sie eine kurze Nachricht.',
      questions: [
        {
          type: 'write', id: 'g-a1-3-s2', part: 8, taskNumber: 2,
          stimulusLabel: 'Nachricht an einen Nachbarn',
          stimulus: 'Situation: Sie fahren eine Woche in den Urlaub. Ihr Nachbar Herr Fischer soll Ihre Blumen gießen. Schreiben Sie ihm eine Nachricht.',
          text: 'Schreiben Sie an Herrn Fischer: 1) Grund (Sie fahren in den Urlaub), 2) Bitte (Blumen gießen), 3) Dank. 3–4 Sätze mit Anrede und Gruß. (ca. 30 Wörter)',
          minWords: 30,
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 1: Sich vorstellen',
      instructions: 'Stellen Sie sich vor. Sprechen Sie über sich.',
      questions: [
        {
          type: 'speak', id: 'g-a1-3-sp1', part: 9, partNumber: 1,
          text: 'Stellen Sie sich vor: Name, Alter, Land, Wohnort, Sprachen, Beruf und Hobby. Buchstabieren Sie Ihren Namen und nennen Sie Ihre Telefonnummer.',
        },
      ],
    },
    {
      part: 10, skill: 'speaking', title: 'Sprechen – Teil 2: Um Informationen bitten',
      instructions: 'Stellen Sie Fragen und antworten Sie zum Thema auf den Karten.',
      questions: [
        {
          type: 'speak', id: 'g-a1-3-sp2', part: 10, partNumber: 2,
          text: 'Thema: "Essen". Bilden Sie zu jedem Wort eine Frage und antworten Sie.',
          cueCard: 'Wörter zum Thema Essen:\n• Frühstück\n• Getränk\n• Restaurant\n• Was gern?\n• Wann?\n\nBeispiel: "Was isst du zum Frühstück?"',
        },
      ],
    },
    {
      part: 11, skill: 'speaking', title: 'Sprechen – Teil 3: Bitten und darauf reagieren',
      instructions: 'Bitten Sie um etwas und reagieren Sie auf die Bitten Ihres Partners.',
      questions: [
        {
          type: 'speak', id: 'g-a1-3-sp3', part: 11, partNumber: 3,
          text: 'Formulieren Sie höfliche Bitten zu den Bildkarten und reagieren Sie darauf.',
          cueCard: 'Bildkarten (Situationen):\n• das Salz geben\n• das Fenster aufmachen\n• die Musik leiser machen\n• helfen tragen\n\nBeispiel: "Kannst du mir bitte das Salz geben?" – "Ja, hier bitte."',
        },
      ],
    },
  ],
};

export default mock;
