import type { MockExam } from './types';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Audios bajo /audio/toefl/set-11/ — pendientes (ver checklist de medios).

const mock: MockExam = {
  id: 'set-11',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 11 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Reading — Complete the Words',
      instructions: 'Complete each word so the text makes sense. Some letters are given.',
      questions: [
        {
          type: 'wordcomplete', id: 't11-r-cw1', part: 1, qRange: [1, 6],
          instructions: 'A student is writing to a club organizer.',
          template: `Hi Daniel,\n\nI saw the poster for the photography {{1}} and I would love to {{2}}. I am a complete {{3}}, though — I have never used a professional camera. Is that okay, or do I need {{4}}? Also, could you tell me how much the {{5}} fee is and whether equipment is {{6}}? Thanks a lot.\n\nBest,\nPriya`,
          blanks: [
            { num: 1, prefix: 'cl', answer: 'club' },
            { num: 2, prefix: 'j', answer: 'join' },
            { num: 3, prefix: 'beg', answer: 'beginner' },
            { num: 4, prefix: 'exp', answer: 'experience' },
            { num: 5, prefix: 'membe', answer: 'membership' },
            { num: 6, prefix: 'prov', answer: 'provided' },
          ],
        },
        {
          type: 'wordcomplete', id: 't11-r-cw2', part: 1, qRange: [7, 12],
          instructions: 'The following is from an article about deserts.',
          template: `Deserts are regions that receive very little {{1}}, usually less than 250 millimeters a year. Despite the harsh conditions, many plants and animals have {{2}} to survive there. Cacti, for example, store water in their thick {{3}}, while some animals stay underground during the day to avoid the {{4}}. Deserts are not always hot; some, like those near the poles, are extremely {{5}}. Scientists worry that human activity is causing some fertile land to turn into desert, a process called {{6}}.`,
          blanks: [
            { num: 1, prefix: 'rai', answer: 'rainfall' },
            { num: 2, prefix: 'ada', answer: 'adapted' },
            { num: 3, prefix: 'st', answer: 'stems' },
            { num: 4, prefix: 'he', answer: 'heat' },
            { num: 5, prefix: 'co', answer: 'cold' },
            { num: 6, prefix: 'desert', answer: 'desertification' },
          ],
        },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Recycling flyer)',
      instructions: 'Read the flyer and answer the questions.',
      passage: `NEIGHBORHOOD RECYCLING — WHAT GOES WHERE\n\nBlue bin (paper & card): newspapers, magazines, cardboard boxes (flattened). No greasy pizza boxes.\nGreen bin (glass & cans): bottles and jars (rinsed), metal cans. No broken window glass.\nBrown bin (food & garden waste): fruit and vegetable scraps, grass, leaves. No plastic bags.\n\nCollection days: Blue bin — Mondays; Green bin — Wednesdays; Brown bin — Fridays. Please put bins out by 7:00 a.m. Items left beside the bins will not be collected.`,
      passageTitle: 'Recycling flyer',
      questions: [
        { type: 'mcq', id: 't11-r-dl1', part: 2, text: 'Which item does NOT belong in the blue bin?', options: ['Newspapers', 'Flattened cardboard boxes', 'Greasy pizza boxes', 'Magazines'], answer: 2 },
        { type: 'mcq', id: 't11-r-dl2', part: 2, text: 'When is the green bin collected?', options: ['Weekends', 'Mondays', 'Wednesdays', 'Fridays'], answer: 2 },
        { type: 'mcq', id: 't11-r-dl3', part: 2, text: 'What happens to items left beside the bins?', options: ['They are taken to a special center.', 'They are collected on Fridays only.', 'They are collected first.', 'They will not be collected.'], answer: 3 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Confirmation email)',
      instructions: 'Read the email and answer the questions.',
      passage: `From: Mountain View Hostel\nTo: Lucia Ferrari\nSubject: Booking confirmed\n\nDear Lucia,\n\nYour booking is confirmed for two nights, from July 12 to July 14, in a shared four-bed room. Check-in is from 2:00 p.m.; check-out is by 11:00 a.m.\n\nBreakfast is included and served from 7:00 to 9:30 a.m. The hostel has a shared kitchen, free Wi-Fi, and lockers (please bring your own padlock). Reception is open 24 hours. If you arrive after 10:00 p.m., please let us know in advance so we can arrange your key.\n\nSee you soon!`,
      passageTitle: 'Confirmation email',
      questions: [
        { type: 'mcq', id: 't11-r-dl4', part: 3, text: 'What time is check-out?', options: ['By 2:00 p.m.', 'By 9:30 a.m.', 'By 10:00 p.m.', 'By 11:00 a.m.'], answer: 3 },
        { type: 'mcq', id: 't11-r-dl5', part: 3, text: 'What should Lucia do if she arrives after 10:00 p.m.?', options: ['Sleep outside', 'Let the hostel know in advance so they can arrange her key', 'Pay an extra fee', 'Cancel the booking'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Reading — Read an Academic Passage',
      instructions: 'Read the passage and answer questions.',
      passage: `Antibiotics are among the most important discoveries in the history of medicine. Before their widespread use, a simple infection from a cut or a common illness such as pneumonia could easily be fatal. The introduction of penicillin in the 1940s transformed medicine, turning once-deadly infections into treatable conditions and making complex surgeries far safer. Yet the very success of antibiotics has created a serious and growing problem: antibiotic resistance.\n\nAntibiotics work by killing bacteria or stopping them from reproducing. However, bacteria reproduce rapidly, and through random genetic mutation, some individuals may happen to survive exposure to a drug. These survivors pass on their resistance to the next generation. Over time, as we use more and more antibiotics, we unintentionally select for bacteria that the drugs can no longer kill. This is evolution by natural selection, playing out in a matter of days rather than millennia.\n\nSeveral human behaviors accelerate this process. Taking antibiotics when they are not needed—for instance, for viral infections like the common cold, which antibiotics cannot treat—exposes bacteria to drugs unnecessarily. Failing to complete a prescribed course can leave behind the hardier bacteria. The heavy use of antibiotics in agriculture, where they are often given to healthy livestock to promote growth, adds further pressure. As a result, "superbugs" resistant to multiple antibiotics have emerged, and infections that were once easily cured are becoming difficult or impossible to treat.\n\nScientists are responding on several fronts: searching for new antibiotics, developing rapid tests so doctors prescribe them only when necessary, and promoting more careful use worldwide. But developing new antibiotics is slow and expensive, and bacteria continue to evolve. Many experts warn that without coordinated global action, we could enter a "post-antibiotic era" in which common infections once again become life-threatening—a sobering reminder that a medical triumph, if used carelessly, can be undermined by the very organisms it was designed to defeat.`,
      passageTitle: 'Antibiotic Resistance',
      questions: [
        { type: 'mcq', id: 't11-r-ap1', part: 4, text: 'According to paragraph 1, how did the introduction of penicillin change medicine?', options: ['It replaced all other medicines.', 'It made surgeries more dangerous.', 'It turned once-deadly infections into treatable conditions.', 'It caused antibiotic resistance immediately.'], answer: 2 },
        { type: 'mcq', id: 't11-r-ap2', part: 4, text: 'How does antibiotic resistance develop, according to paragraph 2?', options: ['Antibiotics create new bacteria.', 'Resistance only develops over thousands of years.', 'Bacteria decide to resist the drugs.', 'Some bacteria survive due to random mutation and pass on their resistance.'], answer: 3 },
        { type: 'mcq', id: 't11-r-ap3', part: 4, text: 'Which behavior does the passage identify as accelerating resistance?', options: ['Taking antibiotics for viral infections they cannot treat', 'Avoiding antibiotics entirely', 'Using antibiotics only in hospitals', 'Completing a full course of antibiotics'], answer: 0 },
        { type: 'mcq', id: 't11-r-ap4', part: 4, text: 'What are "superbugs," as described in the passage?', options: ['Very large bacteria', 'Bacteria resistant to multiple antibiotics', 'A new type of antibiotic', 'Harmless bacteria'], answer: 1 },
        { type: 'mcq', id: 't11-r-ap5', part: 4, text: 'What does the author mean by a "post-antibiotic era"?', options: ['A time when new antibiotics are discovered daily', 'A time when antibiotics are cheap and plentiful', 'A time when common infections could once again become life-threatening because antibiotics no longer work', 'A time when no one gets sick'], answer: 2 },
        { type: 'multiselect', id: 't11-r-ap6', part: 4, qRange: [6, 6], text: 'Select the TWO statements supported by the passage.', options: [
          { letter: 'A', text: 'Antibiotic resistance is a form of evolution by natural selection.' },
          { letter: 'B', text: 'Antibiotics are effective against viral infections like the common cold.' },
          { letter: 'C', text: 'The use of antibiotics in agriculture adds pressure that promotes resistance.' },
          { letter: 'D', text: 'Developing new antibiotics is fast and inexpensive.' },
        ], selectCount: 2, answers: ['A', 'C'] },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't11-l-cr1', part: 5, audioUrl: '/audio/toefl/set-11/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ['The bread is fresh.', 'She left this morning.', 'It\'s right next to the main entrance.', 'No, I don\'t play golf.'], answer: 2 },
        { type: 'mcq', id: 't11-l-cr2', part: 5, audioUrl: '/audio/toefl/set-11/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ['Sure, I can help you study tonight.', 'The window is closed.', 'Yes, he is an engineer.', 'It is three meters wide.'], answer: 0 },
        { type: 'mcq', id: 't11-l-cr3', part: 5, audioUrl: '/audio/toefl/set-11/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ['Check the schedule posted by the door.', 'The juice is cold.', 'He arrives on Sunday.', 'It costs twelve dollars.'], answer: 0 },
        { type: 'mcq', id: 't11-l-cr4', part: 5, audioUrl: '/audio/toefl/set-11/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ['No, I have not tried it.', 'It is made of plastic.', 'Of course — take as long as you need.', 'The bus was full.'], answer: 2 },
        { type: 'mcq', id: 't11-l-cr5', part: 5, audioUrl: '/audio/toefl/set-11/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ['She teaches art.', 'It is quite near.', 'Yes, the presentation went really well!', 'The café is closed.'], answer: 2 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between two students. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-11/conversation.mp3',
      transcript: `WOMAN: Are you going to the study-skills workshop this afternoon?\n\nMAN: I wasn't planning to. Do you think it's worth it? I've got a lot of reading to catch up on.\n\nWOMAN: Honestly, I think it might be. It's on note-taking and time management. And you're always saying you feel behind and disorganized.\n\nMAN: That's true. My notes are a mess — I write down everything the professor says, and then I can't find anything useful later.\n\nWOMAN: See, that's exactly what they'll cover. Apparently there's a method where you only write key points during the lecture and then summarize in your own words afterward. Supposedly you remember much more that way.\n\nMAN: Huh. That actually sounds like it could fix my problem. But it's from three to four, and I have so much reading.\n\nWOMAN: One hour now could save you hours later, though. If you take better notes, you won't have to reread everything three times.\n\nMAN: Okay, you've convinced me. I'll come. If nothing else, it'll stop me from feeling guilty about procrastinating on the reading.`,
      questions: [
        { type: 'mcq', id: 't11-l-cv1', part: 6, text: 'What is the woman encouraging the man to do?', options: ['Attend a study-skills workshop', 'Change his major', 'Join a study group', 'Skip his reading'], answer: 0 },
        { type: 'mcq', id: 't11-l-cv2', part: 6, text: 'What problem does the man have with his notes?', options: ['He never takes notes.', 'He writes down everything and later cannot find anything useful.', 'He loses his notebooks.', 'He writes too slowly.'], answer: 1 },
        { type: 'mcq', id: 't11-l-cv3', part: 6, text: 'What note-taking method does the woman describe?', options: ['Not taking notes at all', 'Recording the entire lecture', 'Writing only key points during the lecture and summarizing in your own words afterward', 'Copying the textbook'], answer: 2 },
        { type: 'mcq', id: 't11-l-cv4', part: 6, text: 'Why does the woman say the workshop is worth the time?', options: ['It offers free food.', 'It counts for extra credit.', 'It is required.', 'One hour now could save him hours of rereading later.'], answer: 3 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-11/announcement.mp3',
      transcript: `Good afternoon, students. This is a reminder from the Registrar's Office about course registration for the spring semester. Registration opens next Monday at eight a.m. and will be done entirely online through the student portal.\n\nA few important points. First, check your registration time — it's based on the number of credits you've completed, and students with more credits register earlier. You can find your assigned time slot on your portal dashboard. Second, before you can register, you must clear any holds on your account, such as unpaid library fines or an incomplete health form. Holds will prevent you from registering, so resolve them this week. Finally, popular courses fill quickly, so we strongly recommend logging in right at your assigned time and having a backup plan in case a class is full. If you have questions, our staff are available at the Registrar's Office all week. Thank you.`,
      questions: [
        { type: 'mcq', id: 't11-l-an1', part: 7, text: 'What is the announcement about?', options: ['Course registration for the spring semester', 'A new library policy', 'A graduation ceremony', 'A change in tuition fees'], answer: 0 },
        { type: 'mcq', id: 't11-l-an2', part: 7, text: 'What determines a student\'s registration time?', options: ['Their grade point average', 'The number of credits they have completed', 'Alphabetical order', 'The date they applied'], answer: 1 },
        { type: 'mcq', id: 't11-l-an3', part: 7, text: 'What must students do before they can register?', options: ['Write an essay', 'Pay next semester\'s full tuition', 'Clear any holds on their account, such as fines or an incomplete health form', 'Meet with an advisor'], answer: 2 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-11/academic-talk.mp3',
      transcript: `PROFESSOR: I want to talk about a bird that has fascinated scientists for over a century: the Arctic tern. What makes it remarkable is its migration. Every year, the Arctic tern travels from its breeding grounds in the Arctic all the way to the Antarctic and back. That's a round trip of roughly seventy thousand kilometers. Over a lifetime, which can be thirty years, a single tern may fly a distance equal to going to the moon and back several times.\n\nNow, why would a small bird undertake such an exhausting journey? The answer is elegant: by traveling between the two poles, the Arctic tern experiences two summers each year. It's always heading toward a region where days are long and food is abundant. So even though the journey is enormous, the payoff is nearly continuous access to rich feeding grounds and long daylight hours for catching fish.\n\nThe obvious question is: how does it navigate? A bird crossing entire oceans with no landmarks needs a reliable sense of direction. Research suggests terns use a combination of cues. They can sense the position of the sun and stars, and remarkably, they appear to detect the Earth's magnetic field, using it like a built-in compass. Some studies suggest young birds inherit a rough migratory program and then refine it through experience over successive journeys.\n\nWhat I find most striking is the efficiency. The tern doesn't fly in a straight line — that would mean battling headwinds. Instead, satellite tracking has shown that terns follow a winding route that takes advantage of prevailing wind patterns, adding distance but saving energy overall. It's a beautiful example of how evolution can produce behavior that looks almost like careful planning, even though no individual bird is consciously calculating anything.`,
      questions: [
        { type: 'mcq', id: 't11-l-at1', part: 8, text: 'What makes the Arctic tern remarkable, according to the professor?', options: ['Its ability to swim underwater', 'Its large size', 'Its bright colors', 'Its extremely long annual migration between the Arctic and Antarctic'], answer: 3 },
        { type: 'mcq', id: 't11-l-at2', part: 8, text: 'Why does the Arctic tern make this journey?', options: ['To experience two summers a year, always heading toward long days and abundant food', 'To find a mate', 'To avoid other birds', 'To escape predators'], answer: 0 },
        { type: 'mcq', id: 't11-l-at3', part: 8, text: 'How do terns navigate across oceans, according to the professor?', options: ['They follow other birds only.', 'They use cues such as the sun, stars, and the Earth\'s magnetic field.', 'They memorize landmarks.', 'They rely entirely on instinct with no cues.'], answer: 1 },
        { type: 'mcq', id: 't11-l-at4', part: 8, text: 'Why don\'t terns fly in a straight line?', options: ['They prefer to stay near land.', 'They get lost easily.', 'A winding route takes advantage of prevailing winds and saves energy overall.', 'Straight lines are longer.'], answer: 2 },
        { type: 'mcq', id: 't11-l-at5', part: 8, text: 'What does the professor find most striking about the tern\'s behavior?', options: ['That the journey is very short', 'That terns fly only during winter', 'That it looks like careful planning even though no bird consciously calculates', 'That terns cannot navigate at all'], answer: 2 },
      ],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Build a Sentence',
      instructions: 'Put the words in the correct order to make a grammatical sentence.',
      questions: [
        { type: 'sentencebuild', id: 't11-w-bs1', part: 9, tiles: ['They', 'moved', 'to', 'a new city', 'last year'], answer: ['They', 'moved', 'to', 'a new city', 'last year'] },
        { type: 'sentencebuild', id: 't11-w-bs2', part: 9, tiles: ['closing', 'you', 'the window', 'Would', 'mind'], answer: ['Would', 'you', 'mind', 'closing', 'the window'] },
        { type: 'sentencebuild', id: 't11-w-bs3', part: 9, tiles: ['met', 'The man', 'we', 'yesterday', 'is', 'a famous writer'], answer: ['The man', 'we', 'met', 'yesterday', 'is', 'a famous writer'] },
        { type: 'sentencebuild', id: 't11-w-bs4', part: 9, tiles: ['harder,', 'you', 'If', 'work', 'succeed', 'you will'], answer: ['If', 'you', 'work', 'harder,', 'you will', 'succeed'] },
        { type: 'sentencebuild', id: 't11-w-bs5', part: 9, tiles: ['is', 'This phone', 'the old one', 'than', 'better', 'much'], answer: ['This phone', 'is', 'much', 'better', 'than', 'the old one'] },
        { type: 'sentencebuild', id: 't11-w-bs6', part: 9, tiles: ['the door,', 'Opening', 'a large parcel', 'she', 'found'], answer: ['Opening', 'the door,', 'she', 'found', 'a large parcel'] },
      ],
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't11-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You applied for a part-time job at the campus library and were invited to an interview, but the proposed time clashes with a class you cannot miss. You want to ask whether the interview could be moved to another time.\n\nWrite an email to the library hiring manager.`,
          text: 'In your email: explain the conflict, request an alternative time, and keep a polite, professional tone. Write approximately 80–120 words.',
          minWords: 80 },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't11-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on media. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Silva: Some people think social media has mostly a positive effect on society, while others think it is mostly harmful. What is your view, and why?\n\nStudent (Nadia): I think it's mostly positive. Social media helps people stay connected, share information quickly, and organize for good causes.\n\nStudent (Ben): I disagree. It spreads misinformation, harms mental health, and often replaces real face-to-face relationships.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100 },
      ],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't11-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-11/repeat-1.mp3', targetSentence: 'The shop is closed today.' },
        { type: 'repeat', id: 't11-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-11/repeat-2.mp3', targetSentence: 'We watched a documentary about the ocean.' },
        { type: 'repeat', id: 't11-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-11/repeat-3.mp3', targetSentence: 'The teacher asked the students to work in small groups.' },
        { type: 'repeat', id: 't11-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-11/repeat-4.mp3', targetSentence: 'The city council approved a plan to build more bicycle lanes downtown.' },
        { type: 'repeat', id: 't11-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-11/repeat-5.mp3', targetSentence: 'Because the flight had been delayed, the passengers were offered vouchers for a free meal.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't11-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: Let\'s begin. Tell me about a subject you enjoyed studying in school. What was it, and why did you like it?' },
        { type: 'speak', id: 't11-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to save their money, while others prefer to spend it on experiences. Which are you, and why? Give reasons and an example.' },
        { type: 'speak', id: 't11-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your town can build either a new sports stadium or a new hospital. Which would you recommend, and why? Explain how it would benefit the community.' },
        { type: 'speak', id: 't11-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how might education change over the next twenty years because of technology? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
