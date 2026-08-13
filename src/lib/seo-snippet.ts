/**
 * Ajuste de títulos y descripciones al espacio real del resultado de Google.
 *
 * Por qué existe este archivo
 * ───────────────────────────
 * Medido en Search Console el 12–13 de agosto de 2026: 652 impresiones, 8 clics.
 * De las 40 URLs con impresiones en el top 12, las 40 tenían el título cortado
 * (mediana 87 caracteres) y 31 tenían la descripción cortada a mitad de palabra.
 * En todo el catálogo de gramática: 425 de 454 títulos y 448 de 466 descripciones
 * se pasaban del espacio disponible.
 *
 * Dos causas encadenadas:
 *
 *  1. El template global `'%s · Idiomas WeLearn'` sumaba 18 caracteres a cada
 *     página del sitio. Se retiró: Google ya muestra el nombre del sitio por su
 *     cuenta (og:siteName + JSON-LD WebSite), así que repetir la marca dentro
 *     del título solo gastaba el espacio donde vive lo distintivo.
 *
 *  2. En gramática, `description` hace doble trabajo: es la meta description Y
 *     se pinta como <p class="article-lead"> en el cuerpo del artículo. Estaba
 *     escrita para leerse en la página, así que en el buscador salía cortada —
 *     y lo que sí se veía ya resolvía la consulta. Ejemplo real: la página de
 *     `prepositions-lieu` (35 impresiones, posición 9,26, CERO clics) mostraba
 *     «à para ciudades, en para países femeninos…, au para países masculinos»
 *     ante la búsqueda «au en frances». La respuesta estaba en el resultado;
 *     entrar no aportaba nada.
 *
 * Por eso aquí NO se toca `description`: se deriva un texto aparte para el
 * buscador desde `guide.goal`, que dice qué vas a poder HACER en vez de dar la
 * respuesta, y se remata con la práctica corregida — lo único que un fragmento
 * de búsqueda no puede regalar.
 *
 * Los dos límites son de espacio, no de caracteres: Google corta el título
 * alrededor de 580 px y la descripción alrededor de 920 px. 60 y 155
 * caracteres son la equivalencia conservadora habitual para texto en español.
 */

/** Tope de caracteres del título antes de que Google lo corte (~580 px). */
export const TITLE_MAX = 60

/** Tope de caracteres de la descripción antes de que Google la corte (~920 px). */
export const DESC_MAX = 155

/** Separadores con los que se construyen los títulos del sitio. */
const SEPARATORS = [' — ', ' – ', ' | ', ' · ', ' - ', ': ']

/**
 * Recorta a `max` sin partir palabras y sin dejar el texto colgando de un signo
 * de puntuación o de un conector suelto («y», «o», «de», «con»…), que es lo que
 * hace que un resultado parezca roto.
 */
function trimToBoundary(text: string, max: number): string {
  if (text.length <= max) return tidyEnd(text)

  const cut = text.slice(0, max + 1)
  const lastSpace = cut.lastIndexOf(' ')
  // Si no hay espacio en la segunda mitad, la palabra es larguísima: corta seco.
  const out = lastSpace > max * 0.5 ? cut.slice(0, lastSpace) : cut.slice(0, max)

  return tidyEnd(out)
}

/**
 * Limpia el final de un texto recortado.
 *
 * Va en bucle a propósito: quitar la conjunción final deja al descubierto la
 * coma que la precedía («…rien, personne, que» → «…rien, personne,»), y una sola
 * pasada devolvería el texto colgando de ese signo.
 */
function tidyEnd(text: string): string {
  let out = text.trimEnd()

  for (let pass = 0; pass < 4; pass += 1) {
    const before = out
    out = out.replace(/[,;:.—–|·(\s]+$/u, '')
    // Una palabra vacía al final (preposición, conjunción, artículo o
    // determinante) deja la frase en el aire: «…y pasar al primer».
    out = out.replace(
      /\s+(y|o|u|e|de|del|con|para|por|en|a|al|que|the|and|el|la|los|las|lo|un|una|unos|unas|su|sus|tu|tus|mi|mis|este|esta|ese|esa|cada|todo|toda|gran|mejor|primer|primera|segundo|segunda)$/iu,
      ''
    )
    out = out.trimEnd()
    if (out === before) break
  }

  return out
}

/**
 * Ajusta un título al ancho del resultado.
 *
 * Prefiere cortar por un separador propio del título («Tema en idioma A1 — lista
 * de formas») porque la cabeza suele ser la parte que responde a la búsqueda y
 * la cola suele ser relleno de palabras clave. Solo recorta por palabra si
 * ningún separador deja una cabeza con cuerpo suficiente.
 */
export function fitTitle(title: string, max: number = TITLE_MAX): string {
  const clean = title.trim()
  if (clean.length <= max) return tidyEnd(clean)

  const candidates: string[] = []

  for (const sep of SEPARATORS) {
    const at = clean.indexOf(sep)
    if (at === -1) continue
    const head = tidyEnd(clean.slice(0, at))
    // Una cabeza de menos de 20 caracteres pierde demasiada información.
    if (head.length >= 20 && head.length <= max) candidates.push(head)
  }

  candidates.push(trimToBoundary(clean, max))

  // El más largo de los que caben: cortar por el primer separador deja títulos
  // de 29 caracteres cuando había 60 disponibles, y ese hueco es sitio donde
  // cabía lo que distingue a la página.
  return candidates.reduce((best, candidate) => (candidate.length > best.length ? candidate : best), '')
}

/**
 * Ajusta una descripción al ancho del resultado.
 *
 * Prefiere terminar en una frase completa: un fragmento que cierra con punto
 * lee como una descripción escrita a propósito, y uno cortado a mitad lee como
 * un error. Solo si ninguna frase cabe se recorta por palabra, y entonces sí
 * marca el corte con puntos suspensivos, que es lo honesto.
 */
export function fitDescription(description: string, max: number = DESC_MAX): string {
  const clean = description.trim().replace(/\s+/g, ' ')
  if (clean.length <= max) return clean

  // Busca el último final de frase que quepa y que no deje la descripción coja.
  let best = -1
  const sentenceEnd = /[.!?](\s|$)/gu
  for (let m = sentenceEnd.exec(clean); m; m = sentenceEnd.exec(clean)) {
    const end = m.index + 1
    if (end > max) break
    best = end
  }
  if (best >= max * 0.6) return clean.slice(0, best).trim()

  return `${trimToBoundary(clean, max - 1)}…`
}

/**
 * Elige el gancho más largo que quepa en el espacio que queda.
 * Los candidatos se pasan de más informativo a más escueto.
 */
function fitHook(base: string, candidates: string[], max: number): string {
  for (const hook of candidates) {
    if (base.length + hook.length <= max) return hook
  }
  return ''
}

/**
 * Se queda solo con la cabeza del título, la parte anterior al primer separador.
 *
 * Es lo contrario que `fitTitle`, que elige el trozo más largo que quepa. Aquí
 * interesa lo corto: en gramática, la cola del `metaTitle` es una lista de
 * formas («— à, en, au, aux, dans, sur, sous») que hace dos cosas malas a la
 * vez, dar la respuesta dentro del propio resultado y ser lo primero que Google
 * corta. Descartarla entera deja sitio para el gancho, que es lo que un
 * fragmento de búsqueda no puede regalar.
 */
function titleHead(title: string, max: number): string {
  for (const sep of SEPARATORS) {
    const at = title.indexOf(sep)
    if (at === -1) continue
    const head = tidyEnd(title.slice(0, at))
    if (head.length >= 20 && head.length <= max) return head
  }
  return fitTitle(title, max)
}

/** Baja la inicial de una frase para poder encadenarla detrás de otra. */
function lowerFirst(text: string): string {
  return text.charAt(0).toLocaleLowerCase('es') + text.slice(1)
}

function stripTrailingPeriod(text: string): string {
  return text.trim().replace(/\.+$/u, '')
}

/** Un objetivo que empieza por infinitivo se puede encadenar tras «Aprende a». */
function startsWithInfinitive(text: string): boolean {
  const first = text.trim().split(/\s+/)[0] ?? ''
  return /^[a-záéíóúñü]+(ar|er|ir)$/iu.test(first)
}

/**
 * Forma mínima de un tema de gramática: solo lo que necesita el generador.
 * Se declara aquí, y no se importa `GrammarTopic`, para que este módulo siga
 * siendo JavaScript puro sin dependencias — así el guardián de `scripts/` puede
 * cargarlo y comprobar los 454 temas de verdad, no una copia de las reglas.
 */
export interface SnippetTopic {
  metaTitle: string
  lead: string
  guide?: { goal?: string }
  practice?: { levels?: Array<{ items?: unknown[]; blanks?: unknown[] }> }
}

/** Cuenta los ejercicios reales del tema sumando los de sus seis niveles. */
export function countExercises(topic: SnippetTopic): number {
  const levels = topic.practice?.levels ?? []
  return levels.reduce((total, level) => {
    if (Array.isArray(level.items)) return total + level.items.length
    if (Array.isArray(level.blanks)) return total + level.blanks.length
    return total
  }, 0)
}

/**
 * Título de una lección de gramática para el buscador.
 *
 * Conserva la cabeza del `metaTitle` («Preposiciones de lugar en francés A1») y
 * cambia la cola —que era una lista de formas: «à, en, au, aux, dans, sur,
 * sous»— por el número de ejercicios. La lista daba la respuesta gratis y
 * además era lo primero que Google cortaba.
 */
export function buildGrammarTitle(topic: SnippetTopic): string {
  const base = titleHead(topic.metaTitle, TITLE_MAX)
  const n = countExercises(topic)

  const hooks = n > 0
    ? [` — ${n} ejercicios con corrección`, ` — ${n} ejercicios corregidos`, ` — ${n} ejercicios`]
    : [' — con ejercicios corregidos', ' — con ejercicios']

  return base + fitHook(base, hooks, TITLE_MAX)
}

/**
 * Descripción de una lección de gramática para el buscador.
 *
 * Sale de `guide.goal`, que está escrito en términos de lo que el alumno podrá
 * hacer, no de cuál es la respuesta. Es deliberado: la descripción anterior
 * resolvía la búsqueda dentro del propio resultado.
 */
export function buildGrammarDescription(topic: SnippetTopic): string {
  const goal = topic.guide?.goal?.trim()

  if (!goal) return fitDescription(topic.lead)

  const clean = stripTrailingPeriod(goal)
  const opening = startsWithInfinitive(clean)
    ? `Aprende a ${lowerFirst(clean)}.`
    : `${clean}.`

  const base = fitDescription(opening, DESC_MAX)
  const n = countExercises(topic)

  const hooks = n > 0
    ? [
        ` Explicación para hispanohablantes y ${n} ejercicios corregidos al instante.`,
        ` Explicación en español y ${n} ejercicios corregidos.`,
        ` ${n} ejercicios corregidos al instante.`,
        ` ${n} ejercicios corregidos.`,
      ]
    : [' Explicación para hispanohablantes y práctica corregida al instante.', ' Práctica corregida al instante.']

  return base + fitHook(base, hooks, DESC_MAX)
}
