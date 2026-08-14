// ─── Il quaderno del nonno — Historia B1–B2 en italiano ───────────────────────
// Adaptación nativa de «The Grandfather's Ledger». Quien reclama los regalos es
// el ABUELO (Franco) en las tres capas: narrador, transcripciones y preguntas.
//
// AUDIO: /audio/historias/italiano/il-quaderno-del-nonno/{a,b}.mp3
// a con voz de mujer (Chiara), b con voz de hombre mayor (Franco).

import type { Historia, StoryQuestion as Question } from '../types';

const DICT: Record<string, string> = {
  quaderno: 'cuaderno / libreta',
  registro: 'registro / libro de cuentas',
  foglio: 'hoja (de cálculo)',
  tabella: 'tabla',
  scontrino: 'recibo / tique',
  scontrini: 'recibos / tiques',
  passeggino: 'cochecito de bebé',
  cameretta: 'cuarto del bebé',
  culla: 'cuna',
  cassettiera: 'cómoda',
  mobili: 'muebles',
  giocattoli: 'juguetes',
  università: 'universidad',
  risparmio: 'ahorro',
  fondo: 'fondo (de dinero)',
  nonno: 'abuelo',
  nonna: 'abuela',
  nipote: 'nieto/a / sobrino/a',
  nipotino: 'nietecito',
  nuora: 'nuera',
  suocero: 'suegro',
  incinta: 'embarazada',
  gravidanza: 'embarazo',
  patrimonio: 'patrimonio',
  beni: 'bienes',
  investito: 'invertido',
  investimento: 'inversión',
  generoso: 'generoso',
  generosità: 'generosidad',
  tirchio: 'tacaño',
  avido: 'codicioso / ávido',
  cattivo: 'malo / el malo de la película',
  mostro: 'monstruo',
  inventario: 'inventario',
  magazzino: 'almacén / bodega',
  merce: 'mercancía',
  organizzato: 'organizado',
  scartoffie: 'papeleo',
  atteggiamento: 'actitud',
  riconoscenza: 'gratitud / reconocimiento',
  gratitudine: 'gratitud',
  tramandare: 'pasar de generación en generación',
  tramandati: 'transmitidos / heredados',
  generazione: 'generación',
  generazioni: 'generaciones',
  rifiutato: 'se negó / rechazó',
  rifiuto: 'negativa',
  scioccato: 'impactado / sorprendido',
  sbigottito: 'atónito / pasmado',
  indignata: 'indignada',
  difensiva: 'a la defensiva',
  rimprovero: 'reproche',
  lite: 'discusión / pelea',
  conflitto: 'conflicto',
  intenzione: 'intención',
  premeditato: 'premeditado',
  premeditazione: 'premeditación',
  prova: 'prueba',
  percezione: 'percepción',
  supposizione: 'suposición',
  aspettativa: 'expectativa',
  condizione: 'condición',
  incondizionato: 'incondicional',
  regalo: 'regalo',
  regali: 'regalos',
  prestito: 'préstamo',
  ragionevole: 'razonable',
  giusto: 'justo',
  giustizia: 'justicia',
  assurdo: 'absurdo',
  pazzesco: 'de locos / demencial',
  reato: 'delito',
  scusa: 'excusa / disculpa',
  ironia: 'ironía',
  sarcasmo: 'sarcasmo',
  retorica: 'retórica',
  tono: 'tono',
  apparentemente: 'aparentemente / al parecer',
  evidentemente: 'por lo visto / evidentemente',
  improvvisamente: 'de repente',
  onestamente: 'honestamente',
  economicamente: 'económicamente',
  presentato: 'se presentó / apareció',
  prendono: 'toman / cogen (in giro: se burlan)',
  davvero: 'de verdad',
};

const NARRATOR_PARAGRAPHS = [
  'Tre anni fa, quando è nato il piccolo Leo, il nonno Franco è stato quello che ha speso di più in tutta la famiglia.',
  'Ha comprato quasi tutto: un passeggino di lusso, tutti i mobili della cameretta, giocattoli costosi — e ha perfino aperto un fondo per l\'università.',
  'Tutti pensavano che fosse semplicemente generoso.',
  'Poi la figlia di Franco, Sara, ha annunciato di essere incinta.',
  'Improvvisamente, Franco ha cominciato a dire che alcune cose di Leo si potevano «condividere» con il bambino in arrivo.',
  'Qualche settimana dopo si è presentato a casa del figlio e della nuora con una tabella in cui c\'era ogni regalo costoso che avesse mai comprato.',
  'Ha chiesto indietro migliaia di euro di roba.',
  'La nuora ha detto di no.',
  'Adesso le due parti raccontano versioni molto diverse di quello che è successo.',
];

const A_PARAGRAPHS = [
  'Guarda, sto ancora tremando.',
  'Lo sai che il padre di Andrea aveva comprato tutto quando è nato Leo? Il passeggino, i mobili della cameretta, tutti quei regali costosi che voleva assolutamente comprare lui.',
  'Ora spiegami perché quest\'uomo si è presentato a casa mia ieri con una tabella stampata.',
  'Una tabella.',
  'Non sto scherzando.',
  'Si è seduto al tavolo della mia cucina e ha cominciato a passare voce per voce, come se stesse facendo l\'inventario in un magazzino.',
  'Il passeggino. La culla. La cassettiera. Perfino i soldi che aveva messo nel fondo per l\'università di Leo.',
  'E poi mi dice, serissimo: «mi sembra giusto che una parte adesso vada al bambino di Sara».',
  'E io lì che penso... giusto per chi?',
  'Perché Leo le usa, quelle cose. Tutti i giorni.',
  'Non sono scatoloni fermi in cantina. Sono le sue cose.',
  'Poi comincia a dire che ha investito un sacco di soldi e che il patrimonio di famiglia deve restare in famiglia.',
  'Il patrimonio di famiglia?',
  'Senta, quello è suo nipote, non un portafoglio immobiliare.',
  'E a quel punto tira fuori gli scontrini.',
  'Gli scontrini.',
  'Di tre anni fa.',
  'Chi tiene gli scontrini dei regali di un neonato, se non pensa di riprenderseli un giorno?',
  'Era tutto pazzesco.',
  'La parte peggiore è che sembrava davvero sbigottito quando gli ho detto di no.',
  'Come se si aspettasse sul serio che io restituissi le cose di mio figlio perché sta arrivando un altro nipote.',
  'Ti giuro: se avesse semplicemente chiesto se a Leo era rimasto qualcosa che non usa più, l\'avrei aiutato volentieri.',
  'Ma presentarsi con le scartoffie e un piano di recupero?',
  'Assolutamente no.',
];

const B_PARAGRAPHS = [
  'Devo raccontare a qualcuno com\'è andata davvero, perché evidentemente adesso il cattivo sono io.',
  'Tre anni fa, quando è nato Leo, ho speso una fortuna per aiutare quei ragazzi.',
  'Una fortuna.',
  'Non perché qualcuno mi abbia costretto. Perché volevo che mio nipote avesse tutto.',
  'Solo i mobili della cameretta sono costati più della mia prima macchina.',
  'Mi sono lamentato? No.',
  'Ho mai chiesto riconoscenza? No.',
  'Adesso mia figlia Sara aspetta il primo figlio, ed è in difficoltà economicamente.',
  'Allora ho pensato che qualcuna delle cose costose che ormai non si usano quasi più si potesse tramandare.',
  'Come fanno le famiglie da generazioni.',
  'Invece Chiara ha reagito come se stessi cercando di rapinare una banca.',
  'Non ho mai detto che rivolevo indietro ogni singola cosa.',
  'Ho detto che forse potevamo parlare di condividere qualcuna delle cose più grandi.',
  'Ma nel secondo in cui ho nominato il passeggino, si è messa sulla difensiva.',
  'E onestamente?',
  'Quello che mi ha dato fastidio non erano nemmeno le cose.',
  'Era l\'atteggiamento.',
  'La totale mancanza di riconoscenza.',
  'Per tre anni li ho guardati godersi cose che ho pagato io, e nel momento in cui propongo di aiutare un altro nipote, all\'improvviso sono un vecchio avido senza cuore.',
  'E poi tutti prendono in giro la mia tabella.',
  'Scusate se sono organizzato.',
  'Quando si parla di decine di migliaia di euro, forse scrivere le cose non è la cosa più assurda del mondo.',
  'Non volevo togliere niente a Leo.',
  'Volevo aiutare Sara.',
  'Ma in questa famiglia, a quanto pare, adesso è un reato.',
];

const NARRATOR_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: 'Il narratore dice che Franco ha comprato «un passeggino di lusso». Che cosa segnala questa scelta?',
    opts: [
      'Comprava cose pratiche e a buon mercato, badando soprattutto a non spendere troppo',
      'Spendeva cifre alte, su prodotti costosi e di fascia alta',
      'Preferiva comprare usato per risparmiare sui mobili della cameretta',
      'Comprava solo articoli in saldo, aspettando le offerte di fine stagione',
    ],
    correct: 1,
    explanation:
      '«Di lusso» marca producto caro y premium. Indica que Franco gastó muchísimo más de lo que gasta quien simplemente hace un regalo.',
  },
  {
    type: 'Inferencia',
    q: 'Il narratore usa «Improvvisamente» per descrivere il cambiamento di Franco. Che cosa implica?',
    opts: [
      'Il cambiamento è maturato piano piano ed era atteso da tempo',
      "Franco aveva sempre pianificato di riprendersi le cose, e per questo conservava gli scontrini fin dall'inizio",
      "Il cambio è arrivato subito dopo un evento preciso: la gravidanza della figlia",
      'Sara ha chiesto personalmente le cose a Franco appena ha saputo di essere incinta',
    ],
    correct: 2,
    explanation:
      '«Improvvisamente» contrasta con tres años de generosidad e implica que la motivación de Franco cambió justo cuando su propia hija quedó embarazada — no poco a poco.',
  },
  {
    type: 'Comprensión',
    q: 'Che cosa conteneva la tabella di Franco?',
    opts: [
      'La lista degli acquisti futuri per il nuovo bambino',
      'Ogni regalo costoso che avesse mai comprato',
      'Il bilancio familiare degli ultimi tre anni',
      'Un contratto fra Franco e suo figlio',
    ],
    correct: 1,
    explanation:
      'El narrador dice: «con una tabella in cui c\'era ogni regalo costoso che avesse mai comprato».',
  },
  {
    type: 'Pensamiento crítico',
    q: '«Tutti pensavano che fosse semplicemente generoso.» Che cosa suggerisce «semplicemente»?',
    opts: [
      'Franco era chiaramente generoso, senza nessun secondo fine nascosto',
      "Dietro quella generosità forse c'era altro, che allora non si è visto",
      'La famiglia sapeva da sempre che Franco poneva delle condizioni',
      'Franco cercava apertamente di controllare la famiglia con i suoi regali',
    ],
    correct: 1,
    explanation:
      '«Semplicemente» sugiere que las apariencias engañaban: deja abierta la posibilidad de que aquella generosidad llevara condiciones que nadie vio hasta ahora.',
  },
];

const A_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: 'Chiara paragona la visita di Franco a «l\'inventario in un magazzino». Che cosa fa questo paragone?',
    opts: [
      'Metafora — identifica la visita con un inventario, senza parole di paragone',
      'Similitudine — lo dipinge freddo e commerciale, come se i regali fossero merce recuperabile',
      'Iperbole — sta solo esagerando per far ridere chi la ascolta',
      'Personificazione — dà tratti umani alla tabella e agli scontrini',
    ],
    correct: 1,
    explanation:
      'La comparación le quita a la visita todo el calor familiar. Equipararla a un recuento de almacén muestra que Chiara vivió la escena como una transacción, no como una conversación de familia.',
  },
  {
    type: 'Inferencia',
    q: '«Chi tiene gli scontrini dei regali di un neonato?» Che cosa sottintende questa domanda retorica?',
    opts: [
      'Che tutti dovrebbero conservare gli scontrini dei regali importanti',
      'Che Franco è solo molto ordinato e conserva per abitudine ogni scontrino che gli capita',
      'Che gli scontrini provano che Franco pensava di riprendersi le cose fin dall\'inizio',
      'Che Chiara ha perso i propri scontrini e non può verificare niente',
    ],
    correct: 2,
    explanation:
      'Una pregunta retórica no espera respuesta: dicta un veredicto. Chiara la usa para convertir los tiques en prueba de premeditación, no en simple orden.',
  },
  {
    type: 'Tono',
    q: 'Come descriveresti meglio il tono del messaggio vocale di Chiara?',
    opts: [
      'Calmo e analitico, come chi espone i fatti in ordine',
      'Carico di emozione, indignato e incredulo',
      'Triste e pieno di rimpianti per come sono andate le cose',
      'Formale e professionale, come una mail di lavoro',
    ],
    correct: 1,
    explanation:
      '«Sto ancora tremando», las frases de una sola palabra («Una tabella.», «Gli scontrini.») y el sarcasmo («non un portafoglio immobiliare») marcan indignación emocional, no análisis.',
  },
  {
    type: 'Comprensión',
    q: 'Secondo Chiara, quale richiesta di Franco SAREBBE stata accettabile?',
    opts: [
      'Portare una tabella dettagliata di tutti i regali fatti',
      'Pretendere subito indietro il passeggino e la culla di Leo',
      'Chiedere se a Leo era rimasto qualcosa che non usa più',
      'Mandare una richiesta scritta formale invece di presentarsi a casa',
    ],
    correct: 2,
    explanation:
      'Ella lo dice: «se avesse semplicemente chiesto se a Leo era rimasto qualcosa che non usa più, l\'avrei aiutato volentieri». El CÓMO pesó tanto como el QUÉ.',
  },
  {
    type: 'Registro',
    q: '«Senta, quello è suo nipote, non un portafoglio immobiliare.» Che cosa sta facendo Chiara?',
    opts: [
      'Parla seriamente del portafoglio immobiliare di Franco, che ha nominato lui poco prima',
      "Usa l'ironia e passa di colpo al «lei» per smascherare il suo modo commerciale di vedere la famiglia",
      'Approva educatamente il suo punto di vista e usa il «lei» per mostrargli rispetto davanti a una questione di soldi',
      'Cita la tabella parola per parola, riprendendo le voci che Franco le ha letto',
    ],
    correct: 1,
    explanation:
      'Dos golpes a la vez: el vocabulario financiero («portafoglio») se burla de su forma de tratar a la familia como cartera de inversión, y el paso repentino al «lei» convierte la cortesía en distancia.',
  },
];

const B_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: 'Franco dice che le cose si potrebbero «tramandare». A quale tradizione rimanda questa parola?',
    opts: [
      'Riportare un articolo in negozio per ottenere il rimborso dello scontrino',
      "L'usanza familiare di passare i beni da un membro all'altro fra le generazioni",
      'Una procedura legale di successione, con cui i beni passano agli eredi dopo una morte',
      'Donare le cose in beneficenza a chi ne ha più bisogno',
    ],
    correct: 1,
    explanation:
      '«Tramandare» invoca una costumbre familiar, no una devolución. Franco presenta su petición como práctica cultural, no como exigencia económica.',
  },
  {
    type: 'Comprensión',
    q: 'Secondo Franco, che cosa ha chiesto esattamente — a differenza di quanto racconta Chiara?',
    opts: [
      'Ogni singola voce della sua lista, subito indietro',
      "Solo i soldi messi nel fondo per l'università",
      'Una conversazione sul condividere qualcuna delle cose più grandi',
      'Delle scuse scritte da Chiara e Andrea',
    ],
    correct: 2,
    explanation:
      'Franco dice: «Non ho mai detto che rivolevo indietro ogni singola cosa. Ho detto che forse potevamo parlare…». Contradice directamente el relato de Chiara.',
  },
  {
    type: 'Inferencia',
    q: '«Quello che mi ha dato fastidio non erano nemmeno le cose. Era l\'atteggiamento.» Che cosa rivela?',
    opts: [
      'Finge soltanto che gli oggetti non gli interessino, per non sembrare avido',
      'Si sente disprezzato sul piano affettivo, nonostante anni di generosità',
      'Vuole allontanare Chiara e mettere il figlio contro di lei',
      'Si pente di aver comprato tutti quei regali così costosi',
    ],
    correct: 1,
    explanation:
      'Al separar «le cose» de «l\'atteggiamento», Franco deja claro que la herida emocional —sentirse desechado tras años de dar— le pesa más que el dinero.',
  },
  {
    type: 'Tono',
    q: '«Scusate se sono organizzato.» Che tono ha questa frase?',
    opts: [
      'Vero pentimento per aver portato la tabella',
      "Difesa sarcastica — non pensa di aver sbagliato",
      'Confusione sincera sul perché tutti siano arrabbiati',
      'Registro accademico e formale, da relazione',
    ],
    correct: 1,
    explanation:
      'Es una no-disculpa: tiene forma de disculpa y contenido de reproche. Defiende su acto mientras insinúa que criticarle la tabla es ridículo.',
  },
  {
    type: 'Vocabulario',
    q: '«Evidentemente adesso il cattivo sono io.» Che cosa rivela la parola «cattivo»?',
    opts: [
      'Ammette del tutto di aver sbagliato e accetta il ruolo che la famiglia gli ha dato',
      "Si sente messo ingiustamente nel ruolo del cattivo di una storia che raccontano gli altri",
      'Usa un termine giuridico tecnico, come se ci fosse un processo in corso',
      "Cerca pietà con l'adulazione, per farsi perdonare dalla nuora",
    ],
    correct: 1,
    explanation:
      '«Il cattivo» es vocabulario de cuento, no de vida real. Franco lo usa para decir que le han asignado un papel narrativo injusto: es un personaje en la historia que cuentan otros.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Síntesis',
    q: 'Su quale fatto Chiara e Franco sono D\'ACCORDO?',
    opts: [
      'Franco voleva riprendersi definitivamente tutte le cose elencate nella tabella',
      'Chiara aveva già offerto spontaneamente di condividere qualcosa',
      'Franco è arrivato con una tabella',
      'Sara ha chiesto le cose di persona',
    ],
    correct: 2,
    explanation:
      'La tabla es el único dato objetivo que confirman las dos versiones. Todo lo demás —intención, tono, alcance— está en disputa.',
  },
  {
    type: 'Perspectiva',
    q: 'Il narratore dice che Franco «ha chiesto indietro migliaia di euro di roba». Franco dice di aver «proposto di parlarne». Che cosa mostra questa distanza?',
    opts: [
      'Il narratore è ostile a Franco e ne racconta la versione peggiore',
      "C'è una differenza forte fra l'intenzione dichiarata di Franco e come la richiesta è stata percepita",
      'Chiara ha inventato quasi tutto per farsi dare ragione da chi ascolta',
      'Il narratore ha sbagliato i fatti, perché nessuno ha mai chiesto indietro migliaia di euro di roba',
    ],
    correct: 1,
    explanation:
      'Intención frente a impacto. Franco creía estar abriendo una conversación; Chiara (y el narrador) lo vivieron como una exigencia. Esa distancia es el motor de todo el conflicto.',
  },
  {
    type: 'Pensamiento crítico',
    q: 'Qual è la causa PROFONDA più precisa di questo conflitto?',
    opts: [
      "L'avidità di Franco, che ha voluto indietro regali fatti tre anni prima",
      "L'ingratitudine di Chiara, che per tre anni si è goduta cose pagate da Franco senza mai ringraziarlo davvero",
      'Quando i regali sono stati fatti non si è mai parlato di che cosa ci si aspettava',
      'La decisione di Sara di avere un figlio in un momento economicamente difficile',
    ],
    correct: 2,
    explanation:
      '¿Eran regalos o préstamos con condiciones? Que nadie fijara ese límite en su momento —y no la avaricia ni la ingratitud por separado— es la causa estructural de la disputa.',
  },
  {
    type: 'Inferencia',
    q: 'Chiara dice che Franco sembrava «davvero sbigottito» davanti al rifiuto. Che cosa suggerisce questa reazione?',
    opts: [
      'Fingeva la sorpresa come tattica, per farla sentire in colpa',
      "Non aveva davvero previsto che qualcuno potesse trovare la sua richiesta fuori luogo",
      'Sapeva già che Chiara avrebbe detto di no e la stava mettendo alla prova',
      'In tutta la sua vita nessuno gli ha mai negato niente',
    ],
    correct: 1,
    explanation:
      'El asombro genuino revela que Franco opera con un conjunto de supuestos completamente distinto: no esperaba una negativa porque, dentro de su marco, su petición era razonable.',
  },
  {
    type: 'Registro',
    q: 'Franco chiama il figlio e la nuora «quei ragazzi». Che cosa suggerisce questa scelta?',
    opts: [
      'Suo figlio e Chiara sono davvero molto giovani, poco più che ragazzi',
      "Franco si vede come l'autorità e loro come persone meno esperte che lui ha aiutato",
      'Franco ha dimenticato i loro nomi mentre registrava il messaggio',
      "In italiano «quei ragazzi» è un'espressione formale e affettuosa, che segnala rispetto verso i più giovani",
    ],
    correct: 1,
    explanation:
      'Llamarlos «quei ragazzi» los infantiliza: los coloca como receptores de su dinero y su criterio, no como iguales. Refuerza en voz baja su sensación de autoridad.',
  },
];

const KEY_LANGUAGE = [
  { phrase: "fare l'inventario", meaning: 'hacer recuento de existencias — aquí, aplicado a una familia' },
  { phrase: 'tramandare', meaning: 'pasar algo a otro miembro de la familia, de generación en generación' },
  { phrase: 'domanda retorica', meaning: 'pregunta que no espera respuesta: dicta un veredicto' },
  { phrase: 'Scusate se sono…', meaning: 'no-disculpa: forma de disculpa, contenido de reproche' },
  { phrase: 'passare al «lei»', meaning: 'usar el trato formal de golpe: cortesía convertida en distancia' },
];

export const ilQuadernoDelNonno: Historia = {
  slug: 'il-quaderno-del-nonno',
  lang: 'italiano',
  icon: '🎙️',
  color: '#059669',
  level: 'B1–B2',
  title: 'Il quaderno del nonno',
  tagline: 'Lo pagó todo cuando nació el nieto. Tres años después llegó con la tabla impresa.',
  metaTitle: 'Il quaderno del nonno — comprensión en italiano B1–B2',
  metaDescription:
    
    
    'Lo pagó todo cuando nació el nieto. Tres años después llegó con la tabla impresa. Dos audios, transcripción y 19 preguntas en italiano B1–B2.',
  intro:
    'Un conflicto de familia. Dos versiones. Tú decides quién tiene razón. Lee el relato del narrador, escucha las dos notas de voz y responde 19 preguntas de vocabulario, inferencia, tono y pensamiento crítico.',
  narrator: {
    paragraphs: NARRATOR_PARAGRAPHS,
    questions: NARRATOR_QS,
    tip: 'Fíjate en las palabras y en el momento en que pasan las cosas: el narrador no es neutral. Busca las pistas de hacia qué lado se inclina el idioma que usa.',
  },
  voices: [
    {
      key: 'a',
      name: 'Chiara',
      role: 'la nuora',
      sex: 'female',
      color: '#0f3d8c',
      audioSrc: '/audio/historias/italiano/il-quaderno-del-nonno/a.mp3',
      paragraphs: A_PARAGRAPHS,
      questions: A_QS,
      listenHint: 'Escucha con atención. Todavía no hay transcripción — concéntrate en lo que puedas entender.',
      transcriptHint: 'las marcas y ves su traducción. Después vuelve a escribir lo que entendiste.',
      write1Prompt: 'Sin mirar ninguna transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Chiara.',
      write1Hint: 'No te preocupes por que salga perfecto: es una primera impresión. Escribe en español o en italiano.',
      write2Prompt: 'Ahora escríbelo otra vez — esta vez puedes entrar en más detalle.',
    },
    {
      key: 'b',
      name: 'Franco',
      role: 'il suocero',
      sex: 'male',
      color: '#7c3aed',
      audioSrc: '/audio/historias/italiano/il-quaderno-del-nonno/b.mp3',
      paragraphs: B_PARAGRAPHS,
      questions: B_QS,
      listenHint: 'Escucha primero sin transcripción. Esta es la otra mitad del conflicto.',
      transcriptHint: 'compara la versión de Franco con la de Chiara: ¿en qué coinciden? ¿Dónde se contradicen?',
      write1Prompt: 'Sin la transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Franco.',
      write1Hint: '¿Qué dice él que pasó de verdad? Escribe en español o en italiano.',
      write2Prompt: 'Ahora escribe otra vez lo que entendiste desde la perspectiva de Franco.',
    },
  ],
  finalQuestions: FINAL_QS,
  finalIntro: [
    'Estas preguntas te piden sostener las dos versiones a la vez y pensar con calma qué pasó, por qué, y cómo el idioma que elige cada uno moldea lo que creemos que pasó.',
  ],
  dict: DICT,
  keyLanguage: KEY_LANGUAGE,
  discussion: {
    question: 'Después de oír a los dos: ¿quién tiene el argumento más fuerte, y por qué?',
    note: 'No hay una única respuesta correcta. Lo que importa es sostener tu posición con evidencia de los textos: palabras, frases y detalles concretos. Eso es exactamente lo que pide un B2 en italiano.',
  },
  ui: 'es',
};

export default ilQuadernoDelNonno;
