import type { MockExam } from './types';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Audios bajo /audio/toefl/set-12/ — pendientes (ver checklist de medios).

const mock: MockExam = {
  id: 'set-12',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 12 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Reading — Complete the Words',
      instructions: 'Complete each word so the text makes sense. Some letters are given.',
      questions: [
        {
          type: 'wordcomplete', id: 't12-r-cw1', part: 1, qRange: [1, 6],
          instructions: 'A student is writing a thank-you message.',
          template: `Dear Aunt Rosa,\n\nThank you so much for the {{1}} you sent for my birthday. It was so {{2}} of you to remember. I have already used the money to buy a new {{3}} for my studies. I am doing well at university, though the courses keep me very {{4}}. I hope to {{5}} you during the summer holidays. Please give my {{6}} to Uncle Pedro.\n\nWith love,\nCarla`,
          blanks: [
            { num: 1, prefix: 'g', answer: 'gift' },
            { num: 2, prefix: 'ki', answer: 'kind' },
            { num: 3, prefix: 'lap', answer: 'laptop' },
            { num: 4, prefix: 'bu', answer: 'busy' },
            { num: 5, prefix: 'vi', answer: 'visit' },
            { num: 6, prefix: 'reg', answer: 'regards' },
          ],
        },
        {
          type: 'wordcomplete', id: 't12-r-cw2', part: 1, qRange: [7, 12],
          instructions: 'The following is from an article about the Moon.',
          template: `The Moon is the Earth's only natural {{1}}. It has no atmosphere and no liquid water on its {{2}}, which is covered in craters formed by ancient {{3}}. The Moon's gravity is much weaker than the Earth's, which is why astronauts can {{4}} so high. The pull of the Moon's gravity also causes the ocean {{5}} on Earth. Scientists believe the Moon {{6}} billions of years ago when a huge object struck the young Earth.`,
          blanks: [
            { num: 1, prefix: 'sat', answer: 'satellite' },
            { num: 2, prefix: 'sur', answer: 'surface' },
            { num: 3, prefix: 'imp', answer: 'impacts' },
            { num: 4, prefix: 'ju', answer: 'jump' },
            { num: 5, prefix: 'ti', answer: 'tides' },
            { num: 6, prefix: 'for', answer: 'formed' },
          ],
        },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Park sign)',
      instructions: 'Read the sign and answer the questions.',
      passage: `RIVERSIDE PARK — RULES FOR VISITORS\n\n• Open daily from 6:00 a.m. until sunset.\n• Dogs are welcome but must be kept on a lead in the children's play area and near the pond.\n• Cycling is allowed only on marked paths, not on the grass.\n• Barbecues are permitted in the designated picnic zone; open fires elsewhere are strictly prohibited.\n• Please take your litter home or use the bins provided. Help us keep the park clean and safe for everyone.`,
      passageTitle: 'Park sign',
      questions: [
        { type: 'mcq', id: 't12-r-dl1', part: 2, text: 'When does the park close?', options: ['At sunset', 'At midnight', 'It never closes.', 'At 6:00 a.m.'], answer: 0 },
        { type: 'mcq', id: 't12-r-dl2', part: 2, text: 'Where must dogs be kept on a lead?', options: ['Everywhere in the park', 'In the children\'s play area and near the pond', 'Only on the marked paths', 'Nowhere; dogs are not allowed'], answer: 1 },
        { type: 'mcq', id: 't12-r-dl3', part: 2, text: 'What does the sign say about barbecues?', options: ['They are allowed after sunset.', 'They are banned everywhere.', 'They are permitted only in the designated picnic zone.', 'They are allowed anywhere on the grass.'], answer: 2 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Group message)',
      instructions: 'Read the messages and answer the questions.',
      passage: `TARIQ: Reminder — our group presentation is on Thursday. Are we all ready?\n\nMAYA: I've finished the slides. I'll share them tonight so everyone can review.\n\nTARIQ: Great. Who's presenting which part?\n\nMAYA: I'll do the introduction, you take the main findings, and Sofia can do the conclusion. Sofia, does that work?\n\nSOFIA: Works for me. Should we practise together beforehand?\n\nTARIQ: Definitely. Let's meet Wednesday at 4 in the study room to run through it once.`,
      passageTitle: 'Group message',
      questions: [
        { type: 'mcq', id: 't12-r-dl4', part: 3, text: 'What part will Tariq present?', options: ['The conclusion', 'The slides', 'The introduction', 'The main findings'], answer: 3 },
        { type: 'mcq', id: 't12-r-dl5', part: 3, text: 'What do they plan to do on Wednesday?', options: ['Meet at 4 in the study room to practise', 'Give the presentation', 'Choose a new topic', 'Finish the slides'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Reading — Read an Academic Passage',
      instructions: 'Read the passage and answer questions.',
      passage: `The Great Barrier Reef, stretching more than 2,300 kilometers along the northeast coast of Australia, is the largest living structure on Earth—so large it can be seen from space. Yet it is built by animals barely a few millimeters across: coral polyps. Understanding how such a colossal structure arises from such tiny builders reveals a great deal about how complex natural systems can emerge from simple, repeated actions.\n\nEach coral polyp secretes a hard skeleton of calcium carbonate. When a polyp dies, its skeleton remains, and new polyps grow on top. Over thousands of years, generation upon generation of these skeletons accumulate into the massive reef structures we see today. In this way, the reef is less a single organism than a vast city, continuously built up by countless small inhabitants, most of whom are long dead.\n\nThe reef is far more than rock, however. It is one of the most biologically diverse ecosystems on the planet, home to thousands of species of fish, mollusks, and other marine life. This diversity is not accidental. The complex, three-dimensional structure of the reef creates an enormous variety of habitats—crevices, overhangs, and channels—each suited to different organisms. Ecologists describe corals as "ecosystem engineers" because, by building physical structure, they create the conditions that allow many other species to thrive.\n\nBut this achievement is fragile. Because reef-building corals depend on the delicate partnership with their algae, they are highly sensitive to changes in water temperature and chemistry. In recent decades, rising sea temperatures have caused repeated mass bleaching events, and ocean acidification threatens the corals' ability to build their skeletons. The paradox is striking: a structure that took millions of years and countless generations to build could be severely damaged within a human lifetime. Protecting it, scientists argue, requires addressing the global causes of ocean warming, not just local threats.`,
      passageTitle: 'The Great Barrier Reef',
      questions: [
        { type: 'mcq', id: 't12-r-ap1', part: 4, text: 'What point does the author emphasize in paragraph 1?', options: ['The reef is entirely made of rock.', 'A colossal structure is built by tiny animals through simple, repeated actions.', 'The reef is smaller than it appears.', 'The reef is a single large organism.'], answer: 1 },
        { type: 'mcq', id: 't12-r-ap2', part: 4, text: 'According to paragraph 2, how does the reef grow over time?', options: ['Fish build the structure.', 'A single polyp grows larger and larger.', 'New polyps grow on top of the skeletons left by dead ones, accumulating over thousands of years.', 'Rocks are washed in by the tide.'], answer: 2 },
        { type: 'mcq', id: 't12-r-ap3', part: 4, text: 'Why are corals called "ecosystem engineers"?', options: ['They control the temperature of the water.', 'They eat other species.', 'They design machines.', 'By building physical structure, they create habitats that allow many other species to thrive.'], answer: 3 },
        { type: 'mcq', id: 't12-r-ap4', part: 4, text: 'Why is the reef described as fragile in paragraph 4?', options: ['Reef-building corals are highly sensitive to changes in water temperature and chemistry.', 'It is too far from land.', 'Too many tourists visit it.', 'It is made of soft material.'], answer: 0 },
        { type: 'mcq', id: 't12-r-ap5', part: 4, text: 'What is the "striking paradox" the author describes?', options: ['The reef is both alive and dead.', 'A structure that took millions of years to build could be severely damaged within a human lifetime.', 'The reef is visible from space but hard to find.', 'Corals are animals but look like plants.'], answer: 1 },
        { type: 'multiselect', id: 't12-r-ap6', part: 4, qRange: [6, 6], text: 'Select the TWO statements supported by the passage.', options: [
          { letter: 'A', text: 'The reef\'s three-dimensional structure creates many different habitats.' },
          { letter: 'B', text: 'The Great Barrier Reef is a single large organism.' },
          { letter: 'C', text: 'Protecting the reef requires addressing the global causes of ocean warming.' },
          { letter: 'D', text: 'Corals are unaffected by changes in water temperature.' },
        ], selectCount: 2, answers: ['A', 'C'] },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't12-l-cr1', part: 5, audioUrl: '/audio/toefl/set-12/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ['She left at noon.', 'It\'s down the corridor, second door on the right.', 'No, I don\'t like running.', 'The milk is fresh.'], answer: 1 },
        { type: 'mcq', id: 't12-l-cr2', part: 5, audioUrl: '/audio/toefl/set-12/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ['The door is open.', 'Yes, he is a lawyer.', 'It is four meters long.', 'Sure, I can drive you to the station.'], answer: 3 },
        { type: 'mcq', id: 't12-l-cr3', part: 5, audioUrl: '/audio/toefl/set-12/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ['The coffee is hot.', 'He arrives on Friday.', 'It costs six dollars.', 'You can sign up at the front desk.'], answer: 3 },
        { type: 'mcq', id: 't12-l-cr4', part: 5, audioUrl: '/audio/toefl/set-12/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ['It is made of paper.', 'No worries — I\'ll cover your shift.', 'The film was boring.', 'No, I have not met her.'], answer: 1 },
        { type: 'mcq', id: 't12-l-cr5', part: 5, audioUrl: '/audio/toefl/set-12/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ['It is quite cheap.', 'Yes, I finally fixed the bug in my code!', 'The library is far.', 'She teaches music.'], answer: 1 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between a student and a professor. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-12/conversation.mp3',
      transcript: `STUDENT: Professor Kim, do you have a moment? I wanted to talk about my grade on the last lab report.\n\nPROFESSOR: Of course. What's your concern?\n\nSTUDENT: Well, I put a lot of work into it, but I got a lower grade than I expected, and I'm not sure what went wrong.\n\nPROFESSOR: Let me pull it up. Ah, yes. Your data collection and analysis were actually excellent — that part was among the best in the class.\n\nSTUDENT: Oh, thank you. So where did I lose points?\n\nPROFESSOR: Mainly in the discussion section. You reported your results clearly, but you didn't interpret them. A good discussion explains what the results mean, why they might have turned out that way, and how they connect to the theory we covered. You essentially repeated your numbers instead of explaining them.\n\nSTUDENT: I see. I think I ran out of time and rushed that part.\n\nPROFESSOR: That's a common mistake. My advice for next time: budget at least as much time for interpreting your results as you spend collecting them. The interpretation is where you show your understanding.\n\nSTUDENT: That's really helpful. Would it be possible to revise it for partial credit?\n\nPROFESSOR: I don't offer revisions for credit, but I'm happy to look over a rewritten discussion section and give you feedback, so you're stronger on the next report.`,
      questions: [
        { type: 'mcq', id: 't12-l-cv1', part: 6, text: 'Why does the student come to see the professor?', options: ['To change lab partners', 'To drop the course', 'To ask for an extension', 'To discuss a lower-than-expected grade on a lab report'], answer: 3 },
        { type: 'mcq', id: 't12-l-cv2', part: 6, text: 'What did the professor praise about the report?', options: ['The data collection and analysis', 'The length', 'The formatting', 'The discussion section'], answer: 0 },
        { type: 'mcq', id: 't12-l-cv3', part: 6, text: 'Where did the student lose most points?', options: ['In the data section', 'In the discussion section, where he repeated numbers instead of interpreting them', 'In the introduction', 'In the references'], answer: 1 },
        { type: 'mcq', id: 't12-l-cv4', part: 6, text: 'What does the professor offer to do?', options: ['Excuse the student from the next report', 'Change the grade', 'Look over a rewritten discussion section and give feedback', 'Give the student a new topic'], answer: 2 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-12/announcement.mp3',
      transcript: `Good morning, and welcome to the campus recreation center. This is a brief announcement about our new membership system, which takes effect on the first of next month. Instead of paper membership cards, all students will now check in using the mobile app or their student ID card at the electronic scanners by the entrance.\n\nTo use the app, download it from the recreation center's website and log in with your student account. Your membership is included in your student fees, so there is no additional charge. Please note that the old paper cards will no longer be accepted after the end of this month. If you have any trouble setting up the app, staff at the front desk will be glad to help you during opening hours. We hope the new system makes checking in faster and more convenient for everyone. Thank you, and enjoy your workout.`,
      questions: [
        { type: 'mcq', id: 't12-l-an1', part: 7, text: 'What is the announcement mainly about?', options: ['A change in opening hours', 'A membership fee increase', 'A new gym opening', 'A new membership check-in system'], answer: 3 },
        { type: 'mcq', id: 't12-l-an2', part: 7, text: 'How will students check in under the new system?', options: ['Using the mobile app or their student ID card at electronic scanners', 'By signing a paper list', 'By showing a receipt', 'With a paper card'], answer: 0 },
        { type: 'mcq', id: 't12-l-an3', part: 7, text: 'What does the speaker say about the cost?', options: ['There is a new monthly fee.', 'Membership is included in student fees, with no additional charge.', 'Students must pay to download the app.', 'The cost has doubled.'], answer: 1 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-12/academic-talk.mp3',
      transcript: `PROFESSOR: Let's talk about a psychological phenomenon that shapes your daily life more than you probably realize: the power of habit. A surprisingly large portion of what we do each day isn't the result of conscious decisions — it's automatic behavior, driven by habit. And understanding how habits work gives us real power to change them.\n\nPsychologists describe a habit as a loop with three parts. First, there's a cue — a trigger that tells your brain to go into automatic mode. It might be a time of day, a location, an emotion, or the presence of certain people. Second, there's the routine — the behavior itself, which can be physical, mental, or emotional. And third, there's the reward — the benefit your brain gets, which teaches it that this loop is worth remembering. Over time, cue and reward become so linked that the routine happens almost automatically.\n\nHere's the crucial insight for changing habits: you generally can't just erase a bad habit. What works better is to keep the same cue and the same reward, but change the routine in between. Say you have a habit of eating a cookie every afternoon. The cue might be boredom around three p.m., and the reward might be a short break and a change of scenery — not actually the cookie itself. If you replace the routine — say, taking a two-minute walk instead — while keeping the same cue and reward, the new behavior can take hold.\n\nThe reason this matters is that willpower alone is a weak tool for lasting change. People who rely on sheer willpower often fail, because habits are wired deep in the brain. But people who understand the loop — who identify their cues and rewards and consciously redesign the routine — are far more successful. In a sense, you don't break a habit; you replace it.`,
      questions: [
        { type: 'mcq', id: 't12-l-at1', part: 8, text: 'What is the main topic of the lecture?', options: ['How memory works', 'How to increase willpower', 'How habits work and how to change them', 'Why people feel bored'], answer: 2 },
        { type: 'mcq', id: 't12-l-at2', part: 8, text: 'What are the three parts of the "habit loop"?', options: ['Thought, word, and action', 'Cause, effect, and result', 'Cue, routine, and reward', 'Start, middle, and end'], answer: 2 },
        { type: 'mcq', id: 't12-l-at3', part: 8, text: 'According to the professor, what is the most effective way to change a habit?', options: ['Keep the same cue and reward but change the routine in between', 'Avoid all cues', 'Punish yourself for the behavior', 'Use willpower to stop it completely'], answer: 0 },
        { type: 'mcq', id: 't12-l-at4', part: 8, text: 'In the cookie example, what might the real reward be?', options: ['The taste of the cookie', 'A short break and a change of scenery', 'Losing weight', 'Saving money'], answer: 1 },
        { type: 'mcq', id: 't12-l-at5', part: 8, text: 'Why does the professor say willpower alone is a weak tool?', options: ['Because habits cannot be changed at all', 'Because habits are wired deep in the brain, so understanding the loop works better', 'Because willpower is unnecessary', 'Because rewards do not matter'], answer: 1 },
      ],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Build a Sentence',
      instructions: 'Put the words in the correct order to make a grammatical sentence.',
      questions: [
        { type: 'sentencebuild', id: 't12-w-bs1', part: 9, tiles: ['We', 'watched', 'the sunset', 'from', 'the balcony'], answer: ['We', 'watched', 'the sunset', 'from', 'the balcony'] },
        { type: 'sentencebuild', id: 't12-w-bs2', part: 9, tiles: ['me', 'you', 'could', 'help', 'I wonder', 'if'], answer: ['I wonder', 'if', 'you', 'could', 'help', 'me'] },
        { type: 'sentencebuild', id: 't12-w-bs3', part: 9, tiles: ['bought', 'The bike', 'she', 'has', 'a flat tire'], answer: ['The bike', 'she', 'bought', 'has', 'a flat tire'] },
        { type: 'sentencebuild', id: 't12-w-bs4', part: 9, tiles: ['it', 'gets', 'Before', 'let\'s', 'leave', 'dark,'], answer: ['Before', 'it', 'gets', 'dark,', 'let\'s', 'leave'] },
        { type: 'sentencebuild', id: 't12-w-bs5', part: 9, tiles: ['is', 'Today', 'yesterday', 'warmer', 'than'], answer: ['Today', 'is', 'warmer', 'than', 'yesterday'] },
        { type: 'sentencebuild', id: 't12-w-bs6', part: 9, tiles: ['tired,', 'Feeling', 'early', 'he', 'to bed', 'went'], answer: ['Feeling', 'tired,', 'he', 'went', 'to bed', 'early'] },
      ],
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't12-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You reserved a study room at the library for a group project, but when you arrived, another group was using it and would not leave. You want to report what happened and ask the library to confirm your reservation for next week.\n\nWrite an email to the library front desk.`,
          text: 'In your email: explain what happened, make your request clearly, and keep a polite tone. Write approximately 80–120 words.',
          minWords: 80 },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't12-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on society and technology. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Haddad: Some schools have started teaching computer programming to all students from a young age. Do you think programming should be a required subject for all children? Why or why not?\n\nStudent (Yuki): I think it should be required. Technology is part of every job now, and learning to code teaches logical thinking.\n\nStudent (Pablo): I'm not so sure. Not everyone will work in technology, and schools already have a full timetable. Maybe it should be optional.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100 },
      ],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't12-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-12/repeat-1.mp3', targetSentence: 'The bus stops here.' },
        { type: 'repeat', id: 't12-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-12/repeat-2.mp3', targetSentence: 'She painted the fence a bright shade of blue.' },
        { type: 'repeat', id: 't12-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-12/repeat-3.mp3', targetSentence: 'The children built a sandcastle near the edge of the water.' },
        { type: 'repeat', id: 't12-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-12/repeat-4.mp3', targetSentence: 'The engineer described how the new bridge would reduce traffic in the area.' },
        { type: 'repeat', id: 't12-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-12/repeat-5.mp3', targetSentence: 'Although few people attended the first meeting, interest in the project grew steadily over time.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't12-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: To begin, describe a festival or celebration that is important in your culture. What happens, and why is it special?' },
        { type: 'speak', id: 't12-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to live in one place their whole lives, while others prefer to move often. Which would you prefer, and why? Give reasons and an example.' },
        { type: 'speak', id: 't12-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your university can offer students either free public transport passes or free gym membership. Which would you recommend, and why? Explain how it would benefit students.' },
        { type: 'speak', id: 't12-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how might the food people eat change over the next twenty years? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
