import type { MockExam } from './types';

const mock: MockExam = {
  id: 'mock-02',
  examSlug: 'icfes',
  title: 'Mock 2 · Viajes y servicios',
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
          text: 'A building where travelers pay to sleep overnight, usually with meals and services.',
          options: ['Airport', 'Hotel', 'Station', 'Embassy'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          text: 'An official document issued by a government that allows a person to travel abroad.',
          options: ['Visa', 'Ticket', 'Passport', 'License'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          text: 'The area in an airport where passengers wait before boarding their flight.',
          options: ['Customs', 'Departure gate', 'Baggage claim', 'Check-in desk'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          text: 'A person who guides tourists to historical or natural sites and explains important information.',
          options: ['Travel agent', 'Tour guide', 'Receptionist', 'Steward'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          text: 'A trip in which all major expenses — transport, hotel, and sometimes meals — are included in one price.',
          options: ['Layover', 'Transfer', 'Package tour', 'Day trip'],
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
          stimulus: 'Airline agent: "I\'m sorry, your flight has been delayed by two hours."\nPassenger: _______',
          text: 'What is the most natural response from the passenger?',
          options: [
            '"That\'s fine, I prefer long flights."',
            '"Oh no. Is there a lounge where I can wait?"',
            '"I will book a different airline next time."',
            '"How many bags can I check in?"',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q2',
          part: 2,
          stimulus: 'Hotel receptionist: "Good evening! Welcome to Grand View Hotel. Do you have a reservation?"\nGuest: "Yes, I do. It\'s under the name Torres."\nReceptionist: _______',
          text: 'What does the receptionist say next?',
          options: [
            '"I\'m afraid we are fully booked tonight."',
            '"Let me pull that up for you. Could I see your ID, please?"',
            '"The restaurant closes at nine."',
            '"Checkout time is 11 AM."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q3',
          part: 2,
          stimulus: 'Tourist: "Excuse me, which bus goes to the old town?"\nLocal resident: _______',
          text: 'What is the most helpful response?',
          options: [
            '"I don\'t have a bus pass."',
            '"The old town is very beautiful in summer."',
            '"Take bus number 7 from that stop across the street."',
            '"I usually walk to the market."',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p2q4',
          part: 2,
          stimulus: 'Travel agent: "Would you prefer a window or an aisle seat?"\nCustomer: _______',
          text: 'Which response fits the context?',
          options: [
            '"I\'d like a window seat, please. I enjoy the view."',
            '"I already have my passport."',
            '"The hotel should have two beds."',
            '"We are traveling in December."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q5',
          part: 2,
          stimulus: 'Customs officer: "Do you have anything to declare?"\nTraveler: _______',
          text: 'What does the traveler say?',
          options: [
            '"My suitcase is very heavy."',
            '"No, just personal belongings."',
            '"I have been traveling for ten hours."',
            '"My connecting flight leaves at noon."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q6',
          part: 2,
          stimulus: 'Hotel guest: "The shower in my room isn\'t working properly."\nFront desk staff: _______',
          text: 'What is the best response from the staff?',
          options: [
            '"Our rooms are cleaned every day."',
            '"I\'m sorry to hear that. I\'ll send maintenance right away."',
            '"Breakfast is served from seven to ten."',
            '"You can check out at noon."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q7',
          part: 2,
          stimulus: 'Tour guide: "This cathedral was built in the fifteenth century. Any questions?"\nTourist: _______',
          text: 'What is the most appropriate follow-up question?',
          options: [
            '"How far is the airport from here?"',
            '"How long did it take to build it?"',
            '"Is there a hotel nearby?"',
            '"Can we eat inside?"',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q8',
          part: 2,
          stimulus: 'Passenger A: "I think we missed our connection in Madrid."\nPassenger B: "Really? What should we do?"\nPassenger A: _______',
          text: 'What does Passenger A suggest?',
          options: [
            '"Let\'s go to the airline\'s service desk and ask for help."',
            '"The food in Madrid is excellent."',
            '"I prefer traveling by train."',
            '"Let\'s wait here until someone finds us."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q9',
          part: 2,
          stimulus: 'Waiter: "Are you ready to order, or do you need a few more minutes?"\nDiner: _______',
          text: 'What is the most natural response from the diner?',
          options: [
            '"The table is too small."',
            '"I\'ll have the grilled fish, please. And a glass of water."',
            '"We arrived this morning from Bogotá."',
            '"The menu is in Spanish."',
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
          text: 'Passengers are advised to _______ at least two hours before an international flight.',
          options: ['arrive', 'depart', 'cancel', 'board'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q2',
          part: 3,
          text: 'The hotel room _______ a beautiful view of the ocean from the balcony.',
          options: ['shows', 'offers', 'gives out', 'presents to'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q3',
          part: 3,
          text: 'By the time they reached the beach resort, they _______ for more than twelve hours.',
          options: ['travel', 'are traveling', 'had been traveling', 'will travel'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q4',
          part: 3,
          text: 'The tour package _______ flights, accommodation, and daily breakfast.',
          options: ['contains', 'includes', 'adds', 'gives'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q5',
          part: 3,
          text: 'Travelers _______ exchange their currency before leaving for countries with limited banking services.',
          options: ['might', 'ought to', 'could have', 'should'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p3q6',
          part: 3,
          text: 'The airline announced that the flight _______ due to a technical problem with the aircraft.',
          options: ['is canceled', 'was canceled', 'cancels', 'has been canceling'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q7',
          part: 3,
          text: 'The resort is _______ popular during the summer months that rooms must be booked months in advance.',
          options: ['very', 'too', 'so', 'such'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q8',
          part: 3,
          text: 'To collect your luggage, please go to _______ claim area on the ground floor.',
          options: ['baggage', 'cargo', 'suitcase', 'package'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q9',
          part: 3,
          text: 'She decided _______ an extra night at the hotel because the return flight was postponed.',
          options: ['booking', 'to book', 'book', 'have booked'],
          answer: 1,
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
          stimulus: '--- HOTEL NOTICE ---\nGRAND VIEW HOTEL\nCheck-in: 3:00 PM | Check-out: 12:00 PM\nRoom service available 24 hours.\nBreakfast buffet: 7:00 AM – 10:30 AM (Floor 2)\nGuests must show key card to enter the pool area.\nQuiet hours: 11:00 PM – 7:00 AM',
          stimulusLabel: 'Read the hotel notice.',
          text: 'What must guests show to use the pool?',
          options: [
            'Their passport.',
            'A booking confirmation email.',
            'Their hotel key card.',
            'A printed receipt.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          stimulus: '--- HOTEL NOTICE ---\nGRAND VIEW HOTEL\nCheck-in: 3:00 PM | Check-out: 12:00 PM\nRoom service available 24 hours.\nBreakfast buffet: 7:00 AM – 10:30 AM (Floor 2)\nGuests must show key card to enter the pool area.\nQuiet hours: 11:00 PM – 7:00 AM',
          stimulusLabel: 'Read the hotel notice.',
          text: 'At what time must guests leave their room on the day of departure?',
          options: [
            '11:00 AM',
            '12:00 PM',
            '3:00 PM',
            '10:30 AM',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          stimulus: 'AIRPORT INFORMATION\nFlight: AV407 to Miami\nDeparture: 14:35\nGate: B12\nBoarding begins: 14:05\nStatus: ON TIME\n⚠ Final call will be announced 10 minutes before departure.\nPlease have your boarding pass and ID ready.',
          stimulusLabel: 'Read the airport departure sign.',
          text: 'When does boarding start for flight AV407?',
          options: [
            'At 14:35.',
            'At 14:05.',
            'At 13:55.',
            'At 14:25.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          stimulus: 'AIRPORT INFORMATION\nFlight: AV407 to Miami\nDeparture: 14:35\nGate: B12\nBoarding begins: 14:05\nStatus: ON TIME\n⚠ Final call will be announced 10 minutes before departure.\nPlease have your boarding pass and ID ready.',
          stimulusLabel: 'Read the airport departure sign.',
          text: 'What should passengers have ready when boarding?',
          options: [
            'Their luggage tags and hotel reservation.',
            'Their boarding pass and ID.',
            'Their travel insurance and visa.',
            'Their passport and hotel key card.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          stimulus: 'TOURISM OFFICE — CITY OF CARTAGENA\nFree walking tours: Tuesday & Thursday, 9:00 AM\nMeet at Plaza de Bolívar (look for the yellow umbrella).\nTour lasts approximately 2 hours.\nDonations welcome but not required.\nFor private tours, call: 310-555-0174',
          stimulusLabel: 'Read the tourism flyer.',
          text: 'Where do participants meet for the free walking tour?',
          options: [
            'At the Tourism Office.',
            'At the city bus terminal.',
            'At Plaza de Bolívar, near a yellow umbrella.',
            'At the entrance of the cathedral.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          stimulus: 'TOURISM OFFICE — CITY OF CARTAGENA\nFree walking tours: Tuesday & Thursday, 9:00 AM\nMeet at Plaza de Bolívar (look for the yellow umbrella).\nTour lasts approximately 2 hours.\nDonations welcome but not required.\nFor private tours, call: 310-555-0174',
          stimulusLabel: 'Read the tourism flyer.',
          text: 'Which statement about the walking tour is TRUE?',
          options: [
            'It runs every day of the week.',
            'Payment is required before joining.',
            'Private tours can be arranged by phone.',
            'The tour lasts four hours.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          stimulus: 'RENTAL CAR — TERMS & CONDITIONS\nMinimum driver age: 21 years\nValid driver\'s license required.\nFuel policy: Return full.\nAdditional driver fee: $10/day\nInsurance included in base price.\nLate returns charged at $25/hour.',
          stimulusLabel: 'Read the rental car terms.',
          text: 'What happens if a customer returns the car late?',
          options: [
            'They will be charged $10 per day.',
            'The insurance is canceled.',
            'They must pay $25 for each hour late.',
            'The car will be collected free of charge.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          stimulus: 'RENTAL CAR — TERMS & CONDITIONS\nMinimum driver age: 21 years\nValid driver\'s license required.\nFuel policy: Return full.\nAdditional driver fee: $10/day\nInsurance included in base price.\nLate returns charged at $25/hour.',
          stimulusLabel: 'Read the rental car terms.',
          text: 'Which of the following is included in the base price?',
          options: [
            'Fuel for the entire trip.',
            'Insurance.',
            'An additional driver.',
            'A GPS device.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q9',
          part: 4,
          stimulus: 'CRUISE SHIP ANNOUNCEMENT\nDear guests, we will arrive at Puerto Limón at 8:00 AM tomorrow.\nExcursions depart from Deck 3 at 9:00 AM sharp.\nAll guests must be back on board by 5:00 PM.\nDinner service begins at 7:00 PM in the Grand Dining Room.',
          stimulusLabel: 'Read the cruise ship announcement.',
          text: 'What is the deadline for passengers to return to the ship?',
          options: [
            '8:00 AM.',
            '9:00 AM.',
            '5:00 PM.',
            '7:00 PM.',
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
          stimulus: `SkyStay Rewards: Earn Points Every Night

SkyStay Hotels has launched a new loyalty program called SkyStay Rewards, designed to give frequent travelers more value for every stay. Members earn 10 points for every dollar spent on rooms, dining, and spa services at any of the 300 SkyStay properties worldwide.

Points can be redeemed for free nights, room upgrades, and travel vouchers. Bronze members need 500 points for a free night, while Gold and Platinum members enjoy reduced thresholds and exclusive perks such as late checkout and complimentary breakfast.

Joining is completely free. Travelers can register online or ask at the front desk during their next stay. Points are added automatically when the membership number is provided at check-in. Members also receive a welcome bonus of 200 points upon registration, enough to start saving toward their first reward right away.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main purpose of the SkyStay Rewards program?',
          options: [
            'To replace the hotel\'s existing room service.',
            'To offer frequent travelers rewards for their spending.',
            'To advertise cheaper flights for hotel guests.',
            'To encourage guests to eat only at hotel restaurants.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          stimulus: `SkyStay Rewards: Earn Points Every Night

SkyStay Hotels has launched a new loyalty program called SkyStay Rewards, designed to give frequent travelers more value for every stay. Members earn 10 points for every dollar spent on rooms, dining, and spa services at any of the 300 SkyStay properties worldwide.

Points can be redeemed for free nights, room upgrades, and travel vouchers. Bronze members need 500 points for a free night, while Gold and Platinum members enjoy reduced thresholds and exclusive perks such as late checkout and complimentary breakfast.

Joining is completely free. Travelers can register online or ask at the front desk during their next stay. Points are added automatically when the membership number is provided at check-in. Members also receive a welcome bonus of 200 points upon registration, enough to start saving toward their first reward right away.`,
          stimulusLabel: 'Read the article.',
          text: 'How many points does a member earn per dollar spent?',
          options: ['5', '10', '200', '500'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          stimulus: `SkyStay Rewards: Earn Points Every Night

SkyStay Hotels has launched a new loyalty program called SkyStay Rewards, designed to give frequent travelers more value for every stay. Members earn 10 points for every dollar spent on rooms, dining, and spa services at any of the 300 SkyStay properties worldwide.

Points can be redeemed for free nights, room upgrades, and travel vouchers. Bronze members need 500 points for a free night, while Gold and Platinum members enjoy reduced thresholds and exclusive perks such as late checkout and complimentary breakfast.

Joining is completely free. Travelers can register online or ask at the front desk during their next stay. Points are added automatically when the membership number is provided at check-in. Members also receive a welcome bonus of 200 points upon registration, enough to start saving toward their first reward right away.`,
          stimulusLabel: 'Read the article.',
          text: 'What bonus do new members receive when they register?',
          options: [
            'A free room upgrade.',
            'A 10% discount on their next stay.',
            '200 welcome points.',
            'A free spa treatment.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          stimulus: `SkyStay Rewards: Earn Points Every Night

SkyStay Hotels has launched a new loyalty program called SkyStay Rewards, designed to give frequent travelers more value for every stay. Members earn 10 points for every dollar spent on rooms, dining, and spa services at any of the 300 SkyStay properties worldwide.

Points can be redeemed for free nights, room upgrades, and travel vouchers. Bronze members need 500 points for a free night, while Gold and Platinum members enjoy reduced thresholds and exclusive perks such as late checkout and complimentary breakfast.

Joining is completely free. Travelers can register online or ask at the front desk during their next stay. Points are added automatically when the membership number is provided at check-in. Members also receive a welcome bonus of 200 points upon registration, enough to start saving toward their first reward right away.`,
          stimulusLabel: 'Read the article.',
          text: 'What advantage do Gold and Platinum members have over Bronze members?',
          options: [
            'They earn more points per dollar.',
            'They need fewer points for a free night and get extra perks.',
            'They can use points at any hotel brand.',
            'They receive a monthly cash refund.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          stimulus: `SkyStay Rewards: Earn Points Every Night

SkyStay Hotels has launched a new loyalty program called SkyStay Rewards, designed to give frequent travelers more value for every stay. Members earn 10 points for every dollar spent on rooms, dining, and spa services at any of the 300 SkyStay properties worldwide.

Points can be redeemed for free nights, room upgrades, and travel vouchers. Bronze members need 500 points for a free night, while Gold and Platinum members enjoy reduced thresholds and exclusive perks such as late checkout and complimentary breakfast.

Joining is completely free. Travelers can register online or ask at the front desk during their next stay. Points are added automatically when the membership number is provided at check-in. Members also receive a welcome bonus of 200 points upon registration, enough to start saving toward their first reward right away.`,
          stimulusLabel: 'Read the article.',
          text: 'The word "redeemed" in the text means:',
          options: [
            'Earned by spending money.',
            'Used or exchanged for a reward.',
            'Transferred to another person.',
            'Canceled after a period of time.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          stimulus: `SkyStay Rewards: Earn Points Every Night

SkyStay Hotels has launched a new loyalty program called SkyStay Rewards, designed to give frequent travelers more value for every stay. Members earn 10 points for every dollar spent on rooms, dining, and spa services at any of the 300 SkyStay properties worldwide.

Points can be redeemed for free nights, room upgrades, and travel vouchers. Bronze members need 500 points for a free night, while Gold and Platinum members enjoy reduced thresholds and exclusive perks such as late checkout and complimentary breakfast.

Joining is completely free. Travelers can register online or ask at the front desk during their next stay. Points are added automatically when the membership number is provided at check-in. Members also receive a welcome bonus of 200 points upon registration, enough to start saving toward their first reward right away.`,
          stimulusLabel: 'Read the article.',
          text: 'How are points added to a member\'s account?',
          options: [
            'By filling out a form at the end of each stay.',
            'Automatically when the membership number is given at check-in.',
            'By calling customer service after checkout.',
            'By scanning a card at the hotel entrance.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          stimulus: `SkyStay Rewards: Earn Points Every Night

SkyStay Hotels has launched a new loyalty program called SkyStay Rewards, designed to give frequent travelers more value for every stay. Members earn 10 points for every dollar spent on rooms, dining, and spa services at any of the 300 SkyStay properties worldwide.

Points can be redeemed for free nights, room upgrades, and travel vouchers. Bronze members need 500 points for a free night, while Gold and Platinum members enjoy reduced thresholds and exclusive perks such as late checkout and complimentary breakfast.

Joining is completely free. Travelers can register online or ask at the front desk during their next stay. Points are added automatically when the membership number is provided at check-in. Members also receive a welcome bonus of 200 points upon registration, enough to start saving toward their first reward right away.`,
          stimulusLabel: 'Read the article.',
          text: 'How many SkyStay hotel properties are mentioned in the text?',
          options: ['10', '200', '300', '500'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q8',
          part: 5,
          stimulus: `SkyStay Rewards: Earn Points Every Night

SkyStay Hotels has launched a new loyalty program called SkyStay Rewards, designed to give frequent travelers more value for every stay. Members earn 10 points for every dollar spent on rooms, dining, and spa services at any of the 300 SkyStay properties worldwide.

Points can be redeemed for free nights, room upgrades, and travel vouchers. Bronze members need 500 points for a free night, while Gold and Platinum members enjoy reduced thresholds and exclusive perks such as late checkout and complimentary breakfast.

Joining is completely free. Travelers can register online or ask at the front desk during their next stay. Points are added automatically when the membership number is provided at check-in. Members also receive a welcome bonus of 200 points upon registration, enough to start saving toward their first reward right away.`,
          stimulusLabel: 'Read the article.',
          text: 'Which of the following can points NOT be used for, according to the text?',
          options: [
            'Free nights.',
            'Room upgrades.',
            'Travel vouchers.',
            'Free airport transfers.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q9',
          part: 5,
          stimulus: `SkyStay Rewards: Earn Points Every Night

SkyStay Hotels has launched a new loyalty program called SkyStay Rewards, designed to give frequent travelers more value for every stay. Members earn 10 points for every dollar spent on rooms, dining, and spa services at any of the 300 SkyStay properties worldwide.

Points can be redeemed for free nights, room upgrades, and travel vouchers. Bronze members need 500 points for a free night, while Gold and Platinum members enjoy reduced thresholds and exclusive perks such as late checkout and complimentary breakfast.

Joining is completely free. Travelers can register online or ask at the front desk during their next stay. Points are added automatically when the membership number is provided at check-in. Members also receive a welcome bonus of 200 points upon registration, enough to start saving toward their first reward right away.`,
          stimulusLabel: 'Read the article.',
          text: 'What can be inferred about the SkyStay Rewards program?',
          options: [
            'It is only available to business travelers.',
            'It is designed to encourage guests to return to SkyStay hotels.',
            'Members must pay a monthly fee to stay enrolled.',
            'Points expire after six months.',
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
          stimulus: `Budget Travel: Changing the World of Tourism

Twenty years ago, traveling internationally was a privilege reserved for those with significant financial resources. Transatlantic flights cost hundreds of dollars, and the idea of spending a weekend in a foreign capital seemed unrealistic for most ordinary people. Today, that picture has changed dramatically.

The rise of budget airlines has been one of the most significant forces reshaping global tourism. Carriers such as Ryanair in Europe and IndiGo in Asia introduced a no-frills model that stripped away extras — meals, assigned seating, and generous baggage allowances — and passed the savings on to customers. As a result, the number of international tourists worldwide jumped from 435 million in 1990 to over 1.4 billion in 2019, according to the World Tourism Organization.

But this democratization of travel has not come without consequences. Popular destinations such as Barcelona, Venice, and Bali have struggled with overtourism — the phenomenon where excessive visitor numbers put pressure on infrastructure, raise living costs for local residents, and damage natural environments. In Venice, the resident population has declined from 175,000 in the 1950s to fewer than 50,000 today, partly because rising rents driven by tourism have made the city unaffordable for locals.

Governments and tourism boards have responded in different ways. Some cities have introduced tourist taxes, charging visitors a nightly fee that funds local services. Others have set visitor limits at sensitive natural or cultural sites. Amsterdam has gone further, actively campaigning to discourage low-budget, short-stay tourists and instead attract visitors who stay longer and contribute more to the local economy.

The debate around budget travel ultimately reflects a deeper question: who benefits from mass tourism, and at what cost? As the industry continues to grow, striking a balance between accessibility and sustainability will be the defining challenge of the coming decades.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main idea of this text?',
          options: [
            'Budget airlines are causing environmental disasters around the world.',
            'The growth of affordable travel has transformed tourism while creating new challenges.',
            'International travel is now only possible for wealthy people.',
            'Governments should ban all budget airlines to protect local communities.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          stimulus: `Budget Travel: Changing the World of Tourism

Twenty years ago, traveling internationally was a privilege reserved for those with significant financial resources. Transatlantic flights cost hundreds of dollars, and the idea of spending a weekend in a foreign capital seemed unrealistic for most ordinary people. Today, that picture has changed dramatically.

The rise of budget airlines has been one of the most significant forces reshaping global tourism. Carriers such as Ryanair in Europe and IndiGo in Asia introduced a no-frills model that stripped away extras — meals, assigned seating, and generous baggage allowances — and passed the savings on to customers. As a result, the number of international tourists worldwide jumped from 435 million in 1990 to over 1.4 billion in 2019, according to the World Tourism Organization.

But this democratization of travel has not come without consequences. Popular destinations such as Barcelona, Venice, and Bali have struggled with overtourism — the phenomenon where excessive visitor numbers put pressure on infrastructure, raise living costs for local residents, and damage natural environments. In Venice, the resident population has declined from 175,000 in the 1950s to fewer than 50,000 today, partly because rising rents driven by tourism have made the city unaffordable for locals.

Governments and tourism boards have responded in different ways. Some cities have introduced tourist taxes, charging visitors a nightly fee that funds local services. Others have set visitor limits at sensitive natural or cultural sites. Amsterdam has gone further, actively campaigning to discourage low-budget, short-stay tourists and instead attract visitors who stay longer and contribute more to the local economy.

The debate around budget travel ultimately reflects a deeper question: who benefits from mass tourism, and at what cost? As the industry continues to grow, striking a balance between accessibility and sustainability will be the defining challenge of the coming decades.`,
          stimulusLabel: 'Read the article.',
          text: 'What business model did budget airlines introduce, according to the text?',
          options: [
            'A luxury model offering premium services at low prices.',
            'A no-frills model that removed extras and reduced ticket costs.',
            'A subscription model where passengers pay a monthly travel fee.',
            'A cooperative model where passengers share the cost of flights.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          stimulus: `Budget Travel: Changing the World of Tourism

Twenty years ago, traveling internationally was a privilege reserved for those with significant financial resources. Transatlantic flights cost hundreds of dollars, and the idea of spending a weekend in a foreign capital seemed unrealistic for most ordinary people. Today, that picture has changed dramatically.

The rise of budget airlines has been one of the most significant forces reshaping global tourism. Carriers such as Ryanair in Europe and IndiGo in Asia introduced a no-frills model that stripped away extras — meals, assigned seating, and generous baggage allowances — and passed the savings on to customers. As a result, the number of international tourists worldwide jumped from 435 million in 1990 to over 1.4 billion in 2019, according to the World Tourism Organization.

But this democratization of travel has not come without consequences. Popular destinations such as Barcelona, Venice, and Bali have struggled with overtourism — the phenomenon where excessive visitor numbers put pressure on infrastructure, raise living costs for local residents, and damage natural environments. In Venice, the resident population has declined from 175,000 in the 1950s to fewer than 50,000 today, partly because rising rents driven by tourism have made the city unaffordable for locals.

Governments and tourism boards have responded in different ways. Some cities have introduced tourist taxes, charging visitors a nightly fee that funds local services. Others have set visitor limits at sensitive natural or cultural sites. Amsterdam has gone further, actively campaigning to discourage low-budget, short-stay tourists and instead attract visitors who stay longer and contribute more to the local economy.

The debate around budget travel ultimately reflects a deeper question: who benefits from mass tourism, and at what cost? As the industry continues to grow, striking a balance between accessibility and sustainability will be the defining challenge of the coming decades.`,
          stimulusLabel: 'Read the article.',
          text: 'Why has Venice\'s resident population declined significantly?',
          options: [
            'Because of a major earthquake that destroyed much of the city.',
            'Because many residents left to find work in other countries.',
            'Because rising rents driven by tourism made the city too expensive for locals.',
            'Because the government relocated residents to build more hotels.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          stimulus: `Budget Travel: Changing the World of Tourism

Twenty years ago, traveling internationally was a privilege reserved for those with significant financial resources. Transatlantic flights cost hundreds of dollars, and the idea of spending a weekend in a foreign capital seemed unrealistic for most ordinary people. Today, that picture has changed dramatically.

The rise of budget airlines has been one of the most significant forces reshaping global tourism. Carriers such as Ryanair in Europe and IndiGo in Asia introduced a no-frills model that stripped away extras — meals, assigned seating, and generous baggage allowances — and passed the savings on to customers. As a result, the number of international tourists worldwide jumped from 435 million in 1990 to over 1.4 billion in 2019, according to the World Tourism Organization.

But this democratization of travel has not come without consequences. Popular destinations such as Barcelona, Venice, and Bali have struggled with overtourism — the phenomenon where excessive visitor numbers put pressure on infrastructure, raise living costs for local residents, and damage natural environments. In Venice, the resident population has declined from 175,000 in the 1950s to fewer than 50,000 today, partly because rising rents driven by tourism have made the city unaffordable for locals.

Governments and tourism boards have responded in different ways. Some cities have introduced tourist taxes, charging visitors a nightly fee that funds local services. Others have set visitor limits at sensitive natural or cultural sites. Amsterdam has gone further, actively campaigning to discourage low-budget, short-stay tourists and instead attract visitors who stay longer and contribute more to the local economy.

The debate around budget travel ultimately reflects a deeper question: who benefits from mass tourism, and at what cost? As the industry continues to grow, striking a balance between accessibility and sustainability will be the defining challenge of the coming decades.`,
          stimulusLabel: 'Read the article.',
          text: 'What strategy has Amsterdam adopted to manage tourism?',
          options: [
            'Building more budget hotels to accommodate more visitors.',
            'Closing the city to international tourists during peak season.',
            'Discouraging short-stay tourists and attracting those who spend more time and money.',
            'Introducing a ban on all budget airlines operating to the city.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          stimulus: `Budget Travel: Changing the World of Tourism

Twenty years ago, traveling internationally was a privilege reserved for those with significant financial resources. Transatlantic flights cost hundreds of dollars, and the idea of spending a weekend in a foreign capital seemed unrealistic for most ordinary people. Today, that picture has changed dramatically.

The rise of budget airlines has been one of the most significant forces reshaping global tourism. Carriers such as Ryanair in Europe and IndiGo in Asia introduced a no-frills model that stripped away extras — meals, assigned seating, and generous baggage allowances — and passed the savings on to customers. As a result, the number of international tourists worldwide jumped from 435 million in 1990 to over 1.4 billion in 2019, according to the World Tourism Organization.

But this democratization of travel has not come without consequences. Popular destinations such as Barcelona, Venice, and Bali have struggled with overtourism — the phenomenon where excessive visitor numbers put pressure on infrastructure, raise living costs for local residents, and damage natural environments. In Venice, the resident population has declined from 175,000 in the 1950s to fewer than 50,000 today, partly because rising rents driven by tourism have made the city unaffordable for locals.

Governments and tourism boards have responded in different ways. Some cities have introduced tourist taxes, charging visitors a nightly fee that funds local services. Others have set visitor limits at sensitive natural or cultural sites. Amsterdam has gone further, actively campaigning to discourage low-budget, short-stay tourists and instead attract visitors who stay longer and contribute more to the local economy.

The debate around budget travel ultimately reflects a deeper question: who benefits from mass tourism, and at what cost? As the industry continues to grow, striking a balance between accessibility and sustainability will be the defining challenge of the coming decades.`,
          stimulusLabel: 'Read the article.',
          text: 'The word "democratization" as used in the text suggests that affordable travel:',
          options: [
            'Was created by democratic governments.',
            'Made travel possible for a wider range of people.',
            'Reduced the quality of the tourism experience.',
            'Eliminated all differences between social classes.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q6',
          part: 6,
          stimulus: `Budget Travel: Changing the World of Tourism

Twenty years ago, traveling internationally was a privilege reserved for those with significant financial resources. Transatlantic flights cost hundreds of dollars, and the idea of spending a weekend in a foreign capital seemed unrealistic for most ordinary people. Today, that picture has changed dramatically.

The rise of budget airlines has been one of the most significant forces reshaping global tourism. Carriers such as Ryanair in Europe and IndiGo in Asia introduced a no-frills model that stripped away extras — meals, assigned seating, and generous baggage allowances — and passed the savings on to customers. As a result, the number of international tourists worldwide jumped from 435 million in 1990 to over 1.4 billion in 2019, according to the World Tourism Organization.

But this democratization of travel has not come without consequences. Popular destinations such as Barcelona, Venice, and Bali have struggled with overtourism — the phenomenon where excessive visitor numbers put pressure on infrastructure, raise living costs for local residents, and damage natural environments. In Venice, the resident population has declined from 175,000 in the 1950s to fewer than 50,000 today, partly because rising rents driven by tourism have made the city unaffordable for locals.

Governments and tourism boards have responded in different ways. Some cities have introduced tourist taxes, charging visitors a nightly fee that funds local services. Others have set visitor limits at sensitive natural or cultural sites. Amsterdam has gone further, actively campaigning to discourage low-budget, short-stay tourists and instead attract visitors who stay longer and contribute more to the local economy.

The debate around budget travel ultimately reflects a deeper question: who benefits from mass tourism, and at what cost? As the industry continues to grow, striking a balance between accessibility and sustainability will be the defining challenge of the coming decades.`,
          stimulusLabel: 'Read the article.',
          text: 'What does the text say tourist taxes are used for?',
          options: [
            'To fund budget airline routes.',
            'To finance local services.',
            'To compensate residents who move away.',
            'To build new airports.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q7',
          part: 6,
          stimulus: `Budget Travel: Changing the World of Tourism

Twenty years ago, traveling internationally was a privilege reserved for those with significant financial resources. Transatlantic flights cost hundreds of dollars, and the idea of spending a weekend in a foreign capital seemed unrealistic for most ordinary people. Today, that picture has changed dramatically.

The rise of budget airlines has been one of the most significant forces reshaping global tourism. Carriers such as Ryanair in Europe and IndiGo in Asia introduced a no-frills model that stripped away extras — meals, assigned seating, and generous baggage allowances — and passed the savings on to customers. As a result, the number of international tourists worldwide jumped from 435 million in 1990 to over 1.4 billion in 2019, according to the World Tourism Organization.

But this democratization of travel has not come without consequences. Popular destinations such as Barcelona, Venice, and Bali have struggled with overtourism — the phenomenon where excessive visitor numbers put pressure on infrastructure, raise living costs for local residents, and damage natural environments. In Venice, the resident population has declined from 175,000 in the 1950s to fewer than 50,000 today, partly because rising rents driven by tourism have made the city unaffordable for locals.

Governments and tourism boards have responded in different ways. Some cities have introduced tourist taxes, charging visitors a nightly fee that funds local services. Others have set visitor limits at sensitive natural or cultural sites. Amsterdam has gone further, actively campaigning to discourage low-budget, short-stay tourists and instead attract visitors who stay longer and contribute more to the local economy.

The debate around budget travel ultimately reflects a deeper question: who benefits from mass tourism, and at what cost? As the industry continues to grow, striking a balance between accessibility and sustainability will be the defining challenge of the coming decades.`,
          stimulusLabel: 'Read the article.',
          text: 'What does the author identify as the defining challenge for the tourism industry in the coming decades?',
          options: [
            'Building enough airports to handle growing passenger numbers.',
            'Training more travel agents and tour guides.',
            'Balancing accessibility and sustainability in mass tourism.',
            'Convincing governments to remove tourist taxes.',
          ],
          answer: 2,
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
          stimulus: `Do Tourist Resorts Harm Local Communities?

Every year, millions of tourists flock to beach resorts, mountain retreats, and island destinations in search of relaxation. The resorts that cater to them promise comfort, luxury, and a seamless experience — but at what cost to the communities that host them?

I argue that large, all-inclusive tourist resorts frequently do more harm than good to local populations. When travelers book an all-inclusive package, they pay one price upfront and spend almost everything within the resort — food, drinks, entertainment, and excursions. The money stays inside the resort gates and rarely reaches local restaurants, market vendors, taxi drivers, or artisans. Studies in the Caribbean have shown that for every dollar spent at an all-inclusive resort, less than twenty cents enters the local economy.

Beyond economics, there is the issue of land and resources. Large resorts often occupy prime coastal land that was once accessible to local fishermen and families. When a private resort claims a beach, local residents lose access to a resource they have used for generations. Water and electricity consumption at luxury resorts is also significantly higher than in surrounding communities, straining limited infrastructure and driving up costs for everyone.

Supporters of resorts argue that they create jobs. This is true, but most positions are low-paid service roles, while management and ownership remain in the hands of foreign corporations. The profits flow abroad, and local workers have little opportunity to advance.

What communities really need is a different kind of tourism — one that distributes its benefits more widely. Homestays, locally owned guesthouses, and community-led tours keep money circulating within the economy and allow residents to shape how their territory is presented to the world. Until the tourism industry embraces this model more seriously, local communities will continue to bear the costs while others collect the rewards.`,
          stimulusLabel: 'Read the opinion article.',
          text: "What is the author's main claim in this text?",
          options: [
            'Tourism should be completely banned in developing countries.',
            'Large all-inclusive resorts often harm local communities more than they help them.',
            'Tourist resorts create so many jobs that their benefits outweigh all negatives.',
            'Tourists should pay higher prices to stay in luxury resorts.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          stimulus: `Do Tourist Resorts Harm Local Communities?

Every year, millions of tourists flock to beach resorts, mountain retreats, and island destinations in search of relaxation. The resorts that cater to them promise comfort, luxury, and a seamless experience — but at what cost to the communities that host them?

I argue that large, all-inclusive tourist resorts frequently do more harm than good to local populations. When travelers book an all-inclusive package, they pay one price upfront and spend almost everything within the resort — food, drinks, entertainment, and excursions. The money stays inside the resort gates and rarely reaches local restaurants, market vendors, taxi drivers, or artisans. Studies in the Caribbean have shown that for every dollar spent at an all-inclusive resort, less than twenty cents enters the local economy.

Beyond economics, there is the issue of land and resources. Large resorts often occupy prime coastal land that was once accessible to local fishermen and families. When a private resort claims a beach, local residents lose access to a resource they have used for generations. Water and electricity consumption at luxury resorts is also significantly higher than in surrounding communities, straining limited infrastructure and driving up costs for everyone.

Supporters of resorts argue that they create jobs. This is true, but most positions are low-paid service roles, while management and ownership remain in the hands of foreign corporations. The profits flow abroad, and local workers have little opportunity to advance.

What communities really need is a different kind of tourism — one that distributes its benefits more widely. Homestays, locally owned guesthouses, and community-led tours keep money circulating within the economy and allow residents to shape how their territory is presented to the world. Until the tourism industry embraces this model more seriously, local communities will continue to bear the costs while others collect the rewards.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'According to the author, what happens to most of the money spent at all-inclusive resorts?',
          options: [
            'It is donated to local charities.',
            'It is shared equally between the resort and local businesses.',
            'It stays within the resort and rarely reaches the local economy.',
            'It is used to improve local roads and infrastructure.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          stimulus: `Do Tourist Resorts Harm Local Communities?

Every year, millions of tourists flock to beach resorts, mountain retreats, and island destinations in search of relaxation. The resorts that cater to them promise comfort, luxury, and a seamless experience — but at what cost to the communities that host them?

I argue that large, all-inclusive tourist resorts frequently do more harm than good to local populations. When travelers book an all-inclusive package, they pay one price upfront and spend almost everything within the resort — food, drinks, entertainment, and excursions. The money stays inside the resort gates and rarely reaches local restaurants, market vendors, taxi drivers, or artisans. Studies in the Caribbean have shown that for every dollar spent at an all-inclusive resort, less than twenty cents enters the local economy.

Beyond economics, there is the issue of land and resources. Large resorts often occupy prime coastal land that was once accessible to local fishermen and families. When a private resort claims a beach, local residents lose access to a resource they have used for generations. Water and electricity consumption at luxury resorts is also significantly higher than in surrounding communities, straining limited infrastructure and driving up costs for everyone.

Supporters of resorts argue that they create jobs. This is true, but most positions are low-paid service roles, while management and ownership remain in the hands of foreign corporations. The profits flow abroad, and local workers have little opportunity to advance.

What communities really need is a different kind of tourism — one that distributes its benefits more widely. Homestays, locally owned guesthouses, and community-led tours keep money circulating within the economy and allow residents to shape how their territory is presented to the world. Until the tourism industry embraces this model more seriously, local communities will continue to bear the costs while others collect the rewards.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'How does the author address the argument that resorts create jobs?',
          options: [
            'By saying it is completely false.',
            'By admitting it is true but arguing that the jobs are mostly low-paid with limited advancement.',
            'By ignoring this point and focusing only on land use.',
            'By saying that local workers prefer to work in other industries.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          stimulus: `Do Tourist Resorts Harm Local Communities?

Every year, millions of tourists flock to beach resorts, mountain retreats, and island destinations in search of relaxation. The resorts that cater to them promise comfort, luxury, and a seamless experience — but at what cost to the communities that host them?

I argue that large, all-inclusive tourist resorts frequently do more harm than good to local populations. When travelers book an all-inclusive package, they pay one price upfront and spend almost everything within the resort — food, drinks, entertainment, and excursions. The money stays inside the resort gates and rarely reaches local restaurants, market vendors, taxi drivers, or artisans. Studies in the Caribbean have shown that for every dollar spent at an all-inclusive resort, less than twenty cents enters the local economy.

Beyond economics, there is the issue of land and resources. Large resorts often occupy prime coastal land that was once accessible to local fishermen and families. When a private resort claims a beach, local residents lose access to a resource they have used for generations. Water and electricity consumption at luxury resorts is also significantly higher than in surrounding communities, straining limited infrastructure and driving up costs for everyone.

Supporters of resorts argue that they create jobs. This is true, but most positions are low-paid service roles, while management and ownership remain in the hands of foreign corporations. The profits flow abroad, and local workers have little opportunity to advance.

What communities really need is a different kind of tourism — one that distributes its benefits more widely. Homestays, locally owned guesthouses, and community-led tours keep money circulating within the economy and allow residents to shape how their territory is presented to the world. Until the tourism industry embraces this model more seriously, local communities will continue to bear the costs while others collect the rewards.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What type of tourism does the author recommend as an alternative?',
          options: [
            'Luxury cruises that visit multiple destinations.',
            'Government-controlled tourism managed by national parks.',
            'Locally owned guesthouses, homestays, and community-led tours.',
            'Large international hotel chains with more social programs.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          stimulus: `Do Tourist Resorts Harm Local Communities?

Every year, millions of tourists flock to beach resorts, mountain retreats, and island destinations in search of relaxation. The resorts that cater to them promise comfort, luxury, and a seamless experience — but at what cost to the communities that host them?

I argue that large, all-inclusive tourist resorts frequently do more harm than good to local populations. When travelers book an all-inclusive package, they pay one price upfront and spend almost everything within the resort — food, drinks, entertainment, and excursions. The money stays inside the resort gates and rarely reaches local restaurants, market vendors, taxi drivers, or artisans. Studies in the Caribbean have shown that for every dollar spent at an all-inclusive resort, less than twenty cents enters the local economy.

Beyond economics, there is the issue of land and resources. Large resorts often occupy prime coastal land that was once accessible to local fishermen and families. When a private resort claims a beach, local residents lose access to a resource they have used for generations. Water and electricity consumption at luxury resorts is also significantly higher than in surrounding communities, straining limited infrastructure and driving up costs for everyone.

What communities really need is a different kind of tourism — one that distributes its benefits more widely. Homestays, locally owned guesthouses, and community-led tours keep money circulating within the economy and allow residents to shape how their territory is presented to the world. Until the tourism industry embraces this model more seriously, local communities will continue to bear the costs while others collect the rewards.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'The phrase "bear the costs while others collect the rewards" suggests that:',
          options: [
            'Local communities receive the largest share of tourism income.',
            'Tourism is equally beneficial for both resorts and local populations.',
            'Local communities suffer the negative effects while corporations take the profits.',
            'Resort workers are well paid for the difficulties they face.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          stimulus: `Do Tourist Resorts Harm Local Communities?

Every year, millions of tourists flock to beach resorts, mountain retreats, and island destinations in search of relaxation. The resorts that cater to them promise comfort, luxury, and a seamless experience — but at what cost to the communities that host them?

I argue that large, all-inclusive tourist resorts frequently do more harm than good to local populations. When travelers book an all-inclusive package, they pay one price upfront and spend almost everything within the resort — food, drinks, entertainment, and excursions. The money stays inside the resort gates and rarely reaches local restaurants, market vendors, taxi drivers, or artisans. Studies in the Caribbean have shown that for every dollar spent at an all-inclusive resort, less than twenty cents enters the local economy.

Beyond economics, there is the issue of land and resources. Large resorts often occupy prime coastal land that was once accessible to local fishermen and families. When a private resort claims a beach, local residents lose access to a resource they have used for generations. Water and electricity consumption at luxury resorts is also significantly higher than in surrounding communities, straining limited infrastructure and driving up costs for everyone.

Supporters of resorts argue that they create jobs. This is true, but most positions are low-paid service roles, while management and ownership remain in the hands of foreign corporations. The profits flow abroad, and local workers have little opportunity to advance.

What communities really need is a different kind of tourism — one that distributes its benefits more widely. Homestays, locally owned guesthouses, and community-led tours keep money circulating within the economy and allow residents to shape how their territory is presented to the world. Until the tourism industry embraces this model more seriously, local communities will continue to bear the costs while others collect the rewards.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What does the author mean when saying resorts occupy "prime coastal land"?',
          options: [
            'The land is very cheap and easy to develop.',
            'The land is located far from the ocean.',
            'The land is in a highly desirable location, previously used by local residents.',
            'The land was purchased legally from the local government.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          stimulus: `Do Tourist Resorts Harm Local Communities?

Every year, millions of tourists flock to beach resorts, mountain retreats, and island destinations in search of relaxation. The resorts that cater to them promise comfort, luxury, and a seamless experience — but at what cost to the communities that host them?

I argue that large, all-inclusive tourist resorts frequently do more harm than good to local populations. When travelers book an all-inclusive package, they pay one price upfront and spend almost everything within the resort — food, drinks, entertainment, and excursions. The money stays inside the resort gates and rarely reaches local restaurants, market vendors, taxi drivers, or artisans. Studies in the Caribbean have shown that for every dollar spent at an all-inclusive resort, less than twenty cents enters the local economy.

Beyond economics, there is the issue of land and resources. Large resorts often occupy prime coastal land that was once accessible to local fishermen and families. When a private resort claims a beach, local residents lose access to a resource they have used for generations. Water and electricity consumption at luxury resorts is also significantly higher than in surrounding communities, straining limited infrastructure and driving up costs for everyone.

Supporters of resorts argue that they create jobs. This is true, but most positions are low-paid service roles, while management and ownership remain in the hands of foreign corporations. The profits flow abroad, and local workers have little opportunity to advance.

What communities really need is a different kind of tourism — one that distributes its benefits more widely. Homestays, locally owned guesthouses, and community-led tours keep money circulating within the economy and allow residents to shape how their territory is presented to the world. Until the tourism industry embraces this model more seriously, local communities will continue to bear the costs while others collect the rewards.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'Which word best describes the author\'s tone throughout this text?',
          options: [
            'Neutral and scientific.',
            'Critical and persuasive.',
            'Optimistic and celebratory.',
            'Uncertain and confused.',
          ],
          answer: 1,
        },
      ],
    },
  ],
};

export default mock;
