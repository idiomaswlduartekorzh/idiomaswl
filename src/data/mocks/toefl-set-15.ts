import type { MockExam } from './types';
import { TOEFL_CTW_SET15_V2 } from '@/data/toefl/complete-the-words-sets-11-15';
import { toToeflCompleteWordsQuestion } from './toefl-complete-words-adapter';
import { TOEFL_READING_SET15_V2 } from '@/data/toefl/reading-sets-11-15';
import { toToeflReadingQuestion } from './toefl-reading-adapter';
import { TOEFL_BUILD_SENTENCE_SET15_V2 } from '@/data/toefl/build-sentence-sets-11-15';
import { toToeflBuildSentenceQuestion } from './toefl-build-sentence-adapter';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Audios bajo /audio/toefl/set-15/ — pendientes (ver checklist de medios).

const mock: MockExam = {
  id: 'set-15',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 15 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1,
      skill: 'reading',
      title: 'Reading — Complete the Words',
      instructions: 'Complete each word so the text makes sense. Some letters are given.',
      questions: [toToeflCompleteWordsQuestion(TOEFL_CTW_SET15_V2, 1)],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Swimming pool rules)',
      instructions: 'Read the notice and answer the questions.',
      passage: `COMMUNITY SWIMMING POOL — RULES\n\n• Children under 8 must be accompanied by an adult at all times.\n• Please shower before entering the pool.\n• No diving in the shallow end (marked in red).\n• Swimming caps are required in the main pool.\n• The pool is reserved for swimming lessons on weekday mornings from 9:00 to 11:00 a.m.; public swimming resumes at 11:00 a.m.\n\nFor everyone's safety, please follow the lifeguards' instructions at all times.`,
      passageTitle: 'Pool rules',
      questions: [
        { type: 'mcq', id: 't15-r-dl1', part: 2, text: 'What is required in the main pool?', options: ['A towel', 'A swimming cap', 'Goggles', 'Flippers'], answer: 1 },
        { type: 'mcq', id: 't15-r-dl2', part: 2, text: 'When does public swimming resume on weekday mornings?', options: ['Public swimming is not allowed.', 'At 9:00 a.m.', 'At 11:00 a.m.', 'At noon'], answer: 2 },
        { type: 'mcq', id: 't15-r-dl3', part: 2, text: 'What is the rule for children under 8?', options: ['They may swim only in the deep end.', 'They must take lessons.', 'They cannot enter the pool.', 'They must be accompanied by an adult at all times.'], answer: 3 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Work email)',
      instructions: 'Read the email and answer the questions.',
      passage: `From: Team Leader\nTo: Project Team\nSubject: Monday meeting moved\n\nHi everyone,\n\nQuick update: our weekly project meeting on Monday is being moved from 10:00 a.m. to 2:00 p.m. because the meeting room is being used for a training session in the morning.\n\nPlease bring a short update on your part of the project — no more than five minutes each. If you cannot attend in person, you can join by video call using the usual link. If you have anything you'd like added to the agenda, send it to me by Friday afternoon.\n\nThanks,\nDana`,
      passageTitle: 'Work email',
      questions: [
        { type: 'mcq', id: 't15-r-dl4', part: 3, text: 'Why is the meeting being moved?', options: ['Because the meeting room is used for training in the morning', 'Because there is no work to discuss and the entire team has completed every current project', 'Because of a public holiday', 'Because the team leader is away'], answer: 0 },
        { type: 'mcq', id: 't15-r-dl5', part: 3, text: 'What should team members send by Friday afternoon?', options: ['Their finished projects together with a complete written report on all work from the previous month', 'Any items they want added to the agenda', 'A payment', 'Their holiday requests'], answer: 1 },
      ],
    },
    {
      part: 4,
      skill: 'reading',
      title: 'Reading — Read an Academic Passage',
      instructions: TOEFL_READING_SET15_V2.academic.instructions,
      sectionNote: 'Las preguntas 1–5 reproducen familias oficiales de selección única. La pregunta 6 es práctica complementaria WeLearn.',
      passage: TOEFL_READING_SET15_V2.academic.text,
      passageTitle: TOEFL_READING_SET15_V2.academic.title,
      questions: TOEFL_READING_SET15_V2.academic.items.map((item) =>
        toToeflReadingQuestion(TOEFL_READING_SET15_V2.objectId, item, 4)),
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't15-l-cr1', part: 5, audioUrl: '/audio/toefl/set-15/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ['The soup is ready.', 'She left early.', 'It\'s on the shelf behind the counter.', 'No, I don\'t like painting.'], answer: 2 },
        { type: 'mcq', id: 't15-l-cr2', part: 5, audioUrl: '/audio/toefl/set-15/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ['Sure, I\'ll pick you up at eight.', 'The window is broken.', 'Yes, she is a dentist.', 'It is seven meters wide.'], answer: 0 },
        { type: 'mcq', id: 't15-l-cr3', part: 5, audioUrl: '/audio/toefl/set-15/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ['The details are on the department website.', 'The bread is fresh.', 'He arrives on Monday.', 'It costs four dollars.'], answer: 0 },
        { type: 'mcq', id: 't15-l-cr4', part: 5, audioUrl: '/audio/toefl/set-15/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ['No, I have not read it.', 'It is made of glass.', 'Of course — I\'ll bring an extra one for you.', 'The bus was late.'], answer: 2 },
        { type: 'mcq', id: 't15-l-cr5', part: 5, audioUrl: '/audio/toefl/set-15/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ['She teaches physics.', 'It is quite far.', 'Yes, we won the competition!', 'The shop is closed.'], answer: 2 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between two students. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-15/conversation.mp3',
      transcript: `WOMAN: You look stressed. Everything okay?\n\nMAN: Not really. I have three assignments due next week and a group project, and I feel like I'm drowning. I don't even know where to start.\n\nWOMAN: I've been there. Have you tried making a list and prioritizing? When I feel overwhelmed, I write down everything I have to do and then rank it by deadline and importance.\n\nMAN: I usually just try to do everything at once, and then I end up doing nothing well.\n\nWOMAN: That's exactly the trap. The thing that helped me most was breaking big tasks into smaller steps. Instead of "write essay," I put "make an outline," "find three sources," "write introduction." Each small step feels doable, and you get momentum.\n\nMAN: That does sound less scary than staring at a blank page.\n\nWOMAN: Right. And for the group project, talk to your team as soon as possible and divide the work. Don't wait — that's where a lot of stress comes from, when everyone leaves it until the last minute.\n\nMAN: Good point. I think I've been avoiding messaging them because it felt like one more thing to do.\n\nWOMAN: Do it today. Honestly, once the work is organized and shared out, half the stress disappears. It's the feeling of chaos that's the worst part, not the work itself.`,
      questions: [
        { type: 'mcq', id: 't15-l-cv1', part: 6, text: 'Why is the man stressed?', options: ['He has several assignments and a group project due soon.', 'He lost his laptop.', 'He is moving apartments.', 'He failed an exam.'], answer: 0 },
        { type: 'mcq', id: 't15-l-cv2', part: 6, text: 'What is the man\'s current approach to his work?', options: ['He makes a prioritized list.', 'He tries to do everything at once and ends up doing nothing well.', 'He ignores the work.', 'He asks the professor for extensions.'], answer: 1 },
        { type: 'mcq', id: 't15-l-cv3', part: 6, text: 'What technique does the woman say helped her most?', options: ['Studying with music', 'Working through the night', 'Breaking big tasks into smaller steps', 'Skipping assignments'], answer: 2 },
        { type: 'mcq', id: 't15-l-cv4', part: 6, text: 'What does the woman advise about the group project?', options: ['To ask for an extension', 'To wait until the last minute', 'To do it alone', 'To talk to the team soon and divide the work'], answer: 3 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-15/announcement.mp3',
      transcript: `Good afternoon, students. This is an announcement from the science department about the upcoming science fair. The fair will take place in two weeks, on Saturday the twenty-second, in the main hall from ten a.m. to four p.m. All students are invited to enter a project, either individually or in teams of up to three.\n\nIf you wish to take part, you must submit a one-page project proposal to your science teacher by this Friday. This should describe your question, your method, and the materials you'll need. The department has a small budget to help with materials, so please indicate if you need support. Prizes will be awarded in several categories, and the winning projects will represent our school at the regional competition next month. If you have questions, come to the information session on Wednesday at lunchtime in Room 12.`,
      questions: [
        { type: 'mcq', id: 't15-l-an1', part: 7, text: 'What is the announcement about?', options: ['An upcoming science fair', 'A change in the timetable', 'A school trip', 'A sports day'], answer: 0 },
        { type: 'mcq', id: 't15-l-an2', part: 7, text: 'What must students submit by Friday if they want to take part?', options: ['A completed project', 'A one-page project proposal', 'A payment', 'A photograph'], answer: 1 },
        { type: 'mcq', id: 't15-l-an3', part: 7, text: 'What will happen to the winning projects?', options: ['Nothing special.', 'They will be sold.', 'They will represent the school at the regional competition.', 'They will be displayed for a year.'], answer: 2 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-15/academic-talk.mp3',
      transcript: `PROFESSOR: Today I want to discuss a concept that transformed our understanding of the ocean: the deep-sea hydrothermal vent. Until the late nineteen-seventies, scientists believed that all life ultimately depended on sunlight. Plants capture sunlight through photosynthesis, animals eat plants, and so on up the food chain. The deep ocean floor, far below where any light penetrates, was assumed to be almost lifeless — a cold, dark desert.\n\nThen, in nineteen seventy-seven, scientists exploring the sea floor near the Galápagos Islands made a stunning discovery. Around cracks in the ocean floor, where superheated, mineral-rich water gushed out from beneath the Earth's crust, they found thriving communities of life: giant tube worms, clams, crabs, and more, packed densely in the darkness. This was a profound puzzle. With no sunlight, how could such an abundance of life exist?\n\nThe answer revolutionized biology. The base of this ecosystem is not plants but bacteria that perform what we call chemosynthesis. Instead of using sunlight, these bacteria draw energy from chemicals — particularly hydrogen sulfide — dissolved in the vent water. They convert this chemical energy into food, just as plants convert sunlight. Everything else in the vent community depends, directly or indirectly, on these chemosynthetic bacteria.\n\nWhy does this matter beyond the ocean floor? For one, it dramatically expanded our sense of where life can survive. If life can thrive on chemical energy in total darkness under crushing pressure, then perhaps life could exist in similarly extreme environments elsewhere — including on other worlds, such as beneath the icy surface of some of Jupiter's and Saturn's moons, where oceans may exist. The discovery of hydrothermal vents didn't just add a chapter to marine biology; it reshaped how scientists think about the very limits of life itself.`,
      questions: [
        { type: 'mcq', id: 't15-l-at1', part: 8, text: 'What did scientists believe about the deep ocean floor before the late 1970s?', options: ['That it was warmer than the surface', 'That it contained cities of fish', 'That it was full of plants', 'That it was almost lifeless, since no sunlight reaches it'], answer: 3 },
        { type: 'mcq', id: 't15-l-at2', part: 8, text: 'What did scientists discover near the Galápagos Islands in 1977?', options: ['Thriving communities of life around hydrothermal vents', 'A new island', 'Evidence of ancient plants', 'A sunken ship'], answer: 0 },
        { type: 'mcq', id: 't15-l-at3', part: 8, text: 'What is "chemosynthesis"?', options: ['Making food from sunlight', 'Bacteria drawing energy from chemicals like hydrogen sulfide to make food', 'A way of cleaning the ocean', 'A type of vent'], answer: 1 },
        { type: 'mcq', id: 't15-l-at4', part: 8, text: 'What supports the entire vent ecosystem?', options: ['Fish from the surface', 'Plants', 'Chemosynthetic bacteria', 'Sunlight filtering down'], answer: 2 },
        { type: 'mcq', id: 't15-l-at5', part: 8, text: 'Why does the professor say this discovery matters beyond the ocean floor?', options: ['It showed the ocean is warming.', 'It ended the study of marine biology.', 'It proved plants live underwater.', 'It expanded our sense of where life can survive, including possibly on other worlds.'], answer: 3 },
      ],
    },
    {
      part: 9,
      skill: 'writing',
      title: 'Writing — Build a Sentence',
      instructions: 'Read the first speaker. Arrange the fragments to make a grammatical and contextually appropriate reply. One fragment is not used.',
      sectionNote: TOEFL_BUILD_SENTENCE_SET15_V2.interactionDisclosure,
      questions: TOEFL_BUILD_SENTENCE_SET15_V2.items.map((item) =>
        toToeflBuildSentenceQuestion(TOEFL_BUILD_SENTENCE_SET15_V2.objectId, item, 9)),
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't15-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You signed up for a gym membership, but your circumstances have changed and you need to cancel it. You want to ask how to cancel and whether you will be charged any fee.\n\nWrite an email to the gym's membership office.`,
          text: 'In your email: explain your situation, ask your questions clearly, and keep a polite tone. Write as much as you can in complete sentences.',
          minWords: 0, timeLimitSeconds: 420, minimumWordsPolicy: 'none-published', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't15-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on cities. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Larsen: Some cities are banning cars from their central areas to reduce pollution and make streets safer for pedestrians. Do you think banning cars from city centers is a good idea? Why or why not?\n\nStudent (Ines): I think it's a great idea. It reduces pollution, encourages walking and cycling, and makes city centers more pleasant. For example, since my city closed its center to cars, the main square has become full of cafés and people instead of parked vehicles.\n\nStudent (Karl): I'm not convinced. Many people, including the elderly and those with disabilities, depend on cars. A total ban could make city centers hard to reach for them. For example, my grandmother relies on her car to reach the pharmacy in the city center, and a full ban would leave her with no easy alternative.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100, timeLimitSeconds: 600, minimumWordsPolicy: 'recommended-100', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't15-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-15/repeat-1.mp3', targetSentence: 'The game starts soon.' },
        { type: 'repeat', id: 't15-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-15/repeat-2.mp3', targetSentence: 'They cleaned the kitchen before the guests arrived.' },
        { type: 'repeat', id: 't15-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-15/repeat-3.mp3', targetSentence: 'The librarian helped the students find the books they needed.' },
        { type: 'repeat', id: 't15-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-15/repeat-4.mp3', targetSentence: 'The scientists warned that the glacier was melting faster than expected.' },
        { type: 'repeat', id: 't15-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-15/repeat-5.mp3', targetSentence: 'Even though the recipe looked complicated, it turned out to be surprisingly easy to follow.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't15-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: To begin, describe a teacher who influenced you. Who were they, and how did they influence you?' },
        { type: 'speak', id: 't15-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to shop online, while others prefer to shop in physical stores. Which do you prefer, and why? Give reasons and an example.' },
        { type: 'speak', id: 't15-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your city can build either a new public swimming pool or a new music hall. Which would you recommend, and why? Explain how it would benefit residents.' },
        { type: 'speak', id: 't15-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how might the way people watch films and television change over the next twenty years? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
