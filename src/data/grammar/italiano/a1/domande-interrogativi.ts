import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'domande-interrogativi',
  order: '09',
  color: '#009246',
  category: 'Estructura de la oración',
  level: 'A1',
  title: 'Domande e interrogativi en italiano A1 — Cómo hacer preguntas',
  shortTitle: 'Preguntas (chi, cosa, dove...)',
  metaTitle: 'Preguntas en italiano A1 — chi cosa dove quando come perché quanto',
  description:
    'Las preguntas en italiano A1 con las palabras interrogativas chi, cosa/che cosa, dove, quando, come, perché, quanto/a/i/e. La inversión sujeto-verbo no es obligatoria; basta con la entonación o añadir el interrogativo al inicio.',
  lead: 'Para preguntar en italiano: sube la entonación (¿Parli italiano?) o añade un interrogativo (Dove abiti? Come stai? Chi sei?). La inversión es opcional — el italiano es flexible en el orden.',
  outcomes: [
    'Formula preguntas sí/no con entonación ascendente',
    'Usa chi, cosa, dove, quando, come, perché y quanto en preguntas directas',
    'Entiende que la inversión sujeto-verbo es opcional en italiano',
  ],

  guide: {
    goal: 'Formular preguntas en italiano con y sin palabras interrogativas.',
    model: 'Come si chiama? / Dove abiti? / Chi è? / Che cosa studi?',
    formula: 'interrogativo + verbo [+ sujeto] — o solo entonación ascendente',
    decisions: [
      'Preguntas sí/no: misma estructura afirmativa + entonación: Parli italiano?',
      'Chi = quién (singular): Chi sei? Chi parla?',
      'Cosa / che cosa = qué: Cosa fai? Che cosa studi?',
      'Dove = dónde: Dove abiti? Dove lavori?',
      'Quando = cuándo: Quando arrivi? Quando finisce?',
      'Come = cómo: Come stai? Come si chiama?',
      'Perché = por qué (respuesta: perché = porque): Perché studi italiano?',
      'Quanto/quanta/quanti/quante = cuánto/s: Quanto costa? Quanti anni hai?',
    ],
    table: [
      ['Interrogativo', 'Significado', 'Ejemplo'],
      ['chi', 'quién', 'Chi parla? / Chi sei?'],
      ['cosa / che cosa', 'qué', 'Cosa fai? / Che cosa studi?'],
      ['dove', 'dónde', 'Dove abiti? / Dove lavori?'],
      ['quando', 'cuándo', 'Quando parti? / Quando finisce?'],
      ['come', 'cómo', 'Come stai? / Come si chiama?'],
      ['perché', 'por qué / porque', 'Perché studi? / Perché è tardi.'],
      ['quanto/a/i/e', 'cuánto/s', 'Quanto costa? / Quanti anni hai?'],
    ],
    mistakes: [
      '"Dove tu abiti?" es posible pero lo más natural es "Dove abiti?" sin pronombre explícito.',
      '"Perché" = por qué (pregunta) Y porque (respuesta): Perché studi? — Perché è bello.',
      '"Quanti anni hai" no "Quanti anni sei" — los años se tienen (avere), no se es.',
    ],
  },
  seo: [
    {
      heading: 'Preguntas en italiano: inversión opcional',
      paragraphs: [
        'Una de las ventajas del italiano para el hispanohablante es que hacer preguntas es muy natural. No existe inversión obligatoria como en inglés. Puedes decir "Tu parli italiano?" o "Parli italiano?" — ambas son preguntas correctas, y la diferencia es solo de énfasis o registro.',
        'Las preguntas de sí/no se forman simplemente con entonación ascendente: "Sei stanco?" (¿Estás cansado?), "Hai fame?" (¿Tienes hambre?), "Abiti a Roma?" (¿Vives en Roma?). Es muy similar al español coloquial.',
      ],
    },
    {
      heading: 'Las palabras interrogativas del italiano A1',
      paragraphs: [
        'Estos son los interrogativos que necesitas para preguntar cualquier cosa en A1. "Cosa" y "che cosa" son intercambiables (che cosa es algo más formal); "perché" sirve para preguntar y para responder; y "quanto" y "quale" concuerdan con el sustantivo:',
      ],
      table: [
        ['Interrogativo', 'Significado', 'Ejemplo'],
        ['chi', 'quién', 'Chi è?'],
        ['(che) cosa', 'qué', 'Cosa fai?'],
        ['dove', 'dónde', 'Dove abiti?'],
        ['quando', 'cuándo', 'Quando parti?'],
        ['come', 'cómo', 'Come stai?'],
        ['perché', 'por qué / porque', 'Perché studi?'],
        ['quanto/-a/-i/-e', 'cuánto/-a/-os/-as', 'Quanti anni hai?'],
        ['quale / quali', 'cuál / cuáles', 'Quale preferisci?'],
      ],
    },
    {
      heading: 'Quanto y el acuerdo de género y número',
      paragraphs: [
        'Quanto concuerda con el sustantivo al que acompaña: quanto (masc. sg.), quanta (fem. sg.), quanti (masc. pl.), quante (fem. pl.). Quanto costa? (¿Cuánto cuesta?), Quante ore studi? (¿Cuántas horas estudias?), Quanti studenti ci sono? (¿Cuántos estudiantes hay?).',
        'Come se usa en muchas expresiones fijas de A1: Come stai? (¿Cómo estás?), Come si chiama? (¿Cómo se llama?), Come si scrive? (¿Cómo se escribe?). Estas fórmulas son esenciales para la conversación cotidiana.',
      ],
    },
    {
      heading: '¿Cuáles son las palabras interrogativas en italiano?',
      paragraphs: [
        'chi (quién), cosa / che cosa (qué), dove (dónde), quando (cuándo), come (cómo), perché (por qué), quanto/-a/-i/-e (cuánto) y quale/quali (cuál). Con ellas se abre cualquier pregunta: "Dove vai?", "Chi viene?", "Quanto costa?".',
      ],
    },
    {
      heading: '¿Cómo se hacen preguntas de sí/no en italiano?',
      paragraphs: [
        'Solo con entonación ascendente, sin inversión ni verbos auxiliares: "Parli italiano?", "Hai fame?", "Abiti a Roma?". La frase es idéntica a la afirmativa; solo cambia la entonación (y el signo de interrogación por escrito).',
      ],
    },
    {
      heading: '¿"Perché" significa "por qué" o "porque"?',
      paragraphs: [
        'Las dos cosas: es una sola palabra que pregunta y responde. "Perché studi italiano?" (¿por qué estudias italiano?) — "Perché mi piace" (porque me gusta). El contexto (pregunta o respuesta) indica cuál de los dos sentidos es.',
      ],
    },
  ],
  visual: {
    mode: 'sentence-structure',
    teacherLens: 'El estudiante aprende los interrogativos como vocabulario y entiende que la estructura es flexible en italiano.',
    graphicPrompt: 'Mapa mental de interrogativos italianos con ejemplos. Flecha de entonación para preguntas sí/no.',
    scene: [
      ['Entonación ↑', 'Parli italiano? / Hai fame?'],
      ['chi', '¿quién? — Chi sei?'],
      ['cosa / che cosa', '¿qué? — Cosa fai?'],
      ['dove / quando / come', '¿dónde/cuándo/cómo?'],
      ['perché', '¿por qué? Y: porque'],
      ['quanto/a/i/e', '¿cuánto/s? — Quanti anni?'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['perché = por qué y porque', 'quanto concuerda en género/número', 'inversión opcional', 'cosa vs che cosa'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Elige el interrogativo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la palabra interrogativa que corresponde a cada pregunta.',
        type: 'choice',
        items: [
          {
            scene: 'Preguntando el nombre',
            lines: [['Bruno', '___ si chiama la tua insegnante?']],
            options: ['Come', 'Dove', 'Chi', 'Quando'],
            answer: 'Come',
            explain: 'Come si chiama = ¿cómo se llama? Fórmula fija.',
          },
          {
            scene: 'Preguntando quién es',
            lines: [['Nora', '___ è quella ragazza con Bruno?']],
            options: ['Chi', 'Cosa', 'Come', 'Quanto'],
            answer: 'Chi',
            explain: 'Chi = quién. Chi è? ¿Quién es?',
          },
          {
            scene: 'Preguntando dónde vive',
            lines: [['Ana', '___ abiti, Marco?']],
            options: ['Dove', 'Quando', 'Come', 'Perché'],
            answer: 'Dove',
            explain: 'Dove = dónde. Dove abiti? ¿Dónde vives?',
          },
          {
            scene: 'Preguntando qué estudias',
            lines: [['Carlo', '___ studi all\'università?']],
            options: ['Cosa', 'Chi', 'Dove', 'Quanto'],
            answer: 'Cosa',
            explain: 'Cosa = qué. Cosa studi? ¿Qué estudias?',
          },
          {
            scene: 'Preguntando cuándo llega',
            lines: [['Lina', '___ arriva Bruno a Bucaramanga?']],
            options: ['Quando', 'Come', 'Dove', 'Chi'],
            answer: 'Quando',
            explain: 'Quando = cuándo. Quando arriva? ¿Cuándo llega?',
          },
          {
            scene: 'Preguntando por qué estudia',
            lines: [['Sofia', '___ studi l\'italiano e non l\'inglese?']],
            options: ['Perché', 'Come', 'Chi', 'Dove'],
            answer: 'Perché',
            explain: 'Perché = por qué (pregunta). La respuesta también usa perché: porque.',
          },
          {
            scene: 'Preguntando cuántos años',
            lines: [['Marco', '___ anni hai, Carlo?']],
            options: ['Quanti', 'Quanto', 'Quante', 'Quanta'],
            answer: 'Quanti',
            explain: 'Quanti + sustantivo masculino plural: quanti anni (masc. pl.).',
          },
          {
            scene: 'Preguntando cómo está',
            lines: [['Bruno', 'Ciao Sofia! ___ stai?']],
            options: ['Come', 'Chi', 'Dove', 'Quanto'],
            answer: 'Come',
            explain: 'Come stai? = ¿Cómo estás? Saludo básico del italiano.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Diálogo con dos preguntas',
        tag: '2 espacios',
        intro: 'Completa el diálogo con los interrogativos correctos.',
        type: 'dual',
        items: [
          {
            scene: 'Conociendo a alguien nuevo',
            lines: [
 ['Bruno', '[[0]] ti chiami e [[1]] sei?'],
 ['Carlo', 'Mi chiamo Carlo e sono colombiano.'],
 ],
            blanks: [
              { options: ['Come', 'Dove', 'Chi'], answer: 'Come', explain: 'Come ti chiami? = ¿Cómo te llamas? Fórmula esencial.' },
              { options: ['di dove', 'dove', 'quando'], answer: 'di dove', explain: 'Di dove sei? = ¿De dónde eres? Dove + preposición di.' },
            ],
          },
          {
            scene: 'En WeLearn',
            lines: [['Nora', '[[0]] studi qui e [[1]] ore studi ogni giorno?']],
            blanks: [
              { options: ['Cosa', 'Chi', 'Dove'], answer: 'Cosa', explain: 'Cosa studi? = ¿Qué estudias? Interrogativo de cosa.' },
              { options: ['Quante', 'Quanto', 'Quanti'], answer: 'Quante', explain: 'Quante ore — ore es femenino plural, por eso quante.' },
            ],
          },
          {
            scene: 'Preguntando por el horario',
            lines: [
 ['Ana', '[[0]] inizia la lezione?'],
 ['Lina', 'Alle nove. E [[1]] finisce? Alle undici.'],
 ],
            blanks: [
              { options: ['Quando', 'Come', 'Dove'], answer: 'Quando', explain: 'Quando inizia? = ¿Cuándo empieza?' },
              { options: ['quando', 'come', 'dove'], answer: 'quando', explain: 'Quando finisce? = ¿Cuándo termina?' },
            ],
          },
          {
            scene: 'Preguntando el por qué',
            lines: [
 ['Marco', '[[0]] non parli in classe?'],
 ['Sofia', 'Non parlo [[1]] sono timida.'],
 ],
            blanks: [
              { options: ['Perché', 'Come', 'Chi'], answer: 'Perché', explain: 'Perché non parli? = ¿Por qué no hablas?' },
              { options: ['perché', 'quando', 'dove'], answer: 'perché', explain: 'Perché sono timida = porque soy tímida. Mismo perché para la respuesta.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Una conversazione di presentazione',
        tag: 'Opciones',
        intro: 'Completa la conversación de presentación con los interrogativos correctos.',
        type: 'guidedText',
        scene: 'Bruno entrevista a un nuevo estudiante en WeLearn',
        text: '[[0]] ti chiami? — Mi chiamo Carlo. [[1]] sei? — Sono colombiano, di Cali. [[2]] abiti adesso? — Abito a Bogotá. [[3]] studi all\'università? — Studio ingegneria. [[4]] studi l\'italiano? — [[5]] voglio lavorare in Italia. [[6]] anni hai? — Ho ventitré anni. [[7]] livello di italiano hai? — Sono principiante assoluto!',
        blanks: [
          { options: ['Come', 'Dove', 'Chi'], answer: 'Come', explain: 'Come ti chiami? — fórmula fija de presentación.' },
          { options: ['Di dove', 'Dove', 'Chi'], answer: 'Di dove', explain: 'Di dove sei? = ¿De dónde eres?' },
          { options: ['Dove', 'Quando', 'Come'], answer: 'Dove', explain: 'Dove abiti? = ¿Dónde vives?' },
          { options: ['Cosa', 'Chi', 'Come'], answer: 'Cosa', explain: 'Cosa studi? = ¿Qué estudias?' },
          { options: ['Perché', 'Quando', 'Come'], answer: 'Perché', explain: 'Perché studi l\'italiano? = ¿Por qué estudias italiano?' },
          { options: ['Perché', 'Come', 'Quando'], answer: 'Perché', explain: 'Perché voglio lavorare in Italia — la respuesta también usa perché: porque.' },
          { options: ['Quanti', 'Quanto', 'Quante'], answer: 'Quanti', explain: 'Quanti anni hai? = ¿Cuántos años tienes? Anni = masc. pl.' },
          { options: ['Che', 'Chi', 'Dove'], answer: 'Che', explain: 'Che livello hai? = ¿Qué nivel tienes? Che como adjetivo interrogativo.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe el interrogativo correcto para cada pregunta.',
        type: 'freeText',
        scene: 'Sofia hace preguntas a sus compañeros de clase en WeLearn',
        text: '[[0]] costa questo libro? — Costa venti euro. [[1]] si chiama la professoressa? — Si chiama Nora. [[2]] non vieni alla festa? — Perché sono stanco. [[3]] studenti ci sono in classe? — Ci sono quindici studenti. [[4]] abita Bruno? — Abita a Bucaramanga. [[5]] inizia il corso? — Inizia il tre settembre.',
        blanks: [
          { answer: 'Quanto', explain: 'Quanto costa? — cuánto (sing. masc.): quanto.' },
          { answer: 'Come', explain: 'Come si chiama? — fórmula de nombre con come.' },
          { answer: 'Perché', explain: 'Perché non vieni? — por qué.' },
          { answer: 'Quanti', explain: 'Quanti studenti? — masc. pl.: quanti.' },
          { answer: 'Dove', explain: 'Dove abita Bruno? — dónde.' },
          { answer: 'Quando', explain: 'Quando inizia? — cuándo.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la pregunta completa en italiano.',
        type: 'write',
        items: [
          {
            scene: '¿Dónde vive Marco?',
            prompt: 'Pregunta en italiano: ¿Dónde vive Marco? → ___ Marco?',
            answer: 'Dove abita Marco?',
            accepted: ['dove abita marco', 'dove abita marco?'],
            explain: 'Dove + verbo + sujeto: Dove abita Marco? (o Marco dove abita?)',
          },
          {
            scene: '¿Por qué estudias italiano?',
            prompt: 'Pregunta en italiano a tu compañero: ¿Por qué estudias italiano? → ___ l\'italiano?',
            answer: 'Perché studi l\'italiano?',
            accepted: ['perché studi l\'italiano', 'perché studi l\'italiano?', 'perché studi italiano'],
            explain: 'Perché + verbo (tu): Perché studi? Segunda sg de studiare.',
          },
          {
            scene: '¿Cuántas horas estudiais?',
            prompt: 'Pregunta a vuestra clase: ¿Cuántas horas estudiáis? → ___ ore studiate?',
            answer: 'Quante ore studiate?',
            accepted: ['quante ore studiate', 'quante ore studiate?'],
            explain: 'Quante (fem. pl.) ore studiate? — voi de studiare.',
          },
          {
            scene: '¿Cómo se llama tu profesora?',
            prompt: 'Pregunta: ¿Cómo se llama tu profesora? → ___ la tua professoressa?',
            answer: 'Come si chiama la tua professoressa?',
            accepted: ['come si chiama la tua professoressa', 'come si chiama la tua professoressa?'],
            explain: 'Come si chiama...? — fórmula fija para preguntar el nombre.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Formula preguntas completas sobre tu vida y la de tus compañeros.',
        type: 'write',
        items: [
          {
            scene: 'Preséntate con preguntas',
            prompt: 'Scrivi 3 domande per conoscere un nuovo compagno: Come ___? Dove ___? Perché ___?',
            answer: 'Come ti chiami? Dove abiti? Perché studi l\'italiano?',
            accepted: ['come ti chiami dove abiti perché studi', 'come si chiama dove abita perché studia'],
            explain: 'Come ti chiami, dove abiti, perché studi — preguntas básicas de presentación.',
          },
          {
            scene: 'Preguntas sobre WeLearn',
            prompt: 'Fai domande sulla scuola: Quando ___? Quanti ___? Cosa ___?',
            answer: 'Quando inizia la lezione? Quanti studenti ci sono? Cosa studiate oggi?',
            accepted: ['quando inizia quanti studenti cosa studiate', 'quando inizia la lezione quanti studenti ci sono cosa studiate'],
            explain: 'Quando, quanti, cosa — los interrogativos esenciales.',
          },
          {
            scene: 'Una mini-entrevista',
            prompt: 'Intervista un compagno: Chi sei? Di dove sei? Cosa fai? Perché sei qui?',
            answer: 'Chi sei? Di dove sei? Cosa fai nella vita? Perché studi l\'italiano a WeLearn?',
            accepted: ['chi sei di dove sei cosa fai perché sei qui', 'chi sei di dove sei cosa studi perché studi italiano'],
            explain: 'Chi, di dove, cosa, perché — interrogativos de entrevista básica.',
          },
        ],
      },
    ],
  },
}

export default topic
