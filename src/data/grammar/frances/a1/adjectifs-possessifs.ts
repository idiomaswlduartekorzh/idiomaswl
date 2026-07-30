import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'adjectifs-possessifs',
  order: '09',
  color: '#1a2ecc',
  category: 'Déterminants',
  level: 'A1',
  title: 'Les Adjectifs Possessifs en Français A1',
  shortTitle: 'Adjectifs possessifs',
  metaTitle: 'Adjetivos posesivos en francés A1 — mon, ma, mes, ton, ta, tes, son, sa, ses',
  description:
    'Los adjetivos posesivos en francés (mon/ma/mes, ton/ta/tes, son/sa/ses…) concuerdan con el objeto poseído, NO con el poseedor. Esto es diferente al español: "son père" puede ser "su padre" tanto de él como de ella.',
  lead: 'El posesivo en francés no sigue al poseedor — sigue al objeto. "Son frère" puede ser el hermano de Tomás O de Elena. El género del objeto decide la forma.',
  outcomes: [
    'Usa los posesivos de las tres personas del singular (mon/ma/mes, ton/ta/tes, son/sa/ses)',
    'Aplica notre/nos, votre/vos, leur/leurs correctamente',
    'Recuerda mon/ton/son ante sustantivos femeninos que empiezan por vocal',
  ],

  guide: {
    goal: 'Usar los adjetivos posesivos del francés con concordancia correcta en género y número.',
    model: 'C\'est mon livre. C\'est ma sœur. Ce sont mes amis. Son père est médecin (su padre, de él o de ella).',
    formula: 'Posesivo (según poseedor + género del objeto) + sustantivo',
    decisions: [
      'El posesivo concuerda con el OBJETO poseído, no con el poseedor: "son livre" = su libro (de él o de ella)',
      'Singular masc: mon/ton/son | Singular fem: ma/ta/sa | Plural: mes/tes/ses',
      'Ante sustantivo femenino que comienza por vocal o h muda: mon/ton/son (no ma/ta/sa): mon amie, ton école, son histoire',
      'Plural 1a persona: notre (sing) / nos (pl); 2a persona plural: votre/vos; 3a plural: leur/leurs',
      'leur/leurs: leur concuerda en número con el objeto (leurs livres = sus libros, de ellos)',
    ],
    table: [
      ['Poseedor', 'Singular (masc. / fem.)', 'Plural'],
      ['yo (je)', 'mon / ma (mon* ante vocal)', 'mes'],
      ['tú (tu)', 'ton / ta (ton* ante vocal)', 'tes'],
      ['él/ella (il/elle)', 'son / sa (son* ante vocal)', 'ses'],
      ['nosotros (nous)', 'notre / notre', 'nos'],
      ['vosotros (vous)', 'votre / votre', 'vos'],
      ['ellos/ellas (ils/elles)', 'leur / leur', 'leurs'],
    ],
    mistakes: [
      '"Ma amie" ❌ → "Mon amie" ✓ — ante vocal femenina, ma/ta/sa → mon/ton/son',
      '"Son" puede ser "su" de él O de ella: "Il aime son chien" (su perro de él) = "Elle aime son chien" (su perro de ella)',
      '"Leur livre" (singular) vs "Leurs livres" (plural): leur concuerda con el objeto, no con el poseedor',
    ],
  },

  seo: [
    {
      heading: '¿Por qué los posesivos franceses son diferentes al español?',
      paragraphs: [
        'En español, el posesivo concuerda con el poseedor: "su madre" (de él o de ella). En francés, el posesivo concuerda con el objeto poseído: "sa mère" (madre femenina, independientemente de si el poseedor es hombre o mujer). Esto es la diferencia clave que muchos hispanohablantes confunden al principio.',
        'Ejemplo: "Son père est médecin" puede significar tanto "Su padre es médico" (de él) como "Su padre es médico" (de ella). El contexto determina quién es el poseedor, pero la forma "son" siempre se usa porque "père" es masculino.',
      ],
    },
    {
      heading: '¿Cómo son los posesivos del singular en francés (mon/ma/mes)?',
      paragraphs: [
        'Para las tres primeras personas del singular, el posesivo tiene tres formas: masculino singular, femenino singular y plural. Por ejemplo: "mon livre" (mi libro, masc.), "ma sœur" (mi hermana, fem.), "mes amis" (mis amigos, pl.).',
        'La forma plural (mes/tes/ses) se usa tanto para masculino como para femenino plural: "mes frères" y "mes sœurs" usan ambos "mes".',
      ],
      table: [
        ['Poseedor', 'Con "livre" (masc.)', 'Con "maison" (fem.)', 'Con "amis" (pl.)'],
        ['je', 'mon livre', 'ma maison', 'mes amis'],
        ['tu', 'ton livre', 'ta maison', 'tes amis'],
        ['il/elle', 'son livre', 'sa maison', 'ses amis'],
      ],
    },
    {
      heading: 'Mon/ton/son ante femeninos con vocal',
      paragraphs: [
        'Cuando un sustantivo femenino comienza por vocal o h muda, las formas "ma/ta/sa" se convierten en "mon/ton/son" para facilitar la pronunciación: "mon amie" (no "ma amie"), "ton école" (no "ta école"), "son histoire" (no "sa histoire").',
        'Esta regla es fonética — se evita el choque de dos vocales (hiato). Es similar a "l\'ami" en lugar de "la ami" con los artículos.',
      ],
    },
    {
      heading: '¿Cómo son los posesivos del plural en francés (notre/votre/leur)?',
      paragraphs: [
        'Para la primera y segunda personas del plural (nosotros, vosotros), el posesivo tiene solo dos formas: singular (notre/votre) y plural (nos/vos). "Notre maison" (nuestra casa), "nos amis" (nuestros amigos), "votre professeur" (su/vuestro profesor), "vos livres" (sus/vuestros libros).',
        '"Leur" (tercera persona plural) también tiene dos formas: "leur" para singular y "leurs" para plural del objeto: "leur chien" (su perro — de ellos), "leurs enfants" (sus hijos — de ellos).',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Los posesivos franceses concuerdan con el objeto poseído, no con el poseedor.',
    graphicPrompt: 'Tabla de posesivos con ejemplos de concordancia de género y número.',
    scene: [
      ['mon/ma/mes', 'mon livre, ma maison, mes amis'],
      ['ton/ta/tes', 'ton sac, ta sœur, tes cours'],
      ['son/sa/ses', 'son père, sa mère, ses enfants'],
      ['notre/nos', 'notre école, nos étudiants'],
      ['votre/vos', 'votre professeur, vos exercices'],
      ['leur/leurs', 'leur maison, leurs livres'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['mon/ton/son ante vocal femenina', 'son = de él O de ella', 'leur/leurs concordancia'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige el adjetivo posesivo correcto según el poseedor y el género del objeto.',
        type: 'choice',
        items: [
          {
            scene: 'Tomás presenta a su familia',
            lines: [['Tomás', '___ mère s\'appelle Carmen. (yo)']],
            options: ['Ma', 'Mon', 'Mes', 'Sa'],
            answer: 'Ma',
            explain: '"Mère" es femenino singular. Poseedor = yo → "ma". (No empieza por vocal.)',
          },
          {
            scene: 'Carlos habla de su amigo',
            lines: [['Carlos', 'C\'est ___ ami. (yo, "ami" masc. con vocal inicial)']],
            options: ['mon', 'ma', 'mes', 'son'],
            answer: 'mon',
            explain: '"Ami" empieza por vocal → aunque es masc., usamos "mon". Además, "ami" ya es masc. → mon.',
          },
          {
            scene: 'Elena habla de Ana',
            lines: [['Elena', 'Ana aime ___ cours de français. (ella)']],
            options: ['ses', 'son', 'sa', 'leur'],
            answer: 'ses',
            explain: '"Cours" es plural → "ses". Poseedor = ella (son/sa/ses).',
          },
          {
            scene: 'Lina habla de su escuela',
            lines: [['Lina', '___ école est très grande. (yo, "école" fem. con vocal)']],
            options: ['Mon', 'Ma', 'Mes', 'Ton'],
            answer: 'Mon',
            explain: '"École" comienza por vocal Y es femenino → "mon" (no "ma"). Regla ante vocal.',
          },
          {
            scene: 'Marco habla de Carlos',
            lines: [['Marco', 'Carlos a deux sœurs. ___ sœurs habitent à Bogotá.']],
            options: ['Ses', 'Son', 'Sa', 'Leur'],
            answer: 'Ses',
            explain: '"Sœurs" es femenino plural. Poseedor = él (il) → "ses".',
          },
          {
            scene: 'Sofia y Ana describen su clase',
            lines: [['Sofia & Ana', '___ professeur est excellent. (nosotras)']],
            options: ['Notre', 'Nos', 'Leur', 'Votre'],
            answer: 'Notre',
            explain: '"Professeur" es singular. Poseedor = nosotras (nous) → "notre".',
          },
          {
            scene: 'Tomás habla de los estudiantes',
            lines: [['Tomás', 'Les étudiants ont fini ___ exercices. (ellos)']],
            options: ['leurs', 'leur', 'ses', 'nos'],
            answer: 'leurs',
            explain: '"Exercices" es plural. Poseedor = ellos (ils) → "leurs".',
          },
          {
            scene: 'Ana pregunta a Carlos',
            lines: [['Ana', 'C\'est ___ frère ou ___ ami ? (tu, masc. sing.)']],
            options: ['ton / ton', 'ta / ta', 'mon / mon', 'son / son'],
            answer: 'ton / ton',
            explain: '"Frère" y "ami" son masc. sing. Poseedor = tú → "ton frère", "ton ami".',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos decisiones',
        tag: '2 espacios',
        intro: 'Elige el posesivo correcto para dos objetos poseídos distintos.',
        type: 'dual',
        items: [
          {
            scene: 'Marco presenta su familia',
            lines: [['Marco', '[[0]] père est ingénieur et [[1]] mère est médecin. (yo)']],
            blanks: [
              { options: ['Mon', 'Ma', 'Mes', 'Son'], answer: 'Mon', explain: '"Père" es masc. sing., poseedor = yo → "mon".' },
              { options: ['ma', 'mon', 'mes', 'sa'], answer: 'ma', explain: '"Mère" es fem. sing., poseedor = yo → "ma".' },
            ],
          },
          {
            scene: 'Elena habla de Tomás',
            lines: [['Elena', '[[0]] méthode est unique et [[1]] cours sont excellents.']],
            blanks: [
              { options: ['Sa', 'Son', 'Ses', 'Leur'], answer: 'Sa', explain: '"Méthode" es fem. sing., poseedor = él → "sa".' },
              { options: ['ses', 'son', 'sa', 'leurs'], answer: 'ses', explain: '"Cours" es masc. plural, poseedor = él → "ses".' },
            ],
          },
          {
            scene: 'Carlos y Lina hablan de su escuela',
            lines: [['Carlos & Lina', '[[0]] classe commence à 9h et [[1]] professeurs sont sympas. (nosotros)']],
            blanks: [
              { options: ['Notre', 'Nos', 'Leur', 'Votre'], answer: 'Notre', explain: '"Classe" es sing., poseedor = nosotros → "notre".' },
              { options: ['nos', 'notre', 'leur', 'votre'], answer: 'nos', explain: '"Professeurs" es plural, poseedor = nosotros → "nos".' },
            ],
          },
          {
            scene: 'Sofia habla de sus amigas',
            lines: [['Sofia', '[[0]] amie s\'appelle Ana et [[1]] amies habitent toutes à Lyon.']],
            blanks: [
              { options: ['Son', 'Sa', 'Ses', 'Mon'], answer: 'Son', explain: '"Amie" comienza por vocal → aunque fem., se usa "son" (poseedor = ella).' },
              { options: ['ses', 'son', 'sa', 'mes'], answer: 'ses', explain: '"Amies" es plural → "ses".' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Presentaciones en familia',
        tag: 'Texto guiado',
        intro: 'Tomás presenta a su familia. Elige el posesivo correcto para cada objeto poseído.',
        type: 'guidedText',
        scene: 'Tomás presenta a su familia en WeLearn. Elige el posesivo correcto en cada caso.',
        text: 'Bonjour, je m\'appelle Tomás. [[0]] famille est grande. [[1]] père s\'appelle Carlos et [[2]] mère s\'appelle Carmen. J\'ai une sœur — [[3]] sœur habite à Medellín. J\'ai aussi un frère — [[4]] frère est étudiant. [[5]] parents sont professeurs aussi. Et vous ? Comment s\'appelle [[6]] famille ?',
        blanks: [
          { options: ['Ma', 'Mon', 'Mes', 'Sa'], answer: 'Ma', explain: '"Famille" es fem. sing., poseedor = yo → "ma".' },
          { options: ['Mon', 'Ma', 'Mes', 'Son'], answer: 'Mon', explain: '"Père" es masc. sing., poseedor = yo → "mon".' },
          { options: ['ma', 'mon', 'mes', 'sa'], answer: 'ma', explain: '"Mère" es fem. sing., poseedor = yo → "ma".' },
          { options: ['ma', 'mon', 'mes', 'sa'], answer: 'ma', explain: '"Sœur" es fem. sing., poseedor = yo → "ma".' },
          { options: ['mon', 'ma', 'mes', 'son'], answer: 'mon', explain: '"Frère" es masc. sing., poseedor = yo → "mon".' },
          { options: ['Mes', 'Mon', 'Ma', 'Ses'], answer: 'Mes', explain: '"Parents" es plural, poseedor = yo → "mes".' },
          { options: ['votre', 'notre', 'vos', 'nos'], answer: 'votre', explain: '"Famille" es sing., poseedor = vosotros/usted → "votre".' },
        ],
      },
      {
        id: 'l4',
        title: 'Escribe el posesivo',
        tag: 'Texto libre',
        intro: 'Escribe el adjetivo posesivo correcto en cada espacio.',
        type: 'freeText',
        scene: 'Ana describe la clase de WeLearn. Escribe el posesivo correcto en cada hueco.',
        text: 'Dans [[0]] classe (notre), il y a 12 étudiants. [[1]] professeur (notre) s\'appelle Tomás. Chaque étudiant a [[2]] propre méthode (sa/leur — chaque étudiant). Sofia oublie souvent [[3]] cahier (son). Carlos n\'oublie jamais [[4]] devoirs (ses).',
        blanks: [
          { answer: 'notre', accepted: ['notre', 'Notre'], explain: '"Classe" es sing., poseedor = nosotros → "notre".' },
          { answer: 'Notre', accepted: ['Notre', 'notre'], explain: '"Professeur" es sing., poseedor = nosotros → "notre".' },
          { answer: 'sa', accepted: ['sa', 'Sa'], explain: '"Méthode" es fem. sing., poseedor = él/ella (chaque étudiant) → "sa".' },
          { answer: 'son', accepted: ['son', 'Son'], explain: '"Cahier" es masc. sing., poseedor = ella (Sofia) → "son".' },
          { answer: 'ses', accepted: ['ses', 'Ses'], explain: '"Devoirs" es plural, poseedor = él (Carlos) → "ses".' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones sobre los personajes usando posesivos correctos.',
        type: 'write',
        items: [
          {
            scene: 'Lina habla de su familia',
            prompt: 'Di que Lina tiene una hermana y que su hermana vive en París.',
            answer: 'Lina a une sœur. Sa sœur habite à Paris.',
            accepted: ['sa sœur', 'son ami', 'sa mère', 'ses parents'],
            explain: '"Sœur" es fem., poseedor = Lina (elle) → "sa sœur".',
          },
          {
            scene: 'Marco presenta su clase',
            prompt: 'Di que Marco y sus compañeros tienen su examen mañana (notre/nos).',
            answer: 'Notre examen est demain. Nos professeurs nous ont préparés.',
            accepted: ['notre examen', 'nos professeurs', 'notre cours'],
            explain: '"Examen" es sing. → "notre"; "professeurs" es plural → "nos".',
          },
          {
            scene: 'Sofia describe a Elena',
            prompt: 'Di que Elena tiene su método propio y sus estudiantes la adoran.',
            answer: 'Elena a sa propre méthode. Ses étudiants l\'adorent.',
            accepted: ['sa propre méthode', 'sa méthode', 'ses étudiants'],
            explain: '"Méthode" fem. sing. → sa. "Étudiants" plural → ses.',
          },
          {
            scene: 'Carlos y Ana hablan de sus amigos',
            prompt: 'Di que Carlos y Ana tienen sus propios amigos en Lyon (leur/leurs).',
            answer: 'Carlos et Ana ont leurs amis à Lyon.',
            accepted: ['leurs amis', 'leur ami', 'leurs'],
            explain: '"Amis" es plural → "leurs" (poseedor = ellos, ils).',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión: Mi familia / mis cosas',
        tag: 'Producción',
        intro: 'Misión: Escribe una presentación breve de tu familia o tus cosas usando al menos 4 posesivos distintos.',
        type: 'write',
        items: [
          {
            scene: 'Presenta a alguien de tu familia (mon/ma/mes)',
            prompt: 'Describe a un familiar: nombre, qué hace, dónde vive (usa mon/ma/mes).',
            answer: 'Ma mère s\'appelle Carmen. Elle est professeure. Mon frère habite à Madrid.',
            accepted: ['mon ', 'ma ', 'mes '],
            explain: 'Ejemplo: Ma sœur s\'appelle Ana. Mon père est ingénieur. Mes parents habitent à Bogotá.',
          },
          {
            scene: 'Describe algo tuyo (ton/ta/tes o son/sa/ses)',
            prompt: 'Habla de un amigo/a: su nombre, su trabajo, sus hobbies (usa son/sa/ses).',
            answer: 'Mon ami s\'appelle Carlos. Sa femme est médecin. Ses hobbies sont le sport et la lecture.',
            accepted: ['son ', 'sa ', 'ses '],
            explain: 'Ejemplo: Son nom est Marco. Sa famille est à Lyon. Ses cours commencent à 8h.',
          },
          {
            scene: 'Habla de tu grupo (notre/nos)',
            prompt: 'Describe tu clase de francés: vuestro profesor, vuestros ejercicios (notre/nos).',
            answer: 'Notre professeur est excellent. Nos cours sont le mardi et le jeudi.',
            accepted: ['notre ', 'nos '],
            explain: 'Ejemplo: Notre classe est petite. Nos exercices sont difficiles mais intéressants.',
          },
        ],
      },
    ],
  },
}

export default topic
