import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * Carga del diccionario de pronunciación. **Solo servidor.**
 *
 * Son 3,45 MB y 126.037 palabras: no bajan al navegador del estudiante. La ruta de API
 * los lee una vez por instancia y los deja en memoria; a partir de ahí cada consulta es
 * una búsqueda en un `Map`.
 *
 * El archivo tiene que viajar dentro de la función serverless, y para eso está declarado
 * en `outputFileTracingIncludes` de `next.config.ts`. Si se mueve de sitio, hay que
 * moverlo también allí o la ruta responderá 500 en producción pero funcionará en local
 * — que es la forma más incómoda de romperlo.
 */

const DICTIONARY_PATH = 'src/data/fonetica/en-cmudict.txt'

let cache: Map<string, string[]> | null = null
let loading: Promise<Map<string, string[]>> | null = null

async function load(): Promise<Map<string, string[]>> {
  const raw = await readFile(join(process.cwd(), DICTIONARY_PATH), 'utf8')
  const map = new Map<string, string[]>()

  for (const line of raw.split('\n')) {
    const space = line.indexOf(' ')
    if (space < 0) continue
    // `word(2)` es una pronunciación alternativa de `word`, no otra palabra.
    const word = line.slice(0, space).replace(/\(\d+\)$/, '')
    const phones = line.slice(space + 1)
    const existing = map.get(word)
    if (existing) existing.push(phones)
    else map.set(word, [phones])
  }

  cache = map
  return map
}

/**
 * Devuelve el diccionario, cargándolo la primera vez. Las llamadas simultáneas comparten
 * la carga.
 *
 * El `catch` que borra `loading` no es adorno: sin él, un fallo pasajero en la primera
 * lectura —un descriptor de archivo agotado, un disco lento— dejaba guardada una promesa
 * rechazada, y **todas** las peticiones siguientes de esa instancia fallaban para siempre
 * aunque el problema ya no existiera. Con él, el siguiente intento vuelve a probar.
 */
export function getDictionary(): Promise<Map<string, string[]>> {
  if (cache) return Promise.resolve(cache)
  loading ??= load().catch((error: unknown) => {
    loading = null
    throw error
  })
  return loading
}
