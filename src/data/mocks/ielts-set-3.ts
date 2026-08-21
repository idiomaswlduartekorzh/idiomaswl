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

ASSISTANT: What type of membership are you interested in? We offer standard, which gives you up to eight books for three weeks, or premium, which gives you twelve books and access to our digital archive.

MEMBER: I think standard is fine for now.

ASSISTANT: Great. There's a one-off registration fee of two pounds.

MEMBER: That's fine. Can I also reserve books online?

ASSISTANT: Yes, with standard membership you can reserve up to three books at a time through our website.

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
          headers: ['Membership type', 'Books allowed', 'Extra benefit'],
          rows: [
            ['Standard', '8 books / 3 weeks', { num: 8, answers: ['online', 'website'], maxWords: 1 }],
            ['Premium', { num: 9, answers: ['12', 'twelve'], maxWords: 1 }, { num: 10, answers: ['archive', 'digital'], maxWords: 1 }],
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
          text: 'Which TWO items can now be placed in the dry recycling bin from next month?',
          options: [
            { letter: 'A', text: 'glass bottles' },
            { letter: 'B', text: 'food waste' },
            { letter: 'C', text: 'plastic film' },
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

LEE: I found it really interesting. I hadn't realised how many different forms urban farming can take — rooftop gardens, vertical farms, community allotments.

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
            { num: 28, answers: ['allotments', 'gardens'], maxWords: 1 },
            { num: 29, answers: ['Land', 'land'], maxWords: 1 },
            { num: 30, answers: ['expertise', 'knowledge', 'skills'], maxWords: 1 },
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

Independently, and around the same time, hieroglyphics emerged in ancient Egypt. Like early cuneiform, Egyptian hieroglyphics began as a pictographic system but also developed symbols representing sounds, making it a mixed system. Hieroglyphics were used not only for administration but also for religious texts, royal inscriptions, and later, literary works.

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
            { num: 34, answers: ['administrative', 'administration'], maxWords: 1 },
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
      passage: `The Silk Road was not a single road but a vast network of overland and maritime trade routes that connected China with Central Asia, the Middle East, and eventually Europe and Africa. At its height — roughly from the second century BCE to the fifteenth century CE — it facilitated one of the most remarkable cultural and commercial exchanges in human history. Yet despite its name, silk was only one of many commodities that travelled along these routes.

The term 'Silk Road' was coined in 1877 by the German geographer Ferdinand von Richthofen, who used it to describe the trade routes along which Chinese silk was exported westward. In reality, the routes carried an extraordinary diversity of goods: spices, porcelain, glass, cotton textiles, precious metals and gems, paper, and gunpowder all moved along the network, together with slaves and exotic animals.

China was the dominant exporter for much of the Silk Road's history. The country held a monopoly on silk production for centuries, jealously guarding the secret of sericulture — the cultivation of silkworms and the processing of their cocoons. Legend holds that the secret was smuggled out of China in the sixth century CE by monks who concealed silkworm eggs in hollow walking staves, finally ending the Chinese monopoly.

Caravans were the primary means of overland transport. These were typically organised by merchants who hired guides, guards, and camel drivers. The Bactrian camel, native to Central Asia, was particularly prized for its ability to withstand extreme temperatures and carry heavy loads. Oasis towns along the routes — such as Samarkand, Dunhuang, and Kashgar — served as vital stopping points where merchants could rest, resupply, and trade.

The Silk Road was not only a conduit for goods but also for ideas, religions, technologies, and diseases. Buddhism spread from India to China, Korea, and Japan along the Silk Road. Islam reached Central Asia and later Southeast Asia through the same network. The Black Death, which devastated Europe in the fourteenth century, is believed to have travelled westward from Central Asia along trade routes.

The decline of the Silk Road began in the fifteenth century, partly due to the collapse of the Mongol Empire — which had previously provided relative peace and security across Central Asia — and partly because European seafarers, beginning with the Portuguese, began developing maritime routes to Asia around the southern tip of Africa. These sea routes were faster, cheaper, and could carry far larger volumes of goods.

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
            { num: 2, answers: ['spices', 'porcelain', 'glass'], maxWords: 1 },
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
      passage: `Plastic pollution has become one of the most pressing environmental issues of the twenty-first century. Nowhere is its impact more visible — or more damaging — than in the world's oceans. It is estimated that eight million metric tons of plastic enter the ocean every year, adding to an existing stock of between 150 and 200 million tons. This plastic kills marine wildlife, contaminates seafood, and degrades sensitive ecosystems, with consequences that scientists are only beginning to fully understand.

Plastic reaches the ocean through a variety of pathways. The majority comes from land, carried to sea by rivers and wind. In countries where waste management infrastructure is poor, plastic waste may be openly dumped near rivers or coastlines. Once in the ocean, plastic can drift thousands of kilometres from its source before washing up on remote beaches or accumulating in large rotating ocean currents known as gyres. The North Pacific Garbage Patch — a vast area of the Pacific Ocean with high concentrations of floating plastic — has become the most well-known example of this phenomenon.

Unlike organic waste, plastic does not biodegrade. Instead, it undergoes photodegradation: ultraviolet radiation from sunlight breaks it down into ever-smaller pieces. Fragments smaller than five millimetres are known as microplastics. These tiny particles have been found in the deepest ocean trenches, in Arctic ice, in rainwater, and in the bodies of animals across the food chain — including humans. Research suggests that microplastics can impair reproduction in fish, disrupt hormone function, and carry toxic chemicals into living tissue.

Marine wildlife is harmed in multiple ways. Sea turtles, whales, and seabirds regularly ingest plastic, mistaking it for prey. Dolphins, seals, and sea turtles become entangled in plastic fishing gear and packaging, leading to injury and drowning. Coral reefs are also affected: plastic debris increases the risk of disease and can physically smother reef structures.

Addressing ocean plastic pollution requires action at multiple levels. At the source, reducing plastic production and improving waste management in coastal nations is critical. Extended producer responsibility schemes — which make manufacturers financially responsible for the end-of-life of their products — have shown promise in some countries. At the consumer level, campaigns to reduce single-use plastics have led to measurable reductions in certain types of plastic waste.

Cleaning up plastic that is already in the ocean is far more difficult. Several organisations have deployed collection systems in ocean gyres, with mixed success. Critics note that cleanup operations may damage plankton and other marine life, and that the volumes of plastic involved make a comprehensive cleanup practically impossible. Prevention, most experts agree, is by far the more cost-effective strategy.`,
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
          answer: 0,
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
          answer: 0,
        },
        {
          type: 'formgroup',
          id: 'r2-notes',
          part: 6,
          qRange: [19, 23],
          groupLabel: 'Complete the notes below.\nChoose ONE WORD ONLY from the passage for each answer.',
          title: 'Ocean Plastic — Key Facts',
          template: `• Approximately {{19}} million metric tons of plastic enter the ocean each year.
• Plastic accumulates in large ocean {{20}} called gyres.
• Plastic is broken down by ultraviolet light through {{21}}.
• Fragments smaller than 5mm are called {{22}}.
• Microplastics can disrupt {{23}} function in living organisms.`,
          blanks: [
            { num: 19, answers: ['eight', '8'], maxWords: 1 },
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
      passage: `Artificial intelligence is transforming medicine at a pace that would have seemed extraordinary even a decade ago. From diagnosing cancers to predicting patient deterioration in intensive care, AI systems are demonstrating capabilities that match or, in some cases, exceed those of trained clinicians. Yet the integration of AI into healthcare raises complex questions about safety, accountability, and the human dimension of medicine that are far from resolved.

At the heart of current medical AI are machine learning systems, particularly those using deep learning — a technique that involves training artificial neural networks on vast datasets. In medical imaging, this has proved especially powerful. Deep learning models trained on millions of labelled X-rays, CT scans, and skin images can identify abnormalities with a sensitivity and specificity comparable to that of specialist doctors. Studies have shown that AI systems can detect diabetic retinopathy, certain cancers, and signs of pneumonia from images with high accuracy.

The potential benefits are substantial. In regions with shortages of specialist physicians, AI could extend access to diagnostic expertise. In high-income countries, it could reduce the burden on overstretched health services. AI systems do not tire, are not subject to the cognitive biases that affect human judgement, and can process vastly more data than a human clinician can review.

Nevertheless, significant challenges remain. Medical AI systems can fail in unexpected ways. A model trained on images from one hospital may perform poorly when applied to images from another, due to differences in equipment, patient demographics, or imaging protocols. This is known as the distribution shift problem. AI systems may also perform well on average while performing poorly for particular subgroups — if training data is not representative, the model may be less accurate for patients from ethnic minorities or with rare conditions.

Accountability is another contested issue. When a physician makes an error, the lines of responsibility are clear. When an AI system contributes to a diagnostic mistake, the responsibility may be distributed among the software developer, the hospital that deployed the system, and the clinician who acted on its recommendation. Regulatory frameworks around the world are still grappling with how to address this.

There is also debate about whether AI can ever replicate the relational aspects of medicine. The therapeutic relationship between doctor and patient — built on empathy, trust, and communication — is widely regarded as clinically important in its own right, not merely as a vehicle for information exchange. Many clinicians and patients are concerned that an over-reliance on AI could erode this relationship, reducing medicine to a technical exercise.

Despite these concerns, the clinical adoption of AI is accelerating. Regulatory agencies such as the US Food and Drug Administration have approved hundreds of AI-based medical devices. Large technology companies and healthcare organisations are investing heavily in the field. The challenge for policymakers, clinicians, and technologists is to harness AI's capabilities while establishing the governance frameworks needed to ensure that it is used safely, equitably, and in a way that preserves what is most valuable in human medicine.`,
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
            { num: 30, answers: ['distribution shift', 'shift'], maxWords: 2 },
            { num: 31, answers: ['minorities'], maxWords: 1 },
            { num: 32, answers: ['responsibility', 'accountability'], maxWords: 1 },
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
          text: 'AI systems are free from the cognitive biases that affect human doctors.',
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
            { num: 40, stem: 'They are working to establish governance frameworks for safe AI use.', answer: 'D' },
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
