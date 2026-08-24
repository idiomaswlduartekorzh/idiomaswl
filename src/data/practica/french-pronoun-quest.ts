import { createPronounQuest } from './create-pronoun-quest.ts'
import { authorPronounSeed } from './pronoun-quest-authoring.ts'
import type { PronounPreset, PronounTopicOption } from './pronoun-quest-types'

export type FrenchPronounTopic = 'sujets' | 'toniques' | 'directs' | 'indirects' | 'y_en' | 'reflechis' | 'demonstratifs' | 'possessifs'

const TOPICS: readonly PronounTopicOption<FrenchPronounTopic>[] = [
  { id: 'sujets', label: 'Pronombres sujeto', group: 'Referente', level: 'A1' },
  { id: 'toniques', label: 'Pronombres tónicos', group: 'Énfasis', level: 'A1–A2' },
  { id: 'directs', label: 'Objeto directo', group: 'Complementos', level: 'A2' },
  { id: 'indirects', label: 'Objeto indirecto', group: 'Complementos', level: 'A2' },
  { id: 'y_en', label: 'Pronombres y / en', group: 'Complementos', level: 'A2' },
  { id: 'reflechis', label: 'Reflexivos', group: 'Posición', level: 'A1–A2' },
  { id: 'demonstratifs', label: 'Demostrativos', group: 'Referencia', level: 'A2' },
  { id: 'possessifs', label: 'Posesivos', group: 'Concordancia', level: 'A2' },
]

const PRESETS: readonly PronounPreset<FrenchPronounTopic>[] = [
  { label: 'Base A1', ids: ['sujets', 'toniques', 'reflechis'] },
  { label: 'Objetos A2', ids: ['directs', 'indirects', 'y_en'] },
  { label: 'Referencia', ids: ['demonstratifs', 'possessifs'] },
  { label: 'Todo', ids: TOPICS.map((topic) => topic.id) },
]

const SEEDS = [
  authorPronounSeed({ id: 'sujets', explanation: 'Je, tu, il/elle/on, nous, vous e ils/elles ocupan la posición de sujeto; vous también marca tratamiento formal.', functionAnswer: 'sujeto de la oración', functionDistractors: ['objeto directo', 'pronombre tónico', 'posesivo'], examples: [
    { context: 'Nora travaille ici ; ___ prépare les contrats.', answer: 'elle', distractors: ['la', 'lui', 'elles'], cue: 'Nora es singular y realiza la acción.', wrong: 'la', transform: ['Sustituye “Paul et moi”.', 'Nous arrivons à neuf heures.', ['On arrivez à neuf heures.', 'Ils arrivons à neuf heures.', 'Nous arrive à neuf heures.']] },
    { context: 'Monsieur, ___ avez une réservation ?', answer: 'vous', distractors: ['tu', 'te', 'toi'], cue: 'Se habla formalmente con una persona.', wrong: 'tu', transform: ['Sustituye “Léa et Zoé”.', 'Elles connaissent la ville.', ['Ils connaissent la ville.', 'Les connaissent la ville.', 'Elles connaît la ville.']] },
    { context: 'Le colis est arrivé ; ___ est à l’accueil.', answer: 'il', distractors: ['le', 'lui', 'elle'], cue: 'Colis es masculino singular y funciona como sujeto.', wrong: 'le', transform: ['Sustituye “les billets”.', 'Ils sont dans mon sac.', ['Elles sont dans mon sac.', 'Les sont dans mon sac.', 'Il sont dans mon sac.']] },
  ], final: { before: 'Camille connaît le programme ; ', after: ' accueillera les invités. ', answer: 'elle' } }),
  authorPronounSeed({ id: 'toniques', explanation: 'Moi, toi, lui, elle, nous, vous, eux y elles aparecen tras preposición, en respuestas breves y para contraste o énfasis.', functionAnswer: 'pronombre tónico tras preposición o contraste', functionDistractors: ['clítico directo', 'clítico indirecto', 'determinante posesivo'], examples: [
    { context: 'Ce cadeau est pour ___.', answer: 'lui', distractors: ['il', 'le', 'son'], cue: 'Después de pour se requiere la forma tónica masculina.', wrong: 'il', transform: ['Contrasta a dos personas: “Yo trabajo; él descansa”.', 'Moi, je travaille ; lui, il se repose.', ['Me, je travaille ; le, il se repose.', 'Moi, me travaille ; lui, le repose.', 'Je moi travaille ; il lui repose.']] },
    { context: 'Qui veut commencer ? — ___.', answer: 'Moi', distractors: ['Je', 'Me', 'Mon'], cue: 'Una respuesta aislada usa el pronombre tónico.', wrong: 'Je', transform: ['Di “con ellas” usando la forma tónica.', 'avec elles', ['avec les', 'avec ils', 'avec leur']] },
    { context: 'Entre toi et ___, ce plan est risqué.', answer: 'moi', distractors: ['je', 'me', 'mon'], cue: 'La preposición entre exige una forma tónica.', wrong: 'je', transform: ['Añade énfasis: “Nosotros, estamos listos”.', 'Nous, nous sommes prêts.', ['Nos, nous sommes prêts.', 'Nous, nos sommes prêts.', 'Nous sommes nous prêt.']] },
  ], final: { before: 'Le directeur parle avec ', after: ' avant l’ouverture. ', answer: 'lui' } }),
  authorPronounSeed({ id: 'directs', explanation: 'Me, te, le/la, nous, vous y les sustituyen un complemento sin à y se colocan normalmente antes del verbo.', functionAnswer: 'objeto directo antes del verbo', functionDistractors: ['objeto indirecto', 'pronombre tónico', 'sujeto'], examples: [
    { context: 'Le dossier ? Je ___ vérifie maintenant.', answer: 'le', distractors: ['lui', 'il', 'en'], cue: 'Dossier es masculino singular y recibe directamente la acción.', wrong: 'lui', transform: ['Sustituye “la facture”.', 'Je la paie demain.', ['Je lui paie demain.', 'Je paie la demain.', 'Je elle paie demain.']] },
    { context: 'Tu connais Anna ? Oui, je ___ connais.', answer: 'la', distractors: ['lui', 'elle', 'le'], cue: 'Connaître toma objeto directo femenino.', wrong: 'lui', transform: ['Sustituye “les clients”.', 'Nous les appelons.', ['Nous leur appelons.', 'Nous appelons les.', 'Nous ils appelons.']] },
    { context: 'Ces formulaires, vous devez ___ signer.', answer: 'les', distractors: ['leur', 'ils', 'lui'], cue: 'Formulaires es plural y objeto directo del infinitivo.', wrong: 'leur', transform: ['Pon el pronombre con passé composé: J’ai vu Marie.', 'Je l’ai vue.', ['Je lui ai vue.', 'Je l’ai vu.', 'Je la ai vue.']] },
  ], final: { before: 'La liste est prête ; je ', after: ' relis une dernière fois. ', answer: 'la' } }),
  authorPronounSeed({ id: 'indirects', explanation: 'Lui y leur sustituyen normalmente à + persona con verbos como parler, écrire o répondre; van antes del verbo.', functionAnswer: 'objeto indirecto de persona', functionDistractors: ['objeto directo', 'pronombre tónico', 'posesivo'], examples: [
    { context: 'Je téléphone à Marc et je ___ explique le retard.', answer: 'lui', distractors: ['le', 'il', 'leur'], cue: 'Marc es destinatario singular introducido por à.', wrong: 'le', transform: ['Sustituye “à mes collègues”.', 'Je leur écris ce soir.', ['Je les écris ce soir.', 'Je écris leur ce soir.', 'Je eux écris ce soir.']] },
    { context: 'Les enfants posent une question ; nous ___ répondons.', answer: 'leur', distractors: ['les', 'lui', 'eux'], cue: 'Se responde a varias personas.', wrong: 'les', transform: ['Sustituye “à Clara”.', 'Tu lui montres le plan.', ['Tu la montres le plan.', 'Tu montres lui le plan.', 'Tu elle montres le plan.']] },
    { context: 'Vous pouvez ___ le lien ?', answer: 'm’envoyer', distractors: ['moi envoyer', 'me envoyer', 'mon envoyer'], cue: 'Ante vocal, me indirecto se elide y queda unido al infinitivo.', wrong: 'moi envoyer', transform: ['Sustituye “à nous”.', 'Il nous donne les clés.', ['Il nos donne les clés.', 'Il donne nous les clés.', 'Il les donne les clés.']] },
  ], final: { before: 'Aux bénévoles, nous ', after: ' expliquons le plan à six heures. ', answer: 'leur' } }),
  authorPronounSeed({ id: 'y_en', explanation: 'Y retoma normalmente à + cosa o un lugar; en retoma de + cosa o una cantidad. Ambos se colocan antes del verbo.', functionAnswer: 'pronombre adverbial y o en', functionDistractors: ['pronombre de persona', 'objeto directo con género', 'sujeto'], examples: [
    { context: 'Tu vas à Lyon ? Oui, j’___ vais demain.', answer: 'y', distractors: ['en', 'le', 'lui'], cue: 'Se retoma un destino introducido por à.', wrong: 'en', transform: ['Sustituye “à ce projet”.', 'Nous y pensons souvent.', ['Nous en pensons souvent.', 'Nous le pensons souvent.', 'Nous lui pensons souvent.']] },
    { context: 'Vous avez des affiches ? Oui, nous ___ avons dix.', answer: 'en', distractors: ['y', 'les', 'leur'], cue: 'En conserva el origen partitivo y la cantidad queda expresa.', wrong: 'les', transform: ['Sustituye “de ce problème”.', 'Elle en parle.', ['Elle y parle.', 'Elle le parle.', 'Elle lui parle.']] },
    { context: 'La salle est petite, mais on peut ___ travailler.', answer: 'y', distractors: ['en', 'la', 'elle'], cue: 'Y retoma el lugar donde se trabaja.', wrong: 'la', transform: ['Sustituye “du café” conservando la cantidad.', 'J’en prends un peu.', ['J’y prends un peu.', 'Je le prends un peu de.', 'Je lui prends un peu.']] },
  ], final: { before: 'La salle est au premier étage ; nous ', after: ' installerons les tables. ', answer: 'y' } }),
  authorPronounSeed({ id: 'reflechis', explanation: 'Me, te, se, nous y vous remiten la acción al sujeto en los verbos pronominales y concuerdan con la persona.', functionAnswer: 'pronombre reflexivo ligado al sujeto', functionDistractors: ['objeto directo independiente', 'pronombre tónico', 'demostrativo'], examples: [
    { context: 'Chaque matin, je ___ lève à sept heures.', answer: 'me', distractors: ['moi', 'se', 'te'], cue: 'El sujeto je exige me.', wrong: 'moi', transform: ['Cambia el sujeto a nous.', 'Nous nous préparons.', ['Nous se préparons.', 'Nous vous préparons.', 'Nous nous prépare.']] },
    { context: 'Lina et Paul ___ rencontrent devant la gare.', answer: 'se', distractors: ['les', 'leur', 'nous'], cue: 'La acción es recíproca entre dos personas.', wrong: 'les', transform: ['Cambia el sujeto a vous.', 'Vous vous reposez.', ['Vous se reposez.', 'Vous nous reposez.', 'Vous vous reposons.']] },
    { context: 'Tu ___ souviens de son nom ?', answer: 'te', distractors: ['toi', 'se', 'le'], cue: 'El verbo pronominal se souvenir concuerda con tu.', wrong: 'toi', transform: ['Pon la frase en negativo.', 'Elle ne se trompe pas.', ['Elle se ne trompe pas.', 'Elle ne la trompe pas.', 'Elle ne se pas trompe.']] },
  ], final: { before: 'Avant l’arrivée du public, nous ', after: ' réunissons près de la scène. ', answer: 'nous' } }),
  authorPronounSeed({ id: 'demonstratifs', explanation: 'Celui, celle, ceux y celles sustituyen un nombre y concuerdan con él; -ci y -là permiten contrastar cercanía o distancia.', functionAnswer: 'pronombre demostrativo con concordancia', functionDistractors: ['determinante demostrativo', 'pronombre personal', 'posesivo'], examples: [
    { context: 'Parmi ces deux dossiers, je prends ___ de gauche.', answer: 'celui', distractors: ['celle', 'ceux', 'ce'], cue: 'Dossier es masculino singular y el nombre ya no se repite.', wrong: 'celle', transform: ['Sustituye “les chaises rouges”.', 'Je préfère celles qui sont rouges.', ['Je préfère ceux qui sont rouges.', 'Je préfère ces qui sont rouges.', 'Je préfère celle qui sont rouges.']] },
    { context: 'Ma valise est ici ; ___ de Nora est là-bas.', answer: 'celle', distractors: ['celui', 'ce', 'celles'], cue: 'Valise es femenino singular.', wrong: 'celui', transform: ['Contrasta dos formularios.', 'Celui-ci est signé ; celui-là est vide.', ['Ce-ci est signé ; ce-là est vide.', 'Celle-ci est signé ; celui-là est vide.', 'Celui-ci est signé ; ceux-là est vide.']] },
    { context: 'Ces billets sont valides ; ___ sur la table ne le sont pas.', answer: 'ceux', distractors: ['celui', 'celles', 'ces'], cue: 'Billets es masculino plural.', wrong: 'celui', transform: ['Retoma varias photos femeninas.', 'Celles de Léa sont magnifiques.', ['Ceux de Léa sont magnifiques.', 'Ces de Léa sont magnifiques.', 'Celle de Léa sont magnifiques.']] },
  ], final: { before: 'Deux micros fonctionnent ; prends ', after: ' qui est près de la fenêtre. ', answer: 'celui' } }),
  authorPronounSeed({ id: 'possessifs', explanation: 'Los pronombres posesivos llevan artículo y concuerdan con lo poseído: le mien, la tienne, les nôtres. Sustituyen todo el grupo nominal.', functionAnswer: 'pronombre posesivo independiente', functionDistractors: ['adjetivo posesivo ante nombre', 'pronombre tónico', 'demostrativo'], examples: [
    { context: 'Mon badge est bleu ; ___ est vert.', answer: 'le tien', distractors: ['ton', 'la tienne', 'le votre'], cue: 'Se sustituye ton badge, masculino singular.', wrong: 'ton', transform: ['Sustituye “notre salle”.', 'La nôtre est au fond.', ['Notre est au fond.', 'Le nôtre est au fond.', 'La notre est au fond.']] },
    { context: 'Ces clés sont à eux : ce sont ___.', answer: 'les leurs', distractors: ['leurs', 'les leur', 'les nôtres'], cue: 'Clés es plural y los poseedores son eux.', wrong: 'leurs', transform: ['Sustituye “mes affiches”.', 'Les miennes sont prêtes.', ['Mes sont prêtes.', 'Les miens sont prêtes.', 'Les tiennes sont prêtes.']] },
    { context: 'Ta veste est ici ; où est ___ ?', answer: 'la mienne', distractors: ['ma', 'le mien', 'la sienne'], cue: 'Se sustituye ma veste, femenino singular.', wrong: 'ma', transform: ['Sustituye “son ordinateur” de ella.', 'Le sien est neuf.', ['Son est neuf.', 'La sienne est neuf.', 'Le leur est neuf.']] },
  ], final: { before: 'Votre liste est imprimée ; ', after: ' est encore sur l’ordinateur.', answer: 'la nôtre' } }),
] as const

export const FRENCH_PRONOUN_QUEST = createPronounQuest({
  id: 'french-pronoun-quest', storageKey: 'wl-french-pronoun-quest-v1', languageName: 'Francés', languageCode: 'fr', title: 'Le fil des pronoms', finalTitle: 'Une ouverture, huit références nettes',
  reviewLinks: [{ href: '/practica/frances/a1/gramatica', label: 'Repasar gramática A1' }, { href: '/practica/frances/a2/gramatica', label: 'Repasar gramática A2' }],
  topics: TOPICS, presets: PRESETS, seeds: SEEDS, finalDistractors: ['le', 'ses', 'ce'],
})
