import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-12',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 12',
  subtitle: 'Coral Reef Decline · History of Chess · Social Media & Mental Health',
  timeMinutes: 164,
  sections: [

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-12.mp3',
      title: 'Listening — Section 1: Car-Park and Travel-Card Enquiry',
      instructions: 'You will hear a conversation between a customer and a transport office assistant. Listen and answer Questions 1–10.',
      transcript: `AGENT: Good morning, City Transport Office. You're speaking to Maya. How can I help?

CUSTOMER: Hello. I've just moved to the area and I'd like to ask about a parking permit and a travel card. I looked online, but I wasn't sure whether I needed two separate applications.

AGENT: You do, although we can deal with both during the same appointment. The permit is linked to your vehicle, whereas the travel card is personal. Let me take a few details first. Your name?

CUSTOMER: It's Daniel Foster.

AGENT: Could you spell your surname?

CUSTOMER: Yes — F-O-S-T-E-R.

AGENT: Thank you. And your address?

CUSTOMER: 8 Ashgrove Avenue — that's A-S-H-G-R-O-V-E.

AGENT: Fine. And the postcode?

CUSTOMER: It's NG2 6BX.

AGENT: And a phone number in case we need to contact you?

CUSTOMER: My mobile's 079 3358 4162. I am usually at work during the morning, so a text message is easier than a call.

AGENT: I've noted that. Now, the parking permit — which car park did you want?

CUSTOMER: The riverside one, please. Oh, sorry — no, I meant the station car park. That's the one nearest my flat. I keep confusing the names because both are beside the railway line.

AGENT: The station car park, fine. That permit is valid overnight as well as during the day. It doesn't guarantee a particular space, but residents can use any bay marked in blue.

CUSTOMER: That's fine. I mainly need somewhere to leave the car when I take the train to work.

AGENT: Just so you know, a warden checks the permits every day, including Sundays, so you'll need to display it clearly — on the windscreen, please, not on the dashboard.

CUSTOMER: On the windscreen. Got it. Does the permit start immediately?

AGENT: It starts on the date you choose. We can issue one for six or twelve months, and send a reminder shortly before it expires. You'll need your vehicle registration document, but not a printed utility bill because we can verify your address electronically.

CUSTOMER: Excellent. Now, what about the travel card?

AGENT: It's useful if you make several journeys — you can use it on the buses and the tram, right across the city. It isn't valid on regional trains, though.

CUSTOMER: That's exactly what I need. What do I have to do to apply?

AGENT: When you come in, just bring a recent photo of yourself and we'll print the card while you wait. A passport-sized colour image is best, but it doesn't need to be professionally taken.

CUSTOMER: Lovely. And how much do the cards cost?

AGENT: We have two options. The weekly card is £15, and it includes a free map of the network. That's popular with visitors because the map also shows the main interchange points.

CUSTOMER: I expect the longer one works out cheaper for commuting.

AGENT: Usually. The monthly card lasts thirty days and costs £58; with that one you also get discounts at a number of shops and cafés in the centre. Those offers change, so check the transport app rather than an old leaflet.

CUSTOMER: I'll go for the monthly, I think. Can I pay by card at the office?

AGENT: Yes, card or cash. If you bring the required documents and payment, we can sort everything out today. Our quieter period is between two and four in the afternoon.

CUSTOMER: Perfect. I'll come at about half past two. Thank you very much.

AGENT: You're welcome. See you later.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Car-Park and Travel-Card Enquiry',
          example: 'Name:  Daniel Foster',
          template: `Personal details
Address: 8 {{1}} Avenue
Postcode: NG2 6BX
Phone: (mobile) 079 3358 4162

Car-park permit
• The customer wants a permit for the {{2}} car park.
• A warden checks the permits every {{3}}.
• The permit must be displayed on the {{4}}.

Travel card
• The card can be used on buses and the {{5}}.
• To apply, the customer must bring a recent {{6}}.`,
          blanks: [
            { num: 1, answers: ['Ashgrove', 'ashgrove'], maxWords: 1 },
            { num: 2, answers: ['station'], maxWords: 1 },
            { num: 3, answers: ['day'], maxWords: 1 },
            { num: 4, answers: ['windscreen'], maxWords: 1 },
            { num: 5, answers: ['tram'], maxWords: 1 },
            { num: 6, answers: ['photo'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Card type', 'Length', 'Price', 'Includes'],
          rows: [
            [
              'Weekly card',
              '7 days',
              { num: 7, answers: ['15', '£15'], maxWords: 1 },
              { num: 8, answers: ['map'], maxWords: 1 },
            ],
            [
              'Monthly card',
              '30 days',
              { num: 9, answers: ['58', '£58'], maxWords: 1 },
              { num: 10, answers: ['discounts'], maxWords: 1 },
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-12.mp3',
      title: 'Listening — Section 2: Farm Open-Day Talk',
      instructions: 'You will hear a guide welcoming visitors to a farm open day. Listen and answer Questions 11–20.',
      transcript: `Hello everyone, and a warm welcome to Greenfields Farm on our annual open day. It's wonderful to see so many families here. Before I describe the programme, let me explain the coloured signs. Blue signs point to visitor facilities, yellow ones mark demonstrations, and red signs mean that an area is closed to the public. Please don't cross a red barrier, even if you can see a member of staff working beyond it.

Let me start by telling you what's new. This year, for the very first time, we've opened a farm shop selling our own produce, and we've built a large children's play barn for when the weather turns. The shop stocks vegetables, eggs and apple juice from the farm; refrigerated items will be kept for you until you leave. The play barn is supervised, but an adult must remain with children under eight. Some old favourites are still here too — the café has served visitors for over twenty years, the duck pond is where it's always been, and the tractor rides are running as usual, so don't worry.

Right, let me run through today's programme. All of our guided walks set off from the car park, just behind you, so please gather there ten minutes before the advertised time. There are two routes. The shorter route is suitable for pushchairs; the longer one crosses uneven ground and visitors should wear sturdy shoes.

One thing you mustn't miss is the sheepdog display. That begins at 11 in the top field and lasts about half an hour. The afternoon display is identical, so there is no need to attend both. Please remain behind the rope because the dogs work quickly and need a clear route around the flock.

After that, children are welcome to help feed the lambs in the small animal barn — they do love a bottle of milk. Numbers are limited, and free tickets are available from the information desk. Children must wash their hands as soon as the activity finishes.

Next to that is the dairy. Through the window, you can watch our staff making cheese in the traditional way, and there are samples to try. The viewing area is accessible by a ramp on the eastern side; the steps at the front are quite steep.

If you'd like to take something home, head down to the lower field, where you can pick your own strawberries — bring a basket if you have one. We weigh the fruit at the field gate. Please pick only from rows carrying a green marker, since the other rows are not yet ripe.

When you get hungry, hot food and drinks are served all day in a large tent near the main gate. Vegetarian meals are available. The café serves cakes and cold drinks, but it will be busiest between twelve and two.

A couple of reminders. We do have animals roaming freely, so please keep your dogs on a lead at all times. And do watch your children near the machinery. If you need first aid, go to the information desk beside the entrance, where a trained member of staff is on duty.

The farm closes at 5 pm today, and the vehicle gates close shortly after, so allow yourself plenty of time. Above all, enjoy your day — and ask any of our staff in green jackets if you need help. Thank you.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO attractions are new at the farm this year?',
          options: [
            { letter: 'A', text: 'the farm shop' },
            { letter: 'B', text: 'the café' },
            { letter: 'C', text: 'the children\'s play barn' },
            { letter: 'D', text: 'the duck pond' },
            { letter: 'E', text: 'the tractor rides' },
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
          title: 'Greenfields Farm — Open Day',
          template: `• The guided walks start from the {{13}}.
• The sheepdog display begins at {{14}} in the top field.
• Children can help to feed the {{15}}.
• In the dairy, visitors can watch staff making {{16}}.
• In the lower field you can pick your own {{17}}.
• Hot food is served all day in a large {{18}}.
• Visitors must keep their {{19}} on a lead.
• The farm closes at {{20}}.`,
          blanks: [
            { num: 13, answers: ['car park'], maxWords: 2 },
            { num: 14, answers: ['11'], maxWords: 1 },
            { num: 15, answers: ['lambs'], maxWords: 1 },
            { num: 16, answers: ['cheese'], maxWords: 1 },
            { num: 17, answers: ['strawberries'], maxWords: 1 },
            { num: 18, answers: ['tent'], maxWords: 2 },
            { num: 19, answers: ['dogs'], maxWords: 1 },
            { num: 20, answers: ['5 pm'], maxWords: 2 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-12.mp3',
      title: 'Listening — Section 3: Robotics Group Project',
      instructions: 'You will hear a tutor and two students discussing a robotics project. Listen and answer Questions 21–30.',
      transcript: `TUTOR: So, Sam, Priya — how's the robotics project coming along? I read your progress note, but remind me what the robot has to do in the final demonstration.

SAM: The brief is to build a small robot that can find its way through a maze without any human control. It doesn't need to map the whole maze in advance, but it must reach the exit within four minutes.

TUTOR: A maze-solving robot, good. And it has to be fully autonomous?

PRIYA: Yes, completely. Once we press start, it has to make all its own decisions. We originally misunderstood that and designed a remote control, but we removed it after the first tutorial.

TUTOR: Excellent. So where are you up to?

SAM: We've built the frame and fitted the wheels. The main headache has been the sensors. At first we used a camera to detect the walls, but it was far too slow to process the images. The pictures were clear; the delay was the problem.

TUTOR: So what did you switch to?

PRIYA: We replaced it with an ultrasonic sensor, which measures distance using sound. It's much faster and, honestly, a lot cheaper as well. We considered infrared, but strong light in the laboratory affected the readings.

TUTOR: A sensible choice. Have you checked how the ultrasonic device behaves at corners? A flat wall gives a strong return, whereas an angled surface may not.

PRIYA: Not systematically. We have only tried it in the corridor.

TUTOR: Include several wall angles in your trial, then. Now, how have you divided the work?

SAM: Priya is doing all the programming, and I'm concentrating on the electronics — the wiring and the motors. I was going to design the outer shell too, but we decided that would leave me with too much.

TUTOR: And who's writing up the report?

PRIYA: We're sharing that. Sam will describe the hardware, I'll explain the algorithm, and we'll write the evaluation together. But actually, we wondered if you could help us with the testing schedule.

TUTOR: Of course. My advice would be to test the robot in a simple maze first, before you try the full competition layout. You'll find faults much more quickly because there are fewer possible causes. Change only one variable between trials, or you won't know which adjustment helped.

SAM: That's a good point. We changed the wheel speed and the sensor threshold together last time, so the result told us very little.

TUTOR: Exactly. Keep a record of failed trials as well as successful ones. A good evaluation explains how the design developed; it doesn't pretend the first attempt worked.

PRIYA: Should we film the trials?

TUTOR: A short recording could help you examine a difficult turn, but measurements matter more than polished video. Record completion time, wrong turns and whether the robot touches a wall.

SAM: Right.

TUTOR: One concern — what are you making the body from? It looks rather heavy.

SAM: It's plywood at the moment. We chose it because the workshop had some spare sheets.

TUTOR: I'd switch to plastic. It's lighter, and your battery will last longer. You can reuse the same frame, so this isn't a complete rebuild.

PRIYA: We'll change that. The electronics can stay where they are.

TUTOR: Good. Let's agree the actions before next week. First, order the plastic needed for the new body. Then finish the code so the robot can turn corners. After that, run a full test and record the results in a table. Also, book the workshop for Friday — you'll need the space. Finally, email me your budget, because I think you can still claim some funding.

SAM: Brilliant. We'll send that this afternoon. Thanks so much.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'What must the robot be able to do?',
          options: [
            'find its way through a maze on its own',
            'lift and carry small objects',
            'respond to spoken commands',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'Why did the students stop using a camera?',
          options: [
            'It was too expensive to buy.',
            'It processed the images too slowly.',
            'It was too heavy for the frame.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'What is Sam mainly responsible for?',
          options: [
            'the programming',
            'the electronics',
            'writing the report',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'What does the tutor advise about testing the robot?',
          options: [
            'to test it in a simple maze before the full layout',
            'to test it in the real competition first',
            'to ask another group to test it',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'What change does the tutor suggest for the robot\'s body?',
          options: [
            'making it larger',
            'using plastic instead of plywood',
            'adding a second battery',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `Robotics project — tasks before next week
• Order the {{26}} needed for the new body.
• Finish the {{27}} so the robot can turn corners.
• Run a full test and record the results in a {{28}}.
• Book the {{29}} for Friday.
• Email the tutor the {{30}} to claim funding.`,
          blanks: [
            { num: 26, answers: ['plastic'], maxWords: 1 },
            { num: 27, answers: ['code', 'programming'], maxWords: 1 },
            { num: 28, answers: ['table'], maxWords: 1 },
            { num: 29, answers: ['workshop'], maxWords: 1 },
            { num: 30, answers: ['budget'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-12.mp3',
      title: 'Listening — Section 4: Human Colour Vision',
      instructions: 'You will hear a lecture about human colour vision. Listen and answer Questions 31–40.',
      transcript: `Good afternoon. Today we're going to explore how human beings see colour — a process that is far more remarkable than most people assume. Colour is not simply a property carried intact from an object into the mind. Light reaches the eye, sensory cells respond to it, and neural systems construct a useful perception from patterns of activity.

It begins in the eye. When light enters through the pupil, the lens helps focus it onto a thin layer of light-sensitive tissue at the back of the eye called the retina. This layer is packed with specialised cells that convert light into electrical signals. The centre and edges of the retina are not identical, which helps explain why fine colour detail is easiest to see when we look directly at something.

There are two main kinds of photoreceptor. The first, called rods, are extremely sensitive and allow us to see in dim light, but they do not provide ordinary colour vision. The second kind, the cones, are responsible for colour vision, though they need brighter light to work well. That is why, on a dark night, the world appears largely in shades of grey even when we know that the objects around us are coloured.

The human eye normally contains three types of cone. Each type contains a different light-sensitive pigment and responds across a range of the spectrum, with its strongest response around a particular wavelength. Scientists call them short-, medium- and long-wavelength cones. They are commonly associated, in simplified descriptions, with blue, green and red respectively, although their sensitivity ranges overlap substantially.

No single cone announces the name of a colour. Instead, the visual system compares the relative activity of the three types. Later neural stages also organise information into opponent channels, such as differences between red and green signals, or between blue and yellow signals. The brain combines and interprets these patterns alongside brightness and context. As a result, the same patch can appear different when its surroundings change, and an object can seem to keep a fairly stable colour under different illumination. This tendency is known as colour constancy.

This system also helps explain common forms of colour-vision deficiency, often casually called colour blindness. Complete absence of colour perception is rare. In most familiar red–green cases, the condition is inherited, passed through genes that affect cone pigments. It is much more common in men than in women because the relevant red–green pigment genes are on the X chromosome. The commonest difficulties involve distinguishing red from green, which can affect tasks such as interpreting maps, warning lights or colour-coded charts. Good design therefore uses labels, shapes or contrast as well as hue.

Colour perception can also change without an inherited condition. Ageing alters the amount and quality of light reaching the retina, and some diseases or medicines can affect visual pathways. This is why a sudden change in colour vision should be assessed rather than assumed to be genetic.

Finally, human vision is not the limit of what is possible. Many birds have an additional cone class and can detect ultraviolet light, which is invisible to us. That ability may help them identify food, mates or markings that humans cannot see. Other species sample light in different ways, so it is misleading to rank every visual system on a single scale from simple to advanced. Each is adapted to particular tasks. Next week, we'll examine how the brain uses context and prior experience when it processes these signals.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'HUMAN COLOUR VISION',
          template: `The eye and colour

• Light is focused onto the {{31}} at the back of the eye.
• Colour is detected by cells called {{32}}.
• The human eye contains {{33}} types of these cells.

How colour is seen

• Each type responds most strongly to a different {{34}} of light.
• The three types are most sensitive to red, green and {{35}}.
• The signals are combined and interpreted by the {{36}}.

Colour blindness

• In most cases the condition is {{37}}.
• It is much more common in {{38}} than in women.
• The commonest form is difficulty telling red from {{39}}.

Beyond human vision

• Some birds have an extra cone and can see {{40}} light.`,
          blanks: [
            { num: 31, answers: ['retina'], maxWords: 1 },
            { num: 32, answers: ['cones', 'cone'], maxWords: 1 },
            { num: 33, answers: ['three', '3'], maxWords: 1 },
            { num: 34, answers: ['wavelength'], maxWords: 1 },
            { num: 35, answers: ['blue'], maxWords: 1 },
            { num: 36, answers: ['brain'], maxWords: 1 },
            { num: 37, answers: ['inherited'], maxWords: 1 },
            { num: 38, answers: ['men'], maxWords: 1 },
            { num: 39, answers: ['green'], maxWords: 1 },
            { num: 40, answers: ['ultraviolet'], maxWords: 1 },
          ],
        },
      ],
    },

    // ─── READING ──────────────────────────────────────────────────────────────

    {
      part: 5,
      skill: 'reading',
      title: 'Reading — Passage 1: The Decline of Coral Reefs',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The Decline of Coral Reefs

Coral reefs occupy less than one percent of the ocean floor, yet estimates commonly place about a quarter of marine species in reef habitats during at least part of their lives. These ecosystems—often described as the rainforests of the sea—support fisheries and tourism and reduce the force of waves reaching many tropical coasts. Their benefits are biological, social and economic, but they are not distributed evenly: an offshore reef visited by tourists, for example, may be valued differently from a near-shore reef on which a fishing community depends directly.

The primary global driver of reef decline is ocean warming caused by climate change. Corals are colonial animals that live in a symbiotic relationship with photosynthetic algae called zooxanthellae. The algae supply much of the coral's energy and give many corals their vivid colours. When temperatures remain unusually high, corals may expel these algae in a stress response called coral bleaching. The pale calcium-carbonate coral skeleton then becomes visible through the living tissue. Bleached coral is not necessarily dead: if heat stress eases soon enough, algae can return and colonies may recover. Prolonged or repeated stress, however, raises mortality and can leave too little time for growth and reproduction between events.

Satellite monitoring and field reports show how widely the risk has spread. In June 2026, the United States National Oceanic and Atmospheric Administration concluded that the fourth global bleaching event had probably ended during 2025. From early 2023 to mid-2025, bleaching-level heat stress had affected about eighty-four percent of the world's reef area, and mass bleaching had been documented in at least eighty-three countries and territories. Exposure to heat does not prove that every colony bleached or died, but the scale makes local observations and consistent definitions essential.

Ocean acidification compounds this problem. The ocean absorbs a substantial share of the carbon dioxide released by human activity. Dissolved carbon dioxide changes seawater chemistry, increasing hydrogen-ion concentration and reducing the carbonate ions used by many organisms. Average surface-ocean pH has fallen by roughly 0.1 unit since the industrial era began. Because the pH scale is logarithmic, that apparently small shift represents a large rise in acidity. For reef-building corals, lower carbonate availability can make calcification more energetically demanding; its effects vary with species, location and other environmental conditions.

Local stressors add further pressure. Agricultural runoff introduces nutrients into coastal waters, stimulating algal blooms that smother reefs and block sunlight. Overfishing removes herbivorous fish such as parrotfish and surgeonfish, which normally keep algae in check. Coastal development disrupts sediment patterns and can physically damage reef structures. In many regions, these local threats operate in combination with climate stressors, creating a "death by a thousand cuts" dynamic from which reefs have little opportunity to recover.

The economic stakes are substantial but difficult to compress into one global price. Studies count different combinations of fisheries, tourism, coastal protection and non-market cultural value, so headline totals are not directly interchangeable. The physical structure of a reef can dissipate wave energy and reduce erosion or storm damage, while reef-associated fish contribute to food and income. A damaged reef may therefore create costs far beyond lost visitor spending. At the same time, a monetary estimate can miss relationships that communities regard as cultural or irreplaceable.

Responses to reef decline range from local interventions to global policy. Coral gardening—growing fragments in nurseries and transplanting them to degraded sites—can rebuild selected patches, but survival after transplantation must be measured over time. Researchers are also studying natural heat tolerance and carefully testing assisted approaches. Marine protected areas may reduce fishing pressure, yet a boundary on a map does not by itself stop polluted runoff or marine heatwaves. Effective projects therefore state what threat they address, compare restored sites with controls and publish failures as well as successes. Local management can improve recovery conditions; it cannot substitute for rapid reductions in the greenhouse-gas emissions driving continued ocean warming.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Coral reefs cover approximately one quarter of the total ocean floor.\n2. {{2}}: Zooxanthellae provide an important share of a coral's energy.\n3. {{3}}: A temperature rise of five degrees is needed to trigger coral bleaching.\n4. {{4}}: Ocean pH has become more acidic since the beginning of the Industrial Revolution.\n5. {{5}}: Parrotfish and surgeonfish help reefs by controlling algae growth.\n6. {{6}}: Coral reefs generate more economic value from tourism than from fisheries.\n7. {{7}}: Coral gardening involves transplanting coral fragments to damaged reefs.`,
          blanks: [
            { num: 1, answers: ['FALSE'] },
            { num: 2, answers: ['TRUE'] },
            { num: 3, answers: ['FALSE'] },
            { num: 4, answers: ['TRUE'] },
            { num: 5, answers: ['TRUE'] },
            { num: 6, answers: ['NOT GIVEN'] },
            { num: 7, answers: ['TRUE'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r1-sent',
          part: 5,
          qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `8. The algae living inside coral tissue are called {{8}} and they are expelled during bleaching events.\n9. NOAA concluded that the fourth global bleaching event had probably ended during {{9}}.\n10. When corals lose their algae, they appear white because their {{10}} becomes visible.\n11. Agricultural runoff promotes {{11}} that cover reefs and block sunlight.\n12. A reef's physical {{12}} can reduce the force of waves and help protect coastlines.\n13. Restoration projects should compare restored sites with {{13}} and publish failures as well as successes.`,
          blanks: [
            { num: 8, answers: ['zooxanthellae'] },
            { num: 9, answers: ['2025'] },
            { num: 10, answers: ['coral skeleton'] },
            { num: 11, answers: ['algal blooms'] },
            { num: 12, answers: ['structure'] },
            { num: 13, answers: ['controls'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: A History of Chess',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `A Concise History of Chess Across Continents, Centuries, Communities and Cultures

A. Chess is one of the oldest and most widely played strategy games in the world. Most histories connect its continuous development with the Indian subcontinent, where a game called chaturanga—meaning "four divisions," a reference to divisions of an army—was played by around the sixth century CE. Chaturanga featured pieces associated with infantry, cavalry, elephants and chariots and used an eight-by-eight grid. Written sources and surviving objects do not reveal one inventor or a single moment of creation, so claims of a precise birthplace remain debated. From India, the game spread westward to Persia, where it became chatrang, later shatranj. The Persian word shah means king. The expression associated with checkmate is often linked to shah mat, although linguists caution that the second element is better understood as the king being defeated or left without escape than literally dead.

B. Arab traders and scholars carried shatranj across the Islamic world following the conquest of Persia in the seventh century. The game proved enormously popular in the caliphate courts, and a significant body of chess literature—including problem collections, treatise on strategy, and biographical accounts of great players—was produced in Arabic during the eighth and ninth centuries. The caliph Harun al-Rashid, famed for his patronage of arts and sciences, was reportedly a devoted player. When chess reached Moorish Spain and Sicily, it entered Europe, where it would undergo a transformation that produced the game we recognise today.

C. European chess diverged from shatranj in the late fifteenth century, during a period that coincided roughly with the height of the Renaissance. The most significant changes involved the newly empowered queen—known in shatranj as the counsellor or firz, a weak piece restricted to diagonal moves—who became the most powerful piece on the board, capable of moving any number of squares in any direction. The bishop received long-range diagonal movement, and the pawn acquired the option of moving two squares on its first move, along with the option of capturing en passant. These changes dramatically increased the pace and tactical richness of the game, making the prior, slower version obsolete almost overnight.

D. The eighteenth and nineteenth centuries saw chess flourish as a competitive pursuit. The first unofficial world championship is generally considered to have been the match between Wilhelm Steinitz and Johannes Zukertort in 1886, which Steinitz won, becoming the game's first recognised world champion. Steinitz also developed what became known as positional chess—a style emphasising long-term structural advantages, pawn formations, and the control of open files, rather than the swashbuckling tactical play that had dominated earlier European chess. His ideas, initially controversial, proved enormously influential on subsequent generations of players.

E. The twentieth century brought institutional competition and, later, computer analysis. The World Chess Federation, known by its French acronym FIDE, was founded in Paris in 1924 and assumed control of the world-title cycle after the death of Alexander Alekhine. Within the Soviet Union, the government promoted chess as a sport of intellectual prestige, funding clubs, coaching and systematic preparation. From Mikhail Botvinnik's victory in the 1948 championship tournament, Soviet representatives became a succession of world champions, including Vasily Smyslov, Mikhail Tal, Tigran Petrosian, Boris Spassky and Anatoly Karpov. The match between Spassky and the American Bobby Fischer in Reykjavik in 1972 became associated with Cold War rivalry, attracting global media attention. The political symbolism did not determine the moves on the board, but it shaped how the contest was presented to audiences far beyond chess.

F. Computer chess programs began defeating amateur players in the 1980s and gradually improved to the point where they could challenge grandmasters. In 1997, IBM's Deep Blue defeated the reigning world champion Garry Kasparov in a six-game match. The machine's achievement depended on specialised hardware, extensive search and human preparation; it was not evidence that a computer reasoned about every problem as a person did. Today's leading chess engines play beyond human level on ordinary hardware. Rather than ending the human game, analysis software has changed preparation: players use it to test openings, locate mistakes and explore positions that earlier generations could assess only through human calculation. Online fair-play systems, meanwhile, must distinguish legitimate preparation from prohibited assistance during a game.

G. The twenty-first century has seen chess undergo a remarkable popular revival. During the COVID-19 pandemic, many existing players moved online and many beginners tried the game while other activities were restricted. The release of the Netflix series The Queen's Gambit in 2020 brought chess to a broad global audience, while streaming allowed strong players to explain fast games in an informal style. Online platforms reported rapid membership growth and tournaments gained viewers who might never attend a traditional playing hall. These indicators measure accounts, games or views rather than a single population of distinct players, so they should not be combined uncritically. Nevertheless, the interaction between entertainment, accessible lessons and immediate matchmaking changed how people could encounter and practise the game. Chess proved adaptable not because its rules stood still, but because the settings in which people learned, watched and competed kept evolving.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A description of changes made to the rules of chess during the Renaissance period', answer: 'C' },
            { num: 15, stem: 'An account of how chess became linked to Cold War political rivalry', answer: 'E' },
            { num: 16, stem: 'An explanation of the origin of the word "checkmate"', answer: 'A' },
            { num: 17, stem: 'Evidence of a revival in the popularity of chess in recent years', answer: 'G' },
            { num: 18, stem: 'A reference to Arabic texts produced about chess strategy', answer: 'B' },
            { num: 19, stem: 'Information about a chess player who changed how the game was theoretically understood', answer: 'D' },
            { num: 20, stem: 'An account of a computer defeating a human world chess champion', answer: 'F' },
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
          title: 'The History and Development of Chess',
          template: `Chess originated in India as a game called {{21}}, which represented the four divisions of the army. From India, it spread to Persia and was later brought to Europe by Arab traders. In the fifteenth century, the queen became the most powerful piece and the bishop gained {{22}} movement, making the game faster. The first formal world championship took place in 1886 and was won by {{23}}. The Soviet Union promoted chess as a prestige sport, producing many {{24}} who dominated the game throughout the twentieth century. In 1997, IBM's chess computer {{25}} defeated world champion Garry Kasparov. More recently, the release of a popular Netflix {{26}} introduced chess to a new generation of fans.`,
          blanks: [
            { num: 21, answers: ['chaturanga'] },
            { num: 22, answers: ['long-range diagonal'] },
            { num: 23, answers: ['Wilhelm Steinitz', 'Steinitz'] },
            { num: 24, answers: ['world champions'] },
            { num: 25, answers: ['Deep Blue'] },
            { num: 26, answers: ['series'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: Social Media and Mental Health',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `Social Media and Mental Health

Concern about young people's social-media use is understandable, but the first challenge is to define what is being measured. Time on a platform, constant contact with friends and loss of control over use are not interchangeable. Nor is an average association proof that every user experiences the same effect. A useful account must separate correlation from causation while still taking credible risks seriously.

Use is widespread. The United States Surgeon General's 2023 advisory reported that up to ninety-five percent of people aged thirteen to seventeen used a social-media platform. The advisory concluded that the available evidence was not sufficient to declare social media safe for children and adolescents. That statement is deliberately different from saying that every platform or every use is harmful. It identifies a need for precautions and better evidence because adolescence is a sensitive period of social and neurological development.

In 2024, the World Health Organization's European office reported results from a survey of almost 280,000 eleven-, thirteen- and fifteen-year-olds in forty-four countries and regions. The share showing signs of problematic social-media behaviour rose from seven percent in 2018 to eleven percent in 2022. This measure of problematic use concerned addiction-like symptoms, including difficulty controlling use and negative consequences; it did not classify all frequent users as problematic. The same report found that thirty-six percent described themselves as being in constant online contact with friends. High engagement and impaired control therefore require separate interpretation.

Several mechanisms could plausibly produce harm. Notifications and late-night interaction may displace sleep. Recommendation systems can repeatedly expose a user to upsetting material, while public counts and edited images can intensify social comparison. Harassment can travel beyond school hours and reach a large audience. Yet the direction of influence may also be bidirectional: distress may change how a young person uses a platform, just as particular online experiences may affect distress. Family circumstances, offline relationships and pre-existing vulnerabilities can influence both.

Benefits also matter. Messaging can maintain ordinary friendships, and interest-based communities can provide information or belonging. Young people who are socially isolated offline—including some LGBTQ+ youth, people with chronic illness and those in remote communities—may find support that is unavailable locally. These benefits do not cancel the possibility of harm; they show why a single rule based only on minutes of use can miss the quality, content and context of an experience. Effects may differ by person, platform feature and stage of development.

Research design shapes the conclusions that can be drawn. A cross-sectional survey can show that two variables occur together, but not which came first. Self-reported screen time may be inaccurate, while a total recorded by a device says little about what the person saw or did. Longitudinal studies provide timing, and experiments can test narrower mechanisms, but both face ethical and practical limits with minors. Researchers also need access to platform data and consistent outcome measures if results are to be compared.

Policy responses range from education and parental guidance to age-based access rules. A minimum age is visible and easy to explain, but implementation raises questions about identity checks, exclusion and data collection. No measure should create a new privacy risk merely to enforce another protection. Safety-by-design approaches can instead reduce unsolicited contact, provide effective reporting tools, limit sensitive targeting and set protective defaults for minors. Platforms can also share suitably protected data with independent researchers.

The evidence therefore supports neither complacency nor a universal diagnosis. Families can establish boundaries around sleep and device-free activities, schools can teach digital literacy, and services can offer routes to help when online experiences cause distress. Governments and companies can require transparent evaluation rather than assuming that a reminder, ban or design change works. The central question is not whether social media is wholly good or wholly bad, but which combinations of user, content and design create benefit or risk—and how those conditions can be changed.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'What distinction does the writer emphasise in the first paragraph?',
          options: [
            'Frequent use, constant contact and problematic use are different measures.',
            'Only experiments can provide useful information about social media.',
            'Every young user is affected by social media in the same way.',
            'Time spent online is more important than the content encountered.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'What did the 2024 WHO report show about problematic social-media behaviour?',
          options: [
            'It affected every adolescent who was frequently online.',
            'Its reported prevalence rose from 7% in 2018 to 11% in 2022.',
            'It was measured only by the number of minutes spent online.',
            'Its prevalence fell in all forty-four participating countries.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'According to the passage, which users may obtain support that is unavailable locally?',
          options: [
            'Only users who never disclose their identity online',
            'People who already have extensive local support networks',
            'Young people isolated offline, including some LGBTQ+ youth or those with chronic illness',
            'All adolescents who spend less than one hour a day online',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'What concern does the writer raise about enforcing a minimum age?',
          options: [
            'It would remove the need for digital-literacy education.',
            'Identity checks used for enforcement could create a privacy risk.',
            'It would be impossible for families to understand.',
            'Every young person would lose access to online support.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: The Surgeon General's advisory stated that every form of social-media use harms adolescents.\n32. {{32}}: The WHO survey included almost 280,000 young people.\n33. {{33}}: The WHO measure treated all frequent social-media users as problematic users.\n34. {{34}}: The relationship between distress and social-media use may operate in both directions.\n35. {{35}}: The impact of social media may vary according to the individual, the feature and the developmental stage.\n36. {{36}}: Age-based access rules have been proved more effective than safety-by-design measures.`,
          blanks: [
            { num: 31, answers: ['NO'] },
            { num: 32, answers: ['YES'] },
            { num: 33, answers: ['NO'] },
            { num: 34, answers: ['YES'] },
            { num: 35, answers: ['YES'] },
            { num: 36, answers: ['NOT GIVEN'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r3-sent',
          part: 7,
          qRange: [37, 40],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `37. Up to {{37}} of people aged thirteen to seventeen used a social-media platform.\n38. The WHO report defined {{38}} in terms of addiction-like symptoms rather than frequency alone.\n39. Notifications and late-night online interaction may reduce the time available for {{39}}.\n40. The writer warns that enforcing an age limit should not create a new risk to {{40}}.`,
          blanks: [
            { num: 37, answers: ['ninety-five percent'] },
            { num: 38, answers: ['problematic use'] },
            { num: 39, answers: ['sleep'] },
            { num: 40, answers: ['privacy'] },
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
          imageUrl: '/assets/ielts/charts/set12-task1.svg',
          imageAlt: 'Line graph showing the annual average sea-surface temperature anomaly at one coastal monitoring station in selected years from 1980 to 2022, rising from 0.05 to 0.91 degrees Celsius above the 1961–1990 baseline',
          stimulus: 'The line graph below shows the annual average sea-surface temperature anomaly recorded at one coastal monitoring station in selected years from 1980 to 2022, measured in degrees Celsius above the 1961–1990 baseline.',
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
          stimulus: 'Some schools ask students to keep private diaries of their social-media habits so that counsellors can help them identify patterns affecting sleep or wellbeing. Some people think this is a useful form of support, while others believe it intrudes on privacy and may discourage honest communication.',
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
          text: 'Part 1 — Personal questions about technology and communication',
          followUp: [
            'How often do you use social media platforms?',
            'What do you mainly use the internet for in your daily life?',
            'Do you prefer communicating with friends online or in person? Why?',
            'Have your technology habits changed significantly in the past few years?',
            'Is there a device that you find especially useful at home?',
            'Do you ever choose to spend a day without using social media?',
            'What kind of information do you prefer to receive in a message rather than by phone?',
            'Was learning to use new technology easy for you when you were younger?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a time when technology helped you in an important way.\n\nYou should say:\n• what the situation was\n• what technology you used\n• how it helped you\n• and explain how you felt about this experience`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Technology and society',
          followUp: [
            'Do you think social media companies have a responsibility to protect users\' mental health?',
            'Should governments regulate the age at which children can access social media? Why or why not?',
            'How do you think technology will change human relationships in the next twenty years?',
            'Is there a risk that technology is making people less able to cope with real-world challenges?',
            'What should schools teach young people about privacy and persuasive design online?',
            'How can researchers measure the social effects of technology without intruding on users\' private lives?',
          ],
        },
      ],
    },
  ],
};

export default mock;
