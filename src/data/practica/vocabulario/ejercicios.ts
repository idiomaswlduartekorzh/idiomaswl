import type { VocabEntry } from './schema'

/**
 * Lógica de los ejercicios de vocabulario, fuera del componente.
 *
 * Está aquí por la misma razón que `opciones.ts`: lo que vive dentro del JSX no se puede
 * auditar. El barajado de opciones estuvo roto —la correcta caía siempre en la segunda— y el
 * script no lo veía porque auditaba el dato y el defecto estaba en la pantalla. Todo lo que
 * decide qué ve o qué acierta el estudiante vive aquí, en funciones puras que la puerta de
 * calidad puede ejecutar.
 */

/**
 * El apóstrofo tipográfico del contenido y el recto del teclado son la misma letra.
 *
 * El contenido sale de las series y usa «’»; los teclados escriben «'». Sin normalizar, el
 * dictado marcaba como fallo `it’s` a quien había escrito `it's` perfectamente, y encima le
 * decía que se le había «escapado». Ocho de las dieciocho frases de dictado de inglés A1
 * estaban afectadas.
 */
export const apostrofos = (v: string) => v.replace(/[’‘‛`´]/gu, "'")

/** Raíz tolerante a la flexión: work → wor, teaches ← tea, children ← childr. */
export const raiz = (lemma: string) => lemma.toLowerCase().slice(0, Math.max(3, lemma.length - 2))

export const limpio = (v: string) => apostrofos(v).toLowerCase().replace(/[^\p{L}\p{N}]/gu, '')

export const palabras = (v: string) =>
  apostrofos(v).toLowerCase().replace(/[^\p{L}\p{N}\s']/gu, ' ').split(/\s+/).filter(Boolean)

/**
 * ¿Aparece la palabra en el texto, aunque venga flexionada?
 *
 * Deliberadamente laxa, porque su trabajo es **localizar** la palabra dentro de una frase del
 * corpus para ahuecarla: tiene que encontrar `women` desde `woman` y `shelves` desde `shelf`.
 * Para **juzgar lo que escribe el estudiante** esta laxitud es un desastre —acepta `hat` por
 * `hate` y `men` por `menu`— y para eso está `usaProducido`.
 */
export const usa = (texto: string, lemma: string) =>
  palabras(texto).some((p) => p.startsWith(raiz(lemma)))

/** Irregulares que un A1 sí puede escribir y que el prefijo no alcanza. */
const IRREGULARES: Record<string, string[]> = {
  woman: ['women'],
  man: ['men'],
  child: ['children'],
  foot: ['feet'],
  tooth: ['teeth'],
  shelf: ['shelves'],
  leaf: ['leaves'],
  person: ['people'],
  knife: ['knives'],

  // Verbos irregulares de A1 y A2. Sin esto, el estudiante que escribe el pasado —que es
  // justo lo que el nivel A2 le está enseñando a hacer— es suspendido por escribirlo bien.
  be: ['am', 'is', 'are', 'was', 'were', 'been'],
  begin: ['began', 'begun'],
  break: ['broke', 'broken'],
  bring: ['brought'],
  buy: ['bought'],
  catch: ['caught'],
  choose: ['chose', 'chosen'],
  come: ['came'],
  cost: ['cost'],
  cut: ['cut'],
  do: ['does', 'did', 'done'],
  draw: ['drew', 'drawn'],
  drink: ['drank', 'drunk'],
  drive: ['drove', 'driven'],
  eat: ['ate', 'eaten'],
  fall: ['fell', 'fallen'],
  feel: ['felt'],
  find: ['found'],
  forget: ['forgot', 'forgotten'],
  get: ['got', 'gotten'],
  give: ['gave', 'given'],
  go: ['goes', 'went', 'gone'],
  grow: ['grew', 'grown'],
  have: ['has', 'had'],
  hear: ['heard'],
  hold: ['held'],
  hurt: ['hurt'],
  keep: ['kept'],
  know: ['knew', 'known'],
  learn: ['learnt'],
  leave: ['left'],
  lend: ['lent'],
  lose: ['lost'],
  make: ['made'],
  mean: ['meant'],
  meet: ['met'],
  pay: ['paid'],
  put: ['put'],
  read: ['read'],
  run: ['ran'],
  say: ['said'],
  see: ['saw', 'seen'],
  sell: ['sold'],
  send: ['sent'],
  sing: ['sang', 'sung'],
  sit: ['sat'],
  sleep: ['slept'],
  speak: ['spoke', 'spoken'],
  spend: ['spent'],
  stand: ['stood'],
  take: ['took', 'taken'],
  teach: ['taught'],
  tell: ['told'],
  think: ['thought'],
  understand: ['understood'],
  wear: ['wore', 'worn'],
  win: ['won'],
  write: ['wrote', 'written'],
}

/**
 * ¿Usó de verdad ESA palabra? — la versión estricta, para juzgar al estudiante.
 *
 * `usa` corta el lema a `length - 2`, así que daba por buenas frases que contenían otra
 * palabra distinta: «I have a hat» aprobaba `hate`, «I see two men» aprobaba `menu` y «The
 * water is cool» aprobaba `cook`. Aquí el token tiene que empezar por el lema **entero**
 * —lo que admite `orders`, `working`, `hands`— o ser un irregular declarado.
 */
/**
 * Lo que puede ir detrás del lema y seguir siendo la misma palabra.
 *
 * Con el prefijo a secas, `whatsapp` valía como `what` y `cooking` como `cook` —esa segunda
 * sí es legítima, la primera no—. La lista corta el problema por donde debe: es la misma
 * palabra si lo que sobra es una desinencia, no si sobra otra palabra pegada.
 */
const DESINENCIAS = [
  '', 's', 'es', 'ed', 'd', 'ing', "'s", "'ll", "'re", "'ve", "'d",
  // Comparativo y superlativo: la puerta cazó que sin ellos «my younger sister» dejaba
  // «young» sin salida, que es exactamente el tipo de callejón que este motor ya tuvo.
  'er', 'est', 'r', 'st',
]

export function usaProducido(texto: string, lemma: string): boolean {
  const l = limpio(lemma)
  if (!l) return false
  const irr = (IRREGULARES[lemma.toLowerCase()] ?? []).map(limpio)
  const formas = new Set([...DESINENCIAS.map((s) => limpio(l + s)), ...irr])
  // `y → ies` (city → cities) y la doble consonante (stop → stopping) no salen de concatenar.
  // `reply → replied` y `busy → busier` faltaban al lado de `city → cities`, y con ellos se
  // caía media conjugación de los verbos en -y.
  if (l.endsWith('y')) for (const s of ['ies', 'ied', 'ier', 'iest']) formas.add(limpio(l.slice(0, -1) + s))
  if (l.endsWith('e')) formas.add(limpio(`${l.slice(0, -1)}ing`))
  // La doble consonante estaba en el comentario y no en el código: `stopped`, `dropped`,
  // `planning` y `cancelled` se rechazaban aunque son la misma palabra bien escrita. La
  // puerta lo destapó al no encontrar salida en `drop` y `cancel` — el mismo callejón que
  // la caja 5 ya tuvo con las colocaciones, pero causado por el juez, no por la ficha.
  if (/[^aeiou][aeiou][bdgklmnprtvz]$/.test(l)) {
    for (const s of ['ed', 'ing', 'er', 'est']) formas.add(limpio(l + l.slice(-1) + s))
  }
  return palabras(texto).some((p) => formas.has(limpio(p)))
}

/**
 * ¿Esto está escrito en español?
 *
 * No es un detector de idioma y no pretende serlo: es una red para el caso que la auditoría
 * de usuario destapó, que era que «Yo uso food todos los dias» salía por pantalla como
 * **Dominada**. Con dos palabras funcionales españolas basta para saber que la frase no es
 * inglés, y ninguna de estas existe como palabra inglesa.
 */
const FUNCIONALES_ES = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'del', 'al',
  'que', 'como', 'pero', 'porque', 'cuando', 'donde', 'muy', 'mucho', 'mucha',
  'yo', 'tu', 'usted', 'nosotros', 'ellos', 'ella', 'mi', 'mis', 'su', 'sus',
  'es', 'son', 'esta', 'estan', 'soy', 'eres', 'tengo', 'tiene', 'hay',
  'con', 'sin', 'para', 'por', 'sobre', 'desde', 'hasta', 'entre',
  'todos', 'todas', 'todo', 'toda', 'siempre', 'nunca', 'tambien', 'ademas',
  'dias', 'dia', 'casa', 'gente', 'cosa', 'cosas', 'hola', 'gracias',
])

export function pareceEspanol(texto: string): boolean {
  const t = palabras(texto).map(limpio)
  return t.filter((p) => FUNCIONALES_ES.has(p)).length >= 2
}

/**
 * Ahueca la palabra dentro de su frase (caja 4), tolerando la flexión.
 *
 * La puntuación pegada al token se queda en la frase: si se ahuecara «student,» entero, la
 * coma desaparecería y el estudiante vería una frase que no es la que va a oír.
 */
export function ahuecar(
  frase: string,
  lemma: string,
): { antes: string; despues: string; forma: string } | null {
  const stem = raiz(lemma)
  const tokens = frase.split(/(\s+)/)
  const i = tokens.findIndex((t) => t.replace(/[^\p{L}\p{N}’']/gu, '').toLowerCase().startsWith(stem))
  if (i === -1) return null
  const partes = tokens[i].match(/^([^\p{L}\p{N}]*)([\p{L}\p{N}’']+)(.*)$/u)
  if (!partes) return null
  const [, previa, forma, posterior] = partes
  return {
    antes: tokens.slice(0, i).join('') + previa,
    despues: posterior + tokens.slice(i + 1).join(''),
    forma,
  }
}

/**
 * Caja 5 — la frase propia.
 *
 * La primera versión solo comprobaba que la palabra apareciera, así que «father.» pasaba por
 * frase. Eso no es producir, es copiar. Ahora exige la palabra y una frase de verdad, y
 * reconoce —sin exigirlo— que haya usado uno de los chunks de la ficha, que es el objetivo
 * real del enfoque léxico.
 */
export const MIN_PALABRAS_FRASE = 3

const chunksDe = (entrada: VocabEntry) =>
  'colocaciones' in entrada.extra ? entrada.extra.colocaciones : []

/** El chunk sin los puntos suspensivos ni paréntesis con que se anota en la ficha. */
const nucleoChunk = (chunk: string) => chunk.replace(/[…().]/gu, ' ').replace(/\s+/gu, ' ').trim()

export function evaluarFrasePropia(
  texto: string,
  entrada: VocabEntry,
): { ok: boolean; faltas: string[]; chunkUsado?: string } {
  const faltas: string[] = []
  const tokens = palabras(texto)

  // Antes que nada, el idioma. La auditoría de usuario encontró que «Yo uso food todos los
  // dias» se daba por Dominada, que es la mentira más cara del motor: no suspende a nadie,
  // fosiliza el error y lo manda a casa creyendo que aprendió.
  if (pareceEspanol(texto)) {
    faltas.push('Esa frase está en español. Escríbela en inglés, aunque sea corta y sencilla.')
  } else if (!usaProducido(texto, entrada.lemma)) {
    // `usaProducido` y no `usa`: la laxa daba por buena «I have a hat» para «hate».
    faltas.push(`Falta «${entrada.lemma}» en tu frase.`)
  } else if (tokens.length < MIN_PALABRAS_FRASE) {
    faltas.push(`Con «${texto.trim()}» no basta: escribe una frase, no la palabra suelta.`)
  }

  const chunks = chunksDe(entrada)
  const chunkUsado = chunks.find((col) => {
    const clave = nucleoChunk(col.chunk)
    return clave.length > 3 && limpio(texto).includes(limpio(clave))
  })?.chunk

  // Copiar el chunk tal cual no es producir: el chunk es el andamio, no la respuesta.
  // Sin esto, «we are friends» —que está impreso en la ficha— se premiaba y se rechazaba a
  // la vez, y el estudiante se quedaba atascado sin saber qué le pedían.
  const copiaLiteral = chunks.some((col) => limpio(nucleoChunk(col.chunk)) === limpio(texto))
  if (copiaLiteral) {
    faltas.push(`«${texto.trim()}» es la combinación que imprime la ficha, tal cual. Añádele algo tuyo y ya está.`)
  }

  const ok = faltas.length === 0
  // El elogio solo cuando la frase vale. Felicitar y suspender a la vez no orienta a nadie.
  return { ok, faltas, chunkUsado: ok ? chunkUsado : undefined }
}

/**
 * Caja 4 — el hueco en contexto.
 *
 * La frase sale del corpus y a veces trae la palabra flexionada: la ficha enseña `order` y la
 * frase dice `orders`; enseña `egg` y la frase dice `eggs`; enseña `what` y la frase dice
 * `What’s`. La primera versión exigía la forma de la frase y mandaba a la caja 1 al estudiante
 * que escribía exactamente lo que se le había enseñado, sin decirle por qué. Perder cuatro
 * peldaños por una `-s` que nadie explicó es la manera más rápida de que alguien lo deje.
 *
 * Ahora la forma flexionada se acepta y **se aprovecha para enseñar la diferencia**, que es lo
 * que un peldaño llamado «usar en contexto» debería hacer.
 */
export function evaluarHueco(
  respuesta: string,
  forma: string,
  lemma: string,
): { ok: boolean; nota?: string; esperado: string } {
  const r = limpio(respuesta)
  if (r === limpio(forma)) return { ok: true, esperado: forma }
  if (r === limpio(lemma) && limpio(lemma) !== limpio(forma)) {
    return {
      ok: true,
      esperado: forma,
      nota: `«${lemma}» es la palabra, sí. Aquí la frase la pide como «${forma}» — es la misma, cambiada por la gramática de la frase. Cuenta igual.`,
    }
  }
  return { ok: false, esperado: forma }
}

/**
 * Variantes que son la misma palabra y que castigar sería injusto.
 *
 * La ficha enseña el inglés británico —es el de las series del nivel— pero en Colombia se ve
 * el americano en todas partes. Suspender `favorite` a quien aprendió `favourite` no enseña
 * ortografía: enseña que el ejercicio es una lotería. La regla `-our → -or` cubre la familia
 * entera; lo demás va en pares explícitos.
 */
const PARES_EQUIVALENTES: [string, string][] = [
  ['thanks', 'thank you'],
  ['course', 'of course'],
  ['goodbye', 'good bye'],
  ['hello', 'hallo'],
]

/** La glosa sin el paréntesis aclaratorio: «hola (informal)» → «hola». */
const glosaNucleo = (es: string) => limpio(es.replace(/\([^)]*\)/gu, ''))

function variantesDe(lemma: string): string[] {
  const l = lemma.toLowerCase()
  const out = new Set<string>()
  if (l.includes('our')) out.add(l.replace('our', 'or')) // favourite → favorite, colour → color
  if (l.includes('re') && l.endsWith('re')) out.add(`${l.slice(0, -2)}er`) // centre → center
  for (const [a, b] of PARES_EQUIVALENTES) {
    if (l === a) out.add(b)
    if (l === b) out.add(a)
  }
  out.delete(l)
  return [...out]
}

/**
 * Cajas 2 y 3 — producir la palabra.
 *
 * Tres veredictos, no dos. El tercero existe porque la auditoría de usuario encontró que
 * escribir `hello` cuando se pedía `hi` —las dos glosadas «hola», las dos en la misma unidad
 * de diez— costaba cuatro peldaños y no explicaba nada. Eso no es un error del estudiante:
 * es que la pregunta no distinguía. Se acepta la palabra, se le dice cuál era la buscada, y
 * se sigue.
 */
export function evaluarProduccion(
  respuesta: string,
  entrada: VocabEntry,
  otras: VocabEntry[] = [],
): { ok: boolean; nota?: string } {
  const r = limpio(respuesta)
  if (r === limpio(entrada.lemma)) return { ok: true }

  const variante = variantesDe(entrada.lemma).find((v) => limpio(v) === r)
  if (variante) {
    return {
      ok: true,
      nota: `«${respuesta.trim()}» también vale: es la misma palabra. En estas lecciones se escribe «${entrada.lemma}».`,
    }
  }

  // ¿Escribió otra palabra de la unidad que significa lo mismo? Entonces la pregunta era
  // ambigua, y el fallo es de la pregunta.
  //
  // Se compara la glosa sin el paréntesis aclaratorio: `hello` glosa «hola» y `hi` glosa
  // «hola (informal)». En la caja 3 el estudiante solo ve la cadena española, y ese matiz
  // entre paréntesis no basta para elegir entre dos palabras de la misma unidad de diez.
  const hermana = otras.find(
    (o) => o.id !== entrada.id && limpio(o.lemma) === r && glosaNucleo(o.es) === glosaNucleo(entrada.es),
  )
  if (hermana) {
    return {
      ok: true,
      nota: `«${hermana.lemma}» también es «${hermana.es}», sí. Aquí buscábamos «${entrada.lemma}» («${entrada.es}») — las dos están en esta unidad; el matiz está en la ficha.`,
    }
  }

  return { ok: false }
}

/**
 * Ortografía (caja 2, variante) — se muestra la palabra mal escrita y hay que corregirla.
 *
 * Reconocer una palabra escrita mal exige saber cómo se escribe bien, que es un grado de
 * conocimiento distinto de reconocer el significado. Y las faltas que genera no son al azar:
 * son las que de verdad comete un hispanohablante —*foto* por *photo*, *freind* por *friend*,
 * *fater* por *father*— porque salen de reglas de sustitución, no de barajar letras.
 */
const REGLAS_FALTA: { nombre: string; aplicar: (w: string) => string | null }[] = [
  {
    // Solo si queda una palabra de cuatro letras o más: acortar «meet» da «met», que existe
    // y significa otra cosa. Corregir eso no enseña ortografía, enseña a dudar.
    nombre: 'consonante doble simplificada',
    aplicar: (w) => {
      if (!/(.)\1/.test(w)) return null
      const mal = w.replace(/(.)\1/, '$1')
      return mal.length >= 4 ? mal : null
    },
  },
  { nombre: 'th → t', aplicar: (w) => (w.includes('th') ? w.replace('th', 't') : null) },
  { nombre: 'ph → f', aplicar: (w) => (w.includes('ph') ? w.replace('ph', 'f') : null) },
  { nombre: 'ie → ei', aplicar: (w) => (w.includes('ie') ? w.replace('ie', 'ei') : null) },
  { nombre: 'e final perdida', aplicar: (w) => (w.length > 3 && w.endsWith('e') ? w.slice(0, -1) : null) },
  { nombre: 'y final → i', aplicar: (w) => (w.length > 3 && w.endsWith('y') ? `${w.slice(0, -1)}i` : null) },
  {
    // Último recurso, y solo en palabras largas: en «son» o «boy» la transposición da «sno» y
    // «byo», que no son faltas de nadie — son erratas de teclado. Ahí no hay nada que corregir
    // y la palabra se queda con la variante de la inicial, que sí enseña.
    nombre: 'dos últimas letras cambiadas',
    aplicar: (w) => (w.length >= 5 ? `${w.slice(0, -2)}${w[w.length - 1]}${w[w.length - 2]}` : null),
  },
]

/**
 * Devuelve la palabra mal escrita, o `null` si no se puede generar una falta que no choque
 * con otra palabra del bloque —enseñar «met» como falta de «meet» cuando «met» significa otra
 * cosa confundiría más de lo que enseña.
 */
export function malEscribir(lemma: string, otrosLemas: string[] = []): { mal: string; regla: string } | null {
  const prohibidas = new Set(otrosLemas.map((l) => l.toLowerCase()))
  for (const regla of REGLAS_FALTA) {
    const mal = regla.aplicar(lemma.toLowerCase())
    if (mal && mal !== lemma.toLowerCase() && !prohibidas.has(mal)) {
      return { mal, regla: regla.nombre }
    }
  }
  return null
}

/** ¿Corrigió bien la palabra mal escrita? */
export const corrigioOrtografia = (respuesta: string, lemma: string) =>
  limpio(respuesta) === limpio(lemma)

/** FNV-1a: determinista y estable entre servidor y cliente. Sin `Math.random`. */
export function semilla(texto: string): number {
  let h = 2166136261
  for (const ch of texto) {
    h ^= ch.codePointAt(0)!
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

export type EjercicioCaja2 =
  | { tipo: 'ortografia'; mal: string; regla: string }
  | { tipo: 'inicial' }

/**
 * La caja 2 alterna dos formas: escribir con la inicial dada, y corregir la palabra mal
 * escrita. Alternar importa — si el peldaño pregunta siempre igual, el estudiante aprende el
 * formato antes que la palabra. El reparto es determinista por `id`, así que la misma palabra
 * siempre trae el mismo ejercicio y el estudiante no ve la pregunta cambiar al recargar.
 */
export function ejercicioCaja2(entrada: VocabEntry, otrosLemas: string[] = []): EjercicioCaja2 {
  if (semilla(entrada.id) % 2 === 0) {
    const falta = malEscribir(entrada.lemma, otrosLemas)
    if (falta) return { tipo: 'ortografia', ...falta }
  }
  return { tipo: 'inicial' }
}

/**
 * Cierre escrito de la unidad — el «día 6» de la semana tipo (metodología §4).
 *
 * Cuenta como frase lo que tiene al menos tres palabras: así «My name is Maya.» cuenta y
 * «Yes.» no, que es la diferencia entre escribir y rellenar.
 */
export const MIN_PALABRAS_USADAS = 5
export const MIN_FRASES = 5

export function progresoEscritura(
  texto: string,
  entradas: VocabEntry[],
): { usadas: VocabEntry[]; frases: number; listo: boolean } {
  const usadas = entradas.filter((e) => usa(texto, e.lemma))
  const frases = texto
    .split(/[.!?]+/u)
    .map((f) => f.trim())
    .filter((f) => palabras(f).length >= 3).length
  return { usadas, frases, listo: usadas.length >= MIN_PALABRAS_USADAS && frases >= MIN_FRASES }
}

/**
 * Corrección del dictado: qué palabras de la frase original faltan en lo que escribió.
 */
export function corregirDictado(
  original: string,
  escrito: string,
): { esperadas: string[]; acertadas: number; falladas: string[] } {
  const esperadas = palabras(original)
  const escritas = new Set(palabras(escrito))
  const falladas = esperadas.filter((p) => !escritas.has(p))
  return { esperadas, acertadas: esperadas.length - falladas.length, falladas }
}
