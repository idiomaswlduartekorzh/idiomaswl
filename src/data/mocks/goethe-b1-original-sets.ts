import type { MCQQuestion, MockExam, MockSection } from './types';

type TrueFalseItem = { text: string; answer: boolean };
type ChoiceItem = { text: string; correct: string; distractors: [string, string] };
type Advertisement = { letter: string; title: string; text: string };
type MatchItem = { stem: string; answer: string };
type Opinion = { name: string; city: string; text: string; yes: boolean };

export type GoetheB1OriginalSource = {
  set: number;
  topicKey: string;
  topicLabel: string;
  personal: { subject: string; passage: string; items: TrueFalseItem[] };
  press: Array<{ title: string; passage: string; items: ChoiceItem[] }>;
  matching: { title: string; example: string; ads: Advertisement[]; items: MatchItem[] };
  debate: { question: string; opinions: Opinion[] };
  rules: { title: string; passage: string; items: ChoiceItem[] };
  writing: {
    personal: { label: string; stimulus: string; points: [string, string, string] };
    forum: { label: string; quote: string; prompt: string };
    formal: { label: string; stimulus: string; prompt: string };
  };
  speaking: {
    planning: { situation: string; points: string; roles: string };
    cards: [string, string];
    followUp: [string, string];
  };
};

const mcq = (id: string, part: number, text: string, options: string[], answer: number): MCQQuestion => ({
  type: 'mcq', id, part, text, options, answer,
});

function choice(id: string, part: number, item: ChoiceItem, seed: number): MCQQuestion {
  const positions = [seed % 3, (seed + 2) % 3, (seed + 1) % 3];
  const answer = positions[0];
  const options = Array<string>(3);
  options[positions[0]] = item.correct;
  options[positions[1]] = item.distractors[0];
  options[positions[2]] = item.distractors[1];
  return mcq(id, part, item.text, options, answer);
}

function buildOriginalSet(source: GoetheB1OriginalSource): MockExam {
  const prefix = `g-b1-${source.set}`;
  const pressPassage = source.press.map((article, index) => `TEXT ${index === 0 ? 'A' : 'B'} · ${article.title}\n\n${article.passage}`).join('\n\n');
  const adPassage = source.matching.ads.map(ad => `${ad.letter} · ${ad.title}\n${ad.text}`).join('\n\n');
  const opinionPassage = source.debate.opinions.map((opinion, index) => `${20 + index} · ${opinion.name.toUpperCase()}, ${opinion.city.toUpperCase()}\n${opinion.text}`).join('\n\n');

  const lesen: MockSection[] = [
    {
      part: 1, skill: 'reading', title: 'Lesen – Teil 1: Persönliche E-Mail',
      instructions: 'Lesen Sie den Text und die Aufgaben 1 bis 6 dazu. Wählen Sie: Sind die Aussagen Richtig oder Falsch?',
      passageTitle: source.personal.subject, passage: source.personal.passage,
      questions: source.personal.items.map((item, index) => mcq(`${prefix}-r1-${index + 1}`, 1, item.text, ['Richtig', 'Falsch'], item.answer ? 0 : 1)),
    },
    {
      part: 2, skill: 'reading', title: 'Lesen – Teil 2: Zwei Pressetexte',
      instructions: 'Lesen Sie die Texte und die Aufgaben 7 bis 12. Wählen Sie bei jeder Aufgabe die richtige Lösung a, b oder c.',
      passageTitle: 'Aus der regionalen Presse', passage: pressPassage,
      questions: source.press.flatMap((article, articleIndex) => article.items.map((item, itemIndex) => {
        const number = 7 + articleIndex * 3 + itemIndex;
        return choice(`${prefix}-r2-${number}`, 2, item, source.set + number);
      })),
    },
    {
      part: 3, skill: 'reading', title: 'Lesen – Teil 3: Anzeigen zuordnen',
      instructions: 'Lesen Sie die Situationen 13 bis 19 und die Anzeigen A bis J. Welche Anzeige passt? Jede Anzeige dürfen Sie nur einmal verwenden. Für eine Situation gibt es keine passende Anzeige. Wählen Sie dafür 0.',
      passageTitle: source.matching.title, passage: adPassage,
      questions: [{
        type: 'matching', id: `${prefix}-r3`, part: 3, qRange: [13, 19],
        groupLabel: `BEISPIEL: ${source.matching.example}`,
        items: source.matching.items.map((item, index) => ({ num: 13 + index, ...item })),
        endings: [...source.matching.ads.map(ad => ({ letter: ad.letter, text: ad.title })), { letter: '0', text: 'Keine Anzeige passt.' }],
      }],
    },
    {
      part: 4, skill: 'reading', title: 'Lesen – Teil 4: Meinungen',
      instructions: `Lesen Sie die Texte 20 bis 26. Sind die Personen dafür? Wählen Sie Ja oder Nein.`,
      passageTitle: source.debate.question, passage: opinionPassage,
      questions: source.debate.opinions.map((opinion, index) => mcq(`${prefix}-r4-${20 + index}`, 4, opinion.name, ['Ja', 'Nein'], opinion.yes ? 0 : 1)),
    },
    {
      part: 5, skill: 'reading', title: 'Lesen – Teil 5: Regeln und Hinweise',
      instructions: 'Lesen Sie die Regeln und die Aufgaben 27 bis 30. Wählen Sie die richtige Lösung a, b oder c.',
      passageTitle: source.rules.title, passage: source.rules.passage,
      questions: source.rules.items.map((item, index) => choice(`${prefix}-r5-${27 + index}`, 5, item, source.set + 27 + index)),
    },
  ];

  const schreiben: MockSection[] = [
    {
      part: 6, skill: 'writing', title: 'Schreiben – Aufgabe 1: Persönliche E-Mail',
      instructions: 'Arbeitszeit: 20 Minuten. Schreiben Sie circa 80 Wörter. Schreiben Sie etwas zu allen drei Punkten. Achten Sie auf Aufbau, Anrede und Gruß.',
      questions: [{ type: 'write', id: `${prefix}-w1`, part: 6, taskNumber: 1, minWords: 80, maxWords: 100, stimulusLabel: source.writing.personal.label, stimulus: source.writing.personal.stimulus, text: source.writing.personal.points.map(point => `• ${point}`).join('\n') }],
    },
    {
      part: 7, skill: 'writing', title: 'Schreiben – Aufgabe 2: Meinung im Forum',
      instructions: 'Arbeitszeit: 25 Minuten. Schreiben Sie circa 80 Wörter. Äußern Sie Ihre Meinung, nennen Sie Gründe und ein Beispiel.',
      questions: [{ type: 'write', id: `${prefix}-w2`, part: 7, taskNumber: 2, minWords: 80, maxWords: 100, stimulusLabel: source.writing.forum.label, stimulus: `„${source.writing.forum.quote}“`, text: source.writing.forum.prompt }],
    },
    {
      part: 8, skill: 'writing', title: 'Schreiben – Aufgabe 3: Formelle E-Mail',
      instructions: 'Arbeitszeit: 15 Minuten. Schreiben Sie circa 40 Wörter. Vergessen Sie Anrede und Gruß nicht.',
      questions: [{ type: 'write', id: `${prefix}-w3`, part: 8, taskNumber: 3, minWords: 40, maxWords: 60, stimulusLabel: source.writing.formal.label, stimulus: source.writing.formal.stimulus, text: source.writing.formal.prompt }],
    },
  ];

  const sprechen: MockSection[] = [
    {
      part: 9, skill: 'speaking', title: 'Sprechen – Teil 1: Gemeinsam etwas planen',
      instructions: source.speaking.planning.situation,
      questions: [{ type: 'speak', id: `${prefix}-sp1`, part: 9, partNumber: 1, text: source.speaking.planning.points, cueCard: source.speaking.planning.roles }],
    },
    {
      part: 10, skill: 'speaking', title: 'Sprechen – Teil 2: Ein Thema präsentieren',
      instructions: 'Wählen Sie eines von zwei Themen. Sprechen Sie circa drei bis vier Minuten. Nutzen Sie alle fünf Punkte Ihrer Präsentationskarte.',
      questions: [{ type: 'speak', id: `${prefix}-sp2`, part: 10, partNumber: 2, text: `KARTE A: ${source.speaking.cards[0]}\nKARTE B: ${source.speaking.cards[1]}`, cueCard: `KARTE A\nThema vorstellen · persönliche Erfahrung · Situation im Heimatland · Vorteile und Nachteile · eigene Meinung\n\nKARTE B\nThema vorstellen · persönliche Erfahrung · Situation im Heimatland · Vorteile und Nachteile · eigene Meinung`, followUp: source.speaking.followUp }],
    },
    {
      part: 11, skill: 'speaking', title: 'Sprechen – Teil 3: Über ein Thema sprechen',
      instructions: 'Geben Sie Ihrer Partnerin oder Ihrem Partner Feedback zur Präsentation. Stellen Sie danach eine Frage zum Thema und beantworten Sie eine Rückfrage.',
      questions: [{ type: 'speak', id: `${prefix}-sp3`, part: 11, partNumber: 3, text: 'Reagieren Sie direkt auf das gezogene Präsentationsthema.', followUp: ['Nennen Sie zuerst einen konkreten Punkt, der Sie überzeugt hat.', 'Stellen Sie dann eine offene Frage zum Thema.'] }],
    },
  ];

  return {
    id: `b1-${source.set}`, examSlug: 'goethe',
    title: `Goethe-Zertifikat B1 · Originalmock ${source.set}`,
    subtitle: 'Lesen, Schreiben und Sprechen vollständig · Hören und Gesamtprüfung bis zum geprüften Audio blockiert',
    timeMinutes: 140, sections: [...lesen, ...schreiben, ...sprechen],
  };
}

const commonAds = (rows: Array<[string, string]>): Advertisement[] => rows.map(([title, text], index) => ({ letter: String.fromCharCode(65 + index), title, text }));

export const GOETHE_B1_ORIGINAL_SOURCES: GoetheB1OriginalSource[] = [
  {
    set: 2, topicKey: 'short-film-festival', topicLabel: 'Kurzfilmfestival und Medienarbeit',
    personal: {
      subject: 'Betreff: Drei Tage hinter den Kulissen',
      passage: `Liebe Samira,\n\njetzt ist das Kurzfilmfestival vorbei, bei dem ich zum ersten Mal im Untertitel-Team geholfen habe. Eigentlich sollte ich nur die fertigen deutschen Texte kontrollieren. Am ersten Morgen fiel jedoch eine Kollegin aus, deshalb musste ich zusätzlich ausländische Gäste am Bahnhof abholen. Zum Glück hatte die Festivalleitung die Ankunftszeiten gut vorbereitet.\n\nIm Büro arbeiteten wir zu sechst. Für jeden Film gab es eine Liste mit schwierigen Stellen. Besonders kompliziert war ein brasilianischer Film: Die Figuren redeten sehr schnell und benutzten viele regionale Ausdrücke. Wir baten die Regisseurin um Hilfe und konnten danach fast alles verständlich übertragen. Nur zwei Witze ließen sich nicht wörtlich übersetzen; dafür suchten wir gemeinsam neue Formulierungen.\n\nAbends sahen wir die Filme im Kino. Beim ersten Screening erschienen die Untertitel einige Sekunden zu spät. Ich dachte schon, wir hätten einen großen Fehler gemacht. Es lag aber am Projektor, und der Techniker löste das Problem in der Pause. Das Publikum bemerkte später nichts mehr davon.\n\nAm Sonntag durfte ich eine Diskussion mit einer jungen Regisseurin moderieren. Davor war ich sehr nervös, doch die Zuschauer stellten so viele interessante Fragen, dass die halbe Stunde schnell verging. Für nächstes Jahr hat mir die Leiterin eine bezahlte Assistenz angeboten. Ich soll mich allerdings bis Ende November entscheiden.\n\nKommst du dann vielleicht mit? Für Freiwillige gibt es freie Kinokarten, aber Unterkunft und Anreise muss man selbst bezahlen.\n\nLiebe Grüße\nJonas`,
      items: [
        { text: 'Jonas sollte ursprünglich nur bereits erstellte Untertitel prüfen.', answer: true },
        { text: 'Die Festivalleitung hatte keine Informationen zu den ankommenden Gästen.', answer: false },
        { text: 'Bei einem Film half die Regisseurin dem Übersetzungsteam.', answer: true },
        { text: 'Die verspäteten Untertitel wurden durch Jonas verursacht.', answer: false },
        { text: 'Jonas bekam ein Angebot für eine bezahlte Tätigkeit im nächsten Jahr.', answer: true },
        { text: 'Freiwillige erhalten beim Festival kostenlos eine Unterkunft.', answer: false },
      ],
    },
    press: [
      {
        title: 'STILLE ZONEN IM GROSSRAUMBÜRO',
        passage: `Ein Leipziger Softwarebetrieb hat seine offenen Büroräume neu organisiert. Mitarbeitende können Telefonate weiterhin an ihren Plätzen führen, doch zwei Bereiche sind seit Januar als stille Zonen markiert. Dort sind Gespräche und akustische Benachrichtigungen nicht erlaubt. Anlass war eine interne Umfrage: Viele Beschäftigte konnten sich am Nachmittag kaum noch konzentrieren. Die Geschäftsführung wollte zunächst Kopfhörer verteilen, entschied sich nach einem Test aber für getrennte Bereiche. Nach drei Monaten melden die Teams weniger Fehler bei Aufgaben, die lange Aufmerksamkeit verlangen. Nicht alle sind zufrieden: Wer spontan mit Kolleginnen sprechen möchte, muss häufiger den Platz wechseln. Deshalb werden die Regeln im Sommer noch einmal gemeinsam geprüft.`,
        items: [
          { text: 'Warum wurden stille Zonen eingerichtet?', correct: 'Viele Beschäftigte hatten Konzentrationsprobleme.', distractors: ['Die Telefonanlage war zu laut.', 'Es gab zu wenige Arbeitsplätze.'] },
          { text: 'Welche Lösung war zuerst geplant?', correct: 'Die Beschäftigten sollten Kopfhörer bekommen.', distractors: ['Alle sollten von zu Hause arbeiten.', 'Telefonate sollten ganz verboten werden.'] },
          { text: 'Was soll im Sommer geschehen?', correct: 'Die Regelung wird noch einmal bewertet.', distractors: ['Das Großraumbüro wird geschlossen.', 'Alle Teams wechseln ihre Arbeitsplätze.'] },
        ],
      },
      {
        title: 'KLEIDUNG FÜR DAS VORSTELLUNGSGESPRÄCH',
        passage: `In Nürnberg verleiht eine soziale Initiative gute Kleidung für Bewerbungsgespräche. Kundinnen und Kunden werden vorher beraten und dürfen Jacke, Hose oder Schuhe zwei Wochen behalten. Das Angebot ist kostenlos, eine Bestätigung über den Gesprächstermin genügt. Die Kleidung stammt überwiegend von Firmen, die ungetragene Restbestände spenden. Seit Kurzem arbeiten auch zwei Änderungsschneidereien mit und passen einzelne Stücke an. Projektleiterin Aylin Demir betont, dass niemand sich verkleiden soll: Entscheidend sei, sich im ausgewählten Outfit sicher zu fühlen. Nach dem Gespräch bringen die Nutzer die Sachen gereinigt zurück. Wer eine Stelle gefunden hat, darf auf Wunsch ein vollständiges Outfit behalten.`,
        items: [
          { text: 'Was müssen Interessierte nachweisen?', correct: 'Dass ein Bewerbungsgespräch vereinbart ist.', distractors: ['Dass sie bereits eine Stelle haben.', 'Dass sie Kleidung gespendet haben.'] },
          { text: 'Welche neue Unterstützung gibt es?', correct: 'Manche Kleidungsstücke werden angepasst.', distractors: ['Alle Schuhe werden neu hergestellt.', 'Firmen bezahlen die Reinigung.'] },
          { text: 'Was ist Aylin Demir besonders wichtig?', correct: 'Die Personen sollen sich in der Kleidung wohlfühlen.', distractors: ['Alle sollen denselben Stil tragen.', 'Die Kleidung soll möglichst teuer wirken.'] },
        ],
      },
    ],
    matching: {
      title: 'Fortbildungen und berufliche Angebote', example: 'Eine Grafikdesignerin möchte lernen, kurze Filme zu schneiden. → H',
      ads: commonAds([
        ['Sicher moderieren', 'Training für Personen, die Diskussionen leiten. Sie üben, Fragen zu ordnen und auch bei Konflikten ruhig zu bleiben. Zwei Samstage.'],
        ['Bewerbungsunterlagen prüfen', 'Individuelle Beratung zu Lebenslauf und Anschreiben. Bitte senden Sie Ihre Unterlagen drei Tage vorher digital ein.'],
        ['Stimme vor dem Mikrofon', 'Sprechtraining für Podcasts und kurze Audiobeiträge. Keine technische Einführung, Aufnahmeerfahrung ist nicht nötig.'],
        ['Projektpläne verständlich machen', 'Onlinekurs für Teams: Ziele formulieren, Aufgaben verteilen und Termine realistisch planen. Mittwochvormittag.'],
        ['Deutsch für Meetings', 'Ab B1: zustimmen, widersprechen und Ergebnisse zusammenfassen. Sechs Termine am Abend.'],
        ['Mentoring für den Berufsstart', 'Berufserfahrene begleiten Hochschulabsolventinnen und -absolventen vier Monate lang persönlich.'],
        ['Souverän am Telefon', 'Praxisübungen für Servicekräfte: Anliegen klären, Rückfragen stellen und Beschwerden aufnehmen. Montagmorgen.'],
        ['Videoschnitt kompakt', 'Vom Rohmaterial zum dreiminütigen Clip. Eigenes Notebook und erste Erfahrung mit Schnittsoftware erforderlich.'],
        ['Arbeitsrecht am Abend', 'Grundlagen zu Vertrag, Urlaub und Kündigungsfristen. Offene Fragerunde mit einer Juristin.'],
        ['Netzwerken ohne Stress', 'Kleine Präsenzgruppe für Berufstätige, die auf Veranstaltungen leichter Kontakte beginnen möchten.'],
      ]),
      items: [
        { stem: 'Leyla muss regelmäßig Teamgespräche auf Deutsch führen und möchte passende Formulierungen üben.', answer: 'E' },
        { stem: 'Tobias sucht eine längerfristige Begleitung für seinen Übergang von der Universität in den Beruf.', answer: 'F' },
        { stem: 'Mina soll künftig Gesprächsrunden leiten und möchte schwierige Situationen trainieren.', answer: 'A' },
        { stem: 'Pablo möchte seine Bewerbungsdokumente mit einer Fachperson verbessern.', answer: 'B' },
        { stem: 'Nele produziert ihren ersten Podcast und möchte deutlicher sprechen.', answer: 'C' },
        { stem: 'Farid braucht einen Anfängerkurs für Videoschnitt und besitzt keinen eigenen Computer.', answer: '0' },
        { stem: 'Sofia arbeitet im Kundendienst und möchte professioneller auf Anrufe reagieren.', answer: 'G' },
      ],
    },
    debate: {
      question: 'Kamera bei Online-Besprechungen immer einschalten?',
      opinions: [
        { name: 'Elena', city: 'Wien', yes: true, text: 'Wenn wir uns sehen, erkenne ich schneller, ob jemand noch eine Frage hat. Besonders in kleinen Teams entsteht dadurch ein persönlicheres Gespräch.' },
        { name: 'Nico', city: 'Dresden', yes: false, text: 'Meine Internetverbindung ist zu Hause nicht immer stabil. Mit Kamera bricht der Ton häufiger ab, deshalb sollte sie freiwillig bleiben.' },
        { name: 'Meryem', city: 'Basel', yes: false, text: 'Nicht alle möchten ihre private Wohnung zeigen. Gute Zusammenarbeit hängt für mich von Vorbereitung und klaren Beiträgen ab, nicht vom Bild.' },
        { name: 'Paul', city: 'Mainz', yes: true, text: 'Bei neuen Kolleginnen hilft das Bild, Namen und Gesichter zu verbinden. Für regelmäßige Teamtreffen finde ich die Regel sinnvoll.' },
        { name: 'Ivana', city: 'Graz', yes: true, text: 'Ohne Kamera mache ich leichter andere Dinge nebenbei. Das eingeschaltete Bild hilft mir, aufmerksam zu bleiben und aktiv teilzunehmen.' },
        { name: 'Kenan', city: 'Essen', yes: false, text: 'Menschen mit wenig Platz oder Betreuungspflichten werden durch eine Pflicht unnötig unter Druck gesetzt. Das Ergebnis der Sitzung ist wichtiger.' },
        { name: 'Ruth', city: 'Bern', yes: true, text: 'Für kurze Informationsrunden ist es nicht nötig. Bei Diskussionen möchte ich aber die Reaktionen sehen; dort sollte die Kamera dazugehören.' },
      ],
    },
    rules: {
      title: 'Stadtarchiv Falkenau · Benutzungsordnung',
      passage: `ANMELDUNG\nFür die Nutzung des Lesesaals ist ein kostenloser Benutzerausweis erforderlich. Bitte bringen Sie einen amtlichen Lichtbildausweis mit. Minderjährige benötigen zusätzlich die schriftliche Zustimmung einer erziehungsberechtigten Person.\n\nBESTELLUNG\nArchivalien werden dienstags bis freitags um 10, 12 und 15 Uhr aus dem Magazin geholt. Bestellungen müssen mindestens eine Stunde vorher vorliegen. Besonders empfindliche Dokumente dürfen nur an reservierten Plätzen angesehen werden.\n\nLESESAAL\nTaschen, Getränke und Kugelschreiber bleiben in den Schließfächern. Erlaubt sind Bleistifte, lose Blätter und lautlose Laptops. Fotografieren ist ohne Blitz für private Zwecke möglich, wenn das Personal vorher zustimmt.\n\nRÜCKGABE\nAlle Dokumente sind spätestens 20 Minuten vor Schließung vollständig zurückzugeben. Wer eine Reihenfolge verändert oder Material beschädigt, informiert sofort die Aufsicht.`,
      items: [
        { text: 'Was brauchen Personen unter 18 Jahren zusätzlich?', correct: 'Eine schriftliche Zustimmung.', distractors: ['Eine kostenpflichtige Jahreskarte.', 'Eine Begleitung bei jedem Besuch.'] },
        { text: 'Wann muss eine Bestellung spätestens vorliegen?', correct: 'Eine Stunde vor der Ausgabe.', distractors: ['Am Vortag der Nutzung.', 'Zwanzig Minuten vor Schließung.'] },
        { text: 'Was ist im Lesesaal erlaubt?', correct: 'Ein Laptop ohne Geräusche.', distractors: ['Ein Kugelschreiber.', 'Ein Getränk am Arbeitsplatz.'] },
        { text: 'Wie darf man Dokumente fotografieren?', correct: 'Nach Zustimmung und ohne Blitz.', distractors: ['Nur gegen eine Tagesgebühr.', 'Ohne Rückfrage mit Blitz.'] },
      ],
    },
    writing: {
      personal: { label: 'Persönliche E-Mail', stimulus: 'Sie haben bei einer Kulturveranstaltung hinter den Kulissen geholfen. Schreiben Sie Ihrem Freund Amir.', points: ['Beschreiben Sie Ihre Aufgabe.', 'Erklären Sie, was unerwartet passiert ist.', 'Schlagen Sie eine gemeinsame Teilnahme im nächsten Jahr vor.'] },
      forum: { label: 'Online-Forum: Arbeitswelt', quote: 'Bei Videokonferenzen sollte die Kamera grundsätzlich eingeschaltet sein.', prompt: 'Schreiben Sie Ihre Meinung dazu. Begründen Sie Ihre Position und nennen Sie ein Beispiel aus dem Berufs- oder Lernalltag.' },
      formal: { label: 'E-Mail an Herrn Lorenz', stimulus: 'Sie haben für Samstag eine Moderationsschulung gebucht, können aber nicht teilnehmen.', prompt: 'Entschuldigen Sie sich höflich, nennen Sie kurz den Grund und bitten Sie um einen Ersatztermin.' },
    },
    speaking: {
      planning: { situation: 'Sie möchten gemeinsam einen internationalen Filmabend für Ihren Sprachkurs organisieren. Machen Sie Vorschläge, reagieren Sie und einigen Sie sich.', points: 'Planen Sie gemeinsam: Welcher Film? · Wann und wo? · Untertitel? · Getränke und Gespräch danach?', roles: 'Rolle A: Sie möchten eine Komödie im Kursraum zeigen. · Rolle B: Sie bevorzugen ein Drama im kleinen Stadtteilkino.' },
      cards: ['Serien nur noch im Original sehen?', 'Bewertungen im Internet vertrauen?'], followUp: ['Was ist für Anfängerinnen und Anfänger schwierig?', 'Wie kann man verlässliche Informationen erkennen?'],
    },
  },
  {
    set: 3, topicKey: 'cooperative-housing', topicLabel: 'Mehrgenerationenwohnen und Nachbarschaft',
    personal: {
      subject: 'Betreff: Die erste Woche im Wohnprojekt',
      passage: `Hallo Deniz,\n\nseit einer Woche wohne ich nun im Mehrgenerationenhaus am Fluss. Vor dem Umzug hatte ich Angst, dass alle ständig gemeinsam etwas unternehmen wollen. Tatsächlich hat jede Wohnung einen privaten Bereich, und niemand muss an den Gruppenangeboten teilnehmen. Trotzdem gibt es viele Gelegenheiten, die Nachbarn kennenzulernen.\n\nAm Dienstag war mein Küchenschrank noch nicht geliefert. Frau Weber aus dem zweiten Stock brachte mir spontan einen kleinen Tisch, den sie nicht mehr brauchte. Als Dank wollte ich für sie einkaufen, doch sie bat mich lieber um Hilfe mit ihrem neuen Tablet. Wir saßen eine Stunde zusammen, und inzwischen kann sie selbst Videotelefonate starten.\n\nDonnerstags trifft sich die Hausgemeinschaft im großen Raum. Dieses Mal ging es um den Innenhof. Einige Familien wünschen sich dort einen Spielbereich, andere brauchen ruhige Sitzplätze. Wir beschlossen nicht sofort, sondern zeichneten drei Vorschläge. Nächste Woche stimmen alle Bewohner schriftlich ab, auch diejenigen, die beim Treffen fehlten.\n\nAm Wochenende war ich für den Waschraum eingetragen. Das Buchungssystem funktioniert über eine App, aber mein Zugang war noch nicht aktiviert. Zum Glück kann man freie Zeiten auch auf einer Liste neben der Tür reservieren. So musste ich meine Wäsche nicht bis Montag liegen lassen.\n\nDie Hausgemeinschaft organisiert im Oktober einen Kennenlerntag. Ich übernehme eine Führung durch das Gebäude. Komm doch vorbei; Gäste müssen sich nur bis Mittwoch anmelden.\n\nViele Grüße\nMara`,
      items: [
        { text: 'Mara muss an allen gemeinsamen Aktivitäten teilnehmen.', answer: false },
        { text: 'Eine Nachbarin lieh Mara vorübergehend ein Möbelstück.', answer: true },
        { text: 'Frau Weber wollte, dass Mara Lebensmittel für sie kauft.', answer: false },
        { text: 'Über die Gestaltung des Hofes wird erst später entschieden.', answer: true },
        { text: 'Ohne App konnte Mara den Waschraum nicht reservieren.', answer: false },
        { text: 'Besucher sollen sich für den Kennenlerntag vorher anmelden.', answer: true },
      ],
    },
    press: [
      { title: 'SCHULBEGINN ERST UM NEUN?', passage: `Eine Gesamtschule in Bonn beginnt für die oberen Klassen seit diesem Schuljahr an zwei Tagen erst um neun Uhr. Die Idee kam aus der Schülervertretung, nachdem viele Jugendliche über Müdigkeit geklagt hatten. Der Unterricht endet an diesen Tagen nicht später: Die Mittagspause wurde verkürzt und eine lange Freistunde abgeschafft. Nach dem ersten Halbjahr kommen weniger Schülerinnen zu spät, und die erste Stunde wird aktiver genutzt. Eltern kritisieren allerdings, dass die jüngeren Geschwister weiterhin um acht beginnen und der Familienmorgen dadurch komplizierter wird. Die Schule entscheidet im Juni, ob der Versuch fortgesetzt wird.`, items: [
        { text: 'Wer schlug den späteren Beginn vor?', correct: 'Die Schülervertretung.', distractors: ['Die Elternvertretung.', 'Die Stadtverwaltung.'] },
        { text: 'Warum endet der Unterricht trotzdem nicht später?', correct: 'Pausen und Freistunden wurden verändert.', distractors: ['Ein Unterrichtsfach fällt aus.', 'Die Schulwoche wurde verlängert.'] },
        { text: 'Welches Problem nennen einige Eltern?', correct: 'Geschwister beginnen zu verschiedenen Zeiten.', distractors: ['Die Busse fahren morgens nicht.', 'Die Jugendlichen kommen häufiger zu spät.'] },
      ] },
      { title: 'GEMEINSAME GÄSTEZIMMER IM QUARTIER', passage: `In einem neuen Wohnviertel in Winterthur verzichten viele Wohnungen auf ein eigenes Gästezimmer. Stattdessen gibt es im Erdgeschoss vier kleine Zimmer, die alle Bewohner über eine Plattform buchen können. Eine Nacht kostet deutlich weniger als ein Hotel; Bettwäsche und Endreinigung sind enthalten. Das Modell spart Wohnfläche, verlangt aber klare Regeln. An Feiertagen dürfen Haushalte höchstens drei Nächte reservieren, damit mehr Familien eine Chance haben. Nach anfänglichen Schwierigkeiten zeigt die App inzwischen auch kurzfristige Stornierungen sofort an. Die Verwaltung berichtet, dass die Zimmer an Wochenenden fast vollständig belegt sind, unter der Woche aber oft leer bleiben.`, items: [
        { text: 'Warum gibt es gemeinsame Gästezimmer?', correct: 'Die einzelnen Wohnungen brauchen weniger Fläche.', distractors: ['Hotels sind im Viertel verboten.', 'Die Verwaltung vermietet nur an Touristen.'] },
        { text: 'Welche Regel gilt an Feiertagen?', correct: 'Ein Haushalt darf nur begrenzt lange buchen.', distractors: ['Eine Buchung kostet dann doppelt so viel.', 'Nur Familien dürfen Zimmer nutzen.'] },
        { text: 'Wann sind die Zimmer besonders gefragt?', correct: 'An Wochenenden.', distractors: ['An normalen Werktagen.', 'Nur während der Schulferien.'] },
      ] },
    ],
    matching: { title: 'Beratung rund ums Wohnen', example: 'Ein Paar möchte gemeinsam einen Mietvertrag prüfen lassen. → B', ads: commonAds([
      ['Nachbarschaft vermitteln', 'Neutrale Gespräche bei Konflikten über Lärm, Flur oder gemeinsame Flächen. Nur nach Terminvereinbarung.'], ['Mietvertrag verstehen', 'Juristische Erstberatung zu Klauseln, Kaution und Nebenkosten. Unterlagen bitte mitbringen.'], ['Umzug mit Kindern', 'Kostenloser Informationsabend zu Schulwechsel, Betreuung und Anmeldung am neuen Wohnort.'], ['Energieverbrauch lesen', 'Online-Seminar: Abrechnungen prüfen und den eigenen Verbrauch vergleichen. Keine individuelle Rechtsberatung.'], ['Barrierearm wohnen', 'Beratung zu kleinen Veränderungen in der Wohnung und möglichen Zuschüssen. Hausbesuch möglich.'], ['WG gesucht', 'Moderiertes Treffen für Menschen ab 50, die eine Wohngemeinschaft gründen möchten.'], ['Haustiere im Mietshaus', 'Vortrag über Rechte, Rücksichtnahme und gute Absprachen mit der Nachbarschaft.'], ['Erste eigene Wohnung', 'Workshop für Auszubildende: Budget, Versicherungen und Übergabeprotokoll.'], ['Gemeinschaftsraum buchen', 'Technische Hilfe für Bewohner des Quartiers bei Konto, Kalender und digitalem Schließsystem.'], ['Pflanzen auf dem Balkon', 'Praxisabend zu geeigneten Sorten und sicherer Befestigung. Material kann vor Ort gekauft werden.'],
    ]), items: [
      { stem: 'Nora beginnt eine Ausbildung und möchte wissen, welche monatlichen Kosten sie allein tragen muss.', answer: 'H' }, { stem: 'Herr Rossi kann Treppen schlecht nutzen und sucht Unterstützung für Anpassungen zu Hause.', answer: 'E' }, { stem: 'Zwei Nachbarn streiten seit Monaten über Geräusche und wünschen ein moderiertes Gespräch.', answer: 'A' }, { stem: 'Mila versteht mehrere Positionen ihrer Heizkostenabrechnung nicht, braucht aber keine Rechtsberatung.', answer: 'D' }, { stem: 'Rachid zieht mit seiner Tochter in eine andere Stadt und braucht Informationen zur Schule.', answer: 'C' }, { stem: 'Eva möchte ihre Wohnung für drei Monate mit einer Touristin tauschen.', answer: '0' }, { stem: 'Uwe sucht Menschen in seinem Alter für eine neue gemeinsame Wohnform.', answer: 'F' },
    ] },
    debate: { question: 'Feste Ruhezeit am Nachmittag im Wohnhaus?', opinions: [
      { name: 'Hanna', city: 'Kiel', yes: false, text: 'Viele Menschen arbeiten zu unterschiedlichen Zeiten. Eine allgemeine Mittagsruhe passt nicht mehr zu jedem Alltag; gegenseitige Rücksicht reicht aus.' }, { name: 'Boris', city: 'Ulm', yes: true, text: 'Kleine Kinder und ältere Bewohner brauchen eine verlässliche Pause. Zwei ruhige Stunden lassen sich gut planen.' }, { name: 'Amina', city: 'Zürich', yes: true, text: 'Klare Zeiten verhindern lange Diskussionen darüber, was zu laut ist. Bei uns funktioniert eine Regel von 13 bis 15 Uhr gut.' }, { name: 'Lars', city: 'Rostock', yes: false, text: 'Ich arbeite nachts und erledige Haushalt am Nachmittag. Wichtig sind angemessene Geräusche, nicht eine starre Uhrzeit.' }, { name: 'Chiara', city: 'Bozen', yes: false, text: 'Für normale Alltagsgeräusche sollte niemand bestraft werden. Feste Ruhezeiten führen schnell zu Beschwerden wegen Kleinigkeiten.' }, { name: 'Mehmet', city: 'Hannover', yes: true, text: 'Wer bohren oder Möbel bewegen möchte, hat genug andere Stunden. Eine gemeinsame Pause verbessert das Zusammenleben.' }, { name: 'Silke', city: 'Potsdam', yes: true, text: 'Eine kurze Mittagsruhe ist fair, wenn Ausnahmen für notwendige Arbeiten möglich sind und alle die Regel kennen.' },
    ] },
    rules: { title: 'Dachterrasse Lindenhof · Nutzungsregeln', passage: `ZUGANG\nDie Dachterrasse steht Bewohnerinnen und Bewohnern täglich von 8 bis 21 Uhr offen. Gäste sind willkommen, müssen aber von einer im Haus wohnenden Person begleitet werden. Der Zugangscode darf nicht weitergegeben werden.\n\nRESERVIERUNG\nDer große Tisch kann für Gruppen ab sechs Personen bis zu sieben Tage im Voraus reserviert werden. Eine Reservierung gilt höchstens drei Stunden. Ohne Buchung dürfen freie Plätze von allen genutzt werden.\n\nRÜCKSICHT\nMusik ist nur über kleine Geräte und in Gesprächslautstärke erlaubt. Grillen sowie offenes Feuer sind aus Sicherheitsgründen verboten. Ab 19 Uhr sollen Gruppen besonders auf die Nachbarschaft achten.\n\nORDNUNG\nAbfälle werden getrennt in die Behälter im Treppenhaus gebracht. Möbel bleiben auf der Terrasse. Schäden oder verschüttete Flüssigkeiten sind dem Hausdienst noch am selben Tag zu melden.`, items: [
      { text: 'Was gilt für Gäste?', correct: 'Sie müssen von einer Bewohnerin oder einem Bewohner begleitet werden.', distractors: ['Sie brauchen einen eigenen Zugangscode.', 'Sie dürfen nur am Wochenende kommen.'] }, { text: 'Wie lange darf der große Tisch reserviert werden?', correct: 'Höchstens drei Stunden.', distractors: ['Bis zu sieben Stunden.', 'Den ganzen Tag.'] }, { text: 'Was ist auf der Terrasse verboten?', correct: 'Grillen.', distractors: ['Leise Musik.', 'Gespräche nach 19 Uhr.'] }, { text: 'Was soll bei einem Schaden geschehen?', correct: 'Der Hausdienst wird am gleichen Tag informiert.', distractors: ['Die Möbel werden ins Treppenhaus gebracht.', 'Die Reparatur wird selbst bezahlt.'] },
    ] },
    writing: { personal: { label: 'Persönliche E-Mail', stimulus: 'Sie sind in ein besonderes Wohnprojekt gezogen. Schreiben Sie Ihrer Freundin Ana.', points: ['Beschreiben Sie das Zusammenleben.', 'Erzählen Sie von einer Begegnung mit Nachbarn.', 'Laden Sie Ana zu einem Besuch ein.'] }, forum: { label: 'Online-Forum: Wohnen', quote: 'Jedes Mehrfamilienhaus sollte feste Ruhezeiten am Nachmittag haben.', prompt: 'Schreiben Sie Ihre Meinung. Begründen Sie sie und nennen Sie ein Beispiel aus Ihrem Wohnalltag.' }, formal: { label: 'E-Mail an die Hausverwaltung', stimulus: 'Sie haben den Gemeinschaftsraum reserviert, aber das digitale Schloss funktioniert nicht.', prompt: 'Beschreiben Sie das Problem, nennen Sie Ihren Reservierungstermin und bitten Sie höflich um eine schnelle Lösung.' } },
    speaking: { planning: { situation: 'Sie möchten mit der Hausgemeinschaft einen Kennenlerntag organisieren. Planen Sie gemeinsam und einigen Sie sich.', points: 'Planen Sie: Termin? · Programm? · Essen? · Aufgaben verteilen?', roles: 'Rolle A: Sie möchten einen Brunch im Hof. · Rolle B: Sie bevorzugen einen Spieleabend im Gemeinschaftsraum.' }, cards: ['Mit mehreren Generationen zusammenwohnen?', 'Haustiere in Mietwohnungen?'], followUp: ['Welche Regel ist für gutes Zusammenleben wichtig?', 'Welche Verantwortung haben Tierhalter?'] },
  },
  {
    set: 4, topicKey: 'citizen-science-bird-count', topicLabel: 'Bürgerforschung und Vogelbeobachtung',
    personal: { subject: 'Betreff: Mein erstes Wochenende als Vogelzähler', passage: `Liebe Paula,\n\nam Wochenende habe ich bei der jährlichen Vogelzählung am Bodensee mitgemacht. Ich hatte mich angemeldet, weil man dafür keine Fachausbildung braucht. Vor dem Start bekamen alle neuen Helfer eine kurze Einführung und eine App mit Bildern und Vogelstimmen.\n\nMeine Gruppe sollte einen Abschnitt am Ufer beobachten. Zuerst sahen wir fast nur Enten, später entdeckte eine Teilnehmerin einen seltenen Nachtreiher. Wir durften ihn nicht näher verfolgen, sondern mussten Entfernung und Standort genau notieren. Ein Biologe prüfte unsere Meldung noch am selben Abend.\n\nAm Samstag regnete es stark. Die Zählung wurde trotzdem nicht abgesagt, denn gerade bei schlechtem Wetter ruhen viele Zugvögel am See. Wir bekamen wasserdichte Unterlagen, aber meine Schuhe waren nach zwei Stunden völlig nass. Beim nächsten Mal nehme ich auf jeden Fall Gummistiefel mit.\n\nÜberraschend fand ich, wie still die Arbeit ist. Niemand darf Musik hören oder laut telefonieren. In den Pausen erzählten die erfahrenen Freiwilligen dafür viele spannende Geschichten. Die Daten werden später mit den Ergebnissen der letzten zwanzig Jahre verglichen und helfen, Veränderungen der Rastplätze zu erkennen.\n\nIm Frühjahr gibt es eine Zählung in deiner Nähe. Wenn du mitkommen willst, melde dich früh an; die kleinen Gruppen sind schnell voll. Ein Fernglas kannst du kostenlos ausleihen.\n\nHerzliche Grüße\nMilan`, items: [
      { text: 'Neue Helfer mussten bereits eine biologische Ausbildung haben.', answer: false }, { text: 'Ein Fachmann kontrollierte die Meldung des seltenen Vogels.', answer: true }, { text: 'Wegen des Regens fiel die Beobachtung am Samstag aus.', answer: false }, { text: 'Milan möchte beim nächsten Mal andere Schuhe tragen.', answer: true }, { text: 'Während der Beobachtung darf man laut Musik hören.', answer: false }, { text: 'Für die Teilnahme kann Paula ein Fernglas ausleihen.', answer: true },
    ] },
    press: [
      { title: 'MEHR NACHT, WENIGER LICHT', passage: `Die Gemeinde Sternberg schaltet seit April zwischen ein und vier Uhr jede zweite Straßenlaterne aus. An Kreuzungen und Haltestellen bleibt es unverändert hell. Ziel des Versuchs ist nicht nur ein geringerer Stromverbrauch: Fachleute wollen untersuchen, ob weniger Licht nachtaktiven Insekten hilft. Bewohner konnten gefährliche oder zu dunkle Stellen über eine Internetkarte melden. Daraufhin wurden an drei Wegen Lampen wieder eingeschaltet. Erste Messungen zeigen einen deutlich niedrigeren Energieverbrauch; zuverlässige Ergebnisse zur Tierwelt werden erst nach einem Jahr erwartet. Die Polizei meldet bisher keine Zunahme von Unfällen.`, items: [
        { text: 'Warum werden Lampen ausgeschaltet?', correct: 'Die Gemeinde möchte Energie sparen und Tiere schützen.', distractors: ['Alle Straßen werden erneuert.', 'Die Polizei verlangt dunklere Wege.'] }, { text: 'Wie konnten Bewohner Probleme melden?', correct: 'Über eine Karte im Internet.', distractors: ['Nur persönlich im Rathaus.', 'Durch einen Anruf bei der Polizei.'] }, { text: 'Welche Aussage ist schon möglich?', correct: 'Der Stromverbrauch ist gesunken.', distractors: ['Es gibt mehr Unfälle.', 'Alle Insektenarten haben zugenommen.'] },
      ] },
      { title: 'FORSCHUNG AUF DEM SCHULHOF', passage: `An zwölf Schulen in Thüringen messen Jugendliche täglich Temperatur und Bodenfeuchtigkeit. Die kleinen Stationen stehen nicht nur auf Rasenflächen, sondern auch neben Mauern und auf asphaltierten Höfen. Eine Universität stellt die Geräte bereit und wertet die Daten aus. Im Unterricht vergleichen die Klassen, wie stark verschiedene Flächen sich aufheizen. Eine Schule pflanzte nach den ersten Ergebnissen zusätzliche Bäume, eine andere richtete Schattenplätze mit Segeln ein. Projektleiterin Dr. Nguyen warnt jedoch vor schnellen allgemeinen Schlüssen: Die Messreihen seien noch kurz und lokale Bedingungen sehr unterschiedlich. Im kommenden Jahr sollen deshalb weitere Schulen teilnehmen.`, items: [
        { text: 'Was untersuchen die Jugendlichen?', correct: 'Unterschiede zwischen verschiedenen Flächen.', distractors: ['Die Qualität des Unterrichts.', 'Den Wasserverbrauch der Haushalte.'] }, { text: 'Was geschah an einer Schule?', correct: 'Es wurden zusätzliche Bäume gepflanzt.', distractors: ['Der Schulhof wurde geschlossen.', 'Die Messgeräte wurden verkauft.'] }, { text: 'Warum bleibt Dr. Nguyen vorsichtig?', correct: 'Die bisherigen Daten reichen noch nicht aus.', distractors: ['Die Geräte messen ungenau.', 'Die Schulen arbeiten nicht zusammen.'] },
      ] },
    ],
    matching: { title: 'Natur beobachten und mitforschen', example: 'Eine Familie möchte nachts Sterne kennenlernen. → J', ads: commonAds([
      ['Bäume in der Stadt erfassen', 'Mit dem Smartphone Art und Stammumfang dokumentieren. Einführung am Samstag; Teilnahme ab 16 Jahren.'], ['Wasserproben am Bach', 'Monatliche Messung mit einem festen Team. Chemische Vorkenntnisse sind nicht nötig, regelmäßige Teilnahme schon.'], ['Insekten auf dem Balkon', 'Online-Projekt für zu Hause. Eine Pflanze auswählen und Besucher zwölf Wochen lang einmal pro Woche melden.'], ['Vogelstimmen für Anfänger', 'Morgenspaziergang mit Hörübungen. Ferngläser können ausgeliehen werden; keine wissenschaftliche Datenerhebung.'], ['Wolken melden', 'Kurze Beobachtungen überall möglich. App erklärt Wolkentypen; einzelne Meldungen genügen.'], ['Froschnacht', 'Geführte Abendtour im Feuchtgebiet. Wetterfeste Kleidung nötig, Kinder ab zehn Jahren willkommen.'], ['Stadtklima messen', 'Sensoren drei Monate am eigenen Fenster befestigen. Installation erfolgt durch das Projektteam.'], ['Küstenfunde bestimmen', 'Workshop für Personen, die Muscheln und Steine bereits gesammelt haben. Fundstücke bitte mitbringen.'], ['Naturfotos archivieren', 'Freiwillige prüfen Bilddaten am Computer. Gute Artenkenntnis und zwei feste Nachmittage pro Monat erforderlich.'], ['Sterne über der Stadt', 'Familienabend in der Sternwarte mit Teleskopen und kurzer Einführung. Nur bei klarem Himmel.'],
    ]), items: [
      { stem: 'Luca möchte gelegentlich von verschiedenen Orten aus Beobachtungen über sein Handy senden.', answer: 'E' }, { stem: 'Frau Stein sucht ein langfristiges Projekt, bei dem ein Gerät an ihrer Wohnung angebracht wird.', answer: 'G' }, { stem: 'Ben ist zwölf und möchte mit seinen Eltern abends Tiere in einem Feuchtgebiet sehen.', answer: 'F' }, { stem: 'Aylin möchte Vogelarten am Gesang erkennen, aber keine Forschungsdaten sammeln.', answer: 'D' }, { stem: 'Marek hat keine Chemiekenntnisse, kann aber jeden Monat an einem Bachprojekt teilnehmen.', answer: 'B' }, { stem: 'Jo besitzt keinen Balkon und sucht ein wöchentliches Insektenprojekt in einem Park.', answer: '0' }, { stem: 'Sara kennt viele Arten und möchte regelmäßig am Computer Bildmaterial kontrollieren.', answer: 'I' },
    ] },
    debate: { question: 'Private Gärten nachts dunkel lassen?', opinions: [
      { name: 'Daria', city: 'Jena', yes: true, text: 'Viele Tiere brauchen Dunkelheit. Bewegungsmelder reichen für den Weg, deshalb muss dekoratives Licht nicht die ganze Nacht brennen.' }, { name: 'Thomas', city: 'Linz', yes: false, text: 'Ein gut beleuchteter Eingang gibt mir Sicherheit. Eigentümer sollten selbst entscheiden, solange Nachbarn nicht gestört werden.' }, { name: 'Nadine', city: 'Freiburg', yes: true, text: 'Seit wir die Lampen ausschalten, sehen wir wieder mehr Sterne. Der Garten ist nachts ohnehin kaum in Gebrauch.' }, { name: 'Aron', city: 'Kassel', yes: false, text: 'Für ältere Menschen können dunkle Wege gefährlich sein. Eine pauschale Regel berücksichtigt solche Bedürfnisse nicht.' }, { name: 'Vera', city: 'Bern', yes: true, text: 'Man kann sichere Wege gezielt und warm beleuchten. Dauerhaft helle Fassaden verschwenden Energie und schaden Insekten.' }, { name: 'Jan', city: 'Dortmund', yes: true, text: 'In dicht bebauten Gebieten wirkt jede einzelne Lampe auf viele Wohnungen. Gemeinsame Ruhezeiten für Licht sind sinnvoll.' }, { name: 'Olga', city: 'Salzburg', yes: false, text: 'Empfehlungen finde ich gut, ein Verbot aber nicht. Moderne Lampen können nach unten leuchten und trotzdem eingeschaltet bleiben.' },
    ] },
    rules: { title: 'Beobachtungsstation Seeblick · Hinweise', passage: `ANMELDUNG\nEinzelbesucher können die Station ohne Anmeldung von Mittwoch bis Sonntag zwischen 9 und 17 Uhr nutzen. Gruppen ab acht Personen reservieren mindestens fünf Werktage vorher.\n\nAUSRÜSTUNG\nFerngläser werden gegen Hinterlegung eines Ausweises kostenlos ausgegeben. Spektive dürfen nur an den festen Plätzen verwendet werden. Eigene Stative müssen auf den markierten Flächen stehen.\n\nVERHALTEN\nBitte sprechen Sie leise und bleiben Sie auf den Wegen. Tiere dürfen weder gefüttert noch mit Tonaufnahmen angelockt werden. Hunde warten außerhalb der Beobachtungshütte, auch wenn sie angeleint sind.\n\nDATEN\nBeobachtungen können freiwillig am Ausgang gemeldet werden. Geben Sie Uhrzeit, Ort und Anzahl an. Fotos sind hilfreich, aber nicht erforderlich. Seltene Arten meldet das Personal nach einer Prüfung an die Fachstelle.`, items: [
      { text: 'Wann müssen größere Gruppen reservieren?', correct: 'Mindestens fünf Werktage vorher.', distractors: ['Erst beim Betreten der Station.', 'Nur an Wochenenden.'] }, { text: 'Was braucht man für ein geliehenes Fernglas?', correct: 'Einen Ausweis als Pfand.', distractors: ['Eine Kursbescheinigung.', 'Eine zusätzliche Versicherung.'] }, { text: 'Was ist in der Hütte nicht erlaubt?', correct: 'Einen Hund mitzubringen.', distractors: ['Leise zu sprechen.', 'Ein eigenes Stativ zu nutzen.'] }, { text: 'Welche Angabe ist bei einer Meldung wichtig?', correct: 'Die Zahl der beobachteten Tiere.', distractors: ['Ein professionelles Foto.', 'Der Name einer Universität.'] },
    ] },
    writing: { personal: { label: 'Persönliche E-Mail', stimulus: 'Sie haben an einem Forschungsprojekt für Freiwillige teilgenommen. Schreiben Sie Ihrem Freund Leo.', points: ['Beschreiben Sie Ihre Aufgabe.', 'Berichten Sie von einer Schwierigkeit.', 'Schlagen Sie eine gemeinsame Teilnahme vor.'] }, forum: { label: 'Online-Forum: Umwelt', quote: 'Private Außenbeleuchtung sollte nach Mitternacht ausgeschaltet werden.', prompt: 'Schreiben Sie Ihre Meinung. Begründen Sie sie und nennen Sie ein Beispiel.' }, formal: { label: 'E-Mail an die Projektleitung', stimulus: 'Sie haben ein Messgerät ausgeliehen und können es nicht zum vereinbarten Termin zurückbringen.', prompt: 'Entschuldigen Sie sich, erklären Sie kurz den Grund und schlagen Sie einen neuen Rückgabetermin vor.' } },
    speaking: { planning: { situation: 'Sie möchten für Ihren Kurs einen Naturbeobachtungstag organisieren. Planen Sie gemeinsam.', points: 'Planen Sie: Ort? · Termin und Wetter? · Ausrüstung? · Dokumentation?', roles: 'Rolle A: Sie möchten morgens an einen See fahren. · Rolle B: Sie bevorzugen eine Beobachtung am Abend in der Stadt.' }, cards: ['Bürgerinnen und Bürger in Forschung einbeziehen?', 'Nächtliche Beleuchtung reduzieren?'], followUp: ['Welche Aufgaben eignen sich für Freiwillige?', 'Wo ist Beleuchtung weiterhin notwendig?'] },
  },
];

const compactSources: GoetheB1OriginalSource[] = [
  ['student-mediation', 'Konfliktlotsen und Kommunikation', 'Konfliktlotsin bei einem Jugendturnier', 'Digitale Sprechstunden an Hochschulen?', 'Mediationszentrum West', 'Sollten Schulen Streithelfer ausbilden?', 'einen Tag der offenen Tür im Beratungszentrum', 'Noten für Teamarbeit?', 'Anonyme Rückmeldungen am Arbeitsplatz?'],
  ['public-observatory', 'Sternwarte und Wissenschaftskommunikation', 'Nachtschicht in einer öffentlichen Sternwarte', 'Wissenschaft in einfacher Sprache?', 'Sternwarte Höhenblick', 'Sollten Städte Werbung mit hellem Licht begrenzen?', 'eine öffentliche Beobachtungsnacht', 'Weltraumforschung finanzieren?', 'Wissenschaftliche Informationen in sozialen Medien?'],
  ['volunteer-rescue', 'Freiwilliger Rettungsdienst und Sicherheit', 'Übungswochenende bei einer Rettungsstaffel', 'Pflichtkurs in Erster Hilfe?', 'Ausbildungszentrum Bergtal', 'Sollten Freiwillige zusätzliche freie Tage bekommen?', 'einen Sicherheitstag für Wandergruppen', 'Allein in abgelegene Gebiete reisen?', 'Warn-Apps auf jedem Handy?'],
  ['accessible-cinema', 'Barrierefreies Kino und Teilhabe', 'Premiere mit Audiodeskription und Untertiteln', 'Kulturelle Veranstaltungen barrierefrei planen?', 'Kulturhaus Lichtblick', 'Sollten alle Kinos regelmäßig barrierefreie Vorstellungen anbieten?', 'einen inklusiven Filmabend', 'Untertitel auch bei deutschsprachigen Filmen?', 'Begleitpersonen kostenlos einlassen?'],
  ['participatory-budgeting', 'Bürgerhaushalt und lokale Entscheidungen', 'Erste Sitzung eines Bürgerbudgets', 'Kommunale Daten öffentlich erklären?', 'Rathausforum Mitte', 'Sollten Einwohner direkt über einen Teil des Stadtbudgets entscheiden?', 'eine Informationsrunde zum Bürgerbudget', 'Abstimmungen online durchführen?', 'Jugendliche ab 16 kommunal wählen lassen?'],
  ['volunteer-fire-service', 'Freiwillige Feuerwehr und Vorsorge', 'Erster Bereitschaftstag bei der freiwilligen Feuerwehr', 'Warnsysteme im Wohnviertel?', 'Feuerwehrakademie Süd', 'Sollte ein Brandschutzkurs für alle Haushalte kostenlos sein?', 'einen Vorsorgetag im Stadtteil', 'Pflichtübungen für Notfälle?', 'Private Drohnen bei Einsätzen verbieten?'],
  ].map((row, rowIndex) => {
    const [topicKey, topicLabel, experience, pressQuestion, rulesTitle, debateQuestion, planning, cardA, cardB] = row;
    const set = rowIndex + 5;
    const people = ['Alina', 'Burak', 'Clara', 'Diego', 'Elif', 'Felix', 'Grace'];
    const cities = ['Aachen', 'Bremen', 'Chemnitz', 'Darmstadt', 'Erlangen', 'Fulda', 'Genf'];
    const yesPattern = rowIndex % 2 === 0 ? [true, false, false, true, true, false, true] : [false, true, true, false, true, false, false];
    const volunteerExamples = [
      'Gesprächsräume vorbereiten, Infomaterial ordnen und Feedbackbögen erfassen',
      'Besuchergruppen empfangen, Sternkarten sortieren und Vortragsräume vorbereiten',
      'Ausrüstungslisten prüfen, Übungsstationen markieren und Anmeldungen koordinieren',
      'Untertiteldateien prüfen, Plätze erklären und Begleitpersonen empfangen',
      'Vorschläge erfassen, Stimmzettel ausgeben und verständliche Übersichten erstellen',
      'Rauchmelderlisten aktualisieren, Übungswege markieren und Informationsstände betreuen',
    ][rowIndex];
    const groupMinimum = [6, 8, 5, 10, 12, 7][rowIndex];
    const reservationDays = [3, 5, 2, 7, 4, 6][rowIndex];
    const lateMinutes = [5, 15, 10, 20, 10, 5][rowIndex];
    const reportPoint = ['Beratungsbüro', 'Kuppelaufsicht', 'Materialausgabe', 'Infotheke', 'Bürgerbüro', 'Einsatzzentrale'][rowIndex];
    return {
      set, topicKey, topicLabel,
      personal: {
        subject: `Betreff: ${experience}`,
        passage: `Liebe Kim,\n\nletztes Wochenende habe ich zum ersten Mal bei dem Projekt „${topicLabel}“ mitgearbeitet. Vorher hatte ich nur eine kurze Online-Einführung besucht und rechnete deshalb mit einer einfachen Beobachtungsaufgabe. Vor Ort erklärte mir die Koordinatorin jedoch, dass eine andere Person krank geworden war. Ich übernahm zusätzlich den Empfang und musste neue Teilnehmende über den Ablauf informieren.\n\nAm Anfang war ich unsicher, weil mehrere Gäste gleichzeitig Fragen stellten. Eine erfahrene Kollegin gab mir eine Checkliste, mit der ich nichts Wichtiges vergaß. Nach der ersten Stunde funktionierte alles deutlich besser. Besonders interessant war, dass Menschen mit ganz unterschiedlichen Berufen zusammenarbeiteten und ihre Erfahrungen teilten.\n\nAm Nachmittag kam es zu einer unerwarteten Änderung: Ein vorgesehener Raum konnte wegen eines technischen Problems nicht genutzt werden. Wir verlegten das Programm in einen kleineren Saal und teilten die Gruppe in zwei Teile. Dadurch begann der zweite Abschnitt zwanzig Minuten später, musste aber nicht abgesagt werden.\n\nZum Abschluss werteten wir gemeinsam aus, was gut gelaufen war. Meine Idee für deutlichere Hinweisschilder soll beim nächsten Termin ausprobiert werden. Die Leitung fragte mich sogar, ob ich dann wieder den Empfang übernehmen möchte. Ich habe zugesagt, will vorher aber noch an einer zusätzlichen Schulung teilnehmen.\n\nHättest du im November Zeit mitzukommen? Die Teilnahme kostet nichts, doch man muss sich spätestens eine Woche vorher anmelden.\n\nViele Grüße\nRobin`,
        items: [
          { text: 'Robin hatte vor dem Wochenende bereits eine lange Ausbildung abgeschlossen.', answer: false }, { text: 'Wegen einer erkrankten Person bekam Robin eine zusätzliche Aufgabe.', answer: true }, { text: 'Eine Checkliste half Robin bei der Arbeit.', answer: true }, { text: 'Nach dem Raumproblem wurde die Veranstaltung vollständig abgesagt.', answer: false }, { text: 'Robins Vorschlag soll bei einem späteren Termin getestet werden.', answer: true }, { text: 'Kim kann ohne Anmeldung am nächsten Termin teilnehmen.', answer: false },
        ],
      },
      press: [
        { title: pressQuestion.toUpperCase(), passage: `Ein Pilotprojekt in Regensburg erprobt neue Informationsangebote zum Thema ${topicLabel}. Statt langer Vorträge gibt es kurze Stationen, an denen Besucher konkrete Fragen stellen und kleine Aufgaben ausprobieren können. Die Idee entstand nach einer Umfrage: Viele Interessierte fanden bisherige Informationsabende zu theoretisch. Seit der Umstellung kommen mehr Menschen unter 30 Jahren. Fachleute bleiben während der gesamten Öffnungszeit erreichbar, greifen aber nur ein, wenn Beratung nötig ist. Das Projekt wird zunächst sechs Monate finanziert. Danach entscheidet die Stadt anhand der Besucherzahlen und anonymer Rückmeldungen über eine Fortsetzung.`, items: [
          { text: 'Warum wurde das Angebot verändert?', correct: 'Frühere Veranstaltungen waren vielen zu theoretisch.', distractors: ['Es gab keine Fachleute.', 'Die Räume waren zu klein.'] }, { text: 'Was hat sich bereits gezeigt?', correct: 'Mehr jüngere Menschen nehmen teil.', distractors: ['Die Öffnungszeit wurde verkürzt.', 'Alle Aufgaben werden online gelöst.'] }, { text: 'Wovon hängt die Fortsetzung ab?', correct: 'Von Nutzung und Rückmeldungen.', distractors: ['Von einer Prüfung der Teilnehmenden.', 'Von Spenden einzelner Firmen.'] },
        ] },
        { title: `FLEXIBEL ENGAGIERT: ${topicLabel.toUpperCase()}`, passage: `Eine Initiative in Oldenburg vermittelt kurze freiwillige Aufgaben rund um ${topicLabel}, die höchstens zwei Stunden pro Monat dauern. Damit reagiert sie auf Menschen, die sich engagieren möchten, aber keinen regelmäßigen freien Abend haben. Organisationen beschreiben ihre Aufgaben sehr genau und nennen vorab Ort, Dauer und notwendige Kenntnisse. Wer eine Aufgabe übernimmt, verpflichtet sich nur für diesen Termin. Besonders gefragt sind ${volunteerExamples}. Kritiker befürchten, dass dadurch keine langfristigen Beziehungen entstehen. Die Koordinatorin sieht das anders: Fast ein Drittel der Teilnehmenden entscheide sich später für ein regelmäßiges Engagement in diesem Bereich.`, items: [
          { text: 'An wen richtet sich das Angebot besonders?', correct: 'An Menschen mit wenig planbarer Zeit.', distractors: ['Nur an bereits erfahrene Freiwillige.', 'An Personen auf Arbeitssuche.'] }, { text: 'Welche Information erhalten Freiwillige vorher?', correct: 'Wie lange die einzelne Aufgabe dauert.', distractors: ['Ob daraus eine feste Stelle wird.', 'Wie hoch die Bezahlung ist.'] }, { text: 'Was beobachtet die Koordinatorin?', correct: 'Ein Teil engagiert sich später regelmäßig.', distractors: ['Fast alle hören nach einem Termin auf.', 'Organisationen bieten weniger Aufgaben an.'] },
        ] },
      ],
      matching: {
        title: `Angebote zu ${topicLabel}`,
        example: 'Eine Person möchte zuerst an einem unverbindlichen Informationsabend teilnehmen. → A',
        ads: commonAds([
          ['Informationsabend', `Überblick zu ${topicLabel}, Aufgaben und Voraussetzungen. Fragen sind willkommen, Anmeldung bis Donnerstag.`], ['Grundkurs am Samstag', 'Praxisorientierter Einstieg ohne Vorkenntnisse. Arbeitsmaterial wird gestellt; Mindestalter 18 Jahre.'], ['Online-Austausch', 'Monatliches Treffen für bereits Aktive. Fälle besprechen und Erfahrungen teilen, keine Einführung.'], ['Beratung für Teams', 'Individueller Termin für Organisationen, die ihre Abläufe verbessern möchten.'], ['Kompaktkurs am Morgen', 'Vier Termine werktags von 8 bis 10 Uhr. Teilnahmebescheinigung nach vollständigem Besuch.'], ['Wochenendprojekt', 'Einmalige Mitarbeit von Freitagabend bis Sonntag. Unterkunft vorhanden, Anreise selbst organisieren.'], ['Digitale Einführung', 'Selbstlernkurs mit Videos und kurzen Tests. Freie Zeiteinteilung, Zugang für sechs Wochen.'], ['Training für Fortgeschrittene', 'Voraussetzung: abgeschlossener Grundkurs und mindestens sechs Monate praktische Erfahrung.'], ['Familienangebot', 'Gemeinsam lernen und ausprobieren. Geeignet für Erwachsene mit Kindern von acht bis zwölf Jahren.'], ['Mentoring', 'Dreimonatige persönliche Begleitung für neue Koordinatorinnen und Koordinatoren.'],
        ]),
        items: [
          { stem: 'Nina hat keine Vorkenntnisse und möchte an einem einzigen Samstag praktisch beginnen.', answer: 'B' }, { stem: 'Omar arbeitet unregelmäßig und möchte die Grundlagen selbstständig online lernen.', answer: 'G' }, { stem: 'Tina ist seit einem Jahr aktiv und sucht Austausch über schwierige Situationen.', answer: 'C' }, { stem: 'Luis möchte mit seiner zehnjährigen Tochter gemeinsam teilnehmen.', answer: 'I' }, { stem: 'Frau Beck leitet bald ein Team und wünscht über mehrere Monate persönliche Unterstützung.', answer: 'J' }, { stem: 'Alex ist 16 und sucht einen praktischen Grundkurs am Samstag.', answer: '0' }, { stem: 'Eine Organisation möchte ihre internen Abläufe mit externer Hilfe prüfen.', answer: 'D' },
        ],
      },
      debate: {
        question: debateQuestion,
        opinions: people.map((name, index) => ({ name, city: cities[(index + rowIndex) % cities.length], yes: yesPattern[index], text: yesPattern[index]
          ? `Ich halte den Vorschlag für sinnvoll. Im Bereich ${topicLabel} schaffen klare gemeinsame Angebote mehr Sicherheit und ermöglichen auch Menschen ohne Vorerfahrung eine Teilnahme.`
          : `Ich sehe den Vorschlag kritisch. Eine allgemeine Regel berücksichtigt unterschiedliche Situationen zu wenig; freiwillige Lösungen und gezielte Beratung wären flexibler.` })),
      },
      rules: {
        title: `${rulesTitle} · Benutzungsordnung`,
        passage: `ANMELDUNG\nDer Besuch im Bereich ${topicLabel} ist dienstags bis samstags möglich. Einzelpersonen melden sich am Empfang; Gruppen ab ${groupMinimum} Personen reservieren mindestens ${reservationDays} Werktage vorher schriftlich.\n\nTEILNAHME\nEinführungen beginnen pünktlich zur angegebenen Uhrzeit. Wer mehr als ${lateMinutes} Minuten zu spät kommt, nimmt erst am nächsten Termin teil. Minderjährige benötigen eine erwachsene Begleitperson.\n\nAUSRÜSTUNG\nNotwendiges Material wird vor Ort ausgegeben und nach der Nutzung vollständig zurückgebracht. Eigene Geräte dürfen nur nach Zustimmung der Leitung verwendet werden. Getränke bleiben in den gekennzeichneten Pausenbereichen.\n\nSICHERHEIT\nDen Anweisungen des Personals ist jederzeit zu folgen. Gesperrte Bereiche dürfen nicht betreten werden. Schäden, Störungen oder verlorene Gegenstände sind sofort bei der Stelle „${reportPoint}“ zu melden.`,
        items: [
          { text: `Wann muss eine Gruppe ab ${groupMinimum} Personen reservieren?`, correct: `Mindestens ${reservationDays} Werktage vorher.`, distractors: ['Erst bei ihrer Ankunft.', `${lateMinutes} Minuten vor Beginn.`] }, { text: `Was geschieht bei mehr als ${lateMinutes} Minuten Verspätung?`, correct: 'Man besucht einen späteren Termin.', distractors: ['Man zahlt eine zusätzliche Gebühr.', 'Man nimmt ohne Einführung teil.'] }, { text: 'Wann sind eigene Geräte erlaubt?', correct: 'Wenn die Leitung zugestimmt hat.', distractors: ['Nur bei Gruppenbesuchen.', 'Immer außerhalb der Pausen.'] }, { text: 'Wo meldet man eine Störung?', correct: `Bei der Stelle „${reportPoint}“.`, distractors: ['Nur schriftlich bei der Stadt.', 'Im nächsten Einführungskurs.'] },
        ],
      },
      writing: {
        personal: { label: 'Persönliche E-Mail', stimulus: `Sie haben erstmals bei einem Projekt zum Thema ${topicLabel} mitgearbeitet. Schreiben Sie Ihrer Freundin Zoe.`, points: ['Beschreiben Sie Ihre Aufgabe.', 'Berichten Sie von einer unerwarteten Änderung.', 'Laden Sie Zoe zum nächsten Termin ein.'] },
        forum: { label: 'Online-Forum: Gesellschaft', quote: debateQuestion, prompt: 'Schreiben Sie Ihre Meinung dazu. Begründen Sie sie und nennen Sie ein konkretes Beispiel.' },
        formal: { label: `E-Mail an ${rulesTitle}`, stimulus: `Sie haben sich bei „${rulesTitle}“ zu einer Einführung über ${topicLabel} angemeldet, können den Termin aber nicht wahrnehmen.`, prompt: 'Entschuldigen Sie sich höflich, nennen Sie kurz den Grund und bitten Sie um einen neuen Termin.' },
      },
      speaking: {
        planning: { situation: `Sie möchten gemeinsam ${planning} organisieren. Machen Sie Vorschläge, reagieren Sie und einigen Sie sich.`, points: 'Planen Sie: Termin und Ort? · Zielgruppe? · Programm? · Aufgaben verteilen?', roles: 'Rolle A: Sie bevorzugen einen kurzen Termin am Vormittag. · Rolle B: Sie wünschen ein ausführliches Programm am frühen Abend.' },
        cards: [cardA, cardB], followUp: ['Welche Personengruppen wären besonders betroffen?', 'Welche praktische Alternative gibt es?'],
      },
    };
  });

GOETHE_B1_ORIGINAL_SOURCES.push(...compactSources);

export const GOETHE_B1_ORIGINAL_SETS = Object.fromEntries(
  GOETHE_B1_ORIGINAL_SOURCES.map(source => [source.set, buildOriginalSet(source)]),
) as Record<number, MockExam>;

export const goetheB1Set2 = GOETHE_B1_ORIGINAL_SETS[2];
export const goetheB1Set3 = GOETHE_B1_ORIGINAL_SETS[3];
export const goetheB1Set4 = GOETHE_B1_ORIGINAL_SETS[4];
export const goetheB1Set5 = GOETHE_B1_ORIGINAL_SETS[5];
export const goetheB1Set6 = GOETHE_B1_ORIGINAL_SETS[6];
export const goetheB1Set7 = GOETHE_B1_ORIGINAL_SETS[7];
export const goetheB1Set8 = GOETHE_B1_ORIGINAL_SETS[8];
export const goetheB1Set9 = GOETHE_B1_ORIGINAL_SETS[9];
export const goetheB1Set10 = GOETHE_B1_ORIGINAL_SETS[10];
