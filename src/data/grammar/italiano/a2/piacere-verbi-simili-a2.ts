import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'piacere-verbi-simili-a2',
  order: '16',
  color: '#009246',
  category: 'Verbos',
  level: 'A2',
  title: 'Piacere e verbi simili en italiano A2: mi piace, mi dispiace, mi serve',
  shortTitle: 'Piacere e simili',
  metaTitle: 'Piacere en italiano A2 — mi piace, mi manca, mi serve, mi interessa',
  description:
    'El verbo "piacere" y otros verbos similares (dispiacere, mancare, interessare, servire, bastare) funcionan al revés que en español: la cosa que gusta es el sujeto gramatical y la persona que experimenta el sentimiento lleva el pronombre de objeto indirecto.',
  lead: 'Mi piace il caffè: el sistema invertido de piacere y sus verbos hermanos.',
  outcomes: [
    'Usar piacere con piace (singular) y piacciono (plural)',
    'Usar los pronombres indirectos: mi, ti, gli/le, ci, vi, gli',
    'Aplicar dispiacere, mancare, interessare, servire y bastare',
    'Distinguir la estructura italiana (cosa = sujeto) de la española (yo gusto la cosa)',
  ],

  guide: {
    goal: 'Expresar gustos, necesidades y sentimientos con piacere y verbos similares.',
    model: 'Mi piace il caffè. / Ti piacciono i film di fantascienza? / Le manca la famiglia.',
    formula: 'Pronome indiretto (mi/ti/gli/le/ci/vi/gli) + piace + sing. / piacciono + plur.',
    decisions: [
      'La cosa que gusta es el SUJETO del verbo: "il caffè" → piace (singular)',
      'Si la cosa es plural, el verbo va en plural: "i film" → piacciono',
      'La persona que experimenta el gusto lleva pronombre indirecto: mi (a mí), ti (a ti), gli/le (a él/ella)',
      'Para énfasis o claridad se añade "a me/a te/a lui/a lei...": "A me piace, a te no"',
      'mancare funciona igual: mi manca (me falta/echo de menos) / mi mancano (me faltan)',
    ],
    table: [
      ['Verbo', 'Uso', 'Esempio'],
      ['piacere', 'gustar', 'Mi piace la pizza. / Mi piacciono i film.'],
      ['dispiacere', 'lamentar / disgustar', 'Mi dispiace, non posso venire.'],
      ['mancare', 'faltar / echar de menos', 'Mi manca Roma. / Mi mancano gli amici.'],
      ['interessare', 'interesar', 'Mi interessa la storia.'],
      ['servire', 'necesitar / hacer falta', 'Mi serve un favore.'],
    ],
    mistakes: [
      '"Mi piacono i film" ❌ → "Mi piacciono i film" ✓ — Con sujeto plural es "piacciono".',
      '"Mi piace i film" ❌ → "Mi piacciono i film" ✓ — El verbo concuerda con el sujeto (i film = plural).',
      '"Io piaccio il caffè" ❌ → "Mi piace il caffè" ✓ — Nunca se usa "io" como sujeto con piacere en este sentido.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo funciona "piacere" en italiano?',
      paragraphs: [
        'En italiano, "piacere" funciona al contrario que "gustar" en español formal. La cosa que gusta es el sujeto del verbo, y la persona que experimenta el gusto lleva el pronombre de objeto indirecto. "Mi piace il caffè" = literalmente "el café me place a mí".',
        '"Piace" se usa con sustantivos singulares o infinitivos: mi piace la pasta, mi piace leggere. "Piacciono" se usa con sustantivos plurales: mi piacciono i libri, mi piacciono le vacanze.',
      ],
    },
    {
      heading: 'Verbos que funcionan como piacere',
      paragraphs: [
        'Varios verbos italianos funcionan con la misma estructura invertida: dispiacere (lamentar), mancare (echar de menos/faltar), interessare (interesar), servire (necesitar), bastare (bastar), sembrare (parecer). Todos siguen la misma lógica: la cosa es el sujeto.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Piacere y verbos similares: estructura invertida, pronombres indirectos.',
    graphicPrompt: 'Persona señalando un plato de comida con corazones, con la estructura mi piace.',
    scene: [
      ['Mi piace molto la pizza!', '¡Me gusta mucho la pizza!'],
      ['Ti piacciono i film d\'azione?', '¿Te gustan las películas de acción?'],
      ['Gli manca la sua città.', 'Echa de menos su ciudad.'],
      ['Ci interessa la cultura italiana.', 'Nos interesa la cultura italiana.'],
      ['Mi serve un po\' di aiuto.', 'Necesito un poco de ayuda.'],
      ['Mi dispiace, non posso venire.', 'Lo siento, no puedo venir.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['piace vs piacciono', 'pronombres indirectos', 'mancare e servire'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Piace o piacciono',
        tag: 'Opción múltiple',
        intro: 'Elige piace o piacciono según el sujeto.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando de comida italiana.',
            lines: [['', 'Mi ___ la pasta.']],
            options: ['piace', 'piacciono', 'piacono', 'piaccio'],
            answer: 'piace',
            explain: '"La pasta" = singular → piace.',
          },
          {
            scene: 'Preguntando sobre películas.',
            lines: [['', 'Ti ___ i film di fantascienza?']],
            options: ['piacciono', 'piace', 'piacono', 'piaci'],
            answer: 'piacciono',
            explain: '"I film" = plural → piacciono.',
          },
          {
            scene: 'Un amigo habla de sus hobbies.',
            lines: [['', 'Gli ___ leggere e viaggiare.']],
            options: ['piace', 'piacciono', 'piaceno', 'piaccio'],
            answer: 'piace',
            explain: '"Leggere e viaggiare" → dos infinitivos → se consideran una sola unidad → piace.',
          },
          {
            scene: 'Hablando de lo que nos gusta a nosotros.',
            lines: [['', 'Ci ___ le vacanze al mare.']],
            options: ['piacciono', 'piace', 'piacono', 'piacciamo'],
            answer: 'piacciono',
            explain: '"Le vacanze" = plural → piacciono.',
          },
          {
            scene: 'Tu amiga habla de lo que le gusta.',
            lines: [['', 'Le ___ il gelato al cioccolato.']],
            options: ['piace', 'piacciono', 'piacono', 'piaci'],
            answer: 'piace',
            explain: '"Il gelato" = singular → piace.',
          },
          {
            scene: 'Preguntando a un grupo.',
            lines: [['', 'Vi ___ la musica classica?']],
            options: ['piace', 'piacciono', 'piacete', 'piacete'],
            answer: 'piace',
            explain: '"La musica classica" = singular → piace.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Pronombre y verbo',
        tag: '2 espacios',
        intro: 'Elige el pronombre indirecto y la forma verbal correcta.',
        type: 'dual',
        items: [
          {
            scene: 'A él le interesan los deportes.',
            lines: [['', '[[0]] [[1]] molto gli sport.']],
            blanks: [
              { options: ['Gli', 'Le', 'Mi', 'Ti'], answer: 'Gli', explain: '"a lui" = gli (pronombre indirecto masculino).' },
              { options: ['interessano', 'interessa', 'interesso', 'interessate'], answer: 'interessano', explain: '"gli sport" = plural → interessano.' },
            ],
          },
          {
            scene: 'A mí me falta mi familia.',
            lines: [['', '[[0]] [[1]] molto la mia famiglia.']],
            blanks: [
              { options: ['Mi', 'Ti', 'Gli', 'Ci'], answer: 'Mi', explain: '"a me" = mi.' },
              { options: ['manca', 'mancano', 'manco', 'mancate'], answer: 'manca', explain: '"la mia famiglia" = singular → manca.' },
            ],
          },
          {
            scene: 'A vosotros os hacen falta ayudantes.',
            lines: [['', '[[0]] [[1]] degli assistenti.']],
            blanks: [
              { options: ['Vi', 'Ci', 'Gli', 'Le'], answer: 'Vi', explain: '"a voi" = vi.' },
              { options: ['servono', 'serve', 'servo', 'servite'], answer: 'servono', explain: '"degli assistenti" = plural → servono.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Gustos y necesidades en un texto',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta de piacere y verbos similares.',
        type: 'guidedText',
        scene: 'Maria describe sus gustos y lo que le falta estando de vacaciones.',
        text: 'Sono a Parigi per lavoro. Mi [[0]] la città, è bellissima! Mi [[1]] anche i musei. Ma mi [[2]] la famiglia e gli amici. Mi [[3]] anche il caffè italiano — il caffè francese non mi [[4]] molto.',
        blanks: [
          { options: ['piace', 'piacciono', 'piacono', 'piaci'], answer: 'piace', explain: '"La città" = singular → piace.' },
          { options: ['piacciono', 'piace', 'piacono', 'piaccio'], answer: 'piacciono', explain: '"I musei" = plural → piacciono.' },
          { options: ['manca', 'mancano', 'manco', 'mancate'], answer: 'manca', explain: '"La famiglia e gli amici" → con "e" puede ir en plural o singular → manca (tratado como unidad).' },
          { options: ['manca', 'mancano', 'piace', 'manco'], answer: 'manca', explain: '"Il caffè italiano" = singular → manca.' },
          { options: ['piace', 'piacciono', 'piaccio', 'piacono'], answer: 'piace', explain: '"Il caffè francese" = singular → piace.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa libremente',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe el verbo correcto (piace, piacciono, manca, mancano, serve, interessa).',
        type: 'freeText',
        scene: 'Un estudiante describe sus gustos e intereses.',
        text: 'Mi ___ studiare le lingue. / Mi ___ i libri di avventura. / Mi ___ un dizionario. / Mi ___ la pizza napoletana. / Non mi ___ le matematiche.',
        blanks: [
          { answer: 'piace', explain: '"studiare" = infinitivo singular → piace.' },
          { answer: 'piacciono', explain: '"i libri" = plural → piacciono.' },
          { answer: 'serve', explain: '"un dizionario" = singular → serve.' },
          { answer: 'piace', explain: '"la pizza" = singular → piace.' },
          { answer: 'piacciono', explain: '"le matematiche" = plural → piacciono.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Transforma la oración',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración en italiano con piacere u otro verbo similar.',
        type: 'write',
        items: [
          {
            scene: '"A me piacciono i gatti." Cambia a "A lei".',
            prompt: 'A me piacciono i gatti. → A lei...',
            answer: 'A lei piacciono i gatti.',
            accepted: ['Le piacciono i gatti.'],
            explain: '"mi" → "le" (a lei). El verbo no cambia: piacciono (plural).',
          },
          {
            scene: 'Expresa que a ti te hace falta el sol (mancano/manca).',
            prompt: 'Expresa: a ti te falta el sol.',
            answer: 'Mi manca il sole.',
            accepted: ['A me manca il sole.'],
            explain: '"il sole" = singular → manca. "a te" → "ti manca".',
          },
          {
            scene: 'Expresa que a ellos les hacen falta los amigos.',
            prompt: 'Expresa: a ellos les faltan los amigos.',
            answer: 'Gli mancano gli amici.',
            accepted: ['A loro mancano gli amici.'],
            explain: '"gli amici" = plural → mancano. "a loro" → "gli".',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe sobre tus gustos',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones originales con piacere, mancare o interessare.',
        type: 'write',
        items: [
          {
            scene: 'Describe dos cosas que te gustan y una que no te gusta.',
            prompt: 'Scrivi tre frasi su cosa ti piace e cosa non ti piace.',
            answer: 'Mi piace la musica jazz. Mi piacciono i film italiani. Non mi piace alzarmi presto.',
            accepted: [
              'Mi piace leggere. Mi piacciono le lingue straniere. Non mi piace il freddo.',
            ],
            explain: 'piace + singular/infinitivo; piacciono + plural.',
          },
          {
            scene: 'Describe qué te falta cuando estás lejos de casa.',
            prompt: 'Cosa ti manca quando sei lontano da casa? Scrivi due frasi.',
            answer: 'Mi manca la mia famiglia. Mi mancano i miei amici.',
            accepted: [
              'Mi manca il cibo di casa. Mi mancano le feste di Natale.',
            ],
            explain: '"mancare" = echar de menos. Singular → manca; plural → mancano.',
          },
        ],
      },
    ],
  },
}

export default topic
