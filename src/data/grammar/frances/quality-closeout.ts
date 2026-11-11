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

export function closeFrenchFoundationTopic(source: GrammarTopic, level: FoundationLevel, order: number): GrammarTopic {
  const topic = structuredClone(source)
  topic.order = String(order).padStart(2, '0')
  const levelLabel = level.toUpperCase()
  const referenceRows = topic.guide.table.slice(1)
  const sceneRows = topic.visual.scene.map(([example, meaning]) => [example, meaning])
  const decisionRows = topic.guide.decisions.map((decision, index) => [String(index + 1), decision, index === 0 ? topic.guide.model : topic.guide.formula])
  const mistakeRows = topic.guide.mistakes.map((mistake, index) => [String(index + 1), mistake, topic.visual.reviewFocus?.[index % (topic.visual.reviewFocus?.length || 1)] ?? 'forma, sentido y contexto'])

  const expansions: GrammarTopic['seo'] = [
    {
      heading: `${topic.shortTitle}: qué significa y qué permite comunicar`,
      paragraphs: [
        `La gramática francesa se aprende mejor cuando la forma responde a una intención. En ${topic.shortTitle}, parte del modelo «${topic.guide.model}» y determina qué información organiza: persona, cantidad, referencia, tiempo, relación entre acciones o actitud del hablante. Después identifica la señal que obliga a elegir ${topic.guide.formula}.`,
        `Mantén el vocabulario y cambia solo la estructura. Explica qué se modifica en el sentido, en el registro o en la referencia. Este contraste evita traducir palabra por palabra y permite reutilizar el patrón en conversaciones, mensajes, descripciones y textos conectados.`,
      ],
      table: [['Modelo francés', 'Lectura o función'], ...uniqueRows([...sceneRows, ...referenceRows.map((row) => [row.at(-1) ?? row[0], row[0]])]).slice(0, 9)],
    },
    {
      heading: `Ruta de decisión para construir ${topic.shortTitle}`,
      paragraphs: [
        `Construye desde el significado hacia la forma. Primero define quién habla, de quién o de qué se habla y en qué momento. Luego elige el verbo o núcleo, revisa el determinante o pronombre y coloca negación, complementos y conectores. Al final lee la frase completa y comprueba que cada elección tenga una razón observable.`,
        `Cuando dos opciones parezcan posibles, formula una pregunta de control: ¿la referencia es conocida o nueva?, ¿se habla de una cantidad precisa o no contable?, ¿la acción está terminada o sirve de fondo?, ¿el pronombre sustituye una persona, una cosa o una idea? Nombrar la decisión convierte una corrección puntual en una estrategia reutilizable.`,
      ],
      table: [['Paso', 'Decisión', 'Punto de control'], ...decisionRows.slice(0, 11)],
    },
    {
      heading: `Arquitectura de la frase francesa: orden, elisión y enlace`,
      paragraphs: [
        `El francés escrito hace visibles relaciones que en la pronunciación pueden quedar reducidas. Marca el sujeto, el verbo conjugado y los elementos que lo rodean. Después revisa apóstrofos, elisiones, contracciones y la posición de los pronombres. La negación y los tiempos compuestos forman marcos que deben leerse como una sola unidad.`,
        `Practica moviendo tarjetas con sujeto, verbo, complemento y marcador. Cambia un bloque cada vez y reconstruye la frase. Explica qué posición es obligatoria y qué variante depende del énfasis o del registro. En ${levelLabel}, esta lectura por bloques ayuda a comprender frases largas sin perder el hilo.`,
      ],
      table: [['Bloque', 'Pregunta de control', 'Aplicación'], ['Sujeto o tema', '¿quién controla la forma verbal?', 'persona y número'], ['Verbo o grupo verbal', '¿es simple, compuesto o pronominal?', topic.guide.formula], ['Determinante o pronombre', '¿qué referente recupera?', 'género, número y función'], ['Enlace', '¿hay vocales contiguas o contracción?', 'elisión, liaison gráfica y preposición'], ...sceneRows.slice(0, 5).map(([example, meaning]) => [example, '¿qué bloque controla la forma?', meaning])],
    },
    {
      heading: `Concordancia, determinantes y pronombres: comprobación completa`,
      paragraphs: [
        `En francés una elección suele desencadenar varias concordancias. Relaciona sujeto y verbo; sustantivo, determinante y adjetivo; antecedente y pronombre; auxiliar y participio cuando corresponda. Dibuja una flecha entre el elemento controlador y la forma dependiente. Así puedes justificar la respuesta y localizar el origen del error.`,
        `Haz una segunda prueba cambiando género, número, persona o referente. Conserva la idea y ajusta todas las piezas necesarias. Si alguna permanece igual, explica por qué. Esta transformación distingue la regla de ${topic.shortTitle} del vocabulario circunstancial del ejemplo.`,
      ],
      table: [['Señal', 'Pregunta', 'Evidencia'], ['Persona y número', '¿quién controla el verbo?', 'conjugación compatible'], ['Género y número', '¿qué nombre controla la concordancia?', 'determinante y adjetivo'], ['Referencia', '¿qué sustituye el pronombre?', 'forma y posición correctas'], ['Tiempo y aspecto', '¿cómo se presenta la acción?', 'auxiliar, participio o forma simple'], ...referenceRows.slice(0, 5).map((row) => [row[0], '¿qué controla esta forma?', row.at(-1) ?? topic.guide.model])],
    },
    {
      heading: `Del ejemplo al diálogo y al texto conectado`,
      paragraphs: [
        `Una estructura está dominada cuando funciona dentro de una interacción. Escribe un diálogo de tres turnos: presenta el contexto, utiliza la estructura objetivo y añade una respuesta que retome información anterior. Revisa pronombres, concordancias y referencias para que el interlocutor pueda seguir el sentido sin adivinar.`,
        `Después redacta un párrafo de cuatro oraciones. Introduce la situación, aplica ${topic.shortTitle}, añade una causa, un contraste o una consecuencia y termina con información nueva. Cambia el punto de vista y ajusta todos los elementos dependientes. Esta transferencia convierte la regla en una herramienta comunicativa.`,
      ],
      table: [['Función', 'Tarea', 'Comprobación'], ['Contextualizar', 'presentar persona, lugar o momento', 'referentes claros'], ['Aplicar', 'usar la estructura objetivo', topic.guide.model], ['Conectar', 'añadir causa, contraste o consecuencia', 'relación lógica visible'], ['Retomar', 'usar pronombre, determinante o elipsis', 'sin ambigüedad'], ['Transformar', 'cambiar persona, número o tiempo', 'ajustes completos']],
    },
    {
      heading: `Clínica de errores: diagnosticar antes de corregir`,
      paragraphs: [
        `No reemplaces una palabra por intuición. Reduce la frase a su núcleo y clasifica el problema: significado, conjugación, concordancia, determinante, pronombre, negación, elisión u orden. Reconstruye después la frase completa y explica por qué la nueva versión funciona. Una corrección explicada se transfiere; una corrección memorizada suele repetirse.`,
        `Lee también la oración anterior y la siguiente. El error puede depender del referente, del tiempo narrativo o del conector y no de la palabra marcada. Prueba la solución dentro del texto y confirma que no crea otra contradicción. Esta revisión contextual prepara para editar producción propia.`,
      ],
      table: [['Caso', 'Forma que debe revisarse', 'Foco de corrección'], ...mistakeRows.slice(0, 10)],
    },
    {
      heading: `Práctica progresiva y evidencia de dominio ${levelLabel}`,
      paragraphs: [
        `Trabaja en seis vueltas: reconocer, completar, reconstruir, integrar, corregir y producir. No abras el corrigé hasta terminar una vuelta. Al corregir, anota la señal que controló la respuesta. Si acertaste sin poder justificarla, conserva el ejemplo para una repetición posterior.`,
        `Vuelve al tema después de veinticuatro horas y crea una frase nueva sin mirar el modelo. Hay dominio cuando puedes elegir la estructura, construirla, insertarla en un texto y reparar un error plausible. Guarda una muestra para comparar precisión, claridad y velocidad de recuperación.`,
      ],
      table: [['Etapa', 'Tarea', 'Evidencia'], ['1 · Reconocer', 'localizar la decisión', 'explica el significado'], ['2 · Completar', 'formar con una señal', 'morfología correcta'], ['3 · Reconstruir', 'ordenar sin copiar', 'arquitectura estable'], ['4 · Integrar', 'usar en diálogo o texto', 'cohesión'], ['5 · Corregir', 'diagnosticar un error', 'regla explicada'], ['6 · Recuperar', 'producir al día siguiente', 'uso sin apoyo']],
    },
  ]

  topic.seo = [...topic.seo, ...expansions]
  topic.guide.decisions = Array.from(new Set([
    ...topic.guide.decisions,
    `Reconstruye el modelo completo: ${topic.guide.model}`,
    `Comprueba la fórmula dentro del contexto: ${topic.guide.formula}`,
    'Marca el verbo conjugado y el elemento que controla su forma.',
    'Revisa determinante, género, número y referencia pronominal.',
    'Comprueba elisión, contracción y posición de la negación.',
    'Cambia persona, número o tiempo y realiza todos los ajustes.',
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
    topic.visual.scene.push([topic.guide.model, `Contrôle ${visualIndex + 1} : ${decision}`])
    visualIndex += 1
  }
  topic.visual.reviewFocus = Array.from(new Set([
    ...(topic.visual.reviewFocus ?? []),
    topic.guide.formula,
    'conjugación, concordancia y referencia',
    'elisión, contracción y orden',
    'autocorrección en texto conectado',
  ])).slice(0, 10)

  const minimumInteractions = level === 'b1' ? 50 : level === 'a2' ? 45 : 40
  const writeLevel = topic.practice.levels.find((practice) => practice.type === 'write')
  if (writeLevel?.type === 'write') {
    let sequence = 1
    while (interactionCount(topic) < minimumInteractions) {
      writeLevel.items.push({
        scene: `Transfert ${levelLabel} ${sequence}`,
        prompt: `Escribe un ejemplo nuevo con ${topic.shortTitle}, intégralo en dos oraciones conectadas y explica qué controla la forma, la concordancia y el orden.`,
        answer: `${topic.guide.model} El ejemplo conserva ${topic.guide.formula}, una referencia clara y todas las concordancias necesarias.`,
        explain: 'La producción comprueba forma, sentido, referencia y continuidad, no solamente una frase aislada.',
      })
      sequence += 1
    }
  }

  return topic
}
