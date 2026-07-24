import type { MockExam } from './types';

// Goethe-Zertifikat A2 — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/a2-4/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'a2-4',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat A2 – Übungstest 4',
  subtitle: 'Hören · Lesen · Schreiben · Sprechen',
  timeMinutes: 90,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Hören – Teil 1: Ansagen und Gespräche',
      instructions: 'Sie hören fünf kurze Texte. Wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a2-4/hoeren-teil1.mp3',
      transcript: `Text 1 — Am Telefon: Guten Tag, hier ist die Werkstatt. Ihr Auto ist leider noch nicht fertig. Wir brauchen ein neues Teil. Es ist erst am Montag fertig.\n\nText 2 — Durchsage im Kaufhaus: Wir schließen in fünfzehn Minuten. Bitte kommen Sie zu den Kassen.\n\nText 3 — Zwei Nachbarinnen: "Kannst du mir am Wochenende beim Umzug helfen?" – "Am Samstag leider nicht, da arbeite ich. Aber am Sonntag habe ich Zeit."\n\nText 4 — Wetterbericht: Morgen wird es kälter. Ziehen Sie sich warm an! Am Nachmittag kann es sogar schneien.\n\nText 5 — Anrufbeantworter: Hallo Lisa, hier ist Mama. Vergiss nicht, heute Abend Oma anzurufen. Sie hat Geburtstag.`,
      questions: [
        { type: 'mcq', id: 'g-a2-4-h1', part: 1, text: 'Wann ist das Auto fertig?', options: ['Am Montag', 'Am Freitag', 'Heute'], answer: 0 },
        { type: 'mcq', id: 'g-a2-4-h2', part: 1, text: 'Was sollen die Kunden tun?', options: ['Zu den Kassen kommen', 'Länger bleiben', 'Wiederkommen'], answer: 0 },
        { type: 'mcq', id: 'g-a2-4-h3', part: 1, text: 'Wann kann die Nachbarin beim Umzug helfen?', options: ['Gar nicht', 'Am Samstag', 'Am Sonntag'], answer: 2 },
        { type: 'mcq', id: 'g-a2-4-h4', part: 1, text: 'Wie wird das Wetter morgen?', options: ['Kälter, vielleicht Schnee', 'Sonnig', 'Wärmer'], answer: 0 },
        { type: 'mcq', id: 'g-a2-4-h5', part: 1, text: 'Was soll Lisa nicht vergessen?', options: ['Einkaufen', 'Oma anrufen', 'Zur Arbeit gehen'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'listening', title: 'Hören – Teil 2: Gespräch im Alltag',
      instructions: 'Sie hören ein Gespräch. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/a2-4/hoeren-teil2.mp3',
      transcript: `Angestellter: Reisebüro Sonnenschein, guten Tag. Wie kann ich Ihnen helfen?\nKundin: Guten Tag. Ich möchte gern eine Reise nach Spanien buchen, für zwei Personen.\nAngestellter: Sehr gern. Wann möchten Sie reisen?\nKundin: In den Sommerferien, im Juli. Für eine Woche.\nAngestellter: Möchten Sie ein Hotel am Strand?\nKundin: Ja, das wäre schön. Aber es sollte nicht zu teuer sein. Unser Budget ist etwa 1000 Euro für beide.\nAngestellter: Ich habe hier ein schönes Hotel direkt am Meer, mit Frühstück. Für eine Woche kostet es 900 Euro für zwei Personen, ohne Flug.\nKundin: Und mit Flug?\nAngestellter: Mit Flug wären es 1300 Euro. Das ist etwas über Ihrem Budget.\nKundin: Hm, das ist zu teuer. Haben Sie etwas Günstigeres?\nAngestellter: Ja, ich schaue mal nach anderen Angeboten.`,
      questions: [
        { type: 'mcq', id: 'g-a2-4-h6', part: 2, text: 'Die Kundin möchte nach Spanien reisen.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a2-4-h7', part: 2, text: 'Sie möchte im Winter reisen.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a2-4-h8', part: 2, text: 'Das Hotel mit Flug kostet 900 Euro.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-a2-4-h9', part: 2, text: 'Die Reise mit Flug ist zu teuer für die Kundin.', options: ['Falsch', 'Richtig'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'listening', title: 'Hören – Teil 3: Kurze Gespräche',
      instructions: 'Sie hören vier kurze Gespräche. Wählen Sie die richtige Antwort.',
      audioUrl: '/audio/goethe/a2-4/hoeren-teil3.mp3',
      transcript: `Gespräch 1 — "Wie oft machst du Sport?" – "Dreimal in der Woche. Ich gehe joggen und zweimal ins Fitnessstudio."\n\nGespräch 2 — "Was ist dein Lieblingsessen?" – "Ich esse am liebsten Fisch, besonders im Sommer. Aber ich koche auch gern vegetarisch."\n\nGespräch 3 — "Entschuldigung, wo finde ich die Milch?" – "Die Milchprodukte sind ganz hinten, im letzten Gang links, neben dem Käse."\n\nGespräch 4 — "Hast du das Buch schon gelesen?" – "Ja, ich habe es am Wochenende zu Ende gelesen. Es war wirklich spannend!"`,
      questions: [
        { type: 'mcq', id: 'g-a2-4-h10', part: 3, text: 'Wie oft macht die Person Sport?', options: ['Dreimal pro Woche', 'Jeden Tag', 'Einmal pro Woche'], answer: 0 },
        { type: 'mcq', id: 'g-a2-4-h11', part: 3, text: 'Was isst die Person am liebsten?', options: ['Fleisch', 'Fisch', 'Nudeln'], answer: 1 },
        { type: 'mcq', id: 'g-a2-4-h12', part: 3, text: 'Wo ist die Milch?', options: ['Am Eingang', 'Vorne rechts', 'Hinten links, neben dem Käse'], answer: 2 },
        { type: 'mcq', id: 'g-a2-4-h13', part: 3, text: 'Wie fand die Person das Buch?', options: ['Spannend', 'Zu lang', 'Langweilig'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Lesen – Teil 1: Zeitungstext',
      instructions: 'Lesen Sie den Text. Kreuzen Sie an: richtig oder falsch?',
      passage: `Kostenloses Museum am ersten Sonntag\n\nGute Nachrichten für alle Kunstfreunde: Ab diesem Monat ist der Eintritt ins Stadtmuseum am ersten Sonntag jedes Monats kostenlos. Die Stadt möchte so mehr Menschen für Kunst und Geschichte begeistern, auch Familien, die sich den normalen Eintritt vielleicht nicht leisten können.\n\nDas Museum zeigt zurzeit eine besondere Ausstellung über die Geschichte der Stadt. An den kostenlosen Sonntagen gibt es außerdem Führungen für Kinder. Die Museumsleiterin erwartet viele Besucher und empfiehlt, früh zu kommen, denn es kann voll werden. Das Museum ist von 10 bis 18 Uhr geöffnet.`,
      passageTitle: 'Zeitungsartikel',
      questions: [
        { type: 'mcq', id: 'g-a2-4-l1', part: 4, text: 'Der Eintritt ist jeden Sonntag kostenlos.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-a2-4-l2', part: 4, text: 'Es gibt Führungen für Kinder.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-a2-4-l3', part: 4, text: 'Die Leiterin empfiehlt, früh zu kommen.', options: ['Falsch', 'Richtig'], answer: 1 },
      ],
    },
    {
      part: 5, skill: 'reading', title: 'Lesen – Teil 2: Anzeigen zuordnen',
      instructions: 'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt?',
      passage: `Anzeige A — Klavierunterricht für Kinder und Erwachsene. Erfahrene Lehrerin, auch bei Ihnen zu Hause. Erste Stunde gratis.\n\nAnzeige B — Wir suchen ein neues Zuhause für unsere Katze! Lieb und ruhig, kastriert. Nur an Katzenliebhaber.\n\nAnzeige C — Gartenarbeit angeboten: Rasen mähen, Hecken schneiden, Unkraut jäten. Günstig und zuverlässig.\n\nAnzeige D — Deutsch-Konversationskurs: Verbessern Sie Ihr Sprechen in lockerer Runde. Jeden Mittwochabend im Café Central.`,
      passageTitle: 'Anzeigen',
      questions: [
        { type: 'mcq', id: 'g-a2-4-l4', part: 5, text: 'Ihr Kind möchte ein Instrument lernen. Welche Anzeige passt?', options: ['Anzeige D', 'Anzeige A', 'Anzeige B', 'Anzeige C'], answer: 1 },
        { type: 'mcq', id: 'g-a2-4-l5', part: 5, text: 'Sie möchten Ihr Deutsch beim Sprechen üben. Welche Anzeige passt?', options: ['Anzeige C', 'Anzeige D', 'Anzeige A', 'Anzeige B'], answer: 1 },
        { type: 'mcq', id: 'g-a2-4-l6', part: 5, text: 'Sie brauchen Hilfe im Garten. Welche Anzeige passt?', options: ['Anzeige B', 'Anzeige C', 'Anzeige D', 'Anzeige A'], answer: 1 },
      ],
    },
    {
      part: 6, skill: 'reading', title: 'Lesen – Teil 3: E-Mail',
      instructions: 'Lesen Sie die E-Mail. Kreuzen Sie an: richtig oder falsch?',
      passage: `Hallo Ben,\n\nvielen Dank für deine Einladung zu deiner Party am Samstag! Ich komme sehr gern. Leider kann ich erst gegen 21 Uhr da sein, weil ich vorher noch arbeiten muss. Ich hoffe, das ist okay.\n\nSoll ich etwas mitbringen? Ich könnte einen Salat oder Getränke besorgen. Sag mir bitte Bescheid. Und schick mir noch mal deine genaue Adresse, ich habe sie verloren.\n\nBis Samstag!\nCarlos`,
      passageTitle: 'E-Mail von Carlos',
      questions: [
        { type: 'mcq', id: 'g-a2-4-l7', part: 6, text: 'Carlos kommt zur Party.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-a2-4-l8', part: 6, text: 'Carlos kommt pünktlich um 18 Uhr.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-a2-4-l9', part: 6, text: 'Carlos braucht die Adresse von Ben.', options: ['Falsch', 'Richtig'], answer: 1 },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 1: Kurze Nachricht',
      instructions: 'Schreiben Sie eine kurze Mitteilung.',
      questions: [
        {
          type: 'write', id: 'g-a2-4-s1', part: 7, taskNumber: 1,
          stimulusLabel: 'Nachricht an einen Freund',
          stimulus: 'Situation: Sie haben zwei Karten für ein Konzert am Freitag und möchten Ihren Freund David einladen. Schreiben Sie ihm eine Nachricht.',
          text: 'Schreiben Sie an David: 1) laden Sie ihn zum Konzert ein (Freitag), 2) Uhrzeit und Ort, 3) bitten Sie um eine schnelle Antwort. Ca. 20–30 Wörter mit Anrede und Gruß.',
          minWords: 25,
        },
      ],
    },
    {
      part: 8, skill: 'writing', title: 'Schreiben – Teil 2: E-Mail',
      instructions: 'Schreiben Sie eine E-Mail (ca. 40 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-a2-4-s2', part: 8, taskNumber: 2,
          stimulusLabel: 'E-Mail an einen Vermieter',
          stimulus: 'Situation: In Ihrer Wohnung gibt es ein Problem (z. B. die Waschmaschine ist kaputt). Schreiben Sie eine E-Mail an Ihren Vermieter.',
          text: 'Schreiben Sie: 1) beschreiben Sie das Problem, 2) bitten Sie um eine Reparatur, 3) machen Sie einen Terminvorschlag (wann Sie zu Hause sind). Ca. 40 Wörter, mit Anrede und Gruß.',
          minWords: 40,
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 1: Fragen zur Person',
      instructions: 'Stellen Sie Ihrem Partner Fragen und antworten Sie.',
      questions: [
        {
          type: 'speak', id: 'g-a2-4-sp1', part: 9, partNumber: 1,
          text: 'Stellen Sie zu den Stichwörtern je eine Frage und beantworten Sie die Fragen Ihres Partners.',
          cueCard: 'Stichwörter (Fragen zur Person):\n• Wochenende\n• Kochen\n• Fernsehen\n• Sprachen lernen\n• Wetter\n\nBeispiel: "Was machst du am liebsten am Wochenende?"',
        },
      ],
    },
    {
      part: 10, skill: 'speaking', title: 'Sprechen – Teil 2: Über sich sprechen',
      instructions: 'Sprechen Sie zusammenhängend über ein Thema.',
      questions: [
        {
          type: 'speak', id: 'g-a2-4-sp2', part: 10, partNumber: 2,
          text: 'Erzählen Sie über das Thema "Essen und Trinken". Sprechen Sie etwa 1–2 Minuten.',
          cueCard: 'Thema: Essen und Trinken\n\nPunkte:\n• Was essen Sie gern / nicht gern?\n• Kochen Sie selbst?\n• Essen Sie oft im Restaurant?\n• Ein typisches Gericht aus Ihrem Land?\n• Frühstück in Ihrem Land?',
        },
      ],
    },
    {
      part: 11, skill: 'speaking', title: 'Sprechen – Teil 3: Etwas gemeinsam planen',
      instructions: 'Planen Sie gemeinsam mit Ihrem Partner etwas.',
      questions: [
        {
          type: 'speak', id: 'g-a2-4-sp3', part: 11, partNumber: 3,
          text: 'Planen Sie zusammen einen Kinobesuch. Machen Sie Vorschläge und einigen Sie sich.',
          cueCard: 'Situation: Sie möchten mit einem Freund ins Kino gehen.\n\nPunkte zu klären:\n• Welcher Film?\n• Wann? (Tag, Uhrzeit)\n• Welches Kino?\n• Wie hinkommen?\n• Vorher oder nachher etwas essen?',
        },
      ],
    },
  ],
};

export default mock;
