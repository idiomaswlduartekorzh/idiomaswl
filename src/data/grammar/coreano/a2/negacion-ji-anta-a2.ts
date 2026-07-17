import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'negacion-ji-anta-a2',
  order: '09',
  color: '#c60c30',
  category: 'Negacion',
  level: 'A2',
  title: '-지 않다 y 못하다 Coreano A2 — Negacion e incapacidad',
  shortTitle: '-지 않다 / 못',
  metaTitle: 'Coreano A2 — -지 않다 y 못하다 negacion incapacidad',
  description:
    'Coreano tiene dos negaciones principales: -지 않다 (negacion voluntaria: "no hacer") y 못 + verbo (incapacidad: "no poder hacer"). También existe 안 + verbo como alternativa coloquial a -지 않다.',
  lead: '안 + verbo (coloquial) o verbo + -지 않다 (formal): 안 가요 = 가지 않아요 (No voy). 못 가요 (No puedo ir — incapacidad). 못 + verbo = -(으)ㄹ 수 없다.',
  outcomes: [
    'Usar -지 않다 para negacion voluntaria',
    'Distinguir 안 y -지 않다 en registro',
    'Usar 못 para incapacidad',
    'Distinguir negacion de incapacidad en contexto',
  ],

  guide: {
    goal: 'Dominar las dos formas principales de negacion coreana: -지 않다 (voluntad) y 못 (incapacidad).',
    model: '오늘 학교에 가지 않아요 (Hoy no voy a la escuela — decido no ir) | 오늘 학교에 못 가요 (Hoy no puedo ir a la escuela — algo me lo impide)',
    formula: '안 + verbo (coloquial) | verbo + -지 않다 (formal) | 못 + verbo (incapacidad) | verbo + -지 못하다 (formal incapacidad)',
    decisions: [
      '안 va antes del verbo principal: 안 가요, 안 먹어요',
      '-지 않다: raiz + -지 않다 (mismo para todos los verbos): 가지 않아요, 먹지 않아요',
      '못 va antes del verbo principal: 못 가요, 못 먹어요',
      '-지 못하다: raiz + -지 못하다 (formal de 못): 가지 못해요',
      'Con verbos hada: 공부 안 해요 (안 va antes de 해) o 공부하지 않아요',
      '못 indica que una fuerza externa impide la accion; 안 indica voluntad propia',
    ],
    table: [
      ['Verbo', '안 + verbo', '-지 않다'],
      ['가다 (ir)', '안 가요', '가지 않아요'],
      ['먹다 (comer)', '안 먹어요', '먹지 않아요'],
      ['공부하다 (estudiar)', '공부 안 해요', '공부하지 않아요'],
      ['못 (incapacidad)', '못 가요', '가지 못해요'],
      ['못 hada', '공부 못 해요', '공부하지 못해요'],
    ],
    mistakes: [
      '"안 가지 않아요" — no combines 안 y -지 않다: usa solo uno',
      '"못 가지 않아요" — no combines 못 y 않다: 못 가요O 가지 못해요',
      '"가못해요" — 못 va antes del verbo: 못 가요 (no 가못해요)',
    ],
  },

  seo: [
    {
      heading: '¿Cuando usar 안 y cuando -지 않다?',
      paragraphs: [
        '안 y -지 않다 significan lo mismo pero tienen diferente registro. 안 es coloquial y directo: 안 가요 (No voy). -지 않다 es mas formal y explicativo: 가지 않아요. En el habla cotidiana se usa mas 안, mientras que en escritura o discurso formal se prefiere -지 않다.',
        'Con verbos compuestos de tipo Sustantivo + 하다, 안 va entre el sustantivo y 하다: 공부 안 해요 (no estudia). No: ✗안 공부해요.',
      ],
    },
    {
      heading: '못 vs 안: la diferencia clave',
      paragraphs: [
        '못 indica incapacidad fisica o circunstancial: 오늘 못 가요 significa que algo externo me impide ir (estoy enfermo, hay trafico, etc.). 안 indica eleccion propia: 오늘 안 가요 significa que decido no ir.',
        'Esta distincion puede ser delicada. En contexto de polite refusal, los coreanos a veces usan 못 aunque en realidad podrian ir, por educacion: 내일 못 가요 (suena mas suave que 내일 안 가요).',
      ],
      table: [
        ['Forma', 'Significado', 'Ejemplo'],
        ['안 + verbo', 'No (por voluntad)', '오늘 안 먹어요 (hoy no como — por decision)'],
        ['못 + verbo', 'No puedo (incapacidad)', '오늘 못 먹어요 (hoy no puedo comer — algo me lo impide)'],
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '안/-지 않다 = voluntad. 못/-지 못하다 = incapacidad. No combinar dos negaciones.',
    graphicPrompt: 'Dos columnas: columna A (eleccion/voluntad = 안) columna B (imposibilidad = 못).',
    scene: [
      ['오늘 안 가요', 'Hoy no voy (decision propia)'],
      ['오늘 못 가요', 'Hoy no puedo ir (incapacidad)'],
      ['매운 거 안 먹어요', 'No como cosas picantes (por gusto)'],
      ['매운 거 못 먹어요', 'No puedo comer cosas picantes (alergico, etc.)'],
      ['공부 안 해요', 'No estudio (no quiero)'],
      ['공부 못 해요', 'No puedo estudiar (algo me lo impide)'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['안 vs 못', '-지 않다 vs -지 못하다', 'verbos hada'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Reconocimiento de negacion',
        tag: 'Opcion multiple',
        intro: 'Elige la negacion correcta para cada situacion.',
        type: 'choice',
        items: [
          {
            scene: 'Dieta personal',
            lines: [['Ana', '저는 고기를 ___ 먹어요. (No como carne — soy vegetariana.)']],
            options: ['안', '못', '지', '않'],
            answer: '안',
            explain: 'Eleccion personal (vegetariana): 안 먹어요.',
          },
          {
            scene: 'Enfermedad',
            lines: [['Carlos', '목이 아파서 노래를 ___ 해요. (Me duele la garganta, asi que no puedo cantar.)']],
            options: ['못', '안', '지', '않'],
            answer: '못',
            explain: 'Incapacidad fisica (garganta): 못 해요.',
          },
          {
            scene: 'Negacion formal',
            lines: [['Zhanna', '그 영화는 재미가 없어서 보___ 않았어요. (Esa pelicula no era interesante, asi que no la vi.)']],
            options: ['지', '아', '이', '어'],
            answer: '지',
            explain: '-지 않았어요: forma formal de negacion en pasado.',
          },
          {
            scene: 'Imposibilidad',
            lines: [['David', '시간이 없어서 숙제를 ___ 했어요. (No tenia tiempo, asi que no pude hacer la tarea.)']],
            options: ['못', '안', '지', '않'],
            answer: '못',
            explain: '시간이 없어서 = causa externa → 못 했어요 (incapacidad).',
          },
          {
            scene: 'No querer',
            lines: [['Marco', '오늘 피곤해서 운동___ 않아요. (Hoy estoy cansado asi que no hago ejercicio.)']],
            options: ['하지', '안', '못', '해지'],
            answer: '하지',
            explain: '운동하지 않아요 = forma formal de negacion de 운동하다.',
          },
          {
            scene: 'Alergico',
            lines: [['Lina', '새우 알레르기가 있어서 새우를 ___ 먹어요. (Soy alergica a los camarones, asi que no puedo comerlos.)']],
            options: ['못', '안', '지', '않'],
            answer: '못',
            explain: 'Alergia = incapacidad fisica: 못 먹어요.',
          },
          {
            scene: 'Rechazo educado',
            lines: [['Sofia', '감사하지만 오늘은 ___ 가요. (Gracias, pero hoy no voy.)']],
            options: ['안', '못', '지', '않'],
            answer: '안',
            explain: 'Rechazo voluntario: 안 가요.',
          },
          {
            scene: 'Negacion pasada formal',
            lines: [['Zhanna', '어제 약속을 지키___ 못했어요. (Ayer no pude cumplir la promesa.)']],
            options: ['지', '아', '이', '어'],
            answer: '지',
            explain: '지키지 못했어요 = forma formal de incapacidad en pasado.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Dialogos con dos espacios',
        tag: '2 espacios',
        intro: 'Completa los dialogos con la negacion correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Invitacion rechazada',
            lines: [
              ['Carlos', '파티에 올 수 있어요? (¿Puedes venir a la fiesta?)'],
              ['Ana', '죄송해요, 오늘 [[0]] 가요. 다음에 꼭 [[1]] 갈게요. (Lo siento, hoy no puedo ir. La proxima vez seguro ire.)'],
            ],
            blanks: [
              { options: ['못', '안', '지', '않'], answer: '못', explain: '못 가요 = incapacidad/imposibilidad. Rechazo educado.' },
              { options: ['꼭', '안', '못', '지'], answer: '꼭', explain: '꼭 = seguro/definitivamente. 꼭 갈게요 = definitivamente ire.' },
            ],
          },
          {
            scene: 'Preferencias alimentarias',
            lines: [
              ['Zhanna', '고수를 좋아해요? (¿Te gusta el cilantro?)'],
              ['David', '아니요, 고수는 [[0]] 먹어요. 맛이 너무 강해서 [[1]] 먹어요. (No, no como cilantro. El sabor es demasiado fuerte, no puedo comerlo.)'],
            ],
            blanks: [
              { options: ['안', '못', '지', '않'], answer: '안', explain: '안 먹어요 = decision personal.' },
              { options: ['못', '안', '지', '않'], answer: '못', explain: '못 먹어요 = incapacidad por el sabor fuerte.' },
            ],
          },
          {
            scene: 'Situacion de salud',
            lines: [
              ['Marco', '왜 수업에 [[0]] 왔어요? (¿Por que no viniste a clase?)'],
              ['Sofia', '열이 많이 나서 [[1]] 왔어요. (Tenia mucha fiebre, asi que no pude venir.)'],
            ],
            blanks: [
              { options: ['안', '못', '지', '않'], answer: '안', explain: '안 왔어요 — la pregunta pregunta por la razon de no venir (puede ser voluntad o incapacidad).' },
              { options: ['못', '안', '지', '않'], answer: '못', explain: '못 왔어요 = incapacidad por fiebre (causa externa).' },
            ],
          },
          {
            scene: 'Negar un rumor',
            lines: [
              ['Lina', '마르코가 학교를 그만뒀다고 들었어요. (Escuche que Marco dejo la escuela.)'],
              ['Carlos', '아니요, 그 얘기는 사실이 [[0]] 않아요. 마르코는 다음 주에 [[1]] (돌아오다, negacion posible). (No, esa historia no es cierta. Marco volvera la proxima semana.)'],
            ],
            blanks: [
              { options: ['아니지', '이지', '이지', '하지'], answer: '아니지', explain: 'Negacion de sustantivo/adjetivo: 사실이 아니에요 → formal: 아니지 않다 → simplificado: 아니에요.' },
              { options: ['돌아와요', '돌아오지 않아요', '못 돌아와요', '안 돌아와요'], answer: '돌아와요', explain: '돌아오다 → 돌아와요 (volvera — futuro con presente).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el texto con la negacion correcta (안/못/-지 않다/-지 못하다).',
        type: 'guidedText',
        scene: 'El dia en que todo salio mal — relato de Carlos',
        text: '오늘은 정말 힘든 하루였어요. 아침에 알람이 [[0]] 울려서 늦게 일어났어요. 버스도 [[1]] 잡아서 택시를 탔어요. 회의에 늦어서 발표를 잘 [[2]] 했어요. 점심도 너무 바빠서 [[3]] 먹었어요. 저녁에는 너무 피곤해서 운동도 [[4]] 했어요.',
        blanks: [
          { options: ['안', '못', '지 않아', '않아'], answer: '안', explain: '안 울려서 = el alarma no sono (negacion del hecho).' },
          { options: ['못', '안', '지 않아', '않아'], answer: '못', explain: '못 잡아서 = no pude atrapar (incapacidad circunstancial).' },
          { options: ['못', '안', '지 않아', '않아'], answer: '못', explain: '잘 못 했어요 = no lo pude hacer bien (incapacidad).' },
          { options: ['안', '못', '지 않아', '않아'], answer: '못', explain: '못 먹었어요 = no pude comer (demasiado ocupado, incapacidad).' },
          { options: ['못', '안', '지 않아', '않아'], answer: '못', explain: '못 했어요 = no pude hacer (demasiado cansado).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Completa las oraciones con la negacion apropiada.',
        type: 'freeText',
        scene: 'Respuestas de una encuesta sobre habitos',
        text: '술을 ___ 마셔요. (No bebo alcohol — decision) / 수영을 ___ 해요. (No se nadar — incapacidad) / 아침을 ___ 먹어요. (No desayuno — habito) / 어제 너무 피곤해서 공부를 ___ 했어요. (Estaba tan cansado que no pude estudiar) / 고기를 ___ 먹어요. (No como carne — soy vegetariano)',
        blanks: [
          { answer: '안', explain: 'Decision personal: 안 마셔요.' },
          { answer: '못', explain: 'Incapacidad: 못 해요 / 수영할 수 없어요.' },
          { answer: '안', explain: 'Habito/costumbre: 안 먹어요.' },
          { answer: '못', explain: 'Incapacidad por cansancio: 못 했어요.' },
          { answer: '안', explain: 'Decision/eleccion: 안 먹어요.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produccion guiada',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones de negacion usando la forma correcta.',
        type: 'write',
        items: [
          {
            scene: 'Explicar una ausencia',
            prompt: 'Di "No pude venir porque estaba enfermo" (아프다, 오다, incapacidad).',
            answer: '아파서 못 왔어요.',
            accepted: ['못 왔어요', '오지 못했어요'],
            explain: '못 + 왔어요 (incapacidad por enfermedad).',
          },
          {
            scene: 'Preferencia personal',
            prompt: 'Di "No como carne. No me gusta" (고기, 먹다, 좋아하다, negacion voluntaria).',
            answer: '고기를 안 먹어요. 좋아하지 않아요.',
            accepted: ['안 먹어요', '먹지 않아요', '좋아하지 않아요'],
            explain: 'Decision propia: 안 먹어요 o 먹지 않아요.',
          },
          {
            scene: 'No poder hablar bien',
            prompt: 'Di "Todavia no puedo hablar coreano bien" (아직, 한국어, 잘 말하다, incapacidad).',
            answer: '아직 한국어를 잘 못 해요.',
            accepted: ['잘 못 해요', '잘 못 말해요', '말하지 못해요'],
            explain: '잘 못 해요 = no puedo hacerlo bien (incapacidad).',
          },
          {
            scene: 'Negar una accion pasada',
            prompt: 'Di "No estudie ayer" usando la forma formal -지 않다.',
            answer: '어제 공부하지 않았어요.',
            accepted: ['공부하지 않았어요', '공부 안 했어요'],
            explain: '공부하지 않았어요 = forma formal. 공부 안 했어요 = coloquial.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Escritura libre',
        intro: 'Escribe tres cosas que no haces (o no puedes hacer) explicando la razon.',
        type: 'write',
        items: [
          {
            scene: 'Habito que no tienes',
            prompt: 'Escribe algo que no haces usando 안 + verbo y explica por que.',
            answer: '아침을 안 먹어요. 시간이 없어서요.',
            accepted: ['안', '-지 않아요'],
            explain: 'Habito personal: 안 + verbo + razon con -(아/어)서.',
          },
          {
            scene: 'Incapacidad',
            prompt: 'Escribe algo que no puedes hacer usando 못 + verbo y explica la razon.',
            answer: '저는 스키를 못 타요. 배운 적이 없어서요.',
            accepted: ['못', '-지 못해요'],
            explain: 'Incapacidad: 못 + verbo + razon.',
          },
          {
            scene: 'Preferencia o restriccion',
            prompt: 'Escribe algo que no comes o no bebes usando -지 않다 (forma formal).',
            answer: '커피를 마시지 않아요. 잠을 못 자서요.',
            accepted: ['-지 않아요', '않아요'],
            explain: 'Forma formal: -지 않아요.',
          },
        ],
      },
    ],
  },
}

export default topic
