import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-16',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 16',
  subtitle: 'Renewable Energy · Child Cognitive Development · Globalisation',
  timeMinutes: 164,
  sections: [

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-16.mp3',
      title: 'Listening — Section 1: Registering Children for a Summer Camp',
      instructions: 'You will hear a telephone conversation between a parent and an officer at a summer camp. Listen and answer Questions 1–10.',
      transcript: `OFFICER: Good morning, Sunnyside Summer Camp. How can I help?

PARENT: Hi there. I'd like to register my children for one of your summer camps.

OFFICER: Wonderful. Let me take a few details. Could I have your name?

PARENT: Yes, my first name's Michael.

OFFICER: And your surname?

PARENT: It's Fletcher — shall I spell that? F-L-E-T-C-H-E-R.

OFFICER: Perfect, thank you. And the best number to reach you on?

PARENT: My mobile is 07700 900642.

OFFICER: Let me just repeat that — 07700 900642.

PARENT: That's the one.

OFFICER: Great. And how many children are you registering today?

PARENT: I was going to bring three, but my eldest has other plans now, so just 2.

OFFICER: No problem, 2 children. Now, we run several kinds of camp. Were you interested in the sports camp?

PARENT: I looked at that, but I think they'd both prefer the adventure camp — they love being outdoors.

OFFICER: A popular choice. The camp runs every weekday, starting at 9 am and finishing at 4 pm.

PARENT: That works well for us.

OFFICER: Now, a few things to remember. Children should bring a packed lunch each day, as we don't provide meals. And because they'll be outside a lot, please make sure they've applied sunscreen before they arrive.

PARENT: Understood. And what does it cost?

OFFICER: It depends on their ages. Our Juniors programme is for children aged 6 and over, and that's £90 per week. Juniors also each receive a free cap to wear on trips.

PARENT: And for older children?

OFFICER: That would be our Explorers programme. The minimum age for that is 9, and it's a little more — £120 a week, because it includes more excursions. Explorers are given a free backpack instead of a cap.

PARENT: Right. My two are 8 and 11, so I suppose that's one in each.

OFFICER: Exactly. I'll set that up for you now.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Summer camp registration',
          example: 'First name:  Michael',
          template: `Surname: {{1}}
Contact number: 07700 900642
Number of children: {{2}}
Type of camp: {{3}} camp
Each day finishes at: {{4}} pm
Children must bring a packed {{5}}
Children must apply {{6}} before arriving`,
          blanks: [
            { num: 1, answers: ['Fletcher'], maxWords: 1 },
            { num: 2, answers: ['2', 'two'], maxWords: 1 },
            { num: 3, answers: ['adventure'], maxWords: 1 },
            { num: 4, answers: ['4', '4pm'], maxWords: 1 },
            { num: 5, answers: ['lunch'], maxWords: 1 },
            { num: 6, answers: ['sunscreen'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Programme', 'Minimum age', 'Weekly price', 'Free item'],
          rows: [
            [
              'Juniors',
              '6',
              { num: 7, answers: ['90', '£90'], maxWords: 1 },
              { num: 8, answers: ['cap'], maxWords: 1 },
            ],
            [
              'Explorers',
              { num: 9, answers: ['9'], maxWords: 1 },
              { num: 10, answers: ['120', '£120'], maxWords: 1 },
              'a backpack',
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-16.mp3',
      title: 'Listening — Section 2: Recycling Scheme Launch',
      instructions: 'You will hear a talk launching a new local recycling scheme. Listen and answer Questions 11–20.',
      transcript: `Good evening, everyone, and thank you for coming to the launch of our town's new recycling scheme. I'm Sarah, from the council's environment team, and I'm here to explain how the scheme will work and what it means for you.

Let me start with the most important change. From next month, every household will receive a brand-new recycling bin. To make it easy to identify, these bins are green, quite different from the black bins we use for general rubbish.

Now, what can go in them? You'll be pleased to hear the list is generous. Glass bottles and jars are fine, as are cardboard and newspapers. However, there are two things we cannot accept. Please do not put plastic bags in the recycling bin — they jam our sorting machines. And, secondly, any container that is still covered in food cannot be recycled either; food-contaminated packaging has to go in the general waste.

As for collections: your green bin will be emptied on a Wednesday. Note that this won't be every week — collections are fortnightly, so once every two weeks. We'll post a calendar through your door showing the exact dates.

The new bins will be delivered to all homes by 30 June, so please look out for yours. If your household is large and you feel you need a bigger bin, you can request one by calling our recycling helpline; the number is on our leaflet.

To encourage everyone to take part, we're running a little competition. Each month, one household that recycles particularly well will win a shopping voucher worth fifty pounds.

Why are we doing all this? Our goal is ambitious but achievable: we aim to reduce the amount of waste sent to landfill by 40 percent within two years.

Finally, for those of you who'd like to recycle food scraps as well, a free kitchen caddy is available from the town hall — just ask at the front desk.

Thank you, and let's make this a success.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO items are NOT allowed in the new recycling bins?',
          options: [
            { letter: 'A', text: 'glass bottles' },
            { letter: 'B', text: 'plastic bags' },
            { letter: 'C', text: 'cardboard' },
            { letter: 'D', text: 'containers covered in food' },
            { letter: 'E', text: 'newspapers' },
          ],
          selectCount: 2,
          answers: ['B', 'D'],
        },
        {
          type: 'formgroup',
          id: 'l2-form',
          part: 2,
          qRange: [13, 20],
          groupLabel: 'Complete the notes below.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          title: 'New recycling scheme',
          template: `The new bins
• Each household receives a new recycling bin, coloured {{13}}.

Collections
• Bins are emptied on a {{14}}.
• Collections are {{15}}, not weekly.
• Bins will be delivered to all homes by {{16}}.

Extra services
• To request a larger bin, call the recycling {{17}}.
• Each month a household that recycles well can win a shopping {{18}}.

Goals
• The scheme aims to cut waste sent to landfill by {{19}} percent.
• A free kitchen {{20}} is available from the town hall.`,
          blanks: [
            { num: 13, answers: ['green'], maxWords: 2 },
            { num: 14, answers: ['Wednesday'], maxWords: 2 },
            { num: 15, answers: ['fortnightly', 'every two weeks', 'two weeks'], maxWords: 2 },
            { num: 16, answers: ['30 June', 'June'], maxWords: 2 },
            { num: 17, answers: ['helpline', 'recycling helpline'], maxWords: 2 },
            { num: 18, answers: ['voucher', 'shopping voucher'], maxWords: 2 },
            { num: 19, answers: ['40', '40%'], maxWords: 2 },
            { num: 20, answers: ['caddy', 'kitchen caddy'], maxWords: 2 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-16.mp3',
      title: 'Listening — Section 3: Engineering Prototype Review',
      instructions: 'You will hear a tutor and two engineering students reviewing a prototype. Listen and answer Questions 21–30.',
      transcript: `TUTOR: Right, Liam, Sophie — let's review your prototype. Talk me through it.

SOPHIE: Of course. Our brief was to design a low-cost water filter for use in rural areas without mains electricity. The main aim was to make it as affordable as possible, so anyone could build one.

TUTOR: That's a genuinely worthwhile goal — millions of people still lack access to clean drinking water, so a cheap, simple solution really does matter.

TUTOR: And what have you built it from?

LIAM: The outer casing is a simple plastic bottle. We did consider using metal, which is more durable, but plastic is far cheaper and lighter, and that fitted our budget better.

TUTOR: Sensible. And the filtering material itself?

SOPHIE: We used layers of sand and charcoal. The charcoal is the key part — it removes impurities and improves the taste of the water.

TUTOR: Good. Now, how did testing go?

LIAM: Mostly well, but we did hit one problem. When we ran dirty water through it quickly, the filter clogged up, and the flow almost stopped. We had to pour the water in much more slowly.

TUTOR: That's useful to know. My main concern, though, isn't the flow rate — it's safety. Your filter removes dirt and improves taste, but it won't kill bacteria. For drinking water, that's a serious gap.

SOPHIE: You're right. We hadn't fully addressed the bacteria issue.

TUTOR: So here's what I'd suggest for the next version. First, reduce the weight further so it's easier to carry. Second, bring the cost down even more if you can. Third, add a stage that disinfects the water — perhaps a UV step. Fourth, do much more testing with different water samples. And finally, prepare a clear diagram for your report so the design is easy to follow.

LIAM: That all makes sense. The disinfection stage is the priority, clearly.

TUTOR: Absolutely. Get that right and it's a strong project.

SOPHIE: Thanks. We'll start work on the next version straight away.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'The main aim of the students\' water filter was to make it',
          options: [
            'as affordable as possible',
            'as durable as possible',
            'as fast as possible',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'They chose plastic rather than metal for the casing mainly because it is',
          options: [
            'more durable',
            'cheaper and lighter',
            'easier to find',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'During testing, the main problem was that the filter',
          options: [
            'leaked at the joints',
            'clogged when water was poured quickly',
            'broke under pressure',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: "The tutor's main concern about the prototype is that it",
          options: [
            'does not kill bacteria',
            'is too expensive',
            'is too heavy',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'The tutor says the top priority for the next version is to',
          options: [
            'reduce the weight',
            'lower the cost',
            'add a disinfection stage',
          ],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `Suggested improvements for the next version
• Reduce the {{26}} to make it easier to carry.
• Lower the {{27}} even further.
• Add a stage that {{28}} the water.
• Carry out more {{29}} with different water samples.
• Include a clear {{30}} in the report.`,
          blanks: [
            { num: 26, answers: ['weight'], maxWords: 1 },
            { num: 27, answers: ['cost'], maxWords: 1 },
            { num: 28, answers: ['disinfects', 'disinfect'], maxWords: 1 },
            { num: 29, answers: ['testing', 'tests'], maxWords: 1 },
            { num: 30, answers: ['diagram'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-16.mp3',
      title: 'Listening — Section 4: Bird Navigation',
      instructions: 'You will hear a lecture about how migrating birds navigate. Listen and answer Questions 31–40.',
      transcript: `Good afternoon. Today we're going to explore one of the great mysteries of the natural world: how migrating birds find their way. Every year, billions of birds travel enormous distances between their breeding and wintering grounds — some species cover more than ten thousand kilometres in a single journey — and yet they arrive with astonishing accuracy. How do they do it?

The answer is that birds rely not on one method but on several, combining them like tools in a navigator's kit.

The first tool is the sky. During the day, many birds orient themselves using the position of the sun, adjusting for the fact that it moves across the sky as the hours pass. At night, other species switch to the stars, using the fixed point around which the night sky appears to rotate to work out which way is north.

Perhaps the most remarkable tool is a kind of internal compass. Birds can sense the Earth's magnetic field, and use it to determine direction even when the sky is hidden by cloud. Exactly how they detect it is still debated, but many researchers now believe the sense is linked to special molecules in the birds' eyes, which may allow them, in effect, to "see" magnetic lines.

Some species add yet another sense to the mix. Seabirds in particular appear to use their sense of smell, building up a kind of odour map of the ocean that helps them relocate distant islands.

Navigation is also partly inherited. Young birds making their very first migration alone are guided by instinct, following a direction and distance encoded in their biology. Older, experienced birds supplement this with memory, recognising landmarks such as coastlines, mountain ranges and large rivers.

Sadly, human activity is making navigation harder. Artificial light at night — what we call light pollution — draws birds off course and causes fatal collisions with buildings.

To understand all this, scientists now fit migrating birds with tiny electronic tags, which record their position and reveal, for the first time, the astonishing routes these travellers take.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'HOW BIRDS NAVIGATE',
          template: `Introduction
• Some birds migrate more than ten thousand {{31}} in a single journey.

Using the sky
• By day, birds use the position of the {{32}}.
• By night, they use the {{33}} to find north.

An internal compass
• Birds can sense the Earth's magnetic {{34}}.
• This sense may be linked to molecules in the birds' {{35}}.

Other methods
• Some seabirds use their sense of {{36}} to make an odour map.
• On their first migration, young birds are guided by {{37}}.
• Experienced birds also recognise {{38}} such as coastlines and rivers.

Threats and research
• Light {{39}} from cities draws birds off course.
• Scientists fit birds with tiny electronic {{40}} to track their routes.`,
          blanks: [
            { num: 31, answers: ['kilometres', 'kilometers', 'km'], maxWords: 1 },
            { num: 32, answers: ['sun'], maxWords: 1 },
            { num: 33, answers: ['stars', 'star'], maxWords: 1 },
            { num: 34, answers: ['field'], maxWords: 1 },
            { num: 35, answers: ['eyes', 'eye'], maxWords: 1 },
            { num: 36, answers: ['smell'], maxWords: 1 },
            { num: 37, answers: ['instinct'], maxWords: 1 },
            { num: 38, answers: ['landmarks', 'landmark'], maxWords: 1 },
            { num: 39, answers: ['pollution'], maxWords: 1 },
            { num: 40, answers: ['tags', 'tag'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 5,
      skill: 'reading',
      title: 'Reading — Passage 1: The Renewable Energy Transition',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The Renewable Energy Transition

The global energy system is undergoing a transformation without historical precedent. After more than a century dominated by fossil fuels, the combination of falling technology costs, climate policy, and shifting investment is accelerating the deployment of renewable energy at a pace that has repeatedly outstripped even optimistic forecasts. In 2023, global capacity additions of solar and wind power reached a record four hundred and forty-five gigawatts—more than all other forms of electricity generation combined.

The decline in the cost of solar photovoltaic electricity has been the most dramatic story in energy economics for a generation. Between 2010 and 2023, the cost of generating electricity from utility-scale solar PV fell by approximately ninety percent, making it the cheapest source of new electricity generation in history in most parts of the world. Wind power followed a similar trajectory, with offshore wind costs falling by around seventy percent over the same period. These cost reductions are not the product of any single technological breakthrough but the result of cumulative improvements across manufacturing, installation, materials science, and supply chain logistics—a process known as "learning by doing" or Wright's Law.

The implications for existing energy systems are significant. In electricity grids that previously relied on dispatchable sources—power stations that generate electricity on demand—the growing share of wind and solar creates new challenges of integration. Solar and wind generate electricity intermittently, dependent on weather conditions, and their output does not automatically match the pattern of demand. Managing this variability requires a range of solutions: flexible demand, interconnection between grids, natural gas as a backup "firm" power source, and increasingly, energy storage.

Battery storage technology has emerged as a critical enabler of the energy transition. The same cost trajectories that transformed solar and wind have affected lithium-ion batteries: prices fell by over ninety-seven percent between 1991 and 2023, unlocking utility-scale battery installations that can store surplus renewable generation and discharge it when needed. Electric vehicles are also reshaping the energy system—both as a major new source of demand for electricity and, potentially, as a distributed storage resource that could help balance grids through vehicle-to-grid charging. The electrification of transport, heating, and industrial processes is a necessary complement to the decarbonisation of the electricity supply.

The pace of transition is uneven across countries and sectors. Rich countries with strong policy frameworks and access to capital have led deployment, though some middle-income countries—notably China, India, and Brazil—have also installed renewable capacity at enormous scale. Fossil fuel-dependent economies, particularly those in which fossil fuels represent a major source of government revenue and employment, face the most complex transitions. For countries like Saudi Arabia, Nigeria, and Australia, the energy transition raises profound questions not only about electricity systems but about economic models and social contracts.

Achieving full decarbonisation of energy systems by mid-century—as required by the Paris Agreement targets—will require not only the continued scaling of wind, solar, and storage but also progress in areas where renewable electricity is more difficult to deploy. "Hard-to-abate" sectors—heavy industry, aviation, and shipping—are responsible for a significant share of global emissions and present greater technical and economic challenges than electricity generation. Green hydrogen, produced by using renewable electricity to split water into hydrogen and oxygen, has attracted considerable interest as a potential fuel for these sectors, though its cost remains high and the infrastructure for its use is at an early stage.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: In 2023, solar and wind capacity additions exceeded those of all other electricity sources combined.\n2. {{2}}: The cost decline of solar PV was primarily the result of a single major scientific breakthrough.\n3. {{3}}: Solar and wind generation poses integration challenges because their output is variable.\n4. {{4}}: Lithium-ion battery prices fell by more than ninety percent between 1991 and 2023.\n5. {{5}}: China, India, and Brazil have installed more renewable energy capacity than any high-income country.\n6. {{6}}: Heavy industry, aviation, and shipping are among the sectors hardest to decarbonise using renewable electricity.\n7. {{7}}: Green hydrogen is already widely used as a fuel in the shipping and aviation industries.`,
          blanks: [
            { num: 1, answers: ['TRUE'] },
            { num: 2, answers: ['FALSE'] },
            { num: 3, answers: ['TRUE'] },
            { num: 4, answers: ['TRUE'] },
            { num: 5, answers: ['NOT GIVEN'] },
            { num: 6, answers: ['TRUE'] },
            { num: 7, answers: ['FALSE'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r1-sent',
          part: 5,
          qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `8. The process of cost reduction through accumulated manufacturing experience is known as {{8}}.\n9. Power stations that can generate electricity on demand are described in the passage as {{9}} sources.\n10. Electric vehicles could potentially help balance electricity grids through {{10}} charging systems.\n11. The {{11}} process uses renewable electricity to split water into hydrogen and oxygen.\n12. Countries in which fossil fuels are a major source of {{12}} face the most complex energy transitions.\n13. The global climate agreement requiring mid-century decarbonisation is known as the {{13}}.`,
          blanks: [
            { num: 8, answers: ['learning by doing', 'Wright\'s Law'] },
            { num: 9, answers: ['dispatchable'] },
            { num: 10, answers: ['vehicle-to-grid'] },
            { num: 11, answers: ['green hydrogen'] },
            { num: 12, answers: ['government revenue'] },
            { num: 13, answers: ['Paris Agreement'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: Cognitive Development in Early Childhood',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Cognitive Development in Early Childhood

A. The first five years of life represent a period of cognitive development of extraordinary rapidity and consequence. The human brain at birth contains virtually all the neurons it will ever have—approximately one hundred billion—but the connections between these neurons, the synapses, are formed at a rate of millions per second during infancy and early childhood. This period of synaptic proliferation is followed, from early childhood through adolescence, by a process of "synaptic pruning" in which connections that are frequently used are strengthened and those that are not are eliminated. The architecture of the mature brain is thus shaped, in significant part, by the quality and richness of a child's early experiences.

B. Jean Piaget, the Swiss psychologist whose work between the 1930s and 1970s revolutionised understanding of child development, proposed that children pass through a series of discrete cognitive stages. In the sensorimotor stage, from birth to approximately two years, infants learn through physical interaction with their environment and develop object permanence—the understanding that objects continue to exist even when not visible. The pre-operational stage, from two to seven years, is characterised by the development of language and symbolic thinking, though logical reasoning remains limited. Children in this stage are typically egocentric—that is, they find it difficult to understand perspectives different from their own.

C. Piaget's stage theory was enormously influential but has been revised by subsequent research. Modern developmental psychologists have found that many cognitive abilities emerge earlier than Piaget proposed, and that development is less clearly staged and more continuous than his model suggests. Infant research using habituation techniques—in which infants' attention to novel versus familiar stimuli is measured—has demonstrated that babies as young as three or four months show implicit understanding of basic physical principles, including aspects of object permanence, that Piaget believed were not present until the end of the first year.

D. Lev Vygotsky, a Soviet psychologist working at roughly the same time as Piaget, emphasised the social and cultural dimensions of cognitive development in ways that Piaget's framework largely ignored. For Vygotsky, cognitive growth is fundamentally a social process: children learn through interaction with more knowledgeable others—parents, older siblings, teachers—who guide them through tasks slightly beyond their current independent capability. The zone of proximal development (ZPD), Vygotsky's most influential concept, refers to the gap between what a child can do alone and what they can achieve with guidance. Effective instruction and scaffolding operate within this zone, stretching the child's capabilities without overwhelming them.

E. Language development is among the most remarkable achievements of early childhood. A typical child produces their first words at around twelve months, reaches a vocabulary of approximately fifty words by eighteen months, and begins combining words into two-word utterances shortly thereafter. By the age of four, most children have acquired the core grammatical structures of their language and can produce and understand an enormous variety of sentences. Linguist Noam Chomsky famously proposed that the speed and uniformity of language acquisition across cultures reflects the existence of an innate "language acquisition device"—a biological predisposition for language that is unique to human beings, though this view has been contested by researchers who emphasise the role of social interaction in language learning.

F. The quality of early childhood environments has profound and lasting effects. Research on adverse childhood experiences—including neglect, abuse, household instability, and poverty—has demonstrated that early adversity is associated with significantly worse developmental outcomes across cognitive, social, emotional, and physical domains. Conversely, research on high-quality early childhood education programmes—particularly those targeting disadvantaged children—consistently shows positive effects on school readiness, academic achievement, and long-term outcomes including employment and health. Economic analyses suggest that investment in early childhood education yields some of the highest returns of any form of public expenditure.

G. The digital environment presents new questions for early childhood development. Screen time among young children has increased dramatically in the past decade, and parents and researchers debate the effects of digital media on attention, language development, and social skills. Current evidence suggests that interactive, co-viewed digital content—in which a caregiver watches and discusses media with a young child—can support language learning, while passive background television and unsupported solo device use appear to have less beneficial or neutral effects. The nature of the content and the social context of viewing appear more important than simple screen time duration.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'Evidence that infant cognitive abilities appear earlier than a major theorist proposed', answer: 'C' },
            { num: 15, stem: 'A description of how children develop language from their first words to full sentences', answer: 'E' },
            { num: 16, stem: 'Research showing that early adversity has lasting negative effects on multiple developmental outcomes', answer: 'F' },
            { num: 17, stem: 'An account of how the mature brain is shaped by early experiences', answer: 'A' },
            { num: 18, stem: 'A concept describing the gap between what a child can do alone and with support', answer: 'D' },
            { num: 19, stem: 'A discussion of how the type of digital media use matters more than the amount of screen time', answer: 'G' },
            { num: 20, stem: 'A description of a stage of development characterised by difficulty in understanding other perspectives', answer: 'B' },
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
          title: 'Key Theories of Child Cognitive Development',
          template: `Jean Piaget proposed that children pass through a series of discrete {{21}}, beginning with the sensorimotor stage in which infants develop {{22}}—the understanding that objects still exist when not seen. Vygotsky, by contrast, emphasised the role of social interaction and introduced the zone of {{23}}, which refers to what a child can achieve with guidance. Chomsky argued that language acquisition reflects an innate {{24}} device unique to humans. Research on early adversity shows that neglect and poverty are associated with worse {{25}} outcomes. Investment in early childhood education programmes targeting disadvantaged children consistently yields high {{26}} compared with other public spending.`,
          blanks: [
            { num: 21, answers: ['cognitive stages'] },
            { num: 22, answers: ['object permanence'] },
            { num: 23, answers: ['proximal development'] },
            { num: 24, answers: ['language acquisition'] },
            { num: 25, answers: ['developmental'] },
            { num: 26, answers: ['returns'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: Globalisation and Its Critics',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `Globalisation and Its Critics

Globalisation—the intensifying economic, cultural, and political interconnection of the world—has been one of the defining processes of the late twentieth and early twenty-first centuries. It has generated extraordinary gains in prosperity and connected billions of people to information, markets, and opportunities previously inaccessible to them. It has also produced profound dislocations and generated a political backlash that has shaped elections and reshaped international relations in ways that were difficult to foresee when globalisation's advance seemed irresistible.

The economic case for globalisation rests on the principle of comparative advantage: the idea that countries benefit by specialising in what they produce most efficiently and trading with others for goods they produce less efficiently. Applied at global scale, this logic supports the international division of labour that has allowed manufacturing to migrate from high-wage to lower-wage countries, sharply reducing production costs and consumer prices. Global poverty reduction over the past three decades has been dramatic: the share of the world's population living in extreme poverty fell from approximately thirty-six percent in 1990 to under ten percent by 2015, and this reduction is heavily concentrated in countries—particularly China and India—that integrated deeply into the global economy.

Not all have shared equally in these gains. Within high-income countries, the benefits of cheaper imports and expanded export markets have been broadly distributed, while the costs—factory closures, job losses in manufacturing, and wage stagnation for workers in directly competing sectors—have been concentrated in specific communities. Research on trade-exposed regions in the United States, United Kingdom, and Germany has consistently found elevated rates of unemployment, depressed wages, and reduced economic mobility in communities that lost manufacturing industries to import competition. The political consequences of this concentrated displacement have been significant: studies have identified a correlation between the share of jobs lost to Chinese import competition in a congressional district and support for populist candidates and positions hostile to further trade liberalisation.

Globalisation's effects on inequality at the global level are more complex than the within-country picture. The economist Branko Milanovic's analysis of global income distribution from 1988 to 2008 produced what he called the "elephant curve"—a graph of income growth across the global distribution in which those at the very bottom and in the rising middle of the global distribution (largely workers in emerging economies) gained substantially, those at the upper-middle range (largely the middle class of high-income countries) experienced relative stagnation, while the global top one percent gained greatly. This pattern reflects both the genuine convergence of developing economies toward higher incomes and the divergence of a global elite from everyone else.

Cultural globalisation has proved equally contested. Flows of music, film, fashion, food, and digital culture across national boundaries have enriched many lives and facilitated new forms of identity, creativity, and connection. Critics, however, point to the dominance of a small number of cultural industries—largely American—in global flows of entertainment and media, raising concerns about the homogenisation of culture, the erosion of local languages and traditions, and the loss of cultural diversity that resembles, in some analyses, a form of cultural imperialism. The evidence, however, is mixed: research in multiple countries has found that exposure to global culture does not straightforwardly displace local cultural production but often generates hybrid forms that blend local and global influences.

The COVID-19 pandemic exposed the vulnerabilities of highly interconnected supply chains, as disruptions in one part of the world rapidly cascaded through global systems for producing medicines, semiconductors, and food. The resulting political pressure for supply chain "reshoring"—the return of production to domestic locations—and the broader shift toward strategic autonomy in critical sectors has introduced a new phase of "slowbalisation" or selective deglobalisation. Whether this represents a temporary adjustment or a deeper structural shift in the organisation of the global economy remains one of the central questions of international political economy.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'What economic principle does the passage identify as the foundation for the case in favour of globalisation?',
          options: [
            'The principle of absolute advantage in international production.',
            'The principle of comparative advantage, in which countries specialise in their most efficient outputs.',
            'The law of supply and demand as applied to international trade.',
            'The principle of economic equilibrium between importing and exporting nations.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'According to the passage, how have the costs of globalisation been distributed within high-income countries?',
          options: [
            'The costs have been shared equally across all income levels and regions.',
            'The costs have mainly been borne by wealthy sectors that lost export markets.',
            'The costs have been concentrated in specific communities that lost manufacturing jobs.',
            'The costs have fallen primarily on consumers who pay higher prices for imported goods.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'What is the "elephant curve" described by the economist Branko Milanovic?',
          options: [
            'A graph showing that the global poor gained the most from globalisation, while the rich gained least.',
            'A visualisation of income growth showing gains for the global middle and top 1%, but stagnation for high-income country middle classes.',
            'A diagram comparing economic growth rates in elephantine economies such as India.',
            'A curve showing that global inequality has consistently fallen over the period of globalisation.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'What does the research on cultural globalisation suggest about local cultural production?',
          options: [
            'Local cultures are invariably destroyed by exposure to global media and entertainment.',
            'American cultural dominance has been largely reversed by the growth of local streaming platforms.',
            'Exposure to global culture often produces hybrid forms rather than simply displacing local culture.',
            'Cultural globalisation has no measurable effect on local traditions or languages.',
          ],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: The writer argues that globalisation has generated both significant gains and significant dislocations.\n32. {{32}}: The reduction in extreme poverty since 1990 is primarily due to globalisation in countries like China and India.\n33. {{33}}: Research shows a direct link between job losses caused by trade and support for anti-trade political candidates.\n34. {{34}}: Branko Milanovic concludes that globalisation has benefited only the top one percent of income earners globally.\n35. {{35}}: The passage claims that cultural globalisation has resulted in the complete disappearance of local cultural traditions in many countries.\n36. {{36}}: The COVID-19 pandemic contributed to political pressure to return production to domestic locations.`,
          blanks: [
            { num: 31, answers: ['YES'] },
            { num: 32, answers: ['YES'] },
            { num: 33, answers: ['YES'] },
            { num: 34, answers: ['NO'] },
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
          template: `37. The concentration of cultural production in a small number of countries has raised concerns about cultural {{37}}.\n38. The term used to describe the return of production to domestic locations is {{38}}.\n39. The broader shift toward reducing international economic integration has been described as {{39}} or selective deglobalisation.\n40. The passage describes the organisation of the global economy as a central question of international {{40}}.`,
          blanks: [
            { num: 37, answers: ['imperialism', 'homogenisation'] },
            { num: 38, answers: ['reshoring'] },
            { num: 39, answers: ['slowbalisation'] },
            { num: 40, answers: ['political economy'] },
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
          imageUrl: '/assets/ielts/charts/set16-task1.svg',
          imageAlt: 'Bar chart showing global installed renewable energy capacity by type in 2010, 2015, and 2022',
          stimulus: 'The bar chart below shows global installed renewable energy capacity (in gigawatts) for four energy types in 2010, 2015, and 2022.',
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
          stimulus: 'Governments and businesses are increasingly investing in renewable energy sources such as wind and solar power.',
          text: 'What are the advantages of this trend, and what challenges does the transition away from fossil fuels present? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
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
          text: 'Part 1 — Personal questions about learning and education',
          followUp: [
            'What was your favourite subject at school, and why?',
            'How do you prefer to learn new skills — by reading, watching videos, or practising?',
            'Do you think the education you received has prepared you well for adult life?',
            'What is something you would like to learn more about in the future?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a change that has happened in your country that you consider positive.\n\nYou should say:\n• what the change is\n• when and how it happened\n• how it has affected people's lives\n• and explain why you consider it a positive development`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Energy, environment, and global cooperation',
          followUp: [
            'Do you think individuals can make a meaningful difference to climate change through their personal choices?',
            'How important is international cooperation in addressing global challenges like climate change?',
            'Do you think richer countries have a greater responsibility to reduce their carbon emissions than poorer ones?',
            'What do you think the world will look like in fifty years in terms of energy production?',
          ],
        },
      ],
    },
  ],
};

export default mock;
