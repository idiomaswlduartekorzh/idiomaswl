import type { MockExam } from './types';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Migrado del formato antiguo (0–120) al formato 2026. Audios bajo /audio/toefl/set-1/.

const mock: MockExam = {
  id: 'set-1',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 1 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Reading — Complete the Words',
      instructions: 'Complete each word so the text makes sense. Some letters are given.',
      questions: [
        {
          type: 'wordcomplete', id: 't1-r-cw1', part: 1, qRange: [1, 6],
          instructions: 'A student is writing to a friend about the weekend.',
          template: `Hi Sara,\n\nDo you want to do something this {{1}}? The weather is supposed to be sunny, so we could go for a {{2}} in the park or visit the new art {{3}}. I've heard the current {{4}} there is really good. Afterwards we could get some {{5}} at that café you like. Let me know what you'd {{6}} to do.\n\nSee you,\nJon`,
          blanks: [
            { num: 1, prefix: 'week', answer: 'weekend' },
            { num: 2, prefix: 'wa', answer: 'walk' },
            { num: 3, prefix: 'gal', answer: 'gallery' },
            { num: 4, prefix: 'exhib', answer: 'exhibition' },
            { num: 5, prefix: 'lu', answer: 'lunch' },
            { num: 6, prefix: 'pre', answer: 'prefer' },
          ],
        },
        {
          type: 'wordcomplete', id: 't1-r-cw2', part: 1, qRange: [7, 12],
          instructions: 'The following is from an article about the sun.',
          template: `The sun is a giant ball of hot {{1}} at the center of our solar system. It provides the {{2}} and heat that make life on Earth possible. Deep inside the sun, a process called nuclear {{3}} releases enormous amounts of energy. This energy travels through space and reaches Earth in about eight {{4}}. Without the sun, our planet would be far too {{5}} for anything to live. Scientists study the sun to understand how it affects our {{6}}.`,
          blanks: [
            { num: 1, prefix: 'ga', answer: 'gas' },
            { num: 2, prefix: 'li', answer: 'light' },
            { num: 3, prefix: 'fu', answer: 'fusion' },
            { num: 4, prefix: 'min', answer: 'minutes' },
            { num: 5, prefix: 'co', answer: 'cold' },
            { num: 6, prefix: 'cli', answer: 'climate' },
          ],
        },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Bookshop notice)',
      instructions: 'Read the notice and answer the questions.',
      passage: `CORNER BOOKSHOP — SUMMER SALE\n\n• All fiction: buy two, get one free (cheapest book free).\n• Children's books: 25% off.\n• Members receive an extra 10% off all purchases.\n• The sale runs from July 1 to July 31.\n• Special orders and gift cards are not included in the sale.\n\nNot a member yet? Ask at the counter — joining is free and takes a minute.`,
      passageTitle: 'Bookshop notice',
      questions: [
        { type: 'mcq', id: 't1-r-dl1', part: 2, text: 'What is the offer on fiction?', options: ['Half price', 'A free gift card', '25% off', 'Buy two, get one free'], answer: 3 },
        { type: 'mcq', id: 't1-r-dl2', part: 2, text: 'What extra benefit do members receive?', options: ['An extra 10% off all purchases', 'A free book every month', 'Double points', 'Free delivery'], answer: 0 },
        { type: 'mcq', id: 't1-r-dl3', part: 2, text: 'What is NOT included in the sale?', options: ['Fiction', 'Children\'s books', 'Special orders and gift cards', 'Nothing is excluded.'], answer: 2 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Delivery message)',
      instructions: 'Read the messages and answer the questions.',
      passage: `DELIVERY APP: Your parcel will arrive today between 3 and 5 p.m. A signature is required.\n\nYOU: I won't be home until 6. Can it be left with a neighbor?\n\nDELIVERY APP: Yes. Reply with the house number of a neighbor who can accept it, or choose "deliver tomorrow" in the app.\n\nYOU: Please leave it at number 14. Thank you.\n\nDELIVERY APP: Confirmed. Your parcel will be delivered to number 14 and a photo will be sent as proof.`,
      passageTitle: 'Delivery messages',
      questions: [
        { type: 'mcq', id: 't1-r-dl4', part: 3, text: 'Why can\'t the person accept the parcel themselves?', options: ['They did not order anything.', 'They are on holiday.', 'They won\'t be home until 6 p.m.', 'They moved house.'], answer: 2 },
        { type: 'mcq', id: 't1-r-dl5', part: 3, text: 'What will happen after the parcel is delivered to number 14?', options: ['The parcel will be returned.', 'A fee will be charged.', 'A signature will be collected from the person.', 'A photo will be sent as proof.'], answer: 3 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Reading — Read an Academic Passage',
      instructions: 'Read the passage and answer questions.',
      passage: `The Sahara Desert, the largest hot desert on Earth, is often imagined as a timeless sea of sand. Yet the geological and archaeological record tells a startling story: the Sahara has not always been a desert. In fact, over the past several hundred thousand years, it has repeatedly transformed between a lush, green landscape and the arid expanse we know today. Scientists refer to the green phases as the "African Humid Periods."\n\nDuring these humid periods, the Sahara was dotted with lakes, rivers, and grasslands. Rock paintings found deep in the desert depict people herding cattle, swimming, and hunting animals such as giraffes and hippos—creatures that could never survive in today's climate. The bones of fish and crocodiles have been found buried beneath the sand, silent evidence of a once-watery world.\n\nWhat causes these dramatic transformations? The answer lies not on Earth but in space. The Earth's orbit and the tilt of its axis change slowly over cycles lasting tens of thousands of years. These changes alter the amount of sunlight the Northern Hemisphere receives in summer, which in turn strengthens or weakens the seasonal rains, known as the monsoon, that reach into North Africa. When the tilt and orbit align to bring stronger monsoon rains, the Sahara greens; when they shift, the rains retreat and the desert returns. The most recent green Sahara ended around five thousand years ago, drying out over a relatively short period.\n\nThis history carries a powerful lesson. It shows that even the most seemingly permanent features of our planet are, on long timescales, in constant flux, driven by subtle astronomical rhythms. It also has human significance: some researchers believe that the drying of the Sahara pushed early human populations toward the Nile Valley, contributing to the rise of ancient Egyptian civilization. The desert we see today, then, is not a fixed backdrop to history but an active, changing force that has helped shape where and how humans have lived.`,
      passageTitle: 'The Green Sahara',
      questions: [
        { type: 'mcq', id: 't1-r-ap1', part: 4, text: 'What surprising fact does the passage present about the Sahara?', options: ['It has repeatedly transformed between a green landscape and a desert.', 'It is shrinking rapidly.', 'It has no plant or animal life.', 'It has always been a desert.'], answer: 0 },
        { type: 'mcq', id: 't1-r-ap2', part: 4, text: 'What evidence shows the Sahara was once green?', options: ['Modern satellite photos', 'Rock paintings of cattle and animals, and buried fish and crocodile bones', 'Written records from ancient Egypt', 'The current climate'], answer: 1 },
        { type: 'mcq', id: 't1-r-ap3', part: 4, text: 'According to the passage, what causes the Sahara\'s transformations?', options: ['Ocean currents', 'Human activity', 'Slow changes in the Earth\'s orbit and tilt that alter monsoon rains', 'Volcanic eruptions'], answer: 2 },
        { type: 'mcq', id: 't1-r-ap4', part: 4, text: 'When did the most recent green Sahara end?', options: ['It has not ended.', 'Around one million years ago', 'Around five thousand years ago', 'Around five hundred years ago'], answer: 2 },
        { type: 'mcq', id: 't1-r-ap5', part: 4, text: 'What human significance does the passage suggest?', options: ['The drying of the Sahara may have pushed early humans toward the Nile Valley, contributing to ancient Egyptian civilization.', 'Humans caused the Sahara to form.', 'People have always avoided the region.', 'The Sahara has no effect on humans.'], answer: 0 },
        { type: 'multiselect', id: 't1-r-ap6', part: 4, qRange: [6, 6], text: 'Select the TWO statements supported by the passage.', options: [
          { letter: 'A', text: 'The Sahara has gone through "African Humid Periods" when it was green.' },
          { letter: 'B', text: 'The Sahara has always looked exactly as it does today.' },
          { letter: 'C', text: 'Changes in the Earth\'s orbit and tilt influence the Sahara\'s climate.' },
          { letter: 'D', text: 'The green Sahara was caused by human farming.' },
        ], selectCount: 2, answers: ['A', 'C'] },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't1-l-cr1', part: 5, audioUrl: '/audio/toefl/set-1/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ['It\'s on the first floor, next to the café.', 'No, I don\'t like tennis.', 'The soup is ready.', 'She left this morning.'], answer: 0 },
        { type: 'mcq', id: 't1-l-cr2', part: 5, audioUrl: '/audio/toefl/set-1/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ['Yes, he is a doctor.', 'It is two meters long.', 'Sure, I\'d love to join you for dinner.', 'The gate is closed.'], answer: 2 },
        { type: 'mcq', id: 't1-l-cr3', part: 5, audioUrl: '/audio/toefl/set-1/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ['He arrives on Friday.', 'It costs five dollars.', 'You can borrow one from the front desk.', 'The tea is cold.'], answer: 2 },
        { type: 'mcq', id: 't1-l-cr4', part: 5, audioUrl: '/audio/toefl/set-1/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ['Of course — I\'ll email you the details.', 'The bus was late.', 'No, I have not read it.', 'It is made of wood.'], answer: 0 },
        { type: 'mcq', id: 't1-l-cr5', part: 5, audioUrl: '/audio/toefl/set-1/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ['Yes, I passed all my exams!', 'The store is far.', 'She teaches music.', 'It is quite cheap.'], answer: 0 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between two students. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-1/conversation.mp3',
      transcript: `MAN: Have you decided which elective you're taking next term?\n\nWOMAN: I'm stuck between two, actually. There's "Introduction to Psychology," which sounds really interesting, and "Public Speaking," which I know I need but am kind of dreading.\n\nMAN: Why are you dreading public speaking?\n\nWOMAN: I get really nervous in front of people. But that's exactly why I feel like I should take it — I'll have to give presentations in almost every career, and I never get better by avoiding it.\n\nMAN: That's a mature way to look at it. Psychology would probably be more enjoyable, but public speaking might be more useful in the long run.\n\nWOMAN: Right. And a friend who took the public speaking course last year said the teacher is really supportive — you start with tiny, low-pressure exercises and build up gradually. It's not like you have to give a big speech on day one.\n\nMAN: That does sound less scary. Honestly, I might take it too. I could use the practice.\n\nWOMAN: You should! It'd be easier with a friend in the class. Okay, you've helped me decide — I'll sign up for public speaking. I can always take psychology another term.`,
      questions: [
        { type: 'mcq', id: 't1-l-cv1', part: 6, text: 'What decision is the woman trying to make?', options: ['What job to apply for', 'Whether to change universities', 'Which elective to take next term', 'Where to live'], answer: 2 },
        { type: 'mcq', id: 't1-l-cv2', part: 6, text: 'Why is the woman considering the public speaking course despite dreading it?', options: ['It has no exams.', 'Her friend forced her to.', 'It is the easiest course.', 'She will need presentation skills in almost any career and won\'t improve by avoiding it.'], answer: 3 },
        { type: 'mcq', id: 't1-l-cv3', part: 6, text: 'What did the woman\'s friend say about the public speaking teacher?', options: ['The teacher is supportive and starts with small, low-pressure exercises.', 'The teacher gives no feedback.', 'The teacher cancels classes often.', 'The teacher is very strict.'], answer: 0 },
        { type: 'mcq', id: 't1-l-cv4', part: 6, text: 'What does the woman decide at the end?', options: ['To take psychology', 'To sign up for public speaking', 'To take neither course', 'To wait a year'], answer: 1 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-1/announcement.mp3',
      transcript: `Good morning, students. This is an announcement about the campus cafeteria. Starting next Monday, we are introducing a number of changes based on the feedback many of you gave in last term's survey. First, we're extending our opening hours: the cafeteria will now stay open until nine p.m. on weekdays, so those of you studying late can still get a hot meal.\n\nSecond, we're expanding our vegetarian and vegan options — there will be at least three plant-based main dishes available at every meal. Third, to reduce waste, we're switching to reusable plates and cups for anyone eating in; disposable containers will only be given to those taking food away. We'll have a small deposit system for takeaway containers, which you get back when you return them. We hope these changes make the cafeteria a better place for everyone. Thank you for your feedback — it really does make a difference.`,
      questions: [
        { type: 'mcq', id: 't1-l-an1', part: 7, text: 'What is the announcement mainly about?', options: ['A cafeteria closure', 'A new cafeteria building', 'Changes to the cafeteria based on student feedback', 'A rise in food prices'], answer: 2 },
        { type: 'mcq', id: 't1-l-an2', part: 7, text: 'What change to opening hours is mentioned?', options: ['It will open only at weekends.', 'Hours will not change.', 'The cafeteria will close earlier.', 'It will stay open until 9 p.m. on weekdays.'], answer: 3 },
        { type: 'mcq', id: 't1-l-an3', part: 7, text: 'How is the cafeteria reducing waste?', options: ['By switching to reusable plates and cups for those eating in', 'By closing early', 'By removing vegetarian options', 'By charging more for food'], answer: 0 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-1/academic-talk.mp3',
      transcript: `PROFESSOR: Today I want to talk about a color that changed the world — or rather, a color that was, for most of history, almost impossible to make: the color purple. Specifically, a deep reddish-purple dye known in the ancient world as Tyrian purple. Understanding its story tells us a lot about how scarcity shapes value and even politics.\n\nIn the ancient Mediterranean, this purple dye was made from the mucus of certain sea snails. And here's the astonishing part: it took thousands of snails to produce just a tiny amount of dye — by some estimates, around ten thousand snails for a single gram. The process was slow, foul-smelling, and enormously labor-intensive. As a result, purple cloth became one of the most expensive substances in the world, worth more than its weight in gold.\n\nBecause it was so costly, purple became a symbol of wealth and power. Only emperors, kings, and the very rich could afford it. In the Roman Empire, laws were even passed restricting who was allowed to wear purple — at times, only the emperor himself. This is where we get the phrase "born to the purple," meaning born into royalty. The color's meaning came almost entirely from its scarcity, not from anything about the color itself.\n\nNow, here's the twist that I find fascinating. In eighteen fifty-six, a young British chemistry student named William Perkin was trying to make an anti-malaria drug, and he accidentally created the first synthetic purple dye. Suddenly, purple could be manufactured cheaply and in large quantities. Within a few decades, this once-royal color became available to ordinary people. And this is the deeper lesson: the value of purple was never really about the color. It was about how hard it was to get. Once technology removed that difficulty, the color lost its exclusive meaning. Scarcity, not beauty, had been doing the work all along.`,
      questions: [
        { type: 'mcq', id: 't1-l-at1', part: 8, text: 'What is the main topic of the lecture?', options: ['How to paint with purple', 'The history of the color purple and how scarcity shaped its value', 'The biology of sea snails', 'Roman fashion in general'], answer: 1 },
        { type: 'mcq', id: 't1-l-at2', part: 8, text: 'How was Tyrian purple dye made in the ancient world?', options: ['From tree bark', 'From flowers', 'From the mucus of certain sea snails, requiring thousands of snails for a tiny amount', 'From a rare mineral'], answer: 2 },
        { type: 'mcq', id: 't1-l-at3', part: 8, text: 'Why did purple become a symbol of wealth and power?', options: ['Because it was the emperor\'s favorite color', 'Because it never faded', 'Because it was easy to make', 'Because it was extremely costly and scarce, so only the rich could afford it'], answer: 3 },
        { type: 'mcq', id: 't1-l-at4', part: 8, text: 'What did William Perkin accidentally create in 1856?', options: ['The first synthetic purple dye', 'A new type of snail', 'A cheaper gold', 'A cure for malaria'], answer: 0 },
        { type: 'mcq', id: 't1-l-at5', part: 8, text: 'What is the "deeper lesson" the professor draws?', options: ['Purple is the most beautiful color.', 'The value of purple came from its scarcity, not the color itself; once it was easy to make, it lost its exclusive meaning.', 'Sea snails are endangered.', 'Synthetic dyes are always better.'], answer: 1 },
      ],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Build a Sentence',
      instructions: 'Put the words in the correct order to make a grammatical sentence.',
      questions: [
        { type: 'sentencebuild', id: 't1-w-bs1', part: 9, tiles: ['They', 'are', 'renovating', 'the old theatre', 'downtown'], answer: ['They', 'are', 'renovating', 'the old theatre', 'downtown'] },
        { type: 'sentencebuild', id: 't1-w-bs2', part: 9, tiles: ['the report', 'you', 'review', 'Could', 'before Friday'], answer: ['Could', 'you', 'review', 'the report', 'before Friday'] },
        { type: 'sentencebuild', id: 't1-w-bs3', part: 9, tiles: ['recommended', 'The book', 'you', 'was', 'fascinating'], answer: ['The book', 'you', 'recommended', 'was', 'fascinating'] },
        { type: 'sentencebuild', id: 't1-w-bs4', part: 9, tiles: ['finish,', 'you', 'When', 'me', 'call', 'please'], answer: ['When', 'you', 'finish,', 'please', 'call', 'me'] },
        { type: 'sentencebuild', id: 't1-w-bs5', part: 9, tiles: ['is', 'This city', 'my hometown', 'than', 'bigger', 'much'], answer: ['This city', 'is', 'much', 'bigger', 'than', 'my hometown'] },
        { type: 'sentencebuild', id: 't1-w-bs6', part: 9, tiles: ['the news,', 'Hearing', 'they', 'to celebrate', 'decided'], answer: ['Hearing', 'the news,', 'they', 'decided', 'to celebrate'] },
      ],
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't1-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You booked a hotel room for a weekend trip, but you now need to arrive a day earlier. You want to ask whether you can change your booking to include an extra night and how much more it will cost.\n\nWrite an email to the hotel.`,
          text: 'In your email: explain what you need, ask your questions clearly, and keep a polite tone. Write approximately 80–120 words.',
          minWords: 80 },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't1-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on technology and daily life. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Reed: Many people now use their phones to do almost everything — banking, shopping, studying, and staying in touch. Do you think our growing reliance on smartphones is mostly positive or mostly negative? Why?\n\nStudent (Hana): I think it's mostly positive. Smartphones save time, keep us connected, and put a huge amount of information and useful tools in one place.\n\nStudent (Diego): I'm more cautious. People spend hours staring at screens, get distracted easily, and can feel anxious without their phones. The convenience comes at a cost.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100 },
      ],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't1-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-1/repeat-1.mp3', targetSentence: 'The office is closed.' },
        { type: 'repeat', id: 't1-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-1/repeat-2.mp3', targetSentence: 'She made a cake for her brother\'s birthday.' },
        { type: 'repeat', id: 't1-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-1/repeat-3.mp3', targetSentence: 'The workers repaired the road after the heavy rain.' },
        { type: 'repeat', id: 't1-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-1/repeat-4.mp3', targetSentence: 'The professor announced that the deadline had been extended by one week.' },
        { type: 'repeat', id: 't1-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-1/repeat-5.mp3', targetSentence: 'Because the tickets had sold out quickly, the band agreed to perform a second concert.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't1-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: To begin, tell me about your favorite way to spend a free day. What do you do, and why do you enjoy it?' },
        { type: 'speak', id: 't1-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to study in the morning, while others prefer to study at night. Which do you prefer, and why? Give reasons and an example.' },
        { type: 'speak', id: 't1-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your university can spend money on either faster internet or more comfortable study spaces. Which would you recommend, and why? Explain how it would benefit students.' },
        { type: 'speak', id: 't1-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how might the way people learn new skills change over the next twenty years? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
