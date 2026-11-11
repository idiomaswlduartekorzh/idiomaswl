import type { GrammarTopic } from '../types'

type FoundationLevel = 'a1' | 'a2' | 'b1'

const uniqueRows = (rows: string[][]) => Array.from(new Map(rows.map((row) => [row.join('\u241f'), row])).values())

function interactionCount(topic: GrammarTopic): number {
  return topic.practice.levels.reduce((total, level) => {
    if (level.type === 'dual') return total + level.items.reduce((sum, item) => sum + item.blanks.length, 0)
    if (level.type === 'choice' || level.type === 'write') return total + level.items.length
    return total + level.blanks.length
  }, 0)
}

export function closeGermanFoundationTopic(source: GrammarTopic, level: FoundationLevel): GrammarTopic {
  const topic = structuredClone(source)
  const referenceRows = topic.guide.table.slice(1)
  const sceneRows = topic.visual.scene.map(([example, meaning]) => [example, meaning])
  const decisionRows = topic.guide.decisions.map((decision, index) => [String(index + 1), decision, index === 0 ? topic.guide.model : topic.guide.formula])
  const mistakeRows = topic.guide.mistakes.map((mistake, index) => [String(index + 1), mistake, topic.visual.reviewFocus?.[index % (topic.visual.reviewFocus?.length || 1)] ?? 'forma, significado y orden'])
  const levelLabel = level.toUpperCase()

  const expansions: GrammarTopic['seo'] = [
    {
      heading: `${topic.shortTitle}: significado y función en una situación real`,
      paragraphs: [
        `En alemán no basta con sustituir palabras españolas. ${topic.shortTitle} organiza información, relaciones y orden dentro de la oración. Empieza por el modelo “${topic.guide.model}” y localiza qué elemento determina la forma: la persona, el caso, la posición del verbo, una preposición o la relación entre dos ideas.`,
        `Después compara el modelo con una alternativa cercana. Conserva el vocabulario y cambia solamente la estructura. Explica qué cambia en el significado, en la concordancia o en el foco. Este contraste permite reutilizar ${topic.guide.formula} en presentaciones, mensajes, conversaciones y textos breves sin depender de una frase memorizada.`,
      ],
      table: [['Modelo alemán', 'Lectura o función'], ...uniqueRows([...sceneRows, ...referenceRows.map((row) => [row.at(-1) ?? row[0], row[0]])]).slice(0, 9)],
    },
    {
      heading: `Ruta de decisión para construir ${topic.shortTitle}`,
      paragraphs: [
        `Construye desde la intención hacia la forma. Primero identifica quién participa y qué relación quieres expresar. Luego decide el verbo y su posición; después revisa artículo, caso, terminación y complementos. Al final lee la oración completa y comprueba que cada elemento responde a una razón, no a una traducción automática.`,
        `Si dos opciones parecen posibles, prueba ambas dentro del contexto. Formula una pregunta de control: ¿quién realiza la acción?, ¿hay movimiento o ubicación?, ¿qué sustantivo recibe la acción?, ¿la idea principal o la subordinada controla el verbo? Nombrar la decisión hace que la corrección sea transferible.`,
      ],
      table: [['Paso', 'Decisión', 'Punto de control'], ...decisionRows.slice(0, 11)],
    },
    {
      heading: `Orden verbal y arquitectura de la oración alemana`,
      paragraphs: [
        `El orden es parte de la gramática alemana. Marca el verbo conjugado, identifica qué ocupa la primera posición y separa los elementos que forman un marco verbal. Si aparece una subordinada, comprueba si el verbo debe desplazarse. Esta lectura por bloques evita perder la estructura cuando la oración incorpora tiempo, lugar, negación o información nueva.`,
        `Practica con tarjetas móviles: sujeto, verbo, complemento y marcador. Cambia un solo bloque y reconstruye la oración. Después explica qué posiciones son obligatorias y cuáles permiten variación por énfasis. Incluso en ${levelLabel}, esta estrategia prepara para leer frases más largas sin traducirlas palabra por palabra.`,
      ],
      table: [['Bloque', 'Pregunta de control', 'Aplicación'], ['Campo inicial', '¿qué información se destaca?', 'un elemento antes del verbo'], ['Verbo conjugado', '¿qué posición exige la oración?', topic.guide.formula], ['Zona media', '¿qué complementos dependen del verbo?', 'pronombres, negación, tiempo y lugar'], ['Cierre verbal', '¿hay infinitivo, participio o prefijo?', 'completa el marco verbal'], ...sceneRows.slice(0, 5).map(([example, meaning]) => [example, '¿Dónde está el verbo?', meaning])],
    },
    {
      heading: `Forma, caso y concordancia: cómo comprobar cada pieza`,
      paragraphs: [
        `Una terminación alemana suele mostrar información que en español aparece por contexto o por una preposición. No la memorices aislada: relaciona determinante, sustantivo, pronombre, adjetivo y función. Subraya el elemento controlador y dibuja una flecha hacia la forma que cambia. Así puedes justificar la respuesta y detectar dónde nació un error.`,
        `Realiza una segunda comprobación después de cambiar género, número o persona. Mantén la misma idea y observa qué palabras deben ajustarse. Si ninguna cambia, explica por qué. Este ejercicio revela qué partes pertenecen al patrón de ${topic.shortTitle} y cuáles son solo vocabulario del ejemplo.`,
      ],
      table: [['Señal', 'Pregunta', 'Evidencia'], ['Persona o número', '¿quién controla el verbo?', 'conjugación correcta'], ['Género y caso', '¿qué función cumple el nombre?', 'artículo, pronombre o terminación'], ['Preposición', '¿qué caso o relación exige?', 'complemento compatible'], ['Tipo de oración', '¿dónde debe ir el verbo?', 'orden y marco verbal'], ...referenceRows.slice(0, 5).map((row) => [row[0], '¿qué controla esta forma?', row.at(-1) ?? topic.guide.model])],
    },
    {
      heading: `Del ejemplo aislado al diálogo y al texto conectado`,
      paragraphs: [
        `Una forma correcta debe seguir funcionando cuando responde a otra persona o conecta dos ideas. Escribe un intercambio de tres turnos: presenta el contexto, usa la estructura objetivo y añade una respuesta que retome información anterior. Revisa pronombres, orden y referencias para que el interlocutor no tenga que adivinar.`,
        `Después crea un párrafo de cuatro oraciones. Introduce una persona o situación, aplica ${topic.shortTitle}, añade una causa, contraste o consecuencia y cierra con información nueva. Cambia el punto de vista y ajusta todas las formas dependientes. Esta transferencia convierte la regla en una herramienta comunicativa.`,
      ],
      table: [['Función', 'Tarea', 'Comprobación'], ['Contextualizar', 'presentar persona, lugar o momento', 'referentes claros'], ['Aplicar', 'usar la estructura objetivo', topic.guide.model], ['Conectar', 'añadir causa, contraste o consecuencia', 'orden verbal coherente'], ['Retomar', 'usar pronombre o elipsis', 'sin ambigüedad'], ['Transformar', 'cambiar persona, número o tiempo', 'ajustes completos']],
    },
    {
      heading: `Clínica de errores y autocorrección explicada`,
      paragraphs: [
        `No corrijas por intuición solamente. Reduce la oración a su núcleo, localiza el verbo y clasifica el problema: significado, caso, concordancia, terminación, negación u orden. Reconstruye después la oración completa y explica por qué la nueva versión funciona. Una corrección sin explicación suele repetirse; un diagnóstico crea una regla útil.`,
        `Lee también la oración anterior y la siguiente. El error puede depender del referente, del tiempo o del conector y no de la palabra señalada. Prueba la solución dentro del texto completo y confirma que no genera una contradicción nueva. Esta revisión contextual prepara para editar la propia producción.`,
      ],
      table: [['Caso', 'Forma que debe revisarse', 'Foco de corrección'], ...mistakeRows.slice(0, 10)],
    },
    {
      heading: `Práctica progresiva y evidencia de dominio ${levelLabel}`,
      paragraphs: [
        `Trabaja en seis vueltas: reconocer, completar, reconstruir, integrar, corregir y producir. No abras el solucionario hasta terminar una vuelta. Al corregir, escribe al lado la señal que controló la respuesta. Si acertaste por casualidad pero no puedes justificarla, conserva el ejemplo para la siguiente sesión.`,
        `Vuelve al tema después de veinticuatro horas y crea una oración nueva sin mirar el modelo. El dominio aparece cuando puedes elegir la estructura, construirla, insertarla en un texto y reparar un error plausible. Guarda una muestra de cada intento para comparar precisión, claridad y velocidad de recuperación.`,
      ],
      table: [['Etapa', 'Tarea', 'Evidencia'], ['1 · Reconocer', 'localizar la decisión', 'explica el significado'], ['2 · Completar', 'formar con una señal', 'morfología correcta'], ['3 · Reconstruir', 'ordenar sin copiar', 'arquitectura estable'], ['4 · Integrar', 'usar en diálogo o texto', 'cohesión'], ['5 · Corregir', 'diagnosticar un error', 'regla explicada'], ['6 · Recuperar', 'producir al día siguiente', 'uso sin apoyo']],
    },
  ]

  topic.seo = [...topic.seo, ...expansions]
  topic.guide.decisions = Array.from(new Set([
    ...topic.guide.decisions,
    `Reconstruye el modelo completo: ${topic.guide.model}`,
    `Comprueba la fórmula dentro del contexto: ${topic.guide.formula}`,
    'Marca el verbo conjugado y comprueba su posición.',
    'Identifica la palabra que controla caso, terminación o concordancia.',
    'Cambia persona, número o contexto y realiza todos los ajustes.',
    'Compara una alternativa cercana y explica el cambio de significado.',
    'Integra la estructura en un diálogo y en un párrafo breve.',
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
  const sceneTarget = level === 'b1' ? 10 : level === 'a2' ? 9 : 8
  topic.visual.scene = Array.from(new Map(expandedScene.map((row) => [row.join('\u241f'), row])).values()).slice(0, sceneTarget)
  let visualIndex = 0
  while (topic.visual.scene.length < sceneTarget) {
    const decision = topic.guide.decisions[visualIndex % topic.guide.decisions.length]
    topic.visual.scene.push([topic.guide.model, `Kontrolle ${visualIndex + 1}: ${decision}`])
    visualIndex += 1
  }
  topic.visual.reviewFocus = Array.from(new Set([
    ...(topic.visual.reviewFocus ?? []),
    topic.guide.formula,
    'Verbposition und Satzklammer',
    'Kasus, Kongruenz und Bedeutung',
    'Selbstkorrektur im verbundenen Text',
  ])).slice(0, 10)

  const minimumInteractions = level === 'b1' ? 50 : level === 'a2' ? 45 : 40
  const writeLevel = topic.practice.levels.find((practice) => practice.type === 'write')
  if (writeLevel?.type === 'write') {
    let sequence = 1
    while (interactionCount(topic) < minimumInteractions) {
      writeLevel.items.push({
        scene: `Transferenz ${levelLabel} ${sequence}`,
        prompt: `Escribe un ejemplo nuevo con ${topic.shortTitle}, intégralo en dos oraciones conectadas y explica qué controla la forma y la posición del verbo.`,
        answer: `${topic.guide.model} El ejemplo conserva ${topic.guide.formula}, un orden verbal claro y las concordancias necesarias.`,
        explain: 'La producción comprueba forma, significado, orden y continuidad, no solamente una respuesta aislada.',
      })
      sequence += 1
    }
  }

  return topic
}
