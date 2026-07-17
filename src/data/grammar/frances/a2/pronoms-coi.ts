import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pronoms-coi',
  order: '09',
  color: '#1a2ecc',
  category: 'Pronombres',
  level: 'A2',
  title: 'Pronombres COI en francés A2: lui, leur, me, te, nous, vous',
  shortTitle: 'Pronombres COI (lui/leur)',
  metaTitle: 'Pronombres COI francés A2 — lui, leur, me, te, nous, vous, complemento indirecto',
  description:
    'Los pronombres de complemento indirecto (COI) en francés reemplazan los grupos nominales introducidos por à + persona: me/m\' (me), te/t\' (te), lui (le/la), nous (nos), vous (os/le), leur (les). Van ANTES del verbo auxiliar o del verbo conjugado. Con imperativos afirmativos van DESPUÉS, con guión. Lui y leur son las formas de tercera persona más importantes en A2.',
  lead: 'Je lui parle tous les jours: los pronombres COI que reemplazan à + persona.',
  outcomes: [
    'Usar lui (a él/ella) y leur (a ellos/ellas) como COI',
    'Usar me, te, nous, vous como COI',
    'Colocar el COI antes del verbo (o auxiliar)',
    'Usar le COI en imperativo afirmativo (après le verbe)',
  ],

  guide: {
    goal: 'Reemplazar los complementos indirectos de persona con los pronombres COI correctos.',
    model: 'Je parle à Marc. → Je lui parle. (Le hablo a Marc → Le hablo.) / Elle donne des conseils à ses amis. → Elle leur donne des conseils.',
    formula: 'COI: me/te/lui/nous/vous/leur + V (antes del verbo) | Impératif+: V + moi/toi/lui/nous/vous/leur',
    decisions: [
      '1ª sg: me/m\' → "Il me téléphone" (me llama)',
      '2ª sg: te/t\' → "Je te réponds" (te respondo)',
      '3ª sg: lui → "Elle lui écrit" (le escribe — a él o a ella)',
      '1ª pl: nous → "Il nous explique" (nos explica)',
      '2ª pl/forma: vous → "Je vous envoie le document" (les envío el documento)',
      '3ª pl: leur → "Je leur donne les clés" (les doy las llaves — a ellos/ellas)',
    ],
    table: [
      ['Persona', 'Pronombre COI', 'Ejemplo'],
      ['1ª sg / 2ª sg', 'me, te', 'Il me parle / Je te téléphone'],
      ['3ª sg', 'lui', 'Je lui écris (à lui/elle)'],
      ['1ª pl / 2ª pl', 'nous, vous', 'Il nous dit / Je vous réponds'],
      ['3ª pl', 'leur', 'Elle leur donne les clés'],
    ],
    mistakes: [
      '"Je parle lui" ❌ → "Je lui parle" ✓ — el COI va ANTES del verbo.',
      '"Je leur donne" = les doy (a ellos) ≠ "je les donne" = los doy (COD).',
      '"Téléphone-leur" ✓ — en imperativo afirmativo el COI va después con guión.',
    ],
  },

  seo: [
    {
      heading: 'Lui et leur: los pronombres COI más importantes',
      paragraphs: [
        'Los pronombres COI reemplazan un complemento introducido por à cuando se refiere a una persona. "Je parle à Marie" → "Je lui parle". "Je parle à mes amis" → "Je leur parle". Lui (singular) y leur (plural) son las formas de 3ª persona. Son invariables en género: lui puede reemplazar tanto a à lui (a él) como à elle (a ella).',
        'La posición es clave: el COI va siempre ANTES del verbo conjugado (o del auxiliar en los tiempos compuestos): "Je lui ai parlé" (Le hablé), "Il nous a envoyé un message" (Nos envió un mensaje).',
      ],
    },
    {
      heading: 'Verbos que requieren COI con à + personne',
      paragraphs: [
        'Los verbos más frecuentes que usan à + persona son: parler à, téléphoner à, écrire à, donner à, envoyer à, dire à, demander à, répondre à, expliquer à, montrer à, prêter à. Todos ellos toman pronombres COI, no COD.',
        'Cuidado con la diferencia: "Je lui téléphone" (le llamo — COI) vs "Je l\'appelle" (le/la llamo — COD). Téléphoner exige à + personne → lui/leur. Appeler no: COD → le/la/les.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'COI: me/te/lui/nous/vous/leur avant le verbe. À + personne → pronom COI.',
    graphicPrompt: 'Diagrama de sustitución: "je parle à Pierre" → "je lui parle".',
    scene: [
      ['Je lui téléphone tous les jours.', 'Le llamo todos los días (a él/ella).'],
      ['Elle leur écrit une lettre.', 'Les escribe una carta (a ellos/ellas).'],
      ['Il me donne ses clés.', 'Me da sus llaves.'],
      ['Nous vous expliquons la règle.', 'Os/Les explicamos la regla.'],
      ['Téléphone-lui ce soir !', '¡Llámale esta noche! (imperativo)'],
      ['Il ne leur répond jamais.', 'Nunca les responde.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['lui (à lui/elle)', 'leur (à eux/elles)', 'position avant le verbe', 'impératif + guión'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el pronombre COI correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona el pronombre COI que reemplaza al complemento subrayado.',
        type: 'choice',
        items: [
          {
            scene: 'Je parle à Marie tous les jours.',
            lines: [['', 'Je ___ parle tous les jours.']],
            options: ['lui', 'leur', 'la', 'le'],
            answer: 'lui',
            explain: '"lui parle" = le hablo (à Marie → COI 3ª sg → lui).',
          },
          {
            scene: 'Elle téléphone à ses parents chaque semaine.',
            lines: [['', 'Elle ___ téléphone chaque semaine.']],
            options: ['leur', 'lui', 'les', 'le'],
            answer: 'leur',
            explain: '"leur téléphone" = les llama (à ses parents → COI 3ª pl → leur).',
          },
          {
            scene: 'Il me donne ses notes.',
            lines: [['', 'Il ___ donne ses notes.']],
            options: ['me', 'lui', 'leur', 'te'],
            answer: 'me',
            explain: '"me donne" = me da (à moi → COI 1ª sg → me).',
          },
          {
            scene: 'Elle répond à toi immédiatement.',
            lines: [['', 'Elle ___ répond immédiatement.']],
            options: ['te', 'lui', 'leur', 'vous'],
            answer: 'te',
            explain: '"te répond" = te responde (à toi → COI 2ª sg → te).',
          },
          {
            scene: 'Nous expliquons la leçon à nos étudiants.',
            lines: [['', 'Nous ___ expliquons la leçon.']],
            options: ['leur', 'lui', 'les', 'nous'],
            answer: 'leur',
            explain: '"leur expliquons" = les explicamos (à nos étudiants → COI 3ª pl → leur).',
          },
          {
            scene: 'Dis la vérité à ton professeur ! (imperativo)',
            lines: [['', 'Dis-___ la vérité !']],
            options: ['lui', 'leur', 'le', 'la'],
            answer: 'lui',
            explain: '"Dis-lui" = díselo (à ton professeur → lui). Imperativo afirmativo → après le verbe avec tiret.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Sustituye con lui o leur',
        tag: '2 espacios',
        intro: 'Completa con el pronombre COI correcto.',
        type: 'dual',
        items: [
          {
            scene: 'Je parle à mon ami / Je parle à mes amis.',
            lines: [['', 'Je [[0]] parle. (ami) / Je [[1]] parle. (amis)']],
            blanks: [
              { options: ['lui', 'leur', 'les', 'le'], answer: 'lui', explain: '"Je lui parle" = le hablo (singular → lui).' },
              { options: ['leur', 'lui', 'les', 'le'], answer: 'leur', explain: '"Je leur parle" = les hablo (plural → leur).' },
            ],
          },
          {
            scene: 'Il donne un cadeau à sa mère / Il donne des cadeaux à ses sœurs.',
            lines: [['', 'Il [[0]] donne un cadeau. / Il [[1]] donne des cadeaux.']],
            blanks: [
              { options: ['lui', 'leur', 'la', 'le'], answer: 'lui', explain: '"lui donne" = le da (à sa mère → COI sg → lui).' },
              { options: ['leur', 'lui', 'les', 'le'], answer: 'leur', explain: '"leur donne" = les da (à ses sœurs → COI pl → leur).' },
            ],
          },
          {
            scene: 'Écris à ta sœur ! / Écris à tes amis ! (imperativos)',
            lines: [['', 'Écris-[[0]] ! / Écris-[[1]] !']],
            blanks: [
              { options: ['lui', 'leur', 'la', 'le'], answer: 'lui', explain: '"Écris-lui" = escríbele (imperativo, à ta sœur → lui).' },
              { options: ['leur', 'lui', 'les', 'le'], answer: 'leur', explain: '"Écris-leur" = escríbeles (imperativo, à tes amis → leur).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Sustitución en contexto',
        tag: 'Texto guiado',
        intro: 'Completa el texto reemplazando los complementos con pronombres COI.',
        type: 'guidedText',
        scene: 'Marie parle de ses relations avec sa famille.',
        text: 'J\'ai un bon contact avec ma famille. J\'écris à ma mère tous les dimanches. Je [[0]] envoie des messages. Mon père est loin, mais je [[0]] téléphone souvent. Mes frères et sœurs ? Je [[1]] parle aussi, mais moins souvent. Quand j\'ai un problème, je demande conseil à mes parents. Je [[1]] fais confiance.',
        blanks: [
          { options: ['lui', 'leur', 'les', 'le'], answer: 'lui', explain: '"Je lui envoie / Je lui téléphone" = à ma mère/mon père (singular → lui).' },
          { options: ['leur', 'lui', 'les', 'le'], answer: 'leur', explain: '"Je leur parle / Je leur fais confiance" = à mes frères et sœurs (plural → leur).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con el pronombre COI',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe el pronombre COI correcto.',
        type: 'freeText',
        scene: 'Remplacez le complément indirect par un pronom.',
        text: 'Il écrit à son amie. → Il ___ écrit. / Nous parlons à nos professeurs. → Nous ___ parlons. / Tu téléphones à moi ? → Tu ___ téléphones ? / Donnez les clés à vos voisins ! → Donnez-___ les clés !',
        blanks: [
          { answer: 'lui', explain: '"lui écrit" = le escribe (à son amie → COI sg → lui).' },
          { answer: 'leur', explain: '"leur parlons" = les hablamos (à nos professeurs → COI pl → leur).' },
          { answer: 'me', explain: '"tu me téléphones" = me llamas (à moi → me).' },
          { answer: 'leur', explain: '"Donnez-leur" = dáselas (à vos voisins → leur, imperativo).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Reemplaza el COI',
        tag: 'Escritura guiada',
        intro: 'Reescribe la frase reemplazando el COI con el pronombre correcto.',
        type: 'write',
        items: [
          {
            scene: 'J\'explique la règle à mes étudiants.',
            prompt: 'Remplacez "à mes étudiants" par le pronom COI.',
            answer: 'Je leur explique la règle.',
            accepted: ['Je leur explique ça.'],
            explain: '"leur explique" = les explico (à mes étudiants → leur, pl.).',
          },
          {
            scene: 'Elle donne des conseils à son frère.',
            prompt: 'Remplacez "à son frère" par le pronom COI.',
            answer: 'Elle lui donne des conseils.',
            accepted: ['Elle lui en donne.'],
            explain: '"lui donne" = le da (à son frère → lui, sg.).',
          },
          {
            scene: 'Téléphone à tes parents ce soir ! (imperativo)',
            prompt: 'Remplacez "à tes parents" dans l\'impératif.',
            answer: 'Téléphone-leur ce soir !',
            accepted: ['Téléphone-leur !'],
            explain: '"Téléphone-leur" = llámales (imperativo + COI après le verbe avec tiret).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe tu comunicación con amigos y familia',
        tag: 'Escritura libre',
        intro: 'Escribe sobre cómo te comunicas usando pronombres COI.',
        type: 'write',
        items: [
          {
            scene: 'Describe cómo te comunicas con tu familia usando COI.',
            prompt: 'Utilisez lui et leur pour parler de votre famille.',
            answer: 'Ma mère habite loin, donc je lui téléphone tous les soirs. Je lui envoie des photos. Mes amis sont proches, je leur écris souvent.',
            accepted: ['Je lui envoie des messages à ma sœur. Je leur parle chaque semaine à mes parents.'],
            explain: '"lui" = à ma mère (sg); "leur" = à mes amis/parents (pl).',
          },
          {
            scene: 'Describe tres cosas que le dices o das a alguien.',
            prompt: 'Décrivez trois choses que vous dites ou donnez à quelqu\'un.',
            answer: 'Je lui dis bonjour chaque matin. Je lui donne mes notes de cours. Je lui explique les exercices difficiles.',
            accepted: ['Je leur dis la vérité. Je leur donne des conseils. Je leur réponds rapidement.'],
            explain: 'Usa lui (singular) o leur (plural) según el contexto.',
          },
        ],
      },
    ],
  },
}

export default topic
