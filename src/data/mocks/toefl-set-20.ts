import type { MockExam } from './types';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Audios bajo /audio/toefl/set-20/ — pendientes (ver checklist de medios).

const mock: MockExam = {
  id: 'set-20',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 20 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Reading — Complete the Words',
      instructions: 'Complete each word so the text makes sense. Some letters are given.',
      questions: [
        {
          type: 'wordcomplete', id: 't20-r-cw1', part: 1, qRange: [1, 6],
          instructions: 'A student is writing a message about a lost item.',
          template: `Hi,\n\nI think I left my {{1}} in the library yesterday afternoon. It's a black backpack with a red {{2}}. Inside there are some books and a blue water {{3}}. I was sitting on the second {{4}}, near the windows, at around three o'clock. Could you please check the lost-and-{{5}}? I would be very {{6}} if you could let me know.\n\nThank you,\nNina`,
          blanks: [
            { num: 1, prefix: 'bag', answer: 'bag' },
            { num: 2, prefix: 'zi', answer: 'zip' },
            { num: 3, prefix: 'bo', answer: 'bottle' },
            { num: 4, prefix: 'flo', answer: 'floor' },
            { num: 5, prefix: 'fo', answer: 'found' },
            { num: 6, prefix: 'grat', answer: 'grateful' },
          ],
        },
        {
          type: 'wordcomplete', id: 't20-r-cw2', part: 1, qRange: [7, 12],
          instructions: 'The following is from an article about renewable energy.',
          template: `Renewable energy comes from sources that will not run out, such as the sun, wind, and moving {{1}}. Solar panels turn sunlight into {{2}}, while wind {{3}} use moving air to generate power. Unlike coal and oil, these sources produce little or no {{4}}, which makes them much cleaner for the {{5}}. As technology improves and costs fall, more countries are choosing to {{6}} in renewable energy.`,
          blanks: [
            { num: 1, prefix: 'wa', answer: 'water' },
            { num: 2, prefix: 'elec', answer: 'electricity' },
            { num: 3, prefix: 'tur', answer: 'turbines' },
            { num: 4, prefix: 'poll', answer: 'pollution' },
            { num: 5, prefix: 'env', answer: 'environment' },
            { num: 6, prefix: 'inv', answer: 'invest' },
          ],
        },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Café job notice)',
      instructions: 'Read the notice and answer the questions.',
      passage: `SUNRISE CAFÉ — STAFF NOTICE\n\nWe are looking for a part-time weekend server.\n\n• Hours: Saturdays and Sundays, 8:00 a.m. – 2:00 p.m.\n• Duties: taking orders, serving food and drinks, and clearing tables.\n• A friendly, reliable attitude is essential; no experience necessary — full training given.\n• Free lunch and drinks provided during shifts.\n\nTo apply, hand your details to the manager at the counter, or email us. Applications close on the 15th.`,
      passageTitle: 'Café job notice',
      questions: [
        { type: 'mcq', id: 't20-r-dl1', part: 2, text: 'What are the working hours?', options: ['Every evening', 'Full-time', 'Weekdays only', 'Saturdays and Sundays, 8 a.m. to 2 p.m.'], answer: 3 },
        { type: 'mcq', id: 't20-r-dl2', part: 2, text: 'What does the notice say about experience?', options: ['No experience is necessary; full training is given.', 'Only experienced servers may apply.', 'Experience in cooking is needed.', 'Two years are required.'], answer: 0 },
        { type: 'mcq', id: 't20-r-dl3', part: 2, text: 'How can someone apply?', options: ['Only by phone', 'By handing details to the manager or by email', 'By filling in an online form only', 'By visiting after closing time'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Study group message)',
      instructions: 'Read the messages and answer the questions.',
      passage: `LEILA: Do you want to meet to study for the chemistry test this weekend?\n\nTOM: Yes, definitely. Saturday or Sunday?\n\nLEILA: Saturday works better for me. Morning or afternoon?\n\nTOM: Let's do the afternoon — say, two o'clock? Where should we meet?\n\nLEILA: The library is closed on Saturday afternoons, so how about the study room in the student center? It's usually quiet.\n\nTOM: Perfect. I'll bring my notes and the practice questions. See you at two.`,
      passageTitle: 'Study group messages',
      questions: [
        { type: 'mcq', id: 't20-r-dl4', part: 3, text: 'When do they agree to meet?', options: ['Friday evening', 'Sunday morning', 'Saturday afternoon at two o\'clock', 'Saturday morning'], answer: 2 },
        { type: 'mcq', id: 't20-r-dl5', part: 3, text: 'Why do they choose the student center instead of the library?', options: ['The library is too noisy.', 'The student center has free food.', 'It is closer.', 'The library is closed on Saturday afternoons.'], answer: 3 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Reading — Read an Academic Passage',
      instructions: 'Read the passage and answer questions.',
      passage: `One of the most surprising discoveries in modern astronomy is that the ordinary matter we can see—stars, planets, gas, and everything made of atoms—accounts for only a small fraction of the universe. The rest appears to be made of two mysterious components that scientists call dark matter and dark energy. Despite their similar names, they are quite different, and together they represent one of the great unsolved problems in physics.\n\nDark matter was proposed to explain a puzzle about how galaxies behave. When astronomers measured the speed at which stars orbit within galaxies, they found that the outer stars were moving far too fast. Based on the visible matter alone, these fast-moving stars should have flown off into space; the gravity of the visible stars and gas was simply not strong enough to hold them. The leading explanation is that galaxies contain a large amount of invisible matter—dark matter—whose gravity holds them together. We cannot see it directly because it does not emit or reflect light, but we can detect its gravitational effects.\n\nDark energy addresses a different mystery. In the late twentieth century, astronomers made a startling discovery: the expansion of the universe is not slowing down, as gravity would suggest, but speeding up. Something appears to be pushing the universe apart, overcoming the inward pull of gravity on the largest scales. Scientists gave this unknown force the name dark energy, though naming it is not the same as understanding it.\n\nWhat makes these ideas so remarkable—and so humbling—is their scale. Current estimates suggest that ordinary matter makes up only about five percent of the universe, dark matter about twenty-seven percent, and dark energy the remaining sixty-eight percent. In other words, roughly ninety-five percent of the universe is made of things we cannot see and do not yet understand. Rather than a sign of failure, many scientists see this as thrilling: it means that some of the most fundamental features of reality are still waiting to be discovered.`,
      passageTitle: 'Dark Matter and Dark Energy',
      questions: [
        { type: 'mcq', id: 't20-r-ap1', part: 4, text: 'According to the passage, how much of the universe is ordinary, visible matter?', options: ['About five percent', 'About sixty-eight percent', 'About half', 'About ninety-five percent'], answer: 0 },
        { type: 'mcq', id: 't20-r-ap2', part: 4, text: 'What puzzle led scientists to propose dark matter?', options: ['The universe is too cold.', 'Outer stars in galaxies move too fast to be held by the gravity of visible matter alone.', 'Stars are disappearing.', 'Galaxies are too small.'], answer: 1 },
        { type: 'mcq', id: 't20-r-ap3', part: 4, text: 'Why can dark matter not be seen directly?', options: ['It moves too fast.', 'It is too far away.', 'It does not emit or reflect light, though its gravitational effects can be detected.', 'It is hidden behind stars.'], answer: 2 },
        { type: 'mcq', id: 't20-r-ap4', part: 4, text: 'What mystery does dark energy address?', options: ['Why galaxies form', 'Why light travels fast', 'Why stars are hot', 'Why the expansion of the universe is speeding up rather than slowing down'], answer: 3 },
        { type: 'mcq', id: 't20-r-ap5', part: 4, text: 'How do many scientists view the fact that ~95% of the universe is not understood?', options: ['As thrilling, because fundamental features of reality are still waiting to be discovered', 'As proof that science is wrong', 'As unimportant', 'As a sign of failure'], answer: 0 },
        { type: 'multiselect', id: 't20-r-ap6', part: 4, qRange: [6, 6], text: 'Select the TWO statements supported by the passage.', options: [
          { letter: 'A', text: 'Dark matter\'s gravity is thought to hold galaxies together.' },
          { letter: 'B', text: 'Dark energy is well understood by scientists.' },
          { letter: 'C', text: 'The expansion of the universe appears to be speeding up.' },
          { letter: 'D', text: 'Ordinary matter makes up most of the universe.' },
        ], selectCount: 2, answers: ['A', 'C'] },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't20-l-cr1', part: 5, audioUrl: '/audio/toefl/set-20/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ['It\'s right next to the science building.', 'No, I don\'t like fishing.', 'The soup is ready.', 'She left this morning.'], answer: 0 },
        { type: 'mcq', id: 't20-l-cr2', part: 5, audioUrl: '/audio/toefl/set-20/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ['Yes, she is a vet.', 'It is four meters wide.', 'Sure, I can show you how it works.', 'The window is broken.'], answer: 2 },
        { type: 'mcq', id: 't20-l-cr3', part: 5, audioUrl: '/audio/toefl/set-20/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ['He arrives on Thursday.', 'It costs six dollars.', 'The results will be posted on Friday.', 'The bread is fresh.'], answer: 2 },
        { type: 'mcq', id: 't20-l-cr4', part: 5, audioUrl: '/audio/toefl/set-20/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ['Of course — I\'ll bring an umbrella for you too.', 'The bus was late.', 'No, I have not seen it.', 'It is made of glass.'], answer: 0 },
        { type: 'mcq', id: 't20-l-cr5', part: 5, audioUrl: '/audio/toefl/set-20/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ['Yes, I got the internship I applied for!', 'The park is far.', 'She teaches history.', 'It is quite small.'], answer: 0 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between a student and a librarian. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-20/conversation.mp3',
      transcript: `STUDENT: Hi, I'm writing a research paper and I'm struggling to tell which sources are reliable. There's so much information online and I don't know what to trust.\n\nLIBRARIAN: That's a really important skill, and I'm glad you asked. Let me give you a few questions to ask about any source. First: who is the author, and what are their qualifications? An article by a professor or a recognized expert carries more weight than an anonymous blog post.\n\nSTUDENT: That makes sense. What else?\n\nLIBRARIAN: Second, look at where it's published. Is it a peer-reviewed journal, a reputable news organization, or just a random website? Peer-reviewed means other experts have checked it before publication. Third, check the date — for many topics, especially in science and technology, you want recent sources.\n\nSTUDENT: What about websites that look professional but I've never heard of?\n\nLIBRARIAN: Good question. A professional-looking design doesn't guarantee reliability — anyone can make a slick website. Look instead at whether claims are backed by evidence and whether the site cites its sources. And be cautious of anything that seems designed to make you angry or that only presents one side. Strong emotion is often a sign that a source is trying to persuade rather than inform.\n\nSTUDENT: That's really useful. So it's less about how something looks and more about the evidence behind it.\n\nLIBRARIAN: Exactly. And remember, you can always cross-check — if several reliable sources agree, you can be more confident. If a claim appears in only one place, be skeptical.`,
      questions: [
        { type: 'mcq', id: 't20-l-cv1', part: 6, text: 'What is the student struggling with?', options: ['Choosing a topic', 'Finding the library', 'Telling which sources are reliable', 'Writing an introduction'], answer: 2 },
        { type: 'mcq', id: 't20-l-cv2', part: 6, text: 'What is the first question the librarian suggests asking about a source?', options: ['How much it costs', 'What color the website is', 'How long it is', 'Who the author is and what their qualifications are'], answer: 3 },
        { type: 'mcq', id: 't20-l-cv3', part: 6, text: 'What does the librarian say about professional-looking websites?', options: ['A professional look does not guarantee reliability; look at the evidence and sources.', 'They should always be avoided.', 'They are the best sources.', 'They are always reliable.'], answer: 0 },
        { type: 'mcq', id: 't20-l-cv4', part: 6, text: 'What does the librarian suggest doing to be more confident about a claim?', options: ['Trust the first source found', 'Cross-check to see if several reliable sources agree', 'Choose the longest article', 'Ignore the date'], answer: 1 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-20/announcement.mp3',
      transcript: `Good morning, students. This is an announcement about the upcoming university open day, when we welcome prospective students and their families to campus. It will be held on Saturday the eighteenth, and we're looking for current students to volunteer as guides and helpers.\n\nAs a volunteer, you'd help with tasks such as giving campus tours, answering questions about student life, and assisting at information desks. It's a great way to give back, meet new people, and it looks excellent on your résumé. No special training is required — we'll hold a short briefing the day before. In return, volunteers receive a free lunch, a university T-shirt, and a certificate of participation. Shifts are flexible, from two to six hours, so you can help as much or as little as your schedule allows. If you're interested, sign up at the student union office by Wednesday, or email the volunteer coordinator. Thank you, and we hope many of you will take part.`,
      questions: [
        { type: 'mcq', id: 't20-l-an1', part: 7, text: 'What is the announcement asking students to do?', options: ['Take an exam', 'Attend classes on Saturday', 'Volunteer as guides and helpers at the university open day', 'Pay a fee'], answer: 2 },
        { type: 'mcq', id: 't20-l-an2', part: 7, text: 'What do volunteers receive in return?', options: ['Extra course credit', 'A parking pass', 'Money', 'A free lunch, a T-shirt, and a certificate of participation'], answer: 3 },
        { type: 'mcq', id: 't20-l-an3', part: 7, text: 'How can interested students sign up?', options: ['At the student union office by Wednesday, or by emailing the coordinator', 'By calling their professor', 'There is no sign-up.', 'By turning up on the day'], answer: 0 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-20/academic-talk.mp3',
      transcript: `PROFESSOR: Today I want to discuss a psychological effect that influences your judgments constantly, usually without you noticing: it's called anchoring. Anchoring is the tendency to rely too heavily on the first piece of information we receive — the "anchor" — when making decisions or estimates. Once an anchor is set, everything afterward is judged relative to it.\n\nLet me give you a classic experiment. Researchers asked two groups of people to estimate the percentage of African countries in the United Nations. But first, they spun a wheel that landed on a number — which was rigged. One group saw the wheel land on ten; the other saw it land on sixty-five. Then they made their estimates. Now, the number on the wheel was obviously random and had nothing to do with the question. Yet the group that saw ten guessed much lower, on average, than the group that saw sixty-five. The random anchor pulled their estimates toward it.\n\nAnchoring shows up everywhere in real life, and businesses use it deliberately. Think about a store that lists a product at an original price of two hundred dollars, crossed out, now on sale for one hundred. That two hundred is an anchor. It makes one hundred feel like a great deal, even if the item was never really worth two hundred. Or consider salary negotiations: whoever names a number first often sets the anchor around which the entire negotiation revolves.\n\nWhat's striking is how hard anchoring is to resist, even when you know about it. Simply being aware that an anchor is arbitrary doesn't fully protect you. But there are strategies. When you're about to make an estimate or a decision, it helps to deliberately consider the opposite — to ask, "What would make this number too high?" and "What would make it too low?" Generating your own independent estimate before you see someone else's figure can also reduce the effect. The broader lesson is one of intellectual humility: our judgments are far more shaped by irrelevant context than we like to believe.`,
      questions: [
        { type: 'mcq', id: 't20-l-at1', part: 8, text: 'What is "anchoring"?', options: ['A method of tying up boats', 'The tendency to rely too heavily on the first piece of information when making decisions', 'A way to improve memory', 'A negotiation strategy that always works'], answer: 1 },
        { type: 'mcq', id: 't20-l-at2', part: 8, text: 'What did the UN experiment demonstrate?', options: ['That estimates are always accurate', 'That people know a lot about geography', 'That a random anchor number pulled people\'s estimates toward it', 'That the wheel was fair'], answer: 2 },
        { type: 'mcq', id: 't20-l-at3', part: 8, text: 'How do stores use anchoring, according to the professor?', options: ['By giving items away', 'By raising all prices', 'By hiding prices', 'By showing a high "original" price so a lower sale price feels like a great deal'], answer: 3 },
        { type: 'mcq', id: 't20-l-at4', part: 8, text: 'What does the professor say about resisting anchoring?', options: ['It is hard to resist even when you are aware of it.', 'It cannot be reduced at all.', 'Only experts are affected.', 'It is easy once you know about it.'], answer: 0 },
        { type: 'mcq', id: 't20-l-at5', part: 8, text: 'What strategy does the professor suggest to reduce anchoring?', options: ['Always trust the first number', 'Deliberately consider the opposite and generate your own estimate before seeing others\' figures', 'Avoid making any decisions', 'Ask someone else to decide'], answer: 1 },
      ],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Build a Sentence',
      instructions: 'Put the words in the correct order to make a grammatical sentence.',
      questions: [
        { type: 'sentencebuild', id: 't20-w-bs1', part: 9, tiles: ['They', 'are', 'organizing', 'a concert', 'for charity'], answer: ['They', 'are', 'organizing', 'a concert', 'for charity'] },
        { type: 'sentencebuild', id: 't20-w-bs2', part: 9, tiles: ['the details', 'you', 'confirm', 'Could', 'by email'], answer: ['Could', 'you', 'confirm', 'the details', 'by email'] },
        { type: 'sentencebuild', id: 't20-w-bs3', part: 9, tiles: ['recommended', 'The course', 'you', 'was', 'very useful'], answer: ['The course', 'you', 'recommended', 'was', 'very useful'] },
        { type: 'sentencebuild', id: 't20-w-bs4', part: 9, tiles: ['finish,', 'they', 'When', 'go home', 'they\'ll'], answer: ['When', 'they', 'finish,', 'they\'ll', 'go home'] },
        { type: 'sentencebuild', id: 't20-w-bs5', part: 9, tiles: ['is', 'This year', 'last year', 'than', 'busier'], answer: ['This year', 'is', 'busier', 'than', 'last year'] },
        { type: 'sentencebuild', id: 't20-w-bs6', part: 9, tiles: ['the project,', 'Having', 'they', 'a break', 'completed', 'took'], answer: ['Having', 'completed', 'the project,', 'they', 'took', 'a break'] },
      ],
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't20-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You are a member of a local library. You have found a book on the shelf that has several pages torn out. You want to report the damaged book so it can be repaired or replaced, and to make clear it was already damaged when you found it.\n\nWrite an email to the library staff.`,
          text: 'In your email: describe the problem, make clear you did not cause the damage, and suggest what should happen next, using a polite tone. Write as much as you can in complete sentences.',
          minWords: 0, timeLimitSeconds: 420, minimumWordsPolicy: 'none-published', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't20-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on the environment and daily life. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Andersson: Some cities charge a fee for single-use plastic bags to reduce plastic waste. Do you think charging for plastic bags is an effective way to protect the environment? Why or why not?\n\nStudent (Wei): I think it's effective. Even a small charge makes people bring their own reusable bags, which noticeably reduces plastic waste. For example, after my city introduced the fee, I started keeping a reusable bag in my backpack and rarely buy a plastic one anymore.\n\nStudent (Julia): I'm not so sure. The fee is so small that many people just pay it, and reusable bags have their own environmental costs to produce. For example, I've seen people buy a reusable bag every single week simply because they keep forgetting to bring the one they already own.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100, timeLimitSeconds: 600, minimumWordsPolicy: 'recommended-100', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't20-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-20/repeat-1.mp3', targetSentence: 'The train is on time.' },
        { type: 'repeat', id: 't20-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-20/repeat-2.mp3', targetSentence: 'She wrapped the present and hid it in the closet.' },
        { type: 'repeat', id: 't20-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-20/repeat-3.mp3', targetSentence: 'The gardener planted rows of vegetables behind the house.' },
        { type: 'repeat', id: 't20-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-20/repeat-4.mp3', targetSentence: 'The report concluded that the city needed more affordable housing for young families.' },
        { type: 'repeat', id: 't20-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-20/repeat-5.mp3', targetSentence: 'Although the first design had several problems, the team improved it until it met all the requirements.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't20-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: To begin, describe an achievement you are proud of. What was it, and why does it mean a lot to you?' },
        { type: 'speak', id: 't20-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to have a few close friends, while others prefer to have many friends. Which do you prefer, and why? Give reasons and an example.' },
        { type: 'speak', id: 't20-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your university can spend money on either improving Wi-Fi across campus or adding more study spaces. Which would you recommend, and why? Explain how it would benefit students.' },
        { type: 'speak', id: 't20-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how might the way people keep in touch with friends and family change over the next twenty years? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
