import type { MockExam } from './types';

// Goethe-Zertifikat B1 — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/b1-4/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'b1-4',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat B1 – Übungstest 4',
  subtitle: 'Lesen · Hören · Schreiben · Sprechen',
  timeMinutes: 190,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Lesen – Teil 1: Blogeintrag',
      instructions: 'Lesen Sie den Text und die Aufgaben. Kreuzen Sie an: richtig oder falsch?',
      passage: `Endlich Nichtraucher – Blog von Katrin\n\nFünfzehn Jahre lang habe ich geraucht. Angefangen habe ich mit 16, weil meine Freunde auch rauchten und ich dazugehören wollte. Damals dachte ich, ich könnte jederzeit aufhören. Aber das war ein Irrtum. Die Zigarette wurde zu meinem ständigen Begleiter – nach dem Essen, in der Pause, beim Warten.\n\nVor sechs Monaten habe ich es endlich geschafft aufzuhören. Der Grund war meine Gesundheit: Ich bekam beim Treppensteigen kaum noch Luft. Mein Arzt warnte mich deutlich. Das hat mich wachgerüttelt.\n\nDie ersten Wochen waren die Hölle. Ich war nervös, schlief schlecht und aß viel zu viel Schokolade. Aber ich habe durchgehalten, mit Hilfe einer App und der Unterstützung meiner Familie. Heute fühle ich mich viel besser: Ich kann wieder joggen, schmecke das Essen intensiver und spare außerdem viel Geld. Mein Tipp an alle Raucher: Es ist schwer, aber es lohnt sich. Man muss es nur wirklich wollen.`,
      passageTitle: 'Blog: Endlich Nichtraucher',
      questions: [
        { type: 'mcq', id: 'g-b1-4-l1', part: 1, text: 'Katrin hat mit 16 Jahren angefangen zu rauchen.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-b1-4-l2', part: 1, text: 'Sie konnte immer leicht aufhören.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-b1-4-l3', part: 1, text: 'Der Grund zum Aufhören war ihre Gesundheit.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-b1-4-l4', part: 1, text: 'Die ersten Wochen waren leicht für sie.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-b1-4-l5', part: 1, text: 'Katrin spart jetzt Geld.', options: ['Richtig', 'Falsch'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lesen – Teil 2: Zeitungsartikel',
      instructions: 'Lesen Sie den Artikel und wählen Sie zu jeder Aufgabe die richtige Antwort.',
      passage: `Immer mehr Menschen kaufen gebraucht\n\nGebrauchte Kleidung, Möbel oder Elektrogeräte zu kaufen war früher oft ein Zeichen von Armut. Heute ist es für viele eine bewusste Entscheidung. Über Apps und Second-Hand-Läden kaufen und verkaufen immer mehr Menschen gebrauchte Dinge – und sind stolz darauf.\n\nDie Gründe sind unterschiedlich. Manche wollen Geld sparen, andere suchen besondere Einzelstücke, die es neu nicht mehr gibt. Für viele, besonders jüngere Menschen, ist aber der Umweltschutz das wichtigste Motiv. Denn die Produktion neuer Waren verbraucht viele Rohstoffe und Energie. Wer gebraucht kauft, schont die Umwelt.\n\nExperten sehen darin einen positiven Trend, warnen aber auch: Manche Menschen kaufen gebraucht so viel, dass sie am Ende wieder zu viel besitzen. Nachhaltig ist nicht, viel zu kaufen – egal ob neu oder gebraucht –, sondern bewusst und wenig zu konsumieren. Der beste Kauf, sagen sie augenzwinkernd, ist oft der, den man gar nicht macht.`,
      passageTitle: 'Zeitungsartikel: Gebraucht kaufen',
      questions: [
        { type: 'mcq', id: 'g-b1-4-l6', part: 2, text: 'Wie war das Gebrauchtkaufen früher oft?', options: ['Ein Zeichen von Armut', 'Verboten', 'Ein Zeichen von Reichtum'], answer: 0 },
        { type: 'mcq', id: 'g-b1-4-l7', part: 2, text: 'Was ist für viele junge Menschen das wichtigste Motiv?', options: ['Der Umweltschutz', 'Die Mode', 'Die Bequemlichkeit'], answer: 0 },
        { type: 'mcq', id: 'g-b1-4-l8', part: 2, text: 'Wovor warnen die Experten?', options: ['Dass gebrauchte Dinge gefährlich sind', 'Dass man zu wenig kauft', 'Dass manche am Ende wieder zu viel besitzen'], answer: 2 },
        { type: 'mcq', id: 'g-b1-4-l9', part: 2, text: 'Was ist laut Experten wirklich nachhaltig?', options: ['Bewusst und wenig zu konsumieren', 'Nur Neues zu kaufen', 'Viel gebraucht zu kaufen'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Lesen – Teil 3: Anzeigen',
      instructions: 'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt?',
      passage: `Anzeige A — Gitarrenunterricht für Anfänger und Fortgeschrittene. Geduldiger Lehrer, flexible Zeiten. Erste Probestunde kostenlos.\n\nAnzeige B — Suche Mitbewohner/in für schöne 2er-WG. Zimmer 18 m², hell, ruhige Lage. 400 Euro warm. Ab sofort.\n\nAnzeige C — Kostenloser Fahrradcheck: Bringen Sie Ihr Fahrrad am Samstag zum Marktplatz. Ehrenamtliche prüfen Bremsen und Licht.\n\nAnzeige D — Deutschkurs intensiv: In 4 Wochen von B1 auf B2. Montag bis Freitag, vormittags. Prüfungsvorbereitung inklusive.\n\nAnzeige E — Verkaufe Schreibtisch und Bürostuhl, gut erhalten. Zusammen 90 Euro. Nur Abholung.`,
      passageTitle: 'Kleinanzeigen',
      questions: [
        { type: 'mcq', id: 'g-b1-4-l10', part: 3, text: 'Sie möchten ein Musikinstrument lernen.', options: ['Anzeige C', 'Anzeige D', 'Anzeige A', 'Anzeige B'], answer: 2 },
        { type: 'mcq', id: 'g-b1-4-l11', part: 3, text: 'Sie möchten schnell Ihr Deutsch für B2 verbessern.', options: ['Anzeige C', 'Anzeige D', 'Anzeige E', 'Anzeige B'], answer: 1 },
        { type: 'mcq', id: 'g-b1-4-l12', part: 3, text: 'Sie suchen ein Zimmer in einer WG.', options: ['Anzeige B', 'Anzeige C', 'Anzeige D', 'Anzeige E'], answer: 0 },
        { type: 'mcq', id: 'g-b1-4-l13', part: 3, text: 'Sie möchten wissen, ob Ihr Fahrrad sicher ist.', options: ['Anzeige E', 'Anzeige B', 'Anzeige C', 'Anzeige D'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'listening', title: 'Hören – Teil 1: Kurze Texte',
      instructions: 'Sie hören fünf kurze Texte. Wählen Sie zu jedem Text die richtige Antwort.',
      audioUrl: '/audio/goethe/b1-4/hoeren-teil1.mp3',
      transcript: `Text 1 — Nachricht: Hallo Peter, ich stehe am Bahnhof, aber ich finde dich nicht. Wo genau bist du? Ruf mich bitte zurück.\n\nText 2 — Durchsage: Sehr geehrte Fahrgäste, der Zug endet heute in Mannheim. Für die Weiterfahrt nach Heidelberg nehmen Sie bitte den Bus vor dem Bahnhof.\n\nText 3 — Anrufbeantworter der Praxis: Guten Tag, unsere Praxis ist vom 20. bis 27. Dezember geschlossen. In dringenden Fällen wenden Sie sich bitte an den ärztlichen Notdienst.\n\nText 4 — Radiowerbung: Nur an diesem Wochenende: 20 Prozent Rabatt auf alle Winterjacken im Modehaus Berger!\n\nText 5 — Wetterbericht: Vorsicht auf den Straßen! Heute Nacht wird es glatt. Fahren Sie vorsichtig und rechnen Sie mit längeren Fahrzeiten.`,
      questions: [
        { type: 'mcq', id: 'g-b1-4-h1', part: 4, text: 'Wo steht die Person aus Text 1?', options: ['Im Büro', 'Am Bahnhof', 'Zu Hause'], answer: 1 },
        { type: 'mcq', id: 'g-b1-4-h2', part: 4, text: 'Wie kommt man von Mannheim nach Heidelberg?', options: ['Mit dem Bus', 'Mit dem Taxi', 'Mit dem Zug'], answer: 0 },
        { type: 'mcq', id: 'g-b1-4-h3', part: 4, text: 'Was soll man in dringenden Fällen tun?', options: ['Warten', 'Den ärztlichen Notdienst kontaktieren', 'Später anrufen'], answer: 1 },
        { type: 'mcq', id: 'g-b1-4-h4', part: 4, text: 'Worauf gibt es Rabatt?', options: ['Auf Hosen', 'Auf Schuhe', 'Auf Winterjacken'], answer: 2 },
        { type: 'mcq', id: 'g-b1-4-h5', part: 4, text: 'Wovor warnt der Wetterbericht?', options: ['Vor starkem Wind', 'Vor Hitze', 'Vor Glätte'], answer: 2 },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Hören – Teil 2: Radiogespräch',
      instructions: 'Sie hören ein Gespräch. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/b1-4/hoeren-teil2.mp3',
      transcript: `Moderator: Willkommen zu unserer Sendung über das Thema Homeoffice. Bei mir ist die Arbeitspsychologin Frau Dr. Berg. Frau Berg, viele Menschen arbeiten heute von zu Hause. Ist das gut?\nFrau Berg: Es hat Vor- und Nachteile. Viele schätzen, dass sie keine Zeit für den Arbeitsweg verlieren und flexibler sind. Das kann die Zufriedenheit erhöhen.\nModerator: Und die Nachteile?\nFrau Berg: Manche fühlen sich einsam, weil der Kontakt zu den Kollegen fehlt. Andere haben Probleme, Arbeit und Privatleben zu trennen. Sie arbeiten dann zu lange und machen keine richtigen Pausen.\nModerator: Was raten Sie?\nFrau Berg: Wichtig ist eine feste Struktur. Man sollte einen festen Arbeitsplatz haben, klare Arbeitszeiten festlegen und wirklich Pausen machen. Auch der Kontakt zu den Kollegen, zum Beispiel per Videoanruf, ist sehr wichtig.\nModerator: Also ist Homeoffice nicht für jeden gleich gut?\nFrau Berg: Genau. Das hängt von der Person und vom Beruf ab. Am besten ist oft eine Mischung: manchmal zu Hause, manchmal im Büro.`,
      questions: [
        { type: 'mcq', id: 'g-b1-4-h6', part: 5, text: 'Ein Vorteil des Homeoffice ist, dass man keine Zeit für den Arbeitsweg verliert.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-b1-4-h7', part: 5, text: 'Frau Berg sagt, im Homeoffice fühlt sich niemand einsam.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-b1-4-h8', part: 5, text: 'Sie empfiehlt, klare Arbeitszeiten festzulegen.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-b1-4-h9', part: 5, text: 'Homeoffice ist laut Frau Berg für jeden gleich gut.', options: ['Falsch', 'Richtig'], answer: 0 },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Schreiben – Teil 1: Forumsbeitrag',
      instructions: 'Schreiben Sie einen Beitrag in einem Internetforum.',
      questions: [
        {
          type: 'write', id: 'g-b1-4-s1', part: 6, taskNumber: 1,
          stimulusLabel: 'Forumsbeitrag',
          stimulus: 'In einem Internetforum diskutieren die Menschen: "Ist Homeoffice besser als die Arbeit im Büro?" Schreiben Sie Ihre Meinung.',
          text: 'Schreiben Sie einen Forumsbeitrag (ca. 80 Wörter): 1) Nennen Sie Ihre Meinung, 2) geben Sie mindestens zwei Gründe, 3) nennen Sie ein Beispiel. Achten Sie auf einen passenden Anfang und Schluss.',
          minWords: 80,
        },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 2: Formelle E-Mail',
      instructions: 'Schreiben Sie eine formelle E-Mail.',
      questions: [
        {
          type: 'write', id: 'g-b1-4-s2', part: 7, taskNumber: 2,
          stimulusLabel: 'Formelle E-Mail',
          stimulus: 'Situation: Sie möchten an einem Wochenendseminar teilnehmen, brauchen aber weitere Informationen. Schreiben Sie an die Volkshochschule.',
          text: 'Schreiben Sie eine formelle E-Mail an die Volkshochschule (ca. 80 Wörter): 1) Erklären Sie Ihr Interesse am Seminar, 2) stellen Sie zwei konkrete Fragen (z. B. Preis, Uhrzeit, Material), 3) bitten Sie um eine Antwort. Achten Sie auf höfliche, formelle Sprache.',
          minWords: 80,
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Sprechen – Teil 1: Gemeinsam planen',
      instructions: 'Planen Sie gemeinsam mit Ihrem Partner etwas.',
      questions: [
        {
          type: 'speak', id: 'g-b1-4-sp1', part: 8, partNumber: 1,
          text: 'Ein gemeinsamer Freund kommt aus dem Krankenhaus. Planen Sie zusammen, wie Sie ihm helfen können. Machen Sie Vorschläge und einigen Sie sich.',
          cueCard: 'Situation: Einem Freund nach dem Krankenhaus helfen.\n\nPunkte zu klären:\n• Was braucht er? (Einkäufe, Essen)\n• Wer besucht ihn wann?\n• Wie kommt er zu Terminen?\n• Ein kleines Geschenk?\n• Wie teilen Sie die Aufgaben?',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 2: Präsentation',
      instructions: 'Halten Sie eine kurze Präsentation zu einem Thema.',
      questions: [
        {
          type: 'speak', id: 'g-b1-4-sp2', part: 9, partNumber: 2,
          text: 'Halten Sie eine kurze Präsentation (2–3 Minuten) zum Thema "Sport in meinem Leben".',
          cueCard: 'Thema: Sport\n\nStruktur:\n• Einleitung: Wie wichtig ist Sport allgemein?\n• Welche Sportarten sind in Ihrem Land beliebt?\n• Ihre eigene Erfahrung mit Sport\n• Vorteile von Sport / mögliche Nachteile\n• Abschluss: Ihre Empfehlung',
        },
      ],
    },
    {
      part: 10, skill: 'speaking', title: 'Sprechen – Teil 3: Über die Präsentation sprechen',
      instructions: 'Reagieren Sie auf die Präsentation Ihres Partners und beantworten Sie Fragen.',
      questions: [
        {
          type: 'speak', id: 'g-b1-4-sp3', part: 10, partNumber: 3,
          text: 'Geben Sie Ihrem Partner eine Rückmeldung zu seiner Präsentation und stellen Sie eine Frage. Beantworten Sie auch die Fragen zu Ihrer eigenen Präsentation.',
          cueCard: 'Redemittel:\n• Rückmeldung: "Deine Präsentation war sehr klar. Mir hat gefallen, dass ..."\n• Frage: "Machst du selbst Sport? Welchen?"\n• Antwort: "Ja, ich ... / Nein, aber ich würde gern ..."',
        },
      ],
    },
  ],
};

export default mock;
