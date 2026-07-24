import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'akkusativ',
  order: '12',
  color: '#c9a900',
  category: 'Kasus',
  level: 'A1',
  title: 'Der Akkusativ im Deutschen A1',
  shortTitle: 'Akkusativ',
  metaTitle: 'Caso acusativo alemán A1 — den, einen, keinen — objeto directo',
  description:
    'El acusativo es el primer caso gramatical que aprende el hispanohablante en alemán. Marca el objeto directo de la oración (¿Was? / ¿Wen?). La gran noticia: solo cambia el artículo masculino singular: DER → DEN, EIN → EINEN. Los demás géneros y el plural no cambian.',
  lead: 'El acusativo marca el objeto directo. Solo cambia el masculino singular: der → den, ein → einen, kein → keinen. Femenino, neutro y plural: sin cambio.',
  outcomes: [
    'Reconoces el acusativo como caso del objeto directo',
    'Aplicas el cambio der→den / ein→einen solo en masculino singular',
    'Usas verbos transitivos frecuentes con acusativo',
  ],

  guide: {
    goal: 'Marcar el objeto directo en acusativo, aplicando el cambio solo en masculino singular.',
    model: 'Ich kaufe den Tisch. / Ich habe einen Bruder. / Ich sehe die Frau. / Ich lese das Buch.',
    formula: '¿Was? / ¿Wen? → Objeto directo en Akkusativ (solo masc. sing. cambia)',
    decisions: [
      'Masculino: der → den / ein → einen / kein → keinen',
      'Femenino: die → die / eine → eine / keine → keine (sin cambio)',
      'Neutro: das → das / ein → ein / kein → kein (sin cambio)',
      'Plural: die → die / keine → keine (sin cambio)',
      'Verbos que piden acusativo: haben, sehen, kaufen, essen, trinken, nehmen, brauchen, kennen, lieben, hören, lesen',
    ],
    table: [
      ['Género', 'Nominativo', 'Acusativo'],
      ['Masculino', 'der/ein Mann', 'den/einen Mann ⚡'],
      ['Femenino', 'die/eine Frau', 'die/eine Frau'],
      ['Neutro', 'das/ein Kind', 'das/ein Kind'],
      ['Plural', 'die/– Kinder', 'die/– Kinder'],
    ],
    mistakes: [
      '"Ich kaufe der Tisch" ❌ — masculino acusativo: "den Tisch" ✓',
      '"Ich habe ein Bruder" ❌ — masculino acusativo: "einen Bruder" ✓',
      '"Ich sehe dier Frau" ❌ — femenino no cambia: "die Frau" ✓',
      'Solo el artículo masculino singular cambia — ningún otro.',
    ],
  },

  seo: [
    {
      heading: 'El caso acusativo: primer encuentro con los casos alemanes',
      paragraphs: [
        'El alemán tiene cuatro casos (Kasus): Nominativo, Akkusativ, Dativ y Genitiv. En A1 aprendemos los dos primeros. El nominativo es el caso del sujeto (¿Wer macht das? — ¿Quién hace eso?). El acusativo es el caso del objeto directo (¿Was macht er? / ¿Wen sieht sie? — ¿Qué hace él? / ¿A quién ve ella?).',
        'La gran ventaja del acusativo para principiantes: SOLO cambia el artículo masculino singular. Der → den, ein → einen, kein → keinen. Femenino, neutro y plural quedan exactamente igual que en nominativo. Esta asimetría puede parecer arbitraria, pero facilita enormemente el aprendizaje inicial.',
      ],
    },
    {
      heading: 'Verbos transitivos que piden acusativo',
      paragraphs: [
        'Los verbos transitivos en alemán piden un objeto directo en acusativo. Los más frecuentes en A1: haben (tener), sehen (ver), kaufen (comprar), essen (comer), trinken (beber), nehmen (tomar), brauchen (necesitar), kennen (conocer a), lieben (amar), hören (escuchar), lesen (leer).',
        'Ejemplo con masculino: Ich kaufe einen Tisch (no "ein Tisch"). Con femenino: Ich kaufe eine Lampe (sin cambio). Con neutro: Ich kaufe ein Buch (sin cambio). El único cambio ocurre cuando el objeto es masculino singular.',
      ],
    },
    {
      heading: 'Preguntas de comprobación: ¿Was? y ¿Wen?',
      paragraphs: [
        'Para saber si un sustantivo está en acusativo, pregunta: ¿Was? (¿Qué?) para cosas o ¿Wen? (¿A quién?) para personas. Ich kaufe den Tisch → Was kaufe ich? → den Tisch (acusativo). Er sieht die Frau → Wen sieht er? → die Frau (acusativo femenino, sin cambio visible).',
        'Esta prueba de las preguntas es útil para identificar el acusativo incluso cuando el artículo no cambia visiblemente (femenino, neutro, plural). En esos casos, el caso es acusativo aunque la forma del artículo sea idéntica al nominativo.',
      ],
    },
    {
      heading: 'La estrategia de la "n": masculino acusativo siempre lleva -n',
      paragraphs: [
        'Una regla mnemotécnica eficaz: en masculino singular, todos los artículos y determinantes añaden -n en acusativo. Der → den, ein → einen, kein → keinen, mein → meinen, dein → deinen, sein → seinen, ihr → ihren, unser → unseren.',
        'Esto te permite generalizar: siempre que el sustantivo sea masculino singular y sea objeto directo, añade -n a su artículo/posesivo. Esta -n del acusativo masculino es una de las marcas más importantes del alemán.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Acusativo: solo masculino singular cambia. Tabla de cambios.',
    graphicPrompt: 'Tabla comparativa nominativo vs acusativo con los cuatro géneros/números.',
    scene: [
      ['Mask. NOM → AKK', 'der Mann → Ich sehe den Mann.'],
      ['Fem. NOM → AKK', 'die Frau → Ich sehe die Frau. (igual)'],
      ['Neut. NOM → AKK', 'das Kind → Ich sehe das Kind. (igual)'],
      ['Plural NOM → AKK', 'die Kinder → Ich sehe die Kinder. (igual)'],
      ['ein → einen', 'Ich habe einen Bruder / eine Schwester / ein Kind.'],
      ['kein → keinen', 'Ich habe keinen Hunger / keine Zeit / kein Geld.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['der→den, ein→einen solo m.sg.', '¿Was?/¿Wen? para identificar', 'verbos transitivos'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Elige el artículo correcto en acusativo.',
        type: 'choice',
        items: [
          {
            scene: 'Carlos compra muebles',
            lines: [['Carlos', 'Ich kaufe ___ Tisch. (der Tisch, masc.)']],
            options: ['einen', 'ein', 'eine', 'der'],
            answer: 'einen',
            explain: '"Tisch" = masculino, objeto directo (acusativo) → "einen Tisch". Ein → einen.',
          },
          {
            scene: 'Ana ve a una amiga en la calle',
            lines: [['Ana', 'Ich sehe ___ Freundin. (die Freundin, fem.)']],
            options: ['eine', 'einen', 'ein', 'die'],
            answer: 'eine',
            explain: '"Freundin" = femenino, acusativo → "eine Freundin". Femenino NO cambia: eine → eine.',
          },
          {
            scene: 'Dario lee en el descanso',
            lines: [['Dario', 'Ich lese ___ Buch. (das Buch, neut.)']],
            options: ['ein', 'einen', 'eine', 'das'],
            answer: 'ein',
            explain: '"Buch" = neutro, acusativo → "ein Buch". Neutro NO cambia: ein → ein.',
          },
          {
            scene: 'Marco en el restaurante',
            lines: [['Marco', 'Ich trinke ___ Kaffee. (der Kaffee, masc.)']],
            options: ['einen', 'ein', 'eine', 'kein'],
            answer: 'einen',
            explain: '"Kaffee" = masculino, acusativo → "einen Kaffee". Der → den / ein → einen.',
          },
          {
            scene: 'Lía pregunta al grupo',
            lines: [['Lía', 'Habt ihr ___ Stift? (der Stift, masc., bolígrafo)']],
            options: ['einen', 'ein', 'eine', 'der'],
            answer: 'einen',
            explain: '"Stift" = masculino, objeto directo de "haben" → "einen Stift".',
          },
          {
            scene: 'Sofía conoce a alguien nuevo',
            lines: [['Sofía', 'Ich kenne ___ Mann nicht. (der Mann, masc., definitivo)']],
            options: ['den', 'der', 'die', 'das'],
            answer: 'den',
            explain: '"Mann" = masculino definido, acusativo → "den Mann". Der → den (artículo definido).',
          },
          {
            scene: 'Lina necesita ayuda',
            lines: [['Lina', 'Ich brauche ___ Hilfe. (die Hilfe, fem.)']],
            options: ['die', 'den', 'das', 'einen'],
            answer: 'die',
            explain: '"Hilfe" = femenino definido, acusativo → "die Hilfe". Die no cambia en acusativo.',
          },
          {
            scene: 'Carlos no quiere café',
            lines: [['Carlos', 'Ich möchte ___ Kaffee. (negativo, der Kaffee, masc.)']],
            options: ['keinen', 'keine', 'kein', 'nicht'],
            answer: 'keinen',
            explain: '"Kaffee" = masculino, acusativo negado → "keinen Kaffee". Kein → keinen en masculino.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Objeto directo',
        tag: '2 espacios',
        intro: 'Completa con el verbo y el artículo en acusativo.',
        type: 'dual',
        items: [
          {
            scene: 'Sofía describe lo que compra',
            lines: [['Sofía', 'Ich [[0]] [[1]] Computer. (kaufen, der Computer, masc.)']],
            blanks: [
              { options: ['kaufe', 'kaufst', 'kauft', 'kaufen'], answer: 'kaufe', explain: '"Ich" + kaufen → "ich kaufe".' },
              { options: ['einen', 'ein', 'eine', 'der'], answer: 'einen', explain: '"Computer" = masculino, acusativo → "einen Computer".' },
            ],
          },
          {
            scene: 'Marco en la cafetería',
            lines: [['Marco', 'Ich [[0]] [[1]] Sandwich. (essen, das Sandwich, neut.)']],
            blanks: [
              { options: ['esse', 'isst', 'essen', 'esst'], answer: 'esse', explain: '"Ich" + essen (irr. e→i) → "ich esse" (ich no cambia).' },
              { options: ['ein', 'einen', 'eine', 'das'], answer: 'ein', explain: '"Sandwich" = neutro, acusativo → "ein Sandwich". Neutro no cambia.' },
            ],
          },
          {
            scene: 'Carlos habla de su familia',
            lines: [['Carlos', 'Ich [[0]] [[1]] Bruder sehr. (lieben, der Bruder, masc.)']],
            blanks: [
              { options: ['liebe', 'liebt', 'liebst', 'lieben'], answer: 'liebe', explain: '"Ich" + lieben → "ich liebe".' },
              { options: ['meinen', 'mein', 'meine', 'meiner'], answer: 'meinen', explain: '"Bruder" = masculino, acusativo, posesivo → "meinen Bruder". Mein → meinen en masc. acus.' },
            ],
          },
          {
            scene: 'Ana no tiene tiempo hoy',
            lines: [['Ana', 'Ich [[0]] [[1]] Zeit heute. (haben, die Zeit, fem. negado)']],
            blanks: [
              { options: ['habe', 'hat', 'hast', 'haben'], answer: 'habe', explain: '"Ich" + haben → "ich habe".' },
              { options: ['keine', 'keinen', 'kein', 'nicht'], answer: 'keine', explain: '"Zeit" = femenino, acusativo negado → "keine Zeit". Keine no cambia.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Elige el artículo correcto en acusativo.',
        type: 'guidedText',
        scene: 'Carlos hace la compra del supermercado.',
        text: 'Carlos kauft [[0]] Brot (das Brot, neut.), [[1]] Apfel (der Apfel, masc.), [[2]] Milch (die Milch, fem.), [[3]] Käse (der Käse, masc.) und [[4]] Wasser (das Wasser, neut.). Er hat [[5]] Einkaufsliste (die Liste, fem.) in der Hand. Er braucht auch [[6]] Stift (der Stift, masc.), aber er hat [[7]].',
        blanks: [
          { options: ['ein', 'einen', 'eine', 'das'], answer: 'ein', explain: '"Brot" = neutro → "ein Brot". Neutro no cambia en acusativo.' },
          { options: ['einen', 'ein', 'eine', 'der'], answer: 'einen', explain: '"Apfel" = masculino → "einen Apfel". Ein → einen.' },
          { options: ['eine', 'einen', 'ein', 'die'], answer: 'eine', explain: '"Milch" = femenino → "eine Milch". Femenino no cambia.' },
          { options: ['einen', 'ein', 'eine', 'der'], answer: 'einen', explain: '"Käse" = masculino → "einen Käse". Ein → einen.' },
          { options: ['ein', 'einen', 'eine', 'das'], answer: 'ein', explain: '"Wasser" = neutro → "ein Wasser".' },
          { options: ['eine', 'einen', 'ein', 'die'], answer: 'eine', explain: '"Liste" = femenino → "eine Liste". Femenino no cambia.' },
          { options: ['einen', 'ein', 'eine', 'der'], answer: 'einen', explain: '"Stift" = masculino → "einen Stift". Ein → einen.' },
          { options: ['keinen', 'keine', 'kein', 'nicht'], answer: 'keinen', explain: '"Stift" = masculino, negado → "keinen Stift". Kein → keinen.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe el artículo correcto en acusativo.',
        type: 'freeText',
        scene: 'Sofía describe lo que hace cada día.',
        text: 'Morgens trinke ich [[0]] Tee (der Tee, masc.). Ich lese [[1]] Zeitung (die Zeitung, fem.). Ich brauche [[2]] Computer (der Computer, masc.) für die Arbeit. Ich höre [[3]] Musik (die Musik, fem.). Ich habe [[4]] Hund (der Hund, masc.) — er heißt Bello.',
        blanks: [
          { answer: 'einen', accepted: ['einen'], explain: '"Tee" = masculino → "einen Tee". Ein → einen.' },
          { answer: 'eine', accepted: ['die', 'eine'], explain: '"Zeitung" = femenino → "eine Zeitung" (o "die Zeitung"). Femenino no cambia.' },
          { answer: 'einen', accepted: ['einen'], explain: '"Computer" = masculino → "einen Computer".' },
          { answer: 'die', accepted: ['die'], explain: '"Musik" = femenino definida → "die Musik". Femenino acusativo = igual a nominativo.' },
          { answer: 'einen', accepted: ['einen'], explain: '"Hund" = masculino → "einen Hund".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones con objeto directo en acusativo.',
        type: 'write',
        items: [
          {
            scene: 'Lo que tienes',
            prompt: 'Di 3 cosas que tienes usando "Ich habe einen/eine/ein...".',
            answer: 'Ich habe einen Bruder, eine Schwester und ein Auto.',
            accepted: ['einen ', 'eine ', 'ein '],
            explain: 'Masculino: einen. Femenino: eine. Neutro: ein. Ej: Ich habe einen Freund / eine Katze / ein Fahrrad.',
          },
          {
            scene: 'Lo que compras',
            prompt: 'Di 3 cosas que compras usando "Ich kaufe...".',
            answer: 'Ich kaufe einen Kaffee, ein Buch und eine Zeitung.',
            accepted: ['kaufe einen', 'kaufe eine', 'kaufe ein', 'kaufe den', 'kaufe die', 'kaufe das'],
            explain: 'Recuerda: solo masculino cambia (→ einen/den). Femenino y neutro sin cambio.',
          },
          {
            scene: 'Lo que ves',
            prompt: 'Describe qué ves desde tu ventana con "Ich sehe...".',
            answer: 'Ich sehe einen Park, eine Straße und ein altes Haus.',
            accepted: ['sehe einen', 'sehe eine', 'sehe ein', 'sehe den', 'sehe die', 'sehe das'],
            explain: 'Park (masc) → einen/den. Straße (fem) → eine/die. Haus (neut) → ein/das.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Describe compras, posesiones o lo que ves usando acusativo variado.',
        type: 'write',
        items: [
          {
            scene: 'Tu lista de la compra ideal',
            prompt: 'Escribe 4 cosas que comprarías en el supermercado usando acusativo correcto.',
            answer: 'Ich kaufe einen Apfel, eine Flasche Wasser, ein Brot und einen Käse.',
            accepted: ['einen ', 'eine ', 'ein '],
            explain: 'Identifica el género de cada sustantivo. Solo masculino cambia: ein→einen, der→den.',
          },
          {
            scene: 'Lo que tienes y lo que no tienes',
            prompt: 'Di 2 cosas que tienes y 2 que NO tienes usando keinen/keine/kein.',
            answer: 'Ich habe einen Laptop und eine Katze. Ich habe keinen Fernseher und kein Auto.',
            accepted: ['habe einen', 'habe eine', 'habe ein', 'habe keinen', 'habe keine', 'habe kein'],
            explain: 'Positivo: einen/eine/ein. Negativo: keinen/keine/kein. Solo masculino añade -en.',
          },
          {
            scene: 'Hablando de tus gustos',
            prompt: 'Di qué lees, qué escuchas y qué ves (lesen, hören, sehen) con objetos directos.',
            answer: 'Ich lese einen Roman. Ich höre Musik. Ich sehe einen Film.',
            accepted: ['lese einen', 'lese eine', 'lese ein', 'höre', 'sehe einen', 'sehe eine', 'sehe das'],
            explain: 'Roman (masc) → einen Roman. Musik (fem) → die/keine Musik. Film (masc) → einen Film.',
          },
        ],
      },
    ],
  },
}

export default topic
