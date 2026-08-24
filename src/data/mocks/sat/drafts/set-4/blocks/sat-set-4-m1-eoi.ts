import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/** Expression of Ideas · Set 4 M1 · q23–q27. Claves reservadas: A, B, D, C, A. */
export const items: MCQQuestion[] = [
  {
    id: 'q23', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• A museum tested two versions of labels for an exhibition about ceramic vessels.\n• Ninety visitors were randomly assigned to one version.\n• Version T presented text and a photograph.\n• Version M presented the same text plus a raised outline and a short audio description.\n• On an immediate five-question check, the average score was 58% for T and 76% for M.\n• The test did not measure recall after the day of the visit.\n• The formats and numerical results are original to this question.',
    text: 'The student wants to compare immediate recall for the two label versions without claiming a result the test did not measure. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['The multisensory labels produced an 18-point advantage on the same-day check (76% versus 58%); long-term memory was not evaluated.', 'Because Version M used three modes instead of two, its visitors remembered every detail of the exhibition permanently.', 'Version T presented text and a photograph, while Version M included the same text, a raised outline, and an audio description.', 'Ninety museum visitors examined labels about ceramic vessels and completed five questions sometime after their visits.'],
    answer: 0,
  },
  {
    id: 'q24', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• A passive radiative-cooling coating reflects sunlight and emits thermal radiation.\n• Researchers tested coated and uncoated panels during two afternoons with similar solar intensity.\n• At 35% relative humidity, the coated panel averaged 4.8°C cooler than the uncoated panel.\n• At 78% relative humidity, the difference averaged 1.6°C.\n• Atmospheric water vapor can absorb some outgoing infrared radiation.\n• The two temperature differences are original to this question.',
    text: 'The student wants to describe how the coating’s measured effect differed with humidity. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['The coating emitted thermal radiation only when relative humidity was exactly 35%.', 'The coated panel was cooler than the uncoated panel under both conditions, but the average difference was smaller at 78% humidity than at 35%.', 'Higher humidity made the coated panel 3.2°C warmer than the uncoated panel because water vapor absorbs infrared radiation.', 'Since solar intensity was similar on both afternoons, humidity cannot help explain the difference between the two results.'],
    answer: 1,
  },
  {
    id: 'q25', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Around 132 CE, Zhang Heng designed an early seismoscope in China.\n• During shaking, the device reportedly released a ball from one of eight dragon heads.\n• The released ball indicated a direction but did not produce a continuous record of ground motion.\n• Later seismographs use relative motion between a suspended mass and the instrument’s frame.\n• A stylus or another recording system traces that motion over time.\n• Such a trace can preserve the timing and form of seismic waves.',
    text: 'The student wants to distinguish the information produced by Zhang Heng’s seismoscope from that produced by later recording seismographs. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Both devices use a stylus attached to a suspended mass to produce a continuous trace of seismic waves.', 'Zhang Heng’s device was designed around 132 CE, whereas seismographs were developed at a later time.', 'The seismoscope recorded the timing and form of waves, but later seismographs indicated only one of eight directions.', 'A released ball could indicate a direction of shaking, while a recording seismograph could preserve a trace of motion over time.'],
    answer: 3,
  },
  {
    id: 'q26', type: 'mcq', part: 1,
    stimulus: 'Mycelium composites can absorb moisture through pores and areas where fungal growth is sparse. In one study, a beeswax coating partly filled surface defects and also helped distribute loads applied to the material. ______ the coated samples absorbed less water and withstood greater compressive force than the uncoated samples.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['For example,', 'Nevertheless,', 'Consequently,', 'Meanwhile,'],
    answer: 2,
  },
  {
    id: 'q27', type: 'mcq', part: 1,
    stimulus: 'A novelist arranged the scenes of a fictional journey by recurring scents rather than by date: cedar marked the mountain village, salt marked the port, and smoke marked the return home. Her editor worried that readers would be unable to reconstruct the sequence because the narration moved repeatedly among the three scents. ______ in a small reading test, participants placed every major event in chronological order by using changes in the characters’ ages and possessions.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['Nevertheless,', 'Similarly,', 'Therefore,', 'For instance,'],
    answer: 0,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q23', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 1, tema: 'humanidades', razones: {
    A: 'Correcta: calcula la ventaja de 18 puntos entre 76 % y 58 % y conserva el límite de que no se midió memoria a largo plazo.',
    B: 'Convierte una diferencia media inmediata en recuerdo perfecto y permanente, resultados que el estudio no midió.',
    C: 'Compara los componentes de las etiquetas, pero omite por completo los resultados de recuerdo solicitados.',
    D: 'Menciona muestra y tema, pero no compara formatos ni puntuaciones y vuelve impreciso el momento de la prueba.',
  }, fuenteHecho: 'Diseño, formatos y cifras originales; uso conjunto de tacto y audio informado por Graven et al., “Improved access to museum collections without vision”: https://doi.org/10.1177/0264619619874833' },
  { id: 'q24', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Las notas no dicen que la emisión se apague fuera de 35 %; registran enfriamiento en ambas condiciones.',
    B: 'Correcta: compara las dos diferencias con dirección y magnitud exactas, sin afirmar que la humedad sea la única causa.',
    C: 'A 78 % el panel recubierto todavía fue 1,6 °C más frío, no 3,2 °C más caliente.',
    D: 'La intensidad solar semejante controla una diferencia, pero no excluye la humedad, que varió y puede afectar la radiación saliente.',
  }, fuenteHecho: 'Diferencias térmicas originales; relación cualitativa informada por Fan, Fu y Fu, “Yttria-stabilized zirconia coating for passive daytime radiative cooling in humid environment”: https://doi.org/10.1016/j.applthermaleng.2019.114585' },
  { id: 'q25', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 3, tema: 'historia', razones: {
    A: 'Atribuye al seismoscopio antiguo el sistema continuo de masa y registro descrito para los instrumentos posteriores.',
    B: 'La cronología es cierta según las notas, pero no distingue qué información produce cada dispositivo.',
    C: 'Intercambia las funciones: el seismoscopio indica dirección y el seismógrafo conserva el movimiento en el tiempo.',
    D: 'Correcta: contrasta directamente la señal direccional discreta con un registro continuo de movimiento.',
  }, fuenteHecho: 'U.S. Geological Survey, “What was the first instrument that actually recorded an earthquake?” y “Seismographs—Keeping Track of Earthquakes”: https://www.usgs.gov/faqs/what-was-first-instrument-actually-recorded-earthquake' },
  { id: 'q26', domain: 'EOI', tipo: 'transitions', dificultad: 1, tema: 'ciencia', razones: {
    A: 'For example presentaría un caso de la explicación previa, pero la última oración expresa el resultado producido por el recubrimiento.',
    B: 'Nevertheless marca contradicción; la menor absorción y mayor resistencia concuerdan con llenar poros y distribuir cargas.',
    C: 'Correcta: Consequently introduce los dos resultados como efectos de las funciones del recubrimiento descritas antes.',
    D: 'Meanwhile señala simultaneidad entre acontecimientos, no la relación causal entre tratamiento y desempeño.',
  }, fuenteHecho: 'Materials Today Communications (2026), recubrimiento de cera, absorción de agua y resistencia de compuestos de micelio: https://doi.org/10.1016/j.mtcomm.2026.115589' },
  { id: 'q27', domain: 'EOI', tipo: 'transitions', dificultad: 3, tema: 'literatura', razones: {
    A: 'Correcta: Nevertheless marca que los lectores sí reconstruyeron el orden pese a la dificultad anticipada por el editor.',
    B: 'Similarly exige un caso paralelo anterior; aquí la prueba contradice una expectativa.',
    C: 'Therefore presentaría el éxito como consecuencia de la preocupación del editor, una relación que el texto no establece.',
    D: 'For instance introduciría un ejemplo de desorientación, pero la prueba informa el resultado contrario.',
  }, fuenteHecho: 'Novelista, estructura, editor y prueba de lectura inventados.' },
]
