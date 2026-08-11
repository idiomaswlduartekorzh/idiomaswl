import VocabularyHub from '@/components/practica/VocabularyHub'

/**
 * El hub de vocabulario de inglés A1.
 *
 * Sustituye —el 9 de agosto de 2026, por decisión del usuario— a la página anterior, que
 * tenía sus propios 6 sets de 60 palabras con flashcards, opción múltiple y rellenar huecos
 * dentro de la misma pantalla. Se retiró entera porque las dos cosas no podían convivir en la
 * misma URL: aquel contenido enseñaba 60 palabras sueltas y este nivel enseña 334 con ficha
 * completa, procedencia declarada y la escalera de cinco cajas del método.
 *
 * Lo que aquella página hacía en una pantalla lo hace ahora cada bloque en la suya
 * (`[slug]/page.tsx`), con el motor entero. Aquí solo se reparten los diez caminos, y el
 * reparto vive en `VocabularyHub` desde que A2 pidió exactamente la misma página.
 */

export default function VocabularioInglesA1() {
  return (
    <VocabularyHub
      idioma="ingles"
      nivel="a1"
      etiqueta="🇬🇧 Inglés A1"
      titulo="Vocabulario A1"
      color="#e11d48"
    />
  )
}
