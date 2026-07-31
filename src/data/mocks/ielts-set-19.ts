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

One of the most profound puzzles in modern physics is the existence of what scientists call dark matter: a form of matter that does not emit, absorb, or reflect light, making it completely invisible to our telescopes, yet which appears to constitute approximately twenty-seven percent of the total energy content of the universe. Together with dark energy—an even more mysterious force thought to drive the accelerating expansion of the universe—dark matter forms part of what cosmologists refer to as the "dark sector," which collectively accounts for about ninety-five percent of the universe. Ordinary matter—everything we can observe: stars, planets, gas, and galaxies—makes up the remaining five percent.

The evidence for dark matter is extensive and comes from multiple independent lines of observation. The most compelling early evidence came from the rotation of galaxies. In the 1970s, astronomer Vera Rubin and her colleague Kent Ford measured the rotational speeds of stars at different distances from the centre of spiral galaxies. According to Newtonian gravitational theory, stars near the outer edges of galaxies should orbit more slowly than those near the centre, because most of the visible mass is concentrated at the centre. Instead, Rubin and Ford found that stars rotate at roughly the same speed regardless of their distance from the galactic centre—a "flat rotation curve" that can only be explained if galaxies contain far more mass than their visible components would suggest. The additional invisible mass that must be present to explain these rotation curves is dark matter.

Gravitational lensing provides another line of evidence. When light from a distant object passes near a massive body, the gravitational field bends the light's path, acting as a natural lens. By measuring how much distant light is bent around galaxy clusters, astronomers can infer the total mass of the cluster—visible and invisible. In virtually every case, the inferred mass far exceeds the mass of the visible matter. One particularly striking example is the Bullet Cluster, formed by the collision of two galaxy clusters. In this system, the visible matter (primarily hot gas, which slows during the collision) is separated from the bulk of the mass (revealed through gravitational lensing), providing what many physicists consider the most direct evidence that dark matter is a real physical substance rather than a modification of gravitational theory.

The nature of dark matter remains unknown. The leading candidate is a class of as-yet-undiscovered particles called WIMPs (Weakly Interacting Massive Particles), which would interact with ordinary matter only through gravity and the weak nuclear force—making them extremely difficult to detect. Experiments designed to detect WIMPs directly—using highly sensitive detectors placed deep underground to shield them from cosmic ray interference—have been running for decades without a confirmed detection. This persistent null result has led some physicists to consider alternative candidates, including axions (extremely light hypothetical particles) and sterile neutrinos.

An alternative class of explanations rejects dark matter particles altogether and proposes modifications to the laws of gravity itself. Modified Newtonian Dynamics (MOND), proposed by physicist Mordecai Milgrom in 1983, suggests that Newton's law of gravity is modified at the very low accelerations typical of the outer parts of galaxies, producing flat rotation curves without requiring additional invisible mass. While MOND accounts for some observations elegantly, it struggles to explain the full range of evidence that standard dark matter models address—particularly the structure of the cosmic microwave background radiation and the large-scale distribution of galaxies across the universe.

Despite decades of research, dark matter remains one of the most significant open questions in physics. Future experiments, including next-generation underground detectors, the Vera Rubin Observatory (named in honour of the pioneering astronomer), and space-based missions to map the distribution of matter across the universe, may finally reveal the nature of this mysterious component of the cosmos.`,
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
            { num: 7, answers: ['NOT GIVEN'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r1-sent',
          part: 5,
          qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `8. The discovery that galaxy rotation speeds do not decrease with distance from the centre is known as a {{8}} curve.\n9. The bending of light around a massive object is known as gravitational {{9}}.\n10. The leading dark matter candidate particles are called {{10}}, which interact only through gravity and the weak nuclear force.\n11. Underground dark matter detectors are placed deep below the surface to shield them from {{11}} interference.\n12. The alternative to dark matter particles proposed by Mordecai Milgrom is called Modified {{12}} Dynamics.\n13. A future observatory named in honour of Vera Rubin will map the {{13}} of matter across the universe.`,
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

A. Electronic commerce—the buying and selling of goods and services over the internet—has been one of the most transformative economic phenomena of the past three decades. From its origins in the mid-1990s, when the first secure online transactions were conducted and Amazon launched as an online bookstore, e-commerce has grown to represent a substantial and rising share of global retail sales. In 2023, global e-commerce sales were estimated at approximately $5.8 trillion, and forecasts suggest this figure will approach $8 trillion by 2027.

B. The drivers of e-commerce growth are well understood. Convenience is paramount: online shopping is available twenty-four hours a day, requires no travel, and enables rapid comparison of prices and products from multiple vendors. The expansion of smartphones and mobile internet access has been particularly significant, enabling mobile commerce—shopping via smartphones and tablets—which now accounts for the majority of e-commerce transactions in many markets. The COVID-19 pandemic accelerated adoption dramatically: lockdowns forced both consumers and businesses to shift to online channels, and many of the resulting changes in behaviour appear to have persisted beyond the immediate crisis.

C. The competitive dynamics of e-commerce have produced a high degree of market concentration. Amazon dominates the North American market and is a major force in Europe; Alibaba and its affiliates dominate China; Flipkart leads in India. These platform giants benefit from powerful network effects—the more buyers a platform attracts, the more sellers it attracts, and vice versa—and from the data advantages that come with scale. Vast amounts of data on consumer behaviour, preferences, and price sensitivity allow these platforms to optimise recommendations, personalise marketing, and set prices with precision that independent retailers cannot match.

D. The implications for traditional "bricks-and-mortar" retail have been severe. High streets in many countries have experienced significant declines in footfall and the closure of established retail brands. Department stores—once anchors of major shopping districts—have been particularly hard hit: several major chains in the United States and United Kingdom have entered bankruptcy or dramatically reduced their physical presence in the past decade. Research suggests that the decline of physical retail has contributed to the hollowing out of town centres and has disproportionately affected lower-income communities where brick-and-mortar retail provided both employment and accessible shopping options.

E. The environmental footprint of e-commerce is complex and contested. On one hand, the consolidation of deliveries by logistics companies may be more fuel-efficient than multiple individual trips to physical shops. On the other, the proliferation of packaging—particularly single-use plastic—the high rate of product returns (typically far higher than in physical retail), and the energy demands of large warehouse facilities create significant environmental costs. The "last mile" delivery problem—getting goods from a distribution centre to the consumer's door—is particularly challenging in terms of emissions, as it involves a large number of relatively short vehicle trips across residential areas.

F. Labour conditions in e-commerce supply chains have attracted sustained critical attention. Warehouse workers at major e-commerce operations have reported high rates of work intensity, closely monitored performance targets, and injury rates that exceed the retail industry average. The gig economy of delivery drivers—many of whom are classified as independent contractors rather than employees—has faced criticism for insecure incomes, lack of benefits, and algorithmic management that leaves little room for human judgement. Several jurisdictions have introduced or proposed legislation to strengthen the employment rights of platform workers, though the legal and political battles remain unresolved.

G. The future of e-commerce is likely to be shaped by technological innovation, regulatory responses, and evolving consumer preferences. Augmented reality tools that allow consumers to visualise products in their own homes before purchasing, drone and autonomous vehicle delivery, and the integration of social media and commerce ("social commerce") represent emerging frontiers. Regulators in the European Union, the United States, and China have moved to scrutinise the market power of dominant platforms, with implications for competition, data use, and the terms on which smaller businesses can access these essential marketplaces. The trajectory of e-commerce suggests continued growth—but growth whose social, environmental, and distributional consequences will require active and ongoing governance.`,
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
            { num: 16, stem: 'Statistics on the current and projected value of global e-commerce sales', answer: 'A' },
            { num: 17, stem: 'Evidence that e-commerce has disproportionately harmed lower-income communities', answer: 'D' },
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
          template: `E-commerce has grown rapidly since the 1990s, driven largely by {{21}} and the widespread adoption of smartphones. Large platform companies such as Amazon and Alibaba benefit from {{22}} effects, attracting more buyers and sellers as their scale increases. Traditional {{23}} retail has suffered significantly, with department stores particularly hard hit. The environmental impact of e-commerce is debated, but the {{24}} delivery problem—getting products to homes—is a significant source of emissions. Workers in e-commerce warehouses face intensive monitoring and injury rates above the {{25}} industry average. In the future, {{26}} tools that let shoppers visualise products at home before buying represent an emerging frontier.`,
          blanks: [
            { num: 21, answers: ['convenience'] },
            { num: 22, answers: ['network'] },
            { num: 23, answers: ['bricks-and-mortar', 'brick-and-mortar'] },
            { num: 24, answers: ['last mile'] },
            { num: 25, answers: ['retail'] },
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

The scale of the threat to global heritage is enormous. Natural disasters—earthquakes, floods, fires—have always posed dangers, but climate change is intensifying these risks. Coastal heritage sites face accelerating erosion as sea levels rise and storms become more intense; permafrost regions such as northern Canada and Siberia, where cold conditions have preserved organic materials for thousands of years, are now thawing, causing irreversible deterioration. Armed conflict has been used as a deliberate cultural weapon: the destruction of the ancient city of Palmyra by the Islamic State group in Syria, and the dynamiting of the Bamiyan Buddhas in Afghanistan by the Taliban in 2001, were calculated acts of cultural erasure aimed at destroying communities' connections to their histories.

The international framework for heritage protection is centred on the UNESCO World Heritage Convention, adopted in 1972, which to date has inscribed over 1,100 sites across 167 countries. The Convention obliges signatory states to identify, protect, and transmit to future generations the heritage sites within their territories. Sites on the World Heritage List benefit from increased international attention and often increased funding for conservation, though listing is not a guarantee of safety—a significant number of World Heritage Sites are on the "in danger" list, including the Great Barrier Reef, which faces the compound threats of ocean warming and acidification.

The practice of heritage conservation has itself evolved significantly. Early conservation philosophy, influenced by nineteenth-century European traditions, often prioritised the restoration of buildings to an idealised "original" state—sometimes involving the demolition of later additions or the replacement of authentic but deteriorated material with modern replicas. The 1964 Venice Charter established principles that continue to guide the field: authenticity, reversibility of interventions, and the distinction between existing fabric and new additions. More recently, conservation practice has engaged more deeply with the perspectives of the communities whose heritage is being preserved, recognising that definitions of authenticity and significance are culturally constructed rather than universal.

The repatriation of cultural property is one of the most contested aspects of heritage policy. Many of the world's most significant artefacts—the Elgin Marbles (Parthenon Sculptures) from Greece, the Benin Bronzes from Nigeria, Egyptian artefacts held in museums across Europe—were acquired during the colonial period under conditions that are now widely regarded as exploitative or illegal. The governments and communities from which these objects originated have increasingly demanded their return. Major universal museums, including the British Museum and the Louvre, have historically resisted repatriation, arguing that they serve as guardians of world heritage on behalf of global humanity; critics contend that this argument conveniently serves the interests of the institutions that hold the objects.

Digital technologies have created new possibilities for heritage preservation and access. Three-dimensional scanning, photogrammetry, and virtual reality enable the creation of detailed digital records of endangered sites, providing a form of preservation that survives physical destruction. The reconstruction of destroyed sites in virtual form—including Palmyra and Notre-Dame de Paris—has attracted both enthusiasm and scepticism: while digital reconstructions can make heritage accessible globally, critics argue that they risk creating the impression that virtual copies can substitute for authentic physical sites, potentially reducing political pressure for their protection. The relationship between digital heritage and the embodied, place-based experience of authentic heritage remains a genuinely open question for the field.`,
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
            'That interventions should be reversible and that existing fabric should be distinguished from new additions.',
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
          template: `31. {{31}}: Climate change is intensifying existing threats to coastal and permafrost heritage sites.\n32. {{32}}: The UNESCO World Heritage Convention has inscribed over 1,100 sites in more than 160 countries.\n33. {{33}}: The Venice Charter established the principle that heritage interventions should be reversible.\n34. {{34}}: The writer argues that universal museums are correct to resist repatriation of cultural objects.\n35. {{35}}: Digital reconstructions of destroyed heritage sites make it possible for people to experience them as if they were authentic physical places.\n36. {{36}}: The passage suggests that digital records of heritage can provide useful preservation even when physical sites are destroyed.`,
          blanks: [
            { num: 31, answers: ['YES'] },
            { num: 32, answers: ['YES'] },
            { num: 33, answers: ['YES'] },
            { num: 34, answers: ['NO'] },
            { num: 35, answers: ['NOT GIVEN'] },
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
          text: 'Part 3 — Discussion: Heritage, science, and commerce',
          followUp: [
            'How important do you think it is for countries to preserve their historical and cultural heritage?',
            'Should artefacts taken from other countries during the colonial period be returned to their places of origin?',
            'Do you think space exploration or understanding the universe is a good use of scientific resources?',
            'How can governments best balance economic development with the preservation of historical areas?',
          ],
        },
      ],
    },
  ],
};

export default mock;
