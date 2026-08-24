import { createPronounQuest } from './create-pronoun-quest.ts'
import { authorPronounSeed } from './pronoun-quest-authoring.ts'
import type { PronounPreset, PronounTopicOption } from './pronoun-quest-types'

export type EnglishPronounTopic = 'subject' | 'object' | 'possessive_determiners' | 'possessive_pronouns' | 'demonstratives' | 'reflexives' | 'relatives'

const TOPICS: readonly PronounTopicOption<EnglishPronounTopic>[] = [
  { id: 'subject', label: 'Pronombres sujeto', group: 'Referente', level: 'A1' },
  { id: 'object', label: 'Pronombres objeto', group: 'Complementos', level: 'A1–A2' },
  { id: 'possessive_determiners', label: 'Determinantes posesivos', group: 'Posesión', level: 'A1' },
  { id: 'possessive_pronouns', label: 'Pronombres posesivos', group: 'Posesión', level: 'A2' },
  { id: 'demonstratives', label: 'Demostrativos', group: 'Referencia', level: 'A1' },
  { id: 'reflexives', label: 'Reflexivos', group: 'Referencia', level: 'A2' },
  { id: 'relatives', label: 'Relativos', group: 'Conexión', level: 'A2–B1' },
]

const PRESETS: readonly PronounPreset<EnglishPronounTopic>[] = [
  { label: 'Base A1', ids: ['subject', 'object', 'demonstratives'] },
  { label: 'Posesión', ids: ['possessive_determiners', 'possessive_pronouns'] },
  { label: 'Conexión A2+', ids: ['reflexives', 'relatives'] },
  { label: 'Todo', ids: TOPICS.map((topic) => topic.id) },
]

const SEEDS = [
  authorPronounSeed({
    id: 'subject', explanation: 'Los pronombres sujeto ocupan la posición de quien realiza la acción. En inglés el sujeto normalmente debe aparecer.', functionAnswer: 'sujeto de la oración', functionDistractors: ['objeto del verbo', 'determinante posesivo', 'pronombre relativo'],
    examples: [
      { context: 'Maya is our designer. ___ works from Leeds.', answer: 'She', distractors: ['Her', 'Hers', 'They'], cue: 'Maya es una persona singular y realiza la acción.', wrong: 'Her', transform: ['Sustituye “Daniel and I” en: Daniel and I manage the bookings.', 'We manage the bookings.', ['Us manage the bookings.', 'They manage the bookings.', 'Our manage the bookings.']] },
      { context: 'The keys are on the desk. ___ are beside the lamp.', answer: 'They', distractors: ['It', 'Them', 'Their'], cue: 'Keys es plural y funciona como sujeto.', wrong: 'Them', transform: ['Sustituye “the new printer” en: The new printer is ready.', 'It is ready.', ['He is ready.', 'Its is ready.', 'Itself is ready.']] },
      { context: 'Leo and Amir called earlier; ___ need the address.', answer: 'they', distractors: ['them', 'we', 'their'], cue: 'Dos personas mencionadas realizan la acción.', wrong: 'them', transform: ['Sustituye “Priya” en: Priya knows the client.', 'She knows the client.', ['Her knows the client.', 'Hers knows the client.', 'It knows the client.']] },
    ], final: { before: 'Maya has the guest list, so ', after: ' will check every name. ', answer: 'she' },
  }),
  authorPronounSeed({
    id: 'object', explanation: 'Me, you, him, her, it, us y them reciben la acción o siguen una preposición; no ocupan la posición de sujeto.', functionAnswer: 'objeto del verbo o preposición', functionDistractors: ['sujeto de la oración', 'posesivo independiente', 'determinante demostrativo'],
    examples: [
      { context: 'I called Ben and invited ___ to the meeting.', answer: 'him', distractors: ['he', 'his', 'himself'], cue: 'Ben recibe las acciones called e invited.', wrong: 'he', transform: ['Sustituye “the documents” en: Please send the documents today.', 'Please send them today.', ['Please send they today.', 'Please send their today.', 'Please them send today.']] },
      { context: 'Can you help Ava and ___ with this box?', answer: 'me', distractors: ['I', 'my', 'mine'], cue: 'Después de and, ambos nombres son objetos de help.', wrong: 'I', transform: ['Sustituye “Sara” después de la preposición: This seat is for Sara.', 'This seat is for her.', ['This seat is for she.', 'This seat is for hers.', 'This seat is her.']] },
      { context: 'The parcel arrived. Put ___ by the door.', answer: 'it', distractors: ['its', 'itself', 'they'], cue: 'Parcel es singular y recibe la acción put.', wrong: 'its', transform: ['Sustituye “Tom and me” en: The guide is waiting for Tom and me.', 'The guide is waiting for us.', ['The guide is waiting for we.', 'The guide is waiting our.', 'The guide waits us for.']] },
    ], final: { before: 'The volunteers arrive at six; greet ', after: ' at the entrance. ', answer: 'them' },
  }),
  authorPronounSeed({
    id: 'possessive_determiners', explanation: 'My, your, his, her, its, our y their van delante de un sustantivo. Indican el poseedor y no llevan apóstrofo.', functionAnswer: 'determinante posesivo ante un nombre', functionDistractors: ['pronombre posesivo independiente', 'pronombre objeto', 'pronombre reflexivo'],
    examples: [
      { context: 'We have printed ___ tickets.', answer: 'our', distractors: ['ours', 'us', 'their'], cue: 'El poseedor es we y después aparece el nombre tickets.', wrong: 'ours', transform: ['Expresa que el horario pertenece a ellos.', 'Their schedule is online.', ['Theirs schedule is online.', 'Them schedule is online.', 'They schedule is online.']] },
      { context: 'Nora has a bicycle. ___ bicycle is blue.', answer: 'Her', distractors: ['Hers', 'His', 'She'], cue: 'La poseedora es Nora y bicycle aparece inmediatamente después.', wrong: 'Hers', transform: ['Expresa que el cargador pertenece a mí.', 'My charger is here.', ['Mine charger is here.', 'Me charger is here.', 'I charger is here.']] },
      { context: 'The robot returns to ___ charging station.', answer: 'its', distractors: ["it's", 'his', 'it'], cue: 'El poseedor es una cosa; its posesivo no lleva apóstrofo.', wrong: "it's", transform: ['Expresa que las llaves pertenecen a usted.', 'Your keys are ready.', ['Yours keys are ready.', 'You keys are ready.', 'Yourself keys are ready.']] },
    ], final: { before: 'We have one shared folder; ', after: ' files are already inside. ', answer: 'our' },
  }),
  authorPronounSeed({
    id: 'possessive_pronouns', explanation: 'Mine, yours, his, hers, ours y theirs sustituyen el grupo nominal completo. No llevan un sustantivo después.', functionAnswer: 'pronombre posesivo independiente', functionDistractors: ['determinante ante un nombre', 'pronombre sujeto', 'objeto indirecto'],
    examples: [
      { context: 'This badge is not mine; it is ___.', answer: 'hers', distractors: ['her', 'she', 'their'], cue: 'Sustituye “her badge” sin repetir badge.', wrong: 'her', transform: ['Evita repetir “our table”: Their table is outside; our table is inside.', 'Their table is outside; ours is inside.', ['Their table is outside; our is inside.', 'Theirs table is outside; ours is inside.', 'Their table is outside; us is inside.']] },
      { context: 'My phone is charged, but ___ is empty.', answer: 'yours', distractors: ['your', 'you', 'mine'], cue: 'Sustituye “your phone” y queda solo.', wrong: 'your', transform: ['Evita repetir “their coats”: These are their coats.', 'These are theirs.', ['These are their.', 'These are them.', 'These are they.']] },
      { context: 'Those seats belong to us; they are ___.', answer: 'ours', distractors: ['our', 'us', 'theirs'], cue: 'El posesivo sustituye “our seats”.', wrong: 'our', transform: ['Evita repetir “his desk”: My desk is here; his desk is there.', 'My desk is here; his is there.', ['My desk is here; him is there.', 'Mine desk is here; his is there.', 'My desk is here; he is there.']] },
    ], final: { before: 'One red folder is yours; the blue one is ', after: '. ', answer: 'ours' },
  }),
  authorPronounSeed({
    id: 'demonstratives', explanation: 'This/these señalan cercanía; that/those, distancia. La forma también concuerda con singular o plural.', functionAnswer: 'demostrativo de distancia y número', functionDistractors: ['pronombre personal', 'determinante posesivo', 'pronombre relativo'],
    examples: [
      { context: '___ is the form I am holding.', answer: 'This', distractors: ['That', 'These', 'Those'], cue: 'El objeto está cerca y es singular.', wrong: 'These', transform: ['Señala varias cajas lejanas.', 'Those boxes are empty.', ['That boxes are empty.', 'These boxes are empty.', 'Those box is empty.']] },
      { context: 'Can you see ___ lights across the river?', answer: 'those', distractors: ['that', 'these', 'this'], cue: 'Las luces son plurales y están lejos.', wrong: 'that', transform: ['Señala un asiento cercano sin repetir el nombre.', 'This is free.', ['These is free.', 'That are free.', 'Those is free.']] },
      { context: 'I will take ___ two cups here.', answer: 'these', distractors: ['this', 'those', 'that'], cue: 'Cups es plural y está cerca del hablante.', wrong: 'this', transform: ['Señala un edificio lejano.', 'That building is the library.', ['Those building is the library.', 'This buildings are the library.', 'These building is the library.']] },
    ], final: { before: 'There are two labels on the desk; use ', after: ' beside the printer. ', answer: 'this' },
  }),
  authorPronounSeed({
    id: 'reflexives', explanation: 'Los reflexivos terminados en -self/-selves remiten al sujeto. También pueden enfatizar que alguien actuó sin ayuda.', functionAnswer: 'pronombre reflexivo o enfático', functionDistractors: ['pronombre objeto simple', 'posesivo independiente', 'pronombre relativo'],
    examples: [
      { context: 'Mina designed the poster by ___.', answer: 'herself', distractors: ['her', 'hers', 'himself'], cue: 'Mina hizo el trabajo sin ayuda y el pronombre remite a ella.', wrong: 'her', transform: ['Cambia el sujeto a plural: I introduced myself.', 'We introduced ourselves.', ['We introduced ourself.', 'Us introduced ourselves.', 'We introduced us.']] },
      { context: 'Be careful, Leo: do not cut ___.', answer: 'yourself', distractors: ['you', 'yours', 'himself'], cue: 'La advertencia va a una persona y la acción vuelve a ella.', wrong: 'you', transform: ['Cambia el sujeto: The children dressed themselves.', 'The child dressed himself.', ['The child dressed themselves.', 'The child dressed him.', 'The child dress himself.']] },
      { context: 'The doors close by ___.', answer: 'themselves', distractors: ['them', 'their', 'itself'], cue: 'Doors es plural y la acción ocurre sobre el mismo referente.', wrong: 'itself', transform: ['Añade énfasis a “I checked every name”.', 'I checked every name myself.', ['I checked every name me.', 'Myself checked every name.', 'I checked myself every name.']] },
    ], final: { before: 'Maya does not need help; she will arrange the display ', after: '. ', answer: 'herself' },
  }),
  authorPronounSeed({
    id: 'relatives', explanation: 'Who retoma personas, which cosas y whose expresa posesión. El relativo conecta una subordinada con su antecedente.', functionAnswer: 'pronombre relativo que conecta una cláusula', functionDistractors: ['pronombre objeto aislado', 'demostrativo', 'determinante posesivo principal'],
    examples: [
      { context: 'The woman ___ called you is the director.', answer: 'who', distractors: ['which', 'whose', 'her'], cue: 'El antecedente es una persona y el relativo es sujeto de called.', wrong: 'which', transform: ['Une las ideas: I found the cable. The cable was missing.', 'I found the cable that was missing.', ['I found the cable who was missing.', 'I found that the cable was missing it.', 'I found the cable whose was missing.']] },
      { context: 'This is the camera ___ we ordered.', answer: 'that', distractors: ['who', 'whose', 'it'], cue: 'El antecedente es una cosa y el relativo recibe la acción ordered.', wrong: 'who', transform: ['Une las ideas: The guide helped us. She speaks Arabic.', 'The guide who helped us speaks Arabic.', ['The guide which helped us speaks Arabic.', 'The guide she helped us speaks Arabic.', 'The guide whose helped us speaks Arabic.']] },
      { context: 'I met the artist ___ mural won the prize.', answer: 'whose', distractors: ['who', 'which', 'her'], cue: 'La relación expresa que el mural pertenece al artista.', wrong: 'who', transform: ['Une con posesión: We thanked the volunteers. Their work was essential.', 'We thanked the volunteers whose work was essential.', ['We thanked the volunteers who work was essential.', 'We thanked the volunteers which work was essential.', 'We thanked the volunteers their work was essential.']] },
    ], final: { before: 'Finally, thank the volunteer ', after: ' idea solved the problem.', answer: 'whose' },
  }),
] as const

export const ENGLISH_PRONOUN_QUEST = createPronounQuest({
  id: 'english-pronoun-quest', storageKey: 'wl-english-pronoun-quest-v1', languageName: 'Inglés', languageCode: 'en', title: 'The pronoun trail', finalTitle: 'One event, seven clear references',
  reviewLinks: [
    { href: '/practica/ingles/a1/gramatica/pronombres-personales', label: 'Repasar pronombres personales' },
    { href: '/practica/ingles/a1/gramatica/adjetivos-posesivos', label: 'Repasar posesivos' },
  ], topics: TOPICS, presets: PRESETS, seeds: SEEDS, finalDistractors: ['her', 'their', 'which'],
})
