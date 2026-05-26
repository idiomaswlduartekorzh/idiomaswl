import type { MockExam } from './types';

const mock: MockExam = {
  id: 'mock-08',
  examSlug: 'icfes',
  title: 'Mock 8 · Ciencia y espacio',
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
          text: 'A large object in space that orbits a star and does not produce its own light.',
          options: ['Planet', 'Comet', 'Galaxy', 'Nebula'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          text: 'The scientific study of the universe, stars, and celestial objects.',
          options: ['Biology', 'Astronomy', 'Geology', 'Chemistry'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          text: 'A vehicle designed to travel into outer space, often carrying astronauts or satellites.',
          options: ['Submarine', 'Helicopter', 'Spacecraft', 'Hovercraft'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          text: 'An important new finding in science or research, often something never known before.',
          options: ['Experiment', 'Observation', 'Theory', 'Discovery'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          text: 'A powerful optical instrument used to see objects that are very far away, such as stars.',
          options: ['Microscope', 'Thermometer', 'Telescope', 'Barometer'],
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
          stimulus: 'Student: "Did you see the news about the new telescope launched last week?"\nFriend: _______',
          text: 'What is the best response from the friend?',
          options: [
            '"Yes! They said it can see galaxies billions of light-years away."',
            '"I prefer to watch cooking shows."',
            '"Telescopes are only useful for sailors."',
            '"The weather has been strange lately."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q2',
          part: 2,
          stimulus: 'Journalist: "How long did the mission to the space station take?"\nAstronaut: _______',
          text: 'What is the most appropriate response from the astronaut?',
          options: [
            '"I have never been to a station before."',
            '"The weather was perfect for the launch."',
            '"Space stations are very expensive to build."',
            '"It took approximately six months to complete the mission."',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q3',
          part: 2,
          stimulus: 'Teacher: "Can anyone explain what a black hole is?"\nStudent: "It\'s a region in space where gravity is so strong that not even light can escape."\nTeacher: _______',
          text: 'What does the teacher say?',
          options: [
            '"That\'s completely wrong. Please study more."',
            '"Excellent! That is a very accurate definition."',
            '"We will talk about black holes next semester."',
            '"Please sit down and be quiet."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q4',
          part: 2,
          stimulus: 'Scientist A: "We found an unusual signal coming from a distant star."\nScientist B: _______',
          text: 'What is the most natural scientific response?',
          options: [
            '"That must be a radio program."',
            '"We should analyze the data carefully before drawing any conclusions."',
            '"Stars do not produce any signals."',
            '"Let\'s go home early today."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q5',
          part: 2,
          stimulus: 'Child: "Mom, why does the moon change shape every night?"\nMother: _______',
          text: 'Which response is most appropriate?',
          options: [
            '"Because the moon is broken."',
            '"The moon is made of rock and ice."',
            '"Because clouds cover it sometimes."',
            '"The moon does not actually change shape — we only see different parts of it lit by the sun."',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q6',
          part: 2,
          stimulus: 'Researcher: "Our lab is applying for funding to study Mars soil samples."\nDirector: _______',
          text: 'What does the director say?',
          options: [
            '"Submit your proposal by Friday and we will review it next week."',
            '"Mars is too far away to be interesting."',
            '"We stopped funding space research last year."',
            '"Only government agencies can study other planets."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q7',
          part: 2,
          stimulus: 'Student A: "Do you think there is life on other planets?"\nStudent B: "I\'m not sure, but scientists are looking for signs of water on Mars."\nStudent A: _______',
          text: 'What does Student A say next?',
          options: [
            '"Water is not important for life."',
            '"I think Mars is too hot for anything."',
            '"That makes sense — water is essential for life as we know it."',
            '"Scientists should focus on Earth\'s oceans first."',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p2q8',
          part: 2,
          stimulus: 'Host: "Welcome to Science Hour. Tonight we discuss the future of space travel. What do you think are the biggest challenges?"\nGuest expert: _______',
          text: 'What is the most relevant response from the expert?',
          options: [
            '"I think cooking in space must be very difficult."',
            '"Space travel is mostly done by robots now."',
            '"Astronauts should exercise more before traveling."',
            '"The main challenges include radiation exposure, lack of gravity, and the enormous cost of missions."',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q9',
          part: 2,
          stimulus: 'Visitor: "Is the planetarium show suitable for young children?"\nStaff member: _______',
          text: 'What does the staff member say?',
          options: [
            '"Children are not allowed inside the planetarium."',
            '"The show is only for university students."',
            '"Yes, the 3 PM show is designed for families with children aged 5 and up."',
            '"You should buy tickets online before you come."',
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
          text: 'Scientists _______ new evidence that suggests water may have once flowed on the surface of Mars.',
          options: ['discovering', 'have discovered', 'will discover', 'discover'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q2',
          part: 3,
          text: 'The rocket _______ at 6:30 AM after being delayed by bad weather conditions.',
          options: ['launched', 'launches', 'is launching', 'will launch'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q3',
          part: 3,
          text: 'If we _______ more powerful telescopes, we could see further into the universe.',
          options: ['had', 'have', 'having', 'will have'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q4',
          part: 3,
          text: 'The new space station orbits Earth at an _______ of approximately 400 kilometers.',
          options: ['attitude', 'altitude', 'aptitude', 'amplitude'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q5',
          part: 3,
          text: 'Astronomers have been studying this galaxy _______ more than thirty years.',
          options: ['since', 'until', 'for', 'during'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q6',
          part: 3,
          text: 'The data collected by the probe _______ to Earth in real time via radio signals.',
          options: ['transmitted', 'transmit', 'transmitting', 'is transmitted'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p3q7',
          part: 3,
          text: 'Private companies are now _______ in the space industry, competing with national space agencies.',
          options: ['invested', 'investment', 'investing', 'invest'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q8',
          part: 3,
          text: 'The discovery of a new exoplanet was _______ by a team of international researchers last month.',
          options: ['announced', 'announce', 'announcing', 'announces'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q9',
          part: 3,
          text: 'Without proper equipment, it is impossible _______ the temperature of a distant star accurately.',
          options: ['measure', 'measuring', 'measured', 'to measure'],
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
          stimulus: '--- NOTICE ---\nNATIONAL SCIENCE MUSEUM\nSpecial Exhibition: "Journey to the Stars"\nDates: March 1 – April 30\nOpen: Tuesday to Sunday, 9:00 AM – 6:00 PM\nAdmission: Adults $12 · Students $6 · Under 5 FREE\nGroup discounts available (15+ people). Book online.',
          stimulusLabel: 'Read the museum notice.',
          text: 'What is the admission price for a university student?',
          options: ['Free', '$6', '$12', '$15'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          stimulus: '--- NOTICE ---\nNATIONAL SCIENCE MUSEUM\nSpecial Exhibition: "Journey to the Stars"\nDates: March 1 – April 30\nOpen: Tuesday to Sunday, 9:00 AM – 6:00 PM\nAdmission: Adults $12 · Students $6 · Under 5 FREE\nGroup discounts available (15+ people). Book online.',
          stimulusLabel: 'Read the museum notice.',
          text: 'On which day is the museum closed?',
          options: ['Tuesday', 'Monday', 'Sunday', 'Saturday'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          stimulus: 'SCIENCE FAIR REGISTRATION\nGrades 9–11 · School Gymnasium\nTheme: "Space and Technology"\nRegistration deadline: February 15\nProjects must use original research.\nEach team: 2–4 students\nPrizes: 1st $500 · 2nd $300 · 3rd $100\nContact your science teacher to register.',
          stimulusLabel: 'Read the science fair announcement.',
          text: 'How many students can be in each science fair team?',
          options: [
            'Only one student per project.',
            'Up to 10 students.',
            'Exactly 3 students.',
            'Between 2 and 4 students.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          stimulus: 'SCIENCE FAIR REGISTRATION\nGrades 9–11 · School Gymnasium\nTheme: "Space and Technology"\nRegistration deadline: February 15\nProjects must use original research.\nEach team: 2–4 students\nPrizes: 1st $500 · 2nd $300 · 3rd $100\nContact your science teacher to register.',
          stimulusLabel: 'Read the science fair announcement.',
          text: 'What is required of all science fair projects?',
          options: [
            'They must use original research.',
            'They must include a video presentation.',
            'They must be about environmental issues.',
            'They must be completed by a single student.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          stimulus: 'OBSERVATORY NIGHT EVENT\nFriday, October 8 · 8:00 PM – 11:00 PM\nBring: warm clothing, red-light torch optional\nDo NOT bring: white flashlights (they affect night vision)\nFree telescopes provided\nWeather-dependent — check our website for updates\nCapacity: 40 people. Reserve your spot by calling 555-0233.',
          stimulusLabel: 'Read the event notice.',
          text: 'Why are white flashlights not allowed at the observatory event?',
          options: [
            'They could damage the telescopes.',
            'They are not bright enough outdoors.',
            'They affect people\'s night vision.',
            'The event begins too early in the evening.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          stimulus: 'OBSERVATORY NIGHT EVENT\nFriday, October 8 · 8:00 PM – 11:00 PM\nBring: warm clothing, red-light torch optional\nDo NOT bring: white flashlights (they affect night vision)\nFree telescopes provided\nWeather-dependent — check our website for updates\nCapacity: 40 people. Reserve your spot by calling 555-0233.',
          stimulusLabel: 'Read the event notice.',
          text: 'What should visitors do to confirm the event will take place?',
          options: [
            'Arrive early and wait outside.',
            'Call 555-0233 on the day.',
            'Bring their own telescope.',
            'Check the observatory\'s website for updates.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          stimulus: 'RESEARCH GRANT — CALL FOR APPLICATIONS\nTopic: Advances in Space Propulsion Technology\nMaximum funding: $250,000 per project\nEligible: university research teams and private labs\nDeadline: 30 November\nProposals must not exceed 20 pages.\nResults announced: February of the following year.\nSubmit via: grants@sciencefund.org',
          stimulusLabel: 'Read the grant announcement.',
          text: 'Who can apply for this research grant?',
          options: [
            'Only government space agencies.',
            'Individual scientists working independently.',
            'University research teams and private labs.',
            'Any company in the technology sector.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          stimulus: 'RESEARCH GRANT — CALL FOR APPLICATIONS\nTopic: Advances in Space Propulsion Technology\nMaximum funding: $250,000 per project\nEligible: university research teams and private labs\nDeadline: 30 November\nProposals must not exceed 20 pages.\nResults announced: February of the following year.\nSubmit via: grants@sciencefund.org',
          stimulusLabel: 'Read the grant announcement.',
          text: 'Which statement about the grant is TRUE?',
          options: [
            'There is no page limit for proposals.',
            'Results are announced in February of the next year.',
            'Applications must be submitted by post.',
            'The maximum funding is $500,000.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q9',
          part: 4,
          stimulus: 'TECHNOLOGY SUMMER CAMP\nAges 13–17 · 2 weeks · July 7–18\nActivities: coding, robotics, 3D printing, astronomy nights\nCost: $450 (includes meals and materials)\nScholarships available for students with financial need.\nApply before May 31. Limited spaces.\nInfo: camp@techkids.edu',
          stimulusLabel: 'Read the summer camp advertisement.',
          text: 'What financial support is available for students who cannot afford the camp?',
          options: [
            'Scholarships for students with financial need.',
            'A full refund after the camp ends.',
            'A payment plan over six months.',
            'A 10% discount for early registration.',
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
          stimulus: `The Horizon Space Telescope: A New Eye on the Universe

In 2024, the European Space Agency launched the Horizon Space Telescope, the most powerful observatory ever sent into orbit. Unlike ground-based telescopes, Horizon operates above the Earth's atmosphere, giving it a perfectly clear view of the cosmos without distortion from weather or air pollution.

Horizon's main mission is to study distant galaxies that formed shortly after the Big Bang, approximately 13 billion years ago. By capturing light that has traveled billions of light-years, scientists hope to understand how the earliest galaxies were born, how they evolved, and what role dark matter played in shaping the universe.

The telescope carries three scientific instruments: an infrared camera capable of detecting extremely faint light, a spectrograph that analyzes the chemical composition of stars, and a coronagraph that blocks starlight to observe surrounding planets. In its first year of operation, Horizon identified over 200 previously unknown galaxies and detected signs of water vapor in the atmosphere of a distant exoplanet — a finding that has excited scientists worldwide.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main mission of the Horizon Space Telescope?',
          options: [
            'To study distant galaxies formed shortly after the Big Bang.',
            'To take photographs of planets in our solar system.',
            'To replace all ground-based observatories on Earth.',
            'To measure the temperature of nearby stars.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          stimulus: `The Horizon Space Telescope: A New Eye on the Universe

In 2024, the European Space Agency launched the Horizon Space Telescope, the most powerful observatory ever sent into orbit. Unlike ground-based telescopes, Horizon operates above the Earth's atmosphere, giving it a perfectly clear view of the cosmos without distortion from weather or air pollution.

Horizon's main mission is to study distant galaxies that formed shortly after the Big Bang, approximately 13 billion years ago. By capturing light that has traveled billions of light-years, scientists hope to understand how the earliest galaxies were born, how they evolved, and what role dark matter played in shaping the universe.

The telescope carries three scientific instruments: an infrared camera capable of detecting extremely faint light, a spectrograph that analyzes the chemical composition of stars, and a coronagraph that blocks starlight to observe surrounding planets. In its first year of operation, Horizon identified over 200 previously unknown galaxies and detected signs of water vapor in the atmosphere of a distant exoplanet — a finding that has excited scientists worldwide.`,
          stimulusLabel: 'Read the article.',
          text: 'Why does operating above the atmosphere give the telescope an advantage?',
          options: [
            'It reduces the cost of running the telescope.',
            'It avoids distortion caused by weather and air pollution.',
            'It allows the telescope to be repaired more easily.',
            'It means the telescope can move closer to distant stars.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          stimulus: `The Horizon Space Telescope: A New Eye on the Universe

In 2024, the European Space Agency launched the Horizon Space Telescope, the most powerful observatory ever sent into orbit. Unlike ground-based telescopes, Horizon operates above the Earth's atmosphere, giving it a perfectly clear view of the cosmos without distortion from weather or air pollution.

Horizon's main mission is to study distant galaxies that formed shortly after the Big Bang, approximately 13 billion years ago. By capturing light that has traveled billions of light-years, scientists hope to understand how the earliest galaxies were born, how they evolved, and what role dark matter played in shaping the universe.

The telescope carries three scientific instruments: an infrared camera capable of detecting extremely faint light, a spectrograph that analyzes the chemical composition of stars, and a coronagraph that blocks starlight to observe surrounding planets. In its first year of operation, Horizon identified over 200 previously unknown galaxies and detected signs of water vapor in the atmosphere of a distant exoplanet — a finding that has excited scientists worldwide.`,
          stimulusLabel: 'Read the article.',
          text: 'What does the spectrograph on the Horizon telescope do?',
          options: [
            'It blocks starlight to see nearby planets.',
            'It detects extremely faint infrared light.',
            'It analyzes the chemical composition of stars.',
            'It measures the distance between galaxies.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          stimulus: `The Horizon Space Telescope: A New Eye on the Universe

In 2024, the European Space Agency launched the Horizon Space Telescope, the most powerful observatory ever sent into orbit. Unlike ground-based telescopes, Horizon operates above the Earth's atmosphere, giving it a perfectly clear view of the cosmos without distortion from weather or air pollution.

Horizon's main mission is to study distant galaxies that formed shortly after the Big Bang, approximately 13 billion years ago. By capturing light that has traveled billions of light-years, scientists hope to understand how the earliest galaxies were born, how they evolved, and what role dark matter played in shaping the universe.

The telescope carries three scientific instruments: an infrared camera capable of detecting extremely faint light, a spectrograph that analyzes the chemical composition of stars, and a coronagraph that blocks starlight to observe surrounding planets. In its first year of operation, Horizon identified over 200 previously unknown galaxies and detected signs of water vapor in the atmosphere of a distant exoplanet — a finding that has excited scientists worldwide.`,
          stimulusLabel: 'Read the article.',
          text: 'What notable discovery did Horizon make regarding exoplanets?',
          options: [
            'It found a planet with a rocky surface similar to Earth.',
            'It confirmed that no exoplanets exist in distant galaxies.',
            'It photographed an exoplanet orbiting two stars at once.',
            'It detected signs of water vapor in an exoplanet\'s atmosphere.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          stimulus: `The Horizon Space Telescope: A New Eye on the Universe

In 2024, the European Space Agency launched the Horizon Space Telescope, the most powerful observatory ever sent into orbit. Unlike ground-based telescopes, Horizon operates above the Earth's atmosphere, giving it a perfectly clear view of the cosmos without distortion from weather or air pollution.

Horizon's main mission is to study distant galaxies that formed shortly after the Big Bang, approximately 13 billion years ago. By capturing light that has traveled billions of light-years, scientists hope to understand how the earliest galaxies were born, how they evolved, and what role dark matter played in shaping the universe.

The telescope carries three scientific instruments: an infrared camera capable of detecting extremely faint light, a spectrograph that analyzes the chemical composition of stars, and a coronagraph that blocks starlight to observe surrounding planets. In its first year of operation, Horizon identified over 200 previously unknown galaxies and detected signs of water vapor in the atmosphere of a distant exoplanet — a finding that has excited scientists worldwide.`,
          stimulusLabel: 'Read the article.',
          text: 'The word "distortion" in the text most likely means:',
          options: [
            'A clear and accurate image.',
            'An improvement in image quality.',
            'A change that makes something less accurate.',
            'A filter that adds color to an image.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          stimulus: `The Horizon Space Telescope: A New Eye on the Universe

In 2024, the European Space Agency launched the Horizon Space Telescope, the most powerful observatory ever sent into orbit. Unlike ground-based telescopes, Horizon operates above the Earth's atmosphere, giving it a perfectly clear view of the cosmos without distortion from weather or air pollution.

Horizon's main mission is to study distant galaxies that formed shortly after the Big Bang, approximately 13 billion years ago. By capturing light that has traveled billions of light-years, scientists hope to understand how the earliest galaxies were born, how they evolved, and what role dark matter played in shaping the universe.

The telescope carries three scientific instruments: an infrared camera capable of detecting extremely faint light, a spectrograph that analyzes the chemical composition of stars, and a coronagraph that blocks starlight to observe surrounding planets. In its first year of operation, Horizon identified over 200 previously unknown galaxies and detected signs of water vapor in the atmosphere of a distant exoplanet — a finding that has excited scientists worldwide.`,
          stimulusLabel: 'Read the article.',
          text: 'How many new galaxies did Horizon identify in its first year?',
          options: ['More than 200', '50', '13', 'More than 1,000'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          stimulus: `The Horizon Space Telescope: A New Eye on the Universe

In 2024, the European Space Agency launched the Horizon Space Telescope, the most powerful observatory ever sent into orbit. Unlike ground-based telescopes, Horizon operates above the Earth's atmosphere, giving it a perfectly clear view of the cosmos without distortion from weather or air pollution.

Horizon's main mission is to study distant galaxies that formed shortly after the Big Bang, approximately 13 billion years ago. By capturing light that has traveled billions of light-years, scientists hope to understand how the earliest galaxies were born, how they evolved, and what role dark matter played in shaping the universe.

The telescope carries three scientific instruments: an infrared camera capable of detecting extremely faint light, a spectrograph that analyzes the chemical composition of stars, and a coronagraph that blocks starlight to observe surrounding planets. In its first year of operation, Horizon identified over 200 previously unknown galaxies and detected signs of water vapor in the atmosphere of a distant exoplanet — a finding that has excited scientists worldwide.`,
          stimulusLabel: 'Read the article.',
          text: 'What can be inferred about the light the telescope captures from distant galaxies?',
          options: [
            'The light was produced recently and travels at low speed.',
            'The light is created artificially by astronomers on Earth.',
            'The light is invisible to all scientific instruments.',
            'The light has been traveling through space for billions of years.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q8',
          part: 5,
          stimulus: `The Horizon Space Telescope: A New Eye on the Universe

In 2024, the European Space Agency launched the Horizon Space Telescope, the most powerful observatory ever sent into orbit. Unlike ground-based telescopes, Horizon operates above the Earth's atmosphere, giving it a perfectly clear view of the cosmos without distortion from weather or air pollution.

Horizon's main mission is to study distant galaxies that formed shortly after the Big Bang, approximately 13 billion years ago. By capturing light that has traveled billions of light-years, scientists hope to understand how the earliest galaxies were born, how they evolved, and what role dark matter played in shaping the universe.

The telescope carries three scientific instruments: an infrared camera capable of detecting extremely faint light, a spectrograph that analyzes the chemical composition of stars, and a coronagraph that blocks starlight to observe surrounding planets. In its first year of operation, Horizon identified over 200 previously unknown galaxies and detected signs of water vapor in the atmosphere of a distant exoplanet — a finding that has excited scientists worldwide.`,
          stimulusLabel: 'Read the article.',
          text: 'Which organization launched the Horizon Space Telescope?',
          options: [
            'NASA',
            'The European Space Agency',
            'The Russian Space Agency',
            'A private company',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q9',
          part: 5,
          stimulus: `The Horizon Space Telescope: A New Eye on the Universe

In 2024, the European Space Agency launched the Horizon Space Telescope, the most powerful observatory ever sent into orbit. Unlike ground-based telescopes, Horizon operates above the Earth's atmosphere, giving it a perfectly clear view of the cosmos without distortion from weather or air pollution.

Horizon's main mission is to study distant galaxies that formed shortly after the Big Bang, approximately 13 billion years ago. By capturing light that has traveled billions of light-years, scientists hope to understand how the earliest galaxies were born, how they evolved, and what role dark matter played in shaping the universe.

The telescope carries three scientific instruments: an infrared camera capable of detecting extremely faint light, a spectrograph that analyzes the chemical composition of stars, and a coronagraph that blocks starlight to observe surrounding planets. In its first year of operation, Horizon identified over 200 previously unknown galaxies and detected signs of water vapor in the atmosphere of a distant exoplanet — a finding that has excited scientists worldwide.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the purpose of the coronagraph instrument on the Horizon telescope?',
          options: [
            'To measure the temperature of distant stars.',
            'To block starlight so that surrounding planets can be observed.',
            'To detect chemical elements in galaxy clouds.',
            'To communicate signals back to Earth.',
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
          stimulus: `From Government Projects to Private Ventures: The New Space Race

For most of the twentieth century, space exploration was the exclusive domain of governments. The United States and the Soviet Union poured billions of dollars into their space programs, driven not only by scientific curiosity but by political rivalry during the Cold War. Every milestone — the first satellite, the first human in space, the moon landing — was celebrated as a national victory.

By the 1990s, however, government investment in space began to decline. Budget cuts, shifting political priorities, and public skepticism about the value of expensive missions led many agencies to scale back their ambitions. For a decade, it seemed as though the golden age of space exploration had passed.

Then came a new wave of entrepreneurs. Figures such as Elon Musk, Jeff Bezos, and Richard Branson saw commercial opportunity where governments had seen only cost. Musk founded SpaceX in 2002 with the explicit goal of making space travel cheaper and eventually enabling human settlement on Mars. Bezos established Blue Origin with a vision of millions of people living and working in space. These companies invested heavily in reusable rocket technology — a breakthrough that dramatically reduced launch costs. A single SpaceX Falcon 9 launch, which would have cost hundreds of millions of dollars using traditional rockets, can now be completed for a fraction of that price.

The impact on the industry has been profound. Launch costs have fallen by more than 90% over twenty years. Hundreds of small satellites — called CubeSats — are now built by universities, startups, and even high schools. Internet access is being extended to remote regions of the world through low-orbit satellite networks. New industries are emerging around space tourism, asteroid mining, and in-orbit manufacturing.

Not everyone, however, is enthusiastic. Critics argue that the commercialization of space creates new risks: unregulated competition could lead to dangerous debris fields in orbit, and the pursuit of profit may overshadow scientific research. Some scientists worry that the rush to reach Mars ignores the enormous human and environmental costs of such missions. Others point out that while space tourism exists for the ultra-wealthy, billions of people on Earth still lack access to clean water and basic healthcare.

Nevertheless, the momentum is undeniable. Governments and private companies are now collaborating more than ever before — NASA regularly contracts SpaceX to launch its astronauts and cargo. The line between the public and private space sectors is blurring, and the question is no longer whether private companies belong in space, but how the industry should be governed to benefit everyone.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main idea of this text?',
          options: [
            'Government space agencies have completely failed and should be replaced.',
            'The space race between the US and USSR was the most important era in space history.',
            'Space exploration is only valuable when it leads to human settlements on other planets.',
            'Private companies have transformed the space industry, creating both opportunities and concerns.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          stimulus: `From Government Projects to Private Ventures: The New Space Race

For most of the twentieth century, space exploration was the exclusive domain of governments. The United States and the Soviet Union poured billions of dollars into their space programs, driven not only by scientific curiosity but by political rivalry during the Cold War. Every milestone — the first satellite, the first human in space, the moon landing — was celebrated as a national victory.

By the 1990s, however, government investment in space began to decline. Budget cuts, shifting political priorities, and public skepticism about the value of expensive missions led many agencies to scale back their ambitions. For a decade, it seemed as though the golden age of space exploration had passed.

Then came a new wave of entrepreneurs. Figures such as Elon Musk, Jeff Bezos, and Richard Branson saw commercial opportunity where governments had seen only cost. Musk founded SpaceX in 2002 with the explicit goal of making space travel cheaper and eventually enabling human settlement on Mars. Bezos established Blue Origin with a vision of millions of people living and working in space. These companies invested heavily in reusable rocket technology — a breakthrough that dramatically reduced launch costs. A single SpaceX Falcon 9 launch, which would have cost hundreds of millions of dollars using traditional rockets, can now be completed for a fraction of that price.

The impact on the industry has been profound. Launch costs have fallen by more than 90% over twenty years. Hundreds of small satellites — called CubeSats — are now built by universities, startups, and even high schools. Internet access is being extended to remote regions of the world through low-orbit satellite networks. New industries are emerging around space tourism, asteroid mining, and in-orbit manufacturing.

Not everyone, however, is enthusiastic. Critics argue that the commercialization of space creates new risks: unregulated competition could lead to dangerous debris fields in orbit, and the pursuit of profit may overshadow scientific research. Some scientists worry that the rush to reach Mars ignores the enormous human and environmental costs of such missions. Others point out that while space tourism exists for the ultra-wealthy, billions of people on Earth still lack access to clean water and basic healthcare.

Nevertheless, the momentum is undeniable. Governments and private companies are now collaborating more than ever before — NASA regularly contracts SpaceX to launch its astronauts and cargo. The line between the public and private space sectors is blurring, and the question is no longer whether private companies belong in space, but how the industry should be governed to benefit everyone.`,
          stimulusLabel: 'Read the article.',
          text: 'Why did government investment in space decline in the 1990s?',
          options: [
            'Because of budget cuts, changing priorities, and public skepticism.',
            'Because no new planets had been discovered.',
            'Because private companies offered to take over all missions.',
            'Because all scientific goals had already been achieved.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          stimulus: `From Government Projects to Private Ventures: The New Space Race

For most of the twentieth century, space exploration was the exclusive domain of governments. The United States and the Soviet Union poured billions of dollars into their space programs, driven not only by scientific curiosity but by political rivalry during the Cold War. Every milestone — the first satellite, the first human in space, the moon landing — was celebrated as a national victory.

By the 1990s, however, government investment in space began to decline. Budget cuts, shifting political priorities, and public skepticism about the value of expensive missions led many agencies to scale back their ambitions. For a decade, it seemed as though the golden age of space exploration had passed.

Then came a new wave of entrepreneurs. Figures such as Elon Musk, Jeff Bezos, and Richard Branson saw commercial opportunity where governments had seen only cost. Musk founded SpaceX in 2002 with the explicit goal of making space travel cheaper and eventually enabling human settlement on Mars. Bezos established Blue Origin with a vision of millions of people living and working in space. These companies invested heavily in reusable rocket technology — a breakthrough that dramatically reduced launch costs. A single SpaceX Falcon 9 launch, which would have cost hundreds of millions of dollars using traditional rockets, can now be completed for a fraction of that price.

The impact on the industry has been profound. Launch costs have fallen by more than 90% over twenty years. Hundreds of small satellites — called CubeSats — are now built by universities, startups, and even high schools. Internet access is being extended to remote regions of the world through low-orbit satellite networks. New industries are emerging around space tourism, asteroid mining, and in-orbit manufacturing.

Not everyone, however, is enthusiastic. Critics argue that the commercialization of space creates new risks: unregulated competition could lead to dangerous debris fields in orbit, and the pursuit of profit may overshadow scientific research. Some scientists worry that the rush to reach Mars ignores the enormous human and environmental costs of such missions. Others point out that while space tourism exists for the ultra-wealthy, billions of people on Earth still lack access to clean water and basic healthcare.

Nevertheless, the momentum is undeniable. Governments and private companies are now collaborating more than ever before — NASA regularly contracts SpaceX to launch its astronauts and cargo. The line between the public and private space sectors is blurring, and the question is no longer whether private companies belong in space, but how the industry should be governed to benefit everyone.`,
          stimulusLabel: 'Read the article.',
          text: 'What technological breakthrough significantly reduced the cost of space launches?',
          options: [
            'The development of solar-powered spacecraft.',
            'The invention of CubeSats for scientific missions.',
            'The creation of reusable rocket technology.',
            'The use of artificial intelligence to plan missions.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          stimulus: `From Government Projects to Private Ventures: The New Space Race

For most of the twentieth century, space exploration was the exclusive domain of governments. The United States and the Soviet Union poured billions of dollars into their space programs, driven not only by scientific curiosity but by political rivalry during the Cold War. Every milestone — the first satellite, the first human in space, the moon landing — was celebrated as a national victory.

By the 1990s, however, government investment in space began to decline. Budget cuts, shifting political priorities, and public skepticism about the value of expensive missions led many agencies to scale back their ambitions. For a decade, it seemed as though the golden age of space exploration had passed.

Then came a new wave of entrepreneurs. Figures such as Elon Musk, Jeff Bezos, and Richard Branson saw commercial opportunity where governments had seen only cost. Musk founded SpaceX in 2002 with the explicit goal of making space travel cheaper and eventually enabling human settlement on Mars. Bezos established Blue Origin with a vision of millions of people living and working in space. These companies invested heavily in reusable rocket technology — a breakthrough that dramatically reduced launch costs. A single SpaceX Falcon 9 launch, which would have cost hundreds of millions of dollars using traditional rockets, can now be completed for a fraction of that price.

The impact on the industry has been profound. Launch costs have fallen by more than 90% over twenty years. Hundreds of small satellites — called CubeSats — are now built by universities, startups, and even high schools. Internet access is being extended to remote regions of the world through low-orbit satellite networks. New industries are emerging around space tourism, asteroid mining, and in-orbit manufacturing.

Not everyone, however, is enthusiastic. Critics argue that the commercialization of space creates new risks: unregulated competition could lead to dangerous debris fields in orbit, and the pursuit of profit may overshadow scientific research. Some scientists worry that the rush to reach Mars ignores the enormous human and environmental costs of such missions. Others point out that while space tourism exists for the ultra-wealthy, billions of people on Earth still lack access to clean water and basic healthcare.

Nevertheless, the momentum is undeniable. Governments and private companies are now collaborating more than ever before — NASA regularly contracts SpaceX to launch its astronauts and cargo. The line between the public and private space sectors is blurring, and the question is no longer whether private companies belong in space, but how the industry should be governed to benefit everyone.`,
          stimulusLabel: 'Read the article.',
          text: 'What concern do critics raise about the commercialization of space?',
          options: [
            'Private companies spend too much money on scientific research.',
            'Governments are losing interest in space because of private companies.',
            'Space tourism will make it impossible to send satellites into orbit.',
            'Unregulated competition could create dangerous orbital debris and overshadow science.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          stimulus: `From Government Projects to Private Ventures: The New Space Race

For most of the twentieth century, space exploration was the exclusive domain of governments. The United States and the Soviet Union poured billions of dollars into their space programs, driven not only by scientific curiosity but by political rivalry during the Cold War. Every milestone — the first satellite, the first human in space, the moon landing — was celebrated as a national victory.

By the 1990s, however, government investment in space began to decline. Budget cuts, shifting political priorities, and public skepticism about the value of expensive missions led many agencies to scale back their ambitions. For a decade, it seemed as though the golden age of space exploration had passed.

Then came a new wave of entrepreneurs. Figures such as Elon Musk, Jeff Bezos, and Richard Branson saw commercial opportunity where governments had seen only cost. Musk founded SpaceX in 2002 with the explicit goal of making space travel cheaper and eventually enabling human settlement on Mars. Bezos established Blue Origin with a vision of millions of people living and working in space. These companies invested heavily in reusable rocket technology — a breakthrough that dramatically reduced launch costs. A single SpaceX Falcon 9 launch, which would have cost hundreds of millions of dollars using traditional rockets, can now be completed for a fraction of that price.

The impact on the industry has been profound. Launch costs have fallen by more than 90% over twenty years. Hundreds of small satellites — called CubeSats — are now built by universities, startups, and even high schools. Internet access is being extended to remote regions of the world through low-orbit satellite networks. New industries are emerging around space tourism, asteroid mining, and in-orbit manufacturing.

Not everyone, however, is enthusiastic. Critics argue that the commercialization of space creates new risks: unregulated competition could lead to dangerous debris fields in orbit, and the pursuit of profit may overshadow scientific research. Some scientists worry that the rush to reach Mars ignores the enormous human and environmental costs of such missions. Others point out that while space tourism exists for the ultra-wealthy, billions of people on Earth still lack access to clean water and basic healthcare.

Nevertheless, the momentum is undeniable. Governments and private companies are now collaborating more than ever before — NASA regularly contracts SpaceX to launch its astronauts and cargo. The line between the public and private space sectors is blurring, and the question is no longer whether private companies belong in space, but how the industry should be governed to benefit everyone.`,
          stimulusLabel: 'Read the article.',
          text: 'What does the phrase "a fraction of that price" suggest about SpaceX launch costs?',
          options: [
            'The cost has increased significantly compared to the past.',
            'The cost is the same as traditional rocket launches.',
            'The cost is now much lower than it used to be.',
            'The cost is only slightly lower than before.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q6',
          part: 6,
          stimulus: `From Government Projects to Private Ventures: The New Space Race

For most of the twentieth century, space exploration was the exclusive domain of governments. The United States and the Soviet Union poured billions of dollars into their space programs, driven not only by scientific curiosity but by political rivalry during the Cold War. Every milestone — the first satellite, the first human in space, the moon landing — was celebrated as a national victory.

By the 1990s, however, government investment in space began to decline. Budget cuts, shifting political priorities, and public skepticism about the value of expensive missions led many agencies to scale back their ambitions. For a decade, it seemed as though the golden age of space exploration had passed.

Then came a new wave of entrepreneurs. Figures such as Elon Musk, Jeff Bezos, and Richard Branson saw commercial opportunity where governments had seen only cost. Musk founded SpaceX in 2002 with the explicit goal of making space travel cheaper and eventually enabling human settlement on Mars. Bezos established Blue Origin with a vision of millions of people living and working in space. These companies invested heavily in reusable rocket technology — a breakthrough that dramatically reduced launch costs. A single SpaceX Falcon 9 launch, which would have cost hundreds of millions of dollars using traditional rockets, can now be completed for a fraction of that price.

The impact on the industry has been proved profound. Launch costs have fallen by more than 90% over twenty years. Hundreds of small satellites — called CubeSats — are now built by universities, startups, and even high schools. Internet access is being extended to remote regions of the world through low-orbit satellite networks. New industries are emerging around space tourism, asteroid mining, and in-orbit manufacturing.

Not everyone, however, is enthusiastic. Critics argue that the commercialization of space creates new risks: unregulated competition could lead to dangerous debris fields in orbit, and the pursuit of profit may overshadow scientific research. Some scientists worry that the rush to reach Mars ignores the enormous human and environmental costs of such missions. Others point out that while space tourism exists for the ultra-wealthy, billions of people on Earth still lack access to clean water and basic healthcare.

Nevertheless, the momentum is undeniable. Governments and private companies are now collaborating more than ever before — NASA regularly contracts SpaceX to launch its astronauts and cargo. The line between the public and private space sectors is blurring, and the question is no longer whether private companies belong in space, but how the industry should be governed to benefit everyone.`,
          stimulusLabel: 'Read the article.',
          text: 'How has the relationship between NASA and SpaceX changed according to the text?',
          options: [
            'NASA has completely replaced SpaceX with its own rockets.',
            'NASA regularly contracts SpaceX to launch astronauts and cargo.',
            'They are now competitors fighting for government contracts.',
            'SpaceX has taken over all of NASA\'s research programs.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q7',
          part: 6,
          stimulus: `From Government Projects to Private Ventures: The New Space Race

For most of the twentieth century, space exploration was the exclusive domain of governments. The United States and the Soviet Union poured billions of dollars into their space programs, driven not only by scientific curiosity but by political rivalry during the Cold War. Every milestone — the first satellite, the first human in space, the moon landing — was celebrated as a national victory.

By the 1990s, however, government investment in space began to decline. Budget cuts, shifting political priorities, and public skepticism about the value of expensive missions led many agencies to scale back their ambitions. For a decade, it seemed as though the golden age of space exploration had passed.

Then came a new wave of entrepreneurs. Figures such as Elon Musk, Jeff Bezos, and Richard Branson saw commercial opportunity where governments had seen only cost. Musk founded SpaceX in 2002 with the explicit goal of making space travel cheaper and eventually enabling human settlement on Mars. Bezos established Blue Origin with a vision of millions of people living and working in space. These companies invested heavily in reusable rocket technology — a breakthrough that dramatically reduced launch costs. A single SpaceX Falcon 9 launch, which would have cost hundreds of millions of dollars using traditional rockets, can now be completed for a fraction of that price.

The impact on the industry has been profound. Launch costs have fallen by more than 90% over twenty years. Hundreds of small satellites — called CubeSats — are now built by universities, startups, and even high schools. Internet access is being extended to remote regions of the world through low-orbit satellite networks. New industries are emerging around space tourism, asteroid mining, and in-orbit manufacturing.

Not everyone, however, is enthusiastic. Critics argue that the commercialization of space creates new risks: unregulated competition could lead to dangerous debris fields in orbit, and the pursuit of profit may overshadow scientific research. Some scientists worry that the rush to reach Mars ignores the enormous human and environmental costs of such missions. Others point out that while space tourism exists for the ultra-wealthy, billions of people on Earth still lack access to clean water and basic healthcare.

Nevertheless, the momentum is undeniable. Governments and private companies are now collaborating more than ever before — NASA regularly contracts SpaceX to launch its astronauts and cargo. The line between the public and private space sectors is blurring, and the question is no longer whether private companies belong in space, but how the industry should be governed to benefit everyone.`,
          stimulusLabel: 'Read the article.',
          text: 'What can be inferred from the final paragraph about the future of the space industry?',
          options: [
            'The focus will shift to making space exploration fair and regulated for all.',
            'Private companies will eventually work alone without any government involvement.',
            'Governments will pass laws to shut down all private space companies.',
            'Space exploration will slow down as fewer people invest in new missions.',
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
          stimulus: `Space Exploration: A Luxury We Can't Afford?

Every year, billions of dollars are spent sending probes to Mars, building space telescopes, and planning crewed missions to the moon. Meanwhile, on Earth, nearly 700 million people live in extreme poverty, healthcare systems collapse under pressure, and the climate crisis threatens the future of life on this planet. So we must ask: is spending on space justified when so many urgent problems remain unsolved at home?

I believe the answer is no — not in its current form. Governments must prioritize the immediate, solvable crises affecting real people before directing resources to projects whose benefits may not arrive for decades, if ever. A billion dollars invested in clean water infrastructure saves lives today. A billion dollars sent to orbit saves lives when? In a century? Perhaps never?

Supporters of space spending often argue that the technology developed for space has transformed life on Earth — from GPS systems to medical imaging to weather satellites. This argument has merit, but it is also convenient. We could fund those same technologies directly at a far lower cost, without the enormous expense of rockets, astronauts, and distant missions.

Others argue that space exploration inspires young people to study science and engineering. This too is true, but inspiration is not a good enough reason to spend a nation's health budget on moon rocks. There are more immediate and affordable ways to inspire the next generation.

The deeper issue is one of values. Space exploration, as currently practiced, largely benefits the wealthy and the scientifically curious. It is not a necessity. It is a choice — and right now, I argue, it is the wrong choice. Let us fix this planet before we try to escape it.`,
          stimulusLabel: 'Read the opinion article.',
          text: "What is the author's main argument?",
          options: [
            'Current spending on space is not justified given urgent problems on Earth.',
            'Governments should stop all space missions permanently.',
            'Space exploration has no scientific value whatsoever.',
            'Only private companies should fund space exploration.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          stimulus: `Space Exploration: A Luxury We Can't Afford?

Every year, billions of dollars are spent sending probes to Mars, building space telescopes, and planning crewed missions to the moon. Meanwhile, on Earth, nearly 700 million people live in extreme poverty, healthcare systems collapse under pressure, and the climate crisis threatens the future of life on this planet. So we must ask: is spending on space justified when so many urgent problems remain unsolved at home?

I believe the answer is no — not in its current form. Governments must prioritize the immediate, solvable crises affecting real people before directing resources to projects whose benefits may not arrive for decades, if ever. A billion dollars invested in clean water infrastructure saves lives today. A billion dollars sent to orbit saves lives when? In a century? Perhaps never?

Supporters of space spending often argue that the technology developed for space has transformed life on Earth — from GPS systems to medical imaging to weather satellites. This argument has merit, but it is also convenient. We could fund those same technologies directly at a far lower cost, without the enormous expense of rockets, astronauts, and distant missions.

Others argue that space exploration inspires young people to study science and engineering. This too is true, but inspiration is not a good enough reason to spend a nation's health budget on moon rocks. There are more immediate and affordable ways to inspire the next generation.

The deeper issue is one of values. Space exploration, as currently practiced, largely benefits the wealthy and the scientifically curious. It is not a necessity. It is a choice — and right now, I argue, it is the wrong choice. Let us fix this planet before we try to escape it.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'How does the author respond to the argument that space technology benefits everyday life on Earth?',
          options: [
            'By denying that any space technology has ever helped people.',
            'By admitting the point has merit, but arguing those technologies could be funded more cheaply.',
            'By agreeing that space technology is the best investment possible.',
            'By saying that technology is less important than scientific discovery.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          stimulus: `Space Exploration: A Luxury We Can't Afford?

Every year, billions of dollars are spent sending probes to Mars, building space telescopes, and planning crewed missions to the moon. Meanwhile, on Earth, nearly 700 million people live in extreme poverty, healthcare systems collapse under pressure, and the climate crisis threatens the future of life on this planet. So we must ask: is spending on space justified when so many urgent problems remain unsolved at home?

I believe the answer is no — not in its current form. Governments must prioritize the immediate, solvable crises affecting real people before directing resources to projects whose benefits may not arrive for decades, if ever. A billion dollars invested in clean water infrastructure saves lives today. A billion dollars sent to orbit saves lives when? In a century? Perhaps never?

Supporters of space spending often argue that the technology developed for space has transformed life on Earth — from GPS systems to medical imaging to weather satellites. This argument has merit, but it is also convenient. We could fund those same technologies directly at a far lower cost, without the enormous expense of rockets, astronauts, and distant missions.

Others argue that space exploration inspires young people to study science and engineering. This too is true, but inspiration is not a good enough reason to spend a nation's health budget on moon rocks. There are more immediate and affordable ways to inspire the next generation.

The deeper issue is one of values. Space exploration, as currently practiced, largely benefits the wealthy and the scientifically curious. It is not a necessity. It is a choice — and right now, I argue, it is the wrong choice. Let us fix this planet before we try to escape it.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What does the author mean by the phrase "Let us fix this planet before we try to escape it"?',
          options: [
            'Humans should learn to travel faster before going to space.',
            'Scientists should study Earth\'s climate from space satellites.',
            'Earth\'s problems should be solved before spending resources on space exploration.',
            'Governments should create escape plans in case of a global disaster.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          stimulus: `Space Exploration: A Luxury We Can't Afford?

Every year, billions of dollars are spent sending probes to Mars, building space telescopes, and planning crewed missions to the moon. Meanwhile, on Earth, nearly 700 million people live in extreme poverty, healthcare systems collapse under pressure, and the climate crisis threatens the future of life on this planet. So we must ask: is spending on space justified when so many urgent problems remain unsolved at home?

I believe the answer is no — not in its current form. Governments must prioritize the immediate, solvable crises affecting real people before directing resources to projects whose benefits may not arrive for decades, if ever. A billion dollars invested in clean water infrastructure saves lives today. A billion dollars sent to orbit saves lives when? In a century? Perhaps never?

Supporters of space spending often argue that the technology developed for space has transformed life on Earth — from GPS systems to medical imaging to weather satellites. This argument has merit, but it is also convenient. We could fund those same technologies directly at a far lower cost, without the enormous expense of rockets, astronauts, and distant missions.

Others argue that space exploration inspires young people to study science and engineering. This too is true, but inspiration is not a good enough reason to spend a nation's health budget on moon rocks. There are more immediate and affordable ways to inspire the next generation.

The deeper issue is one of values. Space exploration, as currently practiced, largely benefits the wealthy and the scientifically curious. It is not a necessity. It is a choice — and right now, I argue, it is the wrong choice. Let us fix this planet before we try to escape it.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'According to the author, who mainly benefits from space exploration as it is currently practiced?',
          options: [
            'Ordinary citizens in developing countries.',
            'Young students interested in science.',
            'Governments that fund national space agencies.',
            'The wealthy and the scientifically curious.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          stimulus: `Space Exploration: A Luxury We Can't Afford?

Every year, billions of dollars are spent sending probes to Mars, building space telescopes, and planning crewed missions to the moon. Meanwhile, on Earth, nearly 700 million people live in extreme poverty, healthcare systems collapse under pressure, and the climate crisis threatens the future of life on this planet. So we must ask: is spending on space justified when so many urgent problems remain unsolved at home?

I believe the answer is no — not in its current form. Governments must prioritize the immediate, solvable crises affecting real people before directing resources to projects whose benefits may not arrive for decades, if ever. A billion dollars invested in clean water infrastructure saves lives today. A billion dollars sent to orbit saves lives when? In a century? Perhaps never?

Supporters of space spending often argue that the technology developed for space has transformed life on Earth — from GPS systems to medical imaging to weather satellites. This argument has merit, but it is also convenient. We could fund those same technologies directly at a far lower cost, without the enormous expense of rockets, astronauts, and distant missions.

Others argue that space exploration inspires young people to study science and engineering. This too is true, but inspiration is not a good enough reason to spend a nation's health budget on moon rocks. There are more immediate and affordable ways to inspire the next generation.

The deeper issue is one of values. Space exploration, as currently practiced, largely benefits the wealthy and the scientifically curious. It is not a necessity. It is a choice — and right now, I argue, it is the wrong choice. Let us fix this planet before we try to escape it.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'The author uses rhetorical questions like "A billion dollars sent to orbit saves lives when?" to:',
          options: [
            'Show genuine curiosity and desire for more information.',
            'Suggest that space exploration is completely free of charge.',
            'Challenge the reader to think critically about the value of space spending.',
            'Prove that all space missions cost exactly one billion dollars.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          stimulus: `Space Exploration: A Luxury We Can't Afford?

Every year, billions of dollars are spent sending probes to Mars, building space telescopes, and planning crewed missions to the moon. Meanwhile, on Earth, nearly 700 million people live in extreme poverty, healthcare systems collapse under pressure, and the climate crisis threatens the future of life on this planet. So we must ask: is spending on space justified when so many urgent problems remain unsolved at home?

I believe the answer is no — not in its current form. Governments must prioritize the immediate, solvable crises affecting real people before directing resources to projects whose benefits may not arrive for decades, if ever. A billion dollars invested in clean water infrastructure saves lives today. A billion dollars sent to orbit saves lives when? In a century? Perhaps never?

Supporters of space spending often argue that the technology developed for space has transformed life on Earth — from GPS systems to medical imaging to weather satellites. This argument has merit, but it is also convenient. We could fund those same technologies directly at a far lower cost, without the enormous expense of rockets, astronauts, and distant missions.

Others argue that space exploration inspires young people to study science and engineering. This too is true, but inspiration is not a good enough reason to spend a nation's health budget on moon rocks. There are more immediate and affordable ways to inspire the next generation.

The deeper issue is one of values. Space exploration, as currently practiced, largely benefits the wealthy and the scientifically curious. It is not a necessity. It is a choice — and right now, I argue, it is the wrong choice. Let us fix this planet before we try to escape it.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What does the word "merit" mean as used in the text?',
          options: [
            'Value or worth; a good reason to consider something.',
            'A financial reward for good work.',
            'A serious flaw or weakness in an argument.',
            'A type of scientific evidence or data.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          stimulus: `Space Exploration: A Luxury We Can't Afford?

Every year, billions of dollars are spent sending probes to Mars, building space telescopes, and planning crewed missions to the moon. Meanwhile, on Earth, nearly 700 million people live in extreme poverty, healthcare systems collapse under pressure, and the climate crisis threatens the future of life on this planet. So we must ask: is spending on space justified when so many urgent problems remain unsolved at home?

I believe the answer is no — not in its current form. Governments must prioritize the immediate, solvable crises affecting real people before directing resources to projects whose benefits may not arrive for decades, if ever. A billion dollars invested in clean water infrastructure saves lives today. A billion dollars sent to orbit saves lives when? In a century? Perhaps never?

Supporters of space spending often argue that the technology developed for space has transformed life on Earth — from GPS systems to medical imaging to weather satellites. This argument has merit, but it is also convenient. We could fund those same technologies directly at a far lower cost, without the enormous expense of rockets, astronauts, and distant missions.

Others argue that space exploration inspires young people to study science and engineering. This too is true, but inspiration is not a good enough reason to spend a nation's health budget on moon rocks. There are more immediate and affordable ways to inspire the next generation.

The deeper issue is one of values. Space exploration, as currently practiced, largely benefits the wealthy and the scientifically curious. It is not a necessity. It is a choice — and right now, I argue, it is the wrong choice. Let us fix this planet before we try to escape it.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'Which best describes the author\'s writing style in this opinion piece?',
          options: [
            'The author presents both sides equally without expressing a personal view.',
            'The author uses only scientific data and avoids emotional language.',
            'The author focuses entirely on historical facts about past space missions.',
            'The author takes a clear position and systematically addresses counterarguments.',
          ],
          answer: 3,
        },
      ],
    },
  ],
};

export default mock;
