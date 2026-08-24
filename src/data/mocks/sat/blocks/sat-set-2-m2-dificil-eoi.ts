import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

export const items: MCQQuestion[] = [
  {
    id: 'q23', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Composer Amina Solano wrote Harbor Nocturne in 2008.\n• The piece is scored for flute, cello, and piano.\n• Solano based its rhythm on the pattern of harbor warning lights.\n• The flute and cello alternate short phrases.\n• The piano repeats a five-beat figure throughout most of the piece.\n• Harbor Nocturne was first performed at the Seaward Arts Festival.',
    text: 'The student wants to introduce Harbor Nocturne and explain the source of one musical feature. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Harbor Nocturne was first performed at the Seaward Arts Festival by musicians playing flute, cello, and piano.', 'Amina Solano wrote Harbor Nocturne in 2008, and its flute and cello alternate short phrases.', 'Amina Solano\'s Harbor Nocturne uses a rhythm based on the pattern of warning lights in a harbor.', 'A five-beat piano figure repeats through most of Harbor Nocturne, a piece written for three instruments.'],
    answer: 2,
  },
  {
    id: 'q24', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Researchers surveyed moss on stone walls at 24 sites.\n• Twelve walls faced north; twelve faced south.\n• North-facing walls averaged 68% moss cover.\n• South-facing walls averaged 29% moss cover.\n• North-facing surfaces received fewer hours of direct sunlight.\n• Wall age and stone type were similar across the two groups.\n• Researchers predicted that lower light would help walls retain moisture and support moss.',
    text: 'The student wants to present a result that supports the researchers\' prediction. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Receiving less direct sunlight, north-facing walls averaged 68% moss cover, compared with 29% on south-facing walls.', 'Researchers surveyed twelve north-facing walls and twelve south-facing walls at 24 sites.', 'The north- and south-facing walls were similar in age and stone type but differed in direction.', 'Lower light was predicted to help stone walls retain moisture that could support moss.'],
    answer: 0,
  },
  {
    id: 'q25', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Economist Farid Mensah studied a textile town from 1885 to 1905.\n• Steam-powered factories employed 1,900 workers in 1885 and 2,450 in 1905.\n• Home-based hand weaving employed 620 workers in 1885 and 780 in 1905.\n• Total textile employment increased in both sectors.\n• Hand weaving\'s share of textile employment fell from about 25% to about 24%.\n• Mensah argues that factory expansion did not eliminate home weaving, although it reduced its relative importance.',
    text: 'The student wants to explain how the employment data support Mensah\'s argument. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Factory employment increased by 550 workers, while hand-weaving employment increased by 160 workers.', 'In 1905, factories employed 2,450 textile workers and home weaving employed 780 workers.', 'Textile employment increased in both factories and homes between 1885 and 1905.', 'Home weaving gained workers, rising from 620 to 780, but its share of textile employment slipped from about 25% to about 24%.'],
    answer: 3,
  },
  {
    id: 'q26', type: 'mcq', part: 1,
    stimulus: 'The linguist\'s first transcription represented every pause with the same symbol. Later acoustic analysis showed that some pauses contained a quiet inhalation while others were complete silence. The distinction did not change the words speakers used. ______ it changed how researchers interpreted where speakers were planning the next phrase rather than simply hesitating.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['For example,', 'Nevertheless,', 'Similarly,', 'In other words,'],
    answer: 1,
  },
  {
    id: 'q27', type: 'mcq', part: 1,
    stimulus: 'Critics once described the painted borders in Liora Sen\'s manuscripts as decoration added after the central images were complete. Infrared scans have since revealed guide lines that cross from the borders into those images, and several figures in the center align with curves begun at the page edge. ______ the borders appear to have shaped the composition from its earliest stages, not merely framed a finished scene.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['Meanwhile,', 'For instance,', 'Accordingly,', 'Conversely,'],
    answer: 2,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q23', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 1, tema: 'humanidades', razones: {
    A: 'Introduce obra e instrumentos, pero no explica el origen de un rasgo musical.', B: 'Presenta autora y alternancia sin explicar de dónde viene esa característica.', C: 'Correcta: nombra obra y autora y vincula el ritmo con las luces del puerto.', D: 'Describe instrumentación y repetición, pero no la fuente de ese patrón.' }, fuenteHecho: 'Compositora, obra, festival y rasgos inventados.' },
  { id: 'q24', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Correcta: conecta menor luz con la diferencia de cobertura que apoya la predicción.', B: 'Solo describe el tamaño y reparto de la muestra.', C: 'Nombra controles del diseño sin presentar el resultado de musgo.', D: 'Repite la predicción y no aporta el resultado que debía respaldarla.' }, fuenteHecho: 'Sitios, muros, porcentajes y predicción inventados.' },
  { id: 'q25', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 3, tema: 'historia', razones: {
    A: 'Muestra aumentos absolutos, pero no prueba por sí sola el cambio en importancia relativa.', B: 'Da solo valores finales y omite continuidad y proporción.', C: 'Apoya que no desaparece, pero no que pierda peso relativo.', D: 'Correcta: combina crecimiento absoluto con descenso proporcional, las dos partes del argumento.' }, fuenteHecho: 'Economista, ciudad, años y cifras inventados.' },
  { id: 'q26', domain: 'EOI', tipo: 'transitions', dificultad: 1, tema: 'humanidades', razones: {
    A: 'For example anunciaría una ilustración de una regla general.', B: 'Correcta: contrasta que las palabras no cambian con el cambio interpretativo que sí se produce.', C: 'Similarly pide una relación paralela entre efectos equivalentes.', D: 'In other words anunciaría una reformulación, pero cambiar palabras y cambiar interpretación son resultados contrastantes.' }, fuenteHecho: 'Transcripción y análisis inventados.' },
  { id: 'q27', domain: 'EOI', tipo: 'transitions', dificultad: 3, tema: 'humanidades', razones: {
    A: 'Meanwhile marca simultaneidad, no conclusión a partir de escaneos.', B: 'For instance introduciría otro ejemplo después de los ya dados.', C: 'Correcta: señala la inferencia que se deriva de líneas y alineaciones.', D: 'Conversely exige una relación inversa entre dos afirmaciones paralelas.' }, fuenteHecho: 'Artista, manuscritos y resultados de escaneo inventados.' },
]
