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

MEMBER: Hi. I moved to Oxford last week and I’d like to join the library.

ASSISTANT: Of course. I’ll complete the application with you. What’s your full name?

MEMBER: Sophie Marsh.

ASSISTANT: And your date of birth?

MEMBER: The 14th of March 1998.

ASSISTANT: Thank you. What is your current address?

MEMBER: Flat 7, number 33 Berkley Street. Berkley is B-E-R-K-L-E-Y. The postcode is OX1 4PL.

ASSISTANT: Fine. Do you want to give a mobile number?

MEMBER: I haven’t changed my mobile contract yet, so use my home phone: 01865 552 784.

ASSISTANT: And an email address?

MEMBER: It’s sophie.marsh@greenmail.co.uk. There’s a dot between my first name and surname.

ASSISTANT: Now, we offer standard and premium membership. Standard is free after registration and suits most people.

MEMBER: What can I borrow with that?

ASSISTANT: Up to eight books for three weeks. DVDs count separately, and reference books stay in the building.

MEMBER: Eight is plenty. I’m studying part-time, so I won’t carry more than that home.

ASSISTANT: Standard members can also reserve up to three books at once. A reservation stays on the collection shelf for four days.

MEMBER: Good. Is there any charge to join?

ASSISTANT: A one-off registration fee of £2. Replacing a lost card costs five pounds, but the first card is included.

MEMBER: That’s reasonable. Can I manage the account from home?

ASSISTANT: Yes. Standard membership includes online renewal and reservation through the website. You can renew an item twice unless another reader is waiting.

MEMBER: What does premium add?

ASSISTANT: It raises the borrowing limit to twelve books and gives remote access to the digital archive. That contains local newspapers, historical maps and several family-history databases. Premium costs twenty-four pounds a year.

MEMBER: The archive sounds useful because I’m researching my neighbourhood, but I’ll begin with standard and see how much I use the library.

ASSISTANT: You can upgrade later without completing another form. Are you interested in any subject newsletters?

MEMBER: History and science, please. I don’t need the general events email because my neighbour forwards that.

ASSISTANT: I’ll select those two. Your permanent card normally arrives by post within five working days. For today, this temporary pass lets you borrow two items, use a computer for an hour and enter the study area.

MEMBER: Can I print documents there?

ASSISTANT: Yes, after adding credit to the pass. Black-and-white pages cost ten pence; colour is more expensive. Staff beside the computers can help you log in.

MEMBER: And where do I collect reserved books?

ASSISTANT: From the shelves opposite the main desk. They’re arranged by the first three letters of your surname, so yours will be under M-A-R. Scan the item before leaving; taking it from the shelf does not issue it automatically.

MEMBER: I’m glad you mentioned that.

ASSISTANT: Before you go, let me confirm the membership comparison: standard includes the online service, while premium allows twelve books and access to the archive.

MEMBER: Yes, standard for now. Thank you.`,
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
            { num: 1, answers: ['14th'], maxWords: 1 },
            { num: 2, answers: ['Berkley'], maxWords: 1 },
            { num: 3, answers: ['sophie.marsh@greenmail.co.uk'], maxWords: 1 },
            { num: 4, answers: ['standard'], maxWords: 1 },
            { num: 5, answers: ['eight'], maxWords: 1 },
            { num: 6, answers: ['three'], maxWords: 1 },
            { num: 7, answers: ['2'], maxWords: 1 },
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
            ['Standard', '8 books / 3 weeks', { num: 8, answers: ['online'], maxWords: 1 }],
            ['Premium', { num: 9, answers: ['twelve'], maxWords: 1 }, { num: 10, answers: ['archive'], maxWords: 1 }],
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
      transcript: `Good evening. I’m Rachel Davis from the council’s environmental services team. Our residential recycling programme changes next month, and tonight I’ll explain what belongs in each container and why the collections are changing.

I’ll start with the dry recycling bin because two materials are being added. Clean plastic film, including the soft wrapping around ready meals, can go in from the first Monday of next month. Carrier bags are accepted too. Until now both had to be taken to supermarket collection points. Please do not confuse flexible film with rigid toys or garden hose; those objects use different plastics and still belong at the recycling centre.

Why expand the service? The borough currently recycles 32 percent of household waste, compared with a national figure of about forty-five percent. Our target is at least 55 percent by the end of the year. That is ambitious, but analysis of rubbish bags shows that food and flexible plastic make up a large share of material we could recover.

Every household will receive a small kitchen caddy for peelings, tea bags and plate scrapings. Line it with newspaper or a certified compostable liner—ordinary plastic bags are not suitable. When the caddy is full, empty it into the larger outdoor food bin. Flats with shared waste areas will receive communal containers instead.

Food waste will be collected weekly, even in streets where general waste is collected every two weeks. The vehicle takes it to an anaerobic-digestion plant. Microorganisms break down the material without oxygen, producing gas used for energy and a nutrient-rich residue used as compost. Home composting remains worthwhile for people with gardens, so you do not have to surrender a compost bin you already use.

Glass is the one material leaving the doorstep mixed recycling bin. From next month, bottles and jars must go to bottle banks. We are adding six new sites across the borough, including one at each large supermarket and two near apartment districts. Separating glass reduces breakage in the sorting plant and keeps fragments out of paper. Remove metal lids, but labels can stay. Drinking glasses and oven dishes have different melting properties and must not be placed in a bottle bank.

Paper and card remain in the blue bin. Flatten boxes so the lid closes, and keep paper dry. Rinsed food cans and tins stay in the green bin. They need not be spotless; a quick rinse prevents smells. Aerosol cans are accepted only when completely empty. Batteries never go in either household bin because damaged cells can cause fires in collection vehicles.

Each household will receive a printed guide by post. It uses photographs as well as text and includes the revised collection calendar. If the guide has not arrived by the twentieth, order another rather than copying a neighbour’s calendar, since collection days vary by street. The same information is at recycleright.gov.uk, where a postcode checker locates your nearest bottle bank.

For the first four weeks, crews will attach a yellow tag to bins containing the wrong material and leave them unemptied. The tag identifies the problem. This is intended as guidance, not a fine. Repeated contamination will trigger a visit from an adviser before any enforcement action is considered.

Households that cannot move a container because of age or disability can request an assisted collection. The crew will collect it from an agreed point and return it after emptying. Landlords of blocks should contact us if there is not enough space for the new shared food bin.

Our helpline operates Monday to Friday from eight until six on 0800 445 6712. Staff can arrange replacement containers and assisted collections, but they cannot tell you whether commercial waste from a business is covered; that uses a separate service. We’ll take questions after the demonstration beside the sample bins.`,
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
            { num: 19, answers: ['six'], maxWords: 1 },
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

TUTOR: Very thoughtful. Before we finish, let’s organise the examples for next week’s presentation. Begin with the physical forms: rooftop gardens on building tops, vertical farms with stacked layers, and community allotments managed by residents. Then separate the constraints from the benefits. Land is the expensive and scarce resource in dense districts, while many new growers lack the expertise to manage soil, pests and harvesting. That structure will stop the presentation becoming a list of unrelated claims.

ANNA: We can also distinguish evidence from assumptions. A garden may create opportunities for neighbours to meet, but that does not prove that every project improves social cohesion.

LEE: And we should compare energy per kilogram of crop, not just the area occupied by a vertical farm.

TUTOR: Exactly. Define the outcome, state the boundary and avoid presenting one model as a solution for every city.`,
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

Independently, and around the same time, hieroglyphics emerged in ancient Egypt. Like early cuneiform, Egyptian hieroglyphics began as a pictographic system but also developed symbols representing sounds, making it a mixed system. Hieroglyphics were used not only for administration but also for religious texts, royal inscriptions, and later, literary works.

Both systems were highly complex and required years of specialist training to master. Literacy was therefore restricted to a small professional class of scribes, who held considerable social power.

A fundamental change came with alphabetic writing. An influential consonantal alphabet is generally attributed to the Phoenicians, around 1050 BCE. This system spread to the Greeks, who made the crucial innovation of adding vowels, producing an alphabet that represented both major classes of speech sound. The Roman alphabet, derived through Greek and Etruscan forms, became the basis for many European writing systems in use today.

Because alphabets have far fewer basic symbols than many logographic systems—typically between twenty and thirty—the initial inventory can be easier to learn. This made broader literacy more practical, though it did not produce it automatically. Readers still had to master spelling, vocabulary and the language represented. Schooling, cost and political access mattered as much as the number of signs. Alphabetic writing did not simply replace every alternative: Chinese characters, Japanese combinations of characters and syllabic signs, and numerous other systems continued to serve large literate communities.

The surface used for writing also changed how texts moved. Clay tablets were durable but heavy. Papyrus and parchment were lighter, while paper could eventually be produced at greater scale. The codex, with pages bound along one edge, made it easier to find a passage than in a long scroll. These material changes affected storage, copying and reading habits even when the underlying script stayed similar.

The printing press developed by Johannes Gutenberg around 1440 CE was another watershed in Europe. Printing with movable type had existed earlier in East Asia, so Gutenberg was not the first person to arrange reusable characters. His combination of metal type, ink, press and European commercial conditions enabled repeated production on a new scale. Books became cheaper over time, accelerating the circulation of ideas, but literacy still expanded unevenly and depended on schools, language and censorship.

Today, digital technology has again changed writing and reading. A message can combine alphabetic text, image, audio and searchable links, then be copied almost instantly. This creates new genres and new challenges: handwriting may be used less often, informal writing crosses former boundaries, and readers must judge sources as well as decode words. Digital literacy extends earlier skills; it does not show that writing has reached a final form.`,
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

• Influential consonantal alphabet attributed to the {{38}}, c. 1050 BCE.
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
      passage: `No merchant in antiquity set out along a route marked “Silk Road”. The label describes a shifting network of overland and maritime trade routes that connected China with Central Asia, the Middle East, and eventually Europe and Africa. At its height — roughly from the second century BCE to the fifteenth century CE — the network facilitated one of the most remarkable cultural and commercial exchanges in human history. Yet despite its modern name, silk was only one of many commodities that travelled along these routes.

The term 'Silk Road' was coined in 1877 by the German geographer Ferdinand von Richthofen, who used it to describe the trade routes along which Chinese silk was exported westward. In reality, the routes carried an extraordinary diversity of goods: spices, porcelain, glass, cotton textiles, precious metals and gems, paper, and gunpowder all moved along the network, together with slaves and exotic animals.

China was the dominant exporter for much of the Silk Road's history. The country held a monopoly on silk production for centuries, jealously guarding the secret of sericulture — the cultivation of silkworms and the processing of their cocoons. Legend holds that the secret was smuggled out of China in the sixth century CE by monks who concealed silkworm eggs in hollow walking staves, finally ending the Chinese monopoly.

Caravans were the primary means of overland transport. These were typically organised by merchants who hired guides, guards, and camel drivers. The Bactrian camel, native to Central Asia, was particularly prized for its ability to withstand extreme temperatures and carry heavy loads. Oasis towns along the routes — such as Samarkand, Dunhuang, and Kashgar — served as vital stopping points where merchants could rest, resupply, and trade.

The Silk Road was not only a conduit for goods but also for ideas, religions, technologies, and diseases. Buddhism spread from India to China, Korea, and Japan along the Silk Road. Islam reached Central Asia and later Southeast Asia through the same network. The Black Death, which devastated Europe in the fourteenth century, is believed to have travelled westward from Central Asia along trade routes.

The decline of the Silk Road began in the fifteenth century, partly due to the collapse of the Mongol Empire — which had previously provided relative peace and security across Central Asia — and partly because European seafarers, beginning with the Portuguese, began developing maritime routes to Asia around the southern tip of Africa. These sea routes were faster, cheaper, and could carry far larger volumes of goods.

Today, interest in the Silk Road has been revived by China's Belt and Road Initiative, launched in 2013, which seeks to build new infrastructure — roads, railways, ports, and pipelines — connecting China with Europe, Africa, and South Asia. Supporters see it as a new era of connectivity; critics raise concerns about debt and geopolitical influence.

The modern name can nevertheless create a misleading picture of ancient trade. Few merchants travelled from one end of Eurasia to the other. Goods often passed through a chain of intermediaries, gaining value and new meanings at each market. Political control also shifted repeatedly, so the safest branch in one decade might be avoided in the next. Maritime routes were not a late replacement added only by Europeans; shipping across the Indian Ocean had long formed part of interregional exchange.

Evidence for the network is equally diverse. Written accounts tend to describe courts, diplomats and exceptional journeys. Archaeologists instead analyse coins, textiles, shipwrecks, plant remains and the chemical origin of glass or metal. An object found far from its source proves movement, but not necessarily the identity of every carrier or a continuous journey along a named road. Legends such as monks hiding silkworm eggs in hollow staves are cultural stories, not the same kind of evidence as a dated document or excavated workshop.

Exchange brought unequal consequences. Oasis cities could earn taxes and support translators, artisans and lodging, while conflict or a change of route could remove that income quickly. Religions and artistic techniques travelled through voluntary contact, but enslaved people and epidemic disease moved too. Even the prominence of silk varied by region and period; no single commodity, empire or community controlled the whole network. The Silk Road is therefore best understood not as frictionless early globalisation, but as changing connections whose benefits, risks and participants varied across time and place.`,
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
      passage: `Ocean Plastic Pollution

Plastic leakage is not measured by one permanent number. A recent United Nations estimate is that about 11 million metric tons enter aquatic ecosystems each year; models differ because informal dumping, river transport and tiny particles are difficult to observe. Some material remains in lakes or river sediment, while some reaches coasts and the open ocean. The consequences for ecosystems and human health are still being investigated, so detection of a particle does not by itself establish the size of a biological effect.

Plastic reaches the ocean through a variety of pathways. The majority comes from land, carried to sea by rivers and wind. In countries where waste management infrastructure is poor, plastic waste may be openly dumped near rivers or coastlines. Once in the ocean, plastic can drift thousands of kilometres from its source before washing up on remote beaches or accumulating in large rotating ocean currents known as gyres. The North Pacific Garbage Patch — a vast area of the Pacific Ocean with high concentrations of floating plastic — has become the most well-known example of this phenomenon.

Unlike organic waste, plastic does not biodegrade. Instead, it undergoes photodegradation: ultraviolet radiation from sunlight breaks it down into ever-smaller pieces. Fragments smaller than five millimetres are known as microplastics. These tiny particles have been found in the deepest ocean trenches, in Arctic ice, in rainwater, and in the bodies of animals across the food chain — including humans. Research suggests that microplastics can impair reproduction in fish, disrupt hormone function, and carry toxic chemicals into living tissue.

Marine wildlife is harmed in multiple ways. Sea turtles, whales, and seabirds regularly ingest plastic, mistaking it for prey. Dolphins, seals, and sea turtles become entangled in plastic fishing gear and packaging, leading to injury and drowning. Coral reefs are also affected: plastic debris increases the risk of disease and can physically smother reef structures.

Addressing ocean plastic pollution requires action at multiple levels. At the source, reducing plastic production and improving waste management in coastal nations is critical. Extended producer responsibility schemes — which make manufacturers financially responsible for the end-of-life of their products — have shown promise in some countries. At the consumer level, campaigns to reduce single-use plastics have led to measurable reductions in certain types of plastic waste.

Cleaning up plastic that is already in the ocean is far more difficult. Several organisations have deployed collection systems in ocean gyres, with mixed success. Critics note that cleanup operations may damage plankton and other marine life, and that the volumes of plastic involved make a comprehensive cleanup practically impossible. Prevention, most experts agree, is by far the more cost-effective strategy.

The term “garbage patch” can suggest a solid island, but gyres contain dispersed fragments across a large depth and area. Concentration changes with wind and current, and much debris eventually sinks or strands on shore. A surface boom can intercept some floating objects but cannot recover particles throughout the water column. It may also miss fibres shed by textiles and fragments released through tyre wear.

Fishing gear deserves separate attention. Nets and lines are designed to remain strong in water, so lost equipment can continue trapping animals—a process called ghost fishing. Marking gear, providing reception facilities in ports and rewarding recovery address a different source from household packaging. Policies must therefore match the product and pathway rather than treating every item as identical single-use plastic.

Measurement is part of prevention. A beach count can track visible litter but says little about particles buried in sediment. River sampling changes with rainfall, and laboratories do not always use the same lower size limit. Researchers need compatible definitions before comparing trends. Meanwhile, product redesign, reuse systems and reliable collection can reduce leakage without waiting for a perfect inventory. Cleanup remains valuable at sensitive sites, but stopping a continuous flow upstream is more durable than repeatedly collecting a fraction downstream.

A credible policy should publish a baseline and test whether leakage actually falls. Counting bags distributed or bins installed records activity, not the environmental result. Material-flow studies can connect production, use, collection and loss, revealing whether an apparent improvement in one place merely shifted waste to another. Such monitoring also helps distinguish a short-lived response to a campaign from a lasting change in how products are designed, collected and reused.`,
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
          template: `• Approximately {{19}} million metric tons of plastic enter aquatic ecosystems each year.
• Plastic accumulates in large ocean {{20}} called gyres.
• Plastic is broken down by ultraviolet light through {{21}}.
• Fragments smaller than 5mm are called {{22}}.
• Microplastics can disrupt {{23}} function in living organisms.`,
          blanks: [
            { num: 19, answers: ['11'], maxWords: 1 },
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
      passage: `Artificial Intelligence in Medicine

Artificial intelligence can assist tasks ranging from analysing images to predicting deterioration in a hospital ward. In a narrowly defined study, a system may equal or exceed a group of clinicians on a chosen metric. That does not mean it can replace a specialist across all patients, equipment and clinical decisions. Integration into healthcare raises questions about safety, accountability and the human dimension of medicine that a high test-set score cannot resolve.

At the heart of current medical AI are machine learning systems, particularly those using deep learning — a technique that involves training artificial neural networks on vast datasets. In medical imaging, this has proved especially powerful. Deep learning models trained on millions of labelled X-rays, CT scans, and skin images can identify abnormalities with a sensitivity and specificity comparable to that of specialist doctors. Studies have shown that AI systems can detect diabetic retinopathy, certain cancers, and signs of pneumonia from images with high accuracy.

The potential benefits are substantial. In regions with shortages of specialist physicians, AI could extend access to diagnostic expertise. In high-income countries, it could reduce the burden on overstretched health services. AI systems do not tire and can process more data than a clinician can review, but they are not free from bias. A model can reproduce patterns embedded in its training labels, and a clinician can develop automation bias by accepting an output too readily.

Nevertheless, significant challenges remain. Medical AI systems can fail in unexpected ways. A model trained on images from one hospital may perform poorly when applied to images from another, due to differences in equipment, patient demographics, or imaging protocols. This is known as the distribution shift problem. AI systems may also perform well on average while performing poorly for particular subgroups — if training data is not representative, the model may be less accurate for patients from ethnic minorities or with rare conditions.

Accountability is another contested issue. When a physician makes an error, the lines of responsibility are clear. When an AI system contributes to a diagnostic mistake, the responsibility may be distributed among the software developer, the hospital that deployed the system, and the clinician who acted on its recommendation. Regulatory frameworks around the world are still grappling with how to address this.

There is also debate about whether AI can ever replicate the relational aspects of medicine. The therapeutic relationship between doctor and patient — built on empathy, trust, and communication — is widely regarded as clinically important in its own right, not merely as a vehicle for information exchange. Many clinicians and patients are concerned that an over-reliance on AI could erode this relationship, reducing medicine to a technical exercise.

Despite these concerns, clinical adoption is accelerating. The US Food and Drug Administration maintains a list of AI-enabled devices authorised for marketing, while noting that the list is not comprehensive. Authorisation applies to a stated use; it is not a permanent guarantee that performance will remain unchanged in every hospital.

Evaluation must therefore continue after deployment. Equipment, disease prevalence and clinical practice evolve, producing distribution shift even if the software code stays fixed. Hospitals need a way to monitor errors, report incidents and withdraw a system safely. If a model is updated, staff must know what changed and whether new validation is required. Measuring only accuracy is insufficient: calibration, false alarms, time saved and outcomes for different patient groups may all matter.

Data governance creates another layer of responsibility. Medical records are sensitive, and patients may not expect information collected for treatment to train a commercial model. De-identification reduces risk but cannot answer every question about consent, ownership or access. Documentation should identify intended users, limitations and the populations represented in development data.

The sensible comparison is not “AI or doctor” in isolation. A poorly designed alert can distract a skilled team, while a well-tested tool may help that team prioritise work. Policymakers, clinicians, patients and developers must decide who can override a recommendation and who investigates harm. Prospective trials should test the combined workflow, not only the algorithm retrospectively. Patients also need a clear, intelligible explanation of when an automated tool materially influences their care and how they can question its use. The aim is to use computational capability while preserving professional judgement, equity and the therapeutic relationship.`,
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
          text: 'AI systems are free from bias because they do not experience fatigue.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          answer: 1,
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
          stimulusLabel: 'The line graph below shows the average number of weekday passengers using three forms of public transport in Larton in 2010, 2015, 2020 and 2025.',
          stimulus: '',
          imageUrl: '/assets/ielts/charts/set3-task1.svg',
          imageAlt: 'Line graph comparing average weekday passenger numbers in thousands on the Larton metro, tram and ferry services from 2010 to 2025',
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
          stimulus: 'Public transport in large cities should be free for all passengers and paid for through taxation. To what extent do you agree or disagree?',
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
            'Do you often use public services in your neighbourhood?',
            'Which place in your local area do you visit most often?',
            'Is public transport convenient where you live?',
            'Have local facilities changed since you were a child?',
            'Do you prefer asking staff for help or finding information online?',
            'What makes a public place pleasant to use?',
            'Is there a facility your area needs more of?',
            'Do you think people should volunteer in their local community?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn (3–4 minutes). Read the cue card and prepare for 1 minute, then speak for 1–2 minutes.',
          cueCard: `Describe a public service or facility in your area that has improved.

You should say:
• what the service or facility is
• what it was like before
• what changes were made
• who benefits from the improvement

and explain why the improvement matters to your community.`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Two-way discussion (4–5 minutes). Discuss the following questions.',
          followUp: [
            'Which public services should local governments prioritise?',
            'Why are services often better in some neighbourhoods than in others?',
            'Should users pay directly for public facilities, or should taxes cover them?',
            'How can governments decide whether a service is successful?',
            'What role should private companies play in providing public services?',
            'How might technology change people’s access to local services?',
          ],
        },
      ],
    },

  ],
};

export default mock;
