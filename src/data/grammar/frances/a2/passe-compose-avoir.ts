import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'passe-compose-avoir',
  order: '01',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'A2',
  title: 'El Passé composé con avoir — acciones completadas en el pasado',
  shortTitle: 'Passé composé (avoir)',
  metaTitle: 'Passé composé avec avoir en français A2 — j\'ai mangé, tu as fini, il a pris',
  description:
    'El passé composé es el tiempo del pasado más usado en francés oral. Con la mayoría de verbos se forma con avoir en presente + participio pasado. Es el equivalente del pretérito perfecto e indefinido del español en la conversación cotidiana.',
  lead: 'J\'ai mangé une pizza hier. Elle a fini son travail. Ils ont pris le train. El passé composé con avoir describe todo lo que ya ocurrió — domínalo y podrás contar tu día en francés.',

  outcomes: [
    'Formar el participio pasado de verbos -er, -ir, -re regulares e irregulares frecuentes.',
    'Conjugar avoir en presente y combinarlo correctamente con el participio pasado.',
    'Usar el passé composé con avoir en frases afirmativas, negativas e interrogativas.',
    'Reconocer los participios pasados irregulares más comunes (fait, pris, vu, bu, dit, écrit).',
  ],

  guide: {
    goal: 'Expresar acciones completadas en el pasado usando avoir + participe passé.',
    model: 'J\'ai mangé une pizza. / Tu as fini l\'exercice. / Il a pris le bus. / Nous avons vu ce film.',
    formula: 'avoir (présent) + participe passé du verbe principal',
    decisions: [
      'Conjugar avoir según el sujeto: ai / as / a / avons / avez / ont',
      'Participio -ER: quitar -er, añadir -é → manger → mangé / parler → parlé',
      'Participio -IR: quitar -ir, añadir -i → finir → fini / choisir → choisi',
      'Participio -RE: quitar -re, añadir -u → vendre → vendu / attendre → attendu',
      'Irregulares frecuentes: faire→fait, prendre→pris, voir→vu, boire→bu, dire→dit, écrire→écrit, mettre→mis, savoir→su',
      'Negación: ne...pas rodea AVOIR: je n\'ai pas mangé (no "j\'ai pas mangé mangé")',
    ],
    table: [
      ['Sujeto', 'avoir', 'Ejemplo (manger)'],
      ['je', 'ai', 'j\'ai mangé'],
      ['tu', 'as', 'tu as mangé'],
      ['il / elle / on', 'a', 'il a mangé'],
      ['nous', 'avons', 'nous avons mangé'],
      ['vous', 'avez', 'vous avez mangé'],
      ['ils / elles', 'ont', 'ils ont mangé'],
    ],
    mistakes: [
      '"J\'ai mangé" ✓ — pero "J\'ai manger" ❌: siempre usa el participio pasado (-é/-i/-u), nunca el infinitivo.',
      '"Je n\'ai pas mangé" ✓ — pero "Je n\'ai mangé pas" ❌: ne...pas rodea avoir, el participio va después.',
      '"Il a faisé" ❌ → "Il a fait" ✓: faire tiene participio irregular fait, no *faisé.',
    ],
  },

  seo: [
    {
      heading: 'El passé composé con avoir: la clave para hablar del pasado en francés',
      paragraphs: [
        'El passé composé es el tiempo pasado más usado en el francés hablado. A diferencia del español, que distingue entre pretérito perfecto (he comido) e indefinido (comí), el francés oral usa casi exclusivamente el passé composé para ambas funciones. J\'ai mangé equivale tanto a "he comido" como a "comí".',
        'La mayoría de verbos franceses forman el passé composé con avoir como auxiliar. La regla es simple: conjugar avoir en presente y añadir el participio pasado del verbo principal. Los verbos -ER son los más regulares: parler → j\'ai parlé, manger → j\'ai mangé, regarder → j\'ai regardé.',
      ],
    },
    {
      heading: 'Los participios pasados irregulares más importantes',
      paragraphs: [
        'Algunos verbos muy frecuentes tienen participios pasados irregulares que debes memorizar. Los más importantes son: faire → fait (j\'ai fait), prendre → pris (j\'ai pris), voir → vu (j\'ai vu), boire → bu (j\'ai bu), dire → dit (j\'ai dit), écrire → écrit (j\'ai écrit), mettre → mis (j\'ai mis), savoir → su (j\'ai su), pouvoir → pu (j\'ai pu), vouloir → voulu (j\'ai voulu).',
        'La negación en el passé composé sigue la regla general: ne y pas rodean el auxiliar avoir. Je n\'ai pas mangé (no he comido / no comí). Tu n\'as pas fini (no has terminado). Elle n\'a pas vu le film (no vio la película). El participio pasado siempre va después de pas.',
      ],
      examples: [
        ['Infinitivo', 'Participio', 'Ejemplo'],
        ['manger', 'mangé', 'j\'ai mangé'],
        ['finir', 'fini', 'tu as fini'],
        ['vendre', 'vendu', 'il a vendu'],
        ['faire', 'fait', 'nous avons fait'],
        ['prendre', 'pris', 'vous avez pris'],
        ['voir', 'vu', 'ils ont vu'],
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Passé composé = avoir (présent) + participe passé. Negación: ne...pas rodea avoir.',
    graphicPrompt: 'Línea de tiempo con una acción terminada: HIER → J\'AI MANGÉ (avoir + participe passé).',
    scene: [
      ['J\'ai mangé une pizza hier soir.', 'Comí una pizza anoche.'],
      ['Tu as fini tes devoirs?', '¿Terminaste tus deberes?'],
      ['Elle a pris le bus ce matin.', 'Ella tomó el autobús esta mañana.'],
      ['Nous n\'avons pas vu ce film.', 'No hemos visto esa película.'],
      ['Ils ont fait un voyage en France.', 'Hicieron un viaje a Francia.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['avoir conjugado + participio', 'participios irregulares', 'negación ne...pas'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocer el passé composé',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de avoir o el participio para completar el passé composé.',
        type: 'choice',
        items: [
          {
            scene: 'Ayer por la noche',
            lines: [['Marie', 'Hier soir, j\'___ mangé une pizza.']],
            options: ['ai', 'as', 'avons', 'ont'],
            answer: 'ai',
            explain: '"Je" → j\'ai + participé passé. Passé composé en 1.ª persona.',
          },
          {
            scene: 'Esta mañana',
            lines: [['Lucas', 'Tu ___ fini tes devoirs?']],
            options: ['as', 'ai', 'avez', 'ont'],
            answer: 'as',
            explain: '"Tu" → tu as + participé passé.',
          },
          {
            scene: 'El fin de semana',
            lines: [['Sofia', 'Elle ___ vu un film super ce week-end.']],
            options: ['a', 'ai', 'avons', 'avez'],
            answer: 'a',
            explain: '"Elle" → elle a + participé passé.',
          },
          {
            scene: 'Las vacaciones',
            lines: [['Ana', 'Nous ___ voyagé en Espagne l\'été dernier.']],
            options: ['avons', 'avez', 'ont', 'ai'],
            answer: 'avons',
            explain: '"Nous" → nous avons + participé passé.',
          },
          {
            scene: 'El examen',
            lines: [['Tomás', 'Vous ___ réussi l\'examen? Félicitations!']],
            options: ['avez', 'avons', 'ont', 'as'],
            answer: 'avez',
            explain: '"Vous" → vous avez + participé passé.',
          },
          {
            scene: 'La reunión',
            lines: [['Prof', 'Ils ___ parlé pendant deux heures.']],
            options: ['ont', 'avons', 'avez', 'a'],
            answer: 'ont',
            explain: '"Ils" → ils ont + participé passé.',
          },
          {
            scene: 'Participio de faire',
            lines: [['Carlos', 'J\'ai ___ mes devoirs hier.']],
            options: ['fait', 'faisé', 'faire', 'faisant'],
            answer: 'fait',
            explain: 'Faire → participio irregular fait. J\'ai fait = "hice" / "he hecho".',
          },
          {
            scene: 'Negación en el pasado',
            lines: [['Laura', 'Je n\'___ pas vu ce film.']],
            options: ['ai', 'as', 'avons', 'ont'],
            answer: 'ai',
            explain: 'Negación: je n\'ai pas + participé passé. ne...pas rodea avoir.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Avoir + participio',
        tag: '2 espacios',
        intro: 'Elige la forma de avoir correcta y el participio pasado correcto.',
        type: 'dual',
        items: [
          {
            scene: 'Anoche',
            lines: [['Paul', 'Hier soir, j\'[[0]] [[1]] un bon restaurant.']],
            blanks: [
              { options: ['ai', 'as', 'avons'], answer: 'ai', explain: '"Je" → ai.' },
              { options: ['trouvé', 'trouver', 'trouvant'], answer: 'trouvé', explain: 'Trouver → participio: trouvé (-er → -é).' },
            ],
          },
          {
            scene: 'Esta semana',
            lines: [['Lucie', 'Cette semaine, nous [[0]] [[1]] beaucoup de travail.']],
            blanks: [
              { options: ['avons', 'avez', 'ont'], answer: 'avons', explain: '"Nous" → avons.' },
              { options: ['fait', 'faisé', 'faire'], answer: 'fait', explain: 'Faire → participio irregular: fait.' },
            ],
          },
          {
            scene: 'Ayer por la tarde',
            lines: [['Marco', 'Hier après-midi, tu [[0]] [[1]] cette série?']],
            blanks: [
              { options: ['as', 'ai', 'avons'], answer: 'as', explain: '"Tu" → as.' },
              { options: ['regardé', 'regarder', 'regardant'], answer: 'regardé', explain: 'Regarder → participio: regardé.' },
            ],
          },
          {
            scene: 'El mes pasado',
            lines: [['Kim', 'Ils [[0]] [[1]] le bus et sont arrivés en retard.']],
            blanks: [
              { options: ['ont', 'avons', 'avez'], answer: 'ont', explain: '"Ils" → ont.' },
              { options: ['pris', 'prendre', 'prenant'], answer: 'pris', explain: 'Prendre → participio irregular: pris.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'El diario de Marie',
        tag: 'Texto guiado',
        intro: 'Completa el diario de Marie eligiendo los participios correctos.',
        type: 'guidedText',
        scene: 'Marie escribe en su diario sobre su día de ayer',
        text: 'Hier, j\'[[0]] commencé ma journée avec un café. J\'[[1]] lu les nouvelles sur mon téléphone. À midi, j\'[[2]] mangé avec mon collègue Paul. On [[3]] parlé de notre projet. L\'après-midi, j\'[[4]] fini un rapport important. Le soir, j\'[[5]] regardé un film et j\'[[6]] bu un verre de vin.',
        blanks: [
          { options: ['ai', 'as', 'avons'], answer: 'ai', explain: '"Je" → j\'ai commencé.' },
          { options: ['ai', 'as', 'ont'], answer: 'ai', explain: '"Je" → j\'ai lu. Lu = participio de lire.' },
          { options: ['ai', 'as', 'a'], answer: 'ai', explain: '"Je" → j\'ai mangé.' },
          { options: ['a', 'ai', 'avons'], answer: 'a', explain: '"On" → on a parlé (como il/elle).' },
          { options: ['ai', 'as', 'ont'], answer: 'ai', explain: '"Je" → j\'ai fini. Fini = participio de finir.' },
          { options: ['ai', 'as', 'avons'], answer: 'ai', explain: '"Je" → j\'ai regardé.' },
          { options: ['ai', 'as', 'ont'], answer: 'ai', explain: '"Je" → j\'ai bu. Bu = participio de boire.' },
        ],
      },
      {
        id: 'l4',
        title: 'Las vacaciones de Pierre',
        tag: 'Texto libre',
        intro: 'Escribe los auxiliares y participios correctos sin ayuda de opciones.',
        type: 'freeText',
        scene: 'Pierre cuenta sus vacaciones a un amigo',
        text: 'Pendant les vacances, j\'[[0]] visité Paris. J\'[[1]] vu la Tour Eiffel et le Louvre. Nous [[2]] mangé dans de bons restaurants. Mes amis [[3]] pris beaucoup de photos. Et toi, tu [[4]] voyagé cet été?',
        blanks: [
          { answer: 'ai', accepted: ['ai'], explain: '"Je" → j\'ai visité.' },
          { answer: 'ai', accepted: ['ai'], explain: '"Je" → j\'ai vu. Vu = participio de voir.' },
          { answer: 'avons', accepted: ['avons'], explain: '"Nous" → nous avons mangé.' },
          { answer: 'ont', accepted: ['ont'], explain: '"Mes amis" (ils) → ils ont pris.' },
          { answer: 'as', accepted: ['as'], explain: '"Tu" → tu as voyagé.' },
        ],
      },
      {
        id: 'l5',
        title: 'Construir frases en passé composé',
        tag: 'Producción guiada',
        intro: 'Escribe la frase completa en passé composé usando avoir.',
        type: 'write',
        items: [
          {
            scene: 'Lo que hizo ayer',
            prompt: 'Escribe: "Ayer comí sushi." (Hier / je / manger / des sushis)',
            answer: 'Hier, j\'ai mangé des sushis.',
            accepted: ['j\'ai mangé des sushis', "j'ai mangé des sushis"],
            explain: 'Hier, j\'ai mangé des sushis. — avoir (ai) + participio (mangé).',
          },
          {
            scene: 'Logro de la semana',
            prompt: 'Escribe: "Terminaron su proyecto." (Ils / finir / leur projet)',
            answer: 'Ils ont fini leur projet.',
            accepted: ['ils ont fini leur projet'],
            explain: 'Ils ont fini leur projet. — avoir (ont) + participio regular (fini).',
          },
          {
            scene: 'Negación',
            prompt: 'Escribe: "No hemos visto esa película." (Nous / ne pas / voir / ce film)',
            answer: 'Nous n\'avons pas vu ce film.',
            accepted: ["nous n'avons pas vu", 'nous n avons pas vu'],
            explain: 'Nous n\'avons pas vu ce film. — ne...pas rodea avons; vu = participio de voir.',
          },
          {
            scene: 'Pregunta sobre el pasado',
            prompt: 'Escribe: "¿Has hecho tus deberes?" (Tu / faire / tes devoirs?)',
            answer: 'Tu as fait tes devoirs?',
            accepted: ['tu as fait tes devoirs', 'est-ce que tu as fait tes devoirs'],
            explain: 'Tu as fait tes devoirs? — avoir (as) + participio irregular (fait).',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Mon week-end en passé composé',
        tag: 'Escritura libre',
        intro: 'Escribe sobre tu fin de semana usando al menos 3 verbos en passé composé con avoir.',
        type: 'write',
        items: [
          {
            scene: 'Tu fin de semana',
            prompt: 'Escribe 2 cosas que hiciste este fin de semana: J\'ai... / Nous avons...',
            answer: 'J\'ai regardé un film. J\'ai mangé avec des amis.',
            accepted: ['j\'ai', "j'ai", 'nous avons', 'j ai'],
            explain: 'J\'ai + participio: mangé, regardé, fait, vu, pris, lu, écouté, joué...',
          },
          {
            scene: 'Lo que no hiciste',
            prompt: 'Escribe 1 cosa que NO hiciste: Je n\'ai pas...',
            answer: 'Je n\'ai pas travaillé ce week-end.',
            accepted: ["je n'ai pas", 'je n ai pas'],
            explain: 'Je n\'ai pas + participio. La negación rodea avoir.',
          },
        ],
      },
    ],
  },
}

export default topic
