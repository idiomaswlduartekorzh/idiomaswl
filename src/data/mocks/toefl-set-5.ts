import type { MockExam } from './types';

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
          id: 't5-r-cw1',
          part: 1,
          qRange: [1, 6],
          instructions: 'A student is writing a short message to a classmate.',
          template: `Hi Mara,\n\nThanks for lending me your notes from Tuesday's {{1}}. I was {{2}} because I had a doctor's appointment, so I really appreciate it. I've {{3}} them and I think I understand the main points now. Could we {{4}} at the library tomorrow to compare answers before the {{5}} on Friday? I'm free after two o'clock. Let me {{6}} what time works for you.\n\nSee you soon,\nDan`,
          blanks: [
            { num: 1, prefix: 'lec', answer: 'lecture' },
            { num: 2, prefix: 'ab', answer: 'absent' },
            { num: 3, prefix: 're', answer: 'read' },
            { num: 4, prefix: 'm', answer: 'meet' },
            { num: 5, prefix: 'q', answer: 'quiz' },
            { num: 6, prefix: 'kn', answer: 'know' },
          ],
        },
        {
          type: 'wordcomplete',
          id: 't5-r-cw2',
          part: 1,
          qRange: [7, 12],
          instructions: 'The following is from an article about sleep.',
          template: `Most adults need between seven and nine hours of sleep each {{1}}. During sleep, the brain does not simply shut down; it stays {{2}}, processing memories and clearing waste products. People who regularly sleep too {{3}} may find it harder to concentrate and are more likely to make {{4}}. Researchers {{5}} that keeping a regular schedule — going to bed and waking up at the same time — is one of the most {{6}} ways to improve sleep quality.`,
          blanks: [
            { num: 1, prefix: 'ni', answer: 'night' },
            { num: 2, prefix: 'ac', answer: 'active' },
            { num: 3, prefix: 'li', answer: 'little' },
            { num: 4, prefix: 'mis', answer: 'mistakes' },
            { num: 5, prefix: 'sugg', answer: 'suggest' },
            { num: 6, prefix: 'eff', answer: 'effective' },
          ],
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
      instructions: 'Read the passage and answer questions.',
      passage: `The domestication of the horse transformed human societies more profoundly than almost any other animal. While dogs were domesticated far earlier, horses offered something different: a dramatic extension of human mobility and physical power. Archaeological evidence suggests that horses were first domesticated on the grasslands of Central Asia around 3500 BCE, initially raised for their meat and milk before their potential for transport was recognized.\n\nThe key evidence for early domestication comes from several sources. Changes in horse tooth wear indicate the use of bits, the metal or bone mouthpieces used to control a ridden animal. Settlement sites show a sudden increase in horse bones relative to other animals, suggesting managed herds rather than occasional hunting. Perhaps most tellingly, the geographic spread of certain horse-related vocabulary across ancient languages tracks closely with the movement of peoples who are thought to have relied on horses.\n\nOnce horses could be ridden and, later, harnessed to wheeled vehicles, the consequences rippled across every domain of life. Herders could manage far larger territories. Trade goods moved faster and over greater distances. Most dramatically, mounted warriors gained a decisive military advantage over foot soldiers, reshaping the balance of power between societies. Some historians argue that the spread of entire language families across Eurasia was accelerated by populations whose mobility depended on the horse.\n\nYet the relationship was not simply one of human mastery. Horses required pasture, water, and care, tying their owners to particular patterns of movement and settlement. In this sense, domestication was a mutual adaptation: humans shaped horses through selective breeding, and horses, in turn, shaped the rhythms of human life.`,
      passageTitle: 'The Domestication of the Horse',
      questions: [
        {
          type: 'mcq', id: 't5-r-ap1', part: 4,
          text: 'According to the passage, how were horses first used after domestication?',
          options: [
            'As riding animals for warfare',
            'For their meat and milk',
            'To pull wheeled vehicles',
            'As status symbols for rulers',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 't5-r-ap2', part: 4,
          text: 'The word "bits" in paragraph 2 refers to',
          options: ['units used to measure distance', 'small pieces of food given to horses', 'mouthpieces used to control a ridden horse', 'fragments of ancient pottery'],
          answer: 2,
        },
        {
          type: 'mcq', id: 't5-r-ap3', part: 4,
          text: 'Which of the following is mentioned as evidence of early domestication?',
          options: ['Written records kept by herders', 'The discovery of ancient saddles', 'Cave paintings depicting mounted riders', 'A sudden increase in horse bones at settlement sites'],
          answer: 3,
        },
        {
          type: 'mcq', id: 't5-r-ap4', part: 4,
          text: 'According to paragraph 3, what was the most dramatic consequence of riding horses?',
          options: ['A military advantage for mounted warriors over foot soldiers', 'The invention of the wheel', 'A decline in trade between distant regions', 'Faster communication by written letter'],
          answer: 0,
        },
        {
          type: 'mcq', id: 't5-r-ap5', part: 4,
          text: 'What does the author mean by describing domestication as a "mutual adaptation" in the final paragraph?',
          options: [
            'Humans and horses evolved into a single species',
            'Both humans and horses changed each other: humans bred horses, and horses shaped human patterns of life',
            'Horses eventually learned to live without human care',
            'The process happened at the same time in many regions',
          ],
          answer: 1,
        },
        {
          type: 'multiselect', id: 't5-r-ap6', part: 4,
          qRange: [6, 6],
          text: 'Select the TWO statements that are supported by the passage.',
          options: [
            { letter: 'A', text: 'Horses were domesticated before dogs.' },
            { letter: 'B', text: 'Horse domestication likely began on the grasslands of Central Asia around 3500 BCE.' },
            { letter: 'C', text: 'The spread of horse-related vocabulary tracks the movement of certain peoples.' },
            { letter: 'D', text: 'Horses were never used for transport in the ancient world.' },
          ],
          selectCount: 2,
          answers: ['B', 'C'],
        },
      ],
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
      instructions: 'Put the words in the correct order to make a grammatical sentence.',
      questions: [
        { type: 'sentencebuild', id: 't5-w-bs1', part: 9, tiles: ['She', 'has', 'lived', 'in', 'Madrid', 'for', 'five years'], answer: ['She', 'has', 'lived', 'in', 'Madrid', 'for', 'five years'] },
        { type: 'sentencebuild', id: 't5-w-bs2', part: 9, tiles: ['the report', 'before', 'Please', 'the meeting', 'send', 'me'], answer: ['Please', 'send', 'me', 'the report', 'before', 'the meeting'] },
        { type: 'sentencebuild', id: 't5-w-bs3', part: 9, tiles: ['is', 'the book', 'that', 'I', 'This', 'recommended'], answer: ['This', 'is', 'the book', 'that', 'I', 'recommended'] },
        { type: 'sentencebuild', id: 't5-w-bs4', part: 9, tiles: ['we', 'If', 'leave', 'now,', 'catch', 'we can', 'the train'], answer: ['If', 'we', 'leave', 'now,', 'we can', 'catch', 'the train'] },
        { type: 'sentencebuild', id: 't5-w-bs5', part: 9, tiles: ['was', 'The museum', 'than', 'more crowded', 'expected', 'we had'], answer: ['The museum', 'was', 'more crowded', 'than', 'we had', 'expected'] },
        { type: 'sentencebuild', id: 't5-w-bs6', part: 9, tiles: ['finishing', 'she', 'After', 'her degree,', 'a job', 'found', 'abroad'], answer: ['After', 'finishing', 'her degree,', 'she', 'found', 'a job', 'abroad'] },
      ],
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
