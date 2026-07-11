import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'koto-ni-suru-naru-b1',
  order: '02',
  color: '#dc2626',
  category: 'Decisión',
  level: 'B1',
  title: '〜ことにする/なる — Decidir hacer algo o que resulte así (B1 japonés)',
  shortTitle: '〜ことにする/なる (Decidir / Resultar que)',
  metaTitle: '〜ことにする y ことになる en japonés B1 — Decisiones y resultados',
  description:
    'ことにする expresa una decisión personal deliberada: "decidí hacer X". ことになる expresa un resultado o decisión que viene de fuera, o algo que quedó establecido: "resultó que / se decidió que". Ambas son esenciales para hablar de planes, decisiones laborales y cambios de vida en japonés B1.',
  lead: 'Aprende a distinguir ことにする (decisión propia) de ことになる (resultado externo o acordado) para expresar planes y cambios con precisión.',
  outcomes: [
    'Usar ことにした para anunciar decisiones personales',
    'Usar ことになった para comunicar resultados externos o acuerdos',
    'Combinar ことにしている para hábitos y políticas personales',
    'Distinguir el matiz de responsabilidad entre las dos formas',
  ],

  guide: {
    goal: 'Expresar decisiones personales (ことにする) y resultados o decisiones externas (ことになる) con el matiz correcto.',
    model: '日本に行くことにした。(Nihon ni iku koto ni shita.) — Decidí ir a Japón. / 来月転勤することになった。(Raigetu tenkō suru koto ni natta.) — Resultó que me trasladan el mes que viene.',
    formula: 'Verbo [forma diccionario / negativa] + ことにする / ことになる',
    decisions: [
      'ことにした = decisión personal y voluntaria: yo decidí → el sujeto tiene control',
      'ことになった = resultado, acuerdo o decisión externa: la situación resultó en → el sujeto no decide solo',
      'ことにしている = hábito o política personal mantenida: "tengo la norma de / acostumbro a"',
      'ことになっている = regla establecida, norma vigente: "se ha decidido que / está establecido que"',
      'Forma negativa: 〜ないことにする (decidir no hacer), 〜ないことになる (resultar que no se hace)',
    ],
    table: [
      ['Estructura', 'Agente de decisión', 'Ejemplo'],
      ['〜ことにした', 'Yo decidí (voluntad propia)', '海外に引っ越すことにした'],
      ['〜ことになった', 'Externo / acuerdo / resultado', '海外転勤することになった'],
      ['〜ことにしている', 'Hábito/política personal', '毎日日記を書くことにしている'],
      ['〜ことになっている', 'Regla / norma establecida', '会議は月曜日にあることになっている'],
    ],
    mistakes: [
      '会社が私を転勤させることにした ❌ (raro) — para decisiones de empresa usa ことになった: 転勤することになった ✓.',
      '「毎日運動することにした」❌ para un hábito en curso — usa ことにしている ✓ (política activa, no decisión puntual).',
      'No confundir con ことができる (poder hacer): 泳ぐことができる ≠ 泳ぐことにした.',
    ],
  },

  seo: [
    {
      heading: '¿Cuál es la diferencia entre ことにする y ことになる?',
      paragraphs: [
        'La distinción clave es quién toma la decisión. ことにする señala que YO tomé la decisión voluntariamente. ことになる señala que la situación resultó así, por factores externos, por acuerdo mutuo, o porque así quedó establecido.',
        'Este contraste es culturalmente muy importante en japonés: decir ことになった en lugar de ことにした es una forma cortés de distanciar al hablante de la decisión, especialmente en contextos laborales o familiares donde no se quiere asumir responsabilidad individual.',
      ],
    },
    {
      heading: 'Cómo construir ことにする y ことになる',
      paragraphs: [
        'La construcción es: verbo en forma diccionario + ことにする/ことになる. Para decisiones negativas: verbo negativa + ことにする/ことになる.',
        '例文: 毎日日本語を勉強することにした (decidí estudiar japonés todos los días). 来月から在宅勤務することになった (resultó que desde el mes que viene trabajaré desde casa). タバコをやめることにした (decidí dejar de fumar). 会議は来週に延期することになった (se decidió posponer la reunión a la semana que viene).',
      ],
    },
    {
      heading: 'ことにしている: hábitos y normas personales',
      paragraphs: [
        'La forma ことにしている (presente continuo de ことにする) expresa un hábito deliberado que uno mantiene activamente: "tengo la norma de / acostumbro a hacer X conscientemente".',
        '例: 毎朝ニュースを聞くことにしている (tengo como hábito escuchar las noticias cada mañana). お酒は飲まないことにしている (tengo la norma de no beber alcohol). Esta forma es muy útil para hablar de disciplina personal y rutinas conscientes.',
      ],
    },
    {
      heading: 'ことになっている: reglas y acuerdos establecidos',
      paragraphs: [
        'ことになっている describe normas vigentes, reglas acordadas o situaciones que "están programadas": "está establecido que / se supone que".',
        '例: この学校では制服を着ることになっている (en esta escuela está establecido que se usa uniforme). 明日9時に会うことになっている (está acordado que nos vemos a las 9 mañana). Es perfecto para describir reglas de lugares o acuerdos previos.',
      ],
    },
    {
      heading: 'Uso en contextos laborales y formales',
      paragraphs: [
        'En el trabajo japonés, ことになった es extremadamente frecuente para anunciar cambios: 来月大阪支社に異動することになりました (resultó que el mes que viene me traslado a la oficina de Osaka). Este uso mitiga la responsabilidad personal y suena más humilde.',
        'ことにしました (forma formal de ことにした) se usa en comunicaciones oficiales: ご提案をお断りすることにしました (hemos decidido rechazar su propuesta). La forma formal -ました añade cortesía.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Contraste ことにする (agencia propia) vs ことになる (resultado externo). Esencial para contextos laborales.',
    graphicPrompt: 'Dos caminos: uno con flecha desde "YO" (ことにする) y otro desde "SITUACIÓN" (ことになる).',
    scene: [
      ['日本に留学することにした。(Nihon ni ryūgaku suru koto ni shita.)', 'Decidí estudiar en Japón.'],
      ['来月転勤することになった。(Raigetsu tenkō suru koto ni natta.)', 'Resultó que me trasladan el mes que viene.'],
      ['お酒をやめることにしました。(Osake wo yameru koto ni shimashita.)', 'Decidí dejar de beber.'],
      ['毎日30分歩くことにしている。(Mainichi sanjuppun aruku koto ni shite iru.)', 'Tengo como hábito caminar 30 minutos al día.'],
      ['会議は金曜日にすることになった。(Kaigi wa kin\'yōbi ni suru koto ni natta.)', 'Se acordó que la reunión será el viernes.'],
      ['この会社では残業しないことになっている。(Kono kaisha de wa zangyō shinai koto ni natte iru.)', 'En esta empresa está establecido que no se hace horas extra.'],
      ['彼女と結婚することにした。(Kanojo to kekkon suru koto ni shita.)', 'Decidí casarme con ella.'],
      ['プロジェクトが中止になることになった。(Purojekuto ga chūshi ni naru koto ni natta.)', 'Resultó que el proyecto se cancela.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['ことにした vs ことになった', 'ことにしている (hábito)', 'ことになっている (norma)'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Decisión o resultado externo',
        tag: 'Opción múltiple',
        intro: 'Elige ことにした o ことになった según quién tome la decisión.',
        type: 'choice',
        items: [
          {
            scene: 'Decisión personal',
            lines: [['', '来年、大学院に進学___。(Yo mismo decidí ir a la maestría el año que viene.)']],
            options: ['することにした', 'することになった', 'することにしている', 'することになっている'],
            answer: 'することにした',
            explain: 'Decisión voluntaria propia: ことにした. El hablante eligió conscientemente ir a la maestría.',
          },
          {
            scene: 'Traslado laboral',
            lines: [['', '会社の都合で、来月東京に転勤___。(Por razones de la empresa, resultó que me trasladan a Tokio el mes que viene.)']],
            options: ['することになった', 'することにした', 'することにしている', 'することになっている'],
            answer: 'することになった',
            explain: 'Decisión externa (la empresa): ことになった. El hablante no eligió, le informaron.',
          },
          {
            scene: 'Hábito personal',
            lines: [['', '健康のために、毎日野菜を食べる___。(Tengo como hábito comer verduras todos los días por salud.)']],
            options: ['ことにしている', 'ことになっている', 'ことにした', 'ことになった'],
            answer: 'ことにしている',
            explain: 'Hábito personal mantenido activamente: ことにしている (forma continua de ことにする).',
          },
          {
            scene: 'Regla de la empresa',
            lines: [['', 'この会社では、会議の前にレポートを提出する___。(En esta empresa, está establecido entregar el reporte antes de la reunión.)']],
            options: ['ことになっている', 'ことにしている', 'ことになった', 'ことにした'],
            answer: 'ことになっている',
            explain: 'Norma establecida (de la empresa): ことになっている (estado continuo de ことになる).',
          },
          {
            scene: 'Resolución personal',
            lines: [['', '今年からSNSを見る時間を減らす___。(Decidí reducir el tiempo en redes sociales desde este año.)']],
            options: ['ことにした', 'ことになった', 'ことにしている', 'ことになっている'],
            answer: 'ことにした',
            explain: 'Resolución propia y voluntaria: ことにした.',
          },
          {
            scene: 'Acuerdo de grupo',
            lines: [['', 'チームで話し合って、新しいシステムを導入する___。(Tras discutirlo en equipo, se acordó implementar el nuevo sistema.)']],
            options: ['ことになった', 'ことにした', 'ことになっている', 'ことにしている'],
            answer: 'ことになった',
            explain: 'Resultado de acuerdo grupal: ことになった. Aunque hubo discusión, el resultado se presenta como externo.',
          },
          {
            scene: 'Norma de colegio',
            lines: [['', 'この学校では携帯を使わない___。(En esta escuela está establecido no usar el móvil.)']],
            options: ['ことになっている', 'ことにしている', 'ことになった', 'ことにした'],
            answer: 'ことになっている',
            explain: 'Regla institucional vigente: ことになっている.',
          },
          {
            scene: 'Decisión de pareja',
            lines: [['', '二人で話し合って、来年結婚する___。(Hablándolo entre los dos, decidimos casarnos el año que viene.)']],
            options: ['ことにした', 'ことになった', 'ことにしている', 'ことになっている'],
            answer: 'ことにした',
            explain: 'Decisión conjunta pero voluntaria y personal: ことにした (ambos decidieron activamente).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Combinaciones con contexto',
        tag: '2 espacios',
        intro: 'Completa con la forma correcta de ことにする o ことになる.',
        type: 'dual',
        items: [
          {
            scene: 'Cambios de vida',
            lines: [['', '健康のために、毎日運動する[[0]]。また、甘いものを食べない[[1]]。']],
            blanks: [
              { options: ['ことにした', 'ことになった', 'ことにしている', 'ことになっている'], answer: 'ことにした', explain: 'Decisión personal sobre ejercicio: ことにした.' },
              { options: ['ことにした', 'ことになった', 'ことにしている', 'ことになっている'], answer: 'ことにした', explain: 'Decisión personal de no comer dulces: ことにした. Ambas son decisiones voluntarias propias.' },
            ],
          },
          {
            scene: 'Noticias de trabajo',
            lines: [['', '先日上司に呼ばれて、来月から部長に昇進する[[0]]。新しいオフィスに移る[[1]]と聞いた。']],
            blanks: [
              { options: ['ことになった', 'ことにした', 'ことになっている', 'ことにしている'], answer: 'ことになった', explain: 'Noticia de ascenso comunicada por la empresa: ことになった.' },
              { options: ['ことになった', 'ことにした', 'ことになっている', 'ことにしている'], answer: 'ことになった', explain: 'Cambio de oficina también decidido externamente: ことになった.' },
            ],
          },
          {
            scene: 'Mis normas personales',
            lines: [['', '私は寝る前にスマホを見ない[[0]]。朝は必ずコーヒーを飲む[[1]]。']],
            blanks: [
              { options: ['ことにしている', 'ことになっている', 'ことにした', 'ことになった'], answer: 'ことにしている', explain: 'Norma personal mantenida: ことにしている (hábito activo, no una decisión puntual).' },
              { options: ['ことにしている', 'ことになっている', 'ことにした', 'ことになった'], answer: 'ことにしている', explain: 'Otro hábito personal deliberado: ことにしている.' },
            ],
          },
          {
            scene: 'Reglas del dormitorio',
            lines: [['', 'このマンションでは、ペットを飼わない[[0]]。夜10時以降は音楽を流さない[[1]]。']],
            blanks: [
              { options: ['ことになっている', 'ことにしている', 'ことになった', 'ことにした'], answer: 'ことになっている', explain: 'Regla del edificio: ことになっている (norma establecida).' },
              { options: ['ことになっている', 'ことにしている', 'ことになった', 'ことにした'], answer: 'ことになっている', explain: 'Otra norma del edificio: ことになっている.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Diario de cambios',
        tag: 'Texto guiado',
        intro: 'Completa el diario de Yuki usando la forma correcta de ことにする o ことになる.',
        type: 'guidedText',
        scene: 'Yuki escribe en su diario sobre cambios en su vida.',
        text: '今日、大きな決断をした。来年からカナダに語学留学[[0]]。会社にも報告したら、上司が驚いて、「実は来月から君にプロジェクトリーダーをやってもらう[[1]]」と言われた。困ったが、留学は絶対に行くと決めていたので、プロジェクトが終わったら出発する[[2]]。健康のために、今日から毎日英語の勉強と日本語の復習を続ける[[3]]。カフェでお金を使いすぎていたので、今月からコーヒーは家で飲む[[4]]。新しい生活に向けて、少しずつ準備している。来月には荷物をまとめる[[5]]になっている。楽しみだ。',
        blanks: [
          { options: ['することにした', 'することになった', 'することにしている', 'することになっている'], answer: 'することにした', explain: 'Decisión personal de estudiar en Canadá: ことにした.' },
          { options: ['ことになった', 'ことにした', 'ことになっている', 'ことにしている'], answer: 'ことになった', explain: 'El jefe le informa de una decisión de la empresa: ことになった.' },
          { options: ['ことにした', 'ことになった', 'ことにしている', 'ことになっている'], answer: 'ことにした', explain: 'Decisión de salir después del proyecto: ことにした (decisión propia).' },
          { options: ['ことにしている', 'ことになっている', 'ことにした', 'ことになった'], answer: 'ことにしている', explain: 'Hábito deliberado que mantiene actualmente: ことにしている.' },
          { options: ['ことにした', 'ことになった', 'ことにしている', 'ことになっている'], answer: 'ことにした', explain: 'Decisión de ahorrar bebiendo café en casa: ことにした.' },
          { options: ['ことになっている', 'ことにしている', 'ことになった', 'ことにした'], answer: 'ことになっている', explain: 'Plan ya acordado/programado para el futuro: ことになっている.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe la forma correcta',
        tag: 'Texto libre',
        intro: 'Escribe la forma gramaticalmente correcta según el contexto dado.',
        type: 'freeText',
        scene: 'Completa las oraciones con ことにした、ことになった、ことにしている、o ことになっている.',
        text: '私は健康のために毎日歩く[[0]]。先週、会社から来月大阪に転勤する[[1]]と連絡があった。自分では驚いたが、どうにかなると思い、引っ越しの準備をする[[2]]。このアパートでは深夜に洗濯機を使わない[[3]]。来年の目標として、日本語能力試験N2に合格する[[4]]。',
        blanks: [
          { answer: 'ことにしている', accepted: ['ことにしている', 'ことにした'], explain: 'Hábito personal mantenido: ことにしている. (ことにした también sería aceptable si quieres enfatizar la decisión inicial.)' },
          { answer: 'ことになった', accepted: ['ことになった', 'ことになりました'], explain: 'Decisión externa de la empresa: ことになった.' },
          { answer: 'ことにした', accepted: ['ことにした', 'ことにしました'], explain: 'Decisión personal de preparar la mudanza: ことにした.' },
          { answer: 'ことになっている', accepted: ['ことになっている', 'ことになっています'], explain: 'Norma del apartamento: ことになっている.' },
          { answer: 'ことにした', accepted: ['ことにした', 'ことにしました'], explain: 'Meta/decisión personal para el año próximo: ことにした.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción con contexto',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando ことにする o ことになる.',
        type: 'write',
        items: [
          {
            scene: 'Tu decisión reciente',
            prompt: 'Escribe una decisión que tomaste recientemente para mejorar tu vida (ことにした).',
            answer: '健康のために、毎日30分運動することにした。',
            accepted: ['ことにした', 'ことにしました'],
            explain: 'Ejemplo: 今年から早起きすることにした。/ 甘いものを減らすことにした。',
          },
          {
            scene: 'Noticia laboral o escolar',
            prompt: 'Escribe una situación donde alguien te informó de un cambio (ことになった).',
            answer: '来月から新しいチームに移ることになった。',
            accepted: ['ことになった', 'ことになりました'],
            explain: 'Ejemplo: 学校が来年から新しいカリキュラムになることになった。/ 試験の日程が変わることになった。',
          },
          {
            scene: 'Regla o norma',
            prompt: 'Describe una regla de tu trabajo, escuela o casa (ことになっている).',
            answer: 'この学校では、授業中に携帯を使わないことになっている。',
            accepted: ['ことになっている', 'ことになっています'],
            explain: 'Ejemplo: 会社では9時までに出勤することになっている。',
          },
          {
            scene: 'Tu hábito personal',
            prompt: 'Describe un hábito deliberado que mantienes actualmente (ことにしている).',
            answer: '毎晩寝る前に10分間読書することにしている。',
            accepted: ['ことにしている', 'ことにしています'],
            explain: 'Ejemplo: 週末は料理をすることにしている。/ お菓子は食べないことにしている。',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Vida en Japón',
        tag: 'Producción libre',
        intro: 'Imagina que empiezas a vivir en Japón. Escribe 3 oraciones sobre decisiones y situaciones usando ことにする/ことになる.',
        type: 'write',
        items: [
          {
            scene: 'Tu decisión al llegar',
            prompt: 'Escribe algo que decidiste hacer desde que llegaste a Japón (ことにした).',
            answer: '日本に来てから、毎日日本語で日記を書くことにした。',
            accepted: ['ことにした', 'ことにしました'],
            explain: 'Usa ことにした para tus decisiones voluntarias: 毎日〜することにした.',
          },
          {
            scene: 'Cambio externo',
            prompt: 'Escribe algo que te informaron sin que tú lo decidieras (ことになった).',
            answer: '来月から別のアパートに引っ越すことになった。',
            accepted: ['ことになった', 'ことになりました'],
            explain: 'Usa ことになった para resultados externos: 〜することになった.',
          },
          {
            scene: 'Tu norma personal',
            prompt: 'Escribe un hábito que mantienes conscientemente en Japón (ことにしている).',
            answer: '毎朝コンビニでコーヒーを買わないことにしている。',
            accepted: ['ことにしている', 'ことにしています'],
            explain: 'Usa ことにしている para políticas personales activas.',
          },
        ],
      },
    ],
  },
}

export default topic
