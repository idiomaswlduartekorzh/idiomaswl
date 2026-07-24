import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verneinung',
  order: '08',
  color: '#c9a900',
  category: 'Satzbau',
  level: 'A1',
  title: 'Verneinung im Deutschen A1 — nicht und kein',
  shortTitle: 'Verneinung',
  metaTitle: 'Negación en alemán A1 — nicht vs kein/keine explicado para hispanohablantes',
  description:
    'El alemán usa dos palabras diferentes para negar: NICHT (niega verbos, adjetivos y adverbios) y KEIN/KEINE (niega sustantivos que llevan artículo indefinido o no llevan artículo). Esta distinción no existe en español, lo que la convierte en uno de los primeros escollos gramaticales.',
  lead: '¿Nicht o kein? Regla rápida: ¿niega un sustantivo con "ein" o sin artículo? → kein/keine. ¿Niega el verbo, un adjetivo o un adverbio? → nicht.',
  outcomes: [
    'Distingues cuándo usar nicht y cuándo usar kein/keine',
    'Ubicas nicht correctamente al final o antes del elemento negado',
    'Declinas kein como ein (kein/keine/keinen)',
  ],

  guide: {
    goal: 'Negar oraciones alemanas correctamente con nicht o kein/keine.',
    model: 'Ich arbeite nicht. / Ich habe kein Auto. / Das ist nicht schön.',
    formula: 'Nicht (verbos/adj/adv) | kein/keine (sustantivos sin artículo definido)',
    decisions: [
      '¿Niega un verbo o toda la frase? → nicht al final: Ich komme nicht.',
      '¿Niega un adjetivo predicativo? → nicht antes: Das ist nicht gut.',
      '¿Niega un sustantivo con "ein"? → kein lo reemplaza: ein Auto → kein Auto.',
      '¿Niega un sustantivo sin artículo? → kein/keine: Ich habe Zeit → Ich habe keine Zeit.',
      '¿Niega un sustantivo con artículo definido (der/die/das)? → nicht: Ich nehme nicht den Bus.',
    ],
    table: [
      ['Caso', 'Afirmativo', 'Negativo'],
      ['Verbo', 'Ich arbeite.', 'Ich arbeite nicht.'],
      ['ein → kein', 'Ich habe ein Auto.', 'Ich habe kein Auto.'],
      ['sin art. → keine', 'Ich habe Zeit.', 'Ich habe keine Zeit.'],
    ],
    mistakes: [
      '"Ich habe nicht Auto" ❌ — "Auto" sin artículo definido → "kein": "Ich habe kein Auto" ✓',
      '"Ich nicht komme" ❌ — nicht va al final (o antes del elemento negado específico): "Ich komme nicht" ✓',
      '"Ich habe keine ein Buch" ❌ — kein ya reemplaza al artículo, no se añade: "Ich habe kein Buch" ✓',
    ],
  },

  seo: [
    {
      heading: 'Nicht: la negación de verbos, adjetivos y adverbios',
      paragraphs: [
        '"Nicht" niega el verbo, un adjetivo predicativo, un adverbio o un elemento específico de la oración. En frases simples, nicht va generalmente al FINAL: Ich komme nicht. / Sie arbeitet heute nicht. / Er schläft noch nicht.',
        'Cuando nicht niega un elemento concreto (adjetivo, adverbio o complemento), se coloca ANTES de ese elemento: Das Essen ist nicht gut. / Ich fahre nicht mit dem Bus (sino en coche). Esta posición "no-final" indica contraste.',
      ],
    },
    {
      heading: 'Kein/keine: la negación de sustantivos',
      paragraphs: [
        '"Kein" se usa cuando se niega un sustantivo que lleva artículo indefinido (ein/eine) o que no lleva artículo. Se declina exactamente igual que "ein": kein (masc/neut nominativo), keine (fem/plural), keinen (masc acusativo).',
        'Ejemplos: Ich habe ein Buch → Ich habe kein Buch. / Ich habe eine Schwester → Ich habe keine Schwester. / Ich habe Hunger → Ich habe keinen Hunger. / Wir haben Kinder → Wir haben keine Kinder.',
      ],
    },
    {
      heading: 'La trampa del artículo definido: usar nicht, no kein',
      paragraphs: [
        'Cuando el sustantivo lleva artículo definido (der/die/das), se usa nicht (no kein): Ich nehme nicht den Bus (sino el metro). / Das ist nicht das Buch, das ich meine. Esta situación implica contraste o identificación específica.',
        'Para hispanohablantes, la clave es preguntar: ¿el sustantivo tiene "ein/eine" o va sin artículo? → kein/keine. ¿Tiene "der/die/das" o no hay sustantivo en juego? → nicht.',
      ],
    },
    {
      heading: 'Declinación de kein: como ein pero con k-',
      paragraphs: [
        'Kein se declina en todos los casos como ein: Nominativo: kein (m/n), keine (f/pl). Acusativo: keinen (m), keine (f), kein (n), keine (pl). En A1 lo más frecuente es el nominativo y el acusativo básico.',
        'Truco mnemotécnico: donde pondrías "ein" para afirmar, pon "kein" para negar. Donde pondrías "eine", pon "keine". Donde pondrías "einen" (acusativo masculino), pon "keinen".',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Nicht vs kein/keine: dos herramientas de negación con reglas distintas.',
    graphicPrompt: 'Tabla de negación con ejemplos afirmativos y negativos en paralelo.',
    scene: [
      ['Nicht (verbo)', 'Ich komme nicht. / Sie schläft nicht.'],
      ['Nicht (adjetivo)', 'Das ist nicht gut. / Er ist nicht müde.'],
      ['Kein (m/n)', 'Ich habe kein Geld. / Kein Problem!'],
      ['Keine (f)', 'Ich habe keine Zeit. / Keine Idee.'],
      ['Keinen (m acus.)', 'Ich habe keinen Hunger. / Keinen Kaffee!'],
      ['Keine (plural)', 'Wir haben keine Kinder. / Keine Fragen?'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['nicht al final', 'kein reemplaza a ein', 'keine reemplaza a eine'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Elige nicht o kein/keine para completar la negación.',
        type: 'choice',
        items: [
          {
            scene: 'Dario responde a una pregunta',
            lines: [['Dario', 'Ich habe ___ Auto. (no tengo coche)']],
            options: ['kein', 'nicht', 'keine', 'keinen'],
            answer: 'kein',
            explain: '"Auto" es neutro (das Auto) y va sin artículo definido → "kein Auto".',
          },
          {
            scene: 'Carlos explica por qué no puede salir',
            lines: [['Carlos', 'Ich arbeite heute ___. (hoy no trabajo)']],
            options: ['nicht', 'kein', 'keine', 'keinen'],
            answer: 'nicht',
            explain: 'Se niega el verbo "arbeiten" → "nicht" al final.',
          },
          {
            scene: 'Ana pregunta sobre el tiempo libre de Lina',
            lines: [['Lina', 'Ich habe ___ Zeit. (no tengo tiempo)']],
            options: ['keine', 'kein', 'nicht', 'keinen'],
            answer: 'keine',
            explain: '"Zeit" es femenino (die Zeit) y va sin artículo indefinido → "keine Zeit".',
          },
          {
            scene: 'Marco describe su ciudad',
            lines: [['Marco', 'Meine Stadt ist ___ groß. (no es grande)']],
            options: ['nicht', 'kein', 'keine', 'keinen'],
            answer: 'nicht',
            explain: 'Se niega el adjetivo predicativo "groß" → "nicht" antes del adjetivo.',
          },
          {
            scene: 'Sofía habla de sus hermanos',
            lines: [['Sofía', 'Ich habe ___ Geschwister. (no tengo hermanos)']],
            options: ['keine', 'kein', 'nicht', 'keinen'],
            answer: 'keine',
            explain: '"Geschwister" es plural y va sin artículo → "keine Geschwister".',
          },
          {
            scene: 'Dario no tiene hambre',
            lines: [['Dario', 'Ich habe ___ Hunger. (no tengo hambre)']],
            options: ['keinen', 'kein', 'keine', 'nicht'],
            answer: 'keinen',
            explain: '"Hunger" es masculino (der Hunger), acusativo tras "haben" → "keinen Hunger".',
          },
          {
            scene: 'Nora comenta sobre Carlos',
            lines: [['Nora', 'Carlos kommt heute ___. (hoy no viene)']],
            options: ['nicht', 'kein', 'keine', 'keinen'],
            answer: 'nicht',
            explain: 'Negación del verbo "kommen" → "nicht" al final.',
          },
          {
            scene: 'Lina sobre el apartamento',
            lines: [['Lina', 'Die Wohnung hat ___ Balkon. (no tiene balcón)']],
            options: ['keinen', 'keine', 'kein', 'nicht'],
            answer: 'keinen',
            explain: '"Balkon" es masculino (der Balkon), acusativo tras "hat" → "keinen Balkon".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Afirmativo a negativo',
        tag: '2 espacios',
        intro: 'Transforma la frase afirmativa en negativa.',
        type: 'dual',
        items: [
          {
            scene: 'Sofía describe su situación',
            lines: [['', 'Ich habe ein Auto. → Ich habe [[0]] [[1]].']],
            blanks: [
              { options: ['kein', 'nicht', 'keine', 'keinen'], answer: 'kein', explain: '"ein Auto" → "kein Auto": kein reemplaza a ein con neutro.' },
              { options: ['Auto', 'Bus', 'Fahrrad', 'Hund'], answer: 'Auto', explain: 'El sustantivo no cambia.' },
            ],
          },
          {
            scene: 'Carlos habla de sus planes',
            lines: [['', 'Ich komme. → Ich komme [[0]]. / Ich habe Zeit. → Ich habe [[1]] Zeit.']],
            blanks: [
              { options: ['nicht', 'kein', 'keine', 'keinen'], answer: 'nicht', explain: 'Negación del verbo → nicht al final.' },
              { options: ['keine', 'kein', 'nicht', 'keinen'], answer: 'keine', explain: '"Zeit" femenino sin artículo → keine Zeit.' },
            ],
          },
          {
            scene: 'Marco habla del vecindario',
            lines: [['', 'Es gibt einen Park. → Es gibt [[0]] Park. / Die Straße ist schön. → Die Straße ist [[1]] schön.']],
            blanks: [
              { options: ['keinen', 'keine', 'kein', 'nicht'], answer: 'keinen', explain: '"Park" masculino en acusativo → keinen.' },
              { options: ['nicht', 'kein', 'keine', 'keinen'], answer: 'nicht', explain: 'Negación del adjetivo predicativo "schön" → nicht.' },
            ],
          },
          {
            scene: 'Lina resume su semana',
            lines: [['', 'Ich habe eine Schwester. → Ich habe [[0]] [[1]].']],
            blanks: [
              { options: ['keine', 'kein', 'nicht', 'keinen'], answer: 'keine', explain: '"eine Schwester" → "keine Schwester": keine reemplaza a eine.' },
              { options: ['Schwester', 'Bruder', 'Mutter', 'Freundin'], answer: 'Schwester', explain: 'El sustantivo no cambia.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa con nicht, kein, keine o keinen.',
        type: 'guidedText',
        scene: 'Carlos explica por qué no puede salir este fin de semana.',
        text: 'Ich kann leider [[0]] kommen. Ich habe [[1]] Zeit und [[2]] Geld. Mein Auto funktioniert [[3]]. Ich habe [[4]] Freunde hier in der Stadt. Das ist [[5]] schön, aber ich lerne viel Deutsch!',
        blanks: [
          { options: ['nicht', 'kein', 'keine', 'keinen'], answer: 'nicht', explain: 'Negación del verbo "kommen" → nicht.' },
          { options: ['keine', 'kein', 'nicht', 'keinen'], answer: 'keine', explain: '"Zeit" = femenino, sin artículo → keine Zeit.' },
          { options: ['kein', 'keine', 'nicht', 'keinen'], answer: 'kein', explain: '"Geld" = neutro, sin artículo → kein Geld.' },
          { options: ['nicht', 'kein', 'keine', 'keinen'], answer: 'nicht', explain: 'Negación del verbo "funktioniert" → nicht al final.' },
          { options: ['keine', 'kein', 'nicht', 'keinen'], answer: 'keine', explain: '"Freunde" = plural, sin artículo → keine Freunde.' },
          { options: ['nicht', 'kein', 'keine', 'keinen'], answer: 'nicht', explain: 'Negación del adjetivo "schön" → nicht.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la forma negativa correcta.',
        type: 'freeText',
        scene: 'Ana describe lo que NO hay en su habitación.',
        text: 'Mein Zimmer hat [[0]] Fernseher (der Fernseher). Es gibt [[1]] Klimaanlage (die Klimaanlage). Das Zimmer ist [[2]] groß. Ich habe [[3]] Schreibtisch (der Schreibtisch). Ich schlafe [[4]] gut hier.',
        blanks: [
          { answer: 'keinen', accepted: ['keinen'], explain: '"Fernseher" = masculino, acusativo tras "hat" → keinen Fernseher.' },
          { answer: 'keine', accepted: ['keine'], explain: '"Klimaanlage" = femenino → keine Klimaanlage.' },
          { answer: 'nicht', accepted: ['nicht'], explain: 'Negación del adjetivo predicativo "groß" → nicht.' },
          { answer: 'keinen', accepted: ['keinen'], explain: '"Schreibtisch" = masculino, acusativo → keinen Schreibtisch.' },
          { answer: 'nicht', accepted: ['nicht'], explain: 'Negación del verbo "schlafe gut" → nicht al final.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones negativas sobre ti mismo.',
        type: 'write',
        items: [
          {
            scene: 'Habla de lo que no tienes',
            prompt: 'Menciona 2 cosas que no tienes usando kein/keine/keinen.',
            answer: 'Ich habe kein Auto und keine Geschwister.',
            accepted: ['kein ', 'keine ', 'keinen '],
            explain: 'Recuerda: kein (m/n nom.), keine (f, pl.), keinen (m acus.). Ej: Ich habe kein Haustier. / Ich habe keine Zeit.',
          },
          {
            scene: 'Lo que no haces',
            prompt: 'Di 2 cosas que no haces usando "nicht" al final.',
            answer: 'Ich rauche nicht und ich trinke nicht.',
            accepted: ['nicht'],
            explain: 'Nicht niega el verbo y va al final: Ich rauche nicht. / Ich koche nicht gern.',
          },
          {
            scene: 'Lo que no es verdad',
            prompt: 'Corrige 2 ideas falsas sobre ti: "Das stimmt nicht. Ich bin nicht...".',
            answer: 'Das stimmt nicht. Ich bin nicht müde. Ich habe keine Katze.',
            accepted: ['nicht', 'kein', 'keine', 'keinen'],
            explain: 'Nicht para adjetivos y verbos. Kein/keine para sustantivos sin artículo definido.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Describe tu situación actual usando 4 negaciones variadas.',
        type: 'write',
        items: [
          {
            scene: 'Tu situación en este momento',
            prompt: 'Di qué NO tienes, qué NO haces y qué NO es verdad usando nicht, kein/keine.',
            answer: 'Ich habe kein Auto. Ich arbeite heute nicht. Ich bin nicht müde. Ich habe keine Zeit für Fernsehen.',
            accepted: ['nicht', 'kein', 'keine', 'keinen'],
            explain: 'Mezcla: kein/keine para sustantivos, nicht para verbos y adjetivos.',
          },
          {
            scene: 'Un amigo que no está bien hoy',
            prompt: 'Describe a un amigo que hoy no tiene energía, no tiene tiempo y no viene a clase.',
            answer: 'Mein Freund hat heute keine Energie und keine Zeit. Er kommt nicht zur Klasse.',
            accepted: ['keine ', 'kein ', 'nicht'],
            explain: 'Combina keine (femenino) y nicht (verbo). Er kommt nicht = verbo negado.',
          },
          {
            scene: 'Corrección de malentendido',
            prompt: 'Alguien dice cosas falsas sobre ti. Niégalas: no tienes coche, no hablas inglés, no eres alemán/a.',
            answer: 'Nein! Ich habe kein Auto. Ich spreche nicht Englisch. Ich bin kein Deutscher.',
            accepted: ['kein', 'keine', 'keinen', 'nicht'],
            explain: 'Auto (neutro) → kein. Verbo sprechen → nicht. Deutscher (masc.) → kein.',
          },
        ],
      },
    ],
  },
}

export default topic
