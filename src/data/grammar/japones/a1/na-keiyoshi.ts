import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'na-keiyoshi',
  order: '10',
  color: '#dc2626',
  category: 'Adjetivos',
  level: 'A1',
  title: 'Adjetivos な en japonés A1 — na-keiyoshi: formas y usos',
  shortTitle: 'Adjetivos な',
  metaTitle: 'Adjetivos na keiyoshi japonés A1 — forma predicado modificador conjugación',
  description:
    'Los adjetivos な (na-keiyoshi) son el segundo tipo de adjetivos en japonés. A diferencia de los adjetivos い, se comportan más como sustantivos y necesitan な para modificar sustantivos directamente. Como predicado se conjugan usando です y sus variantes. Incluyen vocabulario muy frecuente: きれい (bonito), 静か (silencioso), 好き (gustar), 嫌い (odiar).',
  lead: 'Adjetivos な: 静かな まち (ciudad tranquila — な conecta con el sustantivo). Como predicado: 静かです. Negativo: 静かじゃないです. Pasado: 静かでした. Na entre el adjetivo y el sustantivo; solo です como predicado.',
  outcomes: [
    'Usa な para conectar adjetivos な con sustantivos',
    'Conjuga adjetivos な en las cuatro formas predicativas básicas',
    'Distingue los adjetivos な de los adjetivos い en su comportamiento gramatical',
  ],

  guide: {
    goal: 'Usar adjetivos な correctamente como modificadores y como predicados.',
    model: 'これは 静かな へやです。(Esta es una habitación tranquila.) / この へやは 静かです。(Esta habitación es tranquila.)',
    formula: 'Modificador: adj-な + sustantivo | Predicado: adj + です/じゃないです/でした/じゃなかったです',
    decisions: [
      'Modificar sustantivo: + な: きれいな はな (flor bonita), 静かな まち (ciudad tranquila)',
      'Predicado presente afirmativo: adj + です: 静かです, きれいです',
      'Predicado presente negativo: adj + じゃないです (o ではないです): 静かじゃないです',
      'Predicado pasado afirmativo: adj + でした: 静かでした',
      'Predicado pasado negativo: adj + じゃなかったです: 静かじゃなかったです',
      'きれい termina en い pero es adjetivo な — NO sigue las reglas de i-keiyoshi',
    ],
    table: [
      ['Forma', 'Modificador', 'Predicado'],
      ['Presente +', '静かな [sustantivo]', '静かです'],
      ['Presente −', '—', '静かじゃないです'],
      ['Pasado +', '—', '静かでした'],
      ['Pasado −', '—', '静かじゃなかったです'],
    ],
    mistakes: [
      '"きれいくないです" ✗ — きれい es adjetivo な, no い: → "きれいじゃないです".',
      '"静かいな まち" ✗ — los adjetivos な no tienen い: → "静かな まち".',
      '"好きです" necesita が para el objeto: にほんごが 好きです (no にほんごを 好きです).',
    ],
  },
  seo: [
    {
      heading: 'Adjetivos な: los "adjetivos sustantivales" del japonés',
      paragraphs: [
        'Los adjetivos な se llaman na-keiyoshi y se comportan de manera diferente a los adjetivos い. En lugar de conjugarse modificando su terminación, toman la forma del sustantivo: para modificar otro sustantivo añaden な, y para ser predicado usan です y sus variantes (igual que los sustantivos con です). Esto los hace más predecibles en muchos sentidos.',
        'La confusión más frecuente para hispanohablantes es con きれい (bonito/limpio). Termina en い pero es un adjetivo な, no un adjetivo い. Así que su negativo NO es きれいくない sino きれいじゃない. Una regla práctica: los adjetivos な que vienen del chino (有名, 便利, 元気) y los que describen estados (静か, 暇, 大変) son casi siempre な.',
      ],
    },
    {
      heading: 'Adjetivos な frecuentes en japonés A1',
      paragraphs: [
        'El vocabulario A1 de adjetivos な incluye palabras muy usadas: きれい (bonito/limpio), 静か (shizuka = tranquilo/silencioso), 有名 (yūmei = famoso), 便利 (benri = conveniente), 好き (suki = gustar — "me gusta"), 嫌い (kirai = odiar — "me disgusta"), 上手 (jōzu = hábil), 下手 (heta = torpe), 暇 (hima = libre/sin hacer nada), 元気 (genki = con energía/bien de salud), 大丈夫 (daijōbu = está bien/no hay problema), 大変 (taihen = difícil/terrible).',
        'Nota especial sobre 好き y 嫌い: en japonés "me gusta X" se expresa como "X が 好きです", literalmente "X es de mi agrado". El objeto de gusto toma が, no を. Esto es diferente al español y es un error muy frecuente: "にほんごが 好きです" (me gusta el japonés), no "にほんごを 好きです".',
      ],
    },
  ],
  visual: {
    mode: 'na-adjective-forms',
    teacherLens: 'El estudiante aprende na-keiyoshi con sus formas predicativas y la trampa de きれい.',
    graphicPrompt: 'Tabla な-adj: modificador (+ な) vs predicado (です/じゃない/でした). Advertencia きれい en rojo.',
    scene: [
      ['Modificador: adj + な + sustantivo', 'きれいな はな'],
      ['Predicado: adj + です', 'きれいです'],
      ['Negativo: adj + じゃないです', '静かじゃないです'],
    ],
    learnerModes: ['visual: tabla modificador vs predicado', 'analítico: な vs い diferencias', 'oral: describir lugares y personas'],
    reviewFocus: ['な para modificar sustantivos', '4 formas predicativas', 'きれい = な (no い)', '好き con が'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Forma correcta del adjetivo な',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del adjetivo な.',
        type: 'choice',
        items: [
          {
            scene: 'Una ciudad tranquila',
            lines: [['David', 'これは ___ まちです。(Esta es una ciudad tranquila.)']],
            options: ['静かな', '静かの', '静かい', '静か'],
            answer: '静かな',
            explain: 'Modificar sustantivo con adjetivo な: 静か + な + まち.',
          },
          {
            scene: 'No es famoso',
            lines: [['Carlos', 'このレストランは ___。(Este restaurante no es famoso.)']],
            options: ['有名じゃないです', '有名くないです', '有名じゃないな', '有名ないです'],
            answer: '有名じゃないです',
            explain: 'Predicado negativo de adjetivo な: 有名 + じゃないです.',
          },
          {
            scene: 'Me gusta el japonés',
            lines: [['Sofia', 'にほんごが ___。(Me gusta el japonés.)']],
            options: ['好きです', '好きますです', '好いです', '好きくないです'],
            answer: '好きです',
            explain: '好き es adjetivo な: predicado = 好きです. El objeto toma が.',
          },
          {
            scene: 'Una ciudad bonita',
            lines: [['Ana', 'とうきょうは ___ まちです。(Tokio es una ciudad bonita.)']],
            options: ['きれいな', 'きれいの', 'きれいい', 'きれい'],
            answer: 'きれいな',
            explain: 'きれい es adjetivo な (aunque termina en い): きれい + な + まち.',
          },
          {
            scene: 'Era conveniente',
            lines: [['Marco', 'この みせは ___。(Esta tienda era conveniente.)']],
            options: ['べんりでした', 'べんりかったです', 'べんりだったです', 'べんりだった'],
            answer: 'べんりでした',
            explain: 'Pasado afirmativo de adjetivo な: べんり + でした.',
          },
          {
            scene: 'Estoy bien/con energía',
            lines: [['Lina', 'わたしは ___。(Estoy bien / con energía.)']],
            options: ['元気です', '元気くないです', '元気な', '元気でない'],
            answer: '元気です',
            explain: '元気 es adjetivo な: predicado = 元気です. ¡Muy usado para "¿cómo estás?"!',
          },
          {
            scene: 'No me gusta',
            lines: [['Zhanna', 'からいたべものが ___。(No me gusta la comida picante.)']],
            options: ['嫌いです', '嫌いくないです', '嫌いじゃないです', '嫌い'],
            answer: '嫌いです',
            explain: '嫌い (odiar/no gustar) es adjetivo な: 嫌いです. Objeto + が + 嫌いです.',
          },
          {
            scene: 'No estaba tranquilo',
            lines: [['Carlos', 'あのところは ___。(Ese lugar no estaba tranquilo.)']],
            options: ['静かじゃなかったです', '静かくなかったです', '静かでなかった', '静かじゃなかったな'],
            answer: '静かじゃなかったです',
            explain: 'Pasado negativo de adjetivo な: 静か + じゃなかったです.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Modificador y predicado な',
        tag: '2 formas',
        intro: 'Completa las dos formas del adjetivo な en el diálogo.',
        type: 'dual',
        items: [
          {
            scene: 'Sobre WeLearn',
            lines: [['David', 'ウィーラーンは [[0]] がっこうです。とても [[1]]。(WeLearn es una escuela famosa. Es muy conveniente.)']],
            blanks: [
              { options: ['有名な', '有名の', '有名い'], answer: '有名な', explain: 'Modificador: 有名 + な + がっこう.' },
              { options: ['べんりです', 'べんりじゃないです', 'べんりな'], answer: 'べんりです', explain: 'Predicado: べんり + です.' },
            ],
          },
          {
            scene: 'Gustos y aversiones',
            lines: [['Sofia', 'にほんごが [[0]]。でも、かんじは [[1]]。(Me gusta el japonés. Pero los kanji los odio.)']],
            blanks: [
              { options: ['好きです', '好きくないです', '好きじゃないです'], answer: '好きです', explain: '好き predicado: 好きです.' },
              { options: ['嫌いです', '嫌いじゃないです', '好きです'], answer: '嫌いです', explain: '嫌い predicado: 嫌いです.' },
            ],
          },
          {
            scene: 'Una habitación bonita pero no silenciosa',
            lines: [['Ana', 'これは [[0]] へやです。でも [[1]]。(Esta es una habitación bonita. Pero no está tranquila.)']],
            blanks: [
              { options: ['きれいな', 'きれいの', 'きれいい'], answer: 'きれいな', explain: 'きれい (adjetivo な) + な + へや.' },
              { options: ['静かじゃないです', '静かくないです', '静かな'], answer: '静かじゃないです', explain: 'Predicado negativo: 静か + じゃないです.' },
            ],
          },
          {
            scene: 'Cómo estabas',
            lines: [['Marco', 'きのう あなたは [[0]]？— はい、[[1]]。(¿Estabas bien ayer? — Sí, estaba bien.)']],
            blanks: [
              { options: ['元気でしたか', '元気ですか', '元気じゃなかったですか'], answer: '元気でしたか', explain: 'Pasado pregunta: 元気でしたか.' },
              { options: ['元気でした', '元気です', '元気じゃなかったです'], answer: '元気でした', explain: 'Pasado afirmativo: 元気でした.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado — descripción de ciudad',
        tag: 'Opciones',
        intro: 'Elige la forma correcta del adjetivo な.',
        type: 'guidedText',
        scene: 'Carlos describe Tokio a su familia',
        text: 'とうきょうは [[0]] (famosa) まちです。ひとが たくさんいて [[1]] (no está tranquilo) けど、とても [[2]] (conveniente)。まちは [[3]] (bonita) です。ひと々は [[4]] (amables/gentiles — 親切) です。わたしは とうきょうが [[5]] (me encanta — 大好き) になりました。',
        blanks: [
          { options: ['有名な', '有名の', '有名'], answer: '有名な', explain: 'Modificador: 有名 + な + まち.' },
          { options: ['静かじゃないです', '静かくないです', '静かじゃなかったです'], answer: '静かじゃないです', explain: 'Predicado negativo: 静かじゃないです.' },
          { options: ['べんりです', 'べんりじゃないです', 'べんりな'], answer: 'べんりです', explain: 'Predicado: べんりです.' },
          { options: ['きれいです', 'きれいくないです', 'きれいじゃないです'], answer: 'きれいです', explain: 'Predicado: きれいです (adjetivo な).' },
          { options: ['親切です', '親切くないです', '親切な'], answer: '親切です', explain: '親切 (shinsetu = amable) es adjetivo な: 親切です.' },
          { options: ['大好きです', '大好きくないです', '大好きじゃないです'], answer: '大好きです', explain: '大好き = encantarle (me encanta). Adjetivo な, predicado です.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta del adjetivo な.',
        type: 'freeText',
        scene: 'Sofia describe su apartamento',
        text: 'わたしの アパートは [[0]] (bonito, predicado) です。[[1]] (tranquilo, modificador) ところです。でも [[2]] (no es conveniente, predicado)。となりに [[3]] (famoso, modificador) レストランがあります。にわに [[4]] (bonitas, modificador) はながあります。',
        blanks: [
          { answer: 'きれいです', explain: 'きれい (adjetivo な) → predicado: きれいです.' },
          { answer: '静かな', explain: '静か + な → modificador: 静かな ところ.' },
          { answer: 'べんりじゃないです', accepted: ['べんりではないです', 'べんりではありません', 'べんりじゃありません'], explain: 'べんり (adjetivo な) → predicado negativo.' },
          { answer: '有名な', explain: '有名 + な → modificador: 有名な レストラン.' },
          { answer: 'きれいな', explain: 'きれい + な → modificador: きれいな はな.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción adjetivos な',
        tag: 'Producción',
        intro: 'Escribe frases completas con adjetivos な.',
        type: 'write',
        items: [
          {
            scene: 'Tu ciudad favorita',
            prompt: 'Escribe: Tokio es una ciudad famosa y bonita. → とうきょうは ___ まちです。',
            answer: 'とうきょうは 有名で きれいな まちです。',
            accepted: ['とうきょうは 有名できれいな まちです', 'とうきょうは きれいで 有名な まちです', 'とうきょうは有名な まちです'],
            explain: '有名 + で + きれいな まち — unir dos adjetivos な con で.',
          },
          {
            scene: 'Gustos personales',
            prompt: 'Escribe: Me gusta el japonés. → にほんごが ___。',
            answer: 'にほんごが 好きです。',
            accepted: ['にほんごが 好きです', 'にほんごが好きです'],
            explain: '好き es adjetivo な. Objeto + が + 好きです.',
          },
          {
            scene: 'Cómo estás',
            prompt: 'Escribe: Estoy bien/con energía. → わたしは ___。',
            answer: 'わたしは 元気です。',
            accepted: ['わたしは 元気です', '元気です', 'はい 元気です'],
            explain: '元気 (genki = con energía/bien) → predicado: 元気です.',
          },
          {
            scene: 'Una descripción negativa',
            prompt: 'Escribe: Ayer no estaba tranquilo el parque. → きのう こうえんは ___。',
            answer: 'きのう こうえんは 静かじゃなかったです。',
            accepted: ['きのう こうえんは 静かじゃなかったです', 'こうえんは 静かじゃなかったです'],
            explain: '静か → pasado negativo: 静かじゃなかったです.',
          },
        ],
      },
    ],
  },
}

export default topic
