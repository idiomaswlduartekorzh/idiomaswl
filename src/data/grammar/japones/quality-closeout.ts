import type { GrammarTopic } from '../types'
import { expandFoundationWriting } from '../quality-write-expansion'

type Level = 'a2' | 'b1'

const uniqueRows = (rows: string[][]) => Array.from(new Map(rows.map((row) => [row.join('|'), row])).values())

export function closeJapaneseFoundationTopic(source: GrammarTopic, level: Level, order: number): GrammarTopic {
  const topic = structuredClone(source)
  const label = level.toUpperCase()
  topic.order = String(order).padStart(2, '0')
  const references = topic.guide.table.slice(1)
  const scenes = topic.visual.scene

  topic.seo.push(
    {
      heading: `${topic.shortTitle}: significado, intención y contexto`,
      paragraphs: [
        `Antes de memorizar una terminación, identifica qué relación comunica ${topic.shortTitle}: tiempo, cambio, obligación, posibilidad, perspectiva o vínculo entre dos hechos. Parte del modelo «${topic.guide.model}» y señala qué fragmento aporta la información central.`,
        'Mantén el vocabulario y modifica un solo elemento gramatical. Compara el resultado y explica qué cambió en la intención, la certeza, el registro o la relación temporal. Ese contraste evita traducir palabra por palabra y convierte la estructura en una decisión comunicativa.',
      ],
      table: [['Modelo japonés', 'Lectura funcional'], ...uniqueRows([...scenes, ...references.map((row) => [row.at(-1) ?? row[0], row[0]])]).slice(0, 9)],
    },
    {
      heading: `Cómo construir ${topic.shortTitle} paso a paso`,
      paragraphs: [
        `Sigue una ruta estable: identifica el verbo o la cláusula que controla la oración, elige la base adecuada, añade la estructura ${topic.guide.formula}, revisa partículas y conserva el mismo registro. Después lee la frase completa, no solo la terminación.`,
        'Si dos opciones parecen posibles, pregunta qué quiere destacar el hablante y qué información ya conoce el oyente. La respuesta debe justificar tanto la forma como el significado final de la oración.',
      ],
      table: [['Paso', 'Decisión', 'Control'], ...topic.guide.decisions.slice(0, 10).map((decision, index) => [String(index + 1), decision, index ? topic.guide.formula : topic.guide.model])],
    },
    {
      heading: 'Arquitectura de la oración japonesa',
      paragraphs: [
        'Separa tema, participantes, complementos y predicado. En japonés la información que determina tiempo, polaridad, modalidad y cortesía suele concentrarse al final; por eso conviene construir desde el núcleo verbal hacia atrás y revisar las partículas después.',
        `En ${label}, transforma la misma idea cambiando sujeto, tiempo, afirmación o grado de cortesía. Actualiza toda la cadena verbal y comprueba que la frase siga siendo natural en la escena, no solo formalmente posible.`,
      ],
      table: [['Bloque', 'Pregunta de control', 'Prueba'], ['Tema', '¿de qué hablamos?', 'は y contexto'], ['Participante', '¿quién realiza o recibe?', 'が・を・に'], ['Predicado', '¿qué ocurre?', topic.guide.formula], ['Registro', '¿qué relación hay entre hablantes?', 'forma neutra o cortés'], ...scenes.slice(0, 5).map(([example, meaning]) => [example, '¿qué señal controla la lectura?', meaning])],
    },
    {
      heading: 'Partículas, tiempo y punto de vista: revisión completa',
      paragraphs: [
        'Una oración puede tener una terminación correcta y aun así fallar por una partícula, una referencia ambigua o un punto de vista incoherente. Dibuja una flecha entre cada participante y su función y localiza qué elemento gobierna la forma final.',
        'Repite el ejemplo desde otra persona, otro momento o un registro distinto. Conserva la idea y cambia todo lo necesario. Si una parte no cambia, explica por qué; así separas la regla de una frase memorizada.',
      ],
      table: [['Señal', 'Pregunta', 'Comprobación'], ['Partícula', '¿qué función cumple el nombre?', 'は・が・を・に・で'], ['Tiempo', '¿cuándo se interpreta?', 'forma final y contexto'], ['Polaridad', '¿afirma o niega?', 'cadena verbal completa'], ['Perspectiva', '¿desde quién se presenta?', 'referente y empatía'], ['Registro', '¿qué distancia social expresa?', 'consistencia']],
    },
    {
      heading: 'De la oración aislada al diálogo y al texto',
      paragraphs: [
        `Crea un diálogo de tres turnos: presenta una situación, usa ${topic.shortTitle} y añade una respuesta que retome información anterior sin repetirla de forma mecánica. Vigila partículas, elipsis y registro.`,
        'Después escribe cuatro frases conectadas: contexto, estructura objetivo, causa o contraste y conclusión. Cambia el punto de vista y reconstruye las referencias. Una frase correcta por sí sola puede resultar poco natural dentro del párrafo.',
      ],
      table: [['Función', 'Tarea', 'Control'], ['Contexto', 'presentar persona, lugar o momento', 'referentes claros'], ['Aplicación', 'usar la estructura', topic.guide.model], ['Conexión', 'añadir causa o contraste', 'relación lógica'], ['Elipsis', 'evitar repeticiones innecesarias', 'lectura inequívoca'], ['Transformación', 'cambiar tiempo o registro', 'cadena completa']],
    },
    {
      heading: 'Laboratorio de errores y prueba de dominio',
      paragraphs: [
        'No corrijas por intuición. Clasifica primero el problema: elección de estructura, base verbal, partícula, tiempo, polaridad, registro, orden informativo o referencia. Reescribe y explica qué evidencia hace válida la nueva versión.',
        'Completa seis etapas: reconocer, combinar, completar un texto, producir sin opciones, diagnosticar y crear. Al día siguiente inventa un ejemplo nuevo, intégralo en un párrafo y corrige un error verosímil nombrando la regla.',
      ],
      table: [['Etapa', 'Acción', 'Evidencia'], ['1', 'reconocer la intención', 'significado explicado'], ['2', 'combinar dos decisiones', 'estructura completa'], ['3', 'resolver en contexto', 'coherencia textual'], ['4', 'producir sin banco', 'forma recuperada'], ['5', 'diagnosticar un error', 'regla nombrada'], ['6', 'crear y editar', 'uso autónomo']],
    },
  )

  topic.guide.decisions = Array.from(new Set([...topic.guide.decisions, `Reconstruye el modelo: ${topic.guide.model}`, `Comprueba la fórmula: ${topic.guide.formula}`, 'Localiza el predicado y las partículas que dependen de él.', 'Revisa tiempo, polaridad, punto de vista y registro.', 'Cambia una variable y reconstruye toda la cadena final.', 'Integra la estructura en un diálogo y en un párrafo.'])).slice(0, 14)
  topic.guide.table = uniqueRows([...topic.guide.table, ...topic.visual.scene.map(([example, meaning]) => [example, topic.guide.formula, meaning])]).slice(0, 14) as [string, string, string][]
  let tableIndex = 0
  while (topic.guide.table.length < 5) {
    const decision = topic.guide.decisions[tableIndex % topic.guide.decisions.length]
    topic.guide.table.push([`判断 ${tableIndex + 1}`, decision, topic.guide.model])
    tableIndex += 1
  }
  const sceneTarget = level === 'b1' ? 10 : 9
  topic.visual.scene = uniqueRows([...topic.visual.scene, ...topic.guide.table.slice(1).map((row) => [row[0], `${row[1]} · ${row[2]}`])]).slice(0, sceneTarget) as [string, string][]
  while (topic.visual.scene.length < sceneTarget) topic.visual.scene.push([topic.guide.model, `Control ${topic.visual.scene.length + 1}: ${topic.guide.formula}`])

  if (topic.practice.levels.length < 6) {
    const rows = topic.guide.table.slice(1, 5)
    const left = Array.from(new Set(rows.map((row) => row[0])))
    const right = Array.from(new Set(rows.map((row) => row.at(-1) ?? row[1])))
    topic.practice.levels.push({ id: 'level-5', title: 'Reconstruye el mapa', tag: 'Tabla aplicada', intro: 'Relaciona la forma japonesa con su función y explica la señal decisiva.', type: 'dual', items: rows.slice(0, 3).map((row, index) => ({ scene: `Relación ${index + 1}`, lines: [['', '[[0]] → [[1]]']], blanks: [{ options: left, answer: row[0], explain: `La forma pertenece al modelo ${topic.guide.model}.` }, { options: right, answer: row.at(-1) ?? row[1], explain: `La interpretación se comprueba con ${topic.guide.formula}.` }] })) })
    topic.practice.levels.push({ id: 'level-6', title: 'Diagnóstico en contexto', tag: 'Edición', intro: 'Elige la interpretación exacta y justifica la forma.', type: 'choice', items: topic.visual.scene.slice(0, 4).map(([example, meaning], index) => ({ scene: `Contexto ${index + 1}`, lines: [['', example]], options: Array.from(new Set([meaning, ...topic.visual.scene.filter((_, other) => other !== index).map((row) => row[1])])).slice(0, 4), answer: meaning, explain: `La lectura «${meaning}» se apoya en ${topic.guide.formula}.` })) })
  }

  const target = level === 'b1' ? 50 : 45
  let writing = topic.practice.levels.find((stage) => stage.type === 'write')
  if (!writing) {
    writing = { id: 'level-transfer', title: 'Producción y transferencia', tag: 'Escritura', intro: 'Crea ejemplos propios y justifica cada decisión.', type: 'write', items: [] }
    topic.practice.levels.push(writing)
  }
  expandFoundationWriting(topic, target)

  for (const stage of topic.practice.levels) {
    if (stage.type === 'choice') for (const item of stage.items) if (!item.options.includes(item.answer)) item.options[0] = item.answer
    if (stage.type === 'dual') for (const item of stage.items) for (const blank of item.blanks) if (blank.options && !blank.options.includes(blank.answer)) blank.options[0] = blank.answer
    if (stage.type === 'guidedText') for (const blank of stage.blanks) if (blank.options && !blank.options.includes(blank.answer)) blank.options[0] = blank.answer
  }

  return topic
}
