import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'articoli',
  order: '04',
  color: '#b45309',
  category: 'Artículos',
  level: 'A1',
  title: 'Articoli en italiano A1 — Artículos determinativos e indeterminativos',
  shortTitle: 'Articoli (il/la/un/una)',
  metaTitle: 'Artículos italiano A1 — il la lo l\' i gli le un una uno',
  description:
    'Los artículos del italiano son más variados que en español: il, lo, la, l\' (determinativos singulares) e i, gli, le (determinativos plurales); un, uno, una, un\' (indeterminativos). La elección depende del género, el número y la letra inicial del sustantivo.',
  lead: 'il/la/lo/l\' + i/gli/le (el/la + los/las). un/una/uno (un/una). La elección depende de género y de si el sustantivo empieza por vocal, s+consonante, z, gn, ps. Más complejo que en español, pero hay patrones claros.',
  outcomes: [
    'Usa il, lo, la, l\' para el artículo determinativo singular',
    'Usa i, gli, le para el artículo determinativo plural',
    'Usa un, uno, una, un\' para el artículo indeterminativo',
  ],

  guide: {
    goal: 'Elegir el artículo correcto en italiano según el género, número y letra inicial del sustantivo.',
    model: 'il libro (el libro), la casa (la casa), lo studente (el estudiante), l\'amico (el amigo)',
    formula: '[artículo según género/inicial] + sustantivo',
    decisions: [
      'Masculino singular: IL (consonante normal), LO (s+cons, z, gn, ps, y), L\' (vocal)',
      'Femenino singular: LA (consonante), L\' (vocal)',
      'Masculino plural: I (normal), GLI (s+cons, z, gn, ps, y, vocal)',
      'Femenino plural: LE (siempre)',
      'Indeterminado masc: UN (consonante/vocal sin z,gn), UNO (s+cons, z, gn, ps, y)',
      'Indeterminado fem: UNA (consonante), UN\' (vocal)',
    ],
    table: [
      ['', 'Masculino', 'Femenino'],
      ['Det. singular', 'il/lo/l\'', 'la/l\''],
      ['Det. plural', 'i/gli', 'le'],
      ['Indet. singular', 'un/uno', 'una/un\''],
    ],
    mistakes: [
      'Lo, non il, davanti a s+consonante: lo studente ✓ | il studente ✗',
      'L\' (apostrofo) davanti a vocale: l\'amico ✓ | il amico ✗',
      'GLI (non i) davanti a vocale maschile: gli amici ✓ | i amici ✗',
    ],
  },
  seo: [
    {
      heading: 'Artículos italianos: más formas, misma lógica',
      paragraphs: [
        'El italiano tiene más formas de artículo que el español debido a reglas de eufonía (sonoridad). El sistema masculino tiene tres formas singulares (il, lo, l\') y dos plurales (i, gli), mientras el español solo tiene "el" y "los". El femenino es más simple: la/l\' y le.',
        'La regla clave para los artículos masculinos: usa "lo" (no "il") antes de sustantivos que empiezan por s+consonante (lo studente), z (lo zoo), gn (lo gnomo), ps (lo psicologo), y (lo yogurt). Ante vocal, siempre "l\'" (l\'amico, l\'errore). Para todo lo demás masculino: "il" (il libro, il treno).',
      ],
    },
    {
      heading: 'Artículo determinativo vs indeterminativo',
      paragraphs: [
        'El artículo determinativo (il, lo, la, l\', i, gli, le) corresponde al español "el, la, los, las" — se usa cuando nos referimos a algo específico o ya conocido. El indeterminativo (un, uno, una, un\') corresponde a "un, una" — para mencionar algo por primera vez o de forma genérica.',
        '"Ho un libro" (tengo un libro, cualquiera) vs "Ho il libro" (tengo el libro, uno específico). La lógica es idéntica al español, solo cambian las formas. Una vez memorizadas las formas con sus reglas de distribución, el sistema es predecible.',
      ],
    },
  ],
  visual: {
    mode: 'article-grid',
    teacherLens: 'El estudiante aprende las 7 formas de artículo y cuándo usar lo/gli vs il/i.',
    graphicPrompt: 'Tabla artículos masculino/femenino × determinado/indeterminado. Lo/gli en rojo.',
    scene: [
      ['il / lo / l\' → i / gli', 'masculino det. sg → pl'],
      ['la / l\' → le', 'femenino det. sg → pl'],
      ['un / uno / una / un\'', 'indeterminado sg'],
    ],
    learnerModes: ['visual: tabla con ejemplos', 'analítico: reglas de distribución', 'oral: lista de sustantivos con artículo'],
    reviewFocus: ['lo vs il', 'l\' ante vocal', 'gli ante vocal/s+cons', 'un\' femenino ante vocal'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Artículo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el artículo correcto para cada sustantivo.',
        type: 'choice',
        items: [
          {
            scene: 'Un objeto de clase',
            lines: [['David', '___ libro è sulla scrivania.']],
            options: ['Il', 'Lo', 'La', 'L\''],
            answer: 'Il',
            explain: 'Libro: masculino, empieza por L (consonante normal) → il.',
          },
          {
            scene: 'El estudiante',
            lines: [['Zhanna', '___ studente è molto bravo.']],
            options: ['Lo', 'Il', 'La', 'I'],
            answer: 'Lo',
            explain: 'Studente: masculino, empieza por st (s+consonante) → lo.',
          },
          {
            scene: 'El amigo',
            lines: [['Sofia', '___ amico di Marco si chiama Luca.']],
            options: ['L\'', 'Il', 'Lo', 'La'],
            answer: 'L\'',
            explain: 'Amico: masculino, empieza por vocal (a) → l\'.',
          },
          {
            scene: 'La casa',
            lines: [['Carlo', '___ casa di Sofia è grande.']],
            options: ['La', 'Il', 'Lo', 'Le'],
            answer: 'La',
            explain: 'Casa: femenino, empieza por consonante → la.',
          },
          {
            scene: 'Los libros',
            lines: [['Marco', '___ libri sono interessanti.']],
            options: ['I', 'Gli', 'Le', 'Il'],
            answer: 'I',
            explain: 'Libri: masculino plural, l normal → i.',
          },
          {
            scene: 'Los amigos',
            lines: [['Ana', '___ amici di Sofia sono simpatici.']],
            options: ['Gli', 'I', 'Le', 'L\''],
            answer: 'Gli',
            explain: 'Amici: masculino plural, empieza por vocal → gli.',
          },
          {
            scene: 'Una pizza',
            lines: [['Lina', 'Voglio mangiare ___ pizza margherita.']],
            options: ['una', 'un', 'uno', 'la'],
            answer: 'una',
            explain: 'Pizza: femenino, consonante → una.',
          },
          {
            scene: 'Un estudiante',
            lines: [['David', 'Oggi abbiamo ___ studente nuovo in classe.']],
            options: ['uno', 'un', 'una', 'un\''],
            answer: 'uno',
            explain: 'Studente: masculino, s+consonante → uno.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Artículos en pareja',
        tag: '2 espacios',
        intro: 'Completa los dos artículos del enunciado.',
        type: 'dual',
        items: [
          {
            scene: 'El libro y el cuaderno',
            lines: [['Sofia', '[[0]] libro è rosso e [[1]] quaderno è blu.']],
            blanks: [
              { options: ['Il', 'Lo', 'La'], answer: 'Il', explain: 'Libro: masc, consonante → il.' },
              { options: ['il', 'lo', 'la'], answer: 'il', explain: 'Quaderno: masc, consonante → il.' },
            ],
          },
          {
            scene: 'La casa y el appartamento',
            lines: [['Carlo', '[[0]] casa è piccola ma [[1]] appartamento è grande.']],
            blanks: [
              { options: ['La', 'Il', 'Lo'], answer: 'La', explain: 'Casa: femenino → la.' },
              { options: ['l\'', 'il', 'lo'], answer: 'l\'', explain: 'Appartamento: masc, vocal → l\'.' },
            ],
          },
          {
            scene: 'Los estudiantes y los profesores',
            lines: [['Zhanna', '[[0]] studenti e [[1]] professori sono in classe.']],
            blanks: [
              { options: ['Gli', 'I', 'Le'], answer: 'Gli', explain: 'Studenti: masc pl, s+cons → gli.' },
              { options: ['i', 'gli', 'le'], answer: 'i', explain: 'Professori: masc pl, consonante → i.' },
            ],
          },
          {
            scene: 'Un amigo y una amiga',
            lines: [['Marco', 'Ho [[0]] amico italiano e [[1]] amica spagnola.']],
            blanks: [
              { options: ['un', 'uno', 'una'], answer: 'un', explain: 'Amico: masc, no z/gn/s+cons → un.' },
              { options: ['un\'', 'una', 'un'], answer: 'un\'', explain: 'Amica: fem, vocal → un\'.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Completa con el artículo correcto.',
        type: 'guidedText',
        scene: 'Descripción de la aula de italiano',
        text: 'In [[0]] aula ci sono [[1]] studenti e [[2]] professoressa. [[3]] finestra è grande — entra molta luce. [[4]] studente nuovo si chiama Marco — è [[5]] amico di Sofia. Abbiamo [[6]] libro di grammatica italiana.',
        blanks: [
          { options: ['l\'', 'la', 'il'], answer: 'l\'', explain: 'Aula: fem, vocal → l\'.' },
          { options: ['gli', 'i', 'le'], answer: 'gli', explain: 'Studenti: masc pl, s+cons → gli.' },
          { options: ['una', 'un\'', 'un'], answer: 'una', explain: 'Professoressa: fem, consonante → una.' },
          { options: ['La', 'Il', 'Lo'], answer: 'La', explain: 'Finestra: fem, consonante → la.' },
          { options: ['Lo', 'Il', 'L\''], answer: 'Lo', explain: 'Studente: masc, s+cons → lo.' },
          { options: ['un', 'un\'', 'uno'], answer: 'un', explain: 'Amico: masc, vocal pero → un (no z/gn/s+cons).' },
          { options: ['un', 'uno', 'una'], answer: 'un', explain: 'Libro: masc, consonante → un.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe el artículo sin opciones.',
        type: 'freeText',
        scene: 'Descripción de una ciudad italiana',
        text: 'Roma è [[0]] città bellissima. Ho visitato [[1]] Colosseo e [[2]] Pantheon. Ci sono [[3]] chiese magnifiche. [[4]] pizza romana è diversa da [[5]] pizza napoletana. Ho incontrato [[6]] amico italiano molto simpatico.',
        blanks: [
          { answer: 'una', explain: 'Città: fem, consonante → una.' },
          { answer: 'il', explain: 'Colosseo: masc, consonante → il.' },
          { answer: 'il', explain: 'Pantheon: masc, consonante → il.' },
          { answer: 'delle', accepted: ['molte'], explain: 'Chiese: fem plural → le. Con "ci sono" → delle (partitivo).' },
          { answer: 'La', explain: 'Pizza: fem, consonante → la.' },
          { answer: 'la', explain: 'Pizza (segunda): fem → la.' },
          { answer: 'un', explain: 'Amico: masc, vocal → un (no s+cons/z/gn).' },
        ],
      },
      {
        id: 'l5',
        title: 'Artículos en frases',
        tag: 'Producción',
        intro: 'Escribe la frase completa con el artículo correcto.',
        type: 'write',
        items: [
          {
            scene: 'El libro está en la mesa',
            prompt: 'Escribe: El libro está en la mesa. → ___ libro è sul tavolo.',
            answer: 'Il libro è sul tavolo.',
            accepted: ['il libro è sul tavolo', 'il libro è sul tavolo.'],
            explain: 'Libro: masc, consonante → il.',
          },
          {
            scene: 'Los estudiantes',
            prompt: 'Escribe: Los estudiantes están en el aula. → ___ studenti sono in classe.',
            answer: 'Gli studenti sono in classe.',
            accepted: ['gli studenti sono in classe', 'gli studenti sono in classe.'],
            explain: 'Studenti: masc pl, s+cons → gli.',
          },
          {
            scene: 'Una pizza',
            prompt: 'Escribe: Quiero una pizza. → Voglio ___ pizza.',
            answer: 'Voglio una pizza.',
            accepted: ['voglio una pizza', 'voglio una pizza.'],
            explain: 'Pizza: fem, consonante → una.',
          },
          {
            scene: 'El amigo',
            prompt: 'Escribe: El amigo de Carlo es simpático. → ___ amico di Carlo è simpatico.',
            answer: 'L\'amico di Carlo è simpatico.',
            accepted: ['l\'amico di carlo è simpatico', 'l\'amico di carlo è simpatico.'],
            explain: 'Amico: masc, vocal → l\'.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Describe tu lugar favorito usando artículos italianos correctos.',
        type: 'write',
        items: [
          {
            scene: 'Tu ciudad',
            prompt: 'La mia città si chiama ___. ___ centro storico è ___. Ci sono ___ musei bellissimi.',
            answer: 'La mia città si chiama Bogotá. Il centro storico è antico. Ci sono dei musei bellissimi.',
            accepted: [
              'la mia città si chiama bogotá il centro storico è antico ci sono dei musei bellissimi',
              'la mia città si chiama madrid il centro storico è bello ci sono dei musei bellissimi',
            ],
            explain: 'Il centro: masc consonante → il. Musei: masc pl consonante → i o dei.',
          },
          {
            scene: 'Tu casa',
            prompt: 'Descrivi la tua casa: In ___ mia casa c\'è ___ cucina grande e ___ soggiorno accogliente.',
            answer: 'In mia casa c\'è una cucina grande e un soggiorno accogliente.',
            accepted: ['in mia casa c\'è una cucina grande e un soggiorno accogliente'],
            explain: 'Cucina: fem → una. Soggiorno: masc consonante → un.',
          },
          {
            scene: 'Tu clase de italiano',
            prompt: '___  studenti di italiano sono ___. ___ professoressa insegna ___.',
            answer: 'Gli studenti di italiano sono bravi. La professoressa insegna bene.',
            accepted: ['gli studenti di italiano sono bravi la professoressa insegna bene'],
            explain: 'Studenti s+cons masc pl → gli. Professoressa fem → la.',
          },
        ],
      },
    ],
  },
}

export default topic
