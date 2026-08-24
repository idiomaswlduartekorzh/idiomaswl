import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/** Expression of Ideas · Set 3 M1 · q23–q27. Claves reservadas: C, A, D, B, C. */
export const items: MCQQuestion[] = [
  {
    id: 'q23', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• A design team created wayfinding signs for a temporary exhibition.\n• Each gallery had a short name printed in large white letters on a navy background.\n• The gallery names appeared at the entrance and at every point where visitors could choose between routes.\n• Smaller text below each name described objects in that gallery.\n• Floor arrows repeated the gallery names but not the descriptions.\n• Visitor interviews indicated that people used the repeated names to decide where to turn.',
    text: 'The student wants to explain how the signs’ typography helped visitors choose a route. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['The temporary exhibition used navy signs, floor arrows, gallery descriptions, and interviews with visitors.', 'Each gallery had a short name as well as smaller text describing the objects displayed inside it.', 'Large, high-contrast gallery names were repeated at decision points, helping visitors identify which route led to each gallery.', 'The design team printed descriptions below the gallery names but omitted those descriptions from the floor arrows.'],
    answer: 2,
  },
  {
    id: 'q24', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Researchers placed two concrete pavers of equal size in an unshaded test area.\n• Paver L had a solar reflectance of 42%; Paver D had a solar reflectance of 18%.\n• At the same midday observation, L’s surface measured 43°C and D’s measured 54°C.\n• Air temperature above both pavers was 32°C.\n• Surface color can influence reflectance, but material, age, and dirt can also change it.\n• The test does not establish that every light-colored pavement will be cooler than every dark one.',
    text: 'The student wants to present the test result while avoiding a claim broader than the notes support. Which choice most effectively accomplishes this goal?',
    options: ['Under the same test conditions, the paver with 42% reflectance was 11°C cooler at the surface than the one with 18% reflectance, an association that need not apply to every pavement.', 'Because both pavers had the same air temperature, surface reflectance cannot affect the temperature of concrete.', 'The light-colored paver measured 43°C, proving that light pavement always remains cooler than dark pavement.', 'Material, age, and dirt affect reflectance, so the 11°C difference between the two test pavers was unrelated to reflectance.'],
    answer: 0,
  },
  {
    id: 'q25', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• A marine sextant measures the angle between a celestial object and the horizon.\n• An accurate marine chronometer keeps the time at a reference meridian during a voyage.\n• A navigator can use a sextant observation to determine local celestial time.\n• Comparing local time with the chronometer’s reference time helps determine longitude.\n• John Bird produced an early sextant in 1757.\n• Reliable marine chronometers became practical later in the eighteenth century.',
    text: 'The student wants to compare the distinct but complementary roles of the sextant and marine chronometer in determining longitude. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['The sextant replaced the need for accurate clocks by keeping reference-meridian time during a voyage.', 'John Bird produced a sextant in 1757, before reliable marine chronometers became practical.', 'A sextant and a chronometer both measure the angle between a celestial object and the horizon.', 'The sextant provides an angular observation used to find local time, while the chronometer supplies reference time for the comparison needed to determine longitude.'],
    answer: 3,
  },
  {
    id: 'q26', type: 'mcq', part: 1,
    stimulus: 'Southern crawfish frogs spend much of their lives in underground burrows, making visual encounter surveys ineffective at many sites. The frogs do produce distinctive calls during parts of the year. ______ researchers placed automated recording units near a historical Louisiana site and used the nightly recordings to confirm that a small population remained there.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['In contrast,', 'Consequently,', 'For example,', 'Nevertheless,'],
    answer: 1,
  },
  {
    id: 'q27', type: 'mcq', part: 1,
    stimulus: 'A translator named Mara kept two drafts of a fictional monologue. The first preserved the source text’s clause order, including a sentence whose pronoun could refer to either of two characters, but its cadence sounded stiff. The second draft reordered clauses to restore the spoken rhythm. Mara worried that this freedom would erase the pronoun’s ambiguity. ______ when she compared the drafts aloud, she found that the revised rhythm made both possible referents easier to hear.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['For instance,', 'Accordingly,', 'Nevertheless,', 'Similarly,'],
    answer: 2,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q23', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 1, tema: 'humanidades', razones: {
    A: 'Enumera componentes del proyecto, pero no explica cómo una decisión tipográfica ayudó a elegir rutas.',
    B: 'Describe dos niveles de texto, aunque omite contraste, repetición en cruces y uso observado por visitantes.',
    C: 'Correcta: une tamaño y contraste con la repetición en puntos de decisión y con la función de identificar rutas.',
    D: 'Contrasta descripciones y flechas, pero no explica cómo los nombres guiaban la elección del visitante.',
  }, fuenteHecho: 'Equipo, exposición, notas y entrevistas inventados.' },
  { id: 'q24', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Correcta: compara reflectancia y temperatura bajo iguales condiciones y conserva el límite que impide generalizar a todo pavimento.',
    B: 'Que el aire mida lo mismo no elimina la diferencia de 11 °C entre las superficies ni demuestra irrelevancia de la reflectancia.',
    C: 'Convierte un ensayo de dos piezas en una regla universal que las notas excluyen expresamente.',
    D: 'Los factores adicionales aconsejan cautela, pero no prueban que la asociación observada sea inexistente.',
  }, fuenteHecho: 'Diseño y cifras inventados; principio de reflectancia respaldado por US EPA, “Using Cool Pavements to Reduce Heat Islands”: https://www.epa.gov/heatislands/using-cool-pavements-reduce-heat-islands' },
  { id: 'q25', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 3, tema: 'historia', razones: {
    A: 'Intercambia funciones: el cronómetro conserva tiempo de referencia y el sextante no elimina su necesidad.',
    B: 'Compara fechas, no las funciones complementarias que pide el objetivo del estudiante.',
    C: 'Solo el sextante mide el ángulo; el cronómetro mide tiempo y por eso aporta información distinta.',
    D: 'Correcta: asigna a cada instrumento su medida y explica cómo ambas entran en la comparación para longitud.',
  }, fuenteHecho: 'Smithsonian, “Time and Navigation” y cronología del sextante: https://www.si.edu/newsdesk/factsheets/time-and-navigation' },
  { id: 'q26', domain: 'EOI', tipo: 'transitions', dificultad: 1, tema: 'ciencia', razones: {
    A: 'In contrast anunciaría oposición entre las llamadas y el uso de grabadores; el segundo aprovecha directamente la primera.',
    B: 'Correcta: la dificultad visual y la existencia de llamadas llevan como consecuencia metodológica al monitoreo acústico.',
    C: 'For example presentaría los grabadores como ejemplo de que las ranas vocalizan, no como respuesta al problema de detección.',
    D: 'Nevertheless indica una concesión inesperada, pero el método se deriva de los dos hechos anteriores sin contradecirlos.',
  }, fuenteHecho: 'USGS, monitoreo acústico de dos ranas raras en Luisiana: https://www.usgs.gov/centers/wetland-and-aquatic-research-center/science/acoustic-monitoring-two-rare-frog-species' },
  { id: 'q27', domain: 'EOI', tipo: 'transitions', dificultad: 3, tema: 'literatura', razones: {
    A: 'For instance introduciría un ejemplo de la preocupación, pero la última oración cuenta un resultado contrario a ella.',
    B: 'Accordingly presenta una consecuencia esperada; Mara esperaba pérdida de ambigüedad y encontró lo opuesto.',
    C: 'Correcta: Nevertheless marca la concesión entre el riesgo que Mara anticipaba y el efecto contrario de la revisión.',
    D: 'Similarly exige un segundo caso paralelo, mientras el texto contrasta expectativa y resultado de un mismo borrador.',
  }, fuenteHecho: 'Traductora, monólogo y ambos borradores inventados.' },
]
