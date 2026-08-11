import type { VocabBlock } from './schema'

/**
 * El reparto de un bloque en unidades de estudio.
 *
 * Vive solo, sin importar ningún nivel, para que lo pueda cargar cualquiera: el motor en
 * pantalla, la puerta de calidad y el script que factura el audio. Estaba dentro de
 * `registry.ts`, que importa los niveles enteros, y por eso el script de audio no pudo
 * importarlo y acabó con su propia copia — que ya se desincronizó a las dos horas.
 */

/** Palabras por unidad. Una unidad es un día de estudio: unos doce minutos. */
export const TAMANO_UNIDAD = 10

/**
 * Reordena un bloque para que las palabras que se confunden no caigan en la misma unidad.
 *
 * La auditoría de usuario lo describió mejor que ninguna métrica: en el bloque de cortesía,
 * la unidad 3 juntaba `because` («porque») y `why` («por qué») —que en la caja 3, donde solo
 * se ve la glosa española, son el mismo prompt a las once de la noche— y además cinco
 * monosílabos con w-: `why, what, who, when, how`. Y la unidad 1 tenía `hello` y `hi`, las
 * dos glosadas «hola». Cada confusión cuesta cuatro peldaños, porque fallar devuelve la
 * palabra a la caja 1.
 *
 * El orden se declara aquí y no se deja al orden del archivo por dos razones: se lee de un
 * vistazo cuál era la intención, y si alguien añade una entrada y se olvida de colocarla, la
 * función lo dice en vez de recolocarla en silencio.
 */
export function reordenar<T extends { lemma: string }>(entradas: T[], orden: string[]): T[] {
  const porLema = new Map(entradas.map((e) => [e.lemma, e]))
  const out: T[] = []
  for (const lema of orden) {
    const e = porLema.get(lema)
    if (!e) throw new Error(`reordenar: «${lema}» no está en el bloque`)
    porLema.delete(lema)
    out.push(e)
  }
  if (porLema.size) {
    throw new Error(`reordenar: sin colocar — ${[...porLema.keys()].join(', ')}`)
  }
  return out
}

/**
 * Reparte, no trocea.
 *
 * La primera versión cortaba de diez en diez, y funcionó mientras todos los bloques midieron
 * 30 o 40. En cuanto la auditoría pedagógica obligó a meter `go`, `hurt` y `English` en
 * bloques ya cerrados, tres pasaron a 31 entradas y la última unidad se quedó **con una sola
 * palabra**: una sesión de estudio de un ítem, con su dictado y su cierre de cinco frases.
 * Lo destapó la factura del audio al contar 4 mp3 donde el motor pinta 3.
 *
 * Ahora se decide primero cuántas unidades salen —redondeando a la decena más cercana— y
 * después se reparten lo más parejo posible: 31 da 11+10+10, no 10+10+10+1.
 */
export function unidadesDe(bloque: VocabBlock, tamano = TAMANO_UNIDAD): VocabBlock['entradas'][] {
  const total = bloque.entradas.length
  if (total === 0) return []
  const cuantas = Math.max(1, Math.round(total / tamano))
  const unidades: VocabBlock['entradas'][] = []
  let desde = 0
  for (let i = 0; i < cuantas; i += 1) {
    // Las primeras se llevan la palabra de más cuando la división no es exacta.
    const largo = Math.ceil((total - desde) / (cuantas - i))
    unidades.push(bloque.entradas.slice(desde, desde + largo))
    desde += largo
  }
  return unidades
}
