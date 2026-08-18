// Lectura — Italiano B1. Diez lecturas.
//
// Fuente de verdad. Los JSON se generan con `node scripts/build-reading-exercises.mjs --write`.
//
// Criterio del nivel
// -----------------
// AVISO SOBRE EL CURRÍCULO: el B1 de italiano tiene 6 temas de gramática, no 20 como los
// demás niveles del repositorio. Las diez lecturas cubren los 6 (100 %), pero eso obliga a
// que cada tema salga en tres o cuatro lecturas en lugar de en una. No es una decisión
// editorial: es lo que hay en `src/data/grammar/italiano/b1/`. Cuando ese currículo se
// complete, estas diez admiten temas nuevos sin reescribir el texto, solo el grammarFocus.
//
// Banda de 380-450 palabras. A esta longitud una lectura ya sostiene una idea que se
// desarrolla, cambia de dirección y se cierra.
//
// El obstáculo real del italiano B1 para un hispanohablante NO es el subjuntivo —el español
// también lo tiene— sino DÓNDE lo pide cada lengua. «Creo que es» lleva indicativo en
// español y congiuntivo en italiano: «credo che sia». Lo mismo con penso che, mi sembra che,
// dubito che, spero che. Por eso varias lecturas están construidas sobre opiniones: es el
// único contexto donde ese desajuste se ve en cada frase.
//
// Se mantiene el falso amigo glosado en cada lectura, criterio de A1 y A2.

const EARLIER = [
  // A1
  'aggettivi-possessivi', 'aggettivi-qualificativi', 'articoli', 'avverbi-frequenza',
  'ce-ci-sono', 'domande-interrogativi', 'genere-numero', 'imperativo', 'negazione',
  'preposizioni-articolate', 'preposizioni-semplici', 'presente-verbi-are',
  'presente-verbi-ere-ire', 'pronomi-soggetto', 'stare-gerundio', 'verbi-irregolari',
  'verbo-avere', 'verbo-essere',
  // A2
  'avverbi-frequenza-modo-a2', 'ci-vuole-vogliono-a2', 'comparativi-a2',
  'condizionale-presente-a2', 'congiunzioni-logiche-a2', 'da-presente-a2',
  'forma-cortesia-a2', 'futuro-probabilita-a2', 'futuro-semplice-a2', 'imperfetto-a2',
  'passato-prossimo-avere-a2', 'passato-prossimo-essere-a2', 'periodo-ipotetico-reale-a2',
  'piacere-verbi-simili-a2', 'pronomi-diretti-a2', 'pronomi-indiretti-a2',
  'pronomi-relativi-a2', 'stare-per-a2', 'trapassato-prossimo-a2', 'verbi-riflessivi-a2',
]

const B1_GRAMMAR = [
  'condizionale-passato-b1', 'congiuntivo-passato-b1', 'congiuntivo-presente-b1',
  'futuro-anteriore-b1', 'periodo-ipotetico-b1', 'trapassato-prossimo-b1',
]

export default {
  language: 'it',
  variant: 'it-IT',
  cefr: 'B1',
  displayLabel: 'Italiano B1',
  tutorLocales: ['es'],
  status: 'draft',
  seriesId: 'italiano-b1-lectura-10',
  allowedGrammar: [...EARLIER, ...B1_GRAMMAR],
  disallowedGrammar: ['passato remoto', 'trapassato remoto', 'infinito sostantivato letterario', 'costruzioni participiali estese'],
  maxOutOfLevelVocabularyPercent: 6,
  inferenceBand: 'moderate',
  scriptSupport: { furigana: false, romanization: 'none', stressMarks: false, tokenizationMode: 'space' },
  targetCanDo:
    'Puedes seguir un texto italiano largo que desarrolla una idea y cambia de dirección, distinguir el hecho de la opinión por la forma del verbo, y justificar una inferencia cruzando dos pasajes distintos.',
  assessor: 'Preflight editorial — falta confirmación de hablante nativo',
  assessedAt: '2026-08-18T00:00:00-05:00',
  levelNotes: 'Congiuntivo presente y passato, condizionale passato, futuro anteriore, trapassato prossimo y las tres condicionales. El congiuntivo imperfetto aparece solo dentro del periodo ipotetico dell\'impossibilità, que es el propio tema del nivel. Sin passato remoto.',
  lastModified: '2026-08-18T00:00:00-05:00',
  review: {
    author: 'José David Duarte Silva',
    languageReviewer: 'Pendiente',
    pedagogyReviewer: 'Pendiente',
    reviewedAt: '2026-08-18T00:00:00-05:00',
    copyrightChecked: true,
    cultureChecked: true,
    aiAssisted: true,
    aiUseNote: 'Borrador asistido por IA. Falta revisión de lengua por hablante nativo de italiano y revisión pedagógica antes de publicar.',
    languageDecision: 'pending',
    pedagogyDecision: 'pending',
  },

  exercises: [
    // ---------------------------------------------------------------- 1
    {
      slug: 'il-preventivo-che-non-ho-fatto',
      title: 'El presupuesto que no escribí',
      genre: 'relato de oficio',
      topic: 'una fontanera y un presupuesto de palabra',
      tags: ['italiano b1', 'lectura', 'periodo ipotetico', 'condizionale passato'],
      intro: 'Diecinueve años de fontanería y un solo arrepentimiento: un presupuesto dado de palabra en el ascensor, en diez segundos. Lectura de italiano B1.',
      mission: 'Averigua para qué sirve de verdad un presupuesto escrito, según ella.',
      seoTitle: 'Lectura de italiano B1: el presupuesto que no escribí | WeLearn',
      seoDescription: 'Lee un relato en italiano B1 y practica el periodo ipotetico y el condizionale passato. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['periodo-ipotetico-b1', 'condizionale-passato-b1', 'passato-prossimo-avere-a2'],
      text: `Faccio l'idraulico da diciannove anni e ho un solo rimpianto professionale. Non è un lavoro fatto male. È un preventivo che non ho scritto.

Nel 2019 la signora Ferri, che abita al piano sotto il mio, mi ha chiesto di rifare i tubi del bagno. Abitiamo nello stesso palazzo da undici anni. Le ho detto una cifra a voce, in ascensore, in dieci secondi: milleduecento euro. Lei ha detto va bene. Non ho scritto niente, perché tra vicini non si scrive.

Quando ho aperto il muro ho trovato una cosa che non avevo previsto: la colonna di scarico era di piombo e andava sostituita tutta, dal secondo piano al piano terra. Se avessi fatto un preventivo scritto, ci sarebbe stata una riga con tre parole: salvo imprevisti strutturali. Non c'era nessuna riga, perché non c'era nessun foglio.

Il lavoro è finito a duemilanovecento euro. Io gliene ho chiesti duemilaquattrocento, perché mi vergognavo. Lei mi ha dato milleduecento e ha detto: la cifra era questa.

Non aveva torto. Non aveva nemmeno ragione. Semplicemente, tra noi due non esisteva niente che potesse dire chi si era sbagliato.

Ho perso milleduecento euro e ho perso una vicina. Non ci salutiamo da sei anni. Ci incontriamo in ascensore due volte al mese e guardiamo il pavimento come due adolescenti.

La parte che mi fa più rabbia non è il denaro. È che se avessi passato dieci minuti a scrivere un foglio, adesso lei mi chiederebbe ancora il sale quando lo finisce. Il preventivo non serve a difenderti dal cliente. Serve a non dover scegliere tra i soldi e il vicino.

Adesso lo faccio a tutti. A mia sorella, a mio cognato, al ragazzo che mi taglia i capelli. Qualcuno si offende. Uno mi ha detto: non ti fidi di me? Gli ho risposto che è il contrario. Il foglio esiste proprio perché ci fidiamo, e perché vogliamo continuare a fidarci anche dopo.

Una volta, dopo un anno, sono scesa con una cartellina e le fatture del piombo. Volevo solo farle vedere i numeri, non chiederle niente. Lei ha aperto la porta di dieci centimetri e ha detto: adesso è tardi per i fogli. Aveva ragione anche in quello. Un preventivo che arriva dopo non è un preventivo: è una difesa.

Credo che sia la cosa più utile che ho imparato in diciannove anni, e non l'ho imparata da un altro idraulico. L'ho imparata perdendo milleduecento euro e una persona che mi piaceva.`,
      objectives: [
        'Construir el periodo ipotetico dell\'impossibilità: se + congiuntivo trapassato, condizionale passato.',
        'Usar el condizionale passato para lo que habría pasado y no pasó.',
        'Distinguir el motivo económico del motivo real de un arrepentimiento.',
      ],
      vocabulary: [
        { surface: 'idraulico', gloss: 'fontanero' },
        { surface: 'rimpianto', gloss: 'arrepentimiento por lo que no se hizo' },
        { surface: 'preventivo', gloss: 'presupuesto por escrito' },
        { surface: 'tubi', lemma: 'tubo', gloss: 'tuberías' },
        { surface: 'scarico', gloss: 'desagüe; «colonna di scarico» es la bajante' },
        { surface: 'piombo', gloss: 'plomo' },
        { surface: 'vergognavo', lemma: 'vergognarsi', gloss: 'me daba vergüenza' },
        { surface: 'cognato', gloss: 'cuñado' },
      ],
      culturalNote: 'Las bajantes de plomo son habituales en los edificios italianos anteriores a 1970 y su sustitución afecta a toda la columna del inmueble, no a un solo piso. Aparecen al abrir la pared, no antes.',
      spanishSpeakerNote: 'La condicional imposible italiana funciona como la española pero con congiuntivo trapassato: «se avessi fatto… ci sarebbe stata» es «si hubiera hecho… habría habido». Fíjate en la mixta del final: «se avessi passato…, adesso mi chiederebbe», con consecuencia en el presente.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Para qué sirve un presupuesto escrito según la narradora?',
          options: [
            ['relacion', 'Para no tener que elegir entre el dinero y la relación con la otra persona'],
            ['cliente', 'Para poder demandar al cliente si no paga'],
            ['precio', 'Para poder subir el precio a mitad de obra'],
          ],
          answer: 'relacion',
          evidence: 'Il preventivo non serve a difenderti dal cliente. Serve a non dover scegliere tra i soldi e il vicino.',
          correct: 'Sí, y lo formula descartando primero la lectura obvia.',
          incorrect: 'El texto niega expresamente que sirva para defenderse del cliente, y ella no subió nada. Busca las dos frases seguidas sobre el preventivo.',
          strategy: 'Cuando un texto dice «no sirve para X, sirve para Y», ahí tienes la tesis en dos frases.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuánto acabó cobrando por un trabajo de 2.900 euros?',
          options: [
            ['1200', 'Mil doscientos, la cifra dicha de palabra'],
            ['2400', 'Dos mil cuatrocientos, lo que pidió'],
            ['2900', 'Dos mil novecientos, el coste real'],
          ],
          answer: '1200',
          evidence: 'Io gliene ho chiesti duemilaquattrocento, perché mi vergognavo. Lei mi ha dato milleduecento e ha detto: la cifra era questa.',
          correct: 'Correcto: pidió 2.400 por vergüenza y recibió los 1.200 iniciales.',
          incorrect: 'Los 2.400 los pidió y los 2.900 son el coste. Busca lo que ella le dio.',
          strategy: 'Con tres cifras en juego, empareja cada una con quién la dijo y en qué momento.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'Dice que tiene un «rimpianto professionale». ¿Qué significa?',
          options: [
            ['arrepentimiento', 'Un arrepentimiento por algo que no hizo'],
            ['reclamacion', 'Una reclamación de un cliente'],
            ['ascenso', 'Un ascenso que no le dieron'],
          ],
          answer: 'arrepentimiento',
          evidence: 'ho un solo rimpianto professionale. Non è un lavoro fatto male. È un preventivo che non ho scritto.',
          correct: 'Eso es, y las dos frases siguientes lo concretan: no un trabajo mal hecho, un papel no escrito.',
          incorrect: 'No es una queja de un cliente ni tiene que ver con su carrera. Lee las dos frases que lo definen.',
          strategy: 'Si el texto define una palabra con «no es X, es Y», la segunda mitad es la respuesta.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué responde «es al contrario» a quien le pregunta si no se fía?',
          options: [
            ['durar', 'Porque el papel existe para que la confianza pueda seguir después del trabajo'],
            ['ley', 'Porque la ley le obliga a hacer presupuesto escrito'],
            ['precio', 'Porque así puede cobrar más caro a los conocidos'],
          ],
          answer: 'durar',
          evidence: 'Il foglio esiste proprio perché ci fidiamo, e perché vogliamo continuare a fidarci anche dopo.',
          correct: 'Sí, y encaja con toda la historia: perdió a la vecina, no el dinero.',
          incorrect: 'No menciona ninguna ley ni cobra más a los conocidos. Lee su respuesta completa.',
          strategy: 'Cuando alguien dice «es al contrario», la explicación viene en la misma frase o en la siguiente.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: la vecina se negó a pagar porque el trabajo había quedado mal hecho.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Non è un lavoro fatto male … Lei mi ha dato milleduecento e ha detto: la cifra era questa.',
          correct: 'Falso: pagó la cifra acordada, y el texto dice desde el principio que el trabajo no estaba mal hecho.',
          incorrect: 'Sí pagó, y el texto descarta el trabajo mal hecho en su tercera frase.',
          strategy: 'Comprueba las dos mitades de la pregunta por separado: si pagó y si el trabajo estaba mal.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena los hechos del relato.',
          options: [
            ['p1', 'Da la cifra de palabra en el ascensor'],
            ['p2', 'Abre la pared y encuentra la bajante de plomo'],
            ['p3', 'Ella paga la cifra pactada y dejan de saludarse'],
            ['p4', 'Ahora hace presupuesto escrito incluso a su familia'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Le ho detto una cifra a voce, in ascensore … Quando ho aperto il muro ho trovato una cosa che non avevo previsto … Non ci salutiamo da sei anni … Adesso lo faccio a tutti.',
          correct: 'Correcto: el acuerdo, la sorpresa, la ruptura y la lección.',
          incorrect: 'Guíate por «Nel 2019», «Quando ho aperto il muro» y «Adesso».',
          strategy: 'Un relato de aprendizaje profesional termina en el presente: busca «adesso».',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en italiano sobre algo que harías distinto si pudieras volver atrás. Usa tres condicionales imposibles y cuatro verbos en condizionale passato.',
        minWords: 80, maxWords: 140,
        hints: ['Se avessi scritto…, non sarebbe successo…', 'Avrei dovuto…', 'Adesso mi chiederebbe ancora…', 'Credo che sia la cosa più utile…'],
      },
    },
    // ---------------------------------------------------------------- 2
    {
      slug: 'sei-contro-sei',
      title: 'Seis contra seis',
      genre: 'crónica de asamblea',
      topic: 'la votación del ascensor',
      tags: ['italiano b1', 'lectura', 'congiuntivo presente', 'congiuntivo passato'],
      intro: 'Tres horas y veinte minutos para decidir si se pone ascensor. Empate a seis, y el voto que lo desempata es del bajo. Lectura de italiano B1.',
      mission: 'Averigua por qué votó a favor alguien que no va a usarlo nunca.',
      seoTitle: 'Lectura de italiano B1: seis contra seis | WeLearn',
      seoDescription: 'Lee una crónica de asamblea en italiano B1 y practica el congiuntivo presente y passato. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['congiuntivo-presente-b1', 'congiuntivo-passato-b1', 'congiunzioni-logiche-a2'],
      text: `L'assemblea di condominio del 14 marzo è durata tre ore e venti minuti per decidere una cosa che si decide in cinque: se mettere l'ascensore o no.

Il palazzo ha cinque piani e non ha ascensore. È del 1961. Ci sono dodici appartamenti e dodici voti.

Il signor Baldi, quinto piano, ha parlato per primo: credo che sia una questione di dignità. Ha settantanove anni e sale novantadue scalini. Nessuno in quella stanza pensava che avesse torto.

La signora Curti, primo piano, ha risposto: penso che l'ascensore sia giusto, ma non credo che sia giusto che lo paghi anche chi non lo usa. Anche lei ha ragione, e qui comincia il problema: la legge dice che si paga in base ai millesimi e all'altezza del piano, quindi il quinto paga più del primo, ma il primo paga.

Poi ha parlato l'ingegnere che aveva preparato il progetto. Ha spiegato che il vano scala è abbastanza largo, che i lavori durerebbero quattro mesi e che il costo sarebbe di sessantamila euro. Sembra che il preventivo sia stato aggiornato due volte dal 2022, sempre al rialzo.

Prima votazione: sei favorevoli, sei contrari.

Ho guardato la lista con calma. I sei favorevoli erano il terzo, il quarto e il quinto piano. I sei contrari erano il piano terra, il primo e il secondo. Non era una divisione politica né una questione di carattere. Era una scala.

Alla seconda votazione una persona ha cambiato voto: il signor Espinoza, piano terra, che non userebbe quell'ascensore neanche una volta in vita sua. Ha detto la frase che ha chiuso l'assemblea: mia madre ha ottantasei anni, vive in Perù, al quarto piano, senza ascensore. Non credo che qualcuno lì voti per lei. Voto io per il signor Baldi.

Sette a cinque. L'ascensore si farà.

All'uscita la signora Curti gli ha detto che era stato generoso. Lui ha risposto che non era generosità: una volta aveva portato su sua madre in braccio, e certe cose non si dimenticano.

Sei mesi dopo l'assemblea i lavori non erano ancora cominciati, perché mancava un'autorizzazione per la facciata. Baldi ha compiuto ottant'anni sul pianerottolo del quinto piano, con la torta portata su da due nipoti. Il signor Espinoza è salito anche lui, novantadue scalini, e di quella sera non ha detto niente.

Dubito che il verbale dell'assemblea contenga questa frase. I verbali registrano i voti, non le ragioni. E però le ragioni sono l'unica cosa che ha cambiato un voto quella sera.`,
      objectives: [
        'Usar el congiuntivo presente tras credo che, penso che, sembra che, dubito che.',
        'Formar el congiuntivo passato para opinar sobre algo ya ocurrido.',
        'Separar el resultado de una votación de las razones que la explican.',
      ],
      vocabulary: [
        { surface: 'condominio', gloss: 'comunidad de vecinos' },
        { surface: 'scalini', lemma: 'scalino', gloss: 'escalones' },
        { surface: 'millesimi', gloss: 'milésimas: cuota de participación de cada piso' },
        { surface: 'vano', gloss: 'hueco; «vano scala» es el hueco de la escalera' },
        { surface: 'rialzo', gloss: 'subida; «al rialzo» es al alza' },
        { surface: 'verbale', gloss: 'acta de una reunión. ¡No es un adjetivo aquí!' },
        { surface: 'braccio', gloss: 'brazo; «in braccio» es en brazos' },
        { surface: 'favorevoli', lemma: 'favorevole', gloss: 'a favor' },
      ],
      culturalNote: 'En Italia el gasto del ascensor se reparte por millesimi y por altura del piso, así que los bajos pagan aunque no lo usen. Es la razón por la que muchas asambleas de edificios antiguos acaban en empate.',
      spanishSpeakerNote: 'Aquí está el desajuste que más cuesta: «credo che sia», «penso che sia», «sembra che sia stato», «dubito che contenga». El español pone indicativo tras «creo que»; el italiano exige congiuntivo. La forma del verbo te dice si quien habla afirma o solo opina.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué muestra la crónica?',
          options: [
            ['razon', 'Que el voto no lo cambió un argumento económico sino una razón personal que no consta en el acta'],
            ['ley', 'Que la ley del reparto por millesimi es injusta'],
            ['coste', 'Que el presupuesto de sesenta mil euros era demasiado alto'],
          ],
          answer: 'razon',
          evidence: 'Dubito che il verbale dell\'assemblea contenga questa frase. I verbali registrano i voti, non le ragioni. E però le ragioni sono l\'unica cosa che ha cambiato un voto quella sera.',
          correct: 'Sí, y el texto lo dice justo al final, con un «però» que le da la vuelta a todo.',
          incorrect: 'El texto explica la ley sin condenarla y no discute el precio. Lee el último párrafo.',
          strategy: 'Cuando un texto termina con «però», lo que viene después es su conclusión.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cómo se repartieron los votos en la primera votación?',
          options: [
            ['piso', 'Seis a favor (pisos tercero a quinto) y seis en contra (bajo a segundo)'],
            ['siete', 'Siete a favor y cinco en contra'],
            ['unanime', 'Por unanimidad a favor'],
          ],
          answer: 'piso',
          evidence: 'Prima votazione: sei favorevoli, sei contrari … I sei favorevoli erano il terzo, il quarto e il quinto piano.',
          correct: 'Correcto, y el narrador lo resume: no era política, era una escalera.',
          incorrect: 'El siete a cinco es la segunda votación. Busca el reparto de la primera.',
          strategy: 'Cuando hay dos votaciones, comprueba de cuál habla la pregunta antes de contar.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto habla de «il verbale dell\'assemblea». ¿Qué es?',
          options: [
            ['acta', 'El acta escrita de la reunión'],
            ['oral', 'La parte oral del debate'],
            ['convocatoria', 'La convocatoria de la asamblea'],
          ],
          answer: 'acta',
          evidence: 'Dubito che il verbale dell\'assemblea contenga questa frase. I verbali registrano i voti, non le ragioni.',
          correct: 'Eso es, y la frase siguiente dice qué recoge: los votos.',
          incorrect: 'Se parece a «verbal» pero es un sustantivo: el documento. Fíjate en qué se dice que registra.',
          strategy: 'Si el texto explica qué registra un documento, esa explicación lo define.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué rechaza Espinoza que su voto fuera generosidad?',
          options: [
            ['propio', 'Porque para él es una deuda propia: subió a su madre en brazos y no lo olvida'],
            ['interes', 'Porque en realidad el ascensor subirá el valor de su piso'],
            ['presion', 'Porque los vecinos del quinto le presionaron'],
          ],
          answer: 'propio',
          evidence: 'Lui ha risposto che non era generosità: una volta aveva portato su sua madre in braccio, e certe cose non si dimenticano.',
          correct: 'Sí, y encaja con lo que dijo al votar: nadie en Perú vota por su madre.',
          incorrect: 'No se menciona el valor del piso ni ninguna presión. Lee su respuesta al salir.',
          strategy: 'Cuando alguien rechaza un elogio, su motivo suele estar en la misma frase, tras los dos puntos.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: el presupuesto de la obra se ha actualizado dos veces desde 2022, siempre subiendo.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Sembra che il preventivo sia stato aggiornato due volte dal 2022, sempre al rialzo.',
          correct: 'Verdadero, y el «sembra che» avisa de que es información de segunda mano.',
          incorrect: 'Está en el párrafo del ingeniero, en la última frase.',
          strategy: 'La fórmula «sembra che» marca un dato que el narrador no da por comprobado, pero lo da.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la asamblea.',
          options: [
            ['p1', 'Baldi habla de dignidad y de noventa y dos escalones'],
            ['p2', 'Curti acepta el ascensor pero no el reparto del gasto'],
            ['p3', 'El ingeniero da plazos y coste'],
            ['p4', 'Empate a seis y cambio de voto de Espinoza'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Il signor Baldi, quinto piano, ha parlato per primo … La signora Curti, primo piano, ha risposto … Poi ha parlato l\'ingegnere … Alla seconda votazione una persona ha cambiato voto.',
          correct: 'Correcto: el texto sigue el turno de palabra.',
          incorrect: 'Fíjate en «ha parlato per primo», «ha risposto», «Poi ha parlato».',
          strategy: 'En una crónica de reunión, los verbos de habla marcan el orden.',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en italiano dando tu opinión sobre una decisión de tu comunidad o tu trabajo. Usa seis veces el congiuntivo presente y dos el passato.',
        minWords: 80, maxWords: 140,
        hints: ['Credo che sia una questione di…', 'Non penso che sia giusto che…', 'Sembra che il preventivo sia stato…', 'Dubito che il verbale contenga…'],
      },
    },
    // ---------------------------------------------------------------- 3
    {
      slug: 'quando-avrai-letto-questa-lettera',
      title: 'Cuando hayas leído esta carta',
      genre: 'carta de relevo',
      topic: 'la secretaría de un instituto',
      tags: ['italiano b1', 'lectura', 'futuro anteriore', 'trapassato prossimo'],
      intro: 'Veintiocho años en la secretaría de un instituto y dos versiones de las instrucciones: la oficial, en la carpeta azul, y esta. Lectura de italiano B1.',
      mission: 'Averigua qué hay en el cajón de abajo a la derecha y por qué no está en el inventario.',
      seoTitle: 'Lectura de italiano B1: cuando hayas leído esta carta | WeLearn',
      seoDescription: 'Lee una carta en italiano B1 y practica el futuro anteriore y el trapassato prossimo. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['futuro-anteriore-b1', 'trapassato-prossimo-b1', 'da-presente-a2'],
      text: `Cara collega, o caro collega,

quando avrai letto questa lettera io sarò già andata via. Lascio la segreteria della scuola media Falcone dopo ventotto anni. Il preside mi ha chiesto di scrivere le istruzioni per chi viene dopo. Ne ho scritte due versioni: quella ufficiale, che troverai nel raccoglitore blu, e questa.

Cominciamo dalle cose che il raccoglitore non dice.

La fotocopiatrice del primo piano si blocca se metti più di quaranta fogli. Non è rotta. Nel 2014 avevano già mandato un tecnico tre volte, e ogni volta lui aveva scritto sul foglio di intervento «nessun difetto riscontrato». Mettine trenta e non avrai problemi per il resto della tua carriera.

La professoressa Riva chiede sempre le stesse aule e le chiede in ritardo. Quando avrà capito che tu non cedi, smetterà. A me ci sono voluti due anni.

I genitori telefonano tra le otto e le nove. Se rispondi dopo il terzo squillo, pensano che la segreteria sia sempre occupata. Se rispondi al primo, pensano che qui non ci sia niente da fare. Rispondi al secondo. So come suona, e funziona comunque.

La cosa più importante non è amministrativa. In questa scuola ci sono quattrocento ragazzi, e tu sarai la prima persona che vedono quando entrano e l'ultima quando escono. Molti passeranno davanti a te duemila volte in tre anni. Alcuni non parleranno con nessun altro adulto in tutta la mattina.

Nel 2011 un ragazzo di seconda si è fermato al mio bancone ventitré giorni di fila senza chiedere niente. Diceva solo buongiorno. Al ventiquattresimo giorno ha detto un'altra cosa, e quella cosa ha cambiato il suo anno, e forse più di un anno. Non la scrivo qui: quando avrai fatto il primo mese, capirai perché.

Lavoro in questa scuola da ventotto anni e ho imparato una cosa sola che valga la pena scrivere: questo lavoro non è mettere timbri. Se qualcuno ti dice che è mettere timbri, quella persona non ha mai guardato il bancone dall'altra parte.

Un'ultima cosa pratica: il registro delle assenze si chiude alle nove e trenta. Ma se una madre chiama alle nove e trentacinque perché il figlio ha vomitato in autobus, il registro si riapre. Nessuno ti dirà mai questo per iscritto, e nessuno ti rimprovererà per averlo fatto.

Ti lascio la chiave del cassetto in basso a destra. Dentro ci sono i cerotti, le caramelle e i fazzoletti di carta. Non sono nell'inventario e non lo saranno mai. Non chiedere il rimborso: comprali e basta.

Buona fortuna. Anna.`,
      objectives: [
        'Formar el futuro anteriore: quando avrai letto, quando avrà capito.',
        'Usar el trapassato prossimo para lo anterior a otro pasado: avevano mandato, aveva scritto.',
        'Leer un documento donde lo esencial no es el procedimiento.',
      ],
      vocabulary: [
        { surface: 'segreteria', gloss: 'secretaría administrativa' },
        { surface: 'preside', gloss: 'director o directora del centro' },
        { surface: 'raccoglitore', gloss: 'carpeta de anillas' },
        { surface: 'squillo', gloss: 'tono de llamada' },
        { surface: 'timbri', lemma: 'timbro', gloss: 'sellos de oficina' },
        { surface: 'cassetto', gloss: 'cajón' },
        { surface: 'cerotti', lemma: 'cerotto', gloss: 'tiritas, curitas' },
        { surface: 'rimborso', gloss: 'reembolso de un gasto' },
      ],
      culturalNote: 'La secretaría de una scuola media italiana atiende al alumnado en un mostrador abierto al pasillo. El personal administrativo no da clase, pero ve pasar a los cuatrocientos alumnos varias veces al día.',
      spanishSpeakerNote: 'El futuro anteriore marca lo que estará terminado antes de otro momento futuro: «quando avrai letto» es «cuando hayas leído». El español usa ahí subjuntivo; el italiano, futuro compuesto.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué quiere transmitir Anna a quien la sustituya?',
          options: [
            ['bancone', 'Que el puesto no consiste en tramitar papeles: es el primer y último adulto que ven cuatrocientos chicos'],
            ['fotocopiadora', 'Que la fotocopiadora está averiada y hay que sustituirla'],
            ['riva', 'Que debe tener cuidado con la profesora Riva'],
          ],
          answer: 'bancone',
          evidence: 'questo lavoro non è mettere timbri. Se qualcuno ti dice che è mettere timbri, quella persona non ha mai guardato il bancone dall\'altra parte.',
          correct: 'Sí, y por eso separa la carpeta azul de esta carta.',
          incorrect: 'La fotocopiadora y la profesora Riva son avisos prácticos. Busca lo que ella llama «la cosa più importante».',
          strategy: 'Si un texto anuncia «lo más importante no es X», lo que sigue es su tesis.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuántas hojas se pueden poner en la fotocopiadora sin que se bloquee?',
          options: [
            ['treinta', 'Treinta'],
            ['cuarenta', 'Cuarenta'],
            ['tres', 'Tres'],
          ],
          answer: 'treinta',
          evidence: 'si blocca se metti più di quaranta fogli … Mettine trenta e non avrai problemi per il resto della tua carriera.',
          correct: 'Correcto: se bloquea por encima de cuarenta, y su consejo es poner treinta.',
          incorrect: 'Cuarenta es el límite en que ya falla, y los tres son las visitas del técnico. Busca su consejo.',
          strategy: 'Distingue el límite que da el texto del consejo práctico que da la persona.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El técnico escribía «nessun difetto riscontrato». ¿Qué quiere decir?',
          options: [
            ['ninguno', 'Que no se detectó ningún defecto'],
            ['reparado', 'Que reparó el defecto encontrado'],
            ['grave', 'Que el defecto era grave'],
          ],
          answer: 'ninguno',
          evidence: 'ogni volta lui aveva scritto sul foglio di intervento «nessun difetto riscontrato»',
          correct: 'Eso es, y es la razón por la que la máquina sigue igual desde 2014.',
          incorrect: 'Si hubiera reparado algo, la máquina no seguiría bloqueándose. Fíjate en la palabra «nessun».',
          strategy: 'La palabra «nessun» niega lo que sigue: no hace falta entender el resto para saberlo.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué no escribe lo que dijo el chico el día veinticuatro?',
          options: [
            ['entender', 'Porque solo se entiende desde dentro del puesto, después del primer mes'],
            ['secreto', 'Porque es un secreto administrativo que no puede revelar'],
            ['olvido', 'Porque no lo recuerda con exactitud'],
          ],
          answer: 'entender',
          evidence: 'Non la scrivo qui: quando avrai fatto il primo mese, capirai perché.',
          correct: 'Sí, y lo dice en la misma frase con un futuro anteriore.',
          incorrect: 'No lo presenta como secreto ni dice haberlo olvidado. Lee la frase entera, después de los dos puntos.',
          strategy: 'Después de dos puntos suele venir la razón de lo que se acaba de afirmar.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: el contenido del cajón de abajo a la derecha figura en el inventario del centro.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Non sono nell\'inventario e non lo saranno mai. Non chiedere il rimborso: comprali e basta.',
          correct: 'Falso, y ella añade que nunca lo estarán: se compran de tu bolsillo.',
          incorrect: 'La respuesta está en el último párrafo, justo después de enumerar lo que hay dentro.',
          strategy: 'Cuando un texto enumera objetos, la frase siguiente suele decir su situación administrativa.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la carta.',
          options: [
            ['p1', 'Anuncia que hay dos versiones de las instrucciones'],
            ['p2', 'Los avisos prácticos: fotocopiadora, aulas, teléfono'],
            ['p3', 'Lo que de verdad importa: ser el primer adulto del día'],
            ['p4', 'La llave del cajón y las tiritas'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Ne ho scritte due versioni … La fotocopiatrice del primo piano si blocca … La cosa più importante non è amministrativa … Ti lascio la chiave del cassetto.',
          correct: 'Correcto: encuadre, avisos, sentido y legado.',
          incorrect: 'Fíjate en dónde dice «la cosa più importante» y dónde entrega la llave.',
          strategy: 'Una carta de relevo va de lo administrativo a lo humano: busca la frase que marca el cambio.',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en italiano con las instrucciones reales de algo que sabes hacer. Usa tres futuros anteriori y tres trapassati prossimi.',
        minWords: 80, maxWords: 140,
        hints: ['Quando avrai letto questa lettera…', 'Nel 2014 avevano già mandato…', 'Quando avrà capito che non cedi…', 'Non è mettere timbri.'],
      },
    },
    // ---------------------------------------------------------------- 4
    {
      slug: 'la-farmacia-che-apre-di-notte',
      title: 'La farmacia que abre de noche',
      genre: 'diario de guardia',
      topic: 'quién entra en una farmacia a las tres de la madrugada',
      tags: ['italiano b1', 'lectura', 'congiuntivo presente', 'periodo ipotetico'],
      intro: 'Cuatro peticiones se repiten toda la noche. Y a las tres y veinte entra alguien que no necesita nada. Lectura de italiano B1.',
      mission: 'Averigua por qué no dijo nada inteligente cuando aquel hombre le habló de su mujer.',
      seoTitle: 'Lectura de italiano B1: la farmacia que abre de noche | WeLearn',
      seoDescription: 'Lee un diario de guardia en italiano B1 y practica el congiuntivo presente y el periodo ipotetico. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['congiuntivo-presente-b1', 'periodo-ipotetico-b1', 'pronomi-relativi-a2'],
      text: `Faccio il turno di notte in farmacia due volte al mese, dalle venti alle otto del mattino. La farmacia è in una strada che di giorno è piena di uffici e di notte è completamente vuota.

Chi crede che di notte non venga nessuno si sbaglia. Vengono tra le venti e le due, poi c'è un buco di tre ore, poi ricominciano verso le cinque.

Le richieste sono sempre le stesse quattro: antidolorifici, termometri, test di gravidanza e gocce per le orecchie dei bambini. Se dovessi indovinare a occhi chiusi, indovinerei nove volte su dieci.

Ma non è per questo che scrivo.

Verso le tre e venti, quasi ogni notte, arriva qualcuno che non ha bisogno di niente. Entra, guarda gli scaffali, chiede una cosa che potrebbe comprare domani mattina a due strade da qui. Paga, mette il resto nel portafoglio molto lentamente, e poi dice una frase su qualcosa che non c'entra niente: il tempo, il traffico, una partita.

All'inizio pensavo che fossero persone che non dormono. Adesso credo che sia un'altra cosa. Credo che a quell'ora una farmacia sia l'unico posto illuminato dove qualcuno ti risponde e non ti chiede perché sei lì.

C'è un uomo che è venuto quattordici volte in un anno, sempre tra le tre e le quattro, sempre per lo sciroppo per la tosse. Quattordici sciroppi in dodici mesi. Non credo che abbia tossito una volta sola in vita sua.

Una notte gli ho chiesto se stava bene. Ha risposto che sì. Poi è rimasto in silenzio quaranta secondi, che dietro un banco di farmacia sono lunghissimi. Poi ha detto: mia moglie è morta a marzo e in casa non c'è nessuno che parli.

Se in quel momento io avessi risposto qualcosa di intelligente, probabilmente l'avrei perso. Non ho detto niente di intelligente. Ho preso lo sciroppo, l'ho messo nel sacchetto e ho chiesto: quello di sempre?

È tornato il mese dopo.

Il collega che fa i turni con me dice che sono romantica e che quelle persone comprano soltanto sciroppo. Può darsi. Ma lui alle tre e mezza di notte è in magazzino, e io sono al banco.

Questo non è assistenza sanitaria e non è amicizia. È un banco, una luce accesa e una persona sveglia. Se tutte le farmacie di notte chiudessero, si risparmierebbe molto denaro pubblico e nessuno saprebbe mai che cosa si è perso, perché queste cose non entrano in nessuna statistica e non le chiede nessun questionario.`,
      objectives: [
        'Usar el congiuntivo presente tras chi crede che, credo che, non credo che.',
        'Combinar las tres condicionales: real, posible e imposible.',
        'Reconocer una función social que el propio texto se niega a exagerar.',
      ],
      vocabulary: [
        { surface: 'scaffali', lemma: 'scaffale', gloss: 'estanterías' },
        { surface: 'resto', gloss: 'cambio, vuelta de un pago' },
        { surface: 'portafoglio', gloss: 'cartera, billetera' },
        { surface: 'sciroppo', gloss: 'jarabe' },
        { surface: 'tosse', gloss: 'tos' },
        { surface: 'sacchetto', gloss: 'bolsa pequeña' },
        { surface: 'gocce', lemma: 'goccia', gloss: 'gotas' },
        { surface: 'risparmierebbe', lemma: 'risparmiare', gloss: 'se ahorraría' },
      ],
      culturalNote: 'Las farmacias italianas de guardia nocturna se organizan por turnos obligatorios entre los establecimientos de una zona, y su rentabilidad es baja. Cada cierre se discute como un ahorro de gasto público.',
      spanishSpeakerNote: 'Aquí tienes las tres condicionales seguidas: real («se la riparazione costa…, la gente compra»), posible («se dovessi indovinare, indovinerei») e imposible («se avessi risposto, l\'avrei perso»). El español las hace igual; lo que cambia es la forma del verbo italiano.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué defiende el texto?',
          options: [
            ['presencia', 'Que una farmacia abierta de noche cumple una función que no aparece en ninguna estadística'],
            ['medicinas', 'Que de noche hace falta vender más medicamentos'],
            ['sueldo', 'Que los turnos de noche deberían pagarse mejor'],
          ],
          answer: 'presencia',
          evidence: 'È un banco, una luce accesa e una persona sveglia … queste cose non entrano in nessuna statistica e non le chiede nessun questionario.',
          correct: 'Sí, y el texto se cuida de no exagerar: dice antes que no es sanidad ni amistad.',
          incorrect: 'No se pide más venta ni se habla de sueldos. Lee el último párrafo.',
          strategy: 'Cuando un texto dice qué NO es algo antes de decir qué es, la definición está después.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuántas veces vino aquel hombre en un año?',
          options: [
            ['catorce', 'Catorce'],
            ['cuatro', 'Cuatro'],
            ['cuarenta', 'Cuarenta'],
          ],
          answer: 'catorce',
          evidence: 'C\'è un uomo che è venuto quattordici volte in un anno … Quattordici sciroppi in dodici mesi.',
          correct: 'Correcto, y el texto repite la cifra con los jarabes.',
          incorrect: 'Las cuatro son las peticiones que se repiten y los cuarenta, los segundos de silencio.',
          strategy: 'Empareja cada cifra con lo que cuenta: visitas, productos, segundos.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El hombre venía siempre por «lo sciroppo per la tosse». ¿Qué es?',
          options: [
            ['jarabe', 'Jarabe para la tos'],
            ['pastillas', 'Pastillas para dormir'],
            ['gotas', 'Gotas para los oídos'],
          ],
          answer: 'jarabe',
          evidence: 'sempre per lo sciroppo per la tosse … Non credo che abbia tossito una volta sola in vita sua.',
          correct: 'Eso es, y la frase siguiente sugiere que nunca lo necesitó.',
          incorrect: 'Las gotas para los oídos son otra de las cuatro peticiones habituales. Fíjate en la palabra «tosse».',
          strategy: 'Si el producto y el síntoma van en la misma expresión, uno te define el otro.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué dice que si hubiera contestado algo inteligente lo habría perdido?',
          options: [
            ['normal', 'Porque el hombre necesitaba que la escena siguiera siendo normal, no convertirse en un caso'],
            ['sordo', 'Porque el hombre no la habría oído bien'],
            ['prisa', 'Porque no había tiempo de conversar a esa hora'],
          ],
          answer: 'normal',
          evidence: 'Non ho detto niente di intelligente. Ho preso lo sciroppo, l\'ho messo nel sacchetto e ho chiesto: quello di sempre? È tornato il mese dopo.',
          correct: 'Sí, y la prueba es la frase de después: volvió al mes siguiente.',
          incorrect: 'No hay problema de oído ni de prisa: hubo cuarenta segundos de silencio. Fíjate en lo que sí hizo.',
          strategy: 'Si el texto pone una consecuencia («volvió») justo después, esa consecuencia es la prueba.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: entre las dos y las cinco de la madrugada casi no entra nadie en la farmacia.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Vengono tra le venti e le due, poi c\'è un buco di tre ore, poi ricominciano verso le cinque.',
          correct: 'Verdadero: el texto lo llama «un buco di tre ore».',
          incorrect: 'Busca la frase con los tres tramos horarios, en el segundo párrafo.',
          strategy: 'Cuando un texto divide la noche en tramos, cuenta las horas de cada uno.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena el diario.',
          options: [
            ['p1', 'El horario del turno y los tramos de la noche'],
            ['p2', 'Las cuatro peticiones que se repiten siempre'],
            ['p3', 'Quien entra a las tres y veinte sin necesitar nada'],
            ['p4', 'El hombre de los catorce jarabes y su frase'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Faccio il turno di notte … Le richieste sono sempre le stesse quattro … Verso le tre e venti, quasi ogni notte, arriva qualcuno … C\'è un uomo che è venuto quattordici volte.',
          correct: 'Correcto: contexto, rutina, patrón y caso.',
          incorrect: 'Fíjate en el orden: primero el horario, después las peticiones, después las tres y veinte.',
          strategy: 'Un diario profesional va de lo general al caso concreto.',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en italiano sobre un sitio abierto a horas raras y quién va allí. Usa cuatro veces el congiuntivo presente y las tres condicionales.',
        minWords: 80, maxWords: 140,
        hints: ['Chi crede che non venga nessuno si sbaglia.', 'Credo che sia l\'unico posto…', 'Se dovessi indovinare, indovinerei…', 'Se avessi risposto…, l\'avrei perso.'],
      },
    },
    // ---------------------------------------------------------------- 5
    {
      slug: 'avrei-dovuto-chiamare',
      title: 'Debería haber llamado',
      genre: 'confesión',
      topic: 'seis años sin hablarse por cuatrocientos euros',
      tags: ['italiano b1', 'lectura', 'condizionale passato', 'trapassato prossimo'],
      intro: 'Catorce años de amistad, un préstamo de cuatrocientos euros devuelto tarde, y seis años de silencio que se arreglaron en once minutos. Lectura de italiano B1.',
      mission: 'Averigua cuál de las dos razones para no llamar era la verdadera.',
      seoTitle: 'Lectura de italiano B1: debería haber llamado | WeLearn',
      seoDescription: 'Lee una confesión en italiano B1 y practica el condizionale passato y el trapassato prossimo. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['condizionale-passato-b1', 'trapassato-prossimo-b1', 'imperfetto-a2'],
      text: `Con Marco eravamo amici da quattordici anni. Poi, nel 2018, abbiamo litigato per una cosa che oggi non riesco a raccontare senza vergognarmi: un prestito di quattrocento euro che gli avevo fatto e che lui aveva restituito in ritardo, con un messaggio che a me è sembrato freddo.

Gli avevo scritto una cosa cattiva. Lui aveva risposto con una cosa peggiore. Poi ci siamo fermati entrambi, che è la cosa più stupida che due adulti possano fare.

Avrei dovuto chiamarlo la settimana dopo. Non l'ho fatto. Avrei dovuto chiamarlo a Natale, e avevo perfino il telefono in mano. Non l'ho fatto. Avrei dovuto chiamarlo quando è nata sua figlia, perché l'ho saputo da un'altra persona e mi sono commosso come uno scemo. Non l'ho fatto nemmeno allora.

Le ragioni per non chiamare erano sempre le stesse due, e le conosco a memoria. La prima: dopo tanto tempo sembra strano. La seconda: se chiamo io, allora avevo torto io.

La seconda è la vera. La prima è quella che raccontavo agli altri.

In quei sei anni ho saputo di lui sempre da terzi: che aveva cambiato lavoro, che si era trasferito a Bologna, che suo padre era stato operato. Ogni volta pensavo che avrei chiamato il giorno dopo, e ogni volta il giorno dopo era già passato.

Sei anni dopo ci siamo visti al matrimonio di un amico comune, a Lecce, tra centoventi persone. Ci siamo trovati davanti al tavolo dell'antipasto e nessuno dei due poteva fingere di non vedere l'altro.

Ha parlato lui per primo. Ha detto: sei ingrassato. Io ho detto: anche tu. Poi abbiamo riso, e in undici minuti era finito tutto. Undici minuti. Sei anni contro undici minuti.

Alla fine della serata gli ho detto che avrei dovuto chiamare. Lui ha risposto una cosa che non mi aspettavo: anch'io avrei dovuto. E poi ha aggiunto: probabilmente avremo pensato la stessa cosa la stessa sera più di una volta, io a Bologna e tu a Bari, come due idioti sincronizzati.

Adesso ci parliamo ogni due settimane e di quei quattrocento euro non abbiamo mai più parlato. Non è che li abbiamo perdonati: è che non esistono più.

L'unica cosa che ho imparato è che la telefonata non era difficile. Era solo la prima. Se avessi chiamato nel 2018, avremmo perso una settimana invece di sei anni, e mia figlia conoscerebbe suo figlio da quando è nato.`,
      objectives: [
        'Usar el condizionale passato para el reproche a uno mismo: avrei dovuto.',
        'Formar el trapassato prossimo: gli avevo fatto, aveva restituito, avevo scritto.',
        'Distinguir la razón que se cuenta de la razón que se tiene.',
      ],
      vocabulary: [
        { surface: 'litigato', lemma: 'litigare', gloss: 'discutido, peleado' },
        { surface: 'prestito', gloss: 'préstamo' },
        { surface: 'restituito', lemma: 'restituire', gloss: 'devuelto' },
        { surface: 'cattiva', lemma: 'cattivo', gloss: 'hiriente, malintencionada' },
        { surface: 'commosso', lemma: 'commuoversi', gloss: 'emocionado' },
        { surface: 'scemo', gloss: 'tonto, bobo' },
        { surface: 'ingrassato', lemma: 'ingrassare', gloss: 'engordado' },
        { surface: 'matrimonio', gloss: 'boda, banquete de boda (no solo el matrimonio)' },
      ],
      culturalNote: 'En Italia la boda de un amigo común es la ocasión clásica de reencuentro forzoso: la lista de invitados la hacen otros, y quien no se habla acaba en la misma mesa del aperitivo.',
      spanishSpeakerNote: '«Avrei dovuto chiamare» es «debería haber llamado»: el condicional va en el modal, no en el verbo principal. Y fíjate en «avremo pensato»: futuro anteriore usado para suponer sobre el pasado, algo que el español resuelve con «habremos pensado».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Cuál es la idea del texto?',
          options: [
            ['primera', 'Que la llamada no era difícil: era solo la primera, y por eso costó seis años'],
            ['dinero', 'Que no hay que prestar dinero a los amigos'],
            ['boda', 'Que las bodas sirven para reconciliar a la gente'],
          ],
          answer: 'primera',
          evidence: 'la telefonata non era difficile. Era solo la prima.',
          correct: 'Sí, y el texto lo remata con la cuenta: una semana en vez de seis años.',
          incorrect: 'El texto no da consejos sobre préstamos, y la boda es la ocasión, no la tesis. Lee las dos frases finales.',
          strategy: 'Dos frases cortas y seguidas al final de un texto suelen contener su conclusión.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuánto duró la reconciliación en la boda?',
          options: [
            ['once', 'Once minutos'],
            ['seis', 'Seis años'],
            ['noche', 'Toda la noche'],
          ],
          answer: 'once',
          evidence: 'Poi abbiamo riso, e in undici minuti era finito tutto. Undici minuti. Sei anni contro undici minuti.',
          correct: 'Correcto, y el texto pone las dos cifras juntas a propósito.',
          incorrect: 'Los seis años son el silencio anterior. Busca la cifra que se repite tres veces seguidas.',
          strategy: 'Cuando una cifra se repite en tres frases seguidas, es la que el autor quiere que retengas.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El reencuentro fue «al matrimonio di un amico comune». ¿Qué significa aquí «matrimonio»?',
          options: [
            ['boda', 'La boda y su banquete'],
            ['casado', 'El estado civil del amigo'],
            ['aniversario', 'Un aniversario de bodas'],
          ],
          answer: 'boda',
          evidence: 'ci siamo visti al matrimonio di un amico comune, a Lecce, tra centoventi persone',
          correct: 'Eso es: hay ciento veinte personas y mesa de aperitivo. Es el banquete.',
          incorrect: 'Tiene lugar, fecha y ciento veinte invitados: es un acontecimiento, no un estado civil.',
          strategy: 'Si la palabra va con un sitio, una fecha y unos invitados, designa un acto, no una situación.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué dice que la segunda razón era la verdadera?',
          options: [
            ['culpa', 'Porque llamar primero equivalía a admitir que la culpa había sido suya'],
            ['tiempo', 'Porque de verdad había pasado demasiado tiempo'],
            ['dinero', 'Porque seguía esperando que le devolvieran el dinero'],
          ],
          answer: 'culpa',
          evidence: 'La seconda: se chiamo io, allora avevo torto io. La seconda è la vera. La prima è quella che raccontavo agli altri.',
          correct: 'Sí, y añade el detalle importante: la primera era la que contaba a los demás.',
          incorrect: 'El dinero ya estaba devuelto, y la primera razón la descarta él mismo. Lee las dos razones y lo que dice de ellas.',
          strategy: 'Cuando un texto enumera razones y luego las juzga, quédate con el juicio, no con la lista.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: el amigo nunca devolvió los cuatrocientos euros del préstamo.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'un prestito di quattrocento euro che gli avevo fatto e che lui aveva restituito in ritardo, con un messaggio che a me è sembrato freddo',
          correct: 'Falso: lo devolvió, solo que tarde y con un mensaje que a él le pareció frío.',
          incorrect: 'La respuesta está en la primera frase larga del texto. Fíjate en «aveva restituito».',
          strategy: 'El trapassato («aveva restituito») te dice que la acción sí ocurrió, y antes que el resto.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena los hechos.',
          options: [
            ['p1', 'La discusión de 2018 por el préstamo devuelto tarde'],
            ['p2', 'Las tres ocasiones en que debería haber llamado'],
            ['p3', 'El reencuentro en la boda de Lecce'],
            ['p4', 'Ahora se hablan cada dos semanas'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Poi, nel 2018, abbiamo litigato … Avrei dovuto chiamarlo la settimana dopo … Sei anni dopo ci siamo visti al matrimonio … Adesso ci parliamo ogni due settimane.',
          correct: 'Correcto: la pelea, los silencios, el reencuentro y el presente.',
          incorrect: 'Guíate por «nel 2018», «Sei anni dopo» y «Adesso».',
          strategy: 'Una confesión suele terminar en el presente: busca la palabra «adesso».',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en italiano sobre una llamada o un mensaje que no hiciste. Usa cuatro veces «avrei dovuto» y tres verbos en trapassato prossimo.',
        minWords: 80, maxWords: 140,
        hints: ['Avrei dovuto chiamarlo la settimana dopo.', 'Gli avevo scritto una cosa cattiva.', 'La seconda ragione è la vera.', 'Se avessi chiamato…, avremmo perso una settimana.'],
      },
    },
    // ---------------------------------------------------------------- 6
    {
      slug: 'nessuno-ha-applaudito',
      title: 'Nadie aplaudió',
      genre: 'crónica de concierto',
      topic: 'nueve segundos de silencio en una iglesia',
      tags: ['italiano b1', 'lectura', 'congiuntivo passato', 'futuro anteriore'],
      intro: 'Cuatro músicos, cien sillas, once euros. Al terminar la última pieza nadie aplaudió durante nueve segundos, y no fue por apuro. Lectura de italiano B1.',
      mission: 'Averigua qué explicó la violista sobre esos segundos.',
      seoTitle: 'Lectura de italiano B1: nadie aplaudió | WeLearn',
      seoDescription: 'Lee una crónica en italiano B1 y practica el congiuntivo passato y el futuro anteriore. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['congiuntivo-passato-b1', 'futuro-anteriore-b1', 'piacere-verbi-simili-a2'],
      text: `Il 9 febbraio sono andato a un concerto in una chiesa di Ferrara. Quattro musicisti, cento sedie, undici euro il biglietto. Alla fine dell'ultimo pezzo nessuno ha applaudito. Non per due secondi: per otto o nove.

Non è stato imbarazzo. Lo so perché li ho contati, quei secondi, e perché ho guardato intorno mentre passavano.

Il programma era di musica antica, quattro pezzi di autori che non conoscevo. Mi è piaciuto il terzo più di tutti, e mi sono piaciuti soprattutto i silenzi tra le frasi, che erano lunghi in un modo che oggi non si sente quasi mai.

Credo che quel silenzio finale sia stato la cosa migliore della serata. Mi dispiace che nessuno lo abbia registrato, e allo stesso tempo so che non si può registrare: appena metti un microfono, quel silenzio diventa un file e non è più la stessa cosa.

Dopo il concerto ho parlato con la violista. Le ho detto che mi era piaciuto molto e le ho chiesto se quel silenzio le fosse sembrato strano. Ha risposto: a me sembra che sia stato un regalo.

Poi ha spiegato una cosa che non sapevo. Ha detto che quando suoni in una chiesa il suono continua nell'aria per tre o quattro secondi dopo che hai smesso, e che quel tempo appartiene ancora al pezzo, non al pubblico. Chi batte le mani subito, ha detto, non applaude alla musica: applaude alla fine della musica.

Ho controllato dopo, a casa: quella chiesa è del Quattrocento, ha una navata unica e non ci sono né tappeti né tende. Non c'è niente che assorba il suono. Quello che i quattro musicisti hanno suonato per un'ora, quella pietra lo restituiva con quattro secondi di ritardo, e nessuno di noi lo aveva chiesto.

Quando avrò dimenticato i quattro pezzi, mi ricorderò di quei nove secondi. In parte è già successo: sono passati sei mesi e dei pezzi mi resta poco.

Il pubblico era di circa novanta persone, quasi tutte sopra i sessant'anni. Tra vent'anni quel pubblico non ci sarà più, e non credo che i concerti di musica antica in chiesa avranno cento sedie occupate. Ne avranno trenta, forse quaranta.

Ma non è il numero il problema. Il problema è che quando quelle novanta persone non ci saranno più, nessuno avrà insegnato a nessun altro che si possono aspettare nove secondi prima di battere le mani. E una cosa che nessuno insegna non si perde in un giorno: si perde senza che nessuno se ne accorga.`,
      objectives: [
        'Formar el congiuntivo passato: sia stato, abbia registrato.',
        'Usar el futuro anteriore para lo que estará hecho antes de otro momento: quando avrò dimenticato.',
        'Concordar piacere con lo que gusta: mi è piaciuto il terzo, mi sono piaciuti i silenzi.',
      ],
      vocabulary: [
        { surface: 'sedie', lemma: 'sedia', gloss: 'sillas' },
        { surface: 'pezzo', gloss: 'pieza musical' },
        { surface: 'battere', gloss: 'golpear; «battere le mani» es aplaudir' },
        { surface: 'smesso', lemma: 'smettere', gloss: 'dejado de hacer algo, parado' },
        { surface: 'registrato', lemma: 'registrare', gloss: 'grabado en audio' },
        { surface: 'resta', lemma: 'restare', gloss: 'queda; «mi resta poco» es me queda poco' },
        { surface: 'sopra', gloss: 'por encima de' },
        { surface: 'dispiace', lemma: 'dispiacere', gloss: 'lamento; «mi dispiace» es lo siento' },
      ],
      culturalNote: 'Las iglesias italianas se usan como sala de concierto por su reverberación, que puede pasar de tres segundos. Los intérpretes de música antigua la cuentan como parte de la obra, no como un defecto acústico.',
      spanishSpeakerNote: 'El congiuntivo passato opina sobre algo ya ocurrido: «credo che sia stato», «mi dispiace che nessuno lo abbia registrato». El español haría lo mismo con «haya sido», «haya grabado»: la estructura coincide, el auxiliar no siempre.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué preocupa al narrador al final?',
          options: [
            ['ensena', 'Que cuando ese público desaparezca nadie habrá enseñado a esperar antes de aplaudir'],
            ['sillas', 'Que los conciertos tendrán menos público y menos dinero'],
            ['grabacion', 'Que nadie grabó el concierto para poder escucharlo'],
          ],
          answer: 'ensena',
          evidence: 'nessuno avrà insegnato a nessun altro che si possono aspettare nove secondi prima di battere le mani. E una cosa che nessuno insegna non si perde in un giorno: si perde senza che nessuno se ne accorga.',
          correct: 'Sí, y el texto dice antes que el número no es el problema.',
          incorrect: 'El texto descarta expresamente que el problema sea el número, y la grabación es otro asunto. Lee la última frase.',
          strategy: 'Si un texto dice «no es X el problema», lo que viene después es su preocupación real.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué le gustó más del programa?',
          options: [
            ['tercero', 'La tercera pieza, y sobre todo los silencios entre frases'],
            ['ultima', 'La última pieza'],
            ['iglesia', 'La acústica de la iglesia'],
          ],
          answer: 'tercero',
          evidence: 'Mi è piaciuto il terzo più di tutti, e mi sono piaciuti soprattutto i silenzi tra le frasi.',
          correct: 'Correcto, y fíjate en la concordancia: piaciuto con el tercero, piaciuti con los silencios.',
          incorrect: 'De la última pieza solo se dice cuándo acabó. Busca la frase con «più di tutti».',
          strategy: 'La forma del participio de piacere te dice si lo que gustó era uno o varios.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: '¿Qué significa «battere le mani»?',
          options: [
            ['aplaudir', 'Aplaudir'],
            ['golpear', 'Golpear con las manos una superficie'],
            ['saludar', 'Saludar con la mano'],
          ],
          answer: 'aplaudir',
          evidence: 'Chi batte le mani subito, ha detto, non applaude alla musica: applaude alla fine della musica.',
          correct: 'Eso es, y el texto lo confirma en la misma frase con «applaude».',
          incorrect: 'La misma frase usa después el verbo «applaudire»: es un sinónimo, no un golpe ni un saludo.',
          strategy: 'Si en la misma frase aparece un sinónimo, ya tienes la traducción.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: 'Según la violista, ¿por qué aplaudir enseguida es un error?',
          options: [
            ['reverberacion', 'Porque el sonido sigue en el aire tres o cuatro segundos y ese tiempo es parte de la obra'],
            ['ruido', 'Porque molesta a los demás oyentes'],
            ['costumbre', 'Porque en las iglesias no se aplaude nunca'],
          ],
          answer: 'reverberacion',
          evidence: 'il suono continua nell\'aria per tre o quattro secondi dopo che hai smesso, e … quel tempo appartiene ancora al pezzo, non al pubblico',
          correct: 'Sí, y de ahí sale su frase: se aplaude al final de la música, no a la música.',
          incorrect: 'No habla de molestias ni de una prohibición. Lee su explicación sobre el aire.',
          strategy: 'Cuando un experto explica un fenómeno físico, ese fenómeno es la razón de su opinión.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: el público era de unas noventa personas, casi todas mayores de sesenta años.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Il pubblico era di circa novanta persone, quasi tutte sopra i sessant\'anni.',
          correct: 'Verdadero, y de ese dato sale la preocupación del final.',
          incorrect: 'Busca la frase que empieza por «Il pubblico era».',
          strategy: 'Los datos de público suelen ir en una frase propia, fácil de localizar.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la crónica.',
          options: [
            ['p1', 'Los nueve segundos sin aplausos al terminar'],
            ['p2', 'Lo que más le gustó del programa'],
            ['p3', 'La explicación de la violista sobre el sonido en el aire'],
            ['p4', 'La proyección a veinte años y lo que se perderá'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Alla fine dell\'ultimo pezzo nessuno ha applaudito … Mi è piaciuto il terzo più di tutti … Dopo il concerto ho parlato con la violista … Tra vent\'anni quel pubblico non ci sarà più.',
          correct: 'Correcto: el hecho, la valoración, la explicación y la proyección.',
          incorrect: 'Fíjate en cuándo habla con la violista y cuándo aparece «Tra vent\'anni».',
          strategy: 'Una crónica que acaba mirando al futuro deja esa parte para el final.',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en italiano sobre un momento de un concierto, una película o un partido que recuerdas. Usa dos veces el congiuntivo passato, dos el futuro anteriore y cuatro veces piacere.',
        minWords: 80, maxWords: 140,
        hints: ['Credo che sia stato il momento migliore.', 'Mi dispiace che nessuno lo abbia registrato.', 'Quando avrò dimenticato tutto…', 'Mi sono piaciuti i silenzi.'],
      },
    },
    // ---------------------------------------------------------------- 7
    {
      slug: 'il-negozio-che-ha-aperto-troppo-tardi',
      title: 'La tienda que abrió demasiado tarde',
      genre: 'artículo de opinión',
      topic: 'un taller de reparación que duró catorce meses',
      tags: ['italiano b1', 'lectura', 'periodo ipotetico', 'comparativos'],
      intro: 'Abrió en marzo de 2024 y cerró en mayo de 2025. Era mejor que el anterior en todo, y aun así cerró. Lectura de italiano B1.',
      mission: 'Averigua qué escribió Yusuf en el papel del escaparate el último día.',
      seoTitle: 'Lectura de italiano B1: la tienda que abrió demasiado tarde | WeLearn',
      seoDescription: 'Lee un artículo de opinión en italiano B1 y practica el periodo ipotetico y los comparativos. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['periodo-ipotetico-b1', 'congiuntivo-presente-b1', 'comparativi-a2'],
      text: `In via Sanzio, al numero 12, c'era un negozio di riparazione di elettrodomestici che ha aperto nel marzo del 2024 e ha chiuso nel maggio del 2025. Quattordici mesi.

Il proprietario si chiama Yusuf, ha quarantatré anni e ha fatto lo stesso lavoro per undici anni come dipendente, in un'azienda più grande e molto meno interessante.

Il suo negozio era migliore di quello che c'era prima nella stessa strada. I prezzi erano più bassi, l'orario era più lungo e Yusuf spiegava sempre cosa aveva rotto l'apparecchio, con l'apparecchio aperto sul banco. Non ho mai visto nessuno spiegare una lavatrice meglio di lui.

Se avesse aperto nel 2004, quel negozio esisterebbe ancora. Ne sono convinto, e non è nostalgia: è che nel 2004 riparare costava molto meno che comprare.

Adesso non è più così. Un forno nuovo costa centonovanta euro. La riparazione di un forno costa tra settanta e centoventi, più l'uscita del tecnico. Se la riparazione costa il sessanta per cento del nuovo, la gente compra il nuovo, e fa un calcolo che è sbagliato solo se guardi cinque anni avanti invece di uno.

Yusuf lo sapeva. Me lo ha detto la seconda volta che sono andato da lui: credo che questo mestiere abbia dieci anni davanti, non trenta.

Allora perché ha aperto?

Ha risposto così: perché avevo quarantadue anni, e se non lo avessi fatto allora non lo avrei fatto mai. E poi ha aggiunto una cosa che mi è rimasta in testa: undici anni a riparare le cose degli altri per qualcun altro sono più lunghi di quattordici mesi a riparare le cose degli altri per me.

Nei quattordici mesi gli ho portato tre cose: un tostapane, un aspirapolvere e la lavatrice. Il tostapane non era riparabile e non me lo ha fatto pagare. L'aspirapolvere era un filtro da otto euro. La lavatrice l'ha tenuta due giorni e me l'ha riportata a casa lui, con la sua macchina, senza chiedere niente per il trasporto.

L'ultimo giorno ha attaccato sulla vetrina un foglio A4 scritto a mano. Non diceva «cessata attività». Diceva: grazie a chi ha portato qui una cosa rotta invece di buttarla.

Oggi al numero 12 c'è un negozio di telefonia. Vende cover. Non credo che chiuda, e questo non è un buon segno per nessuno di noi.

Se qualcuno mi chiedesse se Yusuf ha sbagliato, risponderei che ha sbagliato i conti, e che non ha sbagliato niente altro.`,
      objectives: [
        'Combinar la condicional imposible con consecuencia presente: se avesse aperto, esisterebbe ancora.',
        'Formar comparativos de superioridad e inferioridad: migliore di, più lungo, meno che.',
        'Distinguir un error de cálculo de un error de decisión.',
      ],
      vocabulary: [
        { surface: 'dipendente', gloss: 'empleado por cuenta ajena' },
        { surface: 'lavatrice', gloss: 'lavadora' },
        { surface: 'forno', gloss: 'horno' },
        { surface: 'vetrina', gloss: 'escaparate' },
        { surface: 'cessata', lemma: 'cessare', gloss: 'cesada; «cessata attività» es cierre del negocio' },
        { surface: 'buttarla', lemma: 'buttare', gloss: 'tirarla a la basura' },
        { surface: 'cover', gloss: 'fundas de móvil' },
        { surface: 'conti', lemma: 'conto', gloss: 'cuentas, cálculos' },
      ],
      culturalNote: 'Italia aprobó ayudas fiscales a la reparación de electrodomésticos, pero el margen real depende del precio del aparato nuevo. Por debajo de los doscientos euros, reparar casi nunca sale a cuenta para el cliente.',
      spanishSpeakerNote: 'Fíjate en la mixta: «se avesse aperto nel 2004, quel negozio esisterebbe ancora» —condición imposible en el pasado, consecuencia en el presente. El español la construye igual: «si hubiera abierto…, existiría todavía».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué sostiene el artículo?',
          options: [
            ['cuentas', 'Que Yusuf se equivocó en los números y en nada más, y que su cierre dice algo del resto de nosotros'],
            ['malo', 'Que su tienda estaba mal montada y por eso cerró'],
            ['ayudas', 'Que hacen falta más ayudas públicas a la reparación'],
          ],
          answer: 'cuentas',
          evidence: 'risponderei che ha sbagliato i conti, e che non ha sbagliato niente altro … Non credo che chiuda, e questo non è un buon segno per nessuno di noi.',
          correct: 'Sí, y la frase sobre la tienda de fundas es la que amplía el asunto a todos.',
          incorrect: 'El texto dice que la tienda era mejor que la anterior en todo, y no pide ayudas. Lee la última frase.',
          strategy: 'Cuando un artículo termina con una hipótesis («si alguien me preguntara»), esa respuesta es su tesis.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuánto cuesta reparar un horno según el texto?',
          options: [
            ['70120', 'Entre setenta y ciento veinte euros, más el desplazamiento'],
            ['190', 'Ciento noventa euros'],
            ['60', 'Sesenta euros'],
          ],
          answer: '70120',
          evidence: 'Un forno nuovo costa centonovanta euro. La riparazione di un forno costa tra settanta e centoventi, più l\'uscita del tecnico.',
          correct: 'Correcto, y los ciento noventa son el precio del horno nuevo.',
          incorrect: 'Los 190 son el aparato nuevo y el 60 es un porcentaje, no euros.',
          strategy: 'Distingue los precios de los porcentajes antes de elegir.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El cartel no decía «cessata attività». ¿Qué significa esa expresión?',
          options: [
            ['cierre', 'Cierre del negocio'],
            ['vacaciones', 'Cerrado por vacaciones'],
            ['traslado', 'Traslado a otra dirección'],
          ],
          answer: 'cierre',
          evidence: 'L\'ultimo giorno ha attaccato sulla vetrina un foglio A4 scritto a mano. Non diceva «cessata attività».',
          correct: 'Eso es: es la fórmula habitual del último día, y él eligió no usarla.',
          incorrect: 'No hay traslado ni vacaciones: es el último día del negocio. Fíjate en el contexto de la frase.',
          strategy: 'Si el texto dice qué fórmula NO usó alguien, esa fórmula es la esperable en esa situación.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué abrió sabiendo que el oficio tenía diez años por delante?',
          options: [
            ['edad', 'Porque a los cuarenta y dos, si no lo hacía entonces, no lo iba a hacer nunca'],
            ['dinero', 'Porque esperaba ganar mucho dinero en poco tiempo'],
            ['ayuda', 'Porque contaba con una subvención pública'],
          ],
          answer: 'edad',
          evidence: 'perché avevo quarantadue anni, e se non lo avessi fatto allora non lo avrei fatto mai',
          correct: 'Sí, y lo completa con la comparación entre los once años y los catorce meses.',
          incorrect: 'No habla de ganar dinero rápido ni de subvenciones. Lee su respuesta a la pregunta directa.',
          strategy: 'Cuando el texto formula una pregunta directa, la respuesta viene inmediatamente después.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: antes de abrir su tienda, Yusuf no había trabajado nunca en reparación.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'ha fatto lo stesso lavoro per undici anni come dipendente, in un\'azienda più grande e molto meno interessante',
          correct: 'Falso: llevaba once años en el mismo oficio, pero por cuenta ajena.',
          incorrect: 'La respuesta está en el segundo párrafo, donde se presenta a Yusuf.',
          strategy: 'Cuando un texto presenta a alguien, ahí están sus datos profesionales.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena el artículo.',
          options: [
            ['p1', 'Las fechas de apertura y cierre: catorce meses'],
            ['p2', 'Por qué su tienda era mejor que la anterior'],
            ['p3', 'La cuenta de reparar frente a comprar'],
            ['p4', 'El cartel del último día y la tienda de fundas'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'ha aperto nel marzo del 2024 e ha chiuso nel maggio del 2025 … Il suo negozio era migliore di quello che c\'era prima … Un forno nuovo costa centonovanta euro … L\'ultimo giorno ha attaccato sulla vetrina un foglio A4.',
          correct: 'Correcto: dato, valoración, explicación económica y cierre.',
          incorrect: 'Fíjate en dónde aparecen los precios y dónde el cartel del escaparate.',
          strategy: 'Un artículo de opinión suele dejar la imagen final para el último tramo.',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en italiano sobre un negocio de tu barrio que cerró o aguantó. Usa dos condicionales imposibles, una posible y cinco comparativos.',
        minWords: 80, maxWords: 140,
        hints: ['Se avesse aperto nel 2004, esisterebbe ancora.', 'Era migliore di quello di prima.', 'Credo che questo mestiere abbia…', 'Se qualcuno mi chiedesse…, risponderei che…'],
      },
    },
    // ---------------------------------------------------------------- 8
    {
      slug: 'la-nonna-lo-aveva-detto',
      title: 'La abuela lo había dicho',
      genre: 'memoria familiar',
      topic: 'una abuela que nunca daba consejos a la cara',
      tags: ['italiano b1', 'lectura', 'trapassato prossimo', 'condizionale passato'],
      intro: 'Sesenta años sin dar un solo consejo de frente. Los daba a un tercero, elegido para que te llegara en dos días. Uno tardó cuarenta años. Lectura de italiano B1.',
      mission: 'Averigua qué decidió hacer el narrador con el mensaje de 1984.',
      seoTitle: 'Lectura de italiano B1: la abuela lo había dicho | WeLearn',
      seoDescription: 'Lee una memoria familiar en italiano B1 y practica el trapassato prossimo y el condizionale passato. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['trapassato-prossimo-b1', 'condizionale-passato-b1', 'pronomi-indiretti-a2'],
      text: `Mia nonna Elide non ha mai dato un consiglio in faccia a nessuno. In sessant'anni, nemmeno uno.

Il suo metodo era un altro. Se pensava che tu stessi sbagliando, lo diceva a una terza persona, e la scelta della terza persona non era mai casuale: sceglieva sempre qualcuno che te lo avrebbe riferito entro due giorni.

Quando avevo diciassette anni volevo lasciare la scuola e andare a lavorare in un magazzino. A me non ha detto niente. Ha detto a mio cugino Ettore, davanti al bar: tuo cugino ha buone mani, ma quello che ha in testa non gli servirà in un magazzino. Ettore me lo ha riferito quella sera stessa, come previsto.

Ho finito la scuola. Non per il consiglio: perché un consiglio che arriva così non ti obbliga a niente. Puoi ignorarlo senza offendere nessuno e senza discutere con nessuno. Ci ho messo vent'anni a capire che era esattamente questo il punto.

Nonna è morta a novembre, a novantuno anni. Al funerale è venuta la signora Tosi, che ha novantatré anni e abitava di fronte a lei fino al 1990. Mi ha preso per un braccio e mi ha detto una cosa che non mi aspettavo: nel 1984 tua nonna mi aveva dato un messaggio per tua madre, e io non gliel'ho mai consegnato.

Le ho chiesto perché. Ha risposto: perché era troppo pesante, e allora avevo pensato che fosse meglio aspettare. Poi ho aspettato quarant'anni.

Il messaggio non era una frase terribile. Era questo: dille che quando sono nata io non c'era nessuno che avesse tempo per me, e che lei con i suoi figli ha fatto meglio di sua madre e meglio di me.

Avrei potuto non dirlo. Ci ho pensato tre giorni. Ho pensato che se lo avessi tenuto per me sarei diventato la seconda persona che non consegna un messaggio, e che quarant'anni erano già abbastanza.

L'ho detto a mia madre a dicembre, in cucina, mentre lei asciugava i piatti. Non si è girata. Ha continuato ad asciugare e ha detto due parole: lo sapevo. Poi ha aggiunto: non lo sapevo, ma lo speravo, e a settantadue anni è la stessa cosa.

Adesso ho quarantasei anni e ho un dubbio che non riesco a risolvere. Se avessi un figlio che sta sbagliando, glielo direi in faccia o cercherei una signora Tosi?`,
      objectives: [
        'Usar el trapassato prossimo para lo anterior a otro pasado: mi aveva dato, avevo pensato.',
        'Formar el condizionale passato: avrei potuto, sarei diventato, te lo avrebbe riferito.',
        'Reconocer un método de comunicación que el texto describe sin nombrarlo.',
      ],
      vocabulary: [
        { surface: 'magazzino', gloss: 'almacén. ¡No es una revista!' },
        { surface: 'riferito', lemma: 'riferire', gloss: 'transmitido, contado a otro' },
        { surface: 'casuale', gloss: 'fruto del azar, sin intención' },
        { surface: 'pesante', gloss: 'difícil de llevar, duro' },
        { surface: 'asciugava', lemma: 'asciugare', gloss: 'secaba' },
        { surface: 'girata', lemma: 'girarsi', gloss: 'vuelta; «non si è girata» es no se dio la vuelta' },
        { surface: 'speravo', lemma: 'sperare', gloss: 'esperaba, deseaba' },
        { surface: 'consegna', lemma: 'consegnare', gloss: 'entrega' },
      ],
      culturalNote: 'El consejo transmitido por un tercero es una forma reconocible de comunicación familiar en el sur de Italia: permite decir algo sin obligar a nadie a responder ni a discutir en público.',
      spanishSpeakerNote: 'Aquí aparecen los pronombres combinados: «me lo ha riferito», «non gliel\'ho consegnato», «glielo direi». El indirecto se pone delante y cambia de forma: mi + lo = me lo; gli/le + lo = glielo. El español hace «se lo» en los dos casos.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué explica el texto sobre el método de la abuela?',
          options: [
            ['libertad', 'Que un consejo que llega por un tercero no obliga a nada y se puede ignorar sin discutir'],
            ['cobardia', 'Que era cobarde y evitaba los conflictos por miedo'],
            ['secreto', 'Que quería que sus consejos quedaran en secreto'],
          ],
          answer: 'libertad',
          evidence: 'un consiglio che arriva così non ti obbliga a niente. Puoi ignorarlo senza offendere nessuno e senza discutere con nessuno.',
          correct: 'Sí, y el narrador añade que tardó veinte años en ver que eso era precisamente lo buscado.',
          incorrect: 'El texto no la juzga de cobarde, y los consejos sí llegaban. Busca la frase sobre lo que un consejo así no obliga.',
          strategy: 'Cuando el narrador dice cuánto tardó en entender algo, ese algo es la tesis.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Por qué la señora Tosi no entregó el mensaje en 1984?',
          options: [
            ['pesado', 'Porque le pareció demasiado duro y prefirió esperar'],
            ['olvido', 'Porque se le olvidó y lo recordó en el funeral'],
            ['prohibido', 'Porque la abuela le pidió después que no lo diera'],
          ],
          answer: 'pesado',
          evidence: 'perché era troppo pesante, e allora avevo pensato che fosse meglio aspettare. Poi ho aspettato quarant\'anni.',
          correct: 'Correcto, y su propia frase final reconoce la desproporción de la espera.',
          incorrect: 'No dice haberlo olvidado, y la abuela no se retractó. Busca su respuesta a la pregunta «perché».',
          strategy: 'Una respuesta que empieza por «perché» es literal: no hay que deducir.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'A los diecisiete quería trabajar en un «magazzino». ¿Qué es?',
          options: [
            ['almacen', 'Un almacén'],
            ['revista', 'Una revista'],
            ['tienda', 'Una tienda de ropa'],
          ],
          answer: 'almacen',
          evidence: 'volevo lasciare la scuola e andare a lavorare in un magazzino … quello che ha in testa non gli servirà in un magazzino',
          correct: 'Eso es. Es un falso amigo del inglés y del español: no tiene nada de publicación.',
          incorrect: 'Se parece a «magacín» pero es un sitio de trabajo físico. Fíjate en que se contrapone a seguir estudiando.',
          strategy: 'Si la palabra designa un lugar de trabajo manual en el texto, descarta el sentido de publicación.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué decidió finalmente dar el mensaje a su madre?',
          options: [
            ['cadena', 'Para no convertirse él en la segunda persona que no lo entrega'],
            ['deber', 'Porque su abuela le había pedido a él que lo hiciera'],
            ['herencia', 'Porque estaba relacionado con la herencia familiar'],
          ],
          answer: 'cadena',
          evidence: 'Ho pensato che se lo avessi tenuto per me sarei diventato la seconda persona che non consegna un messaggio, e che quarant\'anni erano già abbastanza.',
          correct: 'Sí, y lo formula con una condicional imposible sobre sí mismo.',
          incorrect: 'La abuela no le pidió nada a él, y no hay herencia en juego. Lee la frase con «la seconda persona».',
          strategy: 'Cuando alguien razona con una condicional sobre sí mismo, ahí está su motivo.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: la madre respondió que ya lo sabía, y después matizó que en realidad lo esperaba.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'ha detto due parole: lo sapevo. Poi ha aggiunto: non lo sapevo, ma lo speravo.',
          correct: 'Verdadero, y ella misma explica por qué a los setenta y dos viene a ser lo mismo.',
          incorrect: 'Busca la escena de la cocina: dice dos cosas seguidas, y la segunda corrige la primera.',
          strategy: 'Si un personaje se corrige en la frase siguiente, las dos versiones cuentan.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena los hechos.',
          options: [
            ['p1', 'El consejo de los diecisiete años, por vía de su primo'],
            ['p2', 'La muerte de la abuela en noviembre'],
            ['p3', 'La señora Tosi le cuenta el mensaje de 1984'],
            ['p4', 'Se lo transmite a su madre en diciembre'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Quando avevo diciassette anni volevo lasciare la scuola … Nonna è morta a novembre … nel 1984 tua nonna mi aveva dato un messaggio … L\'ho detto a mia madre a dicembre.',
          correct: 'Correcto: el ejemplo del método, la muerte, la revelación y la entrega.',
          incorrect: 'Ojo: el mensaje es de 1984, pero él se entera en el funeral. Ordena por cuándo lo sabe, no por la fecha del mensaje.',
          strategy: 'En un relato con saltos temporales, ordena por cuándo se cuenta cada cosa, no por cuándo pasó.',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en italiano sobre un consejo que te llegó por medio de otra persona. Usa cuatro verbos en trapassato prossimo y tres en condizionale passato.',
        minWords: 80, maxWords: 140,
        hints: ['Mia nonna non ha mai dato un consiglio in faccia.', 'Me lo aveva riferito mio cugino.', 'Avrei potuto non dirlo.', 'Se lo avessi tenuto per me…'],
      },
    },
    // ---------------------------------------------------------------- 9
    {
      slug: 'mi-dica-lei-cosa-devo-fare',
      title: 'Dígame usted qué debo hacer',
      genre: 'escena de consulta',
      topic: 'un médico que devuelve la pregunta',
      tags: ['italiano b1', 'lectura', 'congiuntivo presente', 'forma de cortesía'],
      intro: 'Un cronómetro sobre la mesa que el médico usa consigo mismo, dos opciones para una rodilla y una pregunta que se niega a contestar. Lectura de italiano B1.',
      mission: 'Averigua qué dos preguntas dice el médico que la gente confunde.',
      seoTitle: 'Lectura de italiano B1: dígame usted qué debo hacer | WeLearn',
      seoDescription: 'Lee una escena de consulta en italiano B1 y practica el congiuntivo presente y la forma de cortesía con Lei. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['congiuntivo-presente-b1', 'congiuntivo-passato-b1', 'forma-cortesia-a2'],
      text: `Il dottor Ferrante è ortopedico e ha una cosa che nessun altro medico che ho conosciuto ha: un cronometro sul tavolo. Non lo usa per me. Lo usa per sé.

Sono andato da lui per il ginocchio sinistro. Ho quarantanove anni, gioco a calcetto il giovedì e da otto mesi non riesco a scendere le scale senza pensarci prima.

Ha guardato la risonanza per quattro minuti senza parlare. Poi ha detto: Lei ha due strade. La prima è l'operazione: tre mesi, e le probabilità che vada bene sono alte ma non sono il cento per cento. La seconda è la fisioterapia: sei mesi, tre volte alla settimana, e forse alla fine il ginocchio starà come adesso.

Gli ho fatto la domanda che gli fanno tutti: mi dica Lei cosa devo fare.

Ha risposto: no.

Non lo ha detto in modo antipatico. Ha spiegato: se le dico io cosa fare, Lei farà quello che dico, e poi, se non funziona, penserà che sia colpa mia. E avrà ragione a pensarlo, perché io non gioco a calcetto il giovedì e non so quanto le importa.

Gli ho detto che mi sembra strano che un medico non decida. Ha risposto una cosa che non mi aspettavo: credo che la gente confonda due domande diverse. La prima è che cosa sia più sicuro, e a quella rispondo io, perché è medicina. La seconda è che cosa valga la pena, e a quella non posso rispondere io, perché non è una domanda medica.

Poi mi ha chiesto lui: quanto le importa giocare il giovedì?

Non lo sapevo. Non ci avevo mai pensato in quei termini. Ci ho messo undici giorni a rispondere, e in quegli undici giorni ho capito che la risposta non era il calcetto: era scendere le scale con mia figlia senza fermarmi a metà.

Sono tornato e ho scelto l'operazione. Lui ha annuito e ha detto: bene, adesso la decisione è Sua e io lavoro per Lei, non al posto Suo.

Il cronometro, mi ha spiegato all'uscita, serve per costringersi a stare in silenzio quattro minuti guardando le immagini. Dice che prima parlava troppo presto e che sbagliava più spesso.

Non credo che tutti i medici debbano fare così. Ma credo che questo sia stato il primo che mi ha trattato come un adulto.`,
      objectives: [
        'Usar el congiuntivo presente en interrogativas indirectas: che cosa sia, che cosa valga.',
        'Tratar de usted con Lei y sus posesivos: la decisione è Sua, lavoro per Lei.',
        'Distinguir una pregunta técnica de una pregunta de valores.',
      ],
      vocabulary: [
        { surface: 'calcetto', gloss: 'fútbol sala entre amigos' },
        { surface: 'risonanza', gloss: 'resonancia magnética' },
        { surface: 'scendere', gloss: 'bajar' },
        { surface: 'annuito', lemma: 'annuire', gloss: 'asentido con la cabeza' },
        { surface: 'costringersi', gloss: 'obligarse a algo' },
        { surface: 'pena', gloss: 'pena; «valere la pena» es merecer la pena' },
        { surface: 'strade', lemma: 'strada', gloss: 'calles; aquí, caminos u opciones' },
        { surface: 'importa', lemma: 'importare', gloss: 'importa, tiene valor para alguien' },
      ],
      culturalNote: 'El consentimiento informado italiano obliga al médico a explicar alternativas y riesgos, pero no a elegir por el paciente. Muchos pacientes siguen esperando que decida el médico, y ahí empieza el malentendido.',
      spanishSpeakerNote: 'Con «Lei» todo va en tercera persona, incluidos los posesivos con mayúscula: «la decisione è Sua», «al posto Suo». Y fíjate en las interrogativas indirectas: «che cosa sia più sicuro» lleva congiuntivo donde el español pone indicativo.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Cuál es el asunto de la escena?',
          options: [
            ['dos', 'Que el médico separa lo que es más seguro, que le toca a él, de lo que merece la pena, que le toca al paciente'],
            ['operacion', 'Que la operación de rodilla es la mejor opción en todos los casos'],
            ['cronometro', 'Que los médicos deberían usar cronómetro en la consulta'],
          ],
          answer: 'dos',
          evidence: 'credo che la gente confonda due domande diverse. La prima è che cosa sia più sicuro … La seconda è che cosa valga la pena.',
          correct: 'Sí, y el propio médico dice de la segunda que no es una pregunta médica.',
          incorrect: 'El texto dice expresamente que no cree que todos los médicos deban hacer así, y no recomienda una opción universal.',
          strategy: 'Cuando un personaje distingue dos preguntas y reparte quién contesta cada una, ahí está la tesis.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuánto tardó el paciente en contestar a la pregunta del médico?',
          options: [
            ['once', 'Once días'],
            ['cuatro', 'Cuatro minutos'],
            ['ocho', 'Ocho meses'],
          ],
          answer: 'once',
          evidence: 'Ci ho messo undici giorni a rispondere, e in quegli undici giorni ho capito che la risposta non era il calcetto.',
          correct: 'Correcto, y en esos días cambió lo que él creía que estaba en juego.',
          incorrect: 'Los cuatro minutos son el silencio del médico y los ocho meses, el dolor previo.',
          strategy: 'Empareja cada duración con lo que mide: silencio, dolor, reflexión.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El médico dice «Lei ha due strade». ¿Qué significa aquí «strade»?',
          options: [
            ['opciones', 'Dos opciones, dos caminos posibles'],
            ['calles', 'Dos calles de la ciudad'],
            ['recetas', 'Dos recetas médicas'],
          ],
          answer: 'opciones',
          evidence: 'Lei ha due strade. La prima è l\'operazione … La seconda è la fisioterapia.',
          correct: 'Eso es, y las dos frases siguientes las enumeran.',
          incorrect: 'Lo que sigue son dos tratamientos, no dos direcciones ni dos prescripciones.',
          strategy: 'Si tras la palabra vienen «la prima» y «la seconda», está introduciendo alternativas.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Para qué usa el médico el cronómetro?',
          options: [
            ['silencio', 'Para obligarse a callar cuatro minutos mirando las imágenes antes de hablar'],
            ['paciente', 'Para limitar el tiempo de cada paciente'],
            ['operacion', 'Para medir la duración de sus operaciones'],
          ],
          answer: 'silencio',
          evidence: 'serve per costringersi a stare in silenzio quattro minuti guardando le immagini. Dice che prima parlava troppo presto e che sbagliava più spesso.',
          correct: 'Sí, y el texto lo anticipa en la primera frase: no lo usa para el paciente, lo usa para sí.',
          incorrect: 'La primera frase del texto descarta que sea para el paciente. Busca la explicación de la salida.',
          strategy: 'Si el texto adelanta un detalle al principio y lo explica al final, une las dos frases.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: el médico le recomendó finalmente la fisioterapia antes de operar.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Gli ho fatto la domanda che gli fanno tutti: mi dica Lei cosa devo fare. Ha risposto: no … Sono tornato e ho scelto l\'operazione.',
          correct: 'Falso: se negó a recomendar nada, y la operación la eligió el paciente.',
          incorrect: 'Busca la respuesta del médico a la pregunta directa. Son dos letras.',
          strategy: 'Una respuesta de una sola palabra en medio de un texto largo es siempre importante.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la escena.',
          options: [
            ['p1', 'Cuatro minutos de silencio mirando la resonancia'],
            ['p2', 'Expone las dos opciones y se niega a elegir'],
            ['p3', 'Le devuelve la pregunta: cuánto le importa el jueves'],
            ['p4', 'Once días después vuelve y elige operarse'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Ha guardato la risonanza per quattro minuti senza parlare … Lei ha due strade … Poi mi ha chiesto lui: quanto le importa giocare il giovedì? … Sono tornato e ho scelto l\'operazione.',
          correct: 'Correcto: silencio, opciones, contrapregunta y decisión.',
          incorrect: 'Fíjate en cuándo el médico pregunta él y cuándo el paciente vuelve.',
          strategy: 'En una escena de consulta, sigue el turno de palabra: quién habla y en qué orden.',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en italiano sobre una decisión que alguien te dejó tomar a ti. Trata de usted a la otra persona y usa cinco veces el congiuntivo.',
        minWords: 80, maxWords: 140,
        hints: ['Mi dica Lei cosa devo fare.', 'Credo che la gente confonda due domande.', 'Non è una domanda medica.', 'Adesso la decisione è Sua.'],
      },
    },
    // ---------------------------------------------------------------- 10
    {
      slug: 'la-casa-di-vent-anni',
      title: 'La casa de veinte años',
      genre: 'reportaje familiar',
      topic: 'una casa que se construye por tramos',
      tags: ['italiano b1', 'lectura', 'futuro anteriore', 'periodo ipotetico'],
      intro: 'Empezada en 2003 y sin terminar, con gente viviendo dentro desde hace diecinueve años. Dos habitaciones tardaron diecinueve años; las puertas, cuatro meses. Lectura de italiano B1.',
      mission: 'Averigua por qué la casa se terminó justo cuando se terminó.',
      seoTitle: 'Lectura de italiano B1: la casa de veinte años | WeLearn',
      seoDescription: 'Lee un reportaje familiar en italiano B1 y practica el futuro anteriore y el periodo ipotetico. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['futuro-anteriore-b1', 'periodo-ipotetico-b1', 'verbi-riflessivi-a2'],
      text: `La casa dei miei genitori, a Cerignola, è cominciata nel 2003 e non è ancora finita. Non è un cantiere abbandonato: ci abitano dentro da diciannove anni.

Funziona così. Nel 2003 hanno costruito il piano terra: due stanze, un bagno, la cucina. Nel 2007, con il primo pezzo di eredità di mio nonno, hanno alzato le pareti del primo piano. Nel 2011 hanno messo le finestre. Nel 2016 il pavimento. Il primo piano ha ancora due stanze senza porte, e in una di quelle stanze mia madre stende i panni quando piove.

Se qualcuno guarda quella casa da fuori, pensa che sia una casa non finita. Se ci entra, capisce che è una casa che si sta finendo.

Mio padre ha una frase che ripete da vent'anni: quando avremo finito il primo piano, faremo la scala esterna. Io ho trentaquattro anni e l'ho sentita per tutta la mia vita adulta. Ho smesso di crederci verso i venticinque, e a trentadue ho capito che non era una promessa: era un modo di alzarsi la mattina.

Ho una foto del 2009 in cui io e mio fratello siamo in piedi al primo piano, tra le pareti alzate e senza tetto, con le braccia aperte. Sembra la foto di una casa bombardata. Per noi quello era il posto migliore del paese: da lassù si vedeva tutta la strada e non c'era nessun adulto.

Mia madre la pensa diversamente. Lei dice: se avessimo aspettato di avere tutti i soldi, non ci saremmo mai trasferiti, e voi tre sareste cresciuti in affitto. Ha ragione, e i conti lo dimostrano: in diciannove anni hanno pagato zero euro di affitto.

Adesso c'è una cosa nuova. Mio fratello si è sposato in aprile e vivrà al primo piano. Quando si sarà sposato tuo fratello, dicevano da anni, il primo piano si finirà. Il matrimonio è stato in aprile, e a luglio le porte c'erano.

Diciannove anni per due stanze, e quattro mesi quando è servito davvero.

Non lo dico come critica. Lo dico perché mi sono accorto di una cosa: quella casa non si è mai finita perché non c'era nessuno che avesse bisogno che fosse finita. Le case si finiscono quando qualcuno ci deve entrare, non quando c'è il denaro.

Quando avrò dei figli, non so se costruirò così. Ma so che se dovessi scegliere tra vent'anni in una casa mia non finita e vent'anni in una casa finita di qualcun altro, sceglierei la prima, e non per i soldi.`,
      objectives: [
        'Usar el futuro anteriore: quando avremo finito, quando si sarà sposato.',
        'Combinar las tres condicionales, incluida la imposible con consecuencia pasada.',
        'Leer una reconstrucción cronológica con años sueltos.',
      ],
      vocabulary: [
        { surface: 'cantiere', gloss: 'obra en construcción' },
        { surface: 'eredità', gloss: 'herencia' },
        { surface: 'pareti', lemma: 'parete', gloss: 'paredes interiores' },
        { surface: 'pavimento', gloss: 'suelo de una habitación. ¡No es el pavimento de la calle!' },
        { surface: 'stende', lemma: 'stendere', gloss: 'tiende; «stendere i panni» es tender la ropa' },
        { surface: 'panni', lemma: 'panno', gloss: 'ropa lavada' },
        { surface: 'affitto', gloss: 'alquiler' },
        { surface: 'accorto', lemma: 'accorgersi', gloss: 'dado cuenta' },
      ],
      culturalNote: 'Construir la casa por tramos, según entra el dinero, es habitual en el sur de Italia, y muchas viviendas se habitan sin estar terminadas. La planta alta suele reservarse para un hijo que se casará.',
      spanishSpeakerNote: '«Quando avremo finito» y «quando si sarà sposato» son futuro anteriore: lo que estará hecho antes de otro momento futuro. El español pone ahí subjuntivo: «cuando hayamos terminado», «cuando se haya casado».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué conclusión saca el narrador?',
          options: [
            ['necesidad', 'Que las casas se terminan cuando alguien tiene que entrar, no cuando aparece el dinero'],
            ['pobreza', 'Que su familia era demasiado pobre para construir bien'],
            ['padre', 'Que su padre nunca tuvo intención de terminar la casa'],
          ],
          answer: 'necesidad',
          evidence: 'Le case si finiscono quando qualcuno ci deve entrare, non quando c\'è il denaro.',
          correct: 'Sí, y lo demuestra con la prueba de los cuatro meses tras la boda.',
          incorrect: 'El texto dice expresamente que no lo cuenta como crítica al padre, y las cuentas del alquiler le dan la razón a la madre.',
          strategy: 'Cuando un texto formula una regla general al final, esa regla es la conclusión.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué se hizo en 2007?',
          options: [
            ['paredes', 'Se levantaron las paredes de la primera planta'],
            ['ventanas', 'Se pusieron las ventanas'],
            ['suelo', 'Se puso el suelo'],
          ],
          answer: 'paredes',
          evidence: 'Nel 2007, con il primo pezzo di eredità di mio nonno, hanno alzato le pareti del primo piano. Nel 2011 hanno messo le finestre. Nel 2016 il pavimento.',
          correct: 'Correcto, y con dinero de una herencia.',
          incorrect: 'Las ventanas son de 2011 y el suelo de 2016. Empareja cada año con su obra.',
          strategy: 'Cuando un texto da una lista de años, léela entera antes de responder.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto dice que en 2016 pusieron «il pavimento». ¿Qué es?',
          options: [
            ['suelo', 'El suelo de las habitaciones'],
            ['calle', 'El asfalto de la calle de delante'],
            ['tejado', 'El tejado de la casa'],
          ],
          answer: 'suelo',
          evidence: 'Nel 2011 hanno messo le finestre. Nel 2016 il pavimento. Il primo piano ha ancora due stanze senza porte.',
          correct: 'Eso es. Va en la lista de obras interiores: paredes, ventanas, suelo, puertas.',
          incorrect: 'Se parece al «pavimento» de la calle, pero aquí va entre ventanas y puertas: es obra interior.',
          strategy: 'En una enumeración de obras, la posición de la palabra te dice de qué parte de la casa habla.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué dice que la frase de su padre no era una promesa?',
          options: [
            ['motor', 'Porque le servía para levantarse cada mañana con algo por delante'],
            ['mentira', 'Porque era una mentira para tranquilizar a la familia'],
            ['plazo', 'Porque tenía un plazo imposible de cumplir'],
          ],
          answer: 'motor',
          evidence: 'a trentadue ho capito che non era una promessa: era un modo di alzarsi la mattina',
          correct: 'Sí, y lo dice sin reproche: es una lectura, no una acusación.',
          incorrect: 'El texto no la llama mentira ni habla de plazos. Lee lo que entendió a los treinta y dos.',
          strategy: 'Después de dos puntos suele venir la reinterpretación de lo que se acaba de negar.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: las puertas de la primera planta se colocaron a los cuatro meses de la boda del hermano.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Il matrimonio è stato in aprile, e a luglio le porte c\'erano … Diciannove anni per due stanze, e quattro mesi quando è servito davvero.',
          correct: 'Verdadero, y esa desproporción es la prueba de toda la tesis del texto.',
          incorrect: 'Busca las dos fechas seguidas: abril y julio, y la frase que las resume.',
          strategy: 'Si el texto resume dos fechas en una cifra, comprueba las fechas y luego la cifra.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la construcción según el texto.',
          options: [
            ['p1', 'La planta baja, en 2003'],
            ['p2', 'Las paredes de arriba, en 2007'],
            ['p3', 'Las ventanas en 2011 y el suelo en 2016'],
            ['p4', 'Las puertas, después de la boda de abril'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Nel 2003 hanno costruito il piano terra … Nel 2007 … hanno alzato le pareti … Nel 2011 hanno messo le finestre. Nel 2016 il pavimento … a luglio le porte c\'erano.',
          correct: 'Correcto: la cronología está dada por los años.',
          incorrect: 'Sigue los años en orden: 2003, 2007, 2011, 2016 y por último la boda.',
          strategy: 'Cuando el texto da fechas explícitas, la cronología ya está resuelta.',
        },
      ],
      production: {
        prompt: 'Escribe 12–15 frases en italiano sobre algo que en tu familia se hizo por tramos, según entraba el dinero. Usa dos futuros anteriori y dos condicionales imposibles.',
        minWords: 80, maxWords: 140,
        hints: ['Quando avremo finito il primo piano…', 'Se avessimo aspettato…, non ci saremmo mai trasferiti.', 'Mi sono accorto di una cosa.', 'Se dovessi scegliere, sceglierei…'],
      },
    },
  ],
}
