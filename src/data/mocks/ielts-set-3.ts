import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-3',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 3',
  subtitle: 'The Silk Road · Ocean Plastic Pollution · Artificial Intelligence in Medicine',
  timeMinutes: 164,
  sections: [

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-3.mp3',
      title: 'Listening — Section 1: Library Membership',
      instructions: 'You will hear a conversation between a library assistant and a new member applying for a library card. Listen and answer Questions 1–10.',
      transcript: `ASSISTANT: Good afternoon, City Library. How can I help you?

MEMBER: Hi, I'd like to sign up for a library membership, please.

ASSISTANT: Of course. Can I take your full name?

MEMBER: It's Sophie Marsh.

ASSISTANT: And your date of birth?

MEMBER: The fourteenth of March, 1998.

ASSISTANT: Thank you. Your address?

MEMBER: Flat 7, 33 Berkley Street, Oxford. The postcode is OX1 4PL.

ASSISTANT: And a contact number?

MEMBER: My home phone is 01865 552 784.

ASSISTANT: Do you have an email address?

MEMBER: Yes, it's sophie.marsh@greenmail.co.uk.

ASSISTANT: What type of membership are you interested in? We offer standard, which gives you up to eight books for three weeks.

MEMBER: I think standard is fine for now.

ASSISTANT: Great. There's a one-off registration fee of two pounds.

MEMBER: That's fine. Can I also reserve books online?

ASSISTANT: Yes, with standard membership you can reserve up to three books at a time through our website.

ASSISTANT: Premium membership gives you twelve books and access to our digital archive.

ASSISTANT: Are you interested in any particular subject area? We can send you newsletters about new arrivals.

MEMBER: Yes, I'm mainly interested in history and science.

ASSISTANT: Noted. The card usually takes five working days to arrive by post. In the meantime, I can give you a temporary pass for today.

MEMBER: That's great. Thank you.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 7],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'City Library — Membership Application',
          example: 'Name:  Sophie Marsh',
          template: `Date of birth: {{1}} March 1998

Address: Flat 7, 33 {{2}} Street, Oxford — OX1 4PL

Home phone: 01865 552 784

Email: {{3}}

Membership type: {{4}}

Maximum books borrowed: {{5}}

Reservation limit (online): {{6}} books

Registration fee: £{{7}}`,
          blanks: [
            { num: 1, answers: ['14th', '14', 'fourteenth'], maxWords: 1 },
            { num: 2, answers: ['Berkley'], maxWords: 1 },
            { num: 3, answers: ['sophie.marsh@greenmail.co.uk'], maxWords: 1 },
            { num: 4, answers: ['standard'], maxWords: 1 },
            { num: 5, answers: ['8', 'eight'], maxWords: 1 },
            { num: 6, answers: ['3', 'three'], maxWords: 1 },
            { num: 7, answers: ['2', 'two'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [8, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD ONLY for each answer.',
          headers: ['Membership type', 'Books allowed', 'Digital service'],
          rows: [
            ['Standard', '8 books / 3 weeks', { num: 8, answers: ['website'], maxWords: 1 }],
            ['Premium', { num: 9, answers: ['12', 'twelve'], maxWords: 1 }, { num: 10, answers: ['archive'], maxWords: 1 }],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-3.mp3',
      title: 'Listening — Section 2: Talk about a Recycling Programme',
      instructions: 'You will hear a talk given at a community meeting about a new recycling programme. Listen and answer Questions 11–20.',
      transcript: `Good evening, everyone. Thank you for coming along to tonight's community meeting. My name is Rachel Davis, and I work for the council's environmental services team. Tonight I want to tell you about our new residential recycling programme, which launches next month.

First, the background. Our borough currently recycles about 32% of its household waste, which is below the national average of 45%. The new programme aims to raise that figure to at least 55% by the end of the year.

So what's changing? The biggest change is the introduction of separate bins for food waste. Up to now, food waste has been going into general waste. Starting next month, every household will receive a small kitchen caddy for collecting food scraps, which will be emptied into a larger outdoor bin collected weekly. The material will go to an anaerobic digestion plant where it is converted into energy and compost.

We're also expanding what can go into the dry recycling bin. From next month, you'll be able to recycle plastic film — like the wrapping on ready meals and carrier bags. Previously this had to go to collection points at supermarkets.

Glass will no longer go in your mixed recycling bin. You'll need to use the bottle banks in the area — we're adding six new bottle bank sites across the borough to make this more convenient.

Paper and card should still go in the blue bin, rinsed cans and tins in the green bin.

We know change takes some getting used to. So each household will receive a printed guide through the post, and there's a new website at recycleright.gov.uk with videos and a postcode checker to find your nearest bottle bank.

If you have questions, our helpline is open Monday to Friday, eight to six. The number is 0800 445 6712. Thank you.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO examples of newly accepted plastic film does the speaker mention?',
          options: [
            { letter: 'A', text: 'glass bottles' },
            { letter: 'B', text: 'food waste' },
            { letter: 'C', text: 'wrapping on ready meals' },
            { letter: 'D', text: 'carrier bags previously recycled at supermarkets' },
            { letter: 'E', text: 'cardboard packaging' },
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
          title: 'New Recycling Programme — Key Details',
          template: `Current recycling rate: {{13}}%

Target recycling rate: at least {{14}}%

Food waste

• New {{15}} provided for kitchen food scraps.
• Collected {{16}} and sent to anaerobic digestion plant.
• Converted into {{17}} and compost.

Glass

• No longer accepted in mixed {{18}} bin.
• Use bottle banks — {{19}} new sites being added.

Support resources

• Printed {{20}} sent to each household.
• Website: recycleright.gov.uk`,
          blanks: [
            { num: 13, answers: ['32'], maxWords: 1 },
            { num: 14, answers: ['55'], maxWords: 1 },
            { num: 15, answers: ['caddy', 'kitchen caddy'], maxWords: 2 },
            { num: 16, answers: ['weekly'], maxWords: 1 },
            { num: 17, answers: ['energy'], maxWords: 1 },
            { num: 18, answers: ['recycling'], maxWords: 1 },
            { num: 19, answers: ['6', 'six'], maxWords: 1 },
            { num: 20, answers: ['guide'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-3.mp3',
      title: 'Listening — Section 3: Seminar on Urban Farming',
      instructions: 'You will hear a seminar discussion between a tutor and two students about urban farming. Listen and answer Questions 21–30.',
      transcript: `TUTOR: Right, let's begin. You've both looked at the reading on urban farming. What were your initial impressions?

LEE: I found it really interesting. I hadn't realised how many different forms urban farming can take — rooftop gardens, vertical farms with stacked layers, and community allotments.

ANNA: Yes. What struck me most was the potential for urban farming to address food security issues in cities. If residents can grow some of their own produce, that reduces dependence on supply chains that can be disrupted.

TUTOR: Good point. Can you say more about that, Anna?

ANNA: Well, during the pandemic, a lot of city residents suddenly became aware of how fragile the food distribution network was. Urban farms can provide a buffer against those kinds of shocks.

LEE: I'd add that there's also a social dimension. Community gardens can help build relationships between neighbours who might otherwise never interact. There's evidence that social cohesion in areas with active community gardens is significantly higher.

TUTOR: That's been well documented. What about the challenges?

ANNA: Space is obviously a major constraint in dense urban areas. Land is expensive, and there's always competition from housing and commercial development.

LEE: I read that one model that's become popular is vertical farming — growing crops in stacked layers inside controlled environments. It uses far less land, but the energy costs can be very high.

TUTOR: Yes, that's one of the key criticisms of vertical farming. If the electricity comes from fossil fuels, the carbon footprint can actually be worse than conventional agriculture.

ANNA: So the viability really depends on the energy source. Renewable energy would change that calculation entirely.

LEE: Another challenge is expertise. A lot of urban residents simply don't know how to grow food. There's a need for training and ongoing support.

TUTOR: Exactly. Some cities have addressed this by embedding agricultural education into school curricula. What conclusions would you draw from all this?

ANNA: I think urban farming is most viable as a complement to, rather than a replacement for, conventional agriculture. It can provide fresh produce locally and build community, but it can't feed entire cities.

LEE: I agree. And for it to succeed long-term, there needs to be policy support — planning regulations that make it easier to establish urban farms, and subsidies to offset the high costs.

TUTOR: Very thoughtful. Let's write up some of those points for next week's presentation.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'According to Anna, urban farming can help cities because it reduces dependence on',
          options: [
            'expensive land',
            'fragile supply chains',
            'fossil fuel energy',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'Lee suggests that community gardens improve',
          options: [
            'local air quality',
            'food security',
            'social cohesion',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'What is the main criticism of vertical farming mentioned in the seminar?',
          options: [
            'It requires too much space.',
            'It can have a high carbon footprint.',
            'It is unsuitable for most crops.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'Lee and Anna agree that urban farming should be seen as',
          options: [
            'a replacement for conventional agriculture',
            'the future of global food production',
            'a complement to conventional agriculture',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'Lee says that for urban farming to succeed long-term, there needs to be',
          options: [
            'technological innovation',
            'policy support and subsidies',
            'changes in consumer habits',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `Types of urban farming mentioned

• {{26}} gardens on building tops
• Vertical farms using stacked {{27}}
• Community {{28}} for residents

Key challenges

• {{29}} is expensive and scarce in dense cities.
• Urban residents often lack the {{30}} to grow food.`,
          blanks: [
            { num: 26, answers: ['Rooftop', 'rooftop'], maxWords: 1 },
            { num: 27, answers: ['layers'], maxWords: 1 },
            { num: 28, answers: ['allotments'], maxWords: 1 },
            { num: 29, answers: ['Land', 'land'], maxWords: 1 },
            { num: 30, answers: ['expertise'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-3.mp3',
      title: 'Listening — Section 4: Lecture on the History of Writing',
      instructions: 'You will hear a lecture about the history of writing. Listen and answer Questions 31–40.',
      transcript: `Writing is arguably the most transformative invention in human history. Today I want to trace the origins and development of written language from its earliest forms to the widespread literacy of the modern era.

The earliest known writing system is cuneiform, developed by the Sumerians of ancient Mesopotamia around 3200 BCE. Originally pictographic — that is, based on simple pictures representing objects — cuneiform evolved over centuries into a more abstract system of wedge-shaped marks pressed into clay tablets with a reed stylus. It was used mainly for administrative and commercial record-keeping: lists of goods, taxes, and transactions.

Independently, and around the same time, hieroglyphics emerged in ancient Egypt. Like early cuneiform, Egyptian hieroglyphics began as a pictographic system but also developed sound symbols, making it a mixed system. Hieroglyphics were used not only for administration but also for religious texts, royal inscriptions, and later, literary works.

Both systems were highly complex and required years of specialist training to master. Literacy was therefore restricted to a small professional class of scribes, who held considerable social power.

A fundamental change came with the development of alphabetic writing. The first true alphabet — in which each symbol represents a consonant sound — is generally attributed to the Phoenicians, around 1050 BCE. This system spread to the Greeks, who made the crucial innovation of adding vowels, producing the first complete alphabet. The Roman alphabet, derived from Greek, became the basis for most European writing systems in use today.

Because alphabets have far fewer symbols than logographic or syllabic systems — typically between twenty and thirty — they are much easier to learn. This made widespread literacy possible for the first time.

The invention of the printing press by Johannes Gutenberg around 1440 CE was the next watershed moment. By enabling the mass reproduction of texts, it dramatically accelerated the spread of literacy and of new ideas across Europe, and contributed directly to transformations such as the Reformation and the Scientific Revolution.

Today, digital technology has again changed the nature of writing and reading, creating new genres and new challenges — including the decline of handwriting, the rise of informal written communication, and ongoing debates about what literacy means in a digital age.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'THE HISTORY OF WRITING',
          template: `Cuneiform (c. 3200 BCE)

• Developed by the Sumerians of ancient {{31}}.
• Originally {{32}} — based on pictures representing objects.
• Marks made in clay with a reed {{33}}.
• Used mainly for {{34}} and commercial records.

Hieroglyphics

• Emerged in ancient {{35}}.
• A mixed system using pictures and {{36}} symbols.
• Also used for {{37}} texts and royal inscriptions.

The Alphabet

• First true alphabet attributed to the {{38}}, c. 1050 BCE.
• Greeks added {{39}}, creating the first complete alphabet.
• Fewer symbols made widespread {{40}} possible.`,
          blanks: [
            { num: 31, answers: ['Mesopotamia'], maxWords: 1 },
            { num: 32, answers: ['pictographic'], maxWords: 1 },
            { num: 33, answers: ['stylus'], maxWords: 1 },
            { num: 34, answers: ['administrative'], maxWords: 1 },
            { num: 35, answers: ['Egypt'], maxWords: 1 },
            { num: 36, answers: ['sound'], maxWords: 1 },
            { num: 37, answers: ['religious'], maxWords: 1 },
            { num: 38, answers: ['Phoenicians'], maxWords: 1 },
            { num: 39, answers: ['vowels'], maxWords: 1 },
            { num: 40, answers: ['literacy'], maxWords: 1 },
          ],
        },
      ],
    },

    // ─── READING ──────────────────────────────────────────────────────────────

    {
      part: 5,
      skill: 'reading',
      title: 'Reading Passage 1: The Silk Road',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The Silk Road was not a single road but a changing network of overland and maritime routes linking communities across East, Central, South, and West Asia with the Mediterranean and parts of Africa. Some sections existed long before sustained long-distance exchange expanded in the second century BCE, and different corridors flourished at different times. UNESCO describes a system of trade and communication whose political, social, and cultural effects reached far beyond goods. Merchants rarely travelled from one end to the other; cargo commonly passed through many intermediaries. Despite the modern name, silk was only one of numerous commodities carried along these routes.

The term 'Silk Road' is itself recent. It is generally credited to the German geographer Ferdinand von Richthofen, who published the expression Seidenstrasse in 1877. The plural "Silk Roads" better captures routes that divided, rejoined, and shifted with politics and demand. They carried spices, ceramics, glass, cotton textiles, precious metals and gems, paper, technologies, animals, and enslaved people. Goods could also change meaning as they moved: glass made in western Asia became a prestige object farther east, while Chinese silk served as clothing, diplomatic tribute, and currency.

Chinese states supplied highly valued silk and guarded knowledge of sericulture — the cultivation of silkworms and processing of their cocoons — for centuries. This monopoly concerned silk production knowledge, not all exports or all trade across the network. Calling China the single dominant exporter obscures a decentralised system in which Central Asian, Persian, Indian, Arab, and Mediterranean producers and merchants all contributed. Silk production eventually spread beyond China by several routes. A Byzantine account tells of monks carrying silkworm eggs west in hollow walking staves in the sixth century CE, but historians treat the episode as a transmitted story rather than complete proof of how the knowledge moved.

Caravans were a primary means of overland transport. Merchants hired guides, guards, handlers, and pack animals, adjusting routes to water, weather, taxes, conflict, and seasonal closures. The two-humped Bactrian camel was valued for carrying loads through cold and arid Central Asian terrain. Oasis towns such as Samarkand, Dunhuang, and Kashgar were important because they offered water, fodder, storage, lodging, markets, and links to other routes, not because they had unusually large armies. These hubs also supported translators, craftspeople, religious institutions, and officials who made exchange possible.

The Silk Road was not only a conduit for goods but also for ideas, religions, technologies, and diseases. Buddhism spread from India to China, Korea, and Japan along the Silk Road. Islam reached Central Asia and later Southeast Asia through the same network. The Black Death, which devastated Europe in the fourteenth century, is believed to have travelled westward from Central Asia along trade routes.

Evidence for these exchanges comes from many sources rather than a single written record. Archaeologists compare coins, textiles, glass, ceramics, plant remains, inscriptions, and shipwreck cargoes with the places where materials were made. Manuscripts preserved in dry environments around Dunhuang record contracts, letters, religious texts, and several languages. Isotopic and genetic analyses can sometimes reveal the origin of animals, plants, or people, while art shows motifs adapted in new settings. Each source has limits: an imported object proves movement, but it may not identify every merchant or the precise route taken. Historians therefore reconstruct patterns by combining material evidence with documents produced by travellers, courts, monasteries, and trading communities.

There was no single moment when the network closed. Fragmentation of Mongol rule reduced the relative security supporting some overland movement, while wars, new states, and taxes redirected particular corridors. From the late fifteenth century, Portuguese voyages around southern Africa established direct European maritime access to Asian markets. Ships could carry much larger cargoes than camel caravans, but sea travel was not always faster or safer, and overland exchange continued into the sixteenth century and beyond. Historians therefore describe changing commercial geography rather than a simple replacement of land by sea.

Today, interest in the Silk Road has been revived by China's Belt and Road Initiative, launched in 2013, which seeks to build new infrastructure — roads, railways, ports, and pipelines — connecting China with Europe, Africa, and South Asia. Supporters see it as a new era of connectivity; critics raise concerns about debt and geopolitical influence.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-summary',
          part: 5,
          qRange: [1, 5],
          groupLabel: 'Complete the summary.\nChoose ONE WORD ONLY from the passage for each answer.',
          template: `The term 'Silk Road' was invented by a German {{1}} in 1877. Although silk was a major export, many other goods also travelled these routes, including {{2}} and paper.

China maintained a {{3}} on silk production for centuries, protecting the secrets of silkworm cultivation. The caravans that crossed these routes relied heavily on the Bactrian {{4}}, which could endure extreme conditions.

The Silk Road's decline began after the collapse of the {{5}} Empire and the rise of sea trade routes.`,
          blanks: [
            { num: 1, answers: ['geographer'], maxWords: 1 },
            { num: 2, answers: ['spices', 'glass'], maxWords: 1 },
            { num: 3, answers: ['monopoly'], maxWords: 1 },
            { num: 4, answers: ['camel'], maxWords: 1 },
            { num: 5, answers: ['Mongol'], maxWords: 1 },
          ],
        },
        {
          type: 'mcq',
          id: 'r1q6',
          part: 5,
          text: 'The Silk Road was a single, well-defined trade route.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r1q7',
          part: 5,
          text: 'According to legend, the secret of silk production was brought out of China by monks.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r1q8',
          part: 5,
          text: 'Samarkand and Dunhuang were important cities because of their large armies.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r1q9',
          part: 5,
          text: 'Buddhism spread to East Asia partly through the Silk Road.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'multiselect',
          id: 'r1-multi',
          part: 5,
          qRange: [10, 11],
          text: 'Which TWO factors contributed to the decline of the Silk Road?',
          options: [
            { letter: 'A', text: 'the spread of the Black Death' },
            { letter: 'B', text: 'the collapse of the Mongol Empire' },
            { letter: 'C', text: 'the development of new maritime routes' },
            { letter: 'D', text: 'the end of Chinese silk production' },
            { letter: 'E', text: 'the rise of Arab traders in the region' },
          ],
          selectCount: 2,
          answers: ['B', 'C'],
        },
        {
          type: 'matching',
          id: 'r1-match',
          part: 5,
          qRange: [12, 13],
          groupLabel: 'Match each description with the correct person or place A–E.\nWrite the correct letter, A–E, next to questions 12–13.',
          items: [
            { num: 12, stem: 'Coined the term "Silk Road"', answer: 'A' },
            { num: 13, stem: 'First European explorers to develop a sea route to Asia', answer: 'C' },
          ],
          endings: [
            { letter: 'A', text: 'Ferdinand von Richthofen' },
            { letter: 'B', text: 'Genghis Khan' },
            { letter: 'C', text: 'the Portuguese' },
            { letter: 'D', text: 'the Sumerians' },
            { letter: 'E', text: 'Kublai Khan' },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading Passage 2: Ocean Plastic Pollution',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Plastic pollution is a major environmental problem, but global totals vary with definitions, years, and models. The OECD estimated that 6.1 million tonnes of plastic waste entered aquatic environments in 2019 and that 1.7 million tonnes flowed into the ocean that year. Other studies use different boundaries and produce higher values, so an undated claim that exactly eight million tonnes enters annually hides uncertainty. Plastic harms wildlife and habitats, creates costs for coastal communities, and occurs in seafood and human tissue. Detection alone does not establish the size of a health effect, and scientists are still distinguishing exposure from demonstrated harm.

Plastic reaches the ocean through rivers, storm drains, wind, wastewater, direct coastal dumping, fishing, aquaculture, and shipping. Mismanaged waste on land is a major source, while lost fishing gear can dominate some categories of large floating debris. Rivers are important pathways, but plastic may remain on floodplains, banks, or beds for years before reaching the sea. Ocean currents can then move debris thousands of kilometres. The North Pacific Garbage Patch is a broad zone where circulating currents concentrate material; it is not a solid island and contains numerous small fragments as well as larger objects.

Most conventional plastics persist for long periods rather than biodegrading rapidly like food waste. Sunlight, heat, waves, and abrasion cause weathering and photodegradation, breaking items into smaller pieces without necessarily removing the polymer. Particles smaller than five millimetres are called microplastics; some are manufactured at that size and others form from larger products. They occur in deep-sea sediment, ice, air, water, wildlife, and human samples. Laboratory research shows that particles or associated chemicals can affect feeding, inflammation, reproduction, or hormone function in some organisms, but dose, polymer, shape, and exposure route matter. Evidence for population-level ecological effects and human clinical outcomes remains incomplete.

Marine wildlife is harmed in multiple ways. Sea turtles, whales, and seabirds regularly ingest plastic, mistaking it for prey. Dolphins, seals, and sea turtles become entangled in plastic fishing gear and packaging, leading to injury and drowning. Coral reefs are also affected: plastic debris increases the risk of disease and can physically smother reef structures.

Measuring the problem is difficult because methods capture different fractions. A surface trawl may miss particles below its mesh size, items suspended deeper in the water, and dense polymers that sink. Beach counts are influenced by tides, storms, visitors, and cleanup schedules. River models combine observations with estimates of waste generation and transport, so uncertainty grows where monitoring is sparse. Researchers must also decide whether to report the number of particles, their mass, polymer type, or potential toxicity. Millions of tiny fragments can dominate a count while a few heavy fishing nets dominate mass. Transparent definitions and repeated sampling are therefore necessary when comparing places or judging whether policy has reduced leakage.

Addressing ocean plastic pollution requires action across the product life cycle. Avoiding unnecessary products, designing items for reuse and repair, collecting waste reliably, and preventing pellet and fishing-gear loss can stop leakage. Extended producer responsibility schemes shift some financial or operational responsibility for end-of-life management to producers, but results depend on coverage, fees, enforcement, and recycling markets. Consumer measures can reduce selected single-use items, while procurement rules and product standards can change systems at larger scale. Substituting another material is not automatically beneficial unless its full environmental costs are assessed.

Policy must also distinguish upstream and downstream action. Upstream measures change product design, material demand, and business models before waste exists. Downstream measures collect, sort, recycle, incinerate, or dispose of material after use. Better collection can sharply reduce leakage, yet it does not by itself slow growth in production or address additives that hinder safe recycling. Conversely, a ban on one item may have little effect if enforcement is weak or an equally disposable substitute takes its place. Effective programmes set measurable goals, publish material-flow data, and assign costs and responsibilities across producers, retailers, consumers, and public authorities.

Cleaning up plastic already in the ocean is far more difficult. Beach and harbour collection can remove accessible debris and identify local sources, but open-ocean systems face storms, maintenance, fuel use, bycatch risk, and dispersed microplastics. They cannot capture plastic on the seabed or particles continually arriving from rivers. Cleanup can complement source control but cannot substitute for it. Comparable monitoring is essential; otherwise a change in measured debris may reflect different nets, locations, or particle-size thresholds rather than a real improvement. Prevention and accountable waste systems remain the central strategy.`,
      questions: [
        {
          type: 'mcq',
          id: 'r2q14',
          part: 6,
          text: 'Scientists fully understand the consequences of ocean plastic pollution.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r2q15',
          part: 6,
          text: 'Most ocean plastic comes from land sources.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r2q16',
          part: 6,
          text: 'The North Pacific Garbage Patch is entirely made up of large plastic items.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r2q17',
          part: 6,
          text: 'Microplastics have been detected in the human body.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r2q18',
          part: 6,
          text: 'Extended producer responsibility schemes have been trialled in some countries.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'r2-notes',
          part: 6,
          qRange: [19, 23],
          groupLabel: 'Complete the notes below.\nChoose ONE WORD ONLY from the passage for each answer.',
          title: 'Ocean Plastic — Key Facts',
          template: `• The OECD estimated that {{19}} million tonnes of plastic flowed into the ocean in 2019.
• Ocean {{20}} can move plastic thousands of kilometres.
• Plastic is broken down by ultraviolet light through {{21}}.
• Fragments smaller than 5mm are called {{22}}.
• Microplastics can disrupt {{23}} function in living organisms.`,
          blanks: [
            { num: 19, answers: ['1.7'], maxWords: 1 },
            { num: 20, answers: ['currents'], maxWords: 1 },
            { num: 21, answers: ['photodegradation'], maxWords: 1 },
            { num: 22, answers: ['microplastics'], maxWords: 1 },
            { num: 23, answers: ['hormone'], maxWords: 1 },
          ],
        },
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [24, 26],
          groupLabel: 'Match each animal with the correct threat A–F.\nWrite the correct letter, A–F, next to questions 24–26.',
          items: [
            { num: 24, stem: 'Sea turtles and whales', answer: 'B' },
            { num: 25, stem: 'Dolphins and seals', answer: 'D' },
            { num: 26, stem: 'Coral reefs', answer: 'F' },
          ],
          endings: [
            { letter: 'A', text: 'absorb toxic chemicals from microplastics' },
            { letter: 'B', text: 'ingest plastic mistaken for prey' },
            { letter: 'C', text: 'lose habitat to plastic-covered seabeds' },
            { letter: 'D', text: 'become entangled in plastic fishing gear' },
            { letter: 'E', text: 'suffer hormonal disruption from microplastics' },
            { letter: 'F', text: 'face increased disease risk and smothering from plastic debris' },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading Passage 3: Artificial Intelligence in Medicine',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `Artificial intelligence is increasingly used in medical research, administration, screening, imaging, and clinical decision support. In carefully defined retrospective tests, some systems have matched or exceeded specialist performance on a narrow task. Such comparisons do not show that a model can replace a clinician across different patients, hospitals, and workflows. Performance also depends on reference labels, the chosen threshold, and disease prevalence in the evaluation sample. Integration into healthcare therefore raises unresolved questions about safety, accountability, equity, privacy, and the human dimension of medicine.

Many current medical AI tools use machine learning, including deep learning, in which artificial neural networks learn patterns from labelled examples. Imaging is prominent because scans can be represented numerically and paired with diagnoses or expert annotations. Models have been developed to detect diabetic retinopathy, certain cancers, and signs of pneumonia. Reported sensitivity and specificity can be high on a test set, yet those values describe different errors and vary when a decision threshold changes. A credible assessment also asks whether data came from independent institutions and whether performance was evaluated prospectively in the intended clinical setting.

The potential benefits are substantial. In regions with shortages of specialist physicians, a validated tool could extend access to diagnostic support; elsewhere it might prioritise urgent cases or reduce repetitive work. Systems can process more records than one clinician and do not experience fatigue. They are not free from bias, however. Historical decisions, missing populations, measurement choices, and optimisation targets can encode or amplify unfair patterns. Clinicians may also develop automation bias, accepting a confident recommendation and overlooking an error they would otherwise have noticed.

Significant technical challenges remain. A model trained on images from one hospital may perform poorly at another because equipment, patient demographics, disease prevalence, or imaging protocols differ. This is the distribution shift problem. A system may also appear accurate on average while failing for a subgroup; unrepresentative training data can disadvantage ethnic minorities or people with rare conditions. Calibration matters too: a score interpreted as a 20 percent risk should correspond to that frequency in the relevant population. Hospitals need local validation, monitoring after deployment, and a plan for responding when practice or data changes.

Accountability is another contested issue, and responsibility for ordinary clinical errors is not always as simple as the contrast with AI suggests. When a system contributes to a diagnostic mistake, responsibility may be distributed among the developer, data provider, hospital, procurement team, and clinician. Patients need a route to explanation, review, and redress. Regulators can assess a product for a specified intended use, but authorisation does not guarantee safe performance forever. Software updates, new populations, and changing workflows create a need for continuing surveillance and documented human oversight.

There is also debate about whether AI can ever replicate the relational aspects of medicine. The therapeutic relationship between doctor and patient — built on empathy, trust, and communication — is widely regarded as clinically important in its own right, not merely as a vehicle for information exchange. Many clinicians and patients are concerned that an over-reliance on AI could erode this relationship, reducing medicine to a technical exercise.

Clinical usefulness cannot be inferred from accuracy alone. A model may identify a pattern yet fail to improve outcomes if it alerts too often, arrives after a decision, or gives staff no practical next step. Prospective trials can measure effects on missed diagnoses, treatment time, workload, and patient harm, while qualitative research can reveal whether people understand or trust the tool. Comparison with the existing care pathway matters because a small statistical gain may not justify new costs or risks. Deployment also requires training, secure data handling, accessible explanations, and the ability to override or stop the system. These conditions make medical AI a combined technical and organisational intervention rather than a piece of software operating independently.

Despite these concerns, clinical adoption is expanding. The US Food and Drug Administration maintains a public list containing hundreds of AI-enabled medical devices, most in radiology, while explaining that inclusion follows its own criteria and available information. Counting authorisations says little by itself about clinical benefit. WHO guidance calls for autonomy, safety, transparency, accountability, inclusiveness, equity, responsiveness, and sustainability throughout design and use. The challenge for policymakers, clinicians, patients, regulators, and technologists is to define intended use, measure real outcomes, monitor failures, and preserve the therapeutic relationship. Governance is part of the clinical intervention rather than paperwork added after deployment.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r3-summary',
          part: 7,
          qRange: [27, 33],
          groupLabel: 'Complete the summary.\nChoose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `Medical AI systems use {{27}} learning, trained on large datasets, to perform tasks such as analysing medical {{28}}.

These systems can detect conditions like {{29}} and pneumonia with high accuracy.

A key limitation is the {{30}} problem, where a model trained at one hospital performs poorly at another.

If AI systems are trained on unrepresentative data, they may be less accurate for some ethnic {{31}} or rare cases.

When AI contributes to a medical error, {{32}} for the mistake is unclear and spread across multiple parties.

Many believe that AI could damage the {{33}} relationship between doctor and patient.`,
          blanks: [
            { num: 27, answers: ['deep'], maxWords: 1 },
            { num: 28, answers: ['imaging', 'images'], maxWords: 1 },
            { num: 29, answers: ['diabetic retinopathy', 'retinopathy'], maxWords: 2 },
            { num: 30, answers: ['distribution shift'], maxWords: 2 },
            { num: 31, answers: ['minorities'], maxWords: 1 },
            { num: 32, answers: ['responsibility'], maxWords: 1 },
            { num: 33, answers: ['therapeutic'], maxWords: 1 },
          ],
        },
        {
          type: 'mcq',
          id: 'r3q34',
          part: 7,
          text: 'AI systems in medicine can always outperform human specialists.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3q35',
          part: 7,
          text: 'AI could help extend diagnostic expertise to regions where specialist doctors are scarce.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r3q36',
          part: 7,
          text: 'AI systems can reproduce bias contained in data and design choices.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r3q37',
          part: 7,
          text: 'The US Food and Drug Administration has not yet approved any AI-based medical devices.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3q38',
          part: 7,
          text: 'The therapeutic relationship between doctor and patient is considered clinically important.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'matching',
          id: 'r3-match',
          part: 7,
          qRange: [39, 40],
          groupLabel: 'Match each concern about medical AI with the correct group A–D.\nWrite the correct letter, A–D, next to questions 39–40.',
          items: [
            { num: 39, stem: 'They worry that relying on AI may reduce the human element of medicine.', answer: 'B' },
            { num: 40, stem: 'They assess medical products for a specified intended use.', answer: 'C' },
          ],
          endings: [
            { letter: 'A', text: 'software developers' },
            { letter: 'B', text: 'clinicians and patients' },
            { letter: 'C', text: 'regulatory agencies' },
            { letter: 'D', text: 'policymakers' },
          ],
        },
      ],
    },

    // ─── WRITING ─────────────────────────────────────────────────────────────

    {
      part: 8,
      skill: 'writing',
      title: 'Writing — Task 1',
      instructions: 'You should spend about 20 minutes on this task.',
      questions: [
        {
          type: 'write',
          id: 'w1',
          part: 8,
          taskNumber: 1,
          stimulusLabel: 'The graph below shows the consumption of three kinds of spreads between 1981 and 2007.',
          stimulus: '',
          imageUrl: '/ielts/images/writing-set3-task1-spreads.jpg',
          imageAlt: 'Line graph: consumption of margarine, low fat & reduced spreads, and butter in grams 1981–2007',
          text: 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.',
          minWords: 150,
        },
      ],
    },

    {
      part: 9,
      skill: 'writing',
      title: 'Writing — Task 2',
      instructions: 'You should spend about 40 minutes on this task.',
      questions: [
        {
          type: 'write',
          id: 'w2',
          part: 9,
          taskNumber: 2,
          stimulus: 'Many people believe that international tourism causes more problems than benefits. To what extent do you agree or disagree?',
          text: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.',
          minWords: 250,
        },
      ],
    },

    // ─── SPEAKING ────────────────────────────────────────────────────────────

    {
      part: 10,
      skill: 'speaking',
      title: 'Speaking',
      instructions: 'The Speaking test consists of three parts. Prepare and respond to each prompt as clearly as possible.',
      questions: [
        {
          type: 'speak',
          id: 'sp1',
          part: 10,
          partNumber: 1,
          text: 'Part 1 — Personal questions (4–5 minutes). Answer the following questions about yourself.',
          followUp: [
            'Do you enjoy reading? What types of books do you prefer?',
            'How do you usually get to work or school?',
            'Do you prefer living in a city or in the countryside? Why?',
            'How important is sport in your life?',
            'What did you enjoy doing as a child?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn (3–4 minutes). Read the cue card and prepare for 1 minute, then speak for 1–2 minutes.',
          cueCard: `Describe an important journey you have made.

You should say:
  - where you went and why
  - how you travelled
  - what happened during the journey

and explain why the journey was important to you.`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Two-way discussion (4–5 minutes). Discuss the following questions.',
          followUp: [
            'How has transport changed in your country over the past 20 years?',
            'What are the advantages and disadvantages of international travel?',
            'Do you think people travel too much today? Why?',
            'How might future technologies change the way people travel?',
            'Is it important for young people to travel abroad? Why / why not?',
          ],
        },
      ],
    },

  ],
};

export default mock;
