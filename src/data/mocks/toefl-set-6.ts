import type { MockExam } from './types';
import { TOEFL_CTW_SET6_V2 } from '@/data/toefl/complete-the-words-sets-6-10';
import { toToeflCompleteWordsQuestion } from './toefl-complete-words-adapter';
import { TOEFL_READING_SET6_V2 } from '@/data/toefl/reading-sets-6-10';
import { toToeflReadingQuestion } from './toefl-reading-adapter';
import { TOEFL_BUILD_SENTENCE_SET6_V2 } from '@/data/toefl/build-sentence-sets-6-10';
import { toToeflBuildSentenceQuestion } from './toefl-build-sentence-adapter';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Audios bajo /audio/toefl/set-6/ — pendientes de producción (ver checklist de medios).

const mock: MockExam = {
  id: 'set-6',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 6 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [

    // ═══════════════════════ READING ════════════════════════════════════════════
    {
      part: 1,
      skill: 'reading',
      title: 'Reading — Complete the Words',
      instructions: 'Complete each word so the text makes sense. Some letters are given.',
      questions: [toToeflCompleteWordsQuestion(TOEFL_CTW_SET6_V2, 1)],
    },
    {
      part: 2,
      skill: 'reading',
      title: 'Reading — Read in Daily Life (Café menu)',
      instructions: 'Read the menu notice and answer the questions.',
      passage: `RIVERSIDE CAFÉ — DAILY SPECIALS\n\nBreakfast (served 7:00–11:00 a.m.)\n• Oatmeal with fruit — $4\n• Two eggs with toast — $5\n\nLunch (served 11:30 a.m.–3:00 p.m.)\n• Soup of the day with bread — $6\n• Grilled vegetable sandwich — $7\n\nAll hot drinks are $1 off before 9:00 a.m. Students receive a 10% discount with a valid student card (not combined with other offers). We accept cards and mobile payment; cash is not accepted.`,
      passageTitle: 'Café menu',
      questions: [
        {
          type: 'mcq', id: 't6-r-dl1', part: 2,
          text: 'Until what time is breakfast served?',
          options: ['11:30 a.m.', '3:00 p.m.', '9:00 a.m.', '11:00 a.m.'],
          answer: 3,
        },
        {
          type: 'mcq', id: 't6-r-dl2', part: 2,
          text: 'How can a customer get a discount on a hot drink?',
          options: ['By paying with cash', 'By buying two sandwiches', 'By ordering after 3:00 p.m.', 'By ordering before 9:00 a.m.'],
          answer: 3,
        },
        {
          type: 'mcq', id: 't6-r-dl3', part: 2,
          text: 'What does the notice say about payment?',
          options: [
            'Only cash is accepted.',
            'Cash is not accepted; cards and mobile payment are.',
            'Mobile payment is not accepted.',
            'A service fee applies to card payments.',
          ],
          answer: 1,
        },
      ],
    },
    {
      part: 3,
      skill: 'reading',
      title: 'Reading — Read in Daily Life (Text message)',
      instructions: 'Read the messages and answer the questions.',
      passage: `SAM: Hey, are we still meeting to work on the presentation tonight?\n\nJADE: Yes, but can we start at 7 instead of 6? I have a meeting that runs late.\n\nSAM: 7 works. Should we meet in the library or the study café?\n\nJADE: The library closes at 8 today, so let's do the café. I'll bring my laptop with the slides.\n\nSAM: Perfect. I'll bring the printed notes and the data we collected. See you at 7.`,
      passageTitle: 'Text messages',
      questions: [
        {
          type: 'mcq', id: 't6-r-dl4', part: 3,
          text: 'Why does Jade want to change the time?',
          options: ['She wants to finish earlier.', 'She has a meeting that runs late.', 'The library is closed.', 'She forgot her laptop.'],
          answer: 1,
        },
        {
          type: 'mcq', id: 't6-r-dl5', part: 3,
          text: 'Why do they decide to meet at the café instead of the library?',
          options: ['The café is quieter.', 'The library requires a reservation.', 'The café is closer.', 'The library closes at 8 today.'],
          answer: 3,
        },
      ],
    },
    {
      part: 4,
      skill: 'reading',
      title: 'Reading — Read an Academic Passage',
      instructions: TOEFL_READING_SET6_V2.academic.instructions,
      sectionNote: 'Las preguntas 1–5 reproducen familias oficiales de selección única. La pregunta 6 es práctica complementaria WeLearn.',
      passage: TOEFL_READING_SET6_V2.academic.text,
      passageTitle: TOEFL_READING_SET6_V2.academic.title,
      questions: TOEFL_READING_SET6_V2.academic.items.map((item) =>
        toToeflReadingQuestion(TOEFL_READING_SET6_V2.objectId, item, 4)),
    },
    {
      part: 5,
      skill: 'listening',
      title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        {
          type: 'mcq', id: 't6-l-cr1', part: 5, audioUrl: '/audio/toefl/set-6/listen-choose-1.mp3',
          text: 'Choose the best response to what you heard.',
          options: ['On the third floor, next to the elevator.', 'No, I don\'t like coffee.', 'It was very sunny yesterday.', 'She is my sister.'],
          answer: 0,
        },
        {
          type: 'mcq', id: 't6-l-cr2', part: 5, audioUrl: '/audio/toefl/set-6/listen-choose-2.mp3',
          text: 'Choose the best response to what you heard.',
          options: ['Yes, it is a very old building.', 'The book costs fifteen dollars.', 'Sorry, I can\'t — I have to work on Saturday.', 'The kitchen is being painted.'],
          answer: 2,
        },
        {
          type: 'mcq', id: 't6-l-cr3', part: 5, audioUrl: '/audio/toefl/set-6/listen-choose-3.mp3',
          text: 'Choose the best response to what you heard.',
          options: ['She was born in Peru.', 'The lecture starts at ten.', 'I usually take the number 12 bus.', 'It tastes a little too salty.'],
          answer: 2,
        },
        {
          type: 'mcq', id: 't6-l-cr4', part: 5, audioUrl: '/audio/toefl/set-6/listen-choose-4.mp3',
          text: 'Choose the best response to what you heard.',
          options: ['Sure, I can help you carry those boxes.', 'The film was two hours long.', 'No, I have never played tennis.', 'It\'s made of glass.'],
          answer: 0,
        },
        {
          type: 'mcq', id: 't6-l-cr5', part: 5, audioUrl: '/audio/toefl/set-6/listen-choose-5.mp3',
          text: 'Choose the best response to what you heard.',
          options: ['Yes, I finally finished it last night.', 'The train was quite crowded.', 'She teaches chemistry.', 'It\'s about ten minutes away.'],
          answer: 0,
        },
      ],
    },
    {
      part: 6,
      skill: 'listening',
      title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between a student and a professor. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-6/conversation.mp3',
      transcript: `STUDENT: Excuse me, Professor Han, do you have a minute? I wanted to ask about the research essay.\n\nPROFESSOR: Of course, come in. What's on your mind?\n\nSTUDENT: Well, I chose to write about renewable energy, but the topic feels too broad. Every source I find covers something different — solar, wind, policy, costs. I'm not sure how to focus it.\n\nPROFESSOR: That's a very common problem, and honestly, recognizing it is half the battle. A good research essay usually answers one specific question, not a whole field. So instead of "renewable energy," what if you asked something like, "Why has solar power become cheaper than coal in the last decade?"\n\nSTUDENT: Oh, that's much more manageable. So I should narrow it to one question first, and then find sources that speak to that question?\n\nPROFESSOR: Exactly. And don't be afraid to leave things out. If a source is interesting but doesn't help answer your question, it doesn't belong in the essay. That's the hardest lesson for most students.\n\nSTUDENT: That makes sense. Should I email you my question once I've decided?\n\nPROFESSOR: Please do. I'm happy to give you feedback before you start writing — that's the best time to catch a topic that's still too wide.`,
      questions: [
        {
          type: 'mcq', id: 't6-l-cv1', part: 6,
          text: 'What is the student\'s main problem?',
          options: ['She disagrees with the professor.', 'She cannot find any sources.', 'Her essay topic is too broad.', 'She missed the deadline.'],
          answer: 2,
        },
        {
          type: 'mcq', id: 't6-l-cv2', part: 6,
          text: 'What does the professor suggest a good research essay should do?',
          options: ['Use as many sources as possible', 'Avoid taking a position', 'Cover an entire field', 'Answer one specific question'],
          answer: 3,
        },
        {
          type: 'mcq', id: 't6-l-cv3', part: 6,
          text: 'According to the professor, what is the hardest lesson for most students?',
          options: ['Leaving out interesting material that does not answer the question', 'Writing a strong conclusion', 'Formatting citations correctly', 'Finding enough sources'],
          answer: 0,
        },
        {
          type: 'mcq', id: 't6-l-cv4', part: 6,
          text: 'What does the professor offer to do?',
          options: [
            'Choose the topic for the student',
            'Give feedback on the student\'s question before she starts writing',
            'Extend the deadline',
            'Provide a list of required sources',
          ],
          answer: 1,
        },
      ],
    },
    {
      part: 7,
      skill: 'listening',
      title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-6/announcement.mp3',
      transcript: `Attention, students. This is a reminder from the Student Activities Office. The annual Club Fair will take place this Friday from eleven a.m. to three p.m. on the main quad. More than forty student clubs will have tables where you can learn about their activities and sign up to join.\n\nThis year, we've added a new feature: a "quiet room" in the student center for anyone who prefers a calmer space to talk with club representatives one on one. If the weather is bad, the entire fair will move indoors to the gymnasium — check your email that morning for confirmation. Free refreshments will be available while supplies last. We hope to see you there, and remember: joining a club is one of the best ways to make friends and build your résumé.`,
      questions: [
        {
          type: 'mcq', id: 't6-l-an1', part: 7,
          text: 'What is the announcement mainly about?',
          options: ['A graduation ceremony', 'A change to the class schedule', 'The annual Club Fair', 'A new gym opening'],
          answer: 2,
        },
        {
          type: 'mcq', id: 't6-l-an2', part: 7,
          text: 'What new feature has been added this year?',
          options: ['An online sign-up system', 'A food truck area', 'A live music stage', 'A quiet room for one-on-one conversations'],
          answer: 3,
        },
        {
          type: 'mcq', id: 't6-l-an3', part: 7,
          text: 'What will happen if the weather is bad?',
          options: ['The fair will move indoors to the gymnasium.', 'The fair will be postponed a week.', 'Only half the clubs will attend.', 'The fair will be canceled.'],
          answer: 0,
        },
      ],
    },
    {
      part: 8,
      skill: 'listening',
      title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-6/academic-talk.mp3',
      transcript: `PROFESSOR: Let's talk about why we forget things — and I want to start by challenging an assumption. Most people think forgetting is simply a failure of memory, like a leak in a bucket. But many psychologists now argue that forgetting is actually a useful feature, not a bug.\n\nConsider what would happen if you remembered everything — every phone number you ever dialed, every route you ever walked, every conversation word for word. That sounds powerful, but it would be paralyzing. Your brain would be cluttered with outdated and irrelevant information. When you needed to recall where you parked your car today, you'd have to sift through the memory of where you parked it every previous day. Forgetting old, unused information actually helps you retrieve what's currently relevant.\n\nThere's a well-known case study of a man who could not forget — he remembered essentially everything he experienced. You might expect him to be a genius, but in fact he struggled. He found it hard to think abstractly or to see the general pattern behind specific details, because every detail remained equally vivid. The forest was lost in the trees.\n\nSo how does the brain decide what to keep? One key factor is use. Memories that are retrieved and used are strengthened, while those that go unused gradually weaken. This is sometimes described as "use it or lose it." Another factor is emotional significance — we tend to retain memories tied to strong emotions. From an evolutionary standpoint, this makes sense: remembering a dangerous situation could save your life, while remembering what you had for lunch three Tuesdays ago rarely matters.\n\nThe takeaway is that a healthy memory isn't one that holds on to everything. It's one that efficiently keeps what's useful and lets go of what isn't.`,
      questions: [
        {
          type: 'mcq', id: 't6-l-at1', part: 8,
          text: 'What assumption about forgetting does the professor challenge?',
          options: [
            'That forgetting only happens in old age',
            'That forgetting is simply a failure of memory',
            'That memory has no limits',
            'That emotions have no effect on memory',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 't6-l-at2', part: 8,
          text: 'Why does the professor say remembering everything would be "paralyzing"?',
          options: ['It would make emotions too strong.', 'It would use too much energy.', 'The brain would be cluttered with irrelevant information, making it hard to retrieve what is currently relevant.', 'It would prevent people from sleeping.'],
          answer: 2,
        },
        {
          type: 'mcq', id: 't6-l-at3', part: 8,
          text: 'What does the case study of the man who could not forget illustrate?',
          options: ['That forgetting is caused by illness', 'That emotional memories are unreliable', 'That a perfect memory makes someone a genius', 'That remembering every detail can make abstract thinking and seeing patterns difficult'],
          answer: 3,
        },
        {
          type: 'mcq', id: 't6-l-at4', part: 8,
          text: 'According to the professor, which memories tend to be retained?',
          options: ['Memories that are used and those tied to strong emotions', 'Memories from early childhood only', 'Memories that are written down', 'Only the most recent ones'],
          answer: 0,
        },
        {
          type: 'mcq', id: 't6-l-at5', part: 8,
          text: 'What is the main takeaway of the lecture?',
          options: [
            'A healthy memory holds on to everything.',
            'A healthy memory efficiently keeps what is useful and lets go of what is not.',
            'Forgetting should always be prevented.',
            'Emotional memories are the least important.',
          ],
          answer: 1,
        },
      ],
    },

    // ═══════════════════════ WRITING ════════════════════════════════════════════
    {
      part: 9,
      skill: 'writing',
      title: 'Writing — Build a Sentence',
      instructions: 'Read the first speaker. Arrange the fragments to make a grammatical and contextually appropriate reply. One fragment is not used.',
      sectionNote: TOEFL_BUILD_SENTENCE_SET6_V2.interactionDisclosure,
      questions: TOEFL_BUILD_SENTENCE_SET6_V2.items.map((item) =>
        toToeflBuildSentenceQuestion(TOEFL_BUILD_SENTENCE_SET6_V2.objectId, item, 9)),
    },
    {
      part: 10,
      skill: 'writing',
      title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        {
          type: 'write', id: 't6-w-email', part: 10, taskNumber: 1,
          stimulusLabel: 'Write an Email',
          stimulus: `Situation: You ordered a textbook from an online store two weeks ago, but it still has not arrived, and your course has already started. You want to ask the store to check the status of your order and, if it cannot arrive within a few days, to give you a refund.\n\nWrite an email to the store's customer service team.`,
          text: 'In your email: explain the problem, make your request clearly, and use a polite, appropriate tone. Write as much as you can in complete sentences.',
          minWords: 0, timeLimitSeconds: 420, minimumWordsPolicy: 'none-published', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.',
        },
      ],
    },
    {
      part: 11,
      skill: 'writing',
      title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        {
          type: 'write', id: 't6-w-disc', part: 11, taskNumber: 2,
          stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on urban planning. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Ortega: Many cities are deciding how to spend limited transportation budgets. Some argue the money should go to expanding public transit like buses and trains; others say it should improve roads for cars. In your view, which should a growing city prioritize, and why?\n\nStudent (Kofi): I think public transit should come first. It reduces traffic and pollution and helps people who cannot afford cars get to work. For example, cities that expanded their metro systems have seen traffic congestion drop significantly within just a few years.\n\nStudent (Lena): I understand that, but many people already depend on cars, and poor roads cause accidents and waste time. Improving roads helps everyone right now. For example, poorly maintained roads in my city cause frequent accidents, and drivers waste hours stuck in traffic every single day.`,
          text: 'Write a response of at least 100 words. State your own position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100, timeLimitSeconds: 600, minimumWordsPolicy: 'recommended-100', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.',
        },
      ],
    },

    // ═══════════════════════ SPEAKING ═══════════════════════════════════════════
    {
      part: 12,
      skill: 'speaking',
      title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't6-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-6/repeat-1.mp3', targetSentence: 'The store opens at eight.' },
        { type: 'repeat', id: 't6-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-6/repeat-2.mp3', targetSentence: 'We missed the bus, so we walked to class.' },
        { type: 'repeat', id: 't6-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-6/repeat-3.mp3', targetSentence: 'The scientists collected samples from three different rivers.' },
        { type: 'repeat', id: 't6-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-6/repeat-4.mp3', targetSentence: 'The novel that we read for class was translated from Portuguese.' },
        { type: 'repeat', id: 't6-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-6/repeat-5.mp3', targetSentence: 'Before the museum opened to the public, the paintings were carefully restored by experts.' },
      ],
    },
    {
      part: 13,
      skill: 'speaking',
      title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't6-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: To begin, tell me about a hobby or activity you enjoy in your free time. What is it, and why do you like it?' },
        { type: 'speak', id: 't6-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people like to plan everything in advance, while others prefer to be spontaneous. Which are you, and why? Give reasons and an example.' },
        { type: 'speak', id: 't6-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your university has money to add either more online courses or more in-person courses. Which would you recommend, and why? Explain how it would help students.' },
        { type: 'speak', id: 't6-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how do you think the way people work will change in the next twenty years? Explain your reasoning.' },
      ],
    },

  ],
};

export default mock;
