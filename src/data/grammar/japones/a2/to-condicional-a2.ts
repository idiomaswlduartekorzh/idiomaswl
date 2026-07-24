import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'to-condicional-a2',
  order: '14',
  color: '#dc2626',
  category: 'Condicional',
  level: 'A2',
  title: '~と en japonés A2: condicional natural e inevitable',
  shortTitle: '~と (condicional natural)',
  metaTitle: 'Condicional と en japonés A2 — condiciones naturales, instrucciones, descubrimientos',
  description:
    '~と expresa condiciones que producen un resultado natural, inevitable o automático. Se usa con instrucciones ("gira a la derecha y verás..."), leyes naturales ("si hace frío, el agua se congela"), descubrimientos ("al abrir la puerta, encontré...") y hábitos automáticos. La cláusula principal NO puede llevar intención, deseo o mandatos del hablante (eso es ~たら o ~ば).',
  lead: '右に曲がると、駅があります: el condicional natural que indica resultados inevitables.',
  outcomes: [
    'Usar ~と para condiciones naturales e instrucciones',
    'Distinguir ~と de ~たら en contextos concretos',
    'Expresar descubrimientos con ~と',
    'Evitar el error de usar ~と con deseos o mandatos',
  ],

  guide: {
    goal: 'Usar ~と para condiciones que producen resultados naturales, automáticos o inevitables.',
    model: '春になると、桜が咲きます。(Cuando llega la primavera, florecen los cerezos.) / この道をまっすぐ行くと、駅があります。(Si sigues recto por esta calle, llegarás a la estación.)',
    formula: 'V dic. + と | い-adj + と | な-adj + だと | N + だと',
    decisions: [
      'Ley natural: "水は0度になると、氷になります" (el agua, cuando llega a 0°, se convierte en hielo)',
      'Instrucciones/direcciones: "ここを右に曲がると、見えます" (si giras aquí a la derecha, lo verás)',
      'Descubrimiento: "ドアを開けると、猫がいた" (cuando abrí la puerta, había un gato)',
      '❌ NO con mandatos: "右に曲がると、行ってください" ❌ → usar たら',
      '❌ NO con intención del hablante: "帰ると、電話します" ❌ → "帰ったら、電話します" ✓',
    ],
    table: [
      ['Contexto', 'Ejemplo', 'Español'],
      ['Ley natural', '春になると桜が咲く', 'Cuando llega la primavera, florecen los cerezos'],
      ['Instrucción', '右に曲がると駅がある', 'Si giras a la derecha, está la estación'],
      ['Descubrimiento', 'ドアを開けると猫がいた', 'Al abrir la puerta, había un gato'],
    ],
    mistakes: [
      '"帰ると、電話してください" ❌ → "帰ったら、電話してください" ✓ — ~と no acepta mandatos en la cláusula principal.',
      '"勉強すると、合格できたら" ❌ → と y たら no se mezclan en la misma oración condicional.',
      '"彼が来ると、一緒に行きたい" ❌ → と no acepta deseo (〜たい) del hablante en la principal.',
    ],
  },

  seo: [
    {
      heading: '~と: el condicional de lo natural e inevitable',
      paragraphs: [
        '~と se usa cuando la condición lleva inevitablemente al resultado, sin intervención del hablante. Es ideal para instrucciones de camino ("右に曲がると、公園があります" = si giras a la derecha, hay un parque), leyes de la naturaleza y descubrimientos repentinos.',
        'La restricción más importante: la cláusula principal no puede expresar voluntad, deseo, petición o mandato del hablante. Si necesitas decir "cuando llegues, llámame", usa ~たら, no ~と. Esta regla es lo que distingue ~と de los otros condicionales.',
      ],
    },
    {
      heading: 'と para descubrimientos: el uso narrativo',
      paragraphs: [
        'En narrativa, ~と expresa que al hacer algo se descubrió o sucedió algo. "玄関を開けると、子供が泣いていた" (cuando abrí la entrada, el niño estaba llorando) — el resultado es inesperado y automático desde la perspectiva narrativa.',
        'Este uso narrativo es muy frecuente en cuentos y descripciones de situaciones: "山を登ると、海が見えた" (cuando subí la montaña, se veía el mar). El tiempo de la cláusula principal suele ser pasado (〜た) cuando se describe un descubrimiento real.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '~と: resultado natural/inevitable. NO con mandatos o deseos del hablante.',
    graphicPrompt: 'Diagrama de flecha: causa → efecto inevitable.',
    scene: [
      ['春になると、桜が咲きます。', 'Cuando llega la primavera, florecen los cerezos.'],
      ['右に曲がると、駅があります。', 'Si giras a la derecha, está la estación.'],
      ['このボタンを押すと、ドアが開きます。', 'Si pulsas este botón, la puerta se abre.'],
      ['ドアを開けると、猫がいた。', 'Cuando abrí la puerta, había un gato.'],
      ['たくさん食べると、太ります。', 'Si comes mucho, engordas.'],
      ['0度になると、水は氷になります。', 'Cuando llega a 0°, el agua se convierte en hielo.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['V dic. + と (natural)', 'と para instrucciones', 'と para descubrimientos', 'と ≠ mandato/deseo'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'と o たら: elige el correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona と o たら según el tipo de condición.',
        type: 'choice',
        items: [
          {
            scene: 'Instrucción de dirección: si giras aquí a la derecha, verás el hospital.',
            lines: [['', 'ここを右に曲がる___、病院が見えます。']],
            options: ['と', 'たら', 'ば', 'なら'],
            answer: 'と',
            explain: '"曲がると" = instrucción de dirección, resultado natural. Típico uso de ~と.',
          },
          {
            scene: 'Cuando llegues a la estación, llámame (mandato).',
            lines: [['', '駅に着い___、電話して。']],
            options: ['たら', 'と', 'ば', 'なら'],
            answer: 'たら',
            explain: '"着いたら" = mandato en la cláusula principal → ~と no acepta mandatos.',
          },
          {
            scene: 'Ley natural: si bebes demasiado café, no puedes dormir.',
            lines: [['', 'コーヒーを飲みすぎる___、眠れません。']],
            options: ['と', 'たら', 'ば', 'なら'],
            answer: 'と',
            explain: '"飲みすぎると" = ley natural/inevitabilidad. Uso típico de ~と.',
          },
          {
            scene: 'Descubrimiento: cuando abrí la caja, había un regalo.',
            lines: [['', '箱を開ける___、プレゼントがあった。']],
            options: ['と', 'たら', 'ば', 'なら'],
            answer: 'と',
            explain: '"開けると" = descubrimiento. ~と en narración de hechos pasados.',
          },
          {
            scene: 'Si hubiera tiempo, quiero ir (deseo).',
            lines: [['', '時間がある___、行きたいです。']],
            options: ['たら', 'と', 'ば', 'なら'],
            answer: 'たら',
            explain: '"あったら" = deseo en la cláusula principal (行きたい) → ~と no puede usarse.',
          },
          {
            scene: 'Si pulsas este interruptor, la luz se enciende.',
            lines: [['', 'このスイッチを押す___、電気がつきます。']],
            options: ['と', 'たら', 'ば', 'なら'],
            answer: 'と',
            explain: '"押すと" = mecanismo automático. Resultado inevitable → ~と.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Instrucción y consecuencia',
        tag: '2 espacios',
        intro: 'Completa las instrucciones y consecuencias usando ~と.',
        type: 'dual',
        items: [
          {
            scene: 'Si giras a la izquierda, encontrarás el parque.',
            lines: [['', '左に[[0]]、公園が[[1]]。']],
            blanks: [
              { options: ['曲がると', '曲がったら', '曲がれば', '曲がるなら'], answer: '曲がると', explain: '"曲がると" = instrucción de dirección. Resultado natural → と.' },
              { options: ['あります', 'あるたら', 'あればいい', 'あったら'], answer: 'あります', explain: '"公園があります" = el parque está allí (resultado natural).' },
            ],
          },
          {
            scene: 'Si no duermes, te cansas. (ley natural)',
            lines: [['', '寝ない[[0]]、疲れ[[1]]。']],
            blanks: [
              { options: ['と', 'たら', 'ば', 'なら'], answer: 'と', explain: '"寝ないと" = ley natural: sin dormir → cansancio inevitable.' },
              { options: ['ます', 'たら', 'るなら', 'るとたら'], answer: 'ます', explain: '"疲れます" = resultado inevitable (presente habitual).' },
            ],
          },
          {
            scene: 'Cuando abrí la ventana, hacía mucho frío.',
            lines: [['', '窓を[[0]]、とても[[1]]。']],
            blanks: [
              { options: ['開けると', '開けたら', '開ければ', '開けるなら'], answer: '開けると', explain: '"開けると" = descubrimiento al abrir. Narración con と.' },
              { options: ['寒かった', '寒いたら', '寒くなる', '寒いと'], answer: '寒かった', explain: '"寒かった" = hacía frío (pasado, resultado del descubrimiento).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Instrucciones para llegar',
        tag: 'Texto guiado',
        intro: 'Completa las instrucciones de dirección usando ~と.',
        type: 'guidedText',
        scene: '駅から会社までの道を教えています。',
        text: '駅を出る[[0]]、まっすぐ行きます。信号を[[1]] 右に曲がる[[2]]、大きい橋があります。橋を渡る[[3]]、すぐ左に建物が[[4]]。そこを入る[[5]]、受付があります。',
        blanks: [
          { options: ['と', 'たら', 'ば', 'なら'], answer: 'と', explain: '"出ると / 曲がると / 渡ると / 入ると" = instrucciones de dirección → ~と para resultados naturales.' },
          { options: ['渡ると', '渡ったら', '渡れば', '渡るなら'], answer: '渡ると', explain: '"信号を渡ると" → la instrucción continúa con ~と.' },
          { options: ['見えます', '見えたら', '見えれば', '見えると'], answer: '見えます', explain: '"建物が見えます" = el edificio es visible (resultado natural).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con と',
        tag: 'Texto libre',
        intro: 'Sin opciones: completa el resultado natural de cada condición.',
        type: 'freeText',
        scene: 'と を使って結果を書いてください。',
        text: '右に曲がる[[0]] (と), 駅があります。 / たくさん練習する[[1]] (と), 上手になります。 / 春になる[[2]] (と), 暖かくなります。 / このボタンを押す[[3]] (と), 音が出ます。',
        blanks: [
          { answer: 'と', explain: '"右に曲がると" = instrucción de dirección, resultado natural.' },
          { answer: 'と', explain: '"練習すると" = ley de causa-efecto natural.' },
          { answer: 'と', explain: '"春になると" = cambio estacional inevitable.' },
          { answer: 'と', explain: '"押すと" = mecanismo automático.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Escribe condiciones naturales',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa usando ~と.',
        type: 'write',
        items: [
          {
            scene: 'Da instrucciones para llegar al supermercado.',
            prompt: '角を左に曲がる + スーパーが見える',
            answer: '角を左に曲がると、スーパーが見えます。',
            accepted: ['左に曲がると、スーパーがあります。'],
            explain: '"曲がると" = instrucción. Resultado natural con ~と.',
          },
          {
            scene: 'Ley natural: si no comes, te da hambre.',
            prompt: '食べない + お腹が空く',
            answer: '食べないと、お腹が空きます。',
            accepted: ['食事をしないと、お腹が空いてきます。'],
            explain: '"食べないと" = condición negativa. Resultado natural inevitable.',
          },
          {
            scene: 'Descubrimiento: cuando encendí el ordenador, había un mensaje.',
            prompt: 'パソコンをつける + メッセージがあった',
            answer: 'パソコンをつけると、メッセージがあった。',
            accepted: ['パソコンを開けると、メッセージが届いていた。'],
            explain: '"つけると" = descubrimiento narrativo. Cláusula principal en pasado.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Da instrucciones y describe consecuencias',
        tag: 'Escritura libre',
        intro: 'Escribe instrucciones de dirección o leyes naturales usando ~と.',
        type: 'write',
        items: [
          {
            scene: 'Explica cómo llegar a un lugar que conoces bien.',
            prompt: '知っている場所への行き方をと を使って説明してください。',
            answer: 'この通りをまっすぐ行くと、公園があります。公園を左に曲がると、スーパーが見えます。そのまま進むと、駅に着きます。',
            accepted: ['バス停を降りると、信号があります。信号を渡ると、学校が見えます。'],
            explain: '~と para instrucciones de dirección: resultado natural e inevitable en cada paso.',
          },
          {
            scene: 'Describe 3 leyes naturales o de causa-efecto con ~と.',
            prompt: '自然の法則や原因と結果をと を使って3つ書いてください。',
            answer: '水は100度になると、沸騰します。冬になると、気温が下がります。毎日運動すると、体が丈夫になります。',
            accepted: ['太陽が出ると、暖かくなります。雨が降ると、道が濡れます。'],
            explain: '~と para leyes naturales: el resultado siempre ocurre cuando la condición se cumple.',
          },
        ],
      },
    ],
  },
}

export default topic
