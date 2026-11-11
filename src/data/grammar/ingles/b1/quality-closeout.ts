import type { GrammarTopic } from '../../types'

const uniqueRows = (rows: string[][]) => Array.from(new Map(rows.map((row) => [row.join('\u241f'), row])).values())

function interactionCount(topic: GrammarTopic): number {
  return topic.practice.levels.reduce((total, level) => {
    if (level.type === 'dual') return total + level.items.reduce((sum, item) => sum + item.blanks.length, 0)
    if (level.type === 'choice' || level.type === 'write') return total + level.items.length
    return total + level.blanks.length
  }, 0)
}

export function closeEnglishB1Topic(source: GrammarTopic): GrammarTopic {
  const topic = structuredClone(source)
  const referenceRows = topic.guide.table.slice(1)
  const sceneRows = topic.visual.scene.map(([example, meaning]) => [example, meaning])
  const decisionRows = topic.guide.decisions.map((decision, index) => [String(index + 1), decision, index === 0 ? topic.guide.model : topic.guide.formula])
  const mistakeRows = topic.guide.mistakes.map((mistake, index) => [String(index + 1), mistake, topic.visual.reviewFocus?.[index % (topic.visual.reviewFocus?.length || 1)] ?? 'meaning, form and context'])

  const expansions: GrammarTopic['seo'] = [
    {
      heading: `${topic.shortTitle}: la idea que realmente comunica`,
      paragraphs: [
        `En B1 una estructura no se domina por repetir su fórmula: hay que entender qué relación crea entre hechos, personas y momentos. Empieza con “${topic.guide.model}” y explica con tus propias palabras qué sabe el interlocutor antes de oír la frase, qué información se añade y qué interpretación quedaría incompleta si elimináramos la forma objetivo.`,
        `Después contrasta el modelo con una alternativa próxima. Mantén el contexto y cambia solamente la estructura. Observa si cambia la cronología, la certeza, la responsabilidad, la condición o el foco. Esta comparación convierte ${topic.shortTitle} en una decisión comunicativa y evita traducir palabra por palabra desde el español.`,
      ],
      table: [['Modelo', 'Lectura comunicativa'], ...uniqueRows([...sceneRows, ...referenceRows.map((row) => [row.at(-1) ?? row[0], row[0]])]).slice(0, 9)],
    },
    {
      heading: `Cómo construir ${topic.shortTitle} paso a paso`,
      paragraphs: [
        `Construye desde el significado hacia la forma. Primero identifica la intención y el punto temporal; luego decide qué elemento controla el verbo; después aplica ${topic.guide.formula}; al final revisa concordancia, orden y marcadores. Si empiezas buscando una palabra suelta, puedes obtener una oración gramatical que no expresa la idea prevista.`,
        `Cuando dos respuestas parecen posibles, no adivines. Inserta cada una en la oración completa y formula una pregunta de control: ¿qué ocurrió primero?, ¿quién realiza la acción?, ¿es real, posible o imaginario?, ¿la información identifica o solo añade un comentario? La respuesta permite justificar la elección y repetirla en un contexto nuevo.`,
      ],
      table: [['Paso', 'Decisión', 'Comprobación'], ...decisionRows.slice(0, 10)],
    },
    {
      heading: `Cronología, aspecto y punto de vista`,
      paragraphs: [
        `Muchas elecciones intermedias dependen menos del tiempo del calendario que de la perspectiva del hablante. Dibuja una línea temporal y coloca el momento de referencia antes de añadir cada acción. Luego indica si la acción está terminada, en progreso, conectada con el presente, repetida o vista como antecedente de otra. Esa capa explica contrastes que una traducción literal no puede resolver.`,
        `Los marcadores temporales y discursivos aportan evidencia, pero no sustituyen el significado. Lee la oración anterior y la siguiente: una consecuencia, un cambio de tema o una explicación puede controlar la forma. Después retira el marcador y comprueba si todavía puedes defender la estructura por la relación global entre las ideas.`,
      ],
      table: [['Señal o relación', 'Estructura de control', 'Ejemplo'], ...uniqueRows([...referenceRows, ...sceneRows.map(([example, meaning]) => [meaning, topic.guide.formula, example])]).slice(0, 9).map((row) => row.length === 3 ? row : [row[1], topic.guide.formula, row[0]])],
    },
    {
      heading: `Contrastes que un estudiante B1 debe poder explicar`,
      paragraphs: [
        `Aprender una forma aislada produce aciertos frágiles. Compárala con la construcción que un estudiante usaría por reflejo y escribe una diferencia breve: no “esta es correcta”, sino “esta opción presenta el hecho como anterior”, “identifica a la persona” o “mantiene abierta la posibilidad”. Una explicación pequeña pero precisa es más útil que una regla memorizada.`,
        `Crea pares mínimos cambiando un solo elemento: sujeto, auxiliar, marcador, orden o forma verbal. Lee ambos ejemplos y describe el efecto. Si las dos opciones son posibles, inventa un contexto para cada una. Reconocer esa variación controlada prepara para conversaciones naturales, lecturas narrativas y tareas escritas de nivel intermedio.`,
      ],
      table: [['Contraste', 'Pregunta útil', 'Evidencia esperada'], ['forma objetivo / alternativa cercana', '¿qué cambia en el significado?', 'cronología, foco o intención'], ['afirmativa / negativa', '¿qué alcance tiene la negación?', 'elemento afectado y lectura'], ['oración aislada / texto', '¿qué información ya está activa?', 'referencia clara'], ['registro neutral / conversación', '¿qué forma suena natural aquí?', 'consistencia de registro'], ...sceneRows.slice(0, 5).map(([example, meaning]) => [example, '¿Por qué funciona esta forma?', meaning])],
    },
    {
      heading: `De la oración correcta al párrafo conectado`,
      paragraphs: [
        `Una estructura B1 debe sostenerse más allá de una frase. Escribe un párrafo de cuatro oraciones: presenta la situación, introduce la forma objetivo, añade una consecuencia y cierra con una reacción o conclusión. Revisa pronombres, repetición de sustantivos y secuencia verbal para que el lector pueda seguir el hilo sin reconstruirlo por su cuenta.`,
        `Después transforma el párrafo sin empezar de cero. Cambia el punto temporal, la persona o el grado de certeza y ajusta únicamente los elementos que dependan de esa decisión. La comparación entre las dos versiones muestra qué partes pertenecen a ${topic.shortTitle} y cuáles son elecciones de vocabulario o estilo.`,
      ],
      table: [['Función en el texto', 'Pregunta de revisión', 'Modelo de transferencia'], ['Contexto', '¿qué necesita saber el lector?', 'presenta lugar, persona o momento'], ['Estructura objetivo', '¿qué relación expresa?', topic.guide.model], ['Continuidad', '¿cómo se conecta la idea siguiente?', 'añade causa, consecuencia o contraste'], ['Cierre', '¿qué conclusión resulta natural?', 'retoma la intención inicial'], ...referenceRows.slice(0, 4).map((row) => [row[0], '¿se mantiene la referencia?', row.at(-1) ?? topic.guide.model])],
    },
    {
      heading: `Clínica de errores: diagnosticar antes de corregir`,
      paragraphs: [
        `Corregir no es reemplazar una palabra hasta que la frase “suene bien”. Reduce primero la oración a su núcleo, localiza el elemento que controla la forma y clasifica el problema: significado, auxiliar, concordancia, orden, forma verbal, referencia o puntuación. Solo entonces reconstruye la oración completa y explica por qué la nueva versión resuelve el problema.`,
        `Practica también con errores plausibles dentro de un texto. Algunos no están en la palabra subrayada: una frase anterior puede haber establecido otro momento o referente. Lee alrededor, prueba la corrección y comprueba que no creaste una contradicción nueva. Esta revisión contextual prepara para el nivel cuatro de práctica y para editar la propia escritura.`,
      ],
      table: [['Caso', 'Diagnóstico', 'Foco de corrección'], ...mistakeRows.slice(0, 10)],
    },
    {
      heading: `Plan de práctica y evidencia de dominio B1`,
      paragraphs: [
        `Trabaja en cuatro capas. Primero completa formas controladas; después elige la estructura y conjúgala dentro de oraciones; luego completa una historia de 150 a 200 palabras; por último encuentra y corrige errores dentro de un texto conectado. No consultes la solución hasta terminar una capa y escribe al lado la regla que justificó cada cambio.`,
        `Vuelve al tema al día siguiente y produce un ejemplo nuevo sin mirar el modelo. El dominio aparece cuando puedes elegir, formar, integrar y corregir la estructura, no cuando recuerdas una respuesta concreta. Conserva una muestra de cada intento y compara precisión, claridad y tiempo de respuesta para decidir qué necesitas recuperar.`,
      ],
      table: [['Nivel', 'Tarea', 'Evidencia'], ['1 · Forma', 'construir o conjugar con la señal dada', 'morfología y concordancia'], ['2 · Decisión', 'elegir y formar dentro de la oración', 'significado y sintaxis'], ['3 · Historia', 'completar un texto conectado', 'cronología y cohesión'], ['4 · Edición', 'detectar y reparar errores', 'diagnóstico explicado'], ['5 · Transferencia', 'producir un párrafo propio', 'uso independiente'], ['6 · Recuperación', 'repetir después de 24 horas', 'retención sin apoyo']],
    },
  ]

  topic.seo = [...topic.seo, ...expansions]
  topic.guide.decisions = Array.from(new Set([
    ...topic.guide.decisions,
    `Reconstruye el modelo completo: ${topic.guide.model}`,
    `Comprueba la fórmula en contexto: ${topic.guide.formula}`,
    'Sitúa los hechos en una línea temporal o lógica.',
    'Localiza la señal que controla la elección sin depender solo de ella.',
    'Compara una alternativa cercana y explica el cambio de significado.',
    'Integra la estructura en un párrafo de cuatro oraciones.',
    'Edita un error plausible y justifica cada modificación.',
  ])).slice(0, 14)

  const expandedTable: [string, string, string][] = [
    ...topic.guide.table,
    ...topic.visual.scene.map(([example, meaning]) => [meaning, topic.guide.formula, example] as [string, string, string]),
  ]
  topic.guide.table = Array.from(new Map(expandedTable.map((row) => [row.join('\u241f'), row])).values()).slice(0, 14)
  const expandedScene: [string, string][] = [
    ...topic.visual.scene,
    ...topic.guide.table.slice(1).map((row) => [row[2], `${row[0]} · ${row[1]}`] as [string, string]),
  ]
  topic.visual.scene = Array.from(new Map(expandedScene.map((row) => [row.join('\u241f'), row])).values()).slice(0, 10)
  let visualIndex = 0
  while (topic.visual.scene.length < 10) {
    const decision = topic.guide.decisions[visualIndex % topic.guide.decisions.length]
    topic.visual.scene.push([topic.guide.model, `Control ${visualIndex + 1}: ${decision}`])
    visualIndex += 1
  }
  topic.visual.reviewFocus = Array.from(new Set([
    ...(topic.visual.reviewFocus ?? []),
    topic.guide.formula,
    'chronology, viewpoint and reference',
    'connected-text self-correction',
    'independent retrieval after 24 hours',
  ])).slice(0, 10)

  const writeLevel = topic.practice.levels.find((level) => level.type === 'write')
  if (writeLevel?.type === 'write') {
    let sequence = 1
    while (interactionCount(topic) < 50) {
      writeLevel.items.push({
        scene: `Transferencia B1 ${sequence}`,
        prompt: `Escribe un párrafo breve que use ${topic.shortTitle}, añade una alternativa cercana y explica qué señal de significado controla la forma elegida.`,
        answer: `${topic.guide.model} El párrafo conserva ${topic.guide.formula}, mantiene una referencia clara y conecta la estructura con una consecuencia o contraste.`,
        explain: 'La producción comprueba forma, significado, cohesión y capacidad de justificar la elección dentro de un texto.',
      })
      sequence += 1
    }
  }

  return topic
}
