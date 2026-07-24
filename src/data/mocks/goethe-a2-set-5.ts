import type { MockExam } from './types';

// Goethe-Zertifikat A2 — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/a2-5/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'a2-5',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat A2 – Übungstest 5',
  subtitle: 'Hören · Lesen · Schreiben · Sprechen',
  timeMinutes: 90,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Hören – Teil 1: Ansagen und Gespräche',
      instructions: 'Sie hören fünf kurze Texte. Wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a2-5/hoeren-teil1.mp3',
      transcript: `Text 1 — Am Bahnhof: Der Zug nach Dresden fällt heute leider aus. Bitte nehmen Sie den nächsten Zug um 15:30 Uhr.\n\nText 2 — Anrufbeantworter: Hallo, hier ist die Bibliothek. Ihr Buch ist überfällig. Bitte bringen Sie es diese Woche zurück, sonst müssen Sie eine Gebühr bezahlen.\n\nText 3 — Zwei Studenten: "Lernst du heute Abend für die Prüfung?" – "Ja, aber erst nach dem Abendessen. Willst du zusammen lernen?"\n\nText 4 — Durchsage im Zug: Meine Damen und Herren, im Speisewagen, Wagen sieben, gibt es warme Getränke und kleine Snacks.\n\nText 5 — Radio: Und nun das Wetter für morgen: viel Sonne, aber ein starker Wind. Nehmen Sie beim Radfahren keine offenen Regenschirme mit!`,
      questions: [
        { type: 'mcq', id: 'g-a2-5-h1', part: 1, text: 'Was ist mit dem Zug nach Dresden?', options: ['Er hat Verspätung', 'Er fällt aus', 'Er fährt früher'], answer: 1 },
        { type: 'mcq', id: 'g-a2-5-h2', part: 1, text: 'Warum ruft die Bibliothek an?', options: ['Ein neues Buch ist da', 'Ein Buch ist überfällig', 'Die Bibliothek ist geschlossen'], answer: 1 },
        { type: 'mcq', id: 'g-a2-5-h3', part: 1, text: 'Wann lernt der Student?', options: ['Nach dem Abendessen', 'Morgen', 'Vor dem Abendessen'], answer: 0 },
        { type: 'mcq', id: 'g-a2-5-h4', part: 1, text: 'Wo gibt es Getränke im Zug?', options: ['In Wagen sieben', 'In Wagen fünf', 'Am Bahnhof'], answer: 0 },
        { type: 'mcq', id: 'g-a2-5-h5', part: 1, text: 'Wie wird das Wetter morgen?', options: ['Schnee', 'Regen', 'Sonne und Wind'], answer: 2 },
      ],
    },
    {
      part: 2, skill: 'listening', title: 'Hören – Teil 2: Gespräch im Alltag',
      instructions: 'Sie hören ein Gespräch. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/a2-5/hoeren-teil2.mp3',
      transcript: `Frau: Entschuldigung, ich suche ein Geschenk für meinen Mann. Können Sie mir helfen?\nVerkäufer: Gern. An was haben Sie gedacht?\nFrau: Er interessiert sich sehr für Kochen. Vielleicht etwas für die Küche?\nVerkäufer: Wie wäre es mit diesem Kochbuch? Es hat einfache und moderne Rezepte. Oder wir haben auch ein schönes Messerset.\nFrau: Das Kochbuch gefällt mir. Wie viel kostet es?\nVerkäufer: 25 Euro. Das Messerset kostet 60 Euro.\nFrau: Ich nehme das Kochbuch. Können Sie es als Geschenk verpacken?\nVerkäufer: Natürlich, das machen wir kostenlos. Einen Moment, bitte.`,
      questions: [
        { type: 'mcq', id: 'g-a2-5-h6', part: 2, text: 'Die Frau sucht ein Geschenk für ihren Mann.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a2-5-h7', part: 2, text: 'Ihr Mann interessiert sich für Sport.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a2-5-h8', part: 2, text: 'Die Frau kauft das Messerset.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-a2-5-h9', part: 2, text: 'Das Verpacken ist kostenlos.', options: ['Richtig', 'Falsch'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'listening', title: 'Hören – Teil 3: Kurze Gespräche',
      instructions: 'Sie hören vier kurze Gespräche. Wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a2-5/hoeren-teil3.mp3',
      transcript: `Gespräch 1 — "Wie kommst du zur Universität?" – "Meistens mit dem Fahrrad, aber wenn es regnet, nehme ich den Bus."\n\nGespräch 2 — "Wann hast du Urlaub?" – "Im August, zwei Wochen. Ich fahre zu meiner Familie aufs Land."\n\nGespräch 3 — "Möchtest du noch einen Kaffee?" – "Nein, danke, ich habe schon zwei getrunken. Aber ein Glas Wasser wäre gut."\n\nGespräch 4 — "Warum lernst du Deutsch?" – "Ich möchte in Deutschland studieren. Deshalb brauche ich ein gutes Zertifikat."`,
      questions: [
        { type: 'mcq', id: 'g-a2-5-h10', part: 3, text: 'Wie kommt die Person meistens zur Uni?', options: ['Mit dem Bus', 'Mit dem Fahrrad', 'Zu Fuß'], answer: 1 },
        { type: 'mcq', id: 'g-a2-5-h11', part: 3, text: 'Wohin fährt die Person im Urlaub?', options: ['Ins Ausland', 'Ans Meer', 'Zur Familie aufs Land'], answer: 2 },
        { type: 'mcq', id: 'g-a2-5-h12', part: 3, text: 'Was möchte die Person trinken?', options: ['Ein Glas Wasser', 'Einen Tee', 'Noch einen Kaffee'], answer: 0 },
        { type: 'mcq', id: 'g-a2-5-h13', part: 3, text: 'Warum lernt die Person Deutsch?', options: ['Für die Arbeit', 'Zum Studieren in Deutschland', 'Für den Urlaub'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Lesen – Teil 1: Zeitungstext',
      instructions: 'Lesen Sie den Text. Kreuzen Sie an: richtig oder falsch?',
      passage: `Ein Repair-Café öffnet in der Stadt\n\nKaputte Toaster, defekte Lampen oder ein Fahrrad mit Problemen? Statt alles wegzuwerfen, kann man ab sofort ins neue Repair-Café kommen. Dort helfen ehrenamtliche Helfer beim Reparieren – und das kostenlos. Nur für neue Ersatzteile muss man bezahlen.\n\nDie Idee kommt aus den Niederlanden und ist auch in Deutschland immer beliebter. "Wir wollen zeigen, dass man viele Dinge reparieren kann, statt neue zu kaufen. Das spart Geld und ist gut für die Umwelt", erklärt die Organisatorin. Das Repair-Café ist jeden zweiten Samstag im Monat von 14 bis 17 Uhr geöffnet. Kaffee und Kuchen gibt es auch.`,
      passageTitle: 'Zeitungsartikel',
      questions: [
        { type: 'mcq', id: 'g-a2-5-l1', part: 4, text: 'Die Reparatur ist kostenlos, nur Ersatzteile kosten Geld.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a2-5-l2', part: 4, text: 'Das Repair-Café ist jeden Tag geöffnet.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a2-5-l3', part: 4, text: 'Reparieren ist gut für die Umwelt.', options: ['Falsch', 'Richtig'], answer: 1 },
      ],
    },
    {
      part: 5, skill: 'reading', title: 'Lesen – Teil 2: Anzeigen zuordnen',
      instructions: 'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt?',
      passage: `Anzeige A — Schwimmkurs für Kinder ab 5 Jahren. Samstagvormittag im Hallenbad. Kleine Gruppen, geprüfte Trainer.\n\nAnzeige B — Zimmer in Studenten-WG frei: 15 m², möbliert, ab nächsten Monat. 350 Euro warm. Nette Mitbewohner.\n\nAnzeige C — Kostenlose Rechtsberatung für Mieter: Jeden Donnerstag 16–18 Uhr im Bürgerzentrum. Ohne Anmeldung.\n\nAnzeige D — Verkaufe Kinderwagen, fast neu, sehr gut erhalten. 80 Euro. Selbstabholung.`,
      passageTitle: 'Anzeigen',
      questions: [
        { type: 'mcq', id: 'g-a2-5-l4', part: 5, text: 'Sie sind Student und suchen ein Zimmer. Welche Anzeige passt?', options: ['Anzeige B', 'Anzeige C', 'Anzeige D', 'Anzeige A'], answer: 0 },
        { type: 'mcq', id: 'g-a2-5-l5', part: 5, text: 'Sie haben ein Problem mit Ihrem Vermieter. Welche Anzeige passt?', options: ['Anzeige A', 'Anzeige B', 'Anzeige C', 'Anzeige D'], answer: 2 },
        { type: 'mcq', id: 'g-a2-5-l6', part: 5, text: 'Ihr Kind soll schwimmen lernen. Welche Anzeige passt?', options: ['Anzeige D', 'Anzeige A', 'Anzeige B', 'Anzeige C'], answer: 1 },
      ],
    },
    {
      part: 6, skill: 'reading', title: 'Lesen – Teil 3: E-Mail',
      instructions: 'Lesen Sie die E-Mail. Kreuzen Sie an: richtig oder falsch?',
      passage: `Liebe Frau Neumann,\n\nleider muss ich unseren Termin am Dienstag verschieben. Ich habe eine wichtige Besprechung in der Firma bekommen, die ich nicht absagen kann. Könnten wir uns stattdessen am Donnerstag zur gleichen Zeit treffen, um 15 Uhr?\n\nEs tut mir sehr leid für die Unannehmlichkeiten. Bitte geben Sie mir Bescheid, ob der neue Termin für Sie passt. Vielen Dank für Ihr Verständnis.\n\nMit freundlichen Grüßen\nStefan Bauer`,
      passageTitle: 'E-Mail von Herrn Bauer',
      questions: [
        { type: 'mcq', id: 'g-a2-5-l7', part: 6, text: 'Herr Bauer möchte den Termin verschieben.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a2-5-l8', part: 6, text: 'Er schlägt den Mittwoch als neuen Termin vor.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-a2-5-l9', part: 6, text: 'Er bittet Frau Neumann um eine Antwort.', options: ['Richtig', 'Falsch'], answer: 0 },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 1: Kurze Nachricht',
      instructions: 'Schreiben Sie eine kurze Mitteilung.',
      questions: [
        {
          type: 'write', id: 'g-a2-5-s1', part: 7, taskNumber: 1,
          stimulusLabel: 'Nachricht an eine Kollegin',
          stimulus: 'Situation: Sie kommen morgen etwas später zur Arbeit, weil Sie zum Arzt müssen. Schreiben Sie Ihrer Kollegin Frau Braun eine Nachricht.',
          text: 'Schreiben Sie an Frau Braun: 1) informieren Sie sie (Sie kommen später), 2) Grund (Arzttermin), 3) bitten Sie um etwas (z. B. eine Nachricht ausrichten). Ca. 20–30 Wörter mit Anrede und Gruß.',
          minWords: 25,
        },
      ],
    },
    {
      part: 8, skill: 'writing', title: 'Schreiben – Teil 2: E-Mail',
      instructions: 'Schreiben Sie eine E-Mail (ca. 40 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-a2-5-s2', part: 8, taskNumber: 2,
          stimulusLabel: 'E-Mail an einen Freund',
          stimulus: 'Situation: Ein Freund hat Sie gefragt, ob Sie im Sommer zusammen Urlaub machen wollen. Antworten Sie ihm per E-Mail.',
          text: 'Schreiben Sie: 1) reagieren Sie auf den Vorschlag (Sie finden die Idee gut), 2) machen Sie einen eigenen Vorschlag (wohin, wann), 3) stellen Sie eine Frage. Ca. 40 Wörter, mit Anrede und Gruß.',
          minWords: 40,
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 1: Fragen zur Person',
      instructions: 'Stellen Sie Ihrem Partner Fragen und antworten Sie.',
      questions: [
        {
          type: 'speak', id: 'g-a2-5-sp1', part: 9, partNumber: 1,
          text: 'Stellen Sie zu den Stichwörtern je eine Frage und beantworten Sie die Fragen Ihres Partners.',
          cueCard: 'Stichwörter (Fragen zur Person):\n• Tagesablauf\n• Lieblingsjahreszeit\n• Haustiere\n• Verkehrsmittel\n• Lesen\n\nBeispiel: "Welche Jahreszeit magst du am liebsten?"',
        },
      ],
    },
    {
      part: 10, skill: 'speaking', title: 'Sprechen – Teil 2: Über sich sprechen',
      instructions: 'Sprechen Sie zusammenhängend über ein Thema.',
      questions: [
        {
          type: 'speak', id: 'g-a2-5-sp2', part: 10, partNumber: 2,
          text: 'Erzählen Sie über das Thema "Reisen und Urlaub". Sprechen Sie etwa 1–2 Minuten.',
          cueCard: 'Thema: Reisen und Urlaub\n\nPunkte:\n• Reisen Sie gern? Wohin?\n• Mit wem reisen Sie?\n• Meer, Berge oder Stadt?\n• Ihr schönster Urlaub?\n• Wohin möchten Sie einmal reisen?',
        },
      ],
    },
    {
      part: 11, skill: 'speaking', title: 'Sprechen – Teil 3: Etwas gemeinsam planen',
      instructions: 'Planen Sie gemeinsam mit Ihrem Partner etwas.',
      questions: [
        {
          type: 'speak', id: 'g-a2-5-sp3', part: 11, partNumber: 3,
          text: 'Planen Sie zusammen einen Ausflug am Wochenende. Machen Sie Vorschläge und einigen Sie sich.',
          cueCard: 'Situation: Sie möchten am Wochenende einen Ausflug machen.\n\nPunkte zu klären:\n• Wohin? (Ziel)\n• Wann? (Tag, Uhrzeit)\n• Wie hinkommen?\n• Was mitnehmen? (Essen, Kleidung)\n• Wen mitnehmen?',
        },
      ],
    },
  ],
};

export default mock;
