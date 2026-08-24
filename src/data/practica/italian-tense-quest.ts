export type ChoiceChallenge = {
  tenses: TenseId[]
  focus: string
  prompt: string
  context: string
  options: string[]
  answer: string
  explanation: string
}

export type Gap = {
  id: string
  tense: TenseId
  verb: string
  answers: string[]
}

export type GapChallenge = {
  title: string
  focus: string
  instruction: string
  segments: string[]
  gaps: Gap[]
  explanation: string
}

export type ErrorChunk = {
  before: string
  id: string
  form: string
}

export type ErrorChallenge = {
  tense: TenseId
  title: string
  focus: string
  instruction: string
  chunks: ErrorChunk[]
  after: string
  wrongId: string
  answers: string[]
  explanation: string
}

export type TimelineSlot = {
  id: string
  tense: TenseId
  label: string
  hint: string
  answer: string
}

export type TimelineChallenge = {
  title: string
  focus: string
  context: string
  slots: TimelineSlot[]
  options: string[]
  explanation: string
}

export type BankGap = {
  id: string
  tenseId: TenseId
  tense: string
  answer: string
}

export type BankChallenge = {
  title: string
  instruction: string
  segments: string[]
  gaps: BankGap[]
  bank: string[]
  explanation: string
}

export const TENSE_OPTIONS = [
  { id: 'presente', label: 'Presente', group: 'Presente' },
  { id: 'passato-prossimo', label: 'Passato prossimo', group: 'Passato' },
  { id: 'imperfetto', label: 'Imperfetto', group: 'Passato' },
  { id: 'passato-remoto', label: 'Passato remoto', group: 'Passato' },
  { id: 'trapassato-prossimo', label: 'Trapassato prossimo', group: 'Anterioridad' },
  { id: 'trapassato-remoto', label: 'Trapassato remoto', group: 'Anterioridad' },
  { id: 'futuro-semplice', label: 'Futuro semplice', group: 'Futuro' },
  { id: 'futuro-anteriore', label: 'Futuro anteriore', group: 'Futuro' },
  { id: 'condizionale-presente', label: 'Condizionale presente', group: 'Condicional' },
  { id: 'condizionale-passato', label: 'Condizionale passato', group: 'Condicional' },
  { id: 'imperativo', label: 'Imperativo', group: 'Imperativo' },
] as const

export type TenseId = (typeof TENSE_OPTIONS)[number]['id']

export const TENSE_COVERAGE = TENSE_OPTIONS.map((tense) => tense.label)

export const LEVEL_META = [
  { number: '01', title: 'Scelta rapida', short: 'Opción múltiple', description: 'Reconoce la forma que encaja en cada contexto.' },
  { number: '02', title: 'Microstorie', short: 'Textos cortos', description: 'Escribe la conjugación exacta indicada por el contexto.' },
  { number: '03', title: 'Racconti', short: 'Textos largos', description: 'Mantén la coherencia temporal a lo largo de un relato.' },
  { number: '04', title: 'Caccia all’errore', short: 'Detectar y reparar', description: 'Señala el verbo defectuoso y reescríbelo correctamente.' },
  { number: '05', title: 'Regia temporale', short: 'Línea del tiempo', description: 'Asigna cada cláusula al papel temporal que le corresponde.' },
  { number: '06', title: 'Il manoscritto', short: 'Reto final', description: 'Reconstruye un relato completo con un banco cerrado de formas.' },
] as const

export const CHOICE_CHALLENGES: ChoiceChallenge[] = [
  {
    tenses: ['presente'],
    focus: 'Presente',
    prompt: 'Completa la rutina.',
    context: 'Ogni lunedì noi ___ italiano con la professoressa.',
    options: ['studieremo', 'studiamo', 'abbiamo studiato', 'studiavamo'],
    answer: 'studiamo',
    explanation: '“Ogni lunedì” presenta una costumbre vigente: indicativo presente.',
  },
  {
    tenses: ['passato-prossimo'],
    focus: 'Passato prossimo',
    prompt: 'Elige auxiliar y concordancia.',
    context: 'Giulia ___ a casa molto tardi ieri sera.',
    options: ['ha tornato', 'è tornata', 'tornava', 'tornò'],
    answer: 'è tornata',
    explanation: 'Tornare usa essere; el participio concuerda con Giulia: tornata.',
  },
  {
    tenses: ['imperfetto'],
    focus: 'Imperfetto',
    prompt: 'Recupera una costumbre del pasado.',
    context: 'Da bambini, noi ___ sempre in strada dopo la scuola.',
    options: ['abbiamo giocato', 'giocammo', 'giocavamo', 'giocheremo'],
    answer: 'giocavamo',
    explanation: 'Una acción habitual y repetida en el pasado pide imperfetto.',
  },
  {
    tenses: ['passato-remoto'],
    focus: 'Passato remoto',
    prompt: 'Completa el dato biográfico.',
    context: 'Dante Alighieri ___ a Firenze nel 1265.',
    options: ['nacque', 'nasceva', 'è nato', 'era nato'],
    answer: 'nacque',
    explanation: 'En una biografía histórica cerrada, el passato remoto “nacque” es la forma esperada.',
  },
  {
    tenses: ['trapassato-prossimo'],
    focus: 'Trapassato prossimo',
    prompt: 'Marca la acción anterior.',
    context: 'Quando siamo arrivati, il proprietario del negozio ___.',
    options: ['ha già chiuso', 'chiudeva ancora', 'aveva già chiuso', 'ebbe chiuso'],
    answer: 'aveva già chiuso',
    explanation: 'El cierre ocurrió antes de nuestra llegada: trapassato prossimo con avere.',
  },
  {
    tenses: ['trapassato-remoto'],
    focus: 'Trapassato remoto',
    prompt: 'Entra en la narración literaria.',
    context: 'Non appena il re ___ il messaggio, convocò i ministri.',
    options: ['aveva letto', 'ha letto', 'ebbe letto', 'leggeva'],
    answer: 'ebbe letto',
    explanation: 'Tras “non appena”, una acción inmediatamente anterior a un passato remoto puede ir en trapassato remoto.',
  },
  {
    tenses: ['futuro-semplice'],
    focus: 'Futuro semplice',
    prompt: 'Proyecta una acción.',
    context: 'La prossima estate noi ___ la Sicilia.',
    options: ['visitiamo', 'visitavamo', 'visiteremo', 'avremo visitato'],
    answer: 'visiteremo',
    explanation: '“La prossima estate” sitúa la visita en el futuro.',
  },
  {
    tenses: ['futuro-anteriore'],
    focus: 'Futuro anteriore',
    prompt: 'Expresa una acción ya terminada en el futuro.',
    context: 'Entro le sei, loro ___ il lavoro.',
    options: ['finiranno', 'avranno finito', 'avrebbero finito', 'hanno finito'],
    answer: 'avranno finito',
    explanation: '“Entro le sei” marca el límite antes del cual la acción futura estará completa.',
  },
  {
    tenses: ['condizionale-presente'],
    focus: 'Condizionale presente',
    prompt: 'Formula una petición cortés.',
    context: 'Scusi, ___ un bicchiere d’acqua.',
    options: ['voglio', 'vorrò', 'vorrei', 'avrei voluto'],
    answer: 'vorrei',
    explanation: 'Vorrei es la forma convencional del condizionale para una petición cortés.',
  },
  {
    tenses: ['condizionale-passato'],
    focus: 'Condizionale passato',
    prompt: 'Expresa un futuro visto desde el pasado.',
    context: 'Marco disse che ci ___ il giorno seguente.',
    options: ['aiuterà', 'aiutava', 'avrebbe aiutato', 'ha aiutato'],
    answer: 'avrebbe aiutato',
    explanation: 'El “futuro nel passato” se expresa con condizionale passato.',
  },
  {
    tenses: ['imperativo'],
    focus: 'Imperativo',
    prompt: 'Da una instrucción directa.',
    context: 'Paolo, ___ la porta prima di uscire!',
    options: ['chiudi', 'chiude', 'chiuderai', 'chiudesti'],
    answer: 'chiudi',
    explanation: 'Para una orden dirigida a tu se usa el imperativo: chiudi.',
  },
  {
    tenses: ['imperfetto'],
    focus: 'Imperfetto + passato prossimo',
    prompt: 'Distingue fondo y evento.',
    context: 'Mentre io ___, il telefono è squillato.',
    options: ['ho cucinato', 'cucinai', 'cucinavo', 'avevo cucinato'],
    answer: 'cucinavo',
    explanation: 'La acción en curso forma el fondo (imperfetto); el timbre la interrumpe (passato prossimo).',
  },
]

export const MICRO_STORIES: GapChallenge[] = [
  {
    title: 'Il primo caffè', focus: 'Presente', instruction: 'Completa la rutina.',
    segments: ['Ogni mattina, prima della lezione, io ', ' un caffè senza zucchero.'],
    gaps: [{ id: 'm1', tense: 'presente', verb: 'bere', answers: ['bevo'] }],
    explanation: '“Ogni mattina” indica una rutina actual: bevo.',
  },
  {
    title: 'Le chiavi', focus: 'Passato prossimo', instruction: 'Completa el hecho de esta mañana.',
    segments: ['Stamattina Marta non trova le chiavi perché le ', ' sull’autobus.'],
    gaps: [{ id: 'm2', tense: 'passato-prossimo', verb: 'dimenticare', answers: ['ha dimenticate'] }],
    explanation: 'El pronombre directo femenino plural “le” exige aquí la concordancia: le ha dimenticate.',
  },
  {
    title: 'Le estati del nonno', focus: 'Imperfetto', instruction: 'Completa el recuerdo habitual.',
    segments: ['Da bambino, mio nonno ', ' vicino al mare e pescava ogni domenica.'],
    gaps: [{ id: 'm3', tense: 'imperfetto', verb: 'abitare', answers: ['abitava'] }],
    explanation: 'El marco descriptivo y habitual del pasado pide abitava.',
  },
  {
    title: 'L’Unità d’Italia', focus: 'Passato remoto', instruction: 'Completa el hecho histórico.',
    segments: ['Nel 1861 il Regno d’Italia ', ' ufficialmente.'],
    gaps: [{ id: 'm4', tense: 'passato-remoto', verb: 'nascere', answers: ['nacque'] }],
    explanation: 'Un acontecimiento histórico cerrado se narra aquí con nacque.',
  },
  {
    title: 'La festa finita', focus: 'Trapassato prossimo', instruction: 'Completa la acción anterior.',
    segments: ['Quando siamo arrivati alla festa, quasi tutti ', '.'],
    gaps: [{ id: 'm5', tense: 'trapassato-prossimo', verb: 'andarsene', answers: ['se ne erano già andati', 'se n’erano già andati', "se n'erano già andati"] }],
    explanation: 'La salida ocurrió antes de la llegada: se ne erano già andati.',
  },
  {
    title: 'Il verdetto', focus: 'Trapassato remoto', instruction: 'Completa la secuencia literaria.',
    segments: ['Non appena il giudice ', ' la sentenza, lasciò l’aula.'],
    gaps: [{ id: 'm6', tense: 'trapassato-remoto', verb: 'firmare', answers: ['ebbe firmato'] }],
    explanation: 'Acción inmediatamente anterior a “lasciò”: ebbe firmato.',
  },
  {
    title: 'Il treno di domani', focus: 'Futuro semplice', instruction: 'Completa el plan futuro.',
    segments: ['Domani noi ', ' il primo treno per Milano.'],
    gaps: [{ id: 'm7', tense: 'futuro-semplice', verb: 'prendere', answers: ['prenderemo'] }],
    explanation: 'El sujeto noi y la proyección “domani” producen prenderemo.',
  },
  {
    title: 'La consegna', focus: 'Futuro anteriore', instruction: 'Completa lo que estará terminado.',
    segments: ['Entro venerdì voi ', ' tutti i colloqui.'],
    gaps: [{ id: 'm8', tense: 'futuro-anteriore', verb: 'concludere', answers: ['avrete concluso'] }],
    explanation: 'La acción estará completa antes del límite del viernes: avrete concluso.',
  },
  {
    title: 'Un ufficio migliore', focus: 'Condizionale presente', instruction: 'Completa la hipótesis cortés.',
    segments: ['Con una stanza più luminosa, io ', ' molto meglio.'],
    gaps: [{ id: 'm9', tense: 'condizionale-presente', verb: 'lavorare', answers: ['lavorerei'] }],
    explanation: 'La consecuencia hipotética presente se expresa con lavorerei.',
  },
  {
    title: 'La promessa di Giulia', focus: 'Condizionale passato', instruction: 'Completa el futuro desde el pasado.',
    segments: ['Giulia promise che ci ', ' appena possibile.'],
    gaps: [{ id: 'm10', tense: 'condizionale-passato', verb: 'scrivere', answers: ['avrebbe scritto'] }],
    explanation: 'Una promesa futura vista desde un punto pasado usa avrebbe scritto.',
  },
  {
    title: 'Prima di uscire', focus: 'Imperativo', instruction: 'Completa la instrucción directa.',
    segments: ['Paolo, ', ' bene tutte le finestre prima di uscire.'],
    gaps: [{ id: 'm11', tense: 'imperativo', verb: 'chiudere', answers: ['chiudi'] }],
    explanation: 'La orden dirigida a tu usa el imperativo: chiudi.',
  },
]

export const LONG_STORIES: GapChallenge[] = [
  {
    title: 'Il lunedì in redazione',
    focus: 'Presente',
    instruction: 'Completa una rutina profesional que sigue vigente.',
    segments: [
      'Ogni lunedì Marta ',
      ' in redazione alle otto, ',
      ' il calendario con la squadra, ',
      ' le priorità e poi ',
      ' il primo articolo della settimana.',
    ],
    gaps: [
      { id: 'l0a', tense: 'presente', verb: 'arrivare', answers: ['arriva'] },
      { id: 'l0b', tense: 'presente', verb: 'controllare', answers: ['controlla'] },
      { id: 'l0c', tense: 'presente', verb: 'distribuire', answers: ['distribuisce'] },
      { id: 'l0d', tense: 'presente', verb: 'rivedere', answers: ['rivede'] },
    ],
    explanation: '“Ogni lunedì” mantiene toda la secuencia en presente: arriva, controlla, distribuisce y rivede.',
  },
  {
    title: 'Una mattina storta',
    focus: 'Passato prossimo · imperfetto · trapassato prossimo',
    instruction: 'La historia ocurrió ayer. Mantén separados el evento, el fondo y el antefatto.',
    segments: [
      'Ieri Paolo ',
      ' di casa in fretta. Fuori ',
      ' e le strade erano quasi vuote. Alla fermata si è accorto che ',
      ' l’abbonamento sul tavolo, così ',
      ' indietro a prenderlo.',
    ],
    gaps: [
      { id: 'l1a', tense: 'passato-prossimo', verb: 'uscire', answers: ['è uscito'] },
      { id: 'l1b', tense: 'imperfetto', verb: 'piovere', answers: ['pioveva'] },
      { id: 'l1c', tense: 'trapassato-prossimo', verb: 'lasciare', answers: ['aveva lasciato'] },
      { id: 'l1d', tense: 'passato-prossimo', verb: 'tornare', answers: ['è tornato'] },
    ],
    explanation: 'Gli eventi principali sono “è uscito / è tornato”; “pioveva” crea lo sfondo; “aveva lasciato” è anteriore a tutto.',
  },
  {
    title: 'La lettera del conte',
    focus: 'Passato remoto · trapassato remoto',
    instruction: 'Es un relato literario cerrado. Usa el trapassato remoto solo para la acción inmediatamente anterior.',
    segments: [
      'Il conte ',
      ' la busta con mani tremanti. Non appena ',
      ' le ultime righe, ',
      ' il maggiordomo e gli ',
      ' di preparare la carrozza.',
    ],
    gaps: [
      { id: 'l2a', tense: 'passato-remoto', verb: 'aprire', answers: ['aprì'] },
      { id: 'l2b', tense: 'trapassato-remoto', verb: 'leggere', answers: ['ebbe letto'] },
      { id: 'l2c', tense: 'passato-remoto', verb: 'chiamare', answers: ['chiamò'] },
      { id: 'l2d', tense: 'passato-remoto', verb: 'ordinare', answers: ['ordinò'] },
    ],
    explanation: 'Aprì, chiamò y ordinò llevan la narración; ebbe letto señala la acción concluida justo antes de chiamò.',
  },
  {
    title: 'Il progetto di Sofia',
    focus: 'Futuro semplice · futuro anteriore',
    instruction: 'Sitúa cada acción con respecto a la graduación futura.',
    segments: [
      'Fra due anni Sofia ',
      ' ancora a Bologna. Quando ',
      ' il master, ',
      ' a Torino e lì ',
      ' il suo primo studio.',
    ],
    gaps: [
      { id: 'l3a', tense: 'futuro-semplice', verb: 'vivere', answers: ['vivrà'] },
      { id: 'l3b', tense: 'futuro-anteriore', verb: 'terminare', answers: ['avrà terminato'] },
      { id: 'l3c', tense: 'futuro-semplice', verb: 'tornare', answers: ['tornerà'] },
      { id: 'l3d', tense: 'futuro-semplice', verb: 'aprire', answers: ['aprirà'] },
    ],
    explanation: 'La conclusión del master será anterior al regreso: avrà terminato. Las demás son proyecciones simples.',
  },
  {
    title: 'Il primo giorno',
    focus: 'Condizionale · imperativo',
    instruction: 'Combina futuro en el pasado, consejo hipotético e instrucciones directas.',
    segments: [
      'Luca pensava che il nuovo lavoro ',
      ' facile. La sua tutor gli disse: «',
      ' tempo, ',
      ' con attenzione e fai domande». Al suo posto, anch’io ',
      ' molti chiarimenti.',
    ],
    gaps: [
      { id: 'l4a', tense: 'condizionale-passato', verb: 'essere', answers: ['sarebbe stato'] },
      { id: 'l4b', tense: 'imperativo', verb: 'prendersi', answers: ['prenditi'] },
      { id: 'l4c', tense: 'imperativo', verb: 'ascoltare', answers: ['ascolta'] },
      { id: 'l4d', tense: 'condizionale-presente', verb: 'chiedere', answers: ['chiederei'] },
    ],
    explanation: 'Sarebbe stato mira al futuro desde el pasado; prenditi y ascolta son órdenes; chiederei formula un consejo hipotético.',
  },
]

export const ERROR_CHALLENGES: ErrorChallenge[] = [
  {
    tense: 'passato-prossimo',
    title: 'Il ritorno di Laura', focus: 'Concordancia con essere',
    instruction: 'El auxiliar es correcto, pero el participio no concuerda con el sujeto.',
    chunks: [
      { before: 'Ieri Laura ', id: 'e0a', form: 'è tornato' },
      { before: ' tardi, ', id: 'e0b', form: 'ha cenato' },
      { before: ' e poi ', id: 'e0c', form: 'ha telefonato' },
    ],
    after: ' a sua madre.', wrongId: 'e0a', answers: ['è tornata'],
    explanation: 'Con Laura y el auxiliar essere, el participio concuerda en femenino singular: “è tornata”.',
  },
  {
    tense: 'imperfetto',
    title: 'La telefonata', focus: 'Elección del tiempo',
    instruction: 'Una acción en curso fue interrumpida. Selecciona el verbo que rompe la lógica.',
    chunks: [
      { before: 'Ieri, mentre ', id: 'e1a', form: 'ho preparato' },
      { before: ' la cena, il telefono ', id: 'e1b', form: 'è squillato' },
      { before: ' e io ', id: 'e1c', form: 'ho risposto' },
    ],
    after: ' subito.', wrongId: 'e1a', answers: ['preparavo'],
    explanation: 'La preparación estaba en curso: “mentre preparavo”. Los dos eventos puntuales quedan en passato prossimo.',
  },
  {
    tense: 'trapassato-prossimo',
    title: 'Il cinema', focus: 'Anterioridad',
    instruction: 'El inicio de la película ocurrió antes de la llegada.',
    chunks: [
      { before: 'Quando ', id: 'e2a', form: 'siamo arrivati' },
      { before: ' al cinema, il film ', id: 'e2b', form: 'è già iniziato' },
      { before: ' e molti spettatori ', id: 'e2c', form: 'erano seduti' },
    ],
    after: '.', wrongId: 'e2b', answers: ['era già iniziato'],
    explanation: 'La película ya había empezado: trapassato prossimo “era già iniziato”.',
  },
  {
    tense: 'passato-remoto',
    title: 'Una biografia', focus: 'Ortografía del passato remoto',
    instruction: 'El tiempo es correcto, pero una forma irregular está mal escrita.',
    chunks: [
      { before: 'Dante ', id: 'e3a', form: 'nacque' },
      { before: ' a Firenze, ', id: 'e3b', form: 'scrisse' },
      { before: ' la Commedia e ', id: 'e3c', form: 'mori' },
    ],
    after: ' a Ravenna.', wrongId: 'e3c', answers: ['morì'],
    explanation: 'La tercera persona del passato remoto de morire lleva acento final: “morì”.',
  },
  {
    tense: 'trapassato-remoto',
    title: 'Il telegramma', focus: 'Trapassato remoto',
    instruction: 'La narración literaria exige una acción inmediatamente anterior a “partì”.',
    chunks: [
      { before: 'Non appena ', id: 'e4a', form: 'aveva letto' },
      { before: ' il telegramma, Elena ', id: 'e4b', form: 'partì' },
      { before: ' e non ', id: 'e4c', form: 'tornò' },
    ],
    after: ' più.', wrongId: 'e4a', answers: ['ebbe letto'],
    explanation: 'En esta secuencia literaria, “non appena ebbe letto” precede inmediatamente a “partì”.',
  },
  {
    tense: 'futuro-anteriore',
    title: 'La scadenza', focus: 'Ortografía del futuro',
    instruction: 'Detecta el acento escrito a la española.',
    chunks: [
      { before: 'Domani lo ', id: 'e5a', form: 'invierò' },
      { before: ' quando il direttore ', id: 'e5b', form: 'arriverà' },
      { before: ', perché a quest’ora ', id: 'e5c', form: 'avró finito' },
    ],
    after: ' il rapporto.', wrongId: 'e5c', answers: ['avrò finito'],
    explanation: 'En italiano la primera persona del futuro lleva acento grave: avrò, no avró.',
  },
  {
    tense: 'futuro-semplice',
    title: 'Il viaggio di domani', focus: 'Persona del futuro',
    instruction: 'El sujeto es noi. Corrige la forma que está conjugada para otra persona.',
    chunks: [
      { before: 'Domani noi ', id: 'e5da', form: 'visiteremo' },
      { before: ' il museo, poi ', id: 'e5db', form: 'pranzeremo' },
      { before: ' e infine ', id: 'e5dc', form: 'tornerà' },
    ],
    after: ' in albergo.', wrongId: 'e5dc', answers: ['torneremo'],
    explanation: 'Con el sujeto noi, la primera persona plural del futuro semplice es “torneremo”.',
  },
  {
    tense: 'condizionale-passato',
    title: 'La promessa', focus: 'Futuro nel passato',
    instruction: 'El punto de referencia es pasado; corrige la proyección posterior.',
    chunks: [
      { before: 'Marta ', id: 'e6a', form: 'disse' },
      { before: ' che ci ', id: 'e6b', form: 'chiamerà' },
      { before: ' e ', id: 'e6c', form: 'confermò' },
    ],
    after: ' il nostro indirizzo.', wrongId: 'e6b', answers: ['avrebbe chiamato'],
    explanation: 'Desde “disse”, la llamada futura se expresa con condizionale passato: avrebbe chiamato.',
  },
  {
    tense: 'condizionale-presente',
    title: 'Un consiglio', focus: 'Consejo hipotético',
    instruction: 'La frase da un consejo, no anuncia una decisión futura.',
    chunks: [
      { before: 'Al tuo posto io ', id: 'e6da', form: 'chiederei' },
      { before: ' un preventivo, ', id: 'e6db', form: 'confronterò' },
      { before: ' i prezzi e poi ', id: 'e6dc', form: 'deciderei' },
    ],
    after: ' con calma.', wrongId: 'e6db', answers: ['confronterei'],
    explanation: '“Al tuo posto” introduce un consejo hipotético: “confronterò” no encaja; se necesita “confronterei”.',
  },
  {
    tense: 'presente',
    title: 'La lezione', focus: 'Ortografía del presente',
    instruction: 'Una forma necesita el acento que la distingue de una preposición.',
    chunks: [
      { before: 'Ogni lunedì Lucia ', id: 'e7a', form: 'dà' },
      { before: ' una lezione, poi ', id: 'e7b', form: 'corregge' },
      { before: ' gli esercizi e ', id: 'e7c', form: 'risponda' },
    ],
    after: ' alle domande.', wrongId: 'e7c', answers: ['risponde'],
    explanation: 'La secuencia habitual está en presente indicativo: “risponde”, no “risponda”.',
  },
  {
    tense: 'imperativo',
    title: 'Alla reception', focus: 'Imperativo formale',
    instruction: 'La recepcionista trata al cliente de Lei. Repara la orden demasiado informal.',
    chunks: [
      { before: 'Signore, ', id: 'e8a', form: 'mi dica' },
      { before: ' il suo cognome, ', id: 'e8b', form: 'controlla' },
      { before: ' i dati e poi ', id: 'e8c', form: 'firmi' },
    ],
    after: ' qui.', wrongId: 'e8b', answers: ['controlli'],
    explanation: 'Con el tratamiento formal Lei, el imperativo formal exige “controlli”.',
  },
]

export const TIMELINE_CHALLENGES: TimelineChallenge[] = [
  {
    title: 'Arrivo a Firenze', focus: 'Tres capas del pasado',
    context: 'Asigna cada cláusula a su función dentro del relato.',
    slots: [
      { id: 't1a', tense: 'trapassato-prossimo', label: 'Antefatto', hint: 'Ya había ocurrido', answer: 'Avevo prenotato una stanza.' },
      { id: 't1b', tense: 'imperfetto', label: 'Sfondo', hint: 'Situación en curso', answer: 'Pioveva da ore.' },
      { id: 't1c', tense: 'passato-prossimo', label: 'Evento', hint: 'Hace avanzar la historia', answer: 'Sono arrivato a Firenze.' },
    ],
    options: ['Sono arrivato a Firenze.', 'Avevo prenotato una stanza.', 'Pioveva da ore.'],
    explanation: 'Trapassato prossimo para el antefatto, imperfetto para el fondo y passato prossimo para el evento.',
  },
  {
    title: 'Fuga dal palazzo', focus: 'Secuencia literaria',
    context: 'Ordena una cadena de acciones cerradas narrada en registro literario.',
    slots: [
      { id: 't2a', tense: 'trapassato-remoto', label: 'Subito prima', hint: 'Acción ya concluida', answer: 'Ebbe nascosto la lettera.' },
      { id: 't2b', tense: 'passato-remoto', label: 'Evento centrale', hint: 'Primer avance', answer: 'Uscì dal palazzo.' },
      { id: 't2c', tense: 'passato-remoto', label: 'Evento successivo', hint: 'Siguiente avance', answer: 'Attraversò la piazza.' },
    ],
    options: ['Attraversò la piazza.', 'Ebbe nascosto la lettera.', 'Uscì dal palazzo.'],
    explanation: 'Ebbe nascosto abre la secuencia como trapassato remoto; uscì y attraversò continúan en passato remoto.',
  },
  {
    title: 'La consegna di domani', focus: 'Mapa del futuro',
    context: 'Distingue preparación presente, proyección y resultado ya cumplido.',
    slots: [
      { id: 't3a', tense: 'presente', label: 'Adesso', hint: 'Preparación actual', answer: 'Preparo gli allegati.' },
      { id: 't3b', tense: 'futuro-semplice', label: 'Domani', hint: 'Acción futura', answer: 'Presenterò il progetto.' },
      { id: 't3c', tense: 'futuro-anteriore', label: 'Entro mezzogiorno', hint: 'Resultado completado', answer: 'Avrò inviato tutto.' },
    ],
    options: ['Avrò inviato tutto.', 'Preparo gli allegati.', 'Presenterò il progetto.'],
    explanation: 'Presente para lo que ocurre ahora, futuro semplice para la acción y futuro anteriore para el límite cumplido.',
  },
  {
    title: 'Il consiglio della tutor', focus: 'Modalidad y tiempo',
    context: 'Cada forma cumple una intención distinta. Asígnala a su función.',
    slots: [
      { id: 't4a', tense: 'condizionale-passato', label: 'Piano riferito', hint: 'Futuro visto desde el pasado', answer: 'Avrebbe aperto lo studio a maggio.' },
      { id: 't4b', tense: 'condizionale-presente', label: 'Consiglio', hint: 'Sugerencia hipotética', answer: 'Io chiederei un preventivo.' },
      { id: 't4c', tense: 'imperativo', label: 'Istruzione', hint: 'Orden directa', answer: 'Confronta almeno tre offerte.' },
    ],
    options: ['Confronta almeno tre offerte.', 'Io chiederei un preventivo.', 'Avrebbe aperto lo studio a maggio.'],
    explanation: 'Condizionale passato para el plan referido, condizionale presente para el consejo e imperativo para la instrucción.',
  },
]

export const FINAL_CHALLENGE: BankChallenge = {
  title: 'Il manoscritto di Trieste',
  instruction: 'Selecciona un espacio y después una tarjeta. Cada forma se usa una sola vez.',
  segments: [
    'Nel 1912 Elena ',
    ' a Trieste e lavorava in una piccola biblioteca. Un pomeriggio ',
    ' una busta senza mittente. Quando l’aprì, qualcuno ',
    ' il nome del destinatario. Non appena Elena ',
    ' il messaggio, ',
    ' di cercare l’autore. Il foglio diceva: «Domani ',
    ' per Vienna e, quando sarai arrivata, ',
    ' ogni cosa». Un collega le suggerì: «Al tuo posto, ',
    ' aiuto all’archivista. E ',
    ' questo sigillo». Elena ',
    ' aspettare, ma il treno partì quella stessa notte. Oggi gli storici ',
    ' la busta e il documento ',
    ' che la storia era vera.',
  ],
  gaps: [
    { id: 'f1', tenseId: 'imperfetto', tense: 'Imperfetto', answer: 'viveva' },
    { id: 'f2', tenseId: 'passato-remoto', tense: 'Passato remoto', answer: 'ricevette' },
    { id: 'f3', tenseId: 'trapassato-prossimo', tense: 'Trapassato prossimo', answer: 'aveva cancellato' },
    { id: 'f4', tenseId: 'trapassato-remoto', tense: 'Trapassato remoto', answer: 'ebbe letto' },
    { id: 'f5', tenseId: 'passato-remoto', tense: 'Passato remoto', answer: 'decise' },
    { id: 'f6', tenseId: 'futuro-semplice', tense: 'Futuro semplice', answer: 'partirai' },
    { id: 'f7', tenseId: 'futuro-anteriore', tense: 'Futuro anteriore', answer: 'avrai capito' },
    { id: 'f8', tenseId: 'condizionale-presente', tense: 'Condizionale presente', answer: 'chiederei' },
    { id: 'f9', tenseId: 'imperativo', tense: 'Imperativo negativo', answer: 'non perdere' },
    { id: 'f10', tenseId: 'condizionale-passato', tense: 'Condizionale passato', answer: 'avrebbe preferito' },
    { id: 'f11', tenseId: 'passato-prossimo', tense: 'Passato prossimo', answer: 'hanno ritrovato' },
    { id: 'f12', tenseId: 'presente', tense: 'Presente', answer: 'dimostra' },
  ],
  bank: [
    'avrai capito', 'viveva', 'non perdere', 'hanno ritrovato',
    'ricevette', 'chiederei', 'dimostra', 'ebbe letto',
    'partirai', 'aveva cancellato', 'avrebbe preferito', 'decise',
  ],
  explanation: 'El relato recorre once formas sin subjuntivo: descripción, hechos, dos grados de anterioridad, proyecciones, modalidad y orden.',
}
