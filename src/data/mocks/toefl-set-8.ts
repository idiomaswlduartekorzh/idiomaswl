import type { MockExam } from './types';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Audios bajo /audio/toefl/set-8/ — pendientes (ver checklist de medios).

const mock: MockExam = {
  id: 'set-8',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 8 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Reading — Complete the Words',
      instructions: 'Complete each word so the text makes sense. Some letters are given.',
      questions: [
        {
          type: 'wordcomplete', id: 't8-r-cw1', part: 1, qRange: [1, 6],
          instructions: 'A student is leaving a note for a roommate.',
          template: `Hi Sam,\n\nI've gone to the {{1}} to buy some food for dinner. Could you please do the {{2}} while I'm out? The basket is full. Also, the landlord called about the broken {{3}} in the bathroom — he'll come to {{4}} it on Thursday, so we need to be {{5}}. I'll be back around six. Call me if you need {{6}}.\n\nThanks,\nJo`,
          blanks: [
            { num: 1, prefix: 'sup', answer: 'supermarket' },
            { num: 2, prefix: 'dis', answer: 'dishes' },
            { num: 3, prefix: 'ta', answer: 'tap' },
            { num: 4, prefix: 'rep', answer: 'repair' },
            { num: 5, prefix: 'ho', answer: 'home' },
            { num: 6, prefix: 'anyth', answer: 'anything' },
          ],
        },
        {
          type: 'wordcomplete', id: 't8-r-cw2', part: 1, qRange: [7, 12],
          instructions: 'The following is from an article about volcanoes.',
          template: `A volcano is an opening in the Earth's {{1}} through which molten rock, ash, and gases can {{2}}. Beneath the surface, this molten rock is called magma; once it {{3}} onto the surface, it is known as lava. Volcanic eruptions can be extremely {{4}}, destroying nearby towns, but they also create rich, fertile {{5}} that is excellent for farming. Scientists closely {{6}} active volcanoes to warn people before an eruption.`,
          blanks: [
            { num: 1, prefix: 'cr', answer: 'crust' },
            { num: 2, prefix: 'es', answer: 'escape' },
            { num: 3, prefix: 'rea', answer: 'reaches' },
            { num: 4, prefix: 'dang', answer: 'dangerous' },
            { num: 5, prefix: 'so', answer: 'soil' },
            { num: 6, prefix: 'mon', answer: 'monitor' },
          ],
        },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Bus schedule notice)',
      instructions: 'Read the notice and answer the questions.',
      passage: `CITY TRANSIT — SERVICE CHANGE\n\nDue to road works on Main Street, Route 8 will follow a temporary route from March 3 to March 17.\n\n• Buses will not stop at Central Square during this period.\n• Passengers for Central Square should use the stop at Park Avenue, a five-minute walk away.\n• Buses will run every 20 minutes on weekdays and every 40 minutes on weekends.\n\nWe apologize for the inconvenience. For live updates, check the City Transit app or call our information line.`,
      passageTitle: 'Bus schedule notice',
      questions: [
        { type: 'mcq', id: 't8-r-dl1', part: 2, text: 'Why is Route 8 following a temporary route?', options: ['Because of road works on Main Street', 'Because of a shortage of drivers', 'Because of a public holiday', 'Because of bad weather'], answer: 0 },
        { type: 'mcq', id: 't8-r-dl2', part: 2, text: 'Where should passengers for Central Square go during this period?', options: ['They should use Route 9 instead.', 'They should take a taxi.', 'They should use the Park Avenue stop.', 'They should wait at Central Square anyway.'], answer: 2 },
        { type: 'mcq', id: 't8-r-dl3', part: 2, text: 'How often do buses run on weekends during the change?', options: ['Every hour', 'They do not run on weekends.', 'Every 20 minutes', 'Every 40 minutes'], answer: 3 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Job posting)',
      instructions: 'Read the posting and answer the questions.',
      passage: `PART-TIME POSITION — CAMPUS BOOKSTORE ASSISTANT\n\nThe university bookstore is hiring a part-time assistant for the fall semester.\n\nResponsibilities: helping customers, organizing shelves, and operating the cash register.\nHours: 12–15 hours per week, including some Saturdays.\nRequirements: current student, friendly manner, and reliable attendance. Previous retail experience is helpful but not required — training will be provided.\n\nTo apply, submit a short application form (available at the front desk) by August 20. Interviews will be held during the last week of August.`,
      passageTitle: 'Job posting',
      questions: [
        { type: 'mcq', id: 't8-r-dl4', part: 3, text: 'What is one requirement for the position?', options: ['Being a current student', 'Two years of retail experience', 'A driver\'s license', 'A degree in business'], answer: 0 },
        { type: 'mcq', id: 't8-r-dl5', part: 3, text: 'What does the posting say about experience?', options: ['It is required.', 'It is helpful but not required, and training will be provided.', 'It must be in a bookstore.', 'It is not considered at all.'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Reading — Read an Academic Passage',
      instructions: 'Read the passage and answer questions.',
      passage: `For centuries, people believed that the continents had always sat exactly where they are today. In the early twentieth century, a German scientist named Alfred Wegener proposed a radical alternative: that the continents had once been joined in a single landmass, which he called Pangaea, and had slowly drifted apart over millions of years. His idea, known as continental drift, was initially met with ridicule.\n\nWegener assembled an impressive collection of evidence. He noticed that the coastlines of South America and Africa seemed to fit together like puzzle pieces. He pointed to matching rock formations and mountain ranges on continents now separated by oceans. Most strikingly, he found identical fossils of plants and animals on continents thousands of kilometers apart—organisms that could not possibly have swum across an ocean.\n\nDespite this evidence, most geologists rejected Wegener's theory for one simple reason: he could not explain what force could possibly move entire continents. Without a mechanism, the idea seemed like a fantasy, however neatly the puzzle pieces fit.\n\nThe answer arrived decades later, after Wegener's death, when scientists mapped the ocean floor. They discovered vast underwater mountain ranges where molten rock rises from within the Earth, cools, and pushes the seafloor outward on either side. This process, called seafloor spreading, provided the missing mechanism. The continents do not plow through the ocean, as Wegener had imagined; rather, they ride atop enormous rigid plates that move as the seafloor spreads. This unified theory, known as plate tectonics, now underlies virtually all of modern geology and explains earthquakes, volcanoes, and the shape of the world itself.`,
      passageTitle: 'Continental Drift',
      questions: [
        { type: 'mcq', id: 't8-r-ap1', part: 4, text: 'What did Alfred Wegener propose?', options: ['That earthquakes were caused by the moon', 'That the continents had always been fixed in place', 'That the continents were once joined and slowly drifted apart', 'That the oceans were shrinking'], answer: 2 },
        { type: 'mcq', id: 't8-r-ap2', part: 4, text: 'Which of the following was NOT mentioned as evidence Wegener used?', options: ['Written records from ancient sailors', 'Identical fossils on distant continents', 'Coastlines that seemed to fit together', 'Matching rock formations on separated continents'], answer: 0 },
        { type: 'mcq', id: 't8-r-ap3', part: 4, text: 'Why did most geologists reject Wegener\'s theory?', options: ['He could not explain what force could move the continents.', 'The fossils he found were fake.', 'The continents clearly did not fit together.', 'His evidence was proven false.'], answer: 0 },
        { type: 'mcq', id: 't8-r-ap4', part: 4, text: 'What discovery finally provided the missing mechanism?', options: ['Ancient maps of Pangaea', 'Seafloor spreading, discovered by mapping the ocean floor', 'A new type of fossil', 'Measurements of the moon\'s gravity'], answer: 1 },
        { type: 'mcq', id: 't8-r-ap5', part: 4, text: 'According to the passage, how do continents actually move?', options: ['They are pushed by ocean currents.', 'They plow through the ocean as Wegener imagined.', 'They ride atop rigid plates that move as the seafloor spreads.', 'They float freely on water.'], answer: 2 },
        { type: 'multiselect', id: 't8-r-ap6', part: 4, qRange: [6, 6], text: 'Select the TWO statements supported by the passage.', options: [
          { letter: 'A', text: 'Wegener\'s theory was immediately accepted by geologists.' },
          { letter: 'B', text: 'Wegener found identical fossils on continents now separated by oceans.' },
          { letter: 'C', text: 'Plate tectonics now underlies most of modern geology.' },
          { letter: 'D', text: 'Seafloor spreading was discovered during Wegener\'s lifetime.' },
        ], selectCount: 2, answers: ['B', 'C'] },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't8-l-cr1', part: 5, audioUrl: '/audio/toefl/set-8/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ['She left an hour ago.', 'No, I don\'t like tea.', 'Yes, room 110 is just down the hall on the left.', 'It costs eight dollars.'], answer: 2 },
        { type: 'mcq', id: 't8-l-cr2', part: 5, audioUrl: '/audio/toefl/set-8/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ['That sounds fun — count me in!', 'He is from Brazil.', 'It rained all day.', 'The chair is broken.'], answer: 0 },
        { type: 'mcq', id: 't8-l-cr3', part: 5, audioUrl: '/audio/toefl/set-8/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ['You should ask at the information desk near the entrance.', 'The cake needs more sugar.', 'She plays the piano.', 'It is twenty meters long.'], answer: 0 },
        { type: 'mcq', id: 't8-l-cr4', part: 5, audioUrl: '/audio/toefl/set-8/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ['Yes, she lives nearby.', 'It is made of cotton.', 'No problem — I can lend you mine.', 'The movie starts at eight.'], answer: 2 },
        { type: 'mcq', id: 't8-l-cr5', part: 5, audioUrl: '/audio/toefl/set-8/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ['He drives a red car.', 'It is about three hours away.', 'Yes, I passed with a good grade!', 'The store is closed.'], answer: 2 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between a student and a librarian. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-8/conversation.mp3',
      transcript: `STUDENT: Hi, I'm trying to find some articles for my history paper, but the database keeps saying I don't have access. Am I doing something wrong?\n\nLIBRARIAN: Let me take a look. Which database are you using?\n\nSTUDENT: It's called Historical Archives Online. When I click on the full article, it asks me to pay.\n\nLIBRARIAN: Ah, I see the problem. You need to log in through the university portal first, not go to the database's website directly. When you access it through our library page, the university's subscription covers the cost, so you won't be asked to pay.\n\nSTUDENT: Oh! I've just been searching on Google and clicking the first link. So I should always start from the library page?\n\nLIBRARIAN: Exactly. Start from our "Databases" tab, log in with your student ID, and then search. Everything you find there will be free for you.\n\nSTUDENT: That's such a relief. I was about to give up. One more thing — some of the articles are really old. Are they reliable for a history paper?\n\nLIBRARIAN: For history, older primary sources can actually be very valuable. But check whether it's a primary source — an original document — or a secondary one analyzing it. Your professor probably wants a mix of both.\n\nSTUDENT: Got it. Thank you so much, this helps a lot.`,
      questions: [
        { type: 'mcq', id: 't8-l-cv1', part: 6, text: 'What problem is the student having?', options: ['A database is asking her to pay for articles.', 'The library is closed.', 'She lost her student ID.', 'She cannot log in to her email.'], answer: 0 },
        { type: 'mcq', id: 't8-l-cv2', part: 6, text: 'What is the cause of the problem, according to the librarian?', options: ['The student\'s account has expired.', 'The student is accessing the database directly instead of through the university portal.', 'The university subscription has ended.', 'The database is broken.'], answer: 1 },
        { type: 'mcq', id: 't8-l-cv3', part: 6, text: 'What does the librarian tell the student to do?', options: ['Come back tomorrow', 'Pay a small fee', 'Start from the library\'s "Databases" tab and log in with her student ID', 'Use a different search engine'], answer: 2 },
        { type: 'mcq', id: 't8-l-cv4', part: 6, text: 'What does the librarian say about old articles for a history paper?', options: ['They are always more reliable than new ones.', 'Only articles from this year are acceptable.', 'They should never be used.', 'Older primary sources can be very valuable; the student should check if a source is primary or secondary.'], answer: 3 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-8/announcement.mp3',
      transcript: `Good morning, everyone. This is an important announcement regarding the final exam schedule. Due to a scheduling conflict, the economics final exam originally set for Monday, December 15, has been moved to Wednesday, December 17, at the same time, nine a.m., and in the same room, Hall 3.\n\nPlease update your calendars accordingly. If the new date creates a conflict with another exam, you must notify the examinations office by this Friday so that an alternative arrangement can be made. No conflicts will be resolved after that deadline. A revised schedule has been posted on the department website and emailed to all enrolled students. If you did not receive the email, please check that your contact information is up to date in the student system. Thank you for your attention.`,
      questions: [
        { type: 'mcq', id: 't8-l-an1', part: 7, text: 'What is the announcement mainly about?', options: ['A new professor joining the department', 'A change to the grading system', 'A holiday closure', 'A change to the economics final exam date'], answer: 3 },
        { type: 'mcq', id: 't8-l-an2', part: 7, text: 'What has changed about the exam?', options: ['The time and the room', 'The date, from December 15 to December 17', 'The format of the questions', 'The length of the exam'], answer: 1 },
        { type: 'mcq', id: 't8-l-an3', part: 7, text: 'What must students do if the new date conflicts with another exam?', options: ['Email the professor directly on exam day.', 'Nothing; conflicts are resolved automatically.', 'Notify the examinations office by Friday.', 'Retake the course.'], answer: 2 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-8/academic-talk.mp3',
      transcript: `PROFESSOR: I want to talk today about a clever strategy that some animals use to survive: mimicry. Mimicry is when one species evolves to resemble another. And it turns out there are two very different kinds, which are easy to confuse.\n\nThe first is called Batesian mimicry, named after the naturalist Henry Bates. Here, a harmless species evolves to look like a harmful or unpleasant one. Think of a harmless hoverfly that has the same black-and-yellow stripes as a stinging wasp. Predators that have learned to avoid wasps also avoid the hoverfly, even though it's completely defenseless. The mimic gets protection without having to invest in any actual defense — it's essentially bluffing.\n\nThe second kind is Müllerian mimicry, named after Fritz Müller. In this case, two or more genuinely harmful species evolve to resemble each other. Several different species of stinging bees and wasps, for example, share similar warning colors. Why would harmful species imitate each other? Because it makes the shared warning signal more effective. A young predator only has to have one bad experience to learn to avoid that entire pattern, rather than learning separately for each species. So all the harmful species benefit by sharing a common "warning uniform."\n\nHere's the key contrast for your exam: in Batesian mimicry, the mimic is a liar — harmless but pretending to be dangerous. In Müllerian mimicry, everyone is telling the truth — they're all genuinely dangerous, and they cooperate by looking alike. Both strategies exploit the same thing: a predator's ability to learn and remember warning signals. Evolution, in a sense, is manipulating the predator's memory.`,
      questions: [
        { type: 'mcq', id: 't8-l-at1', part: 8, text: 'What is the main topic of the lecture?', options: ['The life cycle of wasps', 'How insects communicate', 'How predators hunt', 'Two kinds of mimicry in animals'], answer: 3 },
        { type: 'mcq', id: 't8-l-at2', part: 8, text: 'In Batesian mimicry, what is the relationship between the mimic and the species it resembles?', options: ['A harmless species evolves to look like a harmful one.', 'Both are harmful.', 'The mimic is more dangerous than the model.', 'Both are harmless.'], answer: 0 },
        { type: 'mcq', id: 't8-l-at3', part: 8, text: 'Why does the professor describe the Batesian mimic as "bluffing"?', options: ['It changes color rapidly.', 'It gains protection by appearing dangerous without actually being defended.', 'It attacks predators directly.', 'It hides underground.'], answer: 1 },
        { type: 'mcq', id: 't8-l-at4', part: 8, text: 'In Müllerian mimicry, why do harmful species resemble each other?', options: ['To attract mates', 'To confuse each other', 'Because a shared warning signal is learned more quickly by predators, benefiting all of them', 'To compete for food'], answer: 2 },
        { type: 'mcq', id: 't8-l-at5', part: 8, text: 'According to the professor, what do both types of mimicry exploit?', options: ['The weather', 'The size of the prey', 'A predator\'s poor eyesight', 'A predator\'s ability to learn and remember warning signals'], answer: 3 },
      ],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Build a Sentence',
      instructions: 'Put the words in the correct order to make a grammatical sentence.',
      questions: [
        { type: 'sentencebuild', id: 't8-w-bs1', part: 9, tiles: ['We', 'are going', 'to visit', 'my grandparents', 'this weekend'], answer: ['We', 'are going', 'to visit', 'my grandparents', 'this weekend'] },
        { type: 'sentencebuild', id: 't8-w-bs2', part: 9, tiles: ['the salt', 'you', 'pass', 'Can', 'me', 'please'], answer: ['Can', 'you', 'please', 'pass', 'me', 'the salt'] },
        { type: 'sentencebuild', id: 't8-w-bs3', part: 9, tiles: ['that', 'The car', 'bought', 'he', 'is very fast'], answer: ['The car', 'that', 'he', 'bought', 'is very fast'] },
        { type: 'sentencebuild', id: 't8-w-bs4', part: 9, tiles: ['rains,', 'When', 'stay', 'we', 'inside', 'it'], answer: ['When', 'it', 'rains,', 'we', 'stay', 'inside'] },
        { type: 'sentencebuild', id: 't8-w-bs5', part: 9, tiles: ['is', 'This restaurant', 'in town', 'than', 'more expensive', 'the others'], answer: ['This restaurant', 'is', 'more expensive', 'than', 'the others', 'in town'] },
        { type: 'sentencebuild', id: 't8-w-bs6', part: 9, tiles: ['the report,', 'Having', 'she', 'finished', 'went home'], answer: ['Having', 'finished', 'the report,', 'she', 'went home'] },
      ],
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't8-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You borrowed a book from a friend, but you have accidentally spilled coffee on it and damaged some pages. You want to apologize and offer to replace it with a new copy.\n\nWrite an email to your friend.`,
          text: 'In your email: explain what happened, apologize, and make your offer clearly, using an appropriate tone. Write approximately 80–120 words.',
          minWords: 80 },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't8-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on public health. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Nakamura: Some cities have introduced a tax on sugary drinks to reduce their consumption and improve public health. Do you think such a tax is a good idea? Why or why not?\n\nStudent (Sara): I support the tax. Drinking too much sugar causes serious health problems, and a higher price encourages people to choose healthier options. For example, after a similar tax was introduced in another country, sales of sugary drinks dropped noticeably within the first year.\n\nStudent (Omar): I'm not sure it's fair. The tax affects lower-income people the most, and people should be free to decide what they drink. For example, a family already struggling financially ends up paying more for the same drink, while wealthier people barely notice the extra cost.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100 },
      ],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't8-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-8/repeat-1.mp3', targetSentence: 'The meeting is on Friday.' },
        { type: 'repeat', id: 't8-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-8/repeat-2.mp3', targetSentence: 'He forgot his keys, so he waited outside.' },
        { type: 'repeat', id: 't8-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-8/repeat-3.mp3', targetSentence: 'The company launched a new product earlier this month.' },
        { type: 'repeat', id: 't8-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-8/repeat-4.mp3', targetSentence: 'The students who volunteered at the shelter received a certificate of appreciation.' },
        { type: 'repeat', id: 't8-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-8/repeat-5.mp3', targetSentence: 'Although the storm caused some delays, all the passengers eventually reached their destinations safely.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't8-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: To start, tell me about a person you admire. Who are they, and why do you admire them?' },
        { type: 'speak', id: 't8-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to cook at home, while others prefer to eat at restaurants. Which do you prefer, and why? Give reasons and an example.' },
        { type: 'speak', id: 't8-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your school can invest in either more sports facilities or more science laboratories. Which would you recommend, and why? Explain how it would benefit students.' },
        { type: 'speak', id: 't8-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how do you think shopping will change over the next twenty years? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
