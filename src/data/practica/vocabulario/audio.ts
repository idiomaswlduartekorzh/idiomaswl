import manifiesto from './audio-manifest.json'

/**
 * Dónde suena cada palabra y cada frase dentro de su mp3 de unidad.
 *
 * El audio no se guarda en un archivo por palabra: las 8.400 entradas del catálogo darían
 * 16.800 archivos sueltos. Va un mp3 por unidad —diez palabras con sus diez frases— y aquí
 * se guarda el segundo exacto en que empieza y acaba cada corte, medido con ffprobe sobre el
 * archivo real por `scripts/generate-vocab-audio.mjs`.
 *
 * Los números NO se estiman. Si el corte miente, el reproductor corta la palabra por la
 * mitad o mete la siguiente; es la misma razón por la que escucha mide la duración de cada
 * episodio en vez de calcularla.
 */

export type CorteAudio = { src: string; inicio: number; fin: number }

type Manifiesto = {
  unidades: {
    archivo: string
    cortes: { clave: string; inicio: number; fin: number }[]
  }[]
}

const indice = new Map<string, CorteAudio>()

for (const unidad of (manifiesto as Manifiesto).unidades) {
  // El manifiesto guarda la ruta desde la raíz del repo («public/audio/…») porque es la que
  // sirve para auditar y para borrar; el navegador necesita la ruta pública, sin «public».
  const src = `/${unidad.archivo.replace(/^public\//u, '')}`
  for (const corte of unidad.cortes) {
    indice.set(corte.clave, { src, inicio: corte.inicio, fin: corte.fin })
  }
}

/**
 * El corte de una entrada, o `undefined` si ese idioma o nivel todavía no tiene audio.
 *
 * Devolver `undefined` es parte del contrato: hoy solo inglés A1 está grabado, y el motor
 * tiene que seguir funcionando en los otros 23 niveles con la voz del navegador.
 */
export function audioDe(id: string, que: 'lemma' | 'ejemplo'): CorteAudio | undefined {
  return indice.get(`${id}:${que}`)
}

/** Cuántos cortes hay grabados. Lo usa la puerta de calidad para informar. */
export const cortesGrabados = indice.size
