import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'i-keiyoshi',
  order: '09',
  color: '#dc2626',
  category: 'Adjetivos',
  level: 'A1',
  title: 'Adjetivos い en japonés A1 — i-keiyoshi: conjugación completa',
  shortTitle: 'Adjetivos い',
  metaTitle: 'Adjetivos i keiyoshi japonés A1 — presente pasado negativo conjugación',
  description:
    'Los adjetivos い (i-keiyoshi) son adjetivos que terminan en い en su forma base y se conjugan directamente sin cópula para expresar tiempo y negación. Son uno de los dos tipos de adjetivos del japonés (junto con los adjetivos な). Se conjugan de forma sistemática modificando la terminación い, con la excepción irregular de いい/よい (bueno).',
  lead: 'Adjetivos い: たのしい (divertido), おいしい (delicioso), むずかしい (difícil). Presente: たのしいです. Negativo: たのしくないです. Pasado: たのしかったです. Excepción: いい (bueno) → よかったです (no いかったです).',
  outcomes: [
    'Conjuga adjetivos い en presente afirmativo y negativo',
    'Forma el pasado afirmativo y negativo de adjetivos い',
    'Reconoce y maneja la irregularidad de いい/よい en sus formas no-presentes',
  ],

  guide: {
    goal: 'Conjugar adjetivos い en las cuatro formas básicas: presente ±, pasado ±.',
    model: 'たのしいです (es divertido) | たのしくないです (no es divertido) | たのしかったです (era/fue divertido) | たのしくなかったです (no era/fue divertido)',
    formula: 'Raíz (quitar い final) + くないです / かったです / くなかったです',
    decisions: [
      'Presente afirmativo: adj-い + です → たのしいです',
      'Presente negativo: raíz + くないです → たのしくないです (quitar い, añadir くない)',
      'Pasado afirmativo: raíz + かったです → たのしかったです (quitar い, añadir かった)',
      'Pasado negativo: raíz + くなかったです → たのしくなかったです',
      'EXCEPCIÓN: いい → negativo よくないです (NO いくない), pasado よかったです (NO いかった)',
      'Modificar sustantivo: adj-い + sustantivo sin です: おいしい りょうり (comida deliciosa)',
    ],
    table: [
      ['Forma', 'たのしい (divertido)', 'いい (bueno — irregular)'],
      ['Presente +', 'たのしいです', 'いいです'],
      ['Presente −', 'たのしくないです', 'よくないです'],
      ['Pasado +', 'たのしかったです', 'よかったです'],
      ['Pasado −', 'たのしくなかったです', 'よくなかったです'],
    ],
    mistakes: [
      '"いかったです" ✗ — いい es irregular: pasado = よかったです.',
      '"たのしいくないです" ✗ — se quita la い antes de añadir く: たのしく + ないです.',
      'Cuando el adjetivo modifica un sustantivo, NO usa です: おいしいです りょうり ✗ → おいしい りょうり ✓.',
    ],
  },
  seo: [
    {
      heading: 'Los adjetivos い: conjugación sistemática en japonés A1',
      paragraphs: [
        'Los adjetivos い (i-keiyoshi) tienen una característica especial: se conjugan directamente, como si fueran verbos, sin necesitar una cópula adicional. Para negar, formas el pasado o niegas el pasado, modificas solo la terminación. La raíz es el adjetivo sin la い final: たのしい → raíz たのし; おいしい → raíz おいし.',
        'El sistema es muy regular: negativo = raíz + くない, pasado = raíz + かった, pasado negativo = raíz + くなかった. En estilo formal añades です al final de todas las formas. La única excepción es いい (bueno/buena), que en todas las formas no-presentes cambia a よ: よくない, よかった, よくなかった.',
      ],
    },
    {
      heading: 'Adjetivos い frecuentes en japonés A1',
      paragraphs: [
        'Los adjetivos い más usados en A1 incluyen: 大きい (ōkii = grande), 小さい (chiisai = pequeño), 高い (takai = caro/alto), 安い (yasui = barato), おいしい (oishii = delicioso), まずい (mazui = malo de sabor), たのしい (tanoshii = divertido), むずかしい (muzukashii = difícil), やさしい (yasashii = fácil/amable), あつい (atsui = caliente/caluroso), さむい (samui = frío).',
        'Para el hispanohablante, la confusión más frecuente es usar いい con las formas irregulares. Recuerda: いい solo funciona en presente afirmativo. En todas las demás formas, debes cambiar a よ: "La fiesta fue buena" = パーティーは よかったです (no いかったです). Este cambio a よ es idéntico a un cambio de raíz similar al de verbos irregulares españoles.',
      ],
    },
  ],
  visual: {
    mode: 'adjective-conjugation',
    teacherLens: 'El estudiante aprende las cuatro formas de los adjetivos い con la irregularidad de いい bien marcada.',
    graphicPrompt: 'Tabla 4x2: presente±/pasado± × afirmativo/negativo con たのしい y いい. Destacar la irregularidad de いい en rojo.',
    scene: [
      ['Raíz = adj − い final', 'たのしい → たのし'],
      ['Negativo: raíz + くない', 'たのしくないです'],
      ['Pasado: raíz + かった', 'たのしかったです'],
    ],
    learnerModes: ['visual: tabla conjugación', 'analítico: regla raíz + terminación', 'oral: describe comida y actividades'],
    reviewFocus: ['4 formas de adjetivos い', 'irregularidad de いい→よ', 'adj + sustantivo sin です', 'adjetivos frecuentes A1'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Forma correcta del adjetivo',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del adjetivo い según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'La comida es deliciosa',
            lines: [['Ana', 'このりょうりは ___。(Esta comida es deliciosa.)']],
            options: ['おいしいです', 'おいしくないです', 'おいしかったです', 'おいしくなかったです'],
            answer: 'おいしいです',
            explain: 'Presente afirmativo: おいしい + です = おいしいです.',
          },
          {
            scene: 'El examen no fue difícil',
            lines: [['Carlos', 'テストは ___。(El examen no fue difícil.)']],
            options: ['むずかしくなかったです', 'むずかしくないです', 'むずかしかったです', 'むずかしいです'],
            answer: 'むずかしくなかったです',
            explain: 'Pasado negativo: raíz むずかし + くなかったです.',
          },
          {
            scene: 'La fiesta fue divertida',
            lines: [['Sofia', 'パーティーは ___。(La fiesta fue divertida.)']],
            options: ['たのしかったです', 'たのしいです', 'たのしくなかったです', 'たのしくないです'],
            answer: 'たのしかったです',
            explain: 'Pasado afirmativo: raíz たのし + かったです.',
          },
          {
            scene: 'No es caro (EXCEPCIÓN)',
            lines: [['Marco', 'このかばんは ___。(Esta mochila no es cara/buena.)']],
            options: ['よくないです', 'いくないです', 'いいくないです', 'よかったです'],
            answer: 'よくないです',
            explain: 'いい es irregular: presente negativo = よくないです (NO いくない).',
          },
          {
            scene: 'El café fue bueno',
            lines: [['Lina', 'コーヒーは ___。(El café estuvo bueno.)']],
            options: ['よかったです', 'いかったです', 'いいかったです', 'よくないです'],
            answer: 'よかったです',
            explain: 'いい es irregular: pasado = よかったです (NO いかった).',
          },
          {
            scene: 'Está frío',
            lines: [['Hugo', 'きょうは ___。(Hoy hace frío.)']],
            options: ['さむいです', 'さむかったです', 'さむくないです', 'さむくなかったです'],
            answer: 'さむいです',
            explain: 'Presente afirmativo: さむい + です.',
          },
          {
            scene: 'Ayer no hizo calor',
            lines: [['Nora', 'きのうは ___。(Ayer no hizo calor.)']],
            options: ['あつくなかったです', 'あつくないです', 'あつかったです', 'あついです'],
            answer: 'あつくなかったです',
            explain: 'Pasado negativo: raíz あつ + くなかったです.',
          },
          {
            scene: 'Es barato',
            lines: [['Carlos', 'このほんは ___。(Este libro es barato.)']],
            options: ['やすいです', 'やすかったです', 'やすくないです', 'やすくなかったです'],
            answer: 'やすいです',
            explain: 'Presente afirmativo: やすい + です.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos formas de adjetivos い',
        tag: '2 adjetivos',
        intro: 'Completa las dos formas de adjetivos い en el diálogo.',
        type: 'dual',
        items: [
          {
            scene: 'Sobre la clase de japonés',
            lines: [['Carlos', 'にほんごは [[0]] けど、[[1]]。(El japonés es difícil, pero es interesante.)']],
            blanks: [
              { options: ['むずかしいです', 'むずかしくないです', 'むずかしかったです'], answer: 'むずかしいです', explain: 'Presente afirmativo: むずかしい + です.' },
              { options: ['おもしろいです', 'おもしろくないです', 'おもしろかったです'], answer: 'おもしろいです', explain: 'Presente afirmativo: おもしろい + です.' },
            ],
          },
          {
            scene: 'Describiendo ayer',
            lines: [['Sofia', 'きのうは [[0]] けど、きょうは [[1]]。(Ayer fue divertido pero hoy no es divertido.)']],
            blanks: [
              { options: ['たのしかったです', 'たのしいです', 'たのしくなかったです'], answer: 'たのしかったです', explain: 'Pasado afirmativo: たのしかったです.' },
              { options: ['たのしくないです', 'たのしいです', 'たのしくなかったです'], answer: 'たのしくないです', explain: 'Presente negativo: たのしくないです.' },
            ],
          },
          {
            scene: 'Sobre un restaurante',
            lines: [['Ana', 'あのレストランは [[0]]。でも、ちょっと [[1]]。(Ese restaurante es delicioso. Pero es un poco caro.)']],
            blanks: [
              { options: ['おいしいです', 'おいしくないです', 'おいしかったです'], answer: 'おいしいです', explain: 'Presente afirmativo: おいしいです.' },
              { options: ['たかいです', 'たかくないです', 'たかかったです'], answer: 'たかいです', explain: 'Presente afirmativo: たかいです (es caro).' },
            ],
          },
          {
            scene: 'La irregularidad de いい',
            lines: [['Hugo', 'きのうの てんきは [[0]]。でも きょうは [[1]]。(El tiempo ayer fue bueno. Pero hoy no es bueno.)']],
            blanks: [
              { options: ['よかったです', 'いかったです', 'いいかったです'], answer: 'よかったです', explain: 'いい pasado → よかったです (irregular).' },
              { options: ['よくないです', 'いくないです', 'いいくないです'], answer: 'よくないです', explain: 'いい presente negativo → よくないです (irregular).' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado — reseña de restaurante',
        tag: 'Opciones',
        intro: 'Elige la forma correcta del adjetivo い.',
        type: 'guidedText',
        scene: 'Lina escribe sobre un restaurante en Tokio',
        text: 'きのう レストランに いきました。りょうりは [[0]] (deliciosa)。でも、ちょっと [[1]] (cara)。みせは [[2]] (bonita, ≈ buena)。サービスも [[3]] (era bueno — pasado de いい)。また いきたいです。でも、きょうは おかねが [[4]] (no hay mucho — negativo de おおい) です。',
        blanks: [
          { options: ['おいしかったです', 'おいしいです', 'おいしくなかったです'], answer: 'おいしかったです', explain: 'Pasado afirmativo: おいし + かったです.' },
          { options: ['たかかったです', 'たかいです', 'たかくなかったです'], answer: 'たかかったです', explain: 'Pasado afirmativo: たか + かったです.' },
          { options: ['よかったです', 'いかったです', 'よくなかったです'], answer: 'よかったです', explain: 'いい (bueno) → pasado irregular: よかったです.' },
          { options: ['よかったです', 'いいです', 'よくなかったです'], answer: 'よかったです', explain: 'Pasado de いい → よかったです.' },
          { options: ['おおくないです', 'おおいないです', 'おおくないでした'], answer: 'おおくないです', explain: 'おおい (muchos) → negativo: おおくないです.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta del adjetivo い.',
        type: 'freeText',
        scene: 'Carlos describe su semana en japonés',
        text: 'こんしゅうは [[0]] (divertida, pasado). にほんごのテストは [[1]] (difícil, presente). でも せんせいは [[2]] (amable/fácil, presente). きのうのごはんは [[3]] (delicioso, pasado). コーヒーは [[4]] (no era bueno, pasado de いい).',
        blanks: [
          { answer: 'たのしかったです', explain: 'たのしい → pasado afirmativo: たのし + かったです.' },
          { answer: 'むずかしいです', explain: 'むずかしい → presente afirmativo: そのまま + です.' },
          { answer: 'やさしいです', explain: 'やさしい (amable/fácil) → presente afirmativo.' },
          { answer: 'おいしかったです', explain: 'おいしい → pasado afirmativo: おいし + かったです.' },
          { answer: 'よくなかったです', explain: 'いい → pasado negativo irregular: よくなかったです.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe frases completas con adjetivos い.',
        type: 'write',
        items: [
          {
            scene: 'La película fue interesante',
            prompt: 'Escribe: La película fue interesante. → えいがは ___。',
            answer: 'えいがは おもしろかったです。',
            accepted: ['えいがは おもしろかったです', 'えいがは おもしろかったです。'],
            explain: 'おもしろい → pasado afirmativo: おもしろ + かったです.',
          },
          {
            scene: 'El japonés no es fácil',
            prompt: 'Escribe: El japonés no es fácil. → にほんごは ___。',
            answer: 'にほんごは やさしくないです。',
            accepted: ['にほんごは やさしくないです', 'にほんごは やさしくありません'],
            explain: 'やさしい → presente negativo: やさし + くないです.',
          },
          {
            scene: 'La irregularidad de いい',
            prompt: 'Escribe: El examen pasado estuvo bien. → まえのテストは ___。',
            answer: 'まえのテストは よかったです。',
            accepted: ['まえのテストは よかったです', 'テストは よかったです'],
            explain: 'いい → pasado irregular: よかったです (nunca いかった).',
          },
          {
            scene: 'Comida cara y deliciosa',
            prompt: 'Escribe: Esta comida es cara pero deliciosa. → このりょうりは ___ けど ___。',
            answer: 'このりょうりは たかいです けど おいしいです。',
            accepted: ['このりょうりは たかいです けど おいしいです', 'このりょうりはたかいですけどおいしいです'],
            explain: 'たかい + です (caro) + けど (pero) + おいしい + です (delicioso).',
          },
        ],
      },
    ],
  },
}

export default topic
