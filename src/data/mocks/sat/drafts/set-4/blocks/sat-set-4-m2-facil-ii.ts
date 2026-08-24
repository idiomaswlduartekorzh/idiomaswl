import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/**
 * Information and Ideas · Set 4 M2 estándar · q09–q15.
 * Claves reservadas: B, D, A, C, B, A, C.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q09', type: 'mcq', part: 1,
    stimulus: 'For a production of The Tempest, a theater company did more than place a sign-language interpreter at the edge of the stage. The interpreter rehearsed with the cast, moved among the actors, and used the same lighting cues they did. During some scenes, an actor directed a line toward the interpreter, who conveyed both the words and the speaker’s tone. By treating interpretation as part of the staging, the company aimed to make the performance accessible without separating it from the dramatic action.',
    text: 'Which choice best states the main idea of the text?',
    options: ['The company replaced several speaking actors with performers who communicated only through sign language.', 'The company integrated sign-language interpretation into the staging to expand access while preserving the dramatic action.', 'The interpreter designed the production’s lighting cues before the actors began rehearsing their movements.', 'The company concluded that presenting interpretation beside the stage is ineffective for every theater audience.'],
    answer: 1,
  },
  {
    id: 'q10', type: 'mcq', part: 1,
    stimulus: 'Mangrove forests grow along some tropical and subtropical shores. Their dense roots and stems create resistance as water moves through them, reducing wave energy and helping sediment remain in place. The amount of protection varies with conditions such as the forest’s width and density and the characteristics of the incoming waves. Thus, mangroves can contribute to coastal protection, but they do not form an equally effective barrier in every location or storm.',
    text: 'Which choice best states the main idea of the text?',
    options: ['Mangrove forests survive only where waves and tides have already stopped moving coastal sediment.', 'The leaves of mangrove trees prevent nearly all storm damage by blocking winds above the water.', 'Any narrow strip of mangroves provides the same coastal protection as a wide, dense forest.', 'Mangroves can reduce wave energy and stabilize shores, although the degree of protection depends on local conditions.'],
    answer: 3,
  },
  {
    id: 'q11', type: 'mcq', part: 1,
    stimulus: 'In a short story, Nila continues to wear a wool coat that her mother altered as Nila grew. A critic claims that Nila values the coat because its visible changes preserve a record of her mother’s care.',
    text: 'Which quotation from the story would best support the critic’s claim?',
    options: ['“At each cuff, a pale line marked where her mother had released another careful row of stitches.”', '“The new coat in the shop window was the exact blue Nila had once imagined buying.”', '“Nila shook the rain from the wool and hurried across the station before the doors closed.”', '“A loose button tapped against the bench whenever Nila shifted the parcel on her lap.”'],
    answer: 0,
  },
  {
    id: 'q12', type: 'mcq', part: 1,
    stimulus: 'A historian proposes that merchants continued trading after sunset at a town market once thought to have closed in the afternoon. The historian examines a surviving toll ledger in which collectors recorded the time, type of goods, and fee for each cart entering the market.',
    text: 'Which finding from the ledger, if true, would most directly support the historian’s proposal?',
    options: ['Several daytime entries list fees for repairing the market’s roof and drainage channels.', 'The largest fees in the ledger were paid by carts carrying imported cloth rather than local grain.', 'Entries beside the ninth and tenth evening bells record carts entering with fish, candles, and bread.', 'Collectors sometimes used different abbreviations for the same type of cart on consecutive pages.'],
    answer: 2,
  },
  {
    id: 'q13', type: 'mcq', part: 1,
    stimulus: 'A researcher placed equal numbers of seeds from the same plant population in three salt solutions and recorded the percentage that germinated after ten days. At 0 millimoles per liter (mmol/L), 84% germinated; at 50 mmol/L, 68% germinated; and at 100 mmol/L, 31% germinated.',
    text: 'Which choice most effectively uses the data to complete the statement? The results indicate that ______',
    options: ['germination increased by 53 percentage points between 0 and 100 mmol/L.', 'the germination rate fell as salt concentration rose, with a 37-point drop from 50 to 100 mmol/L.', 'exactly half of the seeds germinated at every concentration above 50 mmol/L.', 'the 50 mmol/L group had a germination rate 68 percentage points below that of the 0 mmol/L group.'],
    answer: 1,
  },
  {
    id: 'q14', type: 'mcq', part: 1,
    stimulus: 'Designers tested a transit map whose legend represented four train services with similarly shaped symbols. Participants often selected the wrong service when planning a route. The designers then assigned a distinct shape to each service while leaving the routes, labels, and test questions unchanged. In a second test with comparable participants, incorrect service selections were less frequent.',
    text: 'Which choice most logically follows from the text?',
    options: ['The original symbols likely contributed to some participants’ difficulty distinguishing the services.', 'Distinct symbols will prevent every type of route-planning error on any transit map.', 'The second group performed better because the designers also simplified the routes and questions.', 'Shape is the only map feature that can influence how accurately users identify a service.'],
    answer: 0,
  },
  {
    id: 'q15', type: 'mcq', part: 1,
    stimulus: 'Researchers tested migratory songbirds at night in orientation funnels under an artificial overcast sky. In the local magnetic field, the birds generally moved toward their expected seasonal direction. The researchers then used coils to rotate the horizontal direction of the field while keeping its strength and inclination nearly unchanged. Under the rotated field, the birds’ preferred direction shifted by a similar angle.',
    text: 'Which choice most logically follows from the text?',
    options: ['The birds could determine their seasonal destination only by observing stars through the overcast sky.', 'Changing the field’s horizontal direction permanently altered the birds’ migration route in the wild.', 'The magnetic field contributed directional information to the birds’ orientation under the test conditions.', 'The field’s strength, rather than its horizontal direction, caused the change in the birds’ preferred direction.'],
    answer: 2,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q09', domain: 'II', tipo: 'central-ideas-details', dificultad: 1, tema: 'humanidades', razones: {
    A: 'El pasaje conserva actores hablantes y no dice que varios fueran sustituidos por intérpretes.',
    B: 'Correcta: ensayo, movimiento e iluminación incorporan la interpretación a la puesta en escena para ampliar el acceso sin aislarla del drama.',
    C: 'La intérprete sigue las señales de iluminación; el texto no afirma que las diseñara antes de los ensayos.',
    D: 'El caso contrasta dos formas de presentar la interpretación, pero no declara que una falle para todos los públicos.',
  }, fuenteHecho: 'Escenario teatral original, informado por la descripción oficial de interpretación BSL integrada de la Royal Shakespeare Company: https://www.rsc.org.uk/as-you-like-it/assisted-performances' },
  { id: 'q10', domain: 'II', tipo: 'central-ideas-details', dificultad: 1, tema: 'ciencia', razones: {
    A: 'El movimiento del agua puede reducirse al atravesar las raíces; no tiene que haberse detenido para que el bosque exista.',
    B: 'El mecanismo central incluye raíces y tallos dentro del agua, y el texto rechaza una garantía casi total.',
    C: 'El pasaje señala que ancho, densidad y características de las olas cambian el nivel de protección.',
    D: 'Correcta: resume tanto la atenuación y estabilización como la cautela sobre las condiciones locales.',
  }, fuenteHecho: 'NOAA, manglares como barreras naturales cuyas raíces reducen la energía de las olas: https://coast.noaa.gov/states/stories/mangrove-restoration.html' },
  { id: 'q11', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 2, tema: 'literatura', razones: {
    A: 'Correcta: las líneas en los puños son huellas visibles de las costuras que la madre fue soltando al crecer Nila.',
    B: 'Un abrigo nuevo deseado establece una alternativa, pero no prueba que el viejo conserve memoria del cuidado materno.',
    C: 'La acción muestra que Nila usa el abrigo bajo la lluvia, no por qué valora sus modificaciones.',
    D: 'El botón suelto describe desgaste presente sin vincularlo con los arreglos hechos por la madre.',
  }, fuenteHecho: 'Ficción y citas originales.' },
  { id: 'q12', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 2, tema: 'historia', razones: {
    A: 'Los gastos de mantenimiento diurno no establecen que hubiera transacciones comerciales después del atardecer.',
    B: 'El valor relativo de los peajes informa sobre mercancías, pero no sobre la hora de operación del mercado.',
    C: 'Correcta: entradas de carros con bienes junto a campanas nocturnas constituyen evidencia temporal directa de comercio tardío.',
    D: 'Las abreviaturas variables afectan la forma del registro, no demuestran actividad nocturna.',
  }, fuenteHecho: 'Mercado, libro de peajes, sistema horario y hallazgos hipotéticos originales.' },
  { id: 'q13', domain: 'II', tipo: 'command-of-evidence-quantitative', dificultad: 2, tema: 'ciencia', razones: {
    A: 'La germinación disminuye de 84 % a 31 %; no aumenta 53 puntos.',
    B: 'Correcta: 84 > 68 > 31 y la caída del segundo al tercer grupo es 68 − 31 = 37 puntos porcentuales.',
    C: 'A 100 mmol/L germina 31 %, no 50 %, y solo se midió una concentración por encima de 50.',
    D: 'La diferencia entre 84 % y 68 % es de 16 puntos porcentuales, no de 68.',
  }, fuenteHecho: 'Experimento y datos originales; las unidades se declaran en el pasaje.' },
  { id: 'q14', domain: 'II', tipo: 'inferences', dificultad: 2, tema: 'humanidades', razones: {
    A: 'Correcta: al cambiar únicamente la diferenciación de formas y disminuir esos errores, el diseño original queda implicado como contribuyente.',
    B: 'El estudio solo observa menos selecciones incorrectas; no garantiza eliminar todo error en cualquier mapa.',
    C: 'Las rutas y preguntas permanecieron iguales, por lo que la opción contradice el diseño descrito.',
    D: 'El resultado apoya una contribución de la forma, no que sea la única característica relevante.',
  }, fuenteHecho: 'Mapa, pruebas y resultados originales.' },
  { id: 'q15', domain: 'II', tipo: 'inferences', dificultad: 3, tema: 'ciencia', razones: {
    A: 'El cielo artificial estaba cubierto y la dirección cambió con el campo, por lo que el resultado no exige visión de estrellas.',
    B: 'Los ensayos en embudos muestran orientación bajo condiciones controladas, no un cambio permanente de ruta libre.',
    C: 'Correcta: al rotar la dirección horizontal del campo y observar un giro correspondiente, se apoya que el campo aporta información direccional.',
    D: 'La fuerza se mantuvo casi constante; la variable manipulada fue la dirección horizontal.',
  }, fuenteHecho: 'Singh et al., experimento con campo magnético rotado, cielo cubierto simulado y embudos de orientación: https://pmc.ncbi.nlm.nih.gov/articles/PMC8227375/' },
]
