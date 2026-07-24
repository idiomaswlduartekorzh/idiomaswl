import type { MockExam } from './types';

// Goethe-Zertifikat B2 — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/b2-2/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'b2-2',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat B2 – Übungstest 2',
  subtitle: 'Lesen · Hören · Schreiben · Sprechen',
  timeMinutes: 190,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Lesen – Teil 1: Standpunkte',
      instructions: 'Lesen Sie den Text zum Thema "Tourismus" und beantworten Sie die Fragen.',
      passage: `Massentourismus: Segen oder Fluch für beliebte Städte?\n\nStädte wie Venedig, Barcelona oder Amsterdam ziehen jedes Jahr Millionen von Besuchern an. Für die lokale Wirtschaft ist das zunächst ein Segen: Der Tourismus schafft Arbeitsplätze in Hotels, Restaurants und Geschäften und spült Geld in die Stadtkassen. Ohne die Einnahmen aus dem Tourismus könnten viele historische Gebäude und Kultureinrichtungen kaum erhalten werden.\n\nDoch die Kehrseite wird immer sichtbarer. In den Zentren beliebter Städte steigen die Mieten so stark, dass sich Einheimische das Wohnen kaum noch leisten können. Traditionelle Geschäfte weichen Souvenirläden, und die Straßen sind so überfüllt, dass die Lebensqualität der Bewohner leidet. Manche sprechen bereits von "Overtourism" – einem Zustand, in dem zu viele Touristen genau das zerstören, was sie eigentlich sehen wollten.\n\nEinige Städte reagieren inzwischen mit Maßnahmen: Sie begrenzen die Zahl der Übernachtungen, erheben eine Touristensteuer oder verbieten neue Ferienwohnungen. Fachleute betonen jedoch, dass es keine einfache Lösung gibt. Ziel müsse ein nachhaltiger Tourismus sein, der die Interessen von Besuchern und Bewohnern gleichermaßen berücksichtigt. Denn eine Stadt, in der niemand mehr wohnen kann, verliert am Ende genau den Charme, der sie einst so anziehend machte.`,
      passageTitle: 'Text: Massentourismus',
      questions: [
        { type: 'mcq', id: 'g-b2-2-l1', part: 1, text: 'Welchen wirtschaftlichen Vorteil bringt der Tourismus?', options: ['Er macht historische Gebäude überflüssig.', 'Er senkt die Mieten.', 'Er schafft Arbeitsplätze und Einnahmen.'], answer: 2 },
        { type: 'mcq', id: 'g-b2-2-l2', part: 1, text: 'Was ist ein Problem für die Einheimischen?', options: ['Es gibt zu wenige Touristen', 'Die Geschäfte sind zu billig', 'Die Mieten steigen stark'], answer: 2 },
        { type: 'mcq', id: 'g-b2-2-l3', part: 1, text: 'Was bedeutet "Overtourism"?', options: ['Zu wenige Besucher', 'Ein Zustand, in dem zu viele Touristen die Stadt schädigen', 'Ein neues Reisebüro'], answer: 1 },
        { type: 'mcq', id: 'g-b2-2-l4', part: 1, text: 'Was soll laut Fachleuten das Ziel sein?', options: ['Noch mehr Touristen', 'Ein Tourismusverbot', 'Ein nachhaltiger Tourismus, der Besucher und Bewohner berücksichtigt'], answer: 2 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lesen – Teil 2: Bericht',
      instructions: 'Lesen Sie den Text zum Thema "Künstliche Intelligenz" und beantworten Sie die Fragen.',
      passage: `Künstliche Intelligenz in der Arbeitswelt: Bedrohung und Chance\n\nKaum ein Thema wird derzeit so kontrovers diskutiert wie die künstliche Intelligenz, kurz KI. Programme, die Texte schreiben, Bilder erzeugen oder komplexe Daten analysieren, verändern zahlreiche Berufe in atemberaubendem Tempo. Die Sorge vieler Arbeitnehmer ist verständlich: Wird die Maschine mich ersetzen?\n\nTatsächlich werden bestimmte Tätigkeiten, vor allem einfache und wiederkehrende Aufgaben, zunehmend automatisiert. Doch die Geschichte lehrt, dass technologischer Wandel selten nur Arbeitsplätze vernichtet – er schafft auch neue. Als die ersten Computer aufkamen, fürchteten viele Massenarbeitslosigkeit; stattdessen entstanden ganze Branchen, die es zuvor nicht gab.\n\nEntscheidend ist, wie Gesellschaft und Einzelne mit dem Wandel umgehen. Wer bereit ist, sich weiterzubilden und neue Fähigkeiten zu erlernen, hat gute Chancen. Gefragt sind besonders jene Kompetenzen, die Maschinen schwer imitieren können: Kreativität, kritisches Denken, Empathie und die Fähigkeit, mit Menschen umzugehen. Fachleute fordern deshalb, dass Bildungssysteme stärker auf diese Fähigkeiten setzen. KI sollte, richtig eingesetzt, den Menschen unterstützen, statt ihn zu ersetzen – als Werkzeug, nicht als Konkurrent.`,
      passageTitle: 'Bericht: Künstliche Intelligenz',
      questions: [
        { type: 'mcq', id: 'g-b2-2-l5', part: 2, text: 'Welche Sorge haben viele Arbeitnehmer?', options: ['Dass die Maschine sie ersetzen könnte', 'Dass es keine Computer gibt', 'Dass sie zu viel verdienen'], answer: 0 },
        { type: 'mcq', id: 'g-b2-2-l6', part: 2, text: 'Was lehrt laut Text die Geschichte über technologischen Wandel?', options: ['Er vernichtet nur Arbeitsplätze', 'Er schafft auch neue Arbeitsplätze und Branchen', 'Er verändert nichts'], answer: 1 },
        { type: 'mcq', id: 'g-b2-2-l7', part: 2, text: 'Welche Kompetenzen sind laut Text besonders gefragt?', options: ['Schnelles Tippen', 'Kreativität, kritisches Denken und Empathie', 'Nur technisches Wissen'], answer: 1 },
        { type: 'mcq', id: 'g-b2-2-l8', part: 2, text: 'Wie sollte KI laut Fachleuten eingesetzt werden?', options: ['Als Werkzeug, das den Menschen unterstützt', 'Gar nicht', 'Als Ersatz für den Menschen'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Lesen – Teil 3: Meinungen zuordnen',
      instructions: 'Vier Personen äußern sich zum Thema "Leben ohne Auto". Ordnen Sie die Fragen den Personen zu.',
      passage: `Person A (Nora): Ich habe mein Auto vor zwei Jahren verkauft und es keine Sekunde bereut. Ich spare enorm viel Geld – kein Benzin, keine Versicherung, keine Reparaturen. Und ich bewege mich viel mehr, weil ich alles mit dem Rad erledige.\n\nPerson B (Kai): Für Menschen in der Stadt mag das funktionieren, aber ich wohne auf dem Land. Ohne Auto käme ich nicht zur Arbeit, und der nächste Supermarkt ist fünf Kilometer entfernt. Der öffentliche Nahverkehr ist hier praktisch nicht vorhanden.\n\nPerson C (Lea): Ich nutze eine Mischung: Für den Alltag Fahrrad und Bus, und wenn ich wirklich mal ein Auto brauche, leihe ich mir eins über Carsharing. So habe ich die Vorteile, ohne die hohen Fixkosten eines eigenen Autos.\n\nPerson D (Tom): Ehrlich gesagt hänge ich an meinem Auto. Es ist für mich Freiheit und Unabhängigkeit. Ich kann spontan losfahren, wohin ich will, ohne auf Fahrpläne angewiesen zu sein. Umweltfreundlicher zu fahren, versuche ich trotzdem.`,
      passageTitle: 'Meinungen: Leben ohne Auto',
      questions: [
        { type: 'mcq', id: 'g-b2-2-l9', part: 3, text: 'Wer kombiniert Fahrrad, Bus und Carsharing?', options: ['Person D (Tom)', 'Person A (Nora)', 'Person B (Kai)', 'Person C (Lea)'], answer: 3 },
        { type: 'mcq', id: 'g-b2-2-l10', part: 3, text: 'Wer braucht das Auto wegen des Wohnorts auf dem Land?', options: ['Person C (Lea)', 'Person D (Tom)', 'Person A (Nora)', 'Person B (Kai)'], answer: 3 },
        { type: 'mcq', id: 'g-b2-2-l11', part: 3, text: 'Wer schätzt am Auto vor allem Freiheit und Spontaneität?', options: ['Person B (Kai)', 'Person C (Lea)', 'Person D (Tom)', 'Person A (Nora)'], answer: 2 },
        { type: 'mcq', id: 'g-b2-2-l12', part: 3, text: 'Wer betont vor allem die Ersparnis und mehr Bewegung?', options: ['Person A (Nora)', 'Person B (Kai)', 'Person C (Lea)', 'Person D (Tom)'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'listening', title: 'Hören – Teil 1: Gespräch',
      instructions: 'Sie hören ein Gespräch zwischen zwei Personen. Wählen Sie zu jeder Aufgabe die richtige Antwort.',
      audioUrl: '/audio/goethe/b2-2/hoeren-teil1.mp3',
      transcript: `Lisa: Sag mal, David, du hast doch letztes Jahr ein Sabbatjahr gemacht. Wie war das?\nDavid: Ehrlich gesagt, es war die beste Entscheidung meines Lebens. Ich hatte mich völlig ausgebrannt gefühlt und brauchte eine Pause.\nLisa: Ich überlege auch, so etwas zu machen. Aber ich habe Angst, dass mein Chef das nicht gut findet und dass ich danach beruflich zurückfalle.\nDavid: Diese Angst hatte ich auch. Aber weißt du was? Als ich mit meinem Chef offen darüber gesprochen habe, war er überraschend verständnisvoll. Wir haben eine Lösung gefunden, sodass ich nach einem Jahr zurückkommen konnte.\nLisa: Und was hast du in dem Jahr gemacht?\nDavid: Ich bin gereist, habe eine Sprache gelernt und vor allem viel nachgedacht, was ich wirklich will. Ich kam mit ganz neuer Energie und Klarheit zurück. Meine Arbeit macht mir jetzt wieder Spaß.\nLisa: Das klingt wunderbar. Aber finanziell muss man sich das auch leisten können.\nDavid: Das stimmt. Ich habe zwei Jahre lang gespart. Ohne Planung geht es nicht. Aber wenn man wirklich will, findet man oft einen Weg.`,
      questions: [
        { type: 'mcq', id: 'g-b2-2-h1', part: 4, text: 'Warum hat David ein Sabbatjahr gemacht?', options: ['Er wollte mehr Geld verdienen', 'Er hatte sich ausgebrannt gefühlt', 'Er hatte seinen Job verloren'], answer: 1 },
        { type: 'mcq', id: 'g-b2-2-h2', part: 4, text: 'Wovor hat Lisa Angst?', options: ['Dass sie beruflich zurückfällt', 'Vor ihrem Chef persönlich', 'Vor dem Reisen'], answer: 0 },
        { type: 'mcq', id: 'g-b2-2-h3', part: 4, text: 'Wie reagierte Davids Chef?', options: ['Ablehnend', 'Überraschend verständnisvoll', 'Gar nicht'], answer: 1 },
        { type: 'mcq', id: 'g-b2-2-h4', part: 4, text: 'Was war laut David finanziell nötig?', options: ['Nichts Besonderes', 'Ein Kredit', 'Zwei Jahre sparen und Planung'], answer: 2 },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Hören – Teil 2: Vortrag',
      instructions: 'Sie hören einen kurzen Vortrag. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/b2-2/hoeren-teil2.mp3',
      transcript: `Meine sehr geehrten Zuhörerinnen und Zuhörer, heute möchte ich über das Thema Ernährung und Umwelt sprechen. Was wir essen, hat einen weit größeren Einfluss auf das Klima, als vielen bewusst ist.\n\nDie Produktion von Lebensmitteln ist für einen erheblichen Teil der weltweiten Treibhausgase verantwortlich. Besonders die Herstellung von Fleisch, vor allem Rindfleisch, verbraucht enorme Mengen an Wasser und Land und erzeugt viele Emissionen. Eine überwiegend pflanzliche Ernährung ist deutlich klimafreundlicher.\n\nDamit will ich niemanden zum Vegetarier machen. Es geht nicht um Verbote, sondern um Bewusstsein. Schon kleine Veränderungen haben eine große Wirkung, wenn viele Menschen sie umsetzen. Zum Beispiel: an einigen Tagen der Woche auf Fleisch verzichten, regionale und saisonale Produkte kaufen und Lebensmittel nicht verschwenden.\n\nGerade das Wegwerfen von Essen ist ein riesiges Problem: Ein großer Teil der produzierten Lebensmittel landet im Müll. Wer bewusster einkauft und Reste verwertet, tut also gleich doppelt Gutes – für den Geldbeutel und für die Umwelt. Ich lade Sie ein, beim nächsten Einkauf einmal darüber nachzudenken.`,
      questions: [
        { type: 'mcq', id: 'g-b2-2-h5', part: 5, text: 'Die Produktion von Fleisch erzeugt viele Emissionen.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-b2-2-h6', part: 5, text: 'Der Redner möchte alle zu Vegetariern machen.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-b2-2-h7', part: 5, text: 'Das Wegwerfen von Lebensmitteln ist laut Vortrag ein großes Problem.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-b2-2-h8', part: 5, text: 'Der Redner sagt, kleine Veränderungen hätten keine Wirkung.', options: ['Richtig', 'Falsch'], answer: 1 },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Schreiben – Teil 1: Meinungsäußerung im Forum',
      instructions: 'Schreiben Sie einen argumentativen Beitrag in einem Online-Forum (ca. 150 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-b2-2-s1', part: 6, taskNumber: 1,
          stimulusLabel: 'Forumsbeitrag (argumentativ)',
          stimulus: 'In einem Online-Forum wird diskutiert: "Sollten Städte den Autoverkehr in den Innenstädten stark einschränken?" Nehmen Sie Stellung.',
          text: 'Schreiben Sie einen argumentativen Forumsbeitrag (ca. 150 Wörter): 1) Führen Sie in das Thema ein, 2) nennen Sie Argumente dafür und dagegen, 3) vertreten Sie klar Ihre Position mit Begründung, 4) schließen Sie mit einem Fazit. Achten Sie auf Konnektoren und Struktur.',
          minWords: 150,
        },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 2: Formeller Brief',
      instructions: 'Schreiben Sie eine formelle Nachricht (ca. 100 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-b2-2-s2', part: 7, taskNumber: 2,
          stimulusLabel: 'Formelle Anfrage',
          stimulus: 'Situation: Sie interessieren sich für ein mehrmonatiges Praktikum bei einem Unternehmen. Sie möchten weitere Informationen und Ihr Interesse bekunden.',
          text: 'Schreiben Sie eine formelle E-Mail an die Personalabteilung (ca. 100 Wörter): 1) Stellen Sie sich kurz vor, 2) bekunden Sie Ihr Interesse am Praktikum, 3) stellen Sie zwei konkrete Fragen (z. B. Dauer, Bezahlung, Aufgaben), 4) bitten Sie um eine Antwort. Achten Sie auf formelle Sprache.',
          minWords: 100,
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Sprechen – Teil 1: Vortrag',
      instructions: 'Halten Sie einen kurzen Vortrag zu einem Thema und präsentieren Sie Ihre Position.',
      questions: [
        {
          type: 'speak', id: 'g-b2-2-sp1', part: 8, partNumber: 1,
          text: 'Halten Sie einen Vortrag (ca. 3–4 Minuten) zum Thema "Sollten Smartphones an Schulen verboten werden?".',
          cueCard: 'Thema: Smartphone-Verbot an Schulen?\n\nStruktur:\n• Einleitung: aktuelle Bedeutung\n• Argumente für ein Verbot (Ablenkung, Mobbing)\n• Argumente dagegen (Lernwerkzeug, Notfälle)\n• Ihre eigene Position mit Begründung\n• Abschluss und Empfehlung',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 2: Diskussion',
      instructions: 'Diskutieren Sie mit Ihrem Partner über ein Thema und finden Sie eine gemeinsame Lösung.',
      questions: [
        {
          type: 'speak', id: 'g-b2-2-sp2', part: 9, partNumber: 2,
          text: 'Diskutieren Sie: Ihr Sprachkurs möchte am Ende des Semesters eine gemeinsame Aktivität machen. Diskutieren Sie verschiedene Ideen und einigen Sie sich auf einen Vorschlag.',
          cueCard: 'Situation: Gemeinsame Aktivität zum Kursabschluss.\n\nMögliche Optionen (diskutieren und abwägen):\n• ein Ausflug in eine andere Stadt\n• ein gemeinsames Abendessen\n• eine Grillparty im Park\n• ein Besuch im Museum\n\nRedemittel: "Ich fände es gut, wenn ..." – "Das Problem dabei ist ..." – "Einverstanden, dann machen wir ..."',
        },
      ],
    },
  ],
};

export default mock;
