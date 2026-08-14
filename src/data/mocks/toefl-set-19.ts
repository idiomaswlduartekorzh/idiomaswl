import type { MockExam } from './types';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Audios bajo /audio/toefl/set-19/ — pendientes (ver checklist de medios).

const mock: MockExam = {
  id: 'set-19',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 19 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Reading — Complete the Words',
      instructions: 'Complete each word so the text makes sense. Some letters are given.',
      questions: [
        {
          type: 'wordcomplete', id: 't19-r-cw1', part: 1, qRange: [1, 6],
          instructions: 'A student is writing to a museum about a school visit.',
          template: `Dear Education Team,\n\nI am a teacher planning a class {{1}} to your museum next month. I would like to bring a {{2}} of thirty students, aged twelve. Could you tell me whether we need to {{3}} in advance and what the {{4}} price is for schools? We would also be interested in a guided {{5}} if one is available. Finally, is there a space where the students can eat their {{6}}?\n\nThank you,\nMs. Flores`,
          blanks: [
            { num: 1, prefix: 'vi', answer: 'visit' },
            { num: 2, prefix: 'gr', answer: 'group' },
            { num: 3, prefix: 'bo', answer: 'book' },
            { num: 4, prefix: 'ti', answer: 'ticket' },
            { num: 5, prefix: 'to', answer: 'tour' },
            { num: 6, prefix: 'lu', answer: 'lunch' },
          ],
        },
        {
          type: 'wordcomplete', id: 't19-r-cw2', part: 1, qRange: [7, 12],
          instructions: 'The following is from an article about the human eye.',
          template: `The human eye is an amazing organ that allows us to {{1}} the world around us. Light enters through the {{2}} at the front of the eye and is focused by the lens onto the {{3}} at the back. There, special cells turn the light into {{4}} that travel along the optic nerve to the {{5}}, which creates the images we see. Many people need glasses because their eyes cannot focus light {{6}}.`,
          blanks: [
            { num: 1, prefix: 'se', answer: 'see' },
            { num: 2, prefix: 'pu', answer: 'pupil' },
            { num: 3, prefix: 'ret', answer: 'retina' },
            { num: 4, prefix: 'sig', answer: 'signals' },
            { num: 5, prefix: 'br', answer: 'brain' },
            { num: 6, prefix: 'corr', answer: 'correctly' },
          ],
        },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Recycling center hours)',
      instructions: 'Read the notice and answer the questions.',
      passage: `TOWN RECYCLING CENTER — OPENING HOURS & RULES\n\n• Open: Tuesday to Sunday, 8:00 a.m. – 5:00 p.m. Closed Mondays.\n• Bring proof of local residence (e.g. a utility bill) for large items.\n• Electrical items and batteries go in the special containers near the office.\n• Garden waste is accepted free of charge; building rubble has a small fee.\n• Staff cannot lift heavy items for you, so please bring help if needed.`,
      passageTitle: 'Recycling center notice',
      questions: [
        { type: 'mcq', id: 't19-r-dl1', part: 2, text: 'When is the recycling center closed?', options: ['Sundays', 'Mondays', 'Weekends', 'It never closes.'], answer: 1 },
        { type: 'mcq', id: 't19-r-dl2', part: 2, text: 'What must residents bring for large items?', options: ['A reservation', 'A special permit', 'Proof of local residence', 'Cash only'], answer: 2 },
        { type: 'mcq', id: 't19-r-dl3', part: 2, text: 'What does the notice say about heavy items?', options: ['Heavy items are not accepted.', 'There is a fee to lift them.', 'Staff will lift them for you.', 'Staff cannot lift them, so bring help if needed.'], answer: 3 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Reminder message)',
      instructions: 'Read the messages and answer the questions.',
      passage: `COACH: Reminder: football practice is moved to Thursday this week because the field is being used on Wednesday.\n\nDIEGO: Thanks, Coach. Same time as usual?\n\nCOACH: Yes, 4 p.m. to 6 p.m. Bring both your indoor and outdoor boots — if it rains we'll train in the sports hall.\n\nDIEGO: Got it. Should I let the others know?\n\nCOACH: I've already messaged the whole team, but a reminder never hurts. See you Thursday.`,
      passageTitle: 'Team messages',
      questions: [
        { type: 'mcq', id: 't19-r-dl4', part: 3, text: 'Why is practice moved to Thursday?', options: ['The field is being used on Wednesday.', 'The team requested it.', 'It is a holiday.', 'The coach is busy on Wednesday.'], answer: 0 },
        { type: 'mcq', id: 't19-r-dl5', part: 3, text: 'Why should Diego bring both types of boots?', options: ['In case it rains, they will train in the sports hall.', 'To lend a pair to a teammate', 'Because the field is muddy', 'The coach did not say.'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Reading — Read an Academic Passage',
      instructions: 'Read the passage and answer questions.',
      passage: `Why do we dream? Despite being one of the most universal human experiences, dreaming remains among the least understood. Everyone dreams, whether or not they remember it, and dreams have fascinated people for thousands of years. Modern science has offered several theories, but no single explanation has won universal agreement—which itself tells us something about how difficult the question is.\n\nOne influential idea comes from the field of neuroscience and is sometimes called the "activation-synthesis" theory. According to this view, during a stage of sleep called REM sleep, the brain becomes highly active, generating bursts of electrical signals. The higher, thinking parts of the brain then try to make sense of this random internal activity by weaving it into a story. On this account, dreams are, in part, the brain's attempt to impose meaning on essentially random signals—which might explain why dreams are often so strange and disjointed.\n\nA very different family of theories emphasizes function—the idea that dreaming does something useful. Some researchers propose that dreams help process emotions, allowing us to work through fears and difficult experiences in a safe, imaginary space. Others suggest that dreaming plays a role in memory, helping the brain sort through and consolidate the day's experiences, strengthening important memories and discarding trivial ones. A related idea is that dreams act as a kind of rehearsal, letting us practice responses to threats or challenges without real-world consequences.\n\nIt is quite possible that more than one of these theories is partly correct, and that dreaming serves several functions at once. What is clear is that sleep and dreaming are far from passive states; the sleeping brain is doing significant work. And the very difficulty of studying dreams—the fact that they are private, fleeting, and hard to recall accurately—reminds us that even the most ordinary parts of human experience can contain deep and unresolved scientific mysteries.`,
      passageTitle: 'Why Do We Dream?',
      questions: [
        { type: 'mcq', id: 't19-r-ap1', part: 4, text: 'What does the passage say about explanations for dreaming?', options: ['Only children dream.', 'One theory has been proven correct.', 'No single explanation has won universal agreement.', 'Scientists agree dreams have no purpose.'], answer: 2 },
        { type: 'mcq', id: 't19-r-ap2', part: 4, text: 'According to the "activation-synthesis" theory, what are dreams?', options: ['Memories replayed exactly', 'A sign of illness', 'Messages from the future', 'The brain\'s attempt to make sense of random internal activity during REM sleep'], answer: 3 },
        { type: 'mcq', id: 't19-r-ap3', part: 4, text: 'What is one "function" theory of dreaming mentioned in the passage?', options: ['Dreams help process emotions in a safe, imaginary space.', 'Dreams have no effect on the brain.', 'Dreams cause memory loss.', 'Dreams predict the weather.'], answer: 0 },
        { type: 'mcq', id: 't19-r-ap4', part: 4, text: 'How might dreaming relate to memory, according to the passage?', options: ['It erases all memories.', 'It helps the brain sort through and consolidate the day\'s experiences.', 'It prevents learning.', 'It has no connection to memory.'], answer: 1 },
        { type: 'mcq', id: 't19-r-ap5', part: 4, text: 'What is the main conclusion of the final paragraph?', options: ['Dreaming is fully understood.', 'Dreams are meaningless.', 'Sleep and dreaming are far from passive; the sleeping brain does significant work, and dreams remain a deep mystery.', 'Only one theory can be true.'], answer: 2 },
        { type: 'multiselect', id: 't19-r-ap6', part: 4, qRange: [6, 6], text: 'Select the TWO statements supported by the passage.', options: [
          { letter: 'A', text: 'The activation-synthesis theory links dreaming to brain activity during REM sleep.' },
          { letter: 'B', text: 'Scientists have fully explained why we dream.' },
          { letter: 'C', text: 'Some theories propose that dreaming serves useful functions such as processing emotions.' },
          { letter: 'D', text: 'Only people who remember their dreams actually dream.' },
        ], selectCount: 2, answers: ['A', 'C'] },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't19-l-cr1', part: 5, audioUrl: '/audio/toefl/set-19/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ['The bread is warm.', 'She left an hour ago.', 'It\'s on the second floor, past the lockers.', 'No, I don\'t like camping.'], answer: 2 },
        { type: 'mcq', id: 't19-l-cr2', part: 5, audioUrl: '/audio/toefl/set-19/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ['Sure, I\'ll help you set up the room.', 'The gate is open.', 'Yes, she is an architect.', 'It is three meters wide.'], answer: 0 },
        { type: 'mcq', id: 't19-l-cr3', part: 5, audioUrl: '/audio/toefl/set-19/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ['The timetable is posted online.', 'The soup is warm.', 'He arrives on Monday.', 'It costs seven dollars.'], answer: 0 },
        { type: 'mcq', id: 't19-l-cr4', part: 5, audioUrl: '/audio/toefl/set-19/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ['No, I have not read it.', 'It is made of plastic.', 'Of course — I\'ll pick you up on the way.', 'The bus was late.'], answer: 2 },
        { type: 'mcq', id: 't19-l-cr5', part: 5, audioUrl: '/audio/toefl/set-19/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ['She teaches biology.', 'It is quite cheap.', 'Yes, I finally learned to swim!', 'The store is far.'], answer: 2 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between two students. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-19/conversation.mp3',
      transcript: `WOMAN: How's your presentation coming along? Isn't it due next week?\n\nMAN: Ugh, don't remind me. I've done all the research, but I'm terrible at speaking in front of people. I get so nervous I forget everything.\n\nWOMAN: I used to be exactly the same. What helped me most was practicing out loud, over and over, until the words felt automatic. Not just reading it in my head — actually saying it, ideally in front of someone.\n\nMAN: That sounds a bit embarrassing.\n\nWOMAN: It is at first! But that's kind of the point — if you can survive practicing in front of a friend, the real audience feels easier. I even recorded myself on my phone once and watched it back. Painful, but I noticed I was speaking way too fast and saying "um" constantly.\n\nMAN: Speaking too fast is definitely my problem. When I'm nervous I just rush to get it over with.\n\nWOMAN: Right. One trick is to plan deliberate pauses — mark on your notes where you'll stop, breathe, and let a point sink in. It feels slow to you but sounds confident to the audience.\n\nMAN: That's really helpful. Would you be willing to watch me run through it once before next week?\n\nWOMAN: Of course. Let's find a free classroom on Thursday. Honestly, one good practice run in front of a real person will do more than a dozen silent read-throughs.`,
      questions: [
        { type: 'mcq', id: 't19-l-cv1', part: 6, text: 'What is the man\'s problem?', options: ['He gets very nervous speaking in front of people.', 'He lost his notes.', 'He missed the deadline.', 'He has not done the research.'], answer: 0 },
        { type: 'mcq', id: 't19-l-cv2', part: 6, text: 'What does the woman say helped her most?', options: ['Reading silently', 'Practicing out loud, ideally in front of someone', 'Avoiding presentations', 'Writing more slides'], answer: 1 },
        { type: 'mcq', id: 't19-l-cv3', part: 6, text: 'What problem did the woman notice when she recorded herself?', options: ['She stood too still.', 'She spoke too quietly.', 'She was speaking too fast and saying "um" constantly.', 'She forgot her name.'], answer: 2 },
        { type: 'mcq', id: 't19-l-cv4', part: 6, text: 'What does the woman offer to do?', options: ['Present it for him', 'Lend him a book', 'Write his presentation', 'Watch him run through it once before next week'], answer: 3 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-19/announcement.mp3',
      transcript: `Good afternoon, everyone. This is an announcement about changes to the campus bus service starting next month. In response to student feedback, we are adding a new route that connects the main campus to the science campus, which many of you have said is difficult to reach.\n\nThe new route, number seven, will run every twenty minutes between eight a.m. and eight p.m. on weekdays. It stops at the main library, the student center, and the science campus entrance. Like all campus buses, it is free for students with a valid ID. In addition, we are extending the evening service on the existing routes until eleven p.m., so those of you studying late will have a way to get home safely. Updated route maps and timetables will be posted at every bus stop and on the transport page of the university website by the end of this week. Thank you for your feedback — it genuinely shapes these decisions.`,
      questions: [
        { type: 'mcq', id: 't19-l-an1', part: 7, text: 'What is the main announcement?', options: ['A new bus route is being added, connecting the main campus to the science campus.', 'Bus fares are increasing.', 'The library is moving.', 'Buses will stop running.'], answer: 0 },
        { type: 'mcq', id: 't19-l-an2', part: 7, text: 'How often will the new route run on weekdays?', options: ['Every hour', 'Every twenty minutes', 'Once a day', 'Every five minutes'], answer: 1 },
        { type: 'mcq', id: 't19-l-an3', part: 7, text: 'What other change is mentioned?', options: ['Maps will no longer be provided.', 'Buses will no longer be free.', 'The evening service on existing routes is extended until 11 p.m.', 'The science campus is closing.'], answer: 2 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-19/academic-talk.mp3',
      transcript: `PROFESSOR: Today I want to explore a question that sits at the crossroads of biology and psychology: why do humans, and many animals, play? Play seems, at first glance, like a waste of time and energy. A young animal running, wrestling, or chasing could instead be resting or searching for food. Play can even be dangerous — a playing animal is distracted and more vulnerable to predators. So from an evolutionary standpoint, if play were truly useless, we'd expect it to have been eliminated. The fact that it's so widespread suggests it must be doing something important.\n\nThe leading explanation is that play is a form of practice. When young animals play-fight, they're rehearsing the movements and skills they'll need as adults — hunting, escaping, competing, or cooperating. A kitten pouncing on a ball of yarn is practicing the same motions it would use to catch prey. In this view, play is a safe way to build physical skills and coordination before the stakes become real.\n\nBut play seems to do more than build physical skills. In social animals, play also appears to teach crucial social lessons. Through play, young animals learn to read each other's signals, to take turns, and to manage conflict. Importantly, they learn the limits — how hard they can bite in a play-fight before a companion gets genuinely upset. Researchers have found that animals which are deprived of play often grow into adults that struggle socially, overreacting to normal interactions.\n\nAnd here's a point I find especially interesting: play may also foster flexibility and creativity. By trying out unusual actions and combinations in a low-stakes setting, a playful animal — or child — may develop the ability to improvise and solve novel problems. So while play looks frivolous, it may be one of nature's most sophisticated methods of learning. The next time you see children or animals at play, remember: they are almost certainly doing serious developmental work, disguised as fun.`,
      questions: [
        { type: 'mcq', id: 't19-l-at1', part: 8, text: 'Why does play present a puzzle from an evolutionary standpoint?', options: ['It always leads to injury.', 'It cannot be observed.', 'It is only found in humans.', 'It seems to waste time and energy and can even be dangerous, yet it is widespread.'], answer: 3 },
        { type: 'mcq', id: 't19-l-at2', part: 8, text: 'What is the leading explanation for play?', options: ['It is a form of practice for skills animals will need as adults.', 'It replaces eating.', 'It is a sign of illness.', 'It is completely useless.'], answer: 0 },
        { type: 'mcq', id: 't19-l-at3', part: 8, text: 'According to the professor, what social lessons does play teach?', options: ['How to find food', 'How to read signals, take turns, manage conflict, and learn limits', 'How to sleep', 'How to migrate'], answer: 1 },
        { type: 'mcq', id: 't19-l-at4', part: 8, text: 'What happens to animals deprived of play, according to research?', options: ['They play more as adults.', 'They become stronger.', 'They often struggle socially as adults, overreacting to normal interactions.', 'They live longer.'], answer: 2 },
        { type: 'mcq', id: 't19-l-at5', part: 8, text: 'What further benefit of play does the professor find especially interesting?', options: ['It reduces intelligence.', 'It has no additional benefits.', 'It makes animals sleepier.', 'It may foster flexibility and creativity, helping solve novel problems.'], answer: 3 },
      ],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Build a Sentence',
      instructions: 'Put the words in the correct order to make a grammatical sentence.',
      questions: [
        { type: 'sentencebuild', id: 't19-w-bs1', part: 9, tiles: ['We', 'are', 'meeting', 'our friends', 'tonight'], answer: ['We', 'are', 'meeting', 'our friends', 'tonight'] },
        { type: 'sentencebuild', id: 't19-w-bs2', part: 9, tiles: ['the report', 'you', 'print', 'Could', 'for me'], answer: ['Could', 'you', 'print', 'the report', 'for me'] },
        { type: 'sentencebuild', id: 't19-w-bs3', part: 9, tiles: ['built', 'The house', 'they', 'is', 'very modern'], answer: ['The house', 'they', 'built', 'is', 'very modern'] },
        { type: 'sentencebuild', id: 't19-w-bs4', part: 9, tiles: ['arrive,', 'we', 'As soon as', 'we\'ll', 'let you know'], answer: ['As soon as', 'we', 'arrive,', 'we\'ll', 'let you know'] },
        { type: 'sentencebuild', id: 't19-w-bs5', part: 9, tiles: ['is', 'This route', 'the other one', 'than', 'shorter'], answer: ['This route', 'is', 'shorter', 'than', 'the other one'] },
        { type: 'sentencebuild', id: 't19-w-bs6', part: 9, tiles: ['the exam,', 'Having', 'they', 'celebrated', 'passed'], answer: ['Having', 'passed', 'the exam,', 'they', 'celebrated'] },
      ],
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't19-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You signed up for a weekend cooking class, but you have realized you are allergic to nuts. You want to check whether the recipes will contain nuts and ask what options you have.\n\nWrite an email to the cooking-class organizer.`,
          text: 'In your email: explain your situation, ask your questions clearly, and keep a polite tone. Write as much as you can in complete sentences.',
          minWords: 0, timeLimitSeconds: 420, minimumWordsPolicy: 'none-published', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't19-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on communication. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Novak: Some people believe that learning a second language should be required for all university students, while others think it should be optional. What is your view, and why?\n\nStudent (Yuki): I think it should be required. Knowing another language broadens your thinking, improves job prospects, and helps you understand other cultures. For example, learning Spanish completely changed how I understood a documentary about Latin America that I had watched years earlier in translation.\n\nStudent (Sam): I disagree. Students already have heavy workloads, and not everyone needs a second language for their career. It should be a personal choice. For example, a friend studying computer science barely has time for his major classes, let alone an additional language requirement.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100, timeLimitSeconds: 600, minimumWordsPolicy: 'recommended-100', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't19-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-19/repeat-1.mp3', targetSentence: 'The bakery smells wonderful.' },
        { type: 'repeat', id: 't19-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-19/repeat-2.mp3', targetSentence: 'He packed his bag and left for the airport.' },
        { type: 'repeat', id: 't19-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-19/repeat-3.mp3', targetSentence: 'The teacher praised the students for their hard work.' },
        { type: 'repeat', id: 't19-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-19/repeat-4.mp3', targetSentence: 'The study showed that people who walk daily tend to sleep better at night.' },
        { type: 'repeat', id: 't19-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-19/repeat-5.mp3', targetSentence: 'After the committee had reviewed all the applications, it invited ten candidates to attend an interview.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't19-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: To begin, describe a place in nature that you enjoy. Where is it, and what do you like about it?' },
        { type: 'speak', id: 't19-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to do one task at a time, while others like to do several things at once. Which are you, and why? Give reasons and an example.' },
        { type: 'speak', id: 't19-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your city can spend money on either building a new bicycle path or widening the roads for cars. Which would you recommend, and why? Explain how it would benefit residents.' },
        { type: 'speak', id: 't19-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how might people\'s homes change over the next twenty years? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
