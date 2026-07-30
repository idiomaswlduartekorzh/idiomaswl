import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbos-irregulares-pasado-a2',
  order: '01',
  color: '#c60c30',
  category: 'Verbos',
  level: 'A2',
  title: 'Verbos irregulares en pasado Coreano A2 — Irregulares ㄹ, ㅂ y 르',
  shortTitle: 'Irregulares ㄹ/ㅂ/르',
  metaTitle: 'Verbos irregulares coreano A2 — ㄹ, ㅂ, 르 irregulares en pasado',
  description:
    'En coreano A2 debes dominar tres grupos de verbos irregulares que cambian la raiz al conjugar: el grupo ㄹ (raiz conserva ㄹ antes de vocal), el grupo ㅂ (ㅂ → 우 antes de vocal) y el grupo 르 (르 → ㄹㄹ). Conocerlos es clave para hablar con fluidez en presente y pasado.',
  lead: 'ㄹ irregulares: la raiz conserva ㄹ. ㅂ irregulares: ㅂ → 우 antes de vocal (덥다 → 더워요). 르 irregulares: 르 → ㄹㄹ (모르다 → 몰라요). Reconocer el grupo de cada verbo te permite conjugar correctamente sin memorizar caso por caso.',
  outcomes: [
    'Conjugar verbos ㄹ irregulares en presente y pasado',
    'Aplicar la regla ㅂ → 우 en adjetivos y verbos comunes',
    'Aplicar la regla 르 → ㄹㄹ en verbos de uso cotidiano',
    'Distinguir los tres grupos irregulares entre si',
  ],

  guide: {
    goal: 'Reconocer y conjugar los tres grupos de verbos irregulares mas frecuentes en coreano A2.',
    model: '알다 (saber) → 알아요/알았어요 | 덥다 (estar caluroso) → 더워요 | 모르다 (no saber) → 몰라요/몰랐어요',
    formula: 'ㄹ: raiz + 아요/어요 sin cambio | ㅂ → 우 + 어요 | 르 → ㄹ duplicado + 아요/어요',
    decisions: [
      'Identificar el grupo: la terminacion del diccionario revela el tipo irregular',
      'Grupo ㄹ: raiz termina en ㄹ; ante vocal (아/어) se conserva — 알다 → 알아요, 알았어요',
      'Grupo ㄹ especial: ante consonante fuerte ㄹ se suprime — 알다 + -(으)세요 → 아세요',
      'Grupo ㅂ: ㅂ final se convierte en 우 ante vocal — 덥다 → 더+우+어요 → 더워요',
      'Grupo ㅂ pasado: 더워 → 더웠어요',
      'Grupo 르: 르 se convierte en ㄹ que se duplica en la silaba anterior — 모르다 → 몰+ㄹ+아요 → 몰라요',
      'Grupo 르 pasado: 몰랐어요 (모르 → 몰+ㄹ+았어요)',
    ],
    table: [
      ['Infinitivo', 'Presente 해요체', 'Pasado 했어요'],
      ['알다 (saber)', '알아요', '알았어요'],
      ['살다 (vivir)', '살아요', '살았어요'],
      ['덥다 (caluroso)', '더워요', '더웠어요'],
      ['춥다 (frio)', '추워요', '추웠어요'],
      ['모르다 (no saber)', '몰라요', '몰랐어요'],
      ['다르다 (diferente)', '달라요', '달랐어요'],
    ],
    mistakes: [
      '"더버요" — ㅂ irregulares cambian ㅂ→우: 덥다 → 더워요, nunca 더버요',
      '"몰르아요" — 르 se convierte en ㄹㄹ en la silaba anterior: 모르다 → 몰라요',
      '"알으세요" — grupo ㄹ suprime ㄹ ante terminaciones consonanticas: 알다 → 아세요',
    ],
  },

  seo: [
    {
      heading: '¿Cuáles son los verbos irregulares del coreano A2?',
      paragraphs: [
        'En coreano la mayoria de verbos siguen reglas regulares, pero un grupo importante cambia la raiz al conjugarse. En A2 los mas urgentes son tres: ㄹ irregulares (raiz termina en ㄹ), ㅂ irregulares (ㅂ final cambia a 우) y 르 irregulares (르 se convierte en ㄹ duplicado). Dominar estos tres grupos te permitira hablar con naturalidad sobre clima, habilidades y emociones.',
        'La buena noticia: estos cambios son sistematicos. Una vez que interiorizas la regla de cada grupo, la aplicas a todos sus miembros. No hace falta memorizar cada verbo por separado.',
      ],
    },
    {
      heading: '¿Cómo funciona el grupo irregular ㅂ en coreano?',
      paragraphs: [
        'El grupo ㅂ incluye los adjetivos de clima y sensacion mas comunes: 덥다 (caluroso), 춥다 (frio), 가깝다 (cercano), 어렵다 (dificil), 쉽다 (facil), 아름답다 (hermoso). Todos convierten ㅂ en 우 antes de vocal: 덥다 → 더워요, 춥다 → 추워요.',
        'Excepcion importante: 좋다 (bueno/le gusta) NO es irregular — 좋아요 es regular. Tambien 잡다 (agarrar) y 입다 (vestirse) son regulares a pesar de terminar en ㅂ.',
      ],
      table: [
        ['Adjetivo', 'Presente', 'Uso'],
        ['덥다 (caluroso)', '더워요', 'Hablar del clima'],
        ['춥다 (frio)', '추워요', 'Hablar del clima'],
        ['어렵다 (dificil)', '어려워요', 'Nivel de dificultad'],
        ['쉽다 (facil)', '쉬워요', 'Nivel de facilidad'],
      ],
    },
    {
      heading: '¿Cómo funciona el grupo irregular 르 en coreano?',
      paragraphs: [
        '르 irregulares incluyen verbos muy utiles: 모르다 (no saber), 다르다 (ser diferente), 부르다 (llamar/cantar), 빠르다 (rapido), 고르다 (elegir). La regla: quitas 르, duplicas ㄹ en la silaba anterior y anade 아/어: 모르 → 몰+ㄹ+아요 → 몰라요.',
        'En pasado la logica es la misma: 몰랐어요, 달랐어요, 불렀어요. La raiz modificada es la base para todas las conjugaciones siguientes.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Irregulares ㄹ/ㅂ/르: cada grupo tiene su propia regla de transformacion de raiz.',
    graphicPrompt: 'Tabla comparativa de los tres grupos irregulares con ejemplos y transformaciones resaltadas.',
    scene: [
      ['알다 → 알아요 (saber)', 'Grupo ㄹ: raiz se conserva ante vocal'],
      ['덥다 → 더워요 (caluroso)', 'Grupo ㅂ: ㅂ → 우 ante vocal'],
      ['춥다 → 추워요 (frio)', 'Grupo ㅂ: patron identico a 덥다'],
      ['모르다 → 몰라요 (no saber)', 'Grupo 르: ㄹ se duplica en silaba anterior'],
      ['다르다 → 달라요 (diferente)', 'Grupo 르: mismo patron que 모르다'],
      ['살다 → 살아요 (vivir)', 'Grupo ㄹ: raiz conserva ㄹ en presente'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['ㅂ → 우', '르 → ㄹㄹ', 'grupo ㄹ conserva raiz'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Reconocimiento de irregulares',
        tag: 'Opcion multiple',
        intro: 'Elige la conjugacion correcta en presente 해요체.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando del clima',
            lines: [['Ana', '오늘 날씨가 ___ (덥다). (El clima hoy esta ___.)']],
            options: ['더워요', '더버요', '덥아요', '덥어요'],
            answer: '더워요',
            explain: '덥다 es irregular ㅂ: ㅂ → 우 ante vocal. 덥 → 더 + 우 + 어요 → 더워요.',
          },
          {
            scene: 'Invierno en Corea',
            lines: [['Tomás', '서울은 겨울에 ___ (춥다). (En Seul en invierno hace ___ .)']],
            options: ['추워요', '추버요', '춥아요', '춥어요'],
            answer: '추워요',
            explain: '춥다 es irregular ㅂ: 춥 → 추 + 우 + 어요 → 추워요.',
          },
          {
            scene: 'No recuerdo',
            lines: [['Lina', '그 단어를 ___ (모르다). (No se esa palabra.)']],
            options: ['몰라요', '모르아요', '모라요', '몰러요'],
            answer: '몰라요',
            explain: '모르다 es irregular 르: 모르 → 몰 + ㄹ + 아요 → 몰라요.',
          },
          {
            scene: 'Comparando',
            lines: [['Carlos', '두 방법이 ___ (다르다). (Los dos metodos son ___ .)']],
            options: ['달라요', '다르아요', '다라요', '달러요'],
            answer: '달라요',
            explain: '다르다 es irregular 르: 다르 → 달 + ㄹ + 아요 → 달라요.',
          },
          {
            scene: 'Sobre Tomás',
            lines: [['Sofia', '데이비드 선생님은 부카라망가에 ___ (살다). (El profesor Tomás vive en Bucaramanga.)']],
            options: ['살아요', '살으아요', '사라요', '삽니다'],
            answer: '살아요',
            explain: '살다 es irregular ㄹ: ante vocal 아/어 se conserva la raiz. 살 + 아요 → 살아요.',
          },
          {
            scene: 'Coreano es dificil',
            lines: [['Marco', '한국어가 ___ (어렵다). (El coreano es ___ .)']],
            options: ['어려워요', '어렵아요', '어렵어요', '어려버요'],
            answer: '어려워요',
            explain: '어렵다 es irregular ㅂ: 어렵 → 어려 + 우 + 어요 → 어려워요.',
          },
          {
            scene: 'Cantando',
            lines: [['Alba', '학생들이 노래를 ___ (부르다). (Los estudiantes cantan una cancion.)']],
            options: ['불러요', '부르아요', '부라요', '불르요'],
            answer: '불러요',
            explain: '부르다 es irregular 르: 부르 → 불 + ㄹ + 어요 → 불러요.',
          },
          {
            scene: 'Excepcion regular',
            lines: [['Lina', '이 음식이 ___ (좋다). (Esta comida esta ___ .)']],
            options: ['좋아요', '조워요', '졸라요', '조아요'],
            answer: '좋아요',
            explain: '좋다 NO es irregular ㅂ — es regular: 좋 + 아요 → 좋아요.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Dialogos con dos espacios',
        tag: '2 espacios',
        intro: 'Completa los dialogos con la forma correcta del verbo irregular.',
        type: 'dual',
        items: [
          {
            scene: 'Conversacion sobre el clima',
            lines: [
 ['Ana', '오늘 [[0]] (덥다)? (Esta caluroso hoy?)'],
 ['Carlos', '네, 정말 [[1]] (덥다). (Si, esta muy caluroso.)'],
 ],
            blanks: [
              { options: ['더워요', '덥아요', '더버요', '덥습니다'], answer: '더워요', explain: '덥다 → ㅂ irregular: 더워요.' },
              { options: ['더워요', '덥아요', '더버요', '덥습니다'], answer: '더워요', explain: '덥다 → 더워요. Mismo patron en afirmacion.' },
            ],
          },
          {
            scene: 'Estudiando en WeLearn',
            lines: [
 ['Alba', '이 문법을 [[0]] (알다)? (Sabes esta gramatica?)'],
 ['Sofia', '아니요, [[1]] (모르다). (No, no lo se.)'],
 ],
            blanks: [
              { options: ['알아요', '아아요', '알으아요', '압니다'], answer: '알아요', explain: '알다 → ㄹ irregular: 알 + 아요 → 알아요.' },
              { options: ['몰라요', '모르아요', '모라요', '몰르요'], answer: '몰라요', explain: '모르다 → 르 irregular: 몰 + ㄹ + 아요 → 몰라요.' },
            ],
          },
          {
            scene: 'Comparando ciudades',
            lines: [
 ['Marco', '서울과 부산이 [[0]] (다르다)? (Son diferentes Seoul y Busan?)'],
 ['Tomás', '네, 많이 [[1]] (다르다). (Si, son muy diferentes.)'],
 ],
            blanks: [
              { options: ['달라요', '다르아요', '다라요', '달르요'], answer: '달라요', explain: '다르다 → 르 irregular: 달 + ㄹ + 아요 → 달라요.' },
              { options: ['달라요', '다르아요', '다라요', '달르요'], answer: '달라요', explain: '다르다 → 달라요. Mismo patron.' },
            ],
          },
          {
            scene: 'Habilidades',
            lines: [
 ['Lina', '수영을 할 때 [[0]] (어렵다)? (Es dificil cuando nadas?)'],
 ['Carlos', '처음에는 [[1]] (어렵다). (Al principio es dificil.)'],
 ],
            blanks: [
              { options: ['어려워요', '어렵아요', '어려버요', '어렵습니다'], answer: '어려워요', explain: '어렵다 → ㅂ irregular: 어려 + 우 + 어요 → 어려워요.' },
              { options: ['어려워요', '어렵아요', '어려버요', '어렵습니다'], answer: '어려워요', explain: '어렵다 → 어려워요. Contexto afirmativo.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el texto con las formas irregulares correctas en 해요체.',
        type: 'guidedText',
        scene: 'Diario de un estudiante de coreano en verano',
        text: '오늘 날씨가 정말 [[0]] (덥다). 그래서 공부하기가 [[1]] (어렵다). 하지만 저는 열심히 공부해요. 한국어를 잘 [[2]] (모르다) → 아직 몰라요. 그래도 매일 조금씩 [[3]] (배우다). 선생님이 노래를 [[4]] (부르다) 때 저도 따라 해요. 한국 문화가 제 문화와 많이 [[5]] (다르다).',
        blanks: [
          { options: ['더워요', '덥아요', '더버요', '덥어요'], answer: '더워요', explain: '덥다 → ㅂ irregular: 더워요.' },
          { options: ['어려워요', '어렵아요', '어렵어요', '어려버요'], answer: '어려워요', explain: '어렵다 → ㅂ irregular: 어려워요.' },
          { options: ['몰라요', '모르아요', '모라요', '모릅니다'], answer: '몰라요', explain: '모르다 → 르 irregular: 몰라요.' },
          { options: ['배워요', '배우어요', '배우요', '배웁니다'], answer: '배워요', explain: '배우다 → ㅜ+ㅓ 수축: 배워요.' },
          { options: ['불러요', '부르아요', '부라요', '부릅니다'], answer: '불러요', explain: '부르다 → 르 irregular: 불러요.' },
          { options: ['달라요', '다르아요', '다라요', '다릅니다'], answer: '달라요', explain: '다르다 → 르 irregular: 달라요.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la forma 해요체 correcta de cada verbo irregular.',
        type: 'freeText',
        scene: 'Preguntas sobre el clima y el conocimiento',
        text: '오늘 날씨가 [[0]]. (춥다) / 저는 그 사람을 잘 [[1]]. (모르다) / 음식 맛이 다 [[2]]. (다르다) / 친구가 서울에 [[3]]. (살다) / 한국어가 [[4]]. (어렵다)',
        blanks: [
          { answer: '추워요', explain: '춥다 → ㅂ irregular: 추 + 우 + 어요 → 추워요.' },
          { answer: '몰라요', explain: '모르다 → 르 irregular: 몰 + ㄹ + 아요 → 몰라요.' },
          { answer: '달라요', explain: '다르다 → 르 irregular: 달 + ㄹ + 아요 → 달라요.' },
          { answer: '살아요', explain: '살다 → ㄹ irregular: 살 + 아요 → 살아요 (raiz conservada ante vocal).' },
          { answer: '어려워요', explain: '어렵다 → ㅂ irregular: 어려 + 우 + 어요 → 어려워요.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produccion guiada',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones completas usando los verbos irregulares indicados.',
        type: 'write',
        items: [
          {
            scene: 'Hablando del clima en Colombia',
            prompt: 'Di "En Bucaramanga el clima esta caluroso" usando 덥다.',
            answer: '부카라망가는 날씨가 더워요.',
            accepted: ['더워요', '날씨가 더워요', '부카라망가는 더워요'],
            explain: '덥다 → ㅂ irregular: 더워요. Estructura: lugar + 는/은 + 날씨가 + forma.',
          },
          {
            scene: 'Hablando de lo que no sabes',
            prompt: 'Di "No se esa gramatica" usando 모르다 (그 문법=esa gramatica).',
            answer: '그 문법을 몰라요.',
            accepted: ['몰라요', '문법을 몰라요', '그 문법을 몰라요'],
            explain: '모르다 → 르 irregular: 몰 + ㄹ + 아요 → 몰라요. Objeto + 을/를 + 몰라요.',
          },
          {
            scene: 'Diferencias culturales',
            prompt: 'Di "La comida coreana y colombiana son diferentes" usando 다르다 (한국 음식=comida coreana, 콜롬비아 음식=comida colombiana).',
            answer: '한국 음식과 콜롬비아 음식이 달라요.',
            accepted: ['달라요', '음식이 달라요', '한국과 콜롬비아가 달라요'],
            explain: '다르다 → 르 irregular: 달 + ㄹ + 아요 → 달라요.',
          },
          {
            scene: 'Sobre el pasado',
            prompt: 'Di "El verano pasado estuvo muy caluroso" usando 더웠어요 (지난 여름=verano pasado, 정말=muy).',
            answer: '지난 여름은 정말 더웠어요.',
            accepted: ['더웠어요', '정말 더웠어요', '지난 여름 더웠어요'],
            explain: '덥다 → 더워요 (presente) → 더웠어요 (pasado). ㅂ irregular en pasado.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Escritura libre',
        intro: 'Describe situaciones usando verbos irregulares en presente y pasado.',
        type: 'write',
        items: [
          {
            scene: 'El clima de hoy',
            prompt: 'Describe el clima de hoy usando al menos un verbo ㅂ irregular (덥다/춥다).',
            answer: '오늘 날씨가 더워요. 정말 덥네요.',
            accepted: ['더워요', '추워요', '날씨가'],
            explain: '덥다 → 더워요 (caluroso); 춥다 → 추워요 (frio). Elige segun la estacion.',
          },
          {
            scene: 'Lo que no sabes todavia',
            prompt: 'Di que cosa de coreano todavia no sabes, usando 모르다.',
            answer: '저는 아직 한자를 몰라요.',
            accepted: ['몰라요', '아직 몰라요', '모릅니다'],
            explain: '모르다 → 몰라요 (presente); 몰랐어요 (pasado). 아직 = todavia.',
          },
          {
            scene: 'Comparacion de idiomas',
            prompt: 'Compara dos idiomas usando 다르다 (el español y el coreano son muy diferentes).',
            answer: '스페인어와 한국어는 많이 달라요.',
            accepted: ['달라요', '많이 달라요', '스페인어와 한국어'],
            explain: '다르다 → 달라요. 많이 = mucho, muy. Estructura: A와/과 B는 달라요.',
          },
        ],
      },
    ],
  },
}

export default topic
