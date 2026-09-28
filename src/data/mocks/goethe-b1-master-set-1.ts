import type { MCQQuestion, MockExam, MockSection } from './types';

type B1PartContract = {
  part: number;
  family: string;
  items: number;
  minutes: number;
};

export const GOETHE_B1_MASTER_1_BLUEPRINT = {
  schemaVersion: 1,
  id: 'b1-1',
  status: 'AUDIO_BLOCKED',
  authorship: {
    owner: 'WeLearn',
    original: true,
    officialSourcesUsedForArchitectureOnly: true,
  },
  level: 'B1',
  audience: 'adults-16-plus',
  modules: {
    reading: {
      minutes: 65,
      itemCount: 30,
      parts: [
        { part: 1, family: 'personal-correspondence-true-false', items: 6, minutes: 10 },
        { part: 2, family: 'two-press-texts-three-option', items: 6, minutes: 20 },
        { part: 3, family: 'situations-to-adverts-with-zero-option', items: 7, minutes: 10 },
        { part: 4, family: 'opinions-yes-no', items: 7, minutes: 15 },
        { part: 5, family: 'rules-three-option', items: 4, minutes: 10 },
      ] satisfies B1PartContract[],
    },
    listening: {
      minutesApprox: 40,
      itemCount: 30,
      status: 'AUDIO_BLOCKED',
      scriptsReady: false,
      audioReady: false,
      parts: [
        { part: 1, family: 'five-short-texts-two-items-each', items: 10, plays: 2 },
        { part: 2, family: 'one-public-monologue', items: 5, plays: 1 },
        { part: 3, family: 'one-conversation-true-false', items: 7, plays: 1 },
        { part: 4, family: 'radio-discussion-speaker-attribution', items: 8, plays: 2 },
      ],
    },
    writing: {
      minutes: 60,
      tasks: [
        { part: 1, family: 'personal-email', targetWords: 80, minutes: 20 },
        { part: 2, family: 'forum-opinion', targetWords: 80, minutes: 25 },
        { part: 3, family: 'formal-short-email', targetWords: 40, minutes: 15 },
      ],
    },
    speaking: {
      pairMinutes: 15,
      preparationMinutes: 15,
      parts: [
        { part: 1, family: 'joint-planning', minutes: 3 },
        { part: 2, family: 'five-point-presentation-choice', minutes: 4 },
        { part: 3, family: 'feedback-question-response', minutes: 2 },
      ],
    },
  },
  scoring: {
    modular: true,
    maximumPerModule: 100,
    passPerModule: 60,
    objectiveRawItemsPerModule: 30,
    objectiveConversion: 'raw × 3.33, rounded according to the official table',
  },
  editorial: {
    photography: 'none',
    visualStyle: 'functional-exam-editorial',
    biasReview: 'balanced names, regions, occupations and viewpoints; no answer-position pattern',
  },
} as const;

const mcq = (
  id: string,
  part: number,
  text: string,
  options: [string, string] | [string, string, string],
  answer: number,
): MCQQuestion => ({ type: 'mcq', id, part, text, options, answer });

const lesen: MockSection[] = [
  {
    part: 1,
    skill: 'reading',
    title: 'Lesen – Teil 1: Persönliche E-Mail',
    instructions: 'Lesen Sie den Text und die Aufgaben 1 bis 6 dazu. Wählen Sie: Sind die Aussagen Richtig oder Falsch?',
    passageTitle: 'Betreff: Ein Samstag voller Überraschungen',
    passage: `Betreff: Ein Samstag voller Überraschungen

Liebe Nora,

du wolltest wissen, wie mein erster Tag im Reparaturcafé war. Ehrlich gesagt bin ich am Samstag nur hingegangen, weil Amir kurzfristig Hilfe brauchte. Er organisiert das Café einmal im Monat im alten Straßenbahndepot. Eigentlich wollte ich bloß zwei Stunden am Empfang sitzen und die Namen der Besucher notieren.

Schon kurz nach der Öffnung brachte eine ältere Dame ein Radio aus den sechziger Jahren. Niemand wusste zuerst, warum es keinen Ton mehr machte. Gemeinsam mit einer ehemaligen Elektrotechnikerin durfte ich das Gehäuse öffnen. Am Ende war nur ein kleines Kabel lose. Die Besitzerin freute sich so sehr, dass sie uns später selbst gebackenen Kuchen brachte.

Mittags wurde es plötzlich sehr voll. Einige Gäste mussten warten, denn für elektrische Geräte gab es nur drei Arbeitsplätze. Damit niemand umsonst bleibt, verteilt das Team seit diesem Monat Nummernkarten. Wer länger als eine Stunde warten muss, bekommt einen Gutschein für ein Getränk im Café nebenan. Diese Lösung hat überraschend gut funktioniert.

Ich habe übrigens nicht nur zugesehen. Ein Mechaniker zeigte mir, wie man bei einer Schreibtischlampe den Schalter prüft. Danach konnte ich einer Studentin fast allein helfen. Vorher dachte ich, technische Reparaturen wären nichts für mich. Jetzt möchte ich im Oktober sogar an einem Einführungskurs teilnehmen.

Der Tag endete später als geplant, weil wir noch Werkzeug sortieren und den Raum reinigen mussten. Trotzdem war ich nicht genervt. Im Gegenteil: Ich habe viele interessante Menschen kennengelernt und sofort zugesagt, beim nächsten Termin wiederzukommen. Vielleicht hast du dann auch Zeit? Du könntest deinen alten Toaster mitbringen. Melde ihn aber vorher online an, damit das Team ein passendes Ersatzteil besorgen kann.

Liebe Grüße
Lea`,
    questions: [
      mcq('g-b1-1-r1-1', 1, 'Lea hatte ursprünglich nur eine einfache Aufgabe am Empfang.', ['Richtig', 'Falsch'], 0),
      mcq('g-b1-1-r1-2', 1, 'Das alte Radio brauchte ein neues, teures Bauteil.', ['Richtig', 'Falsch'], 1),
      mcq('g-b1-1-r1-3', 1, 'Bei langer Wartezeit erhalten Gäste etwas für das Café nebenan.', ['Richtig', 'Falsch'], 0),
      mcq('g-b1-1-r1-4', 1, 'Lea durfte am Samstag keine Reparatur selbst ausprobieren.', ['Richtig', 'Falsch'], 1),
      mcq('g-b1-1-r1-5', 1, 'Lea will ihre technischen Kenntnisse weiterentwickeln.', ['Richtig', 'Falsch'], 0),
      mcq('g-b1-1-r1-6', 1, 'Nora kann den Toaster ohne vorherige Anmeldung mitbringen.', ['Richtig', 'Falsch'], 1),
    ],
  },
  {
    part: 2,
    skill: 'reading',
    title: 'Lesen – Teil 2: Zwei Pressetexte',
    instructions: 'Lesen Sie die Texte und die Aufgaben 7 bis 12. Wählen Sie bei jeder Aufgabe die richtige Lösung a, b oder c.',
    passageTitle: 'Aus der regionalen Presse',
    passage: `TEXT A · DER MARKTBUS KOMMT INS DORF

In vielen kleinen Orten im Norden Brandenburgs gibt es seit Jahren kein Lebensmittelgeschäft mehr. Seit April fährt deshalb ein umgebauter Linienbus dreimal pro Woche durch zwölf Dörfer. Im Inneren stehen Regale mit Brot, Milch, Obst und Produkten von Höfen aus der Region. Der Fahrplan hängt an den Haltestellen und kann auch per Telefon abgefragt werden. Bestellungen sind bis zum Vorabend möglich; ältere Kundinnen und Kunden nutzen dafür meist eine kostenlose Bestellkarte.

Das Projekt wurde von vier Gemeinden und einer landwirtschaftlichen Genossenschaft gegründet. In den ersten Wochen kamen weniger Menschen als erwartet. Viele dachten, der Bus sei teurer als ein Supermarkt in der Stadt. Seit die Preise auf einer großen Tafel vor dem Bus stehen, hat sich die Zahl der Einkäufe fast verdoppelt. Projektleiterin Jana Seifert betont, dass der Bus nicht nur Waren bringt: „An jeder Station entstehen Gespräche. Für manche Bewohner ist das der einzige feste Treffpunkt in der Woche.“ Im Winter soll getestet werden, ob der Bus zusätzlich Medikamente aus der Kreisapotheke liefern kann.

TEXT B · EINKAUFEN OHNE LAUTE MUSIK

Ein Supermarkt in Basel bietet dienstags von 18 bis 20 Uhr eine „ruhige Einkaufszeit“ an. Dann wird die Musik ausgeschaltet, Durchsagen werden nur in Notfällen gemacht und ein Teil der Kassen piept leiser. Die Idee kam von zwei Mitarbeitenden, die beobachtet hatten, dass manche Kundinnen und Kunden den Laden wegen des Lärms schnell wieder verließen.

Das Angebot richtet sich nicht an eine bestimmte Gruppe. Marktleiter Olivier Blanc sagt, viele Familien mit kleinen Kindern, ältere Menschen und Berufstätige nach einem anstrengenden Tag schätzten die ruhigere Atmosphäre. An den ersten Abenden war allerdings der Eingang überfüllt, weil Neugierige Fotos machten. Der Markt bittet Besucher deshalb inzwischen, auf Aufnahmen zu verzichten. Die Umsätze sind während dieser zwei Stunden nicht höher als sonst. Trotzdem bleibt das Projekt: Beschwerden gingen zurück, und auch die Beschäftigten berichten von weniger Stress. Andere Filialen prüfen nun, ob sie das Modell übernehmen.`,
    questions: [
      mcq('g-b1-1-r2-7', 2, 'Warum wurde der Marktbus eingerichtet?', ['Die regionalen Höfe hatten zu viele Produkte.', 'In vielen Dörfern fehlte eine Einkaufsmöglichkeit.', 'Die Linienbusse fuhren nicht mehr regelmäßig.'], 1),
      mcq('g-b1-1-r2-8', 2, 'Was änderte sich nach den ersten Wochen?', ['Der Bus fuhr in mehr Dörfer.', 'Bestellungen waren nur noch online möglich.', 'Die Preise wurden für alle sichtbar gezeigt.'], 2),
      mcq('g-b1-1-r2-9', 2, 'Jana Seifert findet besonders wichtig, dass der Bus …', ['auch soziale Kontakte ermöglicht.', 'im Winter täglich fährt.', 'nur regionale Waren verkauft.'], 0),
      mcq('g-b1-1-r2-10', 2, 'Was passiert während der ruhigen Einkaufszeit?', ['Alle Kassen bleiben geschlossen.', 'Geräusche werden deutlich reduziert.', 'Nur angemeldete Personen dürfen einkaufen.'], 1),
      mcq('g-b1-1-r2-11', 2, 'Welches Problem gab es am Anfang?', ['Viele Menschen kamen nur, um Bilder zu machen.', 'Familien beschwerten sich über die Öffnungszeit.', 'Die Mitarbeitenden lehnten das Projekt ab.'], 0),
      mcq('g-b1-1-r2-12', 2, 'Warum führt der Markt das Angebot weiter?', ['Der Umsatz ist stark gestiegen.', 'Die Konkurrenz hat dieselben Zeiten eingeführt.', 'Kundschaft und Personal erleben weniger Stress.'], 2),
    ],
  },
  {
    part: 3,
    skill: 'reading',
    title: 'Lesen – Teil 3: Anzeigen zuordnen',
    instructions: 'Lesen Sie die Situationen 13 bis 19 und die Anzeigen A bis J. Welche Anzeige passt? Jede Anzeige dürfen Sie nur einmal verwenden. Für eine Situation gibt es keine passende Anzeige. Wählen Sie dafür 0.',
    passageTitle: 'Kurse und Angebote in der Stadt',
    passage: `A · KLAR SPRECHEN IM BERUF
Zweitägiges Training für Personen, die häufig kurze Präsentationen halten. Sie üben Aufbau, Stimme und den Umgang mit Fragen. Berufserfahrung ist erforderlich. Freitagabend und Samstag.

B · KOCHEN NACH FEIERABEND
Schnelle vegetarische Gerichte mit Zutaten aus der Region. Vier Mittwoche, jeweils 19 Uhr. Anfängerinnen und Anfänger sind willkommen; Lebensmittel sind im Preis enthalten.

C · DIGITALE FOTOS ORDNEN
Sie haben Tausende Bilder auf Handy und Computer? Lernen Sie, Dateien sinnvoll zu benennen, Sicherungskopien anzulegen und Alben zu teilen. Eigenes Notebook mitbringen. Samstag 10–14 Uhr.

D · DEUTSCH IM KUNDENKONTAKT
Onlinekurs für Beschäftigte in Verkauf und Service ab Niveau B1. Höflich beraten, Reklamationen verstehen und Lösungen formulieren. Dienstags und donnerstags am Morgen.

E · FAHRRADWERKSTATT FÜR FORTGESCHRITTENE
Schaltung einstellen, Bremszüge wechseln, Laufräder prüfen. Sie sollten einen Reifen bereits selbst wechseln können. Werkzeug vorhanden, eigenes Fahrrad erforderlich.

F · ERSTE HILFE AM KIND
Kompaktkurs für Eltern, Großeltern und Betreuungspersonen. Was tun bei Fieber, Sturz oder Atemproblemen? Sonntag 9–13 Uhr, Familienzentrum West. Kinderbetreuung inklusive.

G · GEMEINSAM IM STADTGARTEN
Wir suchen Freiwillige für zwei Samstage im Monat. Beete pflegen, Kompost vorbereiten und beim Nachbarschaftsfest helfen. Keine Vorkenntnisse nötig; Mindestalter 16 Jahre.

H · STIMME UND ATMUNG
Praktische Übungen für Menschen, die beim langen Sprechen schnell heiser werden. Kleine Gruppe, sechs Montagabende. Der Kurs ist kein Gesangsunterricht.

I · NÄHEN: EIGENE ENTWÜRFE
Vom Schnittmuster zum fertigen Kleidungsstück. Acht Termine für Teilnehmende, die sicher mit der Nähmaschine umgehen können. Maschinen stehen zur Verfügung.

J · FIT AM SCHREIBTISCH
Kurze Übungen gegen verspannte Schultern und Rücken. Live im Internet in der Mittagspause, zweimal pro Woche. Teilnahme auch direkt vom Arbeitsplatz möglich.`,
    questions: [{
      type: 'matching',
      id: 'g-b1-1-r3',
      part: 3,
      qRange: [13, 19],
      groupLabel: 'BEISPIEL: Eine erfahrene Hobbynäherin möchte ein Kleid nach eigener Idee herstellen. → I',
      items: [
        { num: 13, stem: 'Marta arbeitet im Laden und möchte morgens sprachlich sicherer mit schwierigen Kundinnen und Kunden umgehen.', answer: 'D' },
        { num: 14, stem: 'Leon sucht einen Kurs, damit er bei Vorträgen vor Kolleginnen und Kollegen ruhiger und verständlicher spricht.', answer: 'A' },
        { num: 15, stem: 'Aylin möchte am Wochenende lernen, wie sie die Bilder ihrer Familie sicher aufbewahrt.', answer: 'C' },
        { num: 16, stem: 'Herr Koch betreut seinen Enkel regelmäßig und möchte auf medizinische Notfälle vorbereitet sein.', answer: 'F' },
        { num: 17, stem: 'Eva sitzt im Homeoffice und möchte während der Arbeitszeit etwas gegen Rückenschmerzen tun.', answer: 'J' },
        { num: 18, stem: 'Noah kann noch keinen Fahrradreifen wechseln und sucht einen Kurs für absolute Anfänger.', answer: '0' },
        { num: 19, stem: 'Rina möchte regelmäßig draußen mitarbeiten und dabei Menschen aus ihrem Viertel kennenlernen.', answer: 'G' },
      ],
      endings: [
        { letter: 'A', text: 'Klar sprechen im Beruf' }, { letter: 'B', text: 'Kochen nach Feierabend' },
        { letter: 'C', text: 'Digitale Fotos ordnen' }, { letter: 'D', text: 'Deutsch im Kundenkontakt' },
        { letter: 'E', text: 'Fahrradwerkstatt für Fortgeschrittene' }, { letter: 'F', text: 'Erste Hilfe am Kind' },
        { letter: 'G', text: 'Gemeinsam im Stadtgarten' }, { letter: 'H', text: 'Stimme und Atmung' },
        { letter: 'I', text: 'Nähen: eigene Entwürfe' }, { letter: 'J', text: 'Fit am Schreibtisch' },
        { letter: '0', text: 'Keine Anzeige passt.' },
      ],
    }],
  },
  {
    part: 4,
    skill: 'reading',
    title: 'Lesen – Teil 4: Meinungen',
    instructions: 'Lesen Sie die Texte 20 bis 26. Sind die Personen für eine Vier-Tage-Woche bei gleichem Arbeitsumfang? Wählen Sie Ja oder Nein.',
    passageTitle: 'Vier Tage arbeiten – eine gute Idee?',
    passage: `20 · MATTHIAS, GRAZ
Bei uns wurde die Arbeitszeit nicht reduziert, sondern nur anders verteilt. Die langen Tage sind anstrengend, aber der freie Freitag hilft mir, private Termine zu erledigen. Für mich überwiegen die Vorteile klar.

21 · SELIN, KÖLN
In meinem Team müssen Kundinnen und Kunden auch freitags jemanden erreichen. Seit dem Test wechseln die freien Tage ständig, und gemeinsame Besprechungen sind schwieriger geworden. Ich wünsche mir das alte Modell zurück.

22 · PETRA, LUZERN
Seit wir vier Tage arbeiten, planen wir Besprechungen kürzer und beantworten weniger unnötige E-Mails. Die gleiche Arbeit schaffen wir trotzdem. Ich würde nicht mehr zu fünf Tagen zurückkehren.

23 · OMAR, HAMBURG
Für Eltern klingt ein freier Tag attraktiv. Wenn dafür aber jeder andere Arbeitstag fast zehn Stunden dauert, sehe ich meine Kinder an diesen Abenden kaum. Das passt für meine Familie nicht.

24 · KATHARINA, ERFURT
Ich kann meine Weiterbildung endlich regelmäßig besuchen. Natürlich muss das Team gut planen, damit niemand mehr Arbeit übernimmt. Mit klaren Regeln funktioniert es bei uns sehr gut.

25 · MARKUS, BERN
In der Werkstatt hängt unsere Arbeit von Lieferzeiten ab. Ein zusätzlicher freier Tag führt dazu, dass Reparaturen später fertig werden. In Büros mag das Modell funktionieren, für unseren Betrieb halte ich es für ungeeignet.

26 · DANIELA, BREMEN
Freie Zeit ist wichtig, aber nicht alle sollten denselben Wochentag wählen müssen. Wenn Beschäftigte gemeinsam mit ihrem Team entscheiden dürfen, kann die Vier-Tage-Woche Motivation und Konzentration verbessern.`,
    questions: [
      mcq('g-b1-1-r4-20', 4, 'Matthias', ['Ja', 'Nein'], 0),
      mcq('g-b1-1-r4-21', 4, 'Selin', ['Ja', 'Nein'], 1),
      mcq('g-b1-1-r4-22', 4, 'Petra', ['Ja', 'Nein'], 0),
      mcq('g-b1-1-r4-23', 4, 'Omar', ['Ja', 'Nein'], 1),
      mcq('g-b1-1-r4-24', 4, 'Katharina', ['Ja', 'Nein'], 0),
      mcq('g-b1-1-r4-25', 4, 'Markus', ['Ja', 'Nein'], 1),
      mcq('g-b1-1-r4-26', 4, 'Daniela', ['Ja', 'Nein'], 0),
    ],
  },
  {
    part: 5,
    skill: 'reading',
    title: 'Lesen – Teil 5: Hausordnung',
    instructions: 'Lesen Sie die Hausordnung und die Aufgaben 27 bis 30. Wählen Sie die richtige Lösung a, b oder c.',
    passageTitle: 'Stadtteilzentrum Nordlicht · Hausordnung',
    passage: `STADTTEILZENTRUM NORDLICHT · HAUSORDNUNG

ÖFFNUNGSZEITEN
Das Haus ist montags bis samstags von 8 bis 22 Uhr geöffnet. Gruppen, die einen Raum vor 9 Uhr oder nach 20 Uhr nutzen, holen den Schlüssel spätestens am Vortag bis 18 Uhr am Empfang ab. Sonntags bleibt das Gebäude geschlossen; Ausnahmen müssen mindestens zwei Wochen vorher schriftlich genehmigt werden.

RÄUME UND RESERVIERUNGEN
Reservierte Räume dürfen erst zehn Minuten vor Beginn betreten werden. Tische und Stühle können umgestellt werden, müssen aber nach der Veranstaltung wieder auf dem markierten Platz stehen. Schäden sind sofort am Empfang zu melden. Für private Feiern wird eine Kaution verlangt.

KÜCHE
Die Küche steht nur Gruppen zur Verfügung, die sie zusammen mit einem Veranstaltungsraum gebucht haben. Eigenes Geschirr darf mitgebracht werden. Lebensmittel im Kühlschrank müssen mit Name und Datum gekennzeichnet sein; nicht beschriftete Produkte werden jeden Samstag entsorgt.

SICHERHEIT UND VERKEHR
Fluchtwege dürfen nie zugestellt werden. Fahrräder gehören an die Ständer im Hof, nicht in den Eingangsbereich. Kinder unter zwölf Jahren dürfen Werkraum und Küche nur in Begleitung einer erwachsenen Person betreten.`,
    questions: [
      mcq('g-b1-1-r5-27', 5, 'Was muss eine Gruppe tun, wenn sie einen Raum abends nach 20 Uhr nutzt?', ['Eine zusätzliche Kaution bezahlen.', 'Zwei Wochen vorher schreiben.', 'Den Schlüssel vorher am Empfang abholen.'], 2),
      mcq('g-b1-1-r5-28', 5, 'Nach einer Veranstaltung muss man …', ['die Möbel an ihren ursprünglichen Platz stellen.', 'alle Schäden selbst reparieren.', 'den Raum zehn Minuten früher verlassen.'], 0),
      mcq('g-b1-1-r5-29', 5, 'Wer darf die Küche benutzen?', ['Jede Person während der Öffnungszeit.', 'Gruppen mit einer passenden Raumbuchung.', 'Nur Mitarbeitende des Zentrums.'], 1),
      mcq('g-b1-1-r5-30', 5, 'Was gilt für Fahrräder?', ['Sie dürfen im Eingangsbereich stehen.', 'Sie müssen abgeschlossen abgegeben werden.', 'Sie werden im Hof abgestellt.'], 2),
    ],
  },
];

const schreiben: MockSection[] = [
  {
    part: 6,
    skill: 'writing',
    title: 'Schreiben – Aufgabe 1: Persönliche E-Mail',
    instructions: 'Arbeitszeit: 20 Minuten. Schreiben Sie circa 80 Wörter. Schreiben Sie etwas zu allen drei Punkten. Achten Sie auf Aufbau, Anrede und Gruß.',
    questions: [{
      type: 'write', id: 'g-b1-1-w1', part: 6, taskNumber: 1, minWords: 80, maxWords: 100,
      stimulusLabel: 'Persönliche E-Mail',
      stimulus: 'Sie haben am Wochenende zum ersten Mal bei einem Nachbarschaftsprojekt mitgemacht. Schreiben Sie Ihrer Freundin Mila eine E-Mail.',
      text: '• Beschreiben Sie, was Sie dort gemacht haben.\n• Erklären Sie, was Ihnen besonders gefallen oder nicht gefallen hat.\n• Schlagen Sie vor, beim nächsten Termin gemeinsam hinzugehen.',
    }],
  },
  {
    part: 7,
    skill: 'writing',
    title: 'Schreiben – Aufgabe 2: Meinung im Forum',
    instructions: 'Arbeitszeit: 25 Minuten. Schreiben Sie circa 80 Wörter. Äußern Sie Ihre Meinung, nennen Sie Gründe und ein Beispiel.',
    questions: [{
      type: 'write', id: 'g-b1-1-w2', part: 7, taskNumber: 2, minWords: 80, maxWords: 100,
      stimulusLabel: 'Online-Forum: Alltag und Stadt',
      stimulus: '„Immer mehr Behörden bieten Beratung per Video an. Persönliche Termine vor Ort sind deshalb nur noch an wenigen Tagen möglich.“',
      text: 'Schreiben Sie Ihre Meinung dazu. Begründen Sie Ihre Position und nennen Sie ein Beispiel aus dem Alltag.',
    }],
  },
  {
    part: 8,
    skill: 'writing',
    title: 'Schreiben – Aufgabe 3: Formelle E-Mail',
    instructions: 'Arbeitszeit: 15 Minuten. Schreiben Sie circa 40 Wörter. Vergessen Sie Anrede und Gruß nicht.',
    questions: [{
      type: 'write', id: 'g-b1-1-w3', part: 8, taskNumber: 3, minWords: 40, maxWords: 60,
      stimulusLabel: 'E-Mail an Frau Bergmann',
      stimulus: 'Sie haben Frau Bergmann versprochen, am Freitag bei einer Informationsveranstaltung zu helfen. Sie können nun nicht kommen.',
      text: 'Entschuldigen Sie sich höflich. Erklären Sie kurz den Grund und bieten Sie eine andere Hilfe an.',
    }],
  },
];

const sprechen: MockSection[] = [
  {
    part: 9,
    skill: 'speaking',
    title: 'Sprechen – Teil 1: Gemeinsam etwas planen',
    instructions: 'Sie planen gemeinsam eine Begrüßung für eine neue Kollegin. Machen Sie Vorschläge, reagieren Sie auf Ihre Gesprächspartnerin oder Ihren Gesprächspartner und einigen Sie sich.',
    questions: [{
      type: 'speak', id: 'g-b1-1-sp1', part: 9, partNumber: 1,
      text: 'Planen Sie gemeinsam: Wann und wo? · Essen und Getränke? · Kleine Aufmerksamkeit? · Wer informiert das Team?',
      cueCard: 'Rolle A: Sie bevorzugen ein gemeinsames Frühstück am Montag. · Rolle B: Sie bevorzugen ein Treffen nach der Arbeit am Dienstag.',
    }],
  },
  {
    part: 10,
    skill: 'speaking',
    title: 'Sprechen – Teil 2: Ein Thema präsentieren',
    instructions: 'Wählen Sie eines von zwei Themen. Sprechen Sie circa drei bis vier Minuten. Nutzen Sie alle fünf Punkte Ihrer Präsentationskarte.',
    questions: [{
      type: 'speak', id: 'g-b1-1-sp2', part: 10, partNumber: 2,
      text: 'KARTE A: Lebensmittel online kaufen?\nKARTE B: Kostenloser Nahverkehr?',
      cueCard: 'KARTE A\nThema vorstellen · persönliche Erfahrung · Situation im Heimatland · Vorteile und Nachteile · eigene Meinung\n\nKARTE B\nThema vorstellen · persönliche Erfahrung · Situation im Heimatland · Vorteile und Nachteile · eigene Meinung',
      followUp: ['Wo sehen Sie die größte Schwierigkeit?', 'Welche Alternative würden Sie empfehlen?'],
    }],
  },
  {
    part: 11,
    skill: 'speaking',
    title: 'Sprechen – Teil 3: Über ein Thema sprechen',
    instructions: 'Geben Sie Ihrer Partnerin oder Ihrem Partner Feedback zur Präsentation. Stellen Sie danach eine Frage zum Thema und beantworten Sie eine Rückfrage.',
    questions: [{
      type: 'speak', id: 'g-b1-1-sp3', part: 11, partNumber: 3,
      text: 'Reagieren Sie direkt auf das gezogene Präsentationsthema.',
      imageUrls: ['/images/goethe/b1-1/sprechen-teil3-thema-a.svg', '/images/goethe/b1-1/sprechen-teil3-thema-b.svg'],
      imageAlts: ['Gesprächskarte zu Lebensmittel online kaufen', 'Gesprächskarte zu kostenlosem Nahverkehr'],
      followUp: ['Nennen Sie zuerst einen konkreten Punkt, der Sie überzeugt hat.', 'Stellen Sie dann eine offene Frage zum Thema.'],
    }],
  },
];

const GOETHE_B1_MASTER_SET_1: MockExam = {
  id: 'b1-1',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat B1 · Referenzmock 1',
  subtitle: 'Lesen, Schreiben und Sprechen vollständig · Hören und Gesamtprüfung bis zum geprüften Audio blockiert',
  timeMinutes: 140,
  sections: [...lesen, ...schreiben, ...sprechen],
};

export default GOETHE_B1_MASTER_SET_1;
