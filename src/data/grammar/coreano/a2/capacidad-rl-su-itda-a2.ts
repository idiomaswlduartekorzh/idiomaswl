import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'capacidad-rl-su-itda-a2',
  order: '07',
  color: '#c60c30',
  category: 'Modalidad',
  level: 'A2',
  title: '-(으)ㄹ 수 있다/없다 Coreano A2 — Capacidad y posibilidad',
  shortTitle: '-(으)ㄹ 수 있다',
  metaTitle: 'Coreano A2 — -(으)ㄹ 수 있다/없다 capacidad posibilidad',
  description:
    '-(으)ㄹ 수 있다 expresa capacidad o posibilidad en coreano: "poder hacer algo". Su negacion -(으)ㄹ 수 없다 significa "no poder". Se forma con la raiz del verbo mas -ㄹ 수 (vocal/ㄹ) o -을 수 (consonante) mas 있다/없다.',
  lead: 'Raiz + -ㄹ 수 있다 (vocal/ㄹ) o + -을 수 있다 (consonante). Ejemplos: 수영할 수 있어요 (Puedo nadar). 한국어를 읽을 수 있어요 (Puedo leer coreano). 못 + verbo = alternativa coloquial.',
  outcomes: [
    'Expresar capacidad con -(으)ㄹ 수 있다',
    'Expresar incapacidad con -(으)ㄹ 수 없다 y 못 + verbo',
    'Distinguir entre incapacidad fisica y prohibicion/imposibilidad',
    'Hacer preguntas sobre capacidad: -(으)ㄹ 수 있어요?',
  ],

  guide: {
    goal: 'Expresar lo que alguien puede o no puede hacer con -(으)ㄹ 수 있다/없다 en coreano A2.',
    model: '저는 피아노를 칠 수 있어요 (Puedo tocar el piano) | 내일은 갈 수 없어요 (Manana no puedo ir)',
    formula: 'Raiz + -ㄹ 수 있다 (vocal/ㄹ) | Raiz + -을 수 있다 (consonante) | 못 + verbo (negacion coloquial)',
    decisions: [
      'Raiz termina en vocal o ㄹ → añade -ㄹ 수: 가다 → 갈 수, 살다 → 살 수',
      'Raiz termina en consonante → añade -을 수: 먹다 → 먹을 수, 읽다 → 읽을 수',
      '있다 → capacidad positiva; 없다 → incapacidad',
      'Negacion coloquial: 못 + verbo conjugado: 못 가요, 못 먹어요',
      '-ㄹ 수 없다 es mas formal que 못; ambas son correctas',
      'Pregunta: -(으)ㄹ 수 있어요? = ¿Puede/puedes...?',
    ],
    table: [
      ['Infinitivo', 'Forma positiva', 'Forma negativa'],
      ['가다 (ir)', '갈 수 있다', '갈 수 없다 / 못 가다'],
      ['먹다 (comer)', '먹을 수 있다', '먹을 수 없다 / 못 먹다'],
      ['수영하다 (nadar)', '수영할 수 있다', '수영할 수 없다 / 못 수영하다'],
      ['읽다 (leer)', '읽을 수 있다', '읽을 수 없다 / 못 읽다'],
      ['살다 (vivir)', '살 수 있다', '살 수 없다 / 못 살다'],
    ],
    mistakes: [
      '"가을 수 있다" — raiz vocal no necesita -을: 가다 → 갈 수 있다',
      '"먹ㄹ 수 있다" — raiz consonante necesita -을: 먹다 → 먹을 수 있다',
      '"못 수영할 수 없다" — no combines 못 con -ㄹ 수 없다: elige uno solo',
    ],
  },

  seo: [
    {
      heading: '¿Como se forma -(으)ㄹ 수 있다 en coreano?',
      paragraphs: [
        'La estructura -(으)ㄹ 수 있다 combina el futuro nominal -(으)ㄹ con el sustantivo 수 (manera, forma) y el verbo 있다 (haber, tener). Literalmente seria "hay manera de [hacer algo]". La forma negativa usa 없다: "no hay manera de [hacer algo]".',
        'En la practica, 있다 y 없다 se conjugan normalmente: 있어요/없어요 (habla informal), 있습니다/없습니다 (formal). La parte -(으)ㄹ 수 no cambia.',
      ],
    },
    {
      heading: '못 + verbo vs -(으)ㄹ 수 없다',
      paragraphs: [
        '못 + verbo es la forma coloquial de expresar incapacidad: 못 가요 (no puedo ir), 못 먹어요 (no puedo comer). -(으)ㄹ 수 없다 es mas formal y explicito: 갈 수 없어요 (no puedo ir). Ambas son completamente correctas.',
        '못 se coloca siempre inmediatamente antes del verbo principal. Con verbos 하다, 못 va antes de 하다: 공부 못 해요 (no puedo estudiar) o 공부하지 못해요.',
      ],
      table: [
        ['Forma', 'Registro', 'Ejemplo'],
        ['-(으)ㄹ 수 없다', 'Formal/neutro', '갈 수 없어요'],
        ['못 + verbo', 'Coloquial', '못 가요'],
        ['-지 못하다', 'Semiformal', '가지 못해요'],
      ],
    },
    {
      heading: 'Preguntas con -(으)ㄹ 수 있어요?',
      paragraphs: [
        'Para preguntar sobre capacidad o posibilidad, añade simplemente ? a la forma positiva: 수영할 수 있어요? (¿Puedes nadar?). La respuesta puede ser: 네, 할 수 있어요 (Si, puedo) o 아니요, 할 수 없어요 / 못 해요 (No, no puedo).',
        'Esta estructura es muy util para pedir favores: 이것 좀 도와줄 수 있어요? (¿Puedes ayudarme con esto?), 다시 말해줄 수 있어요? (¿Puedes repetirlo?).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-(으)ㄹ 수 있다/없다: vocal/ㄹ → -ㄹ 수, consonante → -을 수. 못 + verbo = alternativa coloquial.',
    graphicPrompt: 'Semaforo: verde para 있다 (puedo), rojo para 없다/못 (no puedo). Con ejemplos.',
    scene: [
      ['수영할 수 있어요', 'Puedo nadar (수영하다 → 수영할)'],
      ['한국어를 읽을 수 있어요', 'Puedo leer coreano (읽다 → 읽을)'],
      ['내일 갈 수 없어요', 'No puedo ir manana (가다 → 갈)'],
      ['못 먹어요 / 먹을 수 없어요', 'No puedo comer (먹다 → 먹을)'],
      ['도와줄 수 있어요?', '¿Puedes ayudarme? (도와주다 → 도와줄)'],
      ['한국어로 말할 수 있어요', 'Puedo hablar en coreano'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-ㄹ 수 vs -을 수', '있다 vs 없다', '못 vs 수 없다'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Reconocimiento de -(으)ㄹ 수 있다',
        tag: 'Opcion multiple',
        intro: 'Elige la forma correcta de -(으)ㄹ 수 있다/없다.',
        type: 'choice',
        items: [
          {
            scene: 'Habilidades musicales',
            lines: [['Hugo', '저는 기타를 ___ (치다). (Puedo tocar la guitarra.)']],
            options: ['칠 수 있어요', '치을 수 있어요', '칠 수 없어요', '치수 있어요'],
            answer: '칠 수 있어요',
            explain: '치다 → raiz 치 (vocal) → 칠 수 있어요.',
          },
          {
            scene: 'Restriccion dietaria',
            lines: [['Ana', '저는 매운 음식을 ___ (먹다, negacion). (No puedo comer comida picante.)']],
            options: ['먹을 수 없어요', '먹ㄹ 수 없어요', '먹을 수 있어요', '먹수 없어요'],
            answer: '먹을 수 없어요',
            explain: '먹다 → raiz 먹 (consonante) → 먹을 수 없어요.',
          },
          {
            scene: 'Idiomas que domina',
            lines: [['Carlos', '저는 스페인어를 ___ (말하다). (Puedo hablar espanol.)']],
            options: ['말할 수 있어요', '말하을 수 있어요', '말할 수 없어요', '말하수 있어요'],
            answer: '말할 수 있어요',
            explain: '말하다 → raiz 말하 (vocal) → 말할 수 있어요.',
          },
          {
            scene: 'Peticion de ayuda',
            lines: [['Lina', '이것 좀 ___ (도와주다)? (¿Puedes ayudarme con esto?)']],
            options: ['도와줄 수 있어요', '도와주을 수 있어요', '도와줄 수 없어요', '도와주수 있어요'],
            answer: '도와줄 수 있어요',
            explain: '도와주다 → raiz 도와주 (vocal) → 도와줄 수 있어요.',
          },
          {
            scene: 'Plan cancelado',
            lines: [['Marco', '죄송해요. 내일 ___ (가다, negacion). (Lo siento. Manana no puedo ir.)']],
            options: ['갈 수 없어요', '가을 수 없어요', '갈 수 있어요', '못 갈 수 없어요'],
            answer: '갈 수 없어요',
            explain: '가다 → raiz 가 (vocal) → 갈 수 없어요.',
          },
          {
            scene: 'Habilidad de natacion',
            lines: [['Sofia', '저는 수영을 ___ (할 수 없다). (No se nadar — no puedo nadar.)']],
            options: ['못 해요', '할 수 있어요', '해을 수 없어요', '못 할 수 있어요'],
            answer: '못 해요',
            explain: '못 + 하다 = 못 해요. Equivalente coloquial de 수영할 수 없어요.',
          },
          {
            scene: 'Lectura de hangul',
            lines: [['Sara', '한글을 ___ (읽다)? (¿Puedes leer hangul?)']],
            options: ['읽을 수 있어요', '읽을 수 없어요', '읽ㄹ 수 있어요', '읽수 있어요'],
            answer: '읽을 수 있어요',
            explain: '읽다 → raiz 읽 (consonante) → 읽을 수 있어요.',
          },
          {
            scene: 'Imposibilidad de asistir',
            lines: [['Hugo', '미안해요, 오늘 파티에 ___ (오다, negacion). (Lo siento, hoy no puedo venir a la fiesta.)']],
            options: ['올 수 없어요', '오을 수 없어요', '올 수 있어요', '못 올 수 없어요'],
            answer: '올 수 없어요',
            explain: '오다 → raiz 오 (vocal) → 올 수 없어요.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Dialogos con dos espacios',
        tag: '2 espacios',
        intro: 'Completa los dialogos sobre capacidad y posibilidad.',
        type: 'dual',
        items: [
          {
            scene: 'Buscando ayuda',
            lines: [
 ['Carlos', '이 문제를 [[0]] (풀다, puedes)? (¿Puedes resolver este problema?)'],
 ['Ana', '네, [[1]] (있다). 같이 해봐요. (Si, puedo. Intentemoslo juntos.)'],
 ],
            blanks: [
              { options: ['풀 수 있어요', '풀을 수 있어요', '푸을 수 있어요', '풀 수 없어요'], answer: '풀 수 있어요', explain: '풀다 → raiz 풀 (ㄹ) → 풀 수 있어요.' },
              { options: ['할 수 있어요', '할 수 없어요', '못 해요', '해요'], answer: '할 수 있어요', explain: 'Respuesta positiva: 할 수 있어요.' },
            ],
          },
          {
            scene: 'Restricciones de horario',
            lines: [
 ['Sara', '토요일에 [[0]] (오다, puedes)? (¿Puedes venir el sabado?)'],
 ['Marco', '아니요, 토요일에는 [[1]] (없다). 일요일은 어때요? (No, el sabado no puedo. ¿Que tal el domingo?)'],
 ],
            blanks: [
              { options: ['올 수 있어요', '오을 수 있어요', '오을 수 없어요', '올 수 없어요'], answer: '올 수 있어요', explain: '오다 → 올 수 있어요.' },
              { options: ['올 수 없어요', '올 수 있어요', '못 옵니다', '오를 수 없어요'], answer: '올 수 없어요', explain: 'Negacion: 올 수 없어요.' },
            ],
          },
          {
            scene: 'Habilidades culinarias',
            lines: [
 ['Lina', '한국 음식 [[0]] (만들다, puedes)? (¿Puedes hacer comida coreana?)'],
 ['Sofia', '김치찌개는 [[1]] (있다) 불고기는 아직 [[2]] (없다). (Puedo hacer kimchi jjigae pero el bulgogi todavia no puedo.)'],
 ],
            blanks: [
              { options: ['만들 수 있어요', '만들을 수 있어요', '만들 수 없어요', '만드을 수 있어요'], answer: '만들 수 있어요', explain: '만들다 → raiz 만들 (ㄹ) → 만들 수 있어요.' },
              { options: ['만들 수', '만들수', '만들 수 있어요,', '만드수'], answer: '만들 수 있어요,', explain: 'Positivo primero: 만들 수 있어요.' },
              { options: ['못 해요', '할 수 없어요', '만들 수 없어요', '만들수 없어요'], answer: '만들 수 없어요', explain: 'Negativo: 만들 수 없어요.' },
            ],
          },
          {
            scene: 'Peticion formal',
            lines: [
 ['Hugo', '내일 보고서를 [[0]] (제출하다, puedes)? (¿Puedes entregar el informe manana?)'],
 ['Carlos', '네, 내일까지 [[1]] (있다). 걱정하지 마세요. (Si, puedo entregarlo manana. No se preocupe.)'],
 ],
            blanks: [
              { options: ['제출할 수 있어요', '제출할 수 없어요', '제출하을 수 있어요', '제출수 있어요'], answer: '제출할 수 있어요', explain: '제출하다 → 제출할 수 있어요.' },
              { options: ['제출할 수 있어요', '제출할 수 없어요', '제출해요', '못 제출해요'], answer: '제출할 수 있어요', explain: 'Confirmacion positiva: 제출할 수 있어요.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el texto sobre habilidades con -(으)ㄹ 수 있다/없다.',
        type: 'guidedText',
        scene: 'Presentacion de habilidades de una estudiante en una entrevista',
        text: '저는 영어와 스페인어를 [[0]] (말하다, positivo). 한국어는 기초 수준이라 조금 [[1]] (읽다, positivo) 아직 유창하게 말하지 [[2]] (못하다). 컴퓨터 프로그래밍도 [[3]] (하다, positivo). 하지만 그래픽 디자인은 [[4]] (하다, negativo). 빨리 배울 수 있어요!',
        blanks: [
          { options: ['말할 수 있어요', '말하을 수 있어요', '말할 수 없어요', '말하수 있어요'], answer: '말할 수 있어요', explain: '말하다 → 말할 수 있어요.' },
          { options: ['읽을 수 있지만', '읽ㄹ 수 있지만', '읽을 수 없지만', '읽수 있지만'], answer: '읽을 수 있지만', explain: '읽다 → 읽을 수 있다 + -지만 (pero).' },
          { options: ['못해요', '할 수 없어요', '못 합니다', '없어요'], answer: '못해요', explain: '못 + 하다 = 못해요 (forma coloquial de incapacidad).' },
          { options: ['할 수 있어요', '할 수 없어요', '하을 수 있어요', '하수 있어요'], answer: '할 수 있어요', explain: '하다 → 할 수 있어요.' },
          { options: ['할 수 없어요', '할 수 있어요', '하을 수 없어요', '못 합니다'], answer: '할 수 없어요', explain: '하다 → 할 수 없어요 (negacion formal).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe si puedes o no puedes hacer cada actividad.',
        type: 'freeText',
        scene: 'Formulario de habilidades para una academia de idiomas',
        text: '영어를 [[0]] (hablar — positivo). / 일본어를 [[1]] (leer — negativo). / 기타를 [[2]] (tocar — positivo, 치다). / 요리를 [[3]] (hacer — positivo, 하다). / 빨리 [[4]] (correr — negativo, 달리다).',
        blanks: [
          { answer: '말할 수 있어요', explain: '말하다 → 말할 수 있어요.' },
          { answer: '읽을 수 없어요', explain: '읽다 → 읽을 수 없어요.' },
          { answer: '칠 수 있어요', explain: '치다 → 칠 수 있어요.' },
          { answer: '할 수 있어요', explain: '하다 → 할 수 있어요.' },
          { answer: '달릴 수 없어요', explain: '달리다 → 달릴 수 없어요.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produccion guiada',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones completas sobre capacidad o posibilidad.',
        type: 'write',
        items: [
          {
            scene: 'Habilidad de idioma',
            prompt: 'Di "Puedo leer coreano pero no puedo escribir bien" (읽다, 쓰다, 잘).',
            answer: '한국어를 읽을 수 있어요. 하지만 잘 쓸 수 없어요.',
            accepted: ['읽을 수 있어요', '쓸 수 없어요', '못 써요'],
            explain: '읽다 → 읽을 수 있어요. 쓰다 → 쓸 수 없어요.',
          },
          {
            scene: 'Peticion de ayuda',
            prompt: 'Pregunta "¿Puedes venir a la reunion manana?" (내일, 회의에 오다).',
            answer: '내일 회의에 올 수 있어요?',
            accepted: ['올 수 있어요?', '올 수 있나요?'],
            explain: '오다 → 올 수 있어요? Pregunta con tono ascendente.',
          },
          {
            scene: 'Restriccion medica',
            prompt: 'Di "No puedo comer cosas picantes" (매운 것, 먹다, negacion).',
            answer: '매운 것을 먹을 수 없어요.',
            accepted: ['먹을 수 없어요', '못 먹어요'],
            explain: '먹다 → 먹을 수 없어요 (formal) o 못 먹어요 (coloquial).',
          },
          {
            scene: 'Habilidad especial',
            prompt: 'Di "Puedo tocar el piano" (피아노를 치다).',
            answer: '피아노를 칠 수 있어요.',
            accepted: ['칠 수 있어요'],
            explain: '치다 → 칠 수 있어요 (vocal ㅣ).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Escritura libre',
        intro: 'Escribe tres oraciones sobre lo que puedes y no puedes hacer en coreano.',
        type: 'write',
        items: [
          {
            scene: 'Habilidad que tienes',
            prompt: 'Escribe algo que puedes hacer bien usando -(으)ㄹ 수 있다.',
            answer: '저는 영어를 유창하게 말할 수 있어요.',
            accepted: ['ㄹ 수 있어요', '을 수 있어요'],
            explain: 'Usa cualquier verbo de habilidad: 말하다, 읽다, 쓰다, 치다, 만들다, etc.',
          },
          {
            scene: 'Habilidad que no tienes',
            prompt: 'Escribe algo que no puedes hacer usando -(으)ㄹ 수 없다 o 못.',
            answer: '저는 수영을 할 수 없어요.',
            accepted: ['ㄹ 수 없어요', '을 수 없어요', '못'],
            explain: 'Incapacidad: -(으)ㄹ 수 없어요 o 못 + verbo.',
          },
          {
            scene: 'Peticion a alguien',
            prompt: 'Pide un favor a alguien usando -(으)ㄹ 수 있어요?',
            answer: '이 한국어 문장을 도와줄 수 있어요?',
            accepted: ['ㄹ 수 있어요?', '을 수 있어요?'],
            explain: 'Peticion: -(으)ㄹ 수 있어요? es muy natural y educada.',
          },
        ],
      },
    ],
  },
}

export default topic
