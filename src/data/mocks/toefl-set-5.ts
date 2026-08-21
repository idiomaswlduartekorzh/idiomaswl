import type { MockExam } from './types';
import { TOEFL_CTW_SET5_V2 } from '@/data/toefl/complete-the-words-sets-2-5';
import { TOEFL_READING_SET5_V2 } from '@/data/toefl/reading-sets-2-5';
import { TOEFL_BUILD_SENTENCE_SET5_V2 } from '@/data/toefl/build-sentence-sets-2-5';
import { toToeflBuildSentenceQuestion } from './toefl-build-sentence-adapter';
import { toToeflReadingQuestion } from './toefl-reading-adapter';

// TOEFL iBT — formato oficial vigente (actualización 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md (verificado contra ETS 2026).
// Escala 1–6 por sección. Reading/Listening/Build a Sentence: machine-scored.
// Write an Email / Academic Discussion / Listen and Repeat / Take an Interview: AI (autoevaluado aquí).
// Audios referenciados bajo /audio/toefl/set-5/ — pendientes de producción (ver checklist de medios).

const mock: MockExam = {
  id: 'set-5',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 5 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [

    // ═══════════════════════ READING (≈18–21 min) ═══════════════════════════════

    // ── Complete the Words ──────────────────────────────────────────────────────
    {
      part: 1,
      skill: 'reading',
      title: 'Reading — Complete the Words',
      instructions: 'Complete each word so the text makes sense. Some letters are given.',
      questions: [
        {
          type: 'wordcomplete',
          id: TOEFL_CTW_SET5_V2.id,
          part: 1,
          qRange: [1, 10],
          objectId: TOEFL_CTW_SET5_V2.objectId,
          contentVersion: String(TOEFL_CTW_SET5_V2.version),
          serverScoring: 'toefl-complete-words',
          alignment: 'official-family-pilot',
          instructions: TOEFL_CTW_SET5_V2.instructions,
          template: TOEFL_CTW_SET5_V2.template,
          blanks: TOEFL_CTW_SET5_V2.blanks.map((blank) => ({ ...blank })),
        },
      ],
    },

    // ── Read in Daily Life ──────────────────────────────────────────────────────
    {
      part: 2,
      skill: 'reading',
      title: 'Reading — Read in Daily Life (Library notice)',
      instructions: 'Read the notice and answer the questions.',
      passage: `CENTRAL CAMPUS LIBRARY — NOTICE\n\nStarting Monday, September 8, the library will extend its opening hours during the exam period.\n\n• Monday–Friday: 7:00 a.m. – 1:00 a.m.\n• Saturday & Sunday: 9:00 a.m. – 11:00 p.m.\n\nGroup study rooms on the third floor must be reserved online at least 24 hours in advance. Reservations are limited to two hours per group per day. Food is not permitted in study rooms, but covered drinks are allowed. Students who leave a reserved room empty for more than 15 minutes may lose their reservation.\n\nQuestions? Ask at the help desk on the ground floor.`,
      passageTitle: 'Library notice',
      questions: [
        {
          type: 'mcq', id: 't5-r-dl1', part: 2,
          text: 'What is the main purpose of this notice?',
          options: ['To inform students about extended hours and study-room rules', 'To advertise a new café inside the library', 'To explain how to borrow books online', 'To announce that the library will close during exams'],
          answer: 0,
        },
        {
          type: 'mcq', id: 't5-r-dl2', part: 2,
          text: 'How far in advance must a group study room be reserved?',
          options: ['At least 15 minutes', 'At least 2 hours', 'At least 24 hours', 'At least one week'],
          answer: 2,
        },
        {
          type: 'mcq', id: 't5-r-dl3', part: 2,
          text: 'What may happen if a reserved room is left empty for more than 15 minutes?',
          options: ['The library extends the reservation automatically', 'The group may lose the reservation', 'The group must pay a fee', 'The room is closed for the day'],
          answer: 1,
        },
      ],
    },
    {
      part: 3,
      skill: 'reading',
      title: 'Reading — Read in Daily Life (Email)',
      instructions: 'Read the email and answer the questions.',
      passage: `From: City Cycle Rentals\nTo: Priya Nair\nSubject: Your booking confirmation\n\nDear Priya,\n\nThank you for booking with City Cycle Rentals. Your bicycle is reserved for Saturday, June 14, from 9:00 a.m. Please bring a photo ID and the credit card used for booking when you collect it from our Riverside branch.\n\nThe daily rate includes a helmet and a lock at no extra cost. If you return the bicycle after 6:00 p.m., a late fee of $5 per hour applies. You may cancel free of charge up to 24 hours before your booking.\n\nWe look forward to seeing you.\n\nKind regards,\nCity Cycle Rentals`,
      passageTitle: 'Email',
      questions: [
        {
          type: 'mcq', id: 't5-r-dl4', part: 3,
          text: 'What must Priya bring when she collects the bicycle?',
          options: ['A printed map of the city', 'Her own helmet and lock', 'Only cash', 'A photo ID and the credit card used for booking'],
          answer: 3,
        },
        {
          type: 'mcq', id: 't5-r-dl5', part: 3,
          text: 'What is included in the daily rate?',
          options: ['Free delivery to a hotel', 'A guided tour', 'Insurance against theft', 'A helmet and a lock'],
          answer: 3,
        },
      ],
    },

    // ── Read an Academic Passage ────────────────────────────────────────────────
    {
      part: 4,
      skill: 'reading',
      title: 'Reading — Read an Academic Passage',
      instructions: TOEFL_READING_SET5_V2.academic.instructions,
      sectionNote: 'Las preguntas 1–5 forman Academic Passage. La selección múltiple final es práctica complementaria WeLearn.',
      passage: TOEFL_READING_SET5_V2.academic.text,
      passageTitle: TOEFL_READING_SET5_V2.academic.title,
      questions: TOEFL_READING_SET5_V2.academic.items.map((item) =>
        toToeflReadingQuestion(TOEFL_READING_SET5_V2.objectId, item, 4)),
    },

    // ═══════════════════════ LISTENING (≈18 min) ════════════════════════════════

    // ── Listen and Choose a Response (per-item audio) ───────────────────────────
    {
      part: 5,
      skill: 'listening',
      title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        {
          type: 'mcq', id: 't5-l-cr1', part: 5,
          audioUrl: '/audio/toefl/set-5/listen-choose-1.mp3',
          text: 'Choose the best response to what you heard.',
          options: ['Because the library was closed.', 'Sure, the meeting is in room 204.', 'No, I have never been to Canada.', 'It usually rains in April.'],
          answer: 1,
        },
        {
          type: 'mcq', id: 't5-l-cr2', part: 5,
          audioUrl: '/audio/toefl/set-5/listen-choose-2.mp3',
          text: 'Choose the best response to what you heard.',
          options: ['She lives near the station.', 'The printer is out of paper.', 'It cost about twenty dollars.', 'Yes, I\'d love to — what time does it start?'],
          answer: 3,
        },
        {
          type: 'mcq', id: 't5-l-cr3', part: 5,
          audioUrl: '/audio/toefl/set-5/listen-choose-3.mp3',
          text: 'Choose the best response to what you heard.',
          options: ['No, thank you, I already ate.', 'The bus leaves at nine.', 'She\'s studying biology.', 'I think it\'s on the second shelf, next to the dictionaries.'],
          answer: 3,
        },
        {
          type: 'mcq', id: 't5-l-cr4', part: 5,
          audioUrl: '/audio/toefl/set-5/listen-choose-4.mp3',
          text: 'Choose the best response to what you heard.',
          options: [
            'It\'s made of wood.',
            'That\'s a great idea — let\'s ask the professor first.',
            'I was born in July.',
            'The store closes at eight.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 't5-l-cr5', part: 5,
          audioUrl: '/audio/toefl/set-5/listen-choose-5.mp3',
          text: 'Choose the best response to what you heard.',
          options: ['The museum is free on Sundays.', 'Yes, my flight was delayed by two hours.', 'The recipe needs more salt.', 'He plays the guitar very well.'],
          answer: 1,
        },
      ],
    },

    // ── Listen to a Conversation ────────────────────────────────────────────────
    {
      part: 6,
      skill: 'listening',
      title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between two students. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-5/conversation.mp3',
      transcript: `MALE STUDENT: Hey, did you sign up for the field trip to the marine biology station yet?\n\nFEMALE STUDENT: Not yet. I want to go, but it's on the same Saturday as my part-time job. I'm trying to figure out if I can switch shifts.\n\nMALE STUDENT: Oh, that's tricky. It would be worth it though — Professor Alvarez said we'll actually collect water samples and analyze them in the lab afterward. It counts toward the final project.\n\nFEMALE STUDENT: Wait, it counts toward the project? I didn't realize that. That changes things. How much is it worth?\n\nMALE STUDENT: I think fifteen percent. And if you can't make the trip, you have to write an extra research paper instead, which honestly sounds worse.\n\nFEMALE STUDENT: Definitely worse. Okay, I'll talk to my manager today about swapping shifts. Do you know how we get there?\n\nMALE STUDENT: There's a bus leaving from the science building at seven a.m. You have to reserve a seat by Thursday, though — space is limited.\n\nFEMALE STUDENT: Seven a.m.? That's early. But fine. I'll reserve a seat once I sort out work.`,
      questions: [
        {
          type: 'mcq', id: 't5-l-cv1', part: 6,
          text: 'Why is the female student unsure about attending the field trip?',
          options: ['She cannot afford the cost.', 'She has another exam that day.', 'She is not interested in marine biology.', 'It conflicts with her part-time job.'],
          answer: 3,
        },
        {
          type: 'mcq', id: 't5-l-cv2', part: 6,
          text: 'What does the male student say makes the trip especially worthwhile?',
          options: ['It counts toward the final project.', 'It is required for graduation.', 'Attendance earns extra credit for perfect attendance.', 'It includes a free lunch.'],
          answer: 0,
        },
        {
          type: 'mcq', id: 't5-l-cv3', part: 6,
          text: 'What must students do if they cannot attend the trip?',
          options: [
            'Retake the course',
            'Write an extra research paper',
            'Attend a make-up trip',
            'Lose all project points',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 't5-l-cv4', part: 6,
          text: 'By when must students reserve a seat on the bus?',
          options: ['There is no deadline', 'By Thursday', 'By Saturday morning', 'By the end of the month'],
          answer: 1,
        },
      ],
    },

    // ── Listen to an Announcement ───────────────────────────────────────────────
    {
      part: 7,
      skill: 'listening',
      title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-5/announcement.mp3',
      transcript: `Good morning, everyone. This is an announcement for all students using the campus parking lots. Beginning next Monday, Lot C — the large lot behind the engineering building — will be closed for resurfacing for approximately two weeks. During this period, students who normally park in Lot C should use Lot F, near the athletic center, which has been reserved for your use.\n\nA free shuttle will run every fifteen minutes between Lot F and the main academic buildings from seven a.m. to seven p.m. Please allow a few extra minutes for your commute. Parking permits remain valid in Lot F — you do not need a new permit. We apologize for the inconvenience and appreciate your patience as we improve campus facilities. If you have questions, contact the parking office in the student center.`,
      questions: [
        {
          type: 'mcq', id: 't5-l-an1', part: 7,
          text: 'What is the main purpose of the announcement?',
          options: ['To advertise a new shuttle service permanently', 'To remind students to renew their permits', 'To announce a new parking fee', 'To inform students that Lot C will be closed for resurfacing'],
          answer: 3,
        },
        {
          type: 'mcq', id: 't5-l-an2', part: 7,
          text: 'Where should students who normally use Lot C park during the closure?',
          options: ['Lot F, near the athletic center', 'On the street', 'In the engineering building garage', 'Lot A'],
          answer: 0,
        },
        {
          type: 'mcq', id: 't5-l-an3', part: 7,
          text: 'What does the speaker say about parking permits?',
          options: [
            'Students need a new permit for Lot F.',
            'Existing permits remain valid in Lot F.',
            'Permits are suspended during the closure.',
            'Permits must be renewed at the parking office.',
          ],
          answer: 1,
        },
      ],
    },

    // ── Listen to an Academic Talk ──────────────────────────────────────────────
    {
      part: 8,
      skill: 'listening',
      title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-5/academic-talk.mp3',
      transcript: `PROFESSOR: Today I want to talk about a concept in ecology called a "keystone species." The term comes from architecture — the keystone is the wedge-shaped stone at the top of an arch that holds all the other stones in place. Remove it, and the whole arch collapses. Ecologists borrow this idea to describe a species whose impact on its ecosystem is far greater than you'd expect from its abundance.\n\nThe classic example comes from a study of the Pacific coast by ecologist Robert Paine in the 1960s. Paine looked at rocky tide pools where a species of starfish preyed on mussels. When he removed the starfish from an area, you might expect the mussels to thrive — and they did. But here's the surprising part: the mussels thrived so much that they crowded out nearly every other species. The diversity of the tide pool collapsed from about fifteen species down to eight. So the starfish, even though it wasn't especially numerous, was keeping the whole community diverse by controlling the mussel population.\n\nNow, why does this matter beyond tide pools? Because it changes how we think about conservation. If you're trying to protect an ecosystem, you can't treat every species as equally important. Losing a keystone species can trigger a cascade — a chain reaction of extinctions and imbalances. Sea otters are another example: they eat sea urchins, and sea urchins eat kelp. Remove the otters, the urchins explode in number, and the kelp forests — which shelter countless other species — disappear.\n\nThe practical lesson is that effective conservation often means identifying and protecting these disproportionately important species, rather than spreading effort evenly across everything.`,
      questions: [
        {
          type: 'mcq', id: 't5-l-at1', part: 8,
          text: 'Why does the professor compare a keystone species to a keystone in an arch?',
          options: ['Because it is difficult to see', 'Because both are made of stone', 'Because removing it causes the whole structure or system to collapse', 'Because it is the largest part of the structure'],
          answer: 2,
        },
        {
          type: 'mcq', id: 't5-l-at2', part: 8,
          text: 'What happened when Robert Paine removed the starfish from the tide pools?',
          options: ['The number of species increased', 'Nothing changed noticeably', 'All the mussels died', 'The mussels crowded out most other species, reducing diversity'],
          answer: 3,
        },
        {
          type: 'mcq', id: 't5-l-at3', part: 8,
          text: 'According to the professor, what is the significance of the starfish study for conservation?',
          options: ['Some species have a disproportionately large effect and should be prioritized for protection.', 'Starfish should be removed to protect mussels.', 'Tide pools cannot be conserved.', 'Every species should be treated as equally important.'],
          answer: 0,
        },
        {
          type: 'mcq', id: 't5-l-at4', part: 8,
          text: 'In the sea otter example, what happens to kelp forests if otters are removed?',
          options: [
            'They grow faster than before.',
            'They disappear because sea urchins multiply and eat the kelp.',
            'They are unaffected.',
            'They are replaced by mussels.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 't5-l-at5', part: 8,
          text: 'What does the professor mean by a "cascade"?',
          options: ['A type of tide pool', 'A sudden increase in rainfall', 'A chain reaction of extinctions and imbalances following the loss of a keystone species', 'A method of counting species'],
          answer: 2,
        },
      ],
    },

    // ═══════════════════════ WRITING (≈23 min) ══════════════════════════════════

    // ── Build a Sentence ────────────────────────────────────────────────────────
    {
      part: 9,
      skill: 'writing',
      title: 'Writing — Build a Sentence',
      instructions: 'Read the first speaker. Arrange the fragments to make a grammatical and contextually appropriate reply. One fragment is not used.',
      sectionNote: TOEFL_BUILD_SENTENCE_SET5_V2.interactionDisclosure,
      questions: TOEFL_BUILD_SENTENCE_SET5_V2.items.map((item) =>
        toToeflBuildSentenceQuestion(TOEFL_BUILD_SENTENCE_SET5_V2.objectId, item, 9)),
    },

    // ── Write an Email ──────────────────────────────────────────────────────────
    {
      part: 10,
      skill: 'writing',
      title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        {
          type: 'write', id: 't5-w-email', part: 10, taskNumber: 1,
          stimulusLabel: 'Write an Email',
          stimulus: `Situation: You signed up for a two-day weekend workshop on campus, but you have just found out that you must attend a family event and can no longer go. You want to ask whether you can transfer to the same workshop next month and whether your payment can be moved to the new date.\n\nWrite an email to the workshop coordinator, Ms. Reyes.`,
          text: 'In your email: explain why you cannot attend, make your request clearly, and use a polite, appropriate tone. Write as much as you can in complete sentences.',
          minWords: 0, timeLimitSeconds: 420, minimumWordsPolicy: 'none-published', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.',
        },
      ],
    },

    // ── Write for an Academic Discussion ────────────────────────────────────────
    {
      part: 11,
      skill: 'writing',
      title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        {
          type: 'write', id: 't5-w-disc', part: 11, taskNumber: 2,
          stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on technology and society. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Lin: Many schools are debating whether students should be allowed to use smartphones in the classroom. Some argue phones are useful learning tools; others say they are a distraction. In your view, should smartphones be allowed in class? Why or why not?\n\nStudent (Ana): I think phones should be allowed because they give quick access to dictionaries, research, and educational apps that make lessons more interactive. For example, in my last class, we used a phone app to look up unfamiliar vocabulary instantly instead of waiting to ask the teacher.\n\nStudent (Tom): I disagree. Even when phones are meant for learning, students end up checking messages and social media. The distraction outweighs the benefits. For example, I've seen classmates scrolling through social media during a lecture, completely missing what the professor explained.`,
          text: 'Write a response of at least 100 words. State your own position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100, timeLimitSeconds: 600, minimumWordsPolicy: 'recommended-100', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.',
        },
      ],
    },

    // ═══════════════════════ SPEAKING (≈8 min) ══════════════════════════════════

    // ── Listen and Repeat (per-item audio) ──────────────────────────────────────
    {
      part: 12,
      skill: 'speaking',
      title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't5-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-5/repeat-1.mp3', targetSentence: 'The train leaves at nine.' },
        { type: 'repeat', id: 't5-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-5/repeat-2.mp3', targetSentence: 'She bought a new umbrella because it was raining.' },
        { type: 'repeat', id: 't5-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-5/repeat-3.mp3', targetSentence: 'Although the exam was difficult, most of the students passed it.' },
        { type: 'repeat', id: 't5-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-5/repeat-4.mp3', targetSentence: 'The professor who taught the seminar last year has moved to another university.' },
        { type: 'repeat', id: 't5-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-5/repeat-5.mp3', targetSentence: 'If the committee approves the proposal, construction of the new library will begin in the spring.' },
      ],
    },

    // ── Take an Interview ───────────────────────────────────────────────────────
    {
      part: 13,
      skill: 'speaking',
      title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        {
          type: 'speak', id: 't5-s-iv1', part: 13, partNumber: 1,
          text: 'Interviewer: Let\'s start with something simple. Can you describe your hometown? What is it like, and what do you enjoy about it?',
        },
        {
          type: 'speak', id: 't5-s-iv2', part: 13, partNumber: 2,
          text: 'Interviewer: Some people prefer studying alone, while others prefer studying in groups. Which do you prefer, and why? Give reasons and an example.',
        },
        {
          type: 'speak', id: 't5-s-iv3', part: 13, partNumber: 3,
          text: 'Interviewer: Imagine your city is going to build either a new park or a new public library with the same budget. Which would you recommend, and why? Explain how it would benefit the community.',
        },
        {
          type: 'speak', id: 't5-s-iv4', part: 13, partNumber: 4,
          text: 'Interviewer: Finally, think about how people will travel in the future. How do you predict transportation might change over the next twenty years? Explain your prediction.',
        },
      ],
    },

  ],
};

export default mock;
