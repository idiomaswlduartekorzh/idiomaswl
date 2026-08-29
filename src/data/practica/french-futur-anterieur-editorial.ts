import {
  createFrenchEditorialPack,
  type FrenchEditorialErrorSeed,
  type FrenchEditorialFinalSeed,
  type FrenchEditorialGapSeed,
  type FrenchEditorialMicroSeed,
  type FrenchEditorialSequenceSeed,
} from './french-editorial-builder.ts'

const micro: FrenchEditorialMicroSeed[] = [
  { title: 'Le rapport de vendredi', cue: 'un accomplissement avant une échéance future', segments: ['D’ici vendredi, nous ', ' le rapport.'], verb: 'terminer', answers: ['aurons terminé'], distractors: ['terminerons', 'avions terminé', 'aurions terminé'] },
  { title: 'Le départ avant ton arrivée', cue: 'une antériorité par rapport à un futur', segments: ['Quand tu arriveras, elle ', '.'], verb: 'partir', answers: ['sera partie'], distractors: ['partira', 'était partie', 'serait partie'] },
  { title: 'Les données de minuit', cue: 'un bilan accompli à un moment futur', segments: ['À minuit, ils ', ' toutes les données.'], verb: 'sauvegarder', answers: ['auront sauvegardé'], distractors: ['sauvegarderont', 'avaient sauvegardé', 'auraient sauvegardé'] },
  { title: 'Le diplôme en juin', cue: 'un résultat achevé avant une date future', segments: ['D’ici juin, tu ', ' ta formation.'], verb: 'achever', answers: ['auras achevé'], distractors: ['achèveras', 'avais achevé', 'aurais achevé'] },
  { title: 'Le retour avant le dîner', cue: 'un retour accompli avant un autre futur', segments: ['Avant que le dîner commence, les randonneuses ', '.'], verb: 'revenir', answers: ['seront revenues'], distractors: ['reviendront', 'étaient revenues', 'seraient revenues'] },
  { title: 'La lecture avant la réunion', cue: 'une tâche terminée avant un futur repère', segments: ['Lorsque la réunion débutera, j’', ' les deux annexes.'], verb: 'lire', answers: ['aurai lu'], distractors: ['lirai', 'avais lu', 'aurais lu'] },
  { title: 'Les travaux de septembre', cue: 'un chantier achevé avant une limite future', segments: ['D’ici septembre, la ville ', ' le pont.'], verb: 'rénover', answers: ['aura rénové'], distractors: ['rénovera', 'avait rénové', 'aurait rénové'] },
  { title: 'L’atterrissage à midi', cue: 'un déplacement terminé avant une heure future', segments: ['À midi, votre avion ', ' à Montréal.'], verb: 'atterrir', answers: ['aura atterri'], distractors: ['atterrira', 'avait atterri', 'aurait atterri'] },
  { title: 'Les inscriptions avant lundi', cue: 'une clôture antérieure à une date future', segments: ['Avant lundi, nous ', ' toutes les inscriptions.'], verb: 'clore', answers: ['aurons clos'], distractors: ['clorons', 'avions clos', 'aurions clos'] },
  { title: 'Le départ des invités', cue: 'un départ achevé avant un futur constat', segments: ['Quand nous rentrerons, nos invités ', '.'], verb: 'partir', answers: ['seront partis'], distractors: ['partiront', 'étaient partis', 'seraient partis'] },
]

const long: FrenchEditorialGapSeed[] = [
  { title: 'Avant l’ouverture de vendredi', instruction: 'Complète les tâches qui seront achevées avant l’ouverture.', segments: ['D’ici vendredi matin, l’équipe ', ' les vitrines. La responsable ', ' les prix et les techniciens ', ' le nouvel éclairage.'], entries: [['installer', ['aura installé']], ['vérifier', ['aura vérifié']], ['tester', ['auront testé']]] },
  { title: 'Quand le train arrivera', instruction: 'Complète les actions déjà accomplies à ce futur repère.', segments: ['Quand le train arrivera, nous ', ' les billets. Léa ', ' les bagages et le chauffeur ', ' devant la gare.'], entries: [['acheter', ['aurons acheté']], ['préparer', ['aura préparé']], ['se garer', ['se sera garé']]] },
  { title: 'Le bilan de fin d’année', instruction: 'Complète les résultats atteints avant décembre.', segments: ['D’ici décembre, l’association ', ' cent familles. Ses bénévoles ', ' cinq ateliers et la mairie ', ' deux nouveaux locaux.'], entries: [['accompagner', ['aura accompagné']], ['organiser', ['auront organisé']], ['ouvrir', ['aura ouvert']]] },
  { title: 'Avant le départ du navire', instruction: 'Complète les contrôles terminés avant le départ futur.', segments: ['Avant que le navire parte, le capitaine ', ' la météo. Les mécaniciens ', ' les moteurs et l’équipage ', ' toutes les caisses.'], entries: [['consulter', ['aura consulté']], ['inspecter', ['auront inspecté']], ['charger', ['aura chargé']]] },
  { title: 'À la fin du chantier', instruction: 'Complète le bilan futur du chantier.', segments: ['À la fin du chantier, les ouvriers ', ' la toiture. L’électricienne ', ' chaque câble et les peintres ', ' les trois étages.'], entries: [['remplacer', ['auront remplacé']], ['contrôler', ['aura contrôlé']], ['repeindre', ['auront repeint']]] },
  { title: 'Lorsque le public entrera', instruction: 'Complète les préparatifs achevés avant l’entrée future.', segments: ['Lorsque le public entrera, les musiciens ', ' leurs instruments. La régisseuse ', ' les lumières et le chef ', ' l’ordre des morceaux.'], entries: [['accorder', ['auront accordé']], ['régler', ['aura réglé']], ['confirmer', ['aura confirmé']]] },
  { title: 'Le laboratoire à dix-huit heures', instruction: 'Complète ce bilan attendu à une heure future.', segments: ['À dix-huit heures, nous ', ' les échantillons. Le logiciel ', ' les résultats et la chercheuse ', ' une première conclusion.'], entries: [['analyser', ['aurons analysé']], ['classer', ['aura classé']], ['rédiger', ['aura rédigé']]] },
  { title: 'Avant la rentrée', instruction: 'Complète les changements achevés avant septembre.', segments: ['Avant la rentrée, l’école ', ' les salles. Les enseignants ', ' les ressources et chaque famille ', ' son nouvel horaire.'], entries: [['rénover', ['aura rénové']], ['sélectionner', ['auront sélectionné']], ['recevoir', ['aura reçu']]] },
  { title: 'Quand la tempête atteindra la côte', instruction: 'Complète les mesures prises avant ce futur événement.', segments: ['Quand la tempête atteindra la côte, les pêcheurs ', ' au port. La mairie ', ' les routes exposées et les secours ', ' leurs équipes.'], entries: [['revenir', ['seront revenus']], ['fermer', ['aura fermé']], ['mobiliser', ['auront mobilisé']]] },
  { title: 'Le dossier avant le vote', instruction: 'Complète les étapes achevées avant le vote futur.', segments: ['Avant le vote, les experts ', ' le projet. La commission ', ' leurs remarques et chaque membre ', ' la version finale.'], entries: [['examiner', ['auront examiné']], ['intégrer', ['aura intégré']], ['lire', ['aura lu']]] },
]

const errors: FrenchEditorialErrorSeed[] = [
  { title: 'D’ici vendredi matin', pieces: [['L’équipe ', 'auront installé'], [' les vitrines. La responsable ', 'aura vérifié'], [' les prix et les techniciens ', 'auront testé']], after: ' l’éclairage.', wrong: 0, answers: ['aura installé'], reason: 'Le sujet collectif singulier « l’équipe » exige « aura installé ».' },
  { title: 'Quand le train arrivera', pieces: [['Nous ', 'aura acheté'], [' les billets. Léa ', 'aura préparé'], [' les bagages et le chauffeur ', 'se sera garé']], after: ' devant la gare.', wrong: 0, answers: ['aurons acheté'], reason: 'Le sujet « nous » exige « aurons acheté ».' },
  { title: 'D’ici décembre', pieces: [['L’association ', 'aura accompagné'], [' des familles. Les bénévoles ', 'aura organisé'], [' des ateliers et la mairie ', 'aura ouvert']], after: ' des locaux.', wrong: 1, answers: ['auront organisé'], reason: 'Le sujet pluriel « les bénévoles » exige « auront organisé ».' },
  { title: 'Avant le départ du navire', pieces: [['Le capitaine ', 'aura consulté'], [' la météo. Les mécaniciens ', 'auront inspecté'], [' les moteurs et l’équipage ', 'auront chargé']], after: ' les caisses.', wrong: 2, answers: ['aura chargé'], reason: 'Le nom collectif singulier « l’équipage » exige « aura chargé ».' },
  { title: 'À la fin du chantier', pieces: [['Les ouvriers ', 'auront remplacé'], [' la toiture. L’électricienne ', 'aura contrôler'], [' les câbles et les peintres ', 'auront repeint']], after: ' les étages.', wrong: 1, answers: ['aura contrôlé'], reason: 'Le futur antérieur exige le participe passé « contrôlé ».' },
  { title: 'Lorsque le public entrera', pieces: [['Les musiciens ', 'auront accordé'], [' leurs instruments. La régisseuse ', 'aura réglée'], [' les lumières et le chef ', 'aura confirmé']], after: ' l’ordre.', wrong: 1, answers: ['aura réglé'], reason: 'Avec avoir et sans objet antéposé, le participe ne s’accorde pas avec le sujet.' },
  { title: 'À dix-huit heures', pieces: [['Nous ', 'aurons analysé'], [' les échantillons. Le logiciel ', 'aura classé'], [' les résultats et la chercheuse ', 'auront rédigé']], after: ' une conclusion.', wrong: 2, answers: ['aura rédigé'], reason: 'Le sujet singulier « la chercheuse » exige « aura rédigé ».' },
  { title: 'Avant la rentrée', pieces: [['L’école ', 'aura rénové'], [' les salles. Les enseignants ', 'auront sélectionné'], [' les ressources et chaque famille ', 'auront reçu']], after: ' son horaire.', wrong: 2, answers: ['aura reçu'], reason: 'Le déterminant « chaque » impose un sujet singulier.' },
  { title: 'Quand la tempête arrivera', pieces: [['Les pêcheurs ', 'auront revenus'], [' au port. La mairie ', 'aura fermé'], [' les routes et les secours ', 'auront mobilisé']], after: ' leurs équipes.', wrong: 0, answers: ['seront revenus'], reason: 'Le retour intransitif se construit avec être.' },
  { title: 'Avant le vote', pieces: [['Les experts ', 'auront examiné'], [' le projet. La commission ', 'aura intégré'], [' les remarques et chaque membre ', 'aura lis']], after: ' la version finale.', wrong: 2, answers: ['aura lu'], reason: 'Le participe passé de « lire » est « lu ».' },
]

const sequences: FrenchEditorialSequenceSeed[] = [
  { events: ['L’équipe aura installé les vitrines', 'La responsable aura vérifié les prix', 'Les techniciens auront testé l’éclairage'], target: 0 },
  { events: ['Nous aurons acheté les billets', 'Léa aura préparé les bagages', 'Le chauffeur se sera garé'], target: 1 },
  { events: ['L’association aura accompagné les familles', 'Les bénévoles auront organisé les ateliers', 'La mairie aura ouvert les locaux'], target: 2 },
  { events: ['Le capitaine aura consulté la météo', 'Les mécaniciens auront inspecté les moteurs', 'L’équipage aura chargé les caisses'], target: 0 },
  { events: ['Les ouvriers auront remplacé la toiture', 'L’électricienne aura contrôlé les câbles', 'Les peintres auront repeint les étages'], target: 1 },
  { events: ['Les musiciens auront accordé leurs instruments', 'La régisseuse aura réglé les lumières', 'Le chef aura confirmé l’ordre'], target: 2 },
  { events: ['Nous aurons analysé les échantillons', 'Le logiciel aura classé les résultats', 'La chercheuse aura rédigé une conclusion'], target: 0 },
  { events: ['L’école aura rénové les salles', 'Les enseignants auront sélectionné les ressources', 'Chaque famille aura reçu son horaire'], target: 1 },
  { events: ['Les pêcheurs seront revenus au port', 'La mairie aura fermé les routes', 'Les secours auront mobilisé leurs équipes'], target: 2 },
  { events: ['Les experts auront examiné le projet', 'La commission aura intégré les remarques', 'Chaque membre aura lu la version'], target: 0 },
]

const final: FrenchEditorialFinalSeed[] = [
  { before: 'D’ici demain soir, je ', after: ' tous les formulaires.', answer: 'aurai rempli', distractors: ['remplirai', 'avais rempli', 'aurais rempli'] },
  { before: 'Quand tu ouvriras la salle, les techniciennes ', after: ' leur installation.', answer: 'auront terminé', distractors: ['termineront', 'avaient terminé', 'auraient terminé'] },
  { before: 'À la fin du mois, nous ', after: ' cette somme en totalité.', answer: 'aurons payé', distractors: ['paierons', 'avions payé', 'aurions payé'] },
  { before: 'Avant le prochain contrôle, le moteur ', after: ' mille heures.', answer: 'aura fonctionné', distractors: ['fonctionnera', 'avait fonctionné', 'aurait fonctionné'] },
  { before: 'Lorsque vous arriverez au refuge, Léa ', after: ' depuis longtemps.', answer: 'sera arrivée', distractors: ['arrivera', 'était arrivée', 'serait arrivée'] },
  { before: 'D’ici 2030, la ville ', after: ' toutes ces lignes.', answer: 'aura prolongé', distractors: ['prolongera', 'avait prolongé', 'aurait prolongé'] },
  { before: 'Avant le discours, ils ', after: ' le texte deux fois.', answer: 'auront relu', distractors: ['reliront', 'avaient relu', 'auraient relu'] },
  { before: 'À vingt heures, tu ', after: ' les derniers invités.', answer: 'auras accueilli', distractors: ['accueilleras', 'avais accueilli', 'aurais accueilli'] },
  { before: 'Quand le soleil se lèvera, les bateaux ', after: ' le port.', answer: 'auront quitté', distractors: ['quitteront', 'avaient quitté', 'auraient quitté'] },
  { before: 'D’ici la remise des prix, le jury ', after: ' chaque dossier.', answer: 'aura évalué', distractors: ['évaluera', 'avait évalué', 'aurait évalué'] },
]

export const FRENCH_FUTUR_ANTERIEUR_EDITORIAL = createFrenchEditorialPack({
  slug: 'futur-anterieur',
  form: 'futur-anterieur',
  focus: 'Futur antérieur',
  rule: 'Le futur antérieur présente un fait accompli avant une échéance ou un autre moment explicitement futur.',
  micro,
  long,
  errors,
  sequences,
  final,
})
