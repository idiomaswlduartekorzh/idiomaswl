import { createStructureQuest, type FinalRow, type StructureSeed } from './create-structure-quest.ts'

export const GERMAN_FORMS = [
  { id: 'praesens', label: 'Präsens', group: 'Gegenwart' },
  { id: 'perfekt-haben', label: 'Perfekt mit haben', group: 'Vergangenheit' },
  { id: 'perfekt-sein', label: 'Perfekt mit sein', group: 'Vergangenheit' },
  { id: 'praeteritum', label: 'Präteritum', group: 'Vergangenheit' },
  { id: 'plusquamperfekt', label: 'Plusquamperfekt', group: 'Vergangenheit' },
  { id: 'futur-eins', label: 'Futur I', group: 'Zukunft' },
  { id: 'futur-zwei', label: 'Futur II', group: 'Zukunft' },
  { id: 'wuerde-form', label: 'würde + Infinitiv', group: 'Hypothese' },
  { id: 'konjunktiv-vergangenheit', label: 'Irreale Vergangenheit', group: 'Hypothese' },
  { id: 'imperativ', label: 'Imperativ', group: 'Aufforderung' },
] as const

export type GermanFormId = (typeof GERMAN_FORMS)[number]['id']

const SEEDS: StructureSeed<GermanFormId>[] = [
  { id: 'praesens', explanation: 'Das Präsens bezeichnet Gegenwart, Gewohnheiten und auch fest geplante Zukunft.', examples: [
    { context: 'Jeden Morgen ___ Mia mit dem Fahrrad zur Arbeit.', answer: 'fährt', wrong: 'fahrt', lemma: 'fahren', cue: 'gegenwärtige Gewohnheit', distractors: ['ist gefahren', 'fuhr', 'wird fahren'] },
    { context: 'Zurzeit ___ ich bei meiner Schwester.', answer: 'wohne', wrong: 'wohnt', lemma: 'wohnen', cue: 'vorübergehende Gegenwart', distractors: ['habe gewohnt', 'wohnte', 'werde wohnen'] },
    { context: 'Der Zug ___ morgen um 7:15 Uhr ab.', answer: 'fährt', wrong: 'fuhr', lemma: 'abfahren', cue: 'fester Fahrplan', distractors: ['ist abgefahren', 'wird gefahren sein', 'würde fahren'] },
  ] },
  { id: 'perfekt-haben', explanation: 'Das Perfekt mit haben erzählt abgeschlossene Ereignisse, besonders im gesprochenen Deutsch.', examples: [
    { context: 'Ich weiß, dass Lea den Bericht gestern ___.', answer: 'geschrieben hat', wrong: 'geschrieben ist', lemma: 'schreiben', cue: 'abgeschlossenes Ereignis mit haben', distractors: ['schrieb', 'geschrieben hatte', 'schreiben wird'] },
    { context: 'Mia sagt, dass wir schon ___.', answer: 'zu Abend gegessen haben', wrong: 'zu Abend gegessen sind', lemma: 'zu Abend essen', cue: 'vollendete Handlung', distractors: ['zu Abend aßen', 'zu Abend gegessen hatten', 'zu Abend essen werden'] },
    { context: 'Es stimmt, dass du den neuen Film zweimal ___.', answer: 'gesehen hast', wrong: 'gesehen bist', lemma: 'sehen', cue: 'Erfahrung bis jetzt', distractors: ['sahst', 'gesehen hattest', 'sehen wirst'] },
  ] },
  { id: 'perfekt-sein', explanation: 'Ortswechsel und Zustandsänderungen bilden das Perfekt meist mit sein; das Partizip bleibt am Satzende.', examples: [
    { context: 'Wir hören, dass Nora am Samstag in Berlin ___.', answer: 'angekommen ist', wrong: 'angekommen hat', lemma: 'ankommen', cue: 'Ortswechsel mit sein', distractors: ['ankam', 'angekommen war', 'ankommen wird'] },
    { context: 'Sie wissen, dass wir mit dem Nachtzug ___.', answer: 'gefahren sind', wrong: 'gefahren haben', lemma: 'fahren', cue: 'Bewegung mit sein', distractors: ['fuhren', 'gefahren waren', 'fahren werden'] },
    { context: 'Gut, dass das Kind sofort ___.', answer: 'eingeschlafen ist', wrong: 'eingeschlafen hat', lemma: 'einschlafen', cue: 'Zustandsänderung mit sein', distractors: ['einschlief', 'eingeschlafen war', 'einschlafen wird'] },
  ] },
  { id: 'praeteritum', explanation: 'Das Präteritum trägt schriftliche Erzählungen; sein, haben und Modalverben sind auch mündlich häufig.', examples: [
    { context: 'Damals ___ wir in einem kleinen Dorf.', answer: 'wohnten', wrong: 'wohnte', lemma: 'wohnen', cue: 'erzählerischer Hintergrund', distractors: ['haben gewohnt', 'hatten gewohnt', 'werden wohnen'] },
    { context: 'Plötzlich ___ jemand die Tür.', answer: 'öffnete', wrong: 'geöffnet', lemma: 'öffnen', cue: 'Ereignis in einer Erzählung', distractors: ['hat geöffnet', 'hatte geöffnet', 'wird öffnen'] },
    { context: 'Als Student ___ er kein Auto.', answer: 'hatte', wrong: 'hätte', lemma: 'haben', cue: 'häufiges Präteritum von haben', distractors: ['hat gehabt', 'wird haben', 'würde haben'] },
  ] },
  { id: 'plusquamperfekt', explanation: 'Das Plusquamperfekt markiert eine Handlung, die vor einem anderen vergangenen Ereignis abgeschlossen war.', examples: [
    { context: 'Als die Gäste kamen, wussten sie, dass wir schon ___.', answer: 'gegessen hatten', wrong: 'gegessen haben', lemma: 'essen', cue: 'Vorvergangenheit mit haben', distractors: ['aßen', 'essen werden', 'gegessen hätten'] },
    { context: 'Sie fand Paul nicht, weil er schon ___.', answer: 'gegangen war', wrong: 'gegangen ist', lemma: 'gehen', cue: 'Vorvergangenheit mit sein', distractors: ['ging', 'gehen wird', 'gegangen wäre'] },
    { context: 'Ich musste umkehren, weil ich den Schlüssel ___.', answer: 'vergessen hatte', wrong: 'vergessen hätte', lemma: 'vergessen', cue: 'frühere Ursache', distractors: ['vergaß', 'vergessen habe', 'vergessen werde'] },
  ] },
  { id: 'futur-eins', explanation: 'werden + Infinitiv kennzeichnet Vorhersage oder Zukunft; für feste Pläne genügt oft das Präsens.', examples: [
    { context: 'Ich verspreche, dass ich dich morgen ___.', answer: 'anrufen werde', wrong: 'anrufen würde', lemma: 'anrufen', cue: 'zukünftiges Versprechen', distractors: ['angerufen habe', 'angerufen hatte', 'anrief'] },
    { context: 'Die Prognose sagt, dass die Preise nächstes Jahr ___.', answer: 'steigen werden', wrong: 'steigen würden', lemma: 'steigen', cue: 'Vorhersage', distractors: ['gestiegen sind', 'gestiegen waren', 'stiegen'] },
    { context: 'Es ist sicher, dass Lea um diese Zeit noch ___.', answer: 'arbeiten wird', wrong: 'arbeiten werdet', lemma: 'arbeiten', cue: 'zukünftige Situation', distractors: ['gearbeitet hat', 'gearbeitet hatte', 'arbeitete'] },
  ] },
  { id: 'futur-zwei', explanation: 'werden + Partizip II + haben/sein betrachtet etwas als vor einem zukünftigen Zeitpunkt abgeschlossen.', examples: [
    { context: 'Sie erwarten, dass wir den Bericht bis Freitag ___.', answer: 'beendet haben werden', wrong: 'beendet haben würden', lemma: 'beenden', cue: 'Abschluss vor einer Frist', distractors: ['beendet haben', 'beendet hatten', 'beenden werden'] },
    { context: 'Wenn du ankommst, merkst du, dass Mia schon ___.', answer: 'gegangen sein wird', wrong: 'gegangen haben wird', lemma: 'gehen', cue: 'Vorzeitigkeit in der Zukunft', distractors: ['gegangen ist', 'gegangen war', 'gehen wird'] },
    { context: 'Um Mitternacht steht fest, dass sie alle Daten ___.', answer: 'gespeichert haben werden', wrong: 'gespeichert sein werden', lemma: 'speichern', cue: 'zukünftige Bilanz', distractors: ['gespeichert haben', 'gespeichert hatten', 'speichern werden'] },
  ] },
  { id: 'wuerde-form', explanation: 'würde + Infinitiv formuliert hypothetische Folgen und höfliche Wünsche; es gehört funktional zum Konjunktiv II.', examples: [
    { context: 'Sie meint, dass ich mit mehr Zeit öfter ___.', answer: 'reisen würde', wrong: 'reisen werde', lemma: 'reisen', cue: 'hypothetische Folge', distractors: ['gereist bin', 'gereist war', 'reiste'] },
    { context: 'Wir sagen dem Kellner, dass wir gern einen Tisch ___.', answer: 'reservieren würden', wrong: 'reservieren werden', lemma: 'reservieren', cue: 'höflicher Wunsch', distractors: ['reserviert haben', 'reserviert hatten', 'reservierten'] },
    { context: 'Ich glaube, dass sie an deiner Stelle das Angebot ___.', answer: 'annehmen würde', wrong: 'annehmen wird', lemma: 'annehmen', cue: 'hypothetischer Rat', distractors: ['angenommen hat', 'angenommen hatte', 'annahm'] },
  ] },
  { id: 'konjunktiv-vergangenheit', explanation: 'hätte/wäre + Partizip II beschreibt eine nicht verwirklichte Möglichkeit in der Vergangenheit.', examples: [
    { context: 'Er weiß, dass ich den Brief mit deiner Adresse ___.', answer: 'geschickt hätte', wrong: 'geschickt hatte', lemma: 'schicken', cue: 'nicht verwirklichte vergangene Folge', distractors: ['geschickt habe', 'schicken werde', 'schicken würde'] },
    { context: 'Es stimmt, dass sie ohne den Stau pünktlich ___.', answer: 'angekommen wären', wrong: 'angekommen hätten', lemma: 'ankommen', cue: 'irreale Vergangenheit mit sein', distractors: ['angekommen sind', 'angekommen waren', 'ankommen würden'] },
    { context: 'Die Prüfung zeigt, dass wir den Fehler mit einer Kontrolle ___.', answer: 'vermieden hätten', wrong: 'vermieden hatten', lemma: 'vermeiden', cue: 'kontrafaktisches Ergebnis', distractors: ['vermieden haben', 'vermeiden werden', 'vermeiden würden'] },
  ] },
  { id: 'imperativ', explanation: 'Der Imperativ richtet eine Aufforderung an du, ihr oder Sie; Pronomen und Endung hängen von der Anrede ab.', examples: [
    { context: '___ bitte langsam, Paul!', answer: 'Sprich', wrong: 'Sprecht', lemma: 'sprechen (du)', cue: 'du-Aufforderung', distractors: ['Spricht', 'Sprechen Sie', 'Gesprochen'] },
    { context: '___ Sie bitte hier Platz!', answer: 'Nehmen', wrong: 'Nimm', lemma: 'nehmen (Sie)', cue: 'höfliche Sie-Aufforderung', distractors: ['Nehmt', 'Nimmt', 'Genommen'] },
    { context: '___ vorsichtig, Kinder!', answer: 'Seid', wrong: 'Sei', lemma: 'sein (ihr)', cue: 'ihr-Aufforderung', distractors: ['Sind', 'Seien Sie', 'Gewesen'] },
  ] },
]

const FINAL_ROWS: FinalRow<GermanFormId>[] = [
  { formId: 'praesens', lemma: 'leiten', before: 'Heute ', after: ' Mia ein kleines Theater. ', answer: 'leitet' },
  { formId: 'perfekt-haben', lemma: 'planen', before: 'Sie erzählt, dass sie ein neues Stück ', after: '. ', answer: 'geplant hat' },
  { formId: 'perfekt-sein', lemma: 'ankommen', before: 'Die Hauptdarstellerin schreibt, dass sie gestern spät ', after: '. ', answer: 'angekommen ist' },
  { formId: 'praeteritum', lemma: 'warten', before: 'Das Ensemble ', after: ' schon auf der Bühne. ', answer: 'wartete' },
  { formId: 'plusquamperfekt', lemma: 'beginnen', before: 'Alle merkten, dass die Probe noch nicht ', after: ', als das Licht ausfiel. ', answer: 'begonnen hatte' },
  { formId: 'futur-eins', lemma: 'reparieren', before: 'Mia sagt, dass ein Techniker die Anlage morgen ', after: '. ', answer: 'reparieren wird' },
  { formId: 'futur-zwei', lemma: 'prüfen', before: 'Sie erwartet, dass er bis Freitag jede Lampe ', after: '. ', answer: 'geprüft haben wird' },
  { formId: 'wuerde-form', lemma: 'verschieben', before: 'Mia erklärt, dass sie die Premiere bei einem längeren Ausfall ', after: '. ', answer: 'verschieben würde' },
  { formId: 'konjunktiv-vergangenheit', lemma: 'absagen', before: 'Ohne den Techniker weiß sie, dass sie die erste Probe ', after: '. ', answer: 'abgesagt hätte' },
  { formId: 'imperativ', lemma: 'bleiben', before: 'Mia ruft dem Ensemble zu: „', after: ' bitte ruhig!“', answer: 'Bleibt' },
]

export const GERMAN_STRUCTURE_QUEST = createStructureQuest({
  id: 'german-structure-quest', storageKey: 'wl-german-structure-quest-v1', forms: GERMAN_FORMS,
  presets: [
    { label: 'Vergangenheit', ids: GERMAN_FORMS.filter((form) => form.group === 'Vergangenheit').map((form) => form.id) },
    { label: 'Zukunft', ids: GERMAN_FORMS.filter((form) => form.group === 'Zukunft').map((form) => form.id) },
    { label: 'Hypothese', ids: GERMAN_FORMS.filter((form) => form.group === 'Hypothese').map((form) => form.id) },
  ], seeds: SEEDS, finalRows: FINAL_ROWS,
  copy: {
    languageName: 'Alemán', languageCode: 'de', eyebrow: 'Quiz de Zeitformen und Satzlogik · A2–B2', title: 'Die Zeitwerkstatt',
    lead: 'Entrena tiempo, auxiliar, posición verbal e hipótesis sin reducir el alemán a una traducción del español.',
    range: '10 estructuras', selectedLabel: 'Strukturen ausgewählt', selectorTitle: '¿Qué estructuras del alemán quieres practicar?',
    selectorLead: 'Perfekt con haben y sein se separan; la hipótesis se nombra como Konjunktiv II cuando corresponde.',
    configuredEyebrow: 'Persönlicher Lernweg', levelsTitle: 'Seis niveles con corrección diferida',
    levelsLead: 'Las respuestas se mantienen ocultas hasta terminar el nivel.', mapLabels: ['Vorher', 'Vergangenheit', 'Jetzt', 'Zukunft'],
    reviewLinks: [
      { href: '/practica/aleman/a1/gramatica', label: 'Repasar gramática A1' },
      { href: '/practica/aleman/a2/gramatica', label: 'Profundizar en A2' },
      { href: '/herramientas/quizes', label: 'Ver más quizes' },
    ],
  }, text: { finalTitle: 'Die Theaterprobe', finalExplanation: 'La secuencia integra auxiliares, relato escrito, anterioridad, proyección, hipótesis y una orden con concordancia de tratamiento.' },
})
