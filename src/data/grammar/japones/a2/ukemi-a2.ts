import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'ukemi-a2',
  order: '06',
  color: '#dc2626',
  category: 'Verbos',
  level: 'A2',
  title: 'Forma pasiva en japonés A2 — ～られる',
  shortTitle: 'Forma pasiva',
  metaTitle: 'forma pasiva japones A2 — rareru ukemi ser hecho',
  description:
    'La voz pasiva en japones A2 (受け身, ukemi) expresa que el sujeto recibe la accion de otro. Se forma con 〜られる y equivale a "ser + participio" en espanol. Muy usada para expresar molestia o experiencias no deseadas.',
  lead: '先生に褒められました (sensei ni homeraremashita) = Fui elogiado por el profesor. 雨に降られました = Me llovio encima (me pillo la lluvia).',
  outcomes: [
    'Forma el pasivo de verbos Grupo 1 con 〜あれる y Grupo 2 con 〜られる',
    'Identifica el agente de la accion con に',
    'Usa el pasivo de molestia (meiwaku ukemi) para experiencias negativas',
  ],

  guide: {
    goal: 'Usar la voz pasiva para indicar que el sujeto recibe la accion de otro.',
    model: '私は先生に注意されました。(Watashi wa sensei ni chuui saremashita.) = Fui advertido por el profesor. 財布を盗まれました。= Me robaron la cartera.',
    formula: 'Gr.1: [raiz a] + れる / Gr.2: [stem] + られる / Irregulares: される, こられる',
    decisions: [
      'Grupo 1: cambia la vocal final de う a あ y agrega れる: 書く→書かれる, 飲む→飲まれる, 話す→話される',
      'Grupo 2: agrega られる al stem: 食べる→食べられる, 見る→見られる',
      'Irregulares: する→される, くる→こられる',
      'El agente (quien hace la accion) va marcado con に: 先生に褒められた',
      'El sujeto gramatical (quien recibe la accion) va marcado con は/が',
      'Pasivo de molestia (meiwaku): el sujeto sufre la consecuencia — 友達に来られて、困りました (vino mi amigo y me causo problema)',
    ],
    table: [
      ['Verbo activo', 'Forma pasiva', 'Ejemplo pasivo'],
      ['書く (kaku)', '書かれる (kakareru)', '手紙が書かれました'],
      ['食べる (taberu)', '食べられる (taberareru)', 'ケーキが食べられた'],
      ['する (suru)', 'される (sareru)', '宿題が先生に直された'],
      ['呼ぶ (yobu)', '呼ばれる (yobareru)', '名前を呼ばれました'],
    ],
    mistakes: [
      'El pasivo de Grupo 2 es identico al potencial: 食べられる puede ser potencial (puedo comer) o pasivo (es comido). El contexto diferencia.',
      'El agente va con に, no con が o は: 先生に (por el profesor), no 先生が.',
      'El pasivo de molestia no tiene equivalente directo en espanol: 友達に来られた = mi amigo vino (y eso me causo molestia).',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma la voz pasiva 受け身 (ukemi) en japonés?',
      paragraphs: [
        'La voz pasiva (受け身) en japones se forma de manera sistematica: Grupo 1 cambia la vocal final de う a あ y agrega れる (書く→書かれる, 飲む→飲まれる), mientras que el Grupo 2 simplemente agrega られる (食べる→食べられる). Los irregulares son する→される y くる→こられる.',
        'El agente de la accion (quien la realiza) se marca con に: 先生に褒められました = Fui elogiado por el profesor. El sujeto que recibe la accion lleva は o が.',
      ],
    },
    {
      heading: '¿Qué es el pasivo de molestia (迷惑受け身)?',
      paragraphs: [
        'Una caracteristica unica del japones es el "pasivo de molestia": el sujeto sufre una consecuencia negativa por la accion de otro. 雨に降られました = Me cayo encima la lluvia (me molesto). 友達に来られて、困った = Mi amigo vino y me causo inconveniente.',
        'Este uso no tiene traduccion directa al espanol y es esencial para entender el japones natural. La pasiva de molestia implica que la accion afecto negativamente al sujeto.',
      ],
    },
    {
      heading: '¿Cómo se conjuga el pasivo y qué partícula marca al agente?',
      paragraphs: [
        'El pasivo (受け身) se forma según el grupo. Grupo 1 (godan): última -u → -areru: 書く→書かれる, 話す→話される, 読む→読まれる. Grupo 2 (ichidan): quitar る + られる: 食べる→食べられる, 見る→見られる. Irregulares: する→される, 来る→来られる (こられる). En la frase pasiva, el que recibe la acción va con は/が y el agente (quien la hace) se marca con に: 私は先生にほめられました (fui elogiado por el profesor). La trampa para el hispanohablante es doble: (1) el agente lleva に, no "por" con otra partícula; (2) la forma del grupo 2 (食べられる) es idéntica al potencial, y solo el contexto y la partícula に las distinguen. Existe además el 迷惑受け身 (pasivo de molestia), que expresa que algo te afectó negativamente: 雨に降られた (me pilló la lluvia).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante forma el pasivo por grupos y entiende el pasivo de molestia.',
    graphicPrompt: 'Diagrama de flecha: agente (に) → sujeto (は/が) que recibe la accion.',
    scene: [
      ['先生に褒められました (sensei ni homeraremashita)', 'Fui elogiado por el profesor'],
      ['財布を盗まれました (saifu wo nusumaremashita)', 'Me robaron la cartera'],
      ['雨に降られました (ame ni furaremashita)', 'Me pillo la lluvia (molestia)'],
      ['書かれます (kakaremasu)', 'Es escrito (pasiva directa)'],
    ],
    learnerModes: [
      'analitico: reglas de conjugacion pasiva',
      'contextual: pasivo de molestia vs pasivo neutro',
      'oral: describir eventos que te pasaron',
    ],
    reviewFocus: [
      'Gr.1: う段→あ段+れる',
      'Gr.2: stem+られる',
      'Agente con に',
      'Pasivo de molestia: meiwaku ukemi',
    ],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma pasiva correcta',
        tag: 'Opcion multiple',
        intro: 'Elige la forma pasiva correcta del verbo indicado.',
        type: 'choice',
        items: [
          {
            scene: 'Ser elogiado — 褒める (homeru)',
            lines: [['Carlos', '先生に___。(fui elogiado por el profesor)']],
            options: ['褒められました', '褒まれました', '褒もれました'],
            answer: '褒められました',
            explain: '褒める (Gr.2): 褒め + られる → 褒められる → pasado: 褒められました.',
          },
          {
            scene: 'Ser llamado — 呼ぶ (yobu)',
            lines: [['Sofia', '名前を___。(me llamaron por mi nombre)']],
            options: ['呼ばれました', '呼びれました', '呼まれました', '呼られました'],
            answer: '呼ばれました',
            explain: '呼ぶ (Gr.1): ぶ→ば+れる = 呼ばれる → 呼ばれました.',
          },
          {
            scene: 'Ser robado — 盗む (nusumu)',
            lines: [['Diego', '財布を___。(me robaron la cartera)']],
            options: ['盗まれました', '盗みれました', '盗もれました', '盗れました'],
            answer: '盗まれました',
            explain: '盗む (Gr.1): む→ま+れる = 盗まれる → 盗まれました.',
          },
          {
            scene: 'Ser criticado — 批判する (hihan suru)',
            lines: [['Ana', 'みんなに___。(fui criticado por todos)']],
            options: ['批判されました', '批判せられました', '批判られました', '批判れました'],
            answer: '批判されました',
            explain: 'する (irregular): される → 批判される → 批判されました.',
          },
          {
            scene: 'Ser visto — 見る (miru)',
            lines: [['Marco', '先生に___。(me vio el profesor)']],
            options: ['見られました', '見れられました', '見ました', '見られません'],
            answer: '見られました',
            explain: '見る (Gr.2): 見 + られる → 見られる → 見られました.',
          },
          {
            scene: 'Ser mordido — 噛む (kamu)',
            lines: [['Lina', '犬に___。(me mordio un perro)']],
            options: ['噛まれました', '噛みれました', '噛られました', '噛れました'],
            answer: '噛まれました',
            explain: '噛む (Gr.1): む→ま+れる = 噛まれる → 噛まれました.',
          },
          {
            scene: 'Pasivo de molestia — lluvia',
            lines: [['Hugo', '帰り道に___。(me pillo la lluvia de camino a casa)']],
            options: ['雨に降られました', '雨が降りました', '雨で濡れました', '雨に降りました'],
            answer: '雨に降られました',
            explain: '降る (furu, Gr.1): る→ら+れる → 降られる. Pasivo de molestia: la lluvia me pillo.',
          },
          {
            scene: 'Libro escrito — 書く (kaku)',
            lines: [['Marta', 'このレポートは夏目漱石に___。(este libro fue escrito por Natsume Soseki)']],
            options: ['書かれました', '書きれました', '書けました', '書いられました'],
            answer: '書かれました',
            explain: '書く (Gr.1): く→か+れる = 書かれる → 書かれました.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Experiencias con la pasiva',
        tag: '2 espacios',
        intro: 'Completa los dos verbos pasivos en el dialogo.',
        type: 'dual',
        items: [
          {
            scene: 'Problemas en el trabajo',
            lines: [['Carlos', '今日、上司に[[0]]し、同僚にも[[1]]よ。大変だった。']],
            blanks: [
              { options: ['怒られました', '怒りられました', '怒りました'], answer: '怒られました', explain: '怒る (okoru, Gr.1): る→ら+れる → 怒られる → 怒られました.' },
              { options: ['批判されました', '批判します', '批判しました'], answer: '批判されました', explain: 'する→される → 批判される → 批判されました.' },
            ],
          },
          {
            scene: 'Un dia de mala suerte',
            lines: [['Sofia', '今日は犬に[[0]]し、雨にも[[1]]。最悪！']],
            blanks: [
              { options: ['噛まれました', '噛みました', '噛られました'], answer: '噛まれました', explain: '噛む→噛まれる → 噛まれました.' },
              { options: ['降られました', '降りました', '降れました'], answer: '降られました', explain: '降る→降られる → 降られました. Pasivo de molestia.' },
            ],
          },
          {
            scene: 'Sobre el libro',
            lines: [['Diego', 'この小説は誰に[[0]]か？'], ['Ana', '村上春樹に[[1]]。']],
            blanks: [
              { options: ['書かれましたか', '書きましたか', '書れましたか'], answer: '書かれましたか', explain: '書く→書かれる → 書かれましたか？' },
              { options: ['書かれました', '書きました', '書れました'], answer: '書かれました', explain: '書く→書かれる → 書かれました.' },
            ],
          },
          {
            scene: 'En la escuela',
            lines: [['Marco', '先生に名前を[[0]]か？'], ['Lina', 'はい、みんなの前で[[1]]、恥ずかしかった。']],
            blanks: [
              { options: ['呼ばれましたか', '呼びましたか', '呼れましたか'], answer: '呼ばれましたか', explain: '呼ぶ→呼ばれる → 呼ばれましたか？' },
              { options: ['褒められました', '褒めました', '怒られました'], answer: '褒められました', explain: '褒める→褒められる → 褒められました. Fue elogiado.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Narrar experiencias con la pasiva',
        tag: 'Texto guiado',
        intro: 'Elige la forma pasiva correcta en cada espacio.',
        type: 'guidedText',
        scene: 'Carlos narra un dia dificil',
        text: '昨日は大変な一日だった。まず、上司に[[0]]。次に、電車の中でスマホを[[1]]。帰り道に雨に[[2]]。家に着いたら、隣の人に[[3]]し、猫にも[[4]]。本当に最悪な日だった。',
        blanks: [
          { options: ['怒られました', '怒りました', '怒れました'], answer: '怒られました', explain: '怒る→怒られる → 怒られました. Fue reganiado por el jefe.' },
          { options: ['盗まれました', '盗みました', '盗まれません'], answer: '盗まれました', explain: '盗む→盗まれる → 盗まれました. Le robaron el movil.' },
          { options: ['降られました', '降りました', '降れました'], answer: '降られました', explain: '降る→降られる → 降られました. Le pillo la lluvia.' },
          { options: ['起こされました', '起こしました', '起きられました'], answer: '起こされました', explain: '起こす (okosu, Gr.1): す→さ+れる → 起こされる → 起こされました. Le desperto el vecino.' },
          { options: ['噛まれました', '噛みました', '噛れました'], answer: '噛まれました', explain: '噛む→噛まれる → 噛まれました. Le mordio el gato.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma pasiva del verbo en parentesis.',
        type: 'freeText',
        scene: 'Marta describe lo que le paso en la oficina',
        text: '今日、会議で発表が先生に[[0]] (直す)。作ったプレゼンも[[1]] (批判する)。名前も間違えて[[2]] (呼ぶ)。でも、最後に部長に[[3]] (褒める)。来週はもっとがんばって、誰にも[[4]] (怒る)ないようにしたい。',
        blanks: [
          { answer: '直されました', explain: '直す (naosu, Gr.1): す→さ+れる = 直される → 直されました.' },
          { answer: '批判されました', explain: 'する→される = 批判される → 批判されました.' },
          { answer: '呼ばれました', explain: '呼ぶ (Gr.1): ぶ→ば+れる = 呼ばれる → 呼ばれました.' },
          { answer: '褒められました', explain: '褒める (Gr.2): 褒め+られる = 褒められる → 褒められました.' },
          { answer: '怒られ', explain: '怒る→怒られる → 誰にも怒られないように = para que nadie me riegane.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Escribe oraciones pasivas',
        tag: 'Escritura guiada',
        intro: 'Escribe la oracion completa en voz pasiva.',
        type: 'write',
        items: [
          {
            scene: 'Ser elogiado',
            prompt: 'Escribe: Fui elogiado por el profesor → 先生 + 褒める',
            answer: '先生に褒められました。',
            accepted: ['先生に褒められました', '先生に褒められた'],
            explain: '褒める (Gr.2): 褒め+られる → 褒められました. Agente: 先生に.',
          },
          {
            scene: 'Me robaron la billetera',
            prompt: 'Escribe: Me robaron la cartera → 財布 + 盗む',
            answer: '財布を盗まれました。',
            accepted: ['財布を盗まれました', '財布が盗まれました'],
            explain: '盗む (Gr.1): む→ま+れる = 盗まれる → 盗まれました.',
          },
          {
            scene: 'Este libro fue escrito por Soseki',
            prompt: 'Escribe: Este libro fue escrito por Natsume Soseki → 夏目漱石 + 書く',
            answer: 'この本は夏目漱石に書かれました。',
            accepted: ['夏目漱石に書かれました', 'この本は夏目漱石に書かれた'],
            explain: '書く (Gr.1): く→か+れる = 書かれる → 書かれました.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Mision final',
        tag: 'Escritura libre',
        intro: 'Describe experiencias usando la voz pasiva.',
        type: 'write',
        items: [
          {
            scene: 'Una experiencia positiva',
            prompt: 'Escribe algo que te paso bien (ser elogiado, felicitado, invitado): ___に___られました。',
            answer: '友達に誕生日パーティーに招待されました。',
            accepted: ['られました', 'されました'],
            explain: '招待する→招待される. Usa に para el agente de la accion.',
          },
          {
            scene: 'Una experiencia negativa',
            prompt: 'Escribe algo que te paso mal: ___に___られました。(pasivo de molestia)',
            answer: '電車の中で足を踏まれました。',
            accepted: ['られました', 'まれました', 'されました'],
            explain: '踏む (fumu, Gr.1): む→ま+れる → 踏まれる → 踏まれました.',
          },
          {
            scene: 'Una obra famosa',
            prompt: 'Escribe sobre una obra o edificio famoso: ___は___に___られました。',
            answer: 'マチュピチュはインカ人に作られました。',
            accepted: ['られました', 'かれました', 'されました'],
            explain: '作る (Gr.1): る→ら+れる → 作られる → 作られました.',
          },
        ],
      },
    ],
  },
}

export default topic
