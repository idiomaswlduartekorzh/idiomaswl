import type { MockExam } from './types';

// Goethe-Zertifikat C1 — formato oficial Modellsatz (Lesen · Hören · Schreiben · Sprechen).
// Conteúdo ORIGINAL WeLearn. Áudio sob /audio/goethe/c1-1/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'c1-1',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat C1 – Übungstest 1',
  subtitle: 'Lesen · Hören · Schreiben · Sprechen',
  timeMinutes: 190,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Lesen – Teil 1: Sachtext',
      instructions: 'Lesen Sie den Text zum Thema "Digitalisierung und Gesellschaft" und beantworten Sie die Fragen.',
      passage: `Die Illusion der ständigen Erreichbarkeit\n\nWir leben in einem Zeitalter, das von der Verheißung permanenter Verfügbarkeit geprägt ist. Das Smartphone in der Tasche verspricht uns, jederzeit und überall verbunden zu sein – mit Menschen, Informationen und Möglichkeiten. Doch was zunächst als Befreiung erschien, hat sich für viele in eine subtile Form der Unfreiheit verwandelt.\n\nDie ständige Erreichbarkeit erzeugt einen impliziten Erwartungsdruck. Wer eine Nachricht nicht binnen Minuten beantwortet, gilt schnell als desinteressiert oder unzuverlässig. Die Grenze zwischen Arbeit und Privatleben, einst durch räumliche und zeitliche Strukturen klar markiert, ist porös geworden. Die abendliche E-Mail des Vorgesetzten, die eigentlich keine Antwort erfordert, hinterlässt dennoch ein diffuses Gefühl der Verpflichtung.\n\nParadoxerweise führt die technische Möglichkeit, mit allen verbunden zu sein, häufig zu einer inneren Zerstreuung. Die Aufmerksamkeit, jene knappe und kostbare Ressource, wird in immer kleinere Einheiten zerteilt. Tiefe Konzentration, wie sie für anspruchsvolle geistige Arbeit unerlässlich ist, wird zunehmend zur Ausnahme.\n\nEs wäre jedoch verkürzt, die Technik allein verantwortlich zu machen. Entscheidend ist der bewusste Umgang mit ihr. Ein wachsendes Bewusstsein für diese Problematik zeigt sich in Bewegungen wie dem "digitalen Minimalismus", der nicht Verzicht um des Verzichts willen predigt, sondern einen souveränen, selbstbestimmten Gebrauch der Technologie. Die eigentliche Kunst besteht nicht darin, die Verbindung zu kappen, sondern darin, zu entscheiden, wann man verbunden sein möchte – und wann nicht.`,
      passageTitle: 'Text: Ständige Erreichbarkeit',
      questions: [
        { type: 'mcq', id: 'g-c1-1-l1', part: 1, text: 'Wie beschreibt der Text die anfängliche Wirkung der ständigen Verfügbarkeit?', options: ['Als eindeutige Belastung von Anfang an', 'Als scheinbare Befreiung, die sich für viele in Unfreiheit verwandelt hat', 'Als völlig unwichtig'], answer: 1 },
        { type: 'mcq', id: 'g-c1-1-l2', part: 1, text: 'Was erzeugt die ständige Erreichbarkeit laut Text?', options: ['Klarere Grenzen zwischen Arbeit und Privatleben', 'Einen impliziten Erwartungsdruck', 'Mehr Freizeit'], answer: 1 },
        { type: 'mcq', id: 'g-c1-1-l3', part: 1, text: 'Welches Paradox nennt der Autor?', options: ['Die Möglichkeit, mit allen verbunden zu sein, führt oft zu innerer Zerstreuung', 'Niemand nutzt Smartphones', 'Technik macht alle glücklich'], answer: 0 },
        { type: 'mcq', id: 'g-c1-1-l4', part: 1, text: 'Worin besteht laut Text "die eigentliche Kunst"?', options: ['Die Technik ganz abzuschaffen', 'Selbst zu entscheiden, wann man verbunden sein möchte und wann nicht', 'Immer erreichbar zu sein'], answer: 1 },
        { type: 'mcq', id: 'g-c1-1-l5', part: 1, text: 'Wie steht der Autor zur Rolle der Technik?', options: ['Die Technik ist völlig harmlos', 'Die Technik allein ist verantwortlich', 'Entscheidend ist der bewusste Umgang mit ihr, nicht die Technik allein'], answer: 2 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lesen – Teil 2: Kommentar',
      instructions: 'Lesen Sie den Kommentar zum Thema "Bildung" und beantworten Sie die Fragen.',
      passage: `Bildung ist mehr als Ausbildung\n\nIn der bildungspolitischen Debatte dominiert seit Jahren ein ökonomischer Ton. Schulen und Universitäten werden zunehmend danach beurteilt, wie gut sie ihre Absolventen auf den Arbeitsmarkt vorbereiten. Kompetenzen, Qualifikationen, Beschäftigungsfähigkeit – das Vokabular verrät ein instrumentelles Verständnis von Bildung, das ihren eigentlichen Sinn zu verfehlen droht.\n\nGewiss, niemand bestreitet ernsthaft, dass Bildung auch der beruflichen Vorbereitung dient. Problematisch wird es erst, wenn dieser Aspekt zum alleinigen Maßstab erhoben wird. Denn Bildung im eigentlichen Sinne zielt auf mehr als die Verwertbarkeit des Erlernten. Sie soll den Menschen befähigen, selbstständig zu denken, komplexe Zusammenhänge zu durchschauen, sich ein begründetes Urteil zu bilden und als mündiger Bürger am gesellschaftlichen Leben teilzunehmen.\n\nEin Fach wie Philosophie oder Geschichte mag sich nicht unmittelbar in ein höheres Gehalt übersetzen lassen. Dennoch – oder gerade deshalb – ist es unverzichtbar. Wer die Vergangenheit nicht kennt, versteht die Gegenwart nicht; wer nicht gelernt hat, kritisch zu fragen, ist anfällig für Manipulation.\n\nEine Gesellschaft, die Bildung ausschließlich als Ausbildung begreift, sägt langfristig an dem Ast, auf dem sie sitzt. Denn eine funktionierende Demokratie braucht nicht nur qualifizierte Arbeitskräfte, sondern vor allem mündige, kritische und gebildete Bürgerinnen und Bürger. Bildung darf deshalb nie nur die Frage beantworten, wovon der Mensch lebt, sondern muss auch fragen, wofür.`,
      passageTitle: 'Kommentar: Bildung ist mehr als Ausbildung',
      questions: [
        { type: 'mcq', id: 'g-c1-1-l6', part: 2, text: 'Was kritisiert der Autor an der aktuellen Bildungsdebatte?', options: ['Dass ein ökonomischer, instrumenteller Ton dominiert', 'Dass Schulen zu viel Philosophie lehren', 'Dass sie zu wenig auf den Beruf achtet'], answer: 0 },
        { type: 'mcq', id: 'g-c1-1-l7', part: 2, text: 'Worauf zielt Bildung laut Autor "im eigentlichen Sinne"?', options: ['Nur auf ein hohes Gehalt', 'Auf selbstständiges Denken und mündige Teilhabe', 'Auf schnelle Prüfungen'], answer: 1 },
        { type: 'mcq', id: 'g-c1-1-l8', part: 2, text: 'Wie bewertet der Autor Fächer wie Philosophie oder Geschichte?', options: ['Als reine Zeitverschwendung', 'Als überflüssig', 'Als unverzichtbar, auch wenn sie sich nicht direkt in Gehalt übersetzen'], answer: 2 },
        { type: 'mcq', id: 'g-c1-1-l9', part: 2, text: 'Was braucht eine funktionierende Demokratie laut Text vor allem?', options: ['Mündige, kritische und gebildete Bürger', 'Weniger Bildung', 'Nur qualifizierte Arbeitskräfte'], answer: 0 },
        { type: 'mcq', id: 'g-c1-1-l10', part: 2, text: 'Welche Doppelfrage soll Bildung laut dem letzten Absatz beantworten?', options: ['Wovon und wofür der Mensch lebt', 'Wann und wo man arbeitet', 'Wie viel man verdient'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Lesen – Teil 3: Meinungen zuordnen',
      instructions: 'Vier Personen äußern sich zum Thema "Work-Life-Balance". Ordnen Sie die Fragen den Personen zu.',
      passage: `Person A (Dr. Weber, Ökonom): Die Vorstellung, Arbeit und Leben ließen sich sauber trennen, halte ich für überholt. Für viele kreative Menschen ist die Arbeit Teil ihrer Selbstverwirklichung. Nicht die Trennung ist das Ziel, sondern eine sinnvolle Integration.\n\nPerson B (Frau Klein, Ärztin): Aus medizinischer Sicht sehe ich täglich die Folgen von Überarbeitung. Ohne klare Grenzen und echte Erholung riskiert man seine Gesundheit. Wer ständig verfügbar ist, brennt langfristig aus.\n\nPerson C (Herr Ott, Unternehmer): Ich halte die ganze Debatte für übertrieben. Erfolg erfordert nun einmal Einsatz und Opfer. Wer nicht bereit ist, überdurchschnittlich zu arbeiten, sollte keine überdurchschnittlichen Ergebnisse erwarten.\n\nPerson D (Frau Sanchez, Soziologin): Wir sollten die Frage nicht individualisieren. Ob jemand eine gesunde Balance findet, hängt stark von den strukturellen Bedingungen ab – von der Unternehmenskultur, von gesetzlichen Regelungen, von sozialer Absicherung. Es ist nicht nur eine Frage der persönlichen Disziplin.`,
      passageTitle: 'Meinungen: Work-Life-Balance',
      questions: [
        { type: 'mcq', id: 'g-c1-1-l11', part: 3, text: 'Wer betont die Bedeutung struktureller und gesellschaftlicher Bedingungen?', options: ['Person B (Frau Klein)', 'Person C (Herr Ott)', 'Person D (Frau Sanchez)', 'Person A (Dr. Weber)'], answer: 2 },
        { type: 'mcq', id: 'g-c1-1-l12', part: 3, text: 'Wer hält die ganze Debatte für übertrieben und betont Einsatz und Opfer?', options: ['Person A (Dr. Weber)', 'Person B (Frau Klein)', 'Person C (Herr Ott)', 'Person D (Frau Sanchez)'], answer: 2 },
        { type: 'mcq', id: 'g-c1-1-l13', part: 3, text: 'Wer warnt vor allem vor gesundheitlichen Folgen der Überarbeitung?', options: ['Person D (Frau Sanchez)', 'Person A (Dr. Weber)', 'Person B (Frau Klein)', 'Person C (Herr Ott)'], answer: 2 },
        { type: 'mcq', id: 'g-c1-1-l14', part: 3, text: 'Wer plädiert statt für Trennung für eine sinnvolle Integration von Arbeit und Leben?', options: ['Person C (Herr Ott)', 'Person D (Frau Sanchez)', 'Person A (Dr. Weber)', 'Person B (Frau Klein)'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'listening', title: 'Hören – Teil 1: Diskussion',
      instructions: 'Sie hören eine Diskussion. Wählen Sie zu jeder Aufgabe die richtige Antwort.',
      audioUrl: '/audio/goethe/c1-1/hoeren-teil1.mp3',
      transcript: `Moderatorin: Willkommen zu unserer Diskussionsrunde zum Thema "Grundeinkommen". Herr Dr. Lang, Sie befürworten ein bedingungsloses Grundeinkommen. Warum?\nDr. Lang: Weil die Arbeitswelt sich radikal verändert. Durch Automatisierung werden viele klassische Jobs verschwinden. Ein Grundeinkommen würde allen Menschen eine finanzielle Basis geben und sie von der existenziellen Angst befreien. Das würde auch Kreativität und Unternehmertum fördern.\nModeratorin: Frau Professor Reich, Sie sind skeptisch.\nProf. Reich: Grundsätzlich teile ich die Sorge um die Zukunft der Arbeit. Aber ich bezweifle die Finanzierbarkeit. Ein Grundeinkommen für alle wäre extrem teuer. Zudem befürchte ich, dass es Menschen von sinnvoller Beschäftigung abhält. Arbeit ist ja nicht nur Einkommen, sondern auch Struktur und Sinn.\nDr. Lang: Aber genau diese Verknüpfung von Wert und Erwerbsarbeit müssen wir hinterfragen. Viele wertvolle Tätigkeiten – Kindererziehung, Pflege, ehrenamtliches Engagement – werden ja gar nicht bezahlt.\nProf. Reich: Da haben Sie einen Punkt. Trotzdem bleibe ich bei meiner Skepsis, was die praktische Umsetzung angeht. Vielleicht wären gezieltere Modelle sinnvoller als ein Grundeinkommen mit der Gießkanne für alle.\nModeratorin: Ein Thema, das uns sicher noch lange beschäftigen wird. Vielen Dank Ihnen beiden.`,
      questions: [
        { type: 'mcq', id: 'g-c1-1-h1', part: 4, text: 'Womit begründet Dr. Lang die Notwendigkeit eines Grundeinkommens?', options: ['Damit, dass alle faul werden sollen', 'Mit sinkenden Preisen', 'Mit der radikalen Veränderung der Arbeitswelt durch Automatisierung'], answer: 2 },
        { type: 'mcq', id: 'g-c1-1-h2', part: 4, text: 'Was ist Prof. Reichs Hauptkritikpunkt?', options: ['Die Idee ist unmoralisch', 'Die Finanzierbarkeit und die praktische Umsetzung', 'Es gibt keine Automatisierung'], answer: 1 },
        { type: 'mcq', id: 'g-c1-1-h3', part: 4, text: 'Welches Argument bringt Dr. Lang zur unbezahlten Arbeit?', options: ['Sie ist unwichtig', 'Sie sollte verboten werden', 'Viele wertvolle Tätigkeiten wie Pflege werden gar nicht bezahlt'], answer: 2 },
        { type: 'mcq', id: 'g-c1-1-h4', part: 4, text: 'Wozu tendiert Prof. Reich am Ende?', options: ['Zu gezielteren Modellen statt eines Grundeinkommens "mit der Gießkanne"', 'Zur Abschaffung aller Sozialleistungen', 'Zum Grundeinkommen für alle'], answer: 0 },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Hören – Teil 2: Vortrag',
      instructions: 'Sie hören einen Vortrag. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/c1-1/hoeren-teil2.mp3',
      transcript: `Sehr geehrte Damen und Herren, mein Vortrag widmet sich einem Phänomen, das unsere Zeit in besonderem Maße prägt: der Informationsflut und ihren Folgen für unser Denken.\n\nNie zuvor in der Geschichte hatten Menschen einen so leichten Zugang zu Wissen. Theoretisch trägt heute jeder mit einem Smartphone die gesammelten Informationen der Menschheit in seiner Tasche. Doch dieser vermeintliche Segen hat eine Kehrseite. Die schiere Menge an Informationen überfordert unsere kognitiven Kapazitäten. Wir konsumieren immer mehr, verstehen aber nicht unbedingt mehr.\n\nBesonders problematisch ist die Verwechslung von Information und Wissen. Information ist zunächst nur ein Datum, ein isolierter Fakt. Wissen hingegen entsteht erst durch Einordnung, Reflexion und Verknüpfung. Es erfordert Zeit und geistige Anstrengung – genau das, was in der Kultur der schnellen Klicks zu kurz kommt.\n\nHinzu kommt das Problem der Filterung. Algorithmen zeigen uns bevorzugt, was unsere bestehenden Ansichten bestätigt. So entstehen sogenannte Echokammern, in denen abweichende Meinungen kaum noch vorkommen. Die Folge ist eine zunehmende Polarisierung der Gesellschaft.\n\nWas ist zu tun? Ich plädiere für eine neue Kultur der Langsamkeit im Denken. Nicht mehr Information, sondern bessere Verarbeitung ist gefragt. Medienkompetenz – die Fähigkeit, Quellen kritisch zu prüfen und Wichtiges von Unwichtigem zu unterscheiden – wird zur Schlüsselqualifikation des 21. Jahrhunderts.`,
      questions: [
        { type: 'mcq', id: 'g-c1-1-h5', part: 5, text: 'Laut Vortrag verstehen wir durch mehr Informationskonsum automatisch mehr.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-c1-1-h6', part: 5, text: 'Der Redner unterscheidet zwischen Information und Wissen.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-c1-1-h7', part: 5, text: 'Algorithmen führen laut Vortrag zu sogenannten Echokammern.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-c1-1-h8', part: 5, text: 'Der Redner fordert vor allem noch mehr Informationen.', options: ['Richtig', 'Falsch'], answer: 1 },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Schreiben – Teil 1: Erörterung',
      instructions: 'Schreiben Sie einen argumentativen Text zu einer kontroversen Frage (ca. 230 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-c1-1-s1', part: 6, taskNumber: 1,
          stimulusLabel: 'Erörterung',
          stimulus: 'Zum Thema "Bedingungsloses Grundeinkommen" gibt es geteilte Meinungen. Verfassen Sie einen argumentativen Text für eine Diskussionsplattform, in dem Sie das Für und Wider abwägen und zu einer begründeten eigenen Position gelangen.',
          text: 'Schreiben Sie eine Erörterung (ca. 230 Wörter): 1) Führen Sie differenziert in die Problematik ein, 2) stellen Sie Argumente der Befürworter dar, 3) stellen Sie Gegenargumente dar, 4) entwickeln Sie eine begründete eigene Position, 5) schließen Sie mit einem Fazit oder Ausblick. Achten Sie auf einen gehobenen Stil, komplexe Satzstrukturen und geeignete Konnektoren.',
          minWords: 200,
        },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 2: Formeller Brief',
      instructions: 'Schreiben Sie eine formelle Stellungnahme (ca. 120 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-c1-1-s2', part: 7, taskNumber: 2,
          stimulusLabel: 'Formelle Stellungnahme',
          stimulus: 'Situation: Ihre Universität plant, eine bislang kostenlose Einrichtung (z. B. die Bibliothek am Wochenende oder das Sportangebot) aus Kostengründen einzuschränken. Sie möchten als Studierendenvertretung schriftlich Stellung nehmen.',
          text: 'Schreiben Sie eine formelle Stellungnahme an die Universitätsleitung (ca. 120 Wörter): 1) nehmen Sie Bezug auf die geplante Maßnahme, 2) legen Sie sachlich Ihre Kritik dar, 3) begründen Sie diese mit konkreten Argumenten, 4) schlagen Sie eine Alternative vor. Achten Sie auf einen sachlichen, überzeugenden und formellen Stil.',
          minWords: 110,
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Sprechen – Teil 1: Vortrag',
      instructions: 'Halten Sie einen strukturierten Vortrag zu einem abstrakten Thema.',
      questions: [
        {
          type: 'speak', id: 'g-c1-1-sp1', part: 8, partNumber: 1,
          text: 'Halten Sie einen Vortrag (ca. 4 Minuten) zum Thema "Fortschritt: Segen oder Fluch?". Präsentieren Sie das Thema differenziert und beziehen Sie eine begründete Position.',
          cueCard: 'Thema: Fortschritt – Segen oder Fluch?\n\nStruktur:\n• Einleitung: Was verstehen wir unter Fortschritt?\n• Positive Aspekte (Medizin, Lebensstandard, Wissen)\n• Kritische Aspekte (Umwelt, Entfremdung, neue Risiken)\n• Differenzierung: Kommt es auf den Umgang an?\n• Ihre eigene, begründete Position\n• Abschluss und Ausblick',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 2: Diskussion',
      instructions: 'Diskutieren Sie kontrovers mit Ihrem Partner und verteidigen Sie Ihren Standpunkt.',
      questions: [
        {
          type: 'speak', id: 'g-c1-1-sp2', part: 9, partNumber: 2,
          text: 'Diskutieren Sie die These: "Soziale Medien schaden der Demokratie mehr, als sie ihr nutzen." Vertreten Sie einen Standpunkt, gehen Sie auf die Argumente Ihres Partners ein und versuchen Sie, zu einer gemeinsamen Einschätzung zu kommen.',
          cueCard: 'These: "Soziale Medien schaden der Demokratie."\n\nAspekte für die Diskussion:\n• Verbreitung von Falschinformationen und Polarisierung\n• Zugang zu Information und Mobilisierung von Bürgern\n• Rolle der Algorithmen und Echokammern\n• Verantwortung der Plattformen und der Nutzer\n\nRedemittel (C1): "Man könnte einwenden, dass ..." – "Ich räume ein, dass ..., dennoch ..." – "Letztlich hängt es davon ab, ob ..."',
        },
      ],
    },
  ],
};

export default mock;
