import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

export const items: MCQQuestion[] = [
  {
    id: 'q23', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• The Moonlight Cinema is an outdoor film program in Bellavista Park.\n• It began in 2016.\n• Films are shown on Friday evenings in July and August.\n• Viewers sit on the park lawn and may bring blankets.\n• Admission is free.\n• Local restaurants sell food beside the lawn before each film.',
    text: 'The student wants to introduce the Moonlight Cinema to someone unfamiliar with it. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Local restaurants sell food in Bellavista Park before films on Fridays in July and August.', 'The Moonlight Cinema is a free outdoor film program held on Friday evenings in Bellavista Park during July and August.', 'Viewers at the Moonlight Cinema sit on a lawn and may bring blankets to the park.', 'The Moonlight Cinema began in 2016, and restaurants now sell food beside the park lawn.'],
    answer: 1,
  },
  {
    id: 'q24', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• An engineering class built two model bridges from identical wooden sticks.\n• Bridge X used triangular supports; Bridge Y used square supports.\n• Each bridge had a mass of 420 grams.\n• Students added weight until each bridge bent permanently.\n• Bridge X supported 18 kilograms.\n• Bridge Y supported 11 kilograms.\n• The class wanted to compare support shapes without changing the amount of material.',
    text: 'The student wants to compare the strength of the two bridge designs. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Both bridges had a mass of 420 grams, and the class built them from identical wooden sticks.', 'Bridge X used triangular supports, whereas Bridge Y used square supports made from identical sticks.', 'Students added weight to the two model bridges until each design bent permanently.', 'With equal mass, the triangular design supported 18 kilograms before bending, compared with 11 kilograms for the square design.'],
    answer: 3,
  },
  {
    id: 'q25', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Historian Dana Okafor studied the Harbor Street neighborhood between 1920 and 1940.\n• City directories list 46 small shops there in 1920 and 71 in 1940.\n• Of the 25 additional shops, 18 occupied the ground floors of newly built apartment houses.\n• Streetcar service began in 1926.\n• Apartment construction accelerated after 1928.\n• Okafor argues that new housing, not the streetcar alone, created space for the growth in retail businesses.',
    text: 'The student wants to present evidence that most directly supports Okafor\'s argument. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Streetcar service began in 1926, two years before apartment construction accelerated in Harbor Street.', 'The number of small shops in Harbor Street rose from 46 in 1920 to 71 in 1940.', 'Eighteen of the 25 additional shops operating by 1940 occupied ground floors in newly built apartment houses.', 'Dana Okafor studied city directories covering Harbor Street from 1920 through 1940.'],
    answer: 2,
  },
  {
    id: 'q26', type: 'mcq', part: 1,
    stimulus: 'The school cafeteria replaced disposable forks with washable metal ones. During the first month, the kitchen used more hot water because every fork had to be cleaned. The school also purchased two additional dish racks. ______ the number of plastic utensils thrown away fell from nearly nine thousand in the previous month to fewer than three hundred.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['At the same time,', 'For example,', 'Instead,', 'In particular,'],
    answer: 0,
  },
  {
    id: 'q27', type: 'mcq', part: 1,
    stimulus: 'A new translation of the explorer Li Wen\'s journal uses modern place names in the main text so readers can follow the route on current maps. Some historians worried that this choice would erase the language of Li\'s own period. ______ the translator prints each historical name in a note beside its modern equivalent, allowing readers to see both forms without interrupting the journey described in the journal.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['Similarly,', 'However,', 'For this reason,', 'In addition,'],
    answer: 1,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q23', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 1, tema: 'humanidades', razones: {
    A: 'Describe comida y calendario, pero no define qué es Moonlight Cinema ni aclara que la entrada es gratuita.',
    B: 'Correcta: identifica el programa, su formato, lugar, costo y calendario para un lector nuevo.',
    C: 'Explica cómo se acomodan los espectadores, pero presupone que el lector ya sabe qué programa es.',
    D: 'Da historia y comida, aunque no dice que sea cine al aire libre ni gratuito.',
  }, fuenteHecho: 'Programa, parque, fechas y condiciones inventados.' },
  { id: 'q24', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Controla la cantidad de material, pero no informa qué diseño resistió más peso.',
    B: 'Compara formas y material, aunque omite el resultado de resistencia que pide el objetivo.',
    C: 'Describe el procedimiento común sin comparar los valores obtenidos.',
    D: 'Correcta: mantiene visible el control de masa y compara directamente los 18 y 11 kilogramos.',
  }, fuenteHecho: 'Clase, puentes y resultados inventados.' },
  { id: 'q25', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 3, tema: 'historia', razones: {
    A: 'Ordena dos fechas, pero no conecta la construcción de vivienda con locales comerciales nuevos.',
    B: 'Demuestra crecimiento comercial, aunque no identifica qué produjo el espacio para ese crecimiento.',
    C: 'Correcta: vincula 18 de los 25 comercios añadidos con plantas bajas de apartamentos nuevos.',
    D: 'Describe la fuente y el período de estudio, no la evidencia que sostiene la explicación.',
  }, fuenteHecho: 'Historiadora, barrio, directorios y cifras inventados.' },
  { id: 'q26', domain: 'EOI', tipo: 'transitions', dificultad: 1, tema: 'humanidades', razones: {
    A: 'Correcta: introduce un resultado simultáneo que contrasta en balance con costos operativos ya descritos.',
    B: 'For example pide una afirmación general anterior que la reducción de residuos ejemplifique.',
    C: 'Instead presentaría la caída de residuos como sustituto de comprar racks o gastar agua, relación que no existe.',
    D: 'In particular especifica un conjunto previo, pero el texto pasa a una consecuencia distinta.',
  }, fuenteHecho: 'Cafetería y cifras inventadas.' },
  { id: 'q27', domain: 'EOI', tipo: 'transitions', dificultad: 2, tema: 'historia', razones: {
    A: 'Similarly exige un caso paralelo anterior; aquí se responde a una preocupación.',
    B: 'Correcta: contrasta el temor a borrar nombres históricos con la decisión de conservarlos en notas.',
    C: 'For this reason convertiría la preocupación de los críticos en causa declarada, algo que el texto no establece.',
    D: 'In addition suma información sin marcar que la nota limita la objeción anterior.',
  }, fuenteHecho: 'Explorador, traducción y decisión editorial inventados.' },
]
