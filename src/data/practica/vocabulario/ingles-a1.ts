import type { Colocacion, VocabEntry, VocabLevel } from './schema'

/**
 * Inglés A1 · núcleo productivo.
 *
 * PILOTO — bloque 1 de 10, sometido a la Puerta 1 (docs/vocabulario-plan-de-arranque.md).
 * Los otros nueve bloques no se escriben hasta que este pase.
 *
 * Segunda versión, tras la revisión pedagógica. Lo que cambió y por qué:
 *
 *  · Las colocaciones llevan traducción. Una colocación sin traducir no enseña nada en A1:
 *    si el estudiante no entiende «work as a waitress», la ficha le da ruido.
 *  · Se fueron street, bakery, busy, start y cook. Eran relleno de otros bloques —ciudad,
 *    rutina, comida— metidos aquí porque el corpus no daba para treinta palabras de personas.
 *    Entraron friend, people, children, brother, woman y young, que sí son del tema.
 *  · Tres entradas llevan ejemplo redactado y declarado como tal: el corpus de inglés A1 no
 *    dice «brother», «woman» ni «young» en ningún turno de los veinte episodios. Se declara
 *    en vez de disimularlo, y queda anotado para la próxima ampliación del corpus.
 *
 * Las otras 27 frases están tomadas literal del corpus. Comprobable una por una:
 *
 *   node scripts/vocab-corpus-index.mjs --lang ingles --level a1 --find "bakery"
 */

const SERIE = 'The Corner Shop'

/** Colocación con su traducción. */
const c = (chunk: string, es: string): Colocacion => ({ chunk, es })

type Tipo = { tipo: 'sustantivo' } | { tipo: 'verbo'; phrasal?: string[] } | { tipo: 'otro' }
type FuenteCorta =
  | { target: string; es: string; episodio: number }
  | { target: string; es: string; lectura: string }
  | { target: string; es: string; motivo: string }

const en = (
  id: string,
  lemma: string,
  es: string,
  pos: VocabEntry['pos'],
  acento: string,
  colocaciones: Colocacion[],
  ejemplo: FuenteCorta,
  extra: Tipo,
  registro: 'neutro' | 'formal' | 'informal' = 'neutro',
): VocabEntry => ({
  id,
  lemma,
  es,
  pos,
  ejemplo: {
    target: ejemplo.target,
    es: ejemplo.es,
    fuente:
      'episodio' in ejemplo
        ? { tipo: 'corpus', serie: SERIE, episodio: ejemplo.episodio }
        : 'lectura' in ejemplo
          ? { tipo: 'lectura', ejercicio: ejemplo.lectura }
          : { tipo: 'redactado', motivo: ejemplo.motivo },
  },
  extra: { lang: 'ingles', acento, registro, colocaciones, ...extra },
})

const SIN_CORPUS = (palabra: string) =>
  `«${palabra}» no aparece en ninguno de los 20 episodios de ${SERIE} ni en los ejercicios de lectura de inglés A1, ` +
  `y un A1 no puede hablar de su gente sin ella. Ejemplo redactado al nivel del bloque. ` +
  `Anotado para la próxima ampliación del corpus.`

// ─── Unidad 1 · Me presento ───────────────────────────────────────────────────

const unidad1: VocabEntry[] = [
  en('en-a1-001', 'name', 'nombre', 'sustantivo', 'name',
    [c('my name is…', 'me llamo…'), c("what's your name?", '¿cómo te llamas?'), c('first name', 'nombre de pila'), c('last name', 'apellido')],
    { target: 'Hello. My name is Maya. I’m twenty years old.', es: 'Hola. Me llamo Maya. Tengo veinte años.', episodio: 1 },
    { tipo: 'sustantivo' }),

  en('en-a1-002', 'student', 'estudiante', 'sustantivo', 'STU-dent',
    [c('I’m a student', 'soy estudiante'), c('a good student', 'un buen estudiante'), c('a university student', 'un estudiante universitario')],
    { target: 'I’m a student, and I’m a waitress on Saturdays.', es: 'Soy estudiante y camarera los sábados.', episodio: 1 },
    { tipo: 'sustantivo' }),

  en('en-a1-003', 'live', 'vivir', 'verbo', 'live',
    [c('live in Bogotá', 'vivir en Bogotá'), c('live with my parents', 'vivir con mis padres'), c('I live here now', 'ahora vivo aquí')],
    { target: 'I’m from Cartagena, in Colombia. Now I live here.', es: 'Soy de Cartagena, en Colombia. Ahora vivo aquí.', episodio: 1 },
    { tipo: 'verbo' }),

  en('en-a1-004', 'from', 'de (procedencia)', 'preposicion', 'from',
    [c('where are you from?', '¿de dónde eres?'), c('I’m from Colombia', 'soy de Colombia'), c('far from here', 'lejos de aquí')],
    { target: 'I’m from Cartagena, in Colombia. Now I live here.', es: 'Soy de Cartagena, en Colombia. Ahora vivo aquí.', episodio: 1 },
    { tipo: 'otro' }),

  en('en-a1-005', 'year', 'año', 'sustantivo', 'year',
    [c('twenty years old', 'veinte años'), c('last year', 'el año pasado'), c('every year', 'todos los años')],
    { target: 'Hello. My name is Maya. I’m twenty years old.', es: 'Hola. Me llamo Maya. Tengo veinte años.', episodio: 1 },
    { tipo: 'sustantivo' }),

  en('en-a1-006', 'old', 'viejo / de edad', 'adjetivo', 'old',
    [c('how old are you?', '¿cuántos años tienes?'), c('ten years old', 'diez años'), c('an old table', 'una mesa vieja')],
    { target: 'There are four chairs and one very old table.', es: 'Hay cuatro sillas y una mesa muy vieja.', episodio: 4 },
    { tipo: 'otro' }),

  en('en-a1-007', 'new', 'nuevo', 'adjetivo', 'new',
    [c('are you new here?', '¿eres nuevo aquí?'), c('a new job', 'un trabajo nuevo'), c('a new student', 'un estudiante nuevo')],
    { target: 'Hi! Are you new here? I’m Leo.', es: '¡Hola! ¿Eres nueva aquí? Soy Leo.', episodio: 1 },
    { tipo: 'otro' }),

  en('en-a1-008', 'meet', 'conocer (a alguien)', 'verbo', 'meet',
    [c('nice to meet you', 'encantado de conocerte'), c('meet a friend', 'quedar con un amigo'), c('meet someone new', 'conocer a alguien nuevo')],
    { target: 'Nice to meet you, Leo. This street is very quiet.', es: 'Encantada, Leo. Esta calle es muy tranquila.', episodio: 1 },
    { tipo: 'verbo' }),

  en('en-a1-009', 'friend', 'amigo / amiga', 'sustantivo', 'friend',
    [c('a good friend', 'un buen amigo'), c('my best friend', 'mi mejor amigo'), c('we are friends', 'somos amigos')],
    { target: 'Max and your cat are friends already.', es: 'Max y tu gato ya son amigos.', episodio: 15 },
    { tipo: 'sustantivo' }),

  en('en-a1-010', 'people', 'gente / personas', 'sustantivo', 'PEO-ple',
    [c('a lot of people', 'mucha gente'), c('the people here', 'la gente de aquí'), c('nice people', 'gente amable')],
    { target: 'I like the people. I don’t like the noise.', es: 'Me gusta la gente. No me gusta el ruido.', episodio: 12 },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 2 · Mi familia ────────────────────────────────────────────────────

const unidad2: VocabEntry[] = [
  en('en-a1-011', 'family', 'familia', 'sustantivo', 'FAM-i-ly',
    [c('a big family', 'una familia grande'), c('a family photo', 'una foto de familia'), c('the whole family', 'toda la familia')],
    { target: 'This is a photo of my family.', es: 'Esta es una foto de mi familia.', episodio: 2 },
    { tipo: 'sustantivo' }),

  en('en-a1-012', 'father', 'padre', 'sustantivo', 'FA-ther',
    [c('my father is a…', 'mi padre es…'), c('my father works at…', 'mi padre trabaja en…')],
    { target: 'Sometimes. My father drives a bus in the morning.', es: 'A veces. Mi padre conduce un autobús por la mañana.', episodio: 7 },
    { tipo: 'sustantivo' }),

  en('en-a1-013', 'mother', 'madre', 'sustantivo', 'MO-ther',
    [c('my mother is a…', 'mi madre es…'), c('my mother works at…', 'mi madre trabaja en…')],
    { target: 'My mother works at the hospital. She starts at seven.', es: 'Mi madre trabaja en el hospital. Empieza a las siete.', episodio: 7 },
    { tipo: 'sustantivo' }),

  en('en-a1-014', 'sister', 'hermana', 'sustantivo', 'SIS-ter',
    [c('my older sister', 'mi hermana mayor'), c('my younger sister', 'mi hermana menor'), c('I have one sister', 'tengo una hermana')],
    { target: 'Is that your sister?', es: '¿Esa es tu hermana?', episodio: 2 },
    { tipo: 'sustantivo' }),

  en('en-a1-015', 'brother', 'hermano', 'sustantivo', 'BRO-ther',
    [c('my older brother', 'mi hermano mayor'), c('my younger brother', 'mi hermano menor'), c('I have two brothers', 'tengo dos hermanos')],
    { target: 'My brother is sixteen. He is a student too.', es: 'Mi hermano tiene dieciséis. También es estudiante.', motivo: SIN_CORPUS('brother') },
    { tipo: 'sustantivo' }),

  en('en-a1-016', 'grandfather', 'abuelo', 'sustantivo', 'GRAND-fa-ther',
    [c('visit my grandfather', 'visitar a mi abuelo'), c('my grandfather had a shop', 'mi abuelo tenía una tienda')],
    { target: 'That’s my grandfather Sam. His bakery was on this street.', es: 'Ese es mi abuelo Sam. Su panadería estaba en esta calle.', episodio: 2 },
    { tipo: 'sustantivo' }),

  en('en-a1-017', 'grandmother', 'abuela', 'sustantivo', 'GRAND-mo-ther',
    [c('visit my grandmother', 'visitar a mi abuela'), c('my grandmother has…', 'mi abuela tiene…')],
    { target: 'My grandmother has a table like that.', es: 'Mi abuela tiene una mesa así.', episodio: 4 },
    { tipo: 'sustantivo' }),

  en('en-a1-018', 'parents', 'padres', 'sustantivo', 'PA-rents',
    [c('live with my parents', 'vivir con mis padres'), c('my parents work', 'mis padres trabajan')],
    { target: 'Really? And your parents?', es: '¿En serio? ¿Y tus padres?', episodio: 2 },
    { tipo: 'sustantivo' }),

  en('en-a1-019', 'children', 'niños / hijos', 'sustantivo', 'CHIL-dren',
    [c('two children', 'dos niños'), c('have children', 'tener hijos'), c('the children are playing', 'los niños están jugando')],
    { target: 'Children are playing football near the trees.', es: 'Unos niños juegan al fútbol cerca de los árboles.', episodio: 16 },
    { tipo: 'sustantivo' }),

  en('en-a1-020', 'photo', 'foto', 'sustantivo', 'PHO-to',
    [c('a photo of my family', 'una foto de mi familia'), c('take a photo', 'hacer una foto'), c('old photos', 'fotos antiguas')],
    { target: 'There are books and a box of old photos.', es: 'Hay libros y una caja de fotos antiguas.', episodio: 3 },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 3 · Quién es quién ────────────────────────────────────────────────

const unidad3: VocabEntry[] = [
  en('en-a1-021', 'man', 'hombre', 'sustantivo', 'man',
    [c('a young man', 'un hombre joven'), c('an old man', 'un hombre mayor'), c('who is that man?', '¿quién es ese hombre?')],
    { target: 'Who is the man with the hat?', es: '¿Quién es el hombre del sombrero?', episodio: 2 },
    { tipo: 'sustantivo' }),

  en('en-a1-022', 'woman', 'mujer', 'sustantivo', 'WO-man',
    [c('a young woman', 'una mujer joven'), c('an old woman', 'una mujer mayor'), c('who is that woman?', '¿quién es esa mujer?')],
    { target: 'And two women are running with their dogs.', es: 'Y dos mujeres corren con sus perros.', episodio: 16 },
    { tipo: 'sustantivo' }),

  en('en-a1-023', 'young', 'joven', 'adjetivo', 'young',
    [c('a young man', 'un hombre joven'), c('young people', 'la gente joven'), c('my younger sister', 'mi hermana menor')],
    { target: 'My grandfather is old, but he is not tired. My sister is young.', es: 'Mi abuelo es mayor, pero no está cansado. Mi hermana es joven.', motivo: SIN_CORPUS('young') },
    { tipo: 'otro' }),

  en('en-a1-024', 'work', 'trabajar', 'verbo', 'work',
    [c('work at a hospital', 'trabajar en un hospital'), c('work on Saturdays', 'trabajar los sábados'), c('work at night', 'trabajar de noche')],
    { target: 'Do you always work on Saturdays?', es: '¿Trabajas siempre los sábados?', episodio: 8 },
    { tipo: 'verbo' }),

  en('en-a1-025', 'job', 'trabajo / empleo', 'sustantivo', 'job',
    [c('a good job', 'un buen trabajo'), c('get a job', 'conseguir trabajo'), c('do you like your job?', '¿te gusta tu trabajo?')],
    { target: 'Do you like your job at the café?', es: '¿Te gusta tu trabajo en el café?', episodio: 12 },
    { tipo: 'sustantivo' }),

  en('en-a1-026', 'driver', 'conductor', 'sustantivo', 'DRI-ver',
    [c('a bus driver', 'conductor de autobús'), c('a taxi driver', 'taxista')],
    { target: 'My father is a bus driver. My mother is a nurse.', es: 'Mi padre es conductor de autobús. Mi madre es enfermera.', episodio: 2 },
    { tipo: 'sustantivo' }),

  en('en-a1-027', 'nurse', 'enfermera / enfermero', 'sustantivo', 'nurse',
    [c('work as a nurse', 'trabajar de enfermera'), c('a nurse at the hospital', 'una enfermera del hospital')],
    { target: 'My father is a bus driver. My mother is a nurse.', es: 'Mi padre es conductor de autobús. Mi madre es enfermera.', episodio: 2 },
    { tipo: 'sustantivo' }),

  en('en-a1-028', 'waitress', 'camarera / mesera', 'sustantivo', 'WAI-tress',
    [c('work as a waitress', 'trabajar de camarera'), c('a waiter or a waitress', 'un camarero o una camarera')],
    { target: 'I’m a student, and I’m a waitress on Saturdays.', es: 'Soy estudiante y camarera los sábados.', episodio: 1 },
    { tipo: 'sustantivo' }),

  en('en-a1-029', 'teach', 'enseñar / dar clase', 'verbo', 'teach',
    [c('teach at a school', 'dar clase en un colegio'), c('teach English', 'enseñar inglés'), c('teach children', 'dar clase a niños')],
    { target: 'My mother teaches at the school.', es: 'Mi madre da clase en el colegio.', episodio: 7 },
    { tipo: 'verbo' }),

  en('en-a1-030', 'visit', 'visitar', 'verbo', 'VIS-it',
    [c('visit my grandfather', 'visitar a mi abuelo'), c('visit a friend', 'visitar a un amigo'), c('come and visit us', 'ven a vernos')],
    { target: 'I usually study in the library. Sometimes I visit my grandfather.', es: 'Normalmente estudio en la biblioteca. A veces visito a mi abuelo.', episodio: 8 },
    { tipo: 'verbo' }),
]

// ─── Unidad 4 · Con quién vivo y de dónde soy ─────────────────────────────────
//
// Expansión pedida en la segunda revisión. Ocho de las diez llevan ejemplo redactado, y no
// por comodidad: el corpus de inglés A1 no dice «son», «daughter», «husband», «wife», «boy»,
// «girl», «country» ni «city» en ningún turno. Es la misma carencia que destapó «brother», y
// con esta unidad queda cuantificada: once de cuarenta.

const unidad4: VocabEntry[] = [
  en('en-a1-031', 'son', 'hijo', 'sustantivo', 'son',
    [c('have a son', 'tener un hijo'), c('they have one son', 'tienen un hijo'), c('his son is a student', 'su hijo es estudiante')],
    { target: 'My grandfather has one son and two daughters.', es: 'Mi abuelo tiene un hijo y dos hijas.', motivo: SIN_CORPUS('son') },
    { tipo: 'sustantivo' }),

  en('en-a1-032', 'daughter', 'hija', 'sustantivo', 'DAUGH-ter',
    [c('have a daughter', 'tener una hija'), c('two daughters', 'dos hijas'), c('her daughter is five', 'su hija tiene cinco años')],
    { target: 'My grandfather has one son and two daughters.', es: 'Mi abuelo tiene un hijo y dos hijas.', motivo: SIN_CORPUS('daughter') },
    { tipo: 'sustantivo' }),

  en('en-a1-033', 'husband', 'esposo / marido', 'sustantivo', 'HUS-band',
    [c('her husband works at…', 'su esposo trabaja en…'), c('she lives with her husband', 'vive con su esposo')],
    { target: 'Her husband works in a bakery.', es: 'Su esposo trabaja en una panadería.', motivo: SIN_CORPUS('husband') },
    { tipo: 'sustantivo' }),

  en('en-a1-034', 'wife', 'esposa / mujer', 'sustantivo', 'wife',
    [c('his wife is a teacher', 'su esposa es profesora'), c('he lives with his wife', 'vive con su esposa')],
    { target: 'His wife is a teacher at my school.', es: 'Su esposa es profesora en mi colegio.', motivo: SIN_CORPUS('wife') },
    { tipo: 'sustantivo' }),

  en('en-a1-035', 'boy', 'niño / chico', 'sustantivo', 'boy',
    [c('a little boy', 'un niño pequeño'), c('the boy in the garden', 'el niño del jardín')],
    { target: 'There is a boy in the garden.', es: 'Hay un niño en el jardín.', motivo: SIN_CORPUS('boy') },
    { tipo: 'sustantivo' }),

  en('en-a1-036', 'girl', 'niña / chica', 'sustantivo', 'girl',
    [c('a little girl', 'una niña pequeña'), c('that girl is my friend', 'esa chica es mi amiga')],
    { target: 'That girl is my sister’s friend.', es: 'Esa niña es amiga de mi hermana.', motivo: SIN_CORPUS('girl') },
    { tipo: 'sustantivo' }),

  en('en-a1-037', 'country', 'país', 'sustantivo', 'COUN-try',
    [c('what country are you from?', '¿de qué país eres?'), c('a big country', 'un país grande')],
    { target: 'Colombia is a big country.', es: 'Colombia es un país grande.', motivo: SIN_CORPUS('country') },
    { tipo: 'sustantivo' }),

  en('en-a1-038', 'city', 'ciudad', 'sustantivo', 'CI-ty',
    [c('a big city', 'una ciudad grande'), c('live in a city', 'vivir en una ciudad'), c('the city park', 'el parque de la ciudad')],
    {
      target: 'The bus stops at the museum, the city park, and Riverside Market.',
      es: 'El bus para en el museo, el parque de la ciudad y el mercado Riverside.',
      lectura: 'en-a1-saturday-bus-guide',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-039', 'nice', 'simpático / agradable', 'adjetivo', 'nice',
    [c('a nice person', 'una persona simpática'), c('she is very nice', 'ella es muy simpática'), c('your room is nice', 'tu cuarto está bien')],
    { target: 'Your room is nice. Is there a desk?', es: 'Tu cuarto está bien. ¿Hay escritorio?', episodio: 3 },
    { tipo: 'otro' }),

  en('en-a1-040', 'home', 'casa / hogar', 'sustantivo', 'home',
    [c('at home', 'en casa'), c('go home', 'ir a casa'), c('stay at home', 'quedarse en casa')],
    { target: 'Do you have breakfast at home?', es: '¿Desayunas en casa?', episodio: 6 },
    { tipo: 'sustantivo' }),
]

// ═══ BLOQUE 2 · Números, hora y calendario ════════════════════════════════════
//
// Las 30 salen del material del nivel: 29 de la serie de escucha y una («Friday») de un texto
// de lectura, porque los veinte episodios nunca nombran el viernes. Cero redactadas.

// ─── Unidad 1 · La hora ───────────────────────────────────────────────────────

const b2unidad1: VocabEntry[] = [
  en('en-a1-041', 'time', 'hora / tiempo', 'sustantivo', 'time',
    [c('what time is it?', '¿qué hora es?'), c('at the same time', 'a la misma hora'), c('I have no time', 'no tengo tiempo')],
    { target: 'What time do you get up?', es: '¿A qué hora te levantas?', episodio: 6 },
    { tipo: 'sustantivo' }),

  en('en-a1-042', 'o’clock', 'en punto', 'adverbio', 'o-CLOCK',
    [c('at nine o’clock', 'a las nueve en punto'), c('it’s five o’clock', 'son las cinco en punto')],
    { target: 'On Monday morning, at nine o’clock.', es: 'El lunes por la mañana, a las nueve en punto.', episodio: 10 },
    { tipo: 'otro' }),

  en('en-a1-043', 'half', 'media / mitad', 'sustantivo', 'half',
    [c('half past seven', 'las siete y media'), c('half an hour', 'media hora')],
    { target: 'I leave at half past seven and I walk.', es: 'Salgo a las siete y media y voy andando.', episodio: 6 },
    { tipo: 'sustantivo' }),

  en('en-a1-044', 'hour', 'hora (duración)', 'sustantivo', 'hour',
    [c('two hours', 'dos horas'), c('half an hour', 'media hora'), c('for eight hours', 'durante ocho horas')],
    { target: 'Two hours is enough for bread.', es: 'Dos horas bastan para el pan.', episodio: 17 },
    { tipo: 'sustantivo' }),

  en('en-a1-045', 'minute', 'minuto', 'sustantivo', 'MI-nute',
    [c('two minutes', 'dos minutos'), c('every thirty minutes', 'cada treinta minutos'), c('wait a minute', 'espera un momento')],
    { target: 'Walk straight for two minutes. Don’t cross the street.', es: 'Camina recto dos minutos. No cruces la calle.', episodio: 19 },
    { tipo: 'sustantivo' }),

  en('en-a1-046', 'open', 'abrir', 'verbo', 'O-pen',
    [c('the café opens at eight', 'el café abre a las ocho'), c('open the door', 'abre la puerta'), c('the shop is open', 'la tienda está abierta')],
    { target: 'What time does the café open?', es: '¿A qué hora abre el café?', episodio: 9 },
    { tipo: 'verbo' }),

  en('en-a1-047', 'arrive', 'llegar', 'verbo', 'a-RRIVE',
    [c('arrive at seven', 'llegar a las siete'), c('arrive early', 'llegar temprano'), c('arrive late', 'llegar tarde')],
    { target: 'It opens at eight. I arrive at half past seven.', es: 'Abre a las ocho. Yo llego a las siete y media.', episodio: 9 },
    { tipo: 'verbo' }),

  en('en-a1-048', 'leave', 'salir / irse', 'verbo', 'leave',
    [c('leave at seven', 'salir a las siete'), c('leave home', 'salir de casa'), c('leave the house', 'irse de casa')],
    { target: 'When do you leave?', es: '¿Cuándo sales?', episodio: 6 },
    { tipo: 'verbo' }),

  en('en-a1-049', 'sleep', 'dormir', 'verbo', 'sleep',
    [c('sleep eight hours', 'dormir ocho horas'), c('sleep late', 'dormir hasta tarde'), c('go to sleep', 'irse a dormir')],
    { target: 'Never. I work on Saturday and I sleep on Sunday.', es: 'Nunca. Trabajo el sábado y duermo el domingo.', episodio: 10 },
    { tipo: 'verbo' }),

  en('en-a1-050', 'number', 'número', 'sustantivo', 'NUM-ber',
    [c('the number nine bus', 'el autobús número nueve'), c('a phone number', 'un número de teléfono')],
    { target: 'Take the number nine bus. Get off at the church.', es: 'Coge el autobús número nueve. Bájate en la iglesia.', episodio: 19 },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 2 · Los días de la semana ─────────────────────────────────────────

const b2unidad2: VocabEntry[] = [
  en('en-a1-051', 'Monday', 'lunes', 'sustantivo', 'MON-day',
    [c('on Monday', 'el lunes'), c('on Mondays', 'los lunes'), c('Monday morning', 'el lunes por la mañana')],
    { target: 'What do you do on Mondays?', es: '¿Qué haces los lunes?', episodio: 8 },
    { tipo: 'sustantivo' }),

  en('en-a1-052', 'Tuesday', 'martes', 'sustantivo', 'TUES-day',
    [c('on Tuesday', 'el martes'), c('every Tuesday', 'todos los martes')],
    { target: 'My English class is on Tuesday at six.', es: 'Mi clase de inglés es el martes a las seis.', episodio: 10 },
    { tipo: 'sustantivo' }),

  en('en-a1-053', 'Wednesday', 'miércoles', 'sustantivo', 'WEDNES-day',
    [c('on Wednesday', 'el miércoles'), c('on Wednesdays', 'los miércoles')],
    { target: 'I often play football on Wednesdays.', es: 'Yo juego al fútbol a menudo los miércoles.', episodio: 8 },
    { tipo: 'sustantivo' }),

  en('en-a1-054', 'Thursday', 'jueves', 'sustantivo', 'THURS-day',
    [c('on Thursday', 'el jueves'), c('next Thursday', 'el jueves que viene')],
    { target: 'Is it on Thursday too?', es: '¿También es el jueves?', episodio: 10 },
    { tipo: 'sustantivo' }),

  en('en-a1-055', 'Friday', 'viernes', 'sustantivo', 'FRI-day',
    [c('on Friday', 'el viernes'), c('before Friday', 'antes del viernes'), c('Friday night', 'el viernes por la noche')],
    {
      target: 'Please text her before Friday to say if you can come.',
      es: 'Escríbele antes del viernes para decirle si puedes venir.',
      lectura: 'en-a1-birthday-party-invite',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-056', 'Saturday', 'sábado', 'sustantivo', 'SA-tur-day',
    [c('on Saturday', 'el sábado'), c('every Saturday', 'todos los sábados')],
    { target: 'You work every Saturday. Do you rest?', es: 'Trabajas todos los sábados. ¿Descansas?', episodio: 9 },
    { tipo: 'sustantivo' }),

  en('en-a1-057', 'Sunday', 'domingo', 'sustantivo', 'SUN-day',
    [c('on Sunday', 'el domingo'), c('Sunday morning', 'el domingo por la mañana')],
    { target: 'I rest on Sunday. Saturday is the busy day.', es: 'Descanso el domingo. El sábado es el día ocupado.', episodio: 9 },
    { tipo: 'sustantivo' }),

  en('en-a1-058', 'day', 'día', 'sustantivo', 'day',
    [c('every day', 'todos los días'), c('the busy day', 'el día ocupado'), c('all day', 'todo el día')],
    { target: 'I rest on Sunday. Saturday is the busy day.', es: 'Descanso el domingo. El sábado es el día ocupado.', episodio: 9 },
    { tipo: 'sustantivo' }),

  en('en-a1-059', 'week', 'semana', 'sustantivo', 'week',
    [c('every week', 'todas las semanas'), c('this week', 'esta semana'), c('next week', 'la semana que viene')],
    { target: 'You say that every single week.', es: 'Dices eso todas las semanas.', episodio: 12 },
    { tipo: 'sustantivo' }),

  en('en-a1-060', 'weekend', 'fin de semana', 'sustantivo', 'WEEK-end',
    [c('at the weekend', 'el fin de semana'), c('this weekend', 'este fin de semana')],
    { target: 'Do you have classes at the weekend?', es: '¿Tienes clase el fin de semana?', episodio: 10 },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 3 · Meses y cada cuánto ───────────────────────────────────────────

const b2unidad3: VocabEntry[] = [
  en('en-a1-061', 'November', 'noviembre', 'sustantivo', 'no-VEM-ber',
    [c('in November', 'en noviembre'), c('cold in November', 'frío en noviembre')],
    { target: 'In November it’s cold and windy.', es: 'En noviembre hace frío y viento.', episodio: 14 },
    { tipo: 'sustantivo' }),

  en('en-a1-062', 'December', 'diciembre', 'sustantivo', 'de-CEM-ber',
    [c('in December', 'en diciembre'), c('at the end of December', 'a finales de diciembre')],
    { target: 'Is it cold in December too?', es: '¿En diciembre también hace frío?', episodio: 14 },
    { tipo: 'sustantivo' }),

  en('en-a1-063', 'winter', 'invierno', 'sustantivo', 'WIN-ter',
    [c('in winter', 'en invierno'), c('a cold winter', 'un invierno frío')],
    { target: 'In winter I stay at home with a book.', es: 'En invierno me quedo en casa con un libro.', episodio: 8 },
    { tipo: 'sustantivo' }),

  en('en-a1-064', 'today', 'hoy', 'adverbio', 'to-DAY',
    [c('it’s cold today', 'hoy hace frío'), c('not today', 'hoy no')],
    { target: 'It’s cold today. Is it always like this?', es: 'Hoy hace frío. ¿Siempre es así?', episodio: 14 },
    { tipo: 'otro' }),

  en('en-a1-065', 'tomorrow', 'mañana', 'adverbio', 'to-MO-rrow',
    [c('tomorrow is sunny', 'mañana hace sol'), c('see you tomorrow', 'hasta mañana')],
    { target: 'Today it’s grey, but tomorrow is sunny.', es: 'Hoy está gris, pero mañana hace sol.', episodio: 14 },
    { tipo: 'otro' }),

  en('en-a1-066', 'always', 'siempre', 'adverbio', 'AL-ways',
    [c('I always work on Saturdays', 'siempre trabajo los sábados'), c('it’s always like this', 'siempre es así')],
    { target: 'Do you always work on Saturdays?', es: '¿Trabajas siempre los sábados?', episodio: 8 },
    { tipo: 'otro' }),

  en('en-a1-067', 'never', 'nunca', 'adverbio', 'NE-ver',
    [c('I never work on Sundays', 'nunca trabajo los domingos'), c('never again', 'nunca más')],
    { target: 'Always. I never work on Sundays.', es: 'Siempre. Nunca trabajo los domingos.', episodio: 8 },
    { tipo: 'otro' }),

  en('en-a1-068', 'sometimes', 'a veces', 'adverbio', 'SOME-times',
    [c('sometimes there’s snow', 'a veces hay nieve'), c('sometimes I visit her', 'a veces la visito')],
    { target: 'It’s colder. Sometimes there’s snow.', es: 'Hace más frío. A veces hay nieve.', episodio: 14 },
    { tipo: 'otro' }),

  en('en-a1-069', 'often', 'a menudo', 'adverbio', 'OF-ten',
    [c('I often play football', 'juego a menudo al fútbol'), c('how often?', '¿cada cuánto?')],
    { target: 'I often play football on Wednesdays.', es: 'Yo juego al fútbol a menudo los miércoles.', episodio: 8 },
    { tipo: 'otro' }),

  en('en-a1-070', 'every', 'cada / todos los', 'adjetivo', 'EV-ery',
    [c('every day', 'todos los días'), c('every Saturday', 'todos los sábados'), c('every thirty minutes', 'cada treinta minutos')],
    { target: 'My bakery opened at five. Every day.', es: 'Mi panadería abría a las cinco. Todos los días.', episodio: 9 },
    { tipo: 'otro' }),
]

// ═══ BLOQUE 3 · Casa y objetos cotidianos ═════════════════════════════════════
//
// Las 30 salen de la serie. Es el bloque más fácil de surtir del nivel: los episodios 3, 4 y
// 20 transcurren enteros dentro de una casa y de un local vacío, así que el material está.

// ─── Unidad 1 · La casa ───────────────────────────────────────────────────────

const b3unidad1: VocabEntry[] = [
  en('en-a1-071', 'house', 'casa', 'sustantivo', 'house',
    [c('a small house', 'una casa pequeña'), c('at my house', 'en mi casa'), c('a house with a garden', 'una casa con jardín')],
    { target: 'Our house is small. There are three rooms.', es: 'Nuestra casa es pequeña. Hay tres habitaciones.', episodio: 4 },
    { tipo: 'sustantivo' }),

  en('en-a1-072', 'room', 'habitación / cuarto', 'sustantivo', 'room',
    [c('three rooms', 'tres habitaciones'), c('the living room', 'el salón'), c('there is a room', 'hay una habitación')],
    { target: 'Our house is small. There are three rooms.', es: 'Nuestra casa es pequeña. Hay tres habitaciones.', episodio: 4 },
    { tipo: 'sustantivo' }),

  en('en-a1-073', 'kitchen', 'cocina', 'sustantivo', 'KIT-chen',
    [c('in the kitchen', 'en la cocina'), c('a small kitchen', 'una cocina pequeña')],
    { target: 'Where is the kitchen?', es: '¿Dónde está la cocina?', episodio: 4 },
    { tipo: 'sustantivo' }),

  en('en-a1-074', 'garden', 'jardín', 'sustantivo', 'GAR-den',
    [c('in the garden', 'en el jardín'), c('a house with a garden', 'una casa con jardín')],
    { target: 'Is there a garden?', es: '¿Hay jardín?', episodio: 4 },
    { tipo: 'sustantivo' }),

  en('en-a1-101', 'bag', 'bolsa / bolso', 'sustantivo', 'bag',
    [c('a large bag', 'una bolsa grande'), c('in my bag', 'en mi bolso'), c('carry a bag', 'llevar una bolsa')],
    {
      target: 'Passengers with large bags can use the lift beside the ticket office.',
      es: 'Los pasajeros con bolsas grandes pueden usar el ascensor junto a la taquilla.',
      lectura: 'en-a1-train-platform-sign',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-076', 'door', 'puerta', 'sustantivo', 'door',
    [c('the blue door', 'la puerta azul'), c('open the door', 'abre la puerta'), c('the back door', 'la puerta de atrás')],
    { target: 'Look for the blue door. Don’t use the back door.', es: 'Busca la puerta azul. No uses la puerta de atrás.', episodio: 19 },
    { tipo: 'sustantivo' }),

  en('en-a1-077', 'window', 'ventana', 'sustantivo', 'WIN-dow',
    [c('under the window', 'debajo de la ventana'), c('open the window', 'abre la ventana')],
    { target: 'There’s a small desk under the window.', es: 'Hay un escritorio pequeño debajo de la ventana.', episodio: 3 },
    { tipo: 'sustantivo' }),

  en('en-a1-078', 'wall', 'pared', 'sustantivo', 'wall',
    [c('paint the walls', 'pintar las paredes'), c('on the wall', 'en la pared')],
    { target: 'I can clean them. I can paint the walls.', es: 'Puedo limpiarlas. Puedo pintar las paredes.', episodio: 20 },
    { tipo: 'sustantivo' }),

  en('en-a1-079', 'floor', 'suelo', 'sustantivo', 'floor',
    [c('on the floor', 'en el suelo'), c('the first floor', 'el primer piso')],
    { target: 'The door is open. There are old tiles on the floor.', es: 'La puerta está abierta. Hay baldosas viejas en el suelo.', episodio: 20 },
    { tipo: 'sustantivo' }),

  en('en-a1-080', 'small', 'pequeño', 'adjetivo', 'small',
    [c('a small house', 'una casa pequeña'), c('a small dog', 'un perro pequeño'), c('too small', 'demasiado pequeño')],
    { target: 'I’ve got a small brown dog. His name is Max.', es: 'Tengo un perro pequeño y marrón. Se llama Max.', episodio: 15 },
    { tipo: 'otro' }),
]

// ─── Unidad 2 · Los muebles y las cosas ───────────────────────────────────────

const b3unidad2: VocabEntry[] = [
  en('en-a1-081', 'desk', 'escritorio', 'sustantivo', 'desk',
    [c('on the desk', 'en el escritorio'), c('under my desk', 'debajo de mi escritorio')],
    { target: 'There’s a small desk under the window.', es: 'Hay un escritorio pequeño debajo de la ventana.', episodio: 3 },
    { tipo: 'sustantivo' }),

  en('en-a1-082', 'shelf', 'estante', 'sustantivo', 'shelf',
    [c('two shelves', 'dos estantes'), c('on the shelves', 'en los estantes')],
    { target: 'There are two shelves next to the door.', es: 'Hay dos estantes al lado de la puerta.', episodio: 3 },
    { tipo: 'sustantivo' }),

  en('en-a1-083', 'lamp', 'lámpara', 'sustantivo', 'lamp',
    [c('a lamp on the desk', 'una lámpara en el escritorio'), c('turn on the lamp', 'enciende la lámpara')],
    { target: 'Is there a lamp?', es: '¿Hay lámpara?', episodio: 3 },
    { tipo: 'sustantivo' }),

  en('en-a1-084', 'chair', 'silla', 'sustantivo', 'chair',
    [c('four chairs', 'cuatro sillas'), c('sit on a chair', 'sentarse en una silla')],
    { target: 'There’s a lamp on the desk, but there isn’t a chair.', es: 'Hay una lámpara en el escritorio, pero no hay silla.', episodio: 3 },
    { tipo: 'sustantivo' }),

  en('en-a1-085', 'table', 'mesa', 'sustantivo', 'TA-ble',
    [c('a very old table', 'una mesa muy vieja'), c('on the table', 'en la mesa')],
    { target: 'There are four chairs and one very old table.', es: 'Hay cuatro sillas y una mesa muy vieja.', episodio: 4 },
    { tipo: 'sustantivo' }),

  en('en-a1-086', 'book', 'libro', 'sustantivo', 'book',
    [c('read a book', 'leer un libro'), c('with a book', 'con un libro'), c('a box of books', 'una caja de libros')],
    { target: 'In winter I stay at home with a book.', es: 'En invierno me quedo en casa con un libro.', episodio: 8 },
    { tipo: 'sustantivo' }),

  en('en-a1-087', 'box', 'caja', 'sustantivo', 'box',
    [c('a box of old photos', 'una caja de fotos antiguas'), c('in a box', 'en una caja')],
    { target: 'There are books and a box of old photos.', es: 'Hay libros y una caja de fotos antiguas.', episodio: 3 },
    { tipo: 'sustantivo' }),

  en('en-a1-102', 'phone', 'teléfono', 'sustantivo', 'phone',
    [c('a phone number', 'un número de teléfono'), c('in your phone', 'en tu teléfono'), c('answer the phone', 'contestar el teléfono')],
    {
      target: 'Please save 0088 442 900 in your phone.',
      es: 'Guarda el 0088 442 900 en tu teléfono.',
      lectura: 'en-a1-pet-clinic-card',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-089', 'paint', 'pintura', 'sustantivo', 'paint',
    [c('under that paint', 'debajo de esa pintura'), c('paint the walls', 'pintar las paredes')],
    { target: 'My grandfather’s bakery is there, under that paint.', es: 'La panadería de mi abuelo está ahí, debajo de esa pintura.', episodio: 20 },
    { tipo: 'sustantivo' }),

  en('en-a1-103', 'water', 'agua', 'sustantivo', 'WA-ter',
    [c('a bottle of water', 'una botella de agua'), c('drink water', 'beber agua'), c('hot water', 'agua caliente')],
    {
      target: 'Bring a raincoat, a bottle of water, and your student card.',
      es: 'Trae un impermeable, una botella de agua y tu carné de estudiante.',
      lectura: 'en-a1-morning-school-note',
    },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 3 · Dónde está cada cosa ──────────────────────────────────────────

const b3unidad3: VocabEntry[] = [
  en('en-a1-091', 'under', 'debajo de', 'preposicion', 'UN-der',
    [c('under the window', 'debajo de la ventana'), c('under my desk', 'debajo de mi escritorio')],
    { target: 'He sleeps under my desk. He’s got a blue blanket.', es: 'Duerme debajo de mi escritorio. Tiene una manta azul.', episodio: 15 },
    { tipo: 'otro' }),

  en('en-a1-092', 'on', 'en / sobre', 'preposicion', 'on',
    [c('on the shelves', 'en los estantes'), c('on the table', 'en la mesa'), c('on the floor', 'en el suelo')],
    { target: 'What’s on the shelves?', es: '¿Qué hay en los estantes?', episodio: 3 },
    { tipo: 'otro' }),

  en('en-a1-093', 'in', 'en / dentro de', 'preposicion', 'in',
    [c('in the kitchen', 'en la cocina'), c('in a box', 'en una caja'), c('in the garden', 'en el jardín')],
    { target: 'Are there many chairs in the kitchen?', es: '¿Hay muchas sillas en la cocina?', episodio: 4 },
    { tipo: 'otro' }),

  en('en-a1-094', 'behind', 'detrás de', 'preposicion', 'be-HIND',
    [c('behind the school', 'detrás del colegio'), c('behind the door', 'detrás de la puerta')],
    { target: 'It’s behind the school, near the park.', es: 'Está detrás del colegio, cerca del parque.', episodio: 5 },
    { tipo: 'otro' }),

  en('en-a1-095', 'near', 'cerca de', 'preposicion', 'near',
    [c('near the park', 'cerca del parque'), c('near my house', 'cerca de mi casa')],
    { target: 'Children are playing football near the trees.', es: 'Unos niños juegan al fútbol cerca de los árboles.', episodio: 16 },
    { tipo: 'otro' }),

  en('en-a1-096', 'corner', 'esquina', 'sustantivo', 'COR-ner',
    [c('on the corner', 'en la esquina'), c('the shop on the corner', 'el local de la esquina')],
    { target: 'Look, Leo. The shop on the corner is empty again.', es: 'Mira, Leo. El local de la esquina está vacío otra vez.', episodio: 20 },
    { tipo: 'sustantivo' }),

  en('en-a1-097', 'shop', 'tienda / local', 'sustantivo', 'shop',
    [c('the shop on the corner', 'el local de la esquina'), c('go to the shop', 'ir a la tienda')],
    { target: 'That shop is empty now. It’s on the corner.', es: 'Ese local está vacío ahora. Está en la esquina.', episodio: 5 },
    { tipo: 'sustantivo' }),

  en('en-a1-098', 'empty', 'vacío', 'adjetivo', 'EMP-ty',
    [c('the shop is empty', 'el local está vacío'), c('an empty room', 'una habitación vacía')],
    { target: 'That shop is empty now. It’s on the corner.', es: 'Ese local está vacío ahora. Está en la esquina.', episodio: 5 },
    { tipo: 'otro' }),

  en('en-a1-099', 'clean', 'limpiar', 'verbo', 'clean',
    [c('clean the floor', 'limpiar el suelo'), c('I can clean them', 'puedo limpiarlas')],
    { target: 'I can clean them. I can paint the walls.', es: 'Puedo limpiarlas. Puedo pintar las paredes.', episodio: 20 },
    { tipo: 'verbo' }),

  en('en-a1-100', 'look', 'mirar / buscar', 'verbo', 'look',
    [c('look for the door', 'busca la puerta'), c('look at the park', 'mira el parque')],
    { target: 'Look for the blue door. Don’t use the back door.', es: 'Busca la puerta azul. No uses la puerta de atrás.', episodio: 19 },
    { tipo: 'verbo' }),
]

export const INGLES_A1: VocabLevel = {
  lang: 'ingles',
  nivel: 'a1',
  eje: 'Entorno inmediato — lo concreto y representable',
  listaBase: {
    fuente: 'Oxford 3000 por nivel CEFR, contrastado con el English Vocabulary Profile',
    url: 'https://www.oxfordlearnersdictionaries.com/about/wordlists/oxford3000-5000',
    cupoOficial: undefined,
    nota:
      'El Oxford 3000 etiqueta por nivel pero no fija cupo por nivel: el cupo (300 en A1) lo pone ' +
      'nuestro núcleo productivo. Cruce hecho el 8 ago 2026 contra el listado por nivel: ' +
      '39 de las 40 entradas están en la banda A1. La excepción es «waitress», que el Oxford 3000 ' +
      'no recoge en ningún nivel aunque sí recoge «waiter» en A1. Se mantiene a propósito: es el ' +
      'oficio de la protagonista de la serie, se oye en el episodio 1, y dejar fuera la forma ' +
      'femenina es un límite de la lista, no del nivel. La ficha enseña las dos formas. ' +
      'Segunda excepción: «o’clock», que el Oxford 3000 tampoco recoge pese a ser la manera ' +
      'normal de decir la hora en punto y aparecer en el episodio 10. Se mantiene por lo mismo. ' +
      'Cuatro entradas más van una banda por encima —«shelf» (B1) y «lamp», «corner» y «empty» ' +
      '(A2)— y se mantienen porque las tres primeras salen de lecciones A1 que transcurren en ' +
      'un dormitorio y en un local vacío: nombrar lo que hay en la escena es A1, aunque la ' +
      'palabra sea menos frecuente en general. Sí se sacaron del bloque «balcony», «blanket» y ' +
      '«tile», que no están en la lista en ningún nivel: eran decorado de la historia, no ' +
      'objetos que un principiante necesite. Entraron «bag», «phone» y «water» en su lugar.',
  },
  bloques: [
    {
      id: 'yo-y-mi-gente',
      nombre: 'Yo y mi gente',
      icono: '👋',
      entradas: [...unidad1, ...unidad2, ...unidad3, ...unidad4],
    },
    {
      id: 'numeros-hora-y-calendario',
      nombre: 'Números, hora y calendario',
      icono: '🕘',
      entradas: [...b2unidad1, ...b2unidad2, ...b2unidad3],
    },
    {
      id: 'casa-y-objetos',
      nombre: 'Casa y objetos cotidianos',
      icono: '🏠',
      entradas: [...b3unidad1, ...b3unidad2, ...b3unidad3],
    },
  ],
}
