import type { MockExam } from './types';

// Goethe-Zertifikat B2 — formato oficial Modellsatz (Lesen · Hören · Schreiben · Sprechen).
// Conteúdo ORIGINAL WeLearn. Áudio sob /audio/goethe/b2-1/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'b2-1',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat B2 – Übungstest 1',
  subtitle: 'Lesen · Hören · Schreiben · Sprechen',
  timeMinutes: 190,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Lesen – Teil 1: Standpunkte',
      instructions: 'Lesen Sie den Text zum Thema "Digitalisierung der Schule" und beantworten Sie die Fragen.',
      passage: `Digitale Geräte im Klassenzimmer: Fortschritt oder Ablenkung?\n\nDie Frage, ob Tablets und Laptops den traditionellen Unterricht verbessern, spaltet Lehrkräfte, Eltern und Bildungsforscher. Befürworter argumentieren, dass digitale Medien den Unterricht anschaulicher und individueller gestalten. Schülerinnen und Schüler könnten in ihrem eigenen Tempo lernen, sofort Rückmeldungen erhalten und sich Inhalte über Videos oder interaktive Übungen leichter erschließen. Zudem, so das Argument, bereite der Umgang mit digitalen Werkzeugen auf eine Arbeitswelt vor, in der digitale Kompetenz unverzichtbar sei.\n\nKritiker halten dagegen, dass Bildschirme vor allem ablenken. Studien deuten darauf hin, dass Handschrift das Behalten von Informationen fördert, während das Tippen zu oberflächlicherem Lernen führen kann. Außerdem bestehe die Gefahr, dass Schülerinnen und Schüler während des Unterrichts heimlich spielen oder in sozialen Medien surfen. Nicht zuletzt seien nicht alle Familien gleich gut mit Geräten ausgestattet, was bestehende Ungleichheiten verstärken könne.\n\nEinig sind sich die meisten Fachleute in einem Punkt: Entscheidend ist nicht die Technik selbst, sondern wie sie eingesetzt wird. Ein Tablet ersetzt keine gute Lehrkraft. Sinnvoll ist die Digitalisierung dort, wo sie das Lernen tatsächlich vertieft – und nicht dort, wo sie nur modern wirken soll.`,
      passageTitle: 'Text: Digitale Geräte im Klassenzimmer',
      questions: [
        { type: 'mcq', id: 'g-b2-1-l1', part: 1, text: 'Welches Argument nennen die Befürworter digitaler Medien?', options: ['Sie ermöglichen individuelleres Lernen im eigenen Tempo.', 'Sie machen Lehrkräfte überflüssig.', 'Sie sind billiger als Bücher.'], answer: 0 },
        { type: 'mcq', id: 'g-b2-1-l2', part: 1, text: 'Was sagen Studien laut Text über die Handschrift?', options: ['Sie fördert das Behalten von Informationen.', 'Sie ist veraltet.', 'Sie führt zu oberflächlichem Lernen.'], answer: 0 },
        { type: 'mcq', id: 'g-b2-1-l3', part: 1, text: 'Welche Gefahr für die Gleichheit wird genannt?', options: ['Geräte sind für alle kostenlos.', 'Alle Familien haben die gleichen Geräte.', 'Nicht alle Familien sind gleich gut ausgestattet.'], answer: 2 },
        { type: 'mcq', id: 'g-b2-1-l4', part: 1, text: 'Worin sind sich die meisten Fachleute einig?', options: ['Entscheidend ist, wie die Technik eingesetzt wird.', 'Tablets ersetzen gute Lehrkräfte.', 'Technik sollte verboten werden.'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lesen – Teil 2: Bericht',
      instructions: 'Lesen Sie den Text zum Thema "Ehrenamt und Gesellschaft" und beantworten Sie die Fragen.',
      passage: `Zwischen Idealismus und Erschöpfung: Die Grenzen des Ehrenamts\n\nDas ehrenamtliche Engagement gilt als tragende Säule der Gesellschaft. Ohne die Millionen von Menschen, die freiwillig und unbezahlt Zeit investieren, würden viele soziale, kulturelle und sportliche Angebote schlicht nicht existieren. Doch in letzter Zeit mehren sich kritische Stimmen, die auf die Schattenseiten dieses Systems hinweisen.\n\nProblematisch wird es, wenn der Staat sich auf das Ehrenamt verlässt, um Aufgaben zu erfüllen, für die er eigentlich zuständig wäre. Manche Kommunen sparen bei bezahltem Personal und hoffen, dass Freiwillige die Lücke füllen. Die Folge: Ehrenamtliche übernehmen zunehmend anspruchsvolle Tätigkeiten, die früher Fachkräften vorbehalten waren – oft ohne angemessene Ausbildung und ohne Absicherung.\n\nHinzu kommt die Gefahr der Überlastung. Wer sich stark engagiert, gerät leicht in eine Situation, in der er sich für alles verantwortlich fühlt und kaum noch "Nein" sagen kann. Nicht selten führt anfänglicher Idealismus so zu Erschöpfung und Frustration. Fachleute fordern deshalb klare Grenzen: Ehrenamt solle eine freiwillige Ergänzung bleiben, nicht ein Ersatz für staatliche Verantwortung. Nur so lässt sich verhindern, dass aus einem Zeichen gesellschaftlichen Zusammenhalts eine stille Ausbeutung wird.`,
      passageTitle: 'Bericht: Grenzen des Ehrenamts',
      questions: [
        { type: 'mcq', id: 'g-b2-1-l5', part: 2, text: 'Wann wird das Ehrenamt laut Text problematisch?', options: ['Wenn zu viele Menschen mitmachen', 'Wenn der Staat sich darauf verlässt, um eigene Aufgaben zu erfüllen', 'Wenn es zu wenige Aufgaben gibt'], answer: 1 },
        { type: 'mcq', id: 'g-b2-1-l6', part: 2, text: 'Was ist eine Folge, wenn Kommunen bei Personal sparen?', options: ['Das Ehrenamt verschwindet', 'Freiwillige übernehmen anspruchsvolle Tätigkeiten ohne Ausbildung', 'Es gibt mehr bezahlte Stellen'], answer: 1 },
        { type: 'mcq', id: 'g-b2-1-l7', part: 2, text: 'Welche Gefahr wird für stark engagierte Menschen genannt?', options: ['Überlastung und Erschöpfung', 'Sie werden faul', 'Sie verdienen zu viel'], answer: 0 },
        { type: 'mcq', id: 'g-b2-1-l8', part: 2, text: 'Was fordern Fachleute?', options: ['Das Ehrenamt abzuschaffen', 'Dass Ehrenamt eine freiwillige Ergänzung bleibt, kein Ersatz für staatliche Verantwortung', 'Mehr unbezahlte Arbeit'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Lesen – Teil 3: Meinungen zuordnen',
      instructions: 'Vier Personen äußern sich zum Thema "Arbeiten im Ausland". Lesen Sie die Aussagen und ordnen Sie die Fragen zu.',
      passage: `Person A (Sofia): Für mich war der Job im Ausland die beste Entscheidung. Ich habe nicht nur meine Sprachkenntnisse verbessert, sondern auch gelernt, in schwierigen Situationen allein zurechtzukommen. Klar, die Bürokratie war anstrengend, aber das gehört dazu.\n\nPerson B (Markus): Ehrlich gesagt bin ich enttäuscht zurückgekommen. Man verspricht dir das große Abenteuer, aber am Ende arbeitest du zwölf Stunden am Tag und hast kaum Zeit, das Land wirklich kennenzulernen. Die Bezahlung war auch schlechter als erwartet.\n\nPerson C (Aylin): Beruflich hat mir die Auslandserfahrung enorm geholfen. In meinem Lebenslauf ist das ein großer Pluspunkt, und ich habe internationale Kontakte geknüpft, von denen ich bis heute profitiere. Privat war es einsam, das gebe ich zu.\n\nPerson D (Jonas): Ich rate jedem, es auszuprobieren – aber gut vorbereitet. Ich hatte vorher die Sprache gelernt und mich über Kultur und Arbeitsrecht informiert. Dadurch hatte ich viel weniger Probleme als andere, die einfach losgezogen sind.`,
      passageTitle: 'Meinungen: Arbeiten im Ausland',
      questions: [
        { type: 'mcq', id: 'g-b2-1-l9', part: 3, text: 'Wer betont vor allem den beruflichen Nutzen, gibt aber private Einsamkeit zu?', options: ['Person D (Jonas)', 'Person A (Sofia)', 'Person B (Markus)', 'Person C (Aylin)'], answer: 3 },
        { type: 'mcq', id: 'g-b2-1-l10', part: 3, text: 'Wer ist enttäuscht wegen langer Arbeitszeiten und schlechter Bezahlung?', options: ['Person C (Aylin)', 'Person D (Jonas)', 'Person A (Sofia)', 'Person B (Markus)'], answer: 3 },
        { type: 'mcq', id: 'g-b2-1-l11', part: 3, text: 'Wer hält eine gute Vorbereitung für entscheidend?', options: ['Person B (Markus)', 'Person C (Aylin)', 'Person D (Jonas)', 'Person A (Sofia)'], answer: 2 },
        { type: 'mcq', id: 'g-b2-1-l12', part: 3, text: 'Wer hebt vor allem die persönliche Selbstständigkeit hervor?', options: ['Person A (Sofia)', 'Person B (Markus)', 'Person C (Aylin)', 'Person D (Jonas)'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'listening', title: 'Hören – Teil 1: Gespräch',
      instructions: 'Sie hören ein Gespräch zwischen zwei Personen. Wählen Sie zu jeder Aufgabe die richtige Antwort.',
      audioUrl: '/audio/goethe/b2-1/hoeren-teil1.mp3',
      transcript: `Anna: Du, Ben, ich überlege, ob ich mich selbstständig machen soll. Was hältst du davon?\nBen: Das ist eine große Entscheidung. Was genau möchtest du denn machen?\nAnna: Ich würde gern als Grafikdesignerin freiberuflich arbeiten. Im Moment bin ich ja fest angestellt, aber ich habe wenig kreative Freiheit.\nBen: Verstehe. Der Reiz der Selbstständigkeit ist natürlich die Freiheit – du entscheidest, welche Projekte du annimmst. Aber du musst auch bedenken: Du hast kein festes Gehalt mehr, keine bezahlten Urlaubstage, und du musst dich selbst um Kunden, Steuern und Versicherungen kümmern.\nAnna: Das macht mir tatsächlich am meisten Sorgen – dieses finanzielle Risiko.\nBen: Ein Tipp: Fang nebenberuflich an. Behalte deinen Job und mach am Anfang ein paar Projekte nebenbei. So siehst du, ob du genug Kunden findest, ohne gleich alles zu riskieren.\nAnna: Das ist eine gute Idee. So kann ich langsam aufbauen und habe trotzdem Sicherheit.\nBen: Genau. Und wenn du merkst, dass es gut läuft, kannst du immer noch komplett wechseln.`,
      questions: [
        { type: 'mcq', id: 'g-b2-1-h1', part: 4, text: 'Warum möchte Anna sich selbstständig machen?', options: ['Sie hat wenig kreative Freiheit in ihrer Anstellung.', 'Sie verdient zu wenig.', 'Sie hat ihren Job verloren.'], answer: 0 },
        { type: 'mcq', id: 'g-b2-1-h2', part: 4, text: 'Was macht Anna am meisten Sorgen?', options: ['Das finanzielle Risiko', 'Die Kunden', 'Die Arbeitszeiten'], answer: 0 },
        { type: 'mcq', id: 'g-b2-1-h3', part: 4, text: 'Was rät Ben ihr?', options: ['Die Idee aufzugeben', 'Sofort zu kündigen', 'Nebenberuflich anzufangen und den Job zu behalten'], answer: 2 },
        { type: 'mcq', id: 'g-b2-1-h4', part: 4, text: 'Welchen Vorteil hat Bens Vorschlag?', options: ['Man hat trotzdem Sicherheit, während man aufbaut', 'Man muss keine Steuern zahlen', 'Man verdient sofort mehr'], answer: 0 },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Hören – Teil 2: Vortrag',
      instructions: 'Sie hören einen kurzen Vortrag. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/b2-1/hoeren-teil2.mp3',
      transcript: `Sehr geehrte Damen und Herren, willkommen zu meinem Vortrag über das Thema Schlaf. Viele von uns unterschätzen, wie wichtig Schlaf für unsere Gesundheit und Leistungsfähigkeit ist.\n\nWährend wir schlafen, ist unser Gehirn keineswegs untätig. Im Gegenteil: Es verarbeitet die Eindrücke des Tages, festigt Gelerntes und "räumt auf". Wer zu wenig schläft, dem fällt es schwerer, sich zu konzentrieren und neue Informationen zu behalten. Studien zeigen sogar, dass chronischer Schlafmangel das Risiko für zahlreiche Krankheiten erhöht, von Herzproblemen bis zu Depressionen.\n\nEin weit verbreiteter Irrtum ist, dass man verpassten Schlaf einfach am Wochenende nachholen kann. Das funktioniert nur begrenzt. Viel wichtiger ist ein regelmäßiger Rhythmus: möglichst zur gleichen Zeit ins Bett gehen und aufstehen. Auch der Verzicht auf Bildschirme vor dem Schlafengehen hilft, denn das blaue Licht stört die Produktion des Schlafhormons.\n\nMein Appell an Sie: Nehmen Sie Ihren Schlaf ernst. Er ist keine verlorene Zeit, sondern die Grundlage für ein gesundes und produktives Leben.`,
      questions: [
        { type: 'mcq', id: 'g-b2-1-h5', part: 5, text: 'Während des Schlafs ist das Gehirn untätig.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-b2-1-h6', part: 5, text: 'Chronischer Schlafmangel kann das Krankheitsrisiko erhöhen.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-b2-1-h7', part: 5, text: 'Man kann verpassten Schlaf am Wochenende problemlos nachholen.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-b2-1-h8', part: 5, text: 'Der Redner empfiehlt einen regelmäßigen Schlafrhythmus.', options: ['Falsch', 'Richtig'], answer: 1 },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Schreiben – Teil 1: Meinungsäußerung im Forum',
      instructions: 'Schreiben Sie einen argumentativen Beitrag in einem Online-Forum (ca. 150 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-b2-1-s1', part: 6, taskNumber: 1,
          stimulusLabel: 'Forumsbeitrag (argumentativ)',
          stimulus: 'In einem Online-Forum wird diskutiert: "Sollte das kostenlose Studium an Universitäten für alle erhalten bleiben, oder sollten Studiengebühren eingeführt werden?" Nehmen Sie Stellung.',
          text: 'Schreiben Sie einen argumentativen Forumsbeitrag (ca. 150 Wörter): 1) Führen Sie in das Thema ein, 2) nennen Sie Argumente für und/oder gegen Studiengebühren, 3) vertreten Sie klar Ihre eigene Position mit Begründung, 4) schließen Sie mit einem Fazit. Achten Sie auf Konnektoren und eine klare Struktur.',
          minWords: 150,
        },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 2: Formeller Brief',
      instructions: 'Schreiben Sie eine formelle Nachricht (ca. 100 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-b2-1-s2', part: 7, taskNumber: 2,
          stimulusLabel: 'Formelle Beschwerde',
          stimulus: 'Situation: Sie haben an einem teuren Wochenendseminar teilgenommen, das nicht Ihren Erwartungen entsprach (z. B. schlecht organisiert, Inhalte anders als beworben). Sie möchten sich beim Veranstalter beschweren.',
          text: 'Schreiben Sie eine formelle Beschwerde (ca. 100 Wörter): 1) Nennen Sie das Seminar und das Datum, 2) beschreiben Sie konkret die Probleme, 3) äußern Sie eine klare Forderung (z. B. teilweise Rückerstattung), 4) setzen Sie eine Frist. Achten Sie auf sachliche, höfliche und formelle Sprache.',
          minWords: 100,
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Sprechen – Teil 1: Vortrag',
      instructions: 'Halten Sie einen kurzen Vortrag zu einem Thema und präsentieren Sie Ihre Position.',
      questions: [
        {
          type: 'speak', id: 'g-b2-1-sp1', part: 8, partNumber: 1,
          text: 'Halten Sie einen Vortrag (ca. 3–4 Minuten) zum Thema "Sollten Menschen weniger Fleisch essen?".',
          cueCard: 'Thema: Weniger Fleisch essen?\n\nStruktur:\n• Einleitung: Bedeutung des Themas heute\n• Argumente dafür (Gesundheit, Umwelt, Tierwohl)\n• Argumente dagegen / Einwände (Genuss, Tradition, Wahlfreiheit)\n• Ihre eigene Position mit Begründung\n• Abschluss und Ausblick',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 2: Diskussion',
      instructions: 'Diskutieren Sie mit Ihrem Partner über ein Thema und finden Sie eine gemeinsame Lösung.',
      questions: [
        {
          type: 'speak', id: 'g-b2-1-sp2', part: 9, partNumber: 2,
          text: 'Diskutieren Sie: Ihre Firma möchte etwas für die Gesundheit der Mitarbeiter tun und hat ein Budget. Diskutieren Sie verschiedene Möglichkeiten und einigen Sie sich auf einen Vorschlag.',
          cueCard: 'Situation: Budget für die Gesundheit der Mitarbeiter.\n\nMögliche Optionen (diskutieren und abwägen):\n• kostenlose Fitnessstudio-Mitgliedschaft\n• gesundes Essen in der Kantine\n• ergonomische Arbeitsplätze\n• Kurse zu Stressbewältigung\n\nRedemittel: "Ich schlage vor, dass ..." – "Das sehe ich anders, weil ..." – "Wir könnten uns darauf einigen, dass ..."',
        },
      ],
    },
  ],
};

export default mock;
