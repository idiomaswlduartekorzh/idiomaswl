import type { MockExam } from './types';

// Goethe-Zertifikat C1 — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/c1-4/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'c1-4',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat C1 – Übungstest 4',
  subtitle: 'Lesen · Hören · Schreiben · Sprechen',
  timeMinutes: 190,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Lesen – Teil 1: Sachtext',
      instructions: 'Lesen Sie den Text zum Thema "Arbeit und Sinn" und beantworten Sie die Fragen.',
      passage: `Warum wir arbeiten\n\nDie Frage, warum Menschen arbeiten, scheint auf den ersten Blick banal: um Geld zu verdienen, natürlich. Doch diese Antwort greift zu kurz. Zahlreiche Studien zeigen, dass Menschen auch dann weiterarbeiten würden, wenn sie finanziell abgesichert wären. Arbeit erfüllt offenbar tiefere Bedürfnisse.\n\nZum einen strukturiert Arbeit unser Leben. Sie gibt dem Tag einen Rhythmus, vermittelt das Gefühl, gebraucht zu werden, und bietet soziale Kontakte. Nicht selten leiden Menschen, die plötzlich aus dem Arbeitsleben ausscheiden – etwa durch Arbeitslosigkeit oder Ruhestand – nicht primär unter dem finanziellen Verlust, sondern unter dem Verlust an Struktur und Anerkennung.\n\nZum anderen kann Arbeit Sinn stiften. Wer das Gefühl hat, mit seiner Tätigkeit etwas Bedeutsames beizutragen, ist zufriedener und gesünder. Umgekehrt kann Arbeit, die als sinnlos empfunden wird – der Anthropologe David Graeber prägte den provokanten Begriff der "Bullshit-Jobs" –, trotz guter Bezahlung zutiefst unglücklich machen.\n\nDoch nicht jede Arbeit erfüllt diese positiven Funktionen. Prekäre Beschäftigung, ständige Überforderung oder entwürdigende Bedingungen machen krank statt zufrieden. Die entscheidende Frage lautet daher nicht, ob wir arbeiten sollten, sondern wie. Eine humane Gesellschaft sollte anstreben, dass Arbeit nicht nur Broterwerb, sondern auch Quelle von Würde, Sinn und Zugehörigkeit sein kann. Denn der Mensch lebt, wie schon die Alten wussten, nicht vom Brot allein.`,
      passageTitle: 'Text: Warum wir arbeiten',
      questions: [
        { type: 'mcq', id: 'g-c1-4-l1', part: 1, text: 'Warum greift die Antwort "um Geld zu verdienen" laut Text zu kurz?', options: ['Weil niemand Geld braucht', 'Weil Studien zeigen, dass Menschen auch abgesichert weiterarbeiten würden', 'Weil Arbeit verboten ist'], answer: 1 },
        { type: 'mcq', id: 'g-c1-4-l2', part: 1, text: 'Worunter leiden Menschen beim Ausscheiden aus dem Arbeitsleben oft primär?', options: ['Unter Langeweile allein', 'Unter dem finanziellen Verlust', 'Unter dem Verlust an Struktur und Anerkennung'], answer: 2 },
        { type: 'mcq', id: 'g-c1-4-l3', part: 1, text: 'Welchen Begriff prägte der Anthropologe David Graeber?', options: ['"Traumjobs"', '"Zukunftsjobs"', '"Bullshit-Jobs"'], answer: 2 },
        { type: 'mcq', id: 'g-c1-4-l4', part: 1, text: 'Was macht laut Text krank statt zufrieden?', options: ['Jede Arbeit', 'Prekäre Beschäftigung und entwürdigende Bedingungen', 'Sinnvolle Arbeit'], answer: 1 },
        { type: 'mcq', id: 'g-c1-4-l5', part: 1, text: 'Was sollte eine humane Gesellschaft laut Schluss anstreben?', options: ['Dass Arbeit nur Broterwerb ist', 'Dass niemand mehr arbeitet', 'Dass Arbeit Quelle von Würde, Sinn und Zugehörigkeit sein kann'], answer: 2 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lesen – Teil 2: Kommentar',
      instructions: 'Lesen Sie den Kommentar zum Thema "Wissenschaft" und beantworten Sie die Fragen.',
      passage: `Die Wissenschaft und ihre Zweifler\n\nEs gehört zu den Paradoxien unserer Zeit, dass ausgerechnet in einer Epoche beispielloser wissenschaftlicher Erfolge das Vertrauen in die Wissenschaft bei manchen zu bröckeln scheint. Impfgegner, Klimaskeptiker und andere stellen etablierte Erkenntnisse infrage – oft mit großer Vehemenz und im Namen einer vermeintlich "eigenen Recherche".\n\nUm dieses Phänomen zu verstehen, muss man ein verbreitetes Missverständnis über die Natur der Wissenschaft ausräumen. Wissenschaft liefert keine absoluten, ewigen Wahrheiten. Sie ist vielmehr ein Prozess des ständigen Prüfens, Korrigierens und Verbesserns. Gerade diese Offenheit für Revision, die eine große Stärke ist, wird von Zweiflern jedoch als Schwäche ausgelegt: "Die wissen doch selbst nicht, was stimmt."\n\nHinzu kommt, dass wissenschaftliche Aussagen oft mit Wahrscheinlichkeiten und Unsicherheiten operieren, während viele Menschen sich nach einfachen, eindeutigen Antworten sehnen. In diese Lücke stoßen jene, die vermeintliche Gewissheiten anbieten – meist einfache Erklärungen für komplexe Probleme.\n\nDie Verteidigung der Wissenschaft darf jedoch nicht in Arroganz umschlagen. Wer Zweifler pauschal als dumm abtut, treibt sie nur weiter in die Ablehnung. Nötig ist vielmehr eine bessere Wissenschaftskommunikation, die Unsicherheiten ehrlich benennt, ohne die grundsätzliche Verlässlichkeit wissenschaftlicher Methoden zu untergraben. Und nötig ist Bildung, die Menschen befähigt, seriöse von unseriösen Quellen zu unterscheiden. Denn die Alternative zur Wissenschaft ist nicht Freiheit, sondern die Herrschaft der Beliebigkeit.`,
      passageTitle: 'Kommentar: Wissenschaft und Zweifler',
      questions: [
        { type: 'mcq', id: 'g-c1-4-l6', part: 2, text: 'Welche Paradoxie nennt der Autor?', options: ['Die Wissenschaft macht keine Fortschritte', 'Alle vertrauen der Wissenschaft völlig', 'Trotz wissenschaftlicher Erfolge bröckelt bei manchen das Vertrauen'], answer: 2 },
        { type: 'mcq', id: 'g-c1-4-l7', part: 2, text: 'Was ist laut Text ein verbreitetes Missverständnis über Wissenschaft?', options: ['Dass sie absolute, ewige Wahrheiten liefert', 'Dass sie ein Prozess ist', 'Dass sie sich korrigiert'], answer: 0 },
        { type: 'mcq', id: 'g-c1-4-l8', part: 2, text: 'Wie wird die Offenheit der Wissenschaft für Revision von Zweiflern ausgelegt?', options: ['Als unwichtig', 'Als Stärke', 'Als Schwäche'], answer: 2 },
        { type: 'mcq', id: 'g-c1-4-l9', part: 2, text: 'Wovor warnt der Autor bei der Verteidigung der Wissenschaft?', options: ['Vor zu viel Bildung', 'Vor Ehrlichkeit', 'Vor Arroganz gegenüber Zweiflern'], answer: 2 },
        { type: 'mcq', id: 'g-c1-4-l10', part: 2, text: 'Was ist laut Schluss die Alternative zur Wissenschaft?', options: ['Freiheit', 'Die Herrschaft der Beliebigkeit', 'Mehr Gewissheit'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Lesen – Teil 3: Meinungen zuordnen',
      instructions: 'Vier Personen äußern sich zum Thema "Digitale Bildung an Schulen". Ordnen Sie die Fragen zu.',
      passage: `Person A (Lehrer Herr Kraus): Ich bin für einen behutsamen Einsatz. Digitale Werkzeuge können großartig sein, aber sie ersetzen nicht das Grundlegende: Lesen, Schreiben, Rechnen und vor allem die Beziehung zwischen Lehrer und Schüler. Technik ist Mittel, nicht Zweck.\n\nPerson B (Bildungsforscherin Dr. Lang): Die Studienlage ist eindeutiger, als viele glauben: Es kommt nicht auf die Geräte an, sondern auf die didaktische Einbettung. Ein Tablet, das nur ein Buch ersetzt, bringt nichts. Genutzt für Zusammenarbeit und individuelles Lernen, kann es dagegen sehr wertvoll sein.\n\nPerson C (Vater Herr Ilhan): Mich sorgt vor allem die soziale Ungleichheit. Nicht jede Familie kann ihren Kindern die nötige Ausstattung und Unterstützung zu Hause bieten. Wenn Schule das nicht ausgleicht, verstärkt die Digitalisierung die Kluft zwischen Arm und Reich.\n\nPerson D (Schülerin Mia): Ehrlich gesagt fänden wir Schüler mehr digitale Medien gut – nicht nur, weil es moderner ist, sondern weil wir so lernen, wie wir mit Technik verantwortungsvoll umgehen. Diese Kompetenz brauchen wir später sowieso, ob die Schule sie vermittelt oder nicht.`,
      passageTitle: 'Meinungen: Digitale Bildung',
      questions: [
        { type: 'mcq', id: 'g-c1-4-l11', part: 3, text: 'Wer sorgt sich vor allem um die soziale Ungleichheit?', options: ['Person D (Mia)', 'Person A (Herr Kraus)', 'Person B (Dr. Lang)', 'Person C (Herr Ilhan)'], answer: 3 },
        { type: 'mcq', id: 'g-c1-4-l12', part: 3, text: 'Wer betont, dass es nicht auf die Geräte, sondern auf die didaktische Einbettung ankommt?', options: ['Person C (Herr Ilhan)', 'Person D (Mia)', 'Person A (Herr Kraus)', 'Person B (Dr. Lang)'], answer: 3 },
        { type: 'mcq', id: 'g-c1-4-l13', part: 3, text: 'Wer sieht digitale Medien positiv als Chance, den verantwortungsvollen Umgang zu lernen?', options: ['Person B (Dr. Lang)', 'Person C (Herr Ilhan)', 'Person D (Mia)', 'Person A (Herr Kraus)'], answer: 2 },
        { type: 'mcq', id: 'g-c1-4-l14', part: 3, text: 'Wer betont, dass Technik Mittel und nicht Zweck sei?', options: ['Person A (Herr Kraus)', 'Person B (Dr. Lang)', 'Person C (Herr Ilhan)', 'Person D (Mia)'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'listening', title: 'Hören – Teil 1: Diskussion',
      instructions: 'Sie hören eine Diskussion. Wählen Sie zu jeder Aufgabe die richtige Antwort.',
      audioUrl: '/audio/goethe/c1-4/hoeren-teil1.mp3',
      transcript: `Moderatorin: Unser Thema heute: Ist Ehrenamt gerecht? Frau Dr. Horn, Sie haben dazu geforscht.\nDr. Horn: Ja, und die Ergebnisse sind ambivalent. Einerseits ist Ehrenamt unverzichtbar für den gesellschaftlichen Zusammenhalt. Andererseits ist der Zugang dazu ungleich verteilt. Wer sich ehrenamtlich engagieren kann, braucht Zeit, Bildung und ein gewisses finanzielles Polster.\nModerator: Herr Vogt, Sie leiten eine Freiwilligenorganisation. Teilen Sie diese Bedenken?\nHerr Vogt: In der Praxis sehe ich das differenzierter. Ja, es stimmt, dass bestimmte Formen des Engagements eher von privilegierten Gruppen ausgeübt werden. Aber es gibt auch viel Engagement in einfachen Verhältnissen – Nachbarschaftshilfe, Unterstützung in der Gemeinde. Das wird nur oft nicht als "Ehrenamt" wahrgenommen und statistisch nicht erfasst.\nDr. Horn: Das ist ein wichtiger Punkt. Vielleicht ist unser Begriff von Ehrenamt selbst zu eng und mittelschichtsgeprägt.\nHerr Vogt: Genau. Und daraus folgt für mich: Wir sollten Engagement niederschwelliger machen und verschiedene Formen anerkennen, statt nur die klassische Vereinsarbeit zu zählen.\nModeratorin: Ein Plädoyer für einen weiteren Begriff von Engagement also.\nDr. Horn: So könnte man es zusammenfassen, ja.`,
      questions: [
        { type: 'mcq', id: 'g-c1-4-h1', part: 4, text: 'Was ist laut Dr. Horn ambivalent am Ehrenamt?', options: ['Es ist völlig sinnlos', 'Es ist nur für Reiche', 'Es ist unverzichtbar, aber der Zugang ist ungleich verteilt'], answer: 2 },
        { type: 'mcq', id: 'g-c1-4-h2', part: 4, text: 'Was ergänzt Herr Vogt aus der Praxis?', options: ['Dass es kein Engagement in einfachen Verhältnissen gibt', 'Dass viel Engagement in einfachen Verhältnissen nicht als "Ehrenamt" erfasst wird', 'Dass nur Reiche helfen'], answer: 1 },
        { type: 'mcq', id: 'g-c1-4-h3', part: 4, text: 'Was räumt Dr. Horn ein?', options: ['Dass Ehrenamt unwichtig ist', 'Dass ihr Begriff von Ehrenamt vielleicht zu eng ist', 'Dass sie sich geirrt hat'], answer: 1 },
        { type: 'mcq', id: 'g-c1-4-h4', part: 4, text: 'Was folgt für Herrn Vogt daraus?', options: ['Man sollte Engagement niederschwelliger machen und verschiedene Formen anerkennen', 'Man sollte nur Vereinsarbeit zählen', 'Man sollte Ehrenamt abschaffen'], answer: 0 },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Hören – Teil 2: Vortrag',
      instructions: 'Sie hören einen Vortrag. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/c1-4/hoeren-teil2.mp3',
      transcript: `Sehr geehrte Anwesende, mein Vortrag beschäftigt sich mit der Kunst des Zuhörens – einer Fähigkeit, die in unserer Zeit erstaunlich unterschätzt wird. Wir investieren viel in die Kunst des Redens, in Rhetorik und Präsentation. Das Zuhören hingegen betrachten wir als selbstverständlich, ja als passiv. Zu Unrecht.\n\nEchtes Zuhören ist alles andere als passiv. Es erfordert Konzentration, Geduld und die Bereitschaft, die eigene Perspektive vorübergehend zurückzustellen. Die meisten Menschen hören nicht wirklich zu; sie warten lediglich, bis sie selbst wieder reden können, und formulieren im Kopf bereits ihre Antwort, während der andere noch spricht.\n\nDie Konsequenzen dieses Nicht-Zuhörens sind weitreichend. In persönlichen Beziehungen entstehen Missverständnisse und das Gefühl, nicht gesehen zu werden. In gesellschaftlichen Debatten führt es zur Verhärtung der Fronten: Man hört dem Gegenüber nicht zu, um es zu verstehen, sondern nur, um es zu widerlegen.\n\nDabei ist gerade das Zuhören der Schlüssel zur Verständigung. Wer sich ernsthaft bemüht, den anderen zu verstehen – nicht notwendigerweise ihm zuzustimmen, aber ihn zu verstehen –, schafft die Grundlage für einen echten Dialog. Ich möchte Sie daher einladen, das Zuhören als eine aktive, ja anspruchsvolle Kunst zu begreifen und zu üben. Denn eine Gesellschaft, in der niemand mehr zuhört, ist eine Gesellschaft, in der alle nur noch aneinander vorbeireden.`,
      questions: [
        { type: 'mcq', id: 'g-c1-4-h5', part: 5, text: 'Laut Vortrag wird das Zuhören in unserer Zeit unterschätzt.', options: ['Falsch', 'Richtig'], answer: 1 },
        { type: 'mcq', id: 'g-c1-4-h6', part: 5, text: 'Der Redner sagt, echtes Zuhören sei rein passiv.', options: ['Richtig', 'Falsch'], answer: 1 },
        { type: 'mcq', id: 'g-c1-4-h7', part: 5, text: 'In gesellschaftlichen Debatten führt Nicht-Zuhören laut Vortrag zur Verhärtung der Fronten.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-c1-4-h8', part: 5, text: 'Der Redner meint, Zuhören bedeute immer, dem anderen zuzustimmen.', options: ['Falsch', 'Richtig'], answer: 0 },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Schreiben – Teil 1: Erörterung',
      instructions: 'Schreiben Sie einen argumentativen Text zu einer kontroversen Frage (ca. 230 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-c1-4-s1', part: 6, taskNumber: 1,
          stimulusLabel: 'Erörterung',
          stimulus: 'Zum Thema "Sollte ein soziales oder ökologisches Pflichtjahr für junge Menschen eingeführt werden?" gibt es geteilte Meinungen. Verfassen Sie einen argumentativen Text, in dem Sie das Für und Wider differenziert abwägen und zu einer begründeten Position gelangen.',
          text: 'Schreiben Sie eine Erörterung (ca. 230 Wörter): 1) Führen Sie differenziert in die Problematik ein, 2) stellen Sie Argumente dafür dar, 3) stellen Sie Gegenargumente dar, 4) entwickeln Sie eine begründete eigene Position, 5) schließen Sie mit einem Fazit. Achten Sie auf gehobenen Stil und geeignete Konnektoren.',
          minWords: 200,
        },
      ],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Teil 2: Formeller Brief',
      instructions: 'Schreiben Sie eine formelle Stellungnahme (ca. 120 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-c1-4-s2', part: 7, taskNumber: 2,
          stimulusLabel: 'Formelle Stellungnahme',
          stimulus: 'Situation: Eine Zeitschrift plant eine Ausgabe zum Thema "Die Kunst des Zuhörens" und bittet Sie als Fachperson um einen kurzen Meinungsbeitrag.',
          text: 'Schreiben Sie einen formellen Meinungsbeitrag für die Redaktion (ca. 120 Wörter): 1) beziehen Sie Position zur These, dass Zuhören unterschätzt wird, 2) begründen Sie Ihre Sicht mit Argumenten und einem Beispiel, 3) formulieren Sie einen Appell an die Leser. Achten Sie auf einen gehobenen, überzeugenden Stil.',
          minWords: 110,
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Sprechen – Teil 1: Vortrag',
      instructions: 'Halten Sie einen strukturierten Vortrag zu einem abstrakten Thema.',
      questions: [
        {
          type: 'speak', id: 'g-c1-4-sp1', part: 8, partNumber: 1,
          text: 'Halten Sie einen Vortrag (ca. 4 Minuten) zum Thema "Der Wert der Muße in einer Leistungsgesellschaft". Präsentieren Sie das Thema differenziert und beziehen Sie eine begründete Position.',
          cueCard: 'Thema: Muße und Leistung\n\nStruktur:\n• Einleitung: Was ist Muße, was Leistung?\n• Die Dominanz des Leistungsdenkens\n• Der Wert von Muße (Kreativität, Gesundheit, Sinn)\n• Spannungsfeld und mögliche Balance\n• Ihre eigene, begründete Position\n• Abschluss und Ausblick',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 2: Diskussion',
      instructions: 'Diskutieren Sie kontrovers mit Ihrem Partner und verteidigen Sie Ihren Standpunkt.',
      questions: [
        {
          type: 'speak', id: 'g-c1-4-sp2', part: 9, partNumber: 2,
          text: 'Diskutieren Sie die These: "Um dem Fachkräftemangel zu begegnen, sollten Länder ihre Einwanderungspolitik deutlich öffnen." Vertreten Sie einen Standpunkt und gehen Sie auf die Argumente Ihres Partners ein.',
          cueCard: 'These: "Einwanderungspolitik öffnen gegen Fachkräftemangel."\n\nAspekte:\n• wirtschaftlicher Nutzen und demografischer Wandel\n• Integration und gesellschaftlicher Zusammenhalt\n• Verantwortung gegenüber den Herkunftsländern (brain drain)\n• Voraussetzungen für gelingende Einwanderung\n\nRedemittel (C1): "Es liegt auf der Hand, dass ..." – "Andererseits sollte man bedenken, dass ..." – "Entscheidend ist letztlich, ob es gelingt, ..."',
        },
      ],
    },
  ],
};

export default mock;
