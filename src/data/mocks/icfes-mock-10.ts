import type { MockExam } from './types';

const mock: MockExam = {
  id: 'mock-10',
  examSlug: 'icfes',
  title: 'Mock 10 · Emergencias y seguridad',
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
          text: 'An unexpected event that causes serious harm and requires urgent action.',
          options: ['Emergency', 'Routine', 'Holiday', 'Training'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          text: 'A person specially trained to put out fires and rescue people.',
          options: ['Journalist', 'Firefighter', 'Engineer', 'Librarian'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          text: 'To move away from a dangerous place to a safer one.',
          options: ['Arrive', 'Remain', 'Evacuate', 'Explore'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          text: 'A plan prepared in advance to deal with a dangerous situation.',
          options: ['Recipe', 'Schedule', 'Budget', 'Emergency plan'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          text: 'A device that makes a loud noise to warn people of danger.',
          options: ['Compass', 'Calendar', 'Alarm', 'Thermometer'],
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
          stimulus: 'Emergency operator: "Emergency services. What is your emergency?"\nCaller: _______',
          text: 'What is the most appropriate response from the caller?',
          options: [
            '"There is a fire at 45 Oak Street. People need help."',
            '"I am looking for a pharmacy."',
            '"What time do you close?"',
            '"I lost my wallet at the park."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q2',
          part: 2,
          stimulus: 'Teacher: "If the fire alarm sounds, what should students do?"\nStudent: _______',
          text: 'What is the correct answer from the student?',
          options: [
            '"We should continue working until the teacher says to stop."',
            '"We should open all windows."',
            '"We should call the fire department immediately."',
            '"We should leave the building calmly and go to the assembly point."',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q3',
          part: 2,
          stimulus: 'Neighbor: "Did you feel that earthquake last night?"\nPerson A: "Yes! It was frightening. What did you do?"\nNeighbor: _______',
          text: 'What does the neighbor say?',
          options: [
            '"I ran outside immediately."',
            '"I went under the table and covered my head until it stopped."',
            '"I ignored it and went back to sleep."',
            '"I called the emergency services right away."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q4',
          part: 2,
          stimulus: 'Safety officer: "Have you checked the first aid kit recently?"\nEmployee: "No, I haven\'t. Should I?"\nSafety officer: _______',
          text: 'What does the safety officer say?',
          options: [
            '"It is not really necessary."',
            '"Yes, please check it monthly and replace any missing supplies."',
            '"Someone else is responsible for that."',
            '"We will buy a new one next year."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q5',
          part: 2,
          stimulus: 'Guide: "In case of an emergency on board, put on your life jacket before helping others."\nPassenger: _______',
          text: 'What is the most natural response from the passenger?',
          options: [
            '"How expensive are the life jackets?"',
            '"What time does the ship arrive?"',
            '"I am a good swimmer so I will not need one."',
            '"Understood. And where is the nearest emergency exit?"',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q6',
          part: 2,
          stimulus: 'Person A: "What should I do if I see someone unconscious on the street?"\nPerson B: _______',
          text: 'What does Person B say?',
          options: [
            '"Call for help and check if the person is breathing."',
            '"Walk away quickly to avoid trouble."',
            '"Give them food and water immediately."',
            '"Wait for them to wake up on their own."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q7',
          part: 2,
          stimulus: 'Manager: "We are holding a fire drill this Friday at 10 AM."\nEmployee: "Should we evacuate the entire building?"\nManager: _______',
          text: 'What does the manager say?',
          options: [
            '"No, only the managers need to participate."',
            '"We will only test the alarm system."',
            '"Yes, everyone must leave the building and meet at the designated assembly point."',
            '"Only the ground floor needs to evacuate."',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p2q8',
          part: 2,
          stimulus: 'Child: "Mom, what do I do if there is a storm and I am alone at home?"\nMother: _______',
          text: 'What does the mother say?',
          options: [
            '"Go outside and look at the sky."',
            '"Go to the neighbor\'s house immediately."',
            '"Turn on all the lights and open the windows."',
            '"Stay away from windows, do not use the phone during lightning, and call me."',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q9',
          part: 2,
          stimulus: 'Rescuer: "We need volunteers to help distribute food and water after the flood."\nCommunity member: _______',
          text: 'What is the most helpful response?',
          options: [
            '"I prefer to donate money instead."',
            '"Someone else can do it."',
            '"I am available this weekend. Tell me where to go."',
            '"Is there any payment for volunteers?"',
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
          text: 'In case of a fire, you should never _______ the elevator — always use the stairs.',
          options: ['climb', 'use', 'ignore', 'check'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q2',
          part: 3,
          text: 'The rescue team _______ for survivors for three days after the building collapsed.',
          options: ['searched', 'is searching', 'searches', 'will search'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q3',
          part: 3,
          text: 'Residents were asked to _______ the coastal area before the hurricane arrived.',
          options: ['evacuate', 'enter', 'rebuild', 'ignore'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q4',
          part: 3,
          text: 'Every household _______ have a basic emergency kit with water, food, and a flashlight.',
          options: ['could', 'should', 'might', 'would'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q5',
          part: 3,
          text: 'The volunteer organization has _______ hundreds of families affected by the earthquake.',
          options: ['helps', 'helping', 'helped', 'help'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q6',
          part: 3,
          text: 'The government issued a _______ warning to prepare citizens for the approaching storm.',
          options: ['indoor', 'private', 'ancient', 'public'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p3q7',
          part: 3,
          text: 'If you are caught in an earthquake, drop _______ the floor and cover your head.',
          options: ['above', 'toward', 'onto', 'from'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q8',
          part: 3,
          text: 'The firefighters _______ the trapped workers before the roof collapsed.',
          options: ['rescued', 'rescue', 'rescuing', 'have rescue'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q9',
          part: 3,
          text: 'Community preparedness training _______ people how to react safely in different emergency scenarios.',
          options: ['teach', 'teaching', 'taught', 'teaches'],
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
          stimulus: '--- EMERGENCY EVACUATION NOTICE ---\nIn the event of a fire or emergency:\n1. Leave the building immediately using the nearest exit.\n2. Do NOT use elevators.\n3. Go directly to the assembly point in the car park.\n4. Do not re-enter the building until authorities give the all-clear.\n5. Call 911 from outside the building.',
          stimulusLabel: 'Read the evacuation notice.',
          text: 'Where should people gather after leaving the building?',
          options: [
            'At the main entrance.',
            'In the car park.',
            'At the nearest street corner.',
            'In the lobby.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          stimulus: '--- EMERGENCY EVACUATION NOTICE ---\nIn the event of a fire or emergency:\n1. Leave the building immediately using the nearest exit.\n2. Do NOT use elevators.\n3. Go directly to the assembly point in the car park.\n4. Do not re-enter the building until authorities give the all-clear.\n5. Call 911 from outside the building.',
          stimulusLabel: 'Read the evacuation notice.',
          text: 'When is it safe to re-enter the building?',
          options: [
            'After 10 minutes.',
            'When the authorities give the all-clear.',
            'When the fire is visible from outside.',
            'After calling 911.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          stimulus: 'SEVERE WEATHER ALERT\nHurricane Warning: Category 3\nExpected landfall: Saturday 6 AM\nAffected zones: Coastal areas A, B, and C\nResidents in zones A–C must evacuate by Friday 8 PM.\nEmergency shelters open at: City Hall and Central School.\nBring: ID, medication, water, and food for 72 hours.',
          stimulusLabel: 'Read the severe weather alert.',
          text: 'By what time must residents in zones A-C evacuate?',
          options: [
            'Saturday at 6 AM.',
            'Saturday at 8 PM.',
            'Friday at 6 AM.',
            'Friday at 8 PM.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          stimulus: 'SEVERE WEATHER ALERT\nHurricane Warning: Category 3\nExpected landfall: Saturday 6 AM\nAffected zones: Coastal areas A, B, and C\nResidents in zones A–C must evacuate by Friday 8 PM.\nEmergency shelters open at: City Hall and Central School.\nBring: ID, medication, water, and food for 72 hours.',
          stimulusLabel: 'Read the severe weather alert.',
          text: 'What should evacuees bring according to the alert?',
          options: [
            'ID, medication, water, and food for 72 hours.',
            'Only their mobile phones and chargers.',
            'Blankets and extra clothing only.',
            'A full week\'s supply of food and water.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          stimulus: 'FIRST AID REMINDER\nFor burns:\n- Cool the burn under cool (not cold) running water for at least 10 minutes.\n- Do NOT apply butter, toothpaste, or ice.\n- Cover loosely with a clean bandage.\n- Seek medical help for large or deep burns.',
          stimulusLabel: 'Read the first aid reminder.',
          text: 'How long should a burn be held under cool water?',
          options: [
            'At least 5 minutes.',
            'Until the pain stops.',
            'At least 10 minutes.',
            'For 30 seconds.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          stimulus: 'FIRST AID REMINDER\nFor burns:\n- Cool the burn under cool (not cold) running water for at least 10 minutes.\n- Do NOT apply butter, toothpaste, or ice.\n- Cover loosely with a clean bandage.\n- Seek medical help for large or deep burns.',
          stimulusLabel: 'Read the first aid reminder.',
          text: 'What should you NOT apply to a burn?',
          options: [
            'Cool water.',
            'A clean bandage.',
            'Mild pressure.',
            'Butter or toothpaste.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          stimulus: 'COMMUNITY EMERGENCY PREPAREDNESS KIT\nRecommended contents:\n- 3-day water supply (1 gallon per person per day)\n- Non-perishable food items\n- Flashlight with extra batteries\n- First aid kit\n- Copies of important documents\n- Emergency contact list\n- Whistle (to signal for help)',
          stimulusLabel: 'Read the preparedness kit guide.',
          text: 'How much water is recommended per person per day in the kit?',
          options: [
            'Half a gallon.',
            '2 gallons.',
            '1 gallon.',
            '3 gallons.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          stimulus: 'COMMUNITY EMERGENCY PREPAREDNESS KIT\nRecommended contents:\n- 3-day water supply (1 gallon per person per day)\n- Non-perishable food items\n- Flashlight with extra batteries\n- First aid kit\n- Copies of important documents\n- Emergency contact list\n- Whistle (to signal for help)',
          stimulusLabel: 'Read the preparedness kit guide.',
          text: 'What is the whistle used for according to the guide?',
          options: [
            'To scare animals away.',
            'To signal for help.',
            'To communicate with rescuers at night.',
            'To test children\'s hearing.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q9',
          part: 4,
          stimulus: 'ROAD CLOSURE NOTICE\nDue to flood damage:\nEast Bridge Road is CLOSED until further notice.\nAlternative route: Use Highway 7 North via Junction 4.\nEmergency vehicles only: Contact Operations at 555-0199.\nUpdates will be posted at: www.citytransport.gov',
          stimulusLabel: 'Read the road closure notice.',
          text: 'Why is East Bridge Road closed?',
          options: [
            'Due to flood damage.',
            'Due to a traffic accident.',
            'Due to road construction work.',
            'Due to a special event.',
          ],
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
          stimulus: `ShakeReady: A Community Earthquake Preparedness Program

The city of Quito launched ShakeReady in 2022, an initiative designed to prepare families for earthquake emergencies. The program offers free training workshops, home safety inspections, and an emergency kit distribution service for low-income households.

Over 12,000 families participated in the first year. Workshop participants learn how to secure heavy furniture, identify safe zones inside their homes, and practice the "Drop, Cover, and Hold On" technique. Trained volunteers visit schools and community centers to extend the program's reach.

Since ShakeReady began, surveys show that 78% of participating families feel more confident in responding to a seismic event. The program also distributed over 5,000 emergency kits containing water purification tablets, flashlights, first aid supplies, and two-way radios.

City officials plan to expand ShakeReady to neighboring municipalities by 2025, with funding from a national disaster preparedness grant.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main goal of the ShakeReady program?',
          options: [
            'To prepare families to respond to earthquakes.',
            'To rebuild buildings damaged by earthquakes.',
            'To predict when earthquakes will occur.',
            'To relocate residents away from earthquake zones.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          stimulus: `ShakeReady: A Community Earthquake Preparedness Program

The city of Quito launched ShakeReady in 2022, an initiative designed to prepare families for earthquake emergencies. The program offers free training workshops, home safety inspections, and an emergency kit distribution service for low-income households.

Over 12,000 families participated in the first year. Workshop participants learn how to secure heavy furniture, identify safe zones inside their homes, and practice the "Drop, Cover, and Hold On" technique. Trained volunteers visit schools and community centers to extend the program's reach.

Since ShakeReady began, surveys show that 78% of participating families feel more confident in responding to a seismic event. The program also distributed over 5,000 emergency kits containing water purification tablets, flashlights, first aid supplies, and two-way radios.

City officials plan to expand ShakeReady to neighboring municipalities by 2025, with funding from a national disaster preparedness grant.`,
          stimulusLabel: 'Read the article.',
          text: 'Which technique do participants learn during the workshops?',
          options: [
            '"Stop, Drop, and Roll"',
            '"Drop, Cover, and Hold On"',
            '"Run, Hide, and Wait"',
            '"Shelter, Signal, and Survive"',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          stimulus: `ShakeReady: A Community Earthquake Preparedness Program

The city of Quito launched ShakeReady in 2022, an initiative designed to prepare families for earthquake emergencies. The program offers free training workshops, home safety inspections, and an emergency kit distribution service for low-income households.

Over 12,000 families participated in the first year. Workshop participants learn how to secure heavy furniture, identify safe zones inside their homes, and practice the "Drop, Cover, and Hold On" technique. Trained volunteers visit schools and community centers to extend the program's reach.

Since ShakeReady began, surveys show that 78% of participating families feel more confident in responding to a seismic event. The program also distributed over 5,000 emergency kits containing water purification tablets, flashlights, first aid supplies, and two-way radios.

City officials plan to expand ShakeReady to neighboring municipalities by 2025, with funding from a national disaster preparedness grant.`,
          stimulusLabel: 'Read the article.',
          text: 'According to surveys, what percentage of participating families feel more confident after joining ShakeReady?',
          options: ['62%', '85%', '78%', '92%'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          stimulus: `ShakeReady: A Community Earthquake Preparedness Program

The city of Quito launched ShakeReady in 2022, an initiative designed to prepare families for earthquake emergencies. The program offers free training workshops, home safety inspections, and an emergency kit distribution service for low-income households.

Over 12,000 families participated in the first year. Workshop participants learn how to secure heavy furniture, identify safe zones inside their homes, and practice the "Drop, Cover, and Hold On" technique. Trained volunteers visit schools and community centers to extend the program's reach.

Since ShakeReady began, surveys show that 78% of participating families feel more confident in responding to a seismic event. The program also distributed over 5,000 emergency kits containing water purification tablets, flashlights, first aid supplies, and two-way radios.

City officials plan to expand ShakeReady to neighboring municipalities by 2025, with funding from a national disaster preparedness grant.`,
          stimulusLabel: 'Read the article.',
          text: 'What does the emergency kit NOT contain according to the text?',
          options: [
            'Flashlights.',
            'First aid supplies.',
            'Water purification tablets.',
            'A portable generator.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          stimulus: `ShakeReady: A Community Earthquake Preparedness Program

The city of Quito launched ShakeReady in 2022, an initiative designed to prepare families for earthquake emergencies. The program offers free training workshops, home safety inspections, and an emergency kit distribution service for low-income households.

Over 12,000 families participated in the first year. Workshop participants learn how to secure heavy furniture, identify safe zones inside their homes, and practice the "Drop, Cover, and Hold On" technique. Trained volunteers visit schools and community centers to extend the program's reach.

Since ShakeReady began, surveys show that 78% of participating families feel more confident in responding to a seismic event. The program also distributed over 5,000 emergency kits containing water purification tablets, flashlights, first aid supplies, and two-way radios.

City officials plan to expand ShakeReady to neighboring municipalities by 2025, with funding from a national disaster preparedness grant.`,
          stimulusLabel: 'Read the article.',
          text: 'What are the plans for ShakeReady by 2025?',
          options: [
            'To close the program after completing its initial goals.',
            'To become a private company charging for its services.',
            'To expand to neighboring municipalities.',
            'To focus exclusively on school programs.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          stimulus: `ShakeReady: A Community Earthquake Preparedness Program

The city of Quito launched ShakeReady in 2022, an initiative designed to prepare families for earthquake emergencies. The program offers free training workshops, home safety inspections, and an emergency kit distribution service for low-income households.

Over 12,000 families participated in the first year. Workshop participants learn how to secure heavy furniture, identify safe zones inside their homes, and practice the "Drop, Cover, and Hold On" technique. Trained volunteers visit schools and community centers to extend the program's reach.

Since ShakeReady began, surveys show that 78% of participating families feel more confident in responding to a seismic event. The program also distributed over 5,000 emergency kits containing water purification tablets, flashlights, first aid supplies, and two-way radios.

City officials plan to expand ShakeReady to neighboring municipalities by 2025, with funding from a national disaster preparedness grant.`,
          stimulusLabel: 'Read the article.',
          text: 'The word "seismic" in the text relates to:',
          options: ['Earthquakes', 'Flooding', 'Hurricanes', 'Fires'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          stimulus: `ShakeReady: A Community Earthquake Preparedness Program

The city of Quito launched ShakeReady in 2022, an initiative designed to prepare families for earthquake emergencies. The program offers free training workshops, home safety inspections, and an emergency kit distribution service for low-income households.

Over 12,000 families participated in the first year. Workshop participants learn how to secure heavy furniture, identify safe zones inside their homes, and practice the "Drop, Cover, and Hold On" technique. Trained volunteers visit schools and community centers to extend the program's reach.

Since ShakeReady began, surveys show that 78% of participating families feel more confident in responding to a seismic event. The program also distributed over 5,000 emergency kits containing water purification tablets, flashlights, first aid supplies, and two-way radios.

City officials plan to expand ShakeReady to neighboring municipalities by 2025, with funding from a national disaster preparedness grant.`,
          stimulusLabel: 'Read the article.',
          text: 'How does ShakeReady reach people who cannot attend workshops at community centers?',
          options: [
            'Through television advertisements.',
            'By sending brochures to every household.',
            'By offering online video courses.',
            'Through trained volunteers who visit schools and centers.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q8',
          part: 5,
          stimulus: `ShakeReady: A Community Earthquake Preparedness Program

The city of Quito launched ShakeReady in 2022, an initiative designed to prepare families for earthquake emergencies. The program offers free training workshops, home safety inspections, and an emergency kit distribution service for low-income households.

Over 12,000 families participated in the first year. Workshop participants learn how to secure heavy furniture, identify safe zones inside their homes, and practice the "Drop, Cover, and Hold On" technique. Trained volunteers visit schools and community centers to extend the program's reach.

Since ShakeReady began, surveys show that 78% of participating families feel more confident in responding to a seismic event. The program also distributed over 5,000 emergency kits containing water purification tablets, flashlights, first aid supplies, and two-way radios.

City officials plan to expand ShakeReady to neighboring municipalities by 2025, with funding from a national disaster preparedness grant.`,
          stimulusLabel: 'Read the article.',
          text: 'What can be inferred about the ShakeReady program from the information given?',
          options: [
            'The program has not had a measurable impact yet.',
            'The program has been considered successful and is being expanded.',
            'The program is only available to wealthy families.',
            'The program will be replaced by a national government initiative.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q9',
          part: 5,
          stimulus: `ShakeReady: A Community Earthquake Preparedness Program

The city of Quito launched ShakeReady in 2022, an initiative designed to prepare families for earthquake emergencies. The program offers free training workshops, home safety inspections, and an emergency kit distribution service for low-income households.

Over 12,000 families participated in the first year. Workshop participants learn how to secure heavy furniture, identify safe zones inside their homes, and practice the "Drop, Cover, and Hold On" technique. Trained volunteers visit schools and community centers to extend the program's reach.

Since ShakeReady began, surveys show that 78% of participating families feel more confident in responding to a seismic event. The program also distributed over 5,000 emergency kits containing water purification tablets, flashlights, first aid supplies, and two-way radios.

City officials plan to expand ShakeReady to neighboring municipalities by 2025, with funding from a national disaster preparedness grant.`,
          stimulusLabel: 'Read the article.',
          text: 'Who specifically receives emergency kits from the ShakeReady program?',
          options: [
            'All families in Quito.',
            'Low-income households.',
            'Families living in earthquake zones only.',
            'Families with children under 12.',
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
          stimulus: `When the Waters Rise: Cities and the Challenge of Flood Preparedness

As climate change intensifies, floods have become one of the most frequent and destructive natural disasters facing cities worldwide. In 2021 alone, floods caused over $80 billion in damages globally, displacing millions of people and destroying homes, infrastructure, and livelihoods. Yet despite this clear and growing threat, many cities remain poorly prepared.

Urban flooding occurs when rainfall overwhelms drainage systems, when rivers burst their banks, or when sea levels rise. Cities built on flat coastal land or near rivers are particularly vulnerable. The challenge is made worse by rapid urbanization: as concrete and asphalt replace natural land, there is less soil to absorb rainwater, increasing runoff and flood risk.

Forward-thinking cities are adopting what experts call "sponge city" strategies — designing urban spaces to absorb, store, and reuse water rather than simply drain it away. In Wuhan, China, authorities have created artificial wetlands, permeable pavements, and green roofs to manage rainfall naturally. Rotterdam, in the Netherlands, has built underground water storage plazas that function as parks during dry periods and flood retention basins during storms.

Early warning systems are equally critical. Bangladesh has one of the world's most effective storm surge warning systems, reducing flood-related deaths by over 90% in the last 40 years — not by stopping floods, but by ensuring people receive timely warnings and can evacuate safely.

Community preparedness also matters. In Japan, local disaster management committees work year-round to maintain evacuation routes, conduct drills, and ensure that all residents — including the elderly and disabled — know exactly what to do when disaster strikes.

The lesson is that flood resilience is not a luxury. It requires sustained investment, smart urban planning, and community engagement. Cities that treat preparedness as optional will pay a far higher price when the waters rise.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main argument of the text?',
          options: [
            'Floods cannot be prevented and cities should accept the damage.',
            'Underground storage systems are the only solution to urban flooding.',
            'Only coastal cities need to worry about flooding.',
            'Cities must invest in flood preparedness through planning, technology, and community action.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          stimulus: `When the Waters Rise: Cities and the Challenge of Flood Preparedness

As climate change intensifies, floods have become one of the most frequent and destructive natural disasters facing cities worldwide. In 2021 alone, floods caused over $80 billion in damages globally, displacing millions of people and destroying homes, infrastructure, and livelihoods. Yet despite this clear and growing threat, many cities remain poorly prepared.

Urban flooding occurs when rainfall overwhelms drainage systems, when rivers burst their banks, or when sea levels rise. Cities built on flat coastal land or near rivers are particularly vulnerable. The challenge is made worse by rapid urbanization: as concrete and asphalt replace natural land, there is less soil to absorb rainwater, increasing runoff and flood risk.

Forward-thinking cities are adopting what experts call "sponge city" strategies — designing urban spaces to absorb, store, and reuse water rather than simply drain it away. In Wuhan, China, authorities have created artificial wetlands, permeable pavements, and green roofs to manage rainfall naturally. Rotterdam, in the Netherlands, has built underground water storage plazas that function as parks during dry periods and flood retention basins during storms.

Early warning systems are equally critical. Bangladesh has one of the world's most effective storm surge warning systems, reducing flood-related deaths by over 90% in the last 40 years — not by stopping floods, but by ensuring people receive timely warnings and can evacuate safely.

Community preparedness also matters. In Japan, local disaster management committees work year-round to maintain evacuation routes, conduct drills, and ensure that all residents — including the elderly and disabled — know exactly what to do when disaster strikes.

The lesson is that flood resilience is not a luxury. It requires sustained investment, smart urban planning, and community engagement. Cities that treat preparedness as optional will pay a far higher price when the waters rise.`,
          stimulusLabel: 'Read the article.',
          text: 'According to the text, why does urbanization increase flood risk?',
          options: [
            'Because concrete replaces natural soil that would absorb water.',
            'Because cities attract more rainfall than rural areas.',
            'Because cities use too much underground water.',
            'Because urban trees are removed and replaced by rivers.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          stimulus: `When the Waters Rise: Cities and the Challenge of Flood Preparedness

As climate change intensifies, floods have become one of the most frequent and destructive natural disasters facing cities worldwide. In 2021 alone, floods caused over $80 billion in damages globally, displacing millions of people and destroying homes, infrastructure, and livelihoods. Yet despite this clear and growing threat, many cities remain poorly prepared.

Urban flooding occurs when rainfall overwhelms drainage systems, when rivers burst their banks, or when sea levels rise. Cities built on flat coastal land or near rivers are particularly vulnerable. The challenge is made worse by rapid urbanization: as concrete and asphalt replace natural land, there is less soil to absorb rainwater, increasing runoff and flood risk.

Forward-thinking cities are adopting what experts call "sponge city" strategies — designing urban spaces to absorb, store, and reuse water rather than simply drain it away. In Wuhan, China, authorities have created artificial wetlands, permeable pavements, and green roofs to manage rainfall naturally. Rotterdam, in the Netherlands, has built underground water storage plazas that function as parks during dry periods and flood retention basins during storms.

Early warning systems are equally critical. Bangladesh has one of the world's most effective storm surge warning systems, reducing flood-related deaths by over 90% in the last 40 years — not by stopping floods, but by ensuring people receive timely warnings and can evacuate safely.

Community preparedness also matters. In Japan, local disaster management committees work year-round to maintain evacuation routes, conduct drills, and ensure that all residents — including the elderly and disabled — know exactly what to do when disaster strikes.

The lesson is that flood resilience is not a luxury. It requires sustained investment, smart urban planning, and community engagement. Cities that treat preparedness as optional will pay a far higher price when the waters rise.`,
          stimulusLabel: 'Read the article.',
          text: 'What is a "sponge city" strategy designed to do?',
          options: [
            'Build taller seawalls around coastal areas.',
            'Move cities away from rivers and coastlines.',
            'Make cities absorb, store, and reuse water rather than just drain it.',
            'Eliminate all rainfall through cloud-seeding technology.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          stimulus: `When the Waters Rise: Cities and the Challenge of Flood Preparedness

As climate change intensifies, floods have become one of the most frequent and destructive natural disasters facing cities worldwide. In 2021 alone, floods caused over $80 billion in damages globally, displacing millions of people and destroying homes, infrastructure, and livelihoods. Yet despite this clear and growing threat, many cities remain poorly prepared.

Urban flooding occurs when rainfall overwhelms drainage systems, when rivers burst their banks, or when sea levels rise. Cities built on flat coastal land or near rivers are particularly vulnerable. The challenge is made worse by rapid urbanization: as concrete and asphalt replace natural land, there is less soil to absorb rainwater, increasing runoff and flood risk.

Forward-thinking cities are adopting what experts call "sponge city" strategies — designing urban spaces to absorb, store, and reuse water rather than simply drain it away. In Wuhan, China, authorities have created artificial wetlands, permeable pavements, and green roofs to manage rainfall naturally. Rotterdam, in the Netherlands, has built underground water storage plazas that function as parks during dry periods and flood retention basins during storms.

Early warning systems are equally critical. Bangladesh has one of the world's most effective storm surge warning systems, reducing flood-related deaths by over 90% in the last 40 years — not by stopping floods, but by ensuring people receive timely warnings and can evacuate safely.

Community preparedness also matters. In Japan, local disaster management committees work year-round to maintain evacuation routes, conduct drills, and ensure that all residents — including the elderly and disabled — know exactly what to do when disaster strikes.

The lesson is that flood resilience is not a luxury. It requires sustained investment, smart urban planning, and community engagement. Cities that treat preparedness as optional will pay a far higher price when the waters rise.`,
          stimulusLabel: 'Read the article.',
          text: 'How has Bangladesh\'s early warning system reduced flood deaths?',
          options: [
            'By stopping floods from occurring.',
            'By building permanent flood barriers.',
            'By relocating all coastal residents inland.',
            'By giving people timely warnings so they can evacuate.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          stimulus: `When the Waters Rise: Cities and the Challenge of Flood Preparedness

As climate change intensifies, floods have become one of the most frequent and destructive natural disasters facing cities worldwide. In 2021 alone, floods caused over $80 billion in damages globally, displacing millions of people and destroying homes, infrastructure, and livelihoods. Yet despite this clear and growing threat, many cities remain poorly prepared.

Urban flooding occurs when rainfall overwhelms drainage systems, when rivers burst their banks, or when sea levels rise. Cities built on flat coastal land or near rivers are particularly vulnerable. The challenge is made worse by rapid urbanization: as concrete and asphalt replace natural land, there is less soil to absorb rainwater, increasing runoff and flood risk.

Forward-thinking cities are adopting what experts call "sponge city" strategies — designing urban spaces to absorb, store, and reuse water rather than simply drain it away. In Wuhan, China, authorities have created artificial wetlands, permeable pavements, and green roofs to manage rainfall naturally. Rotterdam, in the Netherlands, has built underground water storage plazas that function as parks during dry periods and flood retention basins during storms.

Early warning systems are equally critical. Bangladesh has one of the world's most effective storm surge warning systems, reducing flood-related deaths by over 90% in the last 40 years — not by stopping floods, but by ensuring people receive timely warnings and can evacuate safely.

Community preparedness also matters. In Japan, local disaster management committees work year-round to maintain evacuation routes, conduct drills, and ensure that all residents — including the elderly and disabled — know exactly what to do when disaster strikes.

The lesson is that flood resilience is not a luxury. It requires sustained investment, smart urban planning, and community engagement. Cities that treat preparedness as optional will pay a far higher price when the waters rise.`,
          stimulusLabel: 'Read the article.',
          text: 'What role do community committees play in Japan\'s disaster preparedness?',
          options: [
            'They build flood barriers and drainage systems.',
            'They provide financial compensation after disasters.',
            'They maintain evacuation routes, run drills, and inform all residents.',
            'They monitor rainfall levels and issue warnings.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q6',
          part: 6,
          stimulus: `When the Waters Rise: Cities and the Challenge of Flood Preparedness

As climate change intensifies, floods have become one of the most frequent and destructive natural disasters facing cities worldwide. In 2021 alone, floods caused over $80 billion in damages globally, displacing millions of people and destroying homes, infrastructure, and livelihoods. Yet despite this clear and growing threat, many cities remain poorly prepared.

Urban flooding occurs when rainfall overwhelms drainage systems, when rivers burst their banks, or when sea levels rise. Cities built on flat coastal land or near rivers are particularly vulnerable. The challenge is made worse by rapid urbanization: as concrete and asphalt replace natural land, there is less soil to absorb rainwater, increasing runoff and flood risk.

Forward-thinking cities are adopting what experts call "sponge city" strategies — designing urban spaces to absorb, store, and reuse water rather than simply drain it away. In Wuhan, China, authorities have created artificial wetlands, permeable pavements, and green roofs to manage rainfall naturally. Rotterdam, in the Netherlands, has built underground water storage plazas that function as parks during dry periods and flood retention basins during storms.

Early warning systems are equally critical. Bangladesh has one of the world's most effective storm surge warning systems, reducing flood-related deaths by over 90% in the last 40 years — not by stopping floods, but by ensuring people receive timely warnings and can evacuate safely.

Community preparedness also matters. In Japan, local disaster management committees work year-round to maintain evacuation routes, conduct drills, and ensure that all residents — including the elderly and disabled — know exactly what to do when disaster strikes.

The lesson is that flood resilience is not a luxury. It requires sustained investment, smart urban planning, and community engagement. Cities that treat preparedness as optional will pay a far higher price when the waters rise.`,
          stimulusLabel: 'Read the article.',
          text: 'The phrase "cities that treat preparedness as optional will pay a far higher price" suggests:',
          options: [
            'Emergency planning is cheap and easy.',
            'Ignoring flood preparedness leads to greater harm and cost when flooding occurs.',
            'Only wealthy cities can afford flood resilience measures.',
            'The cost of floods is always predictable and manageable.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q7',
          part: 6,
          stimulus: `When the Waters Rise: Cities and the Challenge of Flood Preparedness

As climate change intensifies, floods have become one of the most frequent and destructive natural disasters facing cities worldwide. In 2021 alone, floods caused over $80 billion in damages globally, displacing millions of people and destroying homes, infrastructure, and livelihoods. Yet despite this clear and growing threat, many cities remain poorly prepared.

Urban flooding occurs when rainfall overwhelms drainage systems, when rivers burst their banks, or when sea levels rise. Cities built on flat coastal land or near rivers are particularly vulnerable. The challenge is made worse by rapid urbanization: as concrete and asphalt replace natural land, there is less soil to absorb rainwater, increasing runoff and flood risk.

Forward-thinking cities are adopting what experts call "sponge city" strategies — designing urban spaces to absorb, store, and reuse water rather than simply drain it away. In Wuhan, China, authorities have created artificial wetlands, permeable pavements, and green roofs to manage rainfall naturally. Rotterdam, in the Netherlands, has built underground water storage plazas that function as parks during dry periods and flood retention basins during storms.

Early warning systems are equally critical. Bangladesh has one of the world's most effective storm surge warning systems, reducing flood-related deaths by over 90% in the last 40 years — not by stopping floods, but by ensuring people receive timely warnings and can evacuate safely.

Community preparedness also matters. In Japan, local disaster management committees work year-round to maintain evacuation routes, conduct drills, and ensure that all residents — including the elderly and disabled — know exactly what to do when disaster strikes.

The lesson is that flood resilience is not a luxury. It requires sustained investment, smart urban planning, and community engagement. Cities that treat preparedness as optional will pay a far higher price when the waters rise.`,
          stimulusLabel: 'Read the article.',
          text: 'What dual purpose do Rotterdam\'s underground water storage plazas serve?',
          options: [
            'They function as parks in dry periods and flood retention basins during storms.',
            'They are used as car parks during floods and markets during dry weather.',
            'They serve as emergency shelters and water filtration centers.',
            'They generate electricity and store drinking water.',
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
          stimulus: `Governments Are Failing Us on Emergency Preparedness

Every few years, a disaster strikes — a hurricane, an earthquake, a flood — and the same scenes play out: overwhelmed emergency services, shortages of food and water, and communities left to fend for themselves for days. And every time, government officials express surprise, sympathy, and promises to do better. Those promises, too often, go unfulfilled.

The truth is uncomfortable: most governments do not invest adequately in emergency preparedness. They respond to disasters generously with money and media attention, but prevention and preparation receive a fraction of that investment. According to the United Nations, every dollar spent on disaster risk reduction saves between four and seven dollars in disaster response costs. Yet the funds consistently flow in the wrong direction.

Part of the problem is political. Emergency preparedness produces no ribbon-cutting moments. There are no grand openings for a well-stocked emergency warehouse or a newly trained community response team. Politicians are rewarded for visible results, not invisible prevention. So preparation is deprioritized in favor of projects that generate votes.

There is also the issue of equity. When disasters strike, the wealthiest communities recover quickly: they have insurance, savings, and the political connections to demand fast government action. Low-income communities suffer longer, with less support. Preparedness investments that target vulnerable communities first could dramatically reduce this inequality — but such programs require political will that is often absent.

I do not argue that governments are malicious — most officials genuinely want to protect their citizens. But good intentions without adequate funding, sustained planning, and accountability produce no real protection. Citizens must demand more, and governments must deliver it — before the next disaster, not after.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What is the author\'s main argument?',
          options: [
            'Emergency preparedness is underfunded and under-prioritized by governments.',
            'Governments should eliminate all disaster response programs.',
            'Natural disasters cannot be predicted or planned for.',
            'Citizens are responsible for their own disaster preparedness.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          stimulus: `Governments Are Failing Us on Emergency Preparedness

Every few years, a disaster strikes — a hurricane, an earthquake, a flood — and the same scenes play out: overwhelmed emergency services, shortages of food and water, and communities left to fend for themselves for days. And every time, government officials express surprise, sympathy, and promises to do better. Those promises, too often, go unfulfilled.

The truth is uncomfortable: most governments do not invest adequately in emergency preparedness. They respond to disasters generously with money and media attention, but prevention and preparation receive a fraction of that investment. According to the United Nations, every dollar spent on disaster risk reduction saves between four and seven dollars in disaster response costs. Yet the funds consistently flow in the wrong direction.

Part of the problem is political. Emergency preparedness produces no ribbon-cutting moments. There are no grand openings for a well-stocked emergency warehouse or a newly trained community response team. Politicians are rewarded for visible results, not invisible prevention. So preparation is deprioritized in favor of projects that generate votes.

There is also the issue of equity. When disasters strike, the wealthiest communities recover quickly: they have insurance, savings, and the political connections to demand fast government action. Low-income communities suffer longer, with less support. Preparedness investments that target vulnerable communities first could dramatically reduce this inequality — but such programs require political will that is often absent.

I do not argue that governments are malicious — most officials genuinely want to protect their citizens. But good intentions without adequate funding, sustained planning, and accountability produce no real protection. Citizens must demand more, and governments must deliver it — before the next disaster, not after.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'According to the United Nations data cited by the author, how much can be saved in disaster response for every dollar spent on prevention?',
          options: [
            '$1 to $2.',
            '$4 to $7.',
            '$2 to $3.',
            '$8 to $10.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          stimulus: `Governments Are Failing Us on Emergency Preparedness

Every few years, a disaster strikes — a hurricane, an earthquake, a flood — and the same scenes play out: overwhelmed emergency services, shortages of food and water, and communities left to fend for themselves for days. And every time, government officials express surprise, sympathy, and promises to do better. Those promises, too often, go unfulfilled.

The truth is uncomfortable: most governments do not invest adequately in emergency preparedness. They respond to disasters generously with money and media attention, but prevention and preparation receive a fraction of that investment. According to the United Nations, every dollar spent on disaster risk reduction saves between four and seven dollars in disaster response costs. Yet the funds consistently flow in the wrong direction.

Part of the problem is political. Emergency preparedness produces no ribbon-cutting moments. There are no grand openings for a well-stocked emergency warehouse or a newly trained community response team. Politicians are rewarded for visible results, not invisible prevention. So preparation is deprioritized in favor of projects that generate votes.

There is also the issue of equity. When disasters strike, the wealthiest communities recover quickly: they have insurance, savings, and the political connections to demand fast government action. Low-income communities suffer longer, with less support. Preparedness investments that target vulnerable communities first could dramatically reduce this inequality — but such programs require political will that is often absent.

I do not argue that governments are malicious — most officials genuinely want to protect their citizens. But good intentions without adequate funding, sustained planning, and accountability produce no real protection. Citizens must demand more, and governments must deliver it — before the next disaster, not after.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'Why does the author say there are no "ribbon-cutting moments" for emergency preparedness?',
          options: [
            'Because preparedness programs are illegal in some countries.',
            'Because ribbon-cutting ceremonies have been cancelled due to budget cuts.',
            'Because prevention work is not visible or glamorous, so politicians avoid it.',
            'Because disasters always destroy preparedness infrastructure before it is used.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          stimulus: `Governments Are Failing Us on Emergency Preparedness

Every few years, a disaster strikes — a hurricane, an earthquake, a flood — and the same scenes play out: overwhelmed emergency services, shortages of food and water, and communities left to fend for themselves for days. And every time, government officials express surprise, sympathy, and promises to do better. Those promises, too often, go unfulfilled.

The truth is uncomfortable: most governments do not invest adequately in emergency preparedness. They respond to disasters generously with money and media attention, but prevention and preparation receive a fraction of that investment. According to the United Nations, every dollar spent on disaster risk reduction saves between four and seven dollars in disaster response costs. Yet the funds consistently flow in the wrong direction.

Part of the problem is political. Issue of equity. When disasters strike, the wealthiest communities recover quickly: they have insurance, savings, and the political connections to demand fast government action. Low-income communities suffer longer, with less support. Preparedness investments that target vulnerable communities first could dramatically reduce this inequality — but such programs require political will that is often absent.

I do not argue that governments are malicious — most officials genuinely want to protect their citizens. But good intentions without adequate funding, sustained planning, and accountability produce no real protection. Citizens must demand more, and governments must deliver it — before the next disaster, not after.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What does the author say about the difference between wealthy and low-income communities after disasters?',
          options: [
            'Wealthy communities suffer the most because they have more to lose.',
            'Low-income communities recover faster due to community solidarity.',
            'All communities receive equal government support after disasters.',
            'Wealthy communities recover faster due to resources and political connections.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          stimulus: `Governments Are Failing Us on Emergency Preparedness

Every few years, a disaster strikes — a hurricane, an earthquake, a flood — and the same scenes play out: overwhelmed emergency services, shortages of food and water, and communities left to fend for themselves for days. And every time, government officials express surprise, sympathy, and promises to do better. Those promises, too often, go unfulfilled.

The truth is uncomfortable: most governments do not invest adequately in emergency preparedness. They respond to disasters generously with money and media attention, but prevention and preparation receive a fraction of that investment. According to the United Nations, every dollar spent on disaster risk reduction saves between four and seven dollars in disaster response costs. Yet the funds consistently flow in the wrong direction.

Part of the problem is political. Emergency preparedness produces no ribbon-cutting moments. There are no grand openings for a well-stocked emergency warehouse or a newly trained community response team. Politicians are rewarded for visible results, not invisible prevention. So preparation is deprioritized in favor of projects that generate votes.

There is also the issue of equity. When disasters strike, the wealthiest communities recover quickly: they have insurance, savings, and the political connections to demand fast government action. Low-income communities suffer longer, with less support. Preparedness investments that target vulnerable communities first could dramatically reduce this inequality — but such programs require political will that is often absent.

I do not argue that governments are malicious — most officials genuinely want to protect their citizens. But good intentions without adequate funding, sustained planning, and accountability produce no real protection. Citizens must demand more, and governments must deliver it — before the next disaster, not after.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'How does the author characterize the intentions of government officials?',
          options: [
            'As deliberately harmful and corrupt.',
            'As effective and well-resourced.',
            'As genuinely good but insufficient without proper funding and accountability.',
            'As indifferent to citizen welfare.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          stimulus: `Governments Are Failing Us on Emergency Preparedness

Every few years, a disaster strikes — a hurricane, an earthquake, a flood — and the same scenes play out: overwhelmed emergency services, shortages of food and water, and communities left to fend for themselves for days. And every time, government officials express surprise, sympathy, and promises to do better. Those promises, too often, go unfulfilled.

The truth is uncomfortable: most governments do not invest adequately in emergency preparedness. They respond to disasters generously with money and media attention, but prevention and preparation receive a fraction of that investment. According to the United Nations, every dollar spent on disaster risk reduction saves between four and seven dollars in disaster response costs. Yet the funds consistently flow in the wrong direction.

Part of the problem is political. Emergency preparedness produces no ribbon-cutting moments. There are no grand openings for a well-stocked emergency warehouse or a newly trained community response team. Politicians are rewarded for visible results, not invisible prevention. So preparation is deprioritized in favor of projects that generate votes.

There is also the issue of equity. When disasters strike, the wealthiest communities recover quickly: they have insurance, savings, and the political connections to demand fast government action. Low-income communities suffer longer, with less support. Preparedness investments that target vulnerable communities first could dramatically reduce this inequality — but such programs require political will that is often absent.

I do not argue that governments are malicious — most officials genuinely want to protect their citizens. But good intentions without adequate funding, sustained planning, and accountability produce no real protection. Citizens must demand more, and governments must deliver it — before the next disaster, not after.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What is the author\'s call to action at the end of the article?',
          options: [
            'Citizens must demand better from governments before disasters happen.',
            'Governments should increase taxes to fund disaster recovery.',
            'Citizens should form their own emergency response armies.',
            'Politicians should resign if they fail to prevent natural disasters.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          stimulus: `Governments Are Failing Us on Emergency Preparedness

Every few years, a disaster strikes — a hurricane, an earthquake, a flood — and the same scenes play out: overwhelmed emergency services, shortages of food and water, and communities left to fend for themselves for days. And every time, government officials express surprise, sympathy, and promises to do better. Those promises, too often, go unfulfilled.

The truth is uncomfortable: most governments do not invest adequately in emergency preparedness. They respond to disasters generously with money and media attention, but prevention and preparation receive a fraction of that investment. According to the United Nations, every dollar spent on disaster risk reduction saves between four and seven dollars in disaster response costs. Yet the funds consistently flow in the wrong direction.

Part of the problem is political. Emergency preparedness produces no ribbon-cutting moments. There are no grand openings for a well-stocked emergency warehouse or a newly trained community response team. Politicians are rewarded for visible results, not invisible prevention. So preparation is deprioritized in favor of projects that generate votes.

There is also the issue of equity. When disasters strike, the wealthiest communities recover quickly: they have insurance, savings, and the political connections to demand fast government action. Low-income communities suffer longer, with less support. Preparedness investments that target vulnerable communities first could dramatically reduce this inequality — but such programs require political will that is often absent.

I do not argue that governments are malicious — most officials genuinely want to protect their citizens. But good intentions without adequate funding, sustained planning, and accountability produce no real protection. Citizens must demand more, and governments must deliver it — before the next disaster, not after.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'The word "malicious" in the final paragraph means:',
          options: [
            'Careless and disorganized.',
            'Uninformed and uneducated.',
            'Financially irresponsible.',
            'Motivated by a desire to cause harm.',
          ],
          answer: 3,
        },
      ],
    },
  ],
};

export default mock;
