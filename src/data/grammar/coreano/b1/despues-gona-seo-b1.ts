import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'despues-gona-seo-b1',
  order: '13',
  color: '#c60c30',
  category: 'Tiempo y secuencia',
  level: 'B1',
  title: '-고 나서: Después de Completar una Acción en Coreano B1',
  shortTitle: '-고 나서 (después de)',
  metaTitle: '-고 나서 en Coreano B1 — Expresar Secuencia Después de una Acción',
  description:
    '-고 나서 expresa que la primera acción se completa antes de que ocurra la segunda: «después de hacer A, B». A diferencia de -자마자, no exige que la segunda acción sea inmediata; puede haber o no una pausa.',
  lead: 'Domina -고 나서 para ordenar acciones ya completadas: «después de hacer A, hago B», con una pausa posible entre ambas.',
  outcomes: [
    'Forma secuencias después de completar una acción con -고 나서',
    'Expresa pasos ordenados en rutinas y procesos',
    'Distingues -고 나서 de -자마자 (inmediato)',
    'Usa en narrativa de procedimientos y historias',
  ],

  guide: {
    goal: 'Expresar acciones que suceden después de otras, permitiendo intervalo temporal.',
    model: '학교에 간 후 집에 갔어요. 밥 먹고 나서 영화를 봤어요. (Después de ir a la escuela, fui a casa. Después de comer, vi una película.)',
    formula: '동사 + -고 나서',
    decisions: [
      '-고 나서: secuencia con intervalo posible',
      'Se añade a la raíz sin marcar pasado en la primera acción: 가고 나서, 먹고 나서',
      'vs -자마자: -고 나서 permite tiempo entre acciones',
      'Es muy frecuente en rutinas, instrucciones y narraciones cotidianas',
    ],
    table: [
      ['Estructura', 'Significado', 'Ejemplo'],
      ['-고 나서', 'Después de completar A', '먹고 나서 → después de comer'],
      ['vs -자마자', 'Inmediato (sin intervalo)', '먹자마자 → tan pronto comí (instantáneo)'],
    ],
    mistakes: [
      '「먹고 나서 영화를 봤어요」 ✓ (después de comer, vi una película — con intervalo natural). 「먹자마자 영화를 봤어요」 implica inmediatez (en cuanto comí).',
      'No marques pasado en la primera acción: "먹었고 나서" ❌ → "먹고 나서" ✓.',
      'No confundas -고 나서 (primera acción completada) con -고 (conexión general).'],
  },

  seo: [
    {
      heading: '¿Cómo se usa -고 나서 en coreano?',
      paragraphs: [
        '-고 나서 es una forma natural de expresar secuencia en la narrativa cotidiana. La primera acción queda completada antes de comenzar la segunda.',
        'Se usa constantemente en coreano para describir procesos, rutinas, historias. Mucho más natural que -자마자 en contextos ordinarios.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre -고 나서 y -자마자?',
      paragraphs: [
        '-고 나서: "밥 먹고 나서 영화를 봤어요" (comí, luego vi película — tiempo entre ambas acciones es natural).',
        '-자마자: "밥 먹자마자 나갔어요" (tan pronto comí, me fui — sin tiempo entre ellas). Diferencia clave: -고 나서 es procedimiento natural; -자마자 es reacción inmediata.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre -고 나서 y -(으)ㄴ 후에?',
      paragraphs: [
        'Las dos significan "después de". -고 나서 subraya la culminación de la primera acción antes de pasar a la segunda: 밥을 먹고 나서 이를 닦아요. -(으)ㄴ 후에 es una expresión temporal más nominal y neutra: 밥을 먹은 후에 이를 닦아요. Ninguna exige que las dos cláusulas tengan el mismo sujeto.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-고 나서 (secuencia con intervalo)',
    graphicPrompt: 'Tabla: -고 나서 vs -자마자.',
    scene: [
      ['밥 먹고 나서 영화를 봤어요.', 'Después de comer, vi una película.'],
      ['수업을 듣고 나서 집에 갔어요.', 'Después de asistir a clase, fui a casa.'],
      ['회의가 끝나고 나서 팀장에게 전화했어요.', 'Después de terminar la reunión, llamé al jefe de equipo.'],
      ['운동하고 나서 샤워했어요.', 'Después de hacer ejercicio, me duché.'],
      ['한국에 오고 나서 김치를 자주 먹어요.', 'Después de venir a Corea, como kimchi con frecuencia.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['순서', '간격'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma -고 나서',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Verbo + -고 나서',
            lines: [['', '밥을 먹___ 영화를 봤어요.']],
            options: ['고 나서', '자마자', '으면서', '-어서'],
            answer: '고 나서',
            explain: '먹다 → 먹고 나서 (después de comer).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Secuencia narrativa',
        tag: 'Narrativa',
        intro: 'Completa una rutina con -고 나서.',
        type: 'guidedText',
        scene: 'Descripción de actividades del día.',
        text: '아침에 일어나[[0]] 밥을 먹었어요. 밥을 먹[[1]] 학교에 갔어요. 수업이 끝나[[2]] 집에 돌아왔어요.',
        blanks: [
          { options: ['고 나서', '자마자'], answer: '고 나서', explain: '-고 나서 para rutina.' },
          { options: ['고 나서', '자마자'], answer: '고 나서', explain: '-고 나서 para procedimiento.' },
          { options: ['고 나서', '자마자'], answer: '고 나서', explain: '-고 나서 para final del día.' },
        ],
      },
      {
        id: 'level-3',
        title: 'Escritura de rutina',
        tag: 'Narrativa',
        intro: 'Describe tu rutina usando -고 나서.',
        type: 'freeText',
        scene: 'Mi día típico.',
        text: '1. [[0]] (Después de despertar). 2. [[1]] (Después de desayunar). 3. [[2]] (Después de trabajar).',
        blanks: [
          { answer: '일어나고 나서 밥을 먹어요', accepted: ['-고 나서'], explain: '-고 나서 con rutina matinal.' },
          { answer: '밥 먹고 나서 학교에 가요', accepted: ['-고 나서'], explain: '-고 나서 con salida.' },
          { answer: '일하고 나서 집에 와요', accepted: ['-고 나서'], explain: '-고 나서 con regreso.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Análisis de -고 나서 vs -자마자',
        tag: 'Análisis',
        intro: 'Explica cuándo usar cada forma.',
        type: 'write',
        items: [
          {
            scene: 'Diferencia de contexto',
            prompt: '"밥 먹고 나서" vs "밥 먹자마자": ¿en qué contexto usa cada uno?',
            answer: '-고 나서 en rutina normal (comer, luego algo más). -자마자 en reacción inmediata o emoción (tan pronto comí, reaccioné). -고 나서 es procedimiento; -자마자 es urgencia.',
            accepted: ['절차', '즉각', '감정'],
            explain: '-고 나서 para rutina; -자마자 para inmediatez.',
          },
        ],
      },
    ],
  },
}

export default topic
