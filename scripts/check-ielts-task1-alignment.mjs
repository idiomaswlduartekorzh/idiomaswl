import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

/**
 * Comprueba que los ejercicios de IELTS Academic Writing Task 1 no se puedan aprobar sin
 * mirar el gráfico.
 *
 * POR QUÉ EXISTE
 *
 * Task 1 tiene nueve bancos de preguntas repartidos por nueve ficheros. Medidos el 12 de
 * agosto de 2026, con la pantalla delante y no con el ojo:
 *
 *   · La opción correcta era la MÁS LARGA en 47 de 56 preguntas (84 %) en los cinco motores
 *     principales, y en 25 de las 100 preguntas totales sacaba tres palabras o más a
 *     cualquier distractor. Tres palabras se ven de un vistazo, sin leer ninguna: el
 *     estudiante aprende a elegir el párrafo gordo, no a leer el gráfico. El peor caso
 *     sacaba trece.
 *   · En `overview/Content.tsx` la correcta era la opción A en las SEIS lecciones. Ese
 *     fichero pintaba `lesson.options` en el orden en que están escritas, y el redactor las
 *     escribe siempre con la buena primera.
 *   · En `tendencias/Content.tsx` la correcta era la A o la B en las nueve preguntas: cero
 *     veces la C, cero veces la D. Con dos letras descartadas de entrada, el ejercicio
 *     regala la mitad.
 *
 * Ninguno de los tres defectos rompía nada: los ejercicios funcionaban, las respuestas eran
 * correctas y los tests pasaban. El defecto solo existe en el CONJUNTO, y por eso hay que
 * medirlo con un script y no revisando ítem por ítem.
 *
 * LO QUE VIGILA
 *
 *   1. Ninguna correcta puede sacar DESTAQUE palabras o más al distractor más largo.
 *   2. Elegir siempre la más larga no puede aprobar un fichero (más de la mitad).
 *   3. Todo banco tiene que repartir la posición de la respuesta por algún mecanismo, y si
 *      lo hace con `slot`, los slots tienen que estar repartidos.
 *   4. Las áreas de escritura van sin corrector: en el examen no lo hay.
 *
 *   node scripts/check-ielts-task1-alignment.mjs
 *   node scripts/check-ielts-task1-alignment.mjs --verbose
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const task1 = path.join(repoRoot, 'src', 'app', '(site)', 'practica', 'ielts', 'academic', 'writing', 'task1')
const verbose = process.argv.includes('--verbose')

/**
 * Palabras de más que puede tener la correcta antes de delatarse.
 *
 * Es el mismo umbral que usa la compuerta de Task 2. Tres palabras es donde la diferencia
 * pasa de «una frase algo más precisa» a «el bloque de texto que destaca en la pantalla».
 * Dos no se ve; tres sí, y a partir de ahí ya no hace falta leer.
 */
const DESTAQUE = 3

/**
 * Ficheros que reordenan las opciones al pintarlas, con el nombre de quien lo hace.
 *
 * En estos, la posición escrita en los datos NO es la que ve el estudiante, así que
 * medirla no dice nada: `Task1BodyPracticeEngine` tiene las doce respuestas en `answer: 0`
 * y aun así salen repartidas en pantalla.
 *
 * Es un registro a mano y a propósito. Buscar la forma de un reordenador por regex —«algo
 * que recorra `options` y devuelva otro orden»— acierta con los cinco de hoy y falla con el
 * sexto, y falla hacia el lado malo: da por bueno un banco sin comprobar. Si añades un
 * motor con su propio reordenador, apúntalo aquí; si no lo apuntas, la comprobación mide
 * las posiciones escritas y te avisa. Prefiero el aviso de más.
 *
 * Cada valor es la LLAMADA, con su primer argumento, no el nombre suelto. La primera
 * versión buscaba solo el nombre y la prueba de mordida la cazó: al renombrar la llamada
 * pero dejar el `import placeOption` arriba, el fichero seguía «conteniendo placeOption» y
 * la comprobación pasaba con la mordida puesta.
 */
const REORDENAN = new Map([
  ['Task1BodyPracticeEngine.tsx', { llamada: 'rotate(question' }],
  ['Task1VocabularyPracticeEngine.tsx', { llamada: 'orderOptions(question' }],
  ['overview/Content.tsx', { llamada: 'placeOption(lesson.options' }],
  ['tendencias/Content.tsx', { llamada: 'placeOption(item.options' }],
  ['comparaciones/ComparisonPracticeEngine.tsx', { llamada: 'splice(question.slot' }],
  // Los datos viven en un fichero y quien los reparte, en otro: hay que ir a mirar allí.
  ['introduccion/introduction-drills.ts', { llamada: 'placeOption(', en: 'introduccion/Task1IntroductionPracticeEngine.tsx' }],
  ['overview/overview-drills.ts', { llamada: 'placeOption(drill.options', en: 'overview/OverviewPracticeEngine.tsx' }],
  ['body-drills.ts', { llamada: 'placeOption(drill.options', en: 'Task1BodyPracticeEngine.tsx' }],
  ['tendencias/tendencias-drills.ts', { llamada: 'placeOption(item.options', en: 'tendencias/Content.tsx' }],
  ['comparaciones/comparisons-drills.ts', { llamada: 'placeOption(question.options', en: 'comparaciones/ComparisonPracticeEngine.tsx' }],
  ['procesos/procesos-drills.ts', { llamada: 'placeOption(current.options', en: 'procesos/ProcessPracticeEngine.tsx' }],
  ['mapas/mapas-drills.ts', { llamada: 'placeOption(current.options', en: 'mapas/MapPracticeEngine.tsx' }],
])

/** Un banco con menos preguntas que esto no tiene conjunto que medir. */
const MINIMO_PARA_MEDIR = 4

const failures = []

const palabras = (texto) => texto.trim().split(/\s+/u).filter(Boolean).length

const literal = (node) =>
  node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : null

const propiedad = (objeto, nombre) => {
  for (const miembro of objeto.properties) {
    if (ts.isPropertyAssignment(miembro) && miembro.name.getText() === nombre) return miembro.initializer
  }
  return null
}

/**
 * Saca de un literal de objeto las opciones y cuál es la buena, en las dos formas que usa
 * Task 1: `options: string[]` con un índice aparte, y `options: {text, correct}[]`.
 *
 * Se lee del AST, sin ejecutar nada: estos ficheros son componentes de React con JSX y
 * `import` de otros módulos, así que no se pueden evaluar en Node como se hace con los
 * ficheros de datos de Task 2.
 */
function leerBanco(objeto) {
  const nodoOpciones = propiedad(objeto, 'options')
  if (!nodoOpciones || !ts.isArrayLiteralExpression(nodoOpciones) || nodoOpciones.elements.length < 2) return null

  const slot = propiedad(objeto, 'slot')
  const conSlot = slot && ts.isNumericLiteral(slot) ? Number(slot.text) : null

  /**
   * El índice de la buena, escrito como hermano de `options`: o un número, o —en los huecos
   * del cloze— el propio texto de la opción correcta.
   */
  const indiceHermano = (textos) => {
    for (const clave of ['answer', 'correct']) {
      const indice = propiedad(objeto, clave)
      if (!indice) continue
      if (ts.isNumericLiteral(indice)) return Number(indice.text)
      const texto = literal(indice)
      if (texto !== null && textos) {
        const encontrado = textos.indexOf(texto)
        if (encontrado >= 0) return encontrado
      }
    }
    return null
  }

  // Forma A: options: string[]
  const planas = nodoOpciones.elements.map(literal)
  if (planas.every((valor) => valor !== null)) {
    const correct = indiceHermano(planas)
    return correct === null ? null : { options: planas, correct, slot: conSlot }
  }

  /**
   * Forma B: options: { text, … }[]. La buena se marca de dos maneras según el motor —con
   * `correct: true` dentro de la opción, o con un índice hermano de `options`— y hay que
   * aceptar las dos: `introduccion` usa la segunda porque cada opción lleva además su
   * `why`, y cuando esta función solo entendía la primera, la compuerta se quedó ciega ante
   * las siete preguntas de esa unidad sin decir una palabra.
   */
  const textos = []
  let buena = -1
  for (const [posicion, elemento] of nodoOpciones.elements.entries()) {
    if (!ts.isObjectLiteralExpression(elemento)) return null
    const texto = literal(propiedad(elemento, 'text'))
    if (texto === null) return null
    const marca = propiedad(elemento, 'correct')
    if (marca && marca.kind === ts.SyntaxKind.TrueKeyword) buena = posicion
    textos.push(texto)
  }
  if (buena < 0) buena = indiceHermano(textos) ?? -1
  return buena >= 0 ? { options: textos, correct: buena, slot: conSlot } : null
}

function recorrer(directorio, salida = []) {
  for (const nombre of fs.readdirSync(directorio)) {
    const completo = path.join(directorio, nombre)
    if (fs.statSync(completo).isDirectory()) recorrer(completo, salida)
    else if (nombre.endsWith('.tsx') || nombre.endsWith('.ts')) salida.push(completo)
  }
  return salida
}

const bancos = new Map()

for (const fichero of recorrer(task1)) {
  const codigo = fs.readFileSync(fichero, 'utf8')
  const source = ts.createSourceFile(fichero, codigo, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const relativo = path.relative(repoRoot, fichero)
  const preguntas = []

  /**
   * Listas de opciones que esta comprobación no ha sabido leer.
   *
   * Existe porque ya pasó: al reescribir `introduccion` con `options: {text, why}[]`, el
   * lector no reconoció la forma, el total bajó de 100 preguntas a 93 y la compuerta siguió
   * en verde. Una comprobación que pierde cobertura sin avisar es peor que no tenerla, así
   * que ahora una forma desconocida para el build.
   */
  const ilegibles = []

  const visitar = (node) => {
    if (ts.isObjectLiteralExpression(node)) {
      const banco = leerBanco(node)
      if (!banco) {
        const nodoOpciones = propiedad(node, 'options')
        if (nodoOpciones && ts.isArrayLiteralExpression(nodoOpciones) && nodoOpciones.elements.length > 1) {
          const anidada = nodoOpciones.elements.every((elemento) => ts.isArrayLiteralExpression(elemento))
          // `options: string[][]` es el cloze, que se comprueba aparte por huecos.
          if (!anidada) ilegibles.push(source.getLineAndCharacterOfPosition(node.getStart()).line + 1)
        }
      }
      if (banco) {
        const longitudes = banco.options.map(palabras)
        const rival = Math.max(...longitudes.filter((_, i) => i !== banco.correct))
        preguntas.push({
          linea: source.getLineAndCharacterOfPosition(node.getStart()).line + 1,
          mia: longitudes[banco.correct],
          rival,
          slot: banco.slot,
          correct: banco.correct,
          opciones: banco.options.length,
          texto: banco.options[banco.correct],
        })
      }
    }
    ts.forEachChild(node, visitar)
  }
  visitar(source)

  if (ilegibles.length) {
    failures.push(
      `${relativo}: ${ilegibles.length} lista(s) de opciones con una forma que esta comprobación no sabe leer (línea ${ilegibles.slice(0, 4).join(', ')}). ` +
        'Sin saber cuál es la correcta no puede medir nada, y quedarse callada sería peor. ' +
        'Enséñale la forma nueva en `leerBanco`.',
    )
  }

  if (preguntas.length) bancos.set(relativo, { preguntas, codigo })

  // 4 — Sin corrector. En el examen se escribe a mano.
  const spreadsSinCorrector = new Set(
    [...codigo.matchAll(/const (\w+) = \{[^}]*spellCheck: false/g)].map((match) => `{...${match[1]}}`),
  )
  const textareas = [...codigo.matchAll(/<textarea[\s\S]*?\/>/g)].map((match) => match[0])
  const sinCorrector = textareas.filter(
    (tag) => !tag.includes('spellCheck={false}') && ![...spreadsSinCorrector].some((spread) => tag.includes(spread)),
  ).length
  if (sinCorrector) {
    failures.push(`${relativo}: ${sinCorrector} área(s) de escritura sin \`spellCheck={false}\`. En el examen no hay corrector.`)
  }
}

/**
 * La introducción: ningún ejercicio puede practicar sobre un gráfico que la lección ya
 * resuelve encima.
 *
 * Medido el 12 de agosto de 2026: 10 de las 11 respuestas del motor estaban impresas en la
 * lección, cinco palabra por palabra. Se resolvía subiendo a copiar. Ahora la lección enseña
 * los `worked: true` y el motor practica sobre los `worked: false`, y esto lo comprueba.
 */
{
  const datos = fs.readFileSync(path.join(task1, 'introduccion', 'introduction-data.ts'), 'utf8')
  const drills = fs.readFileSync(path.join(task1, 'introduccion', 'introduction-drills.ts'), 'utf8')

  const resueltos = new Set()
  for (const bloque of datos.matchAll(/kind: '(\w+)', variant: (\d+), worked: (true|false)/g)) {
    if (bloque[3] === 'true') resueltos.add(`${bloque[1]}-${bloque[2]}`)
  }
  if (resueltos.size === 0) {
    failures.push('introduccion/introduction-data.ts: ninguna paráfrasis marcada `worked`. O cambió la forma del dato, o la lección se quedó sin ejemplos resueltos.')
  }

  const usados = [...drills.matchAll(/paraphraseFor\('(\w+)', (\d+)\)/g)].map((match) => `${match[1]}-${match[2]}`)
  if (usados.length === 0) {
    failures.push('introduccion/introduction-drills.ts: ningún ejercicio se cuelga de `paraphraseFor`. Sin eso vuelven a ser dos listas paralelas.')
  }
  const copiados = usados.filter((clave) => resueltos.has(clave))
  if (copiados.length) {
    failures.push(
      `introduccion: ${copiados.length} ejercicio(s) practican sobre un gráfico que la lección ya resuelve encima (${[...new Set(copiados)].join(', ')}). ` +
        'La respuesta queda impresa más arriba y el ejercicio se hace copiando. ' +
        'O marca esa paráfrasis `worked: false`, o cuelga el ejercicio de otra.',
    )
  }
}

/**
 * Body 1 y Body 2: el motor no puede practicar sobre un gráfico que la lección resuelve.
 *
 * Y aquí no vale con comparar textos. En la introducción y en el overview la respuesta ES el
 * párrafo, así que una fuga se ve buscando la frase. En Body, la respuesta es una estrategia
 * —«agrupa los dos que suben y apóyalos con dos cifras»— y el párrafo modelo de la lección la
 * demuestra sin repetir una palabra. La prueba de mordida lo enseñó: devolví el motor al
 * gráfico de la lección y el test de fugas de texto siguió en verde.
 *
 * Lo que hay que comprobar es el PAR (gráfico, variante), no la prosa.
 */
{
  const leccion = fs.readFileSync(path.join(task1, 'Task1BodyLesson.tsx'), 'utf8')
  const drills = fs.readFileSync(path.join(task1, 'body-drills.ts'), 'utf8')

  const resueltos = new Set(
    [...leccion.matchAll(/id: '(\w+)', label: '[^']*', chart: \w+, variant: (\d+)/g)].map((m) => `${m[1]}-${m[2]}`),
  )
  const practicados = [...drills.matchAll(/visual: '(\w+)', variant: (\d+)/g)].map((m) => `${m[1]}-${m[2]}`)

  if (resueltos.size === 0 || practicados.length === 0) {
    failures.push('body: no se han podido leer los gráficos de la lección o los del motor. Cambió la forma del dato y esta comprobación se quedó ciega.')
  }
  const chocan = [...new Set(practicados.filter((clave) => resueltos.has(clave)))]
  if (chocan.length) {
    failures.push(
      `body-drills.ts: ${chocan.length} gráfico(s) que la lección ya resuelve encima (${chocan.join(', ')}). ` +
        'El motor va DENTRO de esa lección, así que el párrafo modelo queda a un palmo del ejercicio. ' +
        'Usa otra variante del mismo tipo de gráfico.',
    )
  }
}

/**
 * Procesos y mapas: ninguna opción del motor puede estar contenida en un modelo de la lección.
 *
 * Medido el 12 de agosto de 2026: 6 de las 12 respuestas del motor cabían dentro de un modelo
 * de la lección, cuatro con el 100 % de sus palabras. El modelo está detrás de «Reveal
 * answers →», así que no se ve de entrada; pero quien hace la lección lo revela, y entonces
 * las respuestas del ejercicio de abajo están escritas más arriba.
 *
 * Se mide por solapamiento de palabras con carga, no por subcadena: «The flakes are heated and
 * turned into pellets» no es subcadena de «The flakes are then heated and turned into plastic
 * pellets», y es la misma frase.
 */
for (const [unidad, campo] of [['procesos', 'modelParagraph'], ['mapas', 'modelSentence']]) {
  const leccion = fs.readFileSync(path.join(task1, unidad, 'Content.tsx'), 'utf8')
  const drills = fs.readFileSync(path.join(task1, unidad, `${unidad}-drills.ts`), 'utf8')

  const VACIAS = new Set(['the', 'a', 'an', 'of', 'in', 'on', 'for', 'and', 'or', 'to', 'is', 'are', 'was', 'were', 'with', 'that', 'this', 'by', 'at', 'as', 'from', 'into', 'then', 'before', 'after', 'they', 'it', 'its', 'their', 'which'])
  const carga = (texto) => new Set(
    texto.toLowerCase().replace(/[^a-z0-9\s]/gu, ' ').split(/\s+/u).filter((palabra) => palabra.length > 3 && !VACIAS.has(palabra)),
  )

  const modelos = [...leccion.matchAll(new RegExp(`${campo}: '((?:[^'\\\\]|\\\\.)*)'`, 'g'))].map((match) => carga(match[1]))
  const opciones = [...drills.matchAll(/\{ text: '((?:[^'\\]|\\.)*)', why:/g)].map((match) => match[1])

  if (modelos.length === 0 || opciones.length === 0) {
    failures.push(`${unidad}: no se han podido leer los modelos de la lección o las opciones del motor. Cambió la forma del dato y esta comprobación se quedó ciega.`)
  }

  const filtradas = []
  for (const opcion of opciones) {
    const suyas = carga(opcion)
    if (suyas.size < 3) continue
    for (const modelo of modelos) {
      const dentro = [...suyas].filter((palabra) => modelo.has(palabra)).length / suyas.size
      if (dentro >= 0.8) { filtradas.push(opcion); break }
    }
  }
  if (filtradas.length) {
    failures.push(
      `${unidad}/${unidad}-drills.ts: ${filtradas.length} opción(es) caben dentro de un modelo de la lección ` +
        `(p. ej. «${filtradas[0].slice(0, 55)}…»). Quien revela el modelo se lleva la respuesta hecha. ` +
        'Estos motores no pintan gráfico: usa un caso que la lección no trabaje.',
    )
  }
}

if (!bancos.size) {
  failures.push('No se encontró ningún banco de preguntas en Task 1. O se han borrado, o cambió su forma y esta comprobación se quedó ciega.')
}

for (const [relativo, { preguntas, codigo }] of [...bancos].sort()) {
  // 1 — El tell de longitud, pregunta a pregunta.
  for (const pregunta of preguntas) {
    const ventaja = pregunta.mia - pregunta.rival
    if (ventaja >= DESTAQUE) {
      failures.push(
        `${relativo}:${pregunta.linea}: la correcta saca ${ventaja} palabras al distractor más largo ` +
          `(${pregunta.mia} contra ${pregunta.rival}). Se ve sin leer. ` +
          `Alarga los distractores desarrollando SU error —nunca recortes la correcta, que ahí está la precisión que enseña la lección—: «${pregunta.texto.slice(0, 60)}…»`,
      )
    }
  }

  if (preguntas.length < MINIMO_PARA_MEDIR) continue

  // 2 — Que elegir la más larga no sea una estrategia ganadora.
  const masLargas = preguntas.filter((pregunta) => pregunta.mia > pregunta.rival).length
  if (masLargas > preguntas.length / 2) {
    failures.push(
      `${relativo}: la correcta es la más larga en ${masLargas} de ${preguntas.length} preguntas ` +
        `(${Math.round((masLargas / preguntas.length) * 100)} %). Elegir siempre la más larga aprueba esta página sin leer nada. ` +
        'El azar está en el 25-33 %; algunas correctas tienen que ser más cortas que su distractor más largo.',
    )
  }

  /**
   * 3 — Que la respuesta no se quede siempre en la misma letra.
   *
   * Se mide la posición que VE el estudiante. En los ficheros del registro la calcula un
   * reordenador en tiempo de pintado, así que aquí solo se comprueba que ese reordenador
   * siga estando: si alguien lo quita, la posición escrita pasa a ser la de pantalla y este
   * aviso es el único que lo diría. En los demás, la posición escrita es la de pantalla y
   * se mide directamente —sea el campo `slot` o el propio índice de la correcta.
   */
  const clave = [...REORDENAN.keys()].find((nombre) => relativo.endsWith(nombre))
  if (clave) {
    const { llamada: reordenador, en } = REORDENAN.get(clave)
    const donde = en ? fs.readFileSync(path.join(task1, en), 'utf8') : codigo
    if (!donde.includes(reordenador)) {
      failures.push(
        `${relativo}: el registro dice que la respuesta la reparte \`${reordenador}\`${en ? ` en ${en}` : ''}, y ahí ya no está. ` +
          'Sin reordenador, la posición que se pinta es la que está escrita en los datos, y el redactor escribe la buena primera. ' +
          'Devuélvelo, o usa `placeOption` de `@/lib/practica/shuffle-options` y quita la línea del registro.',
      )
    }
    continue
  }

  const vistas = preguntas.map((pregunta) => pregunta.slot ?? pregunta.correct)
  const cuantasOpciones = Math.max(...preguntas.map((pregunta) => pregunta.opciones))
  const cuenta = new Map()
  for (const posicion of vistas) cuenta.set(posicion, (cuenta.get(posicion) ?? 0) + 1)

  const [peor, veces] = [...cuenta].sort((a, b) => b[1] - a[1])[0]
  if (veces > preguntas.length / 2) {
    failures.push(
      `${relativo}: la respuesta cae en la posición ${peor + 1} en ${veces} de ${preguntas.length} preguntas. ` +
        'Estas posiciones se escriben a mano y se pintan tal cual: con una letra que sale más de la mitad de las veces, ' +
        'se aprueba adivinando. Usa `placeOption` de `@/lib/practica/shuffle-options`, que reparte por bloques.',
    )
  }

  // Con el doble de preguntas que de opciones, dejar una letra sin usar ya no es casualidad.
  if (preguntas.length >= cuantasOpciones * 2) {
    const huerfanas = Array.from({ length: cuantasOpciones }, (_, posicion) => posicion).filter(
      (posicion) => !cuenta.has(posicion),
    )
    if (huerfanas.length) {
      failures.push(
        `${relativo}: la respuesta nunca cae en la posición ${huerfanas.map((p) => p + 1).join(' ni ')} ` +
          `en ${preguntas.length} preguntas de ${cuantasOpciones} opciones. Descartadas esas, el ejercicio regala el resto.`,
      )
    }
  }
}

if (failures.length) {
  console.error('IELTS Task 1 — el ejercicio se puede aprobar sin mirar el gráfico:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  const todas = [...bancos.values()].flatMap((banco) => banco.preguntas)
  const masLargas = todas.filter((pregunta) => pregunta.mia > pregunta.rival).length
  const maxVentaja = Math.max(...todas.map((pregunta) => pregunta.mia - pregunta.rival))
  console.log(
    `IELTS Task 1: ${todas.length} preguntas en ${bancos.size} bancos. ` +
      `La correcta es la más larga en ${masLargas} (${Math.round((masLargas / todas.length) * 100)} %), ` +
      `y ninguna saca ${DESTAQUE} palabras o más (máximo ${maxVentaja}). Ningún banco deja la respuesta siempre en la misma letra.`,
  )
  if (verbose) {
    for (const [relativo, { preguntas }] of [...bancos].sort()) {
      const largas = preguntas.filter((pregunta) => pregunta.mia > pregunta.rival).length
      const ventaja = Math.max(...preguntas.map((pregunta) => pregunta.mia - pregunta.rival))
      console.log(`  ${relativo}: ${preguntas.length} preguntas, ${largas} con la correcta más larga, ventaja máxima ${ventaja}`)
    }
  }
}
