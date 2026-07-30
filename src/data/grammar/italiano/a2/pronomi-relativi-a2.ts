import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pronomi-relativi-a2',
  order: '12',
  color: '#009246',
  category: 'Pronomi relativi',
  level: 'A2',
  title: 'Los pronombres relativos en italiano A2 — che, cui, il quale',
  shortTitle: 'Pronombres relativos',
  metaTitle: 'Pronombres relativos italiano A2 — che, cui, il quale / la quale',
  description:
    'Los pronombres relativos conectan dos oraciones evitando repeticiones. En italiano A2 los más importantes son: che (sujeto u objeto directo), cui (tras preposición) y il quale/la quale/i quali/le quali (más formal, concuerdan en género y número con el antecedente).',
  lead: 'che (que/quien — suj. u obj.) / cui (tras preposición: in cui, con cui, per cui) / il quale (formal, con gen./n. concordado). Il libro che leggo. La città in cui vivo.',
  outcomes: [
    'Usar che para conectar oraciones cuando es sujeto o objeto directo',
    'Usar cui tras preposiciones (in, con, per, a, di)',
    'Distinguir che de cui según la función sintáctica',
    'Conocer il quale/la quale como alternativa formal a che/cui',
  ],

  guide: {
    goal: 'Conectar dos oraciones con pronombres relativos para evitar repeticiones.',
    model: 'Il libro che sto leggendo è bellissimo. / La città in cui vivo è Roma. / L\'amico con cui parlo è Marco.',
    formula: 'che [cuando es sujeto u objeto directo] / preposizione + cui [cuando hay preposición]',
    decisions: [
      'che = sujeto: Il professore che insegna è bravo (el profesor que enseña)',
      'che = oggetto diretto: Il film che guardo è italiano (la peli que veo)',
      'in cui = dove: La città in cui vivo = la ciudad donde vivo',
      'con cui = con il/la quale: L\'amico con cui parlo = el amigo con quien hablo',
      'per cui = por eso (connettore): Non ho tempo, per cui rimando',
      'di cui = del que/de la que: Il libro di cui ti parlo è interessante',
      'il quale/la quale = che/cui (más formal, con concordancia): Il professore il quale insegna',
    ],
    table: [
      ['Pronombre', 'Función', 'Ejemplo'],
      ['che', 'sujeto', 'Lo studente che studia molto impara bene'],
      ['che', 'objeto directo', 'Il libro che leggo è di Calvino'],
      ['in cui', 'lugar (= dove)', 'La città in cui vivo è Milano'],
      ['con cui', 'compañía', "L'amico con cui esco è simpatico"],
      ['per cui', 'causa/consecuencia', 'Piove, per cui resto a casa'],
      ['di cui', 'especificación', 'La persona di cui ti parlo è mia sorella'],
      ['il quale', 'formal (sujeto)', 'Il medico il quale mi ha visitato era gentile'],
    ],
    mistakes: [
      'Usar che tras preposición: con che ✗ → con cui ✓; in che ✗ → in cui ✓',
      'Usar cui sin preposición para objeto directo: Il libro cui leggo ✗ → Il libro che leggo ✓',
      'Confundir il quale (pronombre relativo) con quale (adjetivo interrogativo): Quale libro? vs Il libro il quale...',
    ],
  },

  seo: [
    {
      heading: 'Che vs cui: la distinción clave de los relativos italianos',
      paragraphs: [
        'Los relativos conectan dos frases evitando repetir el sustantivo. El punto clave es che vs cui: "che" cuando el relativo es sujeto u objeto directo (sin preposición); "prep + cui" cuando hay una preposición delante. Truco: si en español dirías "que" a secas, usa che; si dirías "en que / con quien / para el que", usa preposición + cui. Esta es la tabla:',
      ],
      table: [
        ['Función', 'Relativo', 'Ejemplo'],
        ['Sujeto', 'che', 'Lo studente che studia.'],
        ['Objeto directo', 'che', 'La pizza che mangio.'],
        ['Con preposición', 'prep. + cui', 'La città in cui vivo.'],
        ['Posesión (cuyo/a)', 'il/la cui', 'L\'autore il cui libro amo.'],
      ],
    },
    {
      heading: 'Il quale: la alternativa formal (concuerda con el antecedente)',
      paragraphs: [
        'Il quale y sus formas son una alternativa más formal a che y cui, usada sobre todo por escrito o para evitar ambigüedad. A diferencia de "che" (invariable), concuerda en género y número con el antecedente:',
      ],
      table: [
        ['Antecedente', 'Forma', 'Ejemplo'],
        ['masc. singular', 'il quale', 'Il collega, il quale…'],
        ['fem. singular', 'la quale', 'La collega, la quale…'],
        ['masc. plural', 'i quali', 'I colleghi, i quali…'],
        ['fem. plural', 'le quali', 'Le colleghe, le quali…'],
      ],
    },
    {
      heading: '¿Cuándo se usa "che" y cuándo "cui" en italiano?',
      paragraphs: [
        '"che" cuando el relativo es sujeto u objeto directo, sin preposición: "il libro che leggo", "la persona che parla". "cui" siempre que hay una preposición delante: "la casa in cui abito", "l\'amico con cui esco", "il motivo per cui sono qui". "che" es invariable.',
      ],
    },
    {
      heading: '¿Cómo se dice "cuyo" en italiano?',
      paragraphs: [
        'Con "cui" precedido del artículo del sustantivo poseído: "il cui", "la cui", "i cui", "le cui". "Lo scrittore il cui libro ho letto" (el escritor cuyo libro he leído), "La città le cui strade amo" (la ciudad cuyas calles amo). El artículo concuerda con lo poseído, no con el poseedor.',
      ],
    },
    {
      heading: '¿Qué es "il quale" y cuándo se usa?',
      paragraphs: [
        'Es un relativo más formal, alternativa a che/cui, que concuerda con el antecedente (il quale, la quale, i quali, le quali). Se usa en registro escrito o para evitar ambigüedad: "Ho parlato con il direttore, il quale mi ha aiutato". Con preposición se prefiere igualmente "in cui" a "nel quale" por naturalidad.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante distingue che (sin preposición) de cui (con preposición) para conectar oraciones.',
    graphicPrompt: 'Dos oraciones conectadas con una flecha y el pronombre relativo subrayado.',
    scene: [
      ['Il libro che leggo è fantastico.', 'El libro que leo es fantástico.'],
      ['La città in cui vivo è bellissima.', 'La ciudad en la que vivo es preciosa.'],
      ["L'amico con cui studio si chiama Marco.", 'El amigo con quien estudio se llama Marco.'],
      ['Non capisco il motivo per cui sei arrabbiato.', 'No entiendo el motivo por el que estás enfadado.'],
    ],
    learnerModes: ['visual: diagrama de conexión entre frases', 'analítico: función sintáctica → che o cui', 'oral: describir personas y lugares'],
    reviewFocus: ['che sin preposición', 'prep. + cui con preposición', 'il quale/la quale para concordancia'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: '¿Che o cui?',
        tag: 'Opción múltiple',
        intro: 'Elige el pronombre relativo correcto: che o cui (con preposición si es necesario).',
        type: 'choice',
        items: [
          {
            scene: 'El libro',
            lines: [['Marco', 'Il libro ___ leggo è di un autore italiano.']],
            options: ['che', 'cui', 'in cui', 'il quale'],
            answer: 'che',
            explain: 'Il libro che leggo: che = objeto directo (sin preposición).',
          },
          {
            scene: 'La ciudad',
            lines: [['Sofia', 'La città ___ vivo si chiama Bologna.']],
            options: ['in cui', 'che', 'cui', 'la quale'],
            answer: 'in cui',
            explain: 'Vivere IN una città → preposizione in + cui. In cui = dove.',
          },
          {
            scene: 'El amigo',
            lines: [['Hugo', "L'amico ___ esco ogni weekend è molto divertente."]],
            options: ['con cui', 'che', 'cui', 'in cui'],
            answer: 'con cui',
            explain: 'Uscire CON qualcuno → con + cui. L\'amico con cui esco.',
          },
          {
            scene: 'La razón',
            lines: [['Giulia', 'Non capisco il motivo ___ sei triste.']],
            options: ['per cui', 'che', 'cui', 'di cui'],
            answer: 'per cui',
            explain: 'Il motivo PER cui = la razón por la que. Per + cui.',
          },
          {
            scene: 'El professor',
            lines: [['Ana', 'Il professore ___ insegna italiano è molto bravo.']],
            options: ['che', 'cui', 'con cui', 'per cui'],
            answer: 'che',
            explain: 'Il professore che insegna: che = sujeto del verbo insegna.',
          },
          {
            scene: 'El libro del que hablan',
            lines: [['Carlo', 'Il libro ___ ti parlo è un bestseller.']],
            options: ['di cui', 'che', 'in cui', 'con cui'],
            answer: 'di cui',
            explain: 'Parlare DI un libro → di + cui. Il libro di cui ti parlo.',
          },
          {
            scene: 'La colega',
            lines: [['Luca', 'La collega ___ lavora con me si chiama Anna.']],
            options: ['che', 'cui', 'la quale', 'con cui'],
            answer: 'che',
            explain: 'La collega che lavora: che = sujeto. No hay preposición.',
          },
          {
            scene: 'La ciudad de nacimiento',
            lines: [['Vera', 'La città ___ sono nata è molto piccola.']],
            options: ['in cui', 'che', 'cui', 'di cui'],
            answer: 'in cui',
            explain: 'Essere nato IN una città → in + cui. La città in cui sono nata.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Conectando oraciones',
        tag: '2 espacios',
        intro: 'Completa las oraciones unidas con el pronombre relativo y el verbo correctos.',
        type: 'dual',
        items: [
          {
            scene: 'El restaurante',
            lines: [['Marco', 'Il ristorante [[0]] andiamo spesso [[1]] di pesce.']],
            blanks: [
              { options: ['in cui', 'che', 'cui', 'di cui'], answer: 'in cui', explain: 'Andare IN un ristorante → in + cui.' },
              { options: ['è specializzato', 'specializza', 'è specializzata'], answer: 'è specializzato', explain: 'Il ristorante (masc.) è specializzato.' },
            ],
          },
          {
            scene: 'La película',
            lines: [['Sofia', 'Il film [[0]] guardato ieri [[1]] bellissimo.']],
            blanks: [
              { options: ['che ho', 'cui ho', 'in cui ho'], answer: 'che ho', explain: 'Oggetto diretto: il film che ho guardato → che.' },
              { options: ['era', 'è stato', 'è'], answer: 'era', explain: 'El film era bellissimo (imperfetto para descripción).' },
            ],
          },
          {
            scene: 'La amiga',
            lines: [['Giulia', "L'amica [[0]] studio è molto brava [[1]] italiano."]],
            blanks: [
              { options: ['con cui', 'che', 'in cui', 'per cui'], answer: 'con cui', explain: 'Studiare CON qualcuno → con + cui.' },
              { options: ['in', 'di', 'a'], answer: 'in', explain: 'Essere bravo IN qualcosa = ser bueno en algo.' },
            ],
          },
          {
            scene: 'El motivo',
            lines: [['Hugo', 'Non ho tempo, [[0]] non posso venire [[1]].']],
            blanks: [
              { options: ['per cui', 'che', 'in cui', 'di cui'], answer: 'per cui', explain: 'Per cui = por eso (connettore causale).' },
              { options: ['stasera', 'domani', 'oggi'], answer: 'stasera', explain: 'Stasera = esta noche (contexto temporal).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Una descripción de Milán',
        tag: 'Texto guiado',
        intro: 'Completa el texto con che, in cui, con cui, di cui o per cui.',
        type: 'guidedText',
        scene: 'Marco describe su ciudad a un amigo extranjero',
        text: 'Milano è la città [[0]] vivo da tre anni. È un posto [[1]] adoro per il design e la moda. Gli amici [[2]] esco sono tutti molto creativi. Il quartiere [[3]] ti parlo è Isola, molto vivace. La metro [[4]] mi sposto è efficiente e veloce.',
        blanks: [
          { options: ['in cui', 'che', 'di cui', 'con cui'], answer: 'in cui', explain: 'Vivere IN Milano → in + cui.' },
          { options: ['che', 'in cui', 'con cui', 'di cui'], answer: 'che', explain: 'Un posto che adoro: che = oggetto diretto di adorare.' },
          { options: ['con cui', 'che', 'in cui', 'di cui'], answer: 'con cui', explain: 'Uscire CON gli amici → con + cui.' },
          { options: ['di cui', 'che', 'in cui', 'con cui'], answer: 'di cui', explain: 'Parlare DI un quartiere → di + cui.' },
          { options: ['con cui', 'in cui', 'che', 'di cui'], answer: 'con cui', explain: 'Spostarsi CON la metro → con + cui.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe el pronombre relativo correcto (che / in cui / con cui / di cui / per cui).',
        type: 'freeText',
        scene: 'Sofia describe su trabajo y colegas en WeLearn',
        text: 'WeLearn è la scuola [[0]] lavoro ogni giorno. Hugo è il fondatore [[1]] ho conosciuto due anni fa. Gli studenti [[2]] insegno sono molto motivati. L\'italiano è la lingua [[3]] mi sono innamorata. Non ho molto tempo libero, [[4]] il weekend è sacro per me.',
        blanks: [
          { answer: 'in cui', explain: 'Lavorare IN una scuola → in + cui.' },
          { answer: 'che', explain: 'Il fondatore che ho conosciuto: oggetto diretto → che.' },
          { answer: 'che', explain: 'Gli studenti che insegno: oggetto diretto → che.' },
          { answer: 'di cui', explain: 'Innamorarsi DI una lingua → di + cui.' },
          { answer: 'per cui', explain: 'Per cui = connettore causale (por eso).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Une las oraciones',
        tag: 'Escritura guiada',
        intro: 'Une las dos oraciones usando el pronombre relativo correcto.',
        type: 'write',
        items: [
          {
            scene: 'El libro',
            prompt: 'Il libro è interessante. + Leggo il libro. → Il libro ___ è interessante.',
            answer: 'Il libro che leggo è interessante.',
            accepted: ['il libro che leggo è interessante'],
            explain: 'Oggetto diretto (leggo il libro) → che. Il libro che leggo.',
          },
          {
            scene: 'La ciudad',
            prompt: 'La città è bellissima. + Vivo nella città. → La città ___ è bellissima.',
            answer: 'La città in cui vivo è bellissima.',
            accepted: ['la città in cui vivo è bellissima'],
            explain: 'Vivere IN una città → in + cui. La città in cui vivo.',
          },
          {
            scene: 'La amiga',
            prompt: "L'amica è simpaticissima. + Studio con l'amica. → L'amica ___ è simpaticissima.",
            answer: "L'amica con cui studio è simpaticissima.",
            accepted: ["l'amica con cui studio è simpaticissima"],
            explain: "Studiare CON l'amica → con + cui.",
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Descríbete con relativos',
        tag: 'Escritura libre',
        intro: 'Usa che, in cui, con cui o di cui para describir personas, lugares y cosas de tu vida.',
        type: 'write',
        items: [
          {
            scene: 'Tu ciudad',
            prompt: 'La città in cui ___ è... (describe tu ciudad con un pronombre relativo)',
            answer: 'La città in cui vivo è grande e caotica, ma la adoro.',
            accepted: ['in cui', 'che', 'di cui'],
            explain: 'Vivere IN una città → in cui. La città in cui vivo...',
          },
          {
            scene: 'Un libro o película',
            prompt: 'Il libro/film che ___ si chiama... / parla di...',
            answer: "Il film che sto guardando si chiama 'La vita è bella' ed è emozionante.",
            accepted: ['che', 'di cui'],
            explain: 'Oggetto diretto → che. Il film che guardo / di cui ti parlo.',
          },
          {
            scene: 'Una persona importante',
            prompt: 'Una persona con cui ___ è importante per me perché...',
            answer: 'Una persona con cui parlo ogni giorno è mia madre — è la mia migliore amica.',
            accepted: ['con cui', 'che', 'di cui'],
            explain: 'Con cui para personas con las que interactúas: parlare, uscire, studiare CON.',
          },
        ],
      },
    ],
  },
}

export default topic
