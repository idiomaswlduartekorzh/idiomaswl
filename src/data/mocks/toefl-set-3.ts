import type { MockExam } from './types';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Migrado del formato antiguo (era stub Writing-only) al formato 2026 completo. Audios bajo /audio/toefl/set-3/.

const mock: MockExam = {
  id: 'set-3',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 3 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Reading — Complete the Words',
      instructions: 'Complete each word so the text makes sense. Some letters are given.',
      questions: [
        {
          type: 'wordcomplete', id: 't3-r-cw1', part: 1, qRange: [1, 6],
          instructions: 'A student is writing to a language school.',
          template: `Dear Sir or Madam,\n\nI am interested in taking a Spanish {{1}} at your school this summer. I am a complete {{2}} and have never studied the language before. Could you tell me how many {{3}} there are each week and how long the {{4}} lasts? I would also like to know the {{5}} of the course and whether textbooks are {{6}} in the price.\n\nThank you,\nHelen`,
          blanks: [
            { num: 1, prefix: 'cou', answer: 'course' },
            { num: 2, prefix: 'beg', answer: 'beginner' },
            { num: 3, prefix: 'les', answer: 'lessons' },
            { num: 4, prefix: 'ter', answer: 'term' },
            { num: 5, prefix: 'co', answer: 'cost' },
            { num: 6, prefix: 'inc', answer: 'included' },
          ],
        },
        {
          type: 'wordcomplete', id: 't3-r-cw2', part: 1, qRange: [7, 12],
          instructions: 'The following is from an article about the brain.',
          template: `The human brain is one of the most complex {{1}} in the known universe. It contains billions of nerve cells, or {{2}}, that send signals to one another. These signals allow us to think, feel, move, and {{3}} information. The brain also controls processes we are not aware of, such as our {{4}} and heartbeat. Scientists still do not fully {{5}} how the brain produces thoughts and consciousness, making it one of the great {{6}} of science.`,
          blanks: [
            { num: 1, prefix: 'org', answer: 'organs' },
            { num: 2, prefix: 'neu', answer: 'neurons' },
            { num: 3, prefix: 'rem', answer: 'remember' },
            { num: 4, prefix: 'brea', answer: 'breathing' },
            { num: 5, prefix: 'und', answer: 'understand' },
            { num: 6, prefix: 'mys', answer: 'mysteries' },
          ],
        },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Post office notice)',
      instructions: 'Read the notice and answer the questions.',
      passage: `CENTRAL POST OFFICE — CUSTOMER NOTICE\n\n• Opening hours: Monday–Friday, 9:00 a.m. – 5:30 p.m.; Saturday, 9:00 a.m. – 12:30 p.m. Closed Sundays.\n• For parcels over 2 kg, please use the counter, not the machines.\n• Registered post requires ID and a signature.\n• Passport applications are handled at Counter 4 only; please take a ticket.\n• A stamp machine is available in the lobby outside opening hours.`,
      passageTitle: 'Post office notice',
      questions: [
        { type: 'mcq', id: 't3-r-dl1', part: 2, text: 'When does the post office close on Saturdays?', options: ['It is closed on Saturdays.', '5:30 p.m.', '12:30 p.m.', '9:00 a.m.'], answer: 2 },
        { type: 'mcq', id: 't3-r-dl2', part: 2, text: 'What should a customer do with a parcel over 2 kg?', options: ['Leave it in the lobby', 'Take it home', 'Use the machines', 'Use the counter'], answer: 3 },
        { type: 'mcq', id: 't3-r-dl3', part: 2, text: 'Where are passport applications handled?', options: ['Counter 4 only', 'The lobby', 'The machines', 'Any counter'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Booking email)',
      instructions: 'Read the email and answer the questions.',
      passage: `From: Lakeside Cabins\nTo: Ravi Sharma\nSubject: Your cabin booking\n\nDear Ravi,\n\nThank you for booking Cabin 5 for two nights, from August 8 to August 10. Check-in is from 3:00 p.m. and check-out is by 10:00 a.m.\n\nThe cabin has a fully equipped kitchen, so you may wish to bring your own food; the nearest shop is a fifteen-minute drive away. Firewood for the stove is provided. Please note there is no mobile phone signal at the site, but free Wi-Fi is available in the main reception building. We look forward to welcoming you.`,
      passageTitle: 'Booking email',
      questions: [
        { type: 'mcq', id: 't3-r-dl4', part: 3, text: 'Why might Ravi want to bring his own food?', options: ['The cabin has no kitchen.', 'The nearest shop is a fifteen-minute drive away.', 'Food is very expensive nearby.', 'The cabin does not allow cooking.'], answer: 1 },
        { type: 'mcq', id: 't3-r-dl5', part: 3, text: 'Where is Wi-Fi available?', options: ['Only outdoors', 'In every cabin', 'In the main reception building', 'Nowhere on the site'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Reading — Read an Academic Passage',
      instructions: 'Read the passage and answer questions.',
      passage: `Among the many remarkable abilities of the animal kingdom, few are as striking as echolocation—the use of sound to "see" the world. Animals that echolocate, most famously bats and dolphins, emit sounds and then listen to the echoes that bounce back from objects around them. From these echoes, they construct a detailed picture of their surroundings, allowing them to navigate and hunt even in complete darkness or murky water.\n\nThe basic principle is elegant. An echolocating animal produces a sound—often a high-pitched click or call—that travels outward until it strikes an object and reflects back. By measuring the time it takes for the echo to return, the animal can judge how far away the object is: a quick echo means a nearby object, a delayed echo a distant one. The direction of the returning sound reveals the object's location, and subtle features of the echo can reveal an object's size, shape, and even texture.\n\nWhat is astonishing is the precision this system can achieve. Bats hunting insects can detect a target as fine as a human hair in total darkness, adjusting their flight in a fraction of a second. Dolphins can use echolocation to distinguish between objects of slightly different materials, and even to detect fish hidden beneath the sand of the seafloor. To process this flood of acoustic information, these animals have highly specialized brains, and much of their neural machinery is devoted to interpreting sound.\n\nEcholocation is a beautiful example of "convergent evolution"—the process by which unrelated species independently evolve similar solutions to similar problems. Bats and dolphins are not closely related; one is a flying mammal and the other lives in the sea. Yet both faced the challenge of sensing their environment where vision fails, and both arrived at strikingly similar solutions. Studying these systems has also inspired human technology: sonar, used by ships and submarines, and even navigation aids for people who are blind, draw on the same fundamental principle that evolution discovered long before us.`,
      passageTitle: 'Echolocation',
      questions: [
        { type: 'mcq', id: 't3-r-ap1', part: 4, text: 'What is echolocation?', options: ['A way of smelling prey', 'A method of flying', 'The use of light to see', 'The use of sound and its echoes to perceive surroundings'], answer: 3 },
        { type: 'mcq', id: 't3-r-ap2', part: 4, text: 'How does an echolocating animal judge how far away an object is?', options: ['By measuring the time it takes for the echo to return', 'By its smell', 'By touching it', 'By its color'], answer: 0 },
        { type: 'mcq', id: 't3-r-ap3', part: 4, text: 'What example shows the precision of bat echolocation?', options: ['Bats can fly during the day.', 'Bats can detect a target as fine as a human hair in total darkness.', 'Bats can sing loudly.', 'Bats never miss their prey.'], answer: 1 },
        { type: 'mcq', id: 't3-r-ap4', part: 4, text: 'What is "convergent evolution," as illustrated by bats and dolphins?', options: ['Species that always live together', 'Two species becoming one', 'Unrelated species independently evolving similar solutions to similar problems', 'Animals losing an ability'], answer: 2 },
        { type: 'mcq', id: 't3-r-ap5', part: 4, text: 'How has echolocation inspired human technology?', options: ['It led to the invention of light bulbs.', 'It made radios possible.', 'It has not.', 'It inspired sonar and navigation aids for blind people, based on the same principle.'], answer: 3 },
        { type: 'multiselect', id: 't3-r-ap6', part: 4, qRange: [6, 6], text: 'Select the TWO statements supported by the passage.', options: [
          { letter: 'A', text: 'Bats and dolphins both use echolocation despite not being closely related.' },
          { letter: 'B', text: 'Echolocation relies on light rather than sound.' },
          { letter: 'C', text: 'The time an echo takes to return helps an animal judge distance.' },
          { letter: 'D', text: 'Echolocating animals have simple brains with little sound processing.' },
        ], selectCount: 2, answers: ['A', 'C'] },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't3-l-cr1', part: 5, audioUrl: '/audio/toefl/set-3/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ['No, I don\'t like cycling.', 'The soup is hot.', 'She left an hour ago.', 'It\'s on the corner, opposite the bank.'], answer: 3 },
        { type: 'mcq', id: 't3-l-cr2', part: 5, audioUrl: '/audio/toefl/set-3/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ['It is three meters tall.', 'Sure, I\'ll save you a copy of the handout.', 'The gate is open.', 'Yes, she is a nurse.'], answer: 1 },
        { type: 'mcq', id: 't3-l-cr3', part: 5, audioUrl: '/audio/toefl/set-3/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ['It costs eight dollars.', 'You can find the schedule at the front desk.', 'The tea is warm.', 'He arrives on Sunday.'], answer: 1 },
        { type: 'mcq', id: 't3-l-cr4', part: 5, audioUrl: '/audio/toefl/set-3/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ['The bus was late.', 'No, I have not seen it.', 'It is made of metal.', 'Of course — I\'ll lend you my textbook.'], answer: 3 },
        { type: 'mcq', id: 't3-l-cr5', part: 5, audioUrl: '/audio/toefl/set-3/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ['The shop is far.', 'She teaches chemistry.', 'It is quite small.', 'Yes, I finally finished my project!'], answer: 3 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between two students. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-3/conversation.mp3',
      transcript: `WOMAN: Are you going to apply for the summer research assistant position in the chemistry department?\n\nMAN: I saw it, but I'm not sure I'm qualified. It says they want someone with lab experience, and I've only done the standard course labs.\n\nWOMAN: Honestly, I think you should apply anyway. "Preferred experience" isn't the same as "required." And you did really well in organic chemistry last year — that counts for a lot.\n\nMAN: That's true. But there are probably lots of applicants who are further along than me.\n\nWOMAN: Maybe, but you won't know unless you try. The worst that happens is they say no, and you're no worse off than you are now. Besides, even writing the application is good practice, and it puts you on the professor's radar for next year.\n\nMAN: I hadn't thought of it that way. What do you think they're really looking for?\n\nWOMAN: From what I've heard, they care more about enthusiasm and reliability than about how much you already know. They'll train you on the specific techniques. So in your application, I'd focus on why you're genuinely interested and give examples of being careful and dependable.\n\nMAN: That's really helpful. Okay, I'll apply. Would you mind reading my application before I submit it?\n\nWOMAN: Of course. Send it over when it's ready and I'll give you some feedback.`,
      questions: [
        { type: 'mcq', id: 't3-l-cv1', part: 6, text: 'Why is the man unsure about applying?', options: ['He has no interest in chemistry.', 'He thinks he is not qualified because he only has standard course lab experience.', 'The deadline has passed.', 'He is too busy.'], answer: 1 },
        { type: 'mcq', id: 't3-l-cv2', part: 6, text: 'What does the woman point out about the job requirements?', options: ['The job pays nothing.', 'Experience is strictly required.', '"Preferred experience" is not the same as "required," and his good grade counts for a lot.', 'The job is only for graduates.'], answer: 2 },
        { type: 'mcq', id: 't3-l-cv3', part: 6, text: 'According to the woman, what do the professors care most about?', options: ['The applicant\'s age', 'How many hours the applicant can work', 'How much the applicant already knows', 'Enthusiasm and reliability, since they will train the assistant on specific techniques'], answer: 3 },
        { type: 'mcq', id: 't3-l-cv4', part: 6, text: 'What does the man ask the woman to do?', options: ['Read his application before he submits it', 'Apply on his behalf', 'Talk to the professor', 'Write the application for him'], answer: 0 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-3/announcement.mp3',
      transcript: `Attention, please. This is an announcement for all users of the university computer labs. Over the next two weeks, we will be upgrading the software on all lab computers to the latest versions, which will improve performance and security. The upgrades will happen overnight, so the labs will be fully available during the day as usual.\n\nHowever, there are two things to be aware of. First, please save all your work to your personal cloud storage or a USB drive before leaving each day. Any files saved directly on the lab computers may be deleted during the upgrade, and we cannot recover them. Second, some specialized programs used in engineering and design courses will look slightly different after the update, though they will work the same way. Short guides to the new versions will be posted next to each workstation. If you have any problems, the IT help desk on the ground floor is open from nine to five. Thank you for your cooperation.`,
      questions: [
        { type: 'mcq', id: 't3-l-an1', part: 7, text: 'What is the announcement about?', options: ['A computer lab closing', 'A software upgrade on all lab computers', 'A new lab opening', 'A change in lab hours'], answer: 1 },
        { type: 'mcq', id: 't3-l-an2', part: 7, text: 'What are students told to do to protect their work?', options: ['Nothing is needed.', 'Print everything', 'Save all work to cloud storage or a USB drive before leaving each day', 'Email files to the IT desk'], answer: 2 },
        { type: 'mcq', id: 't3-l-an3', part: 7, text: 'What is said about the specialized programs?', options: ['They will be removed.', 'They will be much slower.', 'They will stop working.', 'They will look slightly different but work the same way.'], answer: 3 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-3/academic-talk.mp3',
      transcript: `PROFESSOR: Today I want to talk about one of the most important and least appreciated organisms on the planet: plankton. The word "plankton" comes from a Greek word meaning "drifter," because these tiny organisms drift with the ocean currents, unable to swim against them. They range from microscopic plants to small animals, and though individually they are tiny, collectively they have a planet-shaping influence.\n\nLet's start with the plant-like plankton, called phytoplankton. Like plants on land, they perform photosynthesis, using sunlight to make energy and, crucially, releasing oxygen. Here's a fact that surprises most people: phytoplankton in the ocean produce roughly half of all the oxygen in Earth's atmosphere. So with every second breath you take, you have these invisible ocean drifters to thank, not the forests we usually picture.\n\nPhytoplankton are also the foundation of nearly the entire ocean food web. Small animals called zooplankton eat the phytoplankton; small fish eat the zooplankton; larger fish eat the small fish; and so on up to whales and the fish we catch for food. Almost all life in the ocean depends, directly or indirectly, on these tiny drifting organisms. If phytoplankton were to decline sharply, the effects would ripple through the entire ocean and beyond.\n\nAnd that brings me to why scientists watch plankton so closely. Because they are so sensitive to conditions like water temperature and chemistry, plankton populations act as an early warning system for the health of the oceans. Changes in plankton can signal larger environmental shifts, including those linked to climate change. Some studies have raised concerns that warming oceans may be affecting plankton in ways we don't fully understand yet. So these humble drifters are not only vital to life on Earth — they are also one of the key indicators scientists use to take the ocean's pulse. Never underestimate the small.`,
      questions: [
        { type: 'mcq', id: 't3-l-at1', part: 8, text: 'What does the word "plankton" mean, and why?', options: ['"Drifter," because they drift with ocean currents', '"Giant," because they are large', '"Plant," because they are all plants', '"Swimmer," because they swim fast'], answer: 0 },
        { type: 'mcq', id: 't3-l-at2', part: 8, text: 'What surprising fact does the professor share about phytoplankton?', options: ['They produce no oxygen.', 'They produce roughly half of all the oxygen in Earth\'s atmosphere.', 'They live only in rivers.', 'They eat larger fish.'], answer: 1 },
        { type: 'mcq', id: 't3-l-at3', part: 8, text: 'What role do phytoplankton play in the ocean food web?', options: ['They only feed whales.', 'They are the top predators.', 'They are the foundation, since almost all ocean life depends on them directly or indirectly.', 'They have no role.'], answer: 2 },
        { type: 'mcq', id: 't3-l-at4', part: 8, text: 'Why do scientists watch plankton closely?', options: ['They are valuable to sell.', 'They are dangerous.', 'They are easy to catch.', 'Because they are sensitive to conditions and act as an early warning system for ocean health.'], answer: 3 },
        { type: 'mcq', id: 't3-l-at5', part: 8, text: 'What is the professor\'s overall message?', options: ['These tiny "drifters" are vital to life on Earth and a key indicator of ocean health — never underestimate the small.', 'Forests produce all our oxygen.', 'Plankton harm the ocean.', 'Plankton are unimportant.'], answer: 0 },
      ],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Build a Sentence',
      instructions: 'Put the words in the correct order to make a grammatical sentence.',
      questions: [
        { type: 'sentencebuild', id: 't3-w-bs1', part: 9, tiles: ['We', 'are', 'hosting', 'a dinner', 'on Saturday'], answer: ['We', 'are', 'hosting', 'a dinner', 'on Saturday'] },
        { type: 'sentencebuild', id: 't3-w-bs2', part: 9, tiles: ['the door', 'you', 'unlock', 'Could', 'for me'], answer: ['Could', 'you', 'unlock', 'the door', 'for me'] },
        { type: 'sentencebuild', id: 't3-w-bs3', part: 9, tiles: ['suggested', 'The route', 'you', 'was', 'much faster'], answer: ['The route', 'you', 'suggested', 'was', 'much faster'] },
        { type: 'sentencebuild', id: 't3-w-bs4', part: 9, tiles: ['stops,', 'the music', 'When', 'we\'ll', 'go home'], answer: ['When', 'the music', 'stops,', 'we\'ll', 'go home'] },
        { type: 'sentencebuild', id: 't3-w-bs5', part: 9, tiles: ['is', 'This job', 'my last one', 'than', 'harder'], answer: ['This job', 'is', 'harder', 'than', 'my last one'] },
        { type: 'sentencebuild', id: 't3-w-bs6', part: 9, tiles: ['the letter,', 'Reading', 'he', 'the phone', 'reached for'], answer: ['Reading', 'the letter,', 'he', 'reached for', 'the phone'] },
      ],
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't3-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You attended a training course, but you did not receive the certificate you were promised at the end. You want to ask when you will receive it and how it will be sent.\n\nWrite an email to the course administrator.`,
          text: 'In your email: explain the situation, ask your questions clearly, and keep a polite tone. Write approximately 80–120 words.',
          minWords: 80 },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't3-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on the environment. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Haruki: Some people believe that protecting the environment is mainly the responsibility of governments, while others believe individuals must change their own behavior. Which do you think matters more, and why?\n\nStudent (Lucia): I think individual action matters most. If millions of people reduce waste, save energy, and use less water, the combined effect is huge. For example, when my neighborhood started a recycling initiative, participation grew simply because people saw their neighbors doing it.\n\nStudent (Ben): I disagree. Individuals can only do so much; real change requires governments to pass laws and control big polluters. For example, no amount of individual recycling can offset the emissions of a single large factory that ignores environmental regulations.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100 },
      ],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't3-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-3/repeat-1.mp3', targetSentence: 'The store closes at six.' },
        { type: 'repeat', id: 't3-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-3/repeat-2.mp3', targetSentence: 'She fed the cat and opened the curtains.' },
        { type: 'repeat', id: 't3-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-3/repeat-3.mp3', targetSentence: 'The players trained hard for the upcoming championship.' },
        { type: 'repeat', id: 't3-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-3/repeat-4.mp3', targetSentence: 'The scientist explained that the results would take several weeks to confirm.' },
        { type: 'repeat', id: 't3-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-3/repeat-5.mp3', targetSentence: 'When the museum introduced free entry on Sundays, the number of visitors increased dramatically.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't3-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: To begin, describe a skill you already have that you are good at. What is it, and how did you learn it?' },
        { type: 'speak', id: 't3-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to take notes by hand, while others prefer to type on a computer. Which do you prefer, and why? Give reasons and an example.' },
        { type: 'speak', id: 't3-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your city can spend money on either planting more trees or installing more public benches and seating. Which would you recommend, and why? Explain how it would benefit residents.' },
        { type: 'speak', id: 't3-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how might the way people exercise and stay healthy change over the next twenty years? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
