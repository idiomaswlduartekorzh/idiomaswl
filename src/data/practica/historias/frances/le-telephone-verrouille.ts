// ─── Le téléphone verrouillé — Historia B1–B2 en francés ──────────────────────
// Adaptación nativa de «The Locked Phone»: francés hablado real, no traducción.
// Enunciados en francés, explicaciones en español.
//
// AUDIO: /audio/historias/frances/le-telephone-verrouille/{a,b}.mp3
// a con voz de mujer (Camille), b con voz de hombre (Julien).

import type { Historia, StoryQuestion as Question } from '../types';

const DICT: Record<string, string> = {
  téléphone: 'teléfono / celular',
  portable: 'celular / móvil',
  écran: 'pantalla',
  notification: 'notificación',
  message: 'mensaje',
  messages: 'mensajes',
  retourné: 'volteado / puesto boca abajo',
  retourne: 'voltea / da la vuelta',
  retournant: 'volteando',
  allumé: 'encendido / se encendió',
  allume: 'se enciende',
  éclairé: 'se iluminó',
  dîner: 'cena / cenar',
  table: 'mesa',
  cuisine: 'cocina',
  canapé: 'sofá',
  photos: 'fotos',
  chien: 'perro',
  localisation: 'ubicación',
  boulot: 'curro / trabajo (coloquial)',
  vendredi: 'viernes',
  samedi: 'sábado',
  printemps: 'primavera',
  emménagé: 'se mudaron juntos',
  remarqué: 'notó / se dio cuenta',
  plaisantant: 'bromeando',
  plaisanterie: 'broma',
  refusé: 'se negó / rechazó',
  refus: 'negativa / rechazo',
  refuse: 'se niega',
  tendre: 'pasar / entregar (algo en mano)',
  donner: 'dar',
  proposé: 'propuso / ofreció',
  répondre: 'responder',
  réponse: 'respuesta',
  vieprivée: 'vida privada / intimidad',
  intimité: 'intimidad',
  privé: 'privado/a',
  limite: 'límite',
  limites: 'límites',
  principe: 'principio',
  principes: 'principios',
  confiance: 'confianza',
  méfiance: 'desconfianza',
  soupçon: 'sospecha',
  suspect: 'sospechoso',
  coupable: 'culpable',
  innocent: 'inocente',
  preuve: 'prueba',
  preuves: 'pruebas',
  prouver: 'demostrar',
  enquête: 'investigación',
  cacher: 'esconder / ocultar',
  caché: 'escondido/a',
  jaloux: 'celoso',
  jalousie: 'celos',
  blessée: 'herida / dolida',
  blessé: 'herido / dolido',
  rassurée: 'tranquila / con seguridad',
  rassurer: 'tranquilizar',
  défensive: 'a la defensiva',
  épuisant: 'agotador',
  couple: 'pareja',
  copine: 'novia',
  copain: 'novio',
  franchement: 'francamente / la verdad',
  honnêtement: 'honestamente',
  visiblement: 'por lo visto / al parecer',
  apparemment: 'aparentemente / según parece',
  vraiment: 'de verdad / realmente',
  carrément: 'directamente / sin más',
  soudain: 'de repente',
  quandmême: 'aun así / de todos modos',
  plutôt: 'más bien',
  personne: 'nadie / persona',
  habitude: 'costumbre / hábito',
  reproche: 'reproche',
  test: 'prueba / test',
  geste: 'gesto',
  accès: 'acceso',
  contrôle: 'control',
  contrôler: 'controlar',
  règle: 'regla / norma',
  vérité: 'verdad',
  mensonge: 'mentira',
  menteur: 'mentiroso',
  discours: 'discurso',
  pire: 'peor',
  excuser: 'disculparse',
  excuses: 'disculpas',
  ironie: 'ironía',
  rhétorique: 'retórico/a',
  ton: 'tono',
};

const NARRATOR_PARAGRAPHS = [
  'Camille et Julien sont ensemble depuis deux ans. Ils ont emménagé dans le même appartement au printemps dernier.',
  "Vendredi soir, pendant le dîner, le téléphone de Julien s'est allumé sur la table et il l'a retourné sans un mot.",
  "Camille l'a remarqué. Elle n'a rien dit sur le moment.",
  'Plus tard dans la soirée, à moitié en plaisantant, elle lui a demandé si elle pouvait regarder son téléphone.',
  'Julien a dit non.',
  "Il n'était pas en colère. Il lui a expliqué que son téléphone était privé, et qu'il ne le tendrait à personne — pas même à elle.",
  "À la place, il lui a proposé de répondre à n'importe quelle question.",
  'Camille lui a répondu qu\'un refus était déjà une réponse.',
  'Aucun des deux n\'a bien dormi cette nuit-là, et samedi matin chacun racontait déjà l\'histoire à quelqu\'un d\'autre.',
];

const A_PARAGRAPHS = [
  "Il faut que je le dise à voix haute, sinon je vais devenir folle.",
  "Tu sais comment Julien est avec son téléphone. Il le laisse partout. Sur le canapé, sur le plan de travail de la cuisine, écran vers le haut, jamais un problème.",
  "Et vendredi, on est en train de dîner, son téléphone s'allume, et il le retourne.",
  'Écran contre la table.',
  "Sans même me regarder.",
  "Et moi je suis restée là pendant une heure à faire comme si de rien n'était.",
  'Alors plus tard je lui dis, un peu en plaisantant : « montre-moi ton téléphone ».',
  "Et il me fait : « non ».",
  "Pas « bien sûr, tiens ». Pas « pourquoi ? ». Juste non.",
  'Deux ans ensemble, et la réponse c\'est non ?',
  "Et là il commence à me parler de vie privée, de principes, de limites.",
  'De limites. Bien sûr.',
  "Je n'allais pas lire ses messages. Je voulais le voir me le tendre. C'était ça, tout le test.",
  "Parce que si tu n'as rien à cacher, pourquoi ça te coûte autant de le montrer ?",
  "Et plus il expliquait, pire ça devenait.",
  "Personne ne prépare un discours sur la vie privée s'il n'y a pas déjà pensé avant.",
  "Il répétait : « demande-moi ce que tu veux, je te dirai la vérité ».",
  "Super. Donc je dois faire confiance à celui qui refuse que je vérifie.",
  "Et maintenant il fait comme si c'était moi qui avais mal agi.",
  "Apparemment, j'ai « dépassé une limite ».",
  "J'ai dépassé une limite.",
  "Franchement, s'il me l'avait simplement donné, je ne l'aurais même pas ouvert.",
  "C'est exactement ça qui me tue.",
];

const B_PARAGRAPHS = [
  "Écoute, je ne sais même pas comment raconter ça sans passer pour le méchant.",
  "Vendredi soir. Le dîner. Mon téléphone s'allume, je le retourne.",
  "Je pose toujours mon téléphone écran contre la table quand on mange. Je fais ça depuis mes dix-neuf ans.",
  "Visiblement, c'est une preuve maintenant.",
  'Plus tard, elle me demande de voir mon téléphone.',
  "Et écoute — il n'y a rien sur ce téléphone. Rien du tout.",
  'Des groupes du boulot, ma mère, des résultats de foot, quarante photos du chien.',
  "Mais là n'est pas la question.",
  "La question, c'est que je ne tends pas mon téléphone pour prouver que je ne suis pas un menteur.",
  "Parce qu'une fois que tu fais ça, ça devient la norme, non ?",
  "Ce mois-ci le téléphone. Le mois prochain ma localisation, et après avec qui j'ai déjeuné.",
  "Je lui ai dit : demande-moi ce que tu veux. Vraiment n'importe quoi. Je réponds.",
  "Elle ne voulait pas de réponses. Elle voulait le téléphone.",
  "Et je comprends, hein. Je sais qu'elle a été blessée avant, et son ex était vraiment horrible.",
  "Mais je ne suis pas lui.",
  "On enquête sur moi pour quelque chose que quelqu'un d'autre a fait.",
  "Et maintenant c'est moi le suspect, parce que j'ai dit non.",
  "C'est ça que je n'arrive pas à digérer.",
  "Si dire non te rend coupable, alors il n'y a aucune réponse qui marche.",
  "Écoute — j'aurais peut-être pu mieux gérer le moment. Peut-être.",
  "Mais je ne vais pas m'excuser d'avoir une limite.",
];

const NARRATOR_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: 'Le narrateur dit que le téléphone « s\'est allumé sur la table ». Qu\'est-ce que cela veut dire ?',
    opts: [
      'Le téléphone a pris feu',
      "L'écran s'est activé tout seul parce qu'un message est arrivé",
      "Julien a pris le téléphone et l'a déverrouillé",
      "Le téléphone était réglé très lumineux ce soir-là",
    ],
    correct: 1,
    explanation:
      '«S\'allumer» describe una pantalla que se enciende sola, normalmente porque acaba de llegar una notificación. Es el detonante de todo lo demás.',
  },
  {
    type: 'Inferencia',
    q: 'Camille demande « à moitié en plaisantant ». Que suggère ce choix de mots ?',
    opts: [
      "Camille n'avait aucun intérêt réel pour le téléphone",
      'Camille voulait se moquer de Julien pour le blesser',
      "La demande était emballée dans une plaisanterie mais portait une vraie intention",
      'Camille avait déjà regardé le téléphone plus tôt dans la semaine',
    ],
    correct: 2,
    explanation:
      '«À moitié en plaisantant» deja a los dos margen para leer el momento de forma distinta: ella puede decir que solo bromeaba; él puede oír una acusación seria. Esa ambigüedad es donde empieza la pelea.',
  },
  {
    type: 'Comprensión',
    q: 'Que propose Julien à la place de lui donner le téléphone ?',
    opts: [
      'Supprimer les messages devant elle',
      "Répondre à n'importe quelle question qu'elle voudrait poser",
      'Lui montrer seulement les photos',
      'Lui donner le téléphone le lendemain',
    ],
    correct: 1,
    explanation:
      'El narrador dice: «il lui a proposé de répondre à n\'importe quelle question». Julien separa dos cosas que Camille trata como una sola: dar información y dar acceso.',
  },
  {
    type: 'Pensamiento crítico',
    q: '« Un refus était déjà une réponse. » Quelle supposition se cache derrière cette phrase ?',
    opts: [
      "Que tout refus s'explique par la fatigue ou le manque de temps, jamais par un principe qu'on défend",
      "Qu'un innocent aurait accepté, donc le refus est lui-même une preuve de culpabilité",
      "Que Julien lui avait déjà promis de partager son téléphone quand ils ont emménagé ensemble",
      'Que refuser est toujours impoli en français',
    ],
    correct: 1,
    explanation:
      'Camille trata la negativa como prueba. La suposición escondida —«el inocente acepta»— deja a Julien sin ninguna forma de demostrar su inocencia, que es justo lo que él denuncia después.',
  },
];

const A_QS: Question[] = [
  {
    type: 'Comprensión',
    q: "D'après Camille, que voulait-elle vraiment en demandant le téléphone ?",
    opts: [
      "Lire les deux ans de messages qu'elle n'avait jamais pu voir depuis le début",
      "Savoir qui avait envoyé la notification qui a fait s'allumer l'écran pendant le dîner de vendredi",
      "Le voir le lui tendre de son plein gré — la demande était un test",
      "Vérifier son historique de localisation, puisque c'est justement ce que Julien redoute",
    ],
    correct: 2,
    explanation:
      'Lo dice sin rodeos: «Je n\'allais pas lire ses messages. Je voulais le voir me le tendre.» Para ella lo que contaba era el gesto, no el contenido.',
  },
  {
    type: 'Inferencia',
    q: '« Si tu n\'as rien à cacher, pourquoi ça te coûte autant ? » Où est le problème de cette question rhétorique ?',
    opts: [
      'Elle est grammaticalement incorrecte',
      "Elle assimile le refus à la culpabilité : aucune réponse de Julien ne peut le disculper",
      "Elle montre que Camille sait déjà ce qui se trouve sur le téléphone et qu'elle cherche seulement une confirmation",
      "Elle prouve que Camille ne tient pas assez à la relation pour lui faire confiance",
    ],
    correct: 1,
    explanation:
      'Una pregunta retórica no espera respuesta: dicta un veredicto. La lógica está cerrada — aceptar parece prueba, negarse parece culpa. Julien nombra la misma trampa desde su lado.',
  },
  {
    type: 'Tono',
    q: 'Comment décrirais-tu le mieux le ton du message vocal de Camille ?',
    opts: [
      "Calme et mesuré, elle analyse la soirée point par point",
      'Formel et professionnel',
      'En colère et sarcastique, mais encadré par le doute et la blessure',
      "Léger et amusé, comme une anecdote qu'on raconte entre amis",
    ],
    correct: 2,
    explanation:
      'El sarcasmo es real («De limites. Bien sûr.»), pero mira el marco: abre con «sinon je vais devenir folle» y cierra con «c\'est exactement ça qui me tue». La rabia está montada encima del dolor.',
  },
  {
    type: 'Vocabulario',
    q: '« De limites. Bien sûr. » Que fait Camille avec cette réponse ?',
    opts: [
      "Elle reconnaît poliment que les limites comptent dans un couple, même si celle-ci tombe au mauvais moment",
      'Elle reprend son mot à lui de façon sarcastique pour le rejeter comme une excuse',
      "Elle lui demande d'expliquer ce qu'il entend exactement par « limites »",
      'Elle cite une psychologue',
    ],
    correct: 1,
    explanation:
      'Devolver la palabra del otro suelta, con un «bien sûr» seco detrás, es un recurso sarcástico habitual en francés hablado: rechaza la palabra misma por falsa o pretenciosa.',
  },
  {
    type: 'Registro',
    q: 'Camille dit : Apparemment, j\'ai « dépassé une limite ». Pourquoi met-elle des guillemets ?',
    opts: [
      'Elle cite un texte juridique',
      "Elle cite les mots de Julien pour s'en distancier et signaler qu'elle rejette l'accusation",
      "Cette expression toute faite exige toujours des guillemets quand on la met par écrit en français",
      "Elle ne sait pas comment traduire cette expression et la met entre guillemets par prudence",
    ],
    correct: 1,
    explanation:
      'Son comillas de distancia. Al repetir la frase y luego decirla otra vez en seco —«J\'ai dépassé une limite.»— deja claro que la acusación es de él, no suya, y que le parece absurda. El «apparemment» refuerza lo mismo.',
  },
];

const B_QS: Question[] = [
  {
    type: 'Comprensión',
    q: 'Quelle raison Julien donne-t-il à son refus ?',
    opts: [
      "Il y a sur ce téléphone des messages qu'il ne veut pas qu'elle voie, même s'ils sont anodins",
      "Le téléphone appartient à son entreprise et il n'a pas le droit de le prêter",
      "Pas qu'il cache quelque chose — mais qu'accepter une fois installerait une attente permanente de contrôle",
      'Il avait oublié son mot de passe',
    ],
    correct: 2,
    explanation:
      'Insiste en que el contenido es irrelevante («il n\'y a rien sur ce téléphone») y construye su negativa alrededor de lo que el acto establecería hacia adelante, no de lo que revelaría.',
  },
  {
    type: 'Vocabulario',
    q: '« Ce mois-ci le téléphone. Le mois prochain ma localisation. » Quelle technique argumentative est-ce ?',
    opts: [
      "La pente glissante — une petite concession présentée comme le début d'une chaîne",
      "Une citation exacte des exigences que Camille a formulées l'une après l'autre",
      'Une excuse pour son comportement au dîner',
      "Un récit factuel de ce qui s'est déjà passé entre eux depuis qu'ils vivent ensemble",
    ],
    correct: 0,
    explanation:
      'La pendiente resbaladiza predice una reacción en cadena a partir de un primer paso. Convence — pero fíjate en que describe un futuro que él imagina, no hechos ocurridos.',
  },
  {
    type: 'Inferencia',
    q: '« On enquête sur moi pour quelque chose que quelqu\'un d\'autre a fait. » Que révèle cette phrase ?',
    opts: [
      'La police enquête réellement sur Julien',
      "Julien pense payer pour le comportement de l'ex-partenaire de Camille",
      "Julien a fait la même chose que l'ex de Camille",
      'Julien veut que Camille contacte son ex',
    ],
    correct: 1,
    explanation:
      'La metáfora judicial («enquête», «suspect», «preuve») recorre todo su relato. Se retrata como acusado injustamente: pagando por una historia que no es la suya.',
  },
  {
    type: 'Pensamiento crítico',
    q: '« Si dire non te rend coupable, alors il n\'y a aucune réponse qui marche. » Que met en évidence Julien ?',
    opts: [
      "Que Camille ne lui pose jamais de vraies questions et préfère chercher des preuves",
      "Que la demande ne peut être réussie honnêtement : toute réaction confirme le soupçon",
      "Qu'il veut mettre fin à la relation et cherche une raison de partir sans passer pour le méchant",
      "Qu'il n'a pas compris la question",
    ],
    correct: 1,
    explanation:
      'Está señalando una sospecha infalsable: ninguna prueba podría refutarla. Es el espejo exacto de la pregunta retórica de Camille — la misma lógica, vista desde el otro lado.',
  },
  {
    type: 'Tono',
    q: "« J'aurais peut-être pu mieux gérer le moment. Peut-être. » Que produit ce « peut-être » répété ?",
    opts: [
      "Une prise de responsabilité complète, même si elle arrive avec un jour de retard",
      "Une confusion totale sur ce qui s'est passé",
      "Une concession minimale qu'il retire aussitôt — une phrase en forme d'excuse qui n'admet rien",
      "Un vrai remords accompagné d'une vraie envie de changer sa façon de réagir",
    ],
    correct: 2,
    explanation:
      'El primer «peut-être» abre una puerta; el segundo la cierra. Concede la forma, nunca la decisión — y la frase siguiente («Mais je ne vais pas m\'excuser…») lo confirma.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Síntesis',
    q: 'Quel détail est confirmé par LES DEUX versions ?',
    opts: [
      "Julien a reçu un message d'une autre femme",
      "Camille avait lu une partie de la conversation avant de demander",
      'Julien a retourné son téléphone pendant le dîner',
      "Julien s'est excusé le lendemain matin",
    ],
    correct: 2,
    explanation:
      'El celular boca abajo es el único hecho objetivo que cuentan los dos. Su significado está en disputa total: para ella es una reacción, para él una costumbre que tiene desde los diecinueve.',
  },
  {
    type: 'Perspectiva',
    q: 'Camille appelle sa demande « un test ». Julien parle d\'une « enquête » sur lui. Que montre cet écart ?',
    opts: [
      "L'un des deux ment volontairement sur la soirée pour se donner le beau rôle",
      'La même action prend des sens opposés selon ce que chacun croit qu\'elle symbolise',
      "Aucun des deux ne se souvient clairement de la soirée, et chacun reconstruit la scène à sa façon",
      'Julien utilise un vocabulaire plus soutenu que Camille',
    ],
    correct: 1,
    explanation:
      'Intención frente a impacto. Ella buscaba un gesto pequeño de tranquilidad; él vivió una acusación que exigía pruebas. Ninguno inventa la noche: describen experiencias distintas de la misma noche.',
  },
  {
    type: 'Pensamiento crítico',
    q: 'Quelle est la cause PROFONDE la plus juste de ce conflit ?',
    opts: [
      "Julien cache quelque chose sur son téléphone : personne ne prépare un discours sur la vie privée sans raison",
      "Camille est tout simplement jalouse, et la notification du dîner a suffi à déclencher ses soupçons",
      "Le couple n'avait jamais décidé ce que la vie privée signifiait entre eux avant que ce soit testé",
      "L'ex-partenaire de Camille, dont le comportement a rendu toute confiance impossible",
    ],
    correct: 2,
    explanation:
      '¿Compartir el celular es normal en esta pareja o no? Nadie lo había decidido nunca. La regla se inventó en mitad de la discusión, y por eso los dos sienten que el otro la rompió.',
  },
  {
    type: 'Registro',
    q: "Camille dit que Julien l'accuse d'avoir « dépassé une limite ». Julien dit qu'il ne s'excusera pas « d'avoir une limite ». Que montre cette métaphore partagée ?",
    opts: [
      'Ils citent le même film',
      "Les deux utilisent la même image de limite pour défendre des positions opposées — chacun se croit celui qui protège une frontière",
      "« Limite » veut dire quelque chose de complètement différent dans chaque bouche : chez elle une règle du couple, chez lui un espace personnel",
      "Cela prouve que Julien reprend le vocabulaire de Camille pour retourner l'accusation contre elle",
    ],
    correct: 1,
    explanation:
      'La misma imagen —una línea que no se cruza— hace trabajos opuestos en cada relato. En la mayoría de los conflictos de pareja, los dos creen estar defendiendo un límite, no atacándolo.',
  },
  {
    type: 'Inferencia',
    q: "« S'il me l'avait simplement donné, je ne l'aurais même pas ouvert. » Que révèle cette phrase ?",
    opts: [
      "Camille mentait quand elle disait vouloir voir le téléphone, puisqu'elle reconnaît maintenant qu'elle ne l'aurait même pas ouvert : ce qu'elle voulait, c'était le prendre en défaut",
      "Camille cherchait à être rassurée, pas informée — et la seule chose qui l'aurait rassurée était exactement le geste que Julien refuse par principe",
      "Camille avait déjà ouvert le téléphone plus tôt dans la semaine et savait donc qu'il n'y avait rien",
      'Camille ne connaît pas son mot de passe',
    ],
    correct: 1,
    explanation:
      'Aquí está la trampa central de la historia. Ella necesitaba un gesto; él solo podía ver un precedente. No había ninguna versión de esa noche en la que los dos consiguieran lo que necesitaban.',
  },
];

const KEY_LANGUAGE = [
  { phrase: "s'allumer", meaning: 'que una pantalla se encienda sola al llegar una notificación' },
  { phrase: 'retourner le téléphone', meaning: 'poner el celular boca abajo — acto literal, sentido simbólico' },
  { phrase: 'à moitié en plaisantant', meaning: 'medio en broma: deja abiertas dos lecturas del mismo acto' },
  { phrase: 'la pente glissante', meaning: 'argumento de que una concesión pequeña lleva a otras peores' },
  { phrase: 'Apparemment, j\'ai « … »', meaning: 'comillas de distancia: repites la acusación ajena sin asumirla' },
  { phrase: 'Peut-être… Peut-être.', meaning: 'no-disculpa: concede la forma y retira el fondo' },
];

export const leTelephoneVerrouille: Historia = {
  slug: 'le-telephone-verrouille',
  lang: 'frances',
  icon: '📵',
  color: '#be185d',
  level: 'B1–B2',
  title: 'Le téléphone verrouillé',
  tagline: 'Ella pidió ver el celular. Él dijo que no. Dos versiones del mismo viernes.',
  metaTitle: 'Le téléphone verrouillé — comprensión en francés B1–B2',
  metaDescription:
    
    
    'Ella pidió ver el celular. Él dijo que no. Dos versiones del mismo viernes. Dos audios, transcripción y 19 preguntas en francés B1–B2.',
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
      name: 'Camille',
      role: 'la copine',
      sex: 'female',
      color: '#0f3d8c',
      audioSrc: '/audio/historias/frances/le-telephone-verrouille/a.mp3',
      paragraphs: A_PARAGRAPHS,
      questions: A_QS,
      listenHint: 'Escucha con atención. Todavía no hay transcripción — concéntrate en lo que puedas entender.',
      transcriptHint: 'las marcas y ves su traducción. Después vuelve a escribir lo que entendiste.',
      write1Prompt: 'Sin mirar ninguna transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Camille.',
      write1Hint: 'No te preocupes por que salga perfecto: es una primera impresión. Escribe en español o en francés.',
      write2Prompt: 'Ahora escríbelo otra vez — esta vez puedes entrar en más detalle.',
    },
    {
      key: 'b',
      name: 'Julien',
      role: 'le copain',
      sex: 'male',
      color: '#7c3aed',
      audioSrc: '/audio/historias/frances/le-telephone-verrouille/b.mp3',
      paragraphs: B_PARAGRAPHS,
      questions: B_QS,
      listenHint: 'Escucha primero sin transcripción. Julien repite un detalle que Camille también menciona: búscalo.',
      transcriptHint: 'compara la versión de Julien con la de Camille: ¿qué detalles cuentan los dos? ¿Dónde se contradicen?',
      write1Prompt: 'Sin la transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Julien.',
      write1Hint: 'Esta es la otra cara de la historia. ¿Qué dice él que pasó? Escribe en español o en francés.',
      write2Prompt: 'Ahora escribe otra vez lo que entendiste desde la perspectiva de Julien.',
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
    note: 'No hay una única respuesta correcta. Lo que se evalúa es defender tu posición con evidencia de los textos: palabras, frases y detalles concretos de cada versión. Eso es exactamente lo que pide un B2 en francés.',
  },
  ui: 'es',
};

export default leTelephoneVerrouille;
