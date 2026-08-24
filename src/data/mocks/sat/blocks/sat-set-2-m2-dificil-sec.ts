import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

export const items: MCQQuestion[] = [
  {
    id: 'q16', type: 'mcq', part: 1,
    stimulus: 'The archive\'s oldest map has no date written on ______ its paper contains a watermark used by the mill only between 1720 and 1728. That narrow production window does not prove when the map was drawn, since paper could be stored for years, but it establishes the earliest range from which the sheet could have come.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['it, and', 'it, but', 'it although', 'it,'],
    answer: 1,
  },
  {
    id: 'q17', type: 'mcq', part: 1,
    stimulus: 'Unlike the smooth calls used by most members of the species, the alarm notes of the island thrush ______ abrupt changes in pitch. Those jumps make the alarm easier to distinguish from songs and contact calls in a noisy colony, where several birds may be vocalizing at once.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['contain', 'contains', 'has contained', 'is containing'],
    answer: 0,
  },
  {
    id: 'q18', type: 'mcq', part: 1,
    stimulus: 'The writer Elena Kirov drafted her essays by hand, often filling the margins with alternate openings. Her notebooks, now held by the Ormond ______ reveal that she sometimes wrote the final paragraph first and only later discovered the argument that would lead to it. The crossings-out are therefore evidence of composition, not merely untidy pages.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['Library;', 'Library', 'Library—', 'Library,'],
    answer: 3,
  },
  {
    id: 'q19', type: 'mcq', part: 1,
    stimulus: 'The survey team photographed the glacier every September from the same ridge. By 2015, when a landslide blocked access to that viewpoint, the team ______ the annual series for twenty-two years. Researchers later resumed the record from a nearby slope, using overlapping landmarks to align the new images with the old ones.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['maintains', 'has maintained', 'had maintained', 'will maintain'],
    answer: 2,
  },
  {
    id: 'q20', type: 'mcq', part: 1,
    stimulus: 'The underground chamber looked empty when archaeologists first lowered a camera through the narrow opening. A second inspection, made after dust had ______ showed faint red lines on the far wall. Digital enhancement revealed that the lines formed the outline of a boat, but the team has not yet determined whether the image is ancient or recent.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['settled;', 'settled,', 'settled', 'settled:'],
    answer: 1,
  },
  {
    id: 'q21', type: 'mcq', part: 1,
    stimulus: 'To compare the two versions fairly, the editor recommends that every reviewer ______ both translations before reading the translators\' notes. Otherwise, an explanation of a difficult choice in one version might influence how the reviewer judges the same passage in the other.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['reads', 'has read', 'will read', 'read'],
    answer: 3,
  },
  {
    id: 'q22', type: 'mcq', part: 1,
    stimulus: 'Built to keep vibration from the instruments from reaching the floor below, ______. The outer platform rests on the building, while the inner platform stands on springs inside it; the two surfaces never touch. Musicians can therefore rehearse above the library without sending the beat through its ceiling.',
    text: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    options: ['the rehearsal room contains a platform, and a second platform is inside it', 'the architects placed one platform inside another in the rehearsal room', 'one platform in the rehearsal room surrounds another', 'there are two platforms that the rehearsal room contains'],
    answer: 2,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q16', domain: 'SEC', tipo: 'boundaries', dificultad: 1, tema: 'historia', regla: 'Coma y conjunción coordinante para unir oraciones independientes en contraste.', razones: {
    A: 'And expresa suma y borra el contraste entre falta de fecha y evidencia indirecta.', B: 'Correcta: but une dos principales y marca la evidencia que compensa parcialmente la ausencia de fecha.', C: 'Although subordina la segunda cláusula y la deja sin principal posterior.', D: 'Una coma sola produce comma splice.' }, fuenteHecho: 'Mapa, molino y fechas inventados.' },
  { id: 'q17', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 2, tema: 'ciencia', regla: 'Concordancia con el núcleo plural notes pese a frases modificadoras.', razones: {
    A: 'Correcta: notes es plural y exige contain.', B: 'Contains concuerda erróneamente con thrush.', C: 'Has contained usa auxiliar singular y un aspecto no motivado.', D: 'Is containing concuerda en singular y vuelve temporal un rasgo general.' }, fuenteHecho: 'Ave y rasgos vocales inventados.' },
  { id: 'q18', domain: 'SEC', tipo: 'boundaries', dificultad: 2, tema: 'humanidades', regla: 'Cierre con coma de un inciso explicativo intercalado.', razones: {
    A: 'El punto y coma separa el sujeto notebooks de reveal.', B: 'Sin coma queda abierto el inciso iniciado después de notebooks.', C: 'El guion no empareja la coma de apertura.', D: 'Correcta: la coma cierra «now held by the Ormond Library».' }, fuenteHecho: 'Autora, biblioteca y cuadernos inventados.' },
  { id: 'q19', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 2, tema: 'ciencia', regla: 'Pasado perfecto para duración anterior a un punto pasado explícito.', razones: {
    A: 'El presente contradice 2015.', B: 'El presente perfecto conecta al presente y no al cierre pasado del acceso.', C: 'Correcta: la serie ya llevaba veintidós años cuando ocurrió el derrumbe.', D: 'El futuro sitúa después una actividad ya realizada.' }, fuenteHecho: 'Glaciar, equipo, fecha y duración inventados.' },
  { id: 'q20', domain: 'SEC', tipo: 'boundaries', dificultad: 3, tema: 'historia', regla: 'Cierre con coma de una frase participial no esencial dentro de la oración principal.', razones: {
    A: 'El punto y coma separa el sujeto inspection de showed.', B: 'Correcta: la coma cierra el inciso «made after dust had settled».', C: 'Sin coma el inciso no se delimita antes del verbo principal.', D: 'Los dos puntos no pueden separar el sujeto completo de showed.' }, fuenteHecho: 'Cámara, cámara subterránea y hallazgo inventados.' },
  { id: 'q21', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'humanidades', regla: 'Subjuntivo mandativo en una cláusula introducida por recommends that.', razones: {
    A: 'Reads usa indicativo de tercera persona y no la forma base exigida por la recomendación.', B: 'Has read introduce perfecto y rompe la estructura mandativa.', C: 'Will read expresa predicción futura, no la acción recomendada.', D: 'Correcta: read es la forma base del subjuntivo mandativo.' }, fuenteHecho: 'Editor, traducciones y procedimiento inventados.' },
  { id: 'q22', domain: 'SEC', tipo: 'form-structure-sense', dificultad: 3, tema: 'humanidades', regla: 'El sujeto tras el modificador inicial debe ser aquello construido para aislar vibraciones.', razones: {
    A: 'El sujeto room no es lo construido con esa finalidad y la coordinación diluye el referente.', B: 'Architects queda como sujeto lógico de built, como si ellos hubieran sido construidos.', C: 'Correcta: one platform es el objeto construido para rodear otra y aislarla.', D: 'There es sujeto formal incapaz de recibir el modificador built.' }, fuenteHecho: 'Sala y sistema de plataformas inventados.' },
]
