import type { MockExam } from './types';

const mock: MockExam = {
  id: 'mock-01',
  examSlug: 'icfes',
  title: 'Mock 1 · Rutinas y ciudad',
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
          text: 'A place in the city where you can borrow books for free.',
          options: ['Supermarket', 'Library', 'Hospital', 'Museum'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          text: 'The daily activities that someone does at the same time every day.',
          options: ['Routine', 'Festival', 'Emergency', 'Schedule'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          text: 'A vehicle that travels underground and carries many passengers.',
          options: ['Taxi', 'Tram', 'Subway', 'Ferry'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          text: 'An outdoor area in a city with grass, trees, and benches where people relax.',
          options: ['Parking lot', 'Park', 'Market', 'Sidewalk'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          text: 'To move from one home or city to another to live there.',
          options: ['Travel', 'Commute', 'Relocate', 'Visit'],
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
          stimulus: 'Person A: "Excuse me, how do I get to the train station from here?"\nPerson B: _______',
          text: 'What is the best response for Person B?',
          options: [
            '"I like trains very much."',
            '"Go straight ahead and turn left at the traffic light."',
            '"The train arrived an hour ago."',
            '"Yes, I travel by train every day."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q2',
          part: 2,
          stimulus: 'Cashier: "That will be twelve dollars and fifty cents, please."\nCustomer: _______',
          text: 'What does the customer say next?',
          options: [
            '"The prices are too high here."',
            '"Here you go. Keep the change."',
            '"Do you have a bigger size?"',
            '"I will come back tomorrow."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q3',
          part: 2,
          stimulus: 'Receptionist: "Good morning! Do you have a reservation?"\nGuest: "No, I don\'t. Do you have any rooms available?"\nReceptionist: _______',
          text: 'What does the receptionist say?',
          options: [
            '"We are closed on weekends."',
            '"Let me check for you. What type of room do you need?"',
            '"You should have called earlier."',
            '"The restaurant is on the second floor."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q4',
          part: 2,
          stimulus: 'Friend A: "I\'m really tired today. I couldn\'t sleep last night."\nFriend B: _______',
          text: 'What is the most natural response from Friend B?',
          options: [
            '"You should go to bed earlier."',
            '"I had a great time at the party."',
            '"What time does your bus arrive?"',
            '"The coffee shop is closed."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q5',
          part: 2,
          stimulus: 'Teacher: "Did everyone finish the homework?"\nStudent: _______',
          text: 'Which response is most appropriate?',
          options: [
            '"The classroom is very cold today."',
            '"I finished it, but question five was difficult."',
            '"My mother works in a school too."',
            '"The library opens at eight."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q6',
          part: 2,
          stimulus: 'Doctor: "How long have you had this headache?"\nPatient: _______',
          text: 'What does the patient say?',
          options: [
            '"I take the bus to get here."',
            '"My sister is also a doctor."',
            '"Since yesterday afternoon. It\'s getting worse."',
            '"The pharmacy is next to the hospital."',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p2q7',
          part: 2,
          stimulus: 'Colleague A: "We have a meeting at three o\'clock. Can you make it?"\nColleague B: "I\'m not sure. I have another appointment at two-thirty."\nColleague A: _______',
          text: 'What does Colleague A say?',
          options: [
            '"The meeting room is on the fourth floor."',
            '"If you can\'t come, just let me know so I can inform the team."',
            '"I prefer afternoon meetings."',
            '"We should eat lunch first."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q8',
          part: 2,
          stimulus: 'Tourist: "Is this bus going to the city center?"\nDriver: _______',
          text: 'What is the driver\'s most helpful response?',
          options: [
            '"I drive this route every day."',
            '"Yes, it stops right in front of the main square."',
            '"The city is very beautiful."',
            '"Please pay before you get on."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q9',
          part: 2,
          stimulus: 'Librarian: "Can I help you find something?"\nStudent: "Yes, I\'m looking for books about urban planning."\nLibrarian: _______',
          text: 'What does the librarian say?',
          options: [
            '"Urban planning is a complex topic."',
            '"Follow me. Those books are in section C on the second floor."',
            '"You need a library card to borrow books."',
            '"We close at six o\'clock today."',
          ],
          answer: 1,
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
          text: 'Maria _______ to work by bicycle every morning because she lives close to the office.',
          options: ['is going', 'goes', 'went', 'will go'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q2',
          part: 3,
          text: 'The city _______ a new public library next year to serve the growing community.',
          options: ['is building', 'was built', 'built', 'had built'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q3',
          part: 3,
          text: 'If you want to catch the bus, you _______ leave now because it departs in five minutes.',
          options: ['might', 'should', 'could', 'would'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q4',
          part: 3,
          text: 'The streets were very _______ this morning because of the heavy rain.',
          options: ['traffic', 'crowded', 'quiet', 'noisy'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q5',
          part: 3,
          text: 'My brother has lived in this city _______ he was a child.',
          options: ['for', 'during', 'since', 'while'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q6',
          part: 3,
          text: 'The new metro line will _______ travel time across the city by almost 30 minutes.',
          options: ['increase', 'extend', 'reduce', 'change'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q7',
          part: 3,
          text: 'People who live in the city center often _______ public transport instead of driving.',
          options: ['use', 'make', 'take of', 'go'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q8',
          part: 3,
          text: 'Before the presentation, she _______ her notes three times to make sure everything was correct.',
          options: ['review', 'reviewed', 'is reviewing', 'reviews'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q9',
          part: 3,
          text: 'The city council decided _______ a new cycling lane along the main avenue.',
          options: ['add', 'adding', 'to add', 'have added'],
          answer: 2,
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
          stimulus: '--- NOTICE ---\nCITY PARK\nOpen daily: 6:00 AM – 9:00 PM\nDogs must be on leash at all times.\nNo food or drinks near the fountain area.\nFree Wi-Fi available at the main pavilion.',
          stimulusLabel: 'Read the park notice.',
          text: 'What must dog owners do when they are in the park?',
          options: [
            'Leave the park before 9 PM.',
            'Keep their dogs on a leash.',
            'Stay near the fountain area.',
            'Connect to the free Wi-Fi.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          stimulus: '--- NOTICE ---\nCITY PARK\nOpen daily: 6:00 AM – 9:00 PM\nDogs must be on leash at all times.\nNo food or drinks near the fountain area.\nFree Wi-Fi available at the main pavilion.',
          stimulusLabel: 'Read the park notice.',
          text: 'Where can visitors use the internet for free?',
          options: [
            'Near the fountain.',
            'At the park entrance.',
            'At the main pavilion.',
            'In the dog area.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          stimulus: 'BUS SCHEDULE — ROUTE 12\nMonday to Friday: Every 15 minutes from 5:30 AM to 11:00 PM\nSaturday: Every 20 minutes from 7:00 AM to 10:00 PM\nSunday: Every 30 minutes from 8:00 AM to 8:00 PM\n* No service on public holidays.',
          stimulusLabel: 'Look at the bus schedule.',
          text: 'How often does Bus Route 12 run on Saturdays?',
          options: [
            'Every 15 minutes.',
            'Every 20 minutes.',
            'Every 30 minutes.',
            'Every hour.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          stimulus: 'BUS SCHEDULE — ROUTE 12\nMonday to Friday: Every 15 minutes from 5:30 AM to 11:00 PM\nSaturday: Every 20 minutes from 7:00 AM to 10:00 PM\nSunday: Every 30 minutes from 8:00 AM to 8:00 PM\n* No service on public holidays.',
          stimulusLabel: 'Look at the bus schedule.',
          text: 'Which statement about Route 12 is TRUE?',
          options: [
            'It runs every day of the year.',
            'It does not operate on public holidays.',
            'It starts at 5:30 AM on Sundays.',
            'It runs until midnight on weekdays.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          stimulus: 'COMMUNITY CENTER\nEnglish Conversation Club\nEvery Wednesday, 6:00 PM – 7:30 PM\nRoom 204\nFree for all residents.\nNo registration required — just show up!\nContact: info@communitycenter.org',
          stimulusLabel: 'Read the flyer.',
          text: 'Who can attend the English Conversation Club?',
          options: [
            'Only registered members.',
            'People who speak advanced English.',
            'All residents, for free.',
            'Students from the local school only.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          stimulus: 'COMMUNITY CENTER\nEnglish Conversation Club\nEvery Wednesday, 6:00 PM – 7:30 PM\nRoom 204\nFree for all residents.\nNo registration required — just show up!\nContact: info@communitycenter.org',
          stimulusLabel: 'Read the flyer.',
          text: 'What does "No registration required" mean?',
          options: [
            'You cannot join if you are not registered.',
            'You do not need to sign up in advance.',
            'The club is not accepting new members.',
            'You must pay a registration fee.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          stimulus: 'ROAD WORKS AHEAD\nLane closure: Monday 14 Apr – Friday 18 Apr\nExpect delays of up to 20 minutes\nFollow diversionary route via Oak Street\nWe apologize for any inconvenience.',
          stimulusLabel: 'Read the road sign.',
          text: 'What should drivers expect during the road works?',
          options: [
            'The road will be completely closed.',
            'There will be delays of up to 20 minutes.',
            'The works will last for one month.',
            'All vehicles must use the highway.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          stimulus: 'ROAD WORKS AHEAD\nLane closure: Monday 14 Apr – Friday 18 Apr\nExpect delays of up to 20 minutes\nFollow diversionary route via Oak Street\nWe apologize for any inconvenience.',
          stimulusLabel: 'Read the road sign.',
          text: 'What alternative route do drivers need to take?',
          options: [
            'Through the city center.',
            'Via Oak Street.',
            'On the highway.',
            'Using the northern bypass.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q9',
          part: 4,
          stimulus: 'APARTMENT FOR RENT\n2 bedrooms · 1 bathroom · 65 m2\nFurnished · 4th floor · No elevator\nMonthly rent: $650 (utilities not included)\nPets: small dogs only\nAvailable: July 1st\nCall 555-0192',
          stimulusLabel: 'Read the rental advertisement.',
          text: 'Which statement about the apartment is TRUE?',
          options: [
            'Utilities are included in the rent.',
            'The apartment is available immediately.',
            'Large dogs are not allowed.',
            'The apartment is on the ground floor.',
          ],
          answer: 2,
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
          stimulus: `City Bikes: A New Way to Commute

Last year, the city of Medellin launched a new bike-sharing program called CityBike. With over 500 bicycles available at 60 stations across the city, residents can now rent a bike for short trips instead of using a car or bus.

To use the service, people register online or at any station using their ID card. The first 30 minutes of each trip are free, and after that, users pay a small fee of $0.50 per additional 15 minutes. A monthly subscription costs $8 and gives unlimited 45-minute rides.

The program has been very popular. In its first six months, over 25,000 people signed up and more than 200,000 trips were completed. City officials say that the program has helped reduce traffic and air pollution in the city center.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main purpose of the CityBike program?',
          options: [
            'To replace all buses in the city.',
            'To offer an alternative way to travel short distances.',
            'To encourage people to buy bicycles.',
            'To reduce the cost of public transport.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          stimulus: `City Bikes: A New Way to Commute

Last year, the city of Medellin launched a new bike-sharing program called CityBike. With over 500 bicycles available at 60 stations across the city, residents can now rent a bike for short trips instead of using a car or bus.

To use the service, people register online or at any station using their ID card. The first 30 minutes of each trip are free, and after that, users pay a small fee of $0.50 per additional 15 minutes. A monthly subscription costs $8 and gives unlimited 45-minute rides.

The program has been very popular. In its first six months, over 25,000 people signed up and more than 200,000 trips were completed. City officials say that the program has helped reduce traffic and air pollution in the city center.`,
          stimulusLabel: 'Read the article.',
          text: 'How much does a user pay for a 45-minute bike trip without a monthly subscription?',
          options: [
            'Nothing — all trips are free.',
            '$0.50',
            '$1.00',
            '$8.00',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          stimulus: `City Bikes: A New Way to Commute

Last year, the city of Medellin launched a new bike-sharing program called CityBike. With over 500 bicycles available at 60 stations across the city, residents can now rent a bike for short trips instead of using a car or bus.

To use the service, people register online or at any station using their ID card. The first 30 minutes of each trip are free, and after that, users pay a small fee of $0.50 per additional 15 minutes. A monthly subscription costs $8 and gives unlimited 45-minute rides.

The program has been very popular. In its first six months, over 25,000 people signed up and more than 200,000 trips were completed. City officials say that the program has helped reduce traffic and air pollution in the city center.`,
          stimulusLabel: 'Read the article.',
          text: 'According to the text, what has the CityBike program helped improve?',
          options: [
            'Road infrastructure and lighting.',
            'Traffic and air quality in the city center.',
            'The number of buses on the road.',
            'The price of gasoline in the city.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          stimulus: `City Bikes: A New Way to Commute

Last year, the city of Medellin launched a new bike-sharing program called CityBike. With over 500 bicycles available at 60 stations across the city, residents can now rent a bike for short trips instead of using a car or bus.

To use the service, people register online or at any station using their ID card. The first 30 minutes of each trip are free, and after that, users pay a small fee of $0.50 per additional 15 minutes. A monthly subscription costs $8 and gives unlimited 45-minute rides.

The program has been very popular. In its first six months, over 25,000 people signed up and more than 200,000 trips were completed. City officials say that the program has helped reduce traffic and air pollution in the city center.`,
          stimulusLabel: 'Read the article.',
          text: 'Which word in the text is closest in meaning to "started"?',
          options: [
            'launched',
            'registered',
            'completed',
            'reduced',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          stimulus: `City Bikes: A New Way to Commute

Last year, the city of Medellin launched a new bike-sharing program called CityBike. With over 500 bicycles available at 60 stations across the city, residents can now rent a bike for short trips instead of using a car or bus.

To use the service, people register online or at any station using their ID card. The first 30 minutes of each trip are free, and after that, users pay a small fee of $0.50 per additional 15 minutes. A monthly subscription costs $8 and gives unlimited 45-minute rides.

The program has been very popular. In its first six months, over 25,000 people signed up and more than 200,000 trips were completed. City officials say that the program has helped reduce traffic and air pollution in the city center.`,
          stimulusLabel: 'Read the article.',
          text: 'What can be inferred about the CityBike program?',
          options: [
            'Most users prefer it only for long distances.',
            'The program was not well received by residents.',
            'The program was more successful than expected.',
            'City officials want to shut it down after one year.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          stimulus: `City Bikes: A New Way to Commute

Last year, the city of Medellin launched a new bike-sharing program called CityBike. With over 500 bicycles available at 60 stations across the city, residents can now rent a bike for short trips instead of using a car or bus.

To use the service, people register online or at any station using their ID card. The first 30 minutes of each trip are free, and after that, users pay a small fee of $0.50 per additional 15 minutes. A monthly subscription costs $8 and gives unlimited 45-minute rides.

The program has been very popular. In its first six months, over 25,000 people signed up and more than 200,000 trips were completed. City officials say that the program has helped reduce traffic and air pollution in the city center.`,
          stimulusLabel: 'Read the article.',
          text: 'How do people register for CityBike?',
          options: [
            'By calling a phone number.',
            'Only at city hall.',
            'Online or at any station with an ID.',
            'By sending an email to the program.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          stimulus: `City Bikes: A New Way to Commute

Last year, the city of Medellin launched a new bike-sharing program called CityBike. With over 500 bicycles available at 60 stations across the city, residents can now rent a bike for short trips instead of using a car or bus.

To use the service, people register online or at any station using their ID card. The first 30 minutes of each trip are free, and after that, users pay a small fee of $0.50 per additional 15 minutes. A monthly subscription costs $8 and gives unlimited 45-minute rides.

The program has been very popular. In its first six months, over 25,000 people signed up and more than 200,000 trips were completed. City officials say that the program has helped reduce traffic and air pollution in the city center.`,
          stimulusLabel: 'Read the article.',
          text: 'How many bicycle stations are available in the city?',
          options: ['25', '60', '200', '500'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q8',
          part: 5,
          stimulus: `City Bikes: A New Way to Commute

Last year, the city of Medellin launched a new bike-sharing program called CityBike. With over 500 bicycles available at 60 stations across the city, residents can now rent a bike for short trips instead of using a car or bus.

To use the service, people register online or at any station using their ID card. The first 30 minutes of each trip are free, and after that, users pay a small fee of $0.50 per additional 15 minutes. A monthly subscription costs $8 and gives unlimited 45-minute rides.

The program has been very popular. In its first six months, over 25,000 people signed up and more than 200,000 trips were completed. City officials say that the program has helped reduce traffic and air pollution in the city center.`,
          stimulusLabel: 'Read the article.',
          text: 'What benefit does a monthly subscription offer compared to paying per trip?',
          options: [
            'It allows unlimited trips of any length for free.',
            'It provides unlimited 45-minute rides for $8.',
            'It gives a discount on public bus fares.',
            'It allows users to rent the bike overnight.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q9',
          part: 5,
          stimulus: `City Bikes: A New Way to Commute

Last year, the city of Medellin launched a new bike-sharing program called CityBike. With over 500 bicycles available at 60 stations across the city, residents can now rent a bike for short trips instead of using a car or bus.

To use the service, people register online or at any station using their ID card. The first 30 minutes of each trip are free, and after that, users pay a small fee of $0.50 per additional 15 minutes. A monthly subscription costs $8 and gives unlimited 45-minute rides.

The program has been very popular. In its first six months, over 25,000 people signed up and more than 200,000 trips were completed. City officials say that the program has helped reduce traffic and air pollution in the city center.`,
          stimulusLabel: 'Read the article.',
          text: 'The word "residents" in the text refers to:',
          options: [
            'Tourists visiting the city.',
            'City government officials.',
            'People who live in the city.',
            'Bus and taxi drivers.',
          ],
          answer: 2,
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
          stimulus: `The Changing Face of City Centers

For decades, city centers around the world were dominated by cars. Wide roads, large parking lots, and fast-moving traffic made walking or cycling unpleasant and dangerous. Many shops closed as people preferred to drive to out-of-town malls. City centers became dirty, noisy, and less attractive.

However, a major shift has been happening over the last 20 years. Many cities have begun to redesign their centers by reducing car traffic and creating more space for pedestrians and cyclists. In Oslo, Norway, the city removed nearly all car parking from the center in 2019. In Barcelona, Spain, the "superblocks" project transformed certain street areas into car-free zones with seating, gardens, and play areas.

The results have been largely positive. Local businesses report higher foot traffic and increased sales. Residents say they feel safer and the air quality has improved. Children can play outside again. The streets feel alive.

Critics, however, argue that these changes hurt people who depend on cars, particularly those with disabilities or who live far from the city center and cannot easily use public transport. They call for a more balanced approach that considers everyone's needs.

Despite these concerns, the trend continues. More cities are experimenting with pedestrianization, green spaces, and smarter public transport. The goal is not to ban cars entirely, but to give people better options and make city centers places where people want to be, not just pass through.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main idea of the text?',
          options: [
            'Cars should be completely banned from all city centers.',
            'City centers are being redesigned to prioritize people over cars.',
            'Shopping malls have destroyed traditional city centers.',
            'Public transport is the only solution to urban traffic problems.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          stimulus: `The Changing Face of City Centers

For decades, city centers around the world were dominated by cars. Wide roads, large parking lots, and fast-moving traffic made walking or cycling unpleasant and dangerous. Many shops closed as people preferred to drive to out-of-town malls. City centers became dirty, noisy, and less attractive.

However, a major shift has been happening over the last 20 years. Many cities have begun to redesign their centers by reducing car traffic and creating more space for pedestrians and cyclists. In Oslo, Norway, the city removed nearly all car parking from the center in 2019. In Barcelona, Spain, the "superblocks" project transformed certain street areas into car-free zones with seating, gardens, and play areas.

The results have been largely positive. Local businesses report higher foot traffic and increased sales. Residents say they feel safer and the air quality has improved. Children can play outside again. The streets feel alive.

Critics, however, argue that these changes hurt people who depend on cars, particularly those with disabilities or who live far from the city center and cannot easily use public transport. They call for a more balanced approach that considers everyone's needs.

Despite these concerns, the trend continues. More cities are experimenting with pedestrianization, green spaces, and smarter public transport. The goal is not to ban cars entirely, but to give people better options and make city centers places where people want to be, not just pass through.`,
          stimulusLabel: 'Read the article.',
          text: 'According to the text, what happened to many city center shops in the past?',
          options: [
            'They moved to city centers because of better infrastructure.',
            'They closed because people drove to out-of-town malls instead.',
            'They became more popular when car traffic increased.',
            'They were forced to close by new government regulations.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          stimulus: `The Changing Face of City Centers

For decades, city centers around the world were dominated by cars. Wide roads, large parking lots, and fast-moving traffic made walking or cycling unpleasant and dangerous. Many shops closed as people preferred to drive to out-of-town malls. City centers became dirty, noisy, and less attractive.

However, a major shift has been happening over the last 20 years. Many cities have begun to redesign their centers by reducing car traffic and creating more space for pedestrians and cyclists. In Oslo, Norway, the city removed nearly all car parking from the center in 2019. In Barcelona, Spain, the "superblocks" project transformed certain street areas into car-free zones with seating, gardens, and play areas.

The results have been largely positive. Local businesses report higher foot traffic and increased sales. Residents say they feel safer and the air quality has improved. Children can play outside again. The streets feel alive.

Critics, however, argue that these changes hurt people who depend on cars, particularly those with disabilities or who live far from the city center and cannot easily use public transport. They call for a more balanced approach that considers everyone's needs.

Despite these concerns, the trend continues. More cities are experimenting with pedestrianization, green spaces, and smarter public transport. The goal is not to ban cars entirely, but to give people better options and make city centers places where people want to be, not just pass through.`,
          stimulusLabel: 'Read the article.',
          text: 'What does the phrase "higher foot traffic" suggest about local businesses?',
          options: [
            'More people are walking past and into the shops.',
            'Shops have had to hire more staff to handle deliveries.',
            'Local businesses have had to reduce their prices.',
            'Fewer cars mean fewer customers for the shops.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          stimulus: `The Changing Face of City Centers

For decades, city centers around the world were dominated by cars. Wide roads, large parking lots, and fast-moving traffic made walking or cycling unpleasant and dangerous. Many shops closed as people preferred to drive to out-of-town malls. City centers became dirty, noisy, and less attractive.

However, a major shift has been happening over the last 20 years. Many cities have begun to redesign their centers by reducing car traffic and creating more space for pedestrians and cyclists. In Oslo, Norway, the city removed nearly all car parking from the center in 2019. In Barcelona, Spain, the "superblocks" project transformed certain street areas into car-free zones with seating, gardens, and play areas.

The results have been largely positive. Local businesses report higher foot traffic and increased sales. Residents say they feel safer and the air quality has improved. Children can play outside again. The streets feel alive.

Critics, however, argue that these changes hurt people who depend on cars, particularly those with disabilities or who live far from the city center and cannot easily use public transport. They call for a more balanced approach that considers everyone's needs.

Despite these concerns, the trend continues. More cities are experimenting with pedestrianization, green spaces, and smarter public transport. The goal is not to ban cars entirely, but to give people better options and make city centers places where people want to be, not just pass through.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the critics\' main concern about pedestrianization?',
          options: [
            'It costs too much money to redesign city streets.',
            'It may create difficulties for people who rely on cars.',
            'It will destroy the history and culture of old city centers.',
            'It makes cycling more dangerous because of more pedestrians.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          stimulus: `The Changing Face of City Centers

For decades, city centers around the world were dominated by cars. Wide roads, large parking lots, and fast-moving traffic made walking or cycling unpleasant and dangerous. Many shops closed as people preferred to drive to out-of-town malls. City centers became dirty, noisy, and less attractive.

However, a major shift has been happening over the last 20 years. Many cities have begun to redesign their centers by reducing car traffic and creating more space for pedestrians and cyclists. In Oslo, Norway, the city removed nearly all car parking from the center in 2019. In Barcelona, Spain, the "superblocks" project transformed certain street areas into car-free zones with seating, gardens, and play areas.

The results have been largely positive. Local businesses report higher foot traffic and increased sales. Residents say they feel safer and the air quality has improved. Children can play outside again. The streets feel alive.

Critics, however, argue that these changes hurt people who depend on cars, particularly those with disabilities or who live far from the city center and cannot easily use public transport. They call for a more balanced approach that considers everyone's needs.

Despite these concerns, the trend continues. More cities are experimenting with pedestrianization, green spaces, and smarter public transport. The goal is not to ban cars entirely, but to give people better options and make city centers places where people want to be, not just pass through.`,
          stimulusLabel: 'Read the article.',
          text: 'Which of the following best describes the author\'s overall attitude toward these urban changes?',
          options: [
            'Strongly opposed — cars are essential for modern cities.',
            'Cautiously optimistic — the trend is positive but has challenges.',
            'Completely neutral — the author does not express any opinion.',
            'Strongly supportive — all cities should ban cars immediately.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q6',
          part: 6,
          stimulus: `The Changing Face of City Centers

For decades, city centers around the world were dominated by cars. Wide roads, large parking lots, and fast-moving traffic made walking or cycling unpleasant and dangerous. Many shops closed as people preferred to drive to out-of-town malls. City centers became dirty, noisy, and less attractive.

However, a major shift has been happening over the last 20 years. Many cities have begun to redesign their centers by reducing car traffic and creating more space for pedestrians and cyclists. In Oslo, Norway, the city removed nearly all car parking from the center in 2019. In Barcelona, Spain, the "superblocks" project transformed certain street areas into car-free zones with seating, gardens, and play areas.

The results have been largely positive. Local businesses report higher foot traffic and increased sales. Residents say they feel safer and the air quality has improved. Children can play outside again. The streets feel alive.

Critics, however, argue that these changes hurt people who depend on cars, particularly those with disabilities or who live far from the city center and cannot easily use public transport. They call for a more balanced approach that considers everyone's needs.

Despite these concerns, the trend continues. More cities are experimenting with pedestrianization, green spaces, and smarter public transport. The goal is not to ban cars entirely, but to give people better options and make city centers places where people want to be, not just pass through.`,
          stimulusLabel: 'Read the article.',
          text: 'The phrase "places where people want to be, not just pass through" implies that city centers should be:',
          options: [
            'Destinations where people enjoy spending time, not just routes.',
            'Places where cars can move faster without stopping.',
            'Zones reserved only for tourism and entertainment.',
            'Areas where only local residents are allowed.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6q7',
          part: 6,
          stimulus: `The Changing Face of City Centers

For decades, city centers around the world were dominated by cars. Wide roads, large parking lots, and fast-moving traffic made walking or cycling unpleasant and dangerous. Many shops closed as people preferred to drive to out-of-town malls. City centers became dirty, noisy, and less attractive.

However, a major shift has been happening over the last 20 years. Many cities have begun to redesign their centers by reducing car traffic and creating more space for pedestrians and cyclists. In Oslo, Norway, the city removed nearly all car parking from the center in 2019. In Barcelona, Spain, the "superblocks" project transformed certain street areas into car-free zones with seating, gardens, and play areas.

The results have been largely positive. Local businesses report higher foot traffic and increased sales. Residents say they feel safer and the air quality has improved. Children can play outside again. The streets feel alive.

Critics, however, argue that these changes hurt people who depend on cars, particularly those with disabilities or who live far from the city center and cannot easily use public transport. They call for a more balanced approach that considers everyone's needs.

Despite these concerns, the trend continues. More cities are experimenting with pedestrianization, green spaces, and smarter public transport. The goal is not to ban cars entirely, but to give people better options and make city centers places where people want to be, not just pass through.`,
          stimulusLabel: 'Read the article.',
          text: 'What can be inferred about Oslo\'s approach to urban redesign?',
          options: [
            'Oslo only redesigned one small street in 2019.',
            'Oslo took a radical step by removing most central parking.',
            'Oslo decided to add more parking to attract shoppers.',
            'Oslo\'s changes were strongly opposed by all residents.',
          ],
          answer: 1,
        },
      ],
    },
    {
      part: 7,
      title: 'Parte 7 — Texto de opinion',
      instructions: 'Read the opinion text and answer the questions about the author\'s argument.',
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          stimulus: `Should Cities Be Built Around People, Not Cars?

Most modern cities were designed decades ago, when cars were seen as the symbol of progress and freedom. Streets were made wide, parking lots were built everywhere, and public spaces disappeared under concrete. But ask yourself: is that the kind of city you want to live in?

I believe cities must be redesigned to put people first. Walking, cycling, and public transport should be the priority, not private cars. Research consistently shows that cities with less car traffic have lower rates of air pollution, fewer traffic accidents, and higher quality of life for their residents. Amsterdam, Copenhagen, and Bogotá are leading examples of cities that have successfully transformed their urban spaces.

Some argue that removing cars hurts the economy. But the evidence points to the opposite. When streets are pedestrianized, local shops thrive, tourism increases, and property values rise. People stay longer, spend more, and feel more connected to their community.

Of course, a complete ban on cars would be unrealistic. We must ensure that elderly people, those with disabilities, and those in rural areas still have access to the center. But the goal should be clear: a city center where walking feels safe, cycling is encouraged, and public transport is reliable enough that owning a car becomes a choice, not a necessity.

The cities of tomorrow must be planned for the many, not for the few who can afford a private vehicle. This is not just about convenience — it is about fairness, health, and the future of urban life.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What is the author\'s main argument in this text?',
          options: [
            'Cars should be completely banned from all urban areas.',
            'Cities should be redesigned to prioritize people over cars.',
            'Public transport should replace cycling in all cities.',
            'Only wealthy cities can afford to reduce car traffic.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          stimulus: `Should Cities Be Built Around People, Not Cars?

Most modern cities were designed decades ago, when cars were seen as the symbol of progress and freedom. Streets were made wide, parking lots were built everywhere, and public spaces disappeared under concrete. But ask yourself: is that the kind of city you want to live in?

I believe cities must be redesigned to put people first. Walking, cycling, and public transport should be the priority, not private cars. Research consistently shows that cities with less car traffic have lower rates of air pollution, fewer traffic accidents, and higher quality of life for their residents. Amsterdam, Copenhagen, and Bogotá are leading examples of cities that have successfully transformed their urban spaces.

Some argue that removing cars hurts the economy. But the evidence points to the opposite. When streets are pedestrianized, local shops thrive, tourism increases, and property values rise. People stay longer, spend more, and feel more connected to their community.

Of course, a complete ban on cars would be unrealistic. We must ensure that elderly people, those with disabilities, and those in rural areas still have access to the center. But the goal should be clear: a city center where walking feels safe, cycling is encouraged, and public transport is reliable enough that owning a car becomes a choice, not a necessity.

The cities of tomorrow must be planned for the many, not for the few who can afford a private vehicle. This is not just about convenience — it is about fairness, health, and the future of urban life.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'How does the author respond to the claim that removing cars hurts the economy?',
          options: [
            'By agreeing that economic concerns are the most important issue.',
            'By arguing that pedestrianization actually benefits local economies.',
            'By saying that the economy is less important than the environment.',
            'By ignoring the economic argument entirely.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          stimulus: `Should Cities Be Built Around People, Not Cars?

Most modern cities were designed decades ago, when cars were seen as the symbol of progress and freedom. Streets were made wide, parking lots were built everywhere, and public spaces disappeared under concrete. But ask yourself: is that the kind of city you want to live in?

I believe cities must be redesigned to put people first. Walking, cycling, and public transport should be the priority, not private cars. Research consistently shows that cities with less car traffic have lower rates of air pollution, fewer traffic accidents, and higher quality of life for their residents. Amsterdam, Copenhagen, and Bogotá are leading examples of cities that have successfully transformed their urban spaces.

Some argue that removing cars hurts the economy. But the evidence points to the opposite. When streets are pedestrianized, local shops thrive, tourism increases, and property values rise. People stay longer, spend more, and feel more connected to their community.

Of course, a complete ban on cars would be unrealistic. We must ensure that elderly people, those with disabilities, and those in rural areas still have access to the center. But the goal should be clear: a city center where walking feels safe, cycling is encouraged, and public transport is reliable enough that owning a car becomes a choice, not a necessity.

The cities of tomorrow must be planned for the many, not for the few who can afford a private vehicle. This is not just about convenience — it is about fairness, health, and the future of urban life.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What does the author mean by "a city center where owning a car becomes a choice, not a necessity"?',
          options: [
            'Cars should be given to all residents for free.',
            'Public transport should be good enough that people do not need to own a car.',
            'The government should decide who is allowed to own a car.',
            'Cars should only be used on weekends in the city center.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          stimulus: `Should Cities Be Built Around People, Not Cars?

Most modern cities were designed decades ago, when cars were seen as the symbol of progress and freedom. Streets were made wide, parking lots were built everywhere, and public spaces disappeared under concrete. But ask yourself: is that the kind of city you want to live in?

I believe cities must be redesigned to put people first. Walking, cycling, and public transport should be the priority, not private cars. Research consistently shows that cities with less car traffic have lower rates of air pollution, fewer traffic accidents, and higher quality of life for their residents. Amsterdam, Copenhagen, and Bogotá are leading examples of cities that have successfully transformed their urban spaces.

Some argue that removing cars hurts the economy. But the evidence points to the opposite. When streets are pedestrianized, local shops thrive, tourism increases, and property values rise. People stay longer, spend more, and feel more connected to their community.

Of course, a complete ban on cars would be unrealistic. We must ensure that elderly people, those with disabilities, and those in rural areas still have access to the center. But the goal should be clear: a city center where walking feels safe, cycling is encouraged, and public transport is reliable enough that owning a car becomes a choice, not a necessity.

The cities of tomorrow must be planned for the many, not for the few who can afford a private vehicle. This is not just about convenience — it is about fairness, health, and the future of urban life.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'The phrase "planned for the many, not for the few" suggests that the author believes current cities:',
          options: [
            'Are well-designed for most people.',
            'Mainly serve the interests of wealthy car owners.',
            'Are too expensive for most residents.',
            'Have too many parks and green spaces.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          stimulus: `Should Cities Be Built Around People, Not Cars?

Most modern cities were designed decades ago, when cars were seen as the symbol of progress and freedom. Streets were made wide, parking lots were built everywhere, and public spaces disappeared under concrete. But ask yourself: is that the kind of city you want to live in?

I believe cities must be redesigned to put people first. Walking, cycling, and public transport should be the priority, not private cars. Research consistently shows that cities with less car traffic have lower rates of air pollution, fewer traffic accidents, and higher quality of life for their residents. Amsterdam, Copenhagen, and Bogotá are leading examples of cities that have successfully transformed their urban spaces.

Some argue that removing cars hurts the economy. But the evidence points to the opposite. When streets are pedestrianized, local shops thrive, tourism increases, and property values rise. People stay longer, spend more, and feel more connected to their community.

Of course, a complete ban on cars would be unrealistic. We must ensure that elderly people, those with disabilities, and those in rural areas still have access to the center. But the goal should be clear: a city center where walking feels safe, cycling is encouraged, and public transport is reliable enough that owning a car becomes a choice, not a necessity.

The cities of tomorrow must be planned for the many, not for the few who can afford a private vehicle. This is not just about convenience — it is about fairness, health, and the future of urban life.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'Which of the following best describes the author\'s writing strategy?',
          options: [
            'The author presents only one side and ignores opposing views.',
            'The author presents a clear position but acknowledges practical limits.',
            'The author uses only statistics to support the argument.',
            'The author avoids taking a personal position on the issue.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          stimulus: `Should Cities Be Built Around People, Not Cars?

Most modern cities were designed decades ago, when cars were seen as the symbol of progress and freedom. Streets were made wide, parking lots were built everywhere, and public spaces disappeared under concrete. But ask yourself: is that the kind of city you want to live in?

I believe cities must be redesigned to put people first. Walking, cycling, and public transport should be the priority, not private cars. Research consistently shows that cities with less car traffic have lower rates of air pollution, fewer traffic accidents, and higher quality of life for their residents. Amsterdam, Copenhagen, and Bogotá are leading examples of cities that have successfully transformed their urban spaces.

Some argue that removing cars hurts the economy. But the evidence points to the opposite. When streets are pedestrianized, local shops thrive, tourism increases, and property values rise. People stay longer, spend more, and feel more connected to their community.

Of course, a complete ban on cars would be unrealistic. We must ensure that elderly people, those with disabilities, and those in rural areas still have access to the center. But the goal should be clear: a city center where walking feels safe, cycling is encouraged, and public transport is reliable enough that owning a car becomes a choice, not a necessity.

The cities of tomorrow must be planned for the many, not for the few who can afford a private vehicle. This is not just about convenience — it is about fairness, health, and the future of urban life.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What does the word "thrive" mean in the context of this text?',
          options: [
            'Survive with difficulty.',
            'Close permanently.',
            'Grow and be very successful.',
            'Move to a new location.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          stimulus: `Should Cities Be Built Around People, Not Cars?

Most modern cities were designed decades ago, when cars were seen as the symbol of progress and freedom. Streets were made wide, parking lots were built everywhere, and public spaces disappeared under concrete. But ask yourself: is that the kind of city you want to live in?

I believe cities must be redesigned to put people first. Walking, cycling, and public transport should be the priority, not private cars. Research consistently shows that cities with less car traffic have lower rates of air pollution, fewer traffic accidents, and higher quality of life for their residents. Amsterdam, Copenhagen, and Bogotá are leading examples of cities that have successfully transformed their urban spaces.

Some argue that removing cars hurts the economy. But the evidence points to the opposite. When streets are pedestrianized, local shops thrive, tourism increases, and property values rise. People stay longer, spend more, and feel more connected to their community.

Of course, a complete ban on cars would be unrealistic. We must ensure that elderly people, those with disabilities, and those in rural areas still have access to the center. But the goal should be clear: a city center where walking feels safe, cycling is encouraged, and public transport is reliable enough that owning a car becomes a choice, not a necessity.

The cities of tomorrow must be planned for the many, not for the few who can afford a private vehicle. This is not just about convenience — it is about fairness, health, and the future of urban life.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'According to the author, what would make a complete ban on cars "unrealistic"?',
          options: [
            'The high cost of building new public transport.',
            'The need to maintain access for people who cannot easily use alternatives.',
            'The political opposition from car manufacturers.',
            'The fact that cycling is dangerous in most cities.',
          ],
          answer: 1,
        },
      ],
    },
  ],
};

export default mock;
