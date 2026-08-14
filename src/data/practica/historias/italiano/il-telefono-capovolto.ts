// ─── Il telefono capovolto — Historia B1–B2 en italiano ───────────────────────
// Adaptación nativa de «The Locked Phone». Enunciados en italiano, explicaciones
// en español.
//
// AUDIO: /audio/historias/italiano/il-telefono-capovolto/{a,b}.mp3
// a con voz de mujer (Giulia), b con voz de hombre (Marco).

import type { Historia, StoryQuestion as Question } from '../types';

const DICT: Record<string, string> = {
  telefono: 'teléfono / celular',
  cellulare: 'celular / móvil',
  schermo: 'pantalla',
  notifica: 'notificación',
  messaggio: 'mensaje',
  messaggi: 'mensajes',
  capovolto: 'boca abajo / dado la vuelta',
  capovolge: 'voltea / pone boca abajo',
  girato: 'volteado',
  acceso: 'encendido',
  accende: 'se enciende',
  illuminato: 'iluminado',
  cena: 'cena',
  tavolo: 'mesa',
  cucina: 'cocina',
  divano: 'sofá',
  foto: 'fotos',
  cane: 'perro',
  posizione: 'ubicación',
  lavoro: 'trabajo',
  venerdì: 'viernes',
  sabato: 'sábado',
  primavera: 'primavera',
  trasferiti: 'se mudaron',
  notato: 'notó / se dio cuenta',
  scherzando: 'bromeando',
  scherzo: 'broma',
  rifiutato: 'se negó / rechazó',
  rifiuto: 'negativa / rechazo',
  consegnare: 'entregar (algo en mano)',
  passare: 'pasar',
  proposto: 'propuso / ofreció',
  rispondere: 'responder',
  risposta: 'respuesta',
  privacy: 'privacidad',
  privato: 'privado',
  confine: 'límite / frontera',
  confini: 'límites',
  limite: 'límite',
  principio: 'principio',
  principi: 'principios',
  fiducia: 'confianza',
  sfiducia: 'desconfianza',
  sospetto: 'sospecha / sospechoso',
  colpevole: 'culpable',
  innocente: 'inocente',
  prova: 'prueba',
  prove: 'pruebas',
  dimostrare: 'demostrar',
  indagine: 'investigación',
  indagato: 'investigado / imputado',
  nascondere: 'esconder / ocultar',
  nascosto: 'escondido',
  geloso: 'celoso',
  gelosia: 'celos',
  ferita: 'herida / dolida',
  ferito: 'herido / dolido',
  rassicurazione: 'tranquilidad / que te tranquilicen',
  rassicurare: 'tranquilizar',
  difensiva: 'a la defensiva',
  sfiancante: 'agotador',
  coppia: 'pareja',
  fidanzata: 'novia',
  fidanzato: 'novio',
  sinceramente: 'sinceramente',
  onestamente: 'honestamente',
  apparentemente: 'aparentemente / al parecer',
  praticamente: 'prácticamente',
  davvero: 'de verdad',
  improvvisamente: 'de repente',
  comunque: 'de todos modos / en cualquier caso',
  piuttosto: 'más bien / bastante',
  nessuno: 'nadie',
  abitudine: 'costumbre / hábito',
  rimprovero: 'reproche',
  gesto: 'gesto',
  accesso: 'acceso',
  controllo: 'control',
  controllare: 'controlar / revisar',
  regola: 'regla / norma',
  verità: 'verdad',
  bugia: 'mentira',
  bugiardo: 'mentiroso',
  discorso: 'discurso',
  peggio: 'peor',
  scusarmi: 'disculparme',
  scusa: 'disculpa / perdón',
  ironia: 'ironía',
  retorica: 'retórica',
  tono: 'tono',
};

const NARRATOR_PARAGRAPHS = [
  'Giulia e Marco stanno insieme da due anni. La scorsa primavera si sono trasferiti nella stessa casa.',
  'Venerdì sera, durante la cena, il telefono di Marco si è illuminato sul tavolo e lui lo ha capovolto senza dire una parola.',
  'Giulia lo ha notato. Sul momento non ha detto niente.',
  'Più tardi, mezzo scherzando, gli ha chiesto se poteva dare un\'occhiata al suo telefono.',
  'Marco ha detto di no.',
  'Non era arrabbiato. Le ha spiegato che il suo telefono è privato e che non lo consegna a nessuno — nemmeno a lei.',
  'Al suo posto, le ha proposto di rispondere a qualsiasi domanda volesse fargli.',
  'Giulia gli ha risposto che un rifiuto è già una risposta.',
  'Quella notte nessuno dei due ha dormito bene, e sabato mattina entrambi stavano già raccontando la storia a qualcun altro.',
];

const A_PARAGRAPHS = [
  'Devo dirlo ad alta voce, se no divento matta.',
  'Lo sai come fa Marco con il telefono. Lo lascia ovunque. Sul divano, sul bancone della cucina, schermo in su, nessun problema.',
  'E venerdì stiamo cenando, il telefono si accende, e lui lo gira.',
  'Schermo sul tavolo.',
  'Senza nemmeno guardarmi.',
  'E io sono rimasta lì un\'ora a fare finta di niente.',
  'Allora più tardi gli dico, mezzo per scherzo: «fammi vedere il telefono».',
  'E lui fa: «no».',
  'Non «certo, tieni». Non «perché?». Solo no.',
  'Due anni insieme, e la risposta è no?',
  'E lì comincia a parlarmi di privacy, di principi, di confini.',
  'Confini. Ma per favore.',
  'Non volevo leggere i suoi messaggi. Volevo vederglielo consegnare. Il test era tutto lì.',
  'Perché se non hai niente da nascondere, perché ti costa così tanto dimostrarlo?',
  'E più spiegava, peggio suonava.',
  'Nessuno prepara un discorso sulla privacy se non ci ha già pensato prima.',
  'Continuava a ripetere: «chiedimi quello che vuoi, ti dico la verità».',
  'Benissimo. Quindi devo fidarmi di quello che non mi fa controllare.',
  'E adesso fa come se fossi io ad aver sbagliato.',
  'A quanto pare ho «superato un limite».',
  'Ho superato un limite.',
  'Onestamente, se me lo avesse semplicemente dato, probabilmente non l\'avrei nemmeno aperto.',
  'È proprio questa la parte che mi uccide.',
];

const B_PARAGRAPHS = [
  'Senti, non so nemmeno come raccontarlo senza sembrare il cattivo della storia.',
  'Venerdì sera. Cena. Il telefono si accende, lo giro.',
  'Io il telefono lo metto sempre a faccia in giù quando si mangia. Lo faccio da quando ho diciannove anni.',
  'A quanto pare adesso è una prova.',
  'Più tardi mi chiede di vedere il telefono.',
  'E guarda — su quel telefono non c\'è niente. Niente di niente.',
  'Gruppi di lavoro, mia madre, i risultati delle partite, quaranta foto del cane.',
  'Ma non è quello il punto.',
  'Il punto è che io il telefono non lo consegno per dimostrare che non sono un bugiardo.',
  'Perché una volta che lo fai, da quel momento diventa normale, no?',
  'Questo mese il telefono. Il mese prossimo la mia posizione, e poi con chi ho pranzato.',
  'Le ho detto: chiedimi qualsiasi cosa. Davvero qualsiasi cosa. Ti rispondo.',
  'Lei non voleva risposte. Voleva il telefono.',
  'E la capisco, eh. So che è stata ferita prima, e il suo ex era davvero orribile.',
  'Ma io non sono lui.',
  'Mi stanno indagando per una cosa che ha fatto qualcun altro.',
  'E adesso il sospetto sono io, perché ho detto di no.',
  'È questa la parte che non riesco a mandare giù.',
  'Se dire di no ti rende colpevole, allora non esiste una risposta che funzioni.',
  'Guarda — forse potevo gestire meglio quel momento. Forse.',
  'Ma non mi scuso per avere un limite.',
];

const NARRATOR_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: 'Il narratore dice che il telefono «si è illuminato sul tavolo». Che cosa significa?',
    opts: [
      'Il telefono ha preso fuoco',
      "Lo schermo si è acceso da solo perché è arrivato un messaggio",
      'Marco ha preso il telefono e lo ha sbloccato',
      'Quella sera il telefono era regolato molto luminoso',
    ],
    correct: 1,
    explanation:
      '«Illuminarsi» describe una pantalla que se enciende sola, normalmente porque acaba de llegar una notificación. Es el detonante de todo lo demás.',
  },
  {
    type: 'Inferencia',
    q: 'Giulia chiede «mezzo scherzando». Che cosa suggerisce questa scelta?',
    opts: [
      'Giulia non aveva un vero interesse per il telefono',
      'Giulia voleva prendere in giro Marco per ferirlo',
      "La richiesta era avvolta in uno scherzo ma aveva dietro un'intenzione reale",
      'Giulia aveva già guardato il telefono nei giorni prima',
    ],
    correct: 2,
    explanation:
      '«Mezzo scherzando» deja a los dos margen para leer el momento de forma distinta: ella puede decir que solo bromeaba; él puede oír una acusación seria. Esa ambigüedad es donde empieza la pelea.',
  },
  {
    type: 'Comprensión',
    q: 'Che cosa propone Marco invece di darle il telefono?',
    opts: [
      'Cancellare i messaggi davanti a lei',
      'Rispondere a qualsiasi domanda volesse fargli',
      'Mostrarle soltanto le foto',
      'Darle il telefono il giorno dopo',
    ],
    correct: 1,
    explanation:
      'El narrador dice: «le ha proposto di rispondere a qualsiasi domanda». Marco separa dos cosas que Giulia trata como una sola: dar información y dar acceso.',
  },
  {
    type: 'Pensamiento crítico',
    q: '«Un rifiuto è già una risposta.» Quale presupposto c\'è dietro questa frase?',
    opts: [
      'Che chi rifiuta di solito è stanco o occupato',
      "Che un innocente avrebbe accettato, quindi il no è di per sé una prova di colpa",
      'Che Marco aveva promesso di condividere il telefono',
      'Che rifiutare in italiano è sempre scortese',
    ],
    correct: 1,
    explanation:
      'Giulia trata la negativa como prueba. La suposición escondida —«el inocente acepta»— deja a Marco sin ninguna forma de demostrar su inocencia, que es justo lo que él denuncia después.',
  },
];

const A_QS: Question[] = [
  {
    type: 'Comprensión',
    q: 'Secondo Giulia, che cosa voleva davvero quando ha chiesto il telefono?',
    opts: [
      'Leggere due anni di messaggi',
      'Scoprire chi aveva mandato la notifica durante la cena',
      'Vederglielo consegnare spontaneamente — la richiesta era un test',
      'Controllare la cronologia delle posizioni',
    ],
    correct: 2,
    explanation:
      'Lo dice sin rodeos: «Non volevo leggere i suoi messaggi. Volevo vederglielo consegnare.» Para ella contaba el gesto, no el contenido.',
  },
  {
    type: 'Inferencia',
    q: '«Se non hai niente da nascondere, perché ti costa così tanto?» Dov\'è il problema di questa domanda retorica?',
    opts: [
      'È grammaticalmente scorretta',
      'Equipara il rifiuto alla colpa: nessuna risposta può scagionare Marco',
      'Dimostra che Giulia sa già cosa c\'è nel telefono',
      'Dimostra che a Giulia non importa della relazione',
    ],
    correct: 1,
    explanation:
      'Una pregunta retórica no espera respuesta: dicta un veredicto. La lógica está cerrada — aceptar parece prueba, negarse parece culpa. Marco nombra la misma trampa desde su lado.',
  },
  {
    type: 'Tono',
    q: 'Come descriveresti meglio il tono del messaggio vocale di Giulia?',
    opts: [
      'Calmo, misurato e analitico',
      'Formale e professionale',
      'Arrabbiato e sarcastico, ma incorniciato da dubbio e dolore',
      'Leggero e divertito dall\'inizio alla fine',
    ],
    correct: 2,
    explanation:
      'El sarcasmo es real («Confini. Ma per favore.»), pero mira el marco: abre con «se no divento matta» y cierra con «la parte che mi uccide». La rabia está montada encima del dolor.',
  },
  {
    type: 'Vocabulario',
    q: '«Confini. Ma per favore.» Che cosa sta facendo Giulia?',
    opts: [
      'Riconosce educatamente che i confini contano in una coppia',
      'Ripete la sua stessa parola in modo sarcastico per liquidarla come una scusa',
      'Gli chiede di spiegarle la parola',
      'Cita una psicologa',
    ],
    correct: 1,
    explanation:
      'Devolver la palabra del otro suelta, con un «ma per favore» detrás, es un recurso sarcástico habitual en italiano hablado: rechaza la palabra misma por falsa o pretenciosa.',
  },
  {
    type: 'Registro',
    q: 'Giulia dice: A quanto pare ho «superato un limite». Perché usa le virgolette?',
    opts: [
      'Sta citando un testo giuridico',
      "Cita le parole di Marco per prenderne le distanze e segnalare che rifiuta l'accusa",
      'In italiano questa espressione richiede sempre le virgolette',
      'Non sa come tradurla',
    ],
    correct: 1,
    explanation:
      'Son comillas de distancia. Al repetir la frase y decirla luego en seco —«Ho superato un limite.»— deja claro que la acusación es de él, no suya, y que le parece absurda. El «a quanto pare» refuerza lo mismo.',
  },
];

const B_QS: Question[] = [
  {
    type: 'Comprensión',
    q: 'Quale motivo dà Marco per il suo rifiuto?',
    opts: [
      'Ci sono messaggi che non vuole farle vedere',
      "Il telefono è dell'azienda",
      'Non che nasconda qualcosa — ma che accettare una volta creerebbe un\'aspettativa permanente di controllo',
      'Aveva dimenticato la password',
    ],
    correct: 2,
    explanation:
      'Insiste en que el contenido es irrelevante («su quel telefono non c\'è niente») y construye su negativa alrededor de lo que el acto establecería hacia adelante, no de lo que revelaría.',
  },
  {
    type: 'Vocabulario',
    q: '«Questo mese il telefono. Il mese prossimo la mia posizione.» Che tecnica argomentativa è?',
    opts: [
      'Il pendio scivoloso — una piccola concessione presentata come inizio di una catena',
      'Una citazione esatta di ciò che Giulia ha chiesto',
      'Una scusa per il suo comportamento a cena',
      'Un resoconto di fatti già avvenuti',
    ],
    correct: 0,
    explanation:
      'La pendiente resbaladiza predice una reacción en cadena a partir de un primer paso. Convence — pero fíjate en que describe un futuro que él imagina, no hechos ocurridos.',
  },
  {
    type: 'Inferencia',
    q: '«Mi stanno indagando per una cosa che ha fatto qualcun altro.» Che cosa rivela questa frase?',
    opts: [
      'La polizia sta davvero indagando su Marco',
      "Marco crede di pagare per il comportamento dell'ex di Giulia",
      "Marco ha fatto la stessa cosa dell'ex di Giulia",
      'Marco vuole che Giulia contatti il suo ex',
    ],
    correct: 1,
    explanation:
      'La metáfora judicial («indagare», «sospetto», «prova») recorre todo su relato. Se retrata como acusado injustamente: pagando por una historia que no es la suya.',
  },
  {
    type: 'Pensamiento crítico',
    q: '«Se dire di no ti rende colpevole, allora non esiste una risposta che funzioni.» Che cosa sta mettendo in luce Marco?',
    opts: [
      'Che Giulia non gli fa mai domande',
      'Che la richiesta non si può superare onestamente: qualsiasi reazione conferma il sospetto',
      'Che vuole chiudere la relazione',
      'Che non ha capito la domanda',
    ],
    correct: 1,
    explanation:
      'Está señalando una sospecha infalsable: ninguna prueba podría refutarla. Es el espejo exacto de la pregunta retórica de Giulia — la misma lógica, vista desde el otro lado.',
  },
  {
    type: 'Tono',
    q: '«Forse potevo gestire meglio quel momento. Forse.» Che effetto ha il «forse» ripetuto?',
    opts: [
      'Piena assunzione di responsabilità',
      'Totale confusione su quello che è successo',
      'Una concessione minima che ritira subito — una frase a forma di scusa che non ammette niente',
      'Vero pentimento e voglia di cambiare',
    ],
    correct: 2,
    explanation:
      'El primer «forse» abre una puerta; el segundo la cierra. Concede la forma, nunca la decisión — y la frase siguiente («Ma non mi scuso…») lo confirma.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Síntesis',
    q: 'Quale dettaglio è confermato da ENTRAMBE le versioni?',
    opts: [
      "Marco ha ricevuto un messaggio da un'altra donna",
      'Giulia aveva già letto parte della conversazione',
      'Marco ha capovolto il telefono durante la cena',
      'Marco si è scusato la mattina dopo',
    ],
    correct: 2,
    explanation:
      'El celular boca abajo es el único hecho objetivo que cuentan los dos. Su significado está en disputa total: para ella es una reacción, para él una costumbre que tiene desde los diecinueve.',
  },
  {
    type: 'Perspectiva',
    q: 'Giulia chiama la richiesta «un test». Marco dice che lo stanno «indagando». Che cosa mostra questa distanza?',
    opts: [
      'Uno dei due mente di proposito sulla serata',
      'La stessa azione assume significati opposti a seconda di ciò che ciascuno crede che simboleggi',
      'Nessuno dei due ricorda bene la serata',
      'Marco usa un lessico più ricercato di Giulia',
    ],
    correct: 1,
    explanation:
      'Intención frente a impacto. Ella buscaba un gesto pequeño de tranquilidad; él vivió una acusación que exigía pruebas. Ninguno inventa la noche: describen experiencias distintas de la misma noche.',
  },
  {
    type: 'Pensamiento crítico',
    q: 'Qual è la causa PROFONDA più precisa di questo conflitto?',
    opts: [
      'Marco nasconde qualcosa nel telefono',
      'Giulia è semplicemente gelosa',
      'La coppia non aveva mai deciso che cosa significa privacy fra loro, prima che venisse messa alla prova',
      "L'ex di Giulia",
    ],
    correct: 2,
    explanation:
      '¿Compartir el celular es normal en esta pareja o no? Nadie lo había decidido nunca. La regla se inventó en mitad de la discusión, y por eso los dos sienten que el otro la rompió.',
  },
  {
    type: 'Registro',
    q: 'Giulia dice che Marco la accusa di aver «superato un limite». Marco dice che non si scusa «per avere un limite». Che cosa mostra questa metafora condivisa?',
    opts: [
      'Citano lo stesso film',
      'Usano la stessa immagine del limite per difendere posizioni opposte — ognuno si crede quello che sta proteggendo un confine',
      '«Limite» significa una cosa completamente diversa nei due casi',
      'Dimostra che Marco copia il lessico di Giulia',
    ],
    correct: 1,
    explanation:
      'La misma imagen —una línea que no se cruza— hace trabajos opuestos en cada relato. En la mayoría de los conflictos de pareja, los dos creen estar defendiendo un límite, no atacándolo.',
  },
  {
    type: 'Inferencia',
    q: '«Se me lo avesse semplicemente dato, non l\'avrei nemmeno aperto.» Che cosa rivela questa frase?',
    opts: [
      'Giulia mentiva quando diceva di voler vedere il telefono',
      'Giulia cercava rassicurazione, non informazione — e l\'unica cosa che gliela avrebbe data era proprio il gesto che Marco rifiuta per principio',
      'Giulia aveva già aperto il telefono prima',
      'Giulia non conosce la sua password',
    ],
    correct: 1,
    explanation:
      'Aquí está la trampa central de la historia. Ella necesitaba un gesto; él solo podía ver un precedente. No había ninguna versión de esa noche en la que los dos consiguieran lo que necesitaban.',
  },
];

const KEY_LANGUAGE = [
  { phrase: 'illuminarsi', meaning: 'que una pantalla se encienda sola al llegar una notificación' },
  { phrase: 'a faccia in giù', meaning: 'boca abajo — acto literal, significado simbólico' },
  { phrase: 'mezzo scherzando', meaning: 'medio en broma: deja abiertas dos lecturas del mismo acto' },
  { phrase: 'pendio scivoloso', meaning: 'argumento de que una concesión pequeña lleva a otras peores' },
  { phrase: 'A quanto pare ho «…»', meaning: 'comillas de distancia: repites la acusación ajena sin asumirla' },
  { phrase: 'Forse… Forse.', meaning: 'no-disculpa: concede la forma y retira el fondo' },
];

export const ilTelefonoCapovolto: Historia = {
  slug: 'il-telefono-capovolto',
  lang: 'italiano',
  icon: '📵',
  color: '#be185d',
  level: 'B1–B2',
  title: 'Il telefono capovolto',
  tagline: 'Ella pidió ver el celular. Él dijo que no. Dos versiones del mismo viernes.',
  metaTitle: 'Il telefono capovolto — comprensión en italiano B1–B2',
  metaDescription:
    
    
    'Ella pidió ver el celular. Él dijo que no. Dos versiones del mismo viernes. Dos audios, transcripción y 19 preguntas en italiano B1–B2.',
  intro:
    'Una pareja, un celular y dos versiones completamente distintas del mismo viernes por la noche. Lee el relato del narrador, escucha las dos notas de voz y responde 19 preguntas de vocabulario, inferencia, tono y pensamiento crítico.',
  narrator: {
    paragraphs: NARRATOR_PARAGRAPHS,
    questions: NARRATOR_QS,
    tip: 'Fíjate en lo poco que pasó de verdad: nadie leyó un mensaje, nadie pilló a nadie. Toda la discusión está hecha de detalles mínimos y del significado que cada uno les da. Vigila también las palabras del narrador: tampoco es neutral.',
  },
  voices: [
    {
      key: 'a',
      name: 'Giulia',
      role: 'la fidanzata',
      sex: 'female',
      color: '#0f3d8c',
      audioSrc: '/audio/historias/italiano/il-telefono-capovolto/a.mp3',
      paragraphs: A_PARAGRAPHS,
      questions: A_QS,
      listenHint: 'Escucha con atención. Todavía no hay transcripción — concéntrate en lo que puedas entender.',
      transcriptHint: 'las marcas y ves su traducción. Después vuelve a escribir lo que entendiste.',
      write1Prompt: 'Sin mirar ninguna transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Giulia.',
      write1Hint: 'No te preocupes por que salga perfecto: es una primera impresión. Escribe en español o en italiano.',
      write2Prompt: 'Ahora escríbelo otra vez — esta vez puedes entrar en más detalle.',
    },
    {
      key: 'b',
      name: 'Marco',
      role: 'il fidanzato',
      sex: 'male',
      color: '#7c3aed',
      audioSrc: '/audio/historias/italiano/il-telefono-capovolto/b.mp3',
      paragraphs: B_PARAGRAPHS,
      questions: B_QS,
      listenHint: 'Escucha primero sin transcripción. Marco repite un detalle que Giulia también menciona: búscalo.',
      transcriptHint: 'compara la versión de Marco con la de Giulia: ¿qué detalles cuentan los dos? ¿Dónde se contradicen?',
      write1Prompt: 'Sin la transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Marco.',
      write1Hint: 'Esta es la otra cara de la historia. ¿Qué dice él que pasó? Escribe en español o en italiano.',
      write2Prompt: 'Ahora escribe otra vez lo que entendiste desde la perspectiva de Marco.',
    },
  ],
  finalQuestions: FINAL_QS,
  finalIntro: [
    'Ahora sabes algo que ninguno de los dos sabe: has oído las dos versiones. Estas preguntas te piden ponerlas una al lado de la otra — qué detalles sobreviven en las dos, dónde tiene razón cada uno y dónde tener razón no es lo mismo que ser justo.',
    'Fíjate en las palabras que los dos eligen. Cuando dos personas usan la misma imagen para defender posiciones opuestas, ahí suele estar escondido el desacuerdo de verdad.',
  ],
  dict: DICT,
  keyLanguage: KEY_LANGUAGE,
  discussion: {
    question: '¿Negarse es lo mismo que esconder? ¿Y puede una petición ser razonable y aun así injusta?',
    note: 'No hay una única respuesta correcta. Lo que se evalúa es defender tu posición con evidencia de los textos: palabras, frases y detalles concretos de cada versión. Eso es exactamente lo que pide un B2 en italiano.',
  },
  ui: 'es',
};

export default ilTelefonoCapovolto;
