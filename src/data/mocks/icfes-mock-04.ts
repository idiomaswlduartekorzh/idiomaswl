import type { MockExam } from './types';

const mock: MockExam = {
  id: 'mock-04',
  examSlug: 'icfes',
  title: 'Mock 4 · Salud y ambiente',
  subtitle: 'Saber 11 · Componente de Inglés · 55 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [
    {
      part: 1,
      title: 'Parte 1 — Vocabulario: relacionar palabras',
      instructions: 'Match each word with its correct description.',
      questions: [
        {
          type: 'mcq',
          id: 'p1q1',
          part: 1,
          text: 'The condition of being free from illness or injury.',
          options: ['Health', 'Pollution', 'Climate', 'Symptom'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          text: 'Harmful substances released into the air, water, or soil.',
          options: ['Oxygen', 'Pollution', 'Rainfall', 'Habitat'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          text: 'A person trained to treat sick or injured people.',
          options: ['Architect', 'Engineer', 'Physician', 'Journalist'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          text: 'To keep something safe from harm or destruction.',
          options: ['Damage', 'Remove', 'Ignore', 'Protect'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          text: 'A natural area where wild animals and plants live.',
          options: ['Factory', 'Warehouse', 'Habitat', 'Landfill'],
          answer: 2,
        },
      ],
    },
    {
      part: 2,
      title: 'Parte 2 — Diálogos',
      instructions: 'Read each dialogue and choose the best response to complete it.',
      questions: [
        {
          type: 'dialog',
          id: 'p2q1',
          part: 2,
          stimulus: 'Patient: "Doctor, I have had a sore throat and fever for two days."\nDoctor: _______',
          text: 'What is the most appropriate response from the doctor?',
          options: [
            '"Let me examine you and check your temperature."',
            '"You should exercise more regularly."',
            '"The pharmacy is closed today."',
            '"You need to eat more vegetables."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q2',
          part: 2,
          stimulus: 'Friend A: "I heard the river near the factory is very polluted now."\nFriend B: _______',
          text: 'What is the most natural response from Friend B?',
          options: [
            '"The weather has been strange lately."',
            '"I prefer swimming in pools."',
            '"Factories are very important for the economy."',
            '"Yes, fish cannot survive there anymore."',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q3',
          part: 2,
          stimulus: 'Nurse: "Have you taken your medication today?"\nPatient: "No, I forgot this morning."\nNurse: _______',
          text: 'What does the nurse say?',
          options: [
            '"It is okay to skip it once."',
            '"Please take it now and try not to miss it again."',
            '"You should change your doctor."',
            '"The hospital cafeteria is open."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q4',
          part: 2,
          stimulus: 'Student: "What can I do to help protect the environment?"\nTeacher: _______',
          text: 'What does the teacher say?',
          options: [
            '"The environment is a complex topic."',
            '"Start by reducing waste, reusing items, and recycling."',
            '"You should focus on your studies first."',
            '"Climate change is a government problem."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q5',
          part: 2,
          stimulus: 'Receptionist: "Do you have an appointment with the doctor?"\nVisitor: "No, but I am feeling very unwell."\nReceptionist: _______',
          text: 'What does the receptionist say?',
          options: [
            '"You must come back tomorrow."',
            '"You need to call first next time."',
            '"The doctor is on vacation."',
            '"Please sit down. I will check if the doctor can see you soon."',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q6',
          part: 2,
          stimulus: 'Journalist: "Why did your organization start planting trees in the city?"\nActivist: _______',
          text: 'What does the activist say?',
          options: [
            '"We wanted to improve air quality and give people green spaces."',
            '"Trees are very beautiful."',
            '"The government told us to."',
            '"We have a lot of free time on weekends."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q7',
          part: 2,
          stimulus: 'Person A: "I am going to start eating healthier this month."\nPerson B: "That is great! What changes are you making?"\nPerson A: _______',
          text: 'What does Person A say?',
          options: [
            '"I am not sure what I mean."',
            '"I do not like cooking at home."',
            '"I plan to eat more fruits and vegetables and reduce sugar."',
            '"Restaurants are too expensive anyway."',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p2q8',
          part: 2,
          stimulus: 'Pharmacist: "This medication should be taken twice a day with food."\nCustomer: _______',
          text: 'What is the most appropriate response from the customer?',
          options: [
            '"I prefer taking tablets in the evening."',
            '"What time does the pharmacy close?"',
            '"Is there a discount for regular customers?"',
            '"Understood. Morning and evening after meals?"',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q9',
          part: 2,
          stimulus: 'Volunteer: "Our beach cleanup starts at 8 AM on Saturday. Will you join us?"\nNeighbor: _______',
          text: 'What does the neighbor say?',
          options: [
            '"I do not like the beach."',
            '"Cleaning is hard work."',
            '"Absolutely! I will bring gloves and bags."',
            '"The beach is far from here."',
          ],
          answer: 2,
        },
      ],
    },
    {
      part: 3,
      title: 'Parte 3 — Completar oraciones',
      instructions: 'Choose the word or phrase that best completes each sentence.',
      questions: [
        {
          type: 'mcq',
          id: 'p3q1',
          part: 3,
          text: 'Doctors recommend that adults _______ at least 30 minutes of physical exercise every day.',
          options: ['make', 'do', 'go', 'play'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q2',
          part: 3,
          text: 'The forest _______ at an alarming rate due to illegal logging and agriculture.',
          options: ['is disappearing', 'disappeared', 'will disappear', 'disappears'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q3',
          part: 3,
          text: 'If people _______ less plastic, ocean pollution would decrease significantly.',
          options: ['used', 'use', 'will use', 'using'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q4',
          part: 3,
          text: 'The patient was _______ from the hospital after three days of treatment.',
          options: ['escaped', 'released', 'removed', 'fired'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q5',
          part: 3,
          text: 'Scientists have discovered that air pollution _______ directly to respiratory diseases.',
          options: ['delivers', 'contains', 'leads', 'follows'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q6',
          part: 3,
          text: 'The government has decided _______ stricter environmental protection laws.',
          options: ['implementing', 'implemented', 'implement', 'to implement'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p3q7',
          part: 3,
          text: 'She has been a vegetarian _______ she was fifteen years old.',
          options: ['for', 'during', 'since', 'while'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q8',
          part: 3,
          text: 'Drinking enough water is _______ for maintaining good health.',
          options: ['essential', 'optional', 'harmful', 'unusual'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q9',
          part: 3,
          text: 'The new recycling plant can _______ thousands of tons of waste each month.',
          options: ['import', 'create', 'ignore', 'process'],
          answer: 3,
        },
      ],
    },
    {
      part: 4,
      title: 'Parte 4 — Comprensión visual',
      instructions: 'Read the notice or sign and answer the questions that follow.',
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          stimulus: '--- HEALTH CENTER NOTICE ---\nFlu Vaccination Campaign\nDates: October 1–31\nTime: 8:00 AM – 4:00 PM (weekdays only)\nLocation: Room 5, Ground Floor\nFree for all residents over 60 and children under 5.\nOthers: $3.00 per dose.\nBring your ID card.',
          stimulusLabel: 'Read the health center notice.',
          text: 'Who can receive the flu vaccine for free?',
          options: [
            'All residents of the city.',
            'People over 60 and children under 5.',
            'Only children under 5.',
            'People who have health insurance.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          stimulus: '--- HEALTH CENTER NOTICE ---\nFlu Vaccination Campaign\nDates: October 1–31\nTime: 8:00 AM – 4:00 PM (weekdays only)\nLocation: Room 5, Ground Floor\nFree for all residents over 60 and children under 5.\nOthers: $3.00 per dose.\nBring your ID card.',
          stimulusLabel: 'Read the health center notice.',
          text: 'What must visitors bring with them to the vaccination campaign?',
          options: [
            'A doctor\'s prescription.',
            'Their ID card.',
            'Their health insurance card.',
            'A completed medical form.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          stimulus: 'PARK RECYCLING STATIONS\nPlease use the correct bin:\nBLUE — Paper and cardboard only\nGREEN — Glass bottles and jars\nYELLOW — Plastic bottles and containers\nBLACK — General waste (no recycling)\nThank you for keeping our park clean!',
          stimulusLabel: 'Look at the recycling station sign.',
          text: 'In which bin should a glass bottle be placed?',
          options: [
            'Blue bin.',
            'Yellow bin.',
            'Black bin.',
            'Green bin.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          stimulus: 'PARK RECYCLING STATIONS\nPlease use the correct bin:\nBLUE — Paper and cardboard only\nGREEN — Glass bottles and jars\nYELLOW — Plastic bottles and containers\nBLACK — General waste (no recycling)\nThank you for keeping our park clean!',
          stimulusLabel: 'Look at the recycling station sign.',
          text: 'Where should a used cardboard box be placed?',
          options: [
            'Blue bin.',
            'Yellow bin.',
            'Green bin.',
            'Black bin.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          stimulus: 'WELLNESS WORKSHOP\nTopic: Managing Stress and Anxiety\nDate: Friday, November 8th\nTime: 6:30 PM – 8:00 PM\nVenue: Community Hall, Room 2\nFacilitator: Dr. Elena Rios, Clinical Psychologist\nFree entry — All adults welcome\nSpaces limited. Register at reception.',
          stimulusLabel: 'Read the workshop flyer.',
          text: 'Who is leading the workshop?',
          options: [
            'A community volunteer.',
            'A nurse from the health center.',
            'A clinical psychologist.',
            'A medical student.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          stimulus: 'WELLNESS WORKSHOP\nTopic: Managing Stress and Anxiety\nDate: Friday, November 8th\nTime: 6:30 PM – 8:00 PM\nVenue: Community Hall, Room 2\nFacilitator: Dr. Elena Rios, Clinical Psychologist\nFree entry — All adults welcome\nSpaces limited. Register at reception.',
          stimulusLabel: 'Read the workshop flyer.',
          text: 'What should interested participants do before attending?',
          options: [
            'Pay an entry fee at the door.',
            'Contact Dr. Rios directly.',
            'Bring a medical certificate.',
            'Register at reception in advance.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          stimulus: 'NATURE RESERVE — VISITOR RULES\n1. Stay on marked trails at all times.\n2. Do not feed the animals.\n3. Take all rubbish with you when you leave.\n4. No fires or barbecues permitted.\n5. Photography is allowed for personal use only.',
          stimulusLabel: 'Read the nature reserve rules.',
          text: 'What are visitors NOT allowed to do in the nature reserve?',
          options: [
            'Take photographs.',
            'Walk on marked trails.',
            'Light fires or barbecues.',
            'Visit with their family.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          stimulus: 'NATURE RESERVE — VISITOR RULES\n1. Stay on marked trails at all times.\n2. Do not feed the animals.\n3. Take all rubbish with you when you leave.\n4. No fires or barbecues permitted.\n5. Photography is allowed for personal use only.',
          stimulusLabel: 'Read the nature reserve rules.',
          text: 'What must visitors do with their rubbish?',
          options: [
            'Leave it in designated bins.',
            'Take it with them when they leave.',
            'Bury it away from the trail.',
            'Give it to a park ranger.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q9',
          part: 4,
          stimulus: 'HEALTHY EATING CHALLENGE\n28-Day Program\nEat at least 5 portions of fruit or vegetables per day.\nDrink 8 glasses of water daily.\nAvoid processed foods and sugary drinks.\nJoin our online community for tips and support.\nSign up free at: www.healthychallenge.org',
          stimulusLabel: 'Read the health challenge flyer.',
          text: 'What is the minimum number of fruit or vegetable portions recommended per day?',
          options: ['5', '3', '7', '8'],
          answer: 0,
        },
      ],
    },
    {
      part: 5,
      title: 'Parte 5 — Texto corto',
      instructions: 'Read the text and answer the questions.',
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          stimulus: `Green Roofs: Nature on Top of the City

A growing trend in urban architecture is the "green roof" — a rooftop covered with soil and living plants. Originally popular in Germany, the idea has spread to cities worldwide, including Singapore, Chicago, and Bogotá.

Green roofs provide several important benefits. They absorb rainwater and reduce flooding by slowing runoff. They also act as natural insulation, keeping buildings cooler in summer and warmer in winter, which lowers energy costs. Studies show that buildings with green roofs use up to 25% less energy for cooling.

Beyond energy savings, green roofs create mini ecosystems in urban areas. They attract bees, butterflies, and birds, providing habitat in places where nature is otherwise scarce. They also improve air quality by capturing dust and converting carbon dioxide into oxygen.

Installing a green roof is more expensive than a traditional one, but building owners often recover the cost within 10 to 15 years through lower energy bills and extended roof lifespan.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main topic of the article?',
          options: [
            'The benefits and features of green roofs in cities.',
            'How to reduce flooding in German cities.',
            'The high cost of modern urban architecture.',
            'How bees and birds survive in city environments.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          stimulus: `Green Roofs: Nature on Top of the City

A growing trend in urban architecture is the "green roof" — a rooftop covered with soil and living plants. Originally popular in Germany, the idea has spread to cities worldwide, including Singapore, Chicago, and Bogotá.

Green roofs provide several important benefits. They absorb rainwater and reduce flooding by slowing runoff. They also act as natural insulation, keeping buildings cooler in summer and warmer in winter, which lowers energy costs. Studies show that buildings with green roofs use up to 25% less energy for cooling.

Beyond energy savings, green roofs create mini ecosystems in urban areas. They attract bees, butterflies, and birds, providing habitat in places where nature is otherwise scarce. They also improve air quality by capturing dust and converting carbon dioxide into oxygen.

Installing a green roof is more expensive than a traditional one, but building owners often recover the cost within 10 to 15 years through lower energy bills and extended roof lifespan.`,
          stimulusLabel: 'Read the article.',
          text: 'According to the text, by how much can green roofs reduce cooling energy use?',
          options: ['Up to 10%', 'Up to 25%', 'Up to 15%', 'Up to 40%'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          stimulus: `Green Roofs: Nature on Top of the City

A growing trend in urban architecture is the "green roof" — a rooftop covered with soil and living plants. Originally popular in Germany, the idea has spread to cities worldwide, including Singapore, Chicago, and Bogotá.

Green roofs provide several important benefits. They absorb rainwater and reduce flooding by slowing runoff. They also act as natural insulation, keeping buildings cooler in summer and warmer in winter, which lowers energy costs. Studies show that buildings with green roofs use up to 25% less energy for cooling.

Beyond energy savings, green roofs create mini ecosystems in urban areas. They attract bees, butterflies, and birds, providing habitat in places where nature is otherwise scarce. They also improve air quality by capturing dust and converting carbon dioxide into oxygen.

Installing a green roof is more expensive than a traditional one, but building owners often recover the cost within 10 to 15 years through lower energy bills and extended roof lifespan.`,
          stimulusLabel: 'Read the article.',
          text: 'Where did the green roof trend originally become popular?',
          options: ['Singapore', 'Chicago', 'Germany', 'Bogotá'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          stimulus: `Green Roofs: Nature on Top of the City

A growing trend in urban architecture is the "green roof" — a rooftop covered with soil and living plants. Originally popular in Germany, the idea has spread to cities worldwide, including Singapore, Chicago, and Bogotá.

Green roofs provide several important benefits. They absorb rainwater and reduce flooding by slowing runoff. They also act as natural insulation, keeping buildings cooler in summer and warmer in winter, which lowers energy costs. Studies show that buildings with green roofs use up to 25% less energy for cooling.

Beyond energy savings, green roofs create mini ecosystems in urban areas. They attract bees, butterflies, and birds, providing habitat in places where nature is otherwise scarce. They also improve air quality by capturing dust and converting carbon dioxide into oxygen.

Installing a green roof is more expensive than a traditional one, but building owners often recover the cost within 10 to 15 years through lower energy bills and extended roof lifespan.`,
          stimulusLabel: 'Read the article.',
          text: 'How do green roofs help improve air quality?',
          options: [
            'They filter chemicals from industrial waste.',
            'They produce clean drinking water.',
            'They absorb excess rainwater from the sky.',
            'They capture dust and convert CO2 to oxygen.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          stimulus: `Green Roofs: Nature on Top of the City

A growing trend in urban architecture is the "green roof" — a rooftop covered with soil and living plants. Originally popular in Germany, the idea has spread to cities worldwide, including Singapore, Chicago, and Bogotá.

Green roofs provide several important benefits. They absorb rainwater and reduce flooding by slowing runoff. They also act as natural insulation, keeping buildings cooler in summer and warmer in winter, which lowers energy costs. Studies show that buildings with green roofs use up to 25% less energy for cooling.

Beyond energy savings, green roofs create mini ecosystems in urban areas. They attract bees, butterflies, and birds, providing habitat in places where nature is otherwise scarce. They also improve air quality by capturing dust and converting carbon dioxide into oxygen.

Installing a green roof is more expensive than a traditional one, but building owners often recover the cost within 10 to 15 years through lower energy bills and extended roof lifespan.`,
          stimulusLabel: 'Read the article.',
          text: 'How long does it typically take for building owners to recover the cost of installing a green roof?',
          options: ['5 to 8 years', '8 to 10 years', '10 to 15 years', '15 to 20 years'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          stimulus: `Green Roofs: Nature on Top of the City

A growing trend in urban architecture is the "green roof" — a rooftop covered with soil and living plants. Originally popular in Germany, the idea has spread to cities worldwide, including Singapore, Chicago, and Bogotá.

Green roofs provide several important benefits. They absorb rainwater and reduce flooding by slowing runoff. They also act as natural insulation, keeping buildings cooler in summer and warmer in winter, which lowers energy costs. Studies show that buildings with green roofs use up to 25% less energy for cooling.

Beyond energy savings, green roofs create mini ecosystems in urban areas. They attract bees, butterflies, and birds, providing habitat in places where nature is otherwise scarce. They also improve air quality by capturing dust and converting carbon dioxide into oxygen.

Installing a green roof is more expensive than a traditional one, but building owners often recover the cost within 10 to 15 years through lower energy bills and extended roof lifespan.`,
          stimulusLabel: 'Read the article.',
          text: 'The word "scarce" in the text is closest in meaning to:',
          options: ['Rare', 'Dangerous', 'Common', 'Expensive'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          stimulus: `Green Roofs: Nature on Top of the City

A growing trend in urban architecture is the "green roof" — a rooftop covered with soil and living plants. Originally popular in Germany, the idea has spread to cities worldwide, including Singapore, Chicago, and Bogotá.

Green roofs provide several important benefits. They absorb rainwater and reduce flooding by slowing runoff. They also act as natural insulation, keeping buildings cooler in summer and warmer in winter, which lowers energy costs. Studies show that buildings with green roofs use up to 25% less energy for cooling.

Beyond energy savings, green roofs create mini ecosystems in urban areas. They attract bees, butterflies, and birds, providing habitat in places where nature is otherwise scarce. They also improve air quality by capturing dust and converting carbon dioxide into oxygen.

Installing a green roof is more expensive than a traditional one, but building owners often recover the cost within 10 to 15 years through lower energy bills and extended roof lifespan.`,
          stimulusLabel: 'Read the article.',
          text: 'Which of the following is NOT mentioned as a benefit of green roofs?',
          options: [
            'Reducing flooding.',
            'Lowering energy costs.',
            'Providing animal habitats.',
            'Producing food for residents.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q8',
          part: 5,
          stimulus: `Green Roofs: Nature on Top of the City

A growing trend in urban architecture is the "green roof" — a rooftop covered with soil and living plants. Originally popular in Germany, the idea has spread to cities worldwide, including Singapore, Chicago, and Bogotá.

Green roofs provide several important benefits. They absorb rainwater and reduce flooding by slowing runoff. They also act as natural insulation, keeping buildings cooler in summer and warmer in winter, which lowers energy costs. Studies show that buildings with green roofs use up to 25% less energy for cooling.

Beyond energy savings, green roofs create mini ecosystems in urban areas. They attract bees, butterflies, and birds, providing habitat in places where nature is otherwise scarce. They also improve air quality by capturing dust and converting carbon dioxide into oxygen.

Installing a green roof is more expensive than a traditional one, but building owners often recover the cost within 10 to 15 years through lower energy bills and extended roof lifespan.`,
          stimulusLabel: 'Read the article.',
          text: 'What can be inferred about cities that adopt green roofs?',
          options: [
            'They will eliminate all urban pollution.',
            'They are taking steps to become more environmentally sustainable.',
            'They will no longer need traditional parks.',
            'Their citizens will stop using air conditioning entirely.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q9',
          part: 5,
          stimulus: `Green Roofs: Nature on Top of the City

A growing trend in urban architecture is the "green roof" — a rooftop covered with soil and living plants. Originally popular in Germany, the idea has spread to cities worldwide, including Singapore, Chicago, and Bogotá.

Green roofs provide several important benefits. They absorb rainwater and reduce flooding by slowing runoff. They also act as natural insulation, keeping buildings cooler in summer and warmer in winter, which lowers energy costs. Studies show that buildings with green roofs use up to 25% less energy for cooling.

Beyond energy savings, green roofs create mini ecosystems in urban areas. They attract bees, butterflies, and birds, providing habitat in places where nature is otherwise scarce. They also improve air quality by capturing dust and converting carbon dioxide into oxygen.

Installing a green roof is more expensive than a traditional one, but building owners often recover the cost within 10 to 15 years through lower energy bills and extended roof lifespan.`,
          stimulusLabel: 'Read the article.',
          text: 'The article describes green roofs as "natural insulation." This means they:',
          options: [
            'Use electricity to control the building temperature.',
            'Help regulate temperature without mechanical systems.',
            'Are made from recycled building materials.',
            'Keep noise levels low inside buildings.',
          ],
          answer: 1,
        },
      ],
    },
    {
      part: 6,
      title: 'Parte 6 — Texto largo: inferencia',
      instructions: 'Read the longer text carefully and answer the questions. Use inference and context clues.',
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          stimulus: `The Silent Crisis: Air Pollution and Public Health

Every year, air pollution causes approximately 7 million premature deaths worldwide, making it the single greatest environmental health risk on the planet. Yet despite this staggering toll, many people are unaware of how deeply the air they breathe affects their bodies.

Air pollution is a mixture of gases and microscopic particles released by vehicles, factories, power plants, and even household activities such as cooking over wood fires. The most dangerous components are fine particulate matter — tiny particles small enough to enter the bloodstream through the lungs — and ground-level ozone, a gas formed when sunlight reacts with vehicle exhaust.

Short-term exposure to high levels of pollution can trigger asthma attacks, cause eye and throat irritation, and worsen existing heart conditions. Long-term exposure is more insidious: it has been linked to permanent lung damage, increased risk of stroke and heart disease, cognitive decline in children, and even reduced life expectancy.

Developing countries face the worst of this crisis. In cities like Delhi, Lagos, and Dhaka, pollution levels regularly exceed World Health Organization guidelines by ten times or more. Residents in these cities can inhale as much pollution in a single day as a person in a cleaner city would absorb in a week.

However, change is possible. Several cities have demonstrated that policies work. In Beijing, authorities reduced dangerous particulate matter by 35% between 2013 and 2017 through a combination of factory relocations, vehicle restrictions, and the closure of coal-burning plants. In London, the introduction of a Clean Air Zone in 2019 cut nitrogen dioxide levels by 44% in its first year.

The lesson is clear: air pollution is not inevitable. With the right policies, investment in clean energy, and public awareness, cities can breathe again.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main message of the text?',
          options: [
            'Air pollution affects only developing countries.',
            'Factory emissions have decreased in all major cities.',
            'Vehicle restrictions are the only solution to pollution.',
            'Air pollution is a serious but solvable public health problem.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          stimulus: `The Silent Crisis: Air Pollution and Public Health

Every year, air pollution causes approximately 7 million premature deaths worldwide, making it the single greatest environmental health risk on the planet. Yet despite this staggering toll, many people are unaware of how deeply the air they breathe affects their bodies.

Air pollution is a mixture of gases and microscopic particles released by vehicles, factories, power plants, and even household activities such as cooking over wood fires. The most dangerous components are fine particulate matter — tiny particles small enough to enter the bloodstream through the lungs — and ground-level ozone, a gas formed when sunlight reacts with vehicle exhaust.

Short-term exposure to high levels of pollution can trigger asthma attacks, cause eye and throat irritation, and worsen existing heart conditions. Long-term exposure is more insidious: it has been linked to permanent lung damage, increased risk of stroke and heart disease, cognitive decline in children, and even reduced life expectancy.

Developing countries face the worst of this crisis. In cities like Delhi, Lagos, and Dhaka, pollution levels regularly exceed World Health Organization guidelines by ten times or more. Residents in these cities can inhale as much pollution in a single day as a person in a cleaner city would absorb in a week.

However, change is possible. Several cities have demonstrated that policies work. In Beijing, authorities reduced dangerous particulate matter by 35% between 2013 and 2017 through a combination of factory relocations, vehicle restrictions, and the closure of coal-burning plants. In London, the introduction of a Clean Air Zone in 2019 cut nitrogen dioxide levels by 44% in its first year.

The lesson is clear: air pollution is not inevitable. With the right policies, investment in clean energy, and public awareness, cities can breathe again.`,
          stimulusLabel: 'Read the article.',
          text: 'According to the text, what makes fine particulate matter especially dangerous?',
          options: [
            'It is small enough to enter the bloodstream through the lungs.',
            'It is visible to the naked eye.',
            'It is only produced by wood-burning fires.',
            'It stays in the upper atmosphere for years.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          stimulus: `The Silent Crisis: Air Pollution and Public Health

Every year, air pollution causes approximately 7 million premature deaths worldwide, making it the single greatest environmental health risk on the planet. Yet despite this staggering toll, many people are unaware of how deeply the air they breathe affects their bodies.

Air pollution is a mixture of gases and microscopic particles released by vehicles, factories, power plants, and even household activities such as cooking over wood fires. The most dangerous components are fine particulate matter — tiny particles small enough to enter the bloodstream through the lungs — and ground-level ozone, a gas formed when sunlight reacts with vehicle exhaust.

Short-term exposure to high levels of pollution can trigger asthma attacks, cause eye and throat irritation, and worsen existing heart conditions. Long-term exposure is more insidious: it has been linked to permanent lung damage, increased risk of stroke and heart disease, cognitive decline in children, and even reduced life expectancy.

Developing countries face the worst of this crisis. In cities like Delhi, Lagos, and Dhaka, pollution levels regularly exceed World Health Organization guidelines by ten times or more. Residents in these cities can inhale as much pollution in a single day as a person in a cleaner city would absorb in a week.

However, change is possible. Several cities have demonstrated that policies work. In Beijing, authorities reduced dangerous particulate matter by 35% between 2013 and 2017 through a combination of factory relocations, vehicle restrictions, and the closure of coal-burning plants. In London, the introduction of a Clean Air Zone in 2019 cut nitrogen dioxide levels by 44% in its first year.

The lesson is clear: air pollution is not inevitable. With the right policies, investment in clean energy, and public awareness, cities can breathe again.`,
          stimulusLabel: 'Read the article.',
          text: 'The word "insidious" in the third paragraph most likely means:',
          options: [
            'Immediate and obvious.',
            'Easily treated with medicine.',
            'Harmful in a slow, hidden way.',
            'Beneficial in small quantities.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          stimulus: `The Silent Crisis: Air Pollution and Public Health

Every year, air pollution causes approximately 7 million premature deaths worldwide, making it the single greatest environmental health risk on the planet. Yet despite this staggering toll, many people are unaware of how deeply the air they breathe affects their bodies.

Air pollution is a mixture of gases and microscopic particles released by vehicles, factories, power plants, and even household activities such as cooking over wood fires. The most dangerous components are fine particulate matter — tiny particles small enough to enter the bloodstream through the lungs — and ground-level ozone, a gas formed when sunlight reacts with vehicle exhaust.

Short-term exposure to high levels of pollution can trigger asthma attacks, cause eye and throat irritation, and worsen existing heart conditions. Long-term exposure is more insidious: it has been linked to permanent lung damage, increased risk of stroke and heart disease, cognitive decline in children, and even reduced life expectancy.

Developing countries face the worst of this crisis. In cities like Delhi, Lagos, and Dhaka, pollution levels regularly exceed World Health Organization guidelines by ten times or more. Residents in these cities can inhale as much pollution in a single day as a person in a cleaner city would absorb in a week.

However, change is possible. Several cities have demonstrated that policies work. In Beijing, authorities reduced dangerous particulate matter by 35% between 2013 and 2017 through a combination of factory relocations, vehicle restrictions, and the closure of coal-burning plants. In London, the introduction of a Clean Air Zone in 2019 cut nitrogen dioxide levels by 44% in its first year.

The lesson is clear: air pollution is not inevitable. With the right policies, investment in clean energy, and public awareness, cities can breathe again.`,
          stimulusLabel: 'Read the article.',
          text: 'How did Beijing reduce particulate matter by 35%?',
          options: [
            'By introducing electric buses and bicycles.',
            'By moving residents to cleaner suburban areas.',
            'By planting millions of trees throughout the city.',
            'Through factory relocations, vehicle restrictions, and closing coal plants.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          stimulus: `The Silent Crisis: Air Pollution and Public Health

Every year, air pollution causes approximately 7 million premature deaths worldwide, making it the single greatest environmental health risk on the planet. Yet despite this staggering toll, many people are unaware of how deeply the air they breathe affects their bodies.

Air pollution is a mixture of gases and microscopic particles released by vehicles, factories, power plants, and even household activities such as cooking over wood fires. The most dangerous components are fine particulate matter — tiny particles small enough to enter the bloodstream through the lungs — and ground-level ozone, a gas formed when sunlight reacts with vehicle exhaust.

Short-term exposure to high levels of pollution can trigger asthma attacks, cause eye and throat irritation, and worsen existing heart conditions. Long-term exposure is more insidious: it has been linked to permanent lung damage, increased risk of stroke and heart disease, cognitive decline in children, and even reduced life expectancy.

Developing countries face the worst of this crisis. In cities like Delhi, Lagos, and Dhaka, pollution levels regularly exceed World Health Organization guidelines by ten times or more. Residents in these cities can inhale as much pollution in a single day as a person in a cleaner city would absorb in a week.

However, change is possible. Several cities have demonstrated that policies work. In Beijing, authorities reduced dangerous particulate matter by 35% between 2013 and 2017 through a combination of factory relocations, vehicle restrictions, and the closure of coal-burning plants. In London, the introduction of a Clean Air Zone in 2019 cut nitrogen dioxide levels by 44% in its first year.

The lesson is clear: air pollution is not inevitable. With the right policies, investment in clean energy, and public awareness, cities can breathe again.`,
          stimulusLabel: 'Read the article.',
          text: 'What can be inferred about the situation in developing countries compared to wealthier nations?',
          options: [
            'Developing countries do not have pollution problems.',
            'Wealthier nations have more factories and are more polluted.',
            'Residents of developing cities face disproportionately higher pollution exposure.',
            'Developing countries have already solved their air quality problems.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q6',
          part: 6,
          stimulus: `The Silent Crisis: Air Pollution and Public Health

Every year, air pollution causes approximately 7 million premature deaths worldwide, making it the single greatest environmental health risk on the planet. Yet despite this staggering toll, many people are unaware of how deeply the air they breathe affects their bodies.

Air pollution is a mixture of gases and microscopic particles released by vehicles, factories, power plants, and even household activities such as cooking over wood fires. The most dangerous components are fine particulate matter — tiny particles small enough to enter the bloodstream through the lungs — and ground-level ozone, a gas formed when sunlight reacts with vehicle exhaust.

Short-term exposure to high levels of pollution can trigger asthma attacks, cause eye and throat irritation, and worsen existing heart conditions. Long-term exposure is more insidious: it has been linked to permanent lung damage, increased risk of stroke and heart disease, cognitive decline in children, and even reduced life expectancy.

Developing countries face the worst of this crisis. In cities like Delhi, Lagos, and Dhaka, pollution levels regularly exceed World Health Organization guidelines by ten times or more. Residents in these cities can inhale as much pollution in a single day as a person in a cleaner city would absorb in a week.

However, change is possible. Several cities have demonstrated that policies work. In Beijing, authorities reduced dangerous particulate matter by 35% between 2013 and 2017 through a combination of factory relocations, vehicle restrictions, and the closure of coal-burning plants. In London, the introduction of a Clean Air Zone in 2019 cut nitrogen dioxide levels by 44% in its first year.

The lesson is clear: air pollution is not inevitable. With the right policies, investment in clean energy, and public awareness, cities can breathe again.`,
          stimulusLabel: 'Read the article.',
          text: 'The phrase "cities can breathe again" at the end of the text is best understood as:',
          options: [
            'A literal statement about improved oxygen levels.',
            'A metaphor suggesting cities can recover clean air and public health.',
            'A reference to new breathing technology for urban areas.',
            'A criticism of current government policies.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q7',
          part: 6,
          stimulus: `The Silent Crisis: Air Pollution and Public Health

Every year, air pollution causes approximately 7 million premature deaths worldwide, making it the single greatest environmental health risk on the planet. Yet despite this staggering toll, many people are unaware of how deeply the air they breathe affects their bodies.

Air pollution is a mixture of gases and microscopic particles released by vehicles, factories, power plants, and even household activities such as cooking over wood fires. The most dangerous components are fine particulate matter — tiny particles small enough to enter the bloodstream through the lungs — and ground-level ozone, a gas formed when sunlight reacts with vehicle exhaust.

Short-term exposure to high levels of pollution can trigger asthma attacks, cause eye and throat irritation, and worsen existing heart conditions. Long-term exposure is more insidious: it has been linked to permanent lung damage, increased risk of stroke and heart disease, cognitive decline in children, and even reduced life expectancy.

Developing countries face the worst of this crisis. In cities like Delhi, Lagos, and Dhaka, pollution levels regularly exceed World Health Organization guidelines by ten times or more. Residents in these cities can inhale as much pollution in a single day as a person in a cleaner city would absorb in a week.

However, change is possible. Several cities have demonstrated that policies work. In Beijing, authorities reduced dangerous particulate matter by 35% between 2013 and 2017 through a combination of factory relocations, vehicle restrictions, and the closure of coal-burning plants. In London, the introduction of a Clean Air Zone in 2019 cut nitrogen dioxide levels by 44% in its first year.

The lesson is clear: air pollution is not inevitable. With the right policies, investment in clean energy, and public awareness, cities can breathe again.`,
          stimulusLabel: 'Read the article.',
          text: 'What does the example of London\'s Clean Air Zone suggest?',
          options: [
            'Government policy can produce rapid improvements in air quality.',
            'Clean air policies take decades to show results.',
            'Only large cities can afford to implement clean air zones.',
            'Nitrogen dioxide is the only dangerous air pollutant.',
          ],
          answer: 0,
        },
      ],
    },
    {
      part: 7,
      title: 'Parte 7 — Texto de opinion',
      instructions: "Read the opinion text and answer the questions about the author's argument.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          stimulus: `It Is Time to Tax Junk Food

For decades, governments have taxed cigarettes and alcohol to discourage their use and fund public health services. Now, it is time to apply the same logic to ultra-processed foods: sugary drinks, fast food, and snacks loaded with salt and fat.

The evidence is overwhelming. Obesity rates have tripled globally since 1975. Type 2 diabetes, heart disease, and certain cancers are all strongly linked to poor diet. These conditions cost health systems billions of dollars every year. Yet the food industry continues to market its most harmful products aggressively, often targeting children and low-income communities.

A tax on unhealthy foods would achieve two goals. First, it would raise the price of harmful products, making people think twice before choosing them. Research from Mexico shows that a 10% sugar tax introduced in 2014 reduced sugary drink consumption by 12% in its first year, with the steepest decline among low-income households. Second, the revenue generated can fund nutrition education, subsidize healthy foods, and improve access to fresh produce in underserved areas.

Critics argue that a junk food tax is unfair because it disproportionately affects poorer families who depend on cheap food. This concern is valid, but the solution is not to abandon the tax — it is to ensure that the revenue is used to offset these effects by making healthy food more affordable.

The right to eat freely should not come at the cost of a society drowning in preventable disease. A thoughtful, evidence-based junk food tax is not a punishment — it is an investment in public health.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What is the author\'s main argument?',
          options: [
            'Taxing junk food is a justified public health policy.',
            'Governments should ban all ultra-processed foods.',
            'Food companies should self-regulate their advertising.',
            'Low-income families should receive free healthy food.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          stimulus: `It Is Time to Tax Junk Food

For decades, governments have taxed cigarettes and alcohol to discourage their use and fund public health services. Now, it is time to apply the same logic to ultra-processed foods: sugary drinks, fast food, and snacks loaded with salt and fat.

The evidence is overwhelming. Obesity rates have tripled globally since 1975. Type 2 diabetes, heart disease, and certain cancers are all strongly linked to poor diet. These conditions cost health systems billions of dollars every year. Yet the food industry continues to market its most harmful products aggressively, often targeting children and low-income communities.

A tax on unhealthy foods would achieve two goals. First, it would raise the price of harmful products, making people think twice before choosing them. Research from Mexico shows that a 10% sugar tax introduced in 2014 reduced sugary drink consumption by 12% in its first year, with the steepest decline among low-income households. Second, the revenue generated can fund nutrition education, subsidize healthy foods, and improve access to fresh produce in underserved areas.

Critics argue that a junk food tax is unfair because it disproportionately affects poorer families who depend on cheap food. This concern is valid, but the solution is not to abandon the tax — it is to ensure that the revenue is used to offset these effects by making healthy food more affordable.

The right to eat freely should not come at the cost of a society drowning in preventable disease. A thoughtful, evidence-based junk food tax is not a punishment — it is an investment in public health.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What does Mexico\'s sugar tax example illustrate?',
          options: [
            'That sugar taxes always harm low-income families most.',
            'That taxing sugary drinks can effectively reduce their consumption.',
            'That governments should not interfere in food choices.',
            'That a 10% tax is too small to make a difference.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          stimulus: `It Is Time to Tax Junk Food

For decades, governments have taxed cigarettes and alcohol to discourage their use and fund public health services. Now, it is time to apply the same logic to ultra-processed foods: sugary drinks, fast food, and snacks loaded with salt and fat.

The evidence is overwhelming. Obesity rates have tripled globally since 1975. Type 2 diabetes, heart disease, and certain cancers are all strongly linked to poor diet. These conditions cost health systems billions of dollars every year. Yet the food industry continues to market its most harmful products aggressively, often targeting children and low-income communities.

A tax on unhealthy foods would achieve two goals. First, it would raise the price of harmful products, making people think twice before choosing them. Research from Mexico shows that a 10% sugar tax introduced in 2014 reduced sugary drink consumption by 12% in its first year, with the steepest decline among low-income households. Second, the revenue generated can fund nutrition education, subsidize healthy foods, and improve access to fresh produce in underserved areas.

Critics argue that a junk food tax is unfair because it disproportionately affects poorer families who depend on cheap food. This concern is valid, but the solution is not to abandon the tax — it is to ensure that the revenue is used to offset these effects by making healthy food more affordable.

The right to eat freely should not come at the cost of a society drowning in preventable disease. A thoughtful, evidence-based junk food tax is not a punishment — it is an investment in public health.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'How does the author respond to critics who say the tax is unfair to poor families?',
          options: [
            'By saying poor families should not eat junk food at all.',
            'By ignoring this concern entirely.',
            'By arguing the tax revenue should make healthy food more affordable.',
            'By agreeing and recommending the tax be cancelled.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          stimulus: `It Is Time to Tax Junk Food

For decades, governments have taxed cigarettes and alcohol to discourage their use and fund public health services. Now, it is time to apply the same logic to ultra-processed foods: sugary drinks, fast food, and snacks loaded with salt and fat.

The evidence is overwhelming. Obesity rates have tripled globally since 1975. Type 2 diabetes, heart disease, and certain cancers are all strongly linked to poor diet. These conditions cost health systems billions of dollars every year. Yet the food industry continues to market its most harmful products aggressively, often targeting children and low-income communities.

A tax on unhealthy foods would achieve two goals. First, it would raise the price of harmful products, making people think twice before choosing them. Research from Mexico shows that a 10% sugar tax introduced in 2014 reduced sugary drink consumption by 12% in its first year, with the steepest decline among low-income households. Second, the revenue generated can fund nutrition education, subsidize healthy foods, and improve access to fresh produce in underserved areas.

Critics argue that a junk food tax is unfair because it disproportionately affects poorer families who depend on cheap food. This concern is valid, but the solution is not to abandon the tax — it is to ensure that the revenue is used to offset these effects by making healthy food more affordable.

The right to eat freely should not come at the cost of a society drowning in preventable disease. A thoughtful, evidence-based junk food tax is not a punishment — it is an investment in public health.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'The author compares the proposed junk food tax to existing taxes on:',
          options: [
            'Gasoline and electricity.',
            'Medicines and vitamins.',
            'Imported goods and luxury items.',
            'Cigarettes and alcohol.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          stimulus: `It Is Time to Tax Junk Food

For decades, governments have taxed cigarettes and alcohol to discourage their use and fund public health services. Now, it is time to apply the same logic to ultra-processed foods: sugary drinks, fast food, and snacks loaded with salt and fat.

The evidence is overwhelming. Obesity rates have tripled globally since 1975. Type 2 diabetes, heart disease, and certain cancers are all strongly linked to poor diet. These conditions cost health systems billions of dollars every year. Yet the food industry continues to market its most harmful products aggressively, often targeting children and low-income communities.

A tax on unhealthy foods would achieve two goals. First, it would raise the price of harmful products, making people think twice before choosing them. Research from Mexico shows that a 10% sugar tax introduced in 2014 reduced sugary drink consumption by 12% in its first year, with the steepest decline among low-income households. Second, the revenue generated can fund nutrition education, subsidize healthy foods, and improve access to fresh produce in underserved areas.

Critics argue that a junk food tax is unfair because it disproportionately affects poorer families who depend on cheap food. This concern is valid, but the solution is not to abandon the tax — it is to ensure that the revenue is used to offset these effects by making healthy food more affordable.

The right to eat freely should not come at the cost of a society drowning in preventable disease. A thoughtful, evidence-based junk food tax is not a punishment — it is an investment in public health.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'According to the author, what is one way tax revenue from junk food could be used?',
          options: [
            'To build more fast food restaurants in underserved areas.',
            'To pay salaries for food industry workers.',
            'To subsidize healthy food and fund nutrition education.',
            'To reduce the national debt.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          stimulus: `It Is Time to Tax Junk Food

For decades, governments have taxed cigarettes and alcohol to discourage their use and fund public health services. Now, it is time to apply the same logic to ultra-processed foods: sugary drinks, fast food, and snacks loaded with salt and fat.

The evidence is overwhelming. Obesity rates have tripled globally since 1975. Type 2 diabetes, heart disease, and certain cancers are all strongly linked to poor diet. These conditions cost health systems billions of dollars every year. Yet the food industry continues to market its most harmful products aggressively, often targeting children and low-income communities.

A tax on unhealthy foods would achieve two goals. First, it would raise the price of harmful products, making people think twice before choosing them. Research from Mexico shows that a 10% sugar tax introduced in 2014 reduced sugary drink consumption by 12% in its first year, with the steepest decline among low-income households. Second, the revenue generated can fund nutrition education, subsidize healthy foods, and improve access to fresh produce in underserved areas.

Critics argue that a junk food tax is unfair because it disproportionately affects poorer families who depend on cheap food. This concern is valid, but the solution is not to abandon the tax — it is to ensure that the revenue is used to offset these effects by making healthy food more affordable.

The right to eat freely should not come at the cost of a society drowning in preventable disease. A thoughtful, evidence-based junk food tax is not a punishment — it is an investment in public health.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'Which phrase best describes the author\'s overall writing approach?',
          options: [
            'Evidence-based and persuasive, addressing counterarguments.',
            'One-sided and emotional, using personal stories only.',
            'Neutral and balanced, presenting both sides equally.',
            'Angry and accusatory, blaming only the food industry.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          stimulus: `It Is Time to Tax Junk Food

For decades, governments have taxed cigarettes and alcohol to discourage their use and fund public health services. Now, it is time to apply the same logic to ultra-processed foods: sugary drinks, fast food, and snacks loaded with salt and fat.

The evidence is overwhelming. Obesity rates have tripled globally since 1975. Type 2 diabetes, heart disease, and certain cancers are all strongly linked to poor diet. These conditions cost health systems billions of dollars every year. Yet the food industry continues to market its most harmful products aggressively, often targeting children and low-income communities.

A tax on unhealthy foods would achieve two goals. First, it would raise the price of harmful products, making people think twice before choosing them. Research from Mexico shows that a 10% sugar tax introduced in 2014 reduced sugary drink consumption by 12% in its first year, with the steepest decline among low-income households. Second, the revenue generated can fund nutrition education, subsidize healthy foods, and improve access to fresh produce in underserved areas.

Critics argue that a junk food tax is unfair because it disproportionately affects poorer families who depend on cheap food. This concern is valid, but the solution is not to abandon the tax — it is to ensure that the revenue is used to offset these effects by making healthy food more affordable.

The right to eat freely should not come at the cost of a society drowning in preventable disease. A thoughtful, evidence-based junk food tax is not a punishment — it is an investment in public health.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'The word "disproportionately" in the text means:',
          options: [
            'In a way that is equal for everyone.',
            'Less than the normal amount.',
            'In a random and unpredictable way.',
            'More than would be expected or fair.',
          ],
          answer: 3,
        },
      ],
    },
  ],
};

export default mock;
