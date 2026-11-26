import { normalizeIeltsGuidedAnswer, type IeltsGuidedObjectiveItem } from './guided-mock.ts';
import type { GuidedLearningFeedback } from './guided-learning-types.ts';

const route = '/practica/ielts/listening';
const links = {
  form: { href: `${route}#form-completion`, label: 'Practicar con casillas y tablas' },
  sentence: { href: `${route}#sentence-completion`, label: 'Completar una frase con lo que oyes' },
  short: { href: `${route}#short-answers`, label: 'Practicar respuestas breves' },
  choice: { href: `${route}#multiple-choice`, label: 'Comparar opciones al escuchar' },
  match: { href: `${route}#matching`, label: 'Seguir quién hace o dice cada cosa' },
  map: { href: `${route}#map-labelling`, label: 'Seguir una ruta en un plano' },
  review: { href: `${route}#review-errors`, label: 'Revisar el momento de la confusión' },
};

type ClipNote = { cue: string; reason: string; retry: string };

// Some approved windows contain only a question, a homophone or a nearby use of
// the same word. Notes point back to the complete recording in those cases.
// The cue also prevents a note from applying after a recording is replaced.
const clipNotes: Record<string, ClipNote> = {
  '1/1': {
    cue: 'Ardley Road',
    reason: 'La dirección ya tiene número y tipo de vía. Falta el nombre propio. El fragmento recoge su pronunciación y la transcripción lo representa como “Ardley”. La grafía aceptada para esta dirección es “Ardleigh”. El sonido aislado admite ambas lecturas.',
    retry: 'Escucha la dirección completa. Cuando un nombre resulte ambiguo, busca si el interlocutor lo deletrea antes de cerrarlo por escrito.',
  },
  '1/7': {
    cue: '2,020 kilometers',
    reason: 'En la misma frase oyes cuánto dura el viaje y qué distancia cubre. “Lasts 12 days” completa la duración, que ya figura en la fila. “Covers 2,020 kilometers” aporta el dato que falta en la columna de distancia.',
    retry: 'Repite el clip una vez atendiendo solo a las unidades. Después escribe la cantidad que va con “kilometers”.',
  },
  '1/8': {
    cue: 'accommodation, car rental and a flight',
    reason: 'La grabación incluye alojamiento, alquiler de coche y un vuelo en el precio. El encabezado “Includes” permite entender más de una de esas cosas. En esta casilla el corrector espera “flight”. Si oíste “accommodation”, también reconociste un elemento que el hablante sí incluye.',
    retry: 'Vuelve a escuchar la enumeración completa hasta “but no meals”. Distingue qué queda dentro y qué queda fuera del precio antes de comparar la clave de este ejercicio.',
  },
  '1/21': {
    cue: 'Does it have to save energy',
    reason: 'Aquí se presenta el concurso y alguien pregunta si hay que ahorrar energía. Una pregunta del interlocutor aún deja abierta la condición. La clave se refiere a darle un uso nuevo a tecnología que ya existe.',
    retry: 'En el audio completo, continúa más allá de la pregunta sobre energía. Escucha qué condición confirma la persona que responde.',
  },
  '2/3': {
    cue: 'court three',
    reason: 'En el recorte se oyen la pista y dos horas. Ninguna de esas cifras cuenta a los jugadores. En la grabación completa, el cliente contesta a continuación que son cuatro. El cuatro de “4 o’clock” también se oye, pero describe una hora.',
    retry: 'Sigue el audio completo hasta que hable el cliente. Espera a oír la palabra que indica a quiénes se está contando.',
  },
  '2/8': {
    cue: 'half pass 2',
    reason: 'La hora se expresa como “half past two”. La transcripción automática la representa como “Half Pass 2”. El cliente había pedido la tarde, de modo que puedes anotar la media hora en formato de doce o de veinticuatro horas.',
    retry: 'Escucha la expresión completa, convierte “half past” en treinta minutos y comprueba de qué entrenadora se está hablando.',
  },
  '2/9': {
    cue: '30 minutes or a full hour',
    reason: 'La recepcionista ofrece dos duraciones. El clip termina en esa pregunta. La casilla pide cuánto reservaron y la respuesta del cliente en la grabación completa confirma una hora.',
    retry: 'Deja correr el audio completo un turno más. Imagina que vas a cerrar la reserva y espera la elección del cliente antes de anotar la duración.',
  },
  '2/21': {
    cue: 'Real-world examples',
    reason: 'Sarah explica qué le falta al trabajo. Dice que ya usaron demasiadas estadísticas y que los ejemplos reales harían más convincente el argumento. Eso da una razón concreta para añadir estudios de caso.',
    retry: 'Escucha por separado lo que los estudiantes ya hicieron y lo que Sarah propone incorporar. La pregunta pide lo segundo.',
  },
  '2/23': {
    cue: 'Adding a new section',
    reason: '“I think revise” expresa la elección. Tom menciona añadir una sección después, como explicación de por qué el informe podría quedar demasiado largo. Es posible oír toda una opción justo cuando se está descartando.',
    retry: 'Detén el clip mentalmente después de “revise”. Al reanudarlo, escucha si la segunda frase cambia la decisión o da el motivo.',
  },
  '2/32': {
    cue: 'Each individual coral is called a polyp',
    reason: 'El clip define un coral individual como “a polyp”. La nota se refiere a varios corales. La grabación completa continúa con “Polyps secrete”, donde puedes oír la forma plural que encaja en esa nota.',
    retry: 'Deja correr el audio una frase más. Compara la última palabra de la definición con la primera de la frase siguiente.',
  },
  '3/2': {
    cue: 'Berkeley Street',
    reason: 'Aquí falta únicamente el nombre de la calle. El texto del recorte lo representa como “Berkeley”. La dirección de referencia de esta pregunta se escribe “Berkley”. Puedes reconocer el sonido y aun así dudar entre las dos grafías.',
    retry: 'Escucha la dirección sin copiar todo el código postal. Comprueba por separado la grafía del nombre que falta en el formulario.',
  },
  '3/8': {
    cue: 'Can I also reserve books online',
    reason: 'La pregunta que oyes abre el tema de las reservas por internet. La tabla pide el medio concreto. La respuesta del empleado en la grabación completa especifica que las reservas se hacen a través de la página web.',
    retry: 'Deja terminar la pregunta y sigue con el turno del empleado. Presta atención al sustantivo que viene después de “through our”.',
  },
  '3/18': {
    cue: 'time of day',
    reason: 'La frase del recorte habla de horarios y visitantes. Esa observación general no identifica el contenedor de la casilla. En la grabación completa, la instrucción sobre el vidrio nombra el contenedor de reciclaje mixto.',
    retry: 'Vuelve a la parte de la charla que explica dónde llevar el vidrio y escucha el nombre que sigue a “mixed”.',
  },
  '4/8': {
    cue: 'send them by email',
    reason: 'El estudiante pregunta si puede enviar los documentos por correo electrónico. Todavía falta la dirección de destino. La casilla pide esa dirección completa, incluido el dominio.',
    retry: 'Continúa en la grabación completa hasta la respuesta del empleado. Separa mentalmente lo que va antes y después de la arroba.',
  },
  '4/28': {
    cue: 'time constraints',
    reason: 'James llama práctica a la encuesta porque el equipo tiene poco tiempo. Luego enumera variables que tendrían que controlar. Esas precauciones forman parte del diseño, pero aquí se pregunta por qué eligió ese método.',
    retry: 'Haz una pausa mental en “but”. Antes de ese giro queda explicado el motivo para usar una encuesta.',
  },
  '4/29': {
    cue: 'time constraints',
    reason: 'La pregunta te lleva a la segunda mitad de la misma intervención. “We’d need to control for” abre una lista de tres factores. La falta de tiempo explicaba la elección del método en la primera mitad.',
    retry: 'Empieza en “control for” y cuenta las tres variables hasta la referencia al apoyo social fuera de internet.',
  },
  '4/30': {
    cue: "include both",
    reason: 'La objeción a los autoinformes puede hacerte pensar que van a sustituirlos. “Let’s include both” declara el acuerdo final. Los estudiantes añaden los resúmenes semanales del teléfono y también conservan los autoinformes.',
    retry: 'Escucha el cambio entre la crítica y la decisión. ¿Qué dos fuentes quedan dentro de “both”?',
  },
  '6/18': {
    cue: 'One small practical point',
    reason: 'Esta frase anuncia un detalle práctico. El clip termina antes del dato que pide la casilla. En el audio completo el guía indica qué moneda se usa en las taquillas.',
    retry: 'Busca la frase que empieza con “The lockers require” en la grabación completa. Escucha la cantidad junto a “coin”.',
  },
  '7/1': {
    cue: 'Could you spell that for me',
    reason: 'El sonido final del apellido deja dudas sobre la última letra. La transcripción del clip muestra “Whitcomb”. El formulario acepta “Whitcombe”. Al final del fragmento, el empleado pide que lo deletreen.',
    retry: 'Sigue en la grabación completa desde la petición de deletreo. Contrasta las letras que oyes con el apellido que escribiste.',
  },
  '7/34': {
    cue: 'vivid dreaming',
    reason: 'El fragmento habla de la actividad muscular durante los sueños. La nota, en cambio, describe qué reconstruye el cuerpo durante el sueño profundo. La palabra relacionada aparece en ambos pasajes con una función distinta.',
    retry: 'En el audio completo, vuelve al sueño profundo y sigue la frase desde “rebuilds” hasta la mención de la hormona de crecimiento.',
  },
  '9/1': {
    cue: 'my surname is Whitcomb',
    reason: 'Rebecca distingue su nombre de su apellido. El recorte representa el apellido como “Whitcomb”. La grafía aceptada en esta reserva es “Whitcombe”. Esa e final no se deduce con certeza de la pronunciación aislada.',
    retry: 'Busca el tramo del audio completo en que se comprueba el apellido y coteja la secuencia de letras con el formulario.',
  },
  '9/2': {
    cue: '077-34',
    reason: 'El fragmento reproduce un número de contacto. La reserva pide otra cantidad en esta casilla, la duración de la estancia. En la conversación completa el cliente dice cuántas noches se quedará.',
    retry: 'Busca el turno sobre la llegada del jueves. Escucha la cantidad ligada a “nights” antes de escribir.',
  },
  '10/34': {
    cue: 'long journey ahead',
    reason: 'En el fragmento, “the long journey ahead” explica para qué sirve la energía almacenada. La nota pregunta por la comparación de los viajes de las ballenas grises con los de otros mamíferos.',
    retry: 'Vuelve en la charla completa a “Grey whales, for example” y escucha el sustantivo que acompaña a “some of the longest”.',
  },
  '14/39': {
    cue: 'fought currency',
    reason: 'El término económico de la charla es “fiat currency”. El texto automático del recorte representa el primer término como “fought”. La casilla ya contiene “currency”, así que la clave conserva solo “fiat”.',
    retry: 'Escucha la explicación que sigue al término en el audio completo. El hablante aclara de qué depende el valor de ese dinero y así puedes reconocer el concepto.',
  },
  '17/5': {
    cue: 'Make it the afternoon',
    reason: 'La clienta empieza pidiendo la mañana. “Actually, no” retira esa preferencia, y “make it the afternoon” da la franja que quiere reservar.',
    retry: 'Escucha las dos preferencias y deja que termine la corrección antes de apuntar la cita.',
  },
  '17/7': {
    cue: 'two maintenance plans',
    reason: 'Ese “two” cuenta los planes de mantenimiento disponibles. La columna pide cuántas visitas incluye cada año el plan básico. El agente da esa frecuencia al continuar la descripción.',
    retry: 'Sigue la grabación completa desde “the basic plan” hasta “visits a year”. Comprueba a qué sustantivo pertenece cada cifra.',
  },
  '20/3': {
    cue: 'questions 6 to 10',
    reason: 'Los números de este fragmento indican qué preguntas hay que leer a continuación. La casilla pide la cantidad de personas que utilizarán la sala. Las instrucciones de la grabación y la conversación cumplen funciones distintas.',
    retry: 'Vuelve a la reserva en el audio completo y escucha cuántos serán en total cuando el estudiante describe al grupo.',
  },
  '20/31': {
    cue: 'extra cocoa butter',
    reason: 'Aquí se oye “cocoa butter” al describir cómo se fabrica una tableta. La nota pide el árbol de cuyas semillas procede el chocolate. El parecido entre los términos puede llevarte a la parte equivocada de la charla.',
    retry: 'En la introducción de la charla completa, escucha qué nombre aparece entre la referencia a las semillas y la palabra “tree”.',
  },
};

// These three explanations follow the independently reviewed distractors for
// Set 2 Q21. Display letters can change when the canonical options are ordered.
const windProjectChoices: Record<string, string> = {
  'Replace the solar-power discussion.': 'Tom dice que a la profesora le gustó la parte solar. La petición de más apoyo se refiere al argumento sobre energía eólica. Sarah propone añadir estudios de caso a ese argumento.',
  'Shorten the section substantially.': 'Sarah pide más ejemplos reales para apoyar la discusión. En esta intervención no propone recortarla. Al oír “too much”, escucha qué viene después: habla de la proporción de estadísticas.',
  'Move the section into the conclusion.': 'Aquí Sarah habla de ejemplos para la sección sobre energía eólica. Los estudiantes comentan la conclusión por separado. Trasladar una sección sería una decisión distinta de reforzarla con ejemplos.',
};

function wording(value: string) {
  return value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

function mentioned(text: string, phrase: string) {
  const clean = wording(phrase);
  return clean.length > 0 && ` ${wording(text)} `.includes(` ${clean} `);
}

function optionText(item: IeltsGuidedObjectiveItem, value: string) {
  const choice = item.options?.find(option => option.split(' · ')[0].toLowerCase() === value.trim().toLowerCase());
  return (choice ?? value).replace(/^[A-Z]\s*·\s*/, '').trim();
}

function chosenOption(item: IeltsGuidedObjectiveItem, entry: string) {
  const value = normalizeIeltsGuidedAnswer(entry);
  return item.options?.find(option => [option, option.split(' · ')[0], optionText(item, option)]
    .some(form => normalizeIeltsGuidedAnswer(form) === value));
}

function evidenceLine(item: IeltsGuidedObjectiveItem, phrase: string) {
  const terms = new Set(wording([item.frame, item.prompt, ...item.accepted.map(value => optionText(item, value))].join(' ')).split(' ').filter(word => word.length >= 4));
  const sentences = phrase.split(/(?<=[.!?])\s+(?=[A-Z])/u);
  let best = sentences[0];
  let high = -1;
  for (const sentence of sentences) {
    const words = wording(sentence).split(' ');
    const overlap = new Set(words.filter(word => terms.has(word))).size;
    const direct = item.accepted.some(value => value.length > 1 && mentioned(sentence, optionText(item, value)));
    const score = overlap + (direct ? 10 : 0);
    if (score > high) { high = score; best = sentence; }
  }
  return best;
}

function wordLimitExceeded(item: IeltsGuidedObjectiveItem, submitted: string) {
  const printed = item.prompt.match(/\b(ONE|TWO|THREE) WORDS?\b/i);
  const counts: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3 };
  const limit = printed ? counts[printed[1].toUpperCase()] : item.maxWords;
  if (!limit) return false;
  // A separately permitted numeral, including its punctuation, does not consume a word.
  const tokens = submitted.trim().split(/\s+/);
  const words = /AND\/OR A NUMBER/i.test(item.prompt)
    ? tokens.filter(token => !/^[£$€+]?\d[\d,.():/-]*%?$/u.test(token))
    : tokens;
  return words.length > limit;
}

function pluralDifference(entered: string, acceptable: readonly string[]) {
  const stem = (word: string) => word.replace(/ies$/i, 'y').replace(/(ch|sh|ss|x|z)es$/i, '$1').replace(/([^s])s$/i, '$1');
  return acceptable.some(answer => answer !== entered && stem(answer) === stem(entered));
}

function closeSpelling(entered: string, acceptable: readonly string[]) {
  if (!/^[a-z]{4,40}$/i.test(entered)) return false;
  return acceptable.some(target => {
    if (!/^[a-z]{4,40}$/i.test(target) || target === entered) return false;
    if (target.length === entered.length) {
      const different = [...target].flatMap((letter, index) => letter === entered[index] ? [] : [index]);
      if (different.length === 1) return true;
      const [a, b] = different;
      return different.length === 2 && b === a + 1 && entered[a] === target[b] && entered[b] === target[a];
    }
    if (Math.abs(target.length - entered.length) !== 1) return false;
    const [longer, shorter] = target.length > entered.length ? [target, entered] : [entered, target];
    return [...longer].some((_, index) => longer.slice(0, index) + longer.slice(index + 1) === shorter);
  });
}

function direction(item: IeltsGuidedObjectiveItem) {
  const field = item.frame;
  if (/email|e-mail|post\s?code|surname|address|telephone|phone number|contact number/i.test(field)) {
    return 'Escucha el dato por grupos. Si lo deletrean o lo repiten, usa esa segunda mención para comprobar cada letra o cifra.';
  }
  if (/£|\$|price|fee|fare|cost|deposit|discount|charge/i.test(field)) {
    return 'Vuelve a oír lo que sigue a la cantidad. Comprueba si es un precio por unidad, un total o una tarifa con una condición.';
  }
  if (/time|hours?|minutes?|days?|nights?|date|weekday|weekend|months?|start|finish/i.test(field)) {
    return 'Escucha la unidad junto al dato y vuelve al encabezado de la casilla. Distingue cuándo ocurre algo de cuánto dura.';
  }
  if (field.includes(' · ')) return 'Recorre primero la fila y luego la columna. En la repetición, espera a que el hablante llegue a esa combinación concreta.';
  return 'Reproduce la frase y detente justo después del dato. Vuelve a leer la casilla con tu respuesta para comprobar qué aporta cada palabra.';
}

export function getListeningLearningFeedback(
  item: IeltsGuidedObjectiveItem, submitted: string, correct: boolean, setNumber: number,
): GuidedLearningFeedback | null {
  const clip = item.audioClip;
  if (typeof submitted !== 'string' || !submitted.trim() || !item.id.startsWith('listening-') || item.evidence.status !== 'approved-excerpt' || !clip
      || !Number.isFinite(clip.startSeconds) || !Number.isFinite(clip.endSeconds)
      || clip.startSeconds < 0 || clip.endSeconds <= clip.startSeconds
      || !clip.audiblePhrase.trim() || clip.audiblePhrase.trim() !== item.evidence.focus.trim()) return null;

  const picked = optionText(item, submitted).slice(0, 180);
  const attempt = !correct && picked ? `${item.kind === 'choice' ? 'Elegiste' : 'Escribiste'} «${picked}». ` : '';
  const phrase = clip.audiblePhrase.trim();
  const note = clipNotes[`${setNumber}/${item.number}`];
  if (note && phrase.toLowerCase().includes(note.cue.toLowerCase())) {
    if (setNumber === 1 && item.number === 8 && /accommodation, car rental and a/i.test(item.frame)) {
      return {
        reason: attempt + 'El alojamiento y el alquiler de coche ya están impresos. La persona enumera esas dos cosas y cierra con “and a flight”. La casilla guiada deja sitio para el tercer elemento.',
        retry: 'Sigue la lista con la vista al escuchar. Cuando llegues a “and a”, escribe qué incluye además el viaje.',
        link: links.form,
      };
    }
    const option = !correct && setNumber === 2 && item.number === 21 ? chosenOption(item, submitted) : undefined;
    const selected = option ? optionText(item, option) : '';
    const reason = Object.hasOwn(windProjectChoices, selected) ? windProjectChoices[selected] : note.reason;
    return { reason: attempt + reason, retry: note.retry, link: links.review };
  }

  const line = evidenceLine(item, phrase);
  if (item.scoringGroup) {
    const acceptedInGroup = item.scoringGroup.targets.some(target => target.includes(normalizeIeltsGuidedAnswer(submitted)));
    const reason = !correct && acceptedInGroup
      ? `«${picked}» es una respuesta válida del grupo. Repetirla ocupa dos casillas y solo suma una vez. En este clip puedes comprobar una de las ideas del grupo al oír «${line}».`
      : `${attempt}La consigna «${item.prompt}» pide ${item.scoringGroup.targets.length} respuestas diferentes. En este fragmento oyes «${line}». La idea que justifica una de ellas puede aparecer en el fragmento de la otra casilla, porque el orden de tus respuestas es libre.`;
    return { reason, retry: 'Escucha los clips del grupo y asocia un detalle distinto a cada elección. Antes de enviar, revisa que cada respuesta ocupe una sola casilla.', link: links.choice };
  }

  const type = item.questionType?.toLowerCase() ?? '';
  const spatial = /label the (?:map|plan|diagram)|which letter|where (?:is|are)|position|location on/i.test(`${item.prompt} ${item.frame}`);
  if (/map|diagram|plan.labell/.test(type) || /label the (?:map|plan|diagram)/i.test(item.prompt) || (item.visual && spatial)) {
    return {
      reason: `${attempt}Localiza «${item.frame}» en la imagen y escucha la relación que expresa «${line}». La posición marcada corresponde a «${item.answer}».`,
      retry: 'Pon el dedo en la referencia que menciona la voz. Sigue la dirección o la relación entre las partes y comprueba a qué punto llega la línea de la letra.',
      link: links.map,
    };
  }

  if (item.kind === 'choice') {
    const matching = type.includes('match') || /^match\b/i.test(item.prompt);
    const stem = matching ? item.frame : item.prompt;
    const target = optionText(item, item.answer);
    const cue = phrase.match(/\b(actually|instead|rather than|however|but|eventually|in the end|because)\b/i)?.[0];
    return {
      reason: `${attempt}Para «${stem}», compara «${target}» con la intervención «${line}». ${matching ? 'Escucha a quién o a qué elemento se atribuye esa idea.' : 'Vuelve al verbo de la pregunta para decidir qué relación entre esas ideas te pide reconocer.'}`,
      retry: cue
        ? `Al oír «${cue}», conserva la idea anterior en la memoria y escucha cómo sigue. Decide cuál de las dos responde a la pregunta.`
        : 'Repite el fragmento con las opciones tapadas. Explica con tus palabras qué afirma la voz y vuelve a comparar las opciones.',
      link: matching ? links.match : links.choice,
    };
  }

  const response = normalizeIeltsGuidedAnswer(submitted);
  const frame = item.frame;
  const focus = `La casilla dice «${frame}». En el fragmento oyes «${line}».`;
  const link = /short.answer/.test(type) ? links.short : type.includes('sentence') ? links.sentence : links.form;
  if (!correct && response && wordLimitExceeded(item, submitted)) {
    return { reason: `${attempt}${focus} Tu entrada supera el límite de palabras impreso. Una forma admitida que cabe en el espacio es «${item.answer}».`, retry: 'Lee lo que ya aparece a ambos lados del hueco. Quita las palabras que la pregunta aporta y cuenta las que realmente vas a escribir.', link };
  }
  if (!correct && response && pluralDifference(response, item.accepted)) {
    return { reason: `${attempt}${focus} La forma que acepta esta casilla es «${item.answer}». La diferencia está en la terminación de la palabra.`, retry: 'Escucha el final del sustantivo junto a la palabra que lo acompaña. Lee la misma combinación en la nota y comprueba el singular o el plural.', link: links.sentence };
  }
  if (!correct && response && mentioned(phrase, submitted)) {
    const heardLine = phrase.split(/(?<=[.!?])\s+(?=[A-Z])/u).find(sentence => mentioned(sentence, submitted)) ?? phrase;
    return { reason: `${attempt}Esa expresión sí se oye en «${heardLine}». Para completar «${frame}», el dato que encaja es «${item.answer}». Comprueba qué describe cada uno dentro de la frase.`, retry: direction(item), link };
  }
  if (!correct && closeSpelling(response, item.accepted)) {
    return { reason: `${attempt}${focus} Compara tu grafía con «${item.answer}» letra por letra. La diferencia es pequeña y cambia lo que recibe el corrector.`, retry: 'Escribe la palabra una vez sin mirar. Luego coteja el orden de las letras con la forma aceptada y léela dentro de la frase.', link: links.review };
  }
  return {
    reason: `${attempt}${focus} ${correct ? `Tu forma «${picked}» encaja en el hueco.` : `La forma que encaja en la nota es «${item.answer}».`}`,
    retry: direction(item),
    link,
  };
}
