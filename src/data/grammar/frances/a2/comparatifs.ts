import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'comparatifs',
  order: '07',
  color: '#1a2ecc',
  category: 'Comparación',
  level: 'A2',
  title: 'Comparativos en francés A2: plus, moins, aussi... que',
  shortTitle: 'Comparativos',
  metaTitle: 'Comparativos en francés A2 — plus que, moins que, aussi que, comparar',
  description:
    'En francés, la comparación de adjetivos y adverbios usa plus... que (más... que), moins... que (menos... que) y aussi... que (tan... como). Los sustantivos se comparan con plus de / moins de / autant de. Los verbos con plus que / moins que / autant que. Hay formas irregulares: bon → meilleur, bien → mieux, mauvais → pire/plus mauvais.',
  lead: 'Paris est plus grand que Lyon: los comparativos en francés con plus, moins y aussi.',
  outcomes: [
    'Usar plus/moins/aussi + adj/adv + que para comparar',
    'Comparar sustantivos con plus de/moins de/autant de',
    'Usar las formas irregulares meilleur, mieux, pire',
    'Construir frases comparativas completas',
  ],

  guide: {
    goal: 'Comparar personas, cosas y acciones usando plus, moins y aussi en francés.',
    model: 'Paris est plus grand que Lyon. (París es más grande que Lyon.) / Il parle aussi bien que moi. (Habla tan bien como yo.)',
    formula: 'plus/moins/aussi + adj/adv + que | plus de/moins de/autant de + N + que',
    decisions: [
      'Adj/adv: plus intelligent que, moins rapide que, aussi sympa que',
      'N (cantidad): plus de temps que, moins de livres que, autant d\'argent que',
      'Verbe: travailler plus que, dormir moins que, manger autant que',
      'Irréguliers: bon → meilleur(e) que (mejor que), bien → mieux que (mejor que), mauvais → pire que (peor que)',
      'Attention: "plus bon" ❌ → "meilleur" ✓; "plus bien" ❌ → "mieux" ✓',
    ],
    table: [
      ['Comparación', 'Estructura', 'Ejemplo'],
      ['Superioridad', 'plus + adj/adv + que', 'Elle est plus grande que lui'],
      ['Inferioridad', 'moins + adj/adv + que', 'Ce film est moins long que l\'autre'],
      ['Igualdad', 'aussi + adj/adv + que', 'Il est aussi gentil que toi'],
    ],
    mistakes: [
      '"plus bon" ❌ → "meilleur" ✓ — bon y bien tienen formas comparativas irregulares.',
      '"aussi grand comme" ❌ → "aussi grand que" ✓ — siempre que, nunca comme con comparativos.',
      '"plus de + adj" ❌ → "plus + adj" ✓ — de solo con sustantivos: plus de livres.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forman los comparativos en francés?',
      paragraphs: [
        'En francés, para comparar adjetivos y adverbios se usan tres formas: plus (más), moins (menos) y aussi (tan). Siempre van seguidos de que: "Cette ville est plus propre que l\'autre" (esta ciudad es más limpia que la otra), "Il parle moins vite que toi" (habla menos rápido que tú).',
        'Los adjetivos concuerdan con el sustantivo normalmente: "Elle est plus intelligente que lui". Los adverbios no cambian: "Il travaille aussi sérieusement qu\'elle" (trabaja tan seriamente como ella). Antes de una vocal, que se convierte en qu\'.',
      ],
    },
    {
      heading: '¿Cuáles son los comparativos irregulares en francés?',
      paragraphs: [
        'Las formas irregulares son esenciales: bon (bueno) → meilleur(e)(s) que (mejor que); bien (bien) → mieux que (mejor que). La confusión más común es entre meilleur y mieux: meilleur es adjetivo (concuerda con el nombre), mieux es adverbio.',
        '"Ce restaurant est meilleur que l\'autre" (adjetivo, describe el restaurante) vs "Il cuisine mieux que moi" (adverbio, describe la acción de cocinar). Para mauvais: pire que o plus mauvais que (ambos posibles).',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre "meilleur" y "mieux" en francés?',
      paragraphs: [
        'Meilleur es el comparativo de bon (adjetivo): acompaña a un sustantivo y significa "mejor" en el sentido de cualidad — "un meilleur livre", "une meilleure idée". Mieux es el comparativo de bien (adverbio): modifica a un verbo y significa "mejor" en el sentido de manera — "il chante mieux", "ça va mieux". El error típico del hispanohablante es que en español "mejor" cubre ambos; en francés hay que elegir según lo que se califica: cosa o persona → meilleur; acción → mieux. En el lado negativo, el par equivalente es pire (adjetivo, "peor") y plus mal / pis (adverbio).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'plus/moins/aussi + adj + que. Irregulares: meilleur/mieux/pire.',
    graphicPrompt: 'Balanza comparando dos elementos con plus y moins.',
    scene: [
      ['Paris est plus grand que Lyon.', 'París es más grande que Lyon.'],
      ['Ce livre est moins cher que l\'autre.', 'Este libro es menos caro que el otro.'],
      ['Elle est aussi intelligente que lui.', 'Ella es tan inteligente como él.'],
      ['Ce restaurant est meilleur que l\'autre.', 'Este restaurante es mejor que el otro.'],
      ['Il parle mieux le français que moi.', 'Habla mejor el francés que yo.'],
      ['J\'ai autant de travail que toi.', 'Tengo tanto trabajo como tú.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['plus/moins/aussi + adj + que', 'plus de/moins de/autant de + N', 'meilleur/mieux/pire'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el comparativo correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona plus, moins o aussi según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'París es más grande que Burdeos.',
            lines: [['', 'Paris est ___ grand que Bordeaux.']],
            options: ['plus', 'moins', 'aussi', 'meilleur'],
            answer: 'plus',
            explain: '"plus grand que" = más grande que. Comparativo de superioridad.',
          },
          {
            scene: 'Este ejercicio es tan difícil como el anterior.',
            lines: [['', 'Cet exercice est ___ difficile que le précédent.']],
            options: ['aussi', 'plus', 'moins', 'autant'],
            answer: 'aussi',
            explain: '"aussi difficile que" = tan difícil como. Comparativo de igualdad.',
          },
          {
            scene: 'Esta película es menos interesante que el libro.',
            lines: [['', 'Ce film est ___ intéressant que le livre.']],
            options: ['moins', 'plus', 'aussi', 'meilleur'],
            answer: 'moins',
            explain: '"moins intéressant que" = menos interesante que. Comparativo de inferioridad.',
          },
          {
            scene: 'Este restaurante es mejor que el otro (bon → ?).',
            lines: [['', 'Ce restaurant est ___ que l\'autre.']],
            options: ['meilleur', 'plus bon', 'mieux', 'aussi bon'],
            answer: 'meilleur',
            explain: '"meilleur" = forma comparativa irregular de bon. Nunca "plus bon".',
          },
          {
            scene: 'Ella habla mejor el inglés que yo (bien → ?).',
            lines: [['', 'Elle parle ___ l\'anglais que moi.']],
            options: ['mieux', 'meilleur', 'plus bien', 'aussi bien'],
            answer: 'mieux',
            explain: '"mieux" = forma comparativa irregular de bien (adverbio). Nunca "plus bien".',
          },
          {
            scene: 'Tengo tantos libros como tú.',
            lines: [['', 'J\'ai ___ livres que toi.']],
            options: ['autant de', 'aussi de', 'plus de', 'autant'],
            answer: 'autant de',
            explain: '"autant de livres" = tantos libros como. N (cantidad) → autant de + N + que.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Comparar dos cosas',
        tag: '2 espacios',
        intro: 'Completa la comparación con plus/moins/aussi y el adjetivo.',
        type: 'dual',
        items: [
          {
            scene: 'El metro es más rápido pero menos cómodo que el autobús.',
            lines: [['', 'Le métro est [[0]] rapide mais [[1]] confortable que le bus.']],
            blanks: [
              { options: ['plus', 'moins', 'aussi', 'autant'], answer: 'plus', explain: '"plus rapide que" = más rápido que.' },
              { options: ['moins', 'plus', 'aussi', 'autant'], answer: 'moins', explain: '"moins confortable que" = menos cómodo que.' },
            ],
          },
          {
            scene: 'Este hotel es tan bueno como el anterior pero más caro.',
            lines: [['', 'Cet hôtel est [[0]] que le précédent mais [[1]] cher.']],
            blanks: [
              { options: ['aussi bon', 'meilleur', 'plus bon', 'autant bon'], answer: 'aussi bon', explain: '"aussi bon que" = tan bueno como (bon = adjetivo, aussi).' },
              { options: ['plus', 'moins', 'aussi', 'autant'], answer: 'plus', explain: '"plus cher" = más caro (sin "que" si no hay segundo elemento).' },
            ],
          },
          {
            scene: 'Ella trabaja mejor que yo pero gana menos dinero que su jefa.',
            lines: [['', 'Elle travaille [[0]] que moi mais elle gagne [[1]] argent que sa patronne.']],
            blanks: [
              { options: ['mieux', 'meilleur', 'plus bien', 'aussi bien'], answer: 'mieux', explain: '"mieux que moi" = mejor que yo (adverbio de bien).' },
              { options: ['moins d\'', 'moins de', 'moins', 'autant d\''], answer: "moins d'", explain: '"moins d\'argent que" = menos dinero que. N con vocal → de → d\'.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Comparando ciudades',
        tag: 'Texto guiado',
        intro: 'Completa la comparación de ciudades francesas.',
        type: 'guidedText',
        scene: 'On compare Paris et Marseille.',
        text: 'Paris est [[0]] grande que Marseille. Mais Marseille est [[1]] chère que Paris pour le logement. Le climat de Marseille est [[2]] ensoleillé que celui de Paris. Les deux villes ont [[3]] habitants aujourd\'hui qu\'il y a vingt ans.',
        blanks: [
          { options: ['plus', 'moins', 'aussi', 'autant'], answer: 'plus', explain: '"plus grande que" = más grande que.' },
          { options: ['moins', 'plus', 'aussi', 'autant'], answer: 'moins', explain: '"moins chère que" = menos cara que.' },
          { options: ['plus', 'moins', 'aussi', 'autant'], answer: 'plus', explain: '"plus ensoleillé que" = más soleado que.' },
          { options: ['plus de', 'moins de', 'autant de', 'aussi de'], answer: 'plus de', explain: '"plus de + N" = más + sustantivo.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa el comparativo',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe el comparativo correcto.',
        type: 'freeText',
        scene: 'Complétez avec la forme comparative correcte.',
        text: 'Mon appartement est [[0]] grand que le tien. (más) / Ce café est [[1]] bon que l\'autre. (mejor) / Il lit [[2]] vite que moi. (tan) / Elle a [[3]] temps libre que lui. (menos)',
        blanks: [
          { answer: 'plus', explain: '"plus grand que" = más grande que.' },
          { answer: 'meilleur', explain: '"meilleur que" = mejor que. Irregular de bon.' },
          { answer: 'aussi', explain: '"aussi vite que" = tan rápido como.' },
          { answer: 'moins de', explain: '"moins de temps libre que" = menos tiempo libre que.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye comparaciones',
        tag: 'Escritura guiada',
        intro: 'Escribe la frase comparativa completa.',
        type: 'write',
        items: [
          {
            scene: 'El tren es más rápido que el autobús.',
            prompt: 'le train / rapide / le bus (superioridad)',
            answer: 'Le train est plus rapide que le bus.',
            accepted: ['Le train va plus vite que le bus.'],
            explain: '"plus rapide que" = más rápido que. plus + adj + que.',
          },
          {
            scene: 'Ella cocina mejor que su hermano.',
            prompt: 'elle / cuisiner / son frère (mieux)',
            answer: 'Elle cuisine mieux que son frère.',
            accepted: ['Elle fait mieux la cuisine que son frère.'],
            explain: '"mieux que" = mejor que (adverbio). bien → mieux.',
          },
          {
            scene: 'Tenemos tantos problemas como ellos.',
            prompt: 'nous / avoir / problèmes / eux (igualdad cantidad)',
            answer: 'Nous avons autant de problèmes qu\'eux.',
            accepted: ['On a autant de problèmes qu\'eux.'],
            explain: '"autant de + N + que" = tantos... como. qu\' antes de vocal.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Compara libremente',
        tag: 'Escritura libre',
        intro: 'Escribe 4 frases comparando dos ciudades o países que conoces.',
        type: 'write',
        items: [
          {
            scene: 'Compara dos ciudades que conoces bien.',
            prompt: 'Comparez deux villes avec plus/moins/aussi/meilleur/mieux.',
            answer: 'Madrid est plus grande que Barcelone, mais Barcelone est aussi belle que Madrid. Le temps est meilleur à Barcelone. Il y a autant de touristes dans les deux villes.',
            accepted: ['Paris est plus cher que Lyon. Mais Lyon est aussi animée que Paris. La cuisine est meilleure à Lyon.'],
            explain: 'Usa plus/moins/aussi para adjetivos y meilleur/mieux para las irregulares.',
          },
          {
            scene: 'Compara dos actividades que te gustan.',
            prompt: 'Comparez deux activités avec des comparatifs variés.',
            answer: 'La lecture est moins fatigante que le sport, mais elle est aussi enrichissante. Je lis mieux qu\'avant. Le sport est meilleur pour la santé.',
            accepted: ['Regarder des films est moins cher que d\'aller au cinéma, mais moins agréable aussi.'],
            explain: 'Combina los tres tipos de comparativo y las formas irregulares.',
          },
        ],
      },
    ],
  },
}

export default topic
