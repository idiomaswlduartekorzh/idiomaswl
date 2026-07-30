import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'estructura-sov',
  order: '02',
  color: '#003478',
  category: 'Sintaxis',
  level: 'A1',
  title: 'Estructura SOV del Coreano A1',
  shortTitle: 'Estructura SOV',
  metaTitle: 'Estructura SOV coreano A1 — sujeto-objeto-verbo en coreano',
  description:
    'El coreano es una lengua SOV (Sujeto-Objeto-Verbo): el verbo va siempre al final de la oración. Las partículas gramaticales indican la función de cada elemento. Esta estructura es radicalmente diferente al español (SVO) y hay que interiorizar el orden nuevo.',
  lead: 'En coreano el verbo va AL FINAL. "Yo arroz como" = 나는 밥을 먹어요. Las partículas muestran quién hace qué, no el orden de las palabras.',
  outcomes: ['Construye oraciones SOV básicas', 'Entiende el rol de las partículas', 'Ordena correctamente sujeto-objeto-verbo'],

  guide: {
    goal: 'Construir oraciones básicas con estructura Sujeto + Partícula + Objeto + Partícula + Verbo.',
    model: '나는 밥을 먹어요. (Yo como arroz.) / 저는 학생이에요. (Yo soy estudiante.)',
    formula: '[Sujeto + 은/는] + [Objeto + 을/를] + Verbo',
    decisions: [
      'El verbo SIEMPRE al final: 나는 커피를 마셔요 (Yo café bebo)',
      'Las partículas indican función: 은/는 = tema/sujeto; 을/를 = objeto directo',
      'El sujeto y el objeto pueden omitirse si son claros por contexto (pro-drop)',
      'Los adverbios van antes del verbo: 나는 오늘 학교에 가요 (Yo hoy escuela-a voy)',
      'Las preguntas tienen la misma estructura SOV, solo cambia la entonación (o se añade 까)',
    ],
    table: [
      ['Español (SVO)', 'Coreano (SOV)', 'Romanización'],
      ['Yo como arroz', '나는 밥을 먹어요', 'Na-neun bab-eul meo-geo-yo'],
      ['Tú bebes café', '너는 커피를 마셔요', 'Neo-neun keopi-reul ma-syeo-yo'],
      ['Él estudia coreano', '그는 한국어를 공부해요', 'Geu-neun hangugeo-reul gongbu-haeyo'],
    ],
    mistakes: [
      '"나는 먹어요 밥을" ❌ — el verbo siempre AL FINAL: "나는 밥을 먹어요" ✓',
      'No hay que cambiar el verbo para las preguntas sí/no — solo entonación ascendente',
      'Las partículas no se separan del sustantivo que acompañan con espacio',
    ],
  },

  seo: [
    {
      heading: '¿Qué es la estructura SOV del coreano?',
      paragraphs: [
        'El coreano sigue la estructura Sujeto-Objeto-Verbo (SOV), a diferencia del español que usa Sujeto-Verbo-Objeto (SVO). Esto significa que en coreano el verbo siempre va al final de la oración. "Yo como arroz" se convierte en "나는 밥을 먹어요" — literalmente "Yo arroz como".',
        'Este orden SOV también es el de idiomas como el japonés, turco, mongol y muchas lenguas de Asia Central. Para un hispanohablante, el reto principal es habituarse a que el verbo viene al final y a "construir" la oración antes de revelar la acción.',
      ],
    },
    {
      heading: '¿Para qué sirven las partículas en coreano?',
      paragraphs: [
        'En español, el orden de las palabras indica quién hace qué: "El perro muerde al hombre" ≠ "El hombre muerde al perro". En coreano, las partículas (조사) marcan la función gramatical: 은/는 para el tema/sujeto, 이/가 para el sujeto, 을/를 para el objeto directo, 에 para dirección/lugar.',
        'Esto significa que el orden de los elementos antes del verbo puede variar sin cambiar el significado, siempre que las partículas estén bien puestas. El verbo, sin embargo, siempre va al final.',
      ],
    },
    {
      heading: '¿Cómo se forma una oración básica en coreano?',
      paragraphs: [
        'Estructura básica: [Sujeto + partícula] + [Objeto + partícula] + Verbo. Ejemplo: 나는(yo-tema) 밥을(arroz-objeto) 먹어요(como). En español: "Yo como arroz".',
        'Cuando hay una preposición de lugar, va entre el objeto y el verbo: 나는(yo) 학교에(escuela-a) 가요(voy). En español: "Yo voy a la escuela". Nota que "a la escuela" (학교에) viene antes del verbo.',
      ],
    },
    {
      heading: 'Cómo hacer preguntas en coreano',
      paragraphs: [
        'Las preguntas en coreano tienen la misma estructura SOV. Para preguntas de sí/no, solo cambia la entonación (ascendente al final) o se añade la partícula 까(까): 밥을 먹어요? = ¿Comes arroz? Las preguntas con palabras interrogativas (누가/quien, 뭐/qué, 어디/dónde, 언제/cuándo) mantienen el verbo al final: 너는 뭐를 먹어요? = ¿Tú qué comes?',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Estructura SOV del coreano con partículas básicas en contextos cotidianos.',
    graphicPrompt: 'Diagrama de orden SOV con flechas mostrando la posición del verbo al final.',
    scene: [
      ['나는 밥을 먹어요.', 'Yo (tema) arroz (obj.) como.'],
      ['저는 학생이에요.', 'Yo (formal) estudiante soy.'],
      ['그는 커피를 마셔요.', 'Él café (obj.) bebe.'],
      ['우리는 한국어를 공부해요.', 'Nosotros coreano (obj.) estudiamos.'],
      ['너는 어디에 가요?', '¿Tú adónde vas?'],
      ['오늘 뭐 해요?', '¿Qué haces hoy?'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['verbo al final', 'partículas funcionales', 'orden en preguntas'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Identifica la oración con la estructura SOV correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', '¿Cuál es la traducción correcta de "Yo como arroz"?']],
            options: ['나는 밥을 먹어요.', '나는 먹어요 밥을.', '먹어요 나는 밥을.', '밥을 나는 먹어요.'],
            answer: '나는 밥을 먹어요.',
            explain: 'SOV: 나는(yo) 밥을(arroz) 먹어요(como). El verbo SIEMPRE al final.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '¿Cuál es la traducción de "Tú bebes café"?']],
            options: ['너는 커피를 마셔요.', '커피를 너는 마셔요.', '너는 마셔요 커피를.', '마셔요 너는 커피를.'],
            answer: '너는 커피를 마셔요.',
            explain: '너는(tú) 커피를(café) 마셔요(bebes). Estructura SOV correcta.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '¿Qué elemento va SIEMPRE al final en coreano?']],
            options: ['El verbo', 'El sujeto', 'El objeto', 'La partícula'],
            answer: 'El verbo',
            explain: 'El verbo es siempre el último elemento de la oración en coreano.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '¿Cuál es la función de la partícula 을/를?']],
            options: ['Marca el objeto directo', 'Marca el sujeto', 'Marca el lugar', 'Indica tiempo'],
            answer: 'Marca el objeto directo',
            explain: '을/를 = partícula de objeto directo. "밥을" = "arroz" (objeto que se come).',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '"나는 학교에 가요" — ¿qué significa?']],
            options: ['Yo voy a la escuela.', 'Yo estudio en la escuela.', 'La escuela está aquí.', 'Yo voy con un amigo.'],
            answer: 'Yo voy a la escuela.',
            explain: '나는(yo) 학교에(escuela-a) 가요(voy). 에 = a/en (dirección).',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '¿Cuál es la forma correcta de preguntar "¿Comes arroz?"?']],
            options: ['밥을 먹어요?', '밥을 먹어요!', '나는 밥을.', '먹어요 밥을?'],
            answer: '밥을 먹어요?',
            explain: 'Las preguntas sí/no tienen la misma estructura SOV con entonación ascendente.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '¿Qué partícula va con el sujeto/tema de la oración?']],
            options: ['은/는', '을/를', '에', '이/가'],
            answer: '은/는',
            explain: '은/는 = partícula de tema (después de consonante: 은; después de vocal: 는).',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '"저는 선생님이에요" — ¿qué significa?']],
            options: ['Soy profesor/a.', 'Soy estudiante.', 'Soy doctor/a.', 'Soy coreano/a.'],
            answer: 'Soy profesor/a.',
            explain: '저는(yo, formal) 선생님(profesor/a) 이에요(soy). Estructura: sujeto + ser + atributo.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Orden SOV',
        tag: '2 espacios',
        intro: 'Ordena los elementos en la estructura SOV correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Reordena: [[0]] 음악을 [[1]] (ella escucha música)']],
            blanks: [
              { options: ['그녀는', '음악은', '이에요', '가요'], answer: '그녀는', explain: '그녀는 = ella (tema). Va primero: sujeto + 은/는.' },
              { options: ['들어요.', '먹어요.', '마셔요.', '가요.'], answer: '들어요.', explain: '들어요 = escucha (verbo al final). SOV: 그녀는 음악을 들어요.' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '우리는 [[0]] 한국어를 [[1]]']],
            blanks: [
              { options: ['오늘', '가요', '이에요', '먹어요'], answer: '오늘', explain: '"오늘" (hoy) como adverbio de tiempo va antes del objeto.' },
              { options: ['공부해요.', '가요.', '먹어요.', '마셔요.'], answer: '공부해요.', explain: '공부해요 = estudiamos. Verbo al final: 우리는 오늘 한국어를 공부해요.' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] 카페에 [[1]]']],
            blanks: [
              { options: ['저는', '밥을', '음악을', '한국어를'], answer: '저는', explain: '저는 = yo (formal, tema). Sujeto al inicio.' },
              { options: ['가요.', '먹어요.', '이에요.', '공부해요.'], answer: '가요.', explain: '가요 = voy. Destino (카페에) + verbo al final.' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '선생님은 [[0]] [[1]] 가르쳐요.']],
            blanks: [
              { options: ['한국어를', '한국어는', '한국어가', '한국어에'], answer: '한국어를', explain: '한국어를 = coreano (objeto directo, partícula 를).' },
              { options: ['우리에게', '우리는', '우리가', '우리를'], answer: '우리에게', explain: '우리에게 = a nosotros. Estructurra: 선생님은 한국어를 우리에게 가르쳐요.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa las oraciones en coreano con la estructura SOV correcta.',
        type: 'guidedText',
        scene: 'Completa las oraciones en coreano con la estructura SOV correcta.',
        text: '나는 매일 아침 [[0]] 먹어요. (Yo cada mañana arroz como.) / 저는 한국어를 [[1]]. (Yo coreano estudio.) / 우리는 학교에 [[2]]. (Nosotros a la escuela vamos.) / 그는 [[3]] 마셔요. (Él café bebe.) / 너는 뭐를 [[4]]? (¿Tú qué comes?)',
        blanks: [
          { options: ['밥을', '밥은', '밥이', '밥에'], answer: '밥을', explain: '밥을 = arroz (objeto, partícula 을).' },
          { options: ['공부해요', '가요', '마셔요', '먹어요'], answer: '공부해요', explain: '공부해요 = estudio. Verbo al final.' },
          { options: ['가요', '공부해요', '먹어요', '마셔요'], answer: '가요', explain: '가요 = vamos. Destino 학교에 + verbo.' },
          { options: ['커피를', '커피는', '커피가', '커피에'], answer: '커피를', explain: '커피를 = café (objeto, partícula 를).' },
          { options: ['먹어요', '마셔요', '가요', '공부해요'], answer: '먹어요', explain: '먹어요 = comes/comed. Verbo al final en pregunta.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Completa con la partícula o verbo correcto.',
        type: 'freeText',
        scene: 'Completa con la partícula o verbo correcto.',
        text: '나는 오늘 밥 [[0]] 먹어요. / 저는 한국어 [[1]] 공부해요. / 우리는 카페 [[2]] 가요. / 그녀는 음악 [[3]] 들어요. / 너는 내일 어디 [[4]]?',
        blanks: [
          { answer: '을', accepted: ['을'], explain: '밥을 = arroz-objeto. Después de consonante: 을.' },
          { answer: '를', accepted: ['를'], explain: '한국어를 = coreano-objeto. Después de vocal: 를.' },
          { answer: '에', accepted: ['에'], explain: '카페에 = al café. 에 = dirección/lugar.' },
          { answer: '을', accepted: ['을'], explain: '음악을 = música-objeto. Después de consonante: 을.' },
          { answer: '가요', accepted: ['가요', '가요?'], explain: '가요 = vas/irás. Pregunta sobre destino: 어디 가요?' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Construye oraciones en coreano usando la estructura SOV.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di "Yo como arroz" en coreano (romanización aceptada).',
            answer: '나는 밥을 먹어요.',
            accepted: ['나는 밥을 먹어요', 'na-neun bab-eul meogeoyo', 'naNeun babeul meokeoyo'],
            explain: '나는(yo) 밥을(arroz-obj.) 먹어요(como). Verbo al final.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di "Yo estudio coreano" en coreano.',
            answer: '저는 한국어를 공부해요.',
            accepted: ['저는 한국어를 공부해요', 'jeoneun hangugeo-reul gongbu-haeyo'],
            explain: '저는(yo-formal) 한국어를(coreano-obj.) 공부해요(estudio).',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Pregunta "¿Tú bebes café?" en coreano.',
            answer: '너는 커피를 마셔요?',
            accepted: ['너는 커피를 마셔요', 'neoneun keopi-reul masyeoyo'],
            explain: 'Pregunta: misma estructura SOV con entonación ascendente.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di "Nosotros vamos a la escuela" en coreano.',
            answer: '우리는 학교에 가요.',
            accepted: ['우리는 학교에 가요', 'urineun hakkyo-e gayo'],
            explain: '우리는(nosotros) 학교에(a la escuela) 가요(vamos).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Escribe 3 oraciones sobre tu rutina diaria en coreano usando SOV.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di qué comes o bebes usando SOV (아침에 = por la mañana; 밥 = arroz; 커피 = café).',
            answer: '나는 아침에 커피를 마셔요.',
            accepted: ['나는', '저는', 'na-neun', 'jeo-neun', '아침에', '커피를', '밥을', '마셔요', '먹어요'],
            explain: 'SOV: 나는 아침에 커피를 마셔요 = Por la mañana yo café bebo.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di adónde vas (학교 = escuela; 카페 = café; 집 = casa).',
            answer: '저는 학교에 가요.',
            accepted: ['저는', '나는', '학교에', '카페에', '집에', '가요'],
            explain: 'SOV con lugar: 저는 학교에 가요 = Yo voy a la escuela.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di qué estudias o aprendes (한국어 = coreano; 스페인어 = español; 음악 = música).',
            answer: '저는 한국어를 공부해요.',
            accepted: ['저는', '나는', '공부해요', '배워요', '한국어를', '스페인어를', '음악을'],
            explain: '저는 한국어를 공부해요 = Yo estudio coreano. SOV completo.',
          },
        ],
      },
    ],
  },
}

export default topic
