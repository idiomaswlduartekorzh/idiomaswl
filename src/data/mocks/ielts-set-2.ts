import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-2',
  examSlug: 'ielts',
  title: 'IELTS Academic · Set 2',
  subtitle: 'The History of Glass · Bees and Pollination · The Psychology of Decision Making',
  timeMinutes: 164,
  sections: [

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-2.mp3',
      title: 'Listening — Section 1: Booking a Sports Facility',
      instructions: 'You will hear a conversation between a customer and a sports centre receptionist. Listen and answer Questions 1–10.',
      transcript: `RECEPTIONIST: Good morning, Riverside Sports Centre. How can I help?

CUSTOMER: Hello, I'd like to book one of your tennis courts for this weekend, please.

RECEPTIONIST: Certainly. Can I take your name?

CUSTOMER: Yes, it's Daniel Harris.

RECEPTIONIST: And a contact number?

CUSTOMER: My mobile is 078 5501 3742.

RECEPTIONIST: Thank you. What day were you thinking?

CUSTOMER: Saturday, if possible. In the afternoon.

RECEPTIONIST: Let me check. We have Court 3 free from two o'clock to four o'clock.

CUSTOMER: That would be perfect. We're a group of four players.

RECEPTIONIST: Great. The cost for that slot is twelve pounds per hour, so that's twenty-four pounds in total.

CUSTOMER: I see. Do you offer any kind of membership discount?

RECEPTIONIST: Yes, members receive a twenty percent discount, bringing it to just over nineteen pounds.

CUSTOMER: I'm not a member yet. Is it easy to join?

RECEPTIONIST: Very straightforward. You fill in a form online or in person. Annual membership is sixty-five pounds and includes unlimited use of the gym and swimming pool, as well as discounted court hire.

CUSTOMER: That sounds good. Can I also book a coach for a session?

RECEPTIONIST: Absolutely. Our head coach, Mr Patel, is available on Saturday from ten to twelve in the morning.

CUSTOMER: I'd prefer the afternoon, to match our court booking.

RECEPTIONIST: In that case, our other coach, Ms Carter, is available from half past two.

CUSTOMER: Brilliant. We'll take that.

RECEPTIONIST: Shall I put you down for thirty minutes or a full hour?

CUSTOMER: A full hour, please.

RECEPTIONIST: Done. Is there anything else you need?

CUSTOMER: Do you have racket hire?

RECEPTIONIST: We do — two pounds fifty per racket per session. You can collect them from the equipment room near the main entrance.

CUSTOMER: Perfect. Thank you very much.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Riverside Sports Centre — Booking Form',
          example: 'Customer name:  Daniel Harris',
          template: `Contact number: {{1}}

Day of booking: {{2}}

Number of players: {{3}}

Court hire cost (without discount): £{{4}} per hour

Annual membership fee: £{{5}}

Racket hire: £{{6}} per racket`,
          blanks: [
            { num: 1, answers: ['078 5501 3742', '07855013742'], maxWords: 2 },
            { num: 2, answers: ['Saturday', 'saturday'], maxWords: 1 },
            { num: 3, answers: ['four', '4'], maxWords: 1 },
            { num: 4, answers: ['12', 'twelve'], maxWords: 1 },
            { num: 5, answers: ['65', 'sixty-five', 'sixty five'], maxWords: 2 },
            { num: 6, answers: ['2.50', '2½', 'two fifty'], maxWords: 2 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Coach', 'Availability on Saturday', 'Session length booked', 'Included with membership'],
          rows: [
            ['Mr Patel', { num: 7, answers: ['morning', '10–12', '10 to 12'], maxWords: 1 }, 'N/A', 'No'],
            ['Ms Carter', { num: 8, answers: ['2:30', 'half past two', '14:30'], maxWords: 3 }, { num: 9, answers: ['one hour', '1 hour', 'hour'], maxWords: 2 }, { num: 10, answers: ['no', 'No'], maxWords: 1 }],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-2.mp3',
      title: 'Listening — Section 2: Campus Orientation Talk',
      instructions: 'You will hear a talk given to new students during a campus orientation. Listen and answer Questions 11–20.',
      transcript: `Welcome, everyone, to Greenfield University. I'm James, one of the student advisors, and I'll be giving you a quick overview of the campus and the services available to you.

Let's start with the library. The main library is open seven days a week — from eight in the morning until ten at night on weekdays, and nine to six on weekends. You'll need your student card to access the building after six in the evening. The library holds over 400,000 physical books and gives you access to more than 200 academic databases online. If a book you need isn't available here, you can request an inter-library loan, which usually takes three to five working days.

Next, the Student Support Centre. This is located in the Fleming Building, just to the left of the main gate as you come in. It handles a wide range of services — academic advice, welfare support, and financial guidance. They also run a peer mentoring programme where second and third-year students are paired with first-years to help with the transition to university life.

The health centre is on the south side of the campus, next to the sports hall. You should register as soon as possible — appointments can be booked online or by phone. There is a pharmacist on site on Tuesdays and Thursdays.

Regarding accommodation: if you're in university halls, your warden is your first point of contact for any issues. Each hall also has a common room that stays open until midnight.

Finally, transport. The university operates a free shuttle bus between the north campus, the main campus, and the train station. It runs every fifteen minutes from seven in the morning until eleven at night. You don't need to book — just turn up and show your student card.

Please feel free to ask questions at the end — we want to make sure your first weeks here go smoothly.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO services does the Student Support Centre provide?',
          options: [
            { letter: 'A', text: 'academic advice' },
            { letter: 'B', text: 'sports facilities' },
            { letter: 'C', text: 'financial guidance' },
            { letter: 'D', text: 'library loans' },
            { letter: 'E', text: 'accommodation bookings' },
          ],
          selectCount: 2,
          answers: ['A', 'C'],
        },
        {
          type: 'formgroup',
          id: 'l2-form',
          part: 2,
          qRange: [13, 20],
          groupLabel: 'Complete the notes below.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          title: 'Campus Orientation — Key Information',
          template: `Library
• Open until {{13}} on weekdays.
• Student card required after {{14}} p.m.
• Inter-library loans take {{15}} working days.

Health Centre
• Located next to the {{16}}.
• Pharmacist available on Tuesdays and {{17}}.

Accommodation
• Students in halls should contact their {{18}} for problems.

Transport
• Free shuttle bus runs every {{19}} minutes.
• Bus service ends at {{20}} p.m.`,
          blanks: [
            { num: 13, answers: ['10 p.m.', '10pm', 'ten'], maxWords: 2 },
            { num: 14, answers: ['6', 'six'], maxWords: 1 },
            { num: 15, answers: ['3–5', 'three to five', 'three-five'], maxWords: 3 },
            { num: 16, answers: ['sports hall', 'sports centre'], maxWords: 2 },
            { num: 17, answers: ['Thursdays', 'Thursday'], maxWords: 1 },
            { num: 18, answers: ['warden'], maxWords: 1 },
            { num: 19, answers: ['15', 'fifteen'], maxWords: 1 },
            { num: 20, answers: ['11', 'eleven'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-2.mp3',
      title: 'Listening — Section 3: Discussion about Renewable Energy Project',
      instructions: 'You will hear two students discussing their group project on renewable energy. Listen and answer Questions 21–30.',
      transcript: `SARAH: Hi Tom. Have you had a chance to look at the feedback from Professor Jenkins on our renewable energy project?

TOM: Yes — overall I thought it was quite positive. She liked the section on solar power, but said we need to develop our argument about wind energy more.

SARAH: I agree. I think we relied too much on statistics and not enough on case studies. Real-world examples would make it more convincing.

TOM: That's a good point. I found a report from the Danish government on their offshore wind programme — apparently they now get over 50% of their electricity from wind. That's a compelling example.

SARAH: Perfect. Should we add a new section or revise what we already have?

TOM: I think revise. Adding a new section might make the report too long. Professor Jenkins also commented that our introduction was too vague.

SARAH: Right, she wants a clearer thesis statement from the start.

TOM: Exactly. Now, what about the conclusion? I felt it was quite weak.

SARAH: Yes, we basically just summarised what we'd said. We need to make some stronger recommendations.

TOM: Like what?

SARAH: Well, we could recommend that governments set mandatory renewable energy targets — say, sixty percent renewables by 2035.

TOM: Good idea. We could also suggest increased investment in grid infrastructure, since that's often the bottleneck.

SARAH: Agreed. One thing I wanted to ask you about is the map we were asked to include showing wind farm locations. Did you manage to create it?

TOM: I started it but I'm having trouble with the software. The labels aren't positioning correctly.

SARAH: I can help with that. I used the same programme for my geography project.

TOM: That would be great. Can we meet Thursday to work on it together?

SARAH: Sure. Let's meet at the library at two o'clock.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'Professor Jenkins\' main criticism of their wind energy section was that it',
          options: [
            'contained too many statistics',
            'lacked real-world examples',
            'was too long',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'Tom found a report from the Danish government showing that Denmark gets over 50% of its electricity from',
          options: [
            'solar power',
            'hydroelectric sources',
            'wind power',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'Tom and Sarah decide to handle the wind energy feedback by',
          options: [
            'adding a completely new section',
            'revising the existing section',
            'removing the section entirely',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'What was the main problem with their conclusion?',
          options: [
            'It was too long.',
            'It only summarised what had already been said.',
            'It contained factual errors.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'One of their recommendations for the conclusion is that governments should',
          options: [
            'fund more research into solar energy',
            'set mandatory renewable energy targets',
            'reduce energy consumption',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `• Tom and Sarah also recommend increased investment in {{26}} infrastructure.
• The map shows wind farm {{27}} across different regions.
• Tom is having trouble with the {{28}} when creating the map.
• Sarah is able to help because she used the same {{29}} for a geography project.
• They plan to meet at the {{30}} on Thursday at 2 p.m.`,
          blanks: [
            { num: 26, answers: ['grid'], maxWords: 1 },
            { num: 27, answers: ['locations'], maxWords: 1 },
            { num: 28, answers: ['labels', 'label'], maxWords: 1 },
            { num: 29, answers: ['programme', 'program', 'software'], maxWords: 1 },
            { num: 30, answers: ['library'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-2.mp3',
      title: 'Listening — Section 4: Lecture on Coral Reef Ecosystems',
      instructions: 'You will hear a lecture about coral reef ecosystems. Listen and answer Questions 31–40.',
      transcript: `Today I want to discuss one of the planet's most diverse and threatened ecosystems: coral reefs.

Coral reefs cover less than one percent of the ocean floor, yet they support approximately 25% of all known marine species. This extraordinary concentration of biodiversity makes them one of the most ecologically important environments on Earth.

Corals are animals, not plants — a common misconception. Each individual coral is called a polyp. Polyps secrete a hard calcium carbonate skeleton, and over thousands of years these skeletons accumulate to form the reef structure. Inside each polyp live tiny algae called zooxanthellae. This is a symbiotic relationship: the algae photosynthesise, providing the coral with up to 90% of its energy, while the coral provides the algae with nutrients and shelter.

When water temperatures rise even slightly above normal — sometimes by just one degree Celsius — the coral expels the zooxanthellae. This is known as coral bleaching. Without the algae, the coral turns white and, if temperatures remain high, the coral eventually dies. Mass bleaching events have become far more frequent due to climate change.

Other major threats include ocean acidification, which reduces the availability of calcium carbonate and weakens reef structures; physical damage from boat anchors, tourist divers, and destructive fishing practices such as blast fishing; and the spread of invasive species such as the crown-of-thorns starfish, which feeds on coral tissue.

Conservation efforts are varied. Marine protected areas restrict human activities in key reef zones. Coral gardening programmes grow coral fragments in underwater nurseries and then transplant them onto damaged reefs. Scientists are also developing heat-resistant strains of coral through selective breeding.

The challenge is significant, but many conservationists argue that with immediate action on carbon emissions and local pollution, the worst outcomes can still be avoided.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'CORAL REEF ECOSYSTEMS',
          template: `Key facts

• Coral reefs cover less than 1% of the ocean floor but support 25% of marine {{31}}.
• Individual corals are called {{32}}.
• Corals secrete a {{33}} carbonate skeleton to form the reef structure.

Symbiosis with zooxanthellae

• Tiny {{34}} live inside each coral polyp.
• They provide up to 90% of the coral's {{35}} through photosynthesis.

Coral bleaching

• Caused by a rise in water {{36}}.
• The coral expels the algae and turns {{37}}.

Major threats

• Ocean {{38}}, which weakens the reef structure.
• Physical damage from divers and destructive {{39}} practices.
• Invasive species such as the crown-of-thorns {{40}}.`,
          blanks: [
            { num: 31, answers: ['species'], maxWords: 1 },
            { num: 32, answers: ['polyps', 'polyp'], maxWords: 1 },
            { num: 33, answers: ['calcium'], maxWords: 1 },
            { num: 34, answers: ['algae'], maxWords: 1 },
            { num: 35, answers: ['energy'], maxWords: 1 },
            { num: 36, answers: ['temperature', 'temperatures'], maxWords: 1 },
            { num: 37, answers: ['white'], maxWords: 1 },
            { num: 38, answers: ['acidification'], maxWords: 1 },
            { num: 39, answers: ['fishing'], maxWords: 1 },
            { num: 40, answers: ['starfish'], maxWords: 1 },
          ],
        },
      ],
    },

    // ─── READING ──────────────────────────────────────────────────────────────

    {
      part: 5,
      skill: 'reading',
      title: 'Reading Passage 1: The History of Glass',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `Glass is one of humanity's oldest manufactured materials, yet it remains, in many ways, one of the most remarkable. Its origins lie in the natural world: volcanic glass, known as obsidian, formed when molten rock cooled rapidly, was used by early humans to make cutting tools and weapons long before the first synthetic glass was produced. The earliest manufactured glass objects — beads and vessels — date from around 3500 BCE in Mesopotamia and ancient Egypt.

The first glass was made by heating a mixture of silica (sand), an alkali such as soda ash or potash, and lime. These ingredients, when melted together at very high temperatures and then allowed to cool, produce the hard, transparent solid we recognise today. In the ancient world, glass was coloured, often a deep blue-green, due to impurities in the raw materials. The Romans were among the first to develop clearer glass by adding manganese dioxide.

For centuries, glass objects were luxury items, affordable only by the wealthy. This changed dramatically in the first century BCE with the invention of glassblowing in the region of modern-day Syria. By blowing air through a metal tube into a gather of molten glass, craftsmen could quickly and cheaply produce a wide variety of shapes. This technique spread rapidly across the Roman Empire and transformed glass from a precious commodity into an everyday material.

The fall of the Roman Empire slowed innovation in the West, and the centre of glassmaking shifted to the Islamic world. Craftsmen in what are now Iran, Iraq, and Syria developed new techniques, including the use of coloured enamels and gilding, which produced objects of extraordinary beauty.

By the eleventh century, Venice had established itself as the European capital of glassmaking. The island of Murano, to which the glassblowers were relocated in 1291 — ostensibly to reduce the risk of fire in Venice itself — became synonymous with high-quality glass. Venetian craftsmen jealously guarded their techniques; it was reportedly punishable by death to reveal the secrets of the trade to outsiders.

The next great innovation came in 1674, when Englishman George Ravenscroft added lead oxide to the glass mixture. The resulting lead crystal glass was heavier and had a higher refractive index, giving it exceptional brilliance and making it ideal for decorative pieces such as chandeliers and fine tableware.

The industrialisation of glass production in the nineteenth and twentieth centuries made glass ubiquitous. The development of plate glass through the float glass process — in which molten glass is floated on a bed of molten tin to produce perfectly flat sheets — transformed architecture, making possible the vast glass facades of modern buildings.

Today, glass science continues to advance. Borosilicate glass, developed in the late nineteenth century, resists thermal shock and is used in laboratory equipment and cookware. Optical fibre, made from extremely pure glass, has revolutionised telecommunications. And scientists are developing smart glass that can change its transparency in response to electrical signals, with applications ranging from privacy windows to energy-efficient building design.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-summary',
          part: 5,
          qRange: [1, 5],
          groupLabel: 'Complete the summary.\nChoose ONE WORD ONLY from the passage for each answer.',
          template: `Glass is made from {{1}}, an alkali, and lime. Ancient glass was coloured due to {{2}} in the raw materials.

The invention of {{3}} in the first century BCE made glass production much faster and cheaper.

In Venice, glassblowers were moved to the island of {{4}} in 1291. Later, George Ravenscroft created lead crystal glass by adding lead {{5}} to the mixture.`,
          blanks: [
            { num: 1, answers: ['silica'], maxWords: 1 },
            { num: 2, answers: ['impurities'], maxWords: 1 },
            { num: 3, answers: ['glassblowing'], maxWords: 1 },
            { num: 4, answers: ['Murano'], maxWords: 1 },
            { num: 5, answers: ['oxide'], maxWords: 1 },
          ],
        },
        {
          type: 'mcq',
          id: 'r1q6',
          part: 5,
          text: 'The earliest manufactured glass objects were produced around 3500 BCE.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r1q7',
          part: 5,
          text: 'Glassblowing was invented in Venice.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r1q8',
          part: 5,
          text: 'The relocation of glassblowers to Murano was mainly to prevent industrial espionage.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r1q9',
          part: 5,
          text: 'Lead crystal glass was prized for its decorative qualities.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'multiselect',
          id: 'r1-multi',
          part: 5,
          qRange: [10, 11],
          text: 'Which TWO modern uses of glass are mentioned in the passage?',
          options: [
            { letter: 'A', text: 'bulletproof windows' },
            { letter: 'B', text: 'optical fibre telecommunications' },
            { letter: 'C', text: 'smart glass for privacy and energy efficiency' },
            { letter: 'D', text: 'underwater exploration equipment' },
            { letter: 'E', text: 'solar panel production' },
          ],
          selectCount: 2,
          answers: ['B', 'C'],
        },
        {
          type: 'matching',
          id: 'r1-match',
          part: 5,
          qRange: [12, 13],
          groupLabel: 'Match each innovation with the correct description A–E.\nWrite the correct letter, A–E, next to questions 12–13.',
          items: [
            { num: 12, stem: 'Float glass process', answer: 'C' },
            { num: 13, stem: 'Borosilicate glass', answer: 'A' },
          ],
          endings: [
            { letter: 'A', text: 'resistant to sudden temperature changes' },
            { letter: 'B', text: 'changes transparency with electricity' },
            { letter: 'C', text: 'produces perfectly flat glass sheets' },
            { letter: 'D', text: 'requires addition of lead oxide' },
            { letter: 'E', text: 'uses volcanic material as raw ingredient' },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading Passage 2: Bees and Pollination',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Of all the creatures that contribute to the pollination of flowering plants, bees are by far the most important. It is estimated that one third of the human food supply depends, directly or indirectly, on insect pollination, and bees account for the majority of this work. Without them, many of our most familiar foods — including apples, almonds, blueberries, and squash — would cease to exist in their current form.

Bees are uniquely adapted to the task of pollination. Their bodies are covered with branched, feathery hairs that readily trap pollen grains as the bee moves from flower to flower. Many species also possess specialised structures for carrying pollen: bumblebees and honeybees, for example, have basket-like structures on their hind legs called corbiculae, or pollen baskets, which they use to transport pollen back to the colony. Solitary bees, by contrast, carry pollen in dense patches of hair on their abdomen or hind legs.

The relationship between flowering plants and bees is a classic example of mutualism: both parties benefit. The plant gains a reliable and efficient pollination service, while the bee obtains nectar and pollen as food sources. Nectar provides carbohydrates for energy, while pollen supplies proteins and fats essential for larval development.

To attract bees, flowers have evolved a remarkable array of features. Many produce nectar guides — patterns on their petals, often visible only in ultraviolet light, which direct the bee towards the nectary. Flowers also emit specific scent compounds that bees can detect from long distances. Some plants have gone further, mimicking the scent or appearance of female bees to lure male bees, which inadvertently pollinate the plant while attempting to mate.

Different bee species show marked preferences for particular types of flowers. Long-tongued bees, such as certain bumblebee species, are able to access nectar from deep, tubular flowers that short-tongued bees cannot reach. This specialisation means that some plants depend almost entirely on a single bee species for pollination.

Bee populations globally are under considerable pressure. Among the key threats are habitat loss due to agricultural intensification, the widespread use of pesticides — particularly neonicotinoids, which impair bees' navigation and memory — and the spread of pathogens such as the Varroa mite, which parasitises honeybee colonies. Climate change adds further stress, disrupting the synchrony between bee emergence and flower bloom.

The decline in bee populations has prompted urgent conservation efforts. These include the creation of wildflower corridors along roads and field margins; the banning or restriction of certain pesticides in several countries; and the promotion of garden planting schemes to support urban bee populations. Research into disease-resistant honeybee strains and the development of artificial pollination technologies also continues, though many scientists argue that these cannot substitute for natural pollinator communities.`,
      questions: [
        {
          type: 'mcq',
          id: 'r2q14',
          part: 6,
          text: 'Bees are responsible for pollinating approximately one third of the human food supply.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r2q15',
          part: 6,
          text: 'Bumblebees carry pollen in structures on their hind legs.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r2q16',
          part: 6,
          text: 'Solitary bees are more efficient pollinators than social bees.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r2q17',
          part: 6,
          text: 'Some flowers use ultraviolet patterns to guide bees to their nectar.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r2q18',
          part: 6,
          text: 'Neonicotinoid pesticides affect bees\' ability to find their way.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'formgroup',
          id: 'r2-notes',
          part: 6,
          qRange: [19, 23],
          groupLabel: 'Complete the notes below.\nChoose ONE WORD ONLY from the passage for each answer.',
          title: 'The Relationship Between Bees and Flowers',
          template: `Benefits to bees
• Nectar provides {{19}} for energy.
• Pollen provides proteins and {{20}} for larval development.

Flower adaptations to attract bees
• Ultraviolet {{21}} on petals guide bees to the nectary.
• Flowers emit {{22}} compounds detectable from a distance.
• Some plants mimic female bees to attract male bees looking for a {{23}}.`,
          blanks: [
            { num: 19, answers: ['carbohydrates'], maxWords: 1 },
            { num: 20, answers: ['fats'], maxWords: 1 },
            { num: 21, answers: ['guides', 'patterns'], maxWords: 1 },
            { num: 22, answers: ['scent'], maxWords: 1 },
            { num: 23, answers: ['mate'], maxWords: 1 },
          ],
        },
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [24, 26],
          groupLabel: 'Match each threat to bees with the correct description A–F.\nWrite the correct letter, A–F, next to questions 24–26.',
          items: [
            { num: 24, stem: 'Varroa mite', answer: 'B' },
            { num: 25, stem: 'Neonicotinoids', answer: 'D' },
            { num: 26, stem: 'Climate change', answer: 'F' },
          ],
          endings: [
            { letter: 'A', text: 'destroys wildflower habitats used by bees' },
            { letter: 'B', text: 'parasitises honeybee colonies' },
            { letter: 'C', text: 'prevents bees from producing enough honey' },
            { letter: 'D', text: 'impairs bees\' navigation and memory' },
            { letter: 'E', text: 'reduces the number of flowers available' },
            { letter: 'F', text: 'disrupts the timing between bee emergence and flowering' },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading Passage 3: The Psychology of Decision Making',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `Every day, humans make thousands of decisions, from the trivial — which shirt to wear, what to order for lunch — to the momentous — whether to change career, whom to marry. For much of the twentieth century, economists and psychologists modelled human decision making as a largely rational process, in which individuals weigh up the costs and benefits of available options and choose the one that maximises their utility. This view, known as rational choice theory, has been enormously influential in fields as diverse as economics, political science, and sociology.

However, a growing body of research, much of it pioneered by psychologists Daniel Kahneman and Amos Tversky, has challenged this picture. Their work demonstrated that human decision making is systematically biased in ways that rational choice theory cannot explain. Far from being cool, calculating machines, humans rely heavily on mental shortcuts known as heuristics, which, while often useful, can lead to predictable errors of judgement known as cognitive biases.

One of the most studied heuristics is availability: people judge the likelihood of an event by how easily examples come to mind. After a widely reported plane crash, for instance, many people overestimate the risk of flying, even though statistics show it to be far safer than driving. Because media coverage makes the event mentally available, people perceive it as more common than it is.

Another important bias is anchoring. When people are asked to estimate an unknown quantity — the population of a city, the price of a house — their judgement is heavily influenced by the first number they encounter, even if that number is arbitrary. In one famous experiment, participants who were asked to estimate the percentage of African countries in the United Nations after spinning a wheel — which landed on either 10 or 65 by chance — gave estimates that were strongly influenced by the wheel's result.

Loss aversion is another well-documented phenomenon. Tversky and Kahneman showed that people feel the pain of losses more acutely than they experience the pleasure of equivalent gains. The prospect of losing £100 is typically felt as more distressing than the prospect of gaining £100 is felt as pleasurable. This asymmetry has profound implications for financial decision making, explaining why people often hold on to losing investments far longer than is rational.

Kahneman later organised his thinking around a distinction between two systems of thought. System 1 is fast, automatic, and intuitive — it operates largely outside conscious awareness and draws on pattern recognition and emotional responses. System 2 is slow, deliberate, and analytical, requiring conscious effort. Most everyday decisions are handled by System 1, and cognitive biases arise largely because System 1 misapplies heuristics in situations where careful reasoning is required.

Understanding these biases has practical applications. In the field of public policy, the concept of 'nudging' — designing choice environments to steer people towards better decisions while preserving their freedom to choose — has gained significant traction. By changing the default option in pension enrolment (so that employees are enrolled unless they opt out, rather than having to opt in), governments have dramatically increased pension savings rates. Menu designs, energy bills, and health communications have all been reimagined with behavioural insights in mind.

Critics of nudging argue that it is paternalistic, manipulating people's choices without their knowledge or consent. Others question whether short-term nudges can address deeply ingrained habits. Nonetheless, the field of behavioural economics — which applies insights from psychology to economic models — has transformed our understanding of human behaviour and is now firmly embedded in government, business, and healthcare policy worldwide.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r3-summary',
          part: 7,
          qRange: [27, 33],
          groupLabel: 'Complete the summary.\nChoose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `Traditional models of decision making were based on {{27}} choice theory, which assumed people always maximise their benefit.

Research by Kahneman and Tversky showed that humans use mental shortcuts called {{28}}, leading to systematic errors known as {{29}}.

The availability heuristic means people overestimate events that are easy to {{30}}.

{{31}} aversion explains why people often keep failing investments longer than they should.

Kahneman distinguished between System 1 — fast and {{32}} — and System 2, which is slow and deliberate.

The idea of {{33}} involves designing choice environments to promote better decisions.`,
          blanks: [
            { num: 27, answers: ['rational choice', 'rational'], maxWords: 2 },
            { num: 28, answers: ['heuristics'], maxWords: 1 },
            { num: 29, answers: ['cognitive biases', 'biases'], maxWords: 2 },
            { num: 30, answers: ['recall', 'remember', 'retrieve'], maxWords: 1 },
            { num: 31, answers: ['Loss', 'loss'], maxWords: 1 },
            { num: 32, answers: ['intuitive', 'automatic'], maxWords: 1 },
            { num: 33, answers: ['nudging'], maxWords: 1 },
          ],
        },
        {
          type: 'mcq',
          id: 'r3q34',
          part: 7,
          text: 'Rational choice theory has only been applied in the field of economics.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3q35',
          part: 7,
          text: 'The anchoring experiment used a spinning wheel to produce random numbers.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r3q36',
          part: 7,
          text: 'Loss aversion means that people respond more strongly to losses than to gains of the same size.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r3q37',
          part: 7,
          text: 'System 2 thinking is used for the majority of everyday decisions.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3q38',
          part: 7,
          text: 'Changing pension enrolment defaults has been shown to increase savings rates.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'matching',
          id: 'r3-match',
          part: 7,
          qRange: [39, 40],
          groupLabel: 'Match each statement with the correct group A–D.\nWrite the correct letter, A–D, next to questions 39–40.',
          items: [
            { num: 39, stem: 'They argue that nudging manipulates people without their knowledge.', answer: 'B' },
            { num: 40, stem: 'They doubt whether short-term nudges can change deeply ingrained habits.', answer: 'C' },
          ],
          endings: [
            { letter: 'A', text: 'supporters of rational choice theory' },
            { letter: 'B', text: 'critics who object to paternalism' },
            { letter: 'C', text: 'critics who question long-term effectiveness' },
            { letter: 'D', text: 'proponents of behavioural economics' },
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
          stimulusLabel: 'The bar chart below shows the expenditure on consumer goods in two countries in 2010.',
          stimulus: '',
          imageUrl: '/ielts/images/writing-set2-task1-games.png',
          imageAlt: 'Bar chart: expenditure on consumer goods (mobile phone games, online games, console games, handheld games) 2000–2006',
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
          stimulus: 'Some people think that environmental problems are too big for individuals to solve. Others believe that individuals can make a significant difference. Discuss both views and give your own opinion.',
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
            'Where do you live at the moment? Do you like it there?',
            'Do you enjoy spending time outdoors? Why / why not?',
            'What kind of music do you like to listen to?',
            'How do you usually spend your weekends?',
            'Have you travelled to other countries? Where would you most like to visit?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn (3–4 minutes). Read the cue card and prepare for 1 minute, then speak for 1–2 minutes.',
          cueCard: `Describe a place you have visited that you particularly enjoyed.

You should say:
  - where the place is and how you got there
  - what you did there
  - who you went with

and explain why you enjoyed the visit so much.`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Two-way discussion (4–5 minutes). Discuss the following questions.',
          followUp: [
            'Why do you think people enjoy travelling to new places?',
            'How has tourism changed in recent years?',
            'Do you think tourism can have negative effects on a place? How?',
            'What are the economic benefits of tourism for a country?',
            'How might travel and tourism change in the future?',
          ],
        },
      ],
    },

  ],
};

export default mock;
