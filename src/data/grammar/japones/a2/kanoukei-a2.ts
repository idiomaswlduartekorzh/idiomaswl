import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'kanoukei-a2',
  order: '05',
  color: '#dc2626',
  category: 'Verbos',
  level: 'A2',
  title: 'Forma potencial en japonés A2 — ～られる / ～える',
  shortTitle: 'Forma potencial',
  metaTitle: 'forma potencial japones A2 — rareru eru poder hacer',
  description:
    'La forma potencial del verbo en japones A2 expresa capacidad o posibilidad: poder hacer algo. Equivale a "poder + infinitivo" en espanol. Se forma con 〜られる para Grupo 2 y 〜える para Grupo 1.',
  lead: '食べられます (taberaremasu) = puedo comer. 書けます (kakemasu) = puedo escribir. 泳げますか？(oyogemasu ka?) = ¿Puedes nadar?',
  outcomes: [
    'Forma el potencial de verbos Grupo 1 con la terminacion 〜える',
    'Forma el potencial de verbos Grupo 2 con 〜られる',
    'Usa el potencial en preguntas y negaciones (〜られません, 〜えません)',
  ],

  guide: {
    goal: 'Usar la forma potencial para expresar capacidad o posibilidad en japones A2.',
    model: '私は日本語が話せます。(Watashi wa nihongo ga hanasemasu.) = Puedo hablar japones. 今日は行けません。= Hoy no puedo ir.',
    formula: 'Gr.1: [raiz vocálica う→え] + る / Gr.2: [stem] + られる / Irregulares: できる, こられる',
    decisions: [
      'Grupo 1: cambia la vocal final de う a え y agrega る: 書く(ku)→書ける(ke+ru), 話す(su)→話せる(se+ru), 飲む(mu)→飲める(me+ru)',
      'Grupo 2: agrega られる al stem: 食べる→食べられる, 見る→見られる',
      'Irregulares: する→できる, くる→こられる',
      'El objeto con potencial usa が (no を): 日本語が話せます',
      'Negativo: 〜られません (Gr.2), 〜えません (Gr.1): 食べられません, 書けません',
      'Los potenciales son verbos Grupo 2 (en る): pueden conjugarse normalmente: 食べられます, 食べられた, 食べられています',
    ],
    table: [
      ['Verbo', 'Potencial', 'Significado'],
      ['書く (kaku)', '書ける (kakeru)', 'poder escribir'],
      ['飲む (nomu)', '飲める (nomeru)', 'poder beber'],
      ['食べる (taberu)', '食べられる (taberareru)', 'poder comer'],
      ['する (suru)', 'できる (dekiru)', 'poder hacer'],
    ],
    mistakes: [
      'El potencial de verbos Grupo 2 en habla coloquial frecuentemente omite ら: 食べれる en lugar de 食べられる. Aprende primero la forma estandar.',
      'El objeto del potencial normalmente usa が: 日本語が話せます, no 日本語を話せます.',
      'できる es el potencial de する pero tambien se usa de forma independiente para habilidades.',
    ],
  },

  seo: [
    {
      heading: 'La forma potencial en japones: como decir "puedo hacer algo"',
      paragraphs: [
        'La forma potencial es esencial para hablar de tus habilidades en japones. Para verbos del Grupo 1, la regla es cambiar la vocal final de う a え y agregar る: 書く→書ける, 飲む→飲める, 話す→話せる. Para el Grupo 2, agrega られる: 食べる→食べられる, 見る→見られる.',
        'Los dos irregulares son する→できる y くる→こられる. El verbo できる es especialmente util: 日本語ができます = Se japones / Puedo hablar japones.',
      ],
    },
    {
      heading: 'El potencial con が y la contraccion coloquial',
      paragraphs: [
        'Con el potencial, el objeto de la accion frecuentemente va con が en lugar de を: 日本語が話せます (no 日本語を). Esta es una diferencia importante del japones estandar.',
        'En japones coloquial, el Grupo 2 a veces pierde la ら: 食べれる en lugar de 食べられる. Este fenomeno se llama "ら抜き言葉" (ra-nuki kotoba) y aunque es muy comun en el habla, evitalo en escribir formal.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende las dos reglas principales del potencial y los irregulares.',
    graphicPrompt: 'Tabla de conjugacion del potencial: Gr.1 う→え+る, Gr.2 stem+られる.',
    scene: [
      ['書けます (kakemasu)', 'puedo escribir (Gr.1)'],
      ['食べられます (taberaremasu)', 'puedo comer (Gr.2)'],
      ['話せません (hanasemasen)', 'no puedo hablar (Gr.1)'],
      ['日本語ができます (nihongo ga dekimasu)', 'se japones (irregular)'],
    ],
    learnerModes: [
      'oral: preguntas sobre habilidades (〜できますか？)',
      'analitico: reglas de conjugacion por grupo',
      'conversacional: describir lo que puedes o no puedes hacer',
    ],
    reviewFocus: [
      'Gr.1: う段→え段+る',
      'Gr.2: stem+られる',
      'Irregulares: できる, こられる',
      'Objeto con が no を',
    ],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Potencial correcto',
        tag: 'Opcion multiple',
        intro: 'Elige la forma potencial correcta del verbo indicado.',
        type: 'choice',
        items: [
          {
            scene: 'Poder nadar — 泳ぐ (oyogu)',
            lines: [['Carlos', '私は___。(puedo nadar)']],
            options: ['泳げます', '泳ぎられます', '泳げません', '泳ぎます'],
            answer: '泳げます',
            explain: '泳ぐ (Gr.1): ぐ→げ+る = 泳げる → 泳げます. Puede nadar.',
          },
          {
            scene: 'Poder comer picante — 辛いものを食べる',
            lines: [['Sofia', '辛いものが___。(no puedo comer cosas picantes)']],
            options: ['食べられません', '食べられます', '食べません', '食べれません'],
            answer: '食べられません',
            explain: '食べる (Gr.2): 食べ + られる → 食べられる → negativo: 食べられません.',
          },
          {
            scene: 'Poder hablar espanol',
            lines: [['David', 'スペイン語が___か？(¿Puedes hablar espanol?)']],
            options: ['話せますか', '話しますか', '話されますか', '話れますか'],
            answer: '話せますか',
            explain: '話す (Gr.1): す→せ+る = 話せる → 話せますか？',
          },
          {
            scene: 'Poder venir manana — 来る',
            lines: [['Ana', '明日___か？(¿Puedes venir manana?)']],
            options: ['こられますか', 'きられますか', 'きれますか', 'これますか'],
            answer: 'こられますか',
            explain: 'くる (irregular): こられる → こられますか？Potencial de くる.',
          },
          {
            scene: 'Poder hacer — できる',
            lines: [['Marco', '日本語が___。(puedo hablar japones)']],
            options: ['できます', 'されます', 'しられます', 'できません'],
            answer: 'できます',
            explain: 'する (irregular): できる → できます. Potencial de する.',
          },
          {
            scene: 'Poder leer kanji — 漢字を読む',
            lines: [['Lina', '漢字が少し___。(puedo leer un poco de kanji)']],
            options: ['読めます', '読まれます', '読みられます', '読めません'],
            answer: '読めます',
            explain: '読む (Gr.1): む→め+る = 読める → 読めます.',
          },
          {
            scene: 'No poder ir hoy',
            lines: [['Jose', '今日は___。(hoy no puedo ir)']],
            options: ['行けません', '行きられません', '行かれません', '行きません'],
            answer: '行けません',
            explain: '行く (Gr.1): く→け+る = 行ける → negativo: 行けません.',
          },
          {
            scene: 'Poder ver bien — 見る',
            lines: [['Zhanna', 'ここからよく___か？(¿Se puede ver bien desde aqui?)']],
            options: ['見られますか', '見えますか', '見ますか', '見られませんか'],
            answer: '見られますか',
            explain: '見る (Gr.2): 見 + られる → 見られる → 見られますか？',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Habilidades de la familia',
        tag: '2 espacios',
        intro: 'Completa los dos potenciales en el dialogo.',
        type: 'dual',
        items: [
          {
            scene: 'Habilidades lingüisticas',
            lines: [['David', '中国語が[[0]]か？'], ['Carlos', 'いいえ、でも韓国語が[[1]]よ。']],
            blanks: [
              { options: ['話せますか', '話しますか', '話されますか'], answer: '話せますか', explain: '話す→話せる → 話せますか？' },
              { options: ['話せます', '話します', '話されます'], answer: '話せます', explain: '話す→話せる → 話せます. Puede hablar coreano.' },
            ],
          },
          {
            scene: 'En la clase de natacion',
            lines: [['Sofia', '25メートル[[0]]か？'], ['Ana', 'はい、でも50メートルは[[1]]。']],
            blanks: [
              { options: ['泳げますか', '泳ぎますか', '泳がれますか'], answer: '泳げますか', explain: '泳ぐ→泳げる → 泳げますか？' },
              { options: ['泳げません', '泳ぎません', '泳がれません'], answer: '泳げません', explain: '泳ぐ→泳げる → negativo: 泳げません.' },
            ],
          },
          {
            scene: 'Sobre la comida',
            lines: [['Marco', '辛い料理が[[0]]か？'], ['Lina', 'はい、でもとても辛いものは[[1]]。']],
            blanks: [
              { options: ['食べられますか', '食べますか', '食べれますか'], answer: '食べられますか', explain: '食べる (Gr.2): 食べ+られる → 食べられますか？' },
              { options: ['食べられません', '食べません', '食べれません'], answer: '食べられません', explain: '食べる→食べられる → negativo: 食べられません.' },
            ],
          },
          {
            scene: 'Reunion manana',
            lines: [['Jose', '明日の会議に[[0]]か？'], ['Zhanna', 'いいえ、残念ながら[[1]]。']],
            blanks: [
              { options: ['来られますか', '来ますか', 'きれますか'], answer: '来られますか', explain: 'くる (irregular): こられる → 来られますか？' },
              { options: ['来られません', '来ません', 'きれません'], answer: '来られません', explain: 'くる→こられる → negativo: 来られません.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Sobre las habilidades de Yuki',
        tag: 'Texto guiado',
        intro: 'Elige la forma potencial correcta en cada espacio.',
        type: 'guidedText',
        scene: 'Yuki describe lo que puede y no puede hacer',
        text: '私は日本語と英語が[[0]]。スペイン語は少し[[1]]が、まだ上手ではありません。料理は[[2]]が、ケーキは[[3]]。ピアノも少し[[4]]。',
        blanks: [
          { options: ['話せます', '話します', '話せません'], answer: '話せます', explain: '話す→話せる → 話せます. Puede hablar japones e ingles.' },
          { options: ['話せます', '話します', '話せません'], answer: '話せます', explain: 'Puede hablar un poco de espanol.' },
          { options: ['できます', 'します', 'できません'], answer: 'できます', explain: 'する→できる → できます. Puede cocinar.' },
          { options: ['作れません', '作りません', '作られません'], answer: '作れません', explain: '作る (Gr.1): る→れ+る = 作れる → negativo: 作れません.' },
          { options: ['弾けます', '弾きます', '弾けません'], answer: '弾けます', explain: '弾く (hiku, Gr.1): く→け+る = 弾ける → 弾けます.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma potencial del verbo en parentesis.',
        type: 'freeText',
        scene: 'Carlos habla de sus habilidades',
        text: '私はギターが[[0]] (弾く)。日本語の漢字も少し[[1]] (読む)。でも、長い距離は[[2]] (走る)。寿司は[[3]] (食べる)が、納豆は[[4]] (食べる)。',
        blanks: [
          { answer: '弾けます', explain: '弾く (Gr.1): く→け+る = 弾ける → 弾けます.' },
          { answer: '読めます', explain: '読む (Gr.1): む→め+る = 読める → 読めます.' },
          { answer: '走れません', explain: '走る (hashiru, Gr.1): る→れ+る = 走れる → negativo: 走れません.' },
          { answer: '食べられます', explain: '食べる (Gr.2): 食べ+られる → 食べられます.' },
          { answer: '食べられません', explain: '食べる→食べられる → negativo: 食べられません.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Escribe sobre tus habilidades',
        tag: 'Escritura guiada',
        intro: 'Escribe la oracion completa usando la forma potencial.',
        type: 'write',
        items: [
          {
            scene: 'Habilidad lingüistica',
            prompt: 'Escribe: Puedo hablar ingles y un poco de japones → 英語 + 日本語',
            answer: '英語と少し日本語が話せます。',
            accepted: ['英語が話せます', '英語と日本語が話せます', '日本語が少し話せます'],
            explain: '話す→話せ+る. Con potencial el objeto lleva が.',
          },
          {
            scene: 'No poder hacer algo',
            prompt: 'Escribe: No puedo comer mariscos → 魚介類 (sakana-rui)',
            answer: '魚介類が食べられません。',
            accepted: ['魚介類が食べられません', '魚介類は食べられません'],
            explain: '食べる (Gr.2): 食べ+られる → negativo: 食べられません.',
          },
          {
            scene: 'Pregunta de habilidad',
            prompt: 'Escribe la pregunta: ¿Puedes conducir un coche? → 車 (kuruma) + 運転する (untensuru)',
            answer: '車が運転できますか？',
            accepted: ['車が運転できますか', '車を運転できますか'],
            explain: 'する→できる. 運転できますか？= ¿Puedes conducir?',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Mision final',
        tag: 'Escritura libre',
        intro: 'Escribe sobre tus habilidades y limitaciones usando la forma potencial.',
        type: 'write',
        items: [
          {
            scene: 'Lo que puedes hacer',
            prompt: '私は___が___えます/られます。 (una habilidad tuya)',
            answer: '私は日本語が少し話せます。',
            accepted: ['えます', 'られます', 'できます'],
            explain: 'Usa Gr.1 (う→え+る) o Gr.2 (stem+られる) segun el verbo.',
          },
          {
            scene: 'Lo que no puedes hacer',
            prompt: '私は___が___えません/られません。 (algo que no puedes hacer)',
            answer: '私はピアノが弾けません。',
            accepted: ['えません', 'られません', 'できません'],
            explain: 'Negativo del potencial: 〜えません (Gr.1) o 〜られません (Gr.2).',
          },
          {
            scene: 'Pregunta a un companero',
            prompt: 'あなたは___が___えますか？ (pregunta sobre una habilidad)',
            answer: '日本語が話せますか？',
            accepted: ['えますか', 'られますか', 'できますか'],
            explain: 'Pregunta de potencial: 〜えますか / 〜られますか / できますか.',
          },
        ],
      },
    ],
  },
}

export default topic
