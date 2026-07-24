import type { MockExam } from './types';

// Goethe-Zertifikat A1 (Start Deutsch 1) — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/a1-4/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'a1-4',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat A1 – Übungstest 4',
  subtitle: 'Hören · Lesen · Schreiben · Sprechen',
  timeMinutes: 65,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Hören – Teil 1: Kurze Gespräche',
      instructions: 'Was ist richtig? Hören Sie jedes Gespräch einmal und wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a1-4/hoeren-teil1.mp3',
      transcript: `Gespräch 1 — Frau: Welchen Tag haben wir heute? Mann: Heute ist Mittwoch.\n\nGespräch 2 — Kellner: Was möchten Sie essen? Gast: Eine Pizza mit Salat, bitte.\n\nGespräch 3 — Mann: Wie viel kostet die Fahrkarte? Frau: Sie kostet drei Euro zwanzig.\n\nGespräch 4 — Kind: Wo ist der Bahnhof? Frau: Dort rechts, neben dem Hotel.`,
      questions: [
        { type: 'mcq', id: 'g-a1-4-h1', part: 1, text: 'Welcher Tag ist heute?', options: ['Freitag', 'Montag', 'Mittwoch'], answer: 2 },
        { type: 'mcq', id: 'g-a1-4-h2', part: 1, text: 'Was möchte der Gast essen?', options: ['Pizza mit Salat', 'Fisch', 'Suppe'], answer: 0 },
        { type: 'mcq', id: 'g-a1-4-h3', part: 1, text: 'Wie viel kostet die Fahrkarte?', options: ['2,30 €', '3,20 €', '3,00 €'], answer: 1 },
        { type: 'mcq', id: 'g-a1-4-h4', part: 1, text: 'Wo ist der Bahnhof?', options: ['Neben der Schule', 'Neben dem Hotel', 'Neben der Bank'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'listening', title: 'Hören – Teil 2: Durchsagen',
      instructions: 'Kreuzen Sie an: richtig oder falsch? Sie hören jede Durchsage einmal.',
      audioUrl: '/audio/goethe/a1-4/hoeren-teil2.mp3',
      transcript: `Durchsage 1 — Achtung, meine Damen und Herren. Der nächste Halt ist Hauptbahnhof. Bitte aussteigen.\n\nDurchsage 2 — Liebe Kunden, heute ist frischer Fisch im Angebot, direkt am Fischstand.\n\nDurchsage 3 — Guten Tag. Der Deutschkurs für Fortgeschrittene fällt heute leider aus. Der Lehrer ist krank.`,
      questions: [
        { type: 'mcq', id: 'g-a1-4-h5', part: 2, text: 'Der nächste Halt ist der Hauptbahnhof.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a1-4-h6', part: 2, text: 'Heute gibt es frisches Gemüse im Angebot.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-a1-4-h7', part: 2, text: 'Der Deutschkurs findet heute statt.', options: ['Falsch', 'Richtig'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'listening', title: 'Hören – Teil 3: Telefonansagen',
      instructions: 'Was ist richtig? Hören Sie jede Ansage einmal und wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a1-4/hoeren-teil3.mp3',
      transcript: `Ansage 1 — Hallo Schatz, hier ist Mama. Kannst du bitte den Hund um fünf Uhr rauslassen? Ich komme erst um sieben.\n\nAnsage 2 — Guten Tag, hier ist die Autowerkstatt Bauer. Ihr Auto ist fertig. Sie können es ab morgen früh abholen.\n\nAnsage 3 — Hi Ali, hier ist David. Das Fußballspiel ist nicht am Samstag, sondern am Sonntag um 15 Uhr.`,
      questions: [
        { type: 'mcq', id: 'g-a1-4-h8', part: 3, text: 'Wann soll der Hund raus?', options: ['Um 7 Uhr', 'Um 6 Uhr', 'Um 5 Uhr'], answer: 2 },
        { type: 'mcq', id: 'g-a1-4-h9', part: 3, text: 'Wann kann man das Auto abholen?', options: ['Heute', 'Ab morgen früh', 'Am Wochenende'], answer: 1 },
        { type: 'mcq', id: 'g-a1-4-h10', part: 3, text: 'Wann ist das Fußballspiel?', options: ['Am Sonntag um 5 Uhr', 'Am Samstag', 'Am Sonntag um 15 Uhr'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Lesen – Teil 1: E-Mails',
      instructions: 'Lesen Sie die E-Mail. Kreuzen Sie an: richtig oder falsch?',
      passage: `Hallo Nina,\n\nherzlichen Glückwunsch zur neuen Wohnung! Ich möchte dich gern besuchen. Passt dir nächstes Wochenende? Ich komme am Samstag mit dem Zug und bleibe bis Sonntag. Kannst du mich vom Bahnhof abholen? Mein Zug kommt um 11 Uhr an. Ich freue mich sehr!\n\nLiebe Grüße\nPaula`,
      passageTitle: 'E-Mail von Paula',
      questions: [
        { type: 'mcq', id: 'g-a1-4-l1', part: 4, text: 'Nina hat eine neue Wohnung.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-4-l2', part: 4, text: 'Paula möchte am Freitag kommen.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-4-l3', part: 4, text: 'Paula kommt mit dem Zug.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a1-4-l4', part: 4, text: 'Der Zug kommt um 11 Uhr an.', options: ['Falsch', 'Richtig'], answer: 1 },
      ],
    },
    {
      part: 5, skill: 'reading', title: 'Lesen – Teil 2: Anzeigen',
      instructions: 'Lesen Sie die Situationen und die Anzeigen. Wählen Sie die richtige Anzeige.',
      passage: `Anzeige A — Kinderarzt Dr. Lange: Sprechstunde Mo–Fr 8–12 Uhr. Auch ohne Termin.\n\nAnzeige B — Blumenladen Rosa: Schöne Sträuße für jeden Anlass. Wir liefern auch nach Hause.\n\nAnzeige C — Sprachcafé International: Jeden Freitagabend Deutsch sprechen bei Kaffee und Kuchen. Kostenlos!`,
      passageTitle: 'Anzeigen',
      questions: [
        { type: 'mcq', id: 'g-a1-4-l5', part: 5, text: 'Ihr Kind ist krank. Welche Anzeige passt?', options: ['Anzeige A', 'Anzeige B', 'Anzeige C'], answer: 0 },
        { type: 'mcq', id: 'g-a1-4-l6', part: 5, text: 'Sie möchten Blumen kaufen. Welche Anzeige passt?', options: ['Anzeige C', 'Anzeige A', 'Anzeige B'], answer: 2 },
        { type: 'mcq', id: 'g-a1-4-l7', part: 5, text: 'Sie möchten kostenlos Deutsch üben. Welche Anzeige passt?', options: ['Anzeige B', 'Anzeige C', 'Anzeige A'], answer: 1 },
      ],
    },
    {
      part: 6, skill: 'reading', title: 'Lesen – Teil 3: Schilder und Hinweise',
      instructions: 'Lesen Sie die Schilder. Kreuzen Sie an: richtig oder falsch?',
      passage: `Schild 1 (im Park): "Rasen betreten verboten."\n\nSchild 2 (in der Bibliothek): "Bitte leise sein. Handys aus."\n\nSchild 3 (am Automaten): "Nur Münzen. Keine Geldscheine."`,
      passageTitle: 'Schilder',
      questions: [
        { type: 'mcq', id: 'g-a1-4-l8', part: 6, text: 'Man darf über den Rasen laufen.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-4-l9', part: 6, text: 'In der Bibliothek soll man leise sein.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-4-l10', part: 6, text: 'Der Automat nimmt Geldscheine.', options: ['Richtig', 'Falsch'], answer: 1 },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 1: Formular',
      instructions: 'Ihre Freundin Fatima möchte einen Bibliotheksausweis. Schreiben Sie die Informationen in Sätzen.',
      questions: [
        {
          type: 'write', id: 'g-a1-4-s1', part: 7, taskNumber: 1,
          stimulusLabel: 'Formular Bibliothek',
          stimulus: 'Informationen über Fatima:\n• Name: Fatima Yılmaz\n• Aus: Türkei, wohnt in Köln\n• Alter: 19 Jahre\n• Beruf: Schülerin\n• Möchte: viele Bücher lesen, auch auf Deutsch',
          text: 'Schreiben Sie 5 kurze Sätze mit den Informationen über Fatima (Name, Herkunft, Wohnort, Alter, Beruf, Wunsch).',
          minWords: 20,
        },
      ],
    },
    {
      part: 8, skill: 'writing', title: 'Schreiben – Teil 2: Kurze Mitteilung',
      instructions: 'Schreiben Sie eine kurze Nachricht.',
      questions: [
        {
          type: 'write', id: 'g-a1-4-s2', part: 8, taskNumber: 2,
          stimulusLabel: 'Nachricht an eine Kollegin',
          stimulus: 'Situation: Sie haben morgen Geburtstag und möchten Ihre Kollegin Sarah zum Essen einladen. Schreiben Sie ihr eine Nachricht.',
          text: 'Schreiben Sie an Sarah: 1) Anlass (Geburtstag), 2) Einladung (Essen), 3) Wo und wann? 3–4 Sätze mit Anrede und Gruß. (ca. 30 Wörter)',
          minWords: 30,
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 1: Sich vorstellen',
      instructions: 'Stellen Sie sich vor. Sprechen Sie über sich.',
      questions: [
        {
          type: 'speak', id: 'g-a1-4-sp1', part: 9, partNumber: 1,
          text: 'Stellen Sie sich vor: Name, Alter, Land, Wohnort, Sprachen, Beruf und Hobby. Buchstabieren Sie Ihren Namen und nennen Sie Ihre Telefonnummer.',
        },
      ],
    },
    {
      part: 10, skill: 'speaking', title: 'Sprechen – Teil 2: Um Informationen bitten',
      instructions: 'Stellen Sie Fragen und antworten Sie zum Thema auf den Karten.',
      questions: [
        {
          type: 'speak', id: 'g-a1-4-sp2', part: 10, partNumber: 2,
          text: 'Thema: "Reisen". Bilden Sie zu jedem Wort eine Frage und antworten Sie.',
          cueCard: 'Wörter zum Thema Reisen:\n• Urlaub\n• Zug oder Auto?\n• Wohin?\n• Wie lange?\n• Mit wem?\n\nBeispiel: "Wohin fährst du im Urlaub?"',
        },
      ],
    },
    {
      part: 11, skill: 'speaking', title: 'Sprechen – Teil 3: Bitten und darauf reagieren',
      instructions: 'Bitten Sie um etwas und reagieren Sie auf die Bitten Ihres Partners.',
      questions: [
        {
          type: 'speak', id: 'g-a1-4-sp3', part: 11, partNumber: 3,
          text: 'Formulieren Sie höfliche Bitten zu den Bildkarten und reagieren Sie darauf.',
          cueCard: 'Bildkarten (Situationen):\n• die Rechnung bringen\n• das Licht ausmachen\n• den Weg zeigen\n• ein Foto machen\n\nBeispiel: "Können Sie bitte die Rechnung bringen?" – "Ja, sofort."',
        },
      ],
    },
  ],
};

export default mock;
