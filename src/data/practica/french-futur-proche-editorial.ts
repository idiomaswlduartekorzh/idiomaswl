import {
  createFrenchEditorialPack,
  type FrenchEditorialErrorSeed,
  type FrenchEditorialFinalSeed,
  type FrenchEditorialGapSeed,
  type FrenchEditorialMicroSeed,
  type FrenchEditorialSequenceSeed,
} from './french-editorial-builder.ts'

const micro: FrenchEditorialMicroSeed[] = [
  { title: 'Les nuages noirs', cue: 'une prédiction immédiate fondée sur un indice', segments: ['Regarde ces nuages : il ', '.'], verb: 'pleuvoir', answers: ['va pleuvoir'], distractors: ['pleut', 'pleuvra', 'pleuvrait'] },
  { title: 'Les billets achetés', cue: 'un projet déjà décidé', segments: ['Nous avons les billets ; nous ', ' vendredi matin.'], verb: 'partir', answers: ['allons partir'], distractors: ['partons', 'partirons', 'partirions'] },
  { title: 'Le verre au bord', cue: 'un événement imminent', segments: ['Attention, ce verre ', ' !'], verb: 'tomber', answers: ['va tomber'], distractors: ['tombe', 'tombera', 'tomberait'] },
  { title: 'Le rendez-vous confirmé', cue: 'une intention organisée', segments: ['J’ai confirmé l’heure : je ', ' la directrice à quinze heures.'], verb: 'rencontrer', answers: ['vais rencontrer'], distractors: ['rencontre', 'rencontrerai', 'rencontrerais'] },
  { title: 'La batterie rouge', cue: 'une conséquence très proche visible', segments: ['La batterie est à 1 % ; le téléphone ', '.'], verb: 's’éteindre', answers: ['va s’éteindre', "va s'éteindre"], distractors: ["s’éteint", "s’éteindra", "s’éteindrait"] },
  { title: 'Le dîner prévu', cue: 'un plan collectif déjà préparé', segments: ['Tout est acheté ; ce soir, nous ', ' pour dix personnes.'], verb: 'cuisiner', answers: ['allons cuisiner'], distractors: ['cuisinons', 'cuisinerons', 'cuisinerions'] },
  { title: 'La valise prête', cue: 'un départ décidé et proche', segments: ['Sa valise est dans l’entrée : Lina ', ' pour Bruxelles.'], verb: 'partir', answers: ['va partir'], distractors: ['part', 'partira', 'partirait'] },
  { title: 'Les outils sur la table', cue: 'une action imminente préparée', segments: ['Les outils sont prêts ; vous ', ' l’étagère maintenant.'], verb: 'réparer', answers: ['allez réparer'], distractors: ['réparez', 'réparerez', 'répareriez'] },
  { title: 'La salle réservée', cue: 'un événement proche déjà organisé', segments: ['La salle est réservée : ils ', ' le projet demain.'], verb: 'présenter', answers: ['vont présenter'], distractors: ['présentent', 'présenteront', 'présenteraient'] },
  { title: 'Le four préchauffé', cue: 'une action sur le point de commencer', segments: ['Le four est chaud ; tu ', ' le gâteau.'], verb: 'enfourner', answers: ['vas enfourner'], distractors: ['enfournes', 'enfourneras', 'enfournerais'] },
]

const long: FrenchEditorialGapSeed[] = [
  { title: 'Le départ en randonnée', instruction: 'Complète ce projet immédiat et cohérent.', segments: ['Les sacs sont prêts. Nous ', ' la maison dans cinq minutes, puis nous ', ' le bus de six heures et nous ', ' le sentier avant huit heures.'], entries: [['quitter', ['allons quitter']], ['prendre', ['allons prendre']], ['commencer', ['allons commencer']]] },
  { title: 'La démonstration du robot', instruction: 'Complète ce plan déjà organisé.', segments: ['Le robot est branché. La technicienne ', ' le programme, elle ', ' les capteurs et elle ', ' le premier test devant le public.'], entries: [['lancer', ['va lancer']], ['calibrer', ['va calibrer']], ['effectuer', ['va effectuer']]] },
  { title: 'L’orage approche', instruction: 'Complète ces conséquences imminentes.', segments: ['Le ciel devient noir. Le vent ', ', les premières gouttes ', ' et les promeneurs ', ' vers l’abri.'], entries: [['se lever', ['va se lever']], ['tomber', ['vont tomber']], ['courir', ['vont courir']]] },
  { title: 'Le dîner d’anniversaire', instruction: 'Complète ce programme préparé.', segments: ['Les invités arrivent bientôt. Mina ', ' l’entrée, son frère ', ' le plat et leurs amis ', ' le gâteau à vingt et une heures.'], entries: [['servir', ['va servir']], ['apporter', ['va apporter']], ['découper', ['vont découper']]] },
  { title: 'La réunion de crise', instruction: 'Complète ces actions décidées.', segments: ['La direction a convoqué tout le monde. Elle ', ' la situation, nous ', ' les solutions possibles et le comité ', ' avant midi.'], entries: [['expliquer', ['va expliquer']], ['examiner', ['allons examiner']], ['voter', ['va voter']]] },
  { title: 'Le déménagement de demain', instruction: 'Complète ce plan proche.', segments: ['Le camion est réservé. Les voisins ', ' les cartons, je ', ' les meubles et nous ', ' les clés à dix-huit heures.'], entries: [['porter', ['vont porter']], ['démonter', ['vais démonter']], ['rendre', ['allons rendre']]] },
  { title: 'La réparation urgente', instruction: 'Complète cette intervention imminente.', segments: ['La pièce de rechange vient d’arriver. Le mécanicien ', ' le moteur, son assistante ', ' la courroie et ils ', ' la machine avant le déjeuner.'], entries: [['ouvrir', ['va ouvrir']], ['changer', ['va changer']], ['tester', ['vont tester']]] },
  { title: 'Le tournage de cet après-midi', instruction: 'Complète ce programme déjà fixé.', segments: ['Les caméras sont installées. L’actrice ', ' la première scène, le réalisateur ', ' les images et l’équipe ', ' le décor suivant.'], entries: [['jouer', ['va jouer']], ['vérifier', ['va vérifier']], ['préparer', ['va préparer']]] },
  { title: 'La fermeture pour travaux', instruction: 'Complète ces changements annoncés.', segments: ['Les affiches sont posées. Le magasin ', ' vendredi, les ouvriers ', ' les vitrines et la direction ', ' le lieu en juin.'], entries: [['fermer', ['va fermer']], ['remplacer', ['vont remplacer']], ['rouvrir', ['va rouvrir']]] },
  { title: 'Le cours dans un instant', instruction: 'Complète les actions sur le point de commencer.', segments: ['Les élèves sont assis. La professeure ', ' les consignes, nous ', ' le premier exercice et chacun ', ' sa réponse avec un voisin.'], entries: [['donner', ['va donner']], ['commencer', ['allons commencer']], ['comparer', ['va comparer']]] },
]

const errors: FrenchEditorialErrorSeed[] = [
  { title: 'La randonnée imminente', pieces: [['Les sacs sont prêts. Nous ', 'allez quitter'], [' la maison, nous ', 'allons prendre'], [' le bus et nous ', 'allons commencer']], after: ' le sentier.', wrong: 0, answers: ['allons quitter'], reason: 'Le sujet « nous » exige « allons quitter ».' },
  { title: 'Le robot prêt', pieces: [['La technicienne ', 'vont lancer'], [' le programme, ', 'va calibrer'], [' les capteurs et ', 'va effectuer']], after: ' le test.', wrong: 0, answers: ['va lancer'], reason: 'Le sujet singulier « la technicienne » exige « va lancer ».' },
  { title: 'L’orage visible', pieces: [['Le vent ', 'vont se lever'], [', les gouttes ', 'vont tomber'], [' et les promeneurs ', 'vont courir']], after: ' vers l’abri.', wrong: 0, answers: ['va se lever'], reason: 'Le sujet singulier « le vent » exige « va se lever ».' },
  { title: 'Le dîner préparé', pieces: [['Mina ', 'va servir'], [' l’entrée, son frère ', 'vas apporter'], [' le plat et leurs amis ', 'vont découper']], after: ' le gâteau.', wrong: 1, answers: ['va apporter'], reason: 'Le sujet singulier « son frère » exige « va ».' },
  { title: 'La réunion annoncée', pieces: [['La direction ', 'va expliquer'], [' la situation, nous ', 'allons examiner'], [' les solutions et le comité ', 'vont voter']], after: ' avant midi.', wrong: 2, answers: ['va voter'], reason: 'Le nom collectif singulier « le comité » exige « va ».' },
  { title: 'Le déménagement planifié', pieces: [['Les voisins ', 'vont porter'], [' les cartons, je ', 'vais démonter'], [' les meubles et nous ', 'allons rendons']], after: ' les clés.', wrong: 2, answers: ['allons rendre'], reason: 'Après « allons », le verbe principal reste à l’infinitif.' },
  { title: 'La pièce de rechange', pieces: [['Le mécanicien ', 'va ouvrir'], [' le moteur, son assistante ', 'va changer'], [' la courroie et ils ', 'va tester']], after: ' la machine.', wrong: 2, answers: ['vont tester'], reason: 'Le pronom pluriel « ils » exige « vont ».' },
  { title: 'Le tournage préparé', pieces: [['L’actrice ', 'va jouer'], [' la scène, le réalisateur ', 'va vérifier'], [' les images et l’équipe ', 'va préparée']], after: ' le décor.', wrong: 2, answers: ['va préparer'], reason: 'Le futur proche exige l’infinitif « préparer », sans accord.' },
  { title: 'Les travaux annoncés', pieces: [['Le magasin ', 'va fermer'], [' vendredi, les ouvriers ', 'vont remplacer'], [' les vitrines et la direction ', 'vont rouvrir']], after: ' en juin.', wrong: 2, answers: ['va rouvrir'], reason: 'Le sujet singulier « la direction » exige « va ».' },
  { title: 'Le cours commence bientôt', pieces: [['La professeure ', 'va donner'], [' les consignes, nous ', 'allons commencer'], [' et chacun ', 'vont comparer']], after: ' sa réponse.', wrong: 2, answers: ['va comparer'], reason: 'Le pronom indéfini singulier « chacun » exige « va ».' },
]

const sequences: FrenchEditorialSequenceSeed[] = [
  { events: ['Nous allons quitter la maison', 'Nous allons prendre le bus', 'Nous allons commencer le sentier'], target: 0 },
  { events: ['La technicienne va lancer le programme', 'Elle va calibrer les capteurs', 'Elle va effectuer le test'], target: 1 },
  { events: ['Le vent va se lever', 'Les gouttes vont tomber', 'Les promeneurs vont courir vers l’abri'], target: 2 },
  { events: ['Mina va servir l’entrée', 'Son frère va apporter le plat', 'Leurs amis vont découper le gâteau'], target: 0 },
  { events: ['La direction va expliquer la situation', 'Nous allons examiner les solutions', 'Le comité va voter'], target: 1 },
  { events: ['Les voisins vont porter les cartons', 'Je vais démonter les meubles', 'Nous allons rendre les clés'], target: 2 },
  { events: ['Le mécanicien va ouvrir le moteur', 'Son assistante va changer la courroie', 'Ils vont tester la machine'], target: 0 },
  { events: ['L’actrice va jouer la scène', 'Le réalisateur va vérifier les images', 'L’équipe va préparer le décor'], target: 1 },
  { events: ['Le magasin va fermer', 'Les ouvriers vont remplacer les vitrines', 'La direction va rouvrir le lieu'], target: 2 },
  { events: ['La professeure va donner les consignes', 'Nous allons commencer l’exercice', 'Chacun va comparer sa réponse'], target: 0 },
]

const final: FrenchEditorialFinalSeed[] = [
  { before: 'La valise est prête : je ', after: ' dans quelques minutes.', answer: 'vais partir', distractors: ['pars', 'partirai', 'partirais'] },
  { before: 'Regarde la fumée : l’alarme ', after: ' !', answer: 'va sonner', distractors: ['sonne', 'sonnera', 'sonnerait'] },
  { before: 'Nous avons réservé la salle ; nous ', after: ' la cérémonie demain.', answer: 'allons organiser', distractors: ['organisons', 'organiserons', 'organiserions'] },
  { before: 'Les joueurs sont sur le terrain : le match ', after: '.', answer: 'va commencer', distractors: ['commence', 'commencera', 'commencerait'] },
  { before: 'Le voyant rouge clignote ; les machines ', after: '.', answer: 'vont s’arrêter', distractors: ["s’arrêtent", "s’arrêteront", "s’arrêteraient"] },
  { before: 'Tu as déjà choisi les couleurs ; tu ', after: ' le mur cet après-midi.', answer: 'vas peindre', distractors: ['peins', 'peindras', 'peindrais'] },
  { before: 'Le contrat est signé : elle ', after: ' lundi prochain.', answer: 'va commencer', distractors: ['commence', 'commencera', 'commencerait'] },
  { before: 'Les billets sont imprimés ; vous ', after: ' à huit heures.', answer: 'allez embarquer', distractors: ['embarquez', 'embarquerez', 'embarqueriez'] },
  { before: 'Le micro est ouvert : le maire ', after: ' les résultats.', answer: 'va annoncer', distractors: ['annonce', 'annoncera', 'annoncerait'] },
  { before: 'J’ai sorti tous les ingrédients ; nous ', after: ' la pâte maintenant.', answer: 'allons préparer', distractors: ['préparons', 'préparerons', 'préparerions'] },
]

export const FRENCH_FUTUR_PROCHE_EDITORIAL = createFrenchEditorialPack({
  slug: 'futur-proche',
  form: 'futur-proche',
  focus: 'Futur proche',
  rule: 'Aller au présent suivi de l’infinitif exprime un projet décidé, une action imminente ou une prédiction fondée sur un indice présent.',
  micro,
  long,
  errors,
  sequences,
  final,
})
