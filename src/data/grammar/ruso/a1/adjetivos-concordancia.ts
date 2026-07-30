import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'adjetivos-concordancia',
  order: '09',
  color: '#1a2ecc',
  category: 'Adjetivos',
  level: 'A1',
  title: 'Adjetivos en ruso: concordancia de género y número',
  shortTitle: 'Adjetivos — concordancia',
  metaTitle: 'Adjetivos en ruso A1 | concordancia de género y número — новый, новая, новое',
  description:
    'Los adjetivos en ruso concuerdan en género, número y caso con su sustantivo. En nominativo: masculino -ый/-ий/-ой, femenino -ая/-яя, neutro -ое/-ее, plural -ые/-ие. Aunque las terminaciones son distintas al español, la lógica es más regular que los sustantivos.',
  lead: 'Aprende cómo los adjetivos rusos cambian según el género del sustantivo — новый (nuevo/m), новая (nueva/f), новое (nuevo/n), новые (nuevos/pl).',
  outcomes: [
    'Aplicar las terminaciones adjetivas para masculino, femenino, neutro y plural',
    'Reconocer la diferencia entre -ый, -ий y -ой',
    'Usar los adjetivos más comunes del A1 con concordancia correcta',
  ],
  guide: {
    goal: 'Concordar adjetivos con sustantivos en género y número en caso nominativo.',
    model: '[Adjetivo concordado] + [sustantivo] | [Sustantivo] + [adjetivo predicativo]',
    formula: 'новый/новая/новое/новые + sustantivo',
    decisions: [
      '¿El sustantivo es masculino (consonante/-й/-ь)? → adjetivo en -ый/-ий/-ой',
      '¿El sustantivo es femenino (-а/-я/-ь)? → adjetivo en -ая/-яя',
      '¿El sustantivo es neutro (-о/-е)? → adjetivo en -ое/-ее',
      '¿El sustantivo es plural? → adjetivo en -ые/-ие',
      '¿El adjetivo va predicativo? → misma regla: Книга интересная.',
    ],
    table: [
      ['Género/Número', 'Terminación', 'Ejemplo con новый (nuevo)'],
      ['Masculino', '-ый / -ий / -ой', 'новый стол (nueva mesa)'],
      ['Femenino', '-ая / -яя', 'новая книга (nuevo libro)'],
      ['Neutro', '-ое / -ее', 'новое окно (nueva ventana)'],
      ['Plural', '-ые / -ие', 'новые студенты (nuevos estudiantes)'],
    ],
    mistakes: [
      '-ый vs -ий: después de г, к, х, ж, ш, щ, ч → siempre -ий (русский — ruso, синий — azul).',
      '-ой es terminación tónica (con acento en la desinencia): большой (grande), молодой (joven), плохой (malo).',
      'En ruso el adjetivo puede ir antes o después del sustantivo: новая книга = книга новая (predicativo).',
      'Los adjetivos predicativos (después del sustantivo + быть omitido) también deben concordar: Книга интересная, Стол новый.',
    ],
  },
  seo: [
    {
      heading: '¿Cómo concuerdan los adjetivos en ruso?',
      paragraphs: [
        'En ruso, los adjetivos cambian de terminación según el género y número del sustantivo que modifican. Nuevo se dice новый con sustantivos masculinos, новая con femeninos, новое con neutros y новые en plural. Esta concordancia es similar al español (nuevo/nueva), pero el ruso también añade la distinción neutro.',
        'La buena noticia: las terminaciones adjetivas son más regulares que las de los sustantivos. Una vez aprendes -ый/-ая/-ое/-ые para adjetivos duros (como новый), y -ий/-яя/-ее/-ие para adjetivos blandos (como синий — azul), tienes el 90% del sistema.',
      ],
      table: [
        ['Adjetivo (masc)', 'Masc', 'Fem', 'Neutro', 'Plural'],
        ['новый (nuevo)', 'новый', 'новая', 'новое', 'новые'],
        ['синий (azul)', 'синий', 'синяя', 'синее', 'синие'],
        ['большой (grande)', 'большой', 'большая', 'большое', 'большие'],
      ],
    },
    {
      heading: '¿Cuáles son los adjetivos más frecuentes del A1 en ruso?',
      paragraphs: [
        'Los adjetivos más útiles del A1: новый (nuevo), старый (viejo), большой (grande), маленький (pequeño), хороший (bueno), плохой (malo), красивый (bonito), интересный (interesante), молодой (joven), русский (ruso), холодный (frío), горячий (caliente).',
        'Un consejo práctico: aprende cada adjetivo con su forma masculina (la del diccionario). Las demás formas se derivan sistemáticamente. Si sabes новый, sabrás automáticamente новая, новое, новые.',
      ],
    },
    {
      heading: '¿Qué diferencia hay entre adjetivo atributivo y predicativo?',
      paragraphs: [
        'El adjetivo atributivo va antes del sustantivo y concuerda: новый студент (el nuevo estudiante), интересная книга (libro interesante). El adjetivo predicativo va después del sustantivo (con быть omitido en presente): Студент новый (El estudiante es nuevo), Книга интересная (El libro es interesante).',
        'Ambos tipos concuerdan en género y número. En español esto es automático; en ruso hay que recordar las terminaciones específicas por género.',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'Adjective agreement is where students start seeing the full elegance of the Russian case system — consistent endings across the paradigm once the pattern clicks.',
    graphicPrompt:
      'Four colored blocks: M (blue -ый), F (pink -ая), N (green -ое), PL (purple -ые), each with an example adjective+noun pair. Clean, minimal, Russian+transliteration.',
    scene: [
      ['Masculino -ый', 'новый стол (novy stol) — mesa nueva'],
      ['Masculino -ий', 'синий карандаш (síny karandash) — lápiz azul'],
      ['Masculino -ой', 'большой город (bolshoy gorod) — ciudad grande'],
      ['Femenino -ая', 'новая книга (novaya kniga) — libro nuevo'],
      ['Neutro -ое', 'новое окно (novoye okno) — ventana nueva'],
      ['Plural -ые/-ие', 'новые студенты (novyye studyenty) — estudiantes nuevos'],
    ],
    learnerModes: ['recognition', 'gender-agreement', 'gap-fill', 'production'],
    practiceVerbs: ['описывать (describir)', 'быть (ser/estar)'],
    reviewFocus: ['-ый/-ая/-ое/-ые', '-ий/-яя/-ее/-ие (suave)', '-ой adjetivos tónicos'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento de concordancia',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del adjetivo según el género del sustantivo.',
        type: 'choice',
        items: [
          { scene: 'Concordancia masculino', lines: [['', '¿Qué forma de "новый" (nuevo) va con "стол" (mesa, masc)?']], options: ['новая', 'новый', 'новое', 'новые'], answer: 'новый', explain: 'стол es masculino → adjetivo masculino: новый. Terminación -ый.' },
          { scene: 'Concordancia femenino', lines: [['', '¿Qué forma de "красивый" (bonito) va con "книга" (libro, fem)?']], options: ['красивый', 'красивое', 'красивая', 'красивые'], answer: 'красивая', explain: 'книга es femenino → красивая. Terminación femenina -ая.' },
          { scene: 'Concordancia neutro', lines: [['', '¿Qué forma de "большой" (grande) va con "окно" (ventana, neutro)?']], options: ['большой', 'большая', 'большое', 'большие'], answer: 'большое', explain: 'окно es neutro → большое. Terminación neutra -ое.' },
          { scene: 'Concordancia plural', lines: [['', '¿Qué forma de "интересный" (interesante) va con "студенты" (estudiantes, pl)?']], options: ['интересный', 'интересная', 'интересное', 'интересные'], answer: 'интересные', explain: 'студенты es plural → интересные. Terminación plural -ые.' },
          { scene: 'Adjetivo predicativo', lines: [['', '"La casa es grande" en ruso: Дом ___. (дом = casa, masc)']], options: ['большая', 'большой', 'большое', 'большие'], answer: 'большой', explain: 'Дом большой. дом es masculino → большой. Predicativo también concuerda.' },
          { scene: 'Adjetivo blando -ий', lines: [['', '¿Qué forma de "синий" (azul, adjetivo blando) va con "море" (mar, neutro)?']], options: ['синий', 'синяя', 'синее', 'синие'], answer: 'синее', explain: 'море es neutro → синее. Adjetivo blando neutro: -ее.' },
          { scene: 'хороший (bueno)', lines: [['', '¿Cómo dices "buen estudiante" (estudiante, masc) en ruso?']], options: ['хороший студент', 'хорошая студент', 'хорошее студент', 'хорошие студент'], answer: 'хороший студент', explain: 'студент es masculino → хороший. хороший es adjetivo blando (-ий).' },
          { scene: 'маленький (pequeño)', lines: [['', '"Habitación pequeña" (комната — fem): маленьк___ комната']], options: ['маленький', 'маленькая', 'маленькое', 'маленькие'], answer: 'маленькая', explain: 'комната es femenino → маленькая. Adjetivo blando femenino: -ая (pero sin й extra).' },
        ],
      },
      {
        id: 'level-2',
        title: 'Forma del adjetivo y terminación',
        tag: '2 espacios',
        intro: 'Completa la forma del adjetivo y su terminación.',
        type: 'dual',
        items: [
          { scene: 'Concordancia', lines: [['', '"libro interesante": книга + интересн[[0]] → , terminación: ']], blanks: [{ options: ['интересная', 'интересный', 'интересное', 'интересные'], answer: 'интересная', explain: 'книга (fem) → интересная. Terminación femenina -ая.' }, { options: ['-ая', '-ый', '-ое', '-ые'], answer: '-ая', explain: 'Femenino: -ая.' }] },
          { scene: 'Concordancia', lines: [['', '"ciudad grande": город (masc) + больш[[0]] → , terminación: ']], blanks: [{ options: ['большой', 'большая', 'большое', 'большие'], answer: 'большой', explain: 'город (masc) → большой. Adjetivo tónico: -ой.' }, { options: ['-ой', '-ый', '-ая', '-ие'], answer: '-ой', explain: 'большой es adjetivo tónico (-ой).' }] },
          { scene: 'Concordancia', lines: [['', '"ventana nueva": окно (neutro) + нов[[0]] → , terminación: ']], blanks: [{ options: ['новое', 'новый', 'новая', 'новые'], answer: 'новое', explain: 'окно (neutro) → новое. Terminación neutra -ое.' }, { options: ['-ое', '-ый', '-ая', '-ые'], answer: '-ое', explain: 'Neutro: -ое.' }] },
          { scene: 'Concordancia', lines: [['', '"buenos amigos": друзья (masc pl) + хорош[[0]] → , terminación: ']], blanks: [{ options: ['хорошие', 'хороший', 'хорошая', 'хорошее'], answer: 'хорошие', explain: 'друзья (plural) → хорошие. Adjetivo blando plural: -ие.' }, { options: ['-ие', '-ый', '-ая', '-ое'], answer: '-ие', explain: 'Adjetivo blando plural: -ие.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — adjetivos en contexto',
        tag: 'Opciones',
        intro: 'Elige la forma correcta del adjetivo para cada espacio.',
        type: 'guidedText',
        scene: 'Describiendo con adjetivos',
        text: 'У нас [[0]] учитель. (Tenemos un buen maestro.) Это [[1]] книга. (Este es un libro interesante.) Москва — [[2]] город. (Moscú es una ciudad grande.) У Давида [[3]] машина. (Dario tiene un carro nuevo.) Студенты [[4]] и умные. (Los estudiantes son jóvenes e inteligentes.)',
        blanks: [
          { options: ['хороший', 'хорошая', 'хорошее', 'хорошие'], answer: 'хороший', explain: 'учитель (masc) → хороший. Adjetivo blando masculino: -ий.' },
          { options: ['интересный', 'интересная', 'интересное', 'интересные'], answer: 'интересная', explain: 'книга (fem) → интересная. Terminación femenina -ая.' },
          { options: ['большой', 'большая', 'большое', 'большие'], answer: 'большой', explain: 'город (masc) → большой. Adjetivo tónico masculino: -ой.' },
          { options: ['новый', 'новая', 'новое', 'новые'], answer: 'новая', explain: 'машина (fem) → новая. Terminación femenina -ая.' },
          { options: ['молодой', 'молодая', 'молодое', 'молодые'], answer: 'молодые', explain: 'студенты (plural) → молодые. Terminación plural -ые.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — escribiendo adjetivos',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta del adjetivo sin opciones.',
        type: 'freeText',
        scene: 'Producción de adjetivos',
        text: '1. "красивый" con "девушка" (chica, fem): [[0]]. 2. "старый" (viejo) con "дом" (casa, masc): [[1]]. 3. "интересный" con "фильм" (película, masc): [[2]]. 4. "маленький" (pequeño) con "кошка" (gato, fem): [[3]]. 5. "хороший" con "студенты" (pl): [[4]].',
        blanks: [
          { answer: 'красивая', accepted: ['красивая'], explain: 'девушка (fem) → красивая. Femenino -ая.' },
          { answer: 'старый', accepted: ['старый'], explain: 'дом (masc) → старый. Masculino -ый.' },
          { answer: 'интересный', accepted: ['интересный'], explain: 'фильм (masc) → интересный. Masculino -ый.' },
          { answer: 'маленькая', accepted: ['маленькая'], explain: 'кошка (fem) → маленькая. Femenino -ая.' },
          { answer: 'хорошие', accepted: ['хорошие'], explain: 'студенты (plural) → хорошие. Plural blando -ие.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones completas con adjetivos concordados.',
        type: 'write',
        items: [
          { scene: 'Descripción masculino', prompt: 'Traduce al ruso: "Dario tiene un carro rojo." (красный — rojo, машина — carro, fem)', answer: 'У Давида красная машина', accepted: ['у давида красная машина', 'у давида есть красная машина'], explain: 'У Давида красная машина. машина (fem) → красная. Concordancia femenina -ая.' },
          { scene: 'Descripción femenino', prompt: 'Traduce al ruso: "Es un libro interesante." (интересный — interesante, книга — libro, fem)', answer: 'Это интересная книга', accepted: ['это интересная книга'], explain: 'Это интересная книга. книга (fem) → интересная (-ая).' },
          { scene: 'Predicativo', prompt: 'Traduce al ruso: "La ciudad es grande." (Москва — Moscú / город — ciudad, masc)', answer: 'Город большой', accepted: ['город большой', 'москва большая', 'город большой.'], explain: 'Город большой. Predicativo: sustantivo + adjetivo concordado. город (masc) → большой.' },
          { scene: 'Plural', prompt: 'Traduce al ruso: "Tenemos nuevos estudiantes." (У нас = tenemos, студенты — pl)', answer: 'У нас новые студенты', accepted: ['у нас новые студенты'], explain: 'У нас новые студенты. студенты (plural) → новые (-ые).' },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción',
        intro: 'Describe personas y lugares usando adjetivos con concordancia correcta.',
        type: 'write',
        items: [
          { scene: 'Descripción de personas', prompt: 'Carlos describe a sus amigos en ruso. Usa 3 adjetivos: умный (inteligente), красивый (bonito/a), молодой (joven). Describe a un chico (masc) y a una chica (fem).', answer: 'Мой друг умный и молодой. Моя подруга красивая и умная.', accepted: ['умный', 'молодой', 'красивая', 'умная'], explain: 'друг (masc): умный, молодой. подруга (fem): красивая, умная. Concordancia de género.' },
          { scene: 'Describiendo lugares', prompt: 'Sofia describe Bucaramanga y Colombia. Escribe 2 oraciones con adjetivos: bonita (fem) y grande (masc/fem).', answer: 'Букараманга красивая. Колумбия большая страна.', accepted: ['красивая', 'большая', 'красивый', 'большой'], explain: 'Букараманга красивая (fem). Колумбия большая страна (страна = país, fem).' },
        ],
      },
    ],
  },
}

export default topic
