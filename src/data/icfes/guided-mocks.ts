import type { MockExam, MockSection, MCQQuestion } from '@/data/mocks/types';
import { getMock } from '@/data/mocks';
import type { IcfesPracticeQuestion } from './questions';
import type { IcfesOfficialPart } from './parts';
import { GUIDED_MOCK_IDS } from './guided-registry';

export { GUIDED_MOCK_IDS } from './guided-registry';

const PART_PROFILE: Record<IcfesOfficialPart, Pick<IcfesPracticeQuestion, 'skill' | 'type' | 'targetSeconds' | 'reinforcement'>> = {
  1: { skill: 'vocabulary_basic', type: 'word-match', targetSeconds: 30, reinforcement: { label: 'Reforzar vocabulario', href: '/practica/icfes-saber-11/vocabulario' } },
  2: { skill: 'functional_texts', type: 'notice', targetSeconds: 35, reinforcement: { label: 'Practicar avisos', href: '/practica/icfes-saber-11/parte-2' } },
  3: { skill: 'dialogue_completion', type: 'dialogue', targetSeconds: 35, reinforcement: { label: 'Practicar conversaciones', href: '/practica/icfes-saber-11/parte-3' } },
  4: { skill: 'grammar_recognition', type: 'grammar-cloze', targetSeconds: 45, reinforcement: { label: 'Reforzar gramática', href: '/practica/icfes-saber-11/gramatica-conjunciones' } },
  5: { skill: 'literal_reading', type: 'reading', targetSeconds: 60, reinforcement: { label: 'Practicar lectura literal', href: '/practica/icfes-saber-11/parte-5' } },
  6: { skill: 'inferential_reading', type: 'reading', targetSeconds: 75, reinforcement: { label: 'Reforzar inferencia', href: '/practica/icfes-saber-11/sinonimos-inferencia' } },
  7: { skill: 'vocabulary_context', type: 'lexical-cloze', targetSeconds: 50, reinforcement: { label: 'Reforzar cloze', href: '/practica/icfes-saber-11/parte-7' } },
};

const VOCABULARY_GLOSSES: Record<string, string> = {
  cough: 'la tos: el sonido que haces al expulsar aire porque la garganta está irritada',
  fever: 'la fiebre: una temperatura corporal más alta de lo normal',
  headache: 'el dolor de cabeza',
  medicine: 'un medicamento que se toma para tratar una enfermedad o aliviar síntomas',
  rash: 'un sarpullido: manchas o irritación visibles sobre la piel',
  sneeze: 'un estornudo: la expulsión repentina de aire por la nariz y la boca',
  wound: 'una herida: una zona de piel cortada o lesionada',
  arrival: 'la llegada: el momento en que alguien o algo alcanza su destino',
  departure: 'la salida: el momento en que comienza un viaje o se abandona un lugar',
  journey: 'el viaje o trayecto entre un lugar y otro',
  luggage: 'el equipaje: las maletas y bolsos que una persona lleva al viajar',
  platform: 'el andén: la zona elevada junto a la vía donde se espera y se aborda un tren',
  ticket: 'el tiquete o boleto que autoriza un viaje o una entrada',
  vehicle: 'un vehículo: una máquina usada para transportar personas o mercancías',
  ankle: 'el tobillo: la articulación que une el pie con la pierna',
  elbow: 'el codo: la articulación situada en la mitad del brazo',
  knee: 'la rodilla: la articulación situada en la mitad de la pierna',
  shoulder: 'el hombro: la zona que une la parte superior del brazo con el torso',
  throat: 'la garganta: el conducto detrás de la boca por donde pasan el aire y los alimentos',
  wrist: 'la muñeca: la articulación que une la mano con el antebrazo',
  chest: 'el pecho: la parte frontal superior del torso, donde están el corazón y los pulmones',
  assignment: 'una tarea académica asignada por un profesor para completar fuera o dentro de clase',
  classroom: 'un salón de clase donde estudiantes y docentes realizan actividades de aprendizaje',
  dictionary: 'un diccionario que explica el significado, uso o traducción de palabras',
  essay: 'un ensayo: un texto organizado que desarrolla y sustenta una idea',
  laboratory: 'un laboratorio equipado para realizar experimentos y observaciones',
  subject: 'una asignatura o área de estudio, como matemáticas o ciencias',
  timetable: 'un horario que muestra a qué hora ocurre cada clase o actividad',
  bake: 'hornear: cocinar un alimento con calor seco dentro de un horno',
  boil: 'hervir: cocinar o calentar un líquido hasta que produce burbujas',
  chop: 'picar: cortar un alimento en trozos pequeños, generalmente irregulares',
  fry: 'freír: cocinar un alimento en aceite o grasa caliente',
  mix: 'mezclar: combinar dos o más ingredientes',
  peel: 'pelar: quitar la piel o cáscara exterior de un alimento',
  slice: 'cortar en tajadas o láminas relativamente delgadas',
  drought: 'una sequía: un periodo prolongado con muy poca lluvia',
  flood: 'una inundación: agua que cubre un terreno que normalmente está seco',
  forest: 'un bosque: una extensión de tierra cubierta principalmente por árboles',
  pollution: 'la contaminación: sustancias o residuos que dañan el ambiente',
  recycle: 'reciclar: procesar materiales usados para convertirlos en nuevos productos',
  soil: 'el suelo o la tierra donde crecen las plantas',
  wildlife: 'la vida silvestre: animales y plantas que viven en su ambiente natural',
  battery: 'una batería: el componente que almacena y suministra energía a un dispositivo',
  cable: 'un cable que conecta dispositivos o transporta electricidad o datos',
  keyboard: 'un teclado usado para introducir letras, números y comandos',
  password: 'una contraseña secreta utilizada para acceder a una cuenta o dispositivo',
  screen: 'una pantalla donde un dispositivo muestra imágenes, texto o video',
  software: 'el conjunto de programas e instrucciones que utiliza un dispositivo',
  storage: 'el espacio donde un dispositivo guarda archivos y datos',
  balcony: 'un balcón: una plataforma exterior elevada unida a un edificio',
  ceiling: 'el techo interior que forma la superficie superior de una habitación',
  curtain: 'una cortina: una pieza de tela que cubre una ventana',
  garage: 'un garaje: un espacio cubierto destinado a guardar vehículos',
  hallway: 'un pasillo interior que conecta habitaciones o zonas de un edificio',
  shelf: 'un estante horizontal donde se colocan libros u objetos',
  stairs: 'unas escaleras: una serie de peldaños para subir o bajar entre niveles',
  applicant: 'una persona que solicita formalmente un empleo, curso u oportunidad',
  colleague: 'un colega: una persona con quien se trabaja',
  contract: 'un contrato: un acuerdo formal que establece obligaciones y condiciones',
  interview: 'una entrevista en la que se hacen preguntas para evaluar a una persona',
  overtime: 'horas extra trabajadas además del horario habitual',
  resume: 'una hoja de vida que resume educación, experiencia y habilidades',
  salary: 'un salario: el pago regular recibido por realizar un trabajo',
  bargain: 'una ganga: un producto cuyo precio resulta especialmente conveniente',
  cashier: 'un cajero o cajera que recibe pagos en una tienda',
  discount: 'un descuento: una reducción aplicada al precio normal',
  exchange: 'un cambio de producto por otro después de una compra',
  receipt: 'un recibo que demuestra qué se compró, cuándo y por cuánto dinero',
  refund: 'un reembolso: la devolución del dinero pagado',
  voucher: 'un vale o cupón que puede utilizarse como pago o descuento',
  captain: 'el capitán o capitana que lidera a un equipo',
  champion: 'un campeón: la persona o equipo que gana una competición',
  compete: 'competir: participar intentando superar a otros',
  defeat: 'derrotar o vencer a un oponente',
  goalkeeper: 'el portero o arquero que protege la meta',
  trophy: 'un trofeo entregado como reconocimiento por una victoria',
  uniform: 'un uniforme: ropa distintiva que comparten los miembros de un equipo',
  beak: 'el pico duro que forma la boca de un ave',
  claw: 'una garra: una uña curva y afilada de ciertos animales',
  feather: 'una pluma que cubre el cuerpo de un ave',
  fin: 'una aleta que ayuda a un animal acuático a moverse',
  fur: 'el pelaje: pelo espeso que cubre el cuerpo de ciertos mamíferos',
  scales: 'escamas: pequeñas placas que protegen la piel de peces y reptiles',
  tail: 'una cola: la prolongación posterior del cuerpo de muchos animales',
  canvas: 'un lienzo: una superficie de tela preparada para pintar',
  exhibit: 'una pieza u objeto presentado al público en una exposición',
  gallery: 'una galería: un espacio donde se exhiben obras de arte',
  melody: 'una melodía: una secuencia reconocible de notas musicales',
  portrait: 'un retrato: una representación artística de una persona',
  rhythm: 'el ritmo: el patrón de tiempos y acentos de la música',
  sculpture: 'una escultura: una obra tridimensional tallada, modelada o construida',
  blizzard: 'una tormenta de nieve intensa con viento fuerte y poca visibilidad',
  breeze: 'una brisa: un viento suave',
  fog: 'la niebla: pequeñas gotas suspendidas que reducen la visibilidad',
  hail: 'el granizo: bolas de hielo que caen durante ciertas tormentas',
  lightning: 'el relámpago: una descarga eléctrica visible en la atmósfera',
  thunder: 'el trueno: el sonido producido por una descarga eléctrica atmosférica',
  tornado: 'un tornado: una columna de aire que gira violentamente y toca el suelo',
  broadcast: 'una transmisión de audio o video enviada a una audiencia amplia',
  caption: 'un texto breve que acompaña y explica una imagen o publicación',
  comment: 'un comentario publicado como respuesta o reacción',
  follower: 'un seguidor: una persona que recibe las publicaciones de una cuenta',
  hashtag: 'una etiqueta iniciada con # que agrupa publicaciones sobre un tema',
  message: 'un mensaje enviado de una persona o cuenta a otra',
  profile: 'un perfil que reúne la identidad e información pública de una cuenta',
  border: 'una frontera: la línea que separa dos países o territorios',
  capital: 'una capital: la ciudad donde se ubica el gobierno principal de un país o región',
  currency: 'la moneda: el sistema de dinero que usa un país',
  export: 'una exportación: un producto vendido y enviado a otro país',
  landmark: 'un lugar, edificio o elemento natural famoso y fácil de reconocer',
  region: 'una región: un área amplia con características geográficas o culturales propias',
  republic: 'una república: un Estado cuyo jefe no es un monarca hereditario',
  atom: 'un átomo: la unidad básica de un elemento químico',
  biologist: 'un biólogo o bióloga: especialista que estudia los seres vivos',
  cell: 'una célula: la unidad estructural y funcional básica de los seres vivos',
  chemical: 'una sustancia química con una composición y propiedades determinadas',
  energy: 'la energía: la capacidad de producir movimiento, trabajo o cambio',
  fossil: 'un fósil: restos o huellas de un organismo antiguo preservados en roca',
  microscope: 'un microscopio: instrumento que amplía objetos demasiado pequeños para verse a simple vista',
  alarm: 'una alarma: dispositivo o señal que suena a una hora programada',
  commute: 'el trayecto habitual entre la casa y el trabajo o lugar de estudio',
  deadline: 'una fecha límite: el último momento permitido para entregar o terminar algo',
  errand: 'una diligencia: un desplazamiento corto para cumplir una tarea práctica, como comprar o entregar algo',
  habit: 'un hábito: una acción que se repite regularmente, a menudo de forma automática',
  schedule: 'un horario: plan que indica qué actividades ocurren y a qué hora',
  workout: 'una sesión de ejercicio físico planificada',
  collar: 'el cuello de una camisa, chaqueta o abrigo',
  cotton: 'el algodón: fibra vegetal suave utilizada para fabricar tela',
  hem: 'el dobladillo: borde de una prenda doblado y cosido',
  jacket: 'una chaqueta: prenda exterior que cubre el torso y los brazos',
  sleeve: 'una manga: parte de una prenda que cubre el brazo',
  thread: 'el hilo: hebra delgada usada para coser tela',
  zip: 'una cremallera o cierre: dos filas de dientes que abren y cierran una prenda o bolso',
  avenue: 'una avenida: vía urbana ancha, con frecuencia bordeada por edificios o árboles',
  bridge: 'un puente: estructura que permite cruzar un río, carretera u obstáculo',
  fountain: 'una fuente: estructura decorativa de la que sale agua',
  intersection: 'una intersección: punto donde se cruzan dos o más vías',
  monument: 'un monumento creado para recordar a una persona o acontecimiento',
  pavement: 'la acera: franja junto a la vía destinada a los peatones',
  roundabout: 'una glorieta o rotonda: intersección circular alrededor de una isla central',
  coach: 'un entrenador o entrenadora que prepara a un equipo y decide su estrategia',
  team: 'un equipo: grupo de personas que compite o trabaja unido',
  referee: 'un árbitro o árbitra que aplica las reglas durante un partido',
  stadium: 'un estadio: recinto grande con graderías para eventos deportivos',
  player: 'un jugador o jugadora que participa en un deporte o juego',
  score: 'el marcador o número de puntos obtenidos por cada lado',
  nurse: 'un enfermero o enfermera: profesional que cuida y atiende a pacientes',
  patient: 'un paciente: persona que recibe atención o tratamiento médico',
  ambulance: 'una ambulancia: vehículo equipado para transportar pacientes en una emergencia',
  treatment: 'un tratamiento: conjunto de medidas o medicamentos para atender una enfermedad',
  recovery: 'la recuperación: proceso de volver a estar bien después de una enfermedad o lesión',
  appointment: 'una cita: hora acordada para recibir atención de un profesional',
  pharmacy: 'una farmacia: establecimiento donde se preparan o venden medicamentos',
  envelope: 'un sobre de papel en el que se introduce una carta antes de enviarla',
  stamp: 'una estampilla o sello postal que demuestra el pago del envío de una carta',
  signature: 'una firma: nombre o marca escrita por una persona para identificarse o autorizar algo',
};

function extractBlankContext(passage: string, prompt: string) {
  const number = prompt.match(/\((\d+)\)/)?.[1];
  if (!number) return passage;
  const marker = `(${number})`;
  const start = Math.max(0, passage.lastIndexOf('.', passage.indexOf(marker)) + 1);
  const endPosition = passage.indexOf('.', passage.indexOf(marker));
  const end = endPosition === -1 ? passage.length : endPosition + 1;
  return passage.slice(start, end).trim();
}

function questionStimulus(section: MockSection, question: MCQQuestion) {
  if (question.stimulus) return question.stimulus;
  if (section.passage) return extractBlankContext(section.passage, question.text);
  if (section.topic) return section.topic;
  return question.text;
}

function bestEvidenceSentence(passage: string, prompt: string, correct: string) {
  const terms = `${prompt} ${correct}`.toLowerCase().match(/[a-z]{4,}/g) ?? [];
  const sentences = passage.match(/[^.!?]+[.!?]?/g)?.map((sentence) => sentence.trim()).filter(Boolean) ?? [passage];
  let best = sentences[0] ?? passage;
  let bestScore = -1;
  for (const sentence of sentences) {
    const normalized = sentence.toLowerCase();
    const score = terms.reduce((total, term) => total + (normalized.includes(term) ? 1 : 0), 0);
    if (score > bestScore) { best = sentence; bestScore = score; }
  }
  return best;
}

function decisiveEvidence(part: IcfesOfficialPart, section: MockSection, question: MCQQuestion, correct: string) {
  if (part === 1) return question.text;
  if (part === 2 || part === 3) return question.stimulus ?? question.text;
  if (section.passage) return part === 4 || part === 7
    ? extractBlankContext(section.passage, question.text)
    : bestEvidenceSentence(section.passage, question.text, correct);
  return question.stimulus ?? question.text;
}

function substituteChoice(evidence: string, prompt: string, choice: string) {
  const number = prompt.match(/\((\d+)\)/)?.[1];
  if (!number) return evidence.replace('___', choice);
  return evidence.replace(new RegExp(`\\(${number}\\)\\s*___`), choice);
}

function wordRole(word: string) {
  const normalized = word.toLowerCase();
  if (['although', 'because', 'but', 'however', 'if', 'so', 'unless'].includes(normalized)) return 'un conector lógico';
  if (['at', 'beside', 'by', 'during', 'for', 'from', 'in', 'of', 'on', 'than', 'to', 'with', 'without'].includes(normalized)) return 'una preposición o palabra de enlace';
  if (['he', 'her', 'herself', 'him', 'himself', 'it', 'itself', 'ourselves', 'she', 'them', 'themselves', 'they', 'we'].includes(normalized)) return 'un pronombre';
  if (normalized.endsWith('ly')) return 'un adverbio, usado para modificar una acción o cualidad';
  if (normalized.endsWith('tion') || normalized.endsWith('ment') || normalized.endsWith('ness') || normalized.endsWith('ity')) return 'un sustantivo';
  if (normalized.endsWith('ing')) return 'una forma terminada en -ing';
  if (normalized.endsWith('ed')) return 'una forma verbal o participio terminado en -ed';
  return 'una palabra cuyo significado y combinación deben comprobarse dentro de la oración';
}

function explanationFor(part: IcfesOfficialPart, correct: string, prompt: string, evidence: string) {
  if (part === 1) {
    const meaning = VOCABULARY_GLOSSES[correct.toLowerCase()];
    return meaning
      ? `“${correct}” significa ${meaning}. Coincide directamente con “${prompt}”.`
      : `La definición “${prompt}” describe específicamente “${correct}”.`;
  }
  if (part === 2) return `El aviso dice “${evidence}”. Esa instrucción, lugar o propósito corresponde a “${correct}”.`;
  if (part === 3) return `Ante “${evidence}”, la respuesta “${correct}” reacciona de forma natural y mantiene la intención del intercambio.`;
  if (part === 4 || part === 7) return `Al insertar “${correct}”, la oración queda: “${substituteChoice(evidence, prompt, correct)}”. Su significado y su forma encajan en el contexto.`;
  if (part === 5) return `La evidencia “${evidence}” expresa o parafrasea la idea de “${correct}”.`;
  return `La evidencia “${evidence}” respalda la conclusión “${correct}” sin exigir información externa.`;
}

/**
 * Qué enseña la parte, que no es lo mismo que cómo se resuelve.
 *
 * La microlección se estaba rellenando con `strategyFor(part)`, la misma función que
 * alimenta «Estrategia transferible» justo debajo: el estudiante leía la frase dos veces
 * seguidas. Aquí va el concepto —qué está midiendo el examen— y en la estrategia, el
 * movimiento que se lleva a la siguiente pregunta.
 */
function conceptFor(part: IcfesOfficialPart) {
  if (part === 1) return 'Esta parte mide vocabulario preciso: varias palabras del mismo campo semántico compiten, y solo una cumple todos los rasgos de la definición.';
  if (part === 2) return 'Un aviso no describe su sitio: lo da por sabido. Quien lo escribió sabía dónde iba a colgarlo, así que la pista está en a quién se dirige y qué le pide hacer.';
  if (part === 3) return 'En un intercambio breve, la respuesta correcta no es la más educada ni la más larga: es la que cumple la función que abre la primera intervención.';
  if (part === 4) return 'Aquí se cruzan dos exigencias: la palabra tiene que significar lo que el contexto pide y encajar gramaticalmente. Fallar una de las dos basta para descartarla.';
  if (part === 5) return 'Localizar información es distinto de recordar el texto: la respuesta está escrita, aunque con otras palabras, y hay que poder señalarla.';
  if (part === 6) return 'Inferir es deducir de lo que está escrito, no completar con lo que sabes del mundo. Si la conclusión necesita un dato que el texto no da, no es la respuesta.';
  return 'El cierre de texto mide cohesión: cada hueco depende de las frases de alrededor, no solo de la suya.';
}

function strategyFor(part: IcfesOfficialPart) {
  if (part === 1) return 'Identifica la categoría y exige que la palabra elegida cumpla cada detalle de la definición.';
  if (part === 2) return 'Separa tres preguntas: dónde aparece, a quién se dirige y qué acción busca provocar.';
  if (part === 3) return 'Nombra la intención de la primera intervención antes de comparar las respuestas.';
  if (part === 4) return 'Decide primero qué categoría gramatical falta y después relee la oración completa.';
  if (part === 5) return 'Localiza una frase demostrable y acepta paráfrasis, pero no información añadida.';
  if (part === 6) return 'Combina las pistas del texto y rechaza opciones extremas o basadas en conocimiento externo.';
  return 'Valida la opción en tres capas: significado, colocación y forma gramatical.';
}

/**
 * Vocabulario que uno espera encontrar en el aviso de cada tipo de sitio.
 *
 * Por qué existe: el feedback de los avisos era una plantilla —«“X” introduce un lugar,
 * propósito o instrucción diferente de lo que esas palabras comunican»— con el nombre de la
 * opción metido en el hueco. Los dos distractores recibían la MISMA frase y no explicaban
 * nada: el estudiante que se equivoca sigue sin saber por qué.
 *
 * Un diccionario literal no sirve, porque hay 334 opciones distintas en el banco y casi
 * todas aparecen una sola vez. Pero los sitios sí caen en pocas familias, y cada familia
 * tiene su léxico. Con eso el feedback puede decir qué habría tenido que poner el aviso
 * para que esa opción fuera la buena.
 *
 * Cuando la opción no es un lugar sino un propósito o una acción —«To advertise a discount»,
 * «Use the stairs»— no hay familia que aplique y se usa el cierre general, que al menos
 * devuelve al estudiante a la frase decisiva.
 */
const SETTING_SIGNALS: Array<{ match: RegExp; expects: string }> = [
  { match: /\b(swimming )?pool|piscina\b/i, expects: 'nadar, profundidad, socorrista o vestuarios' },
  { match: /\b(bus|train|railway|platform|station|metro|underground)\b/i, expects: 'horarios, andenes, billetes o retrasos' },
  { match: /\b(airport|departure gate|boarding|terminal)\b/i, expects: 'vuelos, embarque, equipaje o pasaportes' },
  { match: /\b(supermarket|shop|store|checkout|shopping)\b/i, expects: 'precios, cajas, ofertas o productos' },
  { match: /\b(librar|study room|reading room)/i, expects: 'silencio, préstamo de libros o devoluciones' },
  { match: /\b(hospital|clinic|surgery|ward|pharmac|dental|doctor)/i, expects: 'pacientes, consultas, citas o medicamentos' },
  { match: /\b(museum|gallery|historic|exhibition)/i, expects: 'obras expuestas, fotografías o no tocar las piezas' },
  { match: /\b(hotel|lobby|guest room|reception)/i, expects: 'habitaciones, huéspedes, llaves o la hora de salida' },
  { match: /\b(school|classroom|cafeteria|pupil|student)/i, expects: 'clases, alumnos, horarios o material escolar' },
  { match: /\b(restaurant|café|cafe|canteen|kitchen)/i, expects: 'mesas, comida, reservas o carta' },
  { match: /\b(stadium|football|match|sports centre|gym)/i, expects: 'partidos, entradas, gradas o equipamiento deportivo' },
  { match: /\b(park|garden|playground)/i, expects: 'césped, perros, papeleras o juegos infantiles' },
  { match: /\b(office|meeting room|reception desk)/i, expects: 'reuniones, trabajo o atención al público' },
  { match: /\b(road|street|traffic|drivers?|motorway)/i, expects: 'circulación, desvíos, obras o límites de velocidad' },
  { match: /\b(lift|elevator|stairs|building|emergency exit)/i, expects: 'evacuación, plantas, escaleras o salidas' },
  { match: /\b(taxi|car|vehicle|parking)/i, expects: 'aparcamiento, trayectos o tarifas' },
  { match: /\b(bank|post office|counter)/i, expects: 'trámites, turnos, envíos o pagos' },
  { match: /\b(cinema|theatre|concert)/i, expects: 'sesiones, butacas, entradas o silencio durante la función' },
];

/** Las tres o cuatro palabras con carga del aviso, para citarlo sin repetirlo entero. */
function noticeKeyPhrase(evidence: string) {
  const cleaned = evidence.replace(/\s+/gu, ' ').trim();
  return cleaned.length <= 60 ? cleaned : `${cleaned.slice(0, 57)}…`;
}

function noticeDistractorRationale(distractor: string, correct: string, evidence: string) {
  const family = SETTING_SIGNALS.find((item) => item.match.test(distractor));
  const quote = noticeKeyPhrase(evidence);

  if (family) {
    return `Para que la respuesta fuera “${distractor}”, el aviso tendría que hablar de ${family.expects}. Lo que dice es “${quote}”, que apunta a “${correct}”.`;
  }
  return `“${distractor}” no se sostiene con lo que el aviso dice literalmente: “${quote}”. Esa frase es la que lleva a “${correct}”, sin añadir nada por tu cuenta.`;
}

function distractorRationale(part: IcfesOfficialPart, distractor: string, correct: string, prompt: string, evidence: string) {
  if (part === 1) {
    const meaning = VOCABULARY_GLOSSES[distractor.toLowerCase()];
    return meaning
      ? `“${distractor}” significa ${meaning}. No corresponde a “${prompt}”.`
      : `“${distractor}” tiene otro significado y no corresponde a la definición “${prompt}”.`;
  }
  if (part === 2) return noticeDistractorRationale(distractor, correct, evidence);
  if (part === 3) return `La intervención es “${evidence}”. Responder “${distractor}” cambia el tema o no cumple la función conversacional que sí cumple “${correct}”.`;
  if (part === 4 || part === 7) return `Prueba de sustitución: “${substituteChoice(evidence, prompt, distractor)}”. “${distractor}” funciona como ${wordRole(distractor)}, pero aquí no produce la combinación de significado y estructura que sí produce “${correct}”.`;
  if (part === 5) return `La opción afirma “${distractor}”, pero la evidencia localizable es “${evidence}”. Esa idea no aparece allí ni es una paráfrasis precisa.`;
  return `“${distractor}” añade o exagera una conclusión que no se desprende de “${evidence}”; “${correct}” exige menos suposiciones.`;
}

function adaptQuestion(mock: MockExam, section: MockSection, question: MCQQuestion, position: number): IcfesPracticeQuestion {
  const part = section.part as IcfesOfficialPart;
  const profile = PART_PROFILE[part];
  const correct = question.options[question.answer];
  const evidence = decisiveEvidence(part, section, question, correct);
  const explanation = explanationFor(part, correct, question.text, evidence);
  return {
    id: `${mock.id}:${question.id}`,
    officialPart: part,
    skill: profile.skill,
    subskill: section.sectionStyle ?? `part-${part}`,
    type: profile.type,
    difficulty: position % 5 === 0 ? 'reto' : position % 2 === 0 ? 'estandar' : 'base',
    stimulus: questionStimulus(section, question),
    stimulusLabel: part === 1 ? section.topic ?? 'Banco temático' : part === 2 ? 'Aviso' : part === 3 ? 'Conversación' : 'Texto',
    ...(part === 1 ? { wordBank: question.options } : {}),
    prompt: question.text || 'Choose the best response.',
    options: question.options.map((text, index) => ({
      text,
      rationale: index === question.answer
        ? explanation
        : distractorRationale(part, text, correct, question.text, evidence),
    })),
    answerIndex: question.answer,
    explanation,
    evidence: {
      quote: evidence,
      reason: part === 1 && VOCABULARY_GLOSSES[correct.toLowerCase()]
        ? `La definición describe ${VOCABULARY_GLOSSES[correct.toLowerCase()]}; por eso corresponde a “${correct}”.`
        : `Esta evidencia permite justificar “${correct}” sin depender de una suposición externa.`,
    },
    strategy: strategyFor(part),
    microLesson: { title: `Qué mide la Parte ${part}`, body: conceptFor(part) },
    targetSeconds: profile.targetSeconds,
    tags: [mock.id, `part-${part}`, profile.skill, 'guided-adapter-v1'],
    reinforcement: profile.reinforcement,
    source: { type: 'original-practice', reference: `${mock.title}: práctica propia de WeLearn adaptada a modo guiado.` },
    reviewedAt: '2026-08-03',
    editorialStatus: 'reviewed',
  };
}

export function getGuidedMockQuestions(mockId: string): IcfesPracticeQuestion[] {
  if (!GUIDED_MOCK_IDS.includes(mockId as typeof GUIDED_MOCK_IDS[number])) return [];
  const mock = getMock('icfes', mockId);
  if (!mock) return [];
  let position = 0;
  return mock.sections.flatMap((section) => section.questions.flatMap((question) => {
    if (question.type !== 'mcq' && question.type !== 'dialog') return [];
    position += 1;
    return [adaptQuestion(mock, section, question, position)];
  }));
}
