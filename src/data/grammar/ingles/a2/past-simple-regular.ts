import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'past-simple-regular',
  order: '02',
  color: '#dc2626',
  category: 'Verbs',
  level: 'A2',
  title: 'Past Simple Verbos Regulares en Inglés A2',
  shortTitle: 'Past Simple Regular',
  metaTitle: 'Past Simple Verbos Regulares A2 — Reglas del -ed en Inglés',
  description:
    'El past simple de verbos regulares en inglés se forma añadiendo -ed al verbo base. Parece sencillo, pero hay tres reglas de ortografía que debes dominar: verbos en -e, verbos consonante-vocal-consonante y verbos en -y. Todos son iguales para todas las personas — no hay conjugación variable.',
  lead: 'Aprende a formar el pasado de verbos regulares con -ed: las tres reglas ortográficas y su uso para narrar eventos pasados.',
  outcomes: [
    'Añade -ed correctamente según las reglas ortográficas',
    'Reconoce que todos los sujetos usan la misma forma',
    'Narra eventos en el orden en que ocurrieron',
    'Distingue verbos regulares de irregulares comunes',
  ],

  guide: {
    goal: 'Usar verbos regulares en past simple para narrar eventos y acciones completadas en el pasado.',
    model: 'She worked hard yesterday. / We visited Madrid last summer. / He studied for the exam.',
    formula: 'Subject + verb-ed (same for all persons)',
    decisions: [
      'Regla general: añadir -ed → work → worked, visit → visited, play → played',
      'Verbo termina en -e: solo añadir -d → live → lived, love → loved, dance → danced',
      'Verbo termina en consonante-vocal-consonante (CVC): duplicar + -ed → stop → stopped, plan → planned, travel → traveled (BE: travelled)',
      'Verbo termina en consonante + -y: cambiar -y → -ied → study → studied, try → tried, carry → carried',
      'Verbo termina en vocal + -y: solo añadir -ed → play → played, stay → stayed, enjoy → enjoyed',
    ],
    table: [
      ['Tipo de verbo', 'Regla', 'Ejemplo'],
      ['General', '+ ed', 'work → worked, visit → visited'],
      ['Termina en -e', '+ d', 'live → lived, dance → danced'],
      ['CVC tónica', 'CC + ed', 'stop → stopped, plan → planned'],
    ],
    mistakes: [
      '"She studyed" ❌ → "She studied" ✓ — consonante + y → cambia a -ied.',
      '"He stoped" ❌ → "He stopped" ✓ — CVC tónica → duplica la consonante.',
      '"They was worked" ❌ → "They worked" ✓ — solo -ed, sin auxiliar en afirmativa.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma el past simple de verbos regulares?',
      paragraphs: [
        'Los verbos regulares forman el pasado simple añadiendo -ed al infinitivo. La ventaja clave es que esta forma es igual para todos los sujetos: I worked, you worked, he worked, we worked, they worked — no hay cambios según la persona.',
        'Esto contrasta fuertemente con el español, donde el pasado tiene seis formas distintas según la persona. En inglés el past simple regular es mucho más simple: aprendes una forma y la usas con cualquier sujeto.',
      ],
    },
    {
      heading: 'Las tres reglas ortográficas del -ed',
      paragraphs: [
        'Regla 1 — General: la mayoría de verbos simplemente añaden -ed: work → worked, visit → visited, watch → watched, listen → listened, open → opened.',
        'Regla 2 — Verbos terminados en -e: solo añade -d (sin duplicar la vocal): live → lived, love → loved, dance → danced, use → used, arrive → arrived.',
        'Regla 3 — Consonante + y: cambia la -y por -ied: study → studied, try → tried, carry → carried, worry → worried. Pero si hay una vocal antes de la -y, solo añade -ed: play → played, enjoy → enjoyed, stay → stayed.',
      ],
      table: [
        ['Patrón', 'Regla', 'Ejemplos'],
        ['General', '+ ed', 'work→worked, talk→talked, clean→cleaned'],
        ['Termina en -e', '+ d', 'live→lived, love→loved, use→used'],
        ['Vocal + y', '+ ed', 'play→played, enjoy→enjoyed'],
        ['Consonante + y', '→ ied', 'study→studied, try→tried'],
        ['CVC tónica', 'CC + ed', 'stop→stopped, plan→planned'],
      ],
    },
    {
      heading: 'Pronunciación de -ed: tres formas distintas',
      paragraphs: [
        'La terminación -ed tiene tres pronunciaciones según el sonido final del verbo base. Este aspecto es crucial para sonar natural en inglés hablado.',
        '/t/ — después de sonidos sordos (p, k, f, s, sh, ch): walked /wɔːkt/, cooked /kʊkt/, laughed /lɑːft/, danced /dɑːnst/.',
        '/d/ — después de sonidos sonoros (b, g, v, z, l, m, n, r, y vocales): lived /lɪvd/, opened /ˈəʊpənd/, listened /ˈlɪsənd/.',
        '/ɪd/ — después de /t/ o /d/ (es la única forma donde se pronuncia como sílaba extra): visited /ˈvɪzɪtɪd/, waited /ˈweɪtɪd/, decided /dɪˈsaɪdɪd/.',
      ],
    },
    {
      heading: 'Cuándo usar el past simple regular',
      paragraphs: [
        'El past simple se usa para hablar de acciones completadas en un momento específico del pasado: "I called you yesterday." / "She visited Paris in 2019." Generalmente hay una referencia de tiempo: yesterday, last week, two years ago, in 2020, on Monday.',
        'También se usa para narrar una secuencia de eventos pasados: "I arrived home, cooked dinner, and watched a film." Las acciones ocurren una después de la otra en ese orden.',
      ],
    },
    {
      heading: 'Errores comunes de hispanohablantes',
      paragraphs: [
        'El error más frecuente es añadir un auxiliar en la forma afirmativa: "She did worked" es incorrecto. En afirmativa solo se usa el verbo con -ed: "She worked".',
        'También es muy común el error con "study": muchos estudiantes escriben "studyed" en lugar de "studied". Recuerda: consonante (d) + y → -ied.',
        'Otro error es pronunciar -ed siempre como sílaba extra: "worked" se pronuncia /wɔːkt/, no "work-ed" como dos sílabas. Solo /t/ o /d/ finales crean la sílaba extra /ɪd/.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Verbos regulares en past simple con énfasis en las reglas ortográficas del -ed.',
    graphicPrompt: 'Línea de tiempo con eventos del pasado usando verbos regulares comunes.',
    scene: [
      ['I worked late last night.', 'Trabajé hasta tarde anoche.'],
      ['She studied for three hours.', 'Ella estudió durante tres horas.'],
      ['They visited London last summer.', 'Visitaron Londres el verano pasado.'],
      ['He stopped at the coffee shop.', 'Él paró en la cafetería.'],
      ['We danced all night!', '¡Bailamos toda la noche!'],
      ['She tried the new restaurant.', 'Ella probó el nuevo restaurante.'],
      ['I listened to music on the way.', 'Escuché música de camino.'],
      ['They planned a surprise party.', 'Planearon una fiesta sorpresa.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['work', 'study', 'visit', 'stop', 'dance', 'try', 'listen', 'plan', 'live', 'enjoy'],
    reviewFocus: ['-ed spelling rules', 'CVC doubling', 'consonant+y→ied'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma de past simple correcta para cada verbo.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando de ayer',
            lines: [['', 'She ___ really hard for the test.']],
            options: ['studied', 'studyed', 'studed', 'study'],
            answer: 'studied',
            explain: '"Study" termina en consonante + y → cambia a -ied: studied.',
          },
          {
            scene: 'Fin de semana pasado',
            lines: [['', 'We ___ at a beautiful lake last weekend.']],
            options: ['stopped', 'stoped', 'stopted', 'stop'],
            answer: 'stopped',
            explain: '"Stop" = CVC tónica (s-t-o-p) → duplica la p: stopped.',
          },
          {
            scene: 'Vacaciones de verano',
            lines: [['', 'They ___ Paris for two weeks.']],
            options: ['visited', 'visitted', 'visit', 'visiting'],
            answer: 'visited',
            explain: '"Visit" termina en /t/ → añade -ed normal: visited. "Visitted" es incorrecto (CVC no es tónica).',
          },
          {
            scene: 'Fin de semana',
            lines: [['', 'I ___ the music at the concert.']],
            options: ['enjoyed', 'enjoied', 'enjoy', 'enjoyd'],
            answer: 'enjoyed',
            explain: '"Enjoy" termina en vocal (o) + y → solo añade -ed: enjoyed.',
          },
          {
            scene: 'La semana pasada',
            lines: [['', 'He ___ in London for three years.']],
            options: ['lived', 'liveed', 'lived', 'livd'],
            answer: 'lived',
            explain: '"Live" termina en -e → solo añade -d: lived.',
          },
          {
            scene: 'Antes del viaje',
            lines: [['', 'She ___ everything carefully for the trip.']],
            options: ['planned', 'planed', 'plann', 'planning'],
            answer: 'planned',
            explain: '"Plan" = CVC (p-l-a-n) → duplica la n: planned.',
          },
          {
            scene: 'Recordando el trabajo',
            lines: [['', 'I ___ until 10 pm last night.']],
            options: ['worked', 'workt', 'workd', 'work'],
            answer: 'worked',
            explain: '"Work" termina en k (sonido sordo) → añade -ed: worked. Pronunciación: /wɔːkt/.',
          },
          {
            scene: 'Hablando del examen',
            lines: [['', 'The student ___ to answer every question.']],
            options: ['tried', 'tryed', 'tryd', 'try'],
            answer: 'tried',
            explain: '"Try" termina en consonante + y → cambia a -ied: tried.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Verbo y contexto',
        tag: '2 espacios',
        intro: 'Completa con la forma -ed correcta de cada verbo y el complemento.',
        type: 'dual',
        items: [
          {
            scene: 'Historia de viaje',
            lines: [['', 'Last summer, we [[0]] to Spain and [[1]] all the museums.']],
            blanks: [
              { options: ['travelled', 'travell', 'travel', 'traveling'], answer: 'travelled', explain: '"Travel" — en inglés británico duplica la l (travelled); en americano: traveled. Ambas son aceptadas.' },
              { options: ['visited', 'visit', 'visitted', 'visiting'], answer: 'visited', explain: '"Visit" → visited. Solo -ed (CVC no tónica).' },
            ],
          },
          {
            scene: 'Noche de estudio',
            lines: [['', 'I [[0]] music while my sister [[1]] for her exam.']],
            blanks: [
              { options: ['listened to', 'listen', 'listend', 'listened'], answer: 'listened to', explain: '"Listen to" → listened to. Recuerda incluir la preposición "to".' },
              { options: ['studied', 'studyed', 'study', 'studing'], answer: 'studied', explain: '"Study" → consonante + y → -ied: studied.' },
            ],
          },
          {
            scene: 'Receta de cocina',
            lines: [['', 'She [[0]] the vegetables and [[1]] them in the pan.']],
            blanks: [
              { options: ['washed', 'washt', 'wash', 'wasing'], answer: 'washed', explain: '"Wash" → añade -ed: washed. (wash/wɒʃ/ termina en sonido sordo → pronunciación /wɒʃt/)' },
              { options: ['cooked', 'cookt', 'cook', 'cooks'], answer: 'cooked', explain: '"Cook" → añade -ed: cooked.' },
            ],
          },
          {
            scene: 'Conversación de trabajo',
            lines: [['', 'They [[0]] the meeting and [[1]] a new date.']],
            blanks: [
              { options: ['cancelled', 'canceld', 'cancel', 'canceling'], answer: 'cancelled', explain: '"Cancel" → en inglés británico: cancelled; americano: canceled.' },
              { options: ['planned', 'planed', 'plan', 'plann'], answer: 'planned', explain: '"Plan" = CVC → duplica la n: planned.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Una semana ocupada',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta de past simple para cada verbo entre paréntesis.',
        type: 'guidedText',
        scene: 'Elige la forma correcta de past simple para cada verbo entre paréntesis.',
        text: 'Last week was very productive. On Monday I [[0]] (start) a new online course. On Tuesday my colleague and I [[1]] (finish) a big project. On Wednesday I [[2]] (visit) a client in another city — I [[3]] (arrive) late because the train [[4]] (stop) at an unexpected station. On Thursday I [[5]] (study) for a certification exam. By Friday I was exhausted, but I [[6]] (enjoy) a quiet dinner with my family.',
        blanks: [
          { options: ['started', 'start', 'starting', 'startes'], answer: 'started', explain: '"Start" → añade -ed: started.' },
          { options: ['finished', 'finish', 'finishd', 'finisht'], answer: 'finished', explain: '"Finish" → añade -ed: finished.' },
          { options: ['visited', 'visit', 'visitted', 'visiting'], answer: 'visited', explain: '"Visit" → visited.' },
          { options: ['arrived', 'arriveed', 'arrive', 'arrivd'], answer: 'arrived', explain: '"Arrive" termina en -e → solo -d: arrived.' },
          { options: ['stopped', 'stoped', 'stop', 'stopt'], answer: 'stopped', explain: '"Stop" = CVC → duplica la p: stopped.' },
          { options: ['studied', 'studyed', 'study', 'studed'], answer: 'studied', explain: '"Study" → consonante + y → -ied: studied.' },
          { options: ['enjoyed', 'enjoied', 'enjoy', 'enjoyd'], answer: 'enjoyed', explain: '"Enjoy" = vocal + y → solo -ed: enjoyed.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de past simple del verbo entre paréntesis.',
        type: 'freeText',
        scene: 'Escribe la forma correcta de past simple del verbo entre paréntesis.',
        text: 'Yesterday I [[0]] (wake up) early and [[1]] (exercise) for 30 minutes. Then I [[2]] (cook) breakfast and [[3]] (listen) to a podcast while I ate. After work, I [[4]] (call) my parents to say hello.',
        blanks: [
          { answer: 'woke up', accepted: ['woke up', 'waked up'], explain: '"Wake up" es irregular: wake → woke. (Incluida para presentar irregulares pronto).' },
          { answer: 'exercised', accepted: ['exercised'], explain: '"Exercise" termina en -e → solo -d: exercised.' },
          { answer: 'cooked', accepted: ['cooked'], explain: '"Cook" → -ed: cooked.' },
          { answer: 'listened', accepted: ['listened'], explain: '"Listen" → -ed: listened.' },
          { answer: 'called', accepted: ['called'], explain: '"Call" → -ed: called.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando verbos regulares en past simple.',
        type: 'write',
        items: [
          {
            scene: 'Tu rutina de ayer',
            prompt: 'Escribe qué hiciste primero ayer por la mañana (usa un verbo regular en -ed).',
            answer: 'I washed my face and brushed my teeth.',
            accepted: ['i walked', 'i washed', 'i cooked', 'i listened', 'i watched', 'i checked', 'i exercised', 'i called', 'i worked', 'i cleaned'],
            explain: 'Ejemplo: I checked my phone. / I cooked breakfast. / I listened to music.',
          },
          {
            scene: 'El fin de semana',
            prompt: 'Describe una actividad que disfrutaste el fin de semana pasado (verbo regular).',
            answer: 'I enjoyed a long walk in the park.',
            accepted: ['enjoyed', 'visited', 'watched', 'listened', 'played', 'cooked', 'worked', 'danced', 'studied', 'tried'],
            explain: 'Ejemplo: I visited my grandparents. / I watched a great movie. / I tried a new recipe.',
          },
          {
            scene: 'Estudiando',
            prompt: 'Escribe cuánto tiempo estudiaste o trabajaste ayer.',
            answer: 'I studied English for two hours yesterday.',
            accepted: ['studied', 'worked', 'practised', 'practiced', 'reviewed', 'finished'],
            explain: 'Ejemplo: I studied for three hours. / I worked until 8 pm.',
          },
          {
            scene: 'Una anécdota',
            prompt: 'Cuenta algo que intentaste hacer pero no resultó bien (usa "tried" u otro verbo).',
            answer: 'I tried to cook a new recipe, but it didn\'t taste great.',
            accepted: ['tried', 'attempted', 'wanted', 'decided', 'planned'],
            explain: 'Ejemplo: I tried to run 5km but I stopped after 2km.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Mi semana pasada',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones contando tu semana pasada. Usa verbos regulares diferentes en cada una.',
        type: 'write',
        items: [
          {
            scene: 'Tu historia',
            prompt: 'Escribe qué hiciste el lunes o martes pasado (al menos un verbo regular en -ed).',
            answer: 'I worked from home and attended two online meetings.',
            accepted: ['worked', 'studied', 'visited', 'called', 'cleaned', 'cooked', 'watched', 'listened', 'played', 'walked', 'exercised', 'enjoyed'],
            explain: 'Usa verbos como: work, study, visit, call, clean, cook, watch, listen, play, enjoy.',
          },
          {
            scene: 'Tu historia',
            prompt: 'Escribe algo específico que intentaste (tried) o planeaste (planned) hacer.',
            answer: 'I tried a new Italian restaurant with my friends.',
            accepted: ['tried', 'planned', 'decided', 'organised', 'organized', 'started', 'finished'],
            explain: 'Ejemplo: I tried to go to the gym every day. / I planned a trip for the weekend.',
          },
          {
            scene: 'Tu historia',
            prompt: 'Escribe algo que disfrutaste (enjoyed) al final de la semana.',
            answer: 'I enjoyed a relaxing weekend with my family.',
            accepted: ['enjoyed', 'loved', 'liked', 'relaxed', 'watched', 'visited', 'played'],
            explain: 'Ejemplo: I enjoyed a quiet evening at home. / I visited my parents on Sunday.',
          },
        ],
      },
    ],
  },
}

export default topic
