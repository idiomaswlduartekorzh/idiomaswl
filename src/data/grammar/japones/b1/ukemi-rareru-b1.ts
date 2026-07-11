import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'ukemi-rareru-b1',
  order: '04',
  color: '#dc2626',
  category: 'Pasiva',
  level: 'B1',
  title: '〜られる — La voz pasiva en japonés B1 (Recibir una acción)',
  shortTitle: '〜られる (Pasiva)',
  metaTitle: '〜られる Pasiva en japonés B1 — Conjugación y uso de la voz pasiva',
  description:
    'La voz pasiva 〜られる indica que el sujeto recibe la acción de otro agente. En japonés la pasiva tiene matices especiales: la pasiva directa (de afectación) y la pasiva indirecta (de perjuicio) son las más comunes. El agente causante lleva la partícula に. Dominar la pasiva es esencial para el japonés B1 y los exámenes JLPT N3/N2.',
  lead: 'Domina la forma pasiva られる: conjugación de los tres grupos, diferencia entre pasiva directa e indirecta, y la partícula に para el agente.',
  outcomes: [
    'Conjugar verbos de los tres grupos a la forma pasiva',
    'Usar la pasiva directa (acción recibida) con naturalidad',
    'Identificar la pasiva indirecta de perjuicio (alguien hizo algo que me afectó)',
    'Marcar correctamente el agente con la partícula に',
  ],

  guide: {
    goal: 'Expresar que el sujeto recibe la acción de alguien (pasiva directa) o que alguien hizo algo que afecta al sujeto (pasiva indirecta de perjuicio).',
    model: '財布を盗まれた。(Saifu wo nusumareta.) — Me robaron la cartera. (pasiva de perjuicio) / 先生にほめられた。(Sensei ni homerareta.) — El profesor me elogió. (pasiva directa)',
    formula: 'Sujeto は + agente に + acción [pasiva] + られる/れる',
    decisions: [
      'Grupo 1 (う verbos): vocal → あ-row + れる → 書く → 書かれる, 飲む → 飲まれる, 読む → 読まれる',
      'Grupo 2 (る verbos): る → られる → 食べる → 食べられる, 見る → 見られる',
      'Irregulares: する → される, くる → こられる',
      'Agente (quien hace la acción): partícula に → 先生に褒められた (el profesor me elogió)',
      'Pasiva directa: el sujeto recibe la acción directamente → 私は先生にほめられた',
      'Pasiva indirecta: el sujeto es afectado por la acción sobre otra cosa → 雨に降られた (me llovió encima = fui perjudicado por la lluvia)',
    ],
    table: [
      ['Grupo', 'Regla', 'Ejemplo'],
      ['Grupo 1 (う)', 'vocal → あ + れる', '書く→書かれる, 盗む→盗まれる, 話す→話される'],
      ['Grupo 2 (る)', 'る → られる', '食べる→食べられる, 見る→見られる'],
      ['Irregular', 'Formas propias', 'する→される, くる→こられる'],
    ],
    mistakes: [
      '「書けられた」❌ — No se mezcla el potencial con la pasiva. La pasiva de 書く es 書かれた ✓.',
      '「先生は私をほめられた」❌ — el agente de la pasiva lleva に, no を: 先生に私はほめられた ✓.',
      'Confundir 食べられる (pasiva "ser comido") con 食べられる (potencial "poder comer") — el contexto siempre aclara el significado.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma la voz pasiva en japonés?',
      paragraphs: [
        'La voz pasiva (受け身形 ukemi-kei) se forma de manera diferente según el grupo del verbo. Para el grupo 1 (verbos en う): la última vocal cambia a la fila あ y se añade れる. Para el grupo 2 (verbos en る): se reemplaza る por られる. Los irregulares tienen formas propias: する → される, くる → こられる.',
        'Ejemplos por grupo: 書く (kaku) → 書かれる (kakareru), 飲む → 飲まれる, 話す → 話される. 食べる (taberu) → 食べられる (taberareru). する → される (sareru). くる → こられる (korareru).',
      ],
    },
    {
      heading: 'Pasiva directa: recibir una acción',
      paragraphs: [
        'La pasiva directa en japonés funciona de manera similar al español: el sujeto recibe la acción. El agente (quien hace la acción) lleva la partícula に.',
        '例: 私は先生にほめられた (fui elogiado por el profesor). この小説は100万人に読まれた (esta novela fue leída por un millón de personas). この映画は多くの人に見られた (esta película fue vista por mucha gente). La pasiva directa es muy útil para hablar de obras, eventos y situaciones donde el protagonista recibe algo positivo o neutro.',
      ],
    },
    {
      heading: 'Pasiva indirecta: la pasiva de perjuicio',
      paragraphs: [
        'La pasiva indirecta es única al japonés (y algunas lenguas asiáticas) y expresa que el sujeto fue perjudicado o afectado por la acción de otro, aunque esa acción no recayó directamente sobre él.',
        '例: 財布を盗まれた (me robaron la cartera — yo soy el perjudicado, aunque la cartera recibió la acción). 雨に降られた (me llovió encima — fui perjudicado por la lluvia). 隣の人に夜中に騒がれた (el vecino me molestó haciendo ruido de noche). Esta construcción expresa afectación negativa muy frecuentemente.',
      ],
    },
    {
      heading: 'La pasiva en el contexto formal y escrito',
      paragraphs: [
        'En japonés formal y escrito, la pasiva se usa mucho para dar objetividad o distanciar al narrador de la acción, similar al español formal. 新しい法律が可決された (se aprobó la nueva ley). この建物は1920年に建てられた (este edificio fue construido en 1920).',
        'También aparece en noticias y textos académicos: 昨日、会議が開催された (ayer se celebró la reunión). 報告書が提出された (el informe fue entregado). Aprender la pasiva es crucial para leer textos formales y periódicos japoneses.',
      ],
    },
    {
      heading: 'Cómo distinguir potencial de pasiva en る-verbos',
      paragraphs: [
        'Para los verbos del grupo 2, la forma pasiva y la forma potencial son idénticas: 食べられる puede significar "ser comido" (pasiva) o "poder comer" (potencial). El contexto siempre resuelve la ambigüedad.',
        '例: このケーキは犬に食べられた (el perro se comió este pastel — pasiva de perjuicio) vs もっと食べられる (puedo comer más — potencial). En el habla cotidiana, el potencial de verbos grupo 2 se reforma a veces como 食べれる (forma coloquial ら抜き) precisamente para evitar esta ambigüedad con la pasiva.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Pasiva directa vs pasiva indirecta de perjuicio. Enfatizar la partícula に para el agente.',
    graphicPrompt: 'Flecha desde agente (に) hacia el sujeto que recibe la acción, con cara de sorpresa o afectación.',
    scene: [
      ['先生にほめられた。(Sensei ni homerareta.)', 'El profesor me elogió. (Fui elogiado por el profesor.)'],
      ['財布を盗まれた。(Saifu wo nusumareta.)', 'Me robaron la cartera.'],
      ['彼女に振られた。(Kanojo ni furareta.)', 'Mi novia me dejó.'],
      ['雨に降られて、ずぶぬれになった。(Ame ni furarete, zubunure ni natta.)', 'Me llovió encima y me empapé.'],
      ['隣の人に夜中に騒がれた。(Tonari no hito ni yonaka ni sawagareta.)', 'El vecino me molestó con ruido en plena noche.'],
      ['この絵は有名な画家に描かれた。(Kono e wa yūmei na gaka ni kakareta.)', 'Este cuadro fue pintado por un pintor famoso.'],
      ['子供の頃、よく母に叱られた。(Kodomo no koro, yoku haha ni shikarareta.)', 'De pequeño, mi madre me regañaba con frecuencia.'],
      ['新しい法律が国会で可決された。(Atarashii hōritsu ga kokkai de kaketsu sareta.)', 'La nueva ley fue aprobada en el parlamento.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    practiceVerbs: ['書く', '読む', '盗む', '褒める', '叱る', '食べる', '見る', 'する'],
    reviewFocus: ['conjugación pasiva grupo 1', 'conjugación pasiva grupo 2', 'pasiva directa vs indirecta', 'partícula に con agente'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma pasiva correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma pasiva correcta del verbo indicado.',
        type: 'choice',
        items: [
          {
            scene: 'Pasiva de 書く (grupo 1)',
            lines: [['', 'この手紙は有名な作家に___。(Esta carta fue escrita por un famoso escritor.)']],
            options: ['書かれた', '書けられた', '書かした', '書くられた'],
            answer: '書かれた',
            explain: '書く (grupo 1): く → かれる. 書かれた (pasado pasivo).',
          },
          {
            scene: 'Pasiva de 食べる (grupo 2)',
            lines: [['', '私のケーキが弟に___。(Mi pastel fue comido por mi hermano menor.)']],
            options: ['食べられた', '食べかれた', '食べされた', '食べれた'],
            answer: '食べられた',
            explain: '食べる (grupo 2): る → られる. 食べられた.',
          },
          {
            scene: 'Pasiva de する (irregular)',
            lines: [['', '試合は来週に延期___。(El partido fue pospuesto para la semana que viene.)']],
            options: ['された', 'されました', 'しられた', 'すられた'],
            answer: 'された',
            explain: 'する (irregular): pasiva = される → された.',
          },
          {
            scene: 'Pasiva de perjuicio',
            lines: [['', '昨日、財布を___。(Ayer me robaron la cartera.)']],
            options: ['盗まれた', '盗めた', '盗かれた', '盗むれた'],
            answer: '盗まれた',
            explain: '盗む (grupo 1, む→まれる): 盗まれた. Pasiva de perjuicio — yo fui el afectado.',
          },
          {
            scene: 'Pasiva de 叱る (grupo 1)',
            lines: [['', '子供の頃、よく母に___。(De pequeño, mi madre me regañaba frecuentemente.)']],
            options: ['叱られた', '叱りられた', '叱かれた', '叱されました'],
            answer: '叱られた',
            explain: '叱る (grupo 1): る→られる. 叱られた. に marca al agente: 母に = por mamá.',
          },
          {
            scene: 'Pasiva de 読む (grupo 1)',
            lines: [['', 'この本は世界中で___。(Este libro fue leído en todo el mundo.)']],
            options: ['読まれた', '読められた', '読かれた', '読むれた'],
            answer: '読まれた',
            explain: '読む (grupo 1): む→まれる. 読まれた.',
          },
          {
            scene: 'Pasiva de 褒める (grupo 2)',
            lines: [['', '発表がうまくて、先生に___。(La presentación salió bien y el profesor me elogió.)']],
            options: ['ほめられた', 'ほめかれた', 'ほめされた', 'ほめれた'],
            answer: 'ほめられた',
            explain: '褒める (grupo 2, る→られる): ほめられた.',
          },
          {
            scene: 'Pasiva de lluvia (indirecta)',
            lines: [['', '出かけたら急に___、傘がなくて困った。(Cuando salí, de repente me llovió encima y no tenía paraguas.)']],
            options: ['雨に降られた', '雨が降られた', '雨を降られた', '雨で降られた'],
            answer: '雨に降られた',
            explain: 'Pasiva indirecta con agente に: 雨に降られた. El agente de la pasiva lleva に.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Pasiva directa e indirecta',
        tag: '2 espacios',
        intro: 'Completa las oraciones con la forma pasiva correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Día de mala suerte',
            lines: [['', '今日は最悪だった。電車の中で財布を[[0]]、帰り道に雨に[[1]]。']],
            blanks: [
              { options: ['盗まれた', '盗めた', '盗かれた', '盗まれます'], answer: '盗まれた', explain: '盗む pasiva: 盗まれた. Perjuicio: me robaron.' },
              { options: ['降られた', '降った', '降られます', '降れた'], answer: '降られた', explain: '降る pasiva de perjuicio: 降られた. Me perjudicó la lluvia.' },
            ],
          },
          {
            scene: 'Evaluación en el trabajo',
            lines: [['', '今月、上司に仕事をたくさん[[0]]、プロジェクトが成功して[[1]]。']],
            blanks: [
              { options: ['任された', '任せられた', '任かれた', '任まれた'], answer: '任された', explain: '任せる (grupo 2): させる tipo, pero aquí es 任す (grupo 1 alternativo). 任された = me fue encomendado.' },
              { options: ['ほめられた', 'ほめかれた', 'ほめされた', 'ほめれた'], answer: 'ほめられた', explain: '褒める pasiva: ほめられた. Positivo: me elogiaron.' },
            ],
          },
          {
            scene: 'Historia literaria',
            lines: [['', 'この城は400年前に[[0]]、今も多くの観光客に[[1]]。']],
            blanks: [
              { options: ['建てられた', '建てかれた', '建てされた', '建られた'], answer: '建てられた', explain: '建てる (grupo 2): 建てられた. Pasiva histórica formal.' },
              { options: ['訪問される', '訪問かれる', '訪問られる', '訪問します'], answer: '訪問される', explain: '訪問する → pasiva される. Pasiva formal para texto escrito.' },
            ],
          },
          {
            scene: 'En la infancia',
            lines: [['', '子供の頃、よく妹に私のおもちゃを[[0]]、親に[[1]]。']],
            blanks: [
              { options: ['壊された', '壊かれた', '壊されます', '壊れた'], answer: '壊された', explain: '壊す → される (する型: する→される). Me fue roto el juguete (perjuicio).' },
              { options: ['叱られた', '叱りられた', '叱かれた', '叱られます'], answer: '叱られた', explain: '叱る pasiva: 叱られた. Mis padres me regañaron.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Noticias y texto formal',
        tag: 'Texto guiado',
        intro: 'Completa este artículo periodístico usando formas pasivas apropiadas.',
        type: 'guidedText',
        scene: 'Artículo sobre un monumento histórico.',
        text: '江戸城について。江戸城は1457年に太田道灌によって[[0]]。その後、徳川家康によって大きく[[1]]、江戸時代を通じて将軍の居城として[[2]]。1868年の明治維新の際、江戸城は皇室に[[3]]、今日「皇居」と[[4]]。毎年多くの観光客にこの場所が[[5]]、特に東御苑は一般公開[[6]]。',
        blanks: [
          { options: ['建てられた', '建てかれた', '建られた', '建てされた'], answer: '建てられた', explain: '建てる (grupo 2) pasiva: 建てられた.' },
          { options: ['改築された', '改築かれた', '改築られた', '改築します'], answer: '改築された', explain: '改築する → pasiva される. Fue reformado.' },
          { options: ['使われた', '使えられた', '使かれた', '使いられた'], answer: '使われた', explain: '使う (grupo 1): う→われる. 使われた.' },
          { options: ['引き渡された', '引き渡かれた', '引き渡されます', '引き渡しられた'], answer: '引き渡された', explain: '引き渡す → 引き渡された (pasiva de する型).' },
          { options: ['呼ばれている', '呼ばれます', '呼べられている', '呼ぶられている'], answer: '呼ばれている', explain: '呼ぶ (grupo 1): ぶ→ばれる. 呼ばれている = es llamado (actualmente).' },
          { options: ['訪問されている', '訪問かれている', '訪問られます', '訪問します'], answer: '訪問されている', explain: '訪問する → pasiva されている (estado continuo de ser visitado).' },
          { options: ['されている', 'されました', 'かれている', 'られている'], answer: 'されている', explain: '公開する → pasiva されている. Está siendo ofrecido al público.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Pasiva sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma pasiva del verbo entre paréntesis.',
        type: 'freeText',
        scene: 'Completa con la forma pasiva correcta según el grupo del verbo.',
        text: '私は昨日、会議で部長に仕事を[[0]] (頼む)。その後、新しいプロジェクトの責任者に[[1]] (選ぶ)。夜、友達に急に[[2]] (呼ぶ)、疲れていたのに驚いた。帰り道に知らない人に道を[[3]] (聞く)。家に着いたら、弟に部屋を[[4]] (汚す)、怒った。',
        blanks: [
          { answer: '頼まれた', accepted: ['頼まれた', '頼まれました'], explain: '頼む (grupo 1): む→まれる. 頼まれた.' },
          { answer: '選ばれた', accepted: ['選ばれた', '選ばれました'], explain: '選ぶ (grupo 1): ぶ→ばれる. 選ばれた.' },
          { answer: '呼ばれた', accepted: ['呼ばれた', '呼ばれました'], explain: '呼ぶ (grupo 1): ぶ→ばれる. 呼ばれた.' },
          { answer: '聞かれた', accepted: ['聞かれた', '聞かれました'], explain: '聞く (grupo 1): く→かれる. 聞かれた.' },
          { answer: '汚された', accepted: ['汚された', '汚されました'], explain: '汚す → される (する型). 汚された = fue ensuciado (perjuicio).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción pasiva',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando la voz pasiva.',
        type: 'write',
        items: [
          {
            scene: 'Experiencia propia',
            prompt: 'Describe algo negativo que te ocurrió (usa pasiva de perjuicio).',
            answer: '電車の中でスマホを盗まれた。',
            accepted: ['まれた', 'られた', 'された'],
            explain: 'Ejemplos: 自転車を壊された。/ 友達に秘密を話された。/ 財布を落とされた。',
          },
          {
            scene: 'Logro o elogio',
            prompt: 'Describe algo positivo que alguien hizo por ti o te dijo (pasiva directa).',
            answer: '先生にとても上手だとほめられた。',
            accepted: ['られた', 'まれた'],
            explain: 'Ejemplos: 上司に信頼されている。/ 友達に感謝された。',
          },
          {
            scene: 'Hecho histórico',
            prompt: 'Escribe un hecho histórico o cultural usando la pasiva formal.',
            answer: 'この神社は千年前に建てられた。',
            accepted: ['られた', 'された'],
            explain: 'Ejemplos: 東京タワーは1958年に建てられた。/ この法律は去年可決された。',
          },
          {
            scene: 'Pasiva con agente',
            prompt: 'Escribe una oración donde menciones claramente el agente con に.',
            answer: '母に夕食を全部食べられた。',
            accepted: ['に', 'によって'],
            explain: 'El agente lleva に (casual) o によって (formal). Ejemplo: 先生に作文を直された。',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Cuéntame tu día',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones sobre cosas que te pasaron (que recibiste de otros) usando la voz pasiva.',
        type: 'write',
        items: [
          {
            scene: 'Algo positivo que recibiste',
            prompt: 'Escribe algo bueno que alguien hizo por ti o te dijo (pasiva directa positiva).',
            answer: '友達に誕生日を祝われた。',
            accepted: ['られた', 'された', 'まれた'],
            explain: 'Ejemplos: 部長にほめられた。/ 友達にプレゼントをもらわれた (esto sería raro — mejor: 友達にプレゼントをもらった). Usa ほめられる, 感謝される, 選ばれる.',
          },
          {
            scene: 'Algo que te molestó',
            prompt: 'Escribe algo negativo que alguien hizo y te afectó (pasiva de perjuicio).',
            answer: '電車の中で隣の人にずっと話しかけられた。',
            accepted: ['られた', 'まれた', 'された'],
            explain: 'Ejemplos: 友達に約束を破られた。/ 電話を切られた。/ 財布を盗まれた。',
          },
          {
            scene: 'Algo que te ocurrió por la naturaleza o situación',
            prompt: 'Escribe algo en lo que el "agente" es una situación o cosa (lluvia, ruido, etc.).',
            answer: '帰り道に急に雨に降られた。',
            accepted: ['に降られた', 'に', 'られた'],
            explain: 'La pasiva indirecta puede tener agentes no humanos: 雨に降られる, 騒音に悩まされる, 台風に家を壊される.',
          },
        ],
      },
    ],
  },
}

export default topic
