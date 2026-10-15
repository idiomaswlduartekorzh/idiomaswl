import { createSupplementalTopic } from '../create-supplemental-topic'

export const tooEnough = createSupplementalTopic({
  slug: 'too-enough', order: '22', color: '#D97706', category: 'Adjectives', level: 'A2',
  title: 'Too y enough en inglés A2', shortTitle: 'Too / Enough', metaTitle: 'Too y enough en inglés A2 | Reglas y ejercicios',
  description: 'Aprende a expresar exceso y cantidad suficiente con too, too much, too many, enough y not enough.',
  lead: 'Too indica que algo supera un límite; enough indica que alcanza. La posición cambia según acompañen un adjetivo o un sustantivo.',
  outcomes: ['Usar too + adjective para expresar exceso.', 'Colocar enough antes de sustantivos y después de adjetivos.', 'Distinguir too much y too many según el sustantivo.'],
  guide: { goal: 'Expresar exceso o suficiencia con el orden correcto.', model: 'It is too expensive. / It is cheap enough. / We have enough time.', formula: 'too + adjective | adjective + enough | enough + noun', decisions: ['Too va antes del adjetivo.', 'Enough va después del adjetivo.', 'Enough va antes del sustantivo.', 'Usa too many con contables y too much con incontables.'], table: [['Idea', 'Estructura', 'Ejemplo'], ['exceso', 'too + adjective', 'The bag is too heavy.'], ['suficiencia', 'adjective + enough', 'The room is big enough.'], ['cantidad suficiente', 'enough + noun', 'We have enough chairs.'], ['cantidad excesiva', 'too much/many + noun', 'There is too much noise.']], mistakes: ['Decir enough big en lugar de big enough.', 'Decir time enough en lugar de enough time.', 'Usar too much people en lugar de too many people.'] },
  seo: [
    { heading: 'Too expresa un exceso con consecuencia', paragraphs: ['Too no significa simplemente muy. Indica que la cantidad o intensidad supera lo conveniente: The coffee is too hot to drink.', 'La consecuencia puede aparecer con to + verbo: too tired to continue, too expensive to buy.'] },
    { heading: 'Dónde se coloca enough', paragraphs: ['Con adjetivos, enough va después: old enough, fast enough. Con sustantivos, va antes: enough money, enough chairs.', 'Not enough expresa insuficiencia y conserva el mismo orden.'], table: [['Adjetivo', 'Sustantivo', 'Negativo'], ['warm enough', 'enough water', 'not warm enough'], ['quiet enough', 'enough space', 'not enough space']] },
    { heading: 'Too much y too many', paragraphs: ['Too many acompaña sustantivos contables plurales: too many emails. Too much acompaña incontables: too much work.', 'Cuando no hay sustantivo, too much también puede funcionar como adverbio: You worry too much.'] },
    { heading: 'Diferencia entre very y too', paragraphs: ['Very solo intensifica: The test is very difficult. Too añade un problema o límite: The test is too difficult for this level.', 'Esta diferencia evita que too suene negativo cuando solo quieres decir muy.'] },
  ],
  visual: { mode: 'threshold', teacherLens: 'Una línea marca el punto suficiente: antes falta, en el punto alcanza y después sobra.', graphicPrompt: 'Muestra una escala de not enough a enough y too much.', scene: [['not enough', 'no alcanza'], ['enough', 'alcanza'], ['too much', 'supera el límite']], learnerModes: ['visual: umbral', 'analítico: posición', 'oral: consecuencia'], practiceVerbs: ['Reconoce', 'Ordena', 'Lee', 'Produce', 'Corrige', 'Conversa'], reviewFocus: ['exceso', 'suficiencia', 'posición', 'contable'] },
  practice: {
    choice: [
      { scene: 'Maleta', prompt: 'This suitcase is ___ heavy to carry.', options: ['too', 'enough', 'very enough', 'too much'], answer: 'too', explain: 'Too va antes del adjetivo heavy.' },
      { scene: 'Edad', prompt: 'She is old ___ to drive.', options: ['enough', 'too', 'enough old', 'very'], answer: 'enough', explain: 'Enough va después del adjetivo.' },
      { scene: 'Reunión', prompt: 'We have ___ chairs for everyone.', options: ['enough', 'too', 'chairs enough', 'too much'], answer: 'enough', explain: 'Enough va antes del sustantivo.' },
      { scene: 'Tráfico', prompt: 'There are ___ cars on this road.', options: ['too many', 'too much', 'enough much', 'very'], answer: 'too many', explain: 'Cars es contable plural.' },
      { scene: 'Trabajo', prompt: 'I have ___ work today.', options: ['too much', 'too many', 'enough many', 'too'], answer: 'too much', explain: 'Work es incontable.' },
      { scene: 'Habitación', prompt: 'The room is not quiet ___ for the recording.', options: ['enough', 'too', 'enough quiet', 'much'], answer: 'enough', explain: 'Adjetivo + enough.' },
      { scene: 'Precio', prompt: 'The laptop is ___ expensive for my budget.', options: ['too', 'enough', 'too many', 'enough much'], answer: 'too', explain: 'Exceso de precio: too expensive.' },
      { scene: 'Tiempo', prompt: 'Do we have ___ time to finish?', options: ['enough', 'time enough', 'too many', 'enoughly'], answer: 'enough', explain: 'Enough + sustantivo.' },
    ],
    dual: [
      { scene: 'Viaje', prompt: 'The car is [[0]] small for six people, and there is not [[1]] space for the bags.', blanks: [{ options: ['too', 'enough', 'very'], answer: 'too', explain: 'Too small.' }, { options: ['enough', 'too', 'space enough'], answer: 'enough', explain: 'Enough space.' }] },
      { scene: 'Restaurante', prompt: 'There are [[0]] customers and not [[1]] waiters.', blanks: [{ options: ['too many', 'too much', 'enough'], answer: 'too many', explain: 'Customers: contable.' }, { options: ['enough', 'too much', 'waiters enough'], answer: 'enough', explain: 'Enough waiters.' }] },
      { scene: 'Curso', prompt: 'The explanation is clear [[0]], but the video is [[1]] long.', blanks: [{ options: ['enough', 'too', 'enough clear'], answer: 'enough', explain: 'Clear enough.' }, { options: ['too', 'enough', 'too much'], answer: 'too', explain: 'Too long.' }] },
      { scene: 'Café', prompt: 'There is [[0]] sugar in this coffee, but it is not hot [[1]].', blanks: [{ options: ['too much', 'too many', 'enough many'], answer: 'too much', explain: 'Sugar es incontable.' }, { options: ['enough', 'too', 'enough hot'], answer: 'enough', explain: 'Hot enough.' }] },
    ],
    guided: { scene: 'Preparando un evento', text: 'The first room was [[0]] small, so we changed it. The new room is large [[1]] for forty people. We have [[2]] chairs, but there are [[3]] tables in the centre. There is also [[4]] noise from the street. The sound system is powerful [[5]], and we have [[6]] time to test it.', blanks: [
      { options: ['too', 'enough', 'very enough'], answer: 'too', explain: 'Too small.' }, { options: ['enough', 'too', 'enough large'], answer: 'enough', explain: 'Large enough.' }, { options: ['enough', 'too much', 'chairs enough'], answer: 'enough', explain: 'Enough chairs.' }, { options: ['too many', 'too much', 'enough much'], answer: 'too many', explain: 'Tables: contable.' }, { options: ['too much', 'too many', 'enough many'], answer: 'too much', explain: 'Noise: incontable.' }, { options: ['enough', 'too', 'enough powerful'], answer: 'enough', explain: 'Powerful enough.' }, { options: ['enough', 'too many', 'time enough'], answer: 'enough', explain: 'Enough time.' },
    ] },
    free: { scene: 'Mudanza', text: 'The old lift is [[0]] (exceso) small for the sofa. The stairs are wide [[1]] (suficiencia), but we do not have [[2]] people to help. There are [[3]] boxes in the hall and [[4]] furniture in the doorway.', blanks: [
      { answer: 'too', explain: 'Too small.' }, { answer: 'enough', explain: 'Wide enough.' }, { answer: 'enough', explain: 'Enough people.' }, { answer: 'too many', explain: 'Boxes: contable.' }, { answer: 'too much', explain: 'Furniture: incontable.' },
    ] },
    write: [
      { scene: 'Consecuencia', prompt: 'Une: The box is very heavy. I cannot lift it. Usa too.', answer: 'The box is too heavy for me to lift.', accepted: ['too heavy'], explain: 'Too introduce el exceso.' },
      { scene: 'Suficiencia', prompt: 'Di que la mesa tiene el tamaño suficiente para seis personas.', answer: 'The table is big enough for six people.', accepted: ['big enough'], explain: 'Adjetivo + enough.' },
      { scene: 'Cantidad', prompt: 'Di que no hay suficientes vasos.', answer: 'There are not enough glasses.', accepted: ['not enough'], explain: 'Enough antes del sustantivo.' },
      { scene: 'Corrección', prompt: 'Corrige: We have people enough.', answer: 'We have enough people.', accepted: ['enough people'], explain: 'Enough va antes de sustantivos.' },
    ],
    mission: [
      { scene: 'Tu ciudad', prompt: 'Describe un problema usando too many o too much.', answer: 'There is too much traffic and there are too many cars downtown.', accepted: ['too much', 'too many'], explain: 'Distingue incontable y contable.' },
      { scene: 'Compra', prompt: 'Explica por qué no compras algo usando too + adjective.', answer: 'The jacket is too expensive for me to buy.', accepted: ['too expensive'], explain: 'Exceso con consecuencia.' },
      { scene: 'Plan', prompt: 'Di qué recursos son suficientes y cuáles no.', answer: 'We have enough time, but we do not have enough money.', accepted: ['enough time', 'enough money'], explain: 'Enough + noun.' },
      { scene: 'Evaluación', prompt: 'Escribe una frase con adjective + enough.', answer: 'The instructions are clear enough to follow.', accepted: ['enough'], explain: 'Enough después del adjetivo.' },
    ],
  },
})

export const indefinitePronouns = createSupplementalTopic({
  slug: 'indefinite-pronouns', order: '23', color: '#0F766E', category: 'Pronouns', level: 'A2',
  title: 'Indefinite pronouns en inglés A2', shortTitle: 'Someone / Anyone / No one', metaTitle: 'Indefinite pronouns A2 | Someone, anyone, nobody, everything',
  description: 'Domina someone, anyone, no one, nobody, something, anything, nothing, somewhere y anywhere en contextos reales.',
  lead: 'Estas palabras combinan cantidad y referencia. La decisión depende de si la frase afirma, pregunta o niega y de si hablas de personas, cosas o lugares.',
  outcomes: ['Elegir -one/-body para personas, -thing para cosas y -where para lugares.', 'Usar some- en afirmativas y any- en preguntas y negativas.', 'Evitar dobles negaciones con nobody y nothing.'],
  guide: { goal: 'Referirse a personas, cosas y lugares no específicos sin crear dobles negaciones.', model: 'Someone called. / Did anyone call? / Nobody called.', formula: 'some/any/no/every + one/body/thing/where', decisions: ['-one/-body = persona.', '-thing = cosa o idea.', '-where = lugar.', 'Después de nobody/nothing usa verbo afirmativo.'], table: [['Base', 'Persona', 'Cosa'], ['some-', 'someone', 'something'], ['any-', 'anyone', 'anything'], ['no-', 'no one', 'nothing'], ['every-', 'everyone', 'everything']], mistakes: ['Decir nobody did not call: doble negación.', 'Usar someone en una pregunta neutral en lugar de anyone.', 'Confundir nothing con nobody.'] },
  seo: [
    { heading: 'La familia de los indefinite pronouns', paragraphs: ['Los elementos -one y -body se refieren a personas; -thing a cosas; -where a lugares. La primera parte indica cantidad o polaridad.', 'Someone y somebody significan prácticamente lo mismo; lo mismo ocurre con anyone/anybody y no one/nobody.'] },
    { heading: 'Some-, any- y no-', paragraphs: ['Some- aparece normalmente en afirmativas. Any- es frecuente en preguntas y negativas. No- ya contiene la negación.', 'En ofrecimientos y peticiones donde esperas un sí, some- puede aparecer en pregunta: Would you like something to drink?'], table: [['Afirmativa', 'Pregunta', 'Negativa'], ['Someone is here.', 'Is anyone here?', 'No one is here.'], ['I saw something.', 'Did you see anything?', 'I saw nothing.']] },
    { heading: 'Concordancia singular', paragraphs: ['Everyone, someone y nobody llevan verbo singular: Everyone is ready; Nobody knows.', 'Aunque everyone incluye a muchas personas, gramaticalmente funciona como singular.'] },
    { heading: 'Cómo evitar dobles negaciones', paragraphs: ['No combines nobody o nothing con not en inglés estándar. Elige una sola estrategia: I did not see anyone o I saw no one.', 'La forma española no vi a nadie usa dos elementos negativos, pero el inglés estándar usa solo uno.'] },
  ],
  visual: { mode: 'reference-grid', teacherLens: 'Primero decide persona, cosa o lugar; después decide afirmación, pregunta o negación.', graphicPrompt: 'Cuadrícula some/any/no/every por person/thing/place.', scene: [['someone', 'persona afirmativa'], ['anything', 'cosa en pregunta'], ['nowhere', 'ningún lugar'], ['everyone', 'todas las personas']], learnerModes: ['visual: cuadrícula', 'analítico: referencia y polaridad', 'oral: preguntas'], practiceVerbs: ['Clasifica', 'Combina', 'Lee', 'Produce', 'Corrige', 'Conversa'], reviewFocus: ['persona/cosa/lugar', 'afirmación', 'pregunta', 'negación'] },
  practice: {
    choice: [
      { scene: 'Teléfono', prompt: '___ called while you were out.', options: ['Someone', 'Anyone', 'Nothing', 'Anywhere'], answer: 'Someone', explain: 'Persona no específica en afirmativa.' },
      { scene: 'Pregunta', prompt: 'Did ___ leave a message?', options: ['anyone', 'someone', 'nothing', 'nowhere'], answer: 'anyone', explain: 'Pregunta neutral: anyone.' },
      { scene: 'Nevera', prompt: 'There is ___ to eat.', options: ['nothing', 'nobody', 'nowhere', 'anyone'], answer: 'nothing', explain: 'Cosa y negación.' },
      { scene: 'Viaje', prompt: 'We could not find ___ to stay.', options: ['anywhere', 'somewhere', 'anyone', 'anything'], answer: 'anywhere', explain: 'Lugar en oración negativa.' },
      { scene: 'Ofrecimiento', prompt: 'Would you like ___ to drink?', options: ['something', 'anything', 'nothing', 'someone'], answer: 'something', explain: 'Ofrecimiento con expectativa positiva.' },
      { scene: 'Reunión', prompt: '___ is ready, so we can start.', options: ['Everyone', 'Anyone', 'Nothing', 'Somewhere'], answer: 'Everyone', explain: 'Todas las personas.' },
      { scene: 'Puerta', prompt: 'There is ___ at the door.', options: ['somebody', 'something', 'somewhere', 'everything'], answer: 'somebody', explain: 'Persona en afirmativa.' },
      { scene: 'Respuesta', prompt: 'Who helped you? — ___. I did it alone.', options: ['No one', 'Anyone', 'Someone', 'Everything'], answer: 'No one', explain: 'Ninguna persona; verbo afirmativo.' },
    ],
    dual: [
      { scene: 'Oficina vacía', prompt: 'There is [[0]] here, and I cannot find [[1]] to ask.', blanks: [{ options: ['nobody', 'anybody', 'somebody'], answer: 'nobody', explain: 'Ninguna persona.' }, { options: ['anyone', 'someone', 'nothing'], answer: 'anyone', explain: 'Después de cannot: anyone.' }] },
      { scene: 'Un regalo', prompt: 'I bought [[0]] for Ana, but I did not tell [[1]].', blanks: [{ options: ['something', 'anything', 'nothing'], answer: 'something', explain: 'Cosa en afirmativa.' }, { options: ['anyone', 'someone', 'no one'], answer: 'anyone', explain: 'Negativa: anyone.' }] },
      { scene: 'Viaje', prompt: 'We want to go [[0]] quiet, but [[1]] is expensive this weekend.', blanks: [{ options: ['somewhere', 'anywhere', 'nowhere'], answer: 'somewhere', explain: 'Lugar afirmativo.' }, { options: ['everywhere', 'everyone', 'everything'], answer: 'everywhere', explain: 'Todos los lugares.' }] },
      { scene: 'Problema técnico', prompt: 'Is [[0]] wrong? — No, [[1]] is working.', blanks: [{ options: ['anything', 'something', 'nothing'], answer: 'anything', explain: 'Pregunta neutral.' }, { options: ['everything', 'anything', 'nobody'], answer: 'everything', explain: 'Todas las cosas/sistema.' }] },
    ],
    guided: { scene: 'Una mañana extraña', text: 'When I arrived, [[0]] was in the office. I called out, but [[1]] answered. There was [[2]] on the main desk: a small envelope. I looked [[3]] for a note, but I could not find [[4]]. Then [[5]] knocked on the door. It was the manager, and suddenly [[6]] made sense.', blanks: [
      { options: ['nobody', 'anybody', 'somebody'], answer: 'nobody', explain: 'Ninguna persona.' }, { options: ['no one', 'anyone', 'someone'], answer: 'no one', explain: 'No respondió ninguna persona.' }, { options: ['something', 'anything', 'nothing'], answer: 'something', explain: 'Objeto en afirmativa.' }, { options: ['everywhere', 'everyone', 'everything'], answer: 'everywhere', explain: 'Todos los lugares.' }, { options: ['anything', 'something', 'nothing'], answer: 'anything', explain: 'Negativa con could not.' }, { options: ['someone', 'anyone', 'nothing'], answer: 'someone', explain: 'Persona afirmativa.' }, { options: ['everything', 'everyone', 'everywhere'], answer: 'everything', explain: 'Toda la situación.' },
    ] },
    free: { scene: 'Fin de semana', text: 'I wanted to do [[0]] interesting, but [[1]] was available. I called three friends and [[2]] answered. I did not go [[3]], so I stayed home and watched [[4]] on TV.', blanks: [
      { answer: 'something', explain: 'Afirmativa: something.' }, { answer: 'nobody', accepted: ['no one'], explain: 'Ninguna persona disponible.' }, { answer: 'no one', accepted: ['nobody'], explain: 'Nadie respondió.' }, { answer: 'anywhere', explain: 'Negativa: anywhere.' }, { answer: 'something', explain: 'Una cosa no específica.' },
    ] },
    write: [
      { scene: 'Evita doble negación', prompt: 'Corrige: Nobody did not call me.', answer: 'Nobody called me.', accepted: ['nobody called'], explain: 'Nobody ya contiene la negación.' },
      { scene: 'Dos opciones', prompt: 'Reescribe I saw no one usando not + any-.', answer: 'I did not see anyone.', accepted: ['did not see anyone'], explain: 'Una sola negación.' },
      { scene: 'Lugar', prompt: 'Di que quieres ir a algún lugar tranquilo.', answer: 'I want to go somewhere quiet.', accepted: ['somewhere quiet'], explain: 'Somewhere + adjective.' },
      { scene: 'Pregunta', prompt: 'Pregunta si alguien necesita algo.', answer: 'Does anyone need anything?', accepted: ['anyone', 'anything'], explain: 'Pregunta neutral con any-.' },
    ],
    mission: [
      { scene: 'Casa vacía', prompt: 'Describe una casa vacía con nobody, nothing y nowhere.', answer: 'Nobody was there, there was nothing inside, and we had nowhere to sit.', accepted: ['nobody', 'nothing', 'nowhere'], explain: 'Integra las tres referencias.' },
      { scene: 'Evento', prompt: 'Escribe una frase con everyone y everything.', answer: 'Everyone arrived early and everything was ready.', accepted: ['everyone', 'everything'], explain: 'Concordancia singular.' },
      { scene: 'Conversación', prompt: 'Haz una pregunta con anyone y respóndela con someone.', answer: 'Did anyone call? Yes, someone left a message.', accepted: ['anyone', 'someone'], explain: 'Pregunta y afirmación.' },
      { scene: 'Tu día', prompt: 'Escribe dos frases verdaderas usando something y somewhere.', answer: 'I learned something useful and went somewhere new.', accepted: ['something', 'somewhere'], explain: 'Producción libre con cosa y lugar.' },
    ],
  },
})

export const infinitivePurpose = createSupplementalTopic({
  slug: 'infinitive-of-purpose', order: '24', color: '#2563EB', category: 'Verbs', level: 'A2',
  title: 'Infinitive of purpose en inglés A2', shortTitle: 'Infinitive of purpose', metaTitle: 'Infinitive of purpose A2 | To, in order to, so that',
  description: 'Explica para qué haces algo con to + verbo, in order to, so as to y so that, y aprende a distinguir propósito de causa en situaciones cotidianas.',
  lead: 'Cuando una acción responde “¿para qué?”, el inglés suele usar to + verbo. Es una estructura breve y muy frecuente en conversaciones, instrucciones y textos.',
  outcomes: ['Usar to + verbo para expresar propósito.', 'Evitar for + infinitive en traducciones literales.', 'Elegir so that cuando cambia el sujeto o necesitas un modal.'],
  guide: { goal: 'Explicar el propósito de una acción con una estructura natural.', model: 'I called to ask a question. / I wrote it down so that I would remember.', formula: 'action + to + base verb | action + so that + subject + modal', decisions: ['Usa to + verbo cuando el sujeto de ambas acciones es el mismo.', 'Usa so that + sujeto cuando necesitas una oración completa.', 'In order to es más formal o enfático.', 'No uses for + verbo base: for sirve antes de sustantivo o -ing con función.'], table: [['Estructura', 'Uso', 'Ejemplo'], ['to + verb', 'propósito directo', 'I went out to buy milk.'], ['in order to', 'formal/énfasis', 'We met early in order to prepare.'], ['so that + clause', 'sujeto/modal', 'I called so that she could join.']], mistakes: ['Decir I went for buy milk.', 'Usar to + sujeto: to she can come.', 'Confundir propósito con resultado.'] },
  seo: [
    { heading: 'To + verbo responde para qué', paragraphs: ['El infinitivo de propósito conecta una acción con su objetivo: I opened the window to get some air.', 'No describe una obligación ni un futuro; explica la razón práctica de la primera acción.'] },
    { heading: 'In order to y so as to', paragraphs: ['In order to hace el propósito más explícito y aparece con frecuencia en textos formales. So as to también es formal, especialmente en negativo: so as not to disturb anyone.', 'En conversación, to suele ser suficiente y más natural.'] },
    { heading: 'Cuándo usar so that', paragraphs: ['So that introduce una oración completa y permite cambiar de sujeto: I left a note so that Ana could find me.', 'También permite modales como can, could, will o would.'], table: [['Mismo sujeto', 'Sujeto diferente'], ['I study to improve.', 'I speak slowly so that everyone can understand.'], ['We left early to arrive on time.', 'We left early so that the children could rest.']] },
    { heading: 'For no va antes del infinitivo', paragraphs: ['For puede introducir un sustantivo: This tool is for cutting paper. Pero para expresar la intención de una persona, usa to cut.', 'La traducción literal para comprar produce for buy, que no es una estructura inglesa.'] },
  ],
  visual: { mode: 'goal-arrow', teacherLens: 'Una flecha conecta la acción con su objetivo: hago X para lograr Y.', graphicPrompt: 'Acción → objetivo con to + verbo.', scene: [['I called', 'to ask'], ['We left early', 'to arrive on time'], ['Speak slowly', 'so that everyone can follow']], learnerModes: ['visual: flecha', 'analítico: mismo sujeto', 'oral: explicar motivos'], practiceVerbs: ['Reconoce', 'Conecta', 'Lee', 'Produce', 'Corrige', 'Conversa'], reviewFocus: ['propósito', 'sujeto', 'modal', 'for vs to'] },
  practice: {
    choice: [
      { scene: 'Compra', prompt: 'I went to the shop ___ some bread.', options: ['to buy', 'for buy', 'buying to', 'to buying'], answer: 'to buy', explain: 'Propósito con to + verbo base.' },
      { scene: 'Llamada', prompt: 'She called me ___ a question.', options: ['to ask', 'for ask', 'asking', 'to asked'], answer: 'to ask', explain: 'Called to ask.' },
      { scene: 'Silencio', prompt: 'We whispered so that the baby ___ sleep.', options: ['could', 'to', 'for', 'is'], answer: 'could', explain: 'So that + sujeto + modal.' },
      { scene: 'Estudio', prompt: 'I am studying every day ___ my English.', options: ['to improve', 'for improve', 'to improving', 'improve to'], answer: 'to improve', explain: 'Objetivo del estudio.' },
      { scene: 'Formal', prompt: 'Please arrive early in order ___ the form.', options: ['to complete', 'for complete', 'completing', 'to completed'], answer: 'to complete', explain: 'In order to + base verb.' },
      { scene: 'Nota', prompt: 'I wrote it down so that I ___ forget.', options: ['would not', 'to not', 'not to', 'did not to'], answer: 'would not', explain: 'So that permite una oración completa.' },
      { scene: 'Ejercicio', prompt: 'This machine is used ___ coffee.', options: ['to make', 'for make', 'to making', 'made to'], answer: 'to make', explain: 'Propósito/función con to + verbo.' },
      { scene: 'Viaje', prompt: 'They left at six ___ traffic.', options: ['to avoid', 'for avoid', 'to avoided', 'avoiding to'], answer: 'to avoid', explain: 'Propósito del horario.' },
    ],
    dual: [
      { scene: 'Presentación', prompt: 'I opened the file [[0]] the figures and zoomed in so that everyone [[1]] see them.', blanks: [{ options: ['to check', 'for check', 'checking'], answer: 'to check', explain: 'Mismo sujeto.' }, { options: ['could', 'to', 'for'], answer: 'could', explain: 'So that + everyone + could.' }] },
      { scene: 'Aeropuerto', prompt: 'We arrived early [[0]] in, and we waited near the gate so that Ana [[1]] find us.', blanks: [{ options: ['to check', 'for checking', 'to checked'], answer: 'to check', explain: 'Propósito.' }, { options: ['could', 'to', 'would to'], answer: 'could', explain: 'Sujeto diferente.' }] },
      { scene: 'Clase', prompt: 'The teacher repeated the example [[0]] it clear and wrote it down so that we [[1]] copy it.', blanks: [{ options: ['to make', 'for make', 'making to'], answer: 'to make', explain: 'To make expresa objetivo.' }, { options: ['could', 'to', 'can to'], answer: 'could', explain: 'We could copy.' }] },
      { scene: 'Trabajo', prompt: 'I turned off notifications [[0]] focused and closed the door so that nobody [[1]] interrupt me.', blanks: [{ options: ['to stay', 'for stay', 'staying to'], answer: 'to stay', explain: 'Mismo sujeto.' }, { options: ['would', 'to', 'did to'], answer: 'would', explain: 'So that + nobody + would.' }] },
    ],
    guided: { scene: 'Preparando una entrevista', text: 'I read the company website [[0]] about its projects. I wrote notes [[1]] the key facts. I chose my clothes the night before so that I [[2]] feel rushed. I left home early [[3]] traffic. I carried a printed résumé [[4]] the interviewer a copy. I also turned off my phone so that it [[5]] ring. Finally, I took a deep breath [[6]] calm.', blanks: [
      { options: ['to learn', 'for learn', 'to learning'], answer: 'to learn', explain: 'Propósito.' }, { options: ['to remember', 'for remember', 'remembering to'], answer: 'to remember', explain: 'Mismo sujeto.' }, { options: ['would not', 'to not', 'did not to'], answer: 'would not', explain: 'So that + modal.' }, { options: ['to avoid', 'for avoid', 'to avoided'], answer: 'to avoid', explain: 'Objetivo.' }, { options: ['to give', 'for give', 'giving to'], answer: 'to give', explain: 'Objetivo de llevar.' }, { options: ['would not', 'to not', 'not to'], answer: 'would not', explain: 'So that it would not ring.' }, { options: ['to stay', 'for stay', 'staying'], answer: 'to stay', explain: 'Objetivo personal.' },
    ] },
    free: { scene: 'Un día productivo', text: 'I made a list [[0]] (organize) my day. I went to the library [[1]] (work) quietly. I used headphones so that I [[2]] (can) concentrate. I took short breaks [[3]] (avoid) fatigue and set an alarm so that I [[4]] (not/miss) my bus.', blanks: [
      { answer: 'to organize', explain: 'Propósito.' }, { answer: 'to work', explain: 'Propósito.' }, { answer: 'could', accepted: ['could', 'could concentrate'], explain: 'So that + modal.' }, { answer: 'to avoid', explain: 'Propósito.' }, { answer: 'would not miss', accepted: ['would not miss', "wouldn't miss"], explain: 'So that + would not.' },
    ] },
    write: [
      { scene: 'Une ideas', prompt: 'Une: I went online. I wanted to book a ticket.', answer: 'I went online to book a ticket.', accepted: ['to book'], explain: 'To + verbo expresa propósito.' },
      { scene: 'Sujeto diferente', prompt: 'Une: I spoke slowly. Everyone could understand.', answer: 'I spoke slowly so that everyone could understand.', accepted: ['so that', 'could understand'], explain: 'So that permite sujeto diferente.' },
      { scene: 'Corrección', prompt: 'Corrige: She called for ask about the course.', answer: 'She called to ask about the course.', accepted: ['to ask'], explain: 'No for + verbo base.' },
      { scene: 'Formal', prompt: 'Reescribe con in order to: We met early to prepare.', answer: 'We met early in order to prepare.', accepted: ['in order to'], explain: 'Alternativa formal.' },
    ],
    mission: [
      { scene: 'Tu estudio', prompt: 'Explica dos cosas que haces para aprender inglés.', answer: 'I watch videos to improve my listening and write examples to remember new words.', accepted: ['to improve', 'to remember'], explain: 'Dos propósitos reales.' },
      { scene: 'Trabajo', prompt: 'Describe una acción y su propósito con so that.', answer: 'I send a summary so that everyone can follow the plan.', accepted: ['so that'], explain: 'Oración completa de propósito.' },
      { scene: 'Viaje', prompt: 'Escribe dos preparativos usando to + verbo.', answer: 'I check the weather to pack well and leave early to avoid traffic.', accepted: ['to pack', 'to avoid'], explain: 'Propósitos del viaje.' },
      { scene: 'Consejo', prompt: 'Da un consejo con in order to.', answer: 'Practise a little every day in order to build a strong habit.', accepted: ['in order to'], explain: 'Propósito explícito.' },
    ],
  },
})
