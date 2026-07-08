import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'negation-avancee',
  order: '15',
  color: '#1a2ecc',
  category: 'Negación',
  level: 'A2',
  title: 'Negación avanzada en francés A2: ne...plus, jamais, rien, personne, que',
  shortTitle: 'Negación avanzada',
  metaTitle: 'Negación avanzada francés A2 — ne plus, ne jamais, ne rien, ne personne, ne que',
  description:
    'Más allá de ne...pas, el francés tiene varias formas de negación con matices distintos: ne...plus (ya no), ne...jamais (nunca/jamás), ne...rien (nada), ne...personne (nadie), ne...que (solo/solamente). La estructura básica es ne + verbe + 2ª parte. Rien y personne pueden ser sujetos: Rien ne va / Personne ne vient. En lenguaje oral se omite frecuentemente el ne.',
  lead: 'Je ne mange plus de viande / Je n\'ai rien dit: las negaciones compuestas más usadas en francés.',
  outcomes: [
    'Usar ne...plus para "ya no"',
    'Usar ne...jamais para "nunca" y ne...rien para "nada"',
    'Usar ne...personne para "nadie"',
    'Usar ne...que para "solo/solamente"',
  ],

  guide: {
    goal: 'Expresar matices de negación con ne...plus, jamais, rien, personne y que.',
    model: 'Je ne mange plus de viande. (Ya no como carne.) / Il ne dit jamais bonjour. (Nunca dice hola.) / Elle ne connaît personne ici. (No conoce a nadie aquí.)',
    formula: 'ne + verbe + (plus / jamais / rien / personne / que) | rien/personne como sujeto: rien/personne + ne + V',
    decisions: [
      'plus: "Je ne travaille plus là-bas" = ya no trabajo allí',
      'jamais: "Il n\'arrive jamais à l\'heure" = nunca llega a tiempo',
      'rien: "Je n\'ai rien dit" = no dije nada',
      'personne: "Je ne vois personne" = no veo a nadie | "Personne ne vient" = nadie viene (sujeto)',
      'que: "Je n\'ai que 10 euros" = solo tengo 10 euros (restricción)',
    ],
    table: [
      ['Negación', 'Significado', 'Ejemplo'],
      ['ne...plus', 'ya no', 'Je ne fume plus'],
      ['ne...jamais', 'nunca / jamás', 'Il ne mange jamais de poisson'],
      ['ne...rien / ne...personne', 'nada / nadie', 'Je ne vois rien / personne'],
    ],
    mistakes: [
      '"Je ne plus travaille" ❌ → "Je ne travaille plus" ✓ — la 2ª parte va DESPUÉS del verbo.',
      '"Je ne mange pas rien" ❌ → "Je ne mange rien" ✓ — no se combina pas con otra negación.',
      '"Personne ne sait" ✓ (sujeto) vs "Je ne connais personne" ✓ (COD) — dos posiciones.',
    ],
  },

  seo: [
    {
      heading: 'Ne...plus, ne...jamais, ne...rien: usos y posición',
      paragraphs: [
        'Las negaciones compuestas siguen la misma estructura: ne delante del verbo, y la segunda parte detrás: ne...plus (ya no), ne...jamais (nunca), ne...rien (nada), ne...personne (nadie), ne...que (solo). En tiempos compuestos: rien y jamais van entre el auxiliar y el participio: "Il n\'a jamais voyagé", "Je n\'ai rien mangé". Personne va después del participio: "Je n\'ai vu personne".',
        'En lenguaje oral informal, el ne se omite frecuentemente: "Je mange plus de viande", "Je connais personne", "T\'as rien dit". En escritura y lenguaje formal, el ne es obligatorio.',
      ],
    },
    {
      heading: 'Ne...que: restricción, no negación completa',
      paragraphs: [
        'Ne...que no expresa negación total, sino restricción (= seulement): "Je n\'ai que dix euros" = Solo tengo diez euros. "Il ne parle que le français" = Solo habla francés. Que se coloca directamente delante del elemento restringido, no del verbo: "Je ne bois que de l\'eau" (que + de l\'eau, no que + bois).',
        'Rien y personne en posición de sujeto: "Rien ne va dans ce projet" (Nada funciona en este proyecto), "Personne n\'est venu" (Nadie vino). En este caso van delante del ne, antes del verbo.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'ne...plus/jamais/rien/personne/que. Rien/personne como sujeto.',
    graphicPrompt: 'Cruz o tachado sobre diferentes elementos: comida, persona, objeto.',
    scene: [
      ['Je ne fume plus — j\'ai arrêté il y a un an.', 'Ya no fumo — lo dejé hace un año.'],
      ['Elle ne mange jamais de viande rouge.', 'Nunca come carne roja.'],
      ['Il n\'a rien dit pendant toute la réunion.', 'No dijo nada en toda la reunión.'],
      ['Je ne connais personne dans cette ville.', 'No conozco a nadie en esta ciudad.'],
      ['Je n\'ai que vingt euros sur moi.', 'Solo tengo veinte euros encima.'],
      ['Personne ne sait ce qui s\'est passé.', 'Nadie sabe lo que ocurrió.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['ne...plus = ya no', 'ne...jamais = nunca', 'ne...rien/personne', 'ne...que = solo', 'rien/personne + ne (sujeto)'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la negación correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la negación correcta según el contexto.',
        type: 'choice',
        items: [
          {
            scene: '"Ya no como carne." Je ne mange ___ de viande.',
            lines: [['', 'Je ne mange ___ de viande.']],
            options: ['plus', 'jamais', 'rien', 'que'],
            answer: 'plus',
            explain: '"ne...plus" = ya no. Ha dejado de comer carne (antes lo hacía).',
          },
          {
            scene: '"Nunca llego tarde." Je n\'arrive ___ en retard.',
            lines: [['', 'Je n\'arrive ___ en retard.']],
            options: ['jamais', 'plus', 'rien', 'personne'],
            answer: 'jamais',
            explain: '"ne...jamais" = nunca/jamás. Nunca ha llegado tarde.',
          },
          {
            scene: '"No he dicho nada." Je n\'ai ___ dit.',
            lines: [['', 'Je n\'ai ___ dit.']],
            options: ['rien', 'plus', 'jamais', 'personne'],
            answer: 'rien',
            explain: '"ne...rien" = nada. En passé composé: rien va entre avoir y participio.',
          },
          {
            scene: '"No conozco a nadie aquí." Je ne connais ___ ici.',
            lines: [['', 'Je ne connais ___ ici.']],
            options: ['personne', 'rien', 'jamais', 'plus'],
            answer: 'personne',
            explain: '"ne...personne" = nadie. Personne va después del verbo (COD).',
          },
          {
            scene: '"Solo tengo un euro." Je n\'ai ___ un euro.',
            lines: [['', 'Je n\'ai ___ un euro.']],
            options: ['que', 'plus', 'jamais', 'rien'],
            answer: 'que',
            explain: '"ne...que" = solo/solamente. Que va directamente antes del elemento restringido.',
          },
          {
            scene: '"Nadie llamó." ___ n\'a appelé.',
            lines: [['', '___ n\'a appelé.']],
            options: ['Personne', 'Rien', 'Jamais', 'Plus'],
            answer: 'Personne',
            explain: '"Personne ne..." — cuando personne es sujeto, va ANTES del ne.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos negaciones en un texto',
        tag: '2 espacios',
        intro: 'Completa con las dos negaciones correctas.',
        type: 'dual',
        items: [
          {
            scene: 'Marc dice que ya no sale y nunca llama.',
            lines: [['', 'Marc ne sort [[0]] le soir. Il n\'appelle [[1]].']],
            blanks: [
              { options: ['plus', 'jamais', 'rien', 'personne'], answer: 'plus', explain: '"ne sort plus" = ya no sale (antes salía).' },
              { options: ['jamais', 'plus', 'rien', 'personne'], answer: 'jamais', explain: '"n\'appelle jamais" = nunca llama.' },
            ],
          },
          {
            scene: 'Claire dice que no ha visto nada y no ha hablado con nadie.',
            lines: [['', 'Je n\'ai [[0]] vu et je n\'ai parlé à [[1]].']],
            blanks: [
              { options: ['rien', 'jamais', 'plus', 'que'], answer: 'rien', explain: '"n\'ai rien vu" — rien entre auxiliar y participio.' },
              { options: ['personne', 'rien', 'jamais', 'plus'], answer: 'personne', explain: '"n\'ai parlé à personne" — personne después del participio.' },
            ],
          },
          {
            scene: 'En ese restaurante solo sirven pescado y ya no tienen carne.',
            lines: [['', 'Dans ce restaurant, on ne sert [[0]] du poisson. Ils n\'ont [[1]] de viande.']],
            blanks: [
              { options: ['que', 'plus', 'jamais', 'rien'], answer: 'que', explain: '"ne sert que" = solo sirven. Que + el elemento restringido.' },
              { options: ['plus', 'jamais', 'rien', 'que'], answer: 'plus', explain: '"n\'ont plus" = ya no tienen (antes tenían).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un testimonio negativo',
        tag: 'Texto guiado',
        intro: 'Completa el texto con las negaciones correctas.',
        type: 'guidedText',
        scene: 'Lucie décrit son ancien appartement.',
        text: 'Dans mon ancien appartement, je ne dormais [[0]] bien. Il n\'y avait [[1]] de chauffage. Mes voisins ne faisaient [[1]] de bruit, mais le quartier était dangereux. Je ne sortais [[0]] seule le soir. Il n\'y avait [[2]] qui voulait habiter là-bas. Je n\'ai [[3]] regretté d\'être partie.',
        blanks: [
          { options: ['plus', 'jamais', 'rien', 'personne'], answer: 'jamais', explain: '"ne dormais jamais bien / ne sortais jamais" — nunca/jamás.' },
          { options: ['pas', 'jamais', 'plus', 'rien'], answer: 'pas', explain: '"n\'y avait pas de chauffage / ne faisaient pas de bruit" — negación simple ne...pas.' },
          { options: ['personne', 'rien', 'jamais', 'plus'], answer: 'personne', explain: '"il n\'y avait personne qui voulait" — nadie quería (COD).' },
          { options: ['jamais', 'plus', 'rien', 'personne'], answer: 'jamais', explain: '"je n\'ai jamais regretté" — nunca he lamentado.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con la negación',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la negación correcta.',
        type: 'freeText',
        scene: 'Complétez avec la bonne négation.',
        text: 'Je ne veux ___ manger ce soir. (nada) / Il ne travaille ___ ici — il a changé de poste. (ya no) / Elle n\'a vu ___ pendant la fête. (a nadie) / Je n\'ai ___ cinq minutes. (solo)',
        blanks: [
          { answer: 'rien', explain: '"ne veux rien manger" = no quiero comer nada.' },
          { answer: 'plus', explain: '"ne travaille plus" = ya no trabaja.' },
          { answer: 'personne', explain: '"n\'a vu personne" — personne después del participio.' },
          { answer: 'que', explain: '"je n\'ai que cinq minutes" = solo tengo cinco minutos.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Transforma en negativo',
        tag: 'Escritura guiada',
        intro: 'Reescribe la frase con la negación indicada.',
        type: 'write',
        items: [
          {
            scene: 'Je mange de la viande. → (ya no)',
            prompt: 'Usa ne...plus.',
            answer: 'Je ne mange plus de viande.',
            accepted: ['Je ne mange plus de viande rouge.'],
            explain: '"ne mange plus" = ya no como. De + article → de solo en negación.',
          },
          {
            scene: 'J\'ai vu quelqu\'un. → (a nadie)',
            prompt: 'Usa ne...personne.',
            answer: 'Je n\'ai vu personne.',
            accepted: ['Je n\'ai rencontré personne.'],
            explain: '"n\'ai vu personne" — personne después del participio en passé composé.',
          },
          {
            scene: 'Tout le monde est venu. → (nadie) [como sujeto]',
            prompt: 'Usa personne + ne.',
            answer: 'Personne n\'est venu.',
            accepted: ['Personne n\'est arrivé.'],
            explain: '"Personne n\'est venu" — personne como sujeto va antes del ne.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Habla de hábitos que ya no tienes',
        tag: 'Escritura libre',
        intro: 'Escribe sobre cosas que ya no haces, nunca haces o no haces nada de.',
        type: 'write',
        items: [
          {
            scene: 'Describe 3 cosas que ya no haces (antes las hacías).',
            prompt: 'Utilisez ne...plus pour trois habitudes passées.',
            answer: 'Je ne mange plus de sucre depuis six mois. Je ne regarde plus la télévision — je préfère les séries en ligne. Je ne prends plus les transports en commun depuis que j\'ai un vélo.',
            accepted: ['Je ne fume plus depuis deux ans. Je ne bois plus de soda. Je ne sors plus tard le soir.'],
            explain: '"ne...plus" = ya no. Indica un cambio de hábito respecto al pasado.',
          },
          {
            scene: 'Describe cosas que nunca haces o nunca has hecho.',
            prompt: 'Utilisez ne...jamais et ne...rien pour raconter vos interdits ou manques.',
            answer: 'Je n\'ai jamais sauté en parachute — j\'ai peur des hauteurs. Je ne mange jamais de champignons. Il n\'y a rien que je regrette dans ma vie.',
            accepted: ['Je n\'ai jamais conduit une moto. Je ne fais jamais de sport le matin. Je ne dis jamais rien de mal des autres.'],
            explain: '"ne...jamais" (nunca) y "ne...rien" (nada). Refuerzan la negación.',
          },
        ],
      },
    ],
  },
}

export default topic
