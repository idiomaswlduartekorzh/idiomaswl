import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'adjektive-pradikativ',
  order: '11',
  color: '#c9a900',
  category: 'Adjektive',
  level: 'A1',
  title: 'Adjektive prädikativ im Deutschen A1',
  shortTitle: 'Adjektive prädikativ',
  metaTitle: 'Adjetivos predicativos alemán A1 — Das ist schön, Der Film ist gut',
  description:
    'En alemán A1, los adjetivos predicativos van después de los verbos copulativos (sein, werden, bleiben) y NO se declinan. Das Buch ist interessant / Die Stadt ist schön / Der Mann ist müde. Esta invariabilidad es una ventaja para el principiante comparado con los adjetivos atributivos (que sí se declinan).',
  lead: 'Adjetivos después de sein/werden/bleiben: NUNCA cambian de forma. Das Essen ist gut. / Die Musik ist schön. / Der Kurs ist interessant. Sin terminaciones adicionales.',
  outcomes: [
    'Usas adjetivos predicativos sin añadir terminaciones de género',
    'Entiendes la diferencia entre uso predicativo (sin declinación) y atributivo (con declinación en A2)',
    'Conoces vocabulario clave de adjetivos descriptivos en alemán A1',
  ],

  guide: {
    goal: 'Usar adjetivos después de sein/werden/bleiben sin declinación.',
    model: 'Das Buch ist interessant. / Die Stadt ist schön. / Der Mann ist müde.',
    formula: 'Sujeto + sein/werden/bleiben + Adjetivo (invariable)',
    decisions: [
      'Predicativo = después de ser/estar/quedarse: Das Essen ist lecker.',
      'NO añadir terminación según el género: "Das Essen ist leckers" ❌ → "lecker" ✓',
      'Funciona igual con los tres géneros: Der Film ist gut. / Die Musik ist gut. / Das Buch ist gut.',
      'También en plural: Die Kinder sind müde. (mismo adjetivo, sin cambio)',
      'En A2 aprendes adjetivos atributivos con declinación: "ein gutes Buch" ≠ A1',
    ],
    table: [
      ['Género', 'Ejemplo', 'Adjetivo'],
      ['Masculino', 'Der Mann ist müde.', 'müde (sin cambio)'],
      ['Femenino', 'Die Frau ist müde.', 'müde (sin cambio)'],
      ['Neutro', 'Das Kind ist müde.', 'müde (sin cambio)'],
    ],
    mistakes: [
      '"Der Film ist gutem" ❌ — predicativo no se declina: "Der Film ist gut" ✓',
      '"Die Stadt ist schöne" ❌ — "schön" no añade -e: "Die Stadt ist schön" ✓',
      '"Das Essen ist leckers" ❌ — sin terminación: "Das Essen ist lecker" ✓',
    ],
  },

  seo: [
    {
      heading: 'Adjetivos predicativos: la regla más fácil del alemán',
      paragraphs: [
        'En alemán, los adjetivos tienen tres usos distintos. En A1 solo estudiamos el uso predicativo: cuando el adjetivo va después de "sein" (ser/estar), "werden" (volverse) o "bleiben" (quedarse). En este uso, el adjetivo es completamente invariable — nunca cambia su forma, independientemente del género o número del sujeto.',
        '"Das Buch ist interessant" → "Die Geschichte ist interessant" → "Der Film ist interessant" — el mismo adjetivo para los tres géneros. Esto contrasta con el español, donde tampoco hay cambio en este contexto (el libro es interesante / la historia es interesante), pero contrasta radicalmente con los adjetivos atributivos del alemán (que se estudian en A2).',
      ],
    },
    {
      heading: 'Verbos copulativos: sein, werden, bleiben',
      paragraphs: [
        'Los tres verbos que introducen adjetivos predicativos son: sein (ser/estar), werden (volverse/ponerse) y bleiben (quedarse/permanecer). En A1, el más frecuente es sein: Das Wetter ist schön. / Die Aufgabe ist schwer. / Der Kaffee ist heiß.',
        '"Werden" aparece en A1 en contextos de cambio: Es wird kalt. (Se está poniendo frío.) "Bleiben" en: Bleib gesund! (¡Mantente sano!) Ambos son menos frecuentes en A1 que "sein".',
      ],
    },
    {
      heading: 'Los adjetivos atributivos: una nota para motivar',
      paragraphs: [
        'La buena noticia: en A1 solo necesitas los adjetivos predicativos. En A2 aprenderás los adjetivos atributivos — los que van antes del sustantivo y sí se declinan según género y caso: "ein gutes Buch" (neutro), "ein guter Film" (masculino), "eine gute Idee" (femenino). Pero por ahora, ¡todo es invariable!',
        'Para hispanohablantes, la distinción entre uso predicativo (sin declinación) y atributivo (con declinación) es fundamental para entender por qué el alemán tiene una reputación de "difícil". Pero uno a la vez: primero predicativo, después atributivo.',
      ],
    },
    {
      heading: 'Vocabulario esencial de adjetivos A1',
      paragraphs: [
        'Adjetivos de valoración: gut (bueno), schlecht (malo), schön (bonito), hässlich (feo), interessant (interesante), langweilig (aburrido), lecker (rico/sabroso), eklig (asqueroso). Adjetivos de estado: müde (cansado), fit (en forma), krank (enfermo), gesund (sano), glücklich (feliz), traurig (triste).',
        'Adjetivos de tamaño/calidad: groß (grande), klein (pequeño), alt (viejo/antiguo), neu (nuevo), billig (barato), teuer (caro), einfach (fácil), schwer/schwierig (difícil), schnell (rápido), langsam (lento).',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Adjetivos predicativos: invariables tras sein/werden/bleiben.',
    graphicPrompt: 'Tabla mostrando el mismo adjetivo con los tres géneros para demostrar invariabilidad.',
    scene: [
      ['Der Film ist gut.', 'La película es buena. (masc, sin -er)'],
      ['Die Musik ist gut.', 'La música es buena. (fem, sin -e)'],
      ['Das Buch ist gut.', 'El libro es bueno. (neut, sin -es)'],
      ['Die Bücher sind gut.', 'Los libros son buenos. (pl, sin cambio)'],
      ['Das Wetter ist schön.', 'El tiempo está bonito.'],
      ['Ich bin müde.', 'Estoy cansado/a.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['invariable tras sein', 'mismo adjetivo todos los géneros', 'sein/werden/bleiben'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Elige el adjetivo correcto para completar la frase.',
        type: 'choice',
        items: [
          {
            scene: 'Carlos opina sobre el curso de WeLearn',
            lines: [['Carlos', 'Der Kurs ist ___. (interesante)']],
            options: ['interessant', 'interessante', 'interessanter', 'interessantem'],
            answer: 'interessant',
            explain: 'Predicativo tras "ist": nunca añade terminación. "interessant" es invariable.',
          },
          {
            scene: 'Sofía habla del tiempo',
            lines: [['Sofía', 'Das Wetter ist heute ___. (bonito)']],
            options: ['schön', 'schöne', 'schöner', 'schönem'],
            answer: 'schön',
            explain: '"Schön" después de "ist" = predicativo. Sin declinación.',
          },
          {
            scene: 'Lina está muy bien',
            lines: [['Lina', 'Ich bin sehr ___. (sana/en forma)']],
            options: ['fit', 'fite', 'fiter', 'fitem'],
            answer: 'fit',
            explain: 'Predicativo con "bin": "fit" invariable.',
          },
          {
            scene: 'Marco describe la comida del restaurante',
            lines: [['Marco', 'Das Essen ist ___! (rico/delicioso)']],
            options: ['lecker', 'leckere', 'leckerer', 'leckerem'],
            answer: 'lecker',
            explain: '"Lecker" después de "ist" = predicativo. Sin terminación extra.',
          },
          {
            scene: 'David habla de una nueva estudiante',
            lines: [['David', 'Die neue Studentin ist sehr ___. (inteligente)']],
            options: ['klug', 'kluge', 'kluger', 'kluges'],
            answer: 'klug',
            explain: 'Género femenino pero predicativo: "klug" no cambia. Die Studentin ist klug.',
          },
          {
            scene: 'Ana comenta sobre el libro de gramática',
            lines: [['Ana', 'Das Buch ist manchmal ___. (difícil)']],
            options: ['schwer', 'schwere', 'schwerer', 'schwerem'],
            answer: 'schwer',
            explain: 'Neutro pero predicativo: "schwer" no añade -es. Das Buch ist schwer.',
          },
          {
            scene: 'Carlos explica cómo se siente',
            lines: [['Carlos', 'Ich bin heute sehr ___. (cansado)']],
            options: ['müde', 'müden', 'müder', 'müdem'],
            answer: 'müde',
            explain: '"Müde" predicativo con "bin". (Nota: müde ya termina en -e, pero es la forma base.)',
          },
          {
            scene: 'Lina habla del precio',
            lines: [['Lina', 'Das Restaurant ist ___. (caro)']],
            options: ['teuer', 'teure', 'teurer', 'teurem'],
            answer: 'teuer',
            explain: 'Predicativo: "teuer" invariable. (Nota: en atributivo sería "teures" — pero eso es A2.)',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Sujeto y adjetivo',
        tag: '2 espacios',
        intro: 'Completa con el artículo del sujeto y el adjetivo predicativo.',
        type: 'dual',
        items: [
          {
            scene: 'Zhanna describe la clase de hoy',
            lines: [['Zhanna', '[[0]] Unterricht heute ist sehr [[1]]. (la clase, interesante)']],
            blanks: [
              { options: ['Der', 'Die', 'Das', 'Ein'], answer: 'Der', explain: '"Unterricht" = masculino → "der Unterricht".' },
              { options: ['interessant', 'interessante', 'interessanter', 'interessanten'], answer: 'interessant', explain: 'Predicativo: "interessant" sin terminación, independientemente del género.' },
            ],
          },
          {
            scene: 'Sofía describe su habitación',
            lines: [['Sofía', '[[0]] Zimmer ist sehr [[1]]. (la habitación, pequeña)']],
            blanks: [
              { options: ['Das', 'Der', 'Die', 'Ein'], answer: 'Das', explain: '"Zimmer" = neutro → "das Zimmer".' },
              { options: ['klein', 'kleine', 'kleines', 'kleinen'], answer: 'klein', explain: 'Predicativo: "klein" sin terminación. Das Zimmer ist klein.' },
            ],
          },
          {
            scene: 'Marco prueba el café',
            lines: [['Marco', '[[0]] Kaffee ist heute sehr [[1]]. (el café, fuerte)']],
            blanks: [
              { options: ['Der', 'Die', 'Das', 'Ein'], answer: 'Der', explain: '"Kaffee" = masculino → "der Kaffee".' },
              { options: ['stark', 'starke', 'starker', 'starkem'], answer: 'stark', explain: 'Predicativo: "stark" invariable. Der Kaffee ist stark.' },
            ],
          },
          {
            scene: 'Carlos habla de sus notas',
            lines: [['Carlos', '[[0]] Noten sind sehr [[1]]. (las notas, buenas)']],
            blanks: [
              { options: ['Die', 'Der', 'Das', 'Eine'], answer: 'Die', explain: '"Noten" = plural → "die Noten".' },
              { options: ['gut', 'gute', 'gutes', 'guten'], answer: 'gut', explain: 'Predicativo plural: "gut" sin terminación. Die Noten sind gut.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el texto con los adjetivos correctos en forma predicativa.',
        type: 'guidedText',
        scene: 'Carlos escribe un email sobre su primer día en WeLearn.',
        text: 'Heute war mein erster Tag bei WeLearn. Die Akademie ist sehr [[0]] (schön). Der Unterricht ist [[1]] (interessant). Die Lehrerin Zhanna ist sehr [[2]] (kompetent). Das Gebäude ist [[3]] (groß) und [[4]] (modern). Ich bin sehr [[5]] (glücklich) hier. Die anderen Studenten sind auch sehr [[6]] (nett).',
        blanks: [
          { options: ['schön', 'schöne', 'schöner', 'schönem'], answer: 'schön', explain: 'Predicativo tras "ist": "schön" invariable.' },
          { options: ['interessant', 'interessante', 'interessanter', 'interessanten'], answer: 'interessant', explain: 'Predicativo: "interessant" sin terminación.' },
          { options: ['kompetent', 'kompetente', 'kompetenter', 'kompetentem'], answer: 'kompetent', explain: 'Predicativo: "kompetent" invariable. Zhanna ist kompetent.' },
          { options: ['groß', 'große', 'großer', 'großem'], answer: 'groß', explain: 'Das Gebäude ist groß — neutro pero predicativo, sin cambio.' },
          { options: ['modern', 'moderne', 'moderner', 'modernem'], answer: 'modern', explain: 'Dos adjetivos predicativos coordinados: "groß und modern".' },
          { options: ['glücklich', 'glückliche', 'glücklicher', 'glücklichem'], answer: 'glücklich', explain: 'Predicativo con "bin": "ich bin glücklich".' },
          { options: ['nett', 'nette', 'netter', 'nettem'], answer: 'nett', explain: 'Plural pero predicativo: "die Studenten sind nett".' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe el adjetivo predicativo correcto.',
        type: 'freeText',
        scene: 'Lina describe su semana.',
        text: 'Montag ist sehr [[0]] (anstrengend = agotador). Der Unterricht ist [[1]] (lang = largo). Die Hausaufgaben sind [[2]] (schwierig = difícil). Aber das Wochenende ist [[3]] (toll = genial). Ich bin dann immer sehr [[4]] (entspannt = relajada).',
        blanks: [
          { answer: 'anstrengend', accepted: ['anstrengend'], explain: 'Predicativo: "anstrengend" sin terminación.' },
          { answer: 'lang', accepted: ['lang'], explain: '"Der Unterricht ist lang" — predicativo masculino sin cambio.' },
          { answer: 'schwierig', accepted: ['schwierig'], explain: '"Die Hausaufgaben sind schwierig" — plural predicativo, invariable.' },
          { answer: 'toll', accepted: ['toll'], explain: '"Das Wochenende ist toll" — neutro predicativo, sin -es.' },
          { answer: 'entspannt', accepted: ['entspannt'], explain: '"Ich bin entspannt" — predicativo con "bin", invariable.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Describe usando adjetivos predicativos.',
        type: 'write',
        items: [
          {
            scene: 'Describe tu ciudad',
            prompt: 'Di 3 cosas sobre tu ciudad usando "(Die/Der/Das) ... ist ..." con adjetivos predicativos.',
            answer: 'Meine Stadt ist groß. Das Wetter ist oft schön. Die Menschen sind sehr nett.',
            accepted: ['ist groß', 'ist schön', 'ist nett', 'ist interessant', 'ist klein', 'ist laut', 'ist ruhig', 'sind'],
            explain: 'Recuerda: predicativo = después de "ist/sind", sin terminación. Die Stadt ist schön (no schöne).',
          },
          {
            scene: 'Describe cómo te sientes hoy',
            prompt: 'Di cómo estás hoy usando "Ich bin..." con 2 adjetivos.',
            answer: 'Ich bin heute müde aber glücklich.',
            accepted: ['ich bin', 'bin müde', 'bin glücklich', 'bin fit', 'bin krank', 'bin traurig', 'bin nervös'],
            explain: 'Adjetivos de estado con "sein": müde, fit, krank, glücklich, traurig, nervös, entspannt.',
          },
          {
            scene: 'Opina sobre el aprendizaje del alemán',
            prompt: 'Da tu opinión sobre el alemán: ¿Es difícil? ¿Interesante? ¿Bonito?',
            answer: 'Deutsch ist schwer, aber sehr interessant. Die Grammatik ist manchmal kompliziert.',
            accepted: ['ist schwer', 'ist interessant', 'ist schön', 'ist schwierig', 'ist kompliziert', 'ist toll', 'ist gut'],
            explain: 'Predicativo: "Deutsch ist schwer" — no "schweres". La invariabilidad es la regla.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Escribe un párrafo descriptivo usando 5 adjetivos predicativos distintos.',
        type: 'write',
        items: [
          {
            scene: 'Describe tu lugar favorito',
            prompt: 'Describe tu lugar favorito (ciudad, café, parque...) con al menos 4 adjetivos predicativos.',
            answer: 'Mein Lieblingscafé ist klein, gemütlich und ruhig. Der Kaffee ist sehr gut und der Preis ist günstig.',
            accepted: ['ist klein', 'ist schön', 'ist groß', 'ist ruhig', 'ist gemütlich', 'ist laut', 'ist gut', 'ist billig', 'ist teuer', 'sind'],
            explain: 'Adjetivos predicativos: klein, schön, groß, ruhig, gemütlich, laut, gut, billig, teuer — todos invariables tras "ist/sind".',
          },
          {
            scene: 'Una comparación entre dos cosas',
            prompt: 'Compara dos cosas usando adjetivos predicativos. Ejemplo: El alemán y el español.',
            answer: 'Deutsch ist schwer aber interessant. Spanisch ist einfacher aber auch schön. Beide Sprachen sind wichtig.',
            accepted: ['ist schwer', 'ist interessant', 'ist schön', 'ist einfach', 'sind wichtig', 'ist gut'],
            explain: 'Predicativo con todos los géneros: siempre la misma forma. Comparativo en A1 es opcional.',
          },
          {
            scene: 'Un día perfecto vs. un día difícil',
            prompt: 'Describe tu día perfecto y tu día más difícil usando "sein" + adjetivos predicativos.',
            answer: 'Ein perfekter Tag: Das Wetter ist schön, ich bin fit und das Essen ist lecker. Ein schwieriger Tag: Ich bin müde, der Kurs ist lang und die Hausaufgaben sind schwer.',
            accepted: ['ist schön', 'bin fit', 'ist lecker', 'bin müde', 'ist lang', 'sind schwer', 'ist toll', 'ist stressig'],
            explain: 'Combina sujetos de todos los géneros. El adjetivo nunca cambia en uso predicativo.',
          },
        ],
      },
    ],
  },
}

export default topic
