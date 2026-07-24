import type { MockExam } from './types';

// Goethe-Zertifikat A1 (Start Deutsch 1) — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/a1-2/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'a1-2',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat A1 – Übungstest 2',
  subtitle: 'Hören · Lesen · Schreiben · Sprechen',
  timeMinutes: 65,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Hören – Teil 1: Kurze Gespräche',
      instructions: 'Was ist richtig? Hören Sie jedes Gespräch einmal und wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a1-2/hoeren-teil1.mp3',
      transcript: `Gespräch 1 — Frau: Wo ist die Post, bitte? Mann: Gehen Sie geradeaus und dann die erste Straße links.\n\nGespräch 2 — Kind: Was kostet das Eis? Verkäufer: Eine Kugel kostet einen Euro fünfzig.\n\nGespräch 3 — Mann: Welche Farbe hat dein neues Auto? Frau: Es ist blau.\n\nGespräch 4 — Frau: Wie viele Personen kommen zum Essen? Mann: Wir sind fünf, mit den Kindern.`,
      questions: [
        { type: 'mcq', id: 'g-a1-2-h1', part: 1, text: 'Wo ist die Post?', options: ['Geradeaus, erste Straße rechts', 'Geradeaus, erste Straße links', 'Zweite Straße links'], answer: 1 },
        { type: 'mcq', id: 'g-a1-2-h2', part: 1, text: 'Was kostet eine Kugel Eis?', options: ['2,00 €', '1,00 €', '1,50 €'], answer: 2 },
        { type: 'mcq', id: 'g-a1-2-h3', part: 1, text: 'Welche Farbe hat das Auto?', options: ['Grün', 'Blau', 'Rot'], answer: 1 },
        { type: 'mcq', id: 'g-a1-2-h4', part: 1, text: 'Wie viele Personen kommen zum Essen?', options: ['Drei', 'Fünf', 'Zwei'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'listening', title: 'Hören – Teil 2: Durchsagen',
      instructions: 'Kreuzen Sie an: richtig oder falsch? Sie hören jede Durchsage einmal.',
      audioUrl: '/audio/goethe/a1-2/hoeren-teil2.mp3',
      transcript: `Durchsage 1 — Liebe Fahrgäste, der Bus der Linie 12 hat heute zehn Minuten Verspätung.\n\nDurchsage 2 — Achtung im Supermarkt: Heute gibt es frische Erdbeeren im Angebot, nur zwei Euro.\n\nDurchsage 3 — Guten Tag. Das Schwimmbad ist heute wegen Reparatur geschlossen.`,
      questions: [
        { type: 'mcq', id: 'g-a1-2-h5', part: 2, text: 'Der Bus Linie 12 kommt pünktlich.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-2-h6', part: 2, text: 'Die Erdbeeren kosten zwei Euro.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a1-2-h7', part: 2, text: 'Das Schwimmbad ist heute geöffnet.', options: ['Falsch', 'Richtig'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'listening', title: 'Hören – Teil 3: Telefonansagen',
      instructions: 'Was ist richtig? Hören Sie jede Ansage einmal und wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a1-2/hoeren-teil3.mp3',
      transcript: `Ansage 1 — Hallo Sabine, hier ist Klaus. Ich hole dich morgen um neun Uhr mit dem Auto ab. Warte bitte vor dem Haus.\n\nAnsage 2 — Guten Tag, hier ist das Reisebüro Sonne. Ihre Flugtickets sind fertig. Sie können sie am Freitag abholen.\n\nAnsage 3 — Hi Papa, hier ist Nina. Ich komme heute später nach Hause, so gegen sieben. Ich bin bei Lena.`,
      questions: [
        { type: 'mcq', id: 'g-a1-2-h8', part: 3, text: 'Wann holt Klaus Sabine ab?', options: ['Um 7 Uhr', 'Um 9 Uhr morgen', 'Um 9 Uhr heute'], answer: 1 },
        { type: 'mcq', id: 'g-a1-2-h9', part: 3, text: 'Wann kann man die Flugtickets abholen?', options: ['Am Montag', 'Heute', 'Am Freitag'], answer: 2 },
        { type: 'mcq', id: 'g-a1-2-h10', part: 3, text: 'Wann kommt Nina nach Hause?', options: ['Um 5 Uhr', 'Gegen 7 Uhr', 'Am Morgen'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Lesen – Teil 1: E-Mails',
      instructions: 'Lesen Sie die E-Mail. Kreuzen Sie an: richtig oder falsch?',
      passage: `Hallo Tom,\n\nvielen Dank für deine E-Mail! Ja, ich komme gern mit ins Schwimmbad. Aber am Sonntag kann ich leider nicht, ich besuche meine Oma. Können wir am Samstag gehen? Ich habe um 14 Uhr Zeit. Bitte bring auch deinen Bruder mit. Das Wetter soll schön werden.\n\nBis Samstag!\nFelix`,
      passageTitle: 'E-Mail von Felix',
      questions: [
        { type: 'mcq', id: 'g-a1-2-l1', part: 4, text: 'Felix möchte ins Schwimmbad gehen.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-2-l2', part: 4, text: 'Am Sonntag hat Felix keine Zeit.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a1-2-l3', part: 4, text: 'Felix will am Samstag um 12 Uhr gehen.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-2-l4', part: 4, text: 'Tom soll seinen Bruder mitbringen.', options: ['Richtig', 'Falsch'], answer: 0 },
      ],
    },
    {
      part: 5, skill: 'reading', title: 'Lesen – Teil 2: Anzeigen',
      instructions: 'Lesen Sie die Situationen und die Anzeigen. Wo finden Sie was? Wählen Sie die richtige Anzeige.',
      passage: `Anzeige A — Fahrschule Müller: Führerschein schnell und günstig. Theorie online, Praxis mit netten Fahrlehrern.\n\nAnzeige B — Bäckerei Korn: Frisches Brot und Kuchen. Täglich ab 6 Uhr geöffnet. Sonntags Brötchen frisch!\n\nAnzeige C — Bibliothek Stadtmitte: Bücher, Zeitschriften und Internet. Mo–Fr 10–19 Uhr. Ausweis kostenlos.`,
      passageTitle: 'Anzeigen',
      questions: [
        { type: 'mcq', id: 'g-a1-2-l5', part: 5, text: 'Sie möchten ein Buch lesen. Welche Anzeige passt?', options: ['Anzeige B', 'Anzeige C', 'Anzeige A'], answer: 1 },
        { type: 'mcq', id: 'g-a1-2-l6', part: 5, text: 'Sie möchten den Führerschein machen. Welche Anzeige passt?', options: ['Anzeige A', 'Anzeige B', 'Anzeige C'], answer: 0 },
        { type: 'mcq', id: 'g-a1-2-l7', part: 5, text: 'Sie möchten am Sonntag frische Brötchen kaufen. Welche Anzeige passt?', options: ['Anzeige C', 'Anzeige A', 'Anzeige B'], answer: 2 },
      ],
    },
    {
      part: 6, skill: 'reading', title: 'Lesen – Teil 3: Schilder und Hinweise',
      instructions: 'Lesen Sie die Schilder. Kreuzen Sie an: richtig oder falsch?',
      passage: `Schild 1 (am Eingang): "Bitte die Schuhe ausziehen."\n\nSchild 2 (im Krankenhaus): "Handys bitte ausschalten."\n\nSchild 3 (am Parkplatz): "Parken nur für Kunden. Maximal 2 Stunden."`,
      passageTitle: 'Schilder',
      questions: [
        { type: 'mcq', id: 'g-a1-2-l8', part: 6, text: 'Man soll die Schuhe ausziehen.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a1-2-l9', part: 6, text: 'Im Krankenhaus darf das Handy laut sein.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-a1-2-l10', part: 6, text: 'Man darf hier maximal zwei Stunden parken.', options: ['Falsch', 'Richtig'], answer: 1 },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 1: Formular',
      instructions: 'Ihre Freundin Yuki möchte sich in einem Fitnessstudio anmelden. Schreiben Sie die Informationen in Sätzen.',
      questions: [
        {
          type: 'write', id: 'g-a1-2-s1', part: 7, taskNumber: 1,
          stimulusLabel: 'Anmeldung Fitnessstudio',
          stimulus: 'Informationen über Yuki:\n• Name: Yuki Tanaka\n• Aus: Japan, wohnt in Berlin\n• Alter: 28 Jahre\n• Beruf: Ärztin\n• Möchte: dreimal pro Woche trainieren, am Abend',
          text: 'Schreiben Sie 5 kurze Sätze mit den Informationen über Yuki (Name, Herkunft, Wohnort, Alter, Beruf, Wunsch).',
          minWords: 20,
        },
      ],
    },
    {
      part: 8, skill: 'writing', title: 'Schreiben – Teil 2: Kurze Mitteilung',
      instructions: 'Schreiben Sie eine kurze Nachricht.',
      questions: [
        {
          type: 'write', id: 'g-a1-2-s2', part: 8, taskNumber: 2,
          stimulusLabel: 'Einladung an einen Freund',
          stimulus: 'Situation: Sie möchten am Wochenende mit Ihrem Freund Ben Fußball spielen. Schreiben Sie ihm eine Nachricht.',
          text: 'Schreiben Sie an Ben: 1) Vorschlag (Fußball spielen am Samstag), 2) Wo und wann?, 3) Bitte um Antwort. Schreiben Sie 3–4 Sätze mit Anrede und Gruß. (ca. 30 Wörter)',
          minWords: 30,
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 1: Sich vorstellen',
      instructions: 'Stellen Sie sich vor. Sprechen Sie über sich.',
      questions: [
        {
          type: 'speak', id: 'g-a1-2-sp1', part: 9, partNumber: 1,
          text: 'Stellen Sie sich vor: Name, Alter, Land, Wohnort, Sprachen, Beruf und Hobby. Buchstabieren Sie Ihren Namen und nennen Sie Ihre Telefonnummer.',
        },
      ],
    },
    {
      part: 10, skill: 'speaking', title: 'Sprechen – Teil 2: Um Informationen bitten',
      instructions: 'Stellen Sie Fragen und antworten Sie zum Thema auf den Karten.',
      questions: [
        {
          type: 'speak', id: 'g-a1-2-sp2', part: 10, partNumber: 2,
          text: 'Thema: "Freizeit". Bilden Sie zu jedem Wort eine Frage und antworten Sie.',
          cueCard: 'Wörter zum Thema Freizeit:\n• Hobby\n• Wochenende\n• Sport\n• Wie oft?\n• Mit wem?\n\nBeispiel: "Was machst du am Wochenende?"',
        },
      ],
    },
    {
      part: 11, skill: 'speaking', title: 'Sprechen – Teil 3: Bitten und darauf reagieren',
      instructions: 'Bitten Sie um etwas und reagieren Sie auf die Bitten Ihres Partners.',
      questions: [
        {
          type: 'speak', id: 'g-a1-2-sp3', part: 11, partNumber: 3,
          text: 'Formulieren Sie höfliche Bitten zu den Bildkarten und reagieren Sie darauf.',
          cueCard: 'Bildkarten (Situationen):\n• die Tür schließen\n• den Stift geben\n• die Heizung anmachen\n• einen Kaffee\n\nBeispiel: "Kannst du bitte die Tür schließen?" – "Ja, natürlich."',
        },
      ],
    },
  ],
};

export default mock;
