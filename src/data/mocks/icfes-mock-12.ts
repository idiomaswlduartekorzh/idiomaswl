import type { MockExam } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 · Componente de Inglés — Mock 12
// Nivel: A2–B1  ·  45 preguntas  ·  60 minutos
// Tema: Animales y naturaleza
// ─────────────────────────────────────────────────────────────────────────────
const mock: MockExam = {
  id: 'mock-12',
  examSlug: 'icfes',
  title: 'Mock 12 · Animales y naturaleza',
  subtitle: 'Saber 11 · Componente de Inglés · 45 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [

    // ── PARTE 1 ── Avisos e instrucciones (preguntas 1–5) ────────────────────
    {
      part: 1,
      title: 'Parte 1 — Avisos e instrucciones',
      sectionStyle: 'notices-grid',
      exampleStimulus: 'BUS STOP\nPlease stand behind the line.\nThank you.',
      exampleText: 'Where could you see this sign?',
      exampleAnswer: 'A',
      instructions:
        'The following notices give information about different places. Read each notice carefully and answer questions 1 to 5.',
      questions: [
        {
          type: 'mcq',
          id: 'p1q1',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'PLEASE DO NOT FEED THE ANIMALS\nFeeding is dangerous for their health\nand may cause serious illness.\nThank you for your cooperation.',
          text: 'Where would you most likely see this notice?',
          options: [
            'In a supermarket near the meat section',
            'At a zoo or wildlife park',
            'In a veterinary clinic waiting room',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'STAY ON THE MARKED PATH\nAt all times.\nLeaving the trail may damage\ndelicate habitats and put you at risk.',
          text: 'What is the purpose of this notice?',
          options: [
            'To tell visitors where to park their vehicles',
            'To warn walkers to remain on the designated trail',
            'To explain that the trail is temporarily closed',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'NO FLASH PHOTOGRAPHY\nNear the fish tanks.\nFlash can harm the animals\nand disturb their natural behaviour.',
          text: 'What does this notice ask visitors to do?',
          options: [
            'Turn off their mobile phones completely',
            'Avoid taking photographs near the fish tanks',
            'Not use flash when photographing the fish tanks',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'ALL ANIMALS SOLD FROM THIS SHOP\nHave been vaccinated and health-checked\nby a certified veterinarian.\nCertificates available on request.',
          text: 'What information does this notice give customers?',
          options: [
            'Animals from this shop have received health treatment before being sold',
            'Customers must bring their own veterinarian to check the animals',
            'The shop only sells animals that were born on the premises',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'CAMPFIRES STRICTLY PROHIBITED\nIn this area.\nViolators will be fined.\nHelp us protect this forest.',
          text: 'Where would you most likely see this sign?',
          options: [
            'In a public swimming pool',
            'At a national park or forest reserve',
            'In a school gymnasium',
          ],
          answer: 1,
        },
      ],
    },

    // ── PARTE 2 ── Vocabulario: cuadrícula de emparejamiento (preguntas 6–10) ─
    {
      part: 2,
      title: 'Parte 2 — Vocabulario',
      sectionStyle: 'matching-grid',
      topic: 'Animals',
      exampleText: 'The natural environment where a plant or animal normally lives and grows.',
      exampleAnswer: 'habitat',
      instructions:
        'Read descriptions 6 to 10. Which word from column (A – G) matches each description? Mark the correct letter. There are TWO extra words you will not need.',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'A light, flat structure that covers the body of a bird and helps it fly.',
          options: ['beak', 'claw', 'feather', 'fin', 'fur', 'scales', 'tail'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'A flat, wing-shaped part attached to a fish\'s body that it uses to swim and steer.',
          options: ['beak', 'claw', 'feather', 'fin', 'fur', 'scales', 'tail'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'The hard, pointed part at the front of a bird\'s head, used for eating and picking up food.',
          options: ['beak', 'claw', 'feather', 'fin', 'fur', 'scales', 'tail'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'The thick, soft hair that covers the body of many mammals, keeping them warm.',
          options: ['beak', 'claw', 'feather', 'fin', 'fur', 'scales', 'tail'],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'A sharp, curved nail on the foot of a bird or other animal, used for gripping or hunting.',
          options: ['beak', 'claw', 'feather', 'fin', 'fur', 'scales', 'tail'],
          answer: 1,
        },
      ],
    },

    // ── PARTE 3 ── Diálogos (preguntas 11–15) ────────────────────────────────
    {
      part: 3,
      title: 'Parte 3 — Diálogos',
      sectionStyle: 'dialogs-grid',
      exampleStimulus: 'Have you ever seen a wild condor?',
      exampleOptions: ['Yes, it was amazing!', 'I prefer dogs.', 'Birds cannot fly.'],
      exampleAnswer: 'A',
      instructions:
        'Complete las cinco conversaciones. En las preguntas 11 – 15, marque A, B ó C en su hoja de respuestas.',
      questions: [
        {
          type: 'mcq',
          id: 'p3q1',
          part: 3,
          stimulus: 'I found a small bird with an injured wing.',
          text: '',
          options: [
            'Birds can always heal themselves.',
            'Leave it exactly where it is.',
            'Take it to a vet or animal shelter.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q2',
          part: 3,
          stimulus: 'My dog escaped from the garden this morning.',
          text: '',
          options: [
            'Have you checked the neighbourhood?',
            'Dogs always escape eventually.',
            'You should get a cat instead.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q3',
          part: 3,
          stimulus: 'There are monkeys living near our school!',
          text: '',
          options: [
            'Let\'s go and take photos with them.',
            'We must not feed or disturb them.',
            'Monkeys are always very dangerous.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q4',
          part: 3,
          stimulus: 'The coral reef near the island is dying.',
          text: '',
          options: [
            'Reefs always grow back quickly.',
            'Reefs are not really important.',
            'Human activity is causing serious damage.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q5',
          part: 3,
          stimulus: 'I want to adopt a dog from the shelter.',
          text: '',
          options: [
            'That is a wonderful thing to do.',
            'Shelter animals are always difficult.',
            'You should buy one from a shop instead.',
          ],
          answer: 0,
        },
      ],
    },

    // ── PARTE 4 ── Completar el texto (preguntas 16–23) ──────────────────────
    {
      part: 4,
      title: 'Parte 4 — Completar el texto',
      sectionStyle: 'cloze-text',
      instructions:
        'Read the text below. Choose the word (A, B, C, or D) that best fits each blank (questions 16 to 23).',
      passage:
        'Colombia is one of the most biodiverse countries on earth. It is home to thousands of (16) ___ of mammals, birds, reptiles, and insects found nowhere else in the world. The country also has an extraordinary variety of (17) ___, from tropical orchids to giant Andean palms. Much of this natural wealth is found in the great (18) ___ that cover vast areas of the Amazon basin and Pacific coast. Many of these (19) ___ are listed as endangered and are carefully (20) ___ by national and international conservation programmes. Colombia has one of the largest numbers of bird species in the (21) ___. Protecting this biodiversity requires not only national laws but also a change in how people treat their (22) ___. Clean (23) ___ are equally essential, as they support fish populations and provide fresh water for millions of Colombians.',
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (16).',
          options: ['colours', 'species', 'groups', 'families'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (17).',
          options: ['animals', 'minerals', 'plants', 'soils'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (18).',
          options: ['deserts', 'forests', 'mountains', 'beaches'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (19).',
          options: ['tourists', 'rivers', 'species', 'parks'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (20).',
          options: ['ignored', 'protected', 'counted', 'removed'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (21).',
          options: ['country', 'region', 'continent', 'world'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (22).',
          options: ['money', 'environment', 'culture', 'economy'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (23).',
          options: ['roads', 'cities', 'rivers', 'fields'],
          answer: 2,
        },
      ],
    },

    // ── PARTE 5 ── Comprensión: texto corto (preguntas 24–30) ────────────────
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      sectionStyle: 'reading',
      passageTitle: 'Endangered Species in the Colombian Amazon',
      instructions:
        'Read the text and answer questions 24 to 30. Choose the best option (A, B, C, or D).',
      passage:
        'ENDANGERED SPECIES IN THE COLOMBIAN AMAZON\n\nThe Colombian Amazon is one of the richest ecosystems on the planet. It contains an enormous variety of plants, insects, fish, birds, and mammals. However, many of the species that live there are now endangered, meaning they are at serious risk of disappearing forever.\n\nOne of the most iconic endangered animals in the region is the pink river dolphin, known in Colombia as the "tonina". These animals live in the rivers of the Amazon basin and are threatened mainly by pollution and accidental capture in fishing nets. Local communities have begun working with conservation groups to protect them.\n\nThe giant otter is another species in danger. These remarkable animals, which can grow to almost two metres in length, were once hunted for their fur. Although hunting is now illegal, they continue to face threats from habitat destruction and water contamination.\n\nDeforestation is the biggest overall threat to Amazon biodiversity. When trees are cut down to create farmland, the animals that depend on the forest lose their homes. Scientists estimate that the Colombian Amazon loses thousands of hectares of forest every year.\n\nSeveral national parks and protected areas exist to safeguard these ecosystems. However, experts argue that more resources are needed, and that local communities must be actively involved in conservation efforts if these species are to survive.',
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'What does "endangered" mean according to the text?',
          options: [
            'Very common and found in large numbers',
            'At serious risk of disappearing permanently',
            'Protected by international law',
            'Recently discovered by scientists',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: 'What are the main threats to the pink river dolphin?',
          options: [
            'Hunting for food and sport fishing',
            'Climate change and rising river temperatures',
            'Pollution and accidental capture in fishing nets',
            'Competition from other large river animals',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'Why was the giant otter historically threatened?',
          options: [
            'It was used in traditional medicine.',
            'It was hunted for its fur.',
            'It competed with farmers for fish.',
            'It was captured for zoos around the world.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: 'According to the text, why is deforestation so harmful to Amazon species?',
          options: [
            'It causes rivers to dry up and kills fish populations.',
            'It introduces diseases that affect both plants and animals.',
            'Animals that depend on the forest lose their homes when trees are removed.',
            'It makes the climate colder, which many tropical species cannot survive.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'What does the text say about national parks in the Amazon?',
          options: [
            'They are completely effective at stopping deforestation.',
            'They exist but more resources and community involvement are needed.',
            'They are managed only by international conservation organisations.',
            'They were recently closed due to lack of funding.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'How large can a giant otter grow, according to the text?',
          options: [
            'Up to one metre in length',
            'Up to one and a half metres in length',
            'Almost two metres in length',
            'More than three metres in length',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: 'Which statement is NOT supported by the text?',
          options: [
            'Local communities are working with conservationists to protect river dolphins.',
            'Hunting giant otters is currently illegal.',
            'The Colombian Amazon has very few animal species.',
            'Deforestation is caused partly by the creation of new farmland.',
          ],
          answer: 2,
        },
      ],
    },

    // ── PARTE 6 ── Comprensión: texto largo (preguntas 31–35) ────────────────
    {
      part: 6,
      title: 'Parte 6 — Comprensión de lectura: texto largo',
      sectionStyle: 'reading',
      passageTitle: 'The Benefits and Responsibilities of Keeping Pets',
      instructions:
        'Read the text and answer questions 31 to 35. Some questions require you to infer information from the text. Choose the best option (A, B, C, or D).',
      passage:
        'THE BENEFITS AND RESPONSIBILITIES OF KEEPING PETS\n\nMillions of families around the world share their homes with animals. Dogs and cats are by far the most popular pets, but fish, birds, rabbits, and even reptiles are also kept in homes across Colombia and the rest of Latin America. For many people, pets are much more than animals — they are beloved members of the family.\n\nThe benefits of having a pet are well-documented. Studies have found that pet owners often have lower blood pressure and reduced levels of stress. The routine of caring for an animal — feeding it, walking it, or simply spending time with it — provides structure and a sense of purpose. For elderly people living alone, a pet can be a vital source of companionship.\n\nChildren who grow up with pets also appear to benefit in several ways. Research suggests they develop greater empathy and learn important lessons about responsibility. Looking after a living creature teaches children that their actions have real consequences for another being that depends on them.\n\nHowever, keeping a pet is a serious commitment. Many people underestimate the time, money, and attention required. Dogs need daily exercise, regular veterinary check-ups, and constant social interaction. Leaving a dog alone for long periods can cause it significant distress. Cats, while more independent, still require care, nutrition, and a safe environment.\n\nSadly, many pets are abandoned each year because their owners did not fully consider these responsibilities before acquiring them. Animal shelters in Colombian cities are frequently overcrowded with dogs and cats that have been given up by families who could no longer care for them.\n\nThe decision to get a pet should never be made impulsively. It requires honest thought about your lifestyle, living space, and long-term commitment. When that commitment is genuine, however, the relationship between a person and their pet can be one of the most rewarding in life.',
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: 'According to paragraph 2, what health benefit do pet owners often experience?',
          options: [
            'They recover more quickly from illness than people without pets.',
            'They tend to have lower blood pressure and less stress.',
            'They sleep better and have more energy during the day.',
            'They are less likely to develop serious diseases.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'What lesson do children learn from keeping a pet, according to paragraph 3?',
          options: [
            'How to train animals to perform tricks',
            'The importance of financial planning',
            'Responsibility and empathy towards other living beings',
            'How to communicate more effectively with adults',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: 'What problem can occur if a dog is left alone for long periods?',
          options: [
            'The dog may become ill and need expensive veterinary treatment.',
            'The dog may cause damage to the house.',
            'The dog may experience significant distress.',
            'The dog may stop eating and lose weight.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: 'Why are animal shelters in Colombian cities frequently overcrowded?',
          options: [
            'The government has cut funding to animal protection organisations.',
            'Many pets are abandoned by owners who did not prepare for the responsibility.',
            'Too many animals are born each year without owners to care for them.',
            'Shelters are too small and were not designed for the number of animals in cities.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: 'What can be inferred from the final paragraph about the decision to keep a pet?',
          options: [
            'Only people who live in large houses should consider having a pet.',
            'The best pets for most families are dogs, not cats.',
            'A well-considered decision to keep a pet can lead to a very rewarding relationship.',
            'People who adopt pets from shelters are always better owners than those who buy them.',
          ],
          answer: 2,
        },
      ],
    },

    // ── PARTE 7 ── Texto de opinión/argumento (preguntas 36–45) ──────────────
    {
      part: 7,
      title: 'Parte 7 — Texto de opinión',
      sectionStyle: 'reading',
      passageTitle: 'Should Animals Be Kept in Zoos?',
      instructions:
        'Read the text and answer questions 36 to 45. Choose the best option (A, B, C, or D).',
      passage:
        'SHOULD ANIMALS BE KEPT IN ZOOS?\n\nThe modern zoo is a place of contradictions. On one hand, it is a centre of education, research, and conservation. On the other, it is a place where wild animals live in enclosures, separated from their natural habitats and the freedom they would experience in the wild. The question of whether zoos are ethical continues to divide opinion.\n\nDefenders of zoos point to their undeniable contribution to wildlife conservation. Many species that would otherwise have become extinct have been saved through captive breeding programmes. The Arabian oryx, the California condor, and the black-footed ferret are among the animals that exist today partly because of zoo-based conservation efforts. Modern zoos also fund field conservation projects and scientific research that benefits wild populations.\n\nFurthermore, zoos play a significant educational role. For millions of children in cities, a zoo visit may be the only opportunity to see a live elephant, rhinoceros, or penguin. Experiencing these animals in person can inspire a lifelong love of nature and a commitment to environmental protection. Zoo education programmes teach visitors about ecosystems, biodiversity, and the threats that species face.\n\nCritics, however, argue that keeping animals in captivity is fundamentally cruel, regardless of the quality of the enclosure. Wild animals are adapted to roam large territories, form complex social groups, and engage in natural behaviours such as hunting, migrating, and exploring. Even the most spacious zoo enclosure cannot replicate these conditions. Animals in captivity often show signs of psychological stress, including repetitive movements and reduced activity.\n\nOpponents also question whether zoo-based conservation is the most effective use of resources. The money spent maintaining a single large zoo could, they argue, fund the protection of vast areas of natural habitat — a far more effective long-term solution for biodiversity.\n\nPerhaps the most honest assessment is that zoos represent an imperfect but sometimes necessary response to a conservation crisis largely created by human activity. The goal should not be to accept zoos permanently, but to work towards a world where wild animals can thrive in their natural environments — and where zoos become unnecessary.',
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What is the main argument of this text?',
          options: [
            'Zoos are completely harmful and should be shut down immediately.',
            'Zoos are entirely positive and should be expanded worldwide.',
            'There are strong arguments both for and against keeping animals in zoos.',
            'Wild animals are happier in zoos than in their natural environments.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'Which animals are mentioned as examples of species helped by zoo conservation?',
          options: [
            'The giant panda, the snow leopard, and the mountain gorilla',
            'The Arabian oryx, the California condor, and the black-footed ferret',
            'The African elephant, the blue whale, and the Bengal tiger',
            'The cheetah, the polar bear, and the Amur leopard',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: 'According to paragraph 3, what educational benefit do zoos provide?',
          options: [
            'They teach children how to care for animals at home.',
            'They give urban children a chance to see live wild animals and learn about ecosystems.',
            'They train future zoologists and veterinarians.',
            'They show visitors how to reduce their carbon footprint.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'What does the word "captivity" mean as used in paragraph 4?',
          options: [
            'A natural environment where animals live freely',
            'The condition of being kept in an enclosed space and not living freely',
            'A scientific study of animal behaviour',
            'A form of exercise designed for zoo animals',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: 'What evidence does the text give of psychological stress in zoo animals?',
          options: [
            'They refuse to eat the food provided by zookeepers.',
            'They try to escape from their enclosures regularly.',
            'They show repetitive movements and reduced activity.',
            'They become aggressive towards visitors and keepers.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: 'What alternative do critics suggest for the money spent on zoos?',
          options: [
            'Building larger and more modern zoo enclosures',
            'Funding school education programmes about the environment',
            'Protecting large areas of natural habitat for wild animals',
            'Creating more wildlife documentaries for television',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: 'The word "replicate" in paragraph 4 most likely means:',
          options: [
            'completely destroy something',
            'accurately reproduce or copy something',
            'gradually improve over time',
            'measure or calculate precisely',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: 'What does the author say about "captive breeding programmes" in paragraph 2?',
          options: [
            'They are too expensive and rarely produce successful results.',
            'They have helped prevent the extinction of several animal species.',
            'They should be replaced entirely by habitat protection.',
            'They only work for small animals, not large mammals.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: 'What does the author mean by calling zoos "a place of contradictions" in the first paragraph?',
          options: [
            'Zoos are poorly managed and often break their own rules.',
            'Zoos do both good and harmful things at the same time.',
            'Zoos claim to protect animals but actually sell them for profit.',
            'Zoos are popular with tourists but unpopular with scientists.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: "Which statement BEST summarises the author's conclusion?",
          options: [
            'Zoos should be banned immediately because they cause suffering to animals.',
            'Zoos are perfect institutions and should be supported without question.',
            'Zoos are an imperfect but sometimes necessary solution, and the long-term goal should be wild animals thriving in natural habitats.',
            'The debate about zoos has no clear answer and will never be resolved.',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
