import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'congiuntivo-presente-b1',
  order: '01',
  color: '#009246',
  category: 'Verbi',
  level: 'B1',
  title: 'Congiuntivo Presente en Italiano B1',
  shortTitle: 'Congiuntivo Presente',
  metaTitle: 'Congiuntivo Presente Italiano B1 — Uso y Conjugación Completa',
  description:
    'El congiuntivo presente es el modo de la subjetividad en italiano. Se usa después de verbos de opinión, deseo, emoción y expresiones impersonales cuando el sujeto de las dos cláusulas es diferente. Es uno de los rasgos más característicos del italiano culto y es indispensable para el nivel B1.',
  lead: 'Domina el congiuntivo presente italiano: cuándo usarlo, cómo conjugarlo y los verbos irregulares clave.',
  outcomes: [
    'Conjugar verbos regulares e irregulares en congiuntivo presente',
    'Usar el congiuntivo después de expresiones de opinión, deseo y emoción',
    'Distinguir cuándo el congiuntivo es necesario frente al indicativo',
    'Construir oraciones con "che" + congiuntivo con fluidez',
  ],

  guide: {
    goal: 'Expresar opiniones, deseos, emociones y posibilidades usando el congiuntivo presente con los desencadenantes más comunes.',
    model: 'Penso che Marco abbia ragione. / Voglio che tu venga con me. / È necessario che studiamo di più.',
    formula: 'Verbo principale + che + soggetto diverso + congiuntivo presente',
    decisions: [
      'Verbos -ARE: elimina -are, añade -i, -i, -i, -iamo, -iate, -ino (parlare → parli, parli, parli, parliamo, parliate, parlino)',
      'Verbos -ERE/-IRE: elimina -ere/-ire, añade -a, -a, -a, -iamo, -iate, -ano (scrivere → scriva; dormire → dorma)',
      'Verbos -IRE con -isc-: seguire el patrón isc en singular/3ª plural (finire → finisca, finisca, finisca, finiamo, finiate, finiscano)',
      'Irregulares frecuentes: essere→sia, avere→abbia, andare→vada, fare→faccia, venire→venga, potere→possa, volere→voglia, sapere→sappia, dovere→debba',
      'El congiuntivo va después de: penso/credo/spero che, voglio/desidero che, è possibile/probabile/necessario/importante che, mi dispiace/sono contento che',
      'Si el sujeto es el mismo en ambas cláusulas, usa el infinitivo: Voglio andare (no: voglio che io vada)',
    ],
    table: [
      ['Verbo', 'Indicativo presente', 'Congiuntivo presente'],
      ['parlare', 'parlo, parli, parla...', 'parli, parli, parli, parliamo, parliate, parlino'],
      ['scrivere', 'scrivo, scrivi, scrive...', 'scriva, scriva, scriva, scriviamo, scriviate, scrivano'],
      ['finire', 'finisco, finisci, finisce...', 'finisca, finisca, finisca, finiamo, finiate, finiscano'],
      ['essere', 'sono, sei, è...', 'sia, sia, sia, siamo, siate, siano'],
      ['avere', 'ho, hai, ha...', 'abbia, abbia, abbia, abbiamo, abbiate, abbiano'],
    ],
    mistakes: [
      '"Penso che lui è stanco" ❌ → "Penso che lui sia stanco" ✓ — después de "penso che" el verbo debe ir en congiuntivo.',
      '"Voglio che io vado" ❌ → "Voglio andare" ✓ — mismo sujeto: usa el infinitivo, no el congiuntivo.',
      '"È necessario studiare molto" (¡correcto! sujeto genérico) vs. "È necessario che tu studi" ✓ — con sujeto específico, usa che + congiuntivo.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el congiuntivo presente en italiano?',
      paragraphs: [
        'El congiuntivo presente (modo congiuntivo, tempo presente) es un modo verbal que expresa subjetividad: opiniones, deseos, dudas, emociones y posibilidades. A diferencia del indicativo, que presenta los hechos como reales y objetivos, el congiuntivo los presenta desde la perspectiva del hablante.',
        'En italiano moderno se usa con mucha frecuencia tanto en el lenguaje escrito como hablado, especialmente después de verbos que expresan pensamiento, voluntad o sentimiento cuando hay dos sujetos diferentes. Es una de las estructuras más importantes del nivel B1.',
      ],
    },
    {
      heading: 'Conjugación del congiuntivo presente: verbos regulares',
      paragraphs: [
        'Para los verbos en -ARE: elimina la terminación y añade -i, -i, -i, -iamo, -iate, -ino. Ejemplo: parlare → (che io) parli, (che tu) parli, (che lui/lei) parli, (che noi) parliamo, (che voi) parliate, (che loro) parlino.',
        'Para los verbos en -ERE: añade -a, -a, -a, -iamo, -iate, -ano. Ejemplo: leggere → legga, legga, legga, leggiamo, leggiate, leggano.',
        'Para los verbos en -IRE: hay dos grupos. Los verbos simples (dormire → dorma, ecc.) y los verbos con -isc- (finire → finisca, finiscano). Nota: noi y voi siempre son iguales al indicativo presente.',
      ],
      table: [
        ['Persona', '-ARE (parlare)', '-ERE (leggere)', '-IRE (dormire)', '-IRE -isc- (finire)'],
        ['io', 'parli', 'legga', 'dorma', 'finisca'],
        ['tu', 'parli', 'legga', 'dorma', 'finisca'],
        ['lui/lei', 'parli', 'legga', 'dorma', 'finisca'],
        ['noi', 'parliamo', 'leggiamo', 'dormiamo', 'finiamo'],
        ['voi', 'parliate', 'leggiate', 'dormiate', 'finiate'],
        ['loro', 'parlino', 'leggano', 'dormano', 'finiscano'],
      ],
    },
    {
      heading: 'Verbos irregulares esenciales en congiuntivo presente',
      paragraphs: [
        'Algunos verbos tienen formas completamente irregulares. Los más importantes son: essere → sia/sia/sia/siamo/siate/siano; avere → abbia/abbia/abbia/abbiamo/abbiate/abbiano; andare → vada/vada/vada/andiamo/andiate/vadano.',
        'Otros irregulares clave: fare → faccia/facciano; venire → venga/vengano; potere → possa/possano; volere → voglia/vogliano; sapere → sappia/sappiano; dovere → debba/debbano; dare → dia/diano; stare → stia/stiano.',
      ],
    },
    {
      heading: 'Cuándo usar el congiuntivo presente',
      paragraphs: [
        'El congiuntivo presente es obligatorio después de ciertos verbos y expresiones cuando hay dos sujetos distintos: (1) Opinión/creencia: pensare, credere, ritenere, supporre + che. (2) Deseo/voluntad: volere, desiderare, sperare, preferire + che. (3) Emoción: essere contento/dispiaciuto/sorpreso + che. (4) Duda: dubitare, non essere sicuro + che.',
        'También se usa después de expresiones impersonales: è necessario/importante/possibile/probabile/strano/giusto + che. Y después de algunos verbos de comunicación con sentido de deseo: chiedere, dire, ordinare + che.',
      ],
    },
    {
      heading: 'Congiuntivo vs. Infinitivo: la regla del sujeto',
      paragraphs: [
        'La regla más importante: si el sujeto de los dos verbos es el MISMO, usa el infinitivo. Si son DIFERENTES, usa che + congiuntivo. Ejemplos: "Voglio studiare" (yo quiero, yo estudio — mismo sujeto → infinitivo) vs. "Voglio che tu studi" (yo quiero, tú estudias — sujetos distintos → congiuntivo).',
        'Esta regla se aplica con todos los verbos desencadenantes: Spero di arrivare presto (mismo sujeto) vs. Spero che lei arrivi presto (sujetos distintos). Los hispanohablantes suelen transferir el patrón del español "quiero que vengas" correctamente.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Congiuntivo presente con énfasis en los desencadenantes y la regla del sujeto diferente.',
    graphicPrompt: 'Diagrama de dos personas con burbujas de pensamiento mostrando el contraste indicativo/congiuntivo.',
    scene: [
      ['Penso che Luca abbia ragione.', 'Creo que Luca tiene razón.'],
      ['Spero che tu venga alla festa.', 'Espero que vengas a la fiesta.'],
      ['È necessario che studiamo ogni giorno.', 'Es necesario que estudiemos cada día.'],
      ['Voglio che lei finisca il compito.', 'Quiero que ella termine la tarea.'],
      ['È possibile che piova domani.', 'Es posible que mañana llueva.'],
      ['Mi dispiace che tu non possa venire.', 'Me alegra que no puedas venir.'],
      ['Credo che siano già partiti.', 'Creo que ya se han ido.'],
      ['È importante che tu sappia la verità.', 'Es importante que sepas la verdad.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['essere', 'avere', 'parlare', 'finire', 'andare', 'venire', 'fare', 'sapere'],
    reviewFocus: ['desencadenantes del congiuntivo', 'irregulares', 'regla del mismo sujeto'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce el congiuntivo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma de congiuntivo presente correcta para completar cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando de un amigo',
            lines: [['', 'Penso che Marco ___ stanco dopo il viaggio.']],
            options: ['sia', 'è', 'essere', 'sono'],
            answer: 'sia',
            explain: 'Después de "penso che" necesitamos el congiuntivo. "Essere" en congiuntivo → (lui) sia.',
          },
          {
            scene: 'Planes para el fin de semana',
            lines: [['', 'Voglio che voi ___ alla mia festa sabato.']],
            options: ['veniate', 'venite', 'vengono', 'venire'],
            answer: 'veniate',
            explain: '"Venire" en congiuntivo para "voi" es "veniate" (irregular: radical veni- + terminación -ate).',
          },
          {
            scene: 'Sobre las reglas del trabajo',
            lines: [['', 'È necessario che tutti ___ in orario.']],
            options: ['arrivino', 'arrivano', 'arrivare', 'arriviamo'],
            answer: 'arrivino',
            explain: '"Arrivare" en congiuntivo para "loro" → arrivino. Termina en -ino (verbos -are).',
          },
          {
            scene: 'Esperanzas de futuro',
            lines: [['', 'Speriamo che il tempo ___ bello domani.']],
            options: ['faccia', 'fa', 'fare', 'fanno'],
            answer: 'faccia',
            explain: '"Fare" es irregular en congiuntivo: faccia/faccia/faccia/facciamo/facciate/facciano.',
          },
          {
            scene: 'Consejo de un amigo',
            lines: [['', 'È importante che tu ___ abbastanza acqua ogni giorno.']],
            options: ['beva', 'bevi', 'bevere', 'beve'],
            answer: 'beva',
            explain: '"Bere" (irregular): congiuntivo → beva/beva/beva/beviamo/beviate/bevano.',
          },
          {
            scene: 'Situación laboral',
            lines: [['', 'Credo che la riunione ___ domani mattina.']],
            options: ['sia', 'è', 'essere', 'siete'],
            answer: 'sia',
            explain: 'Después de "credo che" el verbo debe ir en congiuntivo. "Essere" → sia (para la reunión = lei).',
          },
          {
            scene: 'Deseo personal',
            lines: [['', 'Desidero che lei ___ la verità.']],
            options: ['dica', 'dice', 'dire', 'dico'],
            answer: 'dica',
            explain: '"Dire" en congiuntivo es irregular: dica/dica/dica/diciamo/diciate/dicano.',
          },
          {
            scene: 'Dudas sobre el examen',
            lines: [['', 'Non sono sicuro che loro ___ superare l\'esame.']],
            options: ['possano', 'possono', 'potere', 'potono'],
            answer: 'possano',
            explain: '"Potere" en congiuntivo: possa/possa/possa/possiamo/possiate/possano. Para "loro" → possano.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos congiuntivi en contexto',
        tag: '2 espacios',
        intro: 'Completa las dos formas de congiuntivo presente necesarias en cada oración.',
        type: 'dual',
        items: [
          {
            scene: 'Conversación entre amigos',
            lines: [['', 'Penso che Carlo [[0]] a casa e che sua sorella [[1]] a scuola.']],
            blanks: [
              { options: ['sia', 'è', 'essere', 'siamo'], answer: 'sia', explain: '"Essere" en congiuntivo para "lui" → sia. Desencadenante: penso che.' },
              { options: ['vada', 'va', 'andare', 'andiamo'], answer: 'vada', explain: '"Andare" en congiuntivo para "lei" → vada (irregular).' },
            ],
          },
          {
            scene: 'Requisitos del trabajo',
            lines: [['', 'È necessario che il candidato [[0]] l\'inglese e [[1]] esperienza nel settore.']],
            blanks: [
              { options: ['sappia', 'sa', 'sapere', 'sanno'], answer: 'sappia', explain: '"Sapere" en congiuntivo es irregular: sappia/sappia/sappia/sappiamo/sappiate/sappiano.' },
              { options: ['abbia', 'ha', 'avere', 'hanno'], answer: 'abbia', explain: '"Avere" en congiuntivo: abbia/abbia/abbia/abbiamo/abbiate/abbiano.' },
            ],
          },
          {
            scene: 'Esperanzas para el viaje',
            lines: [['', 'Spero che voi [[0]] bene e che il viaggio [[1]] interessante.']],
            blanks: [
              { options: ['stiate', 'state', 'stare', 'stanno'], answer: 'stiate', explain: '"Stare" en congiuntivo para "voi" → stiate (irregular: stia/stia/stia/stiamo/stiate/stiano).' },
              { options: ['sia', 'è', 'essere', 'siamo'], answer: 'sia', explain: '"Essere" en congiuntivo para "il viaggio" (lui) → sia.' },
            ],
          },
          {
            scene: 'Preocupación familiar',
            lines: [['', 'Mia madre vuole che io [[0]] a casa presto e che [[1]] i compiti prima di uscire.']],
            blanks: [
              { options: ['torni', 'torna', 'tornare', 'torno'], answer: 'torni', explain: '"Tornare" en congiuntivo para "io" → torni (verbos -are: -i para io/tu/lui).' },
              { options: ['faccia', 'fa', 'fare', 'faccio'], answer: 'faccia', explain: '"Fare" en congiuntivo para "io" → faccia (irregular).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Email a un amigo',
        tag: 'Texto guiado',
        intro: 'Completa el email eligiendo la forma correcta de congiuntivo o indicativo.',
        type: 'guidedText',
        scene: 'Elige entre congiuntivo presente e indicativo según el contexto.',
        text: 'Caro Antonio, come stai? Spero che tu [[0]] bene. Penso che la conferenza [[1]] la prossima settimana — non sono sicuro. È possibile che il professore [[2]] in ritardo, perché di solito è molto occupato. Voglio che tu [[3]] con me, sarebbe bello! Credo che ci [[4]] molto da imparare. È importante che tutti [[5]] attentamente durante la presentazione. A presto! — Sara',
        blanks: [
          { options: ['stia', 'stai', 'stare', 'sta'], answer: 'stia', explain: 'Después de "spero che" → congiuntivo. "Stare" para "tu" → stia.' },
          { options: ['sia', 'è', 'essere', 'sono'], answer: 'sia', explain: 'Después de "penso che" → congiuntivo. "Essere" para "la conferenza" (lei) → sia.' },
          { options: ['sia', 'è', 'essere', 'siamo'], answer: 'sia', explain: 'Después de "è possibile che" → congiuntivo. "Essere" para "il professore" (lui) → sia.' },
          { options: ['venga', 'vieni', 'venire', 'viene'], answer: 'venga', explain: 'Después de "voglio che" → congiuntivo. "Venire" para "tu" → venga (irregular).' },
          { options: ['sia', 'è', 'ci sono', 'c\'è'], answer: 'sia', explain: 'Después de "credo che" → congiuntivo. "Esserci" para cantidad → ci sia.' },
          { options: ['ascoltino', 'ascoltano', 'ascoltare', 'ascoltiamo'], answer: 'ascoltino', explain: 'Después de "è importante che" → congiuntivo. "Ascoltare" para "tutti" (loro) → ascoltino.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe la forma correcta',
        tag: 'Texto libre',
        intro: 'Escribe el congiuntivo presente del verbo indicado entre paréntesis.',
        type: 'freeText',
        scene: 'Escribe el congiuntivo presente correcto de cada verbo.',
        text: 'La mia amica pensa che io [[0]] (lavorare) troppo. Crede anche che io non [[1]] (dormire) abbastanza. È strano che tu non [[2]] (sapere) questa cosa! Spero che voi [[3]] (essere) pronti per domani. Voglio che lui [[4]] (venire) alla cena stasera.',
        blanks: [
          { answer: 'lavori', accepted: ['lavori'], explain: '"Lavorare" en congiuntivo para "io" → lavori (verbos -are: -i).' },
          { answer: 'dorma', accepted: ['dorma'], explain: '"Dormire" en congiuntivo para "io" → dorma (verbos -ire simples: -a).' },
          { answer: 'sappia', accepted: ['sappia'], explain: '"Sapere" en congiuntivo para "tu" → sappia (irregular).' },
          { answer: 'siate', accepted: ['siate'], explain: '"Essere" en congiuntivo para "voi" → siate (irregular).' },
          { answer: 'venga', accepted: ['venga'], explain: '"Venire" en congiuntivo para "lui" → venga (irregular).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción con congiuntivo',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando el congiuntivo presente con los desencadenantes dados.',
        type: 'write',
        items: [
          {
            scene: 'Tu opinión',
            prompt: 'Escribe qué crees sobre el tiempo mañana usando "penso che" + congiuntivo.',
            answer: 'Penso che faccia bello domani.',
            accepted: ['penso che', 'credo che', 'faccia', 'piova', 'sia', 'nevichi'],
            explain: 'Ejemplo: Penso che piova domani. / Credo che faccia freddo. / Penso che ci sia il sole.',
          },
          {
            scene: 'Un deseo',
            prompt: 'Expresa lo que quieres que haga un amigo usando "voglio che" + congiuntivo.',
            answer: 'Voglio che Marco venga alla festa con me.',
            accepted: ['voglio che', 'desidero che', 'venga', 'venga', 'vada', 'studi', 'torni', 'parli'],
            explain: 'Ejemplo: Voglio che lei mi chiami. / Desidero che voi veniate presto.',
          },
          {
            scene: 'Una necesidad',
            prompt: 'Escribe algo que es necesario usando "è necessario che" + congiuntivo.',
            answer: 'È necessario che tutti rispettino le regole.',
            accepted: ['è necessario che', 'è importante che', 'sia', 'studino', 'vengano', 'rispettino', 'facciano'],
            explain: 'Ejemplo: È necessario che tu dorma di più. / È importante che loro arrivino in orario.',
          },
          {
            scene: 'Una posibilidad',
            prompt: 'Expresa una posibilidad usando "è possibile che" o "è probabile che".',
            answer: 'È possibile che domani non venga nessuno.',
            accepted: ['è possibile che', 'è probabile che', 'venga', 'piova', 'sia', 'vada', 'arrivi'],
            explain: 'Ejemplo: È probabile che lui sia in ritardo. / È possibile che facciano sciopero.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Expresa tu visión',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones usando el congiuntivo presente con diferentes desencadenantes.',
        type: 'write',
        items: [
          {
            scene: 'Tu opinión sobre la sociedad',
            prompt: 'Escribe qué crees o piensas sobre algo en el mundo usando "penso/credo che".',
            answer: 'Penso che il cambiamento climatico sia un problema urgente.',
            accepted: ['penso che', 'credo che', 'sia', 'faccia', 'abbia', 'vada', 'venga'],
            explain: 'Ejemplo: Credo che la tecnologia abbia cambiato la nostra vita. / Penso che tutti debbano studiare le lingue.',
          },
          {
            scene: 'Un deseo para alguien',
            prompt: 'Expresa un deseo para alguien que conoces (amigo, familiar) usando "spero/voglio che".',
            answer: 'Spero che mia sorella trovi un buon lavoro presto.',
            accepted: ['spero che', 'voglio che', 'trovi', 'vada', 'stia', 'abbia', 'venga', 'torni'],
            explain: 'Ejemplo: Voglio che i miei genitori stiano bene. / Spero che lui abbia successo.',
          },
          {
            scene: 'Una obligación o necesidad',
            prompt: 'Escribe algo que sea importante o necesario en tu vida o trabajo.',
            answer: 'È importante che io finisca questo progetto entro venerdì.',
            accepted: ['è importante che', 'è necessario che', 'finisca', 'studi', 'vada', 'faccia', 'sappia', 'dorma'],
            explain: 'Ejemplo: È necessario che io dorma almeno 7 ore. / È importante che tu venga alla riunione.',
          },
        ],
      },
    ],
  },
}

export default topic
