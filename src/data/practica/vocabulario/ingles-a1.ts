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

// ═══ BLOQUE 4 · Comida y bebida ═══════════════════════════════════════════════
//
// El primer bloque donde la escucha no basta y la lectura pasa a ser un tercio del material.
// Los episodios 6, 11, 12 y 17 dan el armazón —el desayuno, la compra, los gustos, la cocina
// del abuelo— pero los alimentos concretos solo salen en el menú del comedor y en el texto
// del café, y ahí una sola frase enumera seis a la vez.
//
// Tres cosas se decidieron mirando las fuentes, y las tres quedan visibles en las fichas:
//
//  · «tea» daba cuatro positivos y no era ninguno: eran «teaches», «teach» y «team». La única
//    taza de té del nivel está en la lectura del café. Mismo espejismo que «clock» dentro de
//    «o’clock», y por eso se abre siempre la frase en vez de fiarse del ✓.
//  · «food» y «drink» no existen en el material —los positivos eran «football» y «driver»— y
//    un bloque de comida y bebida sin las dos palabras que lo nombran no se sostiene.
//  · «cheese» sí está, pero solo dentro de la frase del menú que ya enseña «chicken» y
//    «apple». Meter una tercera en la misma frase es justo lo que hace que en la caja 4 el
//    hueco se rellene por memoria del molde, así que se le escribió frase propia, declarada.
//
// Quedan fuera «vegetable» y «salad», que viven en esa misma frase del menú y no llegan a
// imprescindibles en A1. «money» y «list», que sí están en el episodio 11, se guardan para
// los bloques de ciudad y de trabajo: no son comida.

/** Motivo de un ejemplo redactado, escrito entero para que se pueda discutir. */
const NO_SIRVE = (palabra: string, porque: string) =>
  `«${palabra}» ${porque} Ejemplo redactado con la gramática del nivel y anotado para la ` +
  `próxima ampliación del corpus.`

// ─── Unidad 1 · Las tres comidas ──────────────────────────────────────────────

const b4unidad1: VocabEntry[] = [
  en('en-a1-104', 'food', 'comida', 'sustantivo', 'food',
    [c('Colombian food', 'comida colombiana'), c('the food is good', 'la comida está buena'), c('food and drink', 'comida y bebida')],
    {
      target: 'The food in this café is very good.',
      es: 'La comida de este café es muy buena.',
      motivo: NO_SIRVE('food', 'no aparece en los 20 episodios de The Corner Shop ni en las lecturas de inglés A1: los positivos de la búsqueda eran «football».'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-105', 'eat', 'comer', 'verbo', 'eat',
    [c('eat at home', 'comer en casa'), c('eat fruit', 'comer fruta'), c('what do you eat?', '¿qué comes?')],
    { target: 'I eat bread and fruit at seven.', es: 'Como pan y fruta a las siete.', episodio: 6 },
    { tipo: 'verbo' }),

  en('en-a1-106', 'drink', 'beber / tomar', 'verbo', 'drink',
    [c('drink water', 'beber agua'), c('drink coffee', 'tomar café'), c('something to drink', 'algo de beber')],
    {
      target: 'I don’t drink coffee. I drink tea at night.',
      es: 'No tomo café. Tomo té por la noche.',
      motivo: NO_SIRVE('drink', 'no aparece en el material de inglés A1: los positivos de la búsqueda eran «driver» y «drives». Es la mitad del nombre del bloque y sin ella no se puede pedir nada en un café.'),
    },
    { tipo: 'verbo' }),

  en('en-a1-107', 'breakfast', 'desayuno', 'sustantivo', 'BREAK-fast',
    [c('have breakfast', 'desayunar'), c('breakfast at seven', 'el desayuno a las siete'), c('a big breakfast', 'un desayuno grande')],
    { target: 'Do you have breakfast at home?', es: '¿Desayunas en casa?', episodio: 6 },
    { tipo: 'sustantivo' }),

  en('en-a1-108', 'lunch', 'almuerzo', 'sustantivo', 'lunch',
    [c('have lunch', 'almorzar'), c('lunch with a friend', 'almorzar con un amigo'), c('the lunch is at twelve', 'el almuerzo es a las doce')],
    {
      target: 'Lunch starts at twelve and finishes at one thirty.',
      es: 'El almuerzo empieza a las doce y termina a la una y media.',
      lectura: 'en-a1-lunch-menu',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-109', 'dinner', 'cena', 'sustantivo', 'DIN-ner',
    [c('make dinner', 'hacer la cena'), c('have dinner', 'cenar'), c('dinner at eight', 'la cena a las ocho')],
    { target: 'Yes, I’m making dinner at his house.', es: 'Sí, hago la cena en su casa.', episodio: 18 },
    { tipo: 'sustantivo' }),

  en('en-a1-110', 'cook', 'cocinar', 'verbo', 'cook',
    [c('cook rice', 'hacer arroz'), c('cook for the family', 'cocinar para la familia'), c('can you cook?', '¿sabes cocinar?')],
    { target: 'Can you cook, Maya?', es: '¿Sabes cocinar, Maya?', episodio: 17 },
    { tipo: 'verbo' }),

  en('en-a1-111', 'make', 'hacer / preparar', 'verbo', 'make',
    [c('make coffee', 'hacer café'), c('make bread', 'hacer pan'), c('make a cake', 'hacer un pastel')],
    { target: 'I get up at six. I make coffee first.', es: 'Me levanto a las seis. Primero hago café.', episodio: 6 },
    { tipo: 'verbo' }),

  en('en-a1-112', 'menu', 'carta / menú', 'sustantivo', 'MEN-u',
    [c('the lunch menu', 'el menú del almuerzo'), c('look at the menu', 'mirar la carta'), c('what’s on the menu?', '¿qué hay en la carta?')],
    {
      target: 'Today’s lunch menu has three choices.',
      es: 'El menú de hoy tiene tres opciones.',
      lectura: 'en-a1-lunch-menu',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-113', 'order', 'pedir', 'verbo', 'OR-der',
    [c('order a coffee', 'pedir un café'), c('order tea with milk', 'pedir té con leche'), c('can I order?', '¿puedo pedir?')],
    {
      target: 'She sits near the window and orders tea with milk.',
      es: 'Se sienta junto a la ventana y pide té con leche.',
      lectura: 'en-a1-my-morning-at-the-cafe',
    },
    { tipo: 'verbo' }),
]

// ─── Unidad 2 · La compra ─────────────────────────────────────────────────────

const b4unidad2: VocabEntry[] = [
  en('en-a1-114', 'bread', 'pan', 'sustantivo', 'bread',
    [c('a piece of bread', 'un trozo de pan'), c('make bread', 'hacer pan'), c('bread and milk', 'pan y leche')],
    { target: 'I’ve got it here. We need bread, rice and milk.', es: 'La tengo aquí. Necesitamos pan, arroz y leche.', episodio: 11 },
    { tipo: 'sustantivo' }),

  en('en-a1-115', 'milk', 'leche', 'sustantivo', 'milk',
    [c('a glass of milk', 'un vaso de leche'), c('tea with milk', 'té con leche'), c('we need milk', 'necesitamos leche')],
    { target: 'I’ve got it here. We need bread, rice and milk.', es: 'La tengo aquí. Necesitamos pan, arroz y leche.', episodio: 11 },
    { tipo: 'sustantivo' }),

  en('en-a1-116', 'rice', 'arroz', 'sustantivo', 'rice',
    [c('cook rice', 'hacer arroz'), c('rice and beans', 'arroz con frijoles'), c('chicken rice', 'arroz con pollo')],
    { target: 'I know. You always eat rice and beans.', es: 'Lo sé. Tú siempre comes arroz con frijoles.', episodio: 12 },
    { tipo: 'sustantivo' }),

  en('en-a1-117', 'egg', 'huevo', 'sustantivo', 'egg',
    [c('two eggs', 'dos huevos'), c('eggs for breakfast', 'huevos para el desayuno'), c('have we got eggs?', '¿tenemos huevos?')],
    { target: 'Have we got eggs at home?', es: '¿Tenemos huevos en casa?', episodio: 11 },
    { tipo: 'sustantivo' }),

  en('en-a1-118', 'coffee', 'café', 'sustantivo', 'COF-fee',
    [c('make coffee', 'hacer café'), c('a cup of coffee', 'una taza de café'), c('coffee with milk', 'café con leche')],
    { target: 'We haven’t got any eggs. And we’ve got very little coffee.', es: 'No nos quedan huevos. Y tenemos muy poco café.', episodio: 11 },
    { tipo: 'sustantivo' }),

  en('en-a1-119', 'tea', 'té', 'sustantivo', 'tea',
    [c('a cup of tea', 'una taza de té'), c('tea with milk', 'té con leche'), c('make tea', 'hacer té')],
    {
      target: 'She sits near the window and orders tea with milk.',
      es: 'Se sienta junto a la ventana y pide té con leche.',
      lectura: 'en-a1-my-morning-at-the-cafe',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-120', 'juice', 'jugo / zumo', 'sustantivo', 'juice',
    [c('orange juice', 'jugo de naranja'), c('a glass of juice', 'un vaso de jugo'), c('fruit and juice', 'fruta y jugo')],
    {
      target: 'At noon, everyone can share fruit and juice in the community room.',
      es: 'Al mediodía, todos pueden compartir fruta y jugo en la sala común.',
      lectura: 'en-a1-park-cleanup-poster',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-121', 'cake', 'pastel / torta', 'sustantivo', 'cake',
    [c('a piece of cake', 'un trozo de pastel'), c('the banana cake', 'el pastel de banano'), c('make a cake', 'hacer un pastel')],
    { target: 'Good. My grandfather has got a cake for us.', es: 'Bien. Mi abuelo tiene un pastel para nosotros.', episodio: 11 },
    { tipo: 'sustantivo' }),

  en('en-a1-122', 'banana', 'banano / plátano', 'sustantivo', 'ba-NA-na',
    [c('banana cake', 'pastel de banano'), c('two bananas', 'dos bananos'), c('a banana for breakfast', 'un banano para el desayuno')],
    { target: 'Has he got the banana cake?', es: '¿Tiene el pastel de banano?', episodio: 11 },
    { tipo: 'sustantivo' }),

  en('en-a1-123', 'fruit', 'fruta', 'sustantivo', 'fruit',
    [c('eat fruit', 'comer fruta'), c('fresh fruit', 'fruta fresca'), c('fruit and juice', 'fruta y jugo')],
    {
      target: 'At noon, everyone can share fruit and juice in the community room.',
      es: 'Al mediodía, todos pueden compartir fruta y jugo en la sala común.',
      lectura: 'en-a1-park-cleanup-poster',
    },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 3 · En el plato, y lo que me gusta ────────────────────────────────

const b4unidad3: VocabEntry[] = [
  en('en-a1-124', 'soup', 'sopa', 'sustantivo', 'soup',
    [c('tomato soup', 'sopa de tomate'), c('vegetable soup', 'sopa de verduras'), c('cook soup', 'hacer sopa')],
    { target: 'I can cook rice and soup. I can’t make bread.', es: 'Sé hacer arroz y sopa. No sé hacer pan.', episodio: 17 },
    { tipo: 'sustantivo' }),

  en('en-a1-125', 'tomato', 'tomate', 'sustantivo', 'to-MA-to',
    [c('tomato soup', 'sopa de tomate'), c('two tomatoes', 'dos tomates'), c('rice with tomato', 'arroz con tomate')],
    { target: 'I hate tomato soup.', es: 'Yo odio la sopa de tomate.', episodio: 12 },
    { tipo: 'sustantivo' }),

  en('en-a1-126', 'chicken', 'pollo', 'sustantivo', 'CHICK-en',
    [c('chicken rice', 'arroz con pollo'), c('cook chicken', 'hacer pollo'), c('chicken with salad', 'pollo con ensalada')],
    {
      target: 'Students can have vegetable soup with bread, chicken rice with salad, or a cheese sandwich with an apple.',
      es: 'Los estudiantes pueden tomar sopa de verduras con pan, arroz con pollo y ensalada, o un sándwich de queso con una manzana.',
      lectura: 'en-a1-lunch-menu',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-127', 'apple', 'manzana', 'sustantivo', 'AP-ple',
    [c('a green apple', 'una manzana verde'), c('eat an apple', 'comerse una manzana'), c('an apple for lunch', 'una manzana para el almuerzo')],
    {
      target: 'Students can have vegetable soup with bread, chicken rice with salad, or a cheese sandwich with an apple.',
      es: 'Los estudiantes pueden tomar sopa de verduras con pan, arroz con pollo y ensalada, o un sándwich de queso con una manzana.',
      lectura: 'en-a1-lunch-menu',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-128', 'cheese', 'queso', 'sustantivo', 'cheese',
    [c('a cheese sandwich', 'un sándwich de queso'), c('bread with cheese', 'pan con queso'), c('a piece of cheese', 'un trozo de queso')],
    {
      target: 'I want bread with cheese, please.',
      es: 'Quiero pan con queso, por favor.',
      motivo: NO_SIRVE('cheese', 'sí está en el material, pero solo dentro de la frase del menú del comedor, que ya enseña «chicken» y «apple». Una tercera palabra en esa misma frase haría que en la caja 4 el hueco se rellenara por memoria del molde.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-129', 'sandwich', 'sándwich', 'sustantivo', 'SAND-wich',
    [c('a cheese sandwich', 'un sándwich de queso'), c('make a sandwich', 'hacer un sándwich'), c('a sandwich for later', 'un sándwich para después')],
    {
      target: 'At the end, she orders a sandwich for later.',
      es: 'Al final, pide un sándwich para después.',
      lectura: 'en-a1-my-morning-at-the-cafe',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-130', 'like', 'gustar', 'verbo', 'like',
    [c('I like coffee', 'me gusta el café'), c('do you like it?', '¿te gusta?'), c('I don’t like the noise', 'no me gusta el ruido')],
    { target: 'I like the people. I don’t like the noise.', es: 'Me gusta la gente. No me gusta el ruido.', episodio: 12 },
    { tipo: 'verbo' }),

  en('en-a1-131', 'love', 'encantar', 'verbo', 'love',
    [c('I love bananas', 'me encantan los bananos'), c('she loves her job', 'le encanta su trabajo'), c('I love cooking', 'me encanta cocinar')],
    { target: 'I love the soup. My favourite is tomato soup.', es: 'Me encanta la sopa. Mi favorita es la de tomate.', episodio: 12 },
    { tipo: 'verbo' }),

  en('en-a1-132', 'hate', 'odiar', 'verbo', 'hate',
    [c('I hate the noise', 'odio el ruido'), c('hate cold coffee', 'odiar el café frío'), c('she hates rice', 'odia el arroz')],
    { target: 'I hate tomato soup.', es: 'Yo odio la sopa de tomate.', episodio: 12 },
    { tipo: 'verbo' }),

  en('en-a1-133', 'favourite', 'favorito / favorita', 'adjetivo', 'FA-vou-rite',
    [c('my favourite food', 'mi comida favorita'), c('your favourite lunch', 'tu almuerzo favorito'), c('it’s my favourite', 'es mi favorito')],
    { target: 'I love the soup. My favourite is tomato soup.', es: 'Me encanta la sopa. Mi favorita es la de tomate.', episodio: 12 },
    { tipo: 'otro' }),
]

// ═══ BLOQUE 6 · Ropa, colores y describir ═════════════════════════════════════
//
// Va antes que el 5 a propósito. El bloque 5 —cuerpo, salud y sensaciones— se paró: el
// material del nivel no tiene ni una parte del cuerpo salvo «hands», ni «doctor», ni
// «tired», ni «happy». Está contado en docs/vocabulario-loop.md §3, con la evidencia, y es
// una decisión del usuario, no del loop. Este bloque sí lo sostiene el material: el episodio
// 13 es una conversación entera sobre qué se pone cada uno para trabajar.
//
// Cinco redactados, más que en ningún bloque anterior, y los cinco forzados:
//
//  · «clothes», «colour» y «red» no aparecen en ningún turno ni en ninguna lectura. Son las
//    palabras que dan nombre al bloque y a su unidad central.
//  · «black» y «white» sí están, pero las dos viven en la misma frase —«I wear black
//    trousers and a white shirt»— que ya enseña «trousers» y «shirt». Cuatro palabras que no
//    aparecen en ningún otro sitio, y solo caben dos. Se quedaron con la frase las dos que
//    son ropa, y los dos colores llevan frase propia declarada.
//
// «sunny» y «busy» se cayeron por lo mismo y no se pudieron rescatar: sus únicas frases ya
// enseñaban dos palabras cada una («tomorrow» en el episodio 14, «Saturday» y «Sunday» en el
// 9). Quedan anotadas en el documento del loop.

// ─── Unidad 1 · La ropa ───────────────────────────────────────────────────────

const b6unidad1: VocabEntry[] = [
  en('en-a1-134', 'clothes', 'ropa', 'sustantivo', 'clothes',
    [c('warm clothes', 'ropa de abrigo'), c('buy clothes', 'comprar ropa'), c('the clothes are clean', 'la ropa está limpia')],
    {
      target: 'I wash my clothes on Sunday.',
      es: 'Lavo la ropa los domingos.',
      motivo: NO_SIRVE('clothes', 'no aparece en ningún turno de los 20 episodios ni en ninguna lectura de inglés A1, y es la palabra que da nombre al bloque.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-135', 'wear', 'llevar puesto', 'verbo', 'wear',
    [c('wear a jacket', 'llevar chaqueta'), c('wear black', 'vestir de negro'), c('what do you wear?', '¿qué te pones?')],
    { target: 'What do you wear to work?', es: '¿Qué te pones para trabajar?', episodio: 13 },
    { tipo: 'verbo' }),

  en('en-a1-136', 'trousers', 'pantalones', 'sustantivo', 'TROU-sers',
    [c('black trousers', 'pantalones negros'), c('a pair of trousers', 'unos pantalones'), c('wear trousers', 'llevar pantalones')],
    { target: 'I wear black trousers and a white shirt.', es: 'Llevo pantalones negros y una camisa blanca.', episodio: 13 },
    { tipo: 'sustantivo' }),

  en('en-a1-137', 'shirt', 'camisa', 'sustantivo', 'shirt',
    [c('a white shirt', 'una camisa blanca'), c('wear a shirt', 'llevar camisa'), c('a clean shirt', 'una camisa limpia')],
    { target: 'I wear black trousers and a white shirt.', es: 'Llevo pantalones negros y una camisa blanca.', episodio: 13 },
    { tipo: 'sustantivo' }),

  en('en-a1-138', 'jacket', 'chaqueta', 'sustantivo', 'JACK-et',
    [c('a green jacket', 'una chaqueta verde'), c('wear a jacket', 'llevar chaqueta'), c('take off your jacket', 'quítate la chaqueta')],
    { target: 'Do you wear a jacket?', es: '¿Llevas chaqueta?', episodio: 13 },
    { tipo: 'sustantivo' }),

  en('en-a1-139', 'scarf', 'bufanda', 'sustantivo', 'scarf',
    [c('a warm scarf', 'una bufanda de abrigo'), c('wear a scarf', 'llevar bufanda'), c('a jacket and a scarf', 'una chaqueta y una bufanda')],
    { target: 'In winter I wear a green jacket and a scarf.', es: 'En invierno llevo una chaqueta verde y una bufanda.', episodio: 13 },
    { tipo: 'sustantivo' }),

  en('en-a1-140', 'shoes', 'zapatos', 'sustantivo', 'shoes',
    [c('old shoes', 'zapatos viejos'), c('new shoes', 'zapatos nuevos'), c('a pair of shoes', 'un par de zapatos')],
    { target: 'Your shoes are terrible, Leo.', es: 'Tus zapatos son horribles, Leo.', episodio: 13 },
    { tipo: 'sustantivo' }),

  en('en-a1-141', 'terrible', 'horrible / malísimo', 'adjetivo', 'TER-ri-ble',
    [c('the weather is terrible', 'hace un tiempo horrible'), c('a terrible day', 'un día horrible'), c('terrible shoes', 'unos zapatos horribles')],
    { target: 'Your shoes are terrible, Leo.', es: 'Tus zapatos son horribles, Leo.', episodio: 13 },
    { tipo: 'otro' }),

  en('en-a1-142', 'comfortable', 'cómodo', 'adjetivo', 'COM-for-ta-ble',
    [c('comfortable shoes', 'zapatos cómodos'), c('a comfortable chair', 'una silla cómoda'), c('they are comfortable', 'son cómodos')],
    { target: 'They’re comfortable. That’s enough for me.', es: 'Son cómodos. Con eso me basta.', episodio: 13 },
    { tipo: 'otro' }),

  en('en-a1-143', 'hat', 'sombrero / gorro', 'sustantivo', 'hat',
    [c('bring a hat', 'trae un sombrero'), c('wear a hat', 'llevar sombrero'), c('a hat for the sun', 'un sombrero para el sol')],
    {
      target: 'Please arrive at eleven and bring a hat because there is little shade.',
      es: 'Llega a las once y trae un sombrero, porque hay poca sombra.',
      lectura: 'en-a1-birthday-party-invite',
    },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 2 · Los colores ───────────────────────────────────────────────────

const b6unidad2: VocabEntry[] = [
  en('en-a1-144', 'colour', 'color', 'sustantivo', 'CO-lour',
    [c('what colour is it?', '¿de qué color es?'), c('my favourite colour', 'mi color favorito'), c('the same colour', 'del mismo color')],
    {
      target: 'What colour is your jacket?',
      es: '¿De qué color es tu chaqueta?',
      motivo: NO_SIRVE('colour', 'no aparece en ningún turno ni en ninguna lectura de inglés A1, y es la palabra con la que se pregunta por todas las demás de esta unidad.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-145', 'black', 'negro', 'adjetivo', 'black',
    [c('black trousers', 'pantalones negros'), c('black shoes', 'zapatos negros'), c('black and white', 'blanco y negro')],
    {
      target: 'My shoes are black and my bag is black too.',
      es: 'Mis zapatos son negros y mi bolso también.',
      motivo: NO_SIRVE('black', 'solo aparece en «I wear black trousers and a white shirt», la única frase del nivel que dice «trousers» y «shirt». Caben dos palabras por frase y esas dos no tienen otro sitio de donde salir.'),
    },
    { tipo: 'otro' }),

  en('en-a1-146', 'white', 'blanco', 'adjetivo', 'white',
    [c('a white shirt', 'una camisa blanca'), c('white walls', 'paredes blancas'), c('black and white', 'blanco y negro')],
    {
      target: 'The walls are white and the door is blue.',
      es: 'Las paredes son blancas y la puerta es azul.',
      motivo: NO_SIRVE('white', 'comparte frase con «black»: la única del nivel que la dice ya enseña «trousers» y «shirt», que no salen en ningún otro turno.'),
    },
    { tipo: 'otro' }),

  en('en-a1-147', 'red', 'rojo', 'adjetivo', 'red',
    [c('a red jacket', 'una chaqueta roja'), c('red shoes', 'zapatos rojos'), c('the red door', 'la puerta roja')],
    {
      target: 'I want the red jacket, not the green one.',
      es: 'Quiero la chaqueta roja, no la verde.',
      motivo: NO_SIRVE('red', 'no aparece en ningún turno ni en ninguna lectura de inglés A1, y sin ella la unidad de colores no tiene los tres básicos.'),
    },
    { tipo: 'otro' }),

  en('en-a1-148', 'green', 'verde', 'adjetivo', 'green',
    [c('a green jacket', 'una chaqueta verde'), c('the green door', 'la puerta verde'), c('green trousers', 'pantalones verdes')],
    { target: 'In winter I wear a green jacket and a scarf.', es: 'En invierno llevo una chaqueta verde y una bufanda.', episodio: 13 },
    { tipo: 'otro' }),

  en('en-a1-149', 'blue', 'azul', 'adjetivo', 'blue',
    [c('a blue blanket', 'una manta azul'), c('the blue door', 'la puerta azul'), c('a blue box', 'una caja azul')],
    { target: 'He sleeps under my desk. He’s got a blue blanket.', es: 'Duerme debajo de mi escritorio. Tiene una manta azul.', episodio: 15 },
    { tipo: 'otro' }),

  en('en-a1-150', 'brown', 'marrón / café', 'adjetivo', 'brown',
    [c('a brown dog', 'un perro marrón'), c('brown bread', 'pan integral'), c('brown shoes', 'zapatos marrones')],
    { target: 'I’ve got a small brown dog. His name is Max.', es: 'Tengo un perro pequeño y marrón. Se llama Max.', episodio: 15 },
    { tipo: 'otro' }),

  en('en-a1-151', 'grey', 'gris', 'adjetivo', 'grey',
    [c('a grey day', 'un día gris'), c('the library is grey', 'la biblioteca es gris'), c('grey trousers', 'pantalones grises')],
    { target: 'Today it’s grey, but tomorrow is sunny.', es: 'Hoy está gris, pero mañana hace sol.', episodio: 14 },
    { tipo: 'otro' }),

  en('en-a1-152', 'yellow', 'amarillo', 'adjetivo', 'YEL-low',
    [c('a yellow star', 'una estrella amarilla'), c('yellow flowers', 'flores amarillas'), c('the yellow door', 'la puerta amarilla')],
    {
      target: 'It has a small yellow star on the front and a name tag inside.',
      es: 'Tiene una estrella amarilla pequeña delante y una etiqueta con el nombre dentro.',
      lectura: 'en-a1-lost-and-found-message',
    },
    { tipo: 'otro' }),

  en('en-a1-153', 'same', 'mismo / igual', 'adjetivo', 'same',
    [c('the same colour', 'del mismo color'), c('the same shoes', 'los mismos zapatos'), c('at the same time', 'a la misma hora')],
    { target: 'I always wear the same old shoes.', es: 'Yo llevo siempre los mismos zapatos viejos.', episodio: 13 },
    { tipo: 'otro' }),
]

// ─── Unidad 3 · Cómo es: describir cosas y sitios ─────────────────────────────

const b6unidad3: VocabEntry[] = [
  en('en-a1-154', 'large', 'grande', 'adjetivo', 'large',
    [c('a large bag', 'una bolsa grande'), c('a large room', 'una habitación grande'), c('too large', 'demasiado grande')],
    {
      target: 'Passengers with large bags can use the lift beside the ticket office.',
      es: 'Los pasajeros con bolsas grandes pueden usar el ascensor junto a la taquilla.',
      lectura: 'en-a1-train-platform-sign',
    },
    { tipo: 'otro' }),

  en('en-a1-155', 'size', 'talla / tamaño', 'sustantivo', 'size',
    [c('the same size', 'del mismo tamaño'), c('what size do you wear?', '¿qué talla usas?'), c('a small size', 'una talla pequeña')],
    { target: 'Our families are almost the same size.', es: 'Nuestras familias son casi del mismo tamaño.', episodio: 2 },
    { tipo: 'sustantivo' }),

  en('en-a1-156', 'short', 'corto / bajo', 'adjetivo', 'short',
    [c('a short message', 'un mensaje corto'), c('short hair', 'pelo corto'), c('a short walk', 'un paseo corto')],
    {
      target: 'Emma reads a short message from her sister.',
      es: 'Emma lee un mensaje corto de su hermana.',
      lectura: 'en-a1-my-morning-at-the-cafe',
    },
    { tipo: 'otro' }),

  en('en-a1-157', 'warm', 'cálido / templado', 'adjetivo', 'warm',
    [c('warm clothes', 'ropa de abrigo'), c('the water is warm', 'el agua está tibia'), c('a warm day', 'un día templado')],
    { target: 'It’s not boring. It’s the sea and it’s warm.', es: 'No es aburrido. Es el mar y hace bueno.', episodio: 14 },
    { tipo: 'otro' }),

  en('en-a1-158', 'sea', 'mar', 'sustantivo', 'sea',
    [c('at the sea', 'en el mar'), c('the sea is warm', 'el mar está tibio'), c('near the sea', 'cerca del mar')],
    { target: 'It’s not boring. It’s the sea and it’s warm.', es: 'No es aburrido. Es el mar y hace bueno.', episodio: 14 },
    { tipo: 'sustantivo' }),

  en('en-a1-159', 'cold', 'frío', 'adjetivo', 'cold',
    [c('it’s cold today', 'hoy hace frío'), c('cold water', 'agua fría'), c('cold and windy', 'frío y con viento')],
    { target: 'It’s cold today. Is it always like this?', es: 'Hoy hace frío. ¿Siempre es así?', episodio: 14 },
    { tipo: 'otro' }),

  en('en-a1-160', 'boring', 'aburrido', 'adjetivo', 'BOR-ing',
    [c('a boring day', 'un día aburrido'), c('that’s boring', 'qué aburrido'), c('a boring job', 'un trabajo aburrido')],
    { target: 'Every day? That’s boring.', es: '¿Todos los días? Qué aburrido.', episodio: 14 },
    { tipo: 'otro' }),

  en('en-a1-161', 'good', 'bueno', 'adjetivo', 'good',
    [c('a good answer', 'una buena respuesta'), c('a good friend', 'un buen amigo'), c('the food is good', 'la comida está buena')],
    { target: 'That’s a very good answer.', es: 'Esa es una respuesta muy buena.', episodio: 9 },
    { tipo: 'otro' }),

  en('en-a1-162', 'quiet', 'tranquilo / silencioso', 'adjetivo', 'QUI-et',
    [c('a quiet street', 'una calle tranquila'), c('a quiet day', 'un día tranquilo'), c('the library is quiet', 'la biblioteca es silenciosa')],
    { target: 'Nice to meet you, Leo. This street is very quiet.', es: 'Encantada, Leo. Esta calle es muy tranquila.', episodio: 1 },
    { tipo: 'otro' }),

  en('en-a1-163', 'inside', 'dentro', 'adverbio', 'in-SIDE',
    [c('come inside', 'entra'), c('inside the shop', 'dentro del local'), c('see inside', 'ver por dentro')],
    { target: 'Do you want to see inside?', es: '¿Quieres ver por dentro?', episodio: 20 },
    { tipo: 'otro' }),
]

// ═══ BLOQUE 7 · Ciudad, lugares y direcciones ═════════════════════════════════
//
// El bloque mejor surtido del nivel, y por una razón que conviene anotar: es el único tema
// que aparece a la vez en la escucha y en las lecturas. El episodio 19 es una conversación
// entera de «¿cómo llego a…?», y cuatro de los seis textos de lectura son señales y avisos
// de la ciudad —la guía del autobús, el cartel del andén, la biblioteca, los objetos
// perdidos—. Diez de las treinta salen de ahí, y esa es la proporción de lectura más alta
// que ha tenido un bloque.
//
// Solo dos redactados, y los dos por la misma razón:
//
//  · «left» no aparece en ningún sitio. Enseñar direcciones con «right» y sin «left» es
//    enseñar media cosa.
//  · «cross» sí está, pero en la única frase que dice «straight» —«Walk straight for two
//    minutes. Don’t cross the street»— que además ya tenía ocupado un hueco. Se quedó
//    «straight», que es la palabra que ordena el resto de la instrucción.
//
// Dos espejismos más para la colección: «car» daba ocho positivos y era *Cartagena*, *card*
// y *scarf*; «way» daba seis y era *always*. Ninguna de las dos entra.

// ─── Unidad 1 · Los sitios de la ciudad ───────────────────────────────────────

const b7unidad1: VocabEntry[] = [
  en('en-a1-164', 'street', 'calle', 'sustantivo', 'street',
    [c('on this street', 'en esta calle'), c('cross the street', 'cruzar la calle'), c('a quiet street', 'una calle tranquila')],
    { target: 'Is there a supermarket on this street?', es: '¿Hay un supermercado en esta calle?', episodio: 5 },
    { tipo: 'sustantivo' }),

  en('en-a1-165', 'supermarket', 'supermercado', 'sustantivo', 'SU-per-mar-ket',
    [c('go to the supermarket', 'ir al supermercado'), c('at the supermarket', 'en el supermercado'), c('a big supermarket', 'un supermercado grande')],
    { target: 'Is there a supermarket on this street?', es: '¿Hay un supermercado en esta calle?', episodio: 5 },
    { tipo: 'sustantivo' }),

  en('en-a1-166', 'school', 'colegio / escuela', 'sustantivo', 'school',
    [c('at school', 'en el colegio'), c('after school', 'después del colegio'), c('near the school', 'cerca del colegio')],
    { target: 'Is it near the school?', es: '¿Está cerca del colegio?', episodio: 19 },
    { tipo: 'sustantivo' }),

  en('en-a1-167', 'park', 'parque', 'sustantivo', 'park',
    [c('in the park', 'en el parque'), c('go to the park', 'ir al parque'), c('the city park', 'el parque de la ciudad')],
    { target: 'Do you play in the park?', es: '¿Jugáis en el parque?', episodio: 8 },
    { tipo: 'sustantivo' }),

  en('en-a1-168', 'library', 'biblioteca', 'sustantivo', 'LI-bra-ry',
    [c('at the library', 'en la biblioteca'), c('study in the library', 'estudiar en la biblioteca'), c('the library closes at six', 'la biblioteca cierra a las seis')],
    { target: 'How do I get to the library?', es: '¿Cómo llego a la biblioteca?', episodio: 19 },
    { tipo: 'sustantivo' }),

  en('en-a1-169', 'museum', 'museo', 'sustantivo', 'mu-SE-um',
    [c('visit the museum', 'visitar el museo'), c('the science museum', 'el museo de ciencias'), c('at the museum', 'en el museo')],
    {
      target: 'The bus stops at the museum, the city park, and Riverside Market.',
      es: 'El autobús para en el museo, en el parque de la ciudad y en el mercado de Riverside.',
      lectura: 'en-a1-saturday-bus-guide',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-170', 'station', 'estación', 'sustantivo', 'STA-tion',
    [c('the bus station', 'la estación de autobuses'), c('at the station', 'en la estación'), c('leave the station', 'salir de la estación')],
    {
      target: 'On Saturday, the number 12 bus leaves Central Station every thirty minutes.',
      es: 'Los sábados, el autobús número 12 sale de la Estación Central cada treinta minutos.',
      lectura: 'en-a1-saturday-bus-guide',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-171', 'church', 'iglesia', 'sustantivo', 'church',
    [c('at the church', 'en la iglesia'), c('near the church', 'cerca de la iglesia'), c('get off at the church', 'bajarse en la iglesia')],
    { target: 'Take the number nine bus. Get off at the church.', es: 'Coge el autobús número nueve. Bájate en la iglesia.', episodio: 19 },
    { tipo: 'sustantivo' }),

  en('en-a1-172', 'café', 'cafetería', 'sustantivo', 'CA-fé',
    [c('at the café', 'en la cafetería'), c('work in a café', 'trabajar en una cafetería'), c('the café is busy', 'la cafetería está llena')],
    { target: 'Do you like your job at the café?', es: '¿Te gusta tu trabajo en el café?', episodio: 12 },
    { tipo: 'sustantivo' }),

  en('en-a1-173', 'hospital', 'hospital', 'sustantivo', 'HOS-pi-tal',
    [c('at the hospital', 'en el hospital'), c('work in a hospital', 'trabajar en un hospital'), c('go to the hospital', 'ir al hospital')],
    { target: 'My mother works at the hospital. She starts at seven.', es: 'Mi madre trabaja en el hospital. Empieza a las siete.', episodio: 7 },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 2 · Moverse por la ciudad ─────────────────────────────────────────

const b7unidad2: VocabEntry[] = [
  en('en-a1-174', 'bus', 'autobús', 'sustantivo', 'bus',
    [c('take the bus', 'coger el autobús'), c('the bus leaves at eight', 'el autobús sale a las ocho'), c('the number nine bus', 'el autobús número nueve')],
    {
      target: 'The first bus leaves at eight o’clock, and the last bus leaves at six in the evening.',
      es: 'El primer autobús sale a las ocho en punto y el último a las seis de la tarde.',
      lectura: 'en-a1-saturday-bus-guide',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-175', 'stop', 'parada', 'sustantivo', 'stop',
    [c('the bus stop', 'la parada del autobús'), c('at the next stop', 'en la siguiente parada'), c('wait at the stop', 'esperar en la parada')],
    { target: 'There’s one next to the bus stop.', es: 'Hay uno al lado de la parada de autobús.', episodio: 5 },
    { tipo: 'sustantivo' }),

  en('en-a1-176', 'next', 'al lado / siguiente', 'preposicion', 'next',
    [c('next to the door', 'al lado de la puerta'), c('next to the school', 'al lado del colegio'), c('the next bus', 'el siguiente autobús')],
    { target: 'There’s one next to the bus stop.', es: 'Hay uno al lado de la parada de autobús.', episodio: 5 },
    { tipo: 'otro' }),

  en('en-a1-177', 'train', 'tren', 'sustantivo', 'train',
    [c('take the train', 'coger el tren'), c('the train arrives at ten', 'el tren llega a las diez'), c('a train to Bogotá', 'un tren a Bogotá')],
    {
      target: 'Attention passengers for train 6 to Northbridge.',
      es: 'Atención, pasajeros del tren 6 a Northbridge.',
      lectura: 'en-a1-train-platform-sign',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-178', 'passenger', 'pasajero', 'sustantivo', 'PAS-sen-ger',
    [c('passengers for the train', 'los pasajeros del tren'), c('passengers with bags', 'pasajeros con equipaje'), c('attention passengers', 'atención, pasajeros')],
    {
      target: 'Attention passengers for train 6 to Northbridge.',
      es: 'Atención, pasajeros del tren 6 a Northbridge.',
      lectura: 'en-a1-train-platform-sign',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-179', 'platform', 'andén', 'sustantivo', 'PLAT-form',
    [c('from platform 3', 'desde el andén 3'), c('which platform?', '¿qué andén?'), c('the café near platform 3', 'la cafetería que hay junto al andén 3')],
    {
      target: 'The train will leave from platform 3 today, not platform 1.',
      es: 'Hoy el tren sale del andén 3, no del andén 1.',
      lectura: 'en-a1-train-platform-sign',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-180', 'ticket', 'billete / tiquete', 'sustantivo', 'TICK-et',
    [c('buy a ticket', 'comprar un billete'), c('check your ticket', 'revisa tu billete'), c('the ticket office', 'la taquilla')],
    {
      target: 'A ticket costs two pounds.',
      es: 'Un billete cuesta dos libras.',
      lectura: 'en-a1-saturday-bus-guide',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-181', 'walk', 'caminar / ir andando', 'verbo', 'walk',
    [c('walk to school', 'ir andando al colegio'), c('walk for five minutes', 'caminar cinco minutos'), c('walk straight', 'seguir recto')],
    { target: 'I leave at half past seven and I walk.', es: 'Salgo a las siete y media y voy andando.', episodio: 6 },
    { tipo: 'verbo' }),

  en('en-a1-182', 'get', 'llegar / conseguir', 'verbo', 'get',
    [c('get to the library', 'llegar a la biblioteca'), c('get off at the church', 'bajarse en la iglesia'), c('how do I get there?', '¿cómo llego?')],
    { target: 'How do I get to the library?', es: '¿Cómo llego a la biblioteca?', episodio: 19 },
    { tipo: 'verbo', phrasal: ['get off — bajarse', 'get up — levantarse'] }),

  en('en-a1-183', 'office', 'oficina / despacho', 'sustantivo', 'OF-fice',
    [c('the school office', 'la secretaría del colegio'), c('the ticket office', 'la taquilla'), c('at the office', 'en la oficina')],
    {
      target: 'If nobody collects it today, the office will keep it until Friday.',
      es: 'Si nadie lo recoge hoy, la oficina lo guardará hasta el viernes.',
      lectura: 'en-a1-lost-and-found-message',
    },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 3 · Pedir y dar direcciones ───────────────────────────────────────

const b7unidad3: VocabEntry[] = [
  en('en-a1-184', 'where', 'dónde', 'pronombre', 'where',
    [c('where is the library?', '¿dónde está la biblioteca?'), c('where are you from?', '¿de dónde eres?'), c('where do you live?', '¿dónde vives?')],
    { target: 'Where is the library? I want a card.', es: '¿Dónde está la biblioteca? Quiero un carné.', episodio: 5 },
    { tipo: 'otro' }),

  en('en-a1-185', 'card', 'carné / tarjeta', 'sustantivo', 'card',
    [c('a student card', 'un carné de estudiante'), c('bring your card', 'trae tu carné'), c('the blue card', 'la tarjeta azul')],
    { target: 'Where is the library? I want a card.', es: '¿Dónde está la biblioteca? Quiero un carné.', episodio: 5 },
    { tipo: 'sustantivo' }),

  en('en-a1-186', 'turn', 'girar', 'verbo', 'turn',
    [c('turn right', 'gira a la derecha'), c('turn left', 'gira a la izquierda'), c('turn after the school', 'gira después del colegio')],
    { target: 'Turn right after the school. The library is grey.', es: 'Gira a la derecha después del colegio. La biblioteca es gris.', episodio: 19 },
    { tipo: 'verbo' }),

  en('en-a1-187', 'right', 'derecha', 'sustantivo', 'right',
    [c('turn right', 'gira a la derecha'), c('on the right', 'a la derecha'), c('the first street on the right', 'la primera calle a la derecha')],
    { target: 'Turn right after the school. The library is grey.', es: 'Gira a la derecha después del colegio. La biblioteca es gris.', episodio: 19 },
    { tipo: 'sustantivo' }),

  en('en-a1-188', 'left', 'izquierda', 'sustantivo', 'left',
    [c('turn left', 'gira a la izquierda'), c('on the left', 'a la izquierda'), c('the door on the left', 'la puerta de la izquierda')],
    {
      target: 'Turn left at the bus stop. The café is on the left.',
      es: 'Gira a la izquierda en la parada. La cafetería está a la izquierda.',
      motivo: NO_SIRVE('left', 'no aparece en ningún turno ni en ninguna lectura de inglés A1. Enseñar a dar direcciones con «right» y sin «left» es enseñar media cosa.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-189', 'straight', 'recto / derecho', 'adverbio', 'straight',
    [c('walk straight', 'sigue recto'), c('go straight for two minutes', 'sigue recto dos minutos'), c('straight to the park', 'recto hasta el parque')],
    { target: 'Walk straight for two minutes. Don’t cross the street.', es: 'Camina recto dos minutos. No cruces la calle.', episodio: 19 },
    { tipo: 'otro' }),

  en('en-a1-190', 'cross', 'cruzar', 'verbo', 'cross',
    [c('cross the street', 'cruzar la calle'), c('don’t cross here', 'no cruces aquí'), c('cross at the church', 'cruza en la iglesia')],
    {
      target: 'Cross the street and turn right.',
      es: 'Cruza la calle y gira a la derecha.',
      motivo: NO_SIRVE('cross', 'solo aparece en «Walk straight for two minutes. Don’t cross the street», la única frase del nivel que dice «straight», y esa frase ya tenía ocupado uno de sus dos huecos.'),
    },
    { tipo: 'verbo' }),

  en('en-a1-191', 'sign', 'cartel / letrero', 'sustantivo', 'sign',
    // Ojo: nada de «is there a sign?» como colocación. Es el ejemplo entero, y la caja 5
    // rechazaba al estudiante que copiaba lo único que la ficha le enseñaba a decir.
    [c('a sign in the window', 'un cartel en la ventana'), c('read the sign', 'lee el cartel'), c('a sign on the door', 'un cartel en la puerta')],
    { target: 'Is there a sign?', es: '¿Hay un cartel?', episodio: 19 },
    { tipo: 'sustantivo' }),

  en('en-a1-192', 'front', 'parte de delante', 'sustantivo', 'front',
    [c('the front desk', 'el mostrador de la entrada'), c('at the front', 'delante'), c('in front of the school', 'delante del colegio')],
    {
      target: 'For an emergency, call the number on the blue card at the front desk.',
      es: 'En caso de urgencia, llama al número de la tarjeta azul del mostrador de la entrada.',
      lectura: 'en-a1-pet-clinic-card',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-193', 'flat', 'apartamento', 'sustantivo', 'flat',
    [c('a small flat', 'un apartamento pequeño'), c('at Mia’s flat', 'en el apartamento de Mia'), c('live in a flat', 'vivir en un apartamento')],
    {
      target: 'If it rains, the picnic will move to Mia’s flat at 24 King Street.',
      es: 'Si llueve, el picnic se traslada al apartamento de Mia, en el 24 de King Street.',
      lectura: 'en-a1-birthday-party-invite',
    },
    { tipo: 'sustantivo' }),
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
      'objetos que un principiante necesite. Entraron «bag», «phone» y «water» en su lugar. ' +
      'Bloque 4 (comida y bebida), 9 ago 2026: el cruce contra la lista NO se pudo hacer, ' +
      'porque el archivo del Oxford 3000 por nivel no está en esta máquina y la lista no vive ' +
      'en el repo por derechos. Las 30 entradas se eligieron por criterio y quedan pendientes ' +
      'de cruzar antes de cerrar la fase; las que hay que mirar primero son «menu», «order», ' +
      '«soup» y «sandwich», que podrían estar en banda A2. Se quedaron fuera del bloque ' +
      '«vegetable» y «salad»: solo viven en la frase del menú del comedor, que ya enseña dos ' +
      'palabras, y no son imprescindibles en A1. «money» y «list» salen del episodio 11 pero ' +
      'no son comida: van a los bloques de ciudad y de trabajo. ' +
      'Bloque 6 (ropa, colores y describir), 9 ago 2026: mismo caso, el cruce contra la lista ' +
      'sigue pendiente. Dos entradas se sabe ya que van una banda por encima —«terrible» y ' +
      '«comfortable», ambas A2— y se mantienen por la misma razón que «lamp» o «empty»: son lo ' +
      'que se dice en el episodio 13, que es una conversación A1 sobre qué se pone cada uno ' +
      'para trabajar, y un estudiante que oye «Your shoes are terrible» necesita entenderlo. ' +
      'Cinco entradas van redactadas: «clothes», «colour» y «red» no están en el material, y ' +
      '«black» y «white» comparten la única frase que dice «trousers» y «shirt», donde solo ' +
      'caben dos. «sunny» y «busy» se quedaron fuera por lo mismo, sin sitio al que ir. ' +
      'Bloque 7 (ciudad, lugares y direcciones), 9 ago 2026: el mejor surtido del nivel —diez ' +
      'de las treinta salen de las lecturas, que son señales y avisos de ciudad— y solo dos ' +
      'redactados: «left», que no está en ningún sitio, y «cross», cuya única frase ya estaba ' +
      'llena. Pendientes de cruzar contra la lista: «platform», «passenger», «church», «sign», ' +
      '«straight» y «cross» podrían ir una banda por encima.',
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
    {
      id: 'comida-y-bebida',
      nombre: 'Comida y bebida',
      icono: '🍞',
      entradas: [...b4unidad1, ...b4unidad2, ...b4unidad3],
    },
    {
      id: 'ropa-colores-y-describir',
      nombre: 'Ropa, colores y describir',
      icono: '👕',
      entradas: [...b6unidad1, ...b6unidad2, ...b6unidad3],
    },
    {
      id: 'ciudad-lugares-y-direcciones',
      nombre: 'Ciudad, lugares y direcciones',
      icono: '🗺️',
      entradas: [...b7unidad1, ...b7unidad2, ...b7unidad3],
    },
  ],
}
