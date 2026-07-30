import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'avverbi-frequenza',
  order: '18',
  color: '#009246',
  category: 'Avverbi',
  level: 'A1',
  title: 'Avverbi di frequenza in italiano A1: sempre, spesso, qualche volta, mai',
  shortTitle: 'Avverbi di frequenza',
  metaTitle: 'Avverbi di frequenza italiano A1 — sempre, spesso, qualche volta, raramente, mai',
  description:
    'Los adverbios de frecuencia en italiano dicen con qué regularidad haces algo. Sempre (siempre), spesso (a menudo/frecuentemente), qualche volta (algunas veces), raramente (raramente), mai (nunca). Posición: generalmente DESPUÉS del verbo en oraciones simples, y entre ausiliare y participio en tiempos compuestos.',
  lead: 'Sempre, spesso, qualche volta, raramente, mai — estos adverbios italianos dicen con qué frecuencia haces algo. Van después del verbo, y con la negación: Non... mai = Nunca.',
  outcomes: [
    'Usar los adverbios de frecuencia más comunes del italiano',
    'Colocar correctamente el adverbio después del verbo (no antes como en español)',
    'Construir la negación de "nunca": non... mai',
  ],
  guide: {
    goal: 'Expresar la frecuencia de acciones habituales con los adverbios correctos.',
    model: '[sujeto] + [verbo] + [adverbio de frecuencia]',
    formula: 'Io studio sempre. / Non vado mai. / Mangio spesso la pizza.',
    decisions: [
      '¿La acción es constante? → sempre (Dormo sempre otto ore — Siempre duermo ocho horas)',
      '¿La acción es frecuente pero no constante? → spesso (Mangio spesso pizza — Como pizza a menudo)',
      '¿La acción ocurre de vez en cuando? → qualche volta / a volte (A volte studio la sera)',
      '¿La acción es poco frecuente? → raramente (Raramente mangio carne — Raramente como carne)',
      '¿La acción nunca ocurre? → non... mai (Non bevo mai alcol — Nunca bebo alcohol)',
    ],
    table: [
      ['Adverbio italiano', 'Equivalente español', 'Ejemplo'],
      ['sempre', 'siempre', 'Studio sempre alle otto (Siempre estudio a las ocho)'],
      ['spesso', 'a menudo / frecuentemente', 'Mangio spesso pizza (Como pizza a menudo)'],
      ['qualche volta / a volte', 'algunas veces / a veces', 'A volte guardo la TV (A veces veo la tele)'],
      ['raramente', 'raramente / pocas veces', 'Raramente faccio sport (Raramente hago deporte)'],
      ['mai', 'nunca', 'Non bevo mai caffè (Nunca bebo café)'],
    ],
    mistakes: [
      '"Mai" sin negación cambia de sentido: "Hai mai studiato italiano?" = "¿Has estudiado italiano alguna vez?" (interrogativo, no negativo).',
      'Posición: il adverbio va DOPO il verbo (studio sempre), non prima (siempre studio es anglicismo/hispanismo).',
      '"Non... mai" necesita ambas partes: Non mangio mai sushi (NO: "Mai mangio sushi" en afirmaciones).',
      '"Qualche volta" y "a volte" son intercambiables en A1; "a volte" es más coloquial.',
    ],
  },
  seo: [
    {
      heading: '¿Dónde se colocan los adverbios de frecuencia en italiano?',
      paragraphs: [
        'En italiano, los adverbios de frecuencia van generalmente DESPUÉS del verbo conjugado: Io mangio sempre la pizza (no siempre mangio). Esto es diferente del inglés pero similar al español en muchos casos, aunque en español hay más libertad posicional.',
        'Con los tiempos compuestos (passato prossimo) el adverbio va entre il ausiliare (ho/sono) y il participio passato: Ho sempre mangiato pizza (Siempre he comido pizza). Questa posizione es obligatoria para "sempre", "spesso", "mai" en compound tenses.',
      ],
      table: [
        ['Adverbio', 'Presente', 'Tiempo compuesto'],
        ['sempre', 'Studio sempre (Siempre estudio)', 'Ho sempre studiato (Siempre he estudiado)'],
        ['spesso', 'Guardo spesso film (Veo películas a menudo)', 'Ho spesso guardato film'],
        ['mai', 'Non vado mai al gym (Nunca voy al gym)', 'Non sono mai andato al gym'],
      ],
    },
    {
      heading: 'La escala de frecuencia: de "sempre" a "mai"',
      paragraphs: [
        'Estos son los adverbios de frecuencia ordenados de más a menos, con su equivalente español. Fíjate en que "non… mai" (0%) exige "non" antes del verbo:',
      ],
      table: [
        ['Adverbio', 'Frecuencia', 'Español'],
        ['sempre', '~100 %', 'siempre'],
        ['di solito / normalmente', '~80 %', 'normalmente'],
        ['spesso', '~70 %', 'a menudo'],
        ['a volte / qualche volta', '~40 %', 'a veces'],
        ['raramente', '~10 %', 'raramente'],
        ['non… mai', '0 %', 'nunca'],
      ],
    },
    {
      heading: 'Mai: "nunca" y "alguna vez" en italiano',
      paragraphs: [
        '"Mai" tiene dos usos distintos que confunden a los hispanohablantes. Con negación (non... mai) significa "nunca": Non bevo mai vino = Nunca bebo vino. Pero en preguntas y frases afirmativas, "mai" significa "alguna vez": Hai mai visitato Roma? = ¿Has visitado Roma alguna vez?',
        'Esta dualidad hace que "mai" sea un adverbio clave en italiano: cambia completamente de significado según el contexto. En A1 enfócate en non... mai para "nunca" y mai? en preguntas directas.',
      ],
    },
    {
      heading: '¿Dónde se colocan los adverbios de frecuencia en italiano?',
      paragraphs: [
        'Normalmente DESPUÉS del verbo conjugado: "Mangio sempre la pasta", "Guardo spesso film". En los tiempos compuestos (passato prossimo) van entre el auxiliar y el participio: "Ho sempre studiato", "Non sono mai andato". "Di solito" y "a volte" pueden ir también al principio de la frase.',
      ],
    },
    {
      heading: '¿Cuáles son los adverbios de frecuencia en italiano?',
      paragraphs: [
        'De mayor a menor frecuencia: sempre (siempre), di solito / normalmente (normalmente), spesso (a menudo), a volte / qualche volta (a veces), raramente (raramente) y non… mai (nunca).',
      ],
    },
    {
      heading: '¿"Mai" significa "nunca" o "alguna vez"?',
      paragraphs: [
        'Depende del contexto. Con "non" antes del verbo significa "nunca": "Non bevo mai alcol". En preguntas significa "alguna vez": "Sei mai stato a Roma?" (¿has estado alguna vez en Roma?). La presencia o ausencia de "non" es la clave.',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'Focus on post-verb placement (different from some student L1s) and the double-negative non...mai construction. Also drill the question use of "mai" (have you ever...?).',
    graphicPrompt:
      'Frecuency spectrum bar: sempre (100%) → spesso (70%) → qualche volta (30%) → raramente (10%) → mai (0%). Italian green/white/red theme.',
    scene: [
      ['sempre', 'Studio sempre italiano (Stúdio sémpre) — Siempre estudio italiano'],
      ['spesso', 'Mangio spesso pasta (Spésso) — Como pasta a menudo'],
      ['qualche volta', 'A volte guardo film (A vólte) — A veces veo películas'],
      ['raramente', 'Raramente faccio sport (Rararménte) — Raramente hago deporte'],
      ['mai', 'Non bevo mai caffè (Non bévo mài) — Nunca bebo café'],
      ['mai (dom.)', 'Hai mai studiato italiano? (Ài màì) — ¿Has estudiado italiano alguna vez?'],
    ],
    learnerModes: ['recognition', 'transformation', 'gap-fill', 'production'],
    practiceVerbs: ['studiare', 'mangiare', 'guardare', 'fare', 'bere', 'andare'],
    reviewFocus: ['posición después del verbo', 'non...mai (nunca)', 'mai en preguntas (alguna vez)'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Riconoscimento degli avverbi',
        tag: 'Opción múltiple',
        intro: 'Elige el adverbio de frecuencia correcto.',
        type: 'choice',
        items: [
          { scene: 'Significado de "spesso"', lines: [['', '"Mangio spesso pizza." ¿Qué significa spesso?']], options: ['nunca', 'siempre', 'a menudo', 'raramente'], answer: 'a menudo', explain: 'Spesso = a menudo / frecuentemente. Mangio spesso pizza = Como pizza a menudo.' },
          { scene: 'Non...mai', lines: [['', '"Non bevo ___ alcol." Para decir "Nunca bebo alcohol":']], options: ['spesso', 'sempre', 'mai', 'qualche volta'], answer: 'mai', explain: 'Non bevo mai alcol = Nunca bebo alcohol. Non... mai = nunca.' },
          { scene: 'Posición del adverbio', lines: [['', '¿Cuál es el orden correcto? "Estudio siempre a las ocho."']], options: ['Sempre studio alle otto', 'Studio sempre alle otto', 'Studio alle otto sempre', 'Io sempre studio'], answer: 'Studio sempre alle otto', explain: 'Studio sempre alle otto. El adverbio va DESPUÉS del verbo (studio sempre), no antes (sempre studio es menos natural).' },
          { scene: '"Qualche volta"', lines: [['', '"A veces veo la tele": Io ___ guardo la TV.']], options: ['sempre', 'qualche volta', 'mai', 'spesso'], answer: 'qualche volta', explain: 'Qualche volta / a volte = a veces / algunas veces. Guardo qualche volta la TV.' },
          { scene: '"Mai" en pregunta', lines: [['', '"Hai mai studiato italiano?" significa:']], options: ['¿Nunca has estudiado italiano?', '¿Has estudiado italiano alguna vez?', '¿Siempre estudias italiano?', '¿Estudias italiano a menudo?'], answer: '¿Has estudiado italiano alguna vez?', explain: '"Mai" en preguntas = "alguna vez". Hai mai...? = ¿Has... alguna vez? Con non = nunca.' },
          { scene: 'Raramente', lines: [['', '"Raramente faccio sport." ¿Qué significa?']], options: ['Hago deporte a menudo', 'Nunca hago deporte', 'Raramente hago deporte', 'Siempre hago deporte'], answer: 'Raramente hago deporte', explain: 'Raramente = raramente / pocas veces. Faccio sport raramente.' },
          { scene: 'Sempre', lines: [['', '"___ dormo otto ore." Para "Siempre duermo ocho horas" (posición post-verbal correcta):']], options: ['Sempre dormo otto ore', 'Dormo sempre otto ore', 'Dormo otto ore sempre', 'Io sempre dormo'], answer: 'Dormo sempre otto ore', explain: 'Dormo sempre otto ore. Adverbio dopo il verbo. (Sempre dormo es menos estándar aunque se entiende.)' },
          { scene: 'Non...mai construcción', lines: [['', '"Nunca como carne": Non mangio ___ carne.']], options: ['sempre', 'spesso', 'mai', 'raramente'], answer: 'mai', explain: 'Non mangio mai carne = Nunca como carne. Non + verbo + mai = nunca.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Frequenza — due spazi',
        tag: '2 espacios',
        intro: 'Completa con el adverbio y la posición correcta.',
        type: 'dual',
        items: [
          { scene: 'Non...mai construcción', lines: [['', '"Nunca bebo café": [[0]] bevo [[1]] caffè.']], blanks: [{ options: ['Non', 'Mai', 'Spesso', 'Sempre'], answer: 'Non', explain: 'Non inicia la negación. Non... mai = nunca.' }, { options: ['mai', 'sempre', 'spesso', 'qualche volta'], answer: 'mai', explain: 'Non bevo mai = Nunca bebo. La doble negación es obligatoria en italiano.' }] },
          { scene: 'Spesso en frase', lines: [['', '"Como pizza a menudo": Mangio [[0]] [[1]].']], blanks: [{ options: ['spesso', 'sempre', 'mai', 'raramente'], answer: 'spesso', explain: 'Spesso = a menudo. El adverbio va después del verbo.' }, { options: ['la pizza', 'pizza', 'pizze', 'una pizza'], answer: 'pizza', explain: 'Mangio spesso pizza (sin artículo cuando es genérico) o la pizza (específico).' }] },
          { scene: 'Sempre — tiempo compuesto', lines: [['', '"Siempre he estudiado italiano": Ho [[0]] [[1]] italiano.']], blanks: [{ options: ['sempre', 'mai', 'spesso', 'raramente'], answer: 'sempre', explain: 'Ho sempre... Con tiempo compuesto el adverbio va entre ausiliare (ho) y participio.' }, { options: ['studiato', 'studiare', 'studio', 'studiando'], answer: 'studiato', explain: 'Ho studiato = he estudiado. Participio passato de studiare = studiato.' }] },
          { scene: 'A volte construcción', lines: [['', '"A veces voy al cine": [[0]] vado [[1]] al cinema.']], blanks: [{ options: ['A volte', 'Spesso', 'Sempre', 'Mai'], answer: 'A volte', explain: 'A volte / qualche volta = a veces.' }, { options: ['qualche volta', 'sempre', 'mai', 'spesso'], answer: 'qualche volta', explain: 'A volte vado qualche volta — alternativamente puedes usar solo "A volte vado al cinema".' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Testo guidato — una settimana tipica',
        tag: 'Opciones',
        intro: 'Elige el adverbio correcto para cada espacio.',
        type: 'guidedText',
        scene: 'La semana típica de Lina, estudiante de italiano en WeLearn',
        text: 'Lina è una studentessa di WeLearn. Studio [[0]] italiano alle sette di mattina. (Siempre estudio italiano a las siete de la mañana.) Mangio [[1]] pasta a pranzo, ma [[2]] mangio sushi. (Como pasta a menudo a la hora del almuerzo, pero nunca como sushi.) A volte, [[3]] vado al cinema con gli amici. (A veces, raramente voy al cine con los amigos.) Non dormo [[4]] meno di sette ore. (Nunca duermo menos de siete horas.)',
        blanks: [
          { options: ['spesso', 'sempre', 'mai', 'raramente'], answer: 'sempre', explain: 'Sempre = siempre. Studio sempre = Siempre estudio.' },
          { options: ['mai', 'raramente', 'spesso', 'qualche volta'], answer: 'spesso', explain: 'Spesso = a menudo. Mangio spesso pasta = Como pasta a menudo.' },
          { options: ['spesso', 'sempre', 'non...mai', 'a volte'], answer: 'non...mai', explain: 'Non mangio mai sushi = nunca como sushi. Non... mai = nunca.' },
          { options: ['sempre', 'mai', 'spesso', 'raramente'], answer: 'raramente', explain: 'Raramente = raramente / pocas veces. A volte, raramente vado... (pocas veces de esas "a veces").' },
          { options: ['spesso', 'sempre', 'mai', 'qualche volta'], answer: 'mai', explain: 'Non dormo mai = Nunca duermo. Non...mai = nunca.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Testo libero — scrivi la frequenza',
        tag: 'Sin opciones',
        intro: 'Escribe el adverbio o expresión correcta sin opciones.',
        type: 'freeText',
        scene: 'Describiendo hábitos personales',
        text: '1. "Siempre desayuno en casa": [[0]] faccio colazione a casa. 2. "Nunca bebo alcohol": Non bevo [[1]] alcol. 3. "A veces estudio por la noche": [[2]] studio la sera. 4. "Como carne raramente": Mangio carne [[3]]. 5. "A menudo hablo italiano con Tomás": Parlo [[4]] italiano con Tomás.',
        blanks: [
          { answer: 'Faccio sempre', accepted: ['faccio sempre', 'Sempre faccio'], explain: 'Faccio sempre colazione (verbo + adverbio) o Sempre faccio (inicial). Lo más natural: Faccio sempre.' },
          { answer: 'mai', accepted: ['mai'], explain: 'Non bevo mai alcol = Nunca bebo alcohol. Non...mai indispensable.' },
          { answer: 'A volte', accepted: ['A volte', 'Qualche volta', 'a volte', 'qualche volta'], explain: 'A volte / Qualche volta = a veces.' },
          { answer: 'raramente', accepted: ['raramente'], explain: 'Mangio carne raramente = Como carne raramente.' },
          { answer: 'spesso', accepted: ['spesso'], explain: 'Parlo spesso italiano = Hablo italiano a menudo.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Produzione scritta',
        tag: 'Producción',
        intro: 'Construye frases completas con adverbios de frecuencia.',
        type: 'write',
        items: [
          { scene: 'Rutina personal', prompt: 'Traduce al italiano: "Siempre tomo café por la mañana pero nunca como dulces antes de las diez." (caffè = café, mattina = mañana, dolci = dulces, prima delle dieci = antes de las diez)', answer: 'Bevo sempre caffè la mattina ma non mangio mai dolci prima delle dieci', accepted: ['sempre', 'non...mai', 'mai'], explain: 'bevo sempre + non mangio mai. La estructura non...mai es indispensable para "nunca".' },
          { scene: 'Pregunta de frecuencia', prompt: 'Traduce al italiano: "¿Vas a menudo al restaurante italiano? A veces voy con Tomás." (ristorante = restaurante, andare = ir)', answer: 'Vai spesso al ristorante italiano? A volte ci vado con Tomás.', accepted: ['spesso', 'volte', 'a volte'], explain: 'Vai spesso? = ¿Vas a menudo? A volte = a veces. (ci = allí, pronombre de lugar).' },
          { scene: 'Hai mai...?', prompt: 'Escribe la pregunta: "¿Has visitado Roma alguna vez?" y una respuesta negativa: "No, nunca he estado en Roma." (visitare = visitar, essere = haber estado)', answer: 'Hai mai visitato Roma? No, non sono mai stato a Roma.', accepted: ['hai mai', 'non sono mai'], explain: 'Hai mai + participio = ¿Has... alguna vez? Non sono mai stato = Nunca he estado. Mai en ambos contextos.' },
          { scene: 'Describir a otra persona', prompt: 'Traduce al italiano: "Marta siempre llega puntual y raramente cancela las clases." (arrivare puntuale = llegar puntual, cancellare = cancelar, lezioni = clases)', answer: 'Marta arriva sempre puntuale e raramente cancella le lezioni', accepted: ['sempre', 'raramente'], explain: 'arriva sempre (verbo + adverbio) + raramente cancella. Orden natural italiano.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Missione comunicativa',
        tag: 'Producción',
        intro: 'Describe tu rutina usando todos los adverbios de frecuencia.',
        type: 'write',
        items: [
          { scene: 'La tua routine', prompt: 'Scrivi 5 frasi sulla tua routine usando: sempre, spesso, a volte, raramente, e non...mai. Vocabolario útil: fare sport, mangiare, studiare, guardare la TV, leggere, dormire, andare al cinema.', answer: 'Faccio sempre colazione. Mangio spesso pasta. A volte guardo la TV. Raramente faccio sport. Non bevo mai alcol.', accepted: ['sempre', 'spesso', 'a volte', 'raramente', 'mai'], explain: 'Usa tutti e cinque gli avverbi. Posición: dopo il verbo (faccio sempre, mangio spesso, non bevo mai).' },
          { scene: 'Intervista a un amico', prompt: 'Scrivi 3 domande per un\'intervista usando "Hai mai...?" + "Vai spesso...?" + "Mangi sempre...?". Poi scrivi le risposte.', answer: 'Hai mai studiato italiano? Vai spesso al cinema? Mangi sempre la pizza? — Sì, ho studiato italiano! Vado spesso al cinema. Non mangio sempre la pizza.', accepted: ['hai mai', 'spesso', 'sempre'], explain: 'Hai mai + participio (alguna vez). Vai spesso (a menudo). Mangi sempre (siempre).' },
        ],
      },
    ],
  },
}

export default topic
