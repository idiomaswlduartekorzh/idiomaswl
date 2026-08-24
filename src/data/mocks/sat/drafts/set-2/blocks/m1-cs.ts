import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

export const items: MCQQuestion[] = [
  {
    id: 'q01', type: 'mcq', part: 1,
    stimulus: 'Engineers testing a new window coating placed identical glass panels beneath heat lamps. Untreated panels became hot enough to warm the air behind them by twelve degrees. Panels carrying the transparent coating warmed that air by only four degrees, although both sets admitted nearly the same amount of visible light. The coating therefore appears to check the passage of heat without noticeably darkening a room.',
    text: 'As used in the text, what does the word "check" most nearly mean?',
    options: ['Restrain', 'Investigate', 'Confirm', 'Mark'],
    answer: 0,
  },
  {
    id: 'q02', type: 'mcq', part: 1,
    stimulus: 'At first, Lena regarded the cracked blue cup as clutter. It sat behind the useful dishes, too fragile for tea and too plain for display. After her grandmother died, however, Lena remembered how the cup had always waited beside the flour bin while they baked together. Its value was not in its appearance or function. The cup had become a vessel for a memory she was unwilling to lose.',
    text: 'As used in the text, what does the word "vessel" most nearly mean?',
    options: ['A traveling ship', 'A blood channel', 'A container', 'A kitchen utensil'],
    answer: 2,
  },
  {
    id: 'q03', type: 'mcq', part: 1,
    stimulus: 'When the city archive released its catalog of neighborhood photographs, historian Mara Okoye called the catalog ambitious but partial. The collection included thousands of studio portraits and official ceremonies, yet almost no images made inside homes or small workshops. Okoye did not question the catalogers\' care. She argued that the surviving photographs themselves offered a slanted record because cameras had been costly and formal occasions were more likely to be preserved.',
    text: 'As used in the text, what does the word "slanted" most nearly mean?',
    options: ['Tilted', 'Biased', 'Diagonal', 'Steep'],
    answer: 1,
  },
  {
    id: 'q04', type: 'mcq', part: 1,
    stimulus: 'Nico arrived at the empty theater certain that the silence would calm him before the audition. Instead, every small sound became distinct: the click of a cooling lamp, the scrape of his shoe, the paper in his hand trembling against itself. He practiced his first line in a whisper. From the back row, the custodian said, “The room can hear you. Let it.” Nico tried again, this time facing the seats.',
    text: 'Which choice best describes the function of the custodian\'s words in the text as a whole?',
    options: ['They explain why the theater magnifies quiet sounds.', 'They warn Nico that another audition has begun.', 'They reveal that the custodian doubts Nico\'s preparation.', 'They prompt Nico to treat the empty room as an audience.'],
    answer: 3,
  },
  {
    id: 'q05', type: 'mcq', part: 1,
    stimulus: 'For decades, astronomers estimated the spin of distant asteroids from regular changes in brightness. A brighter interval usually meant that a wider face was reflecting sunlight toward Earth; a dimmer one meant that a narrower face had turned into view. This method worked poorly for nearly spherical asteroids, whose brightness barely changed as they rotated. Researchers then combined many radar echoes from different moments to build a moving outline, allowing rotation to be measured even when reflected light remained almost constant.',
    text: 'Which choice best describes the overall structure of the text?',
    options: ['It presents a disputed measurement, rejects both sides of the dispute, and proposes a compromise.', 'It describes a method, identifies a case in which the method is weak, and introduces a technique that addresses that weakness.', 'It compares two kinds of asteroids, explains why one is brighter, and predicts how each will change.', 'It traces an observation from visible light to radar and argues that the original observation was inaccurate in every case studied.'],
    answer: 1,
  },
  {
    id: 'q06', type: 'mcq', part: 1,
    stimulus: 'Some accounts describe the traveling libraries of the 1930s as emergency substitutes that vanished once permanent branches opened. Records from Pine County complicate that view. The county opened three branches between 1934 and 1938, yet requests for the book truck rose during the same period. Librarians changed its route: instead of stopping in the towns now served by branches, it visited farms, logging camps, and seasonal work sites. The truck did not merely precede the branches; it reached readers the buildings could not.',
    text: 'Which choice best describes the function of the information about the book truck\'s changed route?',
    options: ['It supplies a reason the truck remained useful after branches opened.', 'It concedes that the county had built its branches in unsuitable towns.', 'It illustrates how permanent branches copied a service developed by the truck.', 'It shows that demand for library books fell within the county\'s towns.'],
    answer: 0,
  },
  {
    id: 'q07', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nMuseum labels should give visitors a firm interpretation of an unfamiliar object. A concise account of who made it, why, and for whom prevents a viewer from mistaking decoration for function or assuming that every object served daily life.\n\nText 2\n\nA label can guide without closing the question. When museums present one settled interpretation, visitors may overlook evidence that curators themselves still debate. Labels should distinguish what is documented from what is inferred and invite viewers to notice the uncertainty.',
    text: 'Based on the texts, how would the author of Text 2 most likely respond to the recommendation in Text 1?',
    options: ['By agreeing that labels should omit interpretations not supported by written records or physical evidence', 'By arguing that unfamiliar objects should be displayed without any explanatory labels', 'By agreeing that labels should guide viewers but urging them to disclose unresolved interpretations', 'By arguing that labels should focus on decoration rather than an object\'s practical use'],
    answer: 2,
  },
  {
    id: 'q08', type: 'mcq', part: 1,
    stimulus: 'Text 1\n\nYoung oak trees in crowded plots grew taller than those in open plots during a five-year experiment. The researchers concluded that competition for light caused the trees to invest more growth in height, enabling their leaves to reach above neighboring plants.\n\nText 2\n\nHeight alone does not show where a tree invested its resources. In the crowded plots, the oaks also began the experiment in deeper, moister soil. Because water availability can accelerate growth throughout a tree, the reported difference cannot be attributed securely to competition unless soil conditions are held constant.',
    text: 'Which choice best describes a difference between the approaches of the two texts?',
    options: ['Text 1 treats the soil difference as decisive, whereas Text 2 regards that difference as irrelevant.', 'Text 1 focuses on mature forests across several regions, whereas Text 2 focuses on controlled experiments with seedlings in a single plot.', 'Text 1 attributes growth to soil moisture, whereas Text 2 attributes the same growth to access to light.', 'Text 1 proposes a cause for the growth pattern, whereas Text 2 argues that an uncontrolled factor prevents that conclusion.'],
    answer: 3,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q01', domain: 'CS', tipo: 'words-in-context', dificultad: 1, tema: 'ciencia', razones: {
    A: 'Correcta: check significa limitar o frenar; la comparación muestra que el recubrimiento reduce el calor que atraviesa el vidrio.',
    B: 'Investigate es examinar algo de cerca, pero el recubrimiento no estudia el calor ni realiza una medición.',
    C: 'Confirm es verificar una afirmación; el sujeto de la frase es el recubrimiento, no el experimento que confirma el resultado.',
    D: 'Mark es señalar o dejar una marca, una acepción posible de check que no describe el paso del calor.',
  }, fuenteHecho: 'Situación experimental y cifras originales inspiradas en principios generales de transferencia térmica.' },
  { id: 'q02', domain: 'CS', tipo: 'words-in-context', dificultad: 2, tema: 'literatura', razones: {
    A: 'Ship es una acepción literal de vessel, pero el objeto es una taza y no hay viaje marítimo en el pasaje.',
    B: 'Blood channel es una acepción anatómica, pero el texto trata de la memoria afectiva de Lena.',
    C: 'Correcta: la taza contiene o conserva simbólicamente el recuerdo que Lena no quiere perder.',
    D: 'Kitchen utensil describe el objeto por su uso anterior, justo la función que el texto declara insuficiente para explicar su valor.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q03', domain: 'CS', tipo: 'words-in-context', dificultad: 3, tema: 'historia', razones: {
    A: 'Tilted describe una inclinación física y no la representación incompleta producida por las fotografías conservadas.',
    B: 'Correcta: slanted significa sesgado, pues la colección favorece ceremonias y retratos de quienes podían pagar una cámara.',
    C: 'Diagonal nombra una orientación geométrica; no explica por qué el archivo representa unas vidas más que otras.',
    D: 'Steep alude a una pendiente pronunciada, una lectura literal incompatible con un registro histórico.',
  }, fuenteHecho: 'Archivo, historiadora y catálogo inventados; problema historiográfico general.' },
  { id: 'q04', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 1, tema: 'humanidades', razones: {
    A: 'La acústica ya se muestra mediante los sonidos pequeños; el custodian no ofrece una explicación física del fenómeno.',
    B: 'No ha empezado otra audición ni aparece un segundo candidato; la frase se dirige solo a la manera de ensayar de Nico.',
    C: 'La frase no evalúa su preparación: le indica cómo proyectar la voz en el espacio vacío.',
    D: 'Correcta: después de oírla, Nico deja de susurrar y vuelve a hablar mirando los asientos como si estuvieran ocupados.',
  }, fuenteHecho: 'Ficción original.' },
  { id: 'q05', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 2, tema: 'ciencia', razones: {
    A: 'No hay disputa ni dos bandos; el texto evalúa los límites de una técnica de medición.',
    B: 'Correcta: presenta los cambios de brillo, explica su fallo con cuerpos casi esféricos y muestra cómo el radar cubre ese caso.',
    C: 'No compara clases completas de asteroides ni predice cambios futuros; explica cómo medir su rotación.',
    D: 'El método original no se declara inexacto en general, sino poco informativo para una forma específica.',
  }, fuenteHecho: 'Descripción original basada en métodos astronómicos generales; sin estudio ni cifras reales.' },
  { id: 'q06', domain: 'CS', tipo: 'text-structure-purpose', dificultad: 3, tema: 'historia', razones: {
    A: 'Correcta: el cambio hacia zonas sin sucursal explica el aumento de solicitudes y refuta que el vehículo fuera un sustituto temporal.',
    B: 'El texto no califica de inadecuadas las localidades elegidas para las sucursales.',
    C: 'La dirección de influencia no aparece: las sucursales no copian rutas ni servicios del camión.',
    D: 'Las solicitudes totales aumentaron; nada demuestra una caída de lectores en los pueblos.',
  }, fuenteHecho: 'Condado, fechas y registros inventados a partir de la historia general de bibliotecas móviles.' },
  { id: 'q07', domain: 'CS', tipo: 'cross-text-connections', dificultad: 2, tema: 'humanidades', razones: {
    A: 'Text 2 no limita la evidencia válida a documentos escritos; pide separar hechos documentados de inferencias.',
    B: 'El segundo autor acepta que una etiqueta puede orientar, por lo que no propone eliminarlas.',
    C: 'Correcta: conserva la función orientadora defendida en Text 1, pero exige mostrar qué interpretación sigue en debate.',
    D: 'Ningún texto propone privilegiar decoración sobre función; esa oposición solo ilustra un posible error del visitante.',
  }, fuenteHecho: 'Argumentos museográficos originales.' },
  { id: 'q08', domain: 'CS', tipo: 'cross-text-connections', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Invierte la reserva: Text 2 sostiene que la diferencia del suelo podría ser decisiva, no irrelevante.',
    B: 'Ambos textos tratan los mismos robles jóvenes y el mismo experimento de cinco años.',
    C: 'Invierte las posiciones: Text 1 propone competencia por luz y Text 2 introduce la humedad como factor alternativo.',
    D: 'Correcta: Text 1 atribuye la altura a competencia por luz, mientras Text 2 señala que la humedad del suelo no fue controlada.',
  }, fuenteHecho: 'Experimento, especies y resultados inventados para el ítem.' },
]
