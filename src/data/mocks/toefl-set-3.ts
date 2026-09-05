import type { MockExam } from './types';
import { TOEFL_CTW_SET3_V2 } from '@/data/toefl/complete-the-words-sets-2-5';
import { TOEFL_READING_SET3_V2 } from '@/data/toefl/reading-sets-2-5';
import { TOEFL_BUILD_SENTENCE_SET3_V2 } from '@/data/toefl/build-sentence-sets-2-5';
import { toToeflBuildSentenceQuestion } from './toefl-build-sentence-adapter';
import { toToeflReadingQuestion } from './toefl-reading-adapter';

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
          type: 'wordcomplete', id: TOEFL_CTW_SET3_V2.id, part: 1, qRange: [1, 10],
          objectId: TOEFL_CTW_SET3_V2.objectId,
          contentVersion: String(TOEFL_CTW_SET3_V2.version),
          serverScoring: 'toefl-complete-words',
          alignment: 'official-family-pilot',
          instructions: TOEFL_CTW_SET3_V2.instructions,
          template: TOEFL_CTW_SET3_V2.template,
          blanks: TOEFL_CTW_SET3_V2.blanks.map((blank) => ({ ...blank })),
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
      instructions: TOEFL_READING_SET3_V2.academic.instructions,
      sectionNote: 'Las preguntas 1–5 forman Academic Passage. La selección múltiple final es práctica complementaria WeLearn.',
      passage: TOEFL_READING_SET3_V2.academic.text,
      passageTitle: TOEFL_READING_SET3_V2.academic.title,
      questions: TOEFL_READING_SET3_V2.academic.items.map((item) =>
        toToeflReadingQuestion(TOEFL_READING_SET3_V2.objectId, item, 4)),
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't3-l-cr1', part: 5, audioUrl: '/audio/toefl/set-3/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ["No, I usually cycle only on weekends.","The soup is still hot from the kitchen.","She left the building about an hour ago.","It's on the corner, opposite the bank."], answer: 3 },
        { type: 'mcq', id: 't3-l-cr2', part: 5, audioUrl: '/audio/toefl/set-3/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ["It stands about three meters above the floor.","Sure, I'll save you a copy of the handout.","The main gate is open until early evening.","Yes, she has worked as a nurse for years."], answer: 1 },
        { type: 'mcq', id: 't3-l-cr3', part: 5, audioUrl: '/audio/toefl/set-3/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ["It normally costs about eight dollars at the store.","You can find today's schedule at the front desk.","The tea should remain warm inside that container.","He is expected to arrive on Sunday afternoon."], answer: 1 },
        { type: 'mcq', id: 't3-l-cr4', part: 5, audioUrl: '/audio/toefl/set-3/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ["The bus arrived late at the final stop.","No, I have not seen it anywhere today.","It is made from a lightweight metal material.","Of course—I'll lend you my textbook for tomorrow's class."], answer: 3 },
        { type: 'mcq', id: 't3-l-cr5', part: 5, audioUrl: '/audio/toefl/set-3/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ["The shop is quite far from campus.","She teaches chemistry at the local college.","It is rather small for a lecture room.","Yes, I finally completed my research project!"], answer: 3 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between two students. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-3/conversation.mp3',
      transcript: `WOMAN: Are you going to apply for the summer research assistant position in the chemistry department?\n\nMAN: I saw it, but I'm not sure I'm qualified. It says they want someone with lab experience, and I've only done the standard course labs.\n\nWOMAN: Honestly, I think you should apply anyway. "Preferred experience" isn't the same as "required." And you did really well in organic chemistry last year — that counts for a lot.\n\nMAN: That's true. But there are probably lots of applicants who are further along than me.\n\nWOMAN: Maybe, but you won't know unless you try. The worst that happens is they say no, and you're no worse off than you are now. Besides, even writing the application is good practice, and it puts you on the professor's radar for next year.\n\nMAN: I hadn't thought of it that way. What do you think they're really looking for?\n\nWOMAN: From what I've heard, they care more about enthusiasm and reliability than about how much you already know. They'll train you on the specific techniques. So in your application, I'd focus on why you're genuinely interested and give examples of being careful and dependable.\n\nMAN: That's really helpful. Okay, I'll apply. Would you mind reading my application before I submit it?\n\nWOMAN: Of course. Send it over when it's ready and I'll give you some feedback.`,
      questions: [
        { type: 'mcq', id: 't3-l-cv1', part: 6, text: 'Why is the man unsure about applying?', options: ["He has decided that chemistry no longer interests him.","He doubts his qualifications because he lacks advanced lab experience.","He believes the deadline for submitting an application has passed.","He cannot fit the required hours into his current schedule."], answer: 1 },
        { type: 'mcq', id: 't3-l-cv2', part: 6, text: 'What does the woman point out about the job requirements?', options: ["The position offers experience but does not provide any payment.","The laboratory accepts only applicants with previous professional experience.","Preferred experience is not required, and his course grade matters.","The position is restricted to students who have already graduated."], answer: 2 },
        { type: 'mcq', id: 't3-l-cv3', part: 6, text: 'According to the woman, what do the professors care most about?', options: ["The applicant's age when the laboratory position begins","The number of weekly hours each applicant can work","The amount of technical knowledge each applicant already possesses","Enthusiasm and reliability, because assistants receive technical training"], answer: 3 },
        { type: 'mcq', id: 't3-l-cv4', part: 6, text: 'What does the man ask the woman to do?', options: ["Review his application before he sends it","Submit the completed application on his behalf","Speak directly with the professor about the opening","Write the entire application letter for him"], answer: 0 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-3/announcement.mp3',
      transcript: `Attention, please. This is an announcement for all users of the university computer labs. Over the next two weeks, we will be upgrading the software on all lab computers to the latest versions, which will improve performance and security. The upgrades will happen overnight, so the labs will be fully available during the day as usual.\n\nHowever, there are two things to be aware of. First, please save all your work to your personal cloud storage or a USB drive before leaving each day. Any files saved directly on the lab computers may be deleted during the upgrade, and we cannot recover them. Second, some specialized programs used in engineering and design courses will look slightly different after the update, though they will work the same way. Short guides to the new versions will be posted next to each workstation. If you have any problems, the IT help desk on the ground floor is open from nine to five. Thank you for your cooperation.`,
      questions: [
        { type: 'mcq', id: 't3-l-an1', part: 7, text: 'What is the announcement about?', options: ["The temporary closure of a campus computer laboratory","A software upgrade planned for every laboratory computer","The opening of a new computer laboratory on campus","A change to the regular operating hours of the laboratory"], answer: 1 },
        { type: 'mcq', id: 't3-l-an2', part: 7, text: 'What are students told to do to protect their work?', options: ["Leave all files on the laboratory computers overnight","Print every document before the laboratory closes each day","Save all work externally before leaving each day","Send every file by email to the technical support office"], answer: 2 },
        { type: 'mcq', id: 't3-l-an3', part: 7, text: 'What is said about the specialized programs?', options: ['They will be removed.', 'They will be much slower.', 'They will stop working.', 'They will look slightly different but work the same way.'], answer: 3 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-3/academic-talk.mp3',
      transcript: `PROFESSOR: Today I want to talk about one of the most important and least appreciated organisms on the planet: plankton. The word "plankton" comes from a Greek word meaning "drifter," because these tiny organisms drift with the ocean currents, unable to swim against them. They range from microscopic plants to small animals, and though individually they are tiny, collectively they have a planet-shaping influence.\n\nLet's start with the plant-like plankton, called phytoplankton. Like plants on land, they perform photosynthesis, using sunlight to make energy and, crucially, releasing oxygen. Here's a fact that surprises most people: phytoplankton in the ocean produce roughly half of all the oxygen in Earth's atmosphere. So with every second breath you take, you have these invisible ocean drifters to thank, not the forests we usually picture.\n\nPhytoplankton are also the foundation of nearly the entire ocean food web. Small animals called zooplankton eat the phytoplankton; small fish eat the zooplankton; larger fish eat the small fish; and so on up to whales and the fish we catch for food. Almost all life in the ocean depends, directly or indirectly, on these tiny drifting organisms. If phytoplankton were to decline sharply, the effects would ripple through the entire ocean and beyond.\n\nAnd that brings me to why scientists watch plankton so closely. Because they are so sensitive to conditions like water temperature and chemistry, plankton populations act as an early warning system for the health of the oceans. Changes in plankton can signal larger environmental shifts, including those linked to climate change. Some studies have raised concerns that warming oceans may be affecting plankton in ways we don't fully understand yet. So these humble drifters are not only vital to life on Earth — they are also one of the key indicators scientists use to take the ocean's pulse. Never underestimate the small.`,
      questions: [
        { type: 'mcq', id: 't3-l-at1', part: 8, text: 'What does the word "plankton" mean, and why?', options: ["‘Drifter,’ because they move with the ocean currents","‘Giant,’ because they can grow to an enormous size","‘Plant,’ because every species belongs to the plant kingdom","‘Swimmer,’ because they travel quickly through open water"], answer: 0 },
        { type: 'mcq', id: 't3-l-at2', part: 8, text: 'What surprising fact does the professor share about phytoplankton?', options: ["They remove nearly all oxygen from the surrounding water.","They produce about half of Earth's atmospheric oxygen.","They survive exclusively in rivers and other fresh water.","They consume larger fish near the surface of the ocean."], answer: 1 },
        { type: 'mcq', id: 't3-l-at3', part: 8, text: 'What role do phytoplankton play in the ocean food web?', options: ["They provide food only for the largest species of whales.","They function as the main predators throughout marine ecosystems.","Most ocean life depends on them directly or indirectly.","They have almost no influence on marine food networks."], answer: 2 },
        { type: 'mcq', id: 't3-l-at4', part: 8, text: 'Why do scientists watch plankton closely?', options: ["They have a high commercial value in international markets.","They can create dangerous conditions for swimmers near shore.","They are easy for scientists to collect in large numbers.","They respond quickly to changes in ocean conditions."], answer: 3 },
        { type: 'mcq', id: 't3-l-at5', part: 8, text: 'What is the professor\'s overall message?', options: ['These tiny "drifters" are vital to life on Earth and a key indicator of ocean health — never underestimate the small.', 'Forests produce all our oxygen.', 'Plankton harm the ocean.', 'Plankton are unimportant.'], answer: 0 },
      ],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Build a Sentence',
      instructions: 'Read the first speaker. Arrange the fragments to make a grammatical and contextually appropriate reply. One fragment is not used.',
      sectionNote: TOEFL_BUILD_SENTENCE_SET3_V2.interactionDisclosure,
      questions: TOEFL_BUILD_SENTENCE_SET3_V2.items.map((item) =>
        toToeflBuildSentenceQuestion(TOEFL_BUILD_SENTENCE_SET3_V2.objectId, item, 9)),
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't3-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You attended a training course, but you did not receive the certificate you were promised at the end. You want to ask when you will receive it and how it will be sent.\n\nWrite an email to the course administrator.`,
          text: 'In your email: explain the situation, ask your questions clearly, and keep a polite tone. Write as much as you can in complete sentences.',
          minWords: 0, timeLimitSeconds: 420, minimumWordsPolicy: 'none-published', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't3-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on the environment. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Haruki: Some people believe that protecting the environment is mainly the responsibility of governments, while others believe individuals must change their own behavior. Which do you think matters more, and why?\n\nStudent (Lucia): I think individual action matters most. If millions of people reduce waste, save energy, and use less water, the combined effect is huge. For example, when my neighborhood started a recycling initiative, participation grew simply because people saw their neighbors doing it.\n\nStudent (Ben): I disagree. Individuals can only do so much; real change requires governments to pass laws and control big polluters. For example, no amount of individual recycling can offset the emissions of a single large factory that ignores environmental regulations.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100, timeLimitSeconds: 600, minimumWordsPolicy: 'recommended-100', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
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
