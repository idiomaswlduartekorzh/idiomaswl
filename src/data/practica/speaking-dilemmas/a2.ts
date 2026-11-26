import type { SpeakingDilemma } from './types'

const CONNECTORS: SpeakingDilemma['vocabulary']['connectors'] = [
  ['because', 'porque', 'I walk because it is near.'],
  ['but', 'pero', 'The room is small, but it is clean.'],
  ['if', 'si', 'If it rains, we can stay home.'],
  ['so', 'así que', 'The bus is late, so we can walk.'],
]

export const A2_DILEMMAS: readonly SpeakingDilemma[] = [
  {
    slug: 'market-or-supermarket',
    title: 'A street market or a supermarket?',
    prompt: 'You need fruit and a few things for dinner. Do you shop at a street market or at a supermarket?',
    options: [
      { label: 'Street market', description: 'Buy fruit at a stall and ask what is fresh.' },
      { label: 'Supermarket', description: 'Pick up fruit and the rest of your shopping in one place.' },
    ],
    conditionalPrompt: 'Say where you shop when you have extra time and when you are in a hurry.',
    vocabulary: {
      nouns: [
        ['stall', 'puesto', 'The fruit stall opens at eight.'],
        ['basket', 'canasta', 'I put the apples in my basket.'],
        ['offer', 'oferta', 'There is an offer on oranges.'],
        ['cash', 'efectivo', 'I have some cash for the market.'],
      ],
      phrasalVerbs: [
        ['look around', 'mirar alrededor', 'We looked around the market.'],
        ['pick up', 'comprar o recoger de paso', 'I picked up some milk.'],
        ['run out of', 'quedarse sin', 'We ran out of fruit.'],
        ['pay for', 'pagar por', 'I paid for the apples in cash.'],
      ],
      adjectives: [
        ['fresh', 'fresco', 'The tomatoes are fresh.'],
        ['local', 'local', 'The stall sells local fruit.'],
        ['crowded', 'lleno de gente', 'The market gets crowded.'],
        ['convenient', 'práctico', 'The supermarket is convenient after work.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **look around** the street market **because** I like buying **local** fruit.',
        'The seller at the **stall** can tell me which peaches are ready to eat.',
        'I would go early, before it gets **crowded**.',
      ],
      b: [
        'The supermarket is more **convenient** when I need several things.',
        'I can **pick up** oranges and rice in one trip and use the **offer** on fruit.',
        'I choose it **because** I can shop on my way home.',
      ],
      conditional: [
        '**If** I have a free morning, I’ll **look around** the market for **fresh** fruit.',
        'On a busy evening, I’ll **pick up** everything at the supermarket.',
        'I carry **cash** for the **stall** just in case.',
      ],
    },
  },
  {
    slug: 'meal-prep-or-fresh-dinner',
    title: 'Cook ahead or cook every night?',
    prompt: 'You work until six on weekdays. Do you make several dinners on Sunday or cook something fresh each evening?',
    options: [
      { label: 'Cook ahead', description: 'Prepare three dinners on Sunday and keep them for later.' },
      { label: 'Cook every evening', description: 'Make one quick meal when you get home.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['portion', 'porción', 'Put one portion in each box.'],
        ['leftovers', 'sobras', 'We had leftovers for lunch.'],
        ['container', 'recipiente', 'I keep rice in a container.'],
        ['ingredient', 'ingrediente', 'Tomato is the main ingredient.'],
      ],
      phrasalVerbs: [
        ['heat up', 'recalentar', 'I heated up some soup.'],
        ['chop up', 'picar', 'Chop up two onions.'],
        ['put away', 'guardar', 'I put away the food after dinner.'],
        ['use up', 'usar hasta acabar', 'We used up the last tomato.'],
      ],
      adjectives: [
        ['ready', 'listo', 'Dinner will be ready at seven.'],
        ['similar', 'parecido', 'The two meals are similar.'],
        ['filling', 'que llena', 'Rice and beans are filling.'],
        ['flexible', 'flexible', 'This plan is flexible.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d cook ahead **because** I come home hungry.',
        'A **portion** in a **container** is **ready** to **heat up**, even on a long day.',
        'I would make two different meals so I don’t eat the same thing all week.',
      ],
      b: [
        'I’d cook each evening.',
        'It feels more **flexible**, and I can **use up** one **ingredient** before it goes bad.',
        'I have less free time after work, **but** I can make a simple dinner in fifteen minutes.',
      ],
      conditional: [
        '**If** I know I’ll work late, I’ll **heat up** **leftovers**.',
        '**But** on a free evening I’ll **chop up** vegetables and cook something fresh.',
        'A **flexible** plan is easier to follow.',
      ],
    },
  },
  {
    slug: 'recipe-or-cooking-class',
    title: 'Follow a recipe or take a cooking class?',
    prompt: 'You want to learn one new dish. Do you follow a recipe at home or join a small cooking class?',
    options: [
      { label: 'A recipe at home', description: 'Try the dish in your kitchen and stop whenever you need to.' },
      { label: 'A cooking class', description: 'Make the dish with a teacher and ask questions.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['recipe', 'receta', 'The recipe is on page ten.'],
        ['dish', 'plato', 'This dish has rice and vegetables.'],
        ['step', 'paso', 'Read the first step.'],
        ['mistake', 'error', 'I made one small mistake.'],
      ],
      phrasalVerbs: [
        ['look up', 'buscar información', 'I looked up a simple recipe.'],
        ['write down', 'anotar', 'I wrote down the oven time.'],
        ['try out', 'probar algo nuevo', 'She tried out a new dish.'],
        ['go over', 'repasar', 'The teacher went over each step.'],
      ],
      adjectives: [
        ['clear', 'claro', 'The instructions are clear.'],
        ['simple', 'sencillo', 'This dish is simple to make.'],
        ['confusing', 'confuso', 'The last step was confusing.'],
        ['patient', 'paciente', 'Our teacher is patient.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **look up** a **simple** **recipe** **because** I like working at home.',
        'I can read each **step** twice and **write down** the time.',
        'If I make a mistake, I can try again tomorrow.',
      ],
      b: [
        'I’d take the class **because** a **patient** teacher can **go over** a **confusing** **step** with me.',
        'I can see what the dish should look like.',
        'A single **mistake** is easier to fix when someone can help.',
      ],
      conditional: [
        '**If** the **recipe** is **clear**, I’ll **try it out** at home.',
        'A class makes more sense for a **dish** with several new steps.',
        'A teacher can show me when the bread is ready.',
      ],
    },
  },
  {
    slug: 'early-or-late-train',
    title: 'Take an early train or a later one?',
    prompt: 'You are visiting a friend in another town. Do you take an early train with more time there or a later train with a cheaper ticket?',
    options: [
      { label: 'The early train', description: 'Pay more, arrive in time for lunch and spend longer with your friend.' },
      { label: 'The later train', description: 'Save money and arrive in the afternoon.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['fare', 'tarifa del transporte', 'The early fare is higher.'],
        ['platform', 'andén', 'The train leaves from platform five.'],
        ['delay', 'retraso', 'The delay was only ten minutes.'],
        ['journey', 'viaje o trayecto', 'The journey takes two hours.'],
      ],
      phrasalVerbs: [
        ['set off', 'salir para comenzar un viaje', 'We set off at seven.'],
        ['get in', 'llegar', 'The train gets in at noon.'],
        ['get off', 'bajarse', 'I got off at the last station.'],
        ['check in', 'avisar que llegaste o registrarte', 'I checked in with my friend on arrival.'],
      ],
      adjectives: [
        ['early', 'temprano', 'The train is early today.'],
        ['direct', 'directo', 'We took a direct train.'],
        ['reliable', 'fiable', 'The morning service is reliable.'],
        ['cheaper', 'más barato', 'The later ticket is cheaper.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **set off** early **because** I want to have lunch with my friend.',
        'A **direct** train makes the **journey** easy.',
        'I can pay a higher **fare** for a few extra hours together.',
      ],
      b: [
        'I’d take the **cheaper** **fare**.',
        'I **get in** at three, **but** my friend is free all evening.',
        'A short **delay** would not change our plans, so I don’t mind arriving later.',
      ],
      conditional: [
        '**If** we have plans for lunch, I’ll **set off** early.',
        '**But** if the only plan is dinner, I’ll take the **cheaper** train.',
        'I’d check which **journey** is more **reliable**.',
      ],
    },
  },
  {
    slug: 'guest-room-or-hotel',
    title: 'Stay with a family or book a hotel?',
    prompt: 'You are visiting a town for a weekend. Do you stay in a family’s spare room or book a small hotel room?',
    options: [
      { label: 'A family’s spare room', description: 'Share breakfast with your hosts and agree on when you can come and go.' },
      { label: 'A hotel room', description: 'Have your own room and bathroom near the town centre.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['host', 'anfitrión', 'Our host met us at the door.'],
        ['guest', 'huésped', 'There was another guest at breakfast.'],
        ['key', 'llave', 'I got the key at the desk.'],
        ['privacy', 'privacidad', 'I like having some privacy.'],
      ],
      phrasalVerbs: [
        ['stay over', 'quedarse a dormir', 'We stayed over on Friday.'],
        ['check in', 'registrarse al llegar', 'I checked in at five.'],
        ['show someone around', 'mostrarle un sitio a alguien', 'Our host showed us around.'],
        ['head back', 'volver hacia un lugar', 'We headed back after dinner.'],
      ],
      adjectives: [
        ['welcoming', 'acogedor', 'The hosts were welcoming.'],
        ['private', 'privado', 'The hotel has a private bathroom.'],
        ['central', 'céntrico', 'The hotel is central.'],
        ['comfortable', 'cómodo', 'The bed was comfortable.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **stay over** with the family **because** I like meeting people.',
        'A **welcoming** **host** might **show me around** the area or suggest a place to eat.',
        'We can agree on quiet hours when I arrive.',
      ],
      b: [
        'I’d choose the hotel **because** I want a **private** bathroom and more **privacy**.',
        'I can **check in** late and take my **key** with me.',
        'A **central** room is easy to get back to.',
      ],
      conditional: [
        '**If** I want company, I’d **stay over** with a **welcoming** **host**.',
        '**But** on a short trip with late plans, I’d choose the hotel.',
        'I could **head back** when I’m ready.',
      ],
    },
  },
  {
    slug: 'carry-on-or-big-suitcase',
    title: 'A small bag or a big suitcase?',
    prompt: 'You are travelling for three days. Do you take a small bag on the plane or pay to take a big suitcase?',
    options: [
      { label: 'A small bag', description: 'Take two changes of clothes and keep the bag with you.' },
      { label: 'A big suitcase', description: 'Pack extra clothes and collect the suitcase after you land.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['suitcase', 'maleta', 'My suitcase has wheels.'],
        ['luggage', 'equipaje', 'Our luggage is on the belt.'],
        ['space', 'espacio', 'I need space for a coat.'],
        ['fee', 'cargo o tarifa', 'There is a fee for the big bag.'],
      ],
      phrasalVerbs: [
        ['pack up', 'empacar tus cosas', 'I packed up after breakfast.'],
        ['leave behind', 'dejar algo en un lugar', 'I left the heavy shoes behind.'],
        ['pick up', 'recoger', 'We picked up our luggage.'],
        ['roll up', 'enrollar', 'Roll up your T-shirts.'],
      ],
      adjectives: [
        ['light', 'ligero', 'My small bag is light.'],
        ['bulky', 'voluminoso', 'The coat is bulky.'],
        ['extra', 'adicional', 'Take an extra shirt.'],
        ['practical', 'práctico', 'A backpack is practical for the train.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d take the **light** bag **because** I only need three outfits.',
        'I can **roll up** my shirts to save **space**.',
        'I’d **leave behind** my heavy shoes and walk straight out after the flight.',
      ],
      b: [
        'I’d pay the **fee** for a **suitcase**.',
        'I need a **bulky** coat and an **extra** pair of shoes.',
        'I have to **pick up** my **luggage** after the flight, **but** I’m happy to wait.',
      ],
      conditional: [
        '**If** I can **leave behind** the **bulky** clothes, a small bag is **practical**.',
        'For a cold trip, I’d take the **suitcase**.',
        'There’s more **space**, and I can **pick it up** after I land.',
      ],
    },
  },
  {
    slug: 'phone-map-or-directions',
    title: 'Use a map or ask someone?',
    prompt: 'You are in an unfamiliar part of town. How do you find the station: use the map on your phone or ask someone nearby?',
    options: [
      { label: 'Use your phone map', description: 'Check the route and follow it as you walk.' },
      { label: 'Ask for directions', description: 'Speak to someone and repeat the route to check it.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['direction', 'indicación', 'She gave me clear directions.'],
        ['corner', 'esquina', 'The café is on the corner.'],
        ['route', 'ruta', 'This is the shortest route.'],
        ['battery', 'batería', 'My battery is nearly empty.'],
      ],
      phrasalVerbs: [
        ['look up', 'buscar información', 'I looked up the address.'],
        ['get around', 'moverse por un lugar', 'We get around by bus.'],
        ['point out', 'señalar', 'He pointed out the station on the map.'],
        ['turn back', 'regresar por el mismo camino', 'We turned back at the bridge.'],
      ],
      adjectives: [
        ['unfamiliar', 'desconocido', 'The street looked unfamiliar.'],
        ['clear', 'claro', 'The directions were clear.'],
        ['nearby', 'cercano', 'There is a nearby café.'],
        ['lost', 'perdido', 'I got lost near the park.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **look up** the **route** **because** I can follow it one street at a time.',
        'It helps me **get around** an **unfamiliar** area.',
        'I’d check my **battery** before I leave the hotel.',
      ],
      b: [
        'I’d ask in a **nearby** shop.',
        'Someone can **point out** the station and give me **clear** **directions**.',
        'I may need to repeat the last turn, **but** that is good speaking practice.',
      ],
      conditional: [
        '**If** my **battery** is full, I’ll **look up** the **route**.',
        'If I’m **lost** or the map is hard to read, I’ll ask someone at the next **corner**.',
        'I can use both.',
      ],
    },
  },
  {
    slug: 'present-or-day-out',
    title: 'Buy a present or plan a day out?',
    prompt: 'Your friend has a birthday soon. Do you buy a present or invite them to do something together?',
    options: [
      { label: 'Buy a present', description: 'Choose a small item your friend can keep.' },
      { label: 'Plan a day out', description: 'Pay for an activity you can do together.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['present', 'regalo', 'I bought a present for my friend.'],
        ['memory', 'recuerdo', 'The trip is a happy memory.'],
        ['budget', 'presupuesto', 'I have a small budget.'],
        ['ticket', 'entrada o boleto', 'I bought two tickets.'],
      ],
      phrasalVerbs: [
        ['wrap up', 'envolver', 'I wrapped up the present.'],
        ['look for', 'buscar', 'We looked for a place to eat.'],
        ['save up', 'ahorrar', 'I saved up for the tickets.'],
        ['go out', 'salir', 'We went out for her birthday.'],
      ],
      adjectives: [
        ['useful', 'útil', 'The bottle is useful.'],
        ['personal', 'personal', 'It is a personal gift.'],
        ['special', 'especial', 'We planned a special day.'],
        ['affordable', 'asequible', 'The tickets are affordable.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **look for** a **useful** **present** **because** my friend likes things she can use every day.',
        'I can keep it within my **budget** and **wrap it up** myself.',
        'A short note would make it more **personal**.',
      ],
      b: [
        'I’d **save up** for two **tickets**.',
        'My friend and I don’t get to **go out** very often, **so** an **affordable** trip would be **special**.',
        'I’d pick an activity we both enjoy.',
      ],
      conditional: [
        '**If** I know a **useful** **present** my friend wants, I’ll buy it.',
        '**But** if she has a free afternoon, I’d rather **go out** together.',
        'We can make a happy **memory** without spending much.',
      ],
    },
  },
  {
    slug: 'voice-note-or-text',
    title: 'A voice note or a text?',
    prompt: 'You need to change your plans with a friend. Do you send a voice note or write a text?',
    options: [
      { label: 'A voice note', description: 'Use your voice to explain what happened and suggest a time.' },
      { label: 'A text message', description: 'Write the new time and place in a short message.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['message', 'mensaje', 'I got a message at lunch.'],
        ['voice note', 'nota de voz', 'She sent a voice note.'],
        ['detail', 'detalle', 'The time is an important detail.'],
        ['reply', 'respuesta', 'I got a quick reply.'],
      ],
      phrasalVerbs: [
        ['speak up', 'hablar más fuerte', 'Please speak up a little.'],
        ['write down', 'anotar', 'I wrote down the new time.'],
        ['get back to', 'responderle a alguien más tarde', 'I’ll get back to you tonight.'],
        ['listen to', 'escuchar', 'I listened to your note.'],
      ],
      adjectives: [
        ['brief', 'breve', 'I sent a brief message.'],
        ['clear', 'claro', 'Your voice was clear.'],
        ['noisy', 'ruidoso', 'The street is noisy.'],
        ['urgent', 'urgente', 'The change is urgent.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d send a **voice note** **because** the change needs a short explanation.',
        'I’d keep it **brief** and **speak up** so my friend can hear.',
        'Then I’d wait for a **reply**.',
      ],
      b: [
        'I’d **write down** the exact **details** in a **brief** **message**.',
        'My friend might be in a **noisy** place, **so** a text is easier to check.',
        'She can **get back to** me when she has time.',
      ],
      conditional: [
        '**If** the new time is the only **detail**, I’ll send a **brief** text.',
        '**But** for a longer explanation, I’d record a **voice note**.',
        'I’d **write down** the time in a separate message.',
      ],
    },
  },
  {
    slug: 'exercise-class-or-home',
    title: 'A fitness class or exercise at home?',
    prompt: 'You want to move more after work. Do you join a weekly fitness class or do a short exercise video at home?',
    options: [
      { label: 'A weekly class', description: 'Follow a teacher and exercise with a group.' },
      { label: 'A home video', description: 'Choose a short video and do it when you have time.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['instructor', 'instructor o instructora', 'The instructor shows each move.'],
        ['routine', 'rutina', 'I have a short evening routine.'],
        ['mat', 'colchoneta', 'I need a mat for the floor.'],
        ['session', 'sesión', 'The session lasts thirty minutes.'],
      ],
      phrasalVerbs: [
        ['sign up', 'inscribirse', 'I signed up for a class.'],
        ['warm up', 'calentar antes de hacer ejercicio', 'We warmed up for five minutes.'],
        ['keep up', 'seguir el ritmo', 'I couldn’t keep up at first.'],
        ['work out', 'hacer ejercicio', 'I work out on Tuesdays.'],
      ],
      adjectives: [
        ['regular', 'regular', 'We have a regular class.'],
        ['gentle', 'suave', 'The video gives a gentle start.'],
        ['flexible', 'flexible', 'My home routine is flexible.'],
        ['beginner-friendly', 'adecuado para principiantes', 'The session is beginner-friendly.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **sign up** for a **regular** class **because** I find it easy to forget at home.',
        'A **beginner-friendly** **instructor** can show me what to do.',
        'I’d choose a class where I can **keep up**.',
      ],
      b: [
        'I’d **work out** at home.',
        'My **routine** is more **flexible**, **because** I don’t have to travel after work.',
        'I can put down a **mat**, **warm up** and follow a **gentle** video.',
      ],
      conditional: [
        '**If** I often change my working hours, I’d use a **flexible** home **routine**.',
        '**But** if I can keep one evening free, I’d **sign up** for a weekly **session**.',
        'A teacher would help me get started.',
      ],
    },
  },
  {
    slug: 'borrow-or-rent-party-chairs',
    title: 'Borrow chairs or rent them?',
    prompt: 'You are inviting eight people to dinner. Do you borrow chairs from neighbours or rent a set?',
    options: [
      { label: 'Borrow chairs', description: 'Ask two neighbours and return the chairs the next day.' },
      { label: 'Rent a set', description: 'Pay for matching chairs and arrange their return.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['chair', 'silla', 'We need four more chairs.'],
        ['neighbour', 'vecino o vecina', 'Our neighbour offered two chairs.'],
        ['deposit', 'depósito', 'The shop asked for a deposit.'],
        ['delivery', 'entrega', 'Delivery is on Saturday.'],
      ],
      phrasalVerbs: [
        ['borrow from', 'pedir prestado a', 'We borrowed chairs from a neighbour.'],
        ['drop off', 'dejar algo en un lugar', 'They dropped off the chairs.'],
        ['take back', 'devolver', 'I took them back on Sunday.'],
        ['set up', 'montar o preparar', 'We set up the dining room.'],
      ],
      adjectives: [
        ['matching', 'que hace juego', 'The chairs are matching.'],
        ['spare', 'de sobra', 'She has two spare chairs.'],
        ['handy', 'práctico', 'A spare chair is handy.'],
        ['available', 'disponible', 'The set is available on Friday.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **borrow from** a **neighbour** **because** some people have **spare** chairs.',
        'We can **set up** the room together.',
        'I’d ask first when I should **take them back**.',
      ],
      b: [
        'I’d rent a **matching** set.',
        'A **delivery** service can **drop off** all eight at once, **so** I don’t need to make several trips.',
        'I’d check how much the **deposit** is.',
      ],
      conditional: [
        '**If** two neighbours have **spare** **chairs**, I’d borrow them.',
        '**But** if the chairs aren’t **available**, I’d rent a set and ask the shop to **drop it off**.',
        'I need enough seats either way.',
      ],
    },
  },
  {
    slug: 'live-or-recorded-class',
    title: 'A live class or a recorded lesson?',
    prompt: 'You can take an online English course live at a set time or watch recorded lessons. Which do you choose?',
    options: [
      { label: 'A live class', description: 'Meet a teacher online and ask questions.' },
      { label: 'Recorded lessons', description: 'Watch when you are free and repeat difficult parts.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['schedule', 'horario', 'The schedule changes next week.'],
        ['recording', 'grabación', 'I watched the recording twice.'],
        ['question', 'pregunta', 'I asked a question about the verb.'],
        ['feedback', 'retroalimentación', 'The teacher gave me feedback.'],
      ],
      phrasalVerbs: [
        ['log in', 'iniciar sesión', 'I logged in at six.'],
        ['catch up', 'ponerse al día', 'I caught up on Saturday.'],
        ['go back over', 'repasar', 'I went back over the examples.'],
        ['speak up', 'participar o alzar la voz', 'I tried to speak up in class.'],
      ],
      adjectives: [
        ['live', 'en directo', 'The class is live.'],
        ['recorded', 'grabado', 'I chose the recorded course.'],
        ['regular', 'regular', 'We have a regular meeting.'],
        ['flexible', 'flexible', 'The recorded option is flexible.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d choose the **live** class **because** I can ask a **question** and get **feedback**.',
        'I need to **log in** at the same time each Tuesday.',
        'A **regular** class helps me study.',
      ],
      b: [
        'I’d choose the **recorded** course.',
        'My **schedule** changes, **so** I need something **flexible**.',
        'I can watch the **recording** and **go back over** a difficult example the next day.',
      ],
      conditional: [
        '**If** I can keep one evening free, I’d **log in** for a **live** class.',
        '**But** during a busy week, I’d **catch up** with the **recording**.',
        'I would still write down a **question** to ask later.',
      ],
    },
  },
  {
    slug: 'flashcards-or-own-sentences',
    title: 'Flashcards or your own sentences?',
    prompt: 'You have ten minutes to practise new English words. Do you use flashcards or write your own sentences?',
    options: [
      { label: 'Use flashcards', description: 'Look at a word, say its meaning and check the other side.' },
      { label: 'Write your own sentences', description: 'Use the words in short examples about your day.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['flashcard', 'tarjeta de estudio', 'I made a flashcard for each word.'],
        ['meaning', 'significado', 'I know the meaning of this word.'],
        ['sentence', 'oración', 'Read your sentence aloud.'],
        ['example', 'ejemplo', 'Give an example about your family.'],
      ],
      phrasalVerbs: [
        ['look up', 'buscar en un diccionario', 'I looked up the word.'],
        ['write down', 'anotar', 'I wrote down an example.'],
        ['read out', 'leer en voz alta', 'We read out our sentences.'],
        ['go over', 'repasar', 'I went over my cards before class.'],
      ],
      adjectives: [
        ['familiar', 'conocido', 'That word sounds familiar.'],
        ['useful', 'útil', 'This example is useful.'],
        ['short', 'corto', 'Write a short sentence.'],
        ['personal', 'personal', 'A personal example is easier to remember.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **go over** the **flashcards** **because** I can check a word very quickly.',
        'If a **meaning** is not **familiar**, I can **look it up**.',
        'I’d practise the hardest words one more time.',
      ],
      b: [
        'I’d **write down** a **short** **sentence** for each word.',
        'I choose this **because** a **personal** **example** helps me remember how the word works.',
        'I can **read out** my sentence and hear it in a real phrase.',
      ],
      conditional: [
        '**If** I don’t know the **meaning**, I’d start with a **flashcard**.',
        'Once it feels **familiar**, I’d **write down** a **personal** **example**.',
        '**But** I would only use a few words each time.',
      ],
    },
  },
  {
    slug: 'exchange-or-refund',
    title: 'Exchange the shoes or ask for a refund?',
    prompt: 'You bought shoes online and they are too small. Do you ask for a larger pair or return them and get your money back?',
    options: [
      { label: 'Ask for an exchange', description: 'Send the small pair back and wait for a larger one.' },
      { label: 'Ask for a refund', description: 'Return the shoes and look for another pair.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['receipt', 'recibo', 'Keep the receipt in the box.'],
        ['refund', 'reembolso', 'I got a full refund.'],
        ['size', 'talla', 'This size is too small.'],
        ['parcel', 'paquete', 'The parcel arrived yesterday.'],
      ],
      phrasalVerbs: [
        ['send back', 'devolver por correo', 'I sent back the shoes.'],
        ['try on', 'probarse', 'She tried on both pairs.'],
        ['fill in', 'rellenar', 'Fill in the return form.'],
        ['look for', 'buscar', 'I looked for a larger size.'],
      ],
      adjectives: [
        ['tight', 'apretado', 'The shoes are tight.'],
        ['comfortable', 'cómodo', 'The other pair is comfortable.'],
        ['available', 'disponible', 'The larger size is available.'],
        ['unused', 'sin usar', 'The shoes are unused.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **send back** the pair and ask for another **size**.',
        'The shoes look good **but** feel **tight**, so an exchange may be enough.',
        'I’d **fill in** the form if the larger pair is **available**.',
      ],
      b: [
        'I’d ask for a **refund**.',
        'I need shoes this week, **so** I’d **look for** a **comfortable** pair in a shop.',
        'I’d keep the **receipt** and **send back** the unused pair.',
      ],
      conditional: [
        '**If** the right **size** is **available** and I can wait, I’d exchange the shoes.',
        '**But** if I’m not sure about the fit, I’d ask for a **refund**.',
        'Then I can **try on** several pairs.',
      ],
    },
  },
  {
    slug: 'volunteer-park-or-kitchen',
    title: 'Help at a park or a community kitchen?',
    prompt: 'You have two free hours on Saturday. Do you help clean a park or help serve lunch at a community kitchen?',
    options: [
      { label: 'A park clean-up', description: 'Walk with a group and collect litter in the park.' },
      { label: 'A community kitchen', description: 'Set tables and help serve lunch indoors.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['litter', 'basura tirada', 'There is litter near the path.'],
        ['glove', 'guante', 'I put on a pair of gloves.'],
        ['meal', 'comida', 'The kitchen serves a hot meal.'],
        ['shift', 'turno', 'I can work the early shift.'],
      ],
      phrasalVerbs: [
        ['pick up', 'recoger', 'We picked up litter.'],
        ['help out', 'ayudar', 'I helped out at lunch.'],
        ['set up', 'preparar', 'We set up the tables.'],
        ['wash up', 'lavar los platos', 'We washed up after lunch.'],
      ],
      adjectives: [
        ['outdoor', 'al aire libre', 'I prefer outdoor work.'],
        ['indoor', 'bajo techo', 'It is an indoor activity.'],
        ['busy', 'ocupado', 'The kitchen is busy at noon.'],
        ['helpful', 'útil o servicial', 'An extra volunteer is helpful.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d choose the park **because** I like **outdoor** work.',
        'I can wear **gloves** and **pick up** **litter** along the path.',
        'It would feel good to see the park look cleaner afterwards.',
      ],
      b: [
        'I’d **help out** at the kitchen.',
        'It gets **busy** at lunchtime, **so** I could **set up** tables before the first **meal**.',
        'I’d also **wash up** before I finish my **shift**.',
      ],
      conditional: [
        '**If** the weather is good, I’ll **pick up** **litter** at the park.',
        '**But** on a rainy day, I’d choose **indoor** work and **help out** with the **meal**.',
        'I can ask where an extra person is most **helpful**.',
      ],
    },
  },
  {
    slug: 'swap-shift-or-day-off',
    title: 'Swap a shift or ask for a day off?',
    prompt: 'An important family event is on a day you usually work. Do you swap shifts with a colleague or ask your manager for a day off?',
    options: [
      { label: 'Swap shifts', description: 'Work on another day and ask a colleague to cover your usual shift.' },
      { label: 'Ask for a day off', description: 'Request the day officially and wait for your manager’s answer.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['colleague', 'compañero de trabajo', 'My colleague works on Mondays.'],
        ['shift', 'turno', 'My shift starts at nine.'],
        ['request', 'solicitud', 'I sent my request in writing.'],
        ['notice', 'aviso previo', 'Please give a week’s notice.'],
      ],
      phrasalVerbs: [
        ['swap with', 'intercambiar con', 'I swapped shifts with Ana.'],
        ['cover for', 'cubrir a alguien', 'He covered for me on Saturday.'],
        ['ask for', 'pedir', 'I asked for a day off.'],
        ['get back to', 'responder más tarde', 'My manager got back to me today.'],
      ],
      adjectives: [
        ['available', 'disponible', 'My colleague is available on Friday.'],
        ['fair', 'justo', 'That swap seems fair.'],
        ['short', 'corto', 'I gave very short notice.'],
        ['official', 'oficial', 'I sent an official request.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **swap with** an **available** **colleague** **because** the change would be easy for both of us.',
        'I’d offer to **cover for** her next week.',
        'I can keep my hours and make it a **fair** swap.',
      ],
      b: [
        'I’d **ask for** the day off.',
        'An **official** **request** is clear and lets the manager plan the **shifts**.',
        'It may take a day to **get back to** me, **but** I can ask early.',
      ],
      conditional: [
        '**If** I have enough **notice**, I’d make an **official** **request**.',
        '**But** when there is little time and someone is **available**, I’d try to **swap with** a colleague.',
        'I’d tell the manager after we agree.',
      ],
    },
  },
  {
    slug: 'library-e-book-or-print',
    title: 'A library e-book or a printed copy?',
    prompt: 'Your library has both versions of a book. Do you borrow the e-book now or wait for a printed copy?',
    options: [
      { label: 'An e-book', description: 'Start reading today on a phone or tablet.' },
      { label: 'A printed book', description: 'Reserve the book and collect it when someone returns it.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['copy', 'ejemplar', 'The library has one printed copy.'],
        ['screen', 'pantalla', 'The screen is bright at night.'],
        ['loan', 'préstamo', 'The loan ends next Friday.'],
        ['waiting list', 'lista de espera', 'I joined the waiting list.'],
      ],
      phrasalVerbs: [
        ['download to', 'descargar a un dispositivo', 'I downloaded it to my tablet.'],
        ['pick up', 'recoger', 'I picked up the book after work.'],
        ['give back', 'devolver', 'Can you give back the book on Monday?'],
        ['zoom in', 'ampliar la imagen o el texto', 'I zoomed in to read the page.'],
      ],
      adjectives: [
        ['digital', 'digital', 'The digital copy is ready.'],
        ['printed', 'impreso', 'I prefer printed pages.'],
        ['immediate', 'inmediato', 'The e-book gives immediate access.'],
        ['available', 'disponible', 'The printed book is not available yet.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d take the **digital** **copy** **because** I want to begin tonight.',
        'I can **download it to** my phone and **zoom in** if the text is small.',
        'I don’t need to join the **waiting list**.',
      ],
      b: [
        'I’d wait for the **printed** **copy**.',
        'I can read longer without a **screen**, **so** it’s worth waiting to **pick it up** near work.',
        'I’d remember the end of the **loan** so I can **give it back** on time.',
      ],
      conditional: [
        '**If** I need **immediate** access for class, I’ll choose the **digital** **copy**.',
        '**But** for a book I’m reading for fun, I can wait and **pick up** the printed one.',
        'Both are free.',
      ],
    },
  },
  {
    slug: 'chores-daily-or-weekend',
    title: 'Do a few chores daily or all on Saturday?',
    prompt: 'You share a flat with a friend. Do you do a few chores every evening or clean the flat together on Saturday?',
    options: [
      { label: 'A little each day', description: 'Spend ten minutes on one job after dinner.' },
      { label: 'Clean on Saturday', description: 'Work together for an hour at the weekend.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['chore', 'tarea doméstica', 'Washing dishes is my chore.'],
        ['mess', 'desorden', 'There is a mess in the kitchen.'],
        ['timetable', 'horario', 'We made a cleaning timetable.'],
        ['flatmate', 'compañero de apartamento', 'My flatmate cleans the bathroom.'],
      ],
      phrasalVerbs: [
        ['tidy up', 'ordenar', 'We tidied up after dinner.'],
        ['wipe down', 'limpiar con un paño', 'I wiped down the table.'],
        ['take out', 'sacar', 'I took out the rubbish.'],
        ['split up', 'dividir en partes', 'We split up the jobs.'],
      ],
      adjectives: [
        ['tidy', 'ordenado', 'The kitchen is tidy.'],
        ['shared', 'compartido', 'It is a shared kitchen.'],
        ['messy', 'desordenado', 'The hall looks messy.'],
        ['manageable', 'manejable', 'Ten minutes feels manageable.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **tidy up** a little each evening **because** ten minutes is **manageable**.',
        'One small **chore** keeps the **shared** kitchen clean.',
        'My flatmate can **wipe down** the table while I **take out** the rubbish.',
      ],
      b: [
        'I’d clean on Saturday with my **flatmate**.',
        'We can **split up** the **chores** and finish them fast.',
        'The flat may look **messy** on Friday, **but** I don’t have to clean after work.',
      ],
      conditional: [
        '**If** the table gets **messy** quickly, I’d **wipe it down** each day.',
        '**But** for bigger **chores**, it makes sense to **split them up** on Saturday.',
        'We could put both on a **timetable**.',
      ],
    },
  },
  {
    slug: 'photos-or-travel-journal',
    title: 'Take photos or keep a travel journal?',
    prompt: 'You want to remember a weekend away. Do you take a few photos or write a short travel journal?',
    options: [
      { label: 'Take photos', description: 'Keep one picture from each place you visit.' },
      { label: 'Write a journal', description: 'Write a few lines about what you did and how it felt.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['journal', 'diario', 'I write in my journal at night.'],
        ['photo', 'foto', 'This photo is from our trip.'],
        ['memory', 'recuerdo', 'The market is a happy memory.'],
        ['moment', 'momento', 'I wanted to remember that moment.'],
      ],
      phrasalVerbs: [
        ['look back on', 'recordar algo del pasado', 'I look back on that trip with a smile.'],
        ['write down', 'anotar', 'I wrote down the café’s name.'],
        ['pick out', 'escoger', 'I picked out my favourite photo.'],
        ['put together', 'reunir o armar', 'I put together a small photo album.'],
      ],
      adjectives: [
        ['colourful', 'colorido', 'The market was colourful.'],
        ['ordinary', 'común o corriente', 'It was an ordinary street.'],
        ['memorable', 'inolvidable', 'We had a memorable lunch.'],
        ['personal', 'personal', 'A diary feels personal.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d take a **photo** **because** I want to remember each **colourful** place.',
        'I can **pick out** one picture from the market and **put together** a small album.',
        'It doesn’t take much time during the trip.',
      ],
      b: [
        'I’d keep a **personal** **journal**.',
        'I can **write down** one **memorable** **moment** and explain why it mattered.',
        'A photo is quick, **but** it doesn’t tell me what someone said.',
      ],
      conditional: [
        '**If** I want to remember a **colourful** place, I’d take a **photo**.',
        'For a **personal** **memory**, I’d **write down** something before bed.',
        'Both help me **look back on** the trip.',
      ],
    },
  },
  {
    slug: 'plant-or-small-herb-garden',
    title: 'One houseplant or a few herbs?',
    prompt: 'You have a sunny window and space for two small pots. Do you get one houseplant or grow a few herbs for cooking?',
    options: [
      { label: 'One houseplant', description: 'Choose a plant that can live inside all year.' },
      { label: 'Grow herbs', description: 'Grow basil and mint in separate pots.' },
    ],
    conditionalPrompt: 'Say when each choice works better.',
    vocabulary: {
      nouns: [
        ['pot', 'maceta', 'The pot goes by the window.'],
        ['herb', 'hierba aromática', 'Mint is an easy herb to use.'],
        ['soil', 'tierra', 'Put more soil in the pot.'],
        ['leaf', 'hoja', 'I picked a mint leaf.'],
      ],
      phrasalVerbs: [
        ['come up', 'brotar', 'The basil came up last week.'],
        ['look after', 'cuidar', 'I look after the plants on Sundays.'],
        ['cut off', 'cortar y separar', 'I cut off one dry leaf.'],
        ['put out', 'poner afuera o sacar', 'I put the plant out in the sun.'],
      ],
      adjectives: [
        ['sunny', 'soleado', 'The small window is sunny.'],
        ['dry', 'seco', 'The soil feels dry.'],
        ['fresh', 'fresco', 'I put fresh mint in my tea.'],
        ['useful', 'útil', 'Basil is useful for cooking.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d choose a houseplant **because** it is easy to **look after**.',
        'There is a **sunny** place for one **pot**.',
        'I’d check whether the **soil** is **dry** before I water it.',
      ],
      b: [
        'I’d grow **herbs** **because** **fresh** mint is **useful** in my kitchen.',
        'I can **cut off** a **leaf** when I need one.',
        'Each herb would have its own **pot**.',
      ],
      conditional: [
        '**If** I cook often, I’d **look after** two **herb** pots.',
        '**But** if I only want something green in the window, I’d take one plant.',
        'Either choice needs a **sunny** spot and a little room.',
      ],
    },
  },
]
