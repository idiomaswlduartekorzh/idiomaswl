export type ListeningOption = { label: string; correct: boolean; feedback: string }

export type ListeningQuestion = {
  prompt: string
  options: ListeningOption[]
}

export type ListeningExercise = {
  id: string
  order: number
  title: string
  titleEs: string
  objective: string
  duration: number
  grammar: string[]
  keywords: Array<{ en: string; es: string }>
  transcript: Array<{ en: string; es: string }>
  gist: ListeningQuestion
  details: ListeningQuestion[]
  consolidation: ListeningQuestion
}

const q = (prompt: string, correct: string, wrong: string[], feedback: string): ListeningQuestion => ({
  prompt,
  options: [
    { label: correct, correct: true, feedback },
    ...wrong.map(label => ({ label, correct: false, feedback })),
  ],
})

const sentence = (en: string, es: string) => ({ en, es })

export const LISTENING_A1: ListeningExercise[] = [
  {
    id: 'hello-emma', order: 1, title: 'Hello, I’m Emma', titleEs: 'Una presentación personal', duration: 20,
    objective: 'Identifica quién habla, de dónde es y qué estudia.', grammar: ['to be', 'países', 'profesiones'],
    keywords: [{ en: 'name', es: 'nombre' }, { en: 'from', es: 'de / procedente de' }, { en: 'live', es: 'vivir' }, { en: 'student', es: 'estudiante' }, { en: 'class', es: 'clase' }],
    transcript: [sentence('Hello. My name is Emma Brown, and I am twenty years old.', 'Hola. Me llamo Emma Brown y tengo veinte años.'), sentence('I am from London, but I live in a small town near the city.', 'Soy de Londres, pero vivo en un pueblo pequeño cerca de la ciudad.'), sentence('I am a student, and I study art at college.', 'Soy estudiante y estudio arte en la universidad.'), sentence('My English class is on Tuesday and Thursday.', 'Mi clase de inglés es los martes y jueves.'), sentence('I am happy to meet new people and learn new things.', 'Estoy feliz de conocer gente nueva y aprender cosas nuevas.')],
    gist: q('¿De qué habla Emma?', 'De ella misma, su ciudad y sus estudios.', ['De su familia.', 'De un viaje a Londres.'], 'Emma se presenta: dice su nombre, de dónde es y qué estudia.'),
    details: [q('¿De dónde es Emma?', 'De Londres.', ['De un pueblo pequeño.', 'De Nueva York.'], 'Ella dice: “I am from London.”'), q('¿Qué estudia?', 'Arte.', ['Inglés.', 'Medicina.'], 'La frase audible es “I study art at college.”'), q('¿Cuándo tiene clase de inglés?', 'Martes y jueves.', ['Lunes y miércoles.', 'Todos los días.'], 'Emma dice “on Tuesday and Thursday.”')],
    consolidation: q('Completa: Emma is a ___.', 'student', ['teacher', 'nurse'], 'Escucha de nuevo el bloque “I am a student.”'),
  },
  {
    id: 'my-family', order: 2, title: 'My Family', titleEs: 'Mi familia', duration: 21,
    objective: 'Identifica integrantes de la familia, edades y profesiones.', grammar: ['posesivos', 'to be', 'familia'],
    keywords: [{ en: 'parents', es: 'padres' }, { en: 'brother', es: 'hermano' }, { en: 'sister', es: 'hermana' }, { en: 'nurse', es: 'enfermera' }, { en: 'together', es: 'juntos' }],
    transcript: [sentence('Hi. This is my family. My parents are Tom and Sarah.', 'Hola. Esta es mi familia. Mis padres son Tom y Sarah.'), sentence('My father is a bus driver, and my mother is a nurse.', 'Mi padre es conductor de bus y mi madre es enfermera.'), sentence('I have one brother and one sister.', 'Tengo un hermano y una hermana.'), sentence('My brother is twelve, and my sister is sixteen.', 'Mi hermano tiene doce años y mi hermana dieciséis.'), sentence('We live in the same house. My family is small, but we are very happy together.', 'Vivimos en la misma casa. Mi familia es pequeña, pero somos muy felices juntos.')],
    gist: q('¿Cuál es el tema principal?', 'La familia de la persona.', ['Una clase de inglés.', 'Un día en el trabajo.'], 'La persona presenta a sus padres, hermano y hermana.'),
    details: [q('¿Cuál es la profesión de la madre?', 'Es enfermera.', ['Es conductora de bus.', 'Es estudiante.'], 'Se oye “my mother is a nurse.”'), q('¿Cuántos hermanos tiene la persona?', 'Dos: un hermano y una hermana.', ['Uno.', 'Tres.'], 'Dice “one brother and one sister.”'), q('¿Qué edad tiene la hermana?', 'Dieciséis.', ['Doce.', 'Veinte.'], 'La hermana tiene “sixteen”.')],
    consolidation: q('¿Qué palabra escuchaste para “padres”?', 'parents', ['children', 'friends'], '“My parents are Tom and Sarah.”'),
  },
  {
    id: 'my-bedroom', order: 3, title: 'My Bedroom', titleEs: 'Mi habitación', duration: 20,
    objective: 'Ubica objetos dentro de una habitación.', grammar: ['there is / there are', 'preposiciones de lugar'],
    keywords: [{ en: 'bedroom', es: 'habitación' }, { en: 'pillow', es: 'almohada' }, { en: 'desk', es: 'escritorio' }, { en: 'window', es: 'ventana' }, { en: 'cupboard', es: 'armario' }],
    transcript: [sentence('My bedroom is small, but it is comfortable.', 'Mi habitación es pequeña, pero cómoda.'), sentence('There is a bed next to the window. On the bed, there are two blue pillows.', 'Hay una cama junto a la ventana. Sobre la cama hay dos almohadas azules.'), sentence('My desk is in front of the window, and my books are on the desk.', 'Mi escritorio está frente a la ventana y mis libros están sobre el escritorio.'), sentence('There is a small lamp beside my computer.', 'Hay una lámpara pequeña al lado de mi computador.'), sentence('My clothes are in a white cupboard near the door.', 'Mi ropa está en un armario blanco cerca de la puerta.')],
    gist: q('¿Qué está describiendo la persona?', 'Su habitación.', ['Su ciudad.', 'Su escuela.'], 'La persona nombra la cama, el escritorio y el armario.'),
    details: [q('¿Dónde está la cama?', 'Al lado de la ventana.', ['Frente a la puerta.', 'Debajo del escritorio.'], 'Se oye “next to the window.”'), q('¿De qué color son las almohadas?', 'Azules.', ['Blancas.', 'Rojas.'], 'Hay “two blue pillows”.'), q('¿Dónde están los libros?', 'Sobre el escritorio.', ['En el armario.', 'En la cama.'], 'La frase es “my books are on the desk.”')],
    consolidation: q('¿Qué significa “next to”?', 'Al lado de.', ['Debajo de.', 'Frente a.'], 'La cama está “next to the window”.'),
  },
  {
    id: 'our-house', order: 4, title: 'Our House', titleEs: 'Nuestra casa', duration: 24,
    objective: 'Comprende la distribución básica de una casa.', grammar: ['there is / there are', 'habitaciones'],
    keywords: [{ en: 'downstairs', es: 'abajo' }, { en: 'upstairs', es: 'arriba' }, { en: 'kitchen', es: 'cocina' }, { en: 'garden', es: 'jardín' }, { en: 'behind', es: 'detrás de' }],
    transcript: [sentence('I live in a house with my family.', 'Vivo en una casa con mi familia.'), sentence('Downstairs, there is a kitchen, a living room, and a small bathroom.', 'Abajo hay una cocina, una sala y un baño pequeño.'), sentence('The kitchen is my favorite room because we eat there together.', 'La cocina es mi habitación favorita porque comemos allí juntos.'), sentence('Upstairs, there are three bedrooms.', 'Arriba hay tres habitaciones.'), sentence('Behind the house, there is a lovely garden.', 'Detrás de la casa hay un hermoso jardín.')],
    gist: q('¿Qué describe la persona?', 'La distribución de su casa.', ['Su rutina de trabajo.', 'Una tienda.'], 'Se mencionan habitaciones y la ubicación del jardín.'),
    details: [q('¿Qué hay abajo?', 'Una cocina, una sala y un baño.', ['Tres habitaciones.', 'Un jardín.'], 'La respuesta está después de “Downstairs”.'), q('¿Cuál es la habitación favorita?', 'La cocina.', ['La sala.', 'El baño.'], 'La persona dice “The kitchen is my favorite room.”'), q('¿Dónde está el jardín?', 'Detrás de la casa.', ['Frente a la casa.', 'Arriba.'], 'Se oye “Behind the house”.')],
    consolidation: q('¿Qué significa “upstairs”?', 'Arriba.', ['Abajo.', 'Afuera.'], '“Upstairs, there are three bedrooms.”'),
  },
  {
    id: 'my-town', order: 5, title: 'My Town', titleEs: 'Mi pueblo', duration: 22,
    objective: 'Localiza lugares y sigue relaciones espaciales simples.', grammar: ['preposiciones de lugar', 'there is'],
    keywords: [{ en: 'town', es: 'pueblo' }, { en: 'supermarket', es: 'supermercado' }, { en: 'opposite', es: 'enfrente de' }, { en: 'library', es: 'biblioteca' }, { en: 'lake', es: 'lago' }],
    transcript: [sentence('My town is small and quiet.', 'Mi pueblo es pequeño y tranquilo.'), sentence('There is a supermarket near my house, so my mother and I walk there on Saturday.', 'Hay un supermercado cerca de mi casa, así que mi mamá y yo caminamos allí el sábado.'), sentence('The bank is opposite the supermarket.', 'El banco está enfrente del supermercado.'), sentence('There is also a park behind the library.', 'También hay un parque detrás de la biblioteca.'), sentence('I like the park because there are many trees and a little lake.', 'Me gusta el parque porque hay muchos árboles y un pequeño lago.')],
    gist: q('¿De qué habla la persona?', 'De los lugares de su pueblo.', ['De su dormitorio.', 'De su almuerzo.'], 'Nombra supermercado, banco, biblioteca y parque.'),
    details: [q('¿Qué lugar está cerca de su casa?', 'El supermercado.', ['El banco.', 'La biblioteca.'], 'La persona dice “a supermarket near my house.”'), q('¿Dónde está el banco?', 'Enfrente del supermercado.', ['Detrás del parque.', 'Al lado de la casa.'], '“Opposite” significa enfrente.'), q('¿Qué hay detrás de la biblioteca?', 'Un parque.', ['Un banco.', 'Un lago.'], 'La frase audible es “a park behind the library.”')],
    consolidation: q('¿Qué significa “opposite”?', 'Enfrente de.', ['Cerca de.', 'Dentro de.'], 'El banco está “opposite the supermarket”.'),
  },
]

const REMAINING: Array<Pick<ListeningExercise, 'id' | 'title' | 'titleEs' | 'objective' | 'duration' | 'grammar' | 'keywords'>> = [
  { id: 'morning-routine', title: 'My Morning Routine', titleEs: 'Mi rutina de la mañana', objective: 'Entiende una rutina y horas frecuentes.', duration: 20, grammar: ['present simple', 'horas'], keywords: [{ en: 'wake up', es: 'despertarse' }, { en: 'shower', es: 'ducha' }, { en: 'breakfast', es: 'desayuno' }, { en: 'bus stop', es: 'parada de bus' }, { en: 'arrive', es: 'llegar' }] },
  { id: 'day-at-work', title: 'A Day at Work', titleEs: 'Un día de trabajo', objective: 'Identifica una jornada laboral y sus horarios.', duration: 20, grammar: ['present simple', 'profesiones'], keywords: [{ en: 'office', es: 'oficina' }, { en: 'emails', es: 'correos' }, { en: 'lunch', es: 'almuerzo' }, { en: 'customers', es: 'clientes' }, { en: 'finish', es: 'terminar' }] },
  { id: 'my-week', title: 'My Week', titleEs: 'Mi semana', objective: 'Reconoce días y actividades habituales.', duration: 25, grammar: ['adverbios de frecuencia', 'días'], keywords: [{ en: 'usually', es: 'usualmente' }, { en: 'always', es: 'siempre' }, { en: 'sometimes', es: 'a veces' }, { en: 'quiet', es: 'tranquilo' }, { en: 'weekend', es: 'fin de semana' }] },
  { id: 'saturday-morning', title: 'Saturday Morning', titleEs: 'Sábado en la mañana', objective: 'Sigue una secuencia sencilla de fin de semana.', duration: 25, grammar: ['present simple', 'rutinas'], keywords: [{ en: 'market', es: 'mercado' }, { en: 'flowers', es: 'flores' }, { en: 'café', es: 'cafetería' }, { en: 'clean', es: 'limpiar' }, { en: 'evening', es: 'noche' }] },
  { id: 'class-schedule', title: 'My Class Schedule', titleEs: 'Mi horario de clase', objective: 'Identifica asignaturas, lugares y horas.', duration: 22, grammar: ['at / on', 'horarios'], keywords: [{ en: 'starts', es: 'empieza' }, { en: 'history', es: 'historia' }, { en: 'subject', es: 'asignatura' }, { en: 'library', es: 'biblioteca' }, { en: 'end', es: 'terminar' }] },
  { id: 'shopping-list', title: 'My Shopping List', titleEs: 'Mi lista de compras', objective: 'Reconoce necesidades y alimentos cotidianos.', duration: 25, grammar: ['have got', 'comida'], keywords: [{ en: 'shopping list', es: 'lista de compras' }, { en: 'bottle', es: 'botella' }, { en: 'loaf', es: 'pan / barra de pan' }, { en: 'eggs', es: 'huevos' }, { en: 'carton', es: 'cartón / caja' }] },
  { id: 'favorite-lunch', title: 'My Favorite Lunch', titleEs: 'Mi almuerzo favorito', objective: 'Comprende gustos y comida familiar.', duration: 27, grammar: ['gustos', 'present simple'], keywords: [{ en: 'chicken', es: 'pollo' }, { en: 'rice', es: 'arroz' }, { en: 'vegetables', es: 'verduras' }, { en: 'salad', es: 'ensalada' }, { en: 'delicious', es: 'delicioso' }] },
  { id: 'school-clothes', title: 'What I Wear to School', titleEs: 'Mi ropa para estudiar', objective: 'Identifica ropa, colores y clima.', duration: 22, grammar: ['present simple', 'ropa'], keywords: [{ en: 'trousers', es: 'pantalones' }, { en: 'shirt', es: 'camisa' }, { en: 'shoes', es: 'zapatos' }, { en: 'jumper', es: 'suéter' }, { en: 'coat', es: 'abrigo' }] },
  { id: 'weather-today', title: 'The Weather Today', titleEs: 'El clima de hoy', objective: 'Distingue condiciones del clima y ropa.', duration: 21, grammar: ['to be', 'clima'], keywords: [{ en: 'cloudy', es: 'nublado' }, { en: 'windy', es: 'ventoso' }, { en: 'umbrella', es: 'paraguas' }, { en: 'rain', es: 'llover' }, { en: 'jacket', es: 'chaqueta' }] },
  { id: 'dog-max', title: 'My Dog, Max', titleEs: 'Mi perro Max', objective: 'Entiende una descripción de mascota y rutina.', duration: 24, grammar: ['have got', 'present simple'], keywords: [{ en: 'dog', es: 'perro' }, { en: 'friendly', es: 'amigable' }, { en: 'walk', es: 'paseo' }, { en: 'ball', es: 'pelota' }, { en: 'hungry', es: 'hambriento' }] },
  { id: 'park-now', title: 'What Is Happening in the Park?', titleEs: 'Qué pasa en el parque', objective: 'Reconoce acciones que ocurren ahora.', duration: 21, grammar: ['present continuous'], keywords: [{ en: 'running', es: 'corriendo' }, { en: 'watching', es: 'mirando' }, { en: 'reading', es: 'leyendo' }, { en: 'swimming', es: 'nadando' }, { en: 'sleeping', es: 'durmiendo' }] },
  { id: 'things-i-can-do', title: 'Things I Can Do', titleEs: 'Cosas que puedo hacer', objective: 'Distingue habilidades y limitaciones.', duration: 21, grammar: ['can / can’t'], keywords: [{ en: 'cook', es: 'cocinar' }, { en: 'swim', es: 'nadar' }, { en: 'guitar', es: 'guitarra' }, { en: 'drive', es: 'conducir' }, { en: 'ride a bike', es: 'montar bicicleta' }] },
  { id: 'saturday-plan', title: 'My Plan for Saturday', titleEs: 'Mi plan para el sábado', objective: 'Entiende planes próximos con horas y lugares.', duration: 30, grammar: ['present continuous', 'planes'], keywords: [{ en: 'visiting', es: 'visitando' }, { en: 'river', es: 'río' }, { en: 'meeting', es: 'encontrándose con' }, { en: 'books', es: 'libros' }, { en: 'dinner', es: 'cena' }] },
  { id: 'library-directions', title: 'How to Get to the Library', titleEs: 'Cómo llegar a la biblioteca', objective: 'Sigue indicaciones espaciales simples.', duration: 31, grammar: ['imperativos', 'preposiciones'], keywords: [{ en: 'go straight', es: 'sigue derecho' }, { en: 'turn left', es: 'gira a la izquierda' }, { en: 'corner', es: 'esquina' }, { en: 'next to', es: 'al lado de' }, { en: 'entrance', es: 'entrada' }] },
  { id: 'ideal-day', title: 'My Ideal Day', titleEs: 'Mi día ideal', objective: 'Integra rutina, gustos, clima y acciones.', duration: 32, grammar: ['repaso A1'], keywords: [{ en: 'ideal', es: 'ideal' }, { en: 'sunny', es: 'soleado' }, { en: 'breakfast', es: 'desayuno' }, { en: 'friends', es: 'amigos' }, { en: 'relax', es: 'relajarse' }] },
]

type ExerciseContent = Pick<ListeningExercise, 'transcript' | 'gist' | 'details' | 'consolidation'>

const BLOCK_TWO_CONTENT: Record<string, ExerciseContent> = {
  'morning-routine': {
    transcript: [sentence('On weekdays, I wake up at half past six.', 'Entre semana me despierto a las seis y media.'), sentence('First, I have a shower and get dressed. Then I make breakfast.', 'Primero me baño y me visto. Luego preparo el desayuno.'), sentence('I usually eat bread, fruit, and eggs, and I drink tea.', 'Usualmente como pan, fruta y huevos, y tomo té.'), sentence('At quarter past seven, I leave home and walk to the bus stop.', 'A las siete y cuarto salgo de casa y camino a la parada.'), sentence('My bus arrives at twenty past seven. I get to college at eight o’clock.', 'Mi bus llega a las siete y veinte. Llego a la universidad a las ocho.')],
    gist: q('¿Qué describe la persona?', 'Su rutina de la mañana antes de ir a estudiar.', ['Un viaje de fin de semana.', 'Una cena familiar.'], 'El audio sigue la secuencia de despertar, desayunar, tomar el bus y llegar a clase.'),
    details: [q('¿A qué hora se despierta?', 'A las seis y media.', ['A las siete y cuarto.', 'A las ocho.'], '“Half past six” significa 6:30.'), q('¿Qué toma con el desayuno?', 'Té.', ['Café.', 'Jugo de naranja.'], 'Se oye “I drink tea.”'), q('¿A qué hora llega a la universidad?', 'A las ocho.', ['A las siete y veinte.', 'A las seis y media.'], 'La frase final dice “I get to college at eight o’clock.”')],
    consolidation: q('¿Qué significa “quarter past seven”?', 'Las siete y cuarto.', ['Las siete en punto.', 'Las ocho menos cuarto.'], '“Quarter past” añade quince minutos a la hora.'),
  },
  'day-at-work': {
    transcript: [sentence('I work in a small office in the city.', 'Trabajo en una oficina pequeña en la ciudad.'), sentence('I start work at nine o’clock every morning.', 'Empiezo a trabajar a las nueve cada mañana.'), sentence('First, I check my emails and talk to my team.', 'Primero reviso mis correos y hablo con mi equipo.'), sentence('At twelve thirty, I have lunch with two friends.', 'A las doce y media almuerzo con dos amigos.'), sentence('In the afternoon, I answer phone calls and help customers. I usually finish work at five.', 'En la tarde respondo llamadas y ayudo a clientes. Usualmente termino a las cinco.')],
    gist: q('¿Cuál es el tema del audio?', 'Un día normal de trabajo en una oficina.', ['Una clase de arte.', 'Una visita al médico.'], 'La persona habla de su oficina, sus tareas y su horario.'),
    details: [q('¿A qué hora empieza a trabajar?', 'A las nueve.', ['A las doce y media.', 'A las cinco.'], 'La persona dice “I start work at nine o’clock.”'), q('¿Con quién almuerza?', 'Con dos amigos.', ['Con su familia.', 'Con clientes.'], 'Se oye “I have lunch with two friends.”'), q('¿Qué hace en la tarde?', 'Responde llamadas y ayuda a clientes.', ['Estudia en la biblioteca.', 'Toma el bus.'], 'La frase es “I answer phone calls and help customers.”')],
    consolidation: q('Completa: I ___ my emails first.', 'check', ['cook', 'watch'], 'La primera tarea del día es “check my emails”.'),
  },
  'my-week': {
    transcript: [sentence('My week is very busy.', 'Mi semana es muy ocupada.'), sentence('On Monday, I go to my English class after work.', 'El lunes voy a mi clase de inglés después del trabajo.'), sentence('On Tuesday, I usually visit my grandmother.', 'El martes usualmente visito a mi abuela.'), sentence('I always play football with my friends on Wednesday evening.', 'Siempre juego fútbol con mis amigos el miércoles por la noche.'), sentence('On Friday, I sometimes go to the cinema with my sister. At the weekend, I relax and see my family.', 'El viernes a veces voy al cine con mi hermana. El fin de semana me relajo y veo a mi familia.')],
    gist: q('¿Qué organiza la persona?', 'Sus actividades durante la semana.', ['Los objetos de una habitación.', 'Una lista de compras.'], 'Cada oración menciona un día y una actividad.'),
    details: [q('¿Qué hace el lunes?', 'Va a clase de inglés.', ['Juega fútbol.', 'Va al cine.'], '“On Monday, I go to my English class.”'), q('¿A quién visita el martes?', 'A su abuela.', ['A su hermana.', 'A sus amigos.'], 'Se oye “I usually visit my grandmother.”'), q('¿Cuándo juega fútbol?', 'El miércoles por la noche.', ['El lunes después del trabajo.', 'El viernes.'], 'La frase usa “on Wednesday evening”.')],
    consolidation: q('¿Qué palabra audible significa “a veces”?', 'sometimes', ['always', 'never'], 'La persona “sometimes” va al cine el viernes.'),
  },
  'saturday-morning': {
    transcript: [sentence('Saturday is my favorite day. I do not get up early, so I wake up at eight thirty.', 'El sábado es mi día favorito. No me levanto temprano, así que me despierto a las ocho y media.'), sentence('Then I go to the market with my father.', 'Luego voy al mercado con mi padre.'), sentence('We buy fruit, vegetables, bread, and flowers.', 'Compramos fruta, verduras, pan y flores.'), sentence('After that, we have coffee in a small café.', 'Después tomamos café en una cafetería pequeña.'), sentence('In the afternoon, I clean my room and listen to music. In the evening, I watch a film.', 'En la tarde limpio mi cuarto y escucho música. En la noche veo una película.')],
    gist: q('¿De qué trata el audio?', 'De las actividades de una persona el sábado.', ['De un día de escuela.', 'De una mascota.'], 'El texto recorre el sábado desde la mañana hasta la noche.'),
    details: [q('¿A qué hora se despierta?', 'A las ocho y media.', ['A las seis y media.', 'A las nueve.'], 'La persona dice “I wake up at eight thirty.”'), q('¿Con quién va al mercado?', 'Con su padre.', ['Con su hermana.', 'Con sus amigos.'], 'Se oye “with my father.”'), q('¿Qué hace en la noche?', 'Ve una película.', ['Limpia su cuarto.', 'Compra flores.'], 'La última actividad es “I watch a film.”')],
    consolidation: q('¿Cuál es el orden correcto?', 'Mercado → café → limpiar el cuarto.', ['Café → mercado → dormir.', 'Película → mercado → desayuno.'], 'El audio presenta esas tres acciones en ese orden.'),
  },
  'class-schedule': {
    transcript: [sentence('My classes start at nine o’clock every day.', 'Mis clases empiezan a las nueve todos los días.'), sentence('On Monday, I have English and history. My English class is in room twelve.', 'El lunes tengo inglés e historia. Mi clase de inglés es en el salón doce.'), sentence('On Tuesday, I study science in the morning and art in the afternoon.', 'El martes estudio ciencia en la mañana y arte en la tarde.'), sentence('I have lunch at one o’clock with my classmates.', 'Almuerzo a la una con mis compañeros.'), sentence('Classes end at four. After class, I often study in the library for one hour.', 'Las clases terminan a las cuatro. Después de clase, a menudo estudio una hora en la biblioteca.')],
    gist: q('¿Qué comparte la persona?', 'Su horario de clases.', ['Su ruta en bus.', 'La distribución de su casa.'], 'Menciona materias, horas, salón y biblioteca.'),
    details: [q('¿En qué salón es la clase de inglés?', 'En el salón doce.', ['En el salón uno.', 'En la biblioteca.'], 'La frase es “in room twelve.”'), q('¿Qué estudia el martes por la tarde?', 'Arte.', ['Ciencia.', 'Historia.'], 'Se oye “art in the afternoon.”'), q('¿A qué hora terminan las clases?', 'A las cuatro.', ['A la una.', 'A las nueve.'], '“Classes end at four.”')],
    consolidation: q('¿Dónde estudia después de clase?', 'En la biblioteca.', ['En el salón doce.', 'En la cafetería.'], 'La persona estudia “in the library for one hour”.'),
  },
}

const BLOCK_THREE_CONTENT: Record<string, ExerciseContent> = {
  'shopping-list': {
    transcript: [sentence('Today I am going to the supermarket because we have not got much food at home.', 'Hoy voy al supermercado porque no tenemos mucha comida en casa.'), sentence('I need a bottle of milk, a loaf of bread, and six eggs.', 'Necesito una botella de leche, una barra de pan y seis huevos.'), sentence('I also want some apples and bananas for breakfast.', 'También quiero manzanas y bananos para el desayuno.'), sentence('My brother likes orange juice, so I buy a carton for him.', 'A mi hermano le gusta el jugo de naranja, así que le compro una caja.'), sentence('We have got pasta, but we have not got any tomatoes.', 'Tenemos pasta, pero no tenemos tomates.')],
    gist: q('¿Por qué va la persona al supermercado?', 'Porque en casa falta comida.', ['Porque quiere visitar a su hermano.', 'Porque tiene clase.'], 'El primer bloque dice que no hay mucha comida en casa.'),
    details: [q('¿Cuántos huevos necesita?', 'Seis.', ['Dos.', 'Doce.'], 'Se oye “six eggs”.'), q('¿Qué compra para su hermano?', 'Jugo de naranja.', ['Leche.', 'Pan.'], 'Su hermano likes orange juice.'), q('¿Qué alimento ya tienen?', 'Pasta.', ['Tomates.', 'Huevos.'], 'La última frase dice “We have got pasta”.')],
    consolidation: q('¿Qué significa “we have not got”?', 'No tenemos.', ['Tenemos mucho.', 'Vamos a comprar.'], 'La expresión comunica que algo no está disponible.'),
  },
  'favorite-lunch': {
    transcript: [sentence('My favorite lunch is chicken with rice and vegetables.', 'Mi almuerzo favorito es pollo con arroz y verduras.'), sentence('I usually eat it on Sunday when my family is at home.', 'Usualmente lo como el domingo cuando mi familia está en casa.'), sentence('My mother cooks the chicken in the oven, and my father makes a salad.', 'Mi madre cocina el pollo en el horno y mi padre prepara una ensalada.'), sentence('We put tomatoes, carrots, and lettuce in the salad.', 'Ponemos tomates, zanahorias y lechuga en la ensalada.'), sentence('I drink water with my lunch. The food is simple, healthy, and delicious.', 'Tomo agua con mi almuerzo. La comida es sencilla, saludable y deliciosa.')],
    gist: q('¿Qué describe la persona?', 'Su almuerzo favorito en familia.', ['Un menú de restaurante.', 'Una lista de compras.'], 'El audio presenta el plato, cuándo lo comen y quién lo prepara.'),
    details: [q('¿Cuándo suele comer este almuerzo?', 'El domingo.', ['El lunes.', 'El sábado en la noche.'], 'Dice “I usually eat it on Sunday.”'), q('¿Quién prepara la ensalada?', 'Su padre.', ['Su madre.', 'Su hermana.'], '“My father makes a salad.”'), q('¿Qué bebe con el almuerzo?', 'Agua.', ['Té.', 'Jugo de naranja.'], 'La frase audible es “I drink water”.')],
    consolidation: q('¿Cuál palabra significa “delicioso”?', 'delicious', ['healthy', 'simple'], 'La persona describe la comida como “simple, healthy, and delicious”.'),
  },
  'school-clothes': {
    transcript: [sentence('I wear simple clothes to school.', 'Uso ropa sencilla para ir a la escuela.'), sentence('I usually wear black trousers and a white shirt.', 'Usualmente uso pantalones negros y una camisa blanca.'), sentence('My shoes are brown, and my bag is blue.', 'Mis zapatos son cafés y mi bolso azul.'), sentence('When the weather is cold, I wear a grey jumper and a warm coat.', 'Cuando hace frío, uso un suéter gris y un abrigo caliente.'), sentence('I like comfortable clothes because I walk and take the bus every day.', 'Me gusta la ropa cómoda porque camino y tomo el bus todos los días.')],
    gist: q('¿De qué habla la persona?', 'De la ropa que usa para estudiar.', ['De una tienda de ropa.', 'Del clima de Londres.'], 'Describe pantalones, camisa, zapatos y ropa para el frío.'),
    details: [q('¿De qué color son los pantalones?', 'Negros.', ['Blancos.', 'Cafés.'], 'Se oye “black trousers”.'), q('¿Qué usa cuando hace frío?', 'Un suéter gris y un abrigo.', ['Una camisa blanca.', 'Solo zapatos cafés.'], 'La ropa de frío aparece en la cuarta oración.'), q('¿Por qué le gusta ropa cómoda?', 'Porque camina y toma el bus.', ['Porque juega fútbol.', 'Porque trabaja en casa.'], 'La última frase explica “because I walk and take the bus”.')],
    consolidation: q('¿Qué significa “trousers”?', 'Pantalones.', ['Zapatos.', 'Camisa.'], 'La palabra aparece con el color black.'),
  },
  'weather-today': {
    transcript: [sentence('Today the weather is strange.', 'Hoy el clima está extraño.'), sentence('In the morning, it is cold and cloudy.', 'En la mañana hace frío y está nublado.'), sentence('At midday, the sun is out, and it is warm.', 'Al mediodía sale el sol y hace calor.'), sentence('Now it is windy, and there are dark clouds in the sky.', 'Ahora hace viento y hay nubes oscuras en el cielo.'), sentence('I have got an umbrella in my bag because it can rain later.', 'Tengo un paraguas en mi bolso porque puede llover más tarde.')],
    gist: q('¿Qué explica la persona?', 'Cómo cambia el clima durante el día.', ['Qué compra en el supermercado.', 'Cómo es su habitación.'], 'El audio compara mañana, mediodía y el momento actual.'),
    details: [q('¿Cómo está el clima en la mañana?', 'Frío y nublado.', ['Cálido y soleado.', 'Solo ventoso.'], 'Se oye “cold and cloudy”.'), q('¿Qué pasa al mediodía?', 'Sale el sol y hace calor.', ['Llueve.', 'Se hace de noche.'], 'La frase dice “the sun is out, and it is warm”.'), q('¿Por qué lleva paraguas?', 'Porque puede llover más tarde.', ['Porque hace mucho sol.', 'Porque va al parque.'], 'La razón aparece al final del audio.')],
    consolidation: q('¿Qué palabra significa “ventoso”?', 'windy', ['cloudy', 'warm'], '“Now it is windy” describe el momento actual.'),
  },
  'dog-max': {
    transcript: [sentence('I have got a dog called Max.', 'Tengo un perro llamado Max.'), sentence('He is small, brown, and very friendly. Max is five years old.', 'Es pequeño, café y muy amigable. Max tiene cinco años.'), sentence('Every morning, he waits by the door because he wants to go for a walk.', 'Cada mañana espera junto a la puerta porque quiere salir a caminar.'), sentence('He loves playing with his red ball in the park.', 'Le encanta jugar con su pelota roja en el parque.'), sentence('At home, he sleeps under the table. Max is always hungry, but he only eats dog food.', 'En casa duerme debajo de la mesa. Max siempre tiene hambre, pero solo come comida para perros.')],
    gist: q('¿Quién es Max?', 'El perro de la persona.', ['Su hermano.', 'Un amigo de clase.'], 'El audio empieza con “I have got a dog called Max”.'),
    details: [q('¿De qué color es Max?', 'Café.', ['Negro.', 'Rojo.'], 'Max is “small, brown, and very friendly”.'), q('¿Qué quiere hacer cada mañana?', 'Salir a caminar.', ['Comer con la familia.', 'Ir a la escuela.'], 'Espera junto a la puerta para “go for a walk”.'), q('¿Dónde duerme en casa?', 'Debajo de la mesa.', ['En la cama.', 'En el parque.'], 'La frase es “he sleeps under the table.”')],
    consolidation: q('¿Qué objeto rojo tiene Max?', 'Una pelota.', ['Un abrigo.', 'Una cama.'], 'Juega con “his red ball”.'),
  },
}

const BLOCK_FOUR_CONTENT: Record<string, ExerciseContent> = {
  'park-now': {
    transcript: [sentence('I am sitting in the park now. It is a lovely afternoon.', 'Estoy sentada en el parque ahora. Es una tarde agradable.'), sentence('A little boy is running near the trees, and his mother is watching him.', 'Un niño pequeño está corriendo cerca de los árboles y su madre lo observa.'), sentence('Two girls are playing with a ball.', 'Dos niñas están jugando con una pelota.'), sentence('An old man is reading a newspaper on a bench.', 'Un señor mayor está leyendo un periódico en una banca.'), sentence('Near the lake, some ducks are swimming. My dog is sleeping next to my feet.', 'Cerca del lago, unos patos están nadando. Mi perro está durmiendo junto a mis pies.')],
    gist: q('¿Qué describe la persona?', 'Lo que está ocurriendo en el parque ahora.', ['Su rutina semanal.', 'Un viaje en bus.'], 'Todas las acciones usan presente continuo y suceden ahora.'),
    details: [q('¿Quién corre cerca de los árboles?', 'Un niño pequeño.', ['Dos niñas.', 'Un perro.'], 'Se oye “A little boy is running”.'), q('¿Qué hace el señor mayor?', 'Lee un periódico.', ['Nada en el lago.', 'Juega con una pelota.'], '“An old man is reading a newspaper.”'), q('¿Dónde está el perro?', 'Junto a los pies de la persona.', ['En el lago.', 'Debajo de una mesa.'], 'La frase final dice “next to my feet”.')],
    consolidation: q('¿Qué forma escuchaste para una acción que sucede ahora?', 'is running', ['runs every day', 'can run'], 'El presente continuo usa be + verbo con -ing.'),
  },
  'things-i-can-do': {
    transcript: [sentence('I can do many useful things.', 'Puedo hacer muchas cosas útiles.'), sentence('I can cook simple meals, make coffee, and use a computer.', 'Puedo cocinar comidas sencillas, hacer café y usar un computador.'), sentence('I can also swim, but I cannot swim very fast.', 'También puedo nadar, pero no puedo nadar muy rápido.'), sentence('My sister can play the guitar, but I cannot play an instrument.', 'Mi hermana puede tocar la guitarra, pero yo no puedo tocar un instrumento.'), sentence('I cannot drive a car yet, but I can ride a bike.', 'Aún no puedo conducir un carro, pero puedo montar bicicleta.')],
    gist: q('¿Cuál es el objetivo del audio?', 'Hablar de cosas que la persona puede y no puede hacer.', ['Describir el clima.', 'Dar direcciones.'], 'El audio repite can y cannot para habilidades.'),
    details: [q('¿Qué no puede hacer rápido?', 'Nadar.', ['Cocinar.', 'Usar un computador.'], 'Dice “I cannot swim very fast.”'), q('¿Qué puede tocar la hermana?', 'La guitarra.', ['El piano.', 'La batería.'], '“My sister can play the guitar.”'), q('¿Qué puede hacer en vez de conducir?', 'Montar bicicleta.', ['Tomar un tren.', 'Nadar.'], 'La última frase incluye “I can ride a bike”.')],
    consolidation: q('¿Qué significa “cannot drive a car”?', 'No puede conducir un carro.', ['Quiere comprar un carro.', 'Conduce muy rápido.'], 'Cannot expresa una habilidad que la persona no tiene.'),
  },
  'saturday-plan': {
    transcript: [sentence('This Saturday is going to be busy.', 'Este sábado va a estar ocupado.'), sentence('In the morning, I am visiting my aunt and uncle. Their house is near the river, and we are having breakfast together.', 'En la mañana voy a visitar a mis tíos. Su casa está cerca del río y vamos a desayunar juntos.'), sentence('At two o’clock, I am meeting my friend Leo in town.', 'A las dos me voy a encontrar con mi amigo Leo en el pueblo.'), sentence('We are going to look at some new books.', 'Vamos a mirar algunos libros nuevos.'), sentence('In the evening, my family is having dinner at my grandmother’s house.', 'En la noche mi familia va a cenar en casa de mi abuela.')],
    gist: q('¿De qué habla la persona?', 'De sus planes para el sábado.', ['De un sábado del pasado.', 'De su mascota.'], 'Menciona mañana, dos de la tarde y noche como planes próximos.'),
    details: [q('¿A quién visita en la mañana?', 'A sus tíos.', ['A Leo.', 'A su abuela.'], 'La persona “is visiting my aunt and uncle”.'), q('¿A qué hora se encuentra con Leo?', 'A las dos.', ['A las ocho.', 'A las doce.'], 'Se oye “At two o’clock”.'), q('¿Dónde cena la familia?', 'En casa de la abuela.', ['Cerca del río.', 'En la biblioteca.'], 'La última oración da este lugar.')],
    consolidation: q('¿Qué plan tiene con Leo?', 'Mirar libros nuevos.', ['Jugar fútbol.', 'Desayunar con la familia.'], '“We are going to look at some new books.”'),
  },
  'library-directions': {
    transcript: [sentence('The library is easy to find.', 'La biblioteca es fácil de encontrar.'), sentence('Start at the bus station and go straight for two minutes.', 'Empieza en la estación de bus y sigue derecho por dos minutos.'), sentence('Then turn left at the bank.', 'Luego gira a la izquierda en el banco.'), sentence('Walk past the supermarket and the post office.', 'Pasa caminando el supermercado y la oficina de correos.'), sentence('The library is on the corner, next to a small café. It is opposite the park.', 'La biblioteca está en la esquina, al lado de una cafetería pequeña. Está enfrente del parque.')],
    gist: q('¿Qué hace la persona?', 'Da indicaciones para llegar a la biblioteca.', ['Describe su habitación.', 'Habla de una clase.'], 'El texto usa instrucciones como go straight y turn left.'),
    details: [q('¿Dónde se empieza?', 'En la estación de bus.', ['En el parque.', 'En el supermercado.'], 'La primera instrucción dice “Start at the bus station”.'), q('¿En qué lugar se gira a la izquierda?', 'En el banco.', ['En la cafetería.', 'En la oficina de correos.'], '“Turn left at the bank.”'), q('¿Qué lugar está enfrente de la biblioteca?', 'El parque.', ['El supermercado.', 'La estación de bus.'], 'La biblioteca “is opposite the park”.')],
    consolidation: q('¿Qué significa “go straight”?', 'Sigue derecho.', ['Gira a la derecha.', 'Cruza la calle.'], 'Es la primera indicación del recorrido.'),
  },
  'ideal-day': {
    transcript: [sentence('My ideal day is a sunny Saturday in spring.', 'Mi día ideal es un sábado soleado de primavera.'), sentence('I wake up late and have a big breakfast with my family.', 'Me despierto tarde y desayuno mucho con mi familia.'), sentence('Then I meet my friends in the park. We can play football, talk, and eat sandwiches.', 'Luego me encuentro con mis amigos en el parque. Podemos jugar fútbol, hablar y comer sándwiches.'), sentence('In the afternoon, I read a book or listen to music at home.', 'En la tarde leo un libro o escucho música en casa.'), sentence('In the evening, we are all together, watching a funny film.', 'En la noche todos estamos juntos viendo una película divertida.')],
    gist: q('¿Qué comparte la persona?', 'Cómo sería su día ideal.', ['Un día difícil en el trabajo.', 'Una guía de direcciones.'], 'El audio enumera las actividades que le gustaría hacer en un día ideal.'),
    details: [q('¿Con quién desayuna?', 'Con su familia.', ['Con sus amigos.', 'Con su abuela.'], 'Se oye “with my family”.'), q('¿Qué pueden hacer los amigos en el parque?', 'Jugar fútbol, hablar y comer sándwiches.', ['Nadar y estudiar.', 'Trabajar y cocinar.'], 'La persona enumera esas tres actividades después de “We can”.'), q('¿Qué hacen en la noche?', 'Ven una película divertida.', ['Van al mercado.', 'Juegan fútbol.'], 'La última oración dice “watching a funny film”.')],
    consolidation: q('¿Qué tipo de sábado es el día ideal?', 'Soleado en primavera.', ['Frío y nublado.', 'Un lunes de trabajo.'], 'La primera oración presenta “a sunny Saturday in spring”.'),
  },
}

export const LISTENING_A1_ALL: ListeningExercise[] = [
  ...LISTENING_A1,
  ...REMAINING.map((item, index): ListeningExercise => ({
    ...item,
    order: index + 6,
    ...(BLOCK_TWO_CONTENT[item.id] ?? BLOCK_THREE_CONTENT[item.id] ?? BLOCK_FOUR_CONTENT[item.id] ?? {
      transcript: [],
      gist: q('¿Cuál es el tema principal del audio?', item.titleEs, ['Una situación diferente.', 'Una actividad sin relación.'], `Escucha buscando la idea general: ${item.objective.toLowerCase()}`),
      details: [],
      consolidation: q('¿Qué debes identificar en este audio?', item.objective, ['Solo cada palabra aislada.', 'Una regla de ortografía.'], 'La meta es comprender información frecuente en contexto.'),
    }),
  })),
]

export function getListeningExercise(id: string) {
  return LISTENING_A1_ALL.find(exercise => exercise.id === id)
}
