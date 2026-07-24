import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'participios-activos-b1',
  order: '02',
  color: '#1a2ecc',
  category: 'Participios',
  level: 'B1',
  title: 'Participios Activos en Ruso B1',
  shortTitle: 'Participios Activos',
  metaTitle: 'Participios Activos en Ruso B1 — Presente y Pasado (-ущий, -вший)',
  description:
    'Los participios activos en ruso reemplazan oraciones de relativo con "который" (que/quien) cuando el sujeto de la oración subordinada coincide con el antecedente. Se forman añadiendo sufijos especiales al tema verbal: -ущий/-ющий/-ащий/-ящий para el presente y -вший/-ший para el pasado. Concuerdan en género, número y caso con el sustantivo que modifican.',
  lead: 'Aprende a formar y usar los participios activos de presente (-ущий/-ящий) y de pasado (-вший/-ший) para reemplazar cláusulas de relativo en ruso formal y escrito.',
  outcomes: [
    'Forma participios activos de presente con sufijos -ущий/-ющий/-ащий/-ящий',
    'Forma participios activos de pasado con sufijos -вший/-ший',
    'Declina participios activos en concordancia con el sustantivo que modifican',
    'Convierte cláusulas с который en participios activos y viceversa',
  ],

  guide: {
    goal: 'Usar participios activos para crear descripciones más precisas y formales, propias del registro escrito y culto del ruso.',
    model: 'студент, читающий книгу / женщина, написавшая письмо / человек, говоривший по телефону',
    formula: '[Sustantivo] + [participio activo en caso/género/número correcto] + [complemento del participio]',
    decisions: [
      'Participio activo PRESENTE НСВ: tema 3ª pers. plural − terminación + -ущ-/-ющ- (1ª conj.) o -ащ-/-ящ- (2ª conj.) + desinencia adjetival',
      'Participio activo PASADO НСВ o СВ: infinitivo − -ть + -вш- + desinencia adjetival; si termina en consonante: -ш-',
      'Concordancia: el participio concuerda en género, número y caso con el sustantivo que modifica',
      'Registro: los participios son propios del registro formal/escrito; en habla coloquial se prefiere "который"',
      'Tiempo relativo: el participio de PRESENTE indica acción simultánea; el de PASADO indica acción anterior',
    ],
    table: [
      ['Tipo', 'Sufijo', 'Ejemplo'],
      ['Presente activo (1ª conj.)', '-ущий / -ющий', 'читать → читающий (que lee)'],
      ['Presente activo (2ª conj.)', '-ащий / -ящий', 'говорить → говорящий (que habla)'],
      ['Pasado activo (vocal + ть)', '-вший', 'написать → написавший (que escribió)'],
      ['Pasado activo (consonante)', '-ший', 'нести → нёсший (que llevaba)'],
    ],
    mistakes: [
      '"Человек, который читает" = "Человек, читающий" — ambas correctas, pero la segunda es más formal.',
      '"Студентка, написавшая реферат" ✓ (femenino) — el participio concuerda: -вшая, no -вший.',
      '"Дети, игравшие в парке" ✓ (plural) — participio en plural: -вшие, no -вший.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es un participio activo en ruso?',
      paragraphs: [
        'Los participios activos (действительные причастия, deystvítelnyye prichástiya) son formas verbales que modifican un sustantivo y expresan que ese sustantivo realiza la acción. En español los expresamos con cláusulas de relativo: "el estudiante que lee" → en ruso: "студент, читающий" (studyent chitáyushchiy).',
        'La gran ventaja de los participios es que permiten crear descripciones compactas y precisas. En lugar de decir "студент, который читает книгу", podemos decir "студент, читающий книгу". Esta forma es muy habitual en ruso escrito, periodístico y literario.',
      ],
    },
    {
      heading: 'Formación del participio activo de presente',
      paragraphs: [
        'Para los verbos de 1ª conjugación (como читать, знать, писать): se toma la forma de 3ª persona plural (они читают), se quita la terminación -ют/-ут y se añade -ющий/-ущий: читают → читающий. Para verbos de 2ª conjugación (como говорить, учить, смотреть): они говорят → говорящий.',
        'Las desinencias siguen la declinación de los adjetivos: говорящий (masc. nom.), говорящего (masc. gen.), говорящая (fem.), говорящее (neutro), говорящие (plural). Nota importante: los participios activos de presente solo existen para НСВ — los verbos perfectivos no tienen esta forma.',
      ],
      table: [
        ['Infinitivo', '3ª pers. plural', 'Participio (masc. nom.)', 'Significado'],
        ['читать', 'читают', 'читающий', 'que lee / leyendo'],
        ['говорить', 'говорят', 'говорящий', 'que habla / hablando'],
        ['работать', 'работают', 'работающий', 'que trabaja'],
        ['учиться', 'учатся', 'учащийся', 'que estudia / estudiante'],
      ],
    },
    {
      heading: 'Formación del participio activo de pasado',
      paragraphs: [
        'Para la mayoría de verbos (termina en -ть precedida de vocal): se quita -ть y se añade -вший: написать → написавший (que escribió), читать → читавший (que leía/había leído). Para verbos cuyo infinitivo termina en consonante + ть, или en -чь, -зти, -сти: se añade -ший al tema: нести → нёсший.',
        'Los participios activos de pasado existen para НСВ y СВ: "студент, читавший книгу" (el estudiante que leía/estaba leyendo) vs "студент, прочитавший книгу" (el estudiante que había leído / que leyó). El aspecto del participio mantiene su valor aspectual.',
      ],
    },
    {
      heading: 'Concordancia y posición del participio',
      paragraphs: [
        'El participio activo concuerda con el sustantivo que modifica en género, número y caso. Si el sustantivo está en genitivo, el participio también estará en genitivo: "книга читающего студента" (el libro del estudiante que lee).',
        'El participio y su grupo (participio + complementos) pueden ir antes o después del sustantivo. En posición postnominal el grupo participial suele ir entre comas: "Студент, читающий книгу, — мой брат". En posición prenominal (menos común) no hay comas: "Читающий книгу студент — мой брат".',
      ],
    },
    {
      heading: 'Participios activos vs cláusulas con который',
      paragraphs: [
        'En el habla cotidiana los hablantes nativos prefieren las cláusulas con "который": "Я знаю человека, который говорит по-испански." En el registro escrito, periodístico o formal se prefieren los participios: "Я знаю человека, говорящего по-испански."',
        'Para el examen ТРКИ B1/B2 es necesario reconocer y usar participios activos tanto en comprensión lectora como en producción escrita. Practica la conversión en ambas direcciones: cláusula → participio y participio → cláusula.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Participios activos de presente y pasado — formación y concordancia en contexto real.',
    graphicPrompt: 'Dos columnas: оración con "который" a la izquierda y su equivalente con participio a la derecha.',
    scene: [
      ['Студент, читающий книгу, — мой брат. (Studyent, chitáyushchiy knígu, — moy brat.)', 'El estudiante que está leyendo el libro es mi hermano.'],
      ['Женщина, говорящая по-русски, — наш гость. (Zhenshchina, gavaryáshchaya po-rússki, — nash gost\'.)', 'La mujer que habla ruso es nuestra invitada.'],
      ['Дети, игравшие в парке, устали. (Dyéti, igráfshiye v párke, ustáli.)', 'Los niños que jugaban en el parque se cansaron.'],
      ['Студентка, написавшая реферат, получила пятёрку. (Studyéntka, napisávshaya reférát, paluchíla pyatórku.)', 'La estudiante que escribió el trabajo recibió una nota cinco.'],
      ['Поезд, идущий на Москву, отходит в десять. (Poyezd, idúshchiy na Maskvu, otkhodit v desyat\'.)', 'El tren que va a Moscú sale a las diez.'],
      ['Человек, купивший билет, уже прошёл. (Chelovyek, kupívshiy bilyét, uzhe proshól.)', 'La persona que compró el billete ya pasó.'],
      ['Профессор, читавший лекцию, очень известный. (Profyéssor, chitávshiy lyéktsiu, óchen\' izvyéstniy.)', 'El profesor que daba la clase es muy famoso.'],
      ['Девушка, работающая здесь, знает ответ. (Devushka, rabótayushchaya zdyes\', znáyet otvyet.)', 'La chica que trabaja aquí sabe la respuesta.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['sufijos -ущий/-ющий/-ащий/-ящий', 'sufijo -вший/-ший', 'concordancia en género y caso'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce el participio correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el participio activo correcto para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'En la biblioteca',
            lines: [['', 'Студент, ___ книгу, — мой сосед. (El estudiante que lee el libro es mi vecino.)']],
            options: ['читающий', 'читавший', 'прочитавший'],
            answer: 'читающий',
            explain: 'Acción presente/simultánea con НСВ → participio activo presente: читающий (-ющий de 1ª conj.).',
          },
          {
            scene: 'Ayer en clase',
            lines: [['', 'Профессор, ___ лекцию вчера, — специалист по истории. (El profesor que dio la clase ayer es especialista en historia.)']],
            options: ['читавший', 'читающий', 'прочитавший', 'прочитающий'],
            answer: 'читавший',
            explain: 'Acción pasada, НСВ (proceso) → participio activo pasado: читавший (читать → читав + -ший).',
          },
          {
            scene: 'La chica que habla',
            lines: [['', 'Девушка, ___ по-русски, живёт в Москве. (La chica que habla en ruso vive en Moscú.)']],
            options: ['говорящая', 'говорившая', 'поговорившая', 'говорящий'],
            answer: 'говорящая',
            explain: 'Говорить (2ª conj.) → они говорят → говорящ- + -ая (femenino): говорящая.',
          },
          {
            scene: 'El niño que corría',
            lines: [['', 'Мальчик, ___ по улице, упал. (El niño que corría por la calle se cayó.)']],
            options: ['бежавший', 'бегущий', 'бегавший', 'побежавший'],
            answer: 'бежавший',
            explain: 'Acción pasada simultánea (mientras corría → se cayó). Бежать → тема бежа- + -вший: бежавший.',
          },
          {
            scene: 'Los estudiantes que escribieron',
            lines: [['', '___ тест студенты получили оценки. (Los estudiantes que escribieron el examen recibieron sus notas.)']],
            options: ['Написавшие', 'Написавший', 'Пишущие', 'Написавшая'],
            answer: 'Написавшие',
            explain: 'Plural (estudiantes) + СВ pasado → написавшие. Написать → написав- + -шие (plural).',
          },
          {
            scene: 'El tren que llega',
            lines: [['', 'Поезд, ___ на перрон, был полон. (El tren que llegaba al andén estaba lleno.)']],
            options: ['прибывающий', 'прибывавший', 'прибывший', 'прибывающая'],
            answer: 'прибывавший',
            explain: 'Описание прошлого процесса (imperfectivo pasado) → прибывавший. Прибывать → прибывавший.',
          },
          {
            scene: 'La mujer que trabaja',
            lines: [['', 'Женщина, ___ в банке, моя мама. (La mujer que trabaja en el banco es mi mamá.)']],
            options: ['работающая', 'работавшая', 'поработавшая', 'работающий'],
            answer: 'работающая',
            explain: 'Acción presente habitual → participio activo presente. Femenino: работающая.',
          },
          {
            scene: 'El amigo que llamó',
            lines: [['', 'Друг, ___ мне вчера, хочет встретиться. (El amigo que me llamó ayer quiere encontrarse.)']],
            options: ['позвонивший', 'звонивший', 'звонящий', 'позвонившая'],
            answer: 'позвонивший',
            explain: 'Acción pasada, СВ (llamada completada) → позвонивший. Позвонить → позвони- + -вший.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos participios en contexto',
        tag: '2 espacios',
        intro: 'Completa con los participios activos correctos.',
        type: 'dual',
        items: [
          {
            scene: 'En la oficina',
            lines: [['', 'Сотрудник, [[0]] отчёт, и коллега, [[1]] ему, работают вместе.']],
            blanks: [
              { options: ['пишущий', 'писавший', 'написавший', 'пишет'], answer: 'пишущий', explain: 'Acción presente simultánea con НСВ → пишущий. Писать (1ª conj.) → пишут → пишущий.' },
              { options: ['помогающий', 'помогавший', 'помогший', 'помог'], answer: 'помогающий', explain: 'También presente simultáneo. Помогать → помогают → помогающий.' },
            ],
          },
          {
            scene: 'Hablando de libros',
            lines: [['', 'Писатель, [[0]] этот роман, и читатели, [[1]] его, встретились на фестивале.']],
            blanks: [
              { options: ['написавший', 'пишущий', 'написавшая', 'написавшие'], answer: 'написавший', explain: 'СВ pasado (terminó de escribir la novela) → написавший. Masculino.' },
              { options: ['прочитавшие', 'читавшие', 'читающие', 'прочитавший'], answer: 'прочитавшие', explain: 'СВ pasado plural (lectores que leyeron el libro) → прочитавшие.' },
            ],
          },
          {
            scene: 'En el aeropuerto',
            lines: [['', 'Пассажиры, [[0]] из самолёта, и встречающие, [[1]] их, заполнили зал.']],
            blanks: [
              { options: ['вышедшие', 'выходящие', 'вышедший', 'выходившие'], answer: 'вышедшие', explain: 'СВ pasado plural (salieron del avión) → вышедшие. Выйти → вышед- + -шие.' },
              { options: ['встречающие', 'встречавшие', 'встретившие', 'встречающий'], answer: 'встречающие', explain: 'Presente activo plural (los que están esperando/recibiendo) → встречающие.' },
            ],
          },
          {
            scene: 'En la facultad',
            lines: [['', 'Студентка, [[0]] экзамен, и преподаватель, [[1]] её, пожали друг другу руки.']],
            blanks: [
              { options: ['сдавшая', 'сдающая', 'сдавший', 'сдавшие'], answer: 'сдавшая', explain: 'СВ pasado, femenino (ella aprobó el examen) → сдавшая. Сдать → сдав- + -шая.' },
              { options: ['принимавший', 'принимающий', 'принявший', 'принимавшая'], answer: 'принявший', explain: 'СВ pasado masculino (el profesor que aceptó/tomó el examen) → принявший.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto con participios',
        tag: 'Texto guiado',
        intro: 'Elige el participio activo correcto para completar el artículo de periódico.',
        type: 'guidedText',
        scene: 'Fragmento de artículo de periódico en ruso.',
        text: 'Вчера в центре города прошёл фестиваль. Музыканты, [[0]] на сцене, собрали тысячи зрителей. Художники, [[1]] свои работы, продали почти все картины. Волонтёры, [[2]] посетителям, работали с раннего утра. Победитель конкурса, [[3]] первый приз, выступил с речью. Дети, [[4]] участие в мастер-классах, получили подарки. Журналисты, [[5]] о фестивале, написали большие статьи.',
        blanks: [
          { options: ['выступавшие', 'выступающие', 'выступившие', 'выступавший'], answer: 'выступавшие', explain: 'Pasado plural НСВ (actuaban en el escenario durante el festival) → выступавшие.' },
          { options: ['выставлявшие', 'выставляющие', 'выставившие', 'выставлявший'], answer: 'выставлявшие', explain: 'Pasado plural НСВ (exhibían sus obras) → выставлявшие.' },
          { options: ['помогавшие', 'помогающие', 'помогшие', 'помогавший'], answer: 'помогавшие', explain: 'Pasado plural НСВ (ayudaban a los visitantes) → помогавшие.' },
          { options: ['получивший', 'получающий', 'получавший', 'получившие'], answer: 'получивший', explain: 'СВ pasado singular masculino (ganó el primer premio) → получивший.' },
          { options: ['принимавшие', 'принимающие', 'принявшие', 'принимавший'], answer: 'принявшие', explain: 'СВ pasado plural (participaron en los talleres) → принявшие.' },
          { options: ['писавшие', 'пишущие', 'написавшие', 'писавший'], answer: 'писавшие', explain: 'НСВ pasado plural (escribían sobre el festival) → писавшие.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Forma los participios',
        tag: 'Texto libre',
        intro: 'Escribe el participio activo correcto del verbo dado entre paréntesis.',
        type: 'freeText',
        scene: 'Convierte la descripción usando participios activos.',
        text: 'В нашем офисе работают интересные люди. Директор, [[0]] (руководить) компанией уже десять лет, очень опытный. Бухгалтер, [[1]] (проверить) все счета, нашла ошибку. Дизайнер, [[2]] (создавать) новый логотип, очень талантлив. Программист, [[3]] (написать) приложение, получил премию. Секретарь, [[4]] (работать) здесь с начала года, всех знает.',
        blanks: [
          { answer: 'руководящий', accepted: ['руководящий'], explain: 'Руководить (2ª conj.) → руководят → руководящий. Presente activo.' },
          { answer: 'проверившая', accepted: ['проверившая'], explain: 'Проверить (СВ) → провери- + -вшая. Femenino (бухгалтер femenino en contexto).' },
          { answer: 'создающий', accepted: ['создающий', 'создававший'], explain: 'Создавать (НСВ, proceso en curso) → создают → создающий.' },
          { answer: 'написавший', accepted: ['написавший'], explain: 'Написать (СВ) → написа- + -вший. Masculino.' },
          { answer: 'работающая', accepted: ['работающая', 'работавшая'], explain: 'Работать → работают → работающая. Presente activo femenino (habitual).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Convierte a participio',
        tag: 'Producción',
        intro: 'Transforma la oración con "который" en una oración con participio activo.',
        type: 'write',
        items: [
          {
            scene: 'Conversión НСВ presente',
            prompt: 'Convierte: "Студент, который читает книгу, — мой друг." → usa participio activo de presente.',
            answer: 'Студент, читающий книгу, — мой друг.',
            accepted: ['читающий'],
            explain: 'Который читает → participio presente НСВ: читающий (1ª conj., masc. nom.).',
          },
          {
            scene: 'Conversión НСВ pasado',
            prompt: 'Convierte: "Женщина, которая работала здесь, ушла." → usa participio activo de pasado.',
            answer: 'Женщина, работавшая здесь, ушла.',
            accepted: ['работавшая'],
            explain: 'Которая работала → participio pasado НСВ femenino: работавшая.',
          },
          {
            scene: 'Conversión СВ pasado',
            prompt: 'Convierte: "Врач, который написал рецепт, — профессор." → usa participio activo de pasado СВ.',
            answer: 'Врач, написавший рецепт, — профессор.',
            accepted: ['написавший'],
            explain: 'Который написал → participio pasado СВ masculino: написавший.',
          },
          {
            scene: 'Plural femenino',
            prompt: 'Convierte: "Девушки, которые пели на концерте, — студентки." → usa participio de pasado.',
            answer: 'Девушки, певшие на концерте, — студентки.',
            accepted: ['певшие', 'певшие'],
            explain: 'Которые пели → participio pasado НСВ plural: певшие. Петь → пе- + -вшие.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Describe personas',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones describiendo personas con participios activos (presente o pasado).',
        type: 'write',
        items: [
          {
            scene: 'Una persona en acción ahora',
            prompt: 'Describe a alguien que está haciendo algo ahora mismo usando un participio activo de presente.',
            answer: 'Мужчина, говорящий по телефону, — мой коллега.',
            accepted: ['говорящий', 'читающий', 'работающий', 'идущий', 'сидящий', 'стоящий', 'говорящая', 'читающая', 'работающая'],
            explain: 'Usa verbo НСВ en presente: habla → говорящий/-ая, lee → читающий/-ая, trabaja → работающий/-ая.',
          },
          {
            scene: 'Alguien que hizo algo',
            prompt: 'Describe a alguien que completó una acción usando un participio activo de pasado (СВ).',
            answer: 'Студент, сдавший экзамен, очень рад.',
            accepted: ['сдавший', 'написавший', 'купивший', 'приехавший', 'пришедший', 'позвонивший'],
            explain: 'Usa verbo СВ: aprobó → сдавший, escribió → написавший, llegó → приехавший/пришедший.',
          },
          {
            scene: 'Una descripción compleja',
            prompt: 'Escribe una oración con participio activo que incluya el participio + al menos un complemento.',
            answer: 'Девушка, изучающая русский язык в университете, говорит очень хорошо.',
            accepted: ['изучающая', 'учащаяся', 'работающий', 'живущий', 'приехавший', 'купивший'],
            explain: 'El participio puede tener su propio complemento directo u otras expansiones: "изучающая русский язык".',
          },
        ],
      },
    ],
  },
}

export default topic
