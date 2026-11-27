import { normalizeIeltsGuidedAnswer, type IeltsGuidedObjectiveItem } from './guided-mock.ts';
import type { GuidedLearningFeedback } from './guided-learning-types.ts';

const formats = {
  'true-false-not-given': 'True / False / Not Given',
  'yes-no-not-given': 'Yes / No / Not Given',
  'matching-information': 'Matching Information',
  'matching-headings': 'Matching Headings',
  'matching-features': 'Matching Features',
  'matching-sentence-endings': 'Matching Sentence Endings',
  'multiple-choice': 'Multiple Choice',
  'sentence-completion': 'Sentence Completion',
  'summary-completion': 'Summary Completion',
  'note-completion': 'Note Completion',
  'table-completion': 'Table Completion',
  'flow-chart-completion': 'Flow-chart Completion',
  'diagram-labeling': 'Diagram Labeling',
  'short-answer': 'Short Answer',
};

type Format = keyof typeof formats;
type Judgement = 'TRUE' | 'FALSE' | 'YES' | 'NO' | 'NOT GIVEN';
type Note = readonly [questionAnchor: string, explanation: string];

// Each note is bound to an actual statement as well as its set and question number.
// A revised statement must not inherit a conclusion about the old one.
const openClaims: Readonly<Record<string, Note>> = {
  '1-15': ['above-average', 'Platón habla del sentimiento de superioridad que acompaña a la risa. Sentirse superior a alguien no mide la inteligencia de quien se ríe. Para resolver esa comparación haría falta que Platón relacionara el humor con una inteligencia superior a la media.'],
  '1-19': ['most comedians', 'El pasaje explica cómo un comediante prepara una situación y luego cambia su interpretación. La afirmación pide dos datos distintos, de dónde sale ese material y si la mayoría usa experiencias personales. Describir cómo funciona un chiste deja ambas cuestiones abiertas.'],
  '1-35': ['strong competition', 'El pasaje sitúa a los científicos en una comunidad que usaba el latín para circular sus trabajos. Compartir una lengua admite tanto competencia como colaboración. Para decidir esta frase tendrías que saber cómo rivalizaban entre ellos y con qué intensidad.'],
  '2-16': ['solitary bees', 'Hay información sobre la contribución de las abejas a la polinización. La afirmación exige una comparación de eficiencia entre solitarias y sociales. Una cifra sobre todos los polinizadores juntos no permite ordenar esos dos grupos.'],
  '3-15': ['most ocean plastic', 'Los residuos terrestres aparecen como una fuente importante. La palabra decisiva es “most”, que exige establecer que más de la mitad del plástico oceánico procede de tierra. Hay otras fuentes y el texto no reparte el total entre ellas.'],
  '3-18': ['responsibility schemes', 'Presentar la responsabilidad del productor como una medida posible no cuenta la historia de su implementación. Aquí haría falta saber si algún país ya ensayó esos programas. Una recomendación no establece que se haya hecho ese ensayo.'],
  '5-3': ['served food', 'Las reuniones y el consumo de café describen el uso de esos locales en Constantinopla. La afirmación añade un dato sobre su menú. Un lugar podría servir comida o limitarse a las bebidas y seguir cumpliendo todas las funciones descritas.'],
  '5-5': ['medical doctor', 'El título y el contenido de la petición permiten identificar el documento. Ninguno establece la profesión de su autor. Que el panfleto mencione efectos sobre la salud tampoco identifica a quien lo escribió como médico.'],
  '5-33': ['outside the united states', 'La afirmación depende del lugar de todos los estudios que sirvieron de base a Schwartz. Una descripción de su tesis, o de trabajos posteriores que la matizan, no proporciona una lista de esos lugares.'],
  '6-4': ['military victory', 'Lo que interesa al pasaje sobre Talas es la transmisión del conocimiento papelero. Que una técnica pasara de unas manos a otras tras una batalla no establece quién obtuvo la victoria militar.'],
  '6-31': ['reduced the need for labour', 'Explicar cómo las plataformas ponen en contacto a clientes y trabajadores no demuestra que reduzcan la necesidad de mano de obra, ni que esa supuesta reducción sea la causa principal del crecimiento. La afirmación necesita las dos cosas.'],
  '7-5': ['before aircraft wings', 'Reconocer el mismo diseño en una turbina y en un ala establece dos aplicaciones. Para decidir cuál fue la primera necesitarías una fecha o una comparación temporal. El orden de los ejemplos no da esa cronología.'],
  '8-5': ['first generation', 'La aparición de la cola curvada a lo largo del experimento no la sitúa en la primera generación. La afirmación fija un momento preciso que la descripción general de los cambios no resuelve.'],
  '8-36': ['always superior', 'El autor examina cómo se puede orientar una decisión. La frase le atribuye una preferencia universal por los incentivos conductuales frente a los enfoques clásicos. Un beneficio en un contexto no resuelve esa comparación para todos los contextos.'],
  '9-5': ['jenner', 'Que Jenner trabajara con James Phipps permite relacionar a ambos en el experimento. Ser participante y ser hijo del investigador son dos relaciones diferentes. La primera no establece ni descarta el parentesco.'],
  '9-34': ['all nordic countries', 'Una política activa de empleo y una renta básica universal son medidas diferentes. La afirmación exigiría datos de implantación y resultados de la segunda en cada país nórdico. El ejemplo regional de políticas de empleo no los proporciona.'],
  '10-3': ['main source', 'La ropa sintética es una posible fuente de partículas. Para llamarla la principal del mundo necesitas una clasificación que la compare con todas las demás. Que una fuente aparezca como ejemplo no le asigna ese puesto.'],
  '10-6': ['all consumer products', 'El texto identifica una prohibición relativa a los cosméticos. Guarda el límite de esa frase. Para decidir qué ocurre en todas las demás categorías haría falta información adicional sobre el alcance de la norma estadounidense.'],
  '10-31': ['successfully controlled', 'Se explica por qué se operó a H. M. y qué pasó con su memoria. El objetivo era controlar la epilepsia. Para decidir si lo consiguió necesitarías conocer el resultado sobre sus crisis, además del motivo de la intervención.'],
  '10-36': ['ultimately beneficial', 'El autor analiza qué funciones de la memoria pueden verse afectadas. La afirmación le atribuye un balance final favorable de las herramientas digitales. Se pueden estudiar mecanismos y riesgos sin emitir ese juicio global.'],
  '11-31': ['united states', 'La nacionalidad de los investigadores y la década de los experimentos ayudan a ubicarlos. El lugar donde se realizaron es otro dato. Una nacionalidad tampoco determina dónde llevó a cabo su trabajo una persona.'],
  '12-6': ['more economic value', 'El valor económico de los arrecifes incluye turismo, pesca y otros servicios. Para decidir si el turismo supera a la pesca necesitas comparar sus valores por separado. Un total agregado no permite saber cuál aporta más.'],
  '13-35': ['standard clinical treatment', 'Que se observen beneficios de un placebo administrado abiertamente no establece el acuerdo de la mayoría de los investigadores sobre convertirlo en tratamiento estándar. La afirmación pasa de un resultado a una recomendación colectiva.'],
  '14-34': ['first central bank', 'La fecha de fundación del Banco de Inglaterra sitúa una institución en el tiempo. Para asegurar que fue la primera del mundo hay que compararla con las fechas de las demás. Una sola fecha deja abierto ese orden.'],
  '15-33': ['entire transport sector', 'El sistema alimentario completo incluye actividades que van más allá de la ganadería. Una estimación para ese conjunto no da, por sí sola, la comparación entre las emisiones del ganado y las de todo el transporte.'],
  '16-5': ['any high-income country', 'Nombrar países con inversiones importantes permite reconocer ejemplos. La frase exige además que superen a cualquier país de ingresos altos en capacidad instalada. Para ese superlativo haría falta una clasificación comparable.'],
  '17-34': ['all forms', 'El sesgo hacia el presente puede intervenir en decisiones financieras. La afirmación le atribuye el papel de causa principal en todas las formas de irresponsabilidad. Identificar un mecanismo no basta para establecer esa jerarquía en todos los casos.'],
  '18-35': ['academic performance', 'Comparar aspectos concretos del desarrollo lingüístico no mide automáticamente el desempeño académico general. Para sostener “consistently” harían falta resultados escolares comparables y consistentes de ambos grupos.'],
  '20-34': ['majority of short-haul flights', 'El texto presenta el tren rápido como una alternativa con potencial. “Already replaced the majority” pide una cifra sobre vuelos que ya han sido sustituidos. Un proyecto o una posibilidad futura no aporta ese resultado.'],
};

const contextualJudgements: Readonly<Record<string, Note>> = {
  '1-11': ['same principles', 'La clave es TRUE. El recorte presenta la baquelita y su importancia industrial. Para comprobar la continuidad del método, vuelve al pasaje completo y localiza el párrafo de la patente del 13 de julio de 1907. Su última frase comenta el uso actual de sus principios esenciales.'],
  '1-12': ['immediately welcomed', 'La palabra que decide FALSE es “immediately”. El recorte presenta la importancia posterior del invento. En el pasaje completo, busca el párrafo sobre su recepción comercial. Allí el rechazo de los primeros años precede a la popularidad.'],
  '1-13': ['limited range of colours', 'La clave es FALSE. El recorte trata de la preparación del material y de los objetos que podían fabricarse. Vuelve al párrafo sobre los consumidores para comprobar la variedad de tonos. Una gama de objetos, por sí sola, no indica cuántos colores había.'],
  '1-14': ['biologically important', 'Koestler llama a la risa un reflejo sin propósito biológico aparente. Atribuirle la idea de que cumple varias funciones biológicas importantes invierte esa valoración.'],
  '1-17': ['ignored aristotle', 'El texto dice que muchos teóricos modernos adoptan alguna versión de la idea de Aristóteles. Eso contradice que hayan ignorado en gran medida su planteamiento.'],
  '1-36': ['discovery of magnetism', 'El magnetismo sí aparece entre los avances. La preferencia atribuida por el autor recae en las nuevas teorías astronómicas. El punto que cambia la respuesta es el puesto de mayor importancia.'],
  '1-37': ['leading thinkers', 'La clave es YES. El recorte resume el papel del siglo XVII, pero la prueba de los dos intereses está en el párrafo sobre John Wilkins y John Wallis. Allí puedes comprobar la relación entre el trabajo científico y la forma de expresarlo.'],
  '2-8': ['industrial espionage', 'Concentrar artesanos en Murano podía facilitar la vigilancia, de modo que esa explicación parece plausible. La razón principal declarada fue evitar incendios. La frase convierte una ventaja secundaria en el motivo principal.'],
  '2-35': ['genuinely random', 'La rueda parecía producir números al azar a ojos de los participantes. Los investigadores controlaban los valores. La diferencia está entre la impresión de quienes participaban y el diseño real del experimento.'],
  '3-8': ['large armies', 'El valor de las ciudades-oasis se explica por servicios a las caravanas y conexiones con otras rutas. La afirmación les atribuye una explicación militar que el pasaje contrasta con esas ventajas.'],
  '5-31': ['laboratory setting', 'La investigación sobre la elección de mermeladas se realizó en un supermercado. Que fuera un experimento no implica que el lugar fuera un laboratorio.'],
  '7-4': ['from rain', 'El escarabajo obtiene agua de la niebla. La superficie del insecto sí coincide con la descripción, pero la frase cambia la procedencia del agua.'],
  '8-32': ['sell losing investments', 'El ejemplo describe conservar demasiado tiempo las inversiones que han perdido valor con la esperanza de recuperarlo. La frase les atribuye a esas mismas personas la decisión contraria, vender antes de la recuperación.'],
  '12-1': ['quarter of the total ocean floor', 'Fíjate en qué se está contando. Cerca de una cuarta parte se refiere a las especies marinas que sustentan los arrecifes. La superficie del fondo oceánico que ocupan es inferior al uno por ciento. Cambiar especies por superficie hace que la frase sea FALSE.'],
  '15-35': ['drought-resistant', 'Las variedades resistentes a la sequía aparecen entre las vías para mantener el rendimiento agrícola. “One technical solution” conserva ese alcance. La afirmación no promete que una única variedad resuelva por sí sola la inseguridad alimentaria.'],
  '19-31': ['permafrost', 'Los dos ejemplos muestran una amenaza que ya existía y se agrava. En la costa se acelera la erosión y, en las zonas de suelo congelado, el deshielo pone en peligro materiales que el frío había conservado.'],
  '2-7': ['invented in venice', 'El soplado de vidrio aparece por primera vez en el Mediterráneo oriental. Venecia entra en el relato más tarde. Una ciudad importante para el desarrollo de una técnica puede ser distinta de su lugar de invención.'],
  '2-14': ['one third', 'La cifra cercana a un tercio pertenece al conjunto de polinizadores animales y a una medida de producción agrícola. La afirmación se la asigna solo a las abejas y la convierte en una proporción de todo el suministro de alimentos.'],
  '2-34': ['only been applied', 'Los modelos de elección racional aparecen en la economía y se extienden a otros campos. La palabra “only” excluiría precisamente los usos que el pasaje añade.'],
  '2-37': ['majority of everyday', 'El texto reserva el razonamiento deliberado del sistema 2 para tareas que requieren esfuerzo. En las decisiones cotidianas predomina el sistema 1. La afirmación atribuye esa frecuencia al otro sistema.'],
  '3-6': ['single, well-defined', 'El nombre singular puede inducir a error. El pasaje describe una red cambiante de rutas marítimas y terrestres. Una sola carretera con límites bien definidos no recoge esa descripción.'],
  '3-14': ['fully understand', 'Los daños ya documentados conviven en el pasaje con preguntas abiertas sobre los efectos de la contaminación. “Fully” eliminaría esa incertidumbre expresada por los investigadores.'],
  '3-16': ['entirely made up', 'En la zona se acumulan objetos grandes y fragmentos pequeños. Estos últimos bastan para contradecir “entirely”, aunque sí haya objetos grandes entre los residuos.'],
  '3-34': ['always outperform', 'La comparación favorable a algunos sistemas se limita a determinadas tareas y pruebas. “Always” extendería esos resultados a todos los usos y especialistas. El pasaje explica expresamente los límites de esa comparación.'],
  '3-37': ['not yet approved', 'El texto ya describe dispositivos que han recibido autorización regulatoria. Una sola autorización basta para contradecir la afirmación de que todavía no existe ninguna.'],
  '4-1': ['more hours', 'Busca “subsistence farmers” en el segundo párrafo y lee unas palabras hacia atrás. Para conseguir su alimento, los cazadores-recolectores dedicaban “fewer hours per day” que los agricultores de subsistencia. La pregunta compara a esos mismos grupos, pero dice “more hours”. Ese cambio de menos a más te permite marcar False.'],
  '4-3': ['modern-day china', 'El texto sitúa el Creciente Fértil en un arco que incluye territorios actuales como Irak y Siria. La descripción geográfica propuesta en la pregunta lo traslada a otra parte de Asia.'],
  '4-5': ['taller and healthier', 'La evidencia de los esqueletos apunta a una menor estatura media y a problemas de salud entre los primeros agricultores. La afirmación invierte las dos características que se comparan con sus predecesores.'],
  '4-28': ['regardless of the energy source', 'La comparación de emisiones del ciclo de vida depende, entre otras cosas, de dónde procede la electricidad. “Regardless” borra una condición que el pasaje considera relevante.'],
  '4-29': ['already in widespread', 'El pasaje describe la tecnología de estado sólido como una posibilidad en desarrollo. La disponibilidad comercial generalizada sería un estado posterior que el texto sitúa todavía fuera de su alcance.'],
  '4-31': ['fewer barriers', 'El texto destaca las dificultades de infraestructura y adopción en zonas rurales y economías en desarrollo. La pregunta cambia esa desventaja por una supuesta facilidad relativa.'],
  '5-1': ['confirmed by archaeologists', 'Kaldi aparece dentro de una leyenda sobre el origen del café. Ese carácter legendario es incompatible con presentarlo aquí como una figura que la arqueología ya ha confirmado.'],
  '5-4': ['several decades', 'El texto describe la prohibición de 1511 como breve. La fecha y la ciudad coinciden con la pregunta, pero “several decades” cambia su duración.'],
  '5-7': ['successfully prevented', 'El Imperio otomano intentó controlar la salida de semillas. La posterior expansión del cultivo muestra el límite de ese intento. El adverbio “successfully” convierte una política en un resultado que no obtuvo.'],
  '5-35': ['restricting choice completely', 'La intervención descrita cambia la forma de presentar las opciones y conserva la libertad de elegir. Suprimir toda posibilidad de elección sería una intervención diferente.'],
  '6-2': ['sole inventor', 'Cai Lun recibe crédito por perfeccionar la técnica. Los indicios de formas de papel anteriores impiden presentarlo como inventor único. El cambio se concentra en “sole”.'],
  '6-33': ['fully approved', 'El relato distingue la propuesta de directiva de su aprobación e implementación. La afirmación sitúa los dos últimos pasos antes de 2022, cuando el texto aún los presenta como pendientes en ese momento.'],
  '6-35': ['reliably capture', 'Las estadísticas laborales oficiales están diseñadas para relaciones de empleo tradicionales y dejan sin contar parte del trabajo por encargo. De ahí que no puedan medir con fiabilidad la totalidad que afirma la pregunta.'],
  '7-7': ['mathematically optimal', 'Los críticos describen soluciones suficientemente buenas dentro de límites históricos y materiales. Atribuirles la idea de un óptimo matemático garantizado invierte la objeción que formulan.'],
  '7-31': ['specific colour terms', 'El ejemplo del pirahã ilustra la ausencia o escasez de términos cromáticos específicos. No confundas esa lengua con el ejemplo cercano de una que distingue varias categorías para el azul.'],
  '7-33': ['definitively caused', 'La habilidad de orientación se observa junto con el uso de direcciones cardinales. El texto mantiene abierta la cuestión causal. El enunciado presenta como demostrada la causa que el pasaje califica expresamente.'],
  '8-2': ['universally accepted', 'Las pruebas genéticas admiten hipótesis que compiten sobre el momento y las poblaciones implicadas. La frase atribuye a los investigadores un acuerdo universal que el pasaje describe como pendiente.'],
  '8-4': ['physical appearance', 'La selección se hizo atendiendo al comportamiento de los zorros. Los cambios físicos aparecieron a lo largo de las generaciones. La frase convierte un resultado observado en el criterio inicial de selección.'],
  '8-35': ['overestimate future rewards', 'El sesgo hacia el presente da mayor peso a la recompensa inmediata y descuenta la futura. El enunciado invierte las dos posiciones de esa comparación.'],
  '9-2': ['first practised', 'En la secuencia que presenta el pasaje, la práctica ya se conocía en China antes del episodio otomano. El enunciado recorre los mismos lugares en el orden contrario.'],
  '9-4': ['higher than', 'El texto reconoce el riesgo de la variolización y lo compara con un riesgo mayor al contraer la viruela de forma natural. La afirmación invierte los términos de esa comparación.'],
  '9-6': ['already been established', 'El trabajo de Jenner precede al establecimiento de la teoría microbiana. “Already” colocaría esa explicación científica antes de la publicación de sus hallazgos.'],
  '9-31': ['more resistant', 'Las tareas cognitivas rutinarias figuran entre las que resultan más fáciles de automatizar. Algunas tareas físicas no rutinarias ofrecen más resistencia. La frase cambia qué grupo presenta la mayor dificultad.'],
  '9-32': ['production workers', 'El pasaje destaca el efecto de la IA generativa en trabajos cognitivos y profesionales. La afirmación desplaza ese impacto principal a los trabajadores de producción industrial.'],
  '10-32': ['new motor skills', 'El caso de H. M. distingue la formación de recuerdos explícitos del aprendizaje de destrezas motoras. Sus dificultades con la primera capacidad no le impidieron mejorar en tareas de la segunda.'],
  '10-33': ['primarily supported', 'El texto distingue la memoria procedimental de los nuevos recuerdos episódicos y señala que puede funcionar en gran medida con independencia del hipocampo. La pregunta le asigna al hipocampo el papel principal en la memoria procedimental.'],
  '10-35': ['always an accurate record', 'La memoria colectiva se construye y puede cambiar al transmitirse. El pasaje describe justamente las distorsiones que la palabra “always” descartaría.'],
  '11-1': ['above ground', 'La mayor parte del recorrido del Aqua Appia era subterránea. Evita trasladarle la imagen de los arcos elevados que se asocian a otros acueductos.'],
  '11-3': ['mechanical pumps', 'El pasaje explica el flujo por gravedad y por el diseño de la pendiente. La frase atribuye ese mismo movimiento a bombas mecánicas.'],
  '11-5': ['private water connections', 'Una fuente pública daba acceso al agua de un modo distinto de una conexión privada. El texto reserva las conexiones privadas a una parte de la población. “All” extiende ese privilegio a todos.'],
  '11-33': ['lower levels of formal education', 'El texto describe sesgos que también afectan a personas con formación y cuestiona su supuesta concentración en quienes recibieron menos educación. La afirmación establece esa diferencia entre grupos.'],
  '11-35': ['eliminate cognitive biases', 'Modificar cómo se presenta una decisión puede cambiar la conducta. Eso es diferente de eliminar el sesgo que influye en ella. La afirmación le atribuye a la intervención el efecto más fuerte.'],
  '12-3': ['five degrees', 'Según el texto, incluso un aumento sostenido menor puede desencadenar el blanqueamiento. La pregunta convierte cinco grados en un mínimo necesario. Comprueba el aumento respecto de la temperatura habitual y cuánto tiempo se mantiene.'],
  '12-34': ['more harmful than', 'La distinción del pasaje es entre la comunicación activa con otras personas y el consumo pasivo de contenido. La afirmación presenta como más perjudicial la actividad que el texto asocia a resultados comparativamente más favorables.'],
  '12-36': ['sufficient financial incentive', 'El modelo financiero descrito recompensa la participación en la plataforma. El autor presenta una tensión con el bienestar de los usuarios. La afirmación presupone que el incentivo comercial ya resuelve ese conflicto.'],
  '13-1': ['including antarctica', 'La expansión humana descrita en el pasaje deja fuera la Antártida. El origen en África coincide, pero la última parte del enunciado incluye precisamente la excepción.'],
  '13-3': ['more than half', 'El total incluye a quienes permanecen desplazados dentro de su propio país. El pasaje señala que estos constituyen la mayor parte. La pregunta atribuye esa mayoría a quienes cruzaron una frontera.'],
  '13-4': ['fully protected', 'En la explicación del pasaje, el desplazamiento por causas climáticas plantea una laguna de protección. La afirmación sustituye esa cobertura incompleta por protección plena bajo la convención citada.'],
  '13-6': ['always experience', 'El pasaje distingue el efecto global de la migración y el efecto particular sobre quienes compiten por los mismos empleos. Estos últimos pueden afrontar presión salarial, de modo que un aumento garantizado para todos contradice el matiz.'],
  '13-32': ['no role', 'El texto nombra el condicionamiento clásico como uno de los mecanismos que pueden contribuir al efecto placebo. Afirmar que no desempeña ningún papel excluye ese mecanismo expresamente descrito.'],
  '13-33': ['ineffective', 'La investigación citada comunica mejorías en ciertos ensayos de placebo abierto, incluido el dolor lumbar crónico. La afirmación atribuye al investigador un resultado de ineficacia que va en sentido contrario.'],
  '14-1': ['white defendants', 'El estudio citado describe más falsos positivos de alto riesgo para los acusados negros. La pregunta conserva el error de clasificación, pero intercambia los grupos comparados.'],
  '14-4': ['all major world powers', 'El texto presenta la prohibición internacional como objeto de debate entre países. La frase transforma ese desacuerdo en un tratado que todas las grandes potencias ya habrían firmado.'],
  '14-7': ['legally binding', 'El pasaje distingue las directrices voluntarias de las obligaciones que pueden hacerse cumplir legalmente. La pregunta asigna a esas directrices el mecanismo que el texto identifica como ausente.'],
  '14-32': ['pure gold', 'La composición que se da para las primeras monedas lidias es una aleación de oro y plata. Que contengan oro es cierto, pero “exclusively” impide aceptar una mezcla.'],
  '14-36': ['replaced conventional', 'El texto expone limitaciones para el uso de criptomonedas como dinero corriente. La afirmación supone una sustitución mayoritaria ya realizada, en contraste con el grado de adopción descrito.'],
  '15-1': ['historically understood', 'El pasaje contrapone una concepción histórica del sueño como estado pasivo con la explicación moderna de su actividad. La afirmación coloca la explicación moderna en el momento anterior.'],
  '15-2': ['during rem sleep', 'Busca en qué fase sitúa el texto la liberación de hormona de crecimiento. El ejemplo pertenece al sueño profundo de ondas lentas. La frase lo traslada a la fase REM.'],
  '15-5': ['less reactive', 'El pasaje describe una respuesta emocional más intensa de la amígdala tras la privación de sueño. “Less” invertiría la dirección del efecto.'],
  '15-36': ['straightforward policy', 'El texto presenta el cambio alimentario como una posibilidad importante y políticamente delicada. La afirmación elimina esa dificultad y además lo presenta como una medida que la mayoría de los gobiernos ya ha aplicado.'],
  '16-2': ['single major', 'El pasaje reúne varias causas para el descenso del coste solar. La afirmación concentra esa explicación en un solo descubrimiento decisivo. Busca la combinación que describe el autor antes de aceptar la palabra “single”.'],
  '16-7': ['already widely used', 'El hidrógeno verde se presenta como una posibilidad para sectores difíciles de descarbonizar, con obstáculos para su adopción. “Already widely used” convertiría esa posibilidad en una práctica generalizada actual.'],
  '16-34': ['only the top one percent', 'En la distribución analizada por Milanovic hubo ganancias en la parte media mundial y también en el extremo superior. Un solo grupo adicional beneficiado basta para descartar “only”.'],
  '16-35': ['complete disappearance', 'El pasaje recoge la persistencia y adaptación de prácticas locales junto a influencias globales. La desaparición completa eliminaría precisamente esa coexistencia.'],
  '17-3': ['equally sensitive', 'El efecto de una variación del pH cambia entre grupos de plancton. La pregunta dice que todas las especies tienen la misma sensibilidad. La existencia de diferencias entre grupos contradice esa igualdad.'],
  '17-7': ['fully reverse', 'El texto distingue posibles efectos locales de una solución a escala del océano. La afirmación convierte una intervención costera en una reversión completa de un fenómeno global.'],
  '17-33': ['total accumulated wealth', 'La teoría prospectiva sitúa las ganancias y pérdidas respecto de un punto de referencia. Considerar únicamente la riqueza total eliminaría ese punto de comparación, que es esencial para la explicación.'],
  '17-36': ['conservative political', 'Entre las críticas aparecen problemas de medición, replicación y generalización de resultados. La frase atribuye una única motivación política a todos los críticos, aunque el autor expone motivos metodológicos distintos.'],
  '18-3': ['disappointing results', 'En la presentación del pasaje, los ensayos citados ofrecen resultados favorables. La pregunta conserva la enfermedad y la intervención, pero invierte cómo se valoran sus resultados.'],
  '18-6': ['approved by all', 'El relato describe condena y problemas de supervisión tras el experimento. Presentarlo como una intervención aprobada por todos los organismos reguladores cambia la respuesta institucional que se cuenta.'],
  '18-31': ['all leading researchers', 'El pasaje presenta la explicación nativista junto a otras teorías y describe un debate abierto. La coexistencia de explicaciones rivales contradice el consenso universal que afirma la pregunta.'],
  '18-33': ['every unfamiliar sound', 'A medida que se especializan en los contrastes de las lenguas que oyen, los bebés pierden sensibilidad a algunos contrastes poco familiares. La afirmación convierte esa especialización en una mejora para todos los sonidos desconocidos.'],
  '19-3': ['light is accelerated', 'La lente gravitatoria se reconoce por la desviación o distorsión de la luz. La afirmación pide medir cuánto se acelera. Detectar un cambio en la trayectoria y medir un aumento de velocidad son operaciones diferentes.'],
  '19-5': ['confirmed detections', 'El pasaje presenta los experimentos subterráneos como búsquedas sin detección confirmada en el relato. La existencia del detector o de límites experimentales no equivale a haber identificado las partículas.'],
  '19-7': ['first proposed', 'El observatorio lleva el nombre de Vera Rubin por sus mediciones de galaxias y su aportación a la evidencia. La afirmación confunde aportar esas mediciones con haber propuesto por primera vez la idea de la materia oscura.'],
  '19-34': ['same legal', 'El texto señala que varían los antecedentes y las circunstancias de cada objeto. “Every” y “the same” borrarían las diferencias históricas y legales que el autor considera importantes.'],
  '19-35': ['every material', 'Una reconstrucción digital permite conservar información y facilitar el acceso. El pasaje también identifica cualidades materiales y sociales que dependen del sitio físico. El término “every” incluiría esas cualidades que la reconstrucción pierde.'],
  '20-2': ['completely eliminate', 'En la explicación del texto, una parte de la población bacteriana sobrevive. La afirmación dice que desaparecen todas las bacterias, lo que elimina justamente el grupo relevante para la explicación.'],
  '20-4': ['4.95 million', 'La cifra de 4,95 millones se refiere a muertes asociadas a la resistencia. El pasaje da otra cifra, aproximadamente 1,27 millones, para las directamente atribuibles. La pregunta conserva la primera cifra y le asigna la segunda relación.'],
  '20-5': ['increased their investment', 'El pasaje describe la retirada o disminución de la inversión de grandes empresas en esa investigación. La frase presenta un incremento mayoritario en el mismo periodo y cambia la dirección de la tendencia.'],
  '20-31': ['electrification alone', 'La electrificación es una vía que el autor considera importante, junto con otras decisiones sobre energía, infraestructura y movilidad. “Alone” elimina esas condiciones y le atribuye suficiencia por sí sola.'],
  '20-35': ['cost-competitive', 'La descripción del pasaje sitúa los combustibles alternativos en desarrollo, todavía sin escala ni precios competitivos. La pregunta da por alcanzadas las dos condiciones.'],
};

// These approved windows locate a topic or a repeated word. The actual relationship
// was checked against the full canonical passage and should be revisited there.
const contextOutsideWindow: Readonly<Record<string, Note>> = {
  '2-36': ['loss aversion', 'El destacado introduce a Kahneman y Tversky. Para comprobar el YES, vuelve al párrafo que explica la aversión a la pérdida. La comparación es entre una pérdida y una ganancia del mismo tamaño, y la pérdida puede pesar más en la decisión.'],
  '3-40': ['specified intended use', 'El destacado explica cómo se evalúa un modelo en la aplicación para la que fue diseñado. La pregunta pide identificar quién evalúa los productos. Vuelve al párrafo del pasaje sobre la responsabilidad y la supervisión de los organismos reguladores. Allí puedes comprobar la pareja con “regulatory agencies”.'],
  '4-37': ['solid-state batteries', 'El destacado emplea “energy density” al hablar de baterías de ion-litio. El hueco se refiere a las de estado sólido. Busca el párrafo que presenta su electrolito sólido. Allí aparecen juntos el aumento de la densidad energética y el posible tiempo de carga de diez minutos. El hueco se completa con “energy”.'],
  '11-23': ['during heat waves', 'El destacado compara cómo se enfrían el campo y la ciudad. Para comprobar la diferencia de mortalidad, vuelve al párrafo C, dedicado a las consecuencias sanitarias. Allí se compara a las ciudades con zonas rurales durante las olas de calor. El hueco requiere “rural”.'],
  '11-24': ['rising urban temperatures', 'En la ventana señalada, el aire acondicionado aparece entre las fuentes de calor residual. El ejercicio invierte la dirección de la pregunta. Busca en el párrafo D cómo el aumento de temperatura eleva la demanda de refrigeración. La expresión que completa esa relación es “air conditioning”.'],
  '12-26': ['popular netflix', '“Series” aparece en el destacado con el sentido de una sucesión de campeones. El hueco pide una producción televisiva. Vuelve al párrafo G, donde se menciona Netflix y se explica cómo una serie acercó el ajedrez a otro público. La palabra coincide, pero allí tiene el sentido que necesitas.'],
  '13-34': ['perceived cost', 'El destacado presenta el papel de las expectativas en la respuesta a un tratamiento. Para comprobar el YES de esta afirmación concreta, busca el párrafo que trata el contexto del encuentro terapéutico, incluidos el color y el precio percibido. El juicio se refiere a su posible influencia sobre la percepción del efecto.'],
  '15-24': ['deficits remain', 'La ventana menciona infraestructura limitada en algunas ciudades. Para justificar el hueco con su relación completa, localiza el párrafo E. Allí se presentan los déficits de infraestructura y la dificultad de ofrecer servicios al ritmo del crecimiento. “Infrastructure” modifica a “deficits”.'],
  '16-25': ['early adversity', 'En el destacado, “developmental” describe a los psicólogos que estudian las etapas del desarrollo. Busca en el párrafo F qué resultados se asocian con experiencias adversas. En la frase del ejercicio “developmental” califica los resultados de los niños, no a los investigadores.'],
  '17-13': ['tackling ocean acidification', 'El destacado describe el dióxido de carbono que ya absorbieron los océanos. La pregunta pide la medida de mitigación. Ve al párrafo final que habla de reducir las emisiones a escala mundial. La expresión que identifica el gas es “carbon dioxide”.'],
  '18-6': ['approved by all', 'El destacado identifica una tecnología del pasaje. La cuestión que se juzga es de aprobación institucional. En el párrafo final sobre supervisión, comprueba cómo se recibió el experimento de He Jiankui. La reacción que se describe contradice el supuesto respaldo de todos los organismos, así que corresponde FALSE.'],
  '18-8': ['directs the cas9', 'En el destacado aparece la palabra “guide” en un contexto más general. Revisa en el pasaje el párrafo que describe el ARN mencionado en la pregunta y fíjate en el nombre compuesto del texto inglés. La palabra que precede a “RNA” en este hueco es “guide”.'],
  '18-23': ['european programmes', 'El destacado asocia gobernanza y tecnología en la experiencia de Singapur. El enunciado pregunta por programas europeos y participación ciudadana. El párrafo C coloca esos dos datos al lado de la gobernanza de los datos. Por eso el hueco se completa con “governance”.'],
  '18-24': ['interconnected digital systems', 'La ventana menciona la ciberseguridad dentro de una lista de costes. La pregunta pide identificar un riesgo de los sistemas conectados. Ve al párrafo E y localiza la descripción de ese riesgo. La palabra que lo nombra es “cybersecurity”.'],
  '18-40': ['persistent difficulty', 'El destacado de esta pregunta contiene únicamente el título del pasaje. Para comprobar el nombre del trastorno, vuelve al párrafo final, donde se describe una dificultad persistente del desarrollo lingüístico. En “developmental ___ disorder” la palabra que falta es “language”.'],
  '19-9': ['distortion of distant light', 'La ventana menciona el fenómeno al enumerar varias líneas de evidencia. Ve al párrafo que explica qué ocurre con la luz de objetos distantes. Allí se desarrolla el término “gravitational lensing”. El ejercicio ya aporta “gravitational”, así que basta “lensing”.'],
  '19-25': ['electronic monitoring', 'En el destacado se habla de almacenes desde el punto de vista de la huella ambiental. La pregunta se refiere a la vigilancia y a las lesiones de los trabajadores. Vuelve al párrafo F sobre condiciones laborales. Allí los lugares que se someten a ese examen son “warehouses”.'],
  '20-11': ['in 2024', 'El destacado utiliza “reduce” al hablar del uso de antibióticos en hospitales. El enunciado se refiere a un objetivo internacional de 2024. Ve al párrafo sobre coordinación entre países y encuentra el verbo asociado a las muertes y a la meta del diez por ciento. Ese verbo es “reduce”.'],
  '20-12': ['through trade', 'La ventana se refiere a reservorios ambientales. El hueco pregunta por los flujos que acompañan a las otras dos vías mencionadas, comercio y viajes. Vuelve al párrafo sobre coordinación internacional y comprueba la palabra que describe dichos flujos, “environmental”.'],
};

const commonWords = new Set('a an and are as at be been being by can do does for from has have in into is it its of on or that the their them there they this to was were what which who will with would'.split(' '));

function englishWords(value: string): string[] {
  return normalizeIeltsGuidedAnswer(value).match(/[\p{L}\p{N}]+(?:['-][\p{L}\p{N}]+)*/gu) ?? [];
}

function optionBody(option: string) {
  return option.replace(/^[A-Z]\s*·\s*/iu, '').trim();
}

function resolveOption(item: IeltsGuidedObjectiveItem, submitted: string) {
  const answer = normalizeIeltsGuidedAnswer(submitted);
  if (!answer) return '';
  const option = item.options?.find(value => [value, optionBody(value), value.split(' · ')[0]].some(
    form => normalizeIeltsGuidedAnswer(form) === answer,
  ));
  return option ? optionBody(option) : submitted.trim();
}

function judgementOf(value: string): Judgement | undefined {
  const state = optionBody(value).toUpperCase();
  if (state === 'TRUE' || state === 'FALSE' || state === 'YES' || state === 'NO' || state === 'NOT GIVEN') return state;
  return undefined;
}

function questionFocus(item: IeltsGuidedObjectiveItem) {
  if (item.questionType === 'mcq' || item.questionType === 'dialog' || item.questionType === 'multiselect' || /^Choose the correct answer\.|^Selecciona una de/u.test(item.frame)) {
    return item.prompt.trim();
  }
  const frame = item.frame.replace(/^\s*\d+[.)]\s*/u, '').replace(/^_{2,}\s*:\s*/u, '').trim();
  if (!frame.includes('_____')) return frame;
  const sentence = frame.split(/(?<=[.!?])\s+|\n+/u).find(part => part.includes('_____')) ?? frame;
  return sentence.replaceAll('[respuesta]', '…').trim();
}

function formatFor(item: IeltsGuidedObjectiveItem, judgement: Judgement | undefined): Format {
  const instruction = item.prompt.toLowerCase();
  if (judgement) {
    const aboutViews = judgement === 'YES' || judgement === 'NO' || item.options?.some(option => judgementOf(option) === 'YES') ||
      /ynng/u.test(item.id) || /claims of the writer|views of the writer|write yes/u.test(instruction);
    return aboutViews ? 'yes-no-not-given' : 'true-false-not-given';
  }
  if (item.questionType === 'matching' || /-match(?:-|$)/u.test(item.id)) {
    if (/heading/u.test(instruction)) return 'matching-headings';
    if (/ending/u.test(instruction)) return 'matching-sentence-endings';
    if (/which paragraph|contains the following|paragraph [a-z]$/iu.test(instruction) || /^Paragraph [A-Z]$/u.test(optionBody(item.answer))) return 'matching-information';
    return 'matching-features';
  }
  if (item.kind === 'choice') return 'multiple-choice';
  if (/table/u.test(instruction) || item.questionType === 'tablegroup') return 'table-completion';
  if (/flow.?chart/u.test(instruction)) return 'flow-chart-completion';
  if (/diagram|label the/u.test(instruction)) return 'diagram-labeling';
  if (/notes/u.test(instruction)) return 'note-completion';
  if (/summary/u.test(instruction)) return 'summary-completion';
  if (/short.answer|answer the questions/u.test(instruction)) return 'short-answer';
  return 'sentence-completion';
}

/** Returns a contiguous span of the approved excerpt. Matching selects a reading cue, never a scoring key or a proof of absence. */
function evidenceCue(focus: string, question: string, desired: readonly string[]) {
  const terms = new Set(englishWords(question).filter(word => !commonWords.has(word)));
  const targets = desired.map(value => englishWords(value).join(' ')).filter(Boolean);
  const important = new Set(targets.flatMap(value => value.split(' ')).filter(word => !commonWords.has(word)));
  let best = '';
  let bestScore = Number.NEGATIVE_INFINITY;
  const sentences = focus.trim().split(/(?<=[.!?])\s+(?=[A-Z“‘(])|\n+/u);
  for (const sentence of sentences) {
    const clean = sentence.replace(/^…[^\s]*\s*/u, '').trim();
    const wordCount = englishWords(clean).length;
    if (!wordCount || (wordCount < 4 && sentences.length > 1)) continue;
    const clauses = clean.split(/(?<=[,;:])\s+|\s+[—–]\s+|\s+(?=(?:while|whereas|although|because|rather than|yet)\b)/u).filter(value => englishWords(value).length >= 4);
    const spans = wordCount <= 34 || !clauses.length ? [clean, ...clauses] : clauses;
    for (const span of spans) {
      const tokens = englishWords(span);
      const text = ' ' + tokens.join(' ') + ' ';
      let score = (span === clean ? 1 : 0) - Math.max(0, tokens.length - 12) * 0.05;
      for (const token of new Set(tokens)) {
        if (terms.has(token)) score += 1;
        if (important.has(token)) score += 2;
      }
      if (targets.some(target => text.includes(' ' + target + ' '))) score += 25;
      if (score > bestScore) { best = span; bestScore = score; }
    }
  }
  return (best || focus.trim()).replace(/^[.…]+\s*|[.,;:…]+$/gu, '').trim() || focus.trim();
}

function verifiedNote(notes: Readonly<Record<string, Note>>, at: string, question: string) {
  const note = notes[at];
  return note && normalizeIeltsGuidedAnswer(question).includes(note[0]) ? note[1] : '';
}

function judgementFeedback(
  item: IeltsGuidedObjectiveItem, submitted: string, correct: boolean, at: string,
  judgement: Judgement, format: Format, question: string,
) {
  const cue = evidenceCue(item.evidence.focus, question, []);
  const view = format === 'yes-no-not-given';
  const chosen = judgementOf(resolveOption(item, submitted));
  const prefix = view ? 'La postura que debes comprobar' : 'La afirmación que debes comprobar';
  let reason: string;
  if (judgement === 'NOT GIVEN') {
    const missing = verifiedNote(openClaims, at, question) || `Para resolver «${question}» hace falta un dato que el pasaje deja abierto.`;
    reason = `${missing} La clave es NOT GIVEN. «${cue}» te sitúa en el tema. Para comprobar qué queda abierto, revisa también el resto del pasaje.`;
  } else {
    const specific = verifiedNote(contextualJudgements, at, question);
    const same = judgement === 'TRUE' || judgement === 'YES';
    const verdict = same
      ? (view ? 'la afirmación mantiene la postura expresada por el autor' : 'la afirmación conserva la relación que describe el texto')
      : (view ? 'la afirmación le atribuye al autor una postura incompatible' : 'la afirmación cambia una relación que el texto sí establece');
    const qualifier = question.match(/\b(?:only|always|immediately|never|all|primarily|most|at least|more than|fewer than|before|after|first|entirely|exclusively|more likely|less likely|approximately|can|may)\b/iu)?.[0];
    const detail = qualifier ? ` Al comparar las frases, conserva el alcance que introduce «${qualifier}».` : '';
    const explicitAnswer = specific && !/\b(?:TRUE|FALSE|YES|NO)\b/u.test(specific) ? ` Por eso corresponde ${judgement}.` : '';
    reason = specific
      ? `${specific}${explicitAnswer} En el fragmento destacado puedes localizar «${cue}».`
      : `${prefix} es «${question}». Localiza «${cue}» y relee la frase completa en el destacado. La clave es ${judgement} porque ${verdict}.${detail}`;
  }
  let retry: string;
  if (judgement === 'NOT GIVEN') {
    retry = !correct && (chosen === 'FALSE' || chosen === 'NO')
      ? 'Para sostener tu elección tendría que aparecer el dato contrario. Busca esa oposición concreta antes de decidir que una afirmación es falsa o que el autor la rechaza.'
      : 'Vuelve a la afirmación y formula la pregunta que quedó sin respuesta. Puedes reconocer todo el vocabulario de una frase y seguir sin saber si el texto la sostiene.';
  } else if (chosen === 'NOT GIVEN' && !correct) {
    retry = `Tu elección dejaría el asunto abierto. Vuelve a «${cue}» y lee alrededor para comparar ${view ? 'lo que el autor afirma y lo que le atribuye la pregunta' : 'el sujeto y la relación en las dos frases'}.`;
  } else {
    retry = view
      ? 'Indica primero quién sostiene la idea. Después lee la afirmación como si el autor la pronunciara y comprueba si mantiene la misma postura y el mismo grado de certeza.'
      : 'Pon las dos afirmaciones una junto a la otra. Señala qué dice cada una del mismo sujeto y conserva la cantidad, el momento y el sentido de la comparación.';
  }
  return { reason, retry };
}

function quotedInput(value: string) {
  return value.length > 100 ? 'tu respuesta' : `«${value}»`;
}

function textLimit(item: IeltsGuidedObjectiveItem) {
  const printed = /\b(one|two|three|four|\d+)\s+words?\b/iu.exec(item.prompt)?.[1].toLowerCase();
  const counts: Record<string, number> = { one: 1, two: 2, three: 3, four: 4 };
  return printed ? counts[printed] ?? Number(printed) : item.maxWords;
}

function completionFeedback(item: IeltsGuidedObjectiveItem, submitted: string, correct: boolean, format: Format, question: string) {
  const sourceWords = ' ' + englishWords(item.evidence.focus).join(' ') + ' ';
  const literal = [item.answer, ...item.accepted].find(value => sourceWords.includes(' ' + englishWords(value).join(' ') + ' '));
  const cue = evidenceCue(item.evidence.focus, question, literal ? [literal] : [item.answer]);
  const rebuilt = question.replace(/_{2,}/u, item.answer);
  const location = /^Paragraph (\d+|[A-Z])$/u.exec(item.evidence.paragraph ?? '')?.[1];
  const where = location ? `en el párrafo ${location}` : 'en el texto';
  let reason: string;
  if (format === 'table-completion') {
    reason = `Lee la casilla con sus encabezados. Al completarla queda «${rebuilt}». Busca ${where} «${cue}» y comprueba a qué fila y columna pertenece «${item.answer}».`;
  } else if (format === 'diagram-labeling' || format === 'flow-chart-completion') {
    reason = `El rótulo queda «${rebuilt}». La pista ${where} es «${cue}». ${format === 'diagram-labeling' ? 'Sigue la línea del dibujo hasta su punta' : 'Lee también el paso que precede al hueco'} para ver a qué parte corresponde «${item.answer}».`;
  } else if (format === 'short-answer' || !question.includes('_____')) {
    reason = `La pregunta es «${question}». Localiza ${where} «${cue}». La respuesta aceptada es «${item.answer}». Lee la oración de origen para comprobar a quién o a qué se refiere esa expresión.`;
  } else {
    reason = `Al completar el hueco obtienes «${rebuilt}». Puedes volver a «${cue}» ${where} para comprobar de qué habla «${item.answer}» y cómo encaja en la frase del ejercicio.`;
  }

  const limit = textLimit(item);
  const entered = submitted.trim();
  const units = entered.split(/\s+/u).filter(Boolean).length;
  const numericAllowance = /number/iu.test(item.prompt) && /\d/u.test(entered);
  let retry: string;
  if (!correct && limit && units > limit && !numericAllowance) {
    retry = `Escribiste ${units} palabras y la consigna admite ${limit === 1 ? 'una' : limit}. Conserva la parte que completa el hueco y deja fuera las palabras que el ejercicio ya imprime.`;
  } else if (!correct && entered) {
    const occurs = sourceWords.includes(' ' + englishWords(entered).join(' ') + ' ');
    retry = occurs
      ? `${quotedInput(entered)} sí aparece en la lectura. Colócala en la misma casilla que «${item.answer}» y comprueba si mantiene el referente y la forma que pide la pregunta.`
      : `Prueba a localizar ${quotedInput(entered)} en la oración de origen. Compárala con «${item.answer}», incluida su ortografía, y vuelve a leer el hueco completo.`;
  } else if (format === 'summary-completion' || format === 'note-completion') {
    retry = 'Tapa la respuesta y lee también la línea siguiente. Usa la relación entre ambas líneas para volver al mismo punto del pasaje sin depender de una palabra repetida.';
  } else if (format === 'table-completion') {
    retry = 'Antes de copiar otro valor, di en voz baja el nombre de la fila y el de la columna. Una cifra o palabra verdadera puede pertenecer a la casilla de al lado.';
  } else {
    retry = 'Lee todo el enunciado con tu respuesta puesta. Comprueba la palabra anterior, la siguiente y el límite impreso antes de pasar al próximo hueco.';
  }
  return { reason, retry };
}

function groupFeedback(item: IeltsGuidedObjectiveItem, submitted: string, correct: boolean, at: string, question: string) {
  const group = item.scoringGroup!;
  const resolved = resolveOption(item, submitted);
  const input = normalizeIeltsGuidedAnswer(submitted);
  const isValidTarget = group.targets.some(target => target.includes(input));
  const groupAnswers = group.targets.map(target => optionBody(target.find(value => value.includes(' · ')) ?? target[0]));
  const cue = evidenceCue(item.evidence.focus, question, groupAnswers);
  let reason = `Se puntúan ${group.targets.length} respuestas distintas y el orden es libre. El conjunto aceptado es «${group.displayAnswer.replace(/\s*\(en cualquier orden\)\s*$/iu, '')}». Usa «${cue}» para localizar la idea y comprueba cada respuesta en el pasaje antes de dar el grupo por cerrado.`;
  if ((at === '1-9' || at === '1-10') && /bakelite/iu.test(question) && /mould/iu.test(group.displayAnswer)) {
    reason = `La pregunta pide dos condiciones del molde. El objeto tenía que salir sin quedarse atrapado y la resina debía poder llenar el molde. En «${cue}» puedes ubicar el diseño del molde. La explicación del flujo de la resina continúa en el párrafo siguiente del pasaje. B y C puntúan en cualquier orden.`;
  }
  const retry = !correct && isValidTarget
    ? `${quotedInput(resolved)} pertenece al conjunto. Comprueba las otras casillas del grupo. Repetir una misma respuesta válida solo puede aportar un punto.`
    : item.kind === 'choice'
      ? 'Vuelve a cada opción por separado y localiza un apoyo para cada una. Después comprueba que has elegido el número pedido de opciones diferentes.'
      : 'Relee la frase con las dos expresiones y comprueba que cada una aporta una idea distinta. Puedes intercambiarlas entre las casillas de este grupo.';
  return { reason, retry };
}

function selectionFeedback(item: IeltsGuidedObjectiveItem, submitted: string, correct: boolean, format: Format, question: string) {
  const answer = optionBody(item.answer);
  const cue = evidenceCue(item.evidence.focus, question, [answer]);
  const chosen = resolveOption(item, submitted);
  let reason: string;
  let retry: string;
  switch (format) {
    case 'matching-information':
      reason = `El detalle que debes ubicar es «${question}». En ${answer.replace(/^Paragraph /u, 'el párrafo ')} encontrarás «${cue}». Lee la oración completa y comprueba qué ejemplo, comparación o explicación aporta al enunciado.`;
      retry = 'Antes de decidir la letra, vuelve a formular el detalle con un verbo. Un párrafo que menciona el mismo tema puede contar otra cosa sobre él.';
      break;
    case 'matching-sentence-endings':
      reason = `Con la terminación elegida, la idea completa es «${question.replace(/[.…]+$/u, '')} ${answer}». Relee «${cue}» en su contexto para comprobar que el final mantiene la relación que empezó antes del hueco.`;
      retry = 'Compara dos finales que encajen gramaticalmente. Nombra qué relación cambia entre ellos y señala la frase del pasaje que permite escoger.';
      break;
    case 'matching-features':
      reason = `La tarea te pide relacionar «${question}» con «${answer}». El punto de partida en la lectura es «${cue}». Fíjate en quién realiza la acción o qué rasgo se atribuye a cada opción cercana.`;
      retry = 'Vuelve a unir las dos mitades por el verbo. Un nombre que aparece al lado de un hallazgo puede corresponder a quien lo presenta y no a quien lo realizó.';
      break;
    case 'matching-headings':
      reason = `«${answer}» resume el sentido general del párrafo pedido en «${question}». Empieza por «${cue}», luego lee también el cierre y comprueba que el título abarca ambos momentos.`;
      retry = 'Busca una línea que tu segundo título favorito deje sin explicar. A veces el detalle más fácil de recordar ocupa solo una parte del párrafo.';
      break;
    default: {
      const asksWhy = /\b(?:why|purpose|reason)\b/iu.test(question);
      const asksWho = /\b(?:who|which group|whose|according to)\b/iu.test(question);
      reason = `La pregunta es «${question}». Vuelve a «${cue}» en el fragmento y compara el sentido completo con «${answer}». ${asksWhy ? 'Aquí tienes que conservar el motivo o propósito que pidió la pregunta.' : asksWho ? 'Comprueba que la opción atribuya la idea o el resultado a quien corresponde.' : 'La opción debe conservar la conclusión y el alcance que expresa el pasaje.'}`;
      retry = 'Antes de volver a las opciones, responde la pregunta con tus propias palabras. Después prueba cuál de ellas mantiene ese significado completo.';
    }
  }
  if (!correct && chosen) {
    const displayed = item.options?.some(option => optionBody(option) === chosen) ? `«${chosen}»` : quotedInput(chosen);
    retry = `Compara tu elección, ${displayed}, con «${answer}». ${retry}`;
  }
  return { reason, retry };
}

export function getReadingLearningFeedback(
  item: IeltsGuidedObjectiveItem, submitted: string, correct: boolean, setNumber: number,
): GuidedLearningFeedback | null {
  if (!submitted.trim() || !item.id.startsWith('reading-') || item.evidence.status !== 'approved-excerpt' || !item.evidence.focus.trim()) return null;
  const at = `${setNumber}-${item.number}`;
  const judgement = judgementOf(item.answer);
  const format = formatFor(item, judgement);
  const question = questionFocus(item);
  let feedback;
  if (item.scoringGroup) feedback = groupFeedback(item, submitted, correct, at, question);
  else if (judgement) feedback = judgementFeedback(item, submitted, correct, at, judgement, format, question);
  else if (item.kind === 'fill') feedback = completionFeedback(item, submitted, correct, format, question);
  else feedback = selectionFeedback(item, submitted, correct, format, question);
  const outside = verifiedNote(contextOutsideWindow, at, question);
  if (outside) {
    const cue = at === '18-6' && item.evidence.focus.includes('CRISPR-Cas9')
      ? 'CRISPR-Cas9'
      : evidenceCue(item.evidence.focus, question, item.kind === 'fill' && !judgement ? [item.answer] : []);
    feedback.reason = `${outside} En la ventana actual puedes localizar «${cue}».`;
  }
  return {
    ...feedback,
    link: {
      href: `/practica/ielts/reading/tipos-de-preguntas/${format}`,
      label: `Practicar ${formats[format]}`,
    },
  };
}
