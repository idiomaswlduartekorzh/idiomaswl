import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'perguntas-interrogativas',
  order: '09',
  color: '#166534',
  category: 'Gramática',
  level: 'A1',
  title: 'Perguntas Interrogativas en portugués A1 — Preguntas y palabras interrogativas',
  shortTitle: 'Perguntas',
  metaTitle: 'Preguntas en portugués A1 — onde quando quem como por que quanto interrogativas',
  description:
    'Las preguntas en portugués son muy naturales para el hispanohablante. En el portugués brasileño no hay inversión sujeto-verbo obligatoria: Você fala inglês? (entonación ascendente). Palabras interrogativas: o que, onde, quando, quem, como, por que, quanto/a, qual/quais.',
  lead: 'Preguntas en portugués: entonación ascendente o signo de pregunta, sin inversión obligatoria en BP. O que é isso? / Onde você mora? / Como você está? / Por que você estuda?',
  outcomes: [
    'Formula preguntas simples con entonación o inversión en portugués',
    'Usa las palabras interrogativas principales: o que, onde, quando, quem, como, por que, quanto, qual',
    'Distingue por que (¿por qué?) de porque (porque/por qué=respuesta)',
  ],

  guide: {
    goal: 'Formular preguntas en portugués A1 con palabras interrogativas.',
    model: 'O que você faz? / Onde você mora? / Quem é você? / Como está?',
    formula: 'Interrogativo + verbo (+ sujeto) + complemento?',
    decisions: [
      'BP: sin inversión obligatoria — Você fala inglês? (no "Fala você inglês?")',
      'BP formal/escrito: puede haber inversión — Fala você inglês? (menos frecuente)',
      'O que = qué: O que você quer? / O que é isso?',
      'Onde = dónde: Onde você mora? / Onde fica o banheiro?',
      'Quando = cuándo: Quando você chega? / Quando começa a aula?',
      'Quem = quién: Quem é você? / Com quem você fala?',
      'Como = cómo: Como você está? / Como se chama?',
      'Por que = por qué (dos palabras): Por que você estuda? — respuesta: porque (una palabra)',
      'Quanto/quanta/quantos/quantas: Quanto custa? / Quantos anos você tem?',
      'Qual/quais = cuál/cuáles: Qual é o seu nome? / Quais idiomas você fala?',
    ],
    table: [
      ['Interrogativo', 'Traducción', 'Ejemplo'],
      ['o que', 'qué', 'O que você quer?'],
      ['onde', 'dónde', 'Onde você mora?'],
      ['quando', 'cuándo', 'Quando começa?'],
      ['quem', 'quién', 'Quem é você?'],
      ['como', 'cómo', 'Como você está?'],
      ['por que', 'por qué', 'Por que você estuda?'],
      ['quanto/a/os/as', 'cuánto/a/os/as', 'Quanto custa?'],
      ['qual/quais', 'cuál/cuáles', 'Qual é o seu nome?'],
    ],
    mistakes: [
      '"Porque você estuda?" ✗ → "Por que você estuda?" Por qué es dos palabras en pregunta.',
      '"O que você quer ele?" ✗ → "O que você quer?" No se repite el sujeto con pronombre.',
      '"Quanto custam?" con singular ✗ → "Quanto custa?" / "Quantos custam?" Concordancia.',
    ],
  },
  seo: [
    {
      heading: 'Preguntas en portugués: más fácil de lo que parece',
      paragraphs: [
        'Para el hispanohablante, las preguntas en portugués son muy intuitivas. Las palabras interrogativas son similares: onde (donde), quando (cuando), quem (quien), como (como), quanto (cuánto). La mayor diferencia está en "o que" (qué) — se usa la forma completa, no solo "que".',
        'En el portugués brasileño no hay inversión sujeto-verbo obligatoria. Se dice Você fala inglês? exactamente como en español "¿Tú hablas inglés?" — solo cambia la entonación. En Portugal es más frecuente la inversión Fala você inglês?, pero en BP la entonación ascendente es suficiente.',
      ],
    },
    {
      heading: 'Por que vs porque: la trampa más frecuente',
      paragraphs: [
        'En portugués, la pregunta "¿por qué?" se escribe en dos palabras: POR QUE — Por que você estuda? La respuesta "porque" es una sola palabra: Estudo porque gosto. Esta diferencia ortográfica es idéntica a la del español (¿por qué? / porque) y a diferencia del inglés where/were. No hay acento gráfico en el portugués estándar (aunque "porquê" aparece al final de frase).',
      ],
    },
    {
      heading: 'Qual vs o que: cuál vs qué en portugués',
      paragraphs: [
        '"O que" pregunta por la definición o naturaleza de algo: O que é isso? (¿Qué es eso?). "Qual" pregunta por la elección entre opciones: Qual é o seu nome? (¿Cuál es tu nombre?). Esta distinción es similar al inglés what/which y es importante dominarla en portugués.',
      ],
    },
    {
      heading: '¿Cuáles son las palabras interrogativas en portugués?',
      paragraphs: [
        'Son ocho básicas, casi todas transparentes para el hispanohablante salvo "o que" (que se dice completo, no solo "que"). Esta tabla las reúne con su traducción y un ejemplo listo para usar:',
      ],
      table: [
        ['Interrogativo', 'Español', 'Ejemplo'],
        ['o que', 'qué', 'O que você quer?'],
        ['quem', 'quién', 'Quem é você?'],
        ['onde', 'dónde', 'Onde você mora?'],
        ['quando', 'cuándo', 'Quando começa a aula?'],
        ['como', 'cómo', 'Como você está?'],
        ['por que', 'por qué', 'Por que você estuda?'],
        ['quanto/a/os/as', 'cuánto/a', 'Quantos anos você tem?'],
        ['qual / quais', 'cuál / cuáles', 'Qual é o seu nome?'],
      ],
    },
    {
      heading: '¿Cómo se hace una pregunta en portugués?',
      paragraphs: [
        'Para una pregunta de sí/no basta subir la entonación al final, sin invertir sujeto y verbo: "Você fala inglês?" (¿hablas inglés?), exactamente como en español. Para preguntas abiertas se antepone la palabra interrogativa: "Onde você mora?", "O que você faz?". El portugués brasileño casi nunca invierte el orden (no dice "Fala você inglês?"), a diferencia del portugués europeo, más formal, donde la inversión sí aparece. Por eso las preguntas son de lo más fácil para el hispanohablante.',
      ],
    },
    {
      heading: '¿Se escribe "por que", "porque", "por quê" o "porquê"?',
      paragraphs: [
        'Las cuatro existen y se distinguen como en español (por qué / porque), más dos variantes con tilde: "Por que" (separado, sin tilde) inicia la pregunta — "Por que você estuda?". "Porque" (junto) da la respuesta — "Estudo porque gosto". "Por quê" (separado, con tilde) va al final de frase — "Você não veio, por quê?". "Porquê" (junto, con tilde) es un sustantivo — "Não sei o porquê disso" (no sé el motivo). En A1 basta dominar las dos primeras; las de tilde se reconocen al leer.',
      ],
    },
  ],
  visual: {
    mode: 'grammar-pattern',
    teacherLens: 'El estudiante aprende las 8 palabras interrogativas principales y la estructura sin inversión obligatoria en BP.',
    graphicPrompt: 'Tabla de interrogativos con traducción y ejemplo. Comparación BP (sin inversión) vs EP (con inversión). Destacar "por que" en dos palabras.',
    scene: [
      ['o que / onde / quando', 'qué / dónde / cuándo'],
      ['quem / como / por que', 'quién / cómo / por qué'],
      ['quanto-a / qual-quais', 'cuánto-a / cuál-cuáles'],
    ],
    learnerModes: ['visual: tabla interrogativos', 'oral: entonación ascendente BP', 'escrito: por que vs porque'],
    reviewFocus: ['o que (no solo "que")', 'por que = dos palabras en pregunta', 'sin inversión en BP', 'qual = elección entre opciones'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Palabra interrogativa correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la palabra interrogativa correcta para cada pregunta.',
        type: 'choice',
        items: [
          {
            scene: '¿Cómo estás?',
            lines: [['Carlos', '___ você está hoje?']],
            options: ['Como', 'Quem', 'Onde', 'O que'],
            answer: 'Como',
            explain: 'Como = cómo. Para preguntar por el estado o la manera.',
          },
          {
            scene: '¿Dónde vives?',
            lines: [['Ana', '___ você mora?']],
            options: ['Onde', 'Quando', 'Como', 'Qual'],
            answer: 'Onde',
            explain: 'Onde = dónde. Para preguntar por lugar.',
          },
          {
            scene: '¿Qué quieres?',
            lines: [['Sofia', '___ você quer beber?']],
            options: ['O que', 'Que', 'Quem', 'Quanto'],
            answer: 'O que',
            explain: 'O que = qué. En portugués siempre "o que", no solo "que".',
          },
          {
            scene: '¿Quién eres?',
            lines: [['Marco', '___ é você? Não te conheço.']],
            options: ['Quem', 'Como', 'O que', 'Qual'],
            answer: 'Quem',
            explain: 'Quem = quién. Para preguntar por personas.',
          },
          {
            scene: '¿Por qué estudias?',
            lines: [['Leo', '___ você estuda português?']],
            options: ['Por que', 'Porque', 'Por quê', 'Porquê'],
            answer: 'Por que',
            explain: 'Por que = por qué (pregunta). Dos palabras sin acento. "Porque" es la respuesta.',
          },
          {
            scene: '¿Cuándo empieza?',
            lines: [['Lina', '___ começa a aula de coreano?']],
            options: ['Quando', 'Onde', 'Como', 'Quem'],
            answer: 'Quando',
            explain: 'Quando = cuándo. Para preguntar por tiempo.',
          },
          {
            scene: '¿Cuánto cuesta?',
            lines: [['Elena', '___ custa o curso?']],
            options: ['Quanto', 'Quanta', 'Quantos', 'Qual'],
            answer: 'Quanto',
            explain: 'Quanto custa: cuánto cuesta. Quanto para sustantivos masculinos o neutros.',
          },
          {
            scene: '¿Cuál es tu nombre?',
            lines: [['Carlos', '___ é o seu nome?']],
            options: ['Qual', 'O que', 'Quem', 'Como'],
            answer: 'Qual',
            explain: 'Qual = cuál. Para elegir entre opciones. Qual é o seu nome? = ¿Cuál es tu nombre?',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Diálogos con preguntas',
        tag: '2 espacios',
        intro: 'Completa la pregunta con los dos elementos que faltan.',
        type: 'dual',
        items: [
          {
            scene: '¿Qué haces?',
            lines: [
 ['Ana', '[[0]] você [[1]] no Brasil?'],
 ['Carlos', 'Estudo português e trabalho numa escola.'],
 ],
            blanks: [
              { options: ['O que', 'Que', 'Como'], answer: 'O que', explain: 'O que = qué. Para preguntar por actividad.' },
              { options: ['faz', 'faz você', 'fazer'], answer: 'faz', explain: 'Você faz: tercera sg. No inversión obligatoria en BP.' },
            ],
          },
          {
            scene: '¿Dónde vives?',
            lines: [
 ['Marco', '[[0]] você [[1]]?'],
 ['Sofia', 'Moro em São Paulo, no centro.'],
 ],
            blanks: [
              { options: ['Onde', 'Cuando', 'Quem'], answer: 'Onde', explain: 'Onde = dónde. Para lugar.' },
              { options: ['mora', 'morar', 'moras'], answer: 'mora', explain: 'Você mora: tercera sg de morar.' },
            ],
          },
          {
            scene: '¿Cuántos años tienes?',
            lines: [
 ['Lina', '[[0]] anos você [[1]]?'],
 ['Leo', 'Tenho trinta e dois anos.'],
 ],
            blanks: [
              { options: ['Quantos', 'Quanto', 'Quanta'], answer: 'Quantos', explain: 'Quantos anos: cuántos años. Concuerda con anos (masculino plural).' },
              { options: ['tem', 'tens', 'ter'], answer: 'tem', explain: 'Você tem: tercera sg de ter.' },
            ],
          },
          {
            scene: '¿Por qué aprendes?',
            lines: [
 ['Elena', '[[0]] você [[1]] coreano?'],
 ['Carlos', 'Porque adoro a cultura coreana!'],
 ],
            blanks: [
              { options: ['Por que', 'Porque', 'Como'], answer: 'Por que', explain: 'Por que = por qué (pregunta). Dos palabras.' },
              { options: ['aprende', 'aprendes', 'aprendo'], answer: 'aprende', explain: 'Você aprende: tercera sg de aprender.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Completa el diálogo eligiendo el interrogativo correcto.',
        type: 'guidedText',
        scene: 'Primeiro dia na WeLearn — Elena entrevista a Carlos',
        text: '[[0]] é o seu nome completo? [[1]] você mora? [[2]] idiomas você fala? [[3]] você chegou ao Brasil? [[4]] anos você tem? [[5]] você escolheu a WeLearn? [[6]] é o seu objetivo principal?',
        blanks: [
          { options: ['Qual', 'Quem', 'O que'], answer: 'Qual', explain: 'Qual é o seu nome? = ¿Cuál es tu nombre? Elección.' },
          { options: ['Onde', 'Quando', 'Como'], answer: 'Onde', explain: 'Onde você mora? = ¿Dónde vives?' },
          { options: ['Quantos', 'Quanto', 'Quais'], answer: 'Quantos', explain: 'Quantos idiomas: cuántos idiomas. Masculino plural.' },
          { options: ['Quando', 'Onde', 'Como'], answer: 'Quando', explain: 'Quando você chegou? = ¿Cuándo llegaste?' },
          { options: ['Quantos', 'Quanto', 'Qual'], answer: 'Quantos', explain: 'Quantos anos = cuántos años. Plural.' },
          { options: ['Por que', 'Porque', 'Quem'], answer: 'Por que', explain: 'Por que você escolheu? = ¿Por qué elegiste?' },
          { options: ['Qual', 'Quem', 'Onde'], answer: 'Qual', explain: 'Qual é o objetivo? = ¿Cuál es el objetivo? Elección.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe el interrogativo correcto sin ayuda.',
        type: 'freeText',
        scene: 'Preguntas sobre la WeLearn',
        text: '[[0]] se chama a escola? [[1]] fica a escola? [[2]] professores trabalham aqui? [[3]] começa o próximo curso? [[4]] custa o curso básico? [[5]] línguas vocês ensinam?',
        blanks: [
          { answer: 'Como', explain: 'Como se chama? = ¿Cómo se llama? Para nombre/manera.' },
          { answer: 'Onde', explain: 'Onde fica? = ¿Dónde está? Para lugar.' },
          { answer: 'Quantos', explain: 'Quantos professores: cuántos profesores. Masculino plural.' },
          { answer: 'Quando', explain: 'Quando começa? = ¿Cuándo empieza? Para tiempo.' },
          { answer: 'Quanto', explain: 'Quanto custa? = ¿Cuánto cuesta? Neutro/masculino singular.' },
          { answer: 'Quais', accepted: ['Que', 'Quantas'], explain: 'Quais línguas: cuáles lenguas. Plural de qual.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la pregunta completa en portugués.',
        type: 'write',
        items: [
          {
            scene: '¿Cómo te llamas?',
            prompt: 'Escribe en portugués: ¿Cómo te llamas?',
            answer: 'Como você se chama?',
            accepted: ['como você se chama', 'como se chama você', 'como se chama'],
            explain: 'Como você se chama? Interrogativo + você + verbo. Sin inversión obligatoria en BP.',
          },
          {
            scene: '¿Dónde vives?',
            prompt: 'Escribe en portugués: ¿Dónde vives?',
            answer: 'Onde você mora?',
            accepted: ['onde você mora', 'onde mora você'],
            explain: 'Onde você mora? = ¿Dónde vives? Onde + sujeto + verbo.',
          },
          {
            scene: '¿Por qué estudias portugués?',
            prompt: 'Escribe en portugués: ¿Por qué estudias portugués?',
            answer: 'Por que você estuda português?',
            accepted: ['por que você estuda português', 'por que estuda você português'],
            explain: 'Por que: dos palabras en la pregunta. No "porque" (que es la respuesta).',
          },
          {
            scene: '¿Cuántos idiomas hablas?',
            prompt: 'Escribe en portugués: ¿Cuántos idiomas hablas?',
            answer: 'Quantos idiomas você fala?',
            accepted: ['quantos idiomas você fala', 'quantos idiomas fala você'],
            explain: 'Quantos idiomas: cuántos idiomas (masc. pl.). Você fala (3ª sg).',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Formula preguntas para conocer a alguien en una clase de portugués.',
        type: 'write',
        items: [
          {
            scene: 'Presentación',
            prompt: 'Formula 3 preguntas: nombre, lugar de origen, idiomas que habla.',
            answer: 'Qual é o seu nome? De onde você é? Quais idiomas você fala?',
            accepted: ['qual é o seu nome de onde você é quais idiomas você fala'],
            explain: 'Qual (nombre/elección), De onde (origen), Quais idiomas (plural de cual).',
          },
          {
            scene: 'Intereses',
            prompt: 'Formula 3 preguntas: por qué estudia portugués, cuántos años tiene, qué hace en su tiempo libre.',
            answer: 'Por que você estuda português? Quantos anos você tem? O que você faz no tempo livre?',
            accepted: ['por que você estuda português quantos anos você tem o que você faz no tempo livre'],
            explain: 'Por que (pregunta), Quantos anos (edad), O que (actividad).',
          },
          {
            scene: 'Planes',
            prompt: 'Formula 3 preguntas: cuándo viaja al Brasil, con quién viaja, cuánto tiempo se queda.',
            answer: 'Quando você vai ao Brasil? Com quem você vai viajar? Quanto tempo você vai ficar?',
            accepted: ['quando você vai ao brasil com quem você vai viajar quanto tempo você vai ficar'],
            explain: 'Quando (tiempo), Com quem (compañía), Quanto tempo (duración).',
          },
        ],
      },
    ],
  },
}

export default topic
