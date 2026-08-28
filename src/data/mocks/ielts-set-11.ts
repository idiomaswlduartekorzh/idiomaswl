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

CUSTOMER: Yes, but first, are the sessions suitable for somebody who uses a hearing aid?

AGENT: They are. The indoor room has an induction loop, written demonstrations and a screen showing the camera controls. Tell the tutor privately if another adjustment would help. We record that information only for delivering the course, not for advertising.

CUSTOMER: Good. I have a mirrorless camera, but it is an older model.

AGENT: That's fine. The teaching is about exposure and composition rather than one brand. Bring a charged battery and an empty memory card. We lend a camera only when equipment fails during a session; it is not part of the booking.

CUSTOMER: Yes, please.

AGENT: The first is our Beginners' Workshop. You'll learn how to control the light — how much of it reaches the camera — and how to compose a good shot. The sessions are held on Saturday morning.

CUSTOMER: That suits me well. I'm always free on Saturdays.

AGENT: The second is the Landscape Workshop. For that one, the group travels out to a nearby lake and spends the whole day there. One thing to note — each student must bring their own tripod, as the light there can be quite low.

CUSTOMER: I've got one of those, so that's fine.

AGENT: The outdoor day involves about three kilometres of walking on an uneven path. We choose positions with step-free alternatives, although the lakeside ground can be muddy. If severe weather makes the location unsafe, we move the practical work to the following Sunday; light rain by itself does not cancel it.

CUSTOMER: Would I need specialist lenses?

AGENT: No. A standard lens is sufficient. The tutor may demonstrate filters, but nobody is expected to buy extra equipment. Participants can photograph the landscape and buildings. If a person is recognisable, ask permission before making them the main subject, and do not enter private land for a better angle.

AGENT: Let me give you the prices. The Beginners' Workshop is four sessions of three hours each. It costs £120, and that price includes lunch.

CUSTOMER: And the Landscape one?

AGENT: The Landscape Workshop runs over two sessions of five hours each. That one is £150, and the price includes transport to the lake.

CUSTOMER: When is payment due, and what happens if I have to cancel?

AGENT: We take a small deposit when you confirm and the balance seven days before the first class. You can transfer to another date without a fee up to a week beforehand. Later changes depend on whether we can fill the place. If the studio cancels, you can choose a full refund or another course.

CUSTOMER: That is clear. I'll compare the dates and call you back rather than paying through a link in an unsolicited message.

AGENT: Sensible. Use the number on our website and quote your name; we never request a card PIN.`,
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

Please remain with the group. Backstage routes change while scenery is being moved, so a door that was safe ten minutes ago may no longer be part of our tour. Keep drinks in your bag, do not cross a taped line and ask before taking a photograph. Performers and crew may be preparing for this evening and are not exhibits. A step-free route reaches the same principal spaces by a different corridor; I will show its users where we rejoin.

Right, let's begin. The Regent is a medium-sized venue and can seat 900 people. As we walk onto the stage, notice the floor — it's made of pine, a soft wood that has a gentle spring to it, which is kinder to the dancers' feet.

The surface is inspected frequently for splinters, loose fixings and moisture. Marks you can see are temporary positions for this production, not damage. During a changeover, teams work to a plan agreed in advance; speed never removes the obligation to confirm that an area is clear.

Now look up. That tall space above us is the fly tower. Using a system of ropes and pulleys, the crew can raise and lower the scenery quickly between scenes, so the audience never sees it happening.

Only trained staff operate that machinery. Every suspended item has a recorded load and secondary protection, and verbal calls are repeated so the operator knows they were heard. We will look from the marked viewing point rather than standing beneath a moving piece.

Just through this door is the green room. Despite the name, it isn't green — it's simply the comfortable space where the actors relax while they wait to go on.

Next door is the wardrobe department. This is where a small team of skilled staff design and make all the costumes for each production, often by hand.

They also alter, label, clean and repair garments through the run. Reuse is common, but a historical style on stage is an interpretation rather than proof of exactly what every person wore. Materials must work under hot lights, permit movement and be changed quickly without confusing one performer's items with another's.

One important safety feature: in the event of a fire, a heavy safety curtain can be lowered to seal the stage off from the audience. It is tested before every performance.

The large room at the back is the workshop, where the carpenters build the set — everything from walls to furniture.

Many pieces are designed to look solid from the auditorium while remaining light enough to move. Paints and adhesives are assessed for ventilation and fire performance. Offcuts are sorted for reuse where practical, and measurements are checked against doorways before a finished object reaches the stage.

And finally, our tour ends at the theatre shop, where you can buy posters and other souvenirs from our current show. Purchases are optional; the exit and accessible toilet are beside the shop, and the guide desk can provide route notes in large print. Do have a look before you leave. Thank you.`,
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
            { num: 17, answers: ['costumes'], maxWords: 1 },
            { num: 18, answers: ['safety curtain', 'curtain'], maxWords: 2 },
            { num: 19, answers: ['workshop'], maxWords: 1 },
            { num: 20, answers: ['posters', 'souvenirs'], maxWords: 1 },
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

STUDENT: Should I replace every older study?

TUTOR: No. A foundational study may still explain a method or historical change. What matters is whether the claim is time-sensitive. A current collection rate needs a current source; the date a policy began does not change. Record the jurisdiction, measurement and denominator as well as the year. “Plastic recycled” could mean material collected, sorted, reprocessed or used in a new product.

STUDENT: The German example uses the return rate for eligible drink containers. I should not present it as the share of all packaging.

TUTOR: Exactly. Also separate correlation from attribution. A rate may rise after a scheme begins while other rules, prices and public campaigns change too. Compare like periods and acknowledge what your evidence cannot establish.

STUDENT: For the visual, could I copy a chart from the report?

TUTOR: Better to make your own from the cited table, if its licence permits reuse of the numbers. Give the unit, source and any exclusions. Use patterns or direct labels rather than colour alone, and describe the main result in the prose so a reader does not need to see it.

STUDENT: And I should remove the new claim from the conclusion rather than merely repeat it there.

TUTOR: Yes. A conclusion synthesises the supported argument; it should not surprise the reader with fresh evidence. When you revise, keep your original claim qualified: individual choices matter, but their effect depends on the systems manufacturers and governments provide.

STUDENT: Thank you, that's really helpful. I'll keep a change log so I can explain each revision rather than just polishing the wording.`,
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

“Aqueduct” names the complete route, not merely a bridge. Covered channels protected the flow from debris and accidental damage, while inspection shafts allowed access. Routes followed terrain rather than a straight line. The surviving masonry can dominate photographs precisely because buried sections are harder to see, so visibility is a poor guide to their proportion.

The whole system depended on a single force: gravity. Because there were no pumps along the ordinary channel, it had to slope gently downhill for its entire length, sometimes for many kilometres. If the slope was too steep, the water moved too fast and damaged the channel; if it was too shallow, the water stopped moving and turned stagnant.

Actual gradients varied with the route, and engineers managed changes through settling basins, drops and pressure pipes. “No pumps” does not mean the design was simple. A survey error accumulated over distance, while too much speed could scour a surface and too little could encourage sediment. Builders balanced flow, construction effort and the elevation needed at the destination.

To measure these tiny gradients, surveyors used a long wooden instrument, filled with water, that acted as a level. Getting the measurement wrong by even a fraction could ruin the whole project. The Roman author Vitruvius described the chorobates, although historians should not assume that one written instrument was used identically everywhere. Archaeological slopes, surviving texts and experimental reconstruction provide different evidence. A completed route shows repeated checking, not a single perfect reading.

The water channel itself was usually lined with a special waterproof cement to prevent leaks and to keep the supply clean. When the water finally reached the city, it was collected in a large tank and shared out. The most important users, receiving water first, were the public fountains and baths, where ordinary people came to wash and to collect drinking water.

Clean here is relative to ancient practice, not a claim that the flow met modern microbiological standards. Sources differed in taste and quality, and water could be diverted lawfully or illegally. Distribution tanks, local pipes, storage and overflow made the network more complex than one tank serving users in a fixed order. Public access was vital, but evidence for allocation must be tied to period and source.

Maintaining the aqueducts was a constant task. A serious problem was the build-up of lime, a hard mineral deposit left by the water, which gradually narrowed the channel and had to be chipped away by hand.

The official placed in overall charge of the entire water supply held the important title of curator, a highly respected public office.

Frontinus, who held that office in the late first century CE, documented measurements, legal rights and unauthorised diversions. His account is invaluable but represents an administrator's perspective, not a complete description of every neighbourhood or century.

Eventually the system declined. In times of war, an enemy could force a city to surrender simply by cutting off its supply. And once the central government grew too weak to pay for repairs, the aqueducts slowly fell into ruin. Decline was uneven: wells, the river and some channels continued to serve people, while structures were damaged, abandoned or reused at different dates. It was not until the Renaissance that engineers in Rome began to restore major long-distance routes, more than a thousand years later.`,
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
            { num: 36, answers: ['fountains'], maxWords: 1 },
            { num: 37, answers: ['lime'], maxWords: 1 },
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

Rome's capacity to move spring water across difficult terrain was, by ancient standards, an extraordinary feat. A frequently repeated estimate gives the imperial system a nominal capacity near one million cubic metres a day, but leakage, unauthorised diversion, measurement assumptions and an uncertain population make a modern per-capita comparison unreliable. Water quality also varied by source and route, so “aqueduct water” was not one uniform product. The achievement rested on an interlocking network of catchments, channels, bridges, pressure pipes, settling tanks, local distribution and fountains. Construction mattered, but continuing inspection, legal administration and paid labour kept a route useful.

The earliest Roman aqueduct, the Aqua Appia, was built in 312 BCE during the censorship of Appius Claudius Caecus. It ran almost entirely underground. Security may have been an advantage, but terrain, construction and protection from contamination also matter; one surviving fact does not prove a single intention. Over the following five centuries, ten further aqueducts were constructed. The Aqua Claudia and Anio Novus were completed under Emperor Claudius in 52 CE. Their routes extended for many kilometres, yet arches formed only visible portions where elevation had to be maintained across low ground.

Roman engineers moved water chiefly through gravity. A channel required a controlled net fall, but gradients varied rather than following one universal ratio. Surveying and repeated checks were needed over changing terrain. Vitruvius described instruments including the chorobates, a water level; the groma was better suited to alignment than fine levelling. Where a valley interrupted a route, builders might maintain height on arches or use an inverted siphon, sending water down and up through sealed pressure pipes. The latter imposed substantial pressure and demanded strong joints; it was not simply an open channel in which water happened to seek its own level.

At destinations, some routes discharged through distribution structures often called castella aquae, although archaeologists debate how uniformly a textbook tank model applied across Rome. Lead and terracotta pipes served public basins, baths, imperial properties and authorised private connections. Public fountains provided access for households without a pipe, while continuous overflow could flush drains. Frontinus listed allocations and complained about illegal taps, but his administrative categories do not establish one fixed priority order for every district and period. A private connection depended on permission and resources; it was not available to all citizens on equal terms.

Reconstructing performance requires several kinds of evidence. A written capacity may describe a legal allocation rather than water actually delivered. Mineral deposits can preserve sequences of flow and repair, while an excavated pipe shows only one location and phase. Modern hydraulic models help test whether a proposed route could work, but their inputs must not be mistaken for observations. Even familiar labels are translations: a Latin term may cover structures that do not fit one modern category. Good estimates therefore publish ranges and assumptions instead of converting every uncertain quantity into a precise daily total.

Water supply and drainage were connected but not one modern sanitary network. The Cloaca Maxima began as drainage for a low, wet valley and was later enclosed and incorporated into a larger system carrying runoff and waste toward the Tiber. Communal latrines demonstrate one public practice, not the absence of privacy throughout Roman culture. The water infrastructure was overseen by officials including the curator aquarum, an office established under Augustus. Sextus Julius Frontinus held it and wrote a technical-administrative account whose figures and complaints remain invaluable while still reflecting one author's purpose.

The network's contraction was not one sudden engineering failure. Population, funding and administration changed; routes were repaired, abandoned, reused or deliberately cut at different moments. During the Gothic siege of 537 CE, attackers damaged aqueducts, but residents also relied on wells and the Tiber. Exact population estimates are uncertain. Medieval Rome did not simply wait without water until the Renaissance: local sources and some ancient works continued in altered forms. From the late fifteenth century, papal projects restored major long-distance supplies, supporting households, institutions and prominent fountains. Survival therefore depended as much on governance and maintenance as on the original masonry.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: The Aqua Appia was built above ground for most of its length.\n2. {{2}}: The Aqua Claudia and Anio Novus were completed under Emperor Claudius.\n3. {{3}}: Roman aqueduct channels depended mainly on mechanical pumping.\n4. {{4}}: Archaeologists agree that one standard distribution-tank design was used throughout Rome.\n5. {{5}}: All Roman citizens, regardless of wealth, had access to private water connections.\n6. {{6}}: The Cloaca Maxima began as drainage for low, wet land.\n7. {{7}}: The post of curator aquarum was established under Augustus.`,
          blanks: [
            { num: 1, answers: ['FALSE'] },
            { num: 2, answers: ['TRUE'] },
            { num: 3, answers: ['FALSE'] },
            { num: 4, answers: ['FALSE'] },
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
          template: `8. Vitruvius described the {{8}}, an instrument that used water for levelling.\n9. An {{9}} carried water down and up through sealed pressure pipes.\n10. Frontinus complained about unauthorised connections known as illegal {{10}}.\n11. The {{11}} began as drainage for a low, wet valley.\n12. The curator aquarum was an official responsible for overseeing Rome's {{12}}.\n13. During the 537 CE siege, the aqueducts were damaged by {{13}}.`,
          blanks: [
            { num: 8, answers: ['chorobates'] },
            { num: 9, answers: ['inverted siphon'] },
            { num: 10, answers: ['taps'] },
            { num: 11, answers: ['Cloaca Maxima'] },
            { num: 12, answers: ['water infrastructure'] },
            { num: 13, answers: ['attackers'] },
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

B. The UHI effect is driven by interacting changes in surface, moisture, geometry and human activity. Buildings, roads and other impervious surfaces can store solar energy during the day and release it at night, whereas vegetation provides shade and cools through evapotranspiration when water is available. Dark roofing and asphalt often have lower albedo than lighter or vegetated surfaces, but material, colour and weather matter; “concrete” is not one thermal value. Rapid drainage also leaves less water for evaporation. Cities add anthropogenic waste heat from vehicles, air conditioning units and industrial processes. The relative importance of each mechanism changes by neighbourhood, season and time of day.

C. Heat exposure can increase illness and death, but vulnerability is distributed unevenly within a city. Age, health, housing quality, outdoor work, tree cover, income, social isolation and access to cooling all affect risk. An analysis estimated more than seventy thousand excess deaths across Europe during the summer of 2003; an excess-death estimate is not a list of individually certified causes. Heat can also accelerate chemical reactions that form ground-level ozone when precursor pollutants and sunlight are present. Ozone irritates the respiratory system and can worsen asthma. Temperature, pollution and vulnerability should therefore be measured separately even when they interact.

D. The economic costs are equally significant. Higher temperatures drive up demand for air conditioning, increasing electricity consumption and placing strain on power grids during peak periods. A study in Los Angeles found that each additional degree Celsius of urban warming increased peak electricity demand by approximately two percent. This cycle reinforces the UHI effect itself: as buildings consume more energy to cool their interiors, they discharge more heat into the surrounding streets. The additional burden on power infrastructure also raises the risk of blackouts during extreme heat events.

E. Urban planners and researchers have identified several strategies to reduce the UHI effect. Increasing the proportion of green space—through parks, street trees, and green roofs—can lower surface temperatures significantly. Trees are particularly effective: a mature street tree can reduce the ambient temperature of its immediate surroundings by several degrees through shading and evapotranspiration. Studies in cities from Singapore to Phoenix have demonstrated that well-designed parks create measurable "cool islands" that extend beyond their physical boundaries. Cool pavements and reflective roofing materials, which reflect rather than absorb solar radiation, offer additional benefits.

The scale and metric of cooling matter. Shade can greatly reduce the radiant heat felt by a pedestrian even when a standard air thermometer changes little; a satellite measures surface temperature rather than the air people breathe. Parks can create cool islands beyond their boundaries, but distance and timing vary. Trees also need soil volume, water and years of care. If investment goes only to already leafy districts, a citywide average can improve while the most exposed residents receive no benefit. Heat mapping should therefore be paired with demographic and street-level evidence.

F. Water features can cool surfaces or nearby air through evaporation, and cities including Seville have tested misting in selected pedestrian spaces. A large local reduction reported for a shaded demonstration cannot be treated as an eight-degree fall across a city; sensor position, humidity, wind and the comparison baseline matter. Benefits must also be weighed against energy, maintenance, hygiene and water demand. In dry places facing scarcity, potable water may be a poor choice. Recycled water, timed operation and monitoring can change that judgement, but a visually attractive fountain is not automatically an equitable heat policy.

G. At a systemic level, design must combine materials, shade and urban geometry. Orienting streets and preserving ventilation corridors can improve airflow where prevailing winds are reliable. Limiting the height and density of buildings in selected corridors may reduce heat trapped within a street canyon, yet lower density can also lengthen travel and expand land use. Rules therefore need local modelling rather than one ideal form. Building codes, tree protection, cool roofs, transit and heat-health plans operate at different scales. Climate change raises the baseline on which an urban heat island acts, so adaptation should be tested with air and surface temperatures, exposure and health outcomes—not a single citywide average.`,
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

People can reason carefully, yet attention, memory, framing and prior knowledge also shape judgement. Cognitive psychologists use “bias” for a systematic pattern relative to a stated benchmark, not for every mistake or an unchangeable defect in a person. A result can vary with task wording, incentives, experience and culture. The important questions are which benchmark applies, how large an effect is, whether it replicates and whether it predicts consequential behaviour outside a laboratory.

Daniel Kahneman and Amos Tversky brought heuristics and biases to prominence through experiments beginning in the 1970s. Kahneman later used the labels System 1 and System 2 to contrast relatively fast, automatic processes with slower, effortful reasoning. These are useful families of processes, not two anatomical organs or perfectly separate parallel systems. A fast judgement can be expert and accurate; deliberation can also rationalise a preferred answer. The framework predicts neither that intuition always fails nor that extra time automatically removes bias.

One widely studied family is confirmation bias: selective search for, interpretation of or memory for information that supports an existing belief. The label covers several mechanisms, and evidence is not identical across all tasks. In diagnosis, an early hypothesis may narrow later search. In political settings, people may scrutinise opposing evidence more severely; under some conditions a challenge can entrench a view, but a general “backfire effect” is not inevitable. Accuracy prompts, incentives and genuine opportunities to revise can alter responses.

The anchoring effect describes the tendency for an initial piece of information to disproportionately influence subsequent judgements. In one famous experiment, subjects were asked to spin a wheel that was rigged to stop at either ten or sixty-five, then estimate what percentage of African countries belonged to the United Nations. Those who spun a high number gave systematically higher estimates than those who had spun a low number—despite the complete irrelevance of the spin. Anchoring influences price negotiations, legal sentences, and medical prognoses, often with substantial real-world consequences.

A demonstration establishes an effect under stated conditions, not its size in every setting. Later studies can test different anchors, incentives and expertise, and a successful replication may still yield a smaller estimate. Practical safeguards include asking for an independent estimate before revealing another person's number, considering a plausible range and documenting the reasons for a revision. These steps reduce dependence on one starting value without assuming that any first number is irrelevant; a market quote or clinical baseline may contain genuine information.

The availability heuristic describes judging frequency or probability partly by how easily examples come to mind. Vivid, recent or heavily reported events may be more retrievable than quiet ones. A publicised aircraft accident can raise perceived aviation risk, but comparing flying with driving requires a denominator such as journey, hour or distance and depends on jurisdiction. Availability is therefore an explanation to test, not proof that every person misjudges every dramatic event. Experience and relevant expertise can make accessible examples informative.

Not all researchers accept that biases are as universal or as harmful as the standard account implies. Gerd Gigerenzer, a German psychologist, has argued that many so-called biases are actually ecological rationality in action: heuristics that perform well in the environments in which they evolved. A doctor who relies on a simple decision rule—such as admitting all patients with two or more risk factors—may outperform a statistical algorithm that weighs hundreds of variables, precisely because the simpler rule avoids overfitting to noisy data. Gigerenzer's view is that the bias literature too often tests human reasoning against an inappropriate standard of formal logic and ignores the practical value of fast and frugal thinking.

Applied work asks whether changing a process improves outcomes. “Nudging” alters choice architecture without forbidding options or substantially changing economic incentives; automatic pension enrolment is a familiar example. Effects vary by population and implementation, and an intervention raises questions about transparency, consent and who defines “better”. In medicine, checklists and structured protocols can support teams but fail when poorly designed or detached from workflow. In law, research on memory has influenced some eyewitness procedures. Bias awareness alone is weak protection: useful safeguards make alternatives visible, invite independent estimates, record confidence before feedback and audit results. The recognition that reasoning has limits supports testable design, not a promise to eliminate bias.`,
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
          text: 'What caution does the writer add to the aircraft example?',
          options: [
            'Aircraft accidents do not affect perceived risk at all.',
            'Flying and driving comparisons depend on the denominator and context used.',
            'Driving is always safer when risk is measured per journey.',
            'Availability applies only to people without transport experience.',
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
          template: `31. {{31}}: Kahneman and Tversky conducted their key experiments in the United States.\n32. {{32}}: In some conditions, a challenge to a belief can make that belief more entrenched.\n33. {{33}}: The term cognitive bias applies to every isolated reasoning mistake.\n34. {{34}}: Gigerenzer argues that simple decision rules can outperform complex statistical models in some situations.\n35. {{35}}: The nudging approach to policy design has been proven to eliminate cognitive biases.\n36. {{36}}: Research on cognitive bias has influenced legal proceedings in some countries.`,
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
          imageAlt: 'Grouped bar chart comparing average daily water consumption per person in Los Angeles, Singapore, Cape Town and Copenhagen in 2010 and 2023, measured in litres',
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
          stimulus: 'Some city governments publish neighbourhood-level heat maps to decide where shade, trees and cooling centres should be funded. Others argue that publishing such maps may stigmatise communities and expose sensitive information.',
          text: 'Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
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
            'Which place in your neighbourhood do you visit most often?',
            'Is your area comfortable to walk around in hot weather?',
            'How reliable is public transport where you live?',
            'Would you prefer to live in a different kind of area in the future?',
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
            'When should neighbourhood data be made public, and when should it remain private?',
            'How can planners avoid repeating a popular policy that has weak evidence?',
          ],
        },
      ],
    },
  ],
};

export default mock;
