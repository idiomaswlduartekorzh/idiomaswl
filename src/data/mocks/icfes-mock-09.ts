import type { MockExam } from './types';

const mock: MockExam = {
  id: 'mock-09',
  examSlug: 'icfes',
  title: 'Mock 9 · Arte y medios',
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
          text: 'A person who creates paintings, sculptures, or other works of visual art.',
          options: ['Author', 'Artist', 'Journalist', 'Director'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          text: 'A series of moving images shown on a screen, often telling a story.',
          options: ['Album', 'Exhibition', 'Film', 'Broadcast'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          text: 'The ability to produce something new and original using imagination.',
          options: ['Accuracy', 'Creativity', 'Discipline', 'Loyalty'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          text: 'An online platform where users can share short messages, photos, and videos with other users.',
          options: ['Database', 'Browser', 'Social media', 'Search engine'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          text: 'A public event where works of art are displayed for people to see.',
          options: ['Concert', 'Exhibition', 'Performance', 'Festival'],
          answer: 1,
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
          stimulus: 'Student: "I\'ve been learning to paint watercolors. Do you think I should take formal classes?"\nArt teacher: _______',
          text: 'What is the most helpful response from the art teacher?',
          options: [
            '"Painting is not a useful skill in the modern world."',
            '"Classes can help you develop technique, but practicing on your own is just as important."',
            '"Only professional artists need painting lessons."',
            '"You should focus on digital design instead."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q2',
          part: 2,
          stimulus: 'Journalist: "The new film festival attracted record attendance this year. What do you think made it so successful?"\nOrganizer: _______',
          text: 'What is the most relevant response from the organizer?',
          options: [
            '"I prefer watching films at home."',
            '"We offered a diverse program and made tickets more affordable for young people."',
            '"Film festivals are not as popular as music events."',
            '"The weather was very good this year."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q3',
          part: 2,
          stimulus: 'Friend A: "Did you listen to the new album that came out yesterday?"\nFriend B: "Not yet — what style of music is it?"\nFriend A: _______',
          text: 'What does Friend A say next?',
          options: [
            '"Music is very important to me."',
            '"It\'s a mix of jazz and electronic sounds. I think you\'d like it."',
            '"I don\'t usually buy albums anymore."',
            '"The singer is from Brazil, I think."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q4',
          part: 2,
          stimulus: 'Customer: "I\'d like to cancel my streaming subscription."\nAgent: "I\'m sorry to hear that. Can you tell us why?"\nCustomer: _______',
          text: 'What is the most natural response from the customer?',
          options: [
            '"Streaming is very popular these days."',
            '"The price went up and I\'m not watching enough to justify the cost."',
            '"I love all the shows available."',
            '"My internet connection is very fast."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q5',
          part: 2,
          stimulus: 'Parent: "You spend too much time on social media. It\'s affecting your grades."\nTeenager: _______',
          text: 'Which response is the most appropriate?',
          options: [
            '"Social media is more important than school."',
            '"You\'re right. I\'ll set a time limit for myself and focus more on studying."',
            '"All my friends use social media all day."',
            '"My grades are fine. Don\'t worry about it."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q6',
          part: 2,
          stimulus: 'Museum guide: "This painting was created in 1887 and uses a technique called pointillism."\nVisitor: _______',
          text: 'What does the visitor say?',
          options: [
            '"I don\'t really enjoy modern art."',
            '"Interesting! So the artist used tiny dots of color instead of brushstrokes?"',
            '"Is there a café in this museum?"',
            '"I prefer photography to painting."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q7',
          part: 2,
          stimulus: 'Director: "We need to cut the budget for this film. Which department can reduce costs?"\nProducer: "The visual effects team has suggested switching to more practical effects on set."\nDirector: _______',
          text: 'What does the director say?',
          options: [
            '"I prefer digital effects for every scene."',
            '"That\'s a good idea. It could also make the film feel more authentic."',
            '"We should hire more actors instead."',
            '"Let\'s postpone the film until next year."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q8',
          part: 2,
          stimulus: 'Radio host: "Our next guest is a young musician who went viral on social media last month. Welcome!"\nMusician: _______',
          text: 'What is the most natural response from the musician?',
          options: [
            '"I don\'t like listening to the radio."',
            '"Thank you for having me! It\'s been a crazy and exciting few weeks."',
            '"I prefer classical music to pop."',
            '"Social media is not very useful for artists."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q9',
          part: 2,
          stimulus: 'Editor: "Your article on street art is interesting, but it needs a stronger conclusion."\nWriter: _______',
          text: 'What does the writer say?',
          options: [
            '"Street art is illegal in most cities."',
            '"You\'re right. I\'ll revise it and add a stronger final paragraph before the deadline."',
            '"I think the article is perfect as it is."',
            '"Conclusions are not necessary for opinion pieces."',
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
          text: 'The young singer _______ millions of followers on social media after posting a video of her performance.',
          options: ['gaining', 'gains', 'gained', 'gain'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q2',
          part: 3,
          text: 'The documentary about street art _______ on the national television channel next Friday.',
          options: ['airs', 'aired', 'will air', 'has aired'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q3',
          part: 3,
          text: 'Many artists believe that digital tools have made it easier _______ their work with a global audience.',
          options: ['share', 'sharing', 'to share', 'shared'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q4',
          part: 3,
          text: 'The film _______ three major awards at the international cinema festival last weekend.',
          options: ['wins', 'won', 'winning', 'has win'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q5',
          part: 3,
          text: 'Critics argue that streaming platforms pay musicians _______ per stream, making it difficult to earn a living.',
          options: ['too little', 'too much', 'very high', 'enough'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q6',
          part: 3,
          text: 'The gallery _______ in the city center for over fifty years before it was forced to close.',
          options: ['operates', 'operated', 'had operated', 'operating'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q7',
          part: 3,
          text: 'Social media has _______ the way people discover new music, replacing traditional radio in many markets.',
          options: ['transform', 'transforming', 'transformed', 'transforms'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q8',
          part: 3,
          text: 'The mural was painted _______ a group of local students over the course of two weeks.',
          options: ['with', 'by', 'from', 'through'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q9',
          part: 3,
          text: 'If the band _______ earlier, they would have had time to rehearse before the concert.',
          options: ['arrives', 'arrived', 'had arrived', 'would arrive'],
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
          stimulus: '--- NOTICE ---\nCITY ART GALLERY\nSummer Exhibition: "Colors of Colombia"\nOpen: Wednesday to Monday, 10:00 AM – 7:00 PM\nClosed Tuesdays\nAdmission: Adults $8 · Students and seniors $4 · Children under 12 FREE\nGuided tours available at 11:00 AM and 3:00 PM daily.',
          stimulusLabel: 'Read the gallery notice.',
          text: 'What time are guided tours available?',
          options: [
            'At 10:00 AM and 2:00 PM.',
            'At 11:00 AM and 3:00 PM.',
            'At 12:00 PM and 4:00 PM.',
            'Only at 11:00 AM.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          stimulus: '--- NOTICE ---\nCITY ART GALLERY\nSummer Exhibition: "Colors of Colombia"\nOpen: Wednesday to Monday, 10:00 AM – 7:00 PM\nClosed Tuesdays\nAdmission: Adults $8 · Students and seniors $4 · Children under 12 FREE\nGuided tours available at 11:00 AM and 3:00 PM daily.',
          stimulusLabel: 'Read the gallery notice.',
          text: 'How much does a senior citizen pay to enter the gallery?',
          options: ['Free', '$4', '$8', '$10'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          stimulus: 'MUSIC WORKSHOP — FREE REGISTRATION\nInstruments: guitar, piano, drums, vocals\nLevel: beginner to intermediate\nSchedule: Saturdays, 9:00 AM – 12:00 PM\nLocation: Cultural Center, Room 5\nAll materials provided\nSpaces limited to 20 participants per session\nRegister online at: culture.citycouncil.gov',
          stimulusLabel: 'Read the workshop announcement.',
          text: 'What is NOT provided by the workshop?',
          options: [
            'Musical instruments.',
            'All necessary materials.',
            'A certificate of completion.',
            'Free registration.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          stimulus: 'MUSIC WORKSHOP — FREE REGISTRATION\nInstruments: guitar, piano, drums, vocals\nLevel: beginner to intermediate\nSchedule: Saturdays, 9:00 AM – 12:00 PM\nLocation: Cultural Center, Room 5\nAll materials provided\nSpaces limited to 20 participants per session\nRegister online at: culture.citycouncil.gov',
          stimulusLabel: 'Read the workshop announcement.',
          text: 'How many people can attend each workshop session?',
          options: [
            'Up to 5 people.',
            'Up to 12 people.',
            'Up to 20 people.',
            'There is no limit.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          stimulus: 'FILM FESTIVAL — CALL FOR SUBMISSIONS\nCategory: Short films (under 20 minutes)\nTheme: "Life in the City"\nOpen to: filmmakers aged 18–35\nDeadline: September 15\nLanguage: Any (English subtitles required)\nSubmit via the official website. No entry fee.\nWinners announced at the closing ceremony on October 3.',
          stimulusLabel: 'Read the festival announcement.',
          text: 'What is required for films submitted in a language other than English?',
          options: [
            'A translation of the script.',
            'English subtitles.',
            'An English voiceover track.',
            'A summary in English.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          stimulus: 'FILM FESTIVAL — CALL FOR SUBMISSIONS\nCategory: Short films (under 20 minutes)\nTheme: "Life in the City"\nOpen to: filmmakers aged 18–35\nDeadline: September 15\nLanguage: Any (English subtitles required)\nSubmit via the official website. No entry fee.\nWinners announced at the closing ceremony on October 3.',
          stimulusLabel: 'Read the festival announcement.',
          text: 'Which statement about the film festival is TRUE?',
          options: [
            'Only English-language films are accepted.',
            'Films must be longer than 20 minutes.',
            'There is no cost to submit a film.',
            'The competition is open to people of all ages.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          stimulus: 'STREET ART TOUR — EVERY SATURDAY\nExplore murals and graffiti in the historic district.\nDuration: 2.5 hours | Distance: approx. 3 km\nMeeting point: Corner of 5th Avenue and Main Street\nDeparture: 10:00 AM sharp — do not arrive late\nCost: $15 per person (includes a photo booklet)\nGroups of 10 or more: 20% discount\nBooking required: tours@streetarttour.com',
          stimulusLabel: 'Read the tour information.',
          text: 'What do participants receive as part of the tour cost?',
          options: [
            'A free meal at a local restaurant.',
            'A photo booklet of the murals.',
            'A certificate from the city.',
            'A discount for future tours.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          stimulus: 'STREET ART TOUR — EVERY SATURDAY\nExplore murals and graffiti in the historic district.\nDuration: 2.5 hours | Distance: approx. 3 km\nMeeting point: Corner of 5th Avenue and Main Street\nDeparture: 10:00 AM sharp — do not arrive late\nCost: $15 per person (includes a photo booklet)\nGroups of 10 or more: 20% discount\nBooking required: tours@streetarttour.com',
          stimulusLabel: 'Read the tour information.',
          text: 'What discount is available for large groups?',
          options: [
            '10% for groups of 5 or more.',
            '15% for groups of 8 or more.',
            '20% for groups of 10 or more.',
            '25% for groups of 15 or more.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q9',
          part: 4,
          stimulus: 'PODCAST LAUNCH EVENT\n"The Creative Mind" — Episode 1 Live Recording\nFeaturing: Artists, musicians, and filmmakers\nVenue: Studio B, Broadcasting House\nDate: Thursday, April 10 · 7:00 PM\nFree entry — seats limited\nRSVP by April 7: rsvp@creativemind.com\n18+ only. Photo ID required at the door.',
          stimulusLabel: 'Read the event notice.',
          text: 'What must attendees bring to enter the event?',
          options: [
            'A printed ticket.',
            'A student ID card.',
            'A photo identification document.',
            'An invitation letter.',
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
          stimulus: `Brushstrokes of Hope: Free Art for Underserved Youth

In the low-income neighborhood of Villa Nueva, a nonprofit organization called ArtReach has launched a free digital art program for children and teenagers who would otherwise have no access to creative education. The program, which began in January, operates from a renovated community center and provides participants with tablets, styluses, and professional software used by graphic designers worldwide.

ArtReach was founded by former graphic designer Sofia Ramírez, who grew up in the same neighborhood and remembers having no access to art materials as a child. "I had the ideas, but never the tools," she says. "This program gives young people both."

Each week, students attend two-hour sessions where they learn digital illustration, photo editing, and basic animation. By the end of the three-month program, participants complete a personal portfolio that they can use to apply for scholarships or design internships. So far, twelve graduates have won places at university arts programs, and four have been hired as junior designers by local companies. The program currently serves 80 students and plans to expand to two additional neighborhoods by the end of the year.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main goal of the ArtReach program?',
          options: [
            'To sell digital artwork created by students.',
            'To provide free creative education to underprivileged youth.',
            'To train professional graphic designers for large companies.',
            'To raise money for a new community center.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          stimulus: `Brushstrokes of Hope: Free Art for Underserved Youth

In the low-income neighborhood of Villa Nueva, a nonprofit organization called ArtReach has launched a free digital art program for children and teenagers who would otherwise have no access to creative education. The program, which began in January, operates from a renovated community center and provides participants with tablets, styluses, and professional software used by graphic designers worldwide.

ArtReach was founded by former graphic designer Sofia Ramírez, who grew up in the same neighborhood and remembers having no access to art materials as a child. "I had the ideas, but never the tools," she says. "This program gives young people both."

Each week, students attend two-hour sessions where they learn digital illustration, photo editing, and basic animation. By the end of the three-month program, participants complete a personal portfolio that they can use to apply for scholarships or design internships. So far, twelve graduates have won places at university arts programs, and four have been hired as junior designers by local companies. The program currently serves 80 students and plans to expand to two additional neighborhoods by the end of the year.`,
          stimulusLabel: 'Read the article.',
          text: 'Why did Sofia Ramírez start ArtReach?',
          options: [
            'She wanted to become famous as a nonprofit director.',
            'She was asked by the local government to start the program.',
            'She grew up in the same neighborhood and lacked access to art tools as a child.',
            'She wanted to compete with other digital art schools.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          stimulus: `Brushstrokes of Hope: Free Art for Underserved Youth

In the low-income neighborhood of Villa Nueva, a nonprofit organization called ArtReach has launched a free digital art program for children and teenagers who would otherwise have no access to creative education. The program, which began in January, operates from a renovated community center and provides participants with tablets, styluses, and professional software used by graphic designers worldwide.

ArtReach was founded by former graphic designer Sofia Ramírez, who grew up in the same neighborhood and remembers having no access to art materials as a child. "I had the ideas, but never the tools," she says. "This program gives young people both."

Each week, students attend two-hour sessions where they learn digital illustration, photo editing, and basic animation. By the end of the three-month program, participants complete a personal portfolio that they can use to apply for scholarships or design internships. So far, twelve graduates have won places at university arts programs, and four have been hired as junior designers by local companies. The program currently serves 80 students and plans to expand to two additional neighborhoods by the end of the year.`,
          stimulusLabel: 'Read the article.',
          text: 'What do students produce by the end of the three-month program?',
          options: [
            'An animated short film.',
            'A personal digital art portfolio.',
            'A written report on digital design.',
            'A group mural for the community center.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          stimulus: `Brushstrokes of Hope: Free Art for Underserved Youth

In the low-income neighborhood of Villa Nueva, a nonprofit organization called ArtReach has launched a free digital art program for children and teenagers who would otherwise have no access to creative education. The program, which began in January, operates from a renovated community center and provides participants with tablets, styluses, and professional software used by graphic designers worldwide.

ArtReach was founded by former graphic designer Sofia Ramírez, who grew up in the same neighborhood and remembers having no access to art materials as a child. "I had the ideas, but never the tools," she says. "This program gives young people both."

Each week, students attend two-hour sessions where they learn digital illustration, photo editing, and basic animation. By the end of the three-month program, participants complete a personal portfolio that they can use to apply for scholarships or design internships. So far, twelve graduates have won places at university arts programs, and four have been hired as junior designers by local companies. The program currently serves 80 students and plans to expand to two additional neighborhoods by the end of the year.`,
          stimulusLabel: 'Read the article.',
          text: 'How many students have been hired as junior designers after completing the program?',
          options: ['Two', 'Four', 'Twelve', 'Eighty'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          stimulus: `Brushstrokes of Hope: Free Art for Underserved Youth

In the low-income neighborhood of Villa Nueva, a nonprofit organization called ArtReach has launched a free digital art program for children and teenagers who would otherwise have no access to creative education. The program, which began in January, operates from a renovated community center and provides participants with tablets, styluses, and professional software used by graphic designers worldwide.

ArtReach was founded by former graphic designer Sofia Ramírez, who grew up in the same neighborhood and remembers having no access to art materials as a child. "I had the ideas, but never the tools," she says. "This program gives young people both."

Each week, students attend two-hour sessions where they learn digital illustration, photo editing, and basic animation. By the end of the three-month program, participants complete a personal portfolio that they can use to apply for scholarships or design internships. So far, twelve graduates have won places at university arts programs, and four have been hired as junior designers by local companies. The program currently serves 80 students and plans to expand to two additional neighborhoods by the end of the year.`,
          stimulusLabel: 'Read the article.',
          text: 'The word "renovated" most likely means:',
          options: [
            'Destroyed and rebuilt from scratch.',
            'Repaired and improved after a period of disuse.',
            'Purchased from the city government.',
            'Decorated with student artwork.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          stimulus: `Brushstrokes of Hope: Free Art for Underserved Youth

In the low-income neighborhood of Villa Nueva, a nonprofit organization called ArtReach has launched a free digital art program for children and teenagers who would otherwise have no access to creative education. The program, which began in January, operates from a renovated community center and provides participants with tablets, styluses, and professional software used by graphic designers worldwide.

ArtReach was founded by former graphic designer Sofia Ramírez, who grew up in the same neighborhood and remembers having no access to art materials as a child. "I had the ideas, but never the tools," she says. "This program gives young people both."

Each week, students attend two-hour sessions where they learn digital illustration, photo editing, and basic animation. By the end of the three-month program, participants complete a personal portfolio that they can use to apply for scholarships or design internships. So far, twelve graduates have won places at university arts programs, and four have been hired as junior designers by local companies. The program currently serves 80 students and plans to expand to two additional neighborhoods by the end of the year.`,
          stimulusLabel: 'Read the article.',
          text: 'What does ArtReach plan to do by the end of the year?',
          options: [
            'Open a professional design agency.',
            'Create an online course for international students.',
            'Expand the program to two more neighborhoods.',
            'Partner with a national television channel.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          stimulus: `Brushstrokes of Hope: Free Art for Underserved Youth

In the low-income neighborhood of Villa Nueva, a nonprofit organization called ArtReach has launched a free digital art program for children and teenagers who would otherwise have no access to creative education. The program, which began in January, operates from a renovated community center and provides participants with tablets, styluses, and professional software used by graphic designers worldwide.

ArtReach was founded by former graphic designer Sofia Ramírez, who grew up in the same neighborhood and remembers having no access to art materials as a child. "I had the ideas, but never the tools," she says. "This program gives young people both."

Each week, students attend two-hour sessions where they learn digital illustration, photo editing, and basic animation. By the end of the three-month program, participants complete a personal portfolio that they can use to apply for scholarships or design internships. So far, twelve graduates have won places at university arts programs, and four have been hired as junior designers by local companies. The program currently serves 80 students and plans to expand to two additional neighborhoods by the end of the year.`,
          stimulusLabel: 'Read the article.',
          text: 'What can be inferred from Sofia\'s quote "I had the ideas, but never the tools"?',
          options: [
            'She did not enjoy art when she was young.',
            'Creative potential exists regardless of economic conditions.',
            'Art tools are too expensive for professional designers.',
            'Only wealthy children can develop creative skills.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q8',
          part: 5,
          stimulus: `Brushstrokes of Hope: Free Art for Underserved Youth

In the low-income neighborhood of Villa Nueva, a nonprofit organization called ArtReach has launched a free digital art program for children and teenagers who would otherwise have no access to creative education. The program, which began in January, operates from a renovated community center and provides participants with tablets, styluses, and professional software used by graphic designers worldwide.

ArtReach was founded by former graphic designer Sofia Ramírez, who grew up in the same neighborhood and remembers having no access to art materials as a child. "I had the ideas, but never the tools," she says. "This program gives young people both."

Each week, students attend two-hour sessions where they learn digital illustration, photo editing, and basic animation. By the end of the three-month program, participants complete a personal portfolio that they can use to apply for scholarships or design internships. So far, twelve graduates have won places at university arts programs, and four have been hired as junior designers by local companies. The program currently serves 80 students and plans to expand to two additional neighborhoods by the end of the year.`,
          stimulusLabel: 'Read the article.',
          text: 'Which skills are taught in the ArtReach sessions?',
          options: [
            'Drawing, sculpture, and oil painting.',
            'Photography, video editing, and typography.',
            'Digital illustration, photo editing, and basic animation.',
            'Web design, coding, and 3D modeling.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q9',
          part: 5,
          stimulus: `Brushstrokes of Hope: Free Art for Underserved Youth

In the low-income neighborhood of Villa Nueva, a nonprofit organization called ArtReach has launched a free digital art program for children and teenagers who would otherwise have no access to creative education. The program, which began in January, operates from a renovated community center and provides participants with tablets, styluses, and professional software used by graphic designers worldwide.

ArtReach was founded by former graphic designer Sofia Ramírez, who grew up in the same neighborhood and remembers having no access to art materials as a child. "I had the ideas, but never the tools," she says. "This program gives young people both."

Each week, students attend two-hour sessions where they learn digital illustration, photo editing, and basic animation. By the end of the three-month program, participants complete a personal portfolio that they can use to apply for scholarships or design internships. So far, twelve graduates have won places at university arts programs, and four have been hired as junior designers by local companies. The program currently serves 80 students and plans to expand to two additional neighborhoods by the end of the year.`,
          stimulusLabel: 'Read the article.',
          text: 'How often do students attend sessions at ArtReach?',
          options: [
            'Every day for three months.',
            'Once a month.',
            'Three times per week.',
            'The text does not specify exact frequency, only weekly sessions.',
          ],
          answer: 3,
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
          stimulus: `The Streaming Revolution: How Digital Platforms Reshaped the Music Industry

Twenty years ago, buying music meant going to a record store. You browsed physical shelves, chose an album, paid for it, and took it home. The music industry was controlled by a small number of powerful record labels that decided which artists got signed, which songs got radio airplay, and ultimately which musicians became famous. The system was rigid, profitable — and about to be completely disrupted.

The first major disruption came with digital piracy in the early 2000s. Platforms like Napster allowed users to share music files for free, causing album sales to collapse. The major labels scrambled to respond, but their attempts to sue individual music fans only damaged their image without solving the problem. It was Apple, not the labels, that eventually provided a viable alternative — iTunes allowed users to legally purchase individual songs for 99 cents, ending the era of buying a whole album to get one song you liked.

But the real transformation came with streaming. Services like Spotify, launched in 2008, and later Apple Music, Amazon Music, and Tidal, offered users access to tens of millions of songs for a monthly subscription fee — or even for free, supported by advertising. Almost overnight, the logic of music ownership changed. Why buy a song when you could stream anything, any time, for less than the price of a coffee?

The impact on the industry has been enormous and contradictory. Revenue from recorded music has recovered after years of decline — global streaming revenues surpassed $17 billion in 2022. Independent artists can now distribute their music globally without needing a record label, using platforms like DistroKid or TuneCore. Some musicians have built enormous audiences without traditional industry support.

Yet the same system that liberated some artists has left others struggling. The average stream on Spotify pays between $0.003 and $0.005 — meaning an artist needs around 250 streams to earn a single dollar. To earn a monthly wage of $2,000, a musician would need approximately 500,000 streams every month. For all but the most successful artists, that is an unreachable target. Critics argue that the streaming model concentrates wealth among the top 1% of artists while the vast majority earn almost nothing.

The music industry continues to evolve. Some artists have turned to live performances, merchandise, and direct fan subscriptions — using platforms like Patreon — to build sustainable incomes outside of streaming royalties. The question facing the industry is not whether streaming is here to stay, but whether it can be made fair for everyone who makes the music that millions enjoy each day.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main idea of this text?',
          options: [
            'Streaming services have destroyed the music industry beyond recovery.',
            'Streaming transformed the music industry in ways that benefit some artists and harm others.',
            'Digital piracy was the only real threat to the music industry.',
            'Record labels are more powerful today than they were twenty years ago.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          stimulus: `The Streaming Revolution: How Digital Platforms Reshaped the Music Industry

Twenty years ago, buying music meant going to a record store. You browsed physical shelves, chose an album, paid for it, and took it home. The music industry was controlled by a small number of powerful record labels that decided which artists got signed, which songs got radio airplay, and ultimately which musicians became famous. The system was rigid, profitable — and about to be completely disrupted.

The first major disruption came with digital piracy in the early 2000s. Platforms like Napster allowed users to share music files for free, causing album sales to collapse. The major labels scrambled to respond, but their attempts to sue individual music fans only damaged their image without solving the problem. It was Apple, not the labels, that eventually provided a viable alternative — iTunes allowed users to legally purchase individual songs for 99 cents, ending the era of buying a whole album to get one song you liked.

But the real transformation came with streaming. Services like Spotify, launched in 2008, and later Apple Music, Amazon Music, and Tidal, offered users access to tens of millions of songs for a monthly subscription fee — or even for free, supported by advertising. Almost overnight, the logic of music ownership changed. Why buy a song when you could stream anything, any time, for less than the price of a coffee?

The impact on the industry has been enormous and contradictory. Revenue from recorded music has recovered after years of decline — global streaming revenues surpassed $17 billion in 2022. Independent artists can now distribute their music globally without needing a record label, using platforms like DistroKid or TuneCore. Some musicians have built enormous audiences without traditional industry support.

Yet the same system that liberated some artists has left others struggling. The average stream on Spotify pays between $0.003 and $0.005 — meaning an artist needs around 250 streams to earn a single dollar. To earn a monthly wage of $2,000, a musician would need approximately 500,000 streams every month. For all but the most successful artists, that is an unreachable target. Critics argue that the streaming model concentrates wealth among the top 1% of artists while the vast majority earn almost nothing.

The music industry continues to evolve. Some artists have turned to live performances, merchandise, and direct fan subscriptions — using platforms like Patreon — to build sustainable incomes outside of streaming royalties. The question facing the industry is not whether streaming is here to stay, but whether it can be made fair for everyone who makes the music that millions enjoy each day.`,
          stimulusLabel: 'Read the article.',
          text: 'Why did the major record labels\' response to piracy damage their image?',
          options: [
            'They reduced music prices too quickly.',
            'They sued individual music fans instead of solving the problem.',
            'They partnered with illegal file-sharing platforms.',
            'They removed popular artists from their rosters.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          stimulus: `The Streaming Revolution: How Digital Platforms Reshaped the Music Industry

Twenty years ago, buying music meant going to a record store. You browsed physical shelves, chose an album, paid for it, and took it home. The music industry was controlled by a small number of powerful record labels that decided which artists got signed, which songs got radio airplay, and ultimately which musicians became famous. The system was rigid, profitable — and about to be completely disrupted.

The first major disruption came with digital piracy in the early 2000s. Platforms like Napster allowed users to share music files for free, causing album sales to collapse. The major labels scrambled to respond, but their attempts to sue individual music fans only damaged their image without solving the problem. It was Apple, not the labels, that eventually provided a viable alternative — iTunes allowed users to legally purchase individual songs for 99 cents, ending the era of buying a whole album to get one song you liked.

But the real transformation came with streaming. Services like Spotify, launched in 2008, and later Apple Music, Amazon Music, and Tidal, offered users access to tens of millions of songs for a monthly subscription fee — or even for free, supported by advertising. Almost overnight, the logic of music ownership changed. Why buy a song when you could stream anything, any time, for less than the price of a coffee?

The impact on the industry has been enormous and contradictory. Revenue from recorded music has recovered after years of decline — global streaming revenues surpassed $17 billion in 2022. Independent artists can now distribute their music globally without needing a record label, using platforms like DistroKid or TuneCore. Some musicians have built enormous audiences without traditional industry support.

Yet the same system that liberated some artists has left others struggling. The average stream on Spotify pays between $0.003 and $0.005 — meaning an artist needs around 250 streams to earn a single dollar. To earn a monthly wage of $2,000, a musician would need approximately 500,000 streams every month. For all but the most successful artists, that is an unreachable target. Critics argue that the streaming model concentrates wealth among the top 1% of artists while the vast majority earn almost nothing.

The music industry continues to evolve. Some artists have turned to live performances, merchandise, and direct fan subscriptions — using platforms like Patreon — to build sustainable incomes outside of streaming royalties. The question facing the industry is not whether streaming is here to stay, but whether it can be made fair for everyone who makes the music that millions enjoy each day.`,
          stimulusLabel: 'Read the article.',
          text: 'What advantage did iTunes offer compared to traditional album purchases?',
          options: [
            'It allowed users to share music files for free.',
            'It sold individual songs, so people did not need to buy a full album.',
            'It gave artists a larger share of music revenue.',
            'It was the first platform to stream music online.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          stimulus: `The Streaming Revolution: How Digital Platforms Reshaped the Music Industry

Twenty years ago, buying music meant going to a record store. You browsed physical shelves, chose an album, paid for it, and took it home. The music industry was controlled by a small number of powerful record labels that decided which artists got signed, which songs got radio airplay, and ultimately which musicians became famous. The system was rigid, profitable — and about to be completely disrupted.

The first major disruption came with digital piracy in the early 2000s. Platforms like Napster allowed users to share music files for free, causing album sales to collapse. The major labels scrambled to respond, but their attempts to sue individual music fans only damaged their image without solving the problem. It was Apple, not the labels, that eventually provided a viable alternative — iTunes allowed users to legally purchase individual songs for 99 cents, ending the era of buying a whole album to get one song you liked.

But the real transformation came with streaming. Services like Spotify, launched in 2008, and later Apple Music, Amazon Music, and Tidal, offered users access to tens of millions of songs for a monthly subscription fee — or even for free, supported by advertising. Almost overnight, the logic of music ownership changed. Why buy a song when you could stream anything, any time, for less than the price of a coffee?

The impact on the industry has been enormous and contradictory. Revenue from recorded music has recovered after years of decline — global streaming revenues surpassed $17 billion in 2022. Independent artists can now distribute their music globally without needing a record label, using platforms like DistroKid or TuneCore. Some musicians have built enormous audiences without traditional industry support.

Yet the same system that liberated some artists has left others struggling. The average stream on Spotify pays between $0.003 and $0.005 — meaning an artist needs around 250 streams to earn a single dollar. To earn a monthly wage of $2,000, a musician would need approximately 500,000 streams every month. For all but the most successful artists, that is an unreachable target. Critics argue that the streaming model concentrates wealth among the top 1% of artists while the vast majority earn almost nothing.

The music industry continues to evolve. Some artists have turned to live performances, merchandise, and direct fan subscriptions — using platforms like Patreon — to build sustainable incomes outside of streaming royalties. The question facing the industry is not whether streaming is here to stay, but whether it can be made fair for everyone who makes the music that millions enjoy each day.`,
          stimulusLabel: 'Read the article.',
          text: 'What does the text say about how much Spotify pays per stream?',
          options: [
            'It pays $1 per stream.',
            'It pays between $0.003 and $0.005 per stream.',
            'It pays a fixed monthly fee to all artists.',
            'Payment depends on whether the artist is signed to a label.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          stimulus: `The Streaming Revolution: How Digital Platforms Reshaped the Music Industry

Twenty years ago, buying music meant going to a record store. You browsed physical shelves, chose an album, paid for it, and took it home. The music industry was controlled by a small number of powerful record labels that decided which artists got signed, which songs got radio airplay, and ultimately which musicians became famous. The system was rigid, profitable — and about to be completely disrupted.

The first major disruption came with digital piracy in the early 2000s. Platforms like Napster allowed users to share music files for free, causing album sales to collapse. The major labels scrambled to respond, but their attempts to sue individual music fans only damaged their image without solving the problem. It was Apple, not the labels, that eventually provided a viable alternative — iTunes allowed users to legally purchase individual songs for 99 cents, ending the era of buying a whole album to get one song you liked.

But the real transformation came with streaming. Services like Spotify, launched in 2008, and later Apple Music, Amazon Music, and Tidal, offered users access to tens of millions of songs for a monthly subscription fee — or even for free, supported by advertising. Almost overnight, the logic of music ownership changed. Why buy a song when you could stream anything, any time, for less than the price of a coffee?

The impact on the industry has been enormous and contradictory. Revenue from recorded music has recovered after years of decline — global streaming revenues surpassed $17 billion in 2022. Independent artists can now distribute their music globally without needing a record label, using platforms like DistroKid or TuneCore. Some musicians have built enormous audiences without traditional industry support.

Yet the same system that liberated some artists has left others struggling. The average stream on Spotify pays between $0.003 and $0.005 — meaning an artist needs around 250 streams to earn a single dollar. To earn a monthly wage of $2,000, a musician would need approximately 500,000 streams every month. For all but the most successful artists, that is an unreachable target. Critics argue that the streaming model concentrates wealth among the top 1% of artists while the vast majority earn almost nothing.

The music industry continues to evolve. Some artists have turned to live performances, merchandise, and direct fan subscriptions — using platforms like Patreon — to build sustainable incomes outside of streaming royalties. The question facing the industry is not whether streaming is here to stay, but whether it can be made fair for everyone who makes the music that millions enjoy each day.`,
          stimulusLabel: 'Read the article.',
          text: 'The text says the impact of streaming has been "enormous and contradictory." What does this mean?',
          options: [
            'Streaming has been both very large in scale and confusing to understand.',
            'Streaming has produced both positive and negative effects at the same time.',
            'Streaming has had a small but positive effect on the music industry.',
            'Streaming is contradicting what scientists predicted about digital media.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q6',
          part: 6,
          stimulus: `The Streaming Revolution: How Digital Platforms Reshaped the Music Industry

Twenty years ago, buying music meant going to a record store. You browsed physical shelves, chose an album, paid for it, and took it home. The music industry was controlled by a small number of powerful record labels that decided which artists got signed, which songs got radio airplay, and ultimately which musicians became famous. The system was rigid, profitable — and about to be completely disrupted.

The first major disruption came with digital piracy in the early 2000s. Platforms like Napster allowed users to share music files for free, causing album sales to collapse. The major labels scrambled to respond, but their attempts to sue individual music fans only damaged their image without solving the problem. It was Apple, not the labels, that eventually provided a viable alternative — iTunes allowed users to legally purchase individual songs for 99 cents, ending the era of buying a whole album to get one song you liked.

But the real transformation came with streaming. Services like Spotify, launched in 2008, and later Apple Music, Amazon Music, and Tidal, offered users access to tens of millions of songs for a monthly subscription fee — or even for free, supported by advertising. Almost overnight, the logic of music ownership changed. Why buy a song when you could stream anything, any time, for less than the price of a coffee?

The impact on the industry has been enormous and contradictory. Revenue from recorded music has recovered after years of decline — global streaming revenues surpassed $17 billion in 2022. Independent artists can now distribute their music globally without needing a record label, using platforms like DistroKid or TuneCore. Some musicians have built enormous audiences without traditional industry support.

Yet the same system that liberated some artists has left others struggling. The average stream on Spotify pays between $0.003 and $0.005 — meaning an artist needs around 250 streams to earn a single dollar. To earn a monthly wage of $2,000, a musician would need approximately 500,000 streams every month. For all but the most successful artists, that is an unreachable target. Critics argue that the streaming model concentrates wealth among the top 1% of artists while the vast majority earn almost nothing.

The music industry continues to evolve. Some artists have turned to live performances, merchandise, and direct fan subscriptions — using platforms like Patreon — to build sustainable incomes outside of streaming royalties. The question facing the industry is not whether streaming is here to stay, but whether it can be made fair for everyone who makes the music that millions enjoy each day.`,
          stimulusLabel: 'Read the article.',
          text: 'What alternative income strategies are some artists using instead of relying on streaming royalties?',
          options: [
            'Selling physical albums exclusively in record stores.',
            'Partnering with major record labels for guaranteed income.',
            'Live performances, merchandise, and direct fan subscriptions.',
            'Creating video games and film soundtracks.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q7',
          part: 6,
          stimulus: `The Streaming Revolution: How Digital Platforms Reshaped the Music Industry

Twenty years ago, buying music meant going to a record store. You browsed physical shelves, chose an album, paid for it, and took it home. The music industry was controlled by a small number of powerful record labels that decided which artists got signed, which songs got radio airplay, and ultimately which musicians became famous. The system was rigid, profitable — and about to be completely disrupted.

The first major disruption came with digital piracy in the early 2000s. Platforms like Napster allowed users to share music files for free, causing album sales to collapse. The major labels scrambled to respond, but their attempts to sue individual music fans only damaged their image without solving the problem. It was Apple, not the labels, that eventually provided a viable alternative — iTunes allowed users to legally purchase individual songs for 99 cents, ending the era of buying a whole album to get one song you liked.

But the real transformation came with streaming. Services like Spotify, launched in 2008, and later Apple Music, Amazon Music, and Tidal, offered users access to tens of millions of songs for a monthly subscription fee — or even for free, supported by advertising. Almost overnight, the logic of music ownership changed. Why buy a song when you could stream anything, any time, for less than the price of a coffee?

The impact on the industry has been enormous and contradictory. Revenue from recorded music has recovered after years of decline — global streaming revenues surpassed $17 billion in 2022. Independent artists can now distribute their music globally without needing a record label, using platforms like DistroKid or TuneCore. Some musicians have built enormous audiences without traditional industry support.

Yet the same system that liberated some artists has left others struggling. The average stream on Spotify pays between $0.003 and $0.005 — meaning an artist needs around 250 streams to earn a single dollar. To earn a monthly wage of $2,000, a musician would need approximately 500,000 streams every month. For all but the most successful artists, that is an unreachable target. Critics argue that the streaming model concentrates wealth among the top 1% of artists while the vast majority earn almost nothing.

The music industry continues to evolve. Some artists have turned to live performances, merchandise, and direct fan subscriptions — using platforms like Patreon — to build sustainable incomes outside of streaming royalties. The question facing the industry is not whether streaming is here to stay, but whether it can be made fair for everyone who makes the music that millions enjoy each day.`,
          stimulusLabel: 'Read the article.',
          text: 'What can be inferred from the final sentence about the author\'s view of streaming?',
          options: [
            'The author believes streaming should be abolished.',
            'The author accepts streaming as permanent but believes it needs to be fairer.',
            'The author thinks only top artists deserve to earn money from streaming.',
            'The author argues that streaming is already fair to all musicians.',
          ],
          answer: 1,
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
          stimulus: `Is Social Media Destroying Genuine Human Connection?

We have never been more "connected" — and yet many people have never felt more alone. Across the world, billions of people spend hours each day scrolling through feeds, liking posts, and watching strangers perform their lives for an audience. We call this connection. I call it a performance.

I believe social media, in its current form, is doing serious damage to genuine human relationships. The platforms are designed not to help you connect, but to keep you engaged — and engagement means keeping your attention through emotional stimulation: outrage, envy, comparison, and validation. Every "like" is a small hit of dopamine. Every unflattering comparison to someone else's curated life is a small wound.

True human connection requires vulnerability, presence, and time — three things that social media actively discourages. A quick comment on a friend's photo is not the same as a real conversation. A birthday message on someone's wall is not care — it is a performance of care. We are becoming experts at appearing connected while growing increasingly isolated.

The effects on mental health are well documented. Numerous studies link heavy social media use — particularly among teenagers — to increased rates of anxiety, depression, and loneliness. The irony is devastating: the tools built to bring us together are making us feel more alone.

Some argue that social media allows people to maintain long-distance relationships and helps marginalized groups find community and support. This is true, and it is important. But these genuine uses are exceptions, not the rule. The majority of our social media time is not spent building meaningful connections — it is spent consuming content and broadcasting ourselves.

We need to make a conscious choice to invest in real relationships: to put down the phone, look someone in the eyes, and be present. Technology is a tool. We have allowed it to become a substitute for life.`,
          stimulusLabel: 'Read the opinion article.',
          text: "What is the author's central claim?",
          options: [
            'Social media should be completely banned by all governments.',
            'Social media is damaging genuine human connection rather than enhancing it.',
            'People should stop using technology entirely and return to face-to-face life.',
            'Social media is only harmful to teenagers, not to adults.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          stimulus: `Is Social Media Destroying Genuine Human Connection?

We have never been more "connected" — and yet many people have never felt more alone. Across the world, billions of people spend hours each day scrolling through feeds, liking posts, and watching strangers perform their lives for an audience. We call this connection. I call it a performance.

I believe social media, in its current form, is doing serious damage to genuine human relationships. The platforms are designed not to help you connect, but to keep you engaged — and engagement means keeping your attention through emotional stimulation: outrage, envy, comparison, and validation. Every "like" is a small hit of dopamine. Every unflattering comparison to someone else's curated life is a small wound.

True human connection requires vulnerability, presence, and time — three things that social media actively discourages. A quick comment on a friend's photo is not the same as a real conversation. A birthday message on someone's wall is not care — it is a performance of care. We are becoming experts at appearing connected while growing increasingly isolated.

The effects on mental health are well documented. Numerous studies link heavy social media use — particularly among teenagers — to increased rates of anxiety, depression, and loneliness. The irony is devastating: the tools built to bring us together are making us feel more alone.

Some argue that social media allows people to maintain long-distance relationships and helps marginalized groups find community and support. This is true, and it is important. But these genuine uses are exceptions, not the rule. The majority of our social media time is not spent building meaningful connections — it is spent consuming content and broadcasting ourselves.

We need to make a conscious choice to invest in real relationships: to put down the phone, look someone in the eyes, and be present. Technology is a tool. We have allowed it to become a substitute for life.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'According to the author, what are social media platforms actually designed to do?',
          options: [
            'Help people form meaningful friendships around the world.',
            'Keep users engaged through emotional stimulation.',
            'Educate people about current events and global issues.',
            'Create safe spaces for honest self-expression.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          stimulus: `Is Social Media Destroying Genuine Human Connection?

We have never been more "connected" — and yet many people have never felt more alone. Across the world, billions of people spend hours each day scrolling through feeds, liking posts, and watching strangers perform their lives for an audience. We call this connection. I call it a performance.

I believe social media, in its current form, is doing serious damage to genuine human relationships. The platforms are designed not to help you connect, but to keep you engaged — and engagement means keeping your attention through emotional stimulation: outrage, envy, comparison, and validation. Every "like" is a small hit of dopamine. Every unflattering comparison to someone else's curated life is a small wound.

True human connection requires vulnerability, presence, and time — three things that social media actively discourages. A quick comment on a friend's photo is not the same as a real conversation. A birthday message on someone's wall is not care — it is a performance of care. We are becoming experts at appearing connected while growing increasingly isolated.

The effects on mental health are well documented. Numerous studies link heavy social media use — particularly among teenagers — to increased rates of anxiety, depression, and loneliness. The irony is devastating: the tools built to bring us together are making us feel more alone.

Some argue that social media allows people to maintain long-distance relationships and helps marginalized groups find community and support. This is true, and it is important. But these genuine uses are exceptions, not the rule. The majority of our social media time is not spent building meaningful connections — it is spent consuming content and broadcasting ourselves.

We need to make a conscious choice to invest in real relationships: to put down the phone, look someone in the eyes, and be present. Technology is a tool. We have allowed it to become a substitute for life.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What does the author mean by calling a birthday message on social media "a performance of care"?',
          options: [
            'It requires a lot of effort and planning to write a birthday message.',
            'It looks like caring, but it does not involve genuine emotional investment.',
            'Social media birthday messages are more sincere than phone calls.',
            'Sending a birthday message makes people feel truly connected.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          stimulus: `Is Social Media Destroying Genuine Human Connection?

We have never been more "connected" — and yet many people have never felt more alone. Across the world, billions of people spend hours each day scrolling through feeds, liking posts, and watching strangers perform their lives for an audience. We call this connection. I call it a performance.

I believe social media, in its current form, is doing serious damage to genuine human relationships. The platforms are designed not to help you connect, but to keep you engaged — and engagement means keeping your attention through emotional stimulation: outrage, envy, comparison, and validation. Every "like" is a small hit of dopamine. Every unflattering comparison to someone else's curated life is a small wound.

True human connection requires vulnerability, presence, and time — three things that social media actively discourages. A quick comment on a friend's photo is not the same as a real conversation. A birthday message on someone's wall is not care — it is a performance of care. We are becoming experts at appearing connected while growing increasingly isolated.

The effects on mental health are well documented. Numerous studies link heavy social media use — particularly among teenagers — to increased rates of anxiety, depression, and loneliness. The irony is devastating: the tools built to bring us together are making us feel more alone.

Some argue that social media allows people to maintain long-distance relationships and helps marginalized groups find community and support. This is true, and it is important. But these genuine uses are exceptions, not the rule. The majority of our social media time is not spent building meaningful connections — it is spent consuming content and broadcasting ourselves.

We need to make a conscious choice to invest in real relationships: to put down the phone, look someone in the eyes, and be present. Technology is a tool. We have allowed it to become a substitute for life.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'The author describes the link between social media and loneliness as an "irony." Why?',
          options: [
            'Because social media was invented to isolate people, not connect them.',
            'Because tools designed to bring people together are actually making them feel more alone.',
            'Because loneliness is a new phenomenon that did not exist before social media.',
            'Because most people are happy with their social media relationships.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          stimulus: `Is Social Media Destroying Genuine Human Connection?

We have never been more "connected" — and yet many people have never felt more alone. Across the world, billions of people spend hours each day scrolling through feeds, liking posts, and watching strangers perform their lives for an audience. We call this connection. I call it a performance.

I believe social media, in its current form, is doing serious damage to genuine human relationships. The platforms are designed not to help you connect, but to keep you engaged — and engagement means keeping your attention through emotional stimulation: outrage, envy, comparison, and validation. Every "like" is a small hit of dopamine. Every unflattering comparison to someone else's curated life is a small wound.

True human connection requires vulnerability, presence, and time — three things that social media actively discourages. A quick comment on a friend's photo is not the same as a real conversation. A birthday message on someone's wall is not care — it is a performance of care. We are becoming experts at appearing connected while growing increasingly isolated.

The effects on mental health are well documented. Numerous studies link heavy social media use — particularly among teenagers — to increased rates of anxiety, depression, and loneliness. The irony is devastating: the tools built to bring us together are making us feel more alone.

Some argue that social media allows people to maintain long-distance relationships and helps marginalized groups find community and support. This is true, and it is important. But these genuine uses are exceptions, not the rule. The majority of our social media time is not spent building meaningful connections — it is spent consuming content and broadcasting ourselves.

We need to make a conscious choice to invest in real relationships: to put down the phone, look someone in the eyes, and be present. Technology is a tool. We have allowed it to become a substitute for life.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'How does the author treat the argument that social media helps marginalized groups?',
          options: [
            'The author completely rejects it as false.',
            'The author accepts it as valid but considers it an exception rather than the norm.',
            'The author uses it as the main reason to support social media.',
            'The author ignores it and does not address it at all.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          stimulus: `Is Social Media Destroying Genuine Human Connection?

We have never been more "connected" — and yet many people have never felt more alone. Across the world, billions of people spend hours each day scrolling through feeds, liking posts, and watching strangers perform their lives for an audience. We call this connection. I call it a performance.

I believe social media, in its current form, is doing serious damage to genuine human relationships. The platforms are designed not to help you connect, but to keep you engaged — and engagement means keeping your attention through emotional stimulation: outrage, envy, comparison, and validation. Every "like" is a small hit of dopamine. Every unflattering comparison to someone else's curated life is a small wound.

True human connection requires vulnerability, presence, and time — three things that social media actively discourages. A quick comment on a friend's photo is not the same as a real conversation. A birthday message on someone's wall is not care — it is a performance of care. We are becoming experts at appearing connected while growing increasingly isolated.

The effects on mental health are well documented. Numerous studies link heavy social media use — particularly among teenagers — to increased rates of anxiety, depression, and loneliness. The irony is devastating: the tools built to bring us together are making us feel more alone.

Some argue that social media allows people to maintain long-distance relationships and helps marginalized groups find community and support. This is true, and it is important. But these genuine uses are exceptions, not the rule. The majority of our social media time is not spent building meaningful connections — it is spent consuming content and broadcasting ourselves.

We need to make a conscious choice to invest in real relationships: to put down the phone, look someone in the eyes, and be present. Technology is a tool. We have allowed it to become a substitute for life.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What does "curated life" mean in the context of this text?',
          options: [
            'A life lived without the use of technology.',
            'A carefully selected and edited version of someone\'s life presented online.',
            'A life based on traditional values and strong community ties.',
            'A career in art, design, or cultural work.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          stimulus: `Is Social Media Destroying Genuine Human Connection?

We have never been more "connected" — and yet many people have never felt more alone. Across the world, billions of people spend hours each day scrolling through feeds, liking posts, and watching strangers perform their lives for an audience. We call this connection. I call it a performance.

I believe social media, in its current form, is doing serious damage to genuine human relationships. The platforms are designed not to help you connect, but to keep you engaged — and engagement means keeping your attention through emotional stimulation: outrage, envy, comparison, and validation. Every "like" is a small hit of dopamine. Every unflattering comparison to someone else's curated life is a small wound.

True human connection requires vulnerability, presence, and time — three things that social media actively discourages. A quick comment on a friend's photo is not the same as a real conversation. A birthday message on someone's wall is not care — it is a performance of care. We are becoming experts at appearing connected while growing increasingly isolated.

The effects on mental health are well documented. Numerous studies link heavy social media use — particularly among teenagers — to increased rates of anxiety, depression, and loneliness. The irony is devastating: the tools built to bring us together are making us feel more alone.

Some argue that social media allows people to maintain long-distance relationships and helps marginalized groups find community and support. This is true, and it is important. But these genuine uses are exceptions, not the rule. The majority of our social media time is not spent building meaningful connections — it is spent consuming content and broadcasting ourselves.

We need to make a conscious choice to invest in real relationships: to put down the phone, look someone in the eyes, and be present. Technology is a tool. We have allowed it to become a substitute for life.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What action does the author recommend in the final paragraph?',
          options: [
            'Deleting all social media accounts permanently.',
            'Reporting harmful content to platform moderators.',
            'Consciously choosing to invest in face-to-face, present relationships.',
            'Limiting social media use to only professional purposes.',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
