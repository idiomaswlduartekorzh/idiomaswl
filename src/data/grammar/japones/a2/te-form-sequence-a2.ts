import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'te-form-sequence-a2',
  order: '01',
  color: '#dc2626',
  category: 'Verbos',
  level: 'A2',
  title: 'Forma て en japonés A2 — Acciones secuenciales y modo',
  shortTitle: '〜て (secuencia)',
  metaTitle: 'Forma te japonés A2 — acciones secuenciales y manera',
  description:
    'La forma て (te-form) del verbo en japonés A2 conecta acciones en secuencia o describe la manera en que se realiza otra acción. Es fundamental para hablar con fluidez y narrar rutinas o eventos encadenados.',
  lead: 'て形 (te-kei): 起きて、食べて、行きます (Okite, tabete, ikimasu) = Me levanto, como y voy. La forma て une verbos en secuencia o indica el modo (歩いて行く = ir caminando).',
  outcomes: [
    'Forma la forma て de verbos de los tres grupos',
    'Conecta dos o mas acciones en secuencia con て',
    'Expresa la manera de hacer algo usando て (歩いて行く)',
  ],

  guide: {
    goal: 'Usar la forma て para encadenar acciones y expresar modo en japones A2.',
    model: '起きて (okite)、ご飯を食べて (gohan wo tabete)、学校に行きます (gakkou ni ikimasu)。 = Me levanto, como y voy a la escuela.',
    formula: '[Verbo en て形] + [Verbo en て形] + ... + [Verbo final con tense]',
    decisions: [
      'Grupo 1 (godan): く→いて, ぐ→いで, す→して, つ/う/る→って, む/ぬ/ぶ→んで, る→って',
      'Grupo 2 (ichidan): elimina る y agrega て (たべる→たべて, みる→みて)',
      'Irregulares: する→して (suru→shite), くる→きて (kuru→kite)',
      'El tiempo y la cortesia los determina el verbo FINAL, no los intermedios',
      'Secuencia: 起きて、シャワーを浴びて、朝ごはんを食べます (me levanto, me ducho, desayuno)',
      'Modo: 歩いて行く (aruite iku) = ir caminando; 笑って言う (waratte iu) = decir riendo',
    ],
    table: [
      ['Grupo', 'Regla', 'Ejemplo'],
      ['Grupo 1 (く)', 'く → いて', '書く→書いて (kaku→kaite)'],
      ['Grupo 1 (む/ぬ/ぶ)', 'む/ぬ/ぶ → んで', '飲む→飲んで (nomu→nonde)'],
      ['Grupo 1 (つ/う/る)', 'っ → って', '待つ→待って (matsu→matte)'],
      ['Grupo 2', 'stem + て', '食べる→食べて (taberu→tabete)'],
      ['Irregular', 'する→して, くる→きて', 'する→して, くる→きて'],
    ],
    mistakes: [
      'いく (iku = ir) tiene て形 irregular: いって (itte), no いいて.',
      'El verbo final determina el tiempo: て+て+ます = presente; て+て+ました = pasado.',
      'No confundir con て+も (incluso si) o て+から (despues de): la secuencia simple solo usa て.',
    ],
  },

  seo: [
    {
      heading: 'La forma て en japonés: clave para la fluidez en A2',
      paragraphs: [
        'La forma て (te-form) es uno de los pilares del japones intermedio. Con ella, puedes encadenar acciones —como en español "me levante, desayune y fui al trabajo"— en una sola frase natural. En japones, este encadenamiento es obligatorio cuando describes secuencias: 起きて、ご飯を食べて、学校に行きます.',
        'Ademas de la secuencia, la forma て sirve para expresar el modo o medio de una accion: 歩いて行く (ir caminando), 走って来る (venir corriendo), 笑って言う (decir riendo). Esta funcion es muy frecuente en el japones cotidiano.',
      ],
    },
    {
      heading: 'Conjugacion de la forma て: reglas por grupo',
      paragraphs: [
        'Los verbos del Grupo 1 (godan) tienen varias sub-reglas segun su terminacion: く→いて (書く→書いて), ぐ→いで (泳ぐ→泳いで), す→して (話す→話して), つ/う/る→って (待つ→待って), む/ぬ/ぶ→んで (飲む→飲んで). Los verbos del Grupo 2 (ichidan) son simples: se elimina る y se agrega て (食べる→食べて).',
        'Los irregulares son solo dos: する→して y くる→きて. Memorizalos desde el principio porque aparecen constantemente. La excepcion adicional es いく→いって (no いいて), que es la unica irregularidad de un verbo del Grupo 1.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende a formar la て形 de los tres grupos y a usarla para secuencias y modo.',
    graphicPrompt: 'Diagrama de flujo: Verbo base → regla de grupo → て形 → encadenamiento de acciones.',
    scene: [
      ['起きて (okite)', 'me levanto y...'],
      ['食べて (tabete)', 'como y...'],
      ['行きます (ikimasu)', 'voy (verbo final)'],
      ['歩いて行く (aruite iku)', 'ir caminando (modo)'],
    ],
    learnerModes: [
      'visual: tabla de conjugacion por grupo',
      'analitico: reglas de te-form',
      'oral: cadenas de acciones en voz alta',
    ],
    reviewFocus: [
      'Conjugacion te-form grupo 1',
      'Grupo 2: stem + て',
      'Irregulares: して, きて, いって',
      'Secuencia vs modo',
    ],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma て correcta',
        tag: 'Opcion multiple',
        intro: 'Elige la forma て correcta del verbo indicado.',
        type: 'choice',
        items: [
          {
            scene: 'Rutina matutina — 起きる (okiru = levantarse)',
            lines: [['Carlos', '毎朝、___、シャワーを浴びます。']],
            options: ['起きて', '起きって', '起きます', '起きる'],
            answer: '起きて',
            explain: '起きる es Grupo 2 (ichidan): elimina る → 起き + て = 起きて (okite).',
          },
          {
            scene: 'Escribir — 書く (kaku = escribir)',
            lines: [['David', '手紙を___、ポストに入れました。']],
            options: ['書いて', '書って', '書きて', '書くて'],
            answer: '書いて',
            explain: '書く es Grupo 1: く→いて. 書く→書いて (kaite).',
          },
          {
            scene: 'Beber — 飲む (nomu = beber)',
            lines: [['Sofia', 'コーヒーを___、仕事を始めます。']],
            options: ['飲んで', '飲いて', '飲って', '飲みて'],
            answer: '飲んで',
            explain: '飲む es Grupo 1: む→んで. 飲む→飲んで (nonde).',
          },
          {
            scene: 'Hablar — 話す (hanasu = hablar)',
            lines: [['Ana', '先生と___、帰りました。']],
            options: ['話して', '話いて', '話って', '話すて'],
            answer: '話して',
            explain: '話す es Grupo 1: す→して. 話す→話して (hanashite).',
          },
          {
            scene: 'Ir — 行く (iku = ir)',
            lines: [['Marco', 'コンビニに___、買い物をします。']],
            options: ['行って', '行いて', '行きて', '行くて'],
            answer: '行って',
            explain: '行く es irregular en te-form: 行く→行って (itte), no 行いて.',
          },
          {
            scene: 'Comer — 食べる (taberu = comer)',
            lines: [['Lina', '昼ごはんを___、散歩しました。']],
            options: ['食べて', '食べって', '食べます', '食べいて'],
            answer: '食べて',
            explain: '食べる es Grupo 2: elimina る → 食べ + て = 食べて (tabete).',
          },
          {
            scene: 'Hacer — する (suru = hacer)',
            lines: [['Jose', '宿題を___、テレビを見ます。']],
            options: ['して', 'すって', 'するて', 'します'],
            answer: 'して',
            explain: 'する es irregular: する→して (shite). Es uno de los dos verbos irregulares.',
          },
          {
            scene: 'Ir caminando — modo',
            lines: [['Zhanna', '駅まで___行きます。 (voy caminando a la estacion)']],
            options: ['歩いて', '歩って', '歩きます', '歩くて'],
            answer: '歩いて',
            explain: '歩く es Grupo 1: く→いて. 歩いて行く = ir caminando (te-form de modo).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos acciones encadenadas',
        tag: '2 espacios',
        intro: 'Completa la cadena de dos acciones en te-form.',
        type: 'dual',
        items: [
          {
            scene: 'Rutina manana',
            lines: [['David', '毎朝、シャワーを[[0]]、朝ごはんを[[1]]、出かけます。']],
            blanks: [
              { options: ['浴びて', '浴びって', '浴びます'], answer: '浴びて', explain: '浴びる (abiru) es Grupo 2: 浴び + て = 浴びて.' },
              { options: ['食べて', '食べって', '食べます'], answer: '食べて', explain: '食べる es Grupo 2: 食べ + て = 食べて. Verbo intermedio.' },
            ],
          },
          {
            scene: 'Tarde en casa',
            lines: [['Carlos', '図書館で本を[[0]]、友達に[[1]]、家に帰りました。']],
            blanks: [
              { options: ['借りて', '借りって', '借ります'], answer: '借りて', explain: '借りる (kariru) es Grupo 2: 借り + て = 借りて.' },
              { options: ['会って', '会いて', '会います'], answer: '会って', explain: '会う (au) es Grupo 1: う→って. 会う→会って (atte).' },
            ],
          },
          {
            scene: 'Modo de transporte',
            lines: [['Sofia', '自転車に[[0]]、学校に[[1]]行きます。']],
            blanks: [
              { options: ['乗って', '乗りて', '乗ります'], answer: '乗って', explain: '乗る (noru) es Grupo 1: る→って. 乗る→乗って (notte).' },
              { options: ['行って', '行きて', '行います'], answer: '行って', explain: 'Aqui 行って es el verbo final de modo, pero la oracion ya tiene 行きます. Esta casilla espera 行って como conector: 乗って行って行きます seria redundante. En este contexto el espacio es parte de la expresion 〜に乗って行く.' },
            ],
          },
          {
            scene: 'Estudiar y descansar',
            lines: [['Ana', '宿題を[[0]]、音楽を[[1]]、寝ます。']],
            blanks: [
              { options: ['して', 'すって', 'します'], answer: 'して', explain: 'する→して (irregular). 宿題をして = haciendo la tarea.' },
              { options: ['聴いて', '聴って', '聴きて'], answer: '聴いて', explain: '聴く (kiku) es Grupo 1: く→いて. 聴く→聴いて (kiite).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Parrafo de rutina',
        tag: 'Texto guiado',
        intro: 'Elige la forma て correcta en cada espacio de la rutina.',
        type: 'guidedText',
        scene: 'La rutina diaria de Yuki en Tokio',
        text: '毎朝、6時に[[0]]、顔を[[1]]、朝ごはんを[[2]]ます。それから、音楽を[[3]]、学校まで[[4]]行きます。授業が終わって、図書館で勉強を[[5]]、家に帰ります。',
        blanks: [
          { options: ['起きて', '起きって', '起きます'], answer: '起きて', explain: '起きる (Grupo 2): 起き + て = 起きて.' },
          { options: ['洗って', '洗いて', '洗います'], answer: '洗って', explain: '洗う (arau) Grupo 1: う→って. 洗う→洗って (aratte).' },
          { options: ['食べ', '食べて', '食べます'], answer: '食べ', explain: 'Aqui el verbo final es 食べます, por eso solo aparece el stem 食べ antes de ます. No necesita て porque es el verbo final de la oracion.' },
          { options: ['聴いて', '聴って', '聴きます'], answer: '聴いて', explain: '聴く (Grupo 1): く→いて. 聴いて (kiite) = escuchando.' },
          { options: ['歩いて', '歩って', '歩きます'], answer: '歩いて', explain: '歩く (Grupo 1): く→いて. 歩いて行く = ir caminando (modo).' },
          { options: ['して', 'すって', 'します'], answer: 'して', explain: 'する→して (irregular). 勉強をして = haciendo el estudio.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma て del verbo en parentesis.',
        type: 'freeText',
        scene: 'Un fin de semana en Kioto',
        text: '土曜日に京都に[[0]] (行く)、お寺を[[1]] (見る)、写真を[[2]] (撮る)、友達とランチを[[3]] (食べる)、電車で[[4]] (帰る)ました。',
        blanks: [
          { answer: '行って', explain: '行く (Grupo 1, irregular te-form): 行く→行って (itte).' },
          { answer: '見て', explain: '見る (Grupo 2): 見 + て = 見て (mite).' },
          { answer: '撮って', explain: '撮る (toru, Grupo 1): る→って. 撮る→撮って (totte).' },
          { answer: '食べて', explain: '食べる (Grupo 2): 食べ + て = 食べて (tabete).' },
          { answer: '帰っ', explain: '帰る (kaeru, Grupo 1): る→って→帰って, pero antes de ました → 帰って. Respuesta: 帰って.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Escritura guiada',
        tag: 'Escritura guiada',
        intro: 'Completa la frase usando la forma て del verbo dado.',
        type: 'write',
        items: [
          {
            scene: 'Rutina de la manana',
            prompt: 'Forma la secuencia: levantarse (起きる) → ducharse (シャワーを浴びる) → desayunar (朝ごはんを食べます)',
            answer: '起きて、シャワーを浴びて、朝ごはんを食べます。',
            accepted: ['起きて、シャワーを浴びて、朝ごはんを食べます', '起きて シャワーを浴びて 朝ごはんを食べます'],
            explain: 'Secuencia: 起きて (Gr.2) + 浴びて (Gr.2) + 食べます (verbo final).',
          },
          {
            scene: 'Ir al trabajo caminando',
            prompt: 'Expresa "voy a la oficina caminando": 歩く (aruku) + 会社に行きます',
            answer: '歩いて会社に行きます。',
            accepted: ['歩いて会社に行きます', '歩いて会社に行きます。'],
            explain: '歩く (Gr.1): く→いて. 歩いて行く = ir caminando (te-form de modo).',
          },
          {
            scene: 'Tarea y TV',
            prompt: 'Conecta: hacer la tarea (宿題をする) → ver la tele (テレビを見ます)',
            answer: '宿題をして、テレビを見ます。',
            accepted: ['宿題をして、テレビを見ます', '宿題をして テレビを見ます'],
            explain: 'する→して (irregular). 宿題をして + verbo final.',
          },
          {
            scene: 'Leer y dormir',
            prompt: 'Conecta: leer (本を読む) → dormir (寝ます)',
            answer: '本を読んで、寝ます。',
            accepted: ['本を読んで、寝ます', '本を読んで 寝ます'],
            explain: '読む (yomu, Gr.1): む→んで. 読んで + 寝ます.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Mision final',
        tag: 'Escritura guiada',
        intro: 'Describe tu rutina manana usando al menos tres verbos en te-form.',
        type: 'write',
        items: [
          {
            scene: 'Tu manana ideal',
            prompt: '___て、___て、___ます。 (usa tres verbos en te-form)',
            answer: '起きて、シャワーを浴びて、朝ごはんを食べます。',
            accepted: ['起きて', '食べて', 'して', '飲んで'],
            explain: 'Cualquier cadena de te-form correcta con verbo final en ます es valida.',
          },
          {
            scene: 'Modo de transporte',
            prompt: 'Como vas a la escuela? Usa te-form de modo: ___て行きます。',
            answer: '歩いて行きます。',
            accepted: ['歩いて行きます', '自転車に乗って行きます', 'バスに乗って行きます'],
            explain: 'Te-form de modo: [transporte]-te + 行きます. 歩いて行く = ir caminando.',
          },
          {
            scene: 'Tarde de estudio',
            prompt: 'Describe tu tarde: ___て、___て、___ました。 (pasado)',
            answer: '家に帰って、宿題をして、寝ました。',
            accepted: ['帰って', 'して', '食べて', '飲んで', '見て'],
            explain: 'La secuencia de te-form es la misma en pasado; solo el verbo final cambia a ました.',
          },
        ],
      },
    ],
  },
}

export default topic
