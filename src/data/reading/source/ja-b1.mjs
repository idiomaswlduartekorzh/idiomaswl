// Lectura — Japonés B1. Diez lecturas.
//
// Fuente de verdad. Los JSON se generan con `node scripts/build-reading-exercises.mjs --write`.
//
// Criterio del nivel
// -----------------
// Las diez cubren los 20 temas de gramática de japonés B1 —dos por lectura— y cada una
// arrastra un tema de A2. Banda: 500-650 CARACTERES y densidad de kanji del 28 al 45 %.
//
// En A1 hubo que frenar el kanji (máx. 12 %) y en A2 hubo que bajarlo a mano cinco veces
// porque escribir japonés natural tira hacia arriba. En B1 se acaba esa pelea: la banda
// coincide por fin con lo que sale al escribir de forma normal. Eso también es un dato del
// nivel: B1 es donde el japonés escrito deja de ser una versión frenada de sí mismo.
//
// B1 estrena lo que el japonés hace y las lenguas europeas no: el CAUSATIVO (させる) y el
// PASIVO DE PERJUICIO (られる), que permiten decir en un verbo que algo te lo hicieron o que
// algo te pasó y te fastidió. Y estrena las formas de matizar la certeza —はず, にちがいない,
// そう, かも, わけだ— que son las que separan afirmar de deducir.
//
// El furigana deja de ser obligatorio aquí (el guardián solo lo exige en A1 y A2), así que
// `furigana: false` no es un hueco: es lo que corresponde al nivel. El hueco del motor sigue
// abierto para A1 y A2, y está documentado en esos dos archivos.

const EARLIER = [
  'adverbios-frecuencia', 'arimasu-imasu', 'conjunciones', 'desu-masu',
  'estructura-sov-particulas', 'expresiones-cotidianas', 'hiragana-basico', 'i-keiyoshi',
  'interrogativos-ka', 'jikan-tiempo', 'katakana-basico', 'masu-kei-conjugacion',
  'na-keiyoshi', 'negacion-completa', 'numeros-contadores', 'particula-de-e',
  'particula-wa-ga', 'particula-wo-ni', 'tai-form', 'te-form-permission',
  'ageru-morau-kureru-a2', 'dake-shika-bakari-a2', 'deshou-a2', 'hikaku-a2',
  'kamoshirenai-a2', 'kanoukei-a2', 'mae-ni-ato-de-a2', 'n-desu-a2', 'nagara-a2',
  'nakereba-naranai-a2', 'noun-modification-a2', 'ta-koto-ga-aru-a2', 'tara-condicional-a2',
  'tari-tari-a2', 'te-form-sequence-a2', 'te-iru-a2', 'te-mo-ii-a2', 'to-condicional-a2',
  'to-omoimasu-a2', 'ukemi-a2',
]

const B1_GRAMMAR = [
  'bakari-b1', 'beki-b1', 'hazu-da-b1', 'hodo-b1', 'kamo-b1', 'koto-ni-suru-naru-b1',
  'monokara-b1', 'nakerebanaranai-b1', 'ni-chigainai-b1', 'noni-b1', 'shieki-saseru-b1',
  'sou-b1', 'tameni-b1', 'te-shimau-b1', 'tokoro-b1', 'toutsutsuaru-b1', 'ukemi-rareru-b1',
  'wake-da-b1', 'yooni-b1', 'you-ni-naru-b1',
]

export default {
  language: 'ja',
  variant: 'ja-JP',
  cefr: 'B1',
  displayLabel: 'Japonés B1',
  tutorLocales: ['es'],
  status: 'published',
  seriesId: 'japones-b1-lectura-10',
  jlpt: 'N3',
  mappingDisclaimer: {
    es: 'La equivalencia entre el MCER y el JLPT es aproximada: son dos escalas distintas, con exámenes distintos. B1 se sitúa alrededor del N3, pero no es una correspondencia oficial.',
  },
  allowedGrammar: [...EARLIER, ...B1_GRAMMAR],
  disallowedGrammar: ['keigo completo (尊敬語・謙譲語 sistemático)', 'japonés clásico', 'registro jurídico', 'dialectos regionales cerrados'],
  maxOutOfLevelVocabularyPercent: 6,
  inferenceBand: 'moderate',
  scriptSupport: { furigana: false, romanization: 'none', stressMarks: false, tokenizationMode: 'custom' },
  targetCanDo:
    'Puedes seguir un texto japonés largo escrito con kanji al uso normal, distinguir lo que alguien afirma de lo que deduce, y justificar una inferencia cruzando dos pasajes distintos.',
  assessor: 'Zhanna Korzh — revisión de lengua y pedagogía',
  assessedAt: '2026-08-18T00:00:00-05:00',
  levelNotes: 'Causativo させる, pasivo de perjuicio られる, matices de certeza (はず, にちがいない, そう, かも, わけだ), てしまう, ようになる. Sin keigo sistemático. Furigana no obligatorio en B1.',
  lastModified: '2026-08-18T00:00:00-05:00',
  review: {
    author: 'José David Duarte Silva',
    languageReviewer: 'Zhanna Korzh',
    pedagogyReviewer: 'Zhanna Korzh',
    reviewedAt: '2026-08-18T00:00:00-05:00',
    copyrightChecked: true,
    cultureChecked: true,
    aiAssisted: true,
    aiUseNote: 'Borrador asistido por IA, revisado y aprobado por Zhanna Korzh (lengua y pedagogía).',
    languageDecision: 'approved',
    pedagogyDecision: 'approved',
  },

  exercises: [
    // ---------------------------------------------------------------- 1
    {
      slug: 'sutete-shimatta-tegami',
      title: 'Las cartas que tiré',
      genre: 'relato familiar',
      topic: 'tres cajas confundidas en una mudanza',
      tags: ['japones b1', 'lectura', 'てしまう', 'わけだ'],
      intro: 'Cuarenta cajas y tres marcadas «papel viejo». No las abrió. Su madre tampoco se enfadó, y eso fue lo peor. Lectura de japonés B1.',
      mission: 'Averigua qué le enseñó su madre tres meses después.',
      seoTitle: 'Lectura de japonés B1: las cartas que tiré | WeLearn',
      seoDescription: 'Lee un relato en japonés B1 y practica てしまう y わけだ. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['te-shimau-b1', 'wake-da-b1', 'te-iru-a2'],
      text: `引っ越しの日、私は父の手紙を捨ててしまった。

段ボールが四十個あって、そのうち三個に「古い紙」と書かれていた。中身を確認しないで、業者に渡してしまった。二日後、母に聞かれて気づいた。

「お父さんの手紙、どこにあるの。」

私は答えられなかった。

父は十一年前に亡くなった。手紙は三十通ぐらいあったはずだ。母が結婚する前に、父が書いたものだ。母はそれを一度も私に見せなかったが、捨てるつもりもなかったわけだ。

すぐに業者に電話した。もう処分されていた。

母は怒らなかった。それが一番つらかった。怒られたほうが、ずっと楽だっただろう。母はただ「そう」と言って、台所に行った。それから二週間、その話は一度も出なかった。

三か月後、母が私に一枚の紙を見せた。父の字だった。

「一通だけ、財布に入れていたの」と母は言った。「三十年入れていたから、ぼろぼろになってしまったけど。」

紙は本当にぼろぼろだった。折り目のところが切れて、二つに分かれていた。読める字は半分ぐらいしか残っていない。

私はそれを見て、初めて泣いた。捨てた日ではなく、その日に泣いたわけだ。

母は言った。「あなたが捨てたのは紙よ。手紙じゃない。手紙はもう私の中にある。」

なぐさめだと思う。母は私を楽にするためにそう言ったのだろう。

でも、なぐさめでも言葉は言葉だ。私は今もその言葉を覚えているし、たぶん一生覚えているだろう。`,
      objectives: [
        'Usar てしまう para lo irreversible y lamentado: 捨ててしまった.',
        'Usar わけだ para presentar una conclusión lógica de lo dicho antes.',
        'Distinguir el momento del daño del momento en que se siente.',
      ],
      vocabulary: [
        { surface: '引っ越し', reading: 'ひっこし', gloss: 'mudanza' },
        { surface: '段ボール', reading: 'だんボール', gloss: 'caja de cartón' },
        { surface: '中身', reading: 'なかみ', gloss: 'contenido' },
        { surface: '業者', reading: 'ぎょうしゃ', gloss: 'empresa de servicios, transportista' },
        { surface: '処分', reading: 'しょぶん', gloss: 'eliminación, destrucción' },
        { surface: '財布', reading: 'さいふ', gloss: 'cartera, billetera' },
        { surface: '折り目', reading: 'おりめ', gloss: 'doblez' },
        { surface: 'なぐさめ', reading: 'なぐさめ', gloss: 'consuelo' },
      ],
      culturalNote: 'Las empresas de mudanzas japonesas ofrecen retirar y destruir lo que se marque como desecho, y lo hacen en las cuarenta y ocho horas siguientes. No hay margen para rectificar.',
      spanishSpeakerNote: 'てしまう añade que algo se completó y que pesa: 捨ててしまった no es solo «tiré», es «acabé tirando y ya no tiene arreglo». Y わけだ presenta una conclusión: 泣いたわけだ es «así que fue ese día cuando lloré».',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué cuenta el relato?',
          options: [['tarde','Que tiró las cartas de su padre y el golpe le llegó tres meses después, con la que sobrevivió'],['pelea','Una discusión con su madre por la mudanza'],['empresa','Un error de la empresa de mudanzas']],
          answer: 'tarde',
          evidence: '私はそれを見て、初めて泣いた。捨てた日ではなく、その日に泣いたわけだ。',
          correct: 'Sí, y el わけだ señala justamente ese desfase.',
          incorrect: 'Su madre no se enfadó y el error fue suyo, no de la empresa. Busca cuándo lloró.',
          strategy: 'La forma わけだ cierra una deducción: lo que va delante es lo que el texto quiere que veas.' },
        { type: 'detail', skill: 'detail', prompt: '¿Cuántas cajas iban marcadas como «papel viejo»?',
          options: [['tres','Tres de cuarenta'],['cuarenta','Las cuarenta'],['treinta','Treinta']],
          answer: 'tres',
          evidence: '段ボールが四十個あって、そのうち三個に「古い紙」と書かれていた。',
          correct: 'Correcto, y ese そのうち es lo que hace el error tan pequeño y tan grave.',
          incorrect: 'Las cuarenta son el total y las treinta, las cartas. Busca la frase con そのうち.',
          strategy: 'La expresión そのうち introduce una parte del total: lee las dos cifras juntas.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa 処分されていた?',
          options: [['destruido','Que ya lo habían destruido'],['guardado','Que lo tenían guardado'],['vendido','Que lo habían vendido']],
          answer: 'destruido',
          evidence: 'すぐに業者に電話した。もう処分されていた。',
          correct: 'Eso es, y el もう indica que ya era tarde.',
          incorrect: 'Llama para recuperarlas y no puede. El adverbio もう marca que ya no hay vuelta atrás.',
          strategy: 'El adverbio もう con pasiva indica que la acción ya está consumada.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué dice que lo peor fue que su madre no se enfadara?',
          options: [['culpa','Porque el enfado le habría aliviado la culpa y el silencio se la dejó entera'],['sorda','Porque su madre no se enteró bien'],['tarde','Porque se enfadó más tarde']],
          answer: 'culpa',
          evidence: '母は怒らなかった。それが一番つらかった。怒られたほうが、ずっと楽だっただろう。',
          correct: 'Sí, y él mismo lo dice con un condicional: haberle regañado habría sido más llevadero.',
          incorrect: 'Su madre pregunta directamente por las cartas y nunca se enfada. Lee las tres frases seguidas.',
          strategy: 'La construcción …ほうが楽だっただろう compara con una situación que no ocurrió.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: su madre le había enseñado esas cartas alguna vez antes de la mudanza.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'faux',
          evidence: '母はそれを一度も私に見せなかったが、捨てるつもりもなかったわけだ。',
          correct: 'Falso: ni una sola vez, aunque tampoco pensaba tirarlas.',
          incorrect: 'Busca la frase con 一度も. Es una negación reforzada.',
          strategy: 'La expresión 一度も…ない niega por completo: ni una vez.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena el relato.',
          options: [['p1','La mudanza y las tres cajas entregadas sin abrir'],['p2','La pregunta de su madre dos días después'],['p3','Llama a la empresa y ya está todo destruido'],['p4','Tres meses después, la carta de la cartera']],
          answer: ['p1','p2','p3','p4'],
          evidence: '引っ越しの日、私は父の手紙を捨ててしまった… 二日後、母に聞かれて気づいた… すぐに業者に電話した… 三か月後、母が私に一枚の紙を見せた。',
          correct: 'Correcto: error, descubrimiento, confirmación y desenlace.',
          incorrect: 'Guíate por 二日後 y 三か月後.',
          strategy: 'Las marcas …後 sitúan cada escena respecto a la anterior.' },
      ],
      production: { prompt: 'Escribe 12–15 frases en japonés sobre algo que perdiste o rompiste sin querer. Usa cuatro veces てしまう y dos veces わけだ.', minWords: 180, maxWords: 420,
        hints: ['引っ越しの日、…を捨ててしまった。','中身を確認しないで渡してしまった。','母は怒らなかった。','…わけだ。'] },
    },
    // ---------------------------------------------------------------- 2
    {
      slug: 'sumimasen-o-kazoete-mita',
      title: 'Conté mis «perdones»',
      genre: 'experimento personal',
      topic: 'setenta y dos disculpas en un solo día',
      tags: ['japones b1', 'lectura', 'ようになる', 'ことにする'],
      intro: 'Setenta y dos el primer día, sesenta y ocho el segundo, ochenta y uno el tercero. Decidió cambiar la mitad. Lectura de japonés B1.',
      mission: 'Averigua qué cambió en los demás cuando cambió de palabra.',
      seoTitle: 'Lectura de japonés B1: conté mis «perdones» | WeLearn',
      seoDescription: 'Lee un experimento personal en japonés B1 y practica ようになる y ことにする. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['you-ni-naru-b1', 'koto-ni-suru-naru-b1', 'tara-condicional-a2'],
      text: `日本に来て六年、一日に何回「すみません」と言っているか、数えてみることにした。

一日目、七十二回。二日目、六十八回。三日目、八十一回。

多すぎると思った。

もちろん、日本語の「すみません」は謝罪だけではない。「ありがとう」の代わりにも使うし、人を呼ぶときにも使う。それは分かっている。

でも、私の「すみません」の半分ぐらいは、本当の謝罪だった。何も悪いことをしていないのに、謝っていた。

エレベーターで人の前を通るとき。会議で質問するとき。店で商品の場所を聞くとき。

コロンビアにいたとき、私はこんなに謝らなかった。だから、これは私の性格ではなくて、日本で身につけたものだ。

去年の四月、実験をすることにした。本当に悪いことをしたときだけ謝る。ほかのときは「ありがとうございます」に変える。

最初は難しかった。口が勝手に「すみません」と言ってしまう。頭で決めても、体が先に動く。

三か月ぐらいで、少しずつ言えるようになった。半年たったら、自然に言えるようになった。

面白いのは、周りの反応が変わったことだ。「ありがとうございます」と言うと、相手が少し笑う。「すみません」と言っても、だれも笑わない。

同じ場面、同じ相手、違う言葉。それだけで空気が変わる。

今は一日に「すみません」を二十回ぐらい言っている。七十二回よりずっと少ない。

でも、まだ多いかもしれない。来年また数えてみることにした。`,
      objectives: [
        'Usar ようになる para un cambio gradual que se consigue.',
        'Usar ことにする para una decisión propia y ことになる para lo decidido desde fuera.',
        'Leer un experimento con sus cifras y su conclusión.',
      ],
      vocabulary: [
        { surface: '謝罪', reading: 'しゃざい', gloss: 'disculpa formal' },
        { surface: '代わり', reading: 'かわり', gloss: 'en lugar de' },
        { surface: '性格', reading: 'せいかく', gloss: 'carácter, forma de ser' },
        { surface: '身につけた', reading: 'みにつけた', gloss: 'adquirido, aprendido con el uso' },
        { surface: '勝手に', reading: 'かってに', gloss: 'por su cuenta, sin querer' },
        { surface: '反応', reading: 'はんのう', gloss: 'reacción' },
        { surface: '場面', reading: 'ばめん', gloss: 'situación, escena' },
        { surface: '空気', reading: 'くうき', gloss: 'aire, ambiente' },
      ],
      culturalNote: 'すみません cubre en japonés la disculpa, el agradecimiento y la llamada de atención. Que un extranjero lo use de más no es un error gramatical: es un exceso de una función sobre las otras.',
      spanishSpeakerNote: 'ことにする es «decidir yo»: 実験をすることにした. Y ようになる marca un cambio conseguido con el tiempo: 言えるようになった es «llegué a poder decirlo», no «lo dije».',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué descubrió el narrador?',
          options: [['ambiente','Que cambiar «perdón» por «gracias» en las mismas situaciones cambia el ambiente'],['gramatica','Que estaba usando mal la gramática de すみません'],['numero','Que hablaba demasiado en el trabajo']],
          answer: 'ambiente',
          evidence: '同じ場面、同じ相手、違う言葉。それだけで空気が変わる。',
          correct: 'Sí, y lo formula con tres elementos idénticos y uno distinto.',
          incorrect: 'Reconoce que すみません tiene varios usos legítimos. Busca la frase de los tres «mismos».',
          strategy: 'Una frase con estructura triple y un elemento cambiado señala exactamente qué varió.' },
        { type: 'detail', skill: 'detail', prompt: '¿Cuánto tardó en decirlo de forma natural?',
          options: [['medio','Medio año'],['tres','Tres meses'],['ano','Un año']],
          answer: 'medio',
          evidence: '三か月ぐらいで、少しずつ言えるようになった。半年たったら、自然に言えるようになった。',
          correct: 'Correcto: a los tres meses ya podía, a los seis salía solo.',
          incorrect: 'A los tres meses solo lo conseguía poco a poco. Busca 自然に.',
          strategy: 'El texto distingue poder hacer algo de hacerlo con naturalidad: son dos plazos.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa 身につけた?',
          options: [['adquirido','Algo que adquirió con el uso, no con lo que nació'],['puesto','Ropa que se puso'],['heredado','Algo heredado de su familia']],
          answer: 'adquirido',
          evidence: 'これは私の性格ではなくて、日本で身につけたものだ。',
          correct: 'Eso es: se opone expresamente a su carácter.',
          incorrect: 'La frase lo contrapone a 性格: no es cómo es, es lo que aprendió.',
          strategy: 'La construcción …ではなくて、… te da el sentido por contraste con lo descartado.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué al principio le costaba tanto?',
          options: [['cuerpo','Porque la palabra le salía sola antes de que la cabeza decidiera'],['idioma','Porque no sabía decir «gracias» en japonés'],['grosero','Porque le parecía grosero no disculparse']],
          answer: 'cuerpo',
          evidence: '口が勝手に「すみません」と言ってしまう。頭で決めても、体が先に動く。',
          correct: 'Sí, y lo dice con dos frases que separan la decisión del reflejo.',
          incorrect: 'Sabe decir «gracias» —lo usa como sustituto— y no lo llama grosero. Lee las dos frases.',
          strategy: 'Si el texto opone 頭 y 体, está separando la voluntad del automatismo.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: ha decidido volver a contar el año que viene.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'vrai',
          evidence: 'でも、まだ多いかもしれない。来年また数えてみることにした。',
          correct: 'Verdadero, y lo dice con la misma forma con la que empezó: ことにした.',
          incorrect: 'Busca la última frase del texto. Repite la construcción del principio.',
          strategy: 'Si el texto abre y cierra con la misma construcción, comprueba las dos.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena el experimento.',
          options: [['p1','Cuenta cuántas veces lo dice en tres días'],['p2','Distingue los usos reales de las disculpas innecesarias'],['p3','En abril decide cambiar la mitad por «gracias»'],['p4','A los seis meses le sale solo y nota la reacción']],
          answer: ['p1','p2','p3','p4'],
          evidence: '数えてみることにした… 私の「すみません」の半分ぐらいは、本当の謝罪だった… 去年の四月、実験をすることにした… 半年たったら、自然に言えるようになった。',
          correct: 'Correcto: medición, análisis, decisión y resultado.',
          incorrect: 'Guíate por 去年の四月, 三か月ぐらいで y 半年たったら.',
          strategy: 'Un texto de experimento va de los datos a la decisión y de ahí al resultado.' },
      ],
      production: { prompt: 'Escribe 12–15 frases en japonés sobre una costumbre tuya que decidiste cambiar. Usa tres veces ことにする y tres veces ようになる.', minWords: 180, maxWords: 420,
        hints: ['数えてみることにした。','実験をすることにした。','少しずつ言えるようになった。','半年たったら、自然に…'] },
    },
    // ---------------------------------------------------------------- 3
    {
      slug: 'kare-wa-konai-hazu-datta',
      title: 'No tenía que haber venido',
      genre: 'escena de oficina',
      topic: 'un compañero que deja de ir a comer',
      tags: ['japones b1', 'lectura', 'はずだ', 'にちがいない'],
      intro: 'Dejó de comer con ellos y todos dedujeron algo distinto. Las tres deducciones eran razonables y las tres estaban mal. Lectura de japonés B1.',
      mission: 'Averigua cuál era la razón real y quién la supo.',
      seoTitle: 'Lectura de japonés B1: no tenía que haber venido | WeLearn',
      seoDescription: 'Lee una escena de oficina en japonés B1 y practica はずだ y にちがいない. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['hazu-da-b1', 'ni-chigainai-b1', 'deshou-a2'],
      text: `中村さんは四年間、毎日私たちと昼ご飯を食べていた。去年の九月から、急に来なくなった。

理由は言わなかった。だれも聞かなかった。

私たちは勝手に考えた。

田中さんは「転職するにちがいない」と言った。転職活動をしている人は、昼休みに面接の電話をするからだ。ありそうな話だった。

森さんは「奥さんと何かあったはずだ」と言った。中村さんは前は毎日弁当を持って来ていたのに、九月からコンビニになったからだ。これもありそうだった。

私は「体の調子が悪いにちがいない」と思った。九月に十分ぐらい早く帰る日が三回あったからだ。

三人とも自信があった。三人とも間違っていた。

十二月の忘年会で、中村さんが自分から話した。

去年の八月、近くの高校の前を通ったとき、生徒が三人、道に座って弁当を食べていた。中村さんはそれを見て、自分が高校生のとき、昼休みに一人で食べていたことを思い出したそうだ。

それで、九月から一人で公園に行くことにした。理由はそれだけだ。

「一人で食べたかったんです。だれも嫌いじゃないです」と中村さんは言った。「でも、そう言うと、みんな心配するでしょう。だから言いませんでした。」

そのとおりだった。私たちは心配したはずだ。そして、たぶん理由を聞き続けただろう。

今、中村さんは週に二回、私たちと食べる。ほかの三日は公園にいる。

だれも聞かない。それでいいわけだ。`,
      objectives: [
        'Usar はずだ para lo que debería ser según lo que se sabe.',
        'Usar にちがいない para una deducción con casi certeza.',
        'Comprobar que una deducción razonable puede estar equivocada.',
      ],
      vocabulary: [
        { surface: '転職', reading: 'てんしょく', gloss: 'cambio de empleo' },
        { surface: '面接', reading: 'めんせつ', gloss: 'entrevista de trabajo' },
        { surface: '調子', reading: 'ちょうし', gloss: 'estado, forma física' },
        { surface: '自信', reading: 'じしん', gloss: 'seguridad en uno mismo' },
        { surface: '忘年会', reading: 'ぼうねんかい', gloss: 'cena de fin de año de la empresa' },
        { surface: '生徒', reading: 'せいと', gloss: 'alumno de instituto' },
        { surface: '思い出した', reading: 'おもいだした', gloss: 'recordó' },
        { surface: '心配', reading: 'しんぱい', gloss: 'preocupación' },
      ],
      culturalNote: 'Comer con los compañeros es la norma en muchas oficinas japonesas, y salirse de ella se interpreta como una señal. El 忘年会 de diciembre es, en cambio, el momento en que se dicen cosas que no se dicen el resto del año.',
      spanishSpeakerNote: 'はずだ y にちがいない no son lo mismo: はずだ es «debería ser, según lo que sé», y にちがいない es «no puede ser otra cosa». El texto usa las dos para deducciones que resultan falsas.',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué muestra la escena?',
          options: [['equivocadas','Que tres deducciones razonables pueden fallar todas, y que la razón real era mucho más simple'],['enfermedad','Que Nakamura estaba enfermo'],['trabajo','Que Nakamura buscaba otro empleo']],
          answer: 'equivocadas',
          evidence: '三人とも自信があった。三人とも間違っていた … 「一人で食べたかったんです。」',
          correct: 'Sí, y las dos frases paralelas lo dicen sin adornos.',
          incorrect: 'Ni enfermedad ni cambio de empleo: las dos son hipótesis descartadas. Busca las dos frases con 三人とも.',
          strategy: 'Dos frases paralelas con el mismo sujeto y sentido opuesto son la clave del texto.' },
        { type: 'detail', skill: 'detail', prompt: '¿En qué se basó Mori para su deducción?',
          options: [['bento','En que dejó de traer fiambrera y pasó a comprar en el konbini'],['telefono','En que hacía llamadas al mediodía'],['salidas','En que salía antes del trabajo']],
          answer: 'bento',
          evidence: '中村さんは前は毎日弁当を持って来ていたのに、九月からコンビニになったからだ。',
          correct: 'Correcto: de ahí dedujo un problema en casa.',
          incorrect: 'Lo del teléfono es de Tanaka y lo de salir antes, del narrador. Busca la frase de Mori.',
          strategy: 'Cada personaje da su propia prueba: localiza quién habla antes de leer el dato.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué es un 忘年会?',
          options: [['cena','La cena de fin de año de la empresa'],['reunion','Una reunión de trabajo'],['despedida','Una despedida de un compañero']],
          answer: 'cena',
          evidence: '十二月の忘年会で、中村さんが自分から話した。',
          correct: 'Eso es: es en diciembre y es donde por fin se cuenta lo que no se dice.',
          incorrect: 'Es en diciembre y nadie se va de la empresa: Nakamura sigue comiendo con ellos.',
          strategy: 'Si el texto sitúa algo en diciembre y con toda la oficina, es la cena de fin de año.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué Nakamura no explicó su razón en septiembre?',
          options: [['preocupar','Porque decirlo habría preocupado a todos y le habrían seguido preguntando'],['verguenza','Porque le daba vergüenza su recuerdo del instituto'],['prohibido','Porque la empresa no permite comer fuera']],
          answer: 'preocupar',
          evidence: '「でも、そう言うと、みんな心配するでしょう。だから言いませんでした。」 … 私たちは心配したはずだ。',
          correct: 'Sí, y el narrador lo confirma después: habrían insistido.',
          incorrect: 'No habla de vergüenza ni de normas: come en el parque sin problema. Lee su explicación.',
          strategy: 'Si el narrador confirma la hipótesis del otro personaje, esa es la razón buena.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: ahora Nakamura come todos los días solo en el parque.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'faux',
          evidence: '今、中村さんは週に二回、私たちと食べる。ほかの三日は公園にいる。',
          correct: 'Falso: dos días con ellos y tres en el parque.',
          incorrect: 'Busca el penúltimo párrafo: reparte los cinco días de la semana.',
          strategy: 'Si el texto reparte una semana, cuenta los días antes de responder.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena la escena.',
          options: [['p1','En septiembre deja de comer con ellos'],['p2','Las tres hipótesis de los compañeros'],['p3','En la cena de diciembre lo cuenta él'],['p4','Ahora reparte la semana y nadie pregunta']],
          answer: ['p1','p2','p3','p4'],
          evidence: '去年の九月から、急に来なくなった… 田中さんは「転職するにちがいない」と言った… 十二月の忘年会で… 今、中村さんは週に二回、私たちと食べる。',
          correct: 'Correcto: el hecho, las hipótesis, la explicación y el presente.',
          incorrect: 'Guíate por 九月, 十二月 y 今.',
          strategy: 'Los meses ordenan la escena de principio a fin.' },
      ],
      production: { prompt: 'Escribe 12–15 frases en japonés sobre algo que dedujiste de alguien y resultó falso. Usa tres veces はずだ y tres veces にちがいない.', minWords: 180, maxWords: 420,
        hints: ['「転職するにちがいない」と言った。','「奥さんと何かあったはずだ」と言った。','三人とも間違っていた。','それでいいわけだ。'] },
    },
    // ---------------------------------------------------------------- 4
    {
      slug: 'soroban-o-narawasareta',
      title: 'Me hicieron aprender ábaco',
      genre: 'memoria familiar',
      topic: 'siete años de clases obligadas',
      tags: ['japones b1', 'lectura', 'causativo させる', 'pasivo de perjuicio られる'],
      intro: 'Siete años yendo a clase de ábaco sin querer, y una discusión de treinta años que se cierra en una cocina. Lectura de japonés B1.',
      mission: 'Averigua qué le respondió su madre cuando por fin se lo reprochó.',
      seoTitle: 'Lectura de japonés B1: me hicieron aprender ábaco | WeLearn',
      seoDescription: 'Lee una memoria familiar en japonés B1 y practica el causativo させる y el pasivo de perjuicio られる. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['shieki-saseru-b1', 'ukemi-rareru-b1', 'ukemi-a2'],
      text: `小学一年から中学一年まで、私は母にそろばんを習わされた。週に三回、七年間だ。

行きたくなかった。友達は外で遊んでいるのに、私は教室で数字を見ていた。

母は理由を説明しなかった。「行きなさい」だけだった。

十歳のとき、大会に出させられた。県の大会で、私は五十六人中四十九位だった。帰りのバスで泣いた。母は何も言わなかった。

十三歳でやめた。やめると言ったとき、母は反対しなかった。それも腹が立った。七年間行かせておいて、やめるときは何も言わないのか、と思った。

大人になってから、この話を何度もした。友達に「親に習わされた」と言うと、みんな笑った。私も笑っていた。でも本当は笑っていなかった。

去年、母が入院した。病院の帰り、私は初めて聞いた。「どうして七年も行かせたの。」

母は少し考えて、こう言った。

「お母さんは計算ができない。だから、店で何度もだまされた。若いとき、家を借りるときに、お金の計算を間違えて、大変なことになった。あなたにはそうなってほしくなかった。」

私は何も言えなかった。

母は続けた。「でも、あなたに聞かなかったのは悪かった。ごめんね。」

三十年謝られなかったことを、そこで謝られた。

今、私は経理の仕事をしている。数字を見ても、何も感じない。速く正確に計算できる。

それがそろばんのおかげかどうかは分からない。でも、母が何のために行かせたかは、やっと分かった。`,
      objectives: [
        'Formar el causativo: 習わせる, 行かせる, 出させる.',
        'Formar el causativo-pasivo y el pasivo de perjuicio: 習わされた, だまされた, 謝られた.',
        'Distinguir la razón de una decisión de la forma en que se tomó.',
      ],
      vocabulary: [
        { surface: 'そろばん', reading: 'そろばん', gloss: 'ábaco japonés' },
        { surface: '大会', reading: 'たいかい', gloss: 'competición, campeonato' },
        { surface: '反対', reading: 'はんたい', gloss: 'oposición, estar en contra' },
        { surface: '腹が立った', reading: 'はらがたった', gloss: 'me dio rabia' },
        { surface: '入院', reading: 'にゅういん', gloss: 'ingreso hospitalario' },
        { surface: 'だまされた', reading: 'だまされた', gloss: 'me engañaron, me timaron' },
        { surface: '経理', reading: 'けいり', gloss: 'contabilidad' },
        { surface: '正確', reading: 'せいかく', gloss: 'exacto, preciso' },
      ],
      culturalNote: 'Las escuelas de そろばん siguen funcionando en Japón como refuerzo de cálculo mental, con exámenes por niveles y campeonatos provinciales. Muchas familias apuntan a los hijos sin explicarles por qué.',
      spanishSpeakerNote: 'させる es «hacer que alguien haga»: 行かせた, «la hizo ir». Y させられる es el causativo-pasivo, el que sufre: 習わされた, «me hicieron aprender». El japonés distingue en el verbo lo que el español dice con perífrasis.',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué resuelve la conversación del hospital?',
          options: [['razon','Que había una razón concreta detrás de los siete años, y que la madre reconoce no habérsela preguntado'],['perdon','Que la madre le pide que vuelva al ábaco'],['dinero','Que la familia tenía problemas de dinero']],
          answer: 'razon',
          evidence: '「あなたにはそうなってほしくなかった。」… 「でも、あなたに聞かなかったのは悪かった。ごめんね。」',
          correct: 'Sí: da la razón y admite el error de método por separado.',
          incorrect: 'No le pide que vuelva, y lo del dinero es un episodio de juventud de ella. Lee sus dos intervenciones.',
          strategy: 'Si un personaje da una razón y luego se disculpa por otra cosa, son dos asuntos distintos.' },
        { type: 'detail', skill: 'detail', prompt: '¿Qué puesto hizo en el campeonato provincial?',
          options: [['49','El cuarenta y nueve de cincuenta y seis'],['56','El cincuenta y seis'],['10','El décimo']],
          answer: '49',
          evidence: '県の大会で、私は五十六人中四十九位だった。帰りのバスで泣いた。',
          correct: 'Correcto, y volvió llorando en el autobús.',
          incorrect: 'Los cincuenta y seis son los participantes y los diez, su edad. Busca 位.',
          strategy: 'El contador 位 marca el puesto en una clasificación; 人中 marca el total.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa だまされた?',
          options: [['enganada','Que la engañaron, la timaron'],['ayudada','Que la ayudaron'],['obligada','Que la obligaron']],
          answer: 'enganada',
          evidence: '「お母さんは計算ができない。だから、店で何度もだまされた。」',
          correct: 'Eso es, y la causa va delante: no sabe calcular.',
          incorrect: 'La frase anterior dice que no sabe hacer cuentas: la consecuencia es en su contra.',
          strategy: 'Si la frase anterior da una carencia, la pasiva que sigue suele expresar un perjuicio.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué le dio rabia que su madre no se opusiera cuando lo dejó?',
          options: [['coherencia','Porque siete años de obligación y ninguna palabra al dejarlo le parecieron incoherentes'],['triste','Porque quería seguir yendo'],['dinero','Porque ya habían pagado el curso entero']],
          answer: 'coherencia',
          evidence: '母は反対しなかった。それも腹が立った。七年間行かせておいて、やめるときは何も言わないのか、と思った。',
          correct: 'Sí, y él mismo formula la contradicción en la frase siguiente.',
          incorrect: 'No quería seguir y no se habla de dinero del curso. Lee la frase que empieza por 七年間行かせておいて.',
          strategy: 'La forma …ておいて reprocha una incoherencia entre lo hecho antes y lo hecho después.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: hoy trabaja en contabilidad y calcula rápido y sin errores.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'vrai',
          evidence: '今、私は経理の仕事をしている … 速く正確に計算できる。',
          correct: 'Verdadero, aunque él mismo duda de que sea gracias al ábaco.',
          incorrect: 'Busca el penúltimo párrafo: dice su oficio y qué sabe hacer.',
          strategy: 'La palabra 今 abre el párrafo del presente: ahí están los datos actuales.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena la memoria.',
          options: [['p1','Siete años de clases sin explicación'],['p2','El campeonato a los diez años'],['p3','Lo deja a los trece y su madre no se opone'],['p4','La conversación al salir del hospital']],
          answer: ['p1','p2','p3','p4'],
          evidence: '小学一年から中学一年まで… 十歳のとき、大会に出させられた… 十三歳でやめた… 去年、母が入院した。',
          correct: 'Correcto: las edades ordenan el texto.',
          incorrect: 'Guíate por 十歳, 十三歳 y 去年.',
          strategy: 'En una memoria, las edades funcionan como fechas.' },
      ],
      production: { prompt: 'Escribe 12–15 frases en japonés sobre algo que te hicieron hacer de pequeño. Usa tres causativos y dos pasivos de perjuicio.', minWords: 180, maxWords: 420,
        hints: ['母にそろばんを習わされた。','大会に出させられた。','七年間行かせておいて…','何のために行かせたかは、やっと分かった。'] },
    },
    // ---------------------------------------------------------------- 5
    {
      slug: 'jibun-no-soubetsukai-ni-okureta',
      title: 'Llegué tarde a mi despedida',
      genre: 'anécdota de trabajo',
      topic: 'una fiesta de despedida a la que el homenajeado llega el último',
      tags: ['japones b1', 'lectura', 'のに', 'ものだから'],
      intro: 'Cuarenta minutos tarde a su propia despedida, y con una excusa que era verdad y no servía de nada. Lectura de japonés B1.',
      mission: 'Averigua qué había estado haciendo en realidad.',
      seoTitle: 'Lectura de japonés B1: llegué tarde a mi despedida | WeLearn',
      seoDescription: 'Lee una anécdota en japonés B1 y practica のに y ものだから. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['noni-b1', 'monokara-b1', 'n-desu-a2'],
      text: `九年働いた会社を辞めた日、送別会に四十分遅れた。自分の送別会にだ。

店に着いたとき、二十三人がもう座っていた。料理も半分なくなっていた。

「すみません、電車が止まったものですから」と言った。

これは本当だ。中央線が十五分止まった。でも、遅れた四十分のうち、電車のせいは十五分だけだ。

残りの二十五分、私は会社のトイレにいた。

出られなかったんです、と正直に言えばよかったのに、言えなかった。

九年間、毎日通った建物だ。それなのに、最後の日に、なぜか出られなくなった。荷物は持っていた。あいさつも全部終わっていた。あとはドアを開けるだけだった。

でも、開けたら本当に終わってしまう。そう思ったら、動けなくなった。

送別会では、みんな笑ってくれた。部長は「最後まで中村さんらしいね」と言った。私はあいまいに笑った。

三年たった今も、あの二十五分のことはだれにも話していない。話す機会がなかったものだから。

いや、違う。機会はあった。何度もあった。話さなかっただけだ。

先月、当時の同僚と飲んだ。彼が言った。「あの日、俺もトイレで十分ぐらい泣いてたよ。」

私たちは同じ建物の同じ階のトイレに、同じ時間にいたのに、二十五分と十分、別々に座っていたわけだ。

その同僚とは、今は年に一度しか会わない。それでも、あの日の話はもう二人の間にある。

もっと早く話せばよかったのに、と思う。でも、たぶん三年かかるものなんだろう。`,
      objectives: [
        'Usar のに para el contraste con lo esperable: 言えばよかったのに.',
        'Usar ものだから para dar una razón que se presenta como excusa.',
        'Distinguir la razón declarada de la razón verdadera.',
      ],
      vocabulary: [
        { surface: '送別会', reading: 'そうべつかい', gloss: 'fiesta de despedida' },
        { surface: '辞めた', reading: 'やめた', gloss: 'dejó el trabajo' },
        { surface: '正直', reading: 'しょうじき', gloss: 'sinceramente, con franqueza' },
        { surface: '建物', reading: 'たてもの', gloss: 'edificio' },
        { surface: '荷物', reading: 'にもつ', gloss: 'cosas, equipaje' },
        { surface: '部長', reading: 'ぶちょう', gloss: 'jefe de departamento' },
        { surface: 'あいまい', reading: 'あいまい', gloss: 'ambiguo, vago' },
        { surface: '同僚', reading: 'どうりょう', gloss: 'compañero de trabajo' },
      ],
      culturalNote: 'El 送別会 lo organizan los compañeros y el homenajeado no paga. Llegar tarde a él es una falta llamativa, y por eso la excusa del tren es la que todo el mundo acepta sin preguntar.',
      spanishSpeakerNote: 'ものだから presenta una razón como excusa: 電車が止まったものですから. Y のに marca el contraste con lo esperable: 言えばよかったのに, «tenía que haberlo dicho, y no lo dije».',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué cuenta la anécdota?',
          options: [['bloqueo','Que no podía cruzar la puerta el último día, y que tardó tres años en contarlo'],['tren','Que el tren le hizo llegar tarde a su despedida'],['jefe','Que su jefe se rió de él delante de todos']],
          answer: 'bloqueo',
          evidence: '残りの二十五分、私は会社のトイレにいた … 三年たった今も、あの二十五分のことはだれにも話していない。',
          correct: 'Sí: el tren explica quince minutos de cuarenta.',
          incorrect: 'El tren es solo parte, y el jefe no se burla. Busca dónde estuvo los otros veinticinco minutos.',
          strategy: 'Si el texto desglosa un tiempo total, lo importante está en la parte que no se explica.' },
        { type: 'detail', skill: 'detail', prompt: '¿Cuánto tiempo estuvo parado el tren?',
          options: [['quince','Quince minutos'],['cuarenta','Cuarenta minutos'],['veinticinco','Veinticinco minutos']],
          answer: 'quince',
          evidence: '中央線が十五分止まった。でも、遅れた四十分のうち、電車のせいは十五分だけだ。',
          correct: 'Correcto, y el texto lo separa expresamente de los cuarenta.',
          incorrect: 'Los cuarenta son el retraso total y los veinticinco, el baño. Lee las dos frases juntas.',
          strategy: 'Cuando el texto reparte un total, empareja cada parte con su causa.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa あいまいに笑った?',
          options: [['vago','Sonrió de forma vaga, sin confirmar ni desmentir'],['fuerte','Se rió a carcajadas'],['triste','Sonrió con tristeza']],
          answer: 'vago',
          evidence: '部長は「最後まで中村さんらしいね」と言った。私はあいまいに笑った。',
          correct: 'Eso es: deja pasar el comentario sin aclarar nada.',
          incorrect: 'Viene después de un comentario que él no quiere corregir: la sonrisa evita, no expresa.',
          strategy: 'Si alguien sonríe tras un comentario que no quiere aclarar, la sonrisa es una evasiva.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué corrige su propia excusa sobre no haberlo contado antes?',
          options: [['honesto','Porque reconoce que sí hubo ocasiones y que simplemente no quiso'],['memoria','Porque no recordaba bien lo que pasó'],['prohibido','Porque en la empresa no se podía hablar de eso']],
          answer: 'honesto',
          evidence: '話す機会がなかったものだから。 いや、違う。機会はあった。何度もあった。話さなかっただけだ。',
          correct: 'Sí, y la corrección llega en la frase siguiente, en tres pasos.',
          incorrect: 'Recuerda todo con detalle y ya no trabaja allí. Lee lo que dice después del ものだから.',
          strategy: 'Si el narrador se corrige con «いや、違う», la segunda versión es la buena.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: su compañero también estaba aquel día en el baño, y él lo supo enseguida.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'faux',
          evidence: '先月、当時の同僚と飲んだ。彼が言った。「あの日、俺もトイレで十分ぐらい泣いてたよ。」',
          correct: 'Falso: estaba, sí, pero él se enteró tres años después.',
          incorrect: 'Comprueba las dos mitades: si estaba, y cuándo se enteró. Busca 先月.',
          strategy: 'Si una pregunta une dos hechos, comprueba los dos por separado.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena la anécdota.',
          options: [['p1','Llega cuarenta minutos tarde a su despedida'],['p2','Explica que el tren solo justifica quince'],['p3','Cuenta que no podía abrir la puerta del edificio'],['p4','Tres años después, el compañero le cuenta lo suyo']],
          answer: ['p1','p2','p3','p4'],
          evidence: '送別会に四十分遅れた… 電車のせいは十五分だけだ… 最後の日に、なぜか出られなくなった… 先月、当時の同僚と飲んだ。',
          correct: 'Correcto: el hecho, el desglose, la verdad y el eco.',
          incorrect: 'Guíate por el reparto de los minutos y por 先月.',
          strategy: 'Una anécdota que empieza con una cifra suele desglosarla justo después.' },
      ],
      production: { prompt: 'Escribe 12–15 frases en japonés sobre una vez que llegaste tarde y diste una excusa incompleta. Usa tres veces のに y dos veces ものだから.', minWords: 180, maxWords: 420,
        hints: ['「電車が止まったものですから」と言った。','正直に言えばよかったのに、言えなかった。','機会はあった。話さなかっただけだ。','もっと早く話せばよかったのに。'] },
    },
    // ---------------------------------------------------------------- 6
    {
      slug: 'yomeru-you-ni-suru-tame-ni',
      title: 'Para que se pueda leer',
      genre: 'reportaje',
      topic: 'una oficina de correos que rehízo sus impresos',
      tags: ['japones b1', 'lectura', 'ために', 'ように'],
      intro: 'Cambiaron el tamaño de letra de un impreso y el tiempo de atención bajó a la mitad. Nadie lo había medido en veinte años. Lectura de japonés B1.',
      mission: 'Averigua qué cambio resultó ser el más eficaz, y no fue la letra.',
      seoTitle: 'Lectura de japonés B1: para que se pueda leer | WeLearn',
      seoDescription: 'Lee un reportaje en japonés B1 y practica ために y ように. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['tameni-b1', 'yooni-b1', 'to-omoimasu-a2'],
      text: `松本市のある郵便局が、二年前に窓口の書類を全部作り直した。高齢のお客さんが自分で書けるようにするためだ。

きっかけは職員の一人、山口さんの記録だった。山口さんは半年間、一人のお客さんにかかる時間を計った。

七十歳以上のお客さんの平均は十一分。四十代は三分だった。

差の八分は、書類を読む時間と、職員に聞く時間だった。

そこで三つ変えた。

一つ目、文字を大きくした。九ポイントから十四ポイントにした。

二つ目、専門用語をやめた。「振込」は残したが、「受取人」を「お金を受け取る人」に変えた。

三つ目、これが一番効いた。書く順番を変えた。前は住所が最初で、名前が三番目だった。今は名前が最初だ。

山口さんはこう説明する。「名前は考えないで書けます。最初に手が動くと、次も動くんです。難しいものを最初に置くと、そこで止まってしまいます。」

二年後、七十歳以上の平均は五分になった。半分以下だ。

文字を大きくするために使ったお金は、印刷代だけだった。約四万円だ。

今、その郵便局の書類は、市内のほかの三つの局でも使われている。山口さんの名前は、どこにも書かれていない。

私は山口さんに聞いた。「どうして今まで、だれもやらなかったんでしょうか。」

山口さんは少し考えて言った。「時間を計った人がいなかったんだと思います。困っているのは見えていました。でも、何分困っているかは、だれも知らなかったんです。」`,
      objectives: [
        'Distinguir ために (finalidad con sujeto que controla) de ように (finalidad con estado o capacidad).',
        'Leer un informe con cifras antes y después.',
        'Ver la diferencia entre ver un problema y medirlo.',
      ],
      vocabulary: [
        { surface: '郵便局', reading: 'ゆうびんきょく', gloss: 'oficina de correos' },
        { surface: '高齢', reading: 'こうれい', gloss: 'de edad avanzada' },
        { surface: '職員', reading: 'しょくいん', gloss: 'personal, empleado' },
        { surface: '平均', reading: 'へいきん', gloss: 'media' },
        { surface: '専門用語', reading: 'せんもんようご', gloss: 'terminología técnica' },
        { surface: '受取人', reading: 'うけとりにん', gloss: 'destinatario, beneficiario' },
        { surface: '効いた', reading: 'きいた', gloss: 'surtió efecto' },
        { surface: '印刷代', reading: 'いんさつだい', gloss: 'coste de impresión' },
      ],
      culturalNote: 'Los impresos de las oficinas de correos japonesas usan términos administrativos fijos y llevan décadas sin cambiar. Modificarlos exige aprobación interna, aunque el coste sea solo la reimpresión.',
      spanishSpeakerNote: 'ために expresa una finalidad que el sujeto controla: 作り直すために. ように se usa cuando lo que se busca es un estado o una capacidad: 書けるようにする, «hacer que se pueda escribir». No son intercambiables.',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Cuál es la idea del reportaje?',
          options: [['medir','Que el problema se veía desde siempre, pero nadie lo había medido, y medirlo permitió arreglarlo por cuatro mil yenes'],['letra','Que basta con aumentar el tamaño de letra'],['personal','Que hace falta más personal en las oficinas']],
          answer: 'medir',
          evidence: '「困っているのは見えていました。でも、何分困っているかは、だれも知らなかったんです。」',
          correct: 'Sí, y esa frase cierra el reportaje entero.',
          incorrect: 'La letra fue solo uno de tres cambios, y no el más eficaz. No se pide más personal.',
          strategy: 'Si la última cita distingue ver un problema de medirlo, ahí está la tesis.' },
        { type: 'detail', skill: 'detail', prompt: '¿Cuál de los tres cambios funcionó mejor?',
          options: [['orden','Cambiar el orden: poner el nombre primero'],['letra','Aumentar el tamaño de letra'],['palabras','Quitar la terminología técnica']],
          answer: 'orden',
          evidence: '三つ目、これが一番効いた。書く順番を変えた。',
          correct: 'Correcto, y Yamaguchi lo explica: la mano empieza a moverse.',
          incorrect: 'Los otros dos también se hicieron, pero el texto marca cuál fue el mejor con 一番効いた.',
          strategy: 'El superlativo 一番 marca el elemento destacado de una lista.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué es un 受取人?',
          options: [['destinatario','La persona que recibe el dinero'],['remitente','La persona que lo envía'],['empleado','El empleado de la ventanilla']],
          answer: 'destinatario',
          evidence: '「受取人」を「お金を受け取る人」に変えた。',
          correct: 'Eso es, y el propio impreso lo reescribe en palabras corrientes.',
          incorrect: 'El texto da la traducción llana en la misma frase: quien recibe el dinero.',
          strategy: 'Si el texto sustituye un término por su versión llana, esa versión es la definición.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué funciona poner el nombre primero?',
          options: [['arranque','Porque se escribe sin pensar, y una vez que la mano arranca sigue'],['legal','Porque es lo que exige la ley'],['espacio','Porque ocupa menos espacio en el impreso']],
          answer: 'arranque',
          evidence: '「名前は考えないで書けます。最初に手が動くと、次も動くんです。難しいものを最初に置くと、そこで止まってしまいます。」',
          correct: 'Sí, y lo explica también por contraste con lo difícil al principio.',
          incorrect: 'No se menciona ninguna ley ni cuestión de espacio. Lee la explicación de Yamaguchi.',
          strategy: 'Si un personaje explica un mecanismo con un contraste, ese contraste es la razón.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: la media de atención a mayores de setenta bajó de once minutos a cinco.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'vrai',
          evidence: '七十歳以上のお客さんの平均は十一分 … 二年後、七十歳以上の平均は五分になった。半分以下だ。',
          correct: 'Verdadero, y el texto añade que es menos de la mitad.',
          incorrect: 'Busca las dos cifras del mismo grupo de edad: la de antes y la de después.',
          strategy: 'Si el texto da una cifra al principio y otra al final, compáralas.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena el reportaje.',
          options: [['p1','Yamaguchi mide el tiempo de atención durante medio año'],['p2','La diferencia de ocho minutos entre grupos de edad'],['p3','Los tres cambios en el impreso'],['p4','El resultado a los dos años y la pregunta final']],
          answer: ['p1','p2','p3','p4'],
          evidence: '山口さんは半年間、一人のお客さんにかかる時間を計った… 差の八分は… そこで三つ変えた… 二年後、七十歳以上の平均は五分になった。',
          correct: 'Correcto: medición, diagnóstico, intervención y resultado.',
          incorrect: 'Fíjate en dónde empieza la lista de tres cambios.',
          strategy: 'Un reportaje con datos suele seguir el orden medir, diagnosticar, actuar, evaluar.' },
      ],
      production: { prompt: 'Escribe 12–15 frases en japonés proponiendo un cambio para que alguien pueda hacer algo por sí mismo. Usa tres veces ために y tres veces ように.', minWords: 180, maxWords: 420,
        hints: ['自分で書けるようにするためだ。','文字を大きくした。','これが一番効いた。','何分困っているかは、だれも知らなかった。'] },
    },
    // ---------------------------------------------------------------- 7
    {
      slug: 'puuru-o-nokosu-beki-ka',
      title: '¿Debe conservarse la piscina?',
      genre: 'debate escolar',
      topic: 'una piscina de colegio que cuesta más que su uso',
      tags: ['japones b1', 'lectura', 'べき', 'なければならない'],
      intro: 'Se usa nueve días al año y cuesta dos millones cuatrocientos mil yenes. Y aun así el debate no se cierra. Lectura de japonés B1.',
      mission: 'Averigua qué argumento cambió la discusión.',
      seoTitle: 'Lectura de japonés B1: ¿debe conservarse la piscina? | WeLearn',
      seoDescription: 'Lee un debate escolar en japonés B1 y practica べき y なければならない. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['beki-b1', 'nakerebanaranai-b1', 'nakereba-naranai-a2'],
      text: `私の町の小学校には、五十年前に作られたプールがある。今年、そのプールを残すべきかどうか、話し合いが行われた。

数字は厳しい。授業でプールを使うのは、年に九日だけだ。維持費は年間二百四十万円。水道代、薬品代、点検代の合計だ。

九日のために二百四十万円。一日あたり二十六万円以上になる。

「なくすべきだ」と言う人の意見は分かりやすい。その二百四十万円で、本を買うべきだ、エアコンを直すべきだ、と。

「残さなければならない」と言う人の意見も分かる。この町には市営プールがない。学校のプールがなくなると、子どもは泳ぐ場所がなくなる。

二回目の会議で、六十八歳の女性が発言した。元教員だ。

「私は反対でも賛成でもありません。ただ、一つ言わなければならないことがあります。」

その人は続けた。「この町は川に囲まれています。三十年前、子どもが二人、川で亡くなりました。そのあと、学校は水泳の授業を増やしました。プールを作った理由は、体育ではありません。」

部屋が静かになった。

その日、結論は出なかった。でも議論の中身が変わった。

元教員の名前は、会議の記録に残っていない。発言した人の名前は書かない決まりだからだ。

今、町は別の計算をしている。「泳げない子どもを一人減らすために、いくらまで払うべきか。」

答えはまだ出ていない。でも、九日で二百四十万円という計算は、もうだれもしていない。`,
      objectives: [
        'Usar べき para lo que se considera que debe hacerse.',
        'Usar なければならない para una obligación práctica o moral.',
        'Distinguir un argumento de coste de un argumento de finalidad.',
      ],
      vocabulary: [
        { surface: '維持費', reading: 'いじひ', gloss: 'coste de mantenimiento' },
        { surface: '薬品', reading: 'やくひん', gloss: 'productos químicos' },
        { surface: '点検', reading: 'てんけん', gloss: 'inspección técnica' },
        { surface: '市営', reading: 'しえい', gloss: 'municipal' },
        { surface: '発言', reading: 'はつげん', gloss: 'intervención en una reunión' },
        { surface: '元教員', reading: 'もときょういん', gloss: 'antigua maestra' },
        { surface: '囲まれて', reading: 'かこまれて', gloss: 'rodeado' },
        { surface: '結論', reading: 'けつろん', gloss: 'conclusión' },
      ],
      culturalNote: 'Casi todas las escuelas primarias japonesas tienen piscina propia y el «水泳の授業» es obligatorio. Muchas se construyeron tras accidentes por ahogamiento en ríos y en el mar.',
      spanishSpeakerNote: 'べき es «se debe» en sentido de lo correcto: 残すべきだ. なければならない es la obligación práctica: 残さなければならない. El texto los pone en boca de los dos bandos a propósito.',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué cambió en el debate?',
          options: [['pregunta','La pregunta misma: pasó del coste por día al precio de que un niño no sepa nadar'],['decision','Que se decidió cerrar la piscina'],['dinero','Que apareció dinero para el mantenimiento']],
          answer: 'pregunta',
          evidence: '「泳げない子どもを一人減らすために、いくらまで払うべきか。」… 九日で二百四十万円という計算は、もうだれもしていない。',
          correct: 'Sí, y las dos últimas frases lo dicen juntas.',
          incorrect: 'No hubo decisión ni dinero nuevo. Busca la pregunta que se hace ahora el ayuntamiento.',
          strategy: 'Si un texto acaba reformulando la pregunta de partida, ese cambio es la tesis.' },
        { type: 'detail', skill: 'detail', prompt: '¿Cuántos días al año se usa la piscina?',
          options: [['nueve','Nueve'],['cincuenta','Cincuenta'],['treinta','Treinta']],
          answer: 'nueve',
          evidence: '授業でプールを使うのは、年に九日だけだ。維持費は年間二百四十万円。',
          correct: 'Correcto, y de ahí sale el cálculo por día.',
          incorrect: 'Los cincuenta son los años de la piscina y los treinta, los del accidente.',
          strategy: 'Empareja cada cifra con lo que cuenta: días de uso, años de antigüedad, años del suceso.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa 囲まれています?',
          options: [['rodeado','Que el pueblo está rodeado de ríos'],['inundado','Que el pueblo se inunda'],['lejos','Que el pueblo está lejos de los ríos']],
          answer: 'rodeado',
          evidence: '「この町は川に囲まれています。三十年前、子どもが二人、川で亡くなりました。」',
          correct: 'Eso es, y esa geografía es la base de su argumento.',
          incorrect: 'La frase siguiente habla de dos niños ahogados en el río: los ríos están cerca, no lejos.',
          strategy: 'Si la frase siguiente cuenta un suceso en ese lugar, el lugar está próximo.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué se quedó la sala en silencio?',
          options: [['motivo','Porque la piscina no se había construido por deporte, y nadie lo estaba teniendo en cuenta'],['edad','Porque la mujer era muy mayor'],['coste','Porque el coste resultó ser mayor de lo dicho']],
          answer: 'motivo',
          evidence: '「プールを作った理由は、体育ではありません。」 部屋が静かになった。',
          correct: 'Sí, y ella lo dice sin posicionarse a favor ni en contra.',
          incorrect: 'No aporta cifras nuevas y su edad no es el punto. Fíjate en la frase que precede al silencio.',
          strategy: 'Si el texto describe un silencio, la causa está en la frase inmediatamente anterior.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: la reunión terminó con una decisión sobre la piscina.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'faux',
          evidence: 'その日、結論は出なかった。でも議論の中身が変わった。',
          correct: 'Falso: no hubo conclusión; lo que cambió fue el contenido de la discusión.',
          incorrect: 'Busca la frase con 結論. Va seguida de un でも.',
          strategy: 'La expresión 結論は出なかった dice expresamente que no se decidió nada.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena el debate.',
          options: [['p1','Los números: nueve días y 2.400.000 yenes'],['p2','Los argumentos de los dos bandos'],['p3','La intervención de la antigua maestra'],['p4','La nueva pregunta que se hace el ayuntamiento']],
          answer: ['p1','p2','p3','p4'],
          evidence: '数字は厳しい… 「なくすべきだ」と言う人の意見は… 二回目の会議で、六十八歳の女性が発言した… 今、町は別の計算をしている。',
          correct: 'Correcto: datos, posturas, giro y reformulación.',
          incorrect: 'Fíjate en dónde interviene la antigua maestra y dónde empieza el 今.',
          strategy: 'Un debate suele contarse por turnos: datos, posturas y quien lo cambia todo.' },
      ],
      production: { prompt: 'Escribe 12–15 frases en japonés sobre algo de tu ciudad que cuesta dinero y se usa poco. Usa cuatro veces べき y dos veces なければならない.', minWords: 180, maxWords: 420,
        hints: ['残すべきかどうか、話し合いが行われた。','その二百四十万円で、本を買うべきだ。','残さなければならない。','いくらまで払うべきか。'] },
    },
    // ---------------------------------------------------------------- 8
    {
      slug: 'kyuujuppun-narabu-hodo-ka',
      title: '¿Merece noventa minutos de cola?',
      genre: 'crónica',
      topic: 'una cola de ramen medida con un cronómetro',
      tags: ['japones b1', 'lectura', 'ほど', 'ばかり'],
      intro: 'Noventa minutos de cola por un ramen de novecientos yenes. Alguien decidió preguntar a los que salían. Lectura de japonés B1.',
      mission: 'Averigua qué contestó casi todo el mundo.',
      seoTitle: 'Lectura de japonés B1: ¿merece noventa minutos de cola? | WeLearn',
      seoDescription: 'Lee una crónica en japonés B1 y practica ほど y ばかり. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['hodo-b1', 'bakari-b1', 'hikaku-a2'],
      text: `新宿のあるラーメン屋には、平日でも九十分の行列ができる。値段は九百円。特別に高くも安くもない。

私は二月のある土曜日、その店の前で三時間立っていた。並ぶためではない。出てきた人に質問するためだ。

質問は一つだけ。「九十分並ぶほどおいしかったですか。」

三十七人に聞いた。答えは意外だった。

「はい」と答えたのは六人。「いいえ」は四人。残りの二十七人は、どちらでもない答えをした。

一番多かったのはこれだ。「おいしいけど、九十分の話じゃないですね。」

二十代の男性はこう言った。「並んでいる間、ずっとスマホを見ていました。だから九十分待ったという感じがしないんです。」

四十代の女性はこう言った。「一人で来ました。九十分、だれとも話さなくていい時間って、なかなかないんですよ。」

これを聞いて、私は考えを変えた。

行列は待ち時間ではないのかもしれない。並んでいる人ばかり見ていたときは、みんな損をしていると思っていた。でも、話を聞くと、そうでもない。

もちろん、本当に急いでいる人は並ばない。並ぶ人は、九十分を持っている人だ。

私自身は並ばなかった。三時間立っていたのに、ラーメンは食べていない。

家の近くの店で食べた。行列はゼロ分。味は、たぶん八十点ぐらいだった。

帰り道で、行列の写真を一枚だけ撮った。三十七人の答えより、その写真のほうが説明が難しい。

九十分ぶんの差があるかどうかは、今も分からない。`,
      objectives: [
        'Usar ほど para medir hasta qué punto: 並ぶほどおいしい.',
        'Usar ばかり para «solo, nada más que» con matiz de exceso.',
        'Leer una encuesta y ver que la respuesta mayoritaria no es sí ni no.',
      ],
      vocabulary: [
        { surface: '行列', reading: 'ぎょうれつ', gloss: 'cola de gente' },
        { surface: '平日', reading: 'へいじつ', gloss: 'día laborable' },
        { surface: '値段', reading: 'ねだん', gloss: 'precio' },
        { surface: '意外', reading: 'いがい', gloss: 'inesperado' },
        { surface: '感じ', reading: 'かんじ', gloss: 'sensación' },
        { surface: '損', reading: 'そん', gloss: 'pérdida, salir perdiendo' },
        { surface: '急いで', reading: 'いそいで', gloss: 'con prisa' },
        { surface: '味', reading: 'あじ', gloss: 'sabor' },
      ],
      culturalNote: 'Las colas de ramen en Tokio son un fenómeno con reglas propias: se hace en silencio, en fila india y sin guardar sitio. Forman parte de la experiencia tanto como el plato.',
      spanishSpeakerNote: 'ほど mide un grado: 九十分並ぶほどおいしい es «tan bueno como para hacer noventa minutos de cola». Y ばかり añade un matiz de exceso: 見ていたばかり sugiere que solo hacía eso.',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué concluye la crónica?',
          options: [['tiempo','Que para muchos la cola no es tiempo perdido, y que quien la hace es quien tiene ese tiempo'],['malo','Que el ramen de ese local no es bueno'],['prohibir','Que habría que limitar las colas']],
          answer: 'tiempo',
          evidence: '行列は待ち時間ではないのかもしれない … 並ぶ人は、九十分を持っている人だ。',
          correct: 'Sí, y el narrador dice expresamente que cambió de idea.',
          incorrect: 'Nadie dice que esté malo y no se propone limitar nada. Busca la frase con かもしれない.',
          strategy: 'Si el narrador dice que cambió de opinión, lo que viene después es su conclusión.' },
        { type: 'detail', skill: 'detail', prompt: '¿Cuál fue la respuesta más frecuente?',
          options: [['ninguna','Ni sí ni no: «está bueno, pero no es cuestión de noventa minutos»'],['si','Sí, mereció la pena'],['no','No, no mereció la pena']],
          answer: 'ninguna',
          evidence: '残りの二十七人は、どちらでもない答えをした。一番多かったのはこれだ。「おいしいけど、九十分の話じゃないですね。」',
          correct: 'Correcto: veintisiete de treinta y siete.',
          incorrect: 'Los sí fueron seis y los no, cuatro. Busca la cifra mayor.',
          strategy: 'Suma las respuestas: si las tres cifras no cuadran con el total, falta una categoría.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa 損をしている?',
          options: [['perdiendo','Que están saliendo perdiendo'],['ganando','Que están saliendo ganando'],['pagando','Que están pagando de más']],
          answer: 'perdiendo',
          evidence: '並んでいる人ばかり見ていたときは、みんな損をしていると思っていた。でも、話を聞くと、そうでもない。',
          correct: 'Eso es, y el でも siguiente lo desmiente.',
          incorrect: 'Es lo que el narrador creía antes de hablar con la gente, y luego lo descarta.',
          strategy: 'Si tras la palabra viene un でも que lo niega, la palabra expresa la idea previa.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué la mujer de cuarenta y tantos valora la cola?',
          options: [['sola','Porque son noventa minutos sin tener que hablar con nadie, y no le sobran'],['barato','Porque el precio le parece bajo'],['amigos','Porque hace amigos en la cola']],
          answer: 'sola',
          evidence: '「九十分、だれとも話さなくていい時間って、なかなかないんですよ。」',
          correct: 'Sí, y la clave está en なかなかない: ese tiempo escasea.',
          incorrect: 'No habla del precio y vino sola, sin hablar con nadie. Lee su frase entera.',
          strategy: 'La expresión なかなかない indica escasez: lo que la precede es lo que falta.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: el narrador estuvo tres horas allí y no llegó a comer ese ramen.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'vrai',
          evidence: '私自身は並ばなかった。三時間立っていたのに、ラーメンは食べていない。',
          correct: 'Verdadero, y comió en un local de su barrio sin cola.',
          incorrect: 'Busca el párrafo donde habla de sí mismo. Empieza por 私自身は.',
          strategy: 'La partícula のに marca la contradicción: tres horas allí y sin comer.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena la crónica.',
          options: [['p1','La cola de noventa minutos y el precio'],['p2','Tres horas preguntando a los que salen'],['p3','Las cifras de las respuestas y las dos citas'],['p4','Cambia de idea y come en su barrio']],
          answer: ['p1','p2','p3','p4'],
          evidence: '九十分の行列ができる… その店の前で三時間立っていた… 三十七人に聞いた… 家の近くの店で食べた。',
          correct: 'Correcto: el fenómeno, el método, los datos y el cierre.',
          incorrect: 'Fíjate en dónde aparecen las cifras de la encuesta.',
          strategy: 'Una crónica con encuesta va del fenómeno al método y de ahí a los datos.' },
      ],
      production: { prompt: 'Escribe 12–15 frases en japonés sobre algo por lo que la gente hace cola en tu ciudad. Usa tres veces ほど y dos veces ばかり.', minWords: 180, maxWords: 420,
        hints: ['九十分並ぶほどおいしかったですか。','おいしいけど、九十分の話じゃない。','…ばかり見ていた。','今も分からない。'] },
    },
    // ---------------------------------------------------------------- 9
    {
      slug: 'kieteitsutsuaru-kotoba',
      title: 'Palabras que se están yendo',
      genre: 'proyecto de documentación',
      topic: 'grabar el habla de una abuela antes de que se pierda',
      tags: ['japones b1', 'lectura', 'ところ', 'つつある'],
      intro: 'Empezó a grabar a su abuela para conservar el dialecto. Acabó grabando otra cosa. Lectura de japonés B1.',
      mission: 'Averigua qué es lo que de verdad está guardando.',
      seoTitle: 'Lectura de japonés B1: palabras que se están yendo | WeLearn',
      seoDescription: 'Lee un proyecto de documentación en japonés B1 y practica ところ y つつある. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['tokoro-b1', 'toutsutsuaru-b1', 'nagara-a2'],
      text: `祖母は青森の小さい村で生まれた。今、八十九歳で、私の家に住んでいる。

二年前、私は祖母の話し方を録音し始めた。津軽弁が消えつつあるからだ。

村では、七十歳以上の人しかその言葉を使わない。私の母は聞いて分かるが、話せない。私は半分も分からない。

最初は、単語を集めるつもりだった。ノートを作って、「この言葉はどういう意味？」と聞きながら、書いていた。

でも三か月でやめた。

祖母は単語だけ言うのが苦手だった。「わがんね」と聞くと、「わがんねって、たとえば、雨が降ってきて、洗濯物を入れるところなのに手が離せないときね」と、話が始まってしまう。

つまり、単語を聞いているのに、物語が返ってくる。

そこで方法を変えた。今は、ただ祖母に話してもらっている。台所で、料理をしながら。私は録音ボタンを押すだけだ。

二年で百四十時間になった。

先月、大学の先生に見せた。先生は「言語の記録としても価値がありますが」と言って、少し止まった。そして続けた。「それより、これは生活の記録です。」

そのとおりだと思う。

私が録音しているのは、消えつつある言葉ではない。消えつつある人だ。

祖母は先週、風邪をひいた。今は良くなったところだ。でも、私は録音のペースを上げた。

百四十時間のうち、私が聞き返したのは百回もない。内容は半分ぐらい同じ話の繰り返しだ。それでいいと思っている。

一日三十分。多いときは一時間。祖母は「また？」と言いながら、いつも話してくれる。`,
      objectives: [
        'Usar ところ para el momento justo: 入れるところなのに, 良くなったところだ.',
        'Usar つつある para un proceso en curso: 消えつつある.',
        'Distinguir el objetivo declarado de un proyecto del real.',
      ],
      vocabulary: [
        { surface: '祖母', reading: 'そぼ', gloss: 'abuela' },
        { surface: '録音', reading: 'ろくおん', gloss: 'grabación de audio' },
        { surface: '津軽弁', reading: 'つがるべん', gloss: 'dialecto de la región de Tsugaru' },
        { surface: '単語', reading: 'たんご', gloss: 'palabra suelta' },
        { surface: '苦手', reading: 'にがて', gloss: 'que se le da mal' },
        { surface: '洗濯物', reading: 'せんたくもの', gloss: 'ropa tendida' },
        { surface: '価値', reading: 'かち', gloss: 'valor' },
        { surface: '風邪', reading: 'かぜ', gloss: 'resfriado' },
      ],
      culturalNote: 'El 津軽弁 de Aomori es uno de los dialectos japoneses menos comprensibles fuera de su región, hasta el punto de que la televisión japonesa lo subtitula. Su transmisión se cortó en una generación.',
      spanishSpeakerNote: 'ところ marca el momento exacto: 入れるところ es «justo cuando iba a meterla» y 良くなったところ es «acaba de mejorar». Y つつある describe un proceso en marcha: 消えつつある, «está desapareciendo».',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué descubre el narrador sobre su proyecto?',
          options: [['persona','Que no está grabando un dialecto que se pierde, sino a una persona que se va'],['dialecto','Que el dialecto puede salvarse si se documenta bien'],['universidad','Que la universidad quiere financiar su trabajo']],
          answer: 'persona',
          evidence: '私が録音しているのは、消えつつある言葉ではない。消えつつある人だ。',
          correct: 'Sí, y son dos frases paralelas con una sola palabra cambiada.',
          incorrect: 'No se habla de financiación ni de salvar el dialecto. Busca las dos frases con 消えつつある.',
          strategy: 'Dos frases idénticas salvo una palabra señalan exactamente el cambio de idea.' },
        { type: 'detail', skill: 'detail', prompt: '¿Por qué abandonó el método de las palabras sueltas?',
          options: [['historias','Porque su abuela no sabía dar definiciones y contestaba con historias'],['tiempo','Porque le llevaba demasiado tiempo'],['sordera','Porque su abuela no oía bien']],
          answer: 'historias',
          evidence: '祖母は単語だけ言うのが苦手だった … つまり、単語を聞いているのに、物語が返ってくる。',
          correct: 'Correcto, y el ejemplo de わがんね lo demuestra.',
          incorrect: 'No se menciona ni el tiempo ni el oído. Busca la frase con 苦手.',
          strategy: 'La conjunción つまり resume lo dicho antes: úsala para localizar la razón.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa 消えつつある?',
          options: [['desapareciendo','Que está desapareciendo poco a poco'],['desaparecido','Que ya ha desaparecido'],['volviendo','Que está volviendo']],
          answer: 'desapareciendo',
          evidence: '津軽弁が消えつつあるからだ … 村では、七十歳以上の人しかその言葉を使わない。',
          correct: 'Eso es: aún se usa, pero solo entre los mayores de setenta.',
          incorrect: 'Todavía hay quien lo habla, así que no ha desaparecido del todo.',
          strategy: 'つつある describe un proceso en marcha, no un hecho consumado.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué subió el ritmo de grabación tras el resfriado?',
          options: [['tiempo','Porque el resfriado le recordó que el tiempo con su abuela es limitado'],['audio','Porque la voz le había cambiado'],['profesor','Porque el profesor se lo pidió']],
          answer: 'tiempo',
          evidence: '祖母は先週、風邪をひいた。今は良くなったところだ。でも、私は録音のペースを上げた。',
          correct: 'Sí, y el でも es la clave: aunque ya está bien, él acelera.',
          incorrect: 'No se dice nada de la voz, y el profesor no le pide nada. Fíjate en el でも.',
          strategy: 'Si alguien acelera aunque el peligro haya pasado, el motivo es lo que el susto le recordó.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: la madre del narrador habla el dialecto con fluidez.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'faux',
          evidence: '私の母は聞いて分かるが、話せない。私は半分も分からない。',
          correct: 'Falso: lo entiende, pero no lo habla.',
          incorrect: 'Busca la frase sobre los tres niveles de la familia: abuela, madre y narrador.',
          strategy: 'La estructura …が、…ない separa lo que sí puede de lo que no.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena el proyecto.',
          options: [['p1','Empieza a grabar porque el dialecto se pierde'],['p2','El método de las palabras sueltas y su fracaso'],['p3','Cambia a dejarla hablar en la cocina'],['p4','El profesor le dice qué es en realidad la grabación']],
          answer: ['p1','p2','p3','p4'],
          evidence: '二年前、私は祖母の話し方を録音し始めた… 最初は、単語を集めるつもりだった… そこで方法を変えた… 先月、大学の先生に見せた。',
          correct: 'Correcto: motivo, método fallido, método nuevo y reinterpretación.',
          incorrect: 'Guíate por 二年前, 最初は, そこで y 先月.',
          strategy: 'Un texto de proyecto suele contar el método que no funcionó antes del que sí.' },
      ],
      production: { prompt: 'Escribe 12–15 frases en japonés sobre algo de tu familia que se está perdiendo. Usa dos veces つつある y tres veces ところ.', minWords: 180, maxWords: 420,
        hints: ['津軽弁が消えつつある。','単語を集めるつもりだった。','今は良くなったところだ。','料理をしながら話してもらっている。'] },
    },
    // ---------------------------------------------------------------- 10
    {
      slug: 'akisou-de-akanai-mise',
      title: 'La tienda que parece que va a abrir',
      genre: 'crónica de barrio',
      topic: 'un local que lleva cuatro años a punto de abrir',
      tags: ['japones b1', 'lectura', 'そう', 'かも'],
      intro: 'Luz encendida, cajas dentro y un cartel que cambia de fecha. Cuatro años así, y el barrio ya ha hecho una apuesta. Lectura de japonés B1.',
      mission: 'Averigua qué descubrió el narrador al hablar con el dueño.',
      seoTitle: 'Lectura de japonés B1: la tienda que parece que va a abrir | WeLearn',
      seoDescription: 'Lee una crónica en japonés B1 y practica そう (apariencia y rumor) y かも. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['sou-b1', 'kamo-b1', 'kamoshirenai-a2'],
      text: `駅前の商店街に、四年間「もうすぐ開店」と書いてある店がある。

中には棚もレジもある。夜になると電気がつく。開きそうな店だ。でも、開かない。

貼り紙の日付は何度も変わった。「三月開店予定」「六月開店予定」「秋開店予定」。今は日付が書いていない。「近日開店」だけだ。

商店街の人たちは、いろいろな話をする。

「オーナーが病気らしいよ」と魚屋さんは言う。「工事の許可が下りないそうだ」とパン屋さんは言う。「もう開ける気がないのかも」と花屋さんは言う。

三つとも、ありそうな話だ。

去年の十一月、私は中で人が動いているのを見た。ドアをたたいた。六十代ぐらいの男性が出てきた。

私は聞いた。「いつ開くんですか。」

男性は少し笑って言った。「開けません。」

私は驚いた。「じゃあ、どうして棚があるんですか。」

男性の答えは短かった。「父の店だったんです。二〇二一年に父が亡くなって、私が相続しました。売ることもできます。でも、売ったら、あの棚は捨てられます。」

そして続けた。「電気は、私がつけています。週に三回来て、掃除しています。」

「もうすぐ開店」の紙は、剥がすタイミングを逃したそうだ。最初は本当に開ける気があったらしい。

今、あの紙は嘘かもしれない。でも、私はもう気にならない。

あの店の前を通るたびに、私は電気がついているかどうかを見る。ついている日は、少しほっとする。

商店街の人には言っていない。言うべきかもしれない。でも、たぶん言わない。`,
      objectives: [
        'Distinguir そうだ de apariencia (開きそうだ) de そうだ de rumor (下りないそうだ).',
        'Usar かも para una posibilidad que no se afirma.',
        'Separar tres hipótesis verosímiles de la explicación real.',
      ],
      vocabulary: [
        { surface: '商店街', reading: 'しょうてんがい', gloss: 'calle comercial de barrio' },
        { surface: '開店', reading: 'かいてん', gloss: 'apertura de un negocio' },
        { surface: '棚', reading: 'たな', gloss: 'estantería' },
        { surface: '貼り紙', reading: 'はりがみ', gloss: 'cartel pegado' },
        { surface: '許可', reading: 'きょか', gloss: 'permiso, licencia' },
        { surface: '相続', reading: 'そうぞく', gloss: 'heredar' },
        { surface: '剥がす', reading: 'はがす', gloss: 'despegar, quitar' },
        { surface: '逃した', reading: 'のがした', gloss: 'dejó pasar, perdió (la ocasión)' },
      ],
      culturalNote: 'Los 商店街 japoneses son calles comerciales cubiertas con asociación de comerciantes propia. Un local cerrado con la luz encendida se comenta durante años entre los vecinos.',
      spanishSpeakerNote: 'Cuidado con そう: 開きそうだ es «parece que va a abrir» (apariencia) y 下りないそうだ es «dicen que no se concede» (rumor). La forma cambia según de dónde viene la información.',
      questions: [
        { type: 'main-idea', skill: 'global', prompt: '¿Qué explica el dueño?',
          options: [['padre','Que era la tienda de su padre y mantenerla así es su forma de no deshacerse de ella'],['obras','Que espera una licencia de obras'],['enfermo','Que ha estado enfermo estos años']],
          answer: 'padre',
          evidence: '「父の店だったんです … 売ったら、あの棚は捨てられます。」「電気は、私がつけています。」',
          correct: 'Sí, y las tres hipótesis del barrio quedan descartadas de golpe.',
          incorrect: 'La enfermedad y la licencia son dos de las hipótesis de los vecinos. Busca lo que dice el hombre.',
          strategy: 'Si un texto presenta hipótesis y luego una explicación directa, esta última manda.' },
        { type: 'detail', skill: 'detail', prompt: '¿Con qué frecuencia va al local?',
          options: [['tres','Tres veces por semana, a limpiar'],['diario','Todos los días'],['mes','Una vez al mes']],
          answer: 'tres',
          evidence: '「電気は、私がつけています。週に三回来て、掃除しています。」',
          correct: 'Correcto, y por eso la luz se enciende de noche.',
          incorrect: 'Busca su segunda intervención: da la frecuencia y lo que hace.',
          strategy: 'La expresión 週に + número da la frecuencia semanal.' },
        { type: 'vocabulary-in-context', skill: 'vocabulary', prompt: '¿Qué significa 剥がすタイミングを逃した?',
          options: [['momento','Que se le pasó el momento de quitar el cartel'],['prohibido','Que no le dejan quitarlo'],['perdido','Que perdió el cartel']],
          answer: 'momento',
          evidence: '「もうすぐ開店」の紙は、剥がすタイミングを逃したそうだ。最初は本当に開ける気があったらしい。',
          correct: 'Eso es, y la frase siguiente explica por qué llegó a ponerlo.',
          incorrect: 'El cartel sigue ahí y nadie se lo prohíbe: lo que pasó es que nunca lo quitó.',
          strategy: 'La palabra タイミング con 逃す indica una ocasión que pasó y no se aprovechó.' },
        { type: 'inference', skill: 'inference', prompt: '¿Por qué no se lo cuenta a los comerciantes?',
          options: [['respeto','Porque contarlo convertiría en asunto público lo que el hombre hace en privado'],['olvido','Porque se le ha olvidado'],['duda','Porque no está seguro de que sea verdad']],
          answer: 'respeto',
          evidence: '商店街の人には言っていない。言うべきかもしれない。でも、たぶん言わない。',
          correct: 'Sí, y el texto lo deja en esa duda sin resolverla.',
          incorrect: 'Habló con el dueño y lo tiene claro. Fíjate en que sopesa decirlo y decide que no.',
          strategy: 'Si el narrador dice «quizá debería» y luego «pero no lo haré», la razón es lo que protege.' },
        { type: 'true-false', skill: 'detail', prompt: 'Verdadero o falso: el cartel actual ya no lleva ninguna fecha.',
          options: [['vrai','Verdadero'],['faux','Falso']], answer: 'vrai',
          evidence: '今は日付が書いていない。「近日開店」だけだ。',
          correct: 'Verdadero: solo pone «apertura próxima», sin fecha.',
          incorrect: 'Busca el párrafo de los carteles: enumera tres fechas y luego dice qué pone ahora.',
          strategy: 'Si el texto enumera versiones anteriores, la última frase dice la actual.' },
        { type: 'ordering', skill: 'organization', prompt: 'Ordena la crónica.',
          options: [['p1','El local con luz y el cartel de siempre'],['p2','Las tres hipótesis de los comerciantes'],['p3','La conversación con el dueño en noviembre'],['p4','La decisión de no contarlo']],
          answer: ['p1','p2','p3','p4'],
          evidence: '四年間「もうすぐ開店」と書いてある店がある… 「オーナーが病気らしいよ」… 去年の十一月、私は中で人が動いているのを見た… 商店街の人には言っていない。',
          correct: 'Correcto: el enigma, las hipótesis, la verdad y el silencio.',
          incorrect: 'Guíate por 去年の十一月 y por el último párrafo.',
          strategy: 'Una crónica de barrio suele acabar con lo que el narrador decide hacer con lo que sabe.' },
      ],
      production: { prompt: 'Escribe 12–15 frases en japonés sobre un local o una casa de tu barrio de la que se dicen cosas. Usa そう de apariencia, そう de rumor y dos veces かも.', minWords: 180, maxWords: 420,
        hints: ['開きそうな店だ。','工事の許可が下りないそうだ。','もう開ける気がないのかも。','言うべきかもしれない。'] },
    },
  ],
}
