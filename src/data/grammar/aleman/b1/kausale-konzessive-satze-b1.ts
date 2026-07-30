import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'kausale-konzessive-satze-b1',
  order: '15',
  color: '#1a2ecc',
  category: 'Conectores',
  level: 'B1',
  title: 'Kausale und konzessive Sätze — Causales y concesivas en alemán B1',
  shortTitle: 'Kausale & konzessive Sätze',
  metaTitle: 'Weil, da, obwohl, trotzdem en alemán B1 — oraciones causales y concesivas',
  description:
    'Las oraciones causales expresan la razón de algo (weil, da, denn) y las concesivas expresan contraste o concesión (obwohl, trotzdem, dennoch). En B1 es esencial distinguir las subjunciones (weil, obwohl → verbo al final) de los adverbios conjuntivos (deshalb, trotzdem → inversión) y de las conjunciones coordinantes (denn → no mueve el verbo).',
  lead: 'Aprende a expresar causas y concesiones en alemán con weil, da, denn, deshalb, obwohl y trotzdem.',
  outcomes: [
    'Formas oraciones causales con weil, da y denn entendiendo la posición verbal en cada caso',
    'Usas deshalb y daher para expresar consecuencia con inversión',
    'Construyes oraciones concesivas con obwohl (verbo al final) y trotzdem (inversión)',
    'Distingues subjunciones de adverbios conjuntivos y usas cada uno correctamente',
  ],

  guide: {
    goal: 'Expresar causas, consecuencias y concesiones en alemán con los conectores adecuados y la posición verbal correcta.',
    model: 'Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte. / Obwohl es regnet, gehen wir spazieren. / Es ist kalt. Trotzdem spielen die Kinder draußen.',
    formula: 'weil/da/obwohl + ... + Verb (final) | deshalb/trotzdem: Adv. en pos.1 → Verb en pos.2 | denn: sin cambio de posición',
    decisions: [
      'weil (porque): Nebensatz, verbo al final. Ich bleibe zu Hause, weil ich krank bin.',
      'da (ya que, puesto que): como weil, más formal. Da er krank ist, kommt er nicht.',
      'denn (pues/porque): Konjunktion coordinante, NO mueve el verbo. Ich gehe nicht, denn ich bin krank.',
      'deshalb / daher / deswegen (por eso): Adverb, inversión. Er ist krank. Deshalb kommt er nicht.',
      'obwohl (aunque): Nebensatz, verbo al final. Obwohl es regnet, gehen wir spazieren.',
      'trotzdem / dennoch (sin embargo): Adverb, inversión. Es regnet. Trotzdem gehen wir spazieren.',
      'Error frecuente: "trotzdem" NUNCA funciona como subjunción. No se puede escribir "trotzdem es regnet, gehen wir". Para eso se usa "obwohl".',
    ],
    table: [
      ['Conector', 'Tipo', 'Posición del verbo'],
      ['weil / da', 'Subjunktion', 'verbo al FINAL del Nebensatz'],
      ['denn', 'Konjunktion', 'posición normal (no cambia)'],
      ['deshalb / trotzdem', 'Adverb', 'Adv. en pos.1 → verbo en pos.2'],
    ],
    mistakes: [
      '"...weil ich bin krank" ❌ → "...weil ich krank bin" ✓ — en el weil-Satz el verbo va al final.',
      '"Trotzdem es regnet, gehen wir" ❌ → no funciona así. Usa "Obwohl es regnet, gehen wir" ✓.',
      '"Er ist krank, deshalb er kommt nicht" ❌ → "Er ist krank. Deshalb kommt er nicht" ✓ — deshalb en posición 1 → inversión.',
    ],
  },

  seo: [
    {
      heading: '¿Cuál es la diferencia entre obwohl y trotzdem en alemán?',
      paragraphs: [
        '"Obwohl" es una subjunción: introduce una oración subordinada con el verbo al final. "Trotzdem" es un adverbio conjuntivo: va al inicio de una oración independiente con inversión del verbo. Ambos expresan concesión, pero su estructura gramatical es completamente diferente.',
        'Ejemplos paralelos: "Obwohl es kalt ist, gehe ich spazieren." vs. "Es ist kalt. Trotzdem gehe ich spazieren." Ambas significan lo mismo (A pesar del frío salgo a pasear) pero con estructura diferente.',
      ],
      table: [
        ['Conector', 'Estructura', 'Ejemplo'],
        ['obwohl', 'Nebensatz (verbo al final)', 'Obwohl es regnet, gehen wir.'],
        ['trotzdem', 'Adverb (inversión)', 'Es regnet. Trotzdem gehen wir.'],
        ['weil', 'Nebensatz (verbo al final)', 'Ich bleibe, weil ich müde bin.'],
        ['denn', 'Konjunktion (sin cambio)', 'Ich bleibe, denn ich bin müde.'],
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre weil y denn en alemán?',
      paragraphs: [
        '"Weil" introduce un Nebensatz (el verbo va al final): "Ich lerne Deutsch, weil ich es interessant finde." "Denn" es una Konjunktion coordinante que une dos frases independientes sin cambiar el orden del verbo: "Ich lerne Deutsch, denn ich finde es interessant."',
        'En el habla cotidiana "weil" es más común. "Denn" suena más formal o literario. En el alemán escrito ambos son correctos.',
      ],
    },
    {
      heading: '¿Cómo se expresan causa y concesión en alemán?',
      paragraphs: [
        'La causa ("por qué") se marca con weil y da (subordinantes → verbo al final: "Ich bleibe zu Hause, weil ich krank bin") o con denn (coordinante → orden normal: "…, denn ich bin krank"). La concesión ("a pesar de") se marca con obwohl (subordinante → verbo al final: "Obwohl es regnet, gehe ich spazieren") o con trotzdem (adverbio → provoca inversión: "Es regnet, trotzdem gehe ich spazieren"). La trampa clave del hispanohablante es la posición del verbo: weil y obwohl mandan el verbo conjugado al final de su cláusula, mientras que denn y trotzdem no alteran ese orden (aunque trotzdem sí invierte sujeto y verbo). Distinguir subordinante de adverbio conector es lo que decide dónde va el verbo.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Kausale und konzessive Sätze B1: weil/da (Nebensatz, Verb final), denn (Konjunktion), deshalb/trotzdem (Adverb, Inversion), obwohl (Nebensatz, Verb final).',
    graphicPrompt: 'Diagrama de causa-efecto con conectores: flecha de causa (weil), flecha de consecuencia (deshalb), flecha de contraste (obwohl/trotzdem).',
    scene: [
      ['Ich lerne Deutsch, weil ich nach Deutschland möchte.', 'Aprendo alemán porque quiero ir a Alemania.'],
      ['Er ist krank. Deshalb kommt er nicht.', 'Está enfermo. Por eso no viene.'],
      ['Obwohl es regnet, gehen wir spazieren.', 'Aunque llueve, vamos a pasear.'],
      ['Es ist kalt. Trotzdem spielen die Kinder.', 'Hace frío. Sin embargo los niños juegan.'],
      ['Da er krank ist, bleibt er zu Hause.', 'Ya que está enfermo, se queda en casa.'],
      ['Ich schlafe nicht gut, denn ich habe Stress.', 'No duermo bien, pues tengo estrés.'],
      ['Sie lernt viel, weil sie die Prüfung bestehen will.', 'Ella estudia mucho porque quiere aprobar el examen.'],
      ['Obwohl er müde ist, macht er Sport.', 'Aunque está cansado, hace deporte.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['weil Nebensatz', 'obwohl Nebensatz', 'deshalb Inversion', 'trotzdem Inversion', 'denn Konjunktion'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el conector correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona el conector adecuado según el significado y la estructura de cada frase.',
        type: 'choice',
        items: [
          {
            scene: 'El estudiante',
            lines: [['', 'Ich lerne Deutsch, ___ ich in Deutschland arbeiten möchte. (porque — Nebensatz)']],
            options: ['weil', 'obwohl', 'trotzdem', 'deshalb'],
            answer: 'weil',
            explain: '"weil" introduce un Nebensatz causal. El verbo (möchte) va al final.',
          },
          {
            scene: 'Los niños',
            lines: [['', 'Es ist kalt. ___ gehen die Kinder trotzdem spielen. (de todas formas — inversión)']],
            options: ['Trotzdem', 'Weil', 'Obwohl', 'Da'],
            answer: 'Trotzdem',
            explain: '"Trotzdem" en posición 1 → inversión: Trotzdem gehen die Kinder.',
          },
          {
            scene: 'En la lluvia',
            lines: [['', '___ es regnet, fahren wir Fahrrad. (aunque — Nebensatz)']],
            options: ['Obwohl', 'Weil', 'Deshalb', 'Denn'],
            answer: 'Obwohl',
            explain: '"Obwohl" introduce un Nebensatz concesivo. El verbo (regnet) va al final del Nebensatz.',
          },
          {
            scene: 'Por eso',
            lines: [['', 'Er hat nicht gegessen. ___ ist er jetzt sehr hungrig. (por eso — inversión)']],
            options: ['Deshalb', 'Obwohl', 'Weil', 'Trotzdem'],
            answer: 'Deshalb',
            explain: '"Deshalb" en posición 1 → inversión: Deshalb ist er...',
          },
          {
            scene: 'La causa',
            lines: [['', 'Sie schläft nicht gut, ___ sie morgen eine Prüfung hat. (porque)']],
            options: ['weil', 'obwohl', 'trotzdem', 'da'],
            answer: 'weil',
            explain: '"weil" + Nebensatz. Verbo al final: hat.',
          },
          {
            scene: 'Aunque cansado',
            lines: [['', '___ er müde ist, macht er Sport. (aunque — Nebensatz inicial)']],
            options: ['Obwohl', 'Weil', 'Deshalb', 'Denn'],
            answer: 'Obwohl',
            explain: '"Obwohl" al inicio → el Nebensatz va primero: Obwohl er müde ist, + oración principal con inversión.',
          },
          {
            scene: 'Pues',
            lines: [['', 'Ich kann nicht kommen, ___ ich zu viel Arbeit habe. (pues — coordinante)']],
            options: ['denn', 'obwohl', 'trotzdem', 'deshalb'],
            answer: 'denn',
            explain: '"denn" es coordinante: no cambia la posición del verbo en la oración que introduce.',
          },
          {
            scene: 'Ya que',
            lines: [['', '___ sie krank ist, bleibt sie zu Hause. (ya que — Nebensatz inicial)']],
            options: ['Da', 'Trotzdem', 'Deshalb', 'Denn'],
            answer: 'Da',
            explain: '"Da" (ya que) como "weil" pero más formal; Nebensatz con verbo al final.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Combina frases con el conector dado',
        tag: '2 espacios',
        intro: 'Elige las partes correctas para crear la oración combinada.',
        type: 'dual',
        items: [
          {
            scene: 'Aunque enfermo',
            lines: [['', 'Er geht zur Arbeit, [[0]] er [[1]] ist. (obwohl — krank)']],
            blanks: [
              { options: ['obwohl', 'weil', 'trotzdem', 'deshalb'], answer: 'obwohl', explain: '"obwohl" = aunque; introduce Nebensatz.' },
              { options: ['krank', 'nicht krank', 'gut', 'müde'], answer: 'krank', explain: 'Verbo (ist) al final del obwohl-Satz: obwohl er krank ist.' },
            ],
          },
          {
            scene: 'Por eso estudia',
            lines: [['', 'Sie hat die Prüfung nicht bestanden. [[0]] [[1]] sie jetzt viel. (deshalb — lernt)']],
            blanks: [
              { options: ['Deshalb', 'Obwohl', 'Weil', 'Trotzdem'], answer: 'Deshalb', explain: '"Deshalb" en pos. 1 → inversión: Deshalb lernt sie...' },
              { options: ['lernt', 'sie lernt', 'lernte', 'hat gelernt'], answer: 'lernt', explain: 'Inversión: Deshalb + Verb (lernt) + Subjekt (sie).' },
            ],
          },
          {
            scene: 'A pesar del frío',
            lines: [['', 'Es ist kalt. [[0]] [[1]] wir spazieren. (trotzdem — gehen)']],
            blanks: [
              { options: ['Trotzdem', 'Obwohl', 'Weil', 'Deshalb'], answer: 'Trotzdem', explain: '"Trotzdem" en pos. 1 → inversión.' },
              { options: ['gehen', 'wir gehen', 'gingen', 'gegangen'], answer: 'gehen', explain: 'Trotzdem + Verb (gehen) + Subjekt (wir).' },
            ],
          },
          {
            scene: 'Mucho trabajo',
            lines: [['', 'Sie hat viel gearbeitet. [[0]] [[1]] sie erschöpft. (deshalb — ist)']],
            blanks: [
              { options: ['Deshalb', 'Trotzdem', 'Obwohl', 'Weil'], answer: 'Deshalb', explain: '"Deshalb" expresa consecuencia.' },
              { options: ['ist', 'sie ist', 'war', 'sein'], answer: 'ist', explain: 'Deshalb + ist (Verb) + sie (Subjekt) + erschöpft.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'La rutina matutina',
        tag: 'Texto guiado',
        intro: 'Completa el texto con el conector causal o concesivo correcto.',
        type: 'guidedText',
        scene: 'Alguien describe su mañana difícil.',
        text: 'Ich stehe früh auf, [[0]] ich viel Zeit brauche. [[1]] ich schläfrig bin, dusche ich kalt. Ich frühstücke gut, [[2]] ich später keine Zeit habe. [[3]] esse ich immer ein gutes Frühstück. [[4]] ich fit bin, kann ich gut arbeiten.',
        blanks: [
          { options: ['weil', 'obwohl', 'trotzdem', 'deshalb'], answer: 'weil', explain: '"weil" + Nebensatz: Ich stehe früh auf, weil ich viel Zeit brauche.' },
          { options: ['Obwohl', 'Weil', 'Deshalb', 'Trotzdem'], answer: 'Obwohl', explain: '"Obwohl" al inicio → Nebensatz primero, luego inversión en la oración principal.' },
          { options: ['weil', 'obwohl', 'trotzdem', 'deshalb'], answer: 'weil', explain: '"weil ich später keine Zeit habe" → Nebensatz, verbo al final.' },
          { options: ['Deshalb', 'Obwohl', 'Weil', 'Trotzdem'], answer: 'Deshalb', explain: '"Deshalb" en pos. 1 → inversión: Deshalb esse ich...' },
          { options: ['Weil', 'Obwohl', 'Trotzdem', 'Deshalb'], answer: 'Weil', explain: '"Weil ich fit bin" → causa de poder trabajar bien.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Reescribe con el conector alternativo',
        tag: 'Texto libre',
        intro: 'Transforma cada oración usando el conector alternativo indicado.',
        type: 'freeText',
        scene: 'Reescribe la oración conservando el significado pero cambiando el conector.',
        text: '"Er ist müde, weil er nicht geschlafen hat." → Reescribe con "denn": [[0]] / "Obwohl es kalt ist, geht sie spazieren." → Reescribe con "trotzdem": [[1]] / "Sie hat viel gelernt. Deshalb hat sie bestanden." → Reescribe con "weil": [[2]] / "Da sie krank ist, bleibt sie zu Hause." → Reescribe con "deshalb": [[3]]',
        blanks: [
          { answer: 'Er ist müde, denn er hat nicht geschlafen.', explain: '"denn" = coordinante; no cambia el orden del verbo en la segunda frase.' },
          { answer: 'Es ist kalt. Trotzdem geht sie spazieren.', explain: '"trotzdem" en pos. 1 → inversión: Trotzdem geht sie...' },
          { answer: 'Sie hat die Prüfung bestanden, weil sie viel gelernt hat.', explain: '"weil" + Nebensatz: verbo (hat) al final.' },
          { answer: 'Sie ist krank. Deshalb bleibt sie zu Hause.', explain: '"Deshalb" en pos. 1 → Deshalb bleibt sie...' },
        ],
      },
      {
        id: 'level-5',
        title: 'Causales y concesivas en contexto',
        tag: 'Producción guiada',
        intro: 'Escribe frases y argumentos usando causales y concesivas.',
        type: 'write',
        items: [
          {
            scene: 'Por qué aprendes alemán',
            prompt: 'Escribe 3 razones por las que aprendes alemán usando weil.',
            answer: 'Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte. Ich lerne Deutsch, weil die Sprache sehr interessant ist. Ich lerne Deutsch, weil ich die deutsche Kultur mag.',
            explain: 'weil + Nebensatz: verbo siempre al final.',
          },
          {
            scene: 'Dos lados',
            prompt: 'Escribe 2 frases con obwohl y 2 con trotzdem sobre el mismo tema.',
            answer: 'Obwohl Deutsch schwer ist, lerne ich es gern. Obwohl ich wenig Zeit habe, übe ich täglich. Es ist schwer. Trotzdem mache ich weiter. Ich habe wenig Zeit. Trotzdem lerne ich jeden Tag.',
            explain: 'obwohl → Nebensatz; trotzdem → nueva frase con inversión.',
          },
          {
            scene: 'La diferencia',
            prompt: 'Explica la diferencia de posición del verbo entre "weil" y "denn" con ejemplos.',
            answer: '"weil" ist Subjunktion → Verb ans Ende: Ich bin müde, weil ich nicht geschlafen habe. "denn" ist Konjunktion → Verb bleibt auf Pos. 2: Ich bin müde, denn ich habe nicht geschlafen.',
            explain: '"weil" subordina, "denn" coordina sin cambiar el orden.',
          },
          {
            scene: 'Argumento de dos lados',
            prompt: 'Escribe algo que haces aunque tienes una razón para no hacerlo, usando obwohl y trotzdem.',
            answer: 'Obwohl ich müde bin, gehe ich ins Fitnessstudio. Es ist sehr heiß. Trotzdem trinke ich keinen Alkohol.',
            explain: 'Mismo significado, diferente estructura: Nebensatz vs. Adverbsatz.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Argumentación causal y concesiva',
        tag: 'Escritura libre',
        intro: 'Usa causales y concesivas en textos argumentativos completos.',
        type: 'write',
        items: [
          {
            scene: 'Por qué vale la pena',
            prompt: 'Escribe un texto de 6-8 oraciones argumentando por qué vale la pena aprender alemán, usando weil, da, obwohl, trotzdem y deshalb.',
            answer: '',
            explain: 'Mezcla causas (weil/da), consecuencias (deshalb) y concesiones (obwohl/trotzdem).',
          },
          {
            scene: 'Conflicto de decisión',
            prompt: 'Describe un conflicto de decisión (estudiar vs. trabajar, quedarse vs. irse) usando causales y concesivas para presentar ambos lados.',
            answer: '',
            explain: 'weil para las razones, obwohl/trotzdem para los contrapuntos.',
          },
          {
            scene: 'Análisis',
            prompt: '¿Por qué "trotzdem" no puede iniciar un Nebensatz como "obwohl"? Explica la diferencia estructural.',
            answer: '',
            explain: '"trotzdem" es un adverbio, no una subjunción; no puede subordinar una oración.',
          },
        ],
      },
    ],
  },
}

export default topic
