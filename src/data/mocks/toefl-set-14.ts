import type { MockExam } from './types';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Audios bajo /audio/toefl/set-14/ — pendientes (ver checklist de medios).

const mock: MockExam = {
  id: 'set-14',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 14 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Reading — Complete the Words',
      instructions: 'Complete each word so the text makes sense. Some letters are given.',
      questions: [
        {
          type: 'wordcomplete', id: 't14-r-cw1', part: 1, qRange: [1, 6],
          instructions: 'A student is writing to a landlord.',
          template: `Dear Mr. Owens,\n\nI am writing about the {{1}} I signed for the apartment on Elm Street. I would like to {{2}} it for another year, as I am very happy living here. Before I do, could you please confirm whether the monthly {{3}} will stay the same? I would also like to {{4}} a small problem: the kitchen window does not close {{5}}. I would be grateful if this could be {{6}} soon.\n\nKind regards,\nOmar`,
          blanks: [
            { num: 1, prefix: 'lea', answer: 'lease' },
            { num: 2, prefix: 'ren', answer: 'renew' },
            { num: 3, prefix: 're', answer: 'rent' },
            { num: 4, prefix: 'men', answer: 'mention' },
            { num: 5, prefix: 'pro', answer: 'properly' },
            { num: 6, prefix: 'rep', answer: 'repaired' },
          ],
        },
        {
          type: 'wordcomplete', id: 't14-r-cw2', part: 1, qRange: [7, 12],
          instructions: 'The following is from an article about volcano-formed islands.',
          template: `Some islands are formed by {{1}} activity beneath the ocean. Over thousands of years, layers of {{2}} rock build up until they rise above the water's {{3}}. At first, these islands are bare rock, but over time, seeds carried by wind, waves, and {{4}} allow plants to grow. Animals eventually arrive too, creating new {{5}}. Because they are so isolated, such islands often develop {{6}} species found nowhere else on Earth.`,
          blanks: [
            { num: 1, prefix: 'vol', answer: 'volcanic' },
            { num: 2, prefix: 'coo', answer: 'cooled' },
            { num: 3, prefix: 'sur', answer: 'surface' },
            { num: 4, prefix: 'bi', answer: 'birds' },
            { num: 5, prefix: 'eco', answer: 'ecosystems' },
            { num: 6, prefix: 'un', answer: 'unique' },
          ],
        },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Store notice)',
      instructions: 'Read the notice and answer the questions.',
      passage: `GREENLEAF GROCERY — CUSTOMER NOTICE\n\nWe are pleased to announce our new home-delivery service.\n\n• Order online before 2:00 p.m. for same-day delivery between 5:00 and 8:00 p.m.\n• Delivery is free on orders over $40; a $5 fee applies to smaller orders.\n• We deliver within a 10-kilometer radius of the store.\n• Fresh and frozen items are packed separately to keep them at the right temperature.\n\nTo place your first order, visit our website and enter the code WELCOME for 15% off.`,
      passageTitle: 'Store notice',
      questions: [
        { type: 'mcq', id: 't14-r-dl1', part: 2, text: 'By what time must a customer order for same-day delivery?', options: ['Any time', 'By 2:00 p.m.', 'By 5:00 p.m.', 'By 8:00 p.m.'], answer: 1 },
        { type: 'mcq', id: 't14-r-dl2', part: 2, text: 'When is delivery free?', options: ['Only on the first order', 'Never', 'On all orders', 'On orders over $40'], answer: 3 },
        { type: 'mcq', id: 't14-r-dl3', part: 2, text: 'What does the code WELCOME give?', options: ['15% off the first order', 'A free item', 'A refund', 'Free delivery forever'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Apology email)',
      instructions: 'Read the email and answer the questions.',
      passage: `From: Bright Ideas Bookshop\nTo: Customer\nSubject: About your recent order\n\nDear Customer,\n\nWe are sorry to inform you that one item from your order — "The History of Maps" — is currently out of stock and will not be available for three weeks. The rest of your order has already been shipped and should arrive within three days.\n\nYou have two options for the out-of-stock item: we can send it separately once it arrives at no extra cost, or we can cancel it and refund you immediately. Please reply to let us know which you prefer. We apologize for the inconvenience and thank you for your patience.`,
      passageTitle: 'Apology email',
      questions: [
        { type: 'mcq', id: 't14-r-dl4', part: 3, text: 'What is the problem with the order?', options: ['The whole order is delayed.', 'One item is out of stock for three weeks.', 'The order was lost.', 'The customer was charged twice.'], answer: 1 },
        { type: 'mcq', id: 't14-r-dl5', part: 3, text: 'What are the customer\'s two options?', options: ['Return everything', 'Wait or complain', 'Receive the item separately later at no extra cost, or cancel it for a refund', 'Pay extra or wait'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Reading — Read an Academic Passage',
      instructions: 'Read the passage and answer questions.',
      passage: `Bees are famous for their honey, but their most important contribution to human life is something less obvious: pollination. As bees travel from flower to flower gathering nectar, they carry pollen with them, fertilizing plants so they can produce seeds and fruit. A remarkable proportion of the crops humans depend on—apples, almonds, blueberries, and many more—rely on insect pollination, and bees are the most important pollinators of all. Without them, both wild plants and agriculture would suffer enormously.\n\nWhat makes bees such effective pollinators is not merely their numbers but their behavior. A single honeybee tends to visit flowers of just one species during a foraging trip, a tendency known as flower constancy. This is highly efficient for the plant, because pollen from an apple flower is far more likely to be carried to another apple flower rather than wasted on an unrelated species. In effect, the bee and the flowering plant have evolved a partnership from which both benefit: the bee gets food, and the plant gets reproduction.\n\nIn recent years, however, beekeepers around the world have reported alarming declines in bee populations. A phenomenon called colony collapse disorder, in which the worker bees of a hive suddenly disappear, has drawn particular attention. Scientists have not identified a single cause; rather, the decline appears to result from a combination of pressures: certain pesticides, parasites such as the varroa mite, loss of wildflower habitat, and disease. These factors may weaken bees individually and interact in ways that overwhelm a colony.\n\nThe implications are serious. If pollinators continue to decline, the cost of pollinating crops could rise sharply, and some foods could become scarcer and more expensive. Efforts to help include reducing harmful pesticide use, planting wildflowers to provide forage, and supporting research into bee health. Ultimately, the fate of bees is a reminder of how deeply human well-being is entangled with the health of the natural world—often through creatures we rarely stop to notice.`,
      passageTitle: 'Bees and Pollination',
      questions: [
        { type: 'mcq', id: 't14-r-ap1', part: 4, text: 'According to the passage, what is the most important contribution bees make to human life?', options: ['Making wax', 'Controlling pests', 'Producing honey', 'Pollinating crops and wild plants'], answer: 3 },
        { type: 'mcq', id: 't14-r-ap2', part: 4, text: 'What is "flower constancy"?', options: ['A single bee tending to visit flowers of just one species during a foraging trip', 'Flowers that never change color', 'A type of pesticide', 'A bee visiting many different species in one trip'], answer: 0 },
        { type: 'mcq', id: 't14-r-ap3', part: 4, text: 'Why does flower constancy benefit plants?', options: ['It makes flowers grow faster.', 'Pollen is more likely carried to another flower of the same species rather than wasted.', 'It attracts more bees.', 'It reduces the need for water.'], answer: 1 },
        { type: 'mcq', id: 't14-r-ap4', part: 4, text: 'What does the passage say about the cause of colony collapse disorder?', options: ['It does not really exist.', 'It has a single known cause.', 'It appears to result from a combination of pressures, not a single cause.', 'It is caused only by cold weather.'], answer: 2 },
        { type: 'mcq', id: 't14-r-ap5', part: 4, text: 'What broader point does the final paragraph make?', options: ['Honey will soon disappear.', 'Pesticides are always safe.', 'Bees are unimportant.', 'Human well-being is deeply entangled with the health of the natural world.'], answer: 3 },
        { type: 'multiselect', id: 't14-r-ap6', part: 4, qRange: [6, 6], text: 'Select the TWO statements supported by the passage.', options: [
          { letter: 'A', text: 'Many important human crops rely on insect pollination.' },
          { letter: 'B', text: 'Colony collapse disorder has a single, well-understood cause.' },
          { letter: 'C', text: 'Planting wildflowers is one way to help bee populations.' },
          { letter: 'D', text: 'Bees visit as many different flower species as possible in one trip.' },
        ], selectCount: 2, answers: ['A', 'C'] },
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't14-l-cr1', part: 5, audioUrl: '/audio/toefl/set-14/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ['No, I don\'t like tennis.', 'The bread is warm.', 'She left already.', 'It\'s just past the vending machines.'], answer: 3 },
        { type: 'mcq', id: 't14-l-cr2', part: 5, audioUrl: '/audio/toefl/set-14/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ['It is six meters long.', 'Of course, I\'d be glad to proofread it.', 'The gate is open.', 'Yes, she is a pilot.'], answer: 1 },
        { type: 'mcq', id: 't14-l-cr3', part: 5, audioUrl: '/audio/toefl/set-14/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ['It costs seven dollars.', 'You can ask the tutor during office hours.', 'The tea is sweet.', 'He arrives on Wednesday.'], answer: 1 },
        { type: 'mcq', id: 't14-l-cr4', part: 5, audioUrl: '/audio/toefl/set-14/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ['The bus was late.', 'No, I have not seen it.', 'It is made of stone.', 'Sure — let\'s reschedule for Thursday.'], answer: 3 },
        { type: 'mcq', id: 't14-l-cr5', part: 5, audioUrl: '/audio/toefl/set-14/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ['The park is far.', 'She teaches history.', 'It is quite small.', 'Yes, I passed my driving test!'], answer: 3 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between a student and a university staff member. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-14/conversation.mp3',
      transcript: `STUDENT: Hi, I'm interested in doing a semester abroad next year, but I don't really know where to start.\n\nSTAFF: You've come to the right place — this is the study-abroad office. Do you have a particular country or region in mind?\n\nSTUDENT: Not exactly. I'm studying engineering, so I want somewhere with strong engineering programs, but I'd also love to improve my Spanish.\n\nSTAFF: That's a helpful combination to know. We have partner universities in Spain, Mexico, and Chile that offer engineering courses, some taught in English and some in Spanish. If improving your Spanish is a goal, immersion in a Spanish-speaking country would be ideal.\n\nSTUDENT: That sounds perfect. But I'm worried about the cost. Study abroad seems expensive.\n\nSTAFF: It can be, but it's often less than people expect. You continue to pay your regular tuition here, not the host university's fees. And there are scholarships specifically for study abroad — I'd strongly encourage you to apply. The main extra costs are usually flights and living expenses, which vary a lot by country.\n\nSTUDENT: Okay, that's reassuring. What's my next step?\n\nSTAFF: I'd suggest attending our information session next Tuesday, where past participants share their experiences. After that, book a one-on-one meeting with an advisor to plan which courses would transfer back to your degree. That's the key thing to sort out early.`,
      questions: [
        { type: 'mcq', id: 't14-l-cv1', part: 6, text: 'What does the student want to do?', options: ['Change majors', 'Do a semester abroad', 'Find a part-time job', 'Drop a course'], answer: 1 },
        { type: 'mcq', id: 't14-l-cv2', part: 6, text: 'What two goals does the student mention?', options: ['Studying art and history', 'Saving money and traveling cheaply', 'Studying engineering and improving Spanish', 'Learning to cook and making friends'], answer: 2 },
        { type: 'mcq', id: 't14-l-cv3', part: 6, text: 'What does the staff member say about tuition costs?', options: ['Study abroad is always free.', 'Tuition doubles while abroad.', 'Students pay the host university\'s fees.', 'Students continue to pay their regular tuition, not the host university\'s fees.'], answer: 3 },
        { type: 'mcq', id: 't14-l-cv4', part: 6, text: 'What does the staff member say is the key thing to sort out early?', options: ['Which courses would transfer back to the student\'s degree', 'Where to live', 'What to pack', 'Which flights to book'], answer: 0 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-14/announcement.mp3',
      transcript: `Attention, shoppers. The store will be closing in thirty minutes, at nine p.m. Please bring your final selections to the checkout counters, which will remain open until closing time. \n\nWe would also like to remind you about our loyalty program. Members earn one point for every dollar spent, and points can be exchanged for discounts on future purchases. Signing up is free and takes only a minute at customer service near the main entrance. This weekend only, new members will receive a bonus of five hundred points — enough for a five-dollar discount on your next visit. \n\nThank you for shopping with us this evening. We hope to see you again soon, and we wish you a pleasant evening.`,
      questions: [
        { type: 'mcq', id: 't14-l-an1', part: 7, text: 'What is the first thing the announcement tells shoppers?', options: ['The store is having a sale.', 'The store will close in thirty minutes.', 'The store is moving.', 'A product has been recalled.'], answer: 1 },
        { type: 'mcq', id: 't14-l-an2', part: 7, text: 'How do members earn points in the loyalty program?', options: ['Points for using a coupon', 'One point for every dollar spent', 'One point per visit', 'Points for bringing a friend'], answer: 1 },
        { type: 'mcq', id: 't14-l-an3', part: 7, text: 'What bonus do new members get this weekend?', options: ['Free delivery', 'Double points forever', 'A free item', 'Five hundred bonus points'], answer: 3 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-14/academic-talk.mp3',
      transcript: `PROFESSOR: Today's topic is one of the most successful stories in conservation: the recovery of a species that was once nearly extinct. I'm talking about the American bison. In the early nineteenth century, tens of millions of bison roamed North America. By the end of that century, fewer than a thousand remained. Understanding both how this collapse happened and how the species recovered teaches us a lot about conservation.\n\nThe collapse was astonishingly rapid, and it was almost entirely caused by humans. As settlers expanded westward, bison were hunted on an industrial scale — for their hides, for sport, and, in some cases, as a deliberate strategy to undermine Indigenous peoples who depended on them. Within a few decades, an animal that had numbered in the tens of millions was pushed to the brink of extinction. It's a stark example of how quickly human activity can devastate even a hugely abundant species.\n\nThe recovery is equally instructive. A small number of individuals — ranchers, conservationists, and some Indigenous communities — took action, protecting the last remaining animals and breeding them in protected areas. National parks such as Yellowstone became crucial refuges. Slowly, over more than a century, bison numbers climbed back into the hundreds of thousands, though most now live on ranches rather than roaming free.\n\nBut here's an important nuance the story teaches us. Saving a species from extinction in terms of raw numbers is not the same as restoring its ecological role. Bison once shaped entire grassland ecosystems — their grazing, their movement, even the way they wallowed in the dirt created habitats for other species. A few hundred thousand bison confined to ranches don't perform that ecological function the way tens of millions of free-roaming animals once did. So conservation success has layers: preventing extinction is the first, most urgent goal, but true restoration means bringing back not just the animal, but the role it played in its ecosystem.`,
      questions: [
        { type: 'mcq', id: 't14-l-at1', part: 8, text: 'What is the main subject of the lecture?', options: ['The collapse and recovery of the American bison', 'How to start a ranch', 'The history of national parks', 'The extinction of the dinosaurs'], answer: 0 },
        { type: 'mcq', id: 't14-l-at2', part: 8, text: 'According to the professor, what mainly caused the collapse of the bison?', options: ['Disease', 'Human activity, especially industrial-scale hunting', 'Climate change', 'Competition with other animals'], answer: 1 },
        { type: 'mcq', id: 't14-l-at3', part: 8, text: 'What role did places like Yellowstone play in the recovery?', options: ['They had no effect.', 'They sold bison for meat.', 'They became crucial refuges where bison were protected.', 'They banned all bison.'], answer: 2 },
        { type: 'mcq', id: 't14-l-at4', part: 8, text: 'What important nuance does the professor emphasize?', options: ['Bison never shaped their ecosystem.', 'Conservation always fully restores a species.', 'Bison are still extinct.', 'Saving a species in raw numbers is not the same as restoring its ecological role.'], answer: 3 },
        { type: 'mcq', id: 't14-l-at5', part: 8, text: 'Why do a few hundred thousand ranched bison not fully restore the ecosystem?', options: ['Confined to ranches, they don\'t perform the ecological function that tens of millions of free-roaming animals once did.', 'They eat too much grass.', 'They are a different species.', 'They are too small.'], answer: 0 },
      ],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Build a Sentence',
      instructions: 'Put the words in the correct order to make a grammatical sentence.',
      questions: [
        { type: 'sentencebuild', id: 't14-w-bs1', part: 9, tiles: ['They', 'are', 'painting', 'the house', 'this week'], answer: ['They', 'are', 'painting', 'the house', 'this week'] },
        { type: 'sentencebuild', id: 't14-w-bs2', part: 9, tiles: ['the address', 'you', 'me', 'give', 'Could', 'please'], answer: ['Could', 'you', 'please', 'give', 'me', 'the address'] },
        { type: 'sentencebuild', id: 't14-w-bs3', part: 9, tiles: ['wrote', 'The essay', 'she', 'a prize', 'won'], answer: ['The essay', 'she', 'wrote', 'won', 'a prize'] },
        { type: 'sentencebuild', id: 't14-w-bs4', part: 9, tiles: ['you', 'If', 'need', 'anything,', 'me', 'call'], answer: ['If', 'you', 'need', 'anything,', 'call', 'me'] },
        { type: 'sentencebuild', id: 't14-w-bs5', part: 9, tiles: ['is', 'This summer', 'last year', 'than', 'hotter'], answer: ['This summer', 'is', 'hotter', 'than', 'last year'] },
        { type: 'sentencebuild', id: 't14-w-bs6', part: 9, tiles: ['the station,', 'Arriving', 'at', 'the train', 'they', 'had left', 'found'], answer: ['Arriving', 'at', 'the station,', 'they', 'found', 'the train', 'had left'] },
      ],
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't14-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You are part of a volunteer group that meets on Saturdays. You will be away for the next two Saturdays and want to let the coordinator know, and ask whether you can help in another way during that time.\n\nWrite an email to the volunteer coordinator.`,
          text: 'In your email: explain your absence, offer to help another way, and keep a friendly, polite tone. Write as much as you can in complete sentences.',
          minWords: 0, timeLimitSeconds: 420, minimumWordsPolicy: 'none-published', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't14-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on health and lifestyle. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Ivanov: Some experts argue that schools should require students to do at least one hour of physical activity every day. Do you agree that daily exercise should be required in schools? Why or why not?\n\nStudent (Grace): I agree. Regular exercise improves health, helps students concentrate, and reduces stress. For example, after our school added a short exercise break, teachers noticed students paying attention longer during afternoon classes.\n\nStudent (Hassan): I'm not sure it should be required. Some students are very busy with studies, and forcing exercise might make them dislike it. Maybe it should be encouraged instead. For example, a friend who already trains for competitive swimming outside school found the extra required activity exhausting rather than helpful.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100, timeLimitSeconds: 600, minimumWordsPolicy: 'recommended-100', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't14-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-14/repeat-1.mp3', targetSentence: 'The door is open.' },
        { type: 'repeat', id: 't14-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-14/repeat-2.mp3', targetSentence: 'She caught the early train to the city.' },
        { type: 'repeat', id: 't14-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-14/repeat-3.mp3', targetSentence: 'The chef prepared a special meal for the guests.' },
        { type: 'repeat', id: 't14-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-14/repeat-4.mp3', targetSentence: 'The survey found that most residents supported the new recycling program.' },
        { type: 'repeat', id: 't14-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-14/repeat-5.mp3', targetSentence: 'After the volunteers had planted the trees, they watered them and marked each one with a small sign.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't14-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: To begin, describe a meal you really enjoy. What is it, and why do you like it?' },
        { type: 'speak', id: 't14-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to exercise outdoors, while others prefer to exercise in a gym. Which do you prefer, and why? Give reasons and an example.' },
        { type: 'speak', id: 't14-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your school can spend money on either new laboratory equipment or more library books. Which would you recommend, and why? Explain how it would benefit students.' },
        { type: 'speak', id: 't14-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how might people\'s use of cars change over the next twenty years? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
