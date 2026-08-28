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

OFFICER: Perfect, thank you. We use the name on the booking form for collection checks, so please tell us if another adult will pick the children up. And the best number to reach you on?

PARENT: My mobile is 07700 900642. My office number is on an old form, but please don't use it because I rarely work there now.

OFFICER: Let me just repeat that — 07700 900642.

PARENT: That's the one.

OFFICER: And how many children are you registering today?

PARENT: I was going to bring three, but my eldest has other plans now, so just 2.

OFFICER: No problem, 2 children. We can place siblings in different age groups and they can still arrive together. Now, we run several kinds of camp. Were you interested in the sports camp?

PARENT: I looked at that, and the arts week sounded good too, but I think they'd both prefer the adventure camp — they love being outdoors and neither is especially keen on team games.

OFFICER: A popular choice. The camp runs every weekday, starting at 9 am and finishing at 4 pm. We open the gate at quarter to nine, but that early period is only for signing children in; the activities still begin at nine.

PARENT: That works well for us. I had seen five o'clock on the website, so I'm glad I checked.

OFFICER: Five is when the office closes, not the children's collection time. If a parent is delayed, they must ring us rather than ask a child to wait outside.

OFFICER: Now, a few things to remember. Children should bring a packed lunch each day, as we don't provide meals. We do supply drinking water, so a refillable bottle is useful, although it isn't compulsory. Please avoid nuts because one child has a severe allergy. And because they'll be outside a lot, please make sure they've applied sunscreen before they arrive. They can bring a light waterproof jacket too; we continue in light rain but move indoors in a storm.

PARENT: Understood. Do they need hiking boots?

OFFICER: Trainers with a good grip are fine. Please label clothing clearly. And did you want to ask about the cost?

PARENT: Yes, please.

OFFICER: It depends on their ages. Our Juniors programme is for children aged 6 and over, and that's £90 per week. The price includes craft materials and the short minibus trips, but not lunch. Juniors also each receive a free cap to wear on trips. Last year it was a T-shirt, so some returning families may remember a different item.

PARENT: And for older children?

OFFICER: That would be our Explorers programme. The minimum age for that is 9, and it's a little more — £120 a week, because it includes more excursions and a climbing session. Explorers are given a free backpack instead of a cap. There is an optional overnight stay on Thursday, but that has a separate charge and you can decide about it later.

PARENT: Right. My two are 8 and 11, so I suppose that's one in each.

OFFICER: Exactly. Before I set it up, I should mention that places are held for forty-eight hours. You can pay online, and we'll email the medical and emergency-contact forms. Both forms must be returned before the first Monday.

PARENT: Fine. I'll complete them tonight.

OFFICER: Excellent. I'll set that up for you now.`,
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
            { num: 4, answers: ['4'], maxWords: 1 },
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
      transcript: `Good evening, everyone, and thank you for coming to the launch of our town's new recycling scheme. I'm Sarah Malik from the council's environment team. I'll explain what changes next month, what belongs in each container and where residents can get help. There will be time for questions at the end, so please keep this information leaflet beside you.

Let me start with the most visible change. Every household will receive a new recycling bin. To make it easy to identify, the bin is green, quite different from the black container used for general rubbish. Flats that share a collection point will receive larger communal versions, while houses will get individual wheeled bins. Please write your address on the label under the lid, not on the outside, because the bins remain council property.

Now, what can go in them? The list is fairly generous. Clean glass bottles and jars are fine, as are cardboard, newspapers, steel tins and empty drinks cans. Cardboard boxes should be flattened so they do not occupy the whole bin. You do not need to remove paper labels from jars, but lids should be placed loose in the bin.

There are, however, two common items we cannot accept. Please do not put plastic bags in the recycling bin: they become tangled around the sorting equipment. The bags can still be taken to collection points at several supermarkets. Secondly, containers covered in food cannot be processed. A quick rinse is enough; they do not need to be perfectly clean, but packaging with food still inside must go in general waste. Broken drinking glasses are also excluded, although they are not one of the items on your checklist, because that type of glass melts at a different temperature.

As for collections, your green bin will normally be emptied on a Wednesday. The old leaflet mentioned Friday, but that referred to the trial in the northern district. The service is fortnightly — in other words, once every two weeks — rather than weekly. We will post a calendar through each door showing the exact dates, including changes around public holidays. Please put the bin at the edge of your property by seven in the morning and bring it back after collection.

The bins are being delivered street by street and all homes should receive one by 30 June. Do not report a missing delivery before that deadline. If your household is large and the standard size is genuinely insufficient, call the recycling helpline shown on the back of the leaflet. Staff will ask how many people live at the address before approving a larger container. The general council switchboard cannot process those requests.

To encourage everyone to take part, we are running a monthly competition. One household that sorts its materials particularly well will receive a shopping voucher worth fifty pounds. It is the voucher, rather than cash, and the winner can use it in participating local shops. Collection crews will make nominations; residents do not need to enter.

Why are we making this change? At present too much reusable material goes into landfill. Our measured target is to reduce the quantity sent there by 40 percent within two years. That does not mean every household must produce forty percent less waste; it is a town-wide target based on the weight collected.

Finally, food scraps are handled separately from the green-bin scheme. Any resident can collect a free kitchen caddy from the town hall. Ask at the front desk and take proof of address. Compostable liners are available there too, but ordinary plastic liners must not be used. Thank you for listening, and with careful sorting we can make the launch a success.`,
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
            { num: 15, answers: ['fortnightly', 'two weeks'], maxWords: 2 },
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
      transcript: `TUTOR: Right, Liam and Sophie, let's review your prototype. Before we discuss the results, remind me what the design brief actually asked you to achieve.

SOPHIE: We had to build a small water-treatment prototype for a classroom demonstration, using no mains electricity. The main aim was to make it as affordable as possible, because the brief imagined settings where replacement parts and specialist tools might be difficult to obtain.

TUTOR: Good. Calling it a prototype is important. It is not a certified drinking-water device, and your report must not imply that anyone should use it in a real emergency. What did you choose for the casing?

LIAM: A clear plastic bottle. We first considered a metal cylinder because it would survive repeated use, but the sheet was expensive and needed workshop equipment to shape. The bottle was cheaper and lighter, so it fitted both our budget and the requirement to carry the model between demonstrations.

TUTOR: And the material inside it?

SOPHIE: Three layers: washed gravel at the bottom, fine sand in the middle and activated charcoal above that. We placed cloth over the outlet so the grains would not escape.

TUTOR: What did each layer appear to do?

LIAM: The gravel supported the finer material, the sand trapped visible particles, and the charcoal reduced the odour and colour in our prepared sample. We originally wrote that it removed all impurities, but that claim was much too broad. We only measured turbidity and appearance; we did not test dissolved chemicals.

TUTOR: Exactly. A change in taste or clarity does not prove that water is safe. How did the flow test go?

SOPHIE: At a slow, controlled rate it ran steadily. When we poured the sample in quickly, though, the filter clogged and the flow almost stopped. Stirring the top layer made the water cloudier, so we stopped and cleaned the unit.

TUTOR: That gives you a useful design trade-off. My main concern, however, is microbiological safety. A simple sand-and-charcoal model may reduce some particles, but your experiment does not show that it removes viruses or parasites, and it does not kill bacteria. Without validated treatment and safe storage, the output must not be described as drinking water.

LIAM: We understand. We had treated filtration and disinfection as if they were the same process.

TUTOR: They are separate barriers. For the next version, first reduce the weight, but do not make the casing unstable. Second, lower the cost and provide an itemised calculation rather than a rough estimate. Third, add a stage that disinfects the water. You mentioned ultraviolet light in your proposal, but UV performance depends on dose, equipment and water clarity, so you cannot just shine a small lamp through a cloudy bottle and claim success.

SOPHIE: Would it be better to compare a validated UV unit with a carefully specified chemical treatment on paper, instead of improvising either one?

TUTOR: Yes. Make the comparison part of the design review and explain the maintenance, contact time and safety requirements. Then carry out more testing with water samples of different turbidity. That testing should include repeat trials and measurements before and after each stage, not tasting the water. Your final improvement is communication: include a clear diagram in the report, with arrows showing the order of treatment and a warning that the classroom prototype is not approved for consumption.

TUTOR: Correct. A responsible engineering project defines what the prototype can and cannot demonstrate. If your conclusions stay within the evidence, the project will be much stronger.

SOPHIE: Thanks. We'll revise the claims and testing plan before rebuilding it.`,
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
            { num: 28, answers: ['disinfects'], maxWords: 1 },
            { num: 29, answers: ['testing'], maxWords: 1 },
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
      transcript: `Good afternoon. Today we are going to examine how migrating birds orient themselves and reach a destination. Every year, birds travel between breeding and non-breeding areas, and some species cover more than ten thousand kilometres in a single journey. Evidence suggests that birds combine several cues whose importance varies with species, age, weather and location.

We will begin with the sky. Birds travelling by day can use the position of the sun as a compass. Since the sun moves across the sky, this system must be corrected by an internal sense of time. Experiments that shift a bird's apparent daily clock can therefore change the direction it chooses.

Many small songbirds migrate at night, when the sun is unavailable. Young birds do not simply identify one bright star and follow it. Classic planetarium experiments indicate that they learn the pattern of rotation in the night sky. Stars appear to turn around a region near the celestial pole, and experience of that rotating pattern provides directional information. Clouds can hide both solar and stellar cues, so a bird needs alternatives.

One alternative is sensitivity to the Earth's magnetic field. Behavioural experiments show that changing the field around a bird can alter its orientation. However, the biological detector remains debated. One leading hypothesis involves light-sensitive cryptochrome molecules in the birds' eyes. Chemical reactions in these molecules might provide compass information under suitable wavelengths of light. Researchers sometimes use the convenient metaphor that a bird could "see" a magnetic pattern, but this has not been demonstrated as a literal visual image. Other proposed mechanisms, including particles containing iron, have also been investigated. The evidence does not justify treating a single explanation as settled.

A compass does not necessarily reveal where home is. Visual features such as coastlines, mountains and rivers can guide experienced individuals over familiar territory.

Smell can contribute too. Experiments with pigeons and some seabirds indicate that their sense of smell supplies location information. Scientists describe this as an odour map, but it is not known to operate identically in every species.

Age creates another important distinction. In several species, a young bird making its first migration without an adult follows an inherited programme: its initial direction and approximate duration are guided partly by instinct. In species that travel socially, juveniles may learn routes from experienced birds. With later journeys, memory and landmarks can refine the route. Thus inherited and learned information can contribute in different proportions.

Human activity can disrupt that system. Artificial illumination creates light pollution, especially around cities and offshore structures. Nocturnal migrants may circle bright sources, waste energy or collide with windows and buildings. Weather, habitat loss and altered seasonal timing create additional risks, but artificial light is the threat most directly connected to the celestial cues discussed today. Reducing unnecessary lighting during peak migration can lower some of those hazards.

Finally, scientists reconstruct routes with tiny electronic tags. Some store measurements for later retrieval; others send positions through radio or satellite networks. Devices must be light enough not to change normal behaviour. Combined with orientation experiments, these tracks show where a bird travelled and help researchers investigate how it chose the way.`,
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
            { num: 31, answers: ['kilometres'], maxWords: 1 },
            { num: 32, answers: ['sun'], maxWords: 1 },
            { num: 33, answers: ['stars', 'star'], maxWords: 1 },
            { num: 34, answers: ['field'], maxWords: 1 },
            { num: 35, answers: ['eyes'], maxWords: 1 },
            { num: 36, answers: ['smell'], maxWords: 1 },
            { num: 37, answers: ['instinct'], maxWords: 1 },
            { num: 38, answers: ['landmarks'], maxWords: 1 },
            { num: 39, answers: ['pollution'], maxWords: 1 },
            { num: 40, answers: ['tags'], maxWords: 1 },
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

The composition of the world's power system is changing rapidly, although not evenly. International Renewable Energy Agency figures show that solar and wind supplied 96.6 percent of net renewable generating-capacity additions in 2024. Capacity is the maximum output that installations can produce; it is not the same as the electricity actually generated, which also depends on weather, maintenance and operating decisions. The distinction matters when impressive installation totals are used to describe the wider energy transition. Faster construction of renewable plants can reduce dependence on fossil-fuel generation, but it does not by itself guarantee that every hour of demand will be met with low-carbon electricity.

Economics has been a major driver. Between 2010 and 2024, the global weighted average cost of electricity from newly commissioned utility-scale solar photovoltaic plants fell by about ninety percent. In 2024, most new utility-scale renewable capacity in the available cost database produced electricity more cheaply than the lowest-cost newly built fossil-fuel alternative. Neither result came from a single dramatic invention. Manufacturers improved modules and turbines, developers gained experience, supply chains expanded and installation practices became more efficient. Economists often describe cost reductions accumulated through repeated production as learning by doing. Yet the global average can conceal local differences: borrowing costs, planning delays, grid connections and the quality of the resource can make an otherwise inexpensive technology costly in a particular market.

Wind and solar are variable because their output follows environmental conditions rather than an operator's request. Conventional stations able to adjust generation on demand are commonly described as dispatchable. As the variable share grows, grid planners must coordinate a broader collection of resources. Transmission can move electricity from a windy or sunny region to one with higher demand. Interconnection can smooth some local fluctuations, while demand response can shift flexible uses to favourable hours. Hydropower, geothermal power and other controllable resources may contribute where geography permits. None of these measures is a universal substitute for the others; the appropriate mix depends on the existing system and on timescales ranging from seconds to seasons.

Storage is one part of that mix. IRENA reports that battery-storage costs declined by 93 percent between 2010 and 2024. Short-duration batteries can absorb surplus electricity and release it later, as well as provide rapid balancing services, but their economics and materials requirements must still be considered. Longer gaps may require other storage technologies, stronger networks or controllable generation. Electric vehicles add demand to the system, yet suitably equipped cars could also return power through vehicle-to-grid charging. That possibility depends on compatible chargers, market rules and owners' willingness to make part of a battery available. Electrifying vehicles or heating also reduces emissions only to the extent that the power supplying them becomes cleaner.

The transition has a geographical and social dimension. Some economies can obtain affordable finance and build networks quickly, whereas others face high capital costs or weak infrastructure. Several large middle-income countries, including China, India and Brazil, have deployed renewables at substantial scale, but this observation alone does not establish a simple ranking against every high-income country. Regions dependent on mining, refining or exporting fossil fuels face another problem. Where the sector supplies government revenue, foreign exchange and stable employment, a rapid fall in demand can affect public services and communities. A "just transition" therefore includes worker training, regional investment and consultation, not merely the replacement of one generating technology with another.

Policy also has to address effects beyond the power plant. Renewable projects need land, minerals, manufacturing and transmission lines. Poorly planned development can damage habitats or exclude local communities from decisions. Conversely, transparent siting, recycling standards and benefit-sharing can reduce conflict. Supply chains for panels, turbines and batteries are internationally connected, creating efficiencies but also exposure to trade restrictions and concentrated production. Energy security is consequently not a matter of producing every component domestically; it can also involve diverse suppliers, inventories and resilient networks.

The Paris Agreement guides national efforts to limit warming, but it does not prescribe one identical technology pathway for every country. Deep emissions reductions will require progress beyond electricity. Heavy industry, aviation and shipping are frequently called hard-to-abate sectors because direct electrification is technically or economically difficult for some uses. Green hydrogen is one proposed option. It is made through electrolysis, using electricity to split water into hydrogen and oxygen; calling it green normally implies that the electricity is renewable. It may be useful for selected industrial processes and derived fuels, but production costs, conversion losses, infrastructure and water requirements constrain deployment. At present, it would be inaccurate to describe green hydrogen as a fuel already used widely across aviation and shipping. The transition is therefore best understood not as a single race to install panels and turbines, but as the coordinated redesign of technology, markets and institutions.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Solar and wind accounted for more than ninety-six percent of net renewable capacity additions in 2024.\n2. {{2}}: The cost decline of solar PV was primarily the result of a single major scientific breakthrough.\n3. {{3}}: Solar and wind create integration challenges because their output is variable.\n4. {{4}}: Battery-storage costs fell by more than ninety percent between 2010 and 2024.\n5. {{5}}: China, India, and Brazil have installed more renewable energy capacity than every high-income country.\n6. {{6}}: Heavy industry, aviation, and shipping include uses that are difficult to electrify directly.\n7. {{7}}: Green hydrogen is already widely used as a fuel in shipping and aviation.`,
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
          template: `8. Cost reductions accumulated through repeated production are known as {{8}}.\n9. Power stations that can adjust generation on demand are described as {{9}}.\n10. Electric cars could return power to the grid through {{10}} charging.\n11. The process that uses electricity to split water is called {{11}}.\n12. A fall in fossil-fuel demand can be especially difficult where the sector supplies {{12}}.\n13. The international climate accord named in the passage is the {{13}}.`,
          blanks: [
            { num: 8, answers: ['learning by doing'] },
            { num: 9, answers: ['dispatchable'] },
            { num: 10, answers: ['vehicle-to-grid'] },
            { num: 11, answers: ['electrolysis'] },
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

A. Early childhood is a period of rapid cognitive development, but claims about the brain must be interpreted carefully. Connections among neurons are created and reorganised as children act, communicate, sleep and respond to their surroundings. Some connections are strengthened while others are pruned as development continues. This experience-dependent refinement does not mean that a single lesson permanently fixes the mature brain, nor that development ends after a narrow window. Genes, health, nutrition and later learning also matter. Nevertheless, early experiences form part of the architecture on which later skills develop. This is why international guidance on nurturing care treats responsive caregiving and opportunities for early learning alongside health, nutrition, safety and security rather than as isolated educational extras.

B. One influential historical account came from Jean Piaget, who proposed a sequence of discrete cognitive stages. In his sensorimotor stage, extending roughly from birth to two years, infants learn through perception and physical action and gradually develop object permanence: the understanding that an object continues to exist when it is out of sight. Piaget's pre-operational stage, from about two to seven, includes rapid growth in language and symbolic play, while certain forms of logical reasoning remain difficult. He described young children as egocentric because they may struggle to represent a perspective different from their own. The age boundaries were intended as a developmental framework, not a timetable against which every child can be diagnosed.

C. Later experiments revised parts of this stage theory. Researchers developed habituation methods in which an infant is repeatedly shown a stimulus until attention declines, then presented with a new or apparently impossible event. Differences in looking time suggest that some expectations about objects emerge earlier than Piaget's action-based tasks indicated. Such findings support the claim that infant cognitive abilities can appear earlier than his original account predicted. They do not, however, give direct access to a baby's thoughts. Looking-time results depend on experimental design and can support competing explanations, so researchers are cautious about equating surprise with a fully adult concept of physics or object permanence.

D. Lev Vygotsky placed greater emphasis on culture, language and interaction with other people. His best-known concept, the zone of proximal development, is the distance between what a learner can do independently and what the learner can achieve with guidance. A parent might model one step of a puzzle, ask a useful question and then withdraw assistance as the child becomes competent. This temporary support is often called scaffolding, although the later term was coined by other researchers. The approach does not imply that adults should continually direct play. Effective support is responsive: it notices the child's current goal and provides enough help to extend participation without taking over the task.

E. Language illustrates how biological readiness and social experience interact. First words and combinations often emerge in a broadly predictable sequence, but exact ages and vocabulary sizes vary among children, languages and communicative environments. Gesture, turn-taking and shared attention prepare the ground before recognisable words appear. Noam Chomsky argued that the speed with which children acquire complex grammar points to an innate language acquisition device or specialised biological capacity. Other accounts give more weight to statistical learning, general cognition and conversation. The disagreement is not between biology and experience as mutually exclusive forces; contemporary research asks what information children can learn, what constraints they bring and how responsive interaction supports the process.

F. Adversity can affect many parts of this system. Neglect, violence, household instability and poverty are associated with poorer developmental outcomes across cognitive, emotional, social and physical domains. Association is not destiny, and poverty should not be treated as a quality of parenting: supportive relationships and effective services can protect children, while structural conditions shape the resources available to families. Evidence for early-childhood programmes also varies according to design, staff quality, duration and the group served. Some well-studied, high-quality interventions for disadvantaged children have improved school readiness and later outcomes, and economic evaluations have reported long-term returns. It would be misleading to assume that every programme automatically produces the same result.

G. Digital media adds a newer set of questions. A label such as screen time combines video calls, creative play, educational programmes, fast-paced entertainment and television running unattended in the background. These experiences are unlikely to have identical effects. Age-appropriate material viewed with a caregiver may prompt conversation and help a child connect images to real life, whereas passive background television can displace talk or focused play. Duration still matters because time with a device replaces some other activity, including movement and sleep. Content and social context therefore need to be considered alongside duration, not used to dismiss it. Research also faces a familiar difficulty: families who use media differently may differ in many other ways, making simple cause-and-effect claims unreliable.`,
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
            { num: 17, stem: 'An account of experience-dependent refinement in the developing brain', answer: 'A' },
            { num: 18, stem: 'A concept describing the gap between what a child can do alone and with support', answer: 'D' },
            { num: 19, stem: 'A discussion of why content, social context and duration must all be considered in digital-media use', answer: 'G' },
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
          template: `Jean Piaget proposed a sequence of discrete {{21}}, beginning with a sensorimotor period in which infants develop {{22}}—the understanding that objects continue to exist when out of sight. Vygotsky emphasised interaction and introduced the zone of {{23}}, which concerns what a learner can achieve with guidance. Chomsky proposed an innate {{24}} device or specialised biological capacity. Neglect, instability and poverty are associated with poorer {{25}}. Evaluations of some high-quality interventions have reported long-term {{26}}.`,
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

Globalisation describes increasing economic, cultural and political connections across borders. It is not a single policy with one measurable effect. Lower communication costs, container shipping, trade agreements, migration and digital networks have all contributed, while governments have retained different rules for labour, finance and public services. Supporters point to access to larger markets, knowledge and cheaper goods. Critics emphasise dislocations, environmental pressures and the unequal power of firms and states. Both gains and dislocations can occur at the same time, which helps explain why national averages and personal experience often produce sharply different accounts of the same period.

The conventional economic case begins with comparative advantage. Even when one country is more productive in every activity, both trading partners may benefit if each specialises relatively more in goods or services for which its opportunity cost is lower. The simplified model clarifies a possible source of gains; it does not predict how those gains will be divided or how quickly workers and capital can move. Modern production also crosses borders repeatedly. A design may be created in one country, components made in several others and final assembly completed elsewhere. Such global value chains account for almost half of world trade, according to the World Bank, but their expansion has been sluggish since the 2008 financial crisis.

The period of deeper integration coincided with a large fall in global extreme poverty. Under the World Bank's poverty line updated in 2025 to three international dollars a day, the estimated rate fell from 44 percent in 1990 to 10.5 percent in 2022. Rapid growth in China and other Asian economies contributed substantially to that change, and export-oriented production was one element of their development. The figures do not establish that globalisation was the sole or primary cause. Domestic reforms, education, public investment, demographic change and the method used to set an international poverty line also affect the interpretation. Indeed, revisions to prices and survey data can change historical estimates without changing anyone's past living conditions.

Within countries, benefits and costs may be distributed differently. Consumers can gain from lower prices and firms can reach export markets, while factory closures and job losses are concentrated in specific communities exposed to import competition. Adjustment is rarely immediate: specialised skills, housing costs and family ties may prevent displaced workers from moving to a growing region. Studies of trade-exposed areas have reported persistent effects on employment and earnings. Political research has also found correlations between exposure to import shocks and support for populist or protectionist positions. A correlation is not a direct link proving that every lost job causes a particular vote; local institutions, prior economic decline and political campaigning can influence both outcomes.

Inequality across the entire world adds another layer. Economist Branko Milanovic helped popularise an influential graph nicknamed the elephant curve, which plotted income growth at different points of the global distribution between 1988 and 2008. Its original shape suggested strong gains for a rising global middle, weaker growth for parts of the upper-middle distribution often associated with working and middle classes in rich economies, and large gains near the top. Later work using different data, periods and methods has altered the curve's shape and challenged simple identifications of each percentile with one social group. The episode illustrates a broader lesson: a striking graph can organise debate, but it cannot by itself separate the effect of trade from technology, national policy or starting income.

Cultural globalisation is similarly contested. Music, film, food, fashion and language travel quickly through broadcasting, migration and online platforms. Critics fear cultural homogenisation when a small number of commercial industries dominate attention, and some use the phrase cultural imperialism to describe unequal influence. Yet audiences are not merely passive recipients. Producers and communities adapt imported forms, combine them with local traditions and circulate the result back across borders. Researchers therefore often observe hybrid forms rather than the straightforward disappearance of local production. That finding does not prove that every language or tradition is secure; market concentration and platform algorithms can still make some voices much easier to encounter than others.

Recent shocks have changed the debate about production networks. During the COVID-19 pandemic, simultaneous factory closures, transport constraints and sudden shifts in demand disrupted supplies of medical equipment, semiconductors and many everyday goods. Governments and firms responded with inventories, alternative suppliers and, in some cases, reshoring—the return of production to a domestic location. Others adopted "friend-shoring" or regional sourcing. These strategies involve trade-offs: duplication may improve resilience to one disruption while raising costs or creating a new concentration elsewhere.

The label slowbalisation has been applied to a period in which some measures of cross-border economic integration grew more slowly, but selective deglobalisation is not the same as the end of international exchange. Trade in services and data may expand while trade in particular strategic goods becomes more restricted. Climate policy requires cross-border finance and technology even as geopolitical rivalry encourages controls. The future organisation of production is consequently a central question of international political economy. The most useful debate is not whether an abstract force called globalisation is wholly good or bad, but which rules spread benefits, support adjustment and manage risks without abandoning cooperation.`,
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
          template: `31. {{31}}: The writer argues that globalisation can generate gains and dislocations at the same time.\n32. {{32}}: Globalisation was the primary cause of the fall in extreme poverty between 1990 and 2022.\n33. {{33}}: Research proves a direct causal link between every trade-related job loss and a vote for a protectionist candidate.\n34. {{34}}: The elephant curve showed that only the top one percent experienced income growth.\n35. {{35}}: The passage claims that cultural globalisation has completely eliminated local production.\n36. {{36}}: The COVID-19 pandemic encouraged some interest in returning production to domestic locations.`,
          blanks: [
            { num: 31, answers: ['YES'] },
            { num: 32, answers: ['NO'] },
            { num: 33, answers: ['NO'] },
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
          imageAlt: 'Grouped bar chart comparing global renewable power capacity for hydropower, wind, solar and other technologies in 2015 and 2022',
          stimulus: 'The bar chart below compares global installed renewable power capacity, measured in gigawatts, for four technology groups in 2015 and 2022.',
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
          stimulus: 'Some people believe governments should spend public money on making homes more energy-efficient, while others think the money should be used to build more renewable power stations.',
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
          text: 'Part 1 — Learning new things',
          followUp: [
            'Do you enjoy learning new things?',
            'What is something useful you learned recently?',
            'Do you prefer to learn alone or with other people?',
            'Where do you usually go when you need to study?',
            'Did you enjoy studying when you were a child?',
            'Is there a skill that is difficult for you to learn?',
            'Do you use videos when you are learning something?',
            'What would you like to learn in the future?',
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
            'Why do some communities accept environmental changes more readily than others?',
            'How should governments balance the cost of new energy systems with long-term benefits?',
            'Can personal choices make a meaningful difference to large environmental problems?',
            'Why is international cooperation important when environmental problems cross borders?',
            'Should wealthier countries carry more responsibility for financing cleaner technology?',
            'How might the way electricity is produced change over the next fifty years?',
          ],
        },
      ],
    },
  ],
};

export default mock;
