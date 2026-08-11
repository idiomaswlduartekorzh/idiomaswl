import type { Colocacion, VocabEntry, VocabLevel } from './schema'
import { reordenar } from './unidades'

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
    { target: 'Good. My grandfather has got a cake for us.', es: 'Bien. Mi abuelo tiene un pastel para nosotros.', episodio: 11 },
    { tipo: 'sustantivo' }),

  en('en-a1-017', 'grandmother', 'abuela', 'sustantivo', 'GRAND-mo-ther',
    [c('visit my grandmother', 'visitar a mi abuela'), c('my grandmother’s house', 'la casa de mi abuela')],
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

  en('en-a1-047', 'arrive', 'llegar', 'verbo', 'ar-RIVE',
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

  en('en-a1-065', 'tomorrow', 'mañana', 'adverbio', 'to-MOR-row',
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
    { target: 'He plays here every Sunday.', es: 'Toca aquí todos los domingos.', episodio: 16 },
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

/**
 * Motivo de los ejemplos que se retiraron del material por gramática de fuera de nivel.
 *
 * Lo destapó la auditoría pedagógica del 9 ago 2026: diez fichas enseñaban su palabra con
 * pasiva en pasado, `will`, `must` o primer condicional, ninguno de los cuales está en los 25
 * temas de gramática de inglés A1. Y el dato que importa: **ocho de las diez venían de los
 * textos de lectura**, no de lo escrito a mano. El vocabulario copió las frases del material
 * publicado sin comprobar el nivel gramatical, que es un hueco del procedimiento y no de la
 * redacción. Cuatro se arreglaron con otra frase del mismo material; estas seis, no.
 */
const FUERA_DE_NIVEL = (palabra: string, cual: string) =>
  `«${palabra}» sí está en el material, pero su frase usa gramática que A1 no enseña. ${cual} ` +
  `Frase redactada dentro del nivel, para no enseñar una estructura antes de tiempo.`

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

  en('en-a1-129', 'sandwich', 'sándwich / emparedado', 'sustantivo', 'SAND-wich',
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
    [c('a brown dog', 'un perro marrón'), c('brown hair', 'pelo marrón'), c('brown shoes', 'zapatos marrones')],
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

  en('en-a1-173', 'hospital', 'hospital / centro médico', 'sustantivo', 'HOS-pi-tal',
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
      target: 'The café near platform 3 is open until noon.',
      es: 'La cafetería que hay junto al andén 3 abre hasta el mediodía.',
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
      target: 'The school office is open until four o’clock.',
      es: 'La secretaría del colegio abre hasta las cuatro.',
      motivo: FUERA_DE_NIVEL('office', 'La frase del aviso —«the office will keep it until Friday»— usa «will», que A1 no enseña.'),
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
      target: 'Mia has got a small flat on King Street.',
      es: 'Mia tiene un apartamento pequeño en King Street.',
      motivo: FUERA_DE_NIVEL('flat', 'Su frase de la invitación es un primer condicional con «will».'),
    },
    { tipo: 'sustantivo' }),
]

// ═══ BLOQUE 8 · Rutina diaria y acciones ══════════════════════════════════════
//
// **Cero redactados.** Las treinta salen del material, y es el primer bloque del nivel que lo
// consigue. La razón es que una rutina no vive en un episodio: vive repartida por los veinte,
// porque todos los personajes hacen cosas todo el rato. Ningún episodio aporta más de tres
// entradas —el reparto más plano del nivel, un 10 % de techo frente al 33 % del bloque 6—.
//
// Que salga fácil no quiere decir que sobrara sitio. Al contrario: casi todas las frases
// buenas ya estaban ocupadas por bloques anteriores, así que hubo que buscar la segunda o la
// tercera aparición de cada verbo. «stay» se quedó fuera por eso —su única frase, «In winter
// I stay at home with a book», ya enseñaba dos— y entró «evening», que completa el juego de
// las cuatro partes del día y sí tenía hueco.
//
// Y otra tanda de espejismos, que a estas alturas ya es la norma: «go» daba doce positivos y
// los doce eran *got*; «read» siete y casi todos eran *bread*; «wait» cinco y eran
// *waitress*; «sing» tres y uno era *single*; «come» tres y eran *comfortable* y *community*.

// ─── Unidad 1 · Las horas del día ─────────────────────────────────────────────

const b8unidad1: VocabEntry[] = [
  en('en-a1-194', 'morning', 'mañana (parte del día)', 'sustantivo', 'MOR-ning',
    [c('in the morning', 'por la mañana'), c('every morning', 'todas las mañanas'), c('on Monday morning', 'el lunes por la mañana')],
    { target: 'I’m working in the morning. In the afternoon I’m free.', es: 'Trabajo por la mañana. Por la tarde estoy libre.', episodio: 18 },
    { tipo: 'sustantivo' }),

  en('en-a1-195', 'afternoon', 'tarde', 'sustantivo', 'af-ter-NOON',
    [c('in the afternoon', 'por la tarde'), c('this afternoon', 'esta tarde'), c('every afternoon', 'todas las tardes')],
    { target: 'I’m working in the morning. In the afternoon I’m free.', es: 'Trabajo por la mañana. Por la tarde estoy libre.', episodio: 18 },
    { tipo: 'sustantivo' }),

  en('en-a1-196', 'evening', 'tarde-noche', 'sustantivo', 'EVE-ning',
    [c('in the evening', 'por la tarde-noche'), c('six in the evening', 'las seis de la tarde'), c('good evening', 'buenas tardes')],
    {
      target: 'The first bus leaves at eight o’clock, and the last bus leaves at six in the evening.',
      es: 'El primer autobús sale a las ocho en punto y el último a las seis de la tarde.',
      lectura: 'en-a1-saturday-bus-guide',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-197', 'night', 'noche', 'sustantivo', 'night',
    [c('at night', 'de noche'), c('work at night', 'trabajar de noche'), c('good night', 'buenas noches')],
    { target: 'Does she work at night?', es: '¿Trabaja de noche?', episodio: 7 },
    { tipo: 'sustantivo' }),

  en('en-a1-198', 'first', 'primero', 'adverbio', 'first',
    [c('I make coffee first', 'primero hago café'), c('the first bus', 'el primer autobús'), c('first, we clean', 'primero limpiamos')],
    {
      target: 'First, we collect paper near the lake.',
      es: 'Primero recogemos papel cerca del lago.',
      lectura: 'en-a1-park-cleanup-poster',
    },
    { tipo: 'otro' }),

  en('en-a1-199', 'then', 'luego / entonces', 'adverbio', 'then',
    // El ejemplo NO puede ser «And then?», aunque sea la frase más natural del corpus: tiene
    // dos palabras, y la caja 5 pide tres. La ficha estaría enseñando como modelo algo que el
    // propio motor rechaza si el estudiante lo copia.
    [c('and then?', '¿y luego?'), c('first this, then that', 'primero esto, luego aquello'), c('then we go home', 'y luego nos vamos a casa')],
    {
      target: 'Then we clean the picnic tables.',
      es: 'Luego limpiamos las mesas del picnic.',
      lectura: 'en-a1-park-cleanup-poster',
    },
    { tipo: 'otro' }),

  en('en-a1-200', 'after', 'después (de)', 'preposicion', 'AF-ter',
    [c('after school', 'después del colegio'), c('after work', 'después del trabajo'), c('after lunch', 'después de comer')],
    { target: 'Are you visiting your grandfather after?', es: '¿Vas a ver a tu abuelo después?', episodio: 18 },
    { tipo: 'otro' }),

  en('en-a1-201', 'before', 'antes de', 'preposicion', 'be-FORE',
    [c('before five', 'antes de las cinco'), c('before Friday', 'antes del viernes'), c('before you choose', 'antes de elegir')],
    {
      target: 'If you cannot come today, call Mrs Green before five.',
      es: 'Si hoy no puedes venir, llama a la señora Green antes de las cinco.',
      lectura: 'en-a1-library-book-message',
    },
    { tipo: 'otro' }),

  en('en-a1-202', 'start', 'empezar', 'verbo', 'start',
    [c('start at seven', 'empezar a las siete'), c('start on Sunday', 'empezar el domingo'), c('when does it start?', '¿cuándo empieza?')],
    { target: 'Then we can start on Sunday morning.', es: 'Entonces podemos empezar el domingo por la mañana.', episodio: 17 },
    { tipo: 'verbo' }),

  en('en-a1-203', 'finish', 'terminar', 'verbo', 'FIN-ish',
    [c('finish at one thirty', 'terminar a la una y media'), c('finish the book', 'terminar el libro'), c('when do you finish?', '¿a qué hora terminas?')],
    {
      target: 'Lunch starts at twelve and finishes at one thirty.',
      es: 'El almuerzo empieza a las doce y termina a la una y media.',
      lectura: 'en-a1-lunch-menu',
    },
    { tipo: 'verbo' }),
]

// ─── Unidad 2 · Lo que hago cada día ──────────────────────────────────────────

const b8unidad2: VocabEntry[] = [
  en('en-a1-204', 'come', 'venir', 'verbo', 'come',
    [c('can you come?', '¿puedes venir?'), c('come with an adult', 'venir con un adulto'), c('come to the park', 'venir al parque')],
    {
      target: 'If you cannot come today, call Mrs Green before five.',
      es: 'Si hoy no puedes venir, llama a la señora Green antes de las cinco.',
      lectura: 'en-a1-library-book-message',
    },
    { tipo: 'verbo' }),

  en('en-a1-205', 'study', 'estudiar', 'verbo', 'STU-dy',
    [c('study in the library', 'estudiar en la biblioteca'), c('study English', 'estudiar inglés'), c('study at night', 'estudiar de noche')],
    { target: 'I usually study in the library. Sometimes I visit my grandfather.', es: 'Normalmente estudio en la biblioteca. A veces visito a mi abuelo.', episodio: 8 },
    { tipo: 'verbo' }),

  en('en-a1-206', 'read', 'leer', 'verbo', 'read',
    [c('read a book', 'leer un libro'), c('read the sign', 'leer el cartel'), c('he reads and he cooks', 'lee y cocina')],
    { target: 'He doesn’t work now. He reads and he cooks.', es: 'Ahora no trabaja. Lee y cocina.', episodio: 7 },
    { tipo: 'verbo' }),

  en('en-a1-207', 'play', 'jugar / tocar', 'verbo', 'play',
    [c('play football', 'jugar al fútbol'), c('play in the park', 'jugar en el parque'), c('play the guitar', 'tocar la guitarra')],
    { target: 'Do you play in the park?', es: '¿Jugáis en el parque?', episodio: 8 },
    { tipo: 'verbo' }),

  en('en-a1-208', 'run', 'correr', 'verbo', 'run',
    [c('run in the park', 'correr en el parque'), c('run every morning', 'correr todas las mañanas'), c('run with a dog', 'correr con un perro')],
    { target: 'He’s three. He runs in the park every morning.', es: 'Tres. Corre en el parque cada mañana.', episodio: 15 },
    { tipo: 'verbo' }),

  en('en-a1-209', 'sing', 'cantar', 'verbo', 'sing',
    [c('sing a song', 'cantar una canción'), c('he is singing', 'está cantando'), c('sing in the park', 'cantar en el parque')],
    { target: 'Somebody is singing. Can you hear it?', es: 'Alguien está cantando. ¿Lo oyes?', episodio: 16 },
    { tipo: 'verbo' }),

  en('en-a1-210', 'sell', 'vender', 'verbo', 'sell',
    [c('sell ice cream', 'vender helados'), c('sell bread', 'vender pan'), c('what do they sell?', '¿qué venden?')],
    { target: 'That man is selling ice cream in November.', es: 'Ese hombre está vendiendo helados en noviembre.', episodio: 16 },
    { tipo: 'verbo' }),

  en('en-a1-211', 'wait', 'esperar', 'verbo', 'wait',
    [c('wait at the stop', 'esperar en la parada'), c('wait outside', 'esperar fuera'), c('wait for a friend', 'esperar a un amigo')],
    { target: 'I can’t wait.', es: 'Me muero de ganas.', episodio: 17 },
    { tipo: 'verbo' }),

  en('en-a1-212', 'rest', 'descansar', 'verbo', 'rest',
    [c('rest on Sunday', 'descansar el domingo'), c('rest at home', 'descansar en casa'), c('do you rest?', '¿descansas?')],
    { target: 'You work every Saturday. Do you rest?', es: 'Trabajas todos los sábados. ¿Descansas?', episodio: 9 },
    { tipo: 'verbo' }),

  // `go` no estaba en las 310, y es el verbo léxico más frecuente del A1. El buscador daba
  // doce positivos y los doce eran «got» y «good»: otro espejismo, y de los caros.
  en('en-a1-334', 'go', 'ir', 'verbo', 'go',
    [c('go to work', 'ir a trabajar'), c('go home', 'irse a casa'), c('go to the park', 'ir al parque')],
    {
      target: 'I go to work at eight.',
      es: 'Voy a trabajar a las ocho.',
      motivo: NO_SIRVE('go', 'no aparece suelta en ningún turno ni lectura —los doce positivos de la búsqueda eran «got» y «good»— y es el verbo de movimiento más frecuente del nivel.'),
    },
    { tipo: 'verbo', phrasal: ['go out — salir', 'go back — volver'] }),

  en('en-a1-213', 'bring', 'traer / llevar', 'verbo', 'bring',
    [c('bring your card', 'trae tu carné'), c('bring a hat', 'trae un sombrero'), c('bring a friend', 'traer a un amigo')],
    {
      target: 'Bring gloves if you have them.',
      es: 'Trae guantes si tienes.',
      lectura: 'en-a1-park-cleanup-poster',
    },
    { tipo: 'verbo' }),
]

// ─── Unidad 3 · Hablar, pedir y responder ─────────────────────────────────────

const b8unidad3: VocabEntry[] = [
  en('en-a1-214', 'want', 'querer', 'verbo', 'want',
    [c('I want a card', 'quiero un carné'), c('do you want to see it?', '¿quieres verlo?'), c('what do you want?', '¿qué quieres?')],
    { target: 'Do you want to see inside?', es: '¿Quieres ver por dentro?', episodio: 20 },
    { tipo: 'verbo' }),

  en('en-a1-215', 'need', 'necesitar', 'verbo', 'need',
    [c('we need bread', 'necesitamos pan'), c('I need help', 'necesito ayuda'), c('what do you need?', '¿qué necesitas?')],
    {
      target: 'Please tell Mr Lee if you need a vegetarian meal.',
      es: 'Dile al señor Lee si necesitas un plato vegetariano.',
      lectura: 'en-a1-morning-school-note',
    },
    { tipo: 'verbo' }),

  en('en-a1-216', 'tell', 'decir (a alguien)', 'verbo', 'tell',
    [c('tell me', 'dime'), c('tell your sister', 'díselo a tu hermana'), c('tell the teacher', 'díselo al profesor')],
    {
      target: 'Please tell Mr Lee if you need a vegetarian meal.',
      es: 'Dile al señor Lee si necesitas un plato vegetariano.',
      lectura: 'en-a1-morning-school-note',
    },
    { tipo: 'verbo' }),

  en('en-a1-217', 'know', 'saber / conocer', 'verbo', 'know',
    [c('I know', 'lo sé'), c('I don’t know', 'no lo sé'), c('know the answer', 'saber la respuesta')],
    { target: 'Those tiles are from 1971. I know every one.', es: 'Esas baldosas son de 1971. Me sé cada una.', episodio: 20 },
    { tipo: 'verbo' }),

  en('en-a1-218', 'say', 'decir', 'verbo', 'say',
    [c('what do you say?', '¿qué dices?'), c('say the same thing', 'decir lo mismo'), c('say yes', 'decir que sí')],
    { target: 'My grandfather says the same thing.', es: 'Mi abuelo dice exactamente lo mismo.', episodio: 13 },
    { tipo: 'verbo' }),

  en('en-a1-219', 'ask', 'preguntar / pedir', 'verbo', 'ask',
    [c('ask the teacher', 'pregúntale al profesor'), c('ask a question', 'hacer una pregunta'), c('ask about the menu', 'preguntar por la carta')],
    {
      target: 'Ask the kitchen team about allergies before you choose.',
      es: 'Pregunta al equipo de cocina por las alergias antes de elegir.',
      lectura: 'en-a1-lunch-menu',
    },
    { tipo: 'verbo' }),

  en('en-a1-220', 'answer', 'respuesta', 'sustantivo', 'AN-swer',
    [c('a good answer', 'una buena respuesta'), c('know the answer', 'saber la respuesta'), c('the right answer', 'la respuesta correcta')],
    { target: 'That’s a very good answer.', es: 'Esa es una respuesta muy buena.', episodio: 9 },
    { tipo: 'sustantivo' }),

  en('en-a1-221', 'call', 'llamar', 'verbo', 'call',
    [c('call the office', 'llamar a la oficina'), c('call before five', 'llamar antes de las cinco'), c('call your name', 'decir tu nombre en voz alta')],
    {
      target: 'For an emergency, call the number on the blue card at the front desk.',
      es: 'En caso de urgencia, llama al número de la tarjeta azul del mostrador de la entrada.',
      lectura: 'en-a1-pet-clinic-card',
    },
    { tipo: 'verbo' }),

  en('en-a1-222', 'again', 'otra vez', 'adverbio', 'a-GAIN',
    [c('singing again', 'cantando otra vez'), c('empty again', 'vacío otra vez'), c('say it again', 'dilo otra vez')],
    { target: 'It’s the man with the guitar. He’s singing again.', es: 'Es el hombre de la guitarra. Está cantando otra vez.', episodio: 16 },
    { tipo: 'otro' }),

  en('en-a1-223', 'still', 'todavía', 'adverbio', 'still',
    [c('do you still work?', '¿todavía trabajas?'), c('still open', 'todavía abierto'), c('I still live here', 'todavía vivo aquí')],
    { target: 'Can you still work with your hands?', es: '¿Todavía puedes trabajar con las manos?', episodio: 17 },
    { tipo: 'otro' }),
]

// ═══ BLOQUE 5 · Cuerpo, salud y sensaciones ═══════════════════════════════════
//
// El bloque que se paró el 9 de agosto y que el usuario desbloqueó ese mismo día: se escribe
// igual, con los ejemplos redactados que hagan falta, y se vuelven a enlazar cuando el corpus
// crezca. La decisión y sus condiciones están en docs/vocabulario-loop.md §3 y §7.
//
// Por qué son tantos: el material de inglés A1 no tiene el tema. Ni una parte del cuerpo
// salvo «hands», ni «doctor», ni «tired», ni «happy». Los siete positivos que daba el buscador
// eran espejismos —«body» era *nobody*, «ear» era *years*, «hair» era *chair*, «arm» era
// *warm*, «foot» era *football*, «pain» era *paint*, «ill» era *still*—.
//
// Ocho de las treinta sí salen del material, y son las que sostienen el bloque: «hand»,
// «hear», «smell», «miss», «hot», «windy», «snow» y «rain». Las veintidós restantes van
// redactadas, cada una con su motivo, y se encuentran todas de golpe con:
//
//   grep -n "motivo:" src/data/practica/vocabulario/ingles-a1.ts
//
// La gramática de esas frases no se sale del nivel: presente simple, `have got`, `can`,
// `there is/are`. Lo mismo que el estudiante ya oye en los veinte episodios.

/** Motivo de las veintidós del bloque 5. La decisión de escribirlas es del usuario. */
const SIN_TEMA = (palabra: string, papel: string) =>
  `«${palabra}» no aparece en ningún turno de los 20 episodios ni en ninguna lectura de ` +
  `inglés A1: el material del nivel no trata el cuerpo ni la salud. ${papel} Frase redactada ` +
  `con la gramática del nivel, por decisión del usuario (9 ago 2026), y marcada para volver a ` +
  `enlazarla cuando el corpus cubra el tema.`

// ─── Unidad 1 · El cuerpo ─────────────────────────────────────────────────────

const b5unidad1: VocabEntry[] = [
  en('en-a1-224', 'body', 'cuerpo', 'sustantivo', 'BO-dy',
    [c('my whole body', 'todo el cuerpo'), c('parts of the body', 'partes del cuerpo'), c('a strong body', 'un cuerpo fuerte')],
    {
      target: 'A body has got two arms and two legs.',
      es: 'Un cuerpo tiene dos brazos y dos piernas.',
      motivo: SIN_TEMA('body', 'Es la palabra que da nombre a la unidad.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-225', 'head', 'cabeza', 'sustantivo', 'head',
    [c('from head to foot', 'de la cabeza a los pies'), c('a hat on your head', 'un sombrero en la cabeza'), c('my head is cold', 'tengo la cabeza fría')],
    {
      target: 'He puts the hat on his head.',
      es: 'Se pone el sombrero en la cabeza.',
      motivo: SIN_TEMA('head', 'Sin ella no se puede señalar nada por encima del cuello.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-226', 'face', 'cara', 'sustantivo', 'face',
    [c('a happy face', 'una cara alegre'), c('wash your face', 'lávate la cara'), c('I know that face', 'me suena esa cara')],
    {
      target: 'She has got a happy face.',
      es: 'Tiene una cara alegre.',
      motivo: SIN_TEMA('face', 'Es la parte que se nombra al describir a alguien.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-227', 'eye', 'ojo', 'sustantivo', 'eye',
    [c('green eyes', 'ojos verdes'), c('open your eyes', 'abre los ojos'), c('big brown eyes', 'ojos grandes y marrones')],
    {
      target: 'My sister has got green eyes.',
      es: 'Mi hermana tiene los ojos verdes.',
      motivo: SIN_TEMA('eye', 'Describir a una persona en A1 empieza por los ojos y el pelo.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-228', 'ear', 'oreja / oído', 'sustantivo', 'ear',
    [c('small ears', 'orejas pequeñas'), c('in one ear', 'en un oído'), c('the dog’s ears', 'las orejas del perro')],
    {
      target: 'She has got small ears and short hair.',
      es: 'Tiene las orejas pequeñas y el pelo corto.',
      motivo: SIN_TEMA('ear', 'Va con «hear», que sí está en el material.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-229', 'nose', 'nariz', 'sustantivo', 'nose',
    [c('a black nose', 'una nariz negra'), c('a cold nose', 'la nariz fría'), c('under your nose', 'delante de tus narices')],
    {
      target: 'Your nose is red today.',
      es: 'Hoy tienes la nariz roja.',
      motivo: SIN_TEMA('nose', 'Va con «smell», que sí está en el material.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-230', 'mouth', 'boca', 'sustantivo', 'mouth',
    [c('open your mouth', 'abre la boca'), c('with your mouth full', 'con la boca llena'), c('a small mouth', 'una boca pequeña')],
    {
      target: 'Open your mouth, please.',
      es: 'Abre la boca, por favor.',
      motivo: SIN_TEMA('mouth', 'Es la parte del cuerpo que aparece en cualquier visita al médico.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-231', 'hair', 'pelo', 'sustantivo', 'hair',
    [c('short hair', 'pelo corto'), c('brown hair', 'pelo marrón'), c('wash your hair', 'lavarse el pelo')],
    {
      target: 'She has got short brown hair.',
      es: 'Tiene el pelo corto y marrón.',
      motivo: SIN_TEMA('hair', 'El buscador la daba por presente y era «chair» en los episodios 3 y 4.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-232', 'hand', 'mano', 'sustantivo', 'hand',
    [c('work with your hands', 'trabajar con las manos'), c('wash your hands', 'lavarse las manos'), c('in my hand', 'en la mano')],
    { target: 'Can you still work with your hands?', es: '¿Todavía puedes trabajar con las manos?', episodio: 17 },
    { tipo: 'sustantivo' }),

  en('en-a1-233', 'arm', 'brazo', 'sustantivo', 'arm',
    [c('tired arms', 'brazos cansados'), c('under your arm', 'debajo del brazo'), c('long arms', 'brazos largos')],
    {
      target: 'She has got long arms.',
      es: 'Tiene los brazos largos.',
      motivo: SIN_TEMA('arm', 'El buscador la daba por presente y era «warm» del episodio 14.'),
    },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 2 · La salud y cómo me siento ─────────────────────────────────────

const b5unidad2: VocabEntry[] = [
  en('en-a1-234', 'leg', 'pierna / pata', 'sustantivo', 'leg',
    [c('four legs', 'cuatro patas'), c('my legs are tired', 'tengo las piernas cansadas'), c('long legs', 'piernas largas')],
    {
      target: 'My legs hurt today.',
      es: 'Hoy me duelen las piernas.',
      motivo: SIN_TEMA('leg', 'Sirve para el cuerpo y para los muebles, que sí están en el nivel.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-235', 'foot', 'pie', 'sustantivo', 'foot',
    [c('on foot', 'a pie'), c('two feet', 'dos pies'), c('my feet are cold', 'tengo los pies fríos')],
    {
      target: 'This shoe is too small for my foot.',
      es: 'Este zapato es muy pequeño para mi pie.',
      motivo: SIN_TEMA('foot', 'El buscador la daba por presente y era «football» de los episodios 8 y 16.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-236', 'back', 'espalda', 'sustantivo', 'back',
    [c('my back hurts', 'me duele la espalda'), c('behind my back', 'a mis espaldas'), c('a tired back', 'la espalda cansada')],
    {
      target: 'My back hurts. I want a chair.',
      es: 'Me duele la espalda. Quiero una silla.',
      motivo: SIN_TEMA('back', 'En el material solo aparece como «the back door», que es otra cosa.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-237', 'doctor', 'médico / doctora', 'sustantivo', 'DOC-tor',
    [c('go to the doctor', 'ir al médico'), c('the doctor says', 'el médico dice'), c('a good doctor', 'un buen médico')],
    {
      target: 'The doctor works at the hospital.',
      es: 'El médico trabaja en el hospital.',
      motivo: SIN_TEMA('doctor', 'El nivel enseña «nurse» y «hospital» pero nunca dice «doctor».'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-238', 'sick', 'enfermo', 'adjetivo', 'sick',
    [c('I am sick today', 'hoy estoy enfermo'), c('a sick child', 'un niño enfermo'), c('sick at home', 'enfermo en casa')],
    {
      target: 'I am sick today. I can’t work.',
      es: 'Hoy estoy enfermo. No puedo trabajar.',
      motivo: SIN_TEMA('sick', 'Es la frase con la que se avisa de que no se va a clase o al trabajo.'),
    },
    { tipo: 'otro' }),

  // Un bloque de salud sin «me duele» no sirve para lo único que hace ir al médico.
  en('en-a1-335', 'hurt', 'doler', 'verbo', 'hurt',
    [c('my head hurts', 'me duele la cabeza'), c('does it hurt?', '¿te duele?'), c('my back hurts', 'me duele la espalda')],
    {
      target: 'My arm hurts. I want a doctor.',
      es: 'Me duele el brazo. Quiero un médico.',
      motivo: SIN_TEMA('hurt', 'Es la frase por la que existe un bloque de salud: sin ella el estudiante puede nombrar el cuerpo y no puede decir qué le pasa.'),
    },
    { tipo: 'verbo' }),

  en('en-a1-239', 'tired', 'cansado', 'adjetivo', 'tired',
    [c('I am tired', 'estoy cansado'), c('tired after work', 'cansado después del trabajo'), c('very tired', 'muy cansado')],
    {
      target: 'I am tired after eight hours.',
      es: 'Estoy cansado después de ocho horas.',
      motivo: SIN_TEMA('tired', 'El abuelo del episodio 17 trabaja ocho horas y nunca dice esta palabra.'),
    },
    { tipo: 'otro' }),

  en('en-a1-240', 'hungry', 'con hambre', 'adjetivo', 'HUN-gry',
    [c('I am hungry', 'tengo hambre'), c('hungry children', 'niños con hambre'), c('very hungry', 'con mucha hambre')],
    {
      target: 'I am hungry. Is there bread?',
      es: 'Tengo hambre. ¿Hay pan?',
      motivo: SIN_TEMA('hungry', 'El bloque de comida entero se escribió sin poder decir «tengo hambre».'),
    },
    { tipo: 'otro' }),

  en('en-a1-241', 'thirsty', 'con sed', 'adjetivo', 'THIRS-ty',
    [c('I am thirsty', 'tengo sed'), c('thirsty after football', 'con sed después del fútbol'), c('very thirsty', 'con mucha sed')],
    {
      target: 'I am thirsty. I want water.',
      es: 'Tengo sed. Quiero agua.',
      motivo: SIN_TEMA('thirsty', 'Va con «hungry»: son la pareja con la que se pide de comer y de beber.'),
    },
    { tipo: 'otro' }),

  en('en-a1-242', 'happy', 'contento / feliz', 'adjetivo', 'HAP-py',
    [c('a happy face', 'una cara alegre'), c('happy with the job', 'contento con el trabajo'), c('very happy', 'muy contento')],
    {
      target: 'She is happy with her new job.',
      es: 'Está contenta con su trabajo nuevo.',
      motivo: SIN_TEMA('happy', 'Ninguno de los cuatro personajes dice nunca cómo se siente.'),
    },
    { tipo: 'otro' }),

  en('en-a1-243', 'sad', 'triste', 'adjetivo', 'sad',
    [c('a sad day', 'un día triste'), c('sad about the shop', 'triste por lo del local'), c('a sad film', 'una película triste')],
    {
      target: 'He is sad today. His dog is sick.',
      es: 'Hoy está triste. Su perro está enfermo.',
      motivo: SIN_TEMA('sad', 'Es la otra mitad de «happy»: sin las dos no se puede contestar «¿cómo estás?».'),
    },
    { tipo: 'otro' }),
]

// ─── Unidad 3 · Los sentidos y el tiempo que hace ─────────────────────────────

const b5unidad3: VocabEntry[] = [
  en('en-a1-244', 'feel', 'sentirse', 'verbo', 'feel',
    [c('how do you feel?', '¿cómo te sientes?'), c('feel tired', 'sentirse cansado'), c('feel better', 'sentirse mejor')],
    {
      target: 'I feel tired today.',
      es: 'Hoy me siento cansado.',
      motivo: SIN_TEMA('feel', 'Es el verbo con el que se usa todo lo demás de esta unidad.'),
    },
    { tipo: 'verbo' }),

  en('en-a1-245', 'hear', 'oír', 'verbo', 'hear',
    [c('can you hear it?', '¿lo oyes?'), c('hear the music', 'oír la música'), c('I can’t hear you', 'no te oigo')],
    { target: 'Somebody is singing. Can you hear it?', es: 'Alguien está cantando. ¿Lo oyes?', episodio: 16 },
    { tipo: 'verbo' }),

  en('en-a1-246', 'see', 'ver', 'verbo', 'see',
    [c('I can see the park', 'veo el parque'), c('see you tomorrow', 'hasta mañana'), c('see the doctor', 'ver al médico')],
    {
      target: 'I can see the park from my window.',
      es: 'Veo el parque desde mi ventana.',
      motivo: SIN_TEMA('see', 'Sí aparece en «Do you want to see inside?», pero esa frase ya enseña dos palabras.'),
    },
    { tipo: 'verbo' }),

  en('en-a1-247', 'smell', 'olor', 'sustantivo', 'smell',
    [c('the smell of bread', 'el olor a pan'), c('a good smell', 'un buen olor'), c('I miss the smell', 'echo de menos el olor')],
    { target: 'I miss the smell. I don’t miss the hours.', es: 'Echo de menos el olor. No echo de menos el horario.', episodio: 9 },
    { tipo: 'sustantivo' }),

  en('en-a1-248', 'miss', 'echar de menos', 'verbo', 'miss',
    [c('miss the bakery', 'echar de menos la panadería'), c('miss your family', 'echar de menos a tu familia'), c('I don’t miss it', 'no lo echo de menos')],
    { target: 'Five! Do you miss it?', es: '¡Las cinco! ¿La echas de menos?', episodio: 9 },
    { tipo: 'verbo' }),

  en('en-a1-249', 'hot', 'caluroso / caliente', 'adjetivo', 'hot',
    [c('it’s hot today', 'hoy hace calor'), c('hot coffee', 'café caliente'), c('a hot city', 'una ciudad calurosa')],
    { target: 'In Cartagena it’s hot every day.', es: 'En Cartagena hace calor todos los días.', episodio: 14 },
    { tipo: 'otro' }),

  en('en-a1-250', 'windy', 'con viento', 'adjetivo', 'WIN-dy',
    [c('cold and windy', 'frío y con viento'), c('a windy day', 'un día de viento'), c('windy in November', 'con viento en noviembre')],
    { target: 'In November it’s cold and windy.', es: 'En noviembre hace frío y viento.', episodio: 14 },
    { tipo: 'otro' }),

  en('en-a1-251', 'snow', 'nieve', 'sustantivo', 'snow',
    [c('there’s snow', 'hay nieve'), c('snow in winter', 'nieve en invierno'), c('a lot of snow', 'mucha nieve')],
    { target: 'It’s colder. Sometimes there’s snow.', es: 'Hace más frío. A veces hay nieve.', episodio: 14 },
    { tipo: 'sustantivo' }),

  en('en-a1-252', 'rain', 'llover / lluvia', 'verbo', 'rain',
    [c('if it rains', 'si llueve'), c('it rains every day', 'llueve todos los días'), c('a lot of rain', 'mucha lluvia')],
    {
      target: 'It rains every afternoon in November.',
      es: 'En noviembre llueve todas las tardes.',
      motivo: FUERA_DE_NIVEL('rain', 'Comparte con «flat» el primer condicional de la invitación.'),
    },
    { tipo: 'verbo' }),

  en('en-a1-253', 'weather', 'tiempo (clima)', 'sustantivo', 'WEA-ther',
    [c('the weather is cold', 'hace frío'), c('good weather', 'buen tiempo'), c('how’s the weather?', '¿qué tiempo hace?')],
    {
      target: 'The weather is cold in November.',
      es: 'En noviembre hace frío.',
      motivo: SIN_TEMA('weather', 'El episodio 14 habla del clima entero sin usar nunca la palabra que lo nombra.'),
    },
    { tipo: 'sustantivo' }),
]

// ═══ BLOQUE 9 · Estudio, trabajo y dinero ═════════════════════════════════════
//
// Diecisiete de las treinta salen del material, y trece van redactadas. El reparto tiene una
// explicación clara: el nivel enseña muy bien los **recados** —recoger un libro, revisar un
// billete, guardar algo en la oficina, quedar en la biblioteca— porque las lecturas son
// avisos y mensajes. Lo que no enseña es la **clase por dentro** («teacher», «learn»,
// «write», «listen», «question», «homework», «exam») ni el **dinero** más allá de «I've got
// money for the coffee»: no hay «pay», ni «buy», ni «price», ni «cheap», ni «expensive».
//
// Tres entradas van una banda por encima —«schedule», «owner» y «collect», las tres A2— y se
// mantienen porque salen literalmente del episodio 10 y de los avisos del colegio.

const SIN_AULA = (palabra: string, papel: string) =>
  `«${palabra}» no aparece en el material de inglés A1. ${papel} Frase redactada con la ` +
  `gramática del nivel y marcada para volver a enlazarla cuando el corpus la cubra.`

// ─── Unidad 1 · En clase ──────────────────────────────────────────────────────

const b9unidad1: VocabEntry[] = [
  en('en-a1-254', 'class', 'clase', 'sustantivo', 'class',
    [c('the English class', 'la clase de inglés'), c('after class', 'después de clase'), c('a class at nine', 'una clase a las nueve')],
    {
      target: 'The English class starts at six.',
      es: 'La clase de inglés empieza a las seis.',
      motivo: FUERA_DE_NIVEL('class', 'La frase del aviso —«a blue backpack was found»— es pasiva en pasado, la estructura más lejos del nivel de todo el material.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-255', 'teacher', 'profesor / profesora', 'sustantivo', 'TEA-cher',
    [c('ask the teacher', 'pregúntale al profesor'), c('an English teacher', 'un profesor de inglés'), c('a good teacher', 'un buen profesor')],
    {
      target: 'My teacher is from Colombia.',
      es: 'Mi profesora es de Colombia.',
      motivo: SIN_AULA('teacher', 'El nivel enseña «teach» y «student» pero nunca nombra al que enseña.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-336', 'English', 'inglés', 'sustantivo', 'ENG-lish',
    [c('the English class', 'la clase de inglés'), c('speak English', 'hablar inglés'), c('an English book', 'un libro de inglés')],
    { target: 'My English class is on Tuesday at six.', es: 'Mi clase de inglés es el martes a las seis.', episodio: 10 },
    { tipo: 'sustantivo' }),

  en('en-a1-256', 'learn', 'aprender', 'verbo', 'learn',
    [c('learn English', 'aprender inglés'), c('learn a new word', 'aprender una palabra nueva'), c('learn at school', 'aprender en el colegio')],
    {
      target: 'I want to learn English this year.',
      es: 'Quiero aprender inglés este año.',
      motivo: SIN_AULA('learn', 'Es lo que hace el estudiante que usa esta página, y no está en el material.'),
    },
    { tipo: 'verbo' }),

  en('en-a1-257', 'write', 'escribir', 'verbo', 'write',
    [c('write a message', 'escribir un mensaje'), c('write your name', 'escribe tu nombre'), c('write in English', 'escribir en inglés')],
    {
      target: 'Please write your name on the card.',
      es: 'Escribe tu nombre en la tarjeta, por favor.',
      motivo: SIN_AULA('write', 'El nivel tiene «read» pero no su pareja.'),
    },
    { tipo: 'verbo' }),

  en('en-a1-258', 'listen', 'escuchar', 'verbo', 'LIS-ten',
    [c('listen to the teacher', 'escuchar al profesor'), c('listen to music', 'escuchar música'), c('listen again', 'escúchalo otra vez')],
    {
      target: 'Listen to the music and answer.',
      es: 'Escucha la música y responde.',
      motivo: SIN_AULA('listen', 'El nivel tiene «hear» —oír sin querer— pero no «listen», que es escuchar a propósito.'),
    },
    { tipo: 'verbo' }),

  en('en-a1-259', 'question', 'pregunta', 'sustantivo', 'QUES-tion',
    [c('ask a question', 'hacer una pregunta'), c('a good question', 'una buena pregunta'), c('answer the question', 'responder a la pregunta')],
    {
      target: 'Can I ask a question about the exam?',
      es: '¿Puedo hacer una pregunta sobre el examen?',
      motivo: SIN_AULA('question', 'El nivel enseña «answer» y «ask» pero no el sustantivo que las une.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-260', 'homework', 'deberes / tarea', 'sustantivo', 'HOME-work',
    [c('do your homework', 'haz los deberes'), c('homework for Monday', 'deberes para el lunes'), c('a lot of homework', 'muchos deberes')],
    {
      target: 'I do my homework after dinner.',
      es: 'Hago los deberes después de cenar.',
      motivo: SIN_AULA('homework', 'Es la palabra con la que un estudiante organiza su semana.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-261', 'exam', 'examen', 'sustantivo', 'ex-AM',
    [c('an English exam', 'un examen de inglés'), c('the exam is on Friday', 'el examen es el viernes'), c('study for the exam', 'estudiar para el examen')],
    {
      target: 'The English exam is on Friday morning.',
      es: 'El examen de inglés es el viernes por la mañana.',
      motivo: SIN_AULA('exam', 'La academia entera prepara exámenes y el nivel no dice la palabra.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-262', 'ready', 'listo / preparado', 'adjetivo', 'REA-dy',
    [c('the book is ready', 'el libro está listo'), c('ready for the exam', 'listo para el examen'), c('are you ready?', '¿estás listo?')],
    {
      target: 'Hi Leo, your English book is ready at the library.',
      es: 'Hola Leo, tu libro de inglés está listo en la biblioteca.',
      lectura: 'en-a1-library-book-message',
    },
    { tipo: 'otro' }),

  en('en-a1-263', 'message', 'mensaje', 'sustantivo', 'MES-sage',
    [c('a short message', 'un mensaje corto'), c('read the message', 'leer el mensaje'), c('send a message', 'mandar un mensaje')],
    {
      target: 'Emma reads a short message from her sister.',
      es: 'Emma lee un mensaje corto de su hermana.',
      lectura: 'en-a1-my-morning-at-the-cafe',
    },
    { tipo: 'sustantivo' }),
]

// ─── Unidad 2 · En el trabajo ─────────────────────────────────────────────────

const b9unidad2: VocabEntry[] = [
  en('en-a1-264', 'schedule', 'horario', 'sustantivo', 'SCHE-dule',
    [c('a perfect schedule', 'un horario perfecto'), c('the bus schedule', 'el horario del autobús'), c('a busy schedule', 'un horario apretado')],
    { target: 'That’s a perfect schedule.', es: 'Ese horario es perfecto.', episodio: 10 },
    { tipo: 'sustantivo' }),

  en('en-a1-265', 'perfect', 'perfecto', 'adjetivo', 'PER-fect',
    [c('a perfect day', 'un día perfecto'), c('perfect for me', 'perfecto para mí'), c('perfect English', 'un inglés perfecto')],
    { target: 'That’s a perfect schedule.', es: 'Ese horario es perfecto.', episodio: 10 },
    { tipo: 'otro' }),

  en('en-a1-266', 'meeting', 'reunión', 'sustantivo', 'MEE-ting',
    [c('a meeting at four', 'una reunión a las cuatro'), c('meeting at the library', 'quedada en la biblioteca'), c('after the meeting', 'después de la reunión')],
    { target: 'We’re meeting at the library at four.', es: 'Quedamos en la biblioteca a las cuatro.', episodio: 18 },
    { tipo: 'sustantivo' }),

  en('en-a1-267', 'team', 'equipo', 'sustantivo', 'team',
    [c('the kitchen team', 'el equipo de cocina'), c('a good team', 'un buen equipo'), c('work in a team', 'trabajar en equipo')],
    {
      target: 'Ask the kitchen team about allergies before you choose.',
      es: 'Pregunta al equipo de cocina por las alergias antes de elegir.',
      lectura: 'en-a1-lunch-menu',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-268', 'talk', 'hablar', 'verbo', 'talk',
    [c('talk about school', 'hablar del colegio'), c('talk to the teacher', 'hablar con el profesor'), c('we talk every day', 'hablamos todos los días')],
    {
      target: 'A man is waiting at the counter, and two students are talking about school.',
      es: 'Un hombre espera en el mostrador y dos estudiantes hablan del colegio.',
      lectura: 'en-a1-my-morning-at-the-cafe',
    },
    { tipo: 'verbo' }),

  en('en-a1-269', 'check', 'revisar / comprobar', 'verbo', 'check',
    [c('check your ticket', 'revisa tu billete'), c('check the schedule', 'mirar el horario'), c('check before you go', 'compruébalo antes de ir')],
    {
      target: 'Please check your ticket before you walk downstairs.',
      es: 'Revisa tu billete antes de bajar las escaleras.',
      lectura: 'en-a1-train-platform-sign',
    },
    { tipo: 'verbo' }),

  en('en-a1-270', 'keep', 'guardar', 'verbo', 'keep',
    [c('keep it until Friday', 'guardarlo hasta el viernes'), c('keep your card', 'guarda tu carné'), c('keep the message', 'guardar el mensaje')],
    {
      target: 'You can keep the book until Friday.',
      es: 'Puedes quedarte el libro hasta el viernes.',
      motivo: FUERA_DE_NIVEL('keep', 'Su frase del aviso encadena primer condicional y «will».'),
    },
    { tipo: 'verbo' }),

  en('en-a1-271', 'owner', 'dueño / dueña', 'sustantivo', 'OW-ner',
    [c('the owner of the shop', 'el dueño del local'), c('the owner can collect it', 'el dueño puede recogerlo'), c('a new owner', 'un dueño nuevo')],
    {
      target: 'The owner can collect it from the school office before four o’clock today.',
      es: 'El dueño puede recogerlo en la secretaría del colegio antes de las cuatro.',
      lectura: 'en-a1-lost-and-found-message',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-272', 'collect', 'recoger', 'verbo', 'col-LECT',
    [c('collect the book', 'recoger el libro'), c('collect it after school', 'recogerlo después del colegio'), c('collect paper', 'recoger papel')],
    {
      target: 'You can collect it after school today.',
      es: 'Puedes recogerlo hoy después del colegio.',
      lectura: 'en-a1-library-book-message',
    },
    { tipo: 'verbo' }),

  en('en-a1-273', 'free', 'libre / gratis', 'adjetivo', 'free',
    [c('I’m free in the afternoon', 'por la tarde estoy libre'), c('free for children', 'gratis para niños'), c('a free class', 'una clase gratis')],
    {
      target: 'The first class is free for students.',
      es: 'La primera clase es gratis para los estudiantes.',
      motivo: SIN_AULA('free', 'Sí se dice en el episodio 18, pero esa frase ya enseña «morning» y «afternoon».'),
    },
    { tipo: 'otro' }),
]

// ─── Unidad 3 · El dinero y los recados ───────────────────────────────────────

const b9unidad3: VocabEntry[] = [
  en('en-a1-274', 'money', 'dinero', 'sustantivo', 'MO-ney',
    [c('money for the coffee', 'dinero para el café'), c('I haven’t got money', 'no tengo dinero'), c('a lot of money', 'mucho dinero')],
    { target: 'I’ve got money for the coffee.', es: 'Yo tengo dinero para el café.', episodio: 11 },
    { tipo: 'sustantivo' }),

  en('en-a1-275', 'cost', 'costar', 'verbo', 'cost',
    [c('how much does it cost?', '¿cuánto cuesta?'), c('it costs two pounds', 'cuesta dos libras'), c('costs a lot', 'cuesta mucho')],
    {
      target: 'A ticket costs two pounds.',
      es: 'Un billete cuesta dos libras.',
      lectura: 'en-a1-saturday-bus-guide',
    },
    { tipo: 'verbo' }),

  en('en-a1-276', 'pay', 'pagar', 'verbo', 'pay',
    [c('pay for the ticket', 'pagar el billete'), c('pay at the counter', 'pagar en el mostrador'), c('pay every month', 'pagar todos los meses')],
    {
      target: 'I pay for the coffee every morning.',
      es: 'Pago el café todas las mañanas.',
      motivo: SIN_AULA('pay', 'Hay una compra entera en el episodio 11 y nadie paga.'),
    },
    { tipo: 'verbo' }),

  en('en-a1-277', 'buy', 'comprar', 'verbo', 'buy',
    [c('buy bread', 'comprar pan'), c('buy a ticket', 'comprar un billete'), c('buy clothes', 'comprar ropa')],
    {
      target: 'We buy bread and milk on Saturdays.',
      es: 'Compramos pan y leche los sábados.',
      motivo: SIN_AULA('buy', 'La lista de la compra del episodio 11 se hace sin decir «comprar».'),
    },
    { tipo: 'verbo' }),

  en('en-a1-278', 'price', 'precio', 'sustantivo', 'price',
    [c('a good price', 'un buen precio'), c('the price of the class', 'el precio de la clase'), c('ask the price', 'preguntar el precio')],
    {
      target: 'The price is on the blue card.',
      es: 'El precio está en la tarjeta azul.',
      motivo: SIN_AULA('price', 'Sin ella no se puede preguntar cuánto cuesta nada.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-279', 'cheap', 'barato', 'adjetivo', 'cheap',
    [c('a cheap ticket', 'un billete barato'), c('cheap food', 'comida barata'), c('very cheap', 'muy barato')],
    {
      target: 'The bus is cheap. The train is not.',
      es: 'El autobús es barato. El tren no.',
      motivo: SIN_AULA('cheap', 'Es la mitad de la pareja con la que se compara cualquier precio.'),
    },
    { tipo: 'otro' }),

  en('en-a1-280', 'expensive', 'caro', 'adjetivo', 'ex-PEN-sive',
    [c('an expensive jacket', 'una chaqueta cara'), c('very expensive', 'muy caro'), c('too expensive for me', 'demasiado caro para mí')],
    {
      target: 'This jacket is expensive. I want the black one.',
      es: 'Esta chaqueta es cara. Quiero la negra.',
      motivo: SIN_AULA('expensive', 'La otra mitad de «cheap».'),
    },
    { tipo: 'otro' }),

  en('en-a1-281', 'text', 'mandar un mensaje', 'verbo', 'text',
    [c('text her before Friday', 'mándale un mensaje antes del viernes'), c('text a friend', 'escribir a un amigo'), c('text me tomorrow', 'mándame un mensaje mañana')],
    {
      target: 'Please text her before Friday to say if you can come.',
      es: 'Mándale un mensaje antes del viernes para decirle si puedes venir.',
      lectura: 'en-a1-birthday-party-invite',
    },
    { tipo: 'verbo' }),

  en('en-a1-282', 'game', 'juego', 'sustantivo', 'game',
    [c('a small game', 'un juego pequeño'), c('play a game', 'jugar a un juego'), c('a game for children', 'un juego para niños')],
    {
      target: 'You can bring a small game if you like.',
      es: 'Puedes traer un juego pequeño si quieres.',
      lectura: 'en-a1-birthday-party-invite',
    },
    { tipo: 'sustantivo' }),

  en('en-a1-283', 'adult', 'adulto', 'sustantivo', 'A-dult',
    [c('come with an adult', 'venir con un adulto'), c('adults and children', 'adultos y niños'), c('classes for adults', 'clases para adultos')],
    {
      target: 'Children can come with an adult.',
      es: 'Los niños pueden venir con un adulto.',
      motivo: FUERA_DE_NIVEL('adult', 'Su frase del cartel usa «must», que A1 no enseña; el nivel sí tiene «can».'),
    },
    { tipo: 'sustantivo' }),
]

// ═══ BLOQUE 10 · Cortesía y supervivencia ═════════════════════════════════════
//
// El bloque que no existe en ningún otro idioma del sitio, y el que de verdad permite
// sobrevivir a una conversación: saludar, pedir, disculparse y —sobre todo— decir que no se
// ha entendido.
//
// Quince salen del material y quince van redactadas, y el corte es revelador: **las palabras
// que unen frases sí están** («but», «because», «if», «why», «what», «who», «when», «very»,
// «too», «enough», «of course», «really»), porque los personajes conversan de verdad. **Las
// fórmulas de cortesía no**: en veinte episodios nadie dice «thank you», ni «sorry», ni
// «goodbye», ni «I don’t understand». Es lo normal en una serie —los guiones cortan el
// relleno social— y es justo lo que un estudiante necesita el primer día.
//
// «excuse me» se quedó fuera: el Oxford 3000 sitúa «excuse» en B2. Su función la cubren
// «sorry» y «please».

const SIN_CORTESIA = (palabra: string, papel: string) =>
  `«${palabra}» no aparece en el material de inglés A1: en veinte episodios nadie usa las ` +
  `fórmulas de cortesía, porque un guion corta el relleno social. ${papel} Frase redactada ` +
  `con la gramática del nivel y marcada para volver a enlazarla si el corpus la cubre.`

// ─── Unidad 1 · Saludar y ser amable ──────────────────────────────────────────

const b10unidad1: VocabEntry[] = [
  en('en-a1-284', 'hello', 'hola', 'expresion', 'hel-LO',
    [c('hello, my name is…', 'hola, me llamo…'), c('say hello to your sister', 'salúdame a tu hermana'), c('hello and goodbye', 'hola y adiós')],
    {
      target: 'Hello, I am the new student.',
      es: 'Hola, soy el estudiante nuevo.',
      motivo: SIN_CORTESIA('hello', 'Sí se dice en el episodio 1, pero esa frase ya enseña «name» y «year».'),
    },
    { tipo: 'otro' }, 'neutro'),

  en('en-a1-285', 'hi', 'hola (informal)', 'expresion', 'hi',
    [c('hi, are you new here?', 'hola, ¿eres nuevo aquí?'), c('hi Leo', 'hola, Leo'), c('say hi to Ana', 'saluda a Ana')],
    { target: 'Hi! Are you new here? I’m Leo.', es: '¡Hola! ¿Eres nueva aquí? Soy Leo.', episodio: 1 },
    { tipo: 'otro' }, 'informal'),

  en('en-a1-286', 'please', 'por favor', 'expresion', 'please',
    [c('bring your card, please', 'trae tu carné, por favor'), c('coffee, please', 'un café, por favor'), c('please write your name', 'escribe tu nombre, por favor')],
    {
      target: 'Please bring your student card.',
      es: 'Trae tu carné de estudiante, por favor.',
      lectura: 'en-a1-library-book-message',
    },
    { tipo: 'otro' }),

  en('en-a1-287', 'thanks', 'gracias', 'expresion', 'thanks',
    [c('thanks a lot', 'muchas gracias'), c('thanks for the coffee', 'gracias por el café'), c('no, thanks', 'no, gracias')],
    {
      target: 'Thanks for the bread, Grandpa.',
      es: 'Gracias por el pan, abuelo.',
      motivo: SIN_CORTESIA('thanks', 'Es la primera palabra que aprende cualquiera en cualquier idioma.'),
    },
    { tipo: 'otro' }),

  en('en-a1-288', 'sorry', 'perdón / lo siento', 'expresion', 'SOR-ry',
    [c('sorry, I don’t understand', 'perdón, no entiendo'), c('I’m sorry', 'lo siento'), c('sorry, I’m late', 'perdón, llego tarde')],
    {
      target: 'Sorry, I am late for class today.',
      es: 'Perdón, hoy llego tarde a clase.',
      motivo: SIN_CORTESIA('sorry', 'Cubre también la función de «excuse me», que el Oxford 3000 sitúa en B2.'),
    },
    { tipo: 'otro' }),

  en('en-a1-289', 'goodbye', 'adiós', 'expresion', 'good-BYE',
    [c('goodbye, see you tomorrow', 'adiós, hasta mañana'), c('say goodbye', 'despedirse'), c('goodbye for now', 'adiós de momento')],
    {
      target: 'Goodbye, Leo. See you on Monday.',
      es: 'Adiós, Leo. Nos vemos el lunes.',
      motivo: SIN_CORTESIA('goodbye', 'Ninguno de los veinte episodios termina con una despedida.'),
    },
    { tipo: 'otro' }),

  en('en-a1-290', 'welcome', 'bienvenido / de nada (you’re welcome)', 'expresion', 'WEL-come',
    [c('welcome to the shop', 'bienvenido al local'), c('you’re welcome', 'de nada'), c('welcome home', 'bienvenido a casa')],
    {
      target: 'Welcome to the school, Maya.',
      es: 'Bienvenida al colegio, Maya.',
      motivo: SIN_CORTESIA('welcome', 'Sirve para recibir y, en «you’re welcome», para responder a las gracias.'),
    },
    { tipo: 'otro' }),

  en('en-a1-291', 'yes', 'sí', 'expresion', 'yes',
    [c('yes, of course', 'sí, claro'), c('yes, please', 'sí, por favor'), c('yes, I can', 'sí, puedo')],
    { target: 'Yes, but we hardly ever play in winter.', es: 'Sí, pero casi nunca jugamos en invierno.', episodio: 8 },
    { tipo: 'otro' }),

  en('en-a1-292', 'no', 'no (respuesta negativa)', 'expresion', 'no',
    [c('no, thanks', 'no, gracias'), c('no, I can’t', 'no, no puedo'), c('no problem', 'no hay problema')],
    {
      target: 'No, thanks. I am not hungry today.',
      es: 'No, gracias. Hoy no tengo hambre.',
      motivo: SIN_CORTESIA('no', 'Aparece dentro de frases pero nunca sola, que es como se contesta.'),
    },
    { tipo: 'otro' }),

  /**
   * «excuse me» entra, y el lema es `excuse` a propósito.
   *
   * La primera versión lo dejó fuera porque el Oxford 3000 sitúa `excuse` en B2 y «su función
   * la cubren sorry y please». La auditoría pedagógica lo discutió y tiene razón: `sorry`
   * sirve para disculparse, no para **abordar a un desconocido**, que es la función de
   * supervivencia número uno de quien viaja. Como chunk, «excuse me» es A1 en cualquier
   * programa; la banda B2 la lleva el verbo suelto, que aquí no se enseña.
   *
   * El lema es la palabra y no el chunk de dos porque el motor ahueca por token: con «excuse
   * me» como lema, la caja 4 no encontraría la palabra en su frase y degradaría a la caja 3.
   * La ficha enseña la fórmula entera en la glosa y en las colocaciones.
   */
  en('en-a1-337', 'excuse', 'disculpe (excuse me)', 'expresion', 'ex-CUSE',
    [c('excuse me, where is…?', 'disculpe, ¿dónde está…?'), c('excuse me, please', 'disculpe, por favor'), c('excuse me, are you Leo?', 'disculpe, ¿es usted Leo?')],
    {
      target: 'Excuse me, where is the station?',
      es: 'Disculpe, ¿dónde está la estación?',
      motivo: SIN_CORTESIA('excuse', 'Es la fórmula con la que se para a alguien en la calle, y sin ella no se puede preguntar una dirección a un desconocido.'),
    },
    { tipo: 'otro' }, 'formal'),

  en('en-a1-293', 'sure', 'claro / vale', 'expresion', 'sure',
    [c('sure, no problem', 'claro, sin problema'), c('are you sure?', '¿seguro?'), c('sure, I can help', 'claro, puedo ayudar')],
    {
      target: 'Sure, I can help you tomorrow.',
      es: 'Claro, te puedo ayudar mañana.',
      motivo: SIN_CORTESIA('sure', 'Es la manera normal de decir que sí sin decir «yes».'),
    },
    { tipo: 'otro' }, 'informal'),
]

// ─── Unidad 2 · Cuando no entiendo ────────────────────────────────────────────

const b10unidad2: VocabEntry[] = [
  en('en-a1-294', 'understand', 'entender', 'verbo', 'un-der-STAND',
    [c('I don’t understand', 'no entiendo'), c('do you understand?', '¿entiendes?'), c('understand the question', 'entender la pregunta')],
    {
      target: 'Sorry, I don’t understand the question.',
      es: 'Perdón, no entiendo la pregunta.',
      motivo: SIN_CORTESIA('understand', 'Es la frase que salva una conversación entera, y no está en ningún episodio.'),
    },
    { tipo: 'verbo' }),

  en('en-a1-295', 'repeat', 'repetir', 'verbo', 're-PEAT',
    [c('can you repeat, please?', '¿puedes repetir, por favor?'), c('repeat the word', 'repite la palabra'), c('repeat it slowly', 'repítelo despacio')],
    {
      target: 'Can you repeat that, please?',
      es: '¿Puedes repetirlo, por favor?',
      motivo: SIN_CORTESIA('repeat', 'Va con «understand»: primero se dice que no se entiende, después se pide que lo repitan.'),
    },
    { tipo: 'verbo' }),

  en('en-a1-296', 'speak', 'hablar (un idioma)', 'verbo', 'speak',
    [c('speak English', 'hablar inglés'), c('speak slowly, please', 'habla despacio, por favor'), c('I speak a little', 'hablo un poco')],
    {
      target: 'I speak a little English.',
      es: 'Hablo un poco de inglés.',
      motivo: SIN_CORTESIA('speak', 'El nivel enseña «talk» —charlar— pero no «speak», que es el de los idiomas.'),
    },
    { tipo: 'verbo' }),

  en('en-a1-297', 'mean', 'significar', 'verbo', 'mean',
    [c('what does it mean?', '¿qué significa?'), c('I mean the blue one', 'me refiero al azul'), c('what do you mean?', '¿qué quieres decir?')],
    {
      target: 'What does this word mean?',
      es: '¿Qué significa esta palabra?',
      motivo: SIN_CORTESIA('mean', 'Es la pregunta con la que se sale de cualquier palabra desconocida.'),
    },
    { tipo: 'verbo' }),

  en('en-a1-298', 'help', 'ayudar / ayuda', 'verbo', 'help',
    [c('can you help me?', '¿me puedes ayudar?'), c('help with the bags', 'ayudar con las bolsas'), c('I need help', 'necesito ayuda')],
    {
      target: 'Can you help me, please?',
      es: '¿Me puedes ayudar, por favor?',
      motivo: SIN_CORTESIA('help', 'Nadie pide ayuda en los veinte episodios.'),
    },
    { tipo: 'verbo' }),

  en('en-a1-299', 'maybe', 'quizá / a lo mejor', 'adverbio', 'MAY-be',
    [c('maybe tomorrow', 'quizá mañana'), c('maybe not', 'a lo mejor no'), c('maybe on Sunday', 'quizá el domingo')],
    {
      target: 'Maybe I can come on Sunday.',
      es: 'A lo mejor puedo venir el domingo.',
      motivo: SIN_CORTESIA('maybe', 'Sirve para no comprometerse, que en A1 hace falta a diario.'),
    },
    { tipo: 'otro' }),

  en('en-a1-300', 'course', 'claro (of course)', 'expresion', 'course',
    [c('of course', 'claro'), c('of course I can', 'claro que puedo'), c('yes, of course', 'sí, por supuesto')],
    { target: 'Of course. It’s always the banana cake.', es: 'Claro. Siempre es el pastel de banano.', episodio: 11 },
    { tipo: 'otro' }),

  en('en-a1-301', 'really', '¿de verdad? / realmente', 'adverbio', 'REAL-ly',
    [c('really? I don’t believe it', '¿de verdad? no me lo creo'), c('really good', 'muy bueno'), c('do you really work here?', '¿de verdad trabajas aquí?')],
    { target: 'Really? And your parents?', es: '¿En serio? ¿Y tus padres?', episodio: 2 },
    { tipo: 'otro' }),

  en('en-a1-302', 'too', 'también / demasiado', 'adverbio', 'too',
    [c('me too', 'yo también'), c('too expensive', 'demasiado caro'), c('my cat too', 'mi gato también')],
    { target: 'My sister is a waitress too. She’s at the bakery.', es: 'Mi hermana también es camarera. Está en la panadería.', episodio: 1 },
    { tipo: 'otro' }),

  en('en-a1-303', 'very', 'muy', 'adverbio', 'VE-ry',
    [c('very good', 'muy bueno'), c('very little coffee', 'muy poco café'), c('very tired', 'muy cansado')],
    { target: 'We haven’t got any eggs. And we’ve got very little coffee.', es: 'No nos quedan huevos. Y tenemos muy poco café.', episodio: 11 },
    { tipo: 'otro' }),
]

// ─── Unidad 3 · Las palabras que unen ─────────────────────────────────────────

const b10unidad3: VocabEntry[] = [
  en('en-a1-304', 'but', 'pero', 'conector', 'but',
    [c('cheap but good', 'barato pero bueno'), c('yes, but not today', 'sí, pero hoy no'), c('small but nice', 'pequeño pero bonito')],
    { target: 'Yes, but we hardly ever play in winter.', es: 'Sí, pero casi nunca jugamos en invierno.', episodio: 8 },
    { tipo: 'otro' }),

  en('en-a1-305', 'because', 'porque', 'conector', 'be-CAUSE',
    [c('because there is little shade', 'porque hay poca sombra'), c('because I am tired', 'porque estoy cansado'), c('why? because…', '¿por qué? porque…')],
    {
      target: 'Please arrive at eleven and bring a hat because there is little shade.',
      es: 'Llega a las once y trae un sombrero, porque hay poca sombra.',
      lectura: 'en-a1-birthday-party-invite',
    },
    { tipo: 'otro' }),

  en('en-a1-306', 'if', 'si (condición)', 'conector', 'if',
    [c('if it rains', 'si llueve'), c('if you like', 'si quieres'), c('if you need help', 'si necesitas ayuda')],
    {
      target: 'Bring gloves if you have them.',
      es: 'Trae guantes si tienes.',
      lectura: 'en-a1-park-cleanup-poster',
    },
    { tipo: 'otro' }),

  en('en-a1-307', 'why', 'por qué', 'adverbio', 'why',
    [c('why not?', '¿por qué no?'), c('that’s why', 'por eso'), c('why do you work here?', '¿por qué trabajas aquí?')],
    { target: 'You live next to the school. That’s why.', es: 'Vives al lado del colegio. Por eso.', episodio: 6 },
    { tipo: 'otro' }),

  en('en-a1-308', 'what', 'qué', 'pronombre', 'what',
    [c('what’s your name?', '¿cómo te llamas?'), c('what time is it?', '¿qué hora es?'), c('what do you want?', '¿qué quieres?')],
    { target: 'What’s on the shelves?', es: '¿Qué hay en los estantes?', episodio: 3 },
    { tipo: 'otro' }),

  en('en-a1-309', 'who', 'quién', 'pronombre', 'who',
    [c('who is that?', '¿quién es ese?'), c('who is coming?', '¿quién viene?'), c('who works here?', '¿quién trabaja aquí?')],
    { target: 'Who is the man with the hat?', es: '¿Quién es el hombre del sombrero?', episodio: 2 },
    { tipo: 'otro' }),

  en('en-a1-310', 'when', 'cuándo', 'adverbio', 'when',
    // Nada de «when do you leave?»: es el ejemplo entero y deja la caja 5 sin salida.
    [c('when is the class?', '¿cuándo es la clase?'), c('when you arrive', 'cuando llegues'), c('when does it start?', '¿cuándo empieza?')],
    { target: 'When do you leave?', es: '¿Cuándo sales?', episodio: 6 },
    { tipo: 'otro' }),

  en('en-a1-311', 'how', 'cómo', 'adverbio', 'how',
    [c('how are you?', '¿cómo estás?'), c('how much is it?', '¿cuánto es?'), c('how do you say it?', '¿cómo se dice?')],
    {
      target: 'How do you say this word in English?',
      es: '¿Cómo se dice esta palabra en inglés?',
      motivo: SIN_CORTESIA('how', 'Sí aparece en «How do I get to the library?», pero esa frase ya enseña «library» y «get».'),
    },
    { tipo: 'otro' }),

  en('en-a1-312', 'little', 'poco', 'adjetivo', 'LIT-tle',
    [c('very little coffee', 'muy poco café'), c('a little English', 'un poco de inglés'), c('little shade', 'poca sombra')],
    {
      target: 'There is a little bread at home.',
      es: 'Hay un poco de pan en casa.',
      motivo: SIN_CORTESIA('little', 'Sus dos frases del material ya estaban ocupadas por «coffee» y por «hat».'),
    },
    { tipo: 'otro' }),

  en('en-a1-313', 'enough', 'suficiente / basta', 'adjetivo', 'e-NOUGH',
    [c('that’s enough for me', 'con eso me basta'), c('enough money', 'dinero suficiente'), c('two hours is enough', 'con dos horas basta')],
    { target: 'They’re comfortable. That’s enough for me.', es: 'Son cómodos. Con eso me basta.', episodio: 13 },
    { tipo: 'otro' }),
]

// ═══ BLOQUE 2 · Unidades 4 y 5 — los números que faltaban ═════════════════════
//
// Las escribe la auditoría pedagógica del 9 de agosto de 2026, que encontró lo que nadie
// había mirado: **un bloque llamado «Números, hora y calendario» sin un solo numeral**.
// Tenía `number` —la palabra «número»— y ningún número. En las 310 entradas del nivel no
// había forma de decir cuántos años tienes, tu teléfono ni cuánto cuesta algo.
//
// El corpus los tenía todos, y de sobra: las horas de la serie, los precios de la guía del
// autobús, los muebles de la casa. No hicieron falta ejemplos redactados para el uno al diez.
// Lo que sí falta en el material son los cuantificadores —`some`, `all`, `only`— y `month`,
// que se escriben a mano y quedan marcados.
//
// Faltaba también `month`: el bloque tenía dos meses, los que dice la serie, y ninguna palabra
// para «mes». Un estudiante no podía decir su cumpleaños.

// ─── Unidad 4 · Del uno al diez ───────────────────────────────────────────────

const b2unidad4: VocabEntry[] = [
  en('en-a1-314', 'one', 'uno', 'numero', 'one',
    [c('one very old table', 'una mesa muy vieja'), c('one of my friends', 'uno de mis amigos'), c('every one', 'cada uno')],
    { target: 'Those tiles are from 1971. I know every one.', es: 'Esas baldosas son de 1971. Me sé cada una.', episodio: 20 },
    { tipo: 'otro' }),

  en('en-a1-315', 'two', 'dos', 'numero', 'two',
    [c('two hours', 'dos horas'), c('two minutes', 'dos minutos'), c('two pounds', 'dos libras')],
    { target: 'Two hours is enough for bread.', es: 'Dos horas bastan para el pan.', episodio: 17 },
    { tipo: 'otro' }),

  en('en-a1-316', 'three', 'tres', 'numero', 'three',
    [c('three rooms', 'tres habitaciones'), c('three choices', 'tres opciones'), c('he’s three', 'tiene tres años')],
    { target: 'He’s three. He runs in the park every morning.', es: 'Tres. Corre en el parque cada mañana.', episodio: 15 },
    { tipo: 'otro' }),

  en('en-a1-317', 'four', 'cuatro', 'numero', 'four',
    [c('at four', 'a las cuatro'), c('four chairs', 'cuatro sillas'), c('before four o’clock', 'antes de las cuatro')],
    { target: 'We’re meeting at the library at four.', es: 'Quedamos en la biblioteca a las cuatro.', episodio: 18 },
    { tipo: 'otro' }),

  en('en-a1-318', 'five', 'cinco', 'numero', 'five',
    [c('at five', 'a las cinco'), c('five minutes', 'cinco minutos'), c('before five', 'antes de las cinco')],
    { target: 'Five! Do you miss it?', es: '¡Las cinco! ¿La echas de menos?', episodio: 9 },
    { tipo: 'otro' }),

  en('en-a1-319', 'six', 'seis', 'numero', 'six',
    [c('at six', 'a las seis'), c('six o’clock', 'las seis en punto'), c('six in the evening', 'las seis de la tarde')],
    { target: 'I get up at six. I make coffee first.', es: 'Me levanto a las seis. Primero hago café.', episodio: 6 },
    { tipo: 'otro' }),

  en('en-a1-320', 'seven', 'siete', 'numero', 'SEV-en',
    [c('at seven', 'a las siete'), c('half past seven', 'las siete y media'), c('seven thirty', 'las siete y media')],
    { target: 'I eat bread and fruit at seven.', es: 'Como pan y fruta a las siete.', episodio: 6 },
    { tipo: 'otro' }),

  en('en-a1-321', 'eight', 'ocho', 'numero', 'eight',
    [c('at eight', 'a las ocho'), c('eight hours', 'ocho horas'), c('eight o’clock', 'las ocho en punto')],
    { target: 'I get up at eight. I never walk.', es: 'Yo me levanto a las ocho. Nunca voy andando.', episodio: 6 },
    { tipo: 'otro' }),

  en('en-a1-322', 'nine', 'nueve', 'numero', 'nine',
    [c('at nine', 'a las nueve'), c('the number nine bus', 'el autobús número nueve'), c('nine o’clock', 'las nueve en punto')],
    { target: 'On Monday morning, at nine o’clock.', es: 'El lunes por la mañana, a las nueve.', episodio: 10 },
    { tipo: 'otro' }),

  en('en-a1-323', 'ten', 'diez', 'numero', 'ten',
    [c('at ten', 'a las diez'), c('ten o’clock', 'las diez en punto'), c('ten minutes', 'diez minutos')],
    {
      target: 'We meet beside the playground at ten o’clock.',
      es: 'Nos vemos al lado del parque infantil a las diez.',
      lectura: 'en-a1-park-cleanup-poster',
    },
    { tipo: 'otro' }),
]

// ─── Unidad 5 · Cuántos, cuánto y el mes ──────────────────────────────────────

const b2unidad5: VocabEntry[] = [
  en('en-a1-324', 'twenty', 'veinte', 'numero', 'TWEN-ty',
    [c('twenty years old', 'veinte años'), c('ten twenty', 'las diez y veinte'), c('twenty minutes', 'veinte minutos')],
    {
      target: 'The train arrives at ten twenty and leaves at ten thirty.',
      es: 'El tren llega a las diez y veinte y sale a las diez y media.',
      lectura: 'en-a1-train-platform-sign',
    },
    { tipo: 'otro' }),

  en('en-a1-325', 'thirty', 'treinta', 'numero', 'THIR-ty',
    [c('every thirty minutes', 'cada treinta minutos'), c('seven thirty', 'las siete y media'), c('thirty students', 'treinta estudiantes')],
    {
      target: 'The train arrives at ten twenty and leaves at ten thirty.',
      es: 'El tren llega a las diez y veinte y sale a las diez y media.',
      lectura: 'en-a1-train-platform-sign',
    },
    { tipo: 'otro' }),

  en('en-a1-326', 'hundred', 'cien', 'numero', 'HUN-dred',
    [c('a hundred pounds', 'cien libras'), c('two hundred people', 'doscientas personas'), c('a hundred years', 'cien años')],
    {
      target: 'The books cost a hundred pounds.',
      es: 'Los libros cuestan cien libras.',
      motivo: NO_SIRVE('hundred', 'no aparece en el material: la serie no dice ningún precio de tres cifras. Sin ella no se puede hablar de dinero por encima de las decenas.'),
    },
    { tipo: 'otro' }),

  en('en-a1-327', 'month', 'mes', 'sustantivo', 'month',
    [c('this month', 'este mes'), c('every month', 'todos los meses'), c('three months', 'tres meses')],
    {
      target: 'My birthday is in this month.',
      es: 'Mi cumpleaños es este mes.',
      motivo: NO_SIRVE('month', 'no aparece en el material, que solo nombra noviembre y diciembre. Sin «month» el estudiante no puede decir su cumpleaños ni la duración de un curso.'),
    },
    { tipo: 'sustantivo' }),

  en('en-a1-328', 'many', 'muchos', 'adjetivo', 'MAN-y',
    [c('many chairs', 'muchas sillas'), c('how many?', '¿cuántos?'), c('many people', 'mucha gente')],
    { target: 'Are there many chairs in the kitchen?', es: '¿Hay muchas sillas en la cocina?', episodio: 4 },
    { tipo: 'otro' }),

  en('en-a1-329', 'any', 'algún / ningún', 'adjetivo', 'AN-y',
    [c('any shelves', 'algún estante'), c('we haven’t got any', 'no nos queda ninguno'), c('any questions?', '¿alguna pregunta?')],
    { target: 'Are there any shelves?', es: '¿Hay estantes?', episodio: 3 },
    { tipo: 'otro' }),

  en('en-a1-330', 'about', 'sobre / acerca de', 'preposicion', 'a-BOUT',
    [c('talk about school', 'hablar del colegio'), c('ask about the price', 'preguntar por el precio'), c('a book about Colombia', 'un libro sobre Colombia')],
    { target: 'She loves it. She talks about her students every day.', es: 'Le encanta. Habla de sus alumnos todos los días.', episodio: 7 },
    { tipo: 'otro' }),

  en('en-a1-331', 'some', 'algunos / algo de', 'adjetivo', 'some',
    [c('some bread', 'algo de pan'), c('some friends', 'algunos amigos'), c('some of them', 'algunos de ellos')],
    {
      target: 'There are some eggs in the kitchen.',
      es: 'Hay algunos huevos en la cocina.',
      motivo: NO_SIRVE('some', 'no aparece suelta en el material: los positivos de la búsqueda eran «sometimes». Es la mitad de la pareja «some / any», que un A1 necesita para pedir cualquier cosa.'),
    },
    { tipo: 'otro' }),

  en('en-a1-332', 'all', 'todo / todos', 'adjetivo', 'all',
    [c('all day', 'todo el día'), c('all my friends', 'todos mis amigos'), c('that’s all', 'eso es todo')],
    {
      target: 'I work all day on Saturday.',
      es: 'Trabajo todo el sábado.',
      motivo: NO_SIRVE('all', 'no aparece en el material: los positivos eran «really» y «small».'),
    },
    { tipo: 'otro' }),

  en('en-a1-333', 'only', 'solo / solamente', 'adverbio', 'ON-ly',
    [c('only two', 'solo dos'), c('only on Sundays', 'solo los domingos'), c('I only want water', 'solo quiero agua')],
    {
      target: 'I only work on Saturdays.',
      es: 'Solo trabajo los sábados.',
      motivo: NO_SIRVE('only', 'no aparece en ningún turno ni lectura, y sin ella no se puede acotar nada.'),
    },
    { tipo: 'otro' }),
]

/**
 * El bloque 10, reordenado para que no choquen entre sí.
 *
 * `unidadesDe` corta el bloque en unidades de diez, así que el orden de este array decide qué
 * palabras se estudian el mismo día. Tal y como estaban escritas, la última unidad juntaba
 * `because` («porque») con `why` («por qué») y encima cinco monosílabos con w- —why, what,
 * who, when, how—, y la primera tenía `hello` y `hi`, las dos glosadas «hola». En la caja 3
 * el estudiante solo ve la glosa española: esos prompts son indistinguibles, y cada confusión
 * cuesta cuatro peldaños porque fallar devuelve la palabra a la caja 1. Lo encontró la
 * auditoría de usuario, no una métrica.
 *
 * Ahora las cinco w- van repartidas —dos, una y dos— y las parejas que se confunden viven en
 * unidades distintas. `reordenar` falla si alguien añade una entrada y se olvida de colocarla,
 * que es la manera de que esto no se pudra al siguiente cambio.
 */
const CORTESIA_SIN_CHOQUES = reordenar([...b10unidad1, ...b10unidad2, ...b10unidad3], [
  // Unidad 1 · saludar, pedir y ser amable
  'hello', 'please', 'thanks', 'sorry', 'goodbye', 'welcome', 'excuse', 'sure', 'what', 'how', 'little',
  // Unidad 2 · cuando no entiendo
  'hi', 'understand', 'repeat', 'speak', 'mean', 'help', 'maybe', 'why', 'too', 'enough',
  // Unidad 3 · responder y enlazar
  'yes', 'no', 'course', 'really', 'very', 'but', 'because', 'who', 'when', 'if',
])

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
      'Notas de bloque: del 4 se quedaron fuera «vegetable» y «salad» (solo viven en la frase ' +
      'del menú del comedor, que ya enseña dos palabras); del 6, «sunny» y «busy» por lo mismo; ' +
      'del 8, «stay». «money» y «list» salen del episodio 11 pero no son comida: van a los ' +
      'bloques de ciudad y de trabajo. ' +
      // ── Cruce completo, 9 ago 2026 ──────────────────────────────────────────
      'CRUCE COMPLETO contra el Oxford 3000 por nivel CEFR, 9 ago 2026, sobre las 220 entradas ' +
      'de los siete bloques escritos: 201 en banda A1 (91 %). Hasta esa fecha el cruce solo se ' +
      'había hecho sobre el bloque 1, y los bloques 4, 6, 7 y 8 llevaban anotadas sospechas ' +
      'que el cruce ha resuelto: de «menu», «order», «soup», «sandwich», «afternoon», ' +
      '«evening», «finish», «terrible» y «left» se temía que fueran A2 y las nueve son A1. ' +
      'CATORCE van una banda por encima y se mantienen todas, cada una porque sale de una ' +
      'lección A1 y el estudiante que la oye necesita entenderla: «shelf» (B1) y «lamp», ' +
      '«corner», «empty», «comfortable», «size», «inside», «church», «passenger», «platform», ' +
      '«straight», «cross», «sign» y «rest» (A2). Nombrar lo que hay en la escena es A1 aunque ' +
      'la palabra sea menos frecuente en general, y un cartel de andén no se puede leer sin ' +
      '«platform». CINCO no están en la lista en ningún nivel, y son tres casos distintos: ' +
      '(a) «waitress» y «o’clock», ausencias reales de la lista —recoge «waiter» y «clock» en ' +
      'A1— que se mantienen porque dejar fuera la forma femenina y la manera normal de decir ' +
      'la hora es un límite de la lista, no del nivel; (b) «scarf», ausencia real sin ' +
      'equivalente, que se mantiene porque es una de las seis prendas del episodio 13 y un ' +
      'bloque de ropa sin bufanda no cubre el invierno; (c) «shoes» y «café», que NO son ' +
      'ausencias: la lista recoge «shoe» y «cafe» en A1 y la diferencia es solo el plural y la ' +
      'tilde. Se dejan como están porque es la forma que se oye en la serie. ' +
      'La lista NO vive en el repo —tiene derechos— y se cruza pasándola con --lista. ' +
      // ── Nivel cerrado, 9 ago 2026 ───────────────────────────────────────────
      'NIVEL COMPLETO, 9 ago 2026: 310 entradas en diez bloques, 286 en banda A1 (92 %). Los ' +
      'bloques 5, 9 y 10 añaden cinco excepciones nuevas a las ya listadas. Cuatro van una ' +
      'banda por encima y se mantienen porque salen literalmente del material: «smell» (A2, ' +
      'episodio 9), «schedule» (A2, episodio 10), «owner» y «collect» (A2, avisos del colegio). ' +
      'La quinta, «windy», no está en la lista en ningún nivel —sí está «wind»— y se mantiene ' +
      'porque es como se dice el tiempo en el episodio 14, que es la lección de clima del ' +
      'nivel. Es el mismo caso que «waitress» frente a «waiter». ' +
      'La cobertura del nivel baja del 91 % al 78 % con estos tres bloques, y es a propósito: ' +
      'el bloque 5 lleva 22 ejemplos redactados y el 10 lleva 15, porque el material no trata ' +
      'ni el cuerpo ni las fórmulas de cortesía. Decisión del usuario del 9 ago 2026, con la ' +
      'condición de volver a enlazarlos cuando el corpus crezca. Se encuentran todos con ' +
      'grep -n "motivo:" sobre este archivo. ' +
      // ── Tras la auditoría pedagógica, 9 ago 2026 ────────────────────────────
      'AUDITORÍA PEDAGÓGICA, 9 ago 2026: el nivel pasa de 310 a 333 entradas. Lo que encontró ' +
      'y se corrigió: (1) el bloque «Números, hora y calendario» no tenía un solo numeral —solo ' +
      '«number», la palabra— así que se añaden dos unidades, «del uno al diez» (las diez del ' +
      'corpus, sin un redactado) y «cuántos, cuánto y el mes»; (2) faltaban «go», «month», ' +
      '«hurt» y «English», las cuatro imprescindibles y las cuatro ahora dentro; (3) diez ' +
      'ejemplos usaban gramática que A1 no enseña —pasiva en pasado, will, must, primer ' +
      'condicional— y ocho venían de los textos de lectura, no de lo escrito a mano: cuatro se ' +
      'cambiaron por otra frase del mismo material y seis van redactadas con el motivo escrito; ' +
      '(4) «ear», «nose», «leg» y «foot» se enseñaban sobre un perro, un gato, una mesa y un ' +
      'chunk de transporte, en un bloque de cuerpo humano. «hurt» y «English» entran sabiendo ' +
      'que van fuera de banda —A2 la primera, ausente de la lista la segunda, como los nombres ' +
      'de idioma— porque un bloque de salud sin «me duele» y un curso de inglés sin «English» ' +
      'no se sostienen. La cobertura baja al 75 %: es el precio de escribir los temas que el ' +
      'material no trata, y está contado, no disimulado. ' +
      'Cierre de los dos hallazgos menores, 9 ago 2026: entra «excuse», con la glosa «disculpe ' +
      '(excuse me)». El Oxford lo sitúa en B2 y la primera versión lo dejó fuera por eso; la ' +
      'auditoría lo discutió con razón, porque «sorry» sirve para disculparse y no para abordar ' +
      'a un desconocido, que es la función de supervivencia número uno de quien viaja. Como ' +
      'chunk, «excuse me» es A1 en cualquier programa: la banda B2 la lleva el verbo suelto, ' +
      'que aquí no se enseña. Y se rompió el molde de los redactados del bloque de cuerpo: ' +
      'cinco frases decían «X is tired after Y» y cuatro «X is cold», así que en la caja 4 el ' +
      'hueco se rellenaba por memoria del patrón. Quedan una de cada.',
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
      entradas: [...b2unidad1, ...b2unidad2, ...b2unidad3, ...b2unidad4, ...b2unidad5],
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
    {
      id: 'rutina-diaria-y-acciones',
      nombre: 'Rutina diaria y acciones',
      icono: '🔁',
      entradas: [...b8unidad1, ...b8unidad2, ...b8unidad3],
    },
    {
      id: 'cuerpo-salud-y-sensaciones',
      nombre: 'Cuerpo, salud y sensaciones',
      icono: '🧍',
      entradas: [...b5unidad1, ...b5unidad2, ...b5unidad3],
    },
    {
      id: 'estudio-trabajo-y-dinero',
      nombre: 'Estudio, trabajo y dinero',
      icono: '💼',
      entradas: [...b9unidad1, ...b9unidad2, ...b9unidad3],
    },
    {
      id: 'cortesia-y-supervivencia',
      nombre: 'Cortesía y supervivencia',
      icono: '🙏',
      entradas: CORTESIA_SIN_CHOQUES,
    },
  ],
}
