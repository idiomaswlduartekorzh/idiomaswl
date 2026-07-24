import type { MockExam } from './types';

// Goethe-Zertifikat B2 — formato oficial Modellsatz. Conteúdo ORIGINAL WeLearn.
// Áudio sob /audio/goethe/b2-3/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'b2-3',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat B2 – Übungstest 3',
  subtitle: 'Lesen · Hören · Schreiben · Sprechen',
  timeMinutes: 190,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Lesen – Teil 1: Standpunkte',
      instructions: 'Lesen Sie den Text zum Thema "Homeoffice" und beantworten Sie die Fragen.',
      passage: `Das Ende des Büros? Über die Zukunft der Arbeit\n\nDie Pandemie hat einen Trend beschleunigt, der die Arbeitswelt nachhaltig verändert: das Arbeiten von zu Hause. Was früher als Ausnahme galt, ist für Millionen von Beschäftigten zur Normalität geworden. Doch nun stellt sich die Frage, wie die Zukunft aussehen soll – und die Meinungen gehen weit auseinander.\n\nBefürworter des Homeoffice verweisen auf mehr Flexibilität, den Wegfall langer Arbeitswege und eine bessere Vereinbarkeit von Beruf und Familie. Unternehmen wiederum können Bürokosten sparen. Manche Firmen haben deshalb angekündigt, ihre Büroflächen dauerhaft zu verkleinern.\n\nKritiker hingegen warnen vor den Schattenseiten. Der spontane Austausch mit Kollegen, aus dem oft die besten Ideen entstehen, gehe verloren. Neue Mitarbeiter fänden schwerer Anschluss, und die Grenze zwischen Arbeit und Freizeit verschwimme. Zudem seien nicht alle Wohnungen für konzentriertes Arbeiten geeignet.\n\nDie meisten Experten plädieren daher für ein hybrides Modell: einige Tage im Büro, einige zu Hause. So ließen sich die Vorteile beider Welten verbinden. Klar ist: Ein einfaches "Zurück zur alten Normalität" wird es nicht geben. Die Arbeitswelt hat sich verändert – die Frage ist nur, wie klug wir diese Veränderung gestalten.`,
      passageTitle: 'Text: Die Zukunft der Arbeit',
      questions: [
        { type: 'mcq', id: 'g-b2-3-l1', part: 1, text: 'Welchen Vorteil des Homeoffice nennen die Befürworter?', options: ['Bessere Vereinbarkeit von Beruf und Familie', 'Höhere Gehälter', 'Mehr Kollegen'], answer: 0 },
        { type: 'mcq', id: 'g-b2-3-l2', part: 1, text: 'Wovor warnen die Kritiker unter anderem?', options: ['Vor zu wenig Arbeit', 'Vor zu vielen Büros', 'Dass der spontane Austausch mit Kollegen verloren geht'], answer: 2 },
        { type: 'mcq', id: 'g-b2-3-l3', part: 1, text: 'Wofür plädieren die meisten Experten?', options: ['Für reines Homeoffice', 'Für die Rückkehr ins Büro für alle', 'Für ein hybrides Modell'], answer: 2 },
        { type: 'mcq', id: 'g-b2-3-l4', part: 1, text: 'Was ist laut Text klar?', options: ['Alles bleibt wie früher', 'Ein einfaches "Zurück zur alten Normalität" wird es nicht geben', 'Büros verschwinden komplett'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lesen – Teil 2: Bericht',
      instructions: 'Lesen Sie den Text zum Thema "Sprachenlernen" und beantworten Sie die Fragen.',
      passage: `Warum es sich lohnt, eine Fremdsprache zu lernen\n\nIn einer globalisierten Welt, in der digitale Übersetzungsprogramme immer besser werden, fragen sich manche: Lohnt es sich überhaupt noch, mühsam eine Fremdsprache zu lernen? Die Antwort der Wissenschaft ist ein klares Ja – aus Gründen, die weit über die reine Verständigung hinausgehen.\n\nZunächst der praktische Nutzen: Wer mehrere Sprachen spricht, hat auf dem Arbeitsmarkt bessere Chancen und kann in mehr Ländern leben und arbeiten. Doch das ist nur die halbe Wahrheit. Studien zeigen, dass das Erlernen einer Sprache das Gehirn trainiert wie kaum eine andere Tätigkeit. Es verbessert das Gedächtnis, die Konzentration und sogar die Fähigkeit, zwischen Aufgaben zu wechseln. Manche Untersuchungen deuten darauf hin, dass Mehrsprachigkeit den geistigen Abbau im Alter verzögern kann.\n\nHinzu kommt ein kultureller Aspekt: Eine Sprache zu lernen bedeutet auch, eine andere Denkweise kennenzulernen. Man versteht Menschen und Kulturen tiefer, wenn man ihre Sprache spricht. Und schließlich: Kein Übersetzungsprogramm ersetzt das Gefühl, sich in einem fremden Land selbst verständigen zu können und dabei echte menschliche Verbindungen zu knüpfen. Sprachen zu lernen ist deshalb keine überholte Mühe, sondern eine Investition in sich selbst – in den Beruf, den Geist und die Menschlichkeit.`,
      passageTitle: 'Bericht: Fremdsprachen lernen',
      questions: [
        { type: 'mcq', id: 'g-b2-3-l5', part: 2, text: 'Welche Frage stellen sich manche Menschen?', options: ['Ob Sprachen aussterben', 'Ob Übersetzungsprogramme zu teuer sind', 'Ob es sich noch lohnt, eine Fremdsprache zu lernen'], answer: 2 },
        { type: 'mcq', id: 'g-b2-3-l6', part: 2, text: 'Was bewirkt das Sprachenlernen laut Studien im Gehirn?', options: ['Es schadet dem Gedächtnis', 'Es hat keine Wirkung', 'Es verbessert Gedächtnis und Konzentration'], answer: 2 },
        { type: 'mcq', id: 'g-b2-3-l7', part: 2, text: 'Welcher kulturelle Aspekt wird genannt?', options: ['Man lernt eine andere Denkweise kennen', 'Man vergisst die eigene Kultur', 'Man reist weniger'], answer: 0 },
        { type: 'mcq', id: 'g-b2-3-l8', part: 2, text: 'Wie bewertet der Text das Sprachenlernen insgesamt?', options: ['Als reine Zeitverschwendung', 'Als überholte Mühe', 'Als eine Investition in sich selbst'], answer: 2 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Lesen – Teil 3: Meinungen zuordnen',
      instructions: 'Vier Personen äußern sich zum Thema "Social Media". Ordnen Sie die Fragen den Personen zu.',
      passage: `Person A (Elif): Für mich sind soziale Medien beruflich unverzichtbar. Ich bin selbstständig und finde einen Großteil meiner Kunden über Instagram. Ohne diese Plattformen wäre mein Geschäft kaum denkbar.\n\nPerson B (Robert): Ich habe alle sozialen Medien gelöscht und fühle mich seitdem viel freier. Ich habe gemerkt, wie viel Zeit ich mit sinnlosem Scrollen verschwendet habe und wie oft ich mich mit anderen verglichen habe.\n\nPerson C (Mei): Ich nutze soziale Medien vor allem, um mit meiner Familie im Ausland in Kontakt zu bleiben. Ohne sie wäre die Entfernung viel schwerer zu ertragen. Für mich sind sie eine Brücke.\n\nPerson D (Lukas): Ich sehe beides. Soziale Medien haben Vorteile, aber ich mache mir Sorgen um Jugendliche. Der Druck, immer perfekt zu wirken, und die Gefahr von Falschinformationen sind nicht zu unterschätzen.`,
      passageTitle: 'Meinungen: Social Media',
      questions: [
        { type: 'mcq', id: 'g-b2-3-l9', part: 3, text: 'Wer nutzt soziale Medien vor allem für den Kontakt zur Familie im Ausland?', options: ['Person D (Lukas)', 'Person A (Elif)', 'Person B (Robert)', 'Person C (Mei)'], answer: 3 },
        { type: 'mcq', id: 'g-b2-3-l10', part: 3, text: 'Wer hat alle sozialen Medien gelöscht?', options: ['Person C (Mei)', 'Person D (Lukas)', 'Person A (Elif)', 'Person B (Robert)'], answer: 3 },
        { type: 'mcq', id: 'g-b2-3-l11', part: 3, text: 'Wer betont den beruflichen Nutzen?', options: ['Person B (Robert)', 'Person C (Mei)', 'Person D (Lukas)', 'Person A (Elif)'], answer: 3 },
        { type: 'mcq', id: 'g-b2-3-l12', part: 3, text: 'Wer sorgt sich besonders um Jugendliche?', options: ['Person A (Elif)', 'Person B (Robert)', 'Person C (Mei)', 'Person D (Lukas)'], answer: 3 },
      ],
    },
    {
      part: 4, skill: 'listening', title: 'Hören – Teil 1: Gespräch',
      instructions: 'Sie hören ein Gespräch zwischen zwei Personen. Wählen Sie zu jeder Aufgabe die richtige Antwort.',
      audioUrl: '/audio/goethe/b2-3/hoeren-teil1.mp3',
      transcript: `Sonja: Paul, du hast doch vor Kurzem angefangen, ehrenamtlich zu arbeiten. Wie kam es dazu?\nPaul: Ja, ich engagiere mich jetzt bei einer Organisation, die Geflüchteten hilft. Angefangen hat es eigentlich zufällig – eine Freundin hat mich mitgenommen.\nSonja: Und wie gefällt es dir?\nPaul: Sehr gut, ehrlich gesagt. Ich hätte nicht gedacht, wie viel ich selbst davon habe. Ich helfe beim Deutschlernen, und die Dankbarkeit der Menschen ist unglaublich.\nSonja: Ich überlege auch schon länger, so etwas zu machen. Aber ich habe Angst, dass ich nicht genug Zeit habe.\nPaul: Das war meine Sorge auch. Aber du kannst mit wenig anfangen, zum Beispiel nur zwei Stunden pro Woche. Die Organisation ist da sehr flexibel.\nSonja: Und braucht man besondere Qualifikationen?\nPaul: Nein, überhaupt nicht. Wichtig sind Geduld und Offenheit. Am Anfang gibt es eine kurze Einführung, und erfahrene Helfer unterstützen dich.\nSonja: Das klingt gut. Ich glaube, ich probiere es einfach mal aus.\nPaul: Mach das! Ich kann dich gern beim nächsten Treffen mitnehmen.`,
      questions: [
        { type: 'mcq', id: 'g-b2-3-h1', part: 4, text: 'Wobei hilft Paul ehrenamtlich?', options: ['Beim Deutschlernen von Geflüchteten', 'Bei der Altenpflege', 'Beim Tierschutz'], answer: 0 },
        { type: 'mcq', id: 'g-b2-3-h2', part: 4, text: 'Was überrascht Paul an dem Engagement?', options: ['Wie viel Geld er bekommt', 'Wie viel er selbst davon hat', 'Wie langweilig es ist'], answer: 1 },
        { type: 'mcq', id: 'g-b2-3-h3', part: 4, text: 'Welche Sorge hat Sonja?', options: ['Dass es zu teuer ist', 'Dass sie die Sprache nicht kann', 'Dass sie nicht genug Zeit hat'], answer: 2 },
        { type: 'mcq', id: 'g-b2-3-h4', part: 4, text: 'Welche Qualifikationen braucht man laut Paul?', options: ['Ein Studium', 'Keine besonderen, wichtig sind Geduld und Offenheit', 'Eine Ausbildung als Lehrer'], answer: 1 },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Hören – Teil 2: Vortrag',
      instructions: 'Sie hören einen kurzen Vortrag. Kreuzen Sie an: richtig oder falsch?',
      audioUrl: '/audio/goethe/b2-3/hoeren-teil2.mp3',
      transcript: `Sehr geehrte Damen und Herren, mein heutiger Vortrag beschäftigt sich mit dem Thema lebenslanges Lernen. Die Vorstellung, dass Lernen mit dem Schul- oder Studienabschluss endet, ist längst überholt.\n\nUnsere Welt verändert sich so schnell, dass Wissen und Fähigkeiten rasch veralten. Berufe, die es heute gibt, existierten vor zwanzig Jahren noch nicht – und umgekehrt verschwinden andere. Wer beruflich mithalten will, muss bereit sein, immer wieder Neues zu lernen. Das gilt für alle Altersgruppen und alle Branchen.\n\nDoch lebenslanges Lernen ist mehr als eine berufliche Notwendigkeit. Es hält den Geist wach und jung. Menschen, die sich neugierig weiterbilden – sei es eine Sprache, ein Instrument oder ein neues Fachgebiet –, bleiben geistig aktiver und zufriedener. Lernen macht nicht nur klüger, sondern auch glücklicher.\n\nWichtig ist dabei: Man muss nicht immer einen Kurs besuchen. Auch Bücher, Podcasts, Online-Angebote oder einfach der Austausch mit anderen Menschen sind wertvolle Quellen. Mein Rat an Sie: Bleiben Sie neugierig. Fragen Sie sich regelmäßig, was Sie als Nächstes lernen möchten. Denn wer aufhört zu lernen, hört in gewisser Weise auf zu wachsen.`,
      questions: [
        { type: 'mcq', id: 'g-b2-3-h5', part: 5, text: 'Laut Vortrag endet das Lernen mit dem Studienabschluss.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-b2-3-h6', part: 5, text: 'Lebenslanges Lernen ist nur eine berufliche Notwendigkeit.', options: ['Falsch', 'Richtig'], answer: 0 },
        { type: 'mcq', id: 'g-b2-3-h7', part: 5, text: 'Laut Redner hält Lernen den Geist wach und macht zufriedener.', options: ['Richtig', 'Falsch'], answer: 0 },
        { type: 'mcq', id: 'g-b2-3-h8', part: 5, text: 'Man muss laut Vortrag immer einen Kurs besuchen, um zu lernen.', options: ['Richtig', 'Falsch'], answer: 1 },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Schreiben – Teil 1: Meinungsäußerung im Forum',
      instructions: 'Schreiben Sie einen argumentativen Beitrag in einem Online-Forum (ca. 150 Wörter).',
      questions: [
        {
          type: 'write', id: 'g-b2-3-s1', part: 6, taskNumber: 1,
          stimulusLabel: 'Forumsbeitrag (argumentativ)',
          stimulus: 'In einem Online-Forum wird diskutiert: "Sollte man Kindern und Jugendlichen den Zugang zu sozialen Medien gesetzlich einschränken?" Nehmen Sie Stellung.',
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
          type: 'write', id: 'g-b2-3-s2', part: 7, taskNumber: 2,
          stimulusLabel: 'Formeller Brief an eine Zeitung',
          stimulus: 'Situation: In Ihrer lokalen Zeitung wurde ein Artikel veröffentlicht, in dem behauptet wird, junge Menschen würden sich für nichts mehr interessieren und seien nur mit dem Handy beschäftigt. Sie möchten mit einem Leserbrief widersprechen.',
          text: 'Schreiben Sie einen Leserbrief an die Zeitung (ca. 100 Wörter): 1) beziehen Sie sich auf den Artikel, 2) äußern Sie sachlich Ihre Kritik oder Ihren Widerspruch, 3) bringen Sie ein Gegenbeispiel, 4) schließen Sie mit einem klaren Appell. Achten Sie auf sachliche, höfliche Sprache.',
          minWords: 100,
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Sprechen – Teil 1: Vortrag',
      instructions: 'Halten Sie einen kurzen Vortrag zu einem Thema und präsentieren Sie Ihre Position.',
      questions: [
        {
          type: 'speak', id: 'g-b2-3-sp1', part: 8, partNumber: 1,
          text: 'Halten Sie einen Vortrag (ca. 3–4 Minuten) zum Thema "Ist es wichtig, Auslandserfahrung zu sammeln?".',
          cueCard: 'Thema: Auslandserfahrung\n\nStruktur:\n• Einleitung: Bedeutung in der globalisierten Welt\n• Vorteile (Sprache, Selbstständigkeit, Karriere)\n• Mögliche Nachteile / Schwierigkeiten\n• Ihre eigene Erfahrung / Position\n• Abschluss und Empfehlung',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 2: Diskussion',
      instructions: 'Diskutieren Sie mit Ihrem Partner über ein Thema und finden Sie eine gemeinsame Lösung.',
      questions: [
        {
          type: 'speak', id: 'g-b2-3-sp2', part: 9, partNumber: 2,
          text: 'Diskutieren Sie: Eine Schule bekommt Geld für ein neues Projekt. Diskutieren Sie verschiedene Möglichkeiten und einigen Sie sich auf einen Vorschlag.',
          cueCard: 'Situation: Geld für ein Schulprojekt.\n\nMögliche Optionen (diskutieren und abwägen):\n• eine moderne Computerausstattung\n• ein Schulgarten\n• Sportgeräte\n• ein Programm gegen Mobbing\n\nRedemittel: "Meiner Meinung nach sollten wir ..." – "Ich verstehe dein Argument, aber ..." – "Lass uns einen Kompromiss finden: ..."',
        },
      ],
    },
  ],
};

export default mock;
