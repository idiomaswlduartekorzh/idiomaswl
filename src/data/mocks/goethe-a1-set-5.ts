import type { MockExam } from './types';

// Goethe-Zertifikat A1 (Start Deutsch 1) — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/a1-5/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'a1-5',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat A1 – Übungstest 5',
  subtitle: 'Hören · Lesen · Schreiben · Sprechen',
  timeMinutes: 65,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Hören – Teil 1: Kurze Gespräche',
      instructions: 'Was ist richtig? Hören Sie jedes Gespräch einmal und wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a1-5/hoeren-teil1.mp3',
      transcript: `Gespräch 1 — Frau: Wie ist das Wetter heute? Mann: Es regnet und ist kalt.\n\nGespräch 2 — Verkäufer: Welche Größe brauchen Sie? Kundin: Größe achtunddreißig, bitte.\n\nGespräch 3 — Kind: Wann kommt Papa nach Hause? Mutter: Um sechs Uhr am Abend.\n\nGespräch 4 — Mann: Wo arbeitest du? Frau: In einem Krankenhaus, ich bin Krankenschwester.`,
      questions: [
        { type: 'mcq', id: 'g-a1-5-h1', part: 1, text: 'Wie ist das Wetter?', options: ['Sonnig und warm', 'Es regnet und ist kalt', 'Es schneit'], answer: 1 },
        { type: 'mcq', id: 'g-a1-5-h2', part: 1, text: 'Welche Größe braucht die Kundin?', options: ['40', '36', '38'], answer: 2 },
        { type: 'mcq', id: 'g-a1-5-h3', part: 1, text: 'Wann kommt Papa nach Hause?', options: ['Um 6 Uhr morgens', 'Um 8 Uhr', 'Um 6 Uhr abends'], answer: 2 },
        { type: 'mcq', id: 'g-a1-5-h4', part: 1, text: 'Wo arbeitet die Frau?', options: ['In einer Schule', 'In einem Krankenhaus', 'In einem Büro'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'listening', title: 'Hören – Teil 2: Durchsagen',
      instructions: 'Kreuzen Sie an: richtig oder falsch? Sie hören jede Durchsage einmal.',
      audioUrl: '/audio/goethe/a1-5/hoeren-teil2.mp3',
      transcript: `Durchsage 1 — Liebe Fahrgäste, wegen einer Baustelle fährt die Straßenbahn Linie 3 heute nicht. Bitte nehmen Sie den Bus.\n\nDurchsage 2 — Achtung: Ein Kind sucht seine Mutter. Bitte kommen Sie zur Information im Erdgeschoss.\n\nDurchsage 3 — Guten Tag. Die Bank hat heute nur bis 13 Uhr geöffnet.`,
      questions: [
        { type: 'mcq', id: 'g-a1-5-h5', part: 2, text: 'Die Straßenbahn Linie 3 fährt heute normal.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-a1-5-h6', part: 2, text: 'Ein Kind sucht seine Mutter.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-5-h7', part: 2, text: 'Die Bank ist heute bis 13 Uhr offen.', options: ['Falsch', 'Richtig'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'listening', title: 'Hören – Teil 3: Telefonansagen',
      instructions: 'Was ist richtig? Hören Sie jede Ansage einmal und wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a1-5/hoeren-teil3.mp3',
      transcript: `Ansage 1 — Hallo Frau Meier, hier ist die Schule. Ihr Sohn ist krank geworden. Bitte holen Sie ihn ab.\n\nAnsage 2 — Hi Sara, hier ist Michael. Wollen wir am Sonntag ins Schwimmbad gehen? Ruf mich bitte zurück.\n\nAnsage 3 — Guten Tag, hier ist der Friseur Schmidt. Ihr Termin ist am Dienstag um 16 Uhr, nicht um 14 Uhr.`,
      questions: [
        { type: 'mcq', id: 'g-a1-5-h8', part: 3, text: 'Warum ruft die Schule an?', options: ['Der Sohn hat gute Noten', 'Der Sohn ist krank', 'Der Sohn hat Geburtstag'], answer: 1 },
        { type: 'mcq', id: 'g-a1-5-h9', part: 3, text: 'Wohin möchte Michael am Sonntag gehen?', options: ['Ins Schwimmbad', 'Ins Restaurant', 'Ins Kino'], answer: 0 },
        { type: 'mcq', id: 'g-a1-5-h10', part: 3, text: 'Wann ist der Friseurtermin jetzt?', options: ['Um 14 Uhr', 'Um 16 Uhr', 'Am Montag'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Lesen – Teil 1: E-Mails',
      instructions: 'Lesen Sie die E-Mail. Kreuzen Sie an: richtig oder falsch?',
      passage: `Lieber Herr Wagner,\n\nvielen Dank für die Einladung zum Grillfest am Samstag. Ich komme gern! Kann ich etwas mitbringen? Vielleicht einen Salat oder Getränke? Sagen Sie mir bitte Bescheid. Ich bringe auch meine Frau mit. Wir freuen uns auf einen schönen Nachmittag.\n\nMit freundlichen Grüßen\nAntonio Rossi`,
      passageTitle: 'E-Mail von Antonio',
      questions: [
        { type: 'mcq', id: 'g-a1-5-l1', part: 4, text: 'Antonio kommt zum Grillfest.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-5-l2', part: 4, text: 'Das Grillfest ist am Sonntag.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-5-l3', part: 4, text: 'Antonio möchte etwas mitbringen.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-5-l4', part: 4, text: 'Antonio kommt allein.', options: ['Richtig', 'Falsch'], answer: 1 },
      ],
    },
    {
      part: 5, skill: 'reading', title: 'Lesen – Teil 2: Anzeigen',
      instructions: 'Lesen Sie die Situationen und die Anzeigen. Wählen Sie die richtige Anzeige.',
      passage: `Anzeige A — Kochkurs "Lecker!": Lernen Sie deutsche Gerichte kochen. Samstags 15–18 Uhr. Zutaten inklusive.\n\nAnzeige B — Reinigung Blitz: Wir waschen und bügeln Ihre Kleidung. Fertig in 24 Stunden.\n\nAnzeige C — Kinderkino am Sonntag: Filme für die ganze Familie. Beginn 10 Uhr. Eintritt 4 Euro.`,
      passageTitle: 'Anzeigen',
      questions: [
        { type: 'mcq', id: 'g-a1-5-l5', part: 5, text: 'Sie möchten kochen lernen. Welche Anzeige passt?', options: ['Anzeige B', 'Anzeige C', 'Anzeige A'], answer: 2 },
        { type: 'mcq', id: 'g-a1-5-l6', part: 5, text: 'Ihr Hemd ist schmutzig. Welche Anzeige passt?', options: ['Anzeige A', 'Anzeige B', 'Anzeige C'], answer: 1 },
        { type: 'mcq', id: 'g-a1-5-l7', part: 5, text: 'Sie möchten mit den Kindern einen Film sehen. Welche Anzeige passt?', options: ['Anzeige C', 'Anzeige A', 'Anzeige B'], answer: 0 },
      ],
    },
    {
      part: 6, skill: 'reading', title: 'Lesen – Teil 3: Schilder und Hinweise',
      instructions: 'Lesen Sie die Schilder. Kreuzen Sie an: richtig oder falsch?',
      passage: `Schild 1 (am Eingang eines Geschäfts): "Wir haben Betriebsferien vom 1. bis 15. August."\n\nSchild 2 (im Aufzug): "Maximal 6 Personen."\n\nSchild 3 (an einer Bank/Parkbank): "Frisch gestrichen!"`,
      passageTitle: 'Schilder',
      questions: [
        { type: 'mcq', id: 'g-a1-5-l8', part: 6, text: 'Das Geschäft ist im August immer offen.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-5-l9', part: 6, text: 'Im Aufzug dürfen maximal 6 Personen fahren.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a1-5-l10', part: 6, text: 'Man kann sich sofort auf die Bank setzen.', options: ['Richtig', 'Falsch'], answer: 1 },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 1: Formular',
      instructions: 'Ihr Freund Wei möchte einen Sportverein-Ausweis. Schreiben Sie die Informationen in Sätzen.',
      questions: [
        {
          type: 'write', id: 'g-a1-5-s1', part: 7, taskNumber: 1,
          stimulusLabel: 'Formular Sportverein',
          stimulus: 'Informationen über Wei:\n• Name: Wei Chen\n• Aus: China, wohnt in Frankfurt\n• Alter: 26 Jahre\n• Beruf: Ingenieur\n• Möchte: Tischtennis spielen, zweimal pro Woche',
          text: 'Schreiben Sie 5 kurze Sätze mit den Informationen über Wei (Name, Herkunft, Wohnort, Alter, Beruf, Wunsch).',
          minWords: 20,
        },
      ],
    },
    {
      part: 8, skill: 'writing', title: 'Schreiben – Teil 2: Kurze Mitteilung',
      instructions: 'Schreiben Sie eine kurze Nachricht.',
      questions: [
        {
          type: 'write', id: 'g-a1-5-s2', part: 8, taskNumber: 2,
          stimulusLabel: 'Nachricht an den Vermieter',
          stimulus: 'Situation: In Ihrer Wohnung ist die Heizung kaputt. Schreiben Sie eine Nachricht an Ihren Vermieter Herrn Klein.',
          text: 'Schreiben Sie an Herrn Klein: 1) Problem (Heizung kaputt), 2) Bitte (bitte reparieren), 3) Wann sind Sie zu Hause? 3–4 Sätze mit Anrede und Gruß. (ca. 30 Wörter)',
          minWords: 30,
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 1: Sich vorstellen',
      instructions: 'Stellen Sie sich vor. Sprechen Sie über sich.',
      questions: [
        {
          type: 'speak', id: 'g-a1-5-sp1', part: 9, partNumber: 1,
          text: 'Stellen Sie sich vor: Name, Alter, Land, Wohnort, Sprachen, Beruf und Hobby. Buchstabieren Sie Ihren Namen und nennen Sie Ihre Telefonnummer.',
        },
      ],
    },
    {
      part: 10, skill: 'speaking', title: 'Sprechen – Teil 2: Um Informationen bitten',
      instructions: 'Stellen Sie Fragen und antworten Sie zum Thema auf den Karten.',
      questions: [
        {
          type: 'speak', id: 'g-a1-5-sp2', part: 10, partNumber: 2,
          text: 'Thema: "Wohnen". Bilden Sie zu jedem Wort eine Frage und antworten Sie.',
          cueCard: 'Wörter zum Thema Wohnen:\n• Wohnung oder Haus?\n• Zimmer\n• Stadt oder Dorf?\n• Miete\n• Wie lange?\n\nBeispiel: "Wohnst du in einer Wohnung oder in einem Haus?"',
        },
      ],
    },
    {
      part: 11, skill: 'speaking', title: 'Sprechen – Teil 3: Bitten und darauf reagieren',
      instructions: 'Bitten Sie um etwas und reagieren Sie auf die Bitten Ihres Partners.',
      questions: [
        {
          type: 'speak', id: 'g-a1-5-sp3', part: 11, partNumber: 3,
          text: 'Formulieren Sie höfliche Bitten zu den Bildkarten und reagieren Sie darauf.',
          cueCard: 'Bildkarten (Situationen):\n• die Zeitung geben\n• das Fenster zumachen\n• den Computer anschalten\n• ein Stück Kuchen\n\nBeispiel: "Kannst du mir bitte die Zeitung geben?" – "Ja, gern."',
        },
      ],
    },
  ],
};

export default mock;
