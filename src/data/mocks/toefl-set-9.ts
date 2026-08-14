import type { MockExam } from './types';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Audios bajo /audio/toefl/set-9/ — pendientes (ver checklist de medios).

const mock: MockExam = {
  id: 'set-9',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 9 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Reading — Complete the Words',
      instructions: 'Complete each word so the text makes sense. Some letters are given.',
      questions: [
        {
          type: 'wordcomplete', id: 't9-r-cw1', part: 1, qRange: [1, 6],
          instructions: 'A student is writing to a professor about a deadline.',
          template: `Dear Professor Diaz,\n\nI am writing to ask for a short {{1}} on the essay due Friday. I have been {{2}} this week and was unable to visit the library to find {{3}}. I have already written a first {{4}}, but I would like more time to {{5}} it properly. Would it be possible to submit on Monday {{6}}?\n\nThank you for your understanding,\nHana`,
          blanks: [
            { num: 1, prefix: 'ext', answer: 'extension' },
            { num: 2, prefix: 'i', answer: 'ill' },
            { num: 3, prefix: 'sou', answer: 'sources' },
            { num: 4, prefix: 'dr', answer: 'draft' },
            { num: 5, prefix: 'rev', answer: 'revise' },
            { num: 6, prefix: 'ins', answer: 'instead' },
          ],
        },
        {
          type: 'wordcomplete', id: 't9-r-cw2', part: 1, qRange: [7, 12],
          instructions: 'The following is from an article about the human heart.',
          template: `The heart is a {{1}} about the size of a fist that pumps blood around the body. It beats around one hundred thousand times a {{2}}, sending oxygen and nutrients to every {{3}}. To keep the heart {{4}}, doctors recommend regular exercise and a balanced {{5}}. Smoking and too much stress can {{6}} the risk of heart disease.`,
          blanks: [
            { num: 1, prefix: 'mus', answer: 'muscle' },
            { num: 2, prefix: 'd', answer: 'day' },
            { num: 3, prefix: 'ce', answer: 'cell' },
            { num: 4, prefix: 'hea', answer: 'healthy' },
            { num: 5, prefix: 'di', answer: 'diet' },
            { num: 6, prefix: 'inc', answer: 'increase' },
          ],
        },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Museum sign)',
      instructions: 'Read the sign and answer the questions.',
      passage: `CITY ART MUSEUM — VISITOR INFORMATION\n\nOpening hours: Tuesday–Sunday, 10:00 a.m. – 6:00 p.m. Closed Mondays.\n\n• Admission is free for children under 12 and for all visitors on the first Sunday of each month.\n• Photography without flash is permitted, except in the special exhibition on the second floor.\n• Large bags must be left in the cloakroom near the entrance.\n• Guided tours in English begin at 11:00 a.m. and 2:00 p.m. daily; no booking is needed.`,
      passageTitle: 'Museum sign',
      questions: [
        { type: 'mcq', id: 't9-r-dl1', part: 2, text: 'When is the museum closed?', options: ['Mondays', 'The first Sunday of each month', 'Weekends', 'Sundays'], answer: 0 },
        { type: 'mcq', id: 't9-r-dl2', part: 2, text: 'Where is photography NOT allowed?', options: ['Anywhere in the museum', 'In the special exhibition on the second floor', 'Near the entrance', 'In the cloakroom'], answer: 1 },
        { type: 'mcq', id: 't9-r-dl3', part: 2, text: 'What does the sign say about guided tours?', options: ['They are only on weekends.', 'They must be booked in advance.', 'They begin at 11:00 a.m. and 2:00 p.m. and need no booking.', 'They cost extra.'], answer: 2 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Reminder email)',
      instructions: 'Read the email and answer the questions.',
      passage: `From: Student Health Center\nTo: Marco Ruiz\nSubject: Appointment reminder\n\nDear Marco,\n\nThis is a reminder of your appointment with Dr. Lee on Wednesday, October 8, at 2:30 p.m. Please arrive ten minutes early to complete a short form.\n\nIf you need to cancel or reschedule, please let us know at least 24 hours in advance so we can offer the slot to another student. Late cancellations may result in a small fee. Remember to bring your student ID and a list of any medications you are currently taking.\n\nBest regards,\nStudent Health Center`,
      passageTitle: 'Reminder email',
      questions: [
        { type: 'mcq', id: 't9-r-dl4', part: 3, text: 'Why should Marco arrive ten minutes early?', options: ['To meet another doctor', 'To take a test', 'To pay a fee', 'To complete a short form'], answer: 3 },
        { type: 'mcq', id: 't9-r-dl5', part: 3, text: 'What may happen if Marco cancels late?', options: ['He may have to pay a small fee.', 'He cannot make future appointments.', 'Nothing happens.', 'His appointment is moved automatically.'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Reading — Read an Academic Passage',
      instructions: 'Read the passage and answer questions.',
      passage: `The printing press, developed by Johannes Gutenberg in the mid-fifteenth century, is often described as one of the most important inventions in human history. But to understand why, we must look beyond the machine itself to the transformation it unleashed. Before Gutenberg, books in Europe were copied by hand, usually by monks, a process so slow and costly that a single book could take months to produce and cost as much as a small house. As a result, books were rare, and literacy was largely confined to the clergy and the wealthy.\n\nGutenberg's key innovation was movable type: individual metal letters that could be arranged to form a page, used to print hundreds of copies, and then rearranged for the next page. Combined with an oil-based ink and a press adapted from those used to make wine, this system made it possible to produce books quickly and in large numbers. The cost of a book fell dramatically.\n\nThe consequences rippled far beyond publishing. As books became affordable, literacy spread. Ideas that once circulated slowly among a small elite could now reach thousands of readers within months. This had profound political and religious effects: the Protestant Reformation, for instance, spread with unprecedented speed because reformers could print and distribute pamphlets faster than authorities could suppress them.\n\nThe press also transformed the nature of knowledge itself. When every copy of a book was made by hand, errors crept in with each copying, and no two copies were quite alike. Printing produced identical copies, allowing scholars in different cities to refer to exactly the same text, page by page. This standardization laid the groundwork for the scientific revolution, in which the precise sharing and checking of results became essential. In this sense, Gutenberg did not merely make books cheaper—he changed how humanity accumulates and verifies knowledge.`,
      passageTitle: 'The Printing Press',
      questions: [
        { type: 'mcq', id: 't9-r-ap1', part: 4, text: 'According to paragraph 1, why were books rare before Gutenberg?', options: ['People were not interested in reading.', 'They were copied by hand, making them slow and costly to produce.', 'Paper had not yet been invented.', 'Most people could not afford paper.'], answer: 1 },
        { type: 'mcq', id: 't9-r-ap2', part: 4, text: 'What was Gutenberg\'s key innovation?', options: ['A new alphabet', 'A new kind of paper', 'Movable metal type that could be rearranged', 'A faster way to copy books by hand'], answer: 2 },
        { type: 'mcq', id: 't9-r-ap3', part: 4, text: 'According to paragraph 3, how did the printing press affect the Protestant Reformation?', options: ['It had no effect on religion.', 'It was banned by reformers.', 'It slowed the spread of reform ideas.', 'It allowed reformers to print and distribute pamphlets faster than authorities could suppress them.'], answer: 3 },
        { type: 'mcq', id: 't9-r-ap4', part: 4, text: 'How did printing change the nature of knowledge, according to paragraph 4?', options: ['It produced identical copies, allowing scholars to refer to exactly the same text.', 'It made books more expensive.', 'It reduced the number of readers.', 'It introduced more errors into texts.'], answer: 0 },
        { type: 'mcq', id: 't9-r-ap5', part: 4, text: 'What does the author mean in the final sentence?', options: ['Gutenberg only made books cheaper.', 'Gutenberg changed how humanity accumulates and verifies knowledge.', 'Gutenberg invented science.', 'Gutenberg discouraged reading.'], answer: 1 },
        { type: 'multiselect', id: 't9-r-ap6', part: 4, qRange: [6, 6], text: 'Select the TWO statements supported by the passage.', options: [
          { letter: 'A', text: 'Before printing, books were copied by hand and were very expensive.' },
          { letter: 'B', text: 'Printing made every copy slightly different.' },
          { letter: 'C', text: 'The printing press helped standardize texts, supporting the scientific revolution.' },
          { letter: 'D', text: 'Literacy declined after the invention of the printing press.' },
        ], selectCount: 2, answers: ['A', 'C'] },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't9-l-cr1', part: 5, audioUrl: '/audio/toefl/set-9/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ['She left yesterday.', 'It\'s the blue building on the corner.', 'No, I don\'t play chess.', 'The soup is cold.'], answer: 1 },
        { type: 'mcq', id: 't9-l-cr2', part: 5, audioUrl: '/audio/toefl/set-9/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ['The door is locked.', 'Yes, she is a teacher.', 'It is ten meters tall.', 'I\'d love to, but I have a class then.'], answer: 3 },
        { type: 'mcq', id: 't9-l-cr3', part: 5, audioUrl: '/audio/toefl/set-9/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ['The cake tastes sweet.', 'He arrives on Tuesday.', 'It costs five dollars.', 'You can borrow mine if you like.'], answer: 3 },
        { type: 'mcq', id: 't9-l-cr4', part: 5, audioUrl: '/audio/toefl/set-9/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ['It is made of metal.', 'Sure, let\'s meet at the café at three.', 'The train was crowded.', 'No, I have not read it.'], answer: 1 },
        { type: 'mcq', id: 't9-l-cr5', part: 5, audioUrl: '/audio/toefl/set-9/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ['It is far from here.', 'Yes, everything went smoothly, thanks.', 'The store opens at nine.', 'She studies law.'], answer: 1 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between two students. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-9/conversation.mp3',
      transcript: `MAN: Have you started thinking about where you'll live next year? The housing application is due soon.\n\nWOMAN: I have, actually. I'm torn between staying in the dorms and renting an apartment with friends off campus.\n\nMAN: What's making it hard to decide?\n\nWOMAN: Well, the dorms are convenient — I can walk to class in five minutes, meals are included, and I don't have to worry about bills. But they're kind of expensive, and honestly, they can be noisy when I'm trying to study.\n\nMAN: And the apartment?\n\nWOMAN: An apartment would be cheaper if I split it three ways, and it'd be quieter. But it's a twenty-minute bus ride from campus, and we'd have to cook for ourselves and deal with electricity and internet bills. Plus, if a roommate moves out, I'm stuck covering more of the rent.\n\nMAN: That's a real risk. Have you talked to the friends you'd live with?\n\nWOMAN: Not seriously yet. I think that's my next step — I need to know they're actually committed before I sign anything. A cheaper apartment isn't worth it if it falls apart halfway through the year.\n\nMAN: Smart. I'd definitely nail that down first.`,
      questions: [
        { type: 'mcq', id: 't9-l-cv1', part: 6, text: 'What decision is the woman trying to make?', options: ['Whether to change her major', 'Which city to study in', 'Which classes to take', 'Whether to stay in the dorms or rent an apartment'], answer: 3 },
        { type: 'mcq', id: 't9-l-cv2', part: 6, text: 'What advantage of the dorms does the woman mention?', options: ['They are convenient — close to class with meals included.', 'They are always quiet.', 'They have no rules.', 'They are very cheap.'], answer: 0 },
        { type: 'mcq', id: 't9-l-cv3', part: 6, text: 'What risk does the woman mention about the apartment?', options: ['It is too close to campus.', 'If a roommate moves out, she would have to cover more of the rent.', 'It does not have internet.', 'It is more expensive than the dorms.'], answer: 1 },
        { type: 'mcq', id: 't9-l-cv4', part: 6, text: 'What does the woman say is her next step?', options: ['Asking her parents for money', 'Signing the lease immediately', 'Making sure her friends are truly committed before signing anything', 'Applying for the dorms'], answer: 2 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-9/announcement.mp3',
      transcript: `Attention, please. This is an announcement for everyone attending today's career workshop. Because of a much larger turnout than expected, we are moving the workshop from Room 210 to the main auditorium on the ground floor. The larger space will let everyone have a seat and see the presentation clearly.\n\nThe start time remains the same — two p.m. — but please make your way to the auditorium now, as we'd like to begin promptly. Representatives from twelve companies are here today, and after the presentation there will be time to speak with them individually at tables set up along the back wall. If you brought copies of your résumé, have them ready. Thank you for your flexibility, and enjoy the workshop.`,
      questions: [
        { type: 'mcq', id: 't9-l-an1', part: 7, text: 'Why is the workshop being moved?', options: ['The presenter changed.', 'The start time changed.', 'The original room is being cleaned.', 'More people came than expected.'], answer: 3 },
        { type: 'mcq', id: 't9-l-an2', part: 7, text: 'Where is the workshop being moved to?', options: ['The main auditorium on the ground floor', 'The library', 'A different building', 'Room 210'], answer: 0 },
        { type: 'mcq', id: 't9-l-an3', part: 7, text: 'What can attendees do after the presentation?', options: ['Take a written test', 'Speak with company representatives at tables along the back wall', 'Watch a film', 'Leave immediately'], answer: 1 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-9/academic-talk.mp3',
      transcript: `PROFESSOR: Today let's talk about something you use every day without thinking about it: sleep. Specifically, I want to focus on why sleep seems to be so important for memory. For a long time, sleep was seen as basically downtime — the brain switching off. We now know that's completely wrong. During sleep, the brain is doing some of its most important work.\n\nResearchers have found that sleep plays a crucial role in a process called memory consolidation. During the day, you take in an enormous amount of information, and it's stored temporarily in a region of the brain called the hippocampus. Think of the hippocampus as a kind of inbox — fast to write to, but limited in space. During deep sleep, the brain appears to transfer important memories from this temporary store into the neocortex, where they can be stored more permanently. In effect, sleep is when the day's experiences get filed away for long-term keeping.\n\nThere's striking experimental support for this. In one type of study, participants learn a task — say, a sequence of finger movements or a list of word pairs — and are then tested either after a night of sleep or after an equal period of being awake during the day. Consistently, the groups that slept perform better. It's not just that they're more rested; the sleeping brain has actively strengthened the memory.\n\nDreaming may play a role too, particularly during a stage called REM sleep. Some researchers think the brain replays and reorganizes experiences during REM, which may help with learning and even with creative problem-solving. That's why the advice to "sleep on it" before making a decision has some real science behind it. The practical takeaway is simple but often ignored: pulling an all-nighter before an exam is one of the worst things you can do, because you're sacrificing the very process that would cement what you studied.`,
      questions: [
        { type: 'mcq', id: 't9-l-at1', part: 8, text: 'What misconception about sleep does the professor correct?', options: ['That people need eight hours of sleep', 'That sleep is only for children', 'That sleep is just downtime when the brain switches off', 'That dreams are meaningless'], answer: 2 },
        { type: 'mcq', id: 't9-l-at2', part: 8, text: 'What is the role of the hippocampus, according to the professor?', options: ['It controls dreaming.', 'It produces sleep hormones.', 'It permanently stores all memories.', 'It acts as a temporary store, like an inbox, with limited space.'], answer: 3 },
        { type: 'mcq', id: 't9-l-at3', part: 8, text: 'What happens to important memories during deep sleep?', options: ['They are transferred from the hippocampus to the neocortex for more permanent storage.', 'They are replaced with new information.', 'They stay in the hippocampus forever.', 'They are erased.'], answer: 0 },
        { type: 'mcq', id: 't9-l-at4', part: 8, text: 'What do the sleep-versus-wake studies consistently show?', options: ['The groups that stayed awake performed better.', 'The groups that slept performed better on the learned task.', 'There was no difference between the groups.', 'Sleep made people forget the task.'], answer: 1 },
        { type: 'mcq', id: 't9-l-at5', part: 8, text: 'What practical advice does the professor give?', options: ['Dreaming should be avoided.', 'Study only at night.', 'Avoid pulling an all-nighter before an exam, because it sacrifices memory consolidation.', 'Never take naps.'], answer: 2 },
      ],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Build a Sentence',
      instructions: 'Put the words in the correct order to make a grammatical sentence.',
      questions: [
        { type: 'sentencebuild', id: 't9-w-bs1', part: 9, tiles: ['She', 'teaches', 'mathematics', 'at', 'a local school'], answer: ['She', 'teaches', 'mathematics', 'at', 'a local school'] },
        { type: 'sentencebuild', id: 't9-w-bs2', part: 9, tiles: ['the report', 'have', 'ready', 'by Monday', 'Please'], answer: ['Please', 'have', 'the report', 'ready', 'by Monday'] },
        { type: 'sentencebuild', id: 't9-w-bs3', part: 9, tiles: ['I', 'recommended', 'the film', 'that', 'enjoyed', 'you'], answer: ['I', 'enjoyed', 'the film', 'that', 'you', 'recommended'] },
        { type: 'sentencebuild', id: 't9-w-bs4', part: 9, tiles: ['finish', 'we', 'Once', 'lunch,', 'we can', 'leave'], answer: ['Once', 'we', 'finish', 'lunch,', 'we can', 'leave'] },
        { type: 'sentencebuild', id: 't9-w-bs5', part: 9, tiles: ['was', 'The test', 'I', 'than', 'expected', 'easier'], answer: ['The test', 'was', 'easier', 'than', 'I', 'expected'] },
        { type: 'sentencebuild', id: 't9-w-bs6', part: 9, tiles: ['the news,', 'Hearing', 'immediately', 'she', 'her family', 'called'], answer: ['Hearing', 'the news,', 'she', 'immediately', 'called', 'her family'] },
      ],
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't9-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You recently attended an online course, but you were charged twice for the same registration. You want to explain the mistake and ask for a refund of the extra payment.\n\nWrite an email to the course's billing department.`,
          text: 'In your email: explain the problem, make your request clearly, and use a polite tone. Write as much as you can in complete sentences.',
          minWords: 0, timeLimitSeconds: 420, minimumWordsPolicy: 'none-published', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't9-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on the environment. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Adeyemi: Some people believe individuals should focus on changing their own habits to protect the environment, while others believe only governments and large companies can make a real difference. Where should the main responsibility lie? Why?\n\nStudent (Ravi): I think individuals matter most. If everyone reduces waste and saves energy, the combined effect is enormous. For example, when my community organized a plastic-free week, the amount of waste collected dropped noticeably compared to a normal week.\n\nStudent (Chloe): I disagree. Individual actions are small compared to industrial pollution. Only government regulation of big companies can create real change. For example, a single large factory can produce more pollution in a day than thousands of households do in a year.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100, timeLimitSeconds: 600, minimumWordsPolicy: 'recommended-100', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't9-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-9/repeat-1.mp3', targetSentence: 'The library is on the left.' },
        { type: 'repeat', id: 't9-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-9/repeat-2.mp3', targetSentence: 'They planted a garden behind the house.' },
        { type: 'repeat', id: 't9-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-9/repeat-3.mp3', targetSentence: 'The report was finished a day before the deadline.' },
        { type: 'repeat', id: 't9-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-9/repeat-4.mp3', targetSentence: 'The manager explained that the new policy would take effect next month.' },
        { type: 'repeat', id: 't9-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-9/repeat-5.mp3', targetSentence: 'After the researchers had analyzed the data, they published their conclusions in a leading journal.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't9-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: Let\'s begin. Describe a book, film, or song that has stayed with you. What is it, and why did it affect you?' },
        { type: 'speak', id: 't9-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to travel to new places, while others prefer to return to familiar ones. Which do you prefer, and why? Give reasons and an example.' },
        { type: 'speak', id: 't9-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your city can spend its budget on either improving public parks or building a new community center. Which would you recommend, and why? Explain how it would benefit residents.' },
        { type: 'speak', id: 't9-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how might communication between people change over the next twenty years? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
