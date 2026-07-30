import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'gerondif',
  order: '19',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'A2',
  title: 'Gerundio en francés A2: en + participe présent (en faisant)',
  shortTitle: 'Gérondif (en faisant)',
  metaTitle: 'Gérondif francés A2 — en faisant, en parlant, en mangeant, participe présent',
  description:
    'El gérondif francés se forma con en + participe présent (raíz de nous + -ant): en parlant, en mangeant, en faisant. Expresa simultaneidad (mientras hace algo), manera/medio (haciendo algo), causa o condición. El sujeto del gérondif es siempre el mismo que el del verbo principal. Verbos irregulares: être → en étant, avoir → en ayant, savoir → en sachant.',
  lead: 'Il apprend le français en écoutant des podcasts: el gérondif para expresar simultaneidad y manera.',
  outcomes: [
    'Formar el participe présent y el gérondif (en + part. prés.)',
    'Usar el gérondif para simultaneidad (mientras/al mismo tiempo)',
    'Usar el gérondif para expresar manera o medio',
    'Reconocer los irregulares être/avoir/savoir',
  ],

  guide: {
    goal: 'Expresar dos acciones simultáneas o la manera de hacer algo usando en + participe présent.',
    model: 'Il écoute de la musique en travaillant. (Escucha música mientras trabaja.) / Elle améliore son français en regardant des films. (Mejora su francés viendo películas.)',
    formula: 'gérondif = en + participe présent | participe présent = raíz nous + -ant',
    decisions: [
      'Formation: nous parlons → parl- + ant → parlant → en parlant',
      'nous mangeons → mange- + ant → mangeant → en mangeant',
      'nous finissons → finiss- + ant → finissant → en finissant',
      'Irregulares: être → étant → en étant | avoir → ayant → en ayant | savoir → sachant → en sachant',
      'Sujeto del gérondif = sujeto del verbo principal (siempre mismo sujeto)',
    ],
    table: [
      ['Verbe', 'Participe présent', 'Gérondif'],
      ['parler', 'parlant', 'en parlant'],
      ['faire / être / avoir', 'faisant / étant / ayant', 'en faisant / en étant / en ayant'],
      ['savoir / vouloir', 'sachant / voulant', 'en sachant / en voulant'],
    ],
    mistakes: [
      '"En parler" ❌ → "en parlant" ✓ — no infinitivo; siempre en + -ant.',
      '"Il fait du sport en elle regarde la télé" ❌ — el sujeto del gérondif = mismo que el V principal.',
      '"En étudiant" ✓ pero "en étant étudiant" ≠ mismo uso — distinguir contextos.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma el gérondif en francés?',
      paragraphs: [
        'El participe présent se forma tomando la raíz de la primera persona del plural (nous) del présent de indicatif y añadiendo -ant. Ejemplos: nous parlons → parlant → en parlant; nous finissons → finissant → en finissant; nous prenons → prenant → en prenant; nous faisons → faisant → en faisant. Tres irregulares: être → étant, avoir → ayant, savoir → sachant.',
        'El gérondif siempre lleva el artículo en delante: "en travaillant", "en mangeant", "en étant". Es invariable (no concuerda en género ni número). El sujeto del gérondif es siempre el mismo que el del verbo conjugado de la frase: "Elle écoute la radio en conduisant" (ella = ella). No se puede tener sujetos distintos.',
      ],
    },
    {
      heading: '¿Para qué se usa el gérondif en francés?',
      paragraphs: [
        'El uso más frecuente es la simultaneidad: "Il chante en cuisinant" (Canta mientras cocina — las dos acciones ocurren al mismo tiempo). También expresa la manera o el medio: "Je maigris en mangeant moins" (Adelgazo comiendo menos — el gérondif indica cómo). Y a veces condición: "En travaillant plus, tu réussiras" (Trabajando más, tendrás éxito = si trabajas más).',
        'A diferencia del español, en francés el equivalente del gerundio español puede ser el présent (yo trabajo = je travaille) o el gérondif en posición adverbial (trabajando = en travaillant). El gérondif en francés siempre lleva en.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre el gérondif francés y el gerundio español?',
      paragraphs: [
        'Aunque se parecen, no son intercambiables. El gérondif francés (en + participe présent: "en mangeant") lleva SIEMPRE "en" y expresa simultaneidad, manera o condición, siempre con el MISMO sujeto que el verbo principal: "Il chante en travaillant" (canta mientras trabaja). El español, en cambio, usa el gerundio en más contextos, incluida la perífrasis "estar + gerundio", que en francés NO existe: la acción en curso no es "je suis mangeant" sino "je suis en train de manger". Regla clave para el hispanohablante: no traduzcas "-ndo" automáticamente por el participe présent; el gérondif solo aparece con "en" y para acciones paralelas del mismo sujeto.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'en + participe présent. Formation: nous → -ant. Même sujet obligatoire.',
    graphicPrompt: 'Persona haciendo dos cosas a la vez: escuchar música mientras estudia.',
    scene: [
      ['Il apprend le français en regardant des films.', 'Aprende francés viendo películas.'],
      ['Elle chante en faisant la vaisselle.', 'Canta mientras lava los platos.'],
      ['Je me détends en écoutant de la musique.', 'Me relajo escuchando música.'],
      ['On peut améliorer son vocabulaire en lisant.', 'Se puede mejorar el vocabulario leyendo.'],
      ['Il est tombé en courant dans l\'escalier.', 'Se cayó corriendo por las escaleras.'],
      ['En travaillant dur, tu réussiras à coup sûr.', 'Trabajando duro, seguramente tendrás éxito.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['en + participe présent', 'nous → -ant', 'en étant / en ayant / en sachant', 'même sujet obligatoire'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma el gérondif correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma correcta del gérondif.',
        type: 'choice',
        items: [
          {
            scene: 'Elle lit en ___ (manger) son repas.',
            lines: [['', 'Elle lit en ___ son repas.']],
            options: ['mangeant', 'manger', 'mange', 'mangé'],
            answer: 'mangeant',
            explain: '"en mangeant" — gérondif: manger → nous mangeons → mange- + -ant = mangeant.',
          },
          {
            scene: 'Il s\'est blessé en ___ (faire) du sport.',
            lines: [['', 'Il s\'est blessé en ___ du sport.']],
            options: ['faisant', 'faire', 'fait'],
            answer: 'faisant',
            explain: '"en faisant" — faire → nous faisons → fais- + -ant = faisant.',
          },
          {
            scene: 'Tu peux progresser en ___ (être) régulier.',
            lines: [['', 'Tu peux progresser en ___ régulier.']],
            options: ['étant', 'être', 'est', 'était'],
            answer: 'étant',
            explain: '"en étant" — être es irregular: étant → en étant.',
          },
          {
            scene: 'Elle a appris la nouvelle en ___ (lire) le journal.',
            lines: [['', 'Elle a appris la nouvelle en ___ le journal.']],
            options: ['lisant', 'lire', 'lu', 'lit'],
            answer: 'lisant',
            explain: '"en lisant" — lire → nous lisons → lis- + -ant = lisant.',
          },
          {
            scene: 'On gagne du temps en ___ (savoir) s\'organiser.',
            lines: [['', 'On gagne du temps en ___ s\'organiser.']],
            options: ['sachant', 'savant', 'savoir', 'su'],
            answer: 'sachant',
            explain: '"en sachant" — savoir es irregular: sachant → en sachant.',
          },
          {
            scene: 'Je me prépare en ___ (écouter) les nouvelles.',
            lines: [['', 'Je me prépare en ___ les nouvelles.']],
            options: ['écoutant', 'écouter', 'écouté', 'écoute'],
            answer: 'écoutant',
            explain: '"en écoutant" — écouter → nous écoutons → écout- + -ant = écoutant.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos gérondifs en contexto',
        tag: '2 espacios',
        intro: 'Completa con los dos gérondifs correctos.',
        type: 'dual',
        items: [
          {
            scene: 'Estudiar y trabajar al mismo tiempo.',
            lines: [['', 'Il réussit [[0]] (étudier) et [[1]] (travailler) dur.']],
            blanks: [
              { options: ['en étudiant', 'en étude', 'en étudier', 'étudiant'], answer: 'en étudiant', explain: '"en étudiant" — étudier → nous étudions → étudi- + -ant = étudiant.' },
              { options: ['en travaillant', 'en travail', 'en travailler', 'travaillant'], answer: 'en travaillant', explain: '"en travaillant" — travailler → nous travaillons → travaill- + -ant = travaillant.' },
            ],
          },
          {
            scene: 'Mejorar el idioma viendo y escuchando.',
            lines: [['', 'On améliore son français [[0]] (regarder) des séries et [[1]] (parler) avec des natifs.']],
            blanks: [
              { options: ['en regardant', 'en regarder', 'regardant', 'en regard'], answer: 'en regardant', explain: '"en regardant" — regarder → regardons → regard- + -ant.' },
              { options: ['en parlant', 'en parler', 'parlant', 'en parle'], answer: 'en parlant', explain: '"en parlant" — parler → parlons → parl- + -ant.' },
            ],
          },
          {
            scene: 'Condición: trabajando y siendo constante.',
            lines: [['', '[[0]] (travailler) régulièrement et [[1]] (avoir) de la patience, tu y arriveras.']],
            blanks: [
              { options: ['En travaillant', 'En travailler', 'Travaillant', 'En travail'], answer: 'En travaillant', explain: '"En travaillant" — en inicio de frase, condición.' },
              { options: ['en ayant', 'en avoir', 'ayant', 'en avait'], answer: 'en ayant', explain: '"en ayant" — avoir irregular: ayant.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Descripción de hábitos',
        tag: 'Texto guiado',
        intro: 'Completa el texto con los gérondifs correctos.',
        type: 'guidedText',
        scene: 'Marie décrit comment elle apprend les langues.',
        text: 'J\'apprends les langues [[0]] (écouter) des podcasts. Je mémorise le vocabulaire [[1]] (répéter) les mots à voix haute. [[2]] (regarder) des films en version originale, j\'améliore ma prononciation. Je progresse aussi [[3]] (avoir) beaucoup de patience. [[4]] (être) régulière dans mon travail, je fais des progrès rapides.',
        blanks: [
          { options: ['en écoutant', 'en regardant', 'en répétant', 'en parlant'], answer: 'en écoutant', explain: '"en écoutant / en regardant" — écouter → écoutant, regarder → regardant.' },
          { options: ['en répétant', 'en parlant', 'en écoutant', 'en lisant'], answer: 'en répétant', explain: '"en répétant" — répéter → nous répétons → répét- + -ant = répétant.' },
          { options: ['en ayant', 'en étant', 'en sachant', 'en faisant'], answer: 'en ayant', explain: '"en ayant / en étant" — avoir: ayant, être: étant (irregulares).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Forma el gérondif',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe el gérondif correcto.',
        type: 'freeText',
        scene: 'Formez le gérondif des verbes entre parenthèses.',
        text: 'Il économise de l\'argent [[0]] (ne pas sortir) souvent. / Elle s\'est trompée [[1]] (calculer) le résultat. / Tu réussiras [[2]] (être) courageux. / On apprend [[3]] (faire) des erreurs.',
        blanks: [
          { answer: 'en ne sortant pas', explain: '"en ne sortant pas" — gérondif negativo: en + ne + part. prés. + pas.' },
          { answer: 'en calculant', explain: '"en calculant" — calculer → calculons → calcul- + -ant.' },
          { answer: 'en étant', explain: '"en étant" — être irregular: étant.' },
          { answer: 'en faisant', explain: '"en faisant" — faire → faisons → fais- + -ant = faisant.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Expresa simultaneidad o manera',
        tag: 'Escritura guiada',
        intro: 'Combina las dos acciones usando el gérondif.',
        type: 'write',
        items: [
          {
            scene: 'Elle écoute la radio. Elle prépare le dîner.',
            prompt: 'Combina las dos acciones con gérondif.',
            answer: 'Elle écoute la radio en préparant le dîner.',
            accepted: ['Elle prépare le dîner en écoutant la radio.'],
            explain: '"en préparant le dîner" — préparer → préparons → prépar- + -ant.',
          },
          {
            scene: '¿Cómo mejoras tu francés? (Leyendo cada día)',
            prompt: 'Usa gérondif de lire.',
            answer: 'J\'améliore mon français en lisant chaque jour.',
            accepted: ['Je progresse en lisant des livres en français.'],
            explain: '"en lisant" — lire → lisons → lis- + -ant = lisant.',
          },
          {
            scene: 'Trabajando mucho, conseguirás tu objetivo.',
            prompt: 'Usa gérondif al inicio de la frase (condición).',
            answer: 'En travaillant beaucoup, tu atteindras ton objectif.',
            accepted: ['En travaillant dur, tu réussiras.'],
            explain: '"En travaillant" al inicio = condición. Trabajar duro → conseguir objetivo.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe tus hábitos con gérondif',
        tag: 'Escritura libre',
        intro: 'Escribe sobre cómo aprendes o trabajas usando el gérondif.',
        type: 'write',
        items: [
          {
            scene: '¿Cómo aprendes idiomas o nuevas habilidades?',
            prompt: 'Utilisez 3 gérondifs pour décrire votre méthode d\'apprentissage.',
            answer: 'J\'apprends les langues en écoutant des podcasts tous les jours. Je mémorise les mots en les répétant à voix haute. Je progresse aussi en regardant des films en version originale.',
            accepted: ['J\'apprends en lisant des livres dans la langue cible. En parlant avec des natifs, je développe ma fluidité. J\'améliore ma compréhension en écoutant de la musique.'],
            explain: 'Gérondifs: en écoutant / en répétant / en regardant — même sujet (je) tout au long.',
          },
          {
            scene: 'Describe cómo haces varias cosas a la vez en tu vida cotidiana.',
            prompt: 'Utilisez en + participe présent pour décrire des actions simultanées.',
            answer: 'Je me prépare le matin en écoutant les nouvelles. Je mange en regardant des vidéos sur mon téléphone. Le soir, je me détends en lisant un roman ou en faisant du yoga.',
            accepted: ['Je travaille en écoutant de la musique. Je fais du sport en écoutant des podcasts. Le week-end, je cuisine en chantant.'],
            explain: 'en + participe présent expresa acciones simultáneas. Mismo sujeto je tout au long.',
          },
        ],
      },
    ],
  },
}

export default topic
