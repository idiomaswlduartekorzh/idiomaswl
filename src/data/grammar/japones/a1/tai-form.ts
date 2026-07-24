import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'tai-form',
  order: '15',
  color: '#dc2626',
  category: 'Verbos',
  level: 'A1',
  title: 'Forma たい (tai) en japonés A1 — Querer hacer',
  shortTitle: '〜たいです',
  metaTitle: 'Forma tai japonés A1 — querer hacer tabetai ikitai',
  description:
    'La forma 〜たい (tai) expresa el deseo de hacer algo en primera persona. Se forma a partir de la raíz del verbo en forma ます: 食べ(たべ)+たいです = 食べたいです (tabetai desu = quiero comer). La singularidad clave del japonés: たい es un adjetivo い — se conjuga como los i-keiyoshi, no como verbo. Negativo: 〜たくないです (takunai desu).',
  lead: '〜たいです = quiero hacer [algo]. 食べたいです (tabetai desu) = quiero comer. 行きたいです (ikitai desu) = quiero ir. Negativo: 食べたくないです (tabetakunai desu) = no quiero comer. たい se conjuga como adjetivo い, no como verbo.',
  outcomes: [
    'Forma 〜たいです con verbos en forma ます para expresar deseos',
    'Conjuga la negación 〜たくないです correctamente',
    'Entiende que たい es un adjetivo い y se conjuga como tal',
  ],

  guide: {
    goal: 'Usar 〜たいです y 〜たくないです para expresar lo que quieres o no quieres hacer.',
    model: '日本に 行きたいです。(Nihon ni ikitai desu = Quiero ir a Japón.) / 今日は 勉強したくないです。(Kyō wa benkyō shitakunai desu = Hoy no quiero estudiar.)',
    formula: '[verbo ます形 raíz] + たいです | [raíz] + たくないです (negativo)',
    decisions: [
      'たいです = quiero [hacer]: raíz ます + たいです → 食べ+たいです = 食べたいです',
      'たくないです = no quiero: raíz ます + たくないです → 食べ+たくないです',
      'たい conjugado como adj-い: たい → たくない (neg), たかった (pasado), たくなかった (pas.neg.)',
      'Para 3a persona usa 〜たがっています: かれは 行きたがっています (él parece querer ir)',
      'Objeto: たい usa を normalmente, a veces が: コーヒーを飲みたいです / コーヒーが飲みたいです',
      'Pregunta: 〜たいですか？= ¿quieres...? Respuesta: はい、〜たいです / いいえ、〜たくないです',
    ],
    table: [
      ['Verbo (辞書形)', 'ます形 raíz', '〜たいです'],
      ['食べる (comer)', '食べ (tabe)', '食べたいです (tabetai desu)'],
      ['行く (ir)', '行き (iki)', '行きたいです (ikitai desu)'],
      ['飲む (beber)', '飲み (nomi)', '飲みたいです (nomitai desu)'],
      ['見る (ver)', '見 (mi)', '見たいです (mitai desu)'],
      ['学ぶ (aprender)', '学び (manabi)', '学びたいです (manabitai desu)'],
      ['する (hacer)', 'し (shi)', 'したいです (shitai desu)'],
      ['くる (venir)', 'き (ki)', 'きたいです (kitai desu)'],
    ],
    mistakes: [
      '"食べたいではありません" ✗ — la negación de たい es 〜たくないです, como adj-い. NO ではありません.',
      '"彼は 行きたいです" — para hablar de los deseos de otros usa 〜たがっています o と言っています.',
      'たい expresa deseo del hablante — no se usa fácilmente para hablar de los deseos de otras personas.',
    ],
  },
  seo: [
    {
      heading: '〜たい: expresar deseos en japonés A1',
      paragraphs: [
        'La forma 〜たい (tai) es esencial desde el nivel A1 porque permite expresar deseos personales de forma natural. La formación es muy predecible: toma la raíz ます del verbo (lo que queda cuando quitas ます) y añade たいです. 食べます → 食べ + たいです = 食べたいです (quiero comer). いきます → いき + たいです = いきたいです (quiero ir).',
        'La singularidad importante es que たい funciona gramaticalmente como un adjetivo い, no como un verbo. Esto significa que su negación no es ません sino たくないです (igual que adj-い: おおきい → おおきくない). Y su forma pasada es たかったです (quería hacer).',
      ],
    },
    {
      heading: 'たい en primera persona vs tercera persona',
      paragraphs: [
        'En japonés existe una distinción importante: 〜たい se usa libremente para hablar de los propios deseos (primera persona), pero para terceras personas se prefiere 〜たがっています (parece que quiere) o citar sus palabras directamente. Decir "彼は 食べたいです" suena como si leyeras la mente de otra persona, algo que el japonés evita.',
        'En A1, usa たい para hablar de ti mismo: 日本に 行きたいです (quiero ir a Japón), コーヒーを 飲みたいです (quiero beber café). Para preguntar al interlocutor también es natural: 何を 食べたいですか？(¿qué quieres comer?). Es para hablar sobre lo que TÚ quieres hacer.',
      ],
    },
  ],
  visual: {
    mode: 'desire-form',
    teacherLens: 'El estudiante aprende a formar 〜たいです desde la raíz ます y entender que たい se conjuga como adjetivo い.',
    graphicPrompt: 'Tabla verbo→raíz→たいです. Flecha de conjugación: たい→たくない (como adj-い). Escenas de deseos.',
    scene: [
      ['ます形 raíz + たいです', '食べ + たい = 食べたい'],
      ['Negativo = たくないです', '食べたくないです'],
      ['たい = adj-い', 'たかった(pasado) / たくない(neg)'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['raíz ます + たいです', '〜たくないです negativo', 'たい como adjetivo い', 'verbos irregulares する/くる'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Forma たい',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de 〜たいです.',
        type: 'choice',
        items: [
          {
            scene: 'Quiero comer sushi',
            lines: [['Carlos', 'すしを ___ です。(Quiero comer sushi.)']],
            options: ['食べたい', 'たべます', '食べません', '食べた'],
            answer: '食べたい',
            explain: '食べます → raíz 食べ + たい = 食べたいです. Quiero comer → 食べたいです.',
          },
          {
            scene: 'Quiero ir a Japón',
            lines: [['Ana', 'にほんに ___ です。(Quiero ir a Japón.)']],
            options: ['行きたい', 'いきます', 'いきません', 'いった'],
            answer: '行きたい',
            explain: '行きます → raíz 行き + たい = 行きたいです. Quiero ir → 行きたいです.',
          },
          {
            scene: 'No quiero estudiar hoy',
            lines: [['Nico', 'きょうは べんきょう ___ です。(Hoy no quiero estudiar.)']],
            options: ['したくない', 'したい', 'しません', 'したかった'],
            answer: 'したくない',
            explain: 'します (する) → raíz し + たくない = したくないです. Negación de たい → たくない (adj-い).',
          },
          {
            scene: 'Quiero ver una película',
            lines: [['Sofia', 'えいがを ___ です。(Quiero ver una película.)']],
            options: ['見たい', 'みます', 'みません', 'みた'],
            answer: '見たい',
            explain: '見ます → raíz 見 + たい = 見たいです (mitai desu). Quiero ver.',
          },
          {
            scene: '¿Quieres beber café?',
            lines: [['Marco', 'コーヒーを ___ ですか？(¿Quieres beber café?)']],
            options: ['飲みたい', 'のみます', 'のみません', 'のんだ'],
            answer: '飲みたい',
            explain: '飲みます → raíz 飲み + たい = 飲みたいですか。Pregunta de deseo: たいですか。',
          },
          {
            scene: 'No quiero ir',
            lines: [['Lina', 'いきたく___ です。(No quiero ir.)']],
            options: ['ない', 'ません', 'ないです', 'あります'],
            answer: 'ない',
            explain: 'いきたくない → たい → たくない (negación de adjetivo-い). いきたくないです.',
          },
          {
            scene: 'Quiero aprender japonés',
            lines: [['Nora', 'にほんごを ___ です。(Quiero aprender japonés.)']],
            options: ['学びたい', 'まなびます', 'まなびません', 'まなんだ'],
            answer: '学びたい',
            explain: '学びます → raíz 学び + たい = 学びたいです (manabitai desu). Quiero aprender.',
          },
          {
            scene: 'Quiero venir',
            lines: [['Carlos', 'ウィーラーンに ___ です。(Quiero venir a WeLearn.)']],
            options: ['きたい', 'きます', 'きません', 'きた'],
            answer: 'きたい',
            explain: 'きます (くる) → raíz き + たい = きたいです (kitai desu). Quiero venir. くる es irregular.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'たい y たくない',
        tag: '2 espacios',
        intro: 'Completa el deseo (positivo y negativo) en cada diálogo.',
        type: 'dual',
        items: [
          {
            scene: 'Quiero y no quiero',
            lines: [['Ana', 'すしを [[0]] が、なっとうは [[1]] です。(Quiero sushi pero no quiero natto.)']],
            blanks: [
              { options: ['食べたい', 'たべます', 'たべない'], answer: '食べたい', explain: '食べ + たいです = 食べたいです (quiero comer).' },
              { options: ['食べたくない', 'たべません', 'たべたくて'], answer: '食べたくない', explain: '食べ + たくない = 食べたくないです (no quiero comer). Negación adj-い.' },
            ],
          },
          {
            scene: 'Planes de viaje',
            lines: [['Nico', 'にほんに [[0]] が、まだ おかねが [[1]]。']],
            blanks: [
              { options: ['行きたい', 'いきます', 'いきたくない'], answer: '行きたい', explain: '行き + たいです = 行きたいです (quiero ir).' },
              { options: ['ありません', 'あります', 'ありたい'], answer: 'ありません', explain: 'おかねが ありません = no tengo dinero. あります → negativo ありません.' },
            ],
          },
          {
            scene: 'Pregunta y respuesta',
            lines: [
 ['Carlos', '何を [[0]] ですか？(¿Qué quieres comer?)'],
 ['Sofia', 'ピザを [[1]] です。(Quiero comer pizza.)'],
 ],
            blanks: [
              { options: ['食べたい', 'たべたくない', 'たべます'], answer: '食べたい', explain: '何を 食べたいですか？= ¿qué quieres comer?' },
              { options: ['食べたい', 'たべません', 'たべたくない'], answer: '食べたい', explain: 'ピザを 食べたいです = quiero comer pizza.' },
            ],
          },
          {
            scene: 'Deseos del fin de semana',
            lines: [['Lina', 'しゅうまつは [[0]] と [[1]] です。(El fin de semana quiero ver una película y descansar.)']],
            blanks: [
              { options: ['映画を見たい', 'えいがをみます', 'みたくない'], answer: '映画を見たい', explain: '映画を 見たい (mitai) = quiero ver una película.' },
              { options: ['やすみたい', 'やすみます', 'やすみません'], answer: 'やすみたい', explain: '休みたい (yasumitai) = quiero descansar. 休みます → 休み + たい.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado — deseos de Carlos',
        tag: 'Opciones',
        intro: 'Elige la forma たい o たくない correcta.',
        type: 'guidedText',
        scene: 'Carlos habla de sus deseos como estudiante de japonés en WeLearn',
        text: 'わたしは にほんに [[0]]。にほんごを もっと [[1]]。アニメを [[2]] し、まんがを [[3]] と おもっています。でも、むずかしい かんじは あまり [[4]]... うそです！かんじも [[5]]！ウィーラーンで デービッドと べんきょう[[6]]。',
        blanks: [
          { options: ['行きたいです', '行きます', '行きたくないです'], answer: '行きたいです', explain: '行き + たいです = 行きたいです (quiero ir). Deseo personal.' },
          { options: ['学びたいです', 'まなびます', 'まなびたくないです'], answer: '学びたいです', explain: '学び + たいです = 学びたいです (quiero aprender más).' },
          { options: ['見たいです', 'みます', 'みたくないです'], answer: '見たいです', explain: '見 + たいです = 見たいです (quiero ver anime).' },
          { options: ['読みたいです', 'よみます', 'よみたくないです'], answer: '読みたいです', explain: '読み + たいです = 読みたいです (quiero leer manga).' },
          { options: ['学びたいです', 'まなびたくないです', 'まなびません'], answer: '学びたいです', explain: 'かんじも 学びたいです = también quiero aprender kanji.' },
          { options: ['したいです', 'します', 'したくないです'], answer: 'したいです', explain: 'し + たいです = したいです. べんきょうしたいです = quiero estudiar.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma たい o たくない correcta.',
        type: 'freeText',
        scene: 'Nora habla de sus planes y lo que no quiere hacer',
        text: 'あした えいがを [[0]] (quiero ver)。でも そうじは [[1]] (no quiero hacer)。にほんごを [[2]] (quiero aprender)。サッカーは [[3]] (no quiero ver)。コーヒーを [[4]] (quiero beber)。はやく [[5]] (quiero dormir)。',
        blanks: [
          { answer: '見たいです', accepted: ['みたいです', '見たい'], explain: '見 + たいです = 見たいです (quiero ver).' },
          { answer: 'したくないです', accepted: ['したくない'], explain: 'し + たくないです = したくないです (no quiero hacer). Negación de たい.' },
          { answer: '学びたいです', accepted: ['まなびたいです', '学びたい'], explain: '学び + たいです = 学びたいです (quiero aprender).' },
          { answer: '見たくないです', accepted: ['みたくないです', '見たくない'], explain: '見 + たくないです = 見たくないです (no quiero ver).' },
          { answer: '飲みたいです', accepted: ['のみたいです', '飲みたい'], explain: '飲み + たいです = 飲みたいです (quiero beber).' },
          { answer: 'ねたいです', accepted: ['寝たいです', 'ねたい'], explain: 'ねます → ね + たいです = ねたいです (quiero dormir).' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe frases completas con 〜たいです.',
        type: 'write',
        items: [
          {
            scene: 'Quiero ir a Japón',
            prompt: 'Escribe: Quiero ir a Japón. → にほんに ___。',
            answer: 'にほんに 行きたいです。',
            accepted: ['にほんに 行きたいです', 'にほんに いきたいです', 'にほんにいきたいです'],
            explain: '行きます → raíz 行き + たいです = 行きたいです. にほんに (destino con に).',
          },
          {
            scene: 'No quiero estudiar',
            prompt: 'Escribe: Hoy no quiero estudiar. → きょうは べんきょう ___。',
            answer: 'きょうは べんきょう したくないです。',
            accepted: ['きょうは べんきょう したくないです', 'きょうはべんきょうしたくないです'],
            explain: 'します → raíz し + たくないです = したくないです. Negación de たい como adj-い.',
          },
          {
            scene: 'Pregunta de deseo',
            prompt: 'Escribe: ¿Qué quieres comer? → 何を ___か？',
            answer: '何を 食べたいですか？',
            accepted: ['何を 食べたいですか', 'なにを たべたいですか', 'なにを 食べたいですか？'],
            explain: '何を (nani wo = qué + objeto) + 食べたいですか (¿quieres comer?). Interrogativo + たい.',
          },
          {
            scene: 'Quiero ver y quiero ir',
            prompt: 'Escribe: Quiero ver anime y quiero ir a Japón. → アニメを ___ し、にほんに ___。',
            answer: 'アニメを 見たいです し、にほんに 行きたいです。',
            accepted: ['アニメを 見たいです し にほんに 行きたいです'],
            explain: '見たいです (quiero ver) + し (y además) + 行きたいです (quiero ir).',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión de deseos',
        tag: 'Reto final',
        intro: 'Habla de tus deseos usando 〜たい y 〜たくない.',
        type: 'write',
        items: [
          {
            scene: 'Tus tres deseos',
            prompt: '___たいです。___たいです。___たいです。(Tres cosas que quieres hacer)',
            answer: 'にほんに 行きたいです。すしを 食べたいです。にほんごを もっと 学びたいです。',
            accepted: ['にほんに 行きたいです すしを 食べたいです にほんごを もっと 学びたいです'],
            explain: 'Tres deseos con たいです: ir, comer, aprender. Usa distintos verbos.',
          },
          {
            scene: 'Lo que no quieres',
            prompt: '___たくないです。___たくないです。(Dos cosas que no quieres hacer)',
            answer: 'そうじを したくないです。はやく おきたくないです。',
            accepted: ['そうじを したくないです はやく おきたくないです'],
            explain: 'Dos negaciones con たくないです: no quiero limpiar, no quiero levantarme temprano.',
          },
          {
            scene: 'Pregunta y respuesta con たい',
            prompt: 'A: しゅうまつ 何を ___か？B: ともだちと ___。',
            answer: 'A: しゅうまつ 何を したいですか？B: ともだちと 会いたいです。',
            accepted: ['しゅうまつ 何を したいですか ともだちと 会いたいです'],
            explain: '何を したいですか (¿qué quieres hacer?) + ともだちと 会いたい (quiero ver a mis amigos).',
          },
        ],
      },
    ],
  },
}

export default topic
