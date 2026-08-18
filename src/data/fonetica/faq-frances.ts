import type { Faq } from './faq-ingles'

/**
 * Preguntas frecuentes del transcriptor de francés. **Fuente única**: alimenta a la vez el
 * bloque visible y el `FAQPage` de los datos estructurados.
 *
 * Son distintas de las del inglés y del coreano a propósito. Si al añadir un idioma solo
 * cambiara el nombre del idioma, esa página no merecería existir.
 */
export const FAQS_FRANCES: Faq[] = [
  {
    question: '¿Por qué la mitad de las letras no se pronuncian?',
    answer:
      'Porque el francés dejó de pronunciar casi todas sus consonantes finales hace siglos, pero siguió escribiéndolas. «Beaucoup» tiene nueve letras y cuatro sonidos: /boku/. La herramienta te marca cuáles callan, que es la mitad de la clase.',
  },
  {
    question: '¿Qué es la liaison y por qué a veces sí y a veces no?',
    answer:
      'Es la consonante muda que reaparece cuando la palabra siguiente empieza por vocal: «les» es /le/, pero «les amis» es /le‿zami/. Y no solo vuelve, cambia de sonido: la s suena /z/. Ocurre entre determinante y nombre, pronombre y verbo, o adjetivo y nombre — no entre dos palabras cualesquiera.',
  },
  {
    question: '¿Por qué «les héros» no lleva liaison si empieza por vocal?',
    answer:
      'Porque su h es aspirada. El francés tiene dos haches que se escriben igual y se comportan distinto: ante la muda se enlaza («les hommes» /le‿zɔm/) y ante la aspirada no («les héros» /le eʁo/). No hay regla que lo prediga —depende de si la palabra vino del latín o del germánico— así que la herramienta lleva la lista.',
  },
  {
    question: '¿Necesita diccionario?',
    answer:
      'No. El francés se lee con reglas, al revés que el inglés: su ortografía sí predice la pronunciación, aunque haga falta saber muchas reglas. Eso significa que funciona con cualquier palabra, incluidas las que no están en ningún diccionario.',
  },
  {
    question: '¿Es siempre exacto?',
    answer:
      'Con el vocabulario corriente, sí. Con nombres propios acierta bastante menos: «Bardot» o «Belmessous» no siguen las reglas, y ninguna regla puede saberlo. Las palabras que no puede resolver salen marcadas en vez de inventadas.',
  },
  {
    question: '¿Es gratis? ¿Hay que registrarse?',
    answer: 'Es gratis y no pide correo, cuenta ni registro.',
  },
]
