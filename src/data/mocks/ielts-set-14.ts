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
              { num: 8, answers: ['decorations', 'decoration'], maxWords: 1 },
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

On fundraising: all the money we raise this year will go towards a new children's playground in the town. The easiest way to collect donations is through your online sponsorship page. And finally, parking. The park's own car park will be closed for the event, so please use the free parking at the nearby shopping centre and walk across. Thanks again, and let's hope for some sunshine.`,
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
            { num: 18, answers: ['arrows', 'arrow'], maxWords: 1 },
            { num: 19, answers: ['playground'], maxWords: 1 },
            { num: 20, answers: ['shopping centre', 'shopping center'], maxWords: 2 },
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

BEN: Great, thanks.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'The fieldwork will take place at',
          options: [
            'a river valley with exposed sediment layers beside an inland stream',
            'a coastal cliff site',
            'a disused quarry',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'The main aim of the trip is to',
          options: [
            'collect fossils from every visible layer before recording its position',
            'record the rock layers',
            'take water samples',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'The group will travel to the site by',
          options: [
            'train',
            'minibus',
            'coach',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'There are not enough',
          options: [
            'hand lenses',
            'safety helmets',
            'notebooks',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'At the site, the main safety risk is',
          options: [
            'falling rocks from the cliff throughout the entire field visit',
            'the incoming tide',
            'slippery paths',
          ],
          answer: 1,
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
            { num: 26, answers: ['boots', 'boot'], maxWords: 1 },
            { num: 27, answers: ['waterproof'], maxWords: 1 },
            { num: 28, answers: ['form'], maxWords: 1 },
            { num: 29, answers: ['sample'], maxWords: 1 },
            { num: 30, answers: ['phones', 'phone'], maxWords: 1 },
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
      transcript: `Good afternoon. In today's lecture I'll trace the history of paper money, from its origins in China right through to the plastic notes of the present day.

The story begins in China, more than a thousand years ago. Chinese merchants grew tired of carrying heavy strings of copper coins, so during the Tang dynasty they began leaving their coins with trusted agents, who issued them a paper receipt in exchange. This early paper money was nicknamed "flying money", because a strong wind could easily blow it out of your hands.

By the following dynasty, the government itself had taken over the printing of the notes, and paper money became official currency. The idea took a very long time to reach Europe. When the traveller Marco Polo returned home and described it, many readers simply did not believe him.

Europe's first proper banknotes were issued in Sweden in the seventeenth century. Unfortunately, the bank printed far too many, and the notes quickly lost their value — an early lesson in the danger of inflation. For the next two centuries, most banknotes were backed by gold: in theory, a note could always be exchanged at the bank for a fixed weight of the metal.

That link to gold was finally broken in the twentieth century. Since then, paper money has been what economists call "fiat" currency, meaning that its value rests entirely on public trust rather than on any precious metal.

Producing notes that are hard to copy has always been a challenge. Modern notes use a range of security features, such as a watermark, a metallic thread running through the paper, and ink that changes colour when the note is tilted.

Most recently, several countries have replaced paper with a thin, flexible plastic, usually a material called polymer. These notes last far longer, survive being washed, and are much harder to forge. Some economists predict that, as digital payments spread, physical cash may one day disappear altogether — but for now, the banknote in your pocket remains a remarkable piece of technology.`,
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

Artificial intelligence systems are making consequential decisions with increasing frequency and speed—screening job applicants, evaluating loan applications, recommending criminal sentences, and diagnosing diseases. As these systems become more deeply embedded in the infrastructure of modern life, the ethical questions they raise have moved from the realm of science fiction to urgent policy debate.

One of the most widely discussed concerns is algorithmic bias. AI systems learn from historical data, and if that data reflects past patterns of discrimination—in hiring, lending, law enforcement, or healthcare—the models trained on it are likely to perpetuate and, in some cases, amplify those patterns. Bias can also enter through an unrepresentative sample or through proxy variables, such as a postcode that indirectly encodes income or ethnicity. A prominent example is the COMPAS recidivism algorithm, used in parts of the United States to estimate whether a convicted person would reoffend and to inform sentencing decisions. A ProPublica investigation in 2016 reported that black defendants who did not reoffend were nearly twice as likely as comparable white defendants to be classified as higher risk. The company that created COMPAS disputed the analysis, illustrating how different statistical definitions of fairness can produce competing assessments of the same system.

A second concern involves transparency. Many advanced AI systems, particularly those based on deep learning, operate as "black boxes": they produce outputs whose internal reasoning is opaque even to their creators. When an AI system denies a mortgage application or flags a medical image as suspicious, the inability to explain the decision in human-comprehensible terms creates problems for accountability, for the ability to contest decisions, and for the identification and correction of errors. The European Union's General Data Protection Regulation (GDPR) gives people protections against decisions based solely on automated processing when those decisions have legal or similarly significant effects. Where specified exceptions apply, safeguards include human intervention, an opportunity to express a view, and the ability to contest the decision. The regulation also requires information about automated decision-making and the logic involved, although lawyers continue to debate the exact scope of any broader "right to explanation".

The prospect of autonomous weapons systems raises what many consider the most acute ethical challenge in AI development. Systems capable, once activated, of selecting and engaging targets without further human intervention are sometimes described as lethal autonomous weapons systems or LAWS. Critics argue that ceding decisions about lethal force to a machine threatens fundamental principles of international humanitarian law, including distinction between civilians and military targets and proportionality in attack. The International Committee of the Red Cross has recommended binding rules that would prohibit unpredictable systems and those designed or used to apply force against people, while restricting other autonomous weapons. International agreement on the precise limits remains unresolved.

The economic consequences of AI automation represent a further ethical dimension. While economists debate the scale and pace of automation-driven job displacement, there is broad agreement that the transition will be disruptive for some sectors and demographics. Workers performing routine cognitive or physical tasks are most exposed; highly skilled professionals and those in creative, interpersonal, or highly variable roles are generally considered less vulnerable. The distributional consequences—who loses and who gains—depend heavily on policy responses, including investment in retraining, the reform of education systems, and the design of social safety nets capable of supporting workers through technological transitions.

In response to these challenges, governments, companies, and international bodies have developed a range of AI ethics frameworks and guidelines. Most converge on a set of core principles: fairness, transparency, accountability, privacy, and human oversight. UNESCO's global recommendation, for example, links these principles to impact assessment, audit, traceability, and access to remedy throughout a system's life cycle. The practical implementation of such principles, however, remains highly variable. Critics note that voluntary industry guidelines lack enforcement mechanisms and that there is a risk of "ethics washing"—the superficial adoption of ethical language without meaningful change in practice. Effective governance therefore requires institutions able to test systems, investigate harm, assign responsibility, and enforce corrective action rather than principles alone.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: The COMPAS algorithm was found to misclassify white defendants as high risk more often than black defendants.\n2. {{2}}: Deep learning AI systems are sometimes described as "black boxes" because their reasoning is difficult to understand.\n3. {{3}}: Under specified GDPR exceptions, safeguards for automated decisions include human intervention and a right to contest the decision.\n4. {{4}}: All major world powers have signed an international treaty banning lethal autonomous weapons.\n5. {{5}}: Workers performing highly routine tasks are considered more vulnerable to automation than those in creative roles.\n6. {{6}}: Most AI ethics frameworks include principles of fairness, transparency, and accountability.\n7. {{7}}: Voluntary industry ethics guidelines currently carry legally binding enforcement mechanisms.`,
          blanks: [
            { num: 1, answers: ['FALSE'] },
            { num: 2, answers: ['TRUE'] },
            { num: 3, answers: ['TRUE'] },
            { num: 4, answers: ['FALSE'] },
            { num: 5, answers: ['TRUE'] },
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
          template: `8. AI systems that learn from historically biased data may {{8}} patterns of discrimination rather than eliminate them.\n9. The COMPAS algorithm was used to inform {{9}} recommendations in parts of the United States.\n10. Lawyers debate the exact scope of any broader right to {{10}} under the GDPR.\n11. Lethal autonomous weapons systems are sometimes abbreviated as {{11}}.\n12. International humanitarian law requires combatants to distinguish between civilians and {{12}} targets.\n13. The adoption of ethical language without genuine change in practice is sometimes described as {{13}}.`,
          blanks: [
            { num: 8, answers: ['perpetuate', 'amplify'] },
            { num: 9, answers: ['sentencing'] },
            { num: 10, answers: ['explanation'] },
            { num: 11, answers: ['LAWS'] },
            { num: 12, answers: ['military'] },
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

A. Tropical rainforests are the most biodiverse terrestrial ecosystems on Earth. Covering approximately six percent of the planet's land surface, they are often estimated to contain more than half of the world's known plant and animal species, while many more remain undescribed. The Amazon basin alone harbours an estimated forty thousand plant species, three thousand freshwater fish species, and over thirteen hundred bird species. These totals are not distributed evenly: a single hectare may contain hundreds of tree species, while specialised organisms can occupy extremely narrow ranges. This extraordinary concentration of life is the product of a long evolutionary history, a relatively stable climate, and an intricate web of ecological relationships that have developed over tens of millions of years.

B. The structure of a tropical rainforest is highly layered. The emergent layer, formed by the tallest trees—some reaching sixty metres or more—juts above the main forest canopy and is exposed to full sunlight, strong winds, and dramatic temperature fluctuations. These giants are inhabited by specialised animals, including harpy eagles, scarlet macaws, and various species of monkey adapted to life high above the ground. Below them, the dense canopy layer captures the vast majority of available sunlight, creating a lush closed environment where most of the forest's animal life resides.

C. The understorey, lying between the canopy and the forest floor, is a region of deep shade and high humidity. Here, plants adapted to low-light conditions—large-leafed shrubs, climbers, and shade-tolerant palms—compete for whatever light filters through the canopy above. The forest floor itself receives as little as two percent of the sunlight that falls on the canopy, yet it is teeming with life: leaf-cutter ants harvesting vegetation, decomposer fungi breaking down fallen organic matter, and an extraordinary variety of invertebrates, amphibians, and small mammals. Warmth and moisture allow decomposition to proceed rapidly, so nutrients released from dead material are quickly taken up by shallow roots. Consequently, much of the ecosystem's fertility is held in living biomass rather than in deep, rich soil.

D. Much of the biological richness of rainforests results from intricate symbiotic relationships between species. The Brazil nut tree provides a striking example: it depends on a specific species of large bee, the orchid bee, for pollination—no other insect is large enough to access the flower. The same tree's seeds are dispersed almost exclusively by agoutis, large rodents equipped with teeth strong enough to crack the tree's extremely tough seed pods. Remove either partner from this relationship and the Brazil nut tree cannot successfully reproduce—a reminder of how profoundly interconnected rainforest species can be.

E. Rainforests also perform vital services for the climate and water systems. Through photosynthesis, tropical forests absorb enormous quantities of carbon dioxide, acting as a major carbon sink. It is estimated that the Amazon rainforest alone stores around eighty to one hundred and twenty billion tonnes of carbon—a store that is being partially released as deforestation continues. Rainforests also drive regional weather patterns: through evapotranspiration, trees release vast quantities of water vapour, which condenses to form clouds and precipitation. Moisture can be recycled repeatedly as air moves across the basin, creating so-called "flying rivers" from the Atlantic coast towards the continental interior. These flows connect forest condition to rainfall far beyond the area where trees are removed and help sustain agriculture in southern Brazil.

F. The threats facing tropical rainforests are severe. The UN Food and Agriculture Organization estimated global deforestation at ten million hectares per year between 2015 and 2020; agricultural expansion was the principal driver, especially in tropical regions. In the Amazon, cattle ranching, crop production, logging, mining, and roads all contribute to pressure on forests. Satellite imagery also reveals degradation by selective logging, fire, and fragmentation—processes that weaken resilience without immediately converting forest to a different land use. Scientists warn that the Amazon may be approaching a "tipping point" at which large-scale dieback becomes self-reinforcing: as the forest shrinks, its capacity to generate its own rainfall diminishes, threatening the survival of what remains.

G. Conservation responses have included the expansion of protected areas, the development of sustainable forestry practices, and payment-for-ecosystem-services schemes that compensate forest-dwelling communities for protecting the forest. Brazil's implementation of the Amazon Fund, financed largely by Norway, was associated with a dramatic reduction in deforestation rates in the 2000s, demonstrating that policy interventions can be effective when properly resourced and enforced. However, political commitment to conservation has fluctuated significantly, and the long-term protection of tropical rainforests ultimately depends on resolving the tension between the economic pressures driving deforestation and the global ecological services these forests provide.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'An example of how the removal of one species can prevent another from reproducing', answer: 'D' },
            { num: 15, stem: 'A description of conditions found in the shaded middle layer of the forest', answer: 'C' },
            { num: 16, stem: 'A reference to a financial scheme that rewarded communities for preserving forest', answer: 'G' },
            { num: 17, stem: 'An account of how forests generate and recycle their own rainfall', answer: 'E' },
            { num: 18, stem: 'A description of the animals found in the uppermost forest layer', answer: 'B' },
            { num: 19, stem: 'A warning about a threshold beyond which forest loss could become irreversible', answer: 'F' },
            { num: 20, stem: 'Statistics about the total number of species found in the Amazon basin', answer: 'A' },
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
          template: `Tropical rainforests contain more than half of all known species despite covering only six percent of {{21}}. The forest is structured in distinct layers; the {{22}} layer, the tallest, is exposed to full sunlight and strong winds. The Brazil nut tree illustrates {{23}} relationships, depending on orchid bees for pollination and agoutis for seed dispersal. The Amazon acts as a massive {{24}}, storing billions of tonnes of carbon. Deforestation, driven partly by cattle {{25}}, destroys millions of hectares annually and may push the Amazon toward a {{26}} that makes large-scale dieback self-reinforcing.`,
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

Money is so fundamental to modern life that it is easy to forget that it is an invention—a social technology developed by human beings to solve the practical problems of exchange. The history of money is, in a sense, the history of a series of solutions to successive problems: how to facilitate trade between strangers, how to store value across time, how to coordinate economic activity at ever-increasing scales.

The popular belief that money evolved from barter has been questioned by economic historians and anthropologists. The barter story—in which communities traded goods directly until the difficulty of finding two people who simultaneously wanted what the other offered prompted the invention of money—is intuitively appealing but largely unsupported as a universal historical sequence. Anthropologist David Graeber argued that systems of mutual credit and social obligation often preceded coin-based economies. People in communities could keep track of debts informally, while rulers and temples recorded obligations in standard units of account. Direct barter certainly occurred, particularly between strangers or when monetary systems failed, but that does not prove that it was the normal starting point from which all money developed.

The earliest physical money appears in the form of commodity money—objects that had value independent of their use as a medium of exchange. Grain, cattle, shells, and cloth have all served this function at various points in human history. Metal coinage is generally traced to the kingdom of Lydia, in present-day western Turkey, around the seventh century BCE. Lydian coins were made from electrum, a naturally occurring alloy of gold and silver, and stamped to certify their weight and composition. Standard pieces reduced the need to weigh and test metal during every transaction. Coinage spread across the ancient world, adopted by Greek city-states, the Persian Empire, and eventually Rome, where taxes and military pay helped integrate it into a vast economy.

Paper money first appeared in China. During the Tang dynasty, merchants used transferable paper instruments often called "flying money" to avoid carrying large quantities of heavy copper coin over long distances. These began as private or official remittance and deposit arrangements rather than a general currency used in every shop. Under the Song dynasty, privately issued notes became more widespread, and the government later took control of issuance. When Marco Polo described Chinese paper money to European readers in the thirteenth century, the idea that paper backed by imperial authority could circulate as money appeared extraordinary. European countries developed banknotes much later; Sweden was the first to issue them in 1661.

The development of central banking in the seventeenth and eighteenth centuries was a further transformation. The Bank of England, founded in 1694, initially issued notes as receipts for deposits; holders could redeem them for coin or gold. Britain did not adopt a formal legal gold standard until the nineteenth century, and convertibility was suspended during several crises. International forms of the gold standard were progressively abandoned during the twentieth century, culminating in the United States ending the dollar's convertibility into gold for foreign monetary authorities in 1971. Major currencies consequently operate as "fiat" money—backed by law, institutions, and public trust rather than a promise to exchange each note for a fixed amount of a commodity. Their stability depends on confidence in the issuing authority, as episodes of hyperinflation demonstrate when that confidence collapses.

The digital revolution has produced new forms of money. Electronic payments, credit cards, and digital wallets have made physical cash increasingly marginal in many economies, although most such payments still transfer claims denominated in conventional national currency. Cryptocurrency, beginning with Bitcoin in 2009, attempted to create digital money outside government and banking systems, relying instead on a decentralised computational network to validate transactions. Cryptocurrencies have attracted both enthusiastic adopters and sceptical economists who question whether assets with sharply changing prices can fulfil the core functions of money—medium of exchange, store of value, and unit of account—well enough to challenge conventional currencies at scale. Stablecoins attempt to reduce volatility by linking their value to another asset, while central bank digital currencies would remain liabilities of a public monetary authority. The technologies may look similar to users, but their issuers, guarantees, and governance differ fundamentally. Their adoption will therefore depend as much on public confidence, regulation, and ease of use as on the underlying code.`,
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
            'It was backed by gold reserves held by the Chinese government and could be exchanged for metal on demand.',
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
          text: 'What does "fiat money" mean, according to the passage?',
          options: [
            'Money that is backed by gold or silver reserves held by a central bank.',
            'Currency whose value is supported by government decree and public trust.',
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
          template: `31. {{31}}: The author describes money as a social technology invented to solve problems of exchange.\n32. {{32}}: Lydian coins were the first coins to be made exclusively from pure gold.\n33. {{33}}: Chinese "flying money" began as merchant remittance and deposit arrangements rather than a general shop currency.\n34. {{34}}: The Bank of England was the first central bank ever established in the world.\n35. {{35}}: The United States formally ended gold convertibility of the dollar in 1971.\n36. {{36}}: The passage suggests that cryptocurrencies have successfully replaced conventional currencies in most economies.`,
          blanks: [
            { num: 31, answers: ['YES'] },
            { num: 32, answers: ['NO'] },
            { num: 33, answers: ['YES'] },
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
          template: `37. Objects with value independent of their use as money, such as grain or shells, are described as {{37}} money.\n38. The earliest metal coins are generally associated with the kingdom of {{38}} in present-day Turkey.\n39. The abandonment of the {{39}} meant that currencies were no longer tied to a physical commodity.\n40. Bitcoin, launched in 2009, relies on a {{40}} network to validate transactions rather than banks or governments.`,
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
          imageAlt: 'Process diagram showing how municipal wastewater is treated and reused',
          stimulus: 'The diagram below illustrates the stages involved in treating municipal wastewater and the ways in which the treated water is subsequently used.',
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
          stimulus: 'Artificial intelligence is increasingly being used to make decisions that significantly affect people\'s lives, such as in hiring, loan applications, and medical diagnosis.',
          text: 'Do you think this is a positive development? What safeguards, if any, should be put in place? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
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
          ],
        },
      ],
    },
  ],
};

export default mock;
