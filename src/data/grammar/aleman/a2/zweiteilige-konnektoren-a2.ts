import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'zweiteilige-konnektoren-a2',
  order: '17',
  color: '#c9a900',
  category: 'Sintaxis',
  level: 'A2',
  title: 'Zweiteilige Konnektoren en alemán A2: entweder…oder, sowohl…als auch',
  shortTitle: 'Zweiteilige Konnektoren',
  metaTitle: 'Conectores en pares en alemán A2 — entweder…oder, sowohl…als auch y más',
  description:
    'Los conectores en pares (zweiteilige Konnektoren) son expresiones que aparecen siempre en dos partes para conectar alternativas, inclusiones o exclusiones. Incluyen entweder…oder, sowohl…als auch, weder…noch y nicht nur…sondern auch.',
  lead: 'Conectores dobles que elevan tu alemán: entweder…oder, sowohl…als auch y más.',
  outcomes: [
    'Usar entweder…oder para expresar alternativas',
    'Usar sowohl…als auch para expresar inclusión simultánea',
    'Usar weder…noch para la negación doble',
    'Usar nicht nur…sondern auch para añadir información',
  ],

  guide: {
    goal: 'Conectar ideas con los cuatro conectores en pares principales del alemán A2.',
    model: 'Ich trinke entweder Kaffee oder Tee. / Sie spricht sowohl Englisch als auch Spanisch.',
    formula: 'entweder + A + oder + B / sowohl + A + als auch + B / weder + A + noch + B / nicht nur + A + sondern auch + B',
    decisions: [
      'entweder…oder = o…o (alternativa exclusiva): Entweder du kommst, oder ich gehe alleine.',
      'sowohl…als auch = tanto…como (inclusión): Er ist sowohl intelligent als auch fleißig.',
      'weder…noch = ni…ni (exclusión doble, siempre negativa): Sie trinkt weder Kaffee noch Tee.',
      'nicht nur…sondern auch = no solo…sino también (adición): Das ist nicht nur falsch, sondern auch gefährlich.',
      'Con entweder al inicio de frase, el orden del verbo cambia (Verb-2): Entweder kommt er, oder er ruft an.',
    ],
    table: [
      ['Konnektor', 'Bedeutung', 'Beispiel'],
      ['entweder…oder', 'o…o', 'Entweder Kaffee oder Tee'],
      ['sowohl…als auch', 'tanto…como', 'sowohl Deutsch als auch Englisch'],
      ['weder…noch', 'ni…ni', 'weder Fleisch noch Fisch'],
      ['nicht nur…sondern auch', 'no solo…sino también', 'nicht nur groß, sondern auch stark'],
    ],
    mistakes: [
      '"Sowohl…oder" ❌ → "Sowohl…als auch" ✓ — "sowohl" siempre va con "als auch".',
      '"Weder…oder" ❌ → "Weder…noch" ✓ — La negación doble usa "noch", no "oder".',
      '"Entweder er kommt oder er geht" con doble sujeto sin inversión ❌ → "Entweder kommt er, oder er geht" ✓ cuando entweder está al inicio.',
    ],
  },

  seo: [
    {
      heading: '¿Qué son los zweiteilige Konnektoren?',
      paragraphs: [
        'Los conectores en pares son estructuras que siempre aparecen en dos partes: la primera parte introduce el primer elemento y la segunda cierra la conexión. Son fundamentales para conectar ideas de forma elegante en alemán.',
        'Los cuatro conectores principales en A2 son: entweder…oder (alternativa), sowohl…als auch (inclusión doble), weder…noch (negación doble) y nicht nur…sondern auch (adición enfática).',
      ],
    },
    {
      heading: 'Posición en la oración',
      paragraphs: [
        'Cuando entweder aparece al inicio de oración, provoca inversión del sujeto y verbo: "Entweder kommst du jetzt, oder wir gehen ohne dich." Los demás conectores no suelen provocar inversión cuando están en posición interna.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Zweiteilige Konnektoren: conectores en pares para alternativas e inclusiones.',
    graphicPrompt: 'Persona decidiendo entre dos opciones con flechas hacia cada lado.',
    scene: [
      ['Entweder gehen wir ins Kino oder ins Theater.', 'O vamos al cine o al teatro.'],
      ['Sie spricht sowohl Deutsch als auch Französisch.', 'Ella habla tanto alemán como francés.'],
      ['Er isst weder Fleisch noch Fisch.', 'Él no come ni carne ni pescado.'],
      ['Das Buch ist nicht nur interessant, sondern auch lehrreich.', 'El libro no solo es interesante, sino también instructivo.'],
      ['Entweder du hilfst mir, oder ich mache es alleine.', 'O me ayudas o lo hago solo.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['entweder…oder', 'sowohl…als auch', 'weder…noch'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el conector correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona entweder…oder, sowohl…als auch, weder…noch o nicht nur…sondern auch.',
        type: 'choice',
        items: [
          {
            scene: 'Una persona que no bebe alcohol ni cafeína.',
            lines: [['', 'Er trinkt ___ Alkohol ___ Kaffee.']],
            options: ['weder / noch', 'sowohl / als auch', 'entweder / oder', 'nicht nur / sondern'],
            answer: 'weder / noch',
            explain: 'Negación doble: ni…ni → weder…noch.',
          },
          {
            scene: 'Eligiendo entre dos restaurantes.',
            lines: [['Ana', '___ gehen wir zum Italiener, ___ zum Griechen.']],
            options: ['Entweder / oder', 'Sowohl / als auch', 'Weder / noch', 'Nicht nur / sondern'],
            answer: 'Entweder / oder',
            explain: 'Alternativa entre dos opciones → entweder…oder.',
          },
          {
            scene: 'Describiendo las habilidades de un músico.',
            lines: [['', 'Er spielt ___ Gitarre ___ Klavier.']],
            options: ['sowohl / als auch', 'entweder / oder', 'weder / noch', 'aber / auch'],
            answer: 'sowohl / als auch',
            explain: 'Toca los dos instrumentos → sowohl…als auch.',
          },
          {
            scene: 'Hablando de un buen profesor.',
            lines: [['', 'Sie ist ___ kompetent, ___ sehr geduldig.']],
            options: ['nicht nur / sondern auch', 'weder / noch', 'entweder / oder', 'sowohl / oder'],
            answer: 'nicht nur / sondern auch',
            explain: 'Añade información adicional positiva → nicht nur…sondern auch.',
          },
          {
            scene: 'Una niña que no le gustan las verduras ni la fruta.',
            lines: [['Mamá', 'Sie mag ___ Gemüse ___ Obst.']],
            options: ['weder / noch', 'sowohl / als auch', 'entweder / oder', 'nicht / sondern'],
            answer: 'weder / noch',
            explain: 'Negación doble → weder…noch.',
          },
          {
            scene: 'Hablando del trabajo de un diseñador.',
            lines: [['', 'Er arbeitet ___ kreativ ___ präzise.']],
            options: ['sowohl / als auch', 'weder / noch', 'entweder / oder', 'nicht nur / aber auch'],
            answer: 'sowohl / als auch',
            explain: 'Dos cualidades positivas simultáneas → sowohl…als auch.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Completa con dos partes del conector',
        tag: '2 espacios',
        intro: 'Pon la segunda parte del conector en el espacio correcto.',
        type: 'dual',
        items: [
          {
            scene: 'Hablando del clima.',
            lines: [['', 'Das Wetter ist [[0]] kalt [[1]] nass.']],
            blanks: [
              { options: ['nicht nur', 'sowohl', 'entweder', 'weder'], answer: 'nicht nur', explain: 'La segunda parte será "sondern auch" → primera parte: nicht nur.' },
              { options: ['sondern auch', 'als auch', 'noch', 'oder'], answer: 'sondern auch', explain: '"nicht nur…sondern auch" — no solo…sino también.' },
            ],
          },
          {
            scene: 'Sobre un estudiante indeciso.',
            lines: [['', 'Er studiert [[0]] Medizin [[1]] Jura — er weiß es noch nicht.']],
            blanks: [
              { options: ['entweder', 'sowohl', 'weder', 'nicht nur'], answer: 'entweder', explain: 'Alternativa exclusiva → entweder.' },
              { options: ['oder', 'als auch', 'noch', 'sondern auch'], answer: 'oder', explain: '"entweder…oder" = o…o.' },
            ],
          },
          {
            scene: 'Una persona que habla tres idiomas.',
            lines: [['', 'Sie spricht [[0]] Englisch [[1]] Spanisch.']],
            blanks: [
              { options: ['sowohl', 'entweder', 'weder', 'nicht'], answer: 'sowohl', explain: 'Habla los dos idiomas → sowohl.' },
              { options: ['als auch', 'oder', 'noch', 'sondern auch'], answer: 'als auch', explain: '"sowohl…als auch" = tanto…como.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Conecta ideas en un texto',
        tag: 'Texto guiado',
        intro: 'Elige el conector adecuado en cada espacio del texto.',
        type: 'guidedText',
        scene: 'Una persona describe sus preferencias y habilidades.',
        text: 'Ich spreche [[0]] Deutsch [[1]] Englisch. In meiner Freizeit spiele ich [[2]] Tennis [[3]] Fußball. Ich mag [[4]] klassische Musik noch Jazz.',
        blanks: [
          { options: ['sowohl', 'entweder', 'weder', 'nicht nur'], answer: 'sowohl', explain: 'Habla los dos → sowohl.' },
          { options: ['als auch', 'oder', 'noch', 'sondern'], answer: 'als auch', explain: '"sowohl…als auch".' },
          { options: ['entweder', 'sowohl', 'weder', 'nicht nur'], answer: 'entweder', explain: 'Juega uno u otro → entweder.' },
          { options: ['oder', 'als auch', 'noch', 'sondern auch'], answer: 'oder', explain: '"entweder…oder".' },
          { options: ['weder', 'sowohl', 'entweder', 'nicht nur'], answer: 'weder', explain: 'No le gusta ninguno → weder…noch.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe los conectores',
        tag: 'Texto libre',
        intro: 'Sin opciones: completa con el conector correcto.',
        type: 'freeText',
        scene: 'Describiendo un restaurante muy bueno.',
        text: 'Das Restaurant ist [[0]] günstig [[1]] lecker. Es gibt [[2]] Fleisch [[3]] vegetarische Gerichte. Das Personal ist [[4]] nur freundlich, sondern auch sehr hilfsbereit.',
        blanks: [
          { answer: 'sowohl', explain: '"sowohl…als auch" — tanto…como.' },
          { answer: 'als auch', explain: 'Segunda parte de "sowohl…als auch".' },
          { answer: 'sowohl', explain: 'El restaurante tiene ambas opciones.' },
          { answer: 'als auch', explain: '"sowohl…als auch".' },
          { answer: 'nicht', explain: '"nicht nur…sondern auch".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Combina oraciones con conectores en pares',
        tag: 'Escritura guiada',
        intro: 'Une las dos ideas usando el conector indicado.',
        type: 'write',
        items: [
          {
            scene: 'Une con "sowohl…als auch": "Er lernt Deutsch." + "Er lernt Spanisch."',
            prompt: 'Er lernt Deutsch. Er lernt Spanisch.',
            answer: 'Er lernt sowohl Deutsch als auch Spanisch.',
            accepted: ['Sowohl Deutsch als auch Spanisch lernt er.'],
            explain: '"sowohl…als auch" conecta dos elementos simultáneos.',
          },
          {
            scene: 'Une con "weder…noch": "Sie trinkt keinen Kaffee." + "Sie trinkt keinen Tee."',
            prompt: 'Sie trinkt keinen Kaffee. Sie trinkt keinen Tee.',
            answer: 'Sie trinkt weder Kaffee noch Tee.',
            accepted: ['Weder Kaffee noch Tee trinkt sie.'],
            explain: '"weder…noch" reemplaza las dos negaciones.',
          },
          {
            scene: 'Une con "entweder…oder": "Wir fahren nach Berlin." o "Wir fahren nach München."',
            prompt: 'Wir fahren nach Berlin oder nach München.',
            answer: 'Wir fahren entweder nach Berlin oder nach München.',
            accepted: ['Entweder fahren wir nach Berlin, oder wir fahren nach München.'],
            explain: '"entweder…oder" enfatiza la alternativa.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe con conectores en pares',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones originales usando los conectores en pares.',
        type: 'write',
        items: [
          {
            scene: 'Describe dos cosas que sabes hacer.',
            prompt: 'Escribe una oración con "sowohl…als auch".',
            answer: 'Ich kann sowohl kochen als auch backen.',
            accepted: [
              'Ich spreche sowohl Englisch als auch Französisch.',
              'Er ist sowohl groß als auch stark.',
            ],
            explain: '"sowohl…als auch" para mencionar dos habilidades o características simultáneas.',
          },
          {
            scene: 'Describe algo que no te gusta nada.',
            prompt: 'Escribe una oración con "weder…noch".',
            answer: 'Ich mag weder Spinat noch Brokkoli.',
            accepted: [
              'Er trinkt weder Bier noch Wein.',
              'Sie mag weder Sport noch Musik.',
            ],
            explain: '"weder…noch" para la negación doble — ninguna de las dos opciones.',
          },
        ],
      },
    ],
  },
}

export default topic
