import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'cause-consequence',
  order: '18',
  color: '#1a2ecc',
  category: 'Cohesión textual',
  level: 'A2',
  title: 'Causa y consecuencia en francés A2: parce que, car, donc, c\'est pourquoi',
  shortTitle: 'Causa y consecuencia',
  metaTitle: 'Causa y consecuencia francés A2 — parce que, car, puisque, donc, c\'est pourquoi',
  description:
    'Para expresar la causa en francés se usan parce que (porque — responde a por qué), car (pues/ya que — más formal, no en posición inicial), puisque (puesto que — causa conocida) y comme (como — al principio de frase). Para la consecuencia: donc (entonces/así que), alors (entonces), c\'est pourquoi/c\'est pour ça que (es por eso que), par conséquent (por consiguiente — formal), si bien que (de modo que).',
  lead: 'Je suis fatigué parce que j\'ai mal dormi / J\'ai mal dormi, c\'est pourquoi je suis fatigué.',
  outcomes: [
    'Usar parce que y car para expresar causa',
    'Distinguir parce que, puisque y comme',
    'Usar donc, alors y c\'est pourquoi para consecuencia',
    'Construir argumentos completos de causa-efecto',
  ],

  guide: {
    goal: 'Expresar relaciones de causa y consecuencia con los conectores apropiados.',
    model: 'Il ne vient pas parce qu\'il est malade. (No viene porque está enfermo.) / Il est malade, c\'est pourquoi il ne vient pas. (Está enfermo, es por eso que no viene.)',
    formula: 'cause: parce que / car / puisque / comme | conséquence: donc / c\'est pourquoi / par conséquent',
    decisions: [
      'parce que: responde a "pourquoi ?" → "Pourquoi tu pleures ? — Parce que j\'ai peur."',
      'car: introduce razón sin responder a pregunta directa (formal) → "Je pars, car il est tard"',
      'puisque: causa ya conocida o evidente → "Puisque tu es là, aide-moi !"',
      'comme: al inicio de la frase → "Comme il pleut, je reste chez moi"',
      'c\'est pourquoi: presenta la consecuencia → "Je suis malade, c\'est pourquoi je reste"',
    ],
    table: [
      ['Relation', 'Connecteur', 'Exemple'],
      ['Cause (directe)', 'parce que / car', 'Il échoue parce qu\'il ne travaille pas'],
      ['Cause (connue)', 'puisque / comme', 'Comme tu es là, aide-moi'],
      ['Conséquence', 'donc / c\'est pourquoi', 'Il ne travaille pas, donc il échoue'],
    ],
    mistakes: [
      '"Car" en début de phrase ❌ → car ne puede iniciar una oración.',
      '"Parce que" y "puisque" no son intercambiables: parce que = nueva info; puisque = info ya conocida.',
      '"C\'est pourquoi" + inversion ❌ → "C\'est pourquoi il part" ✓ (no inversión después de c\'est pourquoi).',
    ],
  },

  seo: [
    {
      heading: '¿Cuál es la diferencia entre parce que, car y puisque en francés?',
      paragraphs: [
        'Los tres principales conectores de causa tienen usos distintos. Parce que responde directamente a la pregunta "pourquoi ?": "Je suis content parce que j\'ai réussi mon examen". Es el más neutro y frecuente. Car introduce una justificación de tono más literario o formal, y nunca puede ir al principio de la oración: "Je pars, car il se fait tard". Comme se usa al principio de la oración para una causa que precede a la consecuencia: "Comme il faisait beau, nous sommes sortis."',
        'Puisque se usa cuando la causa es conocida por los dos interlocutores o evidente: "Puisque tu sais la réponse, dis-la !" (Puesto que sabes la respuesta, dila). Implica que la causa no necesita explicación. En español equivale a "ya que" o "puesto que" cuando la información es compartida.',
      ],
    },
    {
      heading: '¿Cómo se expresa la consecuencia en francés (donc, par conséquent)?',
      paragraphs: [
        'Para la consecuencia, donc es el más frecuente y versátil: "Il est malade, donc il reste à la maison". Alors tiene un matiz más narrativo: "Elle est arrivée en retard, alors elle a tout raté". C\'est pourquoi (o c\'est pour ça que, más oral) presenta la consecuencia de manera más enfática: "Le train était en retard, c\'est pourquoi je suis arrivé tard."',
        'Par conséquent y en conséquence son más formales y se reservan para textos escritos o exposiciones: "Les températures ont chuté, par conséquent les routes sont gelées". Si bien que indica una consecuencia intensa: "Il parlait si vite que je n\'ai rien compris" (Hablaba tan rápido que no entendí nada).',
      ],
    },
    {
      heading: '¿Cómo se expresan causa y consecuencia en francés?',
      paragraphs: [
        'La causa responde a "por qué" y se introduce con parce que (la más neutra y frecuente), car (más escrita, une dos frases), puisque (causa ya conocida por el interlocutor) o con grâce à / à cause de + sustantivo (positivo / negativo). La consecuencia responde a "y por eso" y se marca con donc, alors, c\'est pourquoi o par conséquent. Trampa del hispanohablante: "car" nunca abre una frase (va entre dos oraciones), mientras que "parce que" sí puede iniciar la respuesta a "pourquoi ?". Elegir el conector según su registro y su posición es un criterio explícito de evaluación en el DELF.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'cause: parce que/car/puisque/comme | conséquence: donc/c\'est pourquoi.',
    graphicPrompt: 'Flecha de causa → efecto: "parce que" en la flecha, "donc" en el resultado.',
    scene: [
      ['Je reste chez moi parce qu\'il pleut.', 'Me quedo en casa porque llueve.'],
      ['Il a réussi, car il a beaucoup travaillé.', 'Tuvo éxito, pues trabajó mucho.'],
      ['Puisque tu es là, allons au cinéma !', '¡Ya que estás aquí, vayamos al cine!'],
      ['Comme j\'avais faim, j\'ai mangé une pizza.', 'Como tenía hambre, me comí una pizza.'],
      ['Il était fatigué, c\'est pourquoi il est parti tôt.', 'Estaba cansado, es por eso que se fue temprano.'],
      ['Elle n\'a pas étudié, donc elle a raté son examen.', 'No estudió, así que suspendió el examen.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['parce que (responde pourquoi)', 'car (formal, no en inicio)', 'puisque (causa conocida)', 'c\'est pourquoi (consecuencia énfasis)'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige causa o consecuencia',
        tag: 'Opción múltiple',
        intro: 'Selecciona el conector correcto según si expresa causa o consecuencia.',
        type: 'choice',
        items: [
          {
            scene: 'Je suis en retard ___ j\'ai raté mon bus.',
            lines: [['', 'Je suis en retard ___ j\'ai raté mon bus.']],
            options: ["parce que", 'donc', "c'est pourquoi", 'alors'],
            answer: 'parce que',
            explain: '"parce que" = causa. Responde: ¿por qué llegas tarde? — Porque perdí el autobús.',
          },
          {
            scene: 'J\'ai raté mon bus, ___ je suis en retard.',
            lines: [['', 'J\'ai raté mon bus, ___ je suis en retard.']],
            options: ['donc', "parce que", 'puisque', 'comme'],
            answer: 'donc',
            explain: '"donc" = consecuencia. Perdí el autobús → por eso llego tarde.',
          },
          {
            scene: '___ il fait chaud, nous allons à la piscine.',
            lines: [['', '___ il fait chaud, nous allons à la piscine.']],
            options: ['Comme', 'Parce que', 'Donc', 'Car'],
            answer: 'Comme',
            explain: '"Comme" = causa al inicio de frase. Se usa cuando la causa precede la consecuencia.',
          },
          {
            scene: '___  tu as faim, mange !',
            lines: [['', '___ tu as faim, mange !']],
            options: ['Puisque', 'Parce que', 'Donc', 'Alors'],
            answer: 'Puisque',
            explain: '"Puisque" = causa conocida/evidente. Se sabe que tiene hambre → actúa.',
          },
          {
            scene: 'Elle travaille dur, ___ elle réussira.',
            lines: [['', 'Elle travaille dur, ___ elle réussira.']],
            options: ['donc', "parce que", 'puisque', 'comme'],
            answer: 'donc',
            explain: '"donc" = consecuencia lógica. Trabajar duro → éxito futuro.',
          },
          {
            scene: 'Il part tôt, ___ il a une réunion à 8h.',
            lines: [['', 'Il part tôt, ___ il a une réunion à 8h.']],
            options: ['car', 'donc', 'comme', 'alors'],
            answer: 'car',
            explain: '"car" = causa (justificación formal, no responde a pourquoi directo). No puede iniciar la frase.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Causa y consecuencia en pares',
        tag: '2 espacios',
        intro: 'Completa con el conector de causa y de consecuencia.',
        type: 'dual',
        items: [
          {
            scene: 'No durmió bien → está cansado → no puede concentrarse.',
            lines: [['', 'Il n\'a pas bien dormi, [[0]] il est fatigué. [[1]], il ne peut pas se concentrer.']],
            blanks: [
              { options: ['donc', 'parce que', 'puisque', 'car'], answer: 'donc', explain: '"donc" = consecuencia 1. No dormió → está cansado.' },
              { options: ["C'est pourquoi", 'Parce que', 'Puisque', 'Car'], answer: "C'est pourquoi", explain: '"C\'est pourquoi" = consecuencia 2 enfática. Por eso no puede concentrarse.' },
            ],
          },
          {
            scene: 'Está lloviendo + ya que estás en casa → quédate.',
            lines: [['', '[[0]] il pleut, reste à la maison. [[1]] tu es là, autant profiter.']],
            blanks: [
              { options: ['Comme', 'Parce que', 'Car', 'Donc'], answer: 'Comme', explain: '"Comme" = causa al inicio. Llueve → quédate en casa.' },
              { options: ['Puisque', 'Parce que', 'Car', 'Donc'], answer: 'Puisque', explain: '"Puisque" = causa conocida. Ya que estás aquí, aprovecha.' },
            ],
          },
          {
            scene: 'No estudió porque tenía pereza → suspendió → ahora estudia más.',
            lines: [['', 'Il n\'a pas étudié [[0]] il était paresseux ; [[1]] il a échoué.']],
            blanks: [
              { options: ['parce que', 'donc', "c'est pourquoi", 'puisque'], answer: 'parce que', explain: '"parce que" = causa. ¿Por qué no estudió? — porque tenía pereza.' },
              { options: ["c'est pourquoi", 'parce que', 'puisque', 'comme'], answer: "c'est pourquoi", explain: '"c\'est pourquoi" = consecuencia enfática. Por eso (es por ello que) suspendió.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Explicar una situación',
        tag: 'Texto guiado',
        intro: 'Completa el texto con conectores de causa o consecuencia.',
        type: 'guidedText',
        scene: 'Lucie explique pourquoi elle a changé de travail.',
        text: 'J\'ai décidé de changer de travail [[0]] je n\'étais plus heureuse. Mon ancien patron était très exigeant, [[1]] j\'avais trop de stress. [[2]] je cherchais quelque chose de différent, j\'ai passé plusieurs entretiens. J\'ai trouvé un nouveau poste, [[3]] j\'ai accepté immédiatement. [[4]] le salaire est meilleur, c\'est encore mieux !',
        blanks: [
          { options: ['parce que', 'donc', "c'est pourquoi", 'car'], answer: 'parce que', explain: '"parce que" = causa directa. ¿Por qué cambió? Porque ya no era feliz.' },
          { options: ['donc', 'parce que', 'puisque', 'comme'], answer: 'donc', explain: '"donc" = consecuencia. Jefe exigente → demasiado estrés.' },
          { options: ['Comme', 'Parce que', 'Donc', 'Car'], answer: 'Comme', explain: '"Comme" = causa al inicio de frase. Como buscaba algo diferente...' },
          { options: ["c'est pourquoi", 'parce que', 'puisque', 'car'], answer: "c'est pourquoi", explain: '"c\'est pourquoi" = consecuencia. Encontró trabajo → es por eso que aceptó.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con el conector correcto',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe el conector de causa o consecuencia correcto.',
        type: 'freeText',
        scene: 'Complétez avec le bon connecteur.',
        text: 'Je ne sors pas ce soir [[0]] je suis malade. (causa directa) / Le train est en retard, [[1]] nous allons rater notre correspondance. (consecuencia) / [[2]] tu connais la ville, tu peux nous guider. (causa conocida) / Il fait froid, [[3]] prenez votre manteau ! (consecuencia lógica)',
        blanks: [
          { answer: 'parce que', explain: '"parce que" = causa directa. Responde à pourquoi.' },
          { answer: 'donc', explain: '"donc" = consecuencia. Tren tarde → perder conexión.' },
          { answer: 'Puisque', explain: '"Puisque" = causa ya conocida. Ya que conoces la ciudad...' },
          { answer: 'donc', explain: '"donc" = consecuencia. Hace frío → coge el abrigo.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Explica causa y consecuencia',
        tag: 'Escritura guiada',
        intro: 'Escribe la frase de causa o consecuencia indicada.',
        type: 'write',
        items: [
          {
            scene: '¿Por qué estudias francés?',
            prompt: 'Usa "parce que" para explicar tu causa.',
            answer: 'J\'étudie le français parce que je veux travailler en Europe.',
            accepted: ['J\'étudie le français parce qu\'il est très beau.'],
            explain: '"parce que" responde directamente à "pourquoi ?".',
          },
          {
            scene: 'No tiene coche. [Da la consecuencia: usa el metro].',
            prompt: 'Usa "donc" o "c\'est pourquoi" para la consecuencia.',
            answer: 'Il n\'a pas de voiture, donc il prend le métro.',
            accepted: ['Il n\'a pas de voiture, c\'est pourquoi il prend le métro.'],
            explain: '"donc" = consecuencia. No tiene coche → toma el metro.',
          },
          {
            scene: 'Como mañana hay examen, tienes que estudiar.',
            prompt: 'Usa "comme" al principio de la frase.',
            answer: 'Comme il y a un examen demain, tu dois étudier.',
            accepted: ['Comme il y a un contrôle demain, il faut que tu révises.'],
            explain: '"Comme" = causa al inicio. La causa precede la consecuencia.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Argumenta sobre un problema cotidiano',
        tag: 'Escritura libre',
        intro: 'Escribe sobre un problema cotidiano explicando causas y consecuencias.',
        type: 'write',
        items: [
          {
            scene: 'Explica por qué estás estresado/a y qué consecuencias tiene eso.',
            prompt: 'Utilisez parce que, car, donc et c\'est pourquoi.',
            answer: 'Je suis souvent stressé(e) parce que j\'ai beaucoup de travail. De plus, je dors mal, car je pense trop le soir. Je suis fatigué(e), donc je suis moins productif(ve). C\'est pourquoi j\'essaie de méditer le matin.',
            accepted: ['Je suis stressé(e) parce que mes journées sont trop chargées. Je n\'ai pas le temps de me reposer, car je travaille jusqu\'au soir. Donc, je suis épuisé(e). C\'est pourquoi j\'ai décidé de changer mes habitudes.'],
            explain: 'parce que (causa directa) + car (justificación) + donc (consecuencia) + c\'est pourquoi (consecuencia énfasis).',
          },
          {
            scene: 'Explica por qué es importante aprender idiomas y qué ventajas tiene.',
            prompt: 'Utilisez parce que, puisque, donc et c\'est pour ça que.',
            answer: 'Apprendre des langues est important parce que le monde est de plus en plus connecté. Puisque l\'anglais est la langue des affaires, c\'est essentiel. On a plus d\'opportunités, donc on peut trouver un meilleur travail. C\'est pour ça que j\'étudie le français !',
            accepted: ['Parler plusieurs langues est utile car cela ouvre de nombreuses portes. Comme nous vivons dans un monde globalisé, les langues sont nécessaires. On communique mieux, donc on voyage plus facilement.'],
            explain: 'Variedad: parce que/car/comme (causa) + donc/c\'est pour ça que (consecuencia).',
          },
        ],
      },
    ],
  },
}

export default topic
