import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-14',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 14',
  subtitle: 'AI Ethics · Rainforest Biodiversity · The History of Money',
  timeMinutes: 164,
  sections: [

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-14.mp3',
      title: 'Listening — Section 1: Booking a wedding venue',
      instructions: 'You will hear a conversation between a wedding venue coordinator and a customer. Listen and answer Questions 1–10.',
      transcript: `COORDINATOR: Good morning, Oakwood Manor events team, Sophie speaking. How can I help?

CUSTOMER: Hi. I'm hoping to book your venue for my wedding next year.

COORDINATOR: Congratulations! Let me take a few details. Could I have your name?

CUSTOMER: Yes, it's Helen Brightwell.

COORDINATOR: Could you spell the surname for me?

CUSTOMER: Sure — it's B-R-I-G-H-T-W-E-L-L.

COORDINATOR: Thank you. And the best number to reach you on?

CUSTOMER: My mobile is 078 2245 3390.

COORDINATOR: Lovely. And do you have a date in mind?

CUSTOMER: We were set on a Saturday. We originally wanted May, but in the end we've chosen June.

COORDINATOR: June is very popular, so it's good you're booking early. How many guests are you expecting?

CUSTOMER: Around 140.

COORDINATOR: That's fine — our main hall holds up to two hundred. Now, which part of the manor would you like for the ceremony itself?

CUSTOMER: I think the garden, as long as the weather's kind.

COORDINATOR: A garden ceremony is beautiful, and we provide a marquee as a backup. Is there anything special you'd like for the meal?

CUSTOMER: One thing that really matters is that we'll need a vegetarian option for a lot of our guests.

COORDINATOR: No problem at all — our chef offers several. And will you need accommodation?

CUSTOMER: Mainly for the couple, so just the bridal suite for the first night.

COORDINATOR: I'll pencil that in. Now let me run through our two packages. The Classic package is £75 per guest and includes a three-course meal and all the table decorations. The Deluxe package is £95 per guest; on top of the meal, it also includes a professional photographer and an evening buffet.

CUSTOMER: And what about a deposit?

COORDINATOR: For either package we ask for £500 to secure the date, with the balance due one month before the wedding.

CUSTOMER: I see. Before I decide between packages, could I check a few things? My grandparents cannot manage many stairs.

COORDINATOR: The hall and garden are both step-free from the east entrance. There is a lift to the bedrooms, although the bridal suite is on the first floor rather than the ground floor. We can reserve two accessible rooms downstairs for other guests.

CUSTOMER: Excellent. Does the quoted price include drinks?

COORDINATOR: It includes sparkling water on the tables and a welcome drink. Wine with the meal is separate. Some couples assume the evening buffet replaces the three-course meal, but it is served later, at about nine, for guests who stay for the dancing.

CUSTOMER: That makes sense. We may bring our own cake. Is there a cutting charge?

COORDINATOR: No. We provide a cake stand and knife at no extra cost. You would only pay if our chef made the cake. Also, you mentioned several vegetarian guests. We need final dietary numbers three weeks before the event, including allergies; “vegetarian” on the booking form is not enough for severe allergies.

CUSTOMER: I'll make a list. What happens if it rains during the ceremony?

COORDINATOR: We decide that morning whether to use the garden. If the forecast is poor, staff move the chairs into the small orangery beside it. The marquee is for photographs and drinks, not the legal ceremony.

CUSTOMER: Ah, thanks for clarifying. Could you hold one Saturday in June while my partner visits?

COORDINATOR: I can hold a date without payment for forty-eight hours. A viewing on Tuesday at six is available, or Thursday at four.

CUSTOMER: Tuesday is difficult. Let's come on Thursday at four.

COORDINATOR: Fine. I'll email the brochure and a provisional booking form today. Nothing becomes binding until you return the signed form and pay the deposit.

CUSTOMER: That all sounds perfect. Thank you.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Oakwood Manor — Wedding Booking',
          example: 'Event:  wedding reception',
          template: `Name: Helen {{1}}
Telephone (mobile): 078 2245 3390

Preferred month: {{2}}
Number of guests: about {{3}}
Ceremony to be held in the {{4}}
Special meal request: {{5}} option needed
Accommodation: book the bridal {{6}}`,
          blanks: [
            { num: 1, answers: ['Brightwell', 'brightwell'], maxWords: 1 },
            { num: 2, answers: ['June', 'june'], maxWords: 1 },
            { num: 3, answers: ['140'], maxWords: 1 },
            { num: 4, answers: ['garden'], maxWords: 1 },
            { num: 5, answers: ['vegetarian'], maxWords: 1 },
            { num: 6, answers: ['suite'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Package', 'Price per guest', 'Main extra included', 'Evening food'],
          rows: [
            [
              'Classic',
              { num: 7, answers: ['75', '£75'], maxWords: 1 },
              { num: 8, answers: ['decorations'], maxWords: 1 },
              'none',
            ],
            [
              'Deluxe',
              '£95',
              { num: 9, answers: ['photographer'], maxWords: 1 },
              { num: 10, answers: ['buffet'], maxWords: 1 },
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-14.mp3',
      title: 'Listening — Section 2: Charity fun-run briefing',
      instructions: 'You will hear an organiser briefing participants before a charity fun run. Listen and answer Questions 11–20.',
      transcript: `Right, everyone, thank you for coming to this briefing for Saturday's Riverside Charity Fun Run. I'm Tom, the event organiser, and I'll run through the key details so the day goes smoothly.

First, what you'll receive. Every participant who registers will be given a bright orange race T-shirt — please do wear it on the day, as it helps our marshals identify runners. Everyone who crosses the finish line will also receive a finisher's medal. Now, a few things that are not automatically provided: the route map is on our website for you to download, energy bars will only be handed out to those doing the longer ten-kilometre route, and a timing chip is issued only to runners in the competitive race, not the fun run.

Now, the practical details. The run starts at nine thirty in the morning, so please arrive in good time to collect your number. The starting point is the main gate of Victoria Park — not the car park, as some older leaflets wrongly stated. The route follows the river for most of the way and is completely flat, which makes it ideal for beginners. There is one water station, roughly halfway round, where you can also leave any spare clothing.

A word on safety. The whole route is clearly marked with yellow arrows, and first-aid volunteers are stationed every kilometre. If you feel unwell, stop and wait for a marshal — please don't try to carry on. Dogs, unfortunately, are not allowed this year, for insurance reasons.

On fundraising: all the money we raise this year will go towards a new children's playground in the town. The easiest way to collect donations is through your online sponsorship page. Cash can still be handed in, but please put it in a labelled envelope rather than giving it to a marshal on the course.

Let me explain what happens when you arrive. Registration opens at eight fifteen in the sports pavilion. Competitive runners should use the desks on the left because staff need to attach their timing chips. Fun-run participants use the desks on the right and collect a paper number. If your T-shirt size is wrong, visit the exchange table after registering; doing so beforehand would delay the queue. Bags may be left in the supervised tent, but valuables remain your responsibility.

There are two distances. The family route is five kilometres and turns back at Mill Bridge. The ten-kilometre route continues through the riverside meadows before rejoining the same finish. Please follow the coloured signs for your distance: yellow arrows mark both routes until the bridge, while red signs indicate the longer loop. Although the course is flat, a short section beside the river may be muddy after rain, so ordinary running shoes are preferable to sandals.

At the finish, keep moving beyond the timing mat before stopping to meet friends. Water and medals are handed out in the recovery area. Energy bars are restricted to ten-kilometre entrants because we ordered them according to registration numbers. The café will sell other food from ten o'clock.

And finally, parking. The park's own car park will be closed for the event, so please use the free parking at the nearby shopping centre and walk across. Allow ten minutes for that walk. Buses will operate normally, but the stop beside the main gate moves temporarily to Park Road. Any last-minute route change will be posted online by six on Saturday morning. Thanks again, and let's hope for some sunshine.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO items will every participant in the fun run receive?',
          options: [
            { letter: 'A', text: 'a race T-shirt' },
            { letter: 'B', text: 'a finisher\'s medal' },
            { letter: 'C', text: 'energy bars' },
            { letter: 'D', text: 'a printed route map' },
            { letter: 'E', text: 'a timing chip' },
          ],
          selectCount: 2,
          answers: ['A', 'B'],
        },
        {
          type: 'formgroup',
          id: 'l2-form',
          part: 2,
          qRange: [13, 20],
          groupLabel: 'Complete the notes below.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          title: 'Riverside Charity Fun Run — key details',
          template: `Before and during the run

• The run starts at {{13}} in the morning.
• The starting point is the main {{14}} of Victoria Park.
• The route follows the {{15}} for most of the way.
• The route is completely {{16}}, so it is ideal for beginners.
• There is one {{17}} roughly halfway round.

Safety and other information

• The route is marked with yellow {{18}}.
• The money raised will pay for a new children's {{19}}.
• Participants should park at the nearby {{20}}.`,
          blanks: [
            { num: 13, answers: ['nine thirty', '9.30', '9:30'], maxWords: 2 },
            { num: 14, answers: ['gate'], maxWords: 1 },
            { num: 15, answers: ['river'], maxWords: 1 },
            { num: 16, answers: ['flat'], maxWords: 1 },
            { num: 17, answers: ['water station'], maxWords: 2 },
            { num: 18, answers: ['arrows'], maxWords: 1 },
            { num: 19, answers: ['playground'], maxWords: 1 },
            { num: 20, answers: ['shopping centre'], maxWords: 2 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-14.mp3',
      title: 'Listening — Section 3: Geology fieldwork plan',
      instructions: 'You will hear a tutor and two students planning a geology fieldwork trip. Listen and answer Questions 21–30.',
      transcript: `TUTOR: So, let's finalise the plan for next month's geology fieldwork. Ben, remind us where we're going.

BEN: We're heading to the coast at Kilve, where the cliffs have exposed clear layers of sedimentary rock.

TUTOR: Good. And what's the main aim of the trip, Priya?

PRIYA: Originally we said collecting fossils, but actually our main goal is to measure and record the different rock layers — the sequence, basically.

TUTOR: Exactly — recording the sequence is the priority. Now, how are we getting there?

BEN: We looked at taking the train, but in the end the department minibus works out cheaper for the whole group.

TUTOR: Sensible. It also means we can carry all the equipment. Speaking of which, Priya, what's the situation there?

PRIYA: Most of it's ready, but we're short of hand lenses — there are only four for twelve students, so people will have to share.

TUTOR: I'll ask the store to lend us a few more. Now, safety. This is a coastal site, so what's the main risk?

BEN: The tide, definitely. If we're not careful we could get cut off, so we must check the tide times before we go down onto the beach.

TUTOR: Absolutely — the tide is our number-one hazard. Right, a few things for everyone to prepare. First, each of you must bring sturdy boots, because the rocks are very slippery. Second, don't forget a waterproof, as the weather there changes fast. Third, everyone needs to complete the risk form and hand it in to me by Friday. I'll bring the first-aid kit and a spare hammer. Oh, and please label every rock sample you collect with its exact location — an unlabelled sample is useless for the report.

PRIYA: Should we bring cameras as well?

TUTOR: Your phones are fine for photographs — just make sure they're fully charged.

BEN: Great. How should we divide the work once we're there?

TUTOR: Work in threes, but everyone must keep a notebook. Rotate measuring, describing and photographing at each station.

PRIYA: Are we expected to identify every fossil on the beach?

TUTOR: No. Fossils may help you compare layers, but collecting them is not the research aim. Do not hammer material out of the cliff, because that could damage the site and dislodge loose rock. You may pick up small pieces already lying on the beach if they are safe to reach. Record them, photograph them and return them unless I say a sample is needed for laboratory work.

BEN: What measurements go in the notebook?

TUTOR: For each rock unit, note its thickness, grain size and colour, then sketch its boundary. Put a scale in every close-up; a hand lens alone does not show size.

PRIYA: And if the weather is really bad?

TUTOR: Light rain won't cancel the trip, which is why a waterproof is essential. Strong winds or a warning from the coastguard would. I'll check the forecast and tide table the evening before and send a message by seven. If we postpone, keep the risk form on file; you won't need to submit a second one.

BEN: What time will the minibus leave?

TUTOR: At seven forty-five from the science building. Be there by seven thirty so equipment can be loaded. We plan to leave the beach before the tide reaches the cliff and return by six, but bring lunch and an extra drink in case traffic delays us.

PRIYA: Should samples be numbered as well as labelled?

TUTOR: Yes. Use your group letter followed by a number, and copy the same code into your notebook. The exact location matters more than the specimen's appearance. A beautiful but unlabelled rock tells us almost nothing.

BEN: Understood. Thanks.`,
      questions: [
        {
          type: 'matching',
          id: 'l3-match',
          part: 3,
          qRange: [21, 25],
          groupLabel: 'Match each aspect of the fieldwork plan with the correct detail, A–G.\nChoose FIVE answers from the box and write the correct letter, A–G, next to Questions 21–25.',
          items: [
            { num: 21, stem: 'Fieldwork location', answer: 'B' },
            { num: 22, stem: 'Main research aim', answer: 'D' },
            { num: 23, stem: 'Group transport', answer: 'F' },
            { num: 24, stem: 'Equipment in short supply', answer: 'A' },
            { num: 25, stem: 'Principal safety risk', answer: 'E' },
          ],
          endings: [
            { letter: 'A', text: 'hand lenses' },
            { letter: 'B', text: 'coastal cliff site' },
            { letter: 'C', text: 'fossil collection' },
            { letter: 'D', text: 'recording the rock-layer sequence' },
            { letter: 'E', text: 'the incoming tide' },
            { letter: 'F', text: 'department minibus' },
            { letter: 'G', text: 'water sampling' },
          ],
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `Each student must:
• bring sturdy {{26}}, because the rocks are slippery
• bring a {{27}} in case the weather changes
• complete the risk {{28}} and hand it in by Friday
• label every rock {{29}} with its exact location
• make sure their {{30}} are charged for taking photographs`,
          blanks: [
            { num: 26, answers: ['boots'], maxWords: 1 },
            { num: 27, answers: ['waterproof'], maxWords: 1 },
            { num: 28, answers: ['form'], maxWords: 1 },
            { num: 29, answers: ['sample'], maxWords: 1 },
            { num: 30, answers: ['phones'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-14.mp3',
      title: 'Listening — Section 4: The history of paper money',
      instructions: 'You will hear a lecture about the history of paper money. Listen and answer Questions 31–40.',
      transcript: `Good afternoon. In today's lecture I'll trace the history of paper money, from early transfer documents in China to the polymer notes used by many countries today. One warning at the outset: historians distinguish a document used to move funds from a note circulating as general payment, even though popular accounts sometimes call both “paper money”.

The story begins in China, more than a thousand years ago. Tang-dynasty trade depended on heavy strings of copper coins. To avoid transporting them over long distances, merchants could deposit funds in one place and receive a paper receipt or draft that enabled payment elsewhere. This convenient transfer instrument became known as “flying money”. The name referred to money moving rapidly across distance, not, as a charming but unreliable story claims, to pieces of paper being blown away by the wind.

The next decisive development came under the Song dynasty. Privately issued notes called jiaozi circulated in Sichuan, and the state later controlled their issue. These notes functioned more like currency than the earlier remittance documents. Government backing helped them circulate, but it did not remove the need to limit supply and maintain confidence.

Knowledge of Chinese currency reached European readers slowly. Marco Polo described the use of paper under Mongol rule, including the authority that supported it. Many readers did not believe that stamped paper could be accepted in place of metal, although Europe already had written credit instruments of its own.

Europe's first generally recognised banknotes were issued in Sweden in 1661 by Stockholms Banco. The country used extremely cumbersome copper money, so portable notes were attractive. The bank's notes were not all matched by deposited coin, however, and it issued more than it could redeem. Their value fell, confidence weakened and the bank failed. The episode became an early European lesson in over-issue and inflation.

European banknotes subsequently developed in different ways. Many began as promises by a bank to pay the bearer in coin. In Britain, for example, Bank of England notes could for long periods be exchanged for gold, though convertibility was also suspended at times. The gold standard formally linked a currency's value to a fixed quantity of gold; countries adopted and abandoned it on different dates rather than in a single worldwide change.

Most national currencies today are described as fiat money. A unit is not redeemable for a fixed quantity of gold simply because a holder presents a note. Its acceptance rests on a combination of law, the issuing state's institutions, monetary policy and public confidence—not on paper having an intrinsic value.

The physical note has also evolved. Printers use layered security features: watermarks visible in transmitted light, embedded threads, fine patterns, raised print and ink whose colour changes when tilted. No single feature is expected to defeat every forgery; members of the public and machines check several together.

Finally, the word paper is no longer always literal. Australia pioneered modern circulating notes printed on polymer, a specialised plastic substrate, and other issuing authorities followed. Polymer can incorporate transparent windows, resists dirt and moisture, and generally lasts longer than cotton-based paper, although damaged notes still have to be withdrawn. Digital payments may reduce the number of cash transactions in some places, but patterns differ between countries and cash continues to serve as both payment and backup. The banknote, therefore, is not a relic with one simple history but a technology repeatedly redesigned around portability, confidence and security.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'THE HISTORY OF PAPER MONEY',
          template: `Origins in China

• Paper money first appeared in {{31}}, over a thousand years ago.
• Merchants were tired of carrying heavy strings of {{32}} coins.
• Agents issued a paper {{33}} in exchange for the coins.
• The early notes were nicknamed "{{34}} money".

Spread to Europe

• When Marco Polo described it, many readers did not {{35}} him.
• Europe's first banknotes were issued in {{36}}.
• Printing too many notes led to the danger of {{37}}.
• For two centuries, notes were backed by {{38}}.

The modern note

• Today paper money is called {{39}} currency.
• Modern plastic notes are made from a material called {{40}}.`,
          blanks: [
            { num: 31, answers: ['China', 'china'], maxWords: 1 },
            { num: 32, answers: ['copper'], maxWords: 1 },
            { num: 33, answers: ['receipt'], maxWords: 1 },
            { num: 34, answers: ['flying'], maxWords: 1 },
            { num: 35, answers: ['believe'], maxWords: 1 },
            { num: 36, answers: ['Sweden', 'sweden'], maxWords: 1 },
            { num: 37, answers: ['inflation'], maxWords: 1 },
            { num: 38, answers: ['gold'], maxWords: 1 },
            { num: 39, answers: ['fiat'], maxWords: 1 },
            { num: 40, answers: ['polymer'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 5,
      skill: 'reading',
      title: 'Reading — Passage 1: The Ethics of Artificial Intelligence',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The Ethics of Artificial Intelligence

Artificial intelligence is increasingly used to support consequential decisions: ranking job applicants, estimating credit risk, helping clinicians interpret scans and identifying transactions for investigation. Such systems may process more cases consistently and quickly than a person could. Yet speed does not answer the ethical question. A model can be technically accurate on average while producing unacceptable errors for a particular group, and an apparently minor recommendation can become decisive when busy staff routinely accept it.

One concern is algorithmic bias. A system learns statistical relationships from its training data rather than discovering a neutral account of the world. If historical records reflect unequal access to employment, lending or healthcare, a model may perpetuate those patterns. Bias can also enter when a proxy, such as postcode, is correlated with a protected characteristic, or when one population is poorly represented in the data. Testing only overall accuracy may conceal these differences. Auditors therefore compare error rates across relevant groups, examine whether the data fit the intended population and ask what harm follows from each kind of mistake. No single mathematical definition of fairness resolves every case: reducing one disparity can increase another, so the social purpose of the system matters.

Transparency presents a second difficulty. Complex models are often called “black boxes” because the route from inputs to an output may be hard to express in ordinary language. However, transparency is not a single switch. A person affected by a decision may need the principal factors, an operator may need warnings and performance limits, and a regulator may require logs, documentation and access for an audit. Publishing source code alone would not necessarily provide a useful explanation and could expose personal data or security weaknesses. Meaningful transparency should instead enable errors to be found and a decision to be challenged.

European data-protection law illustrates the importance of precision. The General Data Protection Regulation (GDPR) generally restricts decisions based solely on automated processing when they produce legal or similarly significant effects, while allowing specified exceptions. Where such processing is permitted, safeguards include the opportunity for human intervention, for the person to express a view and to contest the decision. This is more specific than a universal promise that every output from every algorithm will receive a complete human-comprehensible explanation.

The European Union's AI Act adds a risk-based framework. It prohibits a limited set of practices judged unacceptable and creates transparency duties for certain systems. It also classifies uses in areas such as employment, education and access to essential services as potentially high-risk. Obligations for high-risk providers include risk management, suitable data governance, technical documentation, logging, information for deployers, human oversight, accuracy, robustness and cybersecurity. The rules enter into application on a staged timetable; the existence of the Act does not mean that every high-risk obligation was already enforceable at the same moment in 2026.

Human oversight itself must be designed rather than merely promised. A nominal reviewer who lacks time, expertise or authority may simply confirm the model's suggestion—a tendency sometimes called automation bias. Useful oversight gives the reviewer enough context to disagree, records overrides and supplies a route for appeal. Responsibility is shared: developers choose data and objectives, organisations decide how a tool is deployed, and public authorities define and enforce legal limits. A vendor cannot make an unsuitable use ethical simply by adding a warning, while a purchaser cannot assume that buying a reputable model transfers accountability.

The labour effects of AI form another ethical dimension. Systems can automate individual tasks without eliminating an occupation, and they can create new work while changing the skills required for existing jobs. Exposure is not determined only by whether a job is labelled routine or creative; cost, regulation, reliability and the organisation of work all influence adoption. The gains may also be distributed unevenly unless workers have access to training, bargaining power and support during transitions.

Many organisations publish principles such as fairness, transparency, accountability, privacy and human oversight. Principles can guide design, but voluntary statements without measurable requirements, independent scrutiny or remedies risk becoming “ethics washing”: ethical language with little operational change. Trustworthy governance therefore connects broad values to evidence—documented tests, monitoring after deployment, incident reporting, accessible appeal and consequences when standards are breached. The central challenge is not to demand that AI be perfect. It is to decide which errors are tolerable, who bears them, who can question a decision and who must put it right.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: A model with good average accuracy may still make unequal errors across population groups.\n2. {{2}}: Publishing a model's source code always provides an affected person with a useful explanation.\n3. {{3}}: The GDPR safeguards described include a person's opportunity to contest certain automated decisions.\n4. {{4}}: Every high-risk obligation in the EU AI Act became enforceable at the same time in 2026.\n5. {{5}}: Introducing AI can alter tasks within an occupation without removing the occupation itself.\n6. {{6}}: Effective human oversight requires a reviewer to have a genuine ability to disagree with a system.\n7. {{7}}: The passage states how many organisations independently audit their published AI principles.`,
          blanks: [
            { num: 1, answers: ['TRUE'] },
            { num: 2, answers: ['FALSE'] },
            { num: 3, answers: ['TRUE'] },
            { num: 4, answers: ['FALSE'] },
            { num: 5, answers: ['TRUE'] },
            { num: 6, answers: ['TRUE'] },
            { num: 7, answers: ['NOT GIVEN'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r1-sent',
          part: 5,
          qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `8. A model trained on unequal historical records may {{8}} the patterns in those records.\n9. A feature such as {{9}} can act as a proxy for a protected characteristic.\n10. Under the GDPR safeguards described, an affected person may request {{10}}.\n11. The AI Act requires suitable {{11}} for systems classified as high-risk.\n12. A reviewer who habitually accepts a model's output may be showing {{12}}.\n13. Ethical language that produces little operational change is described as {{13}}.`,
          blanks: [
            { num: 8, answers: ['perpetuate'] },
            { num: 9, answers: ['postcode'] },
            { num: 10, answers: ['human intervention'] },
            { num: 11, answers: ['human oversight'] },
            { num: 12, answers: ['automation bias'] },
            { num: 13, answers: ['ethics washing'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: The Remarkable Diversity of Tropical Rainforests',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `The Remarkable Diversity of Tropical Rainforests

A. Tropical rainforests are among the most biodiverse terrestrial ecosystems on Earth. Although they occupy only a small proportion of the planet's land surface, estimates commonly attribute more than half of known terrestrial species to tropical forests; any exact percentage depends on what is counted and how incompletely many groups have been catalogued. The Amazon basin alone has documented tens of thousands of plant species and an exceptional variety of freshwater fish and birds. This concentration of life reflects a long evolutionary history, warm conditions and an intricate web of ecological relationships. Species are not distributed uniformly: soil, rainfall, flooding and past disturbance create distinct habitats within what a map may show as continuous green forest.

B. The structure of a tropical rainforest is highly layered. The emergent layer, formed by the tallest trees—some reaching sixty metres or more—juts above the main forest canopy and is exposed to full sunlight, strong winds, and dramatic temperature fluctuations. These giants are inhabited by specialised animals, including harpy eagles, scarlet macaws, and various species of monkey adapted to life high above the ground. Below them, the dense canopy layer captures the vast majority of available sunlight, creating a lush closed environment where most of the forest's animal life resides.

C. The understorey, lying between the canopy and the forest floor, is a region of deep shade and high humidity. Here, plants adapted to low-light conditions—large-leafed shrubs, climbers, and shade-tolerant palms—compete for whatever light filters through the canopy above. The forest floor itself receives as little as two percent of the sunlight that falls on the canopy, yet it is teeming with life: leaf-cutter ants harvesting vegetation, decomposer fungi breaking down fallen organic matter, and an extraordinary variety of invertebrates, amphibians, and small mammals.

D. Much of the biological richness of rainforests results from intricate symbiotic relationships between species. The Brazil nut tree provides a striking example. Its complex flowers are pollinated by several kinds of strong, large-bodied bee, including orchid bees; smaller visitors cannot readily reach the reproductive structures. After a heavy fruit falls, agoutis are among the few animals able to gnaw through its hard casing. They eat some seeds and bury others, occasionally forgetting a cache from which a new tree can grow. The relationship is therefore not a one-insect, one-rodent mechanism, yet the loss of an effective group of pollinators or seed dispersers can sharply reduce successful reproduction. Such dependence helps explain why mature Brazil nut trees may persist in disturbed land while producing few replacements.

E. Rainforests also perform vital services for the climate system. Through photosynthesis, growing vegetation removes carbon dioxide, while respiration, decay, drought and fire return it; whether a region acts as a carbon sink in a given period is the balance of these flows. Tropical forests also store vast quantities of carbon in living biomass and soil, so clearing or severe degradation can release part of that stock. Through evapotranspiration, trees transfer water from soil to the atmosphere. Moisture can be recycled in later rainfall and transported beyond the forest, sometimes described informally as “flying rivers”. The metaphor should not suggest a literal airborne channel or a climate generated by trees alone: winds bring Atlantic moisture into the basin, and vegetation influences how that water is recycled and carried onward.

F. The threats facing tropical rainforests are severe. Agricultural expansion, including cattle ranching and commodity crops, is a major driver of permanent conversion; roads, mining and settlement can open further areas. Logging does not always remove the forest category from a map, but selective extraction, fire and fragmentation still degrade habitat and weaken resilience. This distinction matters because a deforestation statistic alone misses damaged forest that remains standing. The FAO's 2025 global assessment reports that the worldwide rate of deforestation has slowed compared with earlier decades, while warning that forests remain under pressure. Scientists also examine the risk of an Amazon “tipping point”: interactions among clearing, warming, fire and reduced rainfall could make large-scale change self-reinforcing. The phrase describes a risk under particular conditions, not a single universally agreed percentage at which the whole basin suddenly and irreversibly changes.

G. Conservation responses include protected and Indigenous territories, enforcement against illegal clearing, supply-chain measures, restoration and payment-for-ecosystem-services programmes that can compensate landholders or communities for verified protection. Brazil's Amazon Fund, supported substantially by international donations, finances projects intended to prevent and monitor deforestation and promote sustainable use. It is one component of policy rather than proof that a single fund caused every historical change in forest loss. Outcomes also depend on land rights, credible monitoring, consistent law enforcement and economic alternatives that local people can use. A protected boundary on paper offers little defence if agencies lack staff or communities are excluded from decisions. Long-term protection therefore requires both ecological evidence and institutions able to address the incentives behind conversion.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'An example of animal groups whose loss can reduce a tree\'s successful reproduction', answer: 'D' },
            { num: 15, stem: 'A description of conditions found in the shaded middle layer of the forest', answer: 'C' },
            { num: 16, stem: 'A reference to financial mechanisms used to support forest protection', answer: 'G' },
            { num: 17, stem: 'An account of how forests generate and recycle their own rainfall', answer: 'E' },
            { num: 18, stem: 'A description of the animals found in the uppermost forest layer', answer: 'B' },
            { num: 19, stem: 'A warning that the idea of a forest threshold should not be treated as one fixed number', answer: 'F' },
            { num: 20, stem: 'An explanation of why biodiversity totals remain estimates', answer: 'A' },
          ],
          endings: [
            { letter: 'A', text: 'Paragraph A' },
            { letter: 'B', text: 'Paragraph B' },
            { letter: 'C', text: 'Paragraph C' },
            { letter: 'D', text: 'Paragraph D' },
            { letter: 'E', text: 'Paragraph E' },
            { letter: 'F', text: 'Paragraph F' },
            { letter: 'G', text: 'Paragraph G' },
          ],
        },
        {
          type: 'formgroup',
          id: 'r2-sum',
          part: 6,
          qRange: [21, 26],
          groupLabel: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          title: 'Rainforest Ecology and Conservation',
          template: `Rainforests occupy only a small proportion of the planet's {{21}} but contain exceptional biodiversity. The forest is structured in distinct layers; the {{22}} layer, the tallest, is exposed to full sunlight and strong winds. The Brazil nut tree illustrates {{23}} relationships involving pollinators and seed dispersers. Depending on the balance of carbon flows, forest can act as a {{24}}. Permanent conversion is driven partly by cattle {{25}}, while interacting pressures may increase the risk of a {{26}} that makes large-scale change self-reinforcing.`,
          blanks: [
            { num: 21, answers: ['land surface'] },
            { num: 22, answers: ['emergent'] },
            { num: 23, answers: ['symbiotic'] },
            { num: 24, answers: ['carbon sink'] },
            { num: 25, answers: ['ranching'] },
            { num: 26, answers: ['tipping point'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: The History of Money',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `The History of Money

Money is so fundamental to modern life that it is easy to treat it as a natural object rather than a social technology: a set of instruments and conventions used to quote prices, settle obligations and transfer purchasing power. Its history is not a single ladder on which every society moved from barter to coins, then notes and finally digital payment. Different forms have coexisted, disappeared and returned, and historians disagree about how particular transitions should be interpreted.

The familiar barter story says that direct exchange became impractical because two people had to want one another's goods at the same time. Money then supposedly appeared as a convenient medium. Economic historians and anthropologists have questioned that universal sequence: ethnographic evidence does not reveal a pure barter economy from which all money developed. In one influential account, anthropologist David Graeber emphasised mutual credit and social obligation in early communities. Units of account could record who owed what even when no coin changed hands. This argument does not prove that barter never occurred; it challenges the claim that barter was necessarily the common first stage.

Many societies used commodity money—objects valued for their material or accepted use as well as for exchange. Grain, cattle, cloth and cowrie shells have all served monetary functions, although their roles varied by place. Standardised metal coinage is commonly associated with Lydia in western Anatolia during the seventh century BCE. Surviving early coins were made of electrum, a gold-and-silver alloy, and carried marks linked to authority and weight. Calling any example the uncontested “first coin” is risky because dating is revised and metal currencies developed in more than one region. What stamping achieved was easier recognition: users did not have to test an anonymous lump of metal afresh in every transaction.

Tang-dynasty China used paper instruments called “flying money” to transfer value without carrying great loads of copper coin across long distances. These remittance documents were important predecessors, but were not identical to later notes circulating generally from person to person. In Song China, privately issued jiaozi developed into a more recognisable paper currency and the state subsequently controlled issue. When Marco Polo described paper currency under Mongol rule, European readers encountered a striking demonstration of authority supporting acceptance. Europe nonetheless had its own changing network of bills, receipts and credit. The first generally recognised European banknotes were issued in Sweden in 1661 by Stockholms Banco. They proved convenient beside heavy copper money, but excessive issue contributed to loss of value and failure of the bank.

The development of note-issuing banks and later central banks was another transformation. The Bank of England, founded in 1694, first issued handwritten promises to pay depositors; fixed denominations came later. Convertibility into coin or bullion varied over time and was sometimes suspended. Under a gold standard, the monetary unit was legally tied to a quantity of gold, but countries joined, left and restored such arrangements on different schedules. Britain ended its interwar link in 1931, while the United States halted official dollar convertibility into gold in 1971. Modern fiat money is not redeemable for a fixed amount of a commodity. Its functioning depends on law, institutions, monetary policy and confidence that others will accept it—not on confidence alone or on the physical note's production cost.

The digital revolution has changed how claims on money move. A card or bank transfer is not necessarily a new currency: it may simply transfer commercial-bank deposits denominated in the national unit. Cash use has fallen sharply in some economies but remains important in others and provides an offline option during technical failures. Bitcoin, launched in 2009, introduced a cryptoasset whose ledger is maintained through a decentralised computational network rather than a conventional central operator. That design does not place every cryptocurrency wholly outside law or financial intermediaries; users often depend on regulated exchanges and custodians. Supporters value the possibility of transfer without a central ledger keeper, while critics point to price volatility, capacity, energy use in some designs and limited use for ordinary pricing. Whether a cryptoasset performs the three traditional functions—medium of exchange, store of value and unit of account—is an empirical question, not something guaranteed by its code.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'What does the passage say about the traditional "barter story" of money\'s origins?',
          options: [
            'It is confirmed by recent archaeological evidence from ancient civilisations.',
            'It is widely accepted by economic historians as accurate.',
            'It is intuitive but largely unsupported by historical or ethnographic evidence.',
            'It correctly identifies barter as the universal precursor to monetary systems.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'According to David Graeber, what actually preceded the use of money in early societies?',
          options: [
            'A system of direct barter between neighbouring communities.',
            'Systems of mutual credit and social obligation.',
            'The use of commodity money such as grain and shells.',
            'Centralised government distribution of goods and services.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'What was significant about the paper money described by Marco Polo?',
          options: [
            'It was backed by gold reserves held by the Chinese government.',
            'European readers found it difficult to understand money based on authority alone.',
            'It was adopted immediately by European merchants who heard about it.',
            'It was identical in design to modern central bank banknotes.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'What does “fiat money” mean, according to the passage?',
          options: [
            'Money that is backed by gold or silver reserves held by a central bank.',
            'Currency that is not redeemable for a fixed quantity of a commodity.',
            'Digital currency that operates outside the banking system.',
            'Money that can be exchanged for a fixed quantity of a physical commodity.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: The writer presents money as a social technology rather than a natural object.\n32. {{32}}: Early Lydian coins consisted exclusively of pure gold.\n33. {{33}}: “Flying money” and later generally circulating notes performed exactly the same function.\n34. {{34}}: The Bank of England was the first central bank established anywhere in the world.\n35. {{35}}: The United States halted official dollar convertibility into gold in 1971.\n36. {{36}}: A digital payment always represents a currency different from national money.`,
          blanks: [
            { num: 31, answers: ['YES'] },
            { num: 32, answers: ['NO'] },
            { num: 33, answers: ['NO'] },
            { num: 34, answers: ['NOT GIVEN'] },
            { num: 35, answers: ['YES'] },
            { num: 36, answers: ['NO'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r3-sent',
          part: 7,
          qRange: [37, 40],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `37. Grain, cloth and shells are examples of objects that have served as {{37}} money.\n38. Standardised early coinage is commonly associated with {{38}} in western Anatolia.\n39. Under a {{39}}, a monetary unit was legally tied to a quantity of gold.\n40. Bitcoin records transactions through a {{40}} network rather than a conventional central operator.`,
          blanks: [
            { num: 37, answers: ['commodity'] },
            { num: 38, answers: ['Lydia'] },
            { num: 39, answers: ['gold standard'] },
            { num: 40, answers: ['decentralised computational'] },
          ],
        },
      ],
    },

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
          imageUrl: '/assets/ielts/charts/set14-task1.svg',
          imageAlt: 'A simplified process diagram in which municipal wastewater passes through screening, primary settling, biological treatment and disinfection before reuse or discharge; sludge from settling is sent for biogas recovery',
          stimulus: 'The diagram below shows a simplified process used by a municipal plant to treat wastewater, including a separate use for the sludge and two possible destinations for the treated water.',
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
          stimulus: 'Some people believe that universities should prohibit students from using generative artificial intelligence for assessed work. Others think that students should be taught to use these tools responsibly as part of their education.',
          text: 'Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
          minWords: 250,
        },
      ],
    },

    {
      part: 10,
      skill: 'speaking',
      title: 'Speaking',
      instructions: 'Answer the following questions. Part 1 is a short conversation; Part 2 is a 1–2 minute monologue; Part 3 is a discussion.',
      questions: [
        {
          type: 'speak',
          id: 'sp1',
          part: 10,
          partNumber: 1,
          text: 'Part 1 — Personal questions about technology and daily decisions',
          followUp: [
            'Do you use any apps or digital tools to help you make decisions in daily life?',
            'How comfortable are you with technology making decisions on your behalf?',
            'Can you think of an example where technology has made your life more convenient?',
            'Do you ever worry about the amount of personal data that companies collect about you?',
            'Is there a piece of technology that you find difficult to use?',
            'Do people in your family use technology in similar ways?',
            'Would you like to spend less time using digital devices?',
            'What new technology would you like to learn to use?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a time when you had to make a difficult decision.\n\nYou should say:\n• what the decision was about\n• what options you were considering\n• how you made your final choice\n• and explain how you feel about that decision now`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Technology, ethics, and society',
          followUp: [
            'To what extent should machines be allowed to replace human judgement in important decisions?',
            'Who should be responsible when an AI system makes a mistake that harms someone?',
            'Do you think the benefits of AI technology are distributed fairly across society?',
            'How can societies ensure that technological development serves the public good?',
            'Why do people sometimes trust a computer recommendation more than advice from another person?',
            'Should governments regulate new technologies before their long-term effects are fully known?',
          ],
        },
      ],
    },
  ],
};

export default mock;
