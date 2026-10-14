import { createSupplementalTopic } from '../create-supplemental-topic'

export const possessivePronouns = createSupplementalTopic({
  slug: 'possessive-pronouns', order: '26', color: '#165DFF', category: 'Nouns', level: 'A1',
  title: 'Possessive pronouns en inglés A1', shortTitle: 'Possessive pronouns',
  metaTitle: 'Possessive pronouns en inglés A1 | Mine, yours, his, hers',
  description: 'Aprende mine, yours, his, hers, ours y theirs para indicar posesión sin repetir el sustantivo, con contrastes claros frente a my, your y their.',
  lead: 'My phone y mine no ocupan el mismo lugar. En esta lección aprendes a sustituir el objeto completo y a decir de quién es algo con naturalidad.',
  outcomes: ['Distinguir adjetivos posesivos y pronombres posesivos.', 'Elegir mine, yours, his, hers, ours o theirs según el dueño.', 'Responder preguntas con Whose sin repetir el sustantivo.'],
  guide: {
    goal: 'Expresar de quién es algo sin repetir el nombre del objeto.',
    model: 'This is my book. The book is mine. / Is this yours?',
    formula: 'noun + be + possessive pronoun | Whose + noun + be...?',
    decisions: ['Si aparece un sustantivo después, usa my/your/his/her/our/their.', 'Si el sustantivo ya está claro, usa mine/yours/his/hers/ours/theirs.', 'His no cambia; her se convierte en hers.', 'No uses apóstrofo: yours y theirs, nunca your\'s o their\'s.'],
    table: [['Adjetivo', 'Pronombre', 'Ejemplo'], ['my', 'mine', 'This seat is mine.'], ['your', 'yours', 'Is this jacket yours?'], ['his', 'his', 'The blue bag is his.'], ['her', 'hers', 'That notebook is hers.'], ['our', 'ours', 'The table is ours.'], ['their', 'theirs', 'The keys are theirs.']],
    mistakes: ['Decir This is mine book: mine no va antes del sustantivo.', 'Escribir your\'s o her\'s con apóstrofo.', 'Usar her cuando el sustantivo ya desapareció: The bag is hers.'],
  },
  seo: [
    { heading: 'Qué son los possessive pronouns', paragraphs: ['Los pronombres posesivos reemplazan una combinación completa de posesivo más sustantivo. En lugar de repetir my coat, puedes decir mine. Por eso aparecen cuando el objeto ya se mencionó o es evidente.', 'La diferencia esencial es de posición: my, your y their necesitan un sustantivo; mine, yours y theirs funcionan solos.'] },
    { heading: 'Mine vs my, yours vs your', paragraphs: ['Compara This is my desk con This desk is mine. Las dos frases expresan la misma relación, pero la segunda evita repetir desk.', 'El mismo contraste funciona con her/hers y our/ours. His es especial porque tiene la misma forma en ambos usos.'], table: [['Con sustantivo', 'Sin sustantivo', 'Traducción'], ['my phone', 'mine', 'mi teléfono / el mío'], ['your room', 'yours', 'tu habitación / la tuya'], ['her idea', 'hers', 'su idea / la de ella']] },
    { heading: 'Cómo responder Whose...?', paragraphs: ['Whose pregunta por el dueño: Whose umbrella is this? Puedes responder It is mine, It is Laura\'s o It is hers. El pronombre permite contestar sin repetir umbrella.', 'En conversaciones cotidianas estas respuestas cortas son más naturales que repetir todo el grupo nominal.'] },
    { heading: 'Errores frecuentes de hispanohablantes', paragraphs: ['El español permite el mío, la tuya y los nuestros con artículo. En inglés no se añade the: mine, yours y ours ya están completos.', 'Tampoco llevan apóstrofo. El apóstrofo pertenece a nombres posesivos como Laura\'s, no a los pronombres yours o theirs.'] },
  ],
  visual: { mode: 'ownership-swap', teacherLens: 'El sustantivo aparece una vez; después se sustituye por una palabra de posesión completa.', graphicPrompt: 'Muestra un objeto pasando de my bag a mine.', scene: [['my bag', 'mine'], ['her keys', 'hers'], ['their table', 'theirs']], learnerModes: ['visual: objeto y dueño', 'analítico: con o sin sustantivo', 'oral: preguntas Whose'], practiceVerbs: ['Reconoce', 'Sustituye', 'Lee', 'Produce', 'Corrige', 'Conversa'], reviewFocus: ['dueño', 'posición', 'singular/plural', 'sin apóstrofo'] },
  practice: {
    choice: [
      { scene: 'En clase', prompt: 'This is my notebook. That one is ___.', options: ['yours', 'your', 'you', 'you are'], answer: 'yours', explain: 'No hay sustantivo después: usamos yours.' },
      { scene: 'En casa', prompt: 'The red coat belongs to Marta. It is ___.', options: ['hers', 'her', 'she', 'their'], answer: 'hers', explain: 'El abrigo es de ella: hers.' },
      { scene: 'En la oficina', prompt: 'We share this desk. It is ___.', options: ['ours', 'our', 'us', 'theirs'], answer: 'ours', explain: 'El escritorio pertenece a nosotros: ours.' },
      { scene: 'Objetos perdidos', prompt: 'Are these keys ___?', options: ['theirs', 'their', 'them', 'they'], answer: 'theirs', explain: 'Theirs sustituye their keys.' },
      { scene: 'La bicicleta', prompt: 'That bicycle is ___. I ride it every day.', options: ['mine', 'my', 'me', 'I'], answer: 'mine', explain: 'Mine funciona sin repetir bicycle.' },
      { scene: 'Dos hermanos', prompt: 'Ben has a blue room. The blue room is ___.', options: ['his', 'him', 'he', 'hers'], answer: 'his', explain: 'His puede funcionar antes de sustantivo o solo.' },
      { scene: 'En la mesa', prompt: 'This is ___ cup; the cup next to it is mine.', options: ['your', 'yours', 'you', 'your\'s'], answer: 'your', explain: 'Antes de cup necesitamos el adjetivo your.' },
      { scene: 'Una respuesta corta', prompt: 'Whose phone is this? — It is ___.', options: ['hers', 'her phone', 'she', 'her'], answer: 'hers', explain: 'Hers responde sin repetir phone.' },
    ],
    dual: [
      { scene: 'Dos maletas', prompt: 'This is [[0]] suitcase. The black suitcase is [[1]].', blanks: [{ options: ['my', 'mine', 'me'], answer: 'my', explain: 'Antes de suitcase: my.' }, { options: ['yours', 'your', 'you'], answer: 'yours', explain: 'Sin sustantivo: yours.' }] },
      { scene: 'Un proyecto', prompt: 'That is [[0]] idea, but the final decision is [[1]].', blanks: [{ options: ['her', 'hers', 'she'], answer: 'her', explain: 'Antes de idea: her.' }, { options: ['ours', 'our', 'us'], answer: 'ours', explain: 'Sin sustantivo: ours.' }] },
      { scene: 'En el parque', prompt: 'Their dog is small; [[0]] is large. Both dogs are [[1]].', blanks: [{ options: ['ours', 'our', 'us'], answer: 'ours', explain: 'Ours sustituye our dog.' }, { options: ['theirs', 'their', 'them'], answer: 'theirs', explain: 'El segundo perro pertenece a ellos.' }] },
      { scene: 'Material escolar', prompt: 'Is this [[0]] pencil or [[1]]?', blanks: [{ options: ['his', 'him', 'he'], answer: 'his', explain: 'His pencil.' }, { options: ['hers', 'her', 'she'], answer: 'hers', explain: 'Hers funciona solo.' }] },
    ],
    guided: { scene: 'Después de una reunión', text: 'We are collecting our things. The laptop is [[0]], but the charger is Ana\'s, so it is [[1]]. These notebooks belong to Leo and Maya; they are [[2]]. Is this pen [[3]]? No, my pen is blue, so this one is not [[4]]. The two coffee cups are [[5]], and the umbrella by the door is [[6]].', blanks: [
      { options: ['mine', 'my', 'me'], answer: 'mine', explain: 'Sin sustantivo: mine.' }, { options: ['hers', 'her', 'she'], answer: 'hers', explain: 'De Ana: hers.' }, { options: ['theirs', 'their', 'them'], answer: 'theirs', explain: 'De Leo y Maya: theirs.' }, { options: ['yours', 'your', 'you'], answer: 'yours', explain: 'Pregunta sin sustantivo: yours.' }, { options: ['mine', 'my', 'me'], answer: 'mine', explain: 'Not mine.' }, { options: ['ours', 'our', 'us'], answer: 'ours', explain: 'De nosotros: ours.' }, { options: ['his', 'him', 'he'], answer: 'his', explain: 'De él: his.' },
    ] },
    free: { scene: 'Objetos en una casa compartida', text: 'The room near the kitchen is [[0]] (we). The bicycle outside is [[1]] (she). These shelves are [[2]] (they). Is the blue towel [[3]] (you)? The small desk is [[4]] (I).', blanks: [
      { answer: 'ours', explain: 'We → ours.' }, { answer: 'hers', explain: 'She → hers.' }, { answer: 'theirs', explain: 'They → theirs.' }, { answer: 'yours', explain: 'You → yours.' }, { answer: 'mine', explain: 'I → mine.' },
    ] },
    write: [
      { scene: 'Evita la repetición', prompt: 'Reescribe: This is my chair. That is your chair.', answer: 'This chair is mine and that one is yours.', accepted: ['mine', 'yours'], explain: 'Mine y yours sustituyen chair.' },
      { scene: 'Pregunta por dueño', prompt: 'Pregunta de quién es una chaqueta y responde que es de Laura.', answer: 'Whose jacket is this? It is hers.', accepted: ['whose', 'hers'], explain: 'Whose pregunta y hers evita repetir jacket.' },
      { scene: 'Dos grupos', prompt: 'Di que esta mesa es de ustedes y aquella es de ellos.', answer: 'This table is yours and that one is theirs.', accepted: ['yours', 'theirs'], explain: 'Ambos pronombres funcionan solos.' },
      { scene: 'Corrección', prompt: 'Corrige: The red bag is her.', answer: 'The red bag is hers.', accepted: ['hers'], explain: 'Sin sustantivo usamos hers.' },
    ],
    mission: [
      { scene: 'Objetos personales', prompt: 'Escribe dos frases para comparar un objeto tuyo y uno de otra persona.', answer: 'This phone is mine, but the black one is his.', accepted: ['mine', 'his'], explain: 'Compara propietarios sin repetir el sustantivo.' },
      { scene: 'Casa compartida', prompt: 'Explica de quién son tres objetos usando ours, theirs o yours.', answer: 'The sofa is ours, the boxes are theirs, and the mug is yours.', accepted: ['ours', 'theirs', 'yours'], explain: 'Usa al menos dos pronombres posesivos.' },
      { scene: 'Objetos perdidos', prompt: 'Haz una pregunta con Whose y contéstala.', answer: 'Whose keys are these? They are mine.', accepted: ['whose', 'mine'], explain: 'Whose + noun y respuesta con pronombre.' },
      { scene: 'Tu entorno', prompt: 'Escribe una frase verdadera con mine y otra con ours.', answer: 'The blue notebook is mine. The kitchen table is ours.', accepted: ['mine', 'ours'], explain: 'Producción personal con dos dueños distintos.' },
    ],
  },
})

export const presentSimpleVsContinuous = createSupplementalTopic({
  slug: 'present-simple-vs-present-continuous', order: '27', color: '#7C3AED', category: 'Verbs', level: 'A1',
  title: 'Present simple vs present continuous en inglés A1', shortTitle: 'Present simple vs continuous',
  metaTitle: 'Present simple vs present continuous A1 | Reglas y ejercicios',
  description: 'Distingue rutinas y hechos del present simple frente a acciones que ocurren ahora en present continuous.',
  lead: 'I work y I am working no dicen lo mismo. Aprende a mirar la intención y las palabras de tiempo antes de elegir la forma verbal.',
  outcomes: ['Usar present simple para rutinas y hechos.', 'Usar present continuous para acciones en progreso.', 'Reconocer marcadores como usually, every day, now y at the moment.'],
  guide: {
    goal: 'Elegir entre rutina y acción en progreso según el contexto.',
    model: 'I work every day. / I am working now.',
    formula: 'routine: subject + base verb | now: subject + be + verb-ing',
    decisions: ['Every day, usually y always suelen pedir present simple.', 'Now, right now y at the moment suelen pedir present continuous.', 'Con he/she/it añade -s en simple.', 'En continuous necesitas am/is/are antes de -ing.'],
    table: [['Intención', 'Tiempo', 'Ejemplo'], ['rutina', 'present simple', 'She walks to work.'], ['hecho', 'present simple', 'Water boils at 100°C.'], ['ahora', 'present continuous', 'She is walking now.'], ['situación temporal', 'present continuous', 'I am staying with Ana this week.']],
    mistakes: ['Olvidar be: She working now.', 'Usar -s dentro del continuous: He is works.', 'Usar continuous para una rutina con every day.'],
  },
  seo: [
    { heading: 'La diferencia esencial: rutina o ahora', paragraphs: ['El present simple presenta hábitos, horarios y hechos. El present continuous muestra una acción en desarrollo o una situación temporal.', 'La pregunta útil no es cómo se traduce, sino si la acción es parte de la rutina o está ocurriendo alrededor de este momento.'] },
    { heading: 'Palabras que orientan la decisión', paragraphs: ['Usually, often, every day y on Mondays acompañan con frecuencia al present simple. Now, right now, today y at the moment orientan al continuous.', 'Son pistas, no una regla automática: today puede describir una situación temporal, mientras every day establece una rutina.'], table: [['Simple', 'Continuous', 'Contraste'], ['every day', 'now', 'I study every day / I am studying now'], ['usually', 'this week', 'She usually works / She is working from home this week']] },
    { heading: 'La forma verbal', paragraphs: ['El simple usa el verbo base, con -s para he, she e it. El continuous usa am, is o are más verbo-ing.', 'En preguntas y negativas, el simple utiliza do/does; el continuous invierte o niega el verbo be.'] },
    { heading: 'Errores frecuentes', paragraphs: ['El error She working now omite el auxiliar is. El error He is work mezcla la estructura: después de is necesitas working.', 'También es común usar He work every day; la rutina es correcta, pero falta la -s de tercera persona.'] },
  ],
  visual: { mode: 'timeline-contrast', teacherLens: 'Una línea separa lo repetido de lo que está ocurriendo ahora.', graphicPrompt: 'Contrasta un calendario semanal con una acción en vivo.', scene: [['I work every day', 'rutina'], ['I am working now', 'ahora'], ['She usually cooks', 'hábito'], ['She is cooking', 'en progreso']], learnerModes: ['visual: calendario vs cámara', 'analítico: marcador temporal', 'oral: contraste'], practiceVerbs: ['Reconoce', 'Contrasta', 'Lee', 'Produce', 'Corrige', 'Conversa'], reviewFocus: ['intención', 'marcador', 'be', 'tercera persona'] },
  practice: {
    choice: [
      { scene: 'Rutina laboral', prompt: 'Maya ___ at the café every Saturday.', options: ['works', 'is working', 'work', 'working'], answer: 'works', explain: 'Every Saturday = rutina; Maya lleva -s.' },
      { scene: 'En este momento', prompt: 'Please be quiet. The baby ___.', options: ['is sleeping', 'sleeps', 'sleep', 'are sleeping'], answer: 'is sleeping', explain: 'La acción ocurre ahora.' },
      { scene: 'Horario', prompt: 'The train ___ at 8:10 every morning.', options: ['leaves', 'is leaving', 'leave', 'leaving'], answer: 'leaves', explain: 'Un horario regular usa present simple.' },
      { scene: 'Situación temporal', prompt: 'I ___ with my aunt this week.', options: ['am staying', 'stay', 'stays', 'is staying'], answer: 'am staying', explain: 'This week expresa una situación temporal.' },
      { scene: 'Hábito', prompt: 'Leo usually ___ coffee after lunch.', options: ['drinks', 'is drinking', 'drink', 'drinking'], answer: 'drinks', explain: 'Usually = hábito; Leo lleva -s.' },
      { scene: 'Llamada', prompt: 'I cannot talk. I ___ the bus.', options: ['am driving', 'drive', 'drives', 'is driving'], answer: 'am driving', explain: 'La acción está en progreso.' },
      { scene: 'Hecho general', prompt: 'The sun ___ in the east.', options: ['rises', 'is rising', 'rise', 'rising'], answer: 'rises', explain: 'Hecho general: present simple.' },
      { scene: 'Cambio de hoy', prompt: 'Ana normally walks, but today she ___ the bus.', options: ['is taking', 'takes', 'take', 'taking'], answer: 'is taking', explain: 'Today contrasta con la rutina normal.' },
    ],
    dual: [
      { scene: 'Trabajo y momento', prompt: 'I [[0]] in a school, but today I [[1]] from home.', blanks: [{ options: ['work', 'am working', 'works'], answer: 'work', explain: 'Trabajo habitual.' }, { options: ['am working', 'work', 'is working'], answer: 'am working', explain: 'Situación temporal de hoy.' }] },
      { scene: 'Rutina de Ana', prompt: 'Ana usually [[0]] at seven. Right now she [[1]] breakfast.', blanks: [{ options: ['gets up', 'is getting up', 'get up'], answer: 'gets up', explain: 'Usually = simple.' }, { options: ['is making', 'makes', 'make'], answer: 'is making', explain: 'Right now = continuous.' }] },
      { scene: 'El clima', prompt: 'It often [[0]] here, but it [[1]] today.', blanks: [{ options: ['rains', 'is raining', 'rain'], answer: 'rains', explain: 'Often = frecuencia.' }, { options: ['is not raining', 'does not rain', 'not raining'], answer: 'is not raining', explain: 'Today = situación actual.' }] },
      { scene: 'Transporte', prompt: 'Leo [[0]] the train every day. This morning he [[1]] a taxi.', blanks: [{ options: ['takes', 'is taking', 'take'], answer: 'takes', explain: 'Every day = rutina.' }, { options: ['is taking', 'takes', 'take'], answer: 'is taking', explain: 'This morning = cambio temporal.' }] },
    ],
    guided: { scene: 'Una mañana diferente', text: 'Maya usually [[0]] (open) the café at eight. She [[1]] (prepare) the tables before customers arrive. Today she [[2]] (not/open) the café because the team [[3]] (paint) the walls. Leo normally [[4]] (serve) coffee, but right now he [[5]] (move) chairs. The café [[6]] (look) very different today.', blanks: [
      { options: ['opens', 'is opening', 'open'], answer: 'opens', explain: 'Usually = simple.' }, { options: ['prepares', 'is preparing', 'prepare'], answer: 'prepares', explain: 'Rutina.' }, { options: ['is not opening', 'does not open', 'not opens'], answer: 'is not opening', explain: 'Excepción de hoy.' }, { options: ['is painting', 'paints', 'paint'], answer: 'is painting', explain: 'Ahora.' }, { options: ['serves', 'is serving', 'serve'], answer: 'serves', explain: 'Normally = simple.' }, { options: ['is moving', 'moves', 'move'], answer: 'is moving', explain: 'Right now.' }, { options: ['looks', 'is looking', 'look'], answer: 'looks', explain: 'Look como estado/apariencia.' },
    ] },
    free: { scene: 'En casa', text: 'My brother usually [[0]] (study) in the library, but today he [[1]] (study) at home. My parents [[2]] (watch) the news every evening. At the moment they [[3]] (cook) dinner, and I [[4]] (write) this message.', blanks: [
      { answer: 'studies', explain: 'Rutina + he: studies.' }, { answer: 'is studying', explain: 'Today: temporal.' }, { answer: 'watch', explain: 'Every evening: simple.' }, { answer: 'are cooking', explain: 'At the moment: continuous.' }, { answer: 'am writing', explain: 'Ahora: am writing.' },
    ] },
    write: [
      { scene: 'Contraste', prompt: 'Combina una rutina y una acción actual con but.', answer: 'I usually study at night, but I am studying this morning.', accepted: ['usually', 'am studying'], explain: 'Contrasta simple y continuous.' },
      { scene: 'Corrección', prompt: 'Corrige: She is work every day.', answer: 'She works every day.', accepted: ['works'], explain: 'La rutina usa simple y tercera persona.' },
      { scene: 'Ahora', prompt: 'Di que normalmente vas caminando, pero ahora estás tomando el bus.', answer: 'I usually walk, but I am taking the bus now.', accepted: ['usually', 'am taking'], explain: 'Marcadores claros para cada tiempo.' },
      { scene: 'Pregunta', prompt: 'Pregunta qué hace alguien normalmente y qué está haciendo ahora.', answer: 'What do you usually do, and what are you doing now?', accepted: ['usually', 'doing now'], explain: 'Do para simple; are para continuous.' },
    ],
    mission: [
      { scene: 'Tu día', prompt: 'Escribe dos rutinas y una acción que haces ahora.', answer: 'I work in the morning and exercise at night. Right now, I am studying English.', accepted: ['right now', 'am studying'], explain: 'Integra ambos tiempos.' },
      { scene: 'Una semana especial', prompt: 'Describe algo que haces normalmente y algo diferente que haces esta semana.', answer: 'I usually work at the office, but this week I am working from home.', accepted: ['usually', 'this week'], explain: 'Rutina frente a situación temporal.' },
      { scene: 'Foto en vivo', prompt: 'Imagina una foto y describe dos acciones que ocurren ahora.', answer: 'Two people are talking and a child is running in the park.', accepted: ['are talking', 'is running'], explain: 'Acciones visibles en progreso.' },
      { scene: 'Conversación', prompt: 'Haz una pregunta sobre rutina y respóndela con una excepción de hoy.', answer: 'Do you drive to work? Usually yes, but today I am taking the train.', accepted: ['usually', 'today'], explain: 'Contraste comunicativo completo.' },
    ],
  },
})
