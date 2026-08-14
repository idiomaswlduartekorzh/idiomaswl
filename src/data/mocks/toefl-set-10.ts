import type { MockExam } from './types';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Audios bajo /audio/toefl/set-10/ — pendientes (ver checklist de medios).

const mock: MockExam = {
  id: 'set-10',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 10 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Reading — Complete the Words',
      instructions: 'Complete each word so the text makes sense. Some letters are given.',
      questions: [
        {
          type: 'wordcomplete', id: 't10-r-cw1', part: 1, qRange: [1, 6],
          instructions: 'A student is writing a review of a restaurant.',
          template: `I had dinner at Green Table last night and I would {{1}} it to anyone. The service was {{2}} — our food arrived quickly and the waiter was very friendly. The vegetable curry was {{3}}, full of flavor, and not too expensive. My only {{4}} is that the restaurant was quite {{5}}, so it was a little hard to talk. Still, I will definitely {{6}} again.`,
          blanks: [
            { num: 1, prefix: 'rec', answer: 'recommend' },
            { num: 2, prefix: 'exc', answer: 'excellent' },
            { num: 3, prefix: 'del', answer: 'delicious' },
            { num: 4, prefix: 'compl', answer: 'complaint' },
            { num: 5, prefix: 'no', answer: 'noisy' },
            { num: 6, prefix: 'ret', answer: 'return' },
          ],
        },
        {
          type: 'wordcomplete', id: 't10-r-cw2', part: 1, qRange: [7, 12],
          instructions: 'The following is from an article about rivers.',
          template: `A river is a natural stream of water that flows toward an ocean, lake, or another river. Rivers begin in high ground, often from rain or melting {{1}}, and gradually flow {{2}}. Along the way, they shape the {{3}}, carving valleys and carrying soil. For thousands of years, humans have settled near rivers because they provide fresh water, {{4}} for crops, and a route for {{5}}. Today, however, many rivers are threatened by {{6}} from factories and farms.`,
          blanks: [
            { num: 1, prefix: 'sn', answer: 'snow' },
            { num: 2, prefix: 'dow', answer: 'downhill' },
            { num: 3, prefix: 'lan', answer: 'landscape' },
            { num: 4, prefix: 'irr', answer: 'irrigation' },
            { num: 5, prefix: 'tra', answer: 'transport' },
            { num: 6, prefix: 'poll', answer: 'pollution' },
          ],
        },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Course notice)',
      instructions: 'Read the notice and answer the questions.',
      passage: `EVENING LANGUAGE COURSES — ENROLLMENT NOTICE\n\nSpring-term evening courses in Spanish, French, and Mandarin begin the week of April 6.\n\n• Classes meet once a week for ten weeks, from 6:00 to 8:00 p.m.\n• Beginners and intermediate levels are available; a free placement test helps you choose the right level.\n• Course fees include all materials. A 15% early-bird discount applies to enrollments completed before March 20.\n• Minimum class size is six students; if too few enroll, the class may be postponed and fees fully refunded.`,
      passageTitle: 'Course notice',
      questions: [
        { type: 'mcq', id: 't10-r-dl1', part: 2, text: 'How often do the classes meet?', options: ['Only on weekends', 'Every day', 'Once a week for ten weeks', 'Twice a week'], answer: 2 },
        { type: 'mcq', id: 't10-r-dl2', part: 2, text: 'How can a student get a 15% discount?', options: ['By choosing the beginner level', 'By paying in cash', 'By taking the placement test', 'By enrolling before March 20'], answer: 3 },
        { type: 'mcq', id: 't10-r-dl3', part: 2, text: 'What happens if too few students enroll?', options: ['The class may be postponed and fees fully refunded.', 'Students must pay extra.', 'The class moves online.', 'The class runs anyway.'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Chat messages)',
      instructions: 'Read the messages and answer the questions.',
      passage: `NORA: Are you free to help me move some furniture on Saturday?\n\nLEO: I think so. What time were you thinking?\n\nNORA: Maybe around ten in the morning? It shouldn't take more than two hours.\n\nLEO: Ten works. Should I bring anything?\n\nNORA: If you have gloves, bring them — some of the boxes are heavy. I'll order pizza afterward as a thank-you.\n\nLEO: Sounds like a deal. See you Saturday at ten.`,
      passageTitle: 'Chat messages',
      questions: [
        { type: 'mcq', id: 't10-r-dl4', part: 3, text: 'What does Nora ask Leo to do?', options: ['Buy furniture', 'Help her move furniture on Saturday', 'Order pizza', 'Drive her to the store'], answer: 1 },
        { type: 'mcq', id: 't10-r-dl5', part: 3, text: 'What does Nora suggest Leo bring?', options: ['Money for pizza', 'A truck', 'Gloves', 'His own boxes'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Reading — Read an Academic Passage',
      instructions: 'Read the passage and answer questions.',
      passage: `Photosynthesis is the process by which plants, algae, and certain bacteria convert light energy into chemical energy, and it is arguably the most important chemical reaction on Earth. Nearly all life depends on it, either directly or indirectly, because it is the ultimate source of the food we eat and the oxygen we breathe.\n\nIn simple terms, photosynthesis takes carbon dioxide from the air and water from the soil and, using energy captured from sunlight, transforms them into glucose—a sugar the plant uses for energy and growth—while releasing oxygen as a by-product. The green pigment that captures light, chlorophyll, is what gives most plants their color and is essential to the process.\n\nWhat makes photosynthesis so significant is its role in two global cycles. First, it is the foundation of nearly every food chain. Plants, as producers, convert sunlight into energy that herbivores consume, and that energy passes up the chain to predators. Without photosynthesis, these food chains would collapse. Second, photosynthesis is central to the carbon cycle. By absorbing carbon dioxide, plants help regulate the amount of this heat-trapping gas in the atmosphere. This is one reason forests are so important in discussions of climate change: they act as carbon "sinks," storing carbon that would otherwise contribute to warming.\n\nInterestingly, the oxygen-rich atmosphere we depend on is itself a product of photosynthesis. Billions of years ago, the Earth's atmosphere contained almost no free oxygen. It was early photosynthetic bacteria that gradually filled the air with oxygen, an event so transformative that scientists call it the Great Oxidation. In a very real sense, the air we breathe was manufactured by living organisms over an immense span of time—and continues to be renewed by them today.`,
      passageTitle: 'Photosynthesis',
      questions: [
        { type: 'mcq', id: 't10-r-ap1', part: 4, text: 'According to the passage, why is photosynthesis so important?', options: ['It only occurs in the ocean.', 'It produces carbon dioxide.', 'It is a rare chemical reaction.', 'It is the ultimate source of our food and oxygen.'], answer: 3 },
        { type: 'mcq', id: 't10-r-ap2', part: 4, text: 'What does photosynthesis produce, according to paragraph 2?', options: ['Glucose, with oxygen released as a by-product', 'Only carbon dioxide', 'Chlorophyll', 'Only oxygen'], answer: 0 },
        { type: 'mcq', id: 't10-r-ap3', part: 4, text: 'Why are forests described as carbon "sinks"?', options: ['They release large amounts of carbon dioxide.', 'They absorb and store carbon that would otherwise contribute to warming.', 'They produce no oxygen.', 'They block sunlight.'], answer: 1 },
        { type: 'mcq', id: 't10-r-ap4', part: 4, text: 'What was the "Great Oxidation"?', options: ['A period when oxygen disappeared', 'A mass extinction of plants', 'The gradual filling of the atmosphere with oxygen by early photosynthetic bacteria', 'The invention of photosynthesis by humans'], answer: 2 },
        { type: 'mcq', id: 't10-r-ap5', part: 4, text: 'What is the main point of the final paragraph?', options: ['Photosynthesis stopped billions of years ago.', 'Bacteria cannot perform photosynthesis.', 'Oxygen has always been abundant.', 'The oxygen we breathe was produced by living organisms over a long time and is still renewed by them.'], answer: 3 },
        { type: 'multiselect', id: 't10-r-ap6', part: 4, qRange: [6, 6], text: 'Select the TWO statements supported by the passage.', options: [
          { letter: 'A', text: 'Photosynthesis is the foundation of nearly every food chain.' },
          { letter: 'B', text: 'Plants release carbon dioxide during photosynthesis and absorb oxygen.' },
          { letter: 'C', text: 'Early photosynthetic bacteria helped create the oxygen-rich atmosphere.' },
          { letter: 'D', text: 'Chlorophyll blocks sunlight from reaching plants.' },
        ], selectCount: 2, answers: ['A', 'C'] },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't10-l-cr1', part: 5, audioUrl: '/audio/toefl/set-10/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ['No, I don\'t like swimming.', 'The soup is ready.', 'She arrives at noon.', 'It\'s just past the cafeteria, on your right.'], answer: 3 },
        { type: 'mcq', id: 't10-l-cr2', part: 5, audioUrl: '/audio/toefl/set-10/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ['It is five kilograms.', 'Sure, I\'d be happy to review it for you.', 'The bus was late.', 'Yes, she is a doctor.'], answer: 1 },
        { type: 'mcq', id: 't10-l-cr3', part: 5, audioUrl: '/audio/toefl/set-10/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ['It costs ten dollars.', 'Try the office on the third floor — they handle that.', 'The tea is too hot.', 'He plays football.'], answer: 1 },
        { type: 'mcq', id: 't10-l-cr4', part: 5, audioUrl: '/audio/toefl/set-10/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ['The film was long.', 'No, I have not been there.', 'It is made of wood.', 'Don\'t worry — we can reschedule for next week.'], answer: 3 },
        { type: 'mcq', id: 't10-l-cr5', part: 5, audioUrl: '/audio/toefl/set-10/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ['The shop is closed.', 'She teaches biology.', 'It is quite far.', 'Yes, I got the job — I start next month!'], answer: 3 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between a student and an academic advisor. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-10/conversation.mp3',
      transcript: `STUDENT: Hi, thanks for seeing me. I'm a second-year biology major, but lately I've been wondering if I should switch to environmental science.\n\nADVISOR: That's a big decision. What's drawing you toward environmental science?\n\nSTUDENT: Honestly, I love my biology classes, but I keep feeling like I want to work on real-world problems — climate, conservation, that kind of thing. Environmental science seems more focused on that.\n\nADVISOR: That's a good instinct to explore. Before you switch, though, let me point something out. A lot of the biology courses you've already taken would count toward an environmental science degree — ecology, chemistry, statistics. So switching now probably wouldn't set you back much.\n\nSTUDENT: Oh, that's reassuring. I was worried I'd lose a whole year.\n\nADVISOR: You likely wouldn't. But here's my advice: before you make it official, take one environmental science elective next semester. That way you can test whether the actual coursework matches what you're imagining. Sometimes a field sounds perfect until you're in the classroom.\n\nSTUDENT: That makes a lot of sense. I'd rather try one course than commit blindly.\n\nADVISOR: Exactly. Take the elective, see how it feels, and come back and talk to me at the end of the semester. Then we'll decide together.`,
      questions: [
        { type: 'mcq', id: 't10-l-cv1', part: 6, text: 'Why has the student come to see the advisor?', options: ['To drop out of university', 'To discuss switching from biology to environmental science', 'To complain about a professor', 'To ask for a scholarship'], answer: 1 },
        { type: 'mcq', id: 't10-l-cv2', part: 6, text: 'What is drawing the student toward environmental science?', options: ['A friend recommended it.', 'It is easier than biology.', 'A desire to work on real-world problems like climate and conservation.', 'It has fewer required courses.'], answer: 2 },
        { type: 'mcq', id: 't10-l-cv3', part: 6, text: 'What reassuring point does the advisor make?', options: ['Environmental science has no exams.', 'The student can switch back anytime.', 'The student will graduate early.', 'Many biology courses already taken would count toward an environmental science degree.'], answer: 3 },
        { type: 'mcq', id: 't10-l-cv4', part: 6, text: 'What does the advisor recommend the student do first?', options: ['Take one environmental science elective to test whether it fits', 'Talk to their parents', 'Change universities', 'Switch majors immediately'], answer: 0 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-10/announcement.mp3',
      transcript: `Good evening, residents. This is a brief announcement from the residence hall management. Starting this weekend, we will be upgrading the internet system throughout the building to provide faster and more reliable service. As part of this work, the internet may be temporarily unavailable on Saturday between eight a.m. and noon.\n\nWe recommend planning any important online work — such as submitting assignments or attending online classes — around this window. If you have a deadline on Saturday morning, please consider using the computer lab in the library, which will not be affected. Once the upgrade is complete, you should notice a significant improvement in connection speed, especially in the evenings when usage is highest. We appreciate your patience during this short interruption. Thank you.`,
      questions: [
        { type: 'mcq', id: 't10-l-an1', part: 7, text: 'What is the announcement mainly about?', options: ['A new library opening', 'An internet system upgrade in the residence hall', 'A change in room assignments', 'A power outage'], answer: 1 },
        { type: 'mcq', id: 't10-l-an2', part: 7, text: 'When may the internet be unavailable?', options: ['Sunday afternoon', 'Saturday between 8 a.m. and noon', 'All weekend', 'Every evening'], answer: 1 },
        { type: 'mcq', id: 't10-l-an3', part: 7, text: 'What does the announcement suggest for students with a Saturday-morning deadline?', options: ['Contact the professor', 'Use their phones only', 'Wait until Monday', 'Use the computer lab in the library, which will not be affected'], answer: 3 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-10/academic-talk.mp3',
      transcript: `PROFESSOR: Today I want to introduce an idea from economics that has a surprisingly wide reach: the concept of opportunity cost. It sounds technical, but it captures something we all experience every day. Opportunity cost is simply the value of the next-best thing you give up when you make a choice.\n\nHere's the key insight: every choice has a cost, even when no money changes hands. Suppose you have a free Saturday afternoon. You could study, sleep, see friends, or work a shift for extra money. If you choose to study, the opportunity cost isn't zero just because studying is free — the cost is whatever you valued most among the things you gave up. Maybe that's the income from the shift you didn't work, or the relaxation you sacrificed. Economists argue that the true cost of anything is what you forgo to get it.\n\nWhy does this matter? Because people often ignore opportunity costs and focus only on out-of-pocket expenses. Imagine a business owner who owns her shop building and thinks she has no rent to pay. An economist would point out that she does have a cost: she could be renting that building to someone else. By using it herself, she gives up that rental income. That forgone income is a real opportunity cost, even though no bill arrives in the mail.\n\nThe concept also explains why "free" is rarely truly free. A free two-hour seminar still costs you two hours you could have spent otherwise. So the next time you evaluate a decision, don't just ask what it costs in dollars. Ask what you're giving up. Thinking in terms of opportunity cost tends to lead to better decisions, because it forces you to compare your choice against the best available alternative, not against nothing.`,
      questions: [
        { type: 'mcq', id: 't10-l-at1', part: 8, text: 'How does the professor define opportunity cost?', options: ['The value of the next-best thing you give up when you make a choice', 'The total cost of running a business', 'A tax on economic activity', 'The money you spend on a purchase'], answer: 0 },
        { type: 'mcq', id: 't10-l-at2', part: 8, text: 'What is the "key insight" the professor emphasizes?', options: ['Only expensive choices have costs.', 'Every choice has a cost, even when no money changes hands.', 'Free things have no cost.', 'Opportunity cost applies only to businesses.'], answer: 1 },
        { type: 'mcq', id: 't10-l-at3', part: 8, text: 'What is the opportunity cost for the shop owner who uses her own building?', options: ['The price of the building', 'The cost of repairs', 'The rental income she gives up by not renting it to someone else', 'Her employees\' wages'], answer: 2 },
        { type: 'mcq', id: 't10-l-at4', part: 8, text: 'Why does the professor say "free" is rarely truly free?', options: ['Because free events are usually low quality', 'Because businesses always charge hidden fees', 'Because everything requires payment', 'Because even free things cost you the time or resources you could have used otherwise'], answer: 3 },
        { type: 'mcq', id: 't10-l-at5', part: 8, text: 'According to the professor, why does thinking in opportunity costs lead to better decisions?', options: ['It forces you to compare your choice against the best available alternative, not against nothing.', 'It makes decisions faster.', 'It eliminates all costs.', 'It focuses only on money.'], answer: 0 },
      ],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Build a Sentence',
      instructions: 'Put the words in the correct order to make a grammatical sentence.',
      questions: [
        { type: 'sentencebuild', id: 't10-w-bs1', part: 9, tiles: ['He', 'plays', 'the guitar', 'in', 'a local band'], answer: ['He', 'plays', 'the guitar', 'in', 'a local band'] },
        { type: 'sentencebuild', id: 't10-w-bs2', part: 9, tiles: ['the window', 'Could', 'open', 'you', 'please'], answer: ['Could', 'you', 'please', 'open', 'the window'] },
        { type: 'sentencebuild', id: 't10-w-bs3', part: 9, tiles: ['visited', 'The city', 'we', 'was', 'beautiful', 'that'], answer: ['The city', 'that', 'we', 'visited', 'was', 'beautiful'] },
        { type: 'sentencebuild', id: 't10-w-bs4', part: 9, tiles: ['arrive', 'we', 'As soon as', 'you', 'call', 'will', 'I'], answer: ['As soon as', 'we', 'arrive', 'I', 'will', 'call', 'you'] },
        { type: 'sentencebuild', id: 't10-w-bs5', part: 9, tiles: ['is', 'The winter', 'here', 'colder', 'than', 'in my country'], answer: ['The winter', 'here', 'is', 'colder', 'than', 'in my country'] },
        { type: 'sentencebuild', id: 't10-w-bs6', part: 9, tiles: ['the exam,', 'Not knowing', 'she', 'the answer,', 'left', 'blank'], answer: ['Not knowing', 'the answer,', 'she', 'left', 'the exam,', 'blank'] },
      ],
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't10-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: Your neighbor has been playing loud music late at night, making it hard for you to sleep before your morning classes. You want to politely explain the problem and ask them to lower the volume after 10 p.m.\n\nWrite an email to your neighbor.`,
          text: 'In your email: explain the problem, make your request clearly, and keep a polite, friendly tone. Write as much as you can in complete sentences.',
          minWords: 0, timeLimitSeconds: 420, minimumWordsPolicy: 'none-published', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't10-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on work and society. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Weber: Many companies now allow employees to work from home some or all of the time. Do you think working from home is better or worse than working in an office? Why?\n\nStudent (Aisha): I think working from home is better. It saves commuting time, reduces stress, and lets people focus without office distractions. For example, without a daily commute, I have more time to exercise in the morning and start work feeling more energized.\n\nStudent (Tomás): I see the appeal, but I think the office is better for teamwork. It's easier to solve problems face to face, and people can feel isolated working alone at home. For example, my last group project moved much faster once we could sketch ideas together on a whiteboard instead of explaining them over video calls.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100, timeLimitSeconds: 600, minimumWordsPolicy: 'recommended-100', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't10-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-10/repeat-1.mp3', targetSentence: 'The park is near my house.' },
        { type: 'repeat', id: 't10-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-10/repeat-2.mp3', targetSentence: 'She turned off the computer and went to bed.' },
        { type: 'repeat', id: 't10-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-10/repeat-3.mp3', targetSentence: 'The volunteers cleaned the beach every Saturday morning.' },
        { type: 'repeat', id: 't10-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-10/repeat-4.mp3', targetSentence: 'The article explained how ocean currents affect the climate of coastal regions.' },
        { type: 'repeat', id: 't10-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-10/repeat-5.mp3', targetSentence: 'Even though the project was challenging, the team completed it ahead of the original schedule.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't10-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: To begin, describe a skill you would like to learn. What is it, and why do you want to learn it?' },
        { type: 'speak', id: 't10-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to work in a team, while others prefer to work alone. Which do you prefer, and why? Give reasons and an example.' },
        { type: 'speak', id: 't10-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your university has money to improve either the library or the cafeteria. Which would you recommend, and why? Explain how it would benefit students.' },
        { type: 'speak', id: 't10-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how might cities change over the next twenty years to become more environmentally friendly? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
