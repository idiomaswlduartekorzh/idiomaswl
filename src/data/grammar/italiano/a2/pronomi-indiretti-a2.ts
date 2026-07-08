import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pronomi-indiretti-a2',
  order: '07',
  color: '#009246',
  category: 'Pronomi',
  level: 'A2',
  title: 'Los pronombres indirectos en italiano A2 — gli, le, mi, ti',
  shortTitle: 'Pronombres indirectos',
  metaTitle: 'Pronombres indirectos italiano A2 — gli, le, mi, ti, ci, vi, loro',
  description:
    'Los pronombres de objeto indirecto (pronomi indiretti) reemplazan el complemento introducido por la preposición "a". Responden a la pregunta "¿a quién?". Son: mi (a mí), ti (a ti), gli (a él), le (a ella/usted), ci (a nosotros), vi (a vosotros), gli/loro (a ellos/ellas).',
  lead: 'mi (a mí) / ti (a ti) / gli (a él) / le (a ella/Ud.) / ci (a nosotros) / vi (a vosotros) / gli (a ellos). Van ANTES del verbo.',
  outcomes: [
    'Distinguir pronombres directos e indirectos',
    'Usar correctamente gli y le para la tercera persona',
    'Colocar el pronombre indirecto antes del verbo conjugado',
    'Construir oraciones con verbos como scrivere, telefonare, dare, dire + pronombre indirecto',
  ],

  guide: {
    goal: 'Reemplazar el complemento indirecto (a + persona) con el pronombre indirecto correcto.',
    model: 'Scrivo a Marco → Gli scrivo. / Telefono a Sofia → Le telefono. / Mi dai il libro? → ¿Me das el libro?',
    formula: '[sujeto] + pronombre indirecto + verbo + (complemento directo)',
    decisions: [
      'mi → a mí: mi dai il libro? = ¿me das el libro?',
      'ti → a ti: ti scrivo domani = te escribo mañana',
      'gli → a él: gli telefono = le llamo (a él)',
      'le → a ella/usted formal: le scrivo una lettera = le escribo una carta (a ella)',
      'ci → a nosotros: ci manda un messaggio = nos manda un mensaje',
      'vi → a vosotros: vi rispondo subito = os respondo enseguida',
      'gli (o loro pospuesto) → a ellos/ellas: gli scrivo / scrivo loro = les escribo',
      'Verbos frecuentes con indirecto: dare, dire, mandare, scrivere, telefonare, rispondere, chiedere, piacere',
    ],
    table: [
      ['Persona', 'Pronombre indirecto', 'Ejemplo'],
      ['1ª sing.', 'mi', 'Marco mi dà i biglietti'],
      ['2ª sing.', 'ti', 'Ti mando il link domani'],
      ['3ª sing. masc.', 'gli', 'Gli scrivo una email'],
      ['3ª sing. fem.', 'le', 'Le telefono stasera'],
      ['1ª plur.', 'ci', 'Il professore ci spiega la grammatica'],
      ['2ª plur.', 'vi', 'Vi rispondo domani'],
      ['3ª plur.', 'gli / loro', 'Gli mando / Mando loro un messaggio'],
    ],
    mistakes: [
      'Confundir gli (indirecto masc.) y lo (directo masc.): Lo vedo (= lo veo) ≠ Gli parlo (= le hablo a él)',
      'Confundir le (indirecto fem.) y la (directo fem.): La vedo (= la veo) ≠ Le scrivo (= le escribo a ella)',
      'Colocar el pronombre después del verbo: Scrivo gli ✗ → Gli scrivo ✓',
    ],
  },

  seo: [
    {
      heading: '¿Cuál es la diferencia entre pronombre directo e indirecto en italiano?',
      paragraphs: [
        'El pronombre directo reemplaza el objeto que recibe directamente la acción (sin preposición): vedo Marco → lo vedo. El pronombre indirecto reemplaza el objeto introducido por "a": scrivo a Marco → gli scrivo.',
        'La pregunta clave: ¿a quién? Para el objeto indirecto. ¿A quién le escribes? → A Marco → Gli scrivo. Si en español dices "le" o "les" (le digo, les mando), en italiano usas gli o le.',
      ],
    },
    {
      heading: 'Gli o le: cómo elegir para la tercera persona',
      paragraphs: [
        'La tercera persona es la más delicada. Gli va con personas masculinas (a él, a ellos en italiano moderno): gli telefono (= le llamo a él). Le va con personas femeninas y con el usted formal: le scrivo (= le escribo a ella / a usted).',
        'En italiano contemporáneo gli se usa cada vez más para "a ellos/ellas", sustituyendo a "loro". "Gli mando un messaggio" es correcto y más natural que "Mando loro un messaggio".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante distingue directo (lo/la/li/le) de indirecto (gli/le/mi/ti) y aplica el pronombre correcto según el verbo.',
    graphicPrompt: 'Dos columnas: pronombres directos vs indirectos, con flechas hacia oraciones de ejemplo.',
    scene: [
      ['Scrivo a Marco → Gli scrivo.', 'Le escribo a Marco → Le escribo.'],
      ['Telefono a Sofia → Le telefono.', 'Llamo a Sofia → Le llamo.'],
      ['Mi dai il numero? → ¿Me das el número?', 'Me das el número.'],
      ['Vi mando il documento.', 'Os mando el documento.'],
    ],
    learnerModes: ['visual: tabla directo vs indirecto', 'analítico: verbos que piden indirecto', 'oral: situaciones de comunicación'],
    reviewFocus: ['gli (a él) vs le (a ella)', 'posición antes del verbo', 'verbos con indirecto: dare, dire, scrivere, telefonare'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'El pronombre indirecto correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el pronombre indirecto correcto para reemplazar el complemento subrayado.',
        type: 'choice',
        items: [
          {
            scene: 'La carta a Marco',
            lines: [['Sofia', '___ scrivo una lettera. (a Marco)']],
            options: ['Gli', 'Le', 'Lo', 'La'],
            answer: 'Gli',
            explain: 'A Marco = persona masculina → gli. Gli scrivo una lettera.',
          },
          {
            scene: 'El mensaje a Ana',
            lines: [['David', '___ mando un messaggio oggi. (ad Ana)']],
            options: ['Le', 'Gli', 'La', 'Lo'],
            answer: 'Le',
            explain: 'A Ana = persona femenina → le. Le mando un messaggio.',
          },
          {
            scene: 'El regalo para mí',
            lines: [['Marco', '— Cosa hai comprato? — ___ ho comprato un libro. (a te)']],
            options: ['Ti', 'Mi', 'Ci', 'Vi'],
            answer: 'Ti',
            explain: 'A ti = segunda persona → ti. Ti ho comprato un libro.',
          },
          {
            scene: 'La explicación',
            lines: [['Prof.', '___ spiego la regola adesso. (a voi studenti)']],
            options: ['Vi', 'Ci', 'Gli', 'Le'],
            answer: 'Vi',
            explain: 'A vosotros (estudiantes) → vi. Vi spiego la regola.',
          },
          {
            scene: 'La pregunta al jefe',
            lines: [['Giulia', 'Devo chiedere ___ il permesso. (al direttore)']],
            options: ['gli', 'le', 'lo', 'la'],
            answer: 'gli',
            explain: 'Al direttore = masculino → gli. Devo chiedergli il permesso.',
          },
          {
            scene: 'A los amigos',
            lines: [['Carlo', '___ telefono domani. (agli amici)']],
            options: ['Gli', 'Le', 'Li', 'Vi'],
            answer: 'Gli',
            explain: 'Agli amici = tercera persona plural → gli (moderno). Gli telefono domani.',
          },
          {
            scene: 'Mi familia',
            lines: [['Luca', '___ scrivo ogni settimana. (ai miei genitori)']],
            options: ['Gli', 'Le', 'Li', 'Vi'],
            answer: 'Gli',
            explain: 'Ai miei genitori = tercera persona plural → gli. Gli scrivo ogni settimana.',
          },
          {
            scene: 'La profesora',
            lines: [['Ana', '___ chiedo una cosa. (alla professoressa)']],
            options: ['Le', 'Gli', 'La', 'Li'],
            answer: 'Le',
            explain: 'Alla professoressa = femenino → le. Le chiedo una cosa.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Pronombre + verbo',
        tag: '2 espacios',
        intro: 'Completa con el pronombre indirecto correcto y el verbo indicado.',
        type: 'dual',
        items: [
          {
            scene: 'El regalo de cumpleaños',
            lines: [['Marco', '— Cosa regali a Giulia? — [[0]] [[1]] un libro di cucina.']],
            blanks: [
              { options: ['Le', 'Gli', 'La', 'Lo'], answer: 'Le', explain: 'A Giulia (femenino) → le.' },
              { options: ['regalo', 'regala', 'regali'], answer: 'regalo', explain: 'Io regalo (primera persona singular).' },
            ],
          },
          {
            scene: 'El consejo al amigo',
            lines: [['Sofia', '— Parli con Marco? — Sì, [[0]] [[1]] un consiglio.']],
            blanks: [
              { options: ['gli', 'le', 'lo', 'la'], answer: 'gli', explain: 'A Marco (masculino) → gli.' },
              { options: ['do', 'dai', 'da'], answer: 'do', explain: 'Dare: io do (irregular).' },
            ],
          },
          {
            scene: 'El email',
            lines: [['David', '— Hai risposto ai colleghi? — Sì, [[0]] [[1]] ieri.']],
            blanks: [
              { options: ['gli', 'le', 'li', 'vi'], answer: 'gli', explain: 'Ai colleghi = plural → gli.' },
              { options: ['ho risposto', 'ho risposta', 'sono risposto'], answer: 'ho risposto', explain: 'Rispondere con avere: ho risposto.' },
            ],
          },
          {
            scene: 'La noticia',
            lines: [['Giulia', '— Dici la notizia a me e a Carlo? — Sì, [[0]] [[1]] subito.']],
            blanks: [
              { options: ['vi', 'ci', 'gli', 'le'], answer: 'ci', explain: 'A me e a Carlo = a nosotros → ci.' },
              { options: ['dico', 'dice', 'dici'], answer: 'dico', explain: 'Io dico (primera persona singular).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Una conversación por mensajes',
        tag: 'Texto guiado',
        intro: 'Completa el texto con los pronombres indirectos correctos.',
        type: 'guidedText',
        scene: 'Sofia describe cómo se comunica con su familia y amigos',
        text: 'Ogni settimana [[0]] scrivo un messaggio a mia madre e lei [[1]] risponde sempre subito. A mio fratello [[2]] telefono il weekend. I miei amici? [[3]] mando spesso le foto delle mie vacanze. E al mio professore [[4]] mando le domande via email.',
        blanks: [
          { options: ['le', 'gli', 'mi', 'ci'], answer: 'le', explain: 'A mia madre = femenino singular → le.' },
          { options: ['mi', 'ti', 'gli', 'le'], answer: 'mi', explain: 'A mí (io) → mi. Lei mi risponde.' },
          { options: ['gli', 'le', 'mi', 'vi'], answer: 'gli', explain: 'A mio fratello = masculino → gli.' },
          { options: ['gli', 'le', 'ci', 'vi'], answer: 'gli', explain: 'Ai miei amici = plural → gli.' },
          { options: ['gli', 'le', 'mi', 'ci'], answer: 'gli', explain: 'Al professore = masculino → gli.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe el pronombre indirecto correcto.',
        type: 'freeText',
        scene: 'En WeLearn: David habla de su comunicación con estudiantes y colegas',
        text: 'Agli studenti [[0]] mando sempre i materiali prima della lezione. A Zhanna [[1]] chiedo consiglio quando ho un dubbio. I genitori degli studenti? [[2]] scrivo se c\'è un problema. Ai nuovi iscritti [[3]] do il benvenuto personalmente. E a voi, studenti, [[4]] auguro buono studio!',
        blanks: [
          { answer: 'gli', explain: 'Agli studenti = plural → gli.' },
          { answer: 'le', explain: 'A Zhanna (femenino) → le.' },
          { answer: 'Gli', explain: 'Ai genitori = plural → gli.' },
          { answer: 'gli', explain: 'Ai nuovi iscritti = plural → gli.' },
          { answer: 'vi', explain: 'A voi = segunda persona plural → vi.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Transformar con pronombres indirectos',
        tag: 'Escritura guiada',
        intro: 'Reescribe la oración usando el pronombre indirecto en lugar del complemento con "a".',
        type: 'write',
        items: [
          {
            scene: 'El mensaje',
            prompt: 'Mando un messaggio a Carlo. → ___ un messaggio.',
            answer: 'Gli mando un messaggio.',
            accepted: ['gli mando un messaggio'],
            explain: 'A Carlo = masculino singular → gli. Gli mando un messaggio.',
          },
          {
            scene: 'La pregunta',
            prompt: 'Chiedo a Sofia il numero. → ___ il numero.',
            answer: 'Le chiedo il numero.',
            accepted: ['le chiedo il numero'],
            explain: 'A Sofia = femenino singular → le. Le chiedo il numero.',
          },
          {
            scene: 'El consejo',
            prompt: 'Do un consiglio ai miei studenti. → ___ un consiglio.',
            answer: 'Gli do un consiglio.',
            accepted: ['gli do un consiglio', 'do loro un consiglio'],
            explain: 'Ai miei studenti = plural → gli. Gli do un consiglio.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Comunicación libre',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones sobre cómo te comunicas con personas de tu vida, usando pronombres indirectos.',
        type: 'write',
        items: [
          {
            scene: 'Tu familia',
            prompt: 'A mia/mio ___ (gli/le) ___ ogni... (describe cómo te comunicas)',
            answer: 'A mia madre le scrivo ogni domenica.',
            accepted: ['gli scrivo', 'le scrivo', 'gli telefono', 'le telefono', 'gli mando', 'le mando'],
            explain: 'Usa gli para masculino, le para femenino. Verbos: scrivere, telefonare, mandare, dare...',
          },
          {
            scene: 'Tus amigos',
            prompt: 'Ai miei amici ___ (gli) ___ quando... (describe)',
            answer: 'Ai miei amici gli mando meme divertenti quando mi annoio.',
            accepted: ['gli mando', 'gli scrivo', 'gli telefono'],
            explain: 'Ai miei amici = plural → gli. Gli mando/scrivo/telefono...',
          },
          {
            scene: 'Tu profesor/a',
            prompt: 'Al professore/Alla professoressa ___ (gli/le) ___ se ho una domanda.',
            answer: 'Al professore gli scrivo se ho una domanda sul compito.',
            accepted: ['gli scrivo', 'le scrivo', 'gli mando', 'le mando', 'gli chiedo', 'le chiedo'],
            explain: 'Masculino → gli. Femenino → le. Verbos: scrivere, mandare, chiedere...',
          },
        ],
      },
    ],
  },
}

export default topic
