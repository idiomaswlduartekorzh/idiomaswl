import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-11',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 11',
  subtitle: 'Rome\'s Water System · Urban Heat Islands · Cognitive Biases',
  timeMinutes: 164,
  sections: [

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-11.mp3',
      title: 'Listening — Section 1: Booking a Photography Workshop',
      instructions: 'You will hear a conversation between a customer and a photography studio booking agent. Listen and answer Questions 1–10.',
      transcript: `AGENT: Good afternoon, Lakeside Photography. How can I help you?

CUSTOMER: Hi. I'd like to book a place on one of your photography workshops, please.

AGENT: Of course. Can I take your name first?

CUSTOMER: Yes, it's Helen Whitby.

AGENT: Could you spell your surname for me?

CUSTOMER: Certainly — it's W-H-I-T-B-Y.

AGENT: Thank you, Ms Whitby. And your address?

CUSTOMER: It's 42 Redhill Road — that's R-E-D-H-I-L-L.

AGENT: Redhill Road. And the postcode?

CUSTOMER: It's LS9 4RT.

AGENT: And a contact number?

CUSTOMER: My mobile is 078 4421 9075.

AGENT: Lovely. Can I ask how you heard about us?

CUSTOMER: I saw an advert in the newspaper — oh, no, sorry, it was actually a magazine.

AGENT: A magazine, great. Now, we run two workshops at the moment. Would you like to hear about them?

CUSTOMER: Yes, please.

AGENT: The first is our Beginners' Workshop. You'll learn how to control the light — how much of it reaches the camera — and how to compose a good shot. The sessions are held on Saturday morning.

CUSTOMER: That suits me well. I'm always free on Saturdays.

AGENT: The second is the Landscape Workshop. For that one, the group travels out to a nearby lake and spends the whole day there. One thing to note — each student must bring their own tripod, as the light there can be quite low.

CUSTOMER: I've got one of those, so that's fine.

AGENT: Let me give you the prices. The Beginners' Workshop is four sessions of three hours each. It costs £120, and that price includes lunch.

CUSTOMER: And the Landscape one?

AGENT: The Landscape Workshop runs over two sessions of five hours each. That one is £150, and the price includes transport to the lake.

CUSTOMER: Great, I'll think about which to choose and call you back.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Photography Workshop Booking',
          example: 'Name:  Helen Whitby',
          template: `Personal details
Address: 42 {{1}} Road
Postcode: LS9 4RT
Phone: (mobile) 078 4421 9075

Heard about the studio from: a {{2}}

Beginners' Workshop
• learn how to control the {{3}} on a camera
• sessions are held on Saturday {{4}}

Landscape Workshop
• the group travels to a nearby {{5}}
• each student must bring their own {{6}}`,
          blanks: [
            { num: 1, answers: ['Redhill', 'redhill'], maxWords: 1 },
            { num: 2, answers: ['magazine'], maxWords: 1 },
            { num: 3, answers: ['light'], maxWords: 1 },
            { num: 4, answers: ['morning'], maxWords: 1 },
            { num: 5, answers: ['lake'], maxWords: 1 },
            { num: 6, answers: ['tripod'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Workshop', 'Number of sessions', 'Length of each session', 'Price', 'Includes'],
          rows: [
            [
              'Beginners\' Workshop',
              '4',
              '3 hours',
              { num: 7, answers: ['120', '£120'], maxWords: 1 },
              { num: 8, answers: ['lunch'], maxWords: 1 },
            ],
            [
              'Landscape Workshop',
              { num: 9, answers: ['2', 'two'], maxWords: 1 },
              '5 hours',
              '£150',
              { num: 10, answers: ['transport'], maxWords: 1 },
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-11.mp3',
      title: 'Listening — Section 2: Theatre Backstage Tour',
      instructions: 'You will hear a guide giving a backstage tour of a theatre. Listen and answer Questions 11–20.',
      transcript: `Good morning everyone, and welcome to the backstage tour of the Regent Theatre. Before we set off, let me mention the improvements we've made this year. We've installed a completely new lighting system above the stage, which is now fully computer-controlled. We've also refurbished the dressing rooms downstairs, which the actors are delighted with. Now, some of you asked about the main auditorium — I'm afraid we can't alter that, as the building is protected, and the little café by the entrance is exactly as it has always been. The box office hasn't changed either, though we do hope to modernise it next year.

Right, let's begin. The Regent is a medium-sized venue and can seat 900 people. As we walk onto the stage, notice the floor — it's made of pine, a soft wood that has a gentle spring to it, which is kinder to the dancers' feet.

Now look up. That tall space above us is the fly tower. Using a system of ropes and pulleys, the crew can raise and lower the scenery quickly between scenes, so the audience never sees it happening.

Just through this door is the green room. Despite the name, it isn't green — it's simply the comfortable space where the actors relax while they wait to go on.

Next door is the wardrobe department. This is where a small team of skilled staff design and make all the costumes for each production, often by hand.

One important safety feature: in the event of a fire, a heavy safety curtain can be lowered to seal the stage off from the audience. It is tested before every performance.

The large room at the back is the workshop, where the carpenters build the set — everything from walls to furniture.

And finally, our tour ends at the theatre shop, where you can buy posters and other souvenirs from our current show. Do have a look before you leave. Thank you.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO parts of the theatre have recently been improved?',
          options: [
            { letter: 'A', text: 'the lighting system' },
            { letter: 'B', text: 'the main auditorium' },
            { letter: 'C', text: 'the café' },
            { letter: 'D', text: 'the dressing rooms' },
            { letter: 'E', text: 'the box office' },
          ],
          selectCount: 2,
          answers: ['A', 'D'],
        },
        {
          type: 'formgroup',
          id: 'l2-form',
          part: 2,
          qRange: [13, 20],
          groupLabel: 'Complete the notes below.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          title: 'Backstage Tour of the Regent Theatre',
          template: `• The theatre can seat {{13}} people.
• The stage floor is made of {{14}}.
• The fly tower is used to raise and lower the {{15}}.
• The green room is where the actors {{16}}.
• The wardrobe department makes all the {{17}}.
• A heavy {{18}} can be lowered in case of fire.
• The set is built in the {{19}}.
• The shop sells {{20}} from the current show.`,
          blanks: [
            { num: 13, answers: ['900'], maxWords: 1 },
            { num: 14, answers: ['pine'], maxWords: 1 },
            { num: 15, answers: ['scenery'], maxWords: 1 },
            { num: 16, answers: ['relax', 'wait'], maxWords: 1 },
            { num: 17, answers: ['costumes', 'costume'], maxWords: 1 },
            { num: 18, answers: ['safety curtain', 'curtain', 'iron curtain'], maxWords: 2 },
            { num: 19, answers: ['workshop'], maxWords: 1 },
            { num: 20, answers: ['posters', 'poster', 'souvenirs'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-11.mp3',
      title: 'Listening — Section 3: Environmental Essay Review',
      instructions: 'You will hear a tutor and a student discussing the student\'s environmental essay. Listen and answer Questions 21–30.',
      transcript: `TUTOR: Come in, Maria. I've read your essay on reducing plastic waste. Let's talk it through.

STUDENT: Thanks. I was a bit unsure whether my argument came across clearly.

TUTOR: Well, your central claim is that individual action alone isn't enough — that governments and manufacturers have to take the lead. That came through very strongly.

STUDENT: Good, because that was the point I most wanted to make.

TUTOR: And the writing itself is clear and well organised. What impressed me most, though, was your use of real examples — the case study of the deposit-return scheme in Germany was excellent.

STUDENT: I found that really interesting to research.

TUTOR: Now, there is one weakness. Some of your statistics are quite old — a few of your sources date back to 2009. For a topic that moves this fast, you really need more recent data.

STUDENT: I did wonder about that. I found the older studies easier to access.

TUTOR: I understand, but do update them. Also, I'd suggest reorganising the middle section. At the moment you present all the problems and then all the solutions. It would be stronger to pair each problem with its solution as you go.

STUDENT: That makes sense. It would flow better.

TUTOR: Exactly. One more thing — your conclusion is a little short. You introduce an interesting idea about consumer behaviour right at the end, but you don't develop it. I'd move that into the main body.

STUDENT: I'll do that. What about the length overall?

TUTOR: The length is fine. Now, in terms of what to do next. First, you need to strengthen the evidence, so find some newer figures. Second, I'd like you to add a diagram showing how much plastic is recycled — a visual really helps the reader. Then check your referencing, because a couple of citations are missing a date. After that, read the whole thing aloud to catch any awkward sentences. And finally, send me the revised draft by email so I can look at it again before you submit.

STUDENT: Thank you, that's really helpful.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'What is the main argument of Maria\'s essay?',
          options: [
            'Individual action alone is not enough to solve plastic waste.',
            'Recycling schemes are too expensive for most governments.',
            'Consumers are mainly to blame for plastic pollution.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'What does the tutor say impressed him most about the essay?',
          options: [
            'the clarity of the writing',
            'the use of real examples',
            'the length of the essay',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'What weakness does the tutor identify?',
          options: [
            'Some of the statistics are out of date.',
            'The main argument is hard to follow.',
            'There are too few examples.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'What does the tutor suggest about the middle section?',
          options: [
            'It should be made considerably shorter.',
            'Each problem should be paired with its solution.',
            'It should contain more statistics.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'What does the tutor say about the conclusion?',
          options: [
            'It simply repeats points from the introduction.',
            'It contains an idea that belongs in the main body.',
            'It is the strongest part of the essay.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `Maria's revised essay — things to do
• Find some more recent {{26}} to strengthen the evidence.
• Add a {{27}} showing how much plastic is recycled.
• Check the {{28}}, as a few entries are missing dates.
• Read the whole essay {{29}} to catch awkward sentences.
• Send the revised draft to the tutor by {{30}}.`,
          blanks: [
            { num: 26, answers: ['figures', 'data'], maxWords: 1 },
            { num: 27, answers: ['diagram'], maxWords: 1 },
            { num: 28, answers: ['referencing', 'citations'], maxWords: 1 },
            { num: 29, answers: ['aloud'], maxWords: 1 },
            { num: 30, answers: ['email'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-11.mp3',
      title: 'Listening — Section 4: The Roman Aqueducts',
      instructions: 'You will hear a lecture about Roman aqueducts. Listen and answer Questions 31–40.',
      transcript: `Today I'd like to look at one of the great engineering achievements of the ancient world: the Roman aqueduct. Contrary to popular belief, most of an aqueduct's length ran not on those famous arches but underground, hidden beneath the ground. The tall arches we admire today were used only where the water had to cross a valley.

The whole system depended on a single, simple force: gravity. Because there were no pumps, the channel had to slope gently downhill for its entire length, sometimes for many kilometres. If the slope was too steep, the water moved too fast and damaged the channel; if it was too shallow, the water stopped moving and turned stagnant.

To measure these tiny gradients, surveyors used a long wooden instrument, filled with water, that acted as a level. Getting the measurement wrong by even a fraction could ruin the whole project.

The water channel itself was usually lined with a special waterproof cement to prevent leaks and to keep the supply clean. When the water finally reached the city, it was collected in a large tank and shared out. The most important users, receiving water first, were the public fountains and baths, where ordinary people came to wash and to collect drinking water.

Maintaining the aqueducts was a constant task. A serious problem was the build-up of lime, a hard mineral deposit left by the water, which gradually narrowed the channel and had to be chipped away by hand.

The official placed in overall charge of the entire water supply held the important title of curator, a highly respected public office.

Eventually the system declined. In times of war, an enemy could force a city to surrender simply by cutting off its supply. And once the central government grew too weak to pay for repairs, the aqueducts slowly fell into ruin. It was not until the Renaissance that engineers in Rome began to restore them, more than a thousand years later.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'THE ROMAN AQUEDUCTS',
          template: `How the aqueducts worked

• Most of an aqueduct ran underground, beneath the {{31}}.
• The system relied entirely on the force of {{32}}.
• If the channel's slope was too shallow, the water turned {{33}}.
• Surveyors measured the gradient using an instrument that acted as a {{34}}.

Construction and use

• The channel was lined with waterproof {{35}} to prevent leaks.
• When water reached the city, it went first to the public {{36}} and baths.
• Channels became blocked by deposits of {{37}} and had to be cleaned.

People and decline

• The official in charge of the water supply was called the {{38}}.
• In wartime, an enemy could cut off a city's {{39}} to force surrender.
• The aqueducts were not repaired until the {{40}}.`,
          blanks: [
            { num: 31, answers: ['ground'], maxWords: 1 },
            { num: 32, answers: ['gravity'], maxWords: 1 },
            { num: 33, answers: ['stagnant'], maxWords: 1 },
            { num: 34, answers: ['level'], maxWords: 1 },
            { num: 35, answers: ['cement'], maxWords: 1 },
            { num: 36, answers: ['fountains', 'fountain'], maxWords: 1 },
            { num: 37, answers: ['lime', 'limescale'], maxWords: 1 },
            { num: 38, answers: ['curator'], maxWords: 1 },
            { num: 39, answers: ['supply'], maxWords: 1 },
            { num: 40, answers: ['Renaissance'], maxWords: 1 },
          ],
        },
      ],
    },

    // ─── READING ──────────────────────────────────────────────────────────────

    {
      part: 5,
      skill: 'reading',
      title: 'Reading — Passage 1: Engineering Water in Ancient Rome',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `Engineering Water in Ancient Rome

The Roman Empire's capacity to supply clean water to its cities was, by ancient standards, an extraordinary feat of engineering. At its peak, Rome's water system delivered an estimated one million cubic metres of water daily to a city of around one million inhabitants—a figure that rivals the per capita supply of many modern cities. This achievement rested on an interlocking network of aqueducts, pipes, cisterns, and fountains whose construction and maintenance demanded both technical expertise and substantial political will.

The earliest Roman aqueduct, the Aqua Appia, was built in 312 BCE during the censorship of Appius Claudius Caecus. It ran almost entirely underground, a precaution against both enemy attack and evaporation. Over the following five centuries, ten further aqueducts were constructed, eventually supplying water from sources up to ninety kilometres away. The most celebrated, the Aqua Claudia and the Anio Novus, were completed under the Emperor Claudius in 52 CE. These structures stretched for over sixty kilometres and carried water across dramatic valleys on soaring arcaded bridges, many of which still stand today.

Roman engineers achieved the movement of water through a sophisticated application of gravity. Aqueducts were built with a precisely calculated continuous downward gradient—typically around one in two hundred—ensuring a steady flow without mechanical pumping. Maintaining this gradient over long and varied terrain required skill in surveying and the use of instruments such as the groma and the chorobates, a type of water level. Where valleys interrupted the route, engineers had two options: carry the water across on stone arches, or allow it to descend underground and rise on the far side using an inverted siphon, exploiting the principle that water seeks its own level.

At their destinations, the aqueducts discharged into distribution tanks called castella aquae. From these, lead and terracotta pipes carried water to the city's three principal consumers: public fountains and baths, which had the highest priority; private houses; and finally the emperor's palace. Poorer citizens collected water from the fountains, which ran continuously—the overflow from upper-level basins cascading into lower ones before flowing into the sewers. Wealthier households paid for a direct connection, and the government occasionally granted private access as a political favour.

The city's engineers were also responsible for waste removal. The Cloaca Maxima, one of the world's earliest large-scale sewage systems, was originally constructed in the sixth century BCE to drain the marshy valley between Rome's hills. It was later extended and enclosed, channelling sewage from the public latrines and baths directly into the Tiber. Roman latrines were communal, multi-seater facilities supplied with running water; personal privacy was not a cultural expectation. The entire water infrastructure was overseen by a dedicated official known as the curator aquarum, a post created by Augustus in 11 BCE and held at various times by notable figures including the author Sextus Julius Frontinus, who wrote an invaluable technical treatise on the system.

The eventual decline of Rome's water supply was less a story of engineering failure than of political collapse. As central authority weakened during the third and fourth centuries CE, maintenance became increasingly difficult. Invading armies cut or damaged aqueducts deliberately, knowing that disrupting water supply would hasten surrender. By the sixth century, only a fraction of the aqueducts remained operational, and Rome's population had fallen to perhaps thirty thousand. The infrastructure was not meaningfully restored until the Renaissance, when popes began rebuilding aqueducts to supply the growing city and, less nobly, to power the elaborate fountain displays that became symbols of papal prestige.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: The Aqua Appia was built above ground for most of its length.\n2. {{2}}: The Aqua Claudia and Anio Novus were built during the reign of Emperor Claudius.\n3. {{3}}: Roman aqueducts used mechanical pumps to maintain water flow.\n4. {{4}}: The castella aquae supplied water to public fountains before private homes.\n5. {{5}}: All Roman citizens, regardless of wealth, had access to private water connections.\n6. {{6}}: The Cloaca Maxima was originally designed to drain marshland.\n7. {{7}}: The post of curator aquarum was created during the reign of Augustus.`,
          blanks: [
            { num: 1, answers: ['FALSE'] },
            { num: 2, answers: ['TRUE'] },
            { num: 3, answers: ['FALSE'] },
            { num: 4, answers: ['TRUE'] },
            { num: 5, answers: ['FALSE'] },
            { num: 6, answers: ['TRUE'] },
            { num: 7, answers: ['TRUE'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r1-sent',
          part: 5,
          qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `8. Roman engineers used instruments such as the groma and the {{8}} to survey terrain accurately.\n9. An {{9}} allowed water to descend into a valley and rise on the other side using water pressure.\n10. Public fountains had the {{10}} priority in the distribution of Rome's water supply.\n11. The {{11}} was one of the world's earliest large-scale sewage systems.\n12. The curator aquarum was an official responsible for overseeing Rome's entire {{12}}.\n13. Rome's aqueducts were deliberately damaged by {{13}} who understood that cutting the water supply would weaken the city.`,
          blanks: [
            { num: 8, answers: ['chorobates'] },
            { num: 9, answers: ['inverted siphon'] },
            { num: 10, answers: ['highest'] },
            { num: 11, answers: ['Cloaca Maxima'] },
            { num: 12, answers: ['water infrastructure'] },
            { num: 13, answers: ['invading armies'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: The Urban Heat Island Effect',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `The Urban Heat Island Effect

A. Cities are measurably warmer than the rural areas that surround them. This phenomenon, known as the urban heat island (UHI) effect, was first documented systematically by the English chemist Luke Howard in the early nineteenth century, who observed that London's city centre was consistently warmer than the countryside around it. Today, the temperature difference between a large city and its rural surroundings can exceed ten degrees Celsius on calm, clear nights, with profound consequences for public health, energy consumption, and environmental quality.

B. The UHI effect is driven by a combination of factors, most of which are direct consequences of urbanisation itself. Buildings, roads, and other impervious surfaces absorb solar radiation during the day and release it as heat at night, whereas vegetation—which is scarce in most city centres—reflects sunlight and cools surfaces through evapotranspiration. Concrete and asphalt have a significantly higher heat capacity and lower albedo than the soil and plant matter they replace. In addition, cities produce enormous quantities of "waste heat" from vehicles, air conditioning units, industrial processes, and human bodies.

C. The health consequences of elevated urban temperatures are well established. During heat waves, cities experience disproportionately high mortality rates relative to rural areas. The European heat wave of 2003 killed an estimated seventy thousand people across the continent, with the elderly and those without access to air conditioning at greatest risk. Urban heat is also associated with increased levels of ground-level ozone, which forms when sunlight reacts with pollutants—a process accelerated by higher temperatures. Ozone causes respiratory irritation and is linked to long-term lung damage and increased rates of asthma, particularly in children.

D. The economic costs are equally significant. Higher temperatures drive up demand for air conditioning, increasing electricity consumption and placing strain on power grids during peak periods. A study in Los Angeles found that each additional degree Celsius of urban warming increased peak electricity demand by approximately two percent. This cycle reinforces the UHI effect itself: as buildings consume more energy to cool their interiors, they discharge more heat into the surrounding streets. The additional burden on power infrastructure also raises the risk of blackouts during extreme heat events.

E. Urban planners and researchers have identified several strategies to reduce the UHI effect. Increasing the proportion of green space—through parks, street trees, and green roofs—can lower surface temperatures significantly. Trees are particularly effective: a mature street tree can reduce the ambient temperature of its immediate surroundings by several degrees through shading and evapotranspiration. Studies in cities from Singapore to Phoenix have demonstrated that well-designed parks create measurable "cool islands" that extend beyond their physical boundaries. Cool pavements and reflective roofing materials, which reflect rather than absorb solar radiation, offer additional benefits.

F. Water features also play a role that is frequently underestimated. Fountains, ponds, and water channels cool the air through evaporation, and several cities—including Medellín in Colombia and Seville in Spain—have incorporated water-based cooling into their heat mitigation strategies. Seville has experimented with deploying misting systems in pedestrian areas during summer months, generating local temperature reductions of up to eight degrees in public spaces. These interventions, while effective, are costly and require ongoing maintenance and water supply, which may be scarce in the drier climates most vulnerable to heat stress.

G. At a systemic level, the most durable solutions involve rethinking the materials and geometry of urban design. Orienting streets to allow prevailing winds to penetrate the city fabric can improve ventilation significantly. Limiting the height and density of buildings in key corridors can reduce the "canyon effect," in which tall buildings trap heat radiating from the street. Long-term, the integration of urban heat island mitigation into planning regulations and building codes represents the most powerful tool available to cities facing a warming future—one in which climate change is expected to intensify the UHI effect by raising baseline temperatures across the globe.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A description of how building orientation can improve airflow through a city', answer: 'G' },
            { num: 15, stem: 'An example of a city using water spray to cool outdoor public spaces', answer: 'F' },
            { num: 16, stem: 'An explanation of why vegetation reduces surface temperatures', answer: 'B' },
            { num: 17, stem: 'Data showing how a rise in temperature affects electricity demand', answer: 'D' },
            { num: 18, stem: 'A reference to the first scientific documentation of the UHI effect', answer: 'A' },
            { num: 19, stem: 'Evidence that the cooling effect of parks extends beyond their edges', answer: 'E' },
            { num: 20, stem: 'A link between high urban temperatures and a specific respiratory condition', answer: 'C' },
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
          title: 'The Urban Heat Island Effect',
          template: `The urban heat island effect occurs because urban surfaces have lower {{21}} than natural vegetation, causing them to absorb and retain more heat. Cities also generate waste heat through vehicles, industrial processes, and {{22}} units. During heat waves, mortality in cities is disproportionately high compared to {{23}} areas. Economically, rising urban temperatures increase demand for {{24}}, putting pressure on power systems. Green strategies include planting street {{25}}, which cool the air through shading and evapotranspiration. Structurally, limiting the {{26}} of buildings in key corridors helps prevent heat from becoming trapped between them.`,
          blanks: [
            { num: 21, answers: ['albedo'] },
            { num: 22, answers: ['air conditioning'] },
            { num: 23, answers: ['rural'] },
            { num: 24, answers: ['air conditioning'] },
            { num: 25, answers: ['trees'] },
            { num: 26, answers: ['height and density', 'height'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: Cognitive Biases and Decision-Making',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `Cognitive Biases and Decision-Making

Human beings like to think of themselves as rational agents: creatures who weigh evidence, consider alternatives, and reach conclusions through careful deliberation. Research in cognitive psychology and behavioural economics over the past half-century has painted a considerably more complicated picture. Our thinking is shaped, often without our awareness, by a range of systematic errors known as cognitive biases—predictable patterns of deviation from logical reasoning that affect individuals across cultures and educational levels.

The concept of cognitive bias was brought to prominence by the Israeli psychologists Daniel Kahneman and Amos Tversky, whose series of experiments in the 1970s and 1980s demonstrated that human judgement is reliably distorted in ways that can be mapped and predicted. Their work laid the foundation for what Kahneman later called the dual-process theory of mind: the idea that human cognition operates through two parallel systems. System 1 is fast, intuitive, and automatic—it processes information rapidly and generates feelings, impressions, and gut reactions. System 2 is slow, deliberate, and analytical—it handles complex calculations, evaluates arguments, and applies rules. The problem is that System 2 is cognitively expensive, and we default to System 1 far more often than we realise.

One of the most widely studied biases is confirmation bias: the tendency to search for, interpret, and recall information in a way that confirms one's pre-existing beliefs. Studies consistently show that people evaluate identical evidence more favourably when it supports their views and more critically when it contradicts them. This asymmetry has significant consequences in contexts ranging from medical diagnosis—where clinicians may too readily accept initial assessments—to political belief, where exposure to contradictory information can, paradoxically, entrench rather than revise opinion.

The anchoring effect describes the tendency for an initial piece of information to disproportionately influence subsequent judgements. In one famous experiment, subjects were asked to spin a wheel that was rigged to stop at either ten or sixty-five, then estimate what percentage of African countries belonged to the United Nations. Those who spun a high number gave systematically higher estimates than those who had spun a low number—despite the complete irrelevance of the spin. Anchoring influences price negotiations, legal sentences, and medical prognoses, often with substantial real-world consequences.

A third bias—availability heuristic—leads people to judge the likelihood of events based on how easily examples come to mind. Events that are dramatic, recent, or frequently covered in media are perceived as more probable than quieter, more common events. After a well-publicised plane crash, fear of flying spikes even as driving—statistically more dangerous—does not attract comparable anxiety. Conversely, slow-developing risks such as poor diet or sedentary behaviour, which cause the majority of premature deaths, may be chronically underestimated precisely because they generate no memorable events.

Not all researchers accept that biases are as universal or as harmful as the standard account implies. Gerd Gigerenzer, a German psychologist, has argued that many so-called biases are actually ecological rationality in action: heuristics that perform well in the environments in which they evolved. A doctor who relies on a simple decision rule—such as admitting all patients with two or more risk factors—may outperform a statistical algorithm that weighs hundreds of variables, precisely because the simpler rule avoids overfitting to noisy data. Gigerenzer's view is that the bias literature too often tests human reasoning against an inappropriate standard of formal logic and ignores the practical value of fast and frugal thinking.

The applied implications of cognitive bias research have been extensive. In public policy, the concept of "nudging"—designing the context of choice to encourage better decisions without restricting options—draws directly on bias research. Automatic enrolment in pension schemes, calorie labelling on menus, and the placement of healthier foods at eye level in canteens all exploit known biases to promote desired outcomes. In medicine, checklists and structured protocols are designed partly to reduce the impact of availability and confirmation biases on clinical judgement. In law, courts in several jurisdictions have begun considering research on eyewitness reliability and the conditions under which false memories are likely to form. The recognition that human reason is imperfect need not lead to pessimism; rather, it opens the door to the deliberate design of environments that account for—and to some extent compensate for—our cognitive limitations.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'According to the passage, what is the main difference between System 1 and System 2 thinking?',
          options: [
            'System 1 is used mainly for mathematical calculations, while System 2 handles emotional responses.',
            'System 1 is rapid and automatic, while System 2 is slower and more deliberate.',
            'System 2 is faster but less accurate than System 1.',
            'System 1 is the dominant system used in complex, high-stakes decisions.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'What does the anchoring experiment with the spinning wheel demonstrate?',
          options: [
            'People are unable to estimate statistical information accurately.',
            'An irrelevant initial number can significantly distort later numerical judgements.',
            'High numbers always produce more accurate estimates than low numbers.',
            'Anchoring bias only applies to tasks involving geography.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'How does the availability heuristic explain people\'s responses to aeroplane crashes?',
          options: [
            'People accurately reassess the risk of flying after hearing of a crash.',
            'The drama of crashes makes flying seem more dangerous than driving, despite the statistics.',
            'People increase their fear of driving after hearing about aviation accidents.',
            'The heuristic causes people to underestimate all forms of transport risk.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'What is Gigerenzer\'s main argument about cognitive biases?',
          options: [
            'Biases are entirely harmful and should always be corrected.',
            'Simple rules can sometimes be more effective than complex analytical approaches.',
            'The dual-process theory of mind is scientifically invalid.',
            'Biases only affect people without formal education.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: Kahneman and Tversky conducted their key experiments in the United States.\n32. {{32}}: Confirmation bias can cause people to become more entrenched in their beliefs when exposed to opposing evidence.\n33. {{33}}: Cognitive biases are more common in people with lower levels of formal education.\n34. {{34}}: Gigerenzer argues that simple decision rules can outperform complex statistical models in some situations.\n35. {{35}}: The nudging approach to policy design has been proven to eliminate cognitive biases.\n36. {{36}}: Research on cognitive bias has influenced legal proceedings in some countries.`,
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
          template: `37. The tendency to interpret evidence in favour of existing beliefs is known as {{37}} bias.\n38. Gigerenzer uses the phrase {{38}} to describe efficient, practical thinking adapted to real-world conditions.\n39. "{{39}}" is a policy design approach that uses knowledge of biases to encourage beneficial choices.\n40. In hospitals, the use of {{40}} and structured protocols helps reduce the influence of biases on clinical decisions.`,
          blanks: [
            { num: 37, answers: ['confirmation'] },
            { num: 38, answers: ['ecological rationality'] },
            { num: 39, answers: ['nudging'] },
            { num: 40, answers: ['checklists'] },
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
          imageUrl: '/assets/ielts/charts/set11-task1.svg',
          imageAlt: 'Bar chart comparing average daily water consumption per capita in four cities in 2010 and 2023',
          stimulus: 'The bar chart below shows the average daily water consumption per capita (in litres) in four cities in 2010 and 2023.',
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
          stimulus: 'Many cities around the world are experiencing the effects of rapid urbanisation, including traffic congestion, air pollution, and lack of green space.',
          text: 'What measures can city governments take to make urban areas more sustainable and liveable? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
          minWords: 250,
        },
      ],
    },

    // ─── SPEAKING ─────────────────────────────────────────────────────────────

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
          text: 'Part 1 — Personal questions about your city or town',
          followUp: [
            'Describe the town or city where you grew up or currently live.',
            'What do you like most about living there?',
            'How has your city or neighbourhood changed in recent years?',
            'Do you think cities today are becoming better or worse places to live? Why?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a decision you made that turned out to be a mistake.\n\nYou should say:\n• what the decision was\n• why you made it at the time\n• what happened as a result\n• and explain what you learned from the experience`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Urban planning and human behaviour',
          followUp: [
            'Do you think people who live in large cities are more stressed than those in rural areas? Why?',
            'How can urban design influence the behaviour and wellbeing of residents?',
            'Should governments have more control over how cities develop, or should market forces decide?',
            'What role can technology play in making cities more efficient and sustainable?',
          ],
        },
      ],
    },
  ],
};

export default mock;
