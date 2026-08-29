import {
  createFrenchEditorialPack,
  type FrenchEditorialErrorSeed,
  type FrenchEditorialFinalSeed,
  type FrenchEditorialGapSeed,
  type FrenchEditorialMicroSeed,
  type FrenchEditorialSequenceSeed,
} from './french-editorial-builder.ts'

const micro: FrenchEditorialMicroSeed[] = [
  { title: 'Dans le roman', cue: 'un événement ponctuel dans un récit littéraire', segments: ['Dans le roman, le héros ', ' la lettre et quitta la pièce.'], verb: 'lire', answers: ['lut'], distractors: ['a lu', 'lisait', 'avait lu'] },
  { title: 'Le chapitre des portes', cue: 'une rupture dans un récit écrit', segments: ['Dans ce chapitre, les portes ', ' soudain devant la foule.'], verb: 's’ouvrir', answers: ["s’ouvrirent", "s'ouvrirent"], distractors: ['se sont ouvertes', "s’ouvraient", "s’étaient ouvertes"] },
  { title: 'Le conte de la voyageuse', cue: 'une action qui fait avancer un conte', segments: ['Dans le conte, elle ', ' son manteau puis descendit l’escalier.'], verb: 'prendre', answers: ['prit'], distractors: ['a pris', 'prenait', 'avait pris'] },
  { title: 'La chronique du siège', cue: 'un événement historique narré à l’écrit', segments: ['Selon la chronique, les soldats ', ' la muraille à l’aube.'], verb: 'franchir', answers: ['franchirent'], distractors: ['ont franchi', 'franchissaient', 'avaient franchi'] },
  { title: 'La légende du lac', cue: 'une apparition ponctuelle dans une légende', segments: ['Dans la légende, une lumière ', ' au milieu du lac.'], verb: 'apparaître', answers: ['apparut'], distractors: ['est apparue', 'apparaissait', 'était apparue'] },
  { title: 'La biographie du savant', cue: 'une étape datée dans une biographie', segments: ['Dans sa biographie, on lit qu’il ', ' ce laboratoire en 1912.'], verb: 'fonder', answers: ['fonda'], distractors: ['a fondé', 'fondait', 'avait fondé'] },
  { title: 'Le manuscrit retrouvé', cue: 'une découverte dans une narration littéraire', segments: ['Dans le manuscrit, la servante ', ' une clé sous la tapisserie.'], verb: 'découvrir', answers: ['découvrit'], distractors: ['a découvert', 'découvrait', 'avait découvert'] },
  { title: 'Le récit de l’expédition', cue: 'un départ ponctuel dans un récit écrit', segments: ['Le récit raconte que les exploratrices ', ' avant le lever du jour.'], verb: 'partir', answers: ['partirent'], distractors: ['sont parties', 'partaient', 'étaient parties'] },
  { title: 'Le journal du capitaine', cue: 'une décision narrative écrite', segments: ['Dans son journal, le capitaine ', ' de changer de route.'], verb: 'décider', answers: ['décida'], distractors: ['a décidé', 'décidait', 'avait décidé'] },
  { title: 'La nouvelle policière', cue: 'une révélation finale dans une nouvelle', segments: ['À la fin de la nouvelle, l’inspectrice ', ' enfin la vérité.'], verb: 'comprendre', answers: ['comprit'], distractors: ['a compris', 'comprenait', 'avait compris'] },
]

const long: FrenchEditorialGapSeed[] = [
  { title: 'Chapitre I · La lettre', instruction: 'Complète cet extrait littéraire au passé simple.', segments: ['Élise ', ' l’enveloppe, ', ' les quelques lignes et ', ' sans un mot dans le jardin.'], entries: [['ouvrir', ['ouvrit']], ['lire', ['lut']], ['sortir', ['sortit']]] },
  { title: 'Le conte du pont', instruction: 'Complète ce passage de conte au passé simple.', segments: ['Le voyageur ', ' le vieux pont. Il ', ' une voix sous les arches et ', ' sa lanterne vers l’eau.'], entries: [['traverser', ['traversa']], ['entendre', ['entendit']], ['tourner', ['tourna']]] },
  { title: 'Chronique de la cité', instruction: 'Complète cette chronique au passé simple.', segments: ['À l’aube, les sentinelles ', ' la cloche. Les habitants ', ' sur la place et le maire ', ' la nouvelle.'], entries: [['sonner', ['sonnèrent']], ['se rassembler', ['se rassemblèrent']], ['annoncer', ['annonça']]] },
  { title: 'La légende de l’orfèvre', instruction: 'Complète cette légende au passé simple.', segments: ['L’orfèvre ', ' le métal toute la nuit. Au matin, il ', ' le moule et une couronne d’argent ', ' sous ses yeux.'], entries: [['chauffer', ['chauffa']], ['briser', ['brisa']], ['apparaître', ['apparut']]] },
  { title: 'Le roman de la gare', instruction: 'Complète cet extrait de roman au passé simple.', segments: ['Le train ', ' dans un nuage de vapeur. Lucie ', ' sur le quai et ', ' la silhouette qu’elle attendait.'], entries: [['entrer', ['entra']], ['descendre', ['descendit']], ['reconnaître', ['reconnut']]] },
  { title: 'Le récit du naufrage', instruction: 'Complète ce récit écrit au passé simple.', segments: ['Une vague ', ' le pont. Le mât ', ' avec fracas et l’équipage ', ' les canots à la mer.'], entries: [['balayer', ['balaya']], ['tomber', ['tomba']], ['mettre', ['mit']]] },
  { title: 'La biographie de Jeanne', instruction: 'Complète cette page biographique au passé simple.', segments: ['En 1931, Jeanne ', ' son atelier. Elle y ', ' ses premières affiches et ', ' rapidement un public fidèle.'], entries: [['ouvrir', ['ouvrit']], ['créer', ['créa']], ['gagner', ['gagna']]] },
  { title: 'Le manuscrit de la tour', instruction: 'Complète ce manuscrit narratif au passé simple.', segments: ['Le gardien ', ' l’escalier étroit. Il ', ' la trappe et ', ' une malle couverte de poussière.'], entries: [['gravir', ['gravit']], ['soulever', ['souleva']], ['apercevoir', ['aperçut']]] },
  { title: 'La nouvelle du rendez-vous', instruction: 'Complète cette nouvelle au passé simple.', segments: ['Mina ', ' dix minutes devant le café. Puis elle ', ' un message, ', ' son sac et s’éloigna.'], entries: [['attendre', ['attendit']], ['recevoir', ['reçut']], ['prendre', ['prit']]] },
  { title: 'Le dernier chapitre', instruction: 'Complète la fin de ce roman au passé simple.', segments: ['Enfin, le juge ', ' son verdict. La salle ', ' silencieuse et l’accusé ', ' les yeux.'], entries: [['rendre', ['rendit']], ['devenir', ['devint']], ['fermer', ['ferma']]] },
]

const errors: FrenchEditorialErrorSeed[] = [
  { title: 'Dans le premier chapitre', pieces: [['Élise ', 'ouvrit'], [' l’enveloppe, ', 'lisa'], [' les lignes et ', 'sortit']], after: ' dans le jardin.', wrong: 1, answers: ['lut'], reason: 'Dans ce récit littéraire, le passé simple de « lire » est « lut ».' },
  { title: 'Dans le conte du pont', pieces: [['Le voyageur ', 'traversa'], [' le pont, ', 'entendit'], [' une voix et ', 'tournais']], after: ' sa lanterne.', wrong: 2, answers: ['tourna'], reason: 'La suite narrative exige la troisième personne du passé simple.' },
  { title: 'Dans la chronique', pieces: [['Les sentinelles ', 'sonnèrent'], [' la cloche. Les habitants ', 'se rassemblèrent'], [' et le maire ', 'annoncèrent']], after: ' la nouvelle.', wrong: 2, answers: ['annonça'], reason: 'Le sujet singulier « le maire » exige « annonça ».' },
  { title: 'Dans la légende', pieces: [['L’orfèvre ', 'chauffa'], [' le métal, puis ', 'brisait'], [' le moule et la couronne ', 'apparut']], after: '.', wrong: 1, answers: ['brisa'], reason: 'Cette action ponctuelle fait avancer le récit et reste au passé simple.' },
  { title: 'Dans le roman de la gare', pieces: [['Le train ', 'entra'], [' en gare. Lucie ', 'descenda'], [' et ', 'reconnut']], after: ' la silhouette.', wrong: 1, answers: ['descendit'], reason: 'Le passé simple de « descendre » à la troisième personne est « descendit ».' },
  { title: 'Dans le récit du naufrage', pieces: [['Une vague ', 'balaya'], [' le pont. Le mât ', 'tomba'], [' et les marins ', 'mettèrent']], after: ' les canots à la mer.', wrong: 2, answers: ['mirent'], reason: 'Le passé simple de « mettre » au pluriel est « mirent ».' },
  { title: 'Dans la biographie', pieces: [['Jeanne ', 'ouvrit'], [' son atelier, y ', 'créa'], [' ses affiches et ', 'gagnait']], after: ' un public fidèle.', wrong: 2, answers: ['gagna'], reason: 'L’étape biographique achevée est racontée au passé simple.' },
  { title: 'Dans le manuscrit', pieces: [['Le gardien ', 'gravit'], [' l’escalier, ', 'souleva'], [' la trappe et ', 'aperceva']], after: ' une malle.', wrong: 2, answers: ['aperçut'], reason: 'Le passé simple de « apercevoir » est « aperçut ».' },
  { title: 'Dans la nouvelle', pieces: [['Mina ', 'attendit'], [' devant le café, ', 'receva'], [' un message et ', 'prit']], after: ' son sac.', wrong: 1, answers: ['reçut'], reason: 'Le passé simple de « recevoir » est « reçut ».' },
  { title: 'Dans le dernier chapitre', pieces: [['Le juge ', 'rendit'], [' son verdict. La salle ', 'devint'], [' silencieuse et l’accusé ', 'fermais']], after: ' les yeux.', wrong: 2, answers: ['ferma'], reason: 'La dernière action ponctuelle du chapitre exige le passé simple.' },
]

const sequences: FrenchEditorialSequenceSeed[] = [
  { events: ['Élise ouvrit l’enveloppe', 'Elle lut les lignes', 'Elle sortit dans le jardin'], target: 0 },
  { events: ['Le voyageur traversa le pont', 'Il entendit une voix', 'Il tourna sa lanterne'], target: 1 },
  { events: ['Les sentinelles sonnèrent la cloche', 'Les habitants se rassemblèrent', 'Le maire annonça la nouvelle'], target: 2 },
  { events: ['L’orfèvre chauffa le métal', 'Il brisa le moule', 'Une couronne apparut'], target: 0 },
  { events: ['Le train entra en gare', 'Lucie descendit sur le quai', 'Elle reconnut la silhouette'], target: 1 },
  { events: ['Une vague balaya le pont', 'Le mât tomba', 'L’équipage mit les canots à la mer'], target: 2 },
  { events: ['Jeanne ouvrit son atelier', 'Elle créa ses affiches', 'Elle gagna un public fidèle'], target: 0 },
  { events: ['Le gardien gravit l’escalier', 'Il souleva la trappe', 'Il aperçut une malle'], target: 1 },
  { events: ['Mina attendit devant le café', 'Elle reçut un message', 'Elle prit son sac'], target: 2 },
  { events: ['Le juge rendit son verdict', 'La salle devint silencieuse', 'L’accusé ferma les yeux'], target: 0 },
]

const final: FrenchEditorialFinalSeed[] = [
  { before: 'Dans le roman, Adrien ', after: ' la carte et suivit le sentier.', answer: 'déplia', distractors: ['a déplié', 'dépliait', 'avait déplié'] },
  { before: 'Dans la chronique, les navires ', after: ' le port au lever du soleil.', answer: 'quittèrent', distractors: ['ont quitté', 'quittaient', 'avaient quitté'] },
  { before: 'Le conte raconte que la reine ', after: ' enfin le visiteur.', answer: 'reçut', distractors: ['a reçu', 'recevait', 'avait reçu'] },
  { before: 'Dans ce chapitre, la lampe ', after: ' brusquement.', answer: 's’éteignit', distractors: ["s’est éteinte", 's’éteignait', "s’était éteinte"] },
  { before: 'Selon la légende, le géant ', after: ' le rocher d’une seule main.', answer: 'souleva', distractors: ['a soulevé', 'soulevait', 'avait soulevé'] },
  { before: 'Dans sa biographie, elle ', after: ' son premier prix en 1948.', answer: 'obtint', distractors: ['a obtenu', 'obtenait', 'avait obtenu'] },
  { before: 'Le manuscrit précise que les témoins ', after: ' la salle en silence.', answer: 'entrèrent', distractors: ['sont entrés', 'entraient', 'étaient entrés'] },
  { before: 'Dans le récit, le capitaine ', after: ' la côte avant midi.', answer: 'aperçut', distractors: ['a aperçu', 'apercevait', 'avait aperçu'] },
  { before: 'À la fin de la nouvelle, Nora ', after: ' la clé dans sa poche.', answer: 'trouva', distractors: ['a trouvé', 'trouvait', 'avait trouvé'] },
  { before: 'Dans le dernier chapitre, les cloches ', after: ' et la foule se dispersa.', answer: 'sonnèrent', distractors: ['ont sonné', 'sonnaient', 'avaient sonné'] },
]

export const FRENCH_PASSE_SIMPLE_EDITORIAL = createFrenchEditorialPack({
  slug: 'passe-simple',
  form: 'passe-simple',
  focus: 'Passé simple · registre littéraire',
  rule: 'Le passé simple appartient surtout au récit écrit et fait avancer une narration littéraire par des événements achevés.',
  micro,
  long,
  errors,
  sequences,
  final,
})
