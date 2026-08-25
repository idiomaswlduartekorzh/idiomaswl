import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/** Expression of Ideas · Set 4 M2 exigente · q23–q27. Claves: A, C, D, B, C. */
export const items: MCQQuestion[] = [
  {
    id: 'q23', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• An archive tested two labels for the same undated photograph.\n• Label G described the photograph as “about 1880.”\n• Label R gave a range of 1878–1884 based on entries in a studio ledger.\n• Both labels named the photographer and the depicted street.\n• The archive did not ask visitors which label they preferred.\n• The labels and study scenario are original to this question.',
    text: 'The student wants to compare the labels’ precision without claiming a visitor preference. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Label R states the bounded range 1878–1884, whereas Label G says only “about 1880”; visitor preference was not measured.', 'Visitors preferred Label R because its studio-ledger evidence made the photograph more interesting.', 'Both labels identify the photographer and street, so they provide exactly the same degree of date precision.', 'The photograph was certainly taken in 1880 because that year appears in the less precise label.'],
    answer: 0,
  },
  {
    id: 'q24', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Researchers tested two fog-collecting meshes of equal area on the same ridge.\n• The meshes were exposed during the same eight foggy nights.\n• Mesh F collected an average of 3.2 liters of water per square meter each night.\n• Mesh G collected an average of 5.1 liters per square meter each night.\n• The mesh designs and measurements are original to this question.',
    text: 'The student wants to compare the meshes’ measured water yield. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Mesh F and Mesh G collected equal volumes because their areas and exposure periods matched.', 'Mesh G collected 1.9 liters total during all eight nights, regardless of mesh area.', 'Under the shared test conditions, Mesh G averaged 1.9 L/m² more water per night than Mesh F.', 'Mesh G will outperform every other fog collector at any location because it had the higher test average.'],
    answer: 2,
  },
  {
    id: 'q25', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• A loose manuscript leaf bears a watermark design used by one paper mill from 1820 through 1832.\n• An archive receipt states that the leaf was already inside a particular document bundle when the archive acquired that bundle in 1828.\n• The receipt is considered authentic and identifies the leaf by its opening words.\n• The manuscript itself has no written date.',
    text: 'The student wants to explain how the two pieces of evidence narrow when the leaf could have been produced. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['The watermark proves that the manuscript was written in 1832, the final year the mill used the design.', 'Because the manuscript has no written date, neither the watermark nor the receipt provides chronological evidence.', 'The archive acquired the bundle in 1828, but the leaf may have been added to it for the first time in 1832.', 'The watermark places the paper no earlier than 1820, and the receipt shows the identified leaf existed in the bundle by 1828.'],
    answer: 3,
  },
  {
    id: 'q26', type: 'mcq', part: 1,
    stimulus: 'A membrane removed more than 90% of a target ion from water in trials at both a lower and a higher feed concentration. ______ the water flux through the membrane was 35% lower in the higher-concentration trial than in the lower-concentration trial.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['For example,', 'However,', 'Therefore,', 'Similarly,'],
    answer: 1,
  },
  {
    id: 'q27', type: 'mcq', part: 1,
    stimulus: 'A poet revised nearly every line surrounding an image of moonlight resting on an empty chair. She shortened the stanza’s meter, replaced three verbs, and moved the stanza to the end of the poem. ______ she preserved the image itself word for word through all four surviving drafts.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['Similarly,', 'Consequently,', 'Nevertheless,', 'For instance,'],
    answer: 2,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q23', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 1, tema: 'humanidades', razones: {
    A: 'Correcta: contrasta una fecha aproximada con un intervalo documentado y conserva el límite sobre preferencia.', B: 'Las notas dicen que no se preguntó preferencia; interés tampoco fue medido.', C: 'Coinciden en autor y calle, pero R delimita la fecha con mayor precisión.', D: 'About 1880 no establece certeza y es precisamente la etiqueta menos acotada.',
  }, fuenteHecho: 'Archivo, fotografía, etiquetas, libro y escenario originales.' },
  { id: 'q24', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 1, tema: 'ciencia', razones: {
    A: 'Igual área y exposición controlan condiciones, pero los promedios fueron distintos.', B: '1,9 es la diferencia por metro cuadrado y noche, no el volumen total de ocho noches.', C: 'Correcta: 5,1 − 3,2 = 1,9 L/m² por noche bajo condiciones compartidas.', D: 'Un ensayo en una cresta no permite universalizar a todo diseño y ubicación.',
  }, fuenteHecho: 'Mallas, sitio, duración y mediciones originales.' },
  { id: 'q25', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 2, tema: 'historia', razones: {
    A: 'La marca ofrece un intervalo de fabricación del papel, no el año exacto de escritura.', B: 'Ambas evidencias aportan límites aunque falte una fecha escrita.', C: 'El recibo auténtico identifica la hoja como presente en 1828, por lo que no pudo añadirse por primera vez en 1832.', D: 'Correcta: combina el inicio del uso de la marca con la existencia documentada de la hoja en 1828.',
  }, fuenteHecho: 'Hoja, molino, intervalo, recibo y evidencia hipotéticos originales.' },
  { id: 'q26', domain: 'EOI', tipo: 'transitions', dificultad: 2, tema: 'ciencia', razones: {
    A: 'For example presentaría una instancia de la remoción alta; la segunda oración introduce un desempeño distinto que disminuye.', B: 'Correcta: However contrasta la remoción todavía alta con la menor velocidad de paso del agua.', C: 'Therefore afirma que la reducción de flujo se sigue causalmente de remover más de 90 %, relación que no se establece.', D: 'Similarly indica semejanza, pero 35 % menos flujo es una diferencia entre condiciones.',
  }, fuenteHecho: 'Membrana, ion, concentraciones y resultados originales.' },
  { id: 'q27', domain: 'EOI', tipo: 'transitions', dificultad: 3, tema: 'literatura', razones: {
    A: 'Similarly exigiría otro detalle preservado; antes se enumeran cambios.', B: 'Consequently convertiría la conservación en efecto necesario de las revisiones, no en contraste.', C: 'Correcta: Nevertheless marca que la imagen permanece pese a los cambios extensos alrededor.', D: 'For instance introduciría un ejemplo de modificación, pero la oración informa la excepción preservada.',
  }, fuenteHecho: 'Poeta, imagen y proceso de revisión inventados.' },
]
