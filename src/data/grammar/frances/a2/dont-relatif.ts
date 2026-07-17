import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'dont-relatif',
  order: '14',
  color: '#1a2ecc',
  category: 'Pronombres',
  level: 'A2',
  title: 'Pronombres relativos en francés A2: qui, que, où, dont',
  shortTitle: 'Relativos qui/que/où/dont',
  metaTitle: 'Pronombres relativos francés A2 — qui, que, où, dont, pronoms relatifs',
  description:
    'Los pronombres relativos en francés conectan una oración subordinada con un antecedente. Qui reemplaza el sujeto (persona o cosa). Que/qu\' reemplaza el complemento directo (COD). Où reemplaza un complemento de lugar o tiempo. Dont reemplaza un complemento introducido por de (de qui/de quoi/duquel). La elección depende de la función gramatical del antecedente en la cláusula relativa.',
  lead: 'Le livre que je lis / l\'ami dont je parle: los cuatro relativos esenciales del francés A2.',
  outcomes: [
    'Usar qui para el sujeto de la relativa',
    'Usar que/qu\' para el COD de la relativa',
    'Usar où para lugar o tiempo',
    'Usar dont para complementos con de',
  ],

  guide: {
    goal: 'Conectar oraciones con qui, que, où y dont según la función gramatical.',
    model: 'C\'est un film qui m\'a beaucoup touché. (Es una película que me emocionó mucho.) / C\'est le livre dont je t\'ai parlé. (Es el libro del que te hablé.)',
    formula: 'qui = sujeto | que = COD | où = lieu/temps | dont = de + N',
    decisions: [
      'qui (sujet): "La femme qui parle est ma voisine" = la que habla',
      'que/qu\' (COD): "Le film que j\'ai vu hier" = el que vi; qu\' devant voyelle',
      'où (lieu): "La ville où j\'habite s\'appelle Lyon" = donde vivo',
      'où (temps): "Le jour où on s\'est rencontrés" = el día en que',
      'dont (de+N): "Le livre dont j\'ai besoin" = de quoi j\'ai besoin → dont',
    ],
    table: [
      ['Relatif', 'Fonction', 'Exemple'],
      ['qui', 'sujeto de la relativa', 'L\'homme qui parle est mon ami'],
      ['que / qu\'', 'COD de la relativa', 'Le livre que tu m\'as donné'],
      ['où', 'lugar o tiempo', 'La ville où je vis / Le soir où...'],
    ],
    mistakes: [
      '"L\'ami que parle" ❌ → "L\'ami qui parle" ✓ — qui = sujeto; que = COD.',
      '"Le film qui j\'ai vu" ❌ → "Le film que j\'ai vu" ✓ — el film es COD del verbo voir.',
      '"Le prof dont je parle" ✓ = parler de → dont reemplaza de + N completo.',
    ],
  },

  seo: [
    {
      heading: 'Qui y que: la diferencia clave',
      paragraphs: [
        'La confusión más frecuente es entre qui y que. La clave es la función del pronombre en la oración relativa: si es el sujeto del verbo relativo (quien hace la acción), se usa qui: "Le garçon qui joue" (el chico que juega — qui es el sujeto de joue). Si es el complemento directo (COD), se usa que/qu\': "Le film que j\'ai vu" (la película que vi — que es el COD de ai vu).',
        'Truco: si después del relativo viene directamente un verbo conjugado con sujeto propio → que. Si viene el verbo sin sujeto expresado → qui. "Le chat que tu vois" (tu = sujeto → que) vs "Le chat qui dort" (qui = sujeto → qui).',
      ],
    },
    {
      heading: 'Dont: reemplazar de + sustantivo',
      paragraphs: [
        'Dont se usa cuando el verbo de la relativa exige la preposición de (avoir besoin de, parler de, se souvenir de, être content de, etc.): "Le livre dont j\'ai besoin" = j\'ai besoin du livre → dont. "L\'ami dont je parle" = je parle de mon ami → dont. También para complementos del nombre con de: "La femme dont j\'admire le travail" (cuyo trabajo admiro).',
        'Où reemplaza un complemento de lugar (la ciudad, la casa, el barrio donde...) o un momento en el tiempo: "La ville où j\'habite" / "L\'année où tu es né" / "Le café où on se retrouve toujours".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'qui = sujeto | que = COD | où = lugar/tiempo | dont = de+N.',
    graphicPrompt: 'Cuatro caminos etiquetados: qui/que/où/dont con ejemplos visuales.',
    scene: [
      ['La personne qui t\'a appelé est ma sœur.', 'La persona que te llamó es mi hermana.'],
      ['Le film que nous avons vu était fantastique.', 'La película que vimos era fantástica.'],
      ['La ville où je suis né est très belle.', 'La ciudad donde nací es muy bonita.'],
      ['Le livre dont tu m\'as parlé est épuisé.', 'El libro del que me hablaste está agotado.'],
      ['C\'est le jour où tout a changé.', 'Es el día en que todo cambió.'],
      ['J\'ai un ami dont la maison est à la montagne.', 'Tengo un amigo cuya casa está en la montaña.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['qui = sujeto', 'que = COD', 'où = lieu/temps', 'dont = de+N'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el pronombre relativo correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona qui, que, où o dont según la función.',
        type: 'choice',
        items: [
          {
            scene: 'La fille ___ parle anglais est ma cousine.',
            lines: [['', 'La fille ___ parle anglais est ma cousine.']],
            options: ['qui', 'que', 'dont', 'où'],
            answer: 'qui',
            explain: '"qui parle" — qui es el SUJETO de parle. La fille qui... = la chica que habla.',
          },
          {
            scene: 'Le livre ___ je lis est très long.',
            lines: [['', 'Le livre ___ je lis est très long.']],
            options: ['que', 'qui', 'dont', 'où'],
            answer: 'que',
            explain: '"que je lis" — que es el COD de lis (je = sujeto). Le livre que = el libro que leo.',
          },
          {
            scene: 'C\'est la ville ___ je suis née.',
            lines: [['', 'C\'est la ville ___ je suis née.']],
            options: ['où', 'que', 'qui', 'dont'],
            answer: 'où',
            explain: '"la ville où" — où reemplaza un complemento de lugar (dans la ville).',
          },
          {
            scene: 'C\'est le film ___ tout le monde parle.',
            lines: [['', 'C\'est le film ___ tout le monde parle.']],
            options: ['dont', 'que', 'qui', 'où'],
            answer: 'dont',
            explain: '"parler de" → dont. Le film dont tout le monde parle = du film → dont.',
          },
          {
            scene: 'L\'ami ___ m\'a aidé est très gentil.',
            lines: [['', 'L\'ami ___ m\'a aidé est très gentil.']],
            options: ['qui', 'que', 'dont', 'où'],
            answer: 'qui',
            explain: '"qui m\'a aidé" — qui es el SUJETO de a aidé. L\'ami qui... = el amigo que me ayudó.',
          },
          {
            scene: 'C\'est l\'été ___ j\'ai connu ma femme.',
            lines: [['', 'C\'est l\'été ___ j\'ai connu ma femme.']],
            options: ['où', 'que', 'qui', 'dont'],
            answer: 'où',
            explain: '"l\'été où" — où también reemplaza un complemento de TIEMPO (pendant l\'été).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos relativos en una descripción',
        tag: '2 espacios',
        intro: 'Completa con los dos pronombres relativos correctos.',
        type: 'dual',
        items: [
          {
            scene: 'Describe un libro: el sujeto que te lo recomendó y el COD que leíste.',
            lines: [['', 'Le livre [[0]] tu m\'as recommandé est le même [[1]] j\'ai acheté hier.']],
            blanks: [
              { options: ['que', 'qui', 'dont', 'où'], answer: 'que', explain: '"que tu m\'as recommandé" — tu = sujeto → que = COD.' },
              { options: ['que', 'qui', 'dont', 'où'], answer: 'que', explain: '"que j\'ai acheté" — j\' = sujeto → que = COD.' },
            ],
          },
          {
            scene: 'Describe un café: donde vas y del que hablas.',
            lines: [['', 'Le café [[0]] je vais souvent est le même [[1]] je t\'ai parlé.']],
            blanks: [
              { options: ['où', 'que', 'qui', 'dont'], answer: 'où', explain: '"le café où je vais" — lieu → où.' },
              { options: ['dont', 'que', 'qui', 'où'], answer: 'dont', explain: '"dont je t\'ai parlé" — parler de → dont.' },
            ],
          },
          {
            scene: 'Describe una persona: que hace algo y de quien hablas.',
            lines: [['', 'La collègue [[0]] travaille avec moi est la même [[1]] je t\'ai parlé.']],
            blanks: [
              { options: ['qui', 'que', 'dont', 'où'], answer: 'qui', explain: '"qui travaille" — sujeto de travaille → qui.' },
              { options: ['dont', 'que', 'qui', 'où'], answer: 'dont', explain: '"dont je t\'ai parlé" — parler de → dont.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Descripción de un viaje',
        tag: 'Texto guiado',
        intro: 'Completa el texto con qui, que, où o dont.',
        type: 'guidedText',
        scene: 'Marie décrit son voyage au Portugal.',
        text: 'Je suis allée à Lisbonne, une ville [[0]] j\'adore. C\'est une ville [[1]] a beaucoup de collines. Le quartier [[2]] j\'ai dormi s\'appelle l\'Alfama. Les gens [[1]] j\'ai rencontrés étaient très sympas. Le restaurant [[0]] je t\'avais parlé était délicieux. Et le jour [[2]] on a visité Sintra était magnifique.',
        blanks: [
          { options: ['que', 'qui', 'dont', 'où'], answer: 'que', explain: '"que j\'adore / que je t\'avais parlé → dont" — COD de adore. Nota: \'dont\' va en la 5ª oración.' },
          { options: ['qui', 'que', 'dont', 'où'], answer: 'qui', explain: '"qui a / qui j\'ai rencontrés → que" — sujeto de a. Nota: \'que\' para rencontrer.' },
          { options: ['où', 'que', 'qui', 'dont'], answer: 'où', explain: '"où j\'ai dormi / où on a visité" — lieu y tiempo → où.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Rellena el relativo correcto',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe qui, que, qu\', où o dont.',
        type: 'freeText',
        scene: 'Complétez avec le bon pronom relatif.',
        text: 'C\'est la chanson ___ j\'ai entendue à la radio. / L\'homme ___ m\'a aidé était très sympa. / C\'est la raison ___ je suis venu. / Le film ___ tu as besoin est ici.',
        blanks: [
          { answer: "qu'", explain: '"que/qu\'" — COD de ai entendue (j\' = sujeto). Devant voyelle → qu\'.' },
          { answer: 'qui', explain: '"qui m\'a aidé" — sujeto de a aidé.' },
          { answer: 'pour laquelle', explain: '"la raison pour laquelle" — strictement; en A2 se acepta aussi "pour laquelle" o "pourquoi". (dont no se usa con raison + de).' },
          { answer: 'dont', explain: '"avoir besoin de" → dont. Le film dont tu as besoin.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Une les dos frases con un relativo',
        tag: 'Escritura guiada',
        intro: 'Combina las dos frases usando el pronombre relativo correcto.',
        type: 'write',
        items: [
          {
            scene: 'J\'ai un ami. Il parle cinq langues.',
            prompt: 'Une avec qui.',
            answer: 'J\'ai un ami qui parle cinq langues.',
            accepted: ['Mon ami qui parle cinq langues est interprète.'],
            explain: '"qui parle" — el amigo es el sujeto de parle → qui.',
          },
          {
            scene: 'C\'est un film. J\'ai adoré ce film.',
            prompt: 'Une avec que.',
            answer: 'C\'est un film que j\'ai adoré.',
            accepted: ['Le film que j\'ai adoré s\'appelle Amélie.'],
            explain: '"que j\'ai adoré" — el film es el COD de ai adoré (j\' = sujeto) → que.',
          },
          {
            scene: 'C\'est un café. Je parle souvent de ce café.',
            prompt: 'Une con dont.',
            answer: 'C\'est le café dont je parle souvent.',
            accepted: ['C\'est le café dont tout le monde parle.'],
            explain: '"parler de" → dont. C\'est le café dont je parle (de ce café).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe tu lugar favorito y personas importantes',
        tag: 'Escritura libre',
        intro: 'Escribe usando los cuatro pronombres relativos: qui, que, où, dont.',
        type: 'write',
        items: [
          {
            scene: 'Describe tu lugar favorito en tu ciudad.',
            prompt: 'Utilisez qui, que, où et dont pour décrire un lieu.',
            answer: 'J\'adore le parc qui se trouve près de chez moi. C\'est un endroit que je visite tous les week-ends. C\'est un quartier où il y a beaucoup de cafés. C\'est aussi le lieu dont je parle toujours à mes amis.',
            accepted: ['Il y a un restaurant que j\'aime beaucoup. C\'est un chef qui cuisine très bien. C\'est le restaurant dont ma famille parle tout le temps.'],
            explain: 'qui (sujeto) / que (COD) / où (lugar) / dont (de + sustantivo).',
          },
          {
            scene: 'Describe a una persona importante para ti.',
            prompt: 'Utilisez au moins 3 pronoms relatifs pour décrire cette personne.',
            answer: 'J\'ai un ami qui m\'a beaucoup aidé dans la vie. C\'est quelqu\'un que je connais depuis l\'enfance. Il habite dans la ville où j\'ai grandi. C\'est l\'ami dont je suis le plus fier.',
            accepted: ['Ma professeure est une femme qui enseigne avec passion. Elle m\'a donné un livre que j\'ai lu trois fois. C\'est la prof dont je me souviens toujours.'],
            explain: 'qui (sujeto) / que (COD) / où (lugar) / dont (dont je suis fier = être fier de).',
          },
        ],
      },
    ],
  },
}

export default topic
