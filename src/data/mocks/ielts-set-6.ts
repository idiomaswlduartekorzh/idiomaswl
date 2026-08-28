import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-6',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 6',
  subtitle: 'Paper · Rewilding Europe · The Gig Economy',
  timeMinutes: 164,
  sections: [
    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-6.mp3',
      title: 'Listening — Section 1: Renting a Bicycle',
      instructions: 'You will hear a conversation between a bicycle-hire assistant and a customer. Listen and answer Questions 1–10.',
      transcript: `AGENT: Hello, Riverside Cycle Hire. What can I do for you?

CUSTOMER: Hi, I'd like to rent a bicycle for a few days while I'm visiting.

AGENT: No problem at all. Can I start with your name?

CUSTOMER: Sure, it's Daniel Fletcher.

AGENT: Could you spell the surname?

CUSTOMER: Yes, it's F-L-E-T-C-H-E-R.

AGENT: Thanks, Mr Fletcher. And the best number to reach you on?

CUSTOMER: It's 07531 480926.

AGENT: Got it. How long will you need the bike for?

CUSTOMER: For three days, please — I'm here until Thursday.

AGENT: Fine. And what sort of bike were you after? We do road bikes and mountain bikes.

CUSTOMER: I was going to go for a road bike, but actually I'll take a mountain bike — some of the trails here are quite rough.

AGENT: Good choice for the trails. Now, we do ask for a deposit. Will you be paying by cash or card?

CUSTOMER: By card, if that's alright.

AGENT: Of course. Would you like any extras? A lot of people hire a helmet.

CUSTOMER: Yes, I'll definitely take a helmet — safety first.

AGENT: Sensible. And don't worry about breakdowns: a repair kit is included free with every rental.

CUSTOMER: That's reassuring. Where do I bring the bike back?

AGENT: Before we get to returns, let me check the frame size. How tall are you?

CUSTOMER: About one metre eighty.

AGENT: Then a large frame should be comfortable. We can adjust the saddle when you collect it. A lock is attached to every bicycle, but a front basket costs extra.

CUSTOMER: I won't need a basket. Can I collect the bike this evening?

AGENT: Yes. Please bring photo identification. We close at half past six, so arrive by six to leave enough time for the safety check.

AGENT: We have two branches, but hired bikes must be returned to the central branch, near the market square.

CUSTOMER: Central branch, noted. Could you run through the prices?

AGENT: Certainly. The hourly price is useful for a short ride, whereas the daily rate covers any period up to closing time. If the bicycle comes back late, another day is charged. The deposit is only held on your card and released after we inspect the bike.

AGENT: Certainly. A mountain bike is five pounds an hour, or eighteen pounds for a full day. The deposit on that one is thirty pounds, and it comes with lights fitted.

CUSTOMER: And the electric bikes?

AGENT: An electric bike is nine pounds an hour, or thirty-five pounds a day, with a fifty-pound deposit. Each electric bike also comes with its own charger.

CUSTOMER: Perfect. I'll take the mountain bike for three days.

AGENT: Wonderful. Your booking starts at five this afternoon and ends at five on Thursday. The basic price covers ordinary mechanical faults, but not damage caused by leaving the bicycle unlocked. If anything goes wrong on a trail, call the assistance number printed on the key tag rather than attempting a major repair yourself.

CUSTOMER: Understood. Is there a suggested route for someone who knows the city centre but not the countryside?

AGENT: The canal path is easy and well signposted. The woodland loop is rougher and can become muddy after rain, which is another reason your chosen bike is suitable. We give every customer a paper map, and the same routes are available on our website.

CUSTOMER: Great. I'll bring my identification and see you before six.

AGENT: Excellent. I'll prepare the large frame for you.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Riverside Cycle Hire',
          example: 'Name:  Daniel Fletcher',
          template: `Phone: 07531 480926

• Customer needs the bike for {{1}} days
• Customer chooses a {{2}} bike (not a road bike)
• The deposit will be paid by {{3}}
• Customer decides to hire a {{4}}
• A repair {{5}} is included free
• Bikes must be returned to the {{6}} branch`,
          blanks: [
            { num: 1, answers: ['3', 'three'], maxWords: 1 },
            { num: 2, answers: ['mountain'], maxWords: 1 },
            { num: 3, answers: ['card'], maxWords: 1 },
            { num: 4, answers: ['helmet'], maxWords: 1 },
            { num: 5, answers: ['kit'], maxWords: 1 },
            { num: 6, answers: ['central'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Bike type', 'Hourly rate', 'Daily rate', 'Deposit', 'Includes'],
          rows: [
            [
              'Mountain bike',
              { num: 7, answers: ['5', '£5', 'five'], maxWords: 1 },
              '£18',
              { num: 8, answers: ['30', '£30', 'thirty'], maxWords: 1 },
              'lights',
            ],
            [
              'Electric bike',
              '£9',
              { num: 9, answers: ['35', '£35', 'thirty-five'], maxWords: 1 },
              '£50',
              { num: 10, answers: ['charger'], maxWords: 1 },
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-6.mp3',
      title: 'Listening — Section 2: New Leisure-Centre Tour',
      instructions: 'You will hear a guide talking to visitors at a new leisure centre. Listen and answer Questions 11–20.',
      transcript: `Good afternoon, everybody, and welcome to the grand opening of the Oakhill Leisure Centre. My name's Priya, and I'll be showing you round our new building this afternoon. It has taken nearly two years to build, and I think you'll agree it's been well worth the wait.

Let me begin with what's actually new here, because there's been some confusion. The swimming pool, although it looks brand new, was in fact refurbished from the old centre, and the café has simply been expanded. The sports hall is the same one many of you will remember. What is genuinely new are two things we're very proud of: a full climbing wall, the tallest in the region, and a Finnish-style sauna next to the changing rooms. Those two are completely new additions.

The entrance level has also been reorganised. Reception is directly ahead, with step-free access from the car park and a lowered section of desk for wheelchair users. The lift serves both floors, and signs use the same colours as the printed plan. These are improvements to the building rather than separate sports facilities, but they should make a first visit much easier.

Now, some useful information. On weekdays the centre opens at seven in the morning, which is early enough for a swim before work. Do note that it closes early on Sundays, at four rather than the usual ten, so plan your weekend visits accordingly.

The centre opens at eight on Saturdays. The pool timetable varies because lanes are reserved for lessons at certain times, so check before travelling if you want uninterrupted lane swimming. Last entry is forty-five minutes before closing, and staff begin clearing activity areas fifteen minutes later.

Let's talk membership. A standard membership costs forty pounds per month, which gives you unlimited access to all the facilities. As a welcome offer, every new member also gets a free session with a personal trainer to set up a fitness plan.

That introductory appointment is optional, but it is useful if you have not exercised recently. The trainer will ask about injuries and demonstrate how to adjust the equipment. Members can then book further appointments at the normal rate. Day passes are available for visitors who do not want a monthly contract.

A few notes on the facilities themselves. The pool has a special shallow area for toddlers, so it's ideal for families with young children. One small practical point: the lockers require a pound coin, which you get back at the end, so do keep one handy.

Family changing rooms are beside the pool entrance, and accessible changing spaces have larger benches and emergency cords. Please do not leave valuables in an unlocked cubicle; reception can hold a small item if necessary.

Finally, our timetable of classes is packed. We offer everything from spinning to boxing, but by far the most popular class is yoga — the morning sessions fill up within minutes, so do get here early if you'd like a space on the floor. To secure a place, all booking is done through the centre's website, so please create an account before you leave today.

Bookings open seven days ahead and can be cancelled without charge up to two hours before a class. If a session is full, join the waiting list: the system will send a message if another member cancels.

Right, if you'd like to follow me, we'll start with the climbing wall. Please stay together as we go.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO facilities at the centre are completely new?',
          options: [
            { letter: 'A', text: 'the climbing wall' },
            { letter: 'B', text: 'the swimming pool' },
            { letter: 'C', text: 'the café' },
            { letter: 'D', text: 'the sports hall' },
            { letter: 'E', text: 'the sauna' },
          ],
          selectCount: 2,
          answers: ['A', 'E'],
        },
        {
          type: 'formgroup',
          id: 'l2-form',
          part: 2,
          qRange: [13, 20],
          groupLabel: 'Complete the notes below.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          title: 'Oakhill Leisure Centre',
          template: `Opening times

• On weekdays the centre opens at {{13}}.
• It closes early on {{14}}.

Membership

• A standard membership costs {{15}} per month.
• Every new member gets a free {{16}} with a trainer.

Facilities

• The pool has a special shallow area for {{17}}.
• The lockers require a {{18}} coin.

Classes

• The most popular class is {{19}}.
• All booking is done through the centre's {{20}}.`,
          blanks: [
            { num: 13, answers: ['seven', '7'], maxWords: 1 },
            { num: 14, answers: ['Sundays'], maxWords: 1 },
            { num: 15, answers: ['40', '£40', 'forty'], maxWords: 1 },
            { num: 16, answers: ['session'], maxWords: 1 },
            { num: 17, answers: ['toddlers', 'children'], maxWords: 1 },
            { num: 18, answers: ['pound', '£1', '1'], maxWords: 1 },
            { num: 19, answers: ['yoga'], maxWords: 1 },
            { num: 20, answers: ['website'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-6.mp3',
      title: 'Listening — Section 3: Marketing Coursework Discussion',
      instructions: 'You will hear a tutor and two students discussing a marketing coursework assignment. Listen and answer Questions 21–30.',
      transcript: `TUTOR: Come in, Sophie, Mark. Let's go over your marketing coursework. Remind me what the main focus is.

SOPHIE: Well, at first we thought about comparing two rival brands, and we also considered designing a brand-new product. But in the end we decided to analyse a real marketing campaign — the "Go Green" campaign from last year.

TUTOR: A sensible choice, and there's plenty to say about it. Sophie, why did you pick that clothing company in particular?

SOPHIE: Honestly, it's not because they're especially famous, though they are. The real reason is that they've published a lot of their sales data, so I actually have the figures to work with.

TUTOR: That's exactly the right thinking — data makes all the difference. Real figures are always far more convincing to an examiner than personal opinions. Now, I've read your draft. The introduction is strong, and your word count is fine. What really needs work is your survey questions — several of them are quite leading.

MARK: We wondered about that. We also weren't happy with the survey itself.

TUTOR: In what way?

MARK: The main issue was that we simply didn't get enough responses — only about thirty people replied, so it's hard to draw firm conclusions.

TUTOR: Yes, thirty is too few. Try sharing it more widely this time. And how are you planning to present your findings?

SOPHIE: We thought about making a short video, but we've settled on a set of slides — it feels more professional for this kind of report.

TUTOR: Slides work well, provided they support the argument rather than become the argument. How many are you planning?

MARK: Twelve, including the opening and references.

TUTOR: That sounds manageable. Put the research question near the beginning, then explain your method before showing results. The audience should understand who answered the survey and why those respondents are relevant. Do not place a paragraph of prose on every slide.

SOPHIE: We have three charts for the sales figures and two for the survey. Is that too many?

TUTOR: Not if each earns its place. Compare the campaign period with a sensible earlier period, and distinguish a change in sales from proof that the campaign caused it. Competitor prices and seasonal demand could also have contributed.

MARK: So the conclusion needs to acknowledge those limitations?

TUTOR: Exactly. A cautious conclusion is stronger than a dramatic claim the evidence cannot support. Now, let's turn that into a submission checklist. First, add a clear label to each chart, otherwise the reader gets lost.

SOPHIE: A label that states the measure and time period, not just “Chart One”.

TUTOR: Correct. Next, reference all sources accurately, including websites and the company's published dataset.

MARK: We have used one citation style consistently.

TUTOR: Good. Keep the tone formal throughout — no slang or advertising language. Then proofread carefully for spelling. Reading aloud can catch errors that a spellchecker misses.

SOPHIE: Should we submit the spreadsheet as well?

TUTOR: Keep it in case I ask to see your calculations, but upload the report itself as a PDF, not a Word document. Open the exported file once before submission to check that charts, page numbers and references have not moved. Do all of that, and you'll be in a strong position for a good mark.

MARK: Got it. Thanks very much.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'The main focus of the coursework is',
          options: [
            'comparing two brands',
            'designing a new product',
            'analysing a marketing campaign',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'Sophie chose the clothing company because',
          options: [
            'it is very well known',
            'she has data on it',
            'it is a local firm',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'The tutor thinks the students should improve',
          options: [
            'the introduction',
            'the survey questions',
            'the word count',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'The problem with the survey was that there were',
          options: [
            'too few responses',
            'unclear results',
            'a biased sample',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'The students will present their findings using',
          options: [
            'a poster',
            'slides',
            'a video',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `• Add a clear {{26}} to each chart.
• Reference all {{27}} correctly.
• Keep the tone {{28}} throughout.
• Proofread carefully for {{29}}.
• Upload the file as a {{30}}.`,
          blanks: [
            { num: 26, answers: ['label'], maxWords: 1 },
            { num: 27, answers: ['sources'], maxWords: 1 },
            { num: 28, answers: ['formal'], maxWords: 1 },
            { num: 29, answers: ['spelling'], maxWords: 1 },
            { num: 30, answers: ['PDF'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-6.mp3',
      title: 'Listening — Section 4: The History of Tea',
      instructions: 'You will hear a lecture about the history of tea. Listen and answer Questions 31–40.',
      transcript: `Good morning. Today's lecture traces the long and fascinating history of tea, a drink now enjoyed by billions of people every day.

Let's begin at the very start. Tea was first drunk in China thousands of years ago. Chinese legend credits its discovery to an emperor whose boiling water was flavoured by falling leaves, but a legend is not a dated historical record. Early written references show tea being valued for practical effects before it became an everyday social drink: it was taken as a medicine and associated with alertness and digestion. Preparation varied by period and region, but dried leaves remained the essential ingredient.

From China, tea gradually spread across Asia. It was carried to Japan by monks, who had studied in Chinese monasteries and brought the custom home with them. Tea could help them remain awake during meditation. Over centuries, elite practice, religious influence and local aesthetics shaped several traditions. The formal tea ceremony often mentioned in introductions to Japanese culture was therefore not created in a single moment; it developed through changing schools and conventions governing utensils, space and movement.

Now, how did tea reach the West? Portuguese traders and missionaries encountered it in Asia, and Portuguese trading networks were among the first to ship tea to Europe in the sixteenth century. Dutch merchants then developed regular commercial imports, while the British became major consumers and traders later. Tea was initially expensive. European buyers sent large quantities of silver to China because Chinese sellers had limited interest in European manufactured goods, creating a trade imbalance that governments and merchants tried to alter.

This brings us to colonial mass production. British commercial and imperial institutions expanded plantations in India, particularly in Assam, and later in other territories. Larger supplies and new transport networks helped lower retail prices and made tea an everyday drink for more consumers. However, we should not romanticise this period. Land, labour and trade were governed through unequal colonial systems, and conditions were often extremely hard for plantation workers, whose pay, housing and freedom to leave could all be restricted.

Finally, a word about convenience. For centuries tea was brewed loose in a pot. Patents for small holders and infusers appeared before disposable bags became common, and the popular story that customers accidentally dipped a merchant's silk sample pouches is difficult to verify. What is clear is that the tea bag spread during the twentieth century as materials and packing machinery improved. It made a single cup quicker and cleaner to prepare, although loose tea continued to dominate in many markets.

This history is not a straight line from an ancient discovery to a modern product. Tea changed as it moved: cultivation, taxation, empire, advertising and domestic routines all affected who drank it and how. When evaluating a neat origin story, historians compare it with objects, commercial records and dated texts rather than treating repetition as proof.

The same caution applies to the word “first”. A community may know a plant before it leaves a surviving written record, while an invention can have separate stages of cultivation, processing and commercial distribution. For the exam notes, remember the documented sequence, but for historical analysis remember the uncertainty behind it and the limits of each surviving source.

Next week, we'll look at the science of how tea affects the body. Thank you.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'THE HISTORY OF TEA',
          template: `Origins

• Tea was first drunk in {{31}} thousands of years ago.
• It was originally taken as a {{32}}.
• Early tea was made from dried {{33}}.

Spread across Asia

• Tea was carried to Japan by {{34}}.
• In Japan a formal tea {{35}} developed.

Arrival in Europe

• Tea was first shipped to Europe by {{36}} traders.
• Europeans paid for their tea with {{37}}.

Mass production

• The British set up large {{38}} in India.
• Conditions were often hard for the {{39}}.
• In the early 1900s the tea {{40}} was invented.`,
          blanks: [
            { num: 31, answers: ['China'], maxWords: 1 },
            { num: 32, answers: ['medicine'], maxWords: 1 },
            { num: 33, answers: ['leaves'], maxWords: 1 },
            { num: 34, answers: ['monks'], maxWords: 1 },
            { num: 35, answers: ['ceremony'], maxWords: 1 },
            { num: 36, answers: ['Portuguese'], maxWords: 1 },
            { num: 37, answers: ['silver'], maxWords: 1 },
            { num: 38, answers: ['plantations', 'plantation'], maxWords: 1 },
            { num: 39, answers: ['workers'], maxWords: 1 },
            { num: 40, answers: ['bag', 'bags'], maxWords: 1 },
          ],
        },
      ],
    },

    // ─── READING ──────────────────────────────────────────────────────────────

    {
      part: 5,
      skill: 'reading',
      title: 'Reading — Passage 1: The History of Paper',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The History of Paper

Paper is so familiar that its history is often reduced to a single inventor and date. Before it became widespread, societies stored information on materials with different strengths and costs: clay tablets in Mesopotamia, papyrus along the Nile, parchment around the Mediterranean, and silk or bamboo strips in ancient China. None prevented complex administration or literature, but weight, preparation and price affected what could be copied, transported and preserved.

A Chinese historical record reports that in 105 CE Cai Lun, an official at the Han court, presented an improved method using materials such as bark, hemp, rags and old fishing nets. The fibres were separated in water, collected as a thin layer on a screen, pressed and dried. Older fragments found by archaeologists mean that Cai Lun cannot safely be called paper's sole inventor. His importance lies instead in the recorded refinement and promotion of a process that produced a light, flexible writing surface.

Defining paper matters to that debate. A sheet formed when dispersed fibres settle and bond is structurally different from strips woven together, a skin scraped into parchment or papyrus made by pressing layers of plant stem. Ancient fragments can be tiny, contaminated or difficult to date in direct association with their archaeological context. Historians therefore combine fibre analysis, excavation records and written accounts. A new find may change the earliest secure date without proving who first understood the full process or how quickly a technique spread beyond one workshop.

Papermaking travelled through East and Central Asia over centuries. A famous later account says that Chinese prisoners captured after the Battle of Talas in 751 taught the craft to their captors. Historians treat this as a story rather than a demonstrated moment of transfer: paper was already known in Central Asia, the account was written much later, and surviving evidence does not identify captive papermakers. What can be documented is rapid expansion through Islamic lands after this period. Production was established in Baghdad by the end of the eighth century, in Egypt by the end of the ninth, and use had reached the Iberian Peninsula by the end of the tenth.

In Europe, paper initially coexisted with parchment—made from animal skin—which remained preferred for some important documents because of its durability. Printing from carved blocks and movable type had developed earlier in East Asia. In Europe, Johannes Gutenberg's system of movable metal type, oil-based ink and a press around the mid-fifteenth century enabled repeated production on a new scale. Printers required quantities of writing material that parchment could not economically supply. Paper and printing reinforced one another: editions grew, the unit cost of books fell, and a wider circulation of texts contributed to religious, scientific and political debate. Literacy did not rise automatically, however; schooling, language and censorship still shaped access.

Modern paper production bears little resemblance to workshop manufacture. Mechanised machines appeared during the industrial revolution, and wood pulp gradually replaced rags as the main raw material. The sector uses substantial quantities of fibre, water and energy, so impacts depend on forest management, mill technology, transport and what happens after use. Responses include certified fibre, cleaner bleaching, closed-loop water systems and recovery of used paper. Recycling figures require care: a collection or recycling rate is not the same as the proportion of recycled fibre in every new sheet. The European paper value chain reported a 75.1 per cent recycling rate for paper and board consumed in 2024, while individual grades differed considerably.

Predictions of a completely “paperless office” also confused one category with the whole material. Digital communication reduced demand for some printing and office grades, while e-commerce increased demand for packaging paper and cardboard. Tissue, books and food packaging have different technical and hygiene requirements, and recovered fibres cannot be recycled indefinitely because they shorten and deteriorate. The future of paper is therefore not a simple contest between sheets and screens. It depends on product design, reuse, fibre recovery, responsible forestry and whether paper replaces a material with a larger impact or merely adds more consumption.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: The physical properties and price of writing materials affected how information circulated.\n2. {{2}}: Archaeological evidence confirms that Cai Lun was the sole inventor of paper.\n3. {{3}}: The historical record associated with Cai Lun describes an improved production method.\n4. {{4}}: Contemporary evidence proves that prisoners captured at Talas introduced papermaking to Islamic lands.\n5. {{5}}: Parchment was considered more durable than paper for some European documents.\n6. {{6}}: European movable-type printing helped reduce the unit cost of books.\n7. {{7}}: Europe reported recycling about three quarters of the paper and board it consumed in 2024.`,
          blanks: [
            { num: 1, answers: ['TRUE'] },
            { num: 2, answers: ['FALSE'] },
            { num: 3, answers: ['TRUE'] },
            { num: 4, answers: ['FALSE'] },
            { num: 5, answers: ['TRUE'] },
            { num: 6, answers: ['TRUE'] },
            { num: 7, answers: ['TRUE'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r1-table',
          part: 5,
          qRange: [8, 13],
          groupLabel: 'Complete the table below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          title: 'History of Paper — Key Events',
          template: `8. 105 CE — Cai Lun's method: Sheets were made from separated {{8}} and other materials.\n9. After the eighth century: Papermaking expanded through {{9}} lands.\n10. Mid-15th century — European printing: Created demand for paper that {{10}} could not economically supply.\n11. Industrial era: {{11}} replaced rags as the main raw material.\n12. Modern mills: Some adopted {{12}} systems to reduce water demand.\n13. Digital era: {{13}} demand grew alongside e-commerce.`,
          blanks: [
            { num: 8,  answers: ['fibres'] },
            { num: 9,  answers: ['Islamic'] },
            { num: 10, answers: ['parchment'] },
            { num: 11, answers: ['Wood pulp'] },
            { num: 12, answers: ['closed-loop', 'closed-loop water'] },
            { num: 13, answers: ['Packaging', 'Packaging paper'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: Rewilding Europe',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Rewilding Europe

A. When a European field stops being farmed, nature does not wait for a conservation plan: scrub advances, animals move and water finds new paths. Rewilding asks how policy can give such processes more room while restoring missing ecological functions. This differs from managing every reserve towards a fixed picture of the past. Traditional protection has saved species and habitats, but isolated or intensively maintained fragments may lack the scale and connections needed for long-term adaptation. Rewilding can therefore involve passive recovery, removal of barriers or active return of a species; it is an approach, not one identical recipe.

B. One idea associated with rewilding is the trophic cascade: a change near the top of a food web may produce indirect effects at lower levels. Grey wolves were reintroduced to Yellowstone National Park in the United States in 1995 and 1996, after which elk numbers, browsing patterns and some vegetation changed. A popular account says wolves consequently restored plants, beavers and even river channels. Researchers agree that predator recovery had ecological effects, but debate the strength and route of this particular cascade. Other predators, hunting, climate, groundwater and the legacy of earlier browsing also changed. Yellowstone is therefore a useful hypothesis and case study, not proof that adding one predator will automatically produce the same chain everywhere.

C. In Europe, advocates point to the recovery of large native animals. Wolves, bears and lynx are carnivores, whereas the wisent, or European bison, is a large herbivore; each has a different ecological role and cannot be treated as an interchangeable symbol. Some recovery has occurred through natural range expansion. Wolves spread from surviving populations into parts of France, Germany and the Netherlands without direct release in those places, aided by legal protection and connected habitat. Lynx and wisent recovery has relied more heavily on reintroduction or reinforcement in selected landscapes. Return alone is not the final measure of success: population viability, genetic diversity, ecological function and coexistence with people must also be monitored.

D. The recovery of beavers offers a different test. By building dams and channels, beavers can create wetland habitat, retain sediment and delay some storm water. The licensed River Otter Beaver Trial in Devon combined field monitoring with evidence about ecology, farming and local attitudes. Results vary by site because dams, valley shape and rainfall differ. In another Devon catchment, beaver dams operated alongside human-built “leaky dams” and other measures; together these interventions reduced peak flow by 23 percent. That result supports catchment restoration, but it should not be attributed to beavers alone or converted into a universal flood-prevention percentage.

E. Critics of rewilding raise legitimate concerns. Farmers and landowners are understandably anxious about the return of large predators that may attack livestock. The economic impact can be severe for individual producers, even if the overall ecological and economic benefits are positive. In some regions of Europe, compensation schemes for livestock losses to wolves and bears have helped reduce conflict, but enforcement and adequacy of payments remain contentious. There are also concerns about whether rewilded landscapes can be maintained at sufficient scale: wildlife needs vast corridors of connected habitat to thrive, and much of Europe is densely settled and intensively farmed.

F. Perhaps the most significant challenge is cultural. The idealised European landscape—neatly farmed fields, managed forests, picturesque villages—reflects centuries of human shaping of the land. For many rural communities, the arrival of wolves or the flooding caused by beavers represents not a restoration of nature but an unwelcome disruption of their way of life. Successful rewilding programmes have found that community involvement, transparent communication, and genuine local benefit-sharing are as important as ecological science.

G. Despite these obstacles, proponents have set large targets. Rewilding Europe's 2030 strategy distinguishes land and water under direct rewilding management from a wider area under rewilding influence. It aims for 500,000 hectares under direct management across 15 landscapes and at least one million hectares under influence by 2030. At the end of 2024, it reported just under 65,000 hectares under direct management and slightly more than 811,000 under influence. The categories matter when judging progress. Supporters also argue that functioning ecosystems can support wildlife tourism, sustainable fishing and lower costs for services such as flood management. Those benefits require evidence and local participation rather than an assumption that every project will pay for itself.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'An example of a carnivore species recovering in Europe without direct human intervention', answer: 'C' },
            { num: 15, stem: 'A warning that a famous predator example has a disputed causal explanation', answer: 'B' },
            { num: 16, stem: 'A result that should not be attributed to one intervention alone', answer: 'D' },
            { num: 17, stem: 'A reference to the cultural significance of traditional agricultural landscapes', answer: 'F' },
            { num: 18, stem: 'A statement of the limitations of traditional conservation approaches', answer: 'A' },
            { num: 19, stem: 'Two different area targets set by a rewilding organisation', answer: 'G' },
            { num: 20, stem: 'An explanation of difficulties in compensating farmers for losses', answer: 'E' },
          ],
          endings: [
            { letter: 'A', text: 'Paragraph A' }, { letter: 'B', text: 'Paragraph B' },
            { letter: 'C', text: 'Paragraph C' }, { letter: 'D', text: 'Paragraph D' },
            { letter: 'E', text: 'Paragraph E' }, { letter: 'F', text: 'Paragraph F' },
            { letter: 'G', text: 'Paragraph G' },
          ],
        },
        {
          type: 'formgroup',
          id: 'r2-sent',
          part: 6,
          qRange: [21, 26],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `21. An indirect change through levels of a food web is known as a {{21}}.\n22. The recovery of large animals also requires connected {{22}}.\n23. Combined measures in one Devon catchment reduced {{23}} by 23 percent.\n24. Financial {{24}} for livestock losses have been introduced in some regions to reduce conflict with farmers.\n25. Rewilding advocates argue that functioning ecosystems can generate income through {{25}} tourism.\n26. Rewilding Europe aims for at least {{26}} under rewilding influence by 2030.`,
          blanks: [
            { num: 21, answers: ['trophic cascade'] },
            { num: 22, answers: ['habitat'] },
            { num: 23, answers: ['peak flow'] },
            { num: 24, answers: ['compensation schemes', 'compensation'] },
            { num: 25, answers: ['wildlife'] },
            { num: 26, answers: ['one million hectares'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: The Gig Economy',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `The Gig Economy

A passenger sees a car moving across a phone screen; its driver sees an offer, a price and a rating that may affect the next offer. The term “gig economy” covers short assignments, freelance work and on-demand services, many now coordinated by digital platforms. Not all independent work is new, and not every freelancer uses an app, but platforms have altered the speed and scale at which clients and workers are matched. To supporters this can loosen the constraints of a fixed job; to critics it can move commercial risk away from a firm while weakening labour protection.

Advocates of platform-based work stress flexibility. The ability to choose when to log in, work remotely in some occupations or supplement another income can be valuable to students, carers and people combining several roles. A 2016 McKinsey Global Institute report found that most independent workers in its European and United States sample worked independently by choice. However, “independent work” in that research was broader than app-based gig work: it also included traditional freelance, temporary and self-employed activity. The finding cannot automatically describe every delivery rider or online contractor.

Critics focus on people who rely on gigs as their primary income or lack a realistic alternative. Without guaranteed hours, budgeting becomes difficult; depending on legal status, sick pay, paid leave and employer pension contributions may be absent. Earnings are also hard to compare with an employee's wage. A driver's fuel, vehicle wear, insurance and time waiting for a task can be work-related costs even when an app reports only payment for an accepted trip. Results vary across occupations and places, so a single headline hourly rate may either exaggerate or understate financial security.

Legal classification has emerged as a central battleground. In most legal systems, workers fall into one of three categories: employees (with full protections), independent contractors (with minimal protections), or—in some jurisdictions—a middle category of "worker" with intermediate rights. Platform companies have typically classified their workers as independent contractors, arguing that they operate as independent businesses using the platform as a tool. In 2021, the UK Supreme Court rejected this classification in the case of Uber BV v Aslam, ruling that Uber drivers were "workers" entitled to minimum wage guarantees and holiday pay when logged in and available to accept rides. Similar decisions have followed in France, Spain, and the Netherlands.

The regulatory response is evolving rapidly but unevenly. The European Union proposed platform-work legislation in 2021 and adopted Directive (EU) 2024/2831 in October 2024. Member states must create an effective legal presumption of employment when facts indicating direction and control are found, under their national systems; the directive does not simply declare every platform worker an employee. It also regulates automated monitoring and decision-making, requires information about the systems in use and limits the processing of certain personal data. National implementation and litigation will still produce differences, but the measure is no longer merely a proposal.

Algorithmic management raises issues even when employment status is undisputed. A platform may allocate tasks, vary prices, rank performance or restrict an account using data that a worker cannot inspect. Automation can coordinate a large market efficiently, yet an unexplained suspension may immediately remove someone's income. Meaningful human review requires more than placing a person at the end of an appeal form: the reviewer needs authority, relevant information and time to reconsider the decision. Transparency also has limits, because publishing every detail of an allocation system could enable manipulation. Regulation must balance explanation, privacy, commercial secrecy and the ability to contest consequential errors.

Academic perspectives on the gig economy's overall impact diverge. Some economists argue that platforms reduce transaction costs and match supply to demand more efficiently, potentially increasing work opportunities and output. Others contend that precarious arrangements shift risk from capital to labour, weaken bargaining power and complicate funding for social protection. Measurement makes the disagreement harder to resolve. A person may complete occasional online tasks while holding a conventional job and may not identify as a gig worker in a survey. Platforms also define active workers differently. Official labour statistics designed around a main job can therefore undercount or classify the same activity differently, obscuring both scale and change over time.

What appears clear is that the gig economy is not a temporary aberration but a structural feature of modern labour markets, shaped by technology, globalisation and shifting expectations about work. Whether it expands or contracts human freedom cannot be answered from flexibility alone. The outcome depends on regulation, enforcement, platform design and the worker's bargaining position. It also depends on transparency: workers need to know how pay, access to tasks, ratings and suspension decisions are determined if they are to challenge an error or make an informed choice.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'Which of the following best describes the McKinsey research discussed in the passage?',
          options: [
            'The majority of gig workers had been forced into independent work by redundancy.',
            'Most independent workers chose gig work voluntarily and expressed satisfaction with it.',
            'Gig workers in developing countries reported higher satisfaction than those in developed countries.',
            'The survey found that most gig workers wished to transition to traditional employment.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'Why does the passage say that a headline hourly rate may be misleading?',
          options: [
            'Platforms always report earnings before tax.',
            'Workers may receive several payments for the same task.',
            'Costs and waiting time may not be included in the reported rate.',
            'National minimum wages never apply to independent work.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'What was the significance of the UK Supreme Court ruling in Uber BV v Aslam?',
          options: [
            'It classified Uber drivers as independent contractors with enhanced rights.',
            'It established that drivers were employees with full employment protections.',
            'It ruled that drivers qualified as "workers" and were entitled to minimum wage and holiday pay.',
            'It prevented Uber from operating in the United Kingdom.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'What does the passage say about the EU Platform Work Directive?',
          options: [
            'It automatically classifies every platform worker as an employee.',
            'It addresses employment status and the use of automated management systems.',
            'It applies only to ride-hailing companies operating in one country.',
            'It was proposed in 2024 but has not yet been adopted.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: The gig economy has grown primarily because digital platforms have reduced the need for labour.\n32. {{32}}: Platform companies have generally preferred to classify workers as independent contractors.\n33. {{33}}: The EU Platform Work Directive was fully adopted and implemented by 2022.\n34. {{34}}: Some economists argue that platform work can improve employment opportunities and economic output.\n35. {{35}}: Official labour statistics reliably capture the full extent of gig work.\n36. {{36}}: The writer suggests that the effects of gig work depend partly on regulatory decisions.`,
          blanks: [
            { num: 31, answers: ['NOT GIVEN'] },
            { num: 32, answers: ['YES'] },
            { num: 33, answers: ['NO'] },
            { num: 34, answers: ['YES'] },
            { num: 35, answers: ['NO'] },
            { num: 36, answers: ['YES'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r3-sent',
          part: 7,
          qRange: [37, 40],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `37. Workers who have full employment protections are classified as {{37}} in most legal systems.\n38. The EU directive requires national systems to provide a {{38}} when facts indicate direction and control.\n39. The difficulty of measuring the gig economy is partly due to its undercount in {{39}} statistics.\n40. The passage describes the gig economy as a {{40}} feature of modern labour markets, not a temporary trend.`,
          blanks: [
            { num: 37, answers: ['employees'] },
            { num: 38, answers: ['legal presumption'] },
            { num: 39, answers: ['official labour', 'official'] },
            { num: 40, answers: ['structural'] },
          ],
        },
      ],
    },

    // ─── WRITING ──────────────────────────────────────────────────────────────

    {
      part: 8,
      skill: 'writing',
      title: 'Writing — Task 1',
      instructions: 'You should spend about 20 minutes on this task. Write at least 150 words.',
      questions: [
        {
          type: 'write',
          id: 'w1',
          part: 8,
          taskNumber: 1,
          imageUrl: '/assets/ielts/charts/set6-task1.svg',
          imageAlt: 'Line graph comparing the percentage of households with home internet access in the Central, North, Riverside, East and South districts of Bellmere from 2000 to 2022',
          stimulus: 'The line graph below shows the percentage of households with home internet access in five districts of Bellmere between 2000 and 2022.',
          text: 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
          minWords: 150,
        },
      ],
    },

    {
      part: 9,
      skill: 'writing',
      title: 'Writing — Task 2',
      instructions: 'You should spend about 40 minutes on this task. Write at least 250 words.',
      questions: [
        {
          type: 'write',
          id: 'w2',
          part: 9,
          taskNumber: 2,
          stimulus: 'Digital services increasingly use automated systems to decide which news, job opportunities or prices people see. Some believe users should always be told when such a system has materially influenced a significant decision. To what extent do you agree or disagree?',
          text: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
          minWords: 250,
        },
      ],
    },

    // ─── SPEAKING ────────────────────────────────────────────────────────────

    {
      part: 10,
      skill: 'speaking',
      title: 'Speaking',
      instructions: 'Answer the following questions.',
      questions: [
        {
          type: 'speak',
          id: 'sp1',
          part: 10,
          partNumber: 1,
          text: 'Part 1 — Personal questions about technology use',
          followUp: [
            'How much time do you spend on your phone or computer each day?',
            'What do you mainly use the internet for?',
            'Have your technology habits changed in the last few years? How?',
            'Do you think you spend too much time on screens?',
            'Which device do you find easiest to use?',
            'Do you prefer reading news online or in print?',
            'Is there a piece of technology you would like to learn to use?',
            'When do you usually choose to switch your phone off?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn (3–4 minutes). Prepare for 1 minute, then speak for 1–2 minutes.',
          cueCard: `Describe a piece of technology that has had a big impact on your life.\n\nYou should say:\n• what the technology is\n• when and how you started using it\n• how it has changed your daily routine\n• who you use it with or communicate with\n\nand explain whether you think its overall impact has been positive or negative.`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Technology and society',
          followUp: [
            'Do you think technology is making people more or less connected to each other?',
            'What risks do you see in children having unrestricted access to the internet?',
            'How should schools adapt their teaching methods to reflect the digital age?',
            'Do you think there will ever be technology that fundamentally changes how humans communicate?',
            'Who should be responsible when an automated system makes a harmful decision?',
            'Why do some groups benefit from new technology sooner than others?',
          ],
        },
      ],
    },
  ],
};

export default mock;
