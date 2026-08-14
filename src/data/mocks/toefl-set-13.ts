import type { MockExam } from './types';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Audios bajo /audio/toefl/set-13/ — pendientes (ver checklist de medios).

const mock: MockExam = {
  id: 'set-13',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 13 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Reading — Complete the Words',
      instructions: 'Complete each word so the text makes sense. Some letters are given.',
      questions: [
        {
          type: 'wordcomplete', id: 't13-r-cw1', part: 1, qRange: [1, 6],
          instructions: 'A customer is writing an online review of a hotel.',
          template: `We stayed at the Bay Hotel for three nights and had a wonderful {{1}}. The room was clean and the staff were extremely {{2}}, always ready to help. Breakfast was {{3}} in the price and offered plenty of choice. The location was {{4}}, just a short walk from the beach. The only small {{5}} was that the Wi-Fi was slow. Overall, I would happily {{6}} this hotel to friends.`,
          blanks: [
            { num: 1, prefix: 'st', answer: 'stay' },
            { num: 2, prefix: 'hel', answer: 'helpful' },
            { num: 3, prefix: 'inc', answer: 'included' },
            { num: 4, prefix: 'conv', answer: 'convenient' },
            { num: 5, prefix: 'dow', answer: 'downside' },
            { num: 6, prefix: 'rec', answer: 'recommend' },
          ],
        },
        {
          type: 'wordcomplete', id: 't13-r-cw2', part: 1, qRange: [7, 12],
          instructions: 'The following is from an article about rainforests.',
          template: `Rainforests are among the most {{1}} ecosystems on Earth, home to more than half of all plant and animal {{2}}. The tall trees form a thick {{3}} that blocks most sunlight from reaching the ground. Rainforests also play a key role in the {{4}} cycle, releasing huge amounts of water vapor into the air. Unfortunately, large areas are cut down every year, a process called {{5}}, which threatens countless species and contributes to climate {{6}}.`,
          blanks: [
            { num: 1, prefix: 'div', answer: 'diverse' },
            { num: 2, prefix: 'sp', answer: 'species' },
            { num: 3, prefix: 'can', answer: 'canopy' },
            { num: 4, prefix: 'wa', answer: 'water' },
            { num: 5, prefix: 'defo', answer: 'deforestation' },
            { num: 6, prefix: 'ch', answer: 'change' },
          ],
        },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Pharmacy label)',
      instructions: 'Read the label and answer the questions.',
      passage: `PHARMACY — MEDICINE INSTRUCTIONS\n\nPatient: J. Moreno\nMedicine: Amoxil 500 mg\n\n• Take ONE capsule THREE times a day, with food.\n• Complete the full course, even if you feel better.\n• Do not take with alcohol.\n• Store in a cool, dry place, away from children.\n• If you experience a rash or difficulty breathing, stop taking the medicine and contact a doctor immediately.\n\nRefills: 0. If symptoms continue after finishing, see your doctor.`,
      passageTitle: 'Medicine label',
      questions: [
        { type: 'mcq', id: 't13-r-dl1', part: 2, text: 'How often should the patient take the medicine?', options: ['Three times a day', 'Only when in pain', 'Once a day', 'Twice a day'], answer: 0 },
        { type: 'mcq', id: 't13-r-dl2', part: 2, text: 'What should the patient do even if they feel better?', options: ['Complete the full course', 'Double the dose', 'Take it without food', 'Stop taking the medicine'], answer: 0 },
        { type: 'mcq', id: 't13-r-dl3', part: 2, text: 'What should the patient do if they get a rash?', options: ['Take another capsule', 'Stop taking the medicine and contact a doctor immediately', 'Wait a week', 'Store it in the fridge'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Invitation email)',
      instructions: 'Read the email and answer the questions.',
      passage: `From: Riverside Community Center\nTo: Members\nSubject: You're invited — Spring Open Day\n\nDear members,\n\nWe warmly invite you to our Spring Open Day on Saturday, May 10, from 10:00 a.m. to 4:00 p.m. Come and try free taster sessions in yoga, pottery, and cooking, and meet our instructors.\n\nEntry is free, but for the cooking session please register in advance, as places are limited to twenty people. There will be a small café serving drinks and snacks. Children are welcome and there will be craft activities for them throughout the day. We look forward to seeing you there.`,
      passageTitle: 'Invitation email',
      questions: [
        { type: 'mcq', id: 't13-r-dl4', part: 3, text: 'Which session requires advance registration?', options: ['All of them', 'Yoga', 'Pottery', 'Cooking'], answer: 3 },
        { type: 'mcq', id: 't13-r-dl5', part: 3, text: 'What is said about children?', options: ['They must pay an entry fee.', 'They can only attend the cooking session.', 'They are not allowed.', 'They are welcome and there will be craft activities for them.'], answer: 3 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Reading — Read an Academic Passage',
      instructions: 'Read the passage and answer questions.',
      passage: `For thousands of years, humans navigated using the stars, the sun, and familiar landmarks. But over the past few decades, a technology has quietly transformed how we find our way: the Global Positioning System, or GPS. Today, GPS guides everything from smartphones and cars to ships, aircraft, and even farm equipment. Yet few people understand the elegant science that makes it work.\n\nGPS relies on a network of satellites orbiting the Earth, each continuously broadcasting a signal that includes the exact time the signal was sent and the satellite's position. A GPS receiver—in your phone, for example—listens for these signals. Because radio waves travel at a known speed, the receiver can calculate how far away each satellite is by measuring how long the signal took to arrive. With the distance to one satellite, you could be anywhere on a sphere around it. But with signals from four or more satellites, the receiver can pinpoint its exact location on the Earth's surface, a process called trilateration.\n\nWhat is remarkable is the precision required. The satellites carry extremely accurate atomic clocks, because even a tiny timing error—a millionth of a second—would translate into a position error of hundreds of meters. In fact, the system is so sensitive to time that it must account for effects predicted by Einstein's theory of relativity: clocks on the fast-moving satellites, high above the Earth, tick at a slightly different rate than clocks on the ground. If engineers ignored this, GPS would quickly become useless.\n\nGPS was originally developed for military purposes, but it was later made available for civilian use, unleashing a wave of innovation no one fully anticipated. It has reshaped transportation, agriculture, emergency response, and countless everyday activities. It is a striking example of how fundamental physics—precise timekeeping and relativity—can quietly underpin a technology billions of people now depend on without a second thought.`,
      passageTitle: 'How GPS Works',
      questions: [
        { type: 'mcq', id: 't13-r-ap1', part: 4, text: 'How does a GPS receiver calculate its distance from a satellite?', options: ['By measuring how long the signal took to arrive, since radio waves travel at a known speed', 'By counting the number of satellites', 'By using a compass', 'By measuring the satellite\'s brightness'], answer: 0 },
        { type: 'mcq', id: 't13-r-ap2', part: 4, text: 'What is "trilateration," as described in the passage?', options: ['Using one satellite to find a location', 'Using signals from four or more satellites to pinpoint an exact location', 'Measuring the temperature of satellites', 'Sending signals back to satellites'], answer: 1 },
        { type: 'mcq', id: 't13-r-ap3', part: 4, text: 'Why must GPS satellites carry extremely accurate atomic clocks?', options: ['To save energy', 'To keep the satellites warm', 'Because even a tiny timing error would cause a large position error', 'To communicate with other satellites'], answer: 2 },
        { type: 'mcq', id: 't13-r-ap4', part: 4, text: 'Why must GPS account for Einstein\'s theory of relativity?', options: ['Because signals travel faster in space', 'Because the Earth is round', 'Because satellites are very heavy', 'Because clocks on the fast-moving satellites tick at a slightly different rate than clocks on the ground'], answer: 3 },
        { type: 'mcq', id: 't13-r-ap5', part: 4, text: 'What is the main idea of the final paragraph?', options: ['GPS shows how fundamental physics can quietly underpin a widely used technology.', 'GPS is no longer useful.', 'GPS was invented by Einstein.', 'GPS is only used by the military.'], answer: 0 },
        { type: 'multiselect', id: 't13-r-ap6', part: 4, qRange: [6, 6], text: 'Select the TWO statements supported by the passage.', options: [
          { letter: 'A', text: 'GPS requires signals from at least four satellites to pinpoint an exact location.' },
          { letter: 'B', text: 'GPS was originally developed for civilian shopping apps.' },
          { letter: 'C', text: 'A tiny timing error in GPS would cause a large error in position.' },
          { letter: 'D', text: 'GPS satellites do not need accurate clocks.' },
        ], selectCount: 2, answers: ['A', 'C'] },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't13-l-cr1', part: 5, audioUrl: '/audio/toefl/set-13/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ['It\'s on the noticeboard near the entrance.', 'No, I don\'t like cycling.', 'The rice is ready.', 'She left an hour ago.'], answer: 0 },
        { type: 'mcq', id: 't13-l-cr2', part: 5, audioUrl: '/audio/toefl/set-13/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ['Yes, he is a nurse.', 'It is two meters tall.', 'Sure, I\'ll email it to you right away.', 'The gate is locked.'], answer: 2 },
        { type: 'mcq', id: 't13-l-cr3', part: 5, audioUrl: '/audio/toefl/set-13/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ['He arrives on Thursday.', 'It costs nine dollars.', 'The student center has a lost-and-found desk.', 'The soup is warm.'], answer: 2 },
        { type: 'mcq', id: 't13-l-cr4', part: 5, audioUrl: '/audio/toefl/set-13/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ['Absolutely — I\'ll save you a seat.', 'The bus was empty.', 'No, I have not visited it.', 'It is made of clay.'], answer: 0 },
        { type: 'mcq', id: 't13-l-cr5', part: 5, audioUrl: '/audio/toefl/set-13/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ['Yes, I handed in my thesis this morning!', 'The market is closed.', 'She teaches French.', 'It is very close.'], answer: 0 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between two students. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-13/conversation.mp3',
      transcript: `MAN: Are you going to run for the student council election? The deadline to apply is Friday.\n\nWOMAN: I've been thinking about it, actually. But I'm not sure I have time. Between classes and my part-time job, I'm already stretched thin.\n\nMAN: I get that. But you're always complaining about how the council never does anything about the issues students care about — like the lack of study space during exams.\n\nWOMAN: That's true. And honestly, that's exactly why I'm tempted. If I don't run, I can't really complain, can I?\n\nMAN: Fair point. How much of a time commitment is it, do you know?\n\nWOMAN: From what I've heard, it's about three hours a week — one meeting plus some smaller tasks. It's not huge, but it adds up during busy weeks.\n\nMAN: Three hours isn't bad. And it would look great on your résumé. Plus, you'd actually be able to push for those changes you keep talking about.\n\nWOMAN: You know what, you're right. I'd rather try and maybe make a difference than sit around wishing things were better. I'll put my name in before Friday.`,
      questions: [
        { type: 'mcq', id: 't13-l-cv1', part: 6, text: 'What is the man encouraging the woman to do?', options: ['Join a sports team', 'Quit her part-time job', 'Run for the student council election', 'Study more for exams'], answer: 2 },
        { type: 'mcq', id: 't13-l-cv2', part: 6, text: 'Why is the woman hesitant at first?', options: ['She dislikes meetings.', 'She is moving to another city.', 'She is not interested in student issues.', 'She feels she is already stretched thin with classes and a job.'], answer: 3 },
        { type: 'mcq', id: 't13-l-cv3', part: 6, text: 'How much time does the role require, according to the woman?', options: ['About ten hours a week', 'One full day a week', 'She does not know.', 'About three hours a week'], answer: 3 },
        { type: 'mcq', id: 't13-l-cv4', part: 6, text: 'What does the woman finally decide?', options: ['Not to run', 'To put her name in before Friday', 'To wait until next year', 'To quit her job first'], answer: 1 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-13/announcement.mp3',
      transcript: `Attention, all passengers. This is an announcement regarding the airport shuttle service. Due to unexpected road maintenance on the main access road, the shuttle to Terminal 2 will depart from a temporary stop at Bay 7, rather than the usual Bay 3, until further notice. Bay 7 is located at the far end of the arrivals hall, near the information desk.\n\nThe shuttle will continue to run every fifteen minutes, and the journey time to Terminal 2 remains about ten minutes. If you are catching a flight, we recommend allowing a little extra time to find the new departure point. Staff in orange vests are stationed throughout the arrivals hall to direct you. We apologize for any confusion this may cause and thank you for your patience.`,
      questions: [
        { type: 'mcq', id: 't13-l-an1', part: 7, text: 'What change is announced?', options: ['The shuttle now costs more.', 'The shuttle service is cancelled.', 'The shuttle to Terminal 2 now departs from Bay 7 instead of Bay 3.', 'Terminal 2 is closed.'], answer: 2 },
        { type: 'mcq', id: 't13-l-an2', part: 7, text: 'Why has the departure point changed?', options: ['Because of a strike', 'Because of a special event', 'Because of bad weather', 'Because of road maintenance on the main access road'], answer: 3 },
        { type: 'mcq', id: 't13-l-an3', part: 7, text: 'How can passengers get help finding the new stop?', options: ['Staff in orange vests are stationed throughout the arrivals hall to direct them.', 'By reading a map online', 'By waiting at Bay 3', 'By calling a phone number'], answer: 0 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-13/academic-talk.mp3',
      transcript: `PROFESSOR: Today I want to explore a question that connects biology, history, and even economics: why did humans start farming? For most of our history — hundreds of thousands of years — humans were hunter-gatherers, moving around and living off wild plants and animals. Then, around twelve thousand years ago, in several parts of the world independently, people began to farm. This shift, sometimes called the Agricultural Revolution, changed everything. But why did it happen?\n\nHere's a puzzle that has fascinated researchers: in many ways, early farming actually made people's lives harder, at least at first. Studies of ancient skeletons suggest that early farmers were often shorter, showed more signs of disease, and worked longer hours than the hunter-gatherers who came before them. Their diets were less varied, relying heavily on a few crops. So if farming was such hard work and produced less healthy people, why did anyone do it?\n\nThe leading explanation is not that farming made individual lives better, but that it allowed populations to grow. A given piece of land, once farmed, could support far more people than the same land could as wild territory. More food, even if it was less nutritious, meant more children surviving. So farming communities grew in number and eventually outcompeted or absorbed the hunter-gatherers around them. It's a crucial distinction: farming succeeded not because it improved quality of life, but because it improved quantity — of food and of people.\n\nThis has a broader lesson for how we think about human history. We often assume that new technologies are adopted because they make life better. But sometimes a technology spreads simply because it out-reproduces the alternative, even if the people using it are worse off. Farming didn't win because it was pleasant. It won because it was, in a demographic sense, unstoppable.`,
      questions: [
        { type: 'mcq', id: 't13-l-at1', part: 8, text: 'What is the main question the lecture addresses?', options: ['How to farm efficiently', 'Why humans started farming', 'When cities were first built', 'What hunter-gatherers ate'], answer: 1 },
        { type: 'mcq', id: 't13-l-at2', part: 8, text: 'What "puzzle" does the professor describe?', options: ['Farming produced healthier people immediately.', 'Early farming may have made individual lives harder at first, yet it spread.', 'Farming was easier than hunting.', 'Hunter-gatherers refused to farm.'], answer: 1 },
        { type: 'mcq', id: 't13-l-at3', part: 8, text: 'According to the leading explanation, why did farming spread?', options: ['It required less work.', 'It produced more varied diets.', 'It made individuals healthier.', 'It allowed populations to grow, since farmed land could support more people.'], answer: 3 },
        { type: 'mcq', id: 't13-l-at4', part: 8, text: 'What broader lesson does the professor draw?', options: ['A technology can spread simply because it out-reproduces the alternative, even if people are worse off.', 'Farming was a mistake.', 'History cannot be studied scientifically.', 'New technologies always improve life.'], answer: 0 },
        { type: 'mcq', id: 't13-l-at5', part: 8, text: 'What does the professor mean by saying farming was "demographically unstoppable"?', options: ['It could not be farmed.', 'It led to larger populations that outcompeted or absorbed hunter-gatherers.', 'It stopped population growth.', 'It was banned by early societies.'], answer: 1 },
      ],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Build a Sentence',
      instructions: 'Put the words in the correct order to make a grammatical sentence.',
      questions: [
        { type: 'sentencebuild', id: 't13-w-bs1', part: 9, tiles: ['She', 'sent', 'me', 'a postcard', 'from Rome'], answer: ['She', 'sent', 'me', 'a postcard', 'from Rome'] },
        { type: 'sentencebuild', id: 't13-w-bs2', part: 9, tiles: ['the report', 'to finish', 'me', 'help', 'Can', 'you'], answer: ['Can', 'you', 'help', 'me', 'to finish', 'the report'] },
        { type: 'sentencebuild', id: 't13-w-bs3', part: 9, tiles: ['recommended', 'The doctor', 'I', 'rest', 'more', 'that'], answer: ['The doctor', 'recommended', 'that', 'I', 'rest', 'more'] },
        { type: 'sentencebuild', id: 't13-w-bs4', part: 9, tiles: ['ready,', 'is', 'When', 'we\'ll', 'dinner', 'eat'], answer: ['When', 'dinner', 'is', 'ready,', 'we\'ll', 'eat'] },
        { type: 'sentencebuild', id: 't13-w-bs5', part: 9, tiles: ['is', 'The new library', 'the old one', 'bigger', 'than', 'much'], answer: ['The new library', 'is', 'much', 'bigger', 'than', 'the old one'] },
        { type: 'sentencebuild', id: 't13-w-bs6', part: 9, tiles: ['the letter,', 'Having', 'she', 'read', 'smiled'], answer: ['Having', 'read', 'the letter,', 'she', 'smiled'] },
      ],
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't13-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You bought a pair of headphones online, but when they arrived, one side did not work. You want to explain the problem and ask for either a replacement or a refund.\n\nWrite an email to the online store's customer service.`,
          text: 'In your email: describe the problem, make your request clearly, and keep a polite tone. Write as much as you can in complete sentences.',
          minWords: 0, timeLimitSeconds: 420, minimumWordsPolicy: 'none-published', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't13-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on tourism. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Costa: Tourism brings money and jobs to many places, but it can also damage the environment and local culture. In your view, does tourism do more good or more harm? Why?\n\nStudent (Ella): I think it does more good. Tourism creates jobs, supports small businesses, and encourages countries to protect their heritage sites. For example, a small coastal town near where I live now thrives economically because visitors come specifically to see its restored historic center.\n\nStudent (Rashid): I disagree. Mass tourism often pollutes natural areas, raises local prices, and turns unique cultures into performances for visitors. For example, a beach near my hometown has become so crowded with tourists that local fishermen can barely use it anymore.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100, timeLimitSeconds: 600, minimumWordsPolicy: 'recommended-100', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't13-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-13/repeat-1.mp3', targetSentence: 'The lesson ends at noon.' },
        { type: 'repeat', id: 't13-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-13/repeat-2.mp3', targetSentence: 'He fixed the bicycle and rode it to school.' },
        { type: 'repeat', id: 't13-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-13/repeat-3.mp3', targetSentence: 'The tour guide showed the visitors the oldest part of the city.' },
        { type: 'repeat', id: 't13-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-13/repeat-4.mp3', targetSentence: 'The report suggested that the company should invest more in staff training.' },
        { type: 'repeat', id: 't13-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-13/repeat-5.mp3', targetSentence: 'When the power went out during the storm, the students continued their experiment by candlelight.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't13-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: To begin, describe a place where you like to relax. Where is it, and why do you find it relaxing?' },
        { type: 'speak', id: 't13-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to learn from books, while others prefer to learn from videos. Which do you prefer, and why? Give reasons and an example.' },
        { type: 'speak', id: 't13-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your city can spend money on either cleaning up a river or planting trees along the streets. Which would you recommend, and why? Explain how it would benefit residents.' },
        { type: 'speak', id: 't13-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how might people\'s free-time activities change over the next twenty years? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
