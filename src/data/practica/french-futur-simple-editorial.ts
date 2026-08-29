import {
  createFrenchEditorialPack,
  type FrenchEditorialErrorSeed,
  type FrenchEditorialFinalSeed,
  type FrenchEditorialGapSeed,
  type FrenchEditorialMicroSeed,
  type FrenchEditorialSequenceSeed,
} from './french-editorial-builder.ts'

const micro: FrenchEditorialMicroSeed[] = [
  { title: 'La promesse après la réunion', cue: 'une promesse future', segments: ['Demain, je te ', ' après la réunion.'], verb: 'rappeler', answers: ['rappellerai'], distractors: ['rappelle', 'vais rappeler', 'rappellerais'] },
  { title: 'La météo de lundi', cue: 'une prévision future', segments: ['Selon la météo, les températures ', ' lundi.'], verb: 'baisser', answers: ['baisseront'], distractors: ['baissent', 'vont baisser', 'baisseraient'] },
  { title: 'Les résultats datés', cue: 'un fait futur annoncé', segments: ['Vous ', ' les résultats la semaine prochaine.'], verb: 'recevoir', answers: ['recevrez'], distractors: ['recevez', 'allez recevoir', 'recevriez'] },
  { title: 'Le choix du jury', cue: 'une décision à venir', segments: ['Le jury ', ' le projet gagnant vendredi.'], verb: 'choisir', answers: ['choisira'], distractors: ['choisit', 'va choisir', 'choisirait'] },
  { title: 'Notre aide promise', cue: 'un engagement futur', segments: ['Ne t’inquiète pas, nous vous ', ' pendant le déménagement.'], verb: 'aider', answers: ['aiderons'], distractors: ['aidons', 'allons aider', 'aiderions'] },
  { title: 'Le prochain hiver', cue: 'une projection future', segments: ['D’après les experts, cet hiver ', ' plus sec que le précédent.'], verb: 'être', answers: ['sera'], distractors: ['est', 'va être', 'serait'] },
  { title: 'Le rendez-vous officiel', cue: 'un événement futur daté', segments: ['La ministre ', ' les représentants mardi prochain.'], verb: 'rencontrer', answers: ['rencontrera'], distractors: ['rencontre', 'va rencontrer', 'rencontrerait'] },
  { title: 'La réponse certaine', cue: 'une assurance concernant l’avenir', segments: ['Je suis sûr qu’ils ', ' avant la fin du mois.'], verb: 'répondre', answers: ['répondront'], distractors: ['répondent', 'vont répondre', 'répondraient'] },
  { title: 'Les nouvelles consignes', cue: 'une conséquence future annoncée', segments: ['À partir de janvier, tu ', ' un badge pour entrer.'], verb: 'devoir porter', answers: ['devras porter'], distractors: ['dois porter', 'vas devoir porter', 'devrais porter'] },
  { title: 'Le calendrier culturel', cue: 'un programme futur officiel', segments: ['La ville ', ' le festival en octobre prochain.'], verb: 'accueillir', answers: ['accueillera'], distractors: ['accueille', 'va accueillir', 'accueillerait'] },
]

const long: FrenchEditorialGapSeed[] = [
  { title: 'La conférence de demain', instruction: 'Complète ce programme futur cohérent.', segments: ['Demain, la directrice ', ' la séance à neuf heures. Deux chercheurs ', ' leurs résultats, puis le public ', ' des questions.'], entries: [['ouvrir', ['ouvrira']], ['présenter', ['présenteront']], ['poser', ['posera']]] },
  { title: 'Le nouveau quartier', instruction: 'Complète ces projections officielles.', segments: ['L’an prochain, la ville ', ' une école. Une ligne de bus la ', ' au centre et les familles ', ' de nouveaux espaces verts.'], entries: [['construire', ['construira']], ['relier', ['reliera']], ['profiter', ['profiteront']]] },
  { title: 'Le voyage de juin', instruction: 'Complète cet itinéraire futur.', segments: ['En juin, nous ', ' à Nantes. Nous ', ' deux jours sur la côte, puis nous ', ' par la vallée de la Loire.'], entries: [['aller', ['irons']], ['passer', ['passerons']], ['revenir', ['reviendrons']]] },
  { title: 'La prochaine saison', instruction: 'Complète ces prévisions sportives.', segments: ['La saison prochaine, le club ', ' deux jeunes joueuses. Elles ', ' avec l’équipe première et le public les ', ' dès le premier match.'], entries: [['recruter', ['recrutera']], ['s’entraîner', ["s’entraîneront", "s'entraîneront"]], ['découvrir', ['découvrira']]] },
  { title: 'La livraison de vendredi', instruction: 'Complète cette promesse de service.', segments: ['Vendredi, notre équipe ', ' le matériel. Le technicien l’', ' sur place et vous ', ' une formation complète.'], entries: [['apporter', ['apportera']], ['installer', ['installera']], ['recevoir', ['recevrez']]] },
  { title: 'Le plan climatique', instruction: 'Complète ces mesures futures annoncées.', segments: ['D’ici deux ans, la commune ', ' les vieux lampadaires. Elle ', ' davantage d’arbres et les bâtiments publics ', ' moins d’énergie.'], entries: [['remplacer', ['remplacera']], ['planter', ['plantera']], ['consommer', ['consommeront']]] },
  { title: 'La réponse au client', instruction: 'Complète ces engagements futurs.', segments: ['Nous ', ' votre dossier demain. Un conseiller vous ', ' avant midi et il vous ', ' une solution écrite.'], entries: [['examiner', ['examinerons']], ['appeler', ['appellera']], ['envoyer', ['enverra']]] },
  { title: 'Le festival d’octobre', instruction: 'Complète ce calendrier culturel.', segments: ['En octobre, le théâtre ', ' trois compagnies. Les artistes ', ' dans toute la ville et une rencontre publique ', ' chaque spectacle.'], entries: [['accueillir', ['accueillera']], ['jouer', ['joueront']], ['suivre', ['suivra']]] },
  { title: 'La rentrée prochaine', instruction: 'Complète ces changements programmés.', segments: ['À la rentrée, les élèves ', ' un nouvel emploi du temps. Chaque classe ', ' un atelier scientifique et les familles ', ' les progrès en ligne.'], entries: [['recevoir', ['recevront']], ['avoir', ['aura']], ['suivre', ['suivront']]] },
  { title: 'Le bulletin de demain', instruction: 'Complète ces prévisions météorologiques.', segments: ['Demain matin, le brouillard ', ' la vallée. Le vent ', ' dans l’après-midi et les températures ', ' pendant la nuit.'], entries: [['couvrir', ['couvrira']], ['se renforcer', ['se renforcera']], ['baisser', ['baisseront']]] },
]

const errors: FrenchEditorialErrorSeed[] = [
  { title: 'La conférence annoncée', pieces: [['La directrice ', 'ouvriront'], [' la séance. Deux chercheurs ', 'présenteront'], [' leurs résultats et le public ', 'posera']], after: ' des questions.', wrong: 0, answers: ['ouvrira'], reason: 'Le sujet singulier « la directrice » exige « ouvrira ».' },
  { title: 'Le nouveau quartier', pieces: [['La ville ', 'construiront'], [' une école. Un bus la ', 'reliera'], [' au centre et les familles ', 'profiteront']], after: ' du parc.', wrong: 0, answers: ['construira'], reason: 'Le sujet singulier « la ville » exige « construira ».' },
  { title: 'Le voyage de juin', pieces: [['Nous ', 'iront'], [' à Nantes, ', 'passerons'], [' deux jours sur la côte et ', 'reviendrons']], after: ' par la Loire.', wrong: 0, answers: ['irons'], reason: 'Le sujet « nous » exige « irons ».' },
  { title: 'La prochaine saison', pieces: [['Le club ', 'recrutera'], [' deux joueuses. Elles ', 's’entraînera'], [' et le public les ', 'découvrira']], after: '.', wrong: 1, answers: ["s’entraîneront", "s'entraîneront"], reason: 'Le sujet pluriel « elles » exige « s’entraîneront ».' },
  { title: 'La livraison promise', pieces: [['Notre équipe ', 'apportera'], [' le matériel. Le technicien l’', 'installeront'], [' et vous ', 'recevrez']], after: ' une formation.', wrong: 1, answers: ['installera'], reason: 'Le sujet singulier « le technicien » exige « installera ».' },
  { title: 'Le plan climatique', pieces: [['La commune ', 'remplacera'], [' les lampadaires, ', 'planteras'], [' des arbres et les bâtiments ', 'consommeront']], after: ' moins.', wrong: 1, answers: ['plantera'], reason: 'Le sujet « la commune » exige la troisième personne singulière.' },
  { title: 'Le dossier du client', pieces: [['Nous ', 'examinerons'], [' le dossier. Un conseiller vous ', 'appellera'], [' et vous ', 'enverras']], after: ' une solution.', wrong: 2, answers: ['enverra'], reason: 'Le sujet reste « un conseiller » pour la troisième action.' },
  { title: 'Le festival annoncé', pieces: [['Le théâtre ', 'accueillera'], [' les compagnies. Les artistes ', 'jouera'], [' et une rencontre ', 'suivra']], after: ' chaque spectacle.', wrong: 1, answers: ['joueront'], reason: 'Le sujet pluriel « les artistes » exige « joueront ».' },
  { title: 'La rentrée programmée', pieces: [['Les élèves ', 'recevront'], [' un horaire. Chaque classe ', 'auront'], [' un atelier et les familles ', 'suivront']], after: ' les progrès.', wrong: 1, answers: ['aura'], reason: 'Le sujet singulier « chaque classe » exige « aura ».' },
  { title: 'La météo de demain', pieces: [['Le brouillard ', 'couvrira'], [' la vallée. Le vent ', 'se renforcera'], [' et les températures ', 'baissera']], after: ' la nuit.', wrong: 2, answers: ['baisseront'], reason: 'Le sujet pluriel « les températures » exige « baisseront ».' },
]

const sequences: FrenchEditorialSequenceSeed[] = [
  { events: ['La directrice ouvrira la séance', 'Les chercheurs présenteront leurs résultats', 'Le public posera des questions'], target: 0 },
  { events: ['La ville construira une école', 'Le bus la reliera au centre', 'Les familles profiteront du parc'], target: 1 },
  { events: ['Nous irons à Nantes', 'Nous passerons deux jours sur la côte', 'Nous reviendrons par la Loire'], target: 2 },
  { events: ['Le club recrutera deux joueuses', 'Elles s’entraîneront avec l’équipe', 'Le public les découvrira'], target: 0 },
  { events: ['Notre équipe apportera le matériel', 'Le technicien l’installera', 'Vous recevrez une formation'], target: 1 },
  { events: ['La commune remplacera les lampadaires', 'Elle plantera des arbres', 'Les bâtiments consommeront moins'], target: 2 },
  { events: ['Nous examinerons le dossier', 'Un conseiller vous appellera', 'Il enverra une solution'], target: 0 },
  { events: ['Le théâtre accueillera les compagnies', 'Les artistes joueront en ville', 'Une rencontre suivra chaque spectacle'], target: 1 },
  { events: ['Les élèves recevront un horaire', 'Chaque classe aura un atelier', 'Les familles suivront les progrès'], target: 2 },
  { events: ['Le brouillard couvrira la vallée', 'Le vent se renforcera', 'Les températures baisseront'], target: 0 },
]

const final: FrenchEditorialFinalSeed[] = [
  { before: 'Demain, je ', after: ' le contrat à votre avocat.', answer: 'transmettrai', distractors: ['transmets', 'vais transmettre', 'transmettrais'] },
  { before: 'Selon les prévisions, la rivière ', after: ' son niveau maximal mardi.', answer: 'atteindra', distractors: ['atteint', 'va atteindre', 'atteindrait'] },
  { before: 'L’an prochain, nous ', after: ' une antenne à Toulouse.', answer: 'ouvrirons', distractors: ['ouvrons', 'allons ouvrir', 'ouvririons'] },
  { before: 'Je te promets que vous ', after: ' une réponse avant vendredi.', answer: 'aurez', distractors: ['avez', 'allez avoir', 'auriez'] },
  { before: 'Le nouveau train ', after: ' cette distance en deux heures.', answer: 'parcourra', distractors: ['parcourt', 'va parcourir', 'parcourrait'] },
  { before: 'À partir de septembre, les bureaux ', after: ' à dix-huit heures.', answer: 'fermeront', distractors: ['ferment', 'vont fermer', 'fermeraient'] },
  { before: 'Tu verras : elle ', after: ' rapidement la solution.', answer: 'comprendra', distractors: ['comprend', 'va comprendre', 'comprendrait'] },
  { before: 'La semaine prochaine, vous ', after: ' les nouveaux membres.', answer: 'accueillerez', distractors: ['accueillez', 'allez accueillir', 'accueilleriez'] },
  { before: 'Dans dix ans, cette technologie ', after: ' beaucoup moins d’énergie.', answer: 'consommera', distractors: ['consomme', 'va consommer', 'consommerait'] },
  { before: 'Après la pause, ils ', after: ' les résultats au comité.', answer: 'présenteront', distractors: ['présentent', 'vont présenter', 'présenteraient'] },
]

export const FRENCH_FUTUR_SIMPLE_EDITORIAL = createFrenchEditorialPack({
  slug: 'futur-simple',
  form: 'futur-simple',
  focus: 'Futur simple',
  rule: 'Le futur simple situe une prévision, une promesse ou un fait annoncé dans un avenir explicitement repéré.',
  micro,
  long,
  errors,
  sequences,
  final,
})
