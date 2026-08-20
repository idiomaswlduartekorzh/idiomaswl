import VocabularyHub from '@/components/practica/VocabularyHub'

/**
 * El hub de vocabulario de inglés A2.
 *
 * Sustituye a la página anterior por el mismo motivo que en A1: tenía sus propios sets de
 * flashcards con unas 60 palabras sueltas —vuelo, pasaporte, equipaje, salario— resueltas en
 * la misma pantalla, y este nivel enseña 350 con ficha completa, procedencia declarada y la
 * escalera de cinco cajas.
 *
 * Las palabras que aquella página tenía no se pierden: `flight`, `passport`, `luggage`,
 * `departure`, `arrival` y `salary` están las seis en el catálogo nuevo, ahora con ejemplo,
 * colocaciones y su sello de origen.
 */

export default function VocabularioInglesA2() {
  return (
    <VocabularyHub
      idioma="ingles"
      nivel="a2"
      etiqueta="🇬🇧 Inglés A2"
      titulo="Vocabulario A2"
      color="var(--wlp-accent-vocabulario)"
    />
  )
}
