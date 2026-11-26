type TaskFigure =
  | { kind: 'notes'; heading: string; items: string[] }
  | { kind: 'table'; columns: string[]; rows: string[][] }
  | { kind: 'flow'; steps: string[] }
  | { kind: 'compost-bin' };

export type ReadingTutorGuide = {
  introduction: string;
  title: string;
  passage: string[];
  tasks: Array<{
    question: string;
    instruction?: string;
    options?: string[];
    figure?: TaskFigure;
    reasoning: string[];
  }>;
  transfer: string;
};

// Short teaching examples. The scored practice keeps its own passages, keys and feedback.
export const READING_SKILL_GUIDES = {
  scanning: {
    introduction: 'You can find the right name or year and still answer the wrong question. Before your eyes go looking for a number, decide what has to happen in the sentence containing it. That will tell you when to stop.',
    title: 'Which change does the year belong to?',
    passage: ['When the neighbourhood bus loop began in 2018, it served only Mill Street. In 2021 the loop took in two more streets. The service was extended again in 2023, when the last bus began running an hour later.'],
    tasks: [{
      question: 'In which year did the route first expand beyond Mill Street?',
      reasoning: [
        '“Expand” might send your eye straight to “extended” and the year 2023. Follow that sentence to the end. The last bus ran later that year. The timetable changed, while the question asks about the streets on the route.',
        'In the middle sentence, “took in two more streets” tells you the route grew. The date attached to that change is 2021. You can leave 2018 behind once you see that the loop still served only Mill Street then.',
      ],
    }],
    transfer: 'For the next date question, put the event beside the date in your head. “Reached two streets” is a much better stopping signal than a four-digit number.',
  },
  parafrasis: {
    introduction: 'Imagine explaining a sentence to a friend in simpler English. You can swap a surprising number of words and keep the idea intact. Swap “might” for “will”, though, and you have made a promise the speaker never made.',
    title: 'Has the council actually promised anything?',
    passage: ['The evening bus trial ends in May. Officials could extend the trial provided that demand stays strong. A final decision will follow the passenger survey.'],
    tasks: [{
      question: 'Which version keeps the meaning of the middle sentence?',
      options: ['A. The trial may continue if enough people keep using the bus.', 'B. Officials will keep the bus running because demand is already strong.'],
      reasoning: [
        'B feels familiar. It even keeps “officials” and “strong”. Try saying it aloud as a promise. In B the decision has been made and the writer supplies a reason. The passage leaves the decision open until after the survey.',
        'A keeps both pieces that matter. “May continue” carries the uncertainty in “could extend”, and “if” keeps the condition in “provided that”. Those small words do more work here than the repeated nouns.',
      ],
    }],
    transfer: 'When two sentences sound nearly alike, imagine the condition failing. If one sentence still promises the result and the other leaves it open, you have found a change of meaning.',
  },
  inferencia: {
    introduction: 'Sometimes the writer gives you observations and lets you join them. Make the smallest claim that accounts for those observations. If your explanation depends on knowing what people felt, check whether the writer ever asked them.',
    title: 'What can the library records tell you?',
    passage: ['More people visited the library after its renovation. Monthly novel loans stayed much the same. The sign-in sheets showed twice as many visits to evening workshops that month as in the same month a year earlier. Visitors were never asked why they came.'],
    tasks: [{
      question: 'Which conclusion can you defend from those records?',
      options: ['A. At least some of the increased activity involved workshops.', 'B. Most new visitors came because they preferred the renovated rooms.'],
      reasoning: [
        'Follow the two records separately. Novel borrowing stayed steady. The workshop sheets recorded more visits. Together those clues support A without requiring you to identify everyone who came through the door.',
        'B offers a tidy explanation for the rise, which is part of its appeal. “After its renovation” gives you the order of events. The writer tells you that nobody asked visitors about their reasons, so the records cannot establish that preference or how many people shared it.',
      ],
    }],
    transfer: 'Ask what new evidence you would need to prove the stronger answer. Here you would want visitors’ reasons. The absence of that evidence helps you see how far the records can take you.',
  },
  'limite-de-palabras': {
    introduction: 'You have found the right line. Before copying it, read the words already printed beside the gap. They may have done half the work for you. The instruction tells you how many words you can still use.',
    title: 'How much of the station sign belongs in the gap?',
    passage: ['A sign directs passengers with bicycles to the west entrance. During the morning rush, members of staff open a separate gate for travellers with large suitcases.'],
    tasks: [{
      instruction: 'Use ONE WORD ONLY from the passage.',
      question: 'Passengers with bicycles should use the ___ entrance.',
      reasoning: [
        '“West entrance” is the right place, so it is easy to copy both words. Put them into the gap and read the result aloud. It would say “the west entrance entrance” and your answer would use two words.',
        'Write “west”. The printed word “entrance” supplies the noun. “Separate” also fits the grammar and the limit, but that gate serves people with large suitcases. It changes which travellers the answer describes.',
      ],
    }],
    transfer: 'Cover the source for a moment and read the completed line. Then uncover it and check the spelling and the printed limit. A maximum of two words, for example, still allows a one-word answer.',
  },
  'gestion-del-tiempo': {
    introduction: 'When a question keeps pulling you back to the same line, notice what another read would achieve. Sometimes one missing phrase is within reach. Sometimes you can secure a nearby answer now and come back with a better clue.',
    title: 'Two questions left on the same page',
    passage: ['B. The committee approved the new ferry route in April. The first public crossing took place in October.', 'C. The committee considered three possible fares. Its minutes record the fare it chose, but give no reason for choosing it.'],
    tasks: [{
      question: 'You have just read B. Question 8 asks whether the committee chose the fare to attract commuters. Question 9 asks for the month of the first public crossing. Which would you answer first?',
      reasoning: [
        'I would record October for question 9 while “first public crossing” is in front of me. April belongs to the approval. Spending another minute on fares in B would let a clear answer slip away.',
        'For question 8, my return note would be “C, reason for fare?” Here C says the minutes omit the reason. The idea about commuters is NOT GIVEN in this text. In a longer passage I’d check any other relevant discussion of fares before recording that answer.',
      ],
    }],
    transfer: 'At the next sticking point, leave the paragraph letter and the unresolved issue together. “C, reason?” gives you a place to restart. The 60 minutes belong to the whole Reading test, so you can adjust how you use them across passages.',
  },
} satisfies Record<string, ReadingTutorGuide>;

export const READING_FORMAT_GUIDES = {
  'true-false-not-given': {
    introduction: 'Try to finish the thought “I know this because the passage says…”. A sentence that gives the opposite fact earns FALSE. When the information you would need is missing, even after you have found the right part, the claim earns NOT GIVEN.',
    title: 'Who paid to enter the workshop?',
    passage: ['In May, the museum held two free workshops each day. From June, adults paid to attend the morning workshop. The afternoon workshop stayed free for everyone.'],
    tasks: [
      {
        instruction: 'Decide whether each statement is TRUE, FALSE or NOT GIVEN.',
        question: 'Adults paid to attend the afternoon workshop in June.',
        reasoning: ['I would mark FALSE. The word “paid” really is in the passage, but it belongs to the morning session. “Free for everyone” in the final sentence includes adults and directly contradicts the afternoon charge.'],
      },
      {
        question: 'Children paid to attend the morning workshop in June.',
        reasoning: ['This earns NOT GIVEN. You might picture a museum letting children in free. The morning price is stated only for adults. A child paying and a child entering free are both compatible with the passage. By comparison, “Adults paid for the morning workshop in June” would be TRUE.'],
      },
    ],
    transfer: 'Before you choose FALSE, try to point to the words that would make the claim impossible. If you can only point to a related fact, ask which part of the claim is still open.',
  },
  'yes-no-not-given': {
    introduction: 'A writer can describe a proposal in detail and still disagree with it. Listen for the moment the writer takes responsibility for a view. Words such as “I support”, “should” or “in my view” can help you find that moment.',
    title: 'Whose ban is it?',
    passage: ['Several shopkeepers want bicycles kept off the bridge all day. I support keeping the bridge free of bicycles during the morning school run. At other times, cyclists ought to be able to cross.'],
    tasks: [
      {
        instruction: 'Decide whether the statements agree with the writer’s views. Use YES, NO or NOT GIVEN.',
        question: 'The writer favours an all-day ban on bicycles.',
        reasoning: ['The shopkeepers do want an all-day ban. Now look at the writer’s own last sentence. “At other times” cyclists ought to be able to cross. That is a clear NO. A statement about restricting bicycles during the morning school run would earn YES.'],
      },
      {
        question: 'The writer believes that signs would make a morning ban effective.',
        reasoning: ['This asks for an opinion on signs. The writer supports a morning restriction but says nothing about how to put it into effect. You could agree with the restriction and hold either view about signs. Choose NOT GIVEN.'],
      },
    ],
    transfer: 'Put the speaker’s name or “writer” beside a strong claim. Before choosing NO, check that you have found an opposing view held by the person the question actually names.',
  },
  'matching-headings': {
    introduction: 'If two headings seem possible, try each one as the title of the whole paragraph. A good heading makes the ending feel like it belongs. An attractive detail often makes a wonderful title for just one sentence.',
    title: 'Which heading still fits at the last line?',
    passage: ['At first the village bakers wrapped every loaf in linen. The cloth kept the crust crisp on dry days, and customers asked for it by name. On wet days the cloth absorbed moisture and the loaves softened. The bakers now choose the wrapping according to the weather.'],
    tasks: [{
      question: 'Which heading best fits the paragraph?',
      options: ['i. Why customers asked for linen', 'ii. A useful wrapping with a weather-dependent limit', 'iii. The end of cloth wrapping in the village'],
      reasoning: [
        'Heading i is easy to believe. The customers really did ask for linen. Read the last two sentences under that heading, though, and the damp loaves feel like a change of subject. Those lines matter enough to alter the bakers’ routine.',
        'Heading ii gives the dry days and wet days a place in the same idea. Heading iii goes further than the final sentence. Choosing according to the weather still leaves a place for linen.',
      ],
    }],
    transfer: 'Cover the list and tell yourself what the writer has done in a few words. Then reopen the headings and test your favourite against an example and the closing line. An IELTS heading can be used only once.',
  },
  'matching-information': {
    introduction: 'A statement may ask about one quiet sentence in a paragraph whose main topic is quite different. Give yourself a small event to search for. “Someone found another use for the change” leads to a better search than the word “path”.',
    title: 'Which paragraph mentions an unexpected use?',
    passage: ['A. After rain, the smooth path to the pier became slippery. The town tested three paving materials and chose the one that gave pedestrians the best grip.', 'B. Workers laid a strip of rough stone along the edge of the path to keep walkers away from the cycle lane. Afterwards, visitors with limited sight reported that they could feel the edge with their canes. The planners had never considered that use.'],
    tasks: [{
      question: 'Which paragraph mentions a benefit that the planners had not anticipated? Choose A or B.',
      reasoning: [
        'Both paragraphs describe a safer path. A might jump out at you because testing the paving sounds like planning. But the result there is exactly what the town set out to achieve.',
        'In B the stone was meant to separate walkers and cyclists. The visitors then describe a second use. “Had never considered” gives you the missing part of the question, so B is the answer even though the word “benefit” never appears.',
      ],
    }],
    transfer: 'Carry the relationship as you scan. Here it was an intended change followed by an unexpected benefit. If you later find another detail in B, check the instructions to see whether you may use a letter again.',
  },
  'matching-features': {
    introduction: 'Several people can appear in the same short account. Try attaching a verb to each name as you read. Supplying equipment, suggesting a test and drawing a conclusion are quite different contributions.',
    title: 'Who actually made the comparison?',
    passage: ['Lin suggested weighing the food a café threw away. Karim lent the kitchen a set of scales and showed the staff how to use them. After a month, Asha compared the new figures with the café’s old purchasing records. Lin later presented Asha’s findings to the owner.'],
    tasks: [{
      question: 'Who compared the measurements with information from before the study?',
      options: ['A. Lin', 'B. Karim', 'C. Asha'],
      reasoning: [
        'Lin is a tempting choice. She started the project and is the last person named before the findings reach the owner. Presenting a finding, though, can be done by someone who never made the comparison.',
        'Look for an action on both sets of information. It is Asha who puts “the new figures” beside “old purchasing records”, so choose C. Karim helped collect measurements, one stage earlier.',
      ],
    }],
    transfer: 'When two names sit near the same finding, try the question’s verb with each name. Then return to the sentence that assigns that action. Check the instruction before using a name a second time.',
  },
  'matching-sentence-endings': {
    introduction: 'Several endings may sound perfectly natural when you read them after the beginning. Grammar can narrow your search. To decide between two fluent sentences, ask which one preserves the relationship the writer actually describes.',
    title: 'What was the damp cloth for?',
    passage: ['The thin rim of a bowl dried faster than its thick base. This sometimes pulled the bowl out of shape. The potters covered just the rim with a damp cloth so the two parts would dry at a similar rate. They painted the bowl only after it had dried.'],
    tasks: [{
      question: 'Choose the best ending. The potters placed a cloth over the rim in order to…',
      options: ['A. let the base dry as quickly as the rim.', 'B. slow the drying of the rim.', 'C. protect paint that was already on the bowl.'],
      reasoning: [
        'A and B both sound like ways of making the drying times match. Follow the hand holding the cloth. The potters cover the part that is already drying too fast. Nothing is done to speed up the base. B fits both the action and its purpose.',
        'C borrows another genuine detail. The final sentence puts painting later, which rules out protecting existing paint. Reading just the stem and the options would never tell you that.',
      ],
    }],
    transfer: 'When two endings produce grammatical sentences, name the difference in plain language. Here it was “speed up the base” or “slow down the rim”. Look for the one action that settles that choice.',
  },
  'multiple-choice': {
    introduction: 'Read the stem before the options and give it a short answer of your own. Even a rough answer like “to keep the crossing clear” helps you notice an option that repeats a true detail while answering a different question.',
    title: 'Why did the theatre change its opening time?',
    passage: ['The theatre had already bought a faster ticket printer when a new problem appeared. People waiting outside were blocking the pedestrian crossing. The manager decided to open the foyer half an hour earlier so the queue could form inside. Ticket prices stayed the same.'],
    tasks: [{
      question: 'Choose ONE answer. Why did the manager open the foyer earlier?',
      options: ['A. To give the ticket printer time to warm up', 'B. To stop waiting customers obstructing the crossing', 'C. To encourage people to buy cheaper tickets', 'D. To shorten the performance'],
      reasoning: [
        'The printer attracted my attention because it appears in the first sentence. But “had already bought” puts that purchase before the new problem. The passage never says the printer needed time to warm up.',
        'Read the reason after “so”. Moving the queue inside would clear the crossing. That is B, even though it says “obstructing” where the writer used “blocking”. C would require a price change and D would require a change to the performance itself.',
      ],
    }],
    transfer: 'Before comparing two options, finish the sentence “The question wants the reason for…”. Use whatever number of answers the instructions request. This example asks for one.',
  },
  'sentence-completion': {
    introduction: 'Put a finger over the gap and read the whole sentence. The printed words already decide quite a lot. “Made of” asks for a material. A word that names the right object can still give you the wrong kind of answer.',
    title: 'What were the mats made of?',
    passage: ['The archive moved its notebooks into cardboard boxes. To keep the boxes clear of the cold stone floor, the staff put thick cork mats underneath them.'],
    tasks: [{
      instruction: 'Use ONE WORD ONLY from the passage.',
      question: 'The boxes stood on mats made of ___.',
      reasoning: [
        '“Cardboard” is a material and it fits after “made of”. If you stopped at the first sentence, you could feel quite confident about it. Check which object that word describes. The boxes were cardboard.',
        '“Cork” belongs to the mats, so the completed sentence says they were made of cork. Copying “cork mats” would repeat information already supplied by the frame and exceed the one-word limit.',
      ],
    }],
    transfer: 'After finding a possible word, ask it two questions. Does it complete the sentence naturally? Does it describe the same object in the passage? A correct answer has to do both.',
  },
  'summary-completion': {
    introduction: 'Read past the first blank. In a summary, the surrounding sentences often tell a short story of their own. Knowing where a problem ends and a solution begins helps when two words from the same paragraph both seem to fit.',
    title: 'Follow the solution through two gaps',
    passage: ['During the trial, deliveries arrived whenever a van became free. Two vans might reach the same narrow gate together and both would have to wait. The dispatcher introduced booking slots for drivers. The gate stayed the same width, but waiting times fell.'],
    tasks: [{
      instruction: 'Choose ONE WORD ONLY from the passage for each gap.',
      question: 'When several vans arrived together, there was a delay at the gate. Once drivers were given booking (1) ___, their waiting (2) ___ fell.',
      reasoning: [
        'The first blank belongs to the change the dispatcher made. “Gate” is easy to remember because it caused the delay, but the gate stayed just as it was. The new arrangement was “booking slots”, so put “slots” in (1).',
        'Now read the result as a complete phrase. “Waiting times fell” gives you “times” for (2). If you had tackled the second gap alone, “vans” might have caught your eye. The passage reports a shorter wait, and gives no evidence that there were fewer vans.',
      ],
    }],
    transfer: 'For a fresh summary, read the supplied words between the gaps to see what holds it together. Then check the instructions. Some versions give you a list of choices, while this one asks for passage words.',
  },
  'note-completion': {
    introduction: 'A set of notes leaves out many of the little words you rely on in a sentence. The headings do some of that work instead. Read the heading above your gap before you go looking for the missing detail.',
    title: 'Which place goes under this heading?',
    passage: ['Before a concert, visiting musicians collect spare scores at the ticket office. Once the concert is over, they leave used scores in the rehearsal room, where the librarian sorts them the following morning.'],
    tasks: [{
      instruction: 'Use NO MORE THAN TWO WORDS from the passage.',
      question: 'Complete the note about returning scores.',
      figure: { kind: 'notes', heading: 'After the concert', items: ['Musicians leave used scores in the ___.', 'The librarian sorts them the next morning.'] },
      reasoning: [
        '“Ticket office” is the first place you encounter. It even has the right length. Read the note heading again. That office is where musicians collect spare scores before the concert.',
        '“Once the concert is over” takes you to the right time. Under that heading the missing place is “rehearsal room”. The note already says “the”, so the two words go straight into the gap.',
      ],
    }],
    transfer: 'If your answer would work under two headings, put the heading and the note together into one question. “Where after the concert?” tells you more than “Where?”. Follow the answer source specified in the instructions.',
  },
  'table-completion': {
    introduction: 'Read one completed row horizontally before working on the gap. It shows you what kind of comparison the table is making. At the empty cell, keep both the row label and the column heading in view.',
    title: 'Can the right material belong in the wrong cell?',
    passage: ['For the hill shelter, the builders chose stone walls and a roof of slate. The meadow shelter has timber walls. Its roof is made from reeds gathered nearby.'],
    tasks: [{
      instruction: 'Use ONE WORD ONLY from the passage.',
      question: 'Complete the missing material in the table.',
      figure: { kind: 'table', columns: ['Shelter', 'Walls', 'Roof'], rows: [['Hill', 'stone', 'slate'], ['Meadow', 'timber', '___']] },
      reasoning: [
        'A quick search for a roof brings you to “slate”. The first row already shows you where that answer belongs. At the gap, your two clues are “Meadow” on the left and “Roof” above.',
        'The passage changes to the meadow shelter in the second sentence. “Its roof” carries that shelter into the next sentence, where you find “reeds”. Timber belongs to the correct shelter too, but it sits one cell to the left.',
      ],
    }],
    transfer: 'Read the two labels as a tiny question before searching, such as “Meadow roof?”. When you find the material, follow any “its” or “their” back to the right row.',
  },
  'flow-chart-completion': {
    introduction: 'Find the two boxes on either side of the gap. Think about what has already happened and what has to be ready afterwards. That narrows your search even if the passage introduces a tool before explaining when it is used.',
    title: 'At which stage does the mesh enter the process?',
    passage: ['The workshop keeps a wooden frame fitted with fine mesh. To make a sheet of paper, staff first soak old envelopes and blend them into pulp. They pour the pulp onto the mesh to drain it. Only after the water drains away do they press the sheet flat.'],
    tasks: [{
      instruction: 'Use ONE WORD ONLY from the passage.',
      question: 'Complete the missing step.',
      figure: { kind: 'flow', steps: ['Soak the envelopes', 'Blend them into pulp', 'Drain the pulp on the ___', 'Press the sheet flat'] },
      reasoning: [
        'Two things touch the pulp, the frame and the mesh. The first sentence introduces both before the process has even started. Their order on the page cannot settle the answer.',
        'Between blending and pressing, the pulp goes “onto the mesh to drain it”. That gives you “mesh”. The frame holds the mesh in place. The question asks for the surface that the pulp drains on.',
      ],
    }],
    transfer: 'Say the step before your gap and the one after it. Then look for the action that takes you from one to the other. Process order in the chart matters even when the writer introduces the equipment in another order.',
  },
  'diagram-labeling': {
    introduction: 'Trace the pointer all the way to its tip before reading the names of the parts. A description may name several objects in the same sentence. The tip tells you which of their positions matters.',
    title: 'Which layer does marker A touch?',
    passage: ['Inside the bin, compost rests on a wire screen. Liquid passes through the small openings into a collection tray below. The tray slides out so the liquid can be emptied.'],
    tasks: [{
      instruction: 'Use NO MORE THAN TWO WORDS from the passage. Give the material and the part.',
      question: 'Label A in this side view of the bin.',
      figure: { kind: 'compost-bin' },
      reasoning: [
        'Follow A from the right towards the narrow layer below the compost. If your eye drops one space further, you reach the collection tray. That is a real part of the bin, but it is below the pointer.',
        'The text says the compost rests on a “wire screen”. That part sits above the tray and lets liquid through, just where A is pointing. Write “wire screen” to name both the material and the part within the two-word limit.',
      ],
    }],
    transfer: 'For the next marker, give its position in your own words before copying a label. “Between compost and tray” gives you two landmarks to check against the description.',
  },
  'short-answer': {
    introduction: 'Give the question its shortest complete answer in ordinary conversation first. “Where?” needs a place. “How long?” needs a duration. Then return to the passage and choose the exact words and numbers the instructions allow.',
    title: 'Where should an assistant pick up the key?',
    passage: ['The booking office accepts requests for the hall until noon. An assistant collects the key from the porter’s lodge before each event. Afterwards, keys are returned to the caretaker at the main entrance.'],
    tasks: [{
      instruction: 'Answer with NO MORE THAN TWO WORDS from the passage.',
      question: 'Where does the assistant collect the hall key?',
      reasoning: [
        'There are three places here. The booking office handles requests, and the main entrance is used when returning a key. A quick search for “key” can easily land on that last sentence.',
        'Pair the person with the action “collects”. That takes you straight to “from the porter’s lodge”. Write “porter’s lodge”. It names the place in two words. Copying the full phrase would take you over the limit.',
      ],
    }],
    transfer: 'For the next short answer, keep the question word and the action together as you scan. “Where collect?” and “where return?” lead you to different places in the same short passage.',
  },
} satisfies Record<string, ReadingTutorGuide>;

export const MIXED_READING_GUIDE: ReadingTutorGuide = {
  introduction: 'A new instruction can change what you do with a paragraph you have just read. Work through the two questions about the book locker. Notice when you need to judge a claim and when you need to lift one exact word.',
  title: 'One book locker, two different answers',
  passage: ['The library put a book locker beside the railway station. A library card is required to take a book out. Anyone may return a book through the slot. Library staff empty the returns compartment every Friday before the weekend rush.'],
  tasks: [
    {
      instruction: 'Use TRUE, FALSE or NOT GIVEN.',
      question: 'Only library cardholders may return a book to the locker.',
      reasoning: ['It is tempting to stop at “a library card is required”. Read what the card is required for. That sentence is about taking a book out. “Anyone may return a book” directly contradicts the claim about returns. Mark FALSE.'],
    },
    {
      instruction: 'Answer with ONE WORD ONLY from the passage.',
      question: 'On which day do staff empty the returns compartment?',
      reasoning: ['This time you need a day you can write down. “Weekend” is nearby, but it tells you when the rush comes. “Every Friday” tells you when staff empty the compartment. Write “Friday”. Copying “every Friday” would break the one-word limit.'],
    },
  ],
  transfer: 'When the format changes halfway through a passage, put a finger on the new instruction before carrying on. You can keep the same paragraph map while changing what counts as an answer.',
};
