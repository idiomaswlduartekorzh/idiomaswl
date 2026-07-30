import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbe-avoir',
  order: '03',
  color: '#0d9488',
  category: 'Verbes',
  level: 'A1',
  title: 'Le Verbe Avoir en Français A1',
  shortTitle: 'Verbe avoir',
  metaTitle: 'Le verbe avoir en français A1 — ai, as, a, avons, avez, ont',
  description:
    'El verbo avoir (tener) es el segundo verbo más importante del francés. Sus formas — ai, as, a, avons, avez, ont — son irregulares. Se usa para posesión, edad (en francés se "tiene" edad, no "se es"), y como auxiliar en los tiempos compuestos.',
  lead: 'Avoir = tener. Aprende las 6 formas irregulares y el truco de la edad: en francés no "eres" mayor — "tienes" años.',
  outcomes: ['Conjuga avoir en presente', 'Usa avoir para posesión y edad', 'Distingue avoir de être'],

  guide: {
    goal: 'Conjugar avoir (tener) en presente de indicativo para expresar posesión, edad y otras expresiones fijas.',
    model: 'J\'ai un chat. / Elle a 25 ans. / Nous avons faim.',
    formula: 'Sujeto + avoir conjugado + complemento',
    decisions: [
      'Avoir = tener (posesión): J\'ai une voiture. / Tu as un chien.',
      'Edad con avoir: Quel âge as-tu ? / J\'ai 20 ans. (NO: "je suis 20 ans")',
      'Expresiones fijas: avoir faim (tener hambre), avoir soif (sed), avoir peur (miedo), avoir raison (razón), avoir tort (equivocarse)',
      'Negación: n\'ai pas, n\'as pas, n\'a pas (liaison!)',
    ],
    table: [
      ['Pronombre', 'Avoir', 'Ejemplo'],
      ['je', 'ai', 'J\'ai un appartement.'],
      ['tu', 'as', 'Tu as un chien ?'],
      ['il / elle / on', 'a', 'Elle a 30 ans.'],
      ['nous', 'avons', 'Nous avons deux enfants.'],
      ['vous', 'avez', 'Vous avez une voiture ?'],
      ['ils / elles', 'ont', 'Ils ont faim.'],
    ],
    mistakes: [
      'La edad: "J\'ai 20 ans" ✓ — NO "Je suis 20 ans" ❌',
      'Je s\'écrit j\' antes de "ai": j\'ai (non "je ai")',
      '"Ils ont" se pronuncia /ilz ɔ̃/ — liaison obligatoria entre "ils" y "ont"',
    ],
  },

  seo: [
    {
      heading: '¿Por qué avoir es tan importante en francés?',
      paragraphs: [
        'Avoir (tener) es el segundo verbo más frecuente del francés, después de être. Se usa para expresar posesión, para hablar de la edad (¡en francés uno "tiene" años, no "es" viejo!), para muchas expresiones idiomáticas fijas, y como auxiliar de los tiempos compuestos (passé composé, plus-que-parfait, etc.).',
        'Dominar avoir es indispensable para el nivel A1 y más allá. Sus formas son irregulares: ai, as, a, avons, avez, ont.',
      ],
    },
    {
      heading: 'Conjugación completa de avoir',
      paragraphs: [
        'J\'ai (yo tengo), tu as (tú tienes), il/elle/on a (él/ella/uno tiene), nous avons (nosotros tenemos), vous avez (vosotros/ustedes tienen), ils/elles ont (ellos/ellas tienen).',
        'Nota la liaison: "ils ont" se pronuncia /ilz ɔ̃/ — la "s" de "ils" se enlaza con la vocal de "ont". Esto es obligatorio.',
      ],
      table: [
        ['Persona', 'Avoir', 'Ejemplo'],
        ['J\'', 'ai', 'J\'ai un vélo.'],
        ['Tu', 'as', 'Tu as des frères ?'],
        ['Il / elle / on', 'a', 'On a le temps.'],
        ['Nous', 'avons', 'Nous avons de la chance.'],
        ['Vous', 'avez', 'Vous avez des enfants ?'],
        ['Ils / elles', 'ont', 'Elles ont raison.'],
      ],
    },
    {
      heading: '¿Cómo se dice la edad en francés?',
      paragraphs: [
        'En español decimos "tengo 25 años" y también "soy joven". En francés, la edad siempre usa avoir: J\'ai 25 ans. / Il a 40 ans. / Quel âge as-tu? (¿Cuántos años tienes?). Nunca se dice "je suis 25 ans".',
        '"Ans" (años) es siempre obligatorio: J\'ai 20 ans ✓, no "J\'ai 20" ❌. Excepto para bebés: "Il a 6 mois" (tiene 6 meses).',
      ],
    },
    {
      heading: '¿Qué expresiones se forman con avoir en francés?',
      paragraphs: [
        'Muchas sensaciones físicas y estados usan avoir en francés, aunque en español usaríamos ser o estar: avoir faim (tener hambre), avoir soif (tener sed), avoir froid (tener frío), avoir chaud (tener calor), avoir peur (tener miedo), avoir sommeil (tener sueño).',
        'También: avoir raison (tener razón), avoir tort (estar equivocado), avoir envie de (tener ganas de), avoir besoin de (tener necesidad de / necesitar).',
      ],
    },
    {
      heading: 'Avoir en negaciones',
      paragraphs: [
        'Negación: ne... pas. "Je" + "ai" → "je n\'ai pas" (elisión de ne). Tu n\'as pas de voiture. / Elle n\'a pas faim. / Ils n\'ont pas d\'enfants.',
        'Nota: después de la negación, el artículo indéfini (un, une, des) y partitif (du, de la) se convierten en "de/d\'": J\'ai un chien → Je n\'ai pas de chien. / J\'ai du temps → Je n\'ai pas de temps.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Avoir: posesión, edad y expresiones idiomáticas fundamentales para A1.',
    graphicPrompt: 'Tabla de avoir con ejemplos de posesión y expresiones comunes.',
    scene: [
      ['j\'ai', 'J\'ai un appartement à Paris.'],
      ['tu as', 'Quel âge as-tu ? / Tu as faim ?'],
      ['il/elle a', 'Elle a 28 ans. / Il a raison.'],
      ['nous avons', 'Nous avons de la chance !'],
      ['vous avez', 'Vous avez des enfants ?'],
      ['ils ont', 'Ils ont soif. / Elles ont peur.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['j\'ai vs je suis', 'edad con avoir', 'expresiones idiomáticas'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de avoir.',
        type: 'choice',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'J\'___ un chien et deux chats.']],
            options: ['ai', 'as', 'a', 'ont'],
            answer: 'ai',
            explain: '"J\'" (= je) → "ai". J\'ai = yo tengo.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Tu ___ quel âge ?']],
            options: ['as', 'ai', 'a', 'avez'],
            answer: 'as',
            explain: '"Tu" → "as". "Quel âge as-tu?" = ¿Cuántos años tienes?',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Elle ___ 25 ans.']],
            options: ['a', 'as', 'ai', 'ont'],
            answer: 'a',
            explain: '"Elle" → "a". La edad siempre con avoir.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Nous ___ deux voitures.']],
            options: ['avons', 'avez', 'ont', 'a'],
            answer: 'avons',
            explain: '"Nous" → "avons".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Vous ___ une grande maison !']],
            options: ['avez', 'avons', 'ont', 'as'],
            answer: 'avez',
            explain: '"Vous" → "avez".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Ils ___ faim — il est 13h00 !']],
            options: ['ont', 'a', 'avez', 'avons'],
            answer: 'ont',
            explain: '"Ils" → "ont". "Avoir faim" = tener hambre.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Je n\'___ pas de voiture.']],
            options: ['ai', 'as', 'a', 'avons'],
            answer: 'ai',
            explain: 'Negación: Je n\'ai pas de... (el artículo "un/une/des" → "de" en negación).',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'On ___ de la chance aujourd\'hui !']],
            options: ['a', 'ai', 'ont', 'avez'],
            answer: 'a',
            explain: '"On" se conjuga como "il/elle" → "a". "Avoir de la chance" = tener suerte.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos decisiones',
        tag: '2 espacios',
        intro: 'Completa avec la forme d\'avoir et l\'expression correcte.',
        type: 'dual',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Je [[0]] [[1]] — je vais manger.']],
            blanks: [
              { options: ['ai', 'as', 'a', 'ont'], answer: 'ai', explain: '"Je" → "ai".' },
              { options: ['faim', 'soif', 'peur', 'froid'], answer: 'faim', explain: '"Avoir faim" = tener hambre. "Je vais manger" (voy a comer) confirma el contexto.' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Tu [[0]] quel [[1]] ?']],
            blanks: [
              { options: ['as', 'ai', 'a', 'avez'], answer: 'as', explain: '"Tu" → "as".' },
              { options: ['âge', 'nom', 'frères', 'chat'], answer: 'âge', explain: '"Quel âge as-tu?" = ¿Cuántos años tienes?' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Nous [[0]] [[1]] amis en commun.']],
            blanks: [
              { options: ['avons', 'avez', 'ont', 'ai'], answer: 'avons', explain: '"Nous" → "avons".' },
              { options: ['des', 'un', 'une', 'de'], answer: 'des', explain: '"Des amis" = unos amigos (artículo indefinido plural).' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Ils [[0]] [[1]] — ils veulent de l\'eau.']],
            blanks: [
              { options: ['ont', 'a', 'avons', 'avez'], answer: 'ont', explain: '"Ils" → "ont".' },
              { options: ['soif', 'faim', 'chaud', 'raison'], answer: 'soif', explain: '"Avoir soif" = tener sed. Quieren agua → sed.' },
            ],
          },
        ],
      },
      {
          id: 'level-3',
          title: 'Completa el texto',
          tag: 'Texto guiado',
          intro: 'Elige la forma correcta de avoir según el sujeto de cada oración.',
          type: 'guidedText',
        scene: 'Elige la forma correcta de avoir según el sujeto de cada oración.',
        text: 'Lucie [[0]] 22 ans. Elle [[1]] un appartement à Bordeaux. Ses parents [[2]] une grande maison à la campagne. Elle [[3]] aussi un petit frère qui [[4]] 15 ans. Lucie et sa colocataire [[5]] un chat qui s\'appelle Minou. Et toi, tu [[6]] des animaux ?',
        blanks: [
          { options: ['a', 'ai', 'as', 'ont'], answer: 'a', explain: '"Lucie" (elle) → "a". Edad: elle a 22 ans.' },
          { options: ['a', 'ai', 'as', 'ont'], answer: 'a', explain: '"Elle" → "a".' },
          { options: ['ont', 'a', 'avons', 'avez'], answer: 'ont', explain: '"Ses parents" (ils) → "ont".' },
          { options: ['a', 'ai', 'ont', 'avez'], answer: 'a', explain: '"Elle" → "a" también para el segundo predicado.' },
          { options: ['a', 'ai', 'ont', 'avez'], answer: 'a', explain: '"Un petit frère" (il) → "a".' },
          { options: ['ont', 'a', 'avons', 'avez'], answer: 'ont', explain: '"Lucie et sa colocataire" (elles) → "ont".' },
          { options: ['as', 'ai', 'a', 'avez'], answer: 'as', explain: '"Tu" → "as". Pregunta sobre posesión.' },
        ],
      },
      {
          id: 'level-4',
          title: 'Escribe sin ayuda',
          tag: 'Texto libre',
          intro: 'Escribe avoir o être en la forma correcta según el contexto.',
          type: 'freeText',
        scene: 'Escribe avoir o être en la forma correcta según el contexto.',
        text: 'Paul [[0]] 35 ans. Il [[1]] médecin. Il [[2]] une belle maison et deux voitures. Sa femme [[3]] avocate. Ils [[4]] trois enfants.',
        blanks: [
          { answer: 'a', accepted: ['a'], explain: '"Paul" → "a". Edad siempre con avoir.' },
          { answer: 'est', accepted: ['est'], explain: 'Profesión → être. "Il est médecin".' },
          { answer: 'a', accepted: ['a'], explain: 'Posesión → avoir. "Il a une belle maison".' },
          { answer: 'est', accepted: ['est'], explain: 'Profesión → être. "Sa femme est avocate".' },
          { answer: 'ont', accepted: ['ont'], explain: '"Ils" → "ont". Posesión: trois enfants.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Écris des phrases avec avoir.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di cuántos años tienes usando "j\'ai...ans".',
            answer: 'J\'ai 25 ans.',
            accepted: ["j'ai", "j'ai "],
            explain: 'Fórmula: J\'ai + número + ans. Ejemplo: J\'ai 30 ans.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di algo que tienes (un animal, objeto, etc.) usando "j\'ai".',
            answer: 'J\'ai un chien.',
            accepted: ["j'ai un", "j'ai une", "j'ai des", "j'ai deux", "j'ai trois"],
            explain: 'Ejemplo: J\'ai une voiture. / J\'ai des amis à Paris. / J\'ai un appartement.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di que tienes hambre o sed usando "avoir faim/soif".',
            answer: 'J\'ai faim — je vais déjeuner.',
            accepted: ["j'ai faim", "j'ai soif", "j'ai froid", "j'ai chaud", "j'ai peur"],
            explain: 'Expresiones: J\'ai faim (hambre), J\'ai soif (sed), J\'ai froid (frío), J\'ai chaud (calor).',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Escribe una frase negativa con avoir: algo que NO tienes.',
            answer: 'Je n\'ai pas de voiture.',
            accepted: ["je n'ai pas", "il n'a pas", "elle n'a pas", "nous n'avons pas"],
            explain: 'Negación: Je n\'ai pas de + sustantivo. El artículo indefinido desaparece.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Misión: Présente-toi en mentionnant ton âge, ce que tu possèdes et une sensation avec avoir.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di tu edad con avoir.',
            answer: 'J\'ai 22 ans.',
            accepted: ["j'ai", "j'ai "],
            explain: 'J\'ai + número + ans. Siempre con avoir, nunca con être.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di algo que posees o que tienes en tu vida (familia, mascotas, objetos).',
            answer: 'J\'ai un appartement à Bogotá et un chat.',
            accepted: ["j'ai", "j'ai un", "j'ai une", "j'ai des", "j'ai deux"],
            explain: 'Ejemplo: J\'ai un frère et une sœur. / J\'ai une voiture. / J\'ai des amis formidables.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Usa una expresión idiomática con avoir (faim, soif, peur, envie de, besoin de...).',
            answer: 'En ce moment, j\'ai envie d\'apprendre le français.',
            accepted: ["j'ai faim", "j'ai soif", "j'ai peur", "j'ai envie", "j'ai besoin", "j'ai sommeil", "j'ai raison"],
            explain: 'Expresiones: avoir faim/soif/peur/froid/chaud/sommeil/raison/tort/envie de/besoin de.',
          },
        ],
      },
    ],
  },
}

export default topic
