/**
 * Preguntas frecuentes del transcriptor de inglés.
 *
 * **Fuente única a propósito.** El `FAQPage` de los datos estructurados y el bloque que
 * el estudiante ve en pantalla salen los dos de aquí, así que no pueden divergir. Es la
 * misma regla que ya sigue `src/app/(site)/clases-de-ingles/page.tsx`, y no es una manía
 * de estilo: Google exige que el contenido marcado como FAQ esté visible en la página, y
 * declarar preguntas que no aparecen es motivo de acción manual por contenido engañoso.
 *
 * Si añades una pregunta aquí, sale en los dos sitios sola. Si la borras, desaparece de
 * los dos. No escribas ninguna de las dos cosas a mano.
 */

export interface Faq {
  readonly question: string
  readonly answer: string
}

export const FAQS_INGLES: Faq[] = [
  {
    question: '¿Qué es el alfabeto fonético internacional (AFI)?',
    answer:
      'Es un sistema en el que cada símbolo representa un solo sonido, siempre el mismo. Sirve para escribir cómo suena una palabra sin depender de la ortografía, que en inglés engaña: «though», «through» y «tough» se escriben casi igual y no comparten ni un sonido en la parte final.',
  },
  {
    question: '¿Cuál es la diferencia entre la transcripción británica y la americana?',
    answer:
      'La más visible es la /r/: el británico solo la pronuncia si le sigue una vocal, así que «car» es /kɑː/ pero «car engine» es /kɑːr ˈendʒɪn/. También cambian vocales enteras: «ask» es /æsk/ en Estados Unidos y /ɑːsk/ en Inglaterra, y «new» es /nu/ frente a /njuː/.',
  },
  {
    question: '¿Qué son las formas débiles y por qué están apagadas?',
    answer:
      'Son la pronunciación reducida que toman las palabras gramaticales dentro de una frase. Nadie dice «I /kæn/ swim»: se dice «I /kən/ swim». No oírlas es una de las razones por las que se entiende cada palabra suelta pero no la frase entera. Vienen apagadas porque la forma fuerte es la que hay que aprender primero.',
  },
  {
    question: '¿Por qué algunas palabras salen en color y se pueden pulsar?',
    answer:
      'Porque admiten más de una pronunciación y cuál es la correcta depende del significado: «read» es /riːd/ en presente y /red/ en pasado. Ningún programa lo adivina sin entender la frase, así que la herramienta te enseña las opciones y eliges tú.',
  },
  {
    question: '¿De dónde salen las pronunciaciones?',
    answer:
      'Del diccionario de pronunciación de la Universidad Carnegie Mellon, con 126.037 palabras escritas a mano. La forma británica se deriva de la americana aplicando las reglas del RP. Las palabras que no están en el diccionario salen marcadas en rojo, sin inventar.',
  },
  {
    question: '¿Es gratis? ¿Hay que registrarse?',
    answer:
      'Es gratis y no pide correo, cuenta ni registro. La usamos en clase y está abierta para cualquiera.',
  },
]
