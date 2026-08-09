import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

/**
 * Puertas de calidad del vocabulario (docs/vocabulario-metodologia.md §7).
 *
 * Existe porque revisar ítem por ítem no ve el sesgo del conjunto. Cinco series publicadas
 * llegaron a producción con la respuesta correcta en la opción A el 100 % de las veces y
 * nadie lo vio leyéndolas una a una. El vocabulario tiene los mismos riesgos con otra cara:
 * el mismo ejemplo sirviendo para media docena de palabras, un bloque entero sacado de dos
 * episodios, ejemplos inventados que no se oyen en ninguna parte.
 *
 * Lo que comprueba, y por qué cada cosa:
 *
 *  1. IDENTIDAD. Los `id` son la clave del SRS. Repetido o mal formado = progreso perdido.
 *  2. LEMAS ÚNICOS. Una palabra vive en un solo nivel; si no, el estudiante «aprende» dos veces.
 *  3. REGLA DE VETO. El ejemplo aparece literal en el corpus de escucha del mismo nivel. Es
 *     lo que impide que el vocabulario vuelva a ser una isla, y lo que nos ahorra el defecto
 *     de los mazos Core: frases inventadas que suenan artificiales.
 *  4. FUENTE EXACTA. El episodio declarado es el episodio donde de verdad suena.
 *  5. CAMPOS DE LA CAPA POR IDIOMA. El compilador exige que existan; esto exige que no estén vacíos.
 *  6. REUTILIZACIÓN DE EJEMPLO. Si una frase enseña seis palabras, en la caja 4 el estudiante
 *     rellena el hueco por memoria del molde, no por saber la palabra.
 *  7. REPARTO POR EPISODIO. Un bloque sacado de dos episodios cubre dos escenas, no un tema.
 *  8. VOLUMEN. Contra el núcleo objetivo del nivel.
 *
 *   node scripts/check-vocabulario.mjs
 *   node scripts/check-vocabulario.mjs --lang ingles --level a1
 *   node scripts/check-vocabulario.mjs --verbose
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const vocabDir = path.join(repoRoot, 'src', 'data', 'practica', 'vocabulario')
const seriesDir = path.join(repoRoot, 'src', 'data', 'practica', 'series')

const args = process.argv.slice(2)
const val = (flag) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : null)
const onlyLang = val('--lang')
const onlyLevel = val('--level')
const verbose = args.includes('--verbose')

/**
 * Cruce opcional contra la lista base oficial del idioma.
 *
 * La lista NO se guarda en el repo: la del Oxford 3000 tiene derechos, y las de Goethe y ТРКИ
 * también. Se descarga aparte y se pasa por parámetro:
 *
 *   node scripts/check-vocabulario.mjs --lang ingles --level a1 --lista ~/Downloads/oxford3000.json
 *
 * Formato esperado: JSON `{ "A1": ["about", ...], "A2": [...], ... }`.
 */
const listaPath = val('--lista')
let listaBase = null
if (listaPath) {
  const crudo = JSON.parse(fs.readFileSync(listaPath, 'utf8'))
  listaBase = new Map()
  for (const [nivelLista, palabras] of Object.entries(crudo)) {
    for (const p of palabras) if (!listaBase.has(p)) listaBase.set(p, nivelLista)
  }
}

/** Lemas que guardamos en plural porque así se usan; la lista los trae en singular. */
const FORMA_DE_DICCIONARIO = { parents: 'parent', children: 'child', people: 'person' }

/** Cuántas entradas pueden compartir la misma frase de ejemplo. */
const MAX_ENTRADAS_POR_EJEMPLO = 2
/** Qué parte del bloque puede venir de un solo episodio. */
const MAX_CUOTA_EPISODIO = 0.34
/**
 * Qué parte de los ejemplos debe salir del corpus de escucha.
 *
 * No es el 100 % porque no puede serlo: la serie de inglés A1 tiene 353 formas distintas y
 * el núcleo del nivel pide 300 lemas con reparto temático equilibrado. Hay palabras que un
 * A1 necesita —«brother», «woman»— y que el corpus no dice nunca. El umbral deja sitio a esa
 * excepción declarada sin abrir la puerta a escribir el vocabulario aparte de las lecciones.
 */
const MIN_COBERTURA_CORPUS = 0.6
/**
 * Cuántas veces puede caer la respuesta correcta en la misma posición.
 *
 * Con cuatro opciones el reparto justo es 25 %. El tope deja holgura estadística sin
 * permitir el vicio: cinco series de escucha llegaron a producción con la correcta en la A
 * el 100 % de las veces, y la primera versión de este motor la ponía siempre en la B.
 */
const MAX_CUOTA_POSICION = 0.4

const problemas = []
const avisos = []
const fallo = (msg) => problemas.push(msg)
const aviso = (msg) => avisos.push(msg)

function loadModule(file) {
  const source = fs.readFileSync(file, 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: file,
  })
  const module = { exports: {} }
  Function('module', 'exports', compiled.outputText)(module, module.exports)
  return module.exports
}

/** Normaliza comillas tipográficas y espacios para comparar frases. */
const norm = (value) =>
  value
    .replace(/[‘’ʼ]/gu, "'")
    .replace(/[“”]/gu, '"')
    .replace(/\s+/gu, ' ')
    .trim()

/** Código de dos letras con que se nombran los ejercicios de lectura. */
const CODIGO = {
  ingles: 'en', aleman: 'de', frances: 'fr', italiano: 'it',
  portugues: 'pt', ruso: 'ru', coreano: 'ko', japones: 'ja',
}

/**
 * Los textos de lectura del nivel, como segunda fuente de ejemplos.
 *
 * La regla de veto siempre dijo «corpus de escucha **o lectura**», pero el validador solo
 * miraba la escucha. Y el número manda: la serie de inglés A1 tiene 160 turnos, y con el tope
 * de dos palabras por frase eso da para 320 entradas en el mejor de los casos —contando frases
 * de una sola palabra útil, que no sirven—. Los diez textos de lectura añaden 61 frases y 255
 * formas nuevas, que es lo que hace alcanzable un núcleo de 300 sin inventar ejemplos.
 */
function cargarLectura(lang, nivel) {
  const dir = path.join(repoRoot, 'src', 'data', 'reading', 'exercises')
  if (!fs.existsSync(dir)) return []
  const prefijo = `${CODIGO[lang] ?? lang}-${nivel}-`
  const frases = []
  for (const archivo of fs.readdirSync(dir).filter((f) => f.startsWith(prefijo) && f.endsWith('.json'))) {
    const datos = JSON.parse(fs.readFileSync(path.join(dir, archivo), 'utf8'))
    const texto = datos?.content?.targetText ?? ''
    for (const bruta of texto.split(/(?<=[.!?])\s+/u)) {
      const frase = norm(bruta)
      if (frase.split(' ').length >= 4) frases.push({ ejercicio: archivo.replace(/\.json$/, ''), target: frase })
    }
  }
  return frases
}

function cargarCorpus(lang, nivel) {
  const file = path.join(seriesDir, `${lang}-${nivel}-series.ts`)
  if (!fs.existsSync(file)) return null
  const series = Object.values(loadModule(file)).find((value) => value?.episodes)
  if (!series) return null
  const turnos = []
  for (const ep of series.episodes) {
    for (const turn of ep.turns) turnos.push({ episodio: ep.order, target: norm(turn.target) })
  }
  return { titulo: series.seriesTitle, turnos }
}

const NUCLEO_OBJETIVO = { a1: 300, a2: 350, b1: 400 }

/** Misma tolerancia a la flexión que usa el motor, para simular respuestas de estudiante. */
const usaLemma = (texto, lemma) => {
  const raiz = lemma.toLowerCase().slice(0, Math.max(3, lemma.length - 2))
  return texto.toLowerCase().split(/\s+/).some((p) => p.startsWith(raiz))
}

// La misma función que usa el componente para pintar las opciones. Auditar una copia no
// sirve de nada: lo que hay que medir es lo que ve el estudiante.
const { opcionesDe } = loadModule(path.join(vocabDir, 'opciones.ts'))
const { ahuecar, corrigioOrtografia, ejercicioCaja2, evaluarFrasePropia, usa } = loadModule(
  path.join(vocabDir, 'ejercicios.ts'),
)

// ─── Recorrido ────────────────────────────────────────────────────────────────

const archivos = fs.existsSync(vocabDir)
  ? fs.readdirSync(vocabDir).filter((f) => /^[a-z]+-(a1|a2|b1)\.ts$/.test(f))
  : []

if (archivos.length === 0) {
  console.log('No hay archivos de vocabulario todavía en src/data/practica/vocabulario/.')
  process.exit(0)
}

const lemasPorIdioma = new Map()
let totalEntradas = 0

for (const archivo of archivos.sort()) {
  const [lang, nivelExt] = archivo.replace(/\.ts$/, '').split('-')
  const nivel = nivelExt
  if (onlyLang && lang !== onlyLang) continue
  if (onlyLevel && nivel !== onlyLevel) continue

  const mod = loadModule(path.join(vocabDir, archivo))
  const level = Object.values(mod).find((value) => value?.bloques)
  if (!level) {
    fallo(`${archivo}: no exporta ningún VocabLevel con bloques`)
    continue
  }

  const entradas = level.bloques.flatMap((b) => b.entradas.map((e) => ({ ...e, bloque: b.id })))
  totalEntradas += entradas.length
  const etiqueta = `${lang}/${nivel}`

  console.log(`\n── ${etiqueta} · ${level.bloques.length} bloque(s) · ${entradas.length} entradas`)
  console.log(`   lista base: ${level.listaBase?.fuente ?? '(sin declarar)'}`)

  // 1 · Identidad
  const vistos = new Set()
  for (const e of entradas) {
    if (!e.id) fallo(`${etiqueta}: entrada sin id (${e.lemma})`)
    else if (vistos.has(e.id)) fallo(`${etiqueta}: id repetido «${e.id}»`)
    else vistos.add(e.id)
    if (e.id && !/^[a-z]{2}-(a1|a2|b1)-\d{3}$/.test(e.id)) {
      fallo(`${etiqueta}: id mal formado «${e.id}» (se espera xx-a1-001)`)
    }
  }

  // 2 · Lemas únicos dentro del idioma, entre niveles
  if (!lemasPorIdioma.has(lang)) lemasPorIdioma.set(lang, new Map())
  const lemas = lemasPorIdioma.get(lang)
  for (const e of entradas) {
    const clave = e.lemma.toLowerCase()
    if (lemas.has(clave) && lemas.get(clave) !== nivel) {
      fallo(`${lang}: «${e.lemma}» está en ${lemas.get(clave)} y en ${nivel}. Una palabra vive en un solo nivel`)
    } else if (lemas.has(clave) && lemas.get(clave) === nivel) {
      fallo(`${etiqueta}: lema repetido «${e.lemma}»`)
    }
    lemas.set(clave, nivel)
  }

  // 3 y 4 · Regla de veto, fuente exacta y cuota de ejemplos redactados
  const corpus = cargarCorpus(lang, nivel)
  const lectura = cargarLectura(lang, nivel)
  let deCorpus = 0
  let deLectura = 0
  let redactados = 0
  if (!corpus) {
    aviso(`${etiqueta}: no se encontró la serie de escucha; la regla de veto no se pudo comprobar`)
  } else {
    for (const e of entradas) {
      const frase = norm(e.ejemplo?.target ?? '')
      const fuente = e.ejemplo?.fuente
      if (!frase) {
        fallo(`${etiqueta}: «${e.lemma}» no tiene ejemplo`)
        continue
      }
      if (!fuente?.tipo) {
        fallo(`${etiqueta}: «${e.lemma}» no declara de dónde sale su ejemplo`)
        continue
      }

      if (fuente.tipo === 'redactado') {
        redactados += 1
        if (!fuente.motivo || fuente.motivo.length < 40) {
          fallo(`${etiqueta}: «${e.lemma}» tiene ejemplo redactado sin motivo suficiente. Redactar es la excepción y se justifica`)
        }
        // Un ejemplo redactado que SÍ estaba en el material es un despiste, no una excepción.
        if (corpus.turnos.some((t) => t.target === frase)) {
          fallo(`${etiqueta}: «${e.lemma}» se declara redactado pero su frase sí está en «${corpus.titulo}»`)
        }
        if (lectura.some((l) => l.target === frase)) {
          fallo(`${etiqueta}: «${e.lemma}» se declara redactado pero su frase sí está en un texto de lectura del nivel`)
        }
        continue
      }

      if (fuente.tipo === 'lectura') {
        deLectura += 1
        const donde = lectura.filter((l) => l.target === frase)
        if (donde.length === 0) {
          fallo(
            `${etiqueta}: «${e.lemma}» se declara tomado de lectura pero su frase no aparece en ningún ` +
              `texto de ${lang}/${nivel}`,
          )
        } else if (!donde.some((d) => d.ejercicio === fuente.ejercicio)) {
          fallo(
            `${etiqueta}: «${e.lemma}» declara «${fuente.ejercicio}» pero su frase está en ` +
              `${[...new Set(donde.map((d) => d.ejercicio))].join(', ')}`,
          )
        }
        continue
      }

      deCorpus += 1
      const donde = corpus.turnos.filter((t) => t.target === frase)
      if (donde.length === 0) {
        fallo(
          `${etiqueta}: «${e.lemma}» se declara tomado del corpus pero su frase no suena en «${corpus.titulo}». ` +
            `O se toma del corpus o de lectura, o se declara redactado con su motivo`,
        )
        continue
      }
      if (!donde.some((d) => d.episodio === fuente.episodio)) {
        fallo(`${etiqueta}: «${e.lemma}» declara ep${fuente.episodio} pero su frase suena en ep${donde.map((d) => d.episodio).join(', ep')}`)
      }
      // Con la MISMA tolerancia a la flexión que usa el motor. Cuando la puerta recortaba la
      // raíz por su cuenta («woma») y el motor por la suya («wom»), la puerta avisaba de un
      // problema que no existía: «women» sí contiene a «woman».
      if (!usa(frase, e.lemma)) {
        aviso(`${etiqueta}: «${e.lemma}» quizá no aparece en su propio ejemplo — revisar`)
      }
    }

    const cobertura = entradas.length ? (deCorpus + deLectura) / entradas.length : 0
    if (cobertura < MIN_COBERTURA_CORPUS) {
      fallo(
        `${etiqueta}: solo el ${Math.round(cobertura * 100)} % de los ejemplos sale del material del nivel ` +
          `(mínimo ${Math.round(MIN_COBERTURA_CORPUS * 100)} %). Por debajo de ahí el vocabulario se está ` +
          `escribiendo aparte de las lecciones, que es justo lo que la regla de veto evita`,
      )
    } else {
      console.log(
        `   cobertura del material: ${Math.round(cobertura * 100)} % ` +
          `(${deCorpus} de escucha, ${deLectura} de lectura, ${redactados} redactados) · ` +
          `disponible: ${corpus.turnos.length} turnos + ${lectura.length} frases de lectura`,
      )
    }
  }

  // 5 · Campos de la capa por idioma
  for (const e of entradas) {
    const x = e.extra ?? {}
    if (x.lang !== lang) fallo(`${etiqueta}: «${e.lemma}» declara extra.lang=${x.lang}`)
    if (lang === 'ingles') {
      if (!Array.isArray(x.colocaciones) || x.colocaciones.length === 0) {
        fallo(`${etiqueta}: «${e.lemma}» sin colocaciones. En inglés la unidad es el chunk, no la palabra`)
      } else {
        for (const col of x.colocaciones) {
          if (!col?.chunk || !col?.es) {
            fallo(`${etiqueta}: «${e.lemma}» tiene una colocación sin traducir. Sin español, en A1 la colocación es ruido`)
            continue
          }
          // Una «colocación» que es la palabra sola no enseña ninguna combinación.
          if (norm(col.chunk).toLowerCase() === e.lemma.toLowerCase()) {
            fallo(`${etiqueta}: «${e.lemma}» tiene «${col.chunk}» como colocación: es la palabra sola, no un chunk`)
          }
          // Posesivo + sustantivo tampoco: «my sister» no es una combinación que haya que aprender.
          if (/^(my|your|his|her|our|their)\s+\S+$/i.test(norm(col.chunk))) {
            fallo(`${etiqueta}: «${col.chunk}» es posesivo + sustantivo, no una colocación que enseñe algo`)
          }
        }
      }
      if (!x.acento) fallo(`${etiqueta}: «${e.lemma}» sin acento marcado`)
    }
    if (lang === 'aleman' && x.tipo === 'sustantivo') {
      if (!x.articulo) fallo(`${etiqueta}: «${e.lemma}» sin artículo`)
      if (!x.plural) fallo(`${etiqueta}: «${e.lemma}» sin plural`)
    }
    if (lang === 'ruso' && !x.acento) fallo(`${etiqueta}: «${e.lemma}» sin acento marcado`)
    if (lang === 'coreano' && x.tipo === 'sustantivo' && !x.particula) {
      fallo(`${etiqueta}: «${e.lemma}» sin partícula`)
    }
  }

  // 6 · Reutilización de ejemplo
  const porFrase = new Map()
  for (const e of entradas) {
    const frase = norm(e.ejemplo?.target ?? '')
    if (!porFrase.has(frase)) porFrase.set(frase, [])
    porFrase.get(frase).push(e.lemma)
  }
  for (const [frase, lemasFrase] of porFrase) {
    if (lemasFrase.length > MAX_ENTRADAS_POR_EJEMPLO) {
      fallo(
        `${etiqueta}: una sola frase enseña ${lemasFrase.length} palabras (${lemasFrase.join(', ')}). ` +
          `Máximo ${MAX_ENTRADAS_POR_EJEMPLO}: en la caja 4 el hueco se rellena por memoria del molde\n` +
          `        «${frase}»`,
      )
    }
  }

  // 7 · Reparto por episodio
  for (const bloque of level.bloques) {
    const cuenta = new Map()
    for (const e of bloque.entradas) {
      const ep = e.ejemplo?.fuente?.tipo === 'corpus' ? e.ejemplo.fuente.episodio : null
      if (ep == null) continue
      cuenta.set(ep, (cuenta.get(ep) ?? 0) + 1)
    }
    const total = bloque.entradas.length
    for (const [ep, n] of [...cuenta.entries()].sort((a, b) => b[1] - a[1])) {
      if (n / total > MAX_CUOTA_EPISODIO) {
        fallo(
          `${etiqueta}/${bloque.id}: ep${ep} aporta ${n} de ${total} entradas (${Math.round((n / total) * 100)} %). ` +
            `Máximo ${Math.round(MAX_CUOTA_EPISODIO * 100)} %: un bloque sacado de dos escenas no cubre un tema`,
        )
      }
    }
    if (verbose) {
      console.log(`   ${bloque.id}: episodios ${[...cuenta.entries()].sort((a, b) => a[0] - b[0]).map(([ep, n]) => `ep${ep}×${n}`).join(' ')}`)
    }
  }

  // 9 · Posición de la respuesta correcta EN PANTALLA
  //
  // Se importa la misma función que usa el componente. La primera versión barajaba dentro
  // del JSX con `id.length` —idéntico en las treinta entradas— y la correcta caía siempre
  // en la segunda opción. El dato estaba bien; la pantalla, mal. Auditar el dato no lo veía.
  const posiciones = new Map()
  for (const e of entradas) {
    const { correcta, opciones } = opcionesDe(e, entradas)
    posiciones.set(correcta, (posiciones.get(correcta) ?? 0) + 1)
    if (new Set(opciones).size !== opciones.length) {
      fallo(`${etiqueta}: «${e.lemma}» genera opciones repetidas`)
    }
    if (opciones[correcta] !== e.es) {
      fallo(`${etiqueta}: «${e.lemma}» declara la correcta en la posición ${correcta} y ahí no está`)
    }
  }
  const letras = ['A', 'B', 'C', 'D']
  const reparto = letras.map((l, i) => `${l}:${posiciones.get(i) ?? 0}`).join(' ')
  for (const [pos, n] of posiciones) {
    if (n / entradas.length > MAX_CUOTA_POSICION) {
      fallo(
        `${etiqueta}: la respuesta correcta sale en la opción ${letras[pos]} el ` +
          `${Math.round((n / entradas.length) * 100)} % de las veces (máximo ${Math.round(MAX_CUOTA_POSICION * 100)} %). ` +
          `Se acierta por posición, sin saber la palabra. Reparto: ${reparto}`,
      )
    }
  }
  if (verbose) console.log(`   posición de la correcta: ${reparto}`)

  // 10 · SIMULACIÓN DE SESIÓN — la escalera entera, palabra por palabra
  //
  // Esta es la comprobación que evita tener que probar a mano. Recorre las cinco cajas de
  // cada entrada ejecutando las mismas funciones que corren en pantalla, y para cada peldaño
  // pregunta dos cosas: ¿existe una respuesta que el motor acepte? ¿y rechaza una mala?
  //
  // Nace de un atasco real: «we are friends» estaba impreso como chunk en la ficha, el motor
  // lo elogiaba y lo suspendía a la vez, y no había forma de pasar de ahí. Un callejón sin
  // salida no se ve leyendo el código: se ve jugando, y jugar 40 palabras × 5 cajas a mano
  // no lo hace nadie.
  let sinHueco = 0
  let conOrtografia = 0
  for (const e of entradas) {
    const otros = entradas.filter((o) => o.id !== e.id).map((o) => o.lemma)

    // Caja 2 — inicial u ortografía
    const c2 = ejercicioCaja2(e, otros)
    if (c2.tipo === 'ortografia') {
      conOrtografia += 1
      if (c2.mal.toLowerCase() === e.lemma.toLowerCase()) {
        fallo(`${etiqueta}: la falta de ortografía de «${e.lemma}» es idéntica a la palabra bien escrita`)
      }
      if (otros.some((o) => o.toLowerCase() === c2.mal.toLowerCase())) {
        fallo(`${etiqueta}: la falta «${c2.mal}» de «${e.lemma}» es otra palabra del bloque`)
      }
      if (!corrigioOrtografia(e.lemma, e.lemma)) {
        fallo(`${etiqueta}: la caja 2 de «${e.lemma}» no acepta la palabra bien escrita`)
      }
      if (corrigioOrtografia(c2.mal, e.lemma)) {
        fallo(`${etiqueta}: la caja 2 de «${e.lemma}» da por buena la palabra mal escrita`)
      }
    }

    // Caja 4 — hueco en contexto
    const h = ahuecar(e.ejemplo.target, e.lemma)
    if (!h) {
      sinHueco += 1
      aviso(`${etiqueta}: «${e.lemma}» no se localiza en su propia frase; la caja 4 degradará a caja 3`)
    } else if (h.antes + h.forma + h.despues !== e.ejemplo.target) {
      fallo(`${etiqueta}: al ahuecar «${e.lemma}» la frase no se reconstruye — se pierde puntuación`)
    }

    // Caja 5 — que exista salida, y que el veredicto no se contradiga
    const soloPalabra = evaluarFrasePropia(e.lemma, e)
    if (soloPalabra.ok) fallo(`${etiqueta}: la caja 5 acepta «${e.lemma}» a secas como frase propia`)

    const conEjemplo = evaluarFrasePropia(e.ejemplo.target, e)
    if (!conEjemplo.ok) {
      fallo(`${etiqueta}: la caja 5 rechaza el propio ejemplo de «${e.lemma}» — no hay salida evidente`)
    }

    for (const col of 'colocaciones' in e.extra ? e.extra.colocaciones : []) {
      const nucleo = col.chunk.replace(/[…().]/gu, ' ').replace(/\s+/gu, ' ').trim()
      const copiado = evaluarFrasePropia(nucleo, e)
      // Copiar el chunk no debe aprobar…
      if (copiado.ok && nucleo.split(' ').length <= 4) {
        aviso(`${etiqueta}: la caja 5 aprueba el chunk «${nucleo}» copiado tal cual en «${e.lemma}»`)
      }
      // …pero sobre todo, no debe elogiar y suspender a la vez.
      if (!copiado.ok && copiado.chunkUsado) {
        fallo(
          `${etiqueta}: con «${nucleo}» la caja 5 de «${e.lemma}» suspende y felicita a la vez. ` +
            `El estudiante se queda atascado sin saber qué le piden`,
        )
      }
      // Y ampliar el chunk sí tiene que valer: es la salida que se le ofrece.
      const ampliado = `${nucleo} today`
      if (usaLemma(ampliado, e.lemma) && !evaluarFrasePropia(ampliado, e).ok) {
        fallo(`${etiqueta}: ampliar el chunk («${ampliado}») sigue sin valer en «${e.lemma}» — callejón sin salida`)
      }
    }
  }
  if (verbose) {
    console.log(
      `   sesión simulada: caja 2 con ortografía en ${conOrtografia}/${entradas.length} · ` +
        `caja 4 con hueco en ${entradas.length - sinHueco}/${entradas.length}`,
    )
  }

  // 11 · Cruce contra la lista base oficial, si se pasó una
  //
  // Aviso y no problema a propósito: una palabra fuera de la lista puede estar justificada
  // —«waitress» no está en el Oxford 3000 aunque «waiter» sí, y dejar fuera la forma femenina
  // es un límite de la lista, no del nivel— pero la justificación tiene que estar escrita en
  // `listaBase.nota`, no en la cabeza de nadie.
  if (listaBase) {
    const fuera = []
    const otroNivel = []
    for (const e of entradas) {
      const w = e.lemma.toLowerCase()
      const nivelLista = listaBase.get(w) ?? listaBase.get(FORMA_DE_DICCIONARIO[w])
      if (!nivelLista) fuera.push(e.lemma)
      else if (nivelLista.toLowerCase() !== nivel) otroNivel.push(`${e.lemma} (${nivelLista})`)
    }
    const dentro = entradas.length - fuera.length - otroNivel.length
    console.log(`   lista base: ${dentro}/${entradas.length} en la banda ${nivel.toUpperCase()}`)
    if (otroNivel.length) aviso(`${etiqueta}: la lista sitúa en otro nivel — ${otroNivel.join(', ')}`)
    if (fuera.length) aviso(`${etiqueta}: fuera de la lista base — ${fuera.join(', ')}. Justificar en listaBase.nota`)
  }

  // 8 · Volumen
  const objetivo = NUCLEO_OBJETIVO[nivel]
  if (entradas.length < objetivo) {
    aviso(`${etiqueta}: ${entradas.length}/${objetivo} entradas del núcleo (${Math.round((entradas.length / objetivo) * 100)} %)`)
  }
}

// ─── Resultado ────────────────────────────────────────────────────────────────

console.log(`\n${totalEntradas} entradas auditadas.`)

if (avisos.length) {
  console.log(`\n${avisos.length} aviso(s):`)
  for (const a of avisos) console.log(`  · ${a}`)
}

if (problemas.length) {
  console.log(`\n${problemas.length} problema(s):`)
  for (const p of problemas) console.log(`  ✗ ${p}`)
  console.log('\nLa puerta no se abre. No bajes los umbrales para pasar: están puestos donde están')
  console.log('por defectos que ya llegaron a producción antes.')
  process.exit(1)
}

console.log('\nPuerta superada.')
