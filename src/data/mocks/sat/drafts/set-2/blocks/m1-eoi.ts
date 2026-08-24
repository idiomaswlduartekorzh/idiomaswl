import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

export const items: MCQQuestion[] = [
  {
    id: 'q23', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Architect Laila Mensah designed the Riverbend Learning Center.\n• The center opened in 2018.\n• Its roof collects rainwater in two underground tanks.\n• The collected water is used in toilets and gardens.\n• Wide roof overhangs shade the windows during the hottest hours.\n• The design reduced the building\'s need for municipal water and air-conditioning.',
    text: 'The student wants to introduce the learning center and emphasize an environmental feature of its design. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Designed by Laila Mensah, the Riverbend Learning Center collects rainwater on its roof for use in toilets and gardens.', 'Designed by Laila Mensah, the Riverbend Learning Center opened in 2018.', 'Laila Mensah designed the Riverbend Learning Center, whose two tanks are located underground.', 'Using municipal water and air-conditioning, the Riverbend Learning Center opened in 2018.'],
    answer: 0,
  },
  {
    id: 'q24', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• A team tested two materials for keeping medicine cool during delivery.\n• Box A was lined with recycled cotton; Box B was lined with foam.\n• Both boxes began at 4°C and were placed in a 30°C room.\n• After six hours, Box A was 9°C and Box B was 8°C.\n• Box A\'s lining cost $1.20 per box; Box B\'s lining cost $2.10.\n• The medicine remains usable below 10°C.',
    text: 'The student wants to compare the performance and cost of the two linings. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Box A reached 9°C with a $1.20 cotton lining, while Box B reached 8°C after the same six hours.', 'Box A used recycled cotton that cost $1.20 per box, while both boxes began the test at 4°C.', 'Although Box B stayed one degree cooler, its foam lining cost $2.10 per box, compared with $1.20 for the cotton lining in Box A.', 'Both boxes kept the medicine usable after six hours, although the room was 30°C and Box A used recycled cotton.'],
    answer: 2,
  },
  {
    id: 'q25', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Botanist Ren Ito studied seeds of the alpine flower Sora bell.\n• Fresh seeds were divided into three groups of 100.\n• Group 1 was planted immediately; 18 seeds sprouted.\n• Group 2 spent four weeks in cold, moist sand; 64 seeds sprouted.\n• Group 3 spent eight weeks in cold, moist sand; 61 seeds sprouted.\n• Ito concluded that a cold period improves germination but that extending it beyond four weeks offers little additional benefit.',
    text: 'The student wants to present the result that most directly supports Ito\'s conclusion. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Ito studied three groups of 100 fresh Sora bell seeds and planted one group immediately.', 'After eight cold weeks, 61 Sora bell seeds sprouted, compared with 18 seeds in the immediately planted group.', 'Cold treatment raised germination from 18 seeds to more than 60 seeds in each treated group.', 'Germination rose from 18 seeds without cold treatment to 64 after four cold weeks, but reached only 61 after eight weeks.'],
    answer: 3,
  },
  {
    id: 'q26', type: 'mcq', part: 1,
    stimulus: 'The drama workshop\'s first set used a single painted wall. Because every actor had to enter from the same side, scene changes were slow and the movement onstage became predictable. The students replaced the wall with three hinged panels that could open in different directions. ______ the revised set allowed actors to enter from either side and cut each scene change by nearly a minute.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['As a result,', 'After all,', 'Meanwhile,', 'Nevertheless,'],
    answer: 0,
  },
  {
    id: 'q27', type: 'mcq', part: 1,
    stimulus: 'Early reviewers praised novelist Adewale Farin for the speed of his dialogue but treated the quiet descriptions between conversations as pauses in the action. Those descriptions, however, often alter how the dialogue is understood: a character\'s confident promise may be followed by a view of his shaking hand, or a cheerful greeting by an empty chair the visitor expected to see occupied. ______ the descriptive passages do not suspend the novel\'s action; they redirect it beneath what the characters say.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['Similarly,', 'In other words,', 'For example,', 'Even so,'],
    answer: 1,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q23', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 1, tema: 'humanidades', razones: {
    A: 'Correcta: presenta edificio y arquitecta, y destaca con usos concretos la captación de agua como rasgo ambiental.',
    B: 'Presenta el edificio, la arquitecta y la fecha, pero no incluye ningún rasgo ambiental de su diseño.',
    C: 'Presenta a la arquitecta y los tanques, aunque omite para qué se recoge el agua y por qué importa el diseño.',
    D: 'Contradice las notas al presentar el consumo municipal y el aire acondicionado como rasgos positivos del centro.',
  }, fuenteHecho: 'Arquitecta, edificio, fecha y características inventados.' },
  { id: 'q24', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Compara temperaturas y da el costo de Box A, pero omite el costo de Box B y no permite evaluar el intercambio completo.',
    B: 'Compara un costo con una condición inicial común; no compara el desempeño térmico final de los materiales.',
    C: 'Correcta: compara el desempeño final de ambos materiales y contrasta explícitamente sus dos costos.',
    D: 'Compara implícitamente la utilidad final, pero omite el costo de Box B y la diferencia de temperatura.',
  }, fuenteHecho: 'Ensayo, materiales, temperaturas y costos inventados.' },
  { id: 'q25', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Describe el diseño inicial, pero no aporta resultados ni sostiene la conclusión sobre duración del frío.',
    B: 'Apoya el beneficio del frío frente al control, aunque no muestra que ocho semanas aporten poco frente a cuatro.',
    C: 'Resume el beneficio general del tratamiento, pero borra la diferencia necesaria entre cuatro y ocho semanas.',
    D: 'Correcta: incluye control y ambos tratamientos, mostrando el gran aumento inicial y la ausencia de mejora adicional.',
  }, fuenteHecho: 'Botánico, especie, grupos y resultados inventados.' },
  { id: 'q26', domain: 'EOI', tipo: 'transitions', dificultad: 1, tema: 'humanidades', razones: {
    A: 'Correcta: las entradas más variadas y los cambios más breves son el resultado del nuevo conjunto de paneles móviles.',
    B: 'After all presenta lo siguiente como razón de lo anterior; aquí la flecha va al revés, pues la mejora ocurre por el rediseño.',
    C: 'Meanwhile indica simultaneidad entre sucesos distintos; el texto presenta una modificación seguida de su efecto.',
    D: 'Nevertheless exige contraste con una expectativa, mientras la mayor flexibilidad confirma la finalidad del nuevo decorado.',
  }, fuenteHecho: 'Taller, montaje y tiempos inventados.' },
  { id: 'q27', domain: 'EOI', tipo: 'transitions', dificultad: 3, tema: 'literatura', razones: {
    A: 'Similarly añadiría un caso paralelo, pero la última oración reformula la interpretación que acaba de demostrarse.',
    B: 'Correcta: expresa de otra manera la idea anterior, que las descripciones modifican el sentido de la acción verbal.',
    C: 'For example anunciaría otra ilustración, pero los ejemplos ya aparecen antes del hueco y ahora llega la síntesis.',
    D: 'Even so marca concesión; la conclusión no contradice los ejemplos, sino que deriva directamente de ellos.',
  }, fuenteHecho: 'Novelista, crítica y ejemplos narrativos inventados.' },
]
