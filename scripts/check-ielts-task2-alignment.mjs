import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

/**
 * Comprueba que cada ejercicio de IELTS Writing Task 2 muestre lo suyo y no lo de otro.
 *
 * Existe por un fallo que llegó a producción: el mapa del enunciado buscaba el tema en una
 * tabla aparte, por posición (`TOPICS[lesson.id][index]`). Dos listas paralelas que hay que
 * mantener en el mismo orden a mano, y que se habían desincronizado en 10 de los 25
 * ejercicios. El de «prison sentences» anunciaba international tourism; el de «museums»,
 * prison policy. Ninguna comprobación lo veía porque las dos listas eran válidas por
 * separado: el error solo existe en la relación entre ellas.
 *
 * La corrección fue quitar la tabla y colgar el tema del propio ejemplo. Esta comprobación
 * defiende esa decisión: si alguien vuelve a introducir un emparejamiento por posición, o
 * declara un tema que no tiene nada que ver con su enunciado, el build se para.
 *
 *   node scripts/check-ielts-task2-alignment.mjs
 *   node scripts/check-ielts-task2-alignment.mjs --verbose
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const task2 = path.join(repoRoot, 'src', 'app', '(site)', 'practica', 'ielts', 'academic', 'writing', 'task2')
const verbose = process.argv.includes('--verbose')

/** Los cinco tipos tienen que seguir existiendo, con cinco ejemplos cada uno. */
const EXPECTED_TYPES = ['opinion', 'discussion', 'problem-solution', 'advantages-disadvantages', 'direct-questions']
const EXPECTED_EXAMPLES = 5

/** Palabras sin carga temática: aparecen en cualquier enunciado y no prueban parentesco. */
const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'is', 'are', 'be', 'been', 'this', 'that',
  'some', 'people', 'others', 'think', 'believe', 'should', 'more', 'many', 'what', 'why', 'how', 'do', 'does',
  'you', 'your', 'their', 'they', 'it', 'its', 'with', 'from', 'by', 'at', 'as', 'than', 'these', 'those',
  'discuss', 'views', 'opinion', 'extent', 'agree', 'disagree', 'advantages', 'disadvantages', 'outweigh',
  'problems', 'solutions', 'causes', 'reasons', 'give', 'own', 'both', 'while', 'other', 'can', 'could',
])

/**
 * Temas que nombran su enunciado con otras palabras, no con las suyas.
 *
 * La comprobación busca solapamiento léxico, y eso deja fuera al título que resume bien
 * usando sinónimos. Cada línea es una decisión revisada a mano contra el enunciado, no un
 * atajo: si añades una, comprueba antes que el tema es realmente el del enunciado.
 */
const SYNONYM_TITLES = new Map([
  ['discussion--city-investment', 'el enunciado contrapone gastar en parques o en vivienda; «city investment» es exactamente esa decisión, con otras palabras'],
  ['problem-solution--student-inactivity', 'el enunciado dice «schoolchildren do not get enough physical exercise»; «student inactivity» lo nombra en positivo'],
])

const words = (value) =>
  value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/gu, '').replace(/[^a-z0-9\s]/gu, ' ')
    .split(/\s+/u).filter((word) => word.length > 3 && !STOPWORDS.has(word))

/** Raíz corta: «museums» tiene que emparejar con «museum», «prisons» con «prison». */
const stem = (word) => word.slice(0, Math.max(4, Math.ceil(word.length * 0.7)))

function loadModule(file, resolve) {
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: file,
  }).outputText
  const exports = {}
  const container = { exports }
  Function('module', 'exports', 'require', compiled)(container, exports, resolve)
  return container.exports
}

const introduction = loadModule(path.join(task2, 'introduccion', 'introduction-data.ts'), () => ({}))
const analysis = loadModule(
  path.join(task2, 'analisis-pregunta', 'prompt-analysis-data.ts'),
  () => introduction,
)

const failures = []
const seen = new Map()

const lessons = analysis.PROMPT_ANALYSIS_LESSONS ?? []

if (lessons.length !== EXPECTED_TYPES.length) {
  failures.push(`Hay ${lessons.length} tipos de ensayo; se esperaban ${EXPECTED_TYPES.length}.`)
}
for (const expected of EXPECTED_TYPES) {
  if (!lessons.some((lesson) => lesson.id === expected)) failures.push(`Falta el tipo de ensayo «${expected}».`)
}

for (const lesson of lessons) {
  if (lesson.examples.length !== EXPECTED_EXAMPLES) {
    failures.push(`${lesson.id}: ${lesson.examples.length} ejemplos, se esperaban ${EXPECTED_EXAMPLES}.`)
  }

  for (const example of lesson.examples) {
    const etiqueta = `${lesson.id}/${example.title ?? '(sin título)'}`

    // 1. Identificador único. Sin él, dos ejercicios distintos pueden compartir destino.
    if (!example.id) failures.push(`${etiqueta}: sin identificador.`)
    else if (seen.has(example.id)) failures.push(`Identificador repetido «${example.id}»: ${seen.get(example.id)} y ${etiqueta}.`)
    else seen.set(example.id, etiqueta)

    // 2. Campos obligatorios: el ejercicio no se puede pintar a medias.
    for (const field of ['title', 'prompt', 'instruction', 'plan']) {
      if (!example[field]?.trim?.()) failures.push(`${etiqueta}: falta «${field}».`)
    }
    for (const field of ['topic', 'instruction', 'scope', 'position']) {
      if (!example.map?.[field]?.trim?.()) failures.push(`${etiqueta}: falta «map.${field}».`)
    }
    if (!Array.isArray(example.map?.bodyRoute) || example.map.bodyRoute.length !== 2) {
      failures.push(`${etiqueta}: la ruta de cuerpos no tiene dos tramos.`)
    }
    if (!example.blocks?.length) failures.push(`${etiqueta}: sin bloques de modelo.`)

    // 3. LA COMPROBACIÓN QUE HABRÍA CAZADO EL FALLO: el tema anunciado tiene que hablar
    // de lo mismo que el enunciado. Basta con que comparta una palabra con carga temática.
    const tema = words(example.map?.topic ?? '')
    const enunciado = words(example.prompt ?? '').map(stem)
    const excusado = SYNONYM_TITLES.has(example.id)
    if (!excusado && tema.length && !tema.some((word) => enunciado.some((raiz) => stem(word).startsWith(raiz) || raiz.startsWith(stem(word))))) {
      failures.push(
        `${etiqueta}: el tema anunciado «${example.map.topic}» no aparece en su enunciado «${String(example.prompt).slice(0, 70)}…». Señal de emparejamiento por posición.`,
      )
    }

    // 4. La arquitectura tiene que ser la de SU tipo, no la de otro.
    if (example.essayType && example.essayType !== lesson.id) {
      failures.push(`${etiqueta}: declara el tipo «${example.essayType}» dentro de «${lesson.id}».`)
    }

    if (verbose) console.log(`  · ${etiqueta} → ${example.map?.topic}`)
  }
}

/**
 * Que la opción correcta no se delate por ser la más larga.
 *
 * Lo vio David probando: «las respuestas largas casi siempre son las correctas». Medido:
 * en 6 de las 8 preguntas del banco la correcta sacaba entre 7 y 14 palabras a la
 * siguiente, así que se acertaba por silueta, sin leer.
 *
 * La corrección fue alargar los distractores, nunca acortar la correcta: recortar la buena
 * le quita la precisión que precisamente se está enseñando. Cada distractor creció
 * desarrollando su propio error.
 *
 * Se toleran 2 palabras de diferencia. A partir de 3 la opción destaca a simple vista.
 */
const DESTAQUE = 3
const contar = (value) => value.trim().split(/\s+/u).filter(Boolean).length

// Los bancos de opción son los exports de introduction-data que son listas de preguntas.
const banks = Object.entries(introduction).filter(
  ([, value]) => Array.isArray(value) && value.length && Array.isArray(value[0]?.options) && 'correct' in (value[0].options[0] ?? {}),
)

if (!banks.length) failures.push('No se encontró ningún banco de opciones en introduction-data.')

for (const [name, bank] of banks) {
  for (const [index, question] of bank.entries()) {
    const largos = question.options.map((option) => contar(option.text))
    const correcta = question.options.findIndex((option) => option.correct)
    if (correcta < 0) { failures.push(`${name}[${index}]: ninguna opción marcada como correcta.`); continue }
    const ordenados = [...largos].sort((a, b) => b - a)
    // Solo importa cuando la que destaca ES la correcta: un distractor largo no delata nada.
    if (largos[correcta] === ordenados[0] && ordenados[0] - ordenados[1] >= DESTAQUE) {
      failures.push(
        `${name}[${index}]: la correcta tiene ${ordenados[0]} palabras y la siguiente ${ordenados[1]}; se acierta por longitud. Alarga los distractores, no acortes la correcta.`,
      )
    }
  }
}

/**
 * El banco de opción del motor de análisis del enunciado.
 *
 * Se añade porque ese motor pasó la revisión sin que nadie lo mirase: el ✅ de código
 * cubría el fichero de datos, no el motor. Medido sobre sus 20 preguntas antes de tocarlo:
 *
 *  - 7 textos distintos para 60 ranuras de distractor; dos frases genéricas salían 20 veces
 *    cada una. En 15 de 15 preguntas posteriores a la primera de su tipo, los tres
 *    distractores ya se habían visto y la correcta no: se acertaba eligiendo el texto nuevo.
 *  - En un nivel entero la correcta sacaba entre 31 y 44 palabras al distractor más largo,
 *    en los cinco tipos.
 *  - La rotación cíclica dejaba la secuencia C-B-A-C idéntica en tres de los cinco tipos.
 *  - Las correctas eran campos del TIPO, que la propia página imprime más arriba.
 *  - Los tres distractores compartían un único mensaje de error.
 *
 * Las seis cosas se comprueban aquí. Ninguna se puede estimar a ojo: por eso el guardián.
 */
const drills = loadModule(path.join(task2, 'analisis-pregunta', 'analysis-drills.ts'), (id) => {
  if (id.includes('shuffle-options')) return loadModule(path.join(repoRoot, 'src', 'lib', 'practica', 'shuffle-options.ts'), () => ({}))
  if (id.includes('prompt-analysis-data')) return analysis
  return introduction
})

const drillsByType = Object.entries(drills.ANALYSIS_DRILLS ?? {})
if (drillsByType.length !== EXPECTED_TYPES.length) {
  failures.push(`ANALYSIS_DRILLS tiene ${drillsByType.length} tipos; se esperaban ${EXPECTED_TYPES.length}.`)
}

/** Todo lo que la página imprime en el panel de la familia: nada de esto puede ser respuesta. */
const camposDelTipo = new Set()
for (const lesson of introduction.ESSAY_TYPES ?? []) {
  for (const field of ['signal', 'mustAnswer', 'bodyOne', 'bodyTwo', 'conclusion', 'trap', 'position']) {
    if (lesson[field]) camposDelTipo.add(lesson[field])
  }
}
const enunciadosResueltos = new Set((introduction.ESSAY_TYPES ?? []).map((lesson) => lesson.examples[0]?.prompt))

const usoDistractor = new Map()
const secuencias = new Set()

for (const [type, list] of drillsByType) {
  const vistos = new Set()
  secuencias.add(list.map((drill) => 'ABCD'[drill.correct] ?? '?').join(''))

  // Reparto: con cuatro preguntas y cuatro opciones, cada letra sale exactamente una vez.
  const letras = new Set(list.map((drill) => drill.correct))
  if (list.length === 4 && letras.size !== 4) {
    failures.push(`${type}: la letra correcta se repite dentro de la pestaña (${list.map((d) => 'ABCD'[d.correct]).join('-')}). Reparte por bloques con placeFirstAsCorrect.`)
  }

  for (const [index, drill] of list.entries()) {
    const etiqueta = `análisis/${type}[${index + 1}]`
    const correcta = drill.options?.[drill.correct]
    if (!correcta) { failures.push(`${etiqueta}: sin opción correcta.`); continue }

    // La respuesta no puede estar impresa más arriba, ni salir del ejemplo ya resuelto.
    if (camposDelTipo.has(correcta.text)) {
      failures.push(`${etiqueta}: la correcta «${correcta.text.slice(0, 60)}…» es un campo del tipo, y la página lo imprime en el panel de familia. Usa un campo del ejemplo.`)
    }
    if (enunciadosResueltos.has(drill.prompt)) {
      failures.push(`${etiqueta}: usa el enunciado del «Worked example», que ya está resuelto encima.`)
    }

    // Un mensaje por opción: si los tres errores comparten frase, no enseñan cuál falló.
    const porques = new Set(drill.options.map((option) => option.why))
    if (porques.size !== drill.options.length) {
      failures.push(`${etiqueta}: ${porques.size} explicaciones para ${drill.options.length} opciones. Cada distractor explica por qué falla ÉL.`)
    }

    // Longitud: un empate no delata; lo que delata es ganar en solitario por mucho.
    const largos = drill.options.map((option) => contar(option.text))
    const ordenados = [...largos].sort((a, b) => b - a)
    if (largos[drill.correct] === ordenados[0] && ordenados[0] - ordenados[1] >= DESTAQUE) {
      failures.push(`${etiqueta}: la correcta tiene ${ordenados[0]} palabras y la siguiente ${ordenados[1]}; se acierta por longitud.`)
    }

    // El atajo que hacía el motor viejo inservible: elegir el único texto que no habías visto.
    const distractores = drill.options.filter((_, position) => position !== drill.correct)
    if (index > 0 && distractores.every((option) => vistos.has(option.text)) && !vistos.has(correcta.text)) {
      failures.push(`${etiqueta}: los tres distractores ya salieron antes y la correcta no. Se acierta eligiendo el texto nuevo, sin leer.`)
    }
    for (const option of drill.options) vistos.add(option.text)
    for (const option of distractores) usoDistractor.set(option.text, (usoDistractor.get(option.text) ?? 0) + 1)
  }
}

// Reciclaje: dos frases de relleno repetidas veinte veces es lo que había antes.
const RECICLAJE_MAXIMO = 6
for (const [text, veces] of usoDistractor) {
  if (veces > RECICLAJE_MAXIMO) {
    failures.push(`El distractor «${text.slice(0, 60)}…» sale ${veces} veces en el motor de análisis (máximo ${RECICLAJE_MAXIMO}). Los distractores son respuestas reales de otros enunciados, no frases de relleno.`)
  }
}
if (secuencias.size === 1 && drillsByType.length > 1) {
  failures.push('Los cinco tipos comparten la misma secuencia de letras correctas: se memoriza una y se aprueban los cinco.')
}

/**
 * El banco de Tarea Completa.
 *
 * Tenía CUATRO enunciados, de las cinco familias que enseña el resto del curso: se podía
 * terminar Task 2 sin haber escrito nunca una de ventajas y desventajas. Y sus modelos no
 * tenían relación con ningún otro ejercicio, así que el enunciado sobre el que acababas de
 * practicar Body 1 no volvía a aparecer.
 *
 * Ahora son 25, compuestos de los párrafos que ya existen. Esto vigila las tres cosas que
 * pueden romper esa composición sin que nada se ponga rojo:
 *
 *  - que sigan siendo los mismos enunciados que el resto de Task 2 (si alguien edita un
 *    enunciado en body-1, aquí tiene que cambiar solo, no quedarse desincronizado),
 *  - que ningún modelo baje de 250 palabras, que es el mínimo que la propia tarea exige
 *    —diez de los dieciséis componibles salían por debajo antes de completarlos—,
 *  - y que no falte ningún párrafo, porque un «ensayo modelo» de tres párrafos no es uno.
 */
const bodyOne = loadModule(path.join(task2, 'body-1', 'body-one-data.ts'), () => introduction)
const bodyTwo = loadModule(path.join(task2, 'body-2', 'body-two-data.ts'), (id) => id.includes('body-one') ? bodyOne : introduction)
const conclusion = loadModule(path.join(task2, 'conclusion', 'conclusion-data.ts'), (id) =>
  id.includes('body-one') ? bodyOne : id.includes('body-two') ? bodyTwo : introduction)
const bank = loadModule(path.join(task2, 'tarea-completa', 'task2-prompt-bank.ts'), (id) => {
  if (id.includes('body-one')) return bodyOne
  if (id.includes('body-two')) return bodyTwo
  if (id.includes('conclusion-data')) return conclusion
  return introduction
})

const PALABRAS_MINIMAS = 250
const PARRAFOS = ['Introduction', 'Body 1', 'Body 2', 'Conclusion']
const prompts = bank.TASK2_PROMPT_BANK ?? []
const esperados = EXPECTED_TYPES.length * EXPECTED_EXAMPLES

if (prompts.length !== esperados) {
  failures.push(`Tarea Completa tiene ${prompts.length} enunciados; se esperaban ${esperados} (${EXPECTED_TYPES.length} familias × ${EXPECTED_EXAMPLES}).`)
}
for (const type of EXPECTED_TYPES) {
  const cuantos = prompts.filter((item) => item.essayType === type).length
  if (cuantos !== EXPECTED_EXAMPLES) {
    failures.push(`Tarea Completa: ${cuantos} enunciados de «${type}», se esperaban ${EXPECTED_EXAMPLES}. Practicar cuatro familias de cinco deja una sin escribir nunca.`)
  }
}

/** Los enunciados canónicos son los del cuerpo: el banco no puede escaparse de ellos. */
const canonicos = new Set((bodyOne.BODY_ONE_LESSONS ?? []).flatMap((lesson) => lesson.examples.map((example) => example.prompt)))
const idsBanco = new Set()
const enunciadosBanco = new Set()

for (const item of prompts) {
  const etiqueta = `tarea-completa/${item.title ?? '(sin título)'}`
  if (idsBanco.has(item.id)) failures.push(`${etiqueta}: identificador repetido «${item.id}».`)
  idsBanco.add(item.id)
  if (enunciadosBanco.has(item.prompt)) failures.push(`${etiqueta}: enunciado repetido.`)
  enunciadosBanco.add(item.prompt)

  if (!canonicos.has(item.prompt)) {
    failures.push(`${etiqueta}: su enunciado no existe en body-1. El banco se compone de esos párrafos; si el enunciado se separa, el modelo deja de corresponder al ejercicio.`)
  }

  const etiquetas = (item.model ?? []).map((paragraph) => paragraph.label)
  for (const nombre of PARRAFOS) {
    if (!etiquetas.includes(nombre)) failures.push(`${etiqueta}: al modelo le falta «${nombre}».`)
  }
  for (const paragraph of item.model ?? []) {
    if (!paragraph.text?.trim()) failures.push(`${etiqueta}: «${paragraph.label}» está vacío.`)
    if (!paragraph.job?.trim()) failures.push(`${etiqueta}: «${paragraph.label}» no dice qué hace.`)
  }
  if (item.modelWords < PALABRAS_MINIMAS) {
    failures.push(`${etiqueta}: el modelo tiene ${item.modelWords} palabras. La tarea exige ${PALABRAS_MINIMAS}: un modelo por debajo enseña lo contrario de lo que pide.`)
  }
  if (!item.watchFor?.length) {
    failures.push(`${etiqueta}: sin errores típicos que revisar. Es lo que sustituye a la puntuación automática.`)
  }
}

/**
 * Ningún área de escritura de Task 2 puede llevar corrector ortográfico.
 *
 * En el examen no hay subrayado rojo. Verlo aquí entrena a esperar un aviso que el día de la
 * prueba no va a aparecer, y a no releer buscando erratas. Había **doce** áreas con el
 * corrector activo repartidas por introducción, Body 1 y Body 2, más las de Tarea Completa.
 *
 * Se comprueba sobre el FUENTE y no en el navegador a propósito: la mitad de esas áreas
 * viven detrás de un paso bloqueado, así que un test de navegador solo ve las que haya
 * conseguido desbloquear. Aquí se ven todas, incluidas las que alguien añada mañana.
 */
function tsxRecursivo(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return tsxRecursivo(full)
    return entry.name.endsWith('.tsx') ? [full] : []
  })
}

/**
 * Devuelve el texto de cada etiqueta `<textarea …>`, hasta su `>` de cierre.
 *
 * No vale un regex que pare en el primer «mayor que». El primer intento marcó como
 * defectuosas siete áreas que YA estaban corregidas, porque la flecha de `onChange` lleva
 * un «mayor que» dentro y cortaba la etiqueta antes de llegar al atributo. Hay que contar
 * llaves y parar en el cierre que esté a nivel cero.
 */
function etiquetasTextarea(source) {
  const tags = []
  let from = source.indexOf('<textarea')
  while (from !== -1) {
    let depth = 0
    let index = from
    for (; index < source.length; index += 1) {
      const char = source[index]
      if (char === '{') depth += 1
      else if (char === '}') depth -= 1
      else if (char === '>' && depth === 0) break
    }
    tags.push(source.slice(from, index + 1))
    from = source.indexOf('<textarea', index)
  }
  return tags
}

/* ── El curso construye UN ensayo, no seis ejercicios sueltos ────────────────────────
 *
 * `introduction-data.ts` usaba NUEVE enunciados que no existían en ningún otro módulo:
 * toda la familia de discusión y cuatro de cinco de opinión. Escribías la introducción de
 * «team sports» y en Body 1 te encontrabas «museums». «Build the essay · Step 1 a 6» no
 * construía el mismo ensayo en 9 de 25 casos, y las rutas por tipo tenían que avisarlo.
 *
 * Tres de los cuatro de opinión eran además el MISMO enunciado mal copiado, con la
 * instrucción cambiada: «To what extent» donde el resto del curso dice «Do you agree», que
 * es justamente la diferencia que enseña la fila «Scope». Y la introducción de acceso
 * universitario defendía lo contrario que su propio Body 2.
 *
 * Esta comprobación exige que cada enunciado de la introducción exista en los otros cuatro
 * módulos. Es la que impide que vuelva a pasar.
 */
const cadena = [
  ['analisis', lessons],
  ['body-1', bodyOne.BODY_ONE_LESSONS ?? []],
  ['body-2', bodyTwo.BODY_TWO_LESSONS ?? []],
  ['conclusion', conclusion.CONCLUSION_LESSONS ?? []],
]
const normalizar = (value) => value.trim().replace(/\s+/gu, ' ')

for (const tipo of introduction.ESSAY_TYPES ?? []) {
  for (const ejemplo of tipo.examples) {
    const enunciado = normalizar(ejemplo.prompt)
    const faltan = cadena
      .filter(([, lista]) => {
        const leccion = lista.find((item) => item.id === tipo.id)
        return !leccion?.examples.some((otro) => normalizar(otro.prompt) === enunciado)
      })
      .map(([nombre]) => nombre)
    if (faltan.length) {
      failures.push(
        `introduccion/${tipo.id}/${ejemplo.title}: su enunciado no existe en ${faltan.join(', ')}. ` +
        'El alumno escribiría la introducción de un enunciado y el cuerpo de otro.',
      )
    }
  }
}

/* ── Tipo de ensayo: la escalera, las pistas que delatan y el feedback por opción ─────
 *
 * Los tres defectos que se midieron en esta unidad no se ven leyendo el fichero, y por eso
 * duraron tanto:
 *
 *   · Las cinco primeras respuestas caían en las posiciones 0,1,2,3,4 de una rejilla de
 *     orden fijo. Se acertaban sin leer el enunciado.
 *   · Cinco de las nueve pistas imprimían el nombre del tipo correcto, así que el segundo
 *     intento no era un intento y aun así sumaba un punto.
 *   · La explicación era la misma eligieras lo que eligieras.
 */
const essayTypes = loadModule(path.join(task2, 'tipo-ensayo', 'essay-type-drills.ts'), () => introduction)
const typeDrills = essayTypes.TYPE_DRILLS ?? []
const typeOptions = (essayTypes.TYPE_OPTIONS ?? []).map((option) => option.id)
const misreadCases = essayTypes.MISREAD_CASES ?? []

if (typeDrills.length < 10) {
  failures.push(`tipo-ensayo: ${typeDrills.length} enunciados; hacen falta al menos 10 para cubrir las cinco familias dos veces.`)
}

// 1 · La escalera. Ningún tramo puede recorrer la rejilla hacia arriba ni hacia abajo.
const posiciones = typeDrills.map((drill) => typeOptions.indexOf(drill.answer))
if (posiciones.some((position) => position < 0)) {
  failures.push('tipo-ensayo: alguna respuesta no corresponde a ninguna de las cinco categorías.')
} else {
  let escalera = 1
  let peor = 1
  for (let index = 1; index < posiciones.length; index += 1) {
    const salto = posiciones[index] - posiciones[index - 1]
    const anterior = posiciones[index - 1] - posiciones[index - 2]
    escalera = index > 1 && salto === anterior && Math.abs(salto) === 1 ? escalera + 1 : Math.abs(salto) === 1 ? 2 : 1
    peor = Math.max(peor, escalera)
  }
  if (peor >= 4) {
    failures.push(
      `tipo-ensayo: la respuesta correcta recorre la rejilla en escalera durante ${peor} preguntas seguidas (${posiciones.join(',')}). Se acierta sin leer.`,
    )
  }
  const reparto = typeOptions.map((id) => typeDrills.filter((drill) => drill.answer === id).length)
  if (Math.max(...reparto) - Math.min(...reparto) > 1) {
    failures.push(`tipo-ensayo: reparto desigual de la respuesta correcta entre las cinco categorías (${reparto.join(',')}).`)
  }
}

// 2 · Una pista dice dónde mirar, nunca qué contestar.
const nombreDe = new Map((essayTypes.TYPE_OPTIONS ?? []).map((option) => [option.id, option.label]))
for (const drill of typeDrills) {
  const nombre = nombreDe.get(drill.answer) ?? ''
  if (nombre && drill.hint.toLowerCase().includes(nombre.toLowerCase())) {
    failures.push(`tipo-ensayo/${drill.id}: la pista imprime «${nombre}». El segundo intento deja de ser un intento.`)
  }
}

// 3 · Cada opción equivocada explica por qué falla ELLA, y ningún mensaje se repite.
for (const conjunto of [
  { lista: typeDrills, correcta: (drill) => drill.answer, etiqueta: 'tipo-ensayo' },
  { lista: misreadCases, correcta: (item) => item.wrote, etiqueta: 'tipo-ensayo/caso' },
]) {
  for (const item of conjunto.lista) {
    const equivocadas = typeOptions.filter((id) => id !== conjunto.correcta(item))
    const mensajes = equivocadas.map((id) => (item.wrong?.[id] ?? '').trim())
    const vacios = equivocadas.filter((id, index) => mensajes[index].length < 40)
    if (vacios.length) {
      failures.push(`${conjunto.etiqueta}/${item.id}: ${vacios.length} opción(es) sin explicación propia (${vacios.join(', ')}).`)
    }
    if (new Set(mensajes).size !== mensajes.length) {
      failures.push(`${conjunto.etiqueta}/${item.id}: dos opciones comparten el mismo mensaje.`)
    }
  }
}

/* ── Párrafos de cuerpo: un diagnóstico que se pueda fallar ───────────────────────────
 *
 * El defecto medido: las cuatro observaciones del diagnóstico eran las cuatro verdaderas y
 * el campo `correct` no lo leía nadie. Pulsando los cuatro botones la página felicitaba. Un
 * ejercicio de detectar defectos donde todo lo que se ofrece ES un defecto no detecta nada.
 */
const bodyParagraphs = loadModule(path.join(task2, 'parrafos-cuerpo', 'body-paragraph-drills.ts'), () => introduction)
const observaciones = bodyParagraphs.DIAGNOSTIC?.observations ?? []
const bodyDrills = bodyParagraphs.BODY_DRILLS ?? []

const falsas = observaciones.filter((item) => !item.real)
const verdaderas = observaciones.filter((item) => item.real)
if (verdaderas.length < 3 || falsas.length < 2) {
  failures.push(
    `parrafos-cuerpo: el diagnóstico tiene ${verdaderas.length} defecto(s) real(es) y ${falsas.length} señuelo(s). Sin señuelos, marcarlo todo aprueba y no se diagnostica nada.`,
  )
}
for (const item of observaciones) {
  if ((item.why ?? '').trim().length < 60) {
    failures.push(`parrafos-cuerpo/${item.id}: sin explicación propia. Cada observación dice por qué lo es o por qué no.`)
  }
}
if (new Set(observaciones.map((item) => item.why)).size !== observaciones.length) {
  failures.push('parrafos-cuerpo: dos observaciones del diagnóstico comparten explicación.')
}

// Cada caja de escritura anuncia un mínimo y tiene un modelo con el que compararse.
for (const drill of bodyDrills) {
  for (const field of drill.fields ?? []) {
    if (!(field.minWords > 0)) {
      failures.push(`parrafos-cuerpo/${drill.id}/${field.part}: sin mínimo declarado. Un botón bloqueado tiene que decir cuánto falta.`)
    }
    if ((field.model ?? '').split(/\s+/u).filter(Boolean).length < field.minWords) {
      failures.push(`parrafos-cuerpo/${drill.id}/${field.part}: el modelo no llega al mínimo que se le exige al alumno.`)
    }
  }
}

// 4 · Ninguna promesa de banda en las unidades reconstruidas, ni en pantalla ni en los datos.
for (const file of [
  path.join(task2, 'tipo-ensayo', 'TipoEnsayoClient.tsx'),
  path.join(task2, 'tipo-ensayo', 'essay-type-drills.ts'),
  path.join(task2, 'tipo-ensayo', 'page.tsx'),
  path.join(task2, 'parrafos-cuerpo', 'ParrafosCuerpoClient.tsx'),
  path.join(task2, 'parrafos-cuerpo', 'body-paragraph-drills.ts'),
  path.join(task2, 'parrafos-cuerpo', 'page.tsx'),
]) {
  const promesas = (fs.readFileSync(file, 'utf8').match(/\bBand \d/g) ?? []).length
  if (promesas) {
    failures.push(`${path.relative(repoRoot, file)}: ${promesas} promesa(s) de banda. Ninguna de estas páginas lee el texto del alumno, así que ninguna puede prometer una banda.`)
  }
}

for (const file of tsxRecursivo(task2)) {
  const source = fs.readFileSync(file, 'utf8')
  /**
   * Vale el atributo escrito, y vale también repartirlo con un spread.
   *
   * `tarea-completa` agrupa los cuatro atributos en `const noAssist = { spellCheck: false, … }`
   * y los reparte con `{...noAssist}`, que es mejor código que repetirlos seis veces. El
   * guardián lo marcaba como defectuoso: exigía la forma, no la propiedad.
   */
  const spreadsSinCorrector = new Set(
    [...source.matchAll(/const (\w+) = \{[^}]*spellCheck: false/g)].map((match) => `{...${match[1]}}`),
  )
  const llevaCorrectorApagado = (tag) =>
    tag.includes('spellCheck={false}') || [...spreadsSinCorrector].some((spread) => tag.includes(spread))
  const sinCorrector = etiquetasTextarea(source).filter((tag) => !llevaCorrectorApagado(tag)).length
  if (sinCorrector) {
    failures.push(
      `${path.relative(repoRoot, file)}: ${sinCorrector} área(s) de escritura sin \`spellCheck={false}\`. En el examen no hay corrector.`,
    )
  }
}

/**
 * PARÁFRASIS — las cinco técnicas y su motor.
 *
 * Se añade con la unidad, no después, porque la unidad se construyó para no repetir los seis
 * defectos que la auditoría de agosto de 2026 encontró en las ocho unidades de Task 1, y sin
 * guardián nada impide que vuelvan:
 *
 *  1. La lección imprimía la respuesta y el motor preguntaba por ella (entre el 8 % y el 91 %
 *     de las respuestas, según la unidad).
 *  2. La correcta se reconocía por ser la más larga.
 *  3. Un solo mensaje de error para las cuatro opciones.
 *  4. El reparto de la correcta lo hacía una rotación, que conserva el orden relativo.
 *
 * Las cuatro se miden aquí. Ninguna se puede estimar a ojo: la primera exige comparar cada
 * respuesta contra todo el texto de las lecciones, y la segunda contar palabras en 32 bancos.
 */
const PARA_FUGA = 0.7
const paraphrasing = loadModule(path.join(task2, 'paraphrasing', 'paraphrasing-data.ts'), () => ({}))
const paraEngine = loadModule(path.join(task2, 'paraphrasing', 'paraphrasing-engine-data.ts'), () => ({}))

const techniques = paraphrasing.PARAPHRASE_TECHNIQUES ?? []
const engineDrills = paraEngine.ENGINE_DRILLS ?? []

if (techniques.length !== 5) {
  failures.push(`Paráfrasis: hay ${techniques.length} técnicas; el material de clase define 5.`)
}
if (engineDrills.length !== 12) {
  failures.push(`Paráfrasis: el motor tiene ${engineDrills.length} ejercicios; se esperaban 12 (4 por nivel).`)
}

/** Todo lo que la lección IMPRIME. Es contra esto contra lo que no puede preguntar el motor. */
const textoLecciones = techniques.flatMap((technique) => [
  technique.howItWorks?.original, technique.howItWorks?.rewritten, technique.howItWorks?.plain,
  ...(technique.meaningCheck?.options ?? []).map((option) => option.text),
  ...(technique.examples ?? []).flatMap((example) => [example.original, example.rewritten]),
  ...(technique.mistakes ?? []).flatMap((mistake) => [mistake.wrong, mistake.right]),
  ...(technique.drills ?? []).flatMap((drill) => [drill.original, ...drill.options.map((option) => option.text)]),
].filter(Boolean)).join(' \n ')

const enLaLeccion = new Set(words(textoLecciones))

/**
 * Por SOLAPAMIENTO de palabras con carga, no por subcadena.
 *
 * En `procesos` la primera versión de esta comprobación usaba `includes` y la prueba de
 * mordida la tumbó: «The flakes are heated and turned into pellets» no es subcadena de «The
 * flakes are then heated and turned into plastic pellets», y es la misma frase.
 */
const solape = (texto, vocabulario) => {
  const suyas = new Set(words(texto ?? ''))
  if (suyas.size < 4) return 0
  return [...suyas].filter((word) => vocabulario.has(word)).length / suyas.size
}

for (const drill of engineDrills) {
  for (const campo of ['original', 'rewrite']) {
    const dentro = solape(drill[campo], enLaLeccion)
    if (dentro >= PARA_FUGA) {
      failures.push(
        `Paráfrasis motor (nivel ${drill.level}): el ${Math.round(dentro * 100)} % de «${String(drill[campo]).slice(0, 50)}…» ya está en las lecciones. El motor tiene que practicar sobre frases nuevas.`,
      )
    }
  }
}

/** Y dentro de cada técnica: sus ejercicios no pueden preguntar por sus propios ejemplos. */
for (const technique of techniques) {
  const suyo = new Set(words([
    technique.howItWorks?.original, technique.howItWorks?.rewritten,
    ...(technique.examples ?? []).flatMap((example) => [example.original, example.rewritten]),
  ].filter(Boolean).join(' \n ')))

  for (const drill of technique.drills ?? []) {
    const dentro = solape(drill.original, suyo)
    if (dentro >= PARA_FUGA) {
      failures.push(
        `Paráfrasis/${technique.slug}: el ejercicio «${String(drill.original).slice(0, 45)}…» repite un ejemplo resuelto de su propia lección (${Math.round(dentro * 100)} %).`,
      )
    }
  }
}

/**
 * Los bancos de opción: silueta, motivos y estructura.
 *
 * Se recorren los 32 bancos —20 de las técnicas y 12 del motor— con el mismo criterio que el
 * resto del curso: `DESTAQUE` palabras de diferencia delatan la correcta a simple vista, y la
 * correcta no puede ser la más larga en más de la mitad de las preguntas de un banco.
 */
const bancos = [
  ...techniques.flatMap((technique) => (technique.drills ?? []).map((drill) => [`${technique.slug}`, drill])),
  ...engineDrills.map((drill) => [`motor nivel ${drill.level}`, drill]),
]

const masLarga = new Map()
for (const [etiqueta, drill] of bancos) {
  const largos = drill.options.map((option) => option.text.trim().split(/\s+/u).length)
  const correcta = largos[drill.correct]
  const mejorDistractor = Math.max(...largos.filter((_, index) => index !== drill.correct))

  if (correcta - mejorDistractor >= DESTAQUE) {
    failures.push(
      `Paráfrasis/${etiqueta}: la correcta saca ${correcta - mejorDistractor} palabras al mejor distractor en «${String(drill.original).slice(0, 40)}…». Se acierta por silueta. Alarga distractores; no acortes la correcta.`,
    )
  }
  /**
   * ESTRICTAMENTE más larga, no empatada.
   *
   * La primera versión contaba `correcta === Math.max(...)`, y eso marca como defectuoso un
   * banco cuyas cuatro opciones miden lo mismo. Cuatro opciones de doce palabras no delatan
   * nada: la silueta solo funciona cuando UNA sobresale. Medido sobre estos 32 bancos, la
   * versión anterior acusaba a nueve ejercicios de los que siete estaban empatados.
   */
  if (correcta > mejorDistractor) masLarga.set(etiqueta, (masLarga.get(etiqueta) ?? 0) + 1)

  // Un mensaje por opción. Con uno solo para las cuatro, quien falla no aprende por qué.
  const motivos = drill.options.map((option) => option.why?.trim())
  if (motivos.some((why) => !why)) failures.push(`Paráfrasis/${etiqueta}: hay opciones sin motivo propio.`)
  if (new Set(motivos).size !== motivos.length) failures.push(`Paráfrasis/${etiqueta}: dos opciones comparten el mismo motivo.`)
  if (drill.options.length !== 4) failures.push(`Paráfrasis/${etiqueta}: ${drill.options.length} opciones; se esperaban 4.`)
}

const totalPorBanco = new Map()
for (const [etiqueta] of bancos) totalPorBanco.set(etiqueta, (totalPorBanco.get(etiqueta) ?? 0) + 1)
for (const [etiqueta, veces] of masLarga) {
  const total = totalPorBanco.get(etiqueta) ?? 0
  if (veces * 2 > total) {
    failures.push(
      `Paráfrasis/${etiqueta}: la correcta es la más larga en ${veces} de ${total}. Por encima de la mitad se acierta sin leer.`,
    )
  }
}

/** El ejercicio de reconocimiento: tres opciones y exactamente una que conserva el significado. */
for (const technique of techniques) {
  const opciones = technique.meaningCheck?.options ?? []
  const conservan = opciones.filter((option) => option.keeps).length
  if (opciones.length !== 3) failures.push(`Paráfrasis/${technique.slug}: el reconocimiento tiene ${opciones.length} opciones; se esperaban 3.`)
  if (conservan !== 1) failures.push(`Paráfrasis/${technique.slug}: ${conservan} opciones conservan el significado; tiene que haber exactamente una.`)
  if (!(technique.moves ?? []).some((move) => move.risk === 'trap')) {
    failures.push(`Paráfrasis/${technique.slug}: ningún movimiento marcado como «trap». Cada técnica tiene un sitio donde se rompe el significado.`)
  }
}

/**
 * El reparto de la correcta lo hace `placeOption`, no una rotación.
 *
 * Se busca la LLAMADA con su primer argumento, no el nombre suelto: la primera versión de
 * esta comprobación en Task 1 se quedaba satisfecha con un `import placeOption` que había
 * sobrevivido al renombrado de la llamada.
 */
for (const [fichero, llamada] of [
  ['paraphrasing/ParaphrasingTechniqueClient.tsx', 'placeOption(drill.options'],
  ['paraphrasing/ParaphrasingEngine.tsx', 'placeOption(current.options'],
]) {
  const source = fs.readFileSync(path.join(task2, fichero), 'utf8')
  if (!source.includes(llamada)) {
    failures.push(`${fichero}: no reparte la correcta con \`${llamada}…\`. Una rotación conserva el orden relativo de los distractores.`)
  }
}

/**
 * VOCABULARIO ACADÉMICO — las ocho funciones y su motor.
 *
 * Mismas seis reglas que la paráfrasis, por el mismo motivo: la unidad se construyó para no
 * repetir los defectos de las ocho unidades de Task 1, y sin guardián nada lo impide. Se
 * añaden dos propias de esta unidad:
 *
 *  · Cada palabra lleva su PATRÓN. Una lista de palabras sin la construcción que exigen es
 *    exactamente lo que produce «detrimental for» y «subsidise to».
 *  · Cada función lleva su comparador VAGO → PRECISO con lo que gana, y ese `earns` no puede
 *    contener un número de banda: ninguna página del curso le promete una nota a nadie.
 */
const vocabulary = loadModule(path.join(task2, 'academic-vocabulary', 'vocabulary-data.ts'), () => ({}))
const vocabEngine = loadModule(path.join(task2, 'academic-vocabulary', 'vocabulary-engine-data.ts'), () => ({}))

const funciones = vocabulary.VOCAB_FUNCTIONS ?? []
const vocabDrills = vocabEngine.ENGINE_DRILLS ?? []

if (funciones.length !== 8) failures.push(`Vocabulario: hay ${funciones.length} funciones; se esperaban 8.`)
if (vocabDrills.length !== 12) failures.push(`Vocabulario: el motor tiene ${vocabDrills.length} ejercicios; se esperaban 12.`)

/** Conectar NO puede estar aquí: lo cubren las siete familias de `linking-language`. */
if (funciones.some((f) => /linking|connect|cohesion/i.test(f.slug))) {
  failures.push('Vocabulario: una función duplica lo que ya enseña `linking-language`. Los conectores tienen sus siete familias.')
}

const textoVocab = funciones.flatMap((f) => [
  f.upgrade?.vague, f.upgrade?.precise, f.upgrade?.why,
  ...(f.check?.options ?? []).map((o) => o.text),
  ...(f.examples ?? []).map((e) => e.sentence),
  ...(f.mistakes ?? []).flatMap((m) => [m.wrong, m.right]),
  ...(f.drills ?? []).flatMap((d) => [d.stem, ...d.options.map((o) => o.text)]),
].filter(Boolean)).join(' \n ')

const enLasFunciones = new Set(words(textoVocab))

for (const drill of vocabDrills) {
  const dentro = solape(drill.sentence, enLasFunciones)
  if (dentro >= PARA_FUGA) {
    failures.push(
      `Vocabulario motor (nivel ${drill.level}): el ${Math.round(dentro * 100)} % de «${String(drill.sentence).slice(0, 50)}…» ya está en las lecciones.`,
    )
  }
}

const bancosVocab = [
  ...funciones.flatMap((f) => (f.drills ?? []).map((d) => [f.slug, { ...d, original: d.stem }])),
  ...vocabDrills.map((d) => [`motor nivel ${d.level}`, { ...d, original: d.sentence }]),
]

const masLargaVocab = new Map()
const totalVocab = new Map()
for (const [etiqueta, drill] of bancosVocab) {
  totalVocab.set(etiqueta, (totalVocab.get(etiqueta) ?? 0) + 1)
  const largos = drill.options.map((o) => o.text.trim().split(/\s+/u).length)
  const correcta = largos[drill.correct]
  const mejorDistractor = Math.max(...largos.filter((_, i) => i !== drill.correct))

  if (correcta - mejorDistractor >= DESTAQUE) {
    failures.push(
      `Vocabulario/${etiqueta}: la correcta saca ${correcta - mejorDistractor} palabras al mejor distractor en «${String(drill.original).slice(0, 40)}…». Alarga distractores; no acortes la correcta.`,
    )
  }
  if (correcta > mejorDistractor) masLargaVocab.set(etiqueta, (masLargaVocab.get(etiqueta) ?? 0) + 1)

  const motivos = drill.options.map((o) => o.why?.trim())
  if (motivos.some((why) => !why)) failures.push(`Vocabulario/${etiqueta}: hay opciones sin motivo propio.`)
  if (new Set(motivos).size !== motivos.length) failures.push(`Vocabulario/${etiqueta}: dos opciones comparten el mismo motivo.`)
  if (drill.options.length !== 4) failures.push(`Vocabulario/${etiqueta}: ${drill.options.length} opciones; se esperaban 4.`)
}
for (const [etiqueta, veces] of masLargaVocab) {
  const total = totalVocab.get(etiqueta) ?? 0
  if (veces * 2 > total) {
    failures.push(`Vocabulario/${etiqueta}: la correcta es la más larga en ${veces} de ${total}. Por encima de la mitad se acierta sin leer.`)
  }
}

/**
 * Motivos repetidos ENTRE bancos, no solo dentro de cada uno.
 *
 * La comprobación por banco se le escapó un caso real: un motivo del banco de `quantifying`
 * copiado al motor. Un mensaje idéntico en dos ejercicios distintos siempre significa lo
 * mismo —que se copió y pegó sin adaptarlo— y quien lo lee por segunda vez no aprende nada
 * nuevo de su fallo. El primero en cazarlo fue el test e2e, que sí medía en global; esta
 * comprobación existe para que el fallo se vea antes, en el build.
 */
for (const [nombre, bancoCompleto] of [['Paráfrasis', bancos], ['Vocabulario', bancosVocab]]) {
  const donde = new Map()
  for (const [etiqueta, drill] of bancoCompleto) {
    for (const option of drill.options) {
      const why = option.why?.trim()
      if (!why) continue
      if (donde.has(why)) {
        failures.push(`${nombre}: el mismo motivo en «${donde.get(why)}» y «${etiqueta}» — «${why.slice(0, 60)}…».`)
      } else {
        donde.set(why, etiqueta)
      }
    }
  }
}

for (const f of funciones) {
  const opciones = f.check?.options ?? []
  if (opciones.length !== 3) failures.push(`Vocabulario/${f.slug}: el reconocimiento tiene ${opciones.length} opciones; se esperaban 3.`)
  if (opciones.filter((o) => o.works).length !== 1) {
    failures.push(`Vocabulario/${f.slug}: tiene que haber exactamente una opción que haga bien el trabajo.`)
  }

  // El patrón es la mitad de la enseñanza: una palabra sin su construcción produce
  // «detrimental for» y «subsidise to», que es justo lo que esta unidad viene a evitar.
  for (const palabra of f.words ?? []) {
    if (!palabra.pattern?.trim()) failures.push(`Vocabulario/${f.slug}: «${palabra.text}» no declara su patrón.`)
  }
  if (!(f.words ?? []).some((w) => w.risk === 'avoid')) {
    failures.push(`Vocabulario/${f.slug}: ninguna entrada marcada como «avoid». Cada función tiene su palabra que parece que sirve y no sirve.`)
  }

  // El comparador vago → preciso, y sin prometer ninguna banda.
  for (const campo of ['vague', 'precise', 'why']) {
    if (!f.upgrade?.[campo]?.trim()) failures.push(`Vocabulario/${f.slug}: falta «upgrade.${campo}».`)
  }
  if (!(f.upgrade?.earns ?? []).length) failures.push(`Vocabulario/${f.slug}: el comparador no dice qué gana la versión precisa.`)
  if ((f.upgrade?.earns ?? []).some((earn) => /\d/.test(earn))) {
    failures.push(`Vocabulario/${f.slug}: «earns» lleva un número. Ninguna página del curso le promete una banda a nadie.`)
  }
}

for (const [fichero, llamada] of [
  ['academic-vocabulary/VocabularyFunctionClient.tsx', 'placeOption(drill.options'],
  ['academic-vocabulary/VocabularyEngine.tsx', 'placeOption(current.options'],
]) {
  const source = fs.readFileSync(path.join(task2, fichero), 'utf8')
  if (!source.includes(llamada)) {
    failures.push(`${fichero}: no reparte la correcta con \`${llamada}…\`. Una rotación conserva el orden relativo de los distractores.`)
  }
}

/**
 * EL BLUEPRINT DE WRITING — los cuatro bloques.
 *
 * David, 12 de agosto de 2026, mirando paraphrasing terminado: «no veo el blueprint… primero
 * explicación larga y detallada, luego ejemplos, luego ejercicio guiado y luego el motor».
 *
 * Sin guardián eso se cae en la siguiente unidad que alguien escriba con prisa, y se cae en
 * silencio: una página sin explicación larga sigue compilando y sigue teniendo sus ejercicios.
 *
 * «Larga y detallada» se mide, no se estima. El umbral son 250 palabras por explicación, que
 * es aproximadamente donde una definición deja de serlo y empieza a enseñar. Las secciones
 * `cost` y `limits` son obligatorias porque son las dos que ningún material de IELTS trae:
 * qué pierdes exactamente si no lo haces, y dónde la técnica deja de aplicar.
 */
const EXPLICACION_MINIMA = 250
const PASOS_MINIMOS = 3

const explainers = loadModule(path.join(task2, 'paraphrasing', 'paraphrasing-explainers.ts'), () => ({}))
const EXPLAINERS = explainers.EXPLAINERS ?? {}
const GUIDED = explainers.GUIDED ?? {}

for (const technique of techniques) {
  const explainer = EXPLAINERS[technique.slug]
  if (!explainer) {
    failures.push(`Blueprint/${technique.slug}: sin explicación larga. Es el bloque 1 y no es opcional.`)
    continue
  }

  const palabras = [
    explainer.definition,
    ...(explainer.sections ?? []).flatMap((s) => [s.heading, ...(s.body ?? []), ...(s.points ?? []).map((p) => `${p.term} ${p.detail}`)]),
    explainer.cost, explainer.limits,
  ].filter(Boolean).join(' ').trim().split(/\s+/u).length

  if (palabras < EXPLICACION_MINIMA) {
    failures.push(`Blueprint/${technique.slug}: la explicación tiene ${palabras} palabras; el mínimo son ${EXPLICACION_MINIMA}. Una definición no es una lección.`)
  }
  if (!(explainer.sections ?? []).length) failures.push(`Blueprint/${technique.slug}: la explicación no tiene ni una sección.`)
  for (const section of explainer.sections ?? []) {
    if (!(section.body ?? []).length) failures.push(`Blueprint/${technique.slug}: la sección «${section.heading}» no tiene párrafos.`)
  }
  if (!explainer.cost?.trim()) failures.push(`Blueprint/${technique.slug}: falta «cost» — qué se pierde si no se hace.`)
  if (!explainer.limits?.trim()) failures.push(`Blueprint/${technique.slug}: falta «limits» — dónde deja de aplicar.`)

  const guided = GUIDED[technique.slug]
  if (!guided) {
    failures.push(`Blueprint/${technique.slug}: sin ejercicio guiado. Es el bloque 3, el escalón entre el ejemplo y el motor.`)
    continue
  }
  if ((guided.steps ?? []).length < PASOS_MINIMOS) {
    failures.push(`Blueprint/${technique.slug}: el guiado tiene ${(guided.steps ?? []).length} pasos; el mínimo son ${PASOS_MINIMOS}.`)
  }
  for (const [i, step] of (guided.steps ?? []).entries()) {
    for (const campo of ['instruction', 'hint', 'placeholder', 'model', 'why']) {
      if (!step[campo]?.trim()) failures.push(`Blueprint/${technique.slug}: al paso ${i + 1} del guiado le falta «${campo}».`)
    }
    /**
     * El mínimo de palabras es el andamio entero. Sin él, el botón que revela el modelo se
     * pulsa cuatro veces seguidas sin escribir nada, y el ejercicio guiado se convierte en un
     * ejemplo resuelto partido en trozos —que es justo lo que ya existía más arriba.
     */
    if (!(step.minWords > 0)) failures.push(`Blueprint/${technique.slug}: el paso ${i + 1} no exige escribir nada antes de revelar el modelo.`)
  }
  if (!guided.brief?.trim() || !guided.goal?.trim() || !guided.result?.trim()) {
    failures.push(`Blueprint/${technique.slug}: al guiado le falta el material, el objetivo o el resultado.`)
  }
}

/**
 * Los componentes compartidos del blueprint viven en `writing/_shared`, FUERA de `task2`, así
 * que el barrido de `spellCheck` de más abajo no los veía. `GuidedPractice` tiene un área de
 * escritura en cada paso: si se publica con el corrector encendido, el ejercicio deja de
 * parecerse al examen justo en la parte donde se escribe.
 */
const shared = path.join(repoRoot, 'src', 'app', '(site)', 'practica', 'ielts', 'academic', 'writing', '_shared')
if (fs.existsSync(shared)) {
  for (const file of fs.readdirSync(shared).filter((name) => name.endsWith('.tsx'))) {
    const source = fs.readFileSync(path.join(shared, file), 'utf8')
    const sinCorrector = etiquetasTextarea(source).filter((tag) => !tag.includes('spellCheck={false}')).length
    if (sinCorrector) {
      failures.push(`_shared/${file}: ${sinCorrector} área(s) de escritura sin \`spellCheck={false}\`. En el examen no hay corrector.`)
    }
  }
}

/**
 * EL SUPERHUB DE VOCABULARIO DE WRITING.
 *
 * Vive en `/writing/vocabulario`, fuera de Task 2, porque sirve a las dos tareas. Se vigila
 * desde aquí porque comparte blueprint, `placeOption` y la regla del patrón con el resto del
 * curso, y separar el guardián solo habría duplicado las mismas seis comprobaciones.
 *
 * La regla propia del superhub es el PATRÓN: una entrada sin la construcción que exige es
 * media entrada, y es la que produce «peaked to 40%» y «detrimental for». Publicar una lista
 * de palabras sin patrones sería exactamente el material que este superhub viene a sustituir.
 */
const vocabHub = path.join(repoRoot, 'src', 'app', '(site)', 'practica', 'ielts', 'academic', 'writing', 'vocabulario')
if (fs.existsSync(vocabHub)) {
  const indice = loadModule(path.join(vocabHub, 'vocabulary-index.ts'), (spec) =>
    /**
     * El índice importa una familia por fichero. Se resuelve por nombre en vez de con una
     * lista fija para que añadir `task2-vocabulary` —o cualquier familia futura— no exija
     * tocar el guardián: si el fichero existe, se carga.
     */
    ['task1-vocabulary', 'task2-vocabulary', 'function-vocabulary']
      .filter((nombre) => spec.includes(nombre) && fs.existsSync(path.join(vocabHub, `${nombre}.ts`)))
      .reduce((_, nombre) => loadModule(path.join(vocabHub, `${nombre}.ts`), () => ({})), {}))
  const unidades = indice.VOCAB_UNITS ?? []

  if (!unidades.length) failures.push('Superhub de vocabulario: no hay ni una unidad publicada.')

  const slugs = new Set()
  for (const unit of unidades) {
    if (slugs.has(unit.slug)) failures.push(`Superhub/${unit.slug}: slug repetido.`)
    slugs.add(unit.slug)

    // El patrón, que es la regla del superhub.
    let entradas = 0
    for (const group of unit.groups ?? []) {
      if (!group.purpose?.trim()) failures.push(`Superhub/${unit.slug}: el grupo «${group.label}» no dice qué trabajo hace.`)
      for (const entry of group.entries ?? []) {
        entradas += 1
        if (!entry.pattern?.trim()) failures.push(`Superhub/${unit.slug}: «${entry.text}» se publica sin su patrón.`)
      }
    }
    if (entradas < 15) failures.push(`Superhub/${unit.slug}: solo ${entradas} entradas. Una unidad con menos de 15 no cubre su parte del examen.`)
    if (!(unit.groups ?? []).length) failures.push(`Superhub/${unit.slug}: el banco no está agrupado por trabajo.`)
    if (!(unit.groups ?? []).some((g) => (g.entries ?? []).some((e) => e.risk === 'avoid'))) {
      failures.push(`Superhub/${unit.slug}: ninguna entrada marcada como «avoid». Cada parte tiene su palabra que parece que sirve y no sirve.`)
    }

    // Los cuatro bloques del blueprint, igual que en paraphrasing.
    const palabras = [
      unit.explainer?.definition,
      ...(unit.explainer?.sections ?? []).flatMap((s) => [s.heading, ...(s.body ?? []), ...(s.points ?? []).map((p) => `${p.term} ${p.detail}`)]),
      unit.explainer?.cost, unit.explainer?.limits,
    ].filter(Boolean).join(' ').trim().split(/\s+/u).length
    if (palabras < EXPLICACION_MINIMA) {
      failures.push(`Superhub/${unit.slug}: la explicación tiene ${palabras} palabras; el mínimo son ${EXPLICACION_MINIMA}.`)
    }
    if (!unit.explainer?.cost?.trim() || !unit.explainer?.limits?.trim()) {
      failures.push(`Superhub/${unit.slug}: a la explicación le falta «cost» o «limits».`)
    }
    if ((unit.guided?.steps ?? []).length < PASOS_MINIMOS) {
      failures.push(`Superhub/${unit.slug}: el guiado tiene ${(unit.guided?.steps ?? []).length} pasos; el mínimo son ${PASOS_MINIMOS}.`)
    }
    for (const [i, step] of (unit.guided?.steps ?? []).entries()) {
      if (!(step.minWords > 0)) failures.push(`Superhub/${unit.slug}: el paso ${i + 1} del guiado no exige escribir nada.`)
    }
    if ((unit.upgrade?.earns ?? []).some((earn) => /\d/.test(earn))) {
      failures.push(`Superhub/${unit.slug}: «earns» lleva un número. Ninguna página promete una banda.`)
    }

    // Los bancos de opción, con el mismo criterio que el resto del curso.
    for (const [i, drill] of (unit.drills ?? []).entries()) {
      const largos = drill.options.map((o) => o.text.trim().split(/\s+/u).length)
      const mejor = Math.max(...largos.filter((_, j) => j !== drill.correct))
      if (largos[drill.correct] - mejor >= DESTAQUE) {
        failures.push(`Superhub/${unit.slug} ejercicio ${i + 1}: la correcta saca ${largos[drill.correct] - mejor} palabras al mejor distractor.`)
      }
      const motivos = drill.options.map((o) => o.why?.trim())
      if (motivos.some((w) => !w)) failures.push(`Superhub/${unit.slug} ejercicio ${i + 1}: hay opciones sin motivo propio.`)
      if (new Set(motivos).size !== motivos.length) failures.push(`Superhub/${unit.slug} ejercicio ${i + 1}: dos opciones comparten motivo.`)
    }
  }

  const cliente = fs.readFileSync(path.join(vocabHub, 'VocabularyUnitClient.tsx'), 'utf8')
  if (!cliente.includes('placeOption(drill.options')) {
    failures.push('vocabulario/VocabularyUnitClient.tsx: no reparte la correcta con `placeOption(drill.options…`.')
  }
}

if (failures.length) {
  console.error('IELTS Task 2 — alineación enunciado/modelo:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  const totalDrills = drillsByType.reduce((sum, [, list]) => sum + list.length, 0)
  console.log(`IELTS Task 2 alineado: ${lessons.length} tipos × ${EXPECTED_EXAMPLES} ejemplos, ${seen.size} identificadores únicos, cada tema en su enunciado.`)
  console.log(`Motor de análisis: ${totalDrills} preguntas, ${usoDistractor.size} distractores distintos, ${secuencias.size} secuencias de letras, un mensaje por opción.`)
  const cortos = Math.min(...prompts.map((item) => item.modelWords))
  console.log(`Tarea Completa: ${prompts.length} enunciados en ${EXPECTED_TYPES.length} familias, ensayo modelo de 4 párrafos, el más corto de ${cortos} palabras.`)
  console.log(`Cadena del curso: los ${(introduction.ESSAY_TYPES ?? []).reduce((n, t) => n + t.examples.length, 0)} enunciados de la introducción existen en análisis, Body 1, Body 2 y conclusión.`)
  console.log(`Tipo de ensayo: ${typeDrills.length} enunciados (posiciones ${posiciones.join(',')}), ${misreadCases.length} ensayos mal leídos, ninguna pista delata y ninguna promesa de banda.`)
  console.log(`Paráfrasis: ${techniques.length} técnicas y ${engineDrills.length} ejercicios de motor, ${bancos.length} bancos de opción, ninguna respuesta del motor sale de las lecciones y ninguna correcta destaca por longitud.`)
  const items = funciones.reduce((n, f) => n + f.words.length, 0)
  console.log(`Vocabulario: ${funciones.length} funciones y ${items} entradas, todas con su patrón, ${bancosVocab.length} bancos de opción, ningún comparador promete una banda.`)
}
