import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'numeros-sino-coreanos',
  order: '12',
  color: '#c60c30',
  category: 'Números',
  level: 'A1',
  title: 'Números Sino-Coreanos en Coreano A1 — 일 이 삼 사 오',
  shortTitle: 'Números sino-coreanos',
  metaTitle: 'Números sino-coreanos coreano A1 — fechas dinero minutos coreano principiantes',
  description:
    'El sistema sino-coreano (한자어 — hanjaeо) es uno de los dos sistemas numéricos del coreano. Deriva del chino y se usa para fechas, dinero, números de teléfono, pisos y minutos. Dominar este sistema es clave para la vida cotidiana en Corea.',
  lead: '일(il/1), 이(i/2), 삼(sam/3), 사(sa/4), 오(o/5), 육(yuk/6), 칠(chil/7), 팔(pal/8), 구(gu/9), 십(sip/10), 백(baek/100), 천(cheon/1.000). Se usa para FECHAS, DINERO, MINUTOS y PISOS.',
  outcomes: [
    'Cuenta del 1 al 100 con el sistema sino-coreano',
    'Usa los números sino-coreanos para fechas (월/일) y dinero (원)',
    'Distingue cuándo usar el sistema sino-coreano vs. el nativo',
  ],

  guide: {
    goal: 'Usar el sistema numérico sino-coreano para fechas, dinero, minutos y números de teléfono.',
    model: '삼월 이십일일 (3 de marzo), 이천 원 (2.000 wones), 삼십 분 (30 minutos)',
    formula: '[Número sino-coreano] + 월(mes) / 일(día) / 원(won) / 분(minuto) / 층(piso)',
    decisions: [
      '1–9: 일 이 삼 사 오 육 칠 팔 구 (il i sam sa o yuk chil pal gu)',
      '10, 20, 30... = 십, 이십, 삼십, 사십, 오십, 육십, 칠십, 팔십, 구십',
      '100 = 백(baek), 1.000 = 천(cheon), 10.000 = 만(man)',
      'Fechas: 3월(marzo) = 삼월 / 10월(octubre) = 시월 (excepción: 시월, no 십월)',
      'Dinero: 이천 원 = 2.000 wones / 오만 원 = 50.000 wones',
      'Minutos: 오 분(5 min), 십 분(10 min), 삼십 분(30 min) — con números sino-coreanos',
      'Números de teléfono: se leen dígito a dígito con sino-coreano',
    ],
    table: [
      ['Número', 'Sino-coreano', 'Uso principal'],
      ['1', '일 (il)', 'Mes 1월 = 일월 (enero)'],
      ['5', '오 (o)', 'Mes 5월 = 오월 (mayo)'],
      ['10', '십 (sip)', '10분 = diez minutos'],
      ['20', '이십 (isip)', '이십 분 = 20 minutos'],
      ['100', '백 (baek)', '백 원 = 100 wones'],
      ['1.000', '천 (cheon)', '이천 원 = 2.000 wones'],
      ['10.000', '만 (man)', '오만 원 = 50.000 wones'],
    ],
    mistakes: [
      '"십월" ❌ — octubre es SIEMPRE 시월 (excepción fija, no 십월) ✓',
      '"일백 원" ❌ — cuando la cifra empieza con 1 en 백/천/만, se omite 일: "백 원" ✓',
      'Usar sino-coreano para HORAS ❌ — las horas usan números NATIVOS: 한 시 (1h), no 일 시 ✓',
    ],
  },

  seo: [
    {
      heading: '¿Por qué el coreano tiene dos sistemas numéricos?',
      paragraphs: [
        'El coreano heredó del chino clásico un segundo sistema numérico que coexiste con los números nativos coreanos. Hoy ambos sistemas son parte integral del idioma y se usan en contextos distintos: el sino-coreano (한자어) para fechas, precios, minutos, números de teléfono y pisos; el nativo para contar objetos físicos y decir las horas.',
        'Para un principiante esto puede parecer complicado, pero en la práctica se aprende rápido porque cada sistema tiene dominios muy claros. Si estás hablando de dinero o de una fecha → sino-coreano. Si estás contando manzanas o diciendo "son las dos" → nativo.',
      ],
    },
    {
      heading: 'Cómo construir números compuestos',
      paragraphs: [
        'El sistema es completamente regular: 11 = 십일 (sip + il), 22 = 이십이 (isip + i), 35 = 삼십오 (samsip + o), 100 = 백 (baek), 200 = 이백 (i + baek), 1.000 = 천 (cheon), 5.000 = 오천 (o + cheon).',
        'La única excepción notoria es 10월 (octubre) que se pronuncia 시월, no 십월. También en 6월 (junio) se puede escuchar 유월 en lugar de 육월. Estas dos excepciones conviene memorizar directamente.',
      ],
      table: [
        ['Combinación', 'Resultado', 'Ejemplo de uso'],
        ['십 + 일', '십일 (11)', '11월 = noviembre'],
        ['이 + 십', '이십 (20)', '이십 원 = 20 wones'],
        ['삼 + 백', '삼백 (300)', '삼백 원 = 300 wones'],
        ['이 + 천', '이천 (2.000)', '이천 원 = 2.000 wones'],
      ],
    },
    {
      heading: 'Meses del año con números sino-coreanos',
      paragraphs: [
        'Los meses en coreano son simplemente el número + 월(wol): 1월(일월=enero), 2월(이월=febrero), 3월(삼월=marzo), 4월(사월=abril), 5월(오월=mayo), 6월(유월=junio), 7월(칠월=julio), 8월(팔월=agosto), 9월(구월=septiembre), 10월(시월=octubre), 11월(십일월=noviembre), 12월(십이월=diciembre).',
        'Para decir una fecha completa: 삼월 이십오일 = 25 de marzo. El orden es mes + 월 + día + 일: 구월 십오일 = 15 de septiembre.',
      ],
    },
    {
      heading: 'Precios y dinero en won coreano',
      paragraphs: [
        'Los precios en Corea suelen ser números grandes por el valor del won: 오천 원(5.000 wones), 일만 원(10.000 wones), 오만 원(50.000 wones). La unidad 만(man = 10.000) es muy importante en la vida cotidiana — en España diríamos "diez mil" pero en Corea se dice simplemente "일만".',
        'El billete más común es el de 만 원 (10.000 wones). Saber decir precios es una habilidad práctica inmediata que hace que el sistema sino-coreano valga la pena aprender desde el primer día.',
      ],
    },
  ],

  visual: {
    mode: 'numbers',
    teacherLens: 'Sistema sino-coreano: dígitos base + construcción compuesta + usos (fechas, dinero, minutos).',
    graphicPrompt: 'Tabla de números 1-10 con sino-coreano y ejemplos de uso en fecha y precio.',
    scene: [
      ['일 이 삼 사 오', '1 2 3 4 5 (il i sam sa o)'],
      ['육 칠 팔 구 십', '6 7 8 9 10 (yuk chil pal gu sip)'],
      ['이십 / 삼십 / 백', '20 / 30 / 100 (isip / samsip / baek)'],
      ['삼월 이십오일', '25 de marzo (fecha con sino-coreano)'],
      ['이천오백 원', '2.500 wones (precio)'],
      ['삼십 분', '30 minutos (minutos con sino-coreano)'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['1-10 sino-coreano', 'meses del año', 'precios en won'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Nivel 1 — Reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Elige el número sino-coreano correcto.',
        type: 'choice',
        items: [
          {
            scene: 'En la tienda',
            lines: [['David', '이천 원이에요. (Son 2.000 wones.) — ¿Cuántos wones?']],
            options: ['2.000', '200', '20', '20.000'],
            answer: '2.000',
            explain: '이천(icheon) = 2 × 천(1.000) = 2.000 wones.',
          },
          {
            scene: 'Fecha de hoy',
            lines: [['Zhanna', '오늘은 삼월 오일이에요. (Hoy es 5 de marzo.) — ¿Qué mes?']],
            options: ['Marzo', 'Mayo', 'Enero', 'Octubre'],
            answer: 'Marzo',
            explain: '삼월(samwol) = tercer mes = marzo. 삼 = 3.',
          },
          {
            scene: 'En el edificio',
            lines: [['Carlos', '오 층에 있어요. (Está en el 5º piso.) — ¿Qué piso?']],
            options: ['5º', '3º', '7º', '9º'],
            answer: '5º',
            explain: '오(o) = 5. 오 층 = 5º piso. 층(cheung) = piso/planta.',
          },
          {
            scene: 'Minutos de espera',
            lines: [['Ana', '십오 분 기다려요. (Espera 15 minutos.) — ¿Cuántos minutos?']],
            options: ['15', '5', '50', '150'],
            answer: '15',
            explain: '십오(sibo) = 십(10) + 오(5) = 15 minutos.',
          },
          {
            scene: 'Número de teléfono',
            lines: [['Sofia', '전화번호가 뭐예요? — ¿Cómo se lee 010?']],
            options: ['공일공', '영일영', '일이삼', '오일공'],
            answer: '공일공',
            explain: '0 en teléfonos = 공(gong). 010 → 공일공.',
          },
          {
            scene: 'Octubre en coreano',
            lines: [['Lina', '10월은 어떻게 읽어요? (¿Cómo se lee el mes 10?)']],
            options: ['시월', '십월', '일영월', '열 달'],
            answer: '시월',
            explain: 'Octubre = 시월 (excepción fija, no 십월).',
          },
          {
            scene: 'Precio de ropa',
            lines: [['Marco', '이 옷은 오만 원이에요. (Esta ropa cuesta 50.000 wones.) — ¿Cuánto?']],
            options: ['50.000', '5.000', '500', '500.000'],
            answer: '50.000',
            explain: '오만(oman) = 오(5) × 만(10.000) = 50.000 wones.',
          },
          {
            scene: 'Mes de examen',
            lines: [['David', 'IELTS 시험이 구월이에요. (El examen IELTS es en septiembre.)']],
            options: ['Septiembre', 'Junio', 'Noviembre', 'Diciembre'],
            answer: 'Septiembre',
            explain: '구월(guwol) = noveno mes = septiembre. 구 = 9.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Nivel 2 — Diálogo con dos espacios',
        tag: '2 espacios',
        intro: 'Completa los diálogos con los números sino-coreanos correctos.',
        type: 'dual',
        items: [
          {
            scene: 'En la cafetería',
            lines: [
              ['Carlos', '이 커피는 얼마예요? (¿Cuánto cuesta este café?)'],
              ['Vendedor', '[[0]] [[1]] 원이에요. (Son 3.500 wones.)'],
            ],
            blanks: [
              { options: ['삼천', '이천', '사천', '오천'], answer: '삼천', explain: '삼천(samcheon) = 3.000. Tres mil wones.' },
              { options: ['오백', '백', '오십', '이백'], answer: '오백', explain: '오백(obaek) = 500. 삼천오백 = 3.500.' },
            ],
          },
          {
            scene: 'Hablando de cumpleaños',
            lines: [
              ['Ana', '생일이 언제예요? (¿Cuándo es tu cumpleaños?)'],
              ['Lina', '[[0]] [[1]] 이일이에요. (Es el 2 de julio.)'],
            ],
            blanks: [
              { options: ['칠월', '시월', '삼월', '오월'], answer: '칠월', explain: '칠월(chilwol) = julio (7월).' },
              { options: ['칠월', '팔월', '이월', '구월'], answer: '칠월', explain: 'Espera: la respuesta es 칠월 이일 = 2 de julio. 칠월 ya en [[0]].' },
            ],
          },
          {
            scene: 'Reservando mesa',
            lines: [
              ['Sofia', '몇 분이에요? (¿Cuántas personas son?)'],
              ['Marco', '[[0]] [[1]]이에요. (Somos 4 personas.)'],
            ],
            blanks: [
              { options: ['사', '오', '삼', '이'], answer: '사', explain: '사(sa) = 4. Con 분(personas formales) — nativo también válido, pero aquí uso sino-coreano.' },
              { options: ['명', '분', '층', '시'], answer: '명', explain: '명(myeong) = contador de personas. 사 명 = 4 personas.' },
            ],
          },
          {
            scene: 'Hora de reunión',
            lines: [
              ['David', '회의가 몇 시에 시작해요? (¿A qué hora empieza la reunión?)'],
              ['Zhanna', '[[0]] 시 [[1]] 분에 시작해요. (Empieza a las 2 y 30.)'],
            ],
            blanks: [
              { options: ['두', '이', '사', '오'], answer: '두', explain: 'HORAS usan número NATIVO: 두 시 = las 2. (두 = nativo para 2).' },
              { options: ['삼십', '이십', '오십', '사십'], answer: '삼십', explain: 'MINUTOS usan sino-coreano: 삼십 분 = 30 minutos.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el texto con los números sino-coreanos o nativos correctos.',
        type: 'guidedText',
        scene: 'David habla sobre su agenda del mes',
        text: '저는 [[0]]월에 한국에 가요. (Voy a Corea en octubre.) 비행기가 [[1]] 일에 출발해요. (El avión sale el día 15.) 표 값은 [[2]] 만 원이에요. (El tiquete cuesta 500.000 wones.) 한국에 [[3]] 일 있어요. (Estaré 10 días en Corea.) 매일 [[4]] 시간 한국어를 공부해요. (Estudio coreano 3 horas al día.) 학원이 [[5]] 층에 있어요. (La academia está en el 7º piso.)',
        blanks: [
          { options: ['시', '십', '구', '팔'], answer: '시', explain: '10월 = 시월 (excepción: no 십월). Octubre = 시월.' },
          { options: ['십오', '오십', '일오', '열다섯'], answer: '십오', explain: '15 con sino-coreano: 십오(sibo). Para fechas → sino-coreano.' },
          { options: ['오십', '오백', '오천', '오만'], answer: '오십', explain: '500.000 원 = 오십만 원. 오십(50) × 만(10.000) = 500.000.' },
          { options: ['십', '열', '일십', '십일'], answer: '십', explain: '10 días = 십 일(sip il). Para días → sino-coreano.' },
          { options: ['세', '삼', '사', '두'], answer: '삼', explain: '3 horas: con 시간(horas de duración) se puede usar sino-coreano: 삼 시간.' },
          { options: ['칠', '일곱', '팔', '육'], answer: '칠', explain: '7º piso = 칠 층. Para pisos → sino-coreano.' },
        ],
      },
      {
        id: 'l4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe el número sino-coreano correcto para cada situación.',
        type: 'freeText',
        scene: 'Práctica de números en contexto real',
        text: '커피가 사천오백 원이에요. (El café cuesta ___.) / 오늘은 이월 삼일이에요. (Hoy es ___.) / 십오 분 기다려요. (Espera ___ minutos.) / 내 전화번호는 공일공-이천-오천이에요. (Mi número es ___.) / 회의실이 삼 층에 있어요. (La sala de reuniones está en ___. )',
        blanks: [
          { answer: '4.500 wones', accepted: ['4.500', '4500', '4.500 wones', 'cuatro mil quinientos wones'], explain: '사천오백 = 4.000 + 500 = 4.500.' },
          { answer: '3 de febrero', accepted: ['3 de febrero', 'febrero 3', '2월 3일', 'el 3 de febrero'], explain: '이월(febrero) 삼일(día 3) = 3 de febrero.' },
          { answer: '15', accepted: ['15', 'quince'], explain: '십오(sibo) = 15 minutos.' },
          { answer: '010-2000-5000', accepted: ['010-2000-5000', '공일공-이천-오천'], explain: '공일공(010) - 이천(2000) - 오천(5000).' },
          { answer: '3er piso', accepted: ['3er piso', '3º piso', 'tercer piso', 'piso 3'], explain: '삼 층 = 3º piso.' },
        ],
      },
      {
        id: 'l5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe en coreano usando números sino-coreanos.',
        type: 'write',
        items: [
          {
            scene: 'Precio de un libro',
            prompt: 'Di "Este libro cuesta 12.000 wones" en coreano (책=libro, 얼마=cuánto/precio).',
            answer: '이 책은 만 이천 원이에요.',
            accepted: ['만 이천 원', '만이천 원', '일만 이천 원'],
            explain: '12.000 = 만(10.000) + 이천(2.000) = 만 이천 원.',
          },
          {
            scene: 'Fecha de nacimiento',
            prompt: 'Di "Nací el 15 de agosto" (팔월=agosto, 태어났어요=nací).',
            answer: '팔월 십오일에 태어났어요.',
            accepted: ['팔월 십오일', '8월 15일', '팔월 십오일에'],
            explain: '팔월(agosto) + 십오일(día 15). Las fechas van con sino-coreano.',
          },
          {
            scene: 'Tiempo de espera',
            prompt: 'Di "Por favor espera 30 minutos" (기다려 주세요=por favor espera).',
            answer: '삼십 분 기다려 주세요.',
            accepted: ['삼십 분', '30분 기다려 주세요'],
            explain: '삼십 분(samsip bun) = 30 minutos. Minutos siempre con sino-coreano.',
          },
          {
            scene: 'Número de piso',
            prompt: 'Di "La clase está en el 4º piso" (교실=clase, 있어요=está).',
            answer: '교실이 사 층에 있어요.',
            accepted: ['사 층', '4층', '사층'],
            explain: '사 층(sa cheung) = 4º piso. Pisos con sino-coreano.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Usa números sino-coreanos para describir tu día o entorno.',
        type: 'write',
        items: [
          {
            scene: 'Tu agenda del mes',
            prompt: 'Di en qué mes y día tienes algo importante: ___월 ___일에 ___이에요/있어요.',
            answer: '오월 이십일일에 시험이 있어요.',
            accepted: ['월', '일에', '있어요', '이에요'],
            explain: 'Fecha con sino-coreano: [mes]월 [día]일에. Ej: 오월 이십일일 = 21 de mayo.',
          },
          {
            scene: 'Un precio',
            prompt: 'Di cuánto cuesta algo que compras habitualmente: ___는/은 ___ 원이에요.',
            answer: '아메리카노는 사천 원이에요.',
            accepted: ['원이에요', '원', '천', '만'],
            explain: 'Precios con sino-coreano: 사천(4.000), 오천(5.000), 만(10.000) 원.',
          },
          {
            scene: 'Una hora con minutos',
            prompt: 'Di una hora con minutos: 오후 ___ 시 ___ 분이에요. (Horas=nativo, Minutos=sino-coreano)',
            answer: '오후 두 시 삼십 분이에요.',
            accepted: ['시', '분이에요', '삼십', '이십'],
            explain: 'Horas (두=nativo) + minutos (삼십=sino-coreano). Dos sistemas en una sola expresión.',
          },
        ],
      },
    ],
  },
}

export default topic
