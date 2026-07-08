// Currículo de Gramática — Francés A1
// Cada tema es su propia URL indexable: /practica/frances/a1/gramatica/<slug>
// Profundidad de filólogo: explicación + sub-secciones + tablas + contraste
// español→francés + errores comunes de hispanohablantes + ejercicios.

import type { GrammarTopic } from './grammar-types';
import { findTopic, topicNav } from './grammar-types';
export { GRAMMAR_COLOR } from './grammar-types';
export type { GQItem, GrammarTopic } from './grammar-types';

export const TOPICS: GrammarTopic[] = [
  {
    slug: 'articulos-definidos-indefinidos',
    order: 1,
    title: 'Los artículos en francés: le, la, l’, les, un, une, des',
    shortTitle: 'Artículos (le/la/les · un/une/des)',
    icon: '📗',
    seoTitle: 'Artículos en francés (le, la, les, un, une, des): explicación y ejercicios | A1',
    seoDescription:
      'Los artículos definidos e indefinidos en francés: le, la, l’, les, un, une, des. Género, elisión (l’) y diferencias con el español. Tablas, ejemplos y ejercicios. Nivel A1.',
    keywords: ['artículos en francés', 'le la les un une des', 'artículos definidos francés', 'género en francés a1'],
    intro: [
      'En francés, como en español, los sustantivos tienen género (masculino o femenino) y el artículo concuerda con él. Los artículos definidos (el/la/los/las) son le (masc.), la (fem.), l’ (ante vocal o h muda) y les (plural). Los indefinidos (un/una/unos/unas) son un (masc.), une (fem.) y des (plural).',
      'Hay dos diferencias clave con el español. La primera: el francés usa "des" como artículo plural indefinido donde el español a menudo no pone nada ("Tengo amigos" → "J’ai des amis"). La segunda: ante vocal o h muda, le y la se transforman en l’ (l’ami, l’école, l’hôtel).',
      'La trampa más peligrosa es el género: NO siempre coincide con el español. "El problema" es masculino en los dos, pero "la leche" es femenino en español y "le lait" es masculino en francés. Hay que aprender cada sustantivo CON su artículo.',
    ],
    sections: [
      {
        heading: 'Definidos vs indefinidos',
        body: [
          'Usa los definidos (le, la, l’, les) para algo concreto, ya conocido o en sentido general: "le livre sur la table", "J’aime les chiens" (me gustan los perros, en general).',
          'Usa los indefinidos (un, une, des) para algo no específico o mencionado por primera vez: "un livre", "une voiture", "des amis".',
        ],
      },
      {
        heading: 'La elisión: le/la → l’',
        body: [
          'Cuando la palabra siguiente empieza por vocal (a, e, i, o, u) o por h muda, "le" y "la" se contraen en "l’": l’ami, l’eau, l’école, l’hôtel, l’homme.',
          'Es obligatorio y se escribe pegado con apóstrofo. Decir "le école" o "la eau" es un error claro.',
        ],
      },
      {
        heading: 'El género no siempre coincide con el español',
        body: [
          'Muchos sustantivos cambian de género respecto al español: le lait (la leche), la voiture (el carro/coche), le problème (el problema, ¡masculino aunque termine en -e!), la mer (el mar), le sel (la sal).',
          'Consejo de filólogo: nunca memorices el sustantivo solo; apréndelo siempre con su artículo (no "maison", sino "la maison").',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Artículos definidos e indefinidos',
        headers: ['', 'Masculino', 'Femenino', 'Ante vocal/h', 'Plural'],
        rows: [
          ['Definido (el/la)', 'le', 'la', 'l’', 'les'],
          ['Indefinido (un/una)', 'un', 'une', 'un/une', 'des'],
        ],
      },
      {
        caption: 'El género engaña (español ≠ francés)',
        headers: ['Español', 'Francés', 'Género en francés'],
        rows: [
          ['la leche', 'le lait', 'masculino'],
          ['el coche', 'la voiture', 'femenino'],
          ['el problema', 'le problème', 'masculino'],
          ['el mar', 'la mer', 'femenino'],
        ],
      },
    ],
    examples: [
      { en: 'J’ai un frère et une sœur.', es: 'Tengo un hermano y una hermana.' },
      { en: 'Le chat est sur la table.', es: 'El gato está sobre la mesa.' },
      { en: 'J’aime les chiens.', es: 'Me gustan los perros.', note: 'sentido general → artículo definido (les).' },
      { en: 'L’école est grande.', es: 'La escuela es grande.', note: 'élision: la → l’ ante vocal.' },
      { en: 'Il y a des voitures dans la rue.', es: 'Hay carros en la calle.', note: 'plural indefinido → des.' },
      { en: 'L’hôtel est moderne.', es: 'El hotel es moderno.', note: 'h muda → l’.' },
    ],
    contrast: [
      { es: 'el problema', en: 'le problème', note: 'masculino, aunque termine en -e.' },
      { es: 'la leche', en: 'le lait', note: 'en francés es masculino.' },
      { es: 'Tengo amigos.', en: 'J’ai des amis.', note: 'el francés obliga a poner "des" en el plural.' },
      { es: 'el hotel', en: 'l’hôtel', note: 'elisión ante h muda.' },
      { es: 'Me gusta la música.', en: 'J’aime la musique.', note: 'gusto general → artículo definido.' },
    ],
    commonMistakes: [
      { wrong: 'le école', right: 'l’école', note: 'Ante vocal, le/la → l’.' },
      { wrong: 'la problème', right: 'le problème', note: '"problème" es masculino en francés.' },
      { wrong: 'J’ai amis.', right: 'J’ai des amis.', note: 'El plural indefinido necesita "des".' },
      { wrong: 'le eau', right: 'l’eau', note: 'Elisión obligatoria ante vocal.' },
      { wrong: 'la voiture → "le voiture"', right: 'la voiture', note: '"voiture" es femenino.' },
    ],
    tip: 'Aprende cada sustantivo CON su artículo (la maison, le lait). Ante vocal o h muda, le/la → l’. Y el plural indefinido siempre lleva "des".',
    questions: [
      { s: 'J’ai ___ frère.', opts: ['un', 'une', 'le', 'des'], a: 0, fb: '"frère" masculino, 1.ª mención → "un frère".' },
      { s: 'Elle a ___ sœur.', opts: ['un', 'une', 'le', 'la'], a: 1, fb: '"sœur" femenino → "une sœur".' },
      { s: '___ chat est mignon.', opts: ['Le', 'La', 'L’', 'Les'], a: 0, fb: '"chat" masculino → "le chat".' },
      { s: '___ école est grande.', opts: ['Le', 'La', 'L’', 'Les'], a: 2, fb: '"école" empieza por vocal → "l’école".' },
      { s: 'J’ai ___ amis.', opts: ['des', 'les', 'un', 'de'], a: 0, fb: 'Plural indefinido → "des amis".' },
      { s: '___ livres sont sur la table.', opts: ['Le', 'La', 'Les', 'L’'], a: 2, fb: 'Plural definido → "les livres".' },
      { s: '___ hôtel est moderne.', opts: ['Le', 'La', 'L’', 'Les'], a: 2, fb: 'h muda → "l’hôtel".' },
      { s: 'J’aime ___ chiens. (en general)', opts: ['des', 'les', 'un', 'de'], a: 1, fb: 'Sentido general → artículo definido "les".' },
      { s: 'Je bois ___ eau.', opts: ['le', 'la', 'l’', 'les'], a: 2, fb: '"eau" empieza por vocal → "l’eau".' },
      { s: '___ problème est difficile.', opts: ['Le', 'La', 'L’', 'Les'], a: 0, fb: '"problème" es masculino → "le problème".' },
      { s: 'C’est ___ voiture rouge.', opts: ['un', 'une', 'le', 'des'], a: 1, fb: '"voiture" femenino → "une voiture".' },
      { s: '¿Cuál es CORRECTA?', opts: ['le école', 'l’école', 'la école'], a: 1, fb: 'Elisión ante vocal → "l’école".' },
      { s: '¿Cómo se dice "Tengo amigos"?', opts: ['J’ai amis.', 'J’ai des amis.', 'J’ai les amis.'], a: 1, fb: 'Plural indefinido → "des amis".' },
      { s: '¿Cuál es CORRECTA?', opts: ['la problème', 'le problème', 'l’problème'], a: 1, fb: '"problème" es masculino.' },
    ],
  },
  {
    slug: 'genero-numero-sustantivos',
    order: 2,
    title: 'El género y el número de los sustantivos en francés',
    shortTitle: 'Género y número de los nombres',
    icon: '⚥',
    seoTitle: 'Género y plural de los sustantivos en francés: reglas y ejercicios | A1',
    seoDescription:
      'Masculino y femenino y la formación del plural en francés (-s, -x, -aux). Terminaciones que ayudan a reconocer el género, ejemplos y ejercicios. Nivel A1.',
    keywords: ['género en francés', 'masculino femenino francés', 'plural en francés', 'sustantivos francés a1'],
    intro: [
      'Todo sustantivo francés es masculino o femenino, y muchas veces no se nota al oírlo: lo marca el artículo (le/la) y los adjetivos que lo acompañan. Por eso es tan importante aprender cada palabra con su artículo.',
      'Aunque no hay una regla perfecta, ciertas terminaciones suelen indicar el género. Suelen ser femeninas las palabras en -tion, -té, -ette, -ée (la nation, la liberté). Suelen ser masculinas las terminadas en -age, -ment, -eau (le voyage, le moment, le bureau).',
      'El plural normalmente añade una -s que NO se pronuncia (la maison → les maisons): el plural casi siempre se "oye" en el artículo (le → les) y no en el sustantivo. Hay excepciones de escritura que veremos abajo.',
    ],
    sections: [
      {
        heading: 'Pistas para reconocer el género',
        body: [
          'Femeninas frecuentes: -tion/-sion (la station), -té (la beauté), -ette (la baguette), -ée (la journée), -ence/-ance (la France, la science).',
          'Masculinas frecuentes: -age (le fromage), -ment (le gouvernement), -eau (le château), -isme (le tourisme). Son tendencias, no leyes: hay excepciones (le musée, la page).',
        ],
      },
      {
        heading: 'El plural de los nombres',
        body: [
          'Regla general: + s muda (un livre → des livres). Las palabras que ya terminan en -s, -x o -z no cambian (un fils → des fils, une voix → des voix).',
          'Casos especiales de escritura: -au/-eau/-eu → + x (un gâteau → des gâteaux, un cheveu → des cheveux); -al → -aux (un animal → des animaux, un journal → des journaux).',
        ],
      },
      {
        heading: 'El plural se oye en el artículo, no en el nombre',
        body: [
          'Como la -s del plural es muda, la diferencia singular/plural se percibe sobre todo en el artículo: "le livre" (singular) vs "les livres" (plural). Por eso pronunciar bien le/la/les es clave para que te entiendan.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Terminaciones y género (tendencias)',
        headers: ['Suelen ser femeninas', 'Suelen ser masculinas'],
        rows: [
          ['-tion: la nation', '-age: le fromage'],
          ['-té: la liberté', '-ment: le moment'],
          ['-ette: la baguette', '-eau: le bureau'],
          ['-ée: la journée', '-isme: le tourisme'],
        ],
      },
      {
        caption: 'Formación del plural',
        headers: ['Terminación', 'Regla', 'Ejemplo'],
        rows: [
          ['general', '+ s (muda)', 'un livre → des livres'],
          ['-s, -x, -z', 'no cambia', 'un fils → des fils'],
          ['-au, -eau, -eu', '+ x', 'un gâteau → des gâteaux'],
          ['-al', '→ -aux', 'un animal → des animaux'],
        ],
      },
    ],
    examples: [
      { en: 'la maison → les maisons', es: 'la casa → las casas', note: '-s muda; el plural se oye en "les".' },
      { en: 'un gâteau → des gâteaux', es: 'un pastel → unos pasteles', note: '-eau → -x.' },
      { en: 'un animal → des animaux', es: 'un animal → unos animales', note: '-al → -aux.' },
      { en: 'la liberté', es: 'la libertad', note: '-té → femenino.' },
      { en: 'le fromage', es: 'el queso', note: '-age → masculino.' },
      { en: 'un fils → des fils', es: 'un hijo → unos hijos', note: 'termina en -s: no cambia.' },
    ],
    contrast: [
      { es: 'los animales', en: 'les animaux', note: '-al → -aux.' },
      { es: 'las casas', en: 'les maisons', note: 'la -s es muda; el plural se oye en "les".' },
      { es: 'el viaje', en: 'le voyage', note: '-age → masculino.' },
      { es: 'la estación', en: 'la station', note: '-tion → femenino.' },
      { es: 'unos pasteles', en: 'des gâteaux', note: '-eau → -x.' },
    ],
    commonMistakes: [
      { wrong: 'des animals', right: 'des animaux', note: '-al → -aux.' },
      { wrong: 'des gâteaus', right: 'des gâteaux', note: '-eau → -x.' },
      { wrong: 'le station', right: 'la station', note: '-tion suele ser femenino.' },
      { wrong: 'des fils → "des filss"', right: 'des fils', note: 'Termina en -s: no cambia en plural.' },
      { wrong: 'la voyage', right: 'le voyage', note: '-age suele ser masculino.' },
    ],
    tip: 'La -s del plural es muda: el plural se oye en el artículo (le → les). Y memoriza: -al → -aux, -eau → -eaux. Aprende cada nombre con su artículo.',
    questions: [
      { s: 'Plural de "un livre": des ___.', opts: ['livres', 'livrs', 'livraux'], a: 0, fb: 'Regla general: + s → "livres".' },
      { s: 'Plural de "un animal": des ___.', opts: ['animals', 'animaux', 'animales'], a: 1, fb: '-al → -aux: "animaux".' },
      { s: 'Plural de "un gâteau": des ___.', opts: ['gâteaus', 'gâteaux', 'gâteauxs'], a: 1, fb: '-eau → -x: "gâteaux".' },
      { s: 'Plural de "un fils": des ___.', opts: ['fils', 'filss', 'fis'], a: 0, fb: 'Termina en -s: no cambia.' },
      { s: '"la nation" es...', opts: ['masculino', 'femenino'], a: 1, fb: '-tion → femenino.' },
      { s: '"le fromage" es...', opts: ['masculino', 'femenino'], a: 0, fb: '-age → masculino.' },
      { s: 'Artículo de "liberté": ___ liberté.', opts: ['le', 'la', 'l’'], a: 1, fb: '-té → femenino → "la liberté".' },
      { s: 'Artículo de "voyage": ___ voyage.', opts: ['le', 'la', 'les'], a: 0, fb: '-age → masculino → "le voyage".' },
      { s: 'Plural de "un journal": des ___.', opts: ['journals', 'journaux', 'journales'], a: 1, fb: '-al → -aux: "journaux".' },
      { s: 'Plural de "une voix": des ___.', opts: ['voix', 'voixs', 'vois'], a: 0, fb: 'Termina en -x: no cambia.' },
      { s: '¿Cuál es CORRECTA?', opts: ['des animals', 'des animaux', 'des animales'], a: 1, fb: '-al → -aux.' },
      { s: 'Artículo de "station": ___ station.', opts: ['le', 'la', 'l’'], a: 1, fb: '-tion → femenino → "la station".' },
      { s: '¿Cómo se dice "unos pasteles"?', opts: ['des gâteaus', 'des gâteaux', 'des gâteau'], a: 1, fb: '-eau → -x: "des gâteaux".' },
      { s: 'Plural de "un cheveu": des ___.', opts: ['cheveus', 'cheveux', 'chevaux'], a: 1, fb: '-eu → -x: "cheveux".' },
    ],
  },
  {
    slug: 'verbo-etre',
    order: 3,
    title: 'El verbo être (ser/estar) en presente',
    shortTitle: 'Verbo être (ser/estar)',
    icon: '⚡',
    seoTitle: 'Verbo être en francés (ser/estar): conjugación y ejercicios | A1',
    seoDescription:
      'El verbo être en francés: conjugación en presente (je suis, tu es, il est…), usos para identidad, nacionalidad y estado, y diferencias con el español. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['verbo être', 'être conjugación', 'ser y estar en francés', 'je suis tu es il est', 'être présent a1'],
    intro: [
      'Como en inglés, el francés tiene UN solo verbo, "être", para "ser" y "estar". Es el verbo más importante del A1: sirve para decir quién eres, tu nacionalidad, tu profesión, cómo estás y dónde estás.',
      'Es completamente irregular —no hay un patrón lógico, hay que memorizarlo—: je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont. Vale la pena repetirlo en voz alta hasta que salga solo.',
      'Ventaja para el hispanohablante: como "être" cubre ser Y estar a la vez, no tienes que decidir entre los dos. "Soy alto" y "estoy cansado" usan el mismo verbo: "je suis grand" / "je suis fatigué".',
    ],
    sections: [
      {
        heading: 'Conjugación (memorízala)',
        body: [
          'je suis · tu es · il/elle/on est · nous sommes · vous êtes · ils/elles sont. Fíjate en el acento circunflejo de "êtes" y en que "est" se pronuncia como una "e".',
          'Atención a la liaison: "vous êtes" se pronuncia "vou-zêtes" (la s de vous se enlaza con la vocal).',
        ],
      },
      {
        heading: 'Usos principales',
        body: [
          'Identidad y nacionalidad: "Je suis Colombien." Profesión: "Elle est médecin" (¡sin artículo, a diferencia del inglés!). Estado: "Nous sommes fatigués." Lugar: "Ils sont à Paris."',
        ],
      },
      {
        heading: 'Ser y estar = un solo verbo',
        body: [
          'No distingas ser/estar: ambos son "être". "Es simpático" → "Il est sympathique"; "Está enfermo" → "Il est malade". El contexto aclara el matiz.',
          'Ojo: la edad NO usa "être", usa "avoir" (J’ai vingt ans), igual que el español "tener" — lo verás en el tema de avoir.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'être au présent',
        headers: ['Pronombre', 'Forma', 'Ejemplo'],
        rows: [
          ['je', 'suis', 'je suis étudiant(e)'],
          ['tu', 'es', 'tu es gentil(le)'],
          ['il / elle / on', 'est', 'elle est française'],
          ['nous', 'sommes', 'nous sommes amis'],
          ['vous', 'êtes', 'vous êtes prêts'],
          ['ils / elles', 'sont', 'ils sont à Paris'],
        ],
      },
    ],
    examples: [
      { en: 'Je suis étudiant.', es: 'Soy estudiante.' },
      { en: 'Elle est médecin.', es: 'Ella es médica.', note: 'la profesión va sin artículo.' },
      { en: 'Nous sommes fatigués.', es: 'Estamos cansados.', note: 'être = ser y estar.' },
      { en: 'Vous êtes français ?', es: '¿Sois/Son franceses?', note: 'liaison: "vou-zêtes".' },
      { en: 'Ils sont à la maison.', es: 'Están en casa.' },
      { en: 'Je ne suis pas prêt.', es: 'No estoy listo.', note: 'negación: ne + verbe + pas.' },
    ],
    contrast: [
      { es: 'Soy alto.', en: 'Je suis grand.', note: 'être = ser.' },
      { es: 'Estoy cansado.', en: 'Je suis fatigué.', note: 'el mismo verbo "être" = estar.' },
      { es: 'Es médica.', en: 'Elle est médecin.', note: 'la profesión NO lleva artículo.' },
      { es: 'Estamos en París.', en: 'Nous sommes à Paris.', note: 'ubicación con être.' },
      { es: '¿Eres francés?', en: 'Tu es français ?', note: 'con "tu" → "es".' },
    ],
    commonMistakes: [
      { wrong: 'Je es étudiant.', right: 'Je suis étudiant.', note: 'Con "je" → "suis".' },
      { wrong: 'Elle est une médecin.', right: 'Elle est médecin.', note: 'La profesión va sin artículo tras "être".' },
      { wrong: 'Vous estes', right: 'Vous êtes', note: 'Es "êtes", con circunflejo.' },
      { wrong: 'J’ai fatigué.', right: 'Je suis fatigué.', note: 'El estado va con "être", no con "avoir".' },
      { wrong: 'Ils est à Paris.', right: 'Ils sont à Paris.', note: 'Con ils/elles → "sont".' },
    ],
    tip: '"être" es ser Y estar en una sola palabra: una preocupación menos. Memoriza: je suis, tu es, il est, nous sommes, vous êtes, ils sont. La profesión va sin artículo.',
    questions: [
      { s: 'Je ___ étudiant(e).', opts: ['suis', 'es', 'est', 'sommes'], a: 0, fb: 'Con "je" → "suis".' },
      { s: 'Tu ___ français(e) ?', opts: ['suis', 'es', 'est', 'êtes'], a: 1, fb: 'Con "tu" → "es".' },
      { s: 'Il ___ médecin.', opts: ['suis', 'es', 'est', 'sont'], a: 2, fb: 'Con "il/elle" → "est".' },
      { s: 'Nous ___ amis.', opts: ['sommes', 'êtes', 'sont', 'es'], a: 0, fb: 'Con "nous" → "sommes".' },
      { s: 'Vous ___ à Paris ?', opts: ['sommes', 'êtes', 'sont', 'es'], a: 1, fb: 'Con "vous" → "êtes".' },
      { s: 'Ils ___ à l’école.', opts: ['sommes', 'êtes', 'sont', 'es'], a: 2, fb: 'Con "ils/elles" → "sont".' },
      { s: 'Elle ___ très gentille.', opts: ['suis', 'es', 'est', 'sont'], a: 2, fb: 'Con "elle" → "est".' },
      { s: 'Je ne ___ pas fatigué(e).', opts: ['suis', 'es', 'est', 'sommes'], a: 0, fb: 'Negación: "je ne suis pas".' },
      { s: 'On ___ contents.', opts: ['suis', 'es', 'est', 'sont'], a: 2, fb: '"on" se conjuga como "il" → "est".' },
      { s: 'Elles ___ très belles.', opts: ['sommes', 'êtes', 'sont', 'es'], a: 2, fb: 'Con "elles" → "sont".' },
      { s: '¿Cómo se dice "Ella es médica"?', opts: ['Elle est une médecin.', 'Elle est médecin.', 'Elle a médecin.'], a: 1, fb: 'La profesión va sin artículo.' },
      { s: '¿Cuál es CORRECTA?', opts: ['Vous estes prêts.', 'Vous êtes prêts.', 'Vous est prêts.'], a: 1, fb: '"Vous êtes".' },
      { s: 'Tu ___ prêt(e) ?', opts: ['suis', 'es', 'est', 'êtes'], a: 1, fb: 'Con "tu" → "es".' },
      { s: '¿Cómo se dice "Estoy cansado"?', opts: ['Je suis fatigué.', 'J’ai fatigué.', 'Je est fatigué.'], a: 0, fb: 'El estado va con "être": "je suis fatigué".' },
    ],
  },
  {
    slug: 'verbo-avoir',
    order: 4,
    title: 'El verbo avoir (tener) en presente',
    shortTitle: 'Verbo avoir (tener)',
    icon: '🔑',
    seoTitle: 'Verbo avoir en francés (tener): conjugación, la edad y ejercicios | A1',
    seoDescription:
      'El verbo avoir en francés: conjugación (j’ai, tu as, il a…), expresar la edad (avoir … ans), tener hambre/sed/miedo y ejercicios. Como el español "tener". Nivel A1.',
    keywords: ['verbo avoir', 'avoir conjugación', 'tener en francés', 'avoir ans edad francés', 'j’ai tu as il a a1'],
    intro: [
      '"avoir" significa "tener" y es, junto a "être", el verbo más importante del francés. Sirve para la posesión (J’ai une voiture), la familia (J’ai deux frères) y muchas expresiones de estado.',
      'Su conjugación es irregular: j’ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont. Fíjate en la elisión obligatoria "j’ai" (je + ai) y en la liaison de "nous avons", "vous avez", "ils ont".',
      'Buena noticia para el hispanohablante: en francés, igual que en español, la EDAD se dice con "tener": "J’ai vingt ans" = "Tengo veinte años". Esto te diferencia del inglés, que usa "to be". También con hambre, sed y miedo se usa "avoir".',
    ],
    sections: [
      {
        heading: 'Conjugación y enlaces',
        body: [
          'j’ai · tu as · il/elle/on a · nous avons · vous avez · ils/elles ont. "je" se convierte en "j’" ante vocal: "j’ai", nunca "je ai".',
          'En la cabeza distingue "il a" (él tiene) de "il est" (él es): se parecen al oído pero son verbos distintos.',
        ],
      },
      {
        heading: 'La edad y las expresiones con avoir',
        body: [
          'La edad: "avoir … ans" → "Quel âge as-tu ? — J’ai trente ans." Nunca se usa "être" para la edad.',
          'Estados con "avoir": avoir faim (tener hambre), avoir soif (tener sed), avoir peur (tener miedo), avoir besoin de (necesitar), avoir chaud/froid (tener calor/frío).',
        ],
      },
      {
        heading: 'avoir vs être',
        body: [
          'Usa "avoir" para lo que TIENES (posesión, edad, hambre): "J’ai une sœur", "J’ai faim". Usa "être" para lo que ERES o tu estado descriptivo: "Je suis grand", "Je suis content".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'avoir au présent',
        headers: ['Pronombre', 'Forma', 'Ejemplo'],
        rows: [
          ['je (j’)', 'ai', 'j’ai un chat'],
          ['tu', 'as', 'tu as raison'],
          ['il / elle / on', 'a', 'elle a vingt ans'],
          ['nous', 'avons', 'nous avons faim'],
          ['vous', 'avez', 'vous avez le temps'],
          ['ils / elles', 'ont', 'ils ont une maison'],
        ],
      },
      {
        caption: 'Expresiones con avoir',
        headers: ['Francés', 'Español'],
        rows: [
          ['avoir … ans', 'tener … años'],
          ['avoir faim / soif', 'tener hambre / sed'],
          ['avoir peur', 'tener miedo'],
          ['avoir besoin de', 'necesitar (tener necesidad de)'],
        ],
      },
    ],
    examples: [
      { en: 'J’ai vingt ans.', es: 'Tengo veinte años.', note: 'la edad con "avoir", como en español.' },
      { en: 'Elle a deux enfants.', es: 'Ella tiene dos hijos.' },
      { en: 'Nous avons faim.', es: 'Tenemos hambre.', note: '"avoir faim".' },
      { en: 'Ils ont une grande maison.', es: 'Tienen una casa grande.', note: 'liaison: "ils-ont".' },
      { en: 'Tu as raison.', es: 'Tienes razón.' },
      { en: 'Je n’ai pas de voiture.', es: 'No tengo carro.', note: 'negación: pas de.' },
    ],
    contrast: [
      { es: 'Tengo 20 años.', en: 'J’ai vingt ans.', note: 'la edad con "avoir" (como el español).' },
      { es: 'Tengo hambre.', en: 'J’ai faim.', note: 'estado físico con "avoir".' },
      { es: 'Tengo razón.', en: 'J’ai raison.', note: 'expresión fija con avoir.' },
      { es: 'Necesito ayuda.', en: 'J’ai besoin d’aide.', note: 'necesitar = "avoir besoin de".' },
      { es: 'Tienen una casa.', en: 'Ils ont une maison.', note: 'con ils/elles → "ont".' },
    ],
    commonMistakes: [
      { wrong: 'Je ai un chat.', right: 'J’ai un chat.', note: 'Elisión obligatoria: je + ai → j’ai.' },
      { wrong: 'Je suis vingt ans.', right: 'J’ai vingt ans.', note: 'La edad va con "avoir", no con "être".' },
      { wrong: 'Elle ont une sœur.', right: 'Elle a une sœur.', note: 'Con "elle" → "a"; "ont" es para ils/elles.' },
      { wrong: 'Nous ont faim.', right: 'Nous avons faim.', note: 'Con "nous" → "avons".' },
      { wrong: 'J’ai chaud → "Je suis chaud"', right: 'J’ai chaud.', note: '"tener calor" se dice con avoir.' },
    ],
    tip: '"avoir" = tener. Memoriza j’ai, tu as, il a, nous avons, vous avez, ils ont. Y como en español, la edad va con "avoir": "J’ai 20 ans".',
    questions: [
      { s: 'J’___ vingt ans.', opts: ['ai', 'as', 'a', 'avons'], a: 0, fb: 'Con "je" → "ai" (j’ai).' },
      { s: 'Tu ___ un chat ?', opts: ['ai', 'as', 'a', 'avez'], a: 1, fb: 'Con "tu" → "as".' },
      { s: 'Il ___ une voiture.', opts: ['ai', 'as', 'a', 'ont'], a: 2, fb: 'Con "il/elle" → "a".' },
      { s: 'Nous ___ faim.', opts: ['avons', 'avez', 'ont', 'as'], a: 0, fb: 'Con "nous" → "avons".' },
      { s: 'Vous ___ des enfants ?', opts: ['avons', 'avez', 'ont', 'as'], a: 1, fb: 'Con "vous" → "avez".' },
      { s: 'Elles ___ peur.', opts: ['avons', 'avez', 'ont', 'a'], a: 2, fb: 'Con "ils/elles" → "ont".' },
      { s: 'Tu ___ soif ?', opts: ['ai', 'as', 'a', 'avez'], a: 1, fb: '"avoir soif" → con "tu" → "as".' },
      { s: 'Il ___ besoin d’aide.', opts: ['ai', 'as', 'a', 'ont'], a: 2, fb: '"avoir besoin de" → con "il" → "a".' },
      { s: 'Ils ___ beaucoup de travail.', opts: ['avons', 'avez', 'ont', 'a'], a: 2, fb: 'Con "ils" → "ont".' },
      { s: '¿Cómo se dice "Tengo 30 años"?', opts: ['Je suis trente ans.', 'J’ai trente ans.', 'J’ai trente années.'], a: 1, fb: 'La edad → "J’ai trente ans".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Je ai un chat.', 'J’ai un chat.', 'Je suis un chat.'], a: 1, fb: 'Elisión: "j’ai".' },
      { s: 'Quel âge ___-tu ?', opts: ['es', 'as', 'a'], a: 1, fb: 'La edad con avoir → "as-tu".' },
      { s: '¿Cómo se dice "Tengo hambre"?', opts: ['Je suis faim.', 'J’ai faim.', 'J’ai la faim.'], a: 1, fb: '"J’ai faim".' },
      { s: 'Nous ___ une maison à Lyon.', opts: ['avons', 'ont', 'avez'], a: 0, fb: 'Con "nous" → "avons".' },
    ],
  },
  {
    slug: 'pronombres-sujeto',
    order: 5,
    title: 'Los pronombres sujeto en francés (je, tu, il, elle, on, nous, vous, ils, elles)',
    shortTitle: 'Pronombres sujeto',
    icon: '👤',
    seoTitle: 'Pronombres sujeto en francés: tu/vous, on y ejercicios | A1',
    seoDescription:
      'Los pronombres sujeto en francés: je, tu, il, elle, on, nous, vous, ils, elles. La diferencia tú/usted (tu/vous), el uso de "on" y por qué el sujeto es obligatorio. Nivel A1.',
    keywords: ['pronombres sujeto francés', 'tu vous diferencia', 'pronombre on francés', 'je tu il elle a1'],
    intro: [
      'Los pronombres sujeto dicen quién hace la acción y, a diferencia del español, en francés son OBLIGATORIOS: no se puede omitir el sujeto. El español dice "hablo francés"; el francés exige "je parle français".',
      'Hay dos formas de "tú": "tu" (informal, para amigos y familia) y "vous" (formal, para usted; y también el plural "vosotros/ustedes"). Usar "tu" con un desconocido puede sonar maleducado: ante la duda, usa "vous".',
      'El pronombre "on" es muy francés y muy útil: significa "se / la gente" en general ("On parle français ici") y, en la lengua hablada, sustituye a "nous" ("On y va" = "vamos"). Se conjuga siempre como "il/elle".',
    ],
    sections: [
      {
        heading: 'tu o vous: el problema del "usted"',
        body: [
          '"tu" = informal y singular (un amigo, un familiar, un niño). "vous" = formal singular (usted) y también plural (vosotros/ustedes, formal o informal).',
          'En un examen o con desconocidos, "vous" es la opción segura. El verbo cambia: "tu parles" vs "vous parlez".',
        ],
      },
      {
        heading: 'il/elle, ils/elles y el género del grupo',
        body: [
          '"il/elle" = él/ella; "ils/elles" = ellos/ellas. Regla importante: un grupo mixto (hombres y mujeres) usa siempre el masculino "ils", aunque haya una sola persona masculina.',
        ],
      },
      {
        heading: 'El pronombre "on"',
        body: [
          '"on" significa "se / la gente" en sentido impersonal: "En France, on dîne tard." En el francés hablado también equivale a "nous": "On va au cinéma" = "Vamos al cine".',
          'Se conjuga como "il/elle": "on est", "on a", "on parle".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Los pronombres sujeto',
        headers: ['Pronombre', 'Significado', 'Ejemplo'],
        rows: [
          ['je (j’)', 'yo', 'je parle'],
          ['tu', 'tú (informal)', 'tu parles'],
          ['il / elle', 'él / ella', 'il parle'],
          ['on', 'se / la gente / nosotros (oral)', 'on parle'],
          ['nous', 'nosotros/as', 'nous parlons'],
          ['vous', 'usted / vosotros / ustedes', 'vous parlez'],
          ['ils / elles', 'ellos / ellas', 'ils parlent'],
        ],
      },
    ],
    examples: [
      { en: 'Je parle espagnol et français.', es: 'Hablo español y francés.', note: 'el sujeto "je" es obligatorio.' },
      { en: 'Tu habites où ?', es: '¿Dónde vives (tú)?', note: 'tu = informal.' },
      { en: 'Vous parlez anglais ?', es: '¿Habla usted inglés?', note: 'vous = formal/plural.' },
      { en: 'On va au cinéma.', es: 'Vamos al cine.', note: '"on" = nous en la lengua oral.' },
      { en: 'Marc et Léa ? Ils sont amis.', es: '¿Marc y Léa? Son amigos.', note: 'grupo mixto → "ils".' },
      { en: 'En France, on dîne tard.', es: 'En Francia se cena tarde.', note: '"on" impersonal.' },
    ],
    contrast: [
      { es: 'Hablo francés.', en: 'Je parle français.', note: 'el sujeto no se puede omitir.' },
      { es: '¿Habla usted inglés?', en: 'Vous parlez anglais ?', note: 'usted → "vous".' },
      { es: '¿Hablas inglés? (a un amigo)', en: 'Tu parles anglais ?', note: 'informal → "tu".' },
      { es: 'Vamos al cine.', en: 'On va au cinéma.', note: 'en el oral, "on" = nosotros.' },
      { es: 'Ellos (Marc y Ana) están aquí.', en: 'Ils sont ici.', note: 'grupo mixto → masculino "ils".' },
    ],
    commonMistakes: [
      { wrong: 'Parle français.', right: 'Je parle français.', note: 'El sujeto es obligatorio en francés.' },
      { wrong: 'Tu parlez anglais ?', right: 'Tu parles anglais ?', note: 'Con "tu" el verbo es "parles", no "parlez".' },
      { wrong: 'on sommes', right: 'on est', note: '"on" se conjuga como "il/elle": "on est".' },
      { wrong: 'Marc et Léa, elles sont amis.', right: 'Marc et Léa, ils sont amis.', note: 'Grupo mixto → "ils".' },
      { wrong: 'Je parles', right: 'Je parle', note: 'Con "je", el verbo -er no lleva -s.' },
    ],
    tip: 'El sujeto NUNCA se omite en francés. "tu" es informal y "vous" formal/plural (ante la duda, vous). Y "on" se conjuga como "il": "on est", "on va".',
    questions: [
      { s: '___ parle français. (yo)', opts: ['Je', 'Tu', 'Il', 'On'], a: 0, fb: '"yo" → "je".' },
      { s: '___ parlez anglais ? (usted)', opts: ['Tu', 'Vous', 'Il', 'Je'], a: 1, fb: 'usted → "vous parlez".' },
      { s: 'Marc et Léa ? ___ sont amis. (grupo mixto)', opts: ['Ils', 'Elles', 'On', 'Vous'], a: 0, fb: 'Grupo mixto → "ils".' },
      { s: 'En France, ___ dîne tard. (se / la gente)', opts: ['il', 'on', 'nous', 'ils'], a: 1, fb: 'Impersonal → "on".' },
      { s: '___ allons à Paris. (nosotros, formal)', opts: ['On', 'Nous', 'Vous', 'Ils'], a: 1, fb: '"nosotros" formal → "nous allons".' },
      { s: 'Pour parler à un ami : ___ parles ?', opts: ['tu', 'vous', 'il', 'on'], a: 0, fb: 'Amigo → informal "tu".' },
      { s: 'Sophie ? ___ est étudiante.', opts: ['Il', 'Elle', 'On', 'Ils'], a: 1, fb: 'Sophie (mujer) → "elle".' },
      { s: 'On ___ au cinéma.', opts: ['vas', 'va', 'allons'], a: 1, fb: '"on" se conjuga como "il" → "va".' },
      { s: '___ habites où ? (a un amigo)', opts: ['Tu', 'Vous', 'Il'], a: 0, fb: 'Informal → "tu habites".' },
      { s: 'Anne et Marie ? ___ sont sœurs.', opts: ['Ils', 'Elles', 'On'], a: 1, fb: 'Solo mujeres → "elles".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Parle français.', 'Je parle français.', 'Parles français.'], a: 1, fb: 'El sujeto "je" es obligatorio.' },
      { s: '¿Cómo se dice "¿Habla usted español?"?', opts: ['Tu parles espagnol ?', 'Vous parlez espagnol ?', 'On parle espagnol ?'], a: 1, fb: 'usted → "vous parlez".' },
      { s: 'On ___ contents.', opts: ['est', 'sommes', 'sont'], a: 0, fb: '"on" como "il" → "est".' },
      { s: '¿Cuál es CORRECTA? (a un amigo)', opts: ['Tu parlez anglais ?', 'Tu parles anglais ?', 'Vous parles anglais ?'], a: 1, fb: 'Con "tu" → "parles".' },
    ],
  },
  {
    slug: 'verbos-er-presente',
    order: 6,
    title: 'Los verbos en -ER en presente (parler, habiter, aimer)',
    shortTitle: 'Verbos en -ER (presente)',
    icon: '🗣️',
    seoTitle: 'Verbos en -ER en francés (presente): terminaciones y ejercicios | A1',
    seoDescription:
      'La conjugación de los verbos en -ER en presente: parler, habiter, aimer. Terminaciones -e, -es, -e, -ons, -ez, -ent y por qué muchas suenan igual. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['verbos -er francés', 'parler conjugación', 'presente verbos er francés', 'terminaciones er a1'],
    intro: [
      'Los verbos terminados en -ER (parler, habiter, aimer, travailler…) son, con diferencia, el grupo más numeroso y más regular del francés: cerca del 90% de los verbos. Si dominas este patrón, puedes conjugar miles de verbos.',
      'Se conjugan quitando -ER y añadiendo las terminaciones: -e, -es, -e, -ons, -ez, -ent. Así, "parler" da: je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent.',
      'El gran detalle para hispanohablantes: cuatro de las seis formas (je parle, tu parles, il parle, ils parlent) se pronuncian IGUAL, porque las terminaciones -e, -es, -ent son mudas. La diferencia se ve al escribir y se oye en el pronombre.',
    ],
    sections: [
      {
        heading: 'Las terminaciones (-e, -es, -e, -ons, -ez, -ent)',
        body: [
          'je parle · tu parles · il/elle parle · nous parlons · vous parlez · ils/elles parlent. Solo "nous" (-ons) y "vous" (-ez) tienen un sonido propio; las demás suenan como la raíz.',
          'Importante: "ils parlent" NO se pronuncia la terminación -ent; suena igual que "il parle".',
        ],
      },
      {
        heading: 'Pequeños cambios de escritura',
        body: [
          'Verbos en -GER añaden una "e" en "nous" para conservar el sonido suave: manger → nous mangeons. Verbos en -CER ponen cedilla: commencer → nous commençons.',
          'Algunos cambian acento o consonante: préférer → je préfère; appeler → j’appelle. Son detalles; el patrón base no cambia.',
        ],
      },
      {
        heading: 'Élision con je',
        body: [
          'Si el verbo empieza por vocal o h muda, "je" se convierte en "j’": j’aime, j’habite, j’écoute. Nunca "je aime".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'parler (modelo de los verbos -ER)',
        headers: ['Pronombre', 'Forma', 'Se pronuncia'],
        rows: [
          ['je', 'parle', 'como la raíz'],
          ['tu', 'parles', 'como la raíz'],
          ['il / elle / on', 'parle', 'como la raíz'],
          ['nous', 'parlons', 'sonido propio (-ons)'],
          ['vous', 'parlez', 'sonido propio (-ez)'],
          ['ils / elles', 'parlent', 'como la raíz (-ent muda)'],
        ],
      },
    ],
    examples: [
      { en: 'Je parle français.', es: 'Hablo francés.' },
      { en: 'Nous habitons à Paris.', es: 'Vivimos en París.', note: 'élision no; "nous habitons".' },
      { en: 'Ils aiment la musique.', es: 'Les gusta la música.', note: '-ent muda: suena "il aime".' },
      { en: 'J’écoute la radio.', es: 'Escucho la radio.', note: 'élision: je → j’.' },
      { en: 'Nous mangeons à midi.', es: 'Comemos al mediodía.', note: '-GER → "mangeons".' },
      { en: 'Vous travaillez beaucoup.', es: 'Trabajáis/Trabaja mucho.' },
    ],
    contrast: [
      { es: 'Hablo francés.', en: 'Je parle français.', note: 'el sujeto obligatorio + terminación -e.' },
      { es: 'Vivimos en Lyon.', en: 'Nous habitons à Lyon.', note: '"nous" → -ons.' },
      { es: 'Les gusta el cine.', en: 'Ils aiment le cinéma.', note: '-ent muda.' },
      { es: 'Escucho música.', en: 'J’écoute de la musique.', note: 'élision je → j’.' },
      { es: 'Comemos pizza.', en: 'Nous mangeons une pizza.', note: '-GER añade "e": mangeons.' },
    ],
    commonMistakes: [
      { wrong: 'Je parles français.', right: 'Je parle français.', note: 'Con "je", la terminación es -e (sin -s).' },
      { wrong: 'Nous mangons', right: 'Nous mangeons', note: 'Los verbos en -GER añaden "e" en "nous".' },
      { wrong: 'Je aime', right: 'J’aime', note: 'Elisión obligatoria ante vocal.' },
      { wrong: 'Vous parlent', right: 'Vous parlez', note: 'Con "vous" → -ez.' },
      { wrong: 'Ils parle', right: 'Ils parlent', note: 'Con "ils/elles" → -ent (aunque sea muda).' },
    ],
    tip: 'Quita -ER y añade -e, -es, -e, -ons, -ez, -ent. Cuatro formas suenan igual (je/tu/il/ils): la diferencia se ve al escribir. Ante vocal: je → j’.',
    questions: [
      { s: 'Je ___ français. (parler)', opts: ['parle', 'parles', 'parlons', 'parlent'], a: 0, fb: 'Con "je" → "parle".' },
      { s: 'Tu ___ à Paris ? (habiter)', opts: ['habite', 'habites', 'habitez', 'habitent'], a: 1, fb: 'Con "tu" → "habites".' },
      { s: 'Il ___ la musique. (aimer)', opts: ['aime', 'aimes', 'aimons', 'aiment'], a: 0, fb: 'Con "il" → "aime".' },
      { s: 'Nous ___ le bus. (regarder→prendre? usar "chercher")', opts: ['cherche', 'cherchons', 'cherchez', 'cherchent'], a: 1, fb: 'Con "nous" → "-ons": "cherchons".' },
      { s: 'Vous ___ beaucoup. (travailler)', opts: ['travaille', 'travailles', 'travaillez', 'travaillent'], a: 2, fb: 'Con "vous" → "travaillez".' },
      { s: 'Ils ___ à midi. (manger)', opts: ['mange', 'manges', 'mangeons', 'mangent'], a: 3, fb: 'Con "ils" → "mangent".' },
      { s: 'Nous ___ une pizza. (manger)', opts: ['mangons', 'mangeons', 'mangez'], a: 1, fb: '-GER añade "e": "mangeons".' },
      { s: 'J’___ la radio. (écouter)', opts: ['écoute', 'écoutes', 'écoutent'], a: 0, fb: 'Con "je" → "écoute" (j’écoute).' },
      { s: 'Elles ___ le français. (étudier)', opts: ['étudie', 'étudies', 'étudient'], a: 2, fb: 'Con "elles" → "étudient".' },
      { s: 'On ___ ici. (travailler)', opts: ['travaille', 'travailles', 'travaillons'], a: 0, fb: '"on" como "il" → "travaille".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Je parles', 'Je parle', 'Je parlent'], a: 1, fb: 'Con "je" → "parle".' },
      { s: '¿Cómo se dice "Escucho música"?', opts: ['Je écoute de la musique.', 'J’écoute de la musique.', 'Je écoutes la musique.'], a: 1, fb: 'Elisión: "j’écoute".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Nous mangons', 'Nous mangeons', 'Nous manges'], a: 1, fb: 'Verbo en -GER → "mangeons".' },
      { s: 'Tu ___ le cinéma. (aimer)', opts: ['aime', 'aimes', 'aiment'], a: 1, fb: 'Con "tu" → "aimes".' },
    ],
  },
  {
    slug: 'la-negacion',
    order: 7,
    title: 'La negación en francés (ne… pas)',
    shortTitle: 'La negación (ne… pas)',
    icon: '🚫',
    seoTitle: 'La negación en francés (ne… pas): explicación y ejercicios | A1',
    seoDescription:
      'Cómo formar la negación en francés con ne… pas alrededor del verbo, la elisión n’, y otras negaciones (ne… jamais, ne… rien). Ejemplos y ejercicios. Nivel A1.',
    keywords: ['negación en francés', 'ne pas', 'ne jamais rien', 'cómo negar en francés a1'],
    intro: [
      'La negación francesa es una estructura de DOS piezas que abrazan al verbo: ne + verbo + pas. Donde el español pone un solo "no" delante del verbo ("no hablo"), el francés rodea el verbo: "je ne parle pas".',
      'Si el verbo empieza por vocal o h muda, "ne" se convierte en "n’": "il n’aime pas", "je n’habite pas". La elisión es obligatoria.',
      'Detalle realista: en el francés HABLADO e informal, la "ne" se omite muchas veces ("Je sais pas", "C’est pas grave"). Pero al escribir y en un examen, la "ne" SIEMPRE se pone. Apréndela completa.',
    ],
    sections: [
      {
        heading: 'La estructura ne… pas',
        body: [
          'El esquema es: sujeto + ne + verbo + pas. "Je ne mange pas de viande", "Nous ne sommes pas prêts". El "ne" va antes del verbo y el "pas" después.',
          'Ante vocal o h muda: ne → n’. "Elle n’est pas là", "Je n’ai pas faim".',
        ],
      },
      {
        heading: 'pas de / pas d’ con el artículo indefinido',
        body: [
          'En una frase negativa, "un/une/des" y los partitivos (du/de la/des) se transforman en "de" (o "d’" ante vocal): "J’ai un chat" → "Je n’ai pas de chat"; "Je bois du café" → "Je ne bois pas de café".',
        ],
      },
      {
        heading: 'Otras negaciones',
        body: [
          'El "pas" se puede sustituir por otras palabras: ne… jamais (nunca), ne… rien (nada), ne… plus (ya no), ne… personne (nadie). "Je ne fume jamais", "Il ne fait rien".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Afirmativa → negativa',
        headers: ['Afirmativa', 'Negativa', 'Nota'],
        rows: [
          ['Je parle.', 'Je ne parle pas.', 'ne + verbo + pas'],
          ['Il aime.', 'Il n’aime pas.', 'ne → n’ ante vocal'],
          ['J’ai un chat.', 'Je n’ai pas de chat.', 'un → de'],
          ['Je bois du café.', 'Je ne bois pas de café.', 'du → de'],
        ],
      },
      {
        caption: 'Otras negaciones',
        headers: ['Negación', 'Significado', 'Ejemplo'],
        rows: [
          ['ne… jamais', 'nunca', 'Je ne fume jamais.'],
          ['ne… rien', 'nada', 'Il ne fait rien.'],
          ['ne… plus', 'ya no', 'Je ne travaille plus.'],
          ['ne… personne', 'a nadie', 'Je ne vois personne.'],
        ],
      },
    ],
    examples: [
      { en: 'Je ne parle pas anglais.', es: 'No hablo inglés.', note: 'ne + verbo + pas.' },
      { en: 'Il n’aime pas les légumes.', es: 'No le gustan las verduras.', note: 'ne → n’ ante vocal.' },
      { en: 'Je n’ai pas de voiture.', es: 'No tengo carro.', note: 'un/des → de.' },
      { en: 'Nous ne sommes pas prêts.', es: 'No estamos listos.' },
      { en: 'Elle ne mange jamais de viande.', es: 'Ella nunca come carne.', note: 'ne… jamais.' },
      { en: 'Il ne fait rien.', es: 'No hace nada.', note: 'ne… rien.' },
    ],
    contrast: [
      { es: 'No hablo inglés.', en: 'Je ne parle pas anglais.', note: 'el francés rodea el verbo con ne… pas.' },
      { es: 'No le gusta el queso.', en: 'Il n’aime pas le fromage.', note: 'ne → n’ ante vocal.' },
      { es: 'No tengo carro.', en: 'Je n’ai pas de voiture.', note: '"un" se vuelve "de" en negativo.' },
      { es: 'Nunca fumo.', en: 'Je ne fume jamais.', note: 'nunca → ne… jamais.' },
      { es: 'No hago nada.', en: 'Je ne fais rien.', note: 'nada → ne… rien.' },
    ],
    commonMistakes: [
      { wrong: 'Je parle pas anglais. (escrito)', right: 'Je ne parle pas anglais.', note: 'Al escribir, la "ne" es obligatoria.' },
      { wrong: 'Il ne aime pas.', right: 'Il n’aime pas.', note: 'Ante vocal: ne → n’.' },
      { wrong: 'Je n’ai pas un chat.', right: 'Je n’ai pas de chat.', note: 'En negativo, "un" → "de".' },
      { wrong: 'Je ne fume pas jamais.', right: 'Je ne fume jamais.', note: '"jamais" sustituye a "pas", no se suman.' },
      { wrong: 'Je no parle pas.', right: 'Je ne parle pas.', note: 'Es "ne", no "no".' },
    ],
    tip: 'La negación rodea el verbo: ne + verbo + pas. Ante vocal, ne → n’. Y en negativo, "un/du" se vuelven "de": "pas de café".',
    questions: [
      { s: 'Je ___ parle pas anglais.', opts: ['ne', 'n’', 'pas', 'non'], a: 0, fb: '"ne" ante consonante.' },
      { s: 'Il ___ aime pas les légumes.', opts: ['ne', 'n’', 'pas', 'non'], a: 1, fb: 'Ante vocal → "n’aime".' },
      { s: 'Tu ___ comprends pas ?', opts: ['ne', 'n’', 'pas', 'non'], a: 0, fb: '"ne" ante consonante.' },
      { s: 'Elle ___ est pas là.', opts: ['ne', 'n’', 'pas', 'non'], a: 1, fb: 'Ante vocal → "n’est".' },
      { s: 'Je parle ___ anglais. (completa la negación)', opts: ['ne', 'n’', 'pas', 'non'], a: 2, fb: 'Falta "pas": "je ne parle pas".' },
      { s: 'Nous ___ avons pas de chat.', opts: ['ne', 'n’', 'pas', 'non'], a: 1, fb: 'Ante vocal → "n’avons".' },
      { s: 'Je n’ai pas ___ voiture.', opts: ['une', 'de', 'la'], a: 1, fb: 'En negativo, "une" → "de".' },
      { s: 'Je ne bois pas ___ café.', opts: ['du', 'de', 'le'], a: 1, fb: 'En negativo, "du" → "de".' },
      { s: 'Je ne fume ___. (nunca)', opts: ['pas', 'jamais', 'rien'], a: 1, fb: 'nunca → "ne… jamais".' },
      { s: 'Il ne fait ___. (nada)', opts: ['pas', 'jamais', 'rien'], a: 2, fb: 'nada → "ne… rien".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Il ne aime pas.', 'Il n’aime pas.', 'Il aime ne pas.'], a: 1, fb: 'Ante vocal → "n’aime pas".' },
      { s: '¿Cómo se dice "No tengo carro"?', opts: ['Je n’ai pas une voiture.', 'Je n’ai pas de voiture.', 'Je ne ai pas voiture.'], a: 1, fb: '"un/une" → "de" en negativo.' },
      { s: '¿Cuál es CORRECTA?', opts: ['Je ne fume pas jamais.', 'Je ne fume jamais.', 'Je fume ne jamais.'], a: 1, fb: '"jamais" reemplaza a "pas".' },
      { s: 'Vous ___ habitez pas ici ?', opts: ['ne', 'n’', 'pas'], a: 0, fb: '"vous" + h aspirada/consonante → "ne".' },
    ],
  },
  {
    slug: 'preguntas',
    order: 8,
    title: 'Hacer preguntas en francés (est-ce que, entonación, inversión)',
    shortTitle: 'Las preguntas',
    icon: '❓',
    seoTitle: 'Hacer preguntas en francés (est-ce que, inversión): explicación y ejercicios | A1',
    seoDescription:
      'Las tres formas de preguntar en francés: entonación, est-ce que e inversión. Palabras interrogativas (où, comment, quand, combien). Ejemplos y ejercicios. Nivel A1.',
    keywords: ['preguntas en francés', 'est-ce que', 'inversión francés', 'où comment quand combien a1'],
    intro: [
      'En francés hay TRES maneras de hacer una pregunta de sí/no, y conviene reconocer las tres: por entonación (la más fácil, oral), con "est-ce que" (la más útil para principiantes) y por inversión (la más formal).',
      'La forma más segura para empezar es "est-ce que": pon "est-ce que" delante de una frase afirmativa normal y ya tienes una pregunta. "Tu parles français" → "Est-ce que tu parles français ?". Ante vocal se convierte en "est-ce qu’".',
      'Para pedir información concreta usamos palabras interrogativas: où (dónde), comment (cómo), quand (cuándo), combien (cuánto), pourquoi (por qué), qui (quién), que/qu’est-ce que (qué).',
    ],
    sections: [
      {
        heading: 'Las tres formas de preguntar (sí/no)',
        body: [
          'Entonación: misma frase, voz que sube al final → "Tu parles français ?". Muy común al hablar.',
          'Est-ce que: "Est-ce que tu parles français ?". Inversión (formal): verbo + sujeto con guion → "Parles-tu français ?".',
        ],
      },
      {
        heading: 'Las palabras interrogativas',
        body: [
          'où (dónde), comment (cómo), quand (cuándo), combien (cuánto/cuántos), pourquoi (por qué), qui (quién). Se combinan a menudo con est-ce que: "Où est-ce que tu habites ?", "Comment est-ce que ça va ?".',
        ],
      },
      {
        heading: 'qu’est-ce que = qué',
        body: [
          'Para preguntar "¿qué…?" sobre un objeto se usa "qu’est-ce que": "Qu’est-ce que tu aimes ?" (¿Qué te gusta?), "Qu’est-ce que c’est ?" (¿Qué es esto?). Es una fórmula fija muy frecuente.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Tres formas de preguntar',
        headers: ['Forma', 'Ejemplo', 'Registro'],
        rows: [
          ['Entonación', 'Tu parles français ?', 'oral, informal'],
          ['Est-ce que', 'Est-ce que tu parles français ?', 'neutro (recomendada)'],
          ['Inversión', 'Parles-tu français ?', 'formal/escrito'],
        ],
      },
      {
        caption: 'Palabras interrogativas',
        headers: ['Francés', 'Español', 'Ejemplo'],
        rows: [
          ['où', 'dónde', 'Où habites-tu ?'],
          ['comment', 'cómo', 'Comment ça va ?'],
          ['quand', 'cuándo', 'Quand arrives-tu ?'],
          ['combien', 'cuánto', 'Combien ça coûte ?'],
        ],
      },
    ],
    examples: [
      { en: 'Est-ce que tu parles français ?', es: '¿Hablas francés?', note: 'forma recomendada para principiantes.' },
      { en: 'Où est-ce que tu habites ?', es: '¿Dónde vives?', note: 'palabra interrogativa + est-ce que.' },
      { en: 'Comment ça va ?', es: '¿Cómo estás/va?' },
      { en: 'Combien ça coûte ?', es: '¿Cuánto cuesta?' },
      { en: 'Qu’est-ce que tu aimes ?', es: '¿Qué te gusta?', note: 'qu’est-ce que = qué.' },
      { en: 'Parles-tu anglais ?', es: '¿Hablas inglés?', note: 'inversión (formal).' },
    ],
    contrast: [
      { es: '¿Hablas francés?', en: 'Est-ce que tu parles français ?', note: 'lo más fácil: "est-ce que" + afirmativa.' },
      { es: '¿Dónde vives?', en: 'Où est-ce que tu habites ?', note: 'où = dónde.' },
      { es: '¿Cómo te llamas?', en: 'Comment tu t’appelles ?', note: 'comment = cómo.' },
      { es: '¿Cuánto cuesta?', en: 'Combien ça coûte ?', note: 'combien = cuánto.' },
      { es: '¿Qué quieres?', en: 'Qu’est-ce que tu veux ?', note: 'qué → qu’est-ce que.' },
    ],
    commonMistakes: [
      { wrong: 'Est-ce que il aime ?', right: 'Est-ce qu’il aime ?', note: 'Ante vocal: est-ce que → est-ce qu’.' },
      { wrong: 'Que tu aimes ?', right: 'Qu’est-ce que tu aimes ?', note: 'Para "¿qué…?" usa la fórmula completa.' },
      { wrong: 'Où tu habites ? (escrito formal)', right: 'Où est-ce que tu habites ? / Où habites-tu ?', note: 'Mejor con est-ce que o inversión.' },
      { wrong: 'Comment est ça va ?', right: 'Comment ça va ?', note: '"Comment ça va ?" es una fórmula fija.' },
      { wrong: 'Combien coûte ça ?', right: 'Combien ça coûte ? / Combien coûte-t-il ?', note: 'Cuidado con el orden.' },
    ],
    tip: 'La forma más fácil: "est-ce que" + frase afirmativa. Para info concreta: où, comment, quand, combien + est-ce que. Y "¿qué?" → "qu’est-ce que".',
    questions: [
      { s: '___ tu parles français ? (forma fácil)', opts: ['Est-ce que', 'Que', 'Qui', 'Comment'], a: 0, fb: '"Est-ce que" + afirmativa.' },
      { s: '___ tu habites ? (¿dónde?)', opts: ['Comment', 'Où', 'Quand', 'Combien'], a: 1, fb: '"où" = dónde.' },
      { s: '___ tu t’appelles ? (¿cómo?)', opts: ['Comment', 'Où', 'Quand', 'Qui'], a: 0, fb: '"comment" = cómo.' },
      { s: '___ ça coûte ? (¿cuánto?)', opts: ['Comment', 'Où', 'Combien', 'Quand'], a: 2, fb: '"combien" = cuánto.' },
      { s: '___ le cours commence ? (¿cuándo?)', opts: ['Pourquoi', 'Où', 'Quand', 'Comment'], a: 2, fb: '"quand" = cuándo.' },
      { s: '___ tu aimes ? (¿qué?)', opts: ['Qui', 'Qu’est-ce que', 'Où', 'Comment'], a: 1, fb: '"qu’est-ce que" = qué.' },
      { s: '___ parle français ? (¿quién?)', opts: ['Qui', 'Où', 'Quand', 'Comment'], a: 0, fb: '"qui" = quién.' },
      { s: 'Est-ce ___ il aime le café ? (ante vocal)', opts: ['que', 'qu’', 'qui'], a: 1, fb: 'Ante vocal → "est-ce qu’il".' },
      { s: 'Inversión de "Tu parles" :', opts: ['Tu parles-?', 'Parles-tu ?', 'Est tu parles ?'], a: 1, fb: 'Inversión → "Parles-tu ?".' },
      { s: '¿Cómo se dice "¿Qué es esto?"?', opts: ['Que c’est ?', 'Qu’est-ce que c’est ?', 'Quoi c’est ?'], a: 1, fb: '"Qu’est-ce que c’est ?".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Est-ce que il aime ?', 'Est-ce qu’il aime ?', 'Est-ce que aime il ?'], a: 1, fb: 'Ante vocal → "est-ce qu’il".' },
      { s: '¿Cómo se dice "¿Dónde vives?" (fácil)?', opts: ['Où tu habites ?', 'Où est-ce que tu habites ?', 'Tu où habites ?'], a: 1, fb: '"Où est-ce que tu habites ?".' },
      { s: '___ est-ce que tu vas ? (¿cómo?)', opts: ['Comment', 'Combien', 'Où'], a: 0, fb: '"Comment est-ce que tu vas ?".' },
      { s: '___ coûte le livre ? (¿cuánto?)', opts: ['Comment', 'Combien', 'Quand'], a: 1, fb: '"Combien".' },
    ],
  },
  {
    slug: 'concordancia-adjetivos',
    order: 9,
    title: 'La concordancia de los adjetivos en francés',
    shortTitle: 'Concordancia de adjetivos',
    icon: '🎨',
    seoTitle: 'Concordancia de los adjetivos en francés (género y número): ejercicios | A1',
    seoDescription:
      'Cómo concuerdan los adjetivos en francés: femenino con -e, plural con -s, su posición (antes o después del nombre) y adjetivos irregulares. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['concordancia adjetivos francés', 'adjetivos femenino plural francés', 'posición adjetivos francés', 'accord adjectifs a1'],
    intro: [
      'En francés, como en español, el adjetivo concuerda en GÉNERO y NÚMERO con el sustantivo: un petit chat / une petite maison / des petits chats. La idea te resulta familiar; lo nuevo son las terminaciones y la posición.',
      'La regla base: para el femenino se añade una -e (grand → grande); para el plural, una -s (grand → grands). Combinadas dan cuatro formas: grand, grande, grands, grandes. Si el adjetivo ya termina en -e, no cambia en femenino (rouge → rouge).',
      'La gran diferencia con el español es la POSICIÓN: la mayoría de los adjetivos van DESPUÉS del nombre (une voiture rouge), pero un grupo pequeño y muy frecuente va DELANTE (un grand homme, une petite fille, un beau jardin).',
    ],
    sections: [
      {
        heading: 'Femenino y plural',
        body: [
          'Femenino: + e (un ami français → une amie française). Plural: + s muda (un livre intéressant → des livres intéressants). Si ya termina en -e, el femenino no cambia: "un homme calme / une femme calme".',
          'Algunas terminaciones tienen femeninos especiales: -eux → -euse (heureux → heureuse), -f → -ve (sportif → sportive), -er → -ère (cher → chère).',
        ],
      },
      {
        heading: 'La posición: antes o después',
        body: [
          'La mayoría van DESPUÉS del nombre, sobre todo color, forma y nacionalidad: "une chemise bleue", "un film français".',
          'Un grupo corto va DELANTE: beau, joli, grand, petit, jeune, vieux, bon, mauvais, nouveau (recuerda el truco "BANGS"). "Un bon restaurant", "une jolie ville".',
        ],
      },
      {
        heading: 'Adjetivos irregulares frecuentes',
        body: [
          'Algunos cambian bastante en femenino: beau → belle, nouveau → nouvelle, vieux → vieille, blanc → blanche, long → longue. Conviene memorizarlos porque son muy comunes.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Las cuatro formas (grand)',
        headers: ['', 'Singular', 'Plural'],
        rows: [
          ['Masculino', 'grand', 'grands'],
          ['Femenino', 'grande', 'grandes'],
        ],
      },
      {
        caption: 'Femeninos especiales',
        headers: ['Terminación masc.', 'Femenino', 'Ejemplo'],
        rows: [
          ['-e (sin cambio)', '-e', 'rouge → rouge'],
          ['-eux', '-euse', 'heureux → heureuse'],
          ['-f', '-ve', 'sportif → sportive'],
          ['irregulares', '—', 'beau → belle, blanc → blanche'],
        ],
      },
    ],
    examples: [
      { en: 'un petit chat / une petite maison', es: 'un gato pequeño / una casa pequeña', note: 'femenino + e.' },
      { en: 'une voiture rouge', es: 'un carro rojo', note: 'color → después del nombre.' },
      { en: 'un grand homme', es: 'un gran hombre', note: 'grand → delante del nombre.' },
      { en: 'une amie française', es: 'una amiga francesa', note: 'nacionalidad → después; femenino + e.' },
      { en: 'une belle ville', es: 'una ciudad bonita', note: 'beau → belle (irregular), delante.' },
      { en: 'des livres intéressants', es: 'unos libros interesantes', note: 'plural + s.' },
    ],
    contrast: [
      { es: 'una casa pequeña', en: 'une petite maison', note: '"petit" va DELANTE del nombre.' },
      { es: 'un carro rojo', en: 'une voiture rouge', note: 'el color va DESPUÉS.' },
      { es: 'una amiga francesa', en: 'une amie française', note: 'femenino: + e (française).' },
      { es: 'una ciudad bonita', en: 'une belle ville', note: 'beau → belle (irregular) y delante.' },
      { es: 'unos buenos restaurantes', en: 'de bons restaurants', note: '"bon" delante; ojo: "des" → "de" ante adjetivo.' },
    ],
    commonMistakes: [
      { wrong: 'une maison petit', right: 'une petite maison', note: '"petit" va delante y concuerda en femenino.' },
      { wrong: 'une voiture rouge → "une rouge voiture"', right: 'une voiture rouge', note: 'El color va después del nombre.' },
      { wrong: 'une amie franças', right: 'une amie française', note: 'Femenino: + e (et ç → française).' },
      { wrong: 'une belle → "une beau ville"', right: 'une belle ville', note: 'beau → belle ante nombre femenino.' },
      { wrong: 'des livres intéressant', right: 'des livres intéressants', note: 'Plural: + s.' },
    ],
    tip: 'Femenino + e, plural + s. La mayoría de adjetivos van DESPUÉS del nombre; los de "BANGS" (beau, grand, petit, bon…) van delante. Memoriza beau→belle, nouveau→nouvelle.',
    questions: [
      { s: 'une ___ maison (petit)', opts: ['petit', 'petite', 'petits', 'petites'], a: 1, fb: 'Femenino singular → "petite".' },
      { s: 'une amie ___ (français)', opts: ['français', 'française', 'françaises'], a: 1, fb: 'Femenino → "française".' },
      { s: 'des livres ___ (intéressant)', opts: ['intéressant', 'intéressante', 'intéressants'], a: 2, fb: 'Plural masculino → "intéressants".' },
      { s: 'une voiture ___ (color)', opts: ['rouge voiture', 'rouge', 'rouges'], a: 1, fb: 'El color va después: "voiture rouge".' },
      { s: 'un ___ homme (grand, antes del nombre)', opts: ['grand', 'grande', 'grands'], a: 0, fb: 'Masculino singular → "grand homme".' },
      { s: 'une ___ ville (beau)', opts: ['beau', 'belle', 'bel'], a: 1, fb: 'beau → belle ante nombre femenino.' },
      { s: 'des filles ___ (heureux)', opts: ['heureux', 'heureuse', 'heureuses'], a: 2, fb: '-eux → -euse → plural "heureuses".' },
      { s: 'un homme ___ (sportif)', opts: ['sportif', 'sportive', 'sportifs'], a: 0, fb: 'Masculino singular → "sportif".' },
      { s: 'une femme ___ (sportif)', opts: ['sportif', 'sportive', 'sportives'], a: 1, fb: '-f → -ve → "sportive".' },
      { s: '¿Cuál es CORRECTA?', opts: ['une rouge voiture', 'une voiture rouge', 'une voiture rouges'], a: 1, fb: 'El color va después del nombre.' },
      { s: '¿Cómo se dice "una casa pequeña"?', opts: ['une maison petite', 'une petite maison', 'un petit maison'], a: 1, fb: '"petit" va delante: "une petite maison".' },
      { s: 'des ___ jardins (joli)', opts: ['joli', 'jolis', 'jolies'], a: 1, fb: 'Plural masculino → "jolis".' },
      { s: 'une ___ amie (nouveau)', opts: ['nouveau', 'nouvelle', 'nouveaux'], a: 1, fb: 'nouveau → nouvelle (femenino).' },
      { s: '¿Cuál es CORRECTA?', opts: ['des livres intéressant', 'des livres intéressants', 'des intéressants livres'], a: 1, fb: 'Plural + s, y después del nombre.' },
    ],
  },
  {
    slug: 'adjetivos-posesivos',
    order: 10,
    title: 'Los adjetivos posesivos en francés (mon, ma, mes, ton, ta…)',
    shortTitle: 'Adjetivos posesivos',
    icon: '🔐',
    seoTitle: 'Adjetivos posesivos en francés (mon, ma, mes…): explicación y ejercicios | A1',
    seoDescription:
      'Los adjetivos posesivos en francés: mon/ma/mes, ton/ta/tes, son/sa/ses, notre/nos, votre/vos, leur/leurs. Concuerdan con el objeto, no con el dueño. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['adjetivos posesivos francés', 'mon ma mes', 'son sa ses', 'posesivos francés a1'],
    intro: [
      'Los adjetivos posesivos indican de quién es algo y van delante del sustantivo: mon livre, ta maison, ses amis. La gran diferencia con el español es que concuerdan con el OBJETO poseído (su género y número), no con el dueño.',
      'Por eso "son/sa/ses" significan los tres "su(s)" y la elección depende del objeto: "son frère" (su hermano, masc.), "sa sœur" (su hermana, fem.), "ses enfants" (sus hijos, plural). No importa si el dueño es él o ella.',
      'Regla especial muy útil: ante una palabra femenina que empieza por VOCAL, se usa la forma masculina (mon/ton/son) por motivos de pronunciación: "mon amie" (no "ma amie"), "son école".',
    ],
    sections: [
      {
        heading: 'Concuerdan con el objeto, no con el dueño',
        body: [
          'mon/ma/mes = mi(s); ton/ta/tes = tu(s); son/sa/ses = su(s) de él/ella. La forma depende del objeto: masculino → mon/ton/son; femenino → ma/ta/sa; plural → mes/tes/ses.',
          'Por eso "su hermano" y "su hermana" son distintos en francés según el objeto: "son frère" / "sa sœur" — aunque el dueño sea la misma persona.',
        ],
      },
      {
        heading: 'mon/ton/son ante vocal (aunque sea femenino)',
        body: [
          'Para evitar el choque de dos vocales, ante palabra femenina que empieza por vocal o h muda se usa mon/ton/son: "mon amie", "ton école", "son histoire". Suena mejor y es obligatorio.',
        ],
      },
      {
        heading: 'notre/nos, votre/vos, leur/leurs',
        body: [
          'Plurales de dueño: notre/nos = nuestro(s); votre/vos = vuestro(s)/su(s) de usted; leur/leurs = su(s) de ellos. Aquí solo cambia singular/plural del objeto: "notre maison" / "nos enfants", "leur voiture" / "leurs amis".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Adjetivos posesivos',
        headers: ['Dueño', 'Masc. sing.', 'Fem. sing.', 'Plural'],
        rows: [
          ['je (mi)', 'mon', 'ma', 'mes'],
          ['tu (tu)', 'ton', 'ta', 'tes'],
          ['il/elle (su)', 'son', 'sa', 'ses'],
          ['nous (nuestro)', 'notre', 'notre', 'nos'],
          ['vous (vuestro/su)', 'votre', 'votre', 'vos'],
          ['ils/elles (su)', 'leur', 'leur', 'leurs'],
        ],
      },
    ],
    examples: [
      { en: 'mon frère et ma sœur', es: 'mi hermano y mi hermana', note: 'concuerda con el objeto (frère masc., sœur fem.).' },
      { en: 'son frère / sa sœur / ses enfants', es: 'su hermano / su hermana / sus hijos', note: 'la forma depende del objeto, no del dueño.' },
      { en: 'mon amie', es: 'mi amiga', note: 'fem. ante vocal → "mon" (no "ma amie").' },
      { en: 'notre maison', es: 'nuestra casa' },
      { en: 'leurs amis', es: 'sus amigos (de ellos)', note: 'plural → leurs.' },
      { en: 'Quel est ton numéro ?', es: '¿Cuál es tu número?' },
    ],
    contrast: [
      { es: 'su hermano (de él/ella)', en: 'son frère', note: '"frère" es masculino → son.' },
      { es: 'su hermana (de él/ella)', en: 'sa sœur', note: '"sœur" es femenino → sa. El dueño no importa.' },
      { es: 'mi amiga', en: 'mon amie', note: 'femenino ante vocal → "mon".' },
      { es: 'nuestros hijos', en: 'nos enfants', note: 'plural → nos.' },
      { es: 'sus amigos (de ellos)', en: 'leurs amis', note: 'dueño plural + objeto plural → leurs.' },
    ],
    commonMistakes: [
      { wrong: 'ma amie', right: 'mon amie', note: 'Femenino ante vocal → mon/ton/son.' },
      { wrong: 'sa frère', right: 'son frère', note: '"frère" es masculino → "son".' },
      { wrong: 'son sœur', right: 'sa sœur', note: '"sœur" es femenino → "sa".' },
      { wrong: 'nos maison', right: 'notre maison', note: 'Objeto singular → "notre".' },
      { wrong: 'leur amis', right: 'leurs amis', note: 'Objeto plural → "leurs".' },
    ],
    tip: 'El posesivo concuerda con el OBJETO, no con el dueño: "son frère / sa sœur". Y ante palabra femenina que empieza por vocal, usa mon/ton/son: "mon amie".',
    questions: [
      { s: '___ frère s’appelle Paul. (mi)', opts: ['mon', 'ma', 'mes'], a: 0, fb: '"frère" masc. → "mon".' },
      { s: '___ sœur a dix ans. (mi)', opts: ['mon', 'ma', 'mes'], a: 1, fb: '"sœur" fem. → "ma".' },
      { s: '___ enfants sont à l’école. (mis)', opts: ['mon', 'ma', 'mes'], a: 2, fb: 'Plural → "mes".' },
      { s: '___ amie est gentille. (mi, fem. ante vocal)', opts: ['mon', 'ma', 'mes'], a: 0, fb: 'Fem. ante vocal → "mon amie".' },
      { s: 'Pierre adore ___ sœur. (su, de él)', opts: ['son', 'sa', 'ses'], a: 1, fb: '"sœur" fem. → "sa", aunque el dueño sea hombre.' },
      { s: 'Anne aime ___ frère. (su, de ella)', opts: ['son', 'sa', 'ses'], a: 0, fb: '"frère" masc. → "son", aunque la dueña sea mujer.' },
      { s: '___ maison est petite. (nuestra)', opts: ['notre', 'nos', 'votre'], a: 0, fb: 'Objeto singular → "notre".' },
      { s: '___ enfants jouent. (nuestros)', opts: ['notre', 'nos', 'votre'], a: 1, fb: 'Plural → "nos".' },
      { s: 'Ils vendent ___ voiture. (su, de ellos)', opts: ['leur', 'leurs', 'son'], a: 0, fb: 'Objeto singular → "leur".' },
      { s: 'Ils invitent ___ amis. (sus, de ellos)', opts: ['leur', 'leurs', 'ses'], a: 1, fb: 'Objeto plural → "leurs".' },
      { s: '¿Cuál es CORRECTA?', opts: ['ma amie', 'mon amie', 'mes amie'], a: 1, fb: 'Fem. ante vocal → "mon amie".' },
      { s: '¿Cómo se dice "su hermana" (de Pedro)?', opts: ['son sœur', 'sa sœur', 'ses sœur'], a: 1, fb: '"sœur" es femenino → "sa sœur".' },
      { s: 'Quel est ___ numéro ? (tu)', opts: ['ton', 'ta', 'tes'], a: 0, fb: '"numéro" masc. → "ton".' },
      { s: '___ parents habitent à Lyon. (tus)', opts: ['ton', 'ta', 'tes'], a: 2, fb: 'Plural → "tes".' },
    ],
  },
  {
    slug: 'articulos-partitivos',
    order: 11,
    title: 'Los artículos partitivos en francés (du, de la, de l’, des)',
    shortTitle: 'Artículos partitivos (du/de la)',
    icon: '🥖',
    seoTitle: 'Los artículos partitivos en francés (du, de la, des): explicación y ejercicios | A1',
    seoDescription:
      'Los artículos partitivos du, de la, de l’, des: cómo decir "algo de" comida o cantidad indeterminada en francés. Su cambio a "de" en negativo. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['artículos partitivos francés', 'du de la des', 'partitivo francés comida', 'de en negativo francés a1'],
    intro: [
      'El artículo partitivo es uno de los temas más "franceses" porque el español NO tiene un equivalente directo. Sirve para hablar de una cantidad indeterminada, sobre todo de comida y bebida: "Je mange du pain" (como pan), "Je bois de l’eau" (bebo agua).',
      'Las formas son: du (masculino), de la (femenino), de l’ (ante vocal) y des (plural). La idea es "una parte de" algo que no se cuenta: pan, agua, leche, dinero, paciencia.',
      'Regla de oro: en una frase NEGATIVA, todos los partitivos se convierten en "de" (o "d’" ante vocal): "Je mange du pain" → "Je ne mange pas de pain"; "Je bois de l’eau" → "Je ne bois pas d’eau".',
    ],
    sections: [
      {
        heading: 'Las formas: du, de la, de l’, des',
        body: [
          'du = de + le (masculino): "du café, du pain". de la (femenino): "de la viande, de la chance". de l’ (ante vocal): "de l’eau, de l’argent". des (plural): "des fruits".',
          'Se usa cuando no precisas la cantidad: "Je veux du café" = quiero (algo de) café.',
        ],
      },
      {
        heading: 'Partitivo vs definido vs indefinido',
        body: [
          'Definido (le/la): cosa concreta o en general → "J’aime le café" (me gusta el café, en general). Partitivo (du/de la): una parte/cantidad → "Je bois du café" (bebo café, algo). Indefinido (un/une): una unidad contable → "Je mange un croissant".',
        ],
      },
      {
        heading: 'En negativo: todo se vuelve "de"',
        body: [
          'En una oración negativa, du/de la/de l’/des → de/d’: "Je n’ai pas de pain", "Il ne boit pas de bière", "Je ne mange pas d’oranges".',
          'También con expresiones de cantidad: "beaucoup de pain", "un peu de lait", "un kilo de pommes".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Los partitivos',
        headers: ['Tipo', 'Forma', 'Ejemplo'],
        rows: [
          ['masculino', 'du', 'du pain'],
          ['femenino', 'de la', 'de la viande'],
          ['ante vocal', 'de l’', 'de l’eau'],
          ['plural', 'des', 'des fruits'],
        ],
      },
      {
        caption: 'Afirmativa → negativa (todo → de)',
        headers: ['Afirmativa', 'Negativa'],
        rows: [
          ['Je mange du pain.', 'Je ne mange pas de pain.'],
          ['Je bois de l’eau.', 'Je ne bois pas d’eau.'],
          ['Il a des amis.', 'Il n’a pas d’amis.'],
        ],
      },
    ],
    examples: [
      { en: 'Je mange du pain.', es: 'Como pan.', note: 'partitivo masculino.' },
      { en: 'Je bois de l’eau.', es: 'Bebo agua.', note: 'ante vocal → de l’.' },
      { en: 'Tu veux de la soupe ?', es: '¿Quieres sopa?', note: 'partitivo femenino.' },
      { en: 'Il achète des fruits.', es: 'Compra fruta.', note: 'plural → des.' },
      { en: 'Je ne mange pas de viande.', es: 'No como carne.', note: 'negativo → de.' },
      { en: 'Beaucoup de café.', es: 'Mucho café.', note: 'cantidad → de.' },
    ],
    contrast: [
      { es: 'Como pan.', en: 'Je mange du pain.', note: 'el español no pone artículo; el francés sí (partitivo).' },
      { es: 'Bebo agua.', en: 'Je bois de l’eau.', note: 'ante vocal → "de l’".' },
      { es: 'No bebo café.', en: 'Je ne bois pas de café.', note: 'en negativo, "du" → "de".' },
      { es: 'Me gusta el café (en general).', en: 'J’aime le café.', note: 'sentido general → definido, no partitivo.' },
      { es: 'Mucha leche.', en: 'Beaucoup de lait.', note: 'cantidad → "de".' },
    ],
    commonMistakes: [
      { wrong: 'Je mange pain.', right: 'Je mange du pain.', note: 'Hace falta el partitivo "du".' },
      { wrong: 'Je bois du eau.', right: 'Je bois de l’eau.', note: 'Ante vocal → "de l’".' },
      { wrong: 'Je ne mange pas du pain.', right: 'Je ne mange pas de pain.', note: 'En negativo, "du" → "de".' },
      { wrong: 'Beaucoup du café.', right: 'Beaucoup de café.', note: 'Tras cantidad → "de".' },
      { wrong: 'J’aime du café. (en general)', right: 'J’aime le café.', note: 'Gusto general → artículo definido.' },
    ],
    tip: 'El partitivo (du/de la/de l’/des) dice "algo de" comida/bebida, donde el español no pone nada. En negativo y tras cantidad, todo se vuelve "de": "pas de café", "beaucoup de pain".',
    questions: [
      { s: 'Je mange ___ pain.', opts: ['du', 'de la', 'de l’', 'des'], a: 0, fb: '"pain" masc. → "du".' },
      { s: 'Je bois ___ eau.', opts: ['du', 'de la', 'de l’', 'des'], a: 2, fb: 'Ante vocal → "de l’".' },
      { s: 'Tu veux ___ soupe ?', opts: ['du', 'de la', 'de l’', 'des'], a: 1, fb: '"soupe" fem. → "de la".' },
      { s: 'Il achète ___ fruits.', opts: ['du', 'de la', 'de l’', 'des'], a: 3, fb: 'Plural → "des".' },
      { s: 'Je ne bois pas ___ café. (negativo)', opts: ['du', 'de', 'le'], a: 1, fb: 'En negativo → "de".' },
      { s: 'Beaucoup ___ lait.', opts: ['du', 'de', 'le'], a: 1, fb: 'Tras cantidad → "de".' },
      { s: 'J’aime ___ café. (en general)', opts: ['du', 'le', 'de'], a: 1, fb: 'Sentido general → "le".' },
      { s: 'Je mange ___ viande.', opts: ['du', 'de la', 'des'], a: 1, fb: '"viande" fem. → "de la".' },
      { s: 'Il n’a pas ___ argent. (negativo, ante vocal)', opts: ['de l’', 'd’', 'du'], a: 1, fb: 'Negativo + vocal → "d’argent".' },
      { s: 'Un kilo ___ pommes.', opts: ['des', 'de', 'du'], a: 1, fb: 'Tras cantidad → "de pommes".' },
      { s: '¿Cómo se dice "Como pan"?', opts: ['Je mange pain.', 'Je mange du pain.', 'Je mange le pain.'], a: 1, fb: 'Partitivo → "du pain".' },
      { s: '¿Cuál es CORRECTA? (negativo)', opts: ['Je ne mange pas du pain.', 'Je ne mange pas de pain.', 'Je ne mange pas le pain.'], a: 1, fb: 'En negativo → "de pain".' },
      { s: 'Vous voulez ___ thé ?', opts: ['du', 'de la', 'des'], a: 0, fb: '"thé" masc. → "du".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Je bois du eau.', 'Je bois de l’eau.', 'Je bois de la eau.'], a: 1, fb: 'Ante vocal → "de l’eau".' },
    ],
  },
  {
    slug: 'preposiciones-lugar-pais',
    order: 12,
    title: 'Las preposiciones de lugar y de países en francés (à, en, au, chez…)',
    shortTitle: 'Preposiciones de lugar y países',
    icon: '🗺️',
    seoTitle: 'Preposiciones de lugar y países en francés (à, en, au, chez): ejercicios | A1',
    seoDescription:
      'Cómo usar à, en, au, aux con ciudades y países en francés, además de chez, dans, sur, sous. Reglas según el género del país. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['preposiciones francés', 'à en au países francés', 'chez francés', 'à Paris en France au Japon a1'],
    intro: [
      'Para decir DÓNDE estás o A DÓNDE vas, el francés usa distintas preposiciones según el tipo de lugar. Con ciudades se usa "à" (à Paris). Con países depende del género: "en" para países femeninos, "au" para masculinos y "aux" para plurales.',
      'Reglas de países: en + país femenino (la mayoría que terminan en -e): en France, en Italie, en Espagne. au + país masculino: au Japon, au Canada, au Portugal. aux + país plural: aux États-Unis, aux Pays-Bas.',
      'Otras preposiciones esenciales: "chez" (en/a casa de: chez moi, chez le médecin), y las de posición física dans (dentro de), sur (sobre), sous (debajo de), devant (delante), derrière (detrás), entre (entre), à côté de (al lado de).',
    ],
    sections: [
      {
        heading: 'Ciudades y países',
        body: [
          'Ciudad → à: "J’habite à Bogotá", "Je vais à Paris". País femenino → en: "en France, en Colombie". País masculino → au: "au Japon, au Brésil". País plural → aux: "aux États-Unis".',
          'Truco: la mayoría de países terminados en -e son femeninos (la France → en France). Excepción famosa: le Mexique (masculino → au Mexique).',
        ],
      },
      {
        heading: 'chez = en/a casa de',
        body: [
          '"chez" no tiene una sola traducción: significa "en/a casa de" o "donde" alguien: "chez moi" (en mi casa), "chez Marie", "chez le médecin" (en el médico), "chez le coiffeur".',
        ],
      },
      {
        heading: 'Preposiciones de posición',
        body: [
          'dans (dentro de), sur (sobre), sous (debajo de), devant (delante de), derrière (detrás de), entre (entre), à côté de (al lado de). "Le chat est sous la table", "à côté de la porte".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Ciudades y países',
        headers: ['Tipo de lugar', 'Preposición', 'Ejemplo'],
        rows: [
          ['ciudad', 'à', 'à Paris, à Bogotá'],
          ['país femenino', 'en', 'en France, en Italie'],
          ['país masculino', 'au', 'au Japon, au Canada'],
          ['país plural', 'aux', 'aux États-Unis'],
        ],
      },
      {
        caption: 'Posición física',
        headers: ['Francés', 'Español', 'Ejemplo'],
        rows: [
          ['dans', 'dentro de', 'dans la boîte'],
          ['sur', 'sobre', 'sur la table'],
          ['sous', 'debajo de', 'sous le lit'],
          ['à côté de', 'al lado de', 'à côté de la porte'],
        ],
      },
    ],
    examples: [
      { en: 'J’habite à Paris.', es: 'Vivo en París.', note: 'ciudad → à.' },
      { en: 'Je vais en France.', es: 'Voy a Francia.', note: 'país femenino → en.' },
      { en: 'Il travaille au Japon.', es: 'Trabaja en Japón.', note: 'país masculino → au.' },
      { en: 'Elle vit aux États-Unis.', es: 'Vive en Estados Unidos.', note: 'país plural → aux.' },
      { en: 'Je suis chez moi.', es: 'Estoy en mi casa.', note: 'chez = en casa de.' },
      { en: 'Le chat est sous la table.', es: 'El gato está debajo de la mesa.', note: 'sous = debajo.' },
    ],
    contrast: [
      { es: 'Vivo en París.', en: 'J’habite à Paris.', note: 'ciudad → "à".' },
      { es: 'Voy a Francia.', en: 'Je vais en France.', note: 'país femenino → "en".' },
      { es: 'Voy a Japón.', en: 'Je vais au Japon.', note: 'país masculino → "au".' },
      { es: 'En mi casa.', en: 'Chez moi.', note: '"chez" = en casa de.' },
      { es: 'Al lado de la puerta.', en: 'À côté de la porte.', note: '"à côté de".' },
    ],
    commonMistakes: [
      { wrong: 'Je vais à France.', right: 'Je vais en France.', note: 'País femenino → "en".' },
      { wrong: 'J’habite en Paris.', right: 'J’habite à Paris.', note: 'Ciudad → "à".' },
      { wrong: 'Je vais en Japon.', right: 'Je vais au Japon.', note: 'País masculino → "au".' },
      { wrong: 'À la maison de moi.', right: 'Chez moi.', note: 'Usa "chez" para "en casa de".' },
      { wrong: 'Je vais à les États-Unis.', right: 'Je vais aux États-Unis.', note: 'À + les → "aux".' },
    ],
    tip: 'Ciudad → à (à Paris). País femenino → en (en France); masculino → au (au Japon); plural → aux (aux États-Unis). Y "chez" = en/a casa de.',
    questions: [
      { s: 'J’habite ___ Bogotá.', opts: ['à', 'en', 'au', 'aux'], a: 0, fb: 'Ciudad → "à".' },
      { s: 'Je vais ___ France.', opts: ['à', 'en', 'au', 'aux'], a: 1, fb: 'País femenino → "en".' },
      { s: 'Il travaille ___ Japon.', opts: ['à', 'en', 'au', 'aux'], a: 2, fb: 'País masculino → "au".' },
      { s: 'Elle vit ___ États-Unis.', opts: ['à', 'en', 'au', 'aux'], a: 3, fb: 'País plural → "aux".' },
      { s: 'Je vais ___ Italie.', opts: ['à', 'en', 'au'], a: 1, fb: 'País femenino → "en Italie".' },
      { s: 'Nous allons ___ Canada.', opts: ['à', 'en', 'au'], a: 2, fb: 'País masculino → "au Canada".' },
      { s: 'Je suis ___ moi. (en mi casa)', opts: ['à', 'chez', 'dans'], a: 1, fb: '"chez moi" = en mi casa.' },
      { s: 'Le livre est ___ la table.', opts: ['sur', 'sous', 'dans'], a: 0, fb: 'Sobre → "sur".' },
      { s: 'Le chat est ___ le lit. (debajo)', opts: ['sur', 'sous', 'dans'], a: 1, fb: 'Debajo → "sous".' },
      { s: 'La banque est ___ de la poste. (al lado)', opts: ['à côté', 'sur', 'sous'], a: 0, fb: '"à côté de" = al lado de.' },
      { s: '¿Cómo se dice "Voy a Francia"?', opts: ['Je vais à France.', 'Je vais en France.', 'Je vais au France.'], a: 1, fb: 'País femenino → "en France".' },
      { s: '¿Cuál es CORRECTA?', opts: ['J’habite en Paris.', 'J’habite à Paris.', 'J’habite au Paris.'], a: 1, fb: 'Ciudad → "à Paris".' },
      { s: 'Je vais ___ le médecin.', opts: ['à', 'chez', 'en'], a: 1, fb: '"chez le médecin".' },
      { s: 'Nous voyageons ___ Portugal.', opts: ['en', 'au', 'à'], a: 1, fb: 'País masculino → "au Portugal".' },
    ],
  },
  {
    slug: 'futuro-proximo',
    order: 13,
    title: 'El futuro próximo en francés (aller + infinitivo)',
    shortTitle: 'Futuro próximo (aller + inf.)',
    icon: '⏩',
    seoTitle: 'El futuro próximo en francés (aller + infinitivo): explicación y ejercicios | A1',
    seoDescription:
      'Cómo hablar del futuro en francés con el futur proche: aller + infinitivo (je vais manger). Conjugación de aller, forma negativa y comparación con el español "ir a". Nivel A1.',
    keywords: ['futuro próximo francés', 'futur proche', 'aller + infinitif', 'je vais manger a1'],
    intro: [
      'Para hablar de planes y del futuro cercano, el francés usa el "futur proche": el verbo "aller" (ir) conjugado en presente + un verbo en INFINITIVO. "Je vais manger" = "Voy a comer".',
      'Es idéntico a la estructura española "ir a + infinitivo", con UNA diferencia importante: el francés NO pone la preposición "à". Se dice "je vais manger", no "je vais à manger".',
      'Primero necesitas "aller" en presente: je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont. Es un verbo irregular muy frecuente que también verás en el tema de verbos irregulares.',
    ],
    sections: [
      {
        heading: 'La fórmula: aller (presente) + infinitivo',
        body: [
          'Conjuga "aller" según el sujeto y añade el verbo principal en infinitivo: "Je vais partir", "Tu vas étudier", "Nous allons manger", "Ils vont arriver".',
          'A diferencia del español "voy A comer", en francés NO hay "à": es "je vais manger".',
        ],
      },
      {
        heading: 'Marcadores de tiempo',
        body: [
          'Suele acompañarse de expresiones de futuro cercano: demain (mañana), ce soir (esta noche), la semaine prochaine (la próxima semana), bientôt (pronto). "Demain, je vais voyager."',
        ],
      },
      {
        heading: 'La negación',
        body: [
          'La negación rodea a "aller" (el verbo conjugado), no al infinitivo: "Je ne vais pas sortir", "Il ne va pas venir". El "ne… pas" abraza a "vais/va".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'aller au présent (base del futur proche)',
        headers: ['Pronombre', 'aller', 'Ejemplo'],
        rows: [
          ['je', 'vais', 'je vais manger'],
          ['tu', 'vas', 'tu vas partir'],
          ['il / elle / on', 'va', 'elle va étudier'],
          ['nous', 'allons', 'nous allons sortir'],
          ['vous', 'allez', 'vous allez voir'],
          ['ils / elles', 'vont', 'ils vont arriver'],
        ],
      },
    ],
    examples: [
      { en: 'Je vais manger.', es: 'Voy a comer.', note: 'sin "à" antes del infinitivo.' },
      { en: 'Demain, nous allons voyager.', es: 'Mañana vamos a viajar.' },
      { en: 'Tu vas étudier ce soir ?', es: '¿Vas a estudiar esta noche?' },
      { en: 'Ils vont arriver bientôt.', es: 'Van a llegar pronto.' },
      { en: 'Je ne vais pas sortir.', es: 'No voy a salir.', note: 'negación sobre "aller".' },
      { en: 'Elle va commencer un nouveau travail.', es: 'Va a empezar un nuevo trabajo.' },
    ],
    contrast: [
      { es: 'Voy a comer.', en: 'Je vais manger.', note: 'el francés NO usa "à".' },
      { es: 'Vamos a viajar.', en: 'Nous allons voyager.', note: 'aller + infinitivo.' },
      { es: 'No voy a salir.', en: 'Je ne vais pas sortir.', note: 'la negación rodea a "vais".' },
      { es: '¿Vas a estudiar?', en: 'Tu vas étudier ?', note: 'con "tu" → "vas".' },
      { es: 'Van a llegar.', en: 'Ils vont arriver.', note: 'con "ils" → "vont".' },
    ],
    commonMistakes: [
      { wrong: 'Je vais à manger.', right: 'Je vais manger.', note: 'El futur proche no lleva "à".' },
      { wrong: 'Je vais mange.', right: 'Je vais manger.', note: 'El segundo verbo va en INFINITIVO.' },
      { wrong: 'Nous allons à voyager.', right: 'Nous allons voyager.', note: 'Sin "à".' },
      { wrong: 'Je ne vais sortir pas.', right: 'Je ne vais pas sortir.', note: 'El "pas" va después de "vais".' },
      { wrong: 'Ils va arriver.', right: 'Ils vont arriver.', note: 'Con "ils" → "vont".' },
    ],
    tip: 'Futur proche = aller (presente) + INFINITIVO, SIN "à": "je vais manger". La negación rodea a "aller": "je ne vais pas sortir".',
    questions: [
      { s: 'Je ___ manger. (futur proche)', opts: ['vais', 'vas', 'va', 'vont'], a: 0, fb: 'Con "je" → "vais".' },
      { s: 'Tu ___ partir demain.', opts: ['vais', 'vas', 'va', 'allez'], a: 1, fb: 'Con "tu" → "vas".' },
      { s: 'Elle ___ étudier ce soir.', opts: ['vais', 'vas', 'va', 'vont'], a: 2, fb: 'Con "elle" → "va".' },
      { s: 'Nous ___ voyager.', opts: ['allons', 'allez', 'vont', 'vas'], a: 0, fb: 'Con "nous" → "allons".' },
      { s: 'Vous ___ voir le film.', opts: ['allons', 'allez', 'vont', 'va'], a: 1, fb: 'Con "vous" → "allez".' },
      { s: 'Ils ___ arriver bientôt.', opts: ['allons', 'allez', 'vont', 'va'], a: 2, fb: 'Con "ils" → "vont".' },
      { s: 'Je vais ___ . (le 2.º verbo)', opts: ['mange', 'manger', 'mangé'], a: 1, fb: 'El segundo verbo va en infinitivo: "manger".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Je vais à manger.', 'Je vais manger.', 'Je vais à manges.'], a: 1, fb: 'Sin "à": "je vais manger".' },
      { s: 'Negativo: "Je ___ sortir."', opts: ['ne vais pas', 'vais ne pas', 'ne pas vais'], a: 0, fb: '"Je ne vais pas sortir".' },
      { s: '¿Cómo se dice "Vamos a viajar"?', opts: ['Nous allons à voyager.', 'Nous allons voyager.', 'Nous vont voyager.'], a: 1, fb: '"Nous allons voyager".' },
      { s: 'Demain, je ___ travailler.', opts: ['vais', 'va', 'vont'], a: 0, fb: 'Con "je" → "vais".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Tu vas étudier.', 'Tu vas étudies.', 'Tu va étudier.'], a: 0, fb: '"Tu vas" + infinitivo.' },
      { s: 'On ___ regarder un film.', opts: ['vais', 'va', 'vont'], a: 1, fb: '"on" como "il" → "va".' },
      { s: 'Negativo: "Il ___ venir."', opts: ['ne va pas', 'va ne pas', 'ne pas va'], a: 0, fb: '"Il ne va pas venir".' },
    ],
  },
  {
    slug: 'il-y-a-c-est',
    order: 14,
    title: 'Il y a (hay) y c’est / il est en francés',
    shortTitle: 'Il y a · c’est / il est',
    icon: '📍',
    seoTitle: 'Il y a (hay) y c’est / il est en francés: explicación y ejercicios | A1',
    seoDescription:
      'Cómo decir "hay" en francés con "il y a", y la diferencia entre c’est e il est para identificar y describir. Forma negativa y preguntas. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['il y a francés', 'hay en francés', 'c’est il est diferencia', 'c’est vs il est a1'],
    intro: [
      '"Il y a" es la fórmula fija para decir "hay": expresa la existencia de algo en un lugar, sea singular o plural. "Il y a un livre sur la table", "Il y a beaucoup de gens". A diferencia del español, no cambia: siempre "il y a".',
      'No confundas "il y a" (hay) con "il est" (él es): se parecen pero son cosas distintas. "Il y a un problème" (hay un problema) ≠ "Il est médecin" (él es médico).',
      'La otra pareja que confunde es "c’est" vs "il/elle est". Regla práctica: "c’est" va con un nombre o pronombre ("C’est un médecin", "C’est Marie"); "il/elle est" va con un adjetivo o una profesión sin artículo ("Il est grand", "Elle est médecin").',
    ],
    sections: [
      {
        heading: 'Il y a = hay (invariable)',
        body: [
          'Sirve para singular y plural sin cambiar: "Il y a une chaise" / "Il y a trois chaises". Negativo: "Il n’y a pas de…": "Il n’y a pas de pain". Pregunta: "Est-ce qu’il y a… ?" o "Y a-t-il… ?".',
        ],
      },
      {
        heading: 'c’est vs il/elle est',
        body: [
          '"c’est" + artículo + nombre o + pronombre/nombre propio: "C’est un livre", "C’est mon ami", "C’est Paris". "il/elle est" + adjetivo o + profesión sin artículo: "Il est intelligent", "Elle est avocate".',
          'Por eso: "C’est un médecin" (con artículo → c’est) pero "Il est médecin" (sin artículo → il est). Las dos son correctas; cambia la construcción.',
        ],
      },
      {
        heading: 'En plural: ce sont, ils/elles sont',
        body: [
          'El plural de "c’est" es "ce sont": "Ce sont mes amis". El de "il est" es "ils sont": "Ils sont étudiants".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Il y a (hay)',
        headers: ['Forma', 'Ejemplo'],
        rows: [
          ['Afirmativa', 'Il y a un café ici.'],
          ['Negativa', 'Il n’y a pas de café.'],
          ['Pregunta', 'Est-ce qu’il y a un café ?'],
        ],
      },
      {
        caption: 'c’est vs il/elle est',
        headers: ['Se usa', 'Estructura', 'Ejemplo'],
        rows: [
          ['c’est', '+ artículo + nombre / nombre propio', 'C’est un médecin.'],
          ['il/elle est', '+ adjetivo / profesión sin artículo', 'Il est médecin.'],
          ['ce sont (plural)', '+ nombre plural', 'Ce sont mes amis.'],
        ],
      },
    ],
    examples: [
      { en: 'Il y a un livre sur la table.', es: 'Hay un libro sobre la mesa.', note: '"il y a" = hay.' },
      { en: 'Il y a beaucoup de gens.', es: 'Hay mucha gente.', note: 'invariable en plural.' },
      { en: 'Il n’y a pas de pain.', es: 'No hay pan.', note: 'negativo → pas de.' },
      { en: 'C’est un bon restaurant.', es: 'Es un buen restaurante.', note: 'c’est + artículo + nombre.' },
      { en: 'Il est médecin.', es: 'Él es médico.', note: 'profesión sin artículo → il est.' },
      { en: 'Ce sont mes amis.', es: 'Son mis amigos.', note: 'plural → ce sont.' },
    ],
    contrast: [
      { es: 'Hay un problema.', en: 'Il y a un problème.', note: '"hay" → "il y a", invariable.' },
      { es: 'No hay leche.', en: 'Il n’y a pas de lait.', note: 'negativo → "pas de".' },
      { es: 'Es un médico.', en: 'C’est un médecin.', note: 'con artículo → "c’est".' },
      { es: 'Es médico.', en: 'Il est médecin.', note: 'profesión sin artículo → "il est".' },
      { es: 'Son mis amigos.', en: 'Ce sont mes amis.', note: 'plural → "ce sont".' },
    ],
    commonMistakes: [
      { wrong: 'Il a un livre sur la table. (=hay)', right: 'Il y a un livre sur la table.', note: '"hay" es "il y a", no "il a".' },
      { wrong: 'Il y a pas de pain.', right: 'Il n’y a pas de pain.', note: 'Negativo: "il n’y a pas de".' },
      { wrong: 'Il est un médecin.', right: 'C’est un médecin. / Il est médecin.', note: 'Con artículo → "c’est".' },
      { wrong: 'C’est médecin.', right: 'Il est médecin.', note: 'Sin artículo → "il est".' },
      { wrong: 'C’est mes amis.', right: 'Ce sont mes amis.', note: 'Plural → "ce sont".' },
    ],
    tip: '"hay" = il y a (invariable; negativo "il n’y a pas de"). Y: "c’est" + artículo/nombre (C’est un médecin); "il/elle est" + adjetivo/profesión sin artículo (Il est médecin).',
    questions: [
      { s: '___ un livre sur la table. (hay)', opts: ['Il y a', 'Il est', 'Il a'], a: 0, fb: '"hay" → "il y a".' },
      { s: '___ beaucoup de gens. (hay)', opts: ['Il y a', 'Ils sont', 'Il a'], a: 0, fb: '"il y a" es invariable.' },
      { s: '___ pas de café. (no hay)', opts: ['Il y a', 'Il n’y a', 'Il est'], a: 1, fb: 'Negativo → "il n’y a pas de".' },
      { s: '___ un bon restaurant. (con artículo)', opts: ['C’est', 'Il est', 'Il y a'], a: 0, fb: 'Con artículo → "c’est".' },
      { s: '___ médecin. (profesión sin artículo)', opts: ['C’est', 'Il est', 'Il y a'], a: 1, fb: 'Sin artículo → "il est".' },
      { s: '___ mes amis. (plural)', opts: ['C’est', 'Ce sont', 'Il est'], a: 1, fb: 'Plural → "ce sont".' },
      { s: '___ Marie. (nombre propio)', opts: ['C’est', 'Il est', 'Il y a'], a: 0, fb: 'Nombre propio → "c’est".' },
      { s: '___ très intelligente. (adjetivo)', opts: ['C’est', 'Elle est', 'Il y a'], a: 1, fb: 'Adjetivo → "elle est".' },
      { s: 'Est-ce qu’___ un problème ?', opts: ['il y a', 'il est', 'c’est'], a: 0, fb: 'Pregunta de existencia → "il y a".' },
      { s: '___ avocate. (profesión sin artículo)', opts: ['C’est', 'Elle est', 'Il y a'], a: 1, fb: 'Sin artículo → "elle est".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Il a un café ici.', 'Il y a un café ici.', 'Il est un café ici.'], a: 1, fb: '"hay" → "il y a".' },
      { s: '¿Cómo se dice "No hay pan"?', opts: ['Il y a pas de pain.', 'Il n’y a pas de pain.', 'Il n’est pas de pain.'], a: 1, fb: '"Il n’y a pas de pain".' },
      { s: '¿Cuál es CORRECTA? (es un médico)', opts: ['Il est un médecin.', 'C’est un médecin.', 'Il y a un médecin.'], a: 1, fb: 'Con artículo → "c’est un médecin".' },
      { s: '___ étudiants. (plural, profesión)', opts: ['C’est', 'Ils sont', 'Il est'], a: 1, fb: 'Plural + profesión → "ils sont".' },
    ],
  },
  {
    slug: 'verbos-irregulares-aller-faire-venir',
    order: 15,
    title: 'Verbos irregulares frecuentes: aller, faire, venir',
    shortTitle: 'aller, faire, venir',
    icon: '🧩',
    seoTitle: 'Verbos irregulares en francés (aller, faire, venir): conjugación y ejercicios | A1',
    seoDescription:
      'Conjugación en presente de tres verbos irregulares muy frecuentes en francés: aller (ir), faire (hacer) y venir (venir). Usos, expresiones y ejercicios. Nivel A1.',
    keywords: ['verbos irregulares francés', 'aller faire venir', 'conjugación aller faire venir', 'verbos frecuentes francés a1'],
    intro: [
      'Junto a "être" y "avoir", hay tres verbos irregulares que aparecen en casi todas las conversaciones del A1: aller (ir), faire (hacer) y venir (venir). No siguen el patrón regular, así que hay que memorizarlos.',
      '"aller" sirve para el movimiento (je vais à Paris) y para el futuro próximo (je vais manger). "faire" sirve para actividades, deporte, clima y tareas (faire du sport, il fait beau). "venir" indica procedencia y movimiento hacia el hablante (je viens de Colombie).',
      'Una construcción muy útil con "venir": "venir de + infinitivo" expresa el pasado reciente ("acabar de"): "Je viens de manger" = "Acabo de comer".',
    ],
    sections: [
      {
        heading: 'aller (ir) y faire (hacer)',
        body: [
          'aller: je vais, tu vas, il va, nous allons, vous allez, ils vont. Movimiento y futuro próximo.',
          'faire: je fais, tu fais, il fait, nous faisons, vous faites, ils font. Ojo con "vous faites" (irregular) y "ils font". Se usa en muchas expresiones: faire du sport, faire les courses, il fait beau (hace buen tiempo).',
        ],
      },
      {
        heading: 'venir (venir) y el pasado reciente',
        body: [
          'venir: je viens, tu viens, il vient, nous venons, vous venez, ils viennent. Indica procedencia: "Je viens de Colombie" (vengo de Colombia).',
          '"venir de + infinitivo" = acabar de: "Elle vient d’arriver" (acaba de llegar). No lo confundas con "venir de + lugar" (procedencia).',
        ],
      },
      {
        heading: 'El clima con faire',
        body: [
          'Para el tiempo atmosférico, el francés usa "il fait": "il fait beau" (hace buen tiempo), "il fait froid/chaud" (hace frío/calor). Como el español "hacer", no "ser/estar".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'aller / faire / venir (presente)',
        headers: ['Pronombre', 'aller', 'faire', 'venir'],
        rows: [
          ['je', 'vais', 'fais', 'viens'],
          ['tu', 'vas', 'fais', 'viens'],
          ['il / elle', 'va', 'fait', 'vient'],
          ['nous', 'allons', 'faisons', 'venons'],
          ['vous', 'allez', 'faites', 'venez'],
          ['ils / elles', 'vont', 'font', 'viennent'],
        ],
      },
    ],
    examples: [
      { en: 'Je vais au travail en bus.', es: 'Voy al trabajo en bus.', note: 'aller = ir.' },
      { en: 'Nous faisons du sport.', es: 'Hacemos deporte.', note: 'faire du sport.' },
      { en: 'Il fait beau aujourd’hui.', es: 'Hoy hace buen tiempo.', note: 'el clima → "il fait".' },
      { en: 'Je viens de Colombie.', es: 'Vengo de Colombia.', note: 'venir de + lugar = procedencia.' },
      { en: 'Elle vient d’arriver.', es: 'Acaba de llegar.', note: 'venir de + infinitivo = acabar de.' },
      { en: 'Vous faites les courses ?', es: '¿Hacen/Hacéis las compras?', note: '"vous faites" irregular.' },
    ],
    contrast: [
      { es: 'Voy a la escuela.', en: 'Je vais à l’école.', note: 'aller = ir.' },
      { es: 'Hace frío.', en: 'Il fait froid.', note: 'el clima con "faire", como "hacer".' },
      { es: 'Vengo de Colombia.', en: 'Je viens de Colombie.', note: 'procedencia → "venir de".' },
      { es: 'Acabo de comer.', en: 'Je viens de manger.', note: 'pasado reciente → "venir de + infinitivo".' },
      { es: 'Hacemos las compras.', en: 'Nous faisons les courses.', note: 'faire les courses.' },
    ],
    commonMistakes: [
      { wrong: 'Vous faisez', right: 'Vous faites', note: '"faire" es irregular: "vous faites".' },
      { wrong: 'Ils faient', right: 'Ils font', note: 'Con "ils" → "font".' },
      { wrong: 'Il est froid. (clima)', right: 'Il fait froid.', note: 'El clima va con "faire": "il fait froid".' },
      { wrong: 'Je viens Colombie.', right: 'Je viens de Colombie.', note: 'Procedencia → "venir DE".' },
      { wrong: 'Ils vient', right: 'Ils viennent', note: 'Con "ils" → "viennent".' },
    ],
    tip: 'Memoriza estos tres: aller (vais, vas, va, allons, allez, vont), faire (fais, fais, fait, faisons, faites, font), venir (viens, viens, vient, venons, venez, viennent). El clima usa "il fait".',
    questions: [
      { s: 'Je ___ au travail. (aller)', opts: ['vais', 'vas', 'va', 'vont'], a: 0, fb: 'Con "je" → "vais".' },
      { s: 'Nous ___ du sport. (faire)', opts: ['faisons', 'faites', 'font', 'fais'], a: 0, fb: 'Con "nous" → "faisons".' },
      { s: 'Vous ___ les courses ? (faire)', opts: ['faisons', 'faites', 'font', 'faisez'], a: 1, fb: 'Irregular: "vous faites".' },
      { s: 'Il ___ beau aujourd’hui. (clima)', opts: ['est', 'fait', 'va'], a: 1, fb: 'El clima → "il fait beau".' },
      { s: 'Je ___ de Colombie. (venir)', opts: ['viens', 'vient', 'venons'], a: 0, fb: 'Con "je" → "viens".' },
      { s: 'Ils ___ de Paris. (venir)', opts: ['viens', 'vient', 'viennent'], a: 2, fb: 'Con "ils" → "viennent".' },
      { s: 'Tu ___ au cinéma ? (aller)', opts: ['vais', 'vas', 'va'], a: 1, fb: 'Con "tu" → "vas".' },
      { s: 'Ils ___ leurs devoirs. (faire)', opts: ['faisons', 'faites', 'font'], a: 2, fb: 'Con "ils" → "font".' },
      { s: 'Elle ___ d’arriver. (acaba de)', opts: ['vient', 'va', 'fait'], a: 0, fb: '"venir de + inf." = acabar de → "vient".' },
      { s: 'Il ___ froid en hiver. (clima)', opts: ['est', 'fait', 'a'], a: 1, fb: '"il fait froid".' },
      { s: '¿Cuál es CORRECTA?', opts: ['Vous faisez', 'Vous faites', 'Vous faitez'], a: 1, fb: '"Vous faites".' },
      { s: '¿Cómo se dice "Vengo de Colombia"?', opts: ['Je viens Colombie.', 'Je viens de Colombie.', 'Je vient de Colombie.'], a: 1, fb: '"Je viens de Colombie".' },
      { s: 'Nous ___ à la maison. (aller)', opts: ['vont', 'allons', 'allez'], a: 1, fb: 'Con "nous" → "allons".' },
      { s: '¿Cómo se dice "Hace frío"?', opts: ['Il est froid.', 'Il fait froid.', 'Il a froid.'], a: 1, fb: 'El clima → "Il fait froid".' },
    ],
  },
];

export function getTopic(slug: string): GrammarTopic | undefined {
  return findTopic(TOPICS, slug);
}

export function getTopicNav(slug: string): { prev: GrammarTopic | null; next: GrammarTopic | null } {
  return topicNav(TOPICS, slug);
}
