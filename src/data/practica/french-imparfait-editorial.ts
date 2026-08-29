import {
  createFrenchEditorialPack,
  type FrenchEditorialErrorSeed,
  type FrenchEditorialFinalSeed,
  type FrenchEditorialGapSeed,
  type FrenchEditorialMicroSeed,
  type FrenchEditorialSequenceSeed,
} from './french-editorial-builder.ts'

const micro: FrenchEditorialMicroSeed[] = [
  { title: 'Les vacances d’enfance', cue: 'une habitude passée', segments: ['Quand j’étais enfant, je ', ' chaque été chez mes grands-parents.'], verb: 'passer', answers: ['passais'], distractors: ['ai passé', 'avais passé', 'passerai'] },
  { title: 'La rue sous la pluie', cue: 'un décor dans le passé', segments: ['Il ', ' et les rues étaient presque désertes.'], verb: 'pleuvoir', answers: ['pleuvait'], distractors: ['a plu', 'avait plu', 'pleuvra'] },
  { title: 'L’appel de Paul', cue: 'une action en cours interrompue', segments: ['À neuf heures, nous ', ' encore quand Paul a appelé.'], verb: 'travailler', answers: ['travaillions'], distractors: ['avons travaillé', 'avions travaillé', 'travaillerons'] },
  { title: 'L’ancien appartement', cue: 'une description passée', segments: ['Notre ancien appartement ', ' sur une cour très calme.'], verb: 'donner', answers: ['donnait'], distractors: ['a donné', 'avait donné', 'donnera'] },
  { title: 'Le café du jeudi', cue: 'une répétition dans le passé', segments: ['Tous les jeudis, elles ', ' un café après le cours.'], verb: 'prendre', answers: ['prenaient'], distractors: ['ont pris', 'avaient pris', 'prendront'] },
  { title: 'Une croyance ancienne', cue: 'un état mental passé', segments: ['À cette époque, tu ', ' que le magasin fermait à huit heures.'], verb: 'croire', answers: ['croyais'], distractors: ['as cru', 'avais cru', 'croiras'] },
  { title: 'La panne de minuit', cue: 'une situation en cours à un moment passé', segments: ['À minuit, le générateur ', ' encore normalement.'], verb: 'fonctionner', answers: ['fonctionnait'], distractors: ['a fonctionné', 'avait fonctionné', 'fonctionnera'] },
  { title: 'Le trajet quotidien', cue: 'une habitude collective passée', segments: ['Avant le télétravail, vous ', ' le train tous les matins.'], verb: 'prendre', answers: ['preniez'], distractors: ['avez pris', 'aviez pris', 'prendrez'] },
  { title: 'Le chien du voisin', cue: 'un comportement répété dans le passé', segments: ['Chaque fois que le facteur arrivait, le chien ', '.'], verb: 'aboyer', answers: ['aboyait'], distractors: ['a aboyé', 'avait aboyé', 'aboiera'] },
  { title: 'La salle avant le concert', cue: 'un arrière-plan visuel passé', segments: ['Avant l’ouverture des portes, des lumières bleues ', ' la scène.'], verb: 'éclairer', answers: ['éclairaient'], distractors: ['ont éclairé', 'avaient éclairé', 'éclaireront'] },
]

const long: FrenchEditorialGapSeed[] = [
  { title: 'Les étés au village', instruction: 'Complète ce souvenir cohérent à l’imparfait.', segments: ['Chaque été, nous ', ' chez notre tante. Le matin, elle ', ' du pain au marché et nous ', ' près de la rivière jusqu’à midi.'], entries: [['loger', ['logions']], ['acheter', ['achetait']], ['jouer', ['jouions']]] },
  { title: 'La nuit de l’orage', instruction: 'Complète ce décor narratif à l’imparfait.', segments: ['Le vent ', ' contre les volets. La pluie ', ' sans arrêt et les chiens du quartier ', ' à chaque éclair.'], entries: [['souffler', ['soufflait']], ['tomber', ['tombait']], ['aboyer', ['aboyaient']]] },
  { title: 'L’ancienne bibliothèque', instruction: 'Complète cette description passée.', segments: ['La bibliothèque ', ' au fond d’une cour. Deux grandes fenêtres ', ' la salle et une odeur de bois ', ' les visiteurs à l’entrée.'], entries: [['se trouver', ['se trouvait']], ['éclairer', ['éclairaient']], ['accueillir', ['accueillait']]] },
  { title: 'Le trajet avant le métro', instruction: 'Complète cette ancienne routine.', segments: ['Avant l’ouverture du métro, Malik ', ' deux bus. Il ', ' souvent quarante minutes et ses collègues l’', ' près de la machine à café.'], entries: [['prendre', ['prenait']], ['attendre', ['attendait']], ['attendre', ['attendaient']]] },
  { title: 'Le dîner quand le téléphone a sonné', instruction: 'Complète les actions en cours dans cette scène.', segments: ['Ma mère ', ' la soupe. Mon père ', ' la table et nous ', ' du week-end quand le téléphone a sonné.'], entries: [['servir', ['servait']], ['mettre', ['mettait']], ['parler', ['parlions']]] },
  { title: 'Le premier emploi de Clara', instruction: 'Complète cette habitude professionnelle passée.', segments: ['À son premier emploi, Clara ', ' le bureau à huit heures. Elle ', ' les messages, puis son équipe ', ' les priorités de la journée.'], entries: [['ouvrir', ['ouvrait']], ['classer', ['classait']], ['discuter', ['discutait']]] },
  { title: 'La place autrefois', instruction: 'Complète cette évocation du quartier.', segments: ['Autrefois, un marché ', ' toute la place. Les vendeurs ', ' leurs prix à voix haute et les habitants ', ' longtemps devant les étals.'], entries: [['occuper', ['occupait']], ['annoncer', ['annonçaient']], ['rester', ['restaient']]] },
  { title: 'Pendant la répétition', instruction: 'Complète cette scène en cours dans le passé.', segments: ['Le chef ', ' les violons. Les choristes ', ' le refrain et la pianiste ', ' ses notes quand l’alarme a retenti.'], entries: [['écouter', ['écoutait']], ['répéter', ['répétaient']], ['relire', ['relisait']]] },
  { title: 'Les dimanches de pluie', instruction: 'Complète cette coutume familiale passée.', segments: ['Quand il pleuvait, mon grand-père ', ' un feu. Ma sœur ', ' près de la fenêtre et je lui ', ' le thé.'], entries: [['allumer', ['allumait']], ['lire', ['lisait']], ['préparer', ['préparais']]] },
  { title: 'La gare à l’aube', instruction: 'Complète ce tableau descriptif passé.', segments: ['À cinq heures, la gare ', ' presque vide. Un agent ', ' le quai et quelques voyageurs ', ' sous l’horloge.'], entries: [['être', ['était']], ['balayer', ['balayait']], ['dormir', ['dormaient']]] },
]

const errors: FrenchEditorialErrorSeed[] = [
  { title: 'Les vacances au village', pieces: [['Chaque été, nous ', 'logeaient'], [' chez notre tante. Elle ', 'achetait'], [' le pain et nous ', 'jouions']], after: ' près de la rivière.', wrong: 0, answers: ['logions'], reason: 'Le sujet « nous » exige « logions ».' },
  { title: 'La nuit venteuse', pieces: [['Le vent ', 'soufflaient'], [' contre les volets. La pluie ', 'tombait'], [' et les chiens ', 'aboyaient']], after: '.', wrong: 0, answers: ['soufflait'], reason: 'Le sujet singulier « le vent » exige « soufflait ».' },
  { title: 'L’ancienne salle de lecture', pieces: [['La bibliothèque ', 'se trouvait'], [' dans une cour. Les fenêtres ', 'éclairait'], [' la salle et le bois ', 'sentait']], after: ' la cire.', wrong: 1, answers: ['éclairaient'], reason: 'Le sujet pluriel « les fenêtres » exige « éclairaient ».' },
  { title: 'Avant le métro', pieces: [['Malik ', 'prenait'], [' deux bus. Il ', 'attendais'], [' longtemps et ses collègues ', 'patientaient']], after: ' au bureau.', wrong: 1, answers: ['attendait'], reason: 'Le sujet « il » exige la terminaison -ait.' },
  { title: 'Le dîner interrompu', pieces: [['Ma mère ', 'servaient'], [' la soupe. Mon père ', 'mettait'], [' la table et nous ', 'parlions']], after: ' quand le téléphone a sonné.', wrong: 0, answers: ['servait'], reason: 'Le sujet singulier « ma mère » exige « servait ».' },
  { title: 'Le bureau de Clara', pieces: [['Clara ', 'ouvrait'], [' le bureau. Elle ', 'classaient'], [' les messages et son équipe ', 'discutait']], after: ' des priorités.', wrong: 1, answers: ['classait'], reason: 'Le pronom singulier « elle » exige « classait ».' },
  { title: 'Le marché d’autrefois', pieces: [['Un marché ', 'occupait'], [' la place. Les vendeurs ', 'annonçait'], [' les prix et les habitants ', 'restaient']], after: ' devant les étals.', wrong: 1, answers: ['annonçaient'], reason: 'Le sujet pluriel « les vendeurs » exige « annonçaient ».' },
  { title: 'La répétition', pieces: [['Le chef ', 'écoutait'], [' les violons. Les choristes ', 'répétaient'], [' et la pianiste ', 'relisaient']], after: ' ses notes.', wrong: 2, answers: ['relisait'], reason: 'Le sujet singulier « la pianiste » exige « relisait ».' },
  { title: 'Les dimanches au salon', pieces: [['Mon grand-père ', 'allumait'], [' un feu. Ma sœur ', 'lisais'], [' et je ', 'préparais']], after: ' le thé.', wrong: 1, answers: ['lisait'], reason: 'Le sujet « ma sœur » exige la troisième personne singulière.' },
  { title: 'La gare au petit matin', pieces: [['La gare ', 'étaient'], [' vide. Un agent ', 'balayait'], [' et quelques voyageurs ', 'dormaient']], after: ' sous l’horloge.', wrong: 0, answers: ['était'], reason: 'Le sujet singulier « la gare » exige « était ».' },
]

const sequences: FrenchEditorialSequenceSeed[] = [
  { events: ['Nous logions chez notre tante', 'Elle achetait le pain', 'Nous jouions près de la rivière'], target: 0 },
  { events: ['Le vent soufflait', 'La pluie tombait', 'Les chiens aboyaient'], target: 1 },
  { events: ['La bibliothèque se trouvait dans une cour', 'Les fenêtres éclairaient la salle', 'Le bois accueillait les visiteurs'], target: 2 },
  { events: ['Malik prenait deux bus', 'Il attendait quarante minutes', 'Ses collègues l’attendaient au bureau'], target: 0 },
  { events: ['Ma mère servait la soupe', 'Mon père mettait la table', 'Nous parlions du week-end'], target: 1 },
  { events: ['Clara ouvrait le bureau', 'Elle classait les messages', 'Son équipe discutait des priorités'], target: 2 },
  { events: ['Un marché occupait la place', 'Les vendeurs annonçaient les prix', 'Les habitants restaient devant les étals'], target: 0 },
  { events: ['Le chef écoutait les violons', 'Les choristes répétaient', 'La pianiste relisait ses notes'], target: 1 },
  { events: ['Mon grand-père allumait un feu', 'Ma sœur lisait', 'Je préparais le thé'], target: 2 },
  { events: ['La gare était vide', 'Un agent balayait le quai', 'Des voyageurs dormaient sous l’horloge'], target: 0 },
]

const final: FrenchEditorialFinalSeed[] = [
  { before: 'Quand nous vivions à Lille, je ', after: ' au bureau à pied.', answer: 'allais', distractors: ['suis allé', 'étais allé', 'irai'] },
  { before: 'À vingt-deux heures, la neige ', after: ' encore sur la route.', answer: 'tombait', distractors: ['est tombée', 'était tombée', 'tombera'] },
  { before: 'Tous les vendredis, vous ', after: ' le bilan ensemble.', answer: 'relisiez', distractors: ['avez relu', 'aviez relu', 'relirez'] },
  { before: 'La vieille maison ', after: ' trois cheminées et un grand grenier.', answer: 'avait', distractors: ['a eu', 'avait eu', 'aura'] },
  { before: 'Pendant que le médecin parlait, les étudiants ', after: ' des notes.', answer: 'prenaient', distractors: ['ont pris', 'avaient pris', 'prendront'] },
  { before: 'Avant les travaux, cette porte ', after: ' très mal.', answer: 'fermait', distractors: ['a fermé', 'avait fermé', 'fermera'] },
  { before: 'À cette époque, nous ne ', after: ' pas encore la réponse.', answer: 'savions', distractors: ['avons su', 'avions su', 'saurons'] },
  { before: 'Chaque hiver, le lac ', after: ' pendant plusieurs semaines.', answer: 'gelait', distractors: ['a gelé', 'avait gelé', 'gèlera'] },
  { before: 'Au moment de l’annonce, tu ', after: ' près de la sortie.', answer: 'attendais', distractors: ['as attendu', 'avais attendu', 'attendras'] },
  { before: 'Le soir, les lampes du quai ', after: ' une lumière orange.', answer: 'diffusaient', distractors: ['ont diffusé', 'avaient diffusé', 'diffuseront'] },
]

export const FRENCH_IMPARFAIT_EDITORIAL = createFrenchEditorialPack({
  slug: 'imparfait',
  form: 'imparfait',
  focus: 'Imparfait',
  rule: 'L’imparfait installe une habitude, un état, une description ou une action en cours dans le passé.',
  micro,
  long,
  errors,
  sequences,
  final,
})
