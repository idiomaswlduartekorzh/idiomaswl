'use client'

import { useCallback, useEffect, useState } from 'react'
import type { VocabEntry } from '@/data/practica/vocabulario/schema'
import {
  claveDe,
  esProgresoValido,
  fusionar,
  progresoVacio,
  type ProgresoBloque,
} from '@/data/practica/vocabulario/progreso'

/**
 * El progreso de un bloque, guardado en el navegador.
 *
 * Aquí solo vive lo que no se puede auditar en Node: leer y escribir `localStorage`. Todo lo
 * que decide qué se conserva —qué claves valen, qué se descarta, cómo se cuenta— está en
 * `progreso.ts`, que la puerta de calidad sí puede ejecutar.
 *
 * Sigue la convención de `useGrammarProgress`: estado vacío en el primer render y carga en un
 * efecto, para que el servidor y el cliente pinten lo mismo y React no se queje de hidratación.
 * `listo` dice si ya se leyó, y sirve para no enseñar «empezar de cero» a alguien que tiene
 * media unidad hecha.
 *
 * Sin cuenta, esto se queda en este navegador. Con cuenta se sincronizará contra Supabase y la
 * caja 5 dejará de llegar el mismo día, que es lo que promete la metodología.
 */
export function useVocabProgress(
  lang: string,
  nivel: string,
  bloque: string,
  entradas: VocabEntry[],
) {
  const [cajas, setCajas] = useState<Record<string, number>>(() => fusionar(null, entradas))
  const [listo, setListo] = useState(false)

  useEffect(() => {
    let guardado: ProgresoBloque | null = null
    try {
      const raw = localStorage.getItem(claveDe(lang, nivel, bloque))
      if (raw) {
        const parsed: unknown = JSON.parse(raw)
        if (esProgresoValido(parsed)) guardado = parsed
      }
    } catch {
      // Modo privado, cuota llena o JSON roto: se sigue sin progreso, no se rompe la sesión.
    }
    setCajas(fusionar(guardado, entradas))
    setListo(true)
    // `entradas` es estable dentro de un bloque; la clave la forman los tres primeros.
  }, [lang, nivel, bloque, entradas])

  const guardar = useCallback(
    (siguientes: Record<string, number>) => {
      setCajas(siguientes)
      try {
        const payload: ProgresoBloque = { cajas: siguientes, actualizado: new Date().toISOString() }
        localStorage.setItem(claveDe(lang, nivel, bloque), JSON.stringify(payload))
      } catch {
        // Que no se pueda guardar no puede impedir seguir estudiando.
      }
    },
    [lang, nivel, bloque],
  )

  const olvidar = useCallback(() => {
    try {
      localStorage.removeItem(claveDe(lang, nivel, bloque))
    } catch {
      /* da igual: lo que manda es el estado en memoria */
    }
    setCajas(fusionar(null, entradas))
  }, [lang, nivel, bloque, entradas])

  return { cajas, guardar, olvidar, listo }
}

export { progresoVacio }
