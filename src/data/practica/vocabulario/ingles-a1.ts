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
      'femenina es un límite de la lista, no del nivel. La ficha enseña las dos formas.',
  },
  bloques: [
    {
      id: 'yo-y-mi-gente',
      nombre: 'Yo y mi gente',
      icono: '👋',
      entradas: [...unidad1, ...unidad2, ...unidad3, ...unidad4],
    },
  ],
}
