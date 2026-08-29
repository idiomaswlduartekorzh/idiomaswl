import {
  createFrenchEditorialPack,
  type FrenchEditorialErrorSeed,
  type FrenchEditorialFinalSeed,
  type FrenchEditorialGapSeed,
  type FrenchEditorialMicroSeed,
  type FrenchEditorialSequenceSeed,
} from './french-editorial-builder.ts'

const micro: FrenchEditorialMicroSeed[] = [
  { title: 'Une visite hypothétique', cue: 'une conséquence hypothétique actuelle', segments: ['Avec plus de temps, je ', ' aussi le musée.'], verb: 'visiter', answers: ['visiterais'], distractors: ['visite', 'visiterai', 'aurais visité'] },
  { title: 'Une demande au restaurant', cue: 'une demande polie', segments: ['Nous ', ' réserver une table pour quatre, s’il vous plaît.'], verb: 'vouloir', answers: ['voudrions'], distractors: ['voulons', 'voudrons', 'aurions voulu'] },
  { title: 'Un conseil à Léa', cue: 'un conseil hypothétique', segments: ['À ta place, Léa ', ' cette offre.'], verb: 'accepter', answers: ['accepterait'], distractors: ['accepte', 'acceptera', 'aurait accepté'] },
  { title: 'La maison idéale', cue: 'un souhait actuel', segments: ['J’', ' habiter près de la mer.'], verb: 'aimer', answers: ['aimerais'], distractors: ['aime', 'aimerai', 'aurais aimé'] },
  { title: 'Une équipe plus grande', cue: 'le résultat d’une condition irréelle présente', segments: ['Si l’équipe était plus grande, nous ', ' ce projet.'], verb: 'terminer', answers: ['terminerions'], distractors: ['terminons', 'terminerons', 'aurions terminé'] },
  { title: 'La question au guichet', cue: 'une question polie', segments: ['Vous ', ' m’indiquer le quai numéro six ?'], verb: 'pouvoir', answers: ['pourriez'], distractors: ['pouvez', 'pourrez', 'auriez pu'] },
  { title: 'Le studio rêvé', cue: 'une préférence hypothétique', segments: ['Avec ce budget, ils ', ' un studio lumineux.'], verb: 'choisir', answers: ['choisiraient'], distractors: ['choisissent', 'choisiront', 'auraient choisi'] },
  { title: 'Un trajet alternatif', cue: 'une recommandation atténuée', segments: ['Tu ', ' prendre la ligne 4 pour éviter les travaux.'], verb: 'devoir', answers: ['devrais'], distractors: ['dois', 'devras', 'aurais dû'] },
  { title: 'Une possibilité actuelle', cue: 'une capacité sous condition', segments: ['Sans cette panne, la machine ', ' encore.'], verb: 'fonctionner', answers: ['fonctionnerait'], distractors: ['fonctionne', 'fonctionnera', 'aurait fonctionné'] },
  { title: 'Le programme idéal', cue: 'un résultat imaginé au présent', segments: ['Si vous aviez le choix, vous ', ' par quelle activité ?'], verb: 'commencer', answers: ['commenceriez'], distractors: ['commencez', 'commencerez', 'auriez commencé'] },
]

const long: FrenchEditorialGapSeed[] = [
  { title: 'Le café idéal', instruction: 'Complète ce projet imaginaire au conditionnel présent.', segments: ['Avec un local plus grand, Mina ', ' dix tables de plus. Elle ', ' un coin lecture et ses clients ', ' plus longtemps.'], entries: [['installer', ['installerait']], ['créer', ['créerait']], ['rester', ['resteraient']]] },
  { title: 'Une demande à l’hôtel', instruction: 'Complète ces demandes polies.', segments: ['Nous ', ' une chambre au calme. Vous nous ', ' aussi un lit supplémentaire et nous ', ' connaître l’heure du petit déjeuner.'], entries: [['souhaiter', ['souhaiterions']], ['apporter', ['apporteriez']], ['aimer', ['aimerions']]] },
  { title: 'Le conseil de carrière', instruction: 'Complète ces recommandations hypothétiques.', segments: ['À ta place, je ', ' le poste. Je ', ' une formation avant de commencer et je ', ' un horaire précis.'], entries: [['accepter', ['accepterais']], ['demander', ['demanderais']], ['négocier', ['négocierais']]] },
  { title: 'Une ville sans voitures', instruction: 'Complète cette hypothèse actuelle.', segments: ['Sans voitures dans le centre, l’air ', ' plus propre. Les enfants ', ' davantage dehors et les commerces ', ' plus de terrasses.'], entries: [['être', ['serait']], ['jouer', ['joueraient']], ['avoir', ['auraient']]] },
  { title: 'Le voyage rêvé', instruction: 'Complète ce projet hypothétique.', segments: ['Avec trois semaines libres, nous ', ' le Canada. Nous ', ' quelques jours au Québec et nous ', ' jusqu’à l’Atlantique.'], entries: [['traverser', ['traverserions']], ['passer', ['passerions']], ['continuer', ['continuerions']]] },
  { title: 'Une classe plus petite', instruction: 'Complète les conséquences de cette hypothèse.', segments: ['Avec quinze élèves, la professeure ', ' plus de temps à chacun. Nous ', ' davantage et les projets ', ' plus ambitieux.'], entries: [['consacrer', ['consacrerait']], ['participer', ['participerions']], ['devenir', ['deviendraient']]] },
  { title: 'Le jardin partagé', instruction: 'Complète cette proposition imaginaire.', segments: ['Avec l’accord de la mairie, les voisins ', ' un potager. Chacun ', ' quelques heures par mois et le quartier ', ' d’un nouvel espace vert.'], entries: [['créer', ['créeraient']], ['donner', ['donnerait']], ['profiter', ['profiterait']]] },
  { title: 'Une solution temporaire', instruction: 'Complète ces possibilités sous condition.', segments: ['Sans connexion principale, nous ', ' le réseau mobile. Le serveur ', ' en mode réduit et les clients ', ' leurs fichiers essentiels.'], entries: [['utiliser', ['utiliserions']], ['fonctionner', ['fonctionnerait']], ['conserver', ['conserveraient']]] },
  { title: 'Le conseil au voyageur', instruction: 'Complète ces recommandations atténuées.', segments: ['À votre place, je ', ' tôt. Vous ', ' vos billets hors ligne et vous ', ' une batterie externe.'], entries: [['partir', ['partirais']], ['télécharger', ['téléchargeriez']], ['emporter', ['emporteriez']]] },
  { title: 'Le programme culturel', instruction: 'Complète ces souhaits pour une ville idéale.', segments: ['Avec plus de moyens, le théâtre ', ' toute l’année. Il ', ' des ateliers gratuits et les écoles y ', ' régulièrement.'], entries: [['ouvrir', ['ouvrirait']], ['proposer', ['proposerait']], ['venir', ['viendraient']]] },
]

const errors: FrenchEditorialErrorSeed[] = [
  { title: 'Le café imaginaire', pieces: [['Mina ', 'installerait'], [' plus de tables. Elle ', 'créera'], [' un coin lecture et les clients ', 'resteraient']], after: ' plus longtemps.', wrong: 1, answers: ['créerait'], reason: 'Les trois conséquences de la même hypothèse restent au conditionnel présent.' },
  { title: 'Les demandes à l’hôtel', pieces: [['Nous ', 'souhaiterait'], [' une chambre. Vous nous ', 'apporteriez'], [' un lit et nous ', 'aimerions']], after: ' connaître l’horaire.', wrong: 0, answers: ['souhaiterions'], reason: 'Le sujet « nous » exige « souhaiterions ».' },
  { title: 'Le conseil professionnel', pieces: [['À ta place, j’', 'accepterais'], [' le poste, je ', 'demanderai'], [' une formation et je ', 'négocierais']], after: ' l’horaire.', wrong: 1, answers: ['demanderais'], reason: 'La série de conseils hypothétiques exige le conditionnel.' },
  { title: 'La ville apaisée', pieces: [['Sans voitures, l’air ', 'seraient'], [' plus propre. Les enfants ', 'joueraient'], [' dehors et les commerces ', 'auraient']], after: ' plus de terrasses.', wrong: 0, answers: ['serait'], reason: 'Le sujet singulier « l’air » exige « serait ».' },
  { title: 'Le voyage rêvé', pieces: [['Nous ', 'traverserions'], [' le Canada, ', 'passerions'], [' au Québec et ', 'continueront']], after: ' vers l’Atlantique.', wrong: 2, answers: ['continuerions'], reason: 'La séquence conserve le sujet « nous » et l’hypothèse.' },
  { title: 'La petite classe', pieces: [['La professeure ', 'consacrerait'], [' du temps. Nous ', 'participerait'], [' davantage et les projets ', 'deviendraient']], after: ' plus ambitieux.', wrong: 1, answers: ['participerions'], reason: 'Le sujet « nous » exige « participerions ».' },
  { title: 'Le jardin proposé', pieces: [['Les voisins ', 'créeraient'], [' un potager. Chacun ', 'donneraient'], [' du temps et le quartier ', 'profiterait']], after: ' du jardin.', wrong: 1, answers: ['donnerait'], reason: 'Le pronom indéfini singulier « chacun » exige « donnerait ».' },
  { title: 'Le réseau de secours', pieces: [['Nous ', 'utiliserions'], [' le mobile. Le serveur ', 'fonctionnera'], [' en mode réduit et les clients ', 'conserveraient']], after: ' leurs fichiers.', wrong: 1, answers: ['fonctionnerait'], reason: 'La conséquence reste hypothétique et exige le conditionnel.' },
  { title: 'Le conseil de voyage', pieces: [['À votre place, je ', 'partirais'], [' tôt. Vous ', 'téléchargeriez'], [' les billets et ', 'emporterez']], after: ' une batterie.', wrong: 2, answers: ['emporteriez'], reason: 'Le conseil atténué exige le conditionnel présent.' },
  { title: 'La culture idéale', pieces: [['Le théâtre ', 'ouvrirait'], [' toute l’année. Il ', 'proposerait'], [' des ateliers et les écoles y ', 'viendrait']], after: ' souvent.', wrong: 2, answers: ['viendraient'], reason: 'Le sujet pluriel « les écoles » exige « viendraient ».' },
]

const sequences: FrenchEditorialSequenceSeed[] = [
  { events: ['Mina installerait plus de tables', 'Elle créerait un coin lecture', 'Les clients resteraient plus longtemps'], target: 0 },
  { events: ['Nous souhaiterions une chambre', 'Vous apporteriez un lit', 'Nous aimerions connaître l’horaire'], target: 1 },
  { events: ['J’accepterais le poste', 'Je demanderais une formation', 'Je négocierais l’horaire'], target: 2 },
  { events: ['L’air serait plus propre', 'Les enfants joueraient dehors', 'Les commerces auraient des terrasses'], target: 0 },
  { events: ['Nous traverserions le Canada', 'Nous passerions au Québec', 'Nous continuerions vers l’Atlantique'], target: 1 },
  { events: ['La professeure consacrerait plus de temps', 'Nous participerions davantage', 'Les projets deviendraient plus ambitieux'], target: 2 },
  { events: ['Les voisins créeraient un potager', 'Chacun donnerait du temps', 'Le quartier profiterait du jardin'], target: 0 },
  { events: ['Nous utiliserions le réseau mobile', 'Le serveur fonctionnerait en mode réduit', 'Les clients conserveraient leurs fichiers'], target: 1 },
  { events: ['Je partirais tôt', 'Vous téléchargeriez les billets', 'Vous emporteriez une batterie'], target: 2 },
  { events: ['Le théâtre ouvrirait toute l’année', 'Il proposerait des ateliers', 'Les écoles y viendraient souvent'], target: 0 },
]

const final: FrenchEditorialFinalSeed[] = [
  { before: 'Avec un bureau plus calme, je ', after: ' mieux.', answer: 'travaillerais', distractors: ['travaille', 'travaillerai', 'aurais travaillé'] },
  { before: 'Vous ', after: ' répéter la question, s’il vous plaît ?', answer: 'pourriez', distractors: ['pouvez', 'pourrez', 'auriez pu'] },
  { before: 'À ta place, elle ', after: ' les deux offres.', answer: 'comparerait', distractors: ['compare', 'comparera', 'aurait comparé'] },
  { before: 'Si nous avions un jardin, nous y ', after: ' des tomates.', answer: 'planterions', distractors: ['plantons', 'planterons', 'aurions planté'] },
  { before: 'Sans ce bruit, les enfants ', after: ' déjà.', answer: 'dormiraient', distractors: ['dorment', 'dormiront', 'auraient dormi'] },
  { before: 'J’', after: ' vous poser une dernière question.', answer: 'aimerais', distractors: ['aime', 'aimerai', 'aurais aimé'] },
  { before: 'Avec davantage de données, le modèle ', after: ' plus précis.', answer: 'deviendrait', distractors: ['devient', 'deviendra', 'serait devenu'] },
  { before: 'Tu ', after: ' consulter un spécialiste.', answer: 'devrais', distractors: ['dois', 'devras', 'aurais dû'] },
  { before: 'Si le train passait plus tard, ils ', after: ' après le concert.', answer: 'resteraient', distractors: ['restent', 'resteront', 'seraient restés'] },
  { before: 'Avec votre accord, nous ', after: ' lundi.', answer: 'commencerions', distractors: ['commençons', 'commencerons', 'aurions commencé'] },
]

export const FRENCH_CONDITIONNEL_PRESENT_EDITORIAL = createFrenchEditorialPack({
  slug: 'conditionnel-present',
  form: 'conditionnel-present',
  focus: 'Conditionnel présent',
  rule: 'Le conditionnel présent exprime une conséquence hypothétique actuelle, un souhait, un conseil ou une demande atténuée.',
  micro,
  long,
  errors,
  sequences,
  final,
})
