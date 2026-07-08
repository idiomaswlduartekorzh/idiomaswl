import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'shieki-saseru-b1',
  order: '03',
  color: '#dc2626',
  category: 'Causativo',
  level: 'B1',
  title: '〜させる — La forma causativa en japonés B1 (Hacer que alguien haga algo)',
  shortTitle: '〜させる (Causativo)',
  metaTitle: '〜させる Causativo en japonés B1 — Hacer que alguien haga algo',
  description:
    'La forma causativa 〜させる expresa que alguien hace que otra persona realice una acción, ya sea por mandato o por permiso. Los verbos del grupo 1 usan 〜あせる, los del grupo 2 〜させる, y los irregulares tienen formas propias. Es esencial para hablar de relaciones jerárquicas, permiso y situaciones de control en japonés.',
  lead: 'Aprende a conjugar y usar la forma causativa させる para expresar "hacer que alguien haga" o "dejar que alguien haga" en japonés B1.',
  outcomes: [
    'Conjugar verbos de los tres grupos a la forma causativa',
    'Distinguir el uso de causativo con mandato vs con permiso',
    'Usar 〜させてください para pedir permiso educadamente',
    'Construir oraciones causativas con las partículas correctas (を/に)',
  ],

  guide: {
    goal: 'Hacer que otra persona realice una acción (causativo de mandato) o permitir que la realice (causativo de permiso).',
    model: '先生は学生に本を読ませた。(Sensei wa gakusei ni hon wo yomase ta.) — El profesor hizo que el estudiante leyera el libro.',
    formula: 'Sujeto は + persona に/を + acción [causativa] + させる',
    decisions: [
      'Grupo 1 (う verbos): quitar う, añadir あせる → 書く → 書かせる, 読む → 読ませる, 飲む → 飲ませる',
      'Grupo 2 (る verbos): quitar る, añadir させる → 食べる → 食べさせる, 見る → 見させる',
      'Irregulares: する → させる, くる → こさせる',
      'Partícula de la persona: に (intransitivos y más frecuente) / を (transitivos, implica más coerción)',
      'Permiso: causativo + てあげる/てもらう → 〜させてあげた (lo dejé hacer), 〜させてもらえますか (¿me permite hacer?)',
      '〜させてください = petición de permiso: "por favor, déjeme / permítame hacer X"',
    ],
    table: [
      ['Grupo', 'Regla', 'Ejemplo'],
      ['Grupo 1 (う)', 'う → あせる', '書く→書かせる, 飲む→飲ませる, 話す→話させる'],
      ['Grupo 2 (る)', 'る → させる', '食べる→食べさせる, 起きる→起きさせる'],
      ['Irregular', 'Formas propias', 'する→させる, くる→こさせる'],
    ],
    mistakes: [
      '「食べさせる」のに「を」を使わず「食べを」❌ — la partícula de lo que se come sigue siendo を: 子供にご飯を食べさせた ✓.',
      '「〜をさせる」vs「〜にさせる」: 自動詞 (intransitivos: 泣く、笑う) usan に: 子供を泣かせた ✓. Con transitivos se pueden usar ambas.',
      '「させてください」no es agresivo — es la forma estándar y educada de pedir permiso en japonés.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma el causativo en japonés?',
      paragraphs: [
        'El causativo (使役形 shieki-kei) transforma un verbo para indicar que alguien causa o permite que otra persona realice esa acción. La clave está en reconocer el grupo del verbo: grupo 1 (う-verbos terminados en consonante+う), grupo 2 (る-verbos), e irregulares.',
        'Grupo 1: se reemplaza la vocal del final por la fila あ + せる. Ejemplos: 書く (kaku) → 書かせる (kakaseru), 飲む (nomu) → 飲ませる (nomaseru), 話す (hanasu) → 話させる (hanasaseru), 待つ (matsu) → 待たせる (mataseru). Grupo 2: quita る y añade させる: 食べる → 食べさせる, 見る → 見させる. Irregulares: する → させる, くる → こさせる.',
      ],
    },
    {
      heading: 'Causativo de mandato vs causativo de permiso',
      paragraphs: [
        'El mismo させる puede expresar mandato (obligar) o permiso (dejar hacer), según el contexto. Con personas en posición de autoridad o animales, suele ser mandato: 母は私に野菜を食べさせた (mamá me hizo comer verduras). Con amigos o en contextos de afecto, suele ser permiso: 子供に好きな音楽を聴かせた (dejé al niño escuchar la música que quería).',
        'Para dejar claro el permiso, se añaden auxiliares: 〜させてあげた (lo dejé hacer — yo hice el favor), 〜させてもらった (me dejaron hacer — yo recibí el permiso). Estas formas son muy frecuentes en japonés cotidiano.',
      ],
    },
    {
      heading: '〜させてください: pidiendo permiso',
      paragraphs: [
        'Una de las expresiones más útiles con el causativo es 〜させてください, que se usa para pedir permiso de forma educada. Es literalmente "por favor, haga que yo haga X", pero se traduce como "permítame hacer X" o "déjeme hacer X".',
        '例: ちょっと考えさせてください (déjeme pensarlo un momento), 私にやらせてください (déjeme hacerlo a mí), 一人で行かせてください (déjeme ir solo/a). Esta expresión es esencial en contextos laborales y formales.',
      ],
    },
    {
      heading: 'Partículas correctas en oraciones causativas',
      paragraphs: [
        'Las partículas en el causativo son un punto de confusión. La persona que realiza la acción lleva に (más neutral) o を (más enfático, más coercitivo). 先生は学生に発表させた (el profesor hizo que el estudiante presentara — con に). 親は子供を泣かせた (los padres hicieron llorar al niño — con を, con connotación de causa directa).',
        'Regla práctica: con verbos intransitivos (llorar, reír, cantar) la persona causa más frecuentemente marca を. Con verbos transitivos (leer, comer, escribir), la persona marca に y el objeto del verbo mantiene を.',
      ],
    },
    {
      heading: 'Errores comunes y cómo evitarlos',
      paragraphs: [
        'El error más común es la conjugación del grupo 1: 書く → 書けさせる ❌, debe ser 書かせる ✓. La vocal siempre va a la fila あ, no a え.',
        'Otro error es confundir させる (causativo) con される (pasiva). Son opuestos: させる = yo hago que otro haga; される = yo soy el que recibe la acción de otro. La combinación させられる es el causativo-pasivo (me hacen hacer).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Forma causativa con los tres grupos verbales. Enfatizar la diferencia entre mandato y permiso.',
    graphicPrompt: 'Flecha desde figura de autoridad hacia figura subordinada, con verbo causativo.',
    scene: [
      ['母は私に野菜を食べさせた。(Haha wa watashi ni yasai wo tabesaseta.)', 'Mamá me hizo comer verduras.'],
      ['先生は学生に作文を書かせた。(Sensei wa gakusei ni sakubun wo kakaseta.)', 'El profesor hizo que los estudiantes escribieran una redacción.'],
      ['子供に好きな映画を見させた。(Kodomo ni suki na eiga wo misaseta.)', 'Dejé al niño ver la película que quería.'],
      ['ちょっと考えさせてください。(Chotto kangaesasete kudasai.)', 'Déjeme pensarlo un momento.'],
      ['部長は社員を残業させた。(Buchō wa shain wo zangyō saseta.)', 'El jefe hizo que los empleados se quedaran a trabajar horas extra.'],
      ['彼女を泣かせてしまった。(Kanojo wo nakasete shimatta.)', 'Hice llorar a mi novia (sin querer).'],
      ['私にやらせてください。(Watashi ni yarasete kudasai.)', 'Déjeme hacerlo a mí.'],
      ['子供たちを自由に遊ばせた。(Kodomotachi wo jiyū ni asobaseta.)', 'Dejé a los niños jugar libremente.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    practiceVerbs: ['書く', '読む', '食べる', '飲む', '起きる', '話す', '待つ', 'する'],
    reviewFocus: ['conjugación causativa grupo 1', 'causativo grupo 2', 'させてください', 'に vs を con causativo'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma causativa correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma causativa correcta del verbo indicado.',
        type: 'choice',
        items: [
          {
            scene: 'Causativo de 書く (grupo 1)',
            lines: [['', '先生は学生に漢字を___。(El profesor hizo que los estudiantes escribieran kanji.)']],
            options: ['書かせた', '書けさせた', '書かれた', '書くさせた'],
            answer: '書かせた',
            explain: '書く (grupo 1): く → かせる. 書かせた (pasado). La fila cambia a あ-dan.',
          },
          {
            scene: 'Causativo de 食べる (grupo 2)',
            lines: [['', '母は子供に全部___。(Mamá hizo que el niño se lo comiera todo.)']],
            options: ['食べさせた', '食べらせた', '食べされた', '食べかせた'],
            answer: '食べさせた',
            explain: '食べる (grupo 2): quitar る → 食べ + させた.',
          },
          {
            scene: 'Causativo de する (irregular)',
            lines: [['', '部長は社員に残業を___。(El jefe hizo que los empleados hicieran horas extra.)']],
            options: ['させた', 'しさせた', 'された', 'すさせた'],
            answer: 'させた',
            explain: 'する (irregular): causativo = させる → させた.',
          },
          {
            scene: 'Petición de permiso',
            lines: [['', 'すみません、少し休ませて___。(Disculpe, déjeme descansar un poco.)']],
            options: ['ください', 'あげます', 'もらいます', 'います'],
            answer: 'ください',
            explain: '〜させてください = petición educada de permiso: "por favor, déjeme hacer X".',
          },
          {
            scene: 'Causativo de 飲む (grupo 1)',
            lines: [['', '医者は患者に薬を___。(El médico hizo que el paciente tomara la medicina.)']],
            options: ['飲ませた', '飲めさせた', '飲まれた', '飲むさせた'],
            answer: '飲ませた',
            explain: '飲む (grupo 1): む → ませる. 飲ませた.',
          },
          {
            scene: 'Causativo de 起きる (grupo 2)',
            lines: [['', '父は私を毎朝6時に___。(Papá me hacía levantarme a las 6 todos los días.)']],
            options: ['起きさせた', '起かせた', '起きられた', '起きさせます'],
            answer: '起きさせた',
            explain: '起きる (grupo 2): quitar る → 起き + させた.',
          },
          {
            scene: 'Causativo con permiso',
            lines: [['', '先生は学生に好きな本を___。(El profesor dejó que los estudiantes leyeran el libro que querían.)']],
            options: ['読ませた', '読かせた', '読まれた', '読めさせた'],
            answer: '読ませた',
            explain: '読む (grupo 1): む → ませる. Con contexto de permiso, 読ませた = "dejó leer".',
          },
          {
            scene: 'Causativo de 来る (irregular)',
            lines: [['', '彼女は彼に早く___。(Ella hizo que él viniera pronto.)']],
            options: ['こさせた', 'くさせた', 'きさせた', 'こられた'],
            answer: 'こさせた',
            explain: 'くる (irregular): causativo = こさせる → こさせた.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Causativo en contexto',
        tag: '2 espacios',
        intro: 'Completa las oraciones causativas con la forma correcta.',
        type: 'dual',
        items: [
          {
            scene: 'En la escuela',
            lines: [['', '先生は生徒に宿題を[[0]]、毎日日記も[[1]]。']],
            blanks: [
              { options: ['やらせた', 'やられた', 'やらせます', 'やるさせた'], answer: 'やらせた', explain: 'やる (grupo 1: る→らせる): やらせた.' },
              { options: ['書かせた', '書けさせた', '書かれた', '書くさせた'], answer: '書かせた', explain: '書く (grupo 1): かせた.' },
            ],
          },
          {
            scene: 'Pidiendo permiso en el trabajo',
            lines: [['', '田中：すみません、今日は少し早く帰らせて[[0]]。明日早く[[1]]ので。']],
            blanks: [
              { options: ['もらえますか', 'あげますか', 'くれますか', 'いますか'], answer: 'もらえますか', explain: '〜させてもらえますか = ¿me permite hacer X? Petición educada de permiso al jefe.' },
              { options: ['来させます', '来ます', '来てあります', '来させてあります'], answer: '来させます', explain: '来る causativo: こさせます. Aquí: 早く来させます = haré que llegue temprano (yo mismo, causativo reflexivo).' },
            ],
          },
          {
            scene: 'Familia y educación',
            lines: [['', '親は子供に毎日ピアノを[[0]]、英語も[[1]]。']],
            blanks: [
              { options: ['練習させた', '練習されました', '練習させます', '練習するさせた'], answer: '練習させた', explain: '練習する (する型): させた.' },
              { options: ['勉強させた', '勉強されました', '勉強するさせた', '勉強させます'], answer: '勉強させた', explain: '勉強する (する型): させた.' },
            ],
          },
          {
            scene: 'Jefe con empleado',
            lines: [['', '部長は私に難しいプレゼンを[[0]]、その後で取引先に謝罪に[[1]]。']],
            blanks: [
              { options: ['やらせた', 'やられた', 'やらせました', 'やるさせた'], answer: 'やらせた', explain: 'やる causativo: やらせた.' },
              { options: ['行かせた', '行けさせた', '行かれた', '行かせます'], answer: '行かせた', explain: '行く (grupo 1): く→かせる. 行かせた.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Madre e hijo',
        tag: 'Texto guiado',
        intro: 'Completa el texto sobre lo que una madre hace hacer a su hijo.',
        type: 'guidedText',
        scene: 'Una madre japonesa describe la educación de su hijo.',
        text: '私の子供は7歳です。毎朝、自分でご飯を[[0]]。野菜も全部[[1]]。学校から帰ったら、まず宿題を[[2]]、それからピアノを[[3]]。テレビはあまり[[4]]けど、本はたくさん[[5]]。週末は公園で友達と自由に[[6]]。厳しいと思われるかもしれませんが、子供のために必要だと思っています。',
        blanks: [
          { options: ['食べさせます', '食べさせました', '食べられます', '食べくださいます'], answer: '食べさせます', explain: '食べる (grupo 2): 食べさせます (presente habitual).' },
          { options: ['食べさせます', '食べさせました', '食べられます', '食べくださいます'], answer: '食べさせます', explain: 'Continúa el presente habitual: 食べさせます.' },
          { options: ['やらせます', 'やられます', 'やらせました', 'やるさせます'], answer: 'やらせます', explain: 'やる causativo presente: やらせます.' },
          { options: ['練習させます', '練習されます', '練習させました', '練習するさせます'], answer: '練習させます', explain: 'する型 causativo presente: 練習させます.' },
          { options: ['見させません', '見せません', '見られません', '見くださいません'], answer: '見させません', explain: '見る (grupo 2) causativo negativo: 見させません (no deja ver).' },
          { options: ['読ませます', '読めます', '読まれます', '読むさせます'], answer: '読ませます', explain: '読む (grupo 1): む→ませる. 読ませます.' },
          { options: ['遊ばせます', '遊べさせます', '遊ばれます', '遊ぶさせます'], answer: '遊ばせます', explain: '遊ぶ (grupo 1): ぶ→ばせる. 遊ばせます.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Causativos sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma causativa correcta del verbo entre paréntesis.',
        type: 'freeText',
        scene: 'Completa con la forma causativa adecuada.',
        text: '先生は学生に毎週レポートを[[0]] (書く)。社長は新入社員を早く[[1]] (帰る)。子供が泣いているので、好きな音楽を[[2]] (聞く)。田中さんは後輩に荷物を[[3]] (運ぶ)。部長、少し早退[[4]] (する)いただけますか。',
        blanks: [
          { answer: '書かせた', accepted: ['書かせた', '書かせます', '書かせました'], explain: '書く (grupo 1): く → かせる → 書かせた/書かせます.' },
          { answer: '帰らせた', accepted: ['帰らせた', '帰らせました', '帰らせます'], explain: '帰る (grupo 1): る→らせる. 帰らせた.' },
          { answer: '聞かせた', accepted: ['聞かせた', '聞かせました', '聞かせてあげた'], explain: '聞く (grupo 1): く→かせる. 聞かせた. Con permiso: 聞かせてあげた.' },
          { answer: '運ばせた', accepted: ['運ばせた', '運ばせました', '運ばせます'], explain: '運ぶ (grupo 1): ぶ→ばせる. 運ばせた.' },
          { answer: 'させて', accepted: ['させて', 'させていただけますか'], explain: 'する causativo: させる → 早退させていただけますか = ¿me permite salir antes?' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción causativa',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando la forma causativa.',
        type: 'write',
        items: [
          {
            scene: 'Petición de permiso',
            prompt: 'Escribe una petición de permiso usando 〜させてください en un contexto laboral.',
            answer: '少し考えさせてください。',
            accepted: ['させてください', 'させていただけますか'],
            explain: 'Ejemplo: 私にプレゼンをやらせてください。/ 来週まで待たせてください。',
          },
          {
            scene: 'Mandato causativo',
            prompt: 'Describe algo que un jefe o profesor hizo hacer a alguien.',
            answer: '先生は学生に毎日漢字を50個書かせた。',
            accepted: ['させた', 'させました'],
            explain: 'Ejemplo: 部長は社員に報告書を書かせた。/ 先生は学生を立たせた。',
          },
          {
            scene: 'Permiso causativo',
            prompt: 'Describe una situación donde dejaste hacer algo a alguien (permiso).',
            answer: '子供に好きな服を選ばせた。',
            accepted: ['させた', 'させてあげた'],
            explain: 'Ejemplo: 友達に車を運転させた。/ 弟に私のゲームをやらせてあげた。',
          },
          {
            scene: 'Causativo negativo',
            prompt: 'Escribe algo que no dejaste hacer a alguien.',
            answer: '子供にジュースを飲ませなかった。',
            accepted: ['させなかった', 'させませんでした'],
            explain: 'Ejemplo: 弟に私の部屋に入らせなかった。/ 学生に辞書を使わせなかった。',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: El profesor estricto',
        tag: 'Producción libre',
        intro: 'Imagina que eres un profesor estricto. Escribe 3 oraciones sobre lo que haces hacer a tus estudiantes.',
        type: 'write',
        items: [
          {
            scene: 'Tarea académica',
            prompt: 'Escribe qué haces que tus estudiantes escriban o lean (causativo de mandato).',
            answer: '学生に毎日日本語の日記を書かせる。',
            accepted: ['させる', 'させます', 'させた', 'させました'],
            explain: 'Usa causativo grupo 1: 書く→書かせる, 読む→読ませる, etc.',
          },
          {
            scene: 'Clase de pronunciación',
            prompt: 'Escribe qué haces que los estudiantes practiquen en voz alta.',
            answer: '学生に毎回大きい声で発音を練習させる。',
            accepted: ['させる', 'させます', 'させた'],
            explain: 'する型: 練習させる, 発表させる, 説明させる.',
          },
          {
            scene: 'Permiso especial',
            prompt: 'Escribe algo que permites a tus estudiantes hacer (causativo de permiso).',
            answer: 'テストの前に教科書を少し見させる。',
            accepted: ['させる', 'させます', 'させてあげる'],
            explain: 'Permiso: 〜させてあげる o simplemente 〜させる con contexto favorable.',
          },
        ],
      },
    ],
  },
}

export default topic
