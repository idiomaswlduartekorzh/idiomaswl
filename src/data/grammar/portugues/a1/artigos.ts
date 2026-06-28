import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'artigos',
  order: '04',
  color: '#b45309',
  category: 'Artículos',
  level: 'A1',
  title: 'Artigos en portugués A1 — Artículos y contracciones',
  shortTitle: 'Artigos (o/a/um/uma)',
  metaTitle: 'Artigos português A1 — o a os as um uma uns umas contrações',
  description:
    'Los artículos del portugués son: o/a/os/as (determinados) y um/uma/uns/umas (indeterminados). Su uso es muy similar al español, pero el portugués añade contracciones obligatorias: de + o = do, em + o = no, a + o = ao. Estas contracciones son automáticas y esenciales.',
  lead: 'o/a/os/as (el/la/los/las) | um/uma/uns/umas (un/una/unos/unas). CRUCIAL: en portugués las contracciones son obligatorias: de + o = do, em + o = no, a + o = ao.',
  outcomes: [
    'Usa los artículos o/a/os/as y um/uma/uns/umas correctamente',
    'Aplica las contracciones obligatorias: do/da, no/na, ao/à',
    'Reconoce cuándo usar artículo determinado vs indeterminado',
  ],

  guide: {
    goal: 'Usar artículos correctamente en portugués y aplicar las contracciones obligatorias.',
    model: 'O livro está na mesa. (El libro está en la mesa.) / Tenho um gato. (Tengo un gato.)',
    formula: 'artículo + sustantivo | de/em/a + artículo = contracción obligatoria',
    decisions: [
      'o (m sg) / a (f sg) / os (m pl) / as (f pl) — determinados',
      'um (m sg) / uma (f sg) / uns (m pl) / umas (f pl) — indeterminados',
      'Contracciones con DE: de + o = do | de + a = da | de + os = dos | de + as = das',
      'Contracciones con EM: em + o = no | em + a = na | em + os = nos | em + as = nas',
      'Contracciones con A: a + o = ao | a + a = à | a + os = aos | a + as = às',
      '¡Las contracciones son SIEMPRE obligatorias! No existe "de o livro" → "do livro".',
    ],
    table: [
      ['Preposición', 'Masc. sg', 'Fem. sg'],
      ['de + artículo', 'do', 'da'],
      ['em + artículo', 'no', 'na'],
      ['a + artículo', 'ao', 'à'],
    ],
    mistakes: [
      '"De o livro" ✗ → "Do livro". La contracción es siempre obligatoria.',
      '"Em a escola" ✗ → "Na escola". Em + a = na siempre.',
      '"A o mercado" ✗ → "Ao mercado". A + o = ao siempre.',
    ],
  },
  seo: [
    {
      heading: 'Artículos en portugués: o/a y um/uma',
      paragraphs: [
        'Los artículos del portugués son muy similares a los del español. Los determinados (o/a/os/as = el/la/los/las) se usan para referirse a algo conocido o específico. Los indeterminados (um/uma/uns/umas = un/una/unos/unas) se usan para mencionar algo por primera vez o de forma genérica.',
        'Para el hispanohablante la lógica es idéntica al español. La diferencia principal son las formas: "o" (el) suena raro pero se aprende rápido porque se usa con todos los sustantivos masculinos singulares: o livro (el libro), o carro (el coche), o professor (el profesor).',
      ],
    },
    {
      heading: 'Contracciones obligatorias: do, no, ao',
      paragraphs: [
        'La diferencia más importante entre los artículos del portugués y del español es que en portugués las contracciones entre preposiciones y artículos son OBLIGATORIAS. En español "de el" es incorrecto (decimos "del") pero en muchas regiones se escapa; en portugués no existe ninguna opción: "de o" SIEMPRE se convierte en "do", sin excepción.',
        'Las tres preposiciones que contraen con artículos son: de (de → do/da/dos/das), em (en → no/na/nos/nas) y a (a → ao/à/aos/às). Aprende estas contracciones como vocabulario desde el principio: "no escritório" (en la oficina), "do Brasil" (de Brasil), "ao mercado" (al mercado).',
      ],
    },
  ],
  visual: {
    mode: 'article-grid',
    teacherLens: 'El estudiante aprende los artículos y las 3 preposiciones que contraen obligatoriamente.',
    graphicPrompt: 'Tabla artículos + tabla contracciones do/da/no/na/ao/à.',
    scene: [
      ['o/a/os/as', 'el/la/los/las'],
      ['um/uma/uns/umas', 'un/una/unos/unas'],
      ['do/da | no/na | ao/à', 'contracciones obligatorias'],
    ],
    learnerModes: ['visual: tabla artículos + contracciones', 'analítico: preposición + artículo', 'oral: frases con ubicación'],
    reviewFocus: ['contracciones obligatorias', 'do vs de o (incorrecto)', 'no/na para ubicación', 'ao/à para destino'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Artículo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el artículo o la contracción correcta.',
        type: 'choice',
        items: [
          {
            scene: 'El libro',
            lines: [['Carlos', '___ livro está na mesa.']],
            options: ['O', 'A', 'Um', 'Os'],
            answer: 'O',
            explain: 'Livro: masculino singular → o (el).',
          },
          {
            scene: 'La escuela',
            lines: [['Sofia', 'Estudo na ___ escola de português.']],
            options: ['a', 'o', 'uma', 'do'],
            answer: 'a',
            explain: 'Escola: femenino singular → a (la). "Na escola" = "en la escuela" (em + a = na).',
          },
          {
            scene: 'De Brasil (contracción)',
            lines: [['David', 'Sou ___ Brasil.']],
            options: ['do', 'de o', 'da', 'ao'],
            answer: 'do',
            explain: 'De + o = do. Brasil es masculino → do Brasil.',
          },
          {
            scene: 'En la oficina (contracción)',
            lines: [['Zhanna', 'Estou ___ escritório agora.']],
            options: ['no', 'em o', 'na', 'do'],
            answer: 'no',
            explain: 'Em + o = no. Escritório es masculino → no escritório.',
          },
          {
            scene: 'Al mercado (contracción)',
            lines: [['Ana', 'Vou ___ mercado comprar frutas.']],
            options: ['ao', 'a o', 'à', 'do'],
            answer: 'ao',
            explain: 'A + o = ao. Mercado es masculino → ao mercado.',
          },
          {
            scene: 'Una profesora',
            lines: [['Marco', 'Temos ___ professora nova.']],
            options: ['uma', 'um', 'a', 'uns'],
            answer: 'uma',
            explain: 'Professora: femenino sg → uma (una).',
          },
          {
            scene: 'Los alumnos',
            lines: [['David', '___ alunos estudam muito.']],
            options: ['Os', 'As', 'Uns', 'O'],
            answer: 'Os',
            explain: 'Alunos: masculino plural → os (los).',
          },
          {
            scene: 'De la escuela (contracción)',
            lines: [['Lina', 'Saio ___ escola às cinco horas.']],
            options: ['da', 'de a', 'do', 'na'],
            answer: 'da',
            explain: 'De + a = da. Escola es femenino → da escola.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Artículos y contracciones en diálogo',
        tag: '2 espacios',
        intro: 'Completa los dos artículos/contracciones del enunciado.',
        type: 'dual',
        items: [
          {
            scene: 'O livro e a caneta',
            lines: [['Sofia', '[[0]] livro está sobre [[1]] mesa.']],
            blanks: [
              { options: ['O', 'A', 'Um'], answer: 'O', explain: 'Livro: masculino sg → o.' },
              { options: ['a', 'o', 'uma'], answer: 'a', explain: 'Mesa: femenino sg → a.' },
            ],
          },
          {
            scene: 'De la ciudad',
            lines: [['Carlos', 'Sou [[0]] Bogotá, [[1]] Colômbia.']],
            blanks: [
              { options: ['de', 'do', 'da'], answer: 'de', explain: 'Bogotá: cidade proprio sin artículo → de (sin contracción).' },
              { options: ['da', 'do', 'de a'], answer: 'da', explain: 'Colômbia: femenino → de + a = da.' },
            ],
          },
          {
            scene: 'En la escuela y en el trabajo',
            lines: [['David', 'Estou [[0]] escola de manhã e [[1]] escritório à tarde.']],
            blanks: [
              { options: ['na', 'no', 'em a'], answer: 'na', explain: 'Em + a (escola) = na.' },
              { options: ['no', 'na', 'em o'], answer: 'no', explain: 'Em + o (escritório) = no.' },
            ],
          },
          {
            scene: 'Al parque y a la tienda',
            lines: [['Ana', 'Vou [[0]] parque e depois [[1]] loja.']],
            blanks: [
              { options: ['ao', 'à', 'a o'], answer: 'ao', explain: 'A + o (parque) = ao.' },
              { options: ['à', 'ao', 'a a'], answer: 'à', explain: 'A + a (loja) = à.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Completa con el artículo o contracción correcta.',
        type: 'guidedText',
        scene: 'Rotina de uma estudante em Lisboa',
        text: '[[0]] manhã eu vou [[1]] escola de português. Saio [[2]] casa às oito horas. [[3]] professora se chama Zhanna. [[4]] aulas são muito boas. À tarde vou [[5]] biblioteca estudar. Tenho [[6]] dicionário excelente.',
        blanks: [
          { options: ['De', 'Da', 'Do'], answer: 'De', explain: 'De manhã = por la mañana. Sin artículo en esta expresión.' },
          { options: ['à', 'ao', 'para a'], answer: 'à', explain: 'A + a (escola) = à. Destino femenino.' },
          { options: ['da', 'do', 'de a'], answer: 'da', explain: 'De + a (casa) = da.' },
          { options: ['A', 'O', 'Uma'], answer: 'A', explain: 'Professora: femenino sg → a (la).' },
          { options: ['As', 'Os', 'Umas'], answer: 'As', explain: 'Aulas: femenino pl → as (las).' },
          { options: ['à', 'ao', 'na'], answer: 'à', explain: 'A + a (biblioteca) = à. Destino femenino.' },
          { options: ['um', 'uma', 'o'], answer: 'um', explain: 'Dicionário: masc sg, primera mención → um.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe el artículo o contracción correcta.',
        type: 'freeText',
        scene: 'Um dia em São Paulo',
        text: 'Moro [[0]] Brasil, em São Paulo. Trabalho [[1]] centro da cidade. Saio [[2]] casa às sete horas. Vou [[3]] trabalho de metrô. [[4]] colegas são muito simpáticos. À noite vou [[5]] academia.',
        blanks: [
          { answer: 'no', explain: 'Em + o (Brasil) = no.' },
          { answer: 'no', explain: 'Em + o (centro) = no.' },
          { answer: 'da', explain: 'De + a (casa) = da.' },
          { answer: 'ao', explain: 'A + o (trabalho) = ao.' },
          { answer: 'Os', accepted: ['os'], explain: 'Colegas: masc pl → os.' },
          { answer: 'à', explain: 'A + a (academia) = à.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción con artículos',
        tag: 'Producción',
        intro: 'Escribe la frase completa con el artículo o contracción correcta.',
        type: 'write',
        items: [
          {
            scene: 'El libro está en la mesa',
            prompt: 'Escribe: El libro está en la mesa. → ___ livro está ___ mesa.',
            answer: 'O livro está na mesa.',
            accepted: ['o livro está na mesa', 'o livro está na mesa.'],
            explain: 'O livro (masc sg). Na mesa = em + a. Contracción obligatoria.',
          },
          {
            scene: 'Soy de Brasil',
            prompt: 'Escribe: Soy de Brasil. → Eu sou ___ Brasil.',
            answer: 'Eu sou do Brasil.',
            accepted: ['eu sou do brasil', 'eu sou do brasil.'],
            explain: 'Do Brasil = de + o. Contracción obligatoria.',
          },
          {
            scene: 'Voy al trabajo',
            prompt: 'Escribe: Voy al trabajo. → Eu vou ___ trabalho.',
            answer: 'Eu vou ao trabalho.',
            accepted: ['eu vou ao trabalho', 'eu vou ao trabalho.'],
            explain: 'Ao trabalho = a + o. Contracción obligatoria.',
          },
          {
            scene: 'Las clases son buenas',
            prompt: 'Escribe: Las clases son muy buenas. → ___ aulas são muito boas.',
            answer: 'As aulas são muito boas.',
            accepted: ['as aulas são muito boas', 'as aulas são muito boas.'],
            explain: 'As aulas: femenino plural → as.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Describe tu rutina diaria en portugués usando artículos y contracciones.',
        type: 'write',
        items: [
          {
            scene: 'Tu rutina',
            prompt: 'De manhã vou ___ [lugar]. Saio ___ [lugar] às ___. ___ professora/professor se chama ___.',
            answer: 'De manhã vou à escola. Saio da escola às três. A professora se chama Zhanna.',
            accepted: ['de manhã vou à escola saio da escola às três a professora se chama zhanna'],
            explain: 'À escola (a+a), da escola (de+a), a professora (artículo determinado).',
          },
          {
            scene: 'Tu ciudad',
            prompt: 'Moro ___ [cidade], ___ [país]. ___ minha cidade é ___.',
            answer: 'Moro em Bogotá, na Colômbia. A minha cidade é muito bonita.',
            accepted: ['moro em bogotá na colômbia a minha cidade é muito bonita'],
            explain: 'Em Bogotá (sin artículo al ser nombre propio). Na Colômbia (em+a).',
          },
          {
            scene: 'Describe tu escuela',
            prompt: '[[nombre]] escola de português está ___ [lugar]. ___ professores são ___.',
            answer: 'A WeLearn escola de português está no Brasil. Os professores são muito bons.',
            accepted: ['a welearn escola de português está no brasil os professores são muito bons'],
            explain: 'No Brasil (em+o). Os professores (masculino plural).',
          },
        ],
      },
    ],
  },
}

export default topic
