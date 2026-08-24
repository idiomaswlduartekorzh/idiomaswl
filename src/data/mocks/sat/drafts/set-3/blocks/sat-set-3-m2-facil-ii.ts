import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/**
 * Information and Ideas · Set 3 M2 estándar · q09–q15.
 *
 * Las claves B, D, A, C, D, A, B se reservaron en la matriz editorial antes de
 * redactar. Los datos de q13 son originales y se declaran como tales.
 */
export const items: MCQQuestion[] = [
  {
    id: 'q09', type: 'mcq', part: 1,
    stimulus: 'American Sign Language (ASL) uses more than handshape alone. A signer can establish a person or object at a location in the signing space and later point or direct a verb toward that location to refer to it again. Movement, palm orientation, facial expression, and body position can also distinguish meanings. These features may operate together rather than arriving one word at a time in a single stream. Thus, translating an ASL narrative into a line of English words can preserve the general message while leaving some of its spatial organization implicit.',
    text: 'Which choice best states the main idea of the text?',
    options: ['ASL narratives can be translated fully only when every sign is replaced by several written English words.', 'ASL combines spatial and bodily features whose organization may remain implicit in linear English.', 'ASL relies mainly on facial expression; handshape and movement rarely affect meaning.', 'ASL places each person at a fixed real-world location before a signer can describe that person in a narrative.'],
    answer: 1,
  },
  {
    id: 'q10', type: 'mcq', part: 1,
    stimulus: 'Most plants take in carbon dioxide through open stomata during the day, when water can also escape from leaves. Plants using crassulacean acid metabolism (CAM) shift much of this exchange to nighttime. They open their stomata when the air is generally cooler, incorporate carbon dioxide into organic acids, and store those acids. During the day, the stomata can remain closed while carbon dioxide released from the stored acids is used to make carbohydrates. This sequence does not eliminate water loss, but it can make carbon uptake more water-efficient in dry conditions.',
    text: 'Which choice best states the main idea of the text?',
    options: ['CAM plants keep their stomata continuously open so that stored acids can leave the plant during the warmest hours.', 'CAM plants avoid making carbohydrates during the day because closed stomata stop every internal source of carbon dioxide.', 'CAM plants lose no water because organic acids prevent evaporation.', 'CAM plants separate nighttime carbon uptake from daytime use, improving water efficiency in dry settings.'],
    answer: 3,
  },
  {
    id: 'q11', type: 'mcq', part: 1,
    stimulus: 'After a new rye loaf collapsed in the oven, baker Tomas crossed the formula out of his notebook and dropped the loose page into the recycling bin. He cleaned the mixer and began measuring flour for a familiar white loaf. Before turning on the mixer, however, he reached into the bin, flattened the discarded page beside the scale, and reduced the amount of water written in the formula by two tablespoons.',
    text: 'Which quotation from the text best supports the claim that Tomas has decided to test a revised version of the rye loaf despite its initial failure?',
    options: ['“reduced the amount of water written in the formula by two tablespoons”', '“baker Tomas crossed the formula out of his notebook after seeing the damaged loaf”', '“He cleaned the mixer for another loaf”', '“a new rye loaf collapsed in the oven before Tomas could place it on the cooling rack”'],
    answer: 0,
  },
  {
    id: 'q12', type: 'mcq', part: 1,
    stimulus: 'A photograph in a town archive is labeled “Weather observer on the courthouse roof, 1913.” Historian Laila Chen suspects that the year is wrong. She has found newspaper reports stating that rooftop construction forced the weather station to move to a rail depot in 1911, but newspapers sometimes announced plans that were delayed or reversed. Chen therefore seeks an independent record showing where official observations were actually taken during the years around the photograph.',
    text: 'Which finding, if true, would most strongly support Chen’s suspicion that the photograph is misdated?',
    options: ['The photograph was donated in 1936 by a courthouse employee who did not operate weather equipment or maintain the archive.', 'The same thermometer model was used at both sites.', 'Official forms record a 1911 depot move and no courthouse return before 1920.', 'A 1914 newspaper article reports that construction on one courthouse staircase had recently ended after several delays.'],
    answer: 2,
  },
  {
    id: 'q13', type: 'mcq', part: 1,
    stimulus: 'Researchers grew identical seedlings under three shade-cloth densities and recorded mean temperatures at noon on the same clear day. The values below are invented for this question.\n\nShade cloth · mean leaf temperature · mean soil-surface temperature\n0% · 38.4°C · 32.1°C\n35% · 34.7°C · 30.8°C\n60% · 32.9°C · 29.9°C',
    text: 'Which choice most effectively uses data from the table to support the claim that greater shade was associated with a larger temperature change in the leaves than at the soil surface?',
    options: ['Both leaves and soil were warmer with 35% shade than with 0% shade.', 'From 35% to 60% shade, mean leaf temperature fell 1.8°C and mean soil-surface temperature rose 0.9°C.', 'At every shade level, mean leaf temperature was lower than mean soil-surface temperature, with the smallest gap at 0% shade.', 'From 0% to 60% shade, leaf temperature fell 5.5°C, compared with 2.2°C at the soil surface.'],
    answer: 3,
  },
  {
    id: 'q14', type: 'mcq', part: 1,
    stimulus: 'On the morning of the memorial walk, Rina told her neighbor that she had misplaced her raincoat and borrowed one instead. Yet her sister’s old blue coat still hung inside Rina’s hall closet. Rina took it down, found a faded bus ticket in a pocket, and traced the route number with her thumb. “This one still knows the way we used to go,” she said before returning the coat to its hanger and putting on the borrowed one.',
    text: 'Which choice most logically completes the text?',
    options: ['Keeping the blue coat unused helps Rina preserve a memory of her sister.', 'Rina thinks the blue coat belongs to her neighbor.', 'Rina intends to use the old bus ticket to reconstruct the route for everyone taking part in the memorial walk.', 'Rina returns the blue coat because its size and condition make it unsuitable for anyone attending the outdoor event.'],
    answer: 0,
  },
  {
    id: 'q15', type: 'mcq', part: 1,
    stimulus: 'Researchers recorded three-dimensional flight paths of insects near artificial lights. Many insects kept their dorsal, or top, side tilted toward a nearby light. Around a point source, they usually flew across the direction of the light rather than straight toward it, producing orbits, stalls, and occasional inversions. Such patterns were rare in darkness. Simulations programmed only to keep an insect’s dorsal side toward the light reproduced the observed patterns, whereas simulations treating the light as a fixed compass bearing matched them poorly.',
    text: 'Which conclusion is best supported by the text?',
    options: ['The insects approached the lights mainly to warm their bodies.', 'Artificial light can disrupt insects’ sense of vertical orientation rather than simply attract them.', 'Insects orbit a point light because darkness prevents them from detecting any part of the light while flying directly toward it.', 'A fixed compass response explains the recorded paths more accurately than a dorsal-orientation response does across conditions.'],
    answer: 1,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q09', domain: 'II', tipo: 'central-ideas-details', dificultad: 1, tema: 'humanidades', razones: {
    A: 'El texto advierte que una traducción lineal puede dejar implícita organización espacial; no exige reemplazar cada signo por varias palabras.',
    B: 'Correcta: reúne el uso simultáneo de espacio, movimiento y rasgos corporales con el límite de una representación inglesa lineal.',
    C: 'Handshape, movimiento, orientación y expresión pueden distinguir significado; ninguno se presenta como casi irrelevante.',
    D: 'Las ubicaciones se establecen dentro del espacio de señas como referentes discursivos, no en el lugar físico real de cada persona.',
  }, fuenteHecho: 'Gallaudet University, K–12 ASL Content Standards, modalidad visual-espacial, parámetros y referentes espaciales: https://gallaudet.edu/wp-content/uploads/gcloud/gal-media/Documents/ASL-Standards/K-12-ASL-Content-Standards.pdf' },
  { id: 'q10', domain: 'II', tipo: 'central-ideas-details', dificultad: 2, tema: 'ciencia', razones: {
    A: 'CAM desplaza la apertura de estomas a la noche; no los mantiene abiertos continuamente ni expulsa por ellos los ácidos almacenados.',
    B: 'El carbono almacenado se libera internamente y se usa de día aunque los estomas estén cerrados.',
    C: 'El cierre diurno mejora eficiencia, pero el texto rechaza explícitamente que elimine toda pérdida de agua.',
    D: 'Correcta: sintetiza la separación temporal entre captación nocturna y uso diurno, y su ventaja hídrica bajo sequedad.',
  }, fuenteHecho: 'USDA Forest Service, intercambio nocturno y almacenamiento de CO₂ como ácidos orgánicos en plantas CAM: https://www.fs.usda.gov/rm/pubs/rmrs_p011/rmrs_p011_217_221.pdf' },
  { id: 'q11', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 1, tema: 'literatura', razones: {
    A: 'Correcta: recuperar la fórmula y cambiar una cantidad son acciones directas de revisión antes de volver a probarla.',
    B: 'Tachar la fórmula muestra el rechazo inicial, pero no la decisión posterior de ensayar una versión modificada.',
    C: 'Limpiar el equipo puede preceder cualquier receta y no identifica cuál preparará.',
    D: 'El colapso explica por qué revisaría la fórmula, pero no demuestra que haya decidido hacerlo.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q12', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 2, tema: 'historia', razones: {
    A: 'La identidad del donante no determina cuándo ni dónde se tomó la fotografía.',
    B: 'Compartir modelo de termómetro impediría usar el equipo para distinguir los dos lugares.',
    C: 'Correcta: un registro oficial confirma que en 1913 las observaciones se hacían en el depósito, no en el tejado rotulado.',
    D: 'Una obra en 1914 no establece la ubicación operativa de la estación en 1913 ni confirma la mudanza de 1911.',
  }, fuenteHecho: 'NOAA NCEI, Historical Observing Metadata Repository; fotografía, ciudad y hallazgo propuesto son hipotéticos: https://www.ncei.noaa.gov/access/homr/' },
  { id: 'q13', domain: 'II', tipo: 'command-of-evidence-quantitative', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Con 35 % de sombra ambas temperaturas son menores, no mayores, que con 0 %.',
    B: 'La caída foliar es correcta, pero la superficie del suelo también baja 0,9 °C en vez de subir.',
    C: 'Las hojas están más calientes que la superficie del suelo en los tres tratamientos, no más frías.',
    D: 'Correcta: 38,4−32,9=5,5 °C para hojas y 32,1−29,9=2,2 °C para suelo, una reducción foliar mayor.',
  }, fuenteHecho: 'Diseño y datos originales; no representan resultados de un estudio real.' },
  { id: 'q14', domain: 'II', tipo: 'inferences', dificultad: 2, tema: 'literatura', razones: {
    A: 'Correcta: el billete y “the way we used to go” vinculan el abrigo con una rutina compartida que Rina preserva sin usarlo.',
    B: 'El texto identifica el abrigo azul como de la hermana de Rina; el prestado es otro.',
    C: 'Rina recuerda la ruta, pero guarda el billete y no dice que lo necesite para orientarse durante la caminata.',
    D: 'No se menciona la talla ni que alguien intente ponerse el abrigo; la decisión se presenta como emocional.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q15', domain: 'II', tipo: 'inferences', dificultad: 3, tema: 'ciencia', razones: {
    A: 'El estímulo no mide temperatura corporal y describe trayectorias transversales, no aproximaciones directas para calentarse.',
    B: 'Correcta: inclinación dorsal y simulación apoyan una alteración del control vertical, mientras las rutas contradicen destino o brújula simple.',
    C: 'En oscuridad los patrones eran raros; no se afirma que los insectos dejaran de detectar una luz presente.',
    D: 'El resultado es el inverso: la brújula fija ajustó mal y la orientación dorsal reprodujo los patrones.',
  }, fuenteHecho: 'Fabian et al., Nature Communications (2024), “Why flying insects gather at artificial light”: https://doi.org/10.1038/s41467-024-44785-3' },
]
