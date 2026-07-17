import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'diminutivos-aumentativos-a2',
  order: '15',
  color: '#166534',
  category: 'Vocabulario',
  level: 'A2',
  title: 'Diminutivos e aumentativos en portugués A2: -inho, -inha, -ão, -ona',
  shortTitle: 'Diminutivos e aumentativos',
  metaTitle: 'Diminutivos y aumentativos en portugués A2 — -inho, -ão y sus usos afectivos',
  description:
    'Los diminutivos (-inho/-inha) y aumentativos (-ão/-ona) son una característica fundamental del portugués brasileño. Se usan no solo para indicar tamaño, sino también para expresar afecto, amabilidad, urgencia o énfasis. "Um cafezinho" no es solo un café pequeño — es un café pedido con cortesía o afecto.',
  lead: 'Um cafezinho, por favor: los diminutivos y aumentativos que hacen el português más natural.',
  outcomes: [
    'Formar diminutivos con -inho/-inha correctamente',
    'Formar aumentativos con -ão/-ona/-ão/-ões',
    'Entender el valor afectivo y social del diminutivo en portugués brasileño',
    'Reconocer los cambios ortográficos al añadir los sufijos',
  ],

  guide: {
    goal: 'Usar los sufijos diminutivos e aumentativos para expresar tamaño, afecto y matices sociales.',
    model: 'Um cafezinho, por favor. / Ele tem um carrão. / Espera um minutinho!',
    formula: 'Diminutivo: raíz + inho/inha | Aumentativo: raíz + ão/ona/ões/as',
    decisions: [
      'Diminutivo -inho/-inha: mesa → mesinha, café → cafezinho, livro → livrinho',
      'Cambios ortográficos: palabras en -ca/-ga → -quinha/-guinha: boca → boquinha; palabras en -co/-go → -quinho/-guinho: amigo → amiguinho',
      'Palabras en -l → -zinho: pastel → pastelzinho; palabras en -m/-ns → -zinho: homem → homenzinho',
      'Aumentativo -ão/-ona (masc./femm.): carro → carrão, mulher → mulherona, nariz → narigão',
      'Aumentativo -ão puede pluralizar en -ões: carrão → carrões; o en -ãos: mão → mãos',
      'Uso afectivo del diminutivo: "Espera um minutinho" = por favor, espera un momento (amable)',
    ],
    table: [
      ['Original', 'Diminutivo', 'Aumentativo'],
      ['café', 'cafezinho', '(cafezão - informal)'],
      ['carro', 'carrinho', 'carrão'],
      ['casa', 'casinha', 'casarão'],
    ],
    mistakes: [
      '"Um cafinho" ❌ → "Um cafezinho" ✓ — "café" termina en vocal tónica → añade -z- antes de -inho.',
      '"Uma bocainha" ❌ → "Uma boquinha" ✓ — boca → boquinha (cambio -ca → -qu- para preservar el sonido /k/).',
      '"Um nariginho" ❌ → "Um narizinho" ✓ — nariz → narizinho (cambio ortográfico en -z).',
    ],
  },

  seo: [
    {
      heading: 'El diminutivo en portugués brasileño: mucho más que tamaño',
      paragraphs: [
        'En el portugués de Brasil, el diminutivo (-inho/-inha) es mucho más que un indicador de tamaño pequeño. Se usa para expresar afecto ("meu filhinho"), cortesía ("Um cafezinho, por favor"), urgencia atenuada ("Espera um minutinho") y proximidad emocional.',
        'La formación varía según la terminación de la palabra: café → cafezinho (con -z- intercalada); boca → boquinha (cambio -ca → -qu-); pastel → pastelzinho (con -z-). Estas irregularidades reflejan las reglas de fonología del portugués para preservar los sonidos originales.',
      ],
    },
    {
      heading: 'El aumentativo: énfasis y exageración',
      paragraphs: [
        'El aumentativo (-ão/-ona) indica gran tamaño pero también énfasis o exageración: "carrão" (cochazo), "casarão" (casón), "mulherona" (mujerona). También puede tener connotaciones despectivas según el contexto.',
        'En Brasil, el aumentativo se usa mucho en la lengua coloquial para expresar admiración o exageración positiva: "Que homem lindão!" (¡Qué hombre tan guapo!). Es más informal que el diminutivo.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Diminutivos e aumentativos: sufijos para tamaño, afecto y énfasis.',
    graphicPrompt: 'Una taza pequeña de café con -inho y un coche grande con -ão, mostrando el contraste.',
    scene: [
      ['Um cafezinho, por favor!', '¡Un cafecito, por favor!'],
      ['Meu filhinho, te amo!', '¡Mi hijito, te quiero!'],
      ['Espera um minutinho, tá?', 'Espera un momentito, ¿sí?'],
      ['Ele tem um carrão lindo!', '¡Tiene un cochazo precioso!'],
      ['A casinha da vovó é muito fofa.', 'La casita de la abuela es muy mona.'],
      ['Que narigão enorme!', '¡Qué narizón tan enorme!'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-inho/-inha', '-ão/-ona', 'valor afectivo del diminutivo'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma el diminutivo',
        tag: 'Opción múltiple',
        intro: 'Selecciona el diminutivo correcto para cada palabra.',
        type: 'choice',
        items: [
          {
            scene: 'La palabra "café" en diminutivo.',
            lines: [['', 'Café → ___']],
            options: ['cafezinho', 'cafinho', 'cafesinho', 'cafeinho'],
            answer: 'cafezinho',
            explain: '"café" termina en vocal tónica → se añade -z- antes de -inho: cafezinho.',
          },
          {
            scene: 'La palabra "boca" en diminutivo.',
            lines: [['', 'Boca → ___']],
            options: ['boquinha', 'bocainha', 'bocinha', 'boquina'],
            answer: 'boquinha',
            explain: '"boca" → -ca cambia a -qu- para preservar /k/: boquinha.',
          },
          {
            scene: 'La palabra "livro" (libro) en diminutivo.',
            lines: [['', 'Livro → ___']],
            options: ['livrinho', 'livrãozinho', 'livrozinho', 'livresinho'],
            answer: 'livrinho',
            explain: '"livro" termina en -o → simplemente -inho: livrinho.',
          },
          {
            scene: 'La palabra "carro" en aumentativo.',
            lines: [['', 'Carro → ___']],
            options: ['carrão', 'carrozão', 'carreão', 'carraço'],
            answer: 'carrão',
            explain: '"carro" → aumentativo -ão: carrão (cochazo).',
          },
          {
            scene: 'La palabra "casa" en diminutivo.',
            lines: [['', 'Casa → ___']],
            options: ['casinha', 'casainha', 'cazinha', 'casezinha'],
            answer: 'casinha',
            explain: '"casa" termina en -a → -inha: casinha.',
          },
          {
            scene: 'La palabra "nariz" en aumentativo.',
            lines: [['', 'Nariz → ___']],
            options: ['narigão', 'narizão', 'narizote', 'narizone'],
            answer: 'narigão',
            explain: '"nariz" → aumentativo irregular: narigão (con cambio de -z a -g-).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Tamaño y sentimiento',
        tag: '2 espacios',
        intro: 'Completa con el diminutivo o aumentativo según el contexto.',
        type: 'dual',
        items: [
          {
            scene: 'Pidiendo algo con amabilidad y hablando de un coche grande.',
            lines: [['', 'Me dá um [[0]], por favor? Que [[1]] mais bonito!']],
            blanks: [
              { options: ['cafezinho', 'cafão', 'café grande', 'café pequeno'], answer: 'cafezinho', explain: 'Diminutivo como forma cortés de pedir un café.' },
              { options: ['carrão', 'carrinho', 'carro normal', 'carro'], answer: 'carrão', explain: 'Aumentativo para expresar admiración por el tamaño.' },
            ],
          },
          {
            scene: 'Hablando de la casita de la abuela y pidiendo esperar un momento.',
            lines: [['', 'A [[0]] da vovó é linda. Espera um [[1]]!']],
            blanks: [
              { options: ['casinha', 'casão', 'casa pequena', 'casarão'], answer: 'casinha', explain: 'Diminutivo con valor afectivo: "casita" con cariño.' },
              { options: ['minutinho', 'minuto', 'minutão', 'minutazão'], answer: 'minutinho', explain: 'Diminutivo para atenuar la solicitud de esperar.' },
            ],
          },
          {
            scene: 'Describiendo a un bebé y a un hombre muy grande.',
            lines: [['', 'Que [[0]] lindo! Já o pai dele é um [[1]].']],
            blanks: [
              { options: ['bebezinho', 'bebêzão', 'bebê normal', 'bebê'], answer: 'bebezinho', explain: 'Diminutivo afectivo para el bebé.' },
              { options: ['homenzarrão', 'homenzinho', 'homenão', 'homemzão'], answer: 'homenzarrão', explain: 'Aumentativo enfático para un hombre muy grande.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Conversación con diminutivos',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta (diminutivo o aumentativo) según el contexto.',
        type: 'guidedText',
        scene: 'Ana e seu filho João numa cafeteria.',
        text: 'Ana: João, quer um [[0]]? João: Quero, mãe! E um [[1]] de chocolate também! Ana: Tudo bem, mas espera um [[2]]... João: Que [[3]] legal essa cafeteria, mãe! Ana: É mesmo, mas não faz tanto [[4]] assim, filho.',
        blanks: [
          { options: ['suco', 'suquinho', 'sucão', 'suco grande'], answer: 'suquinho', explain: 'Diminutivo afectivo para ofrecer algo a un niño.' },
          { options: ['bolinho', 'bolão', 'bolo', 'bolacha'], answer: 'bolinho', explain: '"bolinho de chocolate" = pastelito de chocolate (diminutivo de "bolo").' },
          { options: ['minutinho', 'minuto', 'minutão', 'hora'], answer: 'minutinho', explain: 'Diminutivo para pedir que espere con amabilidad.' },
          { options: ['lugarzinho', 'lugarzão', 'lugar', 'lugarzito'], answer: 'lugarzão', explain: 'Aumentativo para expresar que el lugar es grande e impresionante.' },
          { options: ['barulho', 'barulhinho', 'barulhão', 'barulhísimo'], answer: 'barulhão', explain: 'Aumentativo = "tanto ruido/escándalo".' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el diminutivo o aumentativo',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma correcta del diminutivo o aumentativo.',
        type: 'freeText',
        scene: 'Transformando palavras com sufixos.',
        text: 'Mesa (dim.) → ___. / Cão (dim.) → ___. / Mulher (aum.) → ___. / Amor (dim.) → ___. / Nariz (aum.) → ___.',
        blanks: [
          { answer: 'mesinha', explain: '"mesa" → -a + -inha = mesinha.' },
          { answer: 'cãozinho', explain: '"cão" → cãozinho (con -z- y manteniendo la nasalidad).' },
          { answer: 'mulherona', explain: '"mulher" → mulherona (aumentativo femenino).' },
          { answer: 'amorzinho', explain: '"amor" → amorzinho (añade -z- ante -inho).' },
          { answer: 'narigão', explain: '"nariz" → narigão (cambio irregular -z → -g-).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Usa el diminutivo en contexto',
        tag: 'Escritura guiada',
        intro: 'Reescribe la frase usando el diminutivo con valor afectivo o de cortesía.',
        type: 'write',
        items: [
          {
            scene: 'Pide un café de forma amable.',
            prompt: 'Me dá um café? → (con diminutivo cortés)',
            answer: 'Me dá um cafezinho, por favor?',
            accepted: ['Um cafezinho, por favor?'],
            explain: 'El diminutivo hace la petición más cortés y afable en Brasil.',
          },
          {
            scene: 'Pide que alguien espere un momento.',
            prompt: 'Espera um momento. → (con diminutivo)',
            answer: 'Espera um minutinho!',
            accepted: ['Espera um momentinho!'],
            explain: 'El diminutivo atenúa la petición y la hace más amable.',
          },
          {
            scene: 'Habla de la casa pequeña de tu abuela con cariño.',
            prompt: 'A casa da minha avó é pequena e bonita. → (con diminutivo afectivo)',
            answer: 'A casinha da minha avó é muito linda.',
            accepted: ['A casinha da vovó é linda.'],
            explain: 'El diminutivo "casinha" añade afecto y ternura a la descripción.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe con diminutivos y aumentativos',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones usando diminutivos y/o aumentativos de forma natural.',
        type: 'write',
        items: [
          {
            scene: 'Describe un café o restaurante usando diminutivos y aumentativos.',
            prompt: 'Descreva um lugar usando pelo menos um diminutivo e um aumentativo.',
            answer: 'Tem uma cafezinha linda no centro, mas o preço é um absurdão.',
            accepted: ['A mesinha era pequeninha, mas o prato era um pratão enorme.'],
            explain: 'Combina diminutivos afectivos y aumentativos para dar vivacidad al relato.',
          },
          {
            scene: 'Escribe lo que pedirías con amabilidad en un café.',
            prompt: 'O que você pediria num café? Escreva seu pedido com diminutivos.',
            answer: 'Me dá um cafezinho e um bolinho de chocolate, por favor?',
            accepted: ['Quero um suquinho de laranja e um sanduichinho, por favor.'],
            explain: 'El diminutivo en pedidos = cortesía natural en el portugués de Brasil.',
          },
        ],
      },
    ],
  },
}

export default topic
