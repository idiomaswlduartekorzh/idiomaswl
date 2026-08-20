import type { Faq } from './faq-ingles'

/**
 * Preguntas frecuentes del transcriptor de coreano.
 *
 * **Fuente única**, igual que las del inglés: el `FAQPage` de los datos estructurados y el
 * bloque visible salen de aquí, así que no pueden divergir. Google exige que el contenido
 * marcado como FAQ esté en la página.
 *
 * Y son distintas de las del inglés a propósito. Si al añadir un idioma solo cambiara el
 * nombre del idioma, esa página no merecería existir: serían ocho páginas casi iguales
 * compitiendo entre sí. Las preguntas de coreano son las que se hace quien estudia coreano
 * —qué es el batchim, por qué la romanización no basta— y no tienen equivalente en inglés.
 */
export const FAQS_COREANO: Faq[] = [
  {
    question: '¿Por qué 학교 no suena «hak-gyo»?',
    answer:
      'Porque en coreano las consonantes cambian al tocarse. La ㄱ de la segunda sílaba va detrás de una consonante cerrada, y eso la tensa: suena 학꾜, /hak̚k͈jo/. No es una excepción ni un acento regional; es una regla fija que todo coreano aplica sin pensar.',
  },
  {
    question: '¿Qué es el batchim y por qué cambia la pronunciación?',
    answer:
      'El batchim (받침) es la consonante que cierra una sílaba. Solo tiene siete sonidos posibles, así que muchas letras distintas suenan igual ahí: 옷, 옺 y 옽 se pronuncian las tres /ot̚/. Y cuando la sílaba siguiente empieza por vocal, el batchim se muda a ella: 밥을 suena 바블.',
  },
  {
    question: '¿Por qué no me basta con la romanización?',
    answer:
      'Porque la romanización oficial de 학교 es «hakgyo», y eso le dice a un hispanohablante que pronuncie justo lo que no suena. La romanización sirve para escribir un nombre en un pasaporte o leer un cartel de metro. Para aprender a hablar, el alfabeto fonético es el que dice la verdad.',
  },
  {
    question: '¿Qué significa la marquita de 책 /tɕʰɛk̚/?',
    answer:
      'Esa marca quiere decir que la consonante se queda parada: la lengua llega a su sitio y ahí se detiene, sin soltar el aire. En español no existe, y por eso decimos «che-ke» en vez de 책. Añadir esa vocal convierte una sílaba en dos y es el error que más hace que no te entiendan.',
  },
  {
    question: '¿Necesita diccionario? ¿Funciona con cualquier palabra?',
    answer:
      'No necesita diccionario: el coreano se pronuncia por reglas, y la herramienta las aplica. Funciona con cualquier palabra escrita en hangul, incluso inventada. Lo que no es hangul —números, letras latinas, hanja— se deja tal cual en vez de adivinar.',
  },
  {
    question: '¿Es gratis? ¿Hay que registrarse?',
    answer:
      'Es gratis y no pide correo, cuenta ni registro. La usamos en clase y está abierta para cualquiera.',
  },
]
