import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'zweiteilige-konnektoren-b1',
  order: '11',
  color: '#1a2ecc',
  category: 'Conectores',
  level: 'B1',
  title: 'Zweiteilige Konnektoren — Conectores dobles en alemán B1',
  shortTitle: 'Zweiteilige Konnektoren',
  metaTitle: 'Zweiteilige Konnektoren B1 — sowohl...als auch, weder...noch, entweder...oder',
  description:
    'Los conectores dobles (zweiteilige Konnektoren) vinculan dos elementos paralelos con dos palabras: sowohl...als auch (tanto...como), weder...noch (ni...ni), entweder...oder (o...o), nicht nur...sondern auch (no solo...sino también). Son esenciales para argumentar y expresar matices en alemán B1.',
  lead: 'Aprende a usar los cuatro conectores dobles del alemán B1 con su posición en la frase y ejercicios progresivos.',
  outcomes: [
    'Usas sowohl...als auch para expresar adición de dos elementos',
    'Construyes frases negativas dobles con weder...noch',
    'Presentas alternativas con entweder...oder y manejas la inversión verbal',
    'Añades información reforzada con nicht nur...sondern auch',
  ],

  guide: {
    goal: 'Usar los cuatro conectores dobles alemanes para conectar y contrastar ideas.',
    model: 'Sie spricht sowohl Englisch als auch Spanisch. / Er trinkt weder Kaffee noch Tee. / Entweder kommst du jetzt oder du bleibst.',
    formula: 'sowohl A als auch B | weder A noch B | entweder A oder B | nicht nur A sondern auch B',
    decisions: [
      'sowohl...als auch: adición de dos elementos equivalentes. Si son dos sujetos, el verbo puede ir en plural: Sowohl Anna als auch Klaus kommen.',
      'weder...noch: negación doble. Ninguno de los dos. Er spricht weder Deutsch noch Englisch.',
      'entweder...oder: alternativa exclusiva. Si "entweder" inicia la frase, el verbo va inmediatamente después: Entweder gehst du jetzt oder du bleibst.',
      'nicht nur...sondern auch: adición reforzada ("no solo...sino también"). Sie ist nicht nur klug, sondern auch fleißig.',
      'je...desto/umso: proporcionalidad. El verbo de la cláusula "je" va al final: Je mehr ich lerne, desto besser verstehe ich.',
      'zwar...aber: "es cierto que...pero". Ich bin zwar müde, aber ich lerne weiter.',
    ],
    table: [
      ['Conector', 'Relación', 'Ejemplo'],
      ['sowohl...als auch', 'adición doble', 'Er kann sowohl singen als auch tanzen.'],
      ['weder...noch', 'negación doble', 'Sie mag weder Kaffee noch Tee.'],
      ['entweder...oder', 'alternativa', 'Entweder kommst du mit oder du bleibst.'],
    ],
    mistakes: [
      '"Entweder du kommst jetzt oder..." ❌ con verbo en posición 2 → "Entweder kommst du jetzt..." ✓ — si "entweder" inicia, el verbo va en posición 2.',
      '"Weder er kommt noch sie kommt" ❌ → "Weder er noch sie kommt" ✓ — más natural juntar los sujetos antes del verbo.',
      '"Nicht nur klug sondern auch" ❌ sin coma → "nicht nur klug, sondern auch fleißig" ✓ — se pone coma antes de sondern.',
    ],
  },

  seo: [
    {
      heading: '¿Cuáles son los conectores dobles más importantes del alemán B1?',
      paragraphs: [
        'Los conectores dobles son pares de palabras que trabajan juntas para conectar dos elementos en paralelo. Son muy útiles en el alemán B1 para enriquecer la expresión, argumentar mejor y evitar repeticiones.',
        'La clave es aprenderlos como una unidad: sowohl SIEMPRE va con "als auch"; weder SIEMPRE va con "noch". No se pueden separar ni mezclar con otros conectores.',
      ],
      table: [
        ['Conector', 'Significado', 'Frase ejemplo'],
        ['sowohl...als auch', 'tanto...como', 'Sie lernt sowohl Deutsch als auch Japanisch.'],
        ['weder...noch', 'ni...ni', 'Er hat weder Zeit noch Lust.'],
        ['entweder...oder', 'o...o', 'Entweder lernst du jetzt oder du schläfst.'],
        ['nicht nur...sondern auch', 'no solo...sino también', 'Er ist nicht nur gut, sondern auch schnell.'],
      ],
    },
    {
      heading: '¿Cómo se usan je...desto y zwar...aber en alemán?',
      paragraphs: [
        '"Je...desto/umso" expresa proporcionalidad: je mehr du übst, desto besser wirst du. La cláusula con "je" lleva el verbo al final (como los Nebensätze), y la cláusula con "desto" tiene inversión normal.',
        '"Zwar...aber" expresa concesión parcial: Ich bin zwar müde, aber ich mache weiter (Es cierto que estoy cansado, pero sigo). El "zwar" queda en la primera cláusula y "aber" inicia la segunda con posición verbal normal.',
      ],
    },
    {
      heading: '¿Qué son los zweiteilige Konnektoren en alemán?',
      paragraphs: [
        'Son conectores de dos piezas que relacionan dos elementos en pareja: "sowohl… als auch" (tanto… como), "entweder… oder" (o… o), "weder… noch" (ni… ni), "nicht nur… sondern auch" (no solo… sino también), "zwar… aber" (si bien… pero) y "je… desto/umso" (cuanto más… más). Dan cohesión y precisión al discurso y por eso se valoran en el Goethe B1. Dos trampas para el hispanohablante: "weder… noch" ya es negativo, así que no lleva "nicht" ni "kein" añadidos ("Ich trinke weder Kaffee noch Tee"); y "je… desto" cambia el orden del verbo (la primera parte es subordinada con verbo al final, la segunda invierte: "Je mehr ich lerne, desto besser verstehe ich").',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Zweiteilige Konnektoren B1: sowohl/als auch, weder/noch, entweder/oder, nicht nur/sondern auch. Posición verbal tras entweder inicial.',
    graphicPrompt: 'Diagrama de Venn mostrando unión (sowohl...als auch), exclusión (weder...noch) y alternativa (entweder...oder).',
    scene: [
      ['Sie spricht sowohl Englisch als auch Japanisch.', 'Habla tanto inglés como japonés.'],
      ['Er mag weder Kaffee noch Tee.', 'No le gusta ni el café ni el té.'],
      ['Entweder du kommst mit oder du bleibst zu Hause.', 'O vienes o te quedas en casa.'],
      ['Sie ist nicht nur klug, sondern auch freundlich.', 'No solo es lista, sino también amable.'],
      ['Je mehr ich lerne, desto besser werde ich.', 'Cuanto más aprendo, mejor me pongo.'],
      ['Ich bin zwar müde, aber ich mache weiter.', 'Es cierto que estoy cansado, pero sigo.'],
      ['Sowohl Anna als auch Klaus kommen zur Party.', 'Tanto Ana como Klaus vienen a la fiesta.'],
      ['Entweder rufst du an oder du schreibst eine E-Mail.', 'O llamas o escribes un correo.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['sowohl...als auch', 'weder...noch', 'entweder...oder', 'nicht nur...sondern auch', 'je...desto'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el conector correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona el conector doble adecuado según el significado de la frase.',
        type: 'choice',
        items: [
          {
            scene: 'Habilidades lingüísticas',
            lines: [['', 'Er spricht ___ Deutsch ___ Englisch. (ni...ni)']],
            options: ['weder / noch', 'sowohl / als auch', 'entweder / oder', 'nicht nur / sondern auch'],
            answer: 'weder / noch',
            explain: '"Weder...noch" expresa negación doble: ni uno ni el otro.',
          },
          {
            scene: 'La dieta',
            lines: [['', 'Sie isst ___ Fleisch ___ Fisch. (tanto...como)']],
            options: ['sowohl / als auch', 'weder / noch', 'entweder / oder', 'zwar / aber'],
            answer: 'sowohl / als auch',
            explain: '"Sowohl...als auch" suma dos elementos equivalentes.',
          },
          {
            scene: 'Ultimátum',
            lines: [['', '___ kommst du jetzt ___ du bleibst für immer. (o...o)']],
            options: ['Entweder / oder', 'Weder / noch', 'Sowohl / als auch', 'Nicht nur / sondern auch'],
            answer: 'Entweder / oder',
            explain: '"Entweder...oder" expresa alternativa exclusiva. Al inicio: Entweder + verbo (inversión).',
          },
          {
            scene: 'Cualidades',
            lines: [['', 'Er ist ___ klug ___ sehr freundlich. (no solo...sino también)']],
            options: ['nicht nur / sondern auch', 'weder / noch', 'zwar / aber', 'sowohl / als auch'],
            answer: 'nicht nur / sondern auch',
            explain: '"Nicht nur...sondern auch" añade información reforzada.',
          },
          {
            scene: 'El deporte',
            lines: [['', '___ mehr du trainierst, ___ besser wirst du. (cuanto más...tanto más)']],
            options: ['Je / desto', 'Sowohl / als auch', 'Entweder / oder', 'Zwar / aber'],
            answer: 'Je / desto',
            explain: '"Je...desto" expresa proporcionalidad creciente.',
          },
          {
            scene: 'Cansancio',
            lines: [['', 'Ich bin ___ müde, ___ ich mache weiter. (es cierto que...pero)']],
            options: ['zwar / aber', 'weder / noch', 'je / desto', 'entweder / oder'],
            answer: 'zwar / aber',
            explain: '"Zwar...aber" concede algo pero añade contraste.',
          },
          {
            scene: 'La fiesta',
            lines: [['', '___ Anna ___ Klaus haben heute Geburtstag. (tanto...como)']],
            options: ['Sowohl / als auch', 'Weder / noch', 'Entweder / oder', 'Zwar / aber'],
            answer: 'Sowohl / als auch',
            explain: '"Sowohl...als auch" une dos sujetos; el verbo puede ir en plural: haben.',
          },
          {
            scene: 'El restaurante',
            lines: [['', 'Das Restaurant ist ___ teuer ___ besonders lecker. (no solo...sino también)']],
            options: ['nicht nur / sondern auch', 'weder / noch', 'sowohl / als auch', 'je / desto'],
            answer: 'nicht nur / sondern auch',
            explain: '"Nicht nur...sondern auch" añade un segundo aspecto positivo.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Las dos partes del conector',
        tag: '2 espacios',
        intro: 'Escribe las dos partes del conector indicado en los espacios correctos.',
        type: 'dual',
        items: [
          {
            scene: 'Músico talentoso',
            lines: [['', 'Sie kann [[0]] Klavier [[1]] Gitarre spielen.']],
            blanks: [
              { options: ['sowohl', 'als auch', 'weder', 'noch'], answer: 'sowohl', explain: 'Primera parte de "sowohl...als auch".' },
              { options: ['als auch', 'sowohl', 'noch', 'oder'], answer: 'als auch', explain: 'Segunda parte: "als auch" después del segundo elemento.' },
            ],
          },
          {
            scene: 'Bebidas',
            lines: [['', 'Er trinkt [[0]] Alkohol [[1]] Kaffee.']],
            blanks: [
              { options: ['weder', 'noch', 'sowohl', 'als auch'], answer: 'weder', explain: 'Primera parte de "weder...noch".' },
              { options: ['noch', 'weder', 'als auch', 'oder'], answer: 'noch', explain: 'Segunda parte: "noch" antes del segundo elemento negado.' },
            ],
          },
          {
            scene: 'Decisión',
            lines: [['', '[[0]] fährst du mit dem Bus [[1]] du nimmst ein Taxi.']],
            blanks: [
              { options: ['Entweder', 'oder', 'Sowohl', 'als auch'], answer: 'Entweder', explain: 'Al inicio de frase → Entweder + inversión del verbo.' },
              { options: ['oder', 'Entweder', 'noch', 'sondern auch'], answer: 'oder', explain: '"oder" introduce la segunda alternativa.' },
            ],
          },
          {
            scene: 'La doctora',
            lines: [['', 'Sie ist [[0]] Ärztin [[1]] Professorin.']],
            blanks: [
              { options: ['nicht nur', 'sondern auch', 'weder', 'noch'], answer: 'nicht nur', explain: '"nicht nur" antes del primer elemento.' },
              { options: ['sondern auch', 'nicht nur', 'als auch', 'oder'], answer: 'sondern auch', explain: '"sondern auch" introduce el segundo elemento añadido.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto argumentativo',
        tag: 'Texto guiado',
        intro: 'Completa el texto sobre una ciudad con los conectores adecuados.',
        type: 'guidedText',
        scene: 'Descripción de una ciudad con ventajas y desventajas.',
        text: 'In meiner Stadt gibt es [[0]] gute Restaurants [[1]] schöne Parks. Die Leute sind [[2]] freundlich [[3]] hilfsbereit. [[4]] wohnst du in der Stadt [[5]] auf dem Land, es hat Vor- und Nachteile.',
        blanks: [
          { options: ['sowohl', 'weder', 'entweder', 'je'], answer: 'sowohl', explain: '"sowohl" inicia la construcción de adición.' },
          { options: ['als auch', 'noch', 'oder', 'desto'], answer: 'als auch', explain: '"als auch" completa "sowohl...als auch".' },
          { options: ['nicht nur', 'weder', 'sowohl', 'je'], answer: 'nicht nur', explain: '"nicht nur" inicia la adición reforzada.' },
          { options: ['sondern auch', 'noch', 'als auch', 'desto'], answer: 'sondern auch', explain: '"sondern auch" completa "nicht nur...sondern auch".' },
          { options: ['Entweder', 'Sowohl', 'Weder', 'Je'], answer: 'Entweder', explain: '"Entweder" al inicio → verbo en posición 2: wohnst du.' },
          { options: ['oder', 'als auch', 'noch', 'desto'], answer: 'oder', explain: '"oder" introduce la segunda alternativa.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Combina las frases',
        tag: 'Texto libre',
        intro: 'Combina las frases usando el conector doble indicado.',
        type: 'freeText',
        scene: 'Transforma dos frases simples en una con el conector dado.',
        text: 'Maria habla español. Maria habla francés. (sowohl...als auch) → [[0]] / Él no quiere café. Él no quiere té. (weder...noch) → [[1]] / Vas en autobús. O tomas taxi. (entweder...oder) → [[2]] / Es inteligente. Es muy creativa. (nicht nur...sondern auch) → [[3]] / Más aprendes. Mejor entiendes. (je...desto) → [[4]]',
        blanks: [
          { answer: 'Maria spricht sowohl Spanisch als auch Französisch.', explain: '"sowohl...als auch" une los dos idiomas que habla.' },
          { answer: 'Er mag weder Kaffee noch Tee.', explain: '"weder...noch" niega los dos sustantivos.' },
          { answer: 'Entweder fährst du mit dem Bus oder du nimmst ein Taxi.', explain: '"Entweder" al inicio → inversión: fährst du.' },
          { answer: 'Sie ist nicht nur intelligent, sondern auch sehr kreativ.', explain: 'Coma antes de "sondern". "auch" refuerza el segundo elemento.' },
          { answer: 'Je mehr du lernst, desto besser verstehst du.', explain: '"je" + Nebensatz (verbo al final), "desto" + oración principal (inversión).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Conectores dobles en contexto',
        tag: 'Producción guiada',
        intro: 'Escribe frases y textos cortos usando los conectores dobles.',
        type: 'write',
        items: [
          {
            scene: 'Tus habilidades',
            prompt: 'Describe tus habilidades usando "sowohl...als auch" y "nicht nur...sondern auch".',
            answer: 'Ich spreche sowohl Englisch als auch Spanisch. Ich bin nicht nur kreativ, sondern auch sehr organisiert.',
            explain: '"sowohl...als auch" para dos habilidades equivalentes; "nicht nur...sondern auch" para resaltar más.',
          },
          {
            scene: 'Decisiones difíciles',
            prompt: 'Escribe 2 frases sobre decisiones difíciles usando "entweder...oder".',
            answer: 'Entweder studiere ich weiter oder ich fange an zu arbeiten. Entweder spare ich Geld oder ich mache diesen Sommer Urlaub.',
            explain: '"Entweder" al inicio → verbo en posición 2 (inversión).',
          },
          {
            scene: 'Estructura',
            prompt: 'Explica qué pasa con el orden de palabras cuando "entweder" inicia la frase. Da un ejemplo.',
            answer: 'Wenn "entweder" am Satzanfang steht, kommt das Verb direkt danach (Inversion): Entweder kommst du jetzt oder du bleibst zu Hause.',
            explain: 'Entweder ocupa la posición 1 → el verbo va en posición 2.',
          },
          {
            scene: 'Aprender idiomas',
            prompt: 'Escribe 2 frases con "je...desto" sobre aprender idiomas.',
            answer: 'Je mehr man übt, desto flüssiger spricht man. Je früher man anfängt, desto leichter ist das Lernen.',
            explain: 'La cláusula "je" tiene verbo al final (wie ein Nebensatz). La cláusula "desto" tiene inversión.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Argumentación con conectores dobles',
        tag: 'Escritura libre',
        intro: 'Usa conectores dobles en textos argumentativos completos.',
        type: 'write',
        items: [
          {
            scene: 'Ciudad grande vs. pequeña',
            prompt: 'Escribe un texto de 5-7 oraciones sobre las ventajas y desventajas de vivir en una ciudad grande, usando al menos 3 conectores dobles diferentes.',
            answer: '',
            explain: 'Usa sowohl...als auch para ventajas, nicht nur...sondern auch para aspectos positivos reforzados, weder...noch para lo que falta.',
          },
          {
            scene: 'Debate',
            prompt: '¿Es mejor aprender un idioma en academia o de forma autodidacta? Usa sowohl...als auch, nicht nur...sondern auch y entweder...oder en tu respuesta.',
            answer: '',
            explain: 'Presenta los dos lados con conectores dobles para argumentar con matices.',
          },
          {
            scene: 'Je...desto',
            prompt: 'Crea 3 frases "je...desto" sobre el trabajo, el deporte y los viajes.',
            answer: '',
            explain: 'Recuerda: cláusula "je" con verbo al final; cláusula "desto" con inversión.',
          },
        ],
      },
    ],
  },
}

export default topic
