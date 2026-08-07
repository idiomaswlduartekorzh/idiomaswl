import type { IcfesPracticeQuestion, IcfesQuestionOption } from './questions';
import { getSimulacro, getSimulacroQuestionPart } from '@/data/mocks/icfes-simulacros';
import { GUIDED_WORKBOOK_IDS } from './guided-registry';

export { GUIDED_WORKBOOK_EXCLUSIONS, GUIDED_WORKBOOK_IDS } from './guided-registry';

const DEFINITIONS: Record<string, string> = {
  ball: 'A ball is a round object used in games and sports.',
  bike: 'A bike is a two-wheeled vehicle moved by pedals.',
  clown: 'A clown is an entertainer whose costume and actions are intended to make people laugh.',
  competition: 'A competition is an event in which people try to win.',
  cold: 'A cold is a common illness; it is not an action, person, place or treatment.',
  cough: 'A cough is the action or sound of forcing air from the throat.',
  cry: 'To cry is to produce tears, often because of sadness or pain.',
  doctor: 'A doctor is the professional who examines and treats a sick person.',
  driver: 'A driver is a person who operates a road vehicle.',
  farmer: 'A farmer is a person who grows crops or raises animals in the countryside.',
  field: 'A field is an open area of land, often used for farming or sport.',
  footballer: 'A footballer is a person who plays football, often professionally.',
  glasses: 'Glasses are lenses worn in front of the eyes to improve vision.',
  handbags: 'Handbags are small bags used to carry personal objects.',
  hospital: 'A hospital is the place where people receive medical care.',
  medicine: 'Medicine is a substance taken to treat pain or illness.',
  nurse: 'A nurse is a health professional who cares for patients.',
  pajamas: 'Pajamas are clothes worn for sleeping.',
  pirate: 'A pirate is a person traditionally described as attacking ships and hiding treasure.',
  player: 'A player is a person who takes part in a game or sport.',
  prize: 'A prize is something awarded to the winner of a competition.',
  scarf: 'A scarf is a piece of cloth worn around the neck.',
  skirt: 'A skirt is a garment that hangs from the waist.',
  socks: 'Socks are garments worn on the feet, inside shoes.',
  stadium: 'A stadium is a large venue where spectators watch sports.',
  'stomach-ache': 'A stomach-ache is pain felt in the stomach area.',
  uniform: 'A uniform is a standard set of clothes worn by members of a group.',
  watch: 'A watch is a small timepiece worn on the wrist.',
};

interface GuidedReview {
  explanation: string;
  evidence: string;
  evidenceReason: string;
  lesson: string;
  lessonBody: string;
  optionRationales?: string[];
  strategy?: string;
}

const REVIEW: Record<number, GuidedReview> = {
  1: { explanation: 'Cry es la única opción que describe una acción que una persona puede hacer por tristeza o enfermedad.', evidence: 'do this when they feel really sad', evidenceReason: '“Do this” exige una acción y “sad” conecta directamente con cry.', lesson: 'Busca la categoría gramatical', lessonBody: 'La frase “do this” anticipa un verbo. Esa pista descarta enfermedades, personas, lugares y objetos antes de traducir.' },
  2: { explanation: 'Medicine es algo que una persona puede tomar para aliviar un dolor de cabeza.', evidence: 'take this ... headache', evidenceReason: 'La combinación take + problema de salud selecciona un tratamiento.', lesson: 'Aprende colocaciones', lessonBody: 'En inglés se dice take medicine. Las colocaciones son pares de palabras que suelen aparecer juntas.' },
  3: { explanation: 'Doctor es la persona a quien consultas cuando estás enfermo o herido.', evidence: 'see this person', evidenceReason: 'Person limita las opciones a una profesión y see a doctor es la expresión natural.', lesson: 'La pista puede estar en el pronombre', lessonBody: 'This person pide una persona; this place pediría un lugar. Usa esas palabras funcionales para descartar.' },
  4: { explanation: 'Hospital es el lugar al que puedes ir cuando necesitas atención para tu cuerpo.', evidence: 'go to this place', evidenceReason: 'Place exige un lugar y el contexto de enfermedad identifica hospital.', lesson: 'Distingue persona y lugar', lessonBody: 'Doctor es una persona; hospital es un lugar. En bancos temáticos, reconocer la clase de respuesta ahorra tiempo.' },
  5: { explanation: 'Stomach-ache es el dolor que puede aparecer después de comer demasiado.', evidence: 'have this when you eat too much', evidenceReason: 'La consecuencia descrita es un malestar del estómago, no una persona, lugar o medicamento.', lesson: 'Usa causa y consecuencia', lessonBody: 'La causa “eat too much” permite predecir un problema digestivo antes de mirar el banco de palabras.' },
  6: { explanation: 'What a pity! expresa decepción o pesar ante la decisión de no participar.', evidence: "I don't think I'm going to enter", evidenceReason: 'La persona anuncia que probablemente no participará; la respuesta natural reconoce esa mala noticia.', lesson: 'Responde a la intención', lessonBody: 'Certainly confirma una solicitud y Good luck desea éxito. What a pity reacciona a una oportunidad que se pierde.', optionRationales: ['Certainly! confirma algo, pero aquí no hay una pregunta ni solicitud.', 'Good luck! sería natural si la persona sí fuera a competir.', 'What a pity! reconoce de forma coherente que no participar es una lástima.'], strategy: 'Clasifica primero la noticia como positiva, negativa, pregunta o propuesta.' },
  7: { explanation: "It's too big es una opinión directa sobre el sombrero y responde exactamente a What do you think...?", evidence: 'What do you think of my hat?', evidenceReason: 'La estructura pide una valoración del objeto mencionado.', lesson: 'What do you think of…?', lessonBody: 'Esta pregunta pide una opinión. La respuesta debe describir o valorar el objeto: nice, unusual, too big, etc.', optionRationales: ["Don't come es una orden sin relación con el sombrero.", 'Very well describe cómo se hace una acción; no funciona como opinión completa sobre un objeto.', "It's too big ofrece una valoración clara y gramatical del sombrero."], strategy: 'Predice la función de la respuesta antes de leer las opciones: aquí debe ser una opinión.' },
  8: { explanation: "Let's do it now propone discutir los planes de inmediato y mantiene la coherencia del diálogo.", evidence: "We haven't discussed our tour plans yet", evidenceReason: 'Yet señala una tarea pendiente; una propuesta para hacerla ahora responde directamente.', lesson: 'Let’s + verbo', lessonBody: 'Let’s introduce una propuesta compartida: Let’s discuss it, Let’s start, Let’s go.', optionRationales: ['You poor thing expresa compasión por un problema personal, no propone planear.', "Let's do it now retoma discuss our plans y ofrece una acción conjunta.", 'As late as possible responde a una pregunta de tiempo que nadie formuló.'], strategy: 'Busca qué opción retoma la acción pendiente, no solo una palabra relacionada con tiempo.' },
  9: { explanation: 'Venezuela ocupa el segundo lugar después de Italia en consumo de pasta.', evidence: 'Italy is followed by Venezuela, then Tunisia.', evidenceReason: 'Followed by marca el orden: Italia primero, Venezuela segundo y Túnez tercero.', lesson: 'Convierte conectores en orden', lessonBody: 'A is followed by B significa que B viene después de A. Dibuja 1→2→3 si la pregunta pide una posición.', optionRationales: ['The Philippines aparece como un lugar donde gusta la pasta, pero no ocupa el segundo puesto.', 'Mexico también aparece como ejemplo de popularidad, no en el ranking de consumo.', 'Venezuela aparece inmediatamente después de Italia en la secuencia explícita.'], strategy: 'Localiza la frase de ranking y no confundas ejemplos geográficos con posiciones.' },
  10: { explanation: 'El texto afirma que la pasta se popularizó porque es una comida de bajo costo.', evidence: 'Pasta has become popular because it is a low-cost meal', evidenceReason: 'Low-cost es una paráfrasis directa de cheap.', lesson: 'Reconoce paráfrasis', lessonBody: 'cheap = low-cost; difficult = complicated. La opción correcta suele cambiar las palabras sin cambiar la idea.', optionRationales: ['El tomate se menciona como acompañamiento, no como la causa principal de popularidad.', 'Cheap parafrasea low-cost exactamente.', 'El texto dice not difficult, lo contrario de complicated.'], strategy: 'Busca sinónimos y verifica que la relación causal because se conserve.' },
  11: { explanation: 'Los atletas comen pasta porque produce energía, es decir, mejora su capacidad para la actividad.', evidence: 'It also produces energy, which is why athletes eat pasta.', evidenceReason: 'La oración conecta explícitamente energía con la elección de los deportistas.', lesson: 'Une causa y paráfrasis', lessonBody: 'Produces energy no aparece idéntico en la opción: se expresa como improves activity levels.', optionRationales: ['Improves activity levels resume el efecto de producir energía.', 'Fills your stomach no significa vaciarlo y no es la razón dada para atletas.', 'La preparación sencilla es una ventaja general, no la razón específica de los deportistas.'], strategy: 'Cuando la pregunta dice because, identifica la causa exacta y luego su paráfrasis.' },
  12: { explanation: 'La pasta se hizo conocida en Estados Unidos cuando inmigrantes italianos llegaron y llevaron sus hábitos alimentarios.', evidence: 'When many Italians immigrated to America ... they took their eating habits with them', evidenceReason: 'Immigrated to America equivale a arrived there y explica la difusión.', lesson: 'Pronombres de lugar', lessonBody: 'There reemplaza United States/America. Comprueba siempre qué sustantivo retoma un pronombre.', optionRationales: ['Arrived there parafrasea immigrated to America.', 'Que les gustara la pizza no explica cómo la pasta llegó al país.', 'El texto no dice que fueran famosos.'], strategy: 'Reconstruye la cadena: personas emigran → llevan hábitos → la comida se populariza.' },
  13: { explanation: 'El texto corrige el mito de Marco Polo y atribuye a los árabes la llegada de una pasta similar a los fideos.', evidence: 'Arabs brought a noodle-like pasta to Sicily ... in the 8th century.', evidenceReason: 'Esta es la afirmación histórica explícita que responde quién la llevó.', lesson: 'Cuidado con el mito mencionado', lessonBody: 'Los textos suelen presentar una creencia para negarla. La frase but this is not true invalida Marco Polo.', optionRationales: ['Marco Polo aparece en una versión que el texto niega.', 'Sicilians identifica habitantes del lugar, pero el agente mencionado son Arabs.', 'Arabs es el sujeto de brought y por eso responde Who.'], strategy: 'Después de but, however o not true, actualiza la información; no conserves la primera versión.' },
  14: { explanation: 'Tanto la pizza como la pasta llegaron a América con la inmigración italiana.', evidence: 'they took their eating habits with them, so pasta and pizza became popular', evidenceReason: 'El antecedente son los italianos que emigraron a América; ambas comidas forman parte de esos hábitos.', lesson: 'Encuentra el rasgo compartido', lessonBody: 'Both exige una afirmación válida para los dos elementos, no una característica indicada solo para uno.', optionRationales: ['El texto solo relaciona la conservación prolongada con ingredientes simples de la pasta.', 'Ambas comidas llegaron desde la cultura italiana y se popularizaron en América.', 'El texto dice que hay más de 600 tipos de pasta cocinados de distintas maneras.'], strategy: 'Prueba cada opción dos veces: una con pizza y otra con pasta.' },
  15: { explanation: 'El propósito global es animar al lector a sonreír con mayor frecuencia explicando sus beneficios.', evidence: "It's a good idea to smile more often ... Here are some reasons", evidenceReason: 'La recomendación aparece al inicio y se sostiene con razones durante todo el texto.', lesson: 'Propósito = verbo + tema', lessonBody: 'Para formular propósito usa verbos como encourage, explain, warn o describe y comprueba todo el texto, no un párrafo.', optionRationales: ['La cortesía hacia otros no es la tesis central.', 'El texto se enfoca en beneficios de sonreír, no en consecuencias de no hacerlo.', 'Las situaciones difíciles no organizan el texto completo.', 'Encouraging ... to smile more frequently coincide con la recomendación y sus razones.'], strategy: 'Lee introducción y cierre; si repiten una recomendación, probablemente revelan el propósito.' },
  16: { explanation: 'El segundo párrafo explica cómo sonreír puede hacer que una persona parezca más joven, saludable y atractiva.', evidence: 'give you a more youthful look ... seem healthier and more attractive', evidenceReason: 'Todas esas expresiones describen una mejora en la apariencia.', lesson: 'Resume varios ejemplos', lessonBody: 'Una respuesta global puede condensar youthful, healthier y attractive como appear better.', optionRationales: ['Appear better resume las mejoras visuales enumeradas.', 'Mostrar interés en otros no aparece en el párrafo 2.', 'La popularidad social se trata después, no en este párrafo.', 'Transmitir felicidad aparece en el párrafo social, no en el segundo.'], strategy: 'Respeta el párrafo indicado: una idea verdadera en otra sección sigue siendo distractor.' },
  17: { explanation: 'El tercer párrafo afirma que sonreír puede producir felicidad casi de inmediato.', evidence: 'It makes you happy almost immediately.', evidenceReason: 'La opción correcta conserva tanto el efecto como la rapidez.', lesson: 'Conserva los modificadores', lessonBody: 'Almost immediately se convierte en very quickly. Los detalles de tiempo ayudan a distinguir opciones cercanas.', optionRationales: ['No dice que reaccionen con frecuencia a situaciones graciosas.', 'No explica cuándo necesitan sentirse bien.', 'Ayudar a otros es una recomendación, pero no el efecto principal preguntado.', 'Feel happy very quickly parafrasea makes you happy almost immediately.'], strategy: 'Busca en la opción equivalencias exactas de efecto y tiempo.' },
  18: { explanation: 'En situaciones sociales, una sonrisa muestra felicidad y puede transmitirla a otras personas.', evidence: 'shows you are a happy person, and you can transmit the feeling to them', evidenceReason: 'La opción correcta reúne la señal social y su efecto en los demás.', lesson: 'Evita invertir la relación', lessonBody: 'El texto dice que tú transmites felicidad; no que necesitas la atención ajena para sentir confianza.', optionRationales: ['Invierte la idea: el texto no dice que necesites atención para sentirte seguro.', 'No afirma que una sonrisa controle lo que otros hacen.', 'Resume mostrar felicidad y contagiarla a los demás.', 'Mezcla atractivo con necesidad de aceptación, una motivación no indicada.'], strategy: 'Comprueba quién causa qué: sujeto, acción y receptor deben coincidir.' },
  19: { explanation: 'El mejor anuncio reúne la promesa central: sonreír es fácil y rápido y beneficia salud, felicidad y atractivo.', evidence: 'a fast way to feel happy ... healthier and more attractive', evidenceReason: 'La tercera opción integra ideas repetidas en la conclusión y en los párrafos de beneficios.', lesson: 'Síntesis sin inventar', lessonBody: 'Una buena síntesis cubre varias ideas centrales y evita agregar resultados que el texto nunca promete.', optionRationales: ['El texto dice youthful, no older, así que contradice un beneficio central.', 'No afirma que sonreír mejore los dientes ni la figura rápidamente.', 'Combina rapidez, facilidad y los tres grupos principales de beneficios.', 'Professional no es una conclusión del texto y reduce el mensaje a una imagen laboral.'], strategy: 'Selecciona la opción con mayor cobertura de ideas centrales y cero contradicciones.' },
  20: { explanation: 'La estructura correcta es it is a fruit, not a vegetable: afirma una categoría y niega la otra.', evidence: 'it is a fruit, [20] a vegetable', evidenceReason: 'Después de la coma falta el marcador de negación que contrasta ambos sustantivos.', lesson: 'Not frente a neither/nor', lessonBody: 'Not niega directamente un elemento. Neither ... nor requiere una estructura doble: neither a fruit nor a vegetable.', optionRationales: ['Neither necesitaría coordinarse con nor y además negaría que sea fruta.', 'Nor no puede aparecer solo en esta estructura afirmativa.', 'Not crea el contraste correcto: fruta, no verdura.', 'No funciona como determinante antes de vegetable, pero aquí se necesita negar la clasificación.'], strategy: 'Lee ambos lados del contraste y reconstruye la oración completa.' },
  21: { explanation: 'Second es el ordinal necesario para indicar que la banana ocupa el puesto número dos.', evidence: 'the banana, the [21] one in popularity', evidenceReason: 'The ___ one pide un adjetivo ordinal que exprese posición en un ranking.', lesson: 'Cardinales y ordinales', lessonBody: 'Two cuenta; second ordena. Después de the y antes de one, un ranking exige second.', optionRationales: ['Two es cardinal y no funciona en the two one.', 'Both se refiere a dos elementos juntos, no a una posición.', 'Twice expresa doble cantidad o frecuencia.', 'Second es el ordinal correcto para el segundo puesto.'], strategy: 'Si hay ranking, busca first, second, third; no números cardinales.' },
  22: { explanation: 'Were grown es una pasiva correcta: los aztecas e incas cultivaron tomates.', evidence: 'Tomatoes were first [22] by Aztecs and Incas', evidenceReason: 'Were + participio + by señala voz pasiva; grown es el participio semánticamente adecuado.', lesson: 'Detecta la voz pasiva', lessonBody: 'La fórmula be + past participle + by indica quién realizó la acción: were grown by.', optionRationales: ['Achieved significa lograr y no se usa para cultivar tomates.', 'Done es gramaticalmente participio, pero no tiene el significado necesario.', 'Grown completa la pasiva y significa cultivados.', 'Invented se usa para algo creado, no para una planta cultivada.'], strategy: 'Valida dos filtros: forma de participio y significado en contexto.' },
  23: { explanation: 'Introduce something into a place expresa llevar algo al interior de un nuevo territorio o sistema.', evidence: 'introduced the tomato [23] Europe', evidenceReason: 'La colocación introduce X into Y es la única combinación natural entre las opciones.', lesson: 'Preposición como colocación', lessonBody: 'No todas las preposiciones se traducen literalmente. Aprende la unidad introduce into.', optionRationales: ['Introduce out no forma esta construcción.', 'Introduce on no señala destino.', 'Introduce at no funciona con el continente como destino.', 'Introduce into expresa entrada a Europa.'], strategy: 'Lee verbo + objeto + destino como una sola colocación.' },
  24: { explanation: 'Rich in es la colocación estándar para indicar que un alimento contiene muchos nutrientes.', evidence: 'Tomatoes are [24] in vitamins A and C', evidenceReason: 'La preposición in ya está escrita y selecciona rich.', lesson: 'Mira la palabra después del espacio', lessonBody: 'Rich in y full of son correctas, pero usan preposiciones distintas. La oración ya fija in.', optionRationales: ['Charged in no describe contenido nutricional.', 'Rich in es la colocación exacta.', 'Loaded suele construirse loaded with, no loaded in.', 'Full exige of: full of vitamins.'], strategy: 'La preposición visible puede decidir entre sinónimos aparentes.' },
  25: { explanation: 'Medical research es el sustantivo colectivo que puede sugerir una conclusión científica.', evidence: 'new medical [25] suggests', evidenceReason: 'Research concuerda con medical y con el verbo singular suggests.', lesson: 'Colocación y concordancia', lessonBody: 'Research es incontable en este uso: new research suggests, no researches suggest.', optionRationales: ['Operation significa operación y no es evidencia general que sugiera esta conclusión.', 'Prescription es una orden de tratamiento para un paciente.', 'Drug nombra un medicamento, no el proceso de estudio.', 'Medical research es la colocación lógica y concuerda con suggests.'], strategy: 'Comprueba significado, colocación y concordancia antes de elegir.' },
};

const EVIDENCE_OVERRIDES: Record<string, string> = {
  'icfes-2022-g11:12': "In Nigeria, you mustn't use your left hand to give or receive things. This hand is considered dirty.",
  'icfes-2022-g11:14': 'Others whose personal space is small are the Arabs, French and Italians, while the Germans and Japanese need more.',
  'icfes-2022-g11:15': 'There are certain points to consider before you decide to get a cat.',
  'icfes-2019-ex1:17': 'He is best known as a novelist, but during the sixties and seventies, he worked in film making.',
  'icfes-2019-ex1:19': "Salter's time in the film world is both good and bad.",
  'icfes-2019-ex1:21': 'Salter thought he was wasting his time.',
  'icfes-2019-ex1:22': 'Perhaps he wasted his time in a larger artistic way, but it still makes for attractive reading.',
  'icfes-2019-ex1:23': 'The Last Book is available to everyone in online stores.',
  'icfes-2019-ex1:24': 'Today we have the pleasure of showing you the best letter written by our customer Mark. ... He is so happy with the orders at Swift Pizza and Sandwich House that he wants to declare a holiday to celebrate his experience here',
  'icfes-2019-ex1:25': 'I really wanted something to eat, so I decided to find a burger.',
  'icfes-2012:24': 'In 1973 the ideas went into action and the hard work began.',
  'icfes-2012:25': "A short time later, they were stopped because there wasn't enough money to complete the project.",
  'icfes-2012:30': 'Later, in 1991 the two long trains met. The hard work continued and three years later the project was completed.',
  'icfes-2012:32': 'I shared many curious experiences in this wonderful country.',
};

function sentences(text: string) {
  return text.replace(/\s+/g, ' ').match(/[^.!?]+[.!?]?/g)?.map((item) => item.trim()).filter(Boolean) ?? [text];
}

function contentTerms(text: string) {
  return text.toLowerCase().match(/[a-z]{4,}/g) ?? [];
}

function bestEvidenceSentence(passage: string, prompt: string, correct: string) {
  const terms = contentTerms(`${prompt} ${correct}`);
  return sentences(passage)
    .map((sentence) => ({ sentence, score: terms.filter((term) => sentence.toLowerCase().includes(term)).length }))
    .sort((a, b) => b.score - a.score)[0]?.sentence ?? passage;
}

function blankSubstitution(stem: string, option: string) {
  return stem.replace(/___|\[\d+\]/, option);
}

function dialogueIntent(stem: string, correct: string) {
  const lower = stem.toLowerCase();
  const response = correct.toLowerCase();
  if (/i don't know|i do not know/.test(response)) return 'admitir que no se conoce la información solicitada';
  if (response === 'who?') return 'pedir que se aclare la persona mencionada';
  if (/here you are/.test(response)) return 'cumplir la solicitud entregando el objeto';
  if (/i will/.test(response) && /careful|remember|don't forget/.test(lower)) return 'aceptar la advertencia o recordatorio';
  if (/shall i|can i|may i/.test(lower)) return 'aceptar o rechazar el ofrecimiento';
  if (/how much/.test(lower)) return 'indicar un precio o cantidad';
  if (/haven't discussed|have not discussed|not decided/.test(lower)) return 'proponer realizar ahora la tarea pendiente';
  if (/have you got|do you have/.test(lower)) return 'confirmar disponibilidad o responder la solicitud';
  if (/who/.test(lower)) return 'identificar a una persona';
  if (/where|how do i get|which way/.test(lower)) return 'una respuesta de lugar o dirección';
  if (/when|what time/.test(lower)) return 'una respuesta de tiempo';
  if (/how long/.test(lower)) return 'una duración';
  if (/would you|shall we|let's/.test(lower)) return 'aceptar, rechazar o responder a una propuesta';
  if (/sorry/.test(lower)) return 'reconocer una disculpa';
  if (/what do you think|how was|how is/.test(lower)) return 'una valoración u opinión';
  if (/have you|did you|can you|could you|do you|is there|are you/.test(lower)) return 'una respuesta directa a la pregunta';
  return 'una reacción coherente que continúe el intercambio';
}

function automaticReview(
  question: NonNullable<ReturnType<typeof getSimulacro>>['questions'][number],
  passageText: string | undefined,
  evidenceOverride?: string,
): GuidedReview {
  const correct = question.options[question.answer];
  if (question.type === 'vocab') {
    const correctDefinition = DEFINITIONS[correct.toLowerCase()];
    if (!correctDefinition) throw new Error(`Falta definición guiada para “${correct}”`);
    return {
      explanation: `${correctDefinition} Esa función coincide con “${question.stem}”.`,
      evidence: question.stem,
      evidenceReason: `La definición exige exactamente la categoría y función descritas por “${correct}”.`,
      lesson: 'Clasifica antes de traducir',
      lessonBody: 'Decide si la definición pide persona, objeto, lugar, ropa o actividad; después compara la función completa.',
      strategy: 'Exige que la palabra cumpla cada detalle de la definición, no solo que pertenezca al mismo tema.',
      optionRationales: question.options.map((option) => {
        const definition = DEFINITIONS[option.toLowerCase()];
        if (!definition) throw new Error(`Falta definición guiada para “${option}”`);
        return option === correct
          ? `${definition} Cumple la descripción “${question.stem}”.`
          : `${definition} Esa función no corresponde a “${question.stem}”.`;
      }),
    };
  }

  if (question.type === 'notice') {
    const notice = passageText ?? question.stem.match(/[“"'](.+)[”"']/)?.[1];
    if (!notice || /dónde puede ver este aviso|where (?:can|could) you (?:see|find) this notice/i.test(notice)) {
      throw new Error(`Aviso sin estímulo en pregunta ${question.n}`);
    }
    return {
      explanation: `El aviso “${notice}” cumple una función propia de “${correct}”.`,
      evidence: notice,
      evidenceReason: `Las palabras y la acción visible en el aviso permiten ubicarlo en “${correct}”.`,
      lesson: 'Lee la acción del aviso',
      lessonBody: 'Separa el lugar posible del lugar demostrable: objeto, acción y audiencia deben coincidir.',
      strategy: 'Pregunta qué acción solicita el aviso y en cuál lugar esa acción tendría una función real.',
      optionRationales: question.options.map((option) => option === correct
        ? `En “${option}”, el mensaje “${notice}” tendría una función concreta y natural.`
        : `“${option}” puede ser un lugar imaginable, pero no explica la acción específica de “${notice}”.`),
    };
  }

  if (question.type === 'dialog') {
    const intent = dialogueIntent(question.stem, correct);
    return {
      explanation: `“${correct}” ofrece ${intent} y mantiene el sentido de “${question.stem}”.`,
      evidence: question.stem,
      evidenceReason: `La forma de la intervención exige ${intent}; “${correct}” cumple esa función.`,
      lesson: 'Predice la función de la respuesta',
      lessonBody: 'Antes de comparar opciones, decide si falta una opinión, una fecha, una dirección, una aceptación o una reacción.',
      strategy: `Busca ${intent} y comprueba que la respuesta retome el tema de la primera intervención.`,
      optionRationales: question.options.map((option) => option === correct
        ? `Intercambio completo: “${question.stem}” — “${option}”. La respuesta cumple ${intent}.`
        : `Intercambio de prueba: “${question.stem}” — “${option}”. Esta respuesta no aporta ${intent} o cambia el tema.`),
    };
  }

  if (question.type === 'gap') {
    const completed = blankSubstitution(question.stem, correct);
    return {
      explanation: `Al insertar “${correct}”, la oración queda “${completed}” y conserva estructura y significado.`,
      evidence: question.stem,
      evidenceReason: `La sustitución completa permite comprobar directamente la forma “${correct}”.`,
      lesson: 'Haz una prueba de sustitución',
      lessonBody: 'Inserta cada opción, lee la oración completa y valida significado, forma gramatical y colocación.',
      strategy: 'No elijas por traducción aislada: sustituye y comprueba las palabras a ambos lados del espacio.',
      optionRationales: question.options.map((option) => option === correct
        ? `Prueba correcta: “${blankSubstitution(question.stem, option)}”. La construcción queda completa y natural.`
        : `Prueba del distractor: “${blankSubstitution(question.stem, option)}”. La combinación no conserva a la vez la estructura y el sentido del contexto.`),
    };
  }

  if (!passageText) throw new Error(`Lectura sin pasaje en pregunta ${question.n}`);
  const evidence = evidenceOverride ?? bestEvidenceSentence(passageText, question.stem, correct);
  return {
    explanation: `La respuesta “${correct}” es la paráfrasis o conclusión que conserva la información de “${evidence}”.`,
    evidence,
    evidenceReason: `La oración citada aporta la información necesaria para justificar “${correct}” sin conocimiento externo.`,
    lesson: 'Ancla la respuesta en una oración',
    lessonBody: 'Una opción plausible no basta: identifica la frase que la demuestra y rechaza cualquier detalle añadido o invertido.',
    strategy: 'Localiza evidencia, compara sujeto–acción–resultado y acepta paráfrasis sin agregar información.',
    optionRationales: question.options.map((option) => option === correct
      ? `“${option}” conserva la idea demostrable en “${evidence}”.`
      : `“${option}” afirma algo distinto, más amplio o invertido frente a la evidencia “${evidence}”.`),
  };
}

export function getGuidedWorkbookQuestions(examId: string): IcfesPracticeQuestion[] {
  if (!GUIDED_WORKBOOK_IDS.includes(examId as typeof GUIDED_WORKBOOK_IDS[number])) return [];
  const exam = getSimulacro(examId);
  if (!exam) return [];

  return exam.questions.map((question) => {
    const passage = question.passageId ? exam.passages.find((item) => item.id === question.passageId) : undefined;
    const review = examId === 'icfes-2023-g11'
      ? REVIEW[question.n]
      : automaticReview(question, passage?.text, EVIDENCE_OVERRIDES[`${examId}:${question.n}`]);
    if (!review) throw new Error(`Falta revisión guiada para ${examId}-q${question.n}`);
    const officialPart = getSimulacroQuestionPart(exam, question.n);
    const options: IcfesQuestionOption[] = question.options.map((option, index) => ({
      text: option,
      rationale: review.optionRationales?.[index] ?? (index === question.answer
        ? `${DEFINITIONS[option]} Esta definición sí cumple todas las pistas.`
        : `${DEFINITIONS[option]} Por eso no cumple la descripción completa.`),
      ...(index === question.answer ? {} : { trap: index % 2 === 0 ? 'categoría incorrecta' as const : 'pista parcial' as const }),
    }));

    const partProfile = ({
      1: { skill: 'vocabulary_basic', subskill: 'health', type: 'word-match' as const, reinforcement: '/practica/icfes-saber-11/vocabulario' },
      2: { skill: 'functional_texts', subskill: 'notice-location', type: 'notice' as const, reinforcement: '/practica/icfes-saber-11/parte-2' },
      3: { skill: 'dialogue_completion', subskill: 'functional-response', type: 'dialogue' as const, reinforcement: '/practica/icfes-saber-11/parte-3' },
      4: { skill: 'grammar_recognition', subskill: 'grammar-cloze', type: 'grammar-cloze' as const, reinforcement: '/practica/icfes-saber-11/parte-4' },
      5: { skill: 'literal_reading', subskill: 'explicit-information', type: 'reading' as const, reinforcement: '/practica/icfes-saber-11/parte-5' },
      6: { skill: 'inference_reading', subskill: 'purpose-and-inference', type: 'reading' as const, reinforcement: '/practica/icfes-saber-11/parte-6' },
      7: { skill: 'lexical_grammar_cloze', subskill: 'collocation-and-form', type: 'lexical-cloze' as const, reinforcement: '/practica/icfes-saber-11/parte-7' },
    } as Partial<Record<number, { skill: string; subskill: string; type: IcfesPracticeQuestion['type']; reinforcement: string }>>)[officialPart];
    if (!partProfile) throw new Error(`Parte ${officialPart} sin perfil guiado en ${examId}`);

    return {
      id: `${exam.id}-guided-q${question.n}`,
      officialPart,
      skill: partProfile.skill,
      subskill: partProfile.subskill,
      type: partProfile.type,
      difficulty: question.n <= 8 ? 'base' : question.n <= 19 ? 'estandar' : 'reto',
      stimulus: passage?.text ?? question.stem,
      stimulusLabel: passage?.title ?? (question.type === 'dialog' ? 'Conversación' : 'Banco temático del cuadernillo'),
      wordBank: question.vocabWords,
      prompt: passage ? question.stem : question.type === 'dialog' ? 'What is the best response?' : question.stem,
      options,
      answerIndex: question.answer,
      explanation: review.explanation,
      evidence: { quote: review.evidence, reason: review.evidenceReason },
      strategy: review.strategy ?? 'Clasifica primero la respuesta como acción, persona, lugar, problema o tratamiento; después comprueba la pista semántica.',
      microLesson: { title: review.lesson, body: review.lessonBody },
      targetSeconds: 30,
      tags: ['official-workbook', `part-${officialPart}`, 'guided-complete'],
      reinforcement: { label: `Reforzar Parte ${officialPart}`, href: partProfile.reinforcement },
      source: { type: 'official-workbook', reference: exam.source },
      reviewedAt: '2026-08-04',
      editorialStatus: 'reviewed',
    };
  });
}
