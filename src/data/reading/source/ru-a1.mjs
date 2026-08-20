// Lectura — Ruso A1. Diez lecturas.
//
// Fuente de verdad. Los JSON se generan con `node scripts/build-reading-exercises.mjs --write`.
//
// Criterio del nivel
// -----------------
// Las diez cubren los 20 temas de gramática de ruso A1. Banda propia del ruso: 95-125
// palabras, razonada en `scripts/lib/reading-blueprint.mjs` (el ruso no compone palabras
// largas como el alemán: las economiza — sin artículos y sin verbo copulativo en presente).
//
// RESTRICCIÓN FUERTE DEL NIVEL: en ruso A1 no hay pasado. El currículo pone `pasado-verbos`
// en A2, así que estas diez están escritas en PRESENTE, con imperativo y con el futuro de
// «быть» (буду читать) como único desvío. No es una elección de estilo: escribir un relato
// ruso sin pasado obliga a describir en presente, y eso condiciona los diez textos.
//
// Criterio editorial propio del ruso para hispanohablantes, en este orden de importancia:
//   1. El alfabeto engaña. В, Н, Р, С, У, Х parecen latinas y no lo son. Es el obstáculo
//      número uno y es de lectura, no de gramática: se trabaja en la décima.
//   2. No hay artículos y no hay «ser» en presente: «Он врач» es una frase completa. El
//      guion que aparece en «Её телевизор — это не телевизор» ocupa ese hueco.
//   3. El caso hace el trabajo de la preposición española: la terminación dice la función.
//
// PENDIENTE declarado: `stressMarks: false`. Marcar el acento (ударение) sería una mejora
// real para A1 y A2 —en ruso es impredecible y no se escribe—, pero declararlo sin ponerlo
// sería mentir en los metadatos, y ponerlo mal es peor que no ponerlo. Queda como tarea con
// revisión de hablante nativo.

const A1_GRAMMAR = [
  'adjetivos-concordancia', 'adjetivos-posesivos', 'alfabeto-cirilico', 'caso-acusativo',
  'caso-dativo-basico', 'caso-genitivo', 'caso-nominativo', 'futuro-byt',
  'genero-sustantivos', 'imperativo', 'negacion-ne', 'numeros', 'preguntas-vopros',
  'preposiciones-direccion', 'preposiciones-lugar-v-na', 'presente-verbos',
  'pronombres-personales', 'tiempo-expresiones', 'verbos-irregulares-basicos',
  'verbos-movimiento',
]

export default {
  language: 'ru',
  variant: 'ru-RU',
  cefr: 'A1',
  displayLabel: 'Ruso A1',
  tutorLocales: ['es'],
  status: 'published',
  seriesId: 'ruso-a1-lectura-10',
  allowedGrammar: A1_GRAMMAR,
  disallowedGrammar: ['pasado verbal', 'aspecto perfectivo', 'participios', 'gerundios (деепричастия)', 'condicional'],
  maxOutOfLevelVocabularyPercent: 5,
  inferenceBand: 'minimal',
  scriptSupport: { furigana: false, romanization: 'none', stressMarks: false, tokenizationMode: 'space' },
  targetCanDo:
    'Puedes leer un texto corto en ruso sobre la vida cotidiana, reconocer las letras cirílicas que se parecen a las latinas sin serlo, y justificar tu respuesta señalando la frase exacta.',
  assessor: 'Zhanna Korzh — revisión de lengua y pedagogía',
  assessedAt: '2026-08-18T00:00:00-05:00',
  levelNotes: 'Presente de indicativo, imperativo y futuro con быть. Sin pasado, sin aspecto y sin participios. Acento (ударение) sin marcar: pendiente con revisión nativa.',
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
      slug: 'moya-sosedka-vera-ivanovna',
      title: 'Mi vecina Vera Ivánovna',
      genre: 'relato en primera persona',
      topic: 'un televisor que suena todo el día',
      tags: ['ruso a1', 'lectura', 'caso nominativo', 'pronombres personales'],
      intro: 'Un televisor encendido de la mañana a la noche al otro lado de la pared, y lo que resulta ser en realidad. Lectura de ruso A1.',
      mission: 'Averigua por qué el narrador deja de enfadarse.',
      seoTitle: 'Lectura de ruso A1: mi vecina Vera Ivánovna | WeLearn',
      seoDescription: 'Lee un texto corto en ruso A1 y practica el caso nominativo y los pronombres personales. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['caso-nominativo', 'pronombres-personales'],
      text: `Меня зовут Хосе. Я из Колумбии. Я живу в Москве, в старом доме на улице Гиляровского.

Моя соседка — Вера Ивановна. Она русская, она учительница. Сейчас она не работает: она на пенсии.

Вера Ивановна очень громкая. Её телевизор работает весь день. Я слышу всё: новости, музыку, футбол.

Это проблема? Сначала — да. Я плохо сплю.

Но потом я понимаю одну вещь. Она живёт одна. Её телевизор — это не телевизор. Это голос в квартире.

Теперь я не сержусь. Мы иногда пьём чай. Она говорит, я слушаю. Я понимаю половину, но это нормально.

Она говорит: «Ты хороший мальчик». Мне тридцать четыре года. Я не мальчик. Но я не спорю.`,
      objectives: [
        'Reconocer el caso nominativo como forma del sujeto y del atributo.',
        'Identificar los pronombres personales: я, ты, она, мы, её, мне.',
        'Leer una frase rusa sin verbo «ser», con guion en su lugar.',
      ],
      vocabulary: [
        { surface: 'соседка', gloss: 'vecina' },
        { surface: 'учительница', gloss: 'maestra' },
        { surface: 'пенсии', lemma: 'пенсия', gloss: 'jubilación; «на пенсии» es jubilada' },
        { surface: 'громкая', gloss: 'ruidosa, que hace mucho ruido' },
        { surface: 'слышу', lemma: 'слышать', gloss: 'oigo' },
        { surface: 'сплю', lemma: 'спать', gloss: 'duermo' },
        { surface: 'сержусь', lemma: 'сердиться', gloss: 'me enfado' },
        { surface: 'спорю', lemma: 'спорить', gloss: 'discuto' },
      ],
      culturalNote: 'El nombre y el patronímico juntos —Вера Ивановна, «Vera hija de Iván»— es la forma respetuosa de dirigirse a una persona mayor en Rusia. Usar solo el nombre sería demasiado familiar.',
      spanishSpeakerNote: 'El ruso no tiene «ser» en presente. «Она учительница» es «ella (es) maestra», sin verbo. Cuando los dos elementos son sustantivos, se escribe un guion: «Её телевизор — это не телевизор». Ese guion es el verbo que falta.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿De qué trata el texto?',
          options: [
            ['voz', 'De que el ruido del televisor resulta ser la compañía de una mujer que vive sola'],
            ['queja', 'De una queja contra la vecina por el ruido'],
            ['mudanza', 'De que el narrador quiere cambiar de piso'],
          ],
          answer: 'voz',
          evidence: 'Она живёт одна. Её телевизор — это не телевизор. Это голос в квартире.',
          correct: 'Sí, y esas tres frases son el giro del texto.',
          incorrect: 'No hay queja ni mudanza: el narrador deja de enfadarse. Busca las frases sobre el televisor.',
          strategy: 'Cuando un texto dice «X no es X», está a punto de decirte qué es en realidad.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿A qué se dedicaba Vera Ivánovna?',
          options: [
            ['maestra', 'Era maestra y ahora está jubilada'],
            ['medica', 'Es médica y sigue trabajando'],
            ['nunca', 'Nunca ha trabajado'],
          ],
          answer: 'maestra',
          evidence: 'Она русская, она учительница. Сейчас она не работает: она на пенсии.',
          correct: 'Correcto, y el texto lo dice en dos frases seguidas.',
          incorrect: 'El texto dice que ahora no trabaja, pero sí dice cuál es su oficio. Busca la palabra «учительница».',
          strategy: 'Los datos de una persona suelen ir agrupados en la frase donde se la presenta.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto dice «она на пенсии». ¿Qué significa?',
          options: [
            ['jubilada', 'Que está jubilada'],
            ['pension', 'Que vive en una pensión'],
            ['baja', 'Que está de baja médica'],
          ],
          answer: 'jubilada',
          evidence: 'Сейчас она не работает: она на пенсии.',
          correct: 'Eso es, y va justo después de «ahora no trabaja».',
          incorrect: 'La frase anterior dice que ya no trabaja: no es un alojamiento ni una situación temporal.',
          strategy: 'Los dos puntos anuncian una explicación de lo que se acaba de decir.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué el narrador no discute cuando ella le llama «мальчик»?',
          options: [
            ['relacion', 'Porque la relación le importa más que la palabra'],
            ['idioma', 'Porque no entiende lo que significa'],
            ['edad', 'Porque en realidad sí es muy joven'],
          ],
          answer: 'relacion',
          evidence: 'Мне тридцать четыре года. Я не мальчик. Но я не спорю.',
          correct: 'Sí: reconoce que no es cierto y aun así lo deja pasar. Ese «но» lo dice todo.',
          incorrect: 'Tiene treinta y cuatro años y entiende perfectamente la palabra. Fíjate en el «но» final.',
          strategy: 'La conjunción «но» (pero) señala que lo importante viene después.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: el narrador entiende todo lo que le cuenta su vecina cuando toman té.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Она говорит, я слушаю. Я понимаю половину, но это нормально.',
          correct: 'Falso: entiende la mitad, y dice que le parece normal.',
          incorrect: 'Busca la frase donde habla de escuchar. Da una proporción exacta.',
          strategy: 'Si el texto da una fracción («половину»), la respuesta absoluta suele ser falsa.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena lo que ocurre en el texto.',
          options: [
            ['p1', 'Se presenta y dice dónde vive'],
            ['p2', 'Describe el televisor encendido todo el día'],
            ['p3', 'Comprende que ella vive sola'],
            ['p4', 'Ahora toman té y ella le llama «chico»'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Меня зовут Хосе … Её телевизор работает весь день … Она живёт одна … Теперь я не сержусь. Мы иногда пьём чай.',
          correct: 'Correcto: presentación, problema, comprensión y presente.',
          incorrect: 'Guíate por «Сначала», «потом» y «Теперь».',
          strategy: 'Las palabras «сначала», «потом» y «теперь» ordenan el texto: antes, después y ahora.',
        },
      ],
      production: {
        prompt: 'Escribe 6–8 frases en ruso sobre un vecino tuyo. Usa cinco frases sin verbo «ser», con o sin guion.',
        minWords: 25, maxWords: 55,
        hints: ['Меня зовут…', 'Моя соседка — …', 'Она учительница.', 'Теперь я не сержусь.'],
      },
    },
    // ---------------------------------------------------------------- 2
    {
      slug: 'pyat-dverey-pyat-tsvetov',
      title: 'Cinco puertas, cinco colores',
      genre: 'descripción de un lugar',
      topic: 'un piso donde cada puerta tiene una regla',
      tags: ['ruso a1', 'lectura', 'género del sustantivo', 'concordancia del adjetivo'],
      intro: 'Un piso de dos habitaciones en Kazán con cinco puertas de cinco colores, y cada color significa una cosa. Lectura de ruso A1.',
      mission: 'Averigua qué significa la puerta negra.',
      seoTitle: 'Lectura de ruso A1: cinco puertas, cinco colores | WeLearn',
      seoDescription: 'Lee un texto corto en ruso A1 y practica el género del sustantivo y la concordancia del adjetivo. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['genero-sustantivos', 'adjetivos-concordancia'],
      text: `Моя тётя Лариса живёт в Казани. Её квартира маленькая: две комнаты и кухня. Но у неё пять дверей, и каждая дверь — другого цвета.

Красная дверь — это её комната. Красный цвет значит: «Я сплю, не входи».

Синяя дверь — кухня. Синий цвет значит: «Входи, чай горячий».

Зелёная дверь — комната моего брата. Он высокий и очень тихий студент.

Белая дверь — ванная. Белый цвет — это просто белый цвет.

Чёрная дверь — балкон. Там старый велосипед и большая коробка. Тётя говорит, что чёрный цвет — это «потом».

Это странная система, но она работает. Мой брат никогда не входит в красную дверь. И я тоже не вхожу.`,
      objectives: [
        'Reconocer el género del sustantivo por su terminación: дверь, цвет, комната.',
        'Concordar el adjetivo con el sustantivo: красная дверь, красный цвет.',
        'Seguir una descripción organizada por elementos repetidos.',
      ],
      vocabulary: [
        { surface: 'тётя', gloss: 'tía' },
        { surface: 'дверь', gloss: 'puerta' },
        { surface: 'цвет', gloss: 'color' },
        { surface: 'значит', lemma: 'значить', gloss: 'significa' },
        { surface: 'горячий', gloss: 'caliente' },
        { surface: 'тихий', gloss: 'callado, silencioso' },
        { surface: 'коробка', gloss: 'caja' },
        { surface: 'странная', lemma: 'странный', gloss: 'extraña, rara' },
      ],
      culturalNote: 'En los pisos soviéticos de dos habitaciones el balcón cerrado hace de trastero: es donde acaban la bicicleta, las conservas y las cajas que se van a ordenar «luego».',
      spanishSpeakerNote: 'El adjetivo ruso cambia con el género del sustantivo: «красная дверь» pero «красный цвет». Y el género se ve en la terminación: -а suele ser femenino, consonante suele ser masculino, pero «дверь» es femenino aunque acabe en consonante.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué describe el texto?',
          options: [
            ['sistema', 'Un sistema de colores en las puertas que sirve para comunicarse sin hablar'],
            ['reforma', 'Una reforma del piso que salió mal'],
            ['mudanza', 'La mudanza de la tía a Kazán'],
          ],
          answer: 'sistema',
          evidence: 'каждая дверь — другого цвета … Это странная система, но она работает.',
          correct: 'Sí, y el texto lo llama precisamente así: un sistema raro que funciona.',
          incorrect: 'No hay reforma ni mudanza. Busca la frase que usa la palabra «система».',
          strategy: 'Si el texto pone nombre a lo que describe, ese nombre es la respuesta.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué significa la puerta azul?',
          options: [
            ['entra', 'Entra, el té está caliente'],
            ['duermo', 'Estoy durmiendo, no entres'],
            ['luego', 'Luego'],
          ],
          answer: 'entra',
          evidence: 'Синяя дверь — кухня. Синий цвет значит: «Входи, чай горячий».',
          correct: 'Correcto: es la cocina y es la única puerta que invita.',
          incorrect: 'Lo de dormir es la roja y «luego» es la negra. Busca la frase con «Синий цвет».',
          strategy: 'Empareja cada color con su significado antes de contestar.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto dice que su hermano es «тихий». ¿Qué significa?',
          options: [
            ['callado', 'Callado, silencioso'],
            ['tacano', 'Tacaño'],
            ['timido', 'Enfermo'],
          ],
          answer: 'callado',
          evidence: 'Он высокий и очень тихий студент.',
          correct: 'Eso es, y va junto a «высокий», alto: son dos rasgos suyos.',
          incorrect: 'Va en una lista de rasgos con «alto». No tiene que ver con dinero ni con salud.',
          strategy: 'Si dos adjetivos van juntos describiendo a alguien, son del mismo tipo.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Qué quiere decir que el color negro significa «потом»?',
          options: [
            ['pendiente', 'Que ahí está lo que se va a ordenar algún día y nunca se ordena'],
            ['noche', 'Que solo se abre por la noche'],
            ['prohibido', 'Que está prohibido entrar'],
          ],
          answer: 'pendiente',
          evidence: 'Чёрная дверь — балкон. Там старый велосипед и большая коробка. Тётя говорит, что чёрный цвет — это «потом».',
          correct: 'Sí, y las dos frases anteriores lo demuestran: una bici vieja y una caja grande.',
          incorrect: 'La prohibición es la puerta roja, y no se habla de horarios. Fíjate en qué hay detrás.',
          strategy: 'Si una palabra va entre comillas, busca en las frases anteriores a qué se refiere.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: el piso de la tía tiene dos habitaciones y una cocina.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Её квартира маленькая: две комнаты и кухня.',
          correct: 'Verdadero, y aun siendo pequeño tiene cinco puertas.',
          incorrect: 'La respuesta está en la segunda frase, justo después de los dos puntos.',
          strategy: 'Después de dos puntos suele venir la lista exacta de lo que hay.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena las puertas según el orden del texto.',
          options: [
            ['p1', 'La roja: su habitación'],
            ['p2', 'La azul: la cocina'],
            ['p3', 'La verde: la habitación del hermano'],
            ['p4', 'La negra: el balcón'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Красная дверь — это её комната … Синяя дверь — кухня … Зелёная дверь — комната моего брата … Чёрная дверь — балкон.',
          correct: 'Correcto. La blanca va entre la verde y la negra.',
          incorrect: 'El texto dedica un párrafo a cada color: sigue ese orden.',
          strategy: 'Cuando cada párrafo empieza igual, el orden de los párrafos es la respuesta.',
        },
      ],
      production: {
        prompt: 'Escribe 6–8 frases en ruso describiendo tu casa por colores u objetos. Usa cinco adjetivos concordados con su sustantivo.',
        minWords: 25, maxWords: 55,
        hints: ['Моя квартира маленькая.', 'Красная дверь — это…', 'Синий цвет значит…', 'Это странная система, но она работает.'],
      },
    },
    // ---------------------------------------------------------------- 3
    {
      slug: 'vosem-chasov-utra',
      title: 'Las ocho de la mañana',
      genre: 'escena doméstica',
      topic: 'una familia de cuatro y un gato',
      tags: ['ruso a1', 'lectura', 'presente de indicativo', 'verbos irregulares'],
      intro: 'Cuatro personas, un piso pequeño y quince minutos en los que todos se van. A las ocho y veinte solo queda el gato. Lectura de ruso A1.',
      mission: 'Averigua por qué el narrador escribe en la cocina.',
      seoTitle: 'Lectura de ruso A1: las ocho de la mañana | WeLearn',
      seoDescription: 'Lee una escena doméstica en ruso A1 y practica el presente y los verbos irregulares frecuentes. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['presente-verbos', 'verbos-irregulares-basicos'],
      text: `Восемь часов утра. Наша семья — это четыре человека и одна маленькая квартира.

Мой отец пьёт кофе и читает новости в телефоне. Он ничего не говорит утром. Это правило.

Моя мать уже едет на работу. Она врач и работает в поликлинике.

Мой брат хочет спать. Он всегда хочет спать. Он не может встать, но он встаёт.

Я пишу это в кухне, потому что в кухне тепло.

В восемь пятнадцать все идут: отец идёт в школу (он учитель), брат идёт в университет, я иду на автобус.

В восемь двадцать в квартире никого нет. Только кот. Кот спит на моей кровати, потому что она тёплая. Кот не работает и не учится. Кот — умный.`,
      objectives: [
        'Conjugar en presente los irregulares frecuentes: пить, ехать, хотеть, мочь, идти, писать.',
        'Distinguir идти de ехать según se vaya a pie o en vehículo.',
        'Leer una escena construida sobre un horario.',
      ],
      vocabulary: [
        { surface: 'правило', gloss: 'regla, norma' },
        { surface: 'поликлинике', lemma: 'поликлиника', gloss: 'centro de salud público' },
        { surface: 'встать', gloss: 'levantarse' },
        { surface: 'тепло', gloss: 'calor; «в кухне тепло» es en la cocina hace calor' },
        { surface: 'учитель', gloss: 'maestro' },
        { surface: 'кровати', lemma: 'кровать', gloss: 'cama' },
        { surface: 'тёплая', lemma: 'тёплый', gloss: 'templada, calentita' },
        { surface: 'умный', gloss: 'listo, inteligente' },
      ],
      culturalNote: 'La поликлиника es el centro de salud público ruso de barrio, donde trabajan los médicos generales y los especialistas de zona. No es un hospital.',
      spanishSpeakerNote: 'El ruso tiene dos verbos para «ir»: идти si vas a pie y ехать si vas en algo con ruedas. «Отец идёт в школу» va andando; «мать едет на работу» va en transporte. El español no distingue.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué muestra la escena?',
          options: [
            ['quince', 'Cómo una familia de cuatro se vacía del piso en quince minutos'],
            ['pelea', 'Una discusión familiar por el cuarto de baño'],
            ['gato', 'Que quieren regalar el gato'],
          ],
          answer: 'quince',
          evidence: 'В восемь пятнадцать все идут … В восемь двадцать в квартире никого нет.',
          correct: 'Sí, y el texto lo mide con el reloj: a las ocho veinte no queda nadie.',
          incorrect: 'No hay discusión y el gato se queda. Fíjate en las dos horas del final.',
          strategy: 'Si un texto da dos horas muy cercanas, lo que pasa entre ellas es el asunto.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuál es el oficio del padre?',
          options: [
            ['maestro', 'Maestro'],
            ['medico', 'Médico'],
            ['estudiante', 'Estudiante'],
          ],
          answer: 'maestro',
          evidence: 'отец идёт в школу (он учитель), брат идёт в университет',
          correct: 'Correcto, y el texto lo aclara entre paréntesis para que no confundas escuela con alumno.',
          incorrect: 'La médica es la madre y el estudiante, el hermano. Busca el paréntesis.',
          strategy: 'Un paréntesis suele estar puesto justamente para evitar el malentendido que temes.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto dice «в кухне тепло». ¿Qué significa?',
          options: [
            ['calor', 'En la cocina hace calor'],
            ['despacio', 'En la cocina se está despacio'],
            ['limpio', 'La cocina está limpia'],
          ],
          answer: 'calor',
          evidence: 'Я пишу это в кухне, потому что в кухне тепло.',
          correct: 'Eso es, y es la razón por la que escribe ahí.',
          incorrect: 'La palabra reaparece al final con la cama: «она тёплая». Es temperatura.',
          strategy: 'Si la misma raíz aparece dos veces en el texto, compara los dos usos.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué el texto acaba diciendo que el gato es «умный»?',
          options: [
            ['broma', 'Porque es el único que se queda en el sitio caliente sin tener que irse'],
            ['listo', 'Porque el gato entiende ruso'],
            ['trabajo', 'Porque el gato ayuda en casa'],
          ],
          answer: 'broma',
          evidence: 'Кот спит на моей кровати, потому что она тёплая. Кот не работает и не учится. Кот — умный.',
          correct: 'Sí: las tres frases van seguidas y el chiste está en el orden.',
          incorrect: 'El gato no hace nada, y eso es justamente la gracia. Lee las tres frases finales juntas.',
          strategy: 'Tres frases cortas seguidas al final de un texto suelen ser un remate: léelas como una sola.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: por la mañana el padre habla mucho con toda la familia.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Он ничего не говорит утром. Это правило.',
          correct: 'Falso: no dice nada por la mañana, y el texto lo llama regla.',
          incorrect: 'Busca la frase con «ничего не говорит». Está en el segundo párrafo.',
          strategy: 'La doble negación rusa («ничего не») es una negación normal, no una afirmación.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la escena.',
          options: [
            ['p1', 'El padre toma café y no habla'],
            ['p2', 'La madre ya va camino del trabajo'],
            ['p3', 'A las ocho y cuarto se van todos'],
            ['p4', 'A las ocho y veinte solo queda el gato'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Мой отец пьёт кофе … Моя мать уже едет на работу … В восемь пятнадцать все идут … В восемь двадцать в квартире никого нет.',
          correct: 'Correcto: el texto sigue el reloj.',
          incorrect: 'Guíate por las horas: ocho, ocho quince, ocho veinte.',
          strategy: 'Si el texto marca horas, esas horas dan el orden sin más.',
        },
      ],
      production: {
        prompt: 'Escribe 6–8 frases en ruso sobre las ocho de la mañana en tu casa. Usa cinco verbos en presente, dos de ellos irregulares, y distingue идти de ехать.',
        minWords: 25, maxWords: 55,
        hints: ['Восемь часов утра.', 'Мой отец пьёт кофе.', 'Моя мать едет на работу.', 'Я иду на автобус.'],
      },
    },
    // ---------------------------------------------------------------- 4
    {
      slug: 'kuryer-timur',
      title: 'Timur, el repartidor',
      genre: 'retrato de oficio',
      topic: 'un repartidor que conoce la ciudad mejor que un taxista',
      tags: ['ruso a1', 'lectura', 'caso acusativo', 'verbos de movimiento'],
      intro: 'Cada día anda, va en metro, corre y vuelve a andar. Y por la tarde hace cuarenta minutos a pie por gusto. Lectura de ruso A1.',
      mission: 'Averigua por qué vuelve andando a casa.',
      seoTitle: 'Lectura de ruso A1: Timur, el repartidor | WeLearn',
      seoDescription: 'Lee un retrato de oficio en ruso A1 y practica el caso acusativo y los verbos de movimiento. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['caso-acusativo', 'verbos-movimiento'],
      text: `Мой друг Тимур работает курьером в Екатеринбурге. Каждый день он идёт, едет, бежит и снова идёт.

Утром он берёт большую сумку и едет на метро в центр. Потом он идёт в первый дом, во второй дом, в третий дом.

Он несёт пиццу, документы, торты. Один раз он несёт кота в коробке.

Люди открывают дверь и смотрят на сумку, не на Тимура. Он говорит, что это нормально.

Он знает город лучше, чем таксист. Он знает, где лифт не работает и где есть злая собака.

Вечером он идёт домой пешком, сорок минут. Я спрашиваю: почему? Он отвечает: потому что вечером я иду туда, куда я хочу.`,
      objectives: [
        'Formar el acusativo del objeto directo: большую сумку, пиццу, кота.',
        'Elegir el verbo de movimiento correcto: идти, ехать, бежать, нести.',
        'Distinguir un dato del oficio de una razón personal.',
      ],
      vocabulary: [
        { surface: 'курьером', lemma: 'курьер', gloss: 'repartidor, mensajero' },
        { surface: 'сумку', lemma: 'сумка', gloss: 'bolsa grande, saca' },
        { surface: 'несёт', lemma: 'нести', gloss: 'lleva (a mano)' },
        { surface: 'торты', lemma: 'торт', gloss: 'tartas' },
        { surface: 'лифт', gloss: 'ascensor' },
        { surface: 'злая', lemma: 'злой', gloss: 'agresiva, de mal genio' },
        { surface: 'пешком', gloss: 'a pie, andando' },
        { surface: 'спрашиваю', lemma: 'спрашивать', gloss: 'pregunto' },
      ],
      culturalNote: 'El reparto a domicilio es enorme en las ciudades rusas y los repartidores acaban conociendo detalles que no están en ningún mapa: qué portal se abre solo, qué ascensor falla, qué patio tiene perro.',
      spanishSpeakerNote: 'El acusativo marca el objeto directo y cambia la terminación: «сумка» pasa a «сумку», «пицца» a «пиццу». En los seres animados masculinos coincide con el genitivo: «кот» pasa a «кота».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué retrata el texto?',
          options: [
            ['eleccion', 'Un oficio de moverse todo el día, y una caminata final que sí elige él'],
            ['sueldo', 'Que los repartidores están mal pagados'],
            ['metro', 'El funcionamiento del metro de Ekaterimburgo'],
          ],
          answer: 'eleccion',
          evidence: 'Вечером он идёт домой пешком, сорок минут … потому что вечером я иду туда, куда я хочу.',
          correct: 'Sí, y la clave está en su respuesta final: por la tarde va donde quiere.',
          incorrect: 'No se habla de sueldos ni del metro como tema. Busca su respuesta a «почему?».',
          strategy: 'Cuando el texto acaba con una pregunta y su respuesta, esa respuesta es la tesis.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Qué llevó una vez dentro de una caja?',
          options: [
            ['gato', 'Un gato'],
            ['tartas', 'Tartas'],
            ['documentos', 'Documentos'],
          ],
          answer: 'gato',
          evidence: 'Он несёт пиццу, документы, торты. Один раз он несёт кота в коробке.',
          correct: 'Correcto, y el texto lo separa del resto con «один раз».',
          incorrect: 'Las tartas y los documentos son lo habitual. Busca la frase con «один раз».',
          strategy: 'La expresión «один раз» (una vez) señala la excepción de una lista.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'Vuelve a casa «пешком». ¿Qué significa?',
          options: [
            ['pie', 'A pie, andando'],
            ['metro', 'En metro'],
            ['taxi', 'En taxi'],
          ],
          answer: 'pie',
          evidence: 'Вечером он идёт домой пешком, сорок минут.',
          correct: 'Eso es, y va con «идёт», el verbo de ir andando, y con cuarenta minutos.',
          incorrect: 'Va con el verbo de andar y con cuarenta minutos: en metro no tardaría eso.',
          strategy: 'Fíjate en el verbo de movimiento que acompaña: «идёт» es a pie, «едет» es en vehículo.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué dice que la gente mira la bolsa y no a él?',
          options: [
            ['invisible', 'Porque en el trabajo lo ven como el reparto, no como una persona'],
            ['ladron', 'Porque desconfían de él'],
            ['pesada', 'Porque la bolsa es muy grande y llama la atención'],
          ],
          answer: 'invisible',
          evidence: 'Люди открывают дверь и смотрят на сумку, не на Тимура. Он говорит, что это нормально.',
          correct: 'Sí, y él mismo lo da por normal, lo que hace la frase más dura.',
          incorrect: 'No se habla de desconfianza, y el tamaño de la bolsa no es el punto. Fíjate en el contraste «на сумку, не на Тимура».',
          strategy: 'La estructura «A, no B» señala una comparación que el texto quiere que notes.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: Timur conoce la ciudad mejor que un taxista.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Он знает город лучше, чем таксист. Он знает, где лифт не работает и где есть злая собака.',
          correct: 'Verdadero, y el texto lo prueba con dos ejemplos concretos.',
          incorrect: 'Busca la frase con «лучше, чем». Va seguida de dos ejemplos.',
          strategy: 'La fórmula «лучше, чем» es una comparación explícita: no hay que deducirla.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena su jornada.',
          options: [
            ['p1', 'Coge la saca y va en metro al centro'],
            ['p2', 'Entra en el primer portal, el segundo, el tercero'],
            ['p3', 'La gente abre y mira la bolsa'],
            ['p4', 'Por la tarde vuelve a casa andando'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Утром он берёт большую сумку и едет на метро … Потом он идёт в первый дом … Люди открывают дверь … Вечером он идёт домой пешком.',
          correct: 'Correcto: mañana, reparto, portales y tarde.',
          incorrect: 'Guíate por «Утром», «Потом» y «Вечером».',
          strategy: 'Las palabras «утром» y «вечером» dividen el día: úsalas como marcas.',
        },
      ],
      production: {
        prompt: 'Escribe 6–8 frases en ruso sobre alguien que se mueve mucho por trabajo. Usa cuatro objetos en acusativo y tres verbos de movimiento distintos.',
        minWords: 25, maxWords: 55,
        hints: ['Он берёт большую сумку.', 'Он едет на метро в центр.', 'Он несёт пиццу и документы.', 'Вечером он идёт домой пешком.'],
      },
    },
    // ---------------------------------------------------------------- 5
    {
      slug: 'v-shkole-no-na-rabote',
      title: 'En la escuela, pero «en» el trabajo',
      genre: 'cuaderno de estudiante',
      topic: 'la lista de qué palabras llevan в y cuáles на',
      tags: ['ruso a1', 'lectura', 'preposiciones в y на', 'dirección'],
      intro: 'El ruso dice «в школе» pero «на работе». Nadie sabe exactamente por qué, así que se hace una lista. Lectura de ruso A1.',
      mission: 'Averigua qué contesta el narrador cuando le preguntan dónde está.',
      seoTitle: 'Lectura de ruso A1: en la escuela, pero «en» el trabajo | WeLearn',
      seoDescription: 'Lee un cuaderno de estudiante en ruso A1 y practica las preposiciones в y на de lugar y de dirección. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['preposiciones-lugar-v-na', 'preposiciones-direccion'],
      text: `Русский язык говорит «в школе», но «на работе». Почему? Я не знаю. Никто точно не знает.

Моя учительница Ольга говорит: «Это надо просто запомнить». Я запоминаю.

Я делаю список. В телефоне.

Я говорю «в»: в школе, в магазине, в банке, в театре, в аптеке, в метро.

Я говорю «на»: на работе, на почте, на улице, на вокзале, на кухне, на уроке.

Есть слова, где я всегда ошибаюсь. «На заводе», не «в заводе». «В университете», не «на университете».

Сегодня Ольга спрашивает: «Где ты сейчас?» Я отвечаю: «Я на уроке, в школе, на втором этаже». Она смеётся и говорит: «Правильно. Три раза правильно».`,
      objectives: [
        'Distinguir в de на con nombres de lugar.',
        'Cambiar de caso según lugar o dirección: в школе frente a в школу.',
        'Aceptar que una regla se aprende de memoria cuando no hay regla.',
      ],
      vocabulary: [
        { surface: 'запомнить', gloss: 'aprender de memoria' },
        { surface: 'список', gloss: 'lista' },
        { surface: 'аптеке', lemma: 'аптека', gloss: 'farmacia' },
        { surface: 'вокзале', lemma: 'вокзал', gloss: 'estación de trenes' },
        { surface: 'заводе', lemma: 'завод', gloss: 'fábrica' },
        { surface: 'ошибаюсь', lemma: 'ошибаться', gloss: 'me equivoco' },
        { surface: 'этаже', lemma: 'этаж', gloss: 'planta, piso de un edificio' },
        { surface: 'смеётся', lemma: 'смеяться', gloss: 'se ríe' },
      ],
      culturalNote: 'El reparto entre в y на no tiene una regla completa ni para los hablantes nativos: hay listas y hay excepciones. Los manuales rusos lo enseñan como vocabulario, no como gramática.',
      spanishSpeakerNote: 'Las dos se traducen por «en», y no hay atajo: «в школе» pero «на работе». Lo que sí es regla es el caso: con lugar va prepositivo («в школе»), con dirección va acusativo («в школу»).',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué cuenta el texto?',
          options: [
            ['lista', 'Que ante una regla que no existe, la solución es una lista de memoria'],
            ['profesora', 'Que su profesora no sabe explicar la gramática'],
            ['facil', 'Que el ruso es más fácil de lo que parece'],
          ],
          answer: 'lista',
          evidence: 'Никто точно не знает … «Это надо просто запомнить». Я запоминаю. Я делаю список.',
          correct: 'Sí, y el texto no lo presenta como derrota: es un método.',
          incorrect: 'La profesora sí explica —dice que hay que memorizarlo— y el texto no dice que sea fácil.',
          strategy: 'Cuando el texto admite que no hay explicación, lo que viene después es la solución práctica.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuál de estas va con «на» según el texto?',
          options: [
            ['pochta', 'на почте (en correos)'],
            ['bank', 'в банке (en el banco)'],
            ['apteka', 'в аптеке (en la farmacia)'],
          ],
          answer: 'pochta',
          evidence: 'Я говорю «на»: на работе, на почте, на улице, на вокзале, на кухне, на уроке.',
          correct: 'Correcto: correos va en la lista de «на».',
          incorrect: 'El banco y la farmacia están en la lista de «в». Compara las dos listas.',
          strategy: 'Cuando el texto da dos listas, localiza la palabra en la lista correcta antes de responder.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El texto dice «Это надо просто запомнить». ¿Qué significa el verbo?',
          options: [
            ['memorizar', 'Aprenderlo de memoria'],
            ['entender', 'Entenderlo con una regla'],
            ['escribir', 'Escribirlo en el cuaderno'],
          ],
          answer: 'memorizar',
          evidence: '«Это надо просто запомнить». Я запоминаю.',
          correct: 'Eso es, y la frase siguiente lo confirma: «я запоминаю».',
          incorrect: 'Viene después de decir que nadie sabe la razón: no es entender, es retener.',
          strategy: 'Si el narrador repite el verbo en primera persona, ya tienes su significado.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué la profesora dice «tres veces bien»?',
          options: [
            ['tres', 'Porque en una sola respuesta acertó las tres preposiciones'],
            ['nota', 'Porque es la tercera vez que aprueba'],
            ['clase', 'Porque lleva tres clases sin faltar'],
          ],
          answer: 'tres',
          evidence: 'Я отвечаю: «Я на уроке, в школе, на втором этаже». Она смеётся и говорит: «Правильно. Три раза правильно».',
          correct: 'Sí: на уроке, в школе, на этаже. Tres aciertos en una frase.',
          incorrect: 'No se habla de notas ni de asistencia. Cuenta las preposiciones de su respuesta.',
          strategy: 'Si un personaje cuenta algo («tres veces»), busca qué hay tres veces en la frase anterior.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: en ruso se dice «в заводе» para decir «en la fábrica».',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: '«На заводе», не «в заводе».',
          correct: 'Falso: es «на заводе», y el texto lo pone justamente como error frecuente.',
          incorrect: 'Busca el párrafo de los errores. La forma correcta va primero y la incorrecta después.',
          strategy: 'En la fórmula «X, не Y», la primera es la correcta y la segunda es el error.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena el cuaderno.',
          options: [
            ['p1', 'Plantea la pregunta: por qué в y por qué на'],
            ['p2', 'La profesora dice que hay que memorizarlo'],
            ['p3', 'Las dos listas, la de в y la de на'],
            ['p4', 'La respuesta con tres preposiciones seguidas'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Русский язык говорит «в школе», но «на работе». Почему? … «Это надо просто запомнить» … Я говорю «в»: … Сегодня Ольга спрашивает: «Где ты сейчас?»',
          correct: 'Correcto: pregunta, consejo, listas y prueba.',
          incorrect: 'Fíjate en dónde aparecen las dos listas y dónde el «Сегодня».',
          strategy: 'La palabra «сегодня» marca la escena final: lo que ocurre hoy va al final.',
        },
      ],
      production: {
        prompt: 'Escribe 6–8 frases en ruso diciendo dónde estás en distintos momentos del día. Usa cuatro veces «в» y cuatro veces «на» con lugares distintos.',
        minWords: 25, maxWords: 55,
        hints: ['Я в школе.', 'Я на работе.', 'Утром я на уроке.', 'Вечером я в магазине.'],
      },
    },
    // ---------------------------------------------------------------- 6
    {
      slug: 'skolko-stoit-khleb',
      title: 'Cuánto cuesta el pan',
      genre: 'retrato familiar',
      topic: 'trece rublos de diferencia y veinte minutos a pie',
      tags: ['ruso a1', 'lectura', 'caso genitivo', 'números'],
      intro: 'Cuatro tiendas en el barrio, cuatro precios del pan y una abuela que anda veinte minutos por trece rublos. Lectura de ruso A1.',
      mission: 'Averigua qué contesta la abuela cuando le preguntan para qué.',
      seoTitle: 'Lectura de ruso A1: cuánto cuesta el pan | WeLearn',
      seoDescription: 'Lee un retrato familiar en ruso A1 y practica el caso genitivo y los números. Con vocabulario glosado y seis preguntas de comprensión.',
      grammarFocus: ['caso-genitivo', 'numeros'],
      text: `В нашем районе четыре магазина. Я знаю цену хлеба во всех четырёх.

В первом магазине хлеб стоит сорок пять рублей. Во втором — тридцать девять. В третьем — пятьдесят два рубля, но там хороший хлеб. В четвёртом после семи вечера хлеба нет.

Моя бабушка ходит в третий магазин. Это далеко: двадцать минут пешком. Я говорю: «Бабушка, зачем? Там разница — тринадцать рублей».

Она отвечает: «Тринадцать рублей — это тринадцать рублей».

У неё нет машины. У неё мало денег. Но у неё есть время и сильные ноги.

Сейчас ей семьдесят восемь лет. Она ходит туда три раза в неделю. Я думаю: у меня нет её характера.`,
      objectives: [
        'Formar el genitivo tras números y tras «нет»: четыре магазина, хлеба нет.',
        'Leer y decir números con la terminación correcta: сорок пять рублей, пятьдесят два рубля.',
        'Distinguir el cálculo económico de la razón de fondo.',
      ],
      vocabulary: [
        { surface: 'районе', lemma: 'район', gloss: 'barrio, distrito' },
        { surface: 'цену', lemma: 'цена', gloss: 'precio' },
        { surface: 'стоит', lemma: 'стоить', gloss: 'cuesta' },
        { surface: 'далеко', gloss: 'lejos' },
        { surface: 'зачем', gloss: 'para qué' },
        { surface: 'разница', gloss: 'diferencia' },
        { surface: 'сильные', lemma: 'сильный', gloss: 'fuertes' },
        { surface: 'характера', lemma: 'характер', gloss: 'carácter' },
      ],
      culturalNote: 'El pan negro de centeno es un producto básico con precio muy vigilado en Rusia, y las diferencias de unos rublos entre tiendas del mismo barrio son habituales y conocidas por los vecinos.',
      spanishSpeakerNote: 'Los números rusos mandan el caso: con 2, 3 y 4 va genitivo singular («пятьдесят два рубля»), con 5 y más va genitivo plural («сорок пять рублей»). Y «нет» siempre pide genitivo: «хлеба нет».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué muestra el texto?',
          options: [
            ['caracter', 'Que la abuela camina veinte minutos por trece rublos, y que el narrador admira eso'],
            ['precio', 'Que el pan es demasiado caro en el barrio'],
            ['tienda', 'Que la cuarta tienda debería cerrar'],
          ],
          answer: 'caracter',
          evidence: 'Я думаю: у меня нет её характера.',
          correct: 'Sí, y la frase final lo dice del modo más corto posible.',
          incorrect: 'El texto no se queja del precio ni habla de cerrar nada. Lee la última frase.',
          strategy: 'Si el narrador se compara consigo mismo al final, ahí está el asunto.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuánto cuesta el pan en la tercera tienda?',
          options: [
            ['52', 'Cincuenta y dos rublos'],
            ['39', 'Treinta y nueve rublos'],
            ['45', 'Cuarenta y cinco rublos'],
          ],
          answer: '52',
          evidence: 'В третьем — пятьдесят два рубля, но там хороший хлеб.',
          correct: 'Correcto: es la más cara y es a la que va la abuela.',
          incorrect: 'Los 45 son la primera tienda y los 39, la segunda. Cuenta el orden.',
          strategy: 'Cuando el texto enumera «в первом, во втором, в третьем», cuenta antes de responder.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El narrador pregunta «зачем?». ¿Qué significa?',
          options: [
            ['paraque', '¿Para qué?'],
            ['cuando', '¿Cuándo?'],
            ['donde', '¿Dónde?'],
          ],
          answer: 'paraque',
          evidence: 'Я говорю: «Бабушка, зачем? Разница — тринадцать рублей».',
          correct: 'Eso es: pregunta por la finalidad, y por eso menciona la diferencia de precio.',
          incorrect: 'No pregunta por tiempo ni por lugar: acompaña la pregunta con una cifra de dinero.',
          strategy: 'Si tras la pregunta viene un argumento, la pregunta era por el motivo o la finalidad.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Qué significa la respuesta «trece rublos son trece rublos»?',
          options: [
            ['valor', 'Que para ella ese dinero tiene valor y no hay más que discutir'],
            ['broma', 'Que no ha entendido la pregunta'],
            ['pan', 'Que el pan de allí no le gusta'],
          ],
          answer: 'valor',
          evidence: 'Она отвечает: «Тринадцать рублей — это тринадцать рублей». У неё нет машины. У неё мало денег.',
          correct: 'Sí, y las dos frases siguientes lo explican: poco dinero, mucho tiempo.',
          incorrect: 'El texto dice que allí el pan es bueno, y ella entiende perfectamente. Lee las dos frases siguientes.',
          strategy: 'Cuando alguien repite la misma cifra dos veces, está diciendo que no la considera pequeña.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: en la cuarta tienda no queda pan después de las siete de la tarde.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'В четвёртом после семи вечера хлеба нет.',
          correct: 'Verdadero, y fíjate en el genitivo que exige «нет»: хлеба, no хлеб.',
          incorrect: 'Busca la frase de la cuarta tienda: es la única que no da precio.',
          strategy: 'La palabra «нет» va siempre con genitivo: localízala y tendrás la frase.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena el texto.',
          options: [
            ['p1', 'Hay cuatro tiendas y él sabe los cuatro precios'],
            ['p2', 'Los precios uno por uno'],
            ['p3', 'La abuela va a la tercera, a veinte minutos'],
            ['p4', 'Lo que ella tiene y lo que él no tiene'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'В нашем районе четыре магазина … В первом магазине хлеб стоит сорок пять рублей … Моя бабушка ходит в третий магазин … у меня нет её характера.',
          correct: 'Correcto: dato, precios, costumbre y conclusión.',
          incorrect: 'Fíjate en dónde aparecen los precios y dónde entra la abuela.',
          strategy: 'Un texto que empieza con una cifra suele desglosarla justo después.',
        },
      ],
      production: {
        prompt: 'Escribe 6–8 frases en ruso comparando precios de algo en tu barrio. Usa cuatro números con su terminación y dos frases con «нет» + genitivo.',
        minWords: 25, maxWords: 55,
        hints: ['В нашем районе четыре магазина.', 'Хлеб стоит сорок пять рублей.', 'У неё нет машины.', 'После семи хлеба нет.'],
      },
    },
    // ---------------------------------------------------------------- 7
    {
      slug: 'komu-dedushka-pishet',
      title: 'A quién escribe el abuelo',
      genre: 'memoria familiar',
      topic: 'un abuelo que escribe postales a gente que vive cerca',
      tags: ['ruso a1', 'lectura', 'caso dativo', 'posesivos'],
      intro: 'Postales, no cartas. Y una de ellas se la entrega en mano a alguien que vive en el mismo piso. Lectura de ruso A1.',
      mission: 'Averigua por qué el narrador no le muestra la última postal a su madre.',
      seoTitle: 'Lectura de ruso A1: a quién escribe el abuelo | WeLearn',
      seoDescription: 'Lee una memoria familiar en ruso A1 y practica el caso dativo y los adjetivos posesivos. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['caso-dativo-basico', 'adjetivos-posesivos'],
      text: `Мой дедушка пишет открытки. Не письма — открытки. Он пишет своей сестре в Омск, моей матери, нашему соседу Павлу и мне.

Он пишет мне каждый месяц. Я живу в той же квартире. Он даёт открытку мне в руки и говорит: «Читай потом».

Его сестре восемьдесят четыре года. Она никогда не отвечает. Дедушка говорит: «Ей трудно писать. Это ничего».

Моей матери он пишет только хорошие новости. Мне он пишет всё.

В последней открытке он пишет: «Тебе двадцать лет. Мне восемьдесят один. Между нами шестьдесят один год и одна квартира. Это много и это мало».

Я не показываю эту открытку матери. Она моя.`,
      objectives: [
        'Formar el dativo del destinatario: сестре, матери, соседу, мне, ей, тебе.',
        'Usar los posesivos: мой, моей, нашему, его, своей.',
        'Reconocer un gesto que el texto no explica.',
      ],
      vocabulary: [
        { surface: 'дедушка', gloss: 'abuelo' },
        { surface: 'открытки', lemma: 'открытка', gloss: 'postales' },
        { surface: 'сестре', lemma: 'сестра', gloss: 'hermana (en dativo)' },
        { surface: 'соседу', lemma: 'сосед', gloss: 'vecino (en dativo)' },
        { surface: 'трудно', gloss: 'cuesta, es difícil' },
        { surface: 'отвечает', lemma: 'отвечать', gloss: 'contesta' },
        { surface: 'последней', lemma: 'последний', gloss: 'última' },
        { surface: 'показываю', lemma: 'показывать', gloss: 'muestro, enseño' },
      ],
      culturalNote: 'La postal escrita a mano sigue siendo un gesto vivo entre los rusos mayores, incluso para destinatarios que viven cerca: se escribe para dejar algo por escrito, no para informar.',
      spanishSpeakerNote: 'El dativo marca a quién va dirigido algo, y en ruso lleva la edad también: «Мне тридцать лет» es literalmente «a mí (hay) treinta años». La misma forma sirve para «Ей трудно писать»: a ella le cuesta escribir.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué cuenta el texto?',
          options: [
            ['nieto', 'Que el abuelo escribe a varias personas y al nieto le escribe todo, no solo lo bueno'],
            ['correo', 'Que el correo ruso funciona mal'],
            ['hermana', 'Que su hermana de Omsk está enferma'],
          ],
          answer: 'nieto',
          evidence: 'Моей матери он пишет только хорошие новости. Мне он пишет всё.',
          correct: 'Sí, y esa diferencia explica el gesto del final.',
          incorrect: 'No se habla del correo ni de una enfermedad. Compara lo que escribe a la madre y al nieto.',
          strategy: 'Cuando dos frases seguidas comparan a dos destinatarios, la diferencia es el asunto.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cada cuánto le escribe el abuelo al narrador?',
          options: [
            ['mes', 'Cada mes'],
            ['semana', 'Cada semana'],
            ['ano', 'Una vez al año'],
          ],
          answer: 'mes',
          evidence: 'Он пишет мне каждый месяц. Я живу в той же квартире.',
          correct: 'Correcto, y la frase siguiente añade lo absurdo: viven en el mismo piso.',
          incorrect: 'Busca la frase con «каждый». Va seguida de un detalle que lo hace todavía más raro.',
          strategy: 'La palabra «каждый» (cada) introduce la frecuencia: búscala directamente.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'El abuelo dice «Ей трудно писать». ¿Qué significa?',
          options: [
            ['cuesta', 'A ella le cuesta escribir'],
            ['noquiere', 'Ella no quiere escribir'],
            ['nosabe', 'Ella no sabe escribir'],
          ],
          answer: 'cuesta',
          evidence: 'Она никогда не отвечает. Дедушка говорит: «Ей трудно писать. Это ничего».',
          correct: 'Eso es. Es una explicación amable, no un reproche: tiene ochenta y cuatro años.',
          incorrect: 'El abuelo la disculpa, no la acusa de no querer ni de no saber. Fíjate en su edad.',
          strategy: 'Si la frase va seguida de «это ничего» (no pasa nada), es una disculpa, no una crítica.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué no le muestra la última postal a su madre?',
          options: [
            ['suya', 'Porque esa postal es para él y dice cosas que el abuelo no le escribe a ella'],
            ['perdida', 'Porque la ha perdido'],
            ['mala', 'Porque contiene una mala noticia'],
          ],
          answer: 'suya',
          evidence: 'Моей матери он пишет только хорошие новости. Мне он пишет всё … Я не показываю эту открытку матери. Она моя.',
          correct: 'Sí, y son dos frases separadas en el texto: hay que cruzarlas.',
          incorrect: 'No la ha perdido y su contenido no es malo: habla de años y de una casa compartida.',
          strategy: 'Para inferir, cruza el final con una frase anterior sobre el mismo personaje.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: la hermana del abuelo contesta a sus postales todos los meses.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: 'Она никогда не отвечает. Дедушка говорит: «Ей трудно писать».',
          correct: 'Falso: no contesta nunca, y el abuelo lo entiende.',
          incorrect: 'Busca la frase con «никогда». Está en el párrafo de la hermana.',
          strategy: 'La palabra «никогда» (nunca) va siempre con «не»: las dos juntas niegan.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena el texto.',
          options: [
            ['p1', 'A quiénes escribe el abuelo'],
            ['p2', 'La postal que entrega en mano cada mes'],
            ['p3', 'La hermana de Omsk, que no contesta'],
            ['p4', 'La última postal y lo que el narrador hace con ella'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Он пишет своей сестре в Омск, моей матери, нашему соседу Павлу и мне … Он пишет мне каждый месяц … Его сестре восемьдесят четыре года … В последней открытке он пишет…',
          correct: 'Correcto: la lista, el nieto, la hermana y la postal final.',
          incorrect: 'Fíjate en dónde aparece la lista de destinatarios y dónde la última postal.',
          strategy: 'Un texto que abre con una lista suele desarrollar después a cada uno de sus miembros.',
        },
      ],
      production: {
        prompt: 'Escribe 6–8 frases en ruso sobre a quién escribes o a quién escribirías. Usa cuatro dativos y cuatro posesivos distintos.',
        minWords: 25, maxWords: 55,
        hints: ['Мой дедушка пишет открытки.', 'Он пишет моей матери и мне.', 'Ей трудно писать.', 'Мне двадцать лет.'],
      },
    },
    // ---------------------------------------------------------------- 8
    {
      slug: 'voditel-kotoryy-ne-sprashivaet',
      title: 'El conductor que no pregunta',
      genre: 'escena de taxi',
      topic: 'un taxista que no hace preguntas',
      tags: ['ruso a1', 'lectura', 'interrogativos', 'negación'],
      intro: 'Todos los taxistas preguntan de dónde eres y si te gusta Rusia. Uno no pregunta nada, nunca. Lectura de ruso A1.',
      mission: 'Averigua qué razón da Serguéi para no preguntar.',
      seoTitle: 'Lectura de ruso A1: el conductor que no pregunta | WeLearn',
      seoDescription: 'Lee una escena en ruso A1 y practica los interrogativos y la negación con не, ничего y никогда. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['preguntas-vopros', 'negacion-ne'],
      text: `Я часто езжу на такси в Нижнем Новгороде. Здесь водители обычно спрашивают всё: откуда я, сколько мне лет, почему я здесь, где моя семья, нравится ли мне Россия.

Но есть один водитель, Сергей. Он не спрашивает ничего. Никогда.

Сначала я думаю: он не любит людей. Это не так.

Он говорит «здравствуйте», он говорит «спасибо», он не слушает радио, потому что я не люблю радио. Он помнит это.

И однажды я спрашиваю его: «Почему вы не задаёте вопросы?»

Он отвечает: «Вы весь день отвечаете на вопросы. В машине можно не отвечать».

И больше я его ни о чём не спрашиваю. Это мой способ сказать спасибо.`,
      objectives: [
        'Reconocer los interrogativos: откуда, сколько, почему, где, ли.',
        'Construir la negación con не, ничего, никогда, ни о чём.',
        'Distinguir el desinterés del respeto.',
      ],
      vocabulary: [
        { surface: 'водители', lemma: 'водитель', gloss: 'conductores' },
        { surface: 'обычно', gloss: 'normalmente' },
        { surface: 'нравится', lemma: 'нравиться', gloss: 'gusta' },
        { surface: 'помнит', lemma: 'помнить', gloss: 'recuerda' },
        { surface: 'однажды', gloss: 'una vez, un día' },
        { surface: 'задаёте', lemma: 'задавать', gloss: 'planteáis; «задавать вопросы» es hacer preguntas' },
        { surface: 'способ', gloss: 'manera, modo de hacer algo' },
        { surface: 'больше', gloss: 'más; «больше не» es ya no' },
      ],
      culturalNote: 'La conversación con el taxista es una costumbre firme en Rusia, y a un extranjero se le hacen casi siempre las mismas preguntas. Un conductor que no pregunta nada llama la atención.',
      spanishSpeakerNote: 'La negación rusa acumula palabras negativas sin anularse: «он не спрашивает ничего», «я ни о чём не спрашиваю». Donde el español dice «no pregunta nada», el ruso pone el «не» además del «ничего».',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué descubre el narrador sobre Serguéi?',
          options: [
            ['descanso', 'Que no pregunta por respeto: le ofrece un rato sin tener que responder'],
            ['antipatico', 'Que es antipático y no le gustan las personas'],
            ['idioma', 'Que no habla bien ruso'],
          ],
          answer: 'descanso',
          evidence: 'Вы весь день отвечаете на вопросы. В машине можно не отвечать.',
          correct: 'Sí, y el texto descarta expresamente la otra lectura: «Это не так».',
          incorrect: 'El texto dice literalmente que no es que no le gusten las personas. Busca su respuesta.',
          strategy: 'Cuando el texto dice «это не так», está descartando la explicación fácil.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Por qué no pone la radio?',
          options: [
            ['recuerda', 'Porque recuerda que al narrador no le gusta'],
            ['rota', 'Porque la radio está estropeada'],
            ['ruido', 'Porque no soporta el ruido'],
          ],
          answer: 'recuerda',
          evidence: 'он не слушает радио, потому что я не люблю радио. Он помнит это.',
          correct: 'Correcto, y el texto lo remata con dos palabras: «Он помнит это».',
          incorrect: 'No hay avería y no se habla de su gusto personal. Busca la explicación tras «потому что».',
          strategy: 'Una explicación con «потому что» es literal: no hay que deducir.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: '¿Qué significa «задавать вопросы»?',
          options: [
            ['preguntar', 'Hacer preguntas'],
            ['responder', 'Responder preguntas'],
            ['escribir', 'Escribir un formulario'],
          ],
          answer: 'preguntar',
          evidence: '«Почему вы не задаёте вопросы?» Он отвечает: «Вы весь день отвечаете на вопросы».',
          correct: 'Eso es, y la respuesta usa el verbo contrario: «отвечать», responder.',
          incorrect: 'La respuesta del conductor usa el verbo opuesto en la frase siguiente. Compáralos.',
          strategy: 'Si en la frase siguiente aparece el verbo contrario, uno te define el otro.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué el narrador deja de preguntarle también a él?',
          options: [
            ['devolver', 'Porque le devuelve el mismo silencio como forma de agradecérselo'],
            ['enfado', 'Porque se ha enfadado con la respuesta'],
            ['miedo', 'Porque le da vergüenza hablar ruso'],
          ],
          answer: 'devolver',
          evidence: 'И больше я его ни о чём не спрашиваю. Это мой способ сказать спасибо.',
          correct: 'Sí, y el propio texto lo llama así: su manera de dar las gracias.',
          incorrect: 'No hay enfado ni vergüenza. Lee la última frase, que explica la anterior.',
          strategy: 'La última frase de un texto corto suele explicar la penúltima.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: los demás taxistas le preguntan de dónde es y si le gusta Rusia.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Водители обычно спрашивают всё: откуда я, сколько мне лет, почему я здесь, где моя семья, нравится ли мне Россия.',
          correct: 'Verdadero: son las dos primeras y la última de la lista.',
          incorrect: 'Busca la lista de preguntas del primer párrafo, después de los dos puntos.',
          strategy: 'Cuando el texto da una lista tras dos puntos, compárala entera con la pregunta.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena la escena.',
          options: [
            ['p1', 'Las preguntas que hacen todos los taxistas'],
            ['p2', 'Serguéi, que no pregunta nada nunca'],
            ['p3', 'La radio apagada porque lo recuerda'],
            ['p4', 'La pregunta del narrador y su respuesta'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Водители обычно спрашивают всё … Но есть один водитель, Сергей … он не слушает радио … Однажды я спрашиваю его.',
          correct: 'Correcto: la norma, la excepción, el detalle y el diálogo.',
          incorrect: 'Guíate por «Но есть один водитель» y por «Однажды».',
          strategy: 'La palabra «однажды» (una vez) marca la escena concreta dentro de lo habitual.',
        },
      ],
      production: {
        prompt: 'Escribe 6–8 frases en ruso sobre alguien que hace su trabajo de forma distinta a los demás. Usa cuatro interrogativos y tres negaciones.',
        minWords: 25, maxWords: 55,
        hints: ['Водители обычно спрашивают всё.', 'Он не спрашивает ничего.', 'Почему вы не задаёте вопросы?', 'Больше я не спрашиваю.'],
      },
    },
    // ---------------------------------------------------------------- 9
    {
      slug: 'prikhodite-v-sem',
      title: 'Venga a las siete',
      genre: 'instrucciones habladas',
      topic: 'las normas de una casa de baños',
      tags: ['ruso a1', 'lectura', 'imperativo', 'expresiones de tiempo'],
      intro: 'Nikolái Petróvich habla solo en imperativo, y todas sus órdenes acaban teniendo razón. Lectura de ruso A1.',
      mission: 'Averigua por qué insiste tanto en las siete.',
      seoTitle: 'Lectura de ruso A1: venga a las siete | WeLearn',
      seoDescription: 'Lee unas instrucciones en ruso A1 y practica el imperativo y las expresiones de tiempo. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['imperativo', 'tiempo-expresiones'],
      text: `В нашей бане на улице Лесной работает Николай Петрович. Он говорит только императивами.

«Приходите в семь. Не в восемь, в семь».

«Сначала мойтесь. Потом идите в парилку».

«Не сидите двадцать минут. Пять минут, потом выходите».

«Пейте воду. Не пейте пиво».

«В четверг не приходите: в четверг женский день».

Я прихожу каждую субботу в семь утра. В семь там три человека. В девять там сорок человек.

Николай Петрович говорит: «Вот почему я говорю: приходите в семь».

Однажды я прихожу в девять. Он ничего не говорит. Он только смотрит на часы, потом на меня. И больше я так не делаю.`,
      objectives: [
        'Formar el imperativo de usted: приходите, мойтесь, идите, выходите, пейте.',
        'Usar expresiones de tiempo: в семь, каждую субботу, в четверг, потом.',
        'Entender una advertencia que nadie formula con palabras.',
      ],
      vocabulary: [
        { surface: 'бане', lemma: 'баня', gloss: 'casa de baños de vapor rusa' },
        { surface: 'императивами', lemma: 'императив', gloss: 'imperativos, órdenes' },
        { surface: 'мойтесь', lemma: 'мыться', gloss: 'lávese, dúchese' },
        { surface: 'парилку', lemma: 'парилка', gloss: 'sala de vapor' },
        { surface: 'выходите', lemma: 'выходить', gloss: 'salga' },
        { surface: 'четверг', gloss: 'jueves' },
        { surface: 'женский', gloss: 'de mujeres' },
        { surface: 'часы', gloss: 'reloj' },
      ],
      culturalNote: 'La баня rusa tiene reglas de orden —lavarse antes de entrar al vapor, salir cada pocos minutos, beber agua— y días separados para hombres y mujeres. Quien las gestiona las repite en voz alta todo el día.',
      spanishSpeakerNote: 'El imperativo de usted se forma con -ите: «приходите», «идите», «выходите». Y para prohibir se le pone «не» delante: «не сидите», «не пейте». Es exactamente el «no se siente» español.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué explica el texto?',
          options: [
            ['siete', 'Que a las siete hay tres personas y a las nueve cuarenta, y por eso la orden tiene sentido'],
            ['mal', 'Que Nikolái Petróvich trata mal a los clientes'],
            ['cerrar', 'Que la casa de baños va a cerrar'],
          ],
          answer: 'siete',
          evidence: 'В семь там три человека. В девять там сорок человек … «Вот почему я говорю: приходите в семь».',
          correct: 'Sí, y él mismo cierra el argumento con esas dos cifras.',
          incorrect: 'No hay mal trato ni cierre. Compara las dos cifras de personas.',
          strategy: 'Cuando un personaje dice «por eso digo…», la razón está en las frases anteriores.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuántos minutos dice que hay que estar en la sala de vapor?',
          options: [
            ['cinco', 'Cinco'],
            ['veinte', 'Veinte'],
            ['siete', 'Siete'],
          ],
          answer: 'cinco',
          evidence: '«Не сидите двадцать минут. Пять минут, потом выходите».',
          correct: 'Correcto: los veinte son justamente lo que prohíbe.',
          incorrect: 'Los veinte van con «не сидите» y las siete son una hora, no minutos.',
          strategy: 'Cuando una orden lleva «не», la cifra que la sigue es la prohibida, no la recomendada.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: '¿Qué es «парилка»?',
          options: [
            ['vapor', 'La sala de vapor'],
            ['ducha', 'La ducha'],
            ['vestuario', 'El vestuario'],
          ],
          answer: 'vapor',
          evidence: '«Сначала мойтесь. Потом идите в парилку». «Не сидите двадцать минут. Пять минут, потом выходите».',
          correct: 'Eso es: se entra después de lavarse y solo se aguantan unos minutos.',
          incorrect: 'Lavarse es antes y en otro sitio. Fíjate en que solo se puede estar cinco minutos.',
          strategy: 'Si en un sitio solo puedes estar cinco minutos, no es donde te lavas ni te cambias.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Qué quiere decir que mire el reloj y luego al narrador sin hablar?',
          options: [
            ['reproche', 'Que le está recordando la orden sin necesidad de repetirla'],
            ['hora', 'Que la casa de baños está cerrando'],
            ['saludo', 'Que se alegra de verlo'],
          ],
          answer: 'reproche',
          evidence: 'Однажды я прихожу в девять. Он ничего не говорит. Он только смотрит на часы, потом на меня. И больше я так не делаю.',
          correct: 'Sí, y la prueba es la frase final: no vuelve a hacerlo.',
          incorrect: 'A las nueve la casa está llena, no cerrando, y no es un saludo. Fíjate en la última frase.',
          strategy: 'Si tras un gesto el narrador cambia de conducta, el gesto era un reproche.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: según Nikolái Petróvich se puede ir cualquier día de la semana.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'faux',
          evidence: '«В четверг не приходите: в четверг женский день».',
          correct: 'Falso: el jueves no, porque es el día de las mujeres.',
          incorrect: 'Hay una de sus órdenes que menciona un día concreto de la semana. Búscala.',
          strategy: 'Después de dos puntos suele venir la razón de la orden anterior.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena las órdenes según el texto.',
          options: [
            ['p1', 'Venga a las siete, no a las ocho'],
            ['p2', 'Lávese primero y luego pase al vapor'],
            ['p3', 'Cinco minutos y salga'],
            ['p4', 'Beba agua, no cerveza'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: '«Приходите в семь…» «Сначала мойтесь. Потом идите в парилку». «Не сидите двадцать минут…» «Пейте воду. Не пейте пиво».',
          correct: 'Correcto: el texto pone cada orden en su propio párrafo.',
          incorrect: 'Cada orden va en una línea distinta: sigue ese orden.',
          strategy: 'Si el texto separa las frases en líneas, el orden ya está dado.',
        },
      ],
      production: {
        prompt: 'Escribe 6–8 frases en ruso con las normas de un sitio que conoces. Usa cinco imperativos de usted, dos de ellos en negativo, y tres expresiones de tiempo.',
        minWords: 25, maxWords: 55,
        hints: ['Приходите в семь.', 'Сначала мойтесь, потом идите…', 'Не сидите двадцать минут.', 'В четверг не приходите.'],
      },
    },
    // ---------------------------------------------------------------- 10
    {
      slug: 'bukvy-obmanyvayut',
      title: 'Las letras engañan',
      genre: 'cuaderno de estudiante',
      topic: 'comprar САЛО creyendo que es ensalada',
      tags: ['ruso a1', 'lectura', 'alfabeto cirílico', 'futuro con быть'],
      intro: 'Las primeras semanas no lee: adivina. Y un día compra doscientos gramos de algo que no era ensalada. Lectura de ruso A1.',
      mission: 'Averigua qué compra ahora todas las semanas, y a propósito.',
      seoTitle: 'Lectura de ruso A1: las letras engañan | WeLearn',
      seoDescription: 'Lee un cuaderno de estudiante en ruso A1 y practica el alfabeto cirílico y el futuro con быть. Con vocabulario glosado y seis preguntas.',
      grammarFocus: ['alfabeto-cirilico', 'futuro-byt'],
      text: `Первые недели в Москве я не читаю, я угадываю. Буквы обманывают. «В» похожа на латинскую букву, но это другой звук. «Р», «С», «Н», «У», «Х» — то же самое.

В магазине я вижу слово «САЛО» и думаю: это салат. Я покупаю двести граммов. Дома я открываю пакет. Это не салат. Это сало.

Мой сосед Павел смеётся десять минут. Потом он говорит: «Ешь. Это хорошо с чёрным хлебом».

Он прав. Это правда хорошо.

Теперь я читаю медленно, но правильно. Я буду читать быстро, но не сейчас. Через год я буду читать газеты. Через два года я буду понимать шутки. Это план.

Сало я покупаю каждую неделю. Специально.`,
      objectives: [
        'Reconocer las letras cirílicas que se parecen a las latinas sin serlo: В, Н, Р, С, У, Х.',
        'Formar el futuro con быть + infinitivo: я буду читать, я буду понимать.',
        'Leer un error de lectura contado por quien lo cometió.',
      ],
      vocabulary: [
        { surface: 'угадываю', lemma: 'угадывать', gloss: 'adivino' },
        { surface: 'обманывают', lemma: 'обманывать', gloss: 'engañan' },
        { surface: 'похожа', lemma: 'похожий', gloss: 'se parece a' },
        { surface: 'звук', gloss: 'sonido' },
        { surface: 'сало', gloss: 'tocino salado, manteca curada' },
        { surface: 'пакет', gloss: 'bolsa, paquete' },
        { surface: 'прав', gloss: 'tiene razón' },
        { surface: 'шутки', lemma: 'шутка', gloss: 'chistes, bromas' },
      ],
      culturalNote: 'El сало —tocino curado en sal— se come en lonchas finas con pan negro y es un aperitivo cotidiano en Rusia y Ucrania. No se cocina: se corta y se come frío.',
      spanishSpeakerNote: 'El primer obstáculo del ruso no es la gramática, es leer. В suena como una v, Н como una n, Р como una r fuerte, С como una s, У como una u y Х como una j. Todas parecen otra cosa, y por eso «САЛО» se lee salo, no salat.',
      questions: [
        {
          type: 'main-idea', skill: 'global',
          prompt: '¿Qué cuenta el texto?',
          options: [
            ['leer', 'Que las letras cirílicas engañan al principio, y que el error acabó gustándole'],
            ['tienda', 'Que en la tienda le vendieron algo equivocado'],
            ['dieta', 'Que ha cambiado de dieta desde que vive en Moscú'],
          ],
          answer: 'leer',
          evidence: 'Буквы обманывают … Это не салат. Это сало … Сало я покупаю каждую неделю. Специально.',
          correct: 'Sí, y el final le da la vuelta: ahora lo compra queriendo.',
          incorrect: 'Nadie le vendió nada equivocado: leyó mal la etiqueta. Fíjate en la primera y la última frase.',
          strategy: 'Si el final repite el objeto del error, el texto trata de cómo el error acabó bien.',
        },
        {
          type: 'detail', skill: 'detail',
          prompt: '¿Cuánto compró creyendo que era ensalada?',
          options: [
            ['200', 'Doscientos gramos'],
            ['diez', 'Diez gramos'],
            ['kilo', 'Un kilo'],
          ],
          answer: '200',
          evidence: 'Я покупаю двести граммов. Дома я открываю пакет.',
          correct: 'Correcto, y en casa descubre lo que es.',
          incorrect: 'Los diez son los minutos que se ríe el vecino. Busca la cifra con «граммов».',
          strategy: 'Empareja cada cifra con su unidad: gramos, minutos, años.',
        },
        {
          type: 'vocabulary-in-context', skill: 'vocabulary',
          prompt: 'Según el texto, ¿qué es «сало»?',
          options: [
            ['tocino', 'Tocino curado que se come con pan negro'],
            ['ensalada', 'Una ensalada rusa'],
            ['sal', 'Sal gruesa'],
          ],
          answer: 'tocino',
          evidence: 'Это не салат. Это сало … «Ешь. Это хорошо с чёрным хлебом».',
          correct: 'Eso es, y el vecino dice cómo se come: con pan negro.',
          incorrect: 'El texto niega expresamente que sea ensalada. Fíjate en lo que dice el vecino.',
          strategy: 'Si un personaje dice cómo se come algo, esa frase te dice qué es.',
        },
        {
          type: 'inference', skill: 'inference',
          prompt: '¿Por qué termina diciendo «специально»?',
          options: [
            ['gusto', 'Porque ahora lo compra a propósito: le gustó de verdad'],
            ['broma', 'Porque quiere hacer reír a su vecino'],
            ['practica', 'Porque así practica la lectura del cartel'],
          ],
          answer: 'gusto',
          evidence: 'Он прав. Это правда хорошо … Сало я покупаю каждую неделю. Специально.',
          correct: 'Sí, y lo apoya la frase anterior: «это правда хорошо».',
          incorrect: 'No lo hace por el vecino ni para practicar. Cruza la última palabra con «это правда хорошо».',
          strategy: 'Una palabra sola al final de un texto se entiende con la frase que la precede.',
        },
        {
          type: 'true-false', skill: 'detail',
          prompt: 'Verdadero o falso: dice que dentro de dos años entenderá los chistes en ruso.',
          options: [['vrai', 'Verdadero'], ['faux', 'Falso']],
          answer: 'vrai',
          evidence: 'Через год я буду читать газеты. Через два года я буду понимать шутки. Это план.',
          correct: 'Verdadero, y lo llama plan: primero periódicos, después chistes.',
          incorrect: 'Busca el párrafo con los dos futuros. Da dos plazos distintos.',
          strategy: 'La estructura «через + tiempo» marca un plazo futuro: localiza las dos.',
        },
        {
          type: 'ordering', skill: 'organization',
          prompt: 'Ordena lo que ocurre.',
          options: [
            ['p1', 'Las primeras semanas adivina en vez de leer'],
            ['p2', 'Compra doscientos gramos creyendo que es ensalada'],
            ['p3', 'El vecino se ríe y le dice cómo comerlo'],
            ['p4', 'Ahora lee despacio y tiene un plan a dos años'],
          ],
          answer: ['p1', 'p2', 'p3', 'p4'],
          evidence: 'Первые недели в Москве я не читаю, я угадываю … В магазине я вижу слово «САЛО» … Мой сосед Павел смеётся десять минут … Теперь я читаю медленно, но правильно.',
          correct: 'Correcto: la dificultad, el error, la ayuda y el plan.',
          incorrect: 'Guíate por «Первые недели» y por «Теперь».',
          strategy: 'Las expresiones «первые недели» y «теперь» separan el antes del ahora.',
        },
      ],
      production: {
        prompt: 'Escribe 6–8 frases en ruso sobre un error tuyo al leer o al hablar, y qué harás dentro de un año. Usa tres futuros con быть.',
        minWords: 25, maxWords: 55,
        hints: ['Первые недели я не читаю, я угадываю.', 'Это не салат. Это сало.', 'Через год я буду читать газеты.', 'Это план.'],
      },
    },
  ],
}
