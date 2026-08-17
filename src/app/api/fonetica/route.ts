import { NextResponse } from 'next/server'

import { getDictionary } from '@/lib/fonetica/dictionary'
import { transcribe } from '@/lib/fonetica/transcribe'
import { transcribeKoreanText } from '@/lib/fonetica/coreano/transcribe'

/**
 * Transcripción fonética de un texto en inglés.
 *
 * Vive en el servidor porque el diccionario pesa 3,45 MB: mandarlo al navegador
 * castigaría a quien entre desde un móvil con datos, que es la mayoría. A cambio, la
 * respuesta trae **los dos acentos y todas las variantes de cada palabra a la vez**, así
 * que cambiar de británico a americano, encender las formas débiles o elegir otra
 * pronunciación no vuelve a pedir nada: todo eso ya está resuelto en el navegador.
 *
 * ## Por qué está tan defendida para lo poco que hace
 *
 * Es una ruta pública, sin autenticación, que **amplifica**: 12.000 caracteres de entrada
 * pueden devolver un megabyte de JSON, unas 88 veces más de lo que cuesta pedirlo. Medido.
 * El gasto de CPU es despreciable (96 ms en el peor caso), pero el de tráfico de salida no,
 * y en Vercel el tráfico se factura. De ahí las tres puertas de abajo: tipo de contenido,
 * tamaño anunciado y tamaño real.
 *
 * La de `Content-Type` es la que más rinde y la menos obvia: exigir `application/json`
 * obliga al navegador a hacer una petición de comprobación previa (preflight) antes de
 * llamarnos desde otro dominio. Como esta ruta no publica cabeceras CORS, esa comprobación
 * falla y la llamada nunca llega a ejecutarse. Sin eso, cualquier web ajena puede convertir
 * a sus visitantes en generadores de factura para WeLearn.
 *
 * Lo que aquí no se puede resolver es el límite de peticiones por IP: eso va en el
 * cortafuegos de Vercel. Ver `docs/transcripcion-fonetica.md`, apartado 8.
 */

export const runtime = 'nodejs'
/** Con un techo medido de 96 ms, esto es un seguro gratis, no una previsión. */
export const maxDuration = 10

/** Tope de entrada. Unas 2.000 palabras: de sobra para un texto de clase. */
const MAX_CHARACTERS = 12_000
/** Tope del cuerpo, para poder rechazar antes de gastar el parseo de JSON. */
const MAX_BODY_BYTES = 64_000

const json = (body: unknown, status: number) =>
  NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

/* ------------------------------------------------------------------ *
 * Freno de peticiones
 * ------------------------------------------------------------------ */

/**
 * Tope por IP, contado en memoria.
 *
 * **Esto no sustituye a una regla en el cortafuegos de Vercel**, y conviene saber por qué
 * antes de confiarse: cada instancia de la función lleva su propia cuenta, y Vercel arranca
 * las que hagan falta. Quien reparta sus peticiones entre muchas instancias se salta el
 * tope; para eso hace falta una regla en el panel, que ve todo el tráfico junto.
 *
 * Lo que sí hace, y no es poco: un bucle desde una sola máquina golpea instancias calientes
 * una y otra vez, así que se topa con esto casi siempre. Convierte el ataque barato en uno
 * que exige esfuerzo, y cuesta cero.
 *
 * Treinta por minuto es holgado para una persona: transcribir un texto son una o dos
 * peticiones, y volver a pulsar el botón con el mismo texto no llega aquí —el navegador se
 * lo guarda—.
 */
const RATE_WINDOW_MS = 60_000
const RATE_LIMIT = 30
/** Tope de IPs recordadas, para que la propia defensa no se coma la memoria. */
const RATE_MAX_KEYS = 5_000

const hits = new Map<string, { count: number; resetAt: number }>()

function rateLimited(request: Request): boolean {
  // En Vercel la IP real llega en `x-forwarded-for`; la primera es la del cliente.
  const forwarded = request.headers.get('x-forwarded-for') ?? ''
  const ip = forwarded.split(',')[0].trim() || 'desconocida'
  const now = Date.now()

  if (hits.size > RATE_MAX_KEYS) {
    for (const [key, entry] of hits) if (entry.resetAt < now) hits.delete(key)
    if (hits.size > RATE_MAX_KEYS) hits.clear()
  }

  const entry = hits.get(ip)
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }

  entry.count += 1
  return entry.count > RATE_LIMIT
}

export async function POST(request: Request) {
  if (rateLimited(request)) {
    return json(
      { error: 'Demasiadas peticiones seguidas. Espera un minuto y vuelve a intentarlo.' },
      429,
    )
  }

  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().includes('application/json')) {
    return json({ error: 'Se esperaba Content-Type: application/json.' }, 415)
  }

  const declaredLength = Number(request.headers.get('content-length') ?? 0)
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ error: 'El texto es demasiado largo.' }, 413)
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return json({ error: 'Cuerpo de la petición ilegible.' }, 400)
  }

  // `JSON.parse('null')` es válido, así que sin esta guarda un cuerpo `null` pasaba el
  // try/catch y reventaba al leer `.text`.
  if (typeof payload !== 'object' || payload === null) {
    return json({ error: 'Se esperaba un objeto con el campo «text».' }, 400)
  }

  const body = payload as { text?: unknown; acronyms?: unknown; lang?: unknown }
  // El idioma decide el motor. Por defecto inglés, que es el que ya existía.
  const lang = body.lang === 'coreano' ? 'coreano' : 'ingles'

  if (typeof body.text !== 'string') {
    return json({ error: 'Falta el texto que transcribir.' }, 400)
  }

  if (body.text.length > MAX_CHARACTERS) {
    return json(
      { error: `El texto supera los ${MAX_CHARACTERS.toLocaleString('es-CO')} caracteres.` },
      413,
    )
  }

  try {
    // El coreano no lleva diccionario: son reglas. Por eso no carga nada de disco y su
    // arranque en frío es inmediato.
    const tokens = lang === 'coreano'
      ? transcribeKoreanText(body.text)
      : transcribe(body.text, await getDictionary(), { acronyms: body.acronyms !== false })
    const words = tokens.filter((token) => token.kind === 'word')

    return json({
      tokens,
      stats: {
        words: words.length,
        unknown: words.filter((token) => token.status === 'unknown').length,
        derived: words.filter((token) => token.status === 'derived').length,
      },
    }, 200)
  } catch (cause) {
    // Sin esto, cualquier fallo salía como el 500 genérico de Next en `text/plain`, que el
    // cliente no puede leer como JSON: el estudiante veía un mensaje inventado en vez del
    // real. El caso realista es que el diccionario no viaje dentro de la función.
    console.error('[fonetica] la transcripción falló:', cause)
    return json({ error: 'El transcriptor no está disponible ahora mismo.' }, 503)
  }
}
