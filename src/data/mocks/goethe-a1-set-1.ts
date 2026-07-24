import type { MockExam } from './types';

// Goethe-Zertifikat A1 (Start Deutsch 1) — formato oficial Modellsatz.
// Módulos: Hören · Lesen · Schreiben · Sprechen. Conteúdo ORIGINAL WeLearn no formato oficial.
// Áudio sob /audio/goethe/a1-1/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'a1-1',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat A1 – Übungstest 1',
  subtitle: 'Hören · Lesen · Schreiben · Sprechen',
  timeMinutes: 65,
  sections: [
    // ═══════════════ HÖREN ═══════════════
    {
      part: 1, skill: 'listening', title: 'Hören – Teil 1: Kurze Gespräche',
      instructions: 'Was ist richtig? Hören Sie jedes Gespräch einmal und wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a1-1/hoeren-teil1.mp3',
      transcript: `Beispiel 1 — Mann: Entschuldigung, wie spät ist es? Frau: Es ist Viertel nach acht.\n\nGespräch 2 — Frau: Was möchten Sie trinken? Mann: Einen Kaffee, bitte.\n\nGespräch 3 — Kind: Mama, wo ist mein Fußball? Mutter: Er ist im Garten, neben dem Baum.\n\nGespräch 4 — Mann: Wann kommt der Bus? Frau: Um zehn Uhr, in fünf Minuten.`,
      questions: [
        { type: 'mcq', id: 'g-a1-1-h1', part: 1, text: 'Wie spät ist es?', options: ['8:00 Uhr', '8:15 Uhr', '8:45 Uhr'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-h2', part: 1, text: 'Was möchte der Mann trinken?', options: ['Wasser', 'Kaffee', 'Tee'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-h3', part: 1, text: 'Wo ist der Fußball?', options: ['Im Haus', 'Im Garten', 'In der Schule'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-h4', part: 1, text: 'Wann kommt der Bus?', options: ['Um 5:00 Uhr', 'Um 10:00 Uhr', 'Um 10:05 Uhr'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'listening', title: 'Hören – Teil 2: Durchsagen',
      instructions: 'Kreuzen Sie an: richtig oder falsch? Sie hören jede Durchsage einmal.',
      audioUrl: '/audio/goethe/a1-1/hoeren-teil2.mp3',
      transcript: `Durchsage 1 — Achtung, meine Damen und Herren. Der Zug nach München fährt heute von Gleis 5, nicht von Gleis 3.\n\nDurchsage 2 — Liebe Kunden, das Geschäft schließt in zehn Minuten. Bitte kommen Sie zur Kasse.\n\nDurchsage 3 — Guten Tag. Der Deutschkurs am Montag beginnt um 18 Uhr im Raum 12.`,
      questions: [
        { type: 'mcq', id: 'g-a1-1-h5', part: 2, text: 'Der Zug nach München fährt von Gleis 3.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-h6', part: 2, text: 'Das Geschäft schließt bald.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-1-h7', part: 2, text: 'Der Deutschkurs beginnt um 18 Uhr.', options: ['Richtig', 'Falsch'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'listening', title: 'Hören – Teil 3: Telefonansagen',
      instructions: 'Was ist richtig? Hören Sie jede Ansage einmal und wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a1-1/hoeren-teil3.mp3',
      transcript: `Ansage 1 — Hallo Peter, hier ist Anna. Wir treffen uns heute nicht um sieben, sondern um acht Uhr vor dem Kino. Bis später!\n\nAnsage 2 — Guten Tag, hier ist die Praxis Dr. Weber. Ihr Termin ist am Donnerstag um 15 Uhr. Bitte bringen Sie Ihre Versichertenkarte mit.\n\nAnsage 3 — Hi Lisa, hier ist Tom. Kannst du bitte Brot und Milch kaufen? Danke!`,
      questions: [
        { type: 'mcq', id: 'g-a1-1-h8', part: 3, text: 'Wann treffen sich Anna und Peter?', options: ['Um 8 Uhr', 'Im Kino um 6 Uhr', 'Um 7 Uhr'], answer: 0 },
        { type: 'mcq', id: 'g-a1-1-h9', part: 3, text: 'Wann ist der Termin bei Dr. Weber?', options: ['Am Donnerstag um 15 Uhr', 'Am Dienstag um 15 Uhr', 'Am Donnerstag um 5 Uhr'], answer: 0 },
        { type: 'mcq', id: 'g-a1-1-h10', part: 3, text: 'Was soll Lisa kaufen?', options: ['Milch und Käse', 'Brot und Butter', 'Brot und Milch'], answer: 2 },
      ],
    },
    // ═══════════════ LESEN ═══════════════
    {
      part: 4, skill: 'reading', title: 'Lesen – Teil 1: E-Mails',
      instructions: 'Lesen Sie die E-Mail. Kreuzen Sie an: richtig oder falsch?',
      passage: `Liebe Sofia,\n\nwie geht es dir? Am Samstag habe ich Geburtstag und mache eine kleine Party bei mir zu Hause. Sie beginnt um 19 Uhr. Es kommen auch Markus und Julia. Bitte bring keinen Kuchen mit, ich backe selbst. Kannst du kommen? Schreib mir bitte bis Freitag.\n\nViele Grüße\nElena`,
      passageTitle: 'E-Mail von Elena',
      questions: [
        { type: 'mcq', id: 'g-a1-1-l1', part: 4, text: 'Elena hat am Samstag Geburtstag.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-1-l2', part: 4, text: 'Die Party ist in einem Restaurant.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-l3', part: 4, text: 'Sofia soll einen Kuchen mitbringen.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-l4', part: 4, text: 'Sofia soll bis Freitag antworten.', options: ['Richtig', 'Falsch'], answer: 0 },
      ],
    },
    {
      part: 5, skill: 'reading', title: 'Lesen – Teil 2: Anzeigen',
      instructions: 'Lesen Sie die Situationen und die Anzeigen. Wo finden Sie was? Wählen Sie die richtige Anzeige.',
      passage: `Sie suchen Informationen. Lesen Sie die Anzeigen A, B und C.\n\nAnzeige A — Sprachschule Berlin: Deutschkurse für Anfänger. Montag bis Freitag, abends. Anmeldung online.\n\nAnzeige B — Fitness-Studio "Aktiv": Täglich geöffnet von 6 bis 23 Uhr. Erste Woche gratis!\n\nAnzeige C — Restaurant "Zum Adler": Mittagsmenü 8 Euro. Täglich frische Suppe und Salat.`,
      passageTitle: 'Anzeigen',
      questions: [
        { type: 'mcq', id: 'g-a1-1-l5', part: 5, text: 'Sie möchten Deutsch lernen. Welche Anzeige passt?', options: ['Anzeige A', 'Anzeige B', 'Anzeige C'], answer: 0 },
        { type: 'mcq', id: 'g-a1-1-l6', part: 5, text: 'Sie möchten günstig zu Mittag essen. Welche Anzeige passt?', options: ['Anzeige C', 'Anzeige A', 'Anzeige B'], answer: 0 },
        { type: 'mcq', id: 'g-a1-1-l7', part: 5, text: 'Sie möchten Sport machen. Welche Anzeige passt?', options: ['Anzeige B', 'Anzeige C', 'Anzeige A'], answer: 0 },
      ],
    },
    {
      part: 6, skill: 'reading', title: 'Lesen – Teil 3: Schilder und Hinweise',
      instructions: 'Lesen Sie die Schilder. Kreuzen Sie an: richtig oder falsch?',
      passage: `Schild 1 (an einer Tür): "Geöffnet: Mo–Fr 9–18 Uhr, Sa 9–13 Uhr. Sonntag geschlossen."\n\nSchild 2 (im Park): "Hunde bitte an der Leine führen."\n\nSchild 3 (im Bus): "Bitte hier nicht essen und trinken."`,
      passageTitle: 'Schilder',
      questions: [
        { type: 'mcq', id: 'g-a1-1-l8', part: 6, text: 'Am Sonntag ist das Geschäft offen.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a1-1-l9', part: 6, text: 'Im Park müssen Hunde an der Leine sein.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a1-1-l10', part: 6, text: 'Im Bus darf man essen und trinken.', options: ['Falsch', 'Richtig'], answer: 0 },
      ],
    },
    // ═══════════════ SCHREIBEN ═══════════════
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 1: Formular',
      instructions: 'Ihr Freund Ahmed möchte einen Deutschkurs machen. Helfen Sie ihm und schreiben Sie die Informationen. Notieren Sie die fehlenden Angaben in Sätzen.',
      questions: [
        {
          type: 'write', id: 'g-a1-1-s1', part: 7, taskNumber: 1,
          stimulusLabel: 'Anmeldung Deutschkurs',
          stimulus: 'Informationen über Ahmed:\n• Name: Ahmed Karimi\n• Aus: Marokko, wohnt jetzt in Hamburg\n• Alter: 24 Jahre\n• Beruf: Student\n• Möchte: einen Deutschkurs für Anfänger, abends',
          text: 'Schreiben Sie 5 kurze Sätze mit den Informationen über Ahmed (Name, Herkunft, Wohnort, Alter, Beruf und Kurswunsch). Beispiel: "Er heißt Ahmed Karimi."',
          minWords: 20,
        },
      ],
    },
    {
      part: 8, skill: 'writing', title: 'Schreiben – Teil 2: Kurze Mitteilung',
      instructions: 'Schreiben Sie eine kurze Nachricht (SMS oder E-Mail).',
      questions: [
        {
          type: 'write', id: 'g-a1-1-s2', part: 8, taskNumber: 2,
          stimulusLabel: 'Nachricht an eine Freundin',
          stimulus: 'Situation: Sie sind krank und können heute nicht zum Deutschkurs kommen. Schreiben Sie eine Nachricht an Ihre Freundin Maria.',
          text: 'Schreiben Sie an Maria: 1) Grund (Sie sind krank), 2) Bitte (Können Sie die Hausaufgaben schicken?), 3) Dank. Schreiben Sie 3–4 Sätze und vergessen Sie die Anrede und den Gruß nicht. (ca. 30 Wörter)',
          minWords: 30,
        },
      ],
    },
    // ═══════════════ SPRECHEN ═══════════════
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 1: Sich vorstellen',
      instructions: 'Stellen Sie sich vor. Sprechen Sie über sich.',
      questions: [
        {
          type: 'speak', id: 'g-a1-1-sp1', part: 9, partNumber: 1,
          text: 'Stellen Sie sich vor. Sprechen Sie über: Name, Alter, Land, Wohnort, Sprachen, Beruf und Hobby. Buchstabieren Sie am Ende Ihren Namen und nennen Sie Ihre Telefonnummer.',
        },
      ],
    },
    {
      part: 10, skill: 'speaking', title: 'Sprechen – Teil 2: Um Informationen bitten',
      instructions: 'Stellen Sie Fragen und antworten Sie zum Thema auf den Karten.',
      questions: [
        {
          type: 'speak', id: 'g-a1-1-sp2', part: 10, partNumber: 2,
          text: 'Thema: "Einkaufen". Bilden Sie zu jedem Wort eine Frage und beantworten Sie die Fragen Ihres Partners.',
          cueCard: 'Wörter zum Thema Einkaufen:\n• Supermarkt\n• Brot\n• Wie viel?\n• Wo?\n• Öffnungszeiten\n\nBeispiel: "Was kaufst du im Supermarkt?"',
        },
      ],
    },
    {
      part: 11, skill: 'speaking', title: 'Sprechen – Teil 3: Bitten und darauf reagieren',
      instructions: 'Bitten Sie um etwas und reagieren Sie auf die Bitten Ihres Partners.',
      questions: [
        {
          type: 'speak', id: 'g-a1-1-sp3', part: 11, partNumber: 3,
          text: 'Formulieren Sie höfliche Bitten zu den Bildkarten und reagieren Sie darauf.',
          cueCard: 'Bildkarten (Situationen):\n• Fenster öffnen\n• Licht anmachen\n• Handy leiser stellen\n• ein Glas Wasser\n\nBeispiel: "Können Sie bitte das Fenster öffnen?" – "Ja, gern."',
        },
      ],
    },
  ],
};

export default mock;
