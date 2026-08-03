import type { IcfesOfficialPart } from './parts';
import type { IcfesPracticeQuestion } from './questions';
import type { IcfesPracticeStage } from './part-one-lesson';

export interface IcfesLessonExample {
  id: string;
  stimulus: string;
  stimulusLabel: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  decisiveClue: string;
  reasoning: string;
  distractor: string;
}

export interface IcfesLessonGroup {
  id: string;
  label: string;
  subtitle: string;
  icon: string;
  examples: IcfesLessonExample[];
}

export interface IcfesPartLessonConfig {
  part: IcfesOfficialPart;
  visual: 'notice' | 'dialogue' | 'grammar-cloze' | 'literal-reading' | 'inference-reading' | 'lexical-cloze';
  skill: string;
  formatTitle: string;
  formatBody: string;
  evaluatesTitle: string;
  evaluatesBody: string;
  strategyTitle: string;
  strategyBody: string;
  anatomy: IcfesLessonExample;
  lookFor: string;
  answerWith: string;
  avoid: string;
  methodSteps: Array<{ title: string; body: string }>;
  clueTools: Array<{ label: string; examples: string; body: string }>;
  families: Array<{ icon: string; title: string; examples: string }>;
  groups: IcfesLessonGroup[];
}

type ExampleTuple = [string, string, string, string[], number, string, string, string];

function examples(label: string, rows: ExampleTuple[]): IcfesLessonExample[] {
  return rows.map(([id, stimulus, prompt, options, answerIndex, decisiveClue, reasoning, distractor]) => ({
    id, stimulus, stimulusLabel: label, prompt, options, answerIndex, decisiveClue, reasoning, distractor,
  }));
}

const PART_TWO: IcfesPartLessonConfig = {
  part: 2,
  visual: 'notice',
  skill: 'functional_texts',
  formatTitle: 'Avisos breves · 3 lugares posibles',
  formatBody: 'Cada pregunta muestra un aviso y tres opciones. Debes decidir en qué lugar podría aparecer según su propósito.',
  evaluatesTitle: 'Conocimiento pragmático',
  evaluatesBody: 'Relacionas lo que el aviso busca que una persona haga —o deje de hacer— con un espacio real.',
  strategyTitle: 'Acción → objeto → lugar',
  strategyBody: 'No elijas por una palabra suelta. Reconstruye la situación: quién lee el aviso, qué debe hacer y dónde tendría sentido.',
  anatomy: {
    id: 'notice-anatomy', stimulus: 'PLEASE RETURN ALL BOOKS AT THIS DESK', stimulusLabel: 'Aviso',
    prompt: 'Where would you most likely see this notice?', options: ['In a library', 'In a restaurant', 'At a bus station'], answerIndex: 0,
    decisiveClue: 'return · books · desk', reasoning: 'La acción de devolver libros en un mostrador pertenece a una biblioteca.',
    distractor: 'Restaurant y bus station pueden tener desk, pero no un sistema para devolver books.',
  },
  lookFor: 'Verbo, objeto, restricción y persona a la que se dirige el aviso.',
  answerWith: 'El lugar donde todas esas pistas forman una situación normal.',
  avoid: 'Elegir un sitio porque coincide con una sola palabra como desk, tickets o children.',
  methodSteps: [
    { title: 'Convierte el aviso en una acción', body: 'Return books se vuelve “devolver libros”; keep gate clear se vuelve “no bloquear una entrada”.' },
    { title: 'Identifica el objeto o usuario', body: 'Books, patients, passengers o staff reducen rápidamente los lugares posibles.' },
    { title: 'Prueba cada lugar', body: 'Imagina el aviso instalado allí y pregunta si la instrucción sería necesaria y natural.' },
    { title: 'Exige coincidencia total', body: 'La respuesta correcta explica el verbo y el objeto; el distractor suele explicar solo uno.' },
  ],
  clueTools: [
    { label: 'Acción', examples: 'return · pay · wear', body: 'Indica lo que el lector debe hacer.' },
    { label: 'Objeto', examples: 'books · trays · tickets', body: 'Conecta el aviso con una actividad.' },
    { label: 'Restricción', examples: 'no · only · must', body: 'Define la regla del espacio.' },
    { label: 'Audiencia', examples: 'staff · visitors · passengers', body: 'Muestra quién usa el lugar.' },
  ],
  families: [
    { icon: '▣', title: 'Servicios', examples: 'library · bank · post office' },
    { icon: '⚕', title: 'Salud', examples: 'clinic · pharmacy · hospital' },
    { icon: '↔', title: 'Transporte', examples: 'airport · station · parking lot' },
    { icon: '⌂', title: 'Comercio', examples: 'store · café · restaurant' },
    { icon: '⚑', title: 'Reglas', examples: 'staff only · keep clear · no entry' },
    { icon: '◎', title: 'Audiencias', examples: 'visitors · customers · students' },
  ],
  groups: [
    {
      id: 'objects-actions', label: 'Objeto + acción', subtitle: 'El objeto confirma dónde tiene sentido la instrucción.', icon: '▣',
      examples: examples('Aviso', [
        ['p2-return-books', 'PLEASE RETURN ALL BOOKS AT THIS DESK', 'Where would you see this notice?', ['In a library', 'In a restaurant', 'At a station'], 0, 'return · books', 'Las bibliotecas prestan y reciben libros en un desk.', 'Station comparte desk, pero no books.'],
        ['p2-trays', 'PLEASE LEAVE USED TRAYS HERE', 'Where would you see this notice?', ['In a cafeteria', 'In a classroom', 'At a bank'], 0, 'used trays', 'Las bandejas usadas se devuelven en una cafetería.', 'Classroom puede tener trays de materiales, pero no used trays de servicio.'],
        ['p2-prescriptions', 'PRESCRIPTIONS COLLECTED AT COUNTER 3', 'Where would you see this notice?', ['At a pharmacy', 'At a bakery', 'At a hotel'], 0, 'prescriptions · counter', 'Las recetas y su entrega pertenecen a una farmacia.', 'Bakery comparte counter, pero no prescriptions.'],
        ['p2-luggage', 'DO NOT LEAVE LUGGAGE UNATTENDED', 'Where would you see this notice?', ['At an airport', 'At a gym', 'In a museum'], 0, 'luggage · unattended', 'La seguridad de equipaje es una advertencia típica del aeropuerto.', 'Museum recibe visitantes, pero luggage no es central allí.'],
        ['p2-receipt', 'KEEP YOUR RECEIPT UNTIL YOU LEAVE THE STORE', 'Where would you see this notice?', ['In a shop', 'In a park', 'At a clinic'], 0, 'receipt · store', 'El propio aviso identifica la situación de compra.', 'Clinic puede entregar comprobantes, pero store hace la respuesta explícita.'],
      ]),
    },
    {
      id: 'rules', label: 'Reglas y prohibiciones', subtitle: 'La regla revela la función física del espacio.', icon: '!',
      examples: examples('Aviso', [
        ['p2-pool', 'SHOWER BEFORE ENTERING THE POOL', 'Where would you see this notice?', ['At a swimming pool', 'At a theater', 'At a supermarket'], 0, 'shower · pool', 'La higiene previa al ingreso es una regla de piscina.', 'Ningún otro lugar contiene la actividad pool.'],
        ['p2-silence', 'SILENCE — EXAM IN PROGRESS', 'Where would you see this notice?', ['At a school', 'At a market', 'At a stadium'], 0, 'exam in progress', 'Un examen requiere silencio en un entorno educativo.', 'Stadium puede pedir silencio en momentos puntuales, pero no por un exam.'],
        ['p2-helmet', 'HELMETS MUST BE WORN BEYOND THIS POINT', 'Where would you see this notice?', ['At a construction site', 'In a restaurant', 'At a library'], 0, 'helmets · must', 'El equipo de protección obligatorio apunta a construcción.', 'Otros lugares no requieren helmets para entrar.'],
        ['p2-gate', 'KEEP THIS GATE CLEAR AT ALL TIMES', 'Where would you see this notice?', ['At an emergency entrance', 'In a fitting room', 'At a cinema seat'], 0, 'gate · clear', 'Una entrada de emergencia debe quedar accesible.', 'Cinema puede tener exits, pero gate y clear describen acceso físico.'],
        ['p2-staff', 'STAFF ONLY BEYOND THIS DOOR', 'Where would you see this notice?', ['In a workplace', 'On a public beach', 'At a playground'], 0, 'staff only', 'La restricción separa una zona laboral de acceso público.', 'Beach y playground no suelen tener áreas definidas por staff.'],
      ]),
    },
    {
      id: 'service-users', label: 'Servicio y audiencia', subtitle: 'La persona mencionada conecta el aviso con el servicio.', icon: '◎',
      examples: examples('Aviso', [
        ['p2-passengers', 'PASSENGERS MUST SHOW TICKETS BEFORE BOARDING', 'Where would you see this notice?', ['At a station', 'At a hospital', 'In a school'], 0, 'passengers · boarding', 'Pasajeros que abordan y muestran tiquetes pertenecen al transporte.', 'School puede revisar tickets para eventos, pero no boarding.'],
        ['p2-patients', 'PATIENTS SHOULD CHECK IN AT RECEPTION', 'Where would you see this notice?', ['At a clinic', 'At a garage', 'In a bookstore'], 0, 'patients · reception', 'Patients identifica un servicio de salud.', 'Garage puede tener reception, pero no patients.'],
        ['p2-members', 'MEMBERS MUST SCAN THEIR CARD TO ENTER', 'Where would you see this notice?', ['At a gym', 'At a bakery', 'At a bus stop'], 0, 'members · scan card', 'El acceso por membresía y tarjeta es típico de un gimnasio.', 'Bus users pueden escanear tarjetas, pero no se denominan members normalmente.'],
        ['p2-visitors', 'VISITORS MUST SIGN IN AND WEAR A BADGE', 'Where would you see this notice?', ['At an office building', 'At a public park', 'On a street'], 0, 'visitors · badge', 'El registro y la identificación controlan acceso a oficinas.', 'Park recibe visitors, pero no requiere badge.'],
        ['p2-parents', 'PARENTS: COLLECT CHILDREN FROM THE MAIN GATE', 'Where would you see this notice?', ['At a school', 'At a bank', 'At a hotel'], 0, 'parents · collect children', 'La recogida de estudiantes en la puerta principal ocurre en una escuela.', 'Hotel recibe familias, pero no organiza salida general de children.'],
      ]),
    },
  ],
};

const PART_THREE: IcfesPartLessonConfig = {
  part: 3,
  visual: 'dialogue',
  skill: 'communicative_response',
  formatTitle: 'Conversación corta · 3 respuestas',
  formatBody: 'Lees la intervención de una persona y eliges la respuesta que otro interlocutor daría naturalmente en esa situación.',
  evaluatesTitle: 'Conocimiento comunicativo',
  evaluatesBody: 'Reconoces intención, relación entre hablantes y pertinencia social; una opción puede ser gramatical y aun así no responder.',
  strategyTitle: 'Intención → respuesta esperada',
  strategyBody: 'Antes de mirar opciones, decide si escuchaste una invitación, solicitud, pregunta, opinión o noticia.',
  anatomy: {
    id: 'dialogue-anatomy', stimulus: 'Would you like to come to my birthday party?', stimulusLabel: 'Persona 1',
    prompt: 'Choose the most appropriate response.', options: ['I’d love to. What time?', 'It was yesterday.', 'I don’t know her.'], answerIndex: 0,
    decisiveClue: 'Would you like to…?', reasoning: 'La estructura formula una invitación; aceptar y pedir el horario mantiene el intercambio.',
    distractor: 'Las otras frases son posibles en inglés, pero no aceptan, rechazan ni aclaran la invitación.',
  },
  lookFor: 'Tipo de intervención, tiempo verbal, pronombres y tono entre hablantes.',
  answerWith: 'La frase que realiza la función social esperada y permite continuar la conversación.',
  avoid: 'Elegir una oración solo porque comparte vocabulario o es gramaticalmente correcta.',
  methodSteps: [
    { title: 'Nombra la intención', body: '¿Es pregunta, invitación, solicitud, disculpa, opinión o noticia?' },
    { title: 'Predice una función', body: 'No predigas palabras exactas: piensa “aceptar”, “dar información”, “agradecer” o “mostrar sorpresa”.' },
    { title: 'Comprueba referencias', body: 'Revisa who, when, it, them y tiempos verbales para que ambos turnos hablen de lo mismo.' },
    { title: 'Escucha naturalidad', body: 'Lee el diálogo completo. La respuesta correcta debe sonar socialmente posible, no solo correcta en gramática.' },
  ],
  clueTools: [
    { label: 'Estructura', examples: 'Would you…? · Could I…?', body: 'Señala invitación, oferta o petición.' },
    { label: 'Palabra interrogativa', examples: 'where · when · why', body: 'Define qué información debe aparecer.' },
    { label: 'Tiempo', examples: 'did · have · will', body: 'Mantiene la referencia temporal.' },
    { label: 'Tono', examples: 'sorry · great · really?', body: 'Conecta emoción y cortesía.' },
  ],
  families: [
    { icon: '+', title: 'Invitaciones', examples: 'accept · decline · ask details' },
    { icon: '↗', title: 'Solicitudes', examples: 'agree · refuse politely' },
    { icon: '?', title: 'Preguntas', examples: 'place · time · reason' },
    { icon: '“', title: 'Opiniones', examples: 'agree · disagree · qualify' },
    { icon: '!', title: 'Noticias', examples: 'surprise · sympathy · praise' },
    { icon: '○', title: 'Cortesía', examples: 'thanks · apology · permission' },
  ],
  groups: [
    {
      id: 'invitations-requests', label: 'Invitaciones y solicitudes', subtitle: 'Responde a la función social, no a una palabra aislada.', icon: '+',
      examples: examples('Persona 1', [
        ['p3-party', 'Would you like to come to my birthday party?', 'Choose the best response.', ['I’d love to. What time?', 'It was yesterday.', 'I don’t know her.'], 0, 'Would you like to…?', 'Acepta la invitación y solicita un dato necesario.', 'La gramática de las otras opciones no compensa su falta de función.'],
        ['p3-window', 'Could you open the window, please?', 'Choose the best response.', ['Of course.', 'It opens at nine.', 'I like the view.'], 0, 'Could you… please?', 'Una solicitud cortés espera aceptación o negativa cortés.', 'Opens comparte open, pero responde un horario inexistente.'],
        ['p3-help', 'Can you help me carry these boxes?', 'Choose the best response.', ['Sure. Where should I put them?', 'They are very heavy.', 'I bought them online.'], 0, 'Can you help me…?', 'Acepta y aclara cómo completar la ayuda.', 'Heavy se relaciona con boxes, pero no responde a la solicitud.'],
        ['p3-lunch', 'Why don’t we have lunch together?', 'Choose the best response.', ['That sounds great.', 'I had a sandwich.', 'The kitchen is small.'], 0, 'Why don’t we…?', 'La expresión funciona como sugerencia o invitación.', 'Had lunch habla del tema, pero no acepta ni rechaza el plan.'],
        ['p3-borrow', 'May I borrow your dictionary?', 'Choose the best response.', ['Yes, but I need it back today.', 'I bought it last year.', 'The word is difficult.'], 0, 'May I borrow…?', 'Concede permiso y establece una condición relevante.', 'Bought it comparte el objeto, pero ignora la petición.'],
      ]),
    },
    {
      id: 'information', label: 'Preguntas de información', subtitle: 'La palabra interrogativa define la clase de respuesta.', icon: '?',
      examples: examples('Persona 1', [
        ['p3-where', 'Where did you leave the keys?', 'Choose the best response.', ['On the kitchen table.', 'At about six.', 'Because I was late.'], 0, 'Where', 'Where exige un lugar.', 'At six responde when; because responde why.'],
        ['p3-when', 'When does the next class start?', 'Choose the best response.', ['At half past ten.', 'In room twelve.', 'With Mr. Green.'], 0, 'When', 'When exige una referencia de tiempo.', 'Room responde where y Mr. Green responde who.'],
        ['p3-why', 'Why are you taking an umbrella?', 'Choose the best response.', ['Because it might rain.', 'It is next to the door.', 'I bought a blue one.'], 0, 'Why', 'Because introduce la razón solicitada.', 'Las otras opciones describen ubicación o compra.'],
        ['p3-how-often', 'How often do you visit your grandparents?', 'Choose the best response.', ['About twice a month.', 'For two hours.', 'Since last summer.'], 0, 'How often', 'La pregunta pide frecuencia.', 'For two hours indica duración; since indica inicio temporal.'],
        ['p3-which', 'Which bus goes to the city center?', 'Choose the best response.', ['The number 24.', 'At the main station.', 'In about ten minutes.'], 0, 'Which bus', 'Which pide identificar una opción concreta.', 'Las otras respuestas dan lugar o tiempo.'],
      ]),
    },
    {
      id: 'reactions', label: 'Opiniones y noticias', subtitle: 'La emoción y el tono también forman parte de la respuesta.', icon: '!',
      examples: examples('Persona 1', [
        ['p3-passed', 'I passed my driving test!', 'Choose the best response.', ['Congratulations!', 'Be careful next time.', 'That is too expensive.'], 0, 'passed · !', 'Una noticia positiva espera felicitación.', 'Be careful podría relacionarse con conducir, pero contradice el logro.'],
        ['p3-lost', 'I lost my wallet on the bus.', 'Choose the best response.', ['Oh no! Have you called the bus company?', 'It was a comfortable bus.', 'I never carry coins.'], 0, 'lost my wallet', 'Expresa preocupación y propone una acción útil.', 'Las otras frases hablan del tema sin reaccionar a la pérdida.'],
        ['p3-film', 'I think the film was too long.', 'Choose the best response.', ['I agree. The ending was slow too.', 'It starts at eight.', 'I bought two tickets.'], 0, 'I think…', 'Responde a una opinión con acuerdo y una razón relacionada.', 'Horario y entradas no evalúan la opinión.'],
        ['p3-sick', 'I’m afraid I can’t come. I’m feeling sick.', 'Choose the best response.', ['I’m sorry to hear that. Get well soon.', 'The meeting is upstairs.', 'I came by taxi.'], 0, 'feeling sick', 'La respuesta apropiada expresa empatía.', 'Los otros datos no reaccionan al problema comunicado.'],
        ['p3-job', 'I’ve got a new job starting Monday.', 'Choose the best response.', ['That’s wonderful news!', 'Monday was busy.', 'I don’t work there.'], 0, 'new job', 'Una noticia positiva recibe entusiasmo o felicitación.', 'Monday comparte tiempo, pero no responde al anuncio.'],
      ]),
    },
  ],
};

const PART_FOUR: IcfesPartLessonConfig = {
  part: 4, visual: 'grammar-cloze', skill: 'grammar_in_context',
  formatTitle: 'Texto con espacios · 3 opciones gramaticales', formatBody: 'Completas cada espacio con la forma que hace correcta la oración y mantiene la cohesión del texto.',
  evaluatesTitle: 'Conocimiento gramatical', evaluatesBody: 'Controlas tiempos, concordancia, pronombres, artículos, preposiciones y conectores dentro de un discurso.',
  strategyTitle: 'Función → concordancia → contexto', strategyBody: 'Define qué categoría falta, comprueba sus dependencias locales y relee el párrafo completo.',
  anatomy: { id: 'grammar-anatomy', stimulus: 'Every morning, Leo ___ to school by bus.', stimulusLabel: 'Texto', prompt: 'Choose the correct option.', options: ['go', 'goes', 'going'], answerIndex: 1, decisiveClue: 'Every morning · Leo', reasoning: 'La rutina exige presente simple y Leo exige tercera persona singular: goes.', distractor: 'Go ignora la concordancia; going necesita un auxiliar.' },
  lookFor: 'Marcadores de tiempo, sujeto, palabra anterior y relación con la oración siguiente.', answerWith: 'La forma que cumple categoría, concordancia y significado simultáneamente.', avoid: 'Elegir por cómo “suena” sin justificar la estructura que controla el espacio.',
  methodSteps: [{title:'Lee sin opciones',body:'Predice si falta verbo, pronombre, artículo, preposición o conector.'},{title:'Marca la dependencia',body:'Busca sujeto, tiempo, sustantivo o verbo que controla la forma.'},{title:'Prueba la estructura',body:'Inserta cada candidato y elimina el que rompe una regla visible.'},{title:'Relee el párrafo',body:'La forma local también debe conservar secuencia y referencia.'}],
  clueTools: [{label:'Tiempo',examples:'yesterday · every day · since',body:'Controla la forma verbal.'},{label:'Sujeto',examples:'he · they · the news',body:'Define concordancia.'},{label:'Estructura',examples:'to + verb · have + participle',body:'Restringe la categoría.'},{label:'Relación',examples:'but · because · although',body:'Conecta ideas.'}],
  families: [{icon:'⌁',title:'Tiempos',examples:'present · past · perfect'},{icon:'◎',title:'Referencia',examples:'it · they · which'},{icon:'A',title:'Determinantes',examples:'a · an · the'},{icon:'↔',title:'Preposiciones',examples:'in · on · at'},{icon:'+',title:'Cuantificadores',examples:'much · many · few'},{icon:'∴',title:'Conectores',examples:'because · however'}],
  groups: [
    {id:'verbs',label:'Verbos y tiempo',subtitle:'Usa sujeto y marcador temporal.',icon:'⌁',examples:examples('Texto',[['p4-v1','Every morning, Leo ___ to school by bus.','Choose the correct option.',['go','goes','going'],1,'Every morning · Leo','Presente simple y tercera persona exigen goes.','Go no concuerda; going necesita auxiliar.'],['p4-v2','Last weekend, we ___ our grandparents.','Choose the correct option.',['visit','visited','visiting'],1,'Last weekend','El marcador cerrado exige pasado simple.','Visit contradice el tiempo pasado.'],['p4-v3','She has ___ the report already.','Choose the correct option.',['finish','finished','finishing'],1,'has · already','Have exige participio: finished.','Finish es forma base.'],['p4-v4','They were ___ when I arrived.','Choose the correct option.',['cook','cooked','cooking'],2,'were · when','Were + ing forma pasado continuo.','Cooked no completa la estructura continua.'],['p4-v5','If it rains, we ___ at home.','Choose the correct option.',['stay','stayed','will stay'],2,'If + present','El primer condicional usa will en la consecuencia.','Stayed cambia la situación a pasado.']])},
    {id:'reference',label:'Referencia y determinantes',subtitle:'Conecta sustantivos, pronombres y artículos.',icon:'◎',examples:examples('Texto',[['p4-r1','I bought a laptop. ___ is very light.','Choose the correct option.',['He','It','They'],1,'a laptop','It retoma un objeto singular.','They sería plural.'],['p4-r2','Mia is ___ engineer.','Choose the correct option.',['a','an','the'],1,'engineer · vowel sound','An precede sonido vocálico.','A no corresponde al sonido inicial.'],['p4-r3','The students ___ projects won received prizes.','Choose the correct option.',['who','whose','which'],1,'projects belong to students','Whose expresa posesión.','Who no conecta con el sustantivo projects.'],['p4-r4','There isn’t ___ milk left.','Choose the correct option.',['many','much','few'],1,'milk · uncountable','Much cuantifica incontables.','Many exige plural contable.'],['p4-r5','I saw two films. ___ second one was better.','Choose the correct option.',['A','An','The'],2,'second one','El ordinal identifica un elemento específico.','A lo presentaría como no identificado.']])},
    {id:'links',label:'Preposiciones y conectores',subtitle:'Lee la relación entre palabras e ideas.',icon:'∴',examples:examples('Texto',[['p4-l1','The meeting starts ___ 8:30.','Choose the correct option.',['in','on','at'],2,'8:30','At acompaña una hora exacta.','On se usa con días y fechas.'],['p4-l2','We stayed inside ___ it was raining.','Choose the correct option.',['because','but','although'],0,'cause of staying inside','Because introduce la causa.','But indicaría contraste.'],['p4-l3','___ she was tired, she finished the race.','Choose the correct option.',['Because','Although','So'],1,'tired · finished','Although expresa contraste inesperado.','Because cambiaría la relación lógica.'],['p4-l4','He is interested ___ science.','Choose the correct option.',['at','in','for'],1,'interested','La colocación fija es interested in.','At no completa la colocación.'],['p4-l5','First mix the ingredients; ___, bake for 30 minutes.','Choose the correct option.',['however','then','because'],1,'sequence','Then marca el siguiente paso.','However introduce contraste inexistente.']])},
  ],
};

const PART_FIVE: IcfesPartLessonConfig = {
  part: 5, visual: 'literal-reading', skill: 'literal_reading',
  formatTitle: 'Texto básico · preguntas de comprensión', formatBody: 'Lees un texto de nivel básico y respondes preguntas cuya evidencia aparece explícitamente.',
  evaluatesTitle: 'Lectura literal', evaluatesBody: 'Localizas detalles, secuencias, causas expresas y referencias sin añadir conocimiento externo.',
  strategyTitle: 'Pregunta → palabra clave → evidencia', strategyBody: 'Busca la zona exacta, reconoce la paráfrasis y exige que la respuesta diga lo mismo que el texto.',
  anatomy: {id:'literal-anatomy',stimulus:'Nora takes the 7:15 bus because her school is across town. The journey takes forty minutes.',stimulusLabel:'Lectura',prompt:'Why does Nora take the bus?',options:['Her school is far away.','She dislikes walking.','The bus is free.'],answerIndex:0,decisiveClue:'school is across town',reasoning:'Across town expresa distancia y parafrasea far away.',distractor:'El texto nunca dice que caminar le desagrade ni que el bus sea gratuito.'},
  lookFor:'Nombre, tiempo, lugar o causa que aparece en la pregunta y sus sinónimos.',answerWith:'La paráfrasis más fiel de una oración localizable.',avoid:'Completar vacíos con lo que parece lógico pero el texto no afirma.',
  methodSteps:[{title:'Lee primero la pregunta',body:'Define si buscas quién, cuándo, dónde, por qué o qué ocurrió.'},{title:'Escanea la evidencia',body:'Localiza nombres, cifras o sinónimos sin releer todo indiscriminadamente.'},{title:'Compara significado',body:'La respuesta suele cambiar palabras, no la información.'},{title:'Cierra el texto',body:'Si no puedes señalar evidencia exacta, la opción todavía no está probada.'}],
  clueTools:[{label:'Nombres',examples:'Nora · the club',body:'Ubican participantes.'},{label:'Tiempo',examples:'7:15 · after lunch',body:'Ordena eventos.'},{label:'Causa',examples:'because · so',body:'Explica por qué.'},{label:'Paráfrasis',examples:'across town = far away',body:'Conecta texto y opción.'}],
  families:[{icon:'?',title:'Quién',examples:'person · group'},{icon:'⌖',title:'Dónde',examples:'place · direction'},{icon:'◷',title:'Cuándo',examples:'time · sequence'},{icon:'∵',title:'Por qué',examples:'cause · purpose'},{icon:'↔',title:'Referencia',examples:'it · they · this'},{icon:'=',title:'Paráfrasis',examples:'same idea · new words'}],
  groups: [
    {id:'details',label:'Detalles explícitos',subtitle:'Localiza persona, lugar, tiempo o cantidad.',icon:'⌖',examples:examples('Lectura',[['p5-d1','Nora takes the 7:15 bus because her school is across town.','Why does Nora take the bus?',['Her school is far away.','She dislikes walking.','The bus is free.'],0,'across town','Across town parafrasea far away.','Las otras razones no aparecen.'],['p5-d2','The museum opens at nine on weekdays and at ten on Sundays.','When does it open on Sunday?',['At 9:00','At 10:00','At 11:00'],1,'at ten on Sundays','La hora está explícita.','Nine corresponde a weekdays.'],['p5-d3','Leo bought three notebooks and a blue folder.','What color was the folder?',['Blue','Green','Red'],0,'a blue folder','Blue modifica directamente folder.','Los otros colores no aparecen.'],['p5-d4','The club meets in Room 12 beside the library.','Where does the club meet?',['In the library','In Room 12','In the cafeteria'],1,'in Room 12','El lugar se declara literalmente.','Beside no significa inside the library.'],['p5-d5','Maya’s brother Sam prepared dinner for the family.','Who prepared dinner?',['Maya','Sam','The family'],1,'brother Sam prepared','Sam es el sujeto de prepared.','Family recibe la cena.']])},
    {id:'sequence',label:'Secuencia y causa',subtitle:'Sigue conectores temporales y causales.',icon:'◷',examples:examples('Lectura',[['p5-s1','First wash the fruit. Then cut it into small pieces.','What happens after washing the fruit?',['It is cut.','It is bought.','It is cooked.'],0,'Then cut it','Then marca el paso siguiente.','Cooked nunca aparece.'],['p5-s2','Ben stayed home because he had a fever.','Why did Ben stay home?',['He was ill.','It was raining.','He was working.'],0,'because · fever','Fever prueba que estaba enfermo.','Las otras causas son inventadas.'],['p5-s3','After lunch, Ana called her mother and later went shopping.','What did Ana do before shopping?',['She had dinner.','She called her mother.','She went home.'],1,'called · later went shopping','Later sitúa shopping después de la llamada.','Went home no aparece.'],['p5-s4','The road was closed, so the driver used another route.','Why did the driver change route?',['The road was closed.','He was lost.','He needed fuel.'],0,'closed · so','So conecta cierre y cambio de ruta.','Lost y fuel no están en el texto.'],['p5-s5','Kim finished her homework before she watched the film.','What did Kim do first?',['She watched the film.','She finished her homework.','She went to school.'],1,'before','Before establece el orden explícito.','School no se menciona.']])},
    {id:'paraphrase',label:'Referencia y paráfrasis',subtitle:'Reconoce la misma idea con palabras diferentes.',icon:'=',examples:examples('Lectura',[['p5-p1','The café was crowded, so we could not find a table.','What was the problem?',['The café was full.','The food was cold.','The café was closed.'],0,'crowded','Crowded equivale a full of people.','Closed contradice que estaban dentro.'],['p5-p2','Sara lent her bicycle to Emma for the weekend.','What did Emma receive?',['A bicycle','Some money','A ticket'],0,'lent her bicycle to Emma','Emma recibió temporalmente la bicicleta.','Los otros objetos no aparecen.'],['p5-p3','Tom put the vase on the shelf. It was too high for the child.','What does “It” refer to?',['The vase','The shelf','The child'],1,'too high','La altura describe shelf, no vase.','Child no puede ser un objeto high.'],['p5-p4','The concert was postponed until Friday.','What happened to the concert?',['It was canceled.','It was moved to a later day.','It started early.'],1,'postponed until Friday','Postponed significa moved later.','Canceled elimina el evento.'],['p5-p5','Eva rarely drives; she usually takes the train.','How does Eva normally travel?',['By car','By train','By bicycle'],1,'usually takes the train','Normally corresponde a usually.','Rarely descarta car como hábito.']])},
  ],
};

export const ICFES_PART_LESSONS: Partial<Record<IcfesOfficialPart, IcfesPartLessonConfig>> = {
  2: PART_TWO,
  3: PART_THREE,
  4: PART_FOUR,
  5: PART_FIVE,
};

const TYPE_BY_PART: Record<IcfesOfficialPart, IcfesPracticeQuestion['type']> = {
  1: 'word-match', 2: 'notice', 3: 'dialogue', 4: 'grammar-cloze', 5: 'reading', 6: 'reading', 7: 'lexical-cloze',
};

function exampleToQuestion(config: IcfesPartLessonConfig, example: IcfesLessonExample, index: number): IcfesPracticeQuestion {
  return {
    id: `lesson-${example.id}`,
    officialPart: config.part,
    skill: config.skill,
    subskill: config.groups.find((group) => group.examples.some((item) => item.id === example.id))?.id ?? 'guided-example',
    type: TYPE_BY_PART[config.part],
    difficulty: index < 4 ? 'estandar' : 'reto',
    stimulus: example.stimulus,
    stimulusLabel: example.stimulusLabel,
    prompt: example.prompt,
    options: example.options.map((text, optionIndex) => ({
      text,
      rationale: optionIndex === example.answerIndex ? example.reasoning : optionIndex === (example.answerIndex + 1) % example.options.length ? example.distractor : 'Esta opción no cumple simultáneamente la intención y las pistas decisivas del estímulo.',
      ...(optionIndex === example.answerIndex ? {} : { trap: 'pista parcial' as const }),
    })),
    answerIndex: example.answerIndex,
    explanation: example.reasoning,
    evidence: { quote: example.decisiveClue, reason: 'Estas palabras revelan la función comunicativa o el contexto que decide la respuesta.' },
    strategy: config.strategyBody,
    microLesson: { title: config.strategyTitle, body: example.distractor },
    targetSeconds: 30 + Math.min(index * 2, 12),
    tags: [config.skill, config.visual, 'guided-lesson'],
    reinforcement: { label: `Volver a la Parte ${config.part}`, href: `/practica/icfes-saber-11/parte-${config.part}` },
    source: { type: 'original-practice', reference: `Ejercicio propio basado en la habilidad oficial de la Parte ${config.part}.` },
    reviewedAt: '2026-08-03',
    editorialStatus: 'published',
  };
}

export function buildLessonStages(config: IcfesPartLessonConfig, baseQuestions: IcfesPracticeQuestion[]): IcfesPracticeStage[] {
  const generated = config.groups.flatMap((group) => group.examples).slice(0, 8).map((item, index) => exampleToQuestion(config, item, index));
  return [
    { id: `part-${config.part}-recognize`, label: 'Nivel 1 · Reconoce la tarea', shortLabel: 'Reconoce', focus: 'Identifica la función y la clase de pista antes de elegir.', questions: baseQuestions },
    { id: `part-${config.part}-distinguish`, label: 'Nivel 2 · Distingue opciones cercanas', shortLabel: 'Distingue', focus: 'Usa dos pistas simultáneas para eliminar respuestas parciales.', questions: generated.slice(0, 4) },
    { id: `part-${config.part}-transfer`, label: 'Nivel 3 · Transfiere bajo presión', shortLabel: 'Transfiere', focus: 'Resuelve variaciones más sutiles sin depender de palabras repetidas.', questions: generated.slice(4, 8) },
  ];
}
