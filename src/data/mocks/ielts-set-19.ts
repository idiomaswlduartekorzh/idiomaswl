import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-19',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 19',
  subtitle: 'Dark Matter · E-commerce Growth · Cultural Heritage',
  timeMinutes: 164,
  sections: [

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-19.mp3',
      title: 'Listening — Section 1: Booking a language exchange',
      instructions: 'You will hear a conversation between a woman and a language-exchange coordinator. Listen and answer Questions 1–10.',
      transcript: `COORDINATOR: Good afternoon, City Language Exchange. How can I help you?

CALLER: Hello. I saw your advert online and I'd like to register for a conversation partner.

COORDINATOR: Wonderful, I can set that up for you. First, could I take your name?

CALLER: Yes, it's Helena Fisher.

COORDINATOR: And how do you spell your surname?

CALLER: It's F-I-S-H-E-R.

COORDINATOR: Thank you, Helena. And could I have a phone number for you?

CALLER: My mobile is 07944 218 305.

COORDINATOR: Got it. Now, can I ask what you do for a living? Are you a student?

CALLER: No, I'm a nurse, actually. I work at the city hospital.

COORDINATOR: Lovely. And which language would you like to practise with us?

CALLER: Spanish, please. In return I can help someone with English, which is my first language.

COORDINATOR: Perfect. And how would you describe your current level of Spanish?

CALLER: I'd say intermediate. I studied it at school, but I've forgotten quite a lot.

COORDINATOR: That's no problem at all. Where would you prefer to meet your partner?

CALLER: I was thinking a café would be nice and relaxed. Actually, no — a café gets too noisy. The library would be far better, because it's quiet.

COORDINATOR: The library is a very popular choice. And which day of the week suits you best?

CALLER: Could we make it Thursday? That's my day off.

COORDINATOR: Thursday works well. And is there any particular skill you'd like to concentrate on?

CALLER: Mostly conversation, but I'd really like to improve my pronunciation — that's my weakest area.

COORDINATOR: Noted. Now, let me explain our three membership levels before you decide. The Basic level is completely free, and you simply receive a welcome handbook full of tips. The Standard level costs fifteen pounds a year, and it adds a group meet-up once a month. And our Premium level, at forty pounds a year, gives you a weekly meeting instead, plus access to our online lessons.

CALLER: That's really helpful. I think I'll start with the Standard level.

COORDINATOR: An excellent choice. I'll email you the details today.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Language Exchange Registration',
          example: 'Name:  Helena Fisher',
          template: `Phone: (mobile) 07944 218 305

Registration details
• Occupation: {{1}}
• Language she wants to practise: {{2}}
• Current level: {{3}}
• Preferred place to meet: the {{4}}
• Preferred day: {{5}}
• Skill she most wants to improve: {{6}}`,
          blanks: [
            { num: 1, answers: ['nurse'], maxWords: 1 },
            { num: 2, answers: ['Spanish', 'spanish'], maxWords: 1 },
            { num: 3, answers: ['intermediate'], maxWords: 1 },
            { num: 4, answers: ['library'], maxWords: 1 },
            { num: 5, answers: ['Thursday', 'thursday'], maxWords: 1 },
            { num: 6, answers: ['pronunciation'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Membership', 'Price per year', 'Meetings included', 'Also includes'],
          rows: [
            [
              'Basic',
              'free',
              'none',
              { num: 7, answers: ['handbook'], maxWords: 1 },
            ],
            [
              'Standard',
              { num: 8, answers: ['15', '£15', 'fifteen'], maxWords: 1 },
              'monthly',
              '—',
            ],
            [
              'Premium',
              '£40',
              { num: 9, answers: ['weekly'], maxWords: 1 },
              { num: 10, answers: ['lessons'], maxWords: 1 },
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-19.mp3',
      title: 'Listening — Section 2: Science-museum tour',
      instructions: 'You will hear a guide introducing visitors to a science museum. Listen and answer Questions 11–20.',
      transcript: `Good morning everyone, and welcome to the Riverside Science Museum. My name's Oliver, and I'll be giving you a quick introduction before you explore on your own.

Let me start with what's changed since your last visit. This year we've opened two brand-new attractions that I'd encourage you all to see. The first is a planetarium on the top floor, where you can lie back and watch the night sky. The second is our outdoor energy garden, where science comes to life in the open air. We've also refurbished the café and updated the gift shop, and of course the ever-popular flight gallery is still here, exactly where it always was.

Now for some practical information. Guided tours of the main galleries leave every forty minutes from the information desk in the entrance hall. Each guided tour lasts about an hour, so do allow enough time. If you're carrying bags, please leave them in the cloakroom on the ground floor, as large rucksacks aren't permitted in the galleries. Lockers are also available, and they cost two pounds.

Photography is welcome throughout the building, but we do ask you to switch off your flash, because it can damage some of the more delicate exhibits.

Let me point out a few highlights. On the ground floor, our star attraction is a giant model heart, which is so big that you can actually walk right through it. Upstairs, in the space gallery, you'll be able to see a genuine piece of moon rock, brought back by astronauts. And outside in the energy garden, you can try generating electricity yourself by pedalling a bicycle.

Finally, don't leave without visiting our temporary exhibition, which this season is all about robots. It runs until the end of August. Members receive a twenty per cent discount in the shop, and children under five come in free. Enjoy your visit, and please ask any of our staff if you need help.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO attractions have been newly opened at the museum this year?',
          options: [
            { letter: 'A', text: 'the planetarium' },
            { letter: 'B', text: 'the café' },
            { letter: 'C', text: 'the gift shop' },
            { letter: 'D', text: 'the energy garden' },
            { letter: 'E', text: 'the flight gallery' },
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
          title: 'The Museum Visit',
          template: `Tours and facilities
• Guided tours leave every {{13}} from the information desk.
• Each guided tour lasts about {{14}}.
• Bags must be left in the {{15}} on the ground floor.
• Lockers are available and cost {{16}}.
• When taking photos, visitors must switch off the {{17}}.

Highlights
• On the ground floor, you can walk through a giant model {{18}}.
• In the space gallery there is a real piece of {{19}}.
• The temporary exhibition is about {{20}}.`,
          blanks: [
            { num: 13, answers: ['forty minutes', '40 minutes'], maxWords: 2 },
            { num: 14, answers: ['an hour', 'one hour', 'hour'], maxWords: 2 },
            { num: 15, answers: ['cloakroom'], maxWords: 1 },
            { num: 16, answers: ['two pounds', '£2', '2 pounds'], maxWords: 2 },
            { num: 17, answers: ['flash'], maxWords: 1 },
            { num: 18, answers: ['heart'], maxWords: 1 },
            { num: 19, answers: ['moon rock'], maxWords: 2 },
            { num: 20, answers: ['robots', 'robot'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-19.mp3',
      title: 'Listening — Section 3: Film-studies project',
      instructions: 'You will hear a tutor discussing a film-studies project with two students, Maya and Tom. Listen and answer Questions 21–30.',
      transcript: `TUTOR: Come in, Maya and Tom. I've watched the first cut of your film-studies documentary, so let's talk it through.

MAYA: Thanks. As you know, we chose to film the street musicians who perform around the old town.

TUTOR: Yes — remind me why you settled on that particular subject?

MAYA: Well, at first we wanted to interview professional film directors, but we soon realised that would be almost impossible to arrange. Street musicians were far easier to approach, and honestly the topic felt much fresher.

TUTOR: A sensible decision. Now, what was the biggest challenge you faced during filming?

TOM: The lighting actually turned out fine, and the performers were very happy to take part. The real headache was the sound — traffic noise in the background spoiled several of our best takes.

TUTOR: Sound is always difficult outdoors. And what do you feel worked especially well?

MAYA: I'm proudest of the interviews. We let each musician tell their own story, and those personal moments give the film its emotional heart. The camerawork is a little shaky in places, but the interviews really carry it.

TUTOR: I agree — the interviews are your strongest element. Now, my main criticism concerns the length. At twenty-five minutes, it's simply too long for this assignment; you need to bring it down to about fifteen.

TOM: We were worried you'd say that. We'll cut the opening section, which does drag a little.

TUTOR: Good plan. And when you hand it in, remember the film must be uploaded to the department server, not brought in on a memory stick — the files are far too large for that.

MAYA: Understood. What else should we do before we submit?

TUTOR: Let's agree the next steps. First, re-edit the film to reduce its length. Then add subtitles, because a few of the musicians are quite hard to follow. After that, record a short narration to introduce each performer. You'll also need to obtain written permission from every musician, or we can't screen the film in public. Finally, send me a rough version by next Friday, and I'll give you detailed feedback before the final deadline.

TOM: Great. Thank you so much.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'Why did the students choose street musicians as their subject?',
          options: [
            'They had a strong personal interest in music.',
            'The subject was more accessible than their first idea.',
            'Their tutor recommended the topic to them.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'What was the main difficulty the students had when filming?',
          options: [
            'The lighting was poor.',
            'Background traffic noise affected the sound.',
            'The musicians were unwilling to take part.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'Which part of the documentary is Maya most pleased with?',
          options: [
            'the camerawork',
            'the interviews',
            'the background music',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'What is the tutor\'s main criticism of the documentary?',
          options: [
            'It is too long.',
            'It is poorly organised.',
            'The sound quality is weak.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'How must the students submit the finished film?',
          options: [
            'on a memory stick',
            'by email',
            'by uploading it to the department server',
          ],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'Next steps for the project',
          template: `• Re-edit the film in order to reduce its length.
• Add {{26}} so that the musicians are easier to follow.
• Record a short {{27}} to introduce each performer.
• Obtain written {{28}} from every musician.
• Send the tutor a rough {{29}} of the film by next Friday.
• The tutor will provide {{30}} before the final deadline.`,
          blanks: [
            { num: 26, answers: ['subtitles', 'subtitle'], maxWords: 1 },
            { num: 27, answers: ['narration'], maxWords: 1 },
            { num: 28, answers: ['permission'], maxWords: 1 },
            { num: 29, answers: ['version'], maxWords: 1 },
            { num: 30, answers: ['feedback'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-19.mp3',
      title: 'Listening — Section 4: Renewable energy storage',
      instructions: 'You will hear a lecture about the storage of renewable energy. Listen and answer Questions 31–40.',
      transcript: `Good morning. In today's lecture I want to look at one of the greatest challenges in the shift to clean power: how we store energy from renewable sources.

The problem starts with the nature of renewables themselves. Sources such as solar panels and wind farms are intermittent, which means they only generate electricity when the sun is shining or the wind is blowing, and not at other times. Because supply and use rarely match, we need to capture surplus power and release it later, during periods of high demand — for instance, on a cold winter evening when everyone switches on the heating.

So what are the options? The most widespread storage technology today relies on lithium-ion batteries, like those found in phones and electric cars, only on a much larger scale. A much older method is pumped hydro. When there is spare electricity, it is used to pump water uphill into a reservoir. Later, when power is needed, that water is released and flows back down through a turbine, which spins to generate electricity all over again.

There are other clever approaches too. In compressed-air storage, surplus electricity squeezes air into sealed underground caves; when demand rises, the air is let out to drive a generator. And in some solar power plants, mirrors focus the sun's heat to melt salt. The molten salt stays hot for many hours and can later boil water into steam.

Of course, every method has its drawbacks. Batteries, although efficient, remain expensive, and their lifespan is limited, because after a certain number of charges they must be replaced. Worse still, the metals inside them, such as lithium and cobalt, are difficult and sometimes environmentally damaging to mine.

Looking to the future, researchers are pursuing fresh ideas. One is to store spare renewable electricity in the form of hydrogen gas, which can be burned or fed into fuel cells whenever it is needed. Others are designing cheaper batteries that avoid rare metals altogether. With better storage, renewable energy could one day power our homes and cities around the clock.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'RENEWABLE ENERGY STORAGE',
          template: `Why storage is needed
• Solar and wind power are {{31}}: they do not produce electricity all the time.
• Storage saves surplus power for periods of high {{32}}.

Methods of storage
• The most common technology today uses lithium-ion {{33}}.
• Pumped hydro uses spare electricity to pump {{34}} up into a reservoir.
• The stored water later flows down through a {{35}} to generate electricity.
• Compressed-air storage forces air into sealed underground {{36}}.
• Some solar plants store heat by melting {{37}}.

Drawbacks
• Batteries are costly and have a limited {{38}}.
• Mining the metals they contain, such as lithium and {{39}}, causes environmental harm.

The future
• Surplus electricity may be stored as {{40}} gas for later use.`,
          blanks: [
            { num: 31, answers: ['intermittent'], maxWords: 1 },
            { num: 32, answers: ['demand'], maxWords: 1 },
            { num: 33, answers: ['batteries', 'battery'], maxWords: 1 },
            { num: 34, answers: ['water'], maxWords: 1 },
            { num: 35, answers: ['turbine'], maxWords: 1 },
            { num: 36, answers: ['caves', 'cave'], maxWords: 1 },
            { num: 37, answers: ['salt'], maxWords: 1 },
            { num: 38, answers: ['lifespan', 'life'], maxWords: 1 },
            { num: 39, answers: ['cobalt'], maxWords: 1 },
            { num: 40, answers: ['hydrogen'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 5,
      skill: 'reading',
      title: 'Reading — Passage 1: The Mystery of Dark Matter',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The Mystery of Dark Matter

One of the most profound puzzles in modern physics is dark matter: an inferred form of matter that does not emit, absorb, or reflect enough light to be observed directly, yet exerts gravity. Measurements interpreted through the standard cosmological model assign it about twenty-seven percent of the universe's mass-energy content. Dark energy, the name given to the component associated with accelerated cosmic expansion, contributes roughly sixty-eight percent, while ordinary or baryonic matter contributes about five percent. These fractions are model-based estimates from several observations, including the cosmic microwave background, rather than a direct inventory of invisible objects.

Evidence for dark matter comes from multiple scales. In the 1930s, Fritz Zwicky inferred missing mass from galaxy motions in the Coma Cluster, although his result did not establish its nature. In the 1970s, Vera Rubin, Kent Ford, and collaborators measured orbital speeds in spiral galaxies with much stronger observational coverage. If visible matter supplied almost all the gravity, speeds should generally decline beyond the bright central region. Instead, many outer rotation curves remain approximately flat: stars and gas orbit faster than the visible mass alone predicts. This pattern is called a flat rotation curve. Researchers compare many galaxies because one curve can be affected by distance, inclination, gas motions, and estimates of stellar mass. Within standard gravity, an extended halo of unseen mass explains the pattern. The observation does not logically prove one particle model, because modified-gravity proposals can reproduce some galactic curves, but any alternative must also address clusters, gravitational lensing, the cosmic microwave background, and the growth of large-scale structure.

Gravitational lensing provides another line of evidence. A foreground mass curves spacetime and distorts light from more distant sources; astronomers use those distortions to reconstruct total mass, whether luminous or not. The Bullet Cluster is a striking case. During a collision between two clusters, much of the ordinary matter in hot gas interacted and slowed, while galaxies passed through more freely. Lensing maps place most of the gravitating mass nearer the galaxies than the X-ray gas. This separation is strong evidence for a relatively non-collisional dark component and places demanding constraints on modified-gravity explanations, although it is still an inference combining observations with a gravitational model.

The nature of dark matter remains unknown. WIMPs, or Weakly Interacting Massive Particles, have long been a prominent candidate class. Direct-detection experiments place sensitive detectors deep underground to reduce cosmic ray interference and search for rare collisions in carefully shielded target material, but no result has yet been confirmed as dark matter. Researchers must distinguish a possible signal from radioactive contamination, detector noise, and neutrinos, so experiments compare event energy, location, timing, and target response. Increasingly strict limits rule out parts of the WIMP parameter space rather than the whole idea. Other candidates include axions, sterile neutrinos, primordial black holes within constrained mass ranges, and particles interacting through a richer hidden sector. Collider searches and astronomical observations test complementary possibilities.

An alternative class of explanations modifies gravitational dynamics. Modified Newtonian Dynamics (MOND), proposed by Mordecai Milgrom in 1983, changes the effective relation between acceleration and gravity below a characteristic scale and can reproduce many galaxy rotation curves with close links to visible matter. That empirical success is one reason the idea remains scientifically useful rather than merely an absence of particles. Basic MOND alone has greater difficulty with galaxy clusters, gravitational lensing, the cosmic microwave background, and structure formation; relativistic extensions add fields or ingredients to address some of those observations. The comparison is therefore between complete models across datasets, not between one successful curve and one failed detector.

Despite decades of research, dark matter remains an open question. The Vera C. Rubin Observatory, named for the astronomer whose galaxy measurements transformed the evidence, began its ten-year Legacy Survey of Space and Time in June 2026. Repeated images of the southern sky will support weak-lensing measurements, maps of the distribution of matter, and tests of how cosmic structure evolves. Rubin's work did not originate the dark-matter idea, which had earlier observational roots, but made the galaxy evidence far harder to dismiss. Underground detectors, collider experiments, and other observatories will supply independent tests; agreement among methods matters because no single null result or sky map can identify a particle by itself.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Dark matter is estimated to make up approximately twenty-seven percent of the total energy content of the universe.\n2. {{2}}: Vera Rubin discovered that stars near the outer edges of galaxies rotate faster than expected based on visible mass.\n3. {{3}}: Gravitational lensing works by measuring how much light is accelerated near massive objects.\n4. {{4}}: The Bullet Cluster is considered particularly important evidence because it separates the visible matter from the bulk of the mass.\n5. {{5}}: WIMP detection experiments deep underground have produced several confirmed detections in recent years.\n6. {{6}}: MOND proposes that the law of gravity behaves differently at very low accelerations.\n7. {{7}}: The Vera Rubin Observatory was named after the astronomer who first proposed the theory of dark matter.`,
          blanks: [
            { num: 1, answers: ['TRUE'] },
            { num: 2, answers: ['TRUE'] },
            { num: 3, answers: ['FALSE'] },
            { num: 4, answers: ['TRUE'] },
            { num: 5, answers: ['FALSE'] },
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
          template: `8. Galaxy rotation speeds that remain approximately constant beyond the bright centre produce a {{8}} curve.\n9. The distortion of distant light by foreground mass is known as gravitational {{9}}.\n10. A long-prominent class of candidate dark-matter particles is called {{10}}.\n11. Underground dark matter detectors reduce {{11}} interference.\n12. The alternative proposed by Mordecai Milgrom is called Modified {{12}} Dynamics.\n13. The Rubin survey will support maps of the {{13}} of matter.`,
          blanks: [
            { num: 8, answers: ['flat rotation'] },
            { num: 9, answers: ['lensing'] },
            { num: 10, answers: ['WIMPs'] },
            { num: 11, answers: ['cosmic ray'] },
            { num: 12, answers: ['Newtonian'] },
            { num: 13, answers: ['distribution'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: The Rise of E-commerce',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `The Rise of E-commerce

A. Electronic commerce—the ordering or sale of goods and services over computer networks—expanded rapidly after the commercial internet grew in the 1990s. Its scale depends on definition. UNCTAD estimated that businesses in 43 economies, together representing about three-quarters of world output, generated almost US$27 trillion in e-commerce sales in 2022; that measure includes business-to-business transactions and is not a global retail-only total. The US Census Bureau separately estimated that online orders represented 15.4 percent of US retail sales in 2023. Such figures cannot be substituted for one another, and forecasts add assumptions about exchange rates, prices, adoption, and which transactions are counted.

B. Convenience is a major driver: online shopping is available at any hour, can reduce travel, and enables rapid comparison among vendors. Smartphones and mobile internet extended access, while digital payments and delivery networks determine whether browsing can become a completed purchase. The COVID-19 pandemic accelerated adoption as restrictions shifted consumers and businesses toward remote channels. Some habits persisted, but effects differ by product, country, income, connectivity, and trust. Averages can conceal exclusion among people without reliable internet, payment instruments, accessible interfaces, or secure delivery addresses.

C. Many e-commerce markets are concentrated, although leadership differs by country and category and can change. Large marketplaces benefit from network effects: more buyers can attract more sellers, and broader selection can attract more buyers. Scale also supports fulfilment infrastructure, advertising services, and data analysis. Platforms can rank products, personalise recommendations, target promotions, and test prices or interfaces. These capabilities can help small sellers reach customers, while also creating dependence on marketplace rules, commissions, search placement, and access to data that the platform itself controls. Consumers and merchants can use several platforms, which can limit lock-in, but switching becomes harder when reputation scores, advertising history, fulfilment, or customer relationships cannot move with them.

D. Traditional bricks-and-mortar retail has changed as online sales have grown. Some department stores and chains entered bankruptcy or reduced their estates, while other retailers integrated websites, shops, collection points, and returns. Empty premises can reduce employment and footfall in town centres, but e-commerce is only one cause: rents, debt, changing demographics, out-of-town development, the pandemic, and weak local demand also matter. Lower-income communities may lose nearby jobs and accessible shops, while simultaneously benefiting from wider selection or delivery. Establishing the distributional effect requires local evidence rather than assuming the same outcome everywhere.

E. The environmental footprint is complex. Consolidated delivery rounds may use less energy than many individual car trips, especially in dense areas with high drop rates. Packaging, warehouses, failed deliveries, rapid shipping, and product returns can reverse that advantage. Return rates are particularly important for some categories such as apparel but should not be treated as identical across all goods. The "last mile" from a distribution centre to a home is challenging because order density, vehicle type, route planning, delivery speed, and whether a consumer makes additional shopping trips all affect emissions. A fair comparison therefore uses a defined product and full delivery-and-return scenario. It should also state whether it counts consumer travel, building energy, upstream freight, packaging manufacture, damaged or unsold goods, and the rebound effect of purchasing more when ordering becomes easier.

F. Labour conditions have attracted sustained scrutiny. Workers and regulators have raised concerns about work intensity, electronic monitoring, ergonomics, and injury rates at some large warehouses. Comparing an individual operator with a broad retail average can be misleading because job mix and reporting differ, but recurring findings warrant investigation and prevention. Algorithmic scheduling and performance targets can coordinate complex operations, yet workers may struggle to understand or challenge a disciplinary decision generated from those measures. Delivery arrangements range from employees to subcontractors and independent platform workers, with corresponding differences in pay stability, benefits, bargaining power, and liability for vehicles or waiting time. Several jurisdictions have introduced rules on platform work, warehouse quotas, or employment status, and disputes continue over how those rules apply.

G. E-commerce will be shaped by technology, regulation, and consumer preferences. Augmented reality tools let consumers visualise products at home; social commerce combines content, recommendation, and purchase; experiments continue with lockers, drones, robots, and autonomous vehicles. Technical feasibility does not establish safety, accessibility, labour benefit, or lower emissions. Regulators in the European Union, United States, China, and elsewhere scrutinise platform competition, data use, product safety, deceptive design, and the terms offered to smaller businesses. The central governance problem is to preserve useful access and innovation while making platforms accountable for rules and effects they can influence.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A reference to concerns about working conditions and injury rates in e-commerce warehouses', answer: 'F' },
            { num: 15, stem: 'An explanation of how large platforms use data to gain competitive advantages over small retailers', answer: 'C' },
            { num: 16, stem: 'An explanation of why two e-commerce statistics with different scopes cannot be directly substituted', answer: 'A' },
            { num: 17, stem: 'A discussion of mixed effects on lower-income communities when local shops close', answer: 'D' },
            { num: 18, stem: 'An account of how the COVID-19 pandemic affected consumer shopping behaviour', answer: 'B' },
            { num: 19, stem: 'A discussion of the environmental costs of packaging, returns, and last-mile delivery', answer: 'E' },
            { num: 20, stem: 'A description of emerging technologies such as drones and augmented reality in e-commerce', answer: 'G' },
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
          title: 'The Rise and Impact of E-commerce',
          template: `E-commerce has grown rapidly since the 1990s, driven partly by {{21}} and the adoption of smartphones. Large platforms benefit from {{22}} effects, through which buyers and sellers can attract one another. Traditional {{23}} retail has changed, although online trade is only one cause. Environmental outcomes depend strongly on the {{24}} delivery stage and on returns, order density, transport, and consumer trips. Regulators have examined electronic monitoring and injury rates at some large {{25}}. In the future, {{26}} tools can let shoppers visualise products at home before buying.`,
          blanks: [
            { num: 21, answers: ['convenience'] },
            { num: 22, answers: ['network'] },
            { num: 23, answers: ['bricks-and-mortar', 'brick-and-mortar'] },
            { num: 24, answers: ['last mile'] },
            { num: 25, answers: ['warehouses'] },
            { num: 26, answers: ['augmented reality'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: Cultural Heritage and Its Preservation',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `Cultural Heritage and Its Preservation

Cultural heritage encompasses the practices, knowledge, artistic expressions, places, and objects that communities inherit from the past and wish to transmit to future generations. It includes the tangible—buildings, archaeological sites, artefacts, manuscripts—and the intangible: oral traditions, performing arts, rituals, craftsmanship, and indigenous knowledge systems. The preservation of cultural heritage is driven by multiple and sometimes competing motivations: the intrinsic value of cultural continuity, the economic value of heritage tourism, the role of heritage in constructing national and community identities, and the scientific value of material remains as records of human history.

The scale of the threat to global heritage is enormous. Natural disasters—earthquakes, floods, fires—have always posed dangers, but climate change is intensifying these risks. Coastal heritage sites face accelerating erosion as sea levels rise and storms become more intense; permafrost regions such as northern Canada and Siberia, where cold conditions have preserved organic materials for thousands of years, are now thawing, causing irreversible deterioration. Managers cannot save every exposed feature, so adaptation may combine drainage, fire planning, relocation, documentation, emergency stabilisation, and decisions about acceptable loss. Those priorities affect living communities and should include their knowledge and values. Armed conflict has also used destruction as a cultural weapon: attacks on Palmyra by the Islamic State group in Syria and the Taliban's demolition of the Bamiyan Buddhas in 2001 sought to erase valued connections with history.

The international framework for heritage protection is centred on the UNESCO World Heritage Convention, adopted in 1972. By 2026, its List contained more than 1,200 properties in over 170 states, while 196 states had joined the Convention. States Parties identify and nominate properties, protect their World Heritage values, manage them, and report on their condition. Inscription does not transfer ownership to UNESCO, and national authorities retain primary responsibility, with international assistance available under the Convention. Listing can attract attention and support, but does not guarantee safety: UNESCO maintained dozens of properties on the List of World Heritage in Danger. The Great Barrier Reef faces severe threats from climate change, yet it was not on that danger list, illustrating why the condition of a site and its formal UNESCO category must not be conflated.

The practice of conservation has evolved significantly. Some nineteenth-century restorations pursued an idealised "original" state, removing later additions or replacing deteriorated material. The 1964 Venice Charter instead said that valid contributions from all periods should be respected and that replacement work should be distinguishable from the original so the historical record is not falsified. Reversibility later became a widely discussed conservation aim, but the word itself does not appear in the Charter. Later documents and practice also placed greater weight on cultural context, living traditions, and participation by the communities whose heritage is being conserved. Authenticity and significance can depend on use, setting, knowledge, and relationships as well as original fabric.

The repatriation of cultural property is highly contested. The Parthenon Sculptures, Benin Bronzes, and many objects removed during colonial rule have different legal histories; grouping every acquisition as identically illegal would erase evidence central to each claim. Requesting states and descendant communities may emphasise coercion, sacred meaning, cultural repair, or the ability to interpret objects in context. Holding institutions have cited legal restrictions, preservation, access, and the idea of a universal museum, while critics ask who authorised that universal role. Recent returns and long-term loans show that outcomes can include transfer of title, shared stewardship, or negotiated circulation. Provenance research is essential because labels such as gift, purchase, expedition, and seizure may conceal unequal power.

Digital technologies create new possibilities for documentation and access. Three-dimensional scanning, photogrammetry, and virtual reality can record geometry and appearance, assist repair, or let remote audiences explore a reconstruction. A digital record survives some forms of physical destruction, but files also depend on metadata, formats, storage, maintenance, and permission. Models of Palmyra or Notre-Dame may support research and public understanding, yet they cannot preserve original material, location, ritual use, memory, or every uncertainty in the evidence. Decisions about who owns scans and how sacred or sensitive knowledge is displayed add a further governance problem. Digital preservation is therefore a valuable layer of practice rather than an automatic substitute for caring for people, places, and objects.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'According to the passage, what are the motivations for preserving cultural heritage?',
          options: [
            'Only economic value through tourism and international recognition.',
            'Multiple motivations including cultural continuity, tourism, identity, and scientific value.',
            'Primarily scientific value as records of human history and evolutionary development.',
            'Mainly political motivations related to national sovereignty and territorial rights.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'What does the passage say about the destruction of Palmyra and the Bamiyan Buddhas?',
          options: [
            'They were destroyed accidentally during armed conflict, not deliberately targeted.',
            'They were calculated acts of cultural erasure intended to sever communities from their histories.',
            'They were destroyed because the groups responsible believed the sites had no cultural value.',
            'Their destruction led directly to the creation of the UNESCO World Heritage Convention.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'What principle established by the Venice Charter continues to guide conservation practice?',
          options: [
            'That buildings should always be restored to their original historical state.',
            'That later additions to historical buildings should always be preserved intact.',
            'That contributions from different periods should be respected and replacements distinguished from the original.',
            'That digital replicas are an acceptable substitute for the preservation of authentic physical sites.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'What criticism do repatriation advocates make of major universal museums that resist returning artefacts?',
          options: [
            'That these museums do not have the resources to care for the objects properly.',
            'That the argument about being guardians of world heritage serves the self-interest of the institutions holding the objects.',
            'That these museums have no legitimate claim to objects purchased legally.',
            'That universal museums promote cultural homogenisation at the expense of local traditions.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: Climate change is intensifying existing threats to coastal and permafrost heritage sites.\n32. {{32}}: By 2026, the World Heritage List contained more than 1,200 properties in over 170 states.\n33. {{33}}: The Venice Charter says replacement work should remain distinguishable from the original material.\n34. {{34}}: Every cultural object removed during colonial rule has the same legal and historical circumstances.\n35. {{35}}: Digital reconstructions preserve every material and social quality of an authentic physical site.\n36. {{36}}: Digital records can remain useful after some forms of physical destruction, although they require continuing care.`,
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
          template: `37. Cultural heritage includes both tangible artefacts and {{37}} elements such as oral traditions and rituals.\n38. The UNESCO World Heritage {{38}}, adopted in 1972, is the central international framework for heritage protection.\n39. Early conservation philosophy sometimes prioritised restoring buildings to an {{39}} state by removing later additions.\n40. Technologies such as three-dimensional scanning and {{40}} enable the creation of detailed digital records of endangered sites.`,
          blanks: [
            { num: 37, answers: ['intangible'] },
            { num: 38, answers: ['Convention'] },
            { num: 39, answers: ['original', 'idealised'] },
            { num: 40, answers: ['photogrammetry'] },
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
          imageUrl: '/assets/ielts/charts/set19-task1.svg',
          imageAlt: 'Line graph showing online retail sales as a percentage of total retail sales in four countries from 2015 to 2023',
          stimulus: 'The line graph below shows online retail sales as a percentage of total retail sales in four countries from 2015 to 2023.',
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
          stimulus: 'The development of e-commerce and online shopping has had significant effects on traditional businesses and communities.',
          text: 'Do the advantages of online shopping outweigh the disadvantages for society as a whole? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
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
          text: 'Part 1 — Personal questions about shopping and cultural interests',
          followUp: [
            'Do you prefer shopping online or in physical shops? Why?',
            'Have your shopping habits changed in recent years?',
            'Are there any traditional markets or shopping areas in your town or city that you like?',
            'How interested are you in history and visiting historical places?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a historical place or monument that you have visited and found interesting.\n\nYou should say:\n• what the place or monument is and where it is located\n• when you visited it\n• what you found most interesting or impressive about it\n• and explain why you think it is important to preserve places like this`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Heritage, preservation, and changing commerce',
          followUp: [
            'How important do you think it is for countries to preserve their historical and cultural heritage?',
            'Should artefacts taken from other countries during the colonial period be returned to their places of origin?',
            'How can governments balance economic development with the preservation of historical areas?',
            'Can online shopping and changing retail habits affect traditional markets or historic town centres? How?',
          ],
        },
      ],
    },
  ],
};

export default mock;
