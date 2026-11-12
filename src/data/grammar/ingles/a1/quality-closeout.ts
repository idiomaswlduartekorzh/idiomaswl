import type { GrammarTopic } from '../../types'
import { expandFoundationWriting } from '../../quality-write-expansion'

const uniqueRows = (rows: string[][]) => Array.from(new Map(rows.map((row) => [row.join('\u241f'), row])).values())

export function closeEnglishA1Topic(source: GrammarTopic): GrammarTopic {
  const topic = structuredClone(source)
  const referenceRows = topic.guide.table.slice(1)
  const sceneRows = topic.visual.scene.map(([example, meaning]) => [example, meaning])
  const decisionRows = topic.guide.decisions.map((decision, index) => [String(index + 1), decision, index === 0 ? topic.guide.model : topic.guide.formula])
  const mistakeRows = topic.guide.mistakes.map((mistake, index) => [String(index + 1), mistake, topic.visual.reviewFocus?.[index % (topic.visual.reviewFocus?.length || 1)] ?? 'form and meaning'])

  const expansions: GrammarTopic['seo'] = [
    {
      heading: `${topic.shortTitle}: contrastes que cambian el significado`,
      paragraphs: [
        `La forma central de esta lección no se aprende bien como una traducción aislada. Compárala dentro de la oración completa: ${topic.guide.model} La elección depende de la función que cumple cada parte y de la intención comunicativa, no solo de una palabra visible.`,
        `Usa la tabla como prueba de contraste. Cubre la columna de explicación, reconstruye el ejemplo y di en voz alta qué cambiaría si eligieras la otra forma. Este procedimiento convierte ${topic.shortTitle} en una decisión razonada y reutilizable.`,
      ],
      table: [['Modelo', 'Lectura o función'], ...uniqueRows([...sceneRows, ...referenceRows.map((row) => [row.at(-1) ?? row[0], row[0]])]).slice(0, 6)],
    },
    {
      heading: `Ruta de decisión para ${topic.shortTitle}`,
      paragraphs: [
        `Empieza por el significado y sigue la ruta en orden. La fórmula ${topic.guide.formula} resume la arquitectura, pero cada paso comprueba una dependencia distinta: referente, sujeto, verbo, complemento, posición o contexto.`,
        `Si una respuesta falla, no memorices solamente la corrección. Identifica en qué paso se rompió la ruta y reconstruye una segunda oración con la misma regla. Así la retroalimentación se convierte en una estrategia, no en una lista de excepciones.`,
      ],
      table: [['Paso', 'Decisión', 'Punto de control'], ...decisionRows.slice(0, 8)],
    },
    {
      heading: `Uso real: de la tabla a una interacción A1`,
      paragraphs: [
        `Una forma gramatical puede ser correcta y todavía resultar poco natural si no responde a una situación. Lee cada modelo como parte de una conversación, una descripción, una rutina o una instrucción. Pregunta quién habla, a quién y con qué propósito.`,
        `Después cambia un solo elemento -sujeto, tiempo, lugar o cantidad- y conserva el resto de la estructura. Esta variación controlada muestra qué partes pertenecen a la regla de ${topic.shortTitle} y cuáles dependen del vocabulario del ejemplo.`,
      ],
      table: [['Contexto', 'Modelo', 'Transferencia'], ...uniqueRows([...referenceRows, ...sceneRows.map(([a,b]) => [b,a,`Cambia el sujeto y conserva ${topic.guide.formula}`])]).slice(0, 6).map((row) => row.length === 3 ? row : [row[0], row[1], `Reutiliza el patrón con otro referente`])],
    },
    {
      heading: `Clínica de errores y autocorrección`,
      paragraphs: [
        `Los errores de esta lección suelen revelar una regla española aplicada directamente al inglés o una dependencia comprobada solo a medias. Corrige primero la estructura mínima y explica después por qué la alternativa cambia la forma o el significado.`,
        `La revisión final tiene cuatro preguntas: ¿el sujeto está claro?, ¿el verbo tiene la forma necesaria?, ¿la posición conserva el foco?, ¿la oración completa expresa la intención? Solo entonces compara ortografía y puntuación.`,
      ],
      table: [['Caso', 'Forma que debe revisarse', 'Foco'], ...mistakeRows.slice(0, 7)],
    },
    {
      heading: `Transferencia final: comprender, producir y explicar`,
      paragraphs: [
        `Dominar ${topic.shortTitle} significa poder reconocer la forma, construirla sin opciones y justificarla dentro de un mensaje. Trabaja en tres vueltas: primero identifica la decisión en un ejemplo; después produce otra oración con vocabulario diferente; finalmente explica qué parte de la estructura no podría cambiar sin alterar el significado.`,
        `La explicación no necesita metalenguaje avanzado. Basta con nombrar el referente, el sujeto, el verbo, la posición o la relación que controla la respuesta. Esta verbalización ayuda a distinguir un acierto razonado de una coincidencia y prepara el paso hacia textos más largos, donde varias decisiones gramaticales aparecen al mismo tiempo.`,
      ],
      table: [['Vuelta', 'Tarea', 'Evidencia de dominio'], ['1 · Reconocer', 'localizar la forma en contexto', 'explica su función'], ['2 · Producir', 'crear un ejemplo nuevo', 'conserva la estructura'], ['3 · Transferir', 'integrarla en un mensaje', 'mantiene significado y referencia'], ['4 · Revisar', 'corregir un error', 'nombra la regla útil']],
    },
  ]

  topic.seo = [...topic.seo, ...expansions]
  topic.guide.decisions = Array.from(new Set([
    ...topic.guide.decisions,
    `Reconstruye el modelo completo: ${topic.guide.model}`,
    `Comprueba la fórmula sin traducir palabra por palabra: ${topic.guide.formula}`,
    'Cambia un solo elemento y verifica que la regla siga funcionando.',
    'Lee la frase completa y confirma significado, referencia y naturalidad.',
  ])).slice(0, 10)

  const expandedTable: [string, string, string][] = [
    ...topic.guide.table,
    ...topic.visual.scene.map(([example, meaning]) => [meaning, topic.guide.formula, example] as [string, string, string]),
  ]
  topic.guide.table = Array.from(new Map(expandedTable.map((row) => [row.join('\u241f'), row])).values()).slice(0, 12)
  const expandedScene: [string, string][] = [
    ...topic.visual.scene,
    ...topic.guide.table.slice(1).map((row) => [row[2], `${row[0]} · ${row[1]}`] as [string, string]),
  ]
  topic.visual.scene = Array.from(new Map(expandedScene.map((row) => [row.join('\u241f'), row])).values()).slice(0, 8)
  topic.visual.reviewFocus = Array.from(new Set([
    ...(topic.visual.reviewFocus ?? []),
    topic.guide.formula,
    'meaning before form',
    'complete-sentence self-correction',
  ])).slice(0, 8)

  expandFoundationWriting(topic, 35)
  return topic
}
