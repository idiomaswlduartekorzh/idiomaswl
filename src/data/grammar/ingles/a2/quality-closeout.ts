import type { GrammarTopic } from '../../types'
import { expandFoundationWriting } from '../../quality-write-expansion'

const uniqueRows = (rows: string[][]) => Array.from(new Map(rows.map((row) => [row.join('\u241f'), row])).values())

export function closeEnglishA2Topic(source: GrammarTopic): GrammarTopic {
  const topic = structuredClone(source)
  const referenceRows = topic.guide.table.slice(1)
  const sceneRows = topic.visual.scene.map(([example, meaning]) => [example, meaning])
  const decisionRows = topic.guide.decisions.map((decision, index) => [String(index + 1), decision, index === 0 ? topic.guide.model : topic.guide.formula])
  const mistakeRows = topic.guide.mistakes.map((mistake, index) => [String(index + 1), mistake, topic.visual.reviewFocus?.[index % (topic.visual.reviewFocus?.length || 1)] ?? 'meaning, form and context'])

  const expansions: GrammarTopic['seo'] = [
    {
      heading: `${topic.shortTitle}: significado, forma y contraste`,
      paragraphs: [
        `En A2 ya no basta con reconocer una forma aislada. ${topic.shortTitle} debe conectarse con la intención del mensaje, la referencia temporal y las palabras que aparecen alrededor. Parte del modelo “${topic.guide.model}” y localiza qué elemento expresa la decisión central antes de cambiar vocabulario o traducir la oración completa.`,
        `Compara cada ejemplo con una alternativa cercana. Explica qué se conserva, qué cambia y por qué la fórmula ${topic.guide.formula} produce esa lectura. Esta comparación evita aprender una lista mecánica y permite reutilizar el patrón en conversaciones, narraciones breves, planes, descripciones y mensajes cotidianos.`,
      ],
      table: [['Modelo', 'Lectura o función'], ...uniqueRows([...sceneRows, ...referenceRows.map((row) => [row.at(-1) ?? row[0], row[0]])]).slice(0, 8)],
    },
    {
      heading: `Ruta de decisión para construir ${topic.shortTitle}`,
      paragraphs: [
        `Construye la respuesta en orden. Primero identifica la situación y el referente; después ubica el sujeto y el verbo que controla la forma; por último revisa complementos, marcadores y posición. La ruta hace visible la razón de cada elección y ayuda a detectar en qué paso nació un error.`,
        `Si dos opciones parecen posibles, prueba ambas dentro de la oración completa. Comprueba concordancia, secuencia y significado, no solamente ortografía. Luego crea una segunda oración con otro sujeto o contexto y conserva la misma dependencia gramatical. Así la corrección se convierte en una estrategia transferible.`,
      ],
      table: [['Paso', 'Decisión', 'Punto de control'], ...decisionRows.slice(0, 10)],
    },
    {
      heading: `Tiempo, secuencia y punto de vista`,
      paragraphs: [
        `Muchas decisiones de A2 dependen de la relación entre dos momentos, acciones o cantidades. Dibuja una línea sencilla y coloca primero la situación principal; después añade el evento, límite o comparación que la modifica. Este procedimiento es especialmente útil cuando una palabra española admite varias estructuras inglesas.`,
        `Lee también los marcadores del contexto. Una expresión temporal, un grado de comparación, una condición o una referencia previa puede cambiar la forma esperada. No los trates como decoración: funcionan como evidencia. Si el marcador desaparece, vuelve a justificar la respuesta a partir del significado global.`,
      ],
      table: [['Señal', 'Estructura', 'Ejemplo controlado'], ...uniqueRows([...referenceRows, ...sceneRows.map(([example, meaning]) => [meaning, topic.guide.formula, example])]).slice(0, 8).map((row) => row.length === 3 ? row : [row[1], topic.guide.formula, row[0]])],
    },
    {
      heading: `Uso real: de la oración al texto breve`,
      paragraphs: [
        `Una respuesta correcta debe seguir funcionando cuando aparece junto a otras ideas. Integra el patrón en un intercambio de dos turnos o en un párrafo de tres oraciones: prepara el contexto, usa la estructura objetivo y añade una consecuencia, explicación o detalle. Después revisa si el lector puede seguir la referencia sin adivinar.`,
        `Varía solo una dimensión cada vez: persona, tiempo, lugar, cantidad o intención. Mantén estable la arquitectura mientras observas qué palabras necesitan ajustarse. Esta producción controlada muestra qué elementos pertenecen a ${topic.shortTitle} y cuáles cambian por el nuevo contexto comunicativo.`,
      ],
      table: [['Contexto', 'Modelo', 'Transferencia'], ...uniqueRows([...referenceRows, ...sceneRows.map(([example, meaning]) => [meaning, example, `Cambia el contexto y conserva ${topic.guide.formula}`])]).slice(0, 8).map((row) => row.length === 3 ? row : [row[0], row[1], 'Reutiliza el patrón con otro referente'])],
    },
    {
      heading: `Clínica de errores y autocorrección explicada`,
      paragraphs: [
        `Los errores más útiles no se corrigen sustituyendo una palabra sin explicación. Reconstruye primero la oración mínima, identifica la dependencia que controla la forma y vuelve a añadir los detalles. Si la alternativa cambia el tiempo, el grado, la cantidad o la relación entre ideas, nombra ese cambio con palabras sencillas.`,
        `Aplica una revisión en cuatro pasos: intención, sujeto y verbo, complemento o marcador, y lectura completa. Después compara la solución con “${topic.guide.model}”. La meta es explicar por qué la forma funciona en este contexto y reconocer qué tendría que cambiar para que otra opción fuera posible.`,
      ],
      table: [['Caso', 'Forma que debe revisarse', 'Foco de corrección'], ...mistakeRows.slice(0, 9)],
    },
    {
      heading: `Transferencia final y evidencia de dominio A2`,
      paragraphs: [
        `Dominar ${topic.shortTitle} significa reconocer la decisión, producirla sin opciones y sostenerla dentro de un mensaje conectado. Trabaja en cuatro vueltas: identifica, reconstruye, integra y explica. En cada vuelta usa vocabulario distinto para comprobar que no dependes de una única frase memorizada.`,
        `Guarda una evidencia breve de cada sesión: la forma que escribiste, la corrección necesaria y la regla útil que las separa. Vuelve al ejemplo dentro de veinticuatro horas y produce una versión nueva. Si puedes justificarla, leerla con naturalidad y corregir una alternativa cercana, la estructura ya está disponible para uso real.`,
      ],
      table: [['Etapa', 'Tarea', 'Evidencia'], ['1 · Identificar', 'localizar la decisión en contexto', 'explica el significado'], ['2 · Reconstruir', 'completar sin copiar el modelo', 'mantiene la arquitectura'], ['3 · Integrar', 'usar la forma en un texto breve', 'conserva referencia y secuencia'], ['4 · Explicar', 'comparar dos alternativas', 'nombra la diferencia útil'], ['5 · Recuperar', 'volver a producir al día siguiente', 'responde sin apoyo visual']],
    },
  ]

  topic.seo = [...topic.seo, ...expansions]
  topic.guide.decisions = Array.from(new Set([
    ...topic.guide.decisions,
    `Reconstruye el modelo completo: ${topic.guide.model}`,
    `Comprueba la fórmula dentro del contexto: ${topic.guide.formula}`,
    'Localiza la señal temporal, cuantitativa o discursiva que controla la elección.',
    'Cambia un solo elemento y verifica todos los ajustes necesarios.',
    'Integra la estructura en dos oraciones conectadas.',
    'Explica por qué una alternativa cercana no expresa la misma relación.',
  ])).slice(0, 12)

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
    'meaning, sequence and reference',
    'connected-text self-correction',
  ])).slice(0, 8)

  expandFoundationWriting(topic, 40)
  return topic
}
