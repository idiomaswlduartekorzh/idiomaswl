import {
  createFrenchEditorialPack,
  type FrenchEditorialErrorSeed,
  type FrenchEditorialFinalSeed,
  type FrenchEditorialGapSeed,
  type FrenchEditorialMicroSeed,
  type FrenchEditorialSequenceSeed,
} from './french-editorial-builder.ts'

const micro: FrenchEditorialMicroSeed[] = [
  { title: 'Le premier train', cue: 'un horaire régulier', segments: ['Le premier train ', ' la gare à 5 h 42 chaque matin.'], verb: 'quitter', answers: ['quitte'], distractors: ['a quitté', 'quittait', 'quittera'] },
  { title: 'Une règle physique', cue: 'un fait général', segments: ['À pression normale, l’eau ', ' à 100 °C.'], verb: 'bouillir', answers: ['bout'], distractors: ['a bouilli', 'bouillait', 'bouillira'] },
  { title: 'Le trajet de Lina', cue: 'une habitude actuelle', segments: ['Lina ', ' au travail à vélo trois fois par semaine.'], verb: 'aller', answers: ['va'], distractors: ['est allée', 'allait', 'ira'] },
  { title: 'La résidence temporaire', cue: 'une situation actuelle', segments: ['Ce mois-ci, nous ', ' chez notre tante pendant les travaux.'], verb: 'loger', answers: ['logeons'], distractors: ['avons logé', 'logions', 'logerons'] },
  { title: 'Le règlement du labo', cue: 'une règle permanente', segments: ['Le laboratoire n’', ' aucune boisson près des appareils.'], verb: 'autoriser', answers: ['autorise'], distractors: ['a autorisé', 'autorisait', 'autorisera'] },
  { title: 'La ligne côtière', cue: 'un fait géographique stable', segments: ['Cette ligne de bus ', ' douze villages avant le port.'], verb: 'desservir', answers: ['dessert'], distractors: ['a desservi', 'desservait', 'desservira'] },
  { title: 'Le service du mardi', cue: 'une organisation récurrente', segments: ['Tous les mardis, vous ', ' l’accueil jusqu’à midi.'], verb: 'tenir', answers: ['tenez'], distractors: ['avez tenu', 'teniez', 'tiendrez'] },
  { title: 'Le capteur solaire', cue: 'le fonctionnement permanent d’un appareil', segments: ['Ce capteur ', ' la lumière en énergie électrique.'], verb: 'convertir', answers: ['convertit'], distractors: ['a converti', 'convertissait', 'convertira'] },
  { title: 'Les dimanches en famille', cue: 'une coutume régulière', segments: ['Mes cousins ', ' déjeuner chez leurs grands-parents le dimanche.'], verb: 'venir', answers: ['viennent'], distractors: ['sont venus', 'venaient', 'viendront'] },
  { title: 'Le calendrier universitaire', cue: 'une date officielle programmée', segments: ['Le semestre d’automne ', ' le 4 septembre.'], verb: 'commencer', answers: ['commence'], distractors: ['a commencé', 'commençait', 'commencera'] },
]

const long: FrenchEditorialGapSeed[] = [
  { title: 'L’ouverture de la boulangerie', instruction: 'Complète cette routine matinale cohérente.', segments: ['Chaque matin, Inès ', ' les volets à six heures. Son frère ', ' les fours pendant qu’elle ', ' la première livraison.'], entries: [['ouvrir', ['ouvre']], ['vérifier', ['vérifie']], ['recevoir', ['reçoit']]] },
  { title: 'Une journée au dispensaire', instruction: 'Complète cette routine professionnelle.', segments: ['La docteure Morel ', ' les rendez-vous avant huit heures. La secrétaire ', ' ensuite l’accueil, puis le premier patient ', ' quelques minutes plus tard.'], entries: [['relire', ['relit']], ['ouvrir', ['ouvre']], ['arriver', ['arrive']]] },
  { title: 'Le parcours du musée', instruction: 'Complète cet horaire public cohérent.', segments: ['Le musée ', ' à dix heures. Une guide ', ' la première visite à dix heures trente et le café ', ' le déjeuner à partir de midi.'], entries: [['ouvrir', ['ouvre']], ['conduire', ['conduit']], ['servir', ['sert']]] },
  { title: 'Le journal de six heures', instruction: 'Complète cette routine de rédaction.', segments: ['Le producteur ', ' les sujets à cinq heures. La rédactrice ', ' chaque nom et le présentateur ', ' le bulletin en direct à six heures.'], entries: [['choisir', ['choisit']], ['vérifier', ['vérifie']], ['lire', ['lit']]] },
  { title: 'La serre automatisée', instruction: 'Complète le fonctionnement de ce système.', segments: ['Un capteur ', ' la température chaque minute. Si l’air devient trop chaud, un ventilateur ', ' automatiquement et la jardinière ', ' une alerte.'], entries: [['mesurer', ['mesure']], ['démarrer', ['démarre']], ['recevoir', ['reçoit']]] },
  { title: 'L’entraînement du samedi', instruction: 'Complète cette routine sportive.', segments: ['L’équipe ', ' à neuf heures chaque samedi. L’entraîneuse ', ' l’échauffement, puis les joueurs ', ' les passes courtes.'], entries: [['se réunir', ['se réunit']], ['diriger', ['dirige']], ['travailler', ['travaillent']]] },
  { title: 'La chaîne de tri', instruction: 'Complète la description de ce processus.', segments: ['Un tapis roulant ', ' les déchets vers l’avant. Un aimant ', ' l’acier et deux techniciennes ', ' le reste à la main.'], entries: [['transporter', ['transporte']], ['retirer', ['retire']], ['trier', ['trient']]] },
  { title: 'La fermeture de la librairie', instruction: 'Complète cette routine du soir.', segments: ['À dix-neuf heures, la caissière ', ' la dernière annonce. Les clients ', ' leurs achats et la responsable ', ' les portes un quart d’heure plus tard.'], entries: [['faire', ['fait']], ['terminer', ['terminent']], ['fermer', ['ferme']]] },
  { title: 'Le bateau des îles', instruction: 'Complète cet itinéraire régulier.', segments: ['Le bateau ', ' l’île à six heures. Il ', ' dans deux petits ports, puis ', ' le continent avant neuf heures.'], entries: [['quitter', ['quitte']], ['s’arrêter', ["s’arrête", "s'arrête"]], ['atteindre', ['atteint']]] },
  { title: 'Le prêt à la médiathèque', instruction: 'Complète cette procédure habituelle.', segments: ['L’usager ', ' un document dans le catalogue. Il ', ' sa carte au comptoir et la bibliothécaire lui ', ' une date de retour.'], entries: [['chercher', ['cherche']], ['présenter', ['présente']], ['indiquer', ['indique']]] },
]

const errors: FrenchEditorialErrorSeed[] = [
  { title: 'Le premier service', pieces: [['Chaque matin, Inès ', 'ouvrent'], [' les volets. Son frère ', 'vérifie'], [' les fours et la boulangère ', 'prépare']], after: ' la vitrine.', wrong: 0, answers: ['ouvre'], reason: 'Le sujet singulier « Inès » exige « ouvre ».' },
  { title: 'À l’accueil du dispensaire', pieces: [['La docteure ', 'relit'], [' la liste. La secrétaire ', 'ouvrent'], [' l’accueil et les patients ', 'attendent']], after: ' dans le couloir.', wrong: 1, answers: ['ouvre'], reason: 'Le sujet singulier « la secrétaire » exige « ouvre ».' },
  { title: 'La première visite', pieces: [['Le musée ', 'ouvrent'], [' à dix heures. La guide ', 'commence'], [' la visite et les touristes la ', 'suivent']], after: ' au premier étage.', wrong: 0, answers: ['ouvre'], reason: 'Le sujet singulier « le musée » exige « ouvre ».' },
  { title: 'Le trajet de Malik', pieces: [['Malik ', 'quittent'], [' son appartement à sept heures. Il ', 'retrouve'], [' Zoé au parc et ils ', 'roulent']], after: ' ensemble jusqu’au bureau.', wrong: 0, answers: ['quitte'], reason: 'Le sujet singulier « Malik » exige « quitte ».' },
  { title: 'Le bulletin local', pieces: [['Le producteur ', 'choisissent'], [' les sujets. La rédactrice ', 'vérifie'], [' les faits et le présentateur ', 'lit']], after: ' les titres en direct.', wrong: 0, answers: ['choisit'], reason: 'Le sujet singulier « le producteur » exige « choisit ».' },
  { title: 'Les commandes de la serre', pieces: [['Le capteur ', 'mesure'], [' la chaleur. Le ventilateur ', 'démarre'], [' et deux fenêtres ', 's’ouvre']], after: ' au plafond.', wrong: 2, answers: ["s’ouvrent", "s'ouvrent"], reason: 'Le sujet pluriel « deux fenêtres » exige « s’ouvrent ».' },
  { title: 'Le samedi au stade', pieces: [['L’équipe ', 'se réunit'], [' à neuf heures. L’entraîneuse ', 'dirigent'], [' l’échauffement et les joueurs ', 'courent']], after: ' autour du terrain.', wrong: 1, answers: ['dirige'], reason: 'Le sujet singulier « l’entraîneuse » exige « dirige ».' },
  { title: 'Le centre de tri', pieces: [['Le tapis ', 'transporte'], [' les déchets. Un aimant ', 'retirent'], [' le métal et les agents ', 'trient']], after: ' le reste.', wrong: 1, answers: ['retire'], reason: 'Le sujet singulier « un aimant » exige « retire ».' },
  { title: 'La fin de journée', pieces: [['La caissière ', 'fait'], [' une annonce. Les clients ', 'termine'], [' leurs achats et la responsable ', 'ferme']], after: ' les portes.', wrong: 1, answers: ['terminent'], reason: 'Le sujet pluriel « les clients » exige « terminent ».' },
  { title: 'Le prêt d’un roman', pieces: [['L’usager ', 'cherche'], [' un titre. Il ', 'présente'], [' sa carte et les bibliothécaires lui ', 'indique']], after: ' la date de retour.', wrong: 2, answers: ['indiquent'], reason: 'Le sujet pluriel « les bibliothécaires » exige « indiquent ».' },
]

const sequences: FrenchEditorialSequenceSeed[] = [
  { events: ['Inès ouvre les volets', 'Son frère vérifie les fours', 'La boulangère remplit la vitrine'], target: 0 },
  { events: ['La docteure relit la liste', 'La secrétaire ouvre l’accueil', 'Le premier patient entre'], target: 1 },
  { events: ['Le musée ouvre', 'La guide conduit le groupe', 'Le café sert le déjeuner'], target: 2 },
  { events: ['Malik quitte son appartement', 'Il retrouve Zoé au parc', 'Ils arrivent au bureau'], target: 0 },
  { events: ['Le producteur choisit les sujets', 'La rédactrice vérifie les faits', 'Le présentateur lit le bulletin'], target: 1 },
  { events: ['Le capteur mesure la chaleur', 'Le ventilateur démarre', 'La jardinière reçoit une alerte'], target: 2 },
  { events: ['L’équipe se réunit', 'L’entraîneuse dirige l’échauffement', 'Les joueurs travaillent les passes'], target: 0 },
  { events: ['Le tapis transporte les déchets', 'L’aimant retire l’acier', 'Les agentes trient le reste'], target: 1 },
  { events: ['La caissière fait une annonce', 'Les clients terminent leurs achats', 'La responsable ferme les portes'], target: 2 },
  { events: ['L’usager cherche un titre', 'Il présente sa carte', 'La bibliothécaire indique la date de retour'], target: 0 },
]

const final: FrenchEditorialFinalSeed[] = [
  { before: 'Chaque lundi, la responsable ', after: ' les stocks avant l’ouverture.', answer: 'compte', distractors: ['a compté', 'comptait', 'comptera'] },
  { before: 'Le tram de l’aéroport ', after: ' toutes les quinze minutes.', answer: 'passe', distractors: ['est passé', 'passait', 'passera'] },
  { before: 'Ce logiciel ', after: ' une copie après chaque modification.', answer: 'crée', distractors: ['a créé', 'créait', 'créera'] },
  { before: 'Mes voisins ', after: ' leur stand au marché le samedi.', answer: 'tiennent', distractors: ['ont tenu', 'tenaient', 'tiendront'] },
  { before: 'La Lune ', after: ' la lumière du Soleil.', answer: 'réfléchit', distractors: ['a réfléchi', 'réfléchissait', 'réfléchira'] },
  { before: 'Cette porte ', after: ' quand le voyant devient vert.', answer: 'se déverrouille', distractors: ["s’est déverrouillée", 'se déverrouillait', 'se déverrouillera'] },
  { before: 'Le sentier côtier ', after: ' près de l’ancien phare.', answer: 'finit', distractors: ['a fini', 'finissait', 'finira'] },
  { before: 'Notre chorale ', after: ' dans la salle municipale le jeudi.', answer: 'répète', distractors: ['a répété', 'répétait', 'répétera'] },
  { before: 'Deux techniciens ', after: ' le générateur une fois par mois.', answer: 'testent', distractors: ['ont testé', 'testaient', 'testeront'] },
  { before: 'L’exposition d’hiver ', after: ' le premier lundi de décembre.', answer: 'ouvre', distractors: ['a ouvert', 'ouvrait', 'ouvrira'] },
]

export const FRENCH_PRESENT_EDITORIAL = createFrenchEditorialPack({
  slug: 'present',
  form: 'present',
  focus: 'Présent',
  rule: 'Le présent exprime une habitude, un fait stable, une règle, une situation actuelle ou un horaire officiel.',
  micro,
  long,
  errors,
  sequences,
  final,
})
