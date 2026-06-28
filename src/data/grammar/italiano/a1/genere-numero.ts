import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'genere-numero',
  order: '05',
  color: '#dc2626',
  category: 'Sustantivos',
  level: 'A1',
  title: 'Genere e Numero en italiano A1 — Género y plural de sustantivos',
  shortTitle: 'Genere e numero',
  metaTitle: 'Género y plural sustantivos italiano A1 — -o/-a/-e terminaciones',
  description:
    'Los sustantivos italianos tienen género (masculino/femenino) y número (singular/plural). Las terminaciones más comunes son -o (masc. sg), -a (fem. sg), -e (ambos), -i (masc. pl), -e (fem. pl) y -i (plural de -e). Hay excepciones importantes que conviene conocer desde A1.',
  lead: '-o → masculino sg | -a → femenino sg | -e → ambos géneros | plural: -o→-i, -a→-e, -e→-i. El género se aprende con el artículo: es más fácil memorizar "il libro" que "libro = masculino".',
  outcomes: [
    'Identifica el género de sustantivos por su terminación',
    'Forma el plural de sustantivos en -o, -a y -e',
    'Reconoce excepciones frecuentes como mano, problema, film',
  ],

  guide: {
    goal: 'Determinar el género de sustantivos italianos y formar el plural correctamente.',
    model: 'libro (m) → libri | casa (f) → case | studente (m) → studenti | notte (f) → notti',
    formula: '-o → -i (masc) | -a → -e (fem) | -e → -i (m/f)',
    decisions: [
      '-o singular → masculino normalmente: libro, ragazzo, gatto',
      '-a singular → femenino normalmente: casa, ragazza, tavola',
      '-e singular → puede ser masc o fem: il cane (m), la notte (f)',
      'Plural: -o → -i: libro → libri | -a → -e: casa → case | -e → -i: cane → cani',
      'Excepciones: la mano (fem, termina en -o), il problema (masc, termina en -a, de origen griego)',
      'Sustantivos invariables: il film → i film, la città → le città',
    ],
    table: [
      ['Terminación sg', 'Género habitual', 'Plural'],
      ['-o', 'masc', '-i'],
      ['-a', 'fem', '-e'],
      ['-e', 'masc o fem', '-i'],
    ],
    mistakes: [
      '"La problema" ✗ → "il problema" (términos griegos en -ma son masculinos)',
      '"La mano" ✓ — excepción famosa: mano es femenino a pesar de -o',
      'Sustantivos en -tà/-tù/-ù son femeninos invariables: la città → le città',
    ],
  },
  seo: [
    {
      heading: 'Género en italiano: masculino y femenino',
      paragraphs: [
        'En italiano, todos los sustantivos tienen género gramatical: masculino o femenino. La terminación es la pista principal: los sustantivos en -o son generalmente masculinos (il libro, il ragazzo) y los en -a son generalmente femeninos (la casa, la ragazza). Los en -e pueden ser de cualquier género (il cane = el perro, la notte = la noche) y hay que aprenderlos con su artículo.',
        'El truco más eficaz para aprender el género es memorizar siempre el sustantivo con su artículo: no "libro" sino "il libro", no "casa" sino "la casa". Si memorizas el artículo desde el principio, el género queda fijado automáticamente.',
      ],
    },
    {
      heading: 'El plural en italiano: tres patrones principales',
      paragraphs: [
        'El plural sigue tres patrones regulares: sustantivos en -o cambian a -i (libro → libri, gatto → gatti), sustantivos en -a cambian a -e (casa → case, ragazza → ragazze), y sustantivos en -e cambian a -i (cane → cani, notte → notti). Este sistema es más regular que el español, donde hay muchas variantes.',
        'Las excepciones más frecuentes en A1: sustantivos invariables (il film → i film, la città → le città), palabras de origen griego en -ma que son masculinas (il problema → i problemi, il tema → i temi), y la famosa "mano" que es femenino aunque termina en -o (la mano → le mani).',
      ],
    },
  ],
  visual: {
    mode: 'noun-chart',
    teacherLens: 'El estudiante aprende los tres patrones de plural y las excepciones más frecuentes.',
    graphicPrompt: 'Tabla sg/pl con terminaciones. Excepciones mano y problema en recuadro.',
    scene: [
      ['-o → -i', 'libro → libri'],
      ['-a → -e', 'casa → case'],
      ['-e → -i', 'cane → cani'],
    ],
    learnerModes: ['visual: tabla de terminaciones', 'analítico: excepciones y patrones', 'oral: plurales en voz alta'],
    reviewFocus: ['-e puede ser masc o fem', 'plural -e → -i', 'excepciones mano/problema', 'invariables città/film'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Género y plural',
        tag: 'Opción múltiple',
        intro: 'Elige la forma plural correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Libros',
            lines: [['David', 'Ho molti ___ di italiano.']],
            options: ['libri', 'libros', 'libre', 'libra'],
            answer: 'libri',
            explain: 'libro (-o masc) → libri (-i). Plural regular.',
          },
          {
            scene: 'Casas',
            lines: [['Sofia', 'In questa città ci sono molte ___ belle.']],
            options: ['case', 'casas', 'casi', 'casso'],
            answer: 'case',
            explain: 'casa (-a fem) → case (-e). Plural regular.',
          },
          {
            scene: 'Perros',
            lines: [['Carlo', 'Nel parco ci sono molti ___.']],
            options: ['cani', 'cane', 'canes', 'cano'],
            answer: 'cani',
            explain: 'cane (-e masc) → cani (-i). Plural regular.',
          },
          {
            scene: 'Estudiantes',
            lines: [['Zhanna', 'Gli ___ di italiano sono molto bravi.']],
            options: ['studenti', 'studentes', 'studenta', 'studentis'],
            answer: 'studenti',
            explain: 'studente (-e masc) → studenti (-i).',
          },
          {
            scene: 'Noches',
            lines: [['Marco', 'Le ___ a Roma sono bellissime.']],
            options: ['notti', 'notte', 'nottes', 'notti'],
            answer: 'notti',
            explain: 'notte (-e fem) → notti (-i). Fem en -e también hace -i.',
          },
          {
            scene: 'Género: il o la',
            lines: [['Ana', '___ problema di matematica è difficile.']],
            options: ['Il', 'La', 'L\'', 'Lo'],
            answer: 'Il',
            explain: 'Problema termina en -a pero es masculino (origen griego) → il.',
          },
          {
            scene: 'Género: la mano',
            lines: [['Lina', 'Ho freddo alle ___. (las manos)']],
            options: ['mani', 'manos', 'mane', 'mano'],
            answer: 'mani',
            explain: 'Mano es femenino (la mano) → le mani. Excepción famosa.',
          },
          {
            scene: 'Ciudades',
            lines: [['David', 'Le ___ italiane sono molto antiche.']],
            options: ['città', 'cità', 'cittàs', 'cittàe'],
            answer: 'città',
            explain: 'Città es invariable: singular y plural son iguales. Le città.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Singular y plural en diálogo',
        tag: '2 espacios',
        intro: 'Completa: un singular y un plural en cada enunciado.',
        type: 'dual',
        items: [
          {
            scene: 'Libro y libros',
            lines: [['Sofia', 'Ho [[0]] libro di italiano e tre [[1]] di storia.']],
            blanks: [
              { options: ['un', 'uno', 'una'], answer: 'un', explain: 'Libro: masc consonante → un (indeterminado).' },
              { options: ['libri', 'libre', 'libra'], answer: 'libri', explain: 'Plural de libro: libri.' },
            ],
          },
          {
            scene: 'Gato y gatos',
            lines: [['Carlo', 'Il mio [[0]] si chiama Micio. In questa strada ci sono molti [[1]].']],
            blanks: [
              { options: ['gatto', 'gatti', 'gatta'], answer: 'gatto', explain: 'Singular: il gatto.' },
              { options: ['gatti', 'gatto', 'gatte'], answer: 'gatti', explain: 'Plural: gatti (-o → -i).' },
            ],
          },
          {
            scene: 'Problema y problemas',
            lines: [['Marco', 'Ho [[0]] problema con il computer. In realtà ho molti [[1]].']],
            blanks: [
              { options: ['un', 'una', 'uno'], answer: 'un', explain: 'Problema: masc (origen griego) → un.' },
              { options: ['problemi', 'probleme', 'problemas'], answer: 'problemi', explain: 'Plural: problemi. (-ma → -mi es el patrón).' },
            ],
          },
          {
            scene: 'Casa y casas',
            lines: [['Ana', 'La [[0]] di Sofia è bellissima. Tutte le [[1]] in questa via sono belle.']],
            blanks: [
              { options: ['casa', 'case', 'caso'], answer: 'casa', explain: 'Singular femenino: la casa.' },
              { options: ['case', 'casa', 'casi'], answer: 'case', explain: 'Plural: case (-a → -e).' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Elige la forma correcta (singular o plural).',
        type: 'guidedText',
        scene: 'Describiendo la ciudad de Roma',
        text: 'Roma ha molte [[0]] antiche. Il [[1]] Colosseo è famoso in tutto il mondo. Le [[2]] sono molto belle di notte. Ci sono anche molti [[3]] storici. I [[4]] romani sono molto amichevoli. Ho molte [[5]] da visitare ancora.',
        blanks: [
          { options: ['chiese', 'chiesa', 'chieso'], answer: 'chiese', explain: 'Chiese = iglesias. Plural di chiesa (-a → -e).' },
          { options: ['monumento', 'monumenti', 'monumenta'], answer: 'monumento', explain: 'Colosseo è UN monumento. Singular.' },
          { options: ['fontane', 'fontana', 'fontani'], answer: 'fontane', explain: 'Le fontane = las fuentes. Plural di fontana (-a → -e).' },
          { options: ['musei', 'museo', 'musea'], answer: 'musei', explain: 'Musei = museos. Plural di museo (-o → -i).' },
          { options: ['romani', 'romano', 'romane'], answer: 'romani', explain: 'Romani = romanos (hombres y mixto). Plural di romano (-o → -i).' },
          { options: ['cose', 'cosa', 'cosi'], answer: 'cose', explain: 'Cose = cosas. Plural di cosa (-a → -e).' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe el plural sin opciones.',
        type: 'freeText',
        scene: 'Lista de compras en Italia',
        text: 'Devo comprare: due [[0]] (libro), tre [[1]] (quaderno), cinque [[2]] (penna), quattro [[3]] (foglio), due [[4]] (zaino) e molte [[5]] (cosa).',
        blanks: [
          { answer: 'libri', explain: 'libro → libri (-o → -i).' },
          { answer: 'quaderni', explain: 'quaderno → quaderni (-o → -i).' },
          { answer: 'penne', explain: 'penna → penne (-a → -e).' },
          { answer: 'fogli', explain: 'foglio → fogli (-io → -i, la i no se duplica).' },
          { answer: 'zaini', explain: 'zaino → zaini (-o → -i).' },
          { answer: 'cose', explain: 'cosa → cose (-a → -e).' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la frase con el plural correcto.',
        type: 'write',
        items: [
          {
            scene: 'Los profesores',
            prompt: 'Escribe: Los profesores son buenos. → ___ professori sono bravi.',
            answer: 'I professori sono bravi.',
            accepted: ['i professori sono bravi', 'i professori sono bravi.'],
            explain: 'Professori = plural di professore (-e → -i). Masc pl → i.',
          },
          {
            scene: 'Las casas',
            prompt: 'Escribe: Las casas en Italia son antiguas. → ___ case in Italia sono antiche.',
            answer: 'Le case in Italia sono antiche.',
            accepted: ['le case in italia sono antiche', 'le case in italia sono antiche.'],
            explain: 'Case = plural di casa (-a → -e). Fem pl → le.',
          },
          {
            scene: 'Problemas',
            prompt: 'Escribe: Tengo muchos problemas. → Ho molti ___.',
            answer: 'Ho molti problemi.',
            accepted: ['ho molti problemi', 'ho molti problemi.'],
            explain: 'Problemi = plural di problema. Masc. griego: -ma → -mi.',
          },
          {
            scene: 'Las ciudades',
            prompt: 'Escribe: Las ciudades italianas son bellas. → ___ italiane sono belle.',
            answer: 'Le città italiane sono belle.',
            accepted: ['le città italiane sono belle', 'le città italiane sono belle.'],
            explain: 'Città es invariable: sg y pl son iguales. Fem → le.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Describe los objetos en tu mochila usando singulares y plurales en italiano.',
        type: 'write',
        items: [
          {
            scene: 'Tu mochila',
            prompt: 'Nella mia borsa ho: un/una ___, due ___ e molti/molte ___.',
            answer: 'Nella mia borsa ho: un libro, due penne e molti fogli.',
            accepted: ['nella mia borsa ho un libro due penne e molti fogli', 'nella mia borsa ho un quaderno due matite e molti fogli'],
            explain: 'Libro (masc -o → libri), penne (fem -a → -e), fogli (masc -o → -i).',
          },
          {
            scene: 'Tu ciudad con plurales',
            prompt: 'Nella mia città ci sono molti ___ e molte ___.',
            answer: 'Nella mia città ci sono molti parchi e molte chiese.',
            accepted: ['nella mia città ci sono molti parchi e molte chiese', 'nella mia città ci sono molti musei e molte piazze'],
            explain: 'Parchi (parco -o → -i), chiese (chiesa -a → -e).',
          },
          {
            scene: 'Descripción plural',
            prompt: 'Gli ___ (studente) di WeLearn sono ___. Le ___ (lezione) sono ___.',
            answer: 'Gli studenti di WeLearn sono bravi. Le lezioni sono interessanti.',
            accepted: ['gli studenti di welearn sono bravi le lezioni sono interessanti'],
            explain: 'Studenti (studente -e → -i, masc → gli). Lezioni (lezione -e → -i, fem → le).',
          },
        ],
      },
    ],
  },
}

export default topic
