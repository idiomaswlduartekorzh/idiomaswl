// Lectura — Italiano A2. Diez lecturas.
//
// Fuente de verdad. Los JSON se generan con `node scripts/build-reading-exercises.mjs --write`.
//
// Criterio del nivel
// -----------------
// Las diez cubren los 20 temas de gramática de italiano A2 —dos por lectura— y cada una
// arrastra además un tema de A1. Banda de 200-240 palabras.
//
// A2 estrena el pasado, y en italiano eso son dos tiempos con reparto de papeles: el passato
// prossimo para el hecho puntual y l'imperfetto para lo que duraba o se repetía. Los textos
// los usan juntos donde toca, que es como se aprende la diferencia.
//
// Sigue fuera el congiuntivo, que es de B1. Ojo al escribir: en italiano se cuela solo
// después de «penso che», «sembra che» y «come se». Aquí se reformula, no se usa.
//
// Se mantiene el criterio del nivel anterior: el falso amigo glosado en cada lectura.
// «Officina» es taller, «paese» es pueblo, «anagrafe» no tiene equivalente español directo.

const A1_GRAMMAR = [
  'aggettivi-possessivi', 'aggettivi-qualificativi', 'articoli', 'avverbi-frequenza',
  'ce-ci-sono', 'domande-interrogativi', 'genere-numero', 'imperativo', 'negazione',
  'preposizioni-articolate', 'preposizioni-semplici', 'presente-verbi-are',
  'presente-verbi-ere-ire', 'pronomi-soggetto', 'stare-gerundio', 'verbi-irregolari',
  'verbo-avere', 'verbo-essere',
]

const A2_GRAMMAR = [
  'avverbi-frequenza-modo-a2', 'ci-vuole-vogliono-a2', 'comparativi-a2',
  'condizionale-presente-a2', 'congiunzioni-logiche-a2', 'da-presente-a2',
  'forma-cortesia-a2', 'futuro-probabilita-a2', 'futuro-semplice-a2', 'imperfetto-a2',
  'passato-prossimo-avere-a2', 'passato-prossimo-essere-a2', 'periodo-ipotetico-reale-a2',
  'piacere-verbi-simili-a2', 'pronomi-diretti-a2', 'pronomi-indiretti-a2',
  'pronomi-relativi-a2', 'stare-per-a2', 'trapassato-prossimo-a2', 'verbi-riflessivi-a2',
]

export default {
  language: 'it',
  variant: 'it-IT',
  cefr: 'A2',
  displayLabel: 'Italiano A2',
  tutorLocales: ['es'],
  status: 'approved',
  seriesId: 'italiano-a2-lectura-10',
  allowedGrammar: [...A1_GRAMMAR, ...A2_GRAMMAR],
  disallowedGrammar: ['congiuntivo', 'passato remoto', 'periodo ipotetico irreale', 'forma passiva'],
  maxOutOfLevelVocabularyPercent: 5,
  inferenceBand: 'light',
  scriptSupport: { furigana: false, romanization: 'none', stressMarks: false, tokenizationMode: 'space' },
  targetCanDo:
    'Puedes seguir un relato en italiano sobre hechos pasados, distinguir el passato prossimo del imperfetto, y justificar tu respuesta con la frase exacta.',
  assessor: 'Zhanna Korzh — revisión de lengua y pedagogía',
  assessedAt: '2026-08-18T00:00:00-05:00',
  levelNotes: 'Passato prossimo con avere y essere, imperfetto, futuro, condizionale y forma di cortesia. Sin congiuntivo ni passato remoto.',
  lastModified: '2026-08-18T00:00:00-05:00',
  review: {
    author: 'José David Duarte Silva',
    languageReviewer: 'Zhanna Korzh',
    pedagogyReviewer: 'Zhanna Korzh',
    reviewedAt: '2026-08-18T00:00:00-05:00',
    copyrightChecked: true,
    cultureChecked: true,
    aiAssisted: true,
    aiUseNote: 'Borrador asistido por IA, revisado y aprobado por Zhanna Korzh (lengua y pedagogía).',
    languageDecision: 'approved',
    pedagogyDecision: 'approved',
  },

  exercises: [
    // ---------------------------------------------------------------- 1
    {
      slug: 'il-treno-che-non-ho-preso',
      title: 'El tren que no cogí',
      genre: 'relato en primera persona',
      topic: 'dejar pasar un tren a propósito',
      tags: ['italiano a2', 'lectura', 'passato prossimo con avere', 'passato prossimo con essere'],
      intro: 'Tenía el billete, la maleta cerrada y un trabajo esperando en Milán. Se quedó sentado en el banco del andén tres. Lectura de italiano A2.',
      mission: 'Averigua qué encontró en esas dos horas y diez minutos.',
      seoTitle: 'Lectura de italiano A2: el tren que no cogí | WeLearn',
      seoDescription: 'Lee un relato en italiano A2 y practica el passato prossimo con avere y con essere. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['passato-prossimo-avere-a2', 'passato-prossimo-essere-a2', 'presente-verbi-are'],
      text: `Non ho preso il treno delle sette e quaranta. Avevo il biglietto in tasca, la valigia era chiusa e il lavoro a Milano cominciava il lunedì dopo. Sono arrivato in stazione con venti minuti di anticipo, ho comprato un caffè e mi sono seduto sulla panchina del binario tre.

Il treno è arrivato. Le porte si sono aperte. Le persone sono salite. Le porte si sono chiuse. Io sono rimasto sulla panchina con il caffè in mano.

Non ho una spiegazione elegante. Non avevo paura di Milano e non volevo tornare a casa. Semplicemente non mi sono alzato.

Un uomo delle pulizie mi ha guardato e mi ha fatto una domanda: ha perso il treno? Ho risposto che sì. Lui ha detto: succede. Poi ha continuato a pulire.

Ho aspettato due ore e dieci minuti. In quelle due ore non ho telefonato a nessuno, non ho scritto a nessuno e nessuno sapeva dove ero. Ho pensato che era la prima volta nella mia vita.

Ho preso il treno delle nove e cinquanta. A Milano ho detto che il primo treno era in ritardo. Nessuno ha controllato niente, perché a nessuno interessava.

Ho lavorato in quell'azienda quattro anni e non ho mai raccontato questa storia. La racconto adesso perché ho capito una cosa: quelle due ore non sono state un errore. Sono state le uniche due ore della mia vita in cui nessuno mi cercava.`,
      objectives: [
        'Elegir el auxiliar del passato prossimo: avere para casi todo, essere para movimiento y verbos reflexivos.',
        'Concordar el participio con essere: sono salite, sono state.',
        'Distinguir un hecho puntual de una situación de fondo en imperfetto.',
      ],
      vocabulary: [
        { surface: 'biglietto', gloss: 'billete' },
        { surface: 'valigia', gloss: 'maleta' },
        { surface: 'panchina', gloss: 'banco para sentarse' },
        { surface: 'binario', gloss: 'vía, andén' },
        { surface: 'anticipo', gloss: 'adelanto; «con anticipo» es con tiempo de sobra' },
        { surface: 'pulizie', gloss: 'limpieza; «uomo delle pulizie» es limpiador' },
        { surface: 'ritardo', gloss: 'retraso' },
        { surface: 'azienda', gloss: 'empresa' },
      ],
      culturalNote: 'En Italia el andén se llama «binario» y es el número que se anuncia, no la vía. Perder un tren regional no es grave: los siguientes salen cada una o dos horas.',
      spanishSpeakerNote: 'El passato prossimo elige auxiliar igual que el francés o el alemán: «ho preso» pero «sono arrivato». Con essere el participio concuerda: «le porte si sono aperte», «le persone sono salite». El español no hace nada de esto.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué descubrió el narrador al perder el tren?',
          options: [
            ['solo', 'Que fueron las únicas dos horas de su vida en que nadie sabía dónde estaba'],
            ['trabajo', 'Que en realidad no quería aquel trabajo en Milán'],
            ['tarde', 'Que llegar tarde no tiene consecuencias'],
          ],
          answer: 'solo',
          evidence: 'Sono state le uniche due ore della mia vita in cui nessuno mi cercava.',
          correct: 'Sí, y por eso lo cuenta veinte años después: no fue un error.',
          incorrect: 'Trabajó allí cuatro años, y lo de llegar tarde es un detalle. Lee la última frase.',
          strategy: 'Cuando alguien cuenta algo que calló durante años, la razón para contarlo está al final.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué le dijo el hombre de la limpieza?',
          options: [
            ['succede', 'Le preguntó si había perdido el tren y luego dijo «pasa»'],
            ['ayuda', 'Le ofreció ayuda para cambiar el billete'],
            ['nada', 'No le dijo nada y siguió limpiando'],
          ],
          answer: 'succede',
          evidence: 'mi ha fatto una domanda: ha perso il treno? Ho risposto che sì. Lui ha detto: succede.',
          correct: 'Correcto, y después siguió limpiando sin añadir nada.',
          incorrect: 'Sí que habló, y no ofreció ayuda. Busca la frase con «ha perso il treno?».',
          strategy: 'Cuando un texto reproduce un diálogo corto, la respuesta está en la cita literal.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'Dice que llegó «con venti minuti di anticipo». ¿Qué significa «anticipo»?',
          options: [
            ['adelanto', 'Con veinte minutos de adelanto'],
            ['retraso', 'Con veinte minutos de retraso'],
            ['pago', 'Con un pago adelantado'],
          ],
          answer: 'adelanto',
          evidence: 'Sono arrivato in stazione con venti minuti di anticipo, ho comprato un caffè e mi sono seduto.',
          correct: 'Eso es. Le sobró tiempo, y con él se compró un café.',
          incorrect: 'Si hubiera llegado tarde no habría podido ver salir el tren. El retraso en el texto es «ritardo».',
          strategy: 'El italiano opone «anticipo» a «ritardo»: si ves los dos en un texto, uno te define el otro.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué en Milán nadie comprobó su versión?',
          options: [
            ['indiferencia', 'Porque a nadie le importaba: llegó y punto'],
            ['prueba', 'Porque presentó un justificante de la compañía'],
            ['jefe', 'Porque su jefe también había perdido el tren'],
          ],
          answer: 'indiferencia',
          evidence: 'Nessuno ha controllato niente, perché a nessuno interessava.',
          correct: 'Sí, y el texto lo dice con un «perché»: no había interés, no había justificante.',
          incorrect: 'No aparece ningún justificante ni ningún jefe. Lee la explicación tras el «perché».',
          strategy: 'Una explicación con «perché» es literal: no hace falta deducir.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: durante esas dos horas llamó por teléfono a su familia para avisar.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'non ho telefonato a nessuno, non ho scritto a nessuno e nessuno sapeva dove ero',
          correct: 'Falso, y es el punto del texto: precisamente nadie sabía dónde estaba.',
          incorrect: 'Busca la frase con tres negaciones seguidas. Ahí está la respuesta.',
          strategy: 'Tres negaciones seguidas en una frase son una afirmación fuerte: léela entera.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena los hechos del relato.',
          options: [
            ['p1', 'Llega con adelanto y se sienta con un café'],
            ['p2', 'El tren se va y él no se levanta'],
            ['p3', 'El limpiador le pregunta si lo ha perdido'],
            ['p4', 'Coge el de las 9:50 y en Milán dice que hubo retraso'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Sono arrivato in stazione con venti minuti di anticipo … Io sono rimasto sulla panchina … Un uomo delle pulizie mi ha guardato … Ho preso il treno delle nove e cinquanta.',
          correct: 'Correcto. El relato va en orden, sin saltos.',
          incorrect: 'Guíate por los horarios: primero las 7:40, luego el limpiador, después las 9:50.',
          strategy: 'Si el relato menciona horas concretas, esas horas ordenan los hechos.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en italiano sobre algo que dejaste pasar a propósito. Usa seis verbos en passato prossimo, al menos dos con essere.',
        minWords: 60, maxWords: 110,
        hints: ['Non ho preso…', 'Sono arrivato con anticipo.', 'Mi sono seduto e ho aspettato.', 'Non ho raccontato questa storia a nessuno.'],
      },
    },
    // ---------------------------------------------------------------- 2
    {
      slug: 'mio-padre-non-parlava-al-telefono',
      title: 'Mi padre no hablaba por teléfono',
      genre: 'memoria familiar',
      topic: 'el teléfono negro de la cocina',
      tags: ['italiano a2', 'lectura', 'imperfetto', 'conjunciones lógicas'],
      intro: 'Un solo teléfono en casa, colgado en la pared de la cocina, y un padre que decía siempre la misma frase: ahora te la paso. Lectura de italiano A2.',
      mission: 'Averigua qué razón dio él, y qué hizo su mujer durante veinte años.',
      seoTitle: 'Lectura de italiano A2: mi padre no hablaba por teléfono | WeLearn',
      seoDescription: 'Lee una memoria familiar en italiano A2 y practica el imperfetto y las conjunciones lógicas. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['imperfetto-a2', 'congiunzioni-logiche-a2', 'verbo-essere'],
      text: `Quando ero piccolo, in casa nostra c'era un solo telefono. Era nero, stava in cucina attaccato al muro e aveva un filo lungo due metri. Mia madre parlava molto al telefono. Mia zia parlava ancora di più. Mio padre non parlava mai.

Non era timido, perché in officina parlava tutto il giorno con i clienti. Non era freddo, perché a tavola raccontava storie lunghissime. Ma quando il telefono suonava e la chiamata era per lui, diceva sempre la stessa frase: adesso te la passo.

Poi passava il telefono a mia madre e usciva dalla cucina.

Mia madre allora ascoltava, diceva sì, sì, certo, e alla fine spiegava a mio padre cosa aveva detto la persona all'altro capo. Lui rispondeva a lei, e lei rispondeva al telefono. Funzionava così da vent'anni.

Una volta gli ho chiesto perché. Mi ha detto: al telefono non vedo la faccia. E poi ha aggiunto: se non vedo la faccia, non so se la persona dice la verità.

Adesso ha ottantuno anni e ha uno smartphone, quindi il problema è finito: fa le videochiamate. Parla venti minuti con mia sorella e le fa vedere il giardino, i pomodori, il cane.

Mia madre dice che è ingiusto, perché lei ha passato vent'anni a fare la traduttrice in casa propria e nessuno la ringrazia. Ha ragione anche questa volta.`,
      objectives: [
        'Usar el imperfetto para lo que duraba o se repetía: era, stava, parlava, diceva.',
        'Encadenar conjunciones lógicas: perché, ma, quando, se, quindi, allora.',
        'Distinguir la costumbre del pasado del estado actual.',
      ],
      vocabulary: [
        { surface: 'filo', gloss: 'cable' },
        { surface: 'officina', gloss: 'taller mecánico. ¡No es una «oficina»!' },
        { surface: 'suonava', lemma: 'suonare', gloss: 'sonaba' },
        { surface: 'capo', gloss: 'extremo; «all\'altro capo» es al otro lado de la línea' },
        { surface: 'aggiunto', lemma: 'aggiungere', gloss: 'añadido' },
        { surface: 'ingiusto', gloss: 'poco justo' },
        { surface: 'ringrazia', lemma: 'ringraziare', gloss: 'da las gracias' },
        { surface: 'videochiamate', gloss: 'videollamadas' },
      ],
      culturalNote: 'Hasta los años noventa lo normal en una casa italiana era un solo teléfono fijo, en la cocina o en el recibidor, con cable. La llamada era un acto compartido por toda la familia, no privado.',
      spanishSpeakerNote: '«Officina» es un taller, no una oficina: para eso el italiano dice «ufficio». Y fíjate en el imperfetto: «parlava», «era», «stava» — es exactamente el imperfecto español, así que aquí juegas con ventaja.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué cuenta el texto?',
          options: [
            ['intermediaria', 'Que el padre no hablaba por teléfono y la madre hizo de intermediaria veinte años'],
            ['pobreza', 'Que en su casa no podían pagar un segundo teléfono'],
            ['timidez', 'Que su padre era una persona tímida y callada'],
          ],
          answer: 'intermediaria',
          evidence: 'Lui rispondeva a lei, e lei rispondeva al telefono. Funzionava così da vent\'anni.',
          correct: 'Sí, y el texto descarta expresamente la timidez con dos «perché».',
          incorrect: 'El texto niega que fuera tímido o frío, y no habla de dinero. Busca cómo funcionaba la conversación.',
          strategy: 'Si un texto descarta dos explicaciones con «non era… perché», la verdadera es otra.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué frase decía el padre cuando la llamada era para él?',
          options: [
            ['passo', '«Adesso te la passo»'],
            ['dopo', '«Richiamo io più tardi»'],
            ['no', '«Non ci sono»'],
          ],
          answer: 'passo',
          evidence: 'diceva sempre la stessa frase: adesso te la passo.',
          correct: 'Correcto, y después salía de la cocina.',
          incorrect: 'No pedía devolver la llamada ni mentía. Busca la frase que el texto llama «la stessa frase».',
          strategy: 'Cuando el texto anuncia «la misma frase», lo que viene después de los dos puntos es la cita.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto dice que en la «officina» hablaba todo el día. ¿Qué es una «officina»?',
          options: [
            ['taller', 'Un taller mecánico'],
            ['oficina', 'Una oficina con escritorios'],
            ['fabrica', 'Una fábrica grande'],
          ],
          answer: 'taller',
          evidence: 'Non era timido, perché in officina parlava tutto il giorno con i clienti.',
          correct: 'Eso es, y es un falso amigo clásico: para oficina el italiano dice «ufficio».',
          incorrect: 'Se parece a «oficina» pero no lo es. Fíjate en que allí atiende clientes cara a cara.',
          strategy: 'Ante una palabra casi idéntica al español, comprueba si el resto de la frase la contradice.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué la madre dice ahora que es injusto?',
          options: [
            ['gracias', 'Porque ella hizo el trabajo durante veinte años y nadie se lo agradece'],
            ['telefono', 'Porque no sabe usar el smartphone'],
            ['jardin', 'Porque el padre solo habla del jardín'],
          ],
          answer: 'gracias',
          evidence: 'lei ha passato vent\'anni a fare la traduttrice in casa propria e nessuno la ringrazia',
          correct: 'Sí, y el narrador le da la razón en la última frase.',
          incorrect: 'No se dice que no sepa usar el móvil, y el jardín es un detalle de las videollamadas. Lee la penúltima frase.',
          strategy: 'La queja de un personaje suele venir explicada en la misma frase, tras un «perché».',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: ahora el padre habla veinte minutos por videollamada con su hija.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'fa le videochiamate. Parla venti minuti con mia sorella e le fa vedere il giardino, i pomodori, il cane.',
          correct: 'Verdadero, y encaja con su razón de antes: ahora sí ve la cara.',
          incorrect: 'Busca el párrafo que empieza por «Adesso ha ottantuno anni».',
          strategy: 'La palabra «adesso» separa el pasado del presente: busca ahí lo que ha cambiado.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la memoria familiar.',
          options: [
            ['p1', 'Describe el teléfono negro de la cocina'],
            ['p2', 'Explica que el padre nunca hablaba y por qué no era timidez'],
            ['p3', 'Cuenta la razón que le dio: no ver la cara'],
            ['p4', 'Hoy hace videollamadas y la madre protesta'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Era nero, stava in cucina attaccato al muro … Non era timido, perché in officina parlava … Mi ha detto: al telefono non vedo la faccia … Adesso ha ottantuno anni e ha uno smartphone.',
          correct: 'Correcto: objeto, costumbre, explicación y presente.',
          incorrect: 'Fíjate en cuándo aparece la pregunta del narrador y cuándo entra el «Adesso».',
          strategy: 'Una memoria familiar suele ir del recuerdo al presente: busca la palabra que marca el corte.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en italiano sobre una costumbre de tu casa cuando eras pequeño. Usa ocho verbos en imperfetto y cuatro conjunciones distintas.',
        minWords: 60, maxWords: 110,
        hints: ['Quando ero piccolo, c\'era…', 'Mia madre parlava molto, ma…', 'Non era timido, perché…', 'Adesso il problema è finito.'],
      },
    },
    // ---------------------------------------------------------------- 3
    {
      slug: 'il-messaggio-che-non-ho-mandato',
      title: 'El mensaje que no mandé',
      genre: 'confesión escrita',
      topic: 'dos hermanas que no se hablan',
      tags: ['italiano a2', 'lectura', 'pronombres directos', 'pronombres indirectos'],
      intro: 'Escribió el mismo mensaje cuatro veces en dos años y lo borró cuatro veces. Al final no hizo falta mandarlo. Lectura de italiano A2.',
      mission: 'Averigua para qué sirvieron esas cuatro veces, si nunca llegó a enviarlo.',
      seoTitle: 'Lectura de italiano A2: el mensaje que no mandé | WeLearn',
      seoDescription: 'Lee una confesión en italiano A2 y practica los pronombres directos e indirectos. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['pronomi-diretti-a2', 'pronomi-indiretti-a2', 'pronomi-soggetto'],
      text: `Non parlo con mia sorella da due anni. La ragione è stupida e non la voglio raccontare qui, perché se la racconto sembra ancora più stupida.

Il mese scorso ho scritto un messaggio. L'ho scritto in dieci minuti e l'ho letto venti volte. Poi l'ho cancellato. La settimana dopo l'ho scritto di nuovo, con parole diverse, e l'ho cancellato ancora.

Nel messaggio non le chiedevo scusa. Le dicevo solo una cosa: mamma ha un controllo in ospedale il quattordici e ci vado io. Niente altro. Nessun sentimento, nessuna spiegazione. Un'informazione.

Il tredici sera mi ha scritto lei. Il messaggio diceva: domani vieni tu in ospedale o vado io? Le ho risposto dopo un minuto: vengo io, ma se vuoi venire ci vediamo là.

Il giorno dopo l'ho vista davanti all'ascensore del secondo piano. Non ci siamo abbracciate. Le ho dato un caffè della macchinetta e lei mi ha detto grazie. Poi siamo entrate insieme.

Mamma non ha capito niente di quello che era successo tra noi. Ci ha guardate e ha detto solo questo: bene, siete venute tutte e due.

In due anni ho scritto quel messaggio quattro volte e non l'ho mandato mai. Alla fine non è servito a niente. Ma penso una cosa: sono state quelle quattro volte a prepararmi per il tredici sera. Quando lei ha scritto, io avevo già la risposta pronta.`,
      objectives: [
        'Usar los pronombres directos lo, la, li, le y su forma elidida l\'.',
        'Usar los indirectos mi, ti, le, gli, ci con verbos de decir y dar.',
        'Seguir un relato donde lo importante es lo que no se dijo.',
      ],
      vocabulary: [
        { surface: 'cancellato', lemma: 'cancellare', gloss: 'borrado' },
        { surface: 'scusa', gloss: 'perdón; «chiedere scusa» es pedir perdón' },
        { surface: 'controllo', gloss: 'revisión médica' },
        { surface: 'macchinetta', gloss: 'máquina de café' },
        { surface: 'abbracciate', lemma: 'abbracciarsi', gloss: 'abrazadas' },
        { surface: 'davanti', gloss: 'delante de' },
        { surface: 'stupida', lemma: 'stupido', gloss: 'tonta, sin importancia' },
        { surface: 'servito', lemma: 'servire', gloss: 'servido, valido para algo' },
      ],
      culturalNote: 'En Italia acompañar a un padre o una madre a una cita médica se reparte entre los hijos y se negocia por mensaje. Es una de las conversaciones que obligan a hablarse aunque no se quiera.',
      spanishSpeakerNote: 'El pronombre directo se apoya en el verbo y se acorta delante de vocal: «l\'ho scritto», «l\'ho cancellato». El indirecto no se acorta: «le ho risposto», «mi ha scritto». Confundirlos cambia quién hace qué.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Cuál es la idea del texto?',
          options: [
            ['preparo', 'Que escribir el mensaje cuatro veces la preparó para contestar cuando llegó el momento'],
            ['perdon', 'Que pidió perdón a su hermana por escrito'],
            ['madre', 'Que su madre las reconcilió a propósito'],
          ],
          answer: 'preparo',
          evidence: 'sono state quelle quattro volte a prepararmi per il tredici sera. Quando lei ha scritto, io avevo già la risposta pronta.',
          correct: 'Sí, y el texto lo dice justo al final, después de admitir que el mensaje no sirvió.',
          incorrect: 'El texto dice expresamente que en el mensaje no pedía perdón, y la madre no entiende nada. Lee las dos últimas frases.',
          strategy: 'Cuando un texto dice «no sirvió de nada, pero…», lo que viene después del «pero» es la tesis.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Quién escribió primero, al final?',
          options: [
            ['hermana', 'La hermana, la noche del trece'],
            ['narradora', 'La narradora, después de cuatro intentos'],
            ['madre', 'La madre, desde el hospital'],
          ],
          answer: 'hermana',
          evidence: 'Il tredici sera mi ha scritto lei. Il messaggio diceva: domani vieni tu in ospedale o vado io?',
          correct: 'Correcto, y por eso los cuatro borradores nunca se enviaron.',
          incorrect: 'La narradora borró los cuatro mensajes y la madre no escribe a nadie. Busca la frase con «Il tredici sera».',
          strategy: 'Fíjate en el pronombre sujeto «lei» al final de la frase: el italiano lo pone ahí para destacarlo.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto dice «l\'ho cancellato». ¿Qué significa el verbo?',
          options: [
            ['borrar', 'Borrarlo'],
            ['cancelar', 'Cancelar una cita'],
            ['enviar', 'Enviarlo'],
          ],
          answer: 'borrar',
          evidence: 'L\'ho scritto in dieci minuti e l\'ho letto venti volte. Poi l\'ho cancellato.',
          correct: 'Eso es. Lo escribe, lo lee y lo borra: es la secuencia del texto.',
          incorrect: 'No se cancela ninguna cita, y el envío nunca ocurre. Fíjate en qué hace antes y después.',
          strategy: 'Un verbo dentro de una secuencia se entiende por lo que viene antes y después.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué no se abrazaron delante del ascensor?',
          options: [
            ['gradual', 'Porque después de dos años el reencuentro empieza por gestos pequeños, como un café'],
            ['enfado', 'Porque seguían enfadadas y no querían verse'],
            ['prisa', 'Porque llegaban tarde a la cita médica'],
          ],
          answer: 'gradual',
          evidence: 'Non ci siamo abbracciate. Le ho dato un caffè della macchinetta e lei mi ha detto grazie. Poi siamo entrate insieme.',
          correct: 'Sí. El texto pone el abrazo que no hubo junto al café que sí hubo: eso es el reencuentro.',
          incorrect: 'Entraron juntas y no hay prisa en el texto. Fíjate en lo que sí ocurrió entre las dos frases.',
          strategy: 'Cuando un texto dice qué no pasó y a continuación qué sí pasó, compara las dos cosas.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: en el mensaje que escribía le pedía perdón a su hermana.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Nel messaggio non le chiedevo scusa. Le dicevo solo una cosa … Un\'informazione.',
          correct: 'Falso: lo niega expresamente y describe el mensaje como pura información.',
          incorrect: 'El párrafo del mensaje empieza justamente negando eso. Búscalo.',
          strategy: 'Si un párrafo empieza con «non», está descartando la lectura más obvia.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena los hechos.',
          options: [
            ['p1', 'Escribe el mensaje y lo borra, dos veces'],
            ['p2', 'La noche del trece la hermana escribe primero'],
            ['p3', 'Se encuentran ante el ascensor y comparten un café'],
            ['p4', 'La madre dice que han venido las dos'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Il mese scorso ho scritto un messaggio … Il tredici sera mi ha scritto lei … Il giorno dopo l\'ho vista davanti all\'ascensore … Ci ha guardate e ha detto solo questo.',
          correct: 'Correcto: los borradores, el mensaje de ella, el encuentro y la frase de la madre.',
          incorrect: 'Guíate por «Il mese scorso», «Il tredici sera» e «Il giorno dopo».',
          strategy: 'Las marcas de tiempo al principio de párrafo son la escalera del relato.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en italiano sobre un mensaje que escribiste y no enviaste. Usa cuatro pronombres directos y cuatro indirectos.',
        minWords: 60, maxWords: 110,
        hints: ['L\'ho scritto e l\'ho cancellato.', 'Non le chiedevo scusa.', 'Le ho risposto dopo un minuto.', 'Mi ha scritto lei.'],
      },
    },
    // ---------------------------------------------------------------- 4
    {
      slug: 'mi-scusi-signora-nardi',
      title: 'Perdone, señora Nardi',
      genre: 'escena de ventanilla',
      topic: 'el trato de usted en una oficina pública',
      tags: ['italiano a2', 'lectura', 'condizionale presente', 'forma de cortesía'],
      intro: 'La misma ley, el mismo formulario y dos ventanillas. En una la tutean deprisa; en la otra le hablan de usted. Lectura de italiano A2.',
      mission: 'Averigua qué cambió con el «Lei», si la ley era la misma.',
      seoTitle: 'Lectura de italiano A2: perdone, señora Nardi | WeLearn',
      seoDescription: 'Lee una escena en italiano A2 y practica el condizionale presente y la forma de cortesía con Lei. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['condizionale-presente-a2', 'forma-cortesia-a2', 'imperativo'],
      text: `All'anagrafe di Prato c'è uno sportello, il numero quattro, e dietro lo sportello c'è la signora Nardi.

Io sono colombiana e a Prato vivo da tre anni. La prima volta che sono andata all'anagrafe non capivo niente. Un impiegato mi ha detto: devi portare il documento originale, non la copia. Mi ha parlato con il tu, veloce, senza guardarmi.

La seconda volta sono capitata allo sportello quattro. La signora Nardi mi ha detto: buongiorno, mi dica. Poi: mi scusi, Lei ha già la residenza? Io le ho risposto sì. Lei ha detto: allora Lei avrebbe bisogno del modulo B, non del modulo A. Vorrebbe compilarlo qui o preferirebbe portarlo a casa?

Non è cambiata la legge. È cambiato tutto il resto.

Con il Lei io capivo meglio. Non è che il Lei è più facile: capivo meglio perché lei parlava più lentamente e mi guardava mentre parlava. Il Lei in italiano non è solo educazione. È una distanza che ti dà spazio.

Adesso, quando devo andare all'anagrafe, guardo la fila dello sportello quattro. Se è lunga, aspetto. Una volta ho aspettato cinquanta minuti.

Un giorno le ho detto: signora Nardi, Lei mi tratta bene. Lei ha risposto: io tratto tutti così, altrimenti non potrei venire a lavorare la mattina.`,
      objectives: [
        'Formar el condizionale presente: avrebbe, vorrebbe, preferirebbe, potrei.',
        'Usar la forma de cortesía con Lei y su imperativo: mi dica, mi scusi.',
        'Distinguir el trato de la información en una gestión administrativa.',
      ],
      vocabulary: [
        { surface: 'anagrafe', gloss: 'registro civil del ayuntamiento' },
        { surface: 'sportello', gloss: 'ventanilla' },
        { surface: 'impiegato', gloss: 'funcionario, empleado público' },
        { surface: 'modulo', gloss: 'formulario' },
        { surface: 'compilarlo', lemma: 'compilare', gloss: 'rellenarlo' },
        { surface: 'fila', gloss: 'cola de gente' },
        { surface: 'altrimenti', gloss: 'si no, de lo contrario' },
        { surface: 'educazione', gloss: 'buenos modales, cortesía' },
      ],
      culturalNote: 'Prato tiene una de las comunidades extranjeras más grandes de Italia en proporción a su población, y su anagrafe atiende cada día a gente que se juega la residencia en una ventanilla.',
      spanishSpeakerNote: 'El «Lei» italiano es el usted, y se conjuga en tercera persona: «Lei ha», «Lei avrebbe». Su imperativo es distinto del de tú: «mi dica» y «mi scusi», no «dimmi» y «scusa».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué defiende el texto?',
          options: [
            ['trato', 'Que el trato de usted, con calma y mirando a la cara, le hizo entender lo mismo mejor'],
            ['ley', 'Que la ley de residencia cambió y ahora es más fácil'],
            ['idioma', 'Que su italiano mejoró en tres años'],
          ],
          answer: 'trato',
          evidence: 'Non è cambiata la legge. È cambiato tutto il resto … capivo meglio perché lei parlava più lentamente e mi guardava mentre parlava.',
          correct: 'Sí, y el texto lo dice con dos frases cortas y seguidas.',
          incorrect: 'El texto dice expresamente que la ley no cambió. Busca las dos frases que empiezan por «Non è cambiata».',
          strategy: 'Dos frases cortas y contrapuestas suelen ser la tesis de un texto.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué formulario necesitaba en realidad?',
          options: [
            ['b', 'El módulo B, no el A'],
            ['a', 'El módulo A'],
            ['copia', 'Una copia del documento original'],
          ],
          answer: 'b',
          evidence: 'allora Lei avrebbe bisogno del modulo B, non del modulo A',
          correct: 'Correcto, y la señora Nardi lo dice después de preguntar si ya tiene la residencia.',
          incorrect: 'La copia es lo que le dijo el primer funcionario sobre el documento. Busca la frase con «modulo».',
          strategy: 'La fórmula «X, non Y» te da la respuesta y el error más probable en la misma frase.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: '¿Qué es «lo sportello» en este texto?',
          options: [
            ['ventanilla', 'La ventanilla de atención al público'],
            ['puerta', 'La puerta de entrada del edificio'],
            ['deporte', 'Un centro deportivo'],
          ],
          answer: 'ventanilla',
          evidence: 'c\'è uno sportello, il numero quattro, e dietro lo sportello c\'è la signora Nardi',
          correct: 'Eso es. Tiene número y detrás hay una persona que atiende.',
          incorrect: 'Tiene número, y detrás hay una funcionaria: no es una puerta ni tiene que ver con el deporte.',
          strategy: 'Si algo tiene número y alguien detrás, es un puesto de atención al público.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Qué quiere decir la señora Nardi con su última frase?',
          options: [
            ['sostener', 'Que tratar bien a todos es lo que le permite aguantar su propio trabajo'],
            ['norma', 'Que hay una norma interna que le obliga a hablar de usted'],
            ['favor', 'Que le hace un favor especial porque es extranjera'],
          ],
          answer: 'sostener',
          evidence: 'io tratto tutti così, altrimenti non potrei venire a lavorare la mattina',
          correct: 'Sí, y empieza descartando lo del favor: trata igual a todo el mundo.',
          incorrect: 'Dice «tratto tutti così», así que no es un favor, y no menciona ninguna norma. Fíjate en el «altrimenti».',
          strategy: 'La palabra «altrimenti» (si no) introduce la consecuencia que explica la frase entera.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: la narradora llega a esperar cincuenta minutos para que la atienda esa ventanilla.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Se è lunga, aspetto. Una volta ho aspettato cinquanta minuti.',
          correct: 'Verdadero, y esa espera voluntaria es la prueba de todo lo que dice el texto.',
          incorrect: 'Busca el párrafo que empieza por «Adesso»: dice qué hace cuando la cola es larga.',
          strategy: 'Un dato numérico suelto al final de un párrafo suele ser la prueba de lo que se acaba de afirmar.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la escena.',
          options: [
            ['p1', 'La primera vez: la tutean deprisa y no entiende nada'],
            ['p2', 'La segunda vez: le hablan de usted y le ofrecen dos opciones'],
            ['p3', 'La reflexión: la ley no cambió, cambió el resto'],
            ['p4', 'Ahora espera lo que haga falta por esa ventanilla'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'La prima volta che sono andata all\'anagrafe non capivo niente … La seconda volta sono capitata allo sportello quattro … Non è cambiata la legge … Adesso, quando devo andare all\'anagrafe…',
          correct: 'Correcto: primera vez, segunda vez, conclusión y presente.',
          incorrect: 'Guíate por «La prima volta», «La seconda volta» y «Adesso».',
          strategy: 'Los ordinales («la prima», «la seconda») ordenan el texto sin más.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en italiano sobre una gestión administrativa que hiciste. Usa cuatro verbos en condizionale y trata de usted a quien te atiende.',
        minWords: 60, maxWords: 110,
        hints: ['Buongiorno, mi dica.', 'Lei avrebbe bisogno del modulo…', 'Vorrei compilarlo qui.', 'Mi scusi, Lei ha già…?'],
      },
    },
    // ---------------------------------------------------------------- 5
    {
      slug: 'la-scuola-con-sei-bambini',
      title: 'La escuela de seis niños',
      genre: 'reportaje de pueblo',
      topic: 'una escuela rural que va a cerrar',
      tags: ['italiano a2', 'lectura', 'futuro semplice', 'futuro de probabilidad'],
      intro: 'Seis alumnos en total, dos maestras y un aula. Las otras dos llevan ocho años cerradas. Lectura de italiano A2 sobre el futuro.',
      mission: 'Averigua qué es lo que, según el texto, nadie calcula.',
      seoTitle: 'Lectura de italiano A2: la escuela de seis niños | WeLearn',
      seoDescription: 'Lee un reportaje en italiano A2 y practica el futuro semplice y el futuro de probabilidad. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['futuro-semplice-a2', 'futuro-probabilita-a2', 'verbi-irregolari'],
      text: `La scuola elementare di Roccalta ha sei alunni. Non sei per classe: sei in tutto. Ci sono due maestre e un'aula sola, perché le altre due aule sono chiuse da otto anni.

Il sindaco dice che la scuola resterà aperta. Il provveditorato dice che con sei bambini sarà difficile. Le due frasi non si contraddicono: entrambe sono vere, e per questo il problema non si risolve.

Nel 2040 il bambino più piccolo di Roccalta avrà venticinque anni. Probabilmente non sarà qui. Sarà a Torino o a Bologna, avrà un lavoro e tornerà a Natale. I suoi genitori avranno sessant'anni e diranno che il paese è cambiato.

Questo non è pessimismo, è aritmetica. In dieci anni sono nati nove bambini in tutto il comune.

Però c'è una cosa che nessuno calcola. Le due maestre conoscono i sei alunni uno per uno. Sanno chi legge bene e chi ha paura di leggere ad alta voce. In una classe di venticinque non lo saprebbero.

Una delle maestre mi ha detto una frase che non dimenticherò: questi sei bambini avranno molte difficoltà nella vita, ma non diranno mai che nessuno li ha guardati.

La scuola chiuderà, probabilmente. I sei alunni finiranno le elementari altrove, in un istituto più grande, a venti chilometri. Ma tra vent'anni saranno sei adulti che sanno cosa vuol dire essere visti.`,
      objectives: [
        'Formar el futuro semplice, incluidos los irregulares: sarà, avrà, dirà, resterà.',
        'Reconocer el futuro de probabilidad: «probabilmente non sarà qui».',
        'Separar un dato demográfico de su interpretación.',
      ],
      vocabulary: [
        { surface: 'alunni', lemma: 'alunno', gloss: 'alumnos' },
        { surface: 'sindaco', gloss: 'alcalde' },
        { surface: 'provveditorato', gloss: 'delegación provincial de educación' },
        { surface: 'entrambe', gloss: 'las dos, ambas' },
        { surface: 'voce', gloss: 'voz; «ad alta voce» es en voz alta' },
        { surface: 'altrove', gloss: 'en otro sitio' },
        { surface: 'nati', lemma: 'nascere', gloss: 'nacidos' },
        { surface: 'paese', gloss: 'pueblo (también país; aquí es pueblo)' },
      ],
      culturalNote: 'Italia tiene cientos de «pluriclassi»: aulas rurales donde niños de edades distintas comparten maestra. El Estado las cierra por número de alumnos, y cada cierre se discute entre el alcalde y la delegación de educación.',
      spanishSpeakerNote: 'El futuro italiano sirve también para suponer: «avrà sessant\'anni» puede ser «tendrá sesenta años» en el sentido de «rondará los sesenta». El español hace lo mismo, así que aquí reconoces el uso de entrada.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Cuál es la idea central del reportaje?',
          options: [
            ['visto', 'Que la escuela cerrará por aritmética, pero esos seis niños se saben mirados uno por uno'],
            ['salvar', 'Que el alcalde conseguirá salvar la escuela'],
            ['maestras', 'Que las dos maestras van a jubilarse pronto'],
          ],
          answer: 'visto',
          evidence: 'La scuola chiuderà, probabilmente … Ma tra vent\'anni saranno sei adulti che sanno cosa vuol dire essere visti.',
          correct: 'Sí. El texto no discute el cierre: discute qué queda después.',
          incorrect: 'El texto da el cierre por probable y no habla de jubilaciones. Lee la última frase.',
          strategy: 'Cuando un texto acepta la mala noticia y sigue con un «ma», ahí está su tesis.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuántos niños han nacido en diez años en todo el municipio?',
          options: [
            ['nueve', 'Nueve'],
            ['seis', 'Seis'],
            ['veinticinco', 'Veinticinco'],
          ],
          answer: 'nueve',
          evidence: 'In dieci anni sono nati nove bambini in tutto il comune.',
          correct: 'Correcto, y de ahí sale lo que el texto llama aritmética.',
          incorrect: 'Los seis son los alumnos actuales y los veinticinco, el tamaño de una clase normal. Busca la cifra con «nati».',
          strategy: 'Empareja cada cifra con lo que cuenta: alumnos, nacimientos, edad.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto dice que los padres dirán que «il paese è cambiato». ¿Qué es «il paese» aquí?',
          options: [
            ['pueblo', 'El pueblo, la localidad'],
            ['pais', 'El país, Italia entera'],
            ['paisaje', 'El paisaje de la zona'],
          ],
          answer: 'pueblo',
          evidence: 'I suoi genitori avranno sessant\'anni e diranno che il paese è cambiato.',
          correct: 'Eso es. Todo el texto habla de Roccalta, no de Italia.',
          incorrect: '«Paese» puede ser país, pero aquí el texto habla de una sola localidad y de su escuela.',
          strategy: 'Cuando una palabra tiene dos sentidos, decide por el tamaño de lo que se está contando.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué dice que las dos frases del alcalde y de la delegación «no se contradicen»?',
          options: [
            ['ambas', 'Porque una habla de voluntad y la otra de dificultad: las dos pueden ser verdad a la vez'],
            ['acuerdo', 'Porque los dos quieren cerrar la escuela'],
            ['error', 'Porque uno de los dos se equivoca en las cifras'],
          ],
          answer: 'ambas',
          evidence: 'Il sindaco dice che la scuola resterà aperta. Il provveditorato dice che con sei bambini sarà difficile … entrambe sono vere, e per questo il problema non si risolve.',
          correct: 'Sí, y el texto añade la consecuencia: por eso el problema no se resuelve.',
          incorrect: 'El alcalde quiere mantenerla abierta y nadie discute las cifras. Lee la frase que empieza por «Le due frasi».',
          strategy: 'Si un texto dice que dos afirmaciones opuestas son ciertas, busca en qué plano lo es cada una.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: en la escuela hay dos aulas en uso y una cerrada desde hace ocho años.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Ci sono due maestre e un\'aula sola, perché le altre due aule sono chiuse da otto anni.',
          correct: 'Falso: es al contrario. Un aula en uso y dos cerradas.',
          incorrect: 'Cuenta bien: el texto dice cuántas maestras, cuántas aulas en uso y cuántas cerradas.',
          strategy: 'Cuando una pregunta invierte dos cifras, vuelve a la frase original y cuéntalas.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena cómo avanza el reportaje.',
          options: [
            ['p1', 'Los datos: seis alumnos, dos maestras, un aula'],
            ['p2', 'Las dos posturas: alcalde y delegación'],
            ['p3', 'La proyección al año 2040'],
            ['p4', 'Lo que nadie calcula y la frase de la maestra'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'La scuola elementare di Roccalta ha sei alunni … Il sindaco dice che la scuola resterà aperta … Nel 2040 il bambino più piccolo … Però c\'è una cosa che nessuno calcola.',
          correct: 'Correcto: datos, posturas, proyección y contrapunto.',
          incorrect: 'Fíjate en dónde entra el año 2040 y dónde el «Però».',
          strategy: 'La palabra «però» marca el giro: lo que viene después contradice lo anterior.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en italiano sobre cómo será tu ciudad o tu barrio en 2040. Usa ocho verbos en futuro, dos de ellos con valor de suposición.',
        minWords: 60, maxWords: 110,
        hints: ['Nel 2040 avrò… anni.', 'Probabilmente non sarò qui.', 'La scuola chiuderà.', 'I miei genitori diranno che…'],
      },
    },
    // ---------------------------------------------------------------- 6
    {
      slug: 'il-piu-vecchio-non-e-il-piu-lento',
      title: 'El más viejo no es el más lento',
      genre: 'crónica deportiva',
      topic: 'una carrera popular de diez kilómetros',
      tags: ['italiano a2', 'lectura', 'comparativos', 'adverbios de modo'],
      intro: 'Doscientas cuatro personas, el mayor con setenta y ocho años, y cuarenta y tres corredores más jóvenes llegando detrás de él. Lectura de italiano A2.',
      mission: 'Averigua cuál es el razonamiento con el que Nando dice que ahora corre mejor.',
      seoTitle: 'Lectura de italiano A2: el más viejo no es el más lento | WeLearn',
      seoDescription: 'Lee una crónica en italiano A2 y practica los comparativos y los adverbios de modo. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['comparativi-a2', 'avverbi-frequenza-modo-a2', 'aggettivi-qualificativi'],
      text: `La corsa di Sant'Anna è una gara popolare di dieci chilometri. Non è una gara importante: non c'è la televisione, non ci sono premi in denaro e il percorso passa davanti al supermercato.

Quest'anno hanno corso duecentoquattro persone. Il più giovane aveva quindici anni. Il più vecchio, Nando Terzi, ne aveva settantotto.

Nando non è arrivato ultimo. È arrivato centosessantunesimo. Dietro di lui sono arrivate quarantatré persone, tutte più giovani di lui, alcune molto più giovani.

Ho parlato con lui alla fine. Corre lentamente ma corre regolarmente: quattro volte alla settimana, sempre lo stesso percorso, sempre alla stessa ora. Dice che il segreto non è la velocità, è la costanza. Secondo lui le persone più veloci si allenano male: corrono forte il lunedì e poi non corrono per due settimane.

Gli ho chiesto se il suo tempo è peggiore di dieci anni fa. Ha risposto tranquillamente: è molto peggiore. Ma dieci anni fa arrivavo centoventesimo e c'erano meno persone dietro di me. Quindi, in un certo senso, adesso vado meglio.

Questo ragionamento è discutibile, però mi piace più della matematica.

L'ultimo classificato ha ventinove anni. Ha finito la gara camminando, con la maglietta in mano, e all'arrivo rideva. Nando lo ha aspettato e gli ha dato la mano. Poi ha detto una frase migliore di tutte le mie domande: qui l'unica cosa peggio di arrivare ultimi è non venire.`,
      objectives: [
        'Formar comparativos regulares e irregulares: più giovane, peggiore, migliore, meglio.',
        'Usar adverbios de modo y de frecuencia: lentamente, regolarmente, tranquillamente, sempre.',
        'Evaluar un razonamiento que el propio texto llama discutible.',
      ],
      vocabulary: [
        { surface: 'gara', gloss: 'carrera, competición' },
        { surface: 'percorso', gloss: 'recorrido' },
        { surface: 'denaro', gloss: 'dinero' },
        { surface: 'allenano', lemma: 'allenarsi', gloss: 'entrenan' },
        { surface: 'maglietta', gloss: 'camiseta' },
        { surface: 'classificato', gloss: 'clasificado; «l\'ultimo classificato» es el último de la tabla' },
        { surface: 'rideva', lemma: 'ridere', gloss: 'se reía' },
        { surface: 'dietro', gloss: 'detrás de' },
      ],
      culturalNote: 'Las «corse popolari» italianas son carreras de barrio con inscripción de pocos euros, sin premios en metálico y con clasificación completa: se publica el nombre del último igual que el del primero.',
      spanishSpeakerNote: 'El italiano tiene comparativos irregulares como el español: «peggiore» y «migliore» son adjetivos (peor, mejor), «peggio» y «meglio» son adverbios. «Vado meglio» no es «vado migliore».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué defiende la crónica?',
          options: [
            ['constancia', 'Que la constancia gana a la velocidad, y que lo peor no es llegar último sino no venir'],
            ['record', 'Que Nando batió un récord de su categoría'],
            ['organizacion', 'Que la carrera está mal organizada'],
          ],
          answer: 'constancia',
          evidence: 'Dice che il segreto non è la velocità, è la costanza … l\'unica cosa peggio di arrivare ultimi è non venire.',
          correct: 'Sí, y las dos frases que lo dicen son de Nando, no del narrador.',
          incorrect: 'No hay récord y la organización no se critica. Busca las dos frases que dice Nando.',
          strategy: 'Cuando un texto cita dos veces a la misma persona, esas citas suelen sostener la tesis.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿En qué puesto llegó Nando este año?',
          options: [
            ['161', 'El centosesenta y uno'],
            ['ultimo', 'Último'],
            ['120', 'El ciento veinte'],
          ],
          answer: '161',
          evidence: 'Nando non è arrivato ultimo. È arrivato centosessantunesimo.',
          correct: 'Correcto, y el ciento veinte era su puesto de hace diez años.',
          incorrect: 'El texto niega expresamente que llegara último, y el 120 es de hace diez años.',
          strategy: 'Si el texto niega algo antes de dar el dato, la negación te avisa del error probable.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto dice que las personas más rápidas «si allenano male». ¿Qué significa?',
          options: [
            ['entrenan', 'Entrenan mal'],
            ['alimentan', 'Se alimentan mal'],
            ['pierden', 'Pierden siempre'],
          ],
          answer: 'entrenan',
          evidence: 'le persone più veloci si allenano male: corrono forte il lunedì e poi non corrono per due settimane.',
          correct: 'Eso es, y la frase siguiente explica en qué consiste ese error.',
          incorrect: 'Los dos puntos que siguen explican la palabra: hablan de cómo corren, no de qué comen.',
          strategy: 'Después de dos puntos suele venir la explicación de la palabra que acabas de leer.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿En qué se basa Nando para decir que ahora corre mejor que hace diez años?',
          options: [
            ['detras', 'En que ahora hay más gente por detrás de él, aunque su tiempo sea mucho peor'],
            ['tiempo', 'En que ha mejorado su tiempo en diez kilómetros'],
            ['salud', 'En que tiene mejor salud que antes'],
          ],
          answer: 'detras',
          evidence: 'è molto peggiore. Ma dieci anni fa arrivavo centoventesimo e c\'erano meno persone dietro di me. Quindi, in un certo senso, adesso vado meglio.',
          correct: 'Sí, y él mismo admite primero que su tiempo empeoró mucho.',
          incorrect: 'Dice expresamente que su tiempo es mucho peor, y no habla de salud. Fíjate en la comparación de puestos.',
          strategy: 'Cuando alguien concede algo y luego dice «ma», su argumento está después del «ma».',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: Nando esperó al último clasificado y le dio la mano en la meta.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Nando lo ha aspettato e gli ha dato la mano.',
          correct: 'Verdadero, y justo después dice la frase que cierra la crónica.',
          incorrect: 'Está en el último párrafo, después de describir al último clasificado.',
          strategy: 'Los gestos importantes suelen ir en frases cortas justo antes de una cita final.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la crónica.',
          options: [
            ['p1', 'Qué tipo de carrera es y qué no tiene'],
            ['p2', 'Las edades: el más joven y el más viejo'],
            ['p3', 'La conversación con Nando sobre la constancia'],
            ['p4', 'El último clasificado y la frase final'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'La corsa di Sant\'Anna è una gara popolare … Il più giovane aveva quindici anni … Ho parlato con lui alla fine … L\'ultimo classificato ha ventinove anni.',
          correct: 'Correcto: contexto, datos, entrevista y cierre.',
          incorrect: 'Fíjate en cuándo entra la conversación y cuándo aparece el último clasificado.',
          strategy: 'Una crónica deportiva suele reservar el momento humano para el final.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en italiano comparando cómo hacías algo antes y cómo lo haces ahora. Usa cinco comparativos y cuatro adverbios en -mente.',
        minWords: 60, maxWords: 110,
        hints: ['Corro più lentamente di prima.', 'Il mio tempo è peggiore.', 'Ma adesso vado meglio.', 'Mi alleno regolarmente.'],
      },
    },
    // ---------------------------------------------------------------- 7
    {
      slug: 'mi-sveglio-alle-quattro-e-venti',
      title: 'Me despierto a las cuatro y veinte',
      genre: 'diario de oficio',
      topic: 'limpiar trenes antes del primer servicio',
      tags: ['italiano a2', 'lectura', 'verbos reflexivos', 'stare per'],
      intro: 'Once años despertándose dos minutos antes del despertador, sin despertador. Veinte minutos por vagón y un violín en el asiento. Lectura de italiano A2.',
      mission: 'Averigua qué distingue aburrirse de preocuparse, según ella.',
      seoTitle: 'Lectura de italiano A2: me despierto a las cuatro y veinte | WeLearn',
      seoDescription: 'Lee un diario de oficio en italiano A2 y practica los verbos reflexivos y stare per + infinitivo. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['verbi-riflessivi-a2', 'stare-per-a2', 'presente-verbi-ere-ire'],
      text: `Mi sveglio alle quattro e venti, sette giorni su sette, da undici anni. Non uso la sveglia del telefono: mi sveglio da sola, due minuti prima. Il corpo si abitua a tutto.

Lavoro alla pulizia dei treni regionali. Il mio turno comincia alle cinque e mezza e finisce alle undici. Quando arrivo, il primo treno sta per partire e l'ultimo della notte è appena arrivato. Devo pulire quello che sta fermo. Ho venti minuti: alle sei e dodici quel treno riparte.

Mi metto i guanti, mi lego i capelli e comincio dal fondo. Trovo di tutto: giornali, bottiglie, una volta un violino. Il violino l'ho portato all'ufficio oggetti smarriti e dopo tre giorni un ragazzo si è presentato a ritirarlo. Non si è arrabbiato con nessuno, ma piangeva.

I passeggeri non ci vedono: noi finiamo e poi loro salgono.

Mia figlia mi chiede sempre se mi annoio. Non mi annoio. Mi preoccupo, che è diverso. Quando un treno sta per partire e io non ho finito, il cuore va veloce.

Alle undici torno a casa e mi addormento sul divano per un'ora. Poi mi alzo e comincia l'altra giornata, quella normale.

Undici anni così. Non mi lamento e non mi vanto. È un lavoro: qualcuno lo deve fare, e quel qualcuno si sveglia alle quattro e venti.`,
      objectives: [
        'Conjugar los verbos reflexivos: mi sveglio, mi metto, si abitua, mi addormento.',
        'Usar stare per + infinitivo para lo que está a punto de ocurrir.',
        'Distinguir dos estados parecidos que el texto separa a propósito.',
      ],
      vocabulary: [
        { surface: 'sveglia', gloss: 'despertador' },
        { surface: 'guanti', lemma: 'guanto', gloss: 'guantes' },
        { surface: 'lego', lemma: 'legarsi', gloss: 'me recojo (el pelo)' },
        { surface: 'smarriti', lemma: 'smarrito', gloss: 'perdidos; «oggetti smarriti» es objetos perdidos' },
        { surface: 'ritirarlo', lemma: 'ritirare', gloss: 'recogerlo' },
        { surface: 'arrabbiato', lemma: 'arrabbiarsi', gloss: 'enfadado' },
        { surface: 'annoio', lemma: 'annoiarsi', gloss: 'me aburro' },
        { surface: 'vanto', lemma: 'vantarsi', gloss: 'presumo, me jacto' },
      ],
      culturalNote: 'La limpieza de los trenes regionales italianos se hace en la propia estación, en las ventanas de veinte o treinta minutos entre el último servicio nocturno y el primero de la mañana. El turno empieza antes de que abra la taquilla.',
      spanishSpeakerNote: 'El reflexivo italiano va delante del verbo conjugado y pegado al infinitivo: «mi sveglio» pero «devo svegliarmi». Y «stare per» + infinitivo es «estar a punto de»: «sta per partire».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué transmite el diario?',
          options: [
            ['dignidad', 'Un trabajo invisible contado sin queja y sin orgullo, con sus veinte minutos de tensión real'],
            ['queja', 'Una queja por el horario y el sueldo'],
            ['violin', 'La historia del violín perdido y su dueño'],
          ],
          answer: 'dignidad',
          evidence: 'Non mi lamento e non mi vanto. È un lavoro: qualcuno lo deve fare.',
          correct: 'Sí, y la propia narradora descarta las dos lecturas fáciles en una frase.',
          incorrect: 'El violín es un episodio y no hay queja: el texto la niega expresamente. Lee la última frase.',
          strategy: 'Cuando el narrador dice qué NO está haciendo, te está dando la clave del tono.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuánto tiempo tiene para limpiar el tren parado?',
          options: [
            ['veinte', 'Veinte minutos'],
            ['hora', 'Una hora'],
            ['media', 'Media hora'],
          ],
          answer: 'veinte',
          evidence: 'Devo pulire quello che sta fermo. Ho venti minuti: alle sei e dodici quel treno riparte.',
          correct: 'Correcto, y de ahí viene lo que ella llama preocupación.',
          incorrect: 'La hora es lo que duerme en el sofá al volver. Busca la frase con «Ho venti minuti».',
          strategy: 'Empareja cada duración con su actividad: turno, limpieza, siesta.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'Llevó el violín a «l\'ufficio oggetti smarriti». ¿Qué es?',
          options: [
            ['perdidos', 'La oficina de objetos perdidos'],
            ['reparacion', 'Un taller de reparación de instrumentos'],
            ['aduana', 'La aduana de la estación'],
          ],
          answer: 'perdidos',
          evidence: 'Il violino l\'ho portato all\'ufficio oggetti smarriti e dopo tre giorni un ragazzo si è presentato a ritirarlo.',
          correct: 'Eso es, y el dueño apareció tres días después a recogerlo.',
          incorrect: 'Alguien va a recogerlo tres días después: es donde se guarda lo que aparece, no donde se arregla.',
          strategy: 'Si alguien va a recuperar el objeto a ese sitio, es un depósito, no un taller.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué distingue aburrirse de preocuparse?',
          options: [
            ['tension', 'Porque su trabajo no es monótono: tiene un límite de tiempo real que puede no cumplir'],
            ['salud', 'Porque el aburrimiento no afecta a la salud y la preocupación sí'],
            ['hija', 'Porque quiere tranquilizar a su hija'],
          ],
          answer: 'tension',
          evidence: 'Non mi annoio. Mi preoccupo, che è diverso. Quando un treno sta per partire e io non ho finito, il cuore va veloce.',
          correct: 'Sí, y la frase siguiente da el ejemplo exacto: el tren que sale sin que ella haya acabado.',
          incorrect: 'No habla de salud ni intenta tranquilizar a nadie. Lee la frase que viene después.',
          strategy: 'Cuando alguien corrige una palabra por otra, la razón está en el ejemplo que da a continuación.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: usa el despertador del teléfono para levantarse a las cuatro y veinte.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Non uso la sveglia del telefono: mi sveglio da sola, due minuti prima.',
          correct: 'Falso: se despierta sola, y hasta dos minutos antes.',
          incorrect: 'La respuesta está en la segunda frase del texto, justo después de la hora.',
          strategy: 'Si una pregunta menciona un objeto concreto, búscalo en el texto: suele aparecer una sola vez.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la jornada que describe.',
          options: [
            ['p1', 'Se despierta sola a las cuatro y veinte'],
            ['p2', 'Llega y limpia el tren parado en veinte minutos'],
            ['p3', 'Los pasajeros suben cuando ellas ya han terminado'],
            ['p4', 'A las once vuelve a casa y duerme una hora'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Mi sveglio alle quattro e venti … Devo pulire quello che sta fermo. Ho venti minuti … I passeggeri non ci vedono: noi finiamo e poi loro salgono … Alle undici torno a casa.',
          correct: 'Correcto: el texto sigue el reloj de principio a fin.',
          incorrect: 'Guíate por las horas: cuatro y veinte, cinco y media, seis y doce, once.',
          strategy: 'Un diario de oficio suele estar ordenado por el reloj: sigue las horas.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en italiano sobre tu primera hora del día. Usa seis verbos reflexivos y dos veces stare per + infinitivo.',
        minWords: 60, maxWords: 110,
        hints: ['Mi sveglio alle…', 'Mi metto le scarpe e…', 'Il treno sta per partire.', 'Non mi lamento.'],
      },
    },
    // ---------------------------------------------------------------- 8
    {
      slug: 'a-mia-madre-non-piace-il-mare',
      title: 'A mi madre no le gusta el mar',
      genre: 'retrato',
      topic: 'treinta veranos en una playa que no le gustaba',
      tags: ['italiano a2', 'lectura', 'verbo piacere', 'pronombres relativos'],
      intro: 'Treinta veranos en Rímini, debajo de la sombrilla, vestida y con zapatos, leyendo. Y viniendo todos los años. Lectura de italiano A2.',
      mission: 'Averigua qué respondió cuando por fin le preguntaron por qué venía.',
      seoTitle: 'Lectura de italiano A2: a mi madre no le gusta el mar | WeLearn',
      seoDescription: 'Lee un retrato en italiano A2 y practica el verbo piacere y los pronombres relativos. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['piacere-verbi-simili-a2', 'pronomi-relativi-a2', 'articoli'],
      text: `A mia madre non piace il mare. Lo dice da sempre e nessuno le crede, perché in Italia è una frase che nessuno prende sul serio.

Ogni estate andavamo a Rimini, in un albergo che si chiamava Perla e che non aveva niente di perla. A mio padre piaceva nuotare. A me e a mio fratello piaceva la sabbia. A mia madre non piaceva niente di tutto questo, ma veniva.

Stava sotto l'ombrellone con un libro, vestita, con le scarpe. Le signore che stavano intorno a noi le chiedevano: signora, non fa il bagno? Lei rispondeva: no, grazie, a me interessa il libro.

Una volta le ho chiesto perché andavamo a Rimini tutti gli anni, se a lei il mare non piaceva. Mi ha risposto una cosa che mi è rimasta: a me non piace il mare, ma mi piacete voi contenti.

Adesso ha settantatré anni e noi non andiamo più a Rimini. Andiamo in montagna, in un posto che le piace davvero, dove ci sono i boschi e non c'è la sabbia.

E succede una cosa curiosa: in montagna lei parla molto più che al mare. Le piace camminare, le piacciono i nomi degli alberi, le interessa il tempo che farà domani.

Mio fratello dice che abbiamo perso trent'anni. Io penso di no: quei trent'anni erano un regalo, e i regali non si contano.`,
      objectives: [
        'Conjugar piacere y verbos similares (interessare) con pronombre indirecto.',
        'Concordar el verbo con lo que gusta: mi piace il mare, mi piacciono i nomi.',
        'Encadenar relativos: che, dove, dei quali.',
      ],
      vocabulary: [
        { surface: 'albergo', gloss: 'hotel' },
        { surface: 'sabbia', gloss: 'arena' },
        { surface: 'ombrellone', gloss: 'sombrilla de playa' },
        { surface: 'bagno', gloss: 'baño; «fare il bagno» es bañarse en el mar' },
        { surface: 'rimasta', lemma: 'rimanere', gloss: 'quedada; «mi è rimasta» es se me quedó grabada' },
        { surface: 'boschi', lemma: 'bosco', gloss: 'bosques' },
        { surface: 'alberi', lemma: 'albero', gloss: 'árboles' },
        { surface: 'davvero', gloss: 'de verdad, realmente' },
      ],
      culturalNote: 'Rímini y toda la costa de Romaña se organizan en filas numeradas de sombrillas alquiladas por semanas. Familias enteras vuelven al mismo número durante décadas, y la costumbre pesa más que el gusto.',
      spanishSpeakerNote: 'Piacere funciona como «gustar»: el sujeto es lo que gusta, no la persona. «Mi piacciono i nomi» lleva verbo en plural porque los nombres son varios. Y «mi piacete voi» es literalmente «me gustáis vosotros».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué revela el retrato?',
          options: [
            ['regalo', 'Que iba treinta veranos a un sitio que no le gustaba porque le gustaba verlos contentos'],
            ['engano', 'Que en realidad sí le gustaba el mar y lo escondía'],
            ['montana', 'Que la montaña siempre fue el destino de la familia'],
          ],
          answer: 'regalo',
          evidence: 'a me non piace il mare, ma mi piacete voi contenti.',
          correct: 'Sí, y esa frase es la que el narrador dice que se le quedó grabada.',
          incorrect: 'El texto no insinúa que mintiera, y la montaña llega al final. Busca la respuesta que ella da.',
          strategy: 'Si el narrador anuncia una frase que «se le quedó», esa frase es el centro del texto.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué hacía la madre debajo de la sombrilla?',
          options: [
            ['leia', 'Leía, vestida y con zapatos'],
            ['dormia', 'Dormía la siesta'],
            ['nadaba', 'Se bañaba al final de la tarde'],
          ],
          answer: 'leia',
          evidence: 'Stava sotto l\'ombrellone con un libro, vestita, con le scarpe.',
          correct: 'Correcto, y a las vecinas les contestaba que le interesaba el libro.',
          incorrect: 'No se baña nunca en el texto y no se menciona ninguna siesta. Busca la frase con «ombrellone».',
          strategy: 'Los detalles de una escena suelen ir agrupados en una sola frase descriptiva.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'Las señoras le preguntan «non fa il bagno?». ¿Qué significa?',
          options: [
            ['banarse', '¿No se baña en el mar?'],
            ['ducharse', '¿No se ducha antes de comer?'],
            ['bano', '¿No va al cuarto de baño?'],
          ],
          answer: 'banarse',
          evidence: 'signora, non fa il bagno? Lei rispondeva: no, grazie, a me interessa il libro.',
          correct: 'Eso es. En la playa, «fare il bagno» es meterse en el agua.',
          incorrect: 'La pregunta se hace en la playa, entre sombrillas, y ella contesta que prefiere el libro.',
          strategy: 'Una expresión fija se interpreta por el sitio donde se dice: aquí, la playa.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué el narrador no está de acuerdo con su hermano?',
          options: [
            ['regalo', 'Porque para él esos treinta veranos fueron un regalo de ella, no un tiempo perdido'],
            ['montana', 'Porque cree que la montaña tampoco le gusta a su madre'],
            ['culpa', 'Porque piensa que la culpa fue del padre'],
          ],
          answer: 'regalo',
          evidence: 'Mio fratello dice che abbiamo perso trent\'anni. Io penso di no: quei trent\'anni erano un regalo, e i regali non si contano.',
          correct: 'Sí, y añade el argumento: los regalos no se cuentan.',
          incorrect: 'El texto dice que la montaña le gusta de verdad, y nadie culpa al padre. Lee la última frase entera.',
          strategy: 'Cuando un texto enfrenta dos opiniones familiares, la última suele traer su propio argumento.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: en la montaña la madre habla mucho más que en la playa.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'in montagna lei parla molto più che al mare. Le piace camminare, le piacciono i nomi degli alberi.',
          correct: 'Verdadero, y el texto lo llama «una cosa curiosa».',
          incorrect: 'Busca el párrafo que empieza por «E succede una cosa curiosa».',
          strategy: 'Cuando el texto anuncia algo curioso, lo que sigue es un dato comprobable.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena el retrato.',
          options: [
            ['p1', 'Dice que no le gusta el mar y nadie la cree'],
            ['p2', 'Los veranos en el hotel Perla, bajo la sombrilla'],
            ['p3', 'La pregunta y su respuesta sobre por qué venía'],
            ['p4', 'Ahora van a la montaña y ella habla más'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'A mia madre non piace il mare … Ogni estate andavamo a Rimini, in un albergo che si chiamava Perla … Una volta le ho chiesto perché … Adesso ha settantatré anni.',
          correct: 'Correcto: afirmación, recuerdo, explicación y presente.',
          incorrect: 'Guíate por «Ogni estate», «Una volta» y «Adesso».',
          strategy: 'Un retrato suele terminar en el presente: busca la palabra que marca ese salto.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en italiano sobre algo que hace tu familia y que a alguien no le gusta. Usa piacere seis veces, en singular y en plural, y tres relativos.',
        minWords: 60, maxWords: 110,
        hints: ['A mia madre non piace…', 'A me piaceva la sabbia.', 'Le piacciono i nomi degli alberi.', 'un posto che le piace davvero'],
      },
    },
    // ---------------------------------------------------------------- 9
    {
      slug: 'se-piove-non-si-gioca',
      title: 'Si llueve, no se juega',
      genre: 'reglamento comentado',
      topic: 'las cuatro reglas de un torneo de barrio',
      tags: ['italiano a2', 'lectura', 'periodo ipotetico reale', 'ci vuole / ci vogliono'],
      intro: 'Un reglamento de una página escrito a mano en 1998 y nunca cambiado. La cuarta regla existe por una rodilla de 1997. Lectura de italiano A2.',
      mission: 'Averigua por qué la cuarta regla exige un familiar y no un entrenador.',
      seoTitle: 'Lectura de italiano A2: si llueve, no se juega | WeLearn',
      seoDescription: 'Lee un reglamento comentado en italiano A2 y practica el periodo ipotetico reale y ci vuole / ci vogliono. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['periodo-ipotetico-reale-a2', 'ci-vuole-vogliono-a2', 'negazione'],
      text: `Il torneo di calcio del quartiere ha un regolamento di una pagina, scritto a mano nel 1998 e mai cambiato.

Regola uno: se piove, non si gioca. Non c'è discussione. Se piove poco, decide l'arbitro; se piove molto, si rimanda.

Regola due: per iscrivere una squadra ci vogliono otto giocatori e venti euro. Non ci vuole il certificato medico, e questo è illegale, ma nessuno lo dice ad alta voce.

Regola tre: se una squadra arriva con meno di sei giocatori, perde a tavolino. Se arriva con sette, si gioca in sette contro sette.

Regola quattro, la più importante: se un giocatore ha meno di sedici anni, gioca solo se c'è un adulto della sua famiglia sul campo. Non un allenatore: un familiare.

Ho chiesto a Peppe, che organizza il torneo da ventisei anni, perché esiste questa regola. Mi ha spiegato che nel 1997 un ragazzo si è fatto male al ginocchio e nessuno della sua famiglia era lì per decidere. L'ambulanza è arrivata e ha chiesto una firma. Non c'era nessuno che poteva firmare.

Poi ha aggiunto: ci vuole poco per organizzare un torneo. Ci vuole molto per non avere problemi.

Quest'anno si sono iscritte quattordici squadre. Nove partite sono state rimandate per pioggia, perché a maggio qui piove sempre. Il regolamento non cambia: se piove, non si gioca. E se non si gioca, si gioca la settimana dopo.`,
      objectives: [
        'Construir el periodo hipotético real: se + presente, presente.',
        'Distinguir ci vuole de ci vogliono según el número.',
        'Leer un reglamento y encontrar la historia que hay detrás de una regla.',
      ],
      vocabulary: [
        { surface: 'regolamento', gloss: 'reglamento' },
        { surface: 'iscrivere', gloss: 'inscribir, apuntar' },
        { surface: 'tavolino', gloss: 'mesita; «perdere a tavolino» es perder por incomparecencia' },
        { surface: 'allenatore', gloss: 'entrenador' },
        { surface: 'ginocchio', gloss: 'rodilla' },
        { surface: 'rimandate', lemma: 'rimandare', gloss: 'aplazadas' },
        { surface: 'squadre', lemma: 'squadra', gloss: 'equipos' },
        { surface: 'familiare', gloss: 'pariente, miembro de la familia' },
      ],
      culturalNote: 'Los torneos de barrio italianos funcionan al margen de la federación, y el certificado médico deportivo, obligatorio por ley, es justo el papel que casi nadie presenta. Se sabe y se calla.',
      spanishSpeakerNote: '«Ci vuole» y «ci vogliono» son «hace falta» y «hacen falta»: el verbo concuerda con lo que se necesita, no con quien lo necesita. «Ci vogliono otto giocatori», «ci vuole il certificato».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué muestra el texto?',
          options: [
            ['origen', 'Que cada regla del torneo tiene detrás un problema que ya ocurrió'],
            ['ilegal', 'Que el torneo debería suspenderse por ser ilegal'],
            ['lluvia', 'Que en mayo llueve demasiado para jugar al fútbol'],
          ],
          answer: 'origen',
          evidence: 'perché esiste questa regola. Mi ha spiegato che nel 1997 un ragazzo si è fatto male al ginocchio … Ci vuole molto per non avere problemi.',
          correct: 'Sí, y la frase de Peppe lo resume: organizar es fácil, evitar problemas no.',
          incorrect: 'El texto menciona la ilegalidad de pasada y la lluvia es un dato. Busca de dónde viene la regla cuatro.',
          strategy: 'Cuando alguien pregunta por qué existe una norma, la respuesta es la tesis del texto.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué hace falta para inscribir un equipo?',
          options: [
            ['ocho', 'Ocho jugadores y veinte euros'],
            ['seis', 'Seis jugadores y el certificado médico'],
            ['catorce', 'Catorce jugadores'],
          ],
          answer: 'ocho',
          evidence: 'per iscrivere una squadra ci vogliono otto giocatori e venti euro. Non ci vuole il certificato medico.',
          correct: 'Correcto, y el certificado médico expresamente no hace falta.',
          incorrect: 'Los seis son el mínimo para no perder por incomparecencia, y catorce son los equipos de este año.',
          strategy: 'Si una cifra aparece varias veces en un texto, comprueba a qué se refiere cada una.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'Un equipo con menos de seis jugadores «perde a tavolino». ¿Qué significa?',
          options: [
            ['incomparecencia', 'Pierde por incomparecencia, sin jugar'],
            ['mesa', 'Pierde en un sorteo hecho sobre una mesa'],
            ['penaltis', 'Pierde en la tanda de penaltis'],
          ],
          answer: 'incomparecencia',
          evidence: 'se una squadra arriva con meno di sei giocatori, perde a tavolino. Se arriva con sette, si gioca in sette contro sette.',
          correct: 'Eso es, y la frase siguiente muestra el caso contrario: con siete sí se juega.',
          incorrect: 'La frase siguiente aclara cuándo sí se juega. Si con seis no, es que el partido no se disputa.',
          strategy: 'Compara la regla con la excepción que viene justo después: la diferencia te da el sentido.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué la regla exige un familiar y no vale un entrenador?',
          options: [
            ['firma', 'Porque en una urgencia médica hace falta alguien de la familia que pueda firmar'],
            ['confianza', 'Porque no confían en los entrenadores del barrio'],
            ['coste', 'Porque contratar entrenadores costaría dinero'],
          ],
          answer: 'firma',
          evidence: 'nessuno della sua famiglia era lì per decidere. L\'ambulanza è arrivata e ha chiesto una firma. Non c\'era nessuno che poteva firmare.',
          correct: 'Sí, y la historia de 1997 lo explica entero: la ambulancia pidió una firma.',
          incorrect: 'No se desconfía de nadie ni se habla de costes. Lee lo que ocurrió en 1997.',
          strategy: 'Cuando una regla parece arbitraria, busca el episodio concreto que la originó.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: el reglamento se ha modificado varias veces desde 1998.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'un regolamento di una pagina, scritto a mano nel 1998 e mai cambiato … Il regolamento non cambia.',
          correct: 'Falso: el texto lo dice al principio y lo repite al final.',
          incorrect: 'Busca la primera frase del texto y la penúltima: dicen lo mismo.',
          strategy: 'Si un dato aparece al principio y al final, el autor lo está subrayando.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena las cuatro reglas según el texto.',
          options: [
            ['p1', 'Si llueve, no se juega'],
            ['p2', 'Hacen falta ocho jugadores y veinte euros'],
            ['p3', 'Con menos de seis, se pierde sin jugar'],
            ['p4', 'Los menores de dieciséis, solo con un familiar en el campo'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Regola uno: se piove, non si gioca … Regola due: per iscrivere una squadra ci vogliono otto giocatori … Regola tre … Regola quattro, la più importante…',
          correct: 'Correcto: el texto las numera él mismo.',
          incorrect: 'El texto numera las reglas de uno a cuatro: sigue esos números.',
          strategy: 'Si el texto numera sus partes, el orden ya está resuelto.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en italiano con las reglas de una actividad que conoces. Usa cinco veces «se + presente» y tres veces ci vuole o ci vogliono.',
        minWords: 60, maxWords: 110,
        hints: ['Se piove, non si gioca.', 'Ci vogliono otto giocatori.', 'Non ci vuole il certificato.', 'Se arriva tardi, non gioca.'],
      },
    },
    // ---------------------------------------------------------------- 10
    {
      slug: 'ero-arrivato-due-ore-prima',
      title: 'Había llegado dos horas antes',
      genre: 'anécdota de trabajo',
      topic: 'una entrevista y un error de cálculo',
      tags: ['italiano a2', 'lectura', 'trapassato prossimo', 'da + presente'],
      intro: 'Había apuntado las nueve. La entrevista era a las once. Se sentó en un bar con la cartera sobre las rodillas. Lectura de italiano A2.',
      mission: 'Averigua quién era el señor de la chaqueta en la mano.',
      seoTitle: 'Lectura de italiano A2: había llegado dos horas antes | WeLearn',
      seoDescription: 'Lee una anécdota en italiano A2 y practica el trapassato prossimo y «da + presente». Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['trapassato-prossimo-a2', 'da-presente-a2', 'preposizioni-semplici'],
      text: `Sono arrivato due ore prima del colloquio di lavoro. Non un quarto d'ora: due ore.

Il motivo è che avevo calcolato male. Avevo guardato l'orario del treno sul sito la settimana prima e avevo scritto le nove sul telefono. Il colloquio era alle undici. Quando sono arrivato in via Boccaccio, il portone era chiuso e le luci spente.

Studio ingegneria da cinque anni e cerco lavoro da otto mesi. Avevo già fatto sei colloqui e non ne avevo passato nessuno. Quel giorno avevo deciso di non sbagliare niente, e ho sbagliato l'ora.

Sono andato in un bar davanti al portone. Ho ordinato un caffè e mi sono seduto con la cartella sulle gambe, come un bambino il primo giorno di scuola.

Alle nove e quaranta è entrato un signore con la giacca in mano. Ha ordinato un caffè, mi ha guardato e mi ha chiesto: colloquio da Ferrari e Associati? Ho detto sì. Lui ha detto: anch'io. Ma io lavoro là da dodici anni, e oggi tocca a me fare le domande.

Abbiamo parlato un'ora e dieci minuti di tutto tranne che di lavoro: di treni, di ingegneria, di suo figlio che studia a Bologna.

Alle undici siamo entrati insieme. Il colloquio ufficiale è durato dodici minuti.

Lavoro in quello studio da tre anni. Il mio capo racconta ancora oggi che mi ha assunto in un bar, e che io ero già arrivato prima di arrivare.`,
      objectives: [
        'Formar el trapassato prossimo para lo anterior a otro pasado: avevo calcolato, ero arrivato.',
        'Usar «da + presente» para lo que sigue durando: studio da cinque anni.',
        'Distinguir la entrevista oficial de la que decidió de verdad.',
      ],
      vocabulary: [
        { surface: 'colloquio', gloss: 'entrevista de trabajo. ¡No es un «coloquio»!' },
        { surface: 'spente', lemma: 'spento', gloss: 'apagadas' },
        { surface: 'cartella', gloss: 'cartera, carpeta de documentos' },
        { surface: 'giacca', gloss: 'chaqueta' },
        { surface: 'tocca', lemma: 'toccare', gloss: 'corresponde; «tocca a me» es me toca a mí' },
        { surface: 'tranne', gloss: 'excepto, salvo' },
        { surface: 'assunto', lemma: 'assumere', gloss: 'contratado' },
        { surface: 'gambe', lemma: 'gamba', gloss: 'piernas' },
      ],
      culturalNote: 'En Italia el «colloquio di lavoro» de un estudio de ingeniería suele ser corto y muy formal. Lo que decide, según muchos entrevistadores, es la conversación de antes o la de después.',
      spanishSpeakerNote: 'Dos cosas: «colloquio» es una entrevista de trabajo, no un coloquio; y «da + presente» expresa lo que sigue durando —«studio da cinque anni» es «estudio desde hace cinco años», nunca «he estudiado».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué cuenta la anécdota?',
          options: [
            ['antes', 'Que el error de dos horas le dio la conversación que le consiguió el trabajo'],
            ['puntual', 'Que conviene llegar siempre dos horas antes a una entrevista'],
            ['suerte', 'Que consiguió el puesto porque nadie más se presentó'],
          ],
          answer: 'antes',
          evidence: 'Abbiamo parlato un\'ora e dieci minuti di tutto tranne che di lavoro … mi ha assunto in un bar.',
          correct: 'Sí, y su jefe lo cuenta así todavía hoy.',
          incorrect: 'El texto no da consejos ni menciona otros candidatos. Fíjate en qué dice su jefe.',
          strategy: 'Si un personaje resume la historia al final, ese resumen es la idea del texto.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuánto duró la entrevista oficial?',
          options: [
            ['doce', 'Doce minutos'],
            ['hora', 'Una hora y diez minutos'],
            ['dos', 'Dos horas'],
          ],
          answer: 'doce',
          evidence: 'Alle undici siamo entrati insieme. Il colloquio ufficiale è durato dodici minuti.',
          correct: 'Correcto, y la conversación del bar duró seis veces más.',
          incorrect: 'La hora y diez es la charla del bar, y las dos horas son su adelanto. Busca «colloquio ufficiale».',
          strategy: 'Cuando un texto contrapone dos duraciones, la palabra «ufficiale» te dice cuál es cuál.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: '¿Qué es un «colloquio di lavoro»?',
          options: [
            ['entrevista', 'Una entrevista de trabajo'],
            ['coloquio', 'Una charla académica'],
            ['contrato', 'La firma de un contrato'],
          ],
          answer: 'entrevista',
          evidence: 'Sono arrivato due ore prima del colloquio di lavoro … oggi tocca a me fare le domande.',
          correct: 'Eso es, y el señor del bar confirma que él es quien va a preguntar.',
          incorrect: 'Se parece a «coloquio», pero aquí alguien hace preguntas para contratar. No es académico ni es una firma.',
          strategy: 'Si alguien dice «hoy me toca hacer las preguntas», estás ante una entrevista.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Qué quiere decir el jefe con «era già arrivato prima di arrivare»?',
          options: [
            ['ganado', 'Que la entrevista ya estaba ganada antes de empezar la oficial'],
            ['puntual', 'Que fue el candidato más puntual de todos'],
            ['tren', 'Que su tren llegó antes de lo previsto'],
          ],
          answer: 'ganado',
          evidence: 'mi ha assunto in un bar, e che io ero già arrivato prima di arrivare',
          correct: 'Sí, y va unido a la primera mitad de la frase: lo contrató en un bar.',
          incorrect: 'No compara candidatos ni habla del tren en esa frase. Lee la frase entera, con las dos mitades.',
          strategy: 'Un juego de palabras al final se entiende mirando con qué va unido en la misma frase.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: antes de este día ya había hecho seis entrevistas sin aprobar ninguna.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Avevo già fatto sei colloqui e non ne avevo passato nessuno.',
          correct: 'Verdadero, y por eso ese día había decidido no equivocarse en nada.',
          incorrect: 'Busca la frase con «Avevo già fatto». Está en el párrafo de los cinco años de carrera.',
          strategy: 'El trapassato («avevo fatto») señala lo que ya había pasado antes del día que se cuenta.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena los hechos.',
          options: [
            ['p1', 'Se equivoca al apuntar la hora y llega a las nueve'],
            ['p2', 'Encuentra el portal cerrado y entra en un bar'],
            ['p3', 'A las 9:40 entra el señor de la chaqueta'],
            ['p4', 'A las once entran juntos y la entrevista dura doce minutos'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'avevo scritto le nove sul telefono … il portone era chiuso e le luci spente … Alle nove e quaranta è entrato un signore … Alle undici siamo entrati insieme.',
          correct: 'Correcto: el error, la espera, el encuentro y la entrevista.',
          incorrect: 'Guíate por las horas: las nueve, las 9:40 y las once.',
          strategy: 'Si el texto da horas exactas, ordénalas y tendrás la secuencia.',
        },
      ],
      production: {
        prompt: 'Escribe 10–12 frases en italiano sobre un error de cálculo tuyo que acabó bien. Usa cuatro verbos en trapassato prossimo y tres veces «da + presente».',
        minWords: 60, maxWords: 110,
        hints: ['Avevo calcolato male.', 'Avevo scritto le nove sul telefono.', 'Studio ingegneria da cinque anni.', 'Lavoro là da tre anni.'],
      },
    },
  ],
}
