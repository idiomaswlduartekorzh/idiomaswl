import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-8',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 8',
  subtitle: 'The Domestication of Dogs · Vertical Farming · Psychology of Money',
  timeMinutes: 164,
  sections: [
    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-8.mp3',
      title: 'Listening — Section 1: Reporting a Lost Item',
      instructions: 'You will hear a conversation between a passenger and a lost property officer. Listen and answer Questions 1–10.',
      transcript: `OFFICER: Good afternoon, lost property office. How can I help?

PASSENGER: Hi, I think I left a bag on a train earlier today, and I'm hoping someone's handed it in.

OFFICER: I'll do my best to help. Let me take some details and fill in a report. Can I start with your name?

PASSENGER: Yes, it's Daniel Ashworth.

OFFICER: Could you spell the surname for me?

PASSENGER: Of course — A-S-H-W-O-R-T-H.

OFFICER: Ashworth, thank you. And a phone number we can reach you on?

PASSENGER: Yes, it's 0161 496 0175.

OFFICER: Let me just repeat that — 0161 496 0175. Now, what exactly did you lose?

PASSENGER: It was a suitcase — sorry, no, I mean a rucksack. I've been travelling all day and I'm a bit muddled.

OFFICER: No problem at all. And what colour is the rucksack?

PASSENGER: It's green — a dark green, with grey straps.

OFFICER: Right. And where do you think you left it?

PASSENGER: I'm fairly sure I left it on the train, up on the luggage rack, rather than down on the platform.

OFFICER: That's helpful. Was there anything valuable inside?

PASSENGER: Yes, unfortunately — my laptop was in the main compartment, along with some books.

OFFICER: I'll note that down. Now, a few details about your journey so we can trace it. Where were you travelling from?

PASSENGER: From Manchester, on the two o'clock service.

OFFICER: And which day was that — today?

PASSENGER: Yes, today, Friday.

OFFICER: Do you remember your seat number?

PASSENGER: It was seat 43, in the quiet coach.

OFFICER: And roughly what would you say the contents are worth, for the report?

PASSENGER: All together, probably around £400.

OFFICER: Thank you. I'll circulate this description straight away, and we'll call you the moment anything matching turns up.

PASSENGER: That's very kind. Is it worth me checking back tomorrow as well?

OFFICER: By all means — most items are handed in within a day or two, so there's every chance we'll trace it.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Lost Property Report',
          example: 'First name:  Daniel',
          template: `Surname: {{1}}
Contact number: {{2}}
Item lost: {{3}}
Colour: {{4}}
Item was left on the {{5}}
Most valuable contents: a {{6}}`,
          blanks: [
            { num: 1, answers: ['Ashworth', 'ashworth'], maxWords: 1 },
            { num: 2, answers: ['0161 496 0175', '01614960175'], maxWords: 1 },
            { num: 3, answers: ['rucksack', 'backpack'], maxWords: 1 },
            { num: 4, answers: ['green'], maxWords: 1 },
            { num: 5, answers: ['train'], maxWords: 1 },
            { num: 6, answers: ['laptop'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Journey detail', 'Information'],
          rows: [
            ['Travelling from', { num: 7, answers: ['Manchester', 'manchester'], maxWords: 1 }],
            ['Day of travel', { num: 8, answers: ['Friday', 'friday'], maxWords: 1 }],
            ['Seat number', { num: 9, answers: ['43'], maxWords: 1 }],
            ['Estimated value of contents', { num: 10, answers: ['400', '£400'], maxWords: 1 }],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-8.mp3',
      title: 'Listening — Section 2: Community Festival Briefing',
      instructions: 'You will hear a briefing given to volunteers at a community festival. Listen and answer Questions 11–20.',
      transcript: `Good morning, everyone, and thank you for volunteering at this year's Riverside Community Festival. Before we open the gates, let me run through the key information.

First, what's new this year. We've kept all our old favourites — the food market, the evening concert, and the popular fireworks display are all returning. But we've added two brand-new attractions: a children's parade through the grounds at midday, and a series of craft workshops in the main tent.

Now, some practical details you'll need in order to answer visitors' questions. As always, the festival is being held in Victoria Park, right in the centre of town.

This year the event runs for three days, from Friday afternoon through to Sunday evening, so we've got a long weekend ahead of us. It's shaping up to be our biggest festival yet, with well over two hundred stalls already booked.

For those of you volunteering, please collect your festival T-shirt from the desk behind me before you start your shift — it helps visitors to identify you.

Let me remind you of the layout. The main stage is set up beside the lake, where there's plenty of room for a crowd.

Parking is always a common question. Visitors can leave their cars at the sports centre just across the road, as there's no parking inside the park itself.

Now, we are expecting some rain on Saturday. If the weather turns bad, the outdoor performances will be moved into the marquee near the west gate.

A very important point: if you come across a child who has become separated from their family, please bring them straight to the information tent, where our trained staff will look after them.

And finally, a reminder of why we're all here. This year, all the money we raise will go to the local hospital, to fund new equipment for the children's ward.

Right — let's have a wonderful festival. The gates open in ten minutes.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO attractions are new at this year\'s festival?',
          options: [
            { letter: 'A', text: 'the food market' },
            { letter: 'B', text: 'the evening concert' },
            { letter: 'C', text: 'the children\'s parade' },
            { letter: 'D', text: 'the craft workshops' },
            { letter: 'E', text: 'the fireworks display' },
          ],
          selectCount: 2,
          answers: ['C', 'D'],
        },
        {
          type: 'formgroup',
          id: 'l2-form',
          part: 2,
          qRange: [13, 20],
          groupLabel: 'Complete the notes below.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          title: 'Riverside Community Festival',
          template: `• Location: {{13}}, in the town centre.
• The festival runs for {{14}}.
• Volunteers should collect their {{15}} before their shift.
• The main stage is beside the {{16}}.
• Visitors can park at the {{17}} across the road.
• If it rains, performances move to the {{18}}.
• Lost children should be taken to the {{19}}.
• Money raised goes to the local {{20}}.`,
          blanks: [
            { num: 13, answers: ['Victoria Park', 'park'], maxWords: 2 },
            { num: 14, answers: ['three days', '3 days'], maxWords: 2 },
            { num: 15, answers: ['T-shirt', 't-shirt', 'tshirt'], maxWords: 1 },
            { num: 16, answers: ['lake'], maxWords: 1 },
            { num: 17, answers: ['sports centre', 'sports center'], maxWords: 2 },
            { num: 18, answers: ['marquee'], maxWords: 1 },
            { num: 19, answers: ['information tent', 'tent'], maxWords: 2 },
            { num: 20, answers: ['hospital'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-8.mp3',
      title: 'Listening — Section 3: Business Plan Tutorial',
      instructions: 'You will hear a student discussing a business plan with his tutor. Listen and answer Questions 21–30.',
      transcript: `TUTOR: Come in, Sam. I've read the draft of your business plan — a mobile bicycle-repair service. Let's talk it through.

SAM: Thanks. I'm quite excited about it.

TUTOR: So why this idea in particular?

SAM: I've repaired bikes as a hobby for years, but really it came from a gap I noticed — there are lots of cyclists here but hardly any repair shops, and nobody wants to carry a broken bike across town.

TUTOR: A sensible start. Now, your market research. You surveyed thirty people, but they were all from your cycling club. What's the problem there?

SAM: I suppose they're already keen cyclists, so they're not really typical customers.

TUTOR: Exactly — your sample is biased. Next, pricing. You planned to charge less than the existing shops. Is that wise?

SAM: I thought a low price would attract customers, but it might not cover my costs. Maybe I should charge the same as competitors and compete on convenience instead.

TUTOR: I agree — convenience is your real selling point. And don't ignore the online retailers selling cheap spare parts. How could you compete?

SAM: I could offer something they can't — visiting the customer at home.

TUTOR: Good. Last thing — the biggest risk. What worries you most?

SAM: Honestly, cash flow. Early on I'll have spent money on tools and a van, but I won't have many customers yet.

TUTOR: A realistic fear. Now, the document itself. It opens too slowly — add a short summary at the very start that captures the whole idea.

SAM: An executive summary, yes.

TUTOR: Second, your finances are thin. I want a monthly cash-flow forecast for the first year.

SAM: I'll build one.

TUTOR: Third, you describe the product but not the buyers. Add a clear description of your target customers.

SAM: Cyclists who commute, mostly.

TUTOR: Put that in. And there's nothing on how people will hear about you, so include a section on marketing. One more practical thing you've forgotten — you must arrange insurance before taking on any paying work.

SAM: I hadn't thought of that. I'll sort it out.

TUTOR: Do all that and resubmit next week.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'Sam chose the business idea mainly because',
          options: [
            'he has always wanted to run a business',
            'he noticed a gap in the local market',
            'a friend suggested it to him',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'The tutor thinks Sam\'s market research is weak because',
          options: [
            'too few people were surveyed',
            'the questions were badly written',
            'the people he surveyed were not typical customers',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'Regarding pricing, Sam finally decides to',
          options: [
            'charge less than his competitors',
            'charge the same as his competitors',
            'offer a free first repair',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'The tutor advises Sam to respond to online competitors by',
          options: [
            'offering a service they cannot — visiting customers at home',
            'selling spare parts more cheaply than them',
            'opening a physical shop',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'Sam says the biggest risk to the business is',
          options: [
            'competition from established repair shops',
            'his own lack of technical skill',
            'poor cash flow in the early months',
          ],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `The business plan still needs:
• a short {{26}} at the very beginning.
• a monthly cash-flow {{27}} for the first year.
• a description of the target {{28}}.
• a section on {{29}}.
• Sam must also arrange {{30}} before starting.`,
          blanks: [
            { num: 26, answers: ['summary'], maxWords: 1 },
            { num: 27, answers: ['forecast'], maxWords: 1 },
            { num: 28, answers: ['customers', 'customer'], maxWords: 1 },
            { num: 29, answers: ['marketing'], maxWords: 1 },
            { num: 30, answers: ['insurance'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-8.mp3',
      title: 'Listening — Section 4: The History of Clocks',
      instructions: 'You will hear a lecture about the history of clocks. Listen and answer Questions 31–40.',
      transcript: `Good afternoon. Today we'll trace the history of clocks — humanity's long effort to measure the passing of time. It's a story that stretches from simple shadows cast on the ground all the way to the steady vibrations of atoms.

The earliest timekeeping device was the sundial, used by ancient civilisations thousands of years ago.

A sundial works by casting a shadow that moves as the day progresses. Its obvious weakness, however, was that it depended entirely on the position of the sun, so it was useless at night or in cloudy weather.

To overcome this, other cultures developed the water clock, which measured time by the steady dripping of liquid from one container to another. Water clocks were used by the ancient Egyptians, among others, and worked in darkness as well as in daylight.

The next great step came in medieval Europe. The first mechanical clocks appeared in the great monasteries, where monks needed to know the correct hours for prayer.

These early machines were very different from clocks today. Remarkably, many had no hands at all; instead, they simply struck a bell to mark the hours.

A revolution in accuracy arrived in the seventeenth century. In 1656 the Dutch scientist Huygens built the first pendulum clock.

The swinging pendulum kept far steadier time than anything before it, making clocks vastly more accurate — losing only seconds a day rather than minutes.

The next challenge was to make clocks portable. This became possible with the invention of the coiled spring, which could power a clock without heavy weights, leading eventually to the pocket watch.

Accurate timekeeping also transformed navigation. Once reliable clocks could be carried on ships, sailors could finally calculate their longitude — their east–west position — something that had defeated navigators for centuries.

Finally, the modern age. Most clocks and watches today keep time using tiny vibrating crystals of quartz, which are astonishingly precise and cheap to produce.

Next week, we'll look at how atomic clocks now define the very second itself.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'THE HISTORY OF CLOCKS',
          template: `Early timekeeping

• The earliest device was the {{31}}.
• It relied on the position of the {{32}} and failed at night.
• The water clock was used by the ancient {{33}}.

Mechanical clocks

• The first mechanical clocks appeared in European {{34}}.
• Many early clocks had no {{35}} and only struck a bell.

Greater accuracy

• In 1656 {{36}} built the first pendulum clock.
• The pendulum made clocks far more {{37}}.
• The coiled {{38}} allowed clocks to become portable.

Wider effects

• Reliable clocks let sailors calculate their {{39}} at sea.
• Modern clocks keep time using crystals of {{40}}.`,
          blanks: [
            { num: 31, answers: ['sundial'], maxWords: 1 },
            { num: 32, answers: ['sun'], maxWords: 1 },
            { num: 33, answers: ['Egyptians', 'egyptians', 'Egyptian'], maxWords: 1 },
            { num: 34, answers: ['monasteries', 'monastery'], maxWords: 1 },
            { num: 35, answers: ['hands', 'hand'], maxWords: 1 },
            { num: 36, answers: ['Huygens', 'huygens'], maxWords: 1 },
            { num: 37, answers: ['accurate'], maxWords: 1 },
            { num: 38, answers: ['spring'], maxWords: 1 },
            { num: 39, answers: ['longitude'], maxWords: 1 },
            { num: 40, answers: ['quartz'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 5, skill: 'reading',
      title: 'Reading — Passage 1: The Domestication of Dogs',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The Domestication of Dogs

The domestic dog is the oldest animal companion of humanity, a relationship that predates agriculture, pottery, and the wheel. Yet the precise origins of this partnership remain one of archaeology's most debated questions. When, where, and how wolves became dogs are matters on which geneticists, archaeologists, and evolutionary biologists continue to disagree vigorously.

The earliest unambiguous fossil evidence for domestic dogs dates to approximately 15,000 years ago, from sites in Europe and the Near East. However, genetic analyses have produced a more complex picture. A 2016 study comparing ancient and modern dog DNA concluded that dogs were domesticated twice independently—once in Europe or the Near East and once in East Asia—before the East Asian lineage partially replaced the European one following human migrations. This scenario remains contested: a 2020 analysis suggested a single domestication event in Southeast Asia or Central Asia, with subsequent dispersal across the globe. The difficulty lies partly in the fact that domestication was not a single moment but likely a drawn-out process spanning thousands of years and involving multiple wolf populations.

How the relationship began is equally uncertain. One widely held theory proposes that wolves began following human hunter-gatherer groups to scavenge scraps and carrion. The bolder, less fearful individuals that approached humans most closely would have gained preferential access to food, and over generations, natural selection would have favoured traits associated with reduced aggression towards humans—a process sometimes called "self-domestication." Supporting this model is a landmark long-term experiment begun in Siberia in 1959 by geneticist Dmitri Belyaev, who selectively bred silver foxes for reduced fear of humans. Within a remarkably small number of generations, Belyaev's foxes began showing physical and behavioural traits associated with domestication: floppy ears, curled tails, shortened snouts, and reduced stress hormone levels. The experiment demonstrated that selection for tameness could rapidly produce the suite of traits observed in domestic animals.

The cognitive abilities that dogs have developed as a result of millennia living alongside humans are extraordinary. Dogs are uniquely sensitive to human social cues: they follow a pointing gesture to locate hidden food, a task that chimpanzees and even wolf pups raised alongside humans perform far less reliably. They track human gaze and have been shown to understand human emotional expressions sufficiently to distinguish photographs of happy and angry faces. Some researchers argue that dogs essentially evolved to read human minds—or at least human intentions—more effectively than any other non-human animal.

The evolutionary success of dogs has come at a cost to the wolves from which they descend. As human populations expanded and natural habitats contracted, wolf populations declined dramatically. Today, domestic dogs outnumber wolves by a ratio of approximately one thousand to one—a striking reversal of the balance that existed at the beginning of the human-canine relationship. The evolutionary bargain struck between early humans and early dogs—shelter and food in exchange for loyalty and labour—has proved highly advantageous for one partner, though perhaps not for the other.`,
      questions: [
        {
          type: 'formgroup', id: 'r1-tfng', part: 5, qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: The earliest fossil evidence for domestic dogs is approximately 15,000 years old.\n2. {{2}}: Genetic studies have produced a single universally accepted theory of dog domestication.\n3. {{3}}: Belyaev's fox experiment began in the 1950s in Russia.\n4. {{4}}: Belyaev selected foxes based on their physical appearance rather than their behaviour.\n5. {{5}}: Foxes in Belyaev's experiment developed curled tails within the first generation.\n6. {{6}}: Dogs perform better than chimpanzees at following a human pointing gesture.\n7. {{7}}: Domestic dogs currently outnumber wild wolves by roughly one thousand to one.`,
          blanks: [
            { num: 1, answers: ['TRUE'] }, { num: 2, answers: ['FALSE'] }, { num: 3, answers: ['TRUE'] },
            { num: 4, answers: ['FALSE'] }, { num: 5, answers: ['NOT GIVEN'] }, { num: 6, answers: ['TRUE'] }, { num: 7, answers: ['TRUE'] },
          ],
        },
        {
          type: 'formgroup', id: 'r1-sent', part: 5, qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `8. Wolves that were less fearful of humans had better access to food scraps, a process sometimes called {{8}}.\n9. Belyaev's experiment showed that selection for {{9}} rapidly produced a range of domestication traits.\n10. Dogs are described as uniquely sensitive to human {{10}} cues.\n11. Unlike dogs, {{11}} are less reliable at following a human pointing gesture to find food.\n12. Some researchers argue that dogs evolved to read human {{12}} more effectively than any other animal.\n13. The passage describes the relationship between early humans and dogs as an evolutionary {{13}}.`,
          blanks: [
            { num: 8, answers: ['self-domestication'] }, { num: 9, answers: ['tameness'] },
            { num: 10, answers: ['social'] }, { num: 11, answers: ['chimpanzees'] },
            { num: 12, answers: ['intentions'] }, { num: 13, answers: ['bargain'] },
          ],
        },
      ],
    },

    {
      part: 6, skill: 'reading',
      title: 'Reading — Passage 2: Vertical Farming',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Vertical Farming

A. Vertical farming—the practice of growing crops in stacked layers inside climate-controlled buildings—has attracted significant investment and media attention over the past decade. Proponents present it as a revolutionary answer to some of the most pressing challenges facing the global food system: land scarcity, water depletion, pesticide use, and the disruption of supply chains by extreme weather events. Critics question whether the technology can deliver on its promises at scale. The debate reflects deeper tensions in how societies think about the future of agriculture.

B. The potential advantages of vertical farming are genuinely compelling. Because crops are grown indoors, they can be protected from pests without pesticides, from frost, drought, and flooding, and from contamination by pathogens common in outdoor environments. Yields per unit of land area can be dramatically higher than conventional agriculture: some vertical farms report yields ten to twenty times greater than field equivalents for leafy greens such as lettuce and spinach. Water use is typically reduced by up to ninety-five percent compared to conventional irrigation, as water is recirculated within the system and losses through evaporation and runoff are minimised.

C. The technology also offers geographic flexibility. Vertical farms can in principle be built anywhere—in urban warehouses close to consumers, in arid regions currently unsuitable for agriculture, or in polar territories where food security depends on costly imports. Japan, which faces severe land constraints and frequent natural disasters, has become a global leader in vertical farming, with hundreds of facilities operating across the country. A growing number of vertical farms have been established in desert regions of the Middle East, supplying fresh produce to populations that would otherwise depend almost entirely on food imports.

D. Despite these advantages, the economics of vertical farming remain challenging. The primary obstacle is energy consumption. Providing the artificial lighting necessary for plant growth requires enormous quantities of electricity, and in most current markets this cost makes vertical farms uncompetitive relative to conventional agriculture for most crops. A 2020 analysis found that the energy cost of producing one kilogram of lettuce in a vertical farm was approximately fifty times higher than that of field-grown lettuce when the full electricity supply chain was considered. As renewable energy costs fall and grid carbon intensity declines, the economics may improve significantly; for now, vertical farming is largely limited to high-value crops—salad leaves, herbs, strawberries—where premium prices can offset elevated production costs.

E. The crop range currently suited to vertical farming is limited in another important way. Staple foods such as wheat, rice, and maize are not economically viable candidates for indoor production: they require large volumes per calorie, tolerate outdoor conditions relatively well, and are highly price-competitive on global commodity markets. The crops best suited to vertical farming are those with short growth cycles, compact growth habits, and high value relative to weight—characteristics that describe a narrow slice of the global diet.

F. Technological advances are reshaping the sector rapidly. LED lighting has dramatically reduced energy consumption compared to earlier grow-light technologies, and the development of LED spectra specifically tailored to optimise plant growth (rather than illuminate for human vision) has produced further efficiency gains. Robotics and automation are reducing labour costs, which represent the second-largest cost category after energy. Advances in crop genetics are also relevant: plant varieties optimised specifically for indoor, low-light, high-efficiency cultivation are being developed. Whether these advances will prove sufficient to expand vertical farming from a niche technology into a mainstream component of the food system remains an open question.`,
      questions: [
        {
          type: 'matching', id: 'r2-match', part: 6, qRange: [14, 20],
          groupLabel: 'The passage has six paragraphs, A–F. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'An explanation of why staple crops are not suitable for vertical farming', answer: 'E' },
            { num: 15, stem: 'A description of how water is conserved in vertical farming systems', answer: 'B' },
            { num: 16, stem: 'Examples of countries where vertical farming has been widely adopted', answer: 'C' },
            { num: 17, stem: 'Specific data comparing the energy costs of vertical vs field-grown produce', answer: 'D' },
            { num: 18, stem: 'A reference to how new lighting technologies have improved efficiency', answer: 'F' },
            { num: 19, stem: 'A general introduction to the debate about vertical farming\'s potential', answer: 'A' },
            { num: 20, stem: 'A mention of the crops for which vertical farming is currently most economically feasible', answer: 'D' },
          ],
          endings: [
            { letter: 'A', text: 'Paragraph A' }, { letter: 'B', text: 'Paragraph B' },
            { letter: 'C', text: 'Paragraph C' }, { letter: 'D', text: 'Paragraph D' },
            { letter: 'E', text: 'Paragraph E' }, { letter: 'F', text: 'Paragraph F' },
          ],
        },
        {
          type: 'formgroup', id: 'r2-sent', part: 6, qRange: [21, 26],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `21. Vertical farms can reduce water use by up to {{21}} percent compared to conventional irrigation.\n22. Japan has become a global leader in vertical farming partly due to its severe {{22}} constraints.\n23. The main economic obstacle for vertical farming is its high {{23}} consumption.\n24. Crops with short {{24}} cycles and compact growth habits are best suited to vertical farming.\n25. LED spectra are now tailored to optimise {{25}} rather than to illuminate for human vision.\n26. Plant varieties designed for indoor cultivation with low {{26}} are currently being developed.`,
          blanks: [
            { num: 21, answers: ['ninety-five', '95'] }, { num: 22, answers: ['land'] },
            { num: 23, answers: ['energy'] }, { num: 24, answers: ['growth'] },
            { num: 25, answers: ['plant growth'] }, { num: 26, answers: ['light', 'low-light'] },
          ],
        },
      ],
    },

    {
      part: 7, skill: 'reading',
      title: 'Reading — Passage 3: The Psychology of Money',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `The Psychology of Money

Economists have long modelled human beings as rational agents who maximise utility—making financial decisions by carefully calculating costs and benefits and acting in their own long-term self-interest. This model has proved analytically powerful but empirically problematic. Decades of research in behavioural economics and psychology have revealed systematic, predictable deviations from rational behaviour in financial decision-making, driven by cognitive biases, emotional responses, and social influences that the classical model does not accommodate.

One of the most well-documented phenomena is loss aversion: the tendency for losses to feel psychologically more painful than equivalent gains feel pleasurable. Prospect theory, developed by psychologists Daniel Kahneman and Amos Tversky in 1979, formalised this observation. Their research demonstrated that most people feel the pain of losing one hundred pounds roughly twice as intensely as they feel the pleasure of gaining one hundred pounds. This asymmetry has profound implications for financial behaviour: it helps explain why investors hold losing stocks too long (hoping to "break even" before selling) and sell winning stocks too early (to lock in gains before they disappear). It also explains why insurance and warranty products, which protect against loss rather than delivering gain, are purchased far more widely than would be predicted by a purely rational calculation of expected value.

Mental accounting—the tendency to categorise and evaluate money differently depending on its source or intended purpose—is another departure from classical rationality. People treat unexpected windfalls differently from earned income: money won in a casino is more likely to be spent recklessly than money earned through work, even though both have identical purchasing power. Similarly, people assign different values to money in different "mental accounts": the money earmarked for a holiday fund feels qualitatively different from money in a current account, even if the nominal amounts are identical. This segmentation of money into psychological categories influences spending and saving decisions in ways that have no basis in economics but are highly predictable in practice.

Social comparison is a further force that distorts financially rational behaviour. Research by economists Robert Frank and Philip Cook has documented what they call "expenditure cascades": as the conspicuous consumption of high-income groups rises, those immediately below in the income distribution feel pressure to match it, driving up spending across the economy. This dynamic is intensified by social media, which creates constant visibility of others' consumption. Studies have found that exposure to images of luxury spending on platforms such as Instagram is associated with increased materialistic aspirations and reduced financial wellbeing among users.

Time inconsistency—the tendency to prefer smaller rewards now over larger rewards later—poses particular challenges for long-term financial planning. Behavioural economists call this "present bias": people systematically discount the future in ways inconsistent with their own stated long-term preferences. Someone who genuinely wants to save more for retirement will nonetheless consistently find reasons to spend today and save "next month." Default enrolment in pension schemes—where employees must actively opt out rather than opt in—exploits present bias constructively: when saving is the default option, participation rates rise dramatically compared to opt-in schemes.

Understanding the psychology of money has significant implications beyond individual financial wellbeing. The design of financial products, retirement systems, and consumer lending regulation increasingly draws on behavioural insights to improve outcomes at a population level. Critics of this "behavioural nudge" approach argue that it can be paternalistic—guiding individuals toward choices that policy-makers deem optimal, rather than respecting individual autonomy. Defenders counter that the alternative—continuing to design systems as if humans were the perfectly rational agents of classical economics—leads to demonstrably worse outcomes for real people.`,
      questions: [
        {
          type: 'mcq', id: 'r3-q27', part: 7,
          text: 'What does prospect theory, as described in the passage, demonstrate?',
          options: [
            'That people feel equal emotional responses to gains and losses of the same amount.',
            'That people experience the pain of losses approximately twice as strongly as the pleasure of equivalent gains.',
            'That rational investors always hold losing stocks until they recover their full value.',
            'That insurance products are purchased because they deliver measurable financial gain.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 'r3-q28', part: 7,
          text: 'According to the passage, what does "mental accounting" refer to?',
          options: [
            'The formal process of keeping financial records in separate accounts.',
            'A psychological tendency to value money differently based on its source or intended use.',
            'The rational calculation of expected value when making financial decisions.',
            'A banking practice of separating holiday funds from regular income.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 'r3-q29', part: 7,
          text: 'What is an "expenditure cascade" as described by Frank and Cook?',
          options: [
            'A government scheme to reduce excessive spending among high earners.',
            'A pattern where high-income spending pressure drives increased spending further down the income distribution.',
            'The tendency for windfall money to be spent more quickly than earned income.',
            'A psychological effect caused by the visibility of others\' savings rather than spending.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 'r3-q30', part: 7,
          text: 'What is the main argument against "behavioural nudge" approaches mentioned in the passage?',
          options: [
            'They are ineffective because people ignore default settings.',
            'They are too costly to implement in pension systems.',
            'They may be paternalistic by guiding people towards choices chosen by policy-makers.',
            'They have been shown to reduce participation in retirement savings schemes.',
          ],
          answer: 2,
        },
        {
          type: 'formgroup', id: 'r3-ynng', part: 7, qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: Classical economic models assume people always act in their own long-term financial interest.\n32. {{32}}: Loss aversion explains why people sell losing investments before they recover.\n33. {{33}}: Money won through gambling has the same purchasing power as money earned through work.\n34. {{34}}: Research has found that Instagram use is linked to increased financial dissatisfaction.\n35. {{35}}: Present bias means people overestimate future rewards relative to immediate ones.\n36. {{36}}: The writer ultimately argues that behavioural nudge policies are always superior to classical approaches.`,
          blanks: [
            { num: 31, answers: ['YES'] }, { num: 32, answers: ['NO'] }, { num: 33, answers: ['YES'] },
            { num: 34, answers: ['YES'] }, { num: 35, answers: ['NO'] }, { num: 36, answers: ['NOT GIVEN'] },
          ],
        },
        {
          type: 'formgroup', id: 'r3-sent', part: 7, qRange: [37, 40],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `37. Kahneman and Tversky's research on loss aversion was formalised in a theory called {{37}} theory.\n38. The tendency to prefer smaller rewards now over larger future rewards is called {{38}}.\n39. Default {{39}} in pension schemes significantly increases participation rates compared to opt-in systems.\n40. Critics of behavioural nudges argue such approaches may undermine {{40}} by directing people towards policy-maker-chosen outcomes.`,
          blanks: [
            { num: 37, answers: ['prospect'] }, { num: 38, answers: ['present bias'] },
            { num: 39, answers: ['enrolment'] }, { num: 40, answers: ['individual autonomy'] },
          ],
        },
      ],
    },

    {
      part: 8, skill: 'writing', title: 'Writing — Task 1',
      instructions: 'You should spend about 20 minutes on this task. Write at least 150 words.',
      questions: [{
        type: 'write', id: 'w1', part: 8, taskNumber: 1,
        imageUrl: '/assets/ielts/charts/set8-task1.svg',
        imageAlt: 'Diagram showing the process by which solar panels generate and distribute electricity',
        stimulus: 'The diagram below shows how solar panels generate and distribute electricity to homes and the national grid.',
        text: 'Summarise the information by selecting and reporting the main features and stages of the process.',
        minWords: 150,
      }],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Task 2',
      instructions: 'You should spend about 40 minutes on this task. Write at least 250 words.',
      questions: [{
        type: 'write', id: 'w2', part: 9, taskNumber: 2,
        stimulus: 'Some people think that governments should provide financial assistance to artists such as musicians, painters, and poets, while others believe that artists should seek funding from other sources.',
        text: 'Discuss both views and give your own opinion.',
        minWords: 250,
      }],
    },
    {
      part: 10, skill: 'speaking', title: 'Speaking',
      instructions: 'Answer the following questions.',
      questions: [
        {
          type: 'speak', id: 'sp1', part: 10, partNumber: 1,
          text: 'Part 1 — Personal questions about art and creativity',
          followUp: [
            'Do you enjoy any form of art, such as painting, music, or writing?',
            'Have you ever tried to create something artistic? Tell me about it.',
            'Do you think art is important in everyday life? Why or why not?',
            'Are there any artists or musicians you particularly admire?',
          ],
        },
        {
          type: 'speak', id: 'sp2', part: 10, partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a piece of art, music, or literature that has had a strong impact on you.\n\nYou should say:\n• what it is and who created it\n• when and how you first encountered it\n• why it made such an impression on you\n• and explain what you think it communicates or represents`,
        },
        {
          type: 'speak', id: 'sp3', part: 10, partNumber: 3,
          text: 'Part 3 — Discussion: Art, culture, and society',
          followUp: [
            'Should governments fund arts and culture programmes? Why or why not?',
            'Do you think digital technology has made it easier or harder for artists to make a living?',
            'How important is it for schools to include arts education in their curriculum?',
            'Do you think commercial art (created for profit) can be just as valuable as non-commercial art?',
          ],
        },
      ],
    },
  ],
};

export default mock;
