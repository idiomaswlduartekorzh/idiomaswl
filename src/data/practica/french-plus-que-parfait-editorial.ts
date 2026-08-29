import {
  createFrenchEditorialPack,
  type FrenchEditorialErrorSeed,
  type FrenchEditorialFinalSeed,
  type FrenchEditorialGapSeed,
  type FrenchEditorialMicroSeed,
  type FrenchEditorialSequenceSeed,
} from './french-editorial-builder.ts'

const micro: FrenchEditorialMicroSeed[] = [
  { title: 'Les places du train', cue: 'un fait accompli avant le départ du train', segments: ['Quand le train est parti, nous ', ' nos places depuis dix minutes.'], verb: 'trouver', answers: ['avions trouvé'], distractors: ['avons trouvé', 'trouvions', 'aurons trouvé'] },
  { title: 'Le séjour à Rome', cue: 'une expérience antérieure à un récit passé', segments: ['Elle connaissait déjà Rome parce qu’elle y ', ' deux ans plus tôt.'], verb: 'aller', answers: ['était allée'], distractors: ['est allée', 'allait', 'sera allée'] },
  { title: 'La porte ouverte', cue: 'une cause achevée avant une entrée passée', segments: ['Ils ont pu entrer parce que Marc ', ' la porte ouverte.'], verb: 'laisser', answers: ['avait laissé'], distractors: ['a laissé', 'laissait', 'aura laissé'] },
  { title: 'Le fichier disparu', cue: 'une suppression antérieure à la recherche', segments: ['Quand Léa a cherché le fichier, son collègue l’', ' par erreur.'], verb: 'supprimer', answers: ['avait supprimé'], distractors: ['a supprimé', 'supprimait', 'aura supprimé'] },
  { title: 'Le départ avant l’appel', cue: 'un départ accompli avant un autre fait passé', segments: ['Lorsque nous avons appelé, les voisines ', ' depuis une heure.'], verb: 'partir', answers: ['étaient parties'], distractors: ['sont parties', 'partaient', 'seront parties'] },
  { title: 'La batterie vide', cue: 'une cause antérieure à une panne passée', segments: ['Le téléphone ne s’est pas allumé parce que la batterie ', ' pendant la nuit.'], verb: 'se décharger', answers: ['s’était déchargée', "s'était déchargée"], distractors: ["s’est déchargée", 'se déchargeait', 'se sera déchargée'] },
  { title: 'Le message compris', cue: 'une préparation accomplie avant une réunion passée', segments: ['Pendant la réunion, je connaissais le sujet car j’', ' le rapport la veille.'], verb: 'lire', answers: ['avais lu'], distractors: ['ai lu', 'lisais', 'aurai lu'] },
  { title: 'Les billets réservés', cue: 'une réservation antérieure à un voyage passé', segments: ['Nous sommes partis sereins : vous ', ' tous les billets en janvier.'], verb: 'réserver', answers: ['aviez réservé'], distractors: ['avez réservé', 'réserviez', 'aurez réservé'] },
  { title: 'La salle préparée', cue: 'une action terminée avant l’arrivée des invités', segments: ['À l’arrivée des invités, l’équipe ', ' toute la salle.'], verb: 'préparer', answers: ['avait préparé'], distractors: ['a préparé', 'préparait', 'aura préparé'] },
  { title: 'Les randonneurs revenus', cue: 'un retour antérieur au début de l’orage', segments: ['Quand l’orage a commencé, les randonneuses ', ' au refuge.'], verb: 'revenir', answers: ['étaient revenues'], distractors: ['sont revenues', 'revenaient', 'seront revenues'] },
]

const long: FrenchEditorialGapSeed[] = [
  { title: 'Avant l’ouverture du restaurant', instruction: 'Complète les trois préparatifs antérieurs au service.', segments: ['Quand les premiers clients sont arrivés, le chef ', ' le menu. Son équipe ', ' les légumes et la responsable ', ' toutes les réservations.'], entries: [['finaliser', ['avait finalisé']], ['préparer', ['avait préparé']], ['confirmer', ['avait confirmé']]] },
  { title: 'Le bureau après le cambriolage', instruction: 'Complète les faits accomplis avant l’arrivée de la police.', segments: ['Avant que la police n’arrive, les intrus ', ' une fenêtre. Ils ', ' deux ordinateurs et ils ', ' par la cour arrière.'], entries: [['forcer', ['avaient forcé']], ['prendre', ['avaient pris']], ['sortir', ['étaient sortis']]] },
  { title: 'Le voyage sans stress', instruction: 'Complète les préparatifs antérieurs au départ.', segments: ['Quand nous avons quitté la maison, Zoé ', ' les passeports. J’', ' les billets et nous ', ' un taxi pour six heures.'], entries: [['vérifier', ['avait vérifié']], ['imprimer', ['avais imprimé']], ['réserver', ['avions réservé']]] },
  { title: 'La reprise du chantier', instruction: 'Complète les étapes terminées avant la reprise passée.', segments: ['Lorsque les ouvriers sont revenus, l’ingénieure ', ' les plans. La mairie ', ' le permis et les fournisseurs ', ' les matériaux.'], entries: [['corriger', ['avait corrigé']], ['signer', ['avait signé']], ['livrer', ['avaient livré']]] },
  { title: 'Le spectacle sauvé', instruction: 'Complète les actions antérieures au lever du rideau.', segments: ['Avant le début du spectacle, les techniciens ', ' le projecteur. La costumière ', ' la veste et l’actrice ', ' son texte une dernière fois.'], entries: [['réparer', ['avaient réparé']], ['recoudre', ['avait recousu']], ['relire', ['avait relu']]] },
  { title: 'Le quartier après la crue', instruction: 'Complète les changements survenus avant la visite.', segments: ['Quand nous avons revu le quartier, la rivière ', ' plusieurs rues. Des familles ', ' leurs maisons et la mairie ', ' un centre d’accueil.'], entries: [['inonder', ['avait inondé']], ['quitter', ['avaient quitté']], ['ouvrir', ['avait ouvert']]] },
  { title: 'La candidature de Mina', instruction: 'Complète les étapes antérieures à l’entretien.', segments: ['Avant son entretien, Mina ', ' son CV. Elle ', ' deux anciens collègues et elle ', ' une présentation de cinq minutes.'], entries: [['mettre à jour', ['avait mis à jour']], ['contacter', ['avait contacté']], ['préparer', ['avait préparé']]] },
  { title: 'La panne évitée', instruction: 'Complète les contrôles antérieurs au redémarrage.', segments: ['Quand le réseau a redémarré, l’équipe ', ' le câble défectueux. Elle ', ' une copie des données et elle ', ' tous les accès externes.'], entries: [['remplacer', ['avait remplacé']], ['faire', ['avait fait']], ['bloquer', ['avait bloqué']]] },
  { title: 'Le refuge avant la neige', instruction: 'Complète les actions terminées avant la tempête.', segments: ['Lorsque la neige a commencé, les gardiens ', ' les volets. Ils ', ' du bois sec et tous les randonneurs ', ' à l’intérieur.'], entries: [['fermer', ['avaient fermé']], ['rentrer', ['avaient rentré']], ['revenir', ['étaient revenus']]] },
  { title: 'L’exposition retrouvée', instruction: 'Complète les recherches antérieures à la découverte.', segments: ['Quand la toile a reparu, la conservatrice ', ' les archives. Deux experts ', ' la signature et un laboratoire ', ' les pigments.'], entries: [['consulter', ['avait consulté']], ['comparer', ['avaient comparé']], ['analyser', ['avait analysé']]] },
]

const errors: FrenchEditorialErrorSeed[] = [
  { title: 'Avant le service', pieces: [['Le chef ', 'avaient finalisé'], [' le menu. Son équipe ', 'avait préparé'], [' les légumes et la responsable ', 'avait confirmé']], after: ' les réservations avant l’arrivée des clients.', wrong: 0, answers: ['avait finalisé'], reason: 'Le sujet singulier « le chef » exige « avait finalisé ».' },
  { title: 'Avant la police', pieces: [['Les intrus ', 'avait forcé'], [' une fenêtre, ', 'avaient pris'], [' les ordinateurs et ', 'étaient sortis']], after: ' par la cour avant l’arrivée de la police.', wrong: 0, answers: ['avaient forcé'], reason: 'Le sujet pluriel « les intrus » exige « avaient forcé ».' },
  { title: 'Les préparatifs du voyage', pieces: [['Zoé ', 'avait vérifiée'], [' les passeports. J’', 'avais imprimé'], [' les billets et nous ', 'avions réservé']], after: ' un taxi avant de partir.', wrong: 0, answers: ['avait vérifié'], reason: 'Avec avoir et sans objet antéposé, « vérifié » ne s’accorde pas avec Zoé.' },
  { title: 'Avant la reprise', pieces: [['L’ingénieure ', 'avaient corrigé'], [' les plans. La mairie ', 'avait signé'], [' le permis et les fournisseurs ', 'avaient livré']], after: ' les matériaux.', wrong: 0, answers: ['avait corrigé'], reason: 'Le sujet singulier « l’ingénieure » exige « avait corrigé ».' },
  { title: 'Les préparatifs du spectacle', pieces: [['Les techniciens ', 'avaient réparé'], [' le projecteur. La costumière ', 'avait recousu'], [' la veste et l’actrice ', 'avait relis']], after: ' son texte.', wrong: 2, answers: ['avait relu'], reason: 'Le participe passé de « relire » est « relu ».' },
  { title: 'Après la crue', pieces: [['La rivière ', 'avait inondé'], [' les rues. Des familles ', 'étaient quitté'], [' leurs maisons et la mairie ', 'avait ouvert']], after: ' un centre.', wrong: 1, answers: ['avaient quitté'], reason: '« Quitter » est transitif et se construit ici avec avoir.' },
  { title: 'Avant l’entretien', pieces: [['Mina ', 'avait mis'], [' son CV à jour. Elle ', 'avait contacté'], [' des collègues et elle ', 'avait préparer']], after: ' une présentation.', wrong: 2, answers: ['avait préparé'], reason: 'Le plus-que-parfait exige le participe passé « préparé ».' },
  { title: 'Avant le redémarrage', pieces: [['L’équipe ', 'avait remplacé'], [' le câble. Elle ', 'avait fait'], [' une copie et elle ', 'avaient bloqué']], after: ' les accès externes.', wrong: 2, answers: ['avait bloqué'], reason: 'Le sujet singulier « elle » exige « avait bloqué ».' },
  { title: 'Avant la neige', pieces: [['Les gardiens ', 'avaient fermé'], [' les volets. Ils ', 'avaient rentré'], [' le bois et les randonneurs ', 'avaient revenus']], after: ' au refuge.', wrong: 2, answers: ['étaient revenus'], reason: 'Le retour intransitif se construit avec être et s’accorde au pluriel.' },
  { title: 'Avant la découverte', pieces: [['La conservatrice ', 'avait consulté'], [' les archives. Deux experts ', 'avait comparé'], [' la signature et un laboratoire ', 'avait analysé']], after: ' les pigments.', wrong: 1, answers: ['avaient comparé'], reason: 'Le sujet pluriel « deux experts » exige « avaient comparé ».' },
]

const sequences: FrenchEditorialSequenceSeed[] = [
  { events: ['Le chef avait finalisé le menu', 'L’équipe avait préparé les légumes', 'La responsable avait confirmé les réservations'], target: 0 },
  { events: ['Les intrus avaient forcé la fenêtre', 'Ils avaient pris les ordinateurs', 'Ils étaient sortis par la cour'], target: 1 },
  { events: ['Zoé avait vérifié les passeports', 'J’avais imprimé les billets', 'Nous avions réservé le taxi'], target: 2 },
  { events: ['L’ingénieure avait corrigé les plans', 'La mairie avait signé le permis', 'Les fournisseurs avaient livré les matériaux'], target: 0 },
  { events: ['Les techniciens avaient réparé le projecteur', 'La costumière avait recousu la veste', 'L’actrice avait relu son texte'], target: 1 },
  { events: ['La rivière avait inondé les rues', 'Des familles avaient quitté leurs maisons', 'La mairie avait ouvert un centre'], target: 2 },
  { events: ['Mina avait mis son CV à jour', 'Elle avait contacté ses collègues', 'Elle avait préparé sa présentation'], target: 0 },
  { events: ['L’équipe avait remplacé le câble', 'Elle avait fait une copie', 'Elle avait bloqué les accès'], target: 1 },
  { events: ['Les gardiens avaient fermé les volets', 'Ils avaient rentré le bois', 'Les randonneurs étaient revenus'], target: 2 },
  { events: ['La conservatrice avait consulté les archives', 'Les experts avaient comparé la signature', 'Le laboratoire avait analysé les pigments'], target: 0 },
]

const final: FrenchEditorialFinalSeed[] = [
  { before: 'Quand le directeur est arrivé, nous ', after: ' le problème depuis une heure.', answer: 'avions résolu', distractors: ['avons résolu', 'résolvions', 'aurons résolu'] },
  { before: 'Elle a reconnu la rue où elle ', after: ' dix ans plus tôt.', answer: 'avait vécu', distractors: ['a vécu', 'vivait', 'aura vécu'] },
  { before: 'Les portes étaient ouvertes parce que le gardien les ', after: ' avant de partir.', answer: 'avait déverrouillées', distractors: ['a déverrouillées', 'déverrouillait', 'aura déverrouillées'] },
  { before: 'Lorsque j’ai consulté ma boîte, tu m’', after: ' trois messages.', answer: 'avais envoyé', distractors: ['as envoyé', 'envoyais', 'auras envoyé'] },
  { before: 'Au début de la réunion, les invitées ', after: ' dans la salle.', answer: 'étaient entrées', distractors: ['sont entrées', 'entraient', 'seront entrées'] },
  { before: 'Il ne pouvait pas payer : il ', after: ' son portefeuille chez lui.', answer: 'avait oublié', distractors: ['a oublié', 'oubliait', 'aura oublié'] },
  { before: 'À notre arrivée, vous ', after: ' tous les documents.', answer: 'aviez classé', distractors: ['avez classé', 'classiez', 'aurez classé'] },
  { before: 'Le jardin était détrempé parce qu’il ', after: ' toute la nuit.', answer: 'avait plu', distractors: ['a plu', 'pleuvait', 'aura plu'] },
  { before: 'Quand l’alarme a sonné, les élèves ', after: ' du bâtiment.', answer: 'étaient sortis', distractors: ['sont sortis', 'sortaient', 'seront sortis'] },
  { before: 'Le client a accepté l’offre que nous lui ', after: ' la veille.', answer: 'avions proposée', distractors: ['avons proposée', 'proposions', 'aurons proposée'] },
]

export const FRENCH_PLUS_QUE_PARFAIT_EDITORIAL = createFrenchEditorialPack({
  slug: 'plus-que-parfait',
  form: 'plus-que-parfait',
  focus: 'Plus-que-parfait',
  rule: 'Le plus-que-parfait place un fait déjà accompli avant un autre repère explicitement passé.',
  micro,
  long,
  errors,
  sequences,
  final,
})
