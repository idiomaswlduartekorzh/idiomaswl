import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'negacao',
  order: '08',
  color: '#166534',
  category: 'Gramática',
  level: 'A1',
  title: 'Negação en portugués A1 — Cómo negar con NÃO',
  shortTitle: 'Negação',
  metaTitle: 'Negación em português A1 — não antes do verbo negação dupla',
  description:
    'La negación en portugués es sencilla: NÃO va siempre antes del verbo. Não falo português. / Não tenho dinheiro. Singularidad del portugués brasileño: la doble negación (Não sei não / Não tenho nada não) es posible y muy coloquial. A diferencia del español, "não" nunca se abrevia.',
  lead: 'La negación en portugués: NÃO + verbo. Não falo inglês. Não tenho tempo. BP coloquial: doble negación posible — Não sei não. La forma básica es sempre NÃO antes del verbo.',
  outcomes: [
    'Forma oraciones negativas con não + verbo en portugués',
    'Evita errores típicos del hispanohablante en la negación portuguesa',
    'Reconoce la doble negación coloquial del portugués brasileño',
  ],

  guide: {
    goal: 'Negar oraciones en portugués A1 usando NÃO antes del verbo.',
    model: 'Eu não falo inglês. / Ela não tem tempo. / Não comemos carne.',
    formula: 'NÃO + verbo conjugado (+ complemento)',
    decisions: [
      'NÃO siempre va ANTES del verbo conjugado',
      'Con infinitivo también: não quero comer, não vou falar',
      'NÃO nunca se abrevia (a diferencia del inglés don\'t/isn\'t)',
      'Doble negación BP coloquial: Não sei não / Não tenho nada não (énfasis)',
      'Não + nada/ninguém/nunca: no se añade un segundo não obligatoriamente en registro formal',
      'Contraste: "Ninguém fala" = Nadie habla (no "Ninguém não fala" en formal)',
    ],
    table: [
      ['Español', 'Portugués', 'Nota'],
      ['No hablo inglés', 'Não falo inglês', 'não + verbo'],
      ['No tengo tiempo', 'Não tenho tempo', 'nicht tenho → não tenho'],
      ['No como carne', 'Não como carne', 'no abreviación'],
      ['No sé (énfasis BP)', 'Não sei não', 'doble negación coloquial'],
      ['Nunca estudio', 'Nunca estudo / Não estudo nunca', 'ambas correctas'],
    ],
    mistakes: [
      '"Falo não inglês" ✗ → "Não falo inglês". NÃO va antes, no después del verbo.',
      '"N\'falo" ✗ → "Não falo". Não nunca se abrevia en portugués.',
      '"Não falo não inglês" ✗ → "Não falo inglês". La doble negación solo se usa sin complemento al final.',
    ],
  },
  seo: [
    {
      heading: 'La negación en portugués: simple y consistente',
      paragraphs: [
        'Negar en portugués es más sencillo que en español o inglés: siempre NÃO antes del verbo, sin excepciones. Não falo inglês (No hablo inglés), Não tenho carro (No tengo coche), Não gostamos disto (No nos gusta esto). El NÃO nunca cambia de forma, nunca se contrae.',
        'Para el hispanohablante, la mayor trampa es querer poner "no" después del verbo (como en "no sé no" en algunos dialectos del español). En portugués estándar, NÃO va siempre delante: Não sei, Não tenho, Não vou.',
      ],
    },
    {
      heading: 'La doble negación en el portugués brasileño',
      paragraphs: [
        'En el portugués brasileño coloquial existe una construcción muy frecuente: não + verbo + não al final. "Não sei não" (No sé, en serio), "Não quero não" (No quiero). Este segundo "não" al final añade énfasis, como si insistieras en la negación. Es muy típico del habla cotidiana en Brasil.',
        'Esta construcción no aparece en el portugués europeo ni en textos formales. En A1 es suficiente reconocerla cuando la oigas y usar la forma básica não + verbo en tu producción.',
      ],
    },
    {
      heading: 'Negación con palabras negativas',
      paragraphs: [
        'Con palabras como nada (nada), ninguém (nadie), nunca/jamais (nunca), nem (ni), en português se puede colocar el negativo antes o después del verbo. Si va después, se añade NÃO: "Não como nada" o "Nada como". Ambas son correctas. La más frecuente en BP es NÃO + verbo + palabra negativa.',
      ],
    },
  ],
  visual: {
    mode: 'grammar-pattern',
    teacherLens: 'El estudiante aprende que NÃO siempre precede al verbo y nunca se abrevia. La doble negación es receptiva en A1.',
    graphicPrompt: 'Flecha señalando NÃO delante del verbo. Ejemplo comparativo español/portugués. Burbuja de diálogo con doble negación coloquial.',
    scene: [
      ['NÃO + verbo', 'negação básica'],
      ['não + verbo + não', 'énfasis coloquial BP'],
      ['nunca/ninguém/nada', 'palavras negativas'],
    ],
    learnerModes: ['visual: NÃO antes del verbo', 'auditivo: doble negação BP', 'analítico: contraste no/não'],
    reviewFocus: ['NÃO antes del verbo', 'sin abreviación', 'doble negação coloquial BP', 'nada/nunca/ninguém'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Forma negativa correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma negativa correcta.',
        type: 'choice',
        items: [
          {
            scene: 'No hablo inglés',
            lines: [['Carlos', '___ inglês. Só falo português e espanhol.']],
            options: ['Não falo', 'Falo não', 'N\'falo', 'Não falo não inglês'],
            answer: 'Não falo',
            explain: 'NÃO + verbo: Não falo. NÃO siempre va antes del verbo.',
          },
          {
            scene: 'Ella no tiene tiempo',
            lines: [['Sofia', 'A Zhanna ___ tempo hoje.']],
            options: ['não tem', 'tem não', 'não têm', 'n\'tem'],
            answer: 'não tem',
            explain: 'Não tem: NÃO + tem (3ª sg de ter). No "tem não" en posición formal.',
          },
          {
            scene: 'No comemos carne',
            lines: [['Ana', 'Nós ___ carne. Somos vegetarianos.']],
            options: ['não comemos', 'comemos não', 'não comimos', 'não comemos não carne'],
            answer: 'não comemos',
            explain: 'Não comemos: NÃO + comemos. Simple y directo.',
          },
          {
            scene: 'Él no estudia',
            lines: [['Marco', 'O Carlos ___ todos os dias. (estudar)']],
            options: ['não estuda', 'estuda não', 'não estudas', 'não estudo'],
            answer: 'não estuda',
            explain: 'Não estuda: NÃO + estuda (3ª sg). Não siempre antes del verbo.',
          },
          {
            scene: 'Énfasis BP coloquial',
            lines: [['David', '— Você sabe falar coreano? — ___, é muito difícil! (énfasis)']],
            options: ['Não sei não', 'Sei não', 'Não sei', 'Não não sei'],
            answer: 'Não sei não',
            explain: 'Doble negación BP: Não sei não. El "não" final añade énfasis en el habla coloquial de Brasil.',
          },
          {
            scene: 'No quiero',
            lines: [['Lina', 'Eu ___ café agora, obrigada. (querer)']],
            options: ['não quero', 'quero não', 'não queres', 'não quer'],
            answer: 'não quero',
            explain: 'Eu não quero: NÃO + quero. Primera persona singular.',
          },
          {
            scene: 'No hablamos',
            lines: [['Zhanna', 'Nós ___ inglês nesta aula. Só português! (falar)']],
            options: ['não falamos', 'falamos não', 'não falam', 'não falemos'],
            answer: 'não falamos',
            explain: 'Não falamos: NÃO + falamos. Primera plural de falar.',
          },
          {
            scene: 'No viven aquí',
            lines: [['Ana', 'Os meus pais ___ aqui. Moram em Medellín. (morar)']],
            options: ['não moram', 'moram não', 'não mora', 'não moramos'],
            answer: 'não moram',
            explain: 'Não moram: NÃO + moram. Tercera plural de morar.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Diálogos con negación',
        tag: '2 espacios',
        intro: 'Completa los dos espacios con la negación correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Preguntas y negaciones',
            lines: [
              ['Lina', 'Você [[0]] espanhol? (falar)'],
              ['Carlos', 'Não, eu [[1]] muito bem ainda. (falar)'],
            ],
            blanks: [
              { options: ['não fala', 'fala', 'não falam'], answer: 'não fala', explain: 'Você não fala: negación de fala (3ª sg).' },
              { options: ['não falo', 'falo', 'não fala'], answer: 'não falo', explain: 'Eu não falo: NÃO + falo.' },
            ],
          },
          {
            scene: 'Sin tiempo y sin dinero',
            lines: [['David', 'Eu [[0]] tempo e [[1]] dinheiro para isso agora. (ter / ter)']],
            blanks: [
              { options: ['não tenho', 'tenho não', 'não tem'], answer: 'não tenho', explain: 'Eu não tenho: NÃO + tenho.' },
              { options: ['não tenho', 'tenho não', 'não tem'], answer: 'não tenho', explain: 'Eu não tenho: NÃO siempre delante.' },
            ],
          },
          {
            scene: 'Vegetarianos',
            lines: [['Sofia', 'Nós [[0]] carne e também [[1]] peixe. (comer / comer)']],
            blanks: [
              { options: ['não comemos', 'comemos não', 'não comem'], answer: 'não comemos', explain: 'Nós não comemos: NÃO + comemos.' },
              { options: ['não comemos', 'não comem', 'comemos'], answer: 'não comemos', explain: 'Nós não comemos: misma estructura.' },
            ],
          },
          {
            scene: 'BP énfasis',
            lines: [
              ['Ana', 'Você gosta de acordar cedo?'],
              ['Marco', '[[0]] [[1]]! Prefiro tarde. (doble negación BP)'],
            ],
            blanks: [
              { options: ['Não', 'N\'', 'Sim'], answer: 'Não', explain: 'Não: primera negación estándar.' },
              { options: ['gosto não', 'gosto sim', 'gosto'], answer: 'gosto não', explain: 'gosto não: doble negación BP coloquial para énfasis.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Completa el texto eligiendo la forma negativa correcta.',
        type: 'guidedText',
        scene: 'Carlos explica qué no hace',
        text: 'Eu [[0]] (falar) inglês mas [[1]] (falar) bem espanhol e português. A minha família [[2]] (comer) fast food — preferimos comida caseira. Os meus colegas [[3]] (trabalhar) aos fins de semana. Nós [[4]] (ter) carro — usamos transporte público. Você [[5]] (gostar) de acordar cedo? Eu [[6]]! (énfasis BP)',
        blanks: [
          { options: ['não falo', 'falo não', 'não fala'], answer: 'não falo', explain: 'Eu não falo: NÃO + falo.' },
          { options: ['falo', 'não falo', 'fala'], answer: 'falo', explain: 'Frase afirmativa: falo. Contraste con la negación anterior.' },
          { options: ['não come', 'come não', 'não comem'], answer: 'não come', explain: 'A família (ela) não come: NÃO + come.' },
          { options: ['não trabalham', 'trabalham não', 'não trabalha'], answer: 'não trabalham', explain: 'Os colegas (eles) não trabalham: NÃO + trabalham.' },
          { options: ['não temos', 'temos não', 'não têm'], answer: 'não temos', explain: 'Nós não temos: NÃO + temos.' },
          { options: ['não gosta', 'gosta não', 'não gosto'], answer: 'não gosta', explain: 'Você não gosta: NÃO + gosta (3ª sg).' },
          { options: ['Não gosto não', 'Gosto não', 'Não gosto'], answer: 'Não gosto não', explain: 'Doble negação BP coloquial: Não gosto não (énfasis).' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la negación correcta sin ayuda.',
        type: 'freeText',
        scene: 'Zhanna describe lo que no hace',
        text: 'Eu [[0]] (beber) álcool. A Zhanna [[1]] (falar) coreano ainda. Nós [[2]] (trabalhar) aos domingos. Os alunos [[3]] (usar) tradutores on-line. Você [[4]] (ter) dúvidas? [[5]] (assistir) TV — prefiro ler.',
        blanks: [
          { answer: 'não bebo', explain: 'Eu não bebo: NÃO + bebo.' },
          { answer: 'não fala', explain: 'Ela não fala: NÃO + fala.' },
          { answer: 'não trabalhamos', explain: 'Nós não trabalhamos: NÃO + trabalhamos.' },
          { answer: 'não usam', explain: 'Os alunos (eles) não usam: NÃO + usam.' },
          { answer: 'não tem', explain: 'Você não tem: NÃO + tem (3ª sg).' },
          { answer: 'Não assisto', accepted: ['não assisto'], explain: 'Eu não assisto: NÃO + assisto.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la frase negativa completa.',
        type: 'write',
        items: [
          {
            scene: 'No hablo inglés',
            prompt: 'Escribe en portugués: No hablo inglés, solo hablo español.',
            answer: 'Não falo inglês, só falo espanhol.',
            accepted: ['não falo inglês só falo espanhol', 'não falo inglês, só falo espanhol'],
            explain: 'NÃO + falo (eu). Negación antes del verbo.',
          },
          {
            scene: 'Ella no tiene tiempo',
            prompt: 'Escribe en portugués: Ella no tiene tiempo hoy.',
            answer: 'Ela não tem tempo hoje.',
            accepted: ['ela não tem tempo hoje'],
            explain: 'Ela não tem: NÃO + tem. Tercera singular de ter.',
          },
          {
            scene: 'No comemos carne',
            prompt: 'Escribe en portugués: Nosotros no comemos carne.',
            answer: 'Nós não comemos carne.',
            accepted: ['nós não comemos carne'],
            explain: 'Nós não comemos: NÃO + comemos.',
          },
          {
            scene: 'No estudian',
            prompt: 'Escribe en portugués: Ellos no estudian los domingos.',
            answer: 'Eles não estudam aos domingos.',
            accepted: ['eles não estudam aos domingos', 'eles não estudam nos domingos'],
            explain: 'Eles não estudam: NÃO + estudam. Tercera plural de estudar.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Describe tres cosas que NO haces usando não en portugués.',
        type: 'write',
        items: [
          {
            scene: 'Lo que no haces',
            prompt: 'Eu não ___ (verbo) ___. Eu não ___ (verbo) ___. Eu também não ___ (verbo) ___.',
            answer: 'Eu não como fast food. Eu não bebo álcool. Eu também não fumo.',
            accepted: ['eu não como fast food eu não bebo álcool eu também não fumo'],
            explain: 'NÃO + verbo en cada oración. Siempre antes del verbo conjugado.',
          },
          {
            scene: 'Tu compañero no...',
            prompt: 'O meu amigo não ___ ___. Ele não ___ ___. Ele não ___ ___.',
            answer: 'O meu amigo não fala inglês. Ele não mora no Brasil. Ele não estuda coreano.',
            accepted: ['o meu amigo não fala inglês ele não mora no brasil ele não estuda coreano'],
            explain: 'NÃO antes de fala, mora, estuda (todos 3ª sg).',
          },
          {
            scene: 'La clase no...',
            prompt: 'Nós não ___ ___. Os alunos não ___ ___. A WeLearn não ___ ___.',
            answer: 'Nós não trabalhamos aos fins de semana. Os alunos não usam tradutores. A WeLearn não vende cursos baratos.',
            accepted: ['nós não trabalhamos aos fins de semana os alunos não usam tradutores a welearn não vende cursos baratos'],
            explain: 'NÃO + trabalhamos/usam/vende. Posición siempre antes del verbo.',
          },
        ],
      },
    ],
  },
}

export default topic
