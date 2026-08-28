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
      transcript: `RECEPTIONIST: Good morning, Riverside Sports Centre. How can I help?

CUSTOMER: Hello. I’d like to book a tennis court for this weekend, and perhaps arrange a lesson as well.

RECEPTIONIST: Certainly. I’ll create the booking first. Can I take your name?

CUSTOMER: Daniel Harris.

RECEPTIONIST: Is that H-A-R-R-I-S?

CUSTOMER: Yes. And my mobile is 078 5501 3742.

RECEPTIONIST: Let me read that back: 078 5501 3742. Fine. Would you like us to send the confirmation by text?

CUSTOMER: A text is best. My email account is full at the moment.

RECEPTIONIST: Which day were you considering? Sunday morning is fairly quiet.

CUSTOMER: It has to be Saturday. Two of the players work on Sundays, and we’d prefer the afternoon.

RECEPTIONIST: Court 1 is free at eleven, but that’s outdoors. Court 3, which is indoors, is available from two until four.

CUSTOMER: Court 3 sounds ideal. There will be four players altogether. I originally expected six, but two can’t come.

RECEPTIONIST: The normal court charge is £12 per hour, so two hours would be twenty-four pounds. Lighting is included.

CUSTOMER: Do members pay less?

RECEPTIONIST: They receive a twenty percent court discount. Annual membership costs £65. It includes the gym and swimming pool, but coaching and equipment hire are charged separately.

CUSTOMER: I probably won’t join today. I’m only here for three months, so the discount wouldn’t repay the fee.

RECEPTIONIST: In that case I’ll leave the court at the standard price.

CUSTOMER: Two of us need rackets. Is there a deposit?

RECEPTIONIST: No deposit, just £2.50 per racket for the session. Please collect them from the equipment room beside the main entrance, not from reception. You’ll need to leave a driving licence or another piece of identification until they’re returned.

CUSTOMER: Fine. Now, could we also arrange a lesson?

RECEPTIONIST: Our head coach, Mr Patel, works on Saturday morning from 10–12. He has one space at eleven thirty.

CUSTOMER: That’s too early. We wanted advice while the four of us are on court.

RECEPTIONIST: Ms Carter can come at 2:30. She usually teaches beginners, but she also runs group sessions for experienced social players.

CUSTOMER: We’re somewhere in the middle, so she should be fine.

RECEPTIONIST: Would you like thirty minutes? Many groups use the second half-hour to practise independently.

CUSTOMER: We’ve booked the court for two hours, so let’s have one hour of coaching and then one hour by ourselves.

RECEPTIONIST: Done. Coaching is not included with membership, by the way, so everyone pays the same lesson fee.

CUSTOMER: Can we borrow tennis balls too?

RECEPTIONIST: Ms Carter supplies balls during the lesson. If you continue afterwards, a tube costs four pounds at the desk. We don’t hire those because opened tubes lose pressure.

CUSTOMER: Fine. When do I need to pay?

RECEPTIONIST: Pay for the court now using the link in your text. Coaching and rackets can be paid for when you arrive. If you cancel more than twenty-four hours ahead, the court fee is refunded; after that, we can only move the booking.

CUSTOMER: That’s clear. Thank you for your help.

RECEPTIONIST: You’re welcome. Please arrive ten minutes early so the equipment doesn’t delay your lesson.`,
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
            { num: 1, answers: ['078 5501 3742'], maxWords: 2 },
            { num: 2, answers: ['Saturday'], maxWords: 1 },
            { num: 3, answers: ['four'], maxWords: 1 },
            { num: 4, answers: ['12'], maxWords: 1 },
            { num: 5, answers: ['65'], maxWords: 1 },
            { num: 6, answers: ['2.50'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          headers: ['Coach', 'Availability on Saturday', 'Session length booked', 'Included with membership'],
          rows: [
            ['Mr Patel', { num: 7, answers: ['10–12'], maxWords: 1 }, 'N/A', 'No'],
            ['Ms Carter', { num: 8, answers: ['2:30'], maxWords: 1 }, { num: 9, answers: ['one hour'], maxWords: 2 }, { num: 10, answers: ['not included'], maxWords: 2 }],
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
      transcript: `Welcome to Greenfield University. I’m James, one of the student advisers, and this talk covers the services students most often need during their first month. You’ll receive a campus map afterwards, so I’ll focus on when and how to use each place rather than list every building.

Let’s begin with the main library. It opens seven days a week. On weekdays the hours are eight in the morning until 10 p.m.; at weekends it opens an hour later and closes at six. The doors do not close at six on weekdays, as an old online guide states, but you must scan your student card after 6 p.m. Visitors can enter only while the reception desk is staffed.

The library holds more than four hundred thousand printed books as well as electronic journals and databases. If an item is on loan, you may reserve it through the catalogue. If the university does not own it, request an inter-library loan. Most printed loans arrive in three to five working days, although overseas material can take longer. Articles are often supplied electronically. There are also bookable study rooms on floors two and three; please cancel a room if your group no longer needs it.

The Student Support Centre is in the Fleming Building, immediately left of the main gate. It provides academic advice, welfare support and financial guidance. It does not arrange sports memberships or issue library loans, even though students sometimes queue there for those services. Financial advisers can explain bursaries and budgeting, but they cannot lend money directly. The centre also runs peer mentoring, pairing trained second- or third-year volunteers with new students. Participation is optional and what you discuss remains private unless there is a serious safety concern.

For healthcare, register online before you become ill. The health centre stands on the south side of campus next to the sports hall—not beside the science laboratories, as it appears on maps printed before last year’s move. Routine appointments can be booked online or by phone. A pharmacist visits on Tuesdays and Thursdays; on other weekdays prescriptions are sent to a pharmacy in town. Urgent problems should still go through the regional emergency service rather than waiting for the campus clinic.

Students living in university halls should contact their warden first about noise, lost keys or shared facilities. Maintenance faults such as a water leak should also be reported through the online form so the repair team receives the room number. Every hall has a common room open until midnight. Kitchens remain accessible later, but social events must finish at the published time. Private renters can ask the accommodation office for general guidance, although the university cannot negotiate a contract for them.

Finally, the free shuttle links north campus, main campus and the train station. It runs every 15 minutes between seven in the morning and 11 p.m. on weekdays. Saturday buses run every half-hour and finish at nine; there is no Sunday service outside examination periods. You do not reserve a seat. Show your student card when boarding, and remember that large bicycles are not carried at busy times.

If you commute by car, buy a permit before using a staff area. Parking inspectors begin work from the first teaching day, not after orientation week. Covered cycle stores are free, and the transport office can mark your bicycle with a security number on Wednesday afternoon.

Those are the main services. We’ll now divide into small groups for the walking tour. Keep this sheet: it contains phone numbers and a QR code linking to current opening times, which may change during holidays.`,
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
            { num: 13, answers: ['10 p.m.'], maxWords: 2 },
            { num: 14, answers: ['6', 'six'], maxWords: 1 },
            { num: 15, answers: ['three to five'], maxWords: 3 },
            { num: 16, answers: ['sports hall'], maxWords: 2 },
            { num: 17, answers: ['Thursdays'], maxWords: 1 },
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
      transcript: `SARAH: Hi, Tom. Did you read Professor Jenkins’s comments on our renewable-energy report?

TOM: Twice. The overall mark was encouraging, and she said our solar section explained costs clearly. The wind section needs work, though.

SARAH: Her note says “evidence too general”. I thought she meant we had too few statistics.

TOM: I asked her after class. It’s the opposite: we list national percentages but don’t show how a real project handled practical problems. She wants case studies, not another page of figures.

SARAH: That makes sense. Have you found one we can use?

TOM: A report about an island electricity system. Wind power supplies more than half of its annual electricity, but on very windy nights production can exceed local demand. The operators use a battery and ask a water-treatment plant to shift some work to those hours.

SARAH: Good. It shows that generation and demand have to be balanced. We should mention that the headline figure doesn’t mean wind supplies every moment.

TOM: Exactly. I also found a solar village example, but adding both would take us beyond the word limit.

SARAH: Then let’s revise the existing wind section around the island example rather than create a completely new section. We can save the solar village for the presentation.

TOM: Agreed. What did you make of the comment on our introduction?

SARAH: The background is fine, but the thesis is vague. We say renewables are “important” without stating what the report evaluates. I’ll rewrite the last sentence to say that a reliable transition needs generation, storage and network planning.

TOM: Good. The conclusion is weaker. It only summarises points we’ve already made.

SARAH: Yes, and the assignment asks for recommendations. We could propose mandatory renewable-energy targets, but our first draft said sixty percent by 2035 for every country. That’s too rigid because starting points differ.

TOM: How about recommending that governments publish binding targets with dates, while allowing the percentage to reflect local resources?

SARAH: Much better. Our second recommendation should be increased investment in grid infrastructure. Remote wind farms are little use if transmission lines cannot carry their output to cities.

TOM: Should storage be a separate recommendation?

SARAH: Perhaps an example under grid planning. We only have two hundred words for the conclusion, and three equally large recommendations would feel rushed.

TOM: Fine. Now, the tutor asked for a map of wind-farm locations. I imported the coordinates, but the map looks awful.

SARAH: Are the points in the wrong place?

TOM: The locations are accurate. The problem is the labels: several names overlap near the coast, while offshore sites have too much empty space around them.

SARAH: The programme can move labels automatically if you set a priority. I used the same programme for my geography project last term.

TOM: I tried changing the font size instead, which made everything unreadable. Could you show me the priority tool?

SARAH: Of course. We also need a scale and a source beneath the map. Professor Jenkins said a decorative map without those elements would not count as evidence.

TOM: I have the source information in my notes. What about colour? Red for offshore and blue for onshore?

SARAH: Avoid red and blue alone because some readers won’t distinguish them. Let’s use different symbols as well as colour and check the printout in greyscale.

TOM: Good point. Can we meet on Thursday?

SARAH: Yes. The computer lab is booked for an exam, so let’s use the library. Two o’clock?

TOM: Perfect. I’ll revise the wind section before then. You’ll do the introduction, and we can write the recommendations together after the map.

SARAH: And we should leave Friday for references. Two of the web links in our first draft led only to press releases, so I’ll replace them with the full reports.

TOM: Great. I feel much clearer about the feedback now.`,
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
          text: 'In Tom’s island case study, more than half of annual electricity comes from',
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
            { num: 28, answers: ['labels'], maxWords: 1 },
            { num: 29, answers: ['programme'], maxWords: 1 },
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
      transcript: `Today’s lecture examines coral reefs as living structures: how they are built, why warming damages them and what restoration can realistically achieve.

Reef-building corals occupy tropical and subtropical seas where light can reach shallow water. Reefs cover less than one percent of the ocean floor, yet estimates suggest that they support about a quarter of marine species at some stage of life. Fish find shelter and feeding grounds in their complex surfaces, and people depend on reefs for fisheries, tourism and protection from waves. Those benefits come from a structure produced by very small animals.

A coral colony is made up of individual polyps. Each polyp has a mouth surrounded by tentacles and secretes a calcium carbonate skeleton beneath its living tissue. New polyps grow on material left by earlier generations, so the three-dimensional reef develops slowly over long periods. A storm can break branches in a few hours, whereas rebuilding the same complexity may take decades.

Inside the tissues live microscopic algae, often described by the older general name zooxanthellae. The algae photosynthesise and transfer compounds that can provide most of the coral’s energy—under favourable conditions, up to about ninety percent. In return, the coral offers nutrients, shelter and access to sunlight. Corals also capture food with their tentacles, but the partnership with algae helps explain why major reef systems occur in clear, well-lit water.

That partnership is sensitive to stress. When water temperature remains unusually high, the chemical process of photosynthesis can become damaging. The coral expels many of its algae, revealing the pale skeleton through transparent tissue. The colony consequently appears white, a condition called bleaching. A bleached coral is not necessarily dead; if temperature returns to a tolerable range soon enough, algae can repopulate it. Prolonged or repeated heat reduces growth and reproduction and can lead to mortality. This distinction matters when news reports treat every white colony as already lost.

Warming is not the only pressure. As the ocean absorbs carbon dioxide, seawater chemistry changes through acidification. The result reduces the availability of carbonate ions that corals use to build skeletons, making growth and repair more difficult. Local pollution can add nutrients that encourage algal growth over the reef. Sediment from construction or damaged land may block light and smother young colonies.

Direct physical damage also occurs. Anchors can crush branching coral, careless contact by swimmers or divers can break it, and destructive fishing practices such as explosives destroy both habitat and the fish being targeted. Ordinary fishing can alter the ecological balance too if it removes species that graze competing algae. Managers therefore have to regulate activities beyond the exact patch where coral is growing.

Crown-of-thorns starfish feed naturally on coral tissue. They belong in Indo-Pacific reef ecosystems, so calling the species universally invasive is misleading. The problem is an outbreak in which their numbers rise high enough to consume coral faster than it recovers. Nutrient runoff and removal of predators have been proposed as contributing factors in some places, although causes vary and remain under study.

Conservation works at several scales. Marine protected areas can limit fishing and anchoring, but a boundary cannot prevent marine heatwaves. Improving water quality and protecting herbivorous fish may give colonies a better chance to recover after heat stress. At the global level, limiting greenhouse-gas emissions remains essential because local management cannot hold temperature constant.

Restoration is a supplement, not a replacement for those measures. Coral gardening programmes grow fragments in nurseries and attach them to damaged sites. Researchers are testing which colonies tolerate heat and whether selective breeding or assisted movement can increase resilience. The work is expensive, and transplanted coral still faces the conditions that damaged the original reef. Success should be measured through survival, reproduction and restored habitat complexity, not simply by counting fragments on planting day.

The central lesson is that a reef is neither an underwater rock nor a garden that can be replanted once and forgotten. It is a biological partnership embedded in a wider food web. Protecting it requires lower global heat stress, better local conditions and long-term observation of what actually survives.`,
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
• Outbreaks of the crown-of-thorns {{40}}.`,
          blanks: [
            { num: 31, answers: ['species'], maxWords: 1 },
            { num: 32, answers: ['polyps'], maxWords: 1 },
            { num: 33, answers: ['calcium'], maxWords: 1 },
            { num: 34, answers: ['algae'], maxWords: 1 },
            { num: 35, answers: ['energy'], maxWords: 1 },
            { num: 36, answers: ['temperature'], maxWords: 1 },
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
      passage: `The History of Glass

Humans used a natural glass long before they learnt to manufacture it. Obsidian forms when volcanic material cools so rapidly that crystals have no time to grow. Its sharp fracture made it useful for blades, although its composition and origin differ from those of later vessel glass. Archaeological labels can therefore be confusing: early beads may contain glassy glazes, while objects commonly identified as deliberately manufactured glass appear in Mesopotamia around 1600 BCE. Glass vessels became established somewhat later in Egypt and the eastern Mediterranean.

The durable recipe combines silica, usually obtained from sand, with an alkali that lowers the melting temperature and lime that improves stability. Ancient furnaces could not produce the chemically uniform material expected today. Iron and other impurities often coloured a batch blue-green, and makers added minerals to obtain stronger colours deliberately. A workshop might produce raw glass in bulk and send it elsewhere to be shaped, so an excavated object does not always reveal where the glass itself was made.

Early vessels were labour-intensive. Craftspeople wound hot glass around a removable core or pressed it into moulds, methods suited to small containers owned by wealthy households. A decisive change came with glassblowing in the eastern Mediterranean during the first century BCE. A gather of molten glass on the end of a hollow tube could be inflated, rotated and tooled into a vessel far more quickly. Blowing did not make every object cheap, but it greatly expanded both output and the variety of forms available across the Roman world.

After Roman political control declined in western Europe, glassmaking did not simply disappear. Workshops in the Byzantine and Islamic worlds developed their own combinations of cutting, coloured enamels and gilding. Knowledge also travelled with workers and trade. This uneven history is important: there was no single straight line in which one centre invented every improvement and passed it permanently to the next.

Venice became a major European centre, and in 1291 its authorities ordered furnaces moved to the island of Murano. Fire prevention in the densely built city was the stated reason. Concentrating furnaces also made regulation easier, and the republic later restricted the movement of skilled workers and technical knowledge. Murano’s reputation rested on both control and innovation. By the fifteenth century, Venetian glassmakers were producing a notably colourless glass called cristallo as well as elaborate coloured and filigree vessels.

In England, George Ravenscroft patented a new formula in 1674 that used lead oxide. Lead crystal was stronger than fragile Venetian-style wares and had a high refractive index, so cut surfaces scattered light with unusual brilliance. It became especially suitable for decorative tableware and chandeliers. Continental makers achieved other effects with different recipes; “better glass” never meant a single composition for every purpose.

Industrial production changed the scale of the material. Window glass had long been flattened by spinning or opening a blown cylinder, but these methods left distortions and required polishing for the finest sheets. In the twentieth century, the float glass process transformed the industry. A continuous ribbon of molten glass travels across molten tin, whose level surface allows both faces to become flat and parallel. The result is a uniform sheet that needs little additional grinding and can be made in the vast dimensions used by modern architecture.

Specialisation has continued. Borosilicate glass, developed in the late nineteenth century, expands relatively little when heated and therefore resists thermal shock; it is valuable in laboratories and cookware. Optical fibre carries light through extremely pure strands, enabling high-capacity telecommunications over long distances. Smart glass can alter its transparency in response to an electrical signal, controlling glare, privacy or solar heat without a curtain. These products look different, but all depend on the same ability to adjust a disordered silica-based structure by changing its ingredients and manufacture.

Glass also illustrates a modern trade-off. It can be recycled repeatedly if colour and contamination are controlled, and recovered glass lowers the energy needed to melt a new batch. Yet specialised coatings, laminates and mixed products are harder to separate. The history of glass is consequently not finished: the latest challenge is to preserve its remarkable performance while designing products that can return efficiently to the furnace.`,
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
          text: 'Objects widely accepted as deliberately manufactured glass appeared in Mesopotamia around 1600 BCE.',
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
      passage: `Bees and Pollination

Pollination is the transfer of pollen to the part of a flower where fertilisation can occur. Wind performs the task for crops such as wheat, while birds, bats and many kinds of insect move pollen for other plants. Bees are especially important visitors, but popular statistics require care. About 35 percent of the world’s food crops benefit from animal pollinators; this does not mean that bees alone produce one third of the total human food supply. Staple crops can be wind-pollinated, and the contribution of animals varies from essential fruit set to a modest improvement in yield or quality.

Bees are effective because their bodies have branched, feathery hairs that trap grains as they move through a flower. Many species also possess structures for carrying a concentrated load. Bumblebees and honeybees pack moistened pollen into corbiculae, smooth-edged baskets on their hind legs. Some solitary bees use a dense brush of hair, called a scopa, on the abdomen or legs. Pollen stored for transport may be less likely to reach another flower, however, so the visible size of a load is not a complete measure of pollination.

The exchange is often described as mutualism. A plant gains transport for its pollen, while the visitor gathers food. Nectar mainly supplies carbohydrates for energy. Pollen provides proteins and fats needed for growth, particularly larval development. The interests of plant and bee are not perfectly identical: the bee seeks to collect as much food as possible, whereas the plant benefits when at least some grains escape collection and reach another compatible flower.

Flowers influence this encounter through colour, shape and odour. Nectar guides are patterns that point towards the nectary; some reflect ultraviolet light that humans cannot see. Flowers may also release distinctive scent compounds. In a more extreme strategy, certain orchids mimic the scent or appearance of a female bee. A male seeking a mate contacts the flower’s pollen and may carry it to the next deceptive bloom, even though the plant supplies no food reward.

Physical fit matters. A long-tongued bee can reach nectar at the base of a deep tube, while a short-tongued visitor may be excluded or may pierce the flower from the side without pollinating it. Bumblebees can also perform buzz pollination: vibration from their flight muscles shakes pollen out of flowers such as tomatoes. Honeybees do not use this technique. Diversity is therefore functional, not merely decorative; a crop visited by several kinds of bee may retain pollination when weather or disease reduces one group.

Managed honeybee colonies and wild bees play different roles. Beekeepers can transport hives to a flowering crop at the required time, providing a large workforce. Wild species may forage in cooler conditions, visit different parts of a flower or carry pollen more effectively for particular plants. Researchers do not rank every solitary bee as more efficient than every social bee. Performance depends on the crop, climate, abundance and behaviour of the species involved.

Threats also differ. The Varroa mite parasitises honeybee colonies and transmits viruses, but it is not the main explanation for every decline in wild bees. Habitat loss removes nesting places and a continuous supply of flowers. Pesticide risk depends on toxicity, dose and exposure; some neonicotinoids can impair navigation and memory under particular conditions. Climate change can disrupt the timing between bee emergence and flowering, and extreme heat or drought can reduce both forage and nesting success. These pressures may interact rather than act independently.

Conservation consequently needs more than a row of ornamental flowers. Wildflower corridors and field margins can connect habitat, but they should contain locally suitable plants that bloom at different times. Bare ground, hollow stems and undisturbed banks provide nests for species that do not live in hives. Farmers can reduce exposure by avoiding pesticide application while crops are in bloom and by using targeted controls only when necessary. Urban gardens can help too, provided that attractive non-native flowers do not replace all native resources.

Artificial pollination may be useful in enclosed systems or during a local emergency, yet machines must still collect, store and deliver viable pollen at the right stage of flowering. Replacing an adaptable community of insects across a landscape would be technically demanding and costly. Protecting pollinators is therefore less about preserving one famous species than maintaining the varied relationships among plants, insects and land management on which reliable harvests depend.`,
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
      passage: `The Psychology of Decision Making

Many institutions are built around a simple model of choice. A person identifies the available options, estimates their costs and benefits, and selects the one that best serves a goal. This family of assumptions is often called rational choice theory. It has shaped economics, but its influence also reaches political science and sociology. The model can predict behaviour at an aggregate level without claiming that every individual performs a conscious calculation before buying lunch or crossing a road.

Psychologists Daniel Kahneman and Amos Tversky studied what happens when people judge probabilities under uncertainty. Their experiments did not show that human thought is random. Instead, people often use heuristics: efficient mental shortcuts that work well in familiar settings but can produce systematic mistakes elsewhere. Those predictable patterns are called cognitive biases. A shortcut may be sensible when time is limited, so identifying a bias is not the same as declaring the decision-maker unintelligent.

Consider availability. When estimating how common an event is, people are influenced by how easily examples come to mind. A dramatic accident repeated in news reports is easy to recall, while thousands of uneventful journeys leave little memory. The resulting judgement may reflect the vividness of the example rather than the frequency recorded in data. Availability can be useful—recent experience sometimes signals a changing risk—but publicity and personal experience can make an unusual event seem typical.

Anchoring describes a different influence. An initial number can pull later estimates towards it even when it provides no relevant evidence. In a well-known demonstration, participants saw a wheel stop at either 10 or 65 and were then asked about the percentage of African countries in the United Nations. The wheel was arranged to produce those values, although participants were led to treat its result as random. Estimates differed substantially between the two groups. The number did not supply knowledge; it created a starting point that proved difficult to ignore.

Choice also depends on how outcomes are framed. In prospect theory, losses and gains are evaluated relative to a reference point rather than only by final wealth. Loss aversion means that a loss commonly has a stronger psychological impact than an equivalent gain. This helps explain why an investor may retain a falling asset to avoid admitting a loss, or why consumers react differently to a surcharge and a mathematically equal discount. It does not imply that every person rejects every gamble; size, probability and context still matter.

Kahneman later presented a useful contrast between two modes of thought. System 1 is fast, automatic and intuitive. It recognises a face, completes a familiar phrase and reacts to sudden danger with little conscious effort. System 2 is slower and deliberate, and is recruited for tasks such as checking a complex argument. The labels describe interacting processes, not two physical compartments in the brain. Most routine decisions rely heavily on System 1 because sustained analytical attention is limited.

Behavioural findings have moved from laboratories into public policy. Nudging changes the architecture in which a choice is made while leaving alternatives available. Pension enrolment is a common example. Where joining requires an active request, many employees postpone the decision. Changing the default so that workers are enrolled unless they opt out has increased participation and savings rates in several programmes. The financial options may be unchanged, but inaction now produces a different result.

Defaults are not automatically beneficial. The organisation choosing one could have commercial interests, and a default suitable for most people may harm a minority. Clear information, easy reversal and evaluation of real outcomes are therefore essential. A message that produces an immediate response may also fail to change a deeply ingrained habit once reminders end.

Criticism takes two principal forms. Some opponents call nudging paternalistic because officials may influence behaviour without people fully noticing the design. Others accept its aim but question long-term effectiveness: a small alteration in a form cannot by itself remove poverty, addiction or inadequate services. Supporters reply that no choice environment is neutral; forms, menus and websites must place something first. The practical issue is thus not whether design influences decisions, but who controls it, whose welfare is measured and whether people can genuinely choose another path. Transparent trials should publish failures as carefully as successes. Independent replication matters too.`,
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
            { num: 30, answers: ['recall'], maxWords: 1 },
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
          text: 'Participants in the anchoring demonstration were led to believe that the wheel result was random.',
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
          stimulusLabel: 'The bar chart below shows the percentage of commuters using five main forms of transport in Norchester in 2005, 2015 and 2025.',
          stimulus: '',
          imageUrl: '/assets/ielts/charts/set2-task1.svg',
          imageAlt: 'Grouped bar chart comparing the percentage of Norchester commuters travelling by car, bus, rail, bicycle and on foot in 2005, 2015 and 2025',
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
          stimulus: 'Universities should require every student to complete a practical project with a local business or community organisation before graduating. To what extent do you agree or disagree?',
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
            'Are you working or studying at the moment?',
            'What part of your work or studies do you find most interesting?',
            'Did you enjoy learning practical skills at school?',
            'Is there a skill you would like to learn this year?',
            'Who do you usually ask for advice when learning something new?',
            'Do you prefer learning by watching or by reading instructions?',
            'Have you ever taught another person how to do something?',
            'Do you think people need to keep learning throughout life?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn (3–4 minutes). Read the cue card and prepare for 1 minute, then speak for 1–2 minutes.',
          cueCard: `Describe a useful skill that you learned from someone of a different generation.

You should say:
• what the skill was
• who taught it to you
• how you practised it
• when you first used it independently

and explain why learning from this person was memorable.`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Two-way discussion (4–5 minutes). Discuss the following questions.',
          followUp: [
            'What kinds of knowledge are commonly passed between generations?',
            'Why are some young people reluctant to learn from older people?',
            'What can older people learn from younger generations?',
            'Has technology made intergenerational learning easier or more difficult?',
            'Should schools invite more community members to teach practical skills?',
            'How might longer working lives change the way generations learn from one another?',
          ],
        },
      ],
    },

  ],
};

export default mock;
