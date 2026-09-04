import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-2',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 2',
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
      transcript: `RECEPTIONIST: Good morning, Riverside Sports Centre. This is Emma speaking. How can I help?

CUSTOMER: Hello. I'd like to book one of your tennis courts for this weekend, please. I tried the website, but it kept asking me for a membership number and I don't have one yet.

RECEPTIONIST: That's fine. Non-members can book by phone. Before I check availability, can I take your name?

CUSTOMER: Yes, it's Daniel Harris. Harris is H-A-R-R-I-S.

RECEPTIONIST: Thank you. I can see a Daniel Harris in our system with a number ending in 820, but that may be someone else.

CUSTOMER: It must be. My mobile is 078 5501 3742.

RECEPTIONIST: Let me read that back: 078 5501 3742.

CUSTOMER: That's correct.

RECEPTIONIST: Now, were you hoping to play on Sunday?

CUSTOMER: Sunday was my first thought, but two members of the group are working then. Could we make it Saturday instead, preferably in the afternoon?

RECEPTIONIST: Certainly. The indoor courts are busy, although Court 3 is free from two o'clock to four. There is also an outdoor court at five, but the weather forecast is uncertain.

CUSTOMER: Court 3 sounds safer. There'll be four players. A fifth friend may come to watch, but he won't be playing.

RECEPTIONIST: Four players, then. The normal court fee is twelve pounds per hour. As you want two hours, the booking itself comes to twenty-four pounds.

CUSTOMER: Right. Does that include use of the changing rooms?

RECEPTIONIST: Yes. Lockers are free if you bring a one-pound coin as a refundable deposit. Towels cost extra.

CUSTOMER: And do you offer any kind of membership discount on the court?

RECEPTIONIST: Members receive twenty percent off court hire. That would bring today's booking to nineteen pounds twenty, but you would first need to join.

CUSTOMER: Is it difficult?

RECEPTIONIST: Not at all. You fill in a form online or here at reception. Annual membership is sixty-five pounds. We used to charge seventy, so the website may still show the old amount on one of its information pages.

CUSTOMER: What does the membership cover?

RECEPTIONIST: Unlimited use of the gym and swimming pool at off-peak times, plus the court discount. Exercise classes, coaching, and equipment hire are charged separately.

CUSTOMER: I'll think about joining. For this booking, can I also arrange a coach for us?

RECEPTIONIST: Of course. Our head coach, Mr Patel, is available on Saturday from ten until twelve in the morning.

CUSTOMER: That's too early for two of us. We need someone during the afternoon court booking.

RECEPTIONIST: Then Ms Carter would be the best option. She had an opening at two, but another customer has just taken it. Her next session begins at half past two.

CUSTOMER: Half past two is fine.

RECEPTIONIST: Coaching can be booked for thirty minutes or a full hour. Beginners often start with half an hour.

CUSTOMER: We have played before, and there are four of us, so a full hour would be better.

RECEPTIONIST: All right. One hour with Ms Carter from two thirty, while you keep the court until four. She'll meet you beside Court 3.

CUSTOMER: Great. Two of us need rackets as well. Are they available to hire?

RECEPTIONIST: Yes, they're two pounds fifty per racket for the session. That isn't included in membership, by the way. Reserve them now and collect them from the equipment room near the main entrance. Please don't queue at reception for them.

CUSTOMER: The equipment room — got it. Do we pay everything today?

RECEPTIONIST: Just the court fee today. Coaching and racket hire can be paid when you arrive. Please come fifteen minutes early so there is time to collect the equipment and change.

CUSTOMER: Perfect. Thank you very much.

RECEPTIONIST: You're welcome. I'll send the confirmation to your phone now.`,
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
            { num: 6, answers: ['2.50', '2.5', '2½'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          headers: ['Item', 'Booking detail'],
          rows: [
            ['Mr Patel — available', { num: 7, answers: ['morning', '10–12', '10-12'], maxWords: 1 }],
            ['Ms Carter — session starts', { num: 8, answers: ['2:30', '14:30'], maxWords: 1 }],
            ['Coaching session booked for', { num: 9, answers: ['one hour', '1 hour', 'hour'], maxWords: 2 }],
            ['Rackets collected from', { num: 10, answers: ['equipment room'], maxWords: 2 }],
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
      transcript: `Welcome to Greenfield University. I'm James, one of the student advisers, and this short orientation is about services you may need during your first few weeks. You will receive a campus map at the end, so for now concentrate on what each service does and when it is available.

I'll begin with the main library, the tall brick building opposite the science laboratories. It opens seven days a week. From Monday to Friday, the hours are eight in the morning until ten at night. At weekends, it opens an hour later, at nine, and closes at six. During examinations we sometimes extend the weekday closing time to midnight, but the normal closing time is ten p.m.

You can enter freely during the day. After six p.m., however, the doors operate electronically and you must use your student card. A passport or a photograph of your enrolment letter will not open them. If your card has not arrived, staff at the security desk can issue a temporary pass.

The library holds more than four hundred thousand printed books and provides access to over two hundred academic databases. Many first-year texts have several copies in the short-loan collection. When a title is not held here, you can request an inter-library loan. An ordinary request usually arrives within three to five working days. There is a one-day express service, but it carries a fee and is intended for urgent research rather than routine reading.

Now, the Student Support Centre. A few of you visited its old office beside the cafeteria during the summer. It has moved to the Fleming Building, immediately to the left of the main gate. The centre provides academic advice, welfare support, and financial guidance. Sports memberships are handled at the sports hall, while book loans remain the library's responsibility, so please go to the correct desk.

The centre also runs our peer mentoring programme. Volunteer students in their second or third year are paired with newcomers. A mentor cannot change your course registration, but can explain university routines, introduce clubs, and help you decide whom to contact when a problem arises. Registration for mentoring closes next Friday.

For medical care, use the health centre on the south side of campus. It is next to the sports hall, not inside the hospital building across the road. New students should register now rather than wait until they become ill. Routine appointments can be booked online or by telephone, and urgent cases are assessed at reception. A pharmacist is on site on Tuesdays and Thursdays. The leaflet printed last month says Wednesday, but that session has now moved to Thursday.

Students in university accommodation should remember that the central accommodation office deals mainly with contracts and payments. If a heater stops working, a neighbour is making excessive noise, or you lose access to your room, your hall warden is the first person to contact. Every hall has a warden on duty overnight. Common rooms remain open until midnight, although kitchens on residential floors close at eleven for safety checks.

Finally, transport. The university operates a free shuttle linking the north campus, the main campus, and the train station. Buses run every fifteen minutes from seven in the morning. At peak times you may see an extra bus after only seven or eight minutes, but the published frequency is fifteen minutes. The final service leaves the main campus at eleven p.m. A separate city bus continues after midnight, but that one is not free.

There is no need to reserve a seat on the university shuttle. Show your student card when you board. Bicycles cannot be carried inside, although there are secure cycle racks at each stop. Details of accessibility and the weekend timetable are on the transport page.

That covers the main services. Please keep your questions until the campus tour finishes, when advisers will be available in the entrance hall.`,
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
            { num: 15, answers: ['3–5', '3-5'], maxWords: 1 },
            { num: 16, answers: ['sports hall'], maxWords: 2 },
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
      transcript: `SARAH: Hi, Tom. Have you had a chance to read Professor Jenkins's feedback on our renewable energy project?

TOM: Yes. I expected far more criticism, actually. She thought the structure was clear and she particularly liked the solar-power section. The problem is our treatment of wind energy. She says it needs to be developed.

SARAH: I saw that. At first I thought she meant we needed more statistics, but her note says almost the opposite. We already have several pages of figures and hardly any case studies. She wants real-world examples to show what the statistics mean.

TOM: That makes sense. I found a report from the Danish government about its offshore wind programme. It says the country now gets over fifty percent of its electricity from wind.

SARAH: Over fifty percent from wind? That's stronger than the solar example I found for Spain.

TOM: Yes. The report also discusses public ownership and the cost of connecting offshore farms, but those details may take us away from our main argument.

SARAH: We could use Denmark as a short case study and keep the connection costs for the limitations section. Should we create a completely new section for it?

TOM: I don't think so. We're already close to the word limit. I'd revise the existing wind section: remove one of the tables, then use that space for the case study.

SARAH: Agreed. So we're revising what we have, not adding another section. What did you make of her comment on the introduction?

TOM: She called it vague. We begin with a general statement about climate change, but we don't tell the reader what the report will argue.

SARAH: Then I'll rewrite the final sentence as a clearer thesis statement. Perhaps we should say that a reliable transition needs a mixture of technologies rather than presenting solar and wind as competitors.

TOM: Good. She also circled the second paragraph because it repeats the background, so that can be shortened. Did she say anything about our research method?

SARAH: Only that we should explain why we compared national data with two local projects. I can add one sentence on that.

TOM: Fine. The conclusion worries me more. It feels weak.

SARAH: It is weak. We basically repeat the introduction and summarise everything we've already said. A conclusion should draw the evidence together and make recommendations.

TOM: What kind of recommendations? More research funding?

SARAH: Research is important, but it's too general. We could recommend that governments set mandatory renewable-energy targets — perhaps sixty percent renewable electricity by 2035.

TOM: Would sixty percent be realistic for every country?

SARAH: Not necessarily. We can present the figure as an example and say targets must reflect local resources. The important point is that the targets should be mandatory rather than voluntary.

TOM: All right. I also think we should recommend increased investment in grid infrastructure. Several sources describe the grid as the bottleneck: generating more power is no use if the network cannot move it to consumers.

SARAH: That's more specific. Let's make those our two principal recommendations and mention household conservation only briefly.

TOM: One more thing: Professor Jenkins asked for a map showing wind-farm locations in the regions we compare. Did you see the draft I uploaded?

SARAH: I saw an outline, but it didn't have any place names on it.

TOM: That's the problem. I created the base map and plotted the locations, but the labels are not positioning correctly. Some cover the symbols and others disappear beyond the edge.

SARAH: Which software did you use?

TOM: GeoPlot. I considered moving the map into a drawing program, but that would make the scale less reliable.

SARAH: Keep it in GeoPlot. I used the same programme for my geography project last term. There is a setting that places labels on separate layers, so I should be able to fix it.

TOM: Excellent. Could we work on it on Wednesday afternoon?

SARAH: I have a laboratory class then. Thursday would be better. I can book a computer with the programme installed.

TOM: The media room has large screens, but it closes early on Thursdays.

SARAH: Let's use the library instead. The second floor has the right software, and it's usually quiet at two o'clock.

TOM: Thursday at the library at two, then. Before we meet, I'll revise the wind section and send you the government report.

SARAH: And I'll rewrite the introduction and draft the recommendations. If we finish the map on Thursday, we can proofread the whole report on Friday.

TOM: Perfect. That still gives us two days before the deadline.`,
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
            { num: 29, answers: ['programme', 'program'], maxWords: 1 },
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
      transcript: `Today I want to examine one of the planet's most diverse and threatened ecosystems: coral reefs. I will begin with the organisms that build a reef, then explain bleaching and other pressures, and finally consider what conservation can and cannot achieve.

People sometimes compare reefs with underwater cities, and the comparison is useful because so many organisms find food and shelter there. Coral reefs cover less than one percent of the ocean floor, yet they support approximately twenty-five percent of all known marine species. That figure includes fish that remain on a reef throughout life as well as species that use it only while they are young. Reefs also reduce wave energy before it reaches a coast, so their value is ecological, social, and economic.

We should first correct a common misconception: corals are animals, not plants or coloured rocks. Each individual coral animal is called a polyp. A polyp has a simple body with a mouth surrounded by tentacles. Many reef-building polyps live together in colonies. They secrete a hard calcium carbonate skeleton beneath their living tissue. Over thousands of years, new layers grow upon the remains of earlier colonies and gradually form the reef structure.

The animal alone does not explain the rapid growth of tropical reefs. Inside its tissues live tiny algae commonly called zooxanthellae. The relationship is symbiotic, which means both partners benefit. Through photosynthesis, the algae provide the coral with up to ninety percent of its energy. The coral, in return, gives the algae nutrients, carbon dioxide, and a protected position close to sunlight. This arrangement explains why major reef-building corals are generally found in clear, shallow water rather than in dark ocean depths.

The partnership is productive but sensitive. If water temperature remains even slightly above the usual summer maximum — sometimes by only one degree Celsius — the coral becomes stressed and expels the algae. The event is known as coral bleaching. Because much of a coral's colour comes from the algae, the transparent tissue then reveals the white skeleton below. In other words, the coral turns white.

Bleaching does not mean that every affected coral is already dead. If normal conditions return quickly, algae can recolonise the tissue and the colony may recover. Prolonged heat, however, leaves the coral without its principal energy source. Growth and reproduction slow, disease becomes more likely, and the colony may eventually die. Marine heatwaves have made mass bleaching events more frequent, and a reef that survives one event may have too little time to recover before the next.

Temperature is not the only pressure. As the ocean absorbs carbon dioxide, its chemistry changes in a process called ocean acidification. This reduces the availability of the chemical components corals use to build calcium carbonate and can weaken reef growth. Acidification is different from bleaching, although the two stresses can occur together.

Local physical damage can be equally visible. Boat anchors may break branching corals in seconds. Careless tourist divers can strike or stand on living colonies. Destructive fishing practices, including blast fishing, damage the reef framework while killing the target fish. Run-off from land adds sediment and nutrients, reducing light or encouraging algae that compete with young corals.

Biological threats also matter. The crown-of-thorns starfish is a natural coral predator, but population outbreaks can remove living tissue across large areas. The animal should not be confused with an invasive plant; it is a native starfish on many Indo-Pacific reefs. Outbreaks may become more severe when excess nutrients increase survival of its larvae or when predators are removed, although the causes vary among locations.

Conservation therefore operates at several scales. Marine protected areas can restrict fishing, anchoring, and other damaging activities in important zones. Better wastewater treatment can improve water quality, while visitor moorings give boats an alternative to dropping anchors. These local measures cannot stop an ocean heatwave, but they may leave a reef healthier and better able to recover.

Restoration is another approach. In coral gardening programmes, fragments are grown in underwater or land-based nurseries and later transplanted onto damaged reefs. Scientists are also testing heat-tolerant corals and assisted breeding. Such projects can restore selected sites, but they are expensive and cover only small areas compared with the scale of reef loss.

The central lesson is that restoration is not a substitute for prevention. Local pollution and physical damage must be reduced, while global carbon emissions determine the long-term intensity of warming and acidification. The challenge is significant, but many conservationists argue that immediate action at both levels can still prevent the worst outcomes.`,
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

Glass also travelled through long-distance trade. Fragments found far from the furnaces where they were made show that finished vessels and raw glass moved between workshops around the Mediterranean. Production was therefore not a single local craft: primary centres could melt the basic material, while secondary workshops reheated and shaped it for regional customers. Because broken glass could be melted again, cullet — clean fragments from earlier objects — became a valuable part of the batch. Reusing it lowered the temperature needed in the furnace and reduced demand for new raw materials.

By the eleventh century, Venice had established itself as the European capital of glassmaking. The island of Murano, to which the glassblowers were relocated in 1291 — ostensibly to reduce the risk of fire in Venice itself — became synonymous with high-quality glass. Venetian craftsmen jealously guarded their techniques; it was reportedly punishable by death to reveal the secrets of the trade to outsiders.

The next great innovation came in 1674, when Englishman George Ravenscroft added lead oxide to the glass mixture. The resulting lead crystal glass was heavier and had a higher refractive index, giving it exceptional brilliance and making it ideal for decorative pieces such as chandeliers and fine tableware.

The industrialisation of glass production in the nineteenth and twentieth centuries made glass ubiquitous. The development of plate glass through the float glass process — in which molten glass is floated on a bed of molten tin to produce perfectly flat sheets — transformed architecture, making possible the vast glass facades of modern buildings.

Before the float process, making a large window with an even surface was slow and expensive. Cylinders of blown glass were cut open and flattened, or sheets were ground and polished after casting. Both methods required skilled labour and could leave visual distortions. Continuous float production removed much of that finishing work. The ribbon of glass advances steadily across the tin, where gravity and surface tension create parallel faces, before it enters a controlled cooling chamber. Thickness can be adjusted without abandoning continuous production, which helps explain why the method serves buildings, vehicles, mirrors, and many other industries.

Today, glass science continues to advance. Borosilicate glass, developed in the late nineteenth century, resists thermal shock and is used in laboratory equipment and cookware. Optical fibre, made from extremely pure glass, has revolutionised telecommunications. And scientists are developing smart glass that can change its transparency in response to electrical signals, with applications ranging from privacy windows to energy-efficient building design.

This versatility comes from controlling composition and cooling rather than from relying on one universal recipe. Small changes in ingredients can alter colour, strength, refractive behaviour, or resistance to chemicals. Cooling is equally important: if the outer surface contracts much faster than the interior, stresses may remain in the finished object. Manufacturers manage those stresses through carefully timed heating and cooling, or deliberately create them when producing strengthened glass.

Glass presents an environmental trade-off. Furnaces require high temperatures and consequently large amounts of energy, yet the material can be recycled repeatedly if colours and contaminants are properly separated. A recycled bottle does not have to become another bottle; it may be used in insulation or construction products. However, specialised coatings and mixed materials can make recovery difficult. The long history of glass is thus not simply a sequence of inventions. It is also a continuing attempt to balance optical quality, mechanical performance, production cost, and the resources consumed in manufacture.`,
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

Pollination is not guaranteed whenever a bee lands on a flower. Pollen must be collected from the male part of one flower and deposited on a receptive female surface of another compatible flower. A visitor that takes nectar without touching these structures may contribute little. Body size, hair density, foraging behaviour, and the frequency with which an insect moves between plants all influence effectiveness. For this reason, a farm may receive a better service from a diverse community of wild and managed bees than from a large population of one species alone.

Honeybees have one advantage that humans have learned to exploit: colonies can be transported in hives and placed beside crops during flowering. Their communication also helps workers concentrate on profitable food sources. A returning forager performs movements commonly described as a waggle dance, which convey information about the direction and approximate distance of a resource. Yet honeybees are not the best pollinators in every setting. Some bumblebees release firmly held pollen by vibrating their flight muscles, a technique known as buzz pollination that is especially effective for crops such as tomatoes. Other native bees remain active in cooler conditions when honeybee activity is limited.

Bee populations globally are under considerable pressure. Among the key threats are habitat loss due to agricultural intensification, the widespread use of pesticides — particularly neonicotinoids, which impair bees' navigation and memory — and the spread of pathogens such as the Varroa mite, which parasitises honeybee colonies. Climate change adds further stress, disrupting the synchrony between bee emergence and flower bloom.

Measuring decline is complicated. Managed honeybee colonies are counted by beekeepers, but those figures can rise when new colonies replace lost ones and therefore do not directly reveal the condition of wild species. Wild bees are much harder to monitor because many nest underground, live alone, or are active for only a short period each year. A reduction in total abundance can also hide a shift in composition, with a few adaptable species becoming common while specialists disappear. Long-term surveys must consequently record both the number of insects and which species are present.

The decline in bee populations has prompted urgent conservation efforts. These include the creation of wildflower corridors along roads and field margins; the banning or restriction of certain pesticides in several countries; and the promotion of garden planting schemes to support urban bee populations. Research into disease-resistant honeybee strains and the development of artificial pollination technologies also continues, though many scientists argue that these cannot substitute for natural pollinator communities.

Effective conservation needs continuity as well as quantity. A field margin that flowers for two weeks may provide a temporary feast but leave insects without food later in the season. Planners therefore try to combine plants with different flowering periods and preserve nesting sites such as bare ground, hollow stems, and undisturbed banks. The wider lesson is that crop production and biodiversity are not separate concerns. Protecting a range of pollinators can make food systems more resilient when weather, disease, or land use reduces the contribution of any single species.`,
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
            { num: 21, answers: ['patterns'], maxWords: 1 },
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

The way a choice is described can matter as much as its default. A medical treatment may appear more attractive when its outcome is expressed as a survival rate than when the same evidence is presented as a mortality rate. This framing effect creates a problem for the ideal of stable preference: if two descriptions are logically equivalent, a strictly rational decision-maker should treat them alike. In practice, the reference point made prominent by the wording can change what feels like a gain or a loss.

Researchers have also asked whether experience eliminates bias. Expertise helps when people receive repeated, timely feedback and can learn regular patterns, as may happen in some technical tasks. It is less protective when outcomes are rare, delayed, or influenced by chance. Confidence can then grow faster than accuracy. Organisations sometimes respond by using checklists, independent estimates, or structured comparisons that make the reasoning process visible before a group reaches a decision. These methods do not remove intuition; they create occasions for slower analysis to test it.

Critics of nudging argue that it is paternalistic, manipulating people's choices without their knowledge or consent. Others question whether short-term nudges can address deeply ingrained habits. A further concern is transparency: an intervention designed to help can also serve the interests of the organisation that controls the choice environment. Supporters reply that no environment is neutral, because options must always be ordered, labelled, or given defaults. On this view, the relevant questions are who sets the design, what evidence supports it, and whether people can easily choose otherwise.

The debate has shifted attention from whether humans are perfectly rational to when particular decision tools succeed or fail. Behavioural economics — which applies insights from psychology to economic models — has transformed the study of human behaviour and is now embedded in government, business, and healthcare policy. Its strongest claim is not that one bias explains every choice. Rather, predictable features of attention, memory, and comparison should be tested alongside incentives and information when institutions design decisions.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r3-summary',
          part: 7,
          qRange: [27, 33],
          groupLabel: 'Complete the summary.\nChoose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `Traditional models of decision making were based on {{27}} choice theory, which assumed people always maximise their benefit.

Research by Kahneman and Tversky showed that humans use mental shortcuts called {{28}}, leading to systematic errors known as {{29}}.

The availability heuristic means people overestimate events whose examples come easily to {{30}}.

{{31}} aversion explains why people often keep failing investments longer than they should.

System 1 operates largely outside {{32}} awareness, whereas System 2 is slow and deliberate.

The idea of {{33}} involves designing choice environments to promote better decisions.`,
          blanks: [
            { num: 27, answers: ['rational'], maxWords: 1 },
            { num: 28, answers: ['heuristics'], maxWords: 1 },
            { num: 29, answers: ['cognitive biases'], maxWords: 2 },
            { num: 30, answers: ['mind'], maxWords: 1 },
            { num: 31, answers: ['loss'], maxWords: 1 },
            { num: 32, answers: ['conscious'], maxWords: 1 },
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
          stimulusLabel: 'The bar chart below shows global sales of four different kinds of digital games between 2000 and 2006.',
          stimulus: '',
          imageUrl: '/ielts/images/writing-set2-task1-games.png',
          imageAlt: 'Bar chart of global sales in billions of dollars for mobile phone, online, console and handheld games from 2000 to 2006',
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
