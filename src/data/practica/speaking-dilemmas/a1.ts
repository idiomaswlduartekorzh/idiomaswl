import type { SpeakingDilemma } from './types'

const CONNECTORS: SpeakingDilemma['vocabulary']['connectors'] = [
  ['and', 'y', 'I have milk and bread.'],
  ['but', 'pero', 'It is small, but it is nice.'],
  ['because', 'porque', 'I walk because it is near.'],
  ['so', 'así que', 'It is cold, so I wear a coat.'],
]

export const A1_DILEMMAS: readonly SpeakingDilemma[] = [
  {
    slug: 'tea-or-milk',
    title: 'Tea or milk?',
    prompt: 'It is breakfast time. Do you want tea or milk?',
    options: [
      { label: 'Tea', description: 'You have tea in a small cup.' },
      { label: 'Milk', description: 'You have milk in a glass.' },
    ],
    conditionalPrompt: 'Say when you drink tea and when you drink milk.',
    vocabulary: {
      nouns: [
        ['tea', 'té', 'I drink tea at seven.'],
        ['milk', 'leche', 'Milk is in the glass.'],
        ['cup', 'taza', 'This is my cup.'],
        ['glass', 'vaso', 'I need a glass.'],
      ],
      phrasalVerbs: [
        ['warm up', 'calentar', 'I warm up the milk.'],
        ['cool down', 'enfriarse', 'My tea can cool down.'],
        ['pour out', 'verter', 'Pour out a little water.'],
        ['drink up', 'beber todo', 'Drink up your milk.'],
      ],
      adjectives: [
        ['hot', 'caliente', 'The tea is hot.'],
        ['cold', 'frío', 'The milk is cold.'],
        ['sweet', 'dulce', 'This drink is sweet.'],
        ['small', 'pequeño', 'I have a small cup.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I want **tea** in a **cup**.',
        'It is **hot**, **so** I wait.',
        'Then I **drink up** before class.',
      ],
      b: [
        'I choose **milk**.',
        'I like it **cold**, **and** I have a **glass**.',
        'I **drink up** at breakfast.',
      ],
      conditional: [
        'I like **hot** **tea** in the morning.',
        '**But** at night I **warm up** some **milk**.',
        'I like both.',
      ],
    },
  },
  {
    slug: 'cereal-or-eggs',
    title: 'Cereal or eggs for breakfast?',
    prompt: 'You have time for one breakfast. Do you choose cereal or eggs?',
    options: [
      { label: 'Cereal', description: 'Put cereal and milk in a bowl.' },
      { label: 'Eggs', description: 'Cook eggs and eat them with bread.' },
    ],
    conditionalPrompt: 'Say what you eat on school days and at the weekend.',
    vocabulary: {
      nouns: [
        ['cereal', 'cereal', 'I eat cereal with milk.'],
        ['egg', 'huevo', 'I cook one egg.'],
        ['bowl', 'tazón', 'The bowl is on the table.'],
        ['bread', 'pan', 'I eat bread with breakfast.'],
      ],
      phrasalVerbs: [
        ['get up', 'levantarse', 'I get up at seven.'],
        ['warm up', 'calentar', 'I warm up the milk.'],
        ['eat up', 'comerse todo', 'I eat up my toast.'],
        ['cut up', 'cortar en trozos', 'I cut up an apple.'],
      ],
      adjectives: [
        ['quick', 'rápido', 'Cereal is quick to make.'],
        ['hungry', 'con hambre', 'I am hungry now.'],
        ['cold', 'frío', 'The milk is cold.'],
        ['good', 'bueno', 'This bread is good.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I **get up** at seven, **and** school is at eight.',
        'I have **cereal** in a **bowl**.',
        'It is **quick**.',
      ],
      b: [
        'I choose **eggs** **because** I am **hungry**.',
        'I **warm up** the **bread**.',
        'It is a good breakfast.',
      ],
      conditional: [
        'On school days I have **cereal**, **because** it is **quick**.',
        'At the weekend I **eat up** my **eggs**.',
        'I have more time then.',
      ],
    },
  },
  {
    slug: 'soup-or-sandwich',
    title: 'Soup or a sandwich?',
    prompt: 'You can buy one lunch. Do you want soup or a sandwich?',
    options: [
      { label: 'Soup', description: 'Eat hot soup at a table.' },
      { label: 'A sandwich', description: 'Take a sandwich with you.' },
    ],
    conditionalPrompt: 'Say what you choose on a cold day and on a busy day.',
    vocabulary: {
      nouns: [
        ['soup', 'sopa', 'I eat tomato soup.'],
        ['sandwich', 'sándwich', 'My sandwich has cheese.'],
        ['spoon', 'cuchara', 'Here is a spoon.'],
        ['lunch box', 'lonchera', 'The lunch box is in my bag.'],
      ],
      phrasalVerbs: [
        ['warm up', 'calentar', 'I warm up the milk.'],
        ['take out', 'sacar', 'I take out my lunch box.'],
        ['put away', 'guardar', 'I put away my cup.'],
        ['eat up', 'comerse todo', 'I eat up my toast.'],
      ],
      adjectives: [
        ['hot', 'caliente', 'This soup is hot.'],
        ['cold', 'frío', 'The sandwich is cold.'],
        ['busy', 'ocupado', 'I am busy today.'],
        ['easy', 'fácil', 'This lunch is easy to carry.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I choose **soup** **because** I like a **hot** lunch.',
        'I use a **spoon**.',
        'I **eat up** my **soup** at the table.',
      ],
      b: [
        'I choose a **sandwich**.',
        'I am **busy**, **so** I eat it in the park.',
        'I **take it out** of my **lunch box**.',
      ],
      conditional: [
        'On a **cold** day I **warm up** **soup**.',
        '**But** when I am **busy**, I take a **sandwich**.',
        'That lunch is **easy** to carry.',
      ],
    },
  },
  {
    slug: 'home-or-cafe',
    title: 'Eat at home or at a café?',
    prompt: 'It is Saturday. Do you want to have lunch at home or at a café?',
    options: [
      { label: 'At home', description: 'Make lunch in your kitchen.' },
      { label: 'At a café', description: 'Meet a friend and buy lunch.' },
    ],
    conditionalPrompt: 'Say when you eat at home and when you go to a café.',
    vocabulary: {
      nouns: [
        ['kitchen', 'cocina', 'My kitchen is small.'],
        ['café', 'cafetería', 'The café is near school.'],
        ['lunch', 'almuerzo', 'I have lunch at one.'],
        ['friend', 'amigo o amiga', 'My friend lives nearby.'],
      ],
      phrasalVerbs: [
        ['eat in', 'comer en casa', 'We eat in on Mondays.'],
        ['eat out', 'comer fuera de casa', 'We eat out on Friday.'],
        ['go out', 'salir', 'We go out for lunch.'],
        ['come back', 'volver', 'I come back at six.'],
      ],
      adjectives: [
        ['cheap', 'barato', 'This lunch is cheap.'],
        ['quiet', 'tranquilo', 'The kitchen is quiet.'],
        ['nice', 'agradable', 'The café is nice.'],
        ['busy', 'ocupado', 'The café is busy today.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I like to **eat in** on Saturday.',
        'My **kitchen** is **quiet**, **and** I can make **lunch**.',
        'It is **cheap**.',
      ],
      b: [
        'I want to **eat out** with a **friend**.',
        'The **café** is **nice**, **and** it is near my house.',
        'We can walk there.',
      ],
      conditional: [
        'On a **busy** day, I **eat in** and make **lunch**.',
        '**But** I **go out** when my **friend** is free.',
        'We meet at the **café**.',
      ],
    },
  },
  {
    slug: 'bus-or-walk',
    title: 'Take the bus or walk?',
    prompt: 'The shop is near your home. Do you go on foot or take the bus?',
    options: [
      { label: 'Walk', description: 'Go on foot. It takes ten minutes.' },
      { label: 'Take the bus', description: 'Get the bus outside your house.' },
    ],
    conditionalPrompt: 'Say what you do in the sun and in the rain.',
    vocabulary: {
      nouns: [
        ['bus', 'autobús', 'The bus is number ten.'],
        ['shop', 'tienda', 'I go to the shop.'],
        ['stop', 'parada', 'The stop is here.'],
        ['road', 'calle o carretera', 'This road is quiet.'],
      ],
      phrasalVerbs: [
        ['get on', 'subirse a', 'I get on the bus here.'],
        ['get off', 'bajarse de', 'We get off at the park.'],
        ['go back', 'volver', 'I go back home at five.'],
        ['wait for', 'esperar a o por', 'I wait for the lift.'],
      ],
      adjectives: [
        ['near', 'cerca', 'The shop is near.'],
        ['far', 'lejos', 'The next stop is far.'],
        ['dry', 'seco', 'My coat is dry.'],
        ['wet', 'mojado', 'The road is wet.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'The **shop** is **near**, **so** I walk.',
        'The **road** is **dry** today.',
        'I **go back** home on foot too.',
      ],
      b: [
        'The **road** is **wet**, **so** I **wait for** the **bus**.',
        'I **get on** at this **stop**.',
        'I **get off** near the shop.',
      ],
      conditional: [
        'I walk when the **road** is **dry**.',
        '**But** when it is **wet**, I **get on** the **bus**.',
        'The **stop** is **near** my home.',
      ],
    },
  },
  {
    slug: 'bike-or-car',
    title: 'Go by bike or by car?',
    prompt: 'You are going to the park. Do you want to ride your bike or go by car?',
    options: [
      { label: 'Ride a bike', description: 'Ride on a small road to the park.' },
      { label: 'Go by car', description: 'Go with your family in the car.' },
    ],
    conditionalPrompt: 'Say what you choose on a sunny day and on a cold day.',
    vocabulary: {
      nouns: [
        ['bike', 'bicicleta', 'My bike is blue.'],
        ['car', 'carro', 'My family has a car.'],
        ['park', 'parque', 'We go to the park.'],
        ['helmet', 'casco', 'I have a helmet.'],
      ],
      phrasalVerbs: [
        ['get in', 'entrar en un carro', 'I get in the car.'],
        ['get out', 'salir de un carro', 'We get out near the school.'],
        ['slow down', 'ir más despacio', 'I slow down on my bike.'],
        ['put on', 'ponerse', 'I put on my shoes.'],
      ],
      adjectives: [
        ['sunny', 'soleado', 'It is sunny today.'],
        ['cold', 'frío', 'It is cold outside.'],
        ['fast', 'rápido', 'The car is fast.'],
        ['safe', 'seguro', 'This road is safe for bikes.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'It is **sunny**, **so** I take my **bike**.',
        'I **put on** my **helmet**.',
        'I **slow down** near the **park**.',
      ],
      b: [
        'I **get in** the **car** with my family.',
        'It is **cold**, **but** the car is warm.',
        'We **get out** at the **park**.',
      ],
      conditional: [
        'I take my **bike** when it is **sunny**.',
        'I **put on** my **helmet**.',
        '**But** when it is **cold**, I **get in** the **car**.',
      ],
    },
  },
  {
    slug: 'stairs-or-lift',
    title: 'Stairs or lift?',
    prompt: 'You need to go up two floors. Do you take the stairs or the lift?',
    options: [
      { label: 'The stairs', description: 'Walk up two floors.' },
      { label: 'The lift', description: 'Wait for the lift and go up.' },
    ],
    conditionalPrompt: 'Say what you choose with a heavy bag and without a bag.',
    vocabulary: {
      nouns: [
        ['stairs', 'escaleras', 'The stairs are on the left.'],
        ['lift', 'ascensor', 'The lift is here.'],
        ['floor', 'piso', 'My room is on this floor.'],
        ['bag', 'bolso', 'My bag is heavy.'],
      ],
      phrasalVerbs: [
        ['go up', 'subir', 'I go up one floor.'],
        ['go down', 'bajar', 'I go down the stairs.'],
        ['wait for', 'esperar a o por', 'I wait for the lift.'],
        ['stand up', 'ponerse de pie', 'I stand up to let her pass.'],
      ],
      adjectives: [
        ['heavy', 'pesado', 'This bag is heavy.'],
        ['light', 'liviano', 'The bag is light today.'],
        ['slow', 'lento', 'This lift is slow.'],
        ['tired', 'cansado', 'I am tired after work.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I take the **stairs** **because** my **bag** is **light**.',
        'I **go up** two floors.',
        'I **go down** the stairs later.',
      ],
      b: [
        'My **bag** is **heavy**, **so** I **wait for** the **lift**.',
        'I am **tired**.',
        'The lift can **go up** to my **floor**.',
      ],
      conditional: [
        'I take the **stairs** when my **bag** is **light**.',
        '**But** when it is **heavy**, I **wait for** the **lift**.',
        'Both go to my **floor**.',
      ],
    },
  },
  {
    slug: 'inside-or-outside',
    title: 'Sit inside or outside?',
    prompt: 'You are at a café. Do you sit inside or outside?',
    options: [
      { label: 'Inside', description: 'Sit at a table by the window.' },
      { label: 'Outside', description: 'Sit at a table in the sun.' },
    ],
    conditionalPrompt: 'Say where you sit in the sun and when it is cold.',
    vocabulary: {
      nouns: [
        ['table', 'mesa', 'This table is free.'],
        ['chair', 'silla', 'I need a chair.'],
        ['window', 'ventana', 'The window is big.'],
        ['sun', 'sol', 'I can see the sun.'],
      ],
      phrasalVerbs: [
        ['sit down', 'sentarse', 'We sit down by the door.'],
        ['come in', 'entrar', 'Come in and sit here.'],
        ['move over', 'correrse', 'Move over, please.'],
        ['stand up', 'ponerse de pie', 'I stand up to let her pass.'],
      ],
      adjectives: [
        ['warm', 'cálido', 'It is warm outside.'],
        ['cold', 'frío', 'It is cold near the door.'],
        ['free', 'libre o disponible', 'The chair is free.'],
        ['bright', 'luminoso', 'The room is bright.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I **come in** **because** it is **cold** outside.',
        'I **sit down** at a **table** by the **window**.',
        'It is **bright** here.',
      ],
      b: [
        'I want a **free** **table** in the **sun**.',
        'It is **warm**, **so** I sit outside.',
        'My friend can **sit down** next to me.',
      ],
      conditional: [
        'When it is **warm**, I **sit down** in the **sun**.',
        '**But** on a **cold** day, I **come in**.',
        'I like the **window** seat.',
      ],
    },
  },
  {
    slug: 'morning-or-evening-class',
    title: 'A morning class or an evening class?',
    prompt: 'You can study English at eight in the morning or at six in the evening. Which class do you choose?',
    options: [
      { label: 'Morning class', description: 'Go to class at eight.' },
      { label: 'Evening class', description: 'Go to class at six.' },
    ],
    conditionalPrompt: 'Say which time works on a school day and on a free day.',
    vocabulary: {
      nouns: [
        ['morning', 'mañana', 'I study in the morning.'],
        ['evening', 'tarde o noche', 'We meet in the evening.'],
        ['class', 'clase', 'My class is on Monday.'],
        ['time', 'hora o tiempo', 'What time is the class?'],
      ],
      phrasalVerbs: [
        ['get up', 'levantarse', 'I get up at seven.'],
        ['come back', 'volver', 'I come back at six.'],
        ['write down', 'anotar', 'Write down the time.'],
        ['turn on', 'encender', 'I turn on the light.'],
      ],
      adjectives: [
        ['early', 'temprano', 'Eight is early for me.'],
        ['late', 'tarde', 'Six is late for lunch.'],
        ['free', 'libre', 'I am free in the evening.'],
        ['tired', 'cansado', 'I am tired at night.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I **get up** **early**, **so** I choose the **morning** **class**.',
        'I **write down** the **time**.',
        'Eight is good for me.',
      ],
      b: [
        'I choose the **evening** **class** **because** I am **free** at six.',
        'I **come back** after class.',
        'I have dinner at home.',
      ],
      conditional: [
        'I study in the **evening** on a school day.',
        '**But** on a **free** day I **get up** **early**.',
        'I can go to the **morning** **class**.',
      ],
    },
  },
  {
    slug: 'backpack-or-tote',
    title: 'A backpack or a small bag?',
    prompt: 'You need to take things to class. Do you take a backpack or a small bag?',
    options: [
      { label: 'Backpack', description: 'Carry a book, a bottle and a pencil case.' },
      { label: 'Small bag', description: 'Carry a notebook and a pen.' },
    ],
    conditionalPrompt: 'Say what you take on a long day and on a short day.',
    vocabulary: {
      nouns: [
        ['backpack', 'mochila', 'My backpack is black.'],
        ['notebook', 'cuaderno', 'I have one notebook.'],
        ['bottle', 'botella', 'My bottle is in the bag.'],
        ['pencil case', 'cartuchera', 'The pencil case is blue.'],
      ],
      phrasalVerbs: [
        ['pick up', 'recoger o levantar', 'I pick up my bag.'],
        ['put away', 'guardar', 'I put away my cup.'],
        ['take out', 'sacar', 'I take out my lunch box.'],
        ['look for', 'buscar', 'I look for my keys.'],
      ],
      adjectives: [
        ['big', 'grande', 'The backpack is big.'],
        ['small', 'pequeño', 'The bag is small.'],
        ['light', 'liviano', 'This notebook is light.'],
        ['heavy', 'pesado', 'My backpack is heavy.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I **pick up** my **big** **backpack**.',
        'I need a **bottle** **and** a **pencil case**.',
        'Everything is in one bag.',
      ],
      b: [
        'I choose the **small** bag **because** it is **light**.',
        'I **take out** my **notebook** in class.',
        'I can find it fast.',
      ],
      conditional: [
        'For a long day I take the **big** **backpack** with my **bottle**.',
        '**But** I take a **small** bag on a short day.',
        'I **put away** my **notebook** after class.',
      ],
    },
  },
  {
    slug: 'list-on-paper-or-phone',
    title: 'A paper list or a phone list?',
    prompt: 'You are going to the shop. Do you write your list on paper or on your phone?',
    options: [
      { label: 'Paper', description: 'Write four things on a piece of paper.' },
      { label: 'Phone', description: 'Make the list on your phone.' },
    ],
    conditionalPrompt: 'Say what you use when your phone is at home.',
    vocabulary: {
      nouns: [
        ['list', 'lista', 'I have a list of food.'],
        ['paper', 'papel', 'I write on paper.'],
        ['phone', 'celular', 'My phone is in my bag.'],
        ['pen', 'bolígrafo', 'This is a blue pen.'],
      ],
      phrasalVerbs: [
        ['write down', 'anotar', 'Write down the time.'],
        ['look at', 'mirar', 'I look at the list.'],
        ['turn on', 'encender', 'I turn on the light.'],
        ['check off', 'marcar como hecho', 'I check off each item.'],
      ],
      adjectives: [
        ['short', 'corto', 'The list is short.'],
        ['long', 'largo', 'This list is long.'],
        ['easy', 'fácil', 'The list is easy to read.'],
        ['ready', 'listo', 'My list is ready.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I **write down** a **short** **list** on **paper**.',
        'It is **easy**, **and** I have a **pen**.',
        'I can **check off** each thing.',
      ],
      b: [
        'I use my **phone**.',
        'My **list** is **ready**, **so** I **turn on** the phone in the shop.',
        'I **look at** the list there.',
      ],
      conditional: [
        'I use my **phone** for a **long** **list**.',
        '**But** when my phone is at home, I **write down** the list on **paper**.',
        'A short list is **easy**.',
      ],
    },
  },
  {
    slug: 'study-alone-or-together',
    title: 'Study alone or with a friend?',
    prompt: 'You have ten minutes to study English. Do you study alone or with a friend?',
    options: [
      { label: 'Study alone', description: 'Read your words at a desk.' },
      { label: 'Study with a friend', description: 'Say the words to each other.' },
    ],
    conditionalPrompt: 'Say when you want quiet and when you want help.',
    vocabulary: {
      nouns: [
        ['word', 'palabra', 'This is a new word.'],
        ['friend', 'amigo o amiga', 'My friend studies English.'],
        ['desk', 'escritorio', 'I work at a desk.'],
        ['book', 'libro', 'Close your book, please.'],
      ],
      phrasalVerbs: [
        ['sit down', 'sentarse', 'We sit down by the door.'],
        ['read out', 'leer en voz alta', 'I read out the word.'],
        ['look up', 'buscar información', 'I look up a word.'],
        ['sit with', 'sentarse con alguien', 'I sit with my friend.'],
      ],
      adjectives: [
        ['alone', 'solo', 'I am alone at my desk.'],
        ['quiet', 'tranquilo', 'The room is quiet.'],
        ['new', 'nuevo', 'These words are new.'],
        ['easy', 'fácil', 'This word is easy.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I **sit down** at my **desk**.',
        'I study **alone** **because** I like a **quiet** place.',
        'I can **look up** one **word**.',
      ],
      b: [
        'I **sit with** my **friend**.',
        'We **read out** the **new** **words**, **and** we help each other.',
        'It is fun.',
      ],
      conditional: [
        'I study **alone** when the **words** are **easy**.',
        '**But** with **new** words I **sit with** my **friend**.',
        'We can **read them out**.',
      ],
    },
  },
  {
    slug: 'park-or-cinema',
    title: 'Go to the park or the cinema?',
    prompt: 'You have a free afternoon. Do you go to the park or to the cinema?',
    options: [
      { label: 'The park', description: 'Walk and sit outside.' },
      { label: 'The cinema', description: 'Buy a ticket and watch a film.' },
    ],
    conditionalPrompt: 'Say what you do when it rains.',
    vocabulary: {
      nouns: [
        ['park', 'parque', 'The park is near our school.'],
        ['cinema', 'cine', 'The cinema opens at two.'],
        ['film', 'película', 'The film starts soon.'],
        ['ticket', 'entrada', 'I have a ticket for the film.'],
      ],
      phrasalVerbs: [
        ['go out', 'salir', 'We go out for lunch.'],
        ['sit down', 'sentarse', 'We sit down by the door.'],
        ['come back', 'volver', 'I come back at six.'],
        ['find out', 'averiguar', 'I find out the time.'],
      ],
      adjectives: [
        ['sunny', 'soleado', 'It is sunny in the park.'],
        ['wet', 'mojado', 'The grass is wet.'],
        ['fun', 'divertido', 'The film is fun.'],
        ['free', 'gratis o libre', 'The park is free.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I **go out** to the **park** **because** it is **sunny**.',
        'It is **free**.',
        'I can **sit down** outside.',
      ],
      b: [
        'I buy a **ticket** for a **fun** **film**.',
        'The park is **wet**, **so** I go to the **cinema**.',
        'I **find out** when the film starts.',
      ],
      conditional: [
        'When it is **sunny**, I **go out** to the **park**.',
        '**But** when it is **wet**, I watch a **film** at the **cinema**.',
        'Both are **fun**.',
      ],
    },
  },
  {
    slug: 'book-or-video',
    title: 'Read a book or watch a video?',
    prompt: 'You have twenty minutes at home. Do you read a book or watch a video?',
    options: [
      { label: 'A book', description: 'Read a story on the sofa.' },
      { label: 'A video', description: 'Watch a short video on your phone.' },
    ],
    conditionalPrompt: 'Say what you choose when you are tired.',
    vocabulary: {
      nouns: [
        ['book', 'libro', 'I have a book about dogs.'],
        ['story', 'cuento o historia', 'This story is about a dog.'],
        ['sofa', 'sofá', 'I sit on the sofa.'],
        ['video', 'video', 'The video is five minutes long.'],
      ],
      phrasalVerbs: [
        ['lie down', 'acostarse', 'I lie down on my bed.'],
        ['turn on', 'encender', 'I turn on the light.'],
        ['turn off', 'apagar', 'I turn off my phone.'],
        ['look up', 'buscar información', 'I look up a word.'],
      ],
      adjectives: [
        ['short', 'corto', 'The story is short.'],
        ['long', 'largo', 'This video is long.'],
        ['tired', 'cansado', 'I am tired today.'],
        ['funny', 'chistoso', 'The story is funny.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I **turn off** my phone **and** open my **book**.',
        'The **story** is **short** and **funny**.',
        'I read on the **sofa**.',
      ],
      b: [
        'I choose a **video** **because** I am **tired**.',
        'I **turn on** my phone and **lie down**.',
        'I watch a **short** video.',
      ],
      conditional: [
        'I read a **book** when the **story** is **funny**.',
        '**But** when I am **tired**, I **turn on** a **short** **video**.',
        'I have time for one.',
      ],
    },
  },
  {
    slug: 'music-or-quiet',
    title: 'Music or quiet?',
    prompt: 'You are doing homework. Do you want music or a quiet room?',
    options: [
      { label: 'Music', description: 'Play music at a low volume.' },
      { label: 'Quiet', description: 'Turn the music off.' },
    ],
    conditionalPrompt: 'Say when you like music and when you need quiet.',
    vocabulary: {
      nouns: [
        ['music', 'música', 'I like this music.'],
        ['room', 'cuarto', 'My room is upstairs.'],
        ['homework', 'tarea', 'I do my homework at home.'],
        ['song', 'canción', 'I know this song.'],
      ],
      phrasalVerbs: [
        ['turn on', 'encender', 'I turn on the light.'],
        ['turn off', 'apagar', 'I turn off my phone.'],
        ['turn down', 'bajar el volumen', 'I turn down the music.'],
        ['put away', 'guardar', 'I put away my cup.'],
      ],
      adjectives: [
        ['quiet', 'silencioso', 'The room is quiet.'],
        ['loud', 'ruidoso o fuerte', 'The song is loud.'],
        ['easy', 'fácil', 'The homework is easy.'],
        ['hard', 'difícil', 'This question is hard.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I **turn on** **music** **because** my **homework** is **easy**.',
        'I like this **song**.',
        'I **turn it down** if it gets **loud**.',
      ],
      b: [
        'I **turn off** the **music**.',
        'The **homework** is **hard**, **so** I want a **quiet** **room**.',
        'I **put away** my phone too.',
      ],
      conditional: [
        'With **easy** **homework**, I **turn on** a **song**.',
        '**But** for **hard** homework, I **turn off** the **music**.',
        'I need a **quiet** room.',
      ],
    },
  },
  {
    slug: 'saturday-morning-or-afternoon',
    title: 'Meet in the morning or afternoon?',
    prompt: 'Your friend can meet on Saturday. Do you meet at ten or at three?',
    options: [
      { label: 'At ten', description: 'Meet on Saturday morning.' },
      { label: 'At three', description: 'Meet on Saturday afternoon.' },
    ],
    conditionalPrompt: 'Say what time works on a busy day.',
    vocabulary: {
      nouns: [
        ['morning', 'mañana', 'Saturday morning is free.'],
        ['afternoon', 'tarde', 'We go out in the afternoon.'],
        ['friend', 'amigo o amiga', 'I have lunch with a friend.'],
        ['Saturday', 'sábado', 'Today is Saturday.'],
      ],
      phrasalVerbs: [
        ['wake up', 'despertarse', 'I wake up at eight.'],
        ['meet up', 'quedar para verse', 'We meet up at the park.'],
        ['go out', 'salir', 'We go out for lunch.'],
        ['come back', 'volver', 'I come back at six.'],
      ],
      adjectives: [
        ['early', 'temprano', 'Ten is early for him.'],
        ['late', 'tarde', 'Three is late for lunch.'],
        ['busy', 'ocupado', 'I am busy on Saturday.'],
        ['free', 'libre', 'I am free at three.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I **wake up** **early** on **Saturday**, **so** ten is good.',
        'I **meet up** with my **friend** in the **morning**.',
        'We can have lunch later.',
      ],
      b: [
        'I am **busy** in the **morning**, **so** I choose the **afternoon**.',
        'I **meet up** at three.',
        'My **friend** is **free** then too.',
      ],
      conditional: [
        'When I am **free** in the **morning**, I **go out** at ten.',
        '**But** on a **busy** day, I **meet up** with my **friend** in the **afternoon**.',
        'Three works well.',
      ],
    },
  },
  {
    slug: 'blue-or-red-shirt',
    title: 'A blue shirt or a red shirt?',
    prompt: 'You can buy one shirt. Do you choose blue or red?',
    options: [
      { label: 'Blue shirt', description: 'Try on a plain blue shirt.' },
      { label: 'Red shirt', description: 'Try on a bright red shirt.' },
    ],
    conditionalPrompt: 'Say what colour you wear for class and for a party.',
    vocabulary: {
      nouns: [
        ['shirt', 'camisa', 'This shirt is new.'],
        ['jeans', 'jeans', 'I wear jeans on Friday.'],
        ['shop', 'tienda', 'The shop has shirts.'],
        ['party', 'fiesta', 'There is a party tonight.'],
      ],
      phrasalVerbs: [
        ['try on', 'probarse ropa', 'I try on the shirt.'],
        ['put on', 'ponerse', 'I put on my shoes.'],
        ['take off', 'quitarse ropa', 'I take off my coat.'],
        ['look for', 'buscar', 'I look for my keys.'],
      ],
      adjectives: [
        ['blue', 'azul', 'My shirt is blue.'],
        ['red', 'rojo', 'Her shirt is red.'],
        ['bright', 'brillante', 'This colour is bright.'],
        ['plain', 'liso o sencillo', 'The shirt is plain.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I **try on** the **blue** **shirt**.',
        'It is **plain**, **and** I can wear it with **jeans**.',
        'I choose blue.',
      ],
      b: [
        'I **look for** a **red** **shirt** **because** I have a **party**.',
        'I **try it on** in the **shop**.',
        'I like the **bright** colour.',
      ],
      conditional: [
        'For class, I **put on** my **plain** **blue** **shirt**.',
        '**But** for a **party**, I wear **red**.',
        'I like a **bright** colour at night.',
      ],
    },
  },
  {
    slug: 'big-or-small-room',
    title: 'A big room or a small room?',
    prompt: 'You can choose a room for your stay. Do you want a big room or a small room?',
    options: [
      { label: 'A big room', description: 'Get a room with two beds.' },
      { label: 'A small room', description: 'Get a cheaper room with one bed.' },
    ],
    conditionalPrompt: 'Say which room works for one person and for two.',
    vocabulary: {
      nouns: [
        ['room', 'habitación', 'This room has a window.'],
        ['bed', 'cama', 'My bed is near the door.'],
        ['desk', 'escritorio', 'The desk is small.'],
        ['price', 'precio', 'The price is on the sign.'],
      ],
      phrasalVerbs: [
        ['move in', 'mudarse a un lugar', 'We move in on Monday.'],
        ['lie down', 'acostarse', 'I lie down on my bed.'],
        ['put away', 'guardar', 'I put away my cup.'],
        ['clean up', 'limpiar y ordenar', 'I clean up my room.'],
      ],
      adjectives: [
        ['big', 'grande', 'This room is big.'],
        ['small', 'pequeño', 'That room is small.'],
        ['cheap', 'barato', 'The room is cheap.'],
        ['clean', 'limpio', 'The bed is clean.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I choose a **big** **room** **because** I am with a friend.',
        'There are two **beds**.',
        'We can **put away** our bags by the **desk**.',
      ],
      b: [
        'I take the **small** **room** **because** the **price** is low.',
        'The **bed** is **clean**.',
        'I can **lie down** after my trip.',
      ],
      conditional: [
        'I take a **small** **room** when I am alone.',
        '**But** when a friend comes, we **move in** to the **big** room.',
        'We need two **beds**.',
      ],
    },
  },
  {
    slug: 'window-open-or-closed',
    title: 'Open or close the window?',
    prompt: 'You are in your room. Do you want the window open or closed?',
    options: [
      { label: 'Open the window', description: 'Let in air from outside.' },
      { label: 'Close the window', description: 'Keep the room warm and quiet.' },
    ],
    conditionalPrompt: 'Say what you do when it is hot and when it is noisy.',
    vocabulary: {
      nouns: [
        ['window', 'ventana', 'My window is open.'],
        ['air', 'aire', 'I like the air outside.'],
        ['room', 'cuarto', 'The room is warm.'],
        ['street', 'calle', 'The street is busy.'],
      ],
      phrasalVerbs: [
        ['open up', 'abrir', 'Open up the box.'],
        ['bring in', 'entrar algo desde afuera', 'I bring in my chair.'],
        ['turn on', 'encender', 'I turn on the light.'],
        ['turn off', 'apagar', 'I turn off my phone.'],
      ],
      adjectives: [
        ['hot', 'caliente', 'The room is hot.'],
        ['cold', 'frío', 'The air is cold.'],
        ['noisy', 'ruidoso', 'The street is noisy.'],
        ['quiet', 'silencioso', 'My room is quiet.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'The **room** is **hot**, **so** I **open up** the **window**.',
        'I like the **air** from outside.',
        'I **turn off** the fan.',
      ],
      b: [
        'The **street** is **noisy**, **so** I close the **window**.',
        'I want a **quiet** **room**.',
        'I **turn on** the fan if it is hot.',
      ],
      conditional: [
        'I **open up** the **window** when it is **hot**.',
        '**But** when the **street** is **noisy**, I close it.',
        'Then the **room** is **quiet**.',
      ],
    },
  },
  {
    slug: 'new-or-used-table',
    title: 'A new table or a used table?',
    prompt: 'You need a table for your room. Do you buy a new table or a used table?',
    options: [
      { label: 'A new table', description: 'Choose a new table at the shop.' },
      { label: 'A used table', description: 'Buy a cheaper table from a neighbour.' },
    ],
    conditionalPrompt: 'Say what you buy when you have only a little money.',
    vocabulary: {
      nouns: [
        ['table', 'mesa', 'The table is near the bed.'],
        ['shop', 'tienda', 'The shop opens at nine.'],
        ['room', 'cuarto', 'My room needs a table.'],
        ['neighbour', 'vecino o vecina', 'My neighbour has a table.'],
      ],
      phrasalVerbs: [
        ['pick up', 'recoger o levantar', 'I pick up my bag.'],
        ['take back', 'devolver', 'I take back the table.'],
        ['set up', 'montar o instalar', 'I set up my desk.'],
        ['look for', 'buscar', 'I look for my keys.'],
      ],
      adjectives: [
        ['new', 'nuevo', 'This table is new.'],
        ['used', 'usado', 'I have a used table.'],
        ['cheap', 'barato', 'That table is cheap.'],
        ['strong', 'resistente', 'The table is strong.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I choose a **new** **table** **because** it is **strong**.',
        'I **pick it up** at the **shop**.',
        'I can **set it up** in my **room**.',
      ],
      b: [
        'My **neighbour** has a **used** **table**.',
        'It is **cheap**, **so** I **pick it up** today.',
        'The table is good for my room.',
      ],
      conditional: [
        'I **look for** a **used** **table** when I have little money.',
        '**But** if I have more money, I can buy a **new** one.',
        'I **set it up** in my **room**.',
      ],
    },
  },
]
