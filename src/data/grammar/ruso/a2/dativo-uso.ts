import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'dativo-uso',
  order: '06',
  color: '#1a2ecc',
  category: 'Casos',
  level: 'A2',
  title: 'El dativo en ruso: мне нравится, нужно, возраст',
  shortTitle: 'Dativo: уsos avanzados',
  metaTitle: 'Dativo ruso A2 | мне нравится, мне нужно, мне холодно, возраст',
  description:
    'El dativo ruso expresa el beneficiario o receptor de una acción, pero también aparece en construcciones impersonales esenciales: мне нравится (me gusta), мне нужно (necesito), мне холодно (tengo frío), y para expresar la edad (Мне двадцать лет).',
  lead: 'Domina las construcciones más importantes con dativo: мне нравится (me gusta), мне нужно (necesito), мне интересно (me parece interesante), Мне двадцать лет (tengo veinte años).',
  outcomes: [
    'Expresar gustos con нравиться + dativo (мне нравится, тебе нравится)',
    'Expresar necesidad con нужно/нужен/нужна + dativo',
    'Expresar estados físicos y la edad con dativo + predicativo',
  ],
  guide: {
    goal: 'Usar el dativo en construcciones impersonales de gusto, necesidad, estado y edad.',
    model: 'Dativo del sujeto lógico + нравится / нужно / холодно / лет',
    formula: 'мне/тебе/ему/ей/нам/вам/им + predicativo/глагол',
    decisions: [
      '¿Quieres decir "me gusta"? → мне нравится + nominativo (сингулар o plural)',
      '¿Quieres decir "necesito"? → мне нужно (neutro) / нужен (m) / нужна (f) / нужны (pl)',
      '¿Quieres expresar estado físico (frío, calor, difícil)? → дативо + наречие (мне холодно)',
      '¿Quieres decir la edad? → дативо + número + год/года/лет (Мне 20 лет)',
    ],
    table: [
      ['Pronombre', 'Dativo', 'Ejemplo'],
      ['я', 'мне', 'мне нравится / мне 20 лет'],
      ['ты', 'тебе', 'тебе нравится / тебе холодно'],
      ['он', 'ему', 'ему нужна помощь'],
      ['она', 'ей', 'ей интересно / ей 25 лет'],
      ['мы', 'нам', 'нам нравится / нам нужно'],
      ['вы', 'вам', 'вам нравится? / вам скучно?'],
      ['они', 'им', 'им нравится / им нужны'],
    ],
    mistakes: [
      'NO uses «я нравлюсь» para "me gusta": la estructura es мне нравится + lo que gusta.',
      'нужен/нужна/нужны concuerdan con lo que se necesita (no con el que necesita): мне нужна книга (fem.).',
      'Para la edad: Мне двадцать лет (dativo + число + лет), no "Я имею двадцать лет".',
      'нравиться vs любить: нравиться = gustar (apreciar); любить = amar/querer con intensidad.',
    ],
  },
  seo: [
    {
      heading: '¿Cómo se expresan los gustos con Мне нравится?',
      paragraphs: [
        'En ruso, "me gusta" se expresa con la estructura мне нравится + lo que gusta (en nominativo). El verbo нравиться concuerda con lo que gusta: мне нравится фильм (me gusta la película — singular), мне нравятся фильмы (me gustan las películas — plural).',
        'El dativo indica quién siente el gusto: мне (a mí), тебе (a ti), ему (a él), ей (a ella), нам (a nosotros), вам (a vosotros), им (a ellos). Esta inversión del sujeto es la diferencia clave con el español.',
      ],
      table: [
        ['Español', 'Ruso', 'Estructura'],
        ['me gusta el libro', 'мне нравится книга', 'dativo + нравится + nom. sg.'],
        ['te gustan los libros', 'тебе нравятся книги', 'dativo + нравятся + nom. pl.'],
        ['a él le gusta el cine', 'ему нравится кино', 'dativo + нравится + nom.'],
      ],
    },
    {
      heading: '¿Cómo se expresan la edad y los estados con el dativo?',
      paragraphs: [
        'Para decir la edad en ruso se usa el dativo: Мне двадцать лет (tengo veinte años). Los años cambian de forma: 1 = год, 2-4 = года, 5+ = лет. Ejemplos: Ей тридцать один год. Ему двадцать два года. Им пятнадцать лет.',
        'Los estados físicos también usan dativo: мне холодно (tengo frío), мне жарко (tengo calor), мне скучно (me aburro), мне интересно (me parece interesante), мне трудно (me resulta difícil).',
      ],
    },
    {
      heading: '¿Qué construcciones impersonales de necesidad piden dativo?',
      paragraphs: [
        'Muchas expresiones impersonales de obligación, posibilidad o prohibición usan la persona en dativo + una palabra invariable: Мне нужно работать (tengo que trabajar), Мне надо идти (debo irme), Вам можно войти (usted puede entrar), Здесь нельзя курить (aquí no se puede fumar). El "sujeto lógico" (quien debe o puede) va en dativo, no en nominativo.',
        'La trampa para el hispanohablante es que donde el español dice "yo tengo que", el ruso dice literalmente "a mí es necesario": мне (dativo) + нужно/надо/можно/нельзя + infinitivo. No hay un verbo "tener que" conjugado con "yo"; la persona aparece siempre en dativo.',
      ],
    },
  ],
  visual: {
    mode: 'case-table',
    teacherLens:
      'The dative impersonal constructions (нравится, нужно, холодно, age) are among the most communicatively useful A2 patterns. Drill all five contexts in sequence.',
    graphicPrompt:
      'Dative pronoun wheel in the center (мне/тебе/ему/ей/нам/вам/им). Five spokes lead to: нравится, нужно, холодно/жарко, лет (age), интересно.',
    scene: [
      ['Gusto', 'мне нравится музыка / тебе нравятся книги'],
      ['Necesidad', 'мне нужна помощь / ему нужен врач / нам нужны деньги'],
      ['Estado físico', 'мне холодно / ей жарко / им скучно / вам трудно'],
      ['Edad', 'Мне 20 лет / Ей 25 лет / Ему 31 год / Им 22 года'],
      ['Interés', 'Мне интересно / Тебе понятно? / Нам важно'],
    ],
    learnerModes: ['recognition', 'dative-pronoun-drill', 'gap-fill', 'production'],
    practiceVerbs: ['нравиться', 'нужен/нужна/нужно', 'холодно', 'жарко', 'интересно'],
    reviewFocus: ['dativo vs nominativo con нравится', 'concordancia de нужен/нужна/нужны', 'год/года/лет'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocer la estructura de dativo',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del dativo o del predicativo.',
        type: 'choice',
        items: [
          {
            scene: 'мне нравится',
            lines: [['', '_____ нравится эта музыка. (a mí me gusta esta música)']],
            options: ['Мне', 'Я', 'Меня', 'Мой'],
            answer: 'Мне',
            explain: 'Dativo de "я" = мне. Мне нравится = me gusta.',
          },
          {
            scene: 'Concordancia de нравится',
            lines: [['', 'Тебе нравят_____ эти книги. (te gustan estos libros — plural)']],
            options: ['нравятся', 'нравится', 'нравлюсь', 'нравилась'],
            answer: 'нравятся',
            explain: 'Эти книги = plural → нравятся (3.ª pers. pl.).',
          },
          {
            scene: 'нужна vs нужен',
            lines: [['', 'Мне _____ помощь. (necesito ayuda — помощь es femenino)']],
            options: ['нужна', 'нужен', 'нужно', 'нужны'],
            answer: 'нужна',
            explain: 'Помощь = femenino → нужна (concuerda con lo que se necesita).',
          },
          {
            scene: 'Estado físico',
            lines: [['', 'Ей _____. (ella tiene frío)']],
            options: ['холодно', 'холодный', 'холод', 'холодна'],
            answer: 'холодно',
            explain: 'Estado físico: дативо (ей) + наречие холодно. Neutro invariable.',
          },
          {
            scene: 'Expresar edad',
            lines: [['', 'Мне двадцать _____. (tengo veinte años)']],
            options: ['лет', 'год', 'года', 'годов'],
            answer: 'лет',
            explain: '20 → plural → лет (5+ años = лет).',
          },
          {
            scene: 'Dativo de ему',
            lines: [['', '_____ нужен врач. (él necesita un médico)']],
            options: ['Ему', 'Он', 'Его', 'Ему́'],
            answer: 'Ему',
            explain: 'Dativo de "он" = ему. Ему нужен врач.',
          },
          {
            scene: 'нам нравится',
            lines: [['', '_____ нравится путешествовать. (nos gusta viajar)']],
            options: ['Нам', 'Мы', 'Нас', 'Нашем'],
            answer: 'Нам',
            explain: 'Dativo de "мы" = нам. Нам нравится путешествовать.',
          },
          {
            scene: 'Concordancia нужны',
            lines: [['', 'Вам _____ деньги? (¿necesitáis dinero? — деньги es plural)']],
            options: ['нужны', 'нужен', 'нужна', 'нужно'],
            answer: 'нужны',
            explain: 'Деньги = plural → нужны (concuerda con deньги).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dativo y predicativo',
        tag: '2 espacios',
        intro: 'Completa con el pronombre en dativo y el predicativo correcto.',
        type: 'dual',
        items: [
          {
            scene: 'Gusto personal',
            lines: [['', '[[0]] нравится этот фильм. [[1]] = el verbo concuerda con фильм (singular)']],
            blanks: [
              { options: ['Мне', 'Я', 'Меня'], answer: 'Мне', explain: 'yo → dativo → мне.' },
              { options: ['нравится', 'нравятся', 'нравлюсь'], answer: 'нравится', explain: 'Фильм singular → нравится.' },
            ],
          },
          {
            scene: 'Necesidad con género',
            lines: [['', '[[0]] [[1]] новая книга. (ella necesita un libro nuevo — femenino)']],
            blanks: [
              { options: ['Ей', 'Она', 'Её'], answer: 'Ей', explain: 'она → dativo → ей.' },
              { options: ['нужна', 'нужен', 'нужно'], answer: 'нужна', explain: 'книга = femenino → нужна.' },
            ],
          },
          {
            scene: 'Edad',
            lines: [['', '[[0]] тридцать [[1]]. (él tiene treinta años)']],
            blanks: [
              { options: ['Ему', 'Он', 'Его'], answer: 'Ему', explain: 'он → dativo → ему.' },
              { options: ['лет', 'год', 'года'], answer: 'лет', explain: '30 → лет (5+ siempre лет).' },
            ],
          },
          {
            scene: 'Estado físico',
            lines: [['', '[[0]] [[1]] в этой комнате. (nos resulta caluroso en esta habitación)']],
            blanks: [
              { options: ['Нам', 'Мы', 'Нас'], answer: 'Нам', explain: 'мы → dativo → нам.' },
              { options: ['жарко', 'жар', 'жаркий', 'жара'], answer: 'жарко', explain: 'Estado de calor: нам жарко.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — construcciones con dativo',
        tag: 'Opciones',
        intro: 'Completa el texto con las formas correctas.',
        type: 'guidedText',
        scene: 'Presentando a mi familia',
        text: 'Моей маме [[0]] лет. [[1]] нравится готовить. Моему брату [[2]] нужна помощь. [[3]] интересно учить языки. А мне сегодня [[4]] — я открыл окно.',
        blanks: [
          { options: ['сорок', 'сорока', 'сорок один'], answer: 'сорок', explain: 'Edad: маме сорок лет.' },
          { options: ['Ей', 'Она', 'Её'], answer: 'Ей', explain: 'маме = ей (dativo femenino).' },
          { options: ['ему', 'он', 'его'], answer: 'ему', explain: 'Братy → ему нужна.' },
          { options: ['Ему', 'Он', 'Его'], answer: 'Ему', explain: 'брату = ему (dativo masculino).' },
          { options: ['жарко', 'холодно', 'скучно'], answer: 'жарко', explain: 'Мне жарко → abrió la ventana (lógico).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — dativo sin opciones',
        tag: 'Sin opciones',
        intro: 'Completa con el pronombre en dativo correcto.',
        type: 'freeText',
        scene: 'Completar con el dativo',
        text: '1. Анне [[0]] нравится музыка. 2. [[1]] (нам) нужен переводчик. 3. Ивану [[2]] лет. (35) 4. [[3]] (ella) скучно. 5. Детям [[4]] нравятся игры.',
        blanks: [
          { answer: 'ей', accepted: ['ей'], explain: 'Анне = femenino → dativo: ей.' },
          { answer: 'Нам', accepted: ['нам'], explain: 'мы → dativo → нам.' },
          { answer: 'тридцать пять', accepted: ['тридцать пять', '35'], explain: 'Ивану 35 лет.' },
          { answer: 'Ей', accepted: ['ей'], explain: 'она → dativo → ей.' },
          { answer: 'им', accepted: ['им'], explain: 'детям / они → dativo: им.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones con construcciones de dativo.',
        type: 'write',
        items: [
          {
            scene: 'Gusto',
            prompt: 'Escribe en ruso: "A ella le gusta esta película." (ей, нравиться, этот фильм)',
            answer: 'Ей нравится этот фильм.',
            accepted: ['ей нравится этот фильм'],
            explain: 'Ей = dativo femenino. Фильм = singular → нравится.',
          },
          {
            scene: 'Necesidad',
            prompt: 'Escribe: "Necesito un médico." (мне, нужен, врач)',
            answer: 'Мне нужен врач.',
            accepted: ['мне нужен врач'],
            explain: 'Мне = dativo "yo". Врач = masculino → нужен.',
          },
          {
            scene: 'Edad',
            prompt: 'Escribe: "Mi hermano tiene veinticinco años." (моему брату, 25, лет)',
            answer: 'Моему брату двадцать пять лет.',
            accepted: ['моему брату двадцать пять лет', 'брату 25 лет'],
            explain: 'Брату = dativo. 25 → двадцать пять лет.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción libre',
        intro: 'Habla de ti y tu familia usando construcciones con dativo.',
        type: 'write',
        items: [
          {
            scene: 'Sobre mí',
            prompt: 'Escribe 3 oraciones: cuántos años tienes, qué te gusta, y cómo te sientes ahora.',
            answer: 'Мне двадцать лет. Мне нравится музыка. Мне сейчас интересно.',
            accepted: ['мне', 'лет', 'нравится', 'холодно', 'жарко', 'интересно', 'скучно'],
            explain: 'Edad: мне X лет. Gusto: мне нравится. Estado: мне + наречие.',
          },
          {
            scene: 'Mi familia',
            prompt: 'Describe a un familiar: su edad, qué le gusta y qué necesita.',
            answer: 'Моей маме сорок пять лет. Ей нравится готовить. Ей нужна помощь.',
            accepted: ['ей', 'ему', 'им', 'нравится', 'нужна', 'нужен', 'нужны', 'лет'],
            explain: 'Usar dativo correcto: ей/ему según género. нужна/нужен según objeto.',
          },
          {
            scene: 'Necesidades',
            prompt: 'Escribe 2 oraciones sobre lo que necesitas (нужно/нужен/нужна) con diferentes géneros.',
            answer: 'Мне нужен компьютер. Мне нужна новая тетрадь.',
            accepted: ['нужен', 'нужна', 'нужно', 'нужны'],
            explain: 'Concordar нужен/нужна/нужно/нужны con el género del objeto.',
          },
        ],
      },
    ],
  },
}

export default topic
