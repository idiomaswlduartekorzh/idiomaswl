import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'accord-participe-passe',
  order: '20',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'A2',
  title: 'Acuerdo del participio pasado en francés A2: con avoir y être',
  shortTitle: 'Acuerdo participio pasado',
  metaTitle: 'Acuerdo del participio pasado francés A2 — avoir, être, COD, accord participe passé',
  description:
    'El participio pasado en francés concuerda en género y número según el auxiliar y el contexto. Con être: concuerda siempre con el sujeto (il est allé / elle est allée / ils sont allés / elles sont allées). Con avoir: no concuerda normalmente, PERO concuerda con el COD si este va ANTES del verbo (Les fleurs que j\'ai achetées — que = COD femenino plural → achetées). Los verbos pronominales usan être y concuerdan con el sujeto.',
  lead: 'Elle est partie / les livres qu\'il a achetés: las reglas de acuerdo del participio pasado en A2.',
  outcomes: [
    'Acordar el participio pasado con être según el sujeto',
    'No acordar el participio con avoir en posición normal',
    'Acordar el participio con avoir cuando el COD va antes',
    'Aplicar el acuerdo con verbos pronominales',
  ],

  guide: {
    goal: 'Aplicar correctamente el acuerdo del participio pasado con être y avoir.',
    model: 'Elle est arrivée en retard. (Llegó tarde.) / Les fleurs qu\'il a achetées sont magnifiques. (Las flores que compró son magníficas.)',
    formula: 'être: p.p. + accord sujet | avoir: p.p. sans accord, SAUF COD avant verbe → accord COD',
    decisions: [
      'Avec être: "Elle est partie" (fém. sg) / "Ils sont partis" (masc. pl) / "Elles sont parties" (fém. pl)',
      'Avec avoir normal: "Elle a mangé une pizza" — mangé sans accord',
      'Avoir + COD avant: "La pizza qu\'elle a mangée" — mangée (fém. sg = que = pizza)',
      'Pronominal avec être: "Elles se sont levées tôt" — levées (accord sujeto fém. pl)',
      'Accord -e (fém. sg) / -s (masc. pl) / -es (fém. pl)',
    ],
    table: [
      ['Auxiliaire', 'Règle accord', 'Exemple'],
      ['être', 'siempre con sujeto', 'Elle est tombée / Ils sont venus'],
      ['avoir (normal)', 'sin acuerdo', 'Elle a mangé / Ils ont vu'],
      ['avoir (COD avant)', 'acuerdo con COD', 'Les films qu\'il a vus / La lettre qu\'elle a écrite'],
    ],
    mistakes: [
      '"Elle a mangée une pizza" ❌ → "Elle a mangé une pizza" ✓ — avec avoir, no acuerdo si COD va después.',
      '"Il est allé" ✓ vs "Elle est allée" ✓ — avec être el acuerdo es obligatorio según el sujeto.',
      '"La lettre qu\'il a écrit" ❌ → "la lettre qu\'il a écrite" ✓ — que = lettre (fém.) → écrite.',
    ],
  },

  seo: [
    {
      heading: 'Acuerdo con être: siempre con el sujeto',
      paragraphs: [
        'Con el auxiliar être, el participio pasado concuerda siempre en género y número con el sujeto. Los verbos que usan être son: los 17 verbos de movimiento/estado (aller, venir, partir, arriver, entrer, sortir, naître, mourir, tomber, rester, devenir, etc.) y todos los verbos pronominales. "Il est parti" (masc. sg) / "Elle est partie" (fém. sg) / "Ils sont partis" (masc. pl) / "Elles sont parties" (fém. pl).',
        'Para los verbos pronominales: "Elle s\'est levée" (elle = fém. sg → levée), "Ils se sont parlé" (se parler = COI, no acuerdo — excepción avanzada). En A2, la regla general es: pronominal + être → acuerdo con sujeto.',
      ],
    },
    {
      heading: 'Acuerdo con avoir: solo cuando el COD va antes',
      paragraphs: [
        'Con avoir, el participio NO concuerda en la mayoría de los casos: "J\'ai mangé une pizza" / "Elle a vu ses amis" — sin acuerdo. PERO si el COD (complemento directo) está colocado ANTES del verbo (pronombre COD o relativo que), el participio concuerda con ese COD: "Je les ai vus" (les = masc. pl → vus), "La robe qu\'elle a achetée" (qu\' = la robe, fém. sg → achetée).',
        'Terminaciones del acuerdo: femenino singular → -e (mangée, vue); masculino plural → -s (mangés, vus); femenino plural → -es (mangées, vues). Para participios que ya terminan en -s (pris, mis): el masculino plural no cambia (pris), el femenino añade -e (prise) y el femenino plural añade -es (prises).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'être → accord sujet | avoir → accord si COD avant. Terminaciones: -e/-s/-es.',
    graphicPrompt: 'Tabla comparativa: être (flecha al sujeto) vs avoir (flecha al COD anterior).',
    scene: [
      ['Elle est arrivée à l\'heure — il est arrivé en retard.', 'Ella llegó a tiempo — él llegó tarde.'],
      ['Ils sont partis tôt — elles sont restées plus longtemps.', 'Ellos se fueron pronto — ellas se quedaron más tiempo.'],
      ['J\'ai mangé une tarte. — La tarte que j\'ai mangée était délicieuse.', 'Comí una tarta. — La tarta que comí era deliciosa.'],
      ['Les livres qu\'elle a lus sont intéressants.', 'Los libros que ella leyó son interesantes.'],
      ['Elle s\'est levée à 6h.', 'Se levantó a las 6h.'],
      ['Où sont les clés que tu as prises ?', '¿Dónde están las llaves que cogiste?'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['être → accord sujeto siempre', 'avoir → sin acuerdo normal', 'avoir + COD antes → accord COD', 'terminaciones -e/-s/-es'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Acuerdo con être o sin acuerdo con avoir',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma correcta del participio pasado.',
        type: 'choice',
        items: [
          {
            scene: 'Marie ___ (arriver) à midi.',
            lines: [['', 'Marie est ___ à midi.']],
            options: ['arrivée', 'arrivé', 'arrivées', 'arriver'],
            answer: 'arrivée',
            explain: '"est arrivée" — être + Marie (fém. sg) → arrivée (-e).',
          },
          {
            scene: 'Elles ___ (partir) en vacances.',
            lines: [['', 'Elles sont ___ en vacances.']],
            options: ['parties', 'parti', 'partie', 'partis'],
            answer: 'parties',
            explain: '"sont parties" — être + elles (fém. pl) → parties (-es).',
          },
          {
            scene: 'J\'___ (manger) une pizza hier soir.',
            lines: [['', 'J\'ai ___ une pizza hier soir.']],
            options: ['mangé', 'mangée', 'mangés', 'mangées'],
            answer: 'mangé',
            explain: '"ai mangé" — avoir + COD après → pas d\'accord. mangé invariable.',
          },
          {
            scene: 'La pizza qu\'il ___ (commander) était froide.',
            lines: [['', 'La pizza qu\'il a ___ était froide.']],
            options: ['commandée', 'commandé', 'commandées', 'commander'],
            answer: 'commandée',
            explain: '"a commandée" — avoir + COD (qu\' = pizza, fém. sg) avant → commandée (-e).',
          },
          {
            scene: 'Les enfants sont ___ (tomber) dans le jardin.',
            lines: [['', 'Les enfants sont ___ dans le jardin.']],
            options: ['tombés', 'tombée', 'tombé', 'tombées'],
            answer: 'tombés',
            explain: '"sont tombés" — être + les enfants (masc. pl) → tombés (-s).',
          },
          {
            scene: 'Les lettres que j\'___ (écrire) sont sur la table.',
            lines: [['', 'Les lettres que j\'ai ___ sont sur la table.']],
            options: ['écrites', 'écrit', 'écrits', 'écrite'],
            answer: 'écrites',
            explain: '"ai écrites" — avoir + COD (que = les lettres, fém. pl) avant → écrites (-es).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Acuerdo en pares',
        tag: '2 espacios',
        intro: 'Completa con las dos formas correctas del participio.',
        type: 'dual',
        items: [
          {
            scene: 'Él llegó / ella llegó.',
            lines: [['', 'Il est [[0]] à 8h. Elle est [[1]] à 9h.']],
            blanks: [
              { options: ['arrivé', 'arrivée', 'arrivés', 'arrivées'], answer: 'arrivé', explain: '"est arrivé" — être + il (masc. sg) → arrivé (sin -e).' },
              { options: ['arrivée', 'arrivé', 'arrivés', 'arrivées'], answer: 'arrivée', explain: '"est arrivée" — être + elle (fém. sg) → arrivée (-e).' },
            ],
          },
          {
            scene: 'Los libros que compré / la carta que escribí.',
            lines: [['', 'Les livres que j\'ai [[0]] / La lettre que j\'ai [[1]].']],
            blanks: [
              { options: ['achetés', 'acheté', 'achetée', 'achetées'], answer: 'achetés', explain: '"ai achetés" — COD (que = les livres, masc. pl) avant → achetés (-s).' },
              { options: ['écrite', 'écrit', 'écrits', 'écrites'], answer: 'écrite', explain: '"ai écrite" — COD (que = la lettre, fém. sg) avant → écrite (-e).' },
            ],
          },
          {
            scene: 'Ellas se levantaron / él se acostó.',
            lines: [['', 'Elles se sont [[0]] tôt. Il s\'est [[1]] tard.']],
            blanks: [
              { options: ['levées', 'levé', 'levée', 'levés'], answer: 'levées', explain: '"se sont levées" — être + elles (fém. pl) → levées (-es).' },
              { options: ['couché', 'couchée', 'couchés', 'couchées'], answer: 'couché', explain: '"s\'est couché" — être + il (masc. sg) → couché (sin -e).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Historia con acuerdos',
        tag: 'Texto guiado',
        intro: 'Completa el texto con el participio correctamente acordado.',
        type: 'guidedText',
        scene: 'Emma raconte sa journée d\'hier.',
        text: 'Hier, je suis [[0]] (partir) de chez moi à 8h. Je suis [[1]] (arriver) à l\'université en avance. J\'ai [[2]] (voir) mes amies dans le couloir. La conférence que j\'ai [[3]] (écouter) était super intéressante. Après, nous nous sommes [[0]] (retrouver) au café.',
        blanks: [
          { options: ['partie', 'parti', 'parties', 'partis'], answer: 'partie', explain: '"suis partie" — être + je (Emma = fém. sg) → partie (-e).' },
          { options: ['arrivée', 'arrivé', 'arrivées', 'arrivés'], answer: 'arrivée', explain: '"suis arrivée" — être + je (Emma = fém. sg) → arrivée (-e).' },
          { options: ['vu', 'vue', 'vus', 'vues'], answer: 'vu', explain: '"ai vu mes amies" — avoir + COD après → pas d\'accord. vu invariable.' },
          { options: ['écoutée', 'écouté', 'écoutés', 'écoutées'], answer: 'écoutée', explain: '"ai écoutée" — avoir + COD (que = la conférence, fém. sg) avant → écoutée (-e).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el participio correcto',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe el participio con el acuerdo correcto.',
        type: 'freeText',
        scene: 'Complétez avec la bonne forme du participe passé.',
        text: 'Les filles sont ___ (partir) hier. / La maison qu\'ils ont ___ (acheter) est grande. / Nous avons ___ (manger) une excellente pizza. / Elle s\'est ___ (habiller) rapidement.',
        blanks: [
          { answer: 'parties', explain: '"sont parties" — être + les filles (fém. pl) → parties (-es).' },
          { answer: 'achetée', explain: '"ont achetée" — avoir + COD (qu\' = la maison, fém. sg) avant → achetée (-e).' },
          { answer: 'mangé', explain: '"avons mangé" — avoir + COD après → pas d\'accord. mangé invariable.' },
          { answer: 'habillée', explain: '"s\'est habillée" — être (pronominal) + elle (fém. sg) → habillée (-e).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Corrige los errores',
        tag: 'Escritura guiada',
        intro: 'Detecta y corrige el error en el acuerdo del participio.',
        type: 'write',
        items: [
          {
            scene: '"Elle a mangée une pomme." ← hay un error.',
            prompt: 'Corrige la frase.',
            answer: 'Elle a mangé une pomme.',
            accepted: ['Elle a mangé une belle pomme.'],
            explain: '"a mangé" — avoir + COD après (une pomme) → pas d\'accord. mangé invariable.',
          },
          {
            scene: '"Les clés que j\'ai perdu sont introuvables." ← hay un error.',
            prompt: 'Corrige la frase.',
            answer: 'Les clés que j\'ai perdues sont introuvables.',
            accepted: ['Les clés que j\'ai perdues sont introuvables.'],
            explain: '"ai perdues" — avoir + COD (que = les clés, fém. pl) avant → perdues (-es).',
          },
          {
            scene: '"Elles sont allé au marché." ← hay un error.',
            prompt: 'Corrige la frase.',
            answer: 'Elles sont allées au marché.',
            accepted: ['Elles sont allées faire les courses.'],
            explain: '"sont allées" — être + elles (fém. pl) → allées (-es).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Cuenta qué hiciste ayer',
        tag: 'Escritura libre',
        intro: 'Escribe sobre lo que hiciste ayer usando el passé composé con acuerdo correcto.',
        type: 'write',
        items: [
          {
            scene: 'Describe tu día de ayer usando verbos con être.',
            prompt: 'Utilisez aller, partir, arriver, rentrer, rester, se lever... Accordez le participe.',
            answer: 'Hier, je me suis levée à 7h. Je suis partie au travail à 8h. Je suis arrivée au bureau à 8h30. Je suis restée jusqu\'à 18h. Je suis rentrée à la maison épuisée.',
            accepted: ['Hier matin, je suis allé à la piscine. Je suis parti tôt le matin. Je suis resté une heure à nager. Je suis rentré à midi.'],
            explain: 'Tous avec être → accord avec je (fém. → -ée/-ée/-ée | masc. → -é/-é/-é).',
          },
          {
            scene: 'Describe 3 cosas que compraste, viste o hiciste ayer (avoir).',
            prompt: 'Utilisez avoir + COD. Attention: accord si le COD est avant le verbe.',
            answer: 'J\'ai acheté des fleurs pour ma mère — les fleurs que j\'ai achetées étaient très belles. J\'ai vu un film — le film que j\'ai vu était excellent. J\'ai lu un article — l\'article que j\'ai lu m\'a beaucoup appris.',
            accepted: ['J\'ai mangé une pizza délicieuse. La pizza que j\'ai mangée était vraiment bonne. J\'ai appelé ma sœur. La conversation que nous avons eue était longue.'],
            explain: 'avoir + COD après → pas d\'accord | avoir + COD (que/rel.) avant → accord avec le COD.',
          },
        ],
      },
    ],
  },
}

export default topic
