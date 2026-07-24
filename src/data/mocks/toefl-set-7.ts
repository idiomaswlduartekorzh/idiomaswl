import type { MockExam } from './types';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Audios bajo /audio/toefl/set-7/ — pendientes (ver checklist de medios).

const mock: MockExam = {
  id: 'set-7',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 7 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Reading — Complete the Words',
      instructions: 'Complete each word so the text makes sense. Some letters are given.',
      questions: [
        {
          type: 'wordcomplete', id: 't7-r-cw1', part: 1, qRange: [1, 6],
          instructions: 'A student is writing to a study-abroad advisor.',
          template: `Dear Ms. Carter,\n\nI am interested in {{1}} for the exchange program in Japan next year. Could you tell me what {{2}} I need to submit and the {{3}} for the application? I am also worried about the {{4}} of living there. Are there any {{5}} available for students? I would be grateful for any {{6}} you can give me.\n\nBest wishes,\nElena`,
          blanks: [
            { num: 1, prefix: 'ap', answer: 'applying' },
            { num: 2, prefix: 'doc', answer: 'documents' },
            { num: 3, prefix: 'dea', answer: 'deadline' },
            { num: 4, prefix: 'c', answer: 'cost' },
            { num: 5, prefix: 'schol', answer: 'scholarships' },
            { num: 6, prefix: 'adv', answer: 'advice' },
          ],
        },
        {
          type: 'wordcomplete', id: 't7-r-cw2', part: 1, qRange: [7, 12],
          instructions: 'The following is from an article about recycling.',
          template: `Recycling helps reduce the amount of {{1}} that ends up in landfills. When materials such as glass, paper, and {{2}} are collected and processed, they can be turned into new products, saving {{3}} and energy. However, recycling only works if items are sorted {{4}}. Putting the wrong materials in a recycling bin can {{5}} an entire batch. For this reason, many cities provide clear {{6}} about what can and cannot be recycled.`,
          blanks: [
            { num: 1, prefix: 'wa', answer: 'waste' },
            { num: 2, prefix: 'pl', answer: 'plastic' },
            { num: 3, prefix: 'reso', answer: 'resources' },
            { num: 4, prefix: 'corr', answer: 'correctly' },
            { num: 5, prefix: 'ru', answer: 'ruin' },
            { num: 6, prefix: 'inst', answer: 'instructions' },
          ],
        },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Gym notice)',
      instructions: 'Read the notice and answer the questions.',
      passage: `CAMPUS FITNESS CENTER — MEMBER NOTICE\n\nNew opening hours from October 1:\n• Monday–Friday: 6:00 a.m. – 10:00 p.m.\n• Weekends: 8:00 a.m. – 8:00 p.m.\n\nThe swimming pool will be closed on Wednesday mornings until noon for cleaning. Lockers are available free of charge but must be emptied each day; items left overnight will be removed. Please bring your own towel — towel rental has been discontinued. Group fitness classes require sign-up at the front desk at least one hour before the class begins.`,
      passageTitle: 'Gym notice',
      questions: [
        { type: 'mcq', id: 't7-r-dl1', part: 2, text: 'When does the fitness center close on weekends?', options: ['6:00 a.m.', '8:00 p.m.', '10:00 p.m.', 'Noon'], answer: 1 },
        { type: 'mcq', id: 't7-r-dl2', part: 2, text: 'Why is the swimming pool closed on Wednesday mornings?', options: ['For repairs to the roof', 'For a competition', 'For a swimming class', 'For cleaning'], answer: 3 },
        { type: 'mcq', id: 't7-r-dl3', part: 2, text: 'What change has been made regarding towels?', options: ['Towel rental has been discontinued.', 'Towels must be returned within a day.', 'Only members can rent towels.', 'Towels are now free.'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Event email)',
      instructions: 'Read the email and answer the questions.',
      passage: `From: Department of Biology\nTo: All students\nSubject: Guest lecture — space limited\n\nDear students,\n\nWe are pleased to invite you to a guest lecture, "Life in Extreme Environments," by Dr. Amara Osei on Thursday, November 6, at 4:00 p.m. in Lecture Hall B.\n\nBecause seating is limited to 120 people, you must reserve a place using the online form by Tuesday, November 4. A recording will be made available afterward for those who cannot attend in person. Light refreshments will be served before the talk, starting at 3:30 p.m.\n\nWe look forward to seeing you there.`,
      passageTitle: 'Event email',
      questions: [
        { type: 'mcq', id: 't7-r-dl4', part: 3, text: 'Why must students reserve a place in advance?', options: ['Because seating is limited to 120 people', 'Because the lecture costs money', 'Because the location may change', 'Because the date is not confirmed'], answer: 0 },
        { type: 'mcq', id: 't7-r-dl5', part: 3, text: 'What is available for students who cannot attend in person?', options: ['A make-up session next week', 'A printed transcript', 'A recording of the lecture', 'A private meeting with Dr. Osei'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Reading — Read an Academic Passage',
      instructions: 'Read the passage and answer questions.',
      passage: `Coral reefs are often called the "rainforests of the sea," and the comparison is apt. Though they cover less than one percent of the ocean floor, they support roughly a quarter of all marine species. This extraordinary biodiversity rests on an unlikely foundation: a partnership between tiny animals called coral polyps and even tinier algae that live inside their tissues.\n\nThe algae, known as zooxanthellae, carry out photosynthesis, converting sunlight into energy. They share this energy with the coral, which in return provides the algae with shelter and the compounds they need. This mutually beneficial relationship, called symbiosis, is what allows corals to build the massive calcium-carbonate structures we recognize as reefs. It also explains the corals' brilliant colors, which come largely from the algae.\n\nBut this partnership is fragile. When water temperatures rise even slightly above normal for a sustained period, the coral expels its algae in a stress response. Without the algae, the coral loses both its color and its main energy source—a phenomenon known as coral bleaching. A bleached coral is not dead, but it is starving, and if normal conditions do not return quickly, it will die.\n\nThe threat is not only heat. Ocean acidification, caused by seawater absorbing carbon dioxide from the atmosphere, makes it harder for corals to build their skeletons. Combined with pollution and overfishing, these pressures have led scientists to warn that many of the world's reefs could disappear within decades. Yet there is cause for cautious hope: some coral populations show signs of adapting to warmer water, and restoration projects have successfully regrown damaged reefs in several regions.`,
      passageTitle: 'Coral Reefs',
      questions: [
        { type: 'mcq', id: 't7-r-ap1', part: 4, text: 'Why are coral reefs compared to rainforests?', options: ['They are both made of calcium carbonate.', 'They grow at the same rate.', 'They are found in the same regions.', 'They cover a small area but support very high biodiversity.'], answer: 3 },
        { type: 'mcq', id: 't7-r-ap2', part: 4, text: 'According to paragraph 2, what do the zooxanthellae provide to the coral?', options: ['Energy from photosynthesis', 'Protection from predators', 'Calcium carbonate', 'Shelter'], answer: 0 },
        { type: 'mcq', id: 't7-r-ap3', part: 4, text: 'What is coral bleaching, as described in paragraph 3?', options: ['The coral turning a brighter color', 'The coral expelling its algae under heat stress, losing color and its energy source', 'A disease that spreads between reefs', 'The natural death of old coral'], answer: 1 },
        { type: 'mcq', id: 't7-r-ap4', part: 4, text: 'According to paragraph 4, how does ocean acidification harm corals?', options: ['It blocks sunlight from reaching the algae.', 'It raises water temperatures.', 'It makes it harder for corals to build their skeletons.', 'It increases the number of predators.'], answer: 2 },
        { type: 'mcq', id: 't7-r-ap5', part: 4, text: 'What "cause for cautious hope" does the author mention?', options: ['Acidification has stopped.', 'Fishing has been banned worldwide.', 'Reefs are no longer threatened.', 'Some corals show signs of adapting, and restoration projects have regrown damaged reefs.'], answer: 3 },
        { type: 'multiselect', id: 't7-r-ap6', part: 4, qRange: [6, 6], text: 'Select the TWO statements supported by the passage.', options: [
          { letter: 'A', text: 'Coral reefs cover most of the ocean floor.' },
          { letter: 'B', text: 'The relationship between coral and algae is a form of symbiosis.' },
          { letter: 'C', text: 'A bleached coral is immediately dead.' },
          { letter: 'D', text: 'Rising water temperatures can cause coral to expel its algae.' },
        ], selectCount: 2, answers: ['B', 'D'] },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't7-l-cr1', part: 5, audioUrl: '/audio/toefl/set-7/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ['No, it is not raining.', 'The pen is on the desk.', 'She studies history.', 'Around noon, if that works for you.'], answer: 3 },
        { type: 'mcq', id: 't7-l-cr2', part: 5, audioUrl: '/audio/toefl/set-7/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ['It weighs two kilograms.', 'Thanks, but I already have plans this weekend.', 'The window is open.', 'Yes, he speaks French.'], answer: 1 },
        { type: 'mcq', id: 't7-l-cr3', part: 5, audioUrl: '/audio/toefl/set-7/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ['It costs thirty dollars.', 'You can print it in the computer lab on the first floor.', 'The soup needs more pepper.', 'She arrives on Monday.'], answer: 1 },
        { type: 'mcq', id: 't7-l-cr4', part: 5, audioUrl: '/audio/toefl/set-7/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ['The bus is late again.', 'No, I have not seen that film.', 'It is made of leather.', 'Of course — I will send you my notes tonight.'], answer: 3 },
        { type: 'mcq', id: 't7-l-cr5', part: 5, audioUrl: '/audio/toefl/set-7/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ['The library is closed today.', 'He plays the violin.', 'It is about five kilometers.', 'Yes, it went really well — thanks for asking.'], answer: 3 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between two students. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-7/conversation.mp3',
      transcript: `WOMAN: Did you hear that the campus is starting a bike-sharing program next month?\n\nMAN: Really? That's great. I've been thinking about how to get across campus faster. Walking from the dorms to the science building takes almost twenty minutes.\n\nWOMAN: Exactly. Apparently there'll be stations at all the main buildings. You unlock a bike with an app, ride it where you need to go, and leave it at any station.\n\nMAN: Nice. Is it free for students?\n\nWOMAN: The first thirty minutes of each ride are free, which is more than enough to get anywhere on campus. After that it's a small fee, but honestly, who rides more than thirty minutes just to get to class?\n\nMAN: True. My only concern is whether there'll be enough bikes during busy times. You know, right before nine a.m. classes, everyone's rushing.\n\nWOMAN: That's a fair point. They said they'll track usage and add more bikes to the busiest stations. I guess we'll see how it goes.\n\nMAN: Well, I'm definitely signing up. Anything to avoid that twenty-minute walk in the rain.`,
      questions: [
        { type: 'mcq', id: 't7-l-cv1', part: 6, text: 'What are the students mainly discussing?', options: ['A new bike-sharing program on campus', 'A change to the class schedule', 'A problem with the dormitories', 'A campus construction project'], answer: 0 },
        { type: 'mcq', id: 't7-l-cv2', part: 6, text: 'How much of each ride is free for students?', options: ['One ride per day', 'The first ten minutes', 'The first thirty minutes', 'The entire ride'], answer: 2 },
        { type: 'mcq', id: 't7-l-cv3', part: 6, text: 'What concern does the man raise?', options: ['The app may be hard to use.', 'The stations are too far apart.', 'The bikes may be too expensive.', 'There may not be enough bikes during busy times.'], answer: 3 },
        { type: 'mcq', id: 't7-l-cv4', part: 6, text: 'How does the program plan to address busy periods?', options: ['By tracking usage and adding more bikes to the busiest stations', 'By limiting rides to once per day', 'By closing some stations', 'By charging higher fees'], answer: 0 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-7/announcement.mp3',
      transcript: `Good afternoon. This is an announcement from the university library. Beginning next week, we are launching a new service for graduate students: extended loan periods for research materials. Instead of the standard three-week loan, graduate students may now borrow most books for up to twelve weeks, with the option to renew online.\n\nPlease note that high-demand items on course reserve are not included in this program and remain limited to short loan periods so that all students can access them. To take advantage of the extended loans, simply check out your materials as usual — the longer period will be applied automatically to eligible items based on your student status. If you have questions, our staff at the research help desk on the second floor will be glad to assist you.`,
      questions: [
        { type: 'mcq', id: 't7-l-an1', part: 7, text: 'What new service is the library launching?', options: ['A café inside the library', 'Extended loan periods for graduate students', 'A new online catalog', 'Free printing for all students'], answer: 1 },
        { type: 'mcq', id: 't7-l-an2', part: 7, text: 'How long may graduate students now borrow most books?', options: ['One academic year', 'Three weeks', 'Six weeks', 'Up to twelve weeks'], answer: 3 },
        { type: 'mcq', id: 't7-l-an3', part: 7, text: 'Which items are NOT included in the new program?', options: ['Journals and magazines', 'Books published before 2000', 'Books written in foreign languages', 'High-demand items on course reserve'], answer: 3 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-7/academic-talk.mp3',
      transcript: `PROFESSOR: Today I want to explore a question that sounds simple but turns out to be surprisingly deep: why is the sky blue? Most of you have probably heard that it has something to do with the atmosphere scattering sunlight, and that's correct — but let's unpack what that actually means.\n\nSunlight looks white, but it's actually a mixture of all the colors of the rainbow, each with a different wavelength. Blue and violet light have short wavelengths; red and orange light have long ones. When sunlight enters the atmosphere, it collides with molecules of gas — mostly nitrogen and oxygen. These molecules scatter the light in all directions, but here's the key point: they scatter shorter wavelengths much more strongly than longer ones. This is called Rayleigh scattering.\n\nBecause blue light is scattered far more than red, the blue light bounces around the sky and reaches your eyes from every direction. That's why the whole sky appears blue, not just the area around the sun.\n\nNow, a natural follow-up question: if violet light has an even shorter wavelength than blue, why isn't the sky violet? Two reasons. First, the sun emits less violet light than blue to begin with. Second, our eyes are simply more sensitive to blue than to violet. So the sky we perceive is blue.\n\nAnd this same principle explains sunsets. When the sun is low on the horizon, its light travels through much more atmosphere to reach us. Along that longer path, most of the blue light has already been scattered away, leaving the reds and oranges to dominate. So the very same physics that makes the midday sky blue makes the evening sky red.`,
      questions: [
        { type: 'mcq', id: 't7-l-at1', part: 8, text: 'What is the main topic of the lecture?', options: ['Why the sky appears blue', 'How the atmosphere formed', 'How rainbows are created', 'Why sunlight looks white'], answer: 0 },
        { type: 'mcq', id: 't7-l-at2', part: 8, text: 'According to the professor, what is Rayleigh scattering?', options: ['The reflection of light off clouds', 'The stronger scattering of shorter wavelengths of light by gas molecules', 'The absorption of light by oxygen', 'The bending of light through water droplets'], answer: 1 },
        { type: 'mcq', id: 't7-l-at3', part: 8, text: 'Why does the whole sky appear blue rather than just the area near the sun?', options: ['Because the ocean reflects onto the sky', 'Because clouds reflect blue light', 'Because scattered blue light reaches the eyes from every direction', 'Because the sun is blue'], answer: 2 },
        { type: 'mcq', id: 't7-l-at4', part: 8, text: 'Why isn\'t the sky violet, according to the professor?', options: ['Violet light has a longer wavelength than blue.', 'The atmosphere absorbs all violet light.', 'Violet light is not scattered at all.', 'The sun emits less violet light and our eyes are more sensitive to blue.'], answer: 3 },
        { type: 'mcq', id: 't7-l-at5', part: 8, text: 'How does the professor explain why sunsets are red?', options: ['At sunset, light travels through more atmosphere, so most blue is scattered away, leaving reds and oranges.', 'Red light is emitted only in the evening.', 'Pollution turns the sky red.', 'The sun changes color in the evening.'], answer: 0 },
      ],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Build a Sentence',
      instructions: 'Put the words in the correct order to make a grammatical sentence.',
      questions: [
        { type: 'sentencebuild', id: 't7-w-bs1', part: 9, tiles: ['They', 'are', 'building', 'a new bridge', 'across the river'], answer: ['They', 'are', 'building', 'a new bridge', 'across the river'] },
        { type: 'sentencebuild', id: 't7-w-bs2', part: 9, tiles: ['your passport', 'Don\'t', 'to bring', 'forget'], answer: ['Don\'t', 'forget', 'to bring', 'your passport'] },
        { type: 'sentencebuild', id: 't7-w-bs3', part: 9, tiles: ['who', 'The woman', 'us', 'helped', 'was very kind'], answer: ['The woman', 'who', 'helped', 'us', 'was very kind'] },
        { type: 'sentencebuild', id: 't7-w-bs4', part: 9, tiles: ['harder', 'If', 'had studied', 'she', 'passed', 'she would have'], answer: ['If', 'she', 'had studied', 'harder', 'she would have', 'passed'] },
        { type: 'sentencebuild', id: 't7-w-bs5', part: 9, tiles: ['is', 'than', 'This exam', 'the last one', 'easier'], answer: ['This exam', 'is', 'easier', 'than', 'the last one'] },
        { type: 'sentencebuild', id: 't7-w-bs6', part: 9, tiles: ['the lights', 'leaving,', 'Before', 'off', 'turn', 'please'], answer: ['Before', 'leaving,', 'please', 'turn', 'off', 'the lights'] },
      ],
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't7-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You are a member of a university club. The club is planning its end-of-year trip, but the proposed date is during your final exams. You want to suggest a different date and offer to help organize the trip.\n\nWrite an email to the club president.`,
          text: 'In your email: explain the problem with the date, make your suggestion clearly, and offer your help, using a polite tone. Write approximately 80–120 words.',
          minWords: 80 },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't7-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on education. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Bello: Some universities are considering whether to make attendance at lectures optional, since recordings are available online. Do you think lecture attendance should be required? Why or why not?\n\nStudent (Mei): I think attendance should be optional. Students learn in different ways, and some concentrate better watching recordings at their own pace.\n\nStudent (Diego): I disagree. Being physically present keeps students engaged and allows them to ask questions and interact with classmates, which recordings cannot replace.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100 },
      ],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't7-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-7/repeat-1.mp3', targetSentence: 'The class starts at ten.' },
        { type: 'repeat', id: 't7-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-7/repeat-2.mp3', targetSentence: 'She locked the door and left for work.' },
        { type: 'repeat', id: 't7-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-7/repeat-3.mp3', targetSentence: 'The team presented their findings at the conference last week.' },
        { type: 'repeat', id: 't7-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-7/repeat-4.mp3', targetSentence: 'The bridge that connects the two towns was built over a century ago.' },
        { type: 'repeat', id: 't7-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-7/repeat-5.mp3', targetSentence: 'Once the results have been reviewed, the committee will announce its decision to the applicants.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't7-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: Let\'s begin. Describe a place you would like to visit in the future. Where is it, and why do you want to go there?' },
        { type: 'speak', id: 't7-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to read the news online, while others prefer newspapers or television. Which do you prefer, and why? Give reasons and an example.' },
        { type: 'speak', id: 't7-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your town can spend money to either plant more trees or add more street lighting. Which would you recommend, and why? Explain how it would benefit residents.' },
        { type: 'speak', id: 't7-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how might the way students learn languages change in the next twenty years? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
