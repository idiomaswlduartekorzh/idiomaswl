import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbo-avere',
  order: '03',
  color: '#0d9488',
  category: 'Verbos',
  level: 'A1',
  title: 'Verbo Avere en italiano A1 — Tener y expresiones clave',
  shortTitle: 'Avere (tener)',
  metaTitle: 'Verbo avere italiano A1 — ho hai ha abbiamo avete hanno',
  description:
    'El verbo avere (tener) es esencial en italiano A1. Se conjuga de forma irregular y se usa para posesión, edad y expresiones idiomáticas donde el español usa "ser" o "estar": avere fame (tener hambre), avere freddo (tener frío), avere X anni (tener X años).',
  lead: 'Avere = tener. ho/hai/ha/abbiamo/avete/hanno. Clave: la edad se expresa con avere (ho 25 anni), no con essere. Y "avere fame" no es "ser/estar hambriento" sino literalmente "tener hambre".',
  outcomes: [
    'Conjuga avere en presente para todos los sujetos',
    'Usa avere para posesión y para expresar la edad',
    'Aplica expresiones con avere: fame, sete, freddo, caldo, paura, sonno',
  ],

  guide: {
    goal: 'Usar avere para posesión, edad y expresiones idiomáticas del italiano A1.',
    model: 'Ho una macchina. (Tengo un coche.) / Ho venticinque anni. (Tengo 25 años.) / Ho fame. (Tengo hambre.)',
    formula: '[sujeto] + ho/hai/ha/abbiamo/avete/hanno + [complemento]',
    decisions: [
      'ho → io: Ho un cane.',
      'hai → tu: Hai fratelli?',
      'ha → lui/lei: Ha una bella voce.',
      'abbiamo → noi: Abbiamo lezione.',
      'avete → voi: Avete fame?',
      'hanno → loro: Hanno un appartamento.',
      'Edad: Ho [número] anni. Nunca: "Sono 25 anni."',
    ],
    table: [
      ['Sujeto', 'Avere', 'Ejemplo'],
      ['io', 'ho', 'Ho fame. (Tengo hambre.)'],
      ['tu', 'hai', 'Hai un fratello? (¿Tienes un hermano?)'],
      ['lui/lei', 'ha', 'Ha trent\'anni. (Tiene 30 años.)'],
      ['noi', 'abbiamo', 'Abbiamo lezione oggi. (Tenemos clase hoy.)'],
      ['voi', 'avete', 'Avete freddo? (¿Tenéis frío?)'],
      ['loro', 'hanno', 'Hanno molti amici. (Tienen muchos amigos.)'],
    ],
    mistakes: [
      '"Ho" no lleva h en pronunciación — la h italiana es siempre muda: "o" = ho. Pero la h se escribe.',
      'Edad: "Ho vent\'anni" ✓ | "Sono vent\'anni" ✗ — la edad usa avere, no essere.',
      '"Avere" vs "essere" para estados: avere fame/sete/freddo/caldo (tengo hambre/sed/frío/calor) son expresiones con avere, no essere.',
    ],
  },
  seo: [
    {
      heading: 'El verbo avere: conjugación y usos principales',
      paragraphs: [
        'Avere es el segundo verbo fundamental del italiano tras essere. Su conjugación es irregular: ho, hai, ha, abbiamo, avete, hanno. La h de "ho, hai, ha, hanno" es muda — no se pronuncia. Se escribe para distinguir de o (o, conjunción), ai (a los), a (a), anno (año).',
        'Los usos principales de avere son: posesión (Ho un cane = Tengo un perro), familia (Ha due sorelle = Tiene dos hermanas), características (Ha gli occhi blu = Tiene los ojos azules) y expresiones idiomáticas.',
      ],
    },
    {
      heading: 'La edad con avere: Ho X anni',
      paragraphs: [
        'En italiano, la edad se expresa con avere, no con essere. "Ho ventitre anni" = Tengo 23 años. Nunca "Sono ventitre anni" o "Sono ventitre" para la edad. Esto contrasta con el alemán (Ich bin 23 Jahre alt = Ich bin = ser) pero coincide con el español (tengo 23 años).',
        'La pregunta de edad es: "Quanti anni hai?" (¿Cuántos años tienes?) y la respuesta: "Ho [número] anni." Siempre con avere, siempre con "anni" al final.',
      ],
    },
    {
      heading: 'Expresiones idiomáticas con avere',
      paragraphs: [
        'El italiano usa avere donde el español coincide (tener) pero otras lenguas usan "ser". Todas siguen el patrón avere + sustantivo SIN artículo: "Ho fame", nunca "Ho la fame". Memoriza este bloque, porque aparece en cada conversación:',
      ],
      table: [
        ['Expresión', 'Español', 'Ejemplo'],
        ['avere fame / sete', 'tener hambre / sed', 'Ho fame!'],
        ['avere freddo / caldo', 'tener frío / calor', 'Hai freddo?'],
        ['avere paura', 'tener miedo', 'Ha paura del cane.'],
        ['avere sonno', 'tener sueño', 'Ho sonno.'],
        ['avere fretta', 'tener prisa', 'Abbiamo fretta.'],
        ['avere ragione / torto', 'tener razón / no tenerla', 'Hai ragione.'],
        ['avere bisogno di', 'necesitar', 'Ho bisogno di aiuto.'],
        ['avere voglia di', 'tener ganas de', 'Ho voglia di gelato.'],
      ],
    },
    {
      heading: '¿Cómo se conjuga el verbo avere en presente?',
      paragraphs: [
        'Avere en presente indicativo: io ho, tu hai, lui/lei ha, noi abbiamo, voi avete, loro hanno. La h de ho, hai, ha y hanno es muda (no se pronuncia) pero es obligatoria por escrito: distingue "ho" (tengo) de "o" (o), y "ha" (tiene) de "a" (a). Noi y voi pierden la h: abbiamo, avete.',
      ],
    },
    {
      heading: '¿Cómo se dice la edad en italiano?',
      paragraphs: [
        'Con avere, no con essere. La pregunta es "Quanti anni hai?" (¿Cuántos años tienes?) y la respuesta "Ho [número] anni" — por ejemplo "Ho ventitré anni". Nunca "Sono ventitré anni". Es igual que el español (tener años) y distinto del inglés o el alemán, que usan "ser".',
      ],
    },
    {
      heading: '¿Cuándo se usa avere y cuándo essere?',
      paragraphs: [
        'Avere expresa posesión (Ho una macchina), edad (Ho 20 anni) y sensaciones físicas con sustantivo (Ho fame). Essere expresa identidad, origen, profesión y estado con adjetivo (Sono stanco). Truco: si en español dices "tener + sustantivo", casi siempre es avere; si dices "ser/estar + adjetivo", es essere.',
      ],
    },
  ],
  visual: {
    mode: 'verb-conjugation',
    teacherLens: 'El estudiante aprende avere para posesión, edad y expresiones idiomáticas.',
    graphicPrompt: 'Tabla conjugación avere. Cuadro de expresiones avere + sustantivo sin artículo.',
    scene: [
      ['ho / hai / ha', 'yo / tú / él-ella'],
      ['abbiamo / avete / hanno', 'nos / vos / ellos'],
      ['avere + edad / sensaciones', 'Ho 20 anni / Ho fame'],
    ],
    learnerModes: ['visual: tabla con expresiones', 'analítico: avere vs essere', 'oral: hablar de posesiones'],
    practiceVerbs: ['Posee', 'Expresa edad', 'Siente', 'Pregunta', 'Niega', 'Describe'],
    reviewFocus: ['ho/hai/ha/abbiamo/avete/hanno', 'edad con avere', 'h muda en ho', 'expresiones sin artículo'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Conjugación en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de avere.',
        type: 'choice',
        items: [
          {
            scene: 'Tu mascota',
            lines: [['Sofia', 'Io ___ un cane di nome Rex.']],
            options: ['ho', 'hai', 'ha', 'abbiamo'],
            answer: 'ho',
            explain: 'Io ho = yo tengo. Primera persona singular de avere.',
          },
          {
            scene: 'Preguntando por hermanos',
            lines: [['Carlo', 'Tu ___ fratelli?']],
            options: ['hai', 'ho', 'ha', 'avete'],
            answer: 'hai',
            explain: 'Tu hai = tú tienes. Segunda persona singular.',
          },
          {
            scene: 'Su coche',
            lines: [['Marco', 'Lui ___ una macchina nuova.']],
            options: ['ha', 'ho', 'hai', 'hanno'],
            answer: 'ha',
            explain: 'Lui ha = él tiene. Tercera persona singular.',
          },
          {
            scene: 'Tenemos clase',
            lines: [['Sara', 'Noi ___ lezione ogni lunedì.']],
            options: ['abbiamo', 'hanno', 'avete', 'ho'],
            answer: 'abbiamo',
            explain: 'Noi abbiamo = nosotros tenemos. Primera persona plural.',
          },
          {
            scene: '¿Tenéis hambre?',
            lines: [['Nico', 'Voi ___ fame? Andiamo a mangiare?']],
            options: ['avete', 'abbiamo', 'hanno', 'hai'],
            answer: 'avete',
            explain: 'Voi avete = vosotros tenéis. Segunda persona plural.',
          },
          {
            scene: 'Edad',
            lines: [['Lina', 'Io ___ ventidue anni.']],
            options: ['ho', 'sono', 'hai', 'è'],
            answer: 'ho',
            explain: 'Edad con avere: Ho X anni. Nunca sono X anni.',
          },
          {
            scene: 'Ellos tienen frío',
            lines: [['Ana', 'I bambini ___ freddo. Diamo loro un maglione.']],
            options: ['hanno', 'abbiamo', 'avete', 'ho'],
            answer: 'hanno',
            explain: 'Loro hanno = ellos tienen. Avere freddo = tener frío.',
          },
          {
            scene: 'Tengo miedo',
            lines: [['Marco', 'Non voglio entrare — io ___ paura!']],
            options: ['ho', 'hai', 'ha', 'siamo'],
            answer: 'ho',
            explain: 'Ho paura = tengo miedo. Expresión con avere.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Avere en diálogo',
        tag: '2 espacios',
        intro: 'Completa los dos verbos avere en el diálogo.',
        type: 'dual',
        items: [
          {
            scene: '¿Cuántos años tienes?',
            lines: [
 ['Sofia', 'Carlo, quanti anni [[0]]?'],
 ['Carlo', 'Io [[1]] ventotto anni.'],
 ],
            blanks: [
              { options: ['hai', 'ho', 'ha'], answer: 'hai', explain: 'Tu hai = tú tienes. Pregunta de edad.' },
              { options: ['ho', 'hai', 'ha'], answer: 'ho', explain: 'Io ho = yo tengo. Respuesta de edad.' },
            ],
          },
          {
            scene: 'Hambre y sed',
            lines: [['Nico', 'Voi [[0]] fame o [[1]] solo sete?']],
            blanks: [
              { options: ['avete', 'abbiamo', 'hanno'], answer: 'avete', explain: 'Voi avete = vosotros tenéis.' },
              { options: ['avete', 'abbiamo', 'hanno'], answer: 'avete', explain: 'Misma forma: avete sete.' },
            ],
          },
          {
            scene: 'Mascotas',
            lines: [
 ['Ana', 'Tu [[0]] animali domestici?'],
 ['Marco', 'Sì, io [[1]] un gatto e un cane.'],
 ],
            blanks: [
              { options: ['hai', 'ho', 'ha'], answer: 'hai', explain: 'Tu hai = tú tienes. Pregunta.' },
              { options: ['ho', 'hai', 'ha'], answer: 'ho', explain: 'Io ho = yo tengo. Respuesta.' },
            ],
          },
          {
            scene: 'Ella y ellos',
            lines: [['Sara', 'Lei [[0]] molta esperienza. I suoi studenti [[1]] molto talento.']],
            blanks: [
              { options: ['ha', 'hanno', 'abbiamo'], answer: 'ha', explain: 'Lei ha = ella tiene. Singular.' },
              { options: ['hanno', 'ha', 'abbiamo'], answer: 'hanno', explain: 'I suoi studenti hanno = ellos tienen. Plural.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Completa el texto con la forma correcta de avere.',
        type: 'guidedText',
        scene: 'Un día en la academia WeLearn',
        text: 'Nico [[0]] trentadue anni e [[1]] una grande passione per le lingue. Noi [[2]] lezione oggi alle tre del pomeriggio. Gli studenti [[3]] molte domande — è normale, [[4]] curiosità! Tu [[5]] fame? Andiamo a prendere un caffè prima della lezione.',
        blanks: [
          { options: ['ha', 'ho', 'hanno'], answer: 'ha', explain: 'Nico ha trentadue anni. Avere para la edad.' },
          { options: ['ha', 'ho', 'hanno'], answer: 'ha', explain: 'Lui ha una grande passione. Posesión.' },
          { options: ['abbiamo', 'hanno', 'avete'], answer: 'abbiamo', explain: 'Noi abbiamo lezione. Primera plural.' },
          { options: ['hanno', 'abbiamo', 'avete'], answer: 'hanno', explain: 'Gli studenti hanno domande. Plural.' },
          { options: ['hanno', 'abbiamo', 'avete'], answer: 'hanno', explain: 'Mismo sujeto (gli studenti): hanno curiosità.' },
          { options: ['hai', 'ho', 'ha'], answer: 'hai', explain: 'Tu hai fame? Segunda persona singular.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe avere sin opciones.',
        type: 'freeText',
        scene: 'Conversación entre compañeros',
        text: 'Io [[0]] ventitré anni. Tu [[1]] quanti anni? Marco [[2]] venticinque anni. Noi [[3]] lezione domani. Voi [[4]] il libro di italiano? Loro [[5]] anche il dizionario.',
        blanks: [
          { answer: 'ho', explain: 'Io ho = yo tengo. Edad.' },
          { answer: 'hai', explain: 'Tu hai = tú tienes. Pregunta.' },
          { answer: 'ha', explain: 'Marco ha venticinque anni. Tercera persona.' },
          { answer: 'abbiamo', explain: 'Noi abbiamo lezione. Primera plural.' },
          { answer: 'avete', explain: 'Voi avete = vosotros tenéis. Segunda plural.' },
          { answer: 'hanno', explain: 'Loro hanno = ellos tienen. Tercera plural.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción con avere',
        tag: 'Producción',
        intro: 'Escribe la frase completa con avere.',
        type: 'write',
        items: [
          {
            scene: 'Tu edad',
            prompt: 'Escribe tu edad en italiano: Io ___ [número] anni.',
            answer: 'Io ho ventitre anni.',
            accepted: ['io ho ventitre anni', 'io ho ventiquattro anni', 'io ho venticinque anni', 'io ho trenta anni'],
            explain: 'Io ho X anni. La edad siempre con avere.',
          },
          {
            scene: 'Tengo hambre',
            prompt: 'Escribe: Tengo mucha hambre. → Io ___ molta fame.',
            answer: 'Io ho molta fame.',
            accepted: ['io ho molta fame', 'io ho molta fame.', 'ho molta fame'],
            explain: 'Ho molta fame. Avere fame = tener hambre. Sin artículo.',
          },
          {
            scene: 'Ella tiene frío',
            prompt: 'Escribe: Ella tiene frío. → Lei ___ freddo.',
            answer: 'Lei ha freddo.',
            accepted: ['lei ha freddo', 'lei ha freddo.'],
            explain: 'Lei ha freddo. Avere freddo = tener frío.',
          },
          {
            scene: 'Ellos tienen miedo',
            prompt: 'Escribe: Ellos tienen miedo. → Loro ___ paura.',
            answer: 'Loro hanno paura.',
            accepted: ['loro hanno paura', 'loro hanno paura.'],
            explain: 'Loro hanno paura. Avere paura = tener miedo.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Habla de ti mismo usando avere para posesión, edad y sensaciones.',
        type: 'write',
        items: [
          {
            scene: 'Cuéntate',
            prompt: 'Io ho ___ anni. Ho ___. Adesso ho ___ (sensación).',
            answer: 'Io ho ventitre anni. Ho un fratello. Adesso ho fame.',
            accepted: ['io ho ventitre anni ho un fratello adesso ho fame', 'io ho venticinque anni ho una sorella adesso ho sete'],
            explain: 'Avere para edad, posesión y sensaciones.',
          },
          {
            scene: 'Habla de tu familia',
            prompt: 'Il mio [padre/madre/amico/a] ha ___ anni e ha ___.',
            answer: 'Il mio amico ha ventisei anni e ha un cane.',
            accepted: ['il mio amico ha ventisei anni e ha un cane', 'mia madre ha cinquant\'anni e ha molti libri'],
            explain: 'Lui/lei ha para tercera persona. Avere para edad y posesión.',
          },
          {
            scene: 'Estados físicos',
            prompt: 'Describe cómo te sientes ahora: Ho ___ e ho ___.',
            answer: 'Ho fame e ho sonno.',
            accepted: ['ho fame e ho sonno', 'ho sete e ho freddo', 'ho caldo e ho fretta', 'ho paura e ho freddo'],
            explain: 'Avere + sensación sin artículo: ho fame, ho sete, ho freddo, ho sonno.',
          },
        ],
      },
    ],
  },
}

export default topic
