// ─── Le carnet du grand-père — Historia B1–B2 en francés ──────────────────────
// Adaptación nativa de «The Grandfather's Ledger». Quien reclama los regalos es
// el ABUELO (Bernard) en las tres capas: narrador, transcripciones y preguntas.
//
// AUDIO: /audio/historias/frances/le-carnet-du-grand-pere/{a,b}.mp3
// a con voz de mujer (Élodie), b con voz de hombre mayor (Bernard).

import type { Historia, StoryQuestion as Question } from '../types';

const DICT: Record<string, string> = {
  carnet: 'cuaderno / libreta de cuentas',
  tableur: 'hoja de cálculo',
  tableau: 'tabla / cuadro',
  reçu: 'recibo / factura',
  reçus: 'recibos / facturas',
  poussette: 'cochecito de bebé',
  chambre: 'habitación / cuarto',
  berceau: 'cuna',
  commode: 'cómoda',
  meubles: 'muebles',
  jouets: 'juguetes',
  études: 'estudios',
  épargne: 'ahorro / fondo de ahorro',
  grandpère: 'abuelo',
  grandmère: 'abuela',
  papy: 'abuelito (coloquial)',
  petitfils: 'nieto',
  petitenfant: 'nieto/a',
  bellefille: 'nuera',
  beaupère: 'suegro',
  enceinte: 'embarazada',
  grossesse: 'embarazo',
  fortune: 'fortuna / mucho dinero',
  patrimoine: 'patrimonio',
  biens: 'bienes',
  investi: 'invirtió / invertido',
  investissement: 'inversión',
  généreux: 'generoso',
  générosité: 'generosidad',
  radin: 'tacaño (coloquial)',
  avide: 'codicioso / ávido',
  méchant: 'malo / el malo de la película',
  monstre: 'monstruo',
  inventaire: 'inventario',
  entrepôt: 'almacén / bodega',
  stock: 'existencias / mercancía',
  organisé: 'organizado',
  paperasse: 'papeleo',
  attitude: 'actitud',
  reconnaissance: 'gratitud / reconocimiento',
  gratitude: 'gratitud',
  transmettre: 'pasar / transmitir (a otra generación)',
  transmis: 'transmitido / heredado',
  génération: 'generación',
  générations: 'generaciones',
  refusé: 'se negó / rechazó',
  refus: 'negativa',
  choqué: 'impactado / sorprendido',
  sidéré: 'atónito / pasmado',
  indigné: 'indignado',
  défensive: 'a la defensiva',
  reproche: 'reproche',
  dispute: 'discusión / disputa',
  conflit: 'conflicto',
  intention: 'intención',
  prémédité: 'premeditado',
  préméditation: 'premeditación',
  preuve: 'prueba',
  perception: 'percepción',
  supposition: 'suposición',
  attente: 'expectativa',
  condition: 'condición',
  inconditionnel: 'incondicional',
  cadeau: 'regalo',
  cadeaux: 'regalos',
  prêt: 'préstamo / prestado',
  raisonnable: 'razonable',
  juste: 'justo',
  justice: 'justicia',
  dingue: 'de locos / demencial (coloquial)',
  fou: 'loco',
  crime: 'crimen / delito',
  excuse: 'excusa / disculpa',
  ironie: 'ironía',
  sarcasme: 'sarcasmo',
  rhétorique: 'retórico/a',
  ton: 'tono',
  apparemment: 'aparentemente / al parecer',
  visiblement: 'por lo visto',
  soudain: 'de repente',
  franchement: 'francamente / la verdad',
  financièrement: 'económicamente',
  carrément: 'directamente / sin más',
  moquent: 'se burlan',
  moquer: 'burlarse',
  débarque: 'se planta / aparece de golpe',
  vraiment: 'de verdad / realmente',
};

const NARRATOR_PARAGRAPHS = [
  "Il y a trois ans, à la naissance du petit Noah, c'est son grand-père Bernard qui a le plus dépensé dans la famille.",
  "Il a presque tout acheté : une poussette haut de gamme, tous les meubles de la chambre, des jouets chers — et il a même ouvert une épargne pour ses études.",
  'Tout le monde a pensé qu\'il était simplement généreux.',
  'Puis la fille de Bernard, Chloé, a annoncé qu\'elle était enceinte.',
  "Soudain, Bernard s'est mis à dire qu'une partie des affaires de Noah pourrait être « partagée » avec le nouveau bébé.",
  "Quelques semaines plus tard, il a débarqué chez son fils et sa belle-fille avec un tableau listant chaque cadeau cher qu'il avait acheté.",
  "Il a demandé le retour de plusieurs milliers d'euros d'affaires.",
  'La belle-fille a refusé.',
  "Aujourd'hui, les deux camps racontent des versions très différentes de ce qui s'est passé.",
];

const A_PARAGRAPHS = [
  'Écoute, je tremble encore.',
  "Tu sais que le père de Thomas avait tout acheté quand Noah est né ? La poussette, les meubles de la chambre, tous ces cadeaux chers qu'il tenait absolument à acheter.",
  "Explique-moi pourquoi cet homme a débarqué chez moi hier avec un tableau imprimé.",
  'Un tableau.',
  'Je ne plaisante pas.',
  "Il s'est assis à ma table de cuisine et il a commencé à passer les articles un par un, comme s'il faisait l'inventaire d'un entrepôt.",
  "La poussette. Le berceau. La commode. Même l'argent qu'il avait mis pour les études de Noah.",
  "Et là il me dit, très sérieusement : « je trouve normal qu'une partie aille au bébé de Chloé maintenant ».",
  'Et moi je suis là à me dire... normal pour qui ?',
  'Parce que Noah les utilise, ces affaires. Tous les jours.',
  "Ce ne sont pas des cartons qui dorment dans un garage. Ce sont ses affaires à lui.",
  "Ensuite il m'explique qu'il a beaucoup investi et que le patrimoine familial doit rester dans la famille.",
  'Le patrimoine familial ?',
  "Monsieur, c'est votre petit-fils, pas un portefeuille immobilier.",
  'Et là, il sort des reçus.',
  'Des reçus.',
  "D'il y a trois ans.",
  "Qui garde les reçus des cadeaux de naissance, à part quelqu'un qui pense les récupérer un jour ?",
  "C'était complètement dingue.",
  "Le pire, c'est qu'il avait l'air vraiment sidéré quand j'ai dit non.",
  "Comme s'il s'attendait sincèrement à ce que je rende les affaires de mon fils parce qu'un autre petit-enfant arrive.",
  "Je te jure : s'il avait simplement demandé si Noah avait des choses devenues trop petites, j'aurais aidé avec plaisir.",
  'Mais débarquer avec de la paperasse et un plan de récupération ?',
  'Absolument pas.',
];

const B_PARAGRAPHS = [
  "Il faut que je raconte à quelqu'un ce qui s'est vraiment passé, parce qu'apparemment c'est moi le méchant maintenant.",
  "Il y a trois ans, quand Noah est né, j'ai dépensé une fortune pour aider ces enfants.",
  'Une fortune.',
  "Pas parce qu'on m'y a obligé. Parce que je voulais que mon petit-fils ait tout.",
  'Rien que les meubles de la chambre ont coûté plus cher que ma première voiture.',
  "Est-ce que je me suis plaint ? Non.",
  "Est-ce que j'ai déjà demandé de la reconnaissance ? Non.",
  "Aujourd'hui ma fille Chloé attend son premier enfant, et elle galère financièrement.",
  "Alors je me suis dit qu'une partie des affaires chères qui ne servent presque plus pourrait être transmise.",
  'Comme les familles le font depuis des générations.',
  "Au lieu de ça, Élodie a réagi comme si j'essayais de braquer une banque.",
  "Je n'ai jamais dit que je voulais tout récupérer.",
  "J'ai dit qu'on pourrait peut-être discuter de partager quelques-unes des grosses affaires.",
  "Mais à la seconde où j'ai parlé de la poussette, elle s'est mise sur la défensive.",
  'Et franchement ?',
  "Ce qui m'a blessé, ce n'était même pas les affaires.",
  "C'était l'attitude.",
  "L'absence totale de reconnaissance.",
  "Pendant trois ans, je les ai regardés profiter de choses que j'ai payées, et le jour où je propose d'aider un autre petit-enfant, je deviens d'un coup un vieux radin sans cœur.",
  'Et tout le monde se moque de mon tableau.',
  "Excusez-moi d'être organisé.",
  "Quand on parle de dizaines de milliers d'euros, écrire les choses n'est peut-être pas la chose la plus folle du monde.",
  "Je ne cherchais pas à prendre quelque chose à Noah.",
  "Je cherchais à aider Chloé.",
  "Mais dans cette famille, apparemment, c'est devenu un crime.",
];

const NARRATOR_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: 'Le narrateur dit que Bernard a acheté « une poussette haut de gamme ». Que signale ce choix de mots ?',
    opts: [
      "Il achetait des choses pratiques, solides et surtout abordables",
      "Il dépensait beaucoup, sur des produits chers et haut de gamme",
      "Il préférait acheter d'occasion pour dépenser le moins possible",
      "Il n'achetait qu'en promotion",
    ],
    correct: 1,
    explanation:
      '«Haut de gamme» marca producto caro y premium. Indica que Bernard gastó muchísimo más de lo que gasta quien simplemente hace un regalo.',
  },
  {
    type: 'Inferencia',
    q: 'Le narrateur utilise « Soudain » pour décrire le changement de Bernard. Qu\'est-ce que cela implique ?',
    opts: [
      "Le changement a été progressif et attendu depuis longtemps par toute la famille",
      "Bernard avait prévu depuis le début de récupérer les affaires, et il a seulement attendu le bon moment",
      "Le basculement est arrivé juste après un événement précis : la grossesse de sa fille",
      'Chloé a personnellement demandé les affaires à Bernard',
    ],
    correct: 2,
    explanation:
      '«Soudain» contrasta con tres años de generosidad e implica que la motivación de Bernard cambió justo cuando su propia hija quedó embarazada — no poco a poco.',
  },
  {
    type: 'Comprensión',
    q: 'Que contenait le tableau de Bernard ?',
    opts: [
      'La liste des futurs achats pour le nouveau bébé',
      "Chaque cadeau cher qu'il avait acheté",
      'Le budget du foyer',
      'Un contrat entre Bernard et son fils',
    ],
    correct: 1,
    explanation:
      'El narrador dice: «avec un tableau listant chaque cadeau cher qu\'il avait acheté».',
  },
  {
    type: 'Pensamiento crítico',
    q: '« Tout le monde a pensé qu\'il était simplement généreux. » Que suggère le mot « simplement » ?',
    opts: [
      "Bernard était clairement généreux, sans la moindre arrière-pensée derrière ses cadeaux",
      "Il y avait peut-être autre chose derrière cette générosité qu'on n'a pas vu à l'époque",
      "La famille savait depuis toujours que Bernard posait des conditions à chaque cadeau, sans jamais le dire",
      'Bernard cherchait ouvertement à contrôler la famille',
    ],
    correct: 1,
    explanation:
      '«Simplement» sugiere que las apariencias engañaban: deja abierta la posibilidad de que aquella generosidad llevara condiciones que nadie vio hasta ahora.',
  },
];

const A_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: "Élodie compare la visite de Bernard à « l'inventaire d'un entrepôt ». Que fait cette comparaison ?",
    opts: [
      "Une métaphore — Bernard a vraiment vidé la chambre et déplacé les meubles lui-même",
      "Une comparaison — elle le montre froid et commerçant, traitant les cadeaux comme du stock récupérable",
      "Une hyperbole — elle exagère volontairement la scène pour faire rire son amie et rendre Bernard ridicule",
      'Une personnification — elle donne des traits humains au tableau',
    ],
    correct: 1,
    explanation:
      'La comparación le quita a la visita todo el calor familiar. Equipararla a un recuento de almacén muestra que Élodie vivió la escena como una transacción, no como una conversación de familia.',
  },
  {
    type: 'Inferencia',
    q: '« Qui garde les reçus des cadeaux de naissance ? » Que sous-entend cette question rhétorique ?',
    opts: [
      "Que tout le monde devrait garder ses reçus pendant au moins trois ans",
      "Que Bernard est seulement quelqu'un de très ordonné, comme il le dit lui-même dans sa version",
      "Que les reçus prouvent que Bernard comptait récupérer les affaires depuis le début",
      "Qu'Élodie a perdu ses propres reçus",
    ],
    correct: 2,
    explanation:
      'Una pregunta retórica no espera respuesta: dicta un veredicto. Élodie la usa para convertir los recibos en prueba de premeditación, no en simple orden.',
  },
  {
    type: 'Tono',
    q: 'Comment décrirais-tu le mieux le ton du message vocal d\'Élodie ?',
    opts: [
      'Calme et analytique',
      'Chargé en émotion, indigné et incrédule',
      'Triste et plein de regrets',
      'Formel et professionnel',
    ],
    correct: 1,
    explanation:
      '«Je tremble encore», las frases de una sola palabra («Un tableau.», «Des reçus.») y el sarcasmo («pas un portefeuille immobilier») marcan indignación emocional, no análisis.',
  },
  {
    type: 'Comprensión',
    q: "D'après Élodie, quelle demande de Bernard AURAIT été acceptable ?",
    opts: [
      'Arriver avec un tableau détaillé de tous les cadeaux',
      'Exiger la poussette et le berceau immédiatement',
      'Demander si Noah avait des affaires devenues trop petites',
      'Envoyer une demande écrite formelle',
    ],
    correct: 2,
    explanation:
      'Ella lo dice: «s\'il avait simplement demandé si Noah avait des choses devenues trop petites, j\'aurais aidé avec plaisir». El CÓMO pesó tanto como el QUÉ.',
  },
  {
    type: 'Registro',
    q: "« Monsieur, c'est votre petit-fils, pas un portefeuille immobilier. » Que fait Élodie ?",
    opts: [
      "Elle parle sérieusement des placements immobiliers de Bernard, puisqu'il vient de mentionner le patrimoine familial juste avant",
      "Elle utilise l'ironie et un vouvoiement soudain pour souligner qu'il traite la famille comme un investissement",
      "Elle approuve poliment son point de vue",
      "Elle cite le tableau mot pour mot, ligne après ligne, pour lui montrer l'absurdité",
    ],
    correct: 1,
    explanation:
      'Dos golpes a la vez: el vocabulario financiero («portefeuille») se burla de su forma de tratar a la familia como cartera de inversión, y el «Monsieur» repentino convierte la cortesía en distancia.',
  },
];

const B_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: 'Bernard dit que les affaires pourraient être « transmises ». À quelle tradition ce mot renvoie-t-il ?',
    opts: [
      "Rapporter un article en magasin pour se faire rembourser, ce qui expliquerait pourquoi Bernard a gardé les reçus",
      "La pratique familiale de passer des biens d'un membre à un autre au fil des générations",
      "Une procédure légale de succession, comme un héritage réglé devant notaire",
      'Faire un don à une association',
    ],
    correct: 1,
    explanation:
      '«Transmettre» invoca una costumbre familiar, no una devolución. Bernard presenta su petición como práctica cultural, no como exigencia económica.',
  },
  {
    type: 'Comprensión',
    q: "D'après Bernard, qu'a-t-il exactement demandé — par opposition à ce qu'Élodie raconte ?",
    opts: [
      'Chaque article de sa liste, rendu immédiatement',
      "Seulement l'argent de l'épargne pour les études",
      'Une conversation sur le partage de quelques grosses affaires',
      "Des excuses écrites d'Élodie",
    ],
    correct: 2,
    explanation:
      'Bernard dice: «Je n\'ai jamais dit que je voulais tout récupérer. J\'ai dit qu\'on pourrait peut-être discuter…». Contradice directamente el relato de Élodie.',
  },
  {
    type: 'Inferencia',
    q: "« Ce qui m'a blessé, ce n'était même pas les affaires. C'était l'attitude. » Que révèle cette phrase ?",
    opts: [
      "Il fait seulement semblant de se moquer des objets pour paraître désintéressé",
      "Il se sent méprisé sur le plan affectif, malgré des années de générosité",
      "Il veut écarter Élodie de la famille",
      "Il regrette aujourd'hui d'avoir acheté tous ces cadeaux si chers",
    ],
    correct: 1,
    explanation:
      'Al separar «les affaires» de «l\'attitude», Bernard deja claro que la herida emocional —sentirse desechado tras años de dar— le pesa más que el dinero.',
  },
  {
    type: 'Tono',
    q: "« Excusez-moi d'être organisé. » Quel ton porte cette phrase ?",
    opts: [
      'De vrais remords',
      "Une défense sarcastique — il ne pense pas avoir mal agi",
      "De la confusion sur les raisons de la colère des autres",
      'Un registre académique et formel',
    ],
    correct: 1,
    explanation:
      'Es una no-disculpa: tiene forma de disculpa y contenido de reproche. Defiende su acto mientras insinúa que criticarle la tabla es ridículo.',
  },
  {
    type: 'Vocabulario',
    q: '« Apparemment c\'est moi le méchant maintenant. » Que révèle le mot « méchant » ?',
    opts: [
      "Il reconnaît totalement avoir mal agi et accepte le reproche que toute la famille lui adresse maintenant",
      "Il se sent injustement placé dans le rôle du méchant d'une histoire racontée par d'autres",
      "Il emploie un terme juridique technique",
      "Il cherche la pitié par la flatterie, en complimentant ceux qui l'accusent",
    ],
    correct: 1,
    explanation:
      '«Le méchant» es vocabulario de cuento, no de vida real. Bernard lo usa para decir que le han asignado un papel narrativo injusto: es un personaje en la historia que cuentan otros.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Síntesis',
    q: 'Sur quel fait Élodie et Bernard sont-ils D\'ACCORD ?',
    opts: [
      'Bernard voulait récupérer définitivement toutes les affaires',
      "Élodie avait déjà proposé d'elle-même de partager",
      'Bernard est venu avec un tableau',
      'Chloé a demandé les affaires elle-même',
    ],
    correct: 2,
    explanation:
      'La tabla es el único dato objetivo que confirman las dos versiones. Todo lo demás —intención, tono, alcance— está en disputa.',
  },
  {
    type: 'Perspectiva',
    q: "Le narrateur dit que Bernard a demandé « le retour de plusieurs milliers d'euros d'affaires ». Bernard dit avoir « proposé d'en discuter ». Que montre cet écart ?",
    opts: [
      "Le narrateur est hostile à Bernard et choisit les mots les plus durs pour raconter la scène",
      "Il y a un grand écart entre l'intention affichée de Bernard et la façon dont sa demande a été reçue",
      "Élodie a inventé l'essentiel de la scène, puisque dans sa version Bernard n'a jamais demandé qu'on lui rende quoi que ce soit",
      "Le narrateur s'est trompé sur les faits en additionnant des sommes que personne n'a réclamées",
    ],
    correct: 1,
    explanation:
      'Intención frente a impacto. Bernard creía estar abriendo una conversación; Élodie (y el narrador) lo vivieron como una exigencia. Esa distancia es el motor de todo el conflicto.',
  },
  {
    type: 'Pensamiento crítico',
    q: 'Quelle est la cause PROFONDE la plus juste de ce conflit ?',
    opts: [
      "L'avidité de Bernard, qui a gardé les reçus pendant trois ans en attendant de pouvoir tout reprendre",
      "L'ingratitude d'Élodie, qui a profité pendant trois ans sans jamais remercier celui qui payait",
      "Aucune attente n'a été discutée au moment où les cadeaux ont été faits",
      "La décision de Chloé d'avoir un enfant au moment où elle galère financièrement",
    ],
    correct: 2,
    explanation:
      '¿Eran regalos o préstamos con condiciones? Que nadie fijara ese límite en su momento —y no la avaricia ni la ingratitud por separado— es la causa estructural de la disputa.',
  },
  {
    type: 'Inferencia',
    q: "Élodie dit que Bernard avait l'air « vraiment sidéré » face à son refus. Que suggère cette réaction ?",
    opts: [
      "Il jouait la surprise comme tactique",
      "Il n'avait sincèrement pas prévu qu'on puisse trouver sa demande déplacée",
      "Il savait qu'elle refuserait et la testait",
      "On ne lui a jamais rien refusé de sa vie",
    ],
    correct: 1,
    explanation:
      'El asombro genuino revela que Bernard opera con un conjunto de supuestos completamente distinto: no esperaba una negativa porque, dentro de su marco, su petición era razonable.',
  },
  {
    type: 'Registro',
    q: 'Bernard appelle son fils et sa belle-fille « ces enfants ». Que suggère ce choix de mots ?',
    opts: [
      "Son fils et Élodie sont littéralement des enfants, encore trop jeunes pour gérer un budget",
      "Bernard se voit comme l'autorité et eux comme des gens moins expérimentés qu'il a aidés",
      'Bernard a oublié leurs prénoms',
      "C'est une formule affectueuse et un peu vieillie, courante chez les grands-parents quand ils parlent du couple",
    ],
    correct: 1,
    explanation:
      'Llamarlos «ces enfants» los infantiliza: los coloca como receptores de su dinero y su criterio, no como iguales. Refuerza en voz baja su sensación de autoridad.',
  },
];

const KEY_LANGUAGE = [
  { phrase: "faire l'inventaire", meaning: 'hacer recuento de existencias — aquí, aplicado a una familia' },
  { phrase: 'transmettre', meaning: 'pasar algo a otro miembro de la familia, de generación en generación' },
  { phrase: 'question rhétorique', meaning: 'pregunta que no espera respuesta: dicta un veredicto' },
  { phrase: "Excusez-moi d'être…", meaning: 'no-disculpa: forma de disculpa, contenido de reproche' },
  { phrase: 'vouvoyer soudain', meaning: 'pasar al «vous» de golpe: cortesía usada como distancia y arma' },
];

export const leCarnetDuGrandPere: Historia = {
  slug: 'le-carnet-du-grand-pere',
  lang: 'frances',
  icon: '🎙️',
  color: '#059669',
  level: 'B1–B2',
  title: 'Le carnet du grand-père',
  tagline: 'Lo pagó todo cuando nació el nieto. Tres años después llegó con la tabla impresa.',
  metaTitle: 'Le carnet du grand-père — comprensión en francés B1–B2',
  metaDescription:
    
    
    'Lo pagó todo cuando nació el nieto. Tres años después llegó con la tabla impresa. Dos audios, transcripción y 19 preguntas en francés B1–B2.',
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
      name: 'Élodie',
      role: 'la belle-fille',
      sex: 'female',
      color: '#0f3d8c',
      audioSrc: '/audio/historias/frances/le-carnet-du-grand-pere/a.mp3',
      paragraphs: A_PARAGRAPHS,
      questions: A_QS,
      listenHint: 'Escucha con atención. Todavía no hay transcripción — concéntrate en lo que puedas entender.',
      transcriptHint: 'las marcas y ves su traducción. Después vuelve a escribir lo que entendiste.',
      write1Prompt: 'Sin mirar ninguna transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Élodie.',
      write1Hint: 'No te preocupes por que salga perfecto: es una primera impresión. Escribe en español o en francés.',
      write2Prompt: 'Ahora escríbelo otra vez — esta vez puedes entrar en más detalle.',
    },
    {
      key: 'b',
      name: 'Bernard',
      role: 'le beau-père',
      sex: 'male',
      color: '#7c3aed',
      audioSrc: '/audio/historias/frances/le-carnet-du-grand-pere/b.mp3',
      paragraphs: B_PARAGRAPHS,
      questions: B_QS,
      listenHint: 'Escucha primero sin transcripción. Esta es la otra mitad del conflicto.',
      transcriptHint: 'compara la versión de Bernard con la de Élodie: ¿en qué coinciden? ¿Dónde se contradicen?',
      write1Prompt: 'Sin la transcripción, escribe con tus palabras lo que entendiste de la nota de voz de Bernard.',
      write1Hint: '¿Qué dice él que pasó de verdad? Escribe en español o en francés.',
      write2Prompt: 'Ahora escribe otra vez lo que entendiste desde la perspectiva de Bernard.',
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
    note: 'No hay una única respuesta correcta. Lo que importa es sostener tu posición con evidencia de los textos: palabras, frases y detalles concretos. Eso es exactamente lo que pide un B2 en francés.',
  },
  ui: 'es',
};

export default leCarnetDuGrandPere;
