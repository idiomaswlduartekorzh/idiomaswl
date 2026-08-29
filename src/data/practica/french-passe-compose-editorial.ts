import {
  createFrenchEditorialPack,
  type FrenchEditorialErrorSeed,
  type FrenchEditorialFinalSeed,
  type FrenchEditorialGapSeed,
  type FrenchEditorialMicroSeed,
  type FrenchEditorialSequenceSeed,
} from './french-editorial-builder.ts'

const micro: FrenchEditorialMicroSeed[] = [
  { title: 'Le dossier envoyé', cue: 'une action achevée hier', segments: ['Hier, nous ', ' le dossier avant midi.'], verb: 'envoyer', answers: ['avons envoyé'], distractors: ['envoyions', 'avions envoyé', 'enverrons'] },
  { title: 'L’arrivée de Camille', cue: 'un déplacement achevé avec être', segments: ['Camille ', ' à Lyon samedi dernier.'], verb: 'arriver', answers: ['est arrivée'], distractors: ['a arrivé', 'arrivait', 'était arrivée'] },
  { title: 'Le film de la semaine', cue: 'un bilan dans une période encore ouverte', segments: ['Tu ', ' ce film trois fois cette semaine.'], verb: 'voir', answers: ['as vu'], distractors: ['voyais', 'avais vu', 'verras'] },
  { title: 'La panne de ce matin', cue: 'un événement achevé ce matin', segments: ['Le technicien ', ' le serveur à neuf heures.'], verb: 'réparer', answers: ['a réparé'], distractors: ['réparait', 'avait réparé', 'réparera'] },
  { title: 'Le départ des voisines', cue: 'un départ féminin pluriel achevé', segments: ['Mes voisines ', ' très tôt dimanche.'], verb: 'partir', answers: ['sont parties'], distractors: ['ont parti', 'partaient', 'étaient parties'] },
  { title: 'Une décision récente', cue: 'une décision ponctuelle achevée', segments: ['Ce matin, je ', ' de refuser la proposition.'], verb: 'décider', answers: ['ai décidé'], distractors: ['décidais', 'avais décidé', 'déciderai'] },
  { title: 'La tasse cassée', cue: 'un résultat ponctuel terminé', segments: ['En rangeant la cuisine, vous ', ' une tasse.'], verb: 'casser', answers: ['avez cassé'], distractors: ['cassiez', 'aviez cassé', 'casserez'] },
  { title: 'Le retour de Malik', cue: 'un retour achevé avec être', segments: ['Malik ', ' de voyage lundi soir.'], verb: 'revenir', answers: ['est revenu'], distractors: ['a revenu', 'revenait', 'était revenu'] },
  { title: 'Les clés retrouvées', cue: 'un accomplissement récent', segments: ['Enfin, elles ', ' les clés sous le canapé.'], verb: 'retrouver', answers: ['ont retrouvé'], distractors: ['retrouvaient', 'avaient retrouvé', 'retrouveront'] },
  { title: 'La montée au refuge', cue: 'un déplacement féminin pluriel achevé', segments: ['Après le déjeuner, Léa et Zoé ', ' jusqu’au refuge.'], verb: 'monter', answers: ['sont montées'], distractors: ['ont monté', 'montaient', 'étaient montées'] },
]

const long: FrenchEditorialGapSeed[] = [
  { title: 'La livraison urgente', instruction: 'Complète ce récit oral cohérent au passé composé.', segments: ['Hier matin, Nora ', ' le colis à l’entrepôt. Elle ', ' le reçu au responsable, puis elle ', ' au bureau avant midi.'], entries: [['apporter', ['a apporté']], ['remettre', ['a remis']], ['retourner', ['est retournée']]] },
  { title: 'Une visite à Marseille', instruction: 'Complète ce récit de voyage au passé composé.', segments: ['Samedi, nous ', ' le vieux port. Ensuite, nous ', ' un bateau pour les îles et nous ', ' en ville au coucher du soleil.'], entries: [['visiter', ['avons visité']], ['prendre', ['avons pris']], ['revenir', ['sommes revenus', 'sommes revenues']]] },
  { title: 'La fuite dans la cuisine', instruction: 'Complète ce compte rendu au passé composé.', segments: ['Ce matin, un tuyau ', ' sous l’évier. La gardienne ', ' l’eau et un plombier ', ' le joint dans l’après-midi.'], entries: [['céder', ['a cédé']], ['couper', ['a coupé']], ['remplacer', ['a remplacé']]] },
  { title: 'Le concours de quartier', instruction: 'Complète cette suite d’événements achevés.', segments: ['Dimanche, les participantes ', ' leurs gâteaux à neuf heures. Le jury les ', ' sans connaître les noms et Clara ', ' le premier prix.'], entries: [['déposer', ['ont déposé']], ['goûter', ['a goûtés']], ['recevoir', ['a reçu']]] },
  { title: 'Le téléphone perdu', instruction: 'Complète cette mésaventure au passé composé.', segments: ['À la sortie du cinéma, Hugo ', ' son téléphone. Il ', ' sur ses pas et une employée le lui ', ' près du guichet.'], entries: [['ne pas trouver', ["n’a pas trouvé", "n'a pas trouvé"]], ['revenir', ['est revenu']], ['rendre', ['a rendu']]] },
  { title: 'La première exposition', instruction: 'Complète ce bilan au passé composé.', segments: ['Cette semaine, la galerie ', ' douze artistes locaux. Plus de mille personnes ', ' les salles et trois journaux ', ' un article sur le projet.'], entries: [['accueillir', ['a accueilli']], ['visiter', ['ont visité']], ['publier', ['ont publié']]] },
  { title: 'Le déménagement des Martin', instruction: 'Complète cette journée achevée au passé composé.', segments: ['Vendredi, les Martin ', ' toutes les boîtes dans le camion. À midi, ils ', ' l’ancien appartement et ils ', ' dans leur nouvelle maison le soir.'], entries: [['charger', ['ont chargé']], ['quitter', ['ont quitté']], ['arriver', ['sont arrivés']]] },
  { title: 'Le match interrompu', instruction: 'Complète ce compte rendu sportif.', segments: ['L’arbitre ', ' le match à cause de l’orage. Les joueurs ', ' aux vestiaires et le club ', ' une nouvelle date le soir même.'], entries: [['arrêter', ['a arrêté']], ['rentrer', ['sont rentrés']], ['annoncer', ['a annoncé']]] },
  { title: 'La réunion en ligne', instruction: 'Complète cette séquence professionnelle.', segments: ['Nous ', ' la visioconférence à dix heures. La directrice ', ' les nouveaux objectifs et chacun ', ' ses questions dans le document partagé.'], entries: [['commencer', ['avons commencé']], ['présenter', ['a présenté']], ['écrire', ['a écrit']]] },
  { title: 'Le sauvetage du chien', instruction: 'Complète ce récit bref au passé composé.', segments: ['Le chien ', ' dans le canal en poursuivant une balle. Deux passantes ', ' les secours et les pompiers le ', ' quelques minutes plus tard.'], entries: [['tomber', ['est tombé']], ['appeler', ['ont appelé']], ['sortir', ['ont sorti']]] },
]

const errors: FrenchEditorialErrorSeed[] = [
  { title: 'Le colis de Nora', pieces: [['Hier, Nora ', 'est apportée'], [' le colis. Elle ', 'a remis'], [' le reçu, puis elle ', 'est retournée']], after: ' au bureau.', wrong: 0, answers: ['a apporté'], reason: 'Le verbe transitif « apporter » se construit ici avec avoir.' },
  { title: 'La journée à Marseille', pieces: [['Nous ', 'sommes visités'], [' le port, puis nous ', 'avons pris'], [' un bateau et nous ', 'sommes revenus']], after: ' avant la nuit.', wrong: 0, answers: ['avons visité'], reason: 'Le verbe transitif « visiter » se construit ici avec avoir.' },
  { title: 'La fuite réparée', pieces: [['Un tuyau ', 'est cédé'], [' sous l’évier. La gardienne ', 'a coupé'], [' l’eau et le plombier ', 'a remplacé']], after: ' le joint.', wrong: 0, answers: ['a cédé'], reason: 'Le verbe « céder » se construit ici avec avoir.' },
  { title: 'Le concours de pâtisserie', pieces: [['Les participantes ', 'ont déposé'], [' leurs gâteaux. Le jury les ', 'a goûtés'], [' et Clara ', 'a reçue']], after: ' le premier prix.', wrong: 2, answers: ['a reçu'], reason: 'Le participe de « recevoir » ne s’accorde pas avec le sujet après avoir.' },
  { title: 'Le téléphone retrouvé', pieces: [['Hugo ', 'n’a pas trouvé'], [' son téléphone. Il ', 'a revenu'], [' sur ses pas et une employée le lui ', 'a rendu']], after: '.', wrong: 1, answers: ['est revenu'], reason: 'Le verbe « revenir » exige l’auxiliaire être.' },
  { title: 'La semaine de la galerie', pieces: [['La galerie ', 'a accueilli'], [' douze artistes. Les visiteurs ', 'ont parcouru'], [' les salles et trois journaux ', 'a publié']], after: ' un article.', wrong: 2, answers: ['ont publié'], reason: 'Le sujet pluriel « trois journaux » exige « ont publié ».' },
  { title: 'Le déménagement', pieces: [['Les Martin ', 'ont chargés'], [' les boîtes. Ils ', 'ont quitté'], [' l’appartement et ils ', 'sont arrivés']], after: ' le soir.', wrong: 0, answers: ['ont chargé'], reason: 'Avec avoir, le participe ne s’accorde pas ici avec le sujet.' },
  { title: 'L’orage au stade', pieces: [['L’arbitre ', 'a arrêté'], [' le match. Les joueuses ', 'sont rentrés'], [' et le club ', 'a annoncé']], after: ' une nouvelle date.', wrong: 1, answers: ['sont rentrées'], reason: 'Avec être, le participe s’accorde avec le sujet féminin pluriel « les joueuses ».' },
  { title: 'La visioconférence', pieces: [['Nous ', 'avons commencé'], [' à dix heures. La directrice ', 'a présenté'], [' les objectifs et chacun ', 'ont écrit']], after: ' une question.', wrong: 2, answers: ['a écrit'], reason: 'Le pronom indéfini singulier « chacun » exige « a écrit ».' },
  { title: 'Le chien dans le canal', pieces: [['Le chien ', 'a tombé'], [' dans le canal. Deux passantes ', 'ont appelé'], [' les secours et les pompiers l’', 'ont sorti']], after: '.', wrong: 0, answers: ['est tombé'], reason: 'Le verbe intransitif « tomber » se construit avec être.' },
]

const sequences: FrenchEditorialSequenceSeed[] = [
  { events: ['Nora a apporté le colis', 'Elle a remis le reçu', 'Elle est retournée au bureau'], target: 0 },
  { events: ['Nous avons visité le port', 'Nous avons pris un bateau', 'Nous sommes revenus en ville'], target: 1 },
  { events: ['Le tuyau a cédé', 'La gardienne a coupé l’eau', 'Le plombier a remplacé le joint'], target: 2 },
  { events: ['Les participantes ont déposé leurs gâteaux', 'Le jury les a goûtés', 'Clara a reçu le prix'], target: 0 },
  { events: ['Hugo n’a pas trouvé son téléphone', 'Il est revenu sur ses pas', 'Une employée le lui a rendu'], target: 1 },
  { events: ['La galerie a accueilli les artistes', 'Les visiteurs ont parcouru les salles', 'Les journaux ont publié leurs articles'], target: 2 },
  { events: ['Les Martin ont chargé les boîtes', 'Ils ont quitté l’appartement', 'Ils sont arrivés dans leur nouvelle maison'], target: 0 },
  { events: ['L’arbitre a arrêté le match', 'Les joueurs sont rentrés', 'Le club a annoncé une nouvelle date'], target: 1 },
  { events: ['Nous avons lancé la réunion', 'La directrice a présenté les objectifs', 'Chacun a écrit ses questions'], target: 2 },
  { events: ['Le chien est tombé dans le canal', 'Les passantes ont appelé les secours', 'Les pompiers l’ont sorti'], target: 0 },
]

const final: FrenchEditorialFinalSeed[] = [
  { before: 'Hier soir, Léa ', after: ' la porte avant de partir.', answer: 'a fermé', distractors: ['fermait', 'avait fermé', 'fermera'] },
  { before: 'Samedi dernier, les deux sœurs ', after: ' à Bordeaux en train.', answer: 'sont allées', distractors: ['ont allé', 'allaient', 'étaient allées'] },
  { before: 'Ce matin, nous ', after: ' la confirmation par courriel.', answer: 'avons reçu', distractors: ['recevions', 'avions reçu', 'recevrons'] },
  { before: 'Pendant la panne, le système ', after: ' trois fois.', answer: 'a redémarré', distractors: ['redémarrait', 'avait redémarré', 'redémarrera'] },
  { before: 'Dimanche, Paul ', after: ' chez lui avant le déjeuner.', answer: 'est rentré', distractors: ['a rentré', 'rentrait', 'était rentré'] },
  { before: 'Cette semaine, vous ', after: ' quatre nouveaux contrats.', answer: 'avez signé', distractors: ['signiez', 'aviez signé', 'signerez'] },
  { before: 'À la fin du concert, les musiciennes ', after: ' sur scène pour saluer.', answer: 'sont revenues', distractors: ['ont revenu', 'revenaient', 'étaient revenues'] },
  { before: 'Hier, le laboratoire ', after: ' les résultats définitifs.', answer: 'a publié', distractors: ['publiait', 'avait publié', 'publiera'] },
  { before: 'Après le dîner, tu ', after: ' toute la vaisselle.', answer: 'as rangé', distractors: ['rangeais', 'avais rangé', 'rangeras'] },
  { before: 'Lundi matin, les enfants ', after: ' très tôt pour l’excursion.', answer: 'se sont levés', distractors: ['ont se levé', 'se levaient', 's’étaient levés'] },
]

export const FRENCH_PASSE_COMPOSE_EDITORIAL = createFrenchEditorialPack({
  slug: 'passe-compose',
  form: 'passe-compose',
  focus: 'Passé composé',
  rule: 'Le passé composé présente un événement achevé ; l’auxiliaire et l’accord du participe dépendent du verbe et de la construction.',
  micro,
  long,
  errors,
  sequences,
  final,
})
