import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbes-pronominaux',
  order: '11',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'A2',
  title: 'Verbos pronominales en francés A2: se lever, s\'appeler, se souvenir',
  shortTitle: 'Verbos pronominales',
  metaTitle: 'Verbos pronominales francés A2 — se lever, s\'appeler, se souvenir, réfléchi',
  description:
    'Los verbos pronominales en francés llevan un pronombre reflexivo (me, te, se, nous, vous, se) que concuerda con el sujeto. Se usan para acciones reflexivas (se laver), recíprocas (se parler) e inherentes (se souvenir, se méfier). En los tiempos compuestos, se conjugan con être. La negación rodea pronombre + verbo: ne + pronom + verbe + pas.',
  lead: 'Je me lève tôt tous les matins: los verbos pronominales esenciales en francés A2.',
  outcomes: [
    'Conjugar verbos pronominales en presente de indicativo',
    'Usar me/te/se/nous/vous/se según el sujeto',
    'Reconocer pronominales reflexivos, recíprocos e inherentes',
    'Negar verbos pronominales correctamente',
  ],

  guide: {
    goal: 'Usar los verbos pronominales con el pronombre reflexivo correcto en francés.',
    model: 'Je me lève à 7h. (Me levanto a las 7.) / Nous nous appelons chaque soir. (Nos llamamos cada noche.) / Il ne se souvient pas. (No se acuerda.)',
    formula: 'sujeto + pronom réfl. + verbe | je me / tu te / il-elle se / nous nous / vous vous / ils-elles se',
    decisions: [
      'je me/m\' → "Je me lève" / "Je m\'habille"',
      'tu te/t\' → "Tu te lèves" / "Tu t\'habilles"',
      'il/elle se/s\' → "Il se lève" / "Elle s\'appelle Marie"',
      'nous nous → "Nous nous levons"',
      'vous vous → "Vous vous levez"',
      'ils/elles se/s\' → "Ils se lèvent" / "Elles s\'appellent"',
    ],
    table: [
      ['Pronom', 'Réfléchi', 'Exemple'],
      ['je / tu', 'me / te', 'Je me lève / Tu te couches'],
      ['il, elle', 'se / s\'', 'Il se rase / Elle s\'habille'],
      ['nous / vous / ils', 'nous / vous / se', 'Nous nous parlons / Ils se voient'],
    ],
    mistakes: [
      '"Je me lève pas" ❌ → "Je ne me lève pas" ✓ — ne...pas rodea el bloque pronom+verbe.',
      '"Il se s\'appelle" ❌ → "Il s\'appelle" ✓ — solo un pronombre reflexivo por verbo.',
      '"Nous se parlons" ❌ → "Nous nous parlons" ✓ — con nous el pronombre es nous, no se.',
    ],
  },

  seo: [
    {
      heading: 'Verbos pronominales reflexivos y recíprocos',
      paragraphs: [
        'Los verbos pronominales reflexivos expresan una acción que el sujeto hace sobre sí mismo: "Je me lave les mains" (Me lavo las manos), "Elle se coiffe" (Ella se peina), "Il se lève tôt" (Él se levanta temprano). Los pronombres cambian según el sujeto: me/m\', te/t\', se/s\', nous, vous, se/s\'.',
        'Los recíprocos indican una acción mutua entre dos o más personas: "Ils se parlent souvent" (Se hablan a menudo), "Nous nous voyons le week-end" (Nos vemos el fin de semana). Solo se usan con sujetos plurales (nous, vous, ils/elles).',
      ],
    },
    {
      heading: 'Pronominales inherentes: se souvenir, se méfier, se tromper',
      paragraphs: [
        'Algunos verbos son siempre pronominales sin significado reflexivo especial — simplemente requieren el pronombre: "se souvenir de" (recordar), "se méfier de" (desconfiar), "se tromper" (equivocarse), "s\'en aller" (irse), "se moquer de" (burlarse de). No existe la versión sin pronombre.',
        'La negación de pronominales sigue el esquema: ne + pronom réfléchi + verbe + pas. "Je ne me lève pas tôt." / "Il ne s\'en va pas." / "Nous ne nous souvenons pas de cette date."',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'me/te/se/nous/vous/se + verbe. Negación: ne + pron + V + pas.',
    graphicPrompt: 'Rutina matutina: personaje que se levanta, se ducha, se viste.',
    scene: [
      ['Je me lève à 7 heures du matin.', 'Me levanto a las 7 de la mañana.'],
      ['Tu te douches avant le petit-déjeuner ?', '¿Te duchas antes del desayuno?'],
      ['Elle s\'appelle Claire. Il s\'appelle Marc.', 'Ella se llama Claire. Él se llama Marc.'],
      ['Nous nous retrouvons au café à midi.', 'Nos encontramos en el café a mediodía.'],
      ['Vous vous couchez tôt le soir ?', '¿Os acostáis temprano por la noche?'],
      ['Ils se souviennent de leur premier voyage.', 'Se acuerdan de su primer viaje.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['me/te/se + verbe', 'nous nous / vous vous', 'ne + pron + V + pas', 's\'appeler / se souvenir'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el pronombre reflexivo',
        tag: 'Opción múltiple',
        intro: 'Selecciona el pronombre reflexivo correcto para cada sujeto.',
        type: 'choice',
        items: [
          {
            scene: 'Je ___ lève à 6 heures.',
            lines: [['', 'Je ___ lève à 6 heures.']],
            options: ['me', 'te', 'se', 'nous'],
            answer: 'me',
            explain: '"Je me lève" = me levanto. Sujeto je → pronombre me.',
          },
          {
            scene: 'Elle ___ appelle Lucie.',
            lines: [['', 'Elle ___ appelle Lucie.']],
            options: ["s'", 'se', 'me', 'te'],
            answer: "s'",
            explain: '"Elle s\'appelle" = ella se llama. Ante vocal/h → s\'.',
          },
          {
            scene: 'Nous ___ parlons tous les jours.',
            lines: [['', 'Nous ___ parlons tous les jours.']],
            options: ['nous', 'se', 'vous', 'me'],
            answer: 'nous',
            explain: '"Nous nous parlons" = nos hablamos. Sujeto nous → pronombre nous.',
          },
          {
            scene: 'Tu ___ couches à quelle heure ?',
            lines: [['', 'Tu ___ couches à quelle heure ?']],
            options: ['te', 'me', 'se', 'vous'],
            answer: 'te',
            explain: '"Tu te couches" = te acuestas. Sujeto tu → pronombre te.',
          },
          {
            scene: 'Ils ___ retrouvent au parc le dimanche.',
            lines: [['', 'Ils ___ retrouvent au parc le dimanche.']],
            options: ['se', 'nous', 'vous', 'te'],
            answer: 'se',
            explain: '"Ils se retrouvent" = se encuentran. Sujeto ils → pronombre se.',
          },
          {
            scene: 'Je ne ___ souviens pas de son nom.',
            lines: [['', 'Je ne ___ souviens pas de son nom.']],
            options: ['me', 'te', 'se', 'nous'],
            answer: 'me',
            explain: '"Je ne me souviens pas" = no me acuerdo. Se souvenir = pronominal inherente.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Pronominales en la rutina diaria',
        tag: '2 espacios',
        intro: 'Completa con el pronombre reflexivo correcto.',
        type: 'dual',
        items: [
          {
            scene: 'Describe la mañana de Marc y Claire.',
            lines: [['', 'Marc [[0]] lève tôt. Claire [[1]] habille rapidement.']],
            blanks: [
              { options: ['se', 'me', 'nous', 'vous'], answer: 'se', explain: '"Il se lève" — sujeto Marc (il) → se.' },
              { options: ["s'", 'se', 'me', 'te'], answer: "s'", explain: '"Elle s\'habille" — ante vocal → s\'.' },
            ],
          },
          {
            scene: 'Describe qué hacen tú y tu amigo los fines de semana.',
            lines: [['', 'Nous [[0]] retrouvons au café. Vous [[1]] amusez bien ?']],
            blanks: [
              { options: ['nous', 'se', 'vous', 'me'], answer: 'nous', explain: '"Nous nous retrouvons" = nos encontramos. nous+nous.' },
              { options: ['vous', 'nous', 'se', 'te'], answer: 'vous', explain: '"Vous vous amusez" = os divertís. vous+vous.' },
            ],
          },
          {
            scene: 'Negaciones: "Yo no me equivoco / Ellos no se hablan".',
            lines: [['', 'Je ne [[0]] trompe pas. Ils ne [[1]] parlent plus.']],
            blanks: [
              { options: ['me', 'te', 'se', 'nous'], answer: 'me', explain: '"Je ne me trompe pas" = no me equivoco. je → me.' },
              { options: ['se', 'nous', 'vous', 'me'], answer: 'se', explain: '"Ils ne se parlent plus" = ya no se hablan. ils → se.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Rutina de Sophie',
        tag: 'Texto guiado',
        intro: 'Completa el texto con el pronombre reflexivo correcto.',
        type: 'guidedText',
        scene: 'Sophie décrit sa routine matinale.',
        text: 'Le matin, je [[0]] lève à 6h30. Je [[0]] douche, puis je [[0]] habille. Mon frère, lui, [[1]] réveille très tard. Mes parents [[1]] lèvent ensemble et ils [[1]] préparent un café. Nous [[2]] retrouvons tous à table pour le petit-déjeuner.',
        blanks: [
          { options: ['me', 'te', 'se', 'nous'], answer: 'me', explain: '"je me lève / je me douche / je me habille → m\'habille" — je → me.' },
          { options: ['se', 'me', 'nous', 'vous'], answer: 'se', explain: '"il se réveille / ils se lèvent / ils se préparent" — il/ils → se.' },
          { options: ['nous', 'se', 'vous', 'me'], answer: 'nous', explain: '"nous nous retrouvons" — nous → nous.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Conjuga el verbo pronominal',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma correcta del verbo pronominal.',
        type: 'freeText',
        scene: 'Écrivez la bonne forme du verbe pronominal.',
        text: 'Tu ___ (se lever) à quelle heure ? / Ils ___ (se parler) souvent. / Nous ___ (se voir) demain. / Elle ___ (se tromper) parfois.',
        blanks: [
          { answer: 'te lèves', explain: '"tu te lèves" — sujeto tu → te + lever au présent (lèves).' },
          { answer: 'se parlent', explain: '"ils se parlent" — sujeto ils → se + parler (parlent).' },
          { answer: 'nous voyons', explain: '"nous nous voyons" — nous+nous + voir (voyons).' },
          { answer: 'se trompe', explain: '"elle se trompe" — sujeto elle → se + tromper (trompe).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Reescribe con el pronominal',
        tag: 'Escritura guiada',
        intro: 'Reescribe la frase usando el verbo pronominal indicado.',
        type: 'write',
        items: [
          {
            scene: 'Ils ont une conversation tous les jours.',
            prompt: 'Reescribe con "se parler".',
            answer: 'Ils se parlent tous les jours.',
            accepted: ['Ils se parlent chaque jour.'],
            explain: '"se parler" = hablarse (recíproco). ils → ils se parlent.',
          },
          {
            scene: 'Elle n\'a pas de mémoire de cette soirée.',
            prompt: 'Reescribe con "ne pas se souvenir de".',
            answer: 'Elle ne se souvient pas de cette soirée.',
            accepted: ['Elle ne s\'en souvient pas.'],
            explain: '"ne se souvient pas" = no se acuerda. Negación: ne + se + V + pas.',
          },
          {
            scene: '¿A qué hora te levantas los lunes?',
            prompt: 'Traduce usando "se lever".',
            answer: 'Tu te lèves à quelle heure le lundi ?',
            accepted: ['À quelle heure tu te lèves le lundi ?'],
            explain: '"tu te lèves" = tú te levantas. Sujeto tu → te.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe tu rutina diaria',
        tag: 'Escritura libre',
        intro: 'Escribe sobre tu rutina usando verbos pronominales.',
        type: 'write',
        items: [
          {
            scene: 'Describe lo que haces todas las mañanas.',
            prompt: 'Utilisez au moins 4 verbes pronominaux: se lever, se doucher, se préparer, s\'habiller...',
            answer: 'Je me lève à 7h. Je me douche rapidement et je m\'habille. Je me prépare un café et je me dépêche pour arriver à l\'heure.',
            accepted: ['Je me réveille à 6h30. Je me lave, je me coiffe et je m\'habille. Je ne me maquille pas tous les jours.'],
            explain: 'me/m\' con je: me lever, me doucher, m\'habiller, me préparer, me dépêcher.',
          },
          {
            scene: 'Describe cómo te comunicas con tus amigos o familia.',
            prompt: 'Utilisez se voir, se parler, se retrouver, s\'écrire...',
            answer: 'Mes amis et moi, nous nous voyons souvent le week-end. Nous nous parlons sur WhatsApp tous les jours. Parfois, nous nous retrouvons dans un café.',
            accepted: ['Ma famille et moi, nous nous appelons chaque semaine. Nous nous écrivons des messages. Nous nous retrouvons pendant les vacances.'],
            explain: 'nous nous avec sujeto nous: nous voyons, nous parlons, nous retrouvons.',
          },
        ],
      },
    ],
  },
}

export default topic
