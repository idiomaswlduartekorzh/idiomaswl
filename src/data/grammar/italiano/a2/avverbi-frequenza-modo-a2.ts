import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'avverbi-frequenza-modo-a2',
  order: '17',
  color: '#009246',
  category: 'Vocabulario',
  level: 'A2',
  title: 'Avverbi di frequenza, modo e quantità en italiano A2',
  shortTitle: 'Avverbi',
  metaTitle: 'Avverbi en italiano A2 — frecuencia, modo y cantidad en italiano',
  description:
    'Los adverbios italianos de frecuencia (sempre, spesso, qualche volta, raramente, mai), modo (-mente, bene, male, velocemente) y cantidad (molto, poco, abbastanza, troppo) son esenciales para expresar con precisión cómo, cuándo y cuánto se hace algo.',
  lead: 'Sempre, spesso, mai: los adverbios que hacen tu italiano más preciso y natural.',
  outcomes: [
    'Usar los adverbios de frecuencia del más al menos habitual',
    'Formar adverbios de modo con -mente y ubicarlos en la oración',
    'Usar molto, poco, abbastanza, troppo como adverbios de cantidad',
    'Posicionar correctamente los adverbios en la frase italiana',
  ],

  guide: {
    goal: 'Usar adverbios de frecuencia, modo y cantidad para enriquecer las oraciones en italiano.',
    model: 'Mangio sempre la colazione. / Parla velocemente. / Ho mangiato troppo.',
    formula: 'Frecuencia: sujeto + avverbio + verbo | Modo: verbo + avverbio | Quantità: verbo + molto/poco/troppo',
    decisions: [
      'Frecuencia: sempre (siempre) > spesso (a menudo) > qualche volta (a veces) > raramente (raramente) > mai (nunca)',
      '"Mai" en oraciones negativas: Non vado mai al cinema. En frases afirmativas: Sei mai stato a Roma?',
      'Adverbios de modo con -mente: aggettivo femm. + -mente: lento → lenta → lentamente; veloce → velocemente',
      '"Bene" y "male" son irregulares: parlo bene italiano, studia male',
      '"Molto" como adverbio es invariable: parlo molto, è molto bravo. Como adjetivo concuerda: molti studenti',
    ],
    table: [
      ['Tipo', 'Avverbio', 'Esempio'],
      ['Frequenza', 'sempre / spesso / mai', 'Vado sempre a piedi.'],
      ['Modo (-mente)', 'lentamente / velocemente', 'Parla lentamente.'],
      ['Modo (irreg.)', 'bene / male', 'Canta bene.'],
      ['Quantità', 'molto / poco / troppo', 'Ho mangiato troppo.'],
    ],
    mistakes: [
      '"Non vado mai" ✓ pero "Vado mai" ❌ (en oraciones negativas mai va con "non") — En preguntas/afirmativas: "Sei mai stato in Italia?" ✓.',
      '"Parliamo lentamente" ✓ pero "parliamo lento" ✗ en sentido adverbial — "lento" es adjetivo, "lentamente" es adverbio.',
      '"Molto bello" ✓ (muy bonito) vs "molti libri" ✓ (muchos libros) — "molto" adverbio es invariable; "molto" adjetivo concuerda.',
    ],
  },

  seo: [
    {
      heading: 'Los adverbios de frecuencia en italiano',
      paragraphs: [
        'Los adverbios de frecuencia van normalmente después del verbo ("Mangio sempre la pasta") o, en tiempos compuestos, entre el auxiliar y el participio ("Ho sempre mangiato qui"). La escala va de sempre a mai:',
      ],
      table: [
        ['Adverbio', 'Frecuencia', 'Español'],
        ['sempre', '~100 %', 'siempre'],
        ['di solito / spesso', '~70-80 %', 'normalmente / a menudo'],
        ['a volte / qualche volta', '~40 %', 'a veces'],
        ['raramente', '~10 %', 'raramente'],
        ['non… mai', '0 %', 'nunca'],
      ],
    },
    {
      heading: 'Adverbios de modo: la formación con -mente',
      paragraphs: [
        'Los adverbios de modo se forman sobre el adjetivo + -mente (equivale al español -mente). La regla depende de la terminación del adjetivo: los -o toman la forma femenina; los -e la conservan; y los acabados en -le/-re pierden la -e final. Son invariables:',
      ],
      table: [
        ['Adjetivo', 'Regla', 'Adverbio'],
        ['lento', 'fem. + mente', 'lentamente'],
        ['veloce', '+ mente', 'velocemente'],
        ['felice', '+ mente', 'felicemente'],
        ['facile (-le)', 'cae la -e', 'facilmente'],
        ['regolare (-re)', 'cae la -e', 'regolarmente'],
      ],
    },
    {
      heading: '¿Cómo se forman los adverbios en -mente en italiano?',
      paragraphs: [
        'Sumando -mente al adjetivo: los -o usan la forma femenina (lento → lentamente), los -e la conservan (veloce → velocemente) y los acabados en -le o -re pierden la -e (facile → facilmente, regolare → regolarmente). Son invariables.',
      ],
    },
    {
      heading: '¿Dónde se colocan los adverbios de frecuencia en italiano?',
      paragraphs: [
        'Normalmente después del verbo: "Vado spesso al cinema". En los tiempos compuestos, entre el auxiliar y el participio: "Ho sempre studiato", "Non sono mai andato". "Di solito" y "a volte" también pueden abrir la frase.',
      ],
    },
    {
      heading: '¿Cómo se dicen "bien" y "mal" en italiano?',
      paragraphs: [
        'Con los adverbios irregulares "bene" (bien) y "male" (mal), que NO se forman con -mente: "Parlo bene l\'italiano", "Ho dormito male". No existen "benemente" ni "malamente" en el uso estándar.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Adverbios de frecuencia, modo y cantidad para describir hábitos y acciones.',
    graphicPrompt: 'Calendario mostrando frecuencia de actividades con etiquetas sempre/spesso/mai.',
    scene: [
      ['Vado sempre in palestra il lunedì.', 'Siempre voy al gimnasio los lunes.'],
      ['Mangio spesso la pasta.', 'Como pasta a menudo.'],
      ['Non guardo mai la TV.', 'Nunca veo la televisión.'],
      ['Parla molto velocemente!', '¡Habla muy rápido!'],
      ['Ho dormito male stanotte.', 'Dormí mal anoche.'],
      ['Ha mangiato troppo ieri sera.', 'Comió demasiado ayer por la noche.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['escala de frecuencia', '-mente', 'mai con non'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el adverbio correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona el adverbio más apropiado para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Una persona que va al gym todos los días sin excepción.',
            lines: [['', 'Va ___ in palestra.']],
            options: ['sempre', 'mai', 'raramente', 'qualche volta'],
            answer: 'sempre',
            explain: '"sempre" = siempre, sin excepción.',
          },
          {
            scene: 'Alguien que no va nunca al cine.',
            lines: [['', 'Non va ___ al cinema.']],
            options: ['mai', 'sempre', 'spesso', 'bene'],
            answer: 'mai',
            explain: '"Non... mai" = nunca. La negación doble es normal en italiano.',
          },
          {
            scene: 'Un estudiante que estudia de forma excelente.',
            lines: [['', 'Studia ___.']],
            options: ['bene', 'male', 'mai', 'troppo poco'],
            answer: 'bene',
            explain: '"bene" = bien (adverbio de modo irregular).',
          },
          {
            scene: 'Una persona que come demasiado en Navidad.',
            lines: [['', 'A Natale mangio ___.']],
            options: ['troppo', 'poco', 'mai', 'bene'],
            answer: 'troppo',
            explain: '"troppo" como adverbio = demasiado (invariable).',
          },
          {
            scene: 'El tren llegó tarde porque iba muy lento.',
            lines: [['', 'Il treno andava ___.']],
            options: ['lentamente', 'lento', 'lenamente', 'con lento'],
            answer: 'lentamente',
            explain: '"lentamente" = de forma lenta (adverbio de modo).',
          },
          {
            scene: 'Preguntando si alguien ha ido alguna vez a Italia.',
            lines: [['', 'Sei ___ stato in Italia?']],
            options: ['mai', 'sempre', 'spesso', 'non mai'],
            answer: 'mai',
            explain: '"mai" en pregunta = alguna vez. "Sei mai stato in Italia?" = ¿Has estado alguna vez en Italia?',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Adverbio y posición',
        tag: '2 espacios',
        intro: 'Elige el adverbio correcto y colócalo en el lugar adecuado.',
        type: 'dual',
        items: [
          {
            scene: 'Ella habla italiano perfectamente.',
            lines: [['', 'Parla italiano [[0]] [[1]].']],
            blanks: [
              { options: ['molto', 'poco', 'non', 'mai'], answer: 'molto', explain: '"molto" como adverbio precede al adjetivo/adverbio que modifica.' },
              { options: ['bene', 'buono', 'bello', 'male'], answer: 'bene', explain: '"bene" es el adverbio de modo irregular para "buono".' },
            ],
          },
          {
            scene: 'Él nunca llega puntual al trabajo.',
            lines: [['', 'Non arriva [[0]] al lavoro [[1]].']],
            blanks: [
              { options: ['mai', 'sempre', 'spesso', 'bene'], answer: 'mai', explain: '"non... mai" = nunca.' },
              { options: ['puntualmente', 'puntuale', 'puntuali', 'puntual'], answer: 'puntualmente', explain: 'puntuale → puntualmente (adverbio de modo).' },
            ],
          },
          {
            scene: 'A veces voy al mercado los sábados.',
            lines: [['', '[[0]] vado al mercato il sabato [[1]].']],
            blanks: [
              { options: ['Qualche volta', 'Sempre', 'Mai', 'Non'], answer: 'Qualche volta', explain: '"qualche volta" = a veces. Al inicio de oración.' },
              { options: ['mattina', 'pomeriggio', 'spesso', 'raramente'], answer: 'mattina', explain: '"la mattina" = por la mañana (complemento de tiempo).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Los hábitos de un estudiante',
        tag: 'Texto guiado',
        intro: 'Elige el adverbio correcto para describir los hábitos de Marco.',
        type: 'guidedText',
        scene: 'Marco describe su rutina de estudio y vida social.',
        text: 'Io studio [[0]] la mattina perché mi concentro meglio. La sera guardo [[1]] la TV, solo qualche ora. Non mangio [[2]] fast food — è malsano. Parlo italiano [[3]] ma devo migliorare ancora. Vado [[4]] in palestra, forse una volta alla settimana.',
        blanks: [
          { options: ['sempre', 'mai', 'raramente', 'abbastanza'], answer: 'sempre', explain: '"sempre" = siempre (todos los días).' },
          { options: ['poco', 'molto', 'mai', 'sempre'], answer: 'poco', explain: '"poco" = poco (cantidad limitada).' },
          { options: ['mai', 'spesso', 'sempre', 'poco'], answer: 'mai', explain: '"non... mai" = nunca.' },
          { options: ['abbastanza', 'mai', 'troppo', 'poco'], answer: 'abbastanza', explain: '"abbastanza" = bastante (suficientemente).' },
          { options: ['raramente', 'sempre', 'mai', 'bene'], answer: 'raramente', explain: '"raramente" = raramente (una vez por semana es poco frecuente).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el adverbio correcto',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe el adverbio de modo derivado del adjetivo indicado.',
        type: 'freeText',
        scene: 'Describiendo cómo hace las cosas la gente.',
        text: 'Parla [[0]] (veloce). / Cammina [[1]] (lento). / Studia [[2]] (serio). / Risponde [[3]] (educato). / Arriva [[4]] (puntuale).',
        blanks: [
          { answer: 'velocemente', explain: 'veloce → velocemente.' },
          { answer: 'lentamente', explain: 'lento → lenta → lentamente.' },
          { answer: 'seriamente', explain: 'serio → seria → seriamente.' },
          { answer: 'educatamente', explain: 'educato → educata → educatamente.' },
          { answer: 'puntualmente', explain: 'puntuale → puntualmente.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Describe hábitos con adverbios',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa usando el adverbio indicado.',
        type: 'write',
        items: [
          {
            scene: 'Habla de ir al gimnasio — usa "raramente".',
            prompt: 'Vado in palestra. (usa: raramente)',
            answer: 'Vado raramente in palestra.',
            accepted: ['Raramente vado in palestra.'],
            explain: '"raramente" puede ir antes del verbo (inicio) o después del auxiliar.',
          },
          {
            scene: 'Habla de comer pizza — usa "spesso".',
            prompt: 'Mangio la pizza. (usa: spesso)',
            answer: 'Mangio spesso la pizza.',
            accepted: ['Spesso mangio la pizza.', 'La pizza la mangio spesso.'],
            explain: '"spesso" normalmente se coloca entre el auxiliar y el participio, o antes del verbo.',
          },
          {
            scene: 'Habla de beber acqua — usa "non... mai".',
            prompt: 'Bevo acqua. (usa: non... mai)',
            answer: 'Non bevo mai acqua.',
            accepted: ['Non bevo mai l\'acqua.'],
            explain: '"Non... mai" envuelve el verbo: "non + verbo + mai".',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe sobre tus hábitos',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones originales usando adverbios de frecuencia, modo o cantidad.',
        type: 'write',
        items: [
          {
            scene: 'Describe tu rutina semanal con adverbios de frecuencia.',
            prompt: 'Scrivi tre cose che fai spesso, qualche volta o mai.',
            answer: 'Studio sempre la sera. Qualche volta vado al cinema. Non mangio mai carne.',
            accepted: [
              'Faccio sempre colazione. Guardo spesso la TV. Non vado mai in palestra.',
            ],
            explain: 'Usa sempre, spesso, qualche volta, raramente, mai para describir hábitos.',
          },
          {
            scene: 'Describe cómo hace algo alguien que conoces.',
            prompt: 'Scrivi come fa qualcosa una persona che conosci (usa un avverbio di modo).',
            answer: 'Mia sorella parla molto velocemente.',
            accepted: [
              'Il mio professore spiega chiaramente.',
              'Il mio amico lavora seriamente.',
            ],
            explain: 'Adverbio de modo (-mente) después del verbo para describir cómo se hace algo.',
          },
        ],
      },
    ],
  },
}

export default topic
